# Arbeitsblatt B1 Prüfung: DTZ Lesen Teil 1 – Wegweiser verstehen (im Stil der Prüfung, eigene Inhalte)
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/dtz-lesen-teil-1-wegweiser.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtz-lesen-teil-1-wegweiser"
TITLE = "DTZ Lesen Teil 1: Wegweiser verstehen"
LEVEL = "B1"
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=9.6, leading=12.5)
st["floor"] = ParagraphStyle(
    "floor",
    parent=st["cell"],
    fontName="Atk-B",
    fontSize=10,
    leading=13,
    textColor=TINTE,
)
CB = sym("☐")


def grid(rows, widths, pad=3, head=False):
    t = Table(rows, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), pad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
    ]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def wegweiser(name, floors):
    """Ein Schild wie im Eingang: links das Stockwerk, rechts die Stellen mit kurzer Erklärung."""
    rows = [[R(f'<font size="12"><b>{name}</b></font>', "cell"), ""]]
    for fl, entries in floors:
        rows.append(
            [
                R(fl, "floor"),
                [
                    R(f"<b>{a}</b> – {b}" if b else f"<b>{a}</b>", "txt")
                    for a, b in entries
                ],
            ]
        )
    t = Table(rows, colWidths=[30 * mm, 144 * mm])
    t.setStyle(
        TableStyle(
            [
                ("SPAN", (0, 0), (-1, 0)),
                ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                ("BACKGROUND", (0, 1), (-1, -1), NOTE),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("INNERGRID", (0, 1), (-1, -1), 0.6, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def situations(items, opts):
    """Prüfungsaufgabe als Tabelle: Situation + drei Spalten zum Ankreuzen. Erstes Element = Beispiel."""
    rows = [[R("<b>Situation</b>", "cell")] + [R(f"<b>{'abc'[j]})</b> {o}", "cell") for j, o in enumerate(opts)]]
    for i, (txt, ans) in enumerate(items):
        nr = "0" if i == 0 else str(i)
        lab = f"<b>{nr}</b> " + ('<font color="#566078">(Beispiel)</font> ' if i == 0 else "")
        marks = [R(sym("☒") if (i == 0 and "abc"[j] == ans) else CB, "cell") for j in range(3)]
        rows.append([R(lab + txt, "cell")] + marks)
    return [grid(rows, [96, 26, 26, 26], 3.5, head=True)]


s = [
    R("B1 · Prüfung DTZ · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Im Rathaus oder im Ärztehaus hängt im Eingang ein Wegweiser. In der DTZ (Lesen Teil 1) suchst du dort schnell die "
        "richtige Stelle. Hier übst du das mit zwei Wegweisern im Stil der Prüfung.",
        "lead",
    ),
    box(
        [
            R("<b>So gehst du vor</b>", "cell"),
            R(
                "1. Lies zuerst die Situation. Unterstreiche das wichtigste Wort (z. B. <i>Hund</i>, <i>Augen</i>).",
                "cell",
            ),
            R(
                "2. Im Wegweiser steht oft ein <b>anderes Wort</b> mit der gleichen Bedeutung: "
                f"Hund {ARROW} Hundesteuer · Geld für die Miete {ARROW} Wohngeld · heiraten {ARROW} Standesamt.",
                "cell",
            ),
            R(
                "3. Lies nicht jedes Wort. Such nur die passende Stelle und schau, in welchem Stock sie ist.",
                "cell",
            ),
            R(
                "4. Achtung: <b>„anderer Stock“</b> heißt: nicht die beiden anderen Antworten.",
                "cell",
            ),
        ],
        HELLGRUEN,
        GRUEN,
    ),
]

# Übung 1 – Wortschatz
w1 = [
    ("das Bürgerbüro", "e"),
    ("das Standesamt", "c"),
    ("das Fundbüro", "f"),
    ("die Stadtkasse", "a"),
    ("das Sanitätshaus", "b"),
    ("das Labor", "d"),
]
d1 = [
    "Hier bezahlt man Gebühren an die Stadt.",
    "Hier kauft man zum Beispiel einen Rollator oder Krücken.",
    "Hier heiratet man oder bekommt eine Geburtsurkunde.",
    "Hier nimmt man Blut ab und untersucht es.",
    "Hier meldet man die Wohnung an und beantragt einen Ausweis.",
    "Hier fragt man nach verlorenen Sachen.",
]
s += [
    KeepTogether(
        task(
            1,
            "Wo macht man das?",
            "Ordne zu. Diese Wörter brauchst du für die Wegweiser.",
            1,
        )
        + [
            grid(
                [
                    [
                        R(f"{i + 1}. {a}", "cell"),
                        R("____", "cell"),
                        R(f"{chr(97 + i)}) {b}", "cell"),
                    ]
                    for i, ((a, _), b) in enumerate(zip(w1, d1))
                ],
                [44, 14, 116],
            )
        ]
    )
]

# Wegweiser 1 – Rathaus
rathaus = [
    (
        "Erdgeschoss",
        [
            ("Information", ""),
            (
                "Bürgerbüro",
                "Anmeldung und Ummeldung der Wohnung, Personalausweis, Reisepass, Meldebescheinigung",
            ),
            ("Fundbüro", "verlorene Gegenstände"),
            ("Stadtkasse", "Gebühren und Rechnungen der Stadt bezahlen"),
        ],
    ),
    (
        "1. Stock",
        [
            ("Standesamt", "Eheschließung, Geburtsurkunden, Sterbeurkunden"),
            ("Jugendamt", "Kita-Plätze, Elterngeld, Beratung für Familien"),
            ("Wohngeldstelle", "Wohngeld, Wohnberechtigungsschein"),
        ],
    ),
    (
        "2. Stock",
        [
            (
                "Ordnungsamt",
                "Parkausweis für Anwohner, Gewerbe anmelden, Lärm und Müll melden",
            ),
            ("Steueramt", "Hundesteuer, Grundsteuer"),
            ("Sozialamt", "Hilfe zum Lebensunterhalt, Grundsicherung im Alter"),
        ],
    ),
    (
        "3. Stock",
        [
            (
                "Integrationsbüro",
                "Beratung für Zugewanderte, Informationen zu Integrationskursen",
            ),
            (
                "Seniorenbüro",
                "Beratung, Treffen und Freizeitangebote für Menschen ab 60",
            ),
            ("Büro der Bürgermeisterin", ""),
        ],
    ),
]
sit1 = [
    ("Sie möchten einen neuen Reisepass beantragen.", "a"),
    (
        "Sie sind innerhalb der Stadt umgezogen. Sie müssen der Stadt Ihre neue Adresse mitteilen.",
        "a",
    ),
    (
        "Ihre Tochter ist vor zwei Wochen auf die Welt gekommen. Sie brauchen ein Dokument über die Geburt.",
        "b",
    ),
    ("Sie haben sich einen Hund gekauft und müssen für ihn bezahlen.", "c"),
    (
        "Ihre Miete ist sehr hoch und Sie verdienen wenig. Sie möchten fragen, ob die Stadt Ihnen hilft.",
        "b",
    ),
    (
        "Ihre Mutter ist 68 Jahre alt. Sie sucht Kontakt zu anderen Menschen in ihrem Alter.",
        "c",
    ),
]
opts1 = ["Erdgeschoss", "1. Stock", "anderer Stock"]
s += task(
    2,
    "Prüfungstraining: Im Rathaus",
    "Lies die Situationen 1–5 und den Wegweiser. In welches Stockwerk gehst du? Kreuze an: a, b oder c.",
    2,
)
s += [wegweiser("Rathaus Neustadt – Wegweiser", rathaus), Spacer(1, 6)]
s += situations(sit1, opts1)

# Wegweiser 2 – Gesundheitszentrum
gz = [
    (
        "Erdgeschoss",
        [
            ("Apotheke am Markt", ""),
            ("Sanitätshaus", "Rollatoren, Krücken, Kompressionsstrümpfe"),
            ("Labor", "Blutabnahme nur mit Überweisung"),
        ],
    ),
    (
        "1. Stock",
        [
            ("Hausarztpraxis Dr. Yilmaz", "Allgemeinmedizin"),
            ("Kinder- und Jugendarztpraxis Dr. Berger", ""),
        ],
    ),
    (
        "2. Stock",
        [
            ("Zahnarztpraxis Nowak &amp; Kaya", ""),
            ("Augenarztpraxis Dr. Fischer", ""),
            ("Hörgeräte Klang", "Hörtest, Beratung, Hörgeräte"),
        ],
    ),
    (
        "3. Stock",
        [
            ("Physiotherapie Bewegt", "Krankengymnastik, Massage"),
            ("Frauenarztpraxis Dr. Okafor", ""),
            ("HNO-Praxis Dr. Lindner", "Hals, Nase, Ohren"),
        ],
    ),
]
sit2 = [
    ("Ihr Sohn ist sechs Jahre alt und hat seit gestern Fieber.", "c"),
    (
        "Sie können die Schrift in der Zeitung nicht mehr gut lesen. Sie möchten Ihre Augen untersuchen lassen.",
        "b",
    ),
    ("Ihr Arzt hat Ihnen Übungen für Ihren Rücken verschrieben.", "c"),
    ("Sie haben ein Rezept für Tabletten und möchten die Tabletten abholen.", "a"),
    ("Der Arzt sagt: Ihr Vater braucht ein Hörgerät. Wo bekommt er eins?", "b"),
    ("Sie sind schwanger und möchten einen Termin für eine Untersuchung machen.", "c"),
]
opts2 = ["Erdgeschoss", "2. Stock", "anderer Stock"]
s += task(
    3,
    "Prüfungstraining: Im Gesundheitszentrum",
    "Lies die Situationen 1–5 und den Wegweiser. In welches Stockwerk gehst du? Kreuze an: a, b oder c.",
    2,
)
s += [wegweiser("Gesundheitszentrum am Markt", gz), Spacer(1, 6)]
s += situations(sit2, opts2)

# Übung 4 – am Infoschalter
s += [
    KeepTogether(
        task(
            4,
            "Am Infoschalter fragen",
            "Schreib eine Frage und die Antwort. Benutze die Wegweiser aus Übung 2 und 3 und die Redemittel.",
            3,
        )
        + [
            box(
                R(
                    "<b>Fragen:</b> Entschuldigung, wo finde ich …? · Ich suche … · Wo ist bitte …?<br/>"
                    "<b>Antworten:</b> Das ist im Erdgeschoss. · Das ist im ersten / zweiten / dritten Stock. · "
                    "Nehmen Sie am besten den Aufzug.",
                    "cell",
                ),
                SOFT,
            ),
            Spacer(1, 4),
            R("<b>Beispiel:</b> Sie haben Zahnschmerzen.", "cell"),
            R(
                '<font color="#2341B5">Entschuldigung, wo finde ich die Zahnarztpraxis? – Die Zahnarztpraxis ist im zweiten Stock.</font>',
                "cell",
            ),
            Spacer(1, 5),
            R("1. Sie haben Ihren Schlüssel vor dem Rathaus verloren.", "item"),
            lines(2),
            R("2. Sie möchten einen Platz in einer Kita für Ihr Kind.", "item"),
            lines(2),
            R("3. Sie haben seit einer Woche Ohrenschmerzen.", "item"),
            lines(2),
        ]
    )
]

# Lösungen
loes = [
    "<b>Übung 1:</b> " + " · ".join(f"{i}{x}" for i, (_, x) in enumerate(w1, 1)),
    "<b>Übung 2 (Rathaus):</b> 1a – Ummeldung: Bürgerbüro (EG) · 2b – Geburtsurkunde: Standesamt (1. Stock) · "
    "3c – Hundesteuer: Steueramt (2. Stock) · 4b – Wohngeld: Wohngeldstelle (1. Stock) · "
    "5c – Menschen ab 60: Seniorenbüro (3. Stock)",
    "<b>Übung 3 (Gesundheitszentrum):</b> 1b – Augenarztpraxis (2. Stock) · 2c – Übungen für den Rücken = Krankengymnastik: "
    "Physiotherapie (3. Stock) · 3a – Apotheke (EG) · 4b – Hörgeräte Klang (2. Stock); die HNO-Praxis im 3. Stock ist eine "
    "Falle: Der Arzt hat schon gesagt, was der Vater braucht. · 5c – Frauenarztpraxis (3. Stock)",
    "<b>Übung 4 (Beispiele):</b><br/>"
    "1. Entschuldigung, wo ist bitte das Fundbüro? – Das Fundbüro ist im Erdgeschoss.<br/>"
    "2. Ich suche das Jugendamt. – Das Jugendamt ist im ersten Stock.<br/>"
    "3. Entschuldigung, wo finde ich die HNO-Praxis? – Die HNO-Praxis ist im dritten Stock. Nehmen Sie am besten den Aufzug.",
]
s += [
    Spacer(1, 10),
    KeepTogether(
        [
            R(
                'Lösungen <font size="10" color="#566078">– erst üben, dann nachschauen!</font>',
                "h2",
            ),
            box([R(x, "cell") for x in loes], HELLGRUEN, GRUEN),
        ]
    ),
    Spacer(1, 6),
    R(
        "Tipp: In der Prüfung hast du nicht viel Zeit. Such das Schlüsselwort – du musst nicht alles verstehen! – Dennis",
        "hand",
    ),
    Spacer(1, 4),
    R(
        "Eigene Übung im Stil der Prüfung „Deutsch-Test für Zuwanderer“ – keine Originalaufgabe.",
        "small",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
