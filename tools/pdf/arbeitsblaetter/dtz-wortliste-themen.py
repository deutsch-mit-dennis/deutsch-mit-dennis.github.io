# DTZ-Wortliste nach Prüfungsthemen (A2–B1, Deutsch-Test für Zuwanderer) + Karteikarten zum Ausschneiden
# Aufruf aus dem Repo-Wurzelordner: py -X utf8 tools/pdf/arbeitsblaetter/dtz-wortliste-themen.py
# Gleiche Datenstruktur (THEMEN / KARTEN / KURZ) wie b2-wortliste-pruefungsthemen.py -> gleicher Karteikarten-Export.
import os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from arbeitsblatt_lib import *
from arbeitsblatt_lib import LINE, MUTED, TINTE
from reportlab.platypus import Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER

SLUG = "dtz-wortliste-themen"
TITLE = "DTZ-Wortliste nach Prüfungsthemen (A2–B1)"
LEVEL = "A2–B1"

ART = {"der": "#2341B5", "die": "#C2362B", "das": "#1D7A45"}
N = lambda t: f'<b><font color="#2341B5">{t}</font></b>'  # Nomen in Wendungen
V = lambda t: f'<b><font color="#C2362B">{t}</font></b>'  # Verb in Wendungen

# Eintrag: (Wortart, Wort, Formen, Beispielsatz)
# N = Nomen (Artikel + Plural), V = Verb (Präsens 3. Pers. + Perfekt), A = Adjektiv (Gegenteil / Rektion)
THEMEN = [
    ("Wohnen und Nachbarschaft", [
        ("N", "die Wohnung", "die Wohnungen", "Wir suchen eine Wohnung mit drei Zimmern."),
        ("N", "die Miete", "die Mieten", "Die Miete zahle ich immer am Monatsanfang."),
        ("N", "die Nebenkosten", "nur Plural", "Die Nebenkosten sind im letzten Jahr gestiegen."),
        ("N", "die Kaution", "die Kautionen", "Die Kaution beträgt zwei Monatsmieten."),
        ("N", "der Vermieter", "die Vermieter", "Der Vermieter wohnt im Erdgeschoss."),
        ("N", "der Mietvertrag", "die Mietverträge", "Ich habe den Mietvertrag gestern unterschrieben."),
        ("N", "der Nachbar", "die Nachbarn", "Unsere Nachbarn sind sehr freundlich."),
        ("N", "die Hausordnung", "die Hausordnungen", "In der Hausordnung stehen die Ruhezeiten."),
        ("N", "der Hausmeister", "die Hausmeister", "Der Hausmeister repariert die Haustür."),
        ("N", "die Heizung", "die Heizungen", "Die Heizung im Bad funktioniert nicht."),
        ("N", "der Schlüssel", "die Schlüssel", "Ich habe meinen Schlüssel verloren."),
        ("N", "der Müll", "ohne Plural", "Der Müll wird am Dienstag abgeholt."),
        ("N", "das Treppenhaus", "die Treppenhäuser", "Im Treppenhaus dürfen keine Fahrräder stehen."),
        ("N", "der Umzug", "die Umzüge", "Für den Umzug brauchen wir einen Transporter."),
        ("V", "umziehen", "zieht um · <b>ist</b> umgezogen", "Wir sind im Mai nach Dortmund umgezogen."),
        ("V", "mieten", "mietet · hat gemietet", "Wir haben eine kleine Wohnung gemietet."),
        ("V", "sich beschweren (über + Akk.)", "beschwert sich · hat sich beschwert", "Der Nachbar hat sich über die laute Musik beschwert."),
        ("V", "reparieren", "repariert · hat repariert", "Wer repariert die kaputte Klingel?"),
        ("V", "klingeln", "klingelt · hat geklingelt", "Der Paketbote hat zweimal geklingelt."),
        ("V", "trennen", "trennt · hat getrennt", "Wir trennen Papier, Glas und Plastik."),
        ("A", "laut", "Gegenteil: leise", "Nach 22 Uhr darf es nicht mehr laut sein."),
        ("A", "möbliert", "Gegenteil: unmöbliert", "Das Zimmer ist möbliert."),
    ], [
        (f"eine {N('Wohnung')} {V('besichtigen')}", "Am Samstag können wir die Wohnung besichtigen."),
        (f"den {N('Müll')} {V('rausbringen')}", "Kannst du bitte den Müll rausbringen?"),
        (f"die {N('Miete')} {V('überweisen')}", "Ich überweise die Miete per Dauerauftrag."),
        (f"{N('Bescheid')} {V('sagen')}", "Sagen Sie mir bitte Bescheid, wenn das Paket kommt."),
        (f"auf die {N('Ruhezeiten')} {V('achten')}", "Bitte achten Sie auf die Ruhezeiten."),
    ]),
    ("Arbeit und Jobsuche", [
        ("N", "die Stelle", "die Stellen", "Ich suche eine Stelle als Verkäuferin."),
        ("N", "die Bewerbung", "die Bewerbungen", "Heute schreibe ich drei Bewerbungen."),
        ("N", "der Lebenslauf", "die Lebensläufe", "Der Lebenslauf sollte nicht länger als zwei Seiten sein."),
        ("N", "das Vorstellungsgespräch", "die Vorstellungsgespräche", "Morgen habe ich ein Vorstellungsgespräch."),
        ("N", "der Arbeitsvertrag", "die Arbeitsverträge", "Im Arbeitsvertrag stehen die Arbeitszeiten."),
        ("N", "der Lohn", "die Löhne", "Der Lohn kommt am Ende des Monats."),
        ("N", "der Chef", "die Chefs", "Ich muss meinen Chef um einen freien Tag bitten."),
        ("N", "der Kollege", "die Kollegen", "Meine Kollegen helfen mir oft."),
        ("N", "die Schicht", "die Schichten", "Diese Woche arbeite ich in der Frühschicht."),
        ("N", "der Urlaub", "die Urlaube", "Wie viele Tage Urlaub haben Sie im Jahr?"),
        ("N", "die Teilzeit", "ohne Plural", "Ich arbeite in Teilzeit, 20 Stunden pro Woche."),
        ("N", "das Praktikum", "die Praktika", "Ich mache ein Praktikum in einem Hotel."),
        ("N", "die Erfahrung", "die Erfahrungen", "Haben Sie Erfahrung im Verkauf?"),
        ("N", "das Jobcenter", "die Jobcenter", "Ich habe am Donnerstag einen Termin im Jobcenter."),
        ("V", "sich bewerben (um + Akk.)", "bewirbt sich · hat sich beworben", "Ich bewerbe mich um eine Stelle im Lager."),
        ("V", "verdienen", "verdient · hat verdient", "Wie viel verdient man als Busfahrer?"),
        ("V", "kündigen", "kündigt · hat gekündigt", "Sie hat ihre Stelle gekündigt."),
        ("V", "anfangen", "fängt an · hat angefangen", "Am Montag fange ich in der neuen Firma an."),
        ("V", "sich krankmelden", "meldet sich krank · hat sich krankgemeldet", "Ich muss mich heute krankmelden."),
        ("A", "arbeitslos", "Gegenteil: berufstätig", "Seit März bin ich arbeitslos."),
        ("A", "befristet", "Gegenteil: unbefristet", "Mein Vertrag ist auf ein Jahr befristet."),
    ], [
        (f"in {N('Vollzeit')} {V('arbeiten')}", "Ich möchte gern in Vollzeit arbeiten."),
        (f"{N('Überstunden')} {V('machen')}", "Vor Weihnachten machen wir viele Überstunden."),
        (f"{N('Urlaub')} {V('nehmen')}", "Im August nehme ich zwei Wochen Urlaub."),
        (f"eine {N('Ausbildung')} {V('machen')}", "Sie macht eine Ausbildung zur Köchin."),
        (f"{N('Erfahrungen')} {V('sammeln')}", "Im Praktikum habe ich viele Erfahrungen gesammelt."),
    ]),
    ("Ämter und Behörden", [
        ("N", "das Amt", "die Ämter", "Das Amt ist nur vormittags geöffnet."),
        ("N", "die Behörde", "die Behörden", "Die Behörde hat mir einen Brief geschickt."),
        ("N", "das Formular", "die Formulare", "Das Formular gibt es auch online."),
        ("N", "der Antrag", "die Anträge", "Der Antrag ist noch nicht vollständig."),
        ("N", "der Termin", "die Termine", "Ich brauche einen Termin beim Bürgeramt."),
        ("N", "der Ausweis", "die Ausweise", "Bitte zeigen Sie Ihren Ausweis."),
        ("N", "die Unterschrift", "die Unterschriften", "Hier fehlt noch Ihre Unterschrift."),
        ("N", "die Bescheinigung", "die Bescheinigungen", "Ich brauche eine Bescheinigung vom Arbeitgeber."),
        ("N", "der Bescheid", "die Bescheide", "Der Bescheid kam gestern mit der Post."),
        ("N", "die Frist", "die Fristen", "Die Frist endet am 30. Juni."),
        ("N", "die Wartenummer", "die Wartenummern", "Ziehen Sie bitte eine Wartenummer."),
        ("N", "die Anmeldung", "die Anmeldungen", "Für die Anmeldung brauchen Sie Ihren Ausweis."),
        ("N", "die Ausländerbehörde", "die Ausländerbehörden", "Mein Termin bei der Ausländerbehörde ist am Dienstag."),
        ("N", "die Aufenthaltserlaubnis", "die Aufenthaltserlaubnisse", "Meine Aufenthaltserlaubnis gilt noch ein Jahr."),
        ("V", "ausfüllen", "füllt aus · hat ausgefüllt", "Haben Sie das Formular schon ausgefüllt?"),
        ("V", "unterschreiben", "unterschreibt · hat unterschrieben", "Unterschreiben Sie bitte unten rechts."),
        ("V", "beantragen", "beantragt · hat beantragt", "Ich habe Wohngeld beantragt."),
        ("V", "verlängern", "verlängert · hat verlängert", "Ich möchte meine Aufenthaltserlaubnis verlängern."),
        ("V", "sich anmelden", "meldet sich an · hat sich angemeldet", "Nach dem Umzug habe ich mich beim Bürgeramt angemeldet."),
        ("V", "mitbringen", "bringt mit · hat mitgebracht", "Bringen Sie bitte alle Unterlagen mit."),
        ("A", "gültig", "Gegenteil: ungültig", "Ist Ihr Ausweis noch gültig?"),
        ("A", "zuständig (für + Akk.)", "Gegenteil: nicht zuständig", "Wer ist für meinen Antrag zuständig?"),
    ], [
        (f"einen {N('Antrag')} {V('stellen')}", "Ich möchte einen Antrag auf Kindergeld stellen."),
        (f"einen {N('Termin')} {V('vereinbaren')}", "Termine vereinbaren Sie online oder am Telefon."),
        (f"{N('Unterlagen')} {V('einreichen')}", "Bitte reichen Sie die Unterlagen bis Freitag ein."),
        (f"eine {N('Frist')} {V('einhalten')}", "Sie müssen die Frist unbedingt einhalten."),
        (f"{N('Widerspruch')} {V('einlegen')} (gegen + Akk.)", "Gegen den Bescheid können Sie Widerspruch einlegen."),
    ]),
    ("Gesundheit und Arzt", [
        ("N", "der Arzt", "die Ärzte", "Ich muss heute noch zum Arzt."),
        ("N", "die Praxis", "die Praxen", "Die Praxis ist mittwochs nachmittags geschlossen."),
        ("N", "die Sprechstunde", "die Sprechstunden", "Die Sprechstunde beginnt um acht Uhr."),
        ("N", "die Gesundheitskarte", "die Gesundheitskarten", "Bitte bringen Sie Ihre Gesundheitskarte mit."),
        ("N", "die Krankenkasse", "die Krankenkassen", "Die Krankenkasse bezahlt die Behandlung."),
        ("N", "das Rezept", "die Rezepte", "Die Ärztin schreibt mir ein Rezept."),
        ("N", "die Apotheke", "die Apotheken", "Die nächste Apotheke ist gleich um die Ecke."),
        ("N", "das Medikament", "die Medikamente", "Das Medikament gibt es nur mit Rezept."),
        ("N", "die Tablette", "die Tabletten", "Ich nehme eine Tablette gegen Kopfschmerzen."),
        ("N", "die Krankmeldung", "die Krankmeldungen", "Ich brauche eine Krankmeldung für drei Tage."),
        ("N", "der Schmerz", "die Schmerzen", "Ich habe starke Schmerzen im Rücken."),
        ("N", "das Fieber", "ohne Plural", "Das Kind hat seit gestern Fieber."),
        ("N", "die Überweisung", "die Überweisungen", "Der Hausarzt gibt mir eine Überweisung zum Facharzt."),
        ("N", "der Notfall", "die Notfälle", "Im Notfall rufen Sie die 112 an."),
        ("N", "die Erkältung", "die Erkältungen", "Ich habe eine leichte Erkältung."),
        ("V", "wehtun", "tut weh · hat wehgetan", "Mein Knie tut seit gestern weh."),
        ("V", "untersuchen", "untersucht · hat untersucht", "Die Ärztin hat mich gründlich untersucht."),
        ("V", "einnehmen", "nimmt ein · hat eingenommen", "Nehmen Sie die Tabletten nach dem Essen ein."),
        ("V", "sich fühlen", "fühlt sich · hat sich gefühlt", "Ich fühle mich heute nicht gut."),
        ("V", "sich erholen (von + Dat.)", "erholt sich · hat sich erholt", "Erholen Sie sich gut von der Operation!"),
        ("A", "krank", "Gegenteil: gesund", "Ich bin seit Montag krank."),
        ("A", "verletzt", "Gegenteil: unverletzt", "Bei dem Unfall wurde niemand verletzt."),
    ], [
        (f"einen {N('Termin')} {V('machen')}", "Ich möchte einen Termin beim Zahnarzt machen."),
        (f"{N('Fieber')} {V('messen')}", "Haben Sie schon Fieber gemessen?"),
        (f"im {N('Bett')} {V('bleiben')}", "Bleiben Sie zwei Tage im Bett."),
        (f"{N('Blut')} {V('abnehmen')}", "Die Ärztin nimmt mir Blut ab."),
        (f"gute {N('Besserung')} {V('wünschen')}", "Ich wünsche Ihnen gute Besserung!"),
    ]),
    ("Kinder, Kita und Schule", [
        ("N", "die Kita", "die Kitas", "Unsere Tochter geht seit Mai in die Kita."),
        ("N", "der Kindergarten", "die Kindergärten", "Im Kindergarten spielen die Kinder viel draußen."),
        ("N", "der Kita-Platz", "die Kita-Plätze", "Wir suchen dringend einen Kita-Platz."),
        ("N", "die Erzieherin", "die Erzieherinnen", "Die Erzieherin hat heute Mittag angerufen."),
        ("N", "die Grundschule", "die Grundschulen", "Unser Sohn kommt im Sommer in die Grundschule."),
        ("N", "der Lehrer", "die Lehrer", "Der Lehrer möchte mit uns sprechen."),
        ("N", "der Elternabend", "die Elternabende", "Der Elternabend ist am Donnerstag um 19 Uhr."),
        ("N", "das Zeugnis", "die Zeugnisse", "Vor den Sommerferien gibt es Zeugnisse."),
        ("N", "die Hausaufgabe", "die Hausaufgaben", "Die Hausaufgaben sind heute schwer."),
        ("N", "die Klasse", "die Klassen", "Meine Tochter geht in die dritte Klasse."),
        ("N", "das Schuljahr", "die Schuljahre", "Das neue Schuljahr beginnt nach den Sommerferien."),
        ("N", "die Ferien", "nur Plural", "In den Ferien besuchen wir meine Schwester."),
        ("N", "der Ausflug", "die Ausflüge", "Die Klasse macht morgen einen Ausflug in den Zoo."),
        ("N", "die Entschuldigung", "die Entschuldigungen", "Ich schreibe eine Entschuldigung für die Schule."),
        ("N", "die Betreuung", "meist ohne Plural", "Die Betreuung dauert bis 16 Uhr."),
        ("V", "abholen", "holt ab · hat abgeholt", "Ich hole die Kinder um 15 Uhr ab."),
        ("V", "anmelden", "meldet an · hat angemeldet", "Wir haben unseren Sohn in der Schule angemeldet."),
        ("V", "erziehen", "erzieht · hat erzogen", "Wir erziehen unsere Kinder zweisprachig."),
        ("V", "fehlen", "fehlt · hat gefehlt", "Mein Sohn hat gestern in der Schule gefehlt."),
        ("V", "sich kümmern (um + Akk.)", "kümmert sich · hat sich gekümmert", "Die Oma kümmert sich nachmittags um die Kinder."),
        ("A", "pünktlich", "Gegenteil: unpünktlich", "Bitte bringen Sie Ihr Kind pünktlich in die Kita."),
        ("A", "schulpflichtig", "Gegenteil: nicht schulpflichtig", "Ab wann ist mein Kind schulpflichtig?"),
    ], [
        (f"{N('Hausaufgaben')} {V('machen')}", "Nach dem Essen macht er seine Hausaufgaben."),
        (f"in die {N('Schule')} {V('gehen')}", "Meine Tochter geht gern in die Schule."),
        (f"ein {N('Gespräch')} {V('vereinbaren')}", "Ich möchte ein Gespräch mit der Lehrerin vereinbaren."),
        (f"{N('Bescheid')} {V('geben')}", "Bitte geben Sie der Kita Bescheid, wenn Ihr Kind krank ist."),
        (f"am {N('Elternabend')} {V('teilnehmen')}", "Ich nehme am Elternabend teil."),
    ]),
    ("Einkaufen und Geld", [
        ("N", "das Geschäft", "die Geschäfte", "Das Geschäft öffnet um neun Uhr."),
        ("N", "der Preis", "die Preise", "Der Preis steht auf dem Schild."),
        ("N", "das Angebot", "die Angebote", "Diese Woche ist Kaffee im Angebot."),
        ("N", "der Kassenbon", "die Kassenbons", "Bitte heben Sie den Kassenbon auf."),
        ("N", "die Kasse", "die Kassen", "Bitte zahlen Sie vorne an der Kasse."),
        ("N", "das Bargeld", "ohne Plural", "Haben Sie Bargeld dabei?"),
        ("N", "die EC-Karte", "die EC-Karten", "Kann ich mit EC-Karte bezahlen?"),
        ("N", "das Konto", "die Konten", "Das Geld ist schon auf meinem Konto."),
        ("N", "die Rechnung", "die Rechnungen", "Die Rechnung kommt per Post."),
        ("N", "der Umtausch", "meist ohne Plural", "Ein Umtausch ist nur mit Kassenbon möglich."),
        ("N", "die Garantie", "die Garantien", "Die Waschmaschine hat drei Jahre Garantie."),
        ("N", "die Größe", "die Größen", "Haben Sie die Hose auch in Größe 40?"),
        ("N", "die Lieferung", "die Lieferungen", "Die Lieferung kommt morgen Vormittag."),
        ("N", "die Gebühr", "die Gebühren", "Für das Konto zahle ich keine Gebühr."),
        ("N", "das Kleingeld", "ohne Plural", "Ich habe leider kein Kleingeld."),
        ("V", "bezahlen", "bezahlt · hat bezahlt", "Ich bezahle mit Karte."),
        ("V", "umtauschen", "tauscht um · hat umgetauscht", "Ich möchte die Schuhe umtauschen."),
        ("V", "anprobieren", "probiert an · hat anprobiert", "Kann ich die Jacke anprobieren?"),
        ("V", "sparen", "spart · hat gespart", "Wir sparen für ein neues Auto."),
        ("V", "ausgeben (für + Akk.)", "gibt aus · hat ausgegeben", "Wie viel Geld gibst du im Monat für Essen aus?"),
        ("A", "günstig", "Gegenteil: teuer", "Auf dem Markt ist Obst oft günstiger."),
        ("A", "kaputt", "Gegenteil: ganz / in Ordnung", "Der Toaster war schon beim Kauf kaputt."),
    ], [
        (f"ein {N('Konto')} {V('eröffnen')}", "Für den Lohn muss ich ein Konto eröffnen."),
        (f"{N('Geld')} {V('abheben')}", "Ich hebe am Automaten 50 Euro ab."),
        (f"in {N('Raten')} {V('zahlen')}", "Den Kühlschrank kann man in Raten zahlen."),
        (f"eine {N('Rechnung')} {V('bezahlen')}", "Bitte bezahlen Sie die Rechnung innerhalb von 14 Tagen."),
        (f"das {N('Geld')} {V('zurückbekommen')}", "Bekomme ich das Geld zurück?"),
    ]),
    ("Verkehr und Reisen", [
        ("N", "der Bahnhof", "die Bahnhöfe", "Wir treffen uns am Bahnhof."),
        ("N", "die Haltestelle", "die Haltestellen", "Die Haltestelle ist direkt vor dem Haus."),
        ("N", "die Fahrkarte", "die Fahrkarten", "Die Fahrkarte kaufen Sie am Automaten oder in der App."),
        ("N", "das Gleis", "die Gleise", "Der Zug fährt heute von Gleis 5 ab."),
        ("N", "die Verspätung", "die Verspätungen", "Der Zug hat 20 Minuten Verspätung."),
        ("N", "der Anschluss", "die Anschlüsse", "Der Anschluss in Hamm ist sehr knapp."),
        ("N", "die Abfahrt", "die Abfahrten", "Die Abfahrt ist um Viertel nach acht."),
        ("N", "die Ankunft", "die Ankünfte", "Die Ankunft ist für 10 Uhr geplant."),
        ("N", "der Führerschein", "die Führerscheine", "Ist mein Führerschein aus der Heimat hier gültig?"),
        ("N", "die Ampel", "die Ampeln", "An der Ampel müssen Sie links abbiegen."),
        ("N", "die Baustelle", "die Baustellen", "Wegen einer Baustelle fährt der Bus heute anders."),
        ("N", "das Gepäck", "ohne Plural", "Wie viel Gepäck darf ich mitnehmen?"),
        ("N", "die Unterkunft", "die Unterkünfte", "Wir suchen eine günstige Unterkunft am Meer."),
        ("N", "der Stau", "die Staus", "Auf der Autobahn war ein langer Stau."),
        ("N", "das Deutschlandticket", "die Deutschlandtickets", "Mit dem Deutschlandticket fahre ich mit Bus und Bahn."),
        ("V", "umsteigen", "steigt um · <b>ist</b> umgestiegen", "In Duisburg müssen Sie umsteigen."),
        ("V", "abfahren", "fährt ab · <b>ist</b> abgefahren", "Der Bus ist gerade abgefahren."),
        ("V", "ankommen", "kommt an · <b>ist</b> angekommen", "Wann kommt der Zug in Berlin an?"),
        ("V", "verpassen", "verpasst · hat verpasst", "Ich habe den letzten Bus verpasst."),
        ("V", "buchen", "bucht · hat gebucht", "Wir haben die Reise im Internet gebucht."),
        ("A", "direkt", "Gegensatz: mit Umsteigen", "Gibt es eine direkte Verbindung nach Hamburg?"),
    ], [
        (f"den {N('Führerschein')} {V('machen')}", "Ich mache gerade den Führerschein."),
        (f"in den {N('Bus')} {V('einsteigen')}", "Steigen Sie bitte vorne in den Bus ein."),
        (f"{N('Urlaub')} {V('machen')}", "Im Sommer machen wir Urlaub an der Ostsee."),
        (f"den {N('Koffer')} {V('packen')}", "Hast du schon den Koffer gepackt?"),
        (f"mit {N('Verspätung')} {V('ankommen')}", "Der Zug ist mit zehn Minuten Verspätung angekommen."),
    ]),
    ("Freizeit und Kurs", [
        ("N", "die Freizeit", "ohne Plural", "In meiner Freizeit gehe ich gern spazieren."),
        ("N", "das Hobby", "die Hobbys", "Mein Hobby ist Kochen."),
        ("N", "der Verein", "die Vereine", "Mein Sohn spielt Fußball im Verein."),
        ("N", "das Fitnessstudio", "die Fitnessstudios", "Ich gehe zweimal pro Woche ins Fitnessstudio."),
        ("N", "das Kino", "die Kinos", "Am Wochenende gehen wir ins Kino."),
        ("N", "die Veranstaltung", "die Veranstaltungen", "Die Veranstaltung beginnt um 18 Uhr."),
        ("N", "die Volkshochschule", "die Volkshochschulen", "An der Volkshochschule gibt es viele Kurse."),
        ("N", "der Kurs", "die Kurse", "Der Kurs findet montags und mittwochs statt."),
        ("N", "der Integrationskurs", "die Integrationskurse", "Im Integrationskurs lerne ich Deutsch."),
        ("N", "die Lehrkraft", "die Lehrkräfte", "Die Lehrkraft erklärt die Grammatik noch einmal."),
        ("N", "die Prüfung", "die Prüfungen", "Die Prüfung ist am Samstag."),
        ("N", "die Pause", "die Pausen", "Die Pause dauert 15 Minuten."),
        ("N", "das Wörterbuch", "die Wörterbücher", "Ich schlage das Wort im Wörterbuch nach."),
        ("N", "die Anwesenheit", "ohne Plural", "Die Anwesenheit wird jeden Tag kontrolliert."),
        ("N", "das Zertifikat", "die Zertifikate", "Nach der Prüfung bekommen Sie ein Zertifikat."),
        ("V", "teilnehmen (an + Dat.)", "nimmt teil · hat teilgenommen", "Ich nehme an einem Kochkurs teil."),
        ("V", "sich anmelden (für + Akk.)", "meldet sich an · hat sich angemeldet", "Ich habe mich für den Kurs angemeldet."),
        ("V", "sich treffen (mit + Dat.)", "trifft sich · hat sich getroffen", "Am Sonntag treffe ich mich mit Freunden."),
        ("V", "sich interessieren (für + Akk.)", "interessiert sich · hat sich interessiert", "Ich interessiere mich für Musik."),
        ("V", "wiederholen", "wiederholt · hat wiederholt", "Können Sie das bitte wiederholen?"),
        ("V", "bestehen", "besteht · hat bestanden", "Ich habe die Prüfung bestanden!"),
        ("A", "kostenlos", "Gegenteil: kostenpflichtig", "Der Eintritt ist kostenlos."),
    ], [
        (f"{N('Sport')} {V('treiben')}", "Ich treibe gern Sport."),
        (f"eine {N('Pause')} {V('machen')}", "Lass uns eine kurze Pause machen."),
        (f"eine {N('Prüfung')} {V('machen')}", "Am Ende des Kurses machen wir eine Prüfung."),
        (f"{N('Spaß')} {V('machen')}", "Der Kurs macht mir viel Spaß."),
        (f"{N('Zeit')} {V('haben')}", "Hast du am Wochenende Zeit?"),
    ]),
]

# 24 wichtige Wörter für die Karteikarten: (Thema-Index, Wort genau wie in der Liste)
KARTEN = [
    (0, "die Nebenkosten"), (0, "die Kaution"), (0, "umziehen"),
    (1, "der Lebenslauf"), (1, "sich bewerben (um + Akk.)"), (1, "befristet"),
    (2, "der Bescheid"), (2, "die Bescheinigung"), (2, "beantragen"),
    (3, "das Rezept"), (3, "die Überweisung"), (3, "wehtun"),
    (4, "der Elternabend"), (4, "der Ausflug"), (4, "abholen"),
    (5, "der Kassenbon"), (5, "das Konto"), (5, "umtauschen"),
    (6, "der Anschluss"), (6, "das Gleis"), (6, "umsteigen"),
    (7, "das Zertifikat"), (7, "die Lehrkraft"), (7, "sich treffen (mit + Dat.)"),
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
            R(f"{len(eintraege)} Wörter + 5 feste Wendungen · Hake ab, was du sicher kannst.", "small")]
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
    nvbox = box([R("Feste Wendungen", "h3"), nv], NOTE, GELB)
    return head + [t, Spacer(1, 6), KeepTogether(nvbox)]


s = [
    R("A2–B1 · Wortschatz · DTZ · Wortliste zum Lernen", "kick"),
    R(TITLE, "h1"),
    R("Acht Alltagsthemen aus dem Deutsch-Test für Zuwanderer – mit Artikel, Plural, Perfekt, Beispielsatz "
      "und festen Wendungen. Am Ende: 24 Karteikarten zum Ausschneiden.", "lead"),
    box(R(
        f"<b>So lernst du:</b> Nomen immer <b>mit Artikel und Plural</b> "
        f'(<font color="{ART["der"]}"><b>der</b></font> blau · <font color="{ART["die"]}"><b>die</b></font> rot · '
        f'<font color="{ART["das"]}"><b>das</b></font> grün). Verben mit <b>Perfekt</b> – Achtung bei '
        f"<b>ist</b> (umziehen, umsteigen, abfahren, ankommen). Decke die Beispielsätze ab, bilde eigene Sätze "
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


KURZ = ["Wohnen", "Arbeit", "Ämter", "Gesundheit", "Kinder und Schule", "Einkaufen und Geld",
        "Verkehr und Reisen", "Freizeit und Kurs"]
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
