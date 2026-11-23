"""Back-transcribes every take with faster-whisper and flags takes whose words differ from the script.

Usage: python check_takes.py <jobs.json> <wav_dir> <report.json> [max_cer=0.12]
Writes report.json ({key: {cer, heard, ok}}) and <wav_dir>/redo.json ({key: next attempt}) for failed takes."""
import json
import os
import re
import sys
import unicodedata

from faster_whisper import WhisperModel

jobs_path, wav_dir, report_path = sys.argv[1:4]
max_cer = float(sys.argv[4]) if len(sys.argv) > 4 else 0.12
MAX_ATTEMPT = 2  # at most three takes per line
jobs = json.load(open(jobs_path, encoding='utf-8'))
try: report = json.load(open(report_path, encoding='utf-8'))
except Exception: report = {}
attempts = {}
for line in open(os.path.join(wav_dir, 'gen_log.jsonl'), encoding='utf-8'):
    r = json.loads(line)
    if 'attempt' in r: attempts[r['key']] = r['attempt']


def norm(s):
    s = unicodedata.normalize('NFC', s.lower()).replace('ß', 'ss')
    return re.sub(r'[^a-zäöü ]+', '', re.sub(r'[-–/]', ' ', s)).split()


def lev(a, b):
    prev = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        cur = [i]
        for k, y in enumerate(b, 1): cur.append(min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (x != y)))
        prev = cur
    return prev[-1]


asr = WhisperModel('large-v3-turbo', device='cpu', compute_type='int8')
redo = {}
for j in jobs:
    wav = os.path.join(wav_dir, j['key'] + '.wav')
    if not os.path.exists(wav): continue
    stamp = os.path.getmtime(wav)
    old = report.get(j['key'])
    if not old or old.get('mtime') != stamp:
        segs, _ = asr.transcribe(wav, language='de', beam_size=5)
        heard = ' '.join(s.text.strip() for s in segs)
        hyp = ' '.join(norm(heard))  # Whisper may write "16 Uhr" for "sechzehn Uhr": compare with both texts
        cer = min(lev(r, hyp) / max(1, len(r)) for r in {' '.join(norm(j['text'])), ' '.join(norm(j.get('show', j['text'])))})
        report[j['key']] = old = {'cer': round(cer, 3), 'heard': heard, 'text': j['text'], 'ok': cer <= max_cer,
                                  'mtime': stamp, 'attempt': attempts.get(j['key'], 0)}
        print(json.dumps({'key': j['key'], 'cer': old['cer'], 'ok': old['ok']}, ensure_ascii=False), flush=True)
    if not old['ok'] and old['attempt'] < MAX_ATTEMPT: redo[j['key']] = old['attempt'] + 1
json.dump(report, open(report_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(redo, open(os.path.join(wav_dir, 'redo.json'), 'w', encoding='utf-8'), indent=1)
bad = [k for k, v in report.items() if not v['ok']]
print(f'checked {len(report)} · failed {len(bad)}: {bad}')
