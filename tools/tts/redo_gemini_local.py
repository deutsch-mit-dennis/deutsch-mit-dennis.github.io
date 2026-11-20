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
KEY_NAME = next((a.split('=', 1)[1] for a in sys.argv if a.startswith('--key=')), 'GEMINI_API_KEY_OUTLOOK')  # e.g. --key=GEMINI_API_KEY_OUTLOOK2
envf = os.path.join(ROOT, '.env')
if os.path.exists(envf):
    for line in open(envf, encoding='utf-8'):
        if line.startswith(KEY_NAME + '='):
            os.environ['GEMINI_API_KEY'] = line.split('=', 1)[1].strip().strip('"')
dry = '--dry' in sys.argv
if not dry and not os.environ.get('GEMINI_API_KEY'):
    sys.exit(f'{KEY_NAME} fehlt in .env')
os.environ.setdefault('GEMINI_PAUSE', '1')
import generate as g
g.FORCE = True  # same text may need a new take

# Hard cost cap (Dennis, 2026-11-20: never more than 5 EUR). Every response reports its token usage; we price it
# with the more expensive Pro-TTS rates (USD 1 per 1M input, 20 per 1M audio output tokens, counted 1:1 as EUR)
# and stop before the next request once the running total reaches CAP_EUR. Total is kept across runs.
CAP_EUR = float(os.environ.get('REDO_CAP_EUR', '4.50'))
cost_f = os.path.join(HERE, 'redo-cost.json')
cost = json.load(open(cost_f, encoding='utf-8')) if os.path.exists(cost_f) else {'in': 0, 'out': 0, 'eur': 0.0}
_http = g.http
def http_capped(url, body, hdr):
    if 'generativelanguage' in url and cost['eur'] >= CAP_EUR:
        raise RuntimeError(f"quota_exceeded: Kostenbremse {cost['eur']:.2f} von {CAP_EUR:.2f} EUR erreicht")
    raw = _http(url, body, hdr)
    if 'generativelanguage' in url:
        u = json.loads(raw).get('usageMetadata', {})
        cost['in'] += u.get('promptTokenCount', 0); cost['out'] += u.get('candidatesTokenCount', 0)
        cost['eur'] = round(cost['in'] / 1e6 * 1 + cost['out'] / 1e6 * 20, 4)
        json.dump(cost, open(cost_f, 'w', encoding='utf-8'))
    return raw
g.http = http_capped

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
start = time.time(); created = 0; errors = []
for e in entries:  # one entry per call, progress saved after each, so a stop loses nothing
    r = g.run_engine('gemini', [e], files, usage, month, start)
    errors += r['errors']
    if r['created']:
        created += 1; done.add(e['key'])
        json.dump(sorted(done), open(done_f, 'w', encoding='utf-8'), indent=0)
        json.dump(usage, open(g.USAGE, 'w', encoding='utf-8'), indent=1)
        g.write_index(files)
    elif r['errors'] and any(s in r['errors'][-1]['error'] for s in ('quota_exceeded', 'HTTP 429', 'HTTP 402', 'RESOURCE_EXHAUSTED')):
        break
print(f"neu: {created}, offen: {len(keys) - len(done)}, Kosten bisher ca. {cost['eur']:.2f} EUR",
      *(f"Fehler: {x['key']}: {x['error'][:150]}" for x in errors[:3]), sep='\n')
