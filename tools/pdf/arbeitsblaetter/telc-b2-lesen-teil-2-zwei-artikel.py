# Arbeitsblatt telc Deutsch B2: Leseverstehen Teil 2 – Detailverstehen mit zwei Zeitungsartikeln
# Format laut tools/pdf/b2-formate-offiziell.md (telc Deutsch B2, Übungstest 1, 2019): Multiple Choice a/b/c zu zwei Artikeln,
# 5 Aufgaben (6–10), 5 × 5 = 25 Punkte, 90 Min. für Leseverstehen + Sprachbausteine. Eigene, erfundene Texte.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-lesen-teil-2-zwei-artikel.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b2-lesen-teil-2-zwei-artikel"
TITLE = "telc B2 Leseverstehen Teil 2: zwei Zeitungsartikel"  # page header (max. 70 characters)
LEVEL = "B2"
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
BOX = sym("☐")
st["txt"] = ParagraphStyle("txt", parent=st["p"], fontSize=10.4, leading=14.2, spaceAfter=4, leftIndent=18, firstLineIndent=-18)
st["art"] = ParagraphStyle("art", parent=st["h3"], fontSize=13, leading=16, spaceBefore=2, spaceAfter=1)
st["sub"] = ParagraphStyle("sub", parent=st["small"], fontName="Atk-I", spaceAfter=5)
st["q"] = ParagraphStyle("q", parent=st["cell"], fontSize=10.2, leading=13.4)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)


def para(nr, text):
    return R(f'<font color="#2341B5"><b>[{nr}]</b></font>  {text}', "txt")


def mc(nr, stem, opts):
    rows = [[R(f"<b>{nr}</b>", "q"), R(f"<b>{stem}</b>", "q"), ""]]
    rows += [["", R(f"{l}) {o}", "q"), _R(BOX, "q")] for l, o in zip("abc", opts)]
    t = Table(rows, colWidths=[10 * mm, 152 * mm, 12 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 2),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 2), ("LINEBELOW", (0, -1), (-1, -1), 0.4, LINE),
                           ("ALIGN", (2, 0), (2, -1), "CENTER")]))
    return KeepTogether([t, Spacer(1, 3)])


s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2 Leseverstehen Teil 2: zwei Zeitungsartikel", "h1"),
    R("Ein kompletter Übungssatz im Prüfungsformat: zwei Artikel zum Thema Wohnen, fünf Aufgaben mit je drei Lösungen. "
      "Dazu Strategien gegen die typischen Fallen. Texte, Orte und Personen sind erfunden.", "lead"),
    box([
        R("<b>So läuft der Teil (laut Modelltest, telc 2019)</b>", "h3"),
        table(
            [
                ["<b>Prüfungsziel</b>", "<b>Detailverstehen</b>: Sie lesen genau und verstehen auch Meinungen, Gründe und Einschränkungen."],
                ["<b>Texte</b>", "<b>zwei Zeitungsartikel</b>"],
                ["<b>Aufgabe</b>", "<b>5 Aufgaben</b> (Nr. 6–10), Multiple Choice: zu jeder Aufgabe drei Lösungen (a, b, c), nur eine ist richtig."],
                ["<b>Punkte</b>", "5 × 5 = <b>25 Punkte</b>"],
                ["<b>Zeit</b>", "<b>90 Minuten</b> für Leseverstehen Teil 1–3 und Sprachbausteine zusammen – "
                                "eine feste Zeit nur für Teil 2 gibt es nicht."],
            ],
            [30, 124],
            head=False,
        ),
    ], SOFT, None),
    Spacer(1, 5),
]

s += [
    R("Strategie in vier Schritten", "h2"),
    R("<b>1. Erst die Aufgabe, dann der Text.</b> Lesen Sie die Überschrift des Artikels und die Satzanfänge der Aufgaben "
      "(noch ohne a, b, c). So wissen Sie, wonach Sie suchen.", "item"),
    R("<b>2. Die Stelle finden.</b> Die Aufgaben folgen meist der Reihenfolge im Text. Markieren Sie die Stelle, an der die "
      "Antwort steht – auf diesem Blatt helfen die Absatznummern [1], [2] …", "item"),
    R("<b>3. Jede Lösung prüfen.</b> Vergleichen Sie a, b <i>und</i> c mit der Textstelle. Die richtige Lösung sagt dasselbe "
      "mit <i>anderen Worten</i>; wörtlich gleiche Wörter sind oft eine Falle.", "item"),
    R("<b>4. Nicht hängen bleiben.</b> Unsicher? Kreuzen Sie die beste Lösung an, notieren Sie die Nummer und gehen Sie weiter. "
      "Die 90 Minuten gelten für mehrere Teile.", "item"),
    R("So sind falsche Lösungen gebaut", "h3"),
    table(
        [
            ["<b>Typ</b>", "<b>Was passiert?</b>"],
            ["<b>A</b> nicht im Text", "Klingt logisch, steht aber nirgends im Artikel."],
            ["<b>B</b> Gegenteil", "Der Text sagt genau das Umgekehrte (mehr statt weniger, ja statt nein)."],
            ["<b>C</b> falsche Person", "Die Aussage stimmt – aber sie stammt von jemand anderem oder gilt für eine andere Gruppe."],
            ["<b>D</b> zu absolut / verdreht", "Der Text schränkt ein (<i>zwar … aber, grundsätzlich, bisher</i>), die Lösung nicht."],
        ],
        [44, 130],
    ),
]

# ── Artikel 1 ──
s += [PageBreak()]
s += task(1, "Lesen Teil 2: zwei Artikel", "Lesen Sie die beiden Artikel und lösen Sie die Aufgaben 6–10. Welche Lösung "
          "(a, b oder c) ist richtig? Kreuzen Sie an. (Auf diesem Blatt: Aufgaben 6–8 zu Artikel 1, 9–10 zu Artikel 2.)", 3)
s += [
    R("Artikel 1 · Ein Zimmer gegen ein paar Stunden Hilfe", "art"),
    R("Beim Modell „Wohnen für Hilfe“ ziehen Studierende bei älteren Menschen ein. Miete zahlen sie nicht – jedenfalls nicht in Euro.", "sub"),
    para(1, "Edeltraud Kühn ist 81 Jahre alt und lebt seit fast fünfzig Jahren in derselben Altbauwohnung in Lindenau. Seit ihr "
         "Mann vor drei Jahren gestorben ist, standen drei der vier Zimmer meistens leer. „Ausziehen wollte ich nie. Aber allein war "
         "mir die Wohnung zu still – und ehrlich gesagt auch zu groß zum Putzen“, sagt sie. Seit Oktober wohnt Darius Mehrabi bei ihr, "
         "23 Jahre alt, Student der Elektrotechnik. Er kauft für sie ein, trägt die Getränkekisten in den vierten Stock und hat ihr "
         "gezeigt, wie sie per Video mit ihren Enkeln in Kanada telefonieren kann."),
    para(2, "Das Modell heißt „Wohnen für Hilfe“ und wird in Lindenau vom Studierendenwerk vermittelt. Dort gilt eine einfache "
         "Regel: Pro Quadratmeter Wohnraum leisten die jungen Leute eine Stunde Hilfe im Monat. Für Darius’ Zimmer mit 16 "
         "Quadratmetern sind das 16 Stunden. Die Nebenkosten für Strom und Wasser teilen sich die beiden. Pflege gehört ausdrücklich "
         "nicht zu den Aufgaben, betont Projektleiterin Sanja Petrović: „Die Studierenden sind keine Pflegekräfte. Wenn jemand Pflege "
         "braucht, vermitteln wir an professionelle Dienste.“"),
    para(3, "Die Vermittlung ist aufwendig. Petrović und eine Kollegin führen mit beiden Seiten lange Gespräche, besuchen jede Wohnung "
         "und achten darauf, dass die Gewohnheiten zusammenpassen. „Wer um neun ins Bett geht, ist mit einem Nachtmenschen schlecht "
         "beraten“, sagt sie. Im vergangenen Jahr hat das Studierendenwerk 41 Paare zusammengebracht. Interessierte Studierende gab es "
         "dreimal so viele wie freie Zimmer. Viele ältere Menschen, so Petrović, hätten Hemmungen, eine fremde Person in ihre Wohnung "
         "zu lassen – auch wenn sie sich Gesellschaft wünschten."),
    para(4, "Auch bei Frau Kühn und Darius lief nicht von Anfang an alles glatt. In den ersten Wochen störte es sie, dass er abends "
         "lange und laut mit seiner Familie telefonierte. Die beiden haben dann Regeln aufgeschrieben: Nach 22 Uhr wird leise "
         "telefoniert, und sonntags kocht Darius für beide. „Dieses Essen ist inzwischen mein liebster Termin der Woche“, sagt "
         "Frau Kühn und lacht."),
    Spacer(1, 3),
    mc(6, "Frau Kühn macht bei „Wohnen für Hilfe“ mit, weil sie …", [
        "sich die große Wohnung allein nicht mehr leisten konnte.",
        "in ihrer Wohnung bleiben, aber nicht mehr allein leben wollte.",
        "jemanden gesucht hat, der sie im Alltag pflegt.",
    ]),
    mc(7, "Was gilt laut Artikel für die Studierenden?", [
        "Für ihr Zimmer entstehen ihnen keinerlei Kosten.",
        "Sie helfen umso mehr, je größer ihr Zimmer ist.",
        "Sie übernehmen neben der Hilfe im Haushalt auch leichte Pflege.",
    ]),
    mc(8, "Was erfährt man über die Vermittlung?", [
        "Es gibt mehr freie Zimmer als interessierte Studierende.",
        "Ältere und junge Menschen passen fast immer problemlos zusammen.",
        "Viele Seniorinnen und Senioren tun sich schwer damit, Fremde aufzunehmen.",
    ]),
]

# ── Artikel 2 ──
s += [
    Spacer(1, 4),
    KeepTogether([R("Artikel 2 · Große Wohnung gegen kleine – geht das?", "art"),
    R("Eine neue Tauschbörse der städtischen Wohnungsgesellschaft soll Familien und Senioren zusammenbringen. Die Bilanz nach "
      "dem ersten Halbjahr ist gemischt.", "sub"),
    para(1, "Familie Nguyen wohnt mit drei Kindern auf 62 Quadratmetern. Zwei Straßen weiter lebt das Ehepaar Wolters allein auf 110 "
         "Quadratmetern; die Kinder sind längst ausgezogen. Beide würden gern tauschen – doch bis vor Kurzem wussten sie nichts "
         "voneinander. Das soll die Wohnungstauschbörse ändern, die die städtische Wohnungsgesellschaft seit Februar im Internet anbietet.")]),
    para(2, "Das Prinzip: Mieterinnen und Mieter der Gesellschaft tragen ihre Wohnung und ihre Wünsche ein, ein Programm schlägt "
         "passende Tauschpartner vor. Das Besondere: Beim Tausch übernehmen beide Seiten den bestehenden Mietvertrag der anderen "
         "Wohnung zu den bisherigen Bedingungen. Bei einem normalen Umzug müssten sie dagegen meist eine deutlich höhere Miete für "
         "einen neuen Vertrag zahlen. Für Menschen, die sich verkleinern wollen, war genau das bisher das größte Hindernis."),
    para(3, "Bislang ist die Bilanz bescheiden: Rund 600 Haushalte haben sich angemeldet, getauscht haben erst 14. Geschäftsführer "
         "Henrik Asmussen ist trotzdem zufrieden. „Ein Umzug ist eine große Entscheidung, besonders für ältere Menschen. Viele schauen "
         "sich erst einmal monatelang um.“ Er rechnet damit, dass die Zahl der Tausche im zweiten Jahr deutlich steigt."),
    para(4, "Kritik kommt vom Mieterverein. Dessen Sprecherin Aylin Demirtaş nennt die Börse zwar „einen Schritt in die richtige "
         "Richtung“, hält sie aber für zu eng gefasst: Tauschen könne man nur innerhalb der städtischen Gesellschaft, und deren "
         "Wohnungen machten nur etwa ein Fünftel des Mietmarkts aus. „Wer bei einem privaten Vermieter wohnt, hat davon nichts.“ "
         "Sie fordert die Stadt auf, auch private Eigentümer zum Mitmachen zu bewegen."),
    para(5, "Die Nguyens und die Wolters haben übrigens zusammengefunden – über die Börse. Im Mai ist Umzugstag."),
    Spacer(1, 3),
    mc(9, "Was ist das Besondere an der Tauschbörse?", [
        "Wer seine Wohnung tauscht, bekommt von der Stadt eine Umzugsprämie.",
        "Man kann tauschen, ohne für die neue Wohnung eine höhere Miete zu zahlen.",
        "Auch Wohnungen von privaten Vermietern können getauscht werden.",
    ]),
    mc(10, "Wie bewertet der Mieterverein die Tauschbörse?", [
        "Er findet die Idee gut, das Angebot aber zu begrenzt.",
        "Er lehnt sie ab, weil bisher kaum jemand getauscht hat.",
        "Er fordert, dass die Börse nur für ältere Menschen gilt.",
    ]),
]

# ── Übung 2 ──
s += task(2, "Warum ist das falsch?", "Nach dem Lösen: Wählen Sie zu jeder Aufgabe eine Lösung, die Sie <b>nicht</b> angekreuzt "
          "haben. Bestimmen Sie den Fallen-Typ (A nicht im Text · B Gegenteil · C falsche Person · D zu absolut / verdreht) und "
          "notieren Sie den Absatz, der es zeigt.", 2)
nt = Table([[R(f"<b>{h}</b>", "cell") for h in ("Aufgabe", "falsche Lösung", "Typ", "Beleg (Artikel, Absatz)")]] +
           [[R(str(n), "cell"), "", "", ""] for n in range(6, 11)],
           colWidths=[20 * mm, 30 * mm, 20 * mm, 104 * mm], rowHeights=[None] + [7 * mm] * 5)
nt.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("GRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))
s += [nt]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen mit Textstelle", "h2"),
      R("Erst selbst lösen, dann vergleichen. Je richtige Antwort 5 Punkte, maximal 25.", "small")]
l1 = [
    ("6 – b", "Artikel 1 [1]: „Ausziehen wollte ich nie. Aber allein war mir die Wohnung zu still.“ – "
              "<i>a</i>: Geld wird nicht als Grund genannt. <i>c</i>: Pflege gehört „ausdrücklich nicht zu den Aufgaben“ [2]."),
    ("7 – b", "Artikel 1 [2]: „Pro Quadratmeter Wohnraum … eine Stunde Hilfe im Monat.“ – "
              "<i>a</i>: „Die Nebenkosten für Strom und Wasser teilen sich die beiden.“ <i>c</i>: „Die Studierenden sind keine Pflegekräfte.“"),
    ("8 – c", "Artikel 1 [3]: „Viele ältere Menschen … hätten Hemmungen, eine fremde Person in ihre Wohnung zu lassen.“ – "
              "<i>a</i>: umgekehrt, Studierende gab es „dreimal so viele wie freie Zimmer“. <i>b</i>: Die Gewohnheiten müssen erst "
              "geprüft werden; auch bei Frau Kühn gab es Probleme [4]."),
    ("9 – b", "Artikel 2 [2]: Beide übernehmen „den bestehenden Mietvertrag … zu den bisherigen Bedingungen“, bei einem normalen "
              "Umzug wäre die Miete „deutlich höher“. – <i>a</i>: Eine Prämie wird nicht erwähnt. <i>c</i>: „Tauschen könne man nur "
              "innerhalb der städtischen Gesellschaft“ [4]."),
    ("10 – a", "Artikel 2 [4]: „zwar ‚einen Schritt in die richtige Richtung‘, hält sie aber für zu eng gefasst“. – "
               "<i>b</i>: Die wenigen Tausche nennt der Artikel [3], aber nicht der Mieterverein als Grund – und er lehnt die Börse nicht ab. "
               "<i>c</i>: Davon ist nicht die Rede."),
]
s += [R("Übung 1 · Aufgaben 6–10", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l1]
s += [R("Übung 2 · Fallen-Typen aller falschen Lösungen (Vorschlag)", "solh"),
      R("<b>6a</b> A (Geld ist kein Thema) · <b>6c</b> B (ausdrücklich keine Pflege) · <b>7a</b> D (Nebenkosten fallen an) · "
        "<b>7c</b> B · <b>8a</b> B (umgekehrt) · <b>8b</b> D (Gewohnheiten müssen erst passen) · <b>9a</b> A · <b>9c</b> B (nur "
        "städtische Wohnungen) · <b>10b</b> C + D (die Bilanz nennt der Artikel, nicht der Mieterverein; „ablehnen“ ist zu stark) · "
        "<b>10c</b> A", "sol")]
s += [Spacer(1, 6), box(R("<b>Wortschatz aus den Artikeln</b> – für Ihre eigenen Texte und die mündliche Prüfung: "
                          "<i>Hemmungen haben, etwas zu tun · zu den bisherigen Bedingungen · das größte Hindernis · die Bilanz ist "
                          "bescheiden / gemischt · ein Schritt in die richtige Richtung · zu eng gefasst sein · jemanden zum Mitmachen "
                          "bewegen · nicht alles lief glatt</i>", "cell"), NOTE, GELB)]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
