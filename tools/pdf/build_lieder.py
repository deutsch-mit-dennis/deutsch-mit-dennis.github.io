# PDF zu einem Lied: Liedtext, Wortschatz, 4 Aufgaben, Lösungen, QR-Code zur Liedseite.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/build_lieder.py tools/lieder-neu-1.json [weitere.json …]
# Ausgabe: material/lieder/<id>.pdf (mit Wasserzeichen „created by D.Prudnikau“)
import io, json, os, random, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arbeitsblatt_lib import *  # noqa
from arbeitsblatt_lib import REPO, MARK, SITE, TINTE, MUTED, LINE, _overlay, st as ST
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Table, TableStyle, Paragraph
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor

SECT = {'Verse 1': 'Strophe 1', 'Verse 2': 'Strophe 2', 'Verse 3': 'Strophe 3', 'Chorus': 'Refrain', 'Bridge': 'Bridge', 'Outro': 'Schluss', 'Intro': 'Intro'}
lyr = ParagraphStyle('lyr', fontName='Atk', fontSize=9.6, leading=12.4, textColor=HexColor('#172036'))
lyh = ParagraphStyle('lyh', fontName='Atk-B', fontSize=9.6, leading=13, textColor=TINTE, spaceBefore=5)
x = lambda s: s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def qr(url, size=26 * mm):
    w = QrCodeWidget(url); b = w.getBounds(); bw, bh = b[2] - b[0], b[3] - b[1]
    d = Drawing(size, size, transform=[size / bw, 0, 0, size / bh, 0, 0]); d.add(w); return d


def lyrics_cols(text):
    blocks, cur = [], None
    for line in text.split('\n'):
        line = line.strip()
        if line.startswith('[') and line.endswith(']'):
            cur = [SECT.get(line[1:-1], line[1:-1]), []]; blocks.append(cur)
        elif line and cur: cur[1].append(line)
    flows = [[Paragraph(h, lyh), Paragraph('<br/>'.join(x(l) for l in ls), lyr)] for h, ls in blocks]
    total = sum(len(b[1]) + 1.5 for b in blocks); acc, left, right = 0, [], []
    for f, b in zip(flows, blocks):
        (left if acc < total / 2 else right).extend(f); acc += len(b[1]) + 1.5
    t = Table([[left, right]], colWidths=[87 * mm, 87 * mm])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0)]))
    return t


def song_pdf(s):
    title, level = s['title'], s['level']
    url = f'https://{SITE}/#lieder/{s["id"]}'
    rnd = random.Random(s['id'])
    voc = s['vocab'][:8]
    letters = 'abcdefgh'[:len(voc)]
    order = list(range(len(voc))); rnd.shuffle(order)
    story = []
    head = [R(f'Deutsch mit Liedern · Niveau {level}', 'kick'), R(x(title), 'h1'),
            R(f'<b>Thema:</b> {x(s["theme"])}', 'small'), R(f'<b>Grammatik:</b> {x(s["grammar"])}', 'small')]
    ht = Table([[head, [qr(url), R('Lied anhören', 'small')]]], colWidths=[142 * mm, 32 * mm])
    ht.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0)]))
    story += [ht, Spacer(1, 4), box(R(x(s['intro']))), Spacer(1, 6), R('Der Liedtext', 'h2'), lyrics_cols(s['lyrics']), PageBreak()]

    story += [R('Wichtige Wörter', 'h2'), table([['<b>Wort</b>', '<b>Bedeutung / Beispiel</b>']] + [[x(w), x(m)] for w, m in s['vocab']], [62, 112])]
    story += [R('Aufgaben', 'h2'), R('Aufgabe 1: Wortschatz zuordnen', 'h3'), R('Ordne jedem Wort die passende Erklärung zu.', 'small')]
    rows = [[x(f'{i + 1}. {voc[i][0]}'), x(f'{letters[k]}) {voc[order[k]][1]}')] for i, k in zip(range(len(voc)), range(len(voc)))]
    story += [table(rows, [62, 112], head=False), R('Lösung: ' + ' · '.join(f'{i + 1} __' for i in range(len(voc))), 'small')]
    story += [R('Aufgabe 2: Lückentext', 'h3'), R('Hör das Lied und ergänze die fehlenden Wörter.', 'small')]
    story += [R(f'{i + 1}. {x(it).replace("___", GAP)}', 'item') for i, it in enumerate(s['gap']['items'])]
    story += [KeepTogether([R('Aufgabe 3: Richtig oder falsch?', 'h3'), R('Lies die Aussagen. Sind sie richtig oder falsch? Korrigiere die falschen Aussagen.', 'small'), table([[x(f'{i + 1}. {t[0]}'), '<font name="Sym">☐</font> richtig  <font name="Sym">☐</font> falsch'] for i, t in enumerate(s['tf'])], [130, 44], head=False)])]
    g = s['gram']
    story += [R(f'Aufgabe 4: {x(g["title"])}', 'h3'), R(x(g['instruction']), 'small')]
    story += [R(f'{i + 1}. {x(it).replace("___", GAP)}', 'item') for i, it in enumerate(g['items'])]
    story += [lines(2), PageBreak()]

    pos = {order[k]: letters[k] for k in range(len(voc))}
    story += [R('Lösungen', 'h2'), R('Aufgabe 1: Wortschatz zuordnen', 'h3'), R(' · '.join(f'{i + 1} – {pos[i]})' for i in range(len(voc))), 'p')]
    story += [R('Aufgabe 2: Lückentext', 'h3'), R(' · '.join(f'{i + 1}. {x(w)}' for i, w in enumerate(s['gap']['solutions'])), 'p')]
    story += [R('Aufgabe 3: Richtig oder falsch?', 'h3')] + [R(f'{i + 1}. {"richtig" if t[1] else "falsch – " + x(t[2])}', 'item') for i, t in enumerate(s['tf'])]
    story += [R(f'Aufgabe 4: {x(g["title"])}', 'h3')] + [R(f'{i + 1}. {x(a)}', 'item') for i, a in enumerate(g['solutions'])]
    story += [Spacer(1, 10), R(f'© Dzianis Prudnikau · Deutsch mit Dennis · {SITE} · Liedtext: Dzianis Prudnikau, Musik erstellt mit Suno. Kostenlos zum Lernen und für den eigenen Unterricht. Veröffentlichung oder Verkauf nur mit Zustimmung.', 'small')]

    path = os.path.join(REPO, 'material', 'lieder', s['id'] + '.pdf'); tmp = path + '.raw.pdf'
    page_title = f'{title} – Deutsch mit Liedern'
    doc = BaseDocTemplate(tmp, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=20 * mm, bottomMargin=19 * mm, title=page_title, author='Dzianis Prudnikau', subject=MARK)
    from arbeitsblatt_lib import _page
    doc.addPageTemplates([PageTemplate(id='p', frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')], onPage=lambda c, d: _page(c, d, page_title, level))])
    doc.build(story)
    r = PdfReader(tmp); w = PdfWriter()
    for p in r.pages:
        p.merge_page(_overlay(float(p.mediabox.width), float(p.mediabox.height))); w.add_page(p)
    for p in w.pages: p.compress_content_streams()
    w.add_metadata({'/Title': page_title, '/Author': 'Dzianis Prudnikau', '/Creator': 'Deutsch mit Dennis', '/Subject': MARK})
    with open(path, 'wb') as f: w.write(f)
    os.remove(tmp)
    print(path, len(r.pages), 'Seiten')


if __name__ == '__main__':
    for fn in sys.argv[1:]:
        for s in json.load(open(fn, encoding='utf-8')): song_pdf(s)
