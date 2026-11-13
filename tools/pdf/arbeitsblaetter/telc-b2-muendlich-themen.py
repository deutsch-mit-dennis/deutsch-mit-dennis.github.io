# Arbeitsblatt telc Deutsch B2: Mündliche Prüfung – 7 Themen für Teil 1 und Textwiedergabe in Teil 2
# Format laut tools/pdf/b2-formate-offiziell.md (telc Deutsch B2, Übungstest 1, 2019): Teil 1 je Person höchstens 1½ Min. zu
# 1 von 7 Themen (zu Hause vorbereitet), danach Fragen; Teil 2 Zeitungstext höchstens 1 Min. wiedergeben, dann diskutieren.
# Eigene Themen und erfundene Texte, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-muendlich-themen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle
from reportlab.lib.colors import HexColor

SLUG = "telc-b2-muendlich-themen"
TITLE = "telc B2 Mündliche Prüfung: 7 Themen für Teil 1 und Textwiedergabe in Teil 2"
HEAD = "telc B2 Mündlich: 7 Themen (Teil 1) und Textwiedergabe (Teil 2)"  # page header (max. 70 characters)
LEVEL = "B2"
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
st["card"] = ParagraphStyle("card", parent=st["cell"], fontSize=9.5, leading=12.3)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.6)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.8, spaceAfter=2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["dlg"] = ParagraphStyle("dlg", parent=st["cell"], fontSize=9.4, leading=12.3, spaceAfter=2, leftIndent=12, firstLineIndent=-12)
st["mw"] = ParagraphStyle("mw", parent=st["cell"], fontSize=9.4, leading=12.3)


def card(title, body, width=86):
    t = Table([[R(f"<b>{title}</b>", "card")], [R(body, "card")]], colWidths=[width * mm])
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.8, HexColor("#2341B5")), ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 7),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 4),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    return t


def pair(a, b):
    t = Table([[a, b]], colWidths=[88 * mm, 88 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    return t


def notes(head, widths, h):
    t = Table([[R(f"<b>{x}</b>", "cell") for x in head], [""] * len(head)], colWidths=[w * mm for w in widths], rowHeights=[None, h * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("GRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2 Mündliche Prüfung: 7 Themen für Teil 1 und Textwiedergabe in Teil 2", "h1"),
    R("Sieben eigene Themen mit Stichpunkt-Gerüst zur Vorbereitung zu Hause, eine Musterpräsentation – und Training für die "
      "kurze Wiedergabe eines Zeitungstextes am Anfang von Teil 2.", "lead"),
    box([
        R("<b>So läuft der Teil (laut Modelltest, telc 2019)</b>", "h3"),
        table(
            [
                ["<b>Teil 1</b><br/>Über Erfahrungen sprechen", "Sie wählen <b>1 von 7 Themen</b> und bereiten es <b>zu Hause</b> vor. "
                 "In der Prüfung sprechen Sie <b>höchstens 1½ Minuten</b>, danach stellt Ihre Partnerin / Ihr Partner Fragen. "
                 "Dann tauschen Sie die Rollen. Dauer ca. 5 Minuten, <b>25 Punkte</b>."],
                ["<b>Teil 2</b><br/>Diskussion", "Jede Person hat einen <b>kontroversen Zeitungstext</b>, gelesen in der Vorbereitungszeit. "
                 "Sie geben ihn zuerst <b>kurz wieder (höchstens 1 Minute)</b>, dann diskutieren Sie und machen Vorschläge. "
                 "Dauer ca. 5 Minuten, <b>25 Punkte</b>."],
                ["<b>Rahmen</b>", "Paarprüfung, ca. 15 Minuten (Teil 1–3). <b>20 Minuten Vorbereitung</b> für Teil 2 und 3. Notizen nur "
                 "auf gestempelten Blättern: mitnehmen ja, ablesen nein."],
                ["<b>Bewertung</b><br/>je Teil", "Ausdrucksfähigkeit (max. 7) · Aufgabenbewältigung (max. 7) · Formale Richtigkeit "
                 "(max. 7) · Aussprache und Intonation (max. 4)"],
            ],
            [34, 120],
            head=False,
        ),
    ], SOFT, None),
]

s += [
    R("Teil 1: So bauen Sie Ihre 1½ Minuten", "h2"),
    table(
        [
            ["<b>Schritt</b>", "<b>Inhalt</b>", "<b>Redemittel</b>"],
            ["1 Einstieg", "Thema nennen, kurz sagen, warum", f"{K('Ich möchte über')} … {K('sprechen, weil')} …"],
            ["2 Erfahrung", "wann, wo, was ist passiert – mit einem konkreten Moment",
             f"{K('Angefangen hat alles, als')} … · {K('Ich erinnere mich noch genau an')} …"],
            ["3 Bedeutung", "Gefühle, Schwierigkeiten, was sich verändert hat",
             f"{K('Am schwierigsten war für mich')} … · {K('Seitdem')} …"],
            ["4 Schluss", "Rückblick, Tipp oder Vergleich",
             f"{K('Rückblickend würde ich sagen, dass')} … · {K('Ich kann jedem empfehlen,')} …"],
        ],
        [26, 66, 82],
    ),
    Spacer(1, 4),
    box(R("<b>Faustregel:</b> Gesprochen sind 1½ Minuten etwa 180–200 Wörter. Üben Sie mit der Stoppuhr am Handy. Lernen Sie den Text "
          "<b>nicht</b> auswendig – merken Sie sich nur die vier Stichpunkte und je ein Beispiel. Bereiten Sie mehrere Themen vor: "
          "Welche Themen in der Prüfung zur Wahl stehen, wissen Sie vorher nicht.", "cell"), NOTE, GELB),
]

# ── 7 Themen ──
themen = [
    ("Thema 1 · Ein Neuanfang an einem neuen Ort",
     "– wann und wohin, warum gerade dorthin<br/>– erste Eindrücke: Was war fremd, was angenehm?<br/>"
     "– größte Schwierigkeit und wie Sie sie gelöst haben<br/>– was heute anders ist",
     "Was hast du am Anfang am meisten vermisst?"),
    ("Thema 2 · Wie ich eine Sprache gelernt habe",
     "– welche Sprache, wann, warum<br/>– Ihre Methode (Kurs, Serien, Tandem …)<br/>"
     "– ein Rückschlag oder ein peinlicher Moment<br/>– Ihr bester Tipp für andere",
     "Welche Methode würdest du heute nicht mehr nutzen?"),
    ("Thema 3 · Eine Arbeit, die mich geprägt hat",
     "– Tätigkeit, Ort, wie lange<br/>– ein typischer Arbeitstag<br/>"
     "– was Sie dort gelernt haben (fachlich und menschlich)<br/>– was davon Ihnen heute noch hilft",
     "Würdest du diese Arbeit wieder machen?"),
    ("Thema 4 · Ein Fest, das in meiner Familie wichtig ist",
     "– Anlass und Zeitpunkt<br/>– Ablauf: Essen, Bräuche, Gäste<br/>"
     "– Ihre Rolle früher und heute<br/>– Vergleich: Wie feiern Sie es in Deutschland?",
     "Was davon möchtest du an deine Kinder oder Freunde weitergeben?"),
    ("Thema 5 · Ein Mensch, der mir geholfen hat",
     "– wer, woher Sie die Person kennen<br/>– die Situation, in der Sie Hilfe brauchten<br/>"
     "– wie genau die Person geholfen hat<br/>– was Sie selbst heute weitergeben",
     "Habt ihr heute noch Kontakt?"),
    ("Thema 6 · Ein Hobby, das mir Kraft gibt",
     "– wie und wann Sie angefangen haben<br/>– wie oft, wo, mit wem<br/>"
     "– was es Ihnen gibt (Ruhe, Kontakte, Sprache …)<br/>– Empfehlung für andere",
     "Wie viel Zeit kostet dich das pro Woche?"),
    ("Thema 7 · Eine Reise, die anders verlief als geplant",
     "– Ziel, Anlass, Plan<br/>– was schiefging oder überraschend war<br/>"
     "– wie Sie reagiert haben<br/>– was Sie daraus gelernt haben",
     "Würdest du noch einmal dorthin fahren?"),
]
cards = [card(t, f"{b}<br/><font color=\"#566078\"><i>Mögliche Nachfrage: {q}</i></font>") for t, b, q in themen]
cards.append(card("So arbeiten Sie mit den Gerüsten",
                  "1. Zwei bis drei Themen auswählen.<br/>2. Zu jedem Stichpunkt ein konkretes Beispiel notieren.<br/>"
                  "3. Laut sprechen, Zeit stoppen (max. 1½ Min.).<br/>4. Partner/in stellt die Nachfrage – frei antworten."))
s += [PageBreak(), R("Teil 1: Sieben Themen mit Stichpunkt-Gerüst", "h2"),
      R("Eigene Übungsthemen im Stil der Prüfung. Wählen Sie ein Thema, das Sie wirklich erlebt haben – dann sprechen Sie natürlicher.", "small")]
s += [pair(cards[i], cards[i + 1]) for i in range(0, 8, 2)]
s += [Spacer(1, 4), KeepTogether([R("Mein Stichpunktzettel (nur Stichwörter, keine Sätze):", "small"),
                                  notes(["Einstieg", "Erfahrung", "Bedeutung", "Schluss / Tipp"], [43.5] * 4, 24)])]

# ── Musterpräsentation ──
muster = [
    R("<b>Mariam:</b> Ich möchte über ein Hobby sprechen, das mir seit vier Jahren Kraft gibt: Ich singe in einem Chor. Angefangen "
      "hat das eher zufällig. Kurz nach meinem Umzug nach Deutschland kannte ich kaum jemanden, und eine Nachbarin hat mich einfach "
      "zu einer Probe mitgenommen. Ehrlich gesagt hatte ich große Angst, weil ich die Liedtexte kaum verstanden habe. Aber niemand "
      "hat erwartet, dass ich perfekt bin. Heute probe ich jeden Dienstagabend zwei Stunden, und vor Weihnachten geben wir sogar "
      "drei Konzerte. Was mir das Singen gibt? Erstens kann ich nach einem langen Arbeitstag richtig abschalten – beim Singen denkt "
      "man an nichts anderes. Zweitens hat der Chor mein Deutsch verbessert, vor allem die Aussprache, weil man jedes Wort bewusst "
      "formen muss. Und drittens habe ich dort Freundinnen gefunden, die ich auch außerhalb der Proben treffe. Rückblickend war "
      "diese erste Probe einer der wichtigsten Abende in meiner ersten Zeit hier. Allen, die neu in einer Stadt sind, kann ich nur "
      "empfehlen: Sucht euch eine Gruppe mit einem gemeinsamen Hobby – über Musik oder Sport kommt man viel leichter ins Gespräch "
      "als im Treppenhaus. <font color=\"#566078\"><i>(Aufbau: Einstieg · Erfahrung mit konkretem Moment · drei Gründe · "
      "Rückblick und Tipp)</i></font>", "dlg"),
    R("<b>Tomasz:</b> Danke, das klingt toll. Wie viel Zeit kostet dich das pro Woche?", "dlg"),
    R("<b>Mariam:</b> Normalerweise nur die zwei Stunden am Dienstag. Vor Konzerten kommen manchmal Proben am Samstag dazu – "
      "aber das mache ich gern.", "dlg"),
    R("<b>Tomasz:</b> Und singt ihr auch Lieder aus anderen Ländern?", "dlg"),
    R("<b>Mariam:</b> Ja, inzwischen schon. Letztes Jahr habe ich dem Chor ein Lied aus meiner Heimat beigebracht. Darauf bin ich "
      "ehrlich gesagt ein bisschen stolz.", "dlg"),
]


# ── Teil 2: Textwiedergabe ──
s += [
    PageBreak(),
    R("Teil 2: Den Zeitungstext kurz wiedergeben (höchstens 1 Minute)", "h2"),
    R("Die Wiedergabe ist der Einstieg in die Diskussion. Ihre Partnerin / Ihr Partner soll danach wissen, worum es geht und "
      "welche Positionen es gibt. Ihre eigene Meinung kommt erst danach in der Diskussion.", "p"),
    table(
        [
            ["<b>Baustein</b>", "<b>Was sagen Sie?</b>", "<b>Redemittel</b>"],
            ["1 Thema", "Worum geht es? Was ist neu?", f"{K('In meinem Text geht es um')} … · {K('Der Artikel berichtet, dass')} …"],
            ["2 Dafür", "Wer ist dafür, mit welchem Hauptargument?", f"{K('Befürworter argumentieren, dass')} … · {K('Laut')} … {K('soll')} …"],
            ["3 Dagegen", "Wer ist dagegen, warum?", f"{K('Kritiker befürchten, dass')} … · {K('Dagegen spricht laut')} …{K(', dass')} …"],
            ["4 Überleitung", "offene Frage an die Partnerin / den Partner", f"{K('Die Frage ist also, ob')} … {K('Wie siehst du das?')}"],
        ],
        [26, 62, 86],
    ),
    Spacer(1, 4),
    R("Typische Fehler", "h3"),
    R("<b>Vorlesen oder Sätze abschreiben</b> – sagen Sie es mit eigenen Worten. · <b>Zu viele Zahlen und Details</b> – nur das "
      "Wichtigste. · <b>Eigene Meinung mischen</b> – erst wiedergeben, dann bewerten. · <b>Zu lang</b> – etwa 80–110 Wörter "
      "reichen; das ist meist deutlich unter einer Minute.", "p"),
]

u1 = [
    ("„Wir verlieren Kundschaft, wenn das so weitergeht“, klagt ein Bäcker.", "Ein Bäcker befürchtet, dass …"),
    ("Nach Ansicht des Verbands ist die Maßnahme „reine Geldverschwendung“.", "Der Verband hält …"),
    ("Die Stadt rechnet mit 20 Prozent weniger Lärm.", "Laut Stadt soll …"),
    ("„Für ältere Menschen ist das eine echte Hürde“, sagt eine Sozialarbeiterin.", "Eine Sozialarbeiterin weist darauf hin, dass …"),
]
s += task(1, "Mit eigenen Worten wiedergeben", "Formen Sie die Sätze aus Zeitungstexten um. Benutzen Sie den Satzanfang.", 2)
for i, (a, b) in enumerate(u1, 1):
    s += [R(f"{i}. {a}<br/>{ARROW} <i>{b}</i>", "item"), lines(1, 32)]

texte = [
    ("Text A · Supermarkt ohne Kassiererin?",
     "Immer mehr Supermärkte setzen auf Kassen, an denen die Kundschaft ihre Waren selbst scannt. Eine große Handelskette hat "
     "angekündigt, in ihren Filialen künftig meist nur noch eine Kasse mit Personal zu öffnen. Das Unternehmen argumentiert, die "
     "Kundinnen und Kunden sparten Zeit, und die Beschäftigten könnten sich mehr um Beratung und volle Regale kümmern. "
     "Sozialverbände sehen das kritisch: Ältere Menschen und Menschen mit wenig Technikerfahrung fühlten sich an den Automaten oft "
     "überfordert. Die Gewerkschaft befürchtet außerdem, dass langfristig Arbeitsplätze wegfallen. Eine Kundin bringt es auf den "
     "Punkt: „Schnell geht es nur, wenn das Gerät funktioniert.“"),
    ("Text B · Tempo 30 fast überall",
     "Die Stadt Lindenau will auf fast allen Straßen Tempo 30 einführen, zunächst als zweijähriger Modellversuch. Nur einige "
     "große Hauptstraßen sollen ausgenommen bleiben. Die Stadtverwaltung verspricht weniger Unfälle, weniger Lärm und mehr "
     "Sicherheit für Kinder und Radfahrende. Man komme kaum langsamer ans Ziel, weil man ohnehin oft an Ampeln warte. Der "
     "Handelsverband und viele Pendlerinnen und Pendler sind dagegen: Lieferungen würden teurer, Busse bräuchten länger, und "
     "manche Autofahrer würden auf ruhige Wohnstraßen ausweichen. Ein Anwohner meint dagegen: „Endlich kann mein Sohn allein "
     "zur Schule radeln.“"),
    ("Text C · Café ohne Bargeld",
     "Ein beliebtes Café in der Innenstadt nimmt seit Anfang des Monats kein Bargeld mehr an. Inhaber Mateo Rinaldi begründet "
     "das mit Sicherheit und Zeit: Abends müsse niemand mehr Geld zählen und zur Bank bringen, und an der Kasse gehe alles "
     "schneller. Viele junge Gäste begrüßen die Entscheidung. Verbraucherschützer warnen dagegen: Nicht jeder habe eine Karte "
     "oder wolle mit dem Handy zahlen, und mit Bargeld behalte man seine Ausgaben besser im Blick. Außerdem hinterlasse jede "
     "Kartenzahlung Datenspuren. Rinaldi will die Regel nach einem halben Jahr überprüfen."),
]
u2h = task(2, "Drei Texte wiedergeben", "Lesen Sie einen Text (ca. 2 Minuten). Notieren Sie nur Stichwörter zu Thema, Dafür, "
          "Dagegen. Geben Sie den Text dann frei wieder – Partner/in stoppt die Zeit (höchstens 1 Minute). Alle Texte sind erfunden.", 3)
for n, (title, body) in enumerate(texte):
    s += [KeepTogether((u2h if n == 0 else []) + [box([R(f"<b>{title}</b>", "txt"), R(body, "txt")], SOFT, None), Spacer(1, 2),
                        notes(["Thema / Was ist neu?", "Dafür (wer? warum?)", "Dagegen (wer? warum?)"], [58] * 3, 14), Spacer(1, 6)])]

s += [box(R("<b>Checkliste nach dem Üben:</b>&nbsp; Thema genannt? · Dafür und Dagegen mit „wer?“ und „warum?“ · "
                          "eigene Worte statt Textsätze · höchstens 1 Minute · mit einer Frage an die Partnerin / den Partner "
                          "zur Diskussion übergeleitet?", "cell"), NOTE, GELB)]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen und Musterwiedergaben", "h2"),
      R("Andere Formulierungen sind möglich. Wichtig bei der Wiedergabe: alle vier Bausteine, eigene Worte, keine eigene Meinung.", "small")]
s += [R("Musterpräsentation Teil 1 zu Thema 6 (ca. 1½ Min., rund 180 Wörter) mit Nachfragen", "solh"), box(muster, HELLGRUEN, GRUEN)]
s += [R("Übung 1 · Mit eigenen Worten", "solh")]
l1 = [
    "Ein Bäcker befürchtet, dass er Kundinnen und Kunden verliert, wenn sich nichts ändert.",
    "Der Verband hält die Maßnahme für reine Geldverschwendung.",
    "Laut Stadt soll der Lärm um 20 Prozent sinken.",
    "Eine Sozialarbeiterin weist darauf hin, dass das für ältere Menschen eine große Hürde ist.",
]
s += [R(f"{i}. {t}", "sol") for i, t in enumerate(l1, 1)]
mw = [
    ("Text A (ca. 80 Wörter)",
     "In meinem Text geht es um Selbstbedienungskassen im Supermarkt. Eine große Handelskette will in ihren Filialen meistens "
     "nur noch eine Kasse mit Personal öffnen. Das Unternehmen argumentiert, dass die Kunden Zeit sparen und die Mitarbeiter mehr "
     "Zeit für Beratung haben. Kritiker sehen das anders: Sozialverbände sagen, dass ältere Menschen und Leute ohne viel "
     "Technikerfahrung mit den Automaten Probleme haben. Die Gewerkschaft befürchtet, dass Arbeitsplätze verloren gehen. "
     "Die Frage ist also, ob solche Kassen wirklich für alle ein Vorteil sind. Wie siehst du das?"),
    ("Text B (ca. 80 Wörter)",
     "Der Artikel berichtet, dass die Stadt Lindenau zwei Jahre lang auf fast allen Straßen Tempo 30 testen will. Die "
     "Stadtverwaltung erwartet weniger Unfälle und weniger Lärm, außerdem sollen Kinder und Radfahrer sicherer sein. Dass man "
     "länger braucht, glaubt sie nicht, weil man sowieso oft an Ampeln steht. Der Handelsverband und viele Pendler sind dagegen: "
     "Sie befürchten teurere Lieferungen, langsamere Busse und mehr Verkehr in Wohnstraßen. Die Frage ist also, ob mehr "
     "Sicherheit die Nachteile wert ist. Was meinst du?"),
    ("Text C (ca. 80 Wörter)",
     "In meinem Text geht es um ein Café, das kein Bargeld mehr annimmt. Der Inhaber sagt, dass das sicherer und schneller ist, "
     "weil niemand mehr abends Geld zählen und zur Bank bringen muss. Viele junge Gäste finden das gut. Verbraucherschützer "
     "kritisieren aber, dass nicht jeder eine Karte hat oder mit dem Handy zahlen möchte. Mit Bargeld kontrolliere man seine "
     "Ausgaben besser, und Kartenzahlungen hinterließen Daten. Nach einem halben Jahr will der Inhaber entscheiden, ob es dabei "
     "bleibt. Wie findest du das?"),
]
for t, b in mw:
    s += [R(f"Musterwiedergabe {t}", "solh"), box(R(b, "mw"), HELLGRUEN, GRUEN)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
