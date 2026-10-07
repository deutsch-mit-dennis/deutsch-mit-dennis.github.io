"""Erzeugt Arbeitsblätter mit Übungen + Lösungsseite aus tools/uebungen/<slug>.json.
mode "replace": Das PDF wird komplett neu erzeugt (Übungen + Lösungen).
mode "append":  Das vorhandene Blatt bleibt, Übungsseiten + Lösungen werden angehängt (mehrfach ausführbar).
Aufruf: python3 tools/make-uebungen.py [--out ORDNER] [slug ...]

JSON: {file, mode, title, level, intro?, blocks:[...], solutions:[{heading, items}], note?}
Blöcke:
  {"type":"text", "heading"?, "paragraphs":[...], "box"?:true}
  {"type":"cards", "heading"?, "cards":[{"label":"A","title"?, "text"}]}          (2 Spalten)
  {"type":"task", "heading", "instruction"?, "wordbox"?:[...], "example"?, "items":[...], "lines"?:n}
  {"type":"table", "heading"?, "rows":[[...],...]}                                   (1. Zeile = Kopf)
Auszeichnung in Texten: **fett**, [[unterstrichen]], Lücken = ___ (3+ Unterstriche),
Zeilenumbruch \n in einem Item = Antwortoptionen darunter."""
import io, json, os, re, sys, glob
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, KeepTogether,
                                Table, TableStyle, PageBreak, CondPageBreak)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

R = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(R)
F = os.path.join(R, 'pdf', 'fonts')
for n, f in [('Atk', 'Atk-R'), ('Atk-B', 'Atk-B'), ('Atk-I', 'Atk-I')]:
    pdfmetrics.registerFont(TTFont(n, os.path.join(F, f + '.ttf')))
pdfmetrics.registerFont(TTFont('DJV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFontFamily('Atk', normal='Atk', bold='Atk-B', italic='Atk-I', boldItalic='Atk-B')
MARK, SITE = 'created by D.Prudnikau', 'deutsch-mit-dennis.de'
BLUE, GREY, SOFT = HexColor('#2440b5'), HexColor('#555c70'), HexColor('#eef2ff')

S = dict(
    h1=ParagraphStyle('h1', fontName='Atk-B', fontSize=18, leading=22, textColor=BLUE, spaceAfter=2),
    sub=ParagraphStyle('sub', fontName='Atk', fontSize=10.5, leading=14, textColor=GREY, spaceAfter=10),
    h2=ParagraphStyle('h2', fontName='Atk-B', fontSize=12, leading=16, spaceBefore=10, spaceAfter=3),
    ins=ParagraphStyle('ins', fontName='Atk-I', fontSize=10.5, leading=14, textColor=GREY, spaceAfter=4),
    p=ParagraphStyle('p', fontName='Atk', fontSize=11, leading=15.5, spaceAfter=5),
    it=ParagraphStyle('it', fontName='Atk', fontSize=11, leading=17, leftIndent=16, firstLineIndent=-16, spaceAfter=2),
    opt=ParagraphStyle('opt', fontName='Atk', fontSize=10.5, leading=14, leftIndent=30, spaceAfter=1),
    card=ParagraphStyle('card', fontName='Atk', fontSize=10, leading=13.5),
    cell=ParagraphStyle('cell', fontName='Atk', fontSize=10.5, leading=14),
    sol=ParagraphStyle('sol', fontName='Atk', fontSize=10.5, leading=14, leftIndent=12, spaceAfter=1.5),
    note=ParagraphStyle('note', fontName='Atk-I', fontSize=9.5, leading=13, textColor=HexColor('#444b5e'), spaceBefore=10,
                        backColor=SOFT, borderPadding=6, leftIndent=6, rightIndent=6))

def mk(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'\[\[(.+?)\]\]', r'<u>\1</u>', s)
    s = re.sub(r'_{3,}', lambda m: '_' * max(len(m.group(0)), 10), s)
    for ch in '→≠←↔✓✗☐':
        s = s.replace(ch, f'<font name="DJV">{ch}</font>')
    return s
P = lambda t, st: Paragraph(mk(t), st)

def deco(title):
    def f(c, doc):
        pw, ph = A4
        c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.06)); c.setFont('Helvetica-Bold', pw / 13)
        c.translate(pw / 2, ph / 2); c.rotate(45); c.drawCentredString(0, 0, MARK); c.restoreState()
        c.setFillColor(Color(0.30, 0.34, 0.45)); c.setFont('Atk', 7.5)
        c.drawRightString(pw - 36, 22, f'{MARK} · {SITE}'); c.drawString(36, 22, title)
    return f

def lines(n, w):
    t = Table([['']] * n, colWidths=[w], rowHeights=[22] * n)
    t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.5, HexColor('#9aa1b5'))]))
    return t

def block(b, W):
    out = []
    h = [P(b['heading'], S['h2'])] if b.get('heading') else []
    t = b['type']
    if t == 'text':
        ps = [P(x, S['p']) for x in b['paragraphs']]
        if b.get('box'):
            tb = Table([[ps]], colWidths=[W])
            tb.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), SOFT), ('BOX', (0, 0), (-1, -1), 0.6, HexColor('#c5cdf0')),
                                    ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                                    ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
            ps = [tb]
        out = [KeepTogether(h + ps[:2])] + ps[2:] if len(ps) > 2 else [KeepTogether(h + ps)]
    elif t == 'cards':
        cells = []
        for c in b['cards']:
            txt = f"<b>{mk(c['label'])}</b>" + (f"  <b>{mk(c['title'])}</b>" if c.get('title') else '') + '<br/>' + mk(c['text']).replace('\n', '<br/>')
            cells.append(Paragraph(txt, S['card']))
        if len(cells) % 2: cells.append('')
        rows = [cells[i:i + 2] for i in range(0, len(cells), 2)]
        tb = Table(rows, colWidths=[W / 2 - 3] * 2)
        tb.setStyle(TableStyle([('BOX', (0, 0), (-1, -1), 0.5, HexColor('#9aa1b5')), ('INNERGRID', (0, 0), (-1, -1), 0.5, HexColor('#9aa1b5')),
                                ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7),
                                ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
        out = h + [tb]
    elif t == 'task':
        head = h + ([P(b['instruction'], S['ins'])] if b.get('instruction') else [])
        if b.get('wordbox'):
            wb = Table([[Paragraph(mk('   ·   '.join(b['wordbox'])), S['cell'])]], colWidths=[W])
            wb.setStyle(TableStyle([('BOX', (0, 0), (-1, -1), 0.7, BLUE), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
            head += [wb, Spacer(1, 5)]
        if b.get('example'): head.append(P('Beispiel: ' + b['example'], S['ins']))
        gs = []
        for i in b.get('items', []):
            parts = i.split('\n')
            gs.append([P(parts[0], S['it'])] + [P(o, S['opt']) for o in parts[1:]])
        if b.get('lines'): gs.append([lines(b['lines'], W)])
        out = [KeepTogether(head + [f for g in gs[:2] for f in g])]
        out += [KeepTogether(g) if len(g) > 1 else g[0] for g in gs[2:]]
    elif t == 'table':
        rows = [[Paragraph(('<b>%s</b>' if r == 0 else '%s') % mk(c), S['cell']) for c in row] for r, row in enumerate(b['rows'])]
        n = len(b['rows'][0])
        tb = Table(rows, colWidths=[W / n] * n, repeatRows=1)
        tb.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 0.5, HexColor('#9aa1b5')), ('BACKGROUND', (0, 0), (-1, 0), SOFT),
                                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
        out = h + [tb]
    return out

def render(d):
    buf = io.BytesIO(); W = A4[0] - 100
    title = d['title']
    doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=50, rightMargin=50, topMargin=46, bottomMargin=48,
                          title=title, author='Dzianis Prudnikau', subject='Arbeitsblatt Deutsch mit Dennis')
    doc.addPageTemplates([PageTemplate(frames=[Frame(50, 48, W, A4[1] - 94, id='f', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)], onPage=deco(title))])
    if d['mode'] == 'replace':
        s = [P(title, S['h1']), P(f"Niveau {d.get('level', '')} · Arbeitsblatt mit Lösungen", S['sub'])]
    else:
        s = [P('Übungen', S['h1']), P(f'{title} – zum Üben mit Lösungen', S['sub'])]
    if d.get('intro'): s.append(P(d['intro'], S['p']))
    for b in d['blocks']: s += block(b, W)
    s += [PageBreak(), P('Lösungen', S['h1']), P(title, S['sub'])]
    for sec in d['solutions']:
        its = [P(i, S['sol']) for i in sec['items']]
        s.append(KeepTogether([P(sec['heading'], S['h2'])] + its[:3])); s += its[3:]
    if d.get('note'): s.append(P('Hinweis: ' + d['note'], S['note']))
    doc.build(s)
    return buf.getvalue()

def main():
    a = sys.argv[1:]; out = None
    if a[:1] == ['--out']: out, a = a[1], a[2:]
    files = [os.path.join(R, 'uebungen', x + '.json') for x in a] or sorted(glob.glob(os.path.join(R, 'uebungen', '*.json')))
    for jf in files:
        d = json.load(open(jf, encoding='utf-8'))
        target = os.path.join(ROOT, 'material', 'arbeitsblaetter', d['file'])
        new = PdfReader(io.BytesIO(render(d)))
        w = PdfWriter(); meta = {}
        if d['mode'] == 'append':
            rd = PdfReader(target); meta = {k: v for k, v in (rd.metadata or {}).items() if isinstance(v, str)}
            old = int(meta.get('/DMUebungSeiten', 0) or 0)
            for p in rd.pages[:len(rd.pages) - old]: w.add_page(p)
            meta['/DMUebungSeiten'] = str(len(new.pages))
        else:
            meta = {'/Title': d['title'], '/Author': 'Dzianis Prudnikau'}
        for p in new.pages: w.add_page(p)
        w.add_metadata(meta)
        b = io.BytesIO(); w.write(b)
        dest = os.path.join(out, d['file']) if out else target
        os.makedirs(os.path.dirname(dest), exist_ok=True); open(dest, 'wb').write(b.getvalue())
        print(f"ok {d['file']} ({d['mode']}): {len(w.pages)} Seiten, {len(b.getvalue()) // 1024} KB")

if __name__ == '__main__':
    main()
