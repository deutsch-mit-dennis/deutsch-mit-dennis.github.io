# Arbeitsblatt B2 Prüfung: telc Deutsch B2 – Sprachbausteine Teil 1 und 2
# Eigene Übungsaufgaben im Stil der Prüfung, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-sprachbausteine.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b2-sprachbausteine"
TITLE = "telc B2 Sprachbausteine: Grammatik und Wortschatz im Text"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
G = lambda n: f'<b>({n})</b> <font color="#8A93A8">__________</font>'
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10.3, leading=15)
st["optc"] = ParagraphStyle("optc", parent=st["cell"], fontSize=9.6, leading=12.5)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2: Sprachbausteine", "h1"),
    R(
        "Präpositionen, Konnektoren, Relativpronomen, Passiv, Konjunktiv II und feste Verbindungen – in den Sprachbausteinen "
        "zählt jedes kleine Wort. Alle Texte sind eigene Übungstexte im Stil der Prüfung.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            ["<b>Sprach­bausteine 1</b>", "Ein formeller Brief oder eine E-Mail mit 10 Lücken. Für jede Lücke gibt es drei Lösungen (a, b, c). "
             "Vor allem Grammatik: Präpositionen und Kasus, Konnektoren, Relativpronomen, Passiv, Konjunktiv II.",
             "ca. 15 Min.", fallback("10 × 1,5 = 15")],
            ["<b>Sprach­bausteine 2</b>", "Ein Text mit 10 Lücken und 15 Wörtern (a–o). Jedes Wort passt nur einmal, 5 Wörter bleiben übrig. "
             "Vor allem Wortschatz und feste Verbindungen.",
             "ca. 20 Min.", fallback("10 × 1,5 = 15")],
        ],
        [28, 98, 22, 26],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Die Sprachbausteine sind Teil der 90 Minuten für <b>Leseverstehen und Sprachbausteine</b>. "
            "Die Zeiten oben sind Empfehlungen. Insgesamt gibt es hier 30 Punkte.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# ── Strategien ──
s += [
    R("Vier Strategie-Tipps", "h2"),
    R("<b>1. Den ganzen Satz lesen.</b> Nicht nur die Wörter direkt an der Lücke – oft entscheidet das Verb am Satzende.", "item"),
    R("<b>2. Fragen stellen.</b> Welche Wortart fehlt? Welcher Kasus? Wo steht das Verb? (weil " + ARROW + " Verb am Ende, "
      "deshalb " + ARROW + " Verb auf Position 2)", "item"),
    R("<b>3. Teil 2: Wörter sortieren.</b> Ordnen Sie die 15 Wörter zuerst nach Wortart. Beginnen Sie mit den sicheren Lücken "
      "und streichen Sie benutzte Wörter.", "item"),
    R("<b>4. Mit Präposition lernen.</b> Lernen Sie Verben und Nomen immer mit Präposition und Kasus: "
      f"{K('sich interessieren für')} + Akk., {K('teilnehmen an')} + Dat. – das bringt hier die meisten Punkte.", "item"),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Falle</b>", "<b>Beispiel</b>"],
            ["Gleiche Bedeutung, andere Wortstellung", f"{K('weil')} ich krank <b>bin</b> · {K('denn')} ich <b>bin</b> krank · {K('deshalb')} <b>bin</b> ich zu Hause"],
            ["Relativpronomen nach Präposition", f"die Kolleginnen, {K('mit denen')} ich arbeite – nicht: mit die"],
            ["Feste Präpositionen", f"{K('Antwort auf')} · {K('ausgestattet mit')} · {K('zuständig für')} · {K('sich freuen auf')} (Zukunft) / {K('über')} (jetzt)"],
            ["Ähnliche Wörter, andere Grammatik", f"{K('eine Rolle')} spielen – nicht: eine Aufgabe spielen · {K('jede Gelegenheit')} – nicht: jede Gelegenheiten"],
            ["Das Wort vor der Lücke", "Artikel, Präposition oder „sich“ verraten oft schon die Lösung."],
        ],
        [52, 122],
    ),
]

# ── Übung 1: Aufwärmen ──
u1 = [
    "Ich bewerbe mich hiermit ___ die Stelle als Sachbearbeiterin.",
    "Vielen Dank für Ihre schnelle Antwort ___ meine Anfrage.",
    "Herr Petrović ist in unserer Firma ___ die Ausbildung zuständig.",
    "Ich möchte gern ___ dem Kurs „Projektmanagement“ teilnehmen.",
    "Ob ich am Seminar teilnehmen kann, hängt ___ meinem Dienstplan ab.",
    "Wir haben großes Interesse ___ einer langfristigen Zusammenarbeit.",
    "Leider muss ich mich ___ die Lautstärke auf der Baustelle beschweren.",
    "Alle Seminarräume sind ___ einem Beamer und WLAN ausgestattet.",
]
s += [PageBreak()]
s += task(1, "Aufwärmen: Feste Präpositionen", "Ergänzen Sie die Präposition: an · auf · für · mit · über · um · von · an", 1)
s += [R(f"{i}. {t.replace('___', '<font color=\"#8A93A8\">________</font>')}", "item") for i, t in enumerate(u1, 1)]

# ── Übung 2: Sprachbausteine Teil 1 ──
mail = (
    "<b>Betreff:</b> Anfrage zum Abendkurs „Buchhaltung kompakt“<br/><br/>"
    "Sehr geehrte Frau Albrecht,<br/><br/>"
    f"ich habe Ihre Anzeige {G(1)} der Zeitschrift „Beruf aktuell“ gelesen und interessiere mich sehr {G(2)} Ihren Abendkurs "
    f"„Buchhaltung kompakt“. Ich arbeite seit drei Jahren in einem Autohaus, in {G(3)} ich vor allem für Rechnungen zuständig bin. "
    f"In meinem Herkunftsland Peru habe ich Betriebswirtschaft studiert, {G(4)} fehlen mir noch Kenntnisse im deutschen Steuerrecht.<br/><br/>"
    f"Bevor ich mich anmelde, habe ich noch einige Fragen. Zunächst möchte ich wissen, {G(5)} man den Kurs auch online besuchen kann, "
    f"denn ich wohne etwa 40 Kilometer vom Bildungszentrum entfernt. Außerdem würde mich interessieren, ob am Ende ein Zertifikat "
    f"{G(6)} wird. Mein Arbeitgeber wäre unter Umständen bereit, einen Teil der Kosten zu übernehmen, {G(7)} ich eine Bescheinigung "
    f"über die Teilnahme vorlege.<br/><br/>"
    f"{G(8)} Sie mir bitte auch mitteilen, bis wann ich mich spätestens anmelden muss? Für eine schnelle Antwort wäre ich Ihnen sehr "
    f"dankbar, {G(9)} ich meinen Urlaub für das nächste Jahr bald planen muss.<br/><br/>"
    f"Ich freue mich {G(10)} Ihre Antwort.<br/><br/>"
    "Mit freundlichen Grüßen<br/>Lucía Fernández"
)
opts1 = [("an", "zu", "in"), ("für", "an", "auf"), ("das", "dem", "den"), ("obwohl", "deshalb", "trotzdem"),
         ("dass", "ob", "wenn"), ("ausgestellt", "ausstellen", "ausgestellte"), ("sondern", "damit", "falls"),
         ("Würden", "Hätten", "Wären"), ("denn", "weil", "deshalb"), ("über", "für", "auf")]
s += [Spacer(1, 4)]
s += task(2, "Sprachbausteine Teil 1", "Lesen Sie die E-Mail und entscheiden Sie, welches Wort (a, b oder c) in die Lücken 1–10 passt. "
          "Kreuzen Sie an.", 2)
s += [box(R(mail, "txt"), HELLGRUEN), Spacer(1, 6)]
B = sym("☐")
orows = []
for i in range(0, 10, 2):
    row = []
    for n in (i, i + 1):
        row += [R(f"<b>{n + 1}</b>", "cell"), R("  ".join(f"{B} {chr(97 + j)}) {w}" for j, w in enumerate(opts1[n])), "optc")]
    orows.append(row)
ot = Table(orows, colWidths=[9 * mm, 78 * mm, 9 * mm, 78 * mm])
ot.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 2),("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE), ("TOPPADDING", (0, 0), (-1, -1), 4),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
s += [ot]

# ── Übung 3: Sprachbausteine Teil 2 ──
words = ["Aufgabe", "denen", "denn", "die", "findet", "Gelegenheit", "Gelegenheiten", "interessiert",
         "raten", "regelmäßig", "Rolle", "treffen", "verbessern", "verbinden", "weil"]
text2 = (
    "<b>Weiterbildung nach Feierabend</b><br/><br/>"
    "Wer heute im Beruf erfolgreich sein will, muss ständig dazulernen. Viele Beschäftigte nutzen deshalb jede "
    f"{G(1)}, um sich weiterzubilden. Immer häufiger {G(2)} das online statt: Kurze Videokurse lassen sich leicht "
    f"mit Arbeit und Familie {G(3)}.<br/><br/>"
    f"Doch das Lernen am Bildschirm hat auch Nachteile. Viele Teilnehmende brechen ihren Kurs ab, {G(4)} ihnen nach einem "
    f"langen Arbeitstag die Motivation fehlt. Fachleute {G(5)} deshalb, sich feste Lernzeiten in den Kalender einzutragen "
    f"und sich mit anderen {G(6)} auszutauschen.<br/><br/>"
    f"Auch die Arbeitgeber spielen eine wichtige {G(7)}. Wenn Firmen die Kosten übernehmen oder Lernzeit während der "
    f"Arbeitszeit erlauben, machen deutlich mehr Beschäftigte mit. Wer sich für eine Weiterbildung {G(8)}, sollte deshalb "
    f"zuerst mit der Personalabteilung sprechen. Häufig gibt es Angebote, von {G(9)} die Beschäftigten gar nichts wissen. "
    f"Und wer am Ende ein Zertifikat in der Hand hält, kann damit nicht nur seine Chancen auf eine bessere Stelle {G(10)}, "
    "sondern auch das eigene Selbstbewusstsein stärken."
)
s += [PageBreak()]
s += task(3, "Sprachbausteine Teil 2", "Lesen Sie den Text und entscheiden Sie, welches Wort (a–o) in die Lücken 1–10 passt. "
          "Jedes Wort passt nur einmal. Fünf Wörter bleiben übrig.", 3)
wrows = [[R(f"{chr(97 + k)}) {words[k]}", "cell") for k in range(r, min(r + 5, 15))] for r in range(0, 15, 5)]
wt = Table(wrows, colWidths=[34.8 * mm] * 5)
wt.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("TOPPADDING", (0, 0), (-1, -1), 4),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4), ("LEFTPADDING", (0, 0), (-1, -1), 8)]))
s += [wt, Spacer(1, 6), box(R(text2, "txt"), HELLGRUEN), Spacer(1, 6)]
s += [table([["Lücke"] + [str(i) for i in range(1, 11)], ["Wort"] + [""] * 10], [22] + [15.2] * 10, head=True)]

# ── Übung 4: Transfer ──
s += [Spacer(1, 8)]
s += task(4, "Transfer: Ihre eigene E-Mail", "Sie möchten an einer Fortbildung teilnehmen. Schreiben Sie an die Kursleitung "
          "(ca. 60–80 Wörter). Benutzen Sie mindestens fünf dieser Bausteine:", 3)
s += [box(R(f"{K('sich interessieren für')} · {K('teilnehmen an')} · {K('zuständig für')} · {K('falls')} · {K('trotzdem')} · "
            f"{K('Würden Sie …?')} · {K('ob')} · {K('… wird ausgestellt')} · {K('sich freuen auf')}", "cell"), SOFT),
      Spacer(1, 2), lines(9, indent=0)]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1 · Feste Präpositionen", "solh"),
      R(f"1. {K('um')} (sich bewerben um)  ·  2. {K('auf')} (Antwort auf)  ·  3. {K('für')} (zuständig für)  ·  "
        f"4. {K('an')} (teilnehmen an + Dat.)  ·  5. {K('von')} (abhängen von)  ·  6. {K('an')} (Interesse an + Dat.)  ·  "
        f"7. {K('über')} (sich beschweren über)  ·  8. {K('mit')} (ausgestattet mit)", "sol")]
l2 = [
    ("1 – c", "in", "eine Anzeige <i>in</i> der Zeitschrift lesen (wo? " + ARROW + " in + Dativ)."),
    ("2 – a", "für", "sich interessieren <i>für</i> + Akkusativ."),
    ("3 – b", "dem", "das Autohaus " + ARROW + " in + Dativ (wo?) " + ARROW + " in <i>dem</i>."),
    ("4 – c", "trotzdem", "Verb auf Position 2 („fehlen mir“) und Gegensatz. <i>obwohl</i> braucht das Verb am Ende, <i>deshalb</i> ist kein Gegensatz."),
    ("5 – b", "ob", "indirekte Ja/Nein-Frage: Kann man den Kurs online besuchen? " + ARROW + " <i>ob</i>."),
    ("6 – a", "ausgestellt", "Passiv: werden + Partizip II („ausgestellt wird“)."),
    ("7 – c", "falls", "Bedingung (= wenn), Verb am Ende. <i>damit</i> = Ziel, passt nicht."),
    ("8 – a", "Würden", "höfliche Bitte im Konjunktiv II: Würden Sie mir bitte … mitteilen?"),
    ("9 – b", "weil", "Das Verb steht am Ende („planen muss“). <i>denn</i> und <i>deshalb</i> brauchen eine andere Wortstellung."),
    ("10 – c", "auf", "sich freuen <i>auf</i> etwas, das noch kommt. <i>über</i> = etwas ist schon da."),
]
s += [R("Übung 2 · Sprachbausteine Teil 1", "solh")] + [R(f"<b>{a} {K(w)}</b>  {b}", "sol") for a, w, b in l2]
l3 = [
    ("1 – f", "Gelegenheit", "„jede“ + Singular; <i>Gelegenheiten</i> (g) ist Plural."),
    ("2 – e", "findet", "etwas <i>findet</i> statt (trennbares Verb stattfinden)."),
    ("3 – n", "verbinden", "Arbeit, Familie und Lernen miteinander <i>verbinden</i>."),
    ("4 – o", "weil", "Verb am Ende („fehlt“). <i>denn</i> (c) braucht das Verb auf Position 2."),
    ("5 – i", "raten", "jemandem <i>raten</i>, etwas zu tun (+ zu-Infinitiv)."),
    ("6 – j", "regelmäßig", "Adverb: sich regelmäßig austauschen."),
    ("7 – k", "Rolle", "feste Verbindung: eine wichtige <i>Rolle</i> spielen. <i>Aufgabe</i> (a) passt nicht zu „spielen“."),
    ("8 – h", "interessiert", "sich <i>interessieren</i> für + Akkusativ."),
    ("9 – b", "denen", "von + Dativ Plural: die Angebote " + ARROW + " von <i>denen</i>. <i>die</i> (d) ist falsch."),
    ("10 – m", "verbessern", "seine Chancen <i>verbessern</i>."),
]
s += [R("Übung 3 · Sprachbausteine Teil 2 (übrig: a, c, d, g, l)", "solh")] + [R(f"<b>{a} {K(w)}</b>  {b}", "sol") for a, w, b in l3]
s += [R("Übung 4 – Beispiel", "solh"), box(R(
    "Sehr geehrter Herr Yildirim, ich interessiere mich für Ihre Fortbildung „Erste Hilfe im Betrieb“, weil ich in meiner Abteilung "
    "für die Sicherheit zuständig bin. Ich arbeite im Schichtdienst, trotzdem möchte ich gern an dem Kurs teilnehmen. "
    "Würden Sie mir bitte mitteilen, ob am Ende eine Bescheinigung ausgestellt wird? Falls noch Plätze frei sind, melde ich mich "
    "sofort an. Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Amira Haddad", "cell"), HELLGRUEN, GRUEN)]
s += [Spacer(1, 6), box(R(
    "<b>Punkte zählen:</b> Teil 1 und Teil 2: je 1,5 Punkte pro Lücke, zusammen maximal 30 Punkte. "
    "Schreiben Sie jeden Fehler mit dem richtigen Wort in Ihr Heft – am besten als ganzen Satz mit Präposition.",
    "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
