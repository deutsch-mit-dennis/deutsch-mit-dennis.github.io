# Arbeitsblatt B2 Prüfung: telc Deutsch B2 – Hörverstehen Teil 1–3 (ohne Audio, Texte zum Vorlesen)
# Eigene Übungsaufgaben im Stil der Prüfung, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/telc-b2-hoerverstehen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "telc-b2-hoerverstehen"
TITLE = "telc B2 Hörverstehen: Meinungen, Interview, Durchsagen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "B2"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
BOX = sym("☐")
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10.2, leading=14)
st["spk"] = ParagraphStyle("spk", parent=st["cell"], fontSize=10, leading=13.1, leftIndent=12, firstLineIndent=-12, spaceAfter=2)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.4, spaceAfter=1)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)


def rf_table(items, start=1):
    rows = [[R("<b>Nr.</b>", "cell"), R("<b>Aussage</b>", "cell"), R("<b>richtig</b>", "cell"), R("<b>falsch</b>", "cell")]]
    rows += [[R(f"<b>{i}</b>", "cell"), R(t, "cell"), R(BOX, "cell"), R(BOX, "cell")] for i, t in enumerate(items, start)]
    t = Table(rows, colWidths=[11 * mm, 131 * mm, 16 * mm, 16 * mm], repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ALIGN", (2, 0), (-1, -1), "CENTER"),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


s = [
    R("B2 · Prüfung · Arbeitsblatt · telc Deutsch B2", "kick"),
    R("telc B2: Hörverstehen", "h1"),
    R(
        "Meinungen verstehen, einem Radiointerview folgen, Durchsagen und Ansagen richtig deuten – so trainieren Sie die drei "
        "Teile des Hörverstehens. Alle Texte sind eigene Übungstexte im Stil der Prüfung.",
        "lead",
    ),
]

# ── So läuft der Teil ──
s += [
    R("So läuft der Teil", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Aufgabe</b>", "<b>Zeit</b>", "<b>Punkte</b>"],
            ["<b>Hören 1</b>", "Prüfung: eine Nachrichtensendung mit 5 Meldungen, vorher 30 Sekunden Lesezeit. Zu jeder Meldung: richtig oder falsch? "
             "(Übung 1 auf diesem Blatt: kurze Meinungen.)",
             "ca. 5 Min.", fallback("5 × 5 = 25")],
            ["<b>Hören 2</b>", "Ein längeres Radiointerview, vorher 60 Sekunden Lesezeit. Bei 10 Aussagen entscheiden: richtig oder falsch?",
             "ca. 10 Min.", fallback("10 × 2,5 = 25")],
            ["<b>Hören 3</b>", "Kurze Durchsagen, Telefonansagen oder Hinweise im Radio. Zu jedem Text: richtig oder falsch?",
             "ca. 5 Min.", fallback("5 × 5 = 25")],
        ],
        [22, 104, 22, 26],
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Wichtig:</b> Das Hörverstehen dauert insgesamt ca. <b>20 Minuten</b>, es gibt 75 Punkte. In dieser Übung "
            "hören Sie jeden Text <b>nur einmal</b> – wie in der Prüfung laut offiziellem Modelltest (telc, 2019). Lesen Sie vor jedem Teil "
            "zuerst die Aussagen.",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 4),
    box(
        R(
            "<b>Ohne Audio üben – so geht's:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest die Hörtexte "
            "(ab Seite 3, „Texte zum Vorlesen“) in normalem Tempo vor. Wer übt, schaut <b>nicht</b> in die Texte. "
            "Erst nach allen drei Teilen die Lösungen vergleichen.",
            "cell",
        ),
        HELLGRUEN,
        GRUEN,
    ),
]

# ── Strategien ──
s += [
    R("Vier Strategie-Tipps", "h2"),
    R("<b>1. Lesezeit nutzen.</b> Markieren Sie in jeder Aussage das wichtigste Wort. Fragen Sie sich: Worauf muss ich achten – Meinung, Ort, Zeit, Grund?", "item"),
    R("<b>2. Auf die Haltung hören (Teil 1).</b> Ist die Person dafür, dagegen oder unentschieden? Der letzte Satz enthält oft ihr Fazit.", "item"),
    R("<b>3. Dem Ablauf folgen (Teil 2).</b> Die Aussagen folgen dem Interview. Die Fragen der Moderation kündigen das nächste Thema an.", "item"),
    R("<b>4. Sofort entscheiden.</b> Kreuzen Sie direkt nach jedem Text an, auch wenn Sie unsicher sind – es gibt keine Wiederholung. "
      "Achten Sie auf Signalwörter: <i>heute, ausnahmsweise, ab morgen, stattdessen, nicht … sondern</i>.", "item"),
    R("Typische Fallen", "h2"),
    table(
        [
            ["<b>Teil</b>", "<b>Achtung!</b>"],
            ["Hören 1", "„aber“, „trotzdem“, „eigentlich“ drehen die Aussage. · Die Person nennt zuerst ein Gegenargument, dann ihre "
                        "eigentliche Meinung. · Absolute Wörter (immer, gar nicht mehr) sind oft falsch."],
            ["Hören 2", "Die Moderation sagt etwas, der Gast widerspricht. · Zahlen und Vergleiche genau prüfen. · Pläne für die "
                        "Zukunft sind keine heutigen Tatsachen."],
            ["Hören 3", "Mehrere Orte, Zeiten oder Gründe – nur einer passt. · Normalfall und Ausnahme werden beide genannt. · "
                        "Eine Handlung wird ausdrücklich ausgeschlossen („Sie müssen nichts tun“)."],
        ],
        [22, 152],
    ),
]

# ── Aufgaben ──
t1 = [
    "Die Frau möchte wieder fünf Tage pro Woche arbeiten.",
    "Der Mann bietet in seinem Betrieb zurzeit keine Vier-Tage-Woche an.",
    "Die Frau hat in der Vier-Tage-Woche genauso viel verdient wie vorher.",
    "Das Team des Mannes schafft heute in vier Tagen so viel wie früher in fünf.",
    "Laut der Frau sind die Beschäftigten seit der Vier-Tage-Woche seltener krank.",
]
t2 = [
    "Frau Kowalenko hat in der Ukraine im Brückenbau gearbeitet.",
    "Im ersten Jahr in Deutschland hat sie als Bäckerin gearbeitet.",
    "Die Arbeit in der Bäckerei hat ihr beim Deutschlernen geholfen.",
    "Sie wollte von Anfang an unbedingt ein Praktikum machen.",
    "Nach dem Praktikum hat sie eine Stelle im selben Büro bekommen.",
    "Für ihre Arbeit muss sie vor allem gut rechnen – die Sprache ist weniger wichtig.",
    "Am schwierigsten waren für sie die Fachwörter.",
    "Ein Kollege kontrolliert bis heute ihre E-Mails.",
    "Sie leitet heute schon große Bauprojekte.",
    "Sie braucht einen Führerschein, um besser zu den Baustellen zu kommen.",
]
t3 = [
    "Text 1: Der Intercity nach Leipzig fährt heute von Gleis 4 ab.",
    "Text 2: Wer am Mittwoch einen Termin hat, muss einen neuen Termin vereinbaren.",
    "Text 3: Die Polizei empfiehlt, die A1 zu verlassen.",
    "Text 4: Heute kann man Waren an der Information im ersten Stock umtauschen.",
    "Text 5: Für den Besuch der Jobmesse muss man sich vorher anmelden.",
]
s += [PageBreak()]
s += task(1, "Hören Teil 1: Meinungen", "Sie hören fünf kurze Äußerungen zum Thema „Die Vier-Tage-Woche“. Sie hören jede Äußerung "
          "nur einmal. Entscheiden Sie bei jeder Aussage, ob sie richtig oder falsch ist. Lesen Sie zuerst die Aussagen.", 1)
s += [rf_table(t1), Spacer(1, 4)]
s += task(2, "Hören Teil 2: Interview", "Sie hören ein Interview aus der Radiosendung „Neue Wege“. Sie hören das Interview einmal. "
          "Entscheiden Sie bei den Aussagen 1–10, ob sie richtig oder falsch sind. Lesen Sie jetzt die Aussagen.", 3)
s += [rf_table(t2), Spacer(1, 4)]
s += [KeepTogether(task(3, "Hören Teil 3: Durchsagen", "Sie hören fünf kurze Texte: Durchsagen, eine Telefonansage und Hinweise im "
                       "Radio. Sie hören jeden Text einmal. Entscheiden Sie bei jeder Aussage, ob sie richtig oder falsch ist.", 2)
                   + [rf_table(t3)])]

# ── Texte zum Vorlesen ──
def say(who, text):
    return R(f"<b>{who}:</b>  {text}", "spk")


s += [PageBreak(), R("Texte zum Vorlesen (Partner/Lehrkraft)", "h2"),
      R("Normal und deutlich lesen, nicht zu langsam. Jeden Text nur einmal lesen. Zwischen den Beiträgen kurz Pause machen "
        "(ca. 10 Sekunden), damit die Lernenden ankreuzen können.", "small")]

s += [R("Hören Teil 1 – Thema: Die Vier-Tage-Woche", "h3")]
h1 = [
    ("Beitrag 1 (Frau)", "Ich arbeite seit einem halben Jahr nur noch vier Tage, dafür aber länger – zehn Stunden am Tag. Am Anfang war "
     "ich abends total kaputt, ehrlich. Inzwischen hab ich mich daran gewöhnt, und der freie Freitag ist mir das wert. Zurück zur "
     "Fünf-Tage-Woche? Auf keinen Fall."),
    ("Beitrag 2 (Mann)", "Viele junge Leute fragen im Bewerbungsgespräch als Erstes nach der Vier-Tage-Woche. Ich versteh das ja. Aber "
     "bei uns geht das einfach nicht: Die Kunden wollen, dass wir von Montag bis Freitag erreichbar sind. Vielleicht probieren wir es "
     "später mal mit wechselnden Teams, aber im Moment sehe ich da keine Chance."),
    ("Beitrag 3 (Frau)", "Klingt toll, oder? Aber bei mir hieß Vier-Tage-Woche: weniger Stunden und damit auch weniger Gehalt. Das konnte "
     "ich mir mit zwei Kindern einfach nicht leisten. Ich hab's drei Monate gemacht und bin dann zurück zur alten Regelung."),
    ("Beitrag 4 (Mann)", "Ich war skeptisch, ehrlich gesagt. Ich dachte, in vier Tagen schaffen wir nie dasselbe. Aber wir haben einfach "
     "viele unnötige Besprechungen gestrichen – und jetzt sind wir genauso schnell fertig wie früher. Manchmal sogar schneller."),
    ("Beitrag 5 (Frau)", "Für unser Unternehmen ist das vor allem ein Argument bei der Suche nach Fachkräften. Seit wir die "
     "Vier-Tage-Woche anbieten, bekommen wir deutlich mehr Bewerbungen. Ob die Leute dadurch auch gesünder sind und seltener krank "
     "werden, können wir aber noch nicht sagen – dafür ist es einfach zu früh."),
]
s += [say(a, b) for a, b in h1]

s += [R("Hören Teil 2 – Interview: „Vom Brückenbau ins Planungsbüro“", "h3"),
      R("Zwei Stimmen: <b>M</b> = Moderatorin, <b>K</b> = Olena Kowalenko", "small")]
h2 = [
    ("M", "Willkommen bei „Neue Wege“, unserer Sendung über Menschen, die beruflich neu anfangen. Heute bei mir im Studio: Olena "
     "Kowalenko. Sie arbeitet als Bauingenieurin in einem Planungsbüro in Bochum. Frau Kowalenko, Sie sind vor vier Jahren nach "
     "Deutschland gekommen. Konnten Sie sofort in Ihrem Beruf arbeiten?"),
    ("K", "Nein, überhaupt nicht. In Charkiw hatte ich zwölf Jahre Erfahrung im Brückenbau. Aber hier musste ich zuerst Deutsch "
     "lernen. Im ersten Jahr habe ich vormittags den Sprachkurs besucht und nachmittags in einer Bäckerei gearbeitet – im Verkauf."),
    ("M", "Das stelle ich mir anstrengend vor."),
    ("K", "Ja, schon. Aber die Arbeit in der Bäckerei war gut für mein Deutsch. Die Kundinnen haben mit mir geredet, ganz schnell und "
     "manchmal mit Dialekt. Im Kurs hat man ja immer schön langsam gesprochen."),
    ("M", "Wie haben Sie dann Ihre Stelle im Planungsbüro gefunden?"),
    ("K", "Über ein Praktikum. Eine Beraterin hat mir geraten, mich nicht gleich auf feste Stellen zu bewerben, sondern erst einmal "
     "ein Praktikum zu machen. Ich war ehrlich gesagt nicht begeistert – ich hatte ja schon so viel Erfahrung. Aber nach drei "
     "Monaten hat mir der Chef einen Vertrag angeboten."),
    ("M", "Viele denken ja, dass Ingenieure vor allem rechnen und zeichnen. Ist die Sprache da überhaupt so wichtig?"),
    ("K", "Oh ja, sehr! Das ist ein Missverständnis. Ich verbringe mindestens die Hälfte meiner Zeit mit Besprechungen, Telefonaten "
     "und E-Mails – mit Bauherren, mit Behörden, mit den Firmen auf der Baustelle. Die Fachwörter waren gar nicht das Problem, die "
     "lernt man schnell. Schwieriger war es, höflich und trotzdem klar zu sein – zum Beispiel, wenn eine Firma zu spät liefert."),
    ("M", "Und wie reagieren die Kollegen auf Sie?"),
    ("K", "Sehr offen. Am Anfang hat mein Kollege, Herr Brandt, alle meine E-Mails gelesen, bevor ich sie abgeschickt habe. Das mache "
     "ich heute natürlich allein. Und inzwischen fragt er mich manchmal um Rat, wenn es um Stahlkonstruktionen geht – das ist mein "
     "Spezialgebiet."),
    ("M", "Und wie geht es weiter? Haben Sie Pläne?"),
    ("K", "Ja. Ab Herbst möchte ich berufsbegleitend einen Kurs in Projektleitung machen. Mein Ziel ist es, in ein paar Jahren größere "
     "Projekte selbst zu leiten. Aber erst mal muss ich die Prüfung für meinen Führerschein schaffen – ohne Auto kommt man schlecht "
     "auf die Baustellen."),
    ("M", "Frau Kowalenko, vielen Dank für das Gespräch und weiterhin viel Erfolg!"),
]
s += [say(a, b) for a, b in h2]

s += [R("Hören Teil 3 – Durchsagen, Ansagen, Radiohinweise", "h3")]
h3 = [
    ("Text 1 (Bahnhof)", "Achtung an Gleis 7: Der Intercity 2045 nach Leipzig, planmäßige Abfahrt 14:38 Uhr, hat heute etwa 20 Minuten "
     "Verspätung. Grund ist eine Reparatur am Zug. Fahrgäste mit Anschluss nach Halle nehmen bitte den Regionalexpress um 14:52 Uhr "
     "von Gleis 4. Wir bitten um Entschuldigung."),
    ("Text 2 (Telefonansage)", "Guten Tag, Sie sind verbunden mit dem Bürgerbüro der Stadt Lindenau. Wegen einer Betriebsversammlung "
     "ist das Bürgerbüro am Mittwoch, dem 12. März, geschlossen. Bereits vereinbarte Termine an diesem Tag werden auf den folgenden "
     "Donnerstag verschoben – zur gleichen Uhrzeit. Sie müssen nichts weiter tun. Ab Donnerstag, 8 Uhr, sind wir wieder für Sie da."),
    ("Text 3 (Verkehrsfunk)", "Und jetzt der Verkehr: Auf der A1 Richtung Norden staut sich der Verkehr nach einem Unfall zwischen dem "
     "Kreuz Mitte und der Ausfahrt Hafen auf acht Kilometern. Die Polizei rät, die A1 an der Ausfahrt Hafen zu verlassen. Die "
     "Baustelle auf der B 51 ist seit heute Morgen beendet, dort läuft der Verkehr wieder normal."),
    ("Text 4 (Kaufhaus)", "Liebe Kundinnen und Kunden, unser Kundenservice im Erdgeschoss ist heute wegen Umbauarbeiten geschlossen. "
     "Rückgaben und Umtausch sind ausnahmsweise an der Information im ersten Stock möglich. Bitte bringen Sie Ihren Kassenbon mit. "
     "Unser Restaurant im zweiten Stock hat wie gewohnt bis 20 Uhr geöffnet."),
    ("Text 5 (Radio)", "Ein Hinweis für alle, die eine Ausbildung oder einen neuen Job suchen: Die Jobmesse „Zukunft Beruf“ in der "
     "Stadthalle findet in diesem Jahr nicht am Samstag, sondern schon am Freitag statt, von 10 bis 17 Uhr. Der Eintritt ist frei. "
     "Bringen Sie am besten gleich Ihren Lebenslauf mit – viele Firmen führen direkt vor Ort erste Gespräche. Eine Anmeldung ist "
     "nicht nötig."),
]
s += [say(a, b) for a, b in h3]

# ── Lösungen ──
s += [Spacer(1, 4), R("Lösungen", "h2"), R("Erst nach dem Hören nachschauen! Die Begründung zeigt die entscheidende Stelle im Hörtext. "
        "Punkte: Teil 1 und 3 je 5, Teil 2 je 2,5 – maximal 75.", "small")]
l1 = [
    ("1 – falsch", "„Zurück zur Fünf-Tage-Woche? Auf keinen Fall.“ Am Anfang war sie müde – inzwischen hat sie sich gewöhnt."),
    ("2 – richtig", "„Bei uns geht das einfach nicht … im Moment sehe ich da keine Chance.“"),
    ("3 – falsch", "„weniger Stunden und damit auch weniger Gehalt“."),
    ("4 – richtig", "„jetzt sind wir genauso schnell fertig wie früher. Manchmal sogar schneller.“"),
    ("5 – falsch", "Mehr Bewerbungen ja – aber ob die Leute seltener krank werden, „können wir noch nicht sagen“."),
]
s += [R("Übung 1 · Hören Teil 1", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l1]
l2 = [
    ("1 – richtig", "„zwölf Jahre Erfahrung im Brückenbau“."),
    ("2 – falsch", "Sie hat in einer Bäckerei gearbeitet, aber „im Verkauf“ – nicht als Bäckerin."),
    ("3 – richtig", "„die Arbeit in der Bäckerei war gut für mein Deutsch“."),
    ("4 – falsch", "Eine Beraterin hat es ihr geraten; sie „war ehrlich gesagt nicht begeistert“."),
    ("5 – richtig", "„nach drei Monaten hat mir der Chef einen Vertrag angeboten“."),
    ("6 – falsch", "Das sagt die Moderatorin („Viele denken …“). Frau Kowalenko: „Das ist ein Missverständnis.“"),
    ("7 – falsch", "„Die Fachwörter waren gar nicht das Problem.“ Schwieriger: höflich und trotzdem klar sein."),
    ("8 – falsch", "Am Anfang ja – „Das mache ich heute natürlich allein.“"),
    ("9 – falsch", "Das ist ihr Ziel für die Zukunft: „in ein paar Jahren größere Projekte selbst zu leiten“."),
    ("10 – richtig", "„ohne Auto kommt man schlecht auf die Baustellen“."),
]
s += [R("Übung 2 · Hören Teil 2", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l2]
l3 = [
    ("1 – falsch", "Der Intercity fährt von Gleis 7 (mit Verspätung). Gleis 4 gilt für den Regionalexpress nach Halle."),
    ("2 – falsch", "Die Termine werden automatisch auf Donnerstag verschoben: „Sie müssen nichts weiter tun.“"),
    ("3 – richtig", "„Die Polizei rät, die A1 an der Ausfahrt Hafen zu verlassen.“"),
    ("4 – richtig", "„Rückgaben und Umtausch sind ausnahmsweise an der Information im ersten Stock möglich.“"),
    ("5 – falsch", "„Eine Anmeldung ist nicht nötig.“"),
]
s += [R("Übung 3 · Hören Teil 3", "solh")] + [R(f"<b>{a}</b>  {b}", "sol") for a, b in l3]


if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
