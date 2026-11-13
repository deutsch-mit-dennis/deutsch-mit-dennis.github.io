# Arbeitsblatt B2 Sprechen: Meinung äußern und argumentieren
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/meinung-und-argumentieren-b2.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from reportlab.lib.styles import ParagraphStyle

SLUG = "meinung-und-argumentieren-b2"
# Kopfzeile kürzt nach 70 Zeichen – daher „&“ statt „und“ (Website-Titel: „… Diskussion und Prüfung“)
TITLE = "Meinung äußern und argumentieren: Redemittel für Diskussion & Prüfung"
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verbposition

s = [
    R("B2 · Sprechen · Arbeitsblatt", "kick"),
    R("Meinung äußern und argumentieren", "h1"),
    R(
        "Zustimmen, widersprechen, abwägen, einen Kompromiss finden – mit diesen Redemitteln diskutieren Sie "
        "sicher und höflich: im Team, bei der Elternversammlung und in der B2-Prüfung.",
        "lead",
    ),
]

s += [
    R("So überzeugen Sie im Gespräch", "h2"),
    box(
        R(
            "<b>Meinung + Begründung + Beispiel.</b> Sagen Sie nicht nur „Ich finde das gut“, sondern auch <b>warum</b>. "
            "Und: <b>Reagieren Sie auf Ihr Gegenüber</b> – zuhören, Argumente aufnehmen, nachfragen. "
            "Eine gute Diskussion ist kein Monolog."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Was Sie tun</b>", "<b>Redemittel</b>"],
            ["<b>Meinung äußern</b>",
             f"{K('Ich bin der Meinung, dass')} … · {K('Meiner Meinung nach')} … · {K('Ich bin davon überzeugt, dass')} … · {K('Aus meiner Sicht')} …"],
            ["<b>begründen</b>",
             f"{K('Das liegt vor allem daran, dass')} … · {K('Ein wichtiges Argument dafür ist')} … · {K('Ein Beispiel aus meinem Alltag:')} …"],
            ["<b>zustimmen</b>",
             f"{K('Da stimme ich Ihnen zu.')} · {K('Das sehe ich genauso.')} · {K('Da haben Sie völlig recht.')} · {K('Genau das ist der Punkt.')}"],
            ["<b>teilweise zustimmen</b>",
             f"{K('Im Prinzip haben Sie recht, aber')} … · {K('Das stimmt zwar, aber')} … · {K('Ich verstehe Ihr Argument, trotzdem')} …"],
            ["<b>widersprechen</b> (höflich)",
             f"{K('Da bin ich anderer Meinung.')} · {K('Das sehe ich etwas anders.')} · {K('Da muss ich Ihnen widersprechen.')} · {K('Ich bezweifle, dass')} …"],
            ["<b>abwägen</b>",
             f"{K('Einerseits')} …, {K('andererseits')} … · {K('Dafür spricht')} …, {K('dagegen spricht')} … · {K('Man muss aber auch bedenken, dass')} …"],
            ["<b>Kompromiss finden</b>",
             f"{K('Wie wäre es, wenn wir')} …? · {K('Könnten wir uns darauf einigen, dass')} …? · {K('Ein Kompromiss wäre')} …"],
            ["<b>nachfragen</b>",
             f"{K('Wie meinen Sie das genau?')} · {K('Habe ich Sie richtig verstanden, dass')} …? · {K('Darf ich kurz etwas dazu sagen?')}"],
        ],
        [38, 136],
    )
]

s += [
    R("Achten Sie auf die Wortstellung", "h3"),
    table(
        [
            ["<b>Meiner Meinung nach</b>",
             f"zählt als Position 1 – das Verb kommt direkt danach: Meiner Meinung nach {V('ist')} das zu teuer."],
            ["<b>dass, weil, ob</b>",
             f"Nebensatz – das Verb steht am Ende: Ich bezweifle, dass das in der Praxis {V('funktioniert')}."],
            ["<b>zustimmen, widersprechen</b>",
             f"mit Dativ: Ich stimme {V('Ihnen')} zu. Ich widerspreche {V('dir')}. "
             f'<font color="#C2362B"><strike>Ich stimme Sie zu.</strike></font>'],
        ],
        [44, 130],
        head=False,
    ),
]

# Übung 1
s += task(
    1,
    "Was macht die Person?",
    "Ordnen Sie zu: A zustimmen · B teilweise zustimmen · C widersprechen · D abwägen · E Kompromiss vorschlagen",
    1,
)
u1 = [
    "Das sehe ich genauso – bei mir war das auch so.",
    "Wie wäre es, wenn wir das zuerst drei Monate testen?",
    "Da muss ich Ihnen leider widersprechen.",
    "Das stimmt zwar, aber man darf die Kosten nicht vergessen.",
    "Dafür spricht die Zeitersparnis, dagegen spricht der fehlende Kontakt.",
    "Ich bezweifle, dass das in der Praxis funktioniert.",
    "Könnten wir uns darauf einigen, dass jeder einmal pro Woche ins Büro kommt?",
    "Da haben Sie völlig recht.",
]
s += [R(f"{i}. {t}  <font color=\"#8A93A8\">____</font>", "item") for i, t in enumerate(u1, 1)]

# Übung 2
s += task(
    2,
    "Teambesprechung in der Arztpraxis",
    "Soll die Praxis Termine auch online vergeben? Ergänzen Sie: anderer Meinung · darauf einigen · Einerseits · "
    "genauso · Kompromiss · überzeugt · Wie meinen · zwar",
    2,
)
u2 = [
    ("Frau Okafor", "Ich bin {}, dass eine Online-Terminbuchung uns viel Arbeit spart. Das Telefon klingelt den ganzen Vormittag."),
    ("Herr Nowak", "Das sehe ich {}. Gerade morgens schaffen wir die vielen Anrufe kaum."),
    ("Frau Brandt", "Da bin ich {}. Viele ältere Patientinnen und Patienten haben kein Smartphone."),
    ("Frau Okafor", "{} Sie das genau? Die meisten haben doch ein Handy."),
    ("Frau Brandt", "Das stimmt {}, aber nicht alle können damit Termine buchen."),
    ("Herr Nowak", "{} hätten wir weniger Anrufe, andererseits dürfen wir niemanden ausschließen."),
    ("Frau Okafor", "Ein {} wäre: Online-Termine für alle, aber das Telefon bleibt vormittags zwei Stunden besetzt."),
    ("Frau Brandt", "Gut. Können wir uns {}? Dann probieren wir es ab März aus."),
]
s += [R(f"{i}. <b>{n}:</b> " + t.format(GAP), "item") for i, (n, t) in enumerate(u2, 1)]

# Übung 3
s += task(
    3,
    "Höflich widersprechen",
    "Die Reaktionen sind zu direkt. Formulieren Sie sie höflich und geben Sie einen Grund an.",
    2,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> „Busfahren ist zu teuer.“ – „Quatsch!“<br/>"
            f"{ARROW} {K('Das sehe ich etwas anders.')} Mit dem Monatsticket fahre ich günstiger als mit dem Auto.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u3 = [
    "„Kinder sollten erst mit 14 ein eigenes Smartphone bekommen.“ – „So ein Unsinn!“",
    "„Wer eine Arbeit hat, braucht keinen Deutschkurs mehr.“ – „Das ist falsch.“",
    "„Radfahren in der Stadt ist viel zu gefährlich.“ – „Stimmt nicht.“",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 4
u4h = task(
    4,
    "Argumente sortieren und abwägen",
    "Thema: <b>Sollen Firmen einen Deutschkurs während der Arbeitszeit anbieten?</b> "
    "Ist das ein Argument dafür oder dagegen? Schreiben Sie dann zwei Sätze, die abwägen.",
    3,
)
u4 = [
    "Beschäftigte verstehen Sicherheitsregeln und Anweisungen besser.",
    "Der Firma fehlen in dieser Zeit Arbeitsstunden.",
    "Gespräche mit Kundinnen und Kunden werden einfacher.",
    "Kleine Betriebe können die Kosten oft nicht allein tragen.",
    "Wer gefördert wird, bleibt oft länger im Betrieb.",
    "Manche wechseln nach dem Kurs zu einer anderen Firma.",
]
u4h += [
    R(f"{chr(96 + i)}) {t}   <font color=\"#566078\">{sym('☐')} dafür  {sym('☐')} dagegen</font>", "item")
    for i, t in enumerate(u4, 1)
]
u4b = R(f"Schreiben Sie zwei Sätze mit: {K('zwar … aber')} · {K('einerseits … andererseits')} · {K('Dafür spricht …, dagegen spricht …')}", "small")
s += [KeepTogether(u4h), KeepTogether([u4b, lines(3, indent=0)])]

# Übung 5
s += task(
    5,
    "Diskutieren Sie: Bewerbung ohne Foto – eine gute Idee?",
    "Arbeiten Sie zu zweit, ca. 4–5 Minuten. Person A ist eher dafür, Person B eher dagegen. "
    "Äußern Sie Ihre Meinung, reagieren Sie auf Ihr Gegenüber und finden Sie am Ende ein gemeinsames Ergebnis.",
    3,
)
s += [
    table(
        [
            ["<b>Person A: eher dafür</b>", "<b>Person B: eher dagegen</b>"],
            ["Entscheidung nur nach Qualifikation · weniger Vorurteile wegen Alter, Aussehen oder Herkunft · "
             "kein teurer Fotograf nötig",
             "Foto gibt einen persönlichen Eindruck · Bewerbung wirkt vollständiger · "
             "im Vorstellungsgespräch sieht man sich sowieso"],
        ],
        [87, 87],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Checkliste:</b> "
            f"{sym('☐')} Meinung mit Begründung   {sym('☐')} mindestens einmal zugestimmt   "
            f"{sym('☐')} mindestens einmal höflich widersprochen   {sym('☐')} nachgefragt   "
            f"{sym('☐')} abgewogen   {sym('☐')} Kompromiss oder Ergebnis",
            "cell",
        ),
        SOFT,
    ),
    R("<b>Allein üben?</b> Schreiben Sie Ihre Meinung in 5–6 Sätzen und nennen Sie auch ein Gegenargument.", "p"),
    lines(4, indent=0),
]

# Lösungen
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"),
      R("1. A  ·  2. E  ·  3. C  ·  4. B  ·  5. D  ·  6. C  ·  7. E  ·  8. A", "sol")]
s += [R("Übung 2", "solh"),
      R("1. überzeugt  ·  2. genauso  ·  3. anderer Meinung  ·  4. Wie meinen  ·  5. zwar  ·  6. Einerseits  ·  "
        "7. Kompromiss  ·  8. darauf einigen", "sol")]
l3 = [
    "Da bin ich anderer Meinung. Viele Kinder brauchen schon früher ein Handy, zum Beispiel für den Schulweg.",
    "Da muss ich Ihnen widersprechen. Auch im Beruf muss man Briefe und Anweisungen gut verstehen.",
    "Das sehe ich etwas anders. Es gibt immer mehr Radwege, und wer vorsichtig fährt, ist relativ sicher.",
]
s += [R("Übung 3 – Beispiele (andere Lösungen sind möglich)", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
s += [
    R("Übung 4", "solh"),
    R("dafür: a, c, e  ·  dagegen: b, d, f", "sol"),
    R(f"Beispiel: {K('Zwar')} fehlen der Firma Arbeitsstunden, {K('aber')} die Beschäftigten verstehen Anweisungen danach besser. "
      f"{K('Einerseits')} {V('bleiben')} Geförderte oft länger, {K('andererseits')} {V('wechseln')} manche die Firma.",
      "sol"),
]
s += [
    R("Übung 5 – Beispieldialog", "solh"),
    box(
        R(
            "<b>A:</b> Ich bin davon überzeugt, dass Bewerbungen ohne Foto fairer sind. Dann zählt nur, was jemand kann.<br/>"
            "<b>B:</b> Da bin ich anderer Meinung. Ein Foto gibt einen ersten persönlichen Eindruck.<br/>"
            "<b>A:</b> Wie meinen Sie das genau? Was sagt ein Foto über die Arbeit?<br/>"
            "<b>B:</b> Über die Arbeit nichts, das stimmt. Aber die Bewerbung wirkt vollständiger.<br/>"
            "<b>A:</b> Das stimmt zwar, aber ein Foto kann auch Vorurteile auslösen – wegen des Alters oder der Herkunft.<br/>"
            "<b>B:</b> Da haben Sie recht. Andererseits sieht man sich im Vorstellungsgespräch sowieso.<br/>"
            "<b>A:</b> Genau – und bis dahin entscheiden nur die Qualifikationen. Wie wäre es, wenn das Foto freiwillig wäre?<br/>"
            "<b>B:</b> Damit bin ich einverstanden. Wer möchte, schickt ein Foto mit; wer nicht, hat keinen Nachteil.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
