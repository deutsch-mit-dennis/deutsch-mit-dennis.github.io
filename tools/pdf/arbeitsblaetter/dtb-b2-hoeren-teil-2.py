# Arbeitsblatt DTB B2 Prüfung: Hören Teil 2 – vier kurze Gespräche, sechs Sätze (a–f), zwei bleiben übrig
# Format laut offiziellem Modelltest DTB B2 (telc, Übungstest 1, 2022): 4 Items, 1 Min. Lesezeit, einmal hören, 4 × 3 = 12 Punkte.
# Eigene Gespräche und Aufgaben, keine Originalaufgaben. Alle Personen und Firmen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-hoeren-teil-2.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, MUTED, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b2-hoeren-teil-2"
TITLE = "DTB B2 Hören Teil 2: vier kurze Gespräche, sechs Sätze"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.3, leading=11.6)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.4, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.6, leading=12, leftIndent=10, firstLineIndent=-10, spaceAfter=2)


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


def script(title, lines_):
    """Transcript to read aloud: one row per speaker turn."""
    rows = [R(f"<b>{who}:</b> {txt}" if who else txt, "mat") for who, txt in lines_]
    t = Table([[r] for r in rows], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8), ("TOPPADDING", (0, 0), (-1, 0), 5),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 5)]))
    return [KeepTogether([R(title, "solh"), t]), Spacer(1, 2)]


def satzliste(saetze):
    rows = [[R(f"<b>{l})</b>", "cell"), R(t, "cell")] for l, t in zip("abcdef", saetze)]
    t = Table(rows, colWidths=[9 * mm, 165 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


def antwortzeile(nrs):
    cells = [R(f"<b>Gespräch {n}</b>   ______", "cell") for n in nrs]
    t = Table([cells], colWidths=[43.5 * mm] * 4)
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                           ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                           ("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN)]))
    return t


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Hören Teil 2", "kick"),
    R("Vier kurze Gespräche, sechs Sätze", "h1"),
    R("Kolleginnen und Kollegen diskutieren: Wer ist wofür – und vor allem: <b>warum</b>? In Teil 2 hören Sie "
      "nicht nur Meinungen, sondern Begründungen. Mit zwei kompletten Übungssätzen im Prüfungsformat.", "lead"),
    R("So läuft der Teil (laut Modelltest, telc 2022)", "h2"),
    table([
        ["<b>Was?</b>", "<b>So ist es in der Prüfung</b>"],
        ["Thema", "Argumentationen nachvollziehen: vier kurze Gespräche am Arbeitsplatz"],
        ["Aufgabe", "Sie ordnen jedem Gespräch einen der Sätze <b>a–f</b> zu. <b>Zwei Sätze bleiben übrig.</b>"],
        ["Lesezeit", "<b>1 Minute</b>, bevor Sie die Gespräche hören"],
        ["Hören", "Sie hören jedes Gespräch <b>nur einmal</b>."],
        ["Punkte", "4 Aufgaben × 3 Punkte = <b>12 Punkte</b> (in der Prüfung Aufgaben 28–31)"],
        ["Zeit", "Hören Teil 1–4 zusammen: 20 Minuten"],
    ], [28, 146]),
    Spacer(1, 4),
    box(R("<b>Ohne Audio üben – so geht’s:</b> Zwei Personen lesen die Gespräche aus dem Lösungsteil (ab Seite 3) "
          "mit verteilten Rollen vor: normales Tempo, jedes Gespräch <b>nur einmal</b>. Wer zuhört, deckt den Lösungsteil ab. "
          "Die Lehrkraft stoppt vorher eine Minute Lesezeit.", "cell"), HELLGRUEN, GRUEN),
]

s += [tips_traps(
    "Strategien und Fallen",
    ["In der Lesezeit: Lesen Sie alle sechs Sätze. Unterstreichen Sie in jedem Satz das <b>Thema</b> und die "
     "<b>Begründung</b> (nach <i>weil, damit, wenn</i>).",
     "Ordnen Sie die Sätze nach Themen: Oft gibt es zwei Sätze zum gleichen Thema – nur einer hat die richtige Begründung.",
     "Hören Sie bis zum Schluss: Am Ende steht meist, wer wen überzeugt hat.",
     "Achten Sie auf Signalwörter: <i>Das stimmt, aber … · Ehrlich gesagt … · Da hast du recht. · Überzeugt.</i>",
     "Nach jedem Gespräch sofort einen Buchstaben eintragen. Unsicher? Trotzdem einen Buchstaben eintragen – es gibt keinen Abzug."],
    ["Gleiches Wort, andere Aussage: Im Gespräch fällt „Homeoffice“, der Satz nennt aber eine Begründung, die niemand sagt.",
     "Die erste Meinung im Gespräch ist oft nicht das Ergebnis – jemand wird überzeugt.",
     "Ein Satz sagt das Gegenteil: <i>überflüssig</i> statt <i>wichtig</i>, <i>Geld</i> statt <i>Zeit</i>.",
     "Zwei Sätze bleiben übrig – nicht jeder Satz passt zu einem Gespräch."])]

# ───────────────────────── Übung 1 ─────────────────────────
s += task(1, "Signalwörter: Zustimmung, Widerspruch oder „ja, aber“?",
          "Lesen Sie die Äußerungen. Was macht die Person? Schreiben Sie <b>Z</b> (Zustimmung), <b>W</b> (Widerspruch) "
          "oder <b>E</b> (Einschränkung: teilweise einverstanden).", 1)
u1 = [
    "„Na gut, da hast du eigentlich recht. So habe ich das noch nicht gesehen.“",
    "„Das mag ja sein, aber für die Neuen ist das trotzdem schwierig.“",
    "„Ehrlich gesagt halte ich davon gar nichts.“",
    "„Im Prinzip ja – nur nicht gleich für alle.“",
    "„Genau das meine ich doch die ganze Zeit!“",
    "„Moment mal, das sehe ich völlig anders.“",
]
s += [table([[f"{i}. {t}", "______"] for i, t in enumerate(u1, 1)], [150, 24], head=False)]

# ───────────────────────── Übungssatz A ─────────────────────────
SA = [
    "Man sollte eine neue Regel zuerst ausprobieren, bevor sie für alle gilt.",
    "Feste Zuständigkeiten sparen Zeit, weil die Wege kürzer werden.",
    "Feste Zuständigkeiten sind wichtig, weil Kundinnen und Kunden Vertrauen brauchen.",
    "Kurze Besprechungen am Morgen sind überflüssig, weil alle Informationen per E-Mail kommen.",
    "Eine Weiterbildung lohnt sich auch dann, wenn sie keine höhere Bezahlung bringt.",
    "Wer Probleme früh anspricht, verhindert später größeren Ärger.",
]
s += [CondPageBreak(120 * mm)]
s += task(2, "Übungssatz A: Arbeit im Team organisieren",
          "Prüfungsformat. Sie hören vier kurze Gespräche. Welcher Satz (a–f) passt zu welchem Gespräch? "
          "Zwei Sätze passen nicht. Sie hören jedes Gespräch <b>einmal</b>. Sie haben jetzt <b>eine Minute</b> Zeit, "
          "die Sätze zu lesen.", 2)
s += [satzliste(SA), Spacer(1, 5), antwortzeile([1, 2, 3, 4])]

# ───────────────────────── Übungssatz B ─────────────────────────
SB = [
    "Homeoffice ist vor allem deshalb gut, weil der lange Weg zur Arbeit wegfällt.",
    "Lange Arbeitstage sind riskant, weil man gegen Ende müde wird und mehr Fehler macht.",
    "Freizeit als Ausgleich ist auf Dauer besser als Geld, weil man sich erholen muss.",
    "Wechselnde Arbeitsplätze sparen der Firma Geld, weil sie weniger Büroräume braucht.",
    "Gerade neue Kolleginnen und Kollegen lernen mehr, wenn das Team gemeinsam vor Ort arbeitet.",
    "Wechselnde Arbeitsplätze können die Zusammenarbeit zwischen Abteilungen verbessern.",
]
s += [CondPageBreak(120 * mm)]
s += task(3, "Übungssatz B: Arbeitszeit und Arbeitsplatz",
          "Prüfungsformat wie in Übung 2 – diesmal ohne Hilfe. Eine Minute Lesezeit, jedes Gespräch <b>einmal</b>. "
          "Zwei Sätze bleiben übrig.", 3)
s += [satzliste(SB), Spacer(1, 5), antwortzeile([1, 2, 3, 4]), Spacer(1, 5),
      box(R("<b>Nach dem Hören – kurz reflektieren:</b> Bei welchem Gespräch waren Sie unsicher? War es das Thema "
            "oder die Begründung? Notieren Sie das Wort, das Sie in die Falle gelockt hat: ____________________", "cell"),
          NOTE, GELB)]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen und Texte zum Vorlesen", "h2"),
      R("Erst üben, dann nachschauen! Wer zuhört, deckt diesen Teil ab.", "small"),
      R("Übung 1", "solh"),
      R("1. Z · 2. E · 3. W · 4. E · 5. Z · 6. W", "sol"),
      R("Übung 2 – Übungssatz A", "solh"),
      R("<b>Gespräch 1: c · Gespräch 2: e · Gespräch 3: a · Gespräch 4: f</b> · übrig: b und d", "sol"),
      R("1 c: Selin überzeugt Bernd – die Patientinnen brauchen bekannte Gesichter. <b>Falle b:</b> Gleiches Thema, "
        "aber über kürzere Wege spricht niemand.", "sol"),
      R("2 e: Leonie macht den Kurs, obwohl es nicht mehr Geld gibt – sie arbeitet schneller und hat bessere Chancen intern.", "sol"),
      R("3 a: Erst zwei Wochen mit Geschäftsreisenden testen, dann für alle.", "sol"),
      R("4 f: Hätte Kofi das fehlende Material gestern gemeldet, hätte der Kunde nicht warten müssen. "
        "<b>Falle d:</b> Die Morgenrunde wird erwähnt – aber als <i>wichtig</i>, nicht als überflüssig.", "sol"),
      ]

s += script("Übungssatz A · Gespräch 1 – bei einem ambulanten Pflegedienst", [
    ("Bernd", "Selin, ich hab mir überlegt: Wir sollten die Touren jede Woche tauschen. Dann kennt jeder alle Patienten, "
              "und wenn jemand krank ist, ist die Vertretung kein Problem."),
    ("Selin", "Hm. Für uns wäre das vielleicht praktisch. Aber denk mal an Frau Schulte. Letzte Woche kam ein Kollege, "
              "den sie nicht kannte – sie hat ihm einfach die Tür nicht aufgemacht."),
    ("Bernd", "Ja, davon hab ich gehört."),
    ("Selin", "Viele ältere Menschen lassen nur jemanden in die Wohnung, dem sie vertrauen. Und dieses Vertrauen braucht Zeit. "
              "Wenn jede Woche ein neues Gesicht kommt, sind die total verunsichert."),
    ("Bernd", "Okay, überzeugt. Dann bleiben die Touren fest – und neue Kollegen fahren am Anfang einfach mal mit."),
])
s += script("Übungssatz A · Gespräch 2 – in der Verwaltung der Stadtwerke", [
    ("Tomasz", "Leonie, stimmt das? Du machst den Kurs zur Datenanalyse? An drei Samstagen?"),
    ("Leonie", "Ja, die Chefin bezahlt ihn. Mehr Gehalt gibt es dafür allerdings nicht."),
    ("Tomasz", "Eben! Warum opferst du dann deine Samstage? Ich würde das nur machen, wenn sich das auch auf dem Konto zeigt."),
    ("Leonie", "Ich sehe das anders. Ich sitze jeden Tag stundenlang an diesen Tabellen. Wenn ich das besser kann, bin ich "
               "viel schneller fertig. Und wenn hier intern mal eine Stelle frei wird, habe ich bessere Karten."),
    ("Tomasz", "Na ja … wenn du es so siehst, ist das eigentlich keine schlechte Investition."),
])
s += script("Übungssatz A · Gespräch 3 – an der Rezeption eines Hotels", [
    ("Julia", "Mehmet, hast du die Mail vom Chef gelesen? Ab Montag sollen alle Gäste online einchecken."),
    ("Mehmet", "Ja, finde ich gut. Dann haben wir morgens weniger Stress an der Rezeption."),
    ("Julia", "Grundsätzlich ja. Aber gleich für alle? Wir haben nächste Woche zwei Reisegruppen, viele davon über siebzig. "
              "Ob das mit dem Handy klappt?"),
    ("Mehmet", "Hm, stimmt. Und wenn es Probleme gibt, stehen am Ende alle doch wieder bei uns an."),
    ("Julia", "Eben. Lass uns vorschlagen, dass wir das zwei Wochen nur mit den Geschäftsreisenden testen. Dann sehen wir, "
              "wo es hakt – und danach machen wir es für alle."),
    ("Mehmet", "Gute Idee. Ich schreibe es ihm gleich."),
])
s += script("Übungssatz A · Gespräch 4 – in einem Elektrobetrieb", [
    ("Frau Vogt", "Kofi, hast du gestern schon gemerkt, dass die Kabelkanäle für die Baustelle fehlen?"),
    ("Kofi", "Ja … schon am Nachmittag. Aber Sie waren so beschäftigt, da wollte ich nicht stören."),
    ("Frau Vogt", "Das ist nett gemeint, aber genau das ist das Problem. Hättest du es gestern gesagt, hätte ich sofort bestellt. "
                  "Jetzt kommt die Lieferung erst morgen, und der Kunde muss einen Tag länger warten. Der ist natürlich sauer."),
    ("Kofi", "Das tut mir leid."),
    ("Frau Vogt", "Schon gut. Aber dafür haben wir ja die kurze Runde um sieben – da gehört so etwas hin. Lieber einmal zu viel "
                  "fragen als einmal zu wenig."),
])

s += [CondPageBreak(40 * mm), R("Übung 3 – Übungssatz B", "solh"),
      R("<b>Gespräch 1: e · Gespräch 2: b · Gespräch 3: f · Gespräch 4: c</b> · übrig: a und d", "sol"),
      R("1 e: Ewa will mindestens zwei Bürotage, weil die zwei Neuen am meisten lernen, wenn jemand daneben sitzt. "
        "<b>Falle a:</b> Arjun mag Homeoffice – aber wegen der Ruhe, nicht wegen des Wegs.", "sol"),
      R("2 b: Dana ist gegen Zehn-Stunden-Tage, weil sie am Ende des Tages unkonzentriert ist und Fehler macht.", "sol"),
      R("3 f: Martina überzeugt Ibrahim: Man sitzt neben anderen Abteilungen, Fragen sind schneller geklärt. "
        "<b>Falle d:</b> Über Kosten spricht niemand.", "sol"),
      R("4 c: Ayşe nimmt lieber Freizeit, weil ständige Mehrarbeit auf Dauer krank macht – Sergej gibt ihr am Ende recht.", "sol"),
      ]
s += script("Übungssatz B · Gespräch 1 – im Kundenservice einer Softwarefirma", [
    ("Arjun", "Ewa, ich würde gern vier Tage pro Woche im Homeoffice arbeiten. Zu Hause kann ich mich einfach besser konzentrieren, "
              "hier im Büro klingelt ständig irgendwo ein Telefon."),
    ("Ewa", "Kann ich verstehen. Aber im Moment haben wir zwei Neue im Team. Wenn die eine Frage haben, sollen sie dann jedes Mal "
            "eine Videokonferenz starten?"),
    ("Arjun", "Na ja, dafür gibt es doch den Chat."),
    ("Ewa", "Ehrlich gesagt lernt man am meisten, wenn man einfach mal zuhört, wie die Erfahrenen telefonieren. Das klappt nur, "
            "wenn man nebeneinander sitzt. Lass uns sagen: mindestens zwei Tage im Büro, solange die beiden eingearbeitet werden."),
    ("Arjun", "Gut, das ist fair. Danach reden wir noch mal."),
])
s += script("Übungssatz B · Gespräch 2 – in einem Supermarkt", [
    ("Lukas", "Dana, hast du schon gehört? Die Filialleitung überlegt, ob wir eine Vier-Tage-Woche machen. Dafür dann zehn Stunden am Tag."),
    ("Dana", "Klingt erst mal toll, ein Tag mehr frei. Aber zehn Stunden an der Kasse?"),
    ("Lukas", "Wieso nicht? Drei freie Tage am Stück, das wäre doch super."),
    ("Dana", "Ich merke jetzt schon, dass ich nach acht Stunden unkonzentriert werde. Da vertippe ich mich öfter, und beim "
             "Wechselgeld passieren Fehler. Mit zwei Stunden mehr wird das bestimmt nicht besser."),
    ("Lukas", "Hm, das stimmt. Gegen Abend bin ich auch nicht mehr so fit."),
])
s += script("Übungssatz B · Gespräch 3 – im Büro einer Versicherung", [
    ("Ibrahim", "Martina, ab Januar soll keiner mehr einen festen Schreibtisch haben. Jeden Morgen einen freien Platz suchen – ich finde das furchtbar."),
    ("Martina", "Ich war am Anfang auch skeptisch. Aber in unserer Abteilung in Köln machen sie das schon seit einem Jahr."),
    ("Ibrahim", "Und? Wo lassen die ihre Sachen?"),
    ("Martina", "Im Schließfach. Das Interessante ist aber etwas anderes: Man sitzt mal neben dem Vertrieb, mal neben der "
                "Buchhaltung. Viele Fragen klärt man dann direkt am Tisch statt mit zehn E-Mails."),
    ("Ibrahim", "Hm. Mit der Buchhaltung hätte ich tatsächlich oft etwas zu klären."),
    ("Martina", "Siehst du. Die Kollegen in Köln sagen, die Abteilungen arbeiten seitdem viel besser zusammen."),
])
s += script("Übungssatz B · Gespräch 4 – in einem Malerbetrieb", [
    ("Sergej", "Ayşe, ich habe jetzt über sechzig Überstunden. Ich lasse sie mir auszahlen – das Geld kann ich gut gebrauchen."),
    ("Ayşe", "Ich nehme lieber frei. Letztes Jahr habe ich auch alles ausbezahlt bekommen und durchgearbeitet. Im Herbst war "
             "ich dann drei Wochen krank."),
    ("Sergej", "Das kann doch auch Zufall gewesen sein."),
    ("Ayşe", "Glaube ich nicht. Unsere Arbeit ist körperlich anstrengend. Wenn man sich nie richtig erholt, holt einen das "
             "irgendwann ein. Das Geld ist schnell weg – die Gesundheit kauft man sich davon nicht zurück."),
    ("Sergej", "Na ja … Vielleicht nehme ich wenigstens die Hälfte als Freizeit."),
])

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
