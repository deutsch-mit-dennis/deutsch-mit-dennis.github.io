# Arbeitsblatt A2 Sprechen: Sich höflich beschweren
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/sich-hoeflich-beschweren.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "sich-hoeflich-beschweren"
TITLE = "Sich höflich beschweren"
LEVEL = "A2"
st["dlg"] = ParagraphStyle("dlg", parent=st["cell"], leading=17)
B = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
G = '<font color="#8A93A8">________________________________________</font>'


def grid(rows, widths, pad=3):
    t = Table(rows, colWidths=[w * mm for w in widths])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), pad),
                ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
            ]
        )
    )
    return t


s = [
    R("A2 · Sprechen · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Die Heizung ist kalt, die Jacke ist zu klein, der Nachbar ist zu laut: So sagst du freundlich, "
        "was nicht in Ordnung ist – und was du möchtest.",
        "lead",
    ),
    R("Eine Beschwerde in 5 Schritten", "h2"),
]

rows = [
    ["<b>Schritt</b>", "<b>So kannst du es sagen</b>"],
    [
        "1. ansprechen",
        "Entschuldigung, haben Sie kurz Zeit? · Guten Tag, ich habe ein Problem.",
    ],
    [
        "2. das Problem sagen",
        f"{B('Die Heizung')} funktioniert nicht. · {B('Der Föhn')} ist kaputt. · {B('Die Jacke')} ist zu klein. · "
        f"Die Musik ist sehr laut.",
    ],
    [
        "3. seit wann? wie oft?",
        f"Seit {B('gestern')}. · Seit {B('einer Woche')}. · Schon {B('zum dritten Mal')}.",
    ],
    [
        "4. sagen, was du möchtest",
        f"Könnten Sie bitte {B('einen Handwerker schicken')}? · Ich möchte {B('die Jacke')} umtauschen. · "
        f"Ich hätte gern mein Geld zurück.",
    ],
    ["5. danken", "Vielen Dank für Ihre Hilfe. · Danke für Ihr Verständnis."],
    [
        "<font color='#566078'>Die andere Person sagt:</font>",
        "<font color='#566078'>Das tut mir leid. · Entschuldigung! · Ich kümmere mich darum. · "
        "Haben Sie den Kassenbon?</font>",
    ],
]
s += [table(rows, [46, 128])]

s += [
    Spacer(1, 6),
    box(
        R(
            "<b>Höflich = Könnten Sie bitte … + Verb am Ende?</b><br/>"
            "Nicht so: <i>Reparieren Sie die Heizung!</i> (das klingt wie ein Befehl)<br/>"
            "Besser: <b>Könnten</b> Sie <b>bitte</b> die Heizung <b>reparieren</b>?<br/>"
            "Mit du: <b>Könntest</b> du <b>bitte</b> leiser <b>sein</b>? – Und: ruhig bleiben, nicht schreien.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# Übung 1
left = [
    "Die Heizung in meiner Wohnung funktioniert nicht.",
    "Die Jacke ist leider zu klein.",
    "Die Suppe ist kalt.",
    "Es ist 23 Uhr, und Ihre Musik ist sehr laut.",
    "In meinem Hotelzimmer gibt es keine Handtücher.",
    "Der neue Wasserkocher ist schon kaputt.",
]
right = [
    "Könnten Sie mir bitte Handtücher bringen?",
    "Ich hätte gern mein Geld zurück.",
    "Könnten Sie bitte einen Handwerker schicken?",
    "Könnten Sie die Musik bitte leiser machen?",
    "Ich möchte sie gegen Größe M umtauschen.",
    "Könnten Sie sie bitte noch einmal warm machen?",
]
key1 = {1: "c", 2: "e", 3: "f", 4: "d", 5: "a", 6: "b"}
s += [
    KeepTogether(
        task(1, "Problem und Wunsch", "Was passt zusammen? Ordne zu.", 1)
        + [
            grid(
                [
                    [
                        R(f"{i + 1}. {l}", "cell"),
                        R("____", "cell"),
                        R(f"{chr(97 + i)}) {r}", "cell"),
                    ]
                    for i, (l, r) in enumerate(zip(left, right))
                ],
                [80, 14, 80],
            )
        ]
    )
]

# Übung 2
u2 = [
    ("Reparieren Sie bitte die Heizung!", "Könnten Sie bitte die Heizung reparieren?"),
    (
        "Bringen Sie mir eine neue Suppe!",
        "Könnten Sie mir bitte eine neue Suppe bringen?",
    ),
    ("Rufen Sie mich zurück!", "Könnten Sie mich bitte zurückrufen?"),
    (
        "Schicken Sie heute einen Handwerker!",
        "Könnten Sie bitte heute einen Handwerker schicken?",
    ),
    (
        "Mach die Tür leise zu! <font color='#566078'>(du)</font>",
        "Könntest du bitte die Tür leise zumachen?",
    ),
]
s += [
    KeepTogether(
        task(
            2,
            "Sag es höflich",
            "Schreib die Sätze höflich mit <b>Könnten Sie bitte … ?</b> "
            "Achtung: Das Verb steht am Ende. Trennbare Verben sind dann wieder zusammen.",
            1,
        )
        + [
            R(
                f"<i>Beispiel:</i> Machen Sie die Musik leiser! {ARROW} <b>Könnten Sie bitte die Musik leiser machen?</b>",
                "item",
            )
        ]
    )
] + [R(f"{i}. {a}<br/>{ARROW} {G}", "item") for i, (a, _) in enumerate(u2, 1)]

# Übung 3
W = lambda n: f'({n})&nbsp;<font color="#8A93A8">____________</font>'
dlg = (
    "<b>Verkäuferin:</b> Guten Tag, kann ich Ihnen helfen?<br/>"
    f"<b>Frau Nowak:</b> Guten Tag. Ich habe ein {W(1)}. Ich habe letzte Woche diesen Föhn {W(2)}. "
    f"Aber er ist schon {W(3)}.<br/>"
    f"<b>Verkäuferin:</b> Oh, das tut mir leid. Haben Sie den {W(4)}?<br/>"
    "<b>Frau Nowak:</b> Ja, hier, bitte.<br/>"
    f"<b>Verkäuferin:</b> Möchten Sie den Föhn {W(5)} oder möchten Sie Ihr {W(6)} zurück?<br/>"
    "<b>Frau Nowak:</b> Ich nehme lieber einen neuen Föhn.<br/>"
    f"<b>Verkäuferin:</b> Dieses Modell haben wir {W(7)} nicht mehr. Aber Sie können einen anderen Föhn nehmen "
    f"oder Sie bekommen einen {W(8)}.<br/>"
    "<b>Frau Nowak:</b> Dann schaue ich mir die anderen Föhne an. Vielen Dank für Ihre Hilfe!"
)
s += [
    KeepTogether(
        task(
            3,
            "Im Geschäft: Dialog ergänzen",
            "Frau Nowak bringt einen Föhn zurück. Ergänze die Wörter aus dem Kasten.",
            2,
        )
        + [
            box(
                R(
                    "Problem · gekauft · kaputt · Kassenbon · umtauschen · Geld · leider · Gutschein",
                    "cell",
                ),
                HELLGRUEN,
                GRUEN,
            ),
            Spacer(1, 4),
            box(R(dlg, "dlg"), SOFT),
        ]
    )
]

# Übung 4
order = [
    "Hausverwaltung Becker, Lang am Apparat. Guten Tag!",
    "Guten Tag, hier ist Karim Haddad aus der Gartenstraße 12. Ich habe ein Problem: Meine Heizung funktioniert nicht.",
    "Oh, das ist unangenehm. Seit wann ist die Heizung kalt?",
    "Seit gestern Abend. Es ist sehr kalt in der Wohnung, und wir haben zwei kleine Kinder.",
    "Das verstehe ich. Ich schicke heute noch einen Handwerker. Sind Sie ab 14 Uhr zu Hause?",
    "Ja, ab 14 Uhr bin ich da. Könnte der Handwerker mich bitte vorher anrufen?",
    "Ja, natürlich. Er ruft Sie eine halbe Stunde vorher an.",
    "Vielen Dank für Ihre Hilfe. Auf Wiederhören!",
]
mix = [3, 6, 1, 8, 4, 2, 7, 5]
who = lambda n: "Herr Haddad" if n in (2, 4, 6, 8) else "Frau Lang"
loes4 = " – ".join(chr(65 + mix.index(n)) for n in range(1, 9))
s += (
        task(
            4,
            "Am Telefon: Dialog ordnen",
            "Herr Haddad ruft bei der Hausverwaltung an. Bring den Dialog in die richtige Reihenfolge (1–8).",
            2,
        )
        + [
            grid(
                [
                    [
                        R("____", "cell"),
                        R(f"<b>{chr(65 + i)}</b>", "cell"),
                        R(f"<b>{who(n)}:</b> {order[n - 1]}", "cell"),
                    ]
                    for i, n in enumerate(mix)
                ],
                [14, 8, 152],
            )
        ]
)  # no KeepTogether: the table may continue on the next page


# Übung 5
def karte(kopf, text):
    return [R(f"<b>{kopf}</b>", "cell"), Spacer(1, 2), R(text, "cell")]


rk = Table(
    [
        [
            karte(
                "Situation 1 · Person A (Nachbarin / Nachbar)",
                "Seit einer Woche hört dein Nachbar jeden Abend bis Mitternacht laute Musik. "
                "Du musst um 5 Uhr aufstehen. Du klingelst bei ihm und sprichst höflich mit ihm. "
                "Findet zusammen eine Lösung.",
            ),
            karte(
                "Situation 1 · Person B (Nachbar mit Musik)",
                "Du hast eine neue Musikanlage. Du hast nicht gewusst: Man hört sie im ganzen Haus. "
                "Entschuldige dich. Mach einen Vorschlag: <b>leiser</b>, <b>nur bis 22 Uhr</b> oder <b>Kopfhörer</b>.",
            ),
        ],
        [
            karte(
                "Situation 2 · Person A (Gast im Restaurant)",
                "Du hast ein Schnitzel mit Pommes bestellt. Du wartest schon 40 Minuten. "
                "Jetzt bringt der Kellner Fisch mit Reis – das hast du nicht bestellt. Sag es freundlich.",
            ),
            karte(
                "Situation 2 · Person B (Kellnerin / Kellner)",
                "Entschuldige dich. Die Küche hat viel Arbeit. Biete etwas an: "
                "<b>das Schnitzel in 10 Minuten</b> und <b>ein Getränk gratis</b>.",
            ),
        ],
    ],
    colWidths=[87 * mm, 87 * mm],
)
rk.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
            ("BACKGROUND", (0, 0), (-1, -1), SOFT),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("RIGHTPADDING", (0, 0), (-1, -1), 7),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]
    )
)
s += [
    KeepTogether(
        task(
            5,
            "Rollenspiel: Jetzt beschwerst du dich!",
            "Arbeitet zu zweit. Nehmt die 5 Schritte von Seite 1. Dann tauscht die Rollen.",
            3,
        )
        + [
            rk,
            Spacer(1, 4),
            box(
                R(
                    "<b>Hilfe:</b> Entschuldigung, dass ich so spät klingle. · Ich kann leider nicht schlafen. · "
                    "Ich habe etwas anderes bestellt. · Ich warte schon seit … Minuten. · Das ist eine gute Idee. · "
                    "Okay, so machen wir es.",
                    "cell",
                ),
                NOTE,
                GELB,
            ),
        ]
    ),
    Spacer(1, 4),
    KeepTogether(
        [
            R(
                "Schreib einen Dialog (Situation 1 oder 2) in dein Heft oder hier:",
                "small",
            ),
            lines(4, 0),
        ]
    ),
]

# Lösungen
bsp = (
    "<b>A:</b> Guten Abend, Entschuldigung, dass ich so spät klingle. Haben Sie kurz Zeit? – <b>B:</b> Ja, was gibt es? – "
    "<b>A:</b> Ihre Musik ist sehr laut. Seit einer Woche höre ich sie jeden Abend bis Mitternacht. "
    "Ich muss um 5 Uhr aufstehen. Könnten Sie die Musik bitte leiser machen? – "
    "<b>B:</b> Oh, das tut mir leid! Das habe ich nicht gewusst. Ab 22 Uhr nehme ich Kopfhörer. – "
    "<b>A:</b> Das ist eine gute Idee. Vielen Dank für Ihr Verständnis!"
)
loes = [
    "<b>Übung 1:</b> " + " · ".join(f"{k} {v}" for k, v in key1.items()),
    "<b>Übung 2:</b> " + " · ".join(f"{i}. {b}" for i, (_, b) in enumerate(u2, 1)),
    "<b>Übung 3:</b> 1. Problem · 2. gekauft · 3. kaputt · 4. Kassenbon · 5. umtauschen · 6. Geld · 7. leider · 8. Gutschein",
    f"<b>Übung 4:</b> {loes4}",
    "<b>Übung 5 (Beispiel, Situation 1):</b> "
    + bsp
    + "<br/><b>Situation 2 (Ideen):</b> Entschuldigung, ich habe ein Schnitzel mit Pommes bestellt, nicht Fisch. "
    "Ich warte schon seit 40 Minuten. – Das tut mir sehr leid! Das Schnitzel kommt in 10 Minuten, "
    "und Sie bekommen ein Getränk gratis."
    '<br/><font color="#566078">Dein Dialog ist anders? Kein Problem – wichtig sind: freundlich ansprechen, '
    "Problem sagen, Wunsch mit „Könnten Sie bitte …?“ und am Ende danken.</font>",
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
        "Tipp: Erst tief durchatmen, dann freundlich sprechen. Mit „bitte“ und „danke“ bekommst du fast immer schneller Hilfe. – Dennis",
        "hand",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
