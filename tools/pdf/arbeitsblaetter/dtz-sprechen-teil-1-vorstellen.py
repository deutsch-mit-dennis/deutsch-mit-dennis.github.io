# Arbeitsblatt DTZ Sprechen Teil 1: Sich vorstellen und Fragen beantworten (A2–B1)
# Format laut sim/dtz.js (Sprechen Teil 1) und pruefung-fakten.js (dtz)
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-sprechen-teil-1-vorstellen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import Table, TableStyle
from arbeitsblatt_lib import fallback

SLUG = "dtz-sprechen-teil-1-vorstellen"
TITLE = "DTZ Sprechen Teil 1: Sich vorstellen und Fragen beantworten"
LEVEL = "A2–B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Fehler / Verbposition
X = lambda t: f'<font color="#C2362B"><strike>{t}</strike></font>'  # falsch
OK = lambda t: f'<font color="#1D7A45"><b>{t}</b></font>'  # richtig

s = [
    R("DTZ · Sprechen Teil 1 · Arbeitsblatt", "kick"),
    R("Sich vorstellen und Fragen beantworten", "h1"),
    R(
        "Der erste Eindruck zählt: In Teil 1 sprechen Sie über sich selbst. Mit diesen Redemitteln, zwei "
        "Mustervorstellungen und Übungskarten für die Partnerarbeit sind Sie gut vorbereitet.",
        "lead",
    ),
]

# ── Ablauf ──
s += [
    R("So läuft Teil 1 in der Prüfung", "h2"),
    table(
        [
            ["<b>Prüfung Sprechen</b>", "ca. 16 Minuten, zu zweit, 2 Prüfende, keine Vorbereitungszeit · 3 Teile"],
            ["<b>Teil 1</b>", "Über sich sprechen · ca. 4 Minuten"],
            ["<b>Aufgabe</b>",
             "„Stellen Sie sich bitte vor. Sprechen Sie zu den Stichpunkten. Danach stellt Ihnen die Prüferin noch einige Fragen.“"],
            ["<b>Stichpunkte</b>", "Name · Herkunft · Wohnort · Familie · Arbeit/Beruf · Sprachen"],
            ["<b>Danach</b>", "Die Prüfenden stellen Nachfragen – zum Beispiel: Namen buchstabieren, Wohnort, Pläne."],
        ],
        [34, 140],
        head=False,
    ),
    R("Stand: November 2026 · Quelle: Prüfungsanbieter g.a.s.t. (Übersicht auf deutsch-mit-dennis.de). "
      "Die Stichpunkte stammen aus unserer DTZ-Simulation; in der echten Prüfung können sie etwas anders aussehen.", "small"),
    Spacer(1, 4),
    box(
        R(
            "<b>Tipp:</b> Sagen Sie zu jedem Stichpunkt <b>2–3 ganze Sätze</b> – nicht nur ein Wort. "
            "Sprechen Sie langsam und deutlich. Lernen Sie Ihre Vorstellung <b>nicht wie ein Gedicht</b> auswendig: "
            "Die Prüfenden merken das und fragen dann gezielt nach. Besser: Stichpunkte im Kopf, frei sprechen."
        ),
        NOTE,
        GELB,
    ),
]

# ── Redemittel ──
s += [
    R("Redemittel zu den Stichpunkten", "h2"),
    R("Links die einfache Version (A2), rechts die ausführliche Version (B1). Für B1: Sätze verbinden "
      "(weil, aber, deshalb, als) und auch über früher sprechen (Perfekt).", "small"),
    table(
        [
            ["<b>Stichpunkt</b>", "<b>A2 – einfach</b>", "<b>B1 – ausführlicher</b>"],
            ["<b>Name</b>", f"{K('Ich heiße')} … · {K('Mein Name ist')} …",
             f"{K('Mein Vorname ist')} …, {K('mein Nachname ist')} … {K('Ich buchstabiere:')} …"],
            ["<b>Herkunft</b>", f"{K('Ich komme aus')} Syrien / {K('aus der')} Türkei / {K('aus dem')} Irak.",
             f"{K('Ich komme aus')} …, {K('genauer gesagt aus')} … {K('Das liegt im Norden / Süden von')} …"],
            ["<b>Wohnort</b>", f"{K('Ich wohne in')} … {K('Ich wohne seit')} drei Jahren {K('in')} …",
             f"{K('Seit')} 2023 {K('lebe ich in')} … {K('Vorher habe ich in')} … {K('gewohnt.')}"],
            ["<b>Familie</b>", f"{K('Ich bin verheiratet / ledig / geschieden.')} {K('Ich habe')} zwei Kinder.",
             f"{K('Meine Tochter ist')} sieben {K('und geht in die')} zweite Klasse. {K('Meine Eltern leben noch in')} …"],
            ["<b>Arbeit/Beruf</b>", f"{K('Ich bin')} Elektriker {K('von Beruf.')} {K('Ich arbeite als')} …",
             f"{K('In meinem Heimatland habe ich als')} … {K('gearbeitet.')} {K('Im Moment')} … {K('Später möchte ich')} …"],
            ["<b>Sprachen</b>", f"{K('Ich spreche')} Arabisch, {K('ein bisschen')} Englisch {K('und')} Deutsch.",
             f"{K('Meine Muttersprache ist')} … {K('Außerdem spreche ich')} … {K('Deutsch lerne ich seit')} …"],
            ["<b>Extra:</b> Freizeit", f"{K('In meiner Freizeit')} … {K('Ich')} koche {K('gern.')}",
             f"{K('Am Wochenende')} gehe ich {K('meistens')} …, {K('weil')} …"],
            ["<b>Extra:</b> Pläne", f"{K('Ich möchte')} … {K('arbeiten.')}",
             f"{K('Mein Ziel ist')} … {K('Deshalb mache ich zuerst')} …"],
        ],
        [28, 66, 80],
    ),
    R("„Extra“ steht nicht auf der Karte – aber dazu kommen oft Nachfragen. Bereiten Sie sich auch darauf vor.", "small"),
]

# ── Nachfragen ──
s += [
    R("Typische Nachfragen der Prüfenden", "h2"),
    R("Beispiele aus unserer Simulation und weitere mögliche Fragen – keine offizielle Liste. "
      "Antworten Sie immer mit einem ganzen Satz und, wenn möglich, mit einem Beispiel oder Grund.", "small"),
    table(
        [
            ["<b>Thema</b>", "<b>Mögliche Nachfragen</b>"],
            ["Name", "Können Sie bitte Ihren Nachnamen buchstabieren? · Hat Ihr Name eine Bedeutung?"],
            ["Wohnort", "Wie lange wohnen Sie schon in Ihrer Stadt? · Was gefällt Ihnen an Ihrem Wohnort? "
                        "Und was gefällt Ihnen nicht so gut? · Wohnen Sie in einer Wohnung oder in einem Haus?"],
            ["Familie", "Wie alt sind Ihre Kinder? · Wo lebt der Rest Ihrer Familie? · Wie oft sehen Sie Ihre Eltern?"],
            ["Arbeit/Beruf", "Was haben Sie in Ihrem Heimatland gemacht? · Was möchten Sie in Zukunft beruflich machen? · "
                             "Wie kommen Sie zur Arbeit?"],
            ["Sprachen", "Welche Sprache sprechen Sie zu Hause mit Ihrer Familie? · Wo sprechen Sie im Alltag Deutsch? · "
                         "Was finden Sie an Deutsch schwer?"],
            ["Freizeit", "Was machen Sie am Wochenende? · Haben Sie ein Hobby?"],
        ],
        [28, 146],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Frage nicht verstanden? Das ist kein Problem – fragen Sie nach:</b><br/>"
            f"{K('Entschuldigung, können Sie die Frage bitte wiederholen?')} · {K('Können Sie bitte etwas langsamer sprechen?')} · "
            f"{K('Was bedeutet')} „…“? · {K('Meinen Sie, wo ich jetzt wohne oder wo ich früher gewohnt habe?')}",
            "cell",
        ),
        SOFT,
        None,
    ),
]

# ── Übung 1 ──
u1h = task(1, "Welche Antwort passt?", "Ordnen Sie den Fragen 1–8 die passende Antwort a–h zu.", 1)
u1q = [
    "Können Sie bitte Ihren Nachnamen buchstabieren?",
    "Wie lange wohnen Sie schon in Ihrer Stadt?",
    "Was gefällt Ihnen nicht so gut an Ihrem Wohnort?",
    "Welche Sprache sprechen Sie zu Hause?",
    "Was haben Sie in Ihrem Heimatland gemacht?",
    "Wie alt sind Ihre Kinder?",
    "Was machen Sie gern in Ihrer Freizeit?",
    "Was möchten Sie in Zukunft beruflich machen?",
]
u1a = [
    "Ich war dort Buchhalterin in einer großen Firma.",
    "Mein Sohn ist sechs, meine Tochter ist gerade ein Jahr alt geworden.",
    "Ja, gern: M – E – N – S – A – H.",
    "Die Mieten sind sehr hoch, und es gibt zu wenig Parkplätze.",
    "Ich möchte eine Ausbildung als Elektronikerin machen.",
    "Mit meinem Mann Tigrinya, mit den Kindern oft Deutsch.",
    "Seit vier Jahren. Vorher habe ich in Kassel gewohnt.",
    "Ich spiele Tischtennis im Verein und koche gern für Freunde.",
]
s += [KeepTogether(u1h + [
    table([[R(f"{i}. {q}  <font color=\"#8A93A8\">____</font>", "cell"), R(f"{chr(96 + i)}) {a}", "cell")]
           for i, (q, a) in enumerate(zip(u1q, u1a), 1)], [84, 90], head=False)
])]

# ── Übung 2 ──
s += task(
    2,
    "Zeitangaben richtig benutzen",
    "Ergänzen Sie: seit (3×) · vor · von … bis · im · am · für",
    2,
)
u2 = [
    "Ich wohne {} drei Jahren in Bochum.",
    "{} zwei Jahren bin ich nach Deutschland gekommen.",
    "{} 2018 {} 2022 habe ich in Polen als Koch gearbeitet.",
    "Mein Deutschkurs hat {} März angefangen.",
    "Ich lerne {} einem Jahr Deutsch.",
    "Meine Schwester kommt im Sommer {} zwei Wochen zu Besuch.",
    "Ich habe {} Montag einen Termin beim Bürgeramt.",
    "Ich arbeite {} sechs Monaten in einem Hotel an der Rezeption.",
]
s += [R(f"{i}. " + t.format(*([GAP] * t.count('{}'))), "item") for i, t in enumerate(u2, 1)]
s += [box(R(f"<b>Merke:</b> {K('seit')} + Dativ: seit drei Jahr{V('en')}, seit einem Jahr – es dauert bis heute. "
            f"{K('vor')} + Dativ: vor zwei Jahr{V('en')} – es ist vorbei (oft mit Perfekt).", "cell"), SOFT)]

# ── Mustervorstellungen ──
s += [
    R("Zwei Mustervorstellungen", "h2"),
    R("Lesen Sie beide Texte laut. Was macht die B1-Vorstellung besser? Markieren Sie die Verbindungswörter.", "small"),
    R("A2 · Thi Lan Nguyen", "h3"),
    box(
        R(
            "Guten Tag, ich heiße Thi Lan Nguyen. Mein Nachname ist Nguyen. Ich komme aus Vietnam, aus Hanoi. "
            "Ich wohne seit zwei Jahren in Mülheim an der Ruhr. Ich bin verheiratet und habe einen Sohn. "
            "Er ist sechs Jahre alt und geht in die erste Klasse. In Vietnam war ich Buchhalterin. "
            "Jetzt arbeite ich vormittags in der Stadtbibliothek. Ich sortiere Bücher. Das macht mir Spaß. "
            "Ich spreche Vietnamesisch, ein bisschen Englisch und Deutsch. In meiner Freizeit spiele ich gern Badminton.",
            "cell",
        ),
        SOFT,
        None,
    ),
    R("B1 · Kwame Mensah", "h3"),
    box(
        R(
            "Guten Tag, mein Name ist Kwame Mensah. Ich komme aus Ghana, genauer gesagt aus Kumasi. Das ist die zweitgrößte "
            "Stadt des Landes. Vor vier Jahren bin ich nach Deutschland gekommen. Zuerst habe ich in Münster gewohnt, "
            "aber seit 2024 lebe ich in Gelsenkirchen, weil ich dort eine Arbeitsstelle gefunden habe. "
            "Ich bin nicht verheiratet, aber meine Schwester wohnt auch hier, deshalb fühle ich mich nicht allein. "
            "Meine Eltern leben noch in Ghana. Von Beruf bin ich Elektriker. Im Moment arbeite ich bei einer Firma, "
            "die Solaranlagen auf Dächer baut. Später möchte ich die Meisterprüfung machen. "
            "Meine Muttersprache ist Twi. Außerdem spreche ich Englisch – das ist in Ghana die Amtssprache – und natürlich Deutsch. "
            "In meiner Freizeit laufe ich gern. Letztes Jahr bin ich meinen ersten Halbmarathon gelaufen.",
            "cell",
        ),
        SOFT,
        None,
    ),
    R("<b>Nachfragen – Beispielantworten:</b>", "p"),
    R(f"<i>Prüferin:</i> Was gefällt Ihnen an Gelsenkirchen? – <b>Kwame:</b> {K('Mir gefällt, dass')} die Wohnungen nicht so teuer sind "
      f"und es viele Parks gibt. {K('Nicht so gut finde ich, dass')} abends wenig los ist.", "item"),
    R(f"<i>Prüfer:</i> Wo sprechen Sie Deutsch? – <b>Thi Lan:</b> {K('Bei der Arbeit')} und mit der Lehrerin von meinem Sohn. "
      f"{K('Zu Hause sprechen wir')} Vietnamesisch.", "item"),
]

# ── Übung 3 ──
s += task(
    3,
    "Von A2 zu B1: Sätze verbinden",
    "Verbinden Sie die zwei Sätze mit dem Wort in Klammern. Achten Sie auf die Position des Verbs.",
    2,
)
u3 = [
    "Ich wohne gern in Hamm. Die Wohnung ist leider sehr klein. (aber)",
    "Ich lerne Deutsch. Ich möchte als Krankenpfleger arbeiten. (weil)",
    "Meine Kinder sind vormittags in der Schule. Ich habe Zeit für den Kurs. (deshalb)",
    "Ich war 25 Jahre alt. Ich bin nach Deutschland gekommen. (als)",
    "Ich spreche Russisch und Kasachisch. Ich spreche Deutsch. (außerdem)",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# ── Übung 4: Übungskarten ──
u4h = task(
    4,
    "Übungskarten zu zweit",
    "Person A wählt eine Karte und stellt sich in dieser Rolle vor (ca. 1 Minute, ganze Sätze!). Person B ist "
    "Prüfer/Prüferin und stellt danach 2–3 Nachfragen (siehe Tabelle oben). Dann tauschen Sie. "
    "In der letzten Runde stellen Sie sich selbst vor.",
    3,
)
cards = [
    ("Ana Lima", "Brasilien, aus Recife", "Duisburg, seit 2 Jahren", "verheiratet, 1 Tochter (3)",
     "Zahnmedizinische Fachangestellte; jetzt Praktikum in einer Zahnarztpraxis", "Portugiesisch, Spanisch, Deutsch", "tanzen, Podcasts"),
    ("Yusuf Demir", "Türkei, aus Izmir", "Herne, seit 5 Jahren", "verheiratet, 3 Kinder (12, 9, 4)",
     "Busfahrer bei einem Verkehrsbetrieb", "Türkisch, Englisch, Deutsch", "angeln, mit den Kindern Rad fahren"),
    ("Mariam Tesfaye", "Eritrea, aus Asmara", "Bielefeld, seit 3 Jahren", "ledig, wohnt mit ihrer Schwester",
     "Ausbildung als Industriemechanikerin, 2. Lehrjahr", "Tigrinya, Arabisch, Deutsch", "Volleyball"),
    ("Piotr Nowicki", "Polen, aus Breslau", "Dortmund, seit 1 Jahr", "geschieden, Sohn (15) lebt in Polen",
     "früher Koch, jetzt Lagerist mit Staplerschein", "Polnisch, Englisch, Deutsch", "Schach, Kochen"),
    ("Nour Al-Khatib", "Syrien, aus Aleppo", "Essen, seit 7 Jahren", "verheiratet, 2 Kinder (10, 7)",
     "Pharmazie studiert; Anerkennung läuft, Ziel: Apothekerin", "Arabisch, Englisch, Deutsch", "fotografieren"),
    ("Andrés Castillo", "Kolumbien, aus Medellín", "Köln, seit 8 Monaten", "verheiratet, keine Kinder",
     "Bauingenieur; sucht Arbeit, macht zuerst den B1-Kurs", "Spanisch, Englisch, Deutsch", "Fahrradtouren"),
]


def card(c):
    n, h, w, f, b, sp, ho = c
    return R(
        f"<b>{fallback(n)}</b><br/><font color=\"#566078\">Herkunft:</font> {fallback(h)}<br/>"
        f"<font color=\"#566078\">Wohnort:</font> {w}<br/><font color=\"#566078\">Familie:</font> {f}<br/>"
        f"<font color=\"#566078\">Beruf:</font> {b}<br/><font color=\"#566078\">Sprachen:</font> {sp}<br/>"
        f"<font color=\"#566078\">Freizeit:</font> {ho}",
        "cell",
    )


rows = [[card(cards[i]), card(cards[i + 1])] for i in range(0, len(cards), 2)]
kt = Table(rows, colWidths=[87 * mm, 87 * mm])
kt.setStyle(TableStyle([
    ("GRID", (0, 0), (-1, -1), 0.8, HexColor("#9AA6C4")), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
s += [KeepTogether(u4h + [kt]), Spacer(1, 4)]
s += [KeepTogether([
    R("Meine eigene Karte", "h3"),
    table([[f"<b>{x}</b>", ""] for x in ["Name", "Herkunft", "Wohnort", "Familie", "Arbeit/Beruf", "Sprachen", "Freizeit/Pläne"]],
          [34, 140], head=False),
])]

# ── Fehler-Checkliste ──
s += [
    R("Fehler-Checkliste: Das hören Prüfende oft", "h2"),
    table(
        [
            ["<b>So nicht</b>", "<b>Besser so</b>"],
            [X("Ich komme von Syrien."), OK("Ich komme aus Syrien.")],
            [X("Ich komme aus Türkei / aus Irak."), OK("Ich komme aus der Türkei / aus dem Irak.")],
            [X("Ich wohne seit drei Jahre in Essen."), OK("Ich wohne seit drei Jahren in Essen.")],
            [X("Ich bin 34 Jahre."), OK("Ich bin 34 Jahre alt.")],
            [X("Ich bin verheiratet mit zwei Kinder."), OK("Ich bin verheiratet und habe zwei Kinder.")],
            [X("Ich arbeite als ein Fahrer."), OK("Ich arbeite als Fahrer.")],
            [X("Ich habe gearbeitet als Koch."), OK("Ich habe als Koch gearbeitet.")],
            [X("Ich habe nach Deutschland gekommen."), OK("Ich bin nach Deutschland gekommen.")],
            [X("Ich spreche Arabisch und bisschen Deutsch."), OK("Ich spreche Arabisch und ein bisschen Deutsch.")],
            [X("Ich bin nach Deutschland gekommen vor zwei Jahren."), OK("Vor zwei Jahren bin ich nach Deutschland gekommen.")],
        ],
        [87, 87],
    ),
    Spacer(1, 6),
    box(
        R(
            "<b>Vor der Prüfung – kann ich das?</b><br/>"
            f"{sym('☐')} Ich kann zu allen sechs Stichpunkten 2–3 ganze Sätze sagen.<br/>"
            f"{sym('☐')} Ich kann meinen Namen und meine Straße deutlich buchstabieren.<br/>"
            f"{sym('☐')} Ich benutze {K('seit')} und {K('vor')} richtig.<br/>"
            f"{sym('☐')} Ich kann über früher sprechen (Perfekt: habe … gearbeitet, bin … gekommen).<br/>"
            f"{sym('☐')} Ich verbinde Sätze mit {K('weil')}, {K('aber')}, {K('deshalb')}.<br/>"
            f"{sym('☐')} Ich antworte auf Nachfragen mit einem Grund oder Beispiel – nicht nur „Ja“ oder „Nein“.<br/>"
            f"{sym('☐')} Wenn ich etwas nicht verstehe, frage ich höflich nach.<br/>"
            f"{sym('☐')} Ich höre auch zu, wenn mein Partner / meine Partnerin spricht.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# ── Lösungen ──
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"), R("1 c  ·  2 g  ·  3 d  ·  4 f  ·  5 a  ·  6 b  ·  7 h  ·  8 e", "sol")]
s += [R("Übung 2", "solh"),
      R("1. seit  ·  2. Vor  ·  3. Von … bis  ·  4. im  ·  5. seit  ·  6. für  ·  7. am  ·  8. seit", "sol")]
l3 = [
    f"Ich wohne gern in Hamm, {K('aber')} die Wohnung ist leider sehr klein.",
    f"Ich lerne Deutsch, {K('weil')} ich als Krankenpfleger arbeiten {V('möchte')}.",
    f"Meine Kinder sind vormittags in der Schule, {K('deshalb')} {V('habe')} ich Zeit für den Kurs.",
    f"{K('Als')} ich 25 Jahre alt {V('war')}, bin ich nach Deutschland gekommen.",
    f"Ich spreche Russisch und Kasachisch. {K('Außerdem')} {V('spreche')} ich Deutsch.",
]
s += [R("Übung 3", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
s += [R("Übung 4 – Beispiel (Karte Mariam Tesfaye)", "solh"),
      box(R(
          "Guten Tag, ich heiße Mariam Tesfaye. Ich komme aus Eritrea, aus der Hauptstadt Asmara. Seit drei Jahren wohne ich "
          "in Bielefeld. Ich bin ledig und wohne zusammen mit meiner Schwester. Im Moment mache ich eine Ausbildung als "
          "Industriemechanikerin, ich bin im zweiten Lehrjahr. Die Arbeit gefällt mir, weil ich gern mit Maschinen arbeite. "
          "Ich spreche Tigrinya, Arabisch und Deutsch. In meiner Freizeit spiele ich Volleyball in einem Verein.<br/>"
          "<i>Nachfrage:</i> Was möchten Sie nach der Ausbildung machen? – Ich möchte gern in meinem Betrieb bleiben. "
          "Später kann ich vielleicht noch eine Weiterbildung zur Technikerin machen.",
          "cell"), HELLGRUEN, GRUEN)]
s += [R("Die Personen auf den Karten und in den Mustertexten sind erfunden.", "small")]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
