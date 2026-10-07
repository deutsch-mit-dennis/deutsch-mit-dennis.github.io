#!/usr/bin/env python3
"""Erzeugt alle Hörtexte der Website als MP3 mit natürlichen Neural-Stimmen.

Läuft auf GitHub Actions (.github/workflows/audio.yml). Eingabe: tools/tts/manifest.json
Ausgabe:  audio/tts/<key>.mp3  +  audio/tts/index.json (welche Dateien es gibt)

Stimmen-Anbieter (der erste verfügbare wird benutzt):
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

# Stimmen je Rolle (f = Frau, m = Mann). Anpassbar über die Umgebungsvariable TTS_VOICES (JSON).
VOICES = {
    'elevenlabs': {'f1': 'EXAVITQu4vr4xnSDxMaL', 'f2': 'FGY2WhTYpPnrIDTdsKH5', 'f3': 'XrExE9yKIg1WjnnlVkGX',
                   'm1': 'JBFqnCBsd6RMkjVDRZzb', 'm2': 'onwK4e9ZLuTAKqWW03F9', 'm3': 'TX3LPaxmHKxFdv7VOQHJ'},
    'google': {'f1': 'de-DE-Chirp3-HD-Aoede', 'f2': 'de-DE-Chirp3-HD-Kore', 'f3': 'de-DE-Chirp3-HD-Leda',
               'm1': 'de-DE-Chirp3-HD-Charon', 'm2': 'de-DE-Chirp3-HD-Puck', 'm3': 'de-DE-Chirp3-HD-Orus'},
    'gemini': {'f1': 'Kore', 'f2': 'Aoede', 'f3': 'Leda', 'm1': 'Charon', 'm2': 'Puck', 'm3': 'Orus'},
    'piper': {'f1': 'de_DE-kerstin-low', 'f2': 'de_DE-ramona-low', 'f3': 'de_DE-eva_k-x_low',
              'm1': 'de_DE-thorsten-high', 'm2': 'de_DE-karlsson-low', 'm3': 'de_DE-pavoque-low'},
}
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
            'voice_settings': {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.15, 'use_speaker_boost': True}}
    mp3 = http(f'https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128', body,
               {'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'accept': 'audio/mpeg'})
    tmp = wav + '.mp3'; open(tmp, 'wb').write(mp3)
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-ar', '24000', '-ac', '1', wav]); os.remove(tmp)

def synth_gemini(text, role, wav):
    voice = voice_for('gemini', role)
    models = [m for m in [os.environ.get('GEMINI_TTS_MODEL'), 'gemini-2.5-flash-preview-tts', 'gemini-2.5-pro-preview-tts'] if m]
    prompt = ('Lies den folgenden deutschen Text natürlich, freundlich und in ruhigem, deutlichem Tempo vor, '
              'wie ein Muttersprachler im Alltag. Lies nur den Text vor:\n\n' + text)
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
            time.sleep(float(os.environ.get('GEMINI_PAUSE', '7')))  # Ratenbegrenzung im kostenlosen Kontingent
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
        run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst,
             '-af', 'loudnorm=I=-17:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', target])

def main():
    os.makedirs(OUT, exist_ok=True)
    entries = json.load(open(MANIFEST, encoding='utf-8'))['entries']
    eng = engine()
    try: index = json.load(open(INDEX, encoding='utf-8'))
    except Exception: index = {'files': {}}
    files = index.get('files', {})
    keys = {e['key'] for e in entries}
    for k in list(files):  # Dateien, die es im Manifest nicht mehr gibt
        if k not in keys:
            files.pop(k, None)
            try: os.remove(os.path.join(OUT, k + '.mp3'))
            except FileNotFoundError: pass
    # Bessere Anbieter ersetzen ältere Aufnahmen; Piper ersetzt keine Premium-Aufnahmen.
    rank = {'piper': 1, 'gemini': 2, 'google': 2, 'elevenlabs': 3}
    todo = []
    for e in entries:
        sig = signature(e, eng)
        cur = files.get(e['key'])
        have = os.path.exists(os.path.join(OUT, e['key'] + '.mp3'))
        if not FORCE and have and cur:
            if cur.get('sig') == sig: continue
            same_text = cur.get('text') == signature(e, 'text')
            if same_text and rank.get(cur.get('engine'), 0) >= rank[eng]: continue
        todo.append((e, sig))
    start, done, errors = time.time(), 0, []
    print(f'Anbieter: {eng} · {len(entries)} Einträge · {len(todo)} zu erzeugen', flush=True)
    for e, sig in todo:
        if time.time() - start > MAX_SECONDS:
            print('Zeitbudget erreicht – der Rest folgt beim nächsten Lauf.'); break
        try:
            build(e, eng, os.path.join(OUT, e['key'] + '.mp3'))
            files[e['key']] = {'sig': sig, 'engine': eng, 'text': signature(e, 'text')}
            done += 1
            print(f'  ✓ {e["key"]}', flush=True)
        except Exception as ex:
            errors.append({'key': e['key'], 'error': str(ex)[:300]})
            print(f'  ✗ {e["key"]}: {ex}', flush=True)
            if eng != 'piper' and len(errors) >= 5 and done == 0:
                print('Zu viele Fehler mit dem Anbieter – Abbruch.'); break
    engines = sorted({v.get('engine') for v in files.values()})
    json.dump({'updated': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'engines': engines,
               'files': {k: {'v': v['sig'], 'engine': v.get('engine'), 'sig': v['sig'], 'text': v.get('text')} for k, v in sorted(files.items())}},
              open(INDEX, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    json.dump({'run': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'engine': eng, 'created': done,
               'open': len(todo) - done, 'errors': errors[:40]}, open(STATUS, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'Fertig: {done} erzeugt, {len(errors)} Fehler, {len(todo) - done} offen.')

if __name__ == '__main__':
    sys.exit(main())
