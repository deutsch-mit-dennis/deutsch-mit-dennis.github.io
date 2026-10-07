import json, os, glob
exec(open('build_pakete.py').read().split("if __name__ == '__main__':")[0])
from pypdf import PdfReader, PdfWriter
lessons = [json.load(open(f)) for f in sorted(glob.glob('stunden/*.json'))]
KIDS = json.load(open('kahoot-ids.json')); KQ = json.load(open('kahoots.json'))
import qrcode
def kahoot_box(n):
    uid = KIDS[n - 1]; url = f'https://create.kahoot.it/details/{uid}'
    qp = os.path.join(S, 'pakete-out', '_img', f'kahoot-{n:02d}.png'); os.makedirs(os.path.dirname(qp), exist_ok=True)
    qrcode.make(url).save(qp)
    txt = R(f"<b>Kahoot zur Stunde:</b> {fmt(KQ[n-1]['title'])}<br/>9 Fragen zur Wiederholung – ideal für die letzten 10 Minuten oder als Einstieg in der nächsten Stunde.<br/>"
            f"<font size=9>Link: <link href='{url}' color='#2341B5'>{url}</link></font>", 'cell')
    t = Table([[RLImage(qp, width=22 * mm, height=22 * mm), txt]], colWidths=[30 * mm, W - 30 * mm])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('BACKGROUND', (0, 0), (-1, -1), HexColor('#F3EEFC')), ('LEFTPADDING', (0, 0), (-1, -1), 8), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
    return t
TEACHER_LIC = ('© Dzianis Prudnikau · Deutsch mit Dennis · deutsch-mit-dennis.de<br/>'
               '<b>Nutzungsrecht:</b> Sie dürfen die Kopiervorlagen für Ihren eigenen Unterricht (eine Lehrkraft) beliebig oft kopieren und '
               'digital an Ihre Kursteilnehmenden weitergeben. Weiterverkauf, Veröffentlichung im Internet oder Weitergabe an andere '
               'Lehrkräfte sind nicht erlaubt. Unabhängiges Unterrichtsmaterial: keine Verbindung zu g.a.s.t., telc oder BAMF, keine '
               'offiziellen Prüfungsaufgaben.')
SF = {'exercise': 'EA/PA', 'dialog': 'PA', 'table': 'Plenum', 'rule': 'Plenum'}
st['cellsm'] = ParagraphStyle('cellsm', parent=st['cell'], fontSize=9, leading=11.5)
def plan_table(rows):
    data = [[R('<b>%s</b>' % h, 'cellsm') for h in ('Phase', 'Zeit', 'Inhalt', 'Sozialform')]] + [[R(fmt(c), 'cellsm') for c in r] for r in rows]
    t = Table(data, colWidths=[22 * mm, 18 * mm, 110 * mm, 24 * mm], repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), SOFT), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINE),
                           ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3)]))
    return t

def plan(d, n):
    topics = d['topics']; total = 15 + sum(10 + 10 * min(3, sum(1 for b in t['blocks'] if b['type'] == 'exercise')) for t in topics) + 10
    rows = [['Einstieg', '10 Min.', 'Begrüßung, Wiederholung der letzten Stunde, Ziel der Stunde an die Tafel', 'Plenum'],
            ['', '5 Min.', 'Wortschatz/Vorwissen sammeln (Mindmap)', 'Plenum']]
    for i, t in enumerate(topics, 1):
        ex = [b for b in t['blocks'] if b['type'] == 'exercise']; dl = [b for b in t['blocks'] if b['type'] == 'dialog']
        rows.append([f'Thema {i}', '10 Min.', f"Erarbeitung: {t['title']} – Regel/Tabelle gemeinsam entwickeln, Beispiele an die Tafel", 'Plenum'])
        for b in ex[:3]:
            rows.append(['', '10 Min.', f"{b['title']} – zuerst allein, dann mit dem Partner vergleichen, Kontrolle im Plenum", 'EA → PA'])
        if dl: rows.append(['', '(+5 Min.)', f"{dl[0].get('title') or 'Dialog'} – mit verteilten Rollen lesen und variieren", 'PA'])
    rows.append(['Abschluss', '10 Min.', 'Kahoot-Quiz zur Stunde (9 Fragen, siehe unten), danach Blitzlicht: Was habe ich heute gelernt? Hausaufgabe: eine Übung ohne Hilfe wiederholen', 'Plenum'])
    story = [P(f"Stunde {n} · {d['level']} · Lehrerblatt", 'kick'), P(d['title'], 'h1'),
             box(R('<b>Lernziele</b><br/>' + '<br/>'.join('• ' + fmt(t.get('goal') or t['title']) for t in topics)), SOFT), Spacer(1, 8),
             P(f'Ablauf (ca. {total} Minuten – nach Bedarf kürzen oder auf zwei Termine verteilen)', 'h3'), plan_table(rows), Spacer(1, 8),
             box(R('<b>Material:</b> Arbeitsblatt der Stunde (folgende Seiten) als Kopie für alle Teilnehmenden; Lösungen am Ende des Arbeitsblatts. '
                   '<b>Differenzierung:</b> Schnelle TN schreiben eigene Beispielsätze zu jeder Regel; langsamere TN bearbeiten nur die ersten Aufgaben jeder Übung. '
                   '<b>Mehrsprachigkeit:</b> TN dürfen Regeln in der Erstsprache notieren, sprechen im Kurs aber Deutsch.'), NOTE, HexColor('#E8A800')), Spacer(1, 5), kahoot_box(n)]
    return story
out = os.path.join(S, 'pakete-out'); tmpd = os.path.join(out, '_lehrer'); os.makedirs(tmpd, exist_ok=True)
cover = [Spacer(1, 12 * mm), P('Lernpaket · für Lehrkräfte', 'coverkick'), P('Lehrerpaket: 16 fertige Unterrichtsstunden A1–A2', 'cover'), P('Niveau A1–B1 · Integrationskurs und DaZ', 'h3'), Spacer(1, 4),
         P('16 erprobte Unterrichtsstunden aus dem Integrationskurs. Zu jeder Stunde: ein Lehrerblatt mit Lernzielen, Ablauf mit Zeiten und Sozialformen, ein eigenes Kahoot-Quiz mit 9 Fragen (Link und QR-Code) – und das fertige Arbeitsblatt mit Regeln, Übungen und Lösungen als Kopiervorlage.', 'lead'),
         box(R('<b>Inhalt</b><br/>' + '<br/>'.join(f"{i}. {fmt(d['title'])} ({d['level']})" for i, d in enumerate(lessons, 1))), SOFT), Spacer(1, 10),
         R(TEACHER_LIC, 'lic')]
build(os.path.join(tmpd, '00-cover.pdf'), 'Lehrerpaket: 16 Unterrichtsstunden', cover)
w = PdfWriter(); w.append(os.path.join(tmpd, '00-cover.pdf'))
for n, d in enumerate(lessons, 1):
    pth = os.path.join(tmpd, f'{n:02d}-plan.pdf'); build(pth, f'Lehrerblatt Stunde {n}', plan(d, n)); w.append(pth)
    lp = os.path.join(tmpd, f"{n:02d}-stunde.pdf"); build(lp, d['title'], g['render'](d)); w.append(lp)
w.add_metadata({'/Title': 'Lehrerpaket: 16 Unterrichtsstunden', '/Author': 'Dzianis Prudnikau'})
dst = os.path.join(out, 'lehrerpaket-16-stunden.pdf'); w.write(dst)
print('ok', len(PdfReader(dst).pages), 'S.', os.path.getsize(dst) // 1024, 'KB')
