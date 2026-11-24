#!/usr/bin/env python3
"""Local voicing of texts with several speakers (listening A1/A2): every segment is split into short sentences,
each sentence is one VoiceStudio take, the takes are joined again with generate.py build() (pauses, phone effect).

  py -X utf8 tools/tts/voicestudio/dialogs.py prepare <work> <key> …     -> <work>/jobs.json, <work>/parts.json
  (then gen_batch.py / check_takes.py as in README.md)
  py -X utf8 tools/tts/voicestudio/dialogs.py finish <work> [--accept <take> …]
"""
import json, os, re, subprocess, sys, tempfile
import numpy as np
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import generate as G  # noqa: E402

ROLE = {'f1': 'f3', 'f2': 'f2', 'f3': 'f3', 'm1': 'm1', 'm2': 'm2', 'm3': 'm2'}  # four reference voices
cmd, work = sys.argv[1:3]
entries = {e['key']: e for e in G.load_entries()}
P = lambda f: os.path.join(work, f)
spoken = lambda s: (s.get('say') or s['text']).strip()


def chunks(text, limit=90):
    """Whole sentences, short ones joined up to `limit` characters (very short takes sound worse)."""
    out = []
    for s in re.split(r'(?<=[.!?])\s+', text):
        if out and len(out[-1]) + len(s) < limit and (len(out[-1]) < 30 or len(s) < 30): out[-1] += ' ' + s
        else: out.append(s)
    return out


def clean(src, dst, name, sr=24000, hop=240):
    """One take -> level-matched speech. Removes the model's chopped extra syllables (short isolated bursts after a
    pause) and everything after the last word, then sets every take to the same speech level."""
    x = np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, '-af', 'highpass=f=40', '-ar', str(sr), '-ac', '1',
                                      '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32).copy()
    n = len(x) // hop
    db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
    top = np.percentile(db, 95)

    def runs(level, join):
        out = []
        for i in np.flatnonzero(db > level):
            if out and i - out[-1][1] <= join: out[-1][1] = i + 1
            else: out.append([i, i + 1])
        return out
    loud, keep = runs(top - 16, 12), []
    for k, (i, j) in enumerate(loud):
        before = i - loud[k - 1][1] if k else 0
        if k and k == len(loud) - 1 and j - i <= 10 and before >= 24:  # only after the last word: inside a take it can be a real 'Ich'
            print(f'    {name}: burst {i / 100:.2f}-{j / 100:.2f} s removed')
            lo, hi = loud[k - 1][1] + 12, min(n, j + 4)  # also the breath before it
            x[max(lo, i - 30) * hop:hi * hop] = 0
        else: keep.append([i, j])
    end = keep[-1][1]
    for i in range(end, min(n, end + 30)):  # soft endings (f, s, ch, k) belong to the word
        if db[i] > top - 32 and i - end <= 14: end = i + 1
    start = keep[0][0]
    for i in range(start, max(-1, start - 25), -1):
        if db[i] > top - 38 and start - i <= 8: start = i
    y = x[max(0, start - 3) * hop:min(n, end + 5) * hop].copy()
    for m, back in ((hop, 0), (4 * hop, 1)):
        r = np.linspace(0, 1, m)
        if back: y[-m:] *= r[::-1]
        else: y[:m] *= r
    e = db[(db > top - 16)]
    y *= 10 ** ((-19 - 10 * np.log10((10 ** (e / 10)).mean())) / 20)
    y = np.concatenate([np.zeros(hop), y, np.zeros(int(sr * .35))]).astype(np.float32)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(sr), '-ac', '1', '-i', '-', '-af',
                    'alimiter=limit=0.7:level=0', '-ar', str(sr), '-ac', '1', dst], input=y.tobytes(), check=True)


if cmd == 'prepare':
    jobs, parts = [], {}
    for key in sys.argv[3:]:
        voices = {s['voice'] for s in entries[key]['segments']}
        if len({ROLE[v] for v in voices}) < len(voices): sys.exit(f'{key}: two roles share one voice {voices}')
        for i, s in enumerate(entries[key]['segments']):
            if re.search(r'\d', spoken(s)): sys.exit(f'{key}: digits, add "say"')
            ids = []
            for k, c in enumerate(chunks(spoken(s))):
                ids.append(f'{key}__{i:02d}_{k}')
                jobs.append({'key': ids[-1], 'voice': ROLE[s['voice']], 'text': c, 'show': c})
            parts.setdefault(key, []).append(ids)
    os.makedirs(work, exist_ok=True)
    json.dump(jobs, open(P('jobs.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(parts, open(P('parts.json'), 'w', encoding='utf-8'), indent=1)
    print(len(parts), 'texts,', len(jobs), 'takes,', sum(len(j['text']) for j in jobs), 'characters')
elif cmd == 'finish':
    accept = set(sys.argv[sys.argv.index('--accept') + 1:]) if '--accept' in sys.argv else set()
    parts, report = json.load(open(P('parts.json'))), json.load(open(P('report.json'), encoding='utf-8'))
    index = json.load(open(G.INDEX, encoding='utf-8')); files = index['files']; waiting = []
    for key, segs in parts.items():
        bad = [t for ids in segs for t in ids if not os.path.exists(P(f'wav/{t}.wav')) or not (report.get(t, {}).get('ok') or t in accept)]
        if bad: waiting += bad; continue
        e = entries[key]; todo = iter(segs)

        def synth(text, role, wav):  # called once per segment, in order
            with tempfile.TemporaryDirectory() as td:
                cut = []
                for n, t in enumerate(next(todo)):
                    cut.append(os.path.join(td, f'{n}.wav'))
                    clean(P(f'wav/{t}.wav'), cut[-1], t)
                args = [a for c in cut for a in ('-i', c)]
                G.run(['ffmpeg', '-y', '-loglevel', 'error', *args, '-filter_complex', f'concat=n={len(cut)}:v=0:a=1', '-ar', '24000', '-ac', '1', wav])
        G.SYNTH['voicestudio'] = synth
        G.build(e, 'voicestudio', os.path.join(G.OUT, key + '.mp3'))
        files[key] = {'sig': G.signature(e, 'voicestudio'), 'engine': 'voicestudio', 'text': G.signature(e, 'text'), **({'fx': e['fx']} if e.get('fx') else {})}
        print('ok', key)
    G.write_index(files)
    print('not ready:', waiting)
