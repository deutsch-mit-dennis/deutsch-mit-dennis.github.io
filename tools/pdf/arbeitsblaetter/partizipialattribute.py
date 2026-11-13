# Arbeitsblatt B2 Grammatik: Partizipialattribute
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/partizipialattribute.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *

SLUG = "partizipialattribute"
TITLE = "Partizipialattribute: der gestern eingereichte Antrag"
LEVEL = "B2"
P = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # participle + ending
E = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # extension / relative pronoun
GREY = lambda t: f'<font color="#566078">{t}</font>'
LONG = '<font color="#8A93A8">' + "_" * 52 + "</font>"

s = [
    R("B2 · Grammatik · Arbeitsblatt", "kick"),
    R("Partizipialattribute", "h1"),
    R(
        "„der gestern eingereichte Antrag“, „die steigenden Preise“: In Zeitungen, Briefen vom Amt und "
        "Arbeitsanweisungen ersetzt ein Partizip vor dem Nomen oft einen ganzen Relativsatz.",
        "lead",
    ),
]

s += [
    R("Die Regel", "h2"),
    box(
        R(
            "<b>Ein Partizip kann wie ein Adjektiv vor dem Nomen stehen – mit Adjektivendung.</b> "
            "Zwischen Artikel und Partizip können weitere Informationen stehen (wann? wo? wie?). "
            "So wird aus einem Relativsatz eine kurze Nominalgruppe."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Form</b>", "<b>Bedeutung</b>", "<b>Relativsatz</b>", "<b>Partizipialattribut</b>"],
            [
                "<b>Partizip I</b><br/>Infinitiv + d",
                "aktiv, gleichzeitig",
                f"die Kundin, {E('die')} {P('wartet')}",
                f"die {P('wartende')} Kundin",
            ],
            [
                "<b>Partizip II</b><br/>(Verb mit haben)",
                "passiv, meist abgeschlossen",
                f"der Antrag, {E('der')} {P('eingereicht')} wurde",
                f"der {P('eingereichte')} Antrag",
            ],
            [
                "<b>Partizip II</b><br/>(Verb mit sein)",
                "aktiv, abgeschlossen",
                f"der Zug, {E('der')} {P('angekommen')} ist",
                f"der {P('angekommene')} Zug",
            ],
            [
                "<b>zu + Partizip I</b>",
                "muss / kann gemacht werden",
                f"die Rechnung, {E('die')} {P('bezahlt')} werden muss",
                f"die {P('zu bezahlende')} Rechnung",
            ],
        ],
        [34, 38, 56, 46],
    )
]

s += [
    R("Der Aufbau: Artikel – Erweiterung – Partizip – Nomen", "h3"),
    table(
        [
            ["<b>Artikel</b>", "<b>Erweiterung</b> (wann? wo? wie?)", "<b>Partizip + Endung</b>", "<b>Nomen</b>"],
            ["der", E("gestern beim Bürgeramt"), P("eingereichte"), "Antrag"],
            ["die", E("seit Monaten"), P("steigenden"), "Mieten"],
            ["eine", E("auf zwei Jahre"), P("befristete"), "Stelle"],
        ],
        [24, 70, 44, 36],
    ),
    Spacer(1, 4),
    box(
        R(
            f"<b>So geht's:</b> 1. Relativpronomen und Hilfsverb streichen (wird, wurde, ist …). "
            f"2. Verb {ARROW} Partizip I oder II. 3. Partizip mit Adjektivendung direkt vor das Nomen. "
            f"4. Alle anderen Wörter aus dem Relativsatz stehen zwischen Artikel und Partizip. "
            f"<b>sich</b> bleibt: die Eltern, die sich informieren {ARROW} die {E('sich')} {P('informierenden')} Eltern",
            "cell",
        ),
        SOFT,
    ),
]

# Übung 1
s += task(
    1,
    "Partizip I oder Partizip II?",
    "Bilden Sie das passende Partizip und ergänzen Sie die Adjektivendung.",
    1,
)
u1 = [
    ("Bitte beachten Sie die {} Hinweise.", "beiliegen"),
    ("Der {} Ausweis wurde im Fundbüro abgegeben.", "verlieren"),
    ("Die {} Mieten sind für viele Familien ein großes Problem.", "steigen"),
    ("Das {} Formular schicken Sie bitte bis Freitag zurück.", "ausfüllen"),
    ("Mit {} Händen öffnete Lina den Umschlag mit dem Prüfungsergebnis.", "zittern"),
    ("Die gestern {} Maschine läuft wieder.", "reparieren"),
    ("Wir suchen eine zuverlässig {} Fachkraft für unser Lager.", "arbeiten"),
    ("Die {} Verträge liegen im Sekretariat.", "unterschreiben"),
]
s += [R(f"{i}. " + t.format(GAP) + "  " + GREY(f"({v})"), "item") for i, (t, v) in enumerate(u1, 1)]

# Übung 2
s += [KeepTogether(task(
    2,
    "Relativsatz " + ARROW + " Partizipialattribut",
    "Formen Sie die Nominalgruppen um.",
    2,
) + [
    box(
        R(
            f"<b>Beispiel:</b> der Antrag, der gestern eingereicht wurde<br/>"
            f"{ARROW} der {E('gestern')} {P('eingereichte')} Antrag",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
])]
u2 = [
    "die Mitarbeiterin, die seit zehn Jahren im Betrieb arbeitet",
    "die Unterlagen, die vollständig ausgefüllt wurden",
    "der Zug, der mit großer Verspätung angekommen ist",
    "ein Arbeitsvertrag, der auf zwei Jahre befristet ist",
    "die Eltern, die sich für einen Kita-Platz interessieren",
]
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 3
s += task(
    3,
    "Einen Zeitungstext verstehen",
    "Lesen Sie die Meldung. Schreiben Sie die markierten Partizipialattribute als Relativsatz.",
    2,
)
s += [
    box(
        R(
            "<b>Neues Bürgerbüro im Stadtteil Nord</b><br/>"
            f"Das {E('(1)')} <u>seit Monaten geplante</u> Bürgerbüro im Stadtteil Nord öffnet am Montag. "
            f"Die {E('(2)')} <u>dort arbeitenden</u> Mitarbeiterinnen und Mitarbeiter sprechen zusammen zwölf Sprachen. "
            f"Wegen der {E('(3)')} <u>stark gestiegenen</u> Zahl von Anfragen hat die Stadt fünf neue Stellen geschaffen. "
            f"Die {E('(4)')} <u>bisher oft überfüllten</u> Wartebereiche sollen damit bald der Vergangenheit angehören. "
            f"Termine kann man über die {E('(5)')} <u>neu gestaltete</u> Website buchen. "
            f"Kritik kommt nur von Autofahrerinnen und Autofahrern: Die {E('(6)')} <u>direkt vor dem Gebäude liegenden</u> "
            "Parkplätze fallen weg.",
            "cell",
        ),
        SOFT,
    ),
    Spacer(1, 4),
]
u3 = [
    "das Bürgerbüro,",
    "die Mitarbeiterinnen und Mitarbeiter,",
    "die Zahl von Anfragen,",
    "die Wartebereiche,",
    "die Website,",
    "die Parkplätze,",
]
s += [R(f"({i}) {t} {LONG}", "item") for i, t in enumerate(u3, 1)]

# Übung 4
s += task(
    4,
    "Kürzer formulieren: Arbeit und Amt",
    "Schreiben Sie die Sätze mit einem Partizipialattribut. Bei Nr. 4 und 5 brauchen Sie zu + Partizip I.",
    3,
)
u4 = [
    "Die Schutzbrille, die im Schrank liegt, müssen Sie vor Arbeitsbeginn aufsetzen.",
    "Geräte, die beschädigt sind, melden Sie bitte sofort der Schichtleitung.",
    "Beschäftigte, die nachts arbeiten, bekommen in unserem Betrieb einen Zuschlag.",
    "Die Formulare, die ausgefüllt werden müssen, finden Sie im Anhang.",
    "Die Unterlagen, die noch nachgereicht werden müssen, senden Sie uns bitte bis zum 15. Mai.",
]
for i, t in enumerate(u4, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 5
s += task(
    5,
    "Neu im Team: Informationen für eine neue Kollegin",
    "Morgen beginnt eine neue Kollegin in Ihrem Betrieb (Lager, Küche, Pflege, Büro …). "
    "Schreiben Sie 4–6 Sätze mit Anweisungen. Benutzen Sie mindestens vier Partizipialattribute.",
    3,
)
s += [
    box(
        R(
            "<b>Ideen:</b> die eingehenden Bestellungen · die zu prüfenden Rechnungen · die im Kühlraum gelagerten "
            "Lebensmittel · frisch gewaschene Wäsche · der vor dem Eingang stehende Container · die bereits erledigten Aufgaben",
            "cell",
        ),
        SOFT,
    ),
    Spacer(1, 4),
    lines(5, indent=0),
    Spacer(1, 8),
]

# Lösungen
from reportlab.lib.styles import ParagraphStyle
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
l1 = ["beiliegenden", "verlorene", "steigenden", "ausgefüllte", "zitternden", "reparierte", "arbeitende", "unterschriebenen"]
s += [
    R("Übung 1", "solh"),
    R(" · ".join(f"{i}.&nbsp;{w}" for i, w in enumerate(l1, 1)), "sol"),
]
l2 = [
    f"die {E('seit zehn Jahren im Betrieb')} {P('arbeitende')} Mitarbeiterin",
    f"die {E('vollständig')} {P('ausgefüllten')} Unterlagen",
    f"der {E('mit großer Verspätung')} {P('angekommene')} Zug",
    f"ein {E('auf zwei Jahre')} {P('befristeter')} Arbeitsvertrag",
    f"die {E('sich für einen Kita-Platz')} {P('interessierenden')} Eltern",
]
s += [R("Übung 2", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l2, 1)]
l3 = [
    f"das Bürgerbüro, {E('das')} seit Monaten {P('geplant wird')} " + GREY("(auch: geplant wurde)"),
    f"die Mitarbeiterinnen und Mitarbeiter, {E('die')} dort {P('arbeiten')}",
    f"die Zahl von Anfragen, {E('die')} stark {P('gestiegen ist')}",
    f"die Wartebereiche, {E('die')} bisher oft {P('überfüllt waren')}",
    f"die Website, {E('die')} neu {P('gestaltet wurde')}",
    f"die Parkplätze, {E('die')} direkt vor dem Gebäude {P('liegen')}",
]
s += [R("Übung 3", "solh")] + [R(f"({i}) {t}", "sol") for i, t in enumerate(l3, 1)]
l4 = [
    f"Die {E('im Schrank')} {P('liegende')} Schutzbrille müssen Sie vor Arbeitsbeginn aufsetzen.",
    f"{P('Beschädigte')} Geräte melden Sie bitte sofort der Schichtleitung.",
    f"{E('Nachts')} {P('arbeitende')} Beschäftigte bekommen in unserem Betrieb einen Zuschlag.",
    f"Die {P('auszufüllenden')} Formulare finden Sie im Anhang.",
    f"Die {E('noch')} {P('nachzureichenden')} Unterlagen senden Sie uns bitte bis zum 15. Mai.",
]
s += [R("Übung 4", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l4, 1)]
s += [
    R("Übung 5 – Beispieltext (Küche)", "solh"),
    box(
        R(
            "Liebe Frau Varga, herzlich willkommen im Team! Die <b>im Kühlraum gelagerten</b> Lebensmittel kontrollieren Sie "
            "bitte jeden Morgen. <b>Abgelaufene</b> Produkte legen Sie in die <b>rot markierte</b> Kiste. Die <b>eingehenden</b> "
            "Bestellungen sehen Sie auf dem <b>neben der Tür hängenden</b> Bildschirm. <b>Frisch gewaschene</b> Schürzen liegen "
            "im Regal hinter der Küche. Die <b>bereits erledigten</b> Aufgaben haken Sie bitte auf der Liste ab.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
