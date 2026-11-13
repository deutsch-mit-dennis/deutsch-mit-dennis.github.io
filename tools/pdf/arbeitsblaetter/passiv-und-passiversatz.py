# Arbeitsblatt B2 Grammatik: Passiv und Passiversatz
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/passiv-und-passiversatz.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from reportlab.lib.styles import ParagraphStyle

SLUG = "passiv-und-passiversatz"
TITLE = "Passiv und Passiversatz: wird gemacht, ist zu machen, lässt sich machen, machbar"
LEVEL = "B2"
HEAD = "Passiv und Passiversatz: wird gemacht, ist zu machen, machbar"  # page header (max. 70 characters)
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # verb parts
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # marker of the form
GREY = lambda t: f'<font color="#566078">{t}</font>'

s = [
    R("B2 · Grammatik · Arbeitsblatt", "kick"),
    R("Passiv und Passiversatz", "h1"),
    R(
        "Im Beruf, auf dem Amt und in der Hausordnung ist oft nicht wichtig, <i>wer</i> etwas tut – sondern <i>was</i> passiert "
        "oder <i>was zu tun ist</i>. Dafür gibt es das Passiv und vier kurze Ersatzformen.",
        "lead",
    ),
]

s += [
    R("Die Regel", "h2"),
    box(
        R(
            "<b>Passiv:</b> Die Handlung steht im Mittelpunkt, nicht die Person. "
            "<b>Passiversatz:</b> Diese Formen ersetzen meistens ein Passiv mit <i>können</i> oder <i>müssen</i> – "
            "sie sind kürzer und klingen offiziell."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Form</b>", "<b>Bedeutung</b>", "<b>Beispiel</b>"],
            [
                f"{K('werden')} + Partizip II",
                "Vorgang: Es passiert gerade / regelmäßig.",
                f"Die Heizung {V('wird')} morgen {V('repariert')}.<br/>"
                f"Präteritum: Der Antrag {V('wurde')} {V('geprüft')}.<br/>"
                f"Perfekt: Die Wohnung {V('ist')} {V('renoviert worden')}.",
            ],
            [
                f"Modalverb + Partizip II + {K('werden')}",
                "muss / kann / darf gemacht werden",
                f"Das Formular {V('muss')} bis Freitag {V('abgegeben werden')}.",
            ],
            [
                f"{K('sein + zu')} + Infinitiv",
                "<b>muss</b> gemacht werden <i>oder</i><br/><b>kann</b> gemacht werden (oft mit <i>leicht, kaum, nicht</i>)",
                f"Der Ausweis {V('ist')} am Schalter {V('vorzulegen')}. (= muss)<br/>"
                f"Die Schrift {V('ist')} kaum {V('zu lesen')}. (= kann kaum)",
            ],
            [
                f"{K('sich lassen')} + Infinitiv",
                "kann gemacht werden",
                f"Das Problem {V('lässt')} sich schnell {V('lösen')}.",
            ],
            [
                f"Adjektiv auf {K('-bar')} / {K('-lich')}",
                "kann gemacht werden<br/>(mit <i>un-</i>: kann nicht …)",
                f"Der Termin ist nicht {V('verschiebbar')}.<br/>"
                f"Die Anleitung ist {V('verständlich')}. Das Wort ist {V('unlesbar')}.",
            ],
        ],
        [44, 52, 78],
    )
]

s += [
    R("Achten Sie auf diese Punkte", "h3"),
    table(
        [
            [
                "<b>worden, nicht geworden</b>",
                f'Im Perfekt Passiv heißt es <b>worden</b>: <font color="#C2362B"><strike>ist repariert geworden</strike></font> '
                f"{ARROW} ist repariert {V('worden')}.",
            ],
            [
                "<b>Wer macht es?</b>",
                f"Person mit {K('von')} + Dativ: Der Vertrag wird {K('von')} der Chefin unterschrieben. "
                f"Mittel oder Ursache mit {K('durch')}: Das Haus wurde {K('durch')} das Feuer beschädigt.",
            ],
            [
                "<b>zu bei trennbaren Verben</b>",
                f"<i>zu</i> steht in der Mitte: aus{K('zu')}füllen, ein{K('zu')}reichen, ab{K('zu')}holen.",
            ],
            [
                "<b>sich lassen im Nebensatz</b>",
                f"<i>lassen</i> steht ganz am Ende: …, weil sich das Fenster nicht öffnen {V('lässt')}.",
            ],
            [
                "<b>-bar</b>",
                "nur bei Verben mit Akkusativ: machen – machbar, erreichen – erreichbar, bezahlen – bezahlbar, waschen – waschbar.",
            ],
        ],
        [44, 130],
        head=False,
    ),
]

# Übung 1
s += task(
    1,
    "Passiv bilden",
    "Ergänzen Sie das Passiv in der angegebenen Zeit. Ein Strich = ein Wort.",
    1,
)
u1 = [
    "Die Lampen im Treppenhaus {g} morgen {g}. (austauschen · Präsens)",
    "Ihr Antrag {g} letzte Woche {g}. (bearbeiten · Präteritum)",
    "Die neuen Dienstpläne {g} schon {g} {g}. (verschicken · Perfekt)",
    "Das Formular {g} bis zum 15. März {g} {g}. (abgeben · mit <i>müssen</i>)",
    "Die Kaution {g} nach dem Auszug pünktlich {g}. (zurückzahlen · Präteritum)",
    "Neue Mitarbeitende {g} in der ersten Woche von einer Kollegin {g}. (einarbeiten · Präsens)",
    "Der Mietvertrag {g} noch nicht {g} {g}. (unterschreiben · Perfekt)",
]
s += [R(f"{i}. " + t.format(g=GAP), "item") for i, t in enumerate(u1, 1)]

# Übung 2
s += task(
    2,
    "Passiversatz: kürzer sagen",
    "Formen Sie die Sätze mit der Form in Klammern um.",
    2,
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Das Problem kann schnell gelöst werden. (sich lassen)<br/>"
            f"{ARROW} Das Problem {V('lässt')} sich schnell {V('lösen')}.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u2 = [
    "Die Rechnung muss innerhalb von 14 Tagen bezahlt werden. (sein + zu)",
    "Das Fenster im Bad kann nicht geöffnet werden. (sich lassen)",
    "Der Termin beim Bürgeramt kann nicht verschoben werden. (-bar)",
    "Der Antrag muss vollständig ausgefüllt werden. (sein + zu)",
    "Die Unterlagen können auch online eingereicht werden. (sich lassen)",
    "Die Mieten in diesem Viertel können kaum bezahlt werden. (-bar)",
]
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 3
s += task(
    3,
    "sein + zu: muss oder kann?",
    "Was bedeutet der Satz? Kreuzen Sie an.",
    2,
)
u3 = [
    "Der Ausweis ist bei der Abholung vorzulegen.",
    "Der Lärm von der Baustelle ist kaum auszuhalten.",
    "In der Halle ist immer Schutzkleidung zu tragen.",
    "Das Bürgeramt ist mit der Linie 12 gut zu erreichen.",
    "Der Müll ist in die richtige Tonne zu werfen.",
    "Die neue Software ist leicht zu bedienen.",
]
cb = sym("☐")
for i, t in enumerate(u3, 1):
    s += [R(f'{i}. {t}   {GREY(f"{cb} muss  {cb} kann")}', "item")]

# Übung 4
s += task(
    4, "Richtig oder falsch?", "Kreuzen Sie an. Korrigieren Sie die falschen Sätze.", 3
)
u4 = [
    "Die Wohnung ist letztes Jahr komplett renoviert geworden.",
    "Der Fehler in der Abrechnung lässt sich leicht korrigieren.",
    "Die Bewerbung muss bis Freitag geschickt worden.",
    "Die Tür zum Keller lässt sich nicht geschlossen.",
    "Der Vertrag wurde gestern von der Personalchefin unterschrieben.",
    "Die Unterlagen sind bis morgen zu einreichen.",
    "Die Formulare sind auch online ausfüllbar.",
]
for i, t in enumerate(u4, 1):
    s += [R(f'{i}. {t}   {GREY(f"{cb} richtig  {cb} falsch")}', "item")]

# Übung 5
s += [KeepTogether(task(
    5,
    "Willkommen im Haus!",
    "Schreiben Sie für neue Mieterinnen und Mieter 5–6 Sätze für einen Aushang. Benutzen Sie mindestens vier verschiedene Formen: "
    "Passiv mit werden, Passiv mit Modalverb, sein + zu, sich lassen, -bar/-lich.",
    3,
) + [
    box(
        R(
            "<b>Ideen:</b> Mülltrennung · Waschküche im Keller · Ruhezeiten · Pakete beim Nachbarn · Fahrradkeller · "
            "Schäden melden · Hausverwaltung telefonisch erreichen · Treppenhaus putzen",
            "cell",
        ),
        SOFT,
    ),
    Spacer(1, 4),
    lines(6, indent=0),
])]
s += [Spacer(1, 8)]

# Lösungen
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
l1 = [
    f"{V('werden')} … {V('ausgetauscht')}",
    f"{V('wurde')} … {V('bearbeitet')}",
    f"{V('sind')} … {V('verschickt worden')}",
    f"{V('muss')} … {V('abgegeben werden')}",
    f"{V('wurde')} … {V('zurückgezahlt')}",
    f"{V('werden')} … {V('eingearbeitet')}",
    f"{V('ist')} … {V('unterschrieben worden')}",
]
s += [R("Übung 1", "solh"), R("  ·  ".join(f"{i}. {t}" for i, t in enumerate(l1, 1)), "sol")]
l2 = [
    f"Die Rechnung {V('ist')} innerhalb von 14 Tagen {V('zu bezahlen')}.",
    f"Das Fenster im Bad {V('lässt')} sich nicht {V('öffnen')}.",
    f"Der Termin beim Bürgeramt ist nicht {V('verschiebbar')}.",
    f"Der Antrag {V('ist')} vollständig {V('auszufüllen')}.",
    f"Die Unterlagen {V('lassen')} sich auch online {V('einreichen')}.",
    f"Die Mieten in diesem Viertel sind kaum {V('bezahlbar')}.",
]
s += [R("Übung 2", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l2, 1)]
s += [
    R("Übung 3", "solh"),
    R(
        "1. muss  ·  2. kann (= kann kaum ausgehalten werden)  ·  3. muss  ·  4. kann  ·  5. muss  ·  6. kann",
        "sol",
    ),
    R(GREY("Tipp: Wörter wie <i>leicht, gut, kaum, nicht</i> zeigen meistens die Bedeutung <i>kann</i>."), "sol"),
]
l4 = [
    f"1. falsch {ARROW} Die Wohnung ist letztes Jahr komplett renoviert {V('worden')}.",
    f"3. falsch {ARROW} Die Bewerbung muss bis Freitag geschickt {V('werden')}.",
    f"4. falsch {ARROW} Die Tür zum Keller lässt sich nicht {V('schließen')}. {GREY('(lassen + Infinitiv)')}",
    f"6. falsch {ARROW} Die Unterlagen sind bis morgen {V('einzureichen')}. {GREY('(trennbares Verb: zu in der Mitte)')}",
    "2., 5. und 7. sind richtig.",
]
s += [R("Übung 4", "solh")] + [R(t, "sol") for t in l4]
s += [
    R("Übung 5 – Beispieltext", "solh"),
    box(
        R(
            "Herzlich willkommen in unserem Haus! Der Müll <b>wird</b> bei uns <b>getrennt</b>: Papier, Plastik und Restmüll "
            "<b>sind</b> in die richtige Tonne <b>zu werfen</b>. Die Waschküche im Keller <b>kann</b> von allen Mieterinnen und "
            "Mietern <b>genutzt werden</b>; die Maschinen <b>lassen sich</b> mit einer Karte <b>bedienen</b>. "
            "Schäden in der Wohnung <b>müssen</b> sofort <b>gemeldet werden</b>. Die Hausverwaltung ist werktags von 8 bis "
            "16 Uhr telefonisch <b>erreichbar</b>. Von 22 bis 6 Uhr <b>ist</b> Lärm im Treppenhaus <b>zu vermeiden</b>.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
