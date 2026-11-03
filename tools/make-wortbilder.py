"""Picture for every vocabulary card (vocab-data.js) -> assets/wort/<key>.webp, made with Gemini image generation.
Key: GEMINI_API_KEY in .env (repo root, gitignored) or as environment variable. Existing pictures are skipped,
so the script can be re-run after an interruption. Cost: about 0.04 $ per picture (Gemini 2.5 Flash Image).
Usage: python tools/make-wortbilder.py [--only Rechnung,Mangel] [--redo Mangel]   (then: --sheet for a contact sheet)"""
import base64, io, json, os, re, subprocess, sys, time, urllib.error, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'wort')
MODEL = 'gemini-2.5-flash-image'
STYLE = ('Style: soft colored-pencil and watercolor storybook illustration, warm friendly colors, plain light cream background, '
         'one clear centered motif, square composition, no text, no letters, no numbers, no logos, no watermark. '
         'If people appear: adults and children of different origins, natural, respectful and realistic, everyday clothes.')


def key():
    k = os.environ.get('GEMINI_API_KEY')
    env = os.path.join(ROOT, '.env')
    if not k and os.path.exists(env):
        for line in open(env, encoding='utf-8'):
            if line.startswith('GEMINI_API_KEY='): k = line.split('=', 1)[1].strip()
    return k or sys.exit('GEMINI_API_KEY fehlt (in .env eintragen).')


def slug(k):  # must match vimg() in vocab.js
    k = k.lower().replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    return re.sub(r'[^a-z0-9]+', '-', k)


def words():
    js = "const fs=require('fs');const s=fs.readFileSync('vocab-data.js','utf8');const {wordLibrary}=new Function(s+';return {wordLibrary}')();console.log(JSON.stringify(wordLibrary))"
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT, encoding='utf-8'))


def prompt(w):
    return (f'Picture for a German vocabulary flashcard for adult learners. Word: "{w["word"]}" ({w["pos"]}). '
            f'Meaning: {w.get("meaning", "")} Example sentence: "{w.get("example", "")}". '
            'Show the meaning so a learner understands it at a glance; for abstract words show a typical everyday situation. ' + STYLE)


def generate(text, k):
    body = {'contents': [{'parts': [{'text': text}]}], 'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '1:1'}}}
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent',
                                 data=json.dumps(body).encode(), headers={'x-goog-api-key': k, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        for part in json.load(r)['candidates'][0]['content']['parts']:
            if 'inlineData' in part: return base64.b64decode(part['inlineData']['data'])
    raise RuntimeError('kein Bild in der Antwort')


def sheet():
    files = sorted(f for f in os.listdir(OUT) if f.endswith('.webp'))
    cols, s = 10, 128
    im = Image.new('RGB', (cols * s, ((len(files) + cols - 1) // cols) * s), 'white')
    for i, f in enumerate(files): im.paste(Image.open(os.path.join(OUT, f)).convert('RGB').resize((s, s)), ((i % cols) * s, (i // cols) * s))
    path = os.path.join(ROOT, 'qa-out', 'wortbilder-sheet.jpg'); os.makedirs(os.path.dirname(path), exist_ok=True); im.save(path, quality=80)
    print(path, len(files), 'Bilder')


def main():
    if '--sheet' in sys.argv: return sheet()
    arg = lambda n: set(sys.argv[sys.argv.index(n) + 1].split(',')) if n in sys.argv else set()
    only, redo, k = arg('--only'), arg('--redo'), key()
    os.makedirs(OUT, exist_ok=True)
    todo = [(kk, w) for kk, w in words().items() if (not only or kk in only) and (kk in redo or not os.path.exists(os.path.join(OUT, slug(kk) + '.webp')))]
    print(len(todo), 'Bilder zu erzeugen, ca.', round(len(todo) * 0.04, 2), '$', flush=True)
    for i, (kk, w) in enumerate(todo, 1):
        for attempt in range(3):
            try:
                png = generate(prompt(w), k); break
            except urllib.error.HTTPError as e:
                msg = e.read()[:200].decode('utf-8', 'replace')
                if e.code in (429, 500, 503) and attempt < 2: time.sleep(20 * (attempt + 1)); continue
                sys.exit(f'Abbruch bei {kk}: HTTP {e.code} {msg}')
        Image.open(io.BytesIO(png)).convert('RGB').resize((256, 256), Image.LANCZOS).save(os.path.join(OUT, slug(kk) + '.webp'), 'WEBP', quality=78, method=6)
        print(f'{i}/{len(todo)} {kk}', flush=True)


if __name__ == '__main__':
    assert slug('Lösung') == 'loesung' and slug('Familien name') == 'familien-name'
    main()
