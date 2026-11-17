# Arbeitsblatt DTB B1 Prüfung: Sprachbausteine und Schreiben (6 Lücken + Kurznachricht) und Sprechen Teil 1A, 1B, 2, 3
# Format laut pruefung-fakten.js (dtb-b1) und sim/dtb-b1*.js: Sprachbausteine und Schreiben 10 Min. (Aufgaben 46–51 a/b/c,
# dann Kurznachricht im Team-Chat, Aufgabe 52); Sprechen ca. 16 Min., zu zweit, keine Vorbereitungszeit:
# 1A + 1B je ca. 2 Min. pro Person, Teil 2 ca. 3 Min., Teil 3 ca. 5 Min., 60 Punkte.
# Eigene Aufgaben im Stil der Prüfung; alle Personen und Situationen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/dtb-b1-sprachbausteine-und-sprechen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, TINTE, R as _R
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b1-sprachbausteine-und-sprechen"
TITLE = "DTB B1 Sprachbausteine, Kurznachricht und Sprechen"
LEVEL = "B1"
BOX = sym("☐")
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'


def R(h, s="p"):
    return _R(fallback(h), s)


st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5
)
st["mat"] = ParagraphStyle(
    "mat", parent=st["cell"], fontSize=9.8, leading=13.2, spaceAfter=3
)
st["mus"] = ParagraphStyle(
    "mus", parent=st["cell"], fontSize=9.3, leading=12.1, spaceAfter=1.5
)
st["tip"] = ParagraphStyle(
    "tip", parent=st["cell"], fontSize=9.5, leading=11.8, spaceAfter=1
)
st["card"] = ParagraphStyle(
    "card", parent=st["cell"], fontSize=10, leading=13.4, spaceAfter=2
)
st["cardh"] = ParagraphStyle(
    "cardh",
    parent=st["cell"],
    fontName="Atk-B",
    fontSize=11,
    leading=14,
    textColor=TINTE,
    spaceAfter=3,
)


def grid(rows, widths, head=True, pad=4):
    data = [[R(c, "cell") if isinstance(c, str) else c for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
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


def card(title, paras, width=174):
    """Aufgabenkarte zum Üben: Rahmen, Titel, Text."""
    flow = [R(title, "cardh")] + [R(p, "card") for p in paras]
    t = Table([[flow]], colWidths=[width * mm])
    t.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 1.2, TINTE),
                ("BACKGROUND", (0, 0), (-1, -1), NOTE),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return t


def cards2(left, right):
    """Zwei Karten nebeneinander (Person A / Person B)."""
    t = Table(
        [[card(*left, width=85), card(*right, width=85)]], colWidths=[87 * mm, 87 * mm]
    )
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return t


def dialog(lines_, bg=HELLGRUEN):
    rows = [[R(f"<b>{who}:</b> {txt}", "mus")] for who, txt in lines_]
    t = Table(rows, colWidths=[174 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ("TOPPADDING", (0, 0), (-1, 0), 6),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 6),
                ("LINEBEFORE", (0, 0), (0, -1), 3, GRUEN),
            ]
        )
    )
    return t


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("B1 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("Sprachbausteine, Kurznachricht und Sprechen", "h1"),
    R(
        "Erst kleine Wörter mit großer Wirkung: Lücken in einer E-Mail und eine kurze Nachricht im Team-Chat. "
        "Dann die mündliche Prüfung zu zweit – mit Redemitteln, Aufgabenkarten und Musterdialog.",
        "lead",
    ),
]

# ───────────────────────── A: Sprachbausteine und Schreiben ─────────────────────────
s += [
    R("A · So läuft „Sprachbausteine und Schreiben“", "h2"),
    grid(
        [
            ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Aufgaben</b>"],
            [
                "<b>Teil 1:</b> Sprachbausteine",
                "Eine E-Mail mit 6 Lücken. Sie wählen für jede Lücke a, b oder c – Grammatik und typische Wendungen für "
                "Anfragen, Bitten und Vorschläge.",
                "46–51",
            ],
            [
                "<b>Teil 2:</b> Kurznachricht schreiben",
                "Sie antworten auf eine Nachricht, z. B. von der Chefin im Team-Chat. Sie sagen Ihre Meinung und begründen sie. "
                "<b>Aufgabe 52.</b> Gehen Sie auf alle Punkte ein und schreiben Sie ganze Sätze.",
                "Text",
            ],
        ],
        [40, 110, 24],
        pad=3,
    ),
    Spacer(1, 3),
    box(
        R(
            "<b>Zeit: 10 Minuten für beide Teile.</b> Bei den Lücken nicht zu lange überlegen – nehmen Sie sich lieber mehr "
            "Zeit für die Kurznachricht. Schreiben zählt insgesamt 60 Punkte (zusammen mit der Antwort-E-Mail und der "
            "Gesprächsnotiz).",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    R("Merkhilfe: Diese Wörter kommen oft in die Lücken", "h3"),
    grid(
        [
            ["<b>Funktion</b>", "<b>Redemittel und Grammatik</b>"],
            [
                "Höfliche Bitte",
                f"{K('Könnten Sie mir bitte …?')} · {K('Würden Sie bitte …?')}",
            ],
            [
                "Wunsch",
                f"{K('Ich würde gern + Infinitiv')} (Ich würde gern teilnehmen.) · {K('Ich hätte gern + Nomen')} (Ich hätte gern einen Termin.)",
            ],
            [
                "Grund",
                f"{K('weil / da')} … Verb am Ende · {K('denn')} + Verb auf Position 2 · {K('deshalb')} + Verb direkt danach",
            ],
            [
                "Gegensatz",
                f"{K('aber')} · {K('obwohl')} … Verb am Ende · {K('trotzdem')} + Verb direkt danach",
            ],
            [
                "Zeit / Folge",
                f"{K('Dann')} / {K('So')} können wir … (Verb auf Position 2)",
            ],
            [
                "Indirekte Frage",
                f"{K('Ich wollte fragen, ob …')} (ja/nein) · {K('…, wann / wo / wie …')}",
            ],
            [
                "Feste Verbindungen",
                f"sich freuen {K('auf')} (Zukunft) / {K('über')} (schon passiert) · warten {K('auf')} · teilnehmen {K('an')}",
            ],
        ],
        [34, 140],
        pad=3,
    ),
]

u1 = task(
    1,
    "Sprachbausteine: E-Mail an den Teamleiter",
    "Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 1–6? (In der Prüfung: Aufgaben 46–51.)",
    2,
)
gap = lambda n: (
    f'<b><font color="#2341B5">({n})</font></b> <font color="#8A93A8">________</font>'
)
s += [KeepTogether(u1 + [
    box(
        R(
            "Lieber Herr Lorenz,<br/><br/>"
            f"vielen Dank für Ihre E-Mail. {gap(1)} gern an der Erste-Hilfe-Schulung am 14. Mai teilnehmen. "
            f"Ich bringe morgens meine Tochter in die Kita, {gap(2)} kann ich erst um 9 Uhr da sein. "
            f"{gap(3)} Sie mir bitte sagen, in welchem Raum die Schulung stattfindet?<br/><br/>"
            "Ihren Vorschlag, die Dienstpläne in Zukunft per App zu verschicken, finde ich sehr gut. "
            f"{gap(4)} können wir alle Änderungen sofort auf dem Handy sehen.<br/><br/>"
            f"Außerdem wollte ich fragen, {gap(5)} ich im August zwei Wochen Urlaub nehmen kann.<br/><br/>"
            f"Ich freue mich {gap(6)} Ihre Antwort.<br/><br/>Viele Grüße<br/>Leyla Aydın",
            "mat",
        ),
        SOFT,
        TINTE,
    )]),
    Spacer(1, 3),
]
opts = [
    ["a) Ich würde", "b) Ich hätte", "c) Ich wäre"],
    ["a) weil", "b) deshalb", "c) obwohl"],
    ["a) Könnten", "b) Sollten", "c) Müssten"],
    ["a) Dann", "b) Weil", "c) Obwohl"],
    ["a) dass", "b) ob", "c) wenn"],
    ["a) über", "b) auf", "c) für"],
]
rows = []
for i in range(0, 6, 2):
    rows.append(
        [R(f"<b>{i + 1}</b>", "tip")]
        + [R(f"{BOX} {o}", "tip") for o in opts[i]]
        + [R(f"<b>{i + 2}</b>", "tip")]
        + [R(f"{BOX} {o}", "tip") for o in opts[i + 1]]
    )
ot = Table(rows, colWidths=[6 * mm] + [26 * mm] * 3 + [6 * mm] + [26 * mm] * 3)
ot.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]
    )
)
s += [ot]

s += task(
    2,
    "Kurznachricht im Team-Chat",
    "Lesen Sie die Nachricht Ihres Chefs im Team-Chat. Schreiben Sie eine Antwort, in der Sie Ihre Meinung sagen "
    "und begründen. Schreiben Sie ganze Sätze (Übungsziel: ca. 40 bis 60 Wörter).",
    2,
)
s += [
    box(
        R(
            "<b>Team-Chat „Werkstatt“ – Nachricht von Stefan Roth (Werkstattleiter):</b><br/>"
            "Hallo zusammen, im Sommer ist es in der Werkstatt am Nachmittag sehr heiß. Ich schlage vor, dass wir von Juni bis "
            "August schon um 6 Uhr anfangen und um 14:30 Uhr Feierabend machen. Was haltet ihr davon? Schreibt mir eure "
            "Meinung bis Freitag hier in den Chat. Danke! Stefan",
            "mat",
        ),
        SOFT,
        TINTE,
    ),
    Spacer(1, 3),
    grid(
        [
            ["<b>Baustein</b>", "<b>Redemittel</b>", "<b>Meine Stichpunkte</b>"],
            ["1 Gruß + Bezug", f"{K('Hallo Stefan, danke für die Frage!')}", ""],
            [
                "2 Meinung",
                f"{K('Ich finde die Idee …')} · {K('Meiner Meinung nach …')}",
                "",
            ],
            [
                "3 Grund",
                f"{K('…, weil …')} · {K('Ein Vorteil / Nachteil ist, dass …')}",
                "",
            ],
            [
                "4 Vorschlag / Wunsch",
                f"{K('Ich schlage vor, dass …')} · {K('Wie wäre es, wenn …?')}",
                "",
            ],
            ["5 Gruß + Name", f"{K('Viele Grüße')} / {K('Liebe Grüße')}, Name", ""],
        ],
        [32, 82, 60],
        pad=4,
    ),
    Spacer(1, 2),
    R(
        "Im Team-Chat ist die du-Form normal – bleiben Sie aber höflich. „Gute Idee!“ allein reicht nicht: "
        "Meinung – Grund – Vorschlag.",
        "small",
    ),
    lines(5, indent=0),
]

# ───────────────────────── B: Sprechen ─────────────────────────
s += [
    CondPageBreak(90 * mm),
    R("B · So läuft die Prüfung „Sprechen“", "h2"),
    grid(
        [
            ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Zeit</b>"],
            [
                "<b>Teil 1A:</b> Über ein Thema sprechen",
                "allein: etwa eine Minute über ein Thema aus dem Berufsleben sprechen. Stichpunkte auf der Karte helfen.",
                "ca. 2 Min. pro Person",
            ],
            [
                "<b>Teil 1B:</b> Anschlussfragen",
                "allein: Die Prüferin / der Prüfer stellt Fragen zu Ihrem Thema. Sie antworten in ganzen Sätzen und begründen.",
                "ca. 2 Min. pro Person",
            ],
            [
                "<b>Teil 2:</b> Mit Kolleginnen und Kollegen sprechen",
                "zu zweit, wie in der Pause: Erfahrungen erzählen, Fragen stellen, auf die Partnerin / den Partner reagieren.",
                "ca. 3 Min.",
            ],
            [
                "<b>Teil 3:</b> Gemeinsam etwas planen",
                "zu zweit: etwas im Betrieb planen. Vorschläge machen, reagieren, sich einigen, Aufgaben verteilen.",
                "ca. 5 Min.",
            ],
        ],
        [44, 102, 28],
        pad=3,
    ),
    Spacer(1, 3),
    box(
        R(
            "<b>Paarprüfung, insgesamt ca. 16 Minuten, keine Vorbereitungszeit, 60 Punkte.</b> Sie sehen die Aufgabe und "
            "sprechen sofort. Deshalb: Redemittel vorher so oft üben, bis sie automatisch kommen.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    R("Redemittel für alle Teile", "h3"),
    grid(
        [
            ["<b>Teil</b>", "<b>Redemittel</b>"],
            [
                "1A Thema",
                f"{K('Ich möchte etwas über … erzählen.')} · {K('Zurzeit arbeite ich als … bei …')} · "
                f"{K('Ein Vorteil ist, dass …')} · {K('Schwierig finde ich, wenn …')} · {K('Zum Schluss möchte ich sagen, dass …')}",
            ],
            [
                "1B Fragen",
                f"{K('Ich … lieber …, weil …')} · {K('Das kommt darauf an, ob …')} · {K('In meinem Heimatland war es so, dass …')} · "
                f"{K('Können Sie die Frage bitte wiederholen?')}",
            ],
            [
                "2 Kollegen",
                f"{K('Bei mir war das so: …')} · {K('Und wie ist das bei dir?')} · {K('Das kenne ich!')} · "
                f"{K('Das war bei mir ganz anders.')} · {K('Ich hätte mir gewünscht, dass …')} · {K('Mein Tipp ist: …')}",
            ],
            [
                "3 Planen",
                f"{K('Ich schlage vor, dass …')} · {K('Wie wäre es, wenn wir …?')} · {K('Was hältst du davon, wenn …?')} · "
                f"{K('Gute Idee!')} · {K('Ich bin nicht sicher, ob … Vielleicht besser …')} · "
                f"{K('Du übernimmst …, ich kümmere mich um …')} · {K('Also, zusammengefasst: …')}",
            ],
        ],
        [24, 150],
        pad=3,
    ),
]

s += task(
    3,
    "Teil 1A und 1B: Aufgabenkarten",
    "Partnerarbeit: Person A spricht etwa eine Minute über das Thema, Person B "
    "stoppt die Zeit. Danach stellt B die Fragen von der Karte (Teil 1B). Dann tauschen Sie.",
    2,
)
s += [
    cards2(
        (
            "Person A · Thema: Mein Arbeitsweg",
            [
                "• Wie kommen Sie zur Arbeit oder zum Kurs?",
                "• Wie lange dauert der Weg?",
                "• Was ist gut, was ist schwierig?",
                "• Wie war Ihr Arbeitsweg im Heimatland?",
                "<b>Fragen für Teil 1B</b> (stellt Person B):",
                "– Würden Sie für eine gute Stelle umziehen? Warum (nicht)?",
                "– Was machen Sie, wenn Bus oder Bahn ausfällt?",
                "– Was halten Sie von Arbeit im Homeoffice?",
            ],
        ),
        (
            "Person B · Thema: Weiterbildung im Beruf",
            [
                "• Haben Sie schon einen Kurs oder eine Schulung gemacht?",
                "• Warum sind Weiterbildungen wichtig?",
                "• Was kann schwierig sein (Zeit, Geld, Familie)?",
                "• Welche Weiterbildung möchten Sie gern machen?",
                "<b>Fragen für Teil 1B</b> (stellt Person A):",
                "– Lernen Sie lieber im Kurs oder online? Warum?",
                "– Wer soll eine Weiterbildung bezahlen – Sie oder die Firma?",
                "– Wie war das in Ihrem Heimatland?",
            ],
        ),
    )
]

s += [CondPageBreak(60 * mm)] + task(
    4,
    "Teil 2: Mit Kolleginnen und Kollegen sprechen",
    "Sie sind Kolleginnen / Kollegen und sprechen in der Pause. Erzählen Sie von sich, stellen Sie Fragen und reagieren Sie "
    "auf Ihre Partnerin / Ihren Partner. Sprechen Sie etwa 3 Minuten.",
    2,
)
s += [
    card(
        "Thema: Arbeit und Familie – wie schaffen Sie beides?",
        [
            "• Wie sehen Ihre Arbeitszeiten aus? Passen sie zu Ihrer Familie?",
            "• Wer hilft Ihnen, z. B. bei der Kinderbetreuung oder im Haushalt?",
            "• Was war schon einmal schwierig? Was hätten Sie sich gewünscht?",
            "• Welche Tipps haben Sie für neue Kolleginnen und Kollegen?",
        ],
    )
]

s += [CondPageBreak(70 * mm)] + task(
    5,
    "Teil 3: Gemeinsam etwas planen",
    "Ihre Kollegin Frau Wagner geht Ende Juni in Rente. Ihr Chef hat Sie beide gebeten, eine kleine Abschiedsfeier zu planen. "
    "Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich. "
    "Sprechen Sie etwa 5 Minuten.",
    3,
)
s += [
    card(
        "Abschiedsfeier für Frau Wagner planen",
        [
            "• Wann? (Tag, Uhrzeit – während der Arbeitszeit oder danach?)",
            "• Wo? (Pausenraum, Restaurant, Garten …)",
            "• Essen und Getränke?",
            "• Geschenk? Wer sammelt Geld?",
            "• Wer kümmert sich um was?",
        ],
    ),
    Spacer(1, 4),
    box(
        R(
            f"<b>Selbstcheck nach dem Gespräch:</b> {BOX} eigene Vorschläge gemacht  {BOX} auf Vorschläge reagiert "
            f"(zustimmen oder ablehnen mit Grund)  {BOX} alle Punkte besprochen  {BOX} Aufgaben verteilt  "
            f"{BOX} am Ende zusammengefasst  {BOX} beide ungefähr gleich viel gesprochen",
            "cell",
        ),
        SOFT,
    ),
]

# ───────────────────────── Lösungen ─────────────────────────
s += [
    PageBreak(),
    R("Lösungen und Muster", "h2"),
    R(
        "Erst üben, dann nachschauen! Bei den Texten und Dialogen sind auch andere Formulierungen richtig.",
        "small",
    ),
]
s += [R("Übung 1 · Sprachbausteine", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>1 a</b> – „Ich würde gern … teilnehmen“: würde + Infinitiv. „Ich hätte gern“ passt nur mit Nomen, „Ich wäre gern“ nicht zu teilnehmen.",
        "<b>2 b</b> – Nach der Lücke steht das Verb direkt („kann ich“): deshalb. weil und obwohl brauchen das Verb am Ende.",
        "<b>3 a</b> – Höfliche Bitte: „Könnten Sie mir bitte sagen …?“",
        "<b>4 a</b> – „Dann können wir …“: Verb auf Position 2. Weil / Obwohl brauchen das Verb am Ende.",
        "<b>5 b</b> – Indirekte Ja/Nein-Frage: „fragen, ob …“.",
        "<b>6 b</b> – sich freuen <b>auf</b>: Die Antwort kommt erst in der Zukunft. (sich freuen über = etwas ist schon da.)",
    ]
]
s += [
    KeepTogether(
        [
            R("Übung 2 · Muster für die Kurznachricht (ca. 60 Wörter)", "solh"),
            box(
                R(
                    "Hallo Stefan, danke für die Frage! Ich finde die Idee gut, weil es am Morgen noch nicht so heiß ist. Dann können wir "
                    "besser arbeiten und machen weniger Fehler. Für mich gibt es aber ein Problem: Ich bringe meinen Sohn um 7 Uhr in die Kita. "
                    "Deshalb schlage ich vor, dass jeder zwischen 6 und 7 Uhr anfangen kann. Viele Grüße, Tomasz",
                    "mus",
                ),
                HELLGRUEN,
                GRUEN,
            ),
        ]
    )
]
s += [
    KeepTogether(
        [
            R("Übung 3 · Muster Teil 1A (Person A, ca. 1 Minute)", "solh"),
            box(
                R(
                    "Ich möchte etwas über meinen Arbeitsweg erzählen. Zurzeit arbeite ich als Lagerhelfer in einem Logistikzentrum. "
                    "Ich fahre jeden Morgen mit dem Bus und mit der S-Bahn, das dauert ungefähr 40 Minuten. Ein Vorteil ist, dass ich im Bus "
                    "Deutsch lernen kann – ich höre zum Beispiel Podcasts. Schwierig finde ich, wenn die S-Bahn ausfällt. Dann komme ich zu spät "
                    "und muss im Büro anrufen. In meinem Heimatland, in Eritrea, bin ich zu Fuß zur Arbeit gegangen, nur zehn Minuten. "
                    "Zum Schluss möchte ich sagen: Der Weg ist lang, aber die Arbeit gefällt mir.",
                    "mus",
                ),
                HELLGRUEN,
                GRUEN,
            ),
        ]
    )
]
s += [
    KeepTogether(
        [
            R("Übung 4 · Musterdialog Teil 2 (Ausschnitt)", "solh"),
            dialog(
                [
                    (
                        "A",
                        "Sag mal, wie schaffst du das eigentlich mit deinen zwei Kindern und der Schichtarbeit?",
                    ),
                    (
                        "B",
                        "Ehrlich gesagt ist das nicht leicht. Bei mir ist es so: Wenn ich Frühschicht habe, bringt mein Mann die Kinder in die Schule. Und bei dir?",
                    ),
                    (
                        "A",
                        "Bei mir ist das ganz anders. Ich wohne allein, aber meine Mutter ist krank. Ich besuche sie jeden Abend.",
                    ),
                    (
                        "B",
                        "Oh, das ist bestimmt anstrengend. Was war für dich am schwierigsten?",
                    ),
                    (
                        "A",
                        "Am Anfang die Wochenendarbeit. Ich hätte mir gewünscht, dass ich den Dienstplan früher bekomme.",
                    ),
                    (
                        "B",
                        "Das kenne ich! Mein Tipp für neue Kollegen ist: Sprecht früh mit der Teamleitung, die ist meistens sehr flexibel.",
                    ),
                ]
            ),
        ]
    )
]
s += [
    KeepTogether(
        [
            R("Übung 5 · Musterdialog Teil 3", "solh"),
            dialog(
                [
                    (
                        "A",
                        "Also, Frau Wagner geht Ende Juni in Rente. Wann wollen wir die Feier machen?",
                    ),
                    (
                        "B",
                        "Ich schlage vor, dass wir am Freitag, dem 26. Juni, feiern. Freitags ist weniger zu tun.",
                    ),
                    ("A", "Gute Idee. Aber während der Arbeitszeit oder danach?"),
                    (
                        "B",
                        "Wie wäre es mit der letzten Stunde, also von 14 bis 15 Uhr? Dann können alle kommen, auch die Kollegen mit Kindern.",
                    ),
                    ("A", "Das finde ich gut. Und wo? Im Restaurant?"),
                    (
                        "B",
                        "Ich bin nicht sicher, ob das klappt – das ist teuer und dauert lange. Vielleicht besser im Pausenraum? Wir können ihn schön dekorieren.",
                    ),
                    (
                        "A",
                        "Einverstanden. Was hältst du davon, wenn jeder etwas zu essen mitbringt? Getränke kaufe ich.",
                    ),
                    (
                        "B",
                        "Super. Und ein Geschenk? Frau Wagner gärtnert doch so gern. Wie wäre es mit einem Gutschein für eine Gärtnerei?",
                    ),
                    (
                        "A",
                        "Schöne Idee! Ich sammle das Geld, sagen wir fünf Euro pro Person.",
                    ),
                    (
                        "B",
                        "Gut. Dann kümmere ich mich um den Gutschein und eine Karte, und alle unterschreiben.",
                    ),
                    (
                        "A",
                        "Also, zusammengefasst: Feier am Freitag, 26. Juni, von 14 bis 15 Uhr im Pausenraum. Jeder bringt etwas zu essen mit, "
                        "ich kaufe die Getränke und sammle das Geld, du besorgst den Gutschein und die Karte.",
                    ),
                    ("B", "Genau. Dann sagen wir es morgen dem Chef."),
                ]
            ),
        ]
    )
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
