# Arbeitsblatt DTB B2 Prüfung: Hören Teil 1–4 (Strategien, Fallen, Übungen; Hörtexte zum Vorlesen im Lösungsteil)
# Format laut offiziellem Modelltest DTB B2 (telc, Übungstest 1, 2022): Zeiten, Punkte, Aufgabenzahl, jeder Text einmal. Eigene Texte, keine Originalaufgaben.
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
    R("Gespräche im Team, Meinungen und Argumente, eine Firmenpräsentation, Nachrichten auf dem Anrufbeantworter – "
      "so hören Sie gezielt und vermeiden die typischen Fallen.", "lead"),
    R("So läuft der Prüfungsteil Hören", "h2"),
    box(R("Sie haben für <b>alle vier Teile zusammen 20 Minuten</b>. Lesen Sie vor jedem Hörtext die Aufgaben. "
          "<b>Sie hören alle Teile nur einmal.</b> Vor Teil 2 und 3 haben Sie je eine Minute Lesezeit. "
          "Jede richtige Aufgabe zählt 3 Punkte (laut offiziellem Modelltest, telc 2022).", "cell"), NOTE, GELB),
    Spacer(1, 4),
    table([
        ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
        ["<b>1</b> Arbeitsabläufe, Probleme, Vorschläge", "3 kurze Gespräche unter Kolleginnen und Kollegen. Zu jedem Gespräch: "
         "1 Aussage richtig/falsch und 1 Aufgabe mit a, b oder c.", "ca. 5 Min.", "6 × 3 = 18"],
        ["<b>2</b> Argumentationen nachvollziehen", "4 kurze Gespräche am Arbeitsplatz, 6 Sätze (a–f): Welcher Satz passt zu welchem "
         "Gespräch? 2 Sätze bleiben übrig. 1 Minute Lesezeit.",
         "ca. 5 Min.", "4 × 3 = 12"],
        ["<b>3</b> Unternehmensinformationen", "Eine Präsentation über ein Unternehmen: 4 Aufgaben mit a, b oder c.", "ca. 5 Min.", "4 × 3 = 12"],
        ["<b>4</b> Anliegen am Telefon", "5 Nachrichten auf dem Anrufbeantworter: je 1 Aufgabe mit a, b oder c.", "ca. 5 Min.", "5 × 3 = 15"],
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
    "Teil 2 · Argumentationen nachvollziehen",
    ["Lesezeit (1 Min.): <b>Thema</b> und <b>Begründung</b> unterstreichen.",
     "Gleiches Thema? Die Begründung entscheidet.",
     "Bis zum Schluss hören: Wer überzeugt wen?"],
    ["Die erste Meinung ist nicht das Ergebnis.",
     "Gleiches Wort, andere Aussage.",
     "Zwei Sätze bleiben übrig."])]
s += task(2, "Vier kurze Gespräche, sechs Sätze", "Sie hören vier kurze Gespräche am Arbeitsplatz. Welcher Satz (a–f) passt zu "
          "welchem Gespräch? Zwei Sätze passen nicht. Sie haben jetzt <b>eine Minute</b> Zeit, die Sätze zu lesen. "
          "Sie hören jedes Gespräch <b>einmal</b>.", 2)
u2 = ["Eine genaue Dokumentation schützt den Betrieb, wenn sich Kundinnen oder Kunden später beschweren.",
      "Ein Schichtplan per App spart der Teamleitung vor allem Arbeit.",
      "Beschäftigte sollten kleine Probleme selbst lösen dürfen, weil schnelle Hilfe Kunden zufriedener macht.",
      "Wenn Beschäftigte ihre Schichten mitplanen, sind sie zufriedener und fallen seltener aus.",
      "Über Entschädigungen für Kundinnen und Kunden sollte nur die Leitung entscheiden.",
      "Feste Telefonzeiten verbessern die Betreuung der Patientinnen und Patienten in der Praxis."]
_c = [R(f"<b>{l})</b> {t}", "tip") for l, t in zip("abcdef", u2)]
_t = Table([[_c[i], _c[i + 1]] for i in range(0, 6, 2)], colWidths=[87 * mm] * 2)
_t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
s += [_t, Spacer(1, 3),
      R("&nbsp;&nbsp;&nbsp;&nbsp;".join(f"<b>Gespräch {i}:</b> {LINE_}" for i in range(1, 5)), "item"),
      R("<b>Mehr Übung:</b> Arbeitsblatt ‚DTB B2 Hören Teil 2: vier kurze Gespräche, sechs Sätze‘", "small")]

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

s += script("Teil 2 · Gespräch 1 – in einem Logistiklager (Paulina, Emeka)", [
    ("Emeka", "Paulina, ich hab gehört, ab nächsten Monat tragen wir unsere Wunschschichten selbst in eine App ein?"),
    ("Paulina", "Genau. Jeder trägt ein, wann er gern arbeiten möchte, und ich plane dann auf dieser Grundlage."),
    ("Emeka", "Na ja, dann spart dir die App wenigstens viel Arbeit."),
    ("Paulina", "Ehrlich gesagt nicht. Ich muss mehr abstimmen als vorher. Aber im Nachbarlager machen sie das seit einem Jahr, "
                "und dort gibt es deutlich weniger Krankmeldungen. Wer mitplanen darf, kann Familie und Arbeit besser verbinden – "
                "und ist einfach zufriedener."),
    ("Emeka", "Stimmt, das merk ich ja selbst, wenn mein Dienst zur Kita passt."),
])
s += script("Teil 2 · Gespräch 2 – in einem Elektrobetrieb (Ayşe, Goran)", [
    ("Goran", "Ayşe, muss ich wirklich vor jedem Auftrag die ganze Wohnung fotografieren? Das kostet jedes Mal zehn Minuten."),
    ("Ayşe", "Ja, bitte. Erinnerst du dich an den Kunden in der Bergstraße? Der hat behauptet, wir hätten seinen Parkettboden zerkratzt."),
    ("Goran", "Ach, der. Die Kratzer waren doch schon vorher da."),
    ("Ayşe", "Eben. Aber beweisen konnten wir es nicht – und am Ende hat der Betrieb bezahlt. Mit Fotos wäre das nicht passiert."),
    ("Goran", "Okay, verstanden. Dann lieber zehn Minuten fotografieren als so einen Ärger."),
])
s += script("Teil 2 · Gespräch 3 – in einer Hausarztpraxis (Mariana, Jonas)", [
    ("Jonas", "Mariana, stimmt das? Ab Januar gehen wir nur noch von acht bis zehn ans Telefon? Die Patienten werden sich ärgern."),
    ("Mariana", "Am Anfang vielleicht. Aber überleg mal, wie es jetzt ist: Das Telefon klingelt ständig, und die Leute am Empfang "
                "müssen warten. Neulich hab ich einer Patientin vor lauter Stress das falsche Rezept gegeben."),
    ("Jonas", "Hm, das passiert mir auch manchmal."),
    ("Mariana", "Wenn wir feste Telefonzeiten haben, können wir uns um die Menschen in der Praxis in Ruhe kümmern. "
                "Termine kann man ja zusätzlich online buchen."),
    ("Jonas", "Gut, so gesehen ist das für alle besser."),
])
s += script("Teil 2 · Gespräch 4 – im Kundenservice eines Möbelhauses (Hamid, Lena)", [
    ("Hamid", "Lena, ich finde, wir sollten Kunden bei kleinen Problemen selbst einen Gutschein geben dürfen. Zum Beispiel, "
              "wenn ein Schrank mit einem kleinen Kratzer geliefert wird."),
    ("Lena", "Das sollte lieber die Chefin entscheiden. Sonst geben wir zu viel Geld aus."),
    ("Hamid", "Aber bis die Chefin antwortet, vergehen oft drei, vier Tage. Der Kunde ruft dreimal an und wird immer wütender. "
              "Wenn ich ihm sofort helfen kann, ist er zufrieden und kauft wieder bei uns."),
    ("Lena", "Hm. Wenn es eine Grenze gibt, sagen wir zwanzig Euro, bin ich dabei."),
])
s += [KeepTogether([R("Lösungen Teil 2", "solh")] + [R(t, "sol") for t in [
    "<b>Gespräch 1: d · Gespräch 2: a · Gespräch 3: f · Gespräch 4: c</b> · übrig: b und e",
    "<b>1 d</b> – Wer mitplanen darf, ist zufriedener, weniger Krankmeldungen. <i>Falle b:</i> Paulina sagt, die App spart ihr <b>keine</b> Arbeit.",
    "<b>2 a</b> – Mit Fotos kann der Betrieb beweisen, dass der Schaden schon vorher da war.",
    "<b>3 f</b> – Feste Telefonzeiten: mehr Ruhe für die Patientinnen und Patienten in der Praxis.",
    "<b>4 c</b> – Schnelle Hilfe macht Kunden zufrieden. <i>Falle e:</i> Das ist Lenas erste Meinung – Hamid überzeugt sie.",
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
