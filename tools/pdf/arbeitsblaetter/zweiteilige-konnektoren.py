# Arbeitsblatt B2 Grammatik: Zweiteilige Konnektoren
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/zweiteilige-konnektoren.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE
from reportlab.platypus import Table, TableStyle

SLUG = "zweiteilige-konnektoren"
TITLE = "Zweiteilige Konnektoren: sowohl … als auch, weder … noch, je … desto"
LEVEL = "B2"
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # verb position
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # connector

s = [
    R("B2 · Grammatik · Arbeitsblatt", "kick"),
    R("Zweiteilige Konnektoren", "h1"),
    R(
        "sowohl … als auch, weder … noch, entweder … oder, nicht nur … sondern auch, zwar … aber, "
        "einerseits … andererseits, je … desto – damit klingen Ihre Texte und Ihre Meinung im Gespräch sicher und genau.",
        "lead",
    ),
]

s += [
    R("Die Regel", "h2"),
    box(
        R(
            "<b>Zwei Teile gehören zusammen.</b> Der erste Teil kündigt an, der zweite Teil schließt ab. "
            "Die Konnektoren verbinden Wörter, Satzteile oder ganze Sätze."
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 6),
]

s += [
    table(
        [
            ["<b>Konnektor</b>", "<b>Bedeutung</b>", "<b>Beispiel</b>"],
            [
                K("sowohl … als auch"),
                "beides (A + B)",
                f"Ich brauche {K('sowohl')} den Pass {K('als auch')} die Meldebescheinigung.",
            ],
            [
                K("nicht nur … sondern auch"),
                "beides, B ist besonders wichtig",
                f"Sie spricht {K('nicht nur')} Arabisch, {K('sondern auch')} Französisch.",
            ],
            [
                K("weder … noch"),
                "keins von beiden (nicht A, nicht B)",
                f"Er hat {K('weder')} Zeit {K('noch')} Geld.",
            ],
            [
                K("entweder … oder"),
                "nur eins von beiden (A oder B)",
                f"Wir treffen uns {K('entweder')} am Montag {K('oder')} am Mittwoch.",
            ],
            [
                K("zwar … aber"),
                "ja, das stimmt – aber es gibt ein Problem",
                f"Die Wohnung ist {K('zwar')} klein, {K('aber')} sie ist günstig.",
            ],
            [
                K("einerseits … andererseits"),
                "zwei Seiten einer Sache",
                f"{K('Einerseits')} {V('verdiene')} ich mehr, {K('andererseits')} {V('habe')} ich weniger Freizeit.",
            ],
            [
                K("je … desto"),
                "wenn das eine steigt, steigt / sinkt das andere",
                f"{K('Je')} früher du dich {V('bewirbst')}, {K('desto')} besser {V('sind')} deine Chancen.",
            ],
        ],
        [42, 50, 82],
    )
]

s += [
    R("Achten Sie auf die Wortstellung", "h3"),
    table(
        [
            [
                "<b>weder … noch</b>",
                f'ist schon negativ: <font color="#C2362B"><strike>weder Zeit noch keine Lust</strike></font> {ARROW} <b>weder Zeit noch Lust</b>',
            ],
            [
                "<b>oder, aber, sondern</b>",
                f"stehen auf Position 0 – danach normale Wortstellung: …, {K('oder')} Sie {V('schreiben')} eine E-Mail.",
            ],
            [
                "<b>einerseits, andererseits</b>",
                f"zählen als Position 1 – das Verb kommt direkt danach: {K('andererseits')} {V('habe')} ich …",
            ],
            [
                "<b>je … desto</b>",
                f"{K('je')} + Komparativ: Nebensatz, Verb am Ende. {K('desto')} + Komparativ, dann sofort das Verb.<br/>"
                f"Statt desto geht auch {K('umso')}: Je mehr ich übe, umso sicherer {V('werde')} ich.",
            ],
            [
                "<b>sowohl … als auch</b>",
                f"mit zwei Personen als Subjekt: Verb meistens im Plural – Sowohl mein Mann als auch ich {V('arbeiten')} im Schichtdienst.",
            ],
        ],
        [40, 134],
        head=False,
    ),
]

# Übung 1
s += task(
    1,
    "Den zweiten Teil ergänzen",
    "Setzen Sie ein: als auch · noch · oder · sondern auch · aber · desto · andererseits",
    1,
)
u1 = [
    "Für den Antrag brauchen Sie sowohl Ihren Pass {} eine Meldebescheinigung.",
    "Leider habe ich weder einen Führerschein {} ein Auto.",
    "Wir können uns entweder am Montag {} am Mittwoch zum Elterngespräch treffen.",
    "Die neue Stelle ist zwar gut bezahlt, {} der Arbeitsweg ist sehr lang.",
    "Je mehr du mit deinen Kolleginnen und Kollegen sprichst, {} schneller lernst du Deutsch.",
    "In unserem Kurs lernen wir nicht nur Grammatik, {} viel über das Leben in Deutschland.",
    "Einerseits möchte ich gern in München wohnen, {} sind die Mieten dort sehr hoch.",
]
s += [R(f"{i}. " + t.format(GAP), "item") for i, t in enumerate(u1, 1)]

# Übung 2
s += task(
    2, "Sätze verbinden", "Verbinden Sie die Sätze mit dem Konnektor in Klammern.", 2
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Der Bus ist pünktlich. Er ist auch sauber. (nicht nur … sondern auch)<br/>"
            f"{ARROW} Der Bus ist {K('nicht nur')} pünktlich, {K('sondern auch')} sauber.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u2 = [
    "Meine Nachbarin spricht Türkisch. Sie spricht auch Kurdisch. (sowohl … als auch)",
    "Ich erreiche den Hausmeister nicht. Ich erreiche auch die Hausverwaltung nicht. (weder … noch)",
    "Sie können online bezahlen. Sie können auch bar an der Kasse bezahlen. (entweder … oder)",
    "Die Wohnung ist hell. Sie ist sehr laut. (zwar … aber)",
    "Im Homeoffice spare ich Zeit. Mir fehlen die Kollegen. (einerseits … andererseits)",
    "Herr Haddad hat einen Arbeitsvertrag bekommen. Er hat auch eine Wohnung gefunden. (nicht nur … sondern auch)",
]
for i, t in enumerate(u2, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 3
s += task(
    3, "Je … desto", "Bilden Sie Sätze mit je + Komparativ und desto + Komparativ.", 2
)
s += [
    box(
        R(
            f"<b>Beispiel:</b> Man übt viel. Man macht wenig Fehler.<br/>"
            f"{ARROW} {K('Je')} mehr man {V('übt')}, {K('desto')} weniger Fehler {V('macht')} man.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    )
]
u3 = [
    "Du bewirbst dich früh. Deine Chancen sind gut.",
    "Die Wohnung liegt zentral. Die Miete ist hoch.",
    "Ich schlafe wenig. Ich bin bei der Arbeit unkonzentriert.",
    "Man spricht oft Deutsch. Man spricht flüssig.",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

# Übung 4
s += task(
    4, "Richtig oder falsch?", "Kreuzen Sie an. Korrigieren Sie die falschen Sätze.", 3
)
u4 = [
    "Ich habe heute weder Zeit noch keine Lust.",
    "Je länger ich in Deutschland lebe, desto besser verstehe ich den Dialekt.",
    "Einerseits ist der Job interessant, andererseits ich verdiene wenig.",
    "Sowohl meine Frau als auch ich arbeiten im Schichtdienst.",
    "Je mehr ich übe, desto ich mache weniger Fehler.",
    "Die Prüfung war zwar schwer, aber ich habe sie bestanden.",
    "Entweder rufen Sie uns an, oder schreiben Sie uns eine E-Mail.",
]
box_rf = sym("☐")
for i, t in enumerate(u4, 1):
    s += [
        R(
            f'{i}. {t}   <font color="#566078">{box_rf} richtig  {box_rf} falsch</font>',
            "item",
        )
    ]

# Übung 5
s += task(
    5,
    "Ihre Meinung: Ein Auto in der Stadt – ja oder nein?",
    "Schreiben Sie 4–6 Sätze. Benutzen Sie mindestens vier verschiedene zweiteilige Konnektoren.",
    3,
)
s += [
    box(
        R(
            "<b>Ideen:</b> flexibel sein · Einkaufen mit Kindern · Benzin, Versicherung, Reparaturen · Parkplatzsuche · "
            "Bus und Bahn · Fahrrad · Umwelt · Arbeit im Schichtdienst",
            "cell",
        ),
        SOFT,
    ),
    Spacer(1, 4),
    lines(6, indent=0),
    Spacer(1, 8),
]

# Lösungen
from reportlab.lib.styles import ParagraphStyle
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)

s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"),
      R("1. als auch  ·  2. noch  ·  3. oder  ·  4. aber  ·  5. desto  ·  6. sondern auch  ·  7. andererseits", "sol")]
l2 = [
    f"Meine Nachbarin spricht {K('sowohl')} Türkisch {K('als auch')} Kurdisch.",
    f"Ich erreiche {K('weder')} den Hausmeister {K('noch')} die Hausverwaltung.",
    f"Sie können {K('entweder')} online {K('oder')} bar an der Kasse bezahlen.",
    f'Die Wohnung ist {K("zwar")} hell, {K("aber")} sie ist sehr laut. <font color="#566078">(auch: …, aber sehr laut.)</font>',
    f"{K('Einerseits')} {V('spare')} ich im Homeoffice Zeit, {K('andererseits')} {V('fehlen')} mir die Kollegen.",
    f"Herr Haddad hat {K('nicht nur')} einen Arbeitsvertrag bekommen, {K('sondern auch')} eine Wohnung gefunden.",
]
s += [R("Übung 2", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l2, 1)]
l3 = [
    f"{K('Je')} früher du dich {V('bewirbst')}, {K('desto')} besser {V('sind')} deine Chancen.",
    f"{K('Je')} zentraler die Wohnung {V('liegt')}, {K('desto')} höher {V('ist')} die Miete.",
    f"{K('Je')} weniger ich {V('schlafe')}, {K('desto')} unkonzentrierter {V('bin')} ich bei der Arbeit.",
    f"{K('Je')} öfter man Deutsch {V('spricht')}, {K('desto')} flüssiger {V('spricht')} man.",
]
s += [R("Übung 3", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
l4 = [
    f'1. falsch {ARROW} Ich habe heute weder Zeit noch Lust. <font color="#566078">(weder … noch ist schon negativ)</font>',
    f"3. falsch {ARROW} …, andererseits {V('verdiene')} ich wenig.",
    f"5. falsch {ARROW} Je mehr ich übe, desto weniger Fehler {V('mache')} ich.",
    f'7. falsch {ARROW} Entweder rufen Sie uns an, oder Sie {V("schreiben")} uns eine E-Mail. <font color="#566078">(oder = Position 0)</font>',
    "2., 4. und 6. sind richtig.",
]
s += [R("Übung 4", "solh")] + [R(t, "sol") for t in l4]
s += [
    R("Übung 5 – Beispieltext", "solh"),
    box(
        R(
            "Ein Auto in der Stadt hat <b>sowohl</b> Vorteile <b>als auch</b> Nachteile. <b>Einerseits</b> ist man flexibel und kann "
            "mit den Kindern bequem einkaufen, <b>andererseits</b> kostet ein Auto viel Geld – <b>nicht nur</b> das Benzin, "
            "<b>sondern auch</b> die Versicherung und die Reparaturen. In meinem Viertel findet man <b>zwar</b> manchmal einen "
            "Parkplatz, <b>aber</b> oft sucht man sehr lange. <b>Je</b> besser Bus und Bahn werden, <b>desto</b> weniger brauche "
            "ich ein Auto. Deshalb fahre ich zur Arbeit <b>entweder</b> mit dem Fahrrad <b>oder</b> mit der Straßenbahn.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
