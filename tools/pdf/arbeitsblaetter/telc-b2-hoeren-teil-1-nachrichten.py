# Arbeitsblatt telc Deutsch B2: Hörverstehen Teil 1 – eine Nachrichtensendung verstehen (ohne Audio, Texte zum Vorlesen)
# Format laut tools/pdf/b2-formate-offiziell.md (telc Deutsch B2, Übungstest 1, 2019): Nachrichtensendung, 5 Aussagen
# richtig/falsch (41–45), 30 Sek. Lesezeit, einmal hören, 5 × 5 = 25 Punkte. Eigene, erfundene Meldungen.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-hoeren-teil-1-nachrichten.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b2-hoeren-teil-1-nachrichten"
TITLE = "telc B2 Hörverstehen Teil 1: eine Nachrichtensendung verstehen"
HEAD = "telc B2 Hörverstehen Teil 1: Nachrichtensendung"  # page header (max. 70 characters)
LEVEL = "B2"
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
BOX = sym("☐")
st["spk"] = ParagraphStyle("spk", parent=st["cell"], fontSize=10, leading=13.4, leftIndent=12, firstLineIndent=-12, spaceAfter=3)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)


def rf_table(items, start=41):
    rows = [[R("<b>Nr.</b>", "cell"), R("<b>Aussage</b>", "cell"), R("<b>richtig</b>", "cell"), R("<b>falsch</b>", "cell")]]
    rows += [[R(f"<b>{i}</b>", "cell"), R(t, "cell"), _R(BOX, "cell"), _R(BOX, "cell")] for i, t in enumerate(items, start)]
    t = Table(rows, colWidths=[11 * mm, 131 * mm, 16 * mm, 16 * mm], repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ALIGN", (2, 0), (-1, -1), "CENTER"),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2 Hörverstehen Teil 1: eine Nachrichtensendung verstehen", "h1"),
    R("Nachrichtensprache verstehen und mit zwei kompletten Sendungen im Prüfungsformat üben. Alle Meldungen sind erfunden.", "lead"),
]

# ── So läuft der Teil ──
s += [
    box([
        R("<b>So läuft der Teil (laut Modelltest, telc 2019)</b>", "h3"),
        table(
            [
                ["<b>Was hören Sie?</b>", "Eine <b>Nachrichtensendung</b> aus dem Radio mit mehreren kurzen Meldungen."],
                ["<b>Aufgabe</b>", "<b>5 Aussagen</b> (Nr. 41–45): richtig oder falsch? Geprüft wird das <b>Globalverstehen</b> – "
                                   "die Hauptinformation einer Meldung, nicht jedes Detail."],
                ["<b>Lesezeit</b>", "<b>30 Sekunden</b> vor dem Hören, um die Aussagen zu lesen."],
                ["<b>Hören</b>", "Sie hören die Sendung <b>nur einmal</b>."],
                ["<b>Punkte</b>", "5 × 5 = <b>25 Punkte</b>. Das ganze Hörverstehen (Teil 1–3) dauert ca. 20 Minuten."],
            ],
            [30, 124],
            head=False,
        ),
    ], SOFT, None),
    Spacer(1, 5),
    box(R("<b>Ohne Audio üben – so geht's:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest eine Sendung aus dem "
          "Lösungsteil („Texte zum Vorlesen“) in normalem Nachrichtentempo vor. Vorher stoppt sie <b>30 Sekunden</b> Lesezeit. "
          "Wer übt, schaut nicht in den Text.", "cell"), HELLGRUEN, GRUEN),
]

# ── Nachrichtensprache ──
s += [
    R("So funktioniert Nachrichtensprache", "h2"),
    R("<b>1. Das Wichtigste steht vorn.</b> Der erste Satz einer Meldung sagt meist schon: <i>Wer? Was? Wo? Wann?</i> "
      "Danach kommen Details, Hintergründe und Reaktionen.", "item"),
    R("<b>2. Viele Nomen statt Verben.</b> „nach Angaben der Polizei“ = die Polizei sagt; „die Schließung des Werks“ = "
      "das Werk wird geschlossen. Übersetzen Sie im Kopf in einfache Sätze.", "item"),
    R("<b>3. Indirekte Rede (Konjunktiv I).</b> „Die Ministerin sagte, das Gesetz <i>werde</i> im Frühjahr kommen.“ – "
      "Das ist die Aussage einer Person, kein sicherer Fakt.", "item"),
    R("<b>4. Plan oder Tatsache?</b> Achten Sie auf <i>soll, will, plant, voraussichtlich, zunächst, bisher</i>. "
      "Ein Plan ist noch nicht passiert.", "item"),
    R("<b>5. Reaktionen am Schluss.</b> Verbände, Kritiker oder Fachleute kommentieren oft: „begrüßten, kritisierten aber …“. "
      "Hier liegen viele Fallen.", "item"),
    R("Typische Fallen", "h3"),
    table(
        [
            ["<b>Falle</b>", "<b>Beispiel</b>"],
            ["Gerücht vs. Tatsache", "„Es gab Gerüchte über eine Schließung.“ – Das Werk wird aber gar nicht geschlossen."],
            ["„aber“ dreht die Bewertung", "„Die Verbände begrüßten den Plan, kritisierten aber …“ – Sie sind grundsätzlich dafür."],
            ["Vermutung als Beweis", "„Ob das die Ursache ist, lässt sich noch nicht sagen.“ – Also nicht „bewiesen“."],
            ["Wer ist betroffen?", "Busse fallen aus – „die Regionalzüge sind nicht betroffen“."],
            ["verschoben, nicht abgesagt", "Ein Termin wird verlegt, die Veranstaltung findet trotzdem statt."],
        ],
        [44, 130],
    ),
]

# ── Übung 1 ──
u1 = [
    ("nach Angaben der Polizei", "a) Man hat sich nicht geeinigt."),
    ("Die Verhandlungen wurden ohne Ergebnis abgebrochen.", "b) Viele finden den Vorschlag nicht gut."),
    ("Der Vorschlag stieß auf Kritik.", "c) Das ist noch nicht beschlossen, nur angekündigt."),
    ("Die Ministerin kündigte an, das Gesetz solle im Frühjahr kommen.", "d) Die Polizei sagt das."),
    ("Die Zahl der Anträge ist um ein Drittel gestiegen.", "e) Busse und Bahnen fahren nicht ganz normal."),
    ("Im Nahverkehr kommt es zu Einschränkungen.", "f) Es gibt deutlich mehr Anträge als vorher."),
]
s += [PageBreak()]
s += task(1, "Nachrichtensprache entschlüsseln", "Was bedeutet das in einfachen Worten? Ordnen Sie zu: Schreiben Sie den "
          "passenden Buchstaben a–f auf die Linie.", 1)
s += [table([["<b>Nachrichtensprache</b>", "", "<b>einfach gesagt</b>"]] +
            [[f"{i}. {a}", f'<font color="#8A93A8">____</font>', b] for i, (a, b) in enumerate(u1, 1)], [80, 14, 80])]

# ── Übung 2 und 3 ──
tA = [
    "Die Pflegeverbände lehnen den Plan der Landesregierung ab.",
    "Wegen eines Streiks fahren morgen auch keine Regionalzüge.",
    "Bei Velomax in Neustadt sollen neue Arbeitsplätze entstehen.",
    "Laut der Studie ist bewiesen, dass Handys den Schlaf von Jugendlichen verschlechtern.",
    "Die Stadtbibliothek ist ab Januar probeweise auch sonntags geöffnet.",
]
tB = [
    "Der Windpark „Nordlicht“ ist früher fertig geworden als geplant.",
    "Nach dem Unwetter bleibt eine Straße noch einige Zeit gesperrt.",
    "Das neue Programm der Handwerkskammer richtet sich an Schülerinnen und Schüler.",
    "Auszubildende zahlen ab März weniger für ihre Monatskarte.",
    "Das Festival „Klangbrücke“ fällt in diesem Jahr aus.",
]
hint = ("Sie hören eine Nachrichtensendung. Sie hören die Sendung <b>einmal</b>. Entscheiden Sie bei den Aussagen 41–45, ob sie "
        "richtig oder falsch sind. Sie haben jetzt <b>30 Sekunden</b> Zeit, die Aussagen zu lesen.")
s += [Spacer(1, 4)]
s += task(2, "Übungssatz A: Nachrichten am Mittag", hint, 2)
s += [rf_table(tA), Spacer(1, 4)]
s += task(3, "Übungssatz B: Nachrichten am Abend", hint, 2)
s += [rf_table(tB), Spacer(1, 6)]
s += [box(R(f"<b>Nach dem Hören – kurz reflektieren:</b>&nbsp; {BOX}&nbsp;Habe ich in den 30 Sekunden Schlüsselwörter markiert?&nbsp;&nbsp; "
            f"{BOX}&nbsp;Habe ich sofort nach jeder Meldung angekreuzt?&nbsp;&nbsp; {BOX}&nbsp;Welche Falle hat mich erwischt "
            "(Plan, Gerücht, „aber“, wer ist betroffen)?", "cell"), NOTE, GELB)]


# ── Texte zum Vorlesen ──
def say(who, text):
    return R(f"<b>{who}:</b>  {text}", "spk")


s += [PageBreak(), R("Lösungsteil: Texte zum Vorlesen", "h2"),
      R("Wie eine Nachrichtensprecherin lesen: deutlich, sachlich, normales Tempo. Vorher 30 Sekunden Lesezeit geben. Jede Sendung "
        "nur einmal lesen, zwischen den Meldungen eine kurze Pause (2–3 Sekunden). Alle Meldungen, Orte, Firmen und Personen sind erfunden.",
        "small")]

sA = [
    ("Sprecher", "Radio Kompass, Sie hören Nachrichten. Es ist zwölf Uhr."),
    ("Meldung 1", "Die Landesregierung will mehr Pflegekräfte ausbilden. Wie Gesundheitsministerin Miriam Okafor heute mitteilte, "
     "sollen bis zum Jahr 2028 rund 3000 zusätzliche Ausbildungsplätze in der Pflege entstehen. Dafür stellt das Land in den "
     "kommenden drei Jahren insgesamt 120 Millionen Euro bereit. Ein Teil des Geldes ist für Sprachkurse gedacht: Auszubildende, "
     "die Deutsch als Zweitsprache sprechen, sollen während der Ausbildung kostenlos Fachsprachkurse besuchen können. Die "
     "Pflegeverbände begrüßten den Plan, kritisierten aber, er komme mehrere Jahre zu spät."),
    ("Meldung 2", "Pendlerinnen und Pendler müssen sich morgen auf Einschränkungen einstellen. Die Gewerkschaft hat die "
     "Beschäftigten der städtischen Verkehrsbetriebe in mehreren Städten des Landes zu einem ganztägigen Warnstreik aufgerufen. "
     "Busse und Straßenbahnen bleiben von drei Uhr morgens bis Mitternacht in den Depots. Die Regionalzüge sind nicht betroffen "
     "und fahren nach Plan. Hintergrund sind die festgefahrenen Tarifverhandlungen. Die Gewerkschaft fordert mehr Lohn und kürzere "
     "Schichten; das Angebot der Arbeitgeber hält sie für zu niedrig."),
    ("Meldung 3", "Gute Nachrichten für die rund 800 Beschäftigten des Fahrradherstellers Velomax: Das Werk in Neustadt bleibt "
     "erhalten. In den vergangenen Wochen hatte es Gerüchte über eine Schließung gegeben. Die Geschäftsführung erklärte nun, man "
     "wolle in Neustadt im Gegenteil künftig auch Lastenräder mit Elektromotor bauen. Dafür sollen im kommenden Jahr etwa 150 neue "
     "Stellen entstehen."),
    ("Meldung 4", "Jugendliche, die abends lange am Handy sind, schlafen im Durchschnitt fast eine Stunde weniger als Gleichaltrige. "
     "Das ist das Ergebnis einer Befragung der Universität Lindenau unter 2000 Schülerinnen und Schülern. Studienleiterin Hanna "
     "Lindqvist betonte jedoch, ob das Handy tatsächlich die Ursache sei, lasse sich daraus noch nicht ableiten. Möglicherweise "
     "griffen Jugendliche, die ohnehin schlecht schliefen, einfach häufiger zum Handy. Eine zweite Studie soll das nun klären."),
    ("Meldung 5", "Die Stadtbibliothek Lindenau öffnet ab Januar auch sonntags. Von 11 bis 17 Uhr können Besucherinnen und Besucher "
     "dann lesen, lernen und Medien ausleihen. Eine Beratung gibt es an diesen Tagen allerdings nicht; Ausleihe und Rückgabe laufen "
     "über Automaten. Das Angebot ist zunächst als Test für ein Jahr geplant."),
    ("Wetter", "Und das Wetter: Morgen zunächst bewölkt, ab Mittag Regen. Höchstwerte 9 bis 12 Grad."),
]
sB = [
    ("Sprecherin", "Radio Kompass mit den Nachrichten um 17 Uhr."),
    ("Meldung 1", "Vor der Nordseeküste ist heute ein neuer Windpark in Betrieb gegangen. Die 60 Anlagen des Parks „Nordlicht“ sollen "
     "rechnerisch rund 400.000 Haushalte mit Strom versorgen. Eigentlich sollte der Park schon vor zwei Jahren fertig sein; "
     "Lieferprobleme bei wichtigen Bauteilen hatten den Bau jedoch verzögert. Umweltverbände lobten das Projekt. Sie forderten "
     "aber, auch an Land neue Windräder schneller zu genehmigen."),
    ("Meldung 2", "Heftige Gewitter haben in der vergangenen Nacht im Süden des Landes für zahlreiche Einsätze gesorgt. Die Feuerwehr "
     "musste mehr als 300-mal ausrücken, vor allem wegen vollgelaufener Keller und umgestürzter Bäume. Verletzt wurde nach Angaben "
     "der Polizei niemand. Die Bundesstraße zwischen Altheim und Steinbach bleibt wegen Aufräumarbeiten voraussichtlich bis "
     "Sonntagabend gesperrt."),
    ("Meldung 3", "Im Handwerk bleiben viele Ausbildungsplätze unbesetzt. Nach Angaben der Handwerkskammer fehlen allein in den "
     "Bereichen Elektro und Sanitär mehr als 900 Auszubildende. Die Kammer startet deshalb ein neues Programm: Erwachsene "
     "Zugewanderte können eine Ausbildung beginnen und lernen parallel im Betrieb Deutsch. Voraussetzung sind Deutschkenntnisse "
     "auf dem Niveau A2. Bewerbungen sind ab sofort möglich."),
    ("Meldung 4", "Gute Nachricht für Auszubildende: Der Verkehrsverbund Mitte senkt ab dem 1. März den Preis für das "
     "Azubi-Monatsticket von 62 auf 39 Euro. Die Differenz übernehmen das Land und die beteiligten Städte. Für Studierende ändert "
     "sich nichts; für sie gilt weiterhin das Semesterticket."),
    ("Meldung 5", "Das Weltmusikfestival „Klangbrücke“ im Stadtpark findet in diesem Sommer nicht wie geplant im Juni statt. Wegen "
     "Bauarbeiten im Park verschieben die Veranstalter es auf das erste Septemberwochenende. Bereits gekaufte Karten bleiben gültig. "
     "Wer am neuen Termin keine Zeit hat, bekommt sein Geld zurück."),
    ("Wetter", "Zum Wetter: Am Wochenende viel Sonne, nur im Bergland einzelne Schauer. Bis 24 Grad."),
]
s += [R("Übungssatz A – Nachrichten am Mittag", "h3")] + [say(a, b) for a, b in sA]
s += [R("Übungssatz B – Nachrichten am Abend", "h3")] + [say(a, b) for a, b in sB]

# ── Lösungen ──
s += [Spacer(1, 4), R("Lösungen", "h2"),
      R("Erst nach dem Hören nachschauen! Die Begründung zeigt die entscheidende Stelle in der Meldung. Je richtige Antwort 5 Punkte, "
        "pro Übungssatz maximal 25.", "small")]
s += [R("Übung 1 · Nachrichtensprache", "solh"), R("1 d · 2 a · 3 b · 4 c · 5 f · 6 e", "sol")]
lA = [
    ("41 – falsch", "Die Verbände „begrüßten den Plan“; sie kritisieren nur, dass er „zu spät“ kommt."),
    ("42 – falsch", "Nur Busse und Straßenbahnen: „Die Regionalzüge sind nicht betroffen.“"),
    ("43 – richtig", "„Dafür sollen im kommenden Jahr etwa 150 neue Stellen entstehen.“ Die Schließung war nur ein Gerücht."),
    ("44 – falsch", "„ob das Handy tatsächlich die Ursache sei, lasse sich daraus noch nicht ableiten“."),
    ("45 – richtig", "„öffnet ab Januar auch sonntags … zunächst als Test für ein Jahr“."),
]
lB = [
    ("41 – falsch", "Er sollte „schon vor zwei Jahren fertig sein“ – der Bau hat sich verzögert, er ist also später fertig."),
    ("42 – richtig", "„Die Bundesstraße … bleibt … voraussichtlich bis Sonntagabend gesperrt.“"),
    ("43 – falsch", "Das Programm ist für „erwachsene Zugewanderte“."),
    ("44 – richtig", "Das Azubi-Monatsticket kostet „ab dem 1. März“ 39 statt 62 Euro."),
    ("45 – falsch", "Es wird nur verschoben – „auf das erste Septemberwochenende“."),
]
s += [R("Übung 2 · Übungssatz A", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in lA]
s += [R("Übung 3 · Übungssatz B", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in lB]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
