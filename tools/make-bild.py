"""Bild beschreiben (DTZ): erzeugt aus tools/bild/*.json
   1) bild-data.js (window.DM_BILD) für die Website (bild.js),
   2) Hörtext-Einträge für die Musterbeschreibungen in tools/tts/manifest.json,
   3) Arbeitsblätter mit Lösungen: material/arbeitsblaetter/bild-beschreiben-<id>.pdf
   Aufruf: python3 tools/make-bild.py"""
import io, json, os, re, glob, random
import cairosvg
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, KeepTogether, Image, Table, TableStyle, PageBreak)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

R = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(R)
SC = [json.load(open(f, encoding='utf-8')) for f in sorted(glob.glob(os.path.join(R, 'bild', '*.json')))]
ORDER = ['buero', 'park', 'supermarkt', 'arzt']
SC.sort(key=lambda s: ORDER.index(s['id']) if s['id'] in ORDER else 99)

# 1) Daten für die Website
open(os.path.join(ROOT, 'bild-data.js'), 'w', encoding='utf-8').write(
    '/* Bild beschreiben (DTZ) – automatisch erzeugt aus tools/bild/*.json mit tools/make-bild.py */\nwindow.DM_BILD = ' +
    json.dumps(SC, ensure_ascii=False, separators=(',', ':')) + ';\n')

# 2) Hörtexte (Schlüssel wie in site.js: FNV-1a über den normalisierten Text)
def fnv(s):
    h = 0x811c9dc5
    for b in re.sub(r'\s+', ' ', s).strip().encode('utf-8'):
        h ^= b; h = (h * 0x01000193) & 0xffffffff
    return 't%08x' % h
mp = os.path.join(ROOT, 'tools', 'tts', 'manifest.json'); man = json.load(open(mp, encoding='utf-8'))
have = {e['key'] for e in man['entries']}
for k, s in enumerate(SC):
    key = fnv(s['muster'])
    if key not in have:
        man['entries'].append({'key': key, 'segments': [{'voice': ['f1', 'm1', 'f2', 'm2'][k % 4], 'text': s['muster']}]})
json.dump(man, open(mp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); open(mp, 'a').write('\n')

# 3) PDF-Arbeitsblätter
F = os.path.join(R, 'pdf', 'fonts')
for n, f in [('Atk', 'Atk-R'), ('Atk-B', 'Atk-B'), ('Atk-I', 'Atk-I')]:
    pdfmetrics.registerFont(TTFont(n, os.path.join(F, f + '.ttf')))
pdfmetrics.registerFont(TTFont('DJV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFontFamily('Atk', normal='Atk', bold='Atk-B', italic='Atk-I', boldItalic='Atk-B')
MARK, SITE = 'created by D.Prudnikau', 'deutsch-mit-dennis.de'
BLUE, GREY = HexColor('#2440b5'), HexColor('#555c70')
GC = {'der': '#c62828', 'die': '#1565c0', 'das': '#7b1fa2', 'pl': '#2e7d32'}
GN = {'der': 'der', 'die': 'die', 'das': 'das', 'pl': 'Plural'}
st = dict(
    h1=ParagraphStyle('h1', fontName='Atk-B', fontSize=20, leading=24, textColor=BLUE, spaceAfter=2),
    sub=ParagraphStyle('sub', fontName='Atk', fontSize=10.5, leading=14, textColor=GREY, spaceAfter=8),
    h2=ParagraphStyle('h2', fontName='Atk-B', fontSize=12.5, leading=16, spaceBefore=10, spaceAfter=4),
    ins=ParagraphStyle('ins', fontName='Atk-I', fontSize=10.5, leading=14, textColor=GREY, spaceAfter=4),
    it=ParagraphStyle('it', fontName='Atk', fontSize=11.5, leading=19, leftIndent=18, firstLineIndent=-18, spaceAfter=2),
    p=ParagraphStyle('p', fontName='Atk', fontSize=11, leading=15.5, spaceAfter=4),
    sm=ParagraphStyle('sm', fontName='Atk', fontSize=10, leading=13.5),
    sol=ParagraphStyle('sol', fontName='Atk', fontSize=10.5, leading=14.5, leftIndent=18, firstLineIndent=-18, spaceAfter=1.5))
x = lambda s: s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('→', '<font name="DJV">→</font>')

def gaps_text(s, g, prefix=True):
    """[ein|eine|einen*] → ein____ (gemeinsamer Wortanfang + Lücke)"""
    def rep(m):
        opts = [o.rstrip('*') for o in m.group(1).split('|')]
        pre = os.path.commonprefix(opts)
        if len(pre) < 2 or not prefix: pre = ''
        return x(pre) + '<font color="#9aa1b5">______</font>'
    out = re.sub(r'\[([^\]]+)\]', rep, s)
    return out + (f' <font color="{GC[g]}">({GN[g]})</font>' if g else '')
solved = lambda s: re.sub(r'\[([^\]]+)\]', lambda m: next(o.rstrip('*') for o in m.group(1).split('|') if o.endswith('*')), s)
def solved_marked(s, g):
    c = GC.get(g, '#1b7a3a')
    return re.sub(r'\[([^\]]+)\]', lambda m: f'<font color="{c}"><b>{x(next(o.rstrip("*") for o in m.group(1).split("|") if o.endswith("*")))}</b></font>', s)

def deco(title):
    def f(c, doc):
        pw, ph = A4
        c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.05)); c.setFont('Helvetica-Bold', pw / 13)
        c.translate(pw / 2, ph / 2); c.rotate(45); c.drawCentredString(0, 0, MARK); c.restoreState()
        c.setFillColor(Color(0.30, 0.34, 0.45)); c.setFont('Atk', 7.5)
        c.drawRightString(pw - 36, 22, f'{MARK} · {SITE}'); c.drawString(36, 22, title)
    return f

def lines(n, w):
    t = Table([['']] * n, colWidths=[w], rowHeights=[22] * n); t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.5, HexColor('#9aa1b5'))])); return t

mats = []
for s in SC:
    rnd = random.Random(s['id'])
    title = f"Bild beschreiben (DTZ): {s['title']}"
    buf = io.BytesIO(); W = A4[0] - 100
    doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=50, rightMargin=50, topMargin=42, bottomMargin=46, title=title, author='Dzianis Prudnikau')
    doc.addPageTemplates([PageTemplate(frames=[Frame(50, 46, W, A4[1] - 88, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)], onPage=deco(title))])
    png = cairosvg.svg2png(url=os.path.join(ROOT, s['svg']), output_width=1400)
    img = Image(io.BytesIO(png), width=W, height=W * 500 / 800)
    leg = ' · '.join(f'<font color="{GC[k]}"><b>{x(v)}</b></font>' for k, v in [('der', 'der → einen …-en'), ('die', 'die → eine …-e'), ('das', 'das → ein …-es'), ('pl', 'Plural → …-e')])
    story = [Paragraph(x(s['title']), st['h1']), Paragraph(f"Bild beschreiben wie im DTZ · {x(s['thema'])} · {x(s['level'])}", st['sub']), img, Spacer(1, 6), Paragraph(leg, st['sm'])]
    story += [Paragraph('Aufgabe 1 – Adjektivendungen: Ergänzen Sie.', st['h2']), Paragraph('Nach <i>einen / eine / ein</i> im Akkusativ: einen …-en · eine …-e · ein …-es · Plural ohne Artikel …-e', st['ins'])]
    story += [Paragraph(f'{k + 1}. ' + gaps_text(it['s'], it.get('g')), st['it']) for k, it in enumerate(s['endungen'])]
    story += [Paragraph('Aufgabe 2 – Relativsätze: Ergänzen Sie das Relativpronomen.', st['h2'])]
    for k, it in enumerate(s['relativ']):
        opts = re.search(r'\[([^\]]+)\]', it['s']).group(1).replace('*', '').replace('|', ' / ')
        story.append(Paragraph(f'{k + 1}. ' + gaps_text(it['s'], None, False) + f' <font color="#7a8094">({x(opts)})</font>', st['it']))
    story += [Paragraph('Aufgabe 3 – Bilden Sie Relativsätze. Das Verb steht am Ende.', st['h2'])]
    for k, it in enumerate(s['bauen']):
        w = it['words'][:]; rnd.shuffle(w)
        if w == it['words']: w = w[::-1]
        story.append(KeepTogether([Paragraph(f"{k + 1}. {x(it['start'])} … <font color='#7a8094'>({' / '.join(map(x, w))})</font>", st['it']), lines(1, W - 18)]))
    story += [KeepTogether([Paragraph('Aufgabe 4 – Beschreiben Sie das Bild (ca. 1 Minute).', st['h2']),
              Paragraph('Einleitung · Ort (vorne, hinten, links, rechts) · Personen mit Kleidung · was sie tun (Relativsätze) · eine Vermutung · eigene Erfahrung', st['ins']), lines(8, W)])]
    story += [KeepTogether([Paragraph('Fragen der Prüferin / des Prüfers', st['h2'])] + [Paragraph('• ' + x(q), st['p']) for q in s.get('fragen', [])])]
    story += [PageBreak(), Paragraph('Lösungen', st['h1']), Paragraph(x(s['title']), st['sub']), Paragraph('Aufgabe 1', st['h2'])]
    story += [Paragraph(f'{k + 1}. ' + solved_marked(it['s'], it.get('g')), st['sol']) for k, it in enumerate(s['endungen'])]
    story += [Paragraph('Aufgabe 2', st['h2'])] + [Paragraph(f'{k + 1}. ' + solved_marked(it['s'], None), st['sol']) for k, it in enumerate(s['relativ'])]
    story += [Paragraph('Aufgabe 3', st['h2'])] + [Paragraph(f"{k + 1}. {x(it['start'])} {x(' '.join(it['words']))}{x(it.get('end', '.'))}", st['sol']) for k, it in enumerate(s['bauen'])]
    story += [Paragraph('Aufgabe 4 – Musterbeschreibung', st['h2']), Paragraph(x(s['muster']), st['p']),
              Paragraph('Hinweis: Andere Beschreibungen sind natürlich auch richtig. Hören Sie die Musterbeschreibung auf deutsch-mit-dennis.de unter „Bild beschreiben“.', st['ins'])]
    doc.build(story)
    fn = f"material/arbeitsblaetter/bild-beschreiben-{s['id']}.pdf"
    open(os.path.join(ROOT, fn), 'wb').write(buf.getvalue())
    from pypdf import PdfReader
    pages = len(PdfReader(io.BytesIO(buf.getvalue())).pages)
    mats.append({'file': fn, 'title': title, 'level': 'A2–B1', 'cat': 'pruefung', 'desc': 'Adjektivendungen im Akkusativ und Relativsätze an einem Bild üben – mit Musterbeschreibung.', 'pages': pages, 'kb': round(len(buf.getvalue()) / 1024), 'loes': True})
    print('ok', fn, pages, 'Seiten')

# Materialliste aktualisieren
p = os.path.join(ROOT, 'site-data.js'); src = open(p, encoding='utf-8').read()
head, rest = src.split('DM.materials = ', 1); arr, tail = rest.split(';\n', 1)
cur = [m for m in json.loads(arr) if not m['file'].startswith('material/arbeitsblaetter/bild-beschreiben-')]
pos = next((i for i, m in enumerate(cur) if 'dtz-bild-beschreiben-redemittel' in m['file']), len(cur))
cur[pos:pos] = mats
open(p, 'w', encoding='utf-8').write(head + 'DM.materials = ' + json.dumps(cur, ensure_ascii=False, separators=(',', ':')) + ';\n' + tail)
print('bild-data.js:', len(SC), 'Szenen')
