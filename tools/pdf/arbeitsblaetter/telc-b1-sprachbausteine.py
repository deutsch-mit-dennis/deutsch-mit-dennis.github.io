# Arbeitsblatt B1 Prüfung: telc Deutsch B1 – Sprachbausteine Teil 1 und 2
# Format laut pruefung-fakten.js (telc-b1) und sim/telc-b1.js: Teil 1 Brief mit 10 Lücken (a/b/c), Teil 2 Text mit 10 Lücken
# und 15 Wörtern (a–o), je 1,5 Punkte, zusammen 30 Punkte. Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/telc-b1-sprachbausteine.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b1-sprachbausteine"
TITLE = "telc B1 Sprachbausteine: Grammatik und Wortschatz im Brief"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
G = lambda n: f'<b>({n})</b> <font color="#8A93A8">________</font>'
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10.3, leading=15)
st["optc"] = ParagraphStyle("optc", parent=st["cell"], fontSize=9.8, leading=12.5)
st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5
)

s = [
    R("B1 · Prüfung · Arbeitsblatt · telc Deutsch B1", "kick"),
    R("telc B1: Sprachbausteine", "h1"),
    R(
        "Präpositionen, Artikel und Endungen, Konnektoren, Relativpronomen – in den Sprachbausteinen zählt jedes kleine Wort. "
        "Alle Texte sind eigene Übungstexte im Stil der Prüfung.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            [
                "<b>Sprach­bausteine 1</b>",
                "Ein Brief oder eine E-Mail mit 10 Lücken. Für jede Lücke gibt es drei Lösungen (a, b, c). "
                "Hier wird vor allem Grammatik geprüft.",
                "ca. 15 Min.",
                fallback("10 × 1,5 = 15"),
            ],
            [
                "<b>Sprach­bausteine 2</b>",
                "Ein Text (oft ein formeller Brief oder eine Mitteilung) mit 10 Lücken und 15 Wörtern (a–o). "
                "Jedes Wort passt nur einmal, 5 Wörter bleiben übrig.",
                "ca. 15 Min.",
                fallback("10 × 1,5 = 15"),
            ],
        ],
        [28, 98, 22, 26],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Die Sprachbausteine gehören zu den <b>90 Minuten</b> für Leseverstehen und Sprachbausteine. "
            "Die Zeiten oben sind Empfehlungen. Insgesamt gibt es hier <b>30 Punkte</b>.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    R("Vier Strategie-Tipps", "h2"),
    R(
        "<b>1. Den ganzen Satz lesen.</b> Nicht nur das Wort vor der Lücke – oft entscheidet das Ende des Satzes (Verb am Ende? Kasus?).",
        "item",
    ),
    R(
        "<b>2. Fragen: Was für ein Wort fehlt?</b> Präposition, Artikel oder Endung, Pronomen, Konnektor, Verbform?",
        "item",
    ),
    R(
        "<b>3. Wortstellung prüfen.</b> Nach <i>weil, dass, ob, wenn, falls</i> steht das Verb am Ende. Nach <i>deshalb, trotzdem, dann</i> "
        "am Satzanfang kommt sofort das Verb. Nach <i>denn, aber, und</i> bleibt die normale Wortstellung.",
        "item",
    ),
    R(
        "<b>4. In Teil 2 zuerst die sicheren Lücken.</b> Sortieren Sie die 15 Wörter grob (Präpositionen, Konnektoren, Pronomen, "
        "Adverbien) und streichen Sie benutzte Wörter durch.",
        "item",
    ),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Thema</b>", "<b>Achtung!</b>"],
            [
                "Konnektoren",
                "<i>weil</i> (Verb am Ende) – <i>denn</i> (Verb auf Position 2) – <i>deshalb</i> (Verb direkt danach)",
            ],
            [
                "wenn / als / wann",
                "<i>als</i> = einmal in der Vergangenheit · <i>wenn</i> = immer wieder oder in der Zukunft · <i>wann</i> = Fragewort",
            ],
            [
                "dass / ob",
                "<i>ob</i> bei einer Ja/Nein-Frage („Ich weiß nicht, ob …“), sonst <i>dass</i>",
            ],
            [
                "Verb + Präposition",
                "sich freuen <i>über</i> (schon passiert) / <i>auf</i> (kommt noch) · warten <i>auf</i> · denken <i>an</i> · "
                "sich interessieren <i>für</i>",
            ],
            [
                "Relativpronomen",
                "Präposition + Pronomen: <i>mit denen, bei dem, für die</i> – Kasus kommt von der Präposition",
            ],
        ],
        [34, 140],
    ),
]

# ── Übung 1: Aufwärmen ──
warm = [
    ("Ich interessiere mich sehr ____ den Kurs.", "für"),
    ("Wir warten schon seit einer Stunde ____ den Bus.", "auf"),
    ("Hast du ____ den Termin beim Arzt gedacht?", "an"),
    ("Mein Sohn hat sich sehr ____ das Geschenk gefreut.", "über"),
    ("Ich möchte mich ____ die Stelle als Verkäuferin bewerben.", "um"),
    ("Kannst du mir ____ dem Umzug helfen?", "bei"),
]
s += [Spacer(1, 2)]
s += [
    KeepTogether(
        task(
            1,
            "Aufwärmen: Verben mit Präposition",
            "Welche Präposition fehlt? Schreiben Sie sie in die Lücke.",
            1,
        )
        + [
            R(f"{i}. {q.replace('____', GAP)}", "item")
            for i, (q, _) in enumerate(warm, 1)
        ]
    )
]

# ── Übung 2: Sprachbausteine Teil 1 ──
mail = (
    "Liebe Svetlana,<br/>"
    f"vielen Dank für deine E-Mail. Ich habe mich sehr über {G(1)} Nachricht gefreut. Entschuldige, dass ich erst heute antworte, "
    f"{G(2)} ich hatte in den letzten Wochen viel Stress.<br/>"
    f"Wie du weißt, arbeite ich seit Mai {G(3)} Krankenhaus. Die Arbeit gefällt mir gut, aber die Kolleginnen und Kollegen, mit "
    f"{G(4)} ich zusammenarbeite, kenne ich noch nicht so gut. {G(5)} ich frei habe, gehe ich mit meiner Tochter in den Park. "
    f"Sie ist jetzt drei und spielt am liebsten {G(6)} anderen Kindern.<br/>"
    f"Nächsten Monat habe ich endlich Urlaub. Hast du Lust, mich {G(7)} besuchen? Du {G(8)} gern bei uns wohnen, wir haben jetzt "
    f"ein kleines Gästezimmer. Schreib mir bitte, {G(9)} du im Juli oder im August Zeit hast.<br/>"
    f"Ich freue mich schon {G(10)} deine Antwort!<br/>"
    "Viele Grüße<br/>deine Fatma"
)
opts1 = [
    ["deiner", "deine", "deinem"],
    ["denn", "weil", "deshalb"],
    ["zum", "ins", "im"],
    ["die", "denen", "dem"],
    ["Wenn", "Als", "Wann"],
    ["bei", "mit", "zu"],
    ["zu", "um", "für"],
    ["könnt", "können", "kannst"],
    ["dass", "ob", "wenn"],
    ["über", "an", "auf"],
]
s += [Spacer(1, 6)]
s += task(
    2,
    "Sprachbausteine Teil 1",
    "Lesen Sie die E-Mail. Welches Wort (a, b oder c) passt in die Lücken 1–10? Kreuzen Sie an.",
    2,
)
s += [box(R(mail, "txt"), HELLGRUEN), Spacer(1, 6)]
B = sym("☐")
orows = []
for i in range(0, 10, 2):
    row = []
    for n in (i, i + 1):
        row += [
            R(f"<b>{n + 1}</b>", "cell"),
            R(
                "   ".join(f"{B} {chr(97 + j)}) {w}" for j, w in enumerate(opts1[n])),
                "optc",
            ),
        ]
    orows.append(row)
ot = Table(orows, colWidths=[9 * mm, 78 * mm, 9 * mm, 78 * mm])
ot.setStyle(
    TableStyle(
        [
            ("LEFTPADDING", (0, 0), (-1, -1), 3),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ]
    )
)
s += [ot]

# ── Übung 3: Sprachbausteine Teil 2 ──
words = [
    "bei",
    "damit",
    "dass",
    "falls",
    "Ihnen",
    "Ihre",
    "innerhalb",
    "leider",
    "nachdem",
    "ob",
    "obwohl",
    "selbstverständlich",
    "seit",
    "uns",
    "wegen",
]
text2 = (
    "<b>Ihre Bestellung vom 5. März</b><br/><br/>"
    "Sehr geehrte Frau Nkemelu,<br/>"
    f"vielen Dank für Ihre E-Mail. Es tut uns sehr leid, {G(1)} der Schrank, den Sie bei uns bestellt haben, beschädigt bei Ihnen "
    f"angekommen ist. {G(2)} bekommen Sie von uns kostenlos eine neue Schranktür. Wir haben die Tür heute bestellt. Sie wird "
    f"{G(3)} von zehn Tagen geliefert.<br/>"
    f"{G(4)} kann unser Monteur nicht vor dem 28. März zu Ihnen kommen. {G(5)} Ihnen dieser Termin nicht passt, rufen Sie uns "
    "bitte an. Wir finden dann gemeinsam einen anderen Termin.<br/>"
    f"{G(6)} der langen Wartezeit möchten wir {G(7)} außerdem einen Gutschein über 30 Euro schenken. Sie können ihn in allen "
    f"unseren Filialen einlösen. Bitte nennen Sie dabei {G(8)} Kundennummer.<br/>"
    f"Bitte bewahren Sie die beschädigte Tür auf, {G(9)} unser Monteur sie mitnehmen kann. Wir hoffen, dass Sie auch in Zukunft "
    f"gern {G(10)} uns einkaufen.<br/><br/>"
    "Mit freundlichen Grüßen<br/>Jan Kowalczyk<br/>Kundenservice, Möbelhaus Lindenhof"
)
s += [PageBreak()]
s += task(
    3,
    "Sprachbausteine Teil 2",
    "Lesen Sie den Brief. Welches Wort (a–o) passt in die Lücken 1–10? "
    "Jedes Wort passt nur einmal. Fünf Wörter bleiben übrig.",
    3,
)
wrows = [
    [R(f"{chr(97 + k)}) {words[k]}", "cell") for k in range(r, min(r + 5, 15))]
    for r in range(0, 15, 5)
]
wt = Table(wrows, colWidths=[34.8 * mm] * 5)
wt.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), SOFT),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ]
    )
)
s += [wt, Spacer(1, 6), box(R(text2, "txt"), HELLGRUEN), Spacer(1, 6)]
s += [
    table(
        [["Lücke"] + [str(i) for i in range(1, 11)], ["Wort"] + [""] * 10],
        [22] + [15.2] * 10,
        head=True,
    )
]

# ── Lösungen ──
s += [
    PageBreak(),
    R("Lösungen", "h2"),
    R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
]
s += [
    R("Übung 1 · Verben mit Präposition", "solh"),
    R(
        "  ·  ".join(f"{i}. {K(a)}" for i, (_, a) in enumerate(warm, 1))
        + " (sich interessieren für · warten auf · denken an · sich freuen über · sich bewerben um · helfen bei)",
        "sol",
    ),
]
l2 = [
    (
        "1 – b",
        "deine",
        "über + Akkusativ, die Nachricht (feminin) "
        + ARROW
        + " über <i>deine</i> Nachricht.",
    ),
    (
        "2 – a",
        "denn",
        "Danach steht das Verb auf Position 2 („ich hatte“). <i>weil</i> braucht das Verb am Ende, <i>deshalb</i> ist kein Grund.",
    ),
    (
        "3 – c",
        "im",
        "Wo? "
        + ARROW
        + " in + Dativ: in dem = <i>im</i> Krankenhaus. <i>ins</i> = wohin?",
    ),
    (
        "4 – b",
        "denen",
        "mit + Dativ Plural (die Kolleginnen und Kollegen) "
        + ARROW
        + " mit <i>denen</i>.",
    ),
    (
        "5 – a",
        "Wenn",
        "Das passiert immer wieder (Gegenwart) "
        + ARROW
        + " <i>wenn</i>. <i>als</i> nur für einmal in der Vergangenheit.",
    ),
    ("6 – b", "mit", "mit anderen Kindern spielen."),
    ("7 – a", "zu", "Lust haben + zu + Infinitiv: Lust, mich <i>zu</i> besuchen."),
    (
        "8 – c",
        "kannst",
        "du "
        + ARROW
        + " <i>kannst</i>. <i>könnt</i> = ihr, <i>können</i> = wir / sie / Sie.",
    ),
    (
        "9 – b",
        "ob",
        "indirekte Ja/Nein-Frage: Hast du im Juli Zeit? " + ARROW + " <i>ob</i>.",
    ),
    ("10 – c", "auf", "Die Antwort kommt noch " + ARROW + " sich freuen <i>auf</i>."),
]
s += [R("Übung 2 · Sprachbausteine Teil 1", "solh")] + [
    R(f"<b>{a} {K(w)}</b>  {b}", "sol") for a, w, b in l2
]
l3 = [
    (
        "1 – c",
        "dass",
        "Es tut uns leid, <i>dass</i> … – eine Tatsache, keine Frage (nicht <i>ob</i>).",
    ),
    (
        "2 – l",
        "Selbstverständlich",
        "= natürlich; danach direkt das Verb („bekommen Sie“). <i>Leider</i> passt nicht zum Sinn.",
    ),
    (
        "3 – g",
        "innerhalb",
        "<i>innerhalb</i> von zehn Tagen = in den nächsten zehn Tagen.",
    ),
    ("4 – h", "Leider", "Eine schlechte Nachricht: Der Termin ist erst am 28. März."),
    (
        "5 – d",
        "Falls",
        "Bedingung (= wenn), Verb am Ende („passt“). <i>Obwohl</i> passt nicht zum Sinn.",
    ),
    ("6 – o", "Wegen", "Grund + Genitiv: <i>wegen</i> der langen Wartezeit."),
    (
        "7 – e",
        "Ihnen",
        "jemandem etwas schenken " + ARROW + " Dativ, höfliche Form: <i>Ihnen</i>.",
    ),
    (
        "8 – f",
        "Ihre",
        "die Kundennummer (feminin, Akkusativ) " + ARROW + " <i>Ihre</i> Kundennummer.",
    ),
    (
        "9 – b",
        "damit",
        "Ziel: Der Monteur soll die Tür mitnehmen können "
        + ARROW
        + " <i>damit</i>, Verb am Ende.",
    ),
    ("10 – a", "bei", "<i>bei</i> uns einkaufen (bei + Firma / Person)."),
]
s += [R("Übung 3 · Sprachbausteine Teil 2 (übrig: i, j, k, m, n)", "solh")] + [
    R(f"<b>{a} {K(w)}</b>  {b}", "sol") for a, w, b in l3
]
s += [
    Spacer(1, 6),
    box(
        R(
            "<b>Punkte zählen:</b> Teil 1 und Teil 2: je 1,5 Punkte pro Lücke, zusammen maximal 30 Punkte. "
            "Schreiben Sie jeden Fehler mit dem richtigen Wort in Ihr Heft – am besten als ganzen Satz.",
            "cell",
        ),
        SOFT,
    ),
]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
