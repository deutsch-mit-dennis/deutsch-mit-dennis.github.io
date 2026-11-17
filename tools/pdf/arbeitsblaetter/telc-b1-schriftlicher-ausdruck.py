# Arbeitsblatt telc Deutsch B1: Schriftlicher Ausdruck (halbformelle E-Mail mit vier Leitpunkten)
# Format laut pruefung-fakten.js (telc-b1) und sim/telc-b1.js: 30 Min., 45 Punkte, eine E-Mail (persönlich oder halbformell)
# mit 4 Leitpunkten, keine feste Wortzahl, drei Bewertungskriterien. Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/telc-b1-schriftlicher-ausdruck.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "telc-b1-schriftlicher-ausdruck"
TITLE = "telc B1 Schriftlicher Ausdruck: halbformelle E-Mail mit 4 Leitpunkten"  # page header (max. 70 characters)
LEVEL = "B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
X = lambda t: f'<font color="#C2362B">{fallback(t)}</font>'  # Fehler / Falle
CB = sym("☐")
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)

st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5
)
st["brief"] = ParagraphStyle(
    "brief", parent=st["cell"], fontSize=10, leading=13.4, spaceAfter=4
)

s = [
    R("telc Deutsch B1 · Schreiben · Prüfungstraining", "kick"),
    R("Schriftlicher Ausdruck: die halbformelle E-Mail", "h1"),
    R(
        "An die Vermieterin, die Kursleiterin, einen Verein: höflich, klar und mit allen vier Leitpunkten. "
        "Mit diesem Blatt üben Sie Aufbau, Redemittel und Zeitplan und schreiben drei Prüfungsaufgaben.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Zeit</b>", "<b>30 Minuten</b> (am Ende der schriftlichen Prüfung)"],
            [
                "<b>Aufgabe</b>",
                "Sie schreiben <b>eine E-Mail oder einen Brief</b> – entweder persönlich (an eine Freundin, einen Freund) oder "
                "<b>halbformell</b> (an eine Person oder Stelle, die Sie mit <i>Sie</i> anreden). Dieses Blatt trainiert die halbformelle E-Mail.",
            ],
            [
                "<b>Leitpunkte</b>",
                "Zur Aufgabe gibt es <b>vier Leitpunkte</b>. Schreiben Sie zu <b>allen vier</b> etwas. Die Reihenfolge dürfen Sie selbst "
                "wählen. Anrede, Einleitung, Schluss und Gruß nicht vergessen.",
            ],
            ["<b>Länge</b>", "keine feste Wortzahl – wichtig: <b>alle vier Leitpunkte</b> (Übungsziel: ca. 100 bis 150 Wörter)"],
            [
                "<b>Punkte</b>",
                "<b>45 Punkte</b>. Drei Kriterien: Berücksichtigung der Leitpunkte · kommunikative Gestaltung (Aufbau, Anrede, passende "
                "Sätze) · formale Richtigkeit (Grammatik, Wörter, Rechtschreibung). Bestanden ist die schriftliche Prüfung mit mindestens "
                "60 % (135 von 225 Punkten).",
            ],
        ],
        [28, 146],
        head=False,
    ),
    Spacer(1, 6),
    R("Halbformell – was heißt das?", "h3"),
    R(
        "Sie schreiben an eine Person, die Sie kennen oder deren Namen Sie wissen, zum Beispiel an die Vermieterin, den "
        "Hausmeister, die Kursleiterin oder an einen Verein. Sie benutzen <b>immer Sie</b> (<i>Sie, Ihnen, Ihr</i> – groß geschrieben). "
        "Der Ton ist freundlich, aber nicht so locker wie mit Freunden.",
        "p",
    ),
    R("Der Aufbau – immer gleich", "h3"),
    table(
        [
            ["<b>Teil</b>", "<b>Inhalt</b>", "<b>Beispiel</b>"],
            [
                "Anrede",
                "mit Namen, danach Komma, weiter klein",
                "Sehr geehrte Frau Schulte, / Sehr geehrter Herr Novak,",
            ],
            ["Einleitung", "Warum schreiben Sie?", "ich schreibe Ihnen, weil …"],
            [
                "Leitpunkte",
                "alle vier, <b>je ein kleiner Absatz</b> mit 2–3 Sätzen",
                "Das Problem gibt es seit …",
            ],
            [
                "Schluss",
                "Bitte, Dank oder Erwartung",
                "Ich freue mich auf Ihre Antwort.",
            ],
            [
                "Gruß",
                "+ Vor- und Nachname",
                "Mit freundlichen Grüßen<br/>Tomasz Wójcik",
            ],
        ],
        [24, 66, 84],
    ),
]

s += [
    R("Strategie: 30 Minuten gut einteilen", "h2"),
    R(
        "<b>1. Planen (ca. 5 Min.):</b> Zu jedem Leitpunkt zwei Stichwörter notieren und eine sinnvolle Reihenfolge festlegen.",
        "item",
    ),
    R(
        "<b>2. Schreiben (ca. 20 Min.):</b> Jeder Leitpunkt bekommt einen eigenen Absatz. Nicht nur einen Satz – auch einen Grund oder "
        "ein Beispiel nennen („…, weil …“, „Zum Beispiel …“).",
        "item",
    ),
    R(
        "<b>3. Kontrollieren (ca. 5 Min.):</b> Sind alle vier Leitpunkte da? Verb auf Position 2, Verb am Ende nach <i>weil, dass, wenn</i>? "
        "Überall <i>Sie</i> statt <i>du</i>?",
        "item",
    ),
    box(
        R(
            "<b>Tipp:</b> Ein einfacher, klarer Text mit allen vier Leitpunkten ist besser als ein komplizierter Text, in dem ein Punkt fehlt."
        ),
        NOTE,
        GELB,
    ),
    KeepTogether(
        [
            R("Typische Fallen", "h3"),
            R(
                f"{X('✗')} Ein Leitpunkt fehlt oder steht nur in einem halben Satz – das kostet viele Punkte.",
                "item",
            ),
            R(
                f"{X('✗')} <i>Du</i> und <i>Sie</i> gemischt, oder die Anrede passt nicht zum Gruß („Sehr geehrte …“ – „Liebe Grüße“).",
                "item",
            ),
            R(
                f"{X('✗')} <i>weil</i> mit Verb auf Position 2 („weil ich habe …“) oder <i>deshalb</i> ohne Verb direkt danach.",
                "item",
            ),
        ]
    ),
]

# ── Redemittel ──
s += [
    R("Redemittel für die halbformelle E-Mail", "h2"),
    table(
        [
            ["<b>Wofür?</b>", "<b>Redemittel</b>"],
            [
                "<b>Einleitung</b>",
                f"{K('ich schreibe Ihnen, weil')} … · {K('ich habe Ihre Anzeige gelesen und')} … · "
                f"{K('vielen Dank für Ihre E-Mail.')} · {K('leider muss ich Ihnen mitteilen, dass')} …",
            ],
            [
                "<b>etwas erklären</b>",
                f"{K('Das Problem ist, dass')} … · {K('Seit')} … {K('funktioniert')} … {K('nicht mehr.')} · "
                f"{K('Der Grund dafür ist, dass')} … · {K('Ich habe schon')} … {K('versucht, aber')} …",
            ],
            [
                "<b>bitten und fragen</b>",
                f"{K('Könnten Sie mir bitte')} … ? · {K('Ich möchte gern wissen, ob / wann / wo')} … · "
                f"{K('Es wäre sehr nett, wenn Sie')} … · {K('Deshalb bitte ich Sie,')} … {K('zu')} …",
            ],
            [
                "<b>sich entschuldigen</b>",
                f"{K('Es tut mir leid, dass')} … · {K('Leider kann ich')} … {K('nicht')} … , {K('denn')} … · "
                f"{K('Ich hoffe, Sie haben Verständnis dafür.')}",
            ],
            [
                "<b>Angebot, Termin</b>",
                f"{K('Ich bin jeden Tag ab')} … {K('Uhr zu Hause.')} · {K('Passt Ihnen')} … ? · "
                f"{K('Ich kann gern')} … · {K('Ich habe Zeit am')} …",
            ],
            [
                "<b>Schluss und Gruß</b>",
                f"{K('Vielen Dank im Voraus.')} · {K('Ich freue mich auf Ihre Antwort.')} · "
                f"{K('Mit freundlichen Grüßen')} / {K('Viele Grüße')}",
            ],
            [
                "<b>Sätze verbinden</b>",
                f"{K('außerdem')} · {K('deshalb')} · {K('dann')} · {K('trotzdem')} (Verb danach) · "
                f"{K('weil')} · {K('dass')} · {K('wenn')} · {K('obwohl')} (Verb am Ende) · {K('denn')} · {K('aber')} · {K('und')}",
            ],
        ],
        [34, 140],
    ),
]

# ── Übung 1 ──
u1 = [
    "Liebe Ana,",
    "Sehr geehrte Frau Schulte,",
    "Hallo Tim!",
    "Mit freundlichen Grüßen",
    "Schreib mir bald!",
    "Ich freue mich auf Ihre Antwort.",
    "Hast du Lust …?",
    "Könnten Sie mir bitte …?",
]
s += [
    KeepTogether(
        task(
            1,
            "Persönlich oder halbformell?",
            "Schreiben Sie P (persönlich, du) oder H (halbformell, Sie).",
            1,
        )
        + [
            table(
                [
                    [
                        f'{i}. {t}  <font color="#8A93A8">____</font>'
                        for i, t in list(enumerate(u1, 1))[k : k + 4]
                    ]
                    for k in (0, 4)
                ],
                [43.5] * 4,
                head=False,
            )
        ]
    )
]

# ── Übung 2 ──
u2 = [
    (
        "Leitpunkt <i>Problem beschreiben</i>: „Die Heizung ist kaputt.“",
        "Was genau? Wo? Wie warm ist es noch?",
    ),
    (
        "Leitpunkt <i>Grund für Ihr Fehlen</i>: „Ich bin krank.“",
        "Was haben Sie? Wie lange? Was sagt der Arzt?",
    ),
]
s += [
    KeepTogether(
        task(
            2,
            "Einen Leitpunkt ausbauen",
            "Ein Satz ist zu wenig. Schreiben Sie zu jedem Leitpunkt 2–3 Sätze. "
            "Die Fragen helfen.",
            2,
        )
    )
]
for t, hint in u2:
    s += [
        KeepTogether(
            [
                R(f'{t}  <font color="#566078" size="9.5">({hint})</font>', "item"),
                lines(3),
            ]
        )
    ]

# ── Prüfungsaufgaben ──
plan_t = Table(
    [
        [
            R("<b>Leitpunkt</b>", "cell"),
            R("<b>Stichwörter</b>", "cell"),
            R("<b>Reihenfolge</b>", "cell"),
        ]
    ]
    + [["", "", ""] for _ in range(4)],
    colWidths=[54 * mm, 90 * mm, 30 * mm],
    rowHeights=[None] + [8 * mm] * 4,
)
plan_t.setStyle(
    TableStyle(
        [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("GRID", (0, 0), (-1, -1), 0.4, LINE)]
    )
)


def lp(points):
    return table(
        [
            [f"{CB} {points[0]}", f"{CB} {points[1]}"],
            [f"{CB} {points[2]}", f"{CB} {points[3]}"],
        ],
        [87, 87],
        head=False,
    )


def situ(text):
    t = Table([[R(text, "cell")]], colWidths=[150 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return t


s += [
    PageBreak(),
    R("Drei Prüfungsaufgaben", "h2"),
    R(
        "Wie in der Prüfung: <b>eine</b> Aufgabe in <b>30 Minuten</b>, <b>alle vier Leitpunkte</b>, Übungsziel ca. <b>100 bis 150 Wörter</b>. "
        "Schreiben Sie auf ein liniertes Blatt – jede Aufgabe an einem anderen Tag. Benutzen Sie für jede Aufgabe die Planungstabelle.",
        "p",
    ),
]
s += [
    KeepTogether(
        [
            R("Aufgabe A: E-Mail an die Kursleiterin", "h3"),
            R(
                "Sie besuchen einen Deutschkurs an der Volkshochschule. Ihre Kursleiterin heißt Frau Becker. Sie können nächste Woche von "
                "Montag bis Mittwoch nicht zum Kurs kommen. Am Freitag schreibt der Kurs einen Test. Schreiben Sie Frau Becker eine E-Mail.",
                "p",
            ),
            lp(
                [
                    "Grund für Ihr Fehlen",
                    "Hausaufgaben und Material",
                    "Frage zum Test am Freitag",
                    "Dank und wann Sie wiederkommen",
                ]
            ),
        ]
    )
]
s += [
    Spacer(1, 6),
    KeepTogether(
        [
            R("Aufgabe B: Antwort auf eine Anzeige", "h3"),
            R("Sie haben diese Anzeige im Stadtteilblatt gelesen:", "p"),
            situ(
                "<b>Nachbarschaftsverein Miteinander e. V.</b><br/>Wir suchen Ehrenamtliche für unsere <b>Hausaufgabenhilfe</b>: "
                "Kinder der Klassen 1–4, zweimal pro Woche am Nachmittag. Kontakt: Herr Ivanov, hausaufgaben@miteinander-verein.example"
            ),
            Spacer(1, 4),
            R("Sie möchten mitmachen. Schreiben Sie eine E-Mail an Herrn Ivanov.", "p"),
            lp(
                [
                    "Warum Sie sich interessieren",
                    "Ihre Erfahrungen mit Kindern",
                    "Wann Sie Zeit haben",
                    "Fragen zum Ablauf (Ort, Gruppe …)",
                ]
            ),
        ]
    ),
]
s += [
    Spacer(1, 6),
    KeepTogether(
        [
            R("Aufgabe C: E-Mail an die Vermieterin", "h3"),
            R(
                "Es ist Januar. In Ihrer Wohnung funktioniert die Heizung nicht mehr. Ihre Vermieterin heißt Frau Schulte. "
                "Schreiben Sie ihr eine E-Mail.",
                "p",
            ),
            lp(
                [
                    "Problem beschreiben",
                    "seit wann",
                    "Folgen für Ihre Familie",
                    "Bitte um einen Termin für einen Handwerker",
                ]
            ),
        ]
    ),
]
s += [
    Spacer(1, 8),
    KeepTogether([R("Planungstabelle (für jede Aufgabe neu)", "h3"), plan_t]),
]

# ── Musterlösung ──
muster = (
    "Sehr geehrte Frau Schulte,<br/>"
    "leider muss ich Ihnen mitteilen, dass die Heizung in unserer Wohnung nicht mehr funktioniert. Die Heizkörper im Wohnzimmer "
    "und im Kinderzimmer bleiben ganz kalt, nur im Bad wird es ein bisschen warm.<br/>"
    "Das Problem gibt es seit letztem Freitag. Ich habe am Wochenende versucht, Sie anzurufen, aber ich habe Sie leider nicht erreicht.<br/>"
    "Für meine Familie ist die Situation sehr schwierig. Draußen ist es nachts kälter als null Grad, und in der Wohnung sind es nur "
    "noch 15 Grad. Meine kleine Tochter ist deshalb schon erkältet.<br/>"
    "Könnten Sie bitte so schnell wie möglich einen Handwerker schicken? Ich bin jeden Tag ab 15 Uhr zu Hause. Vormittags kann "
    "meine Nachbarin, Frau Haddad, die Tür öffnen.<br/>"
    "Vielen Dank im Voraus. Ich freue mich auf Ihre schnelle Antwort.<br/>"
    "Mit freundlichen Grüßen<br/>Tomasz Wójcik"
)
s += [
    PageBreak(),
    R("Musterlösung zu Aufgabe C", "h2"),
    R(
        "So kann eine gute Antwort aussehen (ca. 130 Wörter). Die Tabelle darunter zeigt, wo die vier Leitpunkte stehen.",
        "small",
    ),
]
mrows = [
    (
        "Einleitung + <b>Problem</b>",
        "leider muss ich Ihnen mitteilen, dass … Die Heizkörper … bleiben ganz kalt …",
    ),
    (
        "<b>seit wann</b>",
        "Das Problem gibt es seit letztem Freitag. Ich habe … versucht, …",
    ),
    (
        "<b>Folgen</b>",
        "Für meine Familie ist die Situation sehr schwierig. … deshalb schon erkältet.",
    ),
    (
        "<b>Bitte um Termin</b>",
        "Könnten Sie bitte … einen Handwerker schicken? Ich bin jeden Tag ab 15 Uhr zu Hause.",
    ),
]
s += [
    box(R(muster, "brief"), HELLGRUEN, GRUEN),
    Spacer(1, 4),
    table(
        [["<b>Leitpunkt</b>", "<b>Wo steht er?</b>"]]
        + [[a, f"<i>{b}</i>"] for a, b in mrows],
        [42, 132],
    ),
]

# ── Checkliste ──
check = [
    "Habe ich zu <b>allen vier Leitpunkten</b> 2–3 Sätze geschrieben?",
    "Passen <b>Anrede und Gruß</b> zusammen (Sehr geehrte Frau … – Mit freundlichen Grüßen)?",
    "Steht am Anfang, <b>warum</b> ich schreibe?",
    "Habe ich <b>überall Sie</b> geschrieben (Sie, Ihnen, Ihr – groß)?",
    "Habe ich Sätze mit <i>weil, dass, deshalb, aber, außerdem</i> verbunden?",
    "Steht das <b>Verb</b> im Hauptsatz auf Position 2 und im Nebensatz am Ende?",
    "Habe ich zu jedem Leitpunkt genug geschrieben (Übungsziel ca. 100 bis 150 Wörter)?",
    "Gibt es einen <b>Schlusssatz</b> und meinen vollständigen Namen?",
]
s += [
    KeepTogether(
        [R("Checkliste: vor dem Abgeben prüfen", "h2")]
        + [R(f"{CB} {c}", "item") for c in check]
    )
]

# ── Lösungen ──
s += [
    KeepTogether(
        [
            R("Lösungen", "h2"),
            R("Übung 1", "solh"),
            R("1. P · 2. H · 3. P · 4. H · 5. P · 6. H · 7. P · 8. H", "sol"),
            R("Übung 2 – Beispiele", "solh"),
            R(
                "<b>Problem beschreiben:</b> Die Heizung in meiner Wohnung funktioniert nicht mehr. Im Wohnzimmer und im Schlafzimmer sind "
                "die Heizkörper ganz kalt. In der Wohnung sind es nur noch 15 Grad.",
                "sol",
            ),
            R(
                "<b>Grund für Ihr Fehlen:</b> Ich habe eine starke Erkältung und Fieber. Mein Arzt hat mich bis Mittwoch krankgeschrieben. "
                "Ich hoffe, dass ich am Donnerstag wieder kommen kann.",
                "sol",
            ),
            R("Aufgabe A und B – so könnten Sie anfangen", "solh"),
            R(
                f"<b>A:</b> {K('Sehr geehrte Frau Becker,')} leider kann ich nächste Woche von Montag bis Mittwoch nicht zum Kurs kommen, "
                "weil … Könnten Sie mir bitte die Hausaufgaben per E-Mail schicken?",
                "sol",
            ),
            R(
                f"<b>B:</b> {K('Sehr geehrter Herr Ivanov,')} ich habe Ihre Anzeige im Stadtteilblatt gelesen und möchte gern bei der "
                "Hausaufgabenhilfe mitmachen. Ich habe selbst zwei Kinder und …",
                "sol",
            ),
        ]
    )
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
