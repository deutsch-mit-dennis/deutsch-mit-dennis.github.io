# Arbeitsblatt telc Deutsch B2: Schriftlicher Ausdruck (formelle E-Mail mit Leitpunkten)
# Format laut Website-Daten (sim/telc-b2.js): 30 Min., 45 Punkte, eine von zwei Aufgaben (A/B),
# mind. 3 von 4 Leitpunkten, mind. 150 Wörter. Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-schriftlicher-ausdruck.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "telc-b2-schriftlicher-ausdruck"
TITLE = "telc B2 Schriftlicher Ausdruck: formelle E-Mail mit Leitpunkten"  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
X = lambda t: f'<font color="#C2362B">{fallback(t)}</font>'  # Fehler / Falle
CB = sym('☐')

st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
st["brief"] = ParagraphStyle("brief", parent=st["cell"], fontSize=10, leading=13.2, spaceAfter=4)

s = [
    R("telc Deutsch B2 · Schreiben · Prüfungstraining", "kick"),
    R("Schriftlicher Ausdruck: die formelle E-Mail", "h1"),
    R(
        "Eine Bitte um Informationen oder eine Beschwerde – sachlich, höflich und gut gegliedert. "
        "Mit diesem Blatt üben Sie Aufbau, Redemittel und Zeitplan und schreiben zwei Prüfungsaufgaben.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Zeit</b>", "30 Minuten (am Ende der schriftlichen Prüfung, nach Lesen, Sprachbausteinen und Hören)"],
            ["<b>Aufgabe</b>",
             "Sie <b>wählen eine von zwei Aufgaben</b> (A oder B) – meist eine <b>Bitte um Informationen</b> oder eine "
             "<b>Beschwerde</b> – und schreiben einen formellen Brief bzw. eine formelle E-Mail."],
            ["<b>Leitpunkte</b>",
             "Zu jeder Aufgabe gibt es <b>vier Leitpunkte</b>. Bearbeiten Sie <b>mindestens drei</b> davon in einer sinnvollen "
             "Reihenfolge – mit passender Einleitung und passendem Schluss."],
            ["<b>Länge</b>", "mindestens <b>150 Wörter</b>"],
            ["<b>Punkte</b>",
             "<b>45 Punkte</b> von 225 im schriftlichen Teil. Zum Bestehen brauchen Sie mindestens 60 % im schriftlichen Teil "
             "(135 von 225 Punkten) – Schreiben zählt also spürbar mit."],
        ],
        [28, 146],
        head=False,
    ),
    Spacer(1, 6),
    R("Der Aufbau – immer gleich", "h3"),
    table(
        [
            ["<b>Teil</b>", "<b>Inhalt</b>", "<b>Beispiel</b>"],
            ["Betreff", "Worum geht es? Kurz und konkret.", "Anfrage zum Abendstudium Soziale Arbeit"],
            ["Anrede", "formell, danach Komma, weiter mit Kleinbuchstaben", "Sehr geehrte Damen und Herren,"],
            ["Einleitung", "Bezug (Anzeige, Bestellung …) + Grund des Schreibens", "mit großem Interesse habe ich … gelesen."],
            ["Leitpunkte", "mind. 3 Leitpunkte, <b>je ein Absatz</b> mit 2–3 Sätzen", "Zunächst würde ich gern wissen, …"],
            ["Schluss", "Bitte, Erwartung oder Frist", "Über eine baldige Antwort würde ich mich freuen."],
            ["Gruß", "formell + vollständiger Name", "Mit freundlichen Grüßen<br/>Nadia Rahimi"],
        ],
        [24, 72, 78],
    ),
]

s += [
    R("Strategie: 30 Minuten gut einteilen", "h2"),
    R(f"<b>1.</b> <b>2–3 Minuten planen:</b> Aufgabe wählen (die, zu der Ihnen mehr einfällt) und zu jedem Leitpunkt Stichwörter notieren.", "item"),
    R(f"<b>2.</b> <b>Gliederung festlegen:</b> Betreff – Anrede – Einleitung – Leitpunkte in sinnvoller Reihenfolge – Schluss – Gruß. "
      "Die Reihenfolge der Leitpunkte auf dem Blatt dürfen Sie ändern.", "item"),
    R(f"<b>3.</b> <b>Schreiben:</b> Jeder Leitpunkt bekommt einen eigenen Absatz. Nicht nur fragen – auch die eigene Situation "
      "und einen Grund nennen („Da ich im Schichtdienst arbeite, …“).", "item"),
    R(f"<b>4.</b> <b>Die letzten 5 Minuten prüfen:</b> Verbposition, Endungen, Großschreibung und durchgehend die Sie-Form "
      "(<i>Sie, Ihnen, Ihr</i> groß).", "item"),
    box(
        R("<b>Tipp:</b> Lieber drei Leitpunkte ausführlich als vier nur kurz. Und lieber 180 sichere Wörter als 250 mit vielen Fehlern."),
        NOTE,
        GELB,
    ),
    KeepTogether([
        R("Typische Fallen", "h3"),
        R(f"{X('✗')} Nur Fragen aneinanderreihen, ohne eigene Situation oder Begründung.", "item"),
        R(f"{X('✗')} Einen Leitpunkt nur in einem Halbsatz erwähnen – dafür gibt es kaum Punkte.", "item"),
        R(f"{X('✗')} Zu informell („Hallo“, „Liebe Grüße“, „Schickt mir …“) oder zu unhöflich bei der Beschwerde („Sie müssen sofort …“).", "item"),
        R(f"{X('✗')} Satzbau-Klassiker: <i>weil</i> mit Verb am Ende vergessen, <i>deshalb</i> ohne Verb auf Position 2, "
      "<i>wegen</i> mit Dativ statt Genitiv.", "item"),
    ]),
]

# ── Redemittel ──
s += [
    R("Redemittel für die formelle E-Mail", "h2"),
    table(
        [
            ["<b>Wofür?</b>", "<b>Redemittel</b>"],
            ["<b>Einleitung, Bezug</b>",
             f"{K('Ich beziehe mich auf Ihre Anzeige in')} … {K('vom')} … · {K('Mit großem Interesse habe ich')} … {K('gelesen.')} · "
             f"{K('Ich wende mich an Sie, weil')} … · {K('Am')} … {K('habe ich bei Ihnen')} … {K('bestellt / gebucht.')}"],
            ["<b>um Informationen bitten</b>",
             f"{K('Ich würde gern wissen, ob / wann / wie')} … · {K('Könnten Sie mir bitte mitteilen,')} …? · "
             f"{K('Außerdem interessiert mich,')} … · {K('Ich wäre Ihnen dankbar, wenn Sie mir')} … {K('zusenden könnten.')}"],
            ["<b>eigene Situation</b>",
             f"{K('Da ich')} … {K('arbeite, wäre')} … {K('für mich ideal.')} · {K('Für mich ist besonders wichtig, dass')} … · "
             f"{K('In meinem Heimatland habe ich')} … "],
            ["<b>sich beschweren</b>",
             f"{K('Leider muss ich mich über')} … {K('beschweren.')} · {K('Laut Ihrer Website / Ihrem Katalog')} … "
             f"{K('Tatsächlich jedoch')} … · {K('Darüber hinaus')} … · {K('Hinzu kommt, dass')} …"],
            ["<b>Forderung</b>",
             f"{K('Ich erwarte daher, dass Sie')} … · {K('Ich bitte Sie,')} … {K('zu erstatten.')} · "
             f"{K('Andernfalls sehe ich mich gezwungen,')} … "],
            ["<b>Schluss</b>",
             f"{K('Über eine baldige Antwort würde ich mich freuen.')} · {K('Bitte teilen Sie mir bis zum')} … {K('mit, wie')} … · "
             f"{K('Für Rückfragen stehe ich Ihnen gern zur Verfügung.')}"],
            ["<b>Absätze verbinden</b><br/>(dann Verb auf Position 2)",
             f"{K('Zunächst')} … · {K('Außerdem')} … · {K('Darüber hinaus')} … · {K('Deshalb')} … · {K('Schließlich')} …"],
        ],
        [38, 136],
    ),
]

# ── Übung 1 ──
u1h = task(
    1,
    "Zu informell! Schreiben Sie es formell.",
    "Diese Sätze passen nicht in eine formelle E-Mail. Formulieren Sie sie neu – höflich und sachlich.",
    1,
)
u1 = [
    "Hallo Leute,",
    "Schickt mir mal Infos zu dem Kurs.",
    "Ich will wissen, was das Ganze kostet.",
    "Das Sofa war total kaputt, echt mies!",
    "Ihr müsst mir sofort mein Geld zurückgeben!",
    "LG, Amira",
]
u1t = Table([[R("<b>informell</b>", "cell"), R("<b>formell</b>", "cell")]] + [[R(f"{i}. „{t}“", "cell"), ""] for i, t in enumerate(u1, 1)],
            colWidths=[88 * mm, 86 * mm], rowHeights=[None] + [8.5 * mm] * len(u1))
u1t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LINEBELOW", (0, 1), (-1, -1), 0.4, LINE),
                         ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
s += [KeepTogether(u1h + [u1t])]

# ── Übung 2 ──
u2h = task(
    2,
    "Welcher Teil der E-Mail ist das?",
    "Ordnen Sie zu: <b>B</b> Betreff · <b>E</b> Einleitung · <b>L</b> Leitpunkt · <b>S</b> Schluss",
    2,
)
u2 = [
    "Bitte teilen Sie mir bis zum 20. März mit, ob ein Austausch möglich ist.",
    "Anfrage zu Ihrem Kurs „Deutsch für Pflegeberufe B2“",
    "Ich beziehe mich auf Ihre Anzeige im Stadtmagazin vom 3. Februar.",
    "Außerdem interessiert mich, ob der Kurs auch online angeboten wird.",
    "Für Rückfragen stehe ich Ihnen gern zur Verfügung.",
    "Tatsächlich jedoch fehlten bei der Lieferung zwei Stühle.",
    "Ich wende mich an Sie, weil ich mit Ihrem Reparaturservice sehr unzufrieden bin.",
    "Beschwerde über die Reparatur meiner Waschmaschine, Auftragsnummer 7741",
]
u2r = [R(f"{i}. {t}  <font color=\"#8A93A8\">____</font>", "item") for i, t in enumerate(u2, 1)]
s += [KeepTogether(u2h + u2r[:2])] + u2r[2:]

# ── Übung 3 ──
s += task(
    3,
    "Fehler finden",
    "In jedem Satz ist ein typischer Fehler. Schreiben Sie den Satz richtig.",
    2,
)
u3 = [
    "Ich schreibe Ihnen, weil die Heizung in meiner Wohnung seit Tagen funktioniert nicht.",
    "Wegen dem Streik konnte ich den Termin nicht wahrnehmen.",
    "Ich arbeite im Schichtdienst, deshalb ich brauche einen Kurs am Abend.",
    "Ich hätte Ihnen sehr dankbar, wenn Sie mir die Unterlagen schicken könnten.",
    "Bis heute habe ich keine Antwort von meinem Brief bekommen.",
    "Der Schaden hat bis heute nicht repariert.",
]
s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)]) for i, t in enumerate(u3, 1)]

# ── Übung 4 ──
s += [KeepTogether(task(
    4,
    "Leitpunkte ausbauen",
    "Ein Satz pro Leitpunkt ist zu wenig. Schreiben Sie 2–3 Sätze: Frage + eigene Situation + Grund.",
    3,
) + [R("1. Leitpunkt <i>Zeiten der Lehrveranstaltungen</i>: „Wann ist der Kurs?“", "item"), lines(2),
     R("2. Leitpunkt <i>Probleme bei der Lieferung</i>: „Das Sofa war kaputt.“", "item"), lines(2)])]

# ── Prüfungsaufgaben ──
s += [PageBreak()]
plan_t = Table([[R("<b>Nr.</b>", "cell"), R("<b>Leitpunkt</b>", "cell"), R("<b>Stichwörter (eigene Situation, Grund, Beispiel)</b>", "cell")]]
               + [["", "", ""] for _ in range(3)], colWidths=[14 * mm, 50 * mm, 110 * mm], rowHeights=[None] + [10 * mm] * 3)
plan_t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("GRID", (0, 0), (-1, -1), 0.4, LINE)]))
s += [
    R("Prüfungsaufgaben: Wählen Sie A oder B", "h2"),
    R("Wie in der Prüfung: <b>eine</b> Aufgabe wählen, <b>mindestens drei</b> der vier Leitpunkte in sinnvoller Reihenfolge, "
      "passende Einleitung und passender Schluss, <b>mindestens 150 Wörter</b>, <b>30 Minuten</b>. "
      "Schreiben Sie auf ein liniertes Blatt oder am Computer – die zweite Aufgabe an einem anderen Tag.",
      "p"),
]
anz_a = Table([[R("<b>Hochschule Ruhrtal</b><br/>Campus Bochum<br/><br/><b>Bachelor Soziale Arbeit –<br/>berufsbegleitend</b>", "cell"),
                 R("– Studium neben dem Beruf in acht Semestern<br/>– Präsenzphasen und Online-Lernen<br/>"
                   "– auch für Berufserfahrene ohne Abitur<br/>– Beginn jeweils zum Wintersemester<br/>"
                   "Studienberatung: beratung@hs-ruhrtal.example", "cell")]], colWidths=[55 * mm, 95 * mm])
anz_a.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("LEFTPADDING", (0, 0), (-1, -1), 9)]))
s += [
    KeepTogether([
        R("Aufgabe A: Bitte um Informationen", "h3"),
        R("Sie arbeiten seit einigen Jahren im sozialen Bereich und möchten sich weiterqualifizieren. "
          "Im Stadtmagazin haben Sie diese Anzeige gelesen:", "p"),
        anz_a,
        Spacer(1, 4),
        R("Schreiben Sie eine E-Mail an die Studienberatung und bitten Sie um weitere Informationen. "
          "Wählen Sie dazu mindestens drei der folgenden Punkte aus:", "p"),
        table(
            [[f"{CB} Voraussetzungen für die Zulassung", f"{CB} Zeiten der Lehrveranstaltungen"],
             [f"{CB} Kosten und Finanzierung", f"{CB} persönlicher Beratungstermin"]],
            [87, 87],
            head=False,
        ),
    ]),
    Spacer(1, 6),
    KeepTogether([
        R("Aufgabe B: Beschwerde", "h3"),
        R("Sie haben im Online-Shop „WohnWerk“ ein Schlafsofa für 890 Euro bestellt. Auf der Website stand: "
          "„Lieferung innerhalb von zehn Werktagen – Aufbau inklusive“. Bei der Lieferung und danach lief einiges schief.", "p"),
        R("Schreiben Sie eine Beschwerde an den Online-Shop. Wählen Sie dazu mindestens drei der folgenden Punkte aus:", "p"),
        table(
            [[f"{CB} Grund Ihres Schreibens", f"{CB} Probleme bei der Lieferung"],
             [f"{CB} Ihre bisherigen Versuche, das Problem zu lösen", f"{CB} Was Sie jetzt erwarten"]],
            [87, 87],
            head=False,
        ),
    ]),
    Spacer(1, 6),
    KeepTogether([
        R("Ihr Schreibplan (2–3 Minuten)", "h3"),
        R("Aufgabe: A {0} B {0} – Notieren Sie zu drei Leitpunkten Stichwörter und die Reihenfolge (1, 2, 3).".format(CB), "small"),
        plan_t,
    ]),
    Spacer(1, 6),
    box(R("<b>Checkliste nach dem Schreiben:</b>  "
          f"{CB}&nbsp;mind. drei Leitpunkte ausführlich (je ein Absatz)&nbsp;&nbsp; {CB}&nbsp;Betreff, formelle Anrede, Gruß&nbsp;&nbsp; "
          f"{CB}&nbsp;Einleitung mit Grund, Schluss mit Bitte/Erwartung&nbsp;&nbsp; {CB}&nbsp;Absätze und Konnektoren&nbsp;&nbsp; "
          f"{CB}&nbsp;durchgehend Sie-Form, höflich-formell&nbsp;&nbsp; {CB}&nbsp;Nebensätze, Passiv, Nomen-Verb-Verbindungen&nbsp;&nbsp; "
          f"{CB}&nbsp;mindestens 150 Wörter&nbsp;&nbsp; {CB}&nbsp;Endungen, Verbposition, Rechtschreibung geprüft", "cell"), HELLGRUEN, GRUEN),
]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen und Mustertexte <font size=\"9.5\" color=\"#566078\">  erst üben, dann nachschauen!</font>", "h2")]
l1 = [
    "Sehr geehrte Damen und Herren,",
    "Könnten Sie mir bitte weitere Informationen zu dem Kurs zusenden?",
    "Ich würde gern wissen, wie viel der Kurs kostet.",
    "Leider war das Sofa bei der Lieferung beschädigt.",
    "Ich erwarte daher, dass Sie mir den Kaufpreis erstatten.",
    "Mit freundlichen Grüßen / Amira Haddad (Vor- und Nachname)",
]
s += [R("Übung 1 – Beispiele (andere Lösungen sind möglich)", "solh"), R("  ·  ".join(f"{i}. {t}" for i, t in enumerate(l1, 1)), "sol")]
s += [R("Übung 2", "solh"), R("1. S  ·  2. B  ·  3. E  ·  4. L  ·  5. S  ·  6. L  ·  7. E  ·  8. B", "sol")]
l3 = [
    "…, weil die Heizung in meiner Wohnung seit Tagen nicht <b>funktioniert</b>. (Nebensatz: Verb am Ende)",
    "<b>Wegen des Streiks</b> konnte ich den Termin nicht wahrnehmen. (wegen + Genitiv)",
    "…, deshalb <b>brauche ich</b> einen Kurs am Abend. (deshalb: Verb auf Position 2)",
    "Ich <b>wäre</b> Ihnen sehr dankbar, wenn … (dankbar sein: Konjunktiv II „wäre“)",
    "… keine Antwort <b>auf meinen Brief</b> bekommen. (Antwort auf + Akkusativ)",
    "Der Schaden <b>ist</b> bis heute nicht repariert <b>worden</b>. (Passiv Perfekt)",
]
s += [R("Übung 3", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
s += [R("Übung 4 – Beispiele", "solh"),
      R("1. Außerdem würde ich gern wissen, an welchen Tagen die Präsenzphasen stattfinden. Da ich im Schichtdienst arbeite, "
        "wären Termine am Wochenende für mich ideal.", "sol"),
      R("2. Laut Ihrer Website sollte das Sofa unbeschädigt geliefert werden. Tatsächlich war der Bezug jedoch an der linken Seite "
        "eingerissen, sodass ich das Sofa nicht benutzen kann.", "sol")]

muster_a = (
    "<b>Betreff: Anfrage zum berufsbegleitenden Bachelor Soziale Arbeit</b><br/><br/>"
    "Sehr geehrte Damen und Herren,<br/><br/>"
    "mit großem Interesse habe ich Ihre Anzeige im Stadtmagazin gelesen. Ich arbeite seit drei Jahren als Betreuungsassistentin "
    "in einer Einrichtung für Geflüchtete und möchte mich gern fachlich weiterqualifizieren. Deshalb hätte ich einige Fragen.<br/><br/>"
    "Zunächst würde ich gern wissen, welche Voraussetzungen ich für die Zulassung erfüllen muss. In meinem Heimatland habe ich "
    "Psychologie studiert, mein Abschluss ist in Deutschland jedoch noch nicht anerkannt. Könnten Sie mir bitte mitteilen, "
    "ob ich trotzdem zugelassen werden kann und welche Unterlagen ich einreichen muss?<br/><br/>"
    "Außerdem interessiert mich, an welchen Tagen die Präsenzphasen stattfinden. Da ich im Schichtdienst arbeite, "
    "wären Blockseminare am Wochenende für mich ideal.<br/><br/>"
    "Darüber hinaus wäre ich Ihnen dankbar, wenn Sie mir Informationen zu den Studiengebühren zusenden könnten. "
    "Ich möchte das Studium nämlich selbst finanzieren. Gibt es die Möglichkeit, die Gebühren in Raten zu zahlen?<br/><br/>"
    "Über eine baldige Antwort würde ich mich sehr freuen.<br/><br/>"
    "Mit freundlichen Grüßen<br/>Nadia Rahimi"
)
muster_b = (
    "<b>Betreff: Beschwerde über die Lieferung meines Schlafsofas, Bestellnummer WW-30517</b><br/><br/>"
    "Sehr geehrte Damen und Herren,<br/><br/>"
    "am 2. Oktober habe ich in Ihrem Online-Shop das Schlafsofa „Lina“ in Grau zum Preis von 890 Euro bestellt. "
    "Leider muss ich mich über die Lieferung beschweren.<br/><br/>"
    "Laut Ihrer Website sollte das Sofa innerhalb von zehn Werktagen geliefert und aufgebaut werden. Tatsächlich kam es jedoch "
    "erst nach fast vier Wochen. Außerdem war der Bezug an der linken Seite eingerissen, und das Sofa wurde nicht aufgebaut, "
    "obwohl der Aufbau im Preis enthalten war.<br/><br/>"
    "Daraufhin habe ich Ihren Kundenservice zweimal angerufen und eine E-Mail mit Fotos geschickt. Man hat mir versprochen, "
    "dass sich jemand bei mir meldet. Bis heute habe ich jedoch keine Antwort auf meine E-Mail erhalten.<br/><br/>"
    "Ich erwarte daher, dass Sie den beschädigten Bezug innerhalb von zwei Wochen kostenlos austauschen. Für den fehlenden "
    "Aufbau und die lange Wartezeit bitte ich Sie außerdem um eine angemessene Preisminderung.<br/><br/>"
    "Bitte teilen Sie mir bis zum 15. November mit, wie Sie das Problem lösen werden.<br/><br/>"
    "Mit freundlichen Grüßen<br/>" + fallback("Tomasz Wiśniewski")
)
st["brief"].fontSize = 9; st["brief"].leading = 11.2; st["brief"].spaceAfter = 3.5
paras = lambda t: [R(x, "brief") for x in t.split("<br/><br/>")]
mt = Table([[R("<b>Mustertext Aufgabe A</b> (Zulassung, Zeiten, Kosten – drei von vier Leitpunkten reichen)", "small"),
             R("<b>Mustertext Aufgabe B</b> (alle vier Leitpunkte)", "small")],
            [paras(muster_a), paras(muster_b)]], colWidths=[87 * mm, 87 * mm])
mt.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BACKGROUND", (0, 1), (-1, 1), HELLGRUEN),
                        ("LINEBEFORE", (0, 1), (0, 1), 3, GRUEN), ("LINEBEFORE", (1, 1), (1, 1), 3, GRUEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7)]))
s += [Spacer(1, 4), mt,
      R("Die Mustertexte haben rund 150–170 Wörter. Ihr Text darf anders aussehen – wichtig sind Leitpunkte, Aufbau und Stil.", "small")]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
