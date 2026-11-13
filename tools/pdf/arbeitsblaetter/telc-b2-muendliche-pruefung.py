# Arbeitsblatt telc Deutsch B2: Mündliche Prüfung (Präsentation, Diskussion, gemeinsam planen)
# Format laut Website-Daten (sim/telc-b2.js): Paarprüfung ca. 15 Min. + 20 Min. Vorbereitung, 3 Teile à ca. 5 Min.
# und 25 Punkte, mündlich 75 Punkte, Bestehen ab 45. Eigene Aufgaben im Stil der Prüfung, keine telc-Originale.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-muendliche-pruefung.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle
from reportlab.lib.colors import HexColor

SLUG = "telc-b2-muendliche-pruefung"
TITLE = "telc B2 Mündliche Prüfung: Präsentation, Diskussion, gemeinsam planen"  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
X = lambda t: f'<font color="#C2362B">{fallback(t)}</font>'
CB = sym('☐')

st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["dlg"] = ParagraphStyle("dlg", parent=st["cell"], fontSize=9.4, leading=12, spaceAfter=2.5, leftIndent=12, firstLineIndent=-12)
st["card"] = ParagraphStyle("card", parent=st["cell"], fontSize=9.6, leading=12.4)


def card(title, body, width=87):
    """Aufgabenkarte mit Rahmen."""
    t = Table([[R(f"<b>{title}</b>", "card")], [R(body, "card")]], colWidths=[width * mm])
    t.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.8, HexColor("#2341B5")), ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return t


def pair(a, b):
    t = Table([[a, b]], colWidths=[88 * mm, 88 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return t



def notes(head, widths, h):
    """Notiztabelle: Kopfzeile + eine leere Schreibzeile der Höhe h (mm)."""
    t = Table([[R(f"<b>{x}</b>", "cell") for x in head], [""] * len(head)], colWidths=[w * mm for w in widths], rowHeights=[None, h * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("GRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


s = [
    R("telc Deutsch B2 · Sprechen · Prüfungstraining", "kick"),
    R("Die mündliche Prüfung", "h1"),
    R(
        "Ablauf, Strategien, Redemittel – und Aufgabenkarten, um zu zweit wie in der Prüfung zu üben.",
        "lead",
    ),
]

# ── So läuft die Prüfung ──
s += [
    R("So läuft die Prüfung", "h2"),
    table(
        [
            ["<b>Form</b>", "<b>Paarprüfung</b>: Sie sprechen mit einer Partnerin oder einem Partner – ca. <b>15 Minuten</b> für drei Teile."],
            ["<b>Vorbereitung</b>",
             "<b>20 Minuten</b> – Sie bereiten alle drei Teile vor. Notizen dürfen Sie mitnehmen, aber nicht ablesen."],
            ["<b>Punkte</b>",
             "<b>75 Punkte</b> (je Teil 25). Zum Bestehen brauchen Sie mündlich mindestens <b>45 von 75 Punkten</b> (60 %) – "
             "und im schriftlichen Teil ebenfalls mindestens 60 %."],
        ],
        [30, 144],
        head=False,
    ),
    Spacer(1, 6),
    table(
        [
            ["<b>Teil</b>", "<b>Zeit</b>", "<b>Was passiert?</b>"],
            ["<b>1 Über Erfahrungen sprechen (Präsentation)</b>", "ca. 5 Min. für beide",
             "Eines von zwei Themen wählen, etwa <b>anderthalb Minuten</b> zusammenhängend sprechen, "
             "dann Fragen der Partnerin / des Partners beantworten. Danach Rollentausch."],
            ["<b>2 Diskussion</b>", "ca. 5 Min.",
             "Kurzen Zeitungstext zu einem kontroversen Thema lesen und diskutieren: Meinung, Begründung, "
             "auf Argumente eingehen – am Ende zusammenfassen, ob Sie sich einigen konnten."],
            ["<b>3 Gemeinsam etwas planen</b>", "ca. 5 Min.",
             "Zusammen etwas planen (z. B. Feier, Ausflug, Projekt): zu allen Punkten der Aufgabenkarte "
             "Vorschläge machen, aufeinander reagieren, sich einigen."],
        ],
        [46, 30, 98],
    ),
]

s += [
    R("Strategie: so holen Sie Punkte", "h2"),
    R("<b>1. Vorbereitung nutzen:</b> nur Stichpunkte – Teil 1: vier Stichpunkte, Teil 2: je zwei Argumente dafür und dagegen "
      "plus Beispiel, Teil 3: zu jedem Punkt eine Idee.", "item"),
    R("<b>2. Frei sprechen:</b> Mit einem klaren Einstieg beginnen („Ich möchte heute über … sprechen.“) und auf die Partnerin schauen, nicht aufs Blatt.", "item"),
    R("<b>3. Wirklich miteinander sprechen:</b> zuhören, nachfragen, zustimmen oder widersprechen. In Teil 3 wird die Zusammenarbeit "
      "ausdrücklich bewertet – fragen Sie aktiv: „Was meinst du?“", "item"),
    R("<b>4. Zusammenfassen:</b> Am Ende von Teil 2 und Teil 3 kurz das Ergebnis nennen: Wo sind Sie sich einig, wer macht was?", "item"),
    box(R("<b>Tipp:</b> Planen Sie in Teil 1 einen persönlichen Moment ein – ein Gefühl, eine kleine Anekdote. "
          "Das macht die Präsentation lebendig und zeigt B2-Wortschatz."), NOTE, GELB),
]

s += [
    KeepTogether([
        R("Typische Fallen", "h3"),
        table(
            [
                ["<b>Teil 1</b>", f"{X('✗')} einen auswendig gelernten Text abspulen · {X('✗')} zu kurz sprechen und dann schweigen · "
                                  f"{X('✗')} nicht zuhören und eine Frage stellen, die schon beantwortet wurde"],
                ["<b>Teil 2</b>", f"{X('✗')} Monologe statt Diskussion · {X('✗')} der Partnerin sofort in allem zustimmen · "
                                  f"{X('✗')} nur den Zeitungstext wiederholen, ohne eigene Gedanken"],
                ["<b>Teil 3</b>", f"{X('✗')} einen Punkt der Aufgabenkarte vergessen · {X('✗')} nur „Ja, gut.“ sagen · "
                                  f"{X('✗')} alles allein bestimmen und die Partnerin nicht einbeziehen"],
            ],
            [20, 154],
            head=False,
        ),
    ])
]

# ── Teil 1 ──
s += [
    KeepTogether([R("Teil 1: Über Erfahrungen sprechen (Präsentation)", "h2"), table(
        [
            ["<b>Wofür?</b>", "<b>Redemittel</b>"],
            ["<b>Einstieg</b>", f"{K('Ich möchte heute über')} … {K('sprechen.')} · {K('Ich habe das Thema')} … {K('gewählt, weil')} …"],
            ["<b>erzählen</b>", f"{K('Damals war ich')} … {K('Jahre alt und')} … · {K('Am Anfang fiel es mir schwer,')} … · "
                                f"{K('Nachdem ich')} … {K('hatte,')} …"],
            ["<b>Bedeutung</b>", f"{K('Das war ein Wendepunkt in meinem Leben, weil')} … · {K('Was mich besonders beeindruckt hat, war')} …"],
            ["<b>Rückblick, Empfehlung</b>", f"{K('Rückblickend kann ich sagen, dass')} … · {K('Daraus habe ich gelernt, dass')} … · "
                                             f"{K('Ich kann das jedem empfehlen, der')} …"],
            ["<b>nachfragen und antworten</b>", f"{K('Du hast erzählt, dass')} … {K('– wie war das genau?')} · "
                                                    f"{K('Würdest du heute etwas anders machen?')} · {K('Gute Frage – das war so:')} …"],
        ],
        [40, 134],
    )]),
    Spacer(1, 6),
    R("Aufgabenkarten zum Üben zu zweit", "h3"),
    R("Person A und Person B wählen auf ihrer Karte je ein Thema. Vorbereitung: 3–4 Minuten Stichpunkte. "
      "Dann spricht A etwa 1,5 Minuten, B stellt zwei Fragen. Danach tauschen Sie die Rollen.", "small"),
    pair(
        card("Person A – wählen Sie ein Thema",
             "<b>Thema 1:</b> Mein erster Arbeitstag in einem neuen Job<br/>"
             "<b>Thema 2:</b> Eine Person, von der ich viel gelernt habe<br/><br/>"
             "Sprechen Sie über:<br/>– was passiert ist bzw. wer die Person ist<br/>– warum es / sie für Sie wichtig war<br/>"
             "– was sich dadurch verändert hat bzw. was Sie gelernt haben<br/>– welchen Tipp Sie anderen geben würden"),
        card("Person B – wählen Sie ein Thema",
             "<b>Thema 1:</b> Eine Entscheidung, die mir schwergefallen ist<br/>"
             "<b>Thema 2:</b> Eine Serie oder ein Podcast, die / der mich begeistert hat<br/><br/>"
             "Sprechen Sie über:<br/>– worum es geht bzw. was passiert ist<br/>– warum es für Sie wichtig war<br/>"
             "– was Sie daraus gelernt haben<br/>– ob Sie es anderen empfehlen würden"),
    ),
    Spacer(1, 6),
    KeepTogether([
        R("Meine Stichpunkte (nicht ablesen – nur als Gedächtnisstütze):", "small"),
        notes(["Was?", "Warum wichtig?", "Was hat sich verändert?", "Empfehlung / Tipp"], [43.5] * 4, 13),
    ]),
]

u1h = task(
    1,
    "Gute Nachfragen stellen",
    "Sie hören diese Sätze aus einer Präsentation. Stellen Sie jeweils eine passende, echte Nachfrage – nicht nach etwas, "
    "das schon gesagt wurde.",
    2,
)
u1 = [
    "„Mit 34 habe ich noch einmal eine Ausbildung zur Pflegefachfrau angefangen. Am Anfang war das hart.“",
    "„Mein früherer Chef in Izmir hat mir gezeigt, wie man mit schwierigen Kunden umgeht.“",
    "„Die Serie spielt in einem kleinen Dorf in Norwegen. Ich habe sie im Original mit Untertiteln gesehen.“",
]
s += u1h
for i, t in enumerate(u1, 1):
    s += [R(f"{i}. {t}", "item"), lines(1)]

# ── Teil 2 ──
s += [
    KeepTogether([R("Teil 2: Diskussion", "h2"), table(
        [
            ["<b>Wofür?</b>", "<b>Redemittel</b>"],
            ["<b>Meinung äußern</b>", f"{K('Meiner Meinung nach')} … · {K('Ich bin der Ansicht, dass')} … · {K('Ein wichtiges Argument dafür ist, dass')} …"],
            ["<b>zustimmen</b>", f"{K('Da hast du recht.')} · {K('Das sehe ich genauso, denn')} … · {K('Genau das ist der Punkt.')}"],
            ["<b>widersprechen</b>", f"{K('Da muss ich dir widersprechen:')} … · {K('Das sehe ich etwas anders, denn')} … · "
                                     f"{K('Da hast du recht, aber man darf nicht vergessen, dass')} …"],
            ["<b>abwägen</b>", f"{K('Einerseits')} …, {K('andererseits')} … · {K('Dafür spricht')} …, {K('dagegen spricht')} …"],
            ["<b>nachfragen</b>", f"{K('Wie meinst du das genau?')} · {K('Hast du damit selbst Erfahrungen gemacht?')}"],
            ["<b>zusammenfassen</b>", f"{K('Wir sind uns also einig, dass')} … · {K('Wir konnten uns nicht ganz einigen:')} … · "
                                      f"{K('Was hältst du davon, wenn')} …?"],
        ],
        [36, 138],
    )]),
    Spacer(1, 6),
    R("Aufgabenkarten zum Üben zu zweit", "h3"),
    R("Lesen Sie den Text (2 Minuten), notieren Sie Argumente und diskutieren Sie ca. 5 Minuten. "
      "Fassen Sie am Ende zusammen, ob Sie sich einigen konnten. (Übungstexte – erfunden.)", "small"),
    pair(
        card("Karte 1 · Zeitungsmeldung",
             "<b>Englisch statt Deutsch im Büro?</b><br/>"
             "In manchen Unternehmen ist Englisch inzwischen die gemeinsame Arbeitssprache. Die Firmen hoffen, so leichter "
             "internationale Fachkräfte zu gewinnen: Neue Mitarbeitende könnten sofort anfangen, ohne vorher monatelang Deutsch "
             "zu lernen. Kritische Stimmen warnen: Wer im Job kein Deutsch braucht, finde im Alltag schwerer Anschluss – "
             "beim Arzt, bei Behörden oder in der Nachbarschaft. Außerdem fühlten sich manche Beschäftigte ausgeschlossen, "
             "wenn Besprechungen nur noch auf Englisch stattfänden.<br/><br/>"
             "<i>Sollten Firmen in Deutschland Englisch als Arbeitssprache einführen?</i>"),
        card("Karte 2 · Zeitungsmeldung",
             "<b>Bewerben ohne Anschreiben</b><br/>"
             "Ein Online-Händler aus Leipzig verzichtet seit einem Jahr auf das Anschreiben. Wer sich bewirbt, beantwortet "
             "stattdessen online drei kurze Fragen. Laut Personalabteilung bewerben sich seitdem mehr Menschen – darunter viele "
             "Quereinsteigerinnen und Quereinsteiger und Menschen, die Deutsch als Zweitsprache sprechen. Andere "
             "Personalverantwortliche sind skeptisch: Im Anschreiben zeige sich, wie gut jemand formulieren könne und wie "
             "ernst er die Bewerbung nehme.<br/><br/>"
             "<i>Ist eine Bewerbung ohne Anschreiben eine gute Idee?</i>"),
    ),
    Spacer(1, 6),
    KeepTogether([
        R("Meine Notizen zur Diskussion", "small"),
        notes(["Argumente dafür", "Argumente dagegen", "Beispiel / eigene Erfahrung"], [58] * 3, 30),
    ]),
]

# ── Teil 3 ──
s += [
    KeepTogether([R("Teil 3: Gemeinsam etwas planen", "h2"), table(
        [
            ["<b>Wofür?</b>", "<b>Redemittel</b>"],
            ["<b>vorschlagen</b>", f"{K('Ich schlage vor, dass wir')} … · {K('Wie wäre es, wenn')} …? · {K('Was hältst du davon, wenn wir')} …?"],
            ["<b>zustimmen</b>", f"{K('Das ist eine gute Idee.')} · {K('Damit bin ich einverstanden.')} · {K('Einverstanden, dann')} …"],
            ["<b>Bedenken, Alternative</b>", f"{K('Das ist eine gute Idee, aber')} … · {K('Ich fände es besser, wenn')} … · "
                                             f"{K('Wie wäre es mit einem Kompromiss:')} …?"],
            ["<b>Partner/in einbeziehen</b>", f"{K('Was meinst du?')} · {K('Hast du eine andere Idee?')} · {K('Was ist dir dabei wichtig?')}"],
            ["<b>Aufgaben verteilen</b>", f"{K('Kümmerst du dich um')} …? {K('Dann übernehme ich')} … · {K('Ich kann gern')} … {K('organisieren.')}"],
            ["<b>Ergebnis festhalten</b>", f"{K('Dann machen wir es so:')} … · {K('Dann halten wir fest:')} …"],
        ],
        [40, 134],
    )]),
    Spacer(1, 6),
    R("Aufgabenkarten zum Üben zu zweit", "h3"),
    R("Notieren Sie zu jedem Punkt eine eigene Idee (3 Minuten). Planen Sie dann ca. 5 Minuten gemeinsam und fassen Sie am Ende "
      "das Ergebnis zusammen. Alle Punkte ansprechen – auch, wer was übernimmt!", "small"),
    pair(
        card("Karte 1 · Willkommenstag",
             "In Ihrer Firma fangen nächsten Monat sechs neue Kolleginnen und Kollegen aus dem Ausland an. Sie sollen "
             "gemeinsam einen Willkommenstag organisieren.<br/><br/>"
             "Planen Sie:<br/>– Wann und wie lange?<br/>– Programm (Rundgang, Vorstellung …)<br/>– Essen und Getränke<br/>"
             "– Hilfe bei Fragen zu Wohnung und Behörden<br/>– kleines Willkommensgeschenk<br/>– Wer übernimmt welche Aufgaben?"),
        card("Karte 2 · Sprachcafé",
             "Im Stadtteilzentrum soll ein Sprachcafé entstehen: Einmal pro Woche können sich dort Menschen auf Deutsch "
             "unterhalten. Sie gehören zum Organisationsteam.<br/><br/>"
             "Planen Sie:<br/>– Wochentag und Uhrzeit<br/>– Raum und Ausstattung<br/>– Werbung<br/>– Themen und Ablauf<br/>"
             "– Getränke und Kosten<br/>– Wer übernimmt welche Aufgaben?"),
    ),
]

s += task(
    2,
    "Welche Funktion hat der Satz?",
    "Ordnen Sie zu: <b>A</b>&nbsp;Meinung äußern · <b>B</b>&nbsp;widersprechen · <b>C</b>&nbsp;nachfragen · <b>D</b>&nbsp;vorschlagen · "
    "<b>E</b>&nbsp;Partner/in einbeziehen · <b>F</b>&nbsp;Ergebnis zusammenfassen",
    1,
)
u2 = [
    "Ich bin der Ansicht, dass gute Sprachkenntnisse im Beruf immer wichtiger werden.",
    "Was hältst du davon, wenn wir den Rundgang gleich am Morgen machen?",
    "Das sehe ich etwas anders, denn nicht jede Firma kann sich das leisten.",
    "Wie meinst du das genau – für alle Beschäftigten oder nur für Neue?",
    "Dann halten wir fest: Du kümmerst dich um das Essen, ich schreibe die Einladung.",
    "Hast du eine andere Idee für das Geschenk?",
]
s += [R(f"{i}. {t}  <font color=\"#8A93A8\">____</font>", "item") for i, t in enumerate(u2, 1)]

s += [
    Spacer(1, 4),
    box(
        R(
            "<b>Checkliste nach dem Üben:</b>&nbsp; "
            f"{CB}&nbsp;Teil 1: ca. 1,5 Min. frei gesprochen&nbsp;&nbsp; {CB}&nbsp;Meinung begründet, mit Beispiel&nbsp;&nbsp; "
            f"{CB}&nbsp;auf Argumente eingegangen&nbsp;&nbsp; {CB}&nbsp;alle Punkte der Karte besprochen&nbsp;&nbsp; "
            f"{CB}&nbsp;Aufgaben verteilt, Ergebnis zusammengefasst",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

# ── Lösungen ──
s += [PageBreak(), R("Lösungen und Musterdialoge <font size=\"9.5\" color=\"#566078\">  erst üben, dann nachschauen!</font>", "h2")]
s += [
    R("Übung 1 – Beispiele (andere Fragen sind möglich)", "solh"),
    R("1. Was war am Anfang am schwierigsten – die Fachsprache oder die Schichtarbeit?  ·  "
      "2. Wie hast du das konkret gelernt – kannst du ein Beispiel erzählen?  ·  "
      "3. Warum hast du die Serie im Original gesehen – hilft dir das beim Sprachenlernen?", "sol"),
    R("Übung 2", "solh"),
    R("1. A  ·  2. D  ·  3. B  ·  4. C  ·  5. F  ·  6. E", "sol"),
]

D = lambda who, t: R(f"<b>{who}:</b> {t}", "dlg")
m1 = [
    R("<b>Grace</b> (Person A, Thema 1): Ich möchte heute über meinen ersten Arbeitstag in Deutschland sprechen. Vor drei Jahren "
      "habe ich als Elektronikerin in einem Betrieb in Bielefeld angefangen. Damals war ich erst seit acht Monaten im Land, und "
      "mein Deutsch war noch ziemlich unsicher. Am Anfang fiel es mir schwer, die Kollegen zu verstehen, weil alle schnell und "
      "mit vielen Fachwörtern gesprochen haben. In der Mittagspause saß ich allein und habe mich ehrlich gesagt ein bisschen "
      "verloren gefühlt. Dann hat mich ein älterer Kollege angesprochen und angeboten, mir die Anlagen in Ruhe zu erklären. "
      "Das war ein Wendepunkt für mich: Er hat mir nicht nur fachlich geholfen, sondern mich auch den anderen vorgestellt. "
      "Rückblickend kann ich sagen, dass ich an diesem Tag etwas Wichtiges gelernt habe: Es ist keine Schwäche, um Hilfe zu "
      "bitten. Heute arbeite ich selbst neue Kolleginnen und Kollegen ein. Allen, die gerade neu anfangen, würde ich empfehlen: "
      "Stellt Fragen – die meisten Menschen helfen gern.", "dlg"),
    D("Murat", "Danke, das war sehr interessant. Wie hast du dich auf die Fachwörter vorbereitet?"),
    D("Grace", "Gute Frage. Ich habe mir jeden Abend zehn neue Wörter aufgeschrieben und sie am nächsten Tag bewusst benutzt. "
               "Nach ein paar Wochen war das viel leichter."),
    D("Murat", "Und hast du mit dem Kollegen heute noch Kontakt?"),
    D("Grace", "Ja, er ist inzwischen in Rente, aber wir treffen uns ab und zu auf einen Kaffee."),
]
m2 = [
    D("Lan", "Ich habe den Text über Englisch als Arbeitssprache gelesen. Meiner Meinung nach ist das für internationale Teams "
             "sinnvoll – dann können neue Fachkräfte sofort mitarbeiten."),
    D("Jonas", "Da muss ich dir widersprechen. Wer nur Englisch spricht, bleibt im Alltag oft außen vor – beim Arzt oder auf dem Amt."),
    D("Lan", "Da hast du recht, aber man darf nicht vergessen, dass Deutschlernen Zeit braucht. In den ersten Monaten hilft Englisch enorm."),
    D("Jonas", "Das stimmt. Andererseits fühlen sich Kolleginnen ohne gute Englischkenntnisse vielleicht ausgeschlossen. Hast du damit Erfahrungen gemacht?"),
    D("Lan", "Ja, in meiner alten Firma. Die Besprechungen waren auf Englisch, und zwei Kollegen haben kaum noch etwas gesagt."),
    D("Jonas", "Genau das meine ich. Was hältst du davon, wenn Englisch nur am Anfang erlaubt ist und die Firma gleichzeitig Deutschkurse bezahlt?"),
    D("Lan", "Das finde ich einen guten Kompromiss. Wir sind uns also einig, dass Englisch den Einstieg erleichtert, Deutsch aber langfristig wichtig bleibt."),
]
m3 = [
    D("Svetlana", "Also, wir planen den Willkommenstag. Ich schlage vor, dass wir ihn gleich am ersten Montag machen, von neun bis eins."),
    D("Kwame", "Gute Idee. Wie wäre es, wenn wir mit einem Rundgang durch alle Abteilungen anfangen?"),
    D("Svetlana", "Einverstanden. Danach könnten sich die Teams kurz vorstellen. Und zum Schluss ein gemeinsames Mittagessen in der Kantine?"),
    D("Kwame", "Die Kantine ist praktisch, aber ich fände ein Buffet im Besprechungsraum persönlicher. Was meinst du?"),
    D("Svetlana", "Stimmt, das ist gemütlicher. Wichtig sind auch Fragen zu Wohnung und Behörden. Hast du eine Idee?"),
    D("Kwame", "Wir könnten eine Infomappe mit Adressen vorbereiten und für jede neue Person eine Ansprechpartnerin festlegen."),
    D("Svetlana", "Super. Als Geschenk vielleicht eine Stofftasche mit Stadtplan und einem Gutschein fürs Café nebenan?"),
    D("Kwame", "Damit bin ich einverstanden. Kümmerst du dich um Buffet und Geschenke? Dann übernehme ich den Rundgang und die Infomappe."),
    D("Svetlana", "Gut, dann halten wir fest: Montag, neun bis eins, Rundgang, Vorstellung, Buffet, Infomappe und Geschenk."),
]
s += [
    R("Musterdialog Teil 1 – Präsentation (ca. 1,5 Minuten) und Nachfragen", "solh"),
    box(m1, HELLGRUEN, GRUEN),
]
mt = Table([[R("<b>Musterdialog Teil 2</b> (Karte 1)", "solh"), R("<b>Musterdialog Teil 3</b> (Karte 1)", "solh")],
            [m2, m3]], colWidths=[87 * mm, 87 * mm])
mt.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BACKGROUND", (0, 1), (-1, 1), HELLGRUEN),
                        ("LINEBEFORE", (0, 1), (0, 1), 3, GRUEN), ("LINEBEFORE", (1, 1), (1, 1), 3, GRUEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7)]))
s += [Spacer(1, 4), mt]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
