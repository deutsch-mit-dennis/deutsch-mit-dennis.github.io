# Arbeitsblatt A2 Lesen: Aushänge im Wohnhaus verstehen
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/aushaenge-im-wohnhaus-verstehen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "aushaenge-im-wohnhaus-verstehen"
TITLE = "Aushänge im Wohnhaus verstehen"
LEVEL = "A2"
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.5)
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
    R("A2 · Lesen · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R(
        "Kein Wasser, ein Termin für die Heizung, ein Fest im Hof: Im Treppenhaus hängen oft wichtige Informationen. "
        "Lies vier Aushänge und finde die wichtigen Informationen – wie in der DTZ.",
        "lead",
    ),
    R("Wichtige Wörter", "h2"),
]

words = [
    ["die Hausverwaltung", "Firma, die für das Haus und die Mieter zuständig ist"],
    ["der Hausmeister", "Mann, der im Haus repariert, putzt und hilft"],
    ["das Wasser abstellen", "das Wasser stoppen – es kommt kein Wasser mehr"],
    ["den Zähler ablesen", "die Zahl am Zähler ansehen und notieren"],
    ["der Heizkörper", "das Gerät an der Wand, das warm wird"],
    ["das Treppenhaus", "die Treppen und Flure im Haus"],
    ["ab sofort", "von jetzt an"],
    ["um Verständnis bitten", "hoffen, dass niemand böse ist"],
]
s += [
    grid([[R(f"<b>{a}</b>", "cell"), R(b, "cell")] for a, b in words], [52, 122], 2.5)
]

TA = (
    "<b>Wasser abgestellt</b><br/>Liebe Mieterinnen und Mieter,<br/>am <b>Dienstag, 3. November</b>, stellen wir von "
    "8 bis ca. 12 Uhr das Wasser im ganzen Haus ab. Grund: Reparatur an der Hauptleitung im Keller. "
    "Bitte füllen Sie vorher Wasser in Flaschen oder Töpfe.<br/>Vielen Dank!<br/><i>Ihre Hausverwaltung Kröger</i>"
)
TB = (
    "<b>Ablesung der Heizungszähler</b><br/>Am <b>Donnerstag, 5. November</b>, zwischen 9 und 13 Uhr liest die Firma "
    "Messtec die Zähler an den Heizkörpern in allen Wohnungen ab. Bitte stellen Sie keine Möbel vor die Heizkörper.<br/>"
    "Sie sind nicht zu Hause? Dann geben Sie Ihren Schlüssel bei Herrn Novak (Erdgeschoss rechts) ab oder rufen Sie bis "
    "4. November unter 0351 482 17 90 an."
)
TC = (
    "<b>Treppenhaus frei halten!</b><br/>Im Treppenhaus stehen immer wieder Fahrräder und Kinderwagen. Das ist "
    "gefährlich: Bei einem Feuer muss der Weg nach draußen frei sein. Bitte stellen Sie Fahrräder in den Fahrradkeller. "
    "Für Kinderwagen gibt es ab sofort einen Raum neben dem Eingang. Den Schlüssel bekommen Sie bei mir.<br/>"
    "Ab dem 16. November entferne ich alle Sachen im Treppenhaus.<br/><i>Ihr Hausmeister M. Novak</i>"
)
TD = (
    "<b>Hallo, liebe Nachbarn!</b><br/>Wir sind Familie Mensah aus dem 2. Stock. Am <b>Samstag, 7. November</b>, feiern "
    "wir den 5. Geburtstag von unserem Sohn Kofi. Am Nachmittag kann es ein bisschen lauter werden – wir bitten um "
    "Verständnis! Um 20 Uhr ist Schluss.<br/>Ab 16 Uhr gibt es Kaffee und Kuchen im Hof. Alle sind herzlich eingeladen!"
    "<br/><i>Ama und Daniel Mensah</i>"
)


def zettel(letter, txt):
    return [
        R(f'<font size="13" color="#2341B5"><b>{letter}</b></font>', "cell"),
        Spacer(1, 2),
        R(txt, "txt"),
    ]


zt = Table(
    [[zettel("A", TA), zettel("B", TB)], [zettel("C", TC), zettel("D", TD)]],
    colWidths=[87 * mm, 87 * mm],
)
zt.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BACKGROUND", (0, 0), (-1, -1), NOTE),
            ("BOX", (0, 0), (-1, -1), 0.8, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.8, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]
    )
)
s += [KeepTogether([R("Die vier Aushänge", "h2"), zt])]

# Übung 1
heads = [
    "Kein Wasser am Dienstagvormittag",
    "Neue Mülltonnen im Hof",
    "Heizung: Wir kommen in Ihre Wohnung",
    "Bitte keine Sachen auf der Treppe",
    "Kindergeburtstag: Kaffee und Kuchen für alle",
    "Neuer Hausmeister ab November",
]
key1 = "A a · B c · C d · D e (b und f passen nicht)"
s += [
    KeepTogether(
        task(
            1,
            "Welche Überschrift passt?",
            "Ordne jedem Aushang (A–D) eine Überschrift zu. Zwei Überschriften passen nicht.",
            1,
        )
        + [
            grid(
                [
                    [R(f"{chr(97 + i)}) {h}", "cell"), R("Aushang: ____", "cell")]
                    for i, h in enumerate(heads)
                ],
                [134, 40],
            )
        ]
    )
]

# Übung 2
rf = [
    ("Am 3. November gibt es den ganzen Tag kein Wasser.", "f"),
    ("Die Mieter sollen vor dem 3. November Wasser in Flaschen füllen.", "r"),
    ("Die Firma Messtec kommt am Nachmittag.", "f"),
    (
        "Wer am 5. November nicht zu Hause ist, kann den Schlüssel beim Hausmeister abgeben.",
        "r",
    ),
    ("Kleine Fahrräder dürfen im Treppenhaus stehen.", "f"),
    ("Den Schlüssel für den Raum mit den Kinderwagen hat Herr Novak.", "r"),
    ("Familie Mensah feiert bis spät in die Nacht.", "f"),
    ("Alle Nachbarn dürfen zum Kaffee in den Hof kommen.", "r"),
]
s += [
    KeepTogether(
        task(
            2, "Richtig oder falsch?", "Lies die Aushänge noch einmal und kreuze an.", 1
        )
        + [
            grid(
                [
                    [
                        R("<b>Aussage</b>", "cell"),
                        R("<b>richtig</b>", "cell"),
                        R("<b>falsch</b>", "cell"),
                    ]
                ]
                + [
                    [R(f"{i}. {t}", "cell"), R(sym("☐"), "cell"), R(sym("☐"), "cell")]
                    for i, (t, _) in enumerate(rf, 1)
                ],
                [140, 17, 17],
            )
        ]
    )
]

# Übung 3
fr = [
    "Warum stellt die Hausverwaltung das Wasser ab?",
    "Was dürfen die Mieter nicht vor die Heizkörper stellen?",
    "Bis wann muss man anrufen, wenn man am 5. November nicht zu Hause ist?",
    "Was macht Herr Novak ab dem 16. November?",
    "Wie alt wird Kofi?",
]
s += task(3, "Fragen zum Text", "Antworte kurz. Ein paar Wörter reichen.", 2)
s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)]) for i, t in enumerate(fr, 1)]

# Übung 4
w4 = [
    "abstellen",
    "entfernen",
    "zuständig sein",
    "frei halten",
    "herzlich eingeladen sein",
    "Schluss sein",
]
d4 = [
    "dort darf nichts stehen",
    "wegnehmen",
    "willkommen sein",
    "aufhören, zu Ende sein",
    "stoppen, ausmachen",
    "sich um etwas kümmern müssen",
]
key4 = "1 e · 2 b · 3 f · 4 a · 5 c · 6 d"
s += [
    KeepTogether(
        task(
            4,
            "Was bedeutet das?",
            "Die Wörter stehen in den Aushängen oder in der Wortliste. Ordne zu.",
            2,
        )
        + [
            grid(
                [
                    [
                        R(f"{i + 1}. {a}", "cell"),
                        R("____", "cell"),
                        R(f"{chr(97 + i)}) {b}", "cell"),
                    ]
                    for i, (a, b) in enumerate(zip(w4, d4))
                ],
                [62, 16, 96],
            )
        ]
    )
]

# Übung 5
s += [
    KeepTogether(
        task(
            5,
            "Schreib eine kurze Nachricht",
            "Wähle eine Situation. Schreib 3–4 Sätze: Anrede, Grund, Bitte oder Antwort, Gruß.",
            3,
        )
        + [
            box(
                R(
                    f"<b>Situation 1:</b> Du bist am 5. November bei der Arbeit (Aushang B). Schreib Herrn Novak einen Zettel: "
                    f"Du möchtest ihm den Schlüssel am Mittwochabend bringen. Wann passt es ihm?<br/>"
                    f"<b>Situation 2:</b> Du möchtest zum Fest von Familie Mensah kommen (Aushang D). Schreib eine kurze Antwort: "
                    f"Du kommst mit deiner Tochter und bringst etwas mit.",
                    "cell",
                ),
                SOFT,
            ),
            Spacer(1, 4),
            lines(5, 0),
        ]
    )
]

# Lösungen
loes = [
    f"<b>Übung 1:</b> {key1}",
    "<b>Übung 2:</b> "
    + " · ".join(f"{i}. {x}" for i, (_, x) in enumerate(rf, 1))
    + "  (r = richtig, f = falsch)",
    "<b>Übung 3:</b> 1. Wegen einer Reparatur an der Hauptleitung im Keller. · 2. Möbel. · 3. Bis zum 4. November. · "
    "4. Er entfernt alle Sachen im Treppenhaus. · 5. Fünf Jahre.",
    f"<b>Übung 4:</b> {key4}",
    "<b>Übung 5 (Beispiele):</b><br/>"
    "1) Sehr geehrter Herr Novak, am Donnerstag, 5. November, bin ich leider bei der Arbeit. Kann ich Ihnen meinen "
    "Schlüssel am Mittwochabend bringen? Passt es Ihnen um 19 Uhr? Vielen Dank! Viele Grüße, Lina Petrova (3. Stock links)<br/>"
    "2) Liebe Familie Mensah, vielen Dank für die Einladung! Ich komme gern mit meiner Tochter Sara um 16 Uhr in den Hof. "
    "Wir bringen einen Apfelkuchen mit. Bis Samstag! Viele Grüße, Lina"
    '<br/><font color="#566078">Prüfe deinen Text: Hast du eine Anrede, einen Grund, eine Bitte oder Antwort und einen Gruß?</font>',
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
        "Tipp: Lies im Treppenhaus jede Woche die Aushänge. Das ist kostenloses Lesetraining! – Dennis",
        "hand",
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
