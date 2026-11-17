# Arbeitsblatt DTB B1 Prüfung: Lesen Teil 1–4 (Strategien, Fallen, Übungen im Prüfungsformat)
# Format laut pruefung-fakten.js (dtb-b1) und sim/dtb-b1*.js: 40 Min., 4 Teile, 18 Aufgaben, 3 Punkte pro Aufgabe;
# Lesen gesamt 60 Punkte (zusammen mit den Aufgaben 19–20 aus „Lesen und Schreiben“).
# Eigene Texte im Stil der Prüfung, keine Originalaufgaben. Alle Firmen und Personen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: python3 tools/pdf/arbeitsblaetter/dtb-b1-lesen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b1-lesen"
TITLE = "DTB B1 Lesen: Strategien und Übungen zu allen vier Teilen"
LEVEL = "B1"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table(
        [[fallback(c) if isinstance(c, str) else c for c in r] for r in rows],
        widths,
        head,
    )


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.3)
st["sol"] = ParagraphStyle(
    "sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=2
)
st["solh"] = ParagraphStyle(
    "solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2
)
st["tip"] = ParagraphStyle(
    "tip",
    parent=st["cell"],
    fontSize=9.5,
    leading=11.8,
    leftIndent=10,
    firstLineIndent=-10,
    spaceAfter=2,
)

BOX = sym("☐")
RF = f'<font color="#566078">{BOX} richtig   {BOX} falsch</font>'
LINE_ = '<font color="#8A93A8">____</font>'


def tips_traps(title, tips, traps):
    """Two boxes side by side: strategy (green) and traps (yellow)."""
    left = [R("<b>So gehen Sie vor</b>", "cell")] + [
        R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)
    ]
    right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [
        R(f"– {t}", "tip") for t in traps
    ]
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN),
                ("BACKGROUND", (1, 0), (1, 0), NOTE),
                ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN),
                ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return KeepTogether([R(title, "h2"), t])


def abc(nr, q, opts):
    """Question with options a–c side by side (compact, like the answer sheet)."""
    row = [
        R(f'<font color="#566078">{BOX}</font> {l}) {o}', "tip")
        for l, o in zip("abc", opts)
    ]
    t = Table([row], colWidths=[56 * mm] * 3, hAlign="RIGHT")
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return KeepTogether([R(f"<b>{nr}.</b> {q}", "item"), t])


def rf(nr, q):
    t = Table(
        [[R(f"<b>{nr}.</b> {q}", "item"), R(RF, "cell")]],
        colWidths=[128 * mm, 40 * mm],
        hAlign="LEFT",
    )
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    return t


def sbox(paras, bg=SOFT, first=True, last=True):
    """Box that may break across pages: one table row per paragraph."""
    t = Table([[R(p, "mat")] for p in paras], colWidths=[174 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                ("TOPPADDING", (0, 0), (-1, 0), 7 if first else 1.5),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 7 if last else 1.5),
            ]
        )
    )
    return t


def text_with_task(nr, title, hint, level, text, n_head):
    """Task heading + first rows of the text kept together; the rest of the text may break."""
    rows = [x for x in text.split("<br/>") if x]
    return [
        KeepTogether(task(nr, title, hint, level) + [sbox(rows[:n_head], last=False)]),
        sbox(rows[n_head:], first=False),
    ]


# ───────────────────────── Kopf + Überblick ─────────────────────────
s = [
    R("B1 · Prüfung DTB · Arbeitsblatt", "kick"),
    R("DTB B1 Lesen: alle vier Teile", "h1"),
    R(
        "Stellenanzeigen, Infos im Intranet, Arbeitsanweisungen, E-Mails von der Teamleitung: So funktioniert jeder Teil – "
        "mit Übungen im Stil der Prüfung.",
        "lead",
    ),
    R("So läuft der Prüfungsteil Lesen", "h2"),
    box(
        R(
            "Sie haben für <b>alle vier Teile zusammen 40 Minuten</b> – also ca. 10 Minuten pro Teil. "
            "Es gibt 18 Aufgaben, jede richtige Aufgabe zählt 3 Punkte. Zusammen mit den Aufgaben 19 und 20 aus "
            "„Lesen und Schreiben“ sind das 60 Punkte für Lesen.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 4),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            [
                "<b>1</b> Stellenanzeigen",
                "5 Personen (Aufgaben 1–5), 8 Anzeigen (a–h): Was passt zu wem? Für eine Person passt keine Anzeige: x.",
                "ca. 10 Min.",
                "5 × 3 = 15",
            ],
            [
                "<b>2</b> Informationen, z. B. zu Weiterbildungen",
                "Ein längerer Informationstext, 4 Aufgaben (6–9) mit a, b oder c.",
                "ca. 10 Min.",
                "4 × 3 = 12",
            ],
            [
                "<b>3</b> Arbeitsanweisungen verstehen",
                "Eine Anweisung aus dem Betrieb, 4 Aufgaben (10–13) mit a, b oder c.",
                "ca. 10 Min.",
                "4 × 3 = 12",
            ],
            [
                "<b>4</b> Aufgaben und Aufgabenverteilung",
                "Eine E-Mail der Teamleitung, 5 Aussagen (14–18): richtig oder falsch?",
                "ca. 10 Min.",
                "5 × 3 = 15",
            ],
        ],
        [42, 88, 22, 22],
    ),
]

# ───────────────────────── Teil 1 ─────────────────────────
s += [
    tips_traps(
        "Teil 1 · Stellenanzeigen",
        [
            "Lesen Sie zuerst die Personen und unterstreichen Sie die Bedingungen: Arbeitszeit, Teilzeit/Vollzeit, Beruf, Führerschein, Abschluss.",
            "Lesen Sie die Anzeigen dann nur suchend – nach genau diesen Punkten.",
            "Prüfen Sie <b>jede</b> Bedingung. Passt eine nicht, passt die Anzeige nicht.",
            "Benutzte Anzeigen durchstreichen. Passt wirklich nichts: x.",
        ],
        [
            "Der Beruf passt, aber die Arbeitszeit nicht.",
            "Gleiche Wörter in Person und Anzeige, aber eine Bedingung fehlt (z. B. anerkannter Abschluss).",
            "Man vergisst x und nimmt eine Anzeige, die „fast“ passt.",
        ],
    ),
]
s += task(
    1,
    "Welche Anzeige passt?",
    "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? "
    "Jede Anzeige können Sie nur einmal verwenden. Für eine Person gibt es keine passende Anzeige. Schreiben Sie dann x.",
    2,
)
sit = [
    "Mehmet hat zehn Jahre als Koch gearbeitet. Er sucht eine Vollzeitstelle, möchte aber am Wochenende frei haben, weil er dann seine Kinder sieht.",
    "Svetlana war in Kasachstan Buchhalterin. Nachmittags besucht sie einen Deutschkurs. Sie sucht eine Teilzeitstelle im Büro, nur vormittags.",
    "Joseph macht unter der Woche eine Ausbildung. Am Wochenende möchte er mit einem Minijob etwas dazuverdienen. Er hat einen Pkw-Führerschein (Klasse B).",
    "Ana hat in Brasilien als Erzieherin gearbeitet. Ihr Abschluss ist in Deutschland noch nicht anerkannt. Sie sucht eine Vollzeitstelle in einer Kita.",
    "Hoang ist Elektriker, sein Abschluss ist anerkannt. Er möchte gern auf Baustellen arbeiten und findet es gut, wenn er unterwegs ist.",
]
s += [R(f"<b>{i}.</b> {t}   Anzeige: {LINE_}", "item") for i, t in enumerate(sit, 1)]
ads = [
    (
        "a) Gasthaus Lindenkrug, Hilden",
        "Koch/Köchin (m/w/d) in Vollzeit. Arbeitszeit Mittwoch bis Sonntag, Montag und Dienstag sind Ruhetage. Gute Bezahlung und Essen im Betrieb.",
    ),
    (
        "b) Kantine Gewerbepark Nord, Düsseldorf",
        "Mitarbeiter/in Küche in Vollzeit, Montag bis Freitag 6:00–14:30 Uhr. Erfahrung als Koch oder Köchin erwünscht. Samstag und Sonntag immer frei.",
    ),
    (
        "c) Hausverwaltung Kleinert, Neuss",
        "Bürokraft (m/w/d) in Teilzeit, 20 Std./Woche. Arbeitszeit Montag bis Freitag 13:00–17:00 Uhr. Gute PC-Kenntnisse erforderlich.",
    ),
    (
        "d) Steuerbüro Hartmann & Öztürk, Düsseldorf",
        "Bürokraft für die Buchhaltung in Teilzeit, Montag bis Freitag 8:00–12:00 Uhr. Erfahrung in der Buchhaltung, auch aus dem Ausland, ist uns willkommen.",
    ),
    (
        "e) Getränke Albers, Ratingen",
        "Fahrer/in (m/w/d) in Vollzeit für die Auslieferung an Restaurants. Führerschein Klasse C erforderlich. Arbeitsbeginn 5:30 Uhr.",
    ),
    (
        "f) Kurierdienst Falkner & Ruiz, Düsseldorf",
        "Aushilfsfahrer/in auf Minijob-Basis, nur samstags und sonntags. Führerschein Klasse B reicht, Sie fahren unsere Firmenwagen.",
    ),
    (
        "g) Kita Sonnenblume, Mettmann",
        "Staatlich anerkannte Erzieher/innen (m/w/d) in Vollzeit. Voraussetzung: eine in Deutschland anerkannte Ausbildung. Unbefristeter Vertrag.",
    ),
    (
        "h) Elektro Moll & Partner, Krefeld",
        "Elektriker/in (m/w/d) in Vollzeit für die Montage auf Baustellen in ganz NRW. Anerkannter Abschluss erforderlich, Firmenwagen vorhanden.",
    ),
]
cells = [
    [R(f"<b>{h}</b><br/>{t}", "mat") for h, t in ads[i : i + 2]] for i in range(0, 8, 2)
]
ta = Table(cells, colWidths=[87 * mm, 87 * mm])
ta.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BOX", (0, 0), (-1, -1), 0.4, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )
)
s += [Spacer(1, 3), ta]

# ───────────────────────── Teil 2 ─────────────────────────
s += [
    tips_traps(
        "Teil 2 · Informationen, z. B. zu Weiterbildungen",
        [
            "Lesen Sie zuerst die Aufgabe und markieren Sie das Schlüsselwort (z. B. „Kantine“, „Anmeldung“).",
            "Suchen Sie den passenden Abschnitt – Überschriften helfen.",
            "Lesen Sie diesen Abschnitt genau und vergleichen Sie jede Option.",
            "Achten Sie auf kleine Wörter: <i>nur, immer, auch, nicht, alle</i>.",
        ],
        [
            "Eine Option nennt eine Information aus einem anderen Abschnitt.",
            "„Alle“ oder „immer“ in der Option – im Text steht es aber nicht so absolut.",
            "Zahlen, Tage oder Orte werden vertauscht.",
        ],
    ),
]
T2_HINT = "Lesen Sie den Text und die Aufgaben 6–9. Welche Antwort (a, b oder c) passt am besten?"
info = (
    "<b>Intranet · Klinik am Seepark · Angebote für Mitarbeitende 2027</b><br/>"
    "Liebe Kolleginnen und Kollegen, hier finden Sie unsere Angebote für das neue Jahr auf einen Blick.<br/>"
    "<b>Jobticket:</b> Alle Beschäftigten können ein Jobticket für Bus und Bahn bekommen. Die Klinik bezahlt die Hälfte, den Rest "
    "ziehen wir jeden Monat vom Gehalt ab. Den Antrag geben Sie in der Personalabteilung ab – spätestens am 15. des Vormonats.<br/>"
    "<b>Fahrrad:</b> Wer mit dem Fahrrad kommt, kann den Fahrradkeller nutzen. Den Schlüssel bekommen Sie an der Pforte, "
    "Pfand: 10 Euro.<br/>"
    "<b>Kantine:</b> Ein Mittagessen kostet für Mitarbeitende 3,50 Euro, für Besucher 6,90 Euro. Sie bezahlen nur mit Ihrem "
    "Mitarbeiterausweis, nicht bar. Für den Nachtdienst gibt es von 22 bis 23 Uhr Suppe und belegte Brötchen.<br/>"
    "<b>Deutschkurs:</b> Für Kolleginnen und Kollegen aus dem Ausland gibt es zweimal pro Woche den Kurs „Deutsch in der Pflege“ "
    "(dienstags und donnerstags, 14:00–15:30 Uhr). Die Kurszeit gilt als Arbeitszeit. Bitte melden Sie sich bei Ihrer "
    "Stationsleitung an.<br/>"
    "<b>Ferienbetreuung:</b> In den Sommerferien betreuen wir Kinder von Mitarbeitenden (6 bis 12 Jahre). Die Zahl der Plätze ist "
    "begrenzt: Wer sich zuerst anmeldet, bekommt einen Platz. Anmeldung ab 1. März in der Personalabteilung.<br/>"
    "Ihre Personalabteilung"
)
s += text_with_task(2, "Angebote für Mitarbeitende", T2_HINT, 2, info, 3) + [
    Spacer(1, 4)
]
s += [
    abc(
        6,
        "Das Jobticket …",
        [
            "ist für alle Mitarbeitenden kostenlos.",
            "muss man rechtzeitig in der Personalabteilung beantragen.",
            "bekommt man an der Pforte.",
        ],
    ),
    abc(
        7,
        "In der Kantine …",
        [
            "kann man auch bar bezahlen.",
            "gibt es auch nachts etwas zu essen.",
            "kostet das Essen für alle 3,50 Euro.",
        ],
    ),
    abc(
        8,
        "Der Deutschkurs …",
        [
            "findet in der Freizeit statt.",
            "ist nur für Pflegekräfte mit Ausbildung.",
            "zählt als Arbeitszeit.",
        ],
    ),
    abc(
        9,
        "Bei der Ferienbetreuung …",
        [
            "bekommen vielleicht nicht alle Kinder einen Platz.",
            "muss man 10 Euro Pfand bezahlen.",
            "meldet man sich bei der Stationsleitung an.",
        ],
    ),
]

# ───────────────────────── Teil 3 ─────────────────────────
s += [
    tips_traps(
        "Teil 3 · Arbeitsanweisungen verstehen",
        [
            "Lesen Sie die Frage und stellen Sie sich die Situation vor: Was muss ich tun?",
            "Suchen Sie den passenden Punkt in der Anweisung.",
            "Achten Sie auf Pflichten und Verbote: <i>muss, darf nicht, nur, nie, sofort, danach</i>.",
            "Prüfen Sie, <b>wer</b> etwas tut: ich, die Kollegin oder die Objektleitung?",
        ],
        [
            "Eine Option nennt eine Handlung aus dem Text – aber eine andere Person macht sie.",
            "Die Reihenfolge ist falsch (erst informieren, dann spülen?).",
            "Ein Ort wird vertauscht (Putzraum oder Lager?).",
        ],
    ),
]
anw = (
    "<b>Gebäudeservice Klarblick · Arbeitsanweisung Nr. 4: Reinigungsmittel sicher benutzen</b><br/>"
    "1. Benutzen Sie nur Reinigungsmittel aus unserem Lager. Eigene Mittel von zu Hause sind nicht erlaubt.<br/>"
    "2. Mischen Sie nie zwei Reinigungsmittel. Dabei können gefährliche Gase entstehen.<br/>"
    "3. Beim blauen Sanitärreiniger tragen Sie immer Handschuhe <b>und</b> eine Schutzbrille. Für alle anderen Mittel reichen Handschuhe.<br/>"
    "4. Füllen Sie Reinigungsmittel nur in Flaschen mit dem richtigen Etikett um – nie in Getränkeflaschen.<br/>"
    "5. Die Menge steht auf dem Plan an der Tür des Putzraums: Für einen Eimer Wasser (10 Liter) nehmen Sie eine Kappe. Mehr Mittel "
    "macht nicht sauberer, sondern hinterlässt Streifen.<br/>"
    "6. Wenn Reinigungsmittel ins Auge kommt: sofort 10 Minuten mit klarem Wasser spülen, danach Ihre Objektleitung informieren. "
    "Einen Erste-Hilfe-Kasten finden Sie in jedem Putzraum.<br/>"
    "7. Leere Flaschen gehören nicht in den Hausmüll. Sammeln Sie sie in der gelben Kiste im Lager. Die Objektleitung bringt sie "
    "einmal im Monat zum Wertstoffhof."
)
s += text_with_task(
    3,
    "Arbeitsanweisung",
    "Lesen Sie die Anweisung und die Aufgaben 10–13. Welche Antwort (a, b oder c) passt am besten?",
    2,
    anw,
    3,
) + [Spacer(1, 4)]
s += [
    abc(
        10,
        "Was brauchen Sie beim blauen Sanitärreiniger?",
        [
            "nur Handschuhe",
            "Handschuhe und eine Schutzbrille",
            "eine Schutzbrille und eine Maske",
        ],
    ),
    abc(
        11,
        "Wie viel Reinigungsmittel nehmen Sie für einen Eimer?",
        [
            "mehr, wenn es sehr schmutzig ist",
            "eine Kappe",
            "zwei Kappen für zehn Liter",
        ],
    ),
    abc(
        12,
        "Ihnen ist Reinigungsmittel ins Auge gekommen. Was tun Sie?",
        [
            "Zuerst rufe ich die Objektleitung an.",
            "Ich spüle das Auge und sage danach Bescheid.",
            "Ich hole den Erste-Hilfe-Kasten aus dem Lager.",
        ],
    ),
    abc(
        13,
        "Was passiert mit leeren Flaschen?",
        [
            "Ich werfe sie in den Hausmüll.",
            "Ich bringe sie selbst zum Wertstoffhof.",
            "Ich lege sie in eine Kiste im Lager.",
        ],
    ),
]

# ───────────────────────── Teil 4 ─────────────────────────
s += [
    tips_traps(
        "Teil 4 · Aufgaben und Aufgabenverteilung",
        [
            "Lesen Sie die Aussage und markieren Sie: Person – Tag/Uhrzeit – Aufgabe.",
            "Suchen Sie die Stelle in der E-Mail und vergleichen Sie Wort für Wort.",
            "Denken Sie in einer kleinen Tabelle: Wer? – Was? – Wann?",
            "Ein falsches Detail macht die ganze Aussage falsch.",
        ],
        [
            "Personen oder Aufgaben werden vertauscht.",
            "Fristen: „bis zum 10.“ und „danach nicht mehr“.",
            "„Wie immer“ und „neu“ werden verwechselt.",
        ],
    ),
]
mail = (
    "<b>Von:</b> Ingrid Hofmann (Teamleitung Lager) · <b>An:</b> Team Wareneingang · <b>Betreff:</b> Inventur am 28. und 29. Dezember<br/>"
    "Hallo zusammen,<br/>wie jedes Jahr machen wir Ende Dezember Inventur. Hier die wichtigsten Informationen:<br/>"
    "• Die Inventur ist am Montag, 28., und Dienstag, 29. Dezember. An beiden Tagen arbeiten alle in der Frühschicht. Sie beginnt "
    "schon um 6 Uhr statt um 7 Uhr. Die Spätschicht fällt aus.<br/>"
    "• Wir arbeiten in Zweier-Teams: Eine Person zählt, die andere tippt die Zahlen in den Scanner. Die Teams hängen ab Freitag am "
    "Schwarzen Brett.<br/>"
    "• Herr Nowak und Frau Adeyemi übernehmen Halle 3 mit der Kühlware. Warme Jacken für die Kühlhalle liegen bei Herrn Nowak bereit.<br/>"
    "• An den zwei Tagen liefern wir nichts aus. Wenn Kunden anrufen, sagt bitte, dass wir ab Mittwoch wieder liefern.<br/>"
    "• Wer an diesen Tagen Urlaub möchte, spricht bitte bis zum 10. Dezember mit mir. Danach kann ich keinen Urlaub mehr genehmigen.<br/>"
    "• Als Dankeschön bestelle ich am Dienstag Pizza für alle.<br/>"
    "Viele Grüße<br/>Ingrid"
)
s += text_with_task(
    4,
    "E-Mail der Teamleitung",
    "Lesen Sie die E-Mail und die Aussagen 14–18. Sind die Aussagen richtig oder falsch?",
    3,
    mail,
    3,
) + [Spacer(1, 4)]
s += [
    rf(14, "An den Inventurtagen fängt die Arbeit eine Stunde früher an als sonst."),
    rf(
        15, "Bei der Inventur zählt jede Person allein und tippt die Zahlen selbst ein."
    ),
    rf(16, "Für die Arbeit in Halle 3 muss man eine eigene warme Jacke mitbringen."),
    rf(17, "Am 28. und 29. Dezember bekommen die Kunden keine Lieferungen."),
    rf(18, "Urlaub für die Inventurtage kann man noch bis Ende Dezember beantragen."),
]

# ───────────────────────── Lösungen ─────────────────────────
s += [
    PageBreak(),
    R("Lösungen mit Begründung", "h2"),
    R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
]
s += [R("Übung 1 · Teil 1", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>1 b</b> – Vollzeit, Montag bis Freitag, „Samstag und Sonntag immer frei“. <i>Falle a:</i> Koch in Vollzeit, aber Arbeit am Wochenende.",
        "<b>2 d</b> – Teilzeit, vormittags (8–12 Uhr), Buchhaltung, Erfahrung aus dem Ausland willkommen. <i>Falle c:</i> Büro in Teilzeit, aber nachmittags.",
        "<b>3 f</b> – Minijob nur am Wochenende, Führerschein B reicht. <i>Falle e:</i> Fahrer, aber Vollzeit und Klasse C.",
        "<b>4 x</b> – Keine Anzeige passt. <i>Falle g:</i> Kita in Vollzeit, aber nur mit anerkannter Ausbildung – Anas Abschluss ist noch nicht anerkannt.",
        "<b>5 h</b> – Elektriker, anerkannter Abschluss, Montage auf Baustellen in ganz NRW.",
        "Übrig bleiben <b>a, c, e, g</b>.",
    ]
]
s += [R("Übung 2 · Teil 2", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>6 b</b> – „Den Antrag geben Sie in der Personalabteilung ab – spätestens am 15. des Vormonats.“ "
        "a) Die Klinik zahlt nur die Hälfte. c) An der Pforte gibt es den Schlüssel für den Fahrradkeller.",
        "<b>7 b</b> – „Für den Nachtdienst gibt es von 22 bis 23 Uhr Suppe und belegte Brötchen.“ "
        "a) „nicht bar“. c) 3,50 Euro nur für Mitarbeitende, Besucher zahlen 6,90 Euro.",
        "<b>8 c</b> – „Die Kurszeit gilt als Arbeitszeit.“ b) Der Kurs ist für Kolleginnen und Kollegen aus dem Ausland – von einer Ausbildung steht nichts im Text.",
        "<b>9 a</b> – „Die Zahl der Plätze ist begrenzt.“ b) Das Pfand gehört zum Fahrradkeller. c) Anmeldung in der Personalabteilung.",
    ]
]
s += [R("Übung 3 · Teil 3", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>10 b</b> – Punkt 3: „Handschuhe und eine Schutzbrille“. Nur Handschuhe gelten für die anderen Mittel (a).",
        "<b>11 b</b> – Punkt 5: „Für einen Eimer Wasser (10 Liter) nehmen Sie eine Kappe.“ Mehr Mittel hinterlässt Streifen (a).",
        "<b>12 b</b> – Punkt 6: erst 10 Minuten spülen, <b>danach</b> informieren. c) Der Erste-Hilfe-Kasten ist im Putzraum, nicht im Lager.",
        "<b>13 c</b> – Punkt 7: gelbe Kiste im Lager. Zum Wertstoffhof bringt sie die Objektleitung (b).",
    ]
]
s += [R("Übung 4 · Teil 4", "solh")] + [
    R(t, "sol")
    for t in [
        "<b>14 richtig</b> – „Sie beginnt schon um 6 Uhr statt um 7 Uhr.“",
        "<b>15 falsch</b> – Zweier-Teams: Eine Person zählt, die andere tippt.",
        "<b>16 falsch</b> – „Warme Jacken … liegen bei Herrn Nowak bereit.“",
        "<b>17 richtig</b> – „An den zwei Tagen liefern wir nichts aus.“",
        "<b>18 falsch</b> – Urlaub nur bis zum 10. Dezember, danach nicht mehr.",
    ]
]
s += [
    Spacer(1, 6),
    box(
        R(
            "<b>Ihre Bilanz:</b> 18 Aufgaben × 3 Punkte = 54 Punkte. Welcher Teil war am schwersten? "
            "Üben Sie genau diesen Teil noch einmal – in der Online-Simulation DTB B1 auf deutsch-mit-dennis.de.",
            "cell",
        ),
        SOFT,
    ),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
