# Wortliste B2 nach Prüfungsthemen (telc Deutsch B2 / DTB B2) + Karteikarten zum Ausschneiden
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/b2-wortliste-pruefungsthemen.py
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, MUTED, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER

SLUG = "b2-wortliste-pruefungsthemen"
TITLE = "B2-Wortliste nach Prüfungsthemen"
LEVEL = "B2"

ART = {"der": "#2341B5", "die": "#C2362B", "das": "#1D7A45"}
N = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Nomen in Verbindungen
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verb in Verbindungen

# Eintrag: (Wortart, Wort, Formen, Beispielsatz)
# N = Nomen (Artikel + Plural), V = Verb (Präsens 3. Pers. + Perfekt), A = Adjektiv (Gegenteil / Rektion)
THEMEN = [
    ("Arbeit und Beruf", [
        ("N", "die Stelle", "die Stellen", "Die Stelle ist ab März zu besetzen."),
        ("N", "die Bewerbung", "die Bewerbungen", "Ihre Bewerbung ist vollständig bei uns eingegangen."),
        ("N", "der Lebenslauf", "die Lebensläufe", "Im Lebenslauf fehlt noch mein letztes Praktikum."),
        ("N", "das Vorstellungsgespräch", "die Vorstellungsgespräche", "Am Montag habe ich ein Vorstellungsgespräch."),
        ("N", "der Arbeitsvertrag", "die Arbeitsverträge", "Lesen Sie den Arbeitsvertrag genau, bevor Sie unterschreiben."),
        ("N", "die Probezeit", "die Probezeiten", "Die Probezeit dauert sechs Monate."),
        ("N", "das Gehalt", "die Gehälter", "Das Gehalt wird am Monatsende überwiesen."),
        ("N", "die Schicht", "die Schichten", "Nächste Woche arbeite ich in der Spätschicht."),
        ("N", "die Überstunde", "die Überstunden", "Meine Überstunden kann ich im nächsten Monat abbauen."),
        ("N", "der Arbeitgeber", "die Arbeitgeber", "Mein Arbeitgeber bietet regelmäßig Schulungen an."),
        ("N", "die Kündigung", "die Kündigungen", "Die Kündigung muss schriftlich erfolgen."),
        ("N", "die Kündigungsfrist", "die Kündigungsfristen", "In meinem Vertrag beträgt die Kündigungsfrist drei Monate."),
        ("N", "die Voraussetzung", "die Voraussetzungen", "Ein Führerschein ist Voraussetzung für die Stelle."),
        ("N", "die Berufserfahrung", "meist ohne Plural", "Ich habe fünf Jahre Berufserfahrung in der Pflege."),
        ("V", "sich bewerben (um + Akk.)", "bewirbt sich · hat sich beworben", "Ich bewerbe mich um eine Stelle als Lagerist."),
        ("V", "einstellen", "stellt ein · hat eingestellt", "Die Firma stellt zehn neue Mitarbeitende ein."),
        ("V", "kündigen", "kündigt · hat gekündigt", "Der Mitarbeiter hat zum Monatsende gekündigt."),
        ("V", "verdienen", "verdient · hat verdient", "Wie viel verdient man in diesem Beruf?"),
        ("V", "sich kümmern (um + Akk.)", "kümmert sich · hat sich gekümmert", "Ich kümmere mich um die Bestellungen."),
        ("A", "zuständig (für + Akk.)", "Gegenteil: nicht zuständig", "Wer ist für die Urlaubsplanung zuständig?"),
        ("A", "befristet", "Gegenteil: unbefristet", "Der Vertrag ist auf ein Jahr befristet."),
        ("A", "belastbar", "Gegenteil: nicht belastbar", "In der Pflege muss man körperlich belastbar sein."),
    ], [
        (f"eine {N('Stelle')} {V('antreten')}", "Ich trete die neue Stelle am 1. April an."),
        (f"{N('Erfahrungen')} {V('sammeln')}", "Im Praktikum habe ich viele Erfahrungen gesammelt."),
        (f"{N('Verantwortung')} {V('übernehmen')} (für + Akk.)", "Sie übernimmt die Verantwortung für das Team."),
        (f"eine {N('Ausbildung')} {V('abschließen')}", "Er hat seine Ausbildung als Elektroniker abgeschlossen."),
        (f"{N('Überstunden')} {V('machen')}", "Im Dezember machen wir oft Überstunden."),
    ]),
    ("Kommunikation im Betrieb und Kundenkontakt", [
        ("N", "die Besprechung", "die Besprechungen", "Die Besprechung beginnt um neun Uhr."),
        ("N", "die Rückmeldung", "die Rückmeldungen", "Ich warte noch auf eine Rückmeldung vom Kunden."),
        ("N", "die Anfrage", "die Anfragen", "Vielen Dank für Ihre Anfrage vom 3. Mai."),
        ("N", "das Angebot", "die Angebote", "Wir schicken Ihnen gern ein Angebot."),
        ("N", "der Auftrag", "die Aufträge", "Der Auftrag muss bis Freitag fertig sein."),
        ("N", "die Beschwerde", "die Beschwerden", "Eine Kundin hat eine Beschwerde geschrieben."),
        ("N", "die Reklamation", "die Reklamationen", "Reklamationen bearbeitet unsere Serviceabteilung."),
        ("N", "die Lieferung", "die Lieferungen", "Die Lieferung kommt leider zwei Tage später."),
        ("N", "die Verspätung", "die Verspätungen", "Wir entschuldigen uns für die Verspätung."),
        ("N", "die Abteilung", "die Abteilungen", "Ich verbinde Sie mit der zuständigen Abteilung."),
        ("N", "das Missverständnis", "die Missverständnisse", "Das war leider ein Missverständnis."),
        ("N", "der Ansprechpartner / die Ansprechpartnerin", "die Ansprechpartner / die Ansprechpartnerinnen", "Wer ist meine Ansprechpartnerin für die Rechnung?"),
        ("N", "die Vertretung", "die Vertretungen", "Während meines Urlaubs übernimmt Herr Lenz die Vertretung."),
        ("V", "weiterleiten (an + Akk.)", "leitet weiter · hat weitergeleitet", "Ich leite Ihre E-Mail an die Buchhaltung weiter."),
        ("V", "sich beschweren (über + Akk.)", "beschwert sich · hat sich beschwert", "Der Kunde beschwert sich über die lange Wartezeit."),
        ("V", "sich entschuldigen (für + Akk.)", "entschuldigt sich · hat sich entschuldigt", "Ich entschuldige mich bei Ihnen für den Fehler."),
        ("V", "zurückrufen", "ruft zurück · hat zurückgerufen", "Kann ich Sie morgen zurückrufen?"),
        ("V", "absagen", "sagt ab · hat abgesagt", "Leider muss ich den Termin absagen."),
        ("V", "verschieben (auf + Akk.)", "verschiebt · hat verschoben", "Wir verschieben die Besprechung auf Donnerstag."),
        ("V", "sich einigen (auf + Akk.)", "einigt sich · hat sich geeinigt", "Wir haben uns auf einen neuen Termin geeinigt."),
        ("A", "erreichbar", "Gegenteil: nicht erreichbar", "Ich bin ab 14 Uhr telefonisch erreichbar."),
        ("A", "dringend", "Steigerung: dringender", "Es ist dringend: Bitte rufen Sie sofort zurück."),
    ], [
        (f"{N('Bescheid')} {V('geben')}", "Geben Sie mir bitte Bescheid, wenn die Ware da ist."),
        (f"{N('Rücksprache')} {V('halten')} (mit + Dat.)", "Ich halte kurz Rücksprache mit meiner Chefin."),
        (f"einen {N('Vorschlag')} {V('machen')}", "Darf ich einen Vorschlag machen?"),
        (f"eine {N('Lösung')} {V('finden')}", "Wir finden bestimmt eine Lösung."),
        (f"zur {N('Verfügung')} {V('stehen')}", "Für Fragen stehe ich Ihnen gern zur Verfügung."),
    ]),
    ("Behörden und Verträge", [
        ("N", "der Antrag", "die Anträge", "Der Antrag muss vollständig ausgefüllt sein."),
        ("N", "das Formular", "die Formulare", "Das Formular finden Sie auch online."),
        ("N", "der Bescheid", "die Bescheide", "Den Bescheid habe ich per Post bekommen."),
        ("N", "die Frist", "die Fristen", "Die Frist endet am 30. Juni."),
        ("N", "der Nachweis", "die Nachweise", "Bitte reichen Sie einen Nachweis über Ihr Einkommen ein."),
        ("N", "die Unterlagen", "nur Plural", "Bringen Sie alle Unterlagen zum Termin mit."),
        ("N", "die Behörde", "die Behörden", "Bei welcher Behörde muss ich mich melden?"),
        ("N", "die Aufenthaltserlaubnis", "die Aufenthaltserlaubnisse", "Meine Aufenthaltserlaubnis muss verlängert werden."),
        ("N", "der Vertrag", "die Verträge", "Der Vertrag läuft zwei Jahre."),
        ("N", "die Unterschrift", "die Unterschriften", "Auf Seite 3 fehlt noch Ihre Unterschrift."),
        ("N", "die Gebühr", "die Gebühren", "Für den neuen Pass zahlt man eine Gebühr."),
        ("N", "der Widerspruch", "die Widersprüche", "Ich habe gegen den Bescheid Widerspruch eingelegt."),
        ("N", "die Bescheinigung", "die Bescheinigungen", "Die Schule stellt eine Bescheinigung für das Amt aus."),
        ("N", "die Genehmigung", "die Genehmigungen", "Für den Umbau brauchen Sie eine Genehmigung."),
        ("V", "beantragen", "beantragt · hat beantragt", "Ich habe Wohngeld beantragt."),
        ("V", "ausfüllen", "füllt aus · hat ausgefüllt", "Bitte füllen Sie das Formular in Druckbuchstaben aus."),
        ("V", "einreichen", "reicht ein · hat eingereicht", "Die Unterlagen müssen Sie bis Freitag einreichen."),
        ("V", "verlängern", "verlängert · hat verlängert", "Ich möchte meinen Vertrag verlängern."),
        ("V", "sich anmelden (bei + Dat.)", "meldet sich an · hat sich angemeldet", "Nach dem Umzug melde ich mich beim Bürgeramt an."),
        ("V", "unterschreiben", "unterschreibt · hat unterschrieben", "Unterschreiben Sie bitte hier unten."),
        ("A", "gültig", "Gegenteil: ungültig", "Mein Pass ist noch zwei Jahre gültig."),
        ("A", "verpflichtet (zu + Dat.)", "Gegenteil: nicht verpflichtet", "Sie sind verpflichtet, Änderungen sofort mitzuteilen."),
    ], [
        (f"einen {N('Antrag')} {V('stellen')} (auf + Akk.)", "Ich stelle einen Antrag auf Kindergeld."),
        (f"{N('Widerspruch')} {V('einlegen')} (gegen + Akk.)", "Er legt Widerspruch gegen den Bescheid ein."),
        (f"eine {N('Frist')} {V('einhalten')}", "Bitte halten Sie die Frist unbedingt ein."),
        (f"{N('Auskunft')} {V('geben')} (über + Akk.)", "Die Mitarbeiterin gibt Auskunft über die Kosten."),
        (f"in {N('Kraft')} {V('treten')}", "Der neue Vertrag tritt am 1. Januar in Kraft."),
    ]),
    ("Wohnen", [
        ("N", "die Miete", "die Mieten", "Die Miete überweise ich immer am Monatsanfang."),
        ("N", "die Nebenkosten", "nur Plural", "Die Nebenkosten sind dieses Jahr gestiegen."),
        ("N", "die Kaution", "die Kautionen", "Die Kaution beträgt zwei Monatsmieten."),
        ("N", "der Mieter / die Mieterin", "die Mieter / die Mieterinnen", "Die Mieter im Erdgeschoss haben einen Garten."),
        ("N", "der Vermieter / die Vermieterin", "die Vermieter / die Vermieterinnen", "Ich habe die Vermieterin über den Schaden informiert."),
        ("N", "die Hausverwaltung", "die Hausverwaltungen", "Die Hausverwaltung schickt morgen einen Handwerker."),
        ("N", "die Hausordnung", "die Hausordnungen", "Laut Hausordnung ist ab 22 Uhr Ruhe."),
        ("N", "der Schaden", "die Schäden", "Der Schaden am Fenster muss repariert werden."),
        ("N", "der Umzug", "die Umzüge", "Für den Umzug brauche ich einen Transporter."),
        ("N", "die Nachbarschaft", "die Nachbarschaften", "In unserer Nachbarschaft hilft man sich."),
        ("N", "der Mietvertrag", "die Mietverträge", "Der Mietvertrag ist unbefristet."),
        ("N", "die Nebenkostenabrechnung", "die Nebenkostenabrechnungen", "Die Nebenkostenabrechnung kommt einmal im Jahr."),
        ("N", "die Wohngemeinschaft (WG)", "die Wohngemeinschaften", "Ich wohne in einer Wohngemeinschaft mit zwei Studentinnen."),
        ("V", "mieten", "mietet · hat gemietet", "Wir haben eine Dreizimmerwohnung gemietet."),
        ("V", "umziehen", "zieht um · <b>ist</b> umgezogen", "Wir sind im Mai in eine größere Wohnung umgezogen."),
        ("V", "einziehen", "zieht ein · <b>ist</b> eingezogen", "Die neuen Nachbarn sind letzte Woche eingezogen."),
        ("V", "renovieren", "renoviert · hat renoviert", "Der Vermieter renoviert das Treppenhaus."),
        ("V", "reparieren", "repariert · hat repariert", "Wann wird die Heizung repariert?"),
        ("V", "stören", "stört · hat gestört", "Die laute Musik stört die Nachbarn."),
        ("V", "lüften", "lüftet · hat gelüftet", "Im Winter sollte man mehrmals am Tag kurz lüften."),
        ("A", "möbliert", "Gegenteil: unmöbliert", "Das Zimmer ist möbliert."),
        ("A", "renovierungsbedürftig", "Gegenteil: frisch renoviert", "Die Wohnung ist günstig, aber renovierungsbedürftig."),
    ], [
        (f"einen {N('Mietvertrag')} {V('abschließen')}", "Wir haben den Mietvertrag gestern abgeschlossen."),
        (f"{N('Rücksicht')} {V('nehmen')} (auf + Akk.)", "Bitte nehmen Sie Rücksicht auf die Nachbarn."),
        (f"einen {N('Schaden')} {V('melden')}", "Ich melde den Schaden sofort der Hausverwaltung."),
        (f"die {N('Ruhezeiten')} {V('einhalten')}", "Alle Mieter müssen die Ruhezeiten einhalten."),
        (f"in {N('Ordnung')} {V('bringen')}", "Bis Freitag bringen wir die Wohnung in Ordnung."),
    ]),
    ("Gesundheit", [
        ("N", "die Krankenversicherung", "die Krankenversicherungen", "In Deutschland ist eine Krankenversicherung Pflicht."),
        ("N", "die Gesundheitskarte", "die Gesundheitskarten", "Bitte bringen Sie Ihre Gesundheitskarte mit."),
        ("N", "die Überweisung", "die Überweisungen", "Meine Hausärztin hat mir eine Überweisung zum Orthopäden gegeben."),
        ("N", "das Rezept", "die Rezepte", "Mit dem Rezept gehe ich in die Apotheke."),
        ("N", "die Beschwerden", "Plural (= Schmerzen, Probleme)", "Seit wann haben Sie diese Beschwerden?"),
        ("N", "die Untersuchung", "die Untersuchungen", "Für die Untersuchung müssen Sie nüchtern sein."),
        ("N", "die Behandlung", "die Behandlungen", "Die Behandlung dauert etwa drei Wochen."),
        ("N", "die Nebenwirkung", "die Nebenwirkungen", "Das Medikament hat kaum Nebenwirkungen."),
        ("N", "die Vorsorge", "meist ohne Plural", "Regelmäßige Vorsorge ist wichtig."),
        ("N", "die Notaufnahme", "die Notaufnahmen", "Nachts bin ich mit starken Schmerzen in die Notaufnahme gefahren."),
        ("N", "die Sprechstunde", "die Sprechstunden", "Die Sprechstunde ist mittwochs nur vormittags."),
        ("N", "die Ernährung", "meist ohne Plural", "Eine gesunde Ernährung hält fit."),
        ("N", "der Facharzt / die Fachärztin", "die Fachärzte / die Fachärztinnen", "Auf einen Termin bei der Fachärztin warte ich oft lange."),
        ("V", "untersuchen", "untersucht · hat untersucht", "Die Ärztin untersucht mein Knie."),
        ("V", "verschreiben", "verschreibt · hat verschrieben", "Der Arzt hat mir Tabletten verschrieben."),
        ("V", "krankschreiben", "schreibt krank · hat krankgeschrieben", "Die Ärztin hat mich drei Tage krankgeschrieben."),
        ("V", "sich erholen (von + Dat.)", "erholt sich · hat sich erholt", "Ich habe mich gut von der Operation erholt."),
        ("V", "leiden (an / unter + Dat.)", "leidet · hat gelitten", "Viele Menschen leiden unter Rückenschmerzen."),
        ("V", "vorbeugen (+ Dat.)", "beugt vor · hat vorgebeugt", "Mit Bewegung kann man vielen Krankheiten vorbeugen."),
        ("V", "behandeln", "behandelt · hat behandelt", "Die Wunde wurde sofort behandelt."),
        ("A", "ansteckend", "Steigerung: ansteckender", "Die Grippe ist sehr ansteckend."),
        ("A", "chronisch", "Gegenteil: akut", "Er hat eine chronische Krankheit."),
    ], [
        (f"in {N('Behandlung')} {V('sein')} (bei + Dat.)", "Ich bin seit Mai bei einem Physiotherapeuten in Behandlung."),
        (f"eine {N('Diagnose')} {V('stellen')}", "Der Arzt kann noch keine Diagnose stellen."),
        (f"einen {N('Termin')} {V('vereinbaren')}", "Ich möchte einen Termin für nächste Woche vereinbaren."),
        (f"{N('Sport')} {V('treiben')}", "Ich treibe zweimal pro Woche Sport."),
        (f"sich einer {N('Operation')} {V('unterziehen')}", "Sie muss sich einer Operation am Knie unterziehen."),
    ]),
    ("Medien", [
        ("N", "die Nachricht", "die Nachrichten", "Die Nachricht hat sich schnell verbreitet."),
        ("N", "die Quelle", "die Quellen", "Prüfen Sie immer die Quelle einer Information."),
        ("N", "der Bericht", "die Berichte", "Der Bericht im Fernsehen war sehr informativ."),
        ("N", "die Werbung", "meist ohne Plural", "Im Internet sieht man ständig Werbung."),
        ("N", "der Beitrag", "die Beiträge", "Ihr Beitrag im Forum hat viele Kommentare bekommen."),
        ("N", "die Falschmeldung", "die Falschmeldungen", "Falschmeldungen verbreiten sich in sozialen Netzwerken schnell."),
        ("N", "der Datenschutz", "ohne Plural", "Achten Sie bei Apps auf den Datenschutz."),
        ("N", "das Netzwerk", "die Netzwerke", "Soziale Netzwerke verändern die Kommunikation."),
        ("N", "der Nutzer / die Nutzerin", "die Nutzer / die Nutzerinnen", "Viele Nutzer lesen die Datenschutzerklärung nicht."),
        ("N", "die Meinungsfreiheit", "ohne Plural", "Die Meinungsfreiheit ist im Grundgesetz geschützt."),
        ("N", "der Bildschirm", "die Bildschirme", "Kinder sollten nicht zu lange vor dem Bildschirm sitzen."),
        ("N", "die Sendung", "die Sendungen", "Die Sendung läuft jeden Sonntag um 20 Uhr."),
        ("N", "die Schlagzeile", "die Schlagzeilen", "Die Schlagzeile klingt dramatischer als der Artikel."),
        ("N", "die Abhängigkeit", "die Abhängigkeiten", "Viele Eltern sorgen sich wegen der Abhängigkeit vom Smartphone."),
        ("V", "veröffentlichen", "veröffentlicht · hat veröffentlicht", "Die Zeitung hat das Interview gestern veröffentlicht."),
        ("V", "verbreiten", "verbreitet · hat verbreitet", "Bitte verbreiten Sie keine ungeprüften Informationen."),
        ("V", "herunterladen", "lädt herunter · hat heruntergeladen", "Das Formular können Sie online herunterladen."),
        ("V", "sich informieren (über + Akk.)", "informiert sich · hat sich informiert", "Ich informiere mich online über aktuelle Ereignisse."),
        ("V", "teilen", "teilt · hat geteilt", "Sie hat das Video mit ihren Freunden geteilt."),
        ("V", "beeinflussen", "beeinflusst · hat beeinflusst", "Werbung beeinflusst unsere Kaufentscheidungen."),
        ("A", "zuverlässig", "Gegenteil: unzuverlässig", "Ist diese Quelle zuverlässig?"),
        ("A", "aktuell", "Gegenteil: veraltet", "Die Zahlen auf der Webseite sind nicht mehr aktuell."),
    ], [
        (f"eine {N('Rolle')} {V('spielen')}", "Soziale Medien spielen im Alltag eine große Rolle."),
        (f"{N('Kritik')} {V('üben')} (an + Dat.)", "Viele Leser üben Kritik an dem Artikel."),
        (f"{N('Einfluss')} {V('nehmen')} (auf + Akk.)", "Werbung nimmt Einfluss auf unser Kaufverhalten."),
        (f"eine {N('Meinung')} {V('vertreten')}", "In der Diskussion vertritt sie eine klare Meinung."),
        (f"in {N('Frage')} {V('stellen')} / infrage stellen", "Er stellt die Informationen aus dem Video infrage."),
    ]),
    ("Umwelt", [
        ("N", "der Umweltschutz", "ohne Plural", "Jeder kann etwas für den Umweltschutz tun."),
        ("N", "der Klimawandel", "ohne Plural", "Der Klimawandel ist ein globales Problem."),
        ("N", "der Müll", "ohne Plural", "Wir trennen den Müll in vier Tonnen."),
        ("N", "die Mülltrennung", "meist ohne Plural", "Die Mülltrennung ist nicht in jeder Stadt gleich geregelt."),
        ("N", "die Verpackung", "die Verpackungen", "Dieser Laden verkauft Lebensmittel ohne Verpackung."),
        ("N", "der Verbrauch", "meist ohne Plural", "Im Winter ist der Verbrauch von Strom höher."),
        ("N", "die Energie", "die Energien", "Erneuerbare Energien kommen aus Sonne, Wind und Wasser."),
        ("N", "der Abfall", "die Abfälle", "Abfälle gehören nicht in die Natur."),
        ("N", "die Umweltverschmutzung", "meist ohne Plural", "Plastik im Meer ist eine große Umweltverschmutzung."),
        ("N", "das Verkehrsmittel", "die Verkehrsmittel", "Öffentliche Verkehrsmittel sind umweltfreundlicher als das Auto."),
        ("N", "die Nachhaltigkeit", "ohne Plural", "Viele Firmen werben mit Nachhaltigkeit."),
        ("N", "die Solaranlage", "die Solaranlagen", "Auf unserem Dach gibt es eine Solaranlage."),
        ("N", "die Ressource", "die Ressourcen", "Wasser ist eine wertvolle Ressource."),
        ("N", "die Hitzewelle", "die Hitzewellen", "Im letzten Sommer gab es mehrere Hitzewellen."),
        ("V", "trennen", "trennt · hat getrennt", "Glas trennt man nach Farben."),
        ("V", "sparen", "spart · hat gespart", "Mit LED-Lampen spart man Strom."),
        ("V", "vermeiden", "vermeidet · hat vermieden", "Ich versuche, Plastiktüten zu vermeiden."),
        ("V", "verschwenden", "verschwendet · hat verschwendet", "Wir verschwenden zu viele Lebensmittel."),
        ("V", "schützen (vor + Dat.)", "schützt · hat geschützt", "Bäume schützen die Stadt vor Hitze."),
        ("V", "recyceln", "recycelt · hat recycelt", "Altpapier wird recycelt."),
        ("A", "umweltfreundlich", "Gegenteil: umweltschädlich", "Fahrradfahren ist umweltfreundlich."),
        ("A", "erneuerbar", "Gegenteil: nicht erneuerbar", "Unser Strom kommt aus erneuerbaren Quellen."),
    ], [
        (f"einen {N('Beitrag')} {V('leisten')} (zu + Dat.)", "Jeder kann einen Beitrag zum Umweltschutz leisten."),
        (f"{N('Maßnahmen')} {V('ergreifen')}", "Die Stadt ergreift Maßnahmen gegen die Hitze."),
        (f"{N('Wert')} {V('legen')} (auf + Akk.)", "Ich lege Wert auf regionale Produkte."),
        (f"zur {N('Folge')} {V('haben')}", "Die Trockenheit hat schlechte Ernten zur Folge."),
        (f"{N('Verantwortung')} {V('tragen')} (für + Akk.)", "Wir alle tragen Verantwortung für die Umwelt."),
    ]),
    ("Bildung und Weiterbildung", [
        ("N", "die Ausbildung", "die Ausbildungen", "Sie macht eine Ausbildung zur Pflegefachfrau."),
        ("N", "die Weiterbildung", "die Weiterbildungen", "Die Firma bezahlt mir eine Weiterbildung."),
        ("N", "der Abschluss", "die Abschlüsse", "Mein Abschluss wurde in Deutschland anerkannt."),
        ("N", "die Anerkennung", "die Anerkennungen", "Die Anerkennung meines Diploms hat ein halbes Jahr gedauert."),
        ("N", "das Zeugnis", "die Zeugnisse", "Bitte legen Sie Kopien Ihrer Zeugnisse bei."),
        ("N", "die Prüfung", "die Prüfungen", "Die Prüfung findet im Juni statt."),
        ("N", "der Kurs", "die Kurse", "Der Kurs findet zweimal pro Woche abends statt."),
        ("N", "die Teilnahme", "meist ohne Plural", "Die Teilnahme an der Infoveranstaltung ist kostenlos."),
        ("N", "die Kenntnisse", "meist Plural", "Ich möchte meine Kenntnisse in Buchhaltung verbessern."),
        ("N", "die Fähigkeit", "die Fähigkeiten", "Welche Fähigkeiten bringen Sie mit?"),
        ("N", "das Studium", "die Studien", "Nach dem Studium möchte ich in einem Labor arbeiten."),
        ("N", "das Praktikum", "die Praktika", "Ich mache ein Praktikum in einer Kita."),
        ("N", "das Lernziel", "die Lernziele", "Setzen Sie sich jede Woche ein klares Lernziel."),
        ("N", "die Berufsschule", "die Berufsschulen", "Zwei Tage pro Woche bin ich in der Berufsschule."),
        ("V", "sich weiterbilden", "bildet sich weiter · hat sich weitergebildet", "Ich möchte mich im IT-Bereich weiterbilden."),
        ("V", "bestehen", "besteht · hat bestanden", "Ich habe die Prüfung beim ersten Mal bestanden."),
        ("V", "durchfallen (durch + Akk.)", "fällt durch · <b>ist</b> durchgefallen", "Er ist leider durch die Prüfung durchgefallen."),
        ("V", "teilnehmen (an + Dat.)", "nimmt teil · hat teilgenommen", "Ich nehme an einem Online-Kurs teil."),
        ("V", "anerkennen", "erkennt an · hat anerkannt", "Wurde Ihr Abschluss schon anerkannt?"),
        ("V", "sich vorbereiten (auf + Akk.)", "bereitet sich vor · hat sich vorbereitet", "Ich bereite mich auf die B2-Prüfung vor."),
        ("A", "berufsbegleitend", "Gegensatz: in Vollzeit", "Den Kurs kann man berufsbegleitend machen."),
        ("A", "qualifiziert (für + Akk.)", "Gegenteil: unqualifiziert", "Für die Stelle sind Sie sehr gut qualifiziert."),
    ], [
        (f"eine {N('Prüfung')} {V('ablegen')}", "Im Juni lege ich die Prüfung ab."),
        (f"einen {N('Abschluss')} {V('machen')}", "Sie möchte einen Abschluss als Erzieherin machen."),
        (f"{N('Kenntnisse')} {V('erwerben')}", "Im Kurs erwerben Sie Kenntnisse in Excel."),
        (f"einen {N('Kurs')} {V('belegen')}", "Ich habe einen Kurs für Buchhaltung belegt."),
        (f"{N('Fortschritte')} {V('machen')}", "In den letzten Monaten haben Sie große Fortschritte gemacht."),
    ]),
]

# 24 schwierige Wörter für die Karteikarten: (Thema-Index, Wort genau wie in der Liste)
KARTEN = [
    (0, "die Kündigungsfrist"), (0, "sich bewerben (um + Akk.)"), (0, "befristet"),
    (1, "das Missverständnis"), (1, "sich einigen (auf + Akk.)"), (1, "weiterleiten (an + Akk.)"),
    (2, "der Bescheid"), (2, "die Aufenthaltserlaubnis"), (2, "einreichen"),
    (3, "die Kaution"), (3, "die Nebenkosten"), (3, "umziehen"),
    (4, "die Überweisung"), (4, "die Beschwerden"), (4, "vorbeugen (+ Dat.)"),
    (5, "die Schlagzeile"), (5, "der Beitrag"), (5, "sich informieren (über + Akk.)"),
    (6, "der Abfall"), (6, "der Verbrauch"), (6, "vermeiden"),
    (7, "der Abschluss"), (7, "das Zeugnis"), (7, "durchfallen (durch + Akk.)"),
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
            R(f"{len(eintraege)} Wörter + 5 feste Verbindungen · Hake ab, was du sicher kannst.", "small")]
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
    R("B2 · Wortschatz · Wortliste zum Lernen", "kick"),
    R(TITLE, "h1"),
    R("Acht Themen aus telc Deutsch B2 und DTB B2 – mit Artikel, Plural, Verbformen, Beispielsatz "
      "und festen Verbindungen. Am Ende: 24 Karteikarten zum Ausschneiden.", "lead"),
    box(R(
        f"<b>So lernst du:</b> Nomen immer <b>mit Artikel und Plural</b> "
        f'(<font color="{ART["der"]}"><b>der</b></font> blau · <font color="{ART["die"]}"><b>die</b></font> rot · '
        f'<font color="{ART["das"]}"><b>das</b></font> grün). Verben mit <b>Präposition und Perfekt</b> – Achtung bei '
        f"<b>ist</b> (umziehen, durchfallen). Decke die Beispielsätze ab, bilde eigene Sätze und hake {sym('☐')} ab, was sitzt.",
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


KURZ = ["Arbeit und Beruf", "Betrieb und Kunden", "Behörden und Verträge", "Wohnen", "Gesundheit", "Medien",
        "Umwelt", "Bildung"]
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
