# Arbeitsblatt DTB B2 Prüfung: Sprechen Teil 1B (Prüferfragen) und 1C (Erläuterung eines Aspekts)
# Format laut offiziellem Modelltest DTB B2 (telc, Übungstest 1, 2022): Paarprüfung, keine Vorbereitungszeit,
# Teil 1A–1C ca. 4–5 Min. pro Person; Punkte 1A 5, 1B 5, 1C 2. Eigene Themen und Fragen, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-sprechen-teil-1c.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, TINTE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b2-sprechen-teil-1c"
TITLE = "DTB B2 Sprechen Teil 1B/1C: Fragen beantworten und einen Aspekt erläutern"
HEAD = "DTB B2 Sprechen Teil 1B/1C: Fragen beantworten, Aspekt erläutern"  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.5, leading=12, spaceAfter=1.2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.6, leading=12, leftIndent=10, firstLineIndent=-10, spaceAfter=2)
st["card"] = ParagraphStyle("card", parent=st["cell"], fontSize=9.4, leading=11.8)


def two_col(left, right, lbg=HELLGRUEN, rbg=NOTE, lb=GRUEN, rb=GELB):
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), lbg), ("BACKGROUND", (1, 0), (1, 0), rbg),
        ("LINEBEFORE", (0, 0), (0, 0), 3, lb), ("LINEBEFORE", (1, 0), (1, 0), 3, rb),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


def card(nr, thema, punkte, fragen, aspekt):
    """Übungskarte: Thema (1A kurz), drei Prüferfragen (1B), Auftrag für 1C."""
    body = [R(f"<b>Karte {nr} · {thema}</b>", "cell"),
            R(f"<font color='#566078'>1A (kurz, ca. 1 Min. im Training):</font> {punkte}", "card"),
            R("<font color='#566078'>1B – Fragen für die Prüferrolle:</font>", "card")]
    body += [R(f"• {f}", "card") for f in fragen]
    body += [R(f"<font color='#566078'>1C – Auftrag an die Partnerin / den Partner:</font> <b>{aspekt}</b>", "card")]
    t = Table([[body]], colWidths=[85 * mm])
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.9, TINTE), ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                           ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return t


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Sprechen Teil 1", "kick"),
    R("Fragen beantworten und einen Aspekt erläutern", "h1"),
    R("Nach Ihrem kurzen Vortrag (1A) ist Teil 1 noch nicht vorbei: Die Prüfenden stellen Fragen (1B), und danach geht es "
      "um einen Aspekt aus einem Beitrag (1C). Hier üben Sie spontan, ausführlich und genau zu antworten – und gut zuzuhören.",
      "lead"),
    R("So läuft der Teil (laut Modelltest, telc 2022)", "h2"),
    table([
        ["<b>Teil</b>", "<b>Was passiert?</b>", "<b>Punkte</b>"],
        ["<b>1A</b> Über ein Thema sprechen", "Sie wählen eins von zwei Themen und sprechen allein, ca. 2 Minuten.", "5"],
        ["<b>1B</b> Prüferfragen", "Die oder der Prüfende stellt Ihnen Anschlussfragen zu Ihrem Thema. Sie antworten.", "5"],
        ["<b>1C</b> Erläuterung eines Aspekts", "Sie erläutern einen Teilaspekt aus dem Beitrag Ihrer Partnerin bzw. Ihres "
         "Partners. Danach wechseln die Rollen.", "2"],
    ], [44, 112, 18]),
    Spacer(1, 3),
    box(R("<b>Rahmen:</b> Paarprüfung, <b>keine Vorbereitungszeit</b>. Teil 1A–1C dauert zusammen ca. 4–5 Minuten pro Person. "
          "Erst sind Sie mit 1A–1C dran, dann Ihre Partnerin oder Ihr Partner. Auswendig gelernte Beiträge werden "
          "unterbrochen und durch Fragen gesteuert. Bewertet werden auch Aussprache, Richtigkeit und Wortschatz – über die "
          "ganze Prüfung.", "cell"), NOTE, GELB),
]

s += [R("Strategien und Fallen", "h2"), two_col(
    [R("<b>So gehen Sie vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate([
        f"<b>1B: Die A-B-B-Regel.</b> {K('A')}ntwort geben – {K('B')}egründen – {K('B')}eispiel nennen. "
        "So werden aus einem Satz drei bis vier.",
        "Frage nicht verstanden? Fragen Sie höflich nach – das ist besser als zu raten.",
        "<b>1C: Schon in 1A der Partnerin gut zuhören.</b> Merken Sie sich ihre zwei, drei Hauptpunkte "
        "(Vorteil, Nachteil, Beispiel, Meinung).",
        "In 1C <b>mit eigenen Worten</b> erklären: Was hat sie gesagt? Was meint sie damit? Ein Beispiel dazu.",
        "Ruhig ein paar Sekunden nachdenken – mit einem Redemittel statt mit Schweigen.",
    ], 1)],
    [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [R(f"– {t}", "tip") for t in [
        "Nur „Ja“ oder „Nein“ in 1B: Das zeigt zu wenig Sprache.",
        "Wieder den eigenen Vortrag aus 1A abspulen, statt auf die Frage zu antworten.",
        "Während die Partnerin spricht, nur an das eigene Thema denken – dann fehlt in 1C der Inhalt.",
        "In 1C nur die eigene Meinung sagen, statt den Aspekt der Partnerin zu erläutern.",
        "Wörtlich wiederholen: Erläutern heißt erklären, nicht nachsprechen.",
    ]])]

# Redemittel
s += [CondPageBreak(90 * mm), R("Redemittel", "h2"), table([
    ["<b>nachfragen</b> (1B)", f"{K('Könnten Sie die Frage bitte wiederholen?')} · {K('Meinen Sie damit, ob …?')} · "
     f"{K('Verstehe ich Sie richtig: Sie möchten wissen, …?')} · {K('Was meinen Sie genau mit …?')}"],
    ["<b>Zeit gewinnen</b>", f"{K('Das ist eine gute Frage.')} · {K('Darüber habe ich noch nicht nachgedacht, aber …')} · "
     f"{K('Lassen Sie mich kurz überlegen.')}"],
    ["<b>antworten, begründen</b>", f"{K('Ich bin der Meinung, dass …, weil …')} · {K('Der wichtigste Grund ist …')} · "
     f"{K('Das hängt davon ab, ob …')}"],
    ["<b>Beispiel geben</b>", f"{K('Ein Beispiel aus meinem Alltag: …')} · {K('In meiner letzten Firma war es so: …')} · "
     f"{K('Nehmen wir an, …')}"],
    ["<b>einschränken</b>", f"{K('Grundsätzlich ja, aber …')} · {K('Das gilt allerdings nicht für …')} · "
     f"{K('Einerseits …, andererseits …')}"],
    ["<b>wiedergeben</b> (1C)", f"{K('Meine Partnerin hat gesagt, dass …')} · {K('Herr X hat betont, dass …')} · "
     f"{K('Ein wichtiger Punkt in ihrem Beitrag war …')}"],
    ["<b>erläutern</b> (1C)", f"{K('Damit meint sie, dass …')} · {K('Mit anderen Worten: …')} · "
     f"{K('Das bedeutet konkret, dass …')} · {K('Das zeigt zum Beispiel, dass …')}"],
    ["<b>abschließen</b>", f"{K('Kurz gesagt: …')} · {K('Deshalb finde ich diesen Punkt besonders wichtig.')}"],
], [36, 138], head=False)]

# Übung 1
s += task(1, "Aus kurz wird ausführlich (1B)",
          "Die Antworten sind zu kurz. Schreiben Sie eine ausführliche Antwort nach der A-B-B-Regel "
          "(Antwort – Begründung – Beispiel).", 2)
for i, (q, a) in enumerate([
        ("„Würden Sie gern im Schichtdienst arbeiten?“", "„Nein.“"),
        ("„Ist eine Probezeit für neue Mitarbeitende sinnvoll?“", "„Ja, schon.“"),
        ("„Sollten Kolleginnen und Kollegen im Team per du sein?“", "„Weiß nicht, vielleicht.“")], 1):
    s += [KeepTogether([R(f"<b>{i}.</b> {q} – {a}", "item"), lines(2)])]

# Übung 2 – Karten
s += [PageBreak()]
s += task(2, "Sechs Übungskarten zu zweit (oder zu dritt)",
          "<b>Ablauf:</b> Person A wählt eine Karte und spricht ca. 1 Minute zum Thema (1A, verkürzt fürs Training). "
          "Person B spielt die Prüferin und stellt zwei bis drei Fragen von der Karte (1B). Danach erläutert B den "
          "1C-Aspekt aus dem Beitrag von A – A hört zu und sagt am Ende, ob alles richtig wiedergegeben wurde. "
          "Dann tauschen Sie die Rollen. Zu dritt: Person C ist Prüfer/in und stoppt die Zeit.", 3)
cards = [
    card(1, "Teilzeit arbeiten", "Wer arbeitet in Teilzeit? Vor- und Nachteile · Ihre Erfahrung oder Situation in Ihrem Herkunftsland",
         ["Sollte jede Stelle auch in Teilzeit möglich sein?", "Was bedeutet Teilzeit für die Rente?",
          "Würden Sie selbst in Teilzeit arbeiten? Warum (nicht)?"],
         "Erläutern Sie einen Nachteil, den Ihre Partnerin / Ihr Partner genannt hat."),
    card(2, "Messenger-Gruppen im Team", "Wofür nutzt man sie? Vor- und Nachteile · Regeln, die Sie sinnvoll finden",
         ["Sollte man nach Feierabend auf Nachrichten antworten?", "Was ist besser: Messenger oder E-Mail?",
          "Haben Sie schon einmal ein Missverständnis im Chat erlebt?"],
         "Erläutern Sie eine Regel, die Ihre Partnerin / Ihr Partner vorgeschlagen hat."),
    card(3, "Ausbildung oder sofort Geld verdienen?", "Situation für Erwachsene, die neu in Deutschland sind · Vor- und Nachteile · Ihre Meinung",
         ["Lohnt sich eine Ausbildung auch mit 35 oder 40 Jahren?", "Wie kann man eine Ausbildung finanzieren?",
          "Was raten Sie einer Freundin, die schnell Geld braucht?"],
         "Erläutern Sie, warum Ihre Partnerin / Ihr Partner sich so entschieden hat."),
    card(4, "Mehrere Sprachen am Arbeitsplatz", "Wo sprechen Kollegen verschiedene Sprachen? Chancen und Probleme · Erfahrungen",
         ["Sollte im Betrieb nur Deutsch gesprochen werden?", "Wie kann man Missverständnisse vermeiden?",
          "Hat Ihnen Ihre Muttersprache schon einmal im Beruf geholfen?"],
         "Erläutern Sie das Beispiel, das Ihre Partnerin / Ihr Partner erzählt hat."),
    card(5, "Feedback von Vorgesetzten", "Wie oft, in welcher Form? Was ist gutes Feedback? · Erfahrungen",
         ["Sollten auch Mitarbeitende ihre Chefin bewerten dürfen?", "Wie reagieren Sie auf Kritik?",
          "Ist Lob in Ihrem Herkunftsland üblich?"],
         "Erläutern Sie, was Ihre Partnerin / Ihr Partner unter gutem Feedback versteht."),
    card(6, "Ehrenamt neben dem Beruf", "Wo engagieren sich Menschen? Warum? Vor- und Nachteile · eigene Erfahrung",
         ["Sollten Arbeitgeber ein Ehrenamt unterstützen?", "Kann ein Ehrenamt bei der Jobsuche helfen?",
          "Wie viel Zeit wäre für Sie realistisch?"],
         "Erläutern Sie einen Grund für ein Ehrenamt, den Ihre Partnerin / Ihr Partner genannt hat."),
]
grid = Table([[cards[0], cards[1]], [cards[2], cards[3]], [cards[4], cards[5]]], colWidths=[87 * mm, 87 * mm])
grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                          ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 0),
                          ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
s += [grid]
s += [Spacer(1, 3), box(R("<b>Rückmeldung nach jeder Runde:</b> Hat A ausführlich geantwortet (A-B-B)? Hat B in 1C den "
                          "Aspekt richtig und mit eigenen Worten erklärt? Welches Redemittel wurde benutzt?", "cell"), SOFT)]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen und Musterantworten", "h2"),
      R("Mögliche Antworten auf B2-Niveau – andere Inhalte sind natürlich richtig. Erst selbst sprechen, dann vergleichen. "
        "Die Namen in den 1C-Beispielen sind erfunden; in der Prüfung geht es um das, was Ihre Partnerin oder Ihr Partner tatsächlich gesagt hat.", "small"),
      R("Übung 1 – Beispiele", "solh"),
      R("1. Ehrlich gesagt eher nicht. Wir haben zwei kleine Kinder, und mit wechselnden Schichten wäre die Betreuung kaum zu "
        "organisieren. Eine Nachbarin arbeitet im Krankenhaus im Schichtdienst – sie sagt, sie schläft oft schlecht.", "sol"),
      R("2. Ja, ich halte eine Probezeit für sinnvoll, und zwar für beide Seiten. Der Betrieb sieht, ob die neue Person ins Team "
        "passt, und man selbst merkt, ob einem die Arbeit gefällt. Bei meiner ersten Stelle habe ich nach drei Monaten gemerkt, "
        "dass ich lieber mit Menschen arbeite.", "sol"),
      R("3. Das hängt vom Betrieb ab. In einem kleinen Team finde ich das Du angenehm, weil es die Zusammenarbeit lockerer macht. "
        "Mit Kunden oder in einer großen Behörde würde ich aber beim Sie bleiben. In meiner Werkstatt duzen sich zum Beispiel "
        "alle, sogar der Chef.", "sol"),
      R("Übung 2 – Musterantworten (je eine Antwort 1B und ein Beispiel 1C)", "solh")]

muster = [
    ("Karte 1 · Teilzeit",
     "„Sollte jede Stelle auch in Teilzeit möglich sein?“ – Grundsätzlich ja, aber nicht überall ist es einfach. In der Pflege "
     "oder im Büro kann man Schichten gut aufteilen. Bei einer Bauleitung, wo man ein Projekt von Anfang bis Ende betreut, "
     "stelle ich mir das schwieriger vor.",
     "Herr Amiri hat als Nachteil genannt, dass man in Teilzeit weniger verdient. Damit meint er nicht nur das Gehalt jetzt, "
     "sondern auch später: Wer lange wenig einzahlt, bekommt auch weniger Rente."),
    ("Karte 2 · Messenger-Gruppen",
     "„Sollte man nach Feierabend antworten?“ – Meiner Meinung nach nicht. Der Feierabend ist zur Erholung da. Wenn etwas "
     "wirklich dringend ist, kann man anrufen. In meinem letzten Team hatten wir die Regel: nach 18 Uhr keine Nachrichten.",
     "Frau Kovač hat vorgeschlagen, dass es zwei Gruppen geben sollte: eine nur für Dienstpläne und wichtige Infos und eine für "
     "private Sachen. Mit anderen Worten: Wichtiges soll nicht zwischen Geburtstagsgrüßen untergehen."),
    ("Karte 3 · Ausbildung",
     "„Lohnt sich eine Ausbildung auch mit 40?“ – Ich denke, ja. Man arbeitet danach oft noch 25 Jahre und verdient mit einem "
     "Abschluss meistens mehr. Ein Kollege von mir hat mit 41 eine Ausbildung zum Elektriker gemacht und ist jetzt Vorarbeiter.",
     "Frau Mensah hat erklärt, dass sie zuerst ein Jahr arbeiten möchte. Damit meint sie, dass sie Geld sparen will, damit sie "
     "die Ausbildung später ohne Schulden schafft – sie hat also nicht gegen die Ausbildung entschieden, sondern nur später."),
    ("Karte 4 · Mehrere Sprachen",
     "„Sollte im Betrieb nur Deutsch gesprochen werden?“ – Bei der Arbeit im Team auf jeden Fall, damit niemand ausgeschlossen "
     "wird, besonders bei Sicherheitsfragen. In der Pause finde ich andere Sprachen aber völlig in Ordnung.",
     "Herr Lindqvist hat erzählt, dass er im Lager einem neuen Kollegen auf Schwedisch die Sicherheitsregeln erklärt hat. "
     "Das zeigt, dass eine gemeinsame Muttersprache am Anfang Unfälle verhindern kann."),
    ("Karte 5 · Feedback",
     "„Wie reagieren Sie auf Kritik?“ – Früher habe ich mich oft geärgert. Heute frage ich nach: Was genau soll ich anders "
     "machen? Bei meinem letzten Praktikum hat mir das sehr geholfen, weil ich konkrete Tipps bekommen habe.",
     "Frau Duarte hat gesagt, gutes Feedback ist konkret und kommt zeitnah. Das bedeutet: nicht nur einmal im Jahr „Sie müssen "
     "sorgfältiger sein“, sondern direkt nach der Situation sagen, was genau nicht gut war."),
    ("Karte 6 · Ehrenamt",
     "„Kann ein Ehrenamt bei der Jobsuche helfen?“ – Ja, das glaube ich. Man lernt Leute kennen, spricht mehr Deutsch und kann "
     "im Lebenslauf zeigen, dass man zuverlässig ist. Eine Bekannte hat über die Tafel ihre jetzige Stelle gefunden.",
     "Herr Haddad hat als Grund genannt, dass er „etwas zurückgeben“ möchte. Damit meint er, dass ihm selbst am Anfang in "
     "Deutschland viele Ehrenamtliche geholfen haben, und jetzt hilft er anderen bei Formularen."),
]
for t_, a, c in muster:
    s += [KeepTogether([R(f"<b>{t_}</b>", "sol"),
                        R(f"<font color='#566078'>1B:</font> {a}", "sol"),
                        R(f"<font color='#566078'>1C:</font> {c}", "sol"), Spacer(1, 2)])]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
