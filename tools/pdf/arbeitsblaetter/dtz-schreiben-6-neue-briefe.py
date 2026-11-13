# Worksheet A2–B1 exam: DTZ Schreiben – six new letter types (task, phrases, checklist, model letters A2/B1).
# Own texts in the style of the exam, invented names. Facts about the exam: pruefung-fakten.js (dtz), STAND 11.11.2026.
# Run from the repo root: py -X utf8 tools/pdf/arbeitsblaetter/dtz-schreiben-6-neue-briefe.py
import os, re, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle

SLUG = "dtz-schreiben-6-neue-briefe"
TITLE = "DTZ Schreiben: 6 neue Brieftypen mit Musterbrief"
LEVEL = "A2–B1"
st["brief"] = ParagraphStyle("brief", parent=st["cell"], fontSize=9.6, leading=12.6, spaceAfter=4)
CB = sym("☐")

# Each letter: title, level dots, register, situation, leitpunkte, redemittel, extra checks, A2 lines, B1 lines, note
BRIEFE = [
    dict(
        name="Bitte an die Nachbarin: Paket annehmen", dots=1, reg="halbformell (Sie)",
        situation="Sie erwarten am Mittwoch ein Paket, aber Sie sind den ganzen Tag nicht zu Hause. "
                  "Schreiben Sie Ihrer Nachbarin, Frau Schulte, eine Nachricht.",
        lp=["warum Sie schreiben", "wann das Paket kommt", "um Hilfe bitten", "sagen, wann Sie das Paket abholen"],
        rm=[("Grund nennen", "Ich habe eine Bitte. / Ich schreibe Ihnen, weil ich eine kleine Bitte habe."),
            ("Wann?", "Am Mittwoch kommt ein Paket für mich. / Der Paketbote kommt zwischen 10 und 13 Uhr."),
            ("Um Hilfe bitten", "Können Sie das Paket bitte für mich annehmen? / Wären Sie so nett, …?"),
            ("Abholen", "Ich hole es am Abend bei Ihnen ab. / Ich komme gegen 18:30 Uhr vorbei."),
            ("Danken", "Vielen Dank! / Natürlich helfe ich Ihnen auch gern einmal.")],
        checks=["Anrede „Liebe Frau Schulte,“ – Sie-Form, aber freundlich", "Uhrzeit richtig: „um 19 Uhr“, „gegen 18:30 Uhr“"],
        a2=["Liebe Frau Schulte,",
            "ich habe eine Bitte. Am Mittwoch kommt ein Paket für mich, aber ich bin den ganzen Tag bei der Arbeit.",
            "Der Paketbote kommt wahrscheinlich am Vormittag.",
            "Können Sie das Paket bitte für mich annehmen?",
            "Ich hole es am Mittwoch um 19 Uhr bei Ihnen ab. Vielen Dank!",
            "Viele Grüße\nLeyla Demir (2. Stock)"],
        b1=["Liebe Frau Schulte,",
            "ich schreibe Ihnen, weil ich eine kleine Bitte habe. Ich habe neue Schuhe für meinen Sohn bestellt, "
            "und das Paket kommt am Mittwoch.",
            "Leider bin ich an diesem Tag von 8 bis 18 Uhr bei der Arbeit, und mein Mann ist auch nicht zu Hause. "
            "Laut E-Mail kommt der Paketbote zwischen 10 und 13 Uhr.",
            "Wären Sie so nett, das Paket für mich anzunehmen?",
            "Ich komme am Mittwoch gegen 18:30 Uhr bei Ihnen vorbei und hole es ab. Wenn das nicht passt, "
            "sagen Sie mir bitte Bescheid. Natürlich helfe ich Ihnen auch gern einmal.",
            "Herzliche Grüße\nLeyla Demir, 2. Stock"],
    ),
    dict(
        name="Einladung annehmen oder absagen", dots=1, reg="informell (du)",
        situation="Ihre Freundin Yasmin feiert am Samstag ihren 30. Geburtstag und lädt Sie zu einer Party ein. "
                  "Antworten Sie ihr.",
        lp=["sich für die Einladung bedanken", "sagen, ob Sie kommen (mit Grund)", "etwas anbieten", "eine Frage stellen"],
        rm=[("Danken", "Vielen Dank für deine Einladung! / Ich habe mich sehr darüber gefreut."),
            ("Zusagen", "Ich komme gern. / Am Samstag habe ich Zeit."),
            ("Absagen", "Leider kann ich nicht kommen, weil … / Das tut mir wirklich leid."),
            ("Anbieten", "Ich kann einen Kuchen backen. / Wie wäre es, wenn ich dich zum Essen einlade?"),
            ("Fragen", "Soll ich etwas mitbringen? / Wann soll ich kommen? / Hast du nächste Woche Zeit?"),
            ("Schluss", "Ich wünsche dir eine schöne Feier! / Bis bald!")],
        checks=["Anrede „Liebe Yasmin,“ – überall „du“, „dich“, „dir“, „dein“", "Gruß informell: „Liebe Grüße“ + Vorname"],
        note="Musterbrief A2 = Zusage, Musterbrief B1 = Absage. Beide passen zu allen vier Leitpunkten.",
        a2=["Liebe Yasmin,",
            "vielen Dank für deine Einladung! Ich freue mich sehr.",
            "Ich komme gern zu deiner Party am Samstag. An diesem Tag habe ich frei.",
            "Ich kann einen Kuchen backen. Ist das gut?",
            "Wann soll ich kommen? Und darf ich meine Frau mitbringen?",
            "Liebe Grüße\nDragan"],
        b1=["Liebe Yasmin,",
            "vielen Dank für deine nette Einladung! Ich habe mich sehr darüber gefreut.",
            "Leider kann ich am Samstag nicht kommen, weil meine Eltern uns an diesem Wochenende besuchen. "
            "Sie kommen aus Serbien und bleiben nur drei Tage. Das tut mir wirklich leid.",
            "Ich möchte deinen Geburtstag aber gern mit dir nachfeiern. Wie wäre es, wenn ich dich nächste Woche "
            "zum Essen einlade?",
            "Hast du am Dienstag- oder Mittwochabend Zeit? Ich wünsche dir eine schöne Feier!",
            "Liebe Grüße\nDragan"],
    ),
    dict(
        name="Entschuldigung: Das Kind ist krank (Kita)", dots=2, reg="halbformell (Sie)",
        situation="Ihre Tochter Ama geht in die Kita „Sonnenblume“. Heute ist sie krank und kann nicht kommen. "
                  "Schreiben Sie an die Erzieherin, Frau Albers.",
        lp=["wer krank ist und was sie hat", "wie lange sie wahrscheinlich fehlt", "was der Arzt gesagt hat",
            "nach dem Ausflug am Freitag fragen"],
        rm=[("Krank melden", "Meine Tochter ist krank. / Sie kann heute leider nicht in die Kita kommen."),
            ("Was hat sie?", "Sie hat Fieber und Husten. / Sie hat seit gestern Abend Fieber."),
            ("Wie lange?", "Sie bleibt wahrscheinlich bis Mittwoch zu Hause. / Sie kommt erst am Donnerstag wieder."),
            ("Arzt", "Der Kinderarzt sagt, dass sie zu Hause bleiben soll."),
            ("Bescheinigung", "Wenn Sie eine Bescheinigung vom Arzt brauchen, bringe ich sie mit."),
            ("Fragen", "Darf sie am Ausflug teilnehmen, wenn sie wieder gesund ist?")],
        checks=["Zeitangaben: „seit gestern“, „bis Mittwoch“, „am Donnerstag“",
                "„dass“-Satz: Verb am Ende („…, dass sie zu Hause bleiben soll.“)"],
        note="Für den Deutschkurs geht es genauso: an die Kursleiterin schreiben, „Ich bin krank …“, "
             "und nach den Hausaufgaben fragen.",
        a2=["Liebe Frau Albers,",
            "meine Tochter Ama ist krank. Sie hat Fieber und Husten. Heute kann sie leider nicht in die Kita kommen.",
            "Sie bleibt wahrscheinlich bis Mittwoch zu Hause.",
            "Wir waren heute Morgen beim Kinderarzt. Er sagt, Ama muss viel schlafen und trinken.",
            "Am Freitag machen Sie einen Ausflug. Kann Ama mitkommen, wenn sie wieder gesund ist?",
            "Viele Grüße\nKwame Mensah"],
        b1=["Liebe Frau Albers,",
            "leider ist Ama krank und kann heute nicht in die Kita kommen. Sie hat seit gestern Abend Fieber "
            "und starken Husten.",
            "Wir waren heute Morgen beim Kinderarzt. Er sagt, dass Ama eine Erkältung hat und ein paar Tage "
            "zu Hause bleiben soll. Deshalb kommt sie wahrscheinlich erst am Donnerstag wieder.",
            "Wenn Sie eine Bescheinigung vom Arzt brauchen, bringe ich sie gern mit.",
            "Ich habe noch eine Frage: Am Freitag macht die Gruppe einen Ausflug in den Zoo. Darf Ama mitkommen, "
            "wenn sie wieder gesund ist? Sie freut sich schon sehr darauf.",
            "Viele Grüße\nKwame Mensah"],
    ),
    dict(
        name="Termin verschieben (Bürgerbüro)", dots=2, reg="formell (Sie)",
        situation="Sie haben am Dienstag um 9:30 Uhr einen Termin im Bürgerbüro. Sie möchten Ihre neue Adresse "
                  "anmelden. Leider müssen Sie an diesem Tag arbeiten. Schreiben Sie an das Bürgerbüro.",
        lp=["Grund für Ihr Schreiben", "warum Sie nicht kommen können", "einen neuen Termin vorschlagen",
            "um eine Bestätigung bitten"],
        rm=[("Grund nennen", "Ich habe am Dienstag um 9:30 Uhr einen Termin bei Ihnen."),
            ("Nicht kommen", "Leider kann ich an diesem Tag nicht kommen, weil ich arbeiten muss."),
            ("Verschieben", "Kann ich den Termin verschieben? / Ich möchte den Termin gern verschieben."),
            ("Vorschlag", "Am Donnerstag habe ich Zeit. / Am besten passt es mir am Vormittag."),
            ("Bestätigung", "Bitte schreiben Sie mir den neuen Termin. / Könnten Sie mir den Termin bitte bestätigen?"),
            ("Schluss", "Vielen Dank für Ihre Hilfe.")],
        checks=["Unterschied klar: <b>verschieben</b> = neuer Termin, <b>absagen</b> = kein Termin",
                "Anrede ohne Namen: „Sehr geehrte Damen und Herren,“"],
        a2=["Sehr geehrte Damen und Herren,",
            "ich habe am Dienstag um 9:30 Uhr einen Termin bei Ihnen. Ich möchte meine neue Adresse anmelden.",
            "Leider muss ich an diesem Tag arbeiten. Kann ich den Termin verschieben?",
            "Am Donnerstag oder Freitag habe ich Zeit, am besten am Vormittag.",
            "Bitte schreiben Sie mir den neuen Termin. Vielen Dank.",
            "Mit freundlichen Grüßen\nMai Nguyen"],
        b1=["Sehr geehrte Damen und Herren,",
            "ich habe am Dienstag um 9:30 Uhr einen Termin im Bürgerbüro, weil ich vor Kurzem umgezogen bin "
            "und meine neue Adresse anmelden möchte.",
            "Leider kann ich an diesem Tag nicht kommen. Mein Chef hat meinen Dienstplan geändert, und ich muss "
            "am Dienstag von 7 bis 15 Uhr arbeiten.",
            "Deshalb möchte ich den Termin gern verschieben. Am Donnerstag und am Freitag habe ich frei. "
            "An diesen Tagen kann ich zu jeder Uhrzeit kommen.",
            "Könnten Sie mir bitte den neuen Termin per E-Mail bestätigen? Vielen Dank für Ihre Hilfe.",
            "Mit freundlichen Grüßen\nMai Nguyen"],
    ),
    dict(
        name="Anfrage an den Vermieter: Reparatur", dots=3, reg="formell (Sie)",
        situation="In Ihrer Wohnung wird die Heizung im Kinderzimmer nicht mehr warm. "
                  "Schreiben Sie an Ihren Vermieter, Herrn Brandt.",
        lp=["was kaputt ist", "seit wann es das Problem gibt", "was Sie schon gemacht haben",
            "einen Termin für die Reparatur vorschlagen"],
        rm=[("Problem", "Die Heizung im Kinderzimmer ist kaputt. / Sie wird nicht mehr warm."),
            ("Seit wann?", "Das Problem gibt es seit Samstag. / seit letztem Samstag"),
            ("Folgen", "Im Zimmer sind es nur noch 15 Grad. / Meine Kinder können dort nicht schlafen."),
            ("Schon gemacht", "Ich habe die Heizung schon ganz aufgedreht, aber sie bleibt kalt."),
            ("Bitte", "Könnten Sie bitte so schnell wie möglich einen Handwerker schicken?"),
            ("Termin", "Ich bin jeden Tag ab 14 Uhr zu Hause. / Am Vormittag bin ich bei der Arbeit.")],
        checks=["Anrede mit Namen: „Sehr geehrter Herr Brandt,“ (Herr → geehrter, Frau → geehrte)",
                "Sachlich bleiben: um Reparatur bitten, nicht schimpfen"],
        a2=["Sehr geehrter Herr Brandt,",
            "die Heizung im Kinderzimmer ist kaputt. Sie wird nicht mehr warm.",
            "Das Problem gibt es seit Samstag.",
            "Ich habe die Heizung schon ganz aufgedreht, aber sie bleibt kalt.",
            "Kann bitte bald ein Handwerker kommen? Ich bin jeden Tag ab 14 Uhr zu Hause.",
            "Mit freundlichen Grüßen\nFatima Rahimi"],
        b1=["Sehr geehrter Herr Brandt,",
            "ich wohne in Ihrem Haus in der Gartenstraße 5 im ersten Stock. Leider wird die Heizung im "
            "Kinderzimmer nicht mehr warm.",
            "Das Problem gibt es seit letztem Samstag. Weil es draußen sehr kalt ist, sind es im Zimmer nur noch "
            "15 Grad, und meine Kinder können dort nicht schlafen.",
            "Ich habe die Heizung schon entlüftet und ganz aufgedreht, aber sie bleibt trotzdem kalt.",
            "Könnten Sie bitte so schnell wie möglich einen Handwerker schicken? Von Montag bis Freitag bin ich "
            "ab 14 Uhr zu Hause, am Vormittag bin ich bei der Arbeit.",
            "Mit freundlichen Grüßen\nFatima Rahimi"],
    ),
    dict(
        name="Kursanmeldung an der Volkshochschule", dots=3, reg="formell (Sie)",
        situation="Sie möchten an der Volkshochschule einen Schwimmkurs für Erwachsene machen (Kursnummer S 214). "
                  "Schreiben Sie an die Volkshochschule.",
        lp=["sich für den Kurs anmelden", "warum Sie den Kurs machen möchten", "nach einer Ermäßigung fragen",
            "fragen, was Sie mitbringen müssen"],
        rm=[("Anmelden", "Ich möchte mich für den Kurs … anmelden. / Hiermit melde ich mich für den Kurs S 214 an."),
            ("Grund", "Ich möchte schwimmen lernen, weil … / Als Kind hatte ich keine Möglichkeit, …"),
            ("Ermäßigung", "Gibt es eine Ermäßigung? / Welche Unterlagen brauchen Sie dafür?"),
            ("Mitbringen", "Was muss ich zum Kurs mitbringen? / Brauche ich zum Beispiel …?"),
            ("Schluss", "Über eine kurze Antwort freue ich mich. / Vielen Dank im Voraus.")],
        checks=["Kursnummer und Kursname genau abschreiben", "Fragen mit Fragezeichen; indirekte Frage: „Ich möchte wissen, was ich … muss.“"],
        a2=["Sehr geehrte Damen und Herren,",
            "ich möchte mich für den Schwimmkurs für Erwachsene anmelden. Die Kursnummer ist S 214.",
            "Ich kann nicht schwimmen, aber ich möchte es lernen. Im Sommer möchte ich mit meinen Kindern "
            "ins Schwimmbad gehen.",
            "Gibt es eine Ermäßigung? Ich verdiene nicht viel.",
            "Was muss ich zum Kurs mitbringen?",
            "Mit freundlichen Grüßen\nAhmad Karimi"],
        b1=["Sehr geehrte Damen und Herren,",
            "hiermit möchte ich mich für den Schwimmkurs für Erwachsene mit der Kursnummer S 214 anmelden.",
            "Als Kind hatte ich keine Möglichkeit, schwimmen zu lernen. Jetzt möchte ich es endlich lernen, "
            "weil ich im Sommer mit meinen Kindern ins Schwimmbad gehen will.",
            "Ich arbeite nur 20 Stunden pro Woche und verdiene nicht viel. Gibt es für den Kurs eine Ermäßigung? "
            "Wenn ja, welche Unterlagen brauchen Sie dafür?",
            "Außerdem möchte ich wissen, was ich zum Kurs mitbringen muss. Brauche ich zum Beispiel eine Badekappe?",
            "Über eine kurze Antwort freue ich mich.",
            "Mit freundlichen Grüßen\nAhmad Karimi"],
    ),
]


def words(lines):
    return len(re.findall(r"[\wÄÖÜäöüß]+(?:[-–][\wÄÖÜäöüß]+)*", " ".join(lines)))


def grid(rows, widths, pad=3.5, head=True, bg=None):
    t = Table(rows, colWidths=[w * mm for w in widths], repeatRows=1 if head else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
             ("TOPPADDING", (0, 0), (-1, -1), pad), ("BOTTOMPADDING", (0, 0), (-1, -1), pad)]
    if head: style.append(("BACKGROUND", (0, 0), (-1, 0), SOFT))
    if bg: style.append(("BACKGROUND", (0, 1 if head else 0), (-1, -1), bg))
    t.setStyle(TableStyle(style)); return t


def letter(lines):
    return [R(x.replace("\n", "<br/>"), "brief") for x in lines]


# Page 1: exam facts, letter structure, exercise on greetings
s = [
    R("A2–B1 · Prüfung DTZ · Arbeitsblatt", "kick"),
    R(TITLE, "h1"),
    R("Sechs Situationen aus dem Alltag, wie im DTZ: eine Aufgabe mit vier Leitpunkten, Redemittel und eine Checkliste. "
      "Die Musterbriefe für A2 und B1 stehen hinten – erst selbst schreiben, dann vergleichen.", "lead"),
    box([R("<b>DTZ Schreiben – das Wichtigste</b> (Stand: 11.11.2026, Quelle: g.a.s.t.)", "cell"),
         R(f"{ARROW} 30 Minuten, 1 Text. Du wählst Aufgabe A oder B.", "cell"),
         R(f"{ARROW} 20 Punkte: B1 = 15–20 Punkte, A2 = 7–14 Punkte.", "cell"),
         R(f"{ARROW} <b>Neu seit 1. November 2026:</b> Für das Gesamtergebnis B1 muss auch der dritte Teil mindestens A2 sein. "
           "Ein leeres Blatt beim Schreiben reicht also nicht mehr. Auch ein kurzer A2-Brief zählt!", "cell")],
        NOTE, GELB),
    Spacer(1, 6),
    R("So ist ein Brief aufgebaut", "h2"),
    grid([[R("<b>Teil</b>", "cell"), R("<b>Beispiel</b>", "cell"), R("<b>Achtung</b>", "cell")],
          [R("Anrede", "cell"), R("Sehr geehrte Damen und Herren,", "cell"), R("mit Komma", "cell")],
          [R("Einleitung", "cell"), R("ich schreibe Ihnen, weil …", "cell"), R("nach dem Komma klein weiter", "cell")],
          [R("Hauptteil", "cell"), R("zu jedem Leitpunkt 1–3 Sätze", "cell"), R("Reihenfolge der Leitpunkte = gut", "cell")],
          [R("Schluss", "cell"), R("Vielen Dank. / Ich freue mich auf Ihre Antwort.", "cell"), R("kurz", "cell")],
          [R("Gruß + Name", "cell"), R("Mit freundlichen Grüßen<br/>Name", "cell"), R("ohne Komma, ohne Punkt", "cell")]],
         [30, 86, 58]),
    Spacer(1, 6),
    grid([[R("<b>Wie?</b>", "cell"), R("<b>An wen?</b>", "cell"), R("<b>Anrede</b>", "cell"), R("<b>Gruß</b>", "cell")],
          [R("formell (Sie)", "cell"), R("Amt, Firma, Vermieter, Schule", "cell"),
           R("Sehr geehrte Frau …, / Sehr geehrter Herr …,", "cell"), R("Mit freundlichen Grüßen", "cell")],
          [R("halbformell (Sie)", "cell"), R("Nachbarn, Erzieherin, Kursleiterin", "cell"),
           R("Liebe Frau …, / Lieber Herr …,", "cell"), R("Viele Grüße / Herzliche Grüße", "cell")],
          [R("informell (du)", "cell"), R("Freunde, Familie", "cell"), R("Liebe Yasmin, / Lieber Dragan,", "cell"),
           R("Liebe Grüße / Bis bald", "cell")]],
         [30, 50, 52, 42]),
    Spacer(1, 4),
    *task(1, "Anrede und Gruß", "Schreib für jede Situation die passende Anrede und den passenden Gruß.", 1),
]
EMPF = ["das Bürgerbüro (kein Name)", "Ihr Vermieter, Herr Brandt", "Ihre Nachbarin, Frau Schulte",
        "Ihre Freundin Yasmin", "die Erzieherin Ihrer Tochter, Frau Albers", "die Volkshochschule (kein Name)"]
s.append(grid([[R("<b>An wen?</b>", "cell"), R("<b>Anrede</b>", "cell"), R("<b>Gruß</b>", "cell")]]
              + [[R(f"{i}. {e}", "cell"), R(GAP + GAP, "cell"), R(GAP + "____", "cell")] for i, e in enumerate(EMPF, 1)],
              [62, 62, 50], pad=5))

# One section per letter type
for n, b in enumerate(BRIEFE, 2):
    aufg = [R(f"<b>Aufgabe</b> · {b['reg']} · ca. 30 Minuten", "cell"), Spacer(1, 2), R(b["situation"], "cell"),
            R("<b>Schreiben Sie zu allen vier Punkten:</b>", "cell")]
    aufg += [R(f"{i}. {x}", "cell") for i, x in enumerate(b["lp"], 1)]
    rm = grid([[R("<b>Leitpunkt / Ziel</b>", "cell"), R("<b>Redemittel</b>", "cell")]]
              + [[R(a, "cell"), R(c, "cell")] for a, c in b["rm"]], [38, 136])
    chk = [R("<b>Checkliste – nach dem Schreiben abhaken</b>", "cell")]
    chk += [R(f"{CB} Leitpunkt {i}: {x}", "cell") for i, x in enumerate(b["lp"], 1)]
    chk += [R(f"{CB} {x}", "cell") for x in b["checks"]]
    chk += [R(f"{CB} Nach „weil“, „dass“, „wenn“ steht das Verb am Ende.", "cell")]
    block = [PageBreak()]
    block += task(n, b["name"], "Schreib deinen Brief unten (oder auf ein extra Blatt). Danach: Checkliste abhaken, "
                                "dann mit den Musterbriefen hinten vergleichen.", b["dots"])
    block += [box(aufg, NOTE, GELB), Spacer(1, 5), rm, Spacer(1, 5), box(chk, HELLGRUEN, GRUEN)]
    if b.get("note"): block += [Spacer(1, 3), R("Tipp: " + b["note"], "small")]
    s += [block[0], KeepTogether(block[1:]), Spacer(1, 6), R("Mein Brief", "h3"),
          lines(12 - (2 if b.get("note") else 0) - (len(b["rm"]) - 5), 0)]

# Solutions: model letters + exercise 1
s += [PageBreak(), R('Musterbriefe <font size="10" color="#566078">– erst selbst schreiben, dann vergleichen!</font>', "h1"),
      R("A2: kurz, aber zu jedem Leitpunkt mindestens ein Satz. B1: mehr Details, Gründe mit „weil“ und „deshalb“, "
        "höfliche Bitten mit „Könnten Sie …?“. Beide Briefe erfüllen alle vier Leitpunkte.", "lead")]
for n, b in enumerate(BRIEFE, 2):
    head = [R(f"<b>Musterbrief A2</b> · {words(b['a2'])} Wörter", "cell"),
            R(f"<b>Musterbrief B1</b> · {words(b['b1'])} Wörter", "cell")]
    t = grid([head, [letter(b["a2"]), letter(b["b1"])]], [80, 94], pad=5)
    s.append(KeepTogether([R(f"Übung {n} · {b['name']}", "h2"), t]))

loes = ["1. Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen",
        "2. Sehr geehrter Herr Brandt, … Mit freundlichen Grüßen",
        "3. Liebe Frau Schulte, … Viele Grüße / Herzliche Grüße",
        "4. Liebe Yasmin, … Liebe Grüße / Bis bald",
        "5. Liebe Frau Albers, … Viele Grüße (auch richtig: Sehr geehrte Frau Albers, … Mit freundlichen Grüßen)",
        "6. Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen"]
s += [Spacer(1, 8),
      KeepTogether([R("Lösung Übung 1", "h2"), box([R(x, "cell") for x in loes], HELLGRUEN, GRUEN),
                    Spacer(1, 6),
                    R("Tipp: Lern zwei Anfänge und zwei Schlüsse auswendig – dann hast du in der Prüfung mehr Zeit "
                      "für die Leitpunkte! – Dennis", "hand"),
                    Spacer(1, 4),
                    R("Eigene Übungsaufgaben im Stil des „Deutsch-Test für Zuwanderer“ – keine Originalaufgaben von "
                      "telc, g.a.s.t. oder BAMF. Alle Namen und Situationen sind erfunden.", "small")])]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
    for b in BRIEFE:
        print(f"{b['name']}: A2 {words(b['a2'])}, B1 {words(b['b1'])} Wörter")
