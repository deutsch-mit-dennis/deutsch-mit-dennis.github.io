"""Re-record selected TTS files locally with Gemini, using a second API key from .env (GEMINI_API_KEY_OUTLOOK).
   Used after the audio audit of 2026-11 (wrong pronunciation, extra words, English accent).
   Usage (repo root):  py -X utf8 tools/tts/redo_gemini_local.py            -> records everything still open
                       py -X utf8 tools/tts/redo_gemini_local.py --dry      -> only counts (no cost)
   Input:  tools/tts/redo-keys.json (list of keys). Progress: tools/tts/redo-done.json (resumable; on a daily
   quota stop just run it again later). Writes audio/tts/<key>.mp3 and updates index.json + usage.json.
   The key is read from .env and never printed."""
import glob, json, os, sys, time
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
for d in glob.glob(os.path.expandvars(r'%LOCALAPPDATA%\Microsoft\WinGet\Packages\*FFmpeg*\*\bin')):
    os.environ['PATH'] = d + os.pathsep + os.environ['PATH']
envf = os.path.join(ROOT, '.env')
if os.path.exists(envf):
    for line in open(envf, encoding='utf-8'):
        if line.startswith('GEMINI_API_KEY_OUTLOOK='):
            os.environ['GEMINI_API_KEY'] = line.split('=', 1)[1].strip().strip('"')
dry = '--dry' in sys.argv
if not dry and not os.environ.get('GEMINI_API_KEY'):
    sys.exit('GEMINI_API_KEY_OUTLOOK fehlt in .env')
os.environ.setdefault('GEMINI_PAUSE', '7')  # free tier: stay under the per-minute limit
import generate as g
g.FORCE = True  # same text may need a new take

keys = json.load(open(os.path.join(HERE, 'redo-keys.json'), encoding='utf-8'))
done_f = os.path.join(HERE, 'redo-done.json')
done = set(json.load(open(done_f, encoding='utf-8'))) if os.path.exists(done_f) else set()
entries = [e for e in g.load_entries() if e['key'] in set(keys) and e['key'] not in done]
chars = sum(len((s.get('say') or s['text']).strip()) for e in entries for s in e['segments'])
print(f'{len(keys)} Einträge geplant, {len(done)} fertig, {len(entries)} offen, {chars} Zeichen')
if dry or not entries: sys.exit(0)

index = json.load(open(g.INDEX, encoding='utf-8'))
files = {k: {**v, 'sig': v.get('sig') or v.get('v')} for k, v in index.get('files', {}).items()}
month = time.strftime('%Y-%m', time.gmtime())
try: usage = json.load(open(g.USAGE, encoding='utf-8'))
except Exception: usage = {}
start = time.time()
r = g.run_engine('gemini', entries, files, usage, month, start)
for e in entries:
    p = os.path.join(g.OUT, e['key'] + '.mp3')
    if os.path.exists(p) and os.path.getmtime(p) >= start - 1: done.add(e['key'])
json.dump(sorted(done), open(done_f, 'w', encoding='utf-8'), indent=0)
json.dump(usage, open(g.USAGE, 'w', encoding='utf-8'), indent=1)
g.write_index(files)
print(f"neu: {r['created']}, offen: {len(keys) - len(done)}", *(f"Fehler: {x['key']}: {x['error'][:150]}" for x in r['errors'][:3]), sep='\n')
