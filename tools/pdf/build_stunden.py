# Rendert die redaktionell bearbeiteten Unterrichtsstunden (JSON) als PDF mit Wasserzeichen.
import json, os, sys, glob, re
S = os.path.dirname(os.path.abspath(__file__))
sys.argv = [sys.argv[0], sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))]
REPO = sys.argv[1]
# Stile, Schriften und Hilfsfunktionen aus build_lessons übernehmen (ohne dessen Hauptteil)
src = open(os.path.join(S, 'build_lessons.py'), encoding='utf-8').read()
ns = {'__file__': os.path.join(S, 'build_lessons.py')}
exec(src.split("d = json.load(open(os.path.join(S, 'lesson-data.json')")[0], ns)
g = ns
P, R, st, safe, box, lines, build = g['P'], g['R'], g['st'], g['safe'], g['box'], g['lines'], g['build']
from reportlab.platypus import Table, TableStyle, Spacer, KeepTogether, PageBreak, Paragraph, CondPageBreak
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
SOFT, LINE, TINTE, NOTE, GRUEN, MUTED = g['SOFT'], g['LINE'], g['TINTE'], g['NOTE'], g['GRUEN'], g['MUTED']
st['h2t'] = ParagraphStyle('h2t', parent=st['h2'], fontSize=17, leading=21, spaceBefore=4)
st['goal'] = ParagraphStyle('goal', parent=st['p'], textColor=MUTED, fontName='Atk-I')
W = 174 * mm

def fmt(t):
    # **fett** erlaubt
    t = safe(t)
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)

def table(head, rows):
    n = len(head)
    data = [[R(f'<b>{fmt(h)}</b>', 'cell') for h in head]] + [[R(fmt(c), 'cell') for c in r] for r in rows]
    if n == 2: cw = [W * 0.38, W * 0.62]
    elif n == 3: cw = [W * 0.26, W * 0.37, W * 0.37]
    else: cw = [W * 0.17] + [W * 0.83 / (n - 1)] * (n - 1)
    t = Table(data, colWidths=cw, repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), SOFT), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE), ('TOPPADDING', (0, 0), (-1, -1), 4),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 4), ('LEFTPADDING', (0, 0), (-1, -1), 5)]))
    return t

def render(d):
    story = [P(f"{d['level']} · Unterrichtsstunde", 'kick'), P(d['title'], 'h1'), P(d['intro'], 'lead')]
    # Inhaltsübersicht
    story += [box(R('<b>Themen</b><br/>' + '<br/>'.join(f"{i}. {fmt(t['title'])}" for i, t in enumerate(d['topics'], 1))), SOFT)]
    sols = []; ex_no = 0
    for ti, t in enumerate(d['topics'], 1):
        story += [CondPageBreak(60 * mm), Spacer(1, 6), P(f"{ti}. {t['title']}", 'h2t')]
        if t.get('goal'): story.append(P(t['goal'], 'goal'))
        for b in t['blocks']:
            ty = b['type']
            if ty == 'text': story.append(R(fmt(b['text'])))
            elif ty == 'rule': story += [Spacer(1, 3), box(R('<b>Regel:</b> ' + fmt(b['text'])), NOTE, HexColor('#E8A800')), Spacer(1, 5)]
            elif ty == 'tip': story += [Spacer(1, 3), box(R('<b>Tipp:</b> ' + fmt(b['text'])), HexColor('#F3F8F4'), GRUEN), Spacer(1, 5)]
            elif ty == 'table':
                if b.get('title'): story.append(P(b['title'], 'h3'))
                story += [table(b['head'], b['rows']), Spacer(1, 6)]
            elif ty in ('list', 'examples'):
                items = [R(('• ' if ty == 'list' else '– ') + fmt(i)) for i in b['items']]
                head = [P(b['title'], 'h3')] if b.get('title') else ([P('Beispiele', 'h3')] if ty == 'examples' else [])
                story.append(KeepTogether(head + items)); story.append(Spacer(1, 3))
            elif ty == 'dialog':
                if b.get('title'): story.append(P(b['title'], 'h3'))
                rows = [[R(f'<b>{fmt(w)}</b>', 'cell'), R(fmt(x), 'cell')] for w, x in b['lines']]
                tt = Table(rows, colWidths=[W * 0.2, W * 0.8]); tt.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 3)]))
                story += [tt, Spacer(1, 4)]
            elif ty == 'exercise':
                ex_no += 1
                title = b['title']
                head = [P(title, 'h3')]
                if b.get('task'): head.append(R('<i>' + fmt(b['task']) + '</i>'))
                its = [R(f"{k}. {fmt(i)}") for k, i in enumerate(b['items'], 1)] if len(b['items']) > 1 else [R(fmt(b['items'][0]))]
                story.append(KeepTogether(head + its)); story.append(Spacer(1, 4))
                if b.get('write'): story.append(lines(b['write']))
                sols.append((title, b.get('solutions', [])))
    if sols:
        story += [PageBreak(), P('Lösungen', 'h2t')]
        for title, s in sols:
            if not s: continue
            story.append(P(title, 'h3'))
            story += [R(f"{k}. {fmt(x)}") for k, x in enumerate(s, 1)] if len(s) > 1 else [R(fmt(s[0]))]
    story += [Spacer(1, 10), box(P('Lies die Regeln noch einmal laut und mach die Übungen morgen ohne Hilfe. – Dennis', 'hand'), NOTE)]
    return story

out = os.path.join(REPO, 'material', 'unterricht'); os.makedirs(out, exist_ok=True)
cat = []
files = sorted(glob.glob(os.path.join(S, 'stunden', '*.json')))
only = os.environ.get('ONLY')
for f in files:
    d = json.load(open(f, encoding='utf-8'))
    if only and only not in f: continue
    path = os.path.join(out, d['id'] + '.pdf')
    build(path, d['title'], render(d))
    from pypdf import PdfReader
    cat.append({'file': f"material/unterricht/{d['id']}.pdf", 'title': d['title'], 'level': d['level'], 'desc': d['intro'],
                'topics': [t['title'] for t in d['topics']], 'pages': len(PdfReader(path).pages), 'kb': os.path.getsize(path) // 1024, 'source': d['source']})
    print('ok', d['id'], cat[-1]['pages'], 'S.')
if not only:
    json.dump(cat, open(os.path.join(S, 'stunden-katalog.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
