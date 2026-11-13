# Arbeitsblatt telc Deutsch B2 (allgemein): Thema „Umwelt, Klima und Konsum“
# Wortschatz, Leseverstehen (Stil Teil 2), Hörverstehen (Stil Teil 2), Mündlich Teil 2, Schriftlicher Ausdruck.
# Eigene Übungstexte im Stil der Prüfung, keine telc-Originale. Formate: tools/pdf/b2-formate-offiziell.md
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b2-thema-umwelt-und-konsum.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak  # noqa

SLUG = "b2-thema-umwelt-und-konsum"
TITLE = "telc B2 Themen: Umwelt, Klima und Konsum"
HEAD = "telc B2 Thema: Umwelt, Klima und Konsum"  # page header (max. 70 characters)
LEVEL = "B2"
KICK = "B2 · Thema · Arbeitsblatt · telc Deutsch B2"
H1 = "Umwelt, Klima und Konsum"
LEAD = ("Reparieren, Müll vermeiden, klimafreundlich unterwegs sein: Wortschatz, Lesen, Hören, Diskutieren und Schreiben "
        "zu einem typischen Alltagsthema der telc-B2-Prüfung.")

WORDS = [
    ("die Umwelt", "die Umwelt (nur Sg.)", "Plastik im Meer schadet der Umwelt."),
    ("der Klimawandel", "der Klimawandel (nur Sg.)", "Der Klimawandel betrifft alle Länder."),
    ("der Klimaschutz", "der Klimaschutz (nur Sg.)", "Für den Klimaschutz fahre ich öfter Rad."),
    ("der Verbrauch", "der Verbrauch (nur Sg.)", "Unser Verbrauch an Strom ist gesunken."),
    ("der Konsum", "der Konsum (nur Sg.)", "Weniger Konsum bedeutet auch weniger Müll."),
    ("die Verpackung", "die Verpackung, -en", "Die Verpackung war größer als das Produkt."),
    ("der Müll", "der Müll (nur Sg.)", "Wir bringen den Müll jeden Abend runter."),
    ("die Mülltrennung", "die Mülltrennung (nur Sg.)", "Mülltrennung ist in unserem Haus Pflicht."),
    ("die Nachhaltigkeit", "die Nachhaltigkeit (nur Sg.)", "Beim Kleiderkauf achte ich auf Nachhaltigkeit."),
    ("die Lebensmittelverschwendung", "die Lebensmittelverschwendung (nur Sg.)",
     "Gegen Lebensmittelverschwendung hilft ein Einkaufszettel."),
    ("der Second-Hand-Laden", "der Second-Hand-Laden, Second-Hand-Läden", "Die Jacke ist aus dem Second-Hand-Laden."),
    ("die Reparatur", "die Reparatur, -en", "Die Reparatur hat nur zehn Euro gekostet."),
    ("die Pfandflasche", "die Pfandflasche, -n", "Für Pfandflaschen bekommt man Geld zurück."),
    ("das Leitungswasser", "das Leitungswasser (nur Sg.)", "Ich trinke Leitungswasser statt Wasser aus Flaschen."),
    ("umweltfreundlich", "Adjektiv", "Die Bahn ist umweltfreundlicher als das Flugzeug."),
    ("verschwenden", "verschwendet – verschwendete – hat verschwendet", "Wir verschwenden zu viel Energie."),
    ("vermeiden", "vermeidet – vermied – hat vermieden", "Ich versuche, Plastik zu vermeiden."),
    ("reparieren", "repariert – reparierte – hat repariert", "Mein Nachbar hat mein Fahrrad repariert."),
    ("wegwerfen", "wirft weg – warf weg – hat weggeworfen", "Altes Brot werfe ich nie weg."),
    ("Müll trennen", "trennt – trennte – hat getrennt", "Wir trennen Papier, Glas und Bioabfall."),
    ("Energie sparen", "spart – sparte – hat gespart", "Mit LED-Lampen spart man Energie."),
    ("ersetzen", "ersetzt – ersetzte – hat ersetzt", "Wir haben die alten Fenster durch neue ersetzt."),
    ("sich einsetzen für + Akk.", "setzt sich ein – setzte sich ein – hat sich eingesetzt",
     "Sie setzt sich für mehr Radwege ein."),
    ("umsteigen auf + Akk.", "steigt um – stieg um – ist umgestiegen", "Er ist auf Bus und Bahn umgestiegen."),
    ("achten auf + Akk.", "achtet – achtete – hat geachtet", "Beim Einkaufen achte ich auf die Herkunft."),
]
GAP_BOX = ["Verpackung", "weggeworfen", "repariert", "Pfandflaschen", "verschwenden", "umgestiegen", "Mülltrennung", "achte"]
GAPS = [
    "Seit einem Jahr fahre ich nicht mehr mit dem Auto zur Arbeit – ich bin ganz aufs Fahrrad ___.",
    "Früher habe ich kaputte Geräte sofort ___, heute bringe ich sie zuerst ins Reparatur-Café.",
    "Beim Einkaufen ___ ich darauf, dass Obst und Gemüse aus der Region kommen.",
    "Die leeren ___ bringe ich in den Supermarkt zurück und bekomme dafür Geld.",
    "Ich ärgere mich, wenn ein kleines Ladekabel in einer riesigen ___ aus Plastik verkauft wird.",
    "Viele Haushalte ___ Lebensmittel, weil sie mehr einkaufen, als sie essen können.",
]
GAP_SOL = ["umgestiegen", "weggeworfen", "achte", "Pfandflaschen", "Verpackung", "verschwenden"]
GAP_REST = ["repariert", "Mülltrennung"]

ART_TITLE = "Schraubenzieher statt Mülltonne"
ART_SUB = "Im Reparatur-Café in Wiesenstadt bekommen kaputte Geräte eine zweite Chance – und ihre Besitzer eine Tasse Kaffee"
ART = [
    "Es ist Samstagvormittag, und im Stadtteilzentrum am Westpark riecht es nach Kaffee und heißem Lötzinn. An sechs "
    "Tischen sitzen Menschen über Toastern, Lampen und Fahrradlichtern. Sophie Nguyen, 29, hat ihren Stabmixer "
    "mitgebracht. „Er geht einfach nicht mehr an. Ein neuer kostet zwar nur 30 Euro, aber ich sehe nicht ein, ein Gerät "
    "wegzuwerfen, das erst drei Jahre alt ist.“",
    "Das Reparatur-Café gibt es seit vier Jahren. Gegründet hat es die Maschinenbauingenieurin Leila Moradi zusammen mit "
    "einigen Nachbarn. Die Idee ist einfach: Wer etwas Kaputtes hat, bringt es vorbei, und ehrenamtliche Helferinnen und "
    "Helfer versuchen gemeinsam mit den Besitzern, es wieder in Ordnung zu bringen. Bezahlt wird nichts, auf dem Tresen "
    "steht aber eine Spendendose. „Uns ist wichtig, dass die Leute dabei sind und zusehen“, sagt Moradi. „Viele merken "
    "dann, dass Reparieren keine Zauberei ist.“",
    "Einer der erfahrensten Helfer ist Günter Albrecht. Der 71-Jährige war vierzig Jahre lang Elektromeister und kommt "
    "jeden Monat. Er öffnet Sophie Nguyens Mixer, misst kurz nach und findet den Fehler: ein gebrochenes Kabel im Griff. "
    "Zwanzig Minuten später läuft das Gerät wieder. „Das ist das Schönste an diesem Ehrenamt“, sagt Albrecht. „Man sieht "
    "sofort, dass man geholfen hat.“",
    "Nicht immer geht es so gut aus. Nach den Notizen des Teams lässt sich ungefähr jedes zweite Gerät retten. Oft fehlen "
    "passende Ersatzteile, oder die Geräte sind so gebaut, dass man sie nicht öffnen kann, ohne sie zu beschädigen. "
    "Besonders bei Smartphones und billigen Kopfhörern müssen die Helfer häufig aufgeben.",
    "Marco Rinaldi, der in der Innenstadt ein Elektrogeschäft mit Werkstatt führt, sieht das Angebot mit gemischten "
    "Gefühlen. „Ich finde es gut, dass die Menschen weniger wegwerfen“, sagt er. „Aber Geräte mit Strom gehören in die "
    "Hand von Fachleuten – schon aus Sicherheitsgründen.“ Moradi widerspricht nicht ganz: Bei großen Haushaltsgeräten "
    "wie Waschmaschinen verweise das Café ohnehin an Fachbetriebe.",
    "Für Moradi geht es um mehr als um einzelne Geräte. „Jeder Toaster, den wir reparieren, muss nicht neu produziert "
    "werden.“ Sie wünscht sich, dass Hersteller ihre Produkte so bauen, dass man sie leichter reparieren kann. Bis dahin "
    "bleibt das Café geöffnet – jeden ersten Samstag im Monat, von zehn bis vierzehn Uhr.",
]
MC = [
    ("Warum kommt Sophie Nguyen ins Reparatur-Café?",
     ["Ein neuer Mixer ist ihr zu teuer.", "Sie will ein noch recht neues Gerät nicht wegwerfen.",
      "Sie möchte beruflich Geräte reparieren lernen."]),
    ("Was ist typisch für das Reparatur-Café?",
     ["Man gibt das Gerät ab und holt es später wieder.", "Für jede Reparatur gibt es einen festen Preis.",
      "Die Besitzer sind bei der Reparatur dabei."]),
    ("Was erfährt man über Günter Albrecht?",
     ["Er hat früher beruflich mit Elektrik gearbeitet.", "Er hilft jeden Samstag im Café.",
      "Er hat das Café zusammen mit Nachbarn gegründet."]),
    ("Warum können manche Geräte nicht repariert werden?",
     ["Die Helfer haben an einem Vormittag zu wenig Zeit.",
      "Manche Geräte lassen sich nicht öffnen, ohne sie zu beschädigen.",
      "Die Besitzer wollen für die Ersatzteile nichts bezahlen."]),
    ("Wie steht Marco Rinaldi zum Reparatur-Café?",
     ["Er lehnt die Idee vollständig ab.", "Er schickt Kunden mit Waschmaschinen dorthin.",
      "Er sieht Vorteile, hat aber Sicherheitsbedenken."]),
]
MC_SOL = [
    ("b", "„ich sehe nicht ein, ein Gerät wegzuwerfen, das erst drei Jahre alt ist“. Falsch: a) Ein neuer kostet „nur 30 Euro“. c) steht nicht im Text."),
    ("c", "„dass die Leute dabei sind und zusehen“. Falsch: a) Reparatur gemeinsam vor Ort. b) „Bezahlt wird nichts“, nur Spendendose."),
    ("a", "„vierzig Jahre lang Elektromeister“. Falsch: b) Er kommt „jeden Monat“ (das Café öffnet nur einmal im Monat). c) Gründerin ist Leila Moradi."),
    ("b", "„so gebaut, dass man sie nicht öffnen kann, ohne sie zu beschädigen“. Falsch: a) und c) stehen nicht im Text."),
    ("c", "„gut, dass die Menschen weniger wegwerfen … aus Sicherheitsgründen“. Falsch: a) nicht „vollständig“. b) Das Café schickt Kunden mit Waschmaschinen an Fachbetriebe, nicht umgekehrt."),
]

HOER_SIT = "Sie hören im Lokalradio die Sendung „Stadt im Wandel“. Der Moderator spricht mit einer Verkehrsplanerin."
HOER = [
    ("Moderator", "Willkommen zu „Stadt im Wandel“. Unser Thema heute: Wie kommen wir umweltfreundlicher zur Arbeit? Zu "
                  "Gast ist Mariana Costa, Verkehrsplanerin bei der Stadt. Frau Costa, viele Menschen sagen: Ich würde ja "
                  "gern mit dem Rad fahren, aber das ist mir zu gefährlich."),
    ("Costa", "Das höre ich oft, und die Sorge ist verständlich. Auf vielen Straßen gibt es für Fahrräder noch zu wenig "
              "Platz. Deshalb bauen wir in den nächsten drei Jahren breite Radwege auf den vier wichtigsten Strecken in die "
              "Innenstadt. Die erste Strecke wird im Frühjahr fertig."),
    ("Moderator", "Und was ist mit Leuten, die einen weiten Weg zur Arbeit haben?"),
    ("Costa", "Für sie ist die Kombination interessant: mit dem Rad zum Bahnhof und dann mit dem Zug weiter. Wir richten an "
              "drei Bahnhöfen sichere Fahrradgaragen ein. Wer dort einen Platz möchte, muss sich vorher online anmelden – "
              "und zahlt einen kleinen Monatsbeitrag."),
    ("Moderator", "Viele Autofahrer ärgern sich, weil Parkplätze wegfallen."),
    ("Costa", "Ja, das ist ein echter Konflikt, und ich verstehe den Ärger. Aber der Platz in der Stadt ist nun mal begrenzt. "
              "Wir haben deshalb mit den Geschäftsleuten gesprochen und Lieferzonen eingerichtet, damit die Läden weiterhin "
              "beliefert werden können."),
    ("Moderator", "Und Ihr persönlicher Tipp für Einsteigerinnen und Einsteiger?"),
    ("Costa", "Nicht gleich jeden Tag fahren wollen. Fangen Sie mit einem Tag pro Woche an, am besten bei gutem Wetter. Und "
              "probieren Sie die Strecke vorher am Wochenende aus, ganz ohne Zeitdruck."),
    ("Moderator", "Vielen Dank, Frau Costa."),
]
RF = [
    ("Viele Menschen halten das Radfahren in der Stadt für gefährlich.", True),
    ("Alle neuen Radwege sind schon im Frühjahr fertig.", False),
    ("Für einen Platz in einer Fahrradgarage muss man sich anmelden.", True),
    ("Die Plätze in den Fahrradgaragen sind kostenlos.", False),
    ("Frau Costa kann den Ärger der Autofahrer nicht verstehen.", False),
    ("Frau Costa empfiehlt, am Anfang einmal pro Woche mit dem Rad zu fahren.", True),
]
RF_WHY = [
    "„Das höre ich oft, und die Sorge ist verständlich.“",
    "Nur „die erste Strecke wird im Frühjahr fertig“; insgesamt dauert es drei Jahre.",
    "„muss sich vorher online anmelden“.",
    "„zahlt einen kleinen Monatsbeitrag“.",
    "„ich verstehe den Ärger“.",
    "„Fangen Sie mit einem Tag pro Woche an“.",
]

DISK_TITLE = "Spenden statt wegwerfen – per Gesetz?"
DISK = (
    "Jeden Abend landen in Supermärkten Lebensmittel im Müll, die noch gut essbar wären: Brot vom Vortag, Joghurt kurz "
    "vor dem Mindesthaltbarkeitsdatum, Äpfel mit kleinen Flecken. Manche fordern deshalb ein Gesetz, das große "
    "Supermärkte verpflichtet, solche Lebensmittel an gemeinnützige Organisationen zu spenden. Befürworter sagen, es sei "
    "nicht hinnehmbar, Essen zu vernichten, während andere Menschen jeden Euro umdrehen müssen. Gegner warnen dagegen vor "
    "zusätzlicher Bürokratie und offenen Fragen: Wer ist verantwortlich, wenn jemand nach dem Essen krank wird? Außerdem, "
    "so ihr Argument, lasse sich das Problem besser lösen, wenn die Märkte genauer planen und weniger bestellen."
)
PRO = ["Essen ist zu wertvoll für den Müll", "hilft Menschen mit wenig Geld", "weniger Müll, gut für das Klima"]
CONTRA = ["mehr Bürokratie für die Märkte", "unklare Verantwortung bei verdorbener Ware", "besser: genauer planen, reduzieren"]
DISK_Q = ["Was machen Sie mit Lebensmitteln, die bald ablaufen?", "Wer ist verantwortlich: Märkte, Kundschaft oder Staat?",
          "Wie ist das in Ihrem Herkunftsland?", "Welcher Kompromiss wäre möglich?"]

MAIL_SIT = ("Die Stadtwerke Wiesenstadt bieten Mieterinnen und Mietern eine Energiesparberatung an. Sie möchten Ihre "
            "Stromkosten senken und interessieren sich dafür. Schreiben Sie eine E-Mail an die Stadtwerke.")
MAIL_LP = ["Ablauf der Beratung (bei Ihnen zu Hause oder im Büro?)", "mögliche Termine",
           "Kosten und Voraussetzungen", "Unterlagen, die Sie mitbringen oder bereitlegen sollen"]
MUSTER_LP = "Ablauf, Termine, Unterlagen"
MUSTER = [
    "<b>Betreff:</b> Anfrage zur Energiesparberatung",
    "Sehr geehrte Damen und Herren,",
    "auf Ihrer Internetseite habe ich gelesen, dass Sie eine Energiesparberatung für Mieterinnen und Mieter anbieten. "
    "Meine Stromrechnung ist im letzten Jahr deutlich gestiegen, deshalb würde ich gern an der Beratung teilnehmen.",
    "Zunächst möchte ich wissen, wie die Beratung abläuft. Kommt eine Beraterin oder ein Berater zu mir nach Hause, oder "
    "findet das Gespräch in Ihrem Büro statt, und wie lange dauert ein solcher Termin ungefähr? Ich wohne in einer Altbauwohnung mit alten Fenstern und würde mich freuen, "
    "wenn sich jemand die Wohnung direkt ansehen könnte.",
    "Außerdem interessiert mich, wann Termine möglich sind. Ich arbeite von Montag bis Freitag bis 17 Uhr. Gibt es auch "
    "Termine am frühen Abend oder am Samstag? Am liebsten wäre mir ein Termin im nächsten Monat.",
    "Zuletzt hätte ich noch eine Frage zur Vorbereitung: Welche Unterlagen soll ich bereitlegen? Ich könnte zum Beispiel "
    "meine letzten Stromabrechnungen und die Nebenkostenabrechnung heraussuchen.",
    "Vielen Dank im Voraus. Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar.",
    "Mit freundlichen Grüßen<br/>Tomás Herrera",
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
