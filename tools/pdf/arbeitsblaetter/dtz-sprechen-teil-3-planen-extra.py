# Arbeitsblatt DTZ Sprechen Teil 3: 8 neue Planungsaufgaben mit Musterdialog (A2–B1)
# Format laut sim/dtz.js (Sprechen Teil 3) und pruefung-fakten.js (dtz).
# Ergänzt „DTZ Gemeinsam etwas planen“ und „DTZ Sprechen Teil 3: Wortschatz zum Planen“ – dort schon vorhandene
# Situationen (kranke Nachbarin, Unfall im Kurs, Fahrräder kaufen, Schwimmen, Abschiedsfeier, Krankenhausbesuch,
# Picknick im Park, Umzug) und die Simulation (Abschied Kursleiterin) werden hier bewusst nicht wiederholt.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-sprechen-teil-3-planen-extra.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtz-sprechen-teil-3-planen-extra"
TITLE = "DTZ Sprechen Teil 3: 8 neue Planungsaufgaben mit Musterdialog"
LEVEL = "A2–B1"
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Redemittel
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'

s = [
    R("DTZ · Sprechen Teil 3 · Arbeitsblatt", "kick"),
    R("Gemeinsam etwas planen: 8 neue Aufgaben", "h1"),
    R(
        "Hoffest, Ausflug, Lerngruppe, Flohmarkt: acht neue Situationen aus dem Alltag – jeweils mit Stichpunkten "
        "und passenden Sätzen. Drei Aufgaben haben einen kompletten Musterdialog.",
        "lead",
    ),
]

# ── Ablauf ──
s += [
    R("So läuft Teil 3 in der Prüfung", "h2"),
    table(
        [
            ["<b>Prüfung Sprechen</b>", "ca. 16 Minuten, zu zweit, 2 Prüfende, keine Vorbereitungszeit · 3 Teile"],
            ["<b>Teil 3</b>", "Gemeinsam etwas planen · ca. 6 Minuten"],
            ["<b>Aufgabe</b>",
             "„Sie planen zusammen mit Ihrem Partner / Ihrer Partnerin etwas. Machen Sie Vorschläge, reagieren Sie auf "
             "die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich am Ende.“"],
            ["<b>Aufgabenkarte</b>", "Eine Situation und meist fünf Stichpunkte (z. B. Wann? Wo? Wer macht was?)"],
        ],
        [34, 140],
        head=False,
    ),
    R("Stand: November 2026 · Quelle: Prüfungsanbieter g.a.s.t. (Übersicht auf deutsch-mit-dennis.de) und unsere "
      "DTZ-Simulation. Die Situationen auf diesem Blatt sind eigene Übungsaufgaben, keine Original-Prüfungsaufgaben.", "small"),
    Spacer(1, 4),
    box(
        R(
            "<b>Der rote Faden – so kommen Sie sicher durch die 6 Minuten:</b><br/>"
            f"<b>1.</b> Situation kurz nennen ({K('Wir wollen … planen. Womit fangen wir an?')})  "
            f"<b>2.</b> Stichpunkt für Stichpunkt besprechen  "
            f"<b>3.</b> Auf jeden Vorschlag reagieren – zustimmen oder <b>mit Grund</b> ablehnen und etwas anderes vorschlagen  "
            f"<b>4.</b> Aufgaben verteilen ({K('Wer macht was?')})  "
            f"<b>5.</b> Am Ende zusammenfassen ({K('Also, dann machen wir es so: …')})",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    Spacer(1, 4),
    R("Diese Redemittel ergänzen die Blätter „DTZ Gemeinsam etwas planen“ und „DTZ Sprechen Teil 3: Wortschatz zum Planen“:", "small"),
    table(
        [
            ["<b>Was Sie tun</b>", "<b>Neue Redemittel</b>"],
            ["<b>Bedenken äußern</b>",
             f"{K('Ich habe da ein kleines Problem:')} … · {K('Das klappt bei mir leider nicht, weil')} … · {K('Ich weiß nicht, ob das nicht zu teuer wird.')}"],
            ["<b>Kompromiss finden</b>",
             f"{K('Dann machen wir doch beides:')} … · {K('Wie wäre es mit einem Kompromiss:')} … · {K('Okay, dann probieren wir es so.')}"],
            ["<b>Aufgaben verteilen</b>",
             f"{K('Ich kümmere mich um')} …, {K('und du übernimmst')} … · {K('Kannst du')} … {K('übernehmen?')} · {K('Das kann ich machen.')}"],
            ["<b>nachfragen</b>",
             f"{K('Was meinst du mit')} …? · {K('Passt dir das zeitlich?')} · {K('Hast du dafür Zeit?')}"],
            ["<b>zusammenfassen</b>",
             f"{K('Lass uns kurz zusammenfassen:')} … · {K('Haben wir noch etwas vergessen?')} · {K('Dann ist alles klar.')}"],
        ],
        [38, 136],
    ),
]

# ── Aufgaben ──
FUNK = ["vorschlagen", "zustimmen", "ablehnen + Alternative", "sich einigen"]


def aufgabe(nr, titel, situation, punkte, saetze):
    kopf = R(f"Aufgabe {nr} · {titel}", "h2")
    karte = box(
        R(f"{situation}<br/><br/><b>Planen Sie gemeinsam:</b><br/>" + "<br/>".join(f"– {p}" for p in punkte), "cell"),
        SOFT,
        None,
    )
    rm = table([[f"<b>{f}</b>", t] for f, t in zip(FUNK, saetze)], [40, 134], head=False)
    return [KeepTogether([kopf, karte, Spacer(1, 3), R("So können Sie es sagen:", "small"), rm])]


def dialog(zeilen, titel="Musterdialog (B1)"):
    html = "<br/>".join(f"<b>{w}:</b> {t}" for w, t in zeilen)
    return [Spacer(1, 4), R(titel, "h3"), box(R(html, "cell"), HELLGRUEN, GRUEN)]


A = []
# 1 – Hoffest
A += aufgabe(
    1, "Ein Hoffest für alle Nachbarn",
    "In Ihrem Haus wohnen viele Familien, aber man kennt sich kaum. Sie möchten zusammen mit Ihrem Nachbarn / "
    "Ihrer Nachbarin ein kleines Fest im Hof organisieren.",
    ["Wann? (Tag, Uhrzeit)", "Erlaubnis von der Hausverwaltung?", "Essen und Getränke?",
     "Wie informieren Sie die Nachbarn?", "Programm für Kinder? Musik?"],
    [f"{K('Wir könnten doch')} einen Zettel im Treppenhaus aufhängen.",
     f"{K('Gute Idee, dann')} sehen ihn alle, auch die älteren Leute ohne Handy.",
     f"Musik bis Mitternacht? {K('Das finde ich schwierig, weil')} einige Familien kleine Babys haben. "
     f"{K('Lieber')} bis 20 Uhr.",
     f"{K('Also:')} Samstag, 15 bis 20 Uhr im Hof, und jeder bringt etwas zu essen mit."],
)
A += dialog([
    ("A", "Du, ich habe eine Idee: Wir kennen unsere Nachbarn fast gar nicht. Wollen wir nicht ein kleines Hoffest machen?"),
    ("B", "Das ist eine schöne Idee! Wann passt es denn am besten?"),
    ("A", f"{K('Ich schlage vor,')} wir machen es an einem Samstag im Juni, am Nachmittag. Dann arbeiten die meisten nicht."),
    ("B", f"{K('Einverstanden.')} Sagen wir ab 15 Uhr? Aber dürfen wir den Hof überhaupt benutzen?"),
    ("A", f"{K('Das weiß ich nicht genau.')} Wir sollten vorher die Hausverwaltung fragen. Kannst du dort anrufen?"),
    ("B", f"{K('Ja, das kann ich machen.')} Ich rufe morgen an. Und was ist mit dem Essen? Kaufen wir alles?"),
    ("A", f"{K('Ich weiß nicht, ob das nicht zu teuer wird.')} {K('Wie wäre es, wenn')} jede Familie etwas mitbringt – Salat, Kuchen oder etwas aus ihrer Küche?"),
    ("B", f"Super, so wird es bunt. Getränke kaufen wir zusammen, und alle geben zwei Euro dazu."),
    ("A", f"{K('Gut.')} Und wie sagen wir es den Nachbarn? Ich könnte einen Zettel schreiben und ihn im Treppenhaus aufhängen."),
    ("B", f"{K('Ja, und zusätzlich')} werfe ich eine Einladung in jeden Briefkasten. Sollen wir auch Musik machen?"),
    ("A", f"Ja, aber nicht zu laut und nur bis 20 Uhr. {K('Ich habe da ein kleines Problem:')} Familie Okoye im zweiten Stock hat ein Baby."),
    ("B", f"Stimmt, daran habe ich nicht gedacht. Für die Kinder könnten wir Straßenkreide und einen Ball besorgen."),
    ("A", f"{K('Lass uns kurz zusammenfassen:')} Samstag im Juni, 15 bis 20 Uhr im Hof. Du fragst die Hausverwaltung und verteilst die Einladungen, "
          "ich schreibe den Aushang und kaufe mit dir die Getränke."),
    ("B", f"{K('Genau. Dann ist alles klar!')}"),
])

# 2 – Ausflug mit Kindern
A += aufgabe(
    2, "Ein Ausflug mit den Kindern",
    "In den Herbstferien möchten Sie mit Ihrem Partner / Ihrer Partnerin und den Kindern aus beiden Familien "
    "einen Tagesausflug machen.",
    ["Wohin? (Zoo, Wildpark, Museum, Schwimmbad …)", "Wie kommen Sie dorthin?", "Essen mitnehmen oder kaufen?",
     "Wie viel darf es kosten?", "Und wenn es regnet?"],
    [f"{K('Was hältst du von')} dem Wildpark? Dort können die Kinder die Tiere füttern.",
     f"{K('Das finde ich super.')} Und der Eintritt ist nicht so teuer.",
     f"Mit dem Auto? {K('Das geht leider nicht, weil')} wir zu viele Kinder sind. {K('Wie wäre es mit')} dem Zug?",
     f"{K('Dann machen wir es so:')} Dienstag mit dem Zug in den Wildpark, Essen bringen wir mit."],
)
A += dialog([
    ("A", "Die Herbstferien fangen bald an. Wollen wir mit den Kindern einen Ausflug machen? Wohin könnten wir fahren?"),
    ("B", f"{K('Was hältst du vom')} Zoo? Meine Tochter liebt Giraffen."),
    ("A", f"Der Zoo ist schön, {K('aber')} für zwei Familien ist der Eintritt ziemlich teuer. {K('Wie wäre es mit')} dem Wildpark? "
          "Da kostet es weniger, und die Kinder dürfen die Tiere füttern."),
    ("B", f"{K('Gute Idee!')} Mein Sohn mag Tiere auch sehr. Wie kommen wir dorthin? Wir haben nur ein kleines Auto."),
    ("A", f"{K('Das ist ein Problem')}, wir sind ja vier Erwachsene und fünf Kinder. {K('Ich schlage vor,')} wir fahren mit dem Zug und dem Bus. "
          "Mit einem Gruppenticket ist das vielleicht gar nicht so teuer."),
    ("B", f"{K('Einverstanden.')} Ich schaue heute Abend die Verbindung nach. Und das Essen? Im Park gibt es bestimmt ein Restaurant."),
    ("A", f"Restaurants sind teuer. {K('Lieber')} nehmen wir Brote, Obst und Wasser mit. Dann machen wir ein Picknick."),
    ("B", f"{K('Okay, aber')} ein Eis kaufen wir den Kindern dort. Das gehört zu einem Ausflug dazu!"),
    ("A", f"{K('Ja, natürlich.')} Und was machen wir, wenn es regnet?"),
    ("B", f"{K('Dann')} gehen wir ins Naturkundemuseum. Da ist es trocken, und die Kinder können die Dinosaurier sehen."),
    ("A", f"{K('Gute Lösung.')} {K('Lass uns kurz zusammenfassen:')} Wir fahren am Dienstag mit Zug und Bus in den Wildpark. Du suchst die Verbindung, "
          "ich mache die Brote. Bei Regen gehen wir ins Museum."),
    ("B", f"{K('Prima, so machen wir es!')}"),
])

# 3 – Lerngruppe
A += aufgabe(
    3, "Zusammen für die Prüfung lernen",
    "In vier Wochen haben Sie die DTZ-Prüfung. Sie möchten mit einem Partner / einer Partnerin aus dem Kurs "
    "zusammen lernen.",
    ["Wann und wie oft?", "Wo? (Bibliothek, zu Hause, online …)", "Was üben? (Sprechen, Briefe, Hören …)",
     "Wer bereitet was vor?", "Wie kontrollieren Sie sich?"],
    [f"{K('Ich schlage vor,')} wir treffen uns zweimal pro Woche nach dem Kurs.",
     f"{K('Das passt mir gut.')} Dann sind wir sowieso schon zusammen.",
     f"Bei mir zu Hause? {K('Das ist schwierig, weil')} meine Kinder dann laut sind. {K('Lieber')} in der Bibliothek.",
     f"{K('Abgemacht:')} Dienstag und Freitag, 13 Uhr, in der Stadtbibliothek."],
)
A += dialog([
    ("A", "Die Prüfung ist schon in vier Wochen. Ich bin ein bisschen nervös. Wollen wir zusammen lernen?"),
    ("B", f"{K('Ja, sehr gern!')} Allein lerne ich nicht so viel. Wann hast du Zeit?"),
    ("A", f"{K('Ich schlage vor,')} wir treffen uns zweimal pro Woche, am Dienstag und am Donnerstag, direkt nach dem Kurs."),
    ("B", f"Dienstag geht gut. {K('Am Donnerstag klappt es bei mir leider nicht, weil')} ich nachmittags arbeite. Geht auch Freitag?"),
    ("A", f"{K('Ja, Freitag passt mir auch.')} Und wo treffen wir uns? Bei mir zu Hause?"),
    ("B", f"{K('Ich weiß nicht.')} Zu Hause gibt es oft Ablenkung. {K('Wie wäre es mit')} der Stadtbibliothek? Dort gibt es Gruppenräume."),
    ("A", f"{K('Das ist eine gute Idee.')} Was wollen wir üben? Ich finde das Sprechen am schwersten."),
    ("B", f"Ich habe mehr Probleme mit den Briefen. {K('Dann machen wir doch beides:')} Zuerst schreiben wir einen Brief, danach üben wir Sprechen."),
    ("A", f"{K('Einverstanden.')} Ich kümmere mich um die Sprechkarten. {K('Kannst du')} die Briefaufgaben {K('übernehmen?')}"),
    ("B", f"{K('Das kann ich machen.')} Wir können unsere Briefe dann tauschen und gegenseitig korrigieren."),
    ("A", f"Und beim Sprechen nehmen wir uns mit dem Handy auf. Dann hören wir unsere Fehler."),
    ("B", f"{K('Super. Lass uns kurz zusammenfassen:')} Dienstag und Freitag nach dem Kurs in der Bibliothek. Du bringst die Sprechkarten mit, "
          "ich die Briefaufgaben, und wir korrigieren uns gegenseitig."),
    ("A", f"{K('Genau. Abgemacht!')}"),
])

# 4 – Geschenk für Kollegin
A += aufgabe(
    4, "Eine Überraschung für eine Kollegin",
    "Ihre Kollegin Frau Szabó arbeitet seit zehn Jahren in Ihrer Firma. Nächste Woche feiert sie ihr Jubiläum. "
    "Sie und Ihr Kollege / Ihre Kollegin möchten ihr eine Überraschung machen.",
    ["Welches Geschenk?", "Wie viel Geld? Wer sammelt?", "Eine Karte?", "Wann überreichen? (Pause, Feierabend …)",
     "Kuchen oder Frühstück für das Team?"],
    [f"{K('Wir könnten ihr')} einen Gutschein für ihr Lieblingsrestaurant {K('schenken.')}",
     f"{K('Das gefällt ihr bestimmt')} – sie geht gern essen.",
     f"Zwanzig Euro pro Person? {K('Das ist für manche zu viel.')} {K('Vielleicht ist es besser, wenn')} jeder gibt, was er kann.",
     f"{K('Gut, dann machen wir es so:')} Ich sammle das Geld, du kaufst die Karte, und wir überreichen alles in der Frühstückspause."],
)
# 5 – Kita-Fest
A += aufgabe(
    5, "Ein Stand beim Kita-Sommerfest",
    "Die Kita Ihrer Kinder feiert ein Sommerfest. Die Eltern sollen einen Stand organisieren. Das Geld ist für einen "
    "Ausflug der Kita-Gruppe.",
    ["Was für ein Stand? (Kuchen, Waffeln, Kinderschminken, Spiele …)", "Was brauchen Sie dafür?", "Welche Preise?",
     "Wer steht wann am Stand?", "Wer hilft beim Aufbau und Abbau?"],
    [f"{K('Wie wäre es mit')} einem Waffelstand? Waffeln mögen alle Kinder.",
     f"{K('Ja, gute Idee.')} Ich habe ein Waffeleisen, das bringe ich mit.",
     f"Drei Euro pro Waffel? {K('Das finde ich zu teuer für eine Kita.')} {K('Lieber')} ein Euro – dann kaufen die Leute mehr.",
     f"{K('Einverstanden.')} Ich stehe von 14 bis 16 Uhr am Stand, du von 16 bis 18 Uhr."],
)
# 6 – Neue Nachbarfamilie
A += aufgabe(
    6, "Eine neue Familie im Haus",
    "Eine Familie ist neu in Ihr Haus gezogen. Sie spricht noch wenig Deutsch und kennt die Stadt nicht. "
    "Sie und Ihr Nachbar / Ihre Nachbarin möchten der Familie helfen.",
    ["Wann besuchen Sie die Familie?", "Was zeigen Sie ihr? (Supermarkt, Haltestelle, Kinderarzt …)",
     "Wer erklärt die Mülltrennung?", "Hilfe bei Briefen oder Terminen?", "Wer macht was?"],
    [f"{K('Ich schlage vor,')} wir besuchen sie am Sonntag und bringen einen Kuchen mit.",
     f"{K('Das ist nett.')} Dann können wir uns gleich vorstellen.",
     f"Alles an einem Tag zeigen? {K('Das ist zu viel auf einmal.')} {K('Besser')} jede Woche eine Sache.",
     f"{K('Also:')} Du zeigst ihnen den Supermarkt und die Haltestelle, ich erkläre die Mülltonnen."],
)
# 7 – Aufräumaktion
A += aufgabe(
    7, "Aufräumaktion auf dem Spielplatz",
    "Auf dem Spielplatz in Ihrem Stadtteil liegt viel Müll. Sie möchten mit anderen Eltern an einem Tag gemeinsam "
    "aufräumen.",
    ["Wann?", "Wen müssen Sie vorher fragen? (Stadt, Bürgerbüro …)", "Material? (Handschuhe, Müllsäcke …)",
     "Wie finden Sie Helferinnen und Helfer?", "Was machen Sie danach?"],
    [f"{K('Wir könnten')} im Bürgerbüro {K('fragen')}, ob die Stadt Müllsäcke und Handschuhe hat.",
     f"{K('Stimmt, das ist wichtig.')} Dann müssen wir nichts kaufen.",
     f"Am Sonntagmorgen um 8 Uhr? {K('Da schlafen doch alle!')} {K('Wie wäre es mit')} Samstag um 10 Uhr?",
     f"{K('Gut, dann fasse ich zusammen:')} Samstag, 10 Uhr, danach essen wir zusammen im Park."],
)
# 8 – Flohmarkt
A += aufgabe(
    8, "Zusammen auf den Flohmarkt",
    "Ihre Kinder sind gewachsen. Sie haben viel Kinderkleidung und Spielzeug, das Sie nicht mehr brauchen. "
    "Sie möchten zusammen mit Ihrem Partner / Ihrer Partnerin auf einem Flohmarkt verkaufen.",
    ["Welcher Flohmarkt? Wann?", "Anmeldung und Standgebühr?", "Was verkaufen? Welche Preise?",
     "Transport? (Auto, Bollerwagen …)", "Was machen Sie mit den Sachen, die übrig bleiben?"],
    [f"{K('Was hältst du von')} dem Kinderflohmarkt in der Schule? Dort kommen viele Eltern.",
     f"{K('Gute Idee.')} Und die Standgebühr teilen wir uns.",
     f"Alles für fünfzig Cent? {K('Ich weiß nicht.')} Die Winterjacken sind fast neu. {K('Lieber')} fünf Euro für die Jacken.",
     f"{K('Dann machen wir es so:')} Was übrig bleibt, bringen wir in die Kleiderkammer."],
)
s += A

# ── Übungen ──
s += task(
    1, "Was macht die Person?",
    "Ordnen Sie zu: A vorschlagen · B zustimmen · C ablehnen und etwas anderes vorschlagen · D sich einigen / zusammenfassen",
    1,
)
u1 = [
    "Was hältst du davon, wenn wir die Einladungen in die Briefkästen werfen?",
    "Freitag kann ich leider nicht. Geht es auch am Samstag?",
    "Einverstanden, so machen wir das.",
    "Also: Du kaufst die Getränke, und ich schreibe den Aushang.",
    "Wir könnten doch mit dem Zug fahren.",
    "Ein Restaurant ist zu teuer. Lieber machen wir ein Picknick.",
    "Das ist eine super Idee!",
    "Haben wir noch etwas vergessen? Nein? Dann ist alles klar.",
]
s += [R(f"{i}. {t}  <font color=\"#8A93A8\">____</font>", "item") for i, t in enumerate(u1, 1)]

s += task(
    2, "Ergänzen Sie die Zusammenfassung",
    "Lesen Sie noch einmal den Musterdialog zu Aufgabe 2 (Ausflug). Ergänzen Sie die Zusammenfassung.",
    2,
)
s += [R(f"Wir fahren am {GAP} mit {GAP} und Bus in den {GAP}. Du suchst die {GAP}, ich mache die {GAP}. "
        f"Wenn es regnet, gehen wir ins {GAP}.", "item")]

s += task(
    3, "Ablehnen – aber mit Grund und Alternative",
    f"Reagieren Sie höflich: Sagen Sie <b>Nein</b>, nennen Sie einen <b>Grund</b> ({K('weil')} …) und machen Sie einen "
    f"<b>neuen Vorschlag</b> ({K('Wie wäre es mit')} … / {K('Lieber')} …).",
    2,
)
s += [box(R(f"<b>Beispiel:</b> „Wir grillen auf dem Balkon.“ {ARROW} {K('Das geht leider nicht, weil')} Grillen auf dem "
            f"Balkon bei uns verboten ist. {K('Wie wäre es mit')} dem Grillplatz im Park?", "cell"), HELLGRUEN, GRUEN)]
u3 = [
    "„Wir treffen uns am Sonntag um 7 Uhr morgens.“",
    "„Jeder gibt dreißig Euro für das Geschenk.“",
    "„Wir fahren mit dem Fahrrad in den Wildpark.“ (Die Kinder sind drei und fünf Jahre alt.)",
    "„Wir lernen bei dir zu Hause.“",
]
for i, t in enumerate(u3, 1):
    s += [KeepTogether([R(f"{i}. {t}", "item"), lines(1)])]

s += task(
    4, "Jetzt Sie: Planen Sie zu zweit",
    "Wählen Sie eine der Aufgaben 4–8. Planen Sie ca. 5–6 Minuten wie in der Prüfung – ohne Vorbereitung. "
    "Eine dritte Person hört zu und kreuzt an. Dann tauschen Sie die Rollen und nehmen eine andere Aufgabe.",
    3,
)
s += [
    box(
        R(
            "<b>Checkliste für die Zuhörerin / den Zuhörer:</b><br/>"
            f"{sym('☐')} Zu allen Punkten der Aufgabenkarte gesprochen<br/>"
            f"{sym('☐')} Eigene Vorschläge gemacht<br/>"
            f"{sym('☐')} Auf die Vorschläge des Partners / der Partnerin reagiert (zugestimmt oder begründet abgelehnt)<br/>"
            f"{sym('☐')} Bei Ablehnung eine Alternative vorgeschlagen<br/>"
            f"{sym('☐')} Aufgaben verteilt: Wer macht was?<br/>"
            f"{sym('☐')} Am Ende gemeinsam eine Lösung gefunden und zusammengefasst<br/>"
            f"{sym('☐')} Beide haben ungefähr gleich viel gesprochen",
            "cell",
        ),
        NOTE,
        GELB,
    ),
    R("<b>Allein üben?</b> Lesen Sie die Stichpunkte einer Aufgabe und sagen Sie zu jedem Punkt einen Vorschlag mit Grund. "
      "Reagieren Sie dann selbst darauf: einmal zustimmen, einmal ablehnen.", "p"),
]

# ── Lösungen ──
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
s += [R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small")]
s += [R("Übung 1", "solh"), R("1. A  ·  2. C  ·  3. B  ·  4. D  ·  5. A  ·  6. C  ·  7. B  ·  8. D", "sol")]
s += [R("Übung 2", "solh"), R("Dienstag · Zug · Wildpark · Verbindung · Brote · Museum (Naturkundemuseum)", "sol")]
l3 = [
    f"{K('Das ist mir zu früh, weil')} ich am Wochenende lange schlafe. {K('Wie wäre es mit')} zehn Uhr?",
    f"{K('Das ist für manche zu viel, weil')} nicht alle viel Geld haben. {K('Lieber')} gibt jeder, was er kann.",
    f"{K('Das geht leider nicht, weil')} die Kinder noch zu klein für eine lange Strecke sind. {K('Wie wäre es mit')} dem Bus?",
    f"{K('Das ist schwierig, weil')} es bei mir zu laut ist. {K('Lieber')} lernen wir in der Bibliothek.",
]
s += [R("Übung 3 – Beispiele (andere Lösungen sind möglich)", "solh")] + [R(f"{i}. {t}", "sol") for i, t in enumerate(l3, 1)]
s += [R("Alle Namen und Situationen sind erfunden.", "small")]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
