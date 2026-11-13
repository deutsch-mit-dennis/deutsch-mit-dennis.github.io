# Arbeitsblatt DTB B2 Prüfung: Hören Teil 1–4 (Strategien, Fallen, Übungen; Hörtexte zum Vorlesen im Lösungsteil)
# Format laut sim/dtb-b2.js (Aufgabentypen, Anweisungen, Zeiten, jeder Text einmal). Eigene Texte, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-hoeren.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, MUTED, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b2-hoeren"
TITLE = "DTB B2 Hören: Arbeitsabläufe, Argumente, Firmeninfos und Telefon"
LEVEL = "B2"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.3, leading=11.5)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.6, leading=11.9, spaceAfter=0.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=3, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.5, leading=11.8, leftIndent=10, firstLineIndent=-10, spaceAfter=2)
st["sub"] = ParagraphStyle("sub", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1, textColor=MUTED)

BOX = sym("☐")
RF = f'<font color="#566078">{BOX} richtig   {BOX} falsch</font>'
LINE_ = '<font color="#8A93A8">____</font>'


def tips_traps(title, tips, traps):
    left = [R("<b>So gehen Sie vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)]
    right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [R(f"– {t}", "tip") for t in traps]
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN), ("BACKGROUND", (1, 0), (1, 0), NOTE),
        ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN), ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return KeepTogether([R(title, "h2"), t])


def abc(nr, q, opts):
    row = [R(f'<font color="#566078">{BOX}</font> {l}) {o}', "tip") for l, o in zip("abc", opts)]
    t = Table([row], colWidths=[56 * mm] * 3, hAlign="RIGHT")
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 2),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 0),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
    return KeepTogether([R(f"<b>{nr}.</b> {q}", "item"), t])


def rf(nr, q):
    t = Table([[R(f"<b>{nr}.</b> {q}", "item"), R(RF, "cell")]], colWidths=[128 * mm, 40 * mm], hAlign="LEFT")
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    return t


def script(title, lines_, bg=SOFT):
    """Transcript to read aloud with heading: one row per speaker turn, may break across pages (heading kept with first rows)."""
    head = R(title, "solh")
    rows = [R(f"<b>{who}:</b> {txt}" if who else txt, "mat") for who, txt in lines_]
    def tb(rs, first, last):
        t = Table([[r] for r in rs], colWidths=[174 * mm])
        t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                               ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                               ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8), ("TOPPADDING", (0, 0), (-1, 0), 6 if first else 1.5),
                               ("BOTTOMPADDING", (0, -1), (-1, -1), 6 if last else 1.5)]))
        return t
    if len(rows) <= 4:
        return [KeepTogether([head, tb(rows, True, True)]), Spacer(1, 3)]
    return [KeepTogether([head, tb(rows[:2], True, False)]), tb(rows[2:], False, True), Spacer(1, 3)]


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("DTB B2 Hören: alle vier Teile", "h1"),
    R("Gespräche im Team, eine Diskussion, eine Firmenpräsentation, Nachrichten auf dem Anrufbeantworter – "
      "so hören Sie gezielt und vermeiden die typischen Fallen.", "lead"),
    R("So läuft der Prüfungsteil Hören", "h2"),
    box(R("Sie haben für <b>alle vier Teile zusammen 20 Minuten</b>. Lesen Sie vor jedem Hörtext die Aufgaben. "
          "<b>Sie hören alle Teile nur einmal.</b> Jede richtige Aufgabe zählt 3 Punkte "
          "(Wertung wie in der Online-Simulation auf deutsch-mit-dennis.de).", "cell"), NOTE, GELB),
    Spacer(1, 4),
    table([
        ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
        ["<b>1</b> Arbeitsabläufe, Probleme, Vorschläge", "3 kurze Gespräche unter Kolleginnen und Kollegen. Zu jedem Gespräch: "
         "1 Aussage richtig/falsch und 1 Aufgabe mit a, b oder c.", "ca. 6 Min.", "6 × 3 = 18"],
        ["<b>2</b> Argumente", "Eine Diskussion, z. B. auf einer Betriebsversammlung: Wer sagt was? 4 Aussagen den Personen zuordnen.",
         "ca. 5 Min.", "4 × 3 = 12"],
        ["<b>3</b> Unternehmensinformationen", "Eine Präsentation über ein Unternehmen: 4 Aufgaben mit a, b oder c.", "ca. 5 Min.", "4 × 3 = 12"],
        ["<b>4</b> Anliegen am Telefon", "5 Nachrichten auf dem Anrufbeantworter: je 1 Aufgabe mit a, b oder c.", "ca. 6 Min.", "5 × 3 = 15"],
    ], [50, 86, 18, 20]),
    Spacer(1, 4),
    box(R(f"<b>Ohne Audio üben – so geht’s:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest die Hörtexte aus dem "
          f"Lösungsteil (ab Seite 4) laut vor: in normalem Tempo, jeden Text <b>nur einmal</b>. Wer zuhört, deckt den Lösungsteil ab "
          f"und liest nicht mit. Bei Dialogen lesen am besten zwei Personen.", "cell"), HELLGRUEN, GRUEN),
]

# ───────────────────────── Teil 1 ─────────────────────────
s += [tips_traps(
    "Teil 1 · Arbeitsabläufe, Probleme, Vorschläge",
    ["Lesen Sie vor jedem Gespräch beide Aufgaben und markieren Sie Schlüsselwörter.",
     "Achten Sie auf Vorschläge: <i>Weißt du was? · Dann machen wir’s so: … · Nimm doch …</i>",
     "Warten Sie auf das Ende – dort wird meist entschieden.",
     "Entscheiden Sie sofort nach dem Gespräch. Es gibt keine Wiederholung."],
    ["Ein Vorschlag wird gemacht – und dann verworfen.",
     "Die Lösung betrifft die andere Person: Wer macht was?",
     "Eine Zeitangabe wird später korrigiert."])]
s += task(1, "Drei Gespräche im Betrieb", "Sie hören drei kurze Gespräche unter Kolleginnen und Kollegen. Zu jedem Gespräch gibt es eine "
          "Aussage (richtig oder falsch) und eine Aufgabe (a, b oder c). Sie hören jedes Gespräch einmal.", 2)
s += [R("Gespräch 1 – in einer Kfz-Werkstatt", "sub"),
      rf(1, "Die Hebebühne wird heute noch repariert."),
      abc(2, "Wo wird der Ölwechsel um elf Uhr gemacht?", ["in der Grube", "auf Hebebühne eins", "in einer anderen Werkstatt"]),
      R("Gespräch 2 – in einem Versicherungsbüro", "sub"),
      rf(3, "Frau Berger übernimmt die Urlaubsvertretung von Jamal."),
      abc(4, "Was macht Jamal mit den Großkunden?", ["Er gibt sie an Svetlana weiter.", "Er ruft sie heute selbst an.",
                                                     "Er schreibt ihnen eine Abwesenheitsnotiz."]),
      R("Gespräch 3 – in einer Betriebskantine", "sub"),
      rf(5, "Heute gibt es eine andere Suppe als geplant."),
      abc(6, "Was macht Dmitri?", ["Er ruft beim Großmarkt an.", "Er ändert die Information am Eingang.", "Er schält die Süßkartoffeln."])]

# ───────────────────────── Teil 2 ─────────────────────────
s += [tips_traps(
    "Teil 2 · Argumente",
    ["Merken Sie sich vor dem Hören Namen und Rollen der Personen.",
     "Lesen Sie die Aussagen: Wer würde das wohl sagen?",
     "Notieren Sie beim Hören zu jeder Person 1–2 Stichwörter.",
     "Achten Sie auf Widerspruch: <i>Ehrlich gesagt … · Das klingt gut, aber …</i>"],
    ["Eine Person nennt ein Argument nur, um es zu kritisieren.",
     "Zwei Personen sprechen über ähnliche Themen.",
     "Die Aussage ist umformuliert, nicht wörtlich."])]
s += task(2, "Wer sagt was?", "Sie hören einen Ausschnitt aus einer Abteilungsbesprechung bei den Stadtwerken Lindau-Nord. Es geht um den "
          "Umzug in ein offenes Büro mit Desk-Sharing (ohne feste Schreibtische). Wer sagt was? Ordnen Sie die Aussagen 1–4 den Personen zu. "
          "Sie hören die Diskussion einmal.", 2)
s += [box(R("<b>a)</b> Frau Abara (Personalrat)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>b)</b> Herr Lindqvist (IT)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>c)</b> Frau Demir (Sachbearbeitung)", "cell"), SOFT),
      Spacer(1, 3)]
u2 = ["Weil viele Beschäftigte zu Hause arbeiten, bleiben Plätze im Büro oft leer.",
      "Wer telefoniert oder sich konzentrieren muss, braucht einen ruhigen Ort.",
      "Wenn alle jeden Tag woanders sitzen, leidet der Zusammenhalt im Team.",
      "Die Beschäftigten sollen keine eigenen Geräte an ihren Platz mitbringen."]
s += [R(f"<b>{i}.</b> {t}   Person: {LINE_}", "item") for i, t in enumerate(u2, 1)]

# ───────────────────────── Teil 3 ─────────────────────────
s += [tips_traps(
    "Teil 3 · Unternehmensinformationen",
    ["Lesen Sie alle vier Aufgaben vorher – sie folgen der Reihenfolge des Vortrags.",
     "Achten Sie auf Zeitformen: Was war, was ist, was wird?",
     "Achten Sie auf Einschränkungen: <i>nur, noch nicht, erst</i>.",
     "Notieren Sie Zahlen kurz – falsche Lösungen spielen gern mit Zahlen."],
    ["Etwas Vergangenes wird als Plan angeboten.",
     "Etwas gilt nur für eine Gruppe, nicht für alle.",
     "„Wir sind zuversichtlich“ heißt nicht „Es ist sicher“."])]
s += task(3, "Eine Firma stellt sich vor", "Sie hören eine Präsentation am Stand einer Firma auf einer Jobmesse. "
          "Welche Lösung (a, b oder c) ist richtig? Sie hören die Präsentation einmal.", 3)
s += [abc(1, "Was stellt die Firma selbst her?", ["Fenster aus Holz, Kunststoff und Aluminium", "Fenster aus Holz und Kunststoff", "nur Fenster aus Holz"]),
      abc(2, "Was ist für das nächste Jahr geplant?", ["eine neue Produktionshalle", "eine Solaranlage auf dem Dach", "der Export nach Dänemark"]),
      abc(3, "Wer kann ein Dienstfahrrad leasen?", ["alle ab dem ersten Arbeitstag", "nur die Monteure im Außendienst", "alle nach sechs Monaten in der Firma"]),
      abc(4, "Was gilt für den Deutschkurs im Betrieb?", ["Er findet während der Arbeitszeit statt.", "Die Hälfte der Zeit zählt als Arbeitszeit.",
                                                         "Er ist nur für Quereinsteiger."])]

# ───────────────────────── Teil 4 ─────────────────────────
s += [tips_traps(
    "Teil 4 · Anliegen am Telefon",
    ["Lesen Sie die Frage genau: Warum ruft jemand an? Was soll man tun? Was ändert sich?",
     "Achten Sie auf Korrekturen: <i>äh, nein · das ist nicht das Problem · haben wir schon</i>.",
     "Die Bitte steht oft am Ende: <i>Könnten Sie bitte …? · Denken Sie bitte an …</i>"],
    ["Die Person nennt etwas, das gerade <b>kein</b> Problem ist.",
     "Etwas ist schon erledigt, steht aber als Lösung da.",
     "Eine Zahl wird korrigiert."])]
s += task(4, "Nachrichten auf dem Anrufbeantworter", "Sie arbeiten im Büro des Malerbetriebs Farbwerk Schulz in Kassel. Sie hören fünf "
          "Nachrichten auf dem Anrufbeantworter. Welche Lösung (a, b oder c) ist richtig? Sie hören jede Nachricht einmal.", 3)
s += [abc(1, "Warum ruft Frau Adeyemi an?", ["Sie möchte den Termin verschieben.", "Sie möchte eine andere Farbe.", "Sie beschwert sich über den Preis."]),
      abc(2, "Was bietet Herr Kowalczyk an?", ["eine Lieferung am Freitag", "die Abholung im Lager", "zwanzig statt sechzehn Eimer"]),
      abc(3, "Worum bittet Arne?", ["Jemand soll Yusuf sagen, wo der Schlüssel ist.", "Jemand soll ihm die Krankmeldung schicken.",
                                   "Jemand soll den Schlüssel aus seinem Auto holen."]),
      abc(4, "Was möchte Frau Fuchs?", ["ein neues Angebot per E-Mail", "einen Termin für das Erdgeschoss", "das Angebot noch einmal per Post"]),
      abc(5, "Was soll der Betrieb tun?", ["Daria am Mittwoch freigeben", "Daria am Freitag nicht einplanen", "den Unterricht absagen"])]

# ───────────────────────── Auswertung ─────────────────────────
s += [Spacer(1, 8), KeepTogether([R("Nach dem Hören: Ihre Auswertung", "h3"), table([
    ["<b>Teil 1</b>", "<b>Teil 2</b>", "<b>Teil 3</b>", "<b>Teil 4</b>", "<b>Summe</b>"],
    ["____ / 18", "____ / 12", "____ / 12", "____ / 15", "____ / 57"],
], [34.8] * 5), Spacer(1, 4),
    R("Welche Falle hat Sie erwischt? Notieren Sie sie – beim nächsten Mal hören Sie genau darauf.", "small"), lines(2, indent=0)])]

# ───────────────────────── Hörtexte + Lösungen ─────────────────────────
s += [PageBreak(), R("Texte zum Vorlesen (Partner/Lehrkraft) und Lösungen", "h2"),
      R("Wer zuhört, liest hier nicht mit! Jeden Text nur einmal vorlesen, in normalem Tempo.", "small")]

s += script("Teil 1 · Gespräch 1 – in einer Kfz-Werkstatt (Ines, Bilal)", [
    ("Ines", "Bilal, hast du schon gesehen? Die Hebebühne zwei geht nicht mehr hoch. Da blinkt nur so ein rotes Licht."),
    ("Bilal", "Ja, hab ich heute früh gemerkt. Ich hab schon beim Hersteller angerufen. Der Techniker kommt aber erst am Mittwoch."),
    ("Ines", "Erst Mittwoch? Und was machen wir mit dem Kunden um elf, mit dem Ölwechsel? Sollen wir ihm absagen?"),
    ("Bilal", "Nee, absagen wär blöd, der wartet schon seit zwei Wochen auf den Termin. Ich dachte erst, wir nehmen die Grube hinten …"),
    ("Ines", "Die Grube ist doch gesperrt, da wird gerade der Boden neu gemacht."),
    ("Bilal", "Stimmt, hab ich ganz vergessen. Dann machen wir’s so: Ich zieh meinen Reifenwechsel auf Bühne eins vor, bin bis halb elf "
              "fertig, und um elf nimmst du die Bühne für den Ölwechsel."),
    ("Ines", "Gut, so machen wir’s."),
])
s += script("Teil 1 · Gespräch 2 – in einem Versicherungsbüro (Svetlana, Jamal)", [
    ("Svetlana", "Jamal, du bist ja ab Montag zwei Wochen weg. Wer kümmert sich eigentlich um deine Kundenanfragen?"),
    ("Jamal", "Eigentlich sollte Frau Berger das übernehmen. Aber sie ist krankgeschrieben, bis Ende nächster Woche."),
    ("Svetlana", "Oh. Soll ich das machen? Ich hab allerdings in der ersten Woche zwei Tage Fortbildung."),
    ("Jamal", "Hm. Weißt du was? Ich richte eine Abwesenheitsnotiz ein, und die dringenden Fälle gehen an das Sammelpostfach vom Team. "
              "Da schaut jeden Tag jemand rein."),
    ("Svetlana", "Gute Idee. Und die Großkunden?"),
    ("Jamal", "Die ruf ich heute Nachmittag noch selbst an und sag ihnen Bescheid."),
])
s += script("Teil 1 · Gespräch 3 – in einer Betriebskantine (Amara, Dmitri)", [
    ("Amara", "Dmitri, schau mal: Die haben uns Süßkartoffeln geliefert statt normale Kartoffeln. Und heute steht Kartoffelsuppe auf dem Plan."),
    ("Dmitri", "Echt jetzt? Soll ich beim Großmarkt anrufen, ob die heute noch mal liefern?"),
    ("Amara", "Das schaffen die nie bis zwölf. Weißt du was? Wir machen einfach eine Süßkartoffelsuppe mit Ingwer. Das passt auch."),
    ("Dmitri", "Okay. Aber dann muss die Tafel am Eingang geändert werden, wegen der Allergene."),
    ("Amara", "Machst du das? Ich fang schon mal mit dem Schälen an. Und beim Großmarkt rufe ich nach dem Mittagsservice an, wegen der Gutschrift."),
])
s += [KeepTogether([R("Lösungen Teil 1", "solh")] + [R(t, "sol") for t in [
    "<b>1 falsch</b> – Der Techniker kommt erst am Mittwoch.",
    "<b>2 b</b> – Bilal macht Bühne eins bis halb elf frei. <i>Falle a:</i> Die Grube ist gesperrt.",
    "<b>3 falsch</b> – Frau Berger sollte vertreten, ist aber krankgeschrieben.",
    "<b>4 b</b> – „Die ruf ich heute Nachmittag noch selbst an.“ Die Abwesenheitsnotiz gilt allgemein.",
    "<b>5 richtig</b> – Süßkartoffelsuppe mit Ingwer statt Kartoffelsuppe.",
    "<b>6 b</b> – Dmitri ändert die Tafel. <i>Falle:</i> Amara schält und ruft später beim Großmarkt an.",
]])]

s += script("Teil 2 · Abteilungsbesprechung (Herr Fischer moderiert, liest neutral)", [
    ("Herr Fischer", "Guten Morgen zusammen. Wie Sie wissen, ziehen wir im Frühjahr in das neue Gebäude. Geplant ist ein offenes Büro mit "
                     "Desk-Sharing: Niemand hat mehr einen festen Schreibtisch, man bucht sich morgens einen Platz per App. Ich möchte heute "
                     "Ihre Meinungen hören. Frau Abara, Sie sind vom Personalrat."),
    ("Frau Abara", "Danke. Wir sind nicht grundsätzlich dagegen. Aber in einem offenen Raum mit vierzig Leuten ist es laut. Wer viel telefoniert "
                   "oder sich konzentrieren muss, braucht ruhige Räume. Unsere Bedingung ist deshalb: genug kleine Besprechungsräume, die man "
                   "spontan nutzen kann. Und die Tische müssen höhenverstellbar sein – alle, nicht nur ein paar."),
    ("Herr Fischer", "Herr Lindqvist, wie sieht das die IT?"),
    ("Herr Lindqvist", "Technisch ist das kein Problem, Laptops haben ja schon alle. Ehrlich gesagt sehe ich sogar einen Vorteil: Im Moment "
                       "steht an vielen Tagen ein Drittel der Plätze leer, weil die Leute im Homeoffice sind. Mit Desk-Sharing sparen wir Fläche "
                       "und damit Geld. Was ich allerdings nicht möchte: dass jeder seine eigene Maus, Tastatur oder sogar den eigenen Bildschirm "
                       "mitbringt. Das gibt Chaos. Wir statten jeden Platz gleich aus."),
    ("Herr Fischer", "Frau Demir?"),
    ("Frau Demir", "Also, für mich klingt das erst mal nicht so gut. Ich arbeite mit vielen Papierakten, die kann ich nicht jeden Abend wegräumen. "
                   "Und ich habe Angst, dass das Team auseinanderfällt, wenn jeder jeden Tag woanders sitzt. Man sieht sich ja kaum noch. "
                   "Mein Vorschlag wäre: feste Zonen für jedes Team."),
    ("Frau Abara", "Das unterstützen wir."),
])
s += [KeepTogether([R("Lösungen Teil 2", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – Lindqvist: „ein Drittel der Plätze leer, weil die Leute im Homeoffice sind“.",
    "<b>2 a</b> – Abara: „Wer viel telefoniert oder sich konzentrieren muss, braucht ruhige Räume.“",
    "<b>3 c</b> – Demir: „dass das Team auseinanderfällt“. <i>Falle:</i> Abara unterstützt nur die Teamzonen.",
    "<b>4 b</b> – Lindqvist: keine eigene Maus, Tastatur, kein eigener Bildschirm. <i>Falle:</i> Abara meint Tische, keine Geräte.",
]])]

s += script("Teil 3 · Präsentation auf der Jobmesse (Frau Owusu)", [
    ("Frau Owusu", "Herzlich willkommen an unserem Stand! Mein Name ist Mareike Owusu, ich bin Personalleiterin bei Hansen Fenster "
                   "und Türen in Lübeck. Kurz zu uns: Gegründet wurde die Firma 1962 als kleine Tischlerei mit drei Mitarbeitern. Heute sind "
                   "wir 240 Beschäftigte und produzieren Fenster aus Holz und aus Kunststoff. Aluminiumfenster bauen wir übrigens nicht selbst, "
                   "die kaufen wir für unsere Montageteams dazu. Unser Hauptmarkt ist Norddeutschland, und seit zwei Jahren liefern wir auch "
                   "nach Dänemark."),
    ("", "Was ist neu? Letztes Jahr haben wir eine neue Produktionshalle in Bad Schwartau eröffnet. Und im nächsten Jahr möchten wir eine "
         "Photovoltaikanlage auf das Dach bauen. Die Genehmigung haben wir noch nicht, aber wir sind zuversichtlich."),
    ("", "Und was bieten wir Ihnen? Ein Jobticket bekommen alle Beschäftigten. Ein Dienstfahrrad können alle leasen, die mindestens sechs Monate "
         "bei uns sind. Für Quereinsteiger gibt es eine Einarbeitung von acht Wochen mit einer festen Patin oder einem festen Paten. "
         "Und wer sein Deutsch verbessern möchte: Zweimal pro Woche gibt es nach der Arbeit einen Deutschkurs im Betrieb – die Hälfte "
         "der Zeit zählt als Arbeitszeit."),
])
s += [KeepTogether([R("Lösungen Teil 3", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – Holz und Kunststoff. Aluminiumfenster werden nur dazugekauft.",
    "<b>2 b</b> – Photovoltaik „im nächsten Jahr“. Die Halle ist schon eröffnet, Dänemark seit zwei Jahren.",
    "<b>3 c</b> – „mindestens sechs Monate bei uns“. Sofort für alle gibt es nur das Jobticket.",
    "<b>4 b</b> – „die Hälfte der Zeit zählt als Arbeitszeit“. Der Kurs ist nach der Arbeit und für alle.",
]])]

s += script("Teil 4 · Fünf Nachrichten auf dem Anrufbeantworter", [
    ("Nachricht 1", "Guten Tag, hier ist Folake Adeyemi. Ihre Kollegen sollen ja am Donnerstag unser Wohnzimmer streichen. Wir haben uns "
                    "das mit der Farbe noch mal überlegt: bitte nicht Hellgrau, sondern ein warmes Weiß. Am Termin ändert sich nichts. Rufen Sie "
                    "mich bitte kurz zurück, ob das beim Preis einen Unterschied macht. Danke!"),
    ("Nachricht 2", "Hallo, Kowalczyk hier, Farbengroßhandel Nordhessen. Es geht um Ihre Bestellung über zwanzig Eimer Fassadenfarbe – äh, nein, "
                    "sechzehn waren es. Die Lieferung kann leider erst am Montag kommen, nicht am Freitag. Wenn Sie nicht so lange warten "
                    "können, holen Sie die Farbe einfach ab morgen sieben Uhr bei uns im Lager ab."),
    ("Nachricht 3", "Hallo, hier ist Arne. Ich liege mit Fieber im Bett und komme heute und morgen nicht. Die Krankmeldung vom Arzt ist schon "
                    "unterwegs. Wichtig: Der Schlüssel für die Baustelle in der Goethestraße ist in meinem Spind, nicht im Auto. Könnte das bitte "
                    "jemand Yusuf sagen? Danke."),
    ("Nachricht 4", "Guten Tag, Ludmila Fuchs von der Hausverwaltung Sonnenhof. Es geht um das Treppenhaus in der Wilhelmshöher Allee 12. Ihr "
                    "Angebot haben wir bekommen, vielen Dank. Wir hätten gern noch eine Variante ohne das Erdgeschoss, das wurde letztes Jahr "
                    "schon gestrichen. Schicken Sie uns das bitte per E-Mail, nicht per Post."),
    ("Nachricht 5", "Guten Tag, Sander von der Berufsschule. Es geht um Ihre Auszubildende Daria Rybak. Der Unterricht am Mittwoch fällt aus – "
                    "nein, Entschuldigung, er fällt nicht aus, er wird auf Freitag verlegt, gleiche Uhrzeit. Bitte planen Sie Daria am Freitag "
                    "also nicht auf der Baustelle ein."),
])
s += [KeepTogether([R("Lösungen Teil 4", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – „nicht Hellgrau, sondern ein warmes Weiß“. Der Termin bleibt, nach dem Preis fragt sie nur.",
    "<b>2 b</b> – Abholung im Lager ab morgen 7 Uhr. Die Zahl wird korrigiert: sechzehn, nicht zwanzig.",
    "<b>3 a</b> – „Könnte das bitte jemand Yusuf sagen?“ Der Schlüssel ist im Spind, nicht im Auto.",
    "<b>4 a</b> – eine Variante ohne Erdgeschoss, „per E-Mail, nicht per Post“.",
    "<b>5 b</b> – Der Unterricht wird auf Freitag verlegt. <i>Falle:</i> „fällt aus“ wird sofort korrigiert.",
]])]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
