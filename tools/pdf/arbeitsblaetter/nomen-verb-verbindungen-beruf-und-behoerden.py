# Arbeitsblatt B2 Wortschatz: Nomen-Verb-Verbindungen in Beruf und bei Behörden
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/nomen-verb-verbindungen-beruf-und-behoerden.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle

SLUG = "nomen-verb-verbindungen-beruf-und-behoerden"
TITLE = "Nomen-Verb-Verbindungen: Beruf und Behörden"
LEVEL = "B2"
N = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Nomen markieren
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verb markieren

s = [
    R("B2 · Wortschatz · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Einen Antrag stellen, Bescheid geben, Widerspruch einlegen – feste Verbindungen für Briefe, E-Mails und Gespräche im Job und auf dem Amt.",
        "lead",
    ),
]

s += [
    R("So funktioniert es", "h2"),
    box(
        R(
            f"Bei einer Nomen-Verb-Verbindung steckt die <b>Bedeutung im Nomen</b>. Das Verb ist fast „leer“.<br/>"
            f"Ich {V('beantrage')} Wohngeld. {ARROW} Ich {V('stelle')} einen {N('Antrag')} auf Wohngeld.<br/>"
            f"Die Verbindungen klingen <b>formeller</b> – typisch für Ämter, Briefe, Nachrichten und den Beruf. "
            f"Lerne immer die ganze Verbindung, auch mit Präposition."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

rows = [
    ["<b>Nomen-Verb-Verbindung</b>", "<b>Bedeutung</b>", "<b>Beispiel</b>"],
    [
        f"einen {N('Antrag')} {V('stellen')} (auf + Akk.)",
        "beantragen",
        "Ich habe einen Antrag auf Wohngeld gestellt.",
    ],
    [
        f"eine {N('Entscheidung')} {V('treffen')}",
        "entscheiden",
        "Das Team trifft die Entscheidung erst nächste Woche.",
    ],
    [
        f"{N('Bescheid')} {V('geben')} / {V('sagen')}",
        "informieren",
        "Geben Sie mir bitte Bescheid, wenn die Unterlagen da sind.",
    ],
    [
        f"einen {N('Termin')} {V('vereinbaren')}",
        "einen Zeitpunkt festlegen",
        "Ich möchte einen Termin beim Bürgeramt vereinbaren.",
    ],
    [
        f"{N('Widerspruch')} {V('einlegen')} (gegen + Akk.)",
        "offiziell widersprechen",
        "Gegen den Bescheid können Sie Widerspruch einlegen.",
    ],
    [
        f"in {N('Anspruch')} {V('nehmen')}",
        "nutzen",
        "Viele Eltern nehmen die kostenlose Beratung in Anspruch.",
    ],
    [
        f"zur {N('Verfügung')} {V('stehen')} / {V('stellen')}",
        "da sein / geben",
        "Für Fragen stehe ich Ihnen gern zur Verfügung.",
    ],
    [
        f"{N('Rücksicht')} {V('nehmen')} (auf + Akk.)",
        "berücksichtigen",
        "Bitte nehmen Sie Rücksicht auf die Nachbarn.",
    ],
    [
        f"{N('Stellung')} {V('nehmen')} (zu + Dat.)",
        "sich äußern",
        "Die Chefin hat zu unserem Vorschlag noch nicht Stellung genommen.",
    ],
    [
        f"zur {N('Sprache')} {V('bringen')}",
        "ansprechen",
        "Ich bringe das Problem in der Teamsitzung zur Sprache.",
    ],
    [
        f"{N('Kritik')} {V('üben')} (an + Dat.)",
        "kritisieren",
        "Die Kollegen üben Kritik an den neuen Schichtplänen.",
    ],
    [
        f"{N('Maßnahmen')} {V('ergreifen')}",
        "handeln, etwas tun",
        "Die Stadt ergreift Maßnahmen gegen den Lärm.",
    ],
    [
        f"eine {N('Rolle')} {V('spielen')}",
        "wichtig sein",
        "Bei der Bewerbung spielt Erfahrung eine große Rolle.",
    ],
    [
        f"{N('Verantwortung')} {V('übernehmen')} (für + Akk.)",
        "verantwortlich sein",
        "Sie übernimmt die Verantwortung für das neue Projekt.",
    ],
    [
        f"in {N('Kraft')} {V('treten')}",
        "gültig werden",
        "Das neue Gesetz tritt am 1. Januar in Kraft.",
    ],
    [
        f"einen {N('Beitrag')} {V('leisten')} (zu + Dat.)",
        "beitragen",
        "Jeder kann einen Beitrag zum Umweltschutz leisten.",
    ],
]
from reportlab.lib.styles import ParagraphStyle
from arbeitsblatt_lib import st

st["cellk"] = ParagraphStyle("cellk", parent=st["cell"], fontSize=9.5, leading=11.5)
tw = Table(
    [[R(c, "cellk") for c in r] for r in rows],
    colWidths=[58 * mm, 31 * mm, 85 * mm],
    repeatRows=1,
)
tw.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 2.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
            ("BACKGROUND", (0, 0), (-1, 0), SOFT),
        ]
    )
)
s += [tw]

s += [
    R("Verneinung: kein oder nicht?", "h3"),
    R(
        f"Nomen mit Artikel {ARROW} <b>kein</b>: Wir haben noch <b>keine</b> Entscheidung getroffen.<br/>"
        f"Feste Verbindung ohne Artikel {ARROW} <b>nicht</b>: Er hat noch <b>nicht</b> Stellung genommen. · Das Gesetz tritt <b>nicht</b> in Kraft."
    ),
]

# Übung 1
s += [
    KeepTogether(
        task(
            1,
            "Welches Verb fehlt?",
            "Setze das Verb in der richtigen Form ein. Jedes Verb passt einmal.",
            1,
        )
        + [
            box(
                R(
                    "stellen · treffen · geben · einlegen · nehmen · stehen · treten · spielen",
                    "cell",
                ),
                HELLGRUEN,
                GRUEN,
            )
        ]
    )
]
u1 = [
    "Wir müssen bis Freitag eine Entscheidung {}.",
    "Haben Sie schon einen Antrag auf Kindergeld {}?",
    "Die neue Hausordnung {} am 1. März in Kraft.",
    "Können Sie mir bitte Bescheid {}, wenn das Paket ankommt?",
    "Bei der Wohnungssuche {} der Preis die wichtigste Rolle.",
    "Herr Yilmaz hat gegen den Bescheid vom Jobcenter Widerspruch {}.",
    "Unsere Beraterin {} Ihnen montags bis freitags zur Verfügung.",
    "Bitte {} Sie Rücksicht auf die anderen Fahrgäste.",
]
s += [R(f"{i}. " + t.format(GAP), "item") for i, t in enumerate(u1, 1)]

# Übung 2
s += task(
    2,
    "Was bedeutet das?",
    "Ordne zu: Welches einfache Verb hat die gleiche Bedeutung?",
    2,
)
left = [
    "in Anspruch nehmen",
    "Stellung nehmen",
    "zur Sprache bringen",
    "Kritik üben",
    "Maßnahmen ergreifen",
    "in Kraft treten",
    "Verantwortung übernehmen",
    "einen Termin vereinbaren",
]
right = [
    "gültig werden",
    "ansprechen",
    "nutzen",
    "handeln",
    "sich äußern",
    "kritisieren",
    "einen Zeitpunkt festlegen",
    "verantwortlich sein",
]
t2 = Table(
    [
        [
            R(f"{i + 1}. {l}", "cell"),
            R("____", "cell"),
            R(f"{chr(97 + i)}) {r}", "cell"),
        ]
        for i, (l, r) in enumerate(zip(left, right))
    ],
    colWidths=[70 * mm, 20 * mm, 84 * mm],
)
t2.setStyle(
    TableStyle(
        [
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]
    )
)
s += [t2]

# Übung 3
s += task(
    3,
    "Formeller sagen",
    "Schreib den Satz mit einer Nomen-Verb-Verbindung aus der Liste. Achte auf kein / nicht.",
    2,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Ich möchte Elterngeld beantragen.<br/>{ARROW} Ich möchte einen {N('Antrag')} auf Elterngeld {V('stellen')}.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u3 = [
    "Wir haben noch nicht entschieden.",
    "Bitte informieren Sie mich bis Montag.",
    "Ich spreche das Thema in der nächsten Teamsitzung an.",
    "Viele Mieter kritisieren die hohen Nebenkosten.",
    "Die Firma hat sich zu dem Fehler noch nicht geäußert.",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 4
mail = (
    "<b>Betreff: Nebenkostenabrechnung 2025 – Gartenstraße 12, 3. OG links</b><br/>"
    "Sehr geehrte Frau Becker,<br/>"
    "mit diesem Schreiben lege ich (1)&nbsp;W__________ gegen die Nebenkostenabrechnung vom 2. Oktober ein. "
    "Die Kosten für den Hausmeister sind im Vergleich zum Vorjahr um 40 Prozent gestiegen. Diesen Punkt habe ich "
    "schon auf der Mieterversammlung im Juni zur (2)&nbsp;S__________ gebracht, aber bis heute hat niemand dazu "
    "(3)&nbsp;S__________ genommen.<br/>"
    "Ich bitte Sie, mir Kopien der Rechnungen zur (4)&nbsp;V__________ zu stellen. Gern möchte ich auch einen "
    "(5)&nbsp;T__________ vereinbaren, um die Belege in Ihrem Büro anzusehen. Außerdem bitte ich Sie, in Zukunft mehr "
    "(6)&nbsp;R__________ auf die Mieter zu nehmen: Die Bauarbeiten im Hof haben im Sommer jeden Morgen um 6 Uhr begonnen.<br/>"
    "Bitte (7)&nbsp;g__________ Sie mir bis zum 31. Oktober Bescheid, wie es weitergeht. Sonst werde ich die Beratung "
    "des Mietervereins in (8)&nbsp;A__________ nehmen.<br/>"
    "Mit freundlichen Grüßen<br/>Amira Haddad"
)
s += [
    KeepTogether(
        task(4, "Eine E-Mail an die Hausverwaltung", "Ergänze das fehlende Nomen oder Verb. Der erste Buchstabe hilft dir.", 3)
        + [box(R(mail, "cell"), SOFT)]
    )
]

# Übung 5
s += task(
    5,
    "Und du? Reagiere in der Situation",
    "Schreib oder sag einen Satz mit einer passenden Nomen-Verb-Verbindung.",
    3,
)
u5 = [
    "Deine Kollegin fragt: „Nimmst du die neue Stelle an?“ Du weißt es noch nicht.",
    "Beim Elternabend möchtest du ein Problem mit dem Schulweg ansprechen.",
    "Ein Kunde hat noch Fragen. Du bietest deine Hilfe an.",
    "Die Familienkasse hat dir einen falschen Bescheid geschickt.",
]
for i, t in enumerate(u5, 1):
    s += [KeepTogether([R(f"{chr(96 + i)}) {t}", "item"), lines(1)])]

# Lösungen (kompakt auf Seite 3)
l3 = [
    f"Wir haben noch <b>keine</b> {N('Entscheidung')} {V('getroffen')}.",
    f"Bitte {V('geben')} Sie mir bis Montag {N('Bescheid')}.",
    f"Ich {V('bringe')} das Thema in der nächsten Teamsitzung zur {N('Sprache')}.",
    f"Viele Mieter {V('üben')} {N('Kritik')} an den hohen Nebenkosten.",
    f"Die Firma hat zu dem Fehler noch <b>nicht</b> {N('Stellung')} {V('genommen')}.",
]
l5 = [
    "Ich habe noch keine Entscheidung getroffen. Ich gebe dir bis Freitag Bescheid.",
    "Ich möchte heute den gefährlichen Schulweg zur Sprache bringen.",
    "Für weitere Fragen stehe ich Ihnen gern zur Verfügung.",
    "Ich lege gegen den Bescheid Widerspruch ein.",
]
loes = [
    "<b>Übung 1:</b> 1. treffen · 2. gestellt · 3. tritt · 4. geben · 5. spielt · 6. eingelegt · 7. steht · 8. nehmen",
    "<b>Übung 2:</b> 1 c · 2 e · 3 b · 4 f · 5 d · 6 a · 7 h · 8 g",
    "<b>Übung 3:</b> " + "<br/>".join(f"{i}. {x}" for i, x in enumerate(l3, 1)),
    "<b>Übung 4:</b> 1. Widerspruch · 2. Sprache · 3. Stellung · 4. Verfügung · 5. Termin · 6. Rücksicht · 7. geben · 8. Anspruch",
    "<b>Übung 5 (Beispiele):</b> "
    + "<br/>".join(f"{chr(96 + i)}) {x}" for i, x in enumerate(l5, 1))
    + '<br/><font color="#566078">Deine Sätze sind anders? Prüfe: Passen Nomen, Verb und Präposition zusammen?</font>',
]
s += [
    Spacer(1, 10),
    R(
        'Lösungen <font size="10" color="#566078">– erst üben, dann nachschauen!</font>',
        "h2",
    ),
    box([R(x, "cell") for x in loes], HELLGRUEN, GRUEN),
    Spacer(1, 6),
    R(
        "Tipp: Markiere diese Woche in jedem offiziellen Brief alle Nomen-Verb-Verbindungen. – Dennis",
        "hand",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
