# Arbeitsblatt B2 Prüfung: Eine Grafik beschreiben
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/grafik-beschreiben-b2.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import INK, MUTED, LINE, TINTE
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics.shapes import Drawing, Rect, String, Line

SLUG = "grafik-beschreiben-b2"
TITLE = "Eine Grafik beschreiben: Zahlen, Trends und Vergleiche"
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
UP, DOWN = sym("↗"), sym("↘")
NB = " "
SEP = "&nbsp;" * 10
FAKE = '<font color="#C2362B"><b>Erfundene Beispielzahlen</b> – keine echte Statistik, nur zum Üben.</font>'

# Grafik A: Arbeitsweg 2015 / 2025 (erfundene Beispielzahlen, Summe je 100)
DATA_A = [("Auto", 58, 46), ("Bus und Bahn", 20, 26), ("Fahrrad", 8, 15), ("zu Fuß", 10, 9), ("Sonstiges", 4, 4)]


def bar_chart():
    w, h = 174 * mm, 58 * mm
    d = Drawing(w, h)
    x0, scale = 30 * mm, 2.15 * mm  # mm per percentage point, axis 0–60
    bar, gap = 3.4 * mm, 2.2 * mm
    top = h - 9 * mm
    # legend
    d.add(Rect(x0, h - 4 * mm, 3 * mm, 3 * mm, fillColor=HexColor("#AEB6C8"), strokeColor=None))
    d.add(String(x0 + 4.5 * mm, h - 3.6 * mm, "2015", fontName="Atk", fontSize=9, fillColor=INK))
    d.add(Rect(x0 + 18 * mm, h - 4 * mm, 3 * mm, 3 * mm, fillColor=TINTE, strokeColor=None))
    d.add(String(x0 + 22.5 * mm, h - 3.6 * mm, "2025", fontName="Atk", fontSize=9, fillColor=INK))
    d.add(String(w, h - 3.6 * mm, "Angaben in Prozent", fontName="Atk", fontSize=8.5, fillColor=MUTED, textAnchor="end"))
    bottom = top - len(DATA_A) * (2 * bar + gap) + gap
    for v in (0, 20, 40, 60):
        x = x0 + v * scale
        d.add(Line(x, bottom, x, top + 1 * mm, strokeColor=LINE, strokeWidth=0.5))
        d.add(String(x, bottom - 3.5 * mm, f"{v} %", fontName="Atk", fontSize=8, fillColor=MUTED, textAnchor="middle"))
    y = top
    for name, a, b in DATA_A:
        d.add(String(x0 - 2 * mm, y - bar - 1.2 * mm, name, fontName="Atk-B", fontSize=9.5, fillColor=INK, textAnchor="end"))
        for val, col in ((a, HexColor("#AEB6C8")), (b, TINTE)):
            y -= bar
            d.add(Rect(x0, y, val * scale, bar - 0.6 * mm, fillColor=col, strokeColor=None))
            d.add(String(x0 + val * scale + 1.5 * mm, y + 0.6 * mm, f"{val} %", fontName="Atk", fontSize=8.5, fillColor=INK))
        y -= gap
    return d


s = [
    R("B2 · Prüfung · Arbeitsblatt", "kick"),
    R("Eine Grafik beschreiben", "h1"),
    R(
        "Steigen, sinken, sich verdoppeln, im Vergleich zu … – mit diesen Redemitteln beschreiben Sie Zahlen und Trends "
        "klar und genau: in der B2-Prüfung, im Beruf und in der Weiterbildung.",
        "lead",
    ),
]

s += [
    R("Der Aufbau in drei Schritten", "h2"),
    box(
        R(
            "<b>1. Einleitung:</b> Thema, Zeitraum, Einheit (Prozent? Anzahl?).   "
            "<b>2. Hauptteil:</b> die wichtigsten Zahlen, Trends und Vergleiche – nicht jede Zahl vorlesen!   "
            "<b>3. Schluss:</b> Was fällt besonders auf? Mögliche Gründe, Ihre Meinung, Ihre Erfahrung."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Teil</b>", "<b>Redemittel</b>"],
            ["<b>Einleitung</b>",
             f"{K('Die Grafik zeigt,')} wie viele … · {K('Die Grafik gibt Auskunft über')} … · "
             f"{K('Die Zahlen beziehen sich auf')} die Jahre … · {K('Die Angaben sind in Prozent.')}"],
            ["<b>Anteile</b>",
             f"25 % = {K('ein Viertel')} · 33 % = {K('ein Drittel')} · 50 % = {K('die Hälfte')} · 75 % = {K('drei Viertel')} · "
             f"48 % = {K('knapp die Hälfte')} · 52 % = {K('gut die Hälfte')} · 10 % = {K('jeder Zehnte')} · "
             f"über 50 % = {K('die Mehrheit')}"],
            [f"<b>steigen</b> {UP}",
             f"{K('steigen, zunehmen, wachsen')} · {K('der Anstieg, die Zunahme')} · {K('sich verdoppeln')}"],
            [f"<b>sinken</b> {DOWN}",
             f"{K('sinken, zurückgehen, abnehmen')} · {K('der Rückgang, die Abnahme')} · {K('sich halbieren')}"],
            ["<b>gleich bleiben</b>",
             f"{K('gleich bleiben, stabil bleiben')} · {K('sich kaum verändern')} · {K('kaum eine Veränderung')}"],
            ["<b>wie stark?</b>",
             f"{K('stark, deutlich')} – {K('leicht, etwas')} · {K('von')} 20 {K('auf')} 30 Prozent · {K('um')} 10 Prozentpunkte"],
            ["<b>vergleichen</b>",
             f"{K('im Vergleich zu')} … · {K('während')} … · {K('doppelt so viele wie')} … · "
             f"{K('An erster Stelle steht')} …, {K('gefolgt von')} … · {K('am wenigsten')} …"],
            ["<b>Schluss</b>",
             f"{K('Besonders auffällig ist, dass')} … · {K('Ich vermute, dass das daran liegt, dass')} … · "
             f"{K('In meinem Herkunftsland / In meinem Beruf')} …"],
        ],
        [32, 142],
    ),
    Spacer(1, 4),
    box(
        R(
            f"<b>Prozent oder Prozentpunkte?</b> Von 20 % auf 30 %: Das ist ein Anstieg {K('um 10 Prozentpunkte')} – "
            f"aber {K('um 50 Prozent')}, denn 10 ist die Hälfte von 20. Im Alltag sagt man oft „Prozent“, "
            f"in der Prüfung zeigen „Prozentpunkte“ Ihre Genauigkeit.",
            "cell",
        ),
        SOFT,
    ),
]

# Grafik A
s += [
    KeepTogether([
        R("Grafik A: Wie kommen Beschäftigte in einer Beispielstadt zur Arbeit? (2015 und 2025)", "h3"),
        bar_chart(),
        R(FAKE, "small"),
    ])
]

# Übung 1
u1h = task(1, "Zahlen in Worten", "Welcher Ausdruck passt? Ordnen Sie zu.", 1)
u1_nums = ["1. 75 %", "2. 9 %", "3. 46 %", "4. 20 %", "5. 50 %", "6. 85 %", "7. 25 %", "8. 35 %"]
u1_expr = ["a) ein Fünftel", "b) gut ein Drittel", "c) die große Mehrheit", "d) die Hälfte",
           "e) knapp die Hälfte", "f) drei Viertel", "g) fast jeder Zehnte", "h) ein Viertel"]
u1h += [R(SEP.join(f"{n}{NB}<font color=\"#8A93A8\">____</font>" for n in u1_nums[:4]), "item"),
        R(SEP.join(f"{n}{NB}<font color=\"#8A93A8\">____</font>" for n in u1_nums[4:]), "item"),
        box(R("   ·   ".join(u1_expr[:4]) + "<br/>" + "   ·   ".join(u1_expr[4:]), "cell"), SOFT)]
s += [KeepTogether(u1h)]

# Übung 2
s += task(
    2,
    "Grafik A beschreiben",
    "Ergänzen Sie: auf · fast · gefolgt von · gestiegen · gesunken · Im Vergleich · Rückgang · um · von",
    2,
)
u2 = (
    "Die Grafik zeigt, wie Beschäftigte 2015 und 2025 hauptsächlich zur Arbeit gekommen sind. "
    "Das Auto steht in beiden Jahren an erster Stelle, (1) {} Bus und Bahn. Allerdings ist der Anteil der Autofahrerinnen "
    "und Autofahrer (2) {} 58 (3) {} 46 Prozent (4) {}. Das ist ein (5) {} (6) {} 12 Prozentpunkte. "
    "Der Anteil von Bus und Bahn ist dagegen von 20 auf 26 Prozent (7) {}. (8) {} zu 2015 fahren heute deutlich mehr "
    "Menschen mit dem Fahrrad: Der Anteil der Radfahrenden hat sich (9) {} verdoppelt."
)
s += [R(u2.format(*[GAP] * 9), "p")]

# Übung 3
s += task(3, "Stimmt das?", "Lesen Sie Grafik A. Kreuzen Sie an und korrigieren Sie die falschen Sätze.", 2)
u3 = [
    "2025 fährt knapp die Hälfte der Beschäftigten mit dem Auto zur Arbeit.",
    "Der Anteil von Bus und Bahn ist um 6 Prozent gestiegen.",
    "Zu Fuß gehen 2025 deutlich mehr Menschen als 2015.",
    "2015 fuhren fast dreimal so viele Menschen Auto wie Bus und Bahn.",
    "2025 nutzt gut ein Viertel der Beschäftigten Bus und Bahn.",
]
rf = f'<font color="#566078">{sym("☐")} richtig  {sym("☐")} falsch</font>'
s += [R(f"{i}. {t}   {rf}", "item") for i, t in enumerate(u3, 1)]
s += [R("Korrektur:", "small"), lines(2)]

# Grafik B + Übung 4
s += [
    KeepTogether([
        R("Grafik B: Weiterbildung im Betrieb – Teilnahme nach Alter (2020 und 2025)", "h3"),
        table(
            [
                ["<b>Altersgruppe</b>", "<b>2020</b>", "<b>2025</b>", "<b>Veränderung</b>"],
                ["18 bis 29 Jahre", "34 %", "41 %", f"{UP} + 7 Prozentpunkte"],
                ["30 bis 44 Jahre", "38 %", "39 %", "+ 1 Prozentpunkt"],
                ["45 bis 59 Jahre", "29 %", "36 %", f"{UP} + 7 Prozentpunkte"],
                ["60 Jahre und älter", "14 %", "7 %", f"{DOWN} – 7 Prozentpunkte"],
            ],
            [50, 30, 30, 64],
        ),
        R(FAKE, "small"),
    ])
]

s += task(
    4,
    "Verb oder Nomen?",
    "Formulieren Sie die Sätze zu Grafik B um: Verb " + ARROW + " Nomen (Nummer 1–3), Nomen " + ARROW + " Verb (Nummer 4).",
    3,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Bei den 45- bis 59-Jährigen ist die Teilnahme um 7 Prozentpunkte gestiegen.<br/>"
            f"{ARROW} Bei den 45- bis 59-Jährigen gab es {K('einen Anstieg')} der Teilnahme um 7 Prozentpunkte.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u4 = [
    "Bei den Beschäftigten ab 60 ist die Teilnahme stark zurückgegangen.",
    "Bei den 30- bis 44-Jährigen hat sich die Teilnahme kaum verändert.",
    "Bei den 18- bis 29-Jährigen hat die Teilnahme deutlich zugenommen.",
    "Bei den Beschäftigten ab 60 gab es eine Halbierung der Teilnahme.",
]
for i, t in enumerate(u4, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 5
s += task(
    5,
    "Ihre Grafikbeschreibung",
    "Beschreiben Sie Grafik B schriftlich (ca. 120–150 Wörter) oder mündlich (ca. 2 Minuten).",
    3,
)
s += [
    box(
        R(
            "<b>Checkliste:</b> "
            f"{sym('☐')} Einleitung   {sym('☐')} zwei Trends   {sym('☐')} ein Vergleich   {sym('☐')} Prozentpunkte   "
            f"{sym('☐')} Schluss: Warum nehmen Ältere seltener teil? Wie ist das in Ihrem Beruf?",
            "cell",
        ),
        SOFT,
    ),
    Spacer(1, 4),
    lines(6, indent=0),
]

# Lösungen
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"),
      R("1. f  ·  2. g  ·  3. e  ·  4. a  ·  5. d  ·  6. c  ·  7. h  ·  8. b", "sol")]
s += [R("Übung 2", "solh"),
      R("1. gefolgt von  ·  2. von  ·  3. auf  ·  4. gesunken  ·  5. Rückgang  ·  6. um  ·  7. gestiegen  ·  "
        "8. Im Vergleich  ·  9. fast", "sol")]
l3 = [
    f"2. falsch {ARROW} um 6 Prozentpunkte (von 20 auf 26 %). Das sind 30 Prozent mehr.",
    f"3. falsch {ARROW} Der Anteil ist leicht gesunken (von 10 auf 9 %) – er ist fast gleich geblieben.",
    "1., 4. und 5. sind richtig (46 % · 58 % gegenüber 20 % · 26 %).",
]
s += [R("Übung 3", "solh")] + [R(t, "sol") for t in l3]
l4 = [
    f"Bei den Beschäftigten ab 60 gab es {K('einen starken Rückgang')} der Teilnahme.",
    f"Bei den 30- bis 44-Jährigen gab es {K('kaum eine Veränderung')} der Teilnahme.",
    f"Bei den 18- bis 29-Jährigen gab es {K('eine deutliche Zunahme')} der Teilnahme.",
    f"Bei den Beschäftigten ab 60 {K('hat sich')} die Teilnahme {K('halbiert')}.",
]
s += [R("Übung 4 (auch andere Satzanfänge sind möglich)", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l4, 1)]
s += [
    R("Übung 5 – Mustertext", "solh"),
    box(
        R(
            "Die Grafik zeigt, wie viele Beschäftigte 2020 und 2025 an Weiterbildungen im Betrieb teilgenommen haben. "
            "Die Angaben sind in Prozent und nach Altersgruppen geordnet. "
            "Besonders stark ist die Teilnahme bei den 18- bis 29-Jährigen und bei den 45- bis 59-Jährigen gestiegen, "
            "nämlich jeweils um 7 Prozentpunkte. Bei den 30- bis 44-Jährigen hat sich kaum etwas verändert: Hier nimmt "
            "weiterhin gut ein Drittel teil. Ganz anders sieht es bei den Beschäftigten ab 60 aus. Ihr Anteil hat sich "
            "von 14 auf 7 Prozent halbiert. Während 2025 also vier von zehn jungen Beschäftigten eine Weiterbildung machen, "
            "ist es bei den Älteren nur etwa jeder Vierzehnte. Ich vermute, dass das daran liegt, dass Firmen lieber in "
            "Jüngere investieren. Meiner Meinung nach ist das ein Fehler, denn auch erfahrene Beschäftigte müssen mit "
            "neuen Programmen arbeiten können.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
