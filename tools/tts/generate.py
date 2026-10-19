#!/usr/bin/env python3
"""Erzeugt alle Hörtexte der Website als MP3 mit natürlichen Neural-Stimmen.

Läuft auf GitHub Actions (.github/workflows/audio.yml). Eingabe: tools/tts/manifest.json
Ausgabe:  audio/tts/<key>.mp3  +  audio/tts/index.json (welche Dateien es gibt)

Anbieter-Kette: zuerst Gemini, bei leerem Guthaben ElevenLabs (siehe engines()). Stimmen-Anbieter:
  1. ElevenLabs   – Repository-Secret ELEVENLABS_API_KEY  (sehr natürlich)
  2. Google Cloud Text-to-Speech (Chirp 3 HD) – Secret GOOGLE_TTS_API_KEY (sehr natürlich, 1 Mio. Zeichen/Monat frei)
  3. Google Gemini – Repository-Secret GEMINI_API_KEY      (AI Studio, sehr natürlich)
  4. Piper        – freie Neural-Stimmen, ohne Schlüssel  (Standard)
Wechselt der Anbieter, werden alle Dateien automatisch neu erzeugt.
"""
import base64, hashlib, json, os, subprocess, sys, tempfile, time, urllib.request, urllib.error, wave

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'audio', 'tts')
MANIFEST = os.path.join(ROOT, 'tools', 'tts', 'manifest.json')
INDEX = os.path.join(OUT, 'index.json')
STATUS = os.path.join(OUT, 'status.json')
MAX_SECONDS = int(os.environ.get('TTS_MAX_SECONDS', '4800'))  # Zeitbudget pro Lauf
FORCE = os.environ.get('TTS_FORCE', '') in ('1', 'true', 'yes')
USAGE = os.path.join(OUT, 'usage.json')
# Kostenbremse: höchstens so viele Zeichen pro Kalendermonat an einen Bezahl-Anbieter schicken.
# Google Cloud Chirp 3 HD: 1.000.000 Zeichen/Monat frei – wir bleiben mit 600.000 weit darunter.
# ElevenLabs: Starter-Tarif (30.000 Credits/Monat, 1 Credit pro Zeichen). Das echte Restguthaben wird vor jedem
# Lauf über die API abgefragt (eleven_remaining); dieser Wert gilt nur, wenn die Abfrage nicht klappt.
MONTHLY_LIMIT = {'google': 600000, 'elevenlabs': 30000, 'gemini': 200000}

# Stimmen je Rolle (f = Frau, m = Mann). Anpassbar über die Umgebungsvariable TTS_VOICES (JSON).
VOICES = {
    # Deutsche Muttersprachler-Stimmen aus der ElevenLabs-Bibliothek (natürlicher als die englischen Standardstimmen)
    'elevenlabs': {'f1': 'zKHQdbB8oaQ7roNTiDTK',   # Laura – warm, freundlich
                   'f2': '1iF3vHdwHKuVKSPDK23Z',   # Louisa – warm, lebendig
                   'f3': 'fBs1tCpaSMsPcbMkLQlk',   # Yvonne – mittleres Alter
                   'm1': 'z1EhmmPwF0ENGYE8dBE6',   # Christian – Gesprächston
                   'm2': 'f64OyGck4gc2zk7QOs55',   # Leo – ruhig, natürlich
                   'm3': 'aTTiK3YzK3dXETpuDE2h'},  # Ben – jung
    'google': {'f1': 'de-DE-Chirp3-HD-Aoede', 'f2': 'de-DE-Chirp3-HD-Kore', 'f3': 'de-DE-Chirp3-HD-Leda',
               'm1': 'de-DE-Chirp3-HD-Charon', 'm2': 'de-DE-Chirp3-HD-Puck', 'm3': 'de-DE-Chirp3-HD-Orus'},
    'gemini': {'f1': 'Kore', 'f2': 'Aoede', 'f3': 'Leda', 'm1': 'Charon', 'm2': 'Puck', 'm3': 'Orus'},
    'piper': {'f1': 'de_DE-kerstin-low', 'f2': 'de_DE-ramona-low', 'f3': 'de_DE-eva_k-x_low',
              'm1': 'de_DE-thorsten-high', 'm2': 'de_DE-karlsson-low', 'm3': 'de_DE-pavoque-low'},
}
ELEVEN_FALLBACK = {'f1': 'EXAVITQu4vr4xnSDxMaL', 'f2': 'FGY2WhTYpPnrIDTdsKH5', 'f3': 'XrExE9yKIg1WjnnlVkGX',
                   'm1': 'JBFqnCBsd6RMkjVDRZzb', 'm2': 'onwK4e9ZLuTAKqWW03F9', 'm3': 'TX3LPaxmHKxFdv7VOQHJ'}
PIPER_PATH = {
    'de_DE-thorsten-high': 'de/de_DE/thorsten/high', 'de_DE-karlsson-low': 'de/de_DE/karlsson/low',
    'de_DE-pavoque-low': 'de/de_DE/pavoque/low', 'de_DE-kerstin-low': 'de/de_DE/kerstin/low',
    'de_DE-ramona-low': 'de/de_DE/ramona/low', 'de_DE-eva_k-x_low': 'de/de_DE/eva_k/x_low',
    'de_DE-thorsten-medium': 'de/de_DE/thorsten/medium',
}

def engine():
    if os.environ.get('ELEVENLABS_API_KEY'): return 'elevenlabs'
    if os.environ.get('GOOGLE_TTS_API_KEY'): return 'google'
    if os.environ.get('GEMINI_API_KEY'): return 'gemini'
    return 'piper'

def voice_for(eng, role):
    over = json.loads(os.environ.get('TTS_VOICES') or '{}').get(eng, {})
    table = {**VOICES[eng], **over}
    if role == 'ansage': role = 'f1'
    return table.get(role) or table['f1']

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

def http(url, body, headers, tries=6):
    data = json.dumps(body).encode()
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers={'content-type': 'application/json', **headers})
            with urllib.request.urlopen(req, timeout=180) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            msg = e.read()[:300].decode('utf-8', 'replace')
            if e.code == 429 and ('per day' in msg.lower() or 'PerDay' in msg or 'exceeded your current quota' in msg): raise RuntimeError(f'HTTP 429: {msg}')
            if e.code in (429, 500, 502, 503) and i < tries - 1:
                time.sleep(min(90, 15 * (i + 1))); continue
            raise RuntimeError(f'HTTP {e.code}: {msg}')
        except urllib.error.URLError:
            if i < tries - 1: time.sleep(10); continue
            raise

# ---------- Anbieter ----------
_piper = {}
def piper_voice(name):
    if name in _piper: return _piper[name]
    d = os.path.join(os.path.expanduser('~'), '.cache', 'piper'); os.makedirs(d, exist_ok=True)
    base = f'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/{PIPER_PATH[name]}/{name}'
    for ext in ('.onnx', '.onnx.json'):
        p = os.path.join(d, name + ext)
        if not os.path.exists(p): urllib.request.urlretrieve(base + ext + '?download=true', p)
    from piper import PiperVoice
    v = PiperVoice.load(os.path.join(d, name + '.onnx'), config_path=os.path.join(d, name + '.onnx.json'))
    _piper[name] = v
    return v

def synth_piper(text, role, wav):
    v = piper_voice(voice_for('piper', role))
    with wave.open(wav, 'wb') as w:
        if hasattr(v, 'synthesize_wav'):
            try:
                from piper import SynthesisConfig
                v.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=1.08, noise_scale=0.6, noise_w_scale=0.8))
            except ImportError:
                v.synthesize_wav(text, w)
        else:
            v.synthesize(text, w, length_scale=1.08, noise_scale=0.6, noise_w=0.8)

def synth_eleven(text, role, wav):
    vid = voice_for('elevenlabs', role)
    body = {'text': text, 'model_id': os.environ.get('ELEVENLABS_MODEL', 'eleven_multilingual_v2'),
            'voice_settings': {'stability': 0.4, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True, 'speed': 0.95}}
    hdr = {'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'accept': 'audio/mpeg'}
    try:
        mp3 = http(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128', body, hdr)
    except RuntimeError as e:
        # Bibliotheksstimme nicht im Konto verfügbar → mehrsprachige Standardstimme derselben Rolle
        fb = ELEVEN_FALLBACK.get(role if role in ELEVEN_FALLBACK else 'f1')
        if 'voice' not in str(e).lower() or vid == fb: raise
        print(f'    Stimme {vid} nicht verfügbar ({str(e)[:80]}) – nehme Standardstimme', flush=True)
        mp3 = http(f'https://api.elevenlabs.io/v1/text-to-speech/{fb}?output_format=mp3_44100_128', body, hdr)
    tmp = wav + '.mp3'; open(tmp, 'wb').write(mp3)
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-ar', '24000', '-ac', '1', wav]); os.remove(tmp)

def synth_gemini(text, role, wav):
    voice = voice_for('gemini', role)
    models = [m for m in [os.environ.get('GEMINI_TTS_MODEL'), 'gemini-2.5-flash-preview-tts', 'gemini-2.5-pro-preview-tts'] if m]
    prompt = ('Sprich den folgenden deutschen Text wie ein echter Mensch im Alltag: natürlich, locker, mit lebendiger '
              'Betonung und kleinen natürlichen Pausen, in ruhigem, gut verständlichem Tempo für Deutschlernende. '
              'Lies genau diesen Text, ohne etwas hinzuzufügen:\n\n' + text)
    body = {'contents': [{'parts': [{'text': prompt}]}],
            'generationConfig': {'responseModalities': ['AUDIO'],
                                 'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': voice}}}}}
    last = None
    for m in models:
        try:
            raw = http(f'https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent', body,
                       {'x-goog-api-key': os.environ['GEMINI_API_KEY']})
            j = json.loads(raw)
            pcm = base64.b64decode(j['candidates'][0]['content']['parts'][0]['inlineData']['data'])
            with wave.open(wav, 'wb') as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
            time.sleep(float(os.environ.get('GEMINI_PAUSE', '2')))  # Ratenbegrenzung im kostenlosen Kontingent
            return
        except Exception as e:  # nächstes Modell probieren
            last = e
    raise last

def synth_google(text, role, wav):
    voice = voice_for('google', role)
    body = {'input': {'text': text}, 'voice': {'languageCode': 'de-DE', 'name': voice},
            'audioConfig': {'audioEncoding': 'LINEAR16', 'sampleRateHertz': 24000}}
    raw = http('https://texttospeech.googleapis.com/v1/text:synthesize', body,
               {'x-goog-api-key': os.environ['GOOGLE_TTS_API_KEY']})
    data = base64.b64decode(json.loads(raw)['audioContent'])
    open(wav, 'wb').write(data)  # LINEAR16 kommt als fertige WAV-Datei

SYNTH = {'piper': synth_piper, 'elevenlabs': synth_eleven, 'gemini': synth_gemini, 'google': synth_google}

# ---------- Ablauf ----------
def signature(entry, eng):
    payload = json.dumps([[s.get('voice'), s.get('say') or s['text']] for s in entry['segments']], ensure_ascii=False)
    if entry.get('fx') and eng != 'text': payload += '|fx=' + entry['fx']  # Klangeffekt gehört zur Aufnahme
    return hashlib.sha1((eng + '|' + payload).encode()).hexdigest()[:10]

def build(entry, eng, target):
    with tempfile.TemporaryDirectory() as td:
        parts = []
        for i, seg in enumerate(entry['segments']):
            text = (seg.get('say') or seg['text']).strip()
            if not text: continue
            w = os.path.join(td, f'{i:03d}.wav')
            SYNTH[eng](text, seg.get('voice', 'f1'), w)
            norm = os.path.join(td, f'{i:03d}n.wav')
            run(['ffmpeg', '-y', '-loglevel', 'error', '-i', w, '-ar', '24000', '-ac', '1', norm])
            parts.append(norm)
        if not parts: raise RuntimeError('leer')
        pause = float(entry.get('pause', 0.55))
        sil = os.path.join(td, 'sil.wav')
        run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', f'anullsrc=r=24000:cl=mono', '-t', str(pause), sil])
        lst = os.path.join(td, 'list.txt')
        with open(lst, 'w') as f:
            f.write(f"file '{sil}'\n")
            for p in parts: f.write(f"file '{p}'\nfile '{sil}'\n")
        fx = entry.get('fx')
        if fx in ('telefon', 'mailbox'):
            # Anrufbeantworter: Signalton, dann Stimme leicht wie durchs Telefon (sanfter Filter, damit sie menschlich bleibt).
            speech = os.path.join(td, 'speech.wav')
            run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-ar', '24000', '-ac', '1', speech])
            beep = os.path.join(td, 'beep.wav')
            run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono:d=0.35',
                 '-f', 'lavfi', '-i', 'sine=f=1000:r=24000:d=0.45', '-filter_complex',
                 '[1]volume=0.25,afade=t=in:d=0.01,afade=t=out:st=0.43:d=0.02[b];[0][b]concat=n=2:v=0:a=1', beep])
            run(['ffmpeg', '-y', '-loglevel', 'error', '-i', beep, '-i', speech,
                 '-f', 'lavfi', '-i', 'anoisesrc=r=24000:c=pink:a=0.0025',
                 '-filter_complex',
                 '[1]highpass=f=180,lowpass=f=5000,acompressor=threshold=-22dB:ratio=2:attack=10:release=120[v];'
                 '[2]highpass=f=300,lowpass=f=3000[n];[v][n]amix=inputs=2:duration=first:normalize=0[vn];'
                 '[0][vn]concat=n=2:v=0:a=1,loudnorm=I=-17:TP=-1.5:LRA=11',
                 '-ar', '44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '96k', target])
            return
        run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst,
             '-af', 'loudnorm=I=-17:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '96k', target])

def engines():
    """Anbieter-Kette (Wunsch von Dennis, 19.10.2026): zuerst Gemini; ist dort das Guthaben aufgebraucht,
    übernimmt ElevenLabs (bezahlter Starter-Tarif). Reihenfolge änderbar über TTS_ORDER, z. B. "elevenlabs,gemini"."""
    order = [x.strip() for x in os.environ.get('TTS_ORDER', 'gemini,elevenlabs').split(',') if x.strip()]
    env = {'gemini': 'GEMINI_API_KEY', 'elevenlabs': 'ELEVENLABS_API_KEY', 'google': 'GOOGLE_TTS_API_KEY'}
    chain = [k for k in order if os.environ.get(env.get(k, ''))]
    if not chain: chain = [engine()]
    return chain

def eleven_remaining():
    """Restguthaben (Zeichen) im ElevenLabs-Konto laut API – None, wenn die Abfrage nicht klappt."""
    try:
        req = urllib.request.Request('https://api.elevenlabs.io/v1/user/subscription', headers={'xi-api-key': os.environ['ELEVENLABS_API_KEY']})
        j = json.load(urllib.request.urlopen(req, timeout=30))
        rest = int(j['character_limit']) - int(j['character_count'])
        print(f"ElevenLabs-Konto: Tarif {j.get('tier')}, {j['character_count']} von {j['character_limit']} Zeichen verbraucht, Rest {rest}", flush=True)
        return max(0, rest - 300)  # kleine Reserve
    except Exception as ex:
        print(f'ElevenLabs-Guthaben nicht abfragbar ({str(ex)[:120]}) – nehme Monatsgrenze', flush=True)
        return None

# Bessere Anbieter ersetzen ältere Aufnahmen; Piper ersetzt keine Premium-Aufnahmen.
# Gemini und ElevenLabs gelten als gleichwertig: vorhandene Aufnahmen werden nicht noch einmal (kostenpflichtig) neu erzeugt.
RANK = {'piper': 1, 'google': 2, 'gemini': 3, 'elevenlabs': 3}

def prio(item):
    """Zuerst Prüfungs-Hörtexte (Simulationen und Hörtraining, neueste zuerst), dann Beispiele, dann kurze Sätze."""
    if item[0].get('prio') == 0: return (0, item[0].get('ord', 0), item[0]['key'])
    k = item[0]['key']
    if k.startswith(('dtz-', 'b2-')):
        pre, nr, idx = (k.split('-') + ['0', '0'])[:3]
        return (0, -int(nr) if nr.isdigit() else 0, idx)
    return (1 if k.startswith('ex-') else 2, 0, k)

def run_engine(eng, entries, files, usage, month, start):
    todo = []
    for e in entries:
        sig = signature(e, eng)
        cur = files.get(e['key'])
        have = os.path.exists(os.path.join(OUT, e['key'] + '.mp3'))
        if not FORCE and have and cur:
            if cur.get('sig') == sig: continue
            same_text = cur.get('text') == signature(e, 'text')
            if same_text and cur.get('fx') == e.get('fx') and RANK.get(cur.get('engine'), 0) >= RANK[eng]: continue
        todo.append((e, sig))
    todo.sort(key=prio)
    used = usage.get(month, {}).get(eng, 0)
    limit = int(os.environ.get('TTS_MONTHLY_LIMIT_' + eng.upper()) or MONTHLY_LIMIT.get(eng, 10**12))
    if eng == 'elevenlabs' and todo:
        rest = eleven_remaining()
        if rest is not None: limit = used + rest
    done, errors = 0, []
    print(f'Anbieter: {eng} · {len(entries)} Einträge · {len(todo)} zu erzeugen', flush=True)
    for e, sig in todo:
        if time.time() - start > MAX_SECONDS:
            print('Zeitbudget erreicht – der Rest folgt beim nächsten Lauf.'); break
        chars = sum(len((s.get('say') or s['text']).strip()) for s in e['segments'])
        if eng != 'piper' and used + chars > limit:
            print(f'Monatsgrenze erreicht ({used} von {limit} Zeichen).'); break
        try:
            if eng != 'piper': used += chars  # auch fehlgeschlagene Versuche zählen vorsichtshalber mit
            build(e, eng, os.path.join(OUT, e['key'] + '.mp3'))
            files[e['key']] = {'sig': sig, 'engine': eng, 'text': signature(e, 'text'), **({'fx': e['fx']} if e.get('fx') else {})}
            done += 1
            print(f'  ✓ {e["key"]}', flush=True)
        except Exception as ex:
            msg = str(ex)
            errors.append({'key': e['key'], 'error': msg[:300]})
            print(f'  ✗ {e["key"]}: {msg[:200]}', flush=True)
            if 'quota_exceeded' in msg:
                # Kontingent beim Anbieter aufgebraucht. Nicht als „Monat verbraucht“ merken: nach einem
                # Tarif- oder Schlüsselwechsel soll der nächste Lauf sofort wieder starten (Restguthaben kommt per API).
                used -= chars
                print('Kontingent beim Anbieter aufgebraucht (Schlüssel/Tarif prüfen).'); break
            if eng == 'gemini' and 'HTTP 402' in msg:
                print('Gemini-Guthaben aufgebraucht – ElevenLabs übernimmt.'); break
            if eng == 'gemini' and ('RESOURCE_EXHAUSTED' in msg or 'HTTP 429' in msg):
                print('Tageskontingent von Gemini erreicht – morgen geht es weiter.'); break
            if eng != 'piper' and len(errors) >= 3 and done == 0:
                print('Zu viele Fehler mit dem Anbieter – Abbruch.'); break
    if eng != 'piper':
        usage.setdefault(month, {})[eng] = used
    return {'engine': eng, 'created': done, 'open': len(todo) - done, 'chars_this_month': used,
            'monthly_limit': limit, 'errors': errors[:20]}

def main():
    os.makedirs(OUT, exist_ok=True)
    entries = json.load(open(MANIFEST, encoding='utf-8'))['entries']
    try: index = json.load(open(INDEX, encoding='utf-8'))
    except Exception: index = {'files': {}}
    files = index.get('files', {})
    keys = {e['key'] for e in entries}
    for k in list(files):  # Dateien, die es im Manifest nicht mehr gibt
        if k not in keys:
            files.pop(k, None)
            try: os.remove(os.path.join(OUT, k + '.mp3'))
            except FileNotFoundError: pass
    month = time.strftime('%Y-%m', time.gmtime())
    try: usage = json.load(open(USAGE, encoding='utf-8'))
    except Exception: usage = {}
    start, runs = time.time(), []
    for eng in engines():
        runs.append(run_engine(eng, entries, files, usage, month, start))
        if time.time() - start > MAX_SECONDS: break
    json.dump(usage, open(USAGE, 'w', encoding='utf-8'), indent=1)
    used_engines = sorted({v.get('engine') for v in files.values()})
    json.dump({'updated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'engines': used_engines,
               'files': {k: {'v': v['sig'], 'engine': v.get('engine'), 'sig': v['sig'], 'text': v.get('text'), **({'fx': v['fx']} if v.get('fx') else {})} for k, v in sorted(files.items())}},
              open(INDEX, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    json.dump({'run': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'runs': runs},
              open(STATUS, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('Fertig: ' + ' · '.join(f"{r['engine']} {r['created']} erzeugt, {r['open']} offen" for r in runs))

if __name__ == '__main__':
    sys.exit(main())
