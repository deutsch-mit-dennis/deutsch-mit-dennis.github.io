# Arbeitsblatt DTB B2 Prüfung: Lesen und Schreiben – eine Kundenbeschwerde beantworten
# Format laut sim/dtb-b2.js (Teil 1: zwei Aufgaben a/b/c, Teil 2: Antwort-E-Mail, mind. 100 Wörter, 20 Minuten).
# Eigene Texte, keine Originalaufgaben. Firmen und Personen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-kundenbeschwerde.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b2-kundenbeschwerde"
TITLE = "DTB B2 Lesen und Schreiben: eine Kundenbeschwerde beantworten"
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.4)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.5, leading=11.8, leftIndent=10, firstLineIndent=-10, spaceAfter=2)

BOX = sym("☐")


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


def sbox(paras, bg=SOFT, first=True, last=True):
    """Box that may break across pages: one table row per paragraph."""
    t = Table([[R(p, "mat")] for p in paras], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5), ("TOPPADDING", (0, 0), (-1, 0), 7 if first else 1.5),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 7 if last else 1.5)]))
    return t


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("Eine Kundenbeschwerde beantworten", "h1"),
    R("Im DTB B2 lesen Sie eine Beschwerde und die Anweisung Ihrer Vorgesetzten – dann schreiben Sie die Antwort. "
      "So setzen Sie jede Anweisung um und treffen den professionellen Ton.", "lead"),
    R("So läuft der Prüfungsteil Lesen und Schreiben", "h2"),
    box(R("Sie haben für <b>beide Teile zusammen 20 Minuten</b>: ca. 5 Minuten zum Lesen, ca. 15 Minuten zum Schreiben. "
          "Die beiden Texte aus Teil 1 sind gleichzeitig die Grundlage für Ihre E-Mail in Teil 2.", "cell"), NOTE, GELB),
    Spacer(1, 4),
    table([
        ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
        ["<b>1</b> Kundenbeschwerde verstehen", "Sie lesen die E-Mail einer Kundin und eine interne Nachricht Ihrer Vorgesetzten. "
         "Dazu lösen Sie 2 Aufgaben mit a, b oder c.", "ca. 5 Min.", "2 × 3 = 6 (Lesen)"],
        ["<b>2</b> Antwort an die Kundin", "Sie schreiben im Auftrag Ihrer Vorgesetzten eine Antwort-E-Mail: alle Anweisungen umsetzen, "
         "mindestens 100 Wörter, Anrede, Gruß, höflicher und professioneller Ton.", "ca. 15 Min.", "15 (Schreiben)"],
    ], [42, 90, 18, 24]),
    R("Punkte wie in der Online-Simulation auf deutsch-mit-dennis.de.", "small"),
]

# ───────────────────────── Teil 1 ─────────────────────────
s += [tips_traps(
    "Teil 1 · Die Beschwerde verstehen",
    ["Markieren Sie in der Beschwerde <b>alle</b> Kritikpunkte.",
     "Nummerieren Sie in der Anweisung jeden Auftrag (1, 2, 3 …) – das ist später Ihre Checkliste.",
     "Markieren Sie besonders, was Sie <b>nicht</b> schreiben sollen.",
     "Beantworten Sie erst dann die zwei Fragen."],
    ["Lob im Text („Die Beratung war ausgezeichnet“) wird als Kritik verstanden.",
     "„Bitte NICHT …“ in der Anweisung wird überlesen.",
     "Die Kundin fordert etwas – die Chefin entscheidet aber anders."])]

intro = task(1, "Beschwerde und Anweisung lesen",
             "Sie arbeiten im Kundenservice der Firma Bürowelt Nord in Kiel. Lesen Sie die E-Mail einer Kundin und die Nachricht "
             "Ihres Chefs. Welche Lösung (a, b oder c) ist richtig?", 2)
mail = [
    "<b>E-Mail der Kundin</b>",
    "Von: Dr. Ana Ribeiro, Zahnarztpraxis am Hafen · An: Bürowelt Nord, Kundenservice<br />"
    "Betreff: Lieferung von sechs Bürostühlen (Bestellung 4471) – Beschwerde",
    "Sehr geehrte Damen und Herren,",
    "am 2. Oktober habe ich bei Ihnen sechs ergonomische Bürostühle für unsere Praxis bestellt. Die Beratung in Ihrem Geschäft war "
    "ausgezeichnet und der Preis fair – umso mehr ärgere ich mich über das, was danach passiert ist.",
    "Zugesagt war die Lieferung für den 16. Oktober. Gekommen sind die Stühle erst am 30. Oktober, ohne dass uns jemand informiert hat. "
    "Meine Mitarbeiterinnen mussten zwei Wochen lang auf alten, kaputten Stühlen sitzen.",
    "Außerdem ist bei einem Stuhl die Rückenlehne locker, man kann ihn so nicht benutzen. Und Ihre Monteure haben die gesamte "
    "Verpackung – sechs große Kartons und viel Folie – in unserem Flur stehen lassen. In einer Arztpraxis ist das wirklich nicht akzeptabel.",
    "Ich erwarte, dass der defekte Stuhl schnell ersetzt und die Verpackung abgeholt wird. Ehrlich gesagt überlege ich auch, "
    "die Rechnung zu kürzen.",
    "Mit freundlichen Grüßen<br />Ana Ribeiro",
]
note = [
    "<b>Interne Nachricht Ihres Chefs</b>",
    "Von: Malte Jensen (Leitung Kundenservice) · An: Kundenservice",
    "Hallo, bitte antworten Sie Frau Dr. Ribeiro heute noch in meinem Namen. Die Praxis will nächstes Jahr ihren Empfang neu "
    "einrichten – wir möchten sie als Kundin unbedingt behalten!",
    "– Bitte für alle drei Punkte entschuldigen.<br />"
    "– Verspätung: Unser Lieferant hatte Produktionsprobleme. Den Namen des Lieferanten bitte NICHT nennen! "
    "Dass wir die Praxis nicht informiert haben, war unser Fehler.<br />"
    "– Neuer Stuhl: Donnerstag, 19. November, zwischen 8 und 10 Uhr, also vor der Sprechstunde. Sie soll den Termin bitte kurz bestätigen.<br />"
    "– Verpackung: Die Kollegen nehmen sie beim Austausch mit.<br />"
    "– Rechnung: ist schon bezahlt. Bitte KEINEN Rabatt anbieten, sondern einen Gutschein über 80 Euro für die nächste Bestellung.<br />"
    "– Bei Fragen ist sie bei mir direkt richtig: Durchwahl 214.",
    "Danke! M. Jensen",
]
s += [KeepTogether(intro + [sbox(mail[:3], last=False)]), sbox(mail[3:], first=False), Spacer(1, 5),
      KeepTogether([sbox(note[:3], NOTE, last=False)]), sbox(note[3:], NOTE, first=False), Spacer(1, 5)]
s += [
    abc(1, "Was kritisiert Frau Dr. Ribeiro?",
        ["die Beratung und den Preis", "die Lieferung, einen Stuhl und die Verpackung", "nur die verspätete Lieferung"]),
    abc(2, "Was bekommt Frau Dr. Ribeiro als Entschuldigung?",
        ["einen Rabatt auf die Rechnung", "einen Gutschein über 80 Euro", "eine kostenlose Einrichtung ihres Empfangs"]),
]

# ───────────────────────── Teil 2 ─────────────────────────
s += [tips_traps(
    "Teil 2 · Die Antwort an die Kundin",
    ["Betreff mit Bezug: Bestellnummer oder Datum.",
     "Anrede, Dank für die Rückmeldung, Entschuldigung.",
     "Jeden Auftrag aus der Anweisung in einem eigenen Satz oder Absatz – in Ihrer Reihenfolge 1, 2, 3 …",
     "Am Ende die Checkliste abhaken: Fehlt ein Auftrag?"],
    ["Interne Informationen wörtlich weitergeben („Mein Chef sagt …“).",
     "Einen Auftrag vergessen, z. B. die Bitte um Bestätigung.",
     "Zu umgangssprachlich: „sorry“, „kein Ding“, „klappt das?“."])]

s += [KeepTogether([R("Der Aufbau – Baustein für Baustein", "h3"), table([
    ["<b>Baustein</b>", "<b>Redemittel</b>"],
    ["<b>Betreff</b>", f"{K('Ihre Beschwerde vom …')} · {K('Ihre Bestellung Nr. …')}"],
    ["<b>Anrede</b>", f"{K('Sehr geehrte Frau Dr. …,')} · {K('Sehr geehrter Herr …,')} (danach klein weiterschreiben)"],
    ["<b>Dank</b>", f"{K('vielen Dank für Ihre offene Rückmeldung.')} · {K('Vielen Dank, dass Sie uns informiert haben.')}"],
    ["<b>Entschuldigung</b>", f"{K('Wir bitten Sie vielmals um Entschuldigung für …')} · {K('Es tut uns sehr leid, dass …')} · "
                              f"{K('Wir bedauern sehr, dass …')}"],
    ["<b>Erklärung</b>", f"{K('Leider hatte …')} · {K('Der Grund dafür war …')} · {K('Das hätte nicht passieren dürfen.')}"],
    ["<b>Lösung / Angebot</b>", f"{K('Gern tauschen wir … aus.')} · {K('Als Entschuldigung erhalten Sie …')} · "
                                f"{K('Wir möchten Ihnen … anbieten.')}"],
    ["<b>Bitte</b>", f"{K('Bitte bestätigen Sie uns kurz, ob …')} · {K('Wir wären Ihnen dankbar, wenn …')}"],
    ["<b>Schluss</b>", f"{K('Bei Fragen erreichen Sie … direkt unter …')} · {K('Wir würden uns freuen, Sie auch in Zukunft …')}"],
    ["<b>Gruß</b>", f"{K('Mit freundlichen Grüßen')} · {K('i. A.')} Vorname Nachname · Kundenservice …"],
], [34, 140])]),
    Spacer(1, 3),
    box(R(f"<b>i. A. = im Auftrag:</b> Sie schreiben für Ihren Chef, unterschreiben aber mit Ihrem eigenen Namen. "
          f"{K('Im Namen von Herrn Jensen möchte ich mich … entschuldigen.')}", "cell"), SOFT),
]

s += task(2, "Intern wird extern", "Die Sätze sind zu direkt oder verraten Internes. Schreiben Sie sie höflich und professionell für die Kundin.", 2)
u2 = [
    "Mein Chef sagt, der Lieferant hatte Probleme.",
    "Sorry, dass keiner angerufen hat.",
    "Rabatt gibt's nicht, die Rechnung ist ja schon bezahlt.",
    "Sagen Sie Bescheid, ob Donnerstag klappt.",
    "Die Kartons holen wir dann irgendwann ab.",
]
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f"{i}. <i>{t}</i>", "item"), lines(1)])]

s += task(3, "Ihre Antwort-E-Mail (Prüfungsformat)",
          "Schreiben Sie im Auftrag von Herrn Jensen eine Antwort-E-Mail an Frau Dr. Ribeiro. Setzen Sie alle Anweisungen Ihres Chefs um. "
          "Schreiben Sie mindestens 100 Wörter. Achten Sie auf Anrede, Gruß und einen höflichen, professionellen Ton. Zeit: 15 Minuten.", 3)
s += [lines(13, indent=0), Spacer(1, 4)]
check = ["Betreff, Anrede, Gruß mit „i. A.“", "Dank und Entschuldigung für alle drei Punkte", "Grund der Verspätung – ohne Namen des Lieferanten",
         "fehlende Information als eigener Fehler", "Austausch: Do., 19. November, 8–10 Uhr", "Bitte um Bestätigung des Termins",
         "Verpackung wird mitgenommen", "Gutschein über 80 Euro (kein Rabatt)", "Kontakt: Durchwahl 214", "Sie-Form, ganze Sätze, ab 100 Wörtern"]
half = (len(check) + 1) // 2
ct = Table([[R(f"{BOX} {a}", "tip"), R(f"{BOX} {b}", "tip")] for a, b in zip(check[:half], check[half:])], colWidths=[85 * mm, 85 * mm])
ct.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("LEFTPADDING", (0, 0), (-1, -1), 8),
                        ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                        ("TOPPADDING", (0, 0), (-1, 0), 6), ("BOTTOMPADDING", (0, -1), (-1, -1), 6)]))
s += [KeepTogether([R("<b>Checkliste – haken Sie nach dem Schreiben ab:</b>", "p"), ct])]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen mit Begründung", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1 · Teil 1", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – Kritik: späte Lieferung ohne Information, lockere Rückenlehne, Verpackung im Flur. "
    "<i>Falle a:</i> Beratung und Preis werden gelobt. <i>Falle c:</i> Es gibt drei Kritikpunkte, nicht nur einen.",
    "<b>2 b</b> – „sondern einen Gutschein über 80 Euro“. <i>Falle a:</i> Die Kundin denkt an eine Kürzung, aber der Chef schreibt: "
    "„Bitte KEINEN Rabatt anbieten“. <i>Falle c:</i> Der Empfang ist nur eine interne Information.",
]]
s += [R("Übung 2 · Vorschläge (auch andere Lösungen sind möglich)", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate([
    f"{K('Leider hatte unser Lieferant Produktionsprobleme.')}",
    f"{K('Wir bedauern sehr, dass wir Sie nicht über die Verspätung informiert haben.')}",
    f"{K('Als Entschuldigung möchten wir Ihnen einen Gutschein über 80 Euro für Ihre nächste Bestellung schenken.')}",
    f"{K('Bitte bestätigen Sie uns kurz, ob der Termin am Donnerstag, 19. November, für Sie passt.')}",
    f"{K('Bei diesem Termin nehmen unsere Kollegen auch die gesamte Verpackung mit.')}",
], 1)]
muster = [
    "<b>Betreff: Ihre Beschwerde zur Lieferung der Bürostühle (Bestellung 4471)</b>",
    "Sehr geehrte Frau Dr. Ribeiro,",
    "vielen Dank für Ihre offene Rückmeldung. Im Namen von Herrn Jensen möchte ich mich bei Ihnen für die verspätete Lieferung, "
    "den beschädigten Stuhl und die zurückgelassene Verpackung entschuldigen.",
    "Die Lieferung hat sich verzögert, weil unser Lieferant Produktionsprobleme hatte. Dass wir Sie darüber nicht informiert haben, "
    "war unser Fehler. Das hätte nicht passieren dürfen.",
    "Den beschädigten Stuhl tauschen wir am Donnerstag, 19. November, zwischen 8 und 10 Uhr aus, also noch vor Ihrer Sprechstunde. "
    "Bei diesem Termin nehmen unsere Kollegen auch die gesamte Verpackung mit. Bitte bestätigen Sie uns kurz, ob der Termin für Sie passt.",
    "Als Entschuldigung möchten wir Ihnen einen Gutschein über 80 Euro für Ihre nächste Bestellung schenken. "
    "Wir würden uns sehr freuen, Sie auch in Zukunft beraten zu dürfen.",
    "Bei Fragen erreichen Sie Herrn Jensen direkt unter der Durchwahl 214.",
    "Mit freundlichen Grüßen<br />i. A. [Ihr Vorname und Nachname]<br />Kundenservice Bürowelt Nord",
]
s += [KeepTogether([R("Übung 3 · Mustertext (ca. 160 Wörter)", "solh"), sbox(muster[:3], HELLGRUEN, last=False)]),
      sbox(muster[3:], HELLGRUEN, first=False),
      Spacer(1, 5),
      box(R("<b>Warum ist das ein guter Text?</b> Jeder Auftrag des Chefs steht in einem eigenen Satz – in derselben Reihenfolge wie in der "
            "Anweisung. Der Lieferant wird nicht genannt, der interne Plan mit dem Empfang auch nicht. Die Sätze sind verbunden "
            "(<i>weil, dass, also, bei diesem Termin</i>), nicht in Stichpunkten.", "cell"), NOTE, GELB)]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
