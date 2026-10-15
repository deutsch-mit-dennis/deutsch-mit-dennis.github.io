#!/usr/bin/env python3
"""Übersetzt alle Witze aus witz.js mit KI in alle Sprachen der Auswahlliste.
Ausgabe: witz-i18n/<sprache>.json  →  { "<schlüssel>": {"t": "...", "why": "..."} }
Der Schlüssel ist ein Prüfwert (FNV-1a) über den deutschen Witztext – geänderte oder neue Witze werden nachübersetzt.
Anbieter: Gemini (Secret GEMINI_API_KEY, bevorzugt) oder Google Cloud Translation (Secret GOOGLE_TTS_API_KEY, falls die Translation API freigeschaltet ist).
Läuft auf GitHub Actions (.github/workflows/witz.yml)."""
import json, os, subprocess, sys, time, urllib.request, urllib.error
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(R, 'witz-i18n')
os.makedirs(OUT, exist_ok=True)

def load():
    js = r"""const vm=require('vm'),fs=require('fs');const noop=()=>{};const c={document:{addEventListener:noop,getElementById:()=>1,head:{appendChild:noop},querySelectorAll:()=>[]},localStorage:{getItem:()=>null,setItem:noop}};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync(process.argv[1],'utf8'),c);process.stdout.write(JSON.stringify({jokes:c.DMWitz.all,langs:c.DMWitz.langs}))"""
    return json.loads(subprocess.check_output(['node', '-e', js, os.path.join(R, 'witz.js')]))

def fnv(s):
    h = 0x811c9dc5
    for b in s.encode('utf-8'):
        h ^= b; h = (h * 0x01000193) & 0xffffffff
    return format(h, '08x')

def post(url, body, headers, tries=5):
    data = json.dumps(body).encode()
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers={'content-type': 'application/json', **headers})
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            msg = e.read()[:400].decode('utf-8', 'replace')
            if e.code in (429, 500, 502, 503) and i < tries - 1:
                time.sleep(20 * (i + 1)); continue
            raise RuntimeError(f'HTTP {e.code}: {msg}')

_models = None
def gemini_models():
    """Verfügbare Gemini-Modelle abfragen und passende „flash“-Modelle (neueste zuerst) wählen."""
    global _models
    if _models is not None: return _models
    import re
    want = os.environ.get('GEMINI_MODEL')
    try:
        req = urllib.request.Request('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', headers={'x-goog-api-key': os.environ['GEMINI_API_KEY']})
        ms = json.loads(urllib.request.urlopen(req, timeout=60).read()).get('models', [])
        names = [m['name'].split('/')[-1] for m in ms if 'generateContent' in m.get('supportedGenerationMethods', [])]
        ok = [n for n in names if 'flash' in n and not re.search(r'(tts|image|audio|live|thinking|exp|preview|lite|8b)', n)]
        ver = lambda n: [float(x) for x in re.findall(r'\d+(?:\.\d+)?', n)[:1]] or [0]
        ok.sort(key=ver, reverse=True)
        print('Modelle:', ', '.join(ok[:5]) or '-', flush=True)
    except Exception as e:
        print('Modellliste nicht abrufbar:', e, flush=True); ok = []
    _models = ([want] if want else []) + ok + ['gemini-flash-latest']
    return _models

def gemini(items, lang, name):
    key = os.environ['GEMINI_API_KEY']
    prompt = f"""Du übersetzt kurze deutsche Witze für Deutschlernende in die Sprache: {name} (Sprachcode {lang}).
Für jeden Eintrag gibt es "t" (der Witz, Zeilen mit \\n getrennt) und "why" (kurze Erklärung, warum er lustig ist).
Regeln:
- Übersetze natürlich und gut verständlich, Zeilenumbrüche (\\n) beibehalten.
- Bei Wortspielen: übersetze den Sinn und schreibe das deutsche Schlüsselwort in Klammern dazu, z. B. „(auf Deutsch: Plätzchen)“, damit die Erklärung verständlich bleibt.
- "why" ebenfalls übersetzen; deutsche Beispielwörter in Anführungszeichen unverändert lassen.
- Antworte NUR mit JSON: ein Objekt mit denselben Schlüsseln, Werte {{"t": "...", "why": "..."}}.
Einträge:
{json.dumps(items, ensure_ascii=False)}"""
    last = None
    for model in gemini_models()[:4]:
        try:
            j = post(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                     {'contents': [{'parts': [{'text': prompt}]}], 'generationConfig': {'responseMimeType': 'application/json', 'temperature': 0.3}},
                     {'x-goog-api-key': key})
            txt = j['candidates'][0]['content']['parts'][0]['text']
            return json.loads(txt)
        except Exception as e:
            last = RuntimeError(f'{model}: {e}')
    raise last

def gtranslate(items, lang, name):
    key = os.environ['GOOGLE_TTS_API_KEY']
    keys = list(items); q = []
    for k in keys: q += [items[k]['t'], items[k]['why']]
    out = {}
    for i in range(0, len(q), 100):
        j = post(f'https://translation.googleapis.com/language/translate/v2?key={key}', {'q': q[i:i + 100], 'source': 'de', 'target': lang, 'format': 'text'}, {})
        out[i] = [x['translatedText'] for x in j['data']['translations']]
    flat = [t for i in sorted(out) for t in out[i]]
    return {k: {'t': flat[2 * n], 'why': flat[2 * n + 1]} for n, k in enumerate(keys)}

def main():
    d = load()
    jokes = {fnv(j['t']): {'t': j['t'], 'why': j['why']} for j in d['jokes']}
    eng = 'gemini' if os.environ.get('GEMINI_API_KEY') else 'google' if os.environ.get('GOOGLE_TTS_API_KEY') else None
    if not eng:
        print('Kein Schlüssel (GEMINI_API_KEY oder GOOGLE_TTS_API_KEY) – nichts zu tun.'); return
    status = {'engine': eng, 'ok': [], 'errors': {}}
    for code, name in d['langs']:
        p = os.path.join(OUT, code + '.json')
        try: have = json.load(open(p, encoding='utf-8'))
        except Exception: have = {}
        have = {k: v for k, v in have.items() if k in jokes}  # gelöschte Witze entfernen
        todo = {k: v for k, v in jokes.items() if k not in have}
        if not todo:
            status['ok'].append(code); continue
        try:
            for chunk_start in range(0, len(todo), 26):
                part = dict(list(todo.items())[chunk_start:chunk_start + 26])
                res = (gemini if eng == 'gemini' else gtranslate)(part, code, name)
                for k in part:
                    v = res.get(k)
                    if isinstance(v, dict) and v.get('t'): have[k] = {'t': str(v['t']).strip(), 'why': str(v.get('why', '')).strip()}
                if eng == 'gemini': time.sleep(float(os.environ.get('GEMINI_PAUSE', '6')))
            json.dump(have, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            status['ok'].append(code); print('✓', code, len(have), flush=True)
        except Exception as e:
            status['errors'][code] = str(e)[:300]; print('✗', code, e, flush=True)
            if eng == 'gemini' and len(status['errors']) >= 4 and not status['ok']: break
    json.dump(status, open(os.path.join(OUT, 'status.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('fertig', len(status['ok']), 'Sprachen,', len(status['errors']), 'Fehler')

if __name__ == '__main__':
    main()
