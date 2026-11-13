# Arbeitsblatt B2 Grammatik: Nominalstil und Verbalstil
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/nominalstil-und-verbalstil.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *

SLUG = "nominalstil-und-verbalstil"
TITLE = "Nominalstil und Verbalstil: Texte formell und präzise schreiben"
LEVEL = "B2"
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # verb / noun from verb
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # preposition / connector
GREY = lambda t: f'<font color="#566078">{t}</font>'

s = [
    R("B2 · Grammatik · Arbeitsblatt", "kick"),
    R("Nominalstil und Verbalstil", "h1"),
    R(
        "Briefe vom Amt, Verträge, Bewerbungen: Formelle Texte benutzen oft Nomen statt Verben. "
        "Wer beide Stile kennt, versteht solche Texte besser.",
        "lead",
    ),
]

s += [
    R("Die Regel", "h2"),
    box(
        R(
            f"<b>Verbalstil</b> = Nebensatz mit Verb: {K('Wenn')} Sie den Antrag {V('stellen')}, …<br/>"
            f"<b>Nominalstil</b> = Präposition + Nomen: {K('Bei')} der {V('Antragstellung')} …<br/>"
            "Der Verbalstil ist leichter zu verstehen (Gespräch, persönliche E-Mail). "
            "Der Nominalstil ist kürzer und sachlicher (Behörde, Bericht, Bewerbung, Zeitung)."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Nebensatz</b>", "<b>Präposition</b>", "<b>Verbalstil</b>", "<b>Nominalstil</b>"],
            [K("wenn / als"), K("bei") + " + D", f"{K('Wenn')} Sie Fragen {V('haben')}, …", f"{K('Bei')} {V('Fragen')} …"],
            [K("bevor"), K("vor") + " + D", f"{K('Bevor')} Sie {V('unterschreiben')}, …", f"{K('Vor')} der {V('Unterschrift')} …"],
            [K("nachdem"), K("nach") + " + D", f"{K('Nachdem')} sie {V('umgezogen')} war, …", f"{K('Nach')} ihrem {V('Umzug')} …"],
            [K("seit(dem)"), K("seit") + " + D", f"{K('Seit')} er hier {V('arbeitet')}, …", f"{K('Seit')} seinem {V('Arbeitsbeginn')} …"],
            [K("während"), K("während") + " + G", f"{K('Während')} er {V('arbeitet')}, …", f"{K('Während')} seiner {V('Arbeit')} …"],
            [K("weil / da"), K("wegen") + " + G", f"{K('Weil')} sie krank {V('ist')}, …", f"{K('Wegen')} ihrer {V('Krankheit')} …"],
            [K("obwohl"), K("trotz") + " + G", f"{K('Obwohl')} er Erfahrung {V('hat')}, …", f"{K('Trotz')} seiner {V('Erfahrung')} …"],
            [K("um … zu / damit"), K("zur / zum") + " + D", f"{K('Um')} Kosten {K('zu')} {V('sparen')}, …", f"{K('Zur')} {V('Einsparung')} von Kosten …"],
            [K("indem"), K("durch") + " + A", f"{K('Indem')} man früh {V('plant')}, …", f"{K('Durch')} frühe {V('Planung')} …"],
            [K("ohne dass"), K("ohne") + " + A", f"{K('Ohne dass')} Sie es {V('melden')}, …", f"{K('Ohne')} {V('Meldung')} …"],
        ],
        [30, 28, 62, 54],
    )
]

s += [
    R("So wird aus einem Satz eine Nominalgruppe", "h3"),
    table(
        [
            ["<b>Verb</b> " + ARROW + " Nomen", f"beantragen {ARROW} die Beantragung · lesen {ARROW} das Lesen"],
            ["<b>Subjekt / Objekt</b> " + ARROW + " Genitiv", f"Man prüft die Unterlagen. {ARROW} die Prüfung {K('der Unterlagen')}"],
            ["<b>Pronomen</b> " + ARROW + " Possessivartikel", f"Sie bewirbt sich. {ARROW} {K('ihre')} Bewerbung · Wir ziehen um. {ARROW} {K('unser')} Umzug"],
            ["<b>Adverb</b> " + ARROW + " Adjektiv", f"Es regnet stark. {ARROW} wegen des {K('starken')} Regens"],
            ["<b>Präposition bleibt</b>", f"Er nimmt am Kurs teil. {ARROW} seine Teilnahme {K('am Kurs')}"],
        ],
        [56, 118],
        head=False,
    ),
]

# Übung 1
u1 = ["kündigen", "umziehen", "sich bewerben", "ankommen", "einreichen",
      "teilnehmen", "abschließen", "verlängern", "entscheiden", "zahlen"]
s += [
    KeepTogether(task(1, "Vom Verb zum Nomen", "Schreiben Sie das passende Nomen mit Artikel.", 1) + [table(
        [[f"{r * 5 + c + 1}. {u1[r * 5 + c]}<br/><br/>{GAP}" for c in range(5)] for r in range(2)],
        [34.8] * 5,
        head=False,
    )])
]

# Übung 2
s += task(
    2,
    "Die passende Präposition",
    "Setzen Sie ein: bei · vor · nach · seit · während · wegen · trotz · zur · ohne",
    2,
)
u2 = [
    "{} Unterzeichnung des Vertrags lesen Sie bitte alle Bedingungen genau.",
    "{} eines Streiks fallen heute viele Züge aus.",
    "{} der Probezeit kann der Vertrag mit einer kürzeren Frist gekündigt werden.",
    "{} ihrem Umzug nach Leipzig arbeitet Frau Okafor in einer Apotheke.",
    "{} Verlängerung des Mietvertrags brauchen wir noch Ihre Unterschrift.",
    "{} Fragen wenden Sie sich bitte an Ihre Ansprechpartnerin.",
    "{} Abschluss seiner Ausbildung wurde Herr Nowak vom Betrieb übernommen.",
    "{} guter Noten bekam Daniel zuerst keinen Ausbildungsplatz.",
    "{} vollständige Unterlagen kann Ihr Antrag nicht bearbeitet werden.",
]
s += [R(f"{i}. " + t.format(GAP), "item") for i, t in enumerate(u2, 1)]

# Übung 3
s += task(
    3,
    "Verbalstil " + ARROW + " Nominalstil",
    "Formen Sie den Nebensatz in eine Präposition + Nomen um. Die Präposition steht in Klammern.",
    2,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Weil Herr Demir erkrankt ist, übernimmt Frau Lindqvist seine Schicht. (wegen)<br/>"
            f"{ARROW} {K('Wegen')} der {V('Erkrankung')} von Herrn Demir übernimmt Frau Lindqvist seine Schicht.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u3 = [
    "Wenn Sie den Antrag einreichen, legen Sie bitte eine Kopie Ihres Passes bei. (bei)",
    "Nachdem die Firma umgezogen war, hatten viele Beschäftigte einen längeren Arbeitsweg. (nach)",
    "Obwohl sie langjährige Berufserfahrung hat, erhielt Frau Mensah eine Absage. (trotz)",
    "Um die Wartezeiten zu verkürzen, bietet das Bürgeramt jetzt Online-Termine an. (zur)",
    "Bevor Sie die Arbeit aufnehmen, müssen Sie an einer Sicherheitsschulung teilnehmen. (vor)",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 4
s += task(
    4,
    "Ein Brief vom Amt – bitte einfacher!",
    "Diese Sätze stehen in Behördenbriefen. Schreiben Sie sie im Verbalstil (mit Nebensatz), damit man sie leichter versteht.",
    3,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Bei Verhinderung sagen Sie den Termin bitte rechtzeitig ab.<br/>"
            f"{ARROW} {K('Wenn')} Sie verhindert {V('sind')}, sagen Sie den Termin bitte rechtzeitig ab.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u4 = [
    "Nach Prüfung Ihrer Unterlagen erhalten Sie einen schriftlichen Bescheid.",
    "Wegen der hohen Zahl an Anfragen kommt es derzeit zu längeren Wartezeiten.",
    "Zur Beantragung eines Kita-Platzes füllen Sie bitte das beiliegende Formular aus.",
    "Trotz mehrfacher Erinnerung ist Ihre Zahlung noch nicht bei uns eingegangen.",
    "Durch frühzeitige Anmeldung sichern Sie sich einen Platz im Kurs.",
]
for i, t in enumerate(u4, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 5
s += task(
    5,
    "Eine formelle E-Mail: Anfrage wegen einer Weiterbildung",
    "Sie möchten eine Weiterbildung machen und schreiben Ihrer Vorgesetzten, Frau Becker. "
    "Schreiben Sie 5–7 Sätze. Benutzen Sie mindestens vier Nominalgruppen aus der Tabelle.",
    3,
)
s += [
    box(
        R(
            "<b>Ihre Notizen (Verbalstil):</b> weil ich mich beruflich weiterentwickeln möchte · "
            "während der Kurs läuft: nur dienstags und donnerstags im Büro · "
            "nachdem ich den Kurs abgeschlossen habe: mehr Aufgaben übernehmen · "
            "obwohl der Kurs teuer ist: einen Teil selbst bezahlen · "
            "wenn Sie Fragen haben: gern ein Gespräch",
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
s += [
    R("Übung 1", "solh"),
    R(
        "1.&nbsp;die&nbsp;Kündigung · 2.&nbsp;der&nbsp;Umzug · 3.&nbsp;die&nbsp;Bewerbung · 4.&nbsp;die&nbsp;Ankunft · 5.&nbsp;die&nbsp;Einreichung · "
        "6.&nbsp;die&nbsp;Teilnahme · 7.&nbsp;der&nbsp;Abschluss · 8.&nbsp;die&nbsp;Verlängerung · 9.&nbsp;die&nbsp;Entscheidung · 10.&nbsp;die&nbsp;Zahlung",
        "sol",
    ),
    R("Übung 2", "solh"),
    R(
        "1. Vor  ·  2. Wegen  ·  3. Während  ·  4. Seit  ·  5. Zur  ·  6. Bei  ·  7. Nach  ·  8. Trotz  ·  9. Ohne",
        "sol",
    ),
]
l3 = [
    f"{K('Bei')} der {V('Einreichung')} des Antrags legen Sie bitte eine Kopie Ihres Passes bei.",
    f"{K('Nach')} dem {V('Umzug')} der Firma hatten viele Beschäftigte einen längeren Arbeitsweg.",
    f"{K('Trotz')} ihrer langjährigen {V('Berufserfahrung')} erhielt Frau Mensah eine Absage.",
    f"{K('Zur')} {V('Verkürzung')} der Wartezeiten bietet das Bürgeramt jetzt Online-Termine an.",
    f"{K('Vor')} der {V('Aufnahme')} der Arbeit müssen Sie an einer Sicherheitsschulung teilnehmen. "
    + GREY("(auch: Vor Arbeitsbeginn)"),
]
s += [R("Übung 3", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
l4 = [
    f"{K('Nachdem')} wir Ihre Unterlagen {V('geprüft haben')}, erhalten Sie einen schriftlichen Bescheid.",
    f"{K('Weil')} wir derzeit sehr viele Anfragen {V('bekommen')}, kommt es zu längeren Wartezeiten.",
    f"{K('Wenn')} Sie einen Kita-Platz {V('beantragen')} möchten, füllen Sie bitte das beiliegende Formular aus. "
    + GREY("(auch: Um … zu beantragen)"),
    f"{K('Obwohl')} wir Sie mehrfach {V('erinnert haben')}, ist Ihre Zahlung noch nicht bei uns eingegangen.",
    f"{K('Indem')} Sie sich frühzeitig {V('anmelden')}, sichern Sie sich einen Platz im Kurs. "
    + GREY("(auch: Wenn …)"),
]
s += [R("Übung 4", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l4, 1)]
s += [
    R("Übung 5 – Beispieltext", "solh"),
    box(
        R(
            "Sehr geehrte Frau Becker,<br/>"
            "<b>zur</b> beruflichen <b>Weiterentwicklung</b> möchte ich gern an einer Weiterbildung zur Teamleitung teilnehmen. "
            "<b>Während</b> der <b>Weiterbildung</b> könnte ich nur dienstags "
            "und donnerstags im Büro sein. <b>Nach</b> dem <b>Abschluss</b> des Kurses würde ich gern mehr Aufgaben im Team übernehmen. "
            "<b>Trotz</b> der hohen <b>Kosten</b> bin ich bereit, einen Teil selbst zu bezahlen. "
            "<b>Bei</b> <b>Fragen</b> stehe ich Ihnen gern für ein Gespräch zur Verfügung.<br/>"
            "Mit freundlichen Grüßen<br/>Samira Haddad",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
