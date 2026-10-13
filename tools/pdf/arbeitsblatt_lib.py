# Bausteine für die wöchentlichen Arbeitsblätter (material/arbeitsblaetter/<slug>.pdf).
# Stil wie build_lessons.py: Atkinson Hyperlegible, Wasserzeichen „created by D.Prudnikau“,
# Fußzeile „deutsch-mit-dennis.de“. Ein Blatt = eine Datei in tools/pdf/arbeitsblaetter/<slug>.py,
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/<slug>.py
import io, os
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
                                KeepTogether, PageBreak)
from reportlab.lib.styles import ParagraphStyle

S = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(S))
F = os.path.join(S, 'fonts')
pdfmetrics.registerFont(TTFont('Atk', os.path.join(F, 'Atk-R.ttf')))
pdfmetrics.registerFont(TTFont('Atk-B', os.path.join(F, 'Atk-B.ttf')))
pdfmetrics.registerFont(TTFont('Atk-I', os.path.join(F, 'Atk-I.ttf')))
pdfmetrics.registerFont(TTFont('Cav', os.path.join(F, 'Cav.ttf')))
SYM = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
pdfmetrics.registerFont(TTFont('Sym', SYM if os.path.exists(SYM) else os.path.join(F, 'Atk-R.ttf')))
registerFontFamily('Atk', normal='Atk', bold='Atk-B', italic='Atk-I', boldItalic='Atk-B')

MARK = 'created by D.Prudnikau'
SITE = 'deutsch-mit-dennis.de'
INK = HexColor('#172036'); TINTE = HexColor('#2341B5'); SOFT = HexColor('#E8ECFA'); MUTED = HexColor('#566078')
LINE = HexColor('#DADFEA'); ROT = HexColor('#C2362B'); GRUEN = HexColor('#1D7A45'); NOTE = HexColor('#FFFBE0')
GELB = HexColor('#E8A800'); HELLGRUEN = HexColor('#F3F8F4')

st = {
 'h1': ParagraphStyle('h1', fontName='Atk-B', fontSize=22, leading=26, textColor=INK, spaceAfter=4),
 'kick': ParagraphStyle('kick', fontName='Atk-B', fontSize=10, leading=13, textColor=TINTE, spaceAfter=2),
 'lead': ParagraphStyle('lead', fontName='Atk', fontSize=11.5, leading=15, textColor=MUTED, spaceAfter=4),
 'h2': ParagraphStyle('h2', fontName='Atk-B', fontSize=14, leading=18, textColor=TINTE, spaceBefore=8, spaceAfter=3),
 'h3': ParagraphStyle('h3', fontName='Atk-B', fontSize=11.5, leading=15, textColor=INK, spaceBefore=6, spaceAfter=3),
 'p': ParagraphStyle('p', fontName='Atk', fontSize=11, leading=15, textColor=INK, spaceAfter=4),
 'item': ParagraphStyle('item', fontName='Atk', fontSize=11, leading=15, textColor=INK, spaceAfter=3, leftIndent=16, firstLineIndent=-16),
 'small': ParagraphStyle('small', fontName='Atk', fontSize=9.5, leading=13, textColor=MUTED, spaceAfter=3),
 'cell': ParagraphStyle('cell', fontName='Atk', fontSize=10, leading=13, textColor=INK),
 'hand': ParagraphStyle('hand', fontName='Cav', fontSize=16, leading=19, textColor=TINTE),
}

def R(html, s='p'): return Paragraph(html, st[s])
def sym(ch): return f'<font name="Sym">{ch}</font>'
ARROW = sym('→')
GAP = '<font color="#8A93A8">__________</font>'

def box(flow, bg=SOFT, border=None, width=174 * mm):
    t = Table([[flow]], colWidths=[width])
    style = [('BACKGROUND', (0, 0), (-1, -1), bg), ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
             ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]
    if border: style.append(('LINEBEFORE', (0, 0), (0, -1), 3, border))
    t.setStyle(TableStyle(style)); return t

def table(rows, widths, head=True):
    data = [[c if not isinstance(c, str) else R(c, 'cell') for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE),
             ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]
    if head: style.append(('BACKGROUND', (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style)); return t

def lines(n, indent=16):
    t = Table([[''] for _ in range(n)], colWidths=[174 * mm - indent], rowHeights=[6.5 * mm] * n, hAlign='RIGHT')
    t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.5, LINE)])); return t

def task(nr, title, hint, level):
    """Überschrift einer Übung mit Schwierigkeit (1–3 Punkte)."""
    dots = '●' * level + '○' * (3 - level)
    return [R(f'Übung {nr} · {title} <font name="Sym" size="9" color="#566078">  {dots}</font>', 'h2'), R(hint, 'small')]

def _overlay(w, h):
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(w, h))
    size = max(28, min(w, h) / 11)
    c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.10)); c.setFont('Helvetica-Bold', size)
    c.translate(w / 2, h / 2); c.rotate(35); c.drawCentredString(0, -size / 3, MARK); c.restoreState()
    c.save(); buf.seek(0); return PdfReader(buf).pages[0]

def _page(c, doc, title, level):
    c.saveState(); c.setFont('Atk-B', 9); c.setFillColor(TINTE)
    c.drawString(18 * mm, A4[1] - 12 * mm, 'Deutsch mit Dennis')
    c.setFont('Atk', 9); c.setFillColor(MUTED); c.drawRightString(A4[0] - 18 * mm, A4[1] - 12 * mm, f'{title[:70]} · {level}')
    c.setStrokeColor(LINE); c.line(18 * mm, A4[1] - 14 * mm, A4[0] - 18 * mm, A4[1] - 14 * mm)
    c.line(18 * mm, 13.5 * mm, A4[0] - 18 * mm, 13.5 * mm)
    c.drawString(18 * mm, 9 * mm, f'Seite {doc.page}')
    c.setFont('Atk-B', 9); c.setFillColor(TINTE); c.drawCentredString(A4[0] / 2, 9 * mm, SITE)
    c.setFont('Atk', 7.5); c.setFillColor(MUTED); c.drawRightString(A4[0] - 18 * mm, 9 * mm, f'{MARK} · kostenlos für den Unterricht')
    c.restoreState()

def build(slug, title, level, story):
    path = os.path.join(REPO, 'material', 'arbeitsblaetter', slug + '.pdf')
    tmp = path + '.raw.pdf'
    doc = BaseDocTemplate(tmp, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=20 * mm, bottomMargin=19 * mm,
                          title=title, author='Dzianis Prudnikau', subject=MARK)
    fr = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
    doc.addPageTemplates([PageTemplate(id='p', frames=[fr], onPage=lambda c, d: _page(c, d, title, level))])
    doc.build(story)
    r = PdfReader(tmp); w = PdfWriter()
    for p in r.pages:
        p.merge_page(_overlay(float(p.mediabox.width), float(p.mediabox.height))); w.add_page(p)
    for p in w.pages: p.compress_content_streams()
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
    w.add_metadata({'/Title': f'{title} – Deutsch mit Dennis', '/Author': 'Dzianis Prudnikau', '/Creator': 'Deutsch mit Dennis', '/Subject': MARK})
    with open(path, 'wb') as f: w.write(f)
    os.remove(tmp)
    pages, kb = len(r.pages), os.path.getsize(path) // 1024
    print(f'{path}: {pages} Seiten, {kb} KB')
    return pages, kb

__all__ = ['R', 'GAP', 'ARROW', 'sym', 'box', 'table', 'lines', 'task', 'build', 'st', 'Spacer', 'PageBreak', 'KeepTogether',
           'NOTE', 'GELB', 'ROT', 'GRUEN', 'HELLGRUEN', 'SOFT', 'mm']
