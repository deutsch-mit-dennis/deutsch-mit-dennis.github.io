# Arbeitsblatt telc Deutsch B2 (allgemein): Thema „Wohnen, Stadt und Zusammenleben“
# Wortschatz, Leseverstehen (Stil Teil 2), Hörverstehen (Stil Teil 2), Mündlich Teil 2, Schriftlicher Ausdruck.
# Eigene Übungstexte im Stil der Prüfung, keine telc-Originale. Formate: tools/pdf/b2-formate-offiziell.md
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b2-thema-wohnen-und-zusammenleben.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, TINTE, fallback
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak  # noqa

SLUG = "b2-thema-wohnen-und-zusammenleben"
TITLE = "telc B2 Themen: Wohnen, Stadt und Zusammenleben"
HEAD = "telc B2 Thema: Wohnen, Stadt und Zusammenleben"  # page header (max. 70 characters)
LEVEL = "B2"
KICK = "B2 · Thema · Arbeitsblatt · telc Deutsch B2"
H1 = "Wohnen, Stadt und Zusammenleben"
LEAD = ("Wohnungssuche, Nachbarschaft, Leben in der Stadt: Wortschatz, Lesen, Hören, Diskutieren und Schreiben zu einem "
        "typischen Alltagsthema der telc-B2-Prüfung.")

WORDS = [
    ("die Miete", "die Miete, -n", "Die Miete wird am Monatsanfang überwiesen."),
    ("die Nebenkosten", "die Nebenkosten (nur Pl.)", "Die Nebenkosten sind dieses Jahr gestiegen."),
    ("die Kaution", "die Kaution, -en", "Die Kaution bekommt man beim Auszug in der Regel zurück."),
    ("der Mietvertrag", "der Mietvertrag, Mietverträge", "Lesen Sie den Mietvertrag genau durch."),
    ("der Vermieter / die Vermieterin", "Pl. Vermieter / Vermieterinnen", "Die Vermieterin wohnt im Erdgeschoss."),
    ("die Hausverwaltung", "die Hausverwaltung, -en", "Die Hausverwaltung kümmert sich um Reparaturen."),
    ("die Hausordnung", "die Hausordnung, -en", "In unserer Hausordnung steht: ab 22 Uhr Ruhe."),
    ("die Ruhezeit", "die Ruhezeit, -en", "Bitte halten Sie die Ruhezeiten ein."),
    ("die Nachbarschaft", "die Nachbarschaft, -en", "In unserer Nachbarschaft hilft man sich."),
    ("die Wohngemeinschaft (WG)", "die Wohngemeinschaft (WG), -en", "Ich wohne mit zwei Kolleginnen in einer WG."),
    ("der Stadtteil", "der Stadtteil, -e", "Unser Stadtteil hat viele kleine Geschäfte."),
    ("der Wohnraum", "der Wohnraum (nur Sg.)", "Bezahlbarer Wohnraum ist knapp."),
    ("die Wohnungsnot", "die Wohnungsnot (nur Sg.)", "Die Wohnungsnot trifft besonders Familien."),
    ("die Grünfläche", "die Grünfläche, -n", "Die Stadt braucht mehr Grünflächen."),
    ("die Lärmbelästigung", "die Lärmbelästigung, -en", "Wegen Lärmbelästigung kam die Polizei."),
    ("einziehen", "zieht ein – zog ein – ist eingezogen", "Wir sind im März eingezogen."),
    ("ausziehen", "zieht aus – zog aus – ist ausgezogen", "Meine Mitbewohnerin zieht nächsten Monat aus."),
    ("kündigen", "kündigt – kündigte – hat gekündigt", "Er hat seine Wohnung fristgerecht gekündigt."),
    ("sich beschweren über + Akk.", "beschwert sich – beschwerte sich – hat sich beschwert",
     "Sie hat sich über den Lärm beschwert."),
    ("sich einleben", "lebt sich ein – lebte sich ein – hat sich eingelebt", "Die Kinder haben sich schnell eingelebt."),
    ("sich verstehen mit + Dat.", "versteht sich – verstand sich – hat sich verstanden",
     "Ich verstehe mich gut mit meinen Nachbarn."),
    ("renovieren", "renoviert – renovierte – hat renoviert", "Vor dem Einzug haben wir die Küche renoviert."),
    ("Rücksicht nehmen auf + Akk.", "nimmt – nahm – hat genommen", "Bitte nehmen Sie Rücksicht auf die Nachbarn."),
    ("zur Untermiete wohnen", "wohnt – wohnte – hat gewohnt", "Sie wohnt zur Untermiete bei einer Familie."),
    ("einen Streit schlichten", "schlichtet – schlichtete – hat geschlichtet", "Ein Mediator hat den Streit geschlichtet."),
]
GAP_BOX = ["Kaution", "Nebenkosten", "eingelebt", "beschwert", "Ruhezeiten", "gekündigt", "Hausordnung", "Untermiete"]
GAPS = [
    "Beim Einzug mussten wir zwei Monatsmieten als ___ bezahlen.",
    "Die Miete ist nicht sehr hoch, aber die ___ für Heizung und Wasser sind stark gestiegen.",
    "Nach einem halben Jahr habe ich mich in dem neuen Stadtteil gut ___.",
    "Ein Nachbar hat sich bei der Hausverwaltung über unsere Party ___.",
    "In der ___ steht, dass man Fahrräder nicht im Treppenhaus abstellen darf.",
    "Unser Vermieter braucht die Wohnung für seine Tochter, deshalb hat er uns ___.",
]
GAP_SOL = ["Kaution", "Nebenkosten", "eingelebt", "beschwert", "Hausordnung", "gekündigt"]
GAP_REST = ["Ruhezeiten", "Untermiete"]

ART_TITLE = "Ein Zimmer gegen Hilfe"
ART_SUB = "Beim Projekt „Wohnen für Hilfe“ ziehen Studierende bei älteren Menschen ein. Statt Miete zu zahlen, helfen sie im Alltag."
ART = [
    "Wenn Ruth Stein, 82, morgens in die Küche kommt, steht der Kaffee schon auf dem Tisch. Gekocht hat ihn Diego Morales, "
    "24, der seit Oktober in ihrem ehemaligen Arbeitszimmer wohnt. Der Student aus Kolumbien macht in Eichental seinen "
    "Master in Umwelttechnik. Eine bezahlbare Wohnung hatte er monatelang vergeblich gesucht. „Ich habe in drei Monaten "
    "fünf verschiedene Sofas von Freunden kennengelernt“, sagt er und lacht.",
    "Vermittelt hat die beiden das Projekt „Wohnen für Hilfe“, das die Stadt gemeinsam mit dem Studierendenwerk "
    "organisiert. Das Prinzip: Ältere Menschen, die allein in einer großen Wohnung leben, stellen ein Zimmer zur "
    "Verfügung. Die Studierenden zahlen keine Miete, sondern nur einen Anteil an den Nebenkosten. Dafür helfen sie im "
    "Alltag – als Faustregel gilt eine Stunde Hilfe pro Monat für jeden Quadratmeter Wohnfläche. Pflege gehört "
    "ausdrücklich nicht dazu.",
    "Für Diego bedeutet das: Er kauft ein, trägt die Getränkekisten in den dritten Stock, kümmert sich um den kleinen "
    "Garten und hat Frau Stein gezeigt, wie man mit dem Tablet Videoanrufe macht. „Meine Enkelin lebt in Kanada“, sagt "
    "sie. „Früher habe ich sie zweimal im Jahr am Telefon gehört. Jetzt sehe ich sie jeden Sonntag.“",
    "Ganz ohne Konflikte geht es nicht. In den ersten Wochen störte sich Frau Stein daran, dass Diego spät nach Hause kam "
    "und dann noch duschte. Er wiederum fand es anstrengend, ständig gefragt zu werden, wo er gewesen sei. Eine "
    "Mitarbeiterin des Projekts kam vorbei und half den beiden, klare Absprachen zu treffen: Nach 22 Uhr wird nicht mehr "
    "geduscht, und Diego sagt Bescheid, wenn er über Nacht wegbleibt. „Seitdem klappt es gut“, sagen beide.",
    "Projektleiterin Hannah Becker-Yılmaz sieht großes Potenzial. In vielen Städten fehle bezahlbarer Wohnraum, "
    "gleichzeitig lebten viele ältere Menschen allein in Wohnungen, die eigentlich zu groß für sie seien. „Wir lösen damit "
    "nicht die Wohnungsnot“, betont sie. „Aber wir bringen Menschen zusammen, die sich sonst nie begegnet wären.“ "
    "Schwierig sei vor allem, genug Seniorinnen und Senioren zu finden. Viele hätten Angst, einen fremden Menschen in "
    "ihre Wohnung zu lassen.",
    "Ruth Stein kann das verstehen. „Ich hatte auch Bedenken“, sagt sie. „Aber jetzt ist es, als hätte ich noch einen "
    "Enkel bekommen. Einen, der sogar die Glühbirnen wechselt.“",
]
MC = [
    ("Warum wohnt Diego bei Ruth Stein?",
     ["Er wollte nicht allein in einer Wohnung leben.", "Er hatte lange keine bezahlbare Wohnung gefunden.",
      "Er kannte Frau Stein schon vorher aus der Nachbarschaft."]),
    ("Was gilt im Projekt „Wohnen für Hilfe“?",
     ["Die Studierenden übernehmen auch die Pflege.", "Die Studierenden zahlen keine Nebenkosten.",
      "Wie viel man hilft, hängt von der Wohnfläche ab."]),
    ("Was hat sich für Frau Stein verbessert?",
     ["Sie sieht ihre Enkelin regelmäßig per Video.", "Ihre Enkelin besucht sie jetzt jeden Sonntag.",
      "Sie telefoniert zweimal im Jahr mit Kanada."]),
    ("Wie wurden die Konflikte gelöst?",
     ["Diego ist in ein anderes Zimmer umgezogen.", "Die beiden haben mit Unterstützung Regeln vereinbart.",
      "Frau Stein hat sich beim Studierendenwerk beschwert."]),
    ("Was sagt Hannah Becker-Yılmaz?",
     ["Das Projekt kann die Wohnungsnot in den Städten lösen.",
      "Es gibt mehr interessierte Senioren als Studierende.",
      "Viele ältere Menschen zögern, jemanden bei sich aufzunehmen."]),
]
MC_SOL = [
    ("b", "„Eine bezahlbare Wohnung hatte er monatelang vergeblich gesucht“. Falsch: a) und c) stehen nicht im Text."),
    ("c", "„eine Stunde Hilfe pro Monat für jeden Quadratmeter Wohnfläche“. Falsch: a) „Pflege gehört ausdrücklich nicht dazu“. b) Sie zahlen „einen Anteil an den Nebenkosten“."),
    ("a", "„Jetzt sehe ich sie jeden Sonntag“ – per Videoanruf. Falsch: b) Die Enkelin lebt in Kanada. c) So war es „früher“."),
    ("b", "Eine Mitarbeiterin half, „klare Absprachen zu treffen“. Falsch: a) und c) stehen nicht im Text."),
    ("c", "„Viele hätten Angst, einen fremden Menschen in ihre Wohnung zu lassen.“ Falsch: a) „Wir lösen damit nicht die Wohnungsnot“. b) Gegenteil: Es fehlen Seniorinnen und Senioren."),
]

HOER_SIT = "Sie hören im Radio die Sendung „Stadtgespräch“. Die Moderatorin spricht mit einem Nachbarschaftsmediator."
HOER = [
    ("Moderatorin", "Willkommen beim „Stadtgespräch“. Heute geht es um Ärger mit den Nachbarn. Zu Gast ist Amadou Diallo. "
                    "Er arbeitet ehrenamtlich als Mediator im Nachbarschaftsverein Eichental-Nord. Herr Diallo, worüber "
                    "streiten sich Nachbarn am häufigsten?"),
    ("Diallo", "Ganz klar: über Lärm. Laute Musik, Kinder, die in der Wohnung herumrennen, oder jemand, der um sechs Uhr "
               "morgens bohrt. Danach kommen Müll im Hof und Fahrräder im Treppenhaus. Oft sind es Kleinigkeiten, die sich "
               "über Monate aufgestaut haben."),
    ("Moderatorin", "Was raten Sie, wenn mich etwas stört?"),
    ("Diallo", "Möglichst früh und persönlich ansprechen – und zwar in einem ruhigen Moment, nicht nachts um zwölf, wenn "
               "man wütend ist. Und bitte keine Zettel an die Tür hängen! Die werden fast immer als Angriff verstanden."),
    ("Moderatorin", "Und wenn das Gespräch nichts bringt?"),
    ("Diallo", "Dann kann man sich an uns wenden. Wir laden beide Seiten zu einem Gespräch ein, das neutral und vertraulich "
               "ist. Wir entscheiden nicht, wer recht hat. Wir helfen den Nachbarn, selbst eine Lösung zu finden. Das "
               "Angebot ist kostenlos."),
    ("Moderatorin", "Wie erfolgreich sind Sie damit?"),
    ("Diallo", "Natürlich klappt es nicht immer. Aber oft finden die Leute eine Lösung, mit der beide leben können. Ein "
               "Gerichtsverfahren dagegen dauert lange, kostet Geld – und danach grüßt man sich im Treppenhaus garantiert "
               "nicht mehr."),
    ("Moderatorin", "Herr Diallo, vielen Dank für das Gespräch."),
]
RF = [
    ("Herr Diallo wird für seine Arbeit als Mediator bezahlt.", False),
    ("Am häufigsten streiten Nachbarn wegen Lärm.", True),
    ("Herr Diallo empfiehlt, Probleme zuerst mit einem Zettel an der Tür anzusprechen.", False),
    ("Die Mediatoren entscheiden, welche Seite recht hat.", False),
    ("Für die Mediation muss man nichts bezahlen.", True),
    ("Nach Meinung von Herrn Diallo schadet ein Gerichtsverfahren oft der Beziehung zwischen Nachbarn.", True),
]
RF_WHY = [
    "Er arbeitet „ehrenamtlich“.",
    "„Ganz klar: über Lärm.“",
    "„bitte keine Zettel an die Tür hängen“ – besser persönlich.",
    "„Wir entscheiden nicht, wer recht hat.“",
    "„Das Angebot ist kostenlos.“",
    "„danach grüßt man sich im Treppenhaus garantiert nicht mehr“.",
]

DISK_TITLE = "Bauen statt Grün?"
DISK = (
    "In vielen Städten sind Wohnungen knapp und teuer. Die Stadtverwaltung von Eichental will deshalb am Rand des "
    "Stadtparks rund 400 neue Wohnungen bauen lassen, ein Drittel davon mit günstigen Mieten. Befürworter sagen, ohne "
    "neuen Wohnraum würden Familien, Auszubildende und Menschen mit kleinem Einkommen aus der Stadt verdrängt. Wer schon "
    "eine Wohnung habe, dürfe anderen nicht den Weg in die Stadt versperren. Gegner wollen den Park erhalten. Grünflächen "
    "seien wichtig für das Stadtklima, für die Erholung und für Kinder ohne eigenen Garten. Sie fordern, zuerst leer "
    "stehende Büros und Parkhäuser in Wohnungen umzubauen."
)
PRO = ["mehr bezahlbare Wohnungen", "Familien bleiben in der Stadt", "kurze Wege zu Arbeit und Schule"]
CONTRA = ["Grünflächen sind wichtig fürs Stadtklima", "weniger Platz für Erholung und Kinder",
          "besser: leere Gebäude umbauen"]
DISK_Q = ["Wie haben Sie Ihre Wohnung gefunden?", "Was ist Ihnen in Ihrem Stadtteil wichtig?",
          "Wie ist das in Ihrem Herkunftsland?", "Welcher Kompromiss wäre möglich?"]

MAIL_SIT = ("Sie wohnen seit einem Jahr in einer Mietwohnung. Seit drei Wochen funktioniert die Heizung im Schlafzimmer "
            "nicht richtig. Sie haben schon bei der Hausverwaltung angerufen, aber es ist nichts passiert. Schreiben Sie "
            "eine E-Mail an die zuständige Mitarbeiterin der Hausverwaltung, Frau Albers.")
MAIL_LP = ["Beschreibung des Problems", "bisherige Versuche, die Hausverwaltung zu erreichen",
           "Folgen für Sie und Ihre Familie", "Ihre Erwartungen (z. B. Termin für die Reparatur)"]
MUSTER_LP = "Problem, bisherige Versuche, Erwartungen"
MUSTER = [
    "<b>Betreff:</b> Defekte Heizung in der Wohnung Lindenstraße 14, 2. OG links",
    "Sehr geehrte Frau Albers,",
    "ich wende mich heute an Sie, weil die Heizung in meiner Wohnung seit drei Wochen nicht richtig funktioniert. Der "
    "Heizkörper im Schlafzimmer bleibt kalt, obwohl er voll aufgedreht ist. In den anderen Zimmern ist alles in Ordnung. Ich habe den Heizkörper "
    "auch schon entlüftet, aber das hat leider nicht geholfen.",
    "Ich habe das Problem bereits zweimal telefonisch gemeldet, zuletzt am vergangenen Montag. Beide Male wurde mir "
    "versprochen, dass sich ein Handwerker bei mir meldet. Leider hat sich bis heute niemand gemeldet, und auch auf meine "
    "Nachricht auf dem Anrufbeantworter habe ich keine Antwort bekommen.",
    "Da es nachts inzwischen sehr kalt ist, bitte ich Sie dringend, die Reparatur so schnell wie möglich zu veranlassen. "
    "Könnten Sie mir bitte bis Ende dieser Woche einen Termin nennen? Ich bin an den Vormittagen gut erreichbar und kann "
    "auch kurzfristig zu Hause sein.",
    "Vielen Dank für Ihre Unterstützung. Ich hoffe auf eine baldige Rückmeldung.",
    "Mit freundlichen Grüßen<br/>Samir Haddou",
]

# ── Render (same layout for all B2 theme sheets) ──
BOX = sym("☐")
BL = '<font color="#8A93A8">______</font>'
_R = R
R = lambda html, s="p": _R(fallback(html) if "<font name" not in html else html, s)
st["txt"] = ParagraphStyle("txt", parent=st["cell"], fontSize=10, leading=13.4)
st["art"] = ParagraphStyle("art", parent=st["cell"], fontSize=9.9, leading=13)
st["wd"] = ParagraphStyle("wd", parent=st["cell"], fontSize=9.1, leading=11)
st["q"] = ParagraphStyle("q", parent=st["item"], fontSize=10.3, leading=13, spaceAfter=0.5, spaceBefore=2.5)
st["opt"] = ParagraphStyle("opt", parent=st["item"], fontSize=10, leading=12.3, spaceAfter=0.3)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.4, leading=11.8, spaceAfter=1)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=4, spaceAfter=1.5)
st["dlg"] = ParagraphStyle("dlg", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=2)
st["mu"] = ParagraphStyle("mu", parent=st["cell"], fontSize=9.4, leading=12, spaceAfter=3)


def tbl(rows, widths, style_extra=()):
    t = Table(rows, colWidths=[w * mm for w in widths])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5)] + list(style_extra)))
    return t


REDEMITTEL = [
    ("Inhalt wiedergeben", "In dem Text geht es um … · Der Text beschreibt zwei Positionen: … · "
                           "Befürworter meinen, dass … Kritiker halten dagegen, dass …"),
    ("Meinung äußern", "Meiner Meinung nach … · Ich bin der Ansicht, dass … · Aus eigener Erfahrung kann ich sagen, dass …"),
    ("zustimmen", "Da haben Sie / hast du völlig recht. · Das sehe ich genauso, denn … · Das ist ein wichtiger Punkt."),
    ("widersprechen", "Da bin ich anderer Meinung. · Das stimmt zwar, aber … · Ich sehe das etwas anders: …"),
    ("nachfragen", "Wie meinen Sie / meinst du das genau? · Können Sie / Kannst du ein Beispiel nennen?"),
    ("Vorschlag, Kompromiss", "Wie wäre es, wenn …? · Man könnte doch … · Wir sind uns also einig, dass …"),
]

s = [R(KICK, "kick"), R(H1, "h1"), R(LEAD, "lead")]
s += [box(R(
    "<b>Was Sie hier üben:</b> Themen-Wortschatz · Leseverstehen im Stil von Teil 2 (Multiple Choice) · Hörverstehen im Stil "
    "von Teil 2 (Interview, richtig/falsch) · Mündlich Teil 2 (Diskussion über einen Zeitungstext) · Schriftlicher Ausdruck "
    "(halbformelle E-Mail mit Leitpunkten). Alle Texte sind eigene Übungstexte; Namen und Orte sind erfunden, "
    "Zahlen sind Beispielzahlen und keine echte Statistik.", "cell"), SOFT, TINTE), Spacer(1, 2)]

# Übung 1: vocabulary
s += task(1, "Themen-Wortschatz", "Lesen Sie die Wörter und Beispiele. Markieren Sie fünf Wörter, die für Sie neu sind, "
          "und schreiben Sie mit jedem einen eigenen Satz.", 1)
wrows = [[R("<b>Wort / Wendung</b>", "wd"), R("<b>Plural / Präteritum – Perfekt</b>", "wd"), R("<b>Beispiel</b>", "wd")]]
def _forms(w, f):
    if f.startswith(w + ", "): return "Pl. " + f[len(w) + 2:]
    if f.startswith(w + " ("): return f[len(w) + 2:-1]
    parts = f.split(" – ")
    return " – ".join(parts[1:]) if len(parts) == 3 else f
wrows += [[R(f"<b>{w}</b>", "wd"), R(_forms(w, f), "wd"), R(f"<i>{b}</i>", "wd")] for w, f, b in WORDS]
s += [tbl(wrows, [48, 44, 82], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]

# Übung 2: vocabulary in context
s += [KeepTogether(task(2, "Wortschatz anwenden", "Ergänzen Sie die Sätze mit Wörtern aus dem Kasten. Achten Sie auf die "
          "richtige Form. Zwei Wörter bleiben übrig.", 1)
      + [box(R(" · ".join(f"<b>{w}</b>" for w in GAP_BOX), "cell"), NOTE, GELB), Spacer(1, 2)]
      + [R(f"<b>{i}.</b> {t.replace('___', GAP)}", "item") for i, t in enumerate(GAPS, 1)])]

# Übung 3: reading (telc Leseverstehen Teil 2 style)
s += [Spacer(1, 4)]
s += task(3, "Leseverstehen: Detailverstehen", "Lesen Sie den Zeitungsartikel und lösen Sie die Aufgaben 1–5. Welche Lösung "
          "(a, b oder c) ist richtig? Kreuzen Sie an. (Stil: telc B2, Leseverstehen Teil 2)", 2)
arows = [[[R(f"<b>{ART_TITLE}</b>", "h3"), R(f"<i>{ART_SUB}</i>", "small")]]] + [[R(p, "art")] for p in ART]
s += [tbl(arows, [174], [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
                         ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 1)]
for i, (q, opts) in enumerate(MC, 1):
    s += [KeepTogether([R(f"<b>{i}. {q}</b>", "q")] + [R(f"{BOX} {chr(97 + j)}) {o}", "opt") for j, o in enumerate(opts)])]

# Übung 4: listening (telc Hörverstehen Teil 2 style)
u4 = task(4, "Hörverstehen: Radio-Interview", "Sie hören ein Interview <b>einmal</b>. Lesen Sie vorher 60 Sekunden lang die "
          "Aussagen 1–6. Sind sie richtig oder falsch? (Stil: telc B2, Hörverstehen Teil 2)", 2)
u4 += [box(R("<b>Ohne Audio üben:</b> Eine Partnerin, ein Partner oder die Lehrkraft liest den Text „Hörtext zum Vorlesen“ "
             "(nach Übung 6) in normalem Tempo vor. Wer übt, schaut <b>nicht</b> in den Text.", "cell"), NOTE, GELB),
       Spacer(1, 3), R(f"<i>{HOER_SIT}</i>", "small")]
rf = [[R(f"<b>{i}</b>", "txt"), R(t, "txt"), R(f"{BOX} richtig   {BOX} falsch", "txt")] for i, (t, _) in enumerate(RF, 1)]
u4 += [tbl(rf, [8, 128, 38], [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [KeepTogether(u4)]

# Übung 5: speaking part 2
s += task(5, "Mündlich Teil 2: Diskussion", "Bereiten Sie sich vor (in der Prüfung: 20 Minuten für Teil 2 und 3). Geben Sie "
          "den Text zuerst kurz wieder (höchstens 1 Minute). Diskutieren Sie dann ca. 5 Minuten mit Ihrer Partnerin / "
          "Ihrem Partner: Sagen Sie Ihre Meinung, begründen Sie sie und reagieren Sie auf die Argumente.", 3)
s += [tbl([[[R(f"<b>{DISK_TITLE}</b>", "h3"), R(DISK, "art")]]], [174],
          [("BACKGROUND", (0, 0), (-1, -1), HELLGRUEN), ("LEFTPADDING", (0, 0), (-1, -1), 10),
           ("RIGHTPADDING", (0, 0), (-1, -1), 10)]), Spacer(1, 3)]
s += [KeepTogether([R("Ideen für die Diskussion", "h3"), tbl([[R("<b>Pro</b>", "wd"), R("<b>Contra</b>", "wd")],
           [R("<br/>".join(f"+ {x}" for x in PRO), "wd"), R("<br/>".join(f"– {x}" for x in CONTRA), "wd")]],
          [87, 87], [("BACKGROUND", (0, 0), (-1, 0), SOFT), ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                     ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE)])])]
s += [R("Redemittel", "h3")]
s += [tbl([[R(f"<b>{a}</b>", "wd"), R(b, "wd")] for a, b in REDEMITTEL], [38, 136],
          [("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE)])]
s += [R("<b>Fragen für die Diskussion:</b> " + " · ".join(DISK_Q), "small")]

# Übung 6: writing
u6 = task(6, "Schriftlicher Ausdruck: halbformelle E-Mail", "Schreiben Sie eine E-Mail (mindestens 150 Wörter, 30 Minuten). "
          "Behandeln Sie <b>drei</b> der vier Leitpunkte – oder <b>zwei</b> Leitpunkte und einen eigenen Aspekt. Denken Sie an "
          "Betreff, Anrede, Einleitung, Schluss und Gruß. In der Prüfung wählen Sie zwischen zwei Aufgaben.", 3)
u6 += [box([R(MAIL_SIT, "cell"), Spacer(1, 3)] + [R(f"{sym('▸')} {lp}", "cell") for lp in MAIL_LP], NOTE, GELB),
       Spacer(1, 3),
       R("<b>Tipp:</b> Jeder Leitpunkt bekommt einen eigenen Absatz mit 2–3 Sätzen: Frage oder Anliegen + eigene Situation + "
         "Grund. Siezen Sie die Person durchgehend.", "small")]
s += [KeepTogether(u6)]

# listening text to read aloud
s += [CondPageBreak(70 * mm), Spacer(1, 6), R("Hörtext zum Vorlesen (Partner/Lehrkraft)", "h2"),
      R("Bitte erst nach Übung 4 lesen. Lesen Sie in normalem Tempo und nur einmal vor.", "small")]
s += [R(f"<b>{sp}:</b> {t}", "dlg") for sp, t in HOER]

# solutions
s += [Spacer(1, 4), KeepTogether([
    R("Lösungen", "h2"), R("Zum Selbstkontrollieren – erst üben, dann nachschauen!", "small"),
    R(f"Übung 2 · Wortschatz (übrig: {', '.join(GAP_REST)})", "solh"),
    R(" · ".join(f"<b>{i}</b> {w}" for i, w in enumerate(GAP_SOL, 1)), "sol")])]
s += [R("Übung 3 · Leseverstehen", "solh")] + [R(f"<b>{i} – {a}</b>  {b}", "sol") for i, (a, b) in enumerate(MC_SOL, 1)]
s += [R("Übung 4 · Hörverstehen", "solh")] + [
    R(f"<b>{i} – {'richtig' if ok else 'falsch'}</b>  {RF_WHY[i - 1]}", "sol") for i, (_, ok) in enumerate(RF, 1)]
s += [KeepTogether([R("Übung 6 · Mustertext (Leitpunkte: " + MUSTER_LP + ")", "solh"),
      box([R(p, "mu") for p in MUSTER], HELLGRUEN, GRUEN)]),
      R(f"<i>Ca. {sum(len(p.split()) for p in MUSTER[1:])} Wörter ohne Betreff. Ihr Text darf anders aussehen – wichtig sind "
        "Leitpunkte, Absätze, passende Anrede und Schluss.</i>", "small")]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
