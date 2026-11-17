# Arbeitsblatt telc Deutsch B1: Mündliche Prüfung (Kontaktaufnahme, Gespräch über ein Thema, gemeinsam etwas planen)
# Format laut pruefung-fakten.js (telc-b1) und sim/telc-b1.js: Paarprüfung ca. 15 Min., 20 Min. Vorbereitung (Teil 2 und 3),
# Teil 1 ca. 3 Min. (15 P.), Teil 2 ca. 6 Min. (30 P.), Teil 3 ca. 6 Min. (30 P.), mündlich 75 Punkte, Bestehen ab 45.
# Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/telc-b1-muendliche-pruefung.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle
from reportlab.lib.colors import HexColor

SLUG = "telc-b1-muendliche-pruefung"
TITLE = "telc B1 Mündliche Prüfung: kennenlernen, Thema, gemeinsam planen"  # page header (max. 70 characters)
LEVEL = "B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
X = lambda t: f'<font color="#C2362B">{fallback(t)}</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)

st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2
)
st["dlg"] = ParagraphStyle(
    "dlg",
    parent=st["cell"],
    fontSize=9.5,
    leading=12.2,
    spaceAfter=2.5,
    leftIndent=12,
    firstLineIndent=-12,
)
st["card"] = ParagraphStyle("card", parent=st["cell"], fontSize=9.5, leading=12.3)


def card(title, body, width=87):
    """Aufgabenkarte mit Rahmen."""
    t = Table(
        [[R(f"<b>{title}</b>", "card")], [R(body, "card")]], colWidths=[width * mm]
    )
    t.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.8, HexColor("#2341B5")),
                ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def pair(a, b):
    t = Table([[a, b]], colWidths=[88 * mm, 88 * mm])
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


s = [
    R("telc Deutsch B1 · Sprechen · Prüfungstraining", "kick"),
    R("Die mündliche Prüfung", "h1"),
    R(
        "Ablauf, Strategien, Redemittel – und drei Sätze Aufgabenkarten, um zu zweit wie in der Prüfung zu üben.",
        "lead",
    ),
]

# ── So läuft die Prüfung ──
s += [
    R("So läuft die Prüfung", "h2"),
    table(
        [
            [
                "<b>Form</b>",
                "<b>Paarprüfung</b>: Sie sprechen mit einer Partnerin oder einem Partner, insgesamt ca. <b>15 Minuten</b>.",
            ],
            [
                "<b>Vorbereitung</b>",
                "<b>20 Minuten</b> vorher, für Teil 2 und Teil 3. Sie dürfen sich Notizen machen, aber nicht ablesen.",
            ],
            [
                "<b>Punkte</b>",
                "<b>75 Punkte</b>. Zum Bestehen brauchen Sie mündlich mindestens <b>45 von 75 Punkten</b> (60 %) – "
                "und in der schriftlichen Prüfung ebenfalls mindestens 60 %.",
            ],
        ],
        [30, 144],
        head=False,
    ),
    Spacer(1, 6),
    table(
        [
            ["<b>Teil</b>", "<b>Zeit</b>", "<b>Was passiert?</b>", "<b>Punkte</b>"],
            [
                "<b>1 Kontaktaufnahme</b><br/>(einander kennenlernen)",
                "ca. 3 Min.",
                "Sie stellen sich gegenseitig vor und stellen Fragen: Herkunft, Wohnen, Familie, Arbeit, Sprachen, Freizeit.",
                "15",
            ],
            [
                "<b>2 Gespräch über ein Thema</b>",
                "ca. 6 Min.",
                "Jede Person hat einen anderen kurzen Text zum gleichen Thema. Sie berichten kurz über Ihren Text, erzählen von "
                "eigenen Erfahrungen und sagen Ihre Meinung.",
                "30",
            ],
            [
                "<b>3 Gemeinsam etwas planen</b>",
                "ca. 6 Min.",
                "Sie planen zusammen etwas, zum Beispiel eine Feier oder einen Ausflug. Sie sprechen über alle Punkte der "
                "Aufgabenkarte, machen Vorschläge und einigen sich.",
                "30",
            ],
        ],
        [42, 22, 92, 18],
    ),
]

s += [
    R("Strategie: so holen Sie Punkte", "h2"),
    R(
        "<b>1. Ganze Sätze mit Details.</b> Nicht nur „Syrien.“, sondern: „Ich komme aus Syrien, aus Aleppo. Seit vier Jahren wohne ich in Kassel.“",
        "item",
    ),
    R(
        "<b>2. Zurückfragen.</b> Es ist ein Gespräch, kein Vortrag: „Und Sie?“, „Wie ist das bei Ihnen?“",
        "item",
    ),
    R(
        "<b>3. Teil 2: nicht vorlesen.</b> Notieren Sie in der Vorbereitung 3–4 Stichwörter zu Ihrem Text (Thema, eine Zahl, Gründe, Kritik) "
        "und erzählen Sie mit eigenen Worten.",
        "item",
    ),
    R(
        "<b>4. Teil 3: alle Punkte, eine Einigung.</b> Gehen Sie die Punkte der Karte der Reihe nach durch. Widersprechen Sie ruhig einmal "
        "höflich – und fassen Sie am Ende zusammen: Wer macht was?",
        "item",
    ),
    KeepTogether(
        [
            R("Typische Fallen", "h3"),
            table(
                [
                    [
                        "<b>Teil 1</b>",
                        f"{X('✗')} nur Ein-Wort-Antworten · {X('✗')} nur über sich sprechen und nicht zurückfragen · "
                        f"{X('✗')} einen auswendig gelernten Text aufsagen",
                    ],
                    [
                        "<b>Teil 2</b>",
                        f"{X('✗')} Sätze aus dem Text vorlesen · {X('✗')} nur zusammenfassen, keine eigene Meinung · "
                        f"{X('✗')} nicht auf die Partnerin reagieren",
                    ],
                    [
                        "<b>Teil 3</b>",
                        f"{X('✗')} einen Punkt der Karte vergessen · {X('✗')} zu allem nur „Ja, gut.“ sagen · "
                        f"{X('✗')} am Ende keine Einigung",
                    ],
                ],
                [20, 154],
                head=False,
            ),
        ]
    ),
]

# ── Redemittel ──
s += [
    PageBreak(),
    R("Redemittel", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Redemittel</b>"],
            [
                "<b>1 sich vorstellen</b>",
                f"{K('Ich heiße')} … {K('und komme aus')} … · {K('Ich lebe seit')} … {K('in')} … · {K('Ich wohne mit')} … {K('in einer')} … "
                f"· {K('Ich arbeite als')} … / {K('Ich mache eine Ausbildung als')} … · {K('In meiner Freizeit')} … {K('gern')} …",
            ],
            [
                "<b>1 fragen und reagieren</b>",
                f"{K('Und Sie?')} · {K('Woher kommen Sie?')} · {K('Was machen Sie beruflich?')} · {K('Welche Sprachen sprechen Sie?')} · "
                f"{K('Oh, interessant!')} · {K('Wie gefällt es Ihnen dort?')}",
            ],
            [
                "<b>2 über den Text berichten</b>",
                f"{K('In meinem Text geht es um')} … · {K('Im Text steht, dass')} … · {K('Laut einer Umfrage')} … · "
                f"{K('Viele Menschen finden, dass')} …",
            ],
            [
                "<b>2 Erfahrung und Meinung</b>",
                f"{K('Bei mir ist das so:')} … · {K('In meinem Heimatland')} … · {K('Meiner Meinung nach')} … · "
                f"{K('Ein Vorteil ist')} … , {K('ein Nachteil ist')} … · {K('Und was denken Sie?')}",
            ],
            [
                "<b>2 zustimmen, widersprechen</b>",
                f"{K('Da haben Sie recht.')} · {K('Das sehe ich auch so.')} · {K('Ja, aber')} … · {K('Das sehe ich ein bisschen anders.')}",
            ],
            [
                "<b>3 vorschlagen</b>",
                f"{K('Wie wäre es, wenn wir')} … ? · {K('Ich schlage vor, dass')} … · {K('Wir könnten')} … · "
                f"{K('Was hältst du davon, wenn')} … ?",
            ],
            [
                "<b>3 reagieren</b>",
                f"{K('Gute Idee!')} · {K('Einverstanden.')} · {K('Das finde ich nicht so gut, weil')} … · "
                f"{K('Ich habe eine andere Idee:')} …",
            ],
            [
                "<b>3 sich einigen</b>",
                f"{K('Wer kümmert sich um')} … ? · {K('Ich kann')} … {K('übernehmen.')} · {K('Dann machen wir es so:')} … · "
                f"{K('Also, zusammengefasst:')} …",
            ],
        ],
        [40, 134],
    ),
]

# ── Teil 1 ──
s += [
    Spacer(1, 4),
    R("Teil 1: Kontaktaufnahme – Fragenkarte für alle drei Sätze", "h2"),
    R(
        "Sprechen Sie zu zweit ca. 3 Minuten. Nehmen Sie jedes Mal eine andere Partnerin oder einen anderen Partner – "
        "oder erfinden Sie eine neue Person (Name, Land, Beruf).",
        "p",
    ),
    pair(
        card(
            "Sprechen Sie über:",
            "– Name, Herkunft<br/>– Wohnort, Wohnung<br/>– Familie<br/>– Beruf, Arbeit, Ausbildung<br/>"
            "– Sprachen<br/>– Freizeit, Hobbys<br/>– Pläne für die Zukunft",
        ),
        card(
            "Gute Zusatzfragen",
            "Seit wann wohnen Sie schon in …?<br/>Wie gefällt Ihnen die Stadt?<br/>"
            "Wo haben Sie Deutsch gelernt?<br/>Was möchten Sie später beruflich machen?<br/>Was machen Sie am Wochenende?",
        ),
    ),
]

# ── Drei Sätze ──
sets = [
    {
        "nr": 1,
        "thema": "Arbeiten im Homeoffice",
        "a": (
            "Text A: Lieber zu Hause arbeiten",
            "Immer mehr Beschäftigte arbeiten einen oder mehrere Tage pro Woche zu Hause. In einer Umfrage sagen viele, dass sie dort "
            "ruhiger arbeiten können. Außerdem sparen sie die Fahrt zur Arbeit – manche mehr als eine Stunde pro Tag. Vor allem Eltern "
            "finden es gut, dass sie Arbeit und Familie besser verbinden können.",
        ),
        "b": (
            "Text B: Allein am Küchentisch",
            "Nicht alle sind mit dem Homeoffice zufrieden. Viele vermissen ihre Kolleginnen und Kollegen und fühlen sich allein. "
            "Andere haben zu Hause keinen richtigen Schreibtisch und bekommen Rückenschmerzen. Außerdem fällt es manchen schwer, "
            "nach der Arbeit abzuschalten, weil der Laptop immer auf dem Tisch steht.",
        ),
        "plan": (
            "Ausflug mit dem Deutschkurs",
            "Ihr Deutschkurs ist bald zu Ende. Sie möchten mit Ihrer Partnerin / Ihrem Partner einen Ausflug für den ganzen "
            "Kurs planen.<br/><br/>– Wann? (Tag, Uhrzeit)<br/>– Wohin?<br/>– Wie fahren Sie dorthin?<br/>– Essen und Trinken?<br/>"
            "– Wer macht was?",
        ),
    },
    {
        "nr": 2,
        "thema": "Kinder und Smartphone",
        "a": (
            "Text A: Das erste Handy mit neun",
            "Viele Kinder bekommen heute schon in der Grundschule ihr erstes Smartphone. Die meisten Eltern sagen, dass sie ihr Kind "
            "so immer erreichen können, zum Beispiel auf dem Schulweg. Die Kinder selbst möchten ein Handy, weil ihre Freunde auch "
            "eins haben und sie in der Klassengruppe mitschreiben wollen.",
        ),
        "b": (
            "Text B: Ärztinnen warnen vor zu viel Bildschirm",
            "Kinderärztinnen und Kinderärzte sehen die Entwicklung kritisch. Kinder, die jeden Tag mehrere Stunden auf den Bildschirm "
            "schauen, schlafen oft schlechter und bewegen sich zu wenig. Die Fachleute empfehlen deshalb klare Regeln: kein Handy "
            "beim Essen, keins im Schlafzimmer und feste Zeiten am Tag.",
        ),
        "plan": (
            "Umzugshilfe für eine Nachbarin",
            "Ihre ältere Nachbarin, Frau Mensah, zieht in zwei Wochen in eine kleinere Wohnung im gleichen Stadtteil. Sie möchten "
            "ihr zusammen mit Ihrer Partnerin / Ihrem Partner helfen.<br/><br/>– Wann helfen Sie?<br/>– Kartons und Packen?<br/>"
            "– Transport der Möbel?<br/>– Wer hilft noch?<br/>– Kleines Geschenk für die neue Wohnung?",
        ),
    },
    {
        "nr": 3,
        "thema": "Vegetarisch essen in der Kantine",
        "a": (
            "Text A: Mehr Gemüse auf dem Teller",
            "In vielen Kantinen von Firmen und Hochschulen gibt es inzwischen einen vegetarischen Tag pro Woche. Dann steht kein "
            "Fleisch auf der Speisekarte. Die Köchinnen und Köche sagen, dass die meisten Gäste das Essen gut finden. Außerdem ist "
            "weniger Fleisch gut für die Gesundheit und für die Umwelt.",
        ),
        "b": (
            "Text B: „Ich will selbst entscheiden“",
            "Nicht alle Gäste sind von fleischlosen Tagen begeistert. Viele möchten selbst wählen, was sie essen. Ein Gast sagt: "
            "„Ich arbeite körperlich schwer und brauche ein richtiges Mittagessen.“ Manche Beschäftigte gehen an diesen Tagen lieber "
            "zum Imbiss um die Ecke – und die Kantine verkauft weniger Essen.",
        ),
        "plan": (
            "Sommerfest im Wohnhaus",
            "In Ihrem Haus wohnen viele Familien, aber die Nachbarn kennen sich kaum. Sie möchten mit Ihrer Partnerin / Ihrem "
            "Partner ein kleines Sommerfest im Hof organisieren.<br/><br/>– Wann?<br/>– Einladung an die Nachbarn?<br/>"
            "– Essen und Getränke?<br/>– Programm für Kinder?<br/>– Wer macht was?",
        ),
    },
]
t2 = "1. Worum geht es in Ihrem Text?<br/>2. Wie ist das bei Ihnen? Wie ist das in Ihrem Heimatland?<br/>3. Was ist Ihre Meinung?"
s += [
    Spacer(1, 4),
    R("Teil 2 und Teil 3: so üben Sie mit den drei Sätzen", "h2"),
    R("<b>Teil 2:</b> Person A liest nur Text A, Person B nur Text B. Erzählen Sie sich gegenseitig, was in Ihrem Text steht, "
      "und sprechen Sie dann über diese Punkte:", "p"),
    box(R(t2, "cell"), SOFT),
    Spacer(1, 3),
    R("<b>Teil 3:</b> Lesen Sie die Aufgabenkarte zusammen. Sprechen Sie über alle Punkte und einigen Sie sich.", "p"),
]
for x in sets:
    block = [
        R(f"Satz {x['nr']} · Teil 2 · Thema: {x['thema']}", "h2"),
        pair(card(*x["a"]), card(*x["b"])),
        Spacer(1, 5),
        R(f"<b>Satz {x['nr']} · Teil 3 · Gemeinsam etwas planen</b>", "p"),
        card(x["plan"][0], x["plan"][1], width=174),
    ]
    s += [KeepTogether(block), Spacer(1, 4)]

# ── Musterdialog ──
dlg = [
    ("A", "Also, unser Kurs ist ja bald zu Ende. Wann wollen wir den Ausflug machen?"),
    (
        "B",
        "Ich schlage vor, dass wir am letzten Kurstag fahren. Das ist ein Freitag, und da haben alle Zeit.",
    ),
    (
        "A",
        "Hm, am Freitag arbeiten aber einige nachmittags. Wie wäre es mit Samstag? Dann könnten wir schon um zehn Uhr losfahren.",
    ),
    ("B", "Stimmt, das ist besser. Gut, dann Samstag um zehn. Und wohin fahren wir?"),
    (
        "A",
        "Was hältst du davon, wenn wir an den See fahren? Dort kann man spazieren gehen, und im Sommer kann man auch schwimmen.",
    ),
    (
        "B",
        "Gute Idee! Aber was machen wir, wenn es regnet? Ich habe eine andere Idee: Wir könnten das Museum in der Altstadt besuchen.",
    ),
    (
        "A",
        "Das finde ich nicht so gut, weil viele Leute im Kurs kleine Kinder haben. Für Kinder ist ein Museum oft langweilig.",
    ),
    (
        "B",
        "Da hast du recht. Dann fahren wir an den See, und wenn es regnet, gehen wir ins Café am Bahnhof.",
    ),
    ("A", "Einverstanden. Wie kommen wir dorthin? Nicht alle haben ein Auto."),
    (
        "B",
        "Wir können mit dem Zug fahren. Mit einem Gruppenticket ist das nicht so teuer. Ich kann mich um die Tickets kümmern.",
    ),
    ("A", "Super. Und was machen wir mit dem Essen? Soll jeder etwas mitbringen?"),
    (
        "B",
        "Ja, ein Picknick! Jeder bringt etwas aus seinem Heimatland mit. Dann probieren wir ganz verschiedene Sachen.",
    ),
    (
        "A",
        "Das gefällt mir. Ich schreibe allen eine Nachricht in der Kursgruppe und frage, wer was mitbringt.",
    ),
    (
        "B",
        "Also, zusammengefasst: Wir fahren am Samstag um zehn Uhr mit dem Zug an den See und machen ein Picknick. "
        "Ich kaufe die Tickets, und du schreibst die Nachricht an den Kurs.",
    ),
    ("A", "Genau. Dann sind wir uns einig!"),
]
s += [
    PageBreak(),
    R("Musterdialog zu Satz 1, Teil 3: Ausflug mit dem Deutschkurs", "h2"),
    R(
        "So kann ein gutes Gespräch klingen. Achten Sie auf die blauen Redemittel: vorschlagen, widersprechen, sich einigen.",
        "small",
    ),
]
hl = [
    "Ich schlage vor, dass",
    "Wie wäre es mit",
    "Was hältst du davon, wenn",
    "Gute Idee!",
    "Ich habe eine andere Idee:",
    "Das finde ich nicht so gut, weil",
    "Da hast du recht.",
    "Einverstanden.",
    "Ich kann mich um",
    "Also, zusammengefasst:",
    "Dann sind wir uns einig!",
]


def mark(t):
    for h in hl:
        t = t.replace(h, K(h))
    return t


s += [box([R(f"<b>{w}:</b> {mark(t)}", "dlg") for w, t in dlg], HELLGRUEN)]
s += [
    R("Was macht dieses Gespräch gut?", "solh"),
    R(
        f"{sym('✓')} Alle fünf Punkte der Karte kommen vor: wann, wohin, wie, Essen, wer macht was.",
        "sol",
    ),
    R(
        f"{sym('✓')} Beide machen Vorschläge und begründen sie (<i>weil</i> …, <i>Dort kann man</i> …).",
        "sol",
    ),
    R(
        f"{sym('✓')} Es gibt einen kleinen Widerspruch – höflich und mit einer neuen Idee.",
        "sol",
    ),
    R(f"{sym('✓')} Am Ende fasst eine Person das Ergebnis zusammen.", "sol"),
    R("Teil 1 und Teil 2: so können Sie anfangen", "solh"),
    R(
        f"<b>Teil 1:</b> „{K('Ich heiße')} Ana Moreira {K('und komme aus')} Portugal, aus Porto. {K('Ich lebe seit')} drei Jahren in Bremen. "
        f"Ich arbeite als Pflegehelferin in einem Altenheim. {K('Und Sie?')} Woher kommen Sie?“",
        "sol",
    ),
    R(
        f"<b>Teil 2 (Satz 2, Text B):</b> „{K('In meinem Text geht es um')} Kinder und Smartphones. Ärztinnen und Ärzte sagen, dass Kinder "
        f"mit viel Bildschirmzeit oft schlechter schlafen. Sie empfehlen feste Regeln. {K('Bei mir ist das so:')} Mein Sohn ist zehn und "
        f"darf eine Stunde am Tag spielen. {K('Meiner Meinung nach')} sind Regeln sehr wichtig. {K('Und was denken Sie?')}“",
        "sol",
    ),
    Spacer(1, 6),
    KeepTogether(
        [
            R("Nach dem Üben: Selbstkontrolle", "h3"),
            table(
                [
                    [
                        f"{sym('☐')} Ich habe in ganzen Sätzen gesprochen.",
                        f"{sym('☐')} Ich habe zurückgefragt.",
                    ],
                    [
                        f"{sym('☐')} Ich habe den Text nicht vorgelesen.",
                        f"{sym('☐')} Ich habe meine Meinung begründet.",
                    ],
                    [
                        f"{sym('☐')} Wir haben über alle Punkte gesprochen.",
                        f"{sym('☐')} Wir haben uns am Ende geeinigt.",
                    ],
                ],
                [87, 87],
                head=False,
            ),
        ]
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
