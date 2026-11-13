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


def stub(route, title, desc, img, extra_html='', extra_ld=None):
    """Copy of the app for one section (see module docstring).
    extra_html: readable content for the <noscript> part (bots without JavaScript); extra_ld: more JSON-LD blocks."""
    url = f'{SITE}/{route}/'
    e = html.escape
    d = APP
    # base address for all relative links/files + open the right section (keeps an extra #part: /lieder/#a1 -> #lieder/a1)
    d = swap(d, r'<head>\n', '<head>\n<base href="/">\n<script>(function(){var h=location.hash.slice(1);'
             'history.replaceState(null,"","/#%s"+(h?"/"+h:""))})()</script>\n' % route)
    d = swap(d, r'<title>.*?</title>', f'<title>{e(seo_title(title))}</title>')
    d = swap(d, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{e(seo_desc(desc))}">')
    ld = f'<script type="application/ld+json">{breadcrumbs(route, title)}</script>' + ''.join(
        f'\n<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>' for b in (extra_ld or []))
    d = swap(d, r'<script type="application/ld\+json">.*?</script>', ld)
    d = swap(d, r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">')
    d = swap(d, r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">')
    d = swap(d, r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{e(title)}">')
    d = swap(d, r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{e(desc)}">')
    d = swap(d, r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{SITE}/{img}">')
    # the start-page intro text belongs to the start page only
    d = swap(d, r'<!--intro:start-->.*?<!--intro:end-->\n<script>window\.DMIntro=[^<]*</script>\n', '')
    d = swap(d, r'<!--intro-noscript:start-->.*?<!--intro-noscript:end-->',
             f'<h1>{e(title)}</h1>\n<p>{e(desc)}</p>\n<p><a href="/#{route}">Weiter zu „{e(title)}“</a></p>' + extra_html)
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
    ('lieder', 'Deutsch mit Liedern', '63 eigene Lieder von A1 bis C1 – mit Text, Aufgaben und Lösungen. Hör zu, sing mit und lerne.'),
    ('pruefung', 'Prüfungstraining DTZ, telc und DTB', 'Schreiben, Sprechen, Hören und Lesen wie in der Prüfung – DTZ, Leben in Deutschland, telc B1/B2, DTB B1/B2. Von einem lizenzierten Prüfer.'),
    ('dtz-30-tage', 'DTZ in 30 Tagen: Lernplan', 'Fester Lernplan für den Deutsch-Test für Zuwanderer: 30 Tage, jeden Tag 20–40 Minuten, sechs Probeprüfungen mit Uhr. Kostenlos, von einem DTZ-Prüfer.'),
    ('b2-30-tage', 'B2 in 30 Tagen: Lernplan', 'Fester Lernplan für telc Deutsch B2 oder DTB B2: 30 Tage, meist 30–60 Minuten am Tag, Einstiegstest Teil für Teil und Generalprobe mit Uhr. Kostenlos, von einem telc-Prüfer.'),
    ('b2-woerter', 'B2-Wörter nach Prüfungsthemen: Karteikarten', '216 Karteikarten für telc Deutsch B2 und DTB B2 in 8 Themen – Arbeit, Kunden, Behörden, Wohnen, Gesundheit, Medien, Umwelt, Bildung. Mit Artikel, Plural, Beispielsatz und Vorlesen. Kostenlos.'),
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
# readable content (<noscript>) for app sections that are otherwise empty without JavaScript: data read from the app files
NODE = r"""
const fs=require('fs'),vm=require('vm');const c={console:{log(){}}};c.window=c;c.DM={};c.localStorage={getItem(){return null},setItem(){}};vm.createContext(c);
vm.runInContext(fs.readFileSync('b2-woerter-data.js','utf8'),c);
vm.runInContext(fs.readFileSync('b2-30.js','utf8').replace('const PLANS = {','const PLANS = DM.__b2plans = {'),c);
process.stdout.write(JSON.stringify({words:c.DM.b2Woerter||null,plans:c.DM.__b2plans||null}));
"""
X = json.loads(subprocess.run(['node', '-e', NODE], cwd=R, capture_output=True, text=True, encoding='utf-8', check=True).stdout)
esc = html.escape


def real_href(h):
    """app route (#lektion/x) or file -> real address when a readable page exists, else the app address."""
    if not h.startswith('#'):
        return '/' + h.lstrip('/')
    r = h[1:].split('/')
    if r[0] not in ('ueben', 'kurs') and os.path.exists(os.path.join(R, *r, 'index.html')):
        return '/' + '/'.join(r) + '/'
    return '/' + h


def plan_html(P, key):
    out = f'<h2 id="{key}">Lernplan {esc(P["name"])}</h2>\n<p>{esc(P["lead"])}</p>\n'
    ranges = [(0, 7), (7, 14), (14, 21), (21, 28), (28, 30)]
    for (w, sub), (a, b) in zip(P['weeks'], ranges):
        out += f'<h3>{esc(w)}: {esc(sub)}</h3>\n<ol start="{a + 1}">'
        for d in range(a, min(b, len(P['days']))):
            t, tasks, tip = P['days'][d]
            out += (f'<li><b>Tag {d + 1}: {esc(t)}</b> (ca. {sum(x[2] for x in tasks)} Min.)<ul>'
                    + ''.join(f'<li><a href="{esc(real_href(h))}">{esc(l)}</a> – {m} Min.</li>' for l, h, m in tasks)
                    + f'</ul>Tipp: {esc(tip)}</li>\n')
        out += '</ol>\n'
    return out


EXTRA, EXTRA_LD = {}, {}
if X.get('plans'):
    PL = X['plans']
    EXTRA['b2-30-tage'] = ('\n<p>Wähle deine Prüfung: <a href="/b2-30-tage/#telc">telc Deutsch B2</a> oder <a href="/b2-30-tage/#dtb">DTB B2</a>. '
                           'Aufbau und Strategien: <a href="/vorbereitung/telc-b2/">telc B2</a> · <a href="/vorbereitung/dtb-b2/">DTB B2</a>.</p>\n'
                           + ''.join(plan_html(PL[k], k) for k in ('telc', 'dtb') if k in PL))
    EXTRA_LD['b2-30-tage'] = [{
        '@context': 'https://schema.org', '@type': 'Course', 'name': 'B2 in 30 Tagen: Lernplan für telc Deutsch B2 und DTB B2',
        'description': 'Kostenloser Lernplan für 30 Tage: meist 30–60 Minuten am Tag, Einstiegstest Teil für Teil, Lesen, Hören, Schreiben, Sprechen, Wortschatz und Generalprobe mit Uhr.',
        'url': f'{SITE}/b2-30-tage/', 'inLanguage': 'de', 'educationalLevel': 'B2', 'isAccessibleForFree': True,
        'provider': {'@type': 'EducationalOrganization', '@id': f'{SITE}/#org', 'name': 'Deutsch mit Dennis', 'url': f'{SITE}/'},
        'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR', 'category': 'Free'},
        'hasCourseInstance': {'@type': 'CourseInstance', 'courseMode': 'online', 'courseWorkload': 'P30D'}}]
if X.get('words'):
    W = X['words']
    plain = lambda t: re.sub(r'<[^>]+>', '', t)
    EXTRA['b2-woerter'] = (f'\n<p>Alle Wörter auch als <a href="/{esc(W["pdf"])}">Wortliste zum Ausdrucken (PDF)</a>. '
                           'Mehr für B2: <a href="/niveau/b2/">alles für B2</a> · <a href="/ueben/sprechen/b2/">Sprechaufgaben B2</a>.</p>\n'
                           + ''.join(f'<h2>{esc(t["name"])} ({len(t["words"])} Wörter)</h2>\n<ul>'
                                     + ''.join(f'<li><b>{esc(plain(w["w"]))}</b>{" (" + esc(w["f"]) + ")" if w.get("f") else ""}: {esc(w.get("b", ""))}</li>' for w in t['words'])
                                     + '</ul>\n' for t in W['themes']))
urls = [SITE + '/']
for route, t, dsc in SECTIONS:
    card(t, dsc, os.path.join(R, O, route + '.jpg'))
    urls.append(stub(route, t, dsc, f'{O}/{route}.jpg', EXTRA.get(route, ''), EXTRA_LD.get(route)))
for k in P:
    sub = f"{k['level']} · {k['target']} · {k['pages']} Seiten PDF" + (f" · {k['price']}" if k.get('price') else '')
    card(k['title'], sub, os.path.join(R, O, 'paket-' + k['id'] + '.jpg'), pic=os.path.join(R, k['img']), kicker='Lernpaket' if k['group'] != 'lehrende' else 'Für Lehrkräfte')
    urls.append(stub('lernpakete/' + k['id'], k['title'], k['desc'], f"{O}/paket-{k['id']}.jpg"))
open(os.path.join(R, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
print(len(urls), 'Seiten')
# readable content pages (songs, LiD questions, simulations, legal pages) are built next;
# its last step runs tools/build-sitemap.js, which writes sitemap.xml (with <lastmod>)
subprocess.run([sys.executable, '-X', 'utf8', os.path.join(R, 'tools', 'make-seo-pages.py')], cwd=R, check=True)  # same Python (works on Windows too)
