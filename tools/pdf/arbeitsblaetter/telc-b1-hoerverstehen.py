# Arbeitsblatt B1 Prüfung: telc Deutsch B1 – Hörverstehen Teil 1–3 (ohne Audio, Texte zum Vorlesen in den Lösungen)
# Format laut pruefung-fakten.js (telc-b1) und sim/telc-b1.js: ca. 30 Min., 75 Punkte, 3 Teile mit 5 + 10 + 5 Aufgaben
# (richtig/falsch), Teil 1 einmal hören, Teil 2 und 3 zweimal. Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/telc-b1-hoerverstehen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b1-hoerverstehen"
TITLE = "telc B1 Hörverstehen: Radio, Interview, Durchsagen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B1"
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
BOX = sym("☐")
st["spk"] = ParagraphStyle(
    "spk",
    parent=st["cell"],
    fontSize=9.4,
    leading=12.1,
    leftIndent=12,
    firstLineIndent=-12,
    spaceAfter=2,
)
st["tr"] = ParagraphStyle(
    "tr", parent=st["cell"], fontSize=9.4, leading=12.1, spaceAfter=1
)
st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=9.5, leading=12, spaceAfter=0.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5
)


def rf_table(items, start=1):
    rows = [
        [
            R("<b>Nr.</b>", "cell"),
            R("<b>Aussage</b>", "cell"),
            R("<b>richtig</b>", "cell"),
            R("<b>falsch</b>", "cell"),
        ]
    ]
    rows += [
        [R(f"<b>{i}</b>", "cell"), R(t, "cell"), R(BOX, "cell"), R(BOX, "cell")]
        for i, t in enumerate(items, start)
    ]
    t = Table(rows, colWidths=[11 * mm, 131 * mm, 16 * mm, 16 * mm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (2, 0), (-1, -1), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return t


def tbox(flows):
    t = Table([[f] for f in flows], colWidths=[174 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    return t


s = [
    R("B1 · Prüfung · Arbeitsblatt · telc Deutsch B1", "kick"),
    R("telc B1: Hörverstehen", "h1"),
    R(
        "Kurze Radiomeldungen, ein Interview, Durchsagen am Bahnhof und am Telefon – so trainieren Sie die drei Teile des "
        "Hörverstehens. Alle Texte sind eigene Übungstexte im Stil der Prüfung. Die Hörtexte stehen bei den Lösungen.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Hören</b>", "<b>Punkte</b>"],
            [
                "<b>Hören 1</b><br/>Globalverstehen",
                "5 kurze Texte aus dem Radio (Nachrichten, Wetter, Verkehr). "
                "Zu jedem Text eine Aussage: richtig oder falsch?",
                "<b>einmal</b>",
                fallback("5 × 5 = 25"),
            ],
            [
                "<b>Hören 2</b><br/>Detailverstehen",
                "Ein längeres Gespräch aus dem Radio, zum Beispiel ein Interview. "
                "10 Aussagen in der Reihenfolge des Gesprächs: richtig oder falsch?",
                "<b>zweimal</b>",
                fallback("10 × 2,5 = 25"),
            ],
            [
                "<b>Hören 3</b><br/>Selektives Verstehen",
                "5 kurze Texte: Durchsagen, Ansagen am Telefon, Hinweise im Radio. "
                "Zu jedem Text eine Aussage: richtig oder falsch?",
                "<b>zweimal</b>",
                fallback("5 × 5 = 25"),
            ],
        ],
        [32, 98, 20, 24],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Das Hörverstehen dauert insgesamt ca. <b>30 Minuten</b>, es gibt <b>75 Punkte</b>. "
            "Teil 1 hören Sie <b>nur einmal</b>, Teil 2 und Teil 3 hören Sie <b>zweimal</b>. Vor jedem Teil haben Sie Zeit, "
            "die Aussagen zu lesen.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Ohne Audio üben – so geht's:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest die Hörtexte "
            "(ab Seite 4, bei den Lösungen) in normalem Tempo vor – Teil 1 einmal, Teil 2 und 3 zweimal. "
            "Wer übt, schaut <b>nicht</b> in die Texte. Erst nach allen drei Teilen die Lösungen vergleichen.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

# ── Strategien ──
s += [
    R("Vier Strategie-Tipps", "h2"),
    R(
        "<b>1. Lesezeit nutzen.</b> Markieren Sie in jeder Aussage die wichtigste Information: Ort, Zeit, Zahl, Person – und kleine "
        "Wörter wie <i>nur, alle, ganz, nicht mehr</i>.",
        "item",
    ),
    R(
        "<b>2. Teil 1: sofort entscheiden.</b> Sie hören jeden Text nur einmal. Kreuzen Sie direkt danach an, auch wenn Sie unsicher sind.",
        "item",
    ),
    R(
        "<b>3. Teil 2: dem Gespräch folgen.</b> Die Aussagen kommen in der Reihenfolge des Gesprächs. Beim ersten Hören ankreuzen, "
        "was sicher ist, beim zweiten Hören die offenen Aussagen prüfen.",
        "item",
    ),
    R(
        "<b>4. Teil 3: auf Änderungen achten.</b> Durchsagen nennen oft die alte und die neue Information (Gleis 4 "
        + ARROW
        + " Gleis 7). "
        "Notieren Sie Zahlen sofort.",
        "item",
    ),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Achtung!</b>"],
            [
                "Hören 1",
                "Nur ein Teil der Aussage stimmt (Sonne – ja, aber nur im Osten). · „ab heute“ statt „ab nächster Woche“.",
            ],
            [
                "Hören 2",
                "Die Person erzählt, was sie früher gemacht hat – nicht, was sie heute macht. · Wer sagt was? "
                "(die Person selbst, ihr Mann, eine Kollegin) · „viele“ in der Aussage, „wenige“ im Gespräch.",
            ],
            [
                "Hören 3",
                "Normalfall und Ausnahme werden beide genannt („heute ausnahmsweise“). · Bedingungen: „nur bis …“, "
                "„nur online“. · Zahlen klingen ähnlich: 13 / 30, 14 / 40.",
            ],
        ],
        [22, 152],
    ),
]

# ── Aufgaben ──
t1 = [
    "Für Anwohner mit Parkausweis wird das Parken in der Innenstadt teurer.",
    "Morgen wird es in ganz Deutschland kühler.",
    "Die Autobahn A7 ist zwischen Göttingen und Kassel ganz gesperrt.",
    "Die Helferinnen und Helfer im Tierpark bekommen eine kostenlose Schulung.",
    "Kinder unter sechs Jahren können bald kostenlos ins Schwimmbad gehen.",
]
t2 = [
    "Frau Aksoy hat in der Türkei als Lehrerin gearbeitet.",
    "Ihre Ausbildung wurde in Deutschland sofort anerkannt.",
    "Frau Aksoy musste den Busführerschein selbst bezahlen.",
    "Besonders schwer war für sie die Theorie.",
    "Frau Aksoy erfährt ihre Arbeitszeiten immer erst kurz vorher.",
    "Die Großmutter hilft bei der Betreuung der Kinder.",
    "Viele Fahrgäste kennen Frau Aksoy persönlich.",
    "Frau Aksoy hatte schon einmal eine gefährliche Situation im Bus.",
    "In ihrem Betrieb fahren mehr Frauen als Männer Bus.",
    "Frau Aksoy möchte später neue Busfahrerinnen und Busfahrer ausbilden.",
]
t3 = [
    "Der Zug nach Würzburg fährt heute von Gleis 7 ab.",
    "In dringenden Fällen sollen die Patienten während des Urlaubs den Notruf wählen.",
    "Das günstige Mittagsmenü gibt es heute den ganzen Tag.",
    "In zwei Stadtteilen bekommt man heute kostenlos Wasser in Flaschen.",
    "Frau Petrović soll ihren Sohn bis zwölf Uhr von der Schule abholen.",
]
s += [PageBreak()]
s += task(
    1,
    "Hören Teil 1: Globalverstehen",
    "Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text <b>nur einmal</b>. "
    "Lesen Sie zuerst die Aussagen 1–5. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
    1,
)
s += [rf_table(t1, 1), Spacer(1, 6)]
s += task(
    2,
    "Hören Teil 2: Detailverstehen",
    "Sie hören ein Gespräch aus dem Radio. Sie hören das Gespräch <b>zweimal</b>. "
    "Lesen Sie zuerst die Aussagen 6–15. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
    2,
)
s += [rf_table(t2, 6)]
s += [PageBreak()]
s += task(
    3,
    "Hören Teil 3: Selektives Verstehen",
    "Sie hören fünf kurze Texte. Sie hören jeden Text <b>zweimal</b>. "
    "Lesen Sie zuerst die Aussagen 16–20. Entscheiden Sie beim Hören: Ist die Aussage richtig oder falsch?",
    2,
)
s += [rf_table(t3, 16), Spacer(1, 8)]
s += [
    KeepTogether(
        [
            R("Nach dem Hören: Meine Ergebnisse", "h3"),
            table(
                [
                    [
                        "<b>Teil</b>",
                        "<b>richtig gelöst</b>",
                        "<b>Punkte</b>",
                        "<b>Das war schwer für mich:</b>",
                    ],
                    ["Hören 1", "____ von 5", fallback("____ × 5"), ""],
                    ["Hören 2", "____ von 10", fallback("____ × 2,5"), ""],
                    ["Hören 3", "____ von 5", fallback("____ × 5"), ""],
                ],
                [24, 32, 28, 90],
            ),
        ]
    )
]
s += [
    Spacer(1, 6),
    box(
        R(
            "<b>Punkte zählen:</b> Teil 1: je 5 Punkte · Teil 2: je 2,5 Punkte · Teil 3: je 5 Punkte. Maximal 75 Punkte. "
            "Tipp: Hören Sie die Texte nach der Kontrolle noch einmal und lesen Sie dabei mit.",
            "cell",
        ),
        SOFT,
    ),
]

# ── Lösungen und Hörtexte ──
h1 = [
    (
        "Text 1 · Nachrichten",
        "Ab dem ersten März wird das Parken in der Innenstadt von Bielefeld teurer. Eine Stunde kostet dann "
        "drei Euro statt zwei Euro fünfzig. Für Anwohnerinnen und Anwohner mit Parkausweis ändert sich nichts. Die Stadt will mit "
        "dem zusätzlichen Geld neue Radwege bauen.",
        "1 falsch",
        "„Für Anwohnerinnen und Anwohner mit Parkausweis ändert sich nichts.“",
    ),
    (
        "Text 2 · Wetter",
        "Und nun das Wetter: Heute Nachmittag ziehen von Westen Gewitter auf, vor allem in Nordrhein-Westfalen "
        "und Hessen. Dabei kann es auch Hagel geben. Im Osten bleibt es trocken und heiß bei bis zu zweiunddreißig Grad. "
        "Morgen kühlt es dann überall deutlich ab.",
        "2 richtig",
        "„Morgen kühlt es dann überall deutlich ab.“",
    ),
    (
        "Text 3 · Verkehr",
        "Auf der A7 zwischen Göttingen und Kassel ist nach einem Unfall ein Fahrstreifen gesperrt. Der Stau ist "
        "acht Kilometer lang. Die Polizei bittet, die Strecke zu umfahren.",
        "3 falsch",
        "Nur „ein Fahrstreifen“ ist gesperrt, nicht die ganze Autobahn.",
    ),
    (
        "Text 4 · Nachrichten",
        "Der Tierpark in Cottbus sucht ehrenamtliche Helferinnen und Helfer. Sie sollen Besuchergruppen "
        "führen und Kindern die Tiere erklären. Erfahrung mit Tieren ist nicht nötig, aber man sollte mindestens achtzehn Jahre alt "
        "sein. Alle Helfer bekommen vorher eine kostenlose Schulung.",
        "4 richtig",
        "„Alle Helfer bekommen vorher eine kostenlose Schulung.“",
    ),
    (
        "Text 5 · Nachrichten",
        "Gute Nachricht für Familien in Dresden: Ab dem Sommer bezahlen Kinder unter sechs Jahren in allen "
        "städtischen Schwimmbädern keinen Eintritt mehr. Bisher war der Eintritt nur für Kinder unter drei Jahren frei. Für ältere "
        "Kinder kostet der Eintritt weiter zwei Euro.",
        "5 richtig",
        "„Ab dem Sommer bezahlen Kinder unter sechs Jahren … keinen Eintritt mehr.“",
    ),
]
s += [
    PageBreak(),
    R("Lösungen und Hörtexte", "h2"),
    R(
        "Zum Vorlesen und zum Selbstkontrollieren. Die wichtige Stelle ist in der Begründung zitiert.",
        "small",
    ),
    R("Teil 1 · einmal vorlesen", "solh"),
]
for h, t, a, why in h1:
    s += [
        KeepTogether(
            [
                tbox([R(f"<b>{h}</b>", "tr"), R(t, "tr")]),
                R(f"<b>{a}</b> – {why}", "sol"),
                Spacer(1, 2),
            ]
        )
    ]

dlg = [
    (
        "Moderator",
        "Herzlich willkommen zu „Menschen bei uns“. Heute ist Leyla Aksoy bei mir im Studio. Frau Aksoy, Sie fahren seit "
        "drei Jahren Bus hier in Hannover. Wie sind Sie zu diesem Beruf gekommen?",
    ),
    (
        "Frau Aksoy",
        "Ehrlich gesagt durch Zufall. In der Türkei war ich Grundschullehrerin. Als ich vor sieben Jahren nach Deutschland "
        "gekommen bin, wurde meine Ausbildung hier nicht anerkannt. Ich habe dann zuerst in einer Bäckerei gearbeitet, im Verkauf.",
    ),
    ("Moderator", "Und wie kam dann der Bus ins Spiel?"),
    (
        "Frau Aksoy",
        "Eine Kundin hat mir erzählt, dass die Verkehrsbetriebe dringend Fahrerinnen und Fahrer suchen – und dass sie den "
        "Führerschein bezahlen. Das fand ich spannend. Ich bin schon immer gern Auto gefahren.",
    ),
    ("Moderator", "War die Ausbildung schwer?"),
    (
        "Frau Aksoy",
        "Das Fahren nicht so, aber die Theorie! Die vielen Fachwörter auf Deutsch, das war am Anfang wirklich anstrengend. "
        "Ich habe jeden Abend mit meinem Mann Wörter gelernt. Nach acht Monaten hatte ich dann den Führerschein.",
    ),
    ("Moderator", "Wie sieht denn ein normaler Arbeitstag bei Ihnen aus?"),
    (
        "Frau Aksoy",
        "Das ist ganz unterschiedlich, weil wir in Schichten arbeiten. Manchmal fange ich um halb fünf morgens an, manchmal "
        "fahre ich bis Mitternacht. Das ist für die Familie nicht immer leicht. Aber wir bekommen den Dienstplan vier Wochen vorher. "
        "So kann ich gut planen.",
    ),
    (
        "Moderator",
        "Sie haben zwei Kinder. Wer kümmert sich um sie, wenn Sie früh arbeiten?",
    ),
    (
        "Frau Aksoy",
        "Mein Mann. Er arbeitet im Büro und kann morgens später anfangen. Und meine Schwiegermutter wohnt bei uns um die "
        "Ecke. Sie holt die Kinder oft von der Schule ab.",
    ),
    ("Moderator", "Was gefällt Ihnen an Ihrem Beruf am besten?"),
    (
        "Frau Aksoy",
        "Die Menschen! Ich habe viele Stammgäste. Eine ältere Dame bringt mir jeden Freitag einen Apfel mit. Und die "
        "Schulkinder sagen immer „Guten Morgen, Frau Aksoy!“. Ein bisschen bin ich also doch wieder Lehrerin. (lacht)",
    ),
    ("Moderator", "Gibt es auch schwierige Situationen?"),
    (
        "Frau Aksoy",
        "Natürlich. Manchmal sind Fahrgäste unfreundlich, weil der Bus Verspätung hat. Aber das ist ja meistens nicht meine "
        "Schuld, das ist der Verkehr. Ich bleibe dann ruhig und erkläre es freundlich. Gefährliche Situationen hatte ich zum Glück noch nie.",
    ),
    ("Moderator", "Würden Sie den Beruf weiterempfehlen?"),
    (
        "Frau Aksoy",
        "Auf jeden Fall, gerade auch Frauen. Bei uns im Betrieb sind nur etwa fünfzehn Prozent der Fahrer Frauen. "
        "Das sollten viel mehr sein! Man verdient ordentlich, und der Arbeitsplatz ist sicher.",
    ),
    ("Moderator", "Und was sind Ihre Pläne für die Zukunft?"),
    (
        "Frau Aksoy",
        "Ich möchte gern Ausbilderin werden und neuen Kolleginnen und Kollegen helfen. Dafür mache ich nächstes Jahr eine "
        "Weiterbildung.",
    ),
    ("Moderator", "Vielen Dank, Frau Aksoy, und weiterhin gute Fahrt!"),
]
s += [
    R("Teil 2 · zweimal vorlesen (zwei Personen)", "solh"),
    tbox(
        [R("<b>Radiosendung „Menschen bei uns“: Busfahrerin Leyla Aksoy</b>", "tr")]
        + [R(f"<b>{w}:</b> {t}", "spk") for w, t in dlg]
    ),
]
l2 = [
    ("6 richtig", "„In der Türkei war ich Grundschullehrerin.“"),
    ("7 falsch", "„wurde meine Ausbildung hier nicht anerkannt“"),
    ("8 falsch", "Die Verkehrsbetriebe „bezahlen den Führerschein“."),
    ("9 richtig", "„Das Fahren nicht so, aber die Theorie!“"),
    ("10 falsch", "„den Dienstplan vier Wochen vorher“"),
    (
        "11 richtig",
        "Die Schwiegermutter (die Großmutter der Kinder) holt sie oft von der Schule ab.",
    ),
    ("12 richtig", "„Ich habe viele Stammgäste.“ Die Kinder kennen ihren Namen."),
    ("13 falsch", "„Gefährliche Situationen hatte ich zum Glück noch nie.“"),
    ("14 falsch", "„nur etwa fünfzehn Prozent der Fahrer Frauen“"),
    ("15 richtig", "„Ich möchte gern Ausbilderin werden.“"),
]
s += [Spacer(1, 3)] + [R(f"<b>{a}</b> – {b}", "sol") for a, b in l2]

h3 = [
    (
        "Text 1 · Bahnhof",
        "Achtung an Gleis vier: Der Regionalexpress nach Würzburg, planmäßige Abfahrt zehn Uhr zwölf, fährt heute "
        "ausnahmsweise von Gleis sieben ab. Ich wiederhole: Der Regionalexpress nach Würzburg fährt heute von Gleis sieben.",
        "16 richtig",
        "„fährt heute ausnahmsweise von Gleis sieben ab“",
    ),
    (
        "Text 2 · Telefonansage",
        "Guten Tag, Sie sind verbunden mit der Praxis Dr. Okafor. Unsere Praxis ist vom zweiten bis zum "
        "sechzehnten August wegen Urlaub geschlossen. In dringenden Fällen gehen Sie bitte zur Praxis Dr. Weber in der Lindenstraße "
        "zwölf. Ab Montag, dem neunzehnten August, sind wir wieder für Sie da.",
        "17 falsch",
        "Man soll zur Praxis Dr. Weber gehen, nicht den Notruf wählen.",
    ),
    (
        "Text 3 · Kaufhaus",
        "Liebe Kundinnen und Kunden, unser Restaurant im dritten Stock bietet heute zwischen elf und vierzehn Uhr "
        "ein Mittagsmenü für nur acht Euro neunzig an: Gemüsesuppe, Hähnchen mit Reis und ein Getränk. Kinder unter zehn Jahren "
        "essen heute kostenlos.",
        "18 falsch",
        "Das Menü gibt es nur „zwischen elf und vierzehn Uhr“.",
    ),
    (
        "Text 4 · Radio",
        "Ein Hinweis für alle in Bochum: Wegen eines Wasserrohrbruchs gibt es heute bis etwa achtzehn Uhr in den "
        "Stadtteilen Wattenscheid und Höntrop kein Leitungswasser. Die Stadtwerke verteilen an der Marktstraße kostenlos Wasserflaschen.",
        "19 richtig",
        "„verteilen … kostenlos Wasserflaschen“ – für die zwei Stadtteile ohne Leitungswasser.",
    ),
    (
        "Text 5 · Anrufbeantworter",
        "Hallo Frau Petrović, hier ist Sandra Klein aus dem Sekretariat der Lessing-Schule. Ihr Sohn Luka "
        "hat sich heute im Sportunterricht am Fuß verletzt. Es ist nichts Schlimmes, aber er kann nicht gut laufen. Können Sie ihn "
        "bitte bis zwölf Uhr abholen? Rufen Sie uns bitte kurz zurück: null fünf sieben eins, drei vier fünf, sechs sieben.",
        "20 richtig",
        "„Können Sie ihn bitte bis zwölf Uhr abholen?“",
    ),
]
s += [R("Teil 3 · jeden Text zweimal vorlesen", "solh")]
for h, t, a, why in h3:
    s += [
        KeepTogether(
            [
                tbox([R(f"<b>{h}</b>", "tr"), R(t, "tr")]),
                R(f"<b>{a}</b> – {why}", "sol"),
                Spacer(1, 2),
            ]
        )
    ]


if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
