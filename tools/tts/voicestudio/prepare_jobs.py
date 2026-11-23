#!/usr/bin/env python3
"""Lists the manifest entries that still need a local VoiceStudio take (Confucius4-TTS).

Usage (repo root):  py -X utf8 tools/tts/voicestudio/prepare_jobs.py <jobs.json> [key ...]
Without keys: every entry that has no MP3/index entry yet. Spoken text = "say" (incl. say-overrides.json),
so numbers are already written out (Confucius4 reads digits in English)."""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import generate as G  # noqa: E402

out, keys = sys.argv[1], set(sys.argv[2:])
files = json.load(open(G.INDEX, encoding='utf-8'))['files']
jobs = []
for e in G.load_entries():
    if keys and e['key'] not in keys: continue
    if not keys and e['key'] in files and os.path.exists(os.path.join(G.OUT, e['key'] + '.mp3')): continue
    if len(e['segments']) != 1 or e.get('fx'):
        print('skipped (multi-segment / fx not supported):', e['key']); continue
    s = e['segments'][0]
    text = (s.get('say') or s['text']).strip()
    if re.search(r'\d', text): sys.exit(f'{e["key"]}: digits in spoken text – add "say": {text}')
    jobs.append({'key': e['key'], 'voice': s.get('voice', 'f1'), 'text': text, 'show': s['text']})
json.dump(jobs, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(jobs), 'jobs ->', out)
