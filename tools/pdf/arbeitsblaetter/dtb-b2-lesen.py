# Arbeitsblatt DTB B2 Prüfung: Lesen Teil 1–4 (Strategien, Fallen, Übungen im Prüfungsformat)
# Format laut offiziellem Modelltest DTB B2 (telc, 2022): Aufgabentypen, Zahl der Aufgaben, Zeit, Punkte. Eigene Texte, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-lesen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b2-lesen"
TITLE = "DTB B2 Lesen: Strategien und Übungen zu allen vier Teilen"
LEVEL = "B2"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.5, leading=12)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.5, leading=11.8, leftIndent=10, firstLineIndent=-10, spaceAfter=2)

BOX = sym("☐")
RF = f'<font color="#566078">{BOX} richtig   {BOX} falsch</font>'
LINE_ = '<font color="#8A93A8">____</font>'


def tips_traps(title, tips, traps):
    """Two boxes side by side: strategy (green) and traps (yellow)."""
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
    """Question with options a–c side by side (compact, like the answer sheet)."""
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


def sbox(paras, bg=SOFT, first=True, last=True):
    """Box that may break across pages: one table row per paragraph."""
    t = Table([[R(p, "mat")] for p in paras], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5), ("TOPPADDING", (0, 0), (-1, 0), 7 if first else 1.5),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 7 if last else 1.5)]))
    return t


def text_with_task(nr, title, hint, level, text, n_head):
    """Task heading + first rows of the text kept together; the rest of the text may break."""
    rows = [x for x in text.split("<br/>") if x]
    return [KeepTogether(task(nr, title, hint, level) + [sbox(rows[:n_head], last=False)]), sbox(rows[n_head:], first=False)]


def head(*flows):
    """Task heading kept together with the first lines that follow."""
    return KeepTogether(list(flows))


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("DTB B2 Lesen: alle vier Teile", "h1"),
    R("Anzeigen, Hausmitteilungen, Forumsantworten, Protokolle: So funktioniert jeder Teil – mit Übungen im Stil der Prüfung.",
      "lead"),
    R("So läuft der Prüfungsteil Lesen", "h2"),
    box(R("Sie haben für <b>alle vier Teile zusammen 45 Minuten</b>. Planen Sie ca. 10–12 Minuten pro Teil ein. "
          "Jede richtige Aufgabe zählt 3 Punkte (laut offiziellem Modelltest, telc 2022).", "cell"),
        NOTE, GELB),
    Spacer(1, 4),
    table([
        ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
        ["<b>1</b> Informationen zum Arbeitsmarkt", "5 Personen, 8 kurze Artikel (a–h): Was passt zu wem? Drei bleiben übrig. (Übung hier: Anzeigen.)", "ca. 12 Min.", "5 × 3 = 15"],
        ["<b>2</b> Anweisungen verstehen", "2 Texte, zu jedem 1 Aussage richtig/falsch und 1 Aufgabe a, b, c. (Übung hier: 1 Text.)", "ca. 10 Min.", "4 × 3 = 12"],
        ["<b>3</b> Arbeitsbedingungen", "4 Fragen, 6 Texte (a–f). Zu einer Frage passt kein Text: x. (Übung hier: 5 Texte.)", "ca. 10 Min.", "4 × 3 = 12"],
        ["<b>4</b> Aufgaben und Aufgabenverteilung", "Protokoll einer Teambesprechung: 5 Aufgaben mit a, b oder c.", "ca. 12 Min.", "5 × 3 = 15"],
    ], [44, 92, 18, 20]),
]

# ───────────────────────── Teil 1 ─────────────────────────
s += [
    tips_traps("Teil 1 · Informationen zum Arbeitsmarkt",
        ["Unterstreichen Sie bei jeder Person 2–3 harte Bedingungen (z. B. nur vormittags, berufsbegleitend, anerkannter Abschluss).",
         "Prüfen Sie jede Anzeige gegen <b>alle</b> Bedingungen – eine passende reicht nicht.",
         "Beginnen Sie mit der eindeutigsten Person und streichen Sie benutzte Anzeigen durch."],
        ["Der Beruf passt, aber die Arbeitszeit nicht.",
         "Eine Vollzeit-Weiterbildung für jemanden, der seine Stelle behalten will.",
         "Viele gleiche Wörter wie in der Situation – aber eine Bedingung fehlt."]),
]
s += task(1, "Welche Anzeige passt?", "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? "
          "Jede Anzeige können Sie nur einmal verwenden. Drei Anzeigen bleiben übrig.", 2)
sit = [
    "Thi Lan N. ist gelernte Kauffrau für Büromanagement. Ihre Kinder gehen zur Schule, deshalb kann sie nur vormittags arbeiten – höchstens 20 Stunden pro Woche.",
    "Kemal A. hat in der Türkei als Elektriker gearbeitet. Sein Abschluss wurde in Deutschland nur teilweise anerkannt. Er möchte die fehlenden Inhalte nachholen.",
    "Grażyna W. fährt seit acht Jahren Lkw (Führerschein CE). Sie möchte nicht mehr wochenlang unterwegs sein, sondern jeden Abend zu Hause schlafen.",
    "Daniel O. arbeitet als Koch in Vollzeit in einem Hotel. Er möchte Küchenmeister werden, aber seine Stelle auf keinen Fall aufgeben.",
    "Mariana C. hat lange im Verkauf gearbeitet und ist zurzeit arbeitslos. Mit einem Bildungsgutschein möchte sie einen anerkannten IT-Berufsabschluss machen. Sie kann tagsüber lernen.",
]
s += [R(f"<b>{i}.</b> {t}   Anzeige: {LINE_}", "item") for i, t in enumerate(sit, 1)]
ads = [
    ("a) Transnord Logistik, Hamburg", "Berufskraftfahrer/in CE im internationalen Fernverkehr. Touren von zwei bis drei Wochen durch Skandinavien, sehr gute Bezahlung, Spesen und moderne Fahrzeuge."),
    ("b) Gastro-Akademie Rhein, Köln", "Küchenmeister/in (IHK) – berufsbegleitend in 18 Monaten. Online-Unterricht dienstags und donnerstags von 19 bis 21:30 Uhr, Praxistage an zwei Samstagen im Monat."),
    ("c) Hausverwaltung Brinkmann, Essen", "Kaufmännische/r Angestellte/r in Teilzeit (18–20 Std.). Arbeitszeit Montag bis Freitag von 8 bis 12 Uhr. Abgeschlossene kaufmännische Ausbildung erwünscht."),
    ("d) Elektro Kranich GmbH, Duisburg", "Elektroniker/in (m/w/d) für Gebäudetechnik. Voraussetzung: abgeschlossene, in Deutschland anerkannte Ausbildung. Wir zahlen übertariflich."),
    ("e) Digitalcampus Ruhr, Bochum", "Umschulung Fachinformatik (IHK) in 24 Monaten, Vollzeit, Montag bis Freitag 8:30–15:30 Uhr inklusive Praktikum. Förderung mit Bildungsgutschein möglich."),
    ("f) Autohaus Sommerfeld, Mülheim", "Bürokraft (m/w/d) in Teilzeit, 20 Std. pro Woche. Arbeitszeit montags bis freitags von 13 bis 17 Uhr. Kaufmännische Ausbildung von Vorteil."),
    ("g) Bildungszentrum Handwerk Lippe, Detmold", "Anpassungsqualifizierung für Elektrofachkräfte mit Teilanerkennung: Sie lernen genau die Inhalte, die laut Ihrem Bescheid noch fehlen. Danach können Sie die volle Anerkennung beantragen."),
    ("h) Spedition Okafor & Lind, Dortmund", "Berufskraftfahrer/in CE im Nahverkehr. Touren im Umkreis von 80 km, Montag bis Freitag, Feierabend jeden Tag zu Hause."),
]
cells = [[R(f"<b>{h}</b><br/>{t}", "mat") for h, t in ads[i:i + 2]] for i in range(0, 8, 2)]
ta = Table(cells, colWidths=[87 * mm, 87 * mm])
ta.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOX", (0, 0), (-1, -1), 0.4, LINE),
                        ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
s += [Spacer(1, 3), ta]

# ───────────────────────── Teil 2 ─────────────────────────
s += [
    tips_traps("Teil 2 · Anweisungen verstehen",
        ["Lesen Sie zuerst die Aufgaben und markieren Sie das Thema jeder Aufgabe.",
         "Suchen Sie den passenden Absatz – die Reihenfolge folgt meist dem Text.",
         "Achten Sie auf kleine Wörter: <i>nur, auch, neu, wie bisher, Ausnahme</i>.",
         "Richtig/Falsch: Ein einziges falsches Detail macht die Aussage falsch."],
        ["„alle“ oder „immer“ in der Aussage, aber eine Ausnahme im Text.",
         "Vertauschte Zuständigkeiten (Verwaltung statt Leitung).",
         "Alte und neue Regel werden verwechselt."]),
]
T2_HINT = ("Lesen Sie die Hausmitteilung und die Aufgaben 1–4. Sind die Aussagen 1 und 2 richtig oder falsch? "
           "Welche Lösung (a, b oder c) ist bei den Aufgaben 3 und 4 richtig?")
memo = (
    "<b>Pflegedienst Lebenswert Ambulant, Krefeld · Hausmitteilung 7/2026</b><br/>"
    "<b>Neue Regeln für unsere Dienstwagen – gültig ab 1. Dezember</b><br/><br/>"
    "Liebe Kolleginnen und Kollegen,<br/>seit Kurzem fahren wir sechs neue Elektroautos. Damit alles reibungslos läuft, gilt ab 1. Dezember Folgendes:<br/>"
    "<b>Fahrtenbuch:</b> Das Fahrtenbuch aus Papier wird abgeschafft. Sie tragen jede Fahrt in der App „TourPlan“ ein – auch kurze Fahrten "
    "zur Apotheke. Wer noch keinen Zugang hat, meldet sich bitte bei Frau Yıldız in der Verwaltung, nicht bei der Pflegedienstleitung.<br/>"
    "<b>Laden:</b> Nach Dienstschluss schließen Sie das Auto an eine Ladesäule im Hof an. Ausnahme: Zeigt der Akku noch mehr als 70 Prozent, "
    "darf das Auto bis zum nächsten Morgen ungeladen stehen bleiben. Die Ladekarte für öffentliche Säulen nutzen Sie bitte nur, wenn Sie "
    "Ihre Tour sonst nicht schaffen.<br/>"
    "<b>Private Fahrten:</b> Wie bisher sind private Fahrten mit den Dienstwagen nicht erlaubt. Neu ist: Wer Rufbereitschaft hat, darf das "
    "Auto über Nacht mit nach Hause nehmen.<br/>"
    "<b>Schäden:</b> Kratzer oder Warnleuchten melden Sie sofort mit einem Foto in der App. Bei einem Unfall rufen Sie zuerst die Polizei "
    "und danach die Notfallnummer des Büros an.<br/>"
    "<b>Einweisung:</b> Alle, die noch nie ein Elektroauto gefahren sind, nehmen an einer Einweisung (30 Minuten) teil: am 24. oder "
    "26. November, jeweils um 14 Uhr. Die Einweisung gilt als Arbeitszeit.<br/><br/>"
    "Viele Grüße<br />Jonas Brandt, Pflegedienstleitung"
)
s += text_with_task(2, "Hausmitteilung", T2_HINT, 2, memo, 4) + [Spacer(1, 4)]
s += [
    rf(1, "Kurze Fahrten, zum Beispiel zur Apotheke, muss man nicht in die App eintragen."),
    rf(2, "Beschäftigte mit Rufbereitschaft dürfen den Dienstwagen nachts bei sich zu Hause parken."),
    abc(3, "Wer noch keinen Zugang zur App hat, …",
        ["wendet sich an die Pflegedienstleitung.", "meldet sich in der Verwaltung.", "benutzt bis Dezember das Fahrtenbuch aus Papier."]),
    abc(4, "Ein Auto muss abends nicht an die Ladesäule, wenn …",
        ["die Tour am nächsten Tag kurz ist.", "der Akku noch über 70 Prozent anzeigt.", "man unterwegs mit der Ladekarte geladen hat."]),
]

# ───────────────────────── Teil 3 ─────────────────────────
s += [
    tips_traps("Teil 3 · Arbeitsbedingungen",
        ["Formulieren Sie zu jeder Frage einen kurzen Satz: Was genau will die Person wissen?",
         "Notieren Sie neben jedem Text sein Kernthema.",
         "Prüfen Sie: Könnte die Person nach dem Lesen ihr Problem lösen?",
         "Rechnen Sie fest damit, dass eine Frage ohne Text bleibt (x)."],
        ["Ein Text hat dasselbe Stichwort (z. B. „krank“), beantwortet aber eine andere Frage.",
         "Zwei Texte zu ähnlichen Themen – nur einer passt genau.",
         "Man vergisst x und erzwingt eine Zuordnung."]),
]
s += task(3, "Ratgeberforum für Beschäftigte", "Lesen Sie die Fragen 1–4 und die Texte a–e. Welcher Text beantwortet welche Frage? "
          "Jeden Text können Sie nur einmal verwenden. Zu einer Frage gibt es keinen passenden Text. Wählen Sie dann x. Zwei Texte bleiben übrig.", 3)
qs = [
    ("Malik, Lagerist", "Ich bin seit drei Monaten in meiner neuen Firma und möchte im Sommer zwei Wochen meine Familie besuchen. Darf ich überhaupt schon Urlaub nehmen?"),
    ("Esther, Friseurin", "Ich war in meinem Urlaub fünf Tage krank und habe ein Attest vom Arzt. Sind diese Urlaubstage jetzt einfach weg?"),
    ("Piotr, Mechatroniker", "Ich möchte am Wochenende zusätzlich als Fahrer für einen Lieferdienst arbeiten. Muss ich meinen Chef fragen?"),
    ("Aylin, Verkäuferin", "Mein Arbeitgeber will, dass ich ab nächstem Monat in einer anderen Filiale arbeite, 30 km entfernt. Muss ich das akzeptieren?"),
]
s += [R(f"<b>{i}.</b> <i>{n}:</i> „{t}“   Text: {LINE_}", "item") for i, (n, t) in enumerate(qs, 1)]
texts = [
    ("a)", "Wenn Sie den Arbeitgeber wechseln, haben Sie Anspruch auf ein schriftliches Arbeitszeugnis. Bitten Sie um ein qualifiziertes Zeugnis: Es beschreibt nicht nur Ihre Aufgaben, sondern auch Ihre Leistung und Ihr Verhalten."),
    ("b)", "Werden Sie im Urlaub krank und haben eine ärztliche Bescheinigung, zählen diese Tage nicht als Urlaub. Informieren Sie Ihren Arbeitgeber sofort. Verlängern dürfen Sie den Urlaub aber nicht einfach selbst – die Tage nehmen Sie später nach Absprache."),
    ("c)", "Wer krank ist, meldet sich am ersten Tag vor Arbeitsbeginn beim Arbeitgeber. Dauert die Krankheit länger als drei Kalendertage, brauchen Sie eine ärztliche Bescheinigung. Manche Arbeitgeber verlangen sie schon ab dem ersten Tag."),
    ("d)", "Den vollen Urlaubsanspruch haben Sie erst nach sechs Monaten im Betrieb. Das heißt aber nicht, dass vorher kein Urlaub möglich ist: Viele Arbeitgeber genehmigen auch in den ersten Monaten Urlaubstage. Sprechen Sie Ihre Pläne früh an."),
    ("e)", "Ein Nebenjob ist grundsätzlich erlaubt. Steht in Ihrem Arbeitsvertrag, dass Sie ihn melden müssen, informieren Sie Ihren Arbeitgeber vorher. Ablehnen darf er nur aus wichtigen Gründen – etwa wenn Sie für die Konkurrenz arbeiten oder insgesamt zu viele Stunden hätten."),
]
s += [Spacer(1, 3), table([[f"<b>{l}</b>", t] for l, t in texts], [10, 164], head=False),
      R("Allgemeine Informationen zum Üben, Stand: November 2026 – keine Rechtsberatung.", "small")]

# ───────────────────────── Teil 4 ─────────────────────────
s += [
    tips_traps("Teil 4 · Aufgaben und Aufgabenverteilung",
        ["Lesen Sie zuerst die Teilnehmerliste und merken Sie sich die Rollen.",
         "Markieren Sie bei jedem TOP (Tagesordnungspunkt): Beschluss – Wer? – Bis wann?",
         "Schreiben Sie Kürzel an den Rand (H = Haddad, R = Romano …).",
         "Achten Sie auf <i>entschuldigt, klärt, bereits, ab</i>."],
        ["Personen werden vertauscht (wer testet, wer informiert, wer organisiert).",
         "Etwas ist schon erledigt – die Option tut so, als wäre es noch offen.",
         "Daten aus verschiedenen TOPs werden gemischt."]),
]

prot = (
    "<b>Hotel Lindenhof, Bonn · Protokoll der Teambesprechung</b><br/>"
    "Datum: 4. November 2026, 14:00–15:00 Uhr · Ort: Seminarraum 2<br/>"
    "Teilnehmende: Nadia Haddad (Hoteldirektorin, Leitung), Grace Mensah (Leitung Housekeeping), Luca Romano (Haustechnik), "
    "Sven Ahlers (Rezeption) · Entschuldigt: Jelena Petrović (Küchenleitung) · Protokoll: Mai Nguyen (Auszubildende)<br/><br/>"
    "<b>TOP 1 – Neues Buchungssystem:</b> Das System startet am 1. Dezember. Herr Ahlers hat es bereits zwei Wochen getestet und "
    "ist zufrieden. Frau Haddad organisiert eine Schulung für die Rezeption am 20. November. Frau Nguyen informiert Frau Petrović "
    "über die neuen Abläufe bei Bestellungen für das Frühstück.<br/>"
    "<b>TOP 2 – Lärm im 3. Stock:</b> Gäste haben sich über laute Geräusche des Aufzugs beschwert. Herr Romano klärt bis Freitag mit der "
    "Aufzugfirma, ob die Wartung vorgezogen werden kann. Bis dahin werden die Zimmer 301–305 nur vergeben, wenn alle anderen Zimmer belegt sind.<br/>"
    "<b>TOP 3 – Personal über Weihnachten:</b> Frau Mensah braucht vom 23. Dezember bis 2. Januar zwei Aushilfen. Frau Haddad hat bereits "
    "eine Zeitarbeitsfirma beauftragt. Frau Mensah erstellt den Dienstplan bis zum 15. November.<br/>"
    "<b>TOP 4 – Handtücher:</b> Beschluss: Ab Januar werden Handtücher nur noch auf Wunsch der Gäste gewechselt. Frau Nguyen gestaltet "
    "Infokarten für die Zimmer, Herr Ahlers prüft die englische Übersetzung.<br/><br/>"
    "Nächste Besprechung: 2. Dezember, 14 Uhr"
)
s += text_with_task(4, "Protokoll einer Teambesprechung", "Lesen Sie das Protokoll und die Aufgaben 1–5. Welche Lösung (a, b oder c) ist richtig?", 3, prot, 4) + [Spacer(1, 4)]
s += [
    abc(1, "Wer erklärt der Küchenleiterin die neuen Abläufe?", ["Herr Ahlers", "Frau Nguyen", "Frau Haddad"]),
    abc(2, "Was gilt für die Zimmer 301–305?",
        ["Sie werden bis zur Wartung gesperrt.", "Sie werden nur vergeben, wenn das Hotel sonst voll ist.", "Die Gäste bekommen dort einen Rabatt."]),
    abc(3, "Was ist zu den Aushilfen richtig?",
        ["Frau Mensah sucht noch eine Zeitarbeitsfirma.", "Eine Zeitarbeitsfirma ist schon beauftragt.", "Die Aushilfen fangen am 15. November an."]),
    abc(4, "Was macht Herr Romano?",
        ["Er repariert den Aufzug bis Freitag.", "Er fragt nach einem früheren Wartungstermin.", "Er testet das neue Buchungssystem."]),
    abc(5, "Ab wann werden Handtücher nur noch auf Wunsch gewechselt?",
        ["ab dem 1. Dezember", "ab Januar", "ab der nächsten Besprechung"]),
]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen mit Begründung", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1 · Teil 1", "solh")] + [R(t, "sol") for t in [
    "<b>1 c</b> – vormittags (8–12 Uhr), 18–20 Std., kaufmännisch. <i>Falle f:</i> Teilzeit, aber nachmittags.",
    "<b>2 g</b> – Anpassungsqualifizierung bei Teilanerkennung. <i>Falle d:</i> passender Beruf, aber nur mit anerkannter Ausbildung.",
    "<b>3 h</b> – Nahverkehr, „Feierabend jeden Tag zu Hause“. <i>Falle a:</i> CE-Führerschein passt, aber Touren von zwei bis drei Wochen.",
    "<b>4 b</b> – berufsbegleitend: abends online und samstags, die Stelle bleibt.",
    "<b>5 e</b> – Umschulung mit IHK-Abschluss, tagsüber, Bildungsgutschein möglich.",
    "Übrig bleiben <b>a, d, f</b>.",
]]
s += [R("Übung 2 · Teil 2", "solh")] + [R(t, "sol") for t in [
    "<b>1 falsch</b> – „jede Fahrt … auch kurze Fahrten zur Apotheke“.",
    "<b>2 richtig</b> – „Wer Rufbereitschaft hat, darf das Auto über Nacht mit nach Hause nehmen.“",
    "<b>3 b</b> – „bei Frau Yıldız in der Verwaltung, nicht bei der Pflegedienstleitung“. Das Papier-Fahrtenbuch wird abgeschafft (c).",
    "<b>4 b</b> – Ausnahme bei mehr als 70 Prozent. Die Ladekarte ist nur für unterwegs, keine Ausnahme vom Laden (c).",
]]
s += [R("Übung 3 · Teil 3", "solh")] + [R(t, "sol") for t in [
    "<b>1 d</b> – Urlaub in den ersten sechs Monaten.",
    "<b>2 b</b> – Krankheit im Urlaub. <i>Falle c:</i> Stichwort „krank“ und „Bescheinigung“, aber es geht um die Krankmeldung bei der Arbeit.",
    "<b>3 e</b> – Nebenjob melden, wenn es im Vertrag steht.",
    "<b>4 x</b> – Kein Text spricht über einen Wechsel der Filiale. <i>Falle a:</i> „wechseln“, aber es geht um den Wechsel des Arbeitgebers und das Zeugnis.",
    "Übrig bleiben <b>a</b> und <b>c</b>.",
]]
s += [R("Übung 4 · Teil 4", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – „Frau Nguyen informiert Frau Petrović“. Herr Ahlers hat nur getestet, Frau Haddad organisiert die Schulung der Rezeption.",
    "<b>2 b</b> – „nur vergeben, wenn alle anderen Zimmer belegt sind“. Gesperrt werden sie nicht.",
    "<b>3 b</b> – „hat bereits … beauftragt“. Der 15. November ist der Termin für den Dienstplan.",
    "<b>4 b</b> – „klärt … ob die Wartung vorgezogen werden kann“. Er repariert nicht selbst.",
    "<b>5 b</b> – „Ab Januar“. Der 1. Dezember gehört zu TOP 1 (Buchungssystem), der 2. Dezember ist die nächste Besprechung.",
]]
s += [Spacer(1, 6), box(R("<b>Ihre Bilanz:</b> 18 Aufgaben × 3 Punkte = 54 Punkte. Welcher Teil war am schwersten? "
                          "Üben Sie genau diesen Teil noch einmal – in der Online-Simulation auf deutsch-mit-dennis.de.", "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
