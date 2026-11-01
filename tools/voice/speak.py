"""Text -> MP3 in Dennis' cloned voice (ElevenLabs). Settings: tools/voice/dennis.json, key: ELEVENLABS_API_KEY in .env.
Usage:
  python tools/voice/speak.py "Ein Satz." out.mp3 [--speed 0.85] [--model eleven_v3] [--voice <voice_id>] [--similarity 0.95]
  python tools/voice/speak.py text.txt out.mp3          # .txt/.md file; long texts are voiced in paragraphs and joined
"""
import json, os, re, subprocess, sys, tempfile, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CHUNK = 2500  # characters per request – keeps intonation stable and stays below API limits


def api_key():
    key = os.environ.get('ELEVENLABS_API_KEY')
    env = os.path.join(ROOT, '.env')
    if not key and os.path.exists(env):
        for line in open(env, encoding='utf-8'):
            if line.startswith('ELEVENLABS_API_KEY='):
                key = line.split('=', 1)[1].strip()
    if not key:
        sys.exit('ELEVENLABS_API_KEY fehlt (in .env eintragen).')
    return key


def chunks(text):
    paras = [p.strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    out, cur = [], ''
    for p in paras:
        if cur and len(cur) + len(p) > CHUNK:
            out.append(cur); cur = ''
        cur = (cur + '\n\n' + p).strip()
    if cur: out.append(cur)
    return out


def tts(text, path, cfg, key):
    body = {'text': text, 'model_id': cfg['model_id'], 'voice_settings': cfg['voice_settings']}
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{cfg['voice_id']}?output_format=mp3_44100_128",
                                 data=json.dumps(body).encode(), headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=300) as r, open(path, 'wb') as f:
        f.write(r.read())


def main():
    args = sys.argv[1:]
    if len(args) < 2: sys.exit(__doc__)
    src, out = args[0], args[1]
    cfg = json.load(open(os.path.join(HERE, 'dennis.json'), encoding='utf-8'))
    if '--speed' in args: cfg['voice_settings']['speed'] = float(args[args.index('--speed') + 1])
    if '--model' in args: cfg['model_id'] = args[args.index('--model') + 1]
    if '--voice' in args: cfg['voice_id'] = args[args.index('--voice') + 1]
    if '--similarity' in args: cfg['voice_settings']['similarity_boost'] = float(args[args.index('--similarity') + 1])
    text = open(src, encoding='utf-8').read() if os.path.isfile(src) else src
    text = re.sub(r'^#+\s*', '', text, flags=re.M)  # markdown headings -> plain text
    parts, key = chunks(text), api_key()
    if len(parts) == 1:
        tts(parts[0], out, cfg, key)
    else:
        with tempfile.TemporaryDirectory() as tmp:
            files = []
            for i, p in enumerate(parts):
                f = os.path.join(tmp, f'{i:03d}.mp3'); tts(p, f, cfg, key); files.append(f)
                print(f'Abschnitt {i + 1}/{len(parts)} fertig', flush=True)
            lst = os.path.join(tmp, 'list.txt')
            open(lst, 'w', encoding='utf-8').write(''.join(f"file '{f}'\n" for f in files))
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', out], check=True)
    print(f'{out} ({len(text)} Zeichen)')


if __name__ == '__main__':
    main()
