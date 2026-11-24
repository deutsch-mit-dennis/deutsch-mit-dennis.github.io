#!/usr/bin/env python3
"""Local voicing of texts with several speakers (listening A1/A2): every segment is split into short sentences,
each sentence is one VoiceStudio take, the takes are joined again with generate.py build() (pauses, phone effect).

  py -X utf8 tools/tts/voicestudio/dialogs.py prepare <work> <key> …     -> <work>/jobs.json, <work>/parts.json
  (then gen_batch.py / check_takes.py as in README.md)
  py -X utf8 tools/tts/voicestudio/dialogs.py finish <work> [--accept <take> …]
"""
import json, os, re, subprocess, sys, tempfile
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
                    c = os.path.join(td, f'{n}.wav')
                    G.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', P(f'wav/{t}.wav'), '-af',
                           'highpass=f=40,silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,'
                           'loudnorm=I=-17:TP=-1.5:LRA=11,apad=pad_dur=0.32', '-ar', '24000', '-ac', '1', c])
                    cut.append(c)
                args = [a for c in cut for a in ('-i', c)]
                G.run(['ffmpeg', '-y', '-loglevel', 'error', *args, '-filter_complex', f'concat=n={len(cut)}:v=0:a=1', '-ar', '24000', '-ac', '1', wav])
        G.SYNTH['voicestudio'] = synth
        G.build(e, 'voicestudio', os.path.join(G.OUT, key + '.mp3'))
        files[key] = {'sig': G.signature(e, 'voicestudio'), 'engine': 'voicestudio', 'text': G.signature(e, 'text'), **({'fx': e['fx']} if e.get('fx') else {})}
        print('ok', key)
    G.write_index(files)
    print('not ready:', waiting)
