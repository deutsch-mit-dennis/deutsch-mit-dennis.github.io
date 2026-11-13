# Arbeitsblatt B2 Grammatik: Indirekte Rede mit Konjunktiv I
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/indirekte-rede-konjunktiv-1.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from reportlab.lib.styles import ParagraphStyle

SLUG = "indirekte-rede-konjunktiv-1"
TITLE = "Indirekte Rede mit Konjunktiv I: Berichte, Protokolle, Nachrichten"
LEVEL = "B2"
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # verb in Konjunktiv
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # reporting verb / connector
GREY = lambda t: f'<font color="#566078">{t}</font>'

s = [
    R("B2 · Grammatik · Arbeitsblatt", "kick"),
    R("Indirekte Rede mit Konjunktiv I", "h1"),
    R(
        "In Protokollen, Berichten und Nachrichten gibt man wieder, was andere gesagt haben – neutral und ohne eigene Meinung. "
        "Dafür benutzt man den Konjunktiv I.",
        "lead",
    ),
]

s += [
    R("Die Regel", "h2"),
    box(
        R(
            "<b>Konjunktiv I zeigt:</b> Das ist die Aussage einer anderen Person, nicht meine. "
            "<b>Bildung:</b> Infinitiv-Stamm + Endung. Meistens braucht man nur die 3. Person: "
            f"er/sie/es kommt {ARROW} er {V('komme')}, sie hat {ARROW} sie {V('habe')}, es ist {ARROW} es {V('sei')}. "
            "<b>Ist der Konjunktiv I gleich wie der Indikativ</b> (z. B. sie haben), nimmt man den Konjunktiv II "
            f"(sie {V('hätten')}) oder <i>würde</i> + Infinitiv (sie {V('würden')} kommen)."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Person</b>", "<b>sein</b>", "<b>haben</b>", "<b>werden</b>", "<b>können</b>", "<b>kommen</b>"],
            ["ich", V("sei"), f"{GREY('habe')} {ARROW} hätte", f"{GREY('werde')} {ARROW} würde", V("könne"), f"{GREY('komme')} {ARROW} käme"],
            ["er / sie / es", V("sei"), V("habe"), V("werde"), V("könne"), V("komme")],
            ["wir", V("seien"), f"{GREY('haben')} {ARROW} hätten", f"{GREY('werden')} {ARROW} würden", f"{GREY('können')} {ARROW} könnten", f"{GREY('kommen')} {ARROW} kämen"],
            ["sie / Sie", V("seien"), f"{GREY('haben')} {ARROW} hätten", f"{GREY('werden')} {ARROW} würden", f"{GREY('können')} {ARROW} könnten", f"{GREY('kommen')} {ARROW} kämen"],
        ],
        [24, 16, 32, 34, 34, 34],
    ),
    R(
        GREY(f"Grau = gleich wie Indikativ {ARROW} Konjunktiv II benutzen. Die Formen für du und ihr (du seist, ihr habet) "
             "kommen in Texten fast nie vor."),
        "small",
    ),
]

s += [
    R("So bauen Sie die indirekte Rede", "h3"),
    table(
        [
            [
                "<b>Gegenwart</b>",
                f"„Ich arbeite heute im Homeoffice.“ {ARROW} Sie {K('sagt')}, sie {V('arbeite')} heute im Homeoffice.",
            ],
            [
                "<b>Vergangenheit</b>",
                f"„Wir waren in Köln.“ / „Ich habe angerufen.“ {ARROW} Sie seien in Köln {V('gewesen')}. / Er {V('habe')} angerufen.<br/>"
                + GREY("Perfekt, Präteritum und Plusquamperfekt: immer habe/sei + Partizip II."),
            ],
            [
                "<b>Zukunft</b>",
                f"„Ich werde morgen anrufen.“ {ARROW} Er {K('sagt')}, er {V('werde')} am nächsten Tag {V('anrufen')}.",
            ],
            [
                "<b>Fragen</b>",
                f"Ja/Nein-Frage mit {K('ob')}, W-Frage mit dem W-Wort – Verb am Ende:<br/>"
                f"Sie {K('fragt')}, {K('ob')} die Sitzung {V('stattfinde')}. / Er {K('fragt')}, {K('wann')} der Termin {V('sei')}.",
            ],
            [
                "<b>Bitten</b>",
                f"mit {K('sollen')}: „Schicken Sie mir die Liste!“ {ARROW} Sie {K('bittet')} ihn, er {V('solle')} ihr die Liste schicken.",
            ],
            [
                "<b>Mit dass</b>",
                f"Auch möglich, dann Verb am Ende: Sie sagt, {K('dass')} sie heute im Homeoffice {V('arbeite')}.",
            ],
            [
                "<b>Anpassen</b>",
                f"Pronomen und Zeitangaben ändern sich: ich {ARROW} er/sie, mein {ARROW} sein/ihr, wir {ARROW} sie, "
                f"heute {ARROW} an diesem Tag, morgen {ARROW} am nächsten Tag.",
            ],
        ],
        [30, 144],
        head=False,
    ),
    R(
        "<b>Redeverben:</b> sagen, erklären, berichten, betonen, mitteilen, meinen, behaupten, fragen, bitten, vorschlagen, "
        "darauf hinweisen",
        "small",
    ),
]

# Übung 1
s += task(
    1,
    "In der Teambesprechung",
    "Ergänzen Sie das Verb im Konjunktiv I. Ist er gleich wie der Indikativ, nehmen Sie den Konjunktiv II.",
    1,
)
u1 = [
    "Frau Okafor sagt, das neue System {} ab Montag. (funktionieren)",
    "Herr Lindqvist erklärt, er {} am Freitag nicht im Büro. (sein)",
    "Die Teamleiterin betont, alle {} die Schulung besuchen. (müssen)",
    "Herr Demir berichtet, die Kundin {} schon zweimal angerufen. (haben)",
    "Frau Nguyen meint, die Zahlen {} sich bald verbessern. (werden)",
    "Herr Wagner sagt, er {} die Präsentation bis Mittwoch fertig machen. (können)",
    "Die Kolleginnen sagen, sie {} keine Zeit für ein weiteres Projekt. (haben)",
]
s += [R(f"{i}. " + t.format(GAP), "item") for i, t in enumerate(u1, 1)]

# Übung 2
s += task(
    2,
    "Zeitungsmeldungen",
    "Schreiben Sie die Aussagen in indirekter Rede – ohne dass.",
    2,
)
s += [
    box(
        R(
            "<b>Beispiel:</b> Die Bürgermeisterin sagt: „Die Bibliothek bleibt im Sommer geöffnet.“<br/>"
            f"{ARROW} Die Bürgermeisterin {K('sagt')}, die Bibliothek {V('bleibe')} im Sommer geöffnet.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u2 = [
    "Die Polizei teilt mit: „Der Unfall ist am frühen Morgen passiert.“",
    "Eine Anwohnerin berichtet: „Ich warte seit drei Wochen auf eine Antwort der Stadt.“",
    "Die Stadt erklärt: „Das Hallenbad wird im Herbst renoviert.“",
    "Ein Sprecher der Verkehrsbetriebe sagt: „Die Busse fahren ab Montag wieder nach Fahrplan.“",
    "Die Veranstalterin berichtet: „Mehr als 2000 Menschen kamen zum Stadtteilfest.“",
]
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 3
s += task(
    3,
    "Fragen und Bitten wiedergeben",
    "Schreiben Sie die Fragen und Bitten in indirekter Rede.",
    2,
)
u3 = [
    "Der Schichtleiter fragt: „Wer übernimmt die Spätschicht am Samstag?“",
    "Frau Mendes fragt: „Gibt es schon einen neuen Termin für die Schulung?“",
    "Herr Sobczak bittet Frau Ivanova: „Schicken Sie mir bitte das Protokoll!“",
    "Die Teamleiterin sagt zu allen: „Kommen Sie bitte pünktlich!“",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 4
s += task(
    4,
    "Ein Protokoll ergänzen",
    "Setzen Sie die Verben in Klammern im Konjunktiv ein.",
    3,
)
G = lambda n, v: f"({n}) {GAP} ({v})"
s += [
    box(
        R(
            "<b>Protokoll der Teambesprechung vom 4. Februar</b><br/>"
            f"Frau Ivanova berichtete, das neue Kassensystem {G(1, 'laufen')} seit Montag ohne Probleme. "
            f"Allerdings {G(2, 'geben')} es noch Fragen zur Abrechnung. Herr Haddad erklärte, er {G(3, 'haben')} "
            f"schon mit dem Hersteller telefoniert; ein Techniker {G(4, 'kommen')} am Donnerstag. "
            f"Frau Mendes fragte, ob die Schulung auch online {G(5, 'stattfinden')}. Die Teamleitung antwortete, "
            f"das {G(6, 'sein')} möglich. Alle Kolleginnen und Kollegen {G(7, 'müssen')} sich aber bis Freitag anmelden.",
            "p",
        ),
        SOFT,
    ),
]

# Übung 5
s += [KeepTogether(task(
    5,
    "Ihr Protokoll: Planung des Sommerfests",
    "Lesen Sie die Aussagen aus der Besprechung. Schreiben Sie ein kurzes Protokoll in indirekter Rede (5–6 Sätze). "
    "Benutzen Sie verschiedene Redeverben.",
    3,
) + [
    box(
        R(
            "<b>Herr Lindqvist:</b> „Ich habe drei Angebote für das Essen eingeholt.“<br/>"
            "<b>Frau Okafor:</b> „Das günstigste Angebot hat leider kein vegetarisches Essen.“<br/>"
            "<b>Herr Demir:</b> „Können wir das Fest im Hof feiern?“<br/>"
            "<b>Frau Nguyen:</b> „Bei Regen brauchen wir ein Zelt. Ich kümmere mich darum.“<br/>"
            "<b>Die Teamleiterin:</b> „Melden Sie sich bitte bis zum 30. Mai an!“",
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
s += [
    R("Übung 1", "solh"),
    R(
        f"1. funktioniere  ·  2. sei  ·  3. müssten {GREY('(müssen = Indikativ)')}  ·  4. habe  ·  "
        f"5. würden {GREY('(werden = Indikativ)')}  ·  6. könne  ·  7. hätten {GREY('(haben = Indikativ)')}",
        "sol",
    ),
]
l2 = [
    f"Die Polizei teilt mit, der Unfall {V('sei')} am frühen Morgen {V('passiert')}.",
    f"Eine Anwohnerin berichtet, sie {V('warte')} seit drei Wochen auf eine Antwort der Stadt.",
    f"Die Stadt erklärt, das Hallenbad {V('werde')} im Herbst {V('renoviert')}.",
    f"Ein Sprecher der Verkehrsbetriebe sagt, die Busse {V('führen')} ab Montag wieder nach Fahrplan. "
    + GREY("(auch: würden … fahren)"),
    f"Die Veranstalterin berichtet, es {V('seien')} mehr als 2000 Menschen zum Stadtteilfest {V('gekommen')}. "
    + GREY("(auch: mehr als 2000 Menschen seien … gekommen)"),
]
s += [R("Übung 2", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l2, 1)]
l3 = [
    f"Der Schichtleiter fragt, {K('wer')} die Spätschicht am Samstag {V('übernehme')}.",
    f"Frau Mendes fragt, {K('ob')} es schon einen neuen Termin für die Schulung {V('gebe')}.",
    f"Herr Sobczak bittet Frau Ivanova, sie {V('solle')} ihm das Protokoll schicken. "
    + GREY("(auch: …, ihm das Protokoll zu schicken.)"),
    f"Die Teamleiterin sagt zu allen, sie {V('sollten')} pünktlich kommen. " + GREY("(sollen = Indikativ)"),
]
s += [R("Übung 3", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
s += [
    R("Übung 4", "solh"),
    R(
        "(1) laufe  ·  (2) gebe  ·  (3) habe  ·  (4) komme  ·  (5) stattfinde  ·  (6) sei  ·  "
        f"(7) müssten {GREY('(müssen = Indikativ)')}",
        "sol",
    ),
    R("Übung 5 – Beispieltext", "solh"),
    box(
        R(
            "Herr Lindqvist <b>berichtete</b>, er <b>habe</b> drei Angebote für das Essen eingeholt. Frau Okafor "
            "<b>wies darauf hin</b>, das günstigste Angebot <b>habe</b> leider kein vegetarisches Essen. Herr Demir "
            "<b>fragte</b>, ob man das Fest im Hof feiern <b>könne</b>. Frau Nguyen <b>erklärte</b>, bei Regen "
            "<b>brauche</b> man ein Zelt; sie <b>kümmere</b> sich darum. Die Teamleiterin <b>bat</b> alle, sie "
            "<b>sollten</b> sich bis zum 30. Mai anmelden.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
