# Arbeitsblatt B1 Prüfung: telc Deutsch B1 – Leseverstehen Teil 1–3
# Format laut pruefung-fakten.js (telc-b1) und sim/telc-b1.js: Lesen + Sprachbausteine zusammen 90 Min.,
# Lesen 75 Punkte (Teil 1: 5 x 5, Teil 2: 5 x 5, Teil 3: 10 x 2,5). Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/telc-b1-leseverstehen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b1-leseverstehen"
TITLE = "telc B1 Leseverstehen: Überschriften, Detailverstehen, Anzeigen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B1"
BOX = sym("☐")
BL = '<font color="#8A93A8">______</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.4)
st["ad"] = ParagraphStyle("ad", parent=st["cell"], fontSize=9.4, leading=11.8)
st["art"] = ParagraphStyle("art", parent=st["cell"], fontSize=9.9, leading=13)
st["q"] = ParagraphStyle(
    "q", parent=st["item"], fontSize=10.3, leading=13, spaceAfter=0.5, spaceBefore=3
)
st["opt"] = ParagraphStyle(
    "opt", parent=st["item"], fontSize=10, leading=12.4, spaceAfter=0.3
)
st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5
)

s = [
    R("B1 · Prüfung · Arbeitsblatt · telc Deutsch B1", "kick"),
    R("telc B1: Leseverstehen", "h1"),
    R(
        "Überschriften zuordnen, einen Zeitungsartikel genau verstehen, passende Anzeigen finden – so trainieren Sie die drei "
        "Teile des Leseverstehens. Alle Texte sind eigene Übungstexte im Stil der Prüfung.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            [
                "<b>Lesen 1</b>",
                "5 kurze Zeitungsmeldungen, 10 Überschriften (a–j). Welche Überschrift passt zu welchem Text? "
                "5 Überschriften bleiben übrig.",
                "ca. 15 Min.",
                fallback("5 × 5 = 25"),
            ],
            [
                "<b>Lesen 2</b>",
                "Ein längerer Zeitungsartikel, 5 Aufgaben mit je drei Lösungen (a, b, c). Nur eine Lösung ist richtig.",
                "ca. 20 Min.",
                fallback("5 × 5 = 25"),
            ],
            [
                "<b>Lesen 3</b>",
                "10 Situationen, 12 Anzeigen (a–l). Jede Anzeige nur einmal. Für manche Situationen passt "
                "keine Anzeige – dann wählen Sie x.",
                "ca. 20 Min.",
                fallback("10 × 2,5 = 25"),
            ],
        ],
        [22, 104, 22, 26],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Leseverstehen und Sprachbausteine haben zusammen <b>90 Minuten</b>. Die Zeiten oben sind Empfehlungen – "
            "Sie teilen die Zeit selbst ein. Im Leseverstehen gibt es <b>75 Punkte</b>. Bestanden ist die schriftliche Prüfung mit "
            "mindestens 60 % (135 von 225 Punkten).",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# ── Strategien ──
s += [
    R("Vier Strategie-Tipps", "h2"),
    R(
        "<b>1. Erst die Aufgaben, dann die Texte.</b> Lesen Sie zuerst die Überschriften, Fragen oder Situationen und markieren Sie "
        "das wichtigste Wort.",
        "item",
    ),
    R(
        "<b>2. Hauptinformation suchen (Teil 1).</b> Fassen Sie jeden Text in drei bis vier Wörtern zusammen. Vergleichen Sie diese "
        "Zusammenfassung mit den Überschriften – nicht einzelne Wörter.",
        "item",
    ),
    R(
        "<b>3. Die Stelle im Text finden (Teil 2).</b> Die Aufgaben folgen meistens der Reihenfolge im Text. Unterstreichen Sie die "
        "Stelle, die Ihre Lösung zeigt.",
        "item",
    ),
    R(
        "<b>4. Alle Bedingungen prüfen (Teil 3).</b> Wer? Wann? Wo? Wie viel? Eine Anzeige passt nur, wenn <i>alle</i> Bedingungen "
        "stimmen. Wählen Sie x erst am Ende.",
        "item",
    ),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Achtung!</b>"],
            [
                "Lesen 1",
                "Zwei Überschriften haben das gleiche Thema – nur eine trifft die Hauptaussage. · Ein Wort aus der Überschrift "
                "steht im Text, aber mit „nicht“ oder „noch nicht“.",
            ],
            [
                "Lesen 2",
                "Die falsche Lösung benutzt Wörter aus dem Text, sagt aber etwas anderes. · „früher“ und „heute“ verwechseln. · "
                "Kleine Wörter wie <i>nur, alle, noch nicht</i> überlesen.",
            ],
            [
                "Lesen 3",
                "Das Thema passt, aber ein Detail nicht: Alter, Uhrzeit, Wochentag, Zielgruppe. · Eine Anzeige zweimal wählen. · "
                "x vergessen und eine Anzeige „passend machen“.",
            ],
        ],
        [22, 152],
    ),
]

# ── Übung 1: Lesen Teil 1 ──
heads = [
    "a) Neue Buslinie bringt Dorfbewohner zum Krankenhaus",
    "b) Am Wochenende fahren keine Busse mehr",
    "c) Jugendliche kochen für Menschen ohne Wohnung",
    "d) Essen in der Schulkantine wird teurer",
    "e) Spielplatz nach Umbau wieder geöffnet",
    "f) Kinder planen ihren Spielplatz selbst",
    "g) Alte Fahrräder für neue Nachbarn",
    "h) Polizei findet gestohlene Fahrräder",
    "i) Wie soll der kleine Elefant heißen?",
    "j) Zoo hat im Winter kürzer geöffnet",
]
texts1 = [
    "<b>Gera.</b> Wie soll der neue Spielplatz im Stadtteil Lusan aussehen? Diese Frage hat die Stadt nicht nur Fachleuten "
    "gestellt, sondern vor allem den Kindern. In drei Workshops haben rund 60 Mädchen und Jungen zwischen sechs und zwölf Jahren "
    "Bilder gemalt und Modelle aus Pappe gebaut. Ganz oben auf der Wunschliste: ein Kletterturm, eine lange Rutsche und Spiele "
    "mit Wasser. Die Planerinnen wollen möglichst viele Ideen umsetzen. Gebaut wird ab dem Frühjahr, fertig sein soll der "
    "Spielplatz im Herbst.",
    "<b>Roding.</b> Wer in einem der kleinen Dörfer rund um Roding wohnt und kein Auto hat, kam bisher nur schwer zum Arzt. "
    "Seit Montag fährt nun die neue Linie 44 von Montag bis Freitag jede Stunde durch zwölf Orte bis zum Kreiskrankenhaus. "
    "Am Wochenende gibt es einen Rufbus, den man eine Stunde vorher telefonisch bestellen muss. Der Landkreis bezahlt das "
    "Angebot zunächst für zwei Jahre.",
    "<b>Oldenburg.</b> In einer alten Garage stehen über hundert Fahrräder – manche ohne Kette, manche mit platten Reifen. "
    "Jeden Samstag reparieren hier zehn Ehrenamtliche, die meisten von ihnen Rentner, die Räder. Die Fahrräder sind Spenden von "
    "Bürgerinnen und Bürgern. Wenn sie fertig sind, bekommen Geflüchtete sie kostenlos, damit sie zum Sprachkurs oder zur Arbeit "
    "fahren können. „Ein Fahrrad bedeutet Freiheit“, sagt Werner Albers, der das Projekt gegründet hat.",
    "<b>Leipzig.</b> Am 3. Mai ist im Zoo ein kleiner Elefant zur Welt gekommen. Das Junge wiegt etwa 100 Kilo und ist gesund. "
    "Einen Namen hat es noch nicht – dabei sollen die Besucherinnen und Besucher helfen. Bis Ende Mai kann man an der Kasse oder im "
    "Internet einen Vorschlag machen. Die Tierpfleger wählen dann fünf Namen aus, und am Ende entscheiden die Gäste. Den kleinen "
    "Elefanten kann man schon jetzt besuchen, allerdings nur vormittags.",
    "<b>Mainz.</b> Kartoffelsuppe, Nudeln mit Tomatensoße und zum Nachtisch Apfelkuchen: Einmal im Monat kochen Schülerinnen und "
    "Schüler einer Gesamtschule für Menschen, die auf der Straße leben. Die Lebensmittel spenden Geschäfte aus der Nachbarschaft. "
    "Gekocht wird in der Schulküche, gegessen in einem Raum der Kirchengemeinde nebenan. „Am Anfang war ich unsicher, aber die "
    "Gäste sind total nett“, erzählt die 15-jährige Amina. Die Preise in der Kantine bleiben übrigens gleich – das Projekt kostet "
    "die Schule nichts.",
]
u1 = task(
    1,
    "Lesen Teil 1: Überschriften",
    "Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte. "
    "Welche Überschrift (a–j) passt am besten zu welchem Text? Jede Überschrift passt nur einmal. Fünf Überschriften bleiben übrig.",
    1,
)
hrows = [[R(heads[i], "cell"), R(heads[i + 5], "cell")] for i in range(5)]
ht = Table(hrows, colWidths=[87 * mm, 87 * mm])
ht.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), SOFT),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]
    )
)
s += [PageBreak(), KeepTogether(u1 + [ht, Spacer(1, 4)])]
for i, t in enumerate(texts1, 1):
    s += [KeepTogether([R(f"<b>Text {i}</b>   Überschrift: {BL}", "h3"), R(t, "txt")])]

# ── Übung 2: Lesen Teil 2 ──
art = [
    "Eine Bohrmaschine, ein Zelt, eine Nähmaschine, ein Beamer für den Filmabend: In den Regalen des Leihladens in Freiburg "
    "stehen über 600 Dinge. Kaufen kann man hier nichts – nur ausleihen. „Eine Bohrmaschine benutzt man im ganzen Leben oft nur "
    "ein paar Minuten“, sagt Mariam Sadeghi. „Warum soll dann jeder Haushalt eine eigene haben?“",
    "Die 38-jährige Ingenieurin hat den Laden vor vier Jahren zusammen mit zwei Freundinnen gegründet. Die ersten Sachen kamen "
    "aus den eigenen Kellern. Heute bringen vor allem Nachbarinnen und Nachbarn Dinge vorbei, die sie selbst kaum noch brauchen. "
    "Neue Geräte kauft der Verein nur, wenn viele Leute danach fragen.",
    "Wer etwas ausleihen möchte, muss Mitglied werden. Das kostet 30 Euro im Jahr, für Studierende und Menschen mit wenig Geld "
    "die Hälfte. Dann darf man bis zu drei Dinge gleichzeitig für jeweils eine Woche mitnehmen. Wer etwas länger braucht, kann "
    "per E-Mail verlängern – aber nur, wenn niemand anderes auf den Gegenstand wartet.",
    "Geöffnet hat der Laden dreimal pro Woche am Nachmittag. Geld bekommt dort niemand: Rund 25 Ehrenamtliche geben die Sachen "
    "aus, prüfen sie bei der Rückgabe und machen kleine Reparaturen. Kaputt geht überraschend wenig, erzählt Sadeghi. „Die Leute "
    "passen gut auf. Sie wissen ja, dass nach ihnen noch jemand das Zelt benutzen will.“",
    "Am Anfang kamen fast nur junge Familien. Inzwischen leihen auch viele ältere Menschen aus, zum Beispiel Gartengeräte oder "
    "einen Rollator für die Zeit nach einer Operation. Am beliebtesten sind im Sommer die Campingsachen und im Dezember die "
    "Waffeleisen und Raclettegeräte.",
    "Ein Problem hat der Verein allerdings: Der Raum ist zu klein. Viele Spenden muss das Team deshalb ablehnen. Die Stadt hat "
    "angeboten, im nächsten Jahr bei der Suche nach einem größeren Raum zu helfen. Bis dahin bleibt es eng – aber gemütlich.",
]
mc = [
    (
        "Im Leihladen …",
        [
            "kann man gebrauchte Geräte billig kaufen.",
            "kann man Dinge für eine bestimmte Zeit mitnehmen.",
            "gibt es nur neue Geräte.",
        ],
    ),
    (
        "Die meisten Sachen im Laden …",
        [
            "hat der Verein im Geschäft gekauft.",
            "kommen aus den Kellern der drei Gründerinnen.",
            "bringen heute Menschen aus der Nachbarschaft.",
        ],
    ),
    (
        "Mitglieder …",
        [
            "können die Leihzeit unter einer Bedingung verlängern.",
            "zahlen alle 30 Euro im Jahr.",
            "dürfen nur ein Gerät gleichzeitig ausleihen.",
        ],
    ),
    (
        "Die Helferinnen und Helfer im Laden …",
        [
            "reparieren alle kaputten Geräte.",
            "arbeiten ohne Bezahlung.",
            "haben oft Ärger mit kaputten Sachen.",
        ],
    ),
    (
        "Was ist zurzeit ein Problem?",
        [
            "Es kommen zu wenige ältere Menschen.",
            "Die Stadt möchte den Raum zurückhaben.",
            "Es gibt nicht genug Platz für alle Spenden.",
        ],
    ),
]
s += [PageBreak()]
s += task(
    2,
    "Lesen Teil 2: Detailverstehen",
    "Lesen Sie den Text und die Aufgaben 1–5. "
    "Welche Lösung (a, b oder c) ist richtig? Kreuzen Sie an.",
    2,
)
arows = [
    [
        [
            R("<b>Warum kaufen, wenn man leihen kann?</b>", "h3"),
            R(
                "<i>In Freiburg gibt es einen Laden, in dem man nichts kaufen kann</i>",
                "small",
            ),
        ]
    ]
] + [[R(p, "art")] for p in art]
atab = Table(arows, colWidths=[174 * mm])
atab.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]
    )
)
s += [atab, Spacer(1, 2)]
for i, (q, opts) in enumerate(mc, 1):
    s += [
        KeepTogether(
            [R(f"<b>{i}. {q}</b>", "q")]
            + [R(f"{BOX} {chr(97 + j)}) {o}", "opt") for j, o in enumerate(opts)]
        )
    ]

# ── Übung 3: Lesen Teil 3 ──
ads = [
    (
        "a) Schwimmen lernen – für Frauen",
        "Keine Angst vor dem Wasser! Anfängerkurs nur für Frauen, mit Trainerin. "
        "Dienstags 19–20 Uhr im Hallenbad Süd, 10 Termine, 60 €.",
    ),
    (
        "b) Schwimmschule Delfin",
        "Kinder ab 5 Jahren lernen schwimmen. Kurse samstags 9–12 Uhr. "
        "Am Ende gibt es das Seepferdchen-Abzeichen.",
    ),
    (
        "c) Nachhilfe-Börse",
        "Studierende helfen Schülerinnen und Schülern der Klassen 5–10 in Mathe, Deutsch und Englisch. "
        "12 € pro Stunde, auch online.",
    ),
    (
        "d) Computerkurs 60 plus",
        "E-Mails schreiben, Fotos mit dem Handy verschicken, Videotelefonie. Kleine Gruppen, "
        "vormittags im Seniorentreff. Anmeldung: Tel. 0821 / 44 19 30",
    ),
    (
        "e) Umzugshilfe Starke Hände",
        "Wir packen, tragen und fahren für Sie – mit eigenem Lkw, auch am Wochenende. "
        "Festpreis nach Besichtigung.",
    ),
    (
        "f) Transporter mieten",
        "Autovermietung am Bahnhof: Transporter ab 49 € pro Tag. "
        "Der normale Führerschein (Klasse B) reicht.",
    ),
    (
        "g) Kleiderkammer am Kirchplatz",
        "Kostenlose Kleidung für Menschen mit wenig Geld. "
        "Bitte Berechtigungsschein mitbringen. Mittwochs 14–17 Uhr.",
    ),
    (
        "h) Flohmarkt auf dem Schulhof",
        "Jeden ersten Sonntag im Monat. Standgebühr 5 €, keine Anmeldung nötig. "
        "Kinderkleidung, Spielzeug, Bücher und mehr.",
    ),
    (
        "i) Kochkurs „Küche der Welt“",
        "Gemeinsam kochen und essen – diesmal syrisch und vietnamesisch. "
        "Freitag, 18 Uhr, 15 € mit Essen. Familienzentrum Nord.",
    ),
    (
        "j) Restaurant Olivenbaum",
        "Feiern Sie bei uns! Eigener Raum für bis zu 40 Personen, Buffet auf Bestellung. "
        "Montag Ruhetag.",
    ),
    (
        "k) Tierarzt-Notdienst",
        "Ihr Tier ist am Wochenende krank? Rufen Sie uns an: Samstag und Sonntag "
        "8–20 Uhr, Tel. 0821 / 55 60 70.",
    ),
    (
        "l) Hundeschule Pfote",
        "Kurse für junge und erwachsene Hunde. Training abends und samstags. "
        "Erste Stunde kostenlos!",
    ),
]
sits = [
    "Ihre Nachbarin (45) kann nicht schwimmen und möchte es endlich lernen. Sie hat nur abends Zeit.",
    "Ihr Sohn (7) soll schwimmen lernen. Von Montag bis Freitag hat er nachmittags Fußballtraining.",
    "Ihr Kollege möchte an einem Samstag mit 30 Gästen seinen 50. Geburtstag feiern.",
    "Ihre Tochter (13) hat schlechte Noten in Mathematik und braucht Hilfe.",
    "Ihr Vater (68) möchte lernen, wie man Fotos mit dem Handy an die Enkel schickt.",
    "Sie ziehen um und möchten Ihre Möbel selbst transportieren. Sie haben einen normalen Führerschein.",
    "Ein Freund möchte am Wochenende die alten Kinderbücher seiner Tochter verkaufen.",
    "Ihre Freundin möchte lernen, wie man Gerichte aus anderen Ländern kocht.",
    "Ihr Bruder braucht für den Führerschein einen Erste-Hilfe-Kurs.",
    "Ihre Nachbarin fährt zwei Wochen in Urlaub. Sie sucht jemanden, der in dieser Zeit auf ihren Hund aufpasst.",
]
s += [PageBreak()]
s += task(
    3,
    "Lesen Teil 3: Anzeigen",
    "Lesen Sie die zehn Situationen und die zwölf Anzeigen. Welche Anzeige (a–l) passt zu "
    "welcher Situation? Jede Anzeige können Sie nur einmal wählen. Für manche Situationen gibt es keine passende Anzeige. "
    "Schreiben Sie dann x.",
    3,
)
cells = [
    [R(f"<b>{h}</b><br/>{t}", "ad") for h, t in ads[i : i + 2]] for i in range(0, 12, 2)
]
at = Table(cells, colWidths=[87 * mm, 87 * mm])
at.setStyle(
    TableStyle(
        [
            ("BOX", (0, 0), (-1, -1), 0.5, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
s += [at, Spacer(1, 5)]
srows = [
    [R(f"<b>{i}</b>", "ad"), R(t, "ad"), R(f"Anzeige: {BL}", "ad")]
    for i, t in enumerate(sits, 1)
]
stab = Table(srows, colWidths=[9 * mm, 137 * mm, 28 * mm])
stab.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 2.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
        ]
    )
)
s += [stab]

# ── Lösungen ──
s += [
    PageBreak(),
    R("Lösungen", "h2"),
    R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
]
l1 = [
    (
        "1 – f",
        "Die Kinder malen und bauen Modelle für den neuen Spielplatz. <i>e</i> passt nicht: Der Spielplatz ist noch nicht "
        "fertig, er wird erst ab dem Frühjahr gebaut.",
    ),
    (
        "2 – a",
        "Neue Linie von den Dörfern bis zum Krankenhaus. <i>b</i> passt nicht: Am Wochenende gibt es einen Rufbus.",
    ),
    (
        "3 – g",
        "Gespendete Fahrräder werden repariert und an Geflüchtete verschenkt. <i>h</i> passt nicht: Von Dieben ist keine Rede.",
    ),
    (
        "4 – i",
        "Die Gäste sollen einen Namen vorschlagen. <i>j</i> passt nicht: „nur vormittags“ ist ein Detail, nicht das Thema.",
    ),
    (
        "5 – c",
        "Schülerinnen und Schüler kochen für Menschen, die auf der Straße leben. <i>d</i> passt nicht: Die Preise „bleiben gleich“.",
    ),
]
s += [R("Übung 1 · Lesen Teil 1 (übrig: b, d, e, h, j)", "solh")] + [
    R(f"<b>{a}</b>  {b}", "sol") for a, b in l1
]
l2 = [
    (
        "1 – b",
        "„Kaufen kann man hier nichts – nur ausleihen“, für jeweils eine Woche. Falsch: a) und c) – es wird nichts verkauft.",
    ),
    (
        "2 – c",
        "„Heute bringen vor allem Nachbarinnen und Nachbarn Dinge vorbei.“ Falsch: b) Das waren nur die <i>ersten</i> Sachen. "
        "a) Neue Geräte kauft der Verein nur selten.",
    ),
    (
        "3 – a",
        "Verlängern geht, „wenn niemand anderes auf den Gegenstand wartet“. Falsch: b) Manche zahlen die Hälfte. "
        "c) Bis zu drei Dinge gleichzeitig.",
    ),
    (
        "4 – b",
        "„Geld bekommt dort niemand“ = ehrenamtlich. Falsch: a) nur „kleine Reparaturen“. c) „Kaputt geht überraschend wenig.“",
    ),
    (
        "5 – c",
        "„Der Raum ist zu klein. Viele Spenden muss das Team ablehnen.“ Falsch: a) Inzwischen kommen viele ältere Menschen. "
        "b) Die Stadt will helfen.",
    ),
]
s += [R("Übung 2 · Lesen Teil 2", "solh")] + [
    R(f"<b>{a}</b>  {b}", "sol") for a, b in l2
]
l3 = [
    ("1 – a", "Kurs nur für Frauen, dienstags abends."),
    (
        "2 – b",
        "Kinder ab 5 Jahren, Kurs am Samstag – unter der Woche hat er keine Zeit.",
    ),
    ("3 – j", "Raum für bis zu 40 Personen; nur montags geschlossen."),
    ("4 – c", "Nachhilfe in Mathe für die Klassen 5–10."),
    ("5 – d", "Fotos mit dem Handy verschicken, Kurs für Menschen ab 60."),
    (
        "6 – f",
        "Transporter mit normalem Führerschein. Nicht e: Dort transportieren andere die Möbel.",
    ),
    ("7 – h", "Flohmarkt am Sonntag mit Büchern und Spielzeug."),
    ("8 – i", "Gerichte aus Syrien und Vietnam kochen."),
    ("9 – x", "Keine Anzeige bietet einen Erste-Hilfe-Kurs an."),
    (
        "10 – x",
        "l ist eine Hundeschule, k ein Tierarzt – niemand passt auf den Hund auf.",
    ),
]
s += [R("Übung 3 · Lesen Teil 3 (übrig: e, g, k, l)", "solh")] + [
    R(f"<b>{a}</b>  {b}", "sol") for a, b in l3
]
s += [
    Spacer(1, 6),
    box(
        R(
            "<b>Punkte zählen:</b> Übung 1: je 5 Punkte · Übung 2: je 5 Punkte · Übung 3: je 2,5 Punkte. Maximal 75 Punkte. "
            "Notieren Sie, in welchem Teil Sie die meisten Fehler hatten – dort lohnt sich das Training am meisten.",
            "cell",
        ),
        SOFT,
    ),
]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
