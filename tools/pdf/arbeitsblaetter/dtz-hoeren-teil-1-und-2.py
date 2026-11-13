# Arbeitsblatt DTZ Hören Teil 1 und 2 – Ansagen am Telefon und Durchsagen, Informationen im Radio
# Format laut sim/dtz.js, sim/dtz-2.js, sim/dtz-3.js und pruefung-fakten.js (dtz): Teil 1 = 4 Ansagen, Teil 2 = 5 Radio-Infos,
# je eine Aufgabe a/b/c, jeder Text einmal (plays: 1), 1 Punkt pro Aufgabe; Hören gesamt 4 Teile, 20 Aufgaben, ca. 25 Min.
# Eigene Texte, keine Originalaufgaben. Alle Personen, Firmen und Praxen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-hoeren-teil-1-und-2.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtz-hoeren-teil-1-und-2"
TITLE = "DTZ Hören Teil 1 und 2: Ansagen und Radio verstehen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "A2–B1"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.2)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.4, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.6, leading=12, leftIndent=10, firstLineIndent=-10, spaceAfter=2)
BOX = sym("☐")


def tips_traps(title, tips, traps):
    left = [R("<b>So gehst du vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)]
    right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [R(f"– {t}", "tip") for t in traps]
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN), ("BACKGROUND", (1, 0), (1, 0), NOTE),
        ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN), ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return KeepTogether([R(title, "h2"), t])


def mc(nr, label, q, opts):
    """One exam item: question plus options a/b/c with tick boxes."""
    rows = [[R(f"<b>{nr}</b>", "cell"), R(f"<font color='#566078'>{label}</font> · <b>{q}</b>", "cell")]]
    rows += [["", R(f"{BOX}  <b>{l}</b>  {o}", "cell")] for l, o in zip("abc", opts)]
    t = Table(rows, colWidths=[9 * mm, 165 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, -1), (-1, -1), 0.4, LINE),
                           ("TOPPADDING", (0, 0), (-1, -1), 1.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, 0), 5)]))
    return KeepTogether([t])


def script(title, lines_):
    """Text to read aloud: one row per speaker turn."""
    rows = [R(f"<b>{who}:</b> {txt}" if who else txt, "mat") for who, txt in lines_]
    t = Table([[r] for r in rows], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8), ("TOPPADDING", (0, 0), (-1, 0), 5),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 5)]))
    return [KeepTogether([R(title, "solh"), t]), Spacer(1, 2)]


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("A2–B1 · Prüfung DTZ · Hören Teil 1 und 2", "kick"),
    R("Ansagen und Radio verstehen", "h1"),
    R("Eine Nachricht auf dem Anrufbeantworter, eine Durchsage am Bahnhof, kurze Infos im Radio: In Teil 1 und 2 "
      "suchst du in jedem Text <b>eine</b> wichtige Information. Hier übst du das mit zwei kompletten Übungssätzen "
      "im Prüfungsformat.", "lead"),
    R("So läuft der Teil", "h2"),
    table([
        ["<b>Was?</b>", "<b>Teil 1</b>", "<b>Teil 2</b>"],
        ["Name", "Ansagen am Telefon und Durchsagen", "Informationen im Radio"],
        ["Texte", "4 Ansagen (Anrufbeantworter, Bahnhof, Supermarkt …)", "5 kurze Informationen (Verkehr, Wetter, Termine …)"],
        ["Aufgabe", "Zu jedem Text 1 Aufgabe: Wählen Sie <b>a, b oder c</b>.", "Zu jedem Text 1 Aufgabe: Wählen Sie <b>a, b oder c</b>."],
        ["Hören", "Sie hören jeden Text <b>einmal</b>.", "Sie hören jeden Text <b>einmal</b>."],
        ["Punkte", "4 Aufgaben × 1 Punkt", "5 Aufgaben × 1 Punkt"],
    ], [24, 75, 75]),
    Spacer(1, 3),
    R("Der ganze Prüfungsteil Hören: 4 Teile, 20 Aufgaben, ca. 25 Minuten. Alle Texte hörst du nur einmal. "
      "Hören und Lesen zählen zusammen (45 Punkte). Teil 3 und 4 übst du auf dem Blatt "
      "„DTZ Hören Teil 3 und 4: Gespräche und Meinungen“.", "small"),
    Spacer(1, 3),
    box(R("<b>Ohne Audio üben – so geht’s:</b> Eine Person (Partnerin, Partner oder Lehrkraft) liest die Texte aus dem "
          "Lösungsteil (ab Seite 4) vor: normales Tempo, jeden Text <b>nur einmal</b>. Wer zuhört, deckt den Lösungsteil ab "
          "und liest <b>vor</b> jedem Text zuerst die Aufgabe.", "cell"), HELLGRUEN, GRUEN),
]

s += [tips_traps(
    "Teil 1: Strategien und Fallen",
    ["Lies vor dem Hören die Frage und unterstreiche das Fragewort: <i>Wann? Wo? Was soll … tun?</i> "
     "Dann weißt du, was du suchst: eine Zeit, einen Ort oder eine Handlung.",
     "Lies auch a, b und c. Oft kommen alle drei Dinge im Text vor – nur eine Antwort passt zur Frage.",
     "Am Telefon und am Bahnhof wird die wichtige Information oft wiederholt („Ich wiederhole …“). "
     "Beim zweiten Mal kannst du sie prüfen.",
     "Kreuze sofort an, wenn der Text zu Ende ist. Dann kommt schon der nächste Text."],
    ["<i>nicht … sondern</i>: „nicht von Gleis fünf, <b>sondern</b> von Gleis sieben“ – nur das Zweite stimmt.",
     "<i>leider, fällt aus, geschlossen</i>: Ein Termin oder Zug wird genannt, gilt aber nicht.",
     "Zahlen hören sich ähnlich an: <i>dreizehn</i> und <i>dreißig</i>, <i>halb zehn</i> = 9:30 Uhr.",
     "Ein Wort aus dem Text steht in einer falschen Antwort."]),
    tips_traps(
    "Teil 2: Strategien und Fallen",
    ["Die Themen im Radio: Verkehr, Wetter, Veranstaltungen, Informationen aus der Stadt. "
     "Die Frage sagt dir, welches Detail wichtig ist.",
     "Achte auf Wörter in der Frage wie <i>nur, neu, morgen, am Sonntag</i>. Sie zeigen genau, was du suchen musst.",
     "Du musst nicht jedes Wort verstehen. Hör auf die Stelle, die zur Frage passt.",
     "Unsicher? Trotzdem ankreuzen – für eine falsche Antwort gibt es keinen Abzug."],
    ["Im Radio gibt es oft mehrere Informationen in einem Text: zwei Straßen, zwei Tage, Vormittag und Nachmittag.",
     "<i>aber, trotzdem, weiterhin</i>: Nach diesen Wörtern kommt oft die wichtige Einschränkung.",
     "„Bleibt gleich“ ist keine Änderung: <i>Die Preise bleiben gleich.</i>"]),
]

# ───────────────────────── Übung 1 ─────────────────────────
s += task(1, "Zahlen, Uhrzeiten, Gleise",
          "Aufwärmen. Eine Person liest die acht Sätze aus dem Lösungsteil vor (jeden Satz einmal). "
          "Schreib die Zahl, die Uhrzeit oder das Datum in <b>Ziffern</b>.", 1)
u1 = [
    "Der Zug nach Dortmund fährt um ________ Uhr.",
    "Die Praxis ist ab ________ Uhr wieder geöffnet.",
    "Bitte gehen Sie zu Gleis ________.",
    "Der Termin ist am Freitag um ________ Uhr.",
    "Rückruf bitte unter: ______________________",
    "Das Angebot gilt bis zum ________.",
    "Der Eintritt kostet ________ Euro.",
    "Der Bus fährt alle ________ Minuten.",
]
s += [table([[f"{i}. {t}"] for i, t in enumerate(u1, 1)], [174], head=False)]

# ───────────────────────── Übung 2: Teil 1 ─────────────────────────
s += [CondPageBreak(150 * mm)]
s += task(2, "Übungssatz Teil 1: Ansagen am Telefon und Durchsagen",
          "Prüfungsformat. Sie hören vier Ansagen. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige "
          "Lösung a, b oder c. Sie hören jeden Text <b>einmal</b>.", 2)
s += [
    mc(1, "Text 1", "Wann kann Frau Kowalczyk ihr Auto abholen?",
       ["Heute am Vormittag.", "Heute ab 15 Uhr.", "Morgen ab 7:30 Uhr."]),
    mc(2, "Text 2", "Was ist mit dem ICE nach München?",
       ["Er fällt heute aus.", "Er fährt von einem anderen Gleis.", "Er fährt später ab."]),
    mc(3, "Text 3", "Wo kann man heute leere Flaschen abgeben?",
       ["Am Automaten im Eingang.", "An der Information.", "An jeder Kasse."]),
    mc(4, "Text 4", "Was sollen Patientinnen und Patienten in dringenden Fällen tun?",
       ["Zu einer anderen Praxis gehen.", "Ab dem 3. Januar in die Praxis kommen.",
        "Eine Nachricht auf den Anrufbeantworter sprechen."]),
]

# ───────────────────────── Übung 3: Teil 2 ─────────────────────────
s += [CondPageBreak(150 * mm)]
s += task(3, "Übungssatz Teil 2: Informationen im Radio",
          "Prüfungsformat. Sie hören fünf kurze Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. "
          "Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text <b>einmal</b>.", 3)
s += [
    mc(5, "Text 1", "Warum sind am Sonntag Straßen in der Innenstadt gesperrt?",
       ["Wegen einer Baustelle.", "Wegen eines Laufs.", "Wegen eines Unfalls."]),
    mc(6, "Text 2", "Wie ist das Wetter morgen früh?",
       ["Es schneit stark.", "Es ist sonnig und mild.", "Die Straßen können glatt sein."]),
    mc(7, "Text 3", "Was ist richtig?",
       ["Der Eintritt ist kostenlos.", "Man muss sich vorher anmelden.", "Das Fest ist nur für Kinder."]),
    mc(8, "Text 4", "Was ist neu beim Bürgeramt?",
       ["Man braucht keinen Termin mehr.", "Es ist auch am Samstag geöffnet.", "Es ist an zwei Tagen länger geöffnet."]),
    mc(9, "Text 5", "Was sollen Leute machen, deren Müll sonst am Montag abgeholt wird?",
       ["Die Tonne am Dienstag an die Straße stellen.", "Den Müll zum Recyclinghof bringen.",
        "Bis zur nächsten Woche warten."]),
    Spacer(1, 4),
    box(R("<b>Nach dem Hören:</b> Bei welcher Aufgabe warst du unsicher? Welches Wort hat dich in die Falle gelockt? "
          "Schreib es auf: ______________________________", "cell"), NOTE, GELB),
]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen und Texte zum Vorlesen", "h2"),
      R("Erst üben, dann nachschauen! Wer zuhört, deckt diesen Teil ab. Die Texte sind für Partnerin, Partner "
        "oder Lehrkraft zum Vorlesen. Zahlen sind ausgeschrieben – so, wie man sie hört.", "small"),
      R("Übung 1 · Text zum Vorlesen und Lösung", "solh")]
u1_read = [
    ("Der Zug nach Dortmund fährt um sechzehn Uhr fünfundvierzig.", "16:45"),
    ("Die Praxis ist ab Viertel nach acht wieder geöffnet.", "8:15"),
    ("Bitte gehen Sie zu Gleis dreizehn.", "13 (nicht 30!)"),
    ("Der Termin ist am Freitag um halb zehn.", "9:30 (nicht 10:30!)"),
    ("Rückruf bitte unter: null zwei null eins, sechsundachtzig, vierundfünfzig, zwölf.", "0201 86 54 12"),
    ("Das Angebot gilt bis zum achtzehnten Mai.", "18.5. / 18. Mai"),
    ("Der Eintritt kostet drei Euro fünfzig.", "3,50"),
    ("Der Bus fährt alle zwanzig Minuten.", "20"),
]
s += [table([["<b>Text zum Vorlesen</b>", "<b>Lösung</b>"]] + [[f"{i}. {t}", l] for i, (t, l) in enumerate(u1_read, 1)],
            [130, 44])]

s += [R("Übung 2 · Teil 1: Lösungen", "solh"),
      R("<b>1 b · 2 c · 3 b · 4 a</b>", "sol"),
      R("1 b: „Ab fünfzehn Uhr ist Ihr Wagen fertig.“ <b>Falle a:</b> Am Vormittag fehlt noch das Ersatzteil. "
        "<b>Falle c:</b> Morgen ist die Werkstatt geschlossen.", "sol"),
      R("2 c: „Der Zug fährt heute ungefähr zwanzig Minuten später ab.“ <b>Falle a:</b> Ausfallen fällt der Zug nach "
        "Stuttgart. <b>Falle b:</b> „Das Gleis bleibt gleich.“", "sol"),
      R("3 b: „Bitte geben Sie Ihre leeren Flaschen heute an der Information neben Kasse eins ab.“ "
        "<b>Falle a:</b> Der Automat ist kaputt. <b>Falle c:</b> An der Kasse löst man nur den Bon ein.", "sol"),
      R("4 a: „In dringenden Fällen gehen Sie bitte zu Doktor Lange.“ <b>Falle b:</b> Am dritten Januar ist die "
        "Praxis noch zu – offen ist sie erst ab dem vierten.", "sol")]

s += script("Teil 1 · Text 1 – Anrufbeantworter", [
    ("Mann", "Guten Tag, Frau Kowalczyk, hier ist die Autowerkstatt Brenner, Yusuf Demir am Apparat. Es geht um Ihr Auto. "
             "Die Bremsen sind repariert, aber für das Licht hinten links fehlt uns noch ein Ersatzteil. Das kommt heute "
             "gegen zwölf Uhr. Am Vormittag können Sie den Wagen also leider noch nicht abholen. Ab fünfzehn Uhr ist Ihr "
             "Wagen fertig, wir haben heute bis achtzehn Uhr geöffnet. Morgen ist die Werkstatt den ganzen Tag geschlossen. "
             "Bezahlen können Sie bar oder mit Karte. Bis später, auf Wiederhören!"),
])
s += script("Teil 1 · Text 2 – Durchsage am Bahnhof", [
    ("Durchsage", "Information zum ICE fünfhundertzwölf nach München, planmäßige Abfahrt vierzehn Uhr zwanzig von Gleis neun. "
                  "Der Zug fährt heute ungefähr zwanzig Minuten später ab. Grund ist eine Reparatur am Zug. Das Gleis bleibt "
                  "gleich: Gleis neun. Ich wiederhole: Der ICE nach München fährt heute ungefähr zwanzig Minuten später ab. "
                  "Und eine weitere Information: Der Regional-Express nach Stuttgart um vierzehn Uhr dreißig fällt heute aus. "
                  "Wir bitten um Entschuldigung."),
])
s += script("Teil 1 · Text 3 – Durchsage im Supermarkt", [
    ("Durchsage", "Liebe Kundinnen und Kunden, leider ist unser Pfandautomat im Eingang im Moment kaputt. Bitte geben Sie "
                  "Ihre leeren Flaschen heute an der Information neben Kasse eins ab. Sie bekommen dort einen Bon. Diesen "
                  "Bon können Sie dann an jeder Kasse einlösen. Ich wiederhole: Leere Flaschen bitte heute an der "
                  "Information abgeben. Ab morgen funktioniert der Automat wieder. Vielen Dank für Ihr Verständnis!"),
])
s += script("Teil 1 · Text 4 – Ansage einer Arztpraxis", [
    ("Frau", "Guten Tag, Sie sind verbunden mit der Hausarztpraxis Doktor Rahimi. Unsere Praxis ist vom "
             "dreiundzwanzigsten Dezember bis zum dritten Januar geschlossen. In dringenden Fällen gehen Sie bitte zu "
             "Doktor Lange in der Bahnhofstraße zwölf. Außerhalb der Sprechzeiten erreichen Sie den ärztlichen "
             "Bereitschaftsdienst unter der Nummer eins eins sechs eins eins sieben. Bei Lebensgefahr rufen Sie bitte "
             "die eins eins zwei an. Ab dem vierten Januar sind wir wieder für Sie da. Wir wünschen Ihnen schöne Feiertage!"),
])

s += [CondPageBreak(60 * mm), R("Übung 3 · Teil 2: Lösungen", "solh"),
      R("<b>5 b · 6 c · 7 a · 8 c · 9 a</b>", "sol"),
      R("5 b: „Grund ist der Stadtlauf.“ <b>Falle a und c:</b> Baustelle und Unfall gibt es auf der Autobahn, "
        "nicht in der Innenstadt.", "sol"),
      R("6 c: „Morgen früh kann es auf Straßen und Gehwegen glatt sein.“ <b>Falle a:</b> Schnee kommt erst am Wochenende.", "sol"),
      R("7 a: „Der Eintritt ist frei.“ <b>Falle b:</b> „Eine Anmeldung ist nicht nötig.“ "
        "<b>Falle c:</b> Es gibt auch etwas für Erwachsene.", "sol"),
      R("8 c: „am Dienstag und am Donnerstag länger geöffnet, und zwar bis neunzehn Uhr“. <b>Falle a:</b> „Termine brauchen Sie aber weiterhin.“ "
        "<b>Falle b:</b> „Samstags bleibt das Bürgeramt geschlossen.“", "sol"),
      R("9 a: „Dann stellen Sie Ihre Tonne bitte am Dienstag an die Straße.“ <b>Falle b:</b> Die Recyclinghöfe sind "
        "am Montag geschlossen.", "sol")]

s += script("Teil 2 · Text 1 – Verkehr", [
    ("Sprecher", "Und jetzt der Verkehr. Auf der A drei bei Oberhausen ist nach einem Unfall die rechte Spur gesperrt, dort "
                 "stehen Sie etwa vier Kilometer im Stau. Auf der A zweiundfünfzig gibt es eine Baustelle, fahren Sie dort "
                 "bitte vorsichtig. Und eine Information für Sonntag: Zwischen neun und vierzehn Uhr sind viele Straßen in "
                 "der Innenstadt gesperrt. Grund ist der Stadtlauf. Nehmen Sie an diesem Tag lieber Bus und Bahn."),
])
s += script("Teil 2 · Text 2 – Wetter", [
    ("Sprecherin", "Das Wetter: Heute bleibt es trocken, aber kalt, bei höchstens drei Grad. In der Nacht wird es noch kälter, "
                   "bis minus fünf Grad. Morgen früh kann es auf Straßen und Gehwegen glatt sein. Fahren Sie also vorsichtig "
                   "und planen Sie mehr Zeit ein. Am Nachmittag wird es etwas freundlicher. Schnee erwarten wir erst am Wochenende."),
])
s += script("Teil 2 · Text 3 – Veranstaltung", [
    ("Sprecher", "Am Samstag lädt die Freiwillige Feuerwehr Nordstadt zum Tag der offenen Tür ein, von zehn bis sechzehn Uhr. "
                 "Kinder dürfen in ein echtes Feuerwehrauto steigen. Für Erwachsene gibt es um elf und um vierzehn Uhr einen "
                 "kurzen Erste-Hilfe-Kurs. Kommen Sie einfach vorbei, eine Anmeldung ist nicht nötig. Der Eintritt ist frei, "
                 "nur Essen und Getränke kosten etwas."),
])
s += script("Teil 2 · Text 4 – Information aus der Stadt", [
    ("Sprecherin", "Eine Information aus dem Rathaus: Ab dem ersten März hat das Bürgeramt am Dienstag und am Donnerstag "
                   "länger geöffnet, und zwar bis neunzehn Uhr. So können auch Berufstätige nach der Arbeit kommen. "
                   "Termine brauchen Sie aber weiterhin. Die buchen Sie online oder am Telefon. Samstags bleibt das "
                   "Bürgeramt geschlossen."),
])
s += script("Teil 2 · Text 5 – Müllabfuhr", [
    ("Sprecher", "Und noch ein Hinweis der Stadtreinigung: Wegen des Feiertags am Montag kommt die Müllabfuhr in dieser Woche "
                 "immer einen Tag später. Wird Ihr Müll normalerweise am Montag abgeholt? Dann stellen Sie Ihre Tonne bitte am "
                 "Dienstag an die Straße. Die Recyclinghöfe sind am Montag geschlossen und ab Dienstag wieder geöffnet."),
])

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
