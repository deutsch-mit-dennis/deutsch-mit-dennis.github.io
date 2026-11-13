# Arbeitsblatt A1 Wortschatz: Freizeit und Hobbys – Was machst du gern?
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/freizeit-und-hobbys.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle

SLUG = "freizeit-und-hobbys"
TITLE = "Freizeit und Hobbys: Was machst du gern?"
LEVEL = "A1"
B = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
G = '<font color="#8A93A8">__________</font>'
STAR = lambda n: (
    f'<font name="Sym" color="#E8A800">{"★" * n}</font><font name="Sym" color="#DADFEA">{"★" * (3 - n)}</font>'
)


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
    R("A1 · Wortschatz · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Sport, Musik, Freunde treffen: die wichtigsten Wörter für die Freizeit – und wie du sagst, "
        "was du gern, lieber und am liebsten machst.",
        "lead",
    ),
    R("Wortliste: Was machst du in deiner Freizeit?", "h2"),
]

words = [
    ("Fußball " + B("spielen"), "Ich spiele Fußball."),
    (B("schwimmen"), "Ich schwimme."),
    ("Rad " + B("fahren"), "Ich fahre Rad. · Er fährt Rad."),
    ("ein Buch " + B("lesen"), "Ich lese. · Sie liest."),
    ("Musik " + B("hören"), "Ich höre Musik."),
    (B("tanzen"), "Ich tanze."),
    (B("kochen"), "Ich koche."),
    ("Freunde " + B("treffen"), "Ich treffe Freunde. · Er trifft Freunde."),
    ("spazieren " + B("gehen"), "Ich gehe spazieren."),
    ("ins Kino " + B("gehen"), "Ich gehe ins Kino."),
    (B("fernsehen"), "Ich sehe fern. · Sie sieht fern."),
    ("Gitarre " + B("spielen"), "Ich spiele Gitarre."),
    (B("fotografieren"), "Ich fotografiere."),
    ("im Garten " + B("arbeiten"), "Ich arbeite im Garten."),
]
half = len(words) // 2
rows = [["<b>Hobby</b>", "<b>Satz</b>", "<b>Hobby</b>", "<b>Satz</b>"]]
for a, b in zip(words[:half], words[half:]):
    rows.append([a[0], a[1], b[0], b[1]])
s += [table(rows, [34, 53, 34, 53])]
s += [
    Spacer(1, 4),
    R(
        "<b>Nomen:</b> die Freizeit · das Hobby, die Hobbys · das Wochenende · der Sport · der Verein, die Vereine · "
        "das Fitnessstudio · das Instrument",
        "small",
    ),
    Spacer(1, 4),
    box(
        R(
            f"<b>gern</b> {STAR(1)} &nbsp; Ich spiele <b>gern</b> Fußball.<br/>"
            f"<b>lieber</b> {STAR(2)} &nbsp; Ich schwimme <b>lieber</b>.<br/>"
            f"<b>am liebsten</b> {STAR(3)} &nbsp; <b>Am liebsten</b> koche ich.<br/>"
            "<b>nicht gern:</b> Ich tanze <b>nicht gern</b>.<br/>"
            "<b>Wie oft?</b> immer · oft · manchmal · selten · nie &nbsp;"
            + ARROW
            + "&nbsp; Ich gehe <b>selten</b> ins Kino.<br/>"
            "<b>Achtung, Satzbau:</b> Das Verb steht auf Platz 2. "
            "<b>Am Wochenende</b> <u>gehe</u> ich oft schwimmen.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# Übung 1 – Verb zuordnen
u1 = [
    "Fußball",
    "ins Kino",
    "Musik",
    "Rad",
    "Freunde",
    "ein Buch",
    "Gitarre",
    "spazieren",
]
loes1 = ["spielen", "gehen", "hören", "fahren", "treffen", "lesen", "spielen", "gehen"]
cells = [R(f"{i}. {w} {G}", "cell") for i, w in enumerate(u1, 1)]
s += [
    KeepTogether(
        task(
            1,
            "Welches Verb passt?",
            "Ergänze das Verb. Zwei Verben brauchst du zweimal.",
            1,
        )
        + [
            box(
                R("spielen · gehen · hören · fahren · treffen · lesen", "cell"),
                HELLGRUEN,
                GRUEN,
            ),
            Spacer(1, 4),
            grid([cells[i : i + 2] for i in range(0, 8, 2)], [87, 87], pad=5),
        ]
    )
]

# Übung 2 – Verbformen
u2 = [
    ("Mein Sohn {} gern Fußball.", "spielen", "spielt"),
    ("{} du gern Krimis?", "lesen", "Liest"),
    ("Frau Ahmadi {} jeden Morgen Rad.", "fahren", "fährt"),
    ("Am Samstag {} ich meine Freunde.", "treffen", "treffe"),
    ("Wir {} am Sonntag im Park spazieren.", "gehen", "gehen"),
    ("Ihr {} sehr gut!", "tanzen", "tanzt"),
    ("Mein Mann {} abends gern fern.", "sehen", "sieht"),
    ("Was {} Sie in Ihrer Freizeit?", "machen", "machen"),
]
s += [
    KeepTogether(
        task(
            2,
            "Verben in der richtigen Form",
            "Schreib das Verb in der richtigen Form. Achtung: lesen, fahren, treffen, sehen ändern den Vokal!",
            1,
        )
        + [
            grid(
                [
                    [
                        R(
                            f"{i + k}. "
                            + u2[i + k - 1][0].format(G)
                            + f' <font color="#566078">({u2[i + k - 1][1]})</font>',
                            "cell",
                        )
                        for k in (0, 4)
                    ]
                    for i in range(1, 5)
                ],
                [87, 87],
                pad=5,
            )
        ]
    )
]

# Übung 3 – gern, lieber, am liebsten
ppl = [
    ("Karim (Beispiel)", ["Fußball spielen", "schwimmen", "kochen"]),
    ("Elena", ["lesen", "tanzen", "Musik hören"]),
    ("Herr und Frau Nowak", ["fernsehen", "spazieren gehen", "im Garten arbeiten"]),
]
rows3 = [
    [
        "<b>Person</b>",
        f"<b>gern</b> {STAR(1)}",
        f"<b>lieber</b> {STAR(2)}",
        f"<b>am liebsten</b> {STAR(3)}",
    ]
]
for n, h in ppl:
    rows3.append([f"<b>{n}</b>"] + h)
s += [
    KeepTogether(
        task(
            3,
            "gern – lieber – am liebsten",
            "Schau die Tabelle an und schreib drei Sätze für Elena und drei Sätze für Herrn und Frau Nowak.",
            2,
        )
        + [
            table(rows3, [46, 40, 40, 48]),
            Spacer(1, 4),
            box(
                R(
                    "<b>Beispiel:</b> Karim spielt gern Fußball. Er schwimmt lieber. Am liebsten kocht er.",
                    "cell",
                ),
                SOFT,
            ),
            Spacer(1, 3),
            R("<b>Elena:</b>", "small"),
            lines(2, 0),
            R("<b>Herr und Frau Nowak:</b>", "small"),
            lines(2, 0),
        ]
    )
]

# Übung 4 – Lesetext
text = (
    "Hallo! Ich heiße Tamara und wohne mit meiner Tochter in Dortmund. Ich arbeite in einer Bäckerei. "
    "Ich stehe sehr früh auf, schon um vier Uhr. Nach der Arbeit bin ich oft müde. Dann höre ich Musik oder ich sehe fern. "
    "Am Wochenende habe ich mehr Zeit. Am Samstag gehe ich mit meiner Tochter schwimmen. Sie ist acht Jahre alt und "
    "schwimmt schon sehr gut. Am Sonntag treffe ich manchmal meine Freundin Leyla. Wir gehen im Park spazieren oder "
    "trinken Kaffee. Ich koche auch gern – am liebsten Pelmeni, wie meine Oma. Ins Kino gehe ich selten. Das ist teuer."
)
rf = [
    ("Tamara arbeitet in einem Supermarkt.", "f"),
    ("Nach der Arbeit macht Tamara oft Sport.", "f"),
    ("Am Samstag geht sie mit ihrer Tochter schwimmen.", "r"),
    ("Am Sonntag trifft sie immer ihre Freundin Leyla.", "f"),
    ("Tamara kocht gern.", "r"),
    ("Tamara geht oft ins Kino.", "f"),
]
s += [
    KeepTogether(
        task(
            4,
            "Lesen: Tamaras Freizeit",
            "Lies den Text. Richtig oder falsch? Kreuze an.",
            2,
        )
        + [
            box(R(text, "p"), SOFT),
            Spacer(1, 4),
            grid(
                [
                    [
                        R("", "cell"),
                        R("<b>richtig</b>", "cell"),
                        R("<b>falsch</b>", "cell"),
                    ]
                ]
                + [
                    [R(f"{i}. {t}", "cell"), R(sym("☐"), "cell"), R(sym("☐"), "cell")]
                    for i, (t, _) in enumerate(rf, 1)
                ],
                [130, 22, 22],
            ),
        ]
    )
]

# Übung 5 – Interview und eigener Text
qs = [
    "Was machst du gern in deiner Freizeit?",
    "Was machst du am Wochenende?",
    "Machst du Sport? Wie oft?",
    "Spielst du ein Instrument?",
    "Was machst du nicht gern?",
]
s += [
    KeepTogether(
        task(
            5,
            "Interview: Und du?",
            "Arbeitet zu zweit. Fragt und antwortet. Schreibt die Antworten von eurem Partner / eurer Partnerin auf.",
            3,
        )
        + [
            grid(
                [
                    [
                        R("<b>Frage</b>", "cell"),
                        R(
                            "<b>Antwort von meinem Partner / meiner Partnerin</b>",
                            "cell",
                        ),
                    ]
                ]
                + [
                    [R(f"{i}. {q}", "cell"), R("", "cell")] for i, q in enumerate(qs, 1)
                ],
                [78, 96],
                pad=7,
            )
        ]
    ),
    Spacer(1, 4),
    KeepTogether(
        [
            R(
                "Schreib jetzt über dich: Was machst du gern, lieber, am liebsten? Was machst du nie? (4–6 Sätze)",
                "small",
            ),
            lines(5, 0),
        ]
    ),
]

# Lösungen
loes = [
    "<b>Übung 1:</b> "
    + " · ".join(f"{i}. {w} {v}" for i, (w, v) in enumerate(zip(u1, loes1), 1)),
    "<b>Übung 2:</b> " + " · ".join(f"{i}. {x}" for i, (_, _, x) in enumerate(u2, 1)),
    "<b>Übung 3:</b> Elena liest gern. Sie tanzt lieber. Am liebsten hört sie Musik.<br/>"
    "Herr und Frau Nowak sehen gern fern. Sie gehen lieber spazieren. Am liebsten arbeiten sie im Garten.",
    "<b>Übung 4:</b> "
    + " · ".join(
        f"{i}. {'richtig' if x == 'r' else 'falsch'}" for i, (_, x) in enumerate(rf, 1)
    )
    + '<br/><font color="#566078">1. Sie arbeitet in einer Bäckerei. · 2. Sie hört Musik oder sieht fern. · '
    "4. Nur manchmal. · 6. Sie geht selten ins Kino.</font>",
    "<b>Übung 5 (Beispiel):</b> In meiner Freizeit spiele ich gern Karten. Ich fahre lieber Rad. "
    "Am liebsten treffe ich meine Freunde. Am Wochenende gehe ich oft mit meinen Kindern in den Park. "
    "Ich gehe manchmal ins Fitnessstudio. Ich tanze nie."
    '<br/><font color="#566078">Dein Text ist anders? Super! Wichtig: Das Verb steht auf Platz 2.</font>',
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
        "Tipp: Viele Städte haben Sportvereine und Kurse für wenig Geld. Dort sprichst du ganz natürlich Deutsch! – Dennis",
        "hand",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
