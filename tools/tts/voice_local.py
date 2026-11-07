"""Voice the sentences of ONE game locally with ElevenLabs (uses the key from the local .env, never prints it).
   Use when the nightly workflow should not wait or its ElevenLabs month budget is used up.
   Usage (repo root):  py -X utf8 tools/tts/voice_local.py mikula        -> voices spiele/tts-mikula.json
                       py -X utf8 tools/tts/voice_local.py mikula --dry  -> only counts characters (no cost)
   Writes audio/tts/<key>.mp3 and updates audio/tts/index.json + usage.json. Needs ffmpeg."""
import glob, json, os, sys, time
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
# ffmpeg from winget is often not on PATH in Git Bash / PowerShell sessions
for d in glob.glob(os.path.expandvars(r'%LOCALAPPDATA%\Microsoft\WinGet\Packages\*FFmpeg*\*\bin')):
    os.environ['PATH'] = d + os.pathsep + os.environ['PATH']
envf = os.path.join(ROOT, '.env')
if os.path.exists(envf):
    for line in open(envf, encoding='utf-8'):
        if line.startswith('ELEVENLABS_API_KEY='): os.environ['ELEVENLABS_API_KEY'] = line.split('=', 1)[1].strip().strip('"')
if not os.environ.get('ELEVENLABS_API_KEY'): sys.exit('ELEVENLABS_API_KEY fehlt in .env')
import generate as g

name = sys.argv[1] if len(sys.argv) > 1 else 'mikula'; dry = '--dry' in sys.argv
def fnv(s):
    import re; h = 0x811c9dc5
    for b in re.sub(r'\s+', ' ', s).strip().encode('utf-8'): h ^= b; h = (h * 0x01000193) & 0xffffffff
    return 't%08x' % h
keys = {fnv(it['text']) for it in json.load(open(os.path.join(ROOT, 'spiele', f'tts-{name}.json'), encoding='utf-8'))}
entries = [e for e in json.load(open(g.MANIFEST, encoding='utf-8'))['entries'] if e['key'] in keys]
try: index = json.load(open(g.INDEX, encoding='utf-8'))
except Exception: index = {'files': {}}
files = {k: {**v, 'sig': v.get('sig') or v.get('v')} for k, v in index.get('files', {}).items()}
todo = [e for e in entries if not (os.path.exists(os.path.join(g.OUT, e['key'] + '.mp3')) and files.get(e['key'], {}).get('sig') == g.signature(e, 'elevenlabs'))]
chars = sum(len((s.get('say') or s['text']).strip()) for e in todo for s in e['segments'])
print(f'{name}: {len(entries)} Sätze im Manifest, {len(todo)} zu vertonen, {chars} Zeichen (≈ {chars} ElevenLabs-Credits)')
if dry or not todo: sys.exit(0)
month = time.strftime('%Y-%m', time.gmtime())
try: usage = json.load(open(g.USAGE, encoding='utf-8'))
except Exception: usage = {}
used = usage.get(month, {}).get('elevenlabs', 0)
os.environ['TTS_MONTHLY_LIMIT_ELEVENLABS'] = str(used + chars + 500)   # this run only: allow exactly what this game needs
r = g.run_engine('elevenlabs', entries, files, usage, month, time.time())
json.dump(usage, open(g.USAGE, 'w', encoding='utf-8'), indent=1)
g.write_index(files)
print(f"Fertig: {r['created']} erzeugt, {r['open']} offen, Fehler: {len(r['errors'])}")
for e in r['errors'][:5]: print('  ', e)
