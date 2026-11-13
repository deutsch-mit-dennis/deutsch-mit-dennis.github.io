# Arbeitsblatt DTB B2 Prüfung: Hören und Schreiben – Grund des Anrufs erkennen (Teil 1), Notiz schreiben (Teil 2)
# Format laut offiziellem Modelltest DTB B2 (telc, Übungstest 1, 2022): 5 Min. für beide Teile, einmal hören;
# Teil 1 = 1 Aufgabe (Angebot / Bestellung-Buchung / Beschwerde), 3 Punkte; Teil 2 = Notiz: Name 0,5 + Telefonnummer 0,5
# + weitere Informationen 4 + zu erledigen 1 = 6 Punkte. Eigene Anrufe; alle Personen, Firmen und Nummern sind erfunden.
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtb-b2-anruf-grund-und-notiz.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import fallback, LINE, TINTE, R as _R, table as _table
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Table, TableStyle, CondPageBreak

SLUG = "dtb-b2-anruf-grund-und-notiz"
TITLE = "DTB B2 Hören und Schreiben: Warum ruft der Kunde an? Notiz schreiben"
HEAD = "DTB B2 Hören und Schreiben: Grund des Anrufs, Notiz schreiben"  # page header (max. 70 characters)
LEVEL = "B2"
CB = sym("☐")
K = lambda t: f'<b><font color="#2341B5">{t}</font></b>'


def R(h, s="p"):
    return _R(fallback(h), s)


def table(rows, widths, head=True):
    return _table([[fallback(c) if isinstance(c, str) else c for c in r] for r in rows], widths, head)


st["sol"] = ParagraphStyle("sol", parent=st["item"], fontSize=9.8, leading=12.6, spaceAfter=1.5)
st["solh"] = ParagraphStyle("solh", parent=st["h3"], fontSize=10.5, leading=13, spaceBefore=5, spaceAfter=2)
st["read"] = ParagraphStyle("read", parent=st["cell"], fontSize=9.4, leading=12.2)
st["tip"] = ParagraphStyle("tip", parent=st["cell"], fontSize=9.6, leading=12, leftIndent=10, firstLineIndent=-10, spaceAfter=2)


def notiz(fuer, heights=(7, 8, 8, 23, 12)):
    """Notizformular mit den vier bewerteten Feldern aus dem Modelltest."""
    rows = [[R(f'<font size="11.5"><b>NOTIZ</b></font>   <font color="#566078">für {fuer}</font>', "cell"), ""],
            [R("<b>Name</b> <font color='#566078'>(0,5 P.)</font>", "cell"), ""],
            [R("<b>Telefonnummer</b> <font color='#566078'>(0,5 P.)</font>", "cell"), ""],
            [R("<b>Weitere Informationen</b> <font color='#566078'>(4 P.)</font>", "cell"), ""],
            [R("<b>Zu erledigen</b> <font color='#566078'>(1 P.)</font>", "cell"), ""]]
    t = Table(rows, colWidths=[46 * mm, 128 * mm], rowHeights=[h * mm for h in heights])
    t.setStyle(TableStyle([
        ("SPAN", (0, 0), (-1, 0)), ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
        ("BACKGROUND", (0, 0), (0, -1), SOFT), ("BACKGROUND", (0, 0), (-1, 0), SOFT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def mc(question, opts):
    row = [R(f"{CB} {l}) {o}", "tip") for l, o in zip("abc", opts)]
    t = Table([row], colWidths=[58 * mm] * 3)
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
    return [R(f"<b>{question}</b>", "p"), t]


def anruf(nr, title, level, situation, frage, opts, fuer, extra_hint=""):
    head = task(nr, title, "Partner/in oder Lehrkraft liest den Anruf aus dem Lösungsteil <b>einmal</b> vor. "
                "Zeit: <b>5 Minuten</b> für Teil 1 und 2." + extra_hint, level)
    teil1 = [box(R(f"<b>Teil 1:</b> {situation} Welche Lösung (a, b oder c) ist richtig? Sie hören den Anruf <b>einmal</b>.",
                   "cell"), SOFT, TINTE), Spacer(1, 3)] + mc(frage, opts)
    teil2 = [Spacer(1, 3), R(f"<b>Teil 2:</b> Schreiben Sie eine Notiz für {fuer}. Notieren Sie alle wichtigen Informationen. "
                             "Stichpunkte sind erlaubt.", "p"), notiz(fuer)]
    return [KeepTogether(head + teil1), KeepTogether(teil2)]


# ───────────────────────── Kopf ─────────────────────────
s = [
    R("B2 · Prüfung DTB · Hören und Schreiben", "kick"),
    R("Warum ruft der Kunde an? Notiz schreiben", "h1"),
    R("Ein Anruf, einmal hören, fünf Minuten: Erst erkennen Sie, <b>warum</b> jemand anruft – möchte er ein Angebot, "
      "will er bestellen oder buchen, oder beschwert er sich? Dann schreiben Sie eine Notiz, mit der Ihre Kollegin sofort "
      "weiterarbeiten kann.", "lead"),
    R("So läuft der Teil (laut Modelltest, telc 2022)", "h2"),
    table([
        ["<b>Teil</b>", "<b>Was Sie tun</b>", "<b>Punkte</b>"],
        ["<b>Hören und Schreiben 1</b><br/>Kundenanfrage entgegennehmen",
         "Sie hören einen Anruf und lösen <b>eine</b> Aufgabe (a, b oder c): Was ist der Grund des Anrufs – "
         "<b>Angebot</b>, <b>Bestellung/Buchung</b> oder <b>Beschwerde</b>?", "3 (Hören)"],
        ["<b>Hören und Schreiben 2</b><br/>Kundenanfrage dokumentieren",
         "Sie schreiben eine Notiz zum selben Anruf: <b>Name</b> (0,5) · <b>Telefonnummer</b> (0,5) · "
         "<b>weitere Informationen</b> (4) · <b>zu erledigen</b> (1). Bewertet wird nur richtig/falsch.", "6 (Schreiben)"],
    ], [48, 102, 24]),
    Spacer(1, 3),
    box(R("<b>Zeit und Hören:</b> 5 Minuten für beide Teile zusammen. Sie hören den Anruf <b>nur einmal</b> – "
          "für beide Teile. Notieren Sie deshalb schon beim Hören.", "cell"), NOTE, GELB),
]

# Strategie und Fallen
left = [R("<b>So gehen Sie vor</b>", "cell")] + [R(f"{i}. {t}", "tip") for i, t in enumerate([
    f"Vor dem Hören das Notizfeld vorbereiten: {K('Name – Nummer – Infos – zu tun')}.",
    "Name und Nummer zuerst – das sind sichere Punkte. Nummern in Blöcken notieren.",
    "Bei „weitere Informationen“ zählt jedes Detail: Was? Wie viel? Wann? Wo?",
    "Für Teil 1 fragen Sie sich: Was soll am Ende <b>passieren</b>? Ein Preis kommt (Angebot), "
    "etwas wird geliefert/reserviert (Bestellung/Buchung), ein Fehler wird behoben (Beschwerde).",
    "„Zu erledigen“: Was muss die Kollegin <b>tun</b>? (zurückrufen, Angebot schicken, Termin bestätigen …)",
], 1)]
right = [R('<b><font color="#C2362B">Achtung, Falle!</font></b>', "cell")] + [R(f"– {t}", "tip") for t in [
    "Der Anrufer erwähnt Ärger von früher – ruft aber an, um etwas zu <b>buchen</b>.",
    "„Wir würden gern bestellen, <b>aber zuerst</b> brauchen wir einen Preis“ = Angebot.",
    "Wer sich beschwert, spricht oft auch über eine neue Bestellung „später“.",
    "Die Nummer wird korrigiert: „… nein, Entschuldigung, am Ende eine Sieben.“",
]]
t = Table([[left, right]], colWidths=[96 * mm, 78 * mm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), HELLGRUEN), ("BACKGROUND", (1, 0), (1, 0), NOTE),
    ("LINEBEFORE", (0, 0), (0, 0), 3, GRUEN), ("LINEBEFORE", (1, 0), (1, 0), 3, GELB),
    ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
s += [KeepTogether([R("Strategien und Fallen", "h2"), t])]

# Übung 1
s += task(1, "Angebot, Bestellung/Buchung oder Beschwerde?",
          "Was ist der <b>Hauptgrund</b> des Anrufs? Schreiben Sie <b>A</b> (Angebot), <b>B</b> (Bestellung/Buchung) "
          "oder <b>BE</b> (Beschwerde).", 1)
u1 = [
    "„Könnten Sie mir bitte einen Kostenvoranschlag für die Reparatur schicken?“",
    "„Ich möchte für Freitag einen Tisch für acht Personen reservieren.“",
    "„Die Ware ist beschädigt angekommen, und ich erwarte, dass Sie sie austauschen.“",
    "„Wir möchten gern bestellen – aber vorher müssen wir wissen, was 300 Stück kosten.“",
    "„Letztes Mal war der Raum zu klein, aber egal: Bitte buchen Sie ihn für den 4. März.“",
    "„Ich würde gern noch Stühle bestellen – aber erst, wenn der falsche Tisch abgeholt ist.“",
]
s += [table([[f"{i}. {x}", "______"] for i, x in enumerate(u1, 1)], [150, 24], head=False)]

# Anrufe
s += [PageBreak()]
s += anruf(2, "Anruf A: beim Malerbetrieb", 2,
           "Sie arbeiten im Büro des Malerbetriebs <b>Farbwerk Demir</b> in Gelsenkirchen. Ihre Kollegin Frau Lehmann ist "
           "in der Mittagspause. Das Telefon klingelt.",
           "Herr Osei ruft an, weil er …",
           ["ein Angebot für Malerarbeiten haben möchte.", "einen Auftrag für März fest buchen möchte.",
            "sich über die Arbeit im Treppenhaus beschweren möchte."],
           "Frau Lehmann")
s += [Spacer(1, 2)]
s += anruf(3, "Anruf B: im Tagungshotel", 2,
           "Sie arbeiten im Veranstaltungsbüro des <b>Hotels Am Kanal</b> in Münster. Ihr Kollege Herr Ferreira ist heute "
           "nicht im Haus. Eine Kundin ruft an.",
           "Frau Schröder ruft an, weil sie …",
           ["ein Angebot für eine Tagung vergleichen möchte.", "einen Seminarraum mit Verpflegung buchen möchte.",
            "sich über den kaputten Beamer beschweren möchte."],
           "Herrn Ferreira")
s += [PageBreak()]
s += anruf(4, "Anruf C: beim Möbelversand", 3,
           "Sie arbeiten im Kundenservice der <b>Wohnfabrik Möbelversand</b> in Dortmund. Ihre Kollegin Frau Nowak ist für "
           "Reklamationen zuständig und gerade in einer Besprechung. Eine Kundin ruft an.",
           "Frau Santos ruft an, weil sie …",
           ["ein Angebot für vier passende Stühle haben möchte.", "zusätzlich vier Stühle bestellen möchte.",
            "sich über eine falsche Lieferung beschwert."],
           "Frau Nowak", " Dieser Anruf hat zwei Fallen.")
s += [Spacer(1, 6),
      box(R(f"<b>Selbstcheck nach jeder Notiz:</b> {CB} Name richtig geschrieben  {CB} Nummer vollständig  "
            f"{CB} alle Zahlen, Daten, Orte  {CB} „zu erledigen“ mit Frist  {CB} Kann die Kollegin <b>ohne Rückfrage</b> handeln?",
            "cell"), SOFT)]

# ───────────────────────── Lösungen ─────────────────────────
s += [PageBreak(), R("Lösungen und Texte zum Vorlesen", "h2"),
      R("Erst üben, dann nachschauen! Wer zuhört, deckt diesen Teil ab. Musternotizen: Andere Formulierungen sind richtig, "
        "wenn alle Informationen stimmen.", "small"),
      R("Übung 1", "solh"),
      R("1. A · 2. B · 3. BE · 4. A (erst Preis, dann Bestellung) · 5. B (der Ärger ist von früher) · "
        "6. BE (die Bestellung kommt erst später)", "sol")]

s += [KeepTogether([R("Anruf A – Text zum Vorlesen", "solh"),
      box(R("„Guten Tag, Osei hier, Daniel Osei von der Hausverwaltung Krüger und Osei in Gelsenkirchen. Ich hätte gern Frau "
            "Lehmann gesprochen … ah, Mittagspause, verstehe. Dann sage ich es Ihnen. Wir verwalten das Mehrfamilienhaus in der "
            "Bochumer Straße zwölf. Dort soll das Treppenhaus neu gestrichen werden, vier Etagen, Wände und Decken, dazu die "
            "Geländer lackieren. Bevor die Eigentümer entscheiden, brauchen wir einen Kostenvoranschlag. Die Eigentümerversammlung "
            "ist am zwanzigsten Februar, also bräuchte ich das Angebot bis spätestens zum fünfzehnten. Wenn der Preis passt, würden "
            "wir die Arbeiten gern im März machen lassen. Ach, und Frau Lehmann soll sich vorher das Treppenhaus anschauen – den "
            "Schlüssel kann sie bei Frau Yilmaz im Erdgeschoss holen. Rufen Sie mich bitte an, damit wir einen Termin für die "
            "Besichtigung ausmachen. Meine Nummer: null zwei null neun, sechs eins drei, achtundzwanzig, fünfzig. Also null zwei "
            "null neun, sechs eins drei, zwei acht, fünf null. Danke!“", "read"), SOFT)]),
      R("<b>Teil 1: a.</b> Er braucht einen Kostenvoranschlag, also ein Angebot. b) „Wenn der Preis passt … im März“ – noch "
        "nicht gebucht. c) Im Treppenhaus wurde noch nicht gearbeitet.", "sol"),
      box(R("<b>NOTIZ</b> für Frau Lehmann<br/>"
            "<b>Name:</b> Herr Daniel Osei, Hausverwaltung Krüger &amp; Osei, Gelsenkirchen<br/>"
            "<b>Telefonnummer:</b> 0209 / 613 28 50<br/>"
            "<b>Weitere Informationen:</b> braucht Angebot (Kostenvoranschlag): Treppenhaus Bochumer Str. 12 streichen – 4 Etagen, "
            "Wände + Decken, Geländer lackieren · Angebot bis spätestens 15.02. (Eigentümerversammlung 20.02.) · Ausführung evtl. "
            "im März · Schlüssel bei Frau Yilmaz, EG<br/>"
            "<b>Zu erledigen:</b> Herrn Osei anrufen, Termin zur Besichtigung vereinbaren; danach Angebot bis 15.02. schicken.",
            "read"), HELLGRUEN, GRUEN)]

s += [KeepTogether([R("Anruf B – Text zum Vorlesen", "solh"),
      box(R("„Hallo, hier ist Mei Lin Schröder von Nordlicht Software in Münster. Ich möchte gern einen Seminarraum bei Ihnen "
            "buchen, und zwar für Donnerstag, den zwölften März, von neun bis siebzehn Uhr. Wir sind achtzehn Personen. Herr "
            "Ferreira hat mir letzte Woche schon die Preise geschickt, das passt alles, wir nehmen die Tagungspauschale mit "
            "Mittagessen und zwei Kaffeepausen. Beim letzten Mal war übrigens der Beamer kaputt, das war ziemlich ärgerlich – "
            "bitte sorgen Sie diesmal dafür, dass die Technik funktioniert, und stellen Sie zusätzlich zwei Flipcharts in den "
            "Raum. Drei Teilnehmende essen vegan. Die Rechnung geht bitte nicht an mich, sondern an unsere Buchhaltung, die Adresse "
            "steht auf der Website. Herr Ferreira soll mir die Buchung bitte bis Ende der Woche schriftlich bestätigen. Für "
            "Rückfragen: null zwei fünf eins, neun null vier, siebzig, dreiunddreißig. Ich wiederhole: null zwei fünf eins, neun "
            "null vier, sieben null, drei drei. Vielen Dank!“", "read"), SOFT)]),
      R("<b>Teil 1: b.</b> Die Preise kennt sie schon – sie bucht jetzt. a) Kein Vergleich, das Angebot ist schon da. "
        "c) <b>Falle:</b> Der Beamer war „beim letzten Mal“ kaputt; das ist nicht der Grund des Anrufs.", "sol"),
      box(R("<b>NOTIZ</b> für Herrn Ferreira<br/>"
            "<b>Name:</b> Frau Mei Lin Schröder, Nordlicht Software, Münster<br/>"
            "<b>Telefonnummer:</b> 0251 / 904 70 33<br/>"
            "<b>Weitere Informationen:</b> Buchung Seminarraum Do., 12.03., 9–17 Uhr, 18 Personen · Tagungspauschale mit Mittagessen "
            "+ 2 Kaffeepausen · 3 × vegan · Technik/Beamer vorher prüfen (letztes Mal defekt) · 2 Flipcharts zusätzlich · "
            "Rechnung an die Buchhaltung (Adresse auf Website)<br/>"
            "<b>Zu erledigen:</b> Buchung bis Ende der Woche schriftlich bestätigen.", "read"), HELLGRUEN, GRUEN)]

s += [KeepTogether([R("Anruf C – Text zum Vorlesen", "solh"),
      box(R("„Ja, guten Tag, Santos mein Name, Gabriela Santos. Ich habe bei Ihnen einen Esstisch bestellt, Bestellnummer W, "
            "Bindestrich, fünf, acht, zwei, null, sieben. Gestern wurde er geliefert – aber in Eiche dunkel. Bestellt hatte ich "
            "Eiche hell, das steht auch so auf meiner Auftragsbestätigung. Der Tisch passt überhaupt nicht zu unserer Küche. Ich "
            "möchte, dass Sie ihn abholen und mir den richtigen Tisch liefern. Und zwar möglichst bald, wir haben am "
            "einundzwanzigsten Geburtstag und erwarten Gäste. Ich hatte eigentlich überlegt, noch vier passende Stühle zu "
            "bestellen – aber das mache ich erst, wenn das hier geklärt ist. Vormittags bin ich zu Hause, da kann der Tisch "
            "abgeholt werden. Bitte rufen Sie mich zurück und sagen Sie mir, wann Sie kommen. Meine Handynummer ist null eins "
            "sieben sechs, zweiundvierzig, achtzehn, null neun, fünfundsechzig … nein, Entschuldigung, am Ende "
            "siebenundsechzig. Also: null eins sieben sechs, vier zwei, eins acht, null neun, sechs sieben. Danke.“", "read"), SOFT)]),
      R("<b>Teil 1: c.</b> Falsche Farbe geliefert, sie verlangt Abholung und Austausch. a) und b) <b>Falle:</b> Die Stühle "
        "bestellt sie erst später. <b>Zweite Falle:</b> Die Nummer wird am Ende korrigiert (…67, nicht …65).", "sol"),
      box(R("<b>NOTIZ</b> für Frau Nowak<br/>"
            "<b>Name:</b> Frau Gabriela Santos<br/>"
            "<b>Telefonnummer:</b> 0176 / 42 18 09 67 (Handy)<br/>"
            "<b>Weitere Informationen:</b> Reklamation, Bestellnr. W-58207: Esstisch gestern geliefert in Eiche <b>dunkel</b>, "
            "bestellt war Eiche <b>hell</b> (steht in Auftragsbestätigung) · möchte Abholung + Lieferung des richtigen Tischs · "
            "dringend: Geburtstag am 21. mit Gästen · vormittags zu Hause · will danach evtl. 4 Stühle bestellen<br/>"
            "<b>Zu erledigen:</b> Frau Santos zurückrufen und Termin für Abholung/Austausch (vormittags, vor dem 21.) nennen.",
            "read"), HELLGRUEN, GRUEN)]

if __name__ == "__main__":
    build(SLUG, HEAD, LEVEL, s)
