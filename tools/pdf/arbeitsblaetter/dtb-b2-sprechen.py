# Arbeitsblatt B2 Prüfung: DTB B2 Sprechen – Teil 1A, 1B/1C, Teil 2, Teil 3
# Format laut offiziellem Modelltest DTB B2 (telc, 2022): ca. 16 Min., Paarprüfung ohne Vorbereitungszeit;
# Teil 1A-1C ca. 4-5 Min. pro Person (5/5/2 P.), Teil 2 ca. 3 Min. (8 P.), Teil 3 ca. 4-5 Min. (10 P.), + 30 P. Sprache.
# Eigene Aufgaben im Stil der Prüfung; alle Situationen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-sprechen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle, CondPageBreak
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtb-b2-sprechen"
TITLE = "DTB B2 Sprechen: Thema präsentieren, mit Kollegen sprechen, Lösungen finden"
HEAD = "DTB B2 Sprechen: Thema präsentieren, mit Kollegen sprechen, Lösungen"  # page header (max. 70 characters)
LEVEL = "B2"
CB = sym("☐")
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'

st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=1.5)
st["mus"] = ParagraphStyle("mus", parent=st["cell"], fontSize=9.3, leading=12.1, spaceAfter=2)
st["card"] = ParagraphStyle("card", parent=st["cell"], fontSize=10.3, leading=13.8, spaceAfter=2)
st["cardh"] = ParagraphStyle("cardh", parent=st["cell"], fontName="Atk-B", fontSize=11, leading=14, textColor=TINTE, spaceAfter=3)


def grid(rows, widths, head=True, pad=4):
    data = [[c if not isinstance(c, str) else R(c, "cell") for c in r] for r in rows]
    t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    t.setStyle(TableStyle(style))
    return t


def card(title, paras, width=174):
    """Aufgabenkarte zum Üben: Rahmen, Titel, Text."""
    flow = [R(title, "cardh")] + [R(p, "card") for p in paras]
    t = Table([[flow]], colWidths=[width * mm])
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 1.2, TINTE), ("BACKGROUND", (0, 0), (-1, -1), NOTE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                           ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


def cards2(left, right):
    """Zwei Karten nebeneinander (Person A / Person B)."""
    t = Table([[card(*left, width=85), card(*right, width=85)]], colWidths=[87 * mm, 87 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return t


s = [
    R("DTB B2 · Prüfungstraining · Sprechen", "kick"),
    R("Sprechen: Thema, Gespräch, Lösung", "h1"),
    R("Thema präsentieren, mit Kollegen sprechen, Lösungen finden: Die mündliche Prüfung ist eine Paarprüfung – "
      "erst sprechen Sie allein, dann zu zweit wie im Betrieb.", "lead"),
]

s += [
    R("So läuft der Teil", "h2"),
    grid([
        ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Zeit</b>", "<b>Pkt.</b>"],
        ["<b>Teil 1A:</b> Über ein Thema sprechen",
         "allein: eines von zwei Themen wählen, frei sprechen (Erfahrungen, Situation im Beruf oder Herkunftsland, "
         "Vor- und Nachteile, Meinung). Wer Auswendiggelerntes aufsagt, wird unterbrochen.",
         "ca.&nbsp;2 Min.", "5"],
        ["<b>Teil 1B und 1C:</b> Prüferfragen und Erläuterung eines Aspekts",
         "1B: Die Prüfenden fragen zu Ihrem Thema, Sie antworten ausführlich und begründen. 1C: Ihre Partnerin / Ihr Partner "
         "erklärt einen Aspekt aus Ihrem Beitrag mit eigenen Worten – und umgekehrt.",
         "ca.&nbsp;2–3 Min.", "5&nbsp;+&nbsp;2"],
        ["<b>Teil 2:</b> Mit Kolleginnen und Kollegen sprechen",
         "zu zweit, per du: Erfahrungen austauschen, Tipps geben, nachfragen, Hilfe anbieten.",
         "ca.&nbsp;3 Min.", "8"],
        ["<b>Teil 3:</b> Lösungswege diskutieren",
         "zu zweit: ein Problem im Betrieb. Vorschläge sammeln, abwägen, sich einigen.",
         "ca.&nbsp;4–5 Min.", "10"],
    ], [44, 94, 22, 14], pad=3),
    Spacer(1, 3),
    box(R("<b>Insgesamt ca. 16 Minuten, keine Vorbereitungszeit.</b> Teil 1A–1C dauert ca. 4–5 Minuten pro Person. "
          "Dazu kommen 30 Punkte für die Sprache (Aussprache, Richtigkeit, Wortschatz), bewertet über die ganze Prüfung – "
          "zusammen 60 Punkte (laut offiziellem Modelltest, telc 2022). Sie sehen die Aufgabe und sprechen sofort. "
          "Üben Sie Redemittel und Aufbau deshalb vorher so oft, bis sie automatisch kommen.", "cell"), NOTE, GELB),
]

s += [
    R("Strategie: So gehen Sie vor", "h2"),
    R(f"<b>1. Teil 1A gliedern.</b> Im Kopf: {K('Einleitung – Erfahrung – Situation – Vor- und Nachteile – Meinung')}. "
      "Ein echtes Erlebnis aus dem Beruf macht Ihren Vortrag lebendig.", "item"),
    R(f"<b>2. Bei Prüferfragen: Antwort – Grund – Beispiel.</b> Frage nicht verstanden? Höflich nachfragen ist erlaubt.", "item"),
    R("<b>3. Teil 2 ist Ping-Pong.</b> Antwort plus Frage zurück: reagieren, erzählen, mindestens zwei konkrete Tipps, "
      "nachfragen, Hilfe anbieten. Unter Kollegen: <b>du</b>.", "item"),
    R("<b>4. Teil 3 endet mit einer Einigung.</b> Problem kurz nennen, Vorschläge begründen, reagieren – und die letzte "
      "Minute für das gemeinsame Ergebnis einplanen.", "item"),
    R("Achtung, Falle!", "h3"),
    table([
        ["<b>Typischer Fehler</b>", "<b>Besser so</b>"],
        ["Auswendig gelernter Text, der nicht zum Thema passt – oder nach 40 Sekunden fertig",
         "Gliederung lernen, frei füllen; zu typischen Themen je ein eigenes Beispiel vorbereiten"],
        ["Nur „Ja“ oder „Nein“ auf Prüferfragen", "Mit Grund und Beispiel antworten (2–4 Sätze)"],
        ["Teil 2 als Monolog; „Sie“ statt „du“ oder plötzlicher Wechsel", "Fragen zurückgeben, beim „du“ bleiben"],
        ["Teil 3: sofort mit allem einverstanden – oder keine Einigung am Ende",
         "Höflich einschränken oder widersprechen, dann Kompromiss und Ergebnis zusammenfassen"],
    ], [84, 90]),
]

# Redemittel
s += [PageBreak(), R("Redemittel für alle Teile", "h2")]
s += [
    R("Teil 1A – Über ein Thema sprechen", "h3"),
    table([
        ["<b>Einleitung</b>", f"{K('Ich habe mich für das Thema … entschieden, weil')} … · {K('Ich möchte über … sprechen, denn')} …"],
        ["<b>Erfahrung</b>", f"{K('In meinem Beruf als … habe ich erlebt, dass')} … · {K('Ich erinnere mich gut an eine Situation:')} …"],
        ["<b>Situation</b>", f"{K('In meiner Branche ist es üblich, dass')} … · {K('In meinem Herkunftsland ist das anders:')} …"],
        ["<b>Vor- und Nachteile</b>", f"{K('Ein großer Vorteil ist, dass')} … · {K('Ein Nachteil ist allerdings')} … · {K('Auf der anderen Seite')} …"],
        ["<b>Meinung, Schluss</b>", f"{K('Für mich überwiegen die Vorteile, weil')} … · {K('Zusammenfassend würde ich sagen, dass')} …"],
    ], [38, 136], head=False),
    R("Teil 1B und 1C – Fragen beantworten, einen Aspekt erläutern", "h3"),
    table([
        ["<b>Zeit gewinnen</b>", f"{K('Das ist eine interessante Frage.')} · {K('Darüber habe ich noch nicht nachgedacht, aber')} …"],
        ["<b>nachfragen</b>", f"{K('Könnten Sie die Frage bitte noch einmal wiederholen?')} · {K('Meinen Sie damit, dass')} …?"],
        ["<b>genauer erklären</b>", f"{K('Damit meine ich, dass')} … · {K('Ein konkretes Beispiel:')} … · {K('Genauer gesagt')} …"],
        ["<b>abwägen, vermuten</b>", f"{K('Das hängt davon ab, ob')} … · {K('Wenn das passieren würde, würde ich zuerst')} …"],
    ], [38, 136], head=False),
    R("Teil 2 – Mit Kolleginnen und Kollegen sprechen (du)", "h3"),
    table([
        ["<b>reagieren</b>", f"{K('Ach, echt?')} · {K('Das kenne ich.')} · {K('Das kann ich gut verstehen.')}"],
        ["<b>erzählen</b>", f"{K('Also, bei mir war das so:')} … · {K('Am Anfang war ich auch total nervös.')}"],
        ["<b>Tipps geben</b>", f"{K('An deiner Stelle würde ich')} … · {K('Was mir sehr geholfen hat:')} … · {K('Du könntest doch')} …"],
        ["<b>nachfragen</b>", f"{K('Und wie ist das bei dir?')} · {K('Was ist dir denn am wichtigsten?')}"],
        ["<b>Hilfe anbieten</b>", f"{K('Wenn du willst, kann ich')} … · {K('Sag Bescheid, wenn du Hilfe brauchst.')}"],
    ], [38, 136], head=False),
    R("Teil 3 – Lösungswege diskutieren", "h3"),
    table([
        ["<b>Problem nennen</b>", f"{K('Also, das Problem ist, dass')} … · {K('Wir sollen bis … einen Vorschlag machen.')}"],
        ["<b>vorschlagen</b>", f"{K('Ich schlage vor, dass')} … · {K('Was hältst du davon, wenn')} …? · {K('Wie wäre es mit')} …?"],
        ["<b>zustimmen</b>", f"{K('Das ist eine gute Idee.')} · {K('Da hast du völlig recht.')}"],
        ["<b>einschränken</b>", f"{K('Das ist ein guter Punkt, aber')} … · {K('Im Prinzip ja, nur')} …"],
        ["<b>widersprechen</b>", f"{K('Ich sehe das etwas anders, weil')} … · {K('Das finde ich schwierig, denn')} …"],
        ["<b>sich einigen</b>", f"{K('Könnten wir uns darauf einigen, dass')} …? · {K('Gut, dann schlagen wir vor: erstens')} …, {K('zweitens')} …"],
    ], [38, 136], head=False),
]

# Übung 1
s += [PageBreak()]
s += task(1, "Welcher Teil passt?",
          "Zu welchem Prüfungsteil passt der Satz am besten? Schreiben Sie 1A, 1B/1C, 2 oder 3.", 1)
u1 = [
    "Ich habe mich für das Thema „Teamarbeit“ entschieden, weil ich jeden Tag im Team arbeite.",
    "Darüber habe ich noch nicht nachgedacht, aber ich glaube, das hängt vom Betrieb ab.",
    "Ach, echt? Das kenne ich. Bei mir war das am Anfang genauso.",
    "Was hältst du davon, wenn wir zuerst die Kosten klären?",
    "In meiner Branche ist es üblich, dass man im Schichtdienst arbeitet.",
    "Wenn du willst, kann ich dir meine Notizen vom letzten Mal zeigen.",
    "Gut, dann schlagen wir vor: erstens …, zweitens …",
    "Wenn das passieren würde, würde ich zuerst mit meiner Chefin sprechen.",
]
s += [R(f'{i}. {t}  <font color="#8A93A8">______</font>', "item") for i, t in enumerate(u1, 1)]

# Übung 2 – Teil 1A
s += task(2, "Teil 1A: Über ein Thema sprechen",
          "Wählen Sie eines der beiden Themen und sprechen Sie ca. 2 Minuten darüber. Ihre Partnerin stoppt die Zeit "
          "und unterbricht Sie nicht.", 2)
s += [card("Thema A: Teamarbeit   ·   Thema B: Digitalisierung am Arbeitsplatz", [
    "<b>Sprechen Sie über:</b> Ihre eigenen Erfahrungen · die Situation in Ihrem Beruf / Ihrer Branche (oder in Ihrem "
    "Herkunftsland) · Vor- und Nachteile · Ihre Meinung",
])]

# Übung 3 – Teil 1B/1C
s += task(3, "Teil 1B und 1C: Prüferfragen beantworten",
          "Ihre Partnerin spielt die Prüferin und stellt die Fragen zu Thema A. Antworten Sie jeweils in 2–4 Sätzen: "
          "Antwort – Grund – Beispiel. Zu Thema B stellen Sie sich ähnliche Fragen selbst.", 2)
s += [card("Fragen der Prüferin (Thema A: Teamarbeit)", [
    "1. Sie haben gesagt, dass es im Team manchmal Konflikte gibt. Wie gehen Sie damit um?",
    "2. Können Sie genauer erklären, wie die Aufgaben in Ihrem Team verteilt werden?",
    "3. Sollte man im Team immer alles gemeinsam entscheiden?",
    "4. Was würden Sie tun, wenn ein Kollege seine Aufgaben regelmäßig nicht erledigt?",
])]

# Übung 4 – Teil 2
s += [CondPageBreak(85 * mm)]
s += task(4, "Teil 2: Mit Kolleginnen und Kollegen sprechen",
          "Sie arbeiten beide in einem Logistikzentrum und sprechen in der Pause miteinander. Person A liest nur Karte A, "
          "Person B nur Karte B. Sprechen Sie ca. 3 Minuten. Danach tauschen Sie die Rollen.", 2)
s += [cards2(
    ("Karte A – Sie", [
        "Ihre Kollegin / Ihr Kollege hat nächste Woche zum ersten Mal ein <b>Mitarbeitergespräch</b> mit der "
        "Teamleitung. Sie hatten schon mehrere solche Gespräche.",
        "– Erzählen Sie von Ihren Erfahrungen.",
        "– Geben Sie Tipps (Vorbereitung, eigene Wünsche, Kritik).",
        "– Fragen Sie nach ihrer / seiner Situation.",
        "– Bieten Sie Hilfe an.",
    ]),
    ("Karte B – Kollegin / Kollege", [
        "Sie beginnen das Gespräch und stellen nacheinander diese Fragen:",
        "„Sag mal, du hattest doch schon ein paar Mitarbeitergespräche, oder? Wie läuft das ab?“",
        "„Muss ich mich darauf vorbereiten? Ich weiß gar nicht, was ich sagen soll.“",
        "„Ich hätte gern mehr Verantwortung, vielleicht als Schichtleitung. Kann ich das einfach sagen?“",
        "„Und was mache ich, wenn die Teamleiterin mich kritisiert?“",
    ]),
)]

# Übung 5 – Teil 3
s += [PageBreak()]
s += task(5, "Teil 3: Lösungswege diskutieren",
          "Sie arbeiten mit Ihrer Partnerin / Ihrem Partner im selben Team. Es gibt ein Problem. Sammeln Sie Vorschläge, "
          "diskutieren Sie Vor- und Nachteile und einigen Sie sich auf eine Lösung. Zeit: ca. 5 Minuten.", 3)
s += [card("Situation: Parkplätze im Hotel Am Stadtpark", [
    "Sie arbeiten beide in einem Hotel in der Innenstadt. Seit dem Umbau der Tiefgarage gibt es für die Beschäftigten "
    "nur noch 5 statt 20 Parkplätze. Die Frühschicht beginnt um 6 Uhr – zu dieser Zeit fahren kaum Busse. Einige "
    "Kolleginnen und Kollegen kommen zu spät, viele sind gestresst. Die Hotelleitung bittet Sie beide, bis Montag "
    "einen Vorschlag für die Teambesprechung zu machen.",
    "<b>Mögliche Ideen:</b>",
    "– Fahrgemeinschaften (Liste im Personalraum)",
    "– Zuschuss zum Ticket für Bus und Bahn",
    "– die 5 Parkplätze nur für die Frühschicht",
    "– Frühschicht beginnt erst um 6:30 Uhr",
    "– Plätze in einem Parkhaus in der Nähe mieten",
    "– eigene Idee: …",
])]
s += [
    Spacer(1, 4),
    R("So bauen Sie das Gespräch auf", "h3"),
    grid([
        ["<b>Phase</b>", "<b>Was Sie tun</b>", "<b>ca.</b>"],
        ["1. Start", "Problem in einem Satz zusammenfassen, erste Idee nennen", "0,5 Min."],
        ["2. Vorschläge", "Je zwei Ideen vorschlagen und begründen", "1,5 Min."],
        ["3. Diskussion", "Vor- und Nachteile, auf die Partnerin reagieren: zustimmen, einschränken, widersprechen", "2 Min."],
        ["4. Einigung", "Kompromiss finden, Ergebnis gemeinsam zusammenfassen: „erstens …, zweitens …“", "1 Min."],
    ], [30, 124, 20], pad=3.5),
    Spacer(1, 4),
    box(R(f"<b>Checkliste nach dem Üben (für alle Teile):</b> {CB} frei gesprochen, ohne lange Pausen  "
          f"{CB} Gründe und Beispiele genannt  {CB} auf die Partnerin reagiert  {CB} Fragen gestellt  "
          f"{CB} Konjunktiv II benutzt (würde, könnte, hätte)  {CB} Teil 2: durchgehend „du“  "
          f"{CB} Teil 3: klare Einigung am Ende", "cell"), SOFT),
]

# Lösungen und Musterantworten
s += [CondPageBreak(50 * mm), R("Lösungen und Musterantworten", "h2"),
      R("Die Muster zeigen eine mögliche Lösung – in der Prüfung sprechen Sie natürlich über Ihre eigenen Erfahrungen.", "small")]
s += [R("Übung 1", "solh"),
      R("1. 1A  ·  2. 1B/1C  ·  3. 2  ·  4. 3  ·  5. 1A  ·  6. 2  ·  7. 3  ·  8. 1B/1C", "sol")]

m1 = [
    "Ich habe mich für das Thema „Teamarbeit“ entschieden, weil ich jeden Tag im Team arbeite.",
    "Ich bin Elektronikerin und arbeite seit fünf Jahren bei einem Betrieb, der Solaranlagen installiert. Auf der "
    "Baustelle sind wir meistens zu dritt: Eine Person ist auf dem Dach, eine bereitet das Material vor, und ich mache "
    "die elektrischen Anschlüsse. Ohne gute Absprachen geht da gar nichts – auch wegen der Sicherheit.",
    "In meiner Branche ist Teamarbeit ganz normal. In meinem Herkunftsland habe ich dagegen eher allein gearbeitet, "
    "und der Chef hat alle Entscheidungen getroffen. Hier werden wir öfter nach unserer Meinung gefragt – das gefällt mir.",
    "Ein großer Vorteil ist, dass man voneinander lernt und schneller fertig wird. Wenn jemand krank ist, können die "
    "anderen einspringen. Ein Nachteil ist allerdings, dass es manchmal Konflikte gibt, zum Beispiel wenn jemand "
    "Absprachen nicht einhält. Außerdem dauern Entscheidungen im Team manchmal länger.",
    "Zusammenfassend würde ich sagen: Für mich überwiegen die Vorteile klar. Wichtig ist nur, dass die Aufgaben klar "
    "verteilt sind und man offen über Probleme spricht.",
]
s += [KeepTogether([R("Übung 2 – Muster Teil 1A (Thema A)", "solh"), box([R(p, "mus") for p in m1], HELLGRUEN, GRUEN)])]

m2 = [
    "<b>1.</b> Ich spreche das Problem möglichst schnell an, aber nicht vor allen anderen. Meistens klären wir das in "
    "der Pause unter vier Augen. Letzten Monat hat das sehr gut funktioniert.",
    "<b>2.</b> Damit meine ich: Jeden Morgen besprechen wir zehn Minuten lang, wer welche Aufgabe übernimmt. Der "
    "Vorarbeiter entscheidet am Ende, aber wir sagen vorher, wer was am besten kann. So arbeitet jede Person dort, wo sie "
    "stark ist.",
    "<b>3.</b> Nein, das finde ich nicht. Kleine Dinge sollte jeder selbst entscheiden, sonst dauert alles zu lange. "
    "Aber bei wichtigen Fragen, zum Beispiel bei neuen Arbeitszeiten, sollte man das ganze Team fragen.",
    "<b>4.</b> Ich würde zuerst mit ihm selbst sprechen – vielleicht hat er private Probleme. Wenn sich danach nichts "
    "ändert, würde ich mit unserer Teamleitung reden, weil sonst die anderen seine Arbeit machen müssen.",
]
s += [KeepTogether([R("Übung 3 – Muster Teil 1B und 1C", "solh"), box([R(p, "mus") for p in m2], HELLGRUEN, GRUEN)])]

m3 = [
    "<b>B:</b> Sag mal, du hattest doch schon ein paar Mitarbeitergespräche, oder? Wie läuft das ab?",
    "<b>A:</b> Ja, schon drei. Ehrlich gesagt war ich beim ersten Mal total nervös. Aber es ist eigentlich ein ganz "
    "entspanntes Gespräch: Die Teamleiterin fragt, wie es dir geht, was gut läuft und was du dir wünschst.",
    "<b>B:</b> Muss ich mich darauf vorbereiten? Ich weiß gar nicht, was ich sagen soll.",
    "<b>A:</b> An deiner Stelle würde ich mir vorher ein paar Notizen machen: Was hat dir dieses Jahr Spaß gemacht? Was "
    "war schwierig? Was mir sehr geholfen hat: Ich habe meine Wünsche aufgeschrieben, sonst vergesse ich sie. Was ist dir "
    "denn am wichtigsten?",
    "<b>B:</b> Ich hätte gern mehr Verantwortung, vielleicht als Schichtleitung. Kann ich das einfach sagen?",
    "<b>A:</b> Klar, unbedingt! Sag am besten auch, warum du das kannst – du arbeitest doch neue Leute oft ein. Du könntest "
    "auch fragen, ob es dafür eine Weiterbildung gibt.",
    "<b>B:</b> Und was mache ich, wenn die Teamleiterin mich kritisiert?",
    "<b>A:</b> Erst mal ruhig zuhören und nachfragen, was genau sie meint. Kritik ist da ganz normal, das kenne ich auch. "
    "Wenn du willst, gehen wir am Montag in der Pause zusammen deine Notizen durch.",
]
s += [KeepTogether([R("Übung 4 – Muster Teil 2", "solh"), box([R(p, "mus") for p in m3], HELLGRUEN, GRUEN)])]

m4 = [
    "<b>A:</b> Also, das Problem ist, dass wir nur noch fünf Parkplätze haben und morgens um sechs kaum Busse fahren. "
    "Wir sollen bis Montag einen Vorschlag machen. Was meinst du?",
    "<b>B:</b> Ich schlage vor, dass wir die fünf Parkplätze nur für die Frühschicht reservieren. Später am Tag fahren "
    "ja genug Busse.",
    "<b>A:</b> Das ist ein guter Punkt, aber fünf Plätze reichen nicht – in der Frühschicht sind wir mindestens zwölf Leute.",
    "<b>B:</b> Stimmt. Was hältst du dann von Fahrgemeinschaften? Viele wohnen im selben Stadtteil.",
    "<b>A:</b> Gute Idee! Wenn in jedem Auto drei Leute sitzen, reichen fünf Plätze schon für fünfzehn Personen. "
    "Wir könnten eine Liste im Personalraum aufhängen.",
    "<b>B:</b> Und wer gar nicht mit dem Auto kommt? Wie wäre es, wenn die Frühschicht erst um halb sieben beginnt?",
    "<b>A:</b> Das sehe ich etwas anders. Um halb sieben wollen die ersten Gäste schon frühstücken, das klappt in der "
    "Küche nicht.",
    "<b>B:</b> Da hast du recht. Dann vielleicht ein Zuschuss zum Ticket für Bus und Bahn – für alle, die nicht mit dem Auto kommen?",
    "<b>A:</b> Das finde ich fair. Das Parkhaus wäre dagegen zu teuer, oder?",
    "<b>B:</b> Ja, das lassen wir erst mal weg. Könnten wir uns darauf einigen, dass wir drei Dinge vorschlagen?",
    "<b>A:</b> Gut, dann schlagen wir vor: Erstens sind die fünf Parkplätze nur für Fahrgemeinschaften in der Frühschicht. "
    "Zweitens hängen wir dafür eine Liste auf. Und drittens zahlt das Hotel allen anderen einen Zuschuss zum Ticket.",
]
s += [KeepTogether([R("Übung 5 – Muster Teil 3", "solh"), box([R(p, "mus") for p in m4], HELLGRUEN, GRUEN)])]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
