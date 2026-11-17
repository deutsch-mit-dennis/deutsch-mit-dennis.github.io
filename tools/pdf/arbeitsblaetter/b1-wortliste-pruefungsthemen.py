# Wortliste B1 nach Prüfungsthemen (telc Deutsch B1 / DTB B1) + Karteikarten zum Ausschneiden
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b1-wortliste-pruefungsthemen.py
# Gleiche Datenstruktur (THEMEN / KARTEN / KURZ) wie b2-wortliste-pruefungsthemen.py -> gleicher Karteikarten-Export.
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, MUTED, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER

SLUG = "b1-wortliste-pruefungsthemen"
TITLE = "B1-Wortliste nach Prüfungsthemen"
LEVEL = "B1"

ART = {"der": "#2341B5", "die": "#C2362B", "das": "#1D7A45"}
N = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Nomen in Verbindungen
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verb in Verbindungen

# Eintrag: (Wortart, Wort, Formen, Beispielsatz)
# N = Nomen (Artikel + Plural), V = Verb (Präsens 3. Pers. + Perfekt), A = Adjektiv (Gegenteil / Rektion)
THEMEN = [
    ("Arbeit und Beruf", [
        ("N", "der Arbeitsplatz", "die Arbeitsplätze", "Mein Arbeitsplatz ist direkt am Fenster."),
        ("N", "die Arbeitszeit", "die Arbeitszeiten", "Meine Arbeitszeit beginnt um sieben Uhr."),
        ("N", "der Feierabend", "die Feierabende", "Nach Feierabend gehe ich oft joggen."),
        ("N", "die Gehaltserhöhung", "die Gehaltserhöhungen", "Nächstes Jahr bekomme ich eine Gehaltserhöhung."),
        ("N", "die Stellenanzeige", "die Stellenanzeigen", "Ich habe die Stellenanzeige im Internet gelesen."),
        ("N", "der Betrieb", "die Betriebe", "Unser Betrieb hat fünfzig Beschäftigte."),
        ("N", "der Mitarbeiter / die Mitarbeiterin", "die Mitarbeiter / die Mitarbeiterinnen", "Alle Mitarbeiter bekommen ein Diensthandy."),
        ("N", "die Aufgabe", "die Aufgaben", "Heute habe ich sehr viele Aufgaben."),
        ("N", "das Team", "die Teams", "In unserem Team arbeiten Menschen aus sechs Ländern."),
        ("N", "der Kunde / die Kundin", "die Kunden / die Kundinnen", "Der Kunde wartet schon am Telefon."),
        ("N", "das Unternehmen", "die Unternehmen", "Das Unternehmen sucht neue Fachkräfte."),
        ("N", "die Fachkraft", "die Fachkräfte", "In der Pflege fehlen viele Fachkräfte."),
        ("V", "leiten", "leitet · hat geleitet", "Frau Okafor leitet die Abteilung."),
        ("V", "erledigen", "erledigt · hat erledigt", "Ich erledige das gleich morgen früh."),
        ("V", "vertreten", "vertritt · hat vertreten", "Während meines Urlaubs vertritt mich Jana."),
        ("V", "sich verstehen (mit + Dat.)", "versteht sich · hat sich verstanden", "Ich verstehe mich gut mit meinen Kollegen."),
        ("A", "verantwortlich (für + Akk.)", "Gegenteil: nicht verantwortlich", "Herr Kaya ist für die Planung verantwortlich."),
        ("A", "selbstständig", "Gegensatz: angestellt", "Mein Bruder ist seit zwei Jahren selbstständig."),
    ], [
        (f"in {N('Rente')} {V('gehen')}", "Mein Vater geht nächstes Jahr in Rente."),
        (f"{N('Kontakt')} {V('aufnehmen')} (mit + Dat.)", "Bitte nehmen Sie mit unserer Personalabteilung Kontakt auf."),
        (f"ein {N('Praktikum')} {V('machen')}", "Ich mache gerade ein Praktikum in einer Werkstatt."),
        (f"eine {N('Entscheidung')} {V('treffen')}", "Die Chefin hat noch keine Entscheidung getroffen."),
    ]),
    ("Wohnen und Nachbarschaft", [
        ("N", "die Wohnungsanzeige", "die Wohnungsanzeigen", "Die Wohnungsanzeige klingt sehr gut."),
        ("N", "die Besichtigung", "die Besichtigungen", "Zur Besichtigung kamen zwanzig Leute."),
        ("N", "die Warmmiete", "die Warmmieten", "Die Warmmiete beträgt 850 Euro."),
        ("N", "die Lage", "die Lagen", "Die Wohnung hat eine ruhige Lage."),
        ("N", "der Stadtteil", "die Stadtteile", "In welchem Stadtteil wohnst du?"),
        ("N", "die Umgebung", "die Umgebungen", "In der Umgebung gibt es viele Geschäfte."),
        ("N", "das Erdgeschoss", "die Erdgeschosse", "Die Wohnung liegt im Erdgeschoss."),
        ("N", "der Aufzug", "die Aufzüge", "Der Aufzug ist schon wieder kaputt."),
        ("N", "der Lärm", "ohne Plural", "Der Lärm von der Baustelle stört uns sehr."),
        ("N", "das Mehrfamilienhaus", "die Mehrfamilienhäuser", "Wir wohnen in einem Mehrfamilienhaus mit zwölf Wohnungen."),
        ("N", "das Paket", "die Pakete", "Kannst du bitte mein Paket annehmen?"),
        ("V", "einziehen", "zieht ein · <b>ist</b> eingezogen", "Wir sind am 1. März eingezogen."),
        ("V", "ausziehen", "zieht aus · <b>ist</b> ausgezogen", "Die alten Mieter sind letzte Woche ausgezogen."),
        ("V", "stören", "stört · hat gestört", "Stört Sie die laute Musik?"),
        ("V", "aufräumen", "räumt auf · hat aufgeräumt", "Am Wochenende räumen wir den Keller auf."),
        ("V", "gießen", "gießt · hat gegossen", "Gießt du im Urlaub meine Blumen?"),
        ("V", "einrichten", "richtet ein · hat eingerichtet", "Wir haben das Kinderzimmer neu eingerichtet."),
        ("A", "hilfsbereit", "Gegenteil: nicht hilfsbereit", "Unsere Nachbarin ist sehr hilfsbereit."),
    ], [
        (f"eine {N('Anzeige')} {V('aufgeben')}", "Wir geben eine Anzeige für unser altes Sofa auf."),
        (f"einen {N('Nachmieter')} {V('suchen')}", "Vor dem Auszug muss ich einen Nachmieter suchen."),
        (f"die {N('Wohnung')} {V('kündigen')}", "Wir haben die Wohnung zum 31. Mai gekündigt."),
        (f"den {N('Hausmeister')} {V('informieren')}", "Bei einem Wasserschaden informieren Sie sofort den Hausmeister."),
    ]),
    ("Gesundheit", [
        ("N", "der Hausarzt / die Hausärztin", "die Hausärzte / die Hausärztinnen", "Meine Hausärztin hat mich zum Röntgen geschickt."),
        ("N", "die Krankheit", "die Krankheiten", "Diabetes ist eine häufige Krankheit."),
        ("N", "die Verletzung", "die Verletzungen", "Die Verletzung am Knie ist nicht schlimm."),
        ("N", "die Allergie", "die Allergien", "Ich habe eine Allergie gegen Nüsse."),
        ("N", "die Impfung", "die Impfungen", "Die Impfung schützt vor Grippe."),
        ("N", "der Husten", "ohne Plural", "Gegen den Husten trinke ich heißen Tee."),
        ("N", "die Gesundheit", "ohne Plural", "Gesundheit ist das Wichtigste im Leben."),
        ("N", "die Operation", "die Operationen", "Die Operation hat zwei Stunden gedauert."),
        ("N", "der Krankenwagen", "die Krankenwagen", "Der Krankenwagen kam nach zehn Minuten."),
        ("N", "die Bewegung", "meist ohne Plural", "Viel Bewegung ist gut für das Herz."),
        ("N", "die Wartezeit", "die Wartezeiten", "Die Wartezeit beim Facharzt ist sehr lang."),
        ("V", "sich verletzen", "verletzt sich · hat sich verletzt", "Er hat sich beim Fußball verletzt."),
        ("V", "schaden (+ Dat.)", "schadet · hat geschadet", "Zu viel Zucker schadet den Zähnen."),
        ("V", "sich ernähren", "ernährt sich · hat sich ernährt", "Ich versuche, mich gesund zu ernähren."),
        ("V", "zunehmen", "nimmt zu · hat zugenommen", "Im Winter habe ich drei Kilo zugenommen."),
        ("V", "abnehmen", "nimmt ab · hat abgenommen", "Sie möchte fünf Kilo abnehmen."),
        ("A", "allergisch (gegen + Akk.)", "Gegenteil: nicht allergisch", "Mein Sohn ist allergisch gegen Katzen."),
        ("A", "schwanger", "Gegenteil: nicht schwanger", "Meine Frau ist im vierten Monat schwanger."),
    ], [
        (f"sich {N('Sorgen')} {V('machen')} (um + Akk.)", "Ich mache mir Sorgen um meine Mutter."),
        (f"ein {N('Rezept')} {V('ausstellen')}", "Die Ärztin stellt Ihnen ein Rezept aus."),
        (f"einen {N('Krankenwagen')} {V('rufen')}", "Schnell, ruf einen Krankenwagen!"),
        (f"auf die {N('Gesundheit')} {V('achten')}", "Sie sollten mehr auf Ihre Gesundheit achten."),
    ]),
    ("Ausbildung und Lernen", [
        ("N", "der Ausbildungsplatz", "die Ausbildungsplätze", "Mein Sohn sucht einen Ausbildungsplatz als Elektriker."),
        ("N", "der Azubi", "die Azubis", "Unser neuer Azubi heißt Malik."),
        ("N", "die Universität", "die Universitäten", "Die Universität liegt mitten in der Stadt."),
        ("N", "das Fach", "die Fächer", "Welches Fach magst du am liebsten?"),
        ("N", "die Note", "die Noten", "In Deutsch habe ich eine gute Note bekommen."),
        ("N", "der Unterricht", "ohne Plural", "Der Unterricht beginnt um acht Uhr."),
        ("N", "das Niveau", "die Niveaus", "Der Kurs ist auf B1-Niveau."),
        ("N", "die Kursgebühr", "die Kursgebühren", "Die Kursgebühr beträgt 200 Euro."),
        ("N", "der Schulabschluss", "die Schulabschlüsse", "Ohne Schulabschluss findet man schwer eine Stelle."),
        ("N", "der Fehler", "die Fehler", "Aus Fehlern lernt man."),
        ("N", "die Übung", "die Übungen", "Diese Übung machen wir zu zweit."),
        ("V", "studieren", "studiert · hat studiert", "Mein Bruder studiert Informatik in Leipzig."),
        ("V", "üben", "übt · hat geübt", "Ich übe jeden Tag zehn Minuten Aussprache."),
        ("V", "sich merken", "merkt sich · hat sich gemerkt", "Neue Wörter kann ich mir schlecht merken."),
        ("V", "nachschlagen", "schlägt nach · hat nachgeschlagen", "Unbekannte Wörter schlage ich im Wörterbuch nach."),
        ("V", "verbessern", "verbessert · hat verbessert", "Ich möchte mein Deutsch verbessern."),
        ("A", "schwierig", "Gegenteil: leicht", "Die Grammatik ist am Anfang schwierig."),
        ("A", "erfolgreich", "Gegenteil: erfolglos", "Sie hat die Ausbildung erfolgreich abgeschlossen."),
    ], [
        (f"sich {N('Notizen')} {V('machen')}", "Im Unterricht mache ich mir Notizen."),
        (f"einen {N('Kurs')} {V('besuchen')}", "Ich besuche einen Kurs an der Volkshochschule."),
        (f"ein {N('Studium')} {V('beginnen')}", "Nach dem Abitur beginnt sie ein Studium."),
        (f"einen {N('Fehler')} {V('machen')}", "Keine Sorge, jeder macht mal einen Fehler."),
    ]),
    ("Reisen und Verkehr", [
        ("N", "die Reise", "die Reisen", "Die Reise nach Portugal war wunderschön."),
        ("N", "der Flughafen", "die Flughäfen", "Wir fahren mit der S-Bahn zum Flughafen."),
        ("N", "der Flug", "die Flüge", "Der Flug nach Istanbul dauert drei Stunden."),
        ("N", "die Buchung", "die Buchungen", "Die Buchung im Internet war ganz einfach."),
        ("N", "die Verbindung", "die Verbindungen", "Die Verbindung nach München ist sehr gut."),
        ("N", "der Reisepass", "die Reisepässe", "Mein Reisepass ist nur noch drei Monate gültig."),
        ("N", "die Sehenswürdigkeit", "die Sehenswürdigkeiten", "Der Kölner Dom ist eine bekannte Sehenswürdigkeit."),
        ("N", "die Übernachtung", "die Übernachtungen", "Eine Übernachtung mit Frühstück kostet 80 Euro."),
        ("N", "der Fahrplan", "die Fahrpläne", "Laut Fahrplan kommt der Bus um 7:15 Uhr."),
        ("N", "der Verkehr", "ohne Plural", "Am Morgen ist auf den Straßen viel Verkehr."),
        ("N", "der Unfall", "die Unfälle", "Auf der Autobahn ist ein Unfall passiert."),
        ("V", "reservieren", "reserviert · hat reserviert", "Ich habe einen Sitzplatz im Zug reserviert."),
        ("V", "einsteigen", "steigt ein · <b>ist</b> eingestiegen", "Bitte steigen Sie schnell ein!"),
        ("V", "aussteigen", "steigt aus · <b>ist</b> ausgestiegen", "An der nächsten Haltestelle müssen wir aussteigen."),
        ("V", "übernachten", "übernachtet · hat übernachtet", "Wir haben bei Freunden übernachtet."),
        ("V", "landen", "landet · <b>ist</b> gelandet", "Das Flugzeug ist pünktlich gelandet."),
        ("A", "ausgebucht", "Gegenteil: frei", "Leider ist das Hotel schon ausgebucht."),
        ("A", "öffentlich", "Gegenteil: privat", "Ich fahre meistens mit öffentlichen Verkehrsmitteln."),
    ], [
        (f"einen {N('Ausflug')} {V('machen')}", "Am Wochenende machen wir einen Ausflug an den See."),
        (f"eine {N('Reise')} {V('planen')}", "Wir planen eine Reise nach Wien."),
        (f"ein {N('Zimmer')} {V('buchen')}", "Wir haben ein Zimmer mit Balkon gebucht."),
        (f"den {N('Zug')} {V('nehmen')}", "Wir nehmen den Zug um acht Uhr."),
    ]),
    ("Einkaufen und Reklamation", [
        ("N", "die Bestellung", "die Bestellungen", "Ihre Bestellung wird morgen geliefert."),
        ("N", "der Onlineshop", "die Onlineshops", "Ich kaufe viele Sachen im Onlineshop."),
        ("N", "die Ware", "die Waren", "Die Ware ist leider nicht angekommen."),
        ("N", "die Quittung", "die Quittungen", "Ohne Quittung können wir leider nichts machen."),
        ("N", "die Reklamation", "die Reklamationen", "Ihre Reklamation leiten wir an den Hersteller weiter."),
        ("N", "der Mangel", "die Mängel", "Das Gerät hat einen technischen Mangel."),
        ("N", "der Hersteller", "die Hersteller", "Der Hersteller repariert das Gerät kostenlos."),
        ("N", "die Rücksendung", "die Rücksendungen", "Die Rücksendung ist innerhalb von 14 Tagen kostenlos."),
        ("N", "der Kundenservice", "ohne Plural", "Ich habe den Kundenservice dreimal angerufen."),
        ("N", "der Ersatz", "ohne Plural", "Wir schicken Ihnen sofort Ersatz."),
        ("N", "die Lieferzeit", "die Lieferzeiten", "Die Lieferzeit beträgt drei bis fünf Werktage."),
        ("N", "das Gerät", "die Geräte", "Das Gerät funktioniert seit gestern nicht mehr."),
        ("V", "liefern", "liefert · hat geliefert", "Die Firma liefert auch am Samstag."),
        ("V", "zurückschicken", "schickt zurück · hat zurückgeschickt", "Ich schicke die Schuhe zurück."),
        ("V", "reklamieren", "reklamiert · hat reklamiert", "Ich möchte diesen Wasserkocher reklamieren."),
        ("V", "erstatten", "erstattet · hat erstattet", "Wir erstatten Ihnen den vollen Preis."),
        ("A", "beschädigt", "Gegenteil: unbeschädigt", "Die Verpackung war beschädigt."),
        ("A", "defekt", "Gegenteil: intakt", "Der Akku ist schon nach einer Woche defekt."),
    ], [
        (f"eine {N('Bestellung')} {V('aufgeben')}", "Ich habe gestern online eine Bestellung aufgegeben."),
        (f"eine {N('Beschwerde')} {V('schreiben')}", "Ich schreibe eine Beschwerde an den Kundenservice."),
        (f"einen {N('Gutschein')} {V('einlösen')}", "Kann ich hier diesen Gutschein einlösen?"),
        (f"{N('Anspruch')} {V('haben')} (auf + Akk.)", "Sie haben Anspruch auf eine kostenlose Reparatur."),
    ]),
    ("Medien und Kommunikation", [
        ("N", "das Smartphone", "die Smartphones", "Mein Smartphone ist schon fünf Jahre alt."),
        ("N", "die App", "die Apps", "Mit dieser App lerne ich jeden Tag Vokabeln."),
        ("N", "das Internet", "ohne Plural", "Im Internet findet man fast alles."),
        ("N", "die Zeitung", "die Zeitungen", "Mein Opa liest jeden Morgen die Zeitung."),
        ("N", "das Fernsehen", "ohne Plural", "Was kommt heute Abend im Fernsehen?"),
        ("N", "der Anruf", "die Anrufe", "Vielen Dank für Ihren Anruf!"),
        ("N", "die Sprachnachricht", "die Sprachnachrichten", "Sie hat mir eine lange Sprachnachricht geschickt."),
        ("N", "der Anhang", "die Anhänge", "Im Anhang finden Sie meinen Lebenslauf."),
        ("N", "das Passwort", "die Passwörter", "Ich habe mein Passwort vergessen."),
        ("N", "der Empfänger / die Empfängerin", "die Empfänger / die Empfängerinnen", "Der Empfänger hat die E-Mail nicht bekommen."),
        ("N", "die Meinung", "die Meinungen", "Meiner Meinung nach brauchen kleine Kinder kein Handy."),
        ("V", "speichern", "speichert · hat gespeichert", "Speichern Sie die Datei auf dem Computer."),
        ("V", "löschen", "löscht · hat gelöscht", "Ich habe die alten Fotos gelöscht."),
        ("V", "antworten (auf + Akk.)", "antwortet · hat geantwortet", "Bitte antworten Sie bis Freitag auf meine E-Mail."),
        ("V", "sich unterhalten (über + Akk.)", "unterhält sich · hat sich unterhalten", "Wir haben uns lange über den Film unterhalten."),
        ("V", "erreichen", "erreicht · hat erreicht", "Ich kann dich telefonisch nicht erreichen."),
        ("A", "online", "Gegenteil: offline", "Abends bin ich meistens online."),
        ("A", "persönlich", "Gegensatz: schriftlich / am Telefon", "Das möchte ich lieber persönlich besprechen."),
    ], [
        (f"eine {N('Nachricht')} {V('hinterlassen')}", "Bitte hinterlassen Sie eine Nachricht nach dem Signalton."),
        (f"eine {N('Diskussion')} {V('führen')}", "Im Kurs haben wir eine spannende Diskussion geführt."),
        (f"{N('Kontakt')} {V('halten')} (mit + Dat.)", "Mit meiner Familie halte ich per Video Kontakt."),
        (f"die {N('Meinung')} {V('sagen')}", "Ich sage dir ehrlich meine Meinung."),
    ]),
    ("Umwelt und Gesellschaft", [
        ("N", "die Umwelt", "ohne Plural", "Wir müssen die Umwelt schützen."),
        ("N", "das Klima", "meist ohne Plural", "In Spanien ist das Klima trocken und warm."),
        ("N", "der Strom", "ohne Plural", "Der Strom ist in diesem Jahr teurer geworden."),
        ("N", "das Plastik", "ohne Plural", "Im Meer schwimmt sehr viel Plastik."),
        ("N", "der Biomüll", "ohne Plural", "Kartoffelschalen gehören in den Biomüll."),
        ("N", "die Gesellschaft", "die Gesellschaften", "Unsere Gesellschaft wird immer älter."),
        ("N", "das Ehrenamt", "die Ehrenämter", "Sie arbeitet im Ehrenamt bei der Tafel."),
        ("N", "die Gleichberechtigung", "ohne Plural", "Die Gleichberechtigung steht im Grundgesetz."),
        ("N", "die Generation", "die Generationen", "Die junge Generation liest kaum noch Zeitung."),
        ("N", "die Wahl", "die Wahlen", "Die nächste Wahl ist im Herbst."),
        ("N", "der Bürger / die Bürgerin", "die Bürger / die Bürgerinnen", "Die Bürger können ihre Meinung frei sagen."),
        ("V", "wählen", "wählt · hat gewählt", "Wen hast du gewählt?"),
        ("V", "sich engagieren (für + Akk.)", "engagiert sich · hat sich engagiert", "Mia engagiert sich für den Tierschutz."),
        ("V", "verbrauchen", "verbraucht · hat verbraucht", "Unser alter Kühlschrank verbraucht zu viel Strom."),
        ("V", "wegwerfen", "wirft weg · hat weggeworfen", "Wir werfen zu viele Lebensmittel weg."),
        ("V", "sich verändern", "verändert sich · hat sich verändert", "Das Klima hat sich stark verändert."),
        ("A", "gerecht", "Gegenteil: ungerecht", "Das finde ich nicht gerecht."),
        ("A", "sozial", "Gegenteil: unsozial", "Sie arbeitet in einem sozialen Beruf."),
    ], [
        (f"den {N('Müll')} {V('trennen')}", "In Deutschland trennt man den Müll."),
        (f"{N('Energie')} {V('sparen')}", "Mit LED-Lampen kann man Energie sparen."),
        (f"an einer {N('Demonstration')} {V('teilnehmen')}", "Viele Schüler nehmen an der Demonstration teil."),
        (f"zur {N('Wahl')} {V('gehen')}", "Gehst du am Sonntag zur Wahl?"),
    ]),
]

# 24 wichtige Wörter für die Karteikarten: (Thema-Index, Wort genau wie in der Liste)
KARTEN = [
    (0, "der Feierabend"), (0, "die Fachkraft"), (0, "vertreten"),
    (1, "die Besichtigung"), (1, "der Aufzug"), (1, "einziehen"),
    (2, "die Impfung"), (2, "die Verletzung"), (2, "zunehmen"),
    (3, "der Ausbildungsplatz"), (3, "die Note"), (3, "sich merken"),
    (4, "die Sehenswürdigkeit"), (4, "der Fahrplan"), (4, "aussteigen"),
    (5, "die Quittung"), (5, "der Mangel"), (5, "zurückschicken"),
    (6, "der Anhang"), (6, "das Passwort"), (6, "sich unterhalten (über + Akk.)"),
    (7, "das Ehrenamt"), (7, "die Gesellschaft"), (7, "sich engagieren (für + Akk.)"),
]

st["wl"] = ParagraphStyle("wl", parent=st["cell"], fontSize=9.5, leading=11.5)
st["wls"] = ParagraphStyle("wls", parent=st["cell"], fontSize=9, leading=11, textColor=MUTED)
st["kf"] = ParagraphStyle("kf", fontName="Atk-B", fontSize=12.5, leading=15, alignment=TA_CENTER)
st["kh"] = ParagraphStyle("kh", fontName="Atk", fontSize=8, leading=10, textColor=MUTED, alignment=TA_CENTER)
st["kb"] = ParagraphStyle("kb", fontName="Atk", fontSize=8.5, leading=10.5, alignment=TA_CENTER)


def wort(kind, w):
    """Wort fett, Artikel farbig (der blau · die rot · das grün)."""
    if kind == "N":
        parts = []
        for chunk in w.split(" / "):
            art, rest = chunk.split(" ", 1)
            sp = '&nbsp;' if len(rest) < 18 else ' '  # sehr lange Wörter dürfen nach dem Artikel umbrechen
            parts.append(f'<font color="{ART[art]}">{art}</font>{sp}{rest}')
        return "<b>" + " / ".join(parts) + "</b>"
    return f"<b>{w}</b>"


def themenblock(nr, name, eintraege, nvv):
    head = [R(f"{nr} · {name}", "h2"),
            R(f"{len(eintraege)} Wörter + {len(nvv)} feste Verbindungen · Hake ab, was du sicher kannst.", "small")]
    rows = [[R("", "wl"), R("<b>Wort</b>", "wl"), R("<b>Plural / Formen</b>", "wl"), R("<b>Beispielsatz</b>", "wl")]]
    for kind, w, f, ex in eintraege:
        rows.append([R(sym("☐"), "wl"), R(wort(kind, w), "wl"), R(f, "wls"), R(ex, "wl")])
    t = Table(rows, colWidths=[6 * mm, 47 * mm, 41 * mm, 80 * mm], repeatRows=1)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 1.8), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("BACKGROUND", (0, 0), (-1, 0), SOFT),
    ]))
    nv = Table([[R(v, "wl"), R(ex, "wl")] for v, ex in nvv], colWidths=[66 * mm, 88 * mm])
    nv.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    nvbox = box([R("Feste Nomen-Verb-Verbindungen", "h3"), nv], NOTE, GELB)
    return head + [t, Spacer(1, 6), KeepTogether(nvbox)]


s = [
    R("B1 · Wortschatz · Wortliste zum Lernen", "kick"),
    R(TITLE, "h1"),
    R("Acht Themen aus telc Deutsch B1 und DTB B1 – mit Artikel, Plural, Verbformen, Beispielsatz "
      "und festen Nomen-Verb-Verbindungen. Am Ende: 24 Karteikarten zum Ausschneiden.", "lead"),
    box(R(
        f"<b>So lernst du:</b> Nomen immer <b>mit Artikel und Plural</b> "
        f'(<font color="{ART["der"]}"><b>der</b></font> blau · <font color="{ART["die"]}"><b>die</b></font> rot · '
        f'<font color="{ART["das"]}"><b>das</b></font> grün). Verben mit <b>Präposition und Perfekt</b> – Achtung bei '
        f"<b>ist</b> (einziehen, ausziehen, einsteigen, aussteigen, landen). Decke die Beispielsätze ab, bilde eigene Sätze "
        f"und hake {sym('☐')} ab, was sitzt.",
        "cell"),
        NOTE, GELB),
]
for i, (name, eintraege, nvv) in enumerate(THEMEN, 1):
    if i > 1:
        s.append(PageBreak())
    s += themenblock(i, name, eintraege, nvv)

# ---------- Karteikarten ----------
lookup = {(ti, e[1]): e for ti, (_, es, _) in enumerate(THEMEN) for e in es}


def front(ti, w):
    kind, word, forms, ex = lookup[(ti, w)]
    if kind == "N":
        lemma = word.split(" ", 1)[1]
        frage = "Artikel? Plural?"
    elif kind == "V":
        lemma = word.split(" (")[0]
        frage = "Präposition / Kasus? Perfekt?"
    else:
        lemma = word.split(" (")[0]
        frage = "Bedeutung? Gegenteil?"
    return [R(KURZ[ti], "kh"), Spacer(1, 3), R(lemma, "kf"), Spacer(1, 3), R(frage, "kh")]


def back(ti, w):
    kind, word, forms, ex = lookup[(ti, w)]
    return [R(wort(kind, word), "kb"), R(forms, "kb"), Spacer(1, 2), R(f"<i>{ex}</i>", "kb")]


KURZ = ["Arbeit und Beruf", "Wohnen", "Gesundheit", "Ausbildung und Lernen", "Reisen und Verkehr", "Einkaufen",
        "Medien", "Umwelt und Gesellschaft"]
CW, CH = 58 * mm, 28 * mm


def kartenseite(cells_fn, mirror):
    data = []
    for r in range(8):
        row = [cells_fn(*KARTEN[r * 3 + c]) for c in range(3)]
        data.append(row[::-1] if mirror else row)
    t = Table(data, colWidths=[CW] * 3, rowHeights=[CH] * 8)
    t.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.6, MUTED, None, (3, 3)),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return t


def kartenkopf(titel, hinweis):
    """Gleich hoher Kopf auf Vorder- und Rückseite, damit die Karten beim Duplexdruck deckungsgleich liegen."""
    t = Table([[[R(titel, "h3"), R(hinweis, "small")]]], colWidths=[174 * mm], rowHeights=[17 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return t


s += [
    PageBreak(),
    kartenkopf(f"Karteikarten zum Ausschneiden · Vorderseite {sym('✂')}",
               "Doppelseitig drucken (an der langen Kante spiegeln) – dann liegt die Rückseite genau hinter der Vorderseite. "
               "Oder einseitig drucken und die Karten zusammenkleben."),
    kartenseite(front, False),
    PageBreak(),
    kartenkopf(f"Karteikarten zum Ausschneiden · Rückseite {sym('✂')}",
               "Die Spalten sind gespiegelt, damit sie beim doppelseitigen Druck passen."),
    kartenseite(back, True),
]

if __name__ == "__main__":
    build(SLUG, TITLE, LEVEL, s)
