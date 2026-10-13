# Arbeitsblatt B1 Grammatik: Nebensätze mit weil, dass, wenn, obwohl
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/nebensaetze-mit-weil-dass-wenn-obwohl.py
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle

SLUG = 'nebensaetze-mit-weil-dass-wenn-obwohl'
TITLE = 'Nebensätze mit weil, dass, wenn, obwohl'
LEVEL = 'B1'
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'   # Verb am Ende markieren
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'   # Konnektor markieren

s = [R('B1 · Grammatik · Arbeitsblatt', 'kick'), R(TITLE, 'h1'),
     R('Gründe nennen, Meinungen sagen, Bedingungen und Gegensätze ausdrücken – mit Sätzen aus Arbeit, Amt und Alltag.', 'lead')]

s += [R('Die Regel', 'h2'),
      box(R(f'<b>Im Nebensatz steht das konjugierte Verb am Ende.</b><br/>'
            f'Hauptsatz: Ich komme heute später. Mein Bus {V("hat")} Verspätung.<br/>'
            f'Mit Nebensatz: Ich komme heute später, {K("weil")} mein Bus Verspätung {V("hat")}.<br/>'
            f'Vor dem Nebensatz steht immer ein <b>Komma</b>.'), NOTE, GELB), Spacer(1, 6)]

s += [table([
    ['<b>Konnektor</b>', '<b>Wofür?</b>', '<b>Beispiel</b>'],
    [K('weil'), 'Grund – <i>Warum?</i>', f'Ich bleibe zu Hause, {K("weil")} mein Sohn Fieber {V("hat")}.'],
    [K('dass'), 'Inhalt – nach sagen, denken, hoffen, wissen, finden …', f'Ich hoffe, {K("dass")} ich die Prüfung {V("bestehe")}.'],
    [K('wenn'), 'Bedingung oder Zeit – <i>Unter welcher Bedingung? Wann?</i>', f'{K("Wenn")} der Bus nicht {V("kommt")}, gehe ich zu Fuß.'],
    [K('obwohl'), 'Gegensatz – etwas passiert trotzdem', f'Ich fahre mit dem Rad, {K("obwohl")} es {V("regnet")}.'],
], [26, 58, 90])]

s += [R('Zwei Verben im Nebensatz', 'h3'),
      table([
          ['<b>Modalverb</b>', f'Ich kann nicht kommen, {K("weil")} ich arbeiten {V("muss")}.'],
          ['<b>Perfekt</b>', f'Sie ist traurig, {K("weil")} sie den Termin vergessen {V("hat")}.'],
          ['<b>Trennbares Verb</b>', f'Ich weiß, {K("dass")} der Kurs um 9 Uhr {V("anfängt")}. <font color="#566078">(wieder zusammen!)</font>'],
      ], [40, 134], head=False),
      R('Das konjugierte Verb (muss, hat, kann …) steht ganz am Ende – das Verb im Infinitiv oder Partizip direkt davor.', 'small')]

s += [R('Der Nebensatz steht vorne', 'h3'),
      R(f'Dann beginnt der Hauptsatz mit dem Verb: Verb, Komma, Verb.<br/>'
        f'{K("Wenn")} ich Zeit {V("habe")}, {V("lerne")} ich Deutsch.   ·   {K("Obwohl")} ich müde {V("bin")}, {V("gehe")} ich zum Kurs.'),
      R('Achtung, typischer Fehler', 'h3'),
      R(f'<font color="#C2362B"><strike>…, weil ich habe keine Zeit.</strike></font>   {ARROW}   <b>…, weil ich keine Zeit habe.</b>'),
      R('Im Gespräch hört man das manchmal. In der Prüfung (Schreiben und Sprechen) gilt: Verb ans Ende!', 'small')]

# Übung 1
s += task(1, 'Welcher Konnektor passt?', 'Setze weil, dass, wenn oder obwohl ein. Am Satzanfang groß schreiben.', 1)
u1 = ['Ich kann heute nicht zum Kurs kommen, {} mein Sohn Fieber hat.',
      'Der Vermieter sagt, {} der Techniker morgen um 10 Uhr kommt.',
      '{} Sie den Termin absagen möchten, rufen Sie bitte bis Freitag an.',
      'Sie geht zur Arbeit, {} sie Kopfschmerzen hat.',
      'Ich glaube, {} das Bürgeramt heute Nachmittag geschlossen ist.',
      'Wir suchen eine neue Wohnung, {} unsere Wohnung zu klein ist.',
      '{} er schon fünf Jahre in Deutschland lebt, spricht er noch wenig Deutsch.']
s += [R(f'{i}. ' + t.format(GAP), 'item') for i, t in enumerate(u1, 1)]

# Übung 2
s += task(2, 'Verbinde die Sätze', 'Schreib einen Satz mit dem Konnektor in Klammern. Das Verb kommt ans Ende.', 2)
s += [box(R(f'<b>Beispiel:</b> Ich gehe zum Arzt. Mein Rücken tut weh. (weil)<br/>{ARROW} Ich gehe zum Arzt, weil mein Rücken {V("wehtut")}.', 'cell'), HELLGRUEN, GRUEN)]
u2 = ['Meine Chefin sagt: Ich kann am Freitag früher gehen. (dass)',
      'Ich stehe um 7 Uhr auf. Der Kurs fängt um 9 Uhr an. (weil)',
      'Ich bin sehr müde. Ich habe in der Nacht schlecht geschlafen. (weil)',
      'Er kauft eine Monatskarte. Sie ist ziemlich teuer. (obwohl)']
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f'{i}. {t}', 'item'), lines(1)])]


# Übung 3
s += task(3, 'Den Nebensatz nach vorne stellen', 'Beginne mit dem Konnektor. Achtung: Im Hauptsatz kommt das Verb direkt nach dem Komma.', 2)
s += [box(R(f'<b>Beispiel:</b> Ich bleibe zu Hause, wenn ich krank bin.<br/>{ARROW} Wenn ich krank {V("bin")}, {V("bleibe")} ich zu Hause.', 'cell'), HELLGRUEN, GRUEN)]
u3 = ['Ich gehe einkaufen, wenn ich Feierabend habe.',
      'Sie trinkt noch einen Kaffee, obwohl es schon spät ist.',
      'Du musst den Antrag unterschreiben, wenn du Kindergeld bekommen willst.']
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f'{i}. {t}', 'item'), lines(1)])]

# Übung 4
s += task(4, 'Richtig oder falsch?', 'Kreuze an. Korrigiere die falschen Sätze direkt im Satz oder auf einem Blatt.', 3)
u4 = ['Ich komme später, weil ich muss mein Kind abholen.',
      'Wenn es regnet, nehme ich den Bus.',
      'Ich denke, dass er hat recht.',
      'Obwohl ich müde bin, ich gehe ins Fitnessstudio.',
      'Sie freut sich, dass ihre Schwester sie am Wochenende besucht.',
      'Er sagt, dass der Zug um 8 Uhr fährt ab.']
box_rf = sym('☐')
for i, t in enumerate(u4, 1):
    s += [R(f'{i}. {t}   <font color="#566078">{box_rf} richtig  {box_rf} falsch</font>', 'item')]

# Übung 5
s += task(5, 'Über dich schreiben', 'Ergänze die Sätze mit deinen eigenen Ideen. Lies sie danach laut vor.', 3)
u5 = ['Ich lerne Deutsch, weil …', 'Ich finde es gut, dass …', 'Wenn ich am Wochenende Zeit habe, …',
      'Obwohl Deutsch manchmal schwer ist, …']
t5 = Table([[R(f'{chr(96 + i)}) {t}', 'cell'), ''] for i, t in enumerate(u5, 1)], colWidths=[78 * mm, 96 * mm], rowHeights=[8 * mm] * len(u5))
t5.setStyle(TableStyle([('LINEBELOW', (1, 0), (1, -1), 0.5, LINE), ('VALIGN', (0, 0), (-1, -1), 'BOTTOM'), ('LEFTPADDING', (0, 0), (0, -1), 0)]))
s += [t5]

s += [PageBreak()]

# Lösungen
s += [R('Lösungen', 'h1'), R('Zum Selbstkontrollieren – erst üben, dann nachschauen!', 'lead')]
s += [R('Übung 1', 'h3'),
      R('1. weil  ·  2. dass  ·  3. Wenn  ·  4. obwohl  ·  5. dass  ·  6. weil  ·  7. Obwohl')]
l2 = [f'Meine Chefin sagt, dass ich am Freitag früher gehen {V("kann")}.',
      f'Ich stehe um 7 Uhr auf, weil der Kurs um 9 Uhr {V("anfängt")}.',
      f'Ich bin sehr müde, weil ich in der Nacht schlecht geschlafen {V("habe")}.',
      f'Er kauft eine Monatskarte, obwohl sie ziemlich teuer {V("ist")}.']
s += [R('Übung 2', 'h3')] + [R(f'{i}. {t}', 'item') for i, t in enumerate(l2, 1)]
l3 = [f'Wenn ich Feierabend {V("habe")}, {V("gehe")} ich einkaufen.',
      f'Obwohl es schon spät {V("ist")}, {V("trinkt")} sie noch einen Kaffee.',
      f'Wenn du Kindergeld bekommen {V("willst")}, {V("musst")} du den Antrag unterschreiben.']
s += [R('Übung 3', 'h3')] + [R(f'{i}. {t}', 'item') for i, t in enumerate(l3, 1)]
l4 = [f'falsch {ARROW} Ich komme später, weil ich mein Kind abholen {V("muss")}.',
      'richtig',
      f'falsch {ARROW} Ich denke, dass er recht {V("hat")}.',
      f'falsch {ARROW} Obwohl ich müde bin, {V("gehe")} ich ins Fitnessstudio.',
      'richtig',
      f'falsch {ARROW} Er sagt, dass der Zug um 8 Uhr {V("abfährt")}.']
s += [R('Übung 4', 'h3')] + [R(f'{i}. {t}', 'item') for i, t in enumerate(l4, 1)]
l5 = ['Ich lerne Deutsch, weil ich in Deutschland als Pflegekraft arbeiten möchte.',
      'Ich finde es gut, dass es in meiner Stadt viele Sprachcafés gibt.',
      'Wenn ich am Wochenende Zeit habe, gehe ich mit meinen Kindern in den Park.',
      'Obwohl Deutsch manchmal schwer ist, macht mir der Kurs Spaß.',
      ]
s += [R('Übung 5 – Beispiele', 'h3')] + [R(f'{chr(96 + i)}) {t}', 'item') for i, t in enumerate(l5, 1)]
s += [R('Deine Sätze sind anders? Kein Problem – prüfe: Steht das Verb im Nebensatz am Ende?', 'small'),
      Spacer(1, 10), box(R('Tipp: Erzähl heute Abend drei Dinge von deinem Tag – jedes Mal mit weil, dass, wenn oder obwohl. – Dennis', 'hand'), NOTE)]

if __name__ == '__main__':
    build(SLUG, TITLE, LEVEL, s)
