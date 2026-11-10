#!/usr/bin/env python3
"""Builds the section pages /<pfad>/ (pruefung, lieder, lernpakete, lernpakete/<paket> …) and their preview images.

Each page is a copy of index.html (the full app) with its own title, description, canonical address and
BreadcrumbList. On load it switches the address to /#<pfad>, so the app opens the right section directly –
no redirect, so Google indexes the page with its real content.
Preview images (assets/og/*.jpg) are only drawn when missing; --images redraws all of them.

IMPORTANT: run again after every change to index.html (new ?v= numbers!). The GitHub workflow
"Seiten aktualisieren" (.github/workflows/seiten.yml) does that automatically after each push.
Run in the repo folder:  python3 tools/make-share-pages.py  [--images]"""
import json, os, re, subprocess, html, sys
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(R, 'tools', 'fonts')
SITE = 'https://deutsch-mit-dennis.de'
B = lambda s: ImageFont.truetype(os.path.join(F, 'Atk-B.ttf'), s)
Rg = lambda s: ImageFont.truetype(os.path.join(F, 'Atk-R.ttf'), s)
C = lambda s: ImageFont.truetype(os.path.join(F, 'Cav.ttf'), s)
INK, BLUE, SUN, PAPER = (23, 32, 54), (35, 65, 181), (255, 228, 92), (251, 251, 248)

def wrap(d, t, f, w):
    out, line = [], ''
    for wd in t.split():
        tt = (line + ' ' + wd).strip()
        if d.textlength(tt, font=f) <= w: line = tt
        else: out.append(line); line = wd
    return out + [line]

def card(title, sub, out, pic=None, kicker='Deutsch mit Dennis'):
    if os.path.exists(out) and '--images' not in sys.argv:
        return  # keep the existing image (redrawing only re-encodes it)
    im = Image.new('RGB', (1200, 630), PAPER); d = ImageDraw.Draw(im)
    for x in range(0, 1200, 30): d.line([(x, 0), (x, 630)], fill=(232, 236, 247))
    for y in range(0, 630, 30): d.line([(0, y), (1200, y)], fill=(232, 236, 247))
    d.rectangle([0, 0, 1200, 14], fill=BLUE)
    if pic is None:
        ph = Image.open(os.path.join(R, 'assets', 'dennis.webp')).convert('RGBA')
        h = 600; ph = ph.resize((int(ph.width * h / ph.height), h), Image.LANCZOS)
        d.ellipse([820, 300, 1180, 520], fill=SUN)
        im.paste(ph, (1200 - ph.width - 30, 630 - h), ph)
        textw = 1200 - ph.width - 110
    else:
        cv = Image.open(pic).convert('RGB').resize((470, 470), Image.LANCZOS)
        d.rounded_rectangle([680, 66, 1170, 556], 22, fill=(214, 221, 240))
        im.paste(cv, (690, 76)); textw = 580
    y = 70
    d.text((64, y), kicker.upper(), font=B(26), fill=(29, 122, 69)); y += 52
    ft = B(64 if len(title) < 40 else 54)
    for ln in wrap(d, title, ft, textw):
        d.text((64, y), ln, font=ft, fill=INK); y += int(ft.size * 1.12)
    y += 16
    for ln in wrap(d, sub, Rg(30), textw)[:4]:
        d.text((64, y), ln, font=Rg(30), fill=(70, 80, 105)); y += 42
    d.text((64, 548), 'Deutsch', font=B(40), fill=INK)
    d.text((64 + d.textlength('Deutsch ', font=B(40)), 540), 'mit Dennis', font=C(46), fill=BLUE)
    d.text((64, 596), 'deutsch-mit-dennis.de', font=Rg(22), fill=(86, 96, 120))
    os.makedirs(os.path.dirname(out), exist_ok=True); im.save(out, quality=86, optimize=True)



def seo_title(t):
    '''<title>: add the brand only while the whole title stays under 60 characters (Google cuts longer ones).'''
    full = f"{t} – Deutsch mit Dennis"
    if len(full) < 60:
        return full
    # still too long: keep the part before the last dash ("Lehrerpaket: X – details" -> "Lehrerpaket: X")
    return t.rsplit(" – ", 1)[0] if len(t) >= 60 and " – " in t else t


def seo_desc(d, n=154):
    '''meta description under 155 characters, cut at a word boundary.'''
    d = " ".join(d.split())
    return d if len(d) <= n else d[: n - 1].rsplit(" ", 1)[0].rstrip(",;:–-") + "…"


def breadcrumbs(route, title):
    # Start > [Lernpakete >] page
    items = [('Start', '')]
    if route.startswith('lernpakete/'): items.append(('Lernpakete', 'lernpakete'))
    items.append((title, route))
    return json.dumps({'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': f'{SITE}/' + (p + '/' if p else '')} for i, (n, p) in enumerate(items)]}, ensure_ascii=False)

APP = open(os.path.join(R, 'index.html'), encoding='utf-8').read()


def swap(doc, pattern, new):
    doc2, n = re.subn(pattern, lambda _: new, doc, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f'index.html changed – pattern not found: {pattern}')
    return doc2


def stub(route, title, desc, img):
    """Copy of the app for one section (see module docstring)."""
    url = f'{SITE}/{route}/'
    e = html.escape
    d = APP
    # base address for all relative links/files + open the right section (keeps an extra #part: /lieder/#a1 -> #lieder/a1)
    d = swap(d, r'<head>\n', '<head>\n<base href="/">\n<script>(function(){var h=location.hash.slice(1);'
             'history.replaceState(null,"","/#%s"+(h?"/"+h:""))})()</script>\n' % route)
    d = swap(d, r'<title>.*?</title>', f'<title>{e(seo_title(title))}</title>')
    d = swap(d, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{e(seo_desc(desc))}">')
    d = swap(d, r'<script type="application/ld\+json">.*?</script>', f'<script type="application/ld+json">{breadcrumbs(route, title)}</script>')
    d = swap(d, r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">')
    d = swap(d, r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">')
    d = swap(d, r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{e(title)}">')
    d = swap(d, r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{e(desc)}">')
    d = swap(d, r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{SITE}/{img}">')
    # the start-page intro text belongs to the start page only
    d = swap(d, r'<!--intro:start-->.*?<!--intro:end-->\n<script>window\.DMIntro=[^<]*</script>\n', '')
    d = swap(d, r'<!--intro-noscript:start-->.*?<!--intro-noscript:end-->',
             f'<h1>{e(title)}</h1>\n<p>{e(desc)}</p>\n<p><a href="/#{route}">Weiter zu „{e(title)}“</a></p>')
    d = d.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- generated by tools/make-share-pages.py from index.html – do not edit -->', 1)
    path = os.path.join(R, route, 'index.html'); os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8', newline='\n').write(d)
    return url

js = subprocess.run(['node', '-e', "global.window={};require('./site-data.js');console.log(JSON.stringify(window.DM.packages))"], cwd=R, capture_output=True, text=True)
P = json.loads(js.stdout)
O = 'assets/og'
card('Deutsch lernen mit Dennis', 'Kostenlose Übungen von A1 bis B2 Beruf: Sprechen, Schreiben, Hören, DTZ- und B2-Training, Lieder. Ohne Anmeldung.', os.path.join(R, O, 'start.jpg'), kicker='DTZ-Prüfer · telc-Prüfer · BAMF-zugelassen')
SECTIONS = [
    ('lernpakete', 'Lernpakete als PDF', 'Ausführliche PDF-Pakete mit Musterlösungen für DTZ, B2 Beruf, „Leben in Deutschland“ und für Lehrkräfte.'),
    ('lieder', 'Deutsch mit Liedern', '62 eigene Lieder von A1 bis C1 – mit Text, Aufgaben und Lösungen. Hör zu, sing mit und lerne.'),
    ('pruefung', 'Prüfungstraining DTZ, telc und DTB', 'Schreiben, Sprechen, Hören und Lesen wie in der Prüfung – DTZ, Leben in Deutschland, telc B1/B2, DTB B1/B2. Von einem lizenzierten Prüfer.'),
    ('simulation', 'Prüfungssimulationen mit Zeitvorgabe', 'DTZ, Leben in Deutschland, telc B1, DTB B1, telc B2 und DTB B2 – komplette Prüfungen mit echter Zeit, Punkten, Bestehensregel und Lösungen. Kostenlos.'),
    ('vorbereitung', 'Gezielte Vorbereitung: telc B1, telc B2, DTB', 'Aufbau, Strategien und Fallen für jeden Prüfungsteil, Mini-Übungen, Redemittel und 4-Wochen-Lernplan – von einem lizenzierten Prüfer.'),
    ('ueben', 'Deutsch üben', 'Sprechen und Schreiben mit Sofort-Korrektur, Satzanfängen und Mustertexten. Kostenlos.'),
    ('hoeren', 'Hörtraining DTZ und B2', 'Ansagen, Mailbox-Nachrichten und Gespräche mit Aufgaben wie in der Prüfung.'),
    ('lesen', 'Leseverstehen DTZ und B2', 'Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – mit Fragen und Erklärungen. Jede Woche ein neuer Text.'),
    ('spiele', 'Lernspiele: Deutsch spielend üben', '22 Lernspiele: Jump’n’Run „Lino läuft“ und Story-Abenteuer „Neu in Deutschland“ (A1–C1), Grammatik und Wörter, Alltag (Reisen, Einkaufen, Ämter), Prüfung DTB B2 Beruf und Test „Leben in Deutschland“ – am Handy und am Computer.'),
    ('bild', 'Bild beschreiben – DTZ-Trainer', 'Adjektivendungen und Relativsätze an vier Bildern üben – mit Musterbeschreibung zum Anhören und Arbeitsblättern.'),
    ('challenge', 'Tages-Challenge: 10 Aufgaben, jeden Tag neu', 'Artikel, Verben, Satzbau, Wortschatz und „Leben in Deutschland“ – 3 Minuten am Tag. Wie lang wird deine Lernserie?'),
    ('lid', 'Leben in Deutschland: alle 310 Fragen', 'Kostenloser Trainer für den Test „Leben in Deutschland“ – mit Lernmodus und Prüfungssimulation.'),
    ('ueber-mich', 'Über Dennis', 'Deutschlehrer seit 2017, lizenzierter DTZ- und telc-Prüfer, vom BAMF zugelassen bis C2.'),
]
urls = [SITE + '/']
for route, t, dsc in SECTIONS:
    card(t, dsc, os.path.join(R, O, route + '.jpg')); urls.append(stub(route, t, dsc, f'{O}/{route}.jpg'))
for k in P:
    sub = f"{k['level']} · {k['target']} · {k['pages']} Seiten PDF" + (f" · {k['price']}" if k.get('price') else '')
    card(k['title'], sub, os.path.join(R, O, 'paket-' + k['id'] + '.jpg'), pic=os.path.join(R, k['img']), kicker='Lernpaket' if k['group'] != 'lehrende' else 'Für Lehrkräfte')
    urls.append(stub('lernpakete/' + k['id'], k['title'], k['desc'], f"{O}/paket-{k['id']}.jpg"))
open(os.path.join(R, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
print(len(urls), 'Seiten')
# readable content pages (songs, LiD questions, simulations, legal pages) are built next;
# its last step runs tools/build-sitemap.js, which writes sitemap.xml (with <lastmod>)
subprocess.run([sys.executable, '-X', 'utf8', os.path.join(R, 'tools', 'make-seo-pages.py')], cwd=R, check=True)  # same Python (works on Windows too)
