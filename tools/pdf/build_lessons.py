# Erzeugt Lektions-PDFs (Lerneinheit, Wortschatz, Merkblatt, Lehrbuch je Niveau) und Kahoot-QR-Codes.
import json, os, sys, io, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
                                KeepTogether, PageBreak, Image as RLImage)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfReader, PdfWriter
sys.path.insert(0, os.path.dirname(__file__))
S = os.path.dirname(os.path.abspath(__file__))
REPO = sys.argv[1]
import importlib.util
spec = importlib.util.spec_from_file_location('bm', os.path.join(S, 'build_material.py'))
# nur die watermark-Funktion laden, ohne das Skript auszuführen
src = open(os.path.join(S, 'build_material.py'), encoding='utf-8').read()
ns = {}
exec(src.split('# Auswahl:')[0].replace("IN, REPO = sys.argv[1], sys.argv[2]", "IN, REPO = '', ''"), ns)
watermark = ns['watermark']

F = os.path.join(S, 'fonts')
pdfmetrics.registerFont(TTFont('Atk', os.path.join(F, 'Atk-R.ttf')))
pdfmetrics.registerFont(TTFont('Atk-B', os.path.join(F, 'Atk-B.ttf')))
pdfmetrics.registerFont(TTFont('Atk-I', os.path.join(F, 'Atk-I.ttf')))
pdfmetrics.registerFont(TTFont('Cav', os.path.join(F, 'Cav.ttf')))
pdfmetrics.registerFont(TTFont('Sym', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily('Atk', normal='Atk', bold='Atk-B', italic='Atk-I', boldItalic='Atk-B')

INK = HexColor('#172036'); TINTE = HexColor('#2341B5'); SOFT = HexColor('#E8ECFA'); MUTED = HexColor('#566078')
MARK = HexColor('#FFF3A8'); LINE = HexColor('#DADFEA'); ROT = HexColor('#C2362B'); GRUEN = HexColor('#1D7A45'); NOTE = HexColor('#FFFBE0')

st = {
 'h1': ParagraphStyle('h1', fontName='Atk-B', fontSize=24, leading=28, textColor=INK, spaceAfter=4),
 'kick': ParagraphStyle('kick', fontName='Atk-B', fontSize=10, leading=13, textColor=TINTE, spaceAfter=2),
 'lead': ParagraphStyle('lead', fontName='Atk', fontSize=12.5, leading=17, textColor=MUTED, spaceAfter=10),
 'h2': ParagraphStyle('h2', fontName='Atk-B', fontSize=15, leading=19, textColor=TINTE, spaceBefore=14, spaceAfter=6),
 'h3': ParagraphStyle('h3', fontName='Atk-B', fontSize=11.5, leading=15, textColor=INK, spaceBefore=6, spaceAfter=3),
 'p': ParagraphStyle('p', fontName='Atk', fontSize=11, leading=15.5, textColor=INK, spaceAfter=5),
 'small': ParagraphStyle('small', fontName='Atk', fontSize=9.5, leading=13, textColor=MUTED),
 'cell': ParagraphStyle('cell', fontName='Atk', fontSize=10, leading=13, textColor=INK),
 'cellb': ParagraphStyle('cellb', fontName='Atk-B', fontSize=10, leading=13, textColor=INK),
 'hand': ParagraphStyle('hand', fontName='Cav', fontSize=17, leading=20, textColor=TINTE),
 'line': ParagraphStyle('line', fontName='Atk', fontSize=11, leading=22, textColor=LINE),
}
GLYPHS = None
def safe(t):
    t = str(t).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    t = t.replace('→', '&#8594;') if False else t.replace('→', '->')
    for a, b in (('–', '–'), ('…', '...'), ('✓', '<font name="Sym">&#10003;</font>'), ('☐', '<font name="Sym">&#9744;</font>'), ('·', '·')):
        t = t.replace(a, b)
    return re.sub(r'[\U0001F000-\U0001FFFF☀-➿️]', '', t)
P = lambda t, s='p': Paragraph(safe(t) if s not in ('raw',) else t, st[s])
def R(html, s='p'): return Paragraph(html, st[s])

def footer(c, doc, title):
    c.saveState(); c.setFont('Atk-B', 9); c.setFillColor(TINTE)
    c.drawString(18 * mm, A4[1] - 12 * mm, 'Deutsch mit Dennis')
    c.setFont('Atk', 9); c.setFillColor(MUTED); c.drawRightString(A4[0] - 18 * mm, A4[1] - 12 * mm, title[:80])
    c.setStrokeColor(LINE); c.line(18 * mm, A4[1] - 14 * mm, A4[0] - 18 * mm, A4[1] - 14 * mm)
    c.drawString(18 * mm, 10 * mm, f'Seite {doc.page}')
    c.restoreState()

def build(path, title, story):
    tmp = path + '.raw.pdf'
    doc = BaseDocTemplate(tmp, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=20 * mm, bottomMargin=18 * mm,
                          title=title, author='Dzianis Prudnikau', subject='created by D.Prudnikau')
    fr = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
    doc.addPageTemplates([PageTemplate(id='p', frames=[fr], onPage=lambda c, d: footer(c, d, title))])
    doc.build(story)
    watermark(tmp, path); os.remove(tmp)

def box(flow, bg=SOFT, border=None):
    t = Table([[flow]], colWidths=[174 * mm])
    style = [('BACKGROUND', (0, 0), (-1, -1), bg), ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
             ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]
    if border: style.append(('LINEBEFORE', (0, 0), (0, -1), 3, border))
    t.setStyle(TableStyle(style)); return t

def lines(n):
    t = Table([[''] for _ in range(n)], colWidths=[174 * mm], rowHeights=[8 * mm] * n)
    t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.5, LINE)])); return t

d = json.load(open(os.path.join(S, 'lesson-data.json'), encoding='utf-8'))
lessons, units, words, lw = d['lessons'], d['units'], d['words'], d['lessonWords']
LEVELNAME = {'A1': 'A1', 'A2': 'A2', 'B1': 'B1', 'B2': 'B2 Beruf'}
MAT = os.path.join(REPO, 'material'); os.makedirs(MAT, exist_ok=True)

def wordlist(l):
    return [dict(words[k], key=k) for k in lw.get(l['id'], []) if k in words]

def head(l, kind):
    i = [x for x in lessons if x['level'] == l['level']].index(l) + 1
    return [P(f"{LEVELNAME[l['level']]} · Lektion {i} · {kind}", 'kick'), P(l['title'], 'h1'), P(l['goal'], 'lead')]

def vocab_table(ws, full=True):
    rows = [[R('<b>Wort</b>', 'cell'), R('<b>Formen</b>', 'cell'), R('<b>Beispiel</b>', 'cell')]]
    for w in ws:
        forms = w.get('plural') or w.get('hint') or ''
        if w.get('pos') == 'Verb': forms = w.get('hint') or forms
        ex = w.get('example', '')
        if full and w.get('meaning'): ex = f"{w['meaning']}<br/><i>{safe(ex)}</i>"
        else: ex = safe(ex)
        rows.append([R(f"<b>{safe(w['word'])}</b><br/><font size=8 color='#566078'>{safe(w.get('pos',''))}</font>", 'cell'), P(forms, 'cell'), R(ex if full else ex, 'cell')])
    t = Table(rows, colWidths=[42 * mm, 46 * mm, 86 * mm], repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), SOFT), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE), ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    return t

def lerneinheit_story(l):
    u = units.get(l['id'], {}); ws = wordlist(l); s = head(l, 'Lerneinheit')
    s += [P('1. Einstieg', 'h2'), box(P(u.get('scene', ''))), Spacer(1, 4), R(f"<b>Bevor du anfängst:</b> {safe(u.get('warm',''))}")]
    s += [P('2. Wortschatz', 'h2'), P('Lerne Nomen immer mit Artikel und Plural.', 'small'), Spacer(1, 4), vocab_table(ws)]
    s += [P('3. Grammatik', 'h2'), box(R(f"<b>Die Kurzregel:</b> {safe(l['rule'])}"), NOTE, HexColor('#E8A800')), Spacer(1, 4), R(f"<b>Beispiel:</b> {safe(l['example'])}")]
    for h, t in u.get('grammar', []): s += [P(h, 'h3'), P(t)]
    if u.get('mistake'):
        m = u['mistake']; s += [P('Ein typischer Fehler', 'h3'), R(f"<font color='#C2362B'><strike>{safe(m[0])}</strike></font>   ->   <b>{safe(m[1])}</b>"), P(m[2], 'small')]
    s += [P('4. Dialog und Lesen', 'h2')]
    if u.get('dialogue'):
        rows = [[R(f"<b>{safe(w)}</b>", 'cell'), P(t, 'cell')] for w, t in u['dialogue']]
        t = Table(rows, colWidths=[28 * mm, 146 * mm]); t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
        s += [t, P('Lies beide Rollen laut. Verändere danach eine Information.', 'small')]
    s += [P('Lesetext', 'h3'), box(P(l['text']), HexColor('#F7F8FB'))]
    s += [P('5. Übungen', 'h2')]
    qs = (u.get('checks') or []) + (l.get('questions') or []); letters = 'abcdef'
    for i, q in enumerate(qs, 1):
        opts = '   '.join(f"{letters[j]}) {safe(o)}" for j, o in enumerate(q['options']))
        s.append(KeepTogether([R(f"<b>{i}. {safe(q['q'])}</b>"), R(opts, 'p')]))
    s += [P('6. Selbst anwenden', 'h2'), box(P(l.get('task', ''))), Spacer(1, 4)]
    for m in u.get('missions', [])[:2]: s.append(R(f"• {safe(m)}"))
    s += [Spacer(1, 4), lines(8)]
    s += [P('Checkliste', 'h3')] + [R(f"[  ]  {t}") for t in ['Ich habe die Aufgabe beantwortet.', 'Meine Verben passen zur Person.', 'Ich habe Wörter aus der Lektion verwendet.', 'Ich kann meine Sätze laut vorlesen.']]
    s += [PageBreak(), P('Lösungen', 'h2')]
    for i, q in enumerate(qs, 1):
        s.append(R(f"<b>{i}. {letters[q['answer']]}) {safe(q['options'][q['answer']])}</b> – {safe(q.get('why',''))}"))
    if l.get('model'): s += [P('Mögliche Lösung zu „Selbst anwenden“', 'h3'), box(P(l['model']), HexColor('#F3F8F4'), GRUEN), P('Andere passende Formulierungen sind ebenfalls richtig.', 'small')]
    s += [Spacer(1, 10), box(P('Wiederhole morgen kurz: Nenne fünf neue Wörter, erkläre die Regel und sage drei eigene Sätze. – Dennis', 'hand'), NOTE)]
    return s

def wortschatz_story(l):
    ws = wordlist(l); s = head(l, '20 Wörter mit Grammatik')
    for pos, title in (('Nomen', 'Nomen · Menschen und Dinge'), ('Verb', 'Verben · Was passiert?'), ('Adjektiv', 'Adjektive · Wie ist etwas?')):
        g = [w for w in ws if w.get('pos') == pos]
        if g: s += [P(title, 'h2'), vocab_table(g)]
    rest = [w for w in ws if w.get('pos') not in ('Nomen', 'Verb', 'Adjektiv')]
    if rest: s += [P('Weitere Wörter', 'h2'), vocab_table(rest)]
    s += [P('Üben', 'h2'), P('Decke die Spalte „Beispiel“ ab. Bilde mit jedem Wort einen eigenen Satz. Lies die Sätze laut.'), lines(6)]
    return s

def merkblatt_story(l):
    u = units.get(l['id'], {}); ws = wordlist(l)[:10]; s = head(l, 'Merkblatt')
    s += [box(R(f"<b>Die Regel:</b> {safe(l['rule'])}"), NOTE, HexColor('#E8A800')), Spacer(1, 6), R(f"<b>Beispiel:</b> {safe(l['example'])}")]
    for h, t in u.get('grammar', [])[:2]: s += [P(h, 'h3'), P(t)]
    if u.get('mistake'):
        m = u['mistake']; s += [P('Achtung, typischer Fehler', 'h3'), R(f"<font color='#C2362B'><strike>{safe(m[0])}</strike></font>   ->   <b>{safe(m[1])}</b>")]
    s += [P('Die wichtigsten Wörter', 'h2')]
    rows = [[R(f"<b>{safe(w['word'])}</b>", 'cell'), P(w.get('example', ''), 'cell')] for w in ws]
    t = Table(rows, colWidths=[50 * mm, 124 * mm]); t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    s += [t]
    return s

n = 0
for l in lessons:
    i = l['id']
    build(os.path.join(MAT, f'lerneinheit-{i}.pdf'), f"Lerneinheit: {l['title']}", lerneinheit_story(l))
    build(os.path.join(MAT, f'wortschatz-{i}.pdf'), f"Wortschatz: {l['title']}", wortschatz_story(l))
    build(os.path.join(MAT, f'{i}.pdf'), f"Merkblatt: {l['title']}", merkblatt_story(l))
    n += 3
print('Lektions-PDFs:', n)

# Lehrbuch je Niveau: Deckblatt + alle Lerneinheiten
for lev in ['A1', 'A2', 'B1', 'B2']:
    ls = [l for l in lessons if l['level'] == lev]
    cover = [Spacer(1, 50 * mm), P('Deutsch mit Dennis', 'kick'), P(f'Lehrbuch {LEVELNAME[lev]}', 'h1'),
             P({'A1': 'Erste Schritte', 'A2': 'Alltag meistern', 'B1': 'Sicher ausdrücken', 'B2': 'Deutsch im Beruf'}[lev], 'lead'), Spacer(1, 10), P('Inhalt', 'h2')]
    cover += [R(f"{k}. {safe(l['title'])} – <font color='#566078'>{safe(l['goal'])}</font>") for k, l in enumerate(ls, 1)]
    path = os.path.join(MAT, f'lehrbuch-{lev}.pdf')
    build(path + '.cover.pdf', f'Lehrbuch {LEVELNAME[lev]}', cover)
    w = PdfWriter()
    for f in [path + '.cover.pdf'] + [os.path.join(MAT, f"lerneinheit-{l['id']}.pdf") for l in ls]:
        for p in PdfReader(f).pages: w.add_page(p)
    w.add_metadata({'/Title': f'Lehrbuch {LEVELNAME[lev]} – Deutsch mit Dennis', '/Author': 'Dzianis Prudnikau', '/Subject': 'created by D.Prudnikau'})
    with open(path, 'wb') as f: w.write(f)
    os.remove(path + '.cover.pdf')
print('Lehrbücher: 4')

# Kahoot-QR-Codes
import qrcode
from PIL import Image, ImageDraw, ImageFont
kd = os.path.join(MAT, 'kahoot'); os.makedirs(kd, exist_ok=True)
fB = ImageFont.truetype(os.path.join(F, 'Atk-B.ttf'), 40); fR = ImageFont.truetype(os.path.join(F, 'Atk-R.ttf'), 28)
singles = []
for q in d['kahoot']:
    img = qrcode.make(q['url'], box_size=14, border=2).convert('RGB')
    W = 900; H = img.height + 220; card = Image.new('RGB', (W, H), 'white'); card.paste(img, ((W - img.width) // 2, 40))
    dr = ImageDraw.Draw(card); y = 40 + img.height + 30
    dr.text((W // 2, y), q['title'][:42], font=fB, fill='#172036', anchor='mt')
    dr.text((W // 2, y + 60), 'Kahoot-Quiz · Deutsch mit Dennis', font=fR, fill='#2341B5', anchor='mt')
    dr.text((W - 20, H - 20), 'created by D.Prudnikau', font=ImageFont.truetype(os.path.join(F, 'Atk-R.ttf'), 18), fill='#8A93A8', anchor='rb')
    card.save(os.path.join(kd, f"kahoot-{q['n']}.png"), optimize=True)
    buf = io.BytesIO(); card.save(buf, 'PNG'); buf.seek(0)
    path = os.path.join(kd, f"kahoot-{q['n']}-qr.pdf")
    story = [P('Kahoot-Quiz', 'kick'), P(q['title'], 'h1'), P('Scanne den QR-Code mit dem Handy oder öffne den Link.', 'lead'),
             RLImage(buf, width=120 * mm, height=120 * mm * card.height / card.width), Spacer(1, 6), P(q['url'], 'small')]
    build(path, f"Kahoot: {q['title']}", story); singles.append(path)
w = PdfWriter()
for f in singles:
    for p in PdfReader(f).pages: w.add_page(p)
w.add_metadata({'/Title': 'Alle Kahoot-QR-Codes – Deutsch mit Dennis', '/Author': 'Dzianis Prudnikau', '/Subject': 'created by D.Prudnikau'})
with open(os.path.join(kd, 'alle-kahoot-qr-codes.pdf'), 'wb') as f: w.write(f)
print('Kahoot:', len(singles))
