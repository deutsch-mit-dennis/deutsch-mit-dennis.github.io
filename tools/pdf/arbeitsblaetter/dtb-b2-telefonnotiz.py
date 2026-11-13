# Arbeitsblatt B2 Prüfung: DTB B2 Hören und Schreiben – Anruf verstehen, Telefonnotiz schreiben
# Format laut offiziellem Modelltest DTB B2 (telc, 2022): Hören und Schreiben 5 Min., einmal hören, Teil 1 = 3 Punkte, Teil 2 = 6 Punkte.
# Eigene Aufgaben im Stil der Prüfung; alle Personen, Firmen und Nummern sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-telefonnotiz.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE, MUTED
from reportlab.platypus import Table, TableStyle, CondPageBreak
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtb-b2-telefonnotiz"
TITLE = "DTB B2 Hören und Schreiben: Anruf verstehen, Telefonnotiz schreiben"
LEVEL = "B2"
CB = sym("☐")
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'

st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5)
st["read"] = ParagraphStyle("read", parent=st["cell"], fontSize=9.4, leading=12.3)


def grid(rows, widths, head=True, pad=4):
    data = [[c if not isinstance(c, str) else R(c, "cell") for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def notiz(fuer, heights=(7, 7, 7, 8, 14, 17, 17)):
    """Formular für die Telefonnotiz (Raster aus den Website-Tipps)."""
    rows = [[R('<font size="12"><b>TELEFONNOTIZ</b></font>', "cell"), ""],
            [R("<b>Für</b>", "cell"), R(fuer, "cell")],
            [R("<b>Von · Datum · Uhrzeit</b>", "cell"), ""],
            [R("<b>Anrufer · Firma</b>", "cell"), ""],
            [R("<b>Rückruf</b> (Nummer, wann?)", "cell"), ""],
            [R("<b>Anliegen</b> (Was ist los?)", "cell"), ""],
            [R("<b>Bitte erledigen</b> (auch: „falls …“)", "cell"), ""]]
    t = Table(rows, colWidths=[46 * mm, 128 * mm], rowHeights=[h * mm for h in heights])
    t.setStyle(TableStyle([
        ("SPAN", (0, 0), (-1, 0)), ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
        ("BACKGROUND", (0, 0), (0, -1), SOFT), ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def mc(question, opts):
    return [R(f"<b>{question}</b>", "p")] + [R(f"{CB}  {'abc'[i]}) {o}", "item") for i, o in enumerate(opts)]


s = [
    R("DTB B2 · Prüfungstraining · Hören und Schreiben", "kick"),
    R("Anruf verstehen, Telefonnotiz schreiben", "h1"),
    R("Im Büro, in der Werkstatt, in der Pflege: Wer eine Nachricht für eine Kollegin aufnimmt, muss Namen, Zahlen "
      "und Aufgaben genau notieren. Genau das prüft dieser Teil des DTB B2.", "lead"),
]

# So läuft der Teil
s += [
    R("So läuft der Teil", "h2"),
    grid([
        ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Punkte</b>"],
        ["<b>Hören und Schreiben Teil 1:</b> Anruf eines Kunden",
         "Sie hören eine telefonische Nachricht <b>einmal</b> und lösen eine Aufgabe (a, b oder c) – im Modelltest zum Grund des Anrufs.",
         "3 (Hören)"],
        ["<b>Hören und Schreiben Teil 2:</b> Telefonnotiz",
         "Sie schreiben für eine Kollegin oder einen Kollegen eine Telefonnotiz mit allen wichtigen Informationen. "
         "Stichpunkte sind erlaubt – die Notiz muss aber <b>ohne Rückfrage</b> verständlich sein. "
         "Name, Nummer je 0,5 · Infos 4 · zu erledigen 1.",
         "6 (Schreiben)"],
    ], [50, 100, 24]),
    Spacer(1, 3),
    box(R("<b>Zeit:</b> ca. 5 Minuten für beide Teile, und Sie hören die Nachricht nur einmal (Modelltest telc, 2022). "
          "Machen Sie sich deshalb schon beim Hören Notizen.", "cell"), NOTE, GELB),
]

# Strategie und Fallen
s += [
    R("Strategie: So gehen Sie vor", "h2"),
    R(f"<b>1. Raster vorbereiten.</b> Schreiben Sie vor dem Hören an den Rand: "
      f"{K('Anrufer – Firma – Rückruf – Anliegen – Details – zu tun')}. So wissen Sie, worauf Sie achten müssen.", "item"),
    R("<b>2. Erst das Wichtigste.</b> Notieren Sie zuerst Namen, Anliegen und Zahlen. Ganze Sätze schreiben Sie später.", "item"),
    R("<b>3. Zahlen kontrollieren.</b> Anrufer wiederholen Telefonnummern oft. Hören Sie die Wiederholung und prüfen Sie "
      "Ihre Notiz Ziffer für Ziffer.", "item"),
    R("<b>4. Wie eine Kollegin denken.</b> Fragen Sie sich am Ende: Kann sie mit meiner Notiz <b>sofort handeln</b> – "
      "ohne den Anrufer noch einmal anzurufen?", "item"),
    R("Achtung, Falle!", "h3"),
    table([
        ["<b>Typischer Fehler</b>", "<b>Besser so</b>"],
        ["Telefonnummer falsch notiert (Ziffern vertauscht, eine Ziffer fehlt)",
         "Nummer in Blöcken notieren (0172 / 98 01 33) und mit der Wiederholung vergleichen"],
        ["Den Plan B vergessen: „Falls es heute nicht klappt, …“",
         "Bei <b>falls, wenn nicht, sonst</b> genau hinhören – das gehört unter „Bitte erledigen“"],
        ["Zu kurz: „Herr L. hat angerufen, Heizung kaputt.“",
         "Vollständig: Wer? Welche Firma? Wo? Bis wann? Rückruf unter welcher Nummer?"],
    ], [80, 94]),
]

# Übung 1
s += task(1, "Zahlen und Namen notieren",
          "Partnerarbeit: Ihre Partnerin oder Ihre Lehrkraft liest die sechs Angaben aus dem Lösungsteil "
          "(„Texte zum Vorlesen“) einmal vor. Notieren Sie. Tauschen Sie danach die Rollen.", 1)
u1 = ["Telefon", "Handy", "Auftragsnr.", "Name", "Termin", "Adresse"]
s += [grid([[f"{i}. {u1[i-1]}", "", f"{i+3}. {u1[i+2]}", ""] for i in (1, 2, 3)], [30, 57, 30, 57], head=False, pad=7)]

# Übung 2
u2 = task(2, "Was fehlt in der Notiz?",
          "Lesen Sie die Mailbox-Nachricht und die Notiz. Die Notiz ist zu kurz. Notieren Sie mindestens vier "
          "Informationen, die fehlen oder unklar sind.", 2)
u2 += [
    box(R("<b>Sie arbeiten bei Kfz-Service Tekin in Essen. Mailbox-Nachricht für Frau Rossi (Werkstattannahme):</b><br/>"
          "„Guten Tag, Jonas Albrecht hier. Mein Auto, der graue VW Golf mit dem Kennzeichen E-JA 312, sollte heute um "
          "16 Uhr fertig sein. Ich schaffe es aber erst morgen früh um halb acht, es abzuholen – ist das in Ordnung? "
          "Und könnten Sie bitte noch die Bremsbeläge hinten prüfen? Die quietschen seit ein paar Tagen. Wenn die "
          "Reparatur mehr als 200 Euro kostet, rufen Sie mich bitte vorher an: 0171 / 44 28 093. Danke!“", "read"),
        SOFT),
    Spacer(1, 4),
    box(R('<font name="Cav" size="15" color="#2341B5">Herr Albrecht hat angerufen. Er holt das Auto später. '
          'Bitte Bremsen anschauen und zurückrufen.</font>', "cell"), NOTE, GELB),
    Spacer(1, 2),
]
s += [KeepTogether(u2), lines(4, indent=0)]

# Übung 3 – Anruf A
s += task(3, "Prüfungsaufgabe: Anruf in der Druckerei",
          "Partnerin oder Lehrkraft liest „Anruf A“ aus dem Lösungsteil <b>einmal</b> in normalem Tempo vor. "
          "Lernende schauen den Lösungsteil vorher nicht an.", 2)
s += [
    box(R("<b>Teil 1:</b> Sie arbeiten im Kundenservice der Druckerei <b>Druckwerk Ruhr</b> in Bochum. Ihr Kollege "
          "Herr Brenner (Grafik) ist heute nicht im Büro. Sie hören eine Nachricht auf der Mailbox. "
          "Welche Lösung (a, b oder c) ist richtig? Sie hören die Nachricht einmal.", "cell"), SOFT, TINTE),
    Spacer(1, 3),
]
s += mc("Was möchte Frau Haddad?", [
    "die Flyer früher als geplant selbst abholen",
    "vor dem Druck einen Fehler korrigieren lassen",
    "zusätzlich zu den Flyern zwei Roll-ups bestellen",
])
s += [
    Spacer(1, 4),
    R("<b>Teil 2:</b> Schreiben Sie für Herrn Brenner eine Telefonnotiz zu diesem Anruf. Notieren Sie alle wichtigen "
      "Informationen. Stichpunkte sind erlaubt.", "p"),
    notiz("Herrn Brenner (Grafik)"),
]

# Übung 4 – Anruf B
s += [PageBreak()]
u4 = task(4, "Prüfungsaufgabe: Anruf beim Catering",
          "Wie Übung 3, jetzt mit „Anruf B“. Dieser Anruf enthält mehr Details – und einen Plan B.", 3)
u4 += [
    box(R("<b>Teil 1:</b> Sie arbeiten bei <b>Tafelwerk Catering</b> in Duisburg. Ihre Kollegin Frau Ekström hat die "
          "Bestellung aufgenommen, ist aber heute im Außendienst. Sie hören eine Nachricht auf der Mailbox. "
          "Welche Lösung (a, b oder c) ist richtig? Sie hören die Nachricht einmal.", "cell"), SOFT, TINTE),
    Spacer(1, 3),
]
u4 += mc("Warum ruft Herr Kowalczyk an?", [
    "Er möchte das Essen einen Tag früher bekommen.",
    "Er möchte die Bestellung in mehreren Punkten ändern.",
    "Er möchte, dass das Essen zum Haupteingang geliefert wird.",
])
s += [KeepTogether(u4)]
s += [
    Spacer(1, 4),
    KeepTogether([
        R("<b>Teil 2:</b> Schreiben Sie für Frau Ekström eine Telefonnotiz zu diesem Anruf. Notieren Sie alle "
          "wichtigen Informationen. Stichpunkte sind erlaubt.", "p"),
        notiz("Frau Ekström (Bestellungen)"),
    ]),
    Spacer(1, 4),
    box(R(f"<b>Selbstcheck:</b> {CB} Name und Firma  {CB} Rückrufnummer  {CB} Anliegen in einem Satz  "
          f"{CB} alle Zahlen  {CB} Plan B  {CB} ohne Rückfrage verständlich", "cell"), SOFT),
]

# Lösungen
s += [CondPageBreak(60 * mm), R("Lösungen und Texte zum Vorlesen", "h2"),
      R("Erst üben, dann nachschauen! Lernende decken diesen Teil ab, solange vorgelesen wird.", "small")]

s += [R("Übung 1 – Text zum Vorlesen (Partner/Lehrkraft)", "solh")]
l1 = [
    ("„Meine Telefonnummer ist null zwei drei eins, achtundfünfzig, neunzig, vierzehn.“", "0231 / 58 90 14"),
    ("„Am besten auf dem Handy: null eins sechs null, zweiundsiebzig, null drei, fünfundfünfzig, einundachtzig.“", "0160 / 72 03 55 81"),
    ("„Die Auftragsnummer ist K wie Kaufmann, R wie Richard, Bindestrich, vier, vier, sieben, eins.“", "KR-4471"),
    ("„Mein Name ist Nguyen, ich buchstabiere: N – G – U – Y – E – N.“", "Nguyen"),
    ("„Passt Ihnen Donnerstag, der dritte Dezember, um Viertel nach zwei?“", "Do., 3.12., 14:15 Uhr"),
    ("„Liefern Sie bitte in die Kurze Straße neun a, vier fünf acht sieben neun Gelsenkirchen.“", "Kurze Straße 9a, 45879 Gelsenkirchen"),
]
s += [R(f"{i}. {a} {ARROW} <b>{b}</b>", "sol") for i, (a, b) in enumerate(l1, 1)]

s += [KeepTogether([R("Übung 2 – Das fehlt oder ist unklar", "solh"),
      R("• <b>Welches Auto?</b> Grauer VW Golf, E-JA 312. • <b>Wann genau?</b> Abholung morgen um 7:30 Uhr statt heute "
        "um 16 Uhr – er fragt, ob das in Ordnung ist. • <b>Was prüfen?</b> Nur die Bremsbeläge <b>hinten</b>, sie quietschen. "
        "• <b>Wann zurückrufen?</b> Nur <b>vorher, wenn die Reparatur mehr als 200 Euro kostet</b>. "
        "• <b>Nummer?</b> 0171 / 44 28 093.", "sol")])]

s += [R("Übung 3 – Anruf A: Text zum Vorlesen (Partner/Lehrkraft)", "solh"),
      box(R("„Guten Tag, hier spricht Amira Haddad von der Physiotherapie Haddad in Herne. Ich rufe wegen unseres Auftrags "
            "an, die Auftragsnummer ist vier, sieben, Bindestrich, eins, eins, acht. Es geht um die 500 Flyer und die zwei "
            "Roll-ups für unseren Tag der offenen Tür. Herr Brenner hat mir gestern den Korrekturabzug geschickt, vielen "
            "Dank dafür. Leider ist mir aufgefallen, dass unsere Telefonnummer auf dem Flyer falsch ist. Da steht null zwei "
            "drei zwei drei, fünf neun, vier eins, null sieben. Richtig ist aber: fünf neun, <b>eins vier</b>, null sieben. "
            "Also noch einmal: null zwei drei zwei drei, fünf neun, eins vier, null sieben. Auf den Roll-ups steht die Nummer "
            "nicht, die können Sie also schon drucken. Die Flyer drucken Sie aber bitte erst, wenn ich den neuen Abzug per "
            "E-Mail bekommen und freigegeben habe. Unser Tag der offenen Tür ist am Samstag, deshalb brauchen wir alles "
            "spätestens am Donnerstag. Falls die Lieferung bis Donnerstag nicht klappt, sagen Sie mir bitte Bescheid – dann "
            "hole ich die Sachen am Freitagmorgen selbst bei Ihnen ab. Vormittags habe ich Patienten, am besten erreichen Sie "
            "mich zwischen zwölf und vierzehn Uhr auf dem Handy: null eins fünf sieben, zweiunddreißig, achtzig, "
            "sechsundvierzig, neunzehn. Ich wiederhole: null eins fünf sieben, drei zwei, acht null, vier sechs, eins neun. "
            "Vielen Dank und auf Wiederhören!“", "read"), SOFT),
      R("<b>Teil 1: b.</b> Sie möchte, dass die falsche Telefonnummer auf dem Flyer korrigiert wird, bevor gedruckt wird. "
        "a) Abholen ist nur der Plan B, und zwar nicht früher, sondern am Freitag. c) Die Roll-ups sind schon bestellt.", "sol"),
      R("Teil 2 – Musternotiz", "solh"),
      box(R("<b>TELEFONNOTIZ</b> · Für: Herrn Brenner (Grafik) · Von: [Ihr Name], heute, [Uhrzeit]<br/>"
            "<b>Anrufer:</b> Frau Amira Haddad, Physiotherapie Haddad, Herne · Auftrag 47-118 (500 Flyer, 2 Roll-ups)<br/>"
            "<b>Rückruf:</b> Handy 0157 / 32 80 46 19, nur zwischen 12 und 14 Uhr<br/>"
            "<b>Anliegen:</b> Auf dem Flyer-Abzug ist die Telefonnummer der Praxis falsch (59 41 07). Richtig ist "
            "<b>02323 / 59 14 07</b>. Roll-ups sind in Ordnung.<br/>"
            "<b>Bitte erledigen:</b> 1. Nummer korrigieren, neuen Abzug per E-Mail an Frau Haddad. 2. Flyer erst nach ihrer "
            "Freigabe drucken, Roll-ups schon jetzt. 3. Lieferung spätestens Donnerstag (Tag der offenen Tür am Samstag). "
            "4. Falls Lieferung bis Donnerstag nicht klappt: sie sofort anrufen – sie holt dann Freitagmorgen selbst ab.",
            "read"), HELLGRUEN, GRUEN),
      ]

s += [R("Übung 4 – Anruf B: Text zum Vorlesen (Partner/Lehrkraft)", "solh"),
      box(R("„Ja, schönen guten Tag, Kowalczyk hier, Logistikzentrum Hafen West in Duisburg, Personalabteilung. Ich wollte "
            "eigentlich Frau Ekström sprechen, die hat unsere Bestellung aufgenommen. Es geht um das Mittagessen für unsere "
            "Schulung am Dienstag, dem vierundzwanzigsten November. Bestellt hatten wir für fünfunddreißig Personen. Jetzt "
            "haben sich aber noch mehr Leute angemeldet – wir sind insgesamt zweiundvierzig. Davon essen sechs vegetarisch, "
            "und zwei Kolleginnen brauchen glutenfreies Essen. Und noch etwas: Die Schulung dauert länger als geplant. "
            "Liefern Sie deshalb bitte nicht um zwölf, sondern erst um halb eins. Fahren Sie bitte auch nicht zum "
            "Haupteingang, sondern zu Tor drei an der Hafenstraße, und melden Sie sich dort beim Pförtner. Könnten Sie mir die "
            "Änderung mit dem neuen Preis kurz bestätigen? Meine Nummer ist null zwei null drei, vier vier sieben, null zwei, "
            "sechzehn. Also: null zwei null drei, vier vier sieben, null zwei, eins sechs. Ach ja, und falls Sie kein "
            "glutenfreies Essen anbieten können, sagen Sie mir bitte bis Freitag Bescheid. Dann kümmere ich mich selbst "
            "darum. Danke schön, tschüss!“", "read"), SOFT),
      R("<b>Teil 1: b.</b> Er ändert die Personenzahl, die Uhrzeit und den Lieferort. a) Der Tag bleibt gleich (Dienstag, "
        "24. November). c) Falle: Er sagt ausdrücklich „<b>nicht</b> zum Haupteingang“, sondern zu Tor 3.", "sol"),
      KeepTogether([R("Teil 2 – Musternotiz (andere Formulierungen sind richtig, wenn alle Informationen stimmen)", "solh"),
      box(R("<b>TELEFONNOTIZ</b> · Für: Frau Ekström (Bestellungen) · Von: [Ihr Name], heute, [Uhrzeit]<br/>"
            "<b>Anrufer:</b> Herr Kowalczyk, Logistikzentrum Hafen West, Duisburg, Personalabteilung<br/>"
            "<b>Rückruf:</b> 0203 / 447 02 16<br/>"
            "<b>Anliegen:</b> Änderung der Bestellung Mittagessen für die Schulung am Di., 24.11.: <b>42 Personen</b> statt 35, "
            "davon 6 vegetarisch, 2 glutenfrei · Lieferung erst um <b>12:30 Uhr</b> (nicht 12 Uhr), Schulung dauert länger · "
            "Lieferung an <b>Tor 3, Hafenstraße</b> (nicht Haupteingang), beim Pförtner melden<br/>"
            "<b>Bitte erledigen:</b> 1. Änderung mit neuem Preis bestätigen. 2. Falls wir kein glutenfreies Essen anbieten "
            "können: Herrn Kowalczyk <b>bis Freitag</b> Bescheid geben – er kümmert sich dann selbst darum.",
            "read"), HELLGRUEN, GRUEN)]),
      ]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
