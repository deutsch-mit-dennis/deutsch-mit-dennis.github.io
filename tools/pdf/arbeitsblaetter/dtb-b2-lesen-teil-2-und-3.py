# Arbeitsblatt DTB B2 Prüfung: Lesen Teil 2 (Einweisungen/Unterweisungen) und Teil 3 (Rahmenbedingungen der Arbeit)
# Format laut offiziellem Modelltest DTB B2 (telc, 2022), siehe tools/pdf/b2-formate-offiziell.md:
# Teil 2: 2 Texte, je 1 Richtig/Falsch + 1 Multiple Choice (Aufgaben 6–9). Teil 3: 4 Fragen, 6 Texte a–f, 1 Frage ohne Text = x
# (Aufgaben 10–13), je 3 Punkte. Eigene Texte, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-lesen-teil-2-und-3.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b2-lesen-teil-2-und-3"
TITLE = "DTB B2 Lesen Teil 2 und 3: Anweisungen und Arbeitsbedingungen"
HEAD = "DTB B2 Lesen Teil 2 und 3: Anweisungen und Arbeitsbedingungen"  # page header (max. 70 characters)
LEVEL = "B2"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.4)
st["sit"] = ParagraphStyle("sit", parent=st["item"], fontSize=10.3, leading=13.4, spaceAfter=3)
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


def sbox(paras, bg=SOFT):
    """Text box that may break across pages: one table row per paragraph."""
    t = Table([[R(p, "mat")] for p in paras], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 1.8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8), ("TOPPADDING", (0, 0), (-1, 0), 7),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 7)]))
    return t


# ───────────────────────── Kopf + So läuft der Teil ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Arbeitsblatt · Lesen Teil 2 und 3", "kick"),
    R("DTB B2 Lesen Teil 2 und 3", "h1"),
    R("Sicherheitsunterweisung, Datenschutz-Anweisung, Fragen zu Schichten, Urlaub und Überstunden: ein kompletter "
      "Übungssatz für Teil 2 und Teil 3 – mit den Aufgabennummern wie in der Prüfung.", "lead"),
    R("So läuft der Teil (laut Modelltest, telc 2022)", "h2"),
    table([
        ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Nr.</b>", "<b>Punkte</b>"],
        ["<b>2</b> Einweisungen und Unterweisungen verstehen",
         "<b>2 Texte</b> (z. B. Anweisung, Unterweisung). Zu jedem Text: <b>1 Aussage richtig/falsch</b> und "
         "<b>1 Aufgabe a, b oder c</b>.", "6–9", "4 × 3 = 12"],
        ["<b>3</b> Rahmenbedingungen der Arbeit",
         "<b>4 Fragen</b> und <b>6 Texte (a–f)</b>: Welcher Text beantwortet welche Frage? Zu <b>einer</b> Frage passt "
         "kein Text – dann <b>x</b>. Also bleiben <b>drei Texte übrig</b>.", "10–13", "4 × 3 = 12"],
    ], [44, 96, 14, 20]),
    Spacer(1, 3),
    box(R("<b>Zeit:</b> 45 Minuten für Lesen Teil 1–4 zusammen. Unsere Empfehlung (nicht offiziell): ca. 10 Minuten für "
          "Teil 2 und ca. 10 Minuten für Teil 3.", "cell"), NOTE, GELB),
    tips_traps("Teil 2 · Anweisungen verstehen",
        ["Lesen Sie zuerst die zwei Aufgaben zum Text. Markieren Sie das Thema (z. B. <i>Pause, Nachtschicht</i>).",
         "Suchen Sie den passenden Absatz – Zwischenüberschriften helfen.",
         "Lesen Sie diesen Absatz <b>Wort für Wort</b>. Kleine Wörter entscheiden: <i>nur, auch, nie, mindestens, "
         "Ausnahme, gilt als</i>.",
         "Richtig/Falsch: Ein einziges falsches Detail macht die Aussage falsch."],
        ["Eine Regel und ihre <b>Ausnahme</b> werden vertauscht.",
         "Die Option nennt die falsche <b>Person</b> (Teamleitung statt Datenschutz).",
         "Die Option enthält ein Wort aus dem Text, aber in einem anderen Zusammenhang."]),
]

# ───────────────────────── Teil 2 · Text 1 ─────────────────────────
HINT2 = ("Lesen Sie den Text und die Aufgaben. Ist die Aussage richtig oder falsch? Welche Lösung (a, b oder c) ist richtig?")
text1 = [
    "<b>Nordstern Frischelogistik GmbH, Oberhausen</b><br/><b>Sicherheitsunterweisung für neue Mitarbeitende: "
    "Arbeiten im Tiefkühllager</b>",
    "<b>Schutzkleidung:</b> Kälteschutzjacke, -hose, Handschuhe und Sicherheitsschuhe liegen in der Umkleide bereit. "
    "Passt Ihnen keine Größe, wenden Sie sich an Ihre Schichtleitung. Ohne vollständige Schutzkleidung betreten Sie "
    "den Tiefkühlbereich nicht.",
    "<b>Aufenthalt in der Kälte:</b> Im Tiefkühlraum (minus 24 Grad) arbeiten Sie höchstens 45 Minuten am Stück. "
    "Danach machen Sie mindestens 15 Minuten Aufwärmpause im beheizten Pausenraum. Diese Pausen gelten als Arbeitszeit.",
    "<b>Nie allein:</b> Grundsätzlich arbeiten im Tiefkühlraum immer mindestens zwei Personen. Nur in der Nachtschicht, "
    "wenn eine Person allein eingeteilt ist, darf sie den Raum allein betreten. Sie meldet sich dann vorher am Terminal "
    "an und trägt den Notrufsender am Gürtel.",
    "<b>Hubwagen und Stapler:</b> Elektro-Hubwagen fahren Sie erst nach der Einweisung durch Herrn Adeyemi, die alle "
    "Neuen in der ersten Woche bekommen. Gabelstapler dürfen nur Beschäftigte mit Staplerschein fahren.",
    "<b>Tür und Notfall:</b> Die Tür lässt sich von innen jederzeit mit dem roten Knopf öffnen. Stellen Sie nie "
    "Paletten vor die Tür. Jede Verletzung – auch eine kleine – tragen Sie mit der Schichtleitung ins Verbandbuch ein.",
]
s += [KeepTogether(task("1", "Teil 2 · Text 1: Unterweisung im Lager", HINT2, 2) + [sbox(text1)]), Spacer(1, 4),
      rf(6, "Die Aufwärmpausen nach der Arbeit im Tiefkühlraum werden nicht als Arbeitszeit gezählt."),
      abc(7, "In der Nachtschicht …",
          ["darf niemand den Tiefkühlraum betreten.", "darf eine Person allein hinein, wenn sie den Notrufsender trägt.",
           "dauert die Arbeit im Tiefkühlraum höchstens 15 Minuten."])]

# ───────────────────────── Teil 2 · Text 2 ─────────────────────────
text2 = [
    "<b>Von:</b> Helga Brückner, Leitung Kundenservice · <b>An:</b> alle Mitarbeitenden im Kundenservice<br/>"
    "<b>Betreff:</b> Neue Regeln für Kundendaten ab 1. Dezember – bitte genau lesen",
    "Liebe Kolleginnen und Kollegen,<br/>nach dem Wechsel auf das neue Ticketsystem gelten ab 1. Dezember diese Regeln:",
    "<b>1. Identität prüfen:</b> Bevor Sie Auskunft zu einem Vertrag geben, fragen Sie nach Kundennummer <b>und</b> "
    "Geburtsdatum. Dass der Anruf von der gespeicherten Telefonnummer kommt, reicht nicht mehr.",
    "<b>2. Angehörige:</b> Ruft jemand für eine Kundin oder einen Kunden an, geben Sie nur Auskunft, wenn im System eine "
    "Vollmacht gespeichert ist. Allgemeine Informationen ohne persönliche Daten, etwa zu Tarifen oder Öffnungszeiten, "
    "dürfen Sie allen geben.",
    "<b>3. Arbeitsplatz:</b> Notizzettel mit Kundendaten sind nicht mehr erlaubt; Notizen schreiben Sie nur noch ins "
    "Ticketsystem. Wenn Sie Ihren Platz verlassen – auch für zwei Minuten –, sperren Sie den Bildschirm.",
    "<b>4. Schulung und Fragen:</b> Bitte machen Sie bis 30. November die Online-Schulung „Datenschutz im Telefonservice“ "
    "(ca. 20 Minuten). Fragen zum Datenschutz richten Sie an unsere Datenschutzbeauftragte, Frau Kowalczyk – nicht an "
    "Ihre Teamleitung.<br/>Danke und viele Grüße<br/>Helga Brückner",
]
s += [KeepTogether(task("2", "Teil 2 · Text 2: Anweisung im Kundenservice", HINT2, 2) + [sbox(text2)]), Spacer(1, 4),
      rf(8, "Angehörige bekommen Auskunft zum Vertrag, wenn sie Kundennummer und Geburtsdatum der Kundin kennen."),
      abc(9, "Was müssen alle Mitarbeitenden bis Ende November tun?",
          ["eine Online-Schulung machen", "ihre Notizzettel bei Frau Kowalczyk abgeben",
           "sich in das neue Ticketsystem einarbeiten lassen"])]

# ───────────────────────── Teil 3 ─────────────────────────
s += [PageBreak(),
      tips_traps("Teil 3 · Rahmenbedingungen der Arbeit",
        ["Fassen Sie jede Frage in 3–4 Wörtern zusammen: <i>Was genau will die Person wissen?</i>",
         "Schreiben Sie neben jeden Text sein Kernthema (z. B. <i>Schichttausch</i>).",
         "Passt ein Text? Prüfen Sie: Bekommt die Person damit eine <b>Antwort</b> auf ihre Frage?",
         "Rechnen Sie fest damit, dass eine Frage ohne Text bleibt (x) – und drei Texte übrig sind."],
        ["Gleiches Stichwort, andere Frage: <i>Urlaub</i>, <i>Kind</i> oder <i>Zuschuss</i> kommen vor, aber der "
         "Text beantwortet etwas anderes.",
         "Man vergisst x und erzwingt eine Zuordnung.",
         "Ein Text passt „ein bisschen“ – suchen Sie den, der genau passt."])]
s += task("3", "Teil 3: Fragen an das Personal-FAQ", "Lesen Sie die Fragen 10–13 und die Texte a–f aus dem Intranet der Firma. "
          "Welcher Text beantwortet welche Frage? Jeden Text können Sie nur einmal verwenden. Zu einer Frage gibt es keinen "
          "passenden Text. Schreiben Sie dann x. Drei Texte bleiben übrig.", 3)
qs = [
    ("Svetlana, Monteurin", "Ich möchte meine Frühschicht am Freitag mit einem Kollegen tauschen. Wir haben uns schon "
                            "geeinigt. Was muss ich jetzt noch tun?"),
    ("Ahmed, Lagerist", "Ich heirate im Mai. Bekomme ich dafür einen zusätzlichen freien Tag, oder muss ich Urlaub nehmen?"),
    ("Jana, Sachbearbeiterin", "Ab Januar habe ich keinen Kita-Platz mehr und brauche eine Tagesmutter. Beteiligt sich die "
                               "Firma an den Kosten?"),
    ("Kofi, Kundendienst", "Ich habe inzwischen viele Überstunden. Kann ich sie im Sommer an meinen Urlaub anhängen und "
                           "mehrere Tage am Stück freinehmen?"),
]
s += [R(f"<b>{i}.</b> <i>{n}:</i> „{t}“   Text: {LINE_}", "sit") for i, (n, t) in enumerate(qs, 10)]
texts = [
    ("a) Urlaubsplanung", "Urlaubswünsche für Juni bis September tragen Sie bitte bis zum 31. März in den Urlaubskalender "
     "ein. Wollen mehrere Personen im selben Team gleichzeitig frei haben, bekommen Beschäftigte mit schulpflichtigen "
     "Kindern in den Schulferien Vorrang. Die Genehmigung erhalten Sie bis Ende April."),
    ("b) Schichttausch", "Sie dürfen Schichten untereinander tauschen, wenn beide dieselbe Qualifikation haben. Tragen Sie "
     "den Tausch spätestens 48 Stunden vorher im Schichtplaner ein; die Schichtleitung bestätigt ihn dort. Ein Tausch, der "
     "nur mündlich vereinbart wurde, gilt nicht."),
    ("c) Jobticket", "Hellweg beteiligt sich an Ihren Fahrtkosten: Wenn Sie das Deutschlandticket als Jobticket über uns "
     "beziehen, zahlen wir jeden Monat einen Zuschuss. Den Antrag finden Sie im Intranet unter „Formulare“; der Betrag "
     "wird direkt mit dem Gehalt verrechnet."),
    ("d) Arbeitszeitkonto", "Mehrarbeit sammeln Sie auf Ihrem Arbeitszeitkonto, höchstens 60 Stunden. Plusstunden bauen "
     "Sie stundenweise oder als ganze freie Tage ab – auch mehrere Tage hintereinander und direkt vor oder nach dem "
     "Urlaub. Den Zeitraum sprechen Sie mit Ihrer Teamleitung ab."),
    ("e) Wenn das Kind krank ist", "Ist Ihr Kind krank und muss zu Hause betreut werden, melden Sie sich wie bei eigener "
     "Krankheit vor Schichtbeginn bei Ihrer Teamleitung. Die ärztliche Bescheinigung für das Kind schicken Sie an die "
     "Personalabteilung. Fragen zur Bezahlung in dieser Zeit klären Sie mit Ihrer Krankenkasse."),
    ("f) Bezahlte Freistellung", "Zu bestimmten Anlässen bekommen Sie bezahlte freie Tage, die nicht von Ihrem Urlaub "
     "abgezogen werden: eigene Hochzeit oder eingetragene Partnerschaft (2 Tage), Geburt eines eigenen Kindes (1 Tag), "
     "Umzug aus beruflichen Gründen (1 Tag). Beantragen Sie die Freistellung bitte mit Nachweis."),
]
s += [Spacer(1, 3), R('<b>Hellweg Haustechnik GmbH · Intranet · Personal-FAQ</b>', "cell"), Spacer(1, 2),
      table([[f"<b>{h}</b><br/>{t}" for h, t in texts[i:i + 2]] for i in range(0, 6, 2)], [87, 87], head=False),
      Spacer(1, 3),
      R("<b>Stand: November 2026 – keine Rechtsberatung.</b> Die Firma und ihre Regeln sind erfunden und dienen nur zum Üben. "
        "Was in einem echten Betrieb gilt, steht im Arbeitsvertrag, im Tarifvertrag oder in Betriebsvereinbarungen; "
        "bei Fragen helfen Betriebsrat, Gewerkschaft oder eine Beratungsstelle.", "small")]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen mit Textstelle", "h2"), R("Erst üben, dann nachschauen! Je richtige Aufgabe 3 Punkte.", "small")]
s += [R("Teil 2 · Text 1 (Unterweisung im Lager)", "solh")] + [R(t, "sol") for t in [
    "<b>6 falsch</b> – „Diese Pausen gelten als Arbeitszeit.“",
    "<b>7 b</b> – „Nur in der Nachtschicht, wenn eine Person allein eingeteilt ist, darf sie den Raum allein betreten. "
    "Sie … trägt den Notrufsender am Gürtel.“ <i>Falle a:</i> Das ist die Grundregel, die Nachtschicht ist die Ausnahme. "
    "<i>Falle c:</i> 15 Minuten ist die Mindestdauer der Aufwärmpause.",
]]
s += [R("Teil 2 · Text 2 (Anweisung im Kundenservice)", "solh")] + [R(t, "sol") for t in [
    "<b>8 falsch</b> – „Ruft jemand für eine Kundin oder einen Kunden an, geben Sie nur Auskunft, wenn im System eine "
    "Vollmacht gespeichert ist.“ Kundennummer und Geburtsdatum reichen bei Angehörigen nicht.",
    "<b>9 a</b> – „Bitte machen Sie bis 30. November die Online-Schulung …“ <i>Falle b:</i> Frau Kowalczyk ist für Fragen "
    "da, Notizzettel sind einfach nicht mehr erlaubt. <i>Falle c:</i> Das Ticketsystem wird erwähnt, eine Einarbeitung nicht.",
]]
s += [R("Teil 3 (Personal-FAQ)", "solh")] + [R(t, "sol") for t in [
    "<b>10 b</b> – „Tragen Sie den Tausch spätestens 48 Stunden vorher im Schichtplaner ein; die Schichtleitung bestätigt "
    "ihn dort.“ Die mündliche Absprache allein reicht nicht.",
    "<b>11 f</b> – „eigene Hochzeit … (2 Tage)“, „nicht von Ihrem Urlaub abgezogen“. <i>Falle a:</i> Stichwort <i>Urlaub</i>, "
    "aber es geht um die Urlaubsplanung im Sommer.",
    "<b>12 x</b> – Kein Text spricht über Kosten für Kinderbetreuung. <i>Falle c:</i> „Zuschuss“, aber nur für das "
    "Jobticket. <i>Falle e:</i> Stichwort <i>Kind</i>, aber es geht um ein krankes Kind.",
    "<b>13 d</b> – „als ganze freie Tage … auch mehrere Tage hintereinander und direkt vor oder nach dem Urlaub“. "
    "<i>Falle a:</i> <i>Sommer</i> und <i>Urlaub</i>, aber keine Antwort zu Überstunden.",
    "Übrig bleiben <b>a, c, e</b>.",
]]
s += [Spacer(1, 6),
      box(R("<b>Wortschatz aus den Texten:</b> <i>gilt als</i> Arbeitszeit (= wird wie Arbeitszeit bezahlt) · "
            "<i>grundsätzlich</i> (= in der Regel, Ausnahmen möglich) · <i>eingeteilt sein</i> (= im Dienstplan stehen) · "
            "<i>eine Vollmacht</i> (= schriftliche Erlaubnis, für eine andere Person zu handeln) · <i>Mehrarbeit</i> "
            "(= Überstunden) · <i>abbauen</i> (= Stunden als Freizeit nehmen) · <i>die Freistellung</i> "
            "(= man muss nicht arbeiten).", "cell"), HELLGRUEN, GRUEN),
      Spacer(1, 6),
      box(R("<b>Ihre Bilanz:</b> 8 Aufgaben × 3 Punkte = 24 Punkte (Teil 2: 12, Teil 3: 12). Zum Vergleich: Die Fertigkeit "
            "Lesen hat insgesamt 60 Punkte. Weitere Übungen: deutsch-mit-dennis.de", "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
