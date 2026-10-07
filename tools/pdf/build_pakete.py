# Rendert die Lernpakete (pakete/*.json) als PDF mit Deckblatt und Wasserzeichen.
# Ausgabe NUR in pakete-out/ (nicht ins Repository!). Leseproben: pakete-out/leseproben/.
import json, os, sys, glob, re
S = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
src = open(os.path.join(S, 'build_stunden.py'), encoding='utf-8').read()
src = src.split("out = os.path.join(REPO, 'material', 'unterricht')")[0]
sys.argv = [sys.argv[0], REPO]
g = {'__file__': os.path.join(S, 'build_stunden.py')}
exec(src, g)
# Lernpakete (Verkauf über Digistore): KEIN Wasserzeichen – der Lizenzhinweis auf dem Deckblatt reicht.
import shutil as _sh
NO_WATERMARK = lambda src, dst: _sh.copyfile(src, dst)
ORIG_WATERMARK = g['ns']['watermark']
g['ns']['watermark'] = NO_WATERMARK
_fmt0 = g['fmt']
def fmt(t):
    return _fmt0(t).replace('&lt;br/&gt;', '<br/>').replace('&lt;br&gt;', '<br/>').replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>').replace('&lt;i&gt;', '<i>').replace('&lt;/i&gt;', '</i>')
g['fmt'] = fmt
P, R, st, safe, box, lines, build, table = g['P'], g['R'], g['st'], g['safe'], g['box'], g['lines'], g['build'], g['table']
SOFT, LINE, TINTE, NOTE, GRUEN, MUTED, W = g['SOFT'], g['LINE'], g['TINTE'], g['NOTE'], g['GRUEN'], g['MUTED'], g['W']
from reportlab.platypus import Table, TableStyle, Spacer, KeepTogether, PageBreak, CondPageBreak, Image as RLImage
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from PIL import Image as PILImage
st['cover'] = ParagraphStyle('cover', parent=st['h1'], fontSize=30, leading=35, spaceAfter=10)
st['coverkick'] = ParagraphStyle('coverkick', parent=st['kick'], fontSize=13, leading=17, spaceAfter=8)
st['lic'] = ParagraphStyle('lic', parent=st['small'], fontSize=9, leading=12.5)
LIC = ('© Dzianis Prudnikau · Deutsch mit Dennis · deutsch-mit-dennis.de<br/>'
       'Dieses Lernpaket ist nur für deinen persönlichen Gebrauch bestimmt. Weitergabe, Vervielfältigung oder '
       'Veröffentlichung – auch auszugsweise – sind nicht erlaubt. Unabhängiges Lernmaterial: kein Angebot von '
       'g.a.s.t., telc oder BAMF, keine offiziellen Prüfungsaufgaben.')
CB = '<font name="Atk">&#9744;</font>'

def check_glyph():
    # Atkinson hat kein ☐ – eigenes Kästchen als Tabelle zeichnen
    return None

st['box'] = ParagraphStyle('box', fontName='Sym', fontSize=15, leading=15, textColor=TINTE)
BOXP = lambda: R('&#9744;', 'box')

def checklist(title, items):
    rows = [[BOXP(), R(fmt(i), 'cell')] for i in items]
    t = Table(rows, colWidths=[8 * mm, W - 8 * mm])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)] +
                          [('LINEBELOW', (1, i), (1, i), 0.3, LINE) for i in range(len(rows))]))
    # Kästchen klein halten: Zelle 0 mit fester Höhe ist schwierig -> stattdessen innere Box per Padding
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (0, -1), 0), ('RIGHTPADDING', (0, 0), (0, -1), 0)]))
    return KeepTogether(([P(title, 'h3')] if title else []) + [t])

def image(srcpath, caption, maxh=82 * mm):
    p = os.path.join(REPO, srcpath)
    im = PILImage.open(p); w, h = im.size
    tw = W; th = tw * h / w
    if th > maxh: th = maxh; tw = th * w / h
    if p.endswith('.webp'):  # reportlab kann kein WebP -> PNG/JPEG-Zwischendatei
        cache = os.path.join(S, 'pakete-out', '_img'); os.makedirs(cache, exist_ok=True)
        q = os.path.join(cache, os.path.basename(p)[:-5] + '.jpg')
        if not os.path.exists(q): im.convert('RGB').save(q, 'JPEG', quality=90)
        p = q
    img = RLImage(p, width=tw, height=th)
    return KeepTogether([img, Spacer(1, 3), P(caption, 'small'), Spacer(1, 6)])

def rlimg(srcpath, maxw, maxh):
    p = os.path.join(REPO, srcpath); im = PILImage.open(p); w, h = im.size
    sc = min(maxw / w, maxh / h); cache = os.path.join(S, 'pakete-out', '_img'); os.makedirs(cache, exist_ok=True)
    q = os.path.join(cache, os.path.basename(p).rsplit('.', 1)[0] + '.jpg')
    if not os.path.exists(q): im.convert('RGB').save(q, 'JPEG', quality=90)
    return RLImage(q, width=w * sc, height=h * sc)

def lidq(q):
    nr = q['nr'] if isinstance(q['nr'], int) else q['nr']
    pic = len(q['img']) == 4 and q['a'][0].startswith('Bild ')
    body = [R(f"<b>{nr}.</b> {fmt(q['q'])}", 'cell')]
    IMG = 'assets/lid-fragen/'
    if q['img'] and not pic:
        body.append(rlimg(IMG + q['img'][0], 90 * mm, 50 * mm))
    if pic:
        cells = []
        for i, f in enumerate(q['img']):
            cells.append([rlimg(IMG + f, 32 * mm, 26 * mm), R(('<b>Bild %d <font name="Sym">&#10003;</font></b>' if i == q['s'] else 'Bild %d') % (i + 1), 'cell')])
        t = Table([cells], colWidths=[(W - 20 * mm) / 4] * 4); body.append(t)
    else:
        for i, a in enumerate(q['a']):
            body.append(R(('<b>' + 'abcd'[i] + ') ' + fmt(a) + ' <font name="Sym">&#10003;</font></b>') if i == q['s'] else ('abcd'[i] + ') ' + fmt(a)), 'cell'))
    t = Table([[BOXP(), body]], colWidths=[8 * mm, W - 8 * mm])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (1, 0), (1, 0), 8),
                           ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 5), ('LINEBELOW', (1, 0), (1, 0), 0.3, LINE)]))
    return KeepTogether([t, Spacer(1, 3)])

st['cellsm'] = ParagraphStyle('cellsm', parent=st['cell'], fontSize=9, leading=11.5)
def table_ext(b):
    # optionale Felder: widths (Anteile), small (9 pt)
    head, rows = b['head'], b['rows']
    if not b.get('widths') and not b.get('small') and len(head) > 1: return table(head, rows)
    cs = 'cellsm' if b.get('small') else 'cell'
    n = len(head); fr = b.get('widths') or [1.0 / n] * n
    data = [[R(f'<b>{fmt(h)}</b>', cs) for h in head]] + [[R(fmt(c), cs) for c in r] for r in rows]
    t = Table(data, colWidths=[W * f for f in fr], repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), SOFT), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE), ('TOPPADDING', (0, 0), (-1, -1), 4),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 4), ('LEFTPADDING', (0, 0), (-1, -1), 5)]
                          + ([('GRID', (0, 0), (-1, -1), 0.4, LINE)] if b.get('grid') else [])))
    return t

def render(d):
    # Deckblatt
    story = [Spacer(1, 30 * mm), P(d.get('kick', 'Lernpaket'), 'coverkick'), P(d['title'], 'cover'),
             P(f"Niveau {d['level']}", 'h3'), Spacer(1, 4), P(d['intro'], 'lead'), Spacer(1, 6),
             box(R('<b>Inhalt</b><br/>' + '<br/>'.join(f"{i}. {fmt(t['title'])}" for i, t in enumerate(d['topics'], 1))), SOFT),
             Spacer(1, 14), box(P(d.get('cover_note', 'Viel Erfolg beim Lernen! – Dennis'), 'hand'), NOTE), Spacer(1, d.get('cover_gap', 20) * mm), R(d.get('license', LIC), 'lic'), PageBreak()]
    sols = []
    for ti, t in enumerate(d['topics'], 1):
        story += [CondPageBreak(60 * mm), Spacer(1, 6), P(f"{ti}. {t['title']}", 'h2t')]
        if t.get('goal'): story.append(P(t['goal'], 'goal'))
        for b in t['blocks']:
            ty = b['type']
            if ty == 'text': story.append(R(fmt(b['text']).replace('&lt;br/&gt;', '<br/>').replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')))
            elif ty == 'rule': story += [Spacer(1, 3), box(R('<b>Regel:</b> ' + fmt(b['text'])), NOTE, HexColor('#E8A800')), Spacer(1, 5)]
            elif ty == 'tip': story += [Spacer(1, 3), box(R('<b>Tipp:</b> ' + fmt(b['text'])), HexColor('#F3F8F4'), GRUEN), Spacer(1, 5)]
            elif ty == 'table':
                if b.get('title'): story.append(P(b['title'], 'h3'))
                story += [table_ext(b), Spacer(1, 6)]
            elif ty in ('list', 'examples'):
                items = [R(('• ' if ty == 'list' else '– ') + fmt(i)) for i in b['items']]
                head = [P(b['title'], 'h3')] if b.get('title') else ([P('Beispiele', 'h3')] if ty == 'examples' else [])
                story.append(KeepTogether(head + items)); story.append(Spacer(1, 3))
            elif ty == 'checklist': story += [checklist(b.get('title'), b['items']), Spacer(1, 6)]
            elif ty == 'dialog':
                if b.get('title'): story.append(P(b['title'], 'h3'))
                rows = [[R(f'<b>{fmt(w)}</b>', 'cell'), R(fmt(x), 'cell')] for w, x in b['lines']]
                tt = Table(rows, colWidths=[W * 0.22, W * 0.78]); tt.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 3)]))
                story += [tt, Spacer(1, 4)]
            elif ty == 'image': story.append(image(b['src'], b.get('caption', '')))
            elif ty == 'pagebreak': story.append(PageBreak())
            elif ty == 'lidq': story.append(lidq(b['q']))
            elif ty == 'exercise':
                title = b['title']; head = [P(title, 'h3')]
                if b.get('task'): head.append(R('<i>' + fmt(b['task']) + '</i>'))
                if b.get('source'): head += [Spacer(1, 2), box(R(fmt(b['source']), 'cell'), HexColor('#F4F6FB'), TINTE), Spacer(1, 6)]
                if b.get('items_title'): head.append(R('<b>' + fmt(b['items_title']) + '</b>'))
                its = [R(f"{k}. {fmt(i)}") for k, i in enumerate(b['items'], 1)] if len(b['items']) > 1 else [R(fmt(b['items'][0]))]
                story.append(KeepTogether(head + its)); story.append(Spacer(1, 4))
                if b.get('write'): story.append(lines(b['write']))
                sols.append((b.get('sol_title', title), b.get('solutions', [])))
    if sols:
        story += [PageBreak(), P(d.get('solutions_title', 'Lösungen'), 'h2t')]
        if d.get('solutions_intro'): story.append(R(fmt(d['solutions_intro'])))
        for title, s in sols:
            if not s: continue
            block = [P(title, 'h3')]
            br = lambda x: fmt(x).replace('&lt;br/&gt;', '<br/>')
            block += [R(f"{k}. {br(x)}") for k, x in enumerate(s, 1)] if len(s) > 1 else [R(br(s[0]))]
            story.append(KeepTogether(block) if sum(len(x) for x in s) < 900 else block[0])
            if sum(len(x) for x in s) >= 900: story += block[1:]
    story += [Spacer(1, 10), box(P(d.get('outro', 'Übe regelmäßig – lieber jeden Tag 20 Minuten als einmal pro Woche drei Stunden. – Dennis'), 'hand'), NOTE)]
    return story

if __name__ == '__main__':
    out = os.path.join(S, 'pakete-out'); os.makedirs(out, exist_ok=True)
    only = os.environ.get('ONLY')
    from pypdf import PdfReader
    for f in sorted(glob.glob(os.path.join(S, 'pakete', '*.json'))):
        if os.path.basename(f).startswith('_') or (only and only not in f): continue
        d = json.load(open(f, encoding='utf-8'))
        path = os.path.join(out, d['id'] + '.pdf')
        build(path, d['title'], render(d))
        print('ok', d['id'], len(PdfReader(path).pages), 'S.', os.path.getsize(path) // 1024, 'KB')
