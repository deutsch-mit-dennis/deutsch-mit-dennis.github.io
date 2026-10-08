"""Übernimmt die Sprechtexte der Lernspiele (spiele/tts-*.json) in tools/tts/manifest.json.
   Schlüssel wie in site.js (FNV-1a über den normalisierten Text). Danach vertont der Workflow „Hörtexte vertonen“."""
import json, os, re, glob
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def fnv(s):
    h = 0x811c9dc5
    for b in re.sub(r'\s+', ' ', s).strip().encode('utf-8'):
        h ^= b; h = (h * 0x01000193) & 0xffffffff
    return 't%08x' % h
mp = os.path.join(R, 'tools', 'tts', 'manifest.json'); man = json.load(open(mp, encoding='utf-8'))
have = {e['key'] for e in man['entries']}; n = 0
for f in sorted(glob.glob(os.path.join(R, 'spiele', 'tts-*.json'))):
    for it in json.load(open(f, encoding='utf-8')):
        k = fnv(it['text'])
        if k in have: continue
        man['entries'].append({'key': k, 'segments': [{'voice': it.get('voice', 'f1'), 'text': it['text']}]}); have.add(k); n += 1
json.dump(man, open(mp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); open(mp, 'a').write('\n')
print(n, 'neue Sprechtexte,', len(man['entries']), 'gesamt')
