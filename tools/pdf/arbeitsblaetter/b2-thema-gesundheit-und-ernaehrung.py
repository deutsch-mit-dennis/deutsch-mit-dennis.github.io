# Arbeitsblatt telc Deutsch B2 (allgemein): Thema „Gesundheit, Sport und Ernährung“
# Wortschatz, Leseverstehen (Stil Teil 2), Hörverstehen (Stil Teil 2), Mündlich Teil 2, Schriftlicher Ausdruck.
# Eigene Übungstexte im Stil der Prüfung, keine telc-Originale. Formate: tools/pdf/b2-formate-offiziell.md
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b2-thema-gesundheit-und-ernaehrung.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak  # noqa

SLUG = "b2-thema-gesundheit-und-ernaehrung"
TITLE = "telc B2 Themen: Gesundheit, Sport und Ernährung"
HEAD = "telc B2 Thema: Gesundheit, Sport und Ernährung"  # page header (max. 70 characters)
LEVEL = "B2"
KICK = "B2 · Thema · Arbeitsblatt · telc Deutsch B2"
H1 = "Gesundheit, Sport und Ernährung"
LEAD = ("Gesund essen, mehr Bewegung im Alltag, gute Vorsätze: Wortschatz, Lesen, Hören, Diskutieren und Schreiben "
        "zu einem typischen Alltagsthema der telc-B2-Prüfung.")

WORDS = [
    ("die Gesundheit", "die Gesundheit (nur Sg.)", "Genug Schlaf ist wichtig für die Gesundheit."),
    ("die Ernährung", "die Ernährung (nur Sg.)", "Eine ausgewogene Ernährung gibt Energie."),
    ("die Mahlzeit", "die Mahlzeit, -en", "Ich esse drei Mahlzeiten am Tag."),
    ("das Fertiggericht", "das Fertiggericht, -e", "Fertiggerichte enthalten oft viel Salz."),
    ("der Inhaltsstoff", "der Inhaltsstoff, -e", "Auf der Packung stehen alle Inhaltsstoffe."),
    ("die Bewegung", "die Bewegung (hier nur Sg.)", "Im Büro fehlt mir die Bewegung."),
    ("die Ausdauer", "die Ausdauer (nur Sg.)", "Schwimmen trainiert die Ausdauer."),
    ("der Muskel", "der Muskel, -n", "Nach dem Training tun mir die Muskeln weh."),
    ("die Verletzung", "die Verletzung, -en", "Wegen einer Verletzung kann sie nicht laufen."),
    ("der Stress", "der Stress (nur Sg.)", "Sport hilft mir gegen Stress."),
    ("das Übergewicht", "das Übergewicht (nur Sg.)", "Übergewicht kann die Gelenke belasten."),
    ("die Vorsorgeuntersuchung", "die Vorsorgeuntersuchung, -en", "Morgen habe ich einen Termin zur Vorsorgeuntersuchung."),
    ("die Krankenkasse", "die Krankenkasse, -n", "Ich habe bei meiner Krankenkasse angerufen."),
    ("das Rezept", "das Rezept, -e", "Für dieses Medikament braucht man ein Rezept."),
    ("die Nebenwirkung", "die Nebenwirkung, -en", "Das Medikament hat kaum Nebenwirkungen."),
    ("sich ernähren", "ernährt sich – ernährte sich – hat sich ernährt", "Seit einem Jahr ernährt er sich vegetarisch."),
    ("sich bewegen", "bewegt sich – bewegte sich – hat sich bewegt", "Im Homeoffice bewege ich mich zu wenig."),
    ("abnehmen", "nimmt ab – nahm ab – hat abgenommen", "Sie hat fünf Kilo abgenommen."),
    ("zunehmen", "nimmt zu – nahm zu – hat zugenommen", "Im Winter nehme ich oft etwas zu."),
    ("trainieren", "trainiert – trainierte – hat trainiert", "Ich trainiere zweimal pro Woche im Verein."),
    ("sich erholen", "erholt sich – erholte sich – hat sich erholt", "Im Urlaub habe ich mich gut erholt."),
    ("vorbeugen + Dat.", "beugt vor – beugte vor – hat vorgebeugt", "Bewegung kann Rückenschmerzen vorbeugen."),
    ("verschreiben", "verschreibt – verschrieb – hat verschrieben", "Die Ärztin hat mir Tabletten verschrieben."),
    ("sich (Dat.) etw. vornehmen", "nimmt sich vor – nahm sich vor – hat sich vorgenommen",
     "Ich habe mir vorgenommen, weniger Zucker zu essen."),
    ("in Form bleiben", "bleibt – blieb – ist geblieben", "Mit dem Rad zur Arbeit bleibe ich in Form."),
]
GAP_BOX = ["Vorsorgeuntersuchung", "abgenommen", "erholen", "Fertiggerichte", "verschrieben", "Mahlzeiten", "vorbeugen",
           "Nebenwirkungen"]
GAPS = [
    "Seit ich jeden Tag zu Fuß zur Arbeit gehe, habe ich drei Kilo ___.",
    "Nach einer anstrengenden Woche brauche ich das Wochenende, um mich zu ___.",
    "Der Arzt hat mir ein Medikament ___, das ich zweimal täglich nehmen soll.",
    "Lesen Sie den Beipackzettel – dort stehen alle möglichen ___.",
    "Mit regelmäßiger Bewegung kann man manchen Krankheiten ___.",
    "Wer abends wenig Zeit hat, kauft oft ___, statt selbst zu kochen.",
]
GAP_SOL = ["abgenommen", "erholen", "verschrieben", "Nebenwirkungen", "vorbeugen", "Fertiggerichte"]
GAP_REST = ["Vorsorgeuntersuchung", "Mahlzeiten"]

ART_TITLE = "Mehr Gemüse, weniger Frust?"
ART_SUB = "Eine Betriebskantine stellt ihren Speiseplan um – und erlebt, wie schwierig gesunde Ernährung im Alltag sein kann"
ART = [
    "Wer mittags in die Kantine der Druckerei Hellwig in Bergheide kommt, findet seit dem Sommer eine neue Tafel neben "
    "der Essensausgabe. Darauf steht nicht nur, was es gibt, sondern auch, wie viel Zucker, Salz und Fett in den Gerichten "
    "steckt. Grüne, gelbe und rote Punkte zeigen auf einen Blick, wie ausgewogen ein Essen ist. Montags und donnerstags "
    "wird außerdem nur vegetarisch gekocht.",
    "Die Idee kam vom Betriebsrat. Bei einer Umfrage unter den rund 300 Beschäftigten hatten sich viele ein gesünderes "
    "Angebot gewünscht. „Unsere Leute arbeiten im Schichtdienst, oft auch nachts“, erklärt Betriebsrätin Fatma Korkmaz. "
    "„Da ist eine gute Mahlzeit in der Pause besonders wichtig – für die Konzentration und für die Gesundheit.“",
    "Küchenchef Bernd Lehmann war zunächst skeptisch. „Ich koche seit 25 Jahren für Menschen, die körperlich arbeiten. "
    "Die wollen satt werden“, sagt er. Gemeinsam mit einer Ernährungsberaterin hat er die Rezepte trotzdem überarbeitet: "
    "weniger Sahne, mehr Hülsenfrüchte, Vollkornnudeln statt heller Nudeln. Die Portionen sind gleich groß geblieben, "
    "die Preise auch.",
    "Die ersten Wochen waren nicht einfach. An den vegetarischen Tagen gingen deutlich weniger Essen über den Tresen, "
    "einige Kollegen holten sich lieber eine Currywurst am Imbiss gegenüber. In der Kaffeeküche hing bald ein Zettel: "
    "„Wir sind doch keine Kaninchen!“ Lehmann nahm die Kritik ernst. Er fragte nach, welche Gerichte fehlten, und "
    "entwickelte vegetarische Varianten bekannter Klassiker – etwa eine Linsen-Bolognese, die inzwischen zu den "
    "beliebtesten Essen gehört.",
    "Mittlerweile hat sich die Lage beruhigt. Nach Angaben der Kantine essen an den vegetarischen Tagen fast wieder so "
    "viele Menschen mit wie früher. Der Lagerarbeiter Jonas Weber, 44, gibt zu, dass er anfangs dagegen war. „Aber ehrlich "
    "gesagt bin ich nach dem Mittagessen nicht mehr so müde. Das merke ich vor allem in der Spätschicht.“",
    "Die Ernährungswissenschaftlerin Prof. Adaeze Okafor sieht solche Projekte positiv, warnt aber vor zu hohen "
    "Erwartungen. „Die Kantine ist nur eine Mahlzeit am Tag“, sagt sie. Wichtig sei vor allem, die Menschen nicht zu "
    "bevormunden. „Wer sich gezwungen fühlt, isst abends dann umso ungesünder. Gute Angebote und klare Informationen "
    "wirken auf Dauer besser als Verbote.“",
]
MC = [
    ("Was ist in der Kantine neu?",
     ["Die Gerichte sind billiger geworden.", "Es gibt Informationen über die Inhaltsstoffe der Gerichte.",
      "Es wird jeden Tag vegetarisch gekocht."]),
    ("Warum hat der Betriebsrat das Projekt angestoßen?",
     ["Viele Beschäftigte wollten gesünder essen.", "Die Kantine hatte zu wenig Gäste.",
      "Die Nachtschichten sollten kürzer werden."]),
    ("Wie hat Küchenchef Lehmann die Rezepte verändert?",
     ["Er hat die Portionen kleiner gemacht.", "Er hat die Gerichte ganz allein neu entwickelt.",
      "Er verwendet mehr Hülsenfrüchte und Vollkorn."]),
    ("Wie reagierte Lehmann auf die Kritik?",
     ["Er hat die vegetarischen Tage wieder abgeschafft.", "Er hat bekannte Gerichte vegetarisch nachgekocht.",
      "Er hat den Zettel in der Kaffeeküche entfernt."]),
    ("Was meint Prof. Okafor?",
     ["Verbote sind der beste Weg zu gesünderer Ernährung.", "Das Essen in der Kantine hat keinen Einfluss auf die Gesundheit.",
      "Die Menschen sollten selbst entscheiden können, was sie essen."]),
]
MC_SOL = [
    ("b", "„wie viel Zucker, Salz und Fett in den Gerichten steckt“. Falsch: a) „die Preise auch“ (gleich geblieben). c) nur montags und donnerstags."),
    ("a", "„hatten sich viele ein gesünderes Angebot gewünscht“. Falsch: b) und c) stehen nicht im Text."),
    ("c", "„mehr Hülsenfrüchte, Vollkornnudeln“. Falsch: a) „Die Portionen sind gleich groß geblieben“. b) „Gemeinsam mit einer Ernährungsberaterin“."),
    ("b", "„vegetarische Varianten bekannter Klassiker – etwa eine Linsen-Bolognese“. Falsch: a) Die Tage gibt es weiter. c) steht nicht im Text."),
    ("c", "„die Menschen nicht zu bevormunden … besser als Verbote“. Falsch: a) Gegenteil. b) Sie sagt nur, die Kantine sei „nur eine Mahlzeit am Tag“."),
]

HOER_SIT = "Sie hören im Radio die Sendung „Gesund durch den Tag“. Der Moderator spricht mit einer Sportwissenschaftlerin."
HOER = [
    ("Moderator", "Willkommen bei „Gesund durch den Tag“. Viele Menschen nehmen sich im Januar vor, mehr Sport zu machen – "
                  "und im Februar ist der gute Vorsatz schon wieder vergessen. Darüber spreche ich mit der "
                  "Sportwissenschaftlerin Nadia Benali. Frau Benali, warum halten so wenige durch?"),
    ("Benali", "Oft ist das Ziel einfach zu groß. Wer jahrelang keinen Sport gemacht hat und dann plötzlich fünfmal pro "
               "Woche ins Fitnessstudio will, ist schnell frustriert – oder verletzt sich sogar. Besser sind kleine Schritte, "
               "die man wirklich in den Alltag einbauen kann."),
    ("Moderator", "Was heißt das konkret?"),
    ("Benali", "Zum Beispiel die Treppe statt den Aufzug nehmen, eine Haltestelle früher aussteigen oder beim Telefonieren "
               "herumgehen. Das klingt nach wenig, aber über den Tag summiert sich das. Wer dann noch zweimal pro Woche "
               "eine halbe Stunde zügig spazieren geht, tut schon viel für Herz und Kreislauf."),
    ("Moderator", "Braucht man dafür eine teure Ausrüstung?"),
    ("Benali", "Nein, überhaupt nicht. Am Anfang reichen bequeme Schuhe. Viel wichtiger ist es, sich feste Zeiten zu nehmen "
               "– am besten mit einer anderen Person. Wer mit der Nachbarin verabredet ist, sagt nicht so leicht ab."),
    ("Moderator", "Und wenn man Schmerzen hat, zum Beispiel im Rücken?"),
    ("Benali", "Dann sollte man vorher mit der Hausärztin oder dem Hausarzt sprechen. Grundsätzlich ist bei "
               "Rückenschmerzen aber die richtige Bewegung oft besser als Schonung."),
    ("Moderator", "Vielen Dank, Frau Benali."),
]
RF = [
    ("Viele Menschen geben ihre Sportpläne nach kurzer Zeit wieder auf.", True),
    ("Frau Benali rät Anfängern, möglichst oft ins Fitnessstudio zu gehen.", False),
    ("Auch kleine Bewegungen im Alltag sind laut Frau Benali sinnvoll.", True),
    ("Für den Anfang genügen bequeme Schuhe.", True),
    ("Feste Termine mit anderen Personen machen es leichter, dabeizubleiben.", True),
    ("Bei Rückenschmerzen sollte man sich laut Frau Benali grundsätzlich schonen.", False),
]
RF_WHY = [
    "„im Februar ist der gute Vorsatz schon wieder vergessen“.",
    "Fünfmal pro Woche ist zu viel: „Besser sind kleine Schritte“.",
    "„Das klingt nach wenig, aber über den Tag summiert sich das.“",
    "„Am Anfang reichen bequeme Schuhe.“",
    "„Wer mit der Nachbarin verabredet ist, sagt nicht so leicht ab.“",
    "„die richtige Bewegung oft besser als Schonung“ – vorher mit der Hausärztin / dem Hausarzt sprechen.",
]

DISK_TITLE = "Mehr Steuern auf Zucker?"
DISK = (
    "Limonade, Eistee, Energydrinks: Süße Getränke sind billig und überall zu haben. Einige Ärztinnen und Ärzte fordern "
    "deshalb eine Sonderabgabe auf stark gezuckerte Getränke. Ihr Argument: Wenn solche Getränke teurer würden, kauften "
    "die Menschen weniger davon, und die Hersteller hätten einen Grund, weniger Zucker zu verwenden. Mit dem Geld könnte "
    "man außerdem Sportangebote für Kinder finanzieren. Kritiker halten nichts davon. Eine solche Steuer treffe vor allem "
    "Familien mit wenig Geld, und jeder Erwachsene solle selbst entscheiden dürfen, was er trinkt. Statt höherer Preise "
    "brauche es bessere Aufklärung – in Schulen, in Arztpraxen und auf den Verpackungen."
)
PRO = ["weniger Zucker im Alltag", "Druck auf Hersteller", "Geld für Sportangebote für Kinder"]
CONTRA = ["trifft Familien mit wenig Geld", "Erwachsene entscheiden selbst", "besser: Aufklärung und klare Etiketten"]
DISK_Q = ["Was trinken Sie selbst im Alltag?", "Wer ist verantwortlich: Staat, Hersteller oder jede/r Einzelne?",
          "Wie ist das in Ihrem Herkunftsland?", "Welcher Kompromiss wäre möglich?"]

MAIL_SIT = ("Der Sportverein TSV Bergheide bietet einen neuen Abendkurs „Fit nach der Arbeit – Rückentraining für "
            "Berufstätige“ an. Sie haben die Anzeige im Internet gesehen. Schreiben Sie eine E-Mail an den Verein.")
MAIL_LP = ["Inhalte und Niveau des Kurses", "Uhrzeiten und Ort", "Kosten und Probestunde",
           "gesundheitliche Voraussetzungen (Sie hatten eine Knieverletzung)"]
MUSTER_LP = "Niveau, Uhrzeiten, Gesundheit"
MUSTER = [
    "<b>Betreff:</b> Frage zum Kurs „Fit nach der Arbeit“",
    "Sehr geehrte Damen und Herren,",
    "im Internet habe ich gelesen, dass Sie einen neuen Kurs zum Rückentraining für Berufstätige anbieten. Da ich den "
    "ganzen Tag am Schreibtisch sitze und oft Rückenschmerzen habe, interessiere ich mich sehr dafür.",
    "Zuerst möchte ich fragen, für welches Niveau der Kurs gedacht ist. Ich habe seit einigen Jahren keinen Sport mehr "
    "gemacht und bin deshalb nicht besonders fit. Ist der Kurs auch für Anfängerinnen geeignet?",
    "Außerdem würde ich gern wissen, wann und wo der Kurs stattfindet. Ich arbeite bis 17.30 Uhr und könnte daher "
    "frühestens um 18.30 Uhr in der Halle sein.",
    "Zum Schluss habe ich noch eine Frage zu meiner Gesundheit: Vor einem Jahr hatte ich eine Knieverletzung. Inzwischen "
    "geht es mir wieder gut, aber ich möchte das Knie nicht überlasten. Kann die Kursleitung darauf Rücksicht nehmen, oder "
    "sollte ich vorher mit meiner Ärztin sprechen?",
    "Vielen Dank im Voraus, ich freue mich auf Ihre Antwort.",
    "Mit freundlichen Grüßen<br/>Olena Bondar",
]

# ── Render (same layout for all B2 theme sheets) ──
BOX = sym("☐")
BL = '<font color="#8A93A8">______</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.4)
st["art"] = ParagraphStyle("art", parent=st["cell"], fontSize=9.9, leading=13)
st["wd"] = ParagraphStyle("wd", parent=st["cell"], fontSize=9.1, leading=11)
st["q"] = ParagraphStyle("q", parent=st["item"], fontSize=10.3, leading=13, spaceAfter=0.5, spaceBefore=2.5)
st["opt"] = ParagraphStyle("opt", parent=st["item"], fontSize=10, leading=12.3, spaceAfter=0.3)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.4, leading=11.8, spaceAfter=1)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
st["dlg"] = ParagraphStyle("dlg", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=2)
st["mu"] = ParagraphStyle("mu", parent=st["cell"], fontSize=9.4, leading=12, spaceAfter=3)


def tbl(rows, widths, style_extra=()):
    t = Table(rows, colWidths=[w * mm for w in widths])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5)] + list(style_extra)))
    return t


REDEMITTEL = [
    ("Inhalt wiedergeben", "In dem Text geht es um … · Der Text beschreibt zwei Positionen: … · "
                           "Befürworter meinen, dass … Kritiker halten dagegen, dass …"),
    ("Meinung äußern", "Meiner Meinung nach … · Ich bin der Ansicht, dass … · Aus eigener Erfahrung kann ich sagen, dass …"),
    ("zustimmen", "Da haben Sie / hast du völlig recht. · Das sehe ich genauso, denn … · Das ist ein wichtiger Punkt."),
    ("widersprechen", "Da bin ich anderer Meinung. · Das stimmt zwar, aber … · Ich sehe das etwas anders: …"),
    ("nachfragen", "Wie meinen Sie / meinst du das genau? · Können Sie / Kannst du ein Beispiel nennen?"),
    ("Vorschlag, Kompromiss", "Wie wäre es, wenn …? · Man könnte doch … · Wir sind uns also einig, dass …"),
]

s = [R(KICK, "kick"), R(H1, "h1"), R(LEAD, "lead")]
s += [box(R(
    "<b>Was Sie hier üben:</b> Themen-Wortschatz · Leseverstehen im Stil von Teil 2 (Multiple Choice) · Hörverstehen im Stil "
    "von Teil 2 (Interview, richtig/falsch) · Mündlich Teil 2 (Diskussion über einen Zeitungstext) · Schriftlicher Ausdruck "
    "(halbformelle E-Mail mit Leitpunkten). Alle Texte sind eigene Übungstexte; Namen und Orte sind erfunden, "
    "Zahlen sind Beispielzahlen und keine echte Statistik.", "cell"), SOFT, TINTE), Spacer(1, 2)]

# Übung 1: vocabulary
s += task(1, "Themen-Wortschatz", "Lesen Sie die Wörter und Beispiele. Markieren Sie fünf Wörter, die für Sie neu sind, "
          "und schreiben Sie mit jedem einen eigenen Satz.", 1)
wrows = [[R("<b>Wort / Wendung</b>", "wd"), R("<b>Plural / Präteritum – Perfekt</b>", "wd"), R("<b>Beispiel</b>", "wd")]]
def _forms(w, f):
    if f.startswith(w + ", "): return "Pl. " + f[len(w) + 2:]
    if f.startswith(w + " ("): return f[len(w) + 2:-1]
    parts = f.split(" – ")
    return " – ".join(parts[1:]) if len(parts) == 3 else f
wrows += [[R(f"<b>{w}</b>", "wd"), R(_forms(w, f), "wd"), R(f"<i>{b}</i>", "wd")] for w, f, b in WORDS]
s += [tbl(wrows, [48, 44, 82], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]

# Übung 2: vocabulary in context
s += [KeepTogether(task(2, "Wortschatz anwenden", "Ergänzen Sie die Sätze mit Wörtern aus dem Kasten. Achten Sie auf die "
          "richtige Form. Zwei Wörter bleiben übrig.", 1)
      + [box(R(" · ".join(f"<b>{w}</b>" for w in GAP_BOX), "cell"), NOTE, GELB), Spacer(1, 2)]
      + [R(f"<b>{i}.</b> {t.replace('___', GAP)}", "item") for i, t in enumerate(GAPS, 1)])]

# Übung 3: reading (telc Leseverstehen Teil 2 style)
s += [Spacer(1, 4)]
s += task(3, "Leseverstehen: Detailverstehen", "Lesen Sie den Zeitungsartikel und lösen Sie die Aufgaben 1–5. Welche Lösung "
          "(a, b oder c) ist richtig? Kreuzen Sie an. (Stil: telc B2, Leseverstehen Teil 2)", 2)
arows = [[[R(f"<b>{ART_TITLE}</b>", "h3"), R(f"<i>{ART_SUB}</i>", "small")]]] + [[R(p, "art")] for p in ART]
s += [tbl(arows, [174], [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                         ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 1)]
for i, (q, opts) in enumerate(MC, 1):
    s += [KeepTogether([R(f"<b>{i}. {q}</b>", "q")] + [R(f"{BOX} {chr(97 + j)}) {o}", "opt") for j, o in enumerate(opts)])]

# Übung 4: listening (telc Hörverstehen Teil 2 style)
u4 = task(4, "Hörverstehen: Radio-Interview", "Sie hören ein Interview <b>einmal</b>. Lesen Sie vorher 60 Sekunden lang die "
          "Aussagen 1–6. Sind sie richtig oder falsch? (Stil: telc B2, Hörverstehen Teil 2)", 2)
u4 += [box(R("<b>Ohne Audio üben:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest den Text „Hörtext zum Vorlesen“ "
             "(nach Übung 6) in normalem Tempo vor. Wer übt, schaut <b>nicht</b> in den Text.", "cell"), NOTE, GELB),
       Spacer(1, 3), R(f"<i>{HOER_SIT}</i>", "small")]
rf = [[R(f"<b>{i}</b>", "txt"), R(t, "txt"), R(f"{BOX} richtig   {BOX} falsch", "txt")] for i, (t, _) in enumerate(RF, 1)]
u4 += [tbl(rf, [8, 128, 38], [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [KeepTogether(u4)]

# Übung 5: speaking part 2
s += task(5, "Mündlich Teil 2: Diskussion", "Bereiten Sie sich vor (in der Prüfung: 20 Minuten für Teil 2 und 3). Geben Sie "
          "den Text zuerst kurz wieder (höchstens 1 Minute). Diskutieren Sie dann ca. 5 Minuten mit Ihrer Partnerin / "
          "Ihrem Partner: Sagen Sie Ihre Meinung, begründen Sie sie und reagieren Sie auf die Argumente.", 3)
s += [tbl([[[R(f"<b>{DISK_TITLE}</b>", "h3"), R(DISK, "art")]]], [174],
          [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
           ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 3)]
s += [KeepTogether([R("Ideen für die Diskussion", "h3"), tbl([[R("<b>Pro</b>", "wd"), R("<b>Contra</b>", "wd")],
           [R("<br/>".join(f"+ {x}" for x in PRO), "wd"), R("<br/>".join(f"– {x}" for x in CONTRA), "wd")]],
          [87, 87], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                     ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE)])])]
s += [R("Redemittel", "h3")]
s += [tbl([[R(f"<b>{a}</b>", "wd"), R(b, "wd")] for a, b in REDEMITTEL], [38, 136],
          [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [R("<b>Fragen für die Diskussion:</b> " + " · ".join(DISK_Q), "small")]

# Übung 6: writing
u6 = task(6, "Schriftlicher Ausdruck: halbformelle E-Mail", "Schreiben Sie eine E-Mail (mindestens 150 Wörter, 30 Minuten). "
          "Behandeln Sie <b>drei</b> der vier Leitpunkte – oder <b>zwei</b> Leitpunkte und einen eigenen Aspekt. Denken Sie an "
          "Betreff, Anrede, Einleitung, Schluss und Gruß. In der Prüfung wählen Sie zwischen zwei Aufgaben.", 3)
u6 += [box([R(MAIL_SIT, "cell"), Spacer(1, 3)] + [R(f"{sym('▸')} {lp}", "cell") for lp in MAIL_LP], NOTE, GELB),
       Spacer(1, 3),
       R("<b>Tipp:</b> Jeder Leitpunkt bekommt einen eigenen Absatz mit 2–3 Sätzen: Frage oder Anliegen + eigene Situation + "
         "Grund. Siezen Sie die Person durchgehend.", "small")]
s += [KeepTogether(u6)]

# listening text to read aloud
s += [CondPageBreak(70 * mm), Spacer(1, 6), R("Hörtext zum Vorlesen (Partner/Lehrkraft)", "h2"),
      R("Bitte erst nach Übung 4 lesen. Lesen Sie in normalem Tempo und nur einmal vor.", "small")]
s += [R(f"<b>{sp}:</b> {t}", "dlg") for sp, t in HOER]

# solutions
s += [Spacer(1, 4), KeepTogether([
    R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
    R(f"Übung 2 · Wortschatz (übrig: {', '.join(GAP_REST)})", "solh"),
    R(" · ".join(f"<b>{i}</b> {w}" for i, w in enumerate(GAP_SOL, 1)), "sol")])]
s += [R("Übung 3 · Leseverstehen", "solh")] + [R(f"<b>{i} – {a}</b>  {b}", "sol") for i, (a, b) in enumerate(MC_SOL, 1)]
s += [R("Übung 4 · Hörverstehen", "solh")] + [
    R(f"<b>{i} – {'richtig' if ok else 'falsch'}</b>  {RF_WHY[i - 1]}", "sol") for i, (_, ok) in enumerate(RF, 1)]
s += [KeepTogether([R("Übung 6 · Mustertext (Leitpunkte: " + MUSTER_LP + ")", "solh"),
      box([R(p, "mu") for p in MUSTER], HELLGRUEN, GRUEN)]),
      R(f"<i>Ca. {sum(len(p.split()) for p in MUSTER[1:])} Wörter ohne Betreff. Ihr Text darf anders aussehen – wichtig sind "
        "Leitpunkte, Absätze, passende Anrede und Schluss.</i>", "small")]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
