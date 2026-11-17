# Arbeitsblatt DTB B1 Prüfung: Hören Teil 1–4 und Hören und Schreiben (Telefonat, Gesprächsnotiz)
# Format laut pruefung-fakten.js (dtb-b1) und sim/dtb-b1*.js: Hören 20 Min., 4 Teile, 19 Aufgaben (22–40), alle Texte nur EINMAL;
# Hören und Schreiben 5 Min.: Telefonat ZWEIMAL, Aufgabe 41 (a/b), dann Gesprächsnotiz 42–45 in Stichpunkten. 3 Punkte pro Höraufgabe.
# Eigene Aufgaben im Stil der Prüfung (verkürzt); alle Personen, Firmen und Nummern sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/dtb-b1-hoeren-und-telefonnotiz.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, TINTE, R as _R
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b1-hoeren-und-telefonnotiz"
TITLE = "DTB B1 Hören und Telefonnotiz: alle Teile mit Hörtexten"
LEVEL = "B1"
BOX = sym("☐")
RF = f'<font color="#566078">{BOX} richtig   {BOX} falsch</font>'
LINE_ = '<font color="#8A93A8">____</font>'


def R(h, s="p"):
    return _R(fallback(h), s)


st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5
)
st["read"] = ParagraphStyle(
    "read", parent=st["cell"], fontSize=9.4, leading=12.3, spaceAfter=1.5
)
st["tip"] = ParagraphStyle(
    "tip", parent=st["cell"], fontSize=9.5, leading=11.8, spaceAfter=1
)


def grid(rows, widths, head=True, pad=4):
    data = [
        [
            fallback(c) if False else (R(c, "cell") if isinstance(c, str) else c)
            for c in r
        ]
        for r in rows
    ]
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


def abc(nr, q, opts):
    row = [
        R(f'<font color="#566078">{BOX}</font> {l}) {o}', "tip")
        for l, o in zip("abc", opts)
    ]
    t = Table([row], colWidths=[56 * mm] * 3, hAlign="RIGHT")
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return KeepTogether([R(f"<b>{nr}.</b> {q}", "item"), t])


def rf(nr, q):
    t = Table(
        [[R(f"<b>{nr}.</b> {q}", "item"), R(RF, "cell")]],
        colWidths=[128 * mm, 40 * mm],
        hAlign="LEFT",
    )
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    return t


def situation(text):
    return box(R(text, "cell"), SOFT, TINTE)


def notiz(fuer, heights=(8, 16, 30, 26, 22)):
    """Formular für die Gesprächsnotiz (Felder wie in der Prüfungssimulation)."""
    rows = [
        [R(f'<font size="12"><b>GESPRÄCHSNOTIZ</b></font> für {fuer}', "cell"), ""],
        [R("<b>Wer?</b><br/>Name, Firma, Telefon", "cell"), ""],
        [R("<b>Anliegen</b>", "cell"), ""],
        [R("<b>Termin / Details</b>", "cell"), ""],
        [R("<b>Was tun?</b>", "cell"), ""],
    ]
    t = Table(rows, colWidths=[42 * mm, 132 * mm], rowHeights=[h * mm for h in heights])
    t.setStyle(
        TableStyle(
            [
                ("SPAN", (0, 0), (-1, 0)),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("BACKGROUND", (0, 0), (0, -1), SOFT),
                ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return t


def transcript(lines_):
    """Hörtext zum Vorlesen: eine Zeile pro Sprecherwechsel."""
    rows = [[R(f"<b>{who}:</b> {txt}", "read")] for who, txt in lines_]
    t = Table(rows, colWidths=[174 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ("TOPPADDING", (0, 0), (-1, 0), 6),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 6),
            ]
        )
    )
    return t


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B1 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("Hören und Telefonnotiz", "h1"),
    R(
        "Gespräche unter Kollegen, eine Teambesprechung, ein Verkaufsgespräch, Nachrichten auf der Mailbox und ein Telefonat "
        "mit einer Kundin: Hier üben Sie alle Teile von Hören und von Hören und Schreiben.",
        "lead",
    ),
    R("So läuft der Teil", "h2"),
    grid(
        [
            [
                "<b>Teil</b>",
                "<b>Was Sie hören und tun</b>",
                "<b>Wie oft?</b>",
                "<b>Aufg.</b>",
            ],
            [
                "<b>Hören Teil 1:</b> Arbeitsabläufe, Probleme, Vorschläge",
                "4 kurze Gespräche unter Kollegen. Zu jedem Gespräch: 1 Aussage richtig/falsch und 1 Aufgabe a, b oder c.",
                "<b>einmal</b>",
                "22–29",
            ],
            [
                "<b>Hören Teil 2:</b> Meinungen",
                "Eine Teambesprechung. Welche Aussage (a–d) passt zu welcher Person? Zwei Aussagen passen nicht.",
                "<b>einmal</b>",
                "30–31",
            ],
            [
                "<b>Hören Teil 3:</b> Gespräche über Produkte und Abläufe",
                "2 Gespräche, z. B. eine Einweisung oder ein Verkaufsgespräch. Zu jedem Gespräch 2 Aufgaben a, b oder c.",
                "<b>einmal</b>",
                "32–35",
            ],
            [
                "<b>Hören Teil 4:</b> Anliegen",
                "5 Nachrichten auf dem Anrufbeantworter oder der Mailbox. Zu jeder Nachricht 1 Aufgabe a, b oder c.",
                "<b>einmal</b>",
                "36–40",
            ],
            [
                "<b>Hören und Schreiben</b>",
                "Ein Telefongespräch. Teil 1: 1 Aufgabe a oder b (Grund für den Anruf). Teil 2: eine Gesprächsnotiz für eine Kollegin oder einen "
                "Kollegen in Stichpunkten.",
                "<b>zweimal</b>",
                "41 + Notiz 42–45",
            ],
        ],
        [46, 92, 18, 18],
        pad=3,
    ),
    Spacer(1, 3),
    box(
        R(
            "<b>Zeit:</b> Hören dauert 20 Minuten, Hören und Schreiben 5 Minuten. <b>Im Teil Hören hören Sie alle Texte nur einmal.</b> "
            "Nur das Telefonat in „Hören und Schreiben“ hören Sie zweimal. Jede Höraufgabe zählt 3 Punkte: 19 Aufgaben + Aufgabe 41 "
            "= 60 Punkte für Hören. Die Gesprächsnotiz zählt zum Schreiben.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

s += [
    R("Strategie: So gehen Sie vor", "h2"),
    grid(
        [
            ["<b>Teil</b>", "<b>Tipp</b>", "<b>Achtung, Falle!</b>"],
            [
                "<b>1</b>",
                "Vor dem Hören beide Aufgaben lesen. Achten Sie auf Problem und Lösung: Was ist kaputt? Wer macht was?",
                "Ein Vorschlag wird abgelehnt („Nein, nein, das musst du nicht …“).",
            ],
            [
                "<b>2</b>",
                "Zu jedem Namen beim Hören ein Stichwort notieren. Sätze mit „Ich finde …“, „Für mich ist …“ sind wichtig.",
                "Eine Aussage sagt die Chefin – sie gehört zu keiner der gesuchten Personen.",
            ],
            [
                "<b>3</b>",
                "Bei Produkten: Welche Eigenschaft gehört zu welchem Produkt? Die Entscheidung kommt oft am Ende.",
                "Eine Möglichkeit wird genannt (Lieferung), aber nicht gewählt.",
            ],
            [
                "<b>4</b>",
                "Lesen Sie die Frage genau: Was soll man tun? Was ändert sich? Was soll man mitbringen?",
                "Korrekturen: „nicht am Dienstag, sondern am Donnerstag“.",
            ],
            [
                "<b>H+S</b>",
                "Beim ersten Hören Name, Firma und Zahlen notieren, beim zweiten Hören kontrollieren und ergänzen.",
                "Die Anruferin korrigiert sich – nur die neue Information gehört in die Notiz.",
            ],
        ],
        [14, 90, 70],
        pad=3,
    ),
    Spacer(1, 3),
    box(
        R(
            "<b>So üben Sie zu zweit:</b> Eine Person (Partnerin, Partner oder Lehrkraft) liest die Hörtexte aus dem Lösungsteil "
            "in normalem Tempo vor – in den Übungen 1–4 <b>nur einmal</b>, in Übung 5 <b>zweimal</b>. Die anderen schauen den "
            "Lösungsteil vorher nicht an. Lesen Sie vor dem Hören immer zuerst die Aufgaben.",
            "cell",
        ),
        SOFT,
    ),
]

# ───────────────────────── Übungen ─────────────────────────
s += [CondPageBreak(70 * mm)] + task(
    1,
    "Hören Teil 1: Gespräche unter Kollegen",
    "Sie hören zwei Gespräche. Sie hören jedes Gespräch einmal. Ist die Aussage richtig oder falsch? "
    "Welche Antwort (a, b oder c) passt am besten?",
    1,
)
s += [
    R("<b>Gespräch 1</b>", "p"),
    rf(1, "Der Techniker kommt heute noch."),
    abc(
        2,
        "Was machen die Kollegen mit den Milchprodukten?",
        [
            "Sie verkaufen sie heute billiger.",
            "Sie bringen sie ins Kühlhaus.",
            "Sie werfen sie weg.",
        ],
    ),
    R("<b>Gespräch 2</b>", "p"),
    rf(3, "Jana kann am Freitag nicht mit Dawit tauschen."),
    abc(
        4,
        "Was müssen die beiden noch tun?",
        [
            "mit dem Chef sprechen",
            "den Tausch in eine Liste eintragen",
            "einen Antrag schreiben",
        ],
    ),
]

u2 = task(
    2,
    "Hören Teil 2: Meinungen in der Teambesprechung",
    "Sie hören eine Teambesprechung im Housekeeping eines Hotels. Sie hören das Gespräch einmal. Was meinen die Personen? "
    "Welche Aussage (a–d) passt zu welcher Person? Zwei Aussagen passen nicht.",
    2,
)
u2 += [
    grid(
        [
            ["<b>a</b>", "Die Pause sollte später beginnen."],
            ["<b>b</b>", "Mit festen Pausenzeiten weiß man immer, wer im Haus ist."],
            ["<b>c</b>", "Jede Person soll ihre Pause selbst planen können."],
            ["<b>d</b>", "Die Mittagspause ist zu kurz."],
        ],
        [10, 164],
        head=False,
        pad=3,
    ),
    Spacer(1, 3),
    R(
        f"<b>5.</b> Herr Mensah   Aussage: {LINE_}          <b>6.</b> Frau Kovač   Aussage: {LINE_}",
        "item",
    ),
]
s += [KeepTogether(u2)]

u3 = task(
    3,
    "Hören Teil 3: Ein Verkaufsgespräch",
    "Sie arbeiten in einem Fachgeschäft für Bürobedarf. Sie hören ein Gespräch einmal. Welche Antwort (a, b oder c) passt am besten?",
    2,
)
u3 += [
    abc(
        7,
        "Was ist richtig über den Drucker P200?",
        [
            "Er druckt auch farbig.",
            "Er kann auch scannen.",
            "Er druckt schneller als der C350.",
        ],
    ),
    abc(
        8,
        "Was macht die Kundin?",
        [
            "Sie kauft den teureren Drucker.",
            "Sie nimmt den Drucker gleich mit.",
            "Sie lässt den Drucker liefern.",
        ],
    ),
]
s += u3

u4 = task(
    4,
    "Hören Teil 4: Nachrichten auf der Mailbox",
    "Sie hören drei Nachrichten. Sie hören jede Nachricht einmal. Welche Antwort (a, b oder c) passt am besten?",
    2,
)
u4 += [
    abc(
        9,
        "Was soll Frau Yılmaz tun?",
        [
            "den Antrag noch einmal ausfüllen",
            "eine Bestätigung per E-Mail schicken",
            "Herrn Schmitz am Mittwoch besuchen",
        ],
    ),
    abc(
        10,
        "Wo ist das Paket für Herrn Petrenko?",
        ["am Empfang", "beim Hausmeister", "in einem Raum im Keller"],
    ),
    abc(11, "Was ändert sich beim Termin?", ["der Tag", "die Uhrzeit", "der Ort"]),
]
s += u4

s += [CondPageBreak(90 * mm)] + task(
    5,
    "Hören und Schreiben: Ein Telefonat, eine Notiz",
    "Prüfungsformat: Sie hören das Telefongespräch <b>zweimal</b>. Machen Sie schon beim ersten Hören Stichpunkte.",
    3,
)
s += [
    situation(
        "Sie arbeiten im Büro der Firma <b>Gartenbau Sommer</b> in Kassel. Ihre Kollegin Frau Adler ist heute im "
        "Außendienst. Sie nehmen ein Telefongespräch für sie an."
    ),
    Spacer(1, 3),
    R("<b>Teil 1:</b> Welche Antwort (a oder b) passt?", "p"),
    abc(
        12,
        "Was möchte Frau Arslan?",
        [
            "die Gartenpflege kündigen",
            "zusätzliche Arbeiten anfragen",
        ],
    ),
    Spacer(1, 2),
    R(
        "<b>Teil 2:</b> Hören Sie das Gespräch noch einmal. Schreiben Sie für Frau Adler eine Gesprächsnotiz. "
        "Notieren Sie die wichtigsten Informationen in Stichpunkten.",
        "p",
    ),
    notiz("Frau Adler"),
    Spacer(1, 3),
    box(
        R(
            f"<b>Selbstcheck:</b> {BOX} Name und Firma  {BOX} Telefonnummer vollständig  {BOX} Anliegen  "
            f"{BOX} Datum und Details  {BOX} Korrektur beachtet  {BOX} klare Aufgabe unter „Was tun?“",
            "cell",
        ),
        SOFT,
    ),
]

# ───────────────────────── Lösungen + Hörtexte ─────────────────────────
s += [
    PageBreak(),
    R("Hörtexte zum Vorlesen und Lösungen", "h2"),
    R(
        "Erst üben, dann nachschauen! Lernende decken diesen Teil ab, solange vorgelesen wird.",
        "small",
    ),
]

s += [
    KeepTogether(
        [
            R("Übung 1 · Gespräch 1 (einmal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Frau",
                        "Du, Emre, das Kühlregal mit den Milchprodukten ist ganz warm. Auf dem Display stehen zwölf Grad.",
                    ),
                    ("Mann", "Oh nein. Hast du schon den Kundendienst angerufen?"),
                    (
                        "Frau",
                        "Ja, gerade eben. Aber der Techniker kann erst morgen früh kommen.",
                    ),
                    (
                        "Mann",
                        "Dann können die Sachen nicht im Regal bleiben. Wir bringen alles ins Kühlhaus hinten im Lager. Ich hole schnell einen Rollwagen.",
                    ),
                    (
                        "Frau",
                        "Gut. Und ich hänge ein Schild für die Kunden auf: Milchprodukte heute bitte an der Kasse fragen.",
                    ),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>1 falsch</b> – „der Techniker kann erst morgen früh kommen“. <b>2 b</b> – „Wir bringen alles ins Kühlhaus.“ "
        "Von billiger verkaufen oder wegwerfen sagt niemand etwas.",
        "sol",
    )
]

s += [
    KeepTogether(
        [
            R("Übung 1 · Gespräch 2 (einmal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Mann",
                        "Jana, hast du kurz Zeit? Ich habe am Freitag Spätschicht, aber mein Sohn hat da ein Fußballturnier. Können wir tauschen?",
                    ),
                    (
                        "Frau",
                        "Freitag? Da habe ich Frühschicht … Ja, eigentlich geht das. Dann machst du aber meine Frühschicht, ab sechs Uhr.",
                    ),
                    ("Mann", "Kein Problem. Soll ich das dem Chef sagen?"),
                    (
                        "Frau",
                        "Nein, nein, das musst du nicht. Wir tragen es einfach in die Tauschliste im Pausenraum ein. Das reicht.",
                    ),
                    ("Mann", "Super, danke! Ich trage uns gleich ein."),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>3 falsch</b> – „Ja, eigentlich geht das.“ <b>4 b</b> – „Wir tragen es einfach in die Tauschliste … ein.“ "
        "<i>Falle a:</i> Dawit schlägt den Chef vor, aber Jana sagt: „Nein, nein, das musst du nicht.“",
        "sol",
    )
]

s += [
    KeepTogether(
        [
            R("Übung 2 · Teambesprechung (einmal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Frau Albrecht (Chefin)",
                        "Ab Januar möchte ich feste Pausenzeiten: Alle machen von zwölf bis halb eins Mittagspause. "
                        "Dann wissen wir immer, wer gerade im Haus ist. Was meinen Sie dazu?",
                    ),
                    (
                        "Herr Mensah",
                        "Ehrlich gesagt finde ich das nicht so gut. Um zwölf bin ich oft mitten in einem Zimmer. Ich möchte lieber "
                        "selbst entscheiden, wann ich Pause mache – zum Beispiel, wenn ein Zimmer fertig ist.",
                    ),
                    (
                        "Frau Kovač",
                        "Für mich ist zwölf Uhr zu früh. Ich fange ja erst um neun an. Wenn die Pause um eins wäre, wäre das für mich "
                        "viel besser. Aber feste Zeiten finde ich eigentlich in Ordnung.",
                    ),
                    (
                        "Frau Albrecht",
                        "Gut, danke. Dann überlege ich mir das noch einmal.",
                    ),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>5 c</b> – Herr Mensah will selbst entscheiden. <b>6 a</b> – Frau Kovač möchte die Pause um eins. "
        "<i>Übrig:</i> b sagt die Chefin, d sagt niemand.",
        "sol",
    )
]

s += [
    KeepTogether(
        [
            R("Übung 3 · Verkaufsgespräch (einmal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Kundin",
                        "Guten Tag, wir brauchen für unsere Praxis einen neuen Drucker. Was können Sie empfehlen?",
                    ),
                    (
                        "Verkäufer",
                        "Da haben wir zwei Modelle. Der P200 kostet 189 Euro. Er druckt nur schwarz-weiß, aber sehr schnell. "
                        "Der C350 kostet 279 Euro und druckt auch farbig. Dafür ist er etwas langsamer.",
                    ),
                    (
                        "Kundin",
                        "Farbe brauchen wir eigentlich nicht, wir drucken vor allem Rechnungen und Briefe. Kann man mit dem P200 auch scannen?",
                    ),
                    ("Verkäufer", "Nein, scannen kann nur der C350."),
                    (
                        "Kundin",
                        "Hm. Zum Scannen haben wir am Empfang schon ein Gerät. Dann nehme ich den günstigen.",
                    ),
                    (
                        "Verkäufer",
                        "Gern. Möchten Sie ihn mitnehmen, oder sollen wir liefern? Die Lieferung kostet neun Euro.",
                    ),
                    (
                        "Kundin",
                        "Ich nehme ihn gleich mit, mein Auto steht vor der Tür.",
                    ),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>7 c</b> – „druckt nur schwarz-weiß, aber sehr schnell“, der C350 ist langsamer. <b>8 b</b> – „Ich nehme ihn gleich mit.“ "
        "<i>Falle c:</i> Die Lieferung wird angeboten, aber nicht gewählt.",
        "sol",
    )
]

s += [
    KeepTogether(
        [
            R("Übung 4 · Drei Nachrichten (jede einmal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Nachricht 1",
                        "Guten Tag, Frau Yılmaz, hier ist Peter Schmitz aus der Personalabteilung. Ihr Antrag auf Bildungsurlaub ist da, "
                        "aber es fehlt noch die Anmeldebestätigung vom Kurs. Können Sie mir die bitte bis Mittwoch per E-Mail schicken? "
                        "Den Antrag selbst müssen Sie nicht noch einmal ausfüllen. Danke und tschüss!",
                    ),
                    (
                        "Nachricht 2",
                        "Hallo Herr Petrenko, hier ist Lisa vom Empfang. Ihr Paket von der Firma Kranz ist angekommen. Es war leider "
                        "zu groß für den Empfang. Ich habe es in den Raum null vierzehn im Keller gestellt. Den Schlüssel bekommen Sie "
                        "beim Hausmeister. Bis dann!",
                    ),
                    (
                        "Nachricht 3",
                        "Hallo, hier ist Frau Nikolić von der Betriebsärztin. Ihr Termin für die Untersuchung ist nicht am Dienstag, "
                        "sondern am Donnerstag. Die Uhrzeit bleibt gleich, also um acht. Bitte kommen Sie ohne Frühstück – Wasser "
                        "trinken dürfen Sie. Danke und bis Donnerstag!",
                    ),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>9 b</b> – „Können Sie mir die bitte bis Mittwoch per E-Mail schicken?“ a) „nicht noch einmal ausfüllen“. "
        "<b>10 c</b> – Raum 014 im Keller. b) Beim Hausmeister ist nur der Schlüssel. "
        "<b>11 a</b> – „nicht am Dienstag, sondern am Donnerstag“, die Uhrzeit bleibt gleich.",
        "sol",
    )
]

s += [
    KeepTogether(
        [
            R("Übung 5 · Telefonat (zweimal vorlesen)", "solh"),
            transcript(
                [
                    (
                        "Herr Tran",
                        "Gartenbau Sommer, Sie sprechen mit Tran, guten Tag.",
                    ),
                    (
                        "Frau Arslan",
                        "Guten Tag, hier ist Gül Arslan von der Hausverwaltung Neumann in Kassel. Ich möchte bitte Frau Adler sprechen.",
                    ),
                    (
                        "Herr Tran",
                        "Frau Adler ist heute leider im Außendienst. Kann ich ihr etwas ausrichten?",
                    ),
                    (
                        "Frau Arslan",
                        "Ja, gern. Es geht um die Wohnanlage in der Ahornstraße zwölf. Sie machen dort ja die Gartenpflege. Wir möchten "
                        "im Herbst zusätzlich die Hecken schneiden lassen, am Haupteingang und am Parkplatz. Und das Laub soll ab Oktober "
                        "jede Woche weggemacht werden … nein, Entschuldigung, alle zwei Wochen reicht.",
                    ),
                    ("Herr Tran", "Alle zwei Wochen, gut. Ab wann genau?"),
                    (
                        "Frau Arslan",
                        "Ab dem zehnten Oktober. Frau Adler soll mir bitte bis Ende nächster Woche ein Angebot per E-Mail schicken. "
                        "Vorher soll sie sich die Hecken anschauen. Der Hausmeister, Herr Kaya, ist montags bis freitags von acht bis "
                        "zwölf Uhr vor Ort.",
                    ),
                    ("Herr Tran", "Und unter welcher Nummer erreicht Frau Adler Sie?"),
                    (
                        "Frau Arslan",
                        "Null fünf sechs eins, dreiundvierzig, achtzig, siebenundneunzig.",
                    ),
                    (
                        "Herr Tran",
                        "Ich wiederhole: null fünf sechs eins, vier drei, acht null, neun sieben.",
                    ),
                    ("Frau Arslan", "Genau. Vielen Dank, auf Wiederhören!"),
                ]
            ),
        ]
    )
]
s += [
    R(
        "<b>12 b</b> – Sie möchte zusätzlich Hecken schneiden lassen und das Laub wegmachen lassen. a) Sie kündigt nicht.",
        "sol",
    ),
    KeepTogether(
        [
            R(
                "Musternotiz (andere Formulierungen sind richtig, wenn alle Informationen stimmen)",
                "solh",
            ),
            box(
                R(
                    "<b>GESPRÄCHSNOTIZ für Frau Adler</b><br/>"
                    "<b>Wer?</b> Frau Gül Arslan, Hausverwaltung Neumann, Kassel – Tel. 0561 / 43 80 97<br/>"
                    "<b>Anliegen:</b> Wohnanlage Ahornstraße 12 – zusätzlich Hecken schneiden (Haupteingang + Parkplatz) "
                    "und Laub wegmachen, <b>alle 2 Wochen</b> (nicht jede Woche)<br/>"
                    "<b>Termin / Details:</b> Laub ab 10. Oktober · Hausmeister Herr Kaya vor Ort Mo–Fr 8–12 Uhr<br/>"
                    "<b>Was tun?</b> Vorher Hecken anschauen, dann bis Ende nächster Woche Angebot per E-Mail an Frau Arslan<br/>"
                    "Tran, Büro",
                    "read",
                ),
                HELLGRUEN,
                GRUEN,
            ),
        ]
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
