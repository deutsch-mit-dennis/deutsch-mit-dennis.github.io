# Arbeitsblatt A1 Sprechen: Am Telefon einen Termin machen
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/am-telefon-einen-termin-machen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "am-telefon-einen-termin-machen"
TITLE = "Am Telefon: einen Termin machen"
LEVEL = "A1"
st["dlg"] = ParagraphStyle("dlg", parent=st["cell"], leading=17)
B = lambda t: f'<b><font color="#2341B5">{t}</font></b>'


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
    R("A1 · Sprechen · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Beim Arzt, beim Friseur oder in der Kita anrufen: einfache Sätze für ein kurzes Telefongespräch – "
        "und was du sagst, wenn du etwas nicht verstehst.",
        "lead",
    ),
    R("Wichtige Sätze", "h2"),
]

rows = [
    ["<b>Was willst du sagen?</b>", "<b>So kannst du es sagen</b>"],
    [
        "sich melden",
        f"Guten Tag, mein Name ist {B('Ana Costa')}. · Hier ist {B('Omar Saleh')}.",
    ],
    [
        "einen Termin möchten",
        "Ich möchte einen Termin machen. · Ich brauche einen Termin.",
    ],
    [
        "eine Zeit vorschlagen",
        f"Geht es {B('am Montag')}? · Haben Sie {B('am Dienstag um 10 Uhr')} Zeit?",
    ],
    ["Ja sagen", "Ja, das geht. · Ja, das passt gut."],
    ["Nein sagen", "Nein, da kann ich leider nicht. · Da arbeite ich."],
    [
        "nicht verstehen",
        "Wie bitte? · Können Sie das bitte wiederholen? · Langsam, bitte.",
    ],
    [
        "den Namen sagen",
        f"Mein Name ist Costa. Ich buchstabiere: {B('C – O – S – T – A')}.",
    ],
    ["den Termin wiederholen", f"Also {B('am Donnerstag um halb zehn')}. Vielen Dank!"],
    [
        "sich verabschieden",
        f"Auf {B('Wiederhören')}! <font color='#566078'>(am Telefon, nicht „Auf Wiedersehen“)</font>",
    ],
]
s += [table(rows, [46, 128])]

s += [
    Spacer(1, 6),
    box(
        R(
            f"<b>am</b> + Tag: am Montag, am Freitag, am Wochenende, am Vormittag<br/>"
            f"<b>um</b> + Uhrzeit: um 9 Uhr, um halb elf (10:30), um Viertel nach drei (15:15)<br/>"
            f"Zusammen: Geht es <b>am</b> Mittwoch <b>um</b> 8 Uhr?",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# Übung 1
left = [
    "Praxis Dr. Weber, guten Tag.",
    "Was kann ich für Sie tun?",
    "Sind Sie schon Patientin bei uns?",
    "Wie ist Ihr Name, bitte?",
    "Geht es am Mittwoch um 8 Uhr?",
    "Und am Freitag um halb elf?",
]
right = [
    "Nein, da arbeite ich leider.",
    "Ich möchte einen Termin machen.",
    "Ja, das passt gut. Vielen Dank!",
    "Guten Tag, mein Name ist Ana Costa.",
    "Costa. C – O – S – T – A.",
    "Nein, ich komme zum ersten Mal.",
]
key1 = {1: "d", 2: "b", 3: "f", 4: "e", 5: "a", 6: "c"}
s += [
    KeepTogether(
        task(
            1,
            "Was passt zusammen?",
            "Ana ruft beim Arzt an. Ordne die Antworten zu.",
            1,
        )
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
                [72, 16, 86],
            )
        ]
    )
]

# Übung 2
u2 = [
    "Ich habe {} Montag einen Termin beim Arzt.",
    "Der Deutschkurs beginnt {} 9 Uhr.",
    "Geht es {} Donnerstag {} halb drei?",
    "Die Praxis ist {} Mittwochnachmittag geschlossen.",
    "Kommen Sie bitte {} Viertel vor zehn.",
    "{} Wochenende arbeite ich nicht.",
    "Kann ich {} Freitag {} 11 Uhr kommen?",
]
loes2 = ["am", "um", "am · um", "am", "um", "Am", "am · um"]
G = '<font color="#8A93A8">_____</font>'
s += [
    KeepTogether(
        task(2, "am oder um?", "Ergänze am oder um.", 1)
        + [
            R(f"{i}. " + t.format(*[G] * t.count("{}")), "item")
            for i, t in enumerate(u2, 1)
        ]
    )
]

# Übung 3
order = [
    "Salon Haarmonie, Lisa am Telefon. Guten Tag!",
    "Guten Tag, hier ist Omar Saleh. Ich möchte einen Termin zum Haareschneiden.",
    "Gern. Wann haben Sie Zeit?",
    "Geht es morgen um 17 Uhr?",
    "Um 17 Uhr ist leider schon alles voll. Aber um 18 Uhr ist noch frei.",
    "Ja, 18 Uhr ist gut.",
    "Prima. Also morgen um 18 Uhr. Bis morgen, Herr Saleh!",
    "Danke, auf Wiederhören!",
]
mix = [5, 2, 8, 3, 6, 1, 7, 4]  # Position im Dialog für A, B, C …
who = lambda n: "Omar" if n in (2, 4, 6, 8) else "Lisa"
loes3 = " – ".join(chr(65 + mix.index(n)) for n in range(1, 9))
s += [
    KeepTogether(
        task(
            3,
            "Beim Friseur: Dialog ordnen",
            "Omar ruft beim Friseur an. Bring den Dialog in die richtige Reihenfolge (1–8).",
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
    )
]

# Übung 4
W = lambda n: f'({n})&nbsp;<font color="#8A93A8">____________</font>'
dlg = (
    "<b>Praxis:</b> Zahnarztpraxis Dr. Klein, guten Tag.<br/>"
    f"<b>Herr Petrov:</b> Guten Tag, ich brauche schnell einen {W(1)}. Ich habe starke {W(2)}.<br/>"
    f"<b>Praxis:</b> Oh, das tut mir leid. Können Sie {W(3)} um 11:45 Uhr kommen?<br/>"
    f"<b>Herr Petrov:</b> Wie bitte? Können Sie das bitte {W(4)}?<br/>"
    "<b>Praxis:</b> Heute um Viertel vor zwölf.<br/>"
    "<b>Herr Petrov:</b> Ja, das geht. Vielen Dank!<br/>"
    f"<b>Praxis:</b> Wie ist Ihr {W(5)}?<br/>"
    f"<b>Herr Petrov:</b> Petrov. Soll ich das {W(6)}?<br/>"
    "<b>Praxis:</b> Ja, bitte. – <b>Herr Petrov:</b> P – E – T – R – O – V.<br/>"
    f"<b>Praxis:</b> Danke. Also heute um 11:45 {W(7)}. Bitte bringen Sie Ihre Versichertenkarte mit.<br/>"
    f"<b>Herr Petrov:</b> Mache ich. Auf {W(8)}!"
)
s += [
    KeepTogether(
        task(
            4,
            "Beim Zahnarzt: Dialog ergänzen",
            "Herr Petrov hat Zahnschmerzen. Ergänze die Wörter aus dem Kasten.",
            2,
        )
        + [
            box(
                R(
                    "Termin · Schmerzen · heute · wiederholen · Uhr · buchstabieren · Name · Wiederhören",
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


# Übung 5
def karte(kopf, text):
    return [R(f"<b>{kopf}</b>", "cell"), Spacer(1, 2), R(text, "cell")]


rk = Table(
    [
        [
            karte(
                "Situation 1 · Person A (Mutter / Vater)",
                "Deine Tochter Mila hat Husten. Du rufst beim Kinderarzt an und möchtest einen Termin.<br/>"
                "Du hast Zeit: <b>Montag ab 14 Uhr</b> oder <b>Dienstag am Vormittag</b>.",
            ),
            karte(
                "Situation 1 · Person B (Praxis)",
                "Du arbeitest in der Kinderarztpraxis Dr. Yildiz. Frag nach dem Namen.<br/>"
                "Freie Termine: <b>Montag 9:30</b> · <b>Montag 15:15</b> · <b>Mittwoch 10:00</b>",
            ),
        ],
        [
            karte(
                "Situation 2 · Person A (Kundin / Kunde)",
                "Du hast am Donnerstag um 10 Uhr einen Termin beim Friseur. Du musst arbeiten und kannst nicht kommen. "
                "Du möchtest einen neuen Termin <b>am Samstag</b>.",
            ),
            karte(
                "Situation 2 · Person B (Friseur)",
                "Du arbeitest im Salon Haarmonie.<br/>Freie Termine am Samstag: <b>9:00</b> · <b>12:30</b><br/>"
                "Wiederhole am Ende den neuen Termin.",
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
            "Rollenspiel: Jetzt telefonierst du!",
            "Arbeitet zu zweit. Setzt euch Rücken an Rücken – wie am Telefon. Dann tauscht die Rollen.",
            3,
        )
        + [
            rk,
            Spacer(1, 4),
            box(
                R(
                    "<b>Für Situation 2:</b> Ich habe am Donnerstag um 10 Uhr einen Termin. Ich kann leider nicht kommen. "
                    "· Kann ich den Termin verschieben? · Haben Sie am Samstag Zeit?",
                    "cell",
                ),
                NOTE,
                GELB,
            ),
        ]
    ),
    Spacer(1, 4),
    KeepTogether([R("Schreib einen Dialog (Situation 1 oder 2) in dein Heft oder hier:", "small"), lines(4, 0)])
]

# Lösungen
bsp = (
    "<b>B:</b> Kinderarztpraxis Dr. Yildiz, guten Tag. – <b>A:</b> Guten Tag, mein Name ist … Meine Tochter Mila hat Husten. "
    "Ich brauche einen Termin. – <b>B:</b> Geht es am Montag um 9:30 Uhr? – <b>A:</b> Nein, da kann ich leider nicht. "
    "Geht es am Montag am Nachmittag? – <b>B:</b> Ja, um Viertel nach drei. – <b>A:</b> Ja, das passt gut. – "
    "<b>B:</b> Also am Montag um 15:15 Uhr. Wie ist der Name von Ihrer Tochter? – <b>A:</b> Mila … – "
    "<b>B:</b> Danke. Auf Wiederhören! – <b>A:</b> Vielen Dank. Auf Wiederhören!"
)
loes = [
    "<b>Übung 1:</b> " + " · ".join(f"{k} {v}" for k, v in key1.items()),
    "<b>Übung 2:</b> " + " · ".join(f"{i}. {x}" for i, x in enumerate(loes2, 1)),
    f"<b>Übung 3:</b> {loes3}",
    "<b>Übung 4:</b> 1. Termin · 2. Schmerzen · 3. heute · 4. wiederholen · 5. Name · 6. buchstabieren · 7. Uhr · 8. Wiederhören",
    "<b>Übung 5 (Beispiel, Situation 1):</b> "
    + bsp
    + "<br/><b>Situation 2:</b> Neuer Termin am Samstag um 9 Uhr oder um halb eins (12:30)."
    '<br/><font color="#566078">Dein Dialog ist anders? Kein Problem – wichtig sind: Name, Tag, Uhrzeit und am Ende „Auf Wiederhören!“.</font>',
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
        "Tipp: Schreib dir vor dem Anruf deine freien Zeiten auf einen Zettel. Dann bist du ganz ruhig. – Dennis",
        "hand",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
