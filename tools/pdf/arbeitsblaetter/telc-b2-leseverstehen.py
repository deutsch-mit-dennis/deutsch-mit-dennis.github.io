# Arbeitsblatt B2 Prüfung: telc Deutsch B2 – Leseverstehen Teil 1–3
# Eigene Übungsaufgaben im Stil der Prüfung, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-leseverstehen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b2-leseverstehen"
TITLE = "telc B2 Leseverstehen: Überschriften, Detailverstehen, Anzeigen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
BOX = sym("☐")
BL = '<font color="#8A93A8">______</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.4)
st["ad"] = ParagraphStyle("ad", parent=st["cell"], fontSize=9.3, leading=11.6)
st["art"] = ParagraphStyle("art", parent=st["cell"], fontSize=9.7, leading=12.6)
st["q"] = ParagraphStyle("q", parent=st["item"], fontSize=10.3, leading=13, spaceAfter=0.5, spaceBefore=2.5)
st["opt"] = ParagraphStyle("opt", parent=st["item"], fontSize=10, leading=12.3, spaceAfter=0.3)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2: Leseverstehen", "h1"),
    R(
        "Überschriften zuordnen, einen Zeitungsartikel genau verstehen, Anzeigen auswählen – so trainieren Sie die drei "
        "Teile des Leseverstehens. Alle Texte sind eigene Übungstexte im Stil der Prüfung.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            ["<b>Lesen 1</b>", "5 kurze Texte, 10 Überschriften (a–j). Welche Überschrift passt? 5 Überschriften bleiben übrig.",
             "ca. 15 Min.", fallback("5 × 5 = 25")],
            ["<b>Lesen 2</b>", "Längere Zeitungs- oder Magazintexte (im Modelltest: zwei Artikel), 5 Aufgaben mit je drei Lösungen (a, b, c). (Übung: ein Text.)",
             "ca. 20 Min.", fallback("5 × 5 = 25")],
            ["<b>Lesen 3</b>", "10 Situationen, 12 Anzeigen (a–l). Jede Anzeige nur einmal. Passt keine Anzeige: x.",
             "ca. 20 Min.", fallback("10 × 2,5 = 25")],
        ],
        [22, 104, 22, 26],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Leseverstehen und Sprachbausteine haben zusammen <b>90 Minuten</b>. Die Zeiten oben sind Empfehlungen. "
            "Insgesamt gibt es im Leseverstehen 75 Punkte (laut offiziellem Modelltest, telc 2019). Bestanden ist der schriftliche Teil mit mindestens 60 % "
            "(135 von 225 Punkten).",
            "cell",
        ),
        NOTE,
        GELB,
    ),
]

# ── Strategien ──
s += [
    R("Vier Strategie-Tipps", "h2"),
    R(f"<b>1. Erst die Aufgaben, dann die Texte.</b> Lesen Sie zuerst Überschriften, Fragen oder Situationen und markieren Sie das Schlüsselwort.", "item"),
    R(f"<b>2. Hauptthema statt Detail (Teil 1).</b> Fassen Sie jeden Text in fünf Wörtern zusammen. Die richtige Überschrift sagt dasselbe mit anderen Wörtern.", "item"),
    R(f"<b>3. Belegstelle suchen (Teil 2).</b> Die Fragen folgen meist der Reihenfolge des Textes. Unterstreichen Sie die Stelle, die Ihre Lösung beweist. Keine Stelle? Dann ist die Lösung wahrscheinlich falsch.", "item"),
    R(f"<b>4. Alle Bedingungen prüfen (Teil 3).</b> Wer? Wann? Wo? Was genau? Eine Anzeige passt nur, wenn sie <i>alle</i> Bedingungen erfüllt. Wählen Sie x erst ganz am Ende.", "item"),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Achtung!</b>"],
            ["Lesen 1", "Ein Wort aus der Überschrift steht auch im Text – aber nur am Rande. · Zwei Überschriften passen zum Thema, "
                        "aber nur eine zur Zielgruppe. · Verneinungen übersehen („… sucht man vergeblich“)."],
            ["Lesen 2", "Die Lösung benutzt Wörter aus dem Text, sagt aber etwas anderes. · Aussagen von verschiedenen Personen "
                        "verwechseln. · Mit Allgemeinwissen antworten – nur der Text zählt."],
            ["Lesen 3", "Zwei Anzeigen zum selben Thema, aber nur eine passt im Detail (online oder vor Ort, vormittags oder abends). "
                        "· Eine kleine Einschränkung am Ende der Anzeige. · Eine Anzeige zweimal wählen."],
        ],
        [22, 152],
    ),
]

# ── Übung 1: Lesen Teil 1 ──
heads = [
    "a) Mehr Geld verlangen – aber wie?",
    "b) Die besten Apps für mehr Tempo im Büro",
    "c) Vom Kollegen zur Vorgesetzten: der Start in die Führungsrolle",
    "d) Können sichtbar machen – auch ohne passende Papiere",
    "e) Studieren neben dem Beruf: So klappt es",
    "f) Das erste Vorstellungsgespräch: die häufigsten Fragen",
    "g) Ärger mit der Chefin? So wehren Sie sich richtig",
    "h) Feierabend heißt Feierabend: abschalten trotz Smartphone",
    "i) Endlich an der Uni: Tipps für das erste Semester",
    "j) Ausländische Zeugnisse übersetzen lassen – Wege und Kosten",
]
texts1 = [
    "Gestern noch Teil des Teams, heute verantwortlich für Dienstpläne und Mitarbeitergespräche: Wer im eigenen Betrieb "
    "befördert wird, muss plötzlich die Menschen führen, mit denen er gestern noch in der Pause gescherzt hat. Die "
    "Personalberaterin Hanna Wróbel zeigt, wie man in den ersten hundert Tagen Vertrauen gewinnt, Grenzen setzt und auch "
    "unangenehme Entscheidungen klar erklärt. Viele Beispiele stammen aus Pflege, Handel und Handwerk.",
    "Arbeiten, lernen, Familie – und das alles in einer Woche? Daniel Asante hat neben seiner Vollzeitstelle als "
    "Elektroniker in fünf Jahren einen Bachelor in Ingenieurwesen gemacht. In seinem Buch erklärt er, wie man Abendkurse, "
    "Online-Vorlesungen und Prüfungen plant, wie man mit dem Arbeitgeber über freie Tage verhandelt und wie die Familie "
    "nicht zu kurz kommt. Wer direkt nach der Schule ein Vollzeitstudium beginnen möchte, findet hier allerdings wenig.",
    "Die meisten Beschäftigten bereiten sich auf ein Gespräch über ihr Gehalt kaum vor – und bekommen deshalb weniger, als "
    "möglich wäre. Die Trainerin Leyla Demir erklärt, wie man herausfindet, was die eigene Arbeit auf dem Markt wert ist, "
    "wann der richtige Moment für das Gespräch ist und mit welchen Sätzen man selbstbewusst, aber freundlich auftritt. "
    "Auch das Vorstellungsgespräch wird kurz behandelt, steht aber nicht im Mittelpunkt.",
    "Um 22 Uhr noch schnell eine E-Mail beantworten, am Sonntag die Chatgruppe des Teams lesen – für viele ist das normal "
    "geworden. Der Arbeitspsychologe Tomasz Nowak erklärt, warum ständige Erreichbarkeit müde und unzufrieden macht. Er "
    "zeigt, wie man mit dem Team klare Regeln vereinbart, wie man das Handy abends bewusst weglegt und warum gerade "
    "Führungskräfte hier ein Vorbild sein sollten. Technische Tipps zu bestimmten Programmen gibt es kaum.",
    "Sie haben zehn Jahre in einer Werkstatt gearbeitet, aber kein Zeugnis, das in Deutschland jemand kennt? Der Berater "
    "Samuel Okoye zeigt, wie man Fähigkeiten, die man im Beruf gelernt hat, im Lebenslauf genau beschreibt, wie man "
    "Arbeitsproben sammelt und in einem Probearbeitstag überzeugt. Wie man vorhandene Dokumente übersetzen lässt, "
    "erklärt er nur auf zwei Seiten am Ende des Buches.",
]
u1 = task(1, "Lesen Teil 1: Überschriften", "Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Buchbeschreibungen. "
          "Welche Überschrift (a–j) passt am besten zu welchem Text? Fünf Überschriften bleiben übrig.", 1)
hrows = [[R(heads[i], "cell"), R(heads[i + 5], "cell")] for i in range(5)]
ht = Table(hrows, colWidths=[87 * mm, 87 * mm])
ht.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
s += [PageBreak(), KeepTogether(u1 + [ht, Spacer(1, 4)])]
for i, t in enumerate(texts1, 1):
    s += [KeepTogether([R(f"<b>Text {i}</b>   Überschrift: {BL}", "h3"), R(t, "txt")])]

# ── Übung 2: Lesen Teil 2 ──
art = [
    "Als Kwame Mensah vor anderthalb Jahren bei der Firma Brenner Logistik in Hagenau anfing, verstand er in Besprechungen "
    "fast alles – und in der Lagerhalle fast nichts. „Im Deutschkurs hatte ich gelernt, wie man einen Brief an eine Behörde "
    "schreibt“, erzählt der 34-jährige Elektriker aus Ghana. „Aber niemand hatte mir gesagt, dass ein Hubwagen hier ‚Ameise‘ "
    "heißt.“ Sein Sprachzertifikat auf B2-Niveau hatte er da schon in der Tasche.",
    "Heute lacht er darüber. Geholfen hat ihm vor allem Jürgen Stoll, ein Lagerist, der seit fast dreißig Jahren im Betrieb "
    "arbeitet. Stoll ist einer von zwölf sogenannten Sprachpaten, die neue Kolleginnen und Kollegen in den ersten sechs Monaten "
    "begleiten. Einmal pro Woche treffen sich die beiden für eine halbe Stunde während der Arbeitszeit, gehen gemeinsam durch "
    "die Halle und sprechen über Wörter, Abläufe und ungeschriebene Regeln. „Ich bin kein Lehrer“, betont Stoll. „Ich erkläre "
    "nur, wie wir hier reden.“",
    "Die Idee stammt von Personalleiterin Sabine Hartwig. Brenner Logistik findet seit Jahren kaum noch Fachkräfte in der "
    "Region; inzwischen kommt jeder vierte Beschäftigte aus dem Ausland. „Wir haben gemerkt, dass gute Leute nach wenigen "
    "Monaten wieder gegangen sind“, sagt Hartwig. „Nicht wegen des Geldes, sondern weil sie sich im Team fremd gefühlt haben.“ "
    "Seit es die Sprachpaten gibt, sei diese Zahl deutlich gesunken. Genaue Zahlen will das Unternehmen allerdings erst nach "
    "dem dritten Jahr veröffentlichen.",
    "Für die Paten selbst ist die Aufgabe freiwillig. Sie bekommen dafür kein zusätzliches Geld, aber eine eintägige Schulung "
    "und zwei zusätzliche Urlaubstage im Jahr. Nicht alle im Betrieb waren von Anfang an überzeugt. Der Betriebsrat befürchtete, "
    "dass die Paten neben ihrer normalen Arbeit überlastet würden. Deshalb wurde vereinbart, dass niemand mehr als eine neue "
    "Kollegin oder einen neuen Kollegen gleichzeitig betreut.",
    "Die Sprachwissenschaftlerin Dr. Irina Kovač, die solche Projekte an der Hochschule Rheinberg untersucht, hält den Ansatz "
    "für sinnvoll – mit einer Einschränkung. „Kurse vermitteln eine wichtige Grundlage, aber die Sprache eines bestimmten "
    "Arbeitsplatzes lernt man nur dort“, sagt sie. Entscheidend sei jedoch, dass die Paten nicht nur korrigieren, sondern auch "
    "zuhören. „Wenn die Beziehung nur in eine Richtung läuft, fühlen sich neue Beschäftigte schnell wie Schüler.“ Gute Programme "
    "sorgten deshalb dafür, dass beide Seiten voneinander lernen.",
    "Bei Mensah und Stoll scheint das zu funktionieren. Seit dem Frühjahr erklärt Mensah seinem Paten, wie die neuen "
    "Ladestationen für die Elektrostapler funktionieren. Und Stoll? Der hat sich vorgenommen, endlich ein paar Wörter "
    "Englisch zu lernen.",
]
mc = [
    ("Welche Schwierigkeit hatte Kwame Mensah am Anfang?",
     ["Er hatte noch kein Sprachzertifikat.", "Er verstand die Sprache am Arbeitsplatz kaum.",
      "Er konnte keine Briefe an Behörden schreiben."]),
    ("Wie arbeiten die Sprachpaten?",
     ["Sie geben neuen Beschäftigten nach Feierabend Deutschunterricht.",
      "Sie begleiten neue Beschäftigte während der ersten zwölf Monate.",
      "Sie treffen sich regelmäßig während der Arbeitszeit mit neuen Kollegen."]),
    ("Warum hat das Unternehmen das Programm eingeführt?",
     ["Neue Fachkräfte haben die Firma oft schnell wieder verlassen.",
      "Beschäftigte aus dem Ausland wollten mehr Geld verdienen.",
      "Die Firma wollte Zahlen über ihre Fachkräfte veröffentlichen."]),
    ("Was erfährt man über die Paten?",
     ["Sie bekommen für ihre Aufgabe einen höheren Lohn.",
      "Sie betreuen auf Wunsch des Betriebsrats mehrere neue Kollegen.",
      "Sie erhalten als Ausgleich mehr freie Tage."]),
    ("Was sagt Dr. Kovač?",
     ["Deutschkurse sind für den Arbeitsplatz eigentlich überflüssig.",
      "Paten sollten neuen Beschäftigten auch zuhören und von ihnen lernen.",
      "Paten sollten sich vor allem auf das Korrigieren konzentrieren."]),
]
s += [PageBreak()]
s += task(2, "Lesen Teil 2: Detailverstehen", "Lesen Sie den Text und lösen Sie die Aufgaben 1–5. "
          "Welche Lösung (a, b oder c) ist richtig? Kreuzen Sie an.", 2)
arows = [[[R("<b>„Wie heißt das Ding da?“</b>", "h3"),
           R("<i>Ein Logistikunternehmen setzt auf Sprachpaten am Arbeitsplatz</i>", "small")]]] + [[R(p, "art")] for p in art]
atab = Table(arows, colWidths=[174 * mm])
atab.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                          ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 2),
                          ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
s += [atab]
s += [Spacer(1, 1)]
for i, (q, opts) in enumerate(mc, 1):
    s += [KeepTogether([R(f"<b>{i}. {q}</b>", "q")]
                       + [R(f"{BOX} {chr(97 + j)}) {o}", "opt") for j, o in enumerate(opts)])]

# ── Übung 3: Lesen Teil 3 ──
ads = [
    ("a) Sprachcafé „Wortwechsel“", "Deutsch sprechen in lockerer Runde: jeden Dienstag 18–19.30 Uhr in der Stadtbibliothek Nord. "
     "Ab Niveau A2, kostenlos, ohne Anmeldung – einfach vorbeikommen!"),
    ("b) Bewerbungswerkstatt im Stadtteilzentrum", "Wir prüfen Ihren Lebenslauf und üben mit Ihnen Vorstellungsgespräche. "
     "Einzeltermine nach Vereinbarung, auch samstags. Kostenlos. Tel. 0234 / 58 21 90"),
    ("c) Fachsprachkurs Pflege B2 – online", "Gespräche mit Patienten, Dokumentation, Übergabe. Live-Unterricht per Video, "
     "Mo und Mi 19–21 Uhr, 12 Wochen. Voraussetzung: B1-Zertifikat."),
    ("d) Fachsprachkurs Pflege B2 – Präsenzkurs", "In der Akademie am Klinikum, Mo–Fr 8.30–12.30 Uhr, drei Monate. "
     "Voraussetzung: B1-Zertifikat. Kleine Gruppen, erfahrene Lehrkräfte."),
    ("e) Lohnsteuerhilfe Mitte e. V.", "Wir machen Ihre Steuererklärung – für Arbeitnehmerinnen und Arbeitnehmer. "
     "Mitgliedsbeitrag nach Einkommen. Beratung auch auf Englisch und Türkisch."),
    ("f) Übersetzungsbüro Klartext", "Beglaubigte Übersetzungen von Zeugnissen und Urkunden aus dem Arabischen, Persischen und "
     "Russischen. Expressservice in drei Tagen gegen Aufpreis."),
    ("g) Coworking „Schreibtisch frei“", "Arbeitsplätze ab 12 € pro Tag, schnelles WLAN, Besprechungsraum. Mo–Fr 7–20 Uhr. "
     "Haustiere sind leider nicht erlaubt."),
    ("h) Familienbüro am Markt", "Arbeitsplätze für Eltern: Während Sie arbeiten, betreuen wir Ihr Kind (1–6 Jahre) im selben "
     "Haus. Mo–Fr 8–16 Uhr, Tagesticket 25 €. Aus Rücksicht auf die Kinder keine Tiere."),
    ("i) Feierabendläufer", "Wir laufen jeden Donnerstag um 18.30 Uhr am Stadtpark – 5 km in gemütlichem Tempo. "
     "Anfängerinnen und Anfänger herzlich willkommen. Kostenlos."),
    ("j) Fahrschule Tempo", "Führerschein Klasse B. Theorieunterricht auch auf Englisch und Arabisch. "
     "Intensivkurse in den Schulferien."),
    ("k) Möbelbörse Hand in Hand e. V.", "Gebrauchte Möbel zu kleinen Preisen: Schränke, Sofas, Tische. Lieferung nach Hause "
     "gegen Gebühr. Wir holen gut erhaltene Möbel auch kostenlos bei Ihnen ab."),
    ("l) Fundgrube Arbeitskleidung", "Arbeitshosen, Jacken und geprüfte Sicherheitsschuhe aus zweiter Hand – "
     "zu kleinen Preisen. Di–Sa 10–18 Uhr, Hafenstraße 4."),
]
sits = [
    "Ihre Kollegin aus der Pflege hat ein B1-Zertifikat und möchte ihre Fachsprache verbessern. Sie arbeitet im Frühdienst "
    "und kann nur abends lernen.",
    "Ein Bekannter hat in Syrien als Lehrer gearbeitet. Er braucht eine beglaubigte deutsche Übersetzung seines Abschlusszeugnisses.",
    "Ihr Nachbar möchte sein Vorstellungsgespräch nächste Woche vorher üben. Er arbeitet montags bis freitags bis 18 Uhr.",
    "Eine Freundin arbeitet als freie Grafikerin zu Hause, kann sich dort aber nicht konzentrieren. Sie möchte ihren Hund mitnehmen.",
    "Ihr Kollege hat eine Tochter (3 Jahre). Er möchte zwei Tage pro Woche nicht zu Hause, sondern in Ruhe in einem Büro arbeiten.",
    "Ein Kollege möchte nach der Arbeit wieder Sport machen. Er hat lange nicht trainiert und möchte nichts bezahlen.",
    "Ihr Schwager ist neu in der Stadt und möchte sein Deutsch beim Sprechen üben, ohne sich für einen Kurs anzumelden.",
    "Sie ziehen um und brauchen günstig einen Kleiderschrank und ein Sofa. Ein Auto haben Sie nicht.",
    "Ein Freund hat seine erste Stelle in Deutschland und braucht Hilfe bei der Steuererklärung. Englisch versteht er besser als Deutsch.",
    "Ihre Cousine beginnt eine Ausbildung auf dem Bau und braucht Sicherheitsschuhe. Sie hat aber wenig Geld.",
]
s += [PageBreak()]
s += task(3, "Lesen Teil 3: Anzeigen", "Lesen Sie die zehn Situationen und die zwölf Anzeigen. Welche Anzeige (a–l) passt zu "
          "welcher Situation? Jede Anzeige kann nur einmal gewählt werden. Für eine Situation gibt es keine passende Anzeige. "
          "Wählen Sie in diesem Fall x.", 3)
cells = [[R(f"<b>{h}</b><br/>{t}", "ad") for h, t in ads[i:i + 2]] for i in range(0, 12, 2)]
at = Table(cells, colWidths=[87 * mm, 87 * mm])
at.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.5, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 3),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 3), ("LEFTPADDING", (0, 0), (-1, -1), 6)]))
s += [at, Spacer(1, 5)]
srows = [[R(f"<b>{i}</b>", "ad"), R(t, "ad"), R(f"Anzeige: {BL}", "ad")] for i, t in enumerate(sits, 1)]
stab = Table(srows, colWidths=[9 * mm, 137 * mm, 28 * mm])
stab.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                          ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
s += [stab]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
l1 = [
    ("1 – c", "Beförderung im eigenen Betrieb, Führung des alten Teams. <i>g</i> passt nicht: Dort geht es um Beschäftigte, die Ärger mit Vorgesetzten haben – andere Zielgruppe."),
    ("2 – e", "Studium neben der Vollzeitstelle. <i>i</i> passt nicht: Wer direkt nach der Schule studiert, „findet hier wenig“."),
    ("3 – a", "Gehaltsgespräch vorbereiten. <i>f</i> passt nicht: Das Vorstellungsgespräch wird nur kurz behandelt."),
    ("4 – h", "Ständige Erreichbarkeit, Handy abends weglegen. <i>b</i> passt nicht: Technische Tipps zu Programmen „gibt es kaum“."),
    ("5 – d", "Fähigkeiten ohne anerkanntes Zeugnis zeigen. <i>j</i> passt nicht: Übersetzungen nur „auf zwei Seiten am Ende“."),
]
s += [R("Übung 1 · Lesen Teil 1 (übrig: b, f, g, i, j)", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l1]
l2 = [
    ("1 – b", "„verstand … in der Lagerhalle fast nichts“. Falsch: a) Er hatte das B2-Zertifikat schon. c) Briefe hatte er im Kurs gelernt."),
    ("2 – c", "„Einmal pro Woche … während der Arbeitszeit“. Falsch: a) „Ich bin kein Lehrer“, keine Treffen nach Feierabend. b) Es sind sechs Monate, nicht zwölf (zwölf = Zahl der Paten)."),
    ("3 – a", "„gute Leute nach wenigen Monaten wieder gegangen“. Falsch: b) „Nicht wegen des Geldes“. c) Zahlen will die Firma erst später veröffentlichen."),
    ("4 – c", "„zwei zusätzliche Urlaubstage“. Falsch: a) „kein zusätzliches Geld“. b) Der Betriebsrat wollte das Gegenteil: höchstens eine Person gleichzeitig."),
    ("5 – b", "„nicht nur korrigieren, sondern auch zuhören … beide Seiten voneinander lernen“. Falsch: a) Kurse sind „eine wichtige Grundlage“. c) Gegenteil."),
]
s += [R("Übung 2 · Lesen Teil 2 (der Übungstext ist etwas kürzer als in der Prüfung)", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l2]
l3 = [
    ("1 – c", "online, abends. Nicht d: Der Präsenzkurs ist vormittags."),
    ("2 – f", "beglaubigte Übersetzung aus dem Arabischen."),
    ("3 – b", "Vorstellungsgespräch üben, auch samstags."),
    ("4 – x", "g: keine Haustiere. h: nur für Eltern mit Kind, keine Tiere. Keine Anzeige passt."),
    ("5 – h", "Arbeitsplatz mit Kinderbetreuung für Kinder von 1–6 Jahren."),
    ("6 – i", "Anfänger willkommen, kostenlos, nach der Arbeit."),
    ("7 – a", "Sprechen üben, ohne Anmeldung."),
    ("8 – k", "günstige gebrauchte Möbel, Lieferung (gegen Gebühr) – kein Auto nötig."),
    ("9 – e", "Steuererklärung für Arbeitnehmer, Beratung auch auf Englisch."),
    ("10 – l", "geprüfte Sicherheitsschuhe aus zweiter Hand, günstig."),
]
s += [R("Übung 3 · Lesen Teil 3 (übrig: d, g, j)", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l3]
s += [Spacer(1, 6), box(R(
    "<b>Punkte zählen:</b> Übung 1: je 5 Punkte · Übung 2: je 5 Punkte · Übung 3: je 2,5 Punkte. "
    "Maximal 75 Punkte. Notieren Sie, in welchem Teil Sie die meisten Fehler hatten – dort lohnt sich das Training am meisten.",
    "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
