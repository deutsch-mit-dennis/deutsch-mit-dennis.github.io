# Arbeitsblatt B2 Prüfung: DTB B2 Sprachbausteine Teil 1 und 2 + Schreiben: Beitrag im Mitarbeiterforum
# Format laut offiziellem Modelltest DTB B2 (telc, 2022): 35 Min.; SB je 6 Lücken à 0,5 Punkte; Forum 14 Punkte + Sprache, keine feste Wortzahl.
# Eigene Aufgaben im Stil der Prüfung; alle Personen und Firmen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-sprachbausteine-forum.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle, CondPageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import white

SLUG = "dtb-b2-sprachbausteine-forum"
TITLE = "DTB B2 Sprachbausteine und Beitrag im Mitarbeiterforum"
LEVEL = "B2"
CB = sym("☐")
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'
G = lambda n: f'<b>({n})</b> <font color="#8A93A8">________</font>'

st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5)
st["mus"] = ParagraphStyle("mus", parent=st["cell"], spaceAfter=4)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10.3, leading=15.5, spaceAfter=4)


def grid(rows, widths, head=True, pad=4):
    data = [[c if not isinstance(c, str) else R(c, "cell") for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def doc(paras):
    """Ein Prüfungstext im Kasten (mehrere Absätze)."""
    t = Table([[[R(p, "txt") for p in paras]]], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.8, LINE), ("BACKGROUND", (0, 0), (-1, -1), NOTE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


s = [
    R("DTB B2 · Prüfungstraining · Sprachbausteine und Schreiben", "kick"),
    R("Sprachbausteine und Beitrag im Mitarbeiterforum", "h1"),
    R("Zwei kurze Lückentexte aus dem Betrieb und ein eigener Text im Intranet: In diesem Prüfungsteil zeigen Sie, "
      "dass Sie Konnektoren, Präpositionen und feste Wendungen sicher verwenden – und Ihre Meinung schriftlich gut begründen.",
      "lead"),
]

s += [
    R("So läuft der Teil", "h2"),
    grid([
        ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Punkte</b>"],
        ["<b>Sprachbausteine Teil 1</b>",
         "Ein Text aus dem Betrieb mit 6 Lücken und 10 Wörtern (a–j). Jedes Wort passt nur einmal, 4 Wörter bleiben übrig. "
         "Geprüft werden vor allem Konnektoren und Präpositionen.", "6 × 0,5"],
        ["<b>Sprachbausteine Teil 2</b>",
         "Eine E-Mail mit 6 Lücken und je drei Möglichkeiten (a, b, c). Geprüft werden feste Wendungen, Präpositionen und "
         "der passende Ton im Geschäftsbrief.", "6 × 0,5"],
        ["<b>Schreiben:</b> Beitrag im Mitarbeiterforum",
         "Eines von zwei Themen wählen (Richtwert ca. 150 Wörter): Meinung, Begründung, Beispiele aus Ihrer "
         "Erfahrung und ein Vorschlag.", "14 + Sprache*"],
    ], [42, 112, 20]),
    Spacer(1, 3),
    box(R("<b>Zeit:</b> 35 Minuten: Sprachbausteine ca. 10, Forumsbeitrag ca. 25 Minuten. "
          "* Sprache: 27 Punkte für Forum und Kunden-E-Mail zusammen; keine feste Wortzahl (Modelltest telc, 2022).", "cell"), NOTE, GELB),
]

s += [
    R("Strategie: So gehen Sie vor", "h2"),
    R("<b>1. Wo steht das Verb?</b> Lesen Sie den ganzen Satz um die Lücke. Verb am Ende "
      f"{ARROW} Nebensatz-Konnektor (weil, damit, sobald). Verb direkt nach der Lücke {ARROW} deshalb, trotzdem. "
      f"Nomen ohne Verb {ARROW} Präposition (wegen, trotz).", "item"),
    R("<b>2. Was bedeutet der Satz?</b> Grund, Zweck, Bedingung, Gegensatz oder Zeit? Oft passt ein Wort grammatisch, "
      "aber nicht inhaltlich.", "item"),
    R("<b>3. Feste Wendungen als Block lernen.</b> „Interesse an“, „Im Anhang finden Sie“, „zur Verfügung stehen“: "
      "Prüfen Sie Präposition und Kasus nach dem Verb oder Nomen. Streichen Sie verwendete Wörter.", "item"),
    R("<b>4. Forumsbeitrag planen und prüfen.</b> 2 Minuten planen: Meinung – 2 Gründe – 1 Gegenargument – Beispiel – "
      "Vorschlag. Am Ende 3 Minuten korrigieren: Verbposition, Endungen, Konnektoren.", "item"),
    R("Achtung, Falle!", "h3"),
    table([
        ["<b>Typischer Fehler</b>", "<b>Besser so</b>"],
        [f"„deshalb/trotzdem“ in eine Lücke mit {V('Verb am Ende')}",
         f"deshalb, trotzdem: Verb auf {V('Position 2')} · weil, obwohl: Verb am Ende"],
        ["Ähnliche Wörter verwechseln: sofern / sodass / sobald, bestätigen / bescheinigen",
         "Bedeutung prüfen: Bedingung, Folge oder Zeitpunkt?"],
        ["Forum: nur Meinung, keine Gründe, keine Beispiele, kein Gegenargument",
         "Pro und Contra mit Beispielen – das wirkt überlegt, nicht einseitig"],
        ["Forum in Briefform: „Sehr geehrte Damen und Herren“",
         "Forum: „Liebe Kolleginnen und Kollegen“ oder „Hallo zusammen“"],
    ], [84, 90]),
]

# Übung 1
s += [PageBreak()]
sortbox = Table([[R("<b>Verb am Ende</b> (Nebensatz)", "cell"), R("<b>Verb auf Position 2</b> (Hauptsatz)", "cell"),
                  R("<b>Präposition</b> + Genitiv", "cell")], ["", "", ""]],
                colWidths=[58 * mm] * 3, rowHeights=[None, 22 * mm])
sortbox.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
                             ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
s += task(1, "Wörter sortieren",
          "Tipp aus der Prüfung: Ordnen Sie die zehn Wörter aus Übung 2 schon vorher in drei Gruppen. "
          "Ein Wort passt in zwei Gruppen – welches?", 1)
WORDS1 = ["bevor", "damit", "deshalb", "indem", "obwohl", "sobald", "trotz", "trotzdem", "während", "wegen"]
s += [
    box(R("  ·  ".join(f"<b>{w}</b>" for w in WORDS1), "p"), SOFT),
    Spacer(1, 3),
    sortbox,
]

# Übung 2 – SB Teil 1
s += task(2, "Sprachbausteine Teil 1: Mitarbeiterinformation",
          "Lesen Sie die Mitarbeiterinformation. Welches Wort (a–j) passt in die Lücken 1–6? Jedes Wort können Sie nur "
          "einmal verwenden. Vier Wörter bleiben übrig.", 2)
s += [
    doc([
        "<b>Mitarbeiterinformation – Pflegedienst Lebenswert, Gelsenkirchen</b><br/>Betreff: Neue Dienstplan-App ab 1. Dezember",
        "Liebe Kolleginnen und Kollegen,",
        f"{G(1)} der vielen Rückfragen zum Dienstplan auf Papier haben wir uns für eine digitale Lösung entschieden: "
        f"Ab 1. Dezember planen wir alle Dienste mit der App „DienstKlar“. Tauschwünsche tragen Sie künftig direkt in "
        f"der App ein, {G(2)} die Pflegedienstleitung sie schneller bearbeiten kann. Sie bekommen automatisch eine "
        f"Nachricht aufs Handy, {G(3)} Ihr Dienst geändert worden ist. Ihre Arbeitszeit erfassen Sie ab jetzt, "
        f"{G(4)} Sie zu Dienstbeginn und Dienstende einen Knopf in der App drücken.",
        f"Die App ist für uns alle neu. {G(5)} wird es am Anfang sicher noch Fragen geben. {G(6)} der "
        f"Einführungsphase ist Frau Mbeki jeden Dienstag von 13 bis 15 Uhr im Büro und hilft Ihnen gern.",
        "Mit freundlichen Grüßen<br/>Ihre Pflegedienstleitung",
    ]),
    Spacer(1, 4),
    grid([[f"<b>{'abcdefghij'[i]})</b> {w}" for i, w in enumerate(WORDS1[:5])],
          [f"<b>{'abcdefghij'[i + 5]})</b> {w}" for i, w in enumerate(WORDS1[5:])]], [34.8] * 5, head=False, pad=3),
    Spacer(1, 4),
    R("Lösung:   1 ____   2 ____   3 ____   4 ____   5 ____   6 ____", "p"),
]
s += [
    R("Merkhilfe: Was drückt das Wort aus?", "h3"),
    table([
        ["<b>Bedeutung</b>", "<b>Verb am Ende</b>", "<b>Verb auf Position 2</b>", "<b>Präposition</b>"],
        ["Grund", "weil, da", "deshalb, deswegen, daher", "wegen, aufgrund (+ Gen.)"],
        ["Zweck", "damit, um … zu", "–", "für, zwecks (+ Gen.)"],
        ["Gegensatz", "obwohl", "trotzdem, dennoch", "trotz (+ Gen.)"],
        ["Bedingung", "wenn, falls, sofern", "sonst (= wenn nicht)", "bei"],
        ["Zeit", "sobald, bevor, nachdem, während", "danach, vorher", "während, vor, nach"],
        ["Art und Weise", "indem", "dadurch", "durch"],
    ], [30, 52, 48, 44]),
]

# Übung 3 – SB Teil 2
s += [PageBreak()]
s += task(3, "Sprachbausteine Teil 2: E-Mail an einen Kunden",
          "Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 1–6?", 2)
s += [
    doc([
        "<b>Betreff:</b> Ihre Anfrage vom 3. November – Renovierung Ihrer Büroräume",
        "Sehr geehrter Herr Demir,",
        f"vielen Dank für Ihre Anfrage und Ihr Interesse {G(1)} unseren Leistungen. Im Anhang {G(2)} Sie unser "
        f"Angebot für die Renovierung der vier Büroräume im zweiten Stock. Die Arbeiten können wir {G(3)} ab dem "
        f"7. Dezember beginnen; sie dauern etwa fünf Arbeitstage.",
        f"{G(4)} der Farbe für den Besprechungsraum bitten wir Sie noch um eine kurze Rückmeldung. Das Angebot ist bis "
        f"zum 30. November {G(5)}. Bitte teilen Sie uns bis Freitag {G(6)}, ob der Termin für Sie passt. "
        f"Wir freuen uns auf Ihre Antwort.",
        "Mit freundlichen Grüßen<br/>Kofi Osei<br/>Malerbetrieb Osei &amp; Lang, Mülheim an der Ruhr",
    ]),
    Spacer(1, 4),
]
OPT2 = [("für", "an", "auf"), ("liegen", "halten", "finden"), ("frühestens", "spätestens", "zuletzt"),
        ("Aufgrund", "Hinsichtlich", "Anstatt"), ("fällig", "zulässig", "gültig"), ("mit", "an", "zu")]
s += [grid([[f"<b>({i})</b>"] + [f"{CB} {'abc'[j]}) {o}" for j, o in enumerate(opts)] for i, opts in enumerate(OPT2, 1)],
           [16, 52.6, 52.6, 52.6], head=False, pad=3.5)]
s += [
    Spacer(1, 4),
    box(R("<b>Feste Wendungen für E-Mails im Beruf – als Block lernen:</b> "
          f"{K('Ihre E-Mail vom')} 3. November · {K('Im Anhang finden Sie')} … · {K('Interesse an')} + Dat. · "
          f"{K('sich bedanken für')} · {K('sich freuen auf')} (kommt noch) / {K('über')} (ist schon da) · "
          f"{K('Bitte teilen Sie uns mit, ob')} … · {K('Für Rückfragen stehe ich Ihnen gern zur Verfügung.')} · "
          f"{K('Wir bitten um Rückmeldung bis')} …", "cell"), SOFT),
]

# Forum: Aufbau und Redemittel
s += [
    R("Der Forumsbeitrag: Aufbau und Redemittel", "h2"),
    table([
        ["<b>Teil</b>", "<b>Redemittel</b>"],
        ["<b>Anrede</b>", f"{K('Liebe Kolleginnen und Kollegen,')} · {K('Hallo zusammen,')}"],
        ["<b>Einleitung:</b> klare Meinung",
         f"{K('Ich finde die Idee … grundsätzlich gut, allerdings')} … · {K('Meiner Ansicht nach sollten wir')} …"],
        ["<b>Gründe</b>",
         f"{K('Der wichtigste Grund ist, dass')} … · {K('Dadurch')} … · {K('Hinzu kommt, dass')} …"],
        ["<b>Beispiel</b>",
         f"{K('Ich habe selbst erlebt, dass')} … · {K('Bei uns in der Abteilung')} … · {K('Als ich hier angefangen habe,')} …"],
        ["<b>Gegenargument</b>",
         f"{K('Andererseits darf man nicht vergessen, dass')} … · {K('Zwar')} …, {K('aber')} … · {K('Je')} …, {K('desto')} …"],
        ["<b>Vorschlag</b>",
         f"{K('Deshalb schlage ich vor, dass')} … · {K('Wie wäre es, wenn wir')} …? · {K('Sinnvoll wäre es,')} … zu …"],
        ["<b>Schluss</b>", f"{K('Ich bin gespannt auf eure Meinungen.')} · {K('Viele Grüße')} + Name, Abteilung"],
    ], [38, 136]),
]

# Übung 4 – Forum
s += [PageBreak()]
s += task(4, "Schreiben: Beitrag im Mitarbeiterforum",
          "Im Intranet Ihrer Firma gibt es ein Mitarbeiterforum. Wählen Sie eines der beiden Themen und schreiben Sie einen "
          "Beitrag. Äußern Sie Ihre Meinung, begründen Sie sie und nennen Sie Beispiele aus Ihrer Erfahrung. "
          "Richtwert: ca. 150 Wörter.", 3)
themen = [
    ("Thema A: Patenprogramm für neue Kolleginnen und Kollegen",
     "Die Geschäftsleitung möchte ein Patenprogramm einführen: Wer neu anfängt, bekommt für die ersten drei Monate eine "
     "erfahrene Patin oder einen erfahrenen Paten. Die Paten haben dafür zwei Stunden pro Woche weniger andere Aufgaben.",
     "Was halten Sie von einem Patenprogramm?"),
    ("Thema B: Kantine oder Essenszuschuss?",
     "Die Kantine macht seit Jahren Verluste. Die Geschäftsleitung überlegt, sie zu schließen und allen Beschäftigten "
     "stattdessen einen Zuschuss für das Mittagessen zu zahlen – zum Beispiel 5 Euro pro Arbeitstag.",
     "Soll die Kantine durch einen Essenszuschuss ersetzt werden?"),
]
cells = [[R(f"<b>{h}</b>", "cell"), R(sit, "cell"), R(f"<b>{q}</b>", "cell")] for h, sit, q in themen]
t = Table([cells], colWidths=[87 * mm, 87 * mm])
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
                       ("LINEAFTER", (0, 0), (0, 0), 3, white),
                       ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                       ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
s += [t, Spacer(1, 3),
      R("<b>Schreiben Sie etwas zu diesen Punkten:</b> Ihre Meinung · Vorteile und Nachteile · Beispiele aus Ihrem "
        "Arbeitsalltag oder Ihrem Umfeld · ein Vorschlag, wie man es gestalten könnte.", "p"),
      R("Schritt 1 – Planen (2 Minuten)", "h3"),
      grid([["Meinung", ""], ["Grund 1", ""], ["Grund 2", ""], ["Gegenargument", ""], ["Beispiel", ""], ["Vorschlag", ""]],
           [36, 138], head=False, pad=5.5),
      R("Schritt 2 – Schreiben (ca. 20 Minuten)", "h3"),
      lines(12, indent=0),
      R("Weiter auf einem extra Blatt. Wörter zählen: Richtwert ca. 150.", "small"),
      ]

# Lösungen
s += [PageBreak(), R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"),
      R("<b>Verb am Ende:</b> bevor, damit, indem, obwohl, sobald, während · <b>Position 2:</b> deshalb, trotzdem · "
        "<b>Präposition + Genitiv:</b> trotz, wegen, während. <b>während</b> passt in zwei Gruppen: "
        "„während ich arbeite“ (Konnektor) und „während der Arbeit“ (Präposition).", "sol")]
l2 = [
    ("j) wegen", "„Wegen der vielen Rückfragen“ – Präposition mit Genitiv, nennt den Grund. „Trotz“ ist auch Präposition, "
                 "bedeutet aber Gegensatz."),
    ("b) damit", "Zweck: Die Pflegedienstleitung soll schneller arbeiten können. Verb „kann“ am Ende."),
    ("f) sobald", "Zeitpunkt: direkt nachdem der Dienst geändert worden ist. „bevor“ passt inhaltlich nicht."),
    ("d) indem", "Art und Weise: Wie erfassen Sie die Arbeitszeit? – Indem Sie einen Knopf drücken."),
    ("c) deshalb", "Folge, danach steht das Verb „wird“ auf Position 2. „Trotzdem“ wäre ein Gegensatz – das passt nicht."),
    ("i) während", "Präposition mit Genitiv: „während der Einführungsphase“ = in dieser Zeit."),
]
s += [R("Übung 2 – übrig bleiben: bevor, obwohl, trotz, trotzdem", "solh")]
s += [R(f"{i}. <b>{a}</b> – {b}", "sol") for i, (a, b) in enumerate(l2, 1)]
l3 = [
    ("b) an", "„Interesse an“ + Dativ: Interesse an unseren Leistungen."),
    ("c) finden", "Feste Formel im Geschäftsbrief: „Im Anhang finden Sie …“."),
    ("a) frühestens", "„frühestens ab dem 7. Dezember“ = nicht vor diesem Tag. „Spätestens“ passt nicht zu „ab“."),
    ("b) Hinsichtlich", "„hinsichtlich“ = zum Thema, bezüglich (+ Genitiv). „Aufgrund“ nennt einen Grund – das passt inhaltlich nicht."),
    ("c) gültig", "Ein Angebot ist bis zu einem Datum gültig. „Fällig“ ist eine Rechnung, „zulässig“ heißt erlaubt."),
    ("a) mit", "Trennbares Verb „mitteilen“: Bitte teilen Sie uns … mit."),
]
s += [R("Übung 3", "solh")]
s += [R(f"{i}. <b>{a}</b> – {b}", "sol") for i, (a, b) in enumerate(l3, 1)]

muster = [
    "Liebe Kolleginnen und Kollegen,",
    "ich finde die Idee mit den Patinnen und Paten sehr gut und möchte gern meine eigene Erfahrung teilen.",
    "Als ich vor drei Jahren hier im Lager angefangen habe, hat mir ein Kollege in den ersten Wochen alles gezeigt – "
    "obwohl das gar nicht seine Aufgabe war. Dadurch habe ich nicht nur die Abläufe schneller gelernt, sondern mich "
    "auch sofort im Team wohlgefühlt. Ein Patenprogramm würde dafür sorgen, dass alle Neuen diese Chance bekommen, nicht "
    "nur diejenigen, die Glück haben. Hinzu kommt, dass neue Kolleginnen und Kollegen weniger Fehler machen, wenn sie "
    "jemanden fragen können.",
    "Andererseits darf man nicht vergessen, dass zwei Stunden pro Woche nicht viel sind. Wenn in einer Abteilung "
    "ohnehin Personal fehlt, bleibt die Arbeit der Paten liegen oder das Team muss sie übernehmen. Je mehr Neue "
    "gleichzeitig anfangen, desto schwieriger wird das.",
    "Deshalb schlage ich vor, dass sich die Paten freiwillig melden und vorher eine kurze Schulung bekommen. Außerdem "
    "sollte jede Patin oder jeder Pate höchstens eine neue Person gleichzeitig betreuen. Nach einem halben Jahr könnten "
    "wir dann gemeinsam auswerten, was gut funktioniert hat.",
    "Ich bin gespannt auf eure Meinungen!<br/>Viele Grüße<br/>[Ihr Name], Lager und Versand",
]
s += [KeepTogether([R("Übung 4 – Mustertext zu Thema A (ca. 190 Wörter)", "solh"),
                    box([R(p, "mus") for p in muster], HELLGRUEN, GRUEN)]),
      Spacer(1, 3),
      box(R(f"<b>Checkliste:</b> {CB} klare Meinung am Anfang  {CB} mindestens zwei Gründe  {CB} konkretes Beispiel  "
            f"{CB} Gegenargument (zwar … aber, andererseits)  {CB} Vorschlag am Ende  {CB} Anrede und Gruß wie im Forum  "
            f"{CB} Absätze  {CB} ca. 150 Wörter", "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
