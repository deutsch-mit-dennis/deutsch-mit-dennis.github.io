#!/usr/bin/env python3
"""Builds the section pages /<pfad>/ (pruefung, lieder, lernpakete, lernpakete/<paket> …) and their preview images.

Each page is a copy of index.html (the full app) with its own title, description, canonical address and
BreadcrumbList. On load it switches the address to /#<pfad>, so the app opens the right section directly –
no redirect, so Google indexes the page with its real content.
Preview images (assets/og/*.jpg) are only drawn when missing; --images redraws all of them.

IMPORTANT: run again after every change to index.html (new ?v= numbers!). The GitHub workflow
"Seiten aktualisieren" (.github/workflows/seiten.yml) does that automatically after each push.
Run in the repo folder:  python3 tools/make-share-pages.py  [--images]"""
import json, os, re, subprocess, html, sys, datetime
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(R, 'tools', 'fonts')
sys.path.insert(0, os.path.join(R, 'tools'))
from page_write import write_page  # noqa: E402
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
    if route.startswith('spiele/'): items.append(('Lernspiele', 'spiele'))
    if route.startswith('simulation/'): items.append(('Prüfungssimulationen', 'simulation'))
    items.append((title, route))
    return json.dumps({'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': f'{SITE}/' + (p + '/' if p else '')} for i, (n, p) in enumerate(items)]}, ensure_ascii=False)

APP = open(os.path.join(R, 'index.html'), encoding='utf-8').read()


def swap(doc, pattern, new):
    doc2, n = re.subn(pattern, lambda _: new, doc, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f'index.html changed – pattern not found: {pattern}')
    return doc2


MODIFIED = datetime.date.today().isoformat()  # dateModified = day of the generator run


def with_modified(b):
    # dateModified is valid on CreativeWork types (Course, LearningResource), not on ItemList etc.
    if isinstance(b, dict) and b.get('@type') in ('Course', 'LearningResource'):
        return {**b, 'dateModified': MODIFIED}
    return b


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
        f'\n<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>' for b in map(with_modified, extra_ld or []))
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
    write_page(path, d)
    return url

js = subprocess.run(['node', '-e', "global.window={};require('./site-data.js');console.log(JSON.stringify(window.DM.packages))"], cwd=R, capture_output=True, text=True)
P = json.loads(js.stdout)
O = 'assets/og'
card('Deutsch lernen mit Dennis', 'Kostenlose Übungen von A0 bis B2 Beruf: Sprechen, Schreiben, Hören, DTZ- und B2-Training, Lieder. Ohne Anmeldung.', os.path.join(R, O, 'start.jpg'), kicker='DTZ-Prüfer · telc-Prüfer · vom BAMF zugelassene Lehrkraft')
GAMES = json.loads(subprocess.run(['node', os.path.join(R, 'tools', 'spiele-meta.js')], cwd=R, capture_output=True, text=True, encoding='utf-8', check=True).stdout)
SECTIONS = [
    ('lernpakete', 'Lernpakete als PDF', 'Ausführliche PDF-Pakete mit Musterlösungen für DTZ, B2 Beruf, „Leben in Deutschland“ und für Lehrkräfte.'),
    ('lieder', 'Deutsch mit Liedern', '63 eigene Lieder von A1 bis C1 – mit Text, Aufgaben und Lösungen. Hör zu, sing mit und lerne.'),
    ('pruefung', 'B1 und B2 Prüfung üben: DTZ, telc, DTB', 'Prüfung üben mit Schreiben, Sprechen, Hören und Lesen: DTZ, Leben in Deutschland, telc B1/B2 und DTB B1/B2. Kostenlos, von einem lizenzierten Prüfer.'),
    ('dtz-30-tage', 'DTZ Prüfung vorbereiten: 30-Tage-Lernplan', 'Lernplan für den Deutsch-Test für Zuwanderer: 30 Tage, täglich 20–40 Minuten, sechs Probeprüfungen mit Uhr. Kostenlos, von einem DTZ-Prüfer.'),
    ('b2-30-tage', 'B2 Prüfung vorbereiten: 30-Tage-Lernplan', 'Lernplan für telc Deutsch B2 oder DTB B2: 30 Tage, meist 30–60 Minuten täglich, Einstiegstest und Generalprobe mit Uhr. Kostenlos, von einem telc-Prüfer.'),
    ('b2-woerter', 'B2-Wörter nach Prüfungsthemen: Karteikarten', '216 Karteikarten für telc Deutsch B2 und DTB B2 in 8 Themen – Arbeit, Kunden, Behörden, Wohnen, Gesundheit, Medien, Umwelt, Bildung. Mit Artikel, Plural, Beispielsatz und Vorlesen. Kostenlos.'),
    ('b1-30-tage', 'B1 Prüfung vorbereiten: 30-Tage-Lernplan', 'Lernplan für telc Deutsch B1 oder DTB B1: 30 Tage, meist 30–60 Minuten täglich, Einstiegstest und Generalprobe mit Uhr. Kostenlos, von einem telc-Prüfer.'),
    ('b1-woerter', 'B1-Wörter nach Prüfungsthemen: Karteikarten', 'Karteikarten für telc Deutsch B1 und DTB B1 in 8 Themen – Arbeit, Wohnen, Gesundheit, Lernen, Reisen, Reklamation, Medien, Umwelt. Mit Artikel, Plural, Beispielsatz und Vorlesen. Kostenlos.'),
    ('sprachbausteine', 'Sprachbausteine üben: telc B2 und DTB B2', 'Lückentexte im Stil der Prüfung für telc Deutsch B2 und den Deutsch-Test für den Beruf B2 – Grammatik, Konnektoren und feste Verbindungen, mit sofortiger Kontrolle und Erklärung. Kostenlos.'),
    ('telc-b2-sprechen', 'Sprechen üben für telc Deutsch B2', 'Mündliche Prüfung telc B2 üben: Präsentation, Diskussion und gemeinsam etwas planen – mit immer neuen Aufgaben, Timer, Redemitteln und Checkliste. Kostenlos.'),
    ('dtz-woerter', 'DTZ-Wörter nach Prüfungsthemen: Karteikarten', 'Karteikarten für den Deutsch-Test für Zuwanderer (A2–B1) in 8 Themen – Wohnen, Arbeit, Ämter, Gesundheit, Kinder und Schule, Einkaufen, Verkehr, Freizeit. Mit Beispielsatz und Vorlesen. Kostenlos.'),
    ('a1-woerter', 'A1-Wörter nach Alltagsthemen: Karteikarten', 'Die ersten wichtigen Wörter auf Deutsch als Karteikarten: Familie, Wohnen, Essen, Einkaufen, Stadt, Arbeit, Gesundheit, Freizeit. Mit Artikel, Plural, Beispielsatz und Vorlesen. Kostenlos.'),
    ('simulation', 'Modelltest online: DTZ, telc B1, DTB, B2', 'Prüfungen online üben: DTZ, Leben in Deutschland, telc B1, DTB B1, telc B2 und DTB B2 mit echter Zeit, Punkten, Bestehensregel und Lösungen. Kostenlos.'),
    ('vorbereitung', 'Prüfung vorbereiten: telc B1, telc B2, DTB', 'Aufbau, Strategien und typische Fallen für jeden Prüfungsteil bei telc B1, telc B2 und DTB, mit Mini-Übungen, Redemitteln und 4-Wochen-Lernplan.'),
    ('ueben', 'Deutsch üben: Sprechen und Schreiben kostenlos', 'Sprechen und Schreiben online üben mit Sofort-Korrektur, Satzanfängen und Mustertexten. Kostenlos, ohne Anmeldung.'),
    ('hoeren', 'Hörverstehen üben: DTZ, DTB B1 und B2 online', 'Hörtexte mit Aufgaben wie in der Prüfung: Ansagen, Mailbox, Gespräche und Durchsagen für DTZ, DTB B1 und B2. Kostenlos, mit natürlicher Stimme.'),
    ('lesen', 'Leseverstehen üben: DTZ, DTB B1 und B2 online', 'Mitteilungen, Anzeigen, E-Mails und Artikel lesen, mit Fragen und Erklärungen wie im DTZ und im DTB. Kostenlos, ohne Anmeldung.'),
    ('spiele', 'Deutsch lernen mit Spielen: Lernspiele A1–B2', f'{len(GAMES)} kostenlose Lernspiele: der, die, das, Adjektivendungen, Satzbau, Uhrzeit, Verben, DTZ-Sprechen, B2-Beruf, Einbürgerungstest – auf dem Handy, ohne Anmeldung.'),
    ('bild', 'Bildbeschreibung DTZ: Beispiele, Redemittel', 'Bild beschreiben im DTZ (Sprechen Teil 2): vier Beispiele mit Musterbeschreibung, Redemittel, Übungen zu Adjektiven und Relativsätzen. Kostenlos.'),
    ('challenge', 'Tages-Challenge: 10 Aufgaben, jeden Tag neu', 'Artikel, Verben, Satzbau, Wortschatz und „Leben in Deutschland“ – 3 Minuten am Tag. Wie lang wird deine Lernserie?'),
    ('diktat', 'Deutsch Diktat online üben: A1 bis B2', 'Diktat zum Anhören für Deutschlernende: Sätze von A1 bis B2 hören, schreiben und sofort kontrollieren. Kostenlos, ohne Anmeldung, auf dem Handy.'),
    ('verben', 'Unregelmäßige Verben: Liste mit Perfekt', '132 unregelmäßige Verben von A1 bis B2 mit Präsens, Präteritum, Perfekt (haben oder sein) und Beispielsatz – mit Suche und Quiz. Kostenlos.'),
    ('lid', 'Leben in Deutschland Test & Einbürgerungstest: 310 Fragen', 'Kostenlos üben für den Einbürgerungstest und den Test „Leben in Deutschland“: alle 310 Fragen mit Lösung, Lernmodus und Testsimulation mit 33 Fragen.'),
    ('ueber-mich', 'Dennis Prudnikau: DaZ-Lehrer und Prüfer', 'Dennis Prudnikau: Deutschlehrer seit 2017, Prüfer für DTZ, telc und DTB, vom BAMF zugelassene Lehrkraft für Integrations- und Berufssprachkurse.'),
    # app sections that had no crawlable address before (2026-11-22); readable content: see EXTRA['kahoot'] … below
    ('kahoot', 'Kahoot Deutsch: Quiz für A1, DTZ und LiD', 'Kostenlose Kahoot-Quiz zum Deutschlernen: A1-Grammatik, DTZ Bild beschreiben und gemeinsam planen, Leben in Deutschland. Allein üben oder im Kurs spielen.'),
    ('videos', 'Deutsch lernen mit Videos: Erklärvideos', 'Kurze Erklärvideos von Dennis: der, die, das, Grammatik, DTZ und B1-Prüfung, Leben in Deutschland. Kostenlos auf YouTube, nach Thema sortiert.'),
    ('witz', 'Witz des Tages: deutsche Witze mit Erklärung', 'Jeden Tag ein neuer deutscher Witz mit Niveau und einer Erklärung in einfachem Deutsch: Warum ist das lustig? Mit Übersetzung in viele Sprachen.'),
    ('mikula', 'Mikula lernt Deutsch: typische Fehler', 'Mikula kommt aus dem Jahr 1024 und macht typische Fehler auf Deutsch. Findest du den Fehler? Jede Folge mit richtiger Lösung und kurzer Regel.'),
]
# readable content (<noscript>) for app sections that are otherwise empty without JavaScript: data read from the app files
NODE = r"""
const fs=require('fs'),vm=require('vm');const c={console:{log(){}}};c.window=c;c.DM={};c.localStorage={getItem(){return null},setItem(){}};vm.createContext(c);
for(const f of ['b2','b1','dtz','a1'])vm.runInContext(fs.readFileSync(f+'-woerter-data.js','utf8'),c);
vm.runInContext(fs.readFileSync('b2-30.js','utf8').replace('const PLANS = {','const PLANS = DM.__b2plans = {'),c);
vm.runInContext(fs.readFileSync('b1-30.js','utf8').replace('const PLANS = {','const PLANS = DM.__b1plans = {'),c);
const W=c.DM.woerter||{};
process.stdout.write(JSON.stringify({words:c.DM.b2Woerter||null,plans:c.DM.__b2plans||null,plans1:c.DM.__b1plans||null,w:{'b1-woerter':W.b1,'dtz-woerter':W.dtz,'a1-woerter':W.a1}}));
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
if X.get('plans1'):
    PL = X['plans1']
    EXTRA['b1-30-tage'] = ('\n<p>Wähle deine Prüfung: <a href="/b1-30-tage/#telc">telc Deutsch B1</a> oder <a href="/b1-30-tage/#dtb">DTB B1</a>. '
                           'Für den DTZ gibt es einen eigenen Plan: <a href="/dtz-30-tage/">DTZ in 30 Tagen</a>. '
                           'Aufbau und Strategien: <a href="/vorbereitung/telc-b1/">telc B1</a> · <a href="/vorbereitung/dtb-b1/">DTB B1</a>.</p>\n'
                           + ''.join(plan_html(PL[k], k) for k in ('telc', 'dtb') if k in PL))
plain = lambda t: re.sub(r'<[^>]+>', '', t)


def words_html(W, more):
    return (f'\n<p>Alle Wörter auch als <a href="/{esc(W["pdf"])}">Wortliste zum Ausdrucken (PDF)</a>. {more}</p>\n'
            + ''.join(f'<h2>{esc(t["name"])} ({len(t["words"])} Wörter)</h2>\n<ul>'
                      + ''.join(f'<li><b>{esc(plain(w["w"]))}</b>{" (" + esc(plain(w["f"])) + ")" if w.get("f") else ""}: {esc(w.get("b", ""))}</li>' for w in t['words'])
                      + '</ul>\n' for t in W['themes']))


if X.get('words'):
    EXTRA['b2-woerter'] = words_html(X['words'], 'Mehr für B2: <a href="/niveau/b2/">alles für B2</a> · <a href="/ueben/sprechen/b2/">Sprechaufgaben B2</a>.')
MORE = {'b1-woerter': 'Mehr für B1: <a href="/niveau/b1/">alles für B1</a> · <a href="/b1-30-tage/">B1 in 30 Tagen</a>.',
        'dtz-woerter': 'Mehr für den DTZ: <a href="/dtz-30-tage/">DTZ in 30 Tagen</a> · <a href="/niveau/a2/">alles für A2</a>.',
        'a1-woerter': 'Mehr für Anfänger: <a href="/niveau/a1/">alles für A1</a> · <a href="/niveau/a0/">ganz neu anfangen (A0)</a>.'}
for r, W in (X.get('w') or {}).items():
    if W:
        EXTRA[r] = words_html(W, MORE[r])
# --- learning games: one readable page per game (/spiele/<id>/) ---
# search phrase in front of the game name: what learners type into Google
GAME_KW = {
    'artikel': 'der, die, das üben', 'endungen': 'Adjektivendungen üben', 'satzbau': 'Satzbau und Wortstellung üben',
    'uhrzeit': 'Uhrzeit auf Deutsch lernen', 'zahlen': 'Zahlen auf Deutsch hören', 'verben': 'Perfekt und Partizip II üben',
    'wowohin': 'Wechselpräpositionen üben', 'memory': 'Deutsch-Wortschatz A1–A2', 'dialog': 'Deutsch sprechen im Alltag',
    'brief': 'DTZ Brief schreiben üben', 'planen': 'DTZ Sprechen Teil 3 üben', 'b2-nvv': 'Nomen-Verb-Verbindungen üben',
    'b2-praep': 'Verben mit Präpositionen üben', 'b2-konnektor': 'Konnektoren üben', 'b2-redemittel': 'Redemittel B2 Beruf',
    'b2-nominal': 'Nominalstil üben', 'b1-telefon': 'Telefonieren im Beruf üben', 'b1-stil': 'Formelle E-Mail oder locker?',
    'tagesmix': 'B2-Prüfung täglich üben', 'lid-pruefung': 'Einbürgerungstest Quiz', 'lid-zeitstrahl': 'Deutsche Geschichte üben',
    'lid-staat': 'Politik in Deutschland üben', 'alltag-formular': 'Formulare ausfüllen üben',
}
CAT_TXT = {'basis': 'Wörter und Grammatik', 'alltag': 'Alltag: Reisen, Einkaufen, Ämter', 'dtz': 'Prüfung DTZ',
           'b2': 'Beruf und Prüfung B1–B2', 'lid': 'Test „Leben in Deutschland“ und Einbürgerungstest', 'abenteuer': 'Abenteuer'}
NEXT_TXT = {'basis': [('/grammatik/', 'Grammatik üben'), ('/challenge/', 'Tages-Challenge')],
            'alltag': [('/hoeren/', 'Hörverstehen üben'), ('/pruefung/', 'Prüfungstraining')],
            'dtz': [('/dtz-30-tage/', 'DTZ in 30 Tagen'), ('/simulation/dtz/', 'DTZ-Probeprüfung')],
            'b2': [('/sprachbausteine/', 'Sprachbausteine üben'), ('/b2-30-tage/', 'B2 in 30 Tagen')],
            'lid': [('/lid/', 'Alle 310 Fragen'), ('/pruefungsinfo/lid/', 'Infos zum Test')],
            'abenteuer': [('/spiele/', 'Alle Lernspiele'), ('/challenge/', 'Tages-Challenge')]}


def game_title(g):
    kw = GAME_KW.get(g['id'])
    return f"{kw}: {g['title']}" if kw and len(kw) + len(g['title']) < 52 else (g['title'] if not kw else kw + ' – Lernspiel')


def game_html(g):
    same = [o for o in GAMES if o['cat'] == g['cat'] and o['id'] != g['id']]
    out = f'<h2>So spielst du „{esc(g["title"])}“</h2>\n<p>{esc(g["intro"] or g["desc"])}</p>\n'
    out += f'<p><b>Niveau:</b> {esc(g["level"])} · <b>Bereich:</b> {esc(CAT_TXT.get(g["cat"], ""))} · kostenlos, ohne Anmeldung, auch auf dem Handy.</p>\n'
    if g['options']:
        out += '<h3>Varianten</h3>\n<ul>' + ''.join(f'<li>{esc(o)}</li>' for o in g['options']) + '</ul>\n'
    out += f'<p><a href="/#spiele/{g["id"]}">▶ Jetzt spielen</a></p>\n'
    if same:
        out += '<h3>Ähnliche Spiele</h3>\n<ul>' + ''.join(f'<li><a href="/spiele/{o["id"]}/">{esc(o["title"])}</a> ({esc(o["level"])})</li>' for o in same) + '</ul>\n'
    out += '<p>Danach weiter: ' + ' · '.join(f'<a href="{h}">{esc(t)}</a>' for h, t in NEXT_TXT.get(g['cat'], [])) + '</p>\n'
    if g['cat'] == 'lid':
        out += '<p>Die Fragen stammen aus dem öffentlichen Fragenkatalog des BAMF. Diese Website ist nicht vom BAMF.</p>\n'
    return out


def game_ld(g):
    return [{'@context': 'https://schema.org', '@type': 'LearningResource', 'name': g['title'], 'description': seo_desc(g['desc'] or g['intro']),
             'url': f'{SITE}/spiele/{g["id"]}/', 'inLanguage': 'de', 'isAccessibleForFree': True, 'learningResourceType': 'Lernspiel',
             'educationalLevel': g['level'], 'teaches': GAME_KW.get(g['id'], g['title']),
             'author': {'@type': 'Person', '@id': f'{SITE}/#dennis', 'name': 'Dennis Prudnikau', 'url': f'{SITE}/ueber-mich/'},
             'provider': {'@type': 'EducationalOrganization', '@id': f'{SITE}/#org', 'name': 'Deutsch mit Dennis', 'url': f'{SITE}/'}}]


EXTRA['simulation'] = EXTRA.get('simulation', '') + '\n<p>Neu: <a href="/simulation/lid/">Einbürgerungstest und „Leben in Deutschland“ online simulieren – 33 Fragen mit Uhr</a>.</p>\n'
EXTRA['pruefung'] = EXTRA.get('pruefung', '') + '\n<p>Einbürgerung: <a href="/simulation/lid/">Einbürgerungstest online üben</a> · <a href="/lid/">alle 310 Fragen</a>.</p>\n'
# --- dictation and verb table: readable content from the same data the app shows ---
DV = json.loads(subprocess.run(['node', '-e', "global.window=global;require('./verben-data.js');require('./diktat-data.js');process.stdout.write(JSON.stringify({v:DM.verben,d:DM.diktat}))"], cwd=R, capture_output=True, text=True, encoding='utf-8', check=True).stdout)
SECTIONS = [(r, t, re.sub(r'^\d+ unregelm', f'{len(DV["v"])} unregelm', d)) for r, t, d in SECTIONS]
EXTRA['verben'] = (f'\n<p>Unregelmäßige Verben ändern den Vokal oder haben besondere Formen: gehen – ging – ist gegangen. Lerne immer drei Formen zusammen: Präsens (er/sie), Präteritum und Perfekt mit haben oder sein. Hier stehen {len(DV["v"])} wichtige Verben nach Niveau, dazu ein Quiz mit 10 Aufgaben.</p>\n'
    + ''.join(f'<h2>Unregelmäßige Verben {lv}</h2>\n<table><thead><tr><th>Infinitiv</th><th>Präsens (er/sie)</th><th>Präteritum</th><th>Perfekt</th><th>Beispiel</th></tr></thead><tbody>'
              + ''.join(f'<tr><td>{esc(v["inf"])}</td><td>{esc(v["pr"])}</td><td>{esc(v["prt"])}</td><td>{esc(v["perf"])}</td><td>{esc(v["ex"])}</td></tr>' for v in DV['v'] if v['level'] == lv) + '</tbody></table>\n' for lv in ('A1', 'A2', 'B1', 'B2'))
    + '<p>Regeln dazu: <a href="/grammatik/a1-perfekt/">Perfekt</a> · <a href="/grammatik/b1-praeteritum/">Präteritum</a> · <a href="/antworten/unregelmaessige-verben-lernen/">Wie lernt man unregelmäßige Verben?</a></p>\n')
EXTRA['diktat'] = (f'\n<p>So geht das Diktat: Du hörst einen Satz so oft, wie du willst. Dann schreibst du den ganzen Satz oder nur die fehlenden Wörter. Du siehst sofort, welches Wort falsch ist. Es gibt {sum(len(l) for l in DV["d"].values())} Sätze. Eine Runde hat 5 Sätze. Satzzeichen zählen nicht, große und kleine Buchstaben schon. Die Aufnahmen sind mit KI-Stimmen gesprochen.</p>\n'
    + ''.join(f'<h2>Diktat {lv}: Beispiele</h2>\n<ul>' + ''.join(f'<li>{esc(t)}</li>' for t, _ in l[:6]) + f'</ul>\n<p><a href="/#diktat/{lv}">Diktat {lv} starten</a> ({len(l)} Sätze)</p>\n' for lv, l in DV['d'].items())
    + '<p>Mehr dazu: <a href="/antworten/deutsch-diktat-online-ueben/">Wie übe ich Deutsch mit Diktaten?</a> · <a href="/hoeren/">Hören üben</a> · <a href="/laute/">Laute und Buchstaben</a></p>\n')
EXTRA_LD['verben'] = [{'@context': 'https://schema.org', '@type': 'LearningResource', 'name': 'Unregelmäßige Verben Deutsch: Liste und Quiz', 'url': f'{SITE}/verben/', 'inLanguage': 'de', 'isAccessibleForFree': True, 'learningResourceType': ['Liste', 'Quiz'], 'educationalLevel': 'A1–B2', 'teaches': 'Unregelmäßige Verben im Präsens, Präteritum und Perfekt', 'author': {'@type': 'Person', '@id': f'{SITE}/#dennis', 'name': 'Dennis Prudnikau', 'url': f'{SITE}/ueber-mich/'}, 'provider': {'@type': 'EducationalOrganization', '@id': f'{SITE}/#org', 'name': 'Deutsch mit Dennis', 'url': f'{SITE}/'}}]
EXTRA_LD['diktat'] = [{'@context': 'https://schema.org', '@type': 'LearningResource', 'name': 'Deutsch Diktat online', 'url': f'{SITE}/diktat/', 'inLanguage': 'de', 'isAccessibleForFree': True, 'learningResourceType': 'Diktat', 'educationalLevel': 'A1–B2', 'teaches': 'Hören und Rechtschreibung', 'author': {'@type': 'Person', '@id': f'{SITE}/#dennis', 'name': 'Dennis Prudnikau', 'url': f'{SITE}/ueber-mich/'}, 'provider': {'@type': 'EducationalOrganization', '@id': f'{SITE}/#org', 'name': 'Deutsch mit Dennis', 'url': f'{SITE}/'}}]
# links to the answer pages /antworten/… (tools/answer_links.py, only pages that exist)
sys.path.insert(0, os.path.join(R, 'tools'))
from answer_links import answer_html  # noqa: E402
EXTRA['pruefung'] += answer_html('pruefung', 'Häufige Fragen kurz erklärt')
EXTRA['simulation'] += answer_html('pruefung', 'Häufige Fragen kurz erklärt')
EXTRA['spiele'] = (EXTRA.get('spiele', '') + '\n<h2>Alle Lernspiele</h2>\n' + ''.join(
    f'<h3>{esc(CAT_TXT[c])}</h3>\n<ul>' + ''.join(f'<li><a href="/spiele/{g["id"]}/">{esc(g["title"])}</a> – {esc(g["desc"])} ({esc(g["level"])})</li>' for g in GAMES if g['cat'] == c) + '</ul>\n'
    for c in CAT_TXT if any(g['cat'] == c for g in GAMES)))
EXTRA_LD['spiele'] = [{'@context': 'https://schema.org', '@type': 'ItemList', 'name': 'Lernspiele Deutsch', 'itemListElement': [
    {'@type': 'ListItem', 'position': i + 1, 'url': f'{SITE}/spiele/{g["id"]}/', 'name': g['title']} for i, g in enumerate(GAMES)]}]
# test "Leben in Deutschland" / Einbürgerungstest: facts from pruefung-fakten.js (sources: BAMF, Stand 11.11.2026)
EXTRA['lid'] = (EXTRA.get('lid', '') + '''
<h2>Einbürgerungstest und „Leben in Deutschland“: Was ist der Unterschied?</h2>
<p>Der Test „Leben in Deutschland“ ist der Abschlusstest im Orientierungskurs. Für die Einbürgerung macht man den Einbürgerungstest. Beide Tests sind gleich aufgebaut und nutzen denselben öffentlichen Fragenkatalog: 300 Fragen für ganz Deutschland und 10 Fragen für jedes Bundesland.</p>
<ul><li>33 Fragen, 60 Minuten, zu jeder Frage 4 Antworten – eine ist richtig.</li>
<li>30 Fragen sind für ganz Deutschland, 3 Fragen zu deinem Bundesland.</li>
<li>Orientierungskurs: bestanden mit mindestens 15 richtigen Antworten. Einbürgerungstest: bestanden mit mindestens 17 richtigen Antworten.</li></ul>
<p>Stand: 11.11.2026, Quelle: Bundesamt für Migration und Flüchtlinge (BAMF). Mehr: <a href="/pruefungsinfo/lid/">Aufbau, Anmeldung und Kosten</a>.</p>
<p>Üben: <a href="/simulation/lid/">Test mit 33 Fragen simulieren</a> · <a href="/spiele/lid-pruefung/">LiD-Quizshow</a> · <a href="/spiele/lid-staat/">Wer macht was im Staat?</a> · <a href="/spiele/lid-zeitstrahl/">Zeitstrahl Deutschland</a>.</p>
<p>Die Fragen stammen aus dem öffentlichen Fragenkatalog des BAMF. Diese Website ist nicht vom BAMF.</p>
''') + answer_html('lid')

# --- Kahoot, Videos, Witz des Tages, Mikula: readable content from the same data the app shows ---
def load_json(name):
    try:
        return json.load(open(os.path.join(R, name), encoding='utf-8'))
    except (OSError, ValueError):
        return {}


def first_sentence(t, n=220):
    t = re.split(r'(?<=[.!?])\s', ' '.join((t or '').split()), maxsplit=1)[0]
    return t if len(t) <= n else t[: n - 1].rsplit(' ', 1)[0] + '…'


kahoot_name = lambda t: re.sub(r'\s*\|\s*Kahoot-Quiz.*$', '', t).replace('_', ' ').strip()  # "A1 – … | Kahoot-Quiz (…)" -> "A1 – …"
video_name = lambda t: re.sub(r'\s*#\w+', '', t).strip()  # drop "#Shorts" and other hashtags


KH = load_json('kahoot-feed.json').get('kahoots') or []
if KH:
    EXTRA['kahoot'] = ('\n<p>Kahoot ist ein Quiz-Spiel für Handy und Computer. Du kannst jedes Quiz allein üben oder im Kurs gemeinsam spielen: '
                       'Die Lehrkraft startet das Spiel bei Kahoot und zeigt die Spiel-PIN, alle anderen spielen mit dem Handy mit. '
                       'Kahoot ist ein Angebot der Kahoot! ASA; beim Öffnen gelten deren Datenschutzbestimmungen.</p>\n'
                       f'<h2>Alle {len(KH)} Quiz</h2>\n<ul>'
                       + ''.join(f'<li><a href="{esc(k["url"])}" rel="noopener">{esc(kahoot_name(k["title"]))}</a>'
                                 + (f' ({k["questions"]} Fragen)' if k.get('questions') else '')
                                 + (f' – {esc(first_sentence(k.get("description")))}' if k.get('description') else '') + '</li>' for k in KH)
                       + '</ul>\n<p>Alle QR-Codes zum Ausdrucken: <a href="/material/kahoot/alle-kahoot-qr-codes.pdf">QR-Codes als PDF</a>. '
                       'Mehr spielerisch üben: <a href="/spiele/">Lernspiele</a> · <a href="/challenge/">Tages-Challenge</a> · <a href="/lid/">Leben in Deutschland: 310 Fragen</a>.</p>\n')
YT = load_json('youtube-feed.json')
VCAT = {'deutsch': 'Deutsch lernen', 'pruefung': 'Prüfung', 'orientierung': 'Leben in Deutschland'}
if YT.get('videos'):
    vids = sorted(YT['videos'], key=lambda v: v.get('published', ''), reverse=True)
    EXTRA['videos'] = ('\n<p>Auf YouTube erkläre ich Deutsch kurz und einfach: Artikel (der, die, das), Grammatik, Wörter für den Alltag, '
                       'die DTZ- und B1-Prüfung und Wissen für den Test „Leben in Deutschland“. Neue Videos erscheinen hier automatisch. '
                       'Videos werden erst nach deinem Klick geladen.</p>\n'
                       + ''.join(f'<h2>{esc(name)}</h2>\n<ul>' + ''.join(
                           f'<li><a href="https://www.youtube.com/watch?v={esc(v["id"])}" rel="noopener">{esc(video_name(v["title"]))}</a></li>'
                           for v in [v for v in vids if v.get('category') == key][:20]) + '</ul>\n'
                                 for key, name in VCAT.items() if any(v.get('category') == key for v in vids))
                       + '<p><a href="https://www.youtube.com/@deutsch-mit-Dennis" rel="noopener">YouTube-Kanal „Deutsch mit Dennis“</a> · '
                       'Zum Üben danach: <a href="/grammatik/">Grammatik</a> · <a href="/spiele/">Lernspiele</a> · <a href="/pruefung/">Prüfungstraining</a>.</p>\n')
WITZ_NODE = r"""
const fs=require('fs'),vm=require('vm');const s=fs.readFileSync('witz.js','utf8');const a=s.indexOf('const JOKES = [');const b=s.indexOf('\n  ];',a);
process.stdout.write(JSON.stringify(a<0||b<0?[]:vm.runInNewContext(s.slice(a+'const JOKES = '.length,b+4))));
"""
JOKES = json.loads(subprocess.run(['node', '-e', WITZ_NODE], cwd=R, capture_output=True, text=True, encoding='utf-8', check=True).stdout or '[]')
if JOKES:
    langs = len([f for f in os.listdir(os.path.join(R, 'witz-i18n')) if f.endswith('.json') and f != 'status.json']) if os.path.isdir(os.path.join(R, 'witz-i18n')) else 0
    EXTRA['witz'] = ('\n<p>Witze sind gutes Deutschtraining: Man muss genau lesen, Wörter mit zwei Bedeutungen erkennen und ein bisschen über Deutschland wissen. '
                     f'Jeden Tag gibt es einen neuen Witz – für alle gleich. Zu jedem Witz steht das Niveau und eine kurze Erklärung in einfachem Deutsch'
                     + (f', und du kannst ihn in {langs} Sprachen übersetzen lassen' if langs else '') + f'. Insgesamt sind es {len(JOKES)} Witze.</p>\n'
                     '<h2>Einige Witze mit Erklärung</h2>\n'
                     + ''.join(f'<h3>Witz {i + 1} ({esc(j.get("lvl", ""))})</h3>\n<p>{"<br>".join(esc(l) for l in j["t"].splitlines())}</p>\n'
                               f'<p><b>Warum ist das lustig?</b> {esc(j.get("why", ""))}</p>\n' for i, j in enumerate(JOKES[:12]))
                     + '<p>Mehr zum Lachen und Lernen: <a href="/lieder/">Deutsch mit Liedern</a> · <a href="/mikula/">Mikula lernt Deutsch</a> · <a href="/challenge/">Tages-Challenge</a>.</p>\n')
# Mikula: only episodes that are already public (date = time in Germany, see mikula.js)
try:
    from zoneinfo import ZoneInfo
    NOW_DE = datetime.datetime.now(ZoneInfo('Europe/Berlin')).strftime('%Y-%m-%dT%H:%M')
except Exception:  # no time zone data (Windows without tzdata): Germany in winter
    NOW_DE = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M')
MK = [i for i in (load_json('mikula-feed.json').get('items') or []) if i.get('date', '9999') <= NOW_DE]
if MK:
    EXTRA['mikula'] = ('\n<p>Mikula ist eine KI-Figur aus dem Jahr 1024. Er reist in unsere Zeit und lernt Deutsch – und macht dabei genau die Fehler, '
                       'die viele Deutschlernende machen. In jeder kurzen Folge siehst du zuerst Mikulas Satz. Findest du den Fehler? Dann kommt die Lösung mit einer einfachen Regel. '
                       'Neue Folgen erscheinen auf Instagram und TikTok.</p>\n'
                       f'<h2>Alle {len(MK)} Folgen</h2>\n<ol>'
                       + ''.join(f'<li><b>Falsch:</b> {esc(i["wrong"])} – <b>Richtig:</b> {esc(i["right"])}<br>{esc(i.get("rule", ""))} {esc(i.get("explain", ""))}</li>\n'
                                 for i in sorted(MK, key=lambda i: i.get('n', 0)))
                       + '</ol>\n<p>Mikula gibt es auch als Lernspiel: <a href="/spiele/mikula/">Mikula-Spiel</a>. '
                       'Mehr typische Fehler üben: <a href="/grammatik/">Grammatik-Trainer</a> · <a href="/spiele/">Lernspiele</a>.</p>\n')

# --- sections that were (almost) empty without JavaScript (2026-11-25): same data as the app, no new facts ---
NODE2 = r"""
const fs=require('fs'),vm=require('vm');const c={console:{log(){}}};c.window=c;c.DM={};vm.createContext(c);
for(const f of ['site-data.js','lieder-data.js','bild-data.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const s=fs.readFileSync('dtz30.js','utf8');
const days=vm.runInNewContext(s.slice(s.indexOf('const DAYS = ')+13,s.indexOf('\n  ];',s.indexOf('const DAYS = '))+4));
const weeks=vm.runInNewContext(s.match(/const WEEKS = (\[.*\]);/)[1]);
process.stdout.write(JSON.stringify({songs:c.DM.songs.map(g=>({id:g.id,level:g.level,title:g.title,theme:g.theme})),bild:c.DM_BILD,cred:c.DM.credentials,days,weeks,
  mats:c.DM.materials.filter(m=>/bild(?!en)/i.test(m.file)&&!/wortbild/i.test(m.file)).map(m=>({file:m.file,title:m.title,level:m.level}))}));
"""
Z = json.loads(subprocess.run(['node', '-e', NODE2], cwd=R, capture_output=True, text=True, encoding='utf-8', check=True).stdout)
page_ok = lambda p: os.path.exists(os.path.join(R, *p.strip('/').split('/'), 'index.html'))
link_list = lambda items: '<ul>' + ''.join(f'<li><a href="{h}">{esc(t)}</a></li>' for h, t in items if page_ok(h)) + '</ul>\n'

EXTRA['lieder'] = ('\n<p>Alle Liedtexte zum Lesen: <a href="/lieder/alle/">Liste aller Lieder</a>. Texte von Dennis, Musik und Gesang mit KI erstellt (Suno).</p>\n'
                   + ''.join(f'<h2>Lieder {lv}</h2>\n<ul>' + ''.join(f'<li><a href="/lieder/{g["id"]}/">{esc(g["title"])}</a> – {esc(g["theme"])}</li>' for g in Z['songs'] if g['level'] == lv and page_ok(f'lieder/{g["id"]}')) + '</ul>\n'
                             for lv in ('A1', 'A2', 'B1', 'B2', 'C1')))
EXTRA['dtz-30-tage'] = ('\n<p>Dein Lernplan für den Deutsch-Test für Zuwanderer (A2–B1). Aufbau und Punkte: <a href="/pruefungsinfo/dtz/">Prüfungsinfos DTZ</a> · <a href="/dtz-schreiben/">DTZ Schreiben</a> · <a href="/dtz-woerter/">DTZ-Wörter</a>.</p>\n'
                        + ''.join(f'<h2>{esc(w)}: {esc(sub)}</h2>\n<ol start="{a + 1}">' + ''.join(
                            f'<li><b>Tag {i + 1}: {esc(Z["days"][i][0])}</b> (ca. {sum(x[2] for x in Z["days"][i][1])} Min.)<ul>'
                            + ''.join(f'<li><a href="{esc(real_href(h))}">{esc(l)}</a> – {m} Min.</li>' for l, h, m in Z['days'][i][1])
                            + f'</ul>Tipp: {esc(Z["days"][i][2])}</li>\n' for i in range(a, b)) + '</ol>\n' for w, sub, a, b in Z['weeks'])
                        + '<p>Die Übungen sind eigene Aufgaben im Stil der Prüfung – keine offiziellen Aufgaben von g.a.s.t. oder telc.</p>\n' + answer_html('dtz'))
EXTRA['bild'] = ('\n<p>Im DTZ kommt das Bild in Teil 2 der mündlichen Prüfung: Über Erfahrungen sprechen (Aufbau und Punkte: <a href="/pruefungsinfo/dtz/">Prüfungsinfos DTZ</a>). Die Bilder und Texte hier sind eigene Übungen im Stil der Prüfung.</p>\n'
                 '<h2>Redemittel für die Bildbeschreibung</h2>\n<ul><li>Auf dem Bild sehe ich …</li><li>Links / rechts / im Vordergrund / hinten …</li><li>Links sitzt ein Mann, der …</li><li>Rechts sehe ich eine Frau, die …</li><li>Ich glaube, die Leute …</li><li>Vielleicht sprechen sie über …</li></ul>\n'
                 + ''.join(f'<h2>Beispiel: {esc(b["title"])} ({esc(b["thema"])})</h2>\n<p><img src="/{esc(b["svg"])}" alt="{esc(b["alt"])}" width="640" height="420" loading="lazy" style="max-width:100%;height:auto"></p>\n'
                           f'<p><b>Musterbeschreibung:</b> {esc(b["muster"])}</p>\n<p><b>Fragen zum Weitersprechen:</b></p>\n<ul>' + ''.join(f'<li>{esc(q)}</li>' for q in b['fragen']) + '</ul>\n' for b in Z['bild'])
                 + ('<h2>Arbeitsblätter (PDF)</h2>\n<ul>' + ''.join(f'<li><a href="/{esc(m["file"])}">{esc(m["title"])}</a> ({esc(m["level"])})</li>' for m in Z['mats'] if os.path.exists(os.path.join(R, m['file']))) + '</ul>\n' if Z['mats'] else '')
                 + '<p>Weiter üben: <a href="/simulation/dtz/">DTZ-Probeprüfung</a> · <a href="/spiele/planen/">Teil 3: Gemeinsam planen (Spiel)</a> · <a href="/dtz-30-tage/">DTZ in 30 Tagen</a></p>\n')
# same sentences as about() in site.js and DM.credentials
EXTRA['ueber-mich'] = ('\n<p><img src="/assets/dennis.webp" alt="Dennis Prudnikau, Deutschlehrer" width="313" height="502" loading="lazy"></p>\n'
    '<p>Hallo, ich bin Dennis Prudnikau (Dzianis Prudnikau). Seit Oktober 2017 bringe ich Menschen Deutsch bei – vom ersten Satz bis zur Hochschulprüfung. Und ich bin zugelassener Prüfer.</p>\n'
    '<p>Ich habe Deutsch als Fremdsprache von A1 bis B2 unterrichtet, Integrationskurse geleitet und Lernende auf die DSH und den TestDaF vorbereitet. Ich habe einen Master in Germanistik. '
    'Das Bundesamt für Migration und Flüchtlinge (BAMF) hat mich als Lehrkraft für Integrationskurse und für Berufssprachkurse bis zum Niveau C2 zugelassen.</p>\n'
    '<h2>Zulassungen und Nachweise</h2>\n<ul>' + ''.join(f'<li><b>{esc(c["title"])}</b> ({esc(c["kind"])}, {esc(c["org"])}): {esc(c["desc"])}</li>' for c in Z['cred']) + '</ul>\n'
    '<p><a href="/#ueber-mich/nachweise">Dokumente ansehen</a> (persönliche Daten sind geschwärzt)</p>\n'
    '<h2>So unterrichte ich</h2>\n<ul><li>Grammatik erkläre ich auf Deutsch – einfach und mit vielen Beispielen.</li><li>Wir üben echte Situationen: beim Arzt, mit dem Vermieter, im Job.</li><li>Sprechen kommt zuerst. Fehler gehören zum Lernen.</li></ul>\n'
    '<h2>Offizielle Kanäle</h2>\n<ul><li><a href="https://www.youtube.com/@deutsch-mit-Dennis" rel="me noopener">YouTube</a></li><li><a href="https://www.instagram.com/deutsch_mit_dennis/" rel="me noopener">Instagram</a></li><li><a href="https://www.tiktok.com/@deutsch_mit_dennis" rel="me noopener">TikTok</a></li></ul>\n'
    '<p>Deutsch mit Dennis ist ein unabhängiges Lernangebot, kein Angebot von g.a.s.t., telc oder BAMF. <a href="/impressum/">Impressum und Kontakt</a></p>\n')
HOME_LD = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', APP, re.S).group(1))
EXTRA_LD['ueber-mich'] = [{'@context': 'https://schema.org', '@type': 'ProfilePage', 'url': f'{SITE}/ueber-mich/', 'inLanguage': 'de',
                           'mainEntity': {**next(g for g in HOME_LD['@graph'] if g['@type'] == 'Person'),
                                          'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'Ruhr-Universität Bochum'}}}]
_lands = sorted(d for d in os.listdir(os.path.join(R, 'lid')) if d.startswith('fragen-') and not re.match(r'fragen-\d', d))
_land = lambda d: 'Nordrhein-Westfalen' if d == 'fragen-nrw' else d[7:].replace('ae', 'ä').replace('ue', 'ü').replace('oe', 'ö').replace('-', ' ').title().replace(' ', '-')
LANDS = ('\n<h2>Fragen für dein Bundesland</h2>\n<p>Alle Fragen mit Antworten: <a href="/lid/fragen/">Übersicht</a></p>\n<ul>' + ''.join(f'<li><a href="/lid/{d}/">Einbürgerungstest {esc(_land(d))}</a></li>' for d in _lands) + '</ul>\n') if _lands else ''
EXTRA['lid'] += LANDS
WORDS = [('/a1-woerter/', 'A1-Wörter'), ('/dtz-woerter/', 'DTZ-Wörter (A2–B1)'), ('/b1-woerter/', 'B1-Wörter'), ('/b2-woerter/', 'B2-Wörter')]
EXTRA['hoeren'] = '\n<h2>Hörtexte nach Niveau</h2>\n' + link_list([('/hoeren/a1/', 'Hören A1'), ('/hoeren/a2/', 'Hören A2'), ('/hoeren/alltag/', 'Hören im Alltag (DTZ)'), ('/hoeren/beruf/', 'Hören im Beruf (DTB)'), ('/diktat/', 'Diktat'), ('/lieder/alle/', 'Deutsch mit Liedern')])
EXTRA['lesen'] = '\n<h2>Lesetexte nach Niveau</h2>\n' + link_list([('/lesen/a1/', 'Lesen A1'), ('/lesen/a2/', 'Lesen A2'), ('/lesen/alltag/', 'Lesen im Alltag (DTZ)'), ('/lesen/beruf/', 'Lesen im Beruf (DTB)')])
EXTRA['vorbereitung'] = '\n<h2>Deine Prüfung</h2>\n' + link_list([('/vorbereitung/telc-b1/', 'telc Deutsch B1'), ('/vorbereitung/telc-b2/', 'telc Deutsch B2'), ('/vorbereitung/dtb-b1/', 'DTB B1'), ('/vorbereitung/dtb-b2/', 'DTB B2'), ('/dtz-30-tage/', 'DTZ in 30 Tagen'), ('/b1-30-tage/', 'B1 in 30 Tagen'), ('/b2-30-tage/', 'B2 in 30 Tagen'), ('/sprachbausteine/', 'Sprachbausteine B2'), ('/telc-b2-sprechen/', 'Sprechen telc B2')]) + answer_html('pruefung', 'Häufige Fragen kurz erklärt')
EXTRA['ueben'] = ('\n<h2>Sprechen und Schreiben</h2>\n' + link_list([('/bild/', 'Bildbeschreibung (DTZ)'), ('/dtz-schreiben/', 'Briefe schreiben (DTZ)'), ('/ueben/sprechen/b2/', 'Sprechaufgaben B2'), ('/telc-b2-sprechen/', 'Sprechen telc B2'), ('/spiele/planen/', 'Gemeinsam planen (Spiel)')])
                  + '<h2>Wörter, Hören und Grammatik</h2>\n' + link_list(WORDS + [('/diktat/', 'Diktat'), ('/verben/', 'Unregelmäßige Verben'), ('/hoeren/', 'Hören'), ('/lesen/', 'Lesen'), ('/grammatik/', 'Grammatik')]))
EXTRA['lernpakete'] = '\n<h2>Alle Lernpakete</h2>\n<ul>' + ''.join(f'<li><a href="/lernpakete/{k["id"]}/">{esc(k["title"])}</a> ({esc(k["level"])}, {k["pages"]} Seiten PDF{", " + esc(k["price"]) if k.get("price") else ""}) – {esc(k["desc"])}</li>\n' for k in P) + '</ul>\n'


def pack_html(k):
    out = f'\n<p><b>Niveau:</b> {esc(k["level"])} · <b>Ziel:</b> {esc(k["target"])} · {k["pages"]} Seiten PDF' + (f' · {esc(k["price"])}' if k.get('price') else '') + '</p>\n'
    if k.get('contents'):
        out += '<h2>Inhalt</h2>\n<ul>' + ''.join(f'<li>{esc(c)}</li>' for c in k['contents']) + '</ul>\n'
    if k.get('note'):
        out += f'<p>{esc(k["note"])}</p>\n'
    return out + '<p><a href="/lernpakete/">Alle Lernpakete</a></p>\n'


urls = [SITE + '/']
for route, t, dsc in SECTIONS:
    card(t, dsc, os.path.join(R, O, route + '.jpg'))
    urls.append(stub(route, t, dsc, f'{O}/{route}.jpg', EXTRA.get(route, ''), EXTRA_LD.get(route)))
urls.append(stub('simulation/lid', 'Einbürgerungstest online üben: 33 Fragen mit Uhr',
                 'Kostenlose Testsimulation für den Einbürgerungstest und „Leben in Deutschland“: 33 Fragen wie im echten Test, 60 Minuten, mit Auswertung und Lösungen. Ohne Anmeldung.',
                 f'{O}/lid.jpg', '''
<h2>So läuft die Simulation</h2>
<ul><li>33 Fragen wie im echten Test: 30 Fragen für ganz Deutschland und 3 Fragen zu deinem Bundesland.</li>
<li>60 Minuten Zeit, zu jeder Frage 4 Antworten – eine ist richtig.</li>
<li>Am Ende siehst du dein Ergebnis und alle Lösungen. Bestanden: Orientierungskurs ab 15 richtigen Antworten, Einbürgerungstest ab 17 richtigen Antworten (Stand: 11.11.2026, Quelle: BAMF).</li></ul>
<p><a href="/#simulation/lid">▶ Simulation starten</a> · <a href="/lid/">Alle 310 Fragen nach Themen üben</a> · <a href="/pruefungsinfo/lid/">Infos zum Test</a></p>
<p>Die Fragen stammen aus dem öffentlichen Fragenkatalog des BAMF. Diese Website ist nicht vom BAMF.</p>
''' + LANDS + answer_html('lid'), [{'@context': 'https://schema.org', '@type': 'LearningResource', 'name': 'Testsimulation Einbürgerungstest / Leben in Deutschland',
        'url': f'{SITE}/simulation/lid/', 'inLanguage': 'de', 'isAccessibleForFree': True, 'learningResourceType': 'Prüfungssimulation',
        'educationalLevel': 'A2–B1', 'teaches': 'Einbürgerungstest, Leben in Deutschland'}]))
for g in GAMES:
    urls.append(stub('spiele/' + g['id'], game_title(g), f"{g['desc']} Lernspiel {g['level']}: kostenlos, ohne Anmeldung, auch auf dem Handy.", f'{O}/spiele.jpg', game_html(g), game_ld(g)))
for k in P:
    sub = f"{k['level']} · {k['target']} · {k['pages']} Seiten PDF" + (f" · {k['price']}" if k.get('price') else '')
    card(k['title'], sub, os.path.join(R, O, 'paket-' + k['id'] + '.jpg'), pic=os.path.join(R, k['img']), kicker='Lernpaket' if k['group'] != 'lehrende' else 'Für Lehrkräfte')
    urls.append(stub('lernpakete/' + k['id'], k['title'], k['desc'], f"{O}/paket-{k['id']}.jpg", pack_html(k)))
open(os.path.join(R, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
print(len(urls), 'Seiten')
# readable content pages (songs, LiD questions, simulations, legal pages) are built next;
# its last step runs tools/build-sitemap.js, which writes sitemap.xml (with <lastmod>)
subprocess.run([sys.executable, '-X', 'utf8', os.path.join(R, 'tools', 'make-seo-pages.py')], cwd=R, check=True)  # same Python (works on Windows too)
