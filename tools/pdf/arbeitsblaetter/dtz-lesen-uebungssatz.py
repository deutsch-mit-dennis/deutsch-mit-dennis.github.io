# Arbeitsblatt A2–B1 Prüfung: DTZ Lesen – kompletter Übungssatz Teil 1–5 (im Stil der Prüfung, eigene Inhalte)
# Format laut sim/dtz.js und sim/dtz-2.js (Aufgabentypen, Anzahl Items, Anweisungen, 1 Punkt je Aufgabe)
# und pruefung-fakten.js (Lesen 45 Min., 5 Teile, 25 Aufgaben; Hören + Lesen 45 Punkte, B1 ab 33, A2 ab 20).
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-lesen-uebungssatz.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtz-lesen-uebungssatz"
TITLE = "DTZ Lesen: ein kompletter Übungssatz (Teil 1–5)"
LEVEL = "A2–B1"
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=9.8, leading=12.8, spaceAfter=2)
st["bh"] = ParagraphStyle("bh", parent=st["cell"], fontName="Atk-B", fontSize=10, leading=13, textColor=TINTE, spaceBefore=3)
st["floor"] = ParagraphStyle("floor", parent=st["cell"], fontName="Atk-B", fontSize=10, leading=13, textColor=TINTE)
st["ad"] = ParagraphStyle("ad", parent=st["cell"], fontSize=9.3, leading=11.8)
st["instr"] = ParagraphStyle("instr", parent=st["cell"], fontName="Atk-I", fontSize=10.5, leading=14, spaceAfter=5)
CB = sym("☐")


def grid(rows, widths, pad=3, head=False):
    t = Table(rows, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def paper(flow, width=174):
    """Gelber Kasten = Prüfungstext."""
    t = Table([[flow]], colWidths=[width * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), NOTE), ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                           ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


def part(nr, name, instr):
    return [R(f"Lesen Teil {nr}: {name}", "h2"), R(instr, "instr")]


def abc_rows(items, start, widths=(78, 30, 32, 34)):
    """Aufgabe + drei Optionen zum Ankreuzen (Teil 1)."""
    rows = []
    for i, (q, opts, _, _) in enumerate(items, start):
        rows.append([R(f"<b>{i}</b>  {q}", "cell")] + [R(f"{CB} <b>{'abc'[j]})</b> {o}", "txt") for j, o in enumerate(opts)])
    return grid(rows, list(widths), 4)


# ───────────────────────── Seite 1: Überblick ─────────────────────────
s = [
    R("A2–B1 · Prüfung DTZ · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R("Hier machst du den ganzen Prüfungsteil Lesen einmal komplett – mit allen fünf Teilen, 25 Aufgaben und Uhr. "
      "Am Ende findest du die Lösungen mit Begründung.", "lead"),
    box([
        R("<b>So läuft Lesen im DTZ</b>", "cell"), Spacer(1, 3),
        grid([[R(f"<b>{h}</b>", "cell") for h in ("Teil", "Text", "Aufgaben", "Was du machst")]] + [
            [R(a, "cell"), R(b, "cell"), R(c, "cell"), R(d, "cell")] for a, b, c, d in [
                ("1", "Wegweiser", "5", "In welches Stockwerk gehst du? a, b oder c (c = anderes Stockwerk)"),
                ("2", "8 Anzeigen a–h", "5", "Anzeige zuordnen. Jede Anzeige nur einmal. Für eine Situation passt keine: x"),
                ("3", "3 Pressetexte und Mitteilungen", "6", "Pro Text: 1 × richtig/falsch und 1 × a, b oder c"),
                ("4", "Informationsbroschüre", "3", "Aussagen: richtig oder falsch"),
                ("5", "Brief mit Lücken", "6", "Welches Wort passt? a, b oder c"),
            ]], [12, 47, 22, 89], 2.5, head=True),
        Spacer(1, 3),
        R("<b>Zeit:</b> 45 Minuten für alle 5 Teile. <b>Punkte:</b> 1 Punkt pro Aufgabe (25). Hören und Lesen zählen "
          "zusammen: 45 Punkte – B1 ab 33 Punkten, A2 ab 20 Punkten. Eine eigene Grenze nur für Lesen gibt es nicht.", "cell"),
        R("Stand der Prüfungsdaten: 11.11.2026 · Quelle: g.a.s.t. (Anbieter des DTZ)", "small"),
    ], SOFT),
    Spacer(1, 6),
    KeepTogether([
        R("Zeitplan – unser Vorschlag (nicht offiziell)", "h3"),
        grid([[R(x, "cell") for x in ("Teil 1", "Teil 2", "Teil 3", "Teil 4", "Teil 5", "Kontrolle")],
              [R(x, "cell") for x in ("6 Min.", "10 Min.", "12 Min.", "7 Min.", "7 Min.", "3 Min.")]],
             [29, 29, 29, 29, 29, 29], 3, head=True),
    ]),
    Spacer(1, 6),
    box([
        R("<b>Strategie für alle Teile</b>", "cell"),
        R("1. <b>Erst die Aufgabe, dann der Text.</b> Unterstreiche das Schlüsselwort in der Aufgabe.", "cell"),
        R(f"2. <b>Such, statt alles zu lesen.</b> Du musst nicht jedes Wort verstehen. Im Text steht oft ein anderes Wort: "
          f"Hefte {ARROW} Schreibwaren · nichts bezahlen {ARROW} kostenlos.", "cell"),
        R("3. <b>Lies die passende Stelle genau.</b> Kleine Wörter entscheiden: <i>nur, nicht, auch, außer, aber, bis, ab</i>.", "cell"),
        R("4. <b>Bleib nicht hängen.</b> Eine Aufgabe ist schwer? Kreuz etwas an, mach einen Punkt an den Rand und geh weiter.", "cell"),
        R("5. <b>Lass nichts leer.</b> Prüf am Ende: Hast du bei allen 25 Aufgaben etwas angekreuzt?", "cell"),
    ], HELLGRUEN, GRUEN),
    Spacer(1, 6),
    KeepTogether([
        R("Typische Fallen", "h3"),
        grid([[R(f"<b>{a}</b>", "cell"), R(b, "cell")] for a, b in [
            ("Teil 1", "Das Wort aus der Situation passt zu zwei Stellen (z. B. <i>Sofa</i> und <i>Lieferservice</i>). "
                       "Frag dich: Was will die Person <b>machen</b>?"),
            ("Teil 2", "Eine Anzeige passt fast – aber Preis, Alter, Uhrzeit oder Ort stimmen nicht. Dann ist es oft eine "
                       "andere Anzeige oder <b>x</b>."),
            ("Teil 3", "Zahlen und Daten: Wann <b>beginnt</b> etwas, wann <b>endet</b> es, bis wann muss man sich melden?"),
            ("Teil 4", "<i>können</i> ist nicht <i>müssen</i>; <i>nur</i> und <i>außer</i> ändern alles."),
            ("Teil 5", "Lies den ganzen Satz: Verb am Ende (weil, dass, damit) oder auf Position 2 (deshalb, trotzdem)?"),
        ]], [16, 158], 3),
    ]),
]

# ───────────────────────── Teil 1 ─────────────────────────
weg = [
    ("3. Stock", ["Kinder- und Jugendzimmer", "Babymöbel (Kinderbetten, Wickeltische)", "Büromöbel (Schreibtische, Bürostühle)"]),
    ("2. Stock", ["Schlafzimmer (Betten, Matratzen, Kleiderschränke)", "Bettwäsche und Handtücher", "Badmöbel"]),
    ("1. Stock", ["Wohnzimmer (Sofas, Regale, Couchtische)", "Teppiche", "Lampen und Leuchten"]),
    ("Erdgeschoss", ["Information", "Kasse", "Lieferservice und Montage – Termine hier vereinbaren", "Küchenplanung", "Restaurant"]),
    ("Untergeschoss", ["Parkhaus", "Abholung großer Möbel", "Rückgabe und Umtausch"]),
]
t1 = [
    ("Sie möchten ein neues Sofa kaufen, haben aber kein Auto. Das Möbelhaus soll das Sofa zu Ihnen bringen.",
     ["1. Stock", "Erdgeschoss", "anderes Stockwerk"], 1,
     "Liefern = „Lieferservice und Montage“ im Erdgeschoss. Das Sofa selbst gibt es im 1. Stock – das ist die Falle."),
    ("Ihre Tochter beginnt eine Ausbildung und braucht einen Schreibtisch für ihr Zimmer.",
     ["1. Stock", "3. Stock", "anderes Stockwerk"], 1, "„Büromöbel (Schreibtische …)“ und „Jugendzimmer“ sind im 3. Stock."),
    ("Das Regal, das Sie letzte Woche gekauft haben, hat einen Fehler. Sie möchten es zurückgeben.",
     ["Erdgeschoss", "1. Stock", "anderes Stockwerk"], 2, "„Rückgabe und Umtausch“ ist im Untergeschoss."),
    ("Sie schlafen schlecht und brauchen eine neue Matratze.",
     ["2. Stock", "3. Stock", "anderes Stockwerk"], 0, "„Schlafzimmer (Betten, Matratzen …)“ im 2. Stock."),
    ("In Ihrem Wohnzimmer ist es abends zu dunkel.",
     ["Erdgeschoss", "2. Stock", "anderes Stockwerk"], 2, "Licht = „Lampen und Leuchten“ im 1. Stock."),
]
wt = Table([[R('<font size="11.5"><b>Einrichtungshaus Wohnwelt – Wegweiser</b></font>', "cell"), ""]]
           + [[R(fl, "floor"), R(" · ".join(e), "txt")] for fl, e in weg], colWidths=[30 * mm, 144 * mm])
wt.setStyle(TableStyle([("SPAN", (0, 0), (-1, 0)), ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("BACKGROUND", (0, 1), (-1, -1), NOTE),
                        ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 1), (-1, -1), 0.6, LINE),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 7),
                        ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
s += [Spacer(1, 4), KeepTogether(part(1, "Wegweiser", "Lesen Sie die Situationen und den Wegweiser des Einrichtungshauses. In welches Stockwerk gehen "
                          "Sie? Wählen Sie die richtige Lösung a, b oder c.") + [wt, Spacer(1, 5), abc_rows(t1, 1)])]

# ───────────────────────── Teil 2 ─────────────────────────
ads = [
    ("a", "<b>Nachhilfe Mathe und Deutsch</b><br/>für Klasse 5 bis 10. Erfahrene Lehrerin, auch online. 15 € pro 45 Minuten.<br/>Tel. 0151 / 62 40 18 77"),
    ("b", "<b>Hausaufgabenhilfe im Jugendzentrum Nord</b><br/>für Grundschulkinder, Mo–Do 14–16 Uhr. Kostenlos, ohne Anmeldung.<br/>Ahornweg 3"),
    ("c", "<b>Umzugsservice Schnell &amp; Sicher</b><br/>Transporter mit Fahrer, wir tragen für Sie. Auch am Wochenende. Ab 39 € pro Stunde."),
    ("d", "<b>Transporter zu vermieten</b><br/>ohne Fahrer, Führerschein Klasse B reicht. 69 € pro Tag, 100 km frei.<br/>Autovermietung Krüger, Hafenstraße 8"),
    ("e", "<b>Pflegedienst Sonnenblick</b> sucht Pflegehelferinnen und Pflegehelfer in Teilzeit. Auch ohne Ausbildung – "
          "wir schulen Sie. Deutsch B1. Bewerbung an: job@sonnenblick-pflege.de"),
    ("f", "<b>Volkshochschule: Computer für Anfänger</b><br/>E-Mails schreiben, Bewerbungen am PC, Termine online buchen. "
          "6 Abende, immer mittwochs 18–20 Uhr."),
    ("g", "<b>Kleiderkammer St. Martin</b><br/>Gut erhaltene Kinder- und Erwachsenenkleidung – kostenlos. Dienstags 10–12 Uhr, "
          "Kirchplatz 1."),
    ("h", "<b>Kinder-Flohmarkt im Familienzentrum</b><br/>Kleidung, Spielzeug, Bücher – günstig kaufen und verkaufen. "
          "Samstag, 9–13 Uhr."),
]
t2 = [
    ("Ihr Sohn geht in die 2. Klasse und braucht Hilfe bei den Hausaufgaben. Sie haben wenig Geld.", "b",
     "b: Grundschulkinder, kostenlos. a ist erst ab Klasse 5 und kostet Geld."),
    ("Sie ziehen um und haben einen Führerschein. Sie möchten die Möbel mit Freunden selbst transportieren.", "d",
     "d: Transporter ohne Fahrer, Führerschein Klasse B. c ist ein Service mit Fahrer und Trägern."),
    ("Sie möchten lernen, wie man eine Bewerbung am Computer schreibt.", "f", "f: „Bewerbungen am PC“."),
    ("Sie suchen eine Arbeit am Wochenende in einem Restaurant.", "x",
     "Keine Anzeige sucht Personal für ein Restaurant. e ist eine Stelle in der Pflege."),
    ("Ihre Kinder sind gewachsen und brauchen Winterkleidung. Sie möchten nichts dafür bezahlen.", "g",
     "g: Kleidung „kostenlos“. Auf dem Flohmarkt (h) muss man bezahlen."),
]
adcells = [paper([R(f'<font size="12" color="#2341B5"><b>{k}</b></font>  ' + v, "ad")], 85) for k, v in ads]
at = Table([adcells[i:i + 2] for i in range(0, 8, 2)], colWidths=[87 * mm, 87 * mm])
at.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 2), ("TOPPADDING", (0, 0), (-1, -1), 2),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
s += [Spacer(1, 4), KeepTogether(part(2, "Anzeigen", "Lesen Sie die Situationen und die Anzeigen a–h. Welche Anzeige passt zu "
                                      "welcher Situation? Sie können jede Anzeige nur einmal wählen. Für eine Situation gibt "
                                      "es keine passende Anzeige. Wählen Sie dann x.") + [at])]
s += [Spacer(1, 6), grid([[R(f"<b>{i}</b>  {q}", "cell"), R("Anzeige: ______", "cell")] for i, (q, _, _) in enumerate(t2, 6)],
                         [140, 34], 4)]

# ───────────────────────── Teil 3 ─────────────────────────
texts = [
    ("Text 1: Neue Sprechstunde für Eltern im Gesundheitsamt",
     "Das Gesundheitsamt Lindenfeld bietet ab dem 1. Februar eine neue Sprechstunde für Eltern von kleinen Kindern an. "
     "Jeden Mittwoch von 14 bis 17 Uhr beantworten eine Kinderärztin und eine Hebamme Fragen zu Ernährung, Schlaf und "
     "Entwicklung. Die Beratung ist kostenlos. Eine Anmeldung ist nicht nötig, manchmal muss man aber etwas warten. Wer eine "
     "Dolmetscherin braucht, soll bitte eine Woche vorher anrufen. Untersuchungen und Impfungen gibt es in der Sprechstunde "
     "nicht – dafür ist weiter die Kinderarztpraxis zuständig.",
     ("Eltern müssen sich für die Sprechstunde vorher anmelden.", 1,
      "„Eine Anmeldung ist nicht nötig.“"),
     ("Was müssen Eltern tun, wenn sie eine Dolmetscherin brauchen?",
      ["Eine Woche vorher anrufen.", "Selbst eine Person mitbringen.", "Am Mittwoch nach 17 Uhr kommen."], 0,
      "„Wer eine Dolmetscherin braucht, soll bitte eine Woche vorher anrufen.“")),
    ("Text 2: Information der Kita Regenbogen",
     "Liebe Eltern,<br/>im Sommer bleibt unsere Kita vom 21. Juli bis zum 8. August geschlossen. Wenn Sie in dieser Zeit "
     "arbeiten müssen und keine Betreuung für Ihr Kind haben, können Sie es in der Kita Sonnenschein in der Parkstraße "
     "anmelden. Bitte geben Sie das Formular dafür bis zum 15. Mai bei Frau Nowak im Büro ab.<br/>Am Freitag, 27. Juni, "
     "feiern wir ab 15 Uhr unser Sommerfest. An diesem Tag schließt die Kita schon um 13 Uhr, damit wir alles vorbereiten "
     "können. Wir freuen uns, wenn Sie einen Kuchen oder einen Salat mitbringen.<br/>Ihr Kita-Team",
     ("Die Kita Regenbogen ist den ganzen August geschlossen.", 1,
      "Die Kita ist nur bis zum 8. August geschlossen."),
     ("Was passiert am 27. Juni?",
      ["Die Kita ist den ganzen Tag geschlossen.", "Die Kita schließt früher als sonst.", "Alle Eltern müssen einen Kuchen kaufen."], 1,
      "„An diesem Tag schließt die Kita schon um 13 Uhr“. Kuchen oder Salat sind ein Wunsch, keine Pflicht.")),
    ("Text 3: Berufsberatung jetzt auch am Abend",
     "Wer eine neue Arbeit sucht oder sich beruflich verändern möchte, kann sich ab März auch abends beraten lassen. Das "
     "Bildungszentrum Lindenfeld bietet jeden Donnerstag von 17 bis 20 Uhr eine Beratung an. Das Angebot ist besonders für "
     "Menschen gedacht, die tagsüber arbeiten. Die Beraterinnen und Berater helfen bei der Suche nach einer Weiterbildung und "
     "erklären, wie man einen Berufsabschluss aus dem Ausland anerkennen lassen kann. Für ein Gespräch sollte man einen "
     "Termin vereinbaren, online oder telefonisch. Bitte bringen Sie Ihre Zeugnisse und Ihren Lebenslauf mit.",
     ("Die Abendberatung ist vor allem für Menschen, die am Tag arbeiten.", 0,
      "„Das Angebot ist besonders für Menschen gedacht, die tagsüber arbeiten.“"),
     ("Was soll man zum Gespräch mitbringen?",
      ["Seinen Arbeitsvertrag.", "Seine Zeugnisse.", "Ein Foto für die Bewerbung."], 1,
      "„Bitte bringen Sie Ihre Zeugnisse und Ihren Lebenslauf mit.“")),
]
s += [Spacer(1, 6)]
s += part(3, "Pressetexte und Mitteilungen", "Lesen Sie die drei Texte. Zu jedem Text gibt es zwei Aufgaben: Ist die "
                                              "Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?")
nr = 11
for h, txt, rfq, mc in texts:
    q, opts, _, _ = mc
    s += [KeepTogether([
        paper([R(f"<b>{h}</b>", "cell"), Spacer(1, 2), R(txt, "txt")]), Spacer(1, 3),
        grid([[R(f"<b>{nr}</b>  {rfq[0]}", "cell"), R(f"{CB} richtig", "cell"), R(f"{CB} falsch", "cell")],
              [R(f"<b>{nr + 1}</b>  {q}", "cell"),
               [R(f"{CB} <b>{'abc'[j]})</b> {o}", "cell") for j, o in enumerate(opts)], ""]],
             [92, 41, 41], 3.5),
        Spacer(1, 6),
    ])]
    # span the a/b/c options over both answer columns
    s[-1]._content[2].setStyle(TableStyle([("SPAN", (1, 1), (2, 1))]))
    nr += 2

# ───────────────────────── Teil 4 ─────────────────────────
broschuere = [
    ("Wie bekomme ich einen Termin?",
     "Termine buchen Sie online oder am Telefon unter 0123 / 4 56 70. Ohne Termin können wir Sie nur donnerstags von "
     "15 bis 18 Uhr bedienen. Bitte rechnen Sie dann mit Wartezeit."),
    ("Was brauche ich, wenn ich meine Wohnung anmelde?",
     "Bringen Sie bitte Ihren Pass oder Personalausweis mit und die Wohnungsgeberbestätigung. Dieses Formular bekommen Sie "
     "von Ihrem Vermieter oder Ihrer Vermieterin. Die Anmeldung kostet nichts."),
    ("Kann eine andere Person für mich kommen?",
     "Ja. Für die Anmeldung kann eine andere Person für Sie ins Bürgerbüro kommen. Sie braucht dann eine Vollmacht mit Ihrer "
     "Unterschrift und eine Kopie Ihres Ausweises. Ein Formular für die Vollmacht finden Sie auf unserer Internetseite."),
]
t4 = [("Ohne Termin kann man an jedem Nachmittag ins Bürgerbüro kommen.", 1,
       "Ohne Termin „nur donnerstags von 15 bis 18 Uhr“."),
      ("Für die Anmeldung braucht man ein Papier vom Vermieter.", 0,
       "„die Wohnungsgeberbestätigung. Dieses Formular bekommen Sie von Ihrem Vermieter“."),
      ("Ein Freund kann die Anmeldung auch ohne Vollmacht für Sie machen.", 1,
       "„Sie braucht dann eine Vollmacht mit Ihrer Unterschrift“.")]
bflow = [R('<font size="11.5"><b>Bürgerbüro Lindenfeld – Ihre Fragen, unsere Antworten</b></font>', "cell"), Spacer(1, 2)]
for h, t in broschuere:
    bflow += [R(h, "bh"), R(t, "txt")]
s += [KeepTogether(part(4, "Informationsbroschüre", "Lesen Sie den Text aus einer Broschüre. Sind die Aussagen richtig oder falsch?")
                   + [paper(bflow), Spacer(1, 4),
                      grid([[R(f"<b>{i}</b>  {q}", "cell"), R(f"{CB} richtig", "cell"), R(f"{CB} falsch", "cell")]
                            for i, (q, _, _) in enumerate(t4, 17)], [118, 28, 28], 4)])]

# ───────────────────────── Teil 5 ─────────────────────────
G = lambda n: f'<b>({n})</b> <font color="#8A93A8">________</font>'
brief = (
    "Jorge Castillo · Ahornweg 12 · 45899 Lindenfeld<br/><br/>"
    "Hausverwaltung Albrecht GmbH · Marktstraße 5 · 45899 Lindenfeld<br/><br/>"
    "<b>Reparatur in meiner Wohnung (Ahornweg 12, 2. OG links)</b><br/><br/>"
    "Sehr geehrte Frau Albrecht,<br/><br/>"
    "seit Montag tropft in meinem Bad der Wasserhahn, und die Dusche wird nicht mehr richtig warm. Ich habe schon versucht, "
    f"den Wasserhahn selbst zu reparieren, {G(21)} es hat leider nicht funktioniert.<br/><br/>"
    f"Könnten Sie bitte so schnell wie möglich einen Handwerker {G(22)}? Ich arbeite im Schichtdienst. {G(23)} der "
    "Frühschicht bin ich ab 14 Uhr zu Hause. Wenn der Handwerker vormittags kommen möchte, kann meine Nachbarin, "
    f"Frau Mensah, die Tür öffnen. Sie hat einen Schlüssel {G(24)} meiner Wohnung.<br/><br/>"
    f"Bitte rufen Sie mich vorher an, {G(25)} ich Bescheid weiß. Meine Telefonnummer ist 0176 / 33 81 02 45.<br/><br/>"
    f"Über eine schnelle Antwort {G(26)} ich mich sehr.<br/><br/>"
    "Mit freundlichen Grüßen<br/>Jorge Castillo"
)
t5 = [(["denn", "aber", "oder"], 1, "Gegensatz: Ich habe es versucht, <i>aber</i> es hat nicht funktioniert."),
      (["schickt", "geschickt", "schicken"], 2, "Modalverb <i>könnten</i> + Infinitiv am Satzende: <i>schicken</i>."),
      (["Nach", "Seit", "Vor"], 0, "Erst die Frühschicht, dann zu Hause: <i>nach</i> der Frühschicht."),
      (["an", "zu", "mit"], 1, "Feste Verbindung: der Schlüssel <i>zu</i> meiner Wohnung."),
      (["weil", "ob", "damit"], 2, "Ziel/Zweck: Rufen Sie an, <i>damit</i> ich Bescheid weiß."),
      (["freut", "freue", "freuen"], 1, "Subjekt <i>ich</i>: ich <i>freue</i> mich."),
      ]
s += [Spacer(1, 6), KeepTogether(part(5, "Brief mit Lücken", "Lesen Sie den Brief. Welches Wort passt in die Lücke? Wählen Sie die richtige Lösung a, b oder c.")
      + [paper([R(brief, "txt")])]), Spacer(1, 5),
      grid([[R(f"<b>{i}</b>", "cell")] + [R(f"{CB} <b>{'abc'[j]})</b> {o}", "cell") for j, o in enumerate(opts)]
            for i, (opts, _, _) in enumerate(t5, 21)], [16, 52, 53, 53], 4)]

s += [Spacer(1, 8), box([R("<b>Deine Punkte:</b>  Teil 1 ___ /5 · Teil 2 ___ /5 · Teil 3 ___ /6 · Teil 4 ___ /3 · "
                           "Teil 5 ___ /6 · <b>gesamt ___ /25</b>", "cell"),
                         R("Faustregel (nicht offiziell): Ab etwa 18 von 25 Punkten bist du auf einem guten Weg zu B1 – "
                           "das sind knapp drei Viertel, so wie 33 von 45 Punkten in Hören und Lesen.", "small")], NOTE)]

# ───────────────────────── Lösungen ─────────────────────────
L = []
for i, (_, opts, a, why) in enumerate(t1, 1):
    L.append([f"{i}", f"{'abc'[a]}) {opts[a]}", why])
for i, (_, a, why) in enumerate(t2, 6):
    L.append([f"{i}", a, why])
nr = 11
for _, _, rfq, mc in texts:
    L.append([f"{nr}", "richtig" if rfq[1] == 0 else "falsch", rfq[2]])
    L.append([f"{nr + 1}", f"{'abc'[mc[2]]}) {mc[1][mc[2]]}", mc[3]])
    nr += 2
for i, (_, a, why) in enumerate(t4, 17):
    L.append([f"{i}", "richtig" if a == 0 else "falsch", why])
for i, (opts, a, why) in enumerate(t5, 21):
    L.append([f"{i}", f"{'abc'[a]}) {opts[a]}", why])
heads = {1: "Teil 1", 6: "Teil 2", 11: "Teil 3", 17: "Teil 4", 21: "Teil 5"}
rows = [[R("<b>Nr.</b>", "cell"), R("<b>Lösung</b>", "cell"), R("<b>Warum?</b>", "cell")]]
for n, a, why in L:
    k = int(n)
    if k in heads:
        rows.append([R(f'<font color="#2341B5"><b>{heads[k]}</b></font>', "cell"), "", ""])
    rows.append([R(n, "cell"), R(f"<b>{a}</b>", "cell"), R(why, "cell")])
lt = grid(rows, [12, 50, 112], 1.6, head=True)
lt.setStyle(TableStyle([("BACKGROUND", (0, 1), (-1, -1), HELLGRUEN)]
                       + [("SPAN", (0, r), (-1, r)) for r, row in enumerate(rows) if row[1] == ""]))
s += [PageBreak(), R('Lösungen <font size="10" color="#566078">– erst alles machen, dann nachschauen!</font>', "h2"), lt,
      Spacer(1, 8),
      R("Tipp: Mach den Übungssatz noch einmal in einer Woche – mit Uhr. So merkst du, wo du schneller wirst. – Dennis", "hand"),
      Spacer(1, 4),
      R("Eigene Übung im Stil der Prüfung „Deutsch-Test für Zuwanderer“ – keine Originalaufgabe. Alle Namen, Orte, "
        "Einrichtungen, Preise und Telefonnummern sind erfunden.", "small")]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
