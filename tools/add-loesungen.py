"""Hängt an Arbeitsblätter eine Lösungsseite an.
Daten: tools/loesungen/<slug>.json  {file, title?, sections:[{heading, items}], note}
Aufruf: python3 tools/add-loesungen.py   (mehrfach ausführbar: alte Lösungsseiten werden ersetzt)"""
import io, json, os, glob
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

R = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(R)
F = os.path.join(R, 'pdf', 'fonts')
pdfmetrics.registerFont(TTFont('Atk', os.path.join(F, 'Atk-R.ttf')))
pdfmetrics.registerFont(TTFont('Atk-B', os.path.join(F, 'Atk-B.ttf')))
pdfmetrics.registerFont(TTFont('Atk-I', os.path.join(F, 'Atk-I.ttf')))
pdfmetrics.registerFont(TTFont('DJV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))  # nur für → ≠
pdfmetrics.registerFontFamily('Atk', normal='Atk', bold='Atk-B', italic='Atk-I', boldItalic='Atk-B')
MARK, SITE = 'created by D.Prudnikau', 'deutsch-mit-dennis.de'
BLUE = HexColor('#2440b5')
data = open(os.path.join(ROOT, 'site-data.js'), encoding='utf-8').read()
mats = json.loads(data.split('DM.materials = ', 1)[1].split(';\n', 1)[0])
TITLES = {os.path.basename(m['file']): m['title'] for m in mats}

st = dict(
    h1=ParagraphStyle('h1', fontName='Atk-B', fontSize=17, leading=21, textColor=BLUE, spaceAfter=2),
    sub=ParagraphStyle('sub', fontName='Atk', fontSize=10.5, leading=14, textColor=HexColor('#555c70'), spaceAfter=10),
    h2=ParagraphStyle('h2', fontName='Atk-B', fontSize=11.5, leading=15, spaceBefore=8, spaceAfter=3),
    it=ParagraphStyle('it', fontName='Atk', fontSize=10.5, leading=14, leftIndent=12, spaceAfter=1.5),
    note=ParagraphStyle('note', fontName='Atk-I', fontSize=9.5, leading=13, textColor=HexColor('#444b5e'), spaceBefore=10,
                        backColor=HexColor('#eef2ff'), borderPadding=6, leftIndent=6, rightIndent=6))
def esc(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    for ch in '→≠': s = s.replace(ch, f'<font name="DJV">{ch}</font>')
    return s

def deco(title):
    def f(c, doc):
        pw, ph = A4
        c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.06)); c.setFont('Helvetica-Bold', pw / 13)
        c.translate(pw / 2, ph / 2); c.rotate(45); c.drawCentredString(0, 0, MARK); c.restoreState()
        c.setFillColor(Color(0.30, 0.34, 0.45)); c.setFont('Atk', 7.5)
        c.drawRightString(pw - 36, 22, f'{MARK} · {SITE}'); c.drawString(36, 22, f'Lösungen: {title}')
    return f

def render(d, title):
    buf = io.BytesIO()
    doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=50, rightMargin=50, topMargin=48, bottomMargin=48,
                          title=f'Lösungen – {title}', author='Dzianis Prudnikau')
    doc.addPageTemplates([PageTemplate(frames=[Frame(50, 48, A4[0] - 100, A4[1] - 96, id='f')], onPage=deco(title))])
    s = [Paragraph('Lösungen', st['h1']), Paragraph(esc(title), st['sub'])]
    for sec in d['sections']:
        items = [Paragraph(esc(i), st['it']) for i in sec['items']]
        s.append(KeepTogether([Paragraph(esc(sec['heading']), st['h2'])] + items[:3]))
        s += items[3:]
    if d.get('note'): s.append(Paragraph('Hinweis: ' + esc(d['note']), st['note']))
    doc.build(s)
    return buf.getvalue()

for jf in sorted(glob.glob(os.path.join(R, 'loesungen', '*.json'))):
    d = json.load(open(jf, encoding='utf-8'))
    pdf = os.path.join(ROOT, 'material', 'arbeitsblaetter', d['file'])
    rd = PdfReader(pdf); meta = dict(rd.metadata or {})
    old = int(meta.get('/DMLoesungSeiten', 0) or 0)
    title = d.get('title') or TITLES.get(d['file'], d['file'])
    sol = PdfReader(io.BytesIO(render(d, title)))
    w = PdfWriter()
    for p in rd.pages[:len(rd.pages) - old]: w.add_page(p)
    for p in sol.pages: w.add_page(p)
    meta = {k: v for k, v in meta.items() if isinstance(v, str)}
    meta['/DMLoesungSeiten'] = str(len(sol.pages))
    w.add_metadata(meta)
    w.compress_identical_objects() if hasattr(w, 'compress_identical_objects') else None
    out = io.BytesIO(); w.write(out); open(pdf, 'wb').write(out.getvalue())
    print(f'ok {d["file"]}: {len(rd.pages) - old} + {len(sol.pages)} Seiten, {len(out.getvalue()) // 1024} KB')
