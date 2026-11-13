# Arbeitsblatt DTB B2 Prüfung: Lesen Teil 1 (Informationen zum Arbeitsmarkt) – Kurzmeldungen aus einer Wirtschaftszeitung
# Format laut offiziellem Modelltest DTB B2 (telc, 2022), siehe tools/pdf/b2-formate-offiziell.md:
# 5 Personen, 8 kurze Artikel/Anrisse (a–h), 3 bleiben übrig, Aufgaben 1–5, je 3 Punkte. Eigene Texte, keine Originalaufgaben.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-lesen-teil-1-wirtschaft.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle

SLUG = "dtb-b2-lesen-teil-1-wirtschaft"
TITLE = "DTB B2 Lesen Teil 1: Kurzmeldungen aus der Wirtschaftszeitung"
HEAD = "DTB B2 Lesen Teil 1: Kurzmeldungen aus der Wirtschaftszeitung"  # page header (max. 70 characters)
LEVEL = "B2"


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["mat"] = ParagraphStyle("mat", parent=st["cell"], fontSize=9.5, leading=12)
st["sit"] = ParagraphStyle("sit", parent=st["item"], fontSize=10.3, leading=13.4, spaceAfter=2.5)
st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=10, leading=13, spaceAfter=2)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.5, leading=11.8, leftIndent=10, firstLineIndent=-10, spaceAfter=2)

LINE_ = '<font color="#8A93A8">____</font>'


def tips_traps(title, tips, traps):
    """Two boxes side by side: strategy (green) and traps (yellow)."""
    left = [R("<b>So gehen Sie vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate(tips, 1)]
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


def paper(issue, ads):
    """Newspaper block: masthead + 8 short articles in two columns."""
    mast = R(f'<font size="12"><b>Westfälischer Wirtschaftsbote</b></font>   '
             f'<font color="#566078">{issue} · Arbeit und Karriere</font>', "cell")
    cells = [[R(f"<b>{h}</b><br/>{t}", "mat") for h, t in ads[i:i + 2]] for i in range(0, 8, 2)]
    t = Table([[mast, ""]] + cells, colWidths=[87 * mm, 87 * mm])
    t.setStyle(TableStyle([("SPAN", (0, 0), (1, 0)), ("BACKGROUND", (0, 0), (1, 0), SOFT),
                           ("LINEBELOW", (0, 0), (1, 0), 1.2, HexColor("#2341B5")),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOX", (0, 0), (-1, -1), 0.4, LINE),
                           ("INNERGRID", (0, 1), (-1, -1), 0.4, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 6),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 4),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    return t


from reportlab.lib.colors import HexColor

HINT = ("Lesen Sie die Situationen 1–5 und die Kurzmeldungen a–h. Welche Meldung ist für welche Person interessant? "
        "Jede Meldung können Sie nur einmal verwenden. Drei Meldungen bleiben übrig.")

# ───────────────────────── Kopf + So läuft der Teil ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Arbeitsblatt · Lesen Teil 1", "kick"),
    R("DTB B2 Lesen Teil 1: Kurzmeldungen", "h1"),
    R("Stellen, Weiterbildung, Gründung: Fünf Menschen suchen Informationen zum Arbeitsmarkt – Sie finden die passende "
      "Meldung in der Wirtschaftszeitung. Zwei komplette Übungssätze im Format der Prüfung.", "lead"),
    R("So läuft der Teil (laut Modelltest, telc 2022)", "h2"),
    table([
        ["<b>Was?</b>", "<b>So ist es in der Prüfung</b>"],
        ["Thema", "Informationen zum Arbeitsmarkt: kurze Artikel oder Anrisse (Anfang eines Artikels)"],
        ["Aufgabe", "Zuordnung: 5 Personen (Aufgaben 1–5) und 8 kurze Texte (a–h). Jeder Text passt höchstens einmal, "
                    "<b>drei Texte bleiben übrig</b>."],
        ["Punkte", "5 × 3 = <b>15 Punkte</b> (die Fertigkeit Lesen hat insgesamt 60 Punkte)"],
        ["Zeit", "45 Minuten für Lesen Teil 1–4 zusammen. Unsere Empfehlung (nicht offiziell): ca. 10–12 Minuten für Teil 1."],
    ], [26, 148]),
    Spacer(1, 2),
    tips_traps("Strategie für Teil 1",
        ["Lesen Sie zuerst die fünf Situationen. Unterstreichen Sie bei jeder Person 2–3 <b>harte Bedingungen</b> "
         "(z. B. <i>ohne Studium, von zu Hause aus, kostenlos</i>).",
         "Überfliegen Sie dann alle acht Meldungen: Für <b>wen</b> ist die Meldung? Was wird angeboten?",
         "Prüfen Sie jede mögliche Meldung gegen <b>alle</b> Bedingungen der Person.",
         "Beginnen Sie mit der leichtesten Person, schreiben Sie den Buchstaben sofort ein und streichen Sie die Meldung durch.",
         "Zum Schluss: Drei Meldungen müssen übrig sein. Fragen Sie: Warum passt diese Meldung zu niemandem?"],
        ["Die Überschrift passt – der Text aber nicht. Lesen Sie immer den ganzen Anriss.",
         "Gleiche Branche, falsche Zielgruppe: Die Meldung richtet sich an Schulabgänger, Studierte oder Absolventen.",
         "Eine Bedingung fehlt: <i>Vier-Tage-Woche</i> heißt nicht automatisch <i>weniger Stunden</i>.",
         "Kosten: <i>Wer zahlt?</i> – Firma, Förderung oder die Person selbst?"]),
]

# Wortschatz
s += [
    R("Wortschatz: typische Wörter in Wirtschaftsmeldungen", "h2"),
    table([
        ["<b>In der Meldung steht …</b>", "<b>Das bedeutet …</b>"],
        ["Stellen <b>schaffen</b> / Stellen <b>abbauen</b> (streichen)", "neue Arbeitsplätze anbieten / Arbeitsplätze wegnehmen"],
        ["<b>berufsbegleitend</b>, neben dem Beruf", "Man lernt und arbeitet gleichzeitig weiter."],
        ["<b>Voraussetzung</b> ist …; Bewerben können sich …", "Das braucht man unbedingt – hier steht die Zielgruppe."],
        ["<b>auf Kosten</b> des Unternehmens; Teilnehmende zahlen <b>selbst</b>", "Die Firma bezahlt. / Man bezahlt selbst."],
        ["<b>ausschließlich</b>, nur noch; <b>ausdrücklich</b> erwünscht", "nur so, keine Ausnahme / besonders gern gesehen"],
        ["einen <b>Zuschuss</b> bekommen; einen <b>Kredit</b> vermitteln", "Geld dazubekommen / Hilfe, Geld zu leihen"],
    ], [80, 94]),
]

# ───────────────────────── Übungssatz A ─────────────────────────
s += [PageBreak()]
s += task("1 · Satz A", "Wer liest welche Meldung?", HINT, 2)
sit_a = [
    "Oksana P. ist Pflegefachkraft aus der Ukraine. Ihr Antrag auf Anerkennung läuft noch. Sie möchte trotzdem schon in "
    "einem Krankenhaus arbeiten und sich dort auf die Kenntnisprüfung vorbereiten.",
    "Bilal H. arbeitet als Fachkraft für Lagerlogistik in Vollzeit. Weil er seine Mutter pflegt, möchte er weniger Stunden "
    "arbeiten – gern bei einem neuen Arbeitgeber in seiner Branche.",
    "Ngozi E. möchte einen eigenen Cateringservice gründen. Sie sucht eine Beratung, die nichts kostet, und einen kleinen "
    "Kredit für die Küchenausstattung.",
    "Tomasz K. ist Elektriker. Er möchte in die Solarbranche wechseln, aber weder eine neue Ausbildung noch ein Studium machen.",
    "Leyla M. ist Bankkauffrau und arbeitet im Kundenservice einer Filiale. Ihr Arbeitsweg ist sehr lang, deshalb sucht sie eine Stelle, "
    "bei der sie ganz von zu Hause aus arbeiten kann.",
]
s += [R(f"<b>{i}.</b> {t}   Meldung: {LINE_}", "sit") for i, t in enumerate(sit_a, 1)]
ads_a = [
    ("a) Vier Tage arbeiten, drei Tage frei",
     "Beim Logistiker Brandhorst in Hamm arbeiten ab Februar alle Lagerbeschäftigten nur noch an vier Tagen pro Woche. "
     "Die Wochenarbeitszeit bleibt bei 40 Stunden, die Schichten werden dafür auf zehn Stunden verlängert. Das Unternehmen "
     "hofft, so neue Fachkräfte zu gewinnen."),
    ("b) Klinikum setzt auf Pflegekräfte aus dem Ausland",
     "Das Klinikum Lindenhöhe in Bielefeld stellt ausländische Pflegefachkräfte ein, deren Anerkennung noch nicht "
     "abgeschlossen ist. Sie arbeiten zunächst als Pflegehelferinnen und -helfer und besuchen parallel einen Kurs zur "
     "Vorbereitung auf die Kenntnisprüfung. Die Kosten trägt das Klinikum."),
    ("c) Startkapital für kleine Gründungen",
     "Das Gründerinnenzentrum „Startraum“ in Gelsenkirchen berät Frauen, die sich selbstständig machen wollen – "
     "kostenlos und in mehreren Sprachen. Gemeinsam mit einer regionalen Bank vermittelt es Kleinkredite bis 25.000 Euro, "
     "zum Beispiel für Geräte oder Einrichtung."),
    ("d) Sonnige Aussichten für Ingenieure",
     "Der Solarmodulhersteller Helion Systems baut sein Werk in Unna aus und sucht 60 Ingenieurinnen und Ingenieure "
     "für Elektrotechnik. Voraussetzung ist ein abgeschlossenes Studium; Erfahrung in der Energiebranche ist von Vorteil."),
    ("e) Kundenberatung vom Küchentisch",
     "Die Versicherung Alteno in Münster stellt 40 Kundenberaterinnen und -berater ein. Gearbeitet wird ausschließlich "
     "im Homeoffice, Laptop und Headset stellt das Unternehmen. Gesucht werden Menschen mit Erfahrung im Telefonservice "
     "oder mit kaufmännischer Ausbildung."),
    ("f) Pflegeschule startet mit Rekord",
     "Die Pflegeschule am Evangelischen Krankenhaus Soest beginnt im April mit 90 Auszubildenden – so vielen wie nie. "
     "Die dreijährige Ausbildung zur Pflegefachfrau oder zum Pflegefachmann richtet sich vor allem an junge Menschen "
     "direkt nach der Schule."),
    ("g) In zwölf Wochen aufs Solardach",
     "Die Handwerkskammer bietet ab März eine zwölfwöchige Qualifizierung zur Solarfachkraft an. Teilnehmen können "
     "Elektrikerinnen und Elektriker sowie Dachdeckerinnen und Dachdecker mit abgeschlossener Berufsausbildung. "
     "Ein Studium ist nicht nötig."),
    ("h) Teilzeit im Lager ist kein Tabu mehr",
     "Der Onlinehändler Kaufnetz sucht für sein Lager in Dortmund Fachkräfte für Lagerlogistik. Neu ist: Bewerberinnen "
     "und Bewerber wählen ihre Wochenstunden selbst – zwischen 20 und 35 Stunden. Auch Schichten nur am Vormittag sind möglich."),
]
s += [Spacer(1, 3), paper("Ausgabe Montag, 9. November 2026", ads_a)]

# ───────────────────────── Übungssatz B ─────────────────────────
s += [PageBreak()]
s += task("2 · Satz B", "Wer liest welche Meldung?", HINT + " Diesmal ohne Hilfe – stoppen Sie die Zeit: höchstens 12 Minuten.", 3)
sit_b = [
    "Seda A. ist ausgebildete Erzieherin und wohnt in Köln. Sie möchte mit ihrer Familie aufs Land ziehen und dort "
    "arbeiten. Hilfe bei der Wohnungssuche wäre ihr sehr wichtig.",
    "Fatou D. studiert Betriebswirtschaft im fünften Semester. Sie sucht einen Job neben dem Studium, bei dem sie in "
    "der Prüfungszeit weniger arbeiten kann.",
    "Rüdiger H. ist 58 Jahre alt und Industriemechaniker. Sein Betrieb ist insolvent. Er sucht eine neue Stelle und "
    "hat Angst, dass die Firmen nur Jüngere einstellen.",
    "Mei L. ist Kauffrau im Groß- und Außenhandel und spricht fließend Chinesisch. Diese Sprachkenntnisse möchte sie "
    "im Beruf endlich nutzen.",
    "Darius N. ist Kfz-Mechatroniker und mit seiner Werkstatt unzufrieden. Er sucht einen neuen Arbeitgeber, bei dem er "
    "sich zu Elektroautos weiterbilden kann, ohne die Kosten selbst zu tragen.",
]
s += [R(f"<b>{i}.</b> {t}   Meldung: {LINE_}", "sit") for i, t in enumerate(sit_b, 1)]
ads_b = [
    ("a) Trainees für die Stadtwerke",
     "Die Stadtwerke Rheinfeld starten im Herbst ein 18-monatiges Traineeprogramm im kaufmännischen Bereich. Bewerben "
     "können sich Absolventinnen und Absolventen mit abgeschlossenem Bachelor oder Master in Wirtschaftswissenschaften."),
    ("b) Ostasiengeschäft wächst weiter",
     "Der Armaturenhersteller Brenner in Iserlohn hat seinen Umsatz in China in drei Jahren verdoppelt. Für das "
     "Exportteam in der Zentrale sucht das Unternehmen jetzt Kaufleute, die Chinesisch sprechen."),
    ("c) Landkreis hilft beim Neustart",
     "Der Landkreis Ebbetal sucht für die Kitas in seinen Dörfern pädagogische Fachkräfte. Wer neu anfängt, bekommt "
     "einen Zuschuss zum Umzug, und die Gemeinden helfen bei der Suche nach einer Wohnung."),
    ("d) Abendkurs Elektromobilität",
     "Ein privates Bildungsinstitut in Bochum bietet ab Januar den Abendkurs „Hochvolttechnik für Kfz-Berufe“ an. "
     "Der Kurs dauert vier Monate, die Gebühr von 1.450 Euro zahlen die Teilnehmenden selbst."),
    ("e) Neuer Markt in Polen",
     "Der Werkzeughersteller Ferrotec aus Remscheid eröffnet ein Vertriebsbüro in Wrocław. Für die Zentrale sucht er "
     "Exportkaufleute mit sehr guten Polnischkenntnissen."),
    ("f) Erfahrung zählt wieder",
     "Der Maschinenbauer Kessler &amp; Sohn in Siegen sucht Industriemechanikerinnen und -mechaniker für Montage und "
     "Wartung. Die Geschäftsführung betont: „Bewerbungen von Fachkräften über 50 sind uns ausdrücklich willkommen.“"),
    ("g) Weiterbildung auf Firmenkosten",
     "Die Autohausgruppe Okonkwo &amp; Lehmann sucht Kfz-Mechatronikerinnen und -Mechatroniker für fünf Standorte. "
     "Neue Mitarbeitende werden im ersten Jahr für Hochvolt-Systeme geschult – während der Arbeitszeit und auf Kosten "
     "des Unternehmens."),
    ("h) Werkstudierende mit flexiblen Stunden",
     "Der Energieversorger Lumenta bietet 30 Plätze für Werkstudierende in Controlling und Einkauf. Bis zu 20 Stunden "
     "pro Woche sind möglich; in der Prüfungszeit können die Stunden reduziert werden."),
]
s += [Spacer(1, 3), paper("Ausgabe Donnerstag, 12. November 2026", ads_b),
      R("Alle Firmen und Meldungen auf diesem Blatt sind erfunden. Echte Städtenamen dienen nur als Ortsangabe.", "small")]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen mit Begründung", "h2"), R("Erst üben, dann nachschauen! Je richtige Zuordnung 3 Punkte.", "small")]
s += [R("Satz A", "solh")] + [R(t, "sol") for t in [
    "<b>1 b</b> – „deren Anerkennung noch nicht abgeschlossen ist“ + „Kurs zur Vorbereitung auf die Kenntnisprüfung“. "
    "<i>Falle f:</i> auch Pflege, aber eine Ausbildung für junge Menschen nach der Schule – Oksana ist schon Fachkraft.",
    "<b>2 h</b> – Lagerlogistik, „Wochenstunden selbst – zwischen 20 und 35“. <i>Falle a:</i> Vier-Tage-Woche, aber weiter "
    "40 Stunden – Bilal möchte weniger Stunden, nicht weniger Tage.",
    "<b>3 c</b> – Gründung, „kostenlos“, „Kleinkredite … für Geräte oder Einrichtung“.",
    "<b>4 g</b> – zwölf Wochen, für Elektriker mit Ausbildung, „Ein Studium ist nicht nötig“. <i>Falle d:</i> Solarbranche, "
    "aber nur mit abgeschlossenem Studium.",
    "<b>5 e</b> – „ausschließlich im Homeoffice“, Leyla hat eine kaufmännische Ausbildung (Bankkauffrau).",
    "Übrig bleiben <b>a, d, f</b>.",
]]
s += [R("Satz B", "solh")] + [R(t, "sol") for t in [
    "<b>1 c</b> – Kitas „in seinen Dörfern“ (= auf dem Land) und Hilfe „bei der Suche nach einer Wohnung“.",
    "<b>2 h</b> – Werkstudierende, „in der Prüfungszeit … reduziert“. <i>Falle a:</i> kaufmännisch und Wirtschaft, aber nur "
    "für Absolventen – Fatou studiert noch.",
    "<b>3 f</b> – Industriemechaniker, „Bewerbungen von Fachkräften über 50 … ausdrücklich willkommen“.",
    "<b>4 b</b> – Exportteam, „Kaufleute, die Chinesisch sprechen“. <i>Falle e:</i> Export und Kaufleute, aber Polnisch.",
    "<b>5 g</b> – neuer Arbeitgeber, Hochvolt-Schulung „auf Kosten des Unternehmens“. <i>Falle d:</i> richtiges Thema, aber "
    "„die Gebühr … zahlen die Teilnehmenden selbst“.",
    "Übrig bleiben <b>a, d, e</b>.",
]]
s += [Spacer(1, 6), box(R("<b>Typische Falle in Teil 1:</b> Jede übrig gebliebene Meldung hat <b>dasselbe Thema</b> wie eine "
                          "Person – aber eine Bedingung passt nicht (Zielgruppe, Stunden, Kosten, Sprache). "
                          "Wer nur auf Stichwörter achtet, verliert hier Punkte.", "cell"), NOTE, GELB),
      Spacer(1, 6),
      box(R("<b>Ihre Bilanz:</b> 2 Sätze × 5 Aufgaben × 3 Punkte = 30 Punkte. In der Prüfung zählt Teil 1 maximal 15 Punkte. "
            "Weitere Übungen zu allen Teilen: deutsch-mit-dennis.de", "cell"), SOFT)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
