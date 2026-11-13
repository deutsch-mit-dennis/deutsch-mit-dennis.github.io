# Arbeitsblatt A2–B1 Prüfung: DTZ Lesen Teil 4 – Informationsbroschüre (im Stil der Prüfung, eigene Inhalte)
# Format laut sim/dtz.js, sim/dtz-2.js (Lesen Teil 4: Broschüre, 3 Aussagen richtig/falsch, 1 Punkt je Aufgabe)
# und pruefung-fakten.js (Lesen 45 Min., 5 Teile, 25 Aufgaben; Hören + Lesen 45 Punkte, B1 ab 33).
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-lesen-teil-4.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtz-lesen-teil-4"
TITLE = "DTZ Lesen Teil 4: Informationsbroschüre verstehen"
LEVEL = "A2–B1"
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.2, spaceAfter=3)
st["bh"] = ParagraphStyle("bh", parent=st["cell"], fontName="Atk-B", fontSize=10.2, leading=13, textColor=TINTE, spaceBefore=3)
CB = sym("☐")


def grid(rows, widths, pad=3, head=False):
    t = Table(rows, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def brochure(title, sections):
    """Broschürentext mit Zwischenüberschriften (wie in der Prüfung)."""
    flow = [R(f'<font size="12"><b>{title}</b></font>', "cell"), Spacer(1, 3)]
    for h, txt in sections:
        flow += [R(h, "bh"), R(txt, "txt")]
    t = Table([[flow]], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), NOTE), ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
    return t


def rf(items, start=1):
    """Aussagen mit Ankreuzfeldern richtig / falsch."""
    rows = [[R("<b>Aussage</b>", "cell"), R("<b>richtig</b>", "cell"), R("<b>falsch</b>", "cell")]]
    for i, (q, _) in enumerate(items, start):
        rows.append([R(f"<b>{i}</b>  {q}", "cell"), R(CB, "cell"), R(CB, "cell")])
    return grid(rows, [142, 16, 16], 4, head=True)


INSTR = "Lesen Sie den Text aus einer Broschüre. Sind die Aussagen richtig oder falsch?"

s = [
    R("A2–B1 · Prüfung DTZ · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R("In Teil 4 liest du einen Text aus einer Broschüre – zum Beispiel von der Stadt, der Bibliothek oder einem "
      "Verein. Dann entscheidest du: Ist die Aussage richtig oder falsch? Hier lernst du, wie du die Antwort im Text "
      "sicher findest.", "lead"),
    box([
        R("<b>So läuft der Teil</b>", "cell"),
        Spacer(1, 3),
        grid([
            [R("<b>Text</b>", "cell"), R("Ein Informationstext aus einer Broschüre, meist mit Zwischenüberschriften "
                                        "(oft als Fragen: <i>Was kostet …? Wer kann …?</i>).", "cell")],
            [R("<b>Aufgaben</b>", "cell"), R("3 Aussagen. Du kreuzt an: <b>richtig</b> oder <b>falsch</b>.", "cell")],
            [R("<b>Anweisung</b>", "cell"), R(f"„{INSTR}“", "cell")],
            [R("<b>Punkte</b>", "cell"), R("1 Punkt pro Aufgabe. Hören und Lesen zählen zusammen: 45 Punkte. "
                                         "B1 ab 33 Punkten, A2 ab 20 Punkten.", "cell")],
            [R("<b>Zeit</b>", "cell"), R("Für Lesen hast du 45 Minuten – für alle 5 Teile (25 Aufgaben). Teil 4 hat keine "
                                       "eigene Zeit. <i>Unser Vorschlag:</i> ca. 7–8 Minuten.", "cell")],
        ], [26, 144], 3),
        R("Stand der Prüfungsdaten: 11.11.2026 · Quelle: g.a.s.t. (Anbieter des DTZ)", "small"),
    ], SOFT),
    Spacer(1, 6),
    box([
        R("<b>Strategie in 5 Schritten</b>", "cell"),
        R("1. Lies <b>zuerst die drei Aussagen</b>. Unterstreiche in jeder Aussage das Schlüsselwort "
          "(z. B. <i>17 Jahre</i>, <i>online</i>, <i>Termin</i>).", "cell"),
        R("2. Nutze die <b>Zwischenüberschriften</b> wie einen Wegweiser: Sie zeigen dir, in welchem Abschnitt die "
          "Antwort steht. Den Rest liest du nur schnell.", "cell"),
        R(f"3. Die Aussage benutzt oft <b>andere Wörter</b> als der Text: kostenlos {ARROW} man muss nichts bezahlen · "
          f"nicht gestattet {ARROW} verboten.", "cell"),
        R("4. Lies die passende Stelle dann <b>Wort für Wort</b>. Kleine Wörter entscheiden: "
          "<i>nur, nicht, auch, außer, aber, wenn, bis, ab</i>.", "cell"),
        R("5. <b>Nur der Text zählt</b> – nicht dein eigenes Wissen und nicht die Regeln in deiner Stadt. "
          "Lass keine Aufgabe leer.", "cell"),
    ], HELLGRUEN, GRUEN),
]

# Übung 2 – gleiche Bedeutung
u2 = [("gebührenfrei", "d"), ("die Leihfrist verlängern", "g"), ("nur nach Vereinbarung", "a"), ("ist nicht gestattet", "h"),
      ("ermäßigt", "b"), ("rechtzeitig", "f"), ("Erziehungsberechtigte", "c"), ("barrierefrei", "e")]
d2 = ["nicht ohne Termin", "billiger", "Eltern oder andere Personen, die für ein Kind verantwortlich sind",
      "man muss nichts bezahlen", "auch mit Rollstuhl oder Kinderwagen gut erreichbar", "nicht zu spät",
      "etwas länger behalten dürfen", "ist verboten"]
s += [KeepTogether(task(1, "Gleiche Bedeutung finden",
                        "Diese Wörter stehen oft in Broschüren. In den Aussagen stehen dann einfachere Wörter. Ordne zu.", 1)
                   + [grid([[R(f"{i}. {a}", "cell"), R("____", "cell"), R(f"{chr(97 + i - 1)}) {d2[i - 1]}", "cell")]
                            for i, (a, _) in enumerate(u2, 1)], [52, 14, 108], 3)])]

# Typische Fallen
fallen = [
    ("Zahlen und Alter", "„Kostenlos für Kinder bis 12 Jahre.“", "Ein Kind mit 14 Jahren muss nichts bezahlen.", "falsch"),
    ("nur / auch", "„Die Anmeldung ist nur online möglich.“", "Man kann sich auch am Telefon anmelden.", "falsch"),
    ("Ausnahmen", "„Täglich geöffnet, außer an Feiertagen.“", "Am Ostermontag ist geöffnet.", "falsch"),
    ("Bedingungen", "„Sie zahlen weniger, wenn Sie Ihren Bescheid zeigen.“", "Alle zahlen weniger.", "falsch"),
    ("können / müssen", "„Sie können einen Termin vereinbaren.“", "Man muss einen Termin haben.", "falsch"),
    ("gleiches Wort, andere Info", "„Die gelbe Tonne wird montags geleert, die blaue freitags.“",
     "Die blaue Tonne wird am Montag geleert.", "falsch"),
    ("andere Wörter, gleiche Info", "„Die Beratung kostet nichts.“", "Man muss für die Beratung nicht bezahlen.", "richtig"),
]
s += [KeepTogether([
    R("Typische Fallen", "h2"),
    R("Achtung: Nicht jede Aussage mit anderen Wörtern ist falsch – die letzte Zeile ist richtig!", "small"),
    grid([[R("<b>Falle</b>", "cell"), R("<b>Im Text</b>", "cell"), R("<b>Aussage</b>", "cell"), R("<b>Lösung</b>", "cell")]]
         + [[R(f"<b>{a}</b>", "cell"), R(f"<i>{b}</i>", "cell"), R(c, "cell"),
             R(f'<font color="{"#1D7A45" if d == "richtig" else "#C2362B"}"><b>{d}</b></font>', "cell")]
            for a, b, c, d in fallen], [34, 64, 56, 20], 3.5, head=True),
])]

# Übung 1 – kleine Wörter
u1 = [
    ("„Die Sprechstunde ist dienstags und donnerstags von 9 bis 12 Uhr.“",
     "Am Donnerstagnachmittag gibt es eine Sprechstunde.", "f"),
    ("„Bitte bringen Sie Ihre Versichertenkarte mit. Einen Ausweis brauchen Sie nicht.“",
     "Man muss keinen Ausweis mitbringen.", "r"),
    ("„Schüler, Studierende, Rentnerinnen und Rentner zahlen die Hälfte.“",
     "Eine Rentnerin bekommt einen günstigeren Preis.", "r"),
    ("„Der Kurs findet nur statt, wenn sich mindestens acht Personen anmelden.“",
     "Der Kurs findet auf jeden Fall statt.", "f"),
    ("„Haustiere sind erlaubt. Hunde müssen im Garten aber an der Leine sein.“",
     "Im Garten dürfen Hunde frei laufen.", "f"),
    ("„Das Formular können Sie online ausfüllen oder bei uns im Büro abholen.“",
     "Man bekommt das Formular auch im Büro.", "r"),
]
rows = [[R("<b>Im Text</b>", "cell"), R("<b>Aussage</b>", "cell"), R("<b>r</b>", "cell"), R("<b>f</b>", "cell")]]
for i, (t, a, _) in enumerate(u1, 1):
    rows.append([R(f"<b>{i}</b>  <i>{t}</i>", "cell"), R(a, "cell"), R(CB, "cell"), R(CB, "cell")])
s += [KeepTogether(task(2, "Kleine Wörter genau lesen",
                        "Lies den Satz aus einer Broschüre und die Aussage. Ist die Aussage richtig (r) oder falsch (f)? "
                        "Unterstreiche das Wort, das entscheidet.", 1)
                   + [grid(rows, [86, 64, 12, 12], 4, head=True)])]

# Übung 3–5 – Prüfungstraining
b1 = ("Familienzentrum Lindenfeld – Unsere Angebote für Eltern", [
    ("Für wen sind unsere Angebote?",
     "Unsere Angebote sind für alle Familien im Stadtteil Lindenfeld mit Kindern bis zehn Jahre. Auch Großeltern sind "
     "herzlich willkommen. Sie müssen kein Mitglied werden."),
    ("Was bieten wir an?",
     "Jeden Montag und Mittwoch von 9 bis 11 Uhr gibt es unser Elterncafé. Hier lernen Sie andere Eltern kennen, während "
     "Ihre Kinder spielen. Am Dienstagnachmittag berät Sie eine Mitarbeiterin der Erziehungsberatung. Für diese Beratung "
     "brauchen Sie einen Termin. Außerdem helfen wir Ihnen bei der Suche nach einem Kita-Platz."),
    ("Was kostet das?",
     "Das Elterncafé und die Beratung sind kostenlos. Für unsere Kurse, zum Beispiel „Erste Hilfe am Kind“, zahlen Sie "
     "eine kleine Gebühr. Familien mit dem Lindenfeld-Pass zahlen nur die Hälfte."),
    ("Wie finden Sie uns?",
     "Sie finden uns in der Gartenstraße 14, direkt neben der Grundschule. Das Haus ist barrierefrei. Parkplätze gibt es "
     "leider nicht – bitte kommen Sie mit dem Bus (Linie 5, Haltestelle Gartenstraße)."),
])
q1 = [("Zur Beratung am Dienstag kann man ohne Termin kommen.", "f"),
      ("Die Kurse sind für alle Familien kostenlos.", "f"),
      ("Man kommt auch mit einem Rollstuhl gut ins Haus.", "r")]

b2 = ("Stadtwerke Lindenfeld – Umzug? So melden Sie Strom und Wasser richtig um", [
    ("Wann und wie melde ich meinen Umzug?",
     "Bitte informieren Sie uns spätestens eine Woche vor Ihrem Umzug. Das geht über unser Online-Formular oder in "
     "unserem Kundenzentrum am Bahnhofsplatz 3. Am Telefon können wir Umzüge leider nicht bearbeiten."),
    ("Was muss ich am Umzugstag tun?",
     "Schreiben Sie am Tag des Auszugs die Zählerstände von Strom und Wasser in der alten Wohnung auf. Am besten machen "
     "Sie auch ein Foto von jedem Zähler. In der neuen Wohnung machen Sie das Gleiche am Tag des Einzugs."),
    ("Und wenn ich in eine andere Stadt ziehe?",
     "Dann endet Ihr Vertrag am Tag des Auszugs. Ihre Schlussrechnung bekommen Sie etwa sechs Wochen später per Post. "
     "Wenn Sie zu viel bezahlt haben, überweisen wir Ihnen das Geld auf Ihr Konto. Bitte nennen Sie uns dafür Ihre neue "
     "Adresse und Ihre IBAN."),
])
q2 = [("Man kann den Umzug auch telefonisch melden.", "f"),
      ("Man soll die Zählerstände in der alten und in der neuen Wohnung notieren.", "r"),
      ("Wer zu viel bezahlt hat, bekommt das Geld bar im Kundenzentrum.", "f")]

b3 = ("Hallenbad Lindenfeld – Informationen für unsere Gäste", [
    ("Wann haben wir geöffnet?",
     "Montag bis Freitag von 7 bis 21 Uhr, Samstag und Sonntag von 8 bis 18 Uhr. An Feiertagen bleibt das Bad geschlossen. "
     "Dienstags von 18 bis 20 Uhr ist das große Becken für Schwimmkurse reserviert. Das Nichtschwimmerbecken ist in "
     "dieser Zeit aber geöffnet."),
    ("Was kostet der Eintritt?",
     "Erwachsene zahlen 4,50 Euro, Kinder ab sechs Jahren 2,50 Euro. Kinder unter sechs Jahren schwimmen kostenlos, aber "
     "nur zusammen mit einer erwachsenen Person. Mit der Zehnerkarte sparen Sie 20 Prozent."),
    ("Wie melde ich mein Kind zum Schwimmkurs an?",
     "Unsere Kurse beginnen im März und im September. Die Kinder sollten mindestens fünf Jahre alt sein. Bitte melden Sie "
     "Ihr Kind an der Kasse an – online ist eine Anmeldung leider nicht möglich. Die Plätze sind schnell weg!"),
])
q3 = [("Am Dienstagabend ist das ganze Bad geschlossen.", "f"),
      ("Ein Kind mit vier Jahren darf allein und kostenlos ins Bad.", "f"),
      ("Die Anmeldung zum Schwimmkurs ist nur an der Kasse möglich.", "r")]

s += [KeepTogether(task(3, "Prüfungstraining: Familienzentrum", INSTR + " Kreuze an.", 2) + [brochure(*b1), Spacer(1, 6), rf(q1)])]
s += [KeepTogether(task(4, "Prüfungstraining: Umzug melden", INSTR + " Kreuze an.", 2) + [brochure(*b2), Spacer(1, 6), rf(q2)])]
s += [KeepTogether(task(5, "Prüfungstraining: Im Hallenbad", INSTR + " Achtung: Hier sind die Fallen schwerer!", 3) + [brochure(*b3), Spacer(1, 6), rf(q3)])]

# Übung 6 – falsche Aussagen korrigieren
s += [KeepTogether(task(6, "Falsche Aussagen korrigieren",
                        "Schreib einen richtigen Satz. Benutze die Informationen aus den Broschüren in Übung 3–5.", 3)
                   + [R("<b>Beispiel:</b> Die Kurse sind für alle Familien kostenlos. (Übung 3)", "cell"),
                      R('<font color="#2341B5">Für die Kurse zahlt man eine kleine Gebühr. Mit dem Lindenfeld-Pass zahlt man '
                        'nur die Hälfte.</font>', "cell"), Spacer(1, 4),
                      R("1. Zur Beratung am Dienstag kann man ohne Termin kommen. (Übung 3)", "item"), lines(2),
                      R("2. Man kann den Umzug auch telefonisch melden. (Übung 4)", "item"), lines(2),
                      R("3. Ein Kind mit vier Jahren darf allein und kostenlos ins Bad. (Übung 5)", "item"), lines(2)])]

# Lösungen
loes = [
    "<b>Übung 1:</b> " + " · ".join(f"{i}{x}" for i, (_, x) in enumerate(u2, 1)),
    "<b>Übung 2:</b> 1 f – nur bis 12 Uhr, also nur vormittags · 2 r – „Einen Ausweis brauchen Sie nicht.“ · "
    "3 r – Rentnerinnen und Rentner zahlen die Hälfte · 4 f – <i>nur … wenn</i> mindestens acht Personen anmelden · "
    "5 f – Hunde müssen im Garten <i>an der Leine</i> sein · 6 r – „oder bei uns im Büro abholen“",
    "<b>Übung 3:</b> 1 f – „Für diese Beratung brauchen Sie einen Termin.“ · 2 f – Für Kurse „zahlen Sie eine kleine "
    "Gebühr“; nur das Elterncafé und die Beratung sind kostenlos. · 3 r – „Das Haus ist barrierefrei.“",
    "<b>Übung 4:</b> 1 f – „Am Telefon können wir Umzüge leider nicht bearbeiten.“ · 2 r – „Schreiben Sie … die "
    "Zählerstände … in der alten Wohnung auf … In der neuen Wohnung machen Sie das Gleiche.“ · 3 f – „überweisen wir "
    "Ihnen das Geld auf Ihr Konto“ (= kein Bargeld).",
    "<b>Übung 5:</b> 1 f – Nur das große Becken ist reserviert, „das Nichtschwimmerbecken ist … aber geöffnet“. · "
    "2 f – Kostenlos ja, aber „nur zusammen mit einer erwachsenen Person“. · 3 r – Anmeldung „an der Kasse“, "
    "„online … nicht möglich“.",
    "<b>Übung 6 (Beispiele):</b> 1. Für die Beratung am Dienstag braucht man einen Termin. · 2. Man kann den Umzug "
    "nur online oder im Kundenzentrum melden. · 3. Ein Kind mit vier Jahren muss nichts bezahlen, aber es darf nur mit "
    "einer erwachsenen Person ins Bad.",
]
s += [
    Spacer(1, 10),
    KeepTogether([
        R('Lösungen <font size="10" color="#566078">– erst üben, dann nachschauen!</font>', "h2"),
        box([R(x, "cell") for x in loes], HELLGRUEN, GRUEN),
    ]),
    Spacer(1, 6),
    R("Tipp: Die Antwort steht immer im Text. Such die Stelle – und lies dann jedes kleine Wort! – Dennis", "hand"),
    Spacer(1, 4),
    R("Eigene Übung im Stil der Prüfung „Deutsch-Test für Zuwanderer“ – keine Originalaufgabe. Alle Orte, Einrichtungen "
      "und Preise sind erfunden.", "small"),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
