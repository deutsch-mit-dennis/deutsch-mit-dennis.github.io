# Arbeitsblatt DTZ Hören Teil 3 und 4 – Gespräche im Alltag, Meinungen im Radio
# Format laut sim/dtz.js, sim/dtz-2.js, sim/dtz-3.js und pruefung-fakten.js (dtz): Teil 3 = 4 Gespräche mit je 2 Aufgaben
# (richtig/falsch + a/b/c), Teil 4 = 3 Personen in einer Radiosendung, Aussagen a–f (drei passen nicht, 1 Minute Lesezeit);
# jeder Text einmal (plays: 1), 1 Punkt pro Aufgabe; Hören gesamt 4 Teile, 20 Aufgaben, ca. 25 Min.
# Eigene Texte, keine Originalaufgaben. Alle Personen und Einrichtungen sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-hoeren-teil-3-und-4.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtz-hoeren-teil-3-und-4"
TITLE = "DTZ Hören Teil 3 und 4: Gespräche und Meinungen"
HEAD = TITLE  # page header (max. 70 characters)
LEVEL = "A2–B1"
THEMA = "Sollen Kinder zu Hause im Haushalt helfen?"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.6, leading=12.2)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.4, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.6, leading=12, leftIndent=10, firstLineIndent=-10, spaceAfter=2)
BOX = sym("☐")


def tips_traps(title, tips, traps):
    left = [R("<b>So gehst du vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)]
    right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [R(f"– {t}", "tip") for t in traps]
    t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN), ("BACKGROUND", (1, 0), (1, 0), NOTE),
        ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN), ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return KeepTogether([R(title, "h2"), t])


def gespraech(label, nr, statement, q, opts):
    """Teil 3: one conversation = true/false item + a/b/c item."""
    rows = [[R(f"<b>{label}</b>", "cell"), ""],
            [R(f"<b>{nr}</b>", "cell"), R(f"{statement}<br/>{BOX} richtig&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{BOX} falsch", "cell")],
            [R(f"<b>{nr + 1}</b>", "cell"), R(f"<b>{q}</b>", "cell")]]
    rows += [["", R(f"{BOX}  <b>{l}</b>  {o}", "cell")] for l, o in zip("abc", opts)]
    t = Table(rows, colWidths=[9 * mm, 165 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("SPAN", (0, 0), (1, 0)),
                           ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 1), (-1, 1), 0.4, LINE),
                           ("TOPPADDING", (0, 0), (-1, -1), 1.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
                           ("TOPPADDING", (0, 0), (-1, 0), 3), ("BOTTOMPADDING", (0, 0), (-1, 0), 3),
                           ("BOTTOMPADDING", (0, 1), (-1, 1), 4), ("TOPPADDING", (0, 2), (-1, 2), 4),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 6)]))
    return KeepTogether([t, Spacer(1, 3)])


def script(title, lines_):
    """Text to read aloud: one row per speaker turn."""
    rows = [R(f"<b>{who}:</b> {txt}" if who else txt, "mat") for who, txt in lines_]
    t = Table([[r] for r in rows], colWidths=[174 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8), ("TOPPADDING", (0, 0), (-1, 0), 5),
                           ("BOTTOMPADDING", (0, -1), (-1, -1), 5)]))
    return [KeepTogether([R(title, "solh"), t]), Spacer(1, 2)]


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("A2–B1 · Prüfung DTZ · Hören Teil 3 und 4", "kick"),
    R("Gespräche und Meinungen", "h1"),
    R("In Teil 3 hörst du Gespräche aus dem Alltag: in der Apotheke, unter Freunden, in der Schule. In Teil 4 sagen "
      "drei Personen im Radio ihre Meinung. Hier übst du beide Teile mit je einem kompletten Übungssatz im Prüfungsformat.",
      "lead"),
    R("So läuft der Teil", "h2"),
    table([
        ["<b>Was?</b>", "<b>Teil 3</b>", "<b>Teil 4</b>"],
        ["Name", "Gespräche im Alltag", "Meinungen im Radio"],
        ["Texte", "4 Gespräche", "3 Personen in einer Radiosendung zu einem Thema"],
        ["Aufgabe", "Zu jedem Gespräch <b>2 Aufgaben</b>: 1 × richtig oder falsch, 1 × a, b oder c",
         "Für jede Person 1 Aussage aus <b>a–f</b>. <b>Drei Aussagen passen nicht.</b>"],
        ["Lesezeit", "Vor jedem Gespräch zuerst die Aufgaben lesen", "<b>1 Minute</b> für die Aussagen a–f"],
        ["Hören", "Sie hören jedes Gespräch <b>einmal</b>.", "Sie hören jeden Text <b>einmal</b>."],
        ["Punkte", "8 Aufgaben × 1 Punkt", "3 Aufgaben × 1 Punkt"],
    ], [24, 75, 75]),
    Spacer(1, 3),
    R("Der ganze Prüfungsteil Hören: 4 Teile, 20 Aufgaben, ca. 25 Minuten. Alle Texte hörst du nur einmal. "
      "Hören und Lesen zählen zusammen (45 Punkte). Teil 1 und 2 übst du auf dem Blatt "
      "„DTZ Hören Teil 1 und 2: Ansagen und Radio verstehen“.", "small"),
    Spacer(1, 3),
    box(R("<b>Ohne Audio üben – so geht’s:</b> Zwei Personen lesen die Gespräche aus dem Lösungsteil mit verteilten Rollen "
          "vor: normales Tempo, jeden Text <b>nur einmal</b>. In Teil 4 liest eine Person die Moderation, eine andere "
          "die Meinungen. Wer zuhört, deckt den Lösungsteil ab.", "cell"), HELLGRUEN, GRUEN),
]

s += [tips_traps(
    "Teil 3: Strategien und Fallen",
    ["Lies vor dem Gespräch <b>beide</b> Aufgaben. So weißt du: Worum geht es? Wer spricht?",
     "Die Aussage richtig/falsch prüfst du Wort für Wort: <i>Wer? Wann? Schon oder noch nicht?</i>",
     "Im Gespräch ändern sich Pläne. Hör bis zum Ende: Was ist am Schluss beschlossen?",
     "Signalwörter für Änderungen: <i>Moment …, doch lieber, dann eben, nein, warte, stimmt</i>."],
    ["Die erste Idee ist oft nicht das Ergebnis: „Morgen um acht … nein, erst um zehn.“",
     "<i>noch nicht, kein, nicht mehr</i> machen eine Aussage falsch – auch wenn alle anderen Wörter stimmen.",
     "Etwas wird genannt, aber für eine andere Person oder einen anderen Tag.",
     "Ein Wort aus dem Gespräch steht in einer falschen Antwort."]),
    tips_traps(
    "Teil 4: Strategien und Fallen",
    ["Nutze die Minute Lesezeit: Unterstreiche in jeder Aussage a–f das wichtigste Wort "
     "(z. B. <i>Geld</i>, <i>kleine Kinder</i>, <i>Schule</i>).",
     "Frag dich: Ist die Person <b>dafür, dagegen</b> oder <b>teils, teils</b>?",
     "Die Moderation nennt den Namen. Schreib den Buchstaben direkt hinter den Namen.",
     "Die Meinung steht oft am Anfang oder am Ende des Beitrags. Eine Geschichte in der Mitte ist das Beispiel dazu."],
    ["Eine Person spricht über ein Thema aus einer falschen Aussage – aber sie ist <b>dagegen</b>: "
     "„Geld gibt es dafür bei uns nicht.“",
     "„Ja, aber …“: Nach <i>aber</i> kommt die eigentliche Meinung.",
     "Drei Aussagen bleiben übrig – nicht jede Aussage passt zu einer Person."]),
]

# ───────────────────────── Übung 1 ─────────────────────────
s += task(1, "Was gilt am Ende?",
          "Aufwärmen für Teil 3. Lies die kurzen Gespräche. Der Plan ändert sich. Was gilt am Ende? Schreib die Antwort.", 1)
u1 = [
    ("A: „Wir treffen uns um sieben, okay?“ – B: „Sieben ist schlecht. Geht halb acht?“ – A: „Klar, kein Problem.“",
     "Wann treffen sie sich?"),
    ("A: „Ich bringe einen Kuchen mit.“ – B: „Kuchen hat Eda schon. Bring lieber Getränke mit.“ – A: „Mach ich.“",
     "Was bringt A mit?"),
    ("A: „Ich gehe am Mittwoch zum Bürgeramt.“ – B: „Am Mittwoch hast du doch Kurs!“ – A: „Stimmt. Dann eben am Donnerstag.“",
     "Wann geht A zum Bürgeramt?"),
    ("A: „Nehmen wir den Bus?“ – B: „Heute fahren keine Busse, Streik.“ – A: „Dann fahren wir mit dem Fahrrad.“",
     "Wie fahren sie?"),
    ("A: „Ich rufe den Vermieter an.“ – B: „Schreib ihm lieber eine E-Mail. Dann hast du es schriftlich.“ – A: „Gute Idee.“",
     "Was macht A?"),
]
s += [table([[f"{i}. {d}<br/><b>{q}</b>", "<br/>______________"] for i, (d, q) in enumerate(u1, 1)], [130, 44], head=False)]

# ───────────────────────── Übung 2 ─────────────────────────
s += task(2, "Dafür, dagegen oder teils, teils?",
          "Aufwärmen für Teil 4. Wie ist die Meinung? Schreib <b>+</b> (dafür), <b>–</b> (dagegen) oder "
          "<b>±</b> (teils, teils).", 1)
u2 = ["„Das finde ich eine sehr gute Idee.“", "„Davon halte ich gar nichts.“", "„Im Prinzip ja, aber nicht jeden Tag.“",
      "„Das kann ich mir überhaupt nicht vorstellen.“", "„Bei uns klappt das prima.“", "„Das kommt darauf an.“"]
s += [table([[f"{i}. {t}", "______", f"{i + 3}. {u2[i + 2]}", "______"] for i, t in enumerate(u2[:3], 1)],
            [66, 21, 66, 21], head=False)]

# ───────────────────────── Übung 3: Teil 3 ─────────────────────────
s += [CondPageBreak(200 * mm)]
s += task(3, "Übungssatz Teil 3: Gespräche im Alltag",
          "Prüfungsformat. Sie hören vier Gespräche. Sie hören jedes Gespräch <b>einmal</b>. Zu jedem Gespräch lösen Sie "
          "zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?", 2)
s += [
    gespraech("Gespräch 1", 10, "Frau Nguyen bekommt den Saft heute.",
              "Wann kann Frau Nguyen den Saft abholen?",
              ["Morgen ab acht Uhr.", "Morgen ab zehn Uhr.", "Heute am Abend."]),
    gespraech("Gespräch 2", 12, "Malik hat den Mietvertrag schon unterschrieben.",
              "Was muss Malik bis Freitag schicken?",
              ["Eine Schufa-Auskunft.", "Eine Kopie von seinem Pass.", "Seine Gehaltsnachweise."]),
    gespraech("Gespräch 3", 14, "Die Kinder brauchen am Donnerstag eine Regenjacke.",
              "Wann soll Kwame das Geld mitbringen?",
              ["Bis Mittwoch.", "Am Donnerstag.", "Nach dem Ausflug."]),
    gespraech("Gespräch 4", 16, "Frau Haddad besucht den Kurs am Mittwoch.",
              "Was soll Frau Haddad zum ersten Termin mitbringen?",
              ["Einen Laptop.", "Ihren Bescheid.", "Sechzig Euro in bar."]),
]

# ───────────────────────── Übung 4: Teil 4 ─────────────────────────
AUSSAGEN = [
    "Kinder sollen helfen, aber Schule und Lernen sind wichtiger.",
    "Für die Hilfe im Haushalt sollen Kinder Geld bekommen.",
    "Schon kleine Kinder können einfache Aufgaben übernehmen.",
    "Hausarbeit ist nur die Aufgabe der Eltern.",
    "Jungen und Mädchen sollen genau die gleichen Aufgaben machen.",
    "Im Haushalt lernen Kinder, was sie später allein brauchen.",
]
s += [CondPageBreak(130 * mm)]
s += task(4, "Übungssatz Teil 4: Meinungen im Radio",
          f"Prüfungsformat. Sie hören drei Personen in einer Radiosendung zum Thema „{THEMA}“. Welche Aussage passt zu "
          "welcher Person? Wählen Sie für jede Person eine Aussage a–f. Drei Aussagen passen nicht. Lesen Sie zuerst die "
          "Aussagen a–f. Dazu haben Sie <b>eine Minute</b> Zeit. Sie hören jeden Text <b>einmal</b>.", 3)
rows = [[R(f"<b>{l})</b>", "cell"), R(t, "cell")] for l, t in zip("abcdef", AUSSAGEN)]
t = Table(rows, colWidths=[9 * mm, 165 * mm])
t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                       ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
cells = [R(f"<b>{n}</b>  {p}   ______", "cell") for n, p in [(18, "Frau Petrenko"), (19, "Herr Abdi"), (20, "Frau Lindner")]]
a = Table([cells], colWidths=[58 * mm] * 3)
a.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                       ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                       ("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN)]))
s += [t, Spacer(1, 5), a, Spacer(1, 6),
      box(R("<b>Nach dem Hören:</b> Welche Aussage hat dich fast in die Falle gelockt? Welches Wort hast du gehört – "
            "und warum passt die Aussage trotzdem nicht? ______________________________", "cell"), NOTE, GELB)]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen und Texte zum Vorlesen", "h2"),
      R("Erst üben, dann nachschauen! Wer zuhört, deckt diesen Teil ab. Die Texte sind für Partnerin, Partner "
        "oder Lehrkraft zum Vorlesen. Zahlen sind ausgeschrieben – so, wie man sie hört.", "small"),
      R("Übung 1 und Übung 2", "solh"),
      R("Übung 1: 1. um halb acht (19:30 Uhr) · 2. Getränke · 3. am Donnerstag · 4. mit dem Fahrrad · "
        "5. Er/Sie schreibt eine E-Mail.", "sol"),
      R("Übung 2: 1. + · 2. – · 3. ± · 4. – · 5. + · 6. ±", "sol"),
      R("Übung 3 · Teil 3: Lösungen", "solh"),
      R("<b>10 falsch · 11 b · 12 falsch · 13 c · 14 richtig · 15 a · 16 richtig · 17 b</b>", "sol"),
      R("10 falsch: „Heute nicht mehr.“ – 11 b: „Nein, morgen kommt die Lieferung erst um zehn.“ "
        "<b>Falle a:</b> Acht Uhr ist die erste Idee – sie wird korrigiert.", "sol"),
      R("12 falsch: „Nein, noch nicht.“ – 13 c: „… meine Gehaltsnachweise von den letzten drei Monaten. Die soll ich bis "
        "Freitag per E-Mail schicken.“ <b>Falle a:</b> Die Schufa-Auskunft hat der Vermieter schon.", "sol"),
      R("14 richtig: „Und eine Regenjacke, der Wetterbericht sagt Regen.“ – 15 a: „Nein, lieber vorher, bis Mittwoch.“ "
        "<b>Falle b:</b> Der Ausflug ist am Donnerstag – das Geld nicht.", "sol"),
      R("16 richtig: „Dann nehme ich Mittwoch.“ (Montag ist voll.) – 17 b: „Dann bringen Sie bitte Ihren Bescheid "
        "zum ersten Termin mit.“ <b>Falle a:</b> „Nein, Computer haben wir im Kursraum.“", "sol")]

s += script("Teil 3 · Gespräch 1 – in der Apotheke", [
    ("Apothekerin", "Guten Tag, was kann ich für Sie tun?"),
    ("Frau Nguyen", "Guten Tag. Ich habe hier ein Rezept von der Kinderärztin. Für meinen Sohn, einen Saft gegen Husten."),
    ("Apothekerin", "Moment … Oh, den Saft haben wir leider gerade nicht da. Ich kann ihn aber bestellen."),
    ("Frau Nguyen", "Und wann ist er da? Heute Abend?"),
    ("Apothekerin", "Heute nicht mehr. Normalerweise kommt unsere Lieferung morgen früh um acht. Moment, ich schaue kurz … "
                    "Nein, morgen kommt die Lieferung erst um zehn. Also ab zehn Uhr können Sie den Saft abholen."),
    ("Frau Nguyen", "Gut. Muss ich etwas bezahlen?"),
    ("Apothekerin", "Nein, für Kinder müssen Sie nichts zuzahlen. Das Rezept bleibt hier. Bringen Sie morgen einfach diesen "
                    "Abholschein mit."),
    ("Frau Nguyen", "Vielen Dank. Bis morgen!"),
])
s += script("Teil 3 · Gespräch 2 – zwei Freunde am Telefon", [
    ("Jana", "Hallo Malik! Und, wie war die Besichtigung?"),
    ("Malik", "Super! Drei Zimmer, ein Balkon, und nur zehn Minuten bis zu meiner Arbeit. Die Miete ist siebenhundertachtzig "
              "Euro warm."),
    ("Jana", "Klingt gut! Hast du schon unterschrieben?"),
    ("Malik", "Nein, noch nicht. Es waren noch fünf andere Leute da. Der Vermieter will erst Unterlagen sehen."),
    ("Jana", "Was denn? Die Schufa-Auskunft?"),
    ("Malik", "Die hat er schon, die hatte ich dabei. Aber er möchte noch meine Gehaltsnachweise von den letzten drei Monaten. "
              "Die soll ich bis Freitag per E-Mail schicken."),
    ("Jana", "Dann mach das am besten gleich heute! Wer schnell ist, hat bessere Chancen."),
    ("Malik", "Stimmt. Ich scanne sie heute Abend ein."),
])
s += script("Teil 3 · Gespräch 3 – vor der Schule", [
    ("Frau Schuster", "Herr Osei, gut, dass ich Sie treffe. Am Donnerstag macht die Klasse einen Ausflug in den Zoo."),
    ("Herr Osei", "Ah ja, Kwame hat davon erzählt. Was braucht er denn?"),
    ("Frau Schuster", "Einen Rucksack mit Frühstück und etwas zu trinken. Und eine Regenjacke, der Wetterbericht sagt Regen."),
    ("Herr Osei", "Und kostet der Ausflug etwas?"),
    ("Frau Schuster", "Ja, vier Euro für den Eintritt. Den Bus bezahlt der Förderverein."),
    ("Herr Osei", "Soll Kwame das Geld am Donnerstag mitbringen?"),
    ("Frau Schuster", "Nein, lieber vorher, bis Mittwoch. Geben Sie es ihm einfach in einem Umschlag mit."),
    ("Herr Osei", "Gut, mache ich. Und wann sind die Kinder zurück?"),
    ("Frau Schuster", "Ganz normal, um halb eins."),
])
s += script("Teil 3 · Gespräch 4 – Anmeldung bei der Volkshochschule", [
    ("Mitarbeiter", "Volkshochschule, Anmeldung, guten Tag."),
    ("Frau Haddad", "Guten Tag, mein Name ist Haddad. Ich möchte mich für den Computerkurs für Anfänger anmelden. "
                    "Für den Kurs am Montagabend."),
    ("Mitarbeiter", "Moment … Der Montagskurs ist leider schon voll. Aber am Mittwoch gibt es den gleichen Kurs, auch um "
                    "achtzehn Uhr. Da sind noch drei Plätze frei."),
    ("Frau Haddad", "Mittwoch … ja, das geht auch. Dann nehme ich Mittwoch."),
    ("Mitarbeiter", "Gut. Der Kurs kostet sechzig Euro. Wenn Sie Bürgergeld bekommen, zahlen Sie bei uns die Hälfte. "
                    "Dann bringen Sie bitte Ihren Bescheid zum ersten Termin mit."),
    ("Frau Haddad", "Ja, das bekomme ich. Muss ich einen Laptop mitbringen?"),
    ("Mitarbeiter", "Nein, Computer haben wir im Kursraum. Wenn Sie etwas speichern möchten, bringen Sie einen USB-Stick mit."),
    ("Frau Haddad", "Prima, vielen Dank!"),
])

s += [CondPageBreak(50 * mm), R("Übung 4 · Teil 4: Lösungen", "solh"),
      R("<b>18 Frau Petrenko: c · 19 Herr Abdi: f · 20 Frau Lindner: a</b> · übrig: b, d und e", "sol"),
      R("18 c: „Und auch sie hilft schon … Man muss ihnen nur einfache Aufgaben geben.“ "
        "<b>Falle b:</b> Sie spricht über Geld – aber: „Geld gibt es dafür bei uns nicht.“", "sol"),
      R("19 f: „Das brauchen sie später, wenn sie allein wohnen.“ Seine Geschichte vom Studium ist das Beispiel dazu.", "sol"),
      R("20 a: „Helfen ja, aber Hausaufgaben und Lernen müssen zuerst kommen.“ "
        "<b>Falle d:</b> „Hausarbeit ist nicht nur Sache der Eltern.“ – sie sagt das Gegenteil.", "sol")]

s += script(f"Teil 4 · Radiosendung „{THEMA}“", [
    ("Moderator", f"Hallo und herzlich willkommen zu „Mittags im Gespräch“! Unser Thema heute: {THEMA} "
                  "Bei mir am Telefon ist Frau Petrenko. Frau Petrenko, Sie haben drei Kinder. Wie ist das bei Ihnen?"),
    ("Frau Petrenko", "Ja, und die Kleinste ist erst drei. Und auch sie hilft schon: Sie deckt den Tisch, also Löffel und "
                      "Servietten, und sie räumt ihre Spielsachen auf. Kleine Kinder machen das sogar gern, die wollen "
                      "helfen! Man muss ihnen nur einfache Aufgaben geben. Geld gibt es dafür bei uns nicht – wir sind "
                      "eine Familie, da hilft jeder mit."),
    ("Moderator", "Danke schön. Und jetzt Herr Abdi, Vater von zwei Kindern. Herr Abdi, was meinen Sie?"),
    ("Herr Abdi", "Ich erzähle mal von mir. Als Kind musste ich zu Hause gar nichts machen, meine Mutter hat alles gemacht. "
                  "Mit neunzehn bin ich für das Studium allein in eine andere Stadt gezogen. Ich konnte nicht kochen, "
                  "nicht waschen, gar nichts! Die ersten Wochen waren schrecklich. Deshalb lernen meine Kinder das jetzt: "
                  "Wäsche waschen, einfache Gerichte kochen, einkaufen. Das brauchen sie später, wenn sie allein wohnen."),
    ("Moderator", "Vielen Dank. Und zum Schluss Frau Lindner. Sie arbeiten als Sozialarbeiterin an einer Gesamtschule."),
    ("Frau Lindner", "Ich finde es richtig, wenn Kinder zu Hause mithelfen. Hausarbeit ist nicht nur Sache der Eltern. "
                     "Ich erlebe aber oft, dass Jugendliche zu Hause sehr viel machen müssen – auf die kleinen Geschwister "
                     "aufpassen, kochen, putzen. Dann bleibt keine Zeit für die Schule. Das ist nicht gut. Helfen ja, aber "
                     "Hausaufgaben und Lernen müssen zuerst kommen. Besonders vor Prüfungen."),
])

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
