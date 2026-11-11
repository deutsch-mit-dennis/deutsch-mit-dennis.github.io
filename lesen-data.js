/* Leseverstehen – eigene Übungstexte im Stil von DTZ (A2–B1) und DTB B2. Keine offiziellen Prüfungsaufgaben.
   Neue Texte unten an das passende Set anhängen. Format eines Eintrags:
   { id, type, title, situation, text (Absätze mit \n), questions: [R(Frage, [Antworten], Index der richtigen, Erklärung)] } */
(function () {
  const R = (q, options, answer, why) => ({ q, options, answer, why });
  (window.DM || (window.DM = {})).reading = [
    {
      id: 'alltag', level: 'A2–B1', exam: 'DTZ', title: 'Lesen im Alltag',
      intro: 'Mitteilungen, Anzeigen, E-Mails und Infotexte wie im Alltag und im DTZ. Lies zuerst die Fragen, dann den Text.',
      items: [
        {
          id: 'alltag-hausverwaltung', type: 'Mitteilung', title: 'Aushang im Treppenhaus',
          situation: 'Im Treppenhaus hängt eine Mitteilung der Hausverwaltung.',
          text: 'Liebe Mieterinnen und Mieter,\nam Donnerstag, dem 15. Oktober, werden die Fenster im Treppenhaus erneuert. Die Arbeiten beginnen um 8 Uhr und dauern bis etwa 16 Uhr. In dieser Zeit kann es laut sein.\nBitte stellen Sie an diesem Tag keine Fahrräder, Kinderwagen oder Schuhe in den Hausflur. Die Handwerker brauchen Platz für ihre Leitern.\nDer Aufzug funktioniert normal. Die Haustür bleibt von 8 bis 16 Uhr geöffnet.\nBei Fragen erreichen Sie uns montags bis freitags von 9 bis 13 Uhr unter 0234 55 61 20.\nIhre Hausverwaltung Kramer',
          questions: [
            R('Was passiert am 15. Oktober?', ['Der Aufzug wird repariert.', 'Die Fenster im Treppenhaus werden erneuert.', 'Die Haustür bekommt ein neues Schloss.'], 1, 'Im Text steht: „werden die Fenster im Treppenhaus erneuert“.'),
            R('Was sollen die Mieter an diesem Tag tun?', ['Nichts in den Hausflur stellen.', 'Den Aufzug nicht benutzen.', 'Die Haustür abschließen.'], 0, 'Fahrräder, Kinderwagen und Schuhe sollen nicht im Hausflur stehen.'),
            R('Wann kann man die Hausverwaltung anrufen?', ['Jeden Tag bis 16 Uhr.', 'Montags bis freitags von 9 bis 13 Uhr.', 'Nur am Donnerstag.'], 1, 'Telefonzeiten: montags bis freitags von 9 bis 13 Uhr.')
          ]
        },
        {
          id: 'alltag-kita', type: 'E-Mail', title: 'Nachricht von der Kita',
          situation: 'Sie bekommen eine E-Mail von der Kita Ihres Sohnes.',
          text: 'Liebe Eltern,\nam Freitag, dem 23. Oktober, machen wir unseren Herbstausflug in den Stadtpark. Wir treffen uns um 8:30 Uhr in der Kita und sind um 13 Uhr wieder zurück. Das Mittagessen fällt an diesem Tag aus.\nBitte geben Sie Ihrem Kind ein kleines Frühstück, etwas zu trinken und eine Regenjacke mit. Bei starkem Regen bleiben wir in der Kita.\nWir brauchen noch zwei Eltern, die uns begleiten. Wenn Sie Zeit haben, schreiben Sie bitte bis Mittwoch eine kurze Nachricht an Frau Becker.\nViele Grüße\nIhr Kita-Team „Sonnenblume“',
          questions: [
            R('Wohin gehen die Kinder am 23. Oktober?', ['In den Zoo.', 'In den Stadtpark.', 'Ins Schwimmbad.'], 1, 'Der Herbstausflug geht „in den Stadtpark“.'),
            R('Was sollen die Kinder mitbringen?', ['Mittagessen und Geld.', 'Frühstück, ein Getränk und eine Regenjacke.', 'Turnschuhe und Sportkleidung.'], 1, 'Das Mittagessen fällt aus; mitbringen: Frühstück, etwas zu trinken, Regenjacke.'),
            R('Was sollen Eltern tun, die beim Ausflug helfen möchten?', ['Bis Mittwoch Frau Becker schreiben.', 'Am Freitag um 8:30 Uhr anrufen.', 'Nichts – alle Plätze sind schon vergeben.'], 0, 'Die Kita sucht noch zwei Eltern: „bis Mittwoch eine kurze Nachricht an Frau Becker“.')
          ]
        },
        {
          id: 'alltag-buergerbuero', type: 'Infotext', title: 'Neue Öffnungszeiten im Bürgerbüro',
          situation: 'Auf der Internetseite Ihrer Stadt lesen Sie eine Information.',
          text: 'Ab dem 2. November hat das Bürgerbüro neue Öffnungszeiten: Montag, Dienstag und Freitag von 8 bis 12 Uhr, Donnerstag von 14 bis 18 Uhr. Mittwochs ist das Bürgerbüro geschlossen.\nFür einen neuen Personalausweis oder Reisepass brauchen Sie einen Termin. Termine buchen Sie online oder telefonisch. Eine Wohnung können Sie auch ohne Termin anmelden – bitte rechnen Sie dann mit Wartezeit.\nBringen Sie zur Anmeldung Ihren Ausweis und die Wohnungsgeberbestätigung von Ihrem Vermieter mit.',
          questions: [
            R('An welchem Tag ist das Bürgerbüro nachmittags geöffnet?', ['Am Montag.', 'Am Mittwoch.', 'Am Donnerstag.'], 2, 'Donnerstag von 14 bis 18 Uhr.'),
            R('Wofür braucht man einen Termin?', ['Für die Anmeldung einer Wohnung.', 'Für einen Personalausweis oder Reisepass.', 'Für alle Anliegen.'], 1, 'Für Ausweis und Reisepass braucht man einen Termin; die Wohnungsanmeldung geht auch ohne.'),
            R('Was muss man zur Anmeldung mitbringen?', ['Den Mietvertrag und ein Foto.', 'Den Ausweis und die Wohnungsgeberbestätigung.', 'Nur den Reisepass.'], 1, 'Im letzten Satz: Ausweis und Wohnungsgeberbestätigung vom Vermieter.')
          ]
        },
        {
          id: 'alltag-anzeigen', type: 'Anzeigen', title: 'Kleinanzeigen im Supermarkt',
          situation: 'Am Schwarzen Brett im Supermarkt hängen drei Anzeigen. Ihre Nachbarin Leyla sucht ein günstiges Kinderfahrrad.',
          text: 'A) Verkaufe Damenfahrrad, 28 Zoll, 3 Jahre alt, sehr guter Zustand, 120 €. Tel. 0176 22 31 40.\nB) Kinderfahrrad (für 5–7 Jahre), blau, mit Klingel und Licht, kleine Kratzer, nur 35 €. Abholung in der Gartenstraße 8. Anrufen ab 17 Uhr: 0157 81 92 03.\nC) Fahrradwerkstatt Meyer: Wir reparieren alle Fahrräder schnell und günstig. Kinderfahrräder: Inspektion für 15 €. Mo–Sa 9–18 Uhr.',
          questions: [
            R('Welche Anzeige passt zu Leyla?', ['Anzeige A', 'Anzeige B', 'Anzeige C'], 1, 'Anzeige B verkauft ein günstiges Kinderfahrrad für 35 €.'),
            R('Wann kann Leyla bei Anzeige B anrufen?', ['Ab 17 Uhr.', 'Von 9 bis 18 Uhr.', 'Nur am Samstag.'], 0, '„Anrufen ab 17 Uhr“.'),
            R('Was bietet Anzeige C an?', ['Gebrauchte Fahrräder.', 'Reparaturen und Inspektionen.', 'Fahrradkurse für Kinder.'], 1, 'Die Werkstatt repariert Fahrräder und macht Inspektionen.')
          ]
        },
        {
          id: 'alltag-repaircafe', type: 'Zeitungsartikel', title: 'Reparieren statt wegwerfen',
          situation: 'In der Stadtteilzeitung lesen Sie einen kurzen Artikel.',
          text: 'Neues Repair-Café in der Weststadt\nKaputter Toaster, Loch in der Jacke, Fahrrad ohne Licht? Seit September gibt es im Stadtteilzentrum Weststadt ein Repair-Café. Jeden ersten Samstag im Monat von 14 bis 17 Uhr helfen ehrenamtliche Helferinnen und Helfer beim Reparieren. Die Besucher bringen ihre kaputten Sachen mit und reparieren sie zusammen mit den Fachleuten.\n„Wir machen die Arbeit nicht einfach für die Leute. Sie sollen auch selbst etwas lernen“, sagt Organisatorin Petra Lindner. Zum ersten Treffen kamen 38 Besucher. Etwa zwei Drittel der Geräte konnten repariert werden.\nDie Reparatur ist kostenlos, nur Ersatzteile muss man selbst bezahlen. Über eine kleine Spende für Kaffee und Kuchen freut sich das Team. Eine Anmeldung ist nicht nötig. Große Geräte wie Waschmaschinen kann man leider nicht mitbringen.',
          questions: [
            R('Wann ist das Repair-Café geöffnet?', ['Jeden Samstag von 14 bis 17 Uhr.', 'Jeden ersten Samstag im Monat von 14 bis 17 Uhr.', 'Jeden ersten Sonntag im Monat.'], 1, 'Im Text steht: „Jeden ersten Samstag im Monat von 14 bis 17 Uhr“.'),
            R('Was ist Petra Lindner wichtig?', ['Die Besucher sollen selbst etwas lernen.', 'Die Helfer sollen alles schnell allein reparieren.', 'Die Besucher sollen Kuchen mitbringen.'], 0, 'Sie sagt: „Sie sollen auch selbst etwas lernen.“'),
            R('Was muss man bezahlen?', ['Die Reparatur.', 'Eine Anmeldegebühr.', 'Nur die Ersatzteile.'], 2, '„Die Reparatur ist kostenlos, nur Ersatzteile muss man selbst bezahlen.“ Eine Spende ist freiwillig.'),
            R('Was stimmt?', ['Man muss sich vorher anmelden.', 'Beim ersten Treffen konnten die meisten Geräte repariert werden.', 'Man kann auch eine Waschmaschine mitbringen.'], 1, '„Etwa zwei Drittel der Geräte konnten repariert werden.“ Eine Anmeldung ist nicht nötig, große Geräte sind nicht möglich.')
          ]
        },
        {
          id: 'alltag-bibliothek', type: 'Aushang', title: 'Die Stadtbibliothek macht Pause',
          situation: 'An der Tür der Stadtbibliothek hängt ein Aushang.',
          text: 'Liebe Leserinnen und Leser,\ndie Stadtbibliothek ist vom 2. bis 20. November wegen Umbauarbeiten geschlossen. Wir bekommen neue Regale und einen größeren Bereich für Kinder.\nAlle Bücher und Medien, die Sie in dieser Zeit zurückgeben müssten, können Sie bis zum 27. November ohne Gebühren behalten. Sie können Bücher aber auch in die Rückgabebox neben dem Haupteingang werfen. DVDs und Spiele legen Sie bitte nicht in die Box. Geben Sie diese nach dem Umbau an der Theke ab.\nWährend der Schließung können Sie mit Ihrem Bibliotheksausweis weiter E-Books und Hörbücher online ausleihen.\nAb dem 21. November sind wir wieder zu den gewohnten Zeiten für Sie da. Am Eröffnungstag gibt es um 15 Uhr ein Vorlesefest für Kinder.\nIhr Team der Stadtbibliothek',
          questions: [
            R('Warum ist die Bibliothek im November geschlossen?', ['Weil viele Mitarbeiter krank sind.', 'Weil die Bibliothek in ein neues Gebäude umzieht.', 'Wegen Umbauarbeiten.'], 2, 'Im Text steht: „wegen Umbauarbeiten geschlossen“ – es gibt neue Regale und einen größeren Kinderbereich.'),
            R('Was gilt für ausgeliehene Bücher?', ['Man kann sie bis zum 27. November ohne Gebühren behalten.', 'Man muss sie bis zum 2. November zurückgeben.', 'Man muss für die Zeit der Schließung Gebühren bezahlen.'], 0, '„… können Sie bis zum 27. November ohne Gebühren behalten.“'),
            R('Was darf man nicht in die Rückgabebox legen?', ['Bücher.', 'DVDs und Spiele.', 'Den Bibliotheksausweis.'], 1, '„DVDs und Spiele legen Sie bitte nicht in die Box.“ Bücher darf man einwerfen.'),
            R('Was passiert am 21. November?', ['Es gibt einen Flohmarkt mit alten Büchern.', 'Alle bekommen einen kostenlosen Bibliotheksausweis.', 'Es gibt ein Vorlesefest für Kinder.'], 2, '„Am Eröffnungstag gibt es um 15 Uhr ein Vorlesefest für Kinder.“ Eröffnungstag ist der 21. November.')
          ]
        },
        {
          id: 'alltag-schwimmkurs', type: 'Anzeigen', title: 'Ein Schwimmkurs für Zofia',
          situation: 'Ihr Nachbar Tomasz möchte, dass seine Tochter Zofia (8 Jahre) schwimmen lernt. Er arbeitet von Montag bis Freitag bis 18 Uhr. Am Schwarzen Brett im Sportverein hängen vier Anzeigen.',
          text: 'A) Schwimmen lernen ist nie zu spät! Kurs für Erwachsene ohne Vorkenntnisse, dienstags von 19 bis 20 Uhr im Hallenbad Süd. 10 Termine, 90 €. Anmeldung online: schwimmschule-delfin.de\nB) Seepferdchen-Kurs für Kinder von 5 bis 7 Jahren, montags und mittwochs um 16 Uhr im Hallenbad Nord. Eltern dürfen zuschauen. 75 €. Tel. 0561 70 44 18.\nC) Freie Plätze! Schwimmkurs für Kinder von 7 bis 10 Jahren, samstags von 10 bis 11 Uhr im Hallenbad Nord. 8 Termine, 64 €. Start: 7. November. Anmeldung bis zum 31. Oktober per E-Mail: kurse@tsv-nord.de\nD) Verkaufe Badeanzug für Mädchen (Größe 128) und Schwimmbrille, kaum benutzt, zusammen 10 €. Nur Abholung. Tel. 0152 33 67 90.',
          questions: [
            R('Welche Anzeige passt zu Tomasz?', ['Anzeige A', 'Anzeige B', 'Anzeige C'], 2, 'Anzeige C: ein Kurs für Kinder von 7 bis 10 Jahren am Samstag – Tomasz arbeitet nur unter der Woche.'),
            R('Warum passt Anzeige B nicht?', ['Der Kurs ist zu teuer.', 'Zofia ist zu alt, und der Kurs ist unter der Woche.', 'Eltern dürfen nicht zuschauen.'], 1, 'Der Kurs ist „für Kinder von 5 bis 7 Jahren“ und „montags und mittwochs um 16 Uhr“. Zofia ist 8, und Tomasz arbeitet dann.'),
            R('Bis wann muss Tomasz Zofia für Kurs C anmelden?', ['Bis zum 31. Oktober.', 'Bis zum 7. November.', 'Am ersten Kurstag.'], 0, '„Anmeldung bis zum 31. Oktober per E-Mail“. Der 7. November ist der Kursbeginn.'),
            R('Was bietet Anzeige D an?', ['Einen Schwimmkurs nur für Mädchen.', 'Gebrauchte Schwimmsachen.', 'Neue Schwimmbrillen im Geschäft.'], 1, 'Jemand verkauft einen Badeanzug und eine Schwimmbrille, „kaum benutzt“, zusammen für 10 €.')
          ]
        },
        {
          id: 'alltag-vhs-kurs', type: 'E-Mail', title: 'Ihr Deutschkurs zieht um',
          situation: 'Sie besuchen einen Deutschkurs an der Volkshochschule. Ihre Kursleiterin schickt eine E-Mail an alle Teilnehmenden.',
          text: 'Betreff: Kurs B1 am Abend – wichtige Änderungen\nLiebe Teilnehmerinnen und Teilnehmer,\nab Montag, dem 9. November, findet unser Kurs nicht mehr in der Goetheschule statt, sondern im neuen Gebäude der Volkshochschule in der Bahnhofstraße 12, Raum 204. Die Kurszeiten bleiben gleich: montags und donnerstags von 18 bis 21 Uhr.\nAm Donnerstag, dem 19. November, fällt der Unterricht aus, weil ich auf einer Fortbildung bin. Diesen Termin holen wir am Samstag, dem 21. November, von 10 bis 13 Uhr nach.\nBitte denken Sie auch an die Anmeldung zur DTZ-Prüfung im Dezember. Das Formular bekommen Sie im Sekretariat im Erdgeschoss. Geben Sie es bitte bis spätestens 13. November auch dort ab. Bringen Sie dazu Ihren Ausweis und eine Kopie Ihrer Teilnahmeberechtigung mit.\nViele Grüße\nSabine Krämer',
          questions: [
            R('Was ändert sich ab dem 9. November?', ['Die Kurszeiten.', 'Der Kursort.', 'Die Kursleiterin.'], 1, 'Der Kurs ist ab dann „im neuen Gebäude der Volkshochschule in der Bahnhofstraße 12“. Die Kurszeiten „bleiben gleich“.'),
            R('Warum fällt der Unterricht am 19. November aus?', ['Die Kursleiterin ist auf einer Fortbildung.', 'Der Raum ist an diesem Tag nicht frei.', 'An diesem Tag ist ein Feiertag.'], 0, '„… fällt der Unterricht aus, weil ich auf einer Fortbildung bin.“'),
            R('Wann ist der Ersatztermin?', ['Am Montag, dem 23. November, um 18 Uhr.', 'Am Donnerstag, dem 19. November, am Vormittag.', 'Am Samstag, dem 21. November, von 10 bis 13 Uhr.'], 2, '„Diesen Termin holen wir am Samstag, dem 21. November, von 10 bis 13 Uhr nach.“'),
            R('Was sollen die Teilnehmenden für die Prüfung tun?', ['Das Formular online ausfüllen und schicken.', 'Das Formular bis zum 13. November im Sekretariat abgeben.', 'Den Ausweis per E-Mail an Frau Krämer schicken.'], 1, 'Das Formular gibt es im Sekretariat; man soll es „bis spätestens 13. November auch dort“ abgeben.')
          ]
        },
        {
          id: 'alltag-hausarztpraxis', type: 'Infotext', title: 'Informationen aus der Hausarztpraxis',
          situation: 'Sie sind in der Hausarztpraxis. Im Wartezimmer hängt ein Informationsblatt für die Patientinnen und Patienten.',
          text: 'Praxis Dr. med. Leila Hoffmann – Allgemeinmedizin\nLiebe Patientinnen und Patienten,\nab sofort bieten wir wieder die Grippeimpfung an. Die Impfung ist besonders wichtig für Menschen über 60, für Schwangere und für Personen mit chronischen Krankheiten. Bitte vereinbaren Sie dafür einen Termin, online oder telefonisch unter 0421 38 72 50. Bringen Sie Ihre Versichertenkarte und Ihren Impfpass mit.\nVom 23. Dezember bis zum 3. Januar ist unsere Praxis wegen Urlaub geschlossen. In dieser Zeit vertritt uns die Praxis Dr. Aydın in der Lindenstraße 8.\nRezepte für Medikamente, die Sie regelmäßig nehmen, können Sie jetzt auch über unsere Website bestellen. Sie können das Rezept dann nach zwei Werktagen an der Anmeldung abholen.\nWie bisher ist die Praxis am Mittwochnachmittag geschlossen.\nIhr Praxisteam',
          questions: [
            R('Was muss man für die Grippeimpfung tun?', ['Ohne Termin am Vormittag in die Praxis kommen.', 'Einen Termin machen und Versichertenkarte und Impfpass mitbringen.', 'Zuerst ein Rezept über die Website bestellen.'], 1, '„Bitte vereinbaren Sie dafür einen Termin … Bringen Sie Ihre Versichertenkarte und Ihren Impfpass mit.“'),
            R('Sie sind am 28. Dezember krank. Wohin können Sie gehen?', ['In die Praxis Dr. Hoffmann.', 'In die Praxis Dr. Aydın in der Lindenstraße 8.', 'Nur ins Krankenhaus.'], 1, 'Vom 23. Dezember bis 3. Januar ist die Praxis geschlossen. „In dieser Zeit vertritt uns die Praxis Dr. Aydın in der Lindenstraße 8.“'),
            R('Wie bekommt man ein Rezept für ein Medikament, das man regelmäßig nimmt?', ['Man bestellt es auf der Website und holt es nach zwei Werktagen an der Anmeldung ab.', 'Die Praxis schickt das Rezept per Post nach Hause.', 'Man bekommt es nur am Mittwochnachmittag.'], 0, 'Rezepte kann man „über unsere Website bestellen“ und „nach zwei Werktagen an der Anmeldung abholen“. Am Mittwochnachmittag ist die Praxis geschlossen.')
          ]
        },
        {
          id: 'alltag-rufbus', type: 'Zeitungsartikel', title: 'Ein Bus, den man bestellen kann',
          situation: 'In der Lokalzeitung lesen Sie einen kurzen Artikel über ein neues Angebot.',
          text: 'Neuer Rufbus für die Dörfer rund um Lindenfeld\nAb dem 1. Dezember fährt in den Ortsteilen von Lindenfeld ein Rufbus. Der kleine Bus hat acht Plätze und fährt keinen festen Fahrplan. Fahrgäste bestellen ihn per App oder telefonisch, mindestens eine Stunde vor der Fahrt. Der Bus holt sie dann an einer Haltestelle in ihrer Nähe ab.\n„Viele ältere Menschen haben kein Auto. Bis jetzt fuhr der Bus am Wochenende nur zweimal am Tag“, sagt Bürgermeister Jens Kowalski. Der Rufbus fährt montags bis freitags von 6 bis 22 Uhr, samstags und sonntags von 8 bis 20 Uhr.\nEine Fahrt kostet so viel wie ein normales Busticket. Wer ein Deutschlandticket hat, fährt ohne Aufpreis mit. Kinderwagen und Rollstühle sind kein Problem, das sollte man aber bei der Bestellung sagen. Das Angebot ist zuerst für zwei Jahre geplant.',
          questions: [
            R('Wie bekommt man einen Platz im Rufbus?', ['Man wartet einfach an der Haltestelle.', 'Man bestellt den Bus mindestens eine Stunde vorher per App oder Telefon.', 'Man kauft am Tag vorher ein Ticket im Rathaus.'], 1, 'Im Text steht: „Fahrgäste bestellen ihn per App oder telefonisch, mindestens eine Stunde vor der Fahrt.“'),
            R('Warum gibt es den Rufbus?', ['Weil viele ältere Menschen kein Auto haben und es bisher wenige Busse gab.', 'Weil der normale Bus zu teuer war.', 'Weil die Schulen einen neuen Bus brauchen.'], 0, 'Der Bürgermeister sagt: „Viele ältere Menschen haben kein Auto. Bis jetzt fuhr der Bus am Wochenende nur zweimal am Tag.“'),
            R('Was kostet eine Fahrt mit dem Deutschlandticket?', ['Die Hälfte des normalen Preises.', 'Einen kleinen Aufpreis.', 'Nichts extra.'], 2, '„Wer ein Deutschlandticket hat, fährt ohne Aufpreis mit.“'),
            R('Was stimmt?', ['Der Rufbus fährt am Wochenende nicht.', 'Mit Kinderwagen muss man das bei der Bestellung sagen.', 'Das Angebot gibt es nur für ein Jahr.'], 1, '„Kinderwagen und Rollstühle sind kein Problem, das sollte man aber bei der Bestellung sagen.“ Der Bus fährt auch am Wochenende; geplant sind zwei Jahre.')
          ]
        },
        {
          id: 'alltag-waschkeller', type: 'Aushang', title: 'Neue Waschmaschinen im Waschkeller',
          situation: 'An der Tür zum Waschkeller in Ihrem Haus hängt ein Aushang der Wohnungsgenossenschaft.',
          text: 'Wohnungsgenossenschaft Am Stadtpark eG – Haus Birkenallee 12\nLiebe Bewohnerinnen und Bewohner,\nab Montag, dem 30. November, stehen im Waschkeller zwei neue Waschmaschinen und ein neuer Trockner. Dann brauchen Sie keine Münzen mehr. Sie bezahlen mit einer Waschkarte. Die Karte bekommen Sie kostenlos in unserem Büro in der Birkenallee 3. Bitte bringen Sie Ihren Ausweis oder Ihren Mietvertrag mit.\nGeld laden Sie am Automaten neben der Kellertür auf die Karte. Eine Wäsche kostet 2,50 Euro, das Trocknen 1,50 Euro.\nBitte tragen Sie Ihre Waschzeit wie bisher in die Liste an der Tür ein. Sie können die Maschinen montags bis samstags von 7 bis 21 Uhr benutzen, sonntags nicht.\nAm Freitag, dem 27. November, bauen wir die neuen Geräte ein. An diesem Tag ist der Waschkeller geschlossen.\nIhr Team der Genossenschaft',
          questions: [
            R('Was ist ab dem 30. November neu?', ['Man bezahlt mit einer Waschkarte statt mit Münzen.', 'Man muss keine Waschzeit mehr eintragen.', 'Der Waschkeller ist auch sonntags geöffnet.'], 0, '„Dann brauchen Sie keine Münzen mehr. Sie bezahlen mit einer Waschkarte.“ Die Liste gibt es weiter, sonntags bleibt der Keller zu.'),
            R('Wo bekommt man die Waschkarte?', ['Am Automaten neben der Kellertür.', 'Im Büro der Genossenschaft in der Birkenallee 3.', 'Beim Hausmeister im Keller.'], 1, '„Die Karte bekommen Sie kostenlos in unserem Büro in der Birkenallee 3.“ Am Automaten lädt man nur Geld auf die Karte.'),
            R('Familie Okafor möchte am Freitag, dem 27. November, waschen. Was stimmt?', ['Sie muss sich vorher in die Liste eintragen.', 'Sie braucht dafür schon die neue Karte.', 'Das geht nicht, weil der Waschkeller an diesem Tag geschlossen ist.'], 2, '„Am Freitag, dem 27. November, bauen wir die neuen Geräte ein. An diesem Tag ist der Waschkeller geschlossen.“'),
            R('Wie viel kostet es, Wäsche zu waschen und danach zu trocknen?', ['2,50 Euro.', '4,00 Euro.', '1,50 Euro.'], 1, 'Waschen kostet 2,50 Euro, Trocknen 1,50 Euro – zusammen 4,00 Euro.')
          ]
        }
      ]
    },
    {
      id: 'beruf', level: 'B1–B2', exam: 'DTB B2', title: 'Lesen im Beruf',
      intro: 'Interne Regelungen, Kunden-E-Mails und Artikel aus dem Arbeitsleben wie im Berufssprachkurs und im DTB B2.',
      items: [
        {
          id: 'beruf-homeoffice', type: 'Interne Regelung', title: 'Neue Regelung zum mobilen Arbeiten',
          situation: 'Im Intranet Ihrer Firma lesen Sie eine neue Regelung.',
          text: 'Ab dem 1. Januar gilt für alle Beschäftigten in der Verwaltung eine neue Regelung zum mobilen Arbeiten. Wer mindestens sechs Monate im Unternehmen ist, kann bis zu zwei Tage pro Woche von zu Hause aus arbeiten. Voraussetzung ist eine schriftliche Vereinbarung mit der direkten Führungskraft.\nDie Kernarbeitszeit von 9 bis 15 Uhr gilt auch im Homeoffice; in dieser Zeit müssen Sie telefonisch und per Chat erreichbar sein. Dienstliche Unterlagen dürfen nur auf firmeneigenen Geräten bearbeitet werden.\nAusgenommen sind Beschäftigte im Kundenservice am Empfang sowie Auszubildende im ersten Ausbildungsjahr. Anträge stellen Sie bis zum 15. Dezember über das Personalportal.',
          questions: [
            R('Wer darf mobil arbeiten?', ['Alle Beschäftigten ab dem ersten Arbeitstag.', 'Beschäftigte in der Verwaltung nach mindestens sechs Monaten.', 'Nur Führungskräfte.'], 1, 'Voraussetzung: Verwaltung und mindestens sechs Monate im Unternehmen.'),
            R('Was gilt während der Kernarbeitszeit im Homeoffice?', ['Man muss erreichbar sein.', 'Man darf private Geräte nutzen.', 'Man muss ins Büro kommen.'], 0, 'Von 9 bis 15 Uhr muss man telefonisch und per Chat erreichbar sein.'),
            R('Wer ist von der Regelung ausgenommen?', ['Beschäftigte mit Kindern.', 'Auszubildende im ersten Jahr und der Empfang.', 'Alle Teilzeitkräfte.'], 1, 'Ausgenommen: Kundenservice am Empfang und Auszubildende im ersten Ausbildungsjahr.')
          ]
        },
        {
          id: 'beruf-reklamation', type: 'Kunden-E-Mail', title: 'Eine Reklamation',
          situation: 'Sie arbeiten im Kundenservice eines Online-Shops für Büromöbel und lesen diese E-Mail.',
          text: 'Sehr geehrte Damen und Herren,\nam 3. September habe ich bei Ihnen zwei höhenverstellbare Schreibtische bestellt (Bestellnummer 48 221). Geliefert wurde am 18. September – also eine Woche später als zugesagt. Beim Aufbau haben wir festgestellt, dass bei einem Tisch der Motor nicht funktioniert. Der zweite Tisch ist in Ordnung.\nWir brauchen den Tisch dringend, weil eine neue Kollegin am 1. Oktober bei uns anfängt. Ich bitte Sie daher, uns bis Ende September einen Ersatzmotor zu schicken oder einen Techniker vorbeizuschicken. Eine Rücksendung des ganzen Tisches kommt für uns nicht in Frage.\nFür Rückfragen erreichen Sie mich vormittags unter der unten stehenden Nummer.\nMit freundlichen Grüßen\nSabine Wolter, Büroleitung',
          questions: [
            R('Was ist das Hauptproblem?', ['Beide Tische fehlen.', 'Bei einem Tisch funktioniert der Motor nicht.', 'Die Rechnung ist falsch.'], 1, '„bei einem Tisch der Motor nicht funktioniert“.'),
            R('Was möchte Frau Wolter?', ['Ihr Geld zurück.', 'Den ganzen Tisch zurückschicken.', 'Einen Ersatzmotor oder einen Techniker bis Ende September.'], 2, 'Eine Rücksendung möchte sie ausdrücklich nicht.'),
            R('Warum ist die Sache dringend?', ['Eine neue Kollegin beginnt am 1. Oktober.', 'Das Büro zieht um.', 'Die Garantie endet.'], 0, 'Der Tisch wird für die neue Kollegin ab 1. Oktober gebraucht.')
          ]
        },
        {
          id: 'beruf-weiterbildung', type: 'Artikel', title: 'Weiterbildung im Betrieb',
          situation: 'In der Mitarbeiterzeitung lesen Sie einen Artikel.',
          text: 'Immer mehr Betriebe bieten ihren Beschäftigten Sprachkurse während der Arbeitszeit an. In unserem Werk haben im letzten Jahr 42 Kolleginnen und Kollegen an einem berufsbezogenen Deutschkurs teilgenommen. Der Kurs fand zweimal pro Woche direkt nach der Frühschicht statt; die Hälfte der Zeit galt als Arbeitszeit.\n„Am Anfang war es anstrengend, nach der Schicht noch zu lernen“, erzählt Maschinenführer Andrij K. „Aber jetzt verstehe ich Sicherheitsanweisungen viel besser und traue mich, in Besprechungen etwas zu sagen.“\nAuch die Teamleitungen sind zufrieden: Missverständnisse bei der Übergabe zwischen den Schichten sind deutlich seltener geworden. Im nächsten Jahr soll es zusätzlich einen Kurs für Schreiben im Beruf geben.',
          questions: [
            R('Wann fand der Deutschkurs statt?', ['Am Wochenende.', 'Zweimal pro Woche nach der Frühschicht.', 'Jeden Tag vor der Arbeit.'], 1, '„zweimal pro Woche direkt nach der Frühschicht“.'),
            R('Was hat sich für Andrij verbessert?', ['Er verdient mehr Geld.', 'Er versteht Sicherheitsanweisungen besser und spricht in Besprechungen.', 'Er arbeitet jetzt nur noch in der Frühschicht.'], 1, 'Er versteht Sicherheitsanweisungen besser und traut sich, etwas zu sagen.'),
            R('Was ist für das nächste Jahr geplant?', ['Ein Kurs für Schreiben im Beruf.', 'Ein Englischkurs.', 'Kein weiterer Kurs.'], 0, 'Geplant ist „zusätzlich ein Kurs für Schreiben im Beruf“.')
          ]
        },
        {
          id: 'beruf-protokoll', type: 'Protokoll', title: 'Protokoll der Teambesprechung',
          situation: 'Sie arbeiten im Versandlager eines Online-Händlers. Sie waren bei der Besprechung nicht dabei und lesen das Protokoll.',
          text: 'Protokoll der Teambesprechung Lager und Versand\nDatum: 12. Oktober, 7:30–8:15 Uhr · Teilnehmende: Herr Demir (Teamleitung), Frau Nowak, Herr Ilić, Frau Schulte, Herr Baumann · Protokoll: Frau Schulte\nTOP 1 – Weihnachtsgeschäft: Ab dem 16. November rechnen wir mit etwa 40 Prozent mehr Bestellungen. Herr Demir hat deshalb zwei Aushilfen über eine Zeitarbeitsfirma angefordert. Sie beginnen bereits am 9. November, damit sie rechtzeitig eingearbeitet werden können. Die Einarbeitung übernimmt Frau Nowak.\nTOP 2 – Urlaubsplanung: Vom 16. November bis 23. Dezember gilt im Versand eine Urlaubssperre. Ausnahmen sind nur in dringenden Fällen und nach Absprache mit der Teamleitung möglich. Bereits genehmigter Urlaub bleibt bestehen.\nTOP 3 – Neue Handscanner: Die neuen Geräte werden in der Woche ab dem 26. Oktober geliefert. Herr Ilić hat sich bereit erklärt, sie vorab zu testen. Eine Schulung für alle findet am 2. November jeweils zu Beginn der Früh- und der Spätschicht statt (Dauer: 30 Minuten).\nTOP 4 – Verschiedenes: Herr Baumann weist darauf hin, dass das Rolltor an Rampe 3 häufig klemmt. Herr Demir meldet den Schaden noch heute beim Haustechniker.\nNächste Besprechung: 9. November, 7:30 Uhr',
          questions: [
            R('Warum werden Aushilfen eingesetzt?', ['Weil zwei Kollegen im November Urlaub haben.', 'Weil die neuen Handscanner getestet werden müssen.', 'Weil ab Mitte November deutlich mehr Bestellungen erwartet werden.'], 2, 'TOP 1: „Ab dem 16. November rechnen wir mit etwa 40 Prozent mehr Bestellungen.“'),
            R('Was gilt für den Urlaub im Versand?', ['Bereits genehmigter Urlaub bleibt, neuer Urlaub ist nur in dringenden Fällen möglich.', 'Auch genehmigter Urlaub wird gestrichen.', 'Urlaub muss bis zum 16. November beantragt werden.'], 0, 'TOP 2: Urlaubssperre mit Ausnahmen nur in dringenden Fällen; „Bereits genehmigter Urlaub bleibt bestehen.“'),
            R('Welche Aufgabe übernimmt Herr Ilić?', ['Er arbeitet die Aushilfen ein.', 'Er testet die neuen Handscanner.', 'Er meldet den Schaden an Rampe 3.'], 1, 'TOP 3: „Herr Ilić hat sich bereit erklärt, sie vorab zu testen.“ Die Einarbeitung macht Frau Nowak.'),
            R('Was passiert mit dem Rolltor an Rampe 3?', ['Herr Baumann repariert es selbst.', 'Es wird in der nächsten Besprechung besprochen.', 'Die Teamleitung meldet den Schaden beim Haustechniker.'], 2, 'TOP 4: „Herr Demir meldet den Schaden noch heute beim Haustechniker.“')
          ]
        },
        {
          id: 'beruf-disposition', type: 'Stellenanzeige', title: 'Disponentin / Disponent gesucht',
          situation: 'Sie suchen eine neue Stelle in der Logistik und lesen diese Anzeige in einem Jobportal.',
          text: 'Hartmann Logistik GmbH – seit über 40 Jahren Ihr Partner für Transporte in ganz Europa\nFür unseren Standort in Kassel suchen wir ab dem 1. Januar eine Disponentin / einen Disponenten (m/w/d) im Nahverkehr – in Vollzeit oder Teilzeit (mindestens 30 Stunden pro Woche).\nIhre Aufgaben: Sie planen die täglichen Touren unserer 25 Lkw im Umkreis von 150 Kilometern. Sie sind Ansprechperson für unsere Fahrerinnen und Fahrer sowie für unsere Kunden und reagieren schnell auf Verspätungen, Staus und kurzfristige Änderungen.\nIhr Profil: Sie haben eine abgeschlossene Ausbildung als Kauffrau/Kaufmann für Spedition und Logistikdienstleistung oder vergleichbare Berufserfahrung. Sie sprechen und schreiben sicher Deutsch (mindestens B2); Englisch- oder Polnischkenntnisse sind von Vorteil. Auch unter Zeitdruck behalten Sie den Überblick.\nWir bieten: einen unbefristeten Arbeitsvertrag mit Bezahlung nach Tarif, 30 Tage Urlaub und Gleitzeit zwischen 6 und 18 Uhr. Samstags arbeiten Sie nur einmal im Monat, dafür bekommen Sie einen freien Tag in der Woche. Außerdem gibt es einen Zuschuss zum Deutschlandticket, kostenlose Parkplätze und eine dreimonatige Einarbeitung mit einer festen Patin oder einem festen Paten.\nInteresse? Dann senden Sie Ihre Bewerbung mit Lebenslauf und Zeugnissen bis zum 15. November über unser Online-Portal. Bitte nennen Sie Ihren frühestmöglichen Eintrittstermin. Fragen beantwortet Ihnen gern Frau Jana Roth aus der Personalabteilung unter 0561 47 39 20.',
          questions: [
            R('Welche Aufgabe gehört zu der Stelle?', ['Man fährt selbst Lkw im Nahverkehr.', 'Man plant die Touren und reagiert auf kurzfristige Änderungen.', 'Man stellt neue Fahrerinnen und Fahrer ein.'], 1, 'Unter „Ihre Aufgaben“: Touren planen und „schnell auf Verspätungen, Staus und kurzfristige Änderungen“ reagieren.'),
            R('Wer kann sich bewerben?', ['Personen mit passender Ausbildung oder vergleichbarer Berufserfahrung.', 'Nur Personen mit einer Ausbildung im Speditionsbereich.', 'Nur Personen, die Polnisch sprechen.'], 0, '„… Ausbildung als Kauffrau/Kaufmann für Spedition … oder vergleichbare Berufserfahrung“. Polnisch ist nur „von Vorteil“.'),
            R('Was stimmt zur Arbeitszeit?', ['Man arbeitet jeden Samstag.', 'Die Stelle gibt es nur in Vollzeit.', 'Man kann zwischen 6 und 18 Uhr flexibel arbeiten.'], 2, '„Gleitzeit zwischen 6 und 18 Uhr“. Samstags nur einmal im Monat; Teilzeit ab 30 Stunden ist möglich.'),
            R('Was sollen die Bewerberinnen und Bewerber in der Bewerbung angeben?', ['Ihre Gehaltsvorstellung.', 'Ihren frühestmöglichen Eintrittstermin.', 'Ihre Wunschtouren.'], 1, '„Bitte nennen Sie Ihren frühestmöglichen Eintrittstermin.“ Das Gehalt ist nach Tarif geregelt.')
          ]
        },
        {
          id: 'beruf-anerkennung', type: 'Forumsbeitrag', title: 'Anerkennung des Berufsabschlusses – lohnt sich das?',
          situation: 'In einem Internetforum für Fachkräfte lesen Sie eine Frage und eine Antwort zum Thema Anerkennung.',
          text: 'Beitrag von Elif_K., 14. Oktober\nHallo zusammen, ich bin gelernte Elektronikerin aus der Türkei und arbeite seit einem Jahr als Helferin in einem Elektrobetrieb in Bielefeld. Mein Chef ist zufrieden mit mir, aber ich verdiene deutlich weniger als meine Kollegen mit deutschem Abschluss. Hat jemand Erfahrung mit dem Anerkennungsverfahren? Wie lange dauert es, und was kostet es?\nAntwort von Marko_B., 15. Oktober\nHallo Elif, ich habe das letztes Jahr gemacht (Elektriker aus Serbien). Zuständig war bei mir die Handwerkskammer. Zuerst habe ich mich bei einer kostenlosen Beratungsstelle informiert – das kann ich nur empfehlen, denn dort hat man mir genau gesagt, welche Unterlagen ich brauche. Das Übersetzen der Zeugnisse hat fast zwei Monate gedauert, das Verfahren selbst dann noch etwa drei Monate. Die Gebühr lag bei 400 Euro, die Übersetzungen kamen extra dazu. Mein Arbeitgeber hat mir die Hälfte der Kosten erstattet, weil er mich danach als Fachkraft einsetzen wollte. Frag deinen Chef also ruhig!\nÜbrigens wurde mein Abschluss zuerst nur teilweise anerkannt. Ich musste noch einen Lehrgang zu den deutschen Sicherheitsvorschriften besuchen. Seit Juni habe ich die volle Anerkennung und verdiene rund 600 Euro mehr im Monat. Für mich hat sich der Aufwand also klar gelohnt.',
          questions: [
            R('Warum schreibt Elif ins Forum?', ['Sie sucht eine neue Stelle als Elektronikerin.', 'Sie möchte wissen, wie das Anerkennungsverfahren abläuft.', 'Sie hat Streit mit ihrem Chef.'], 1, 'Sie fragt: „Hat jemand Erfahrung mit dem Anerkennungsverfahren? Wie lange dauert es, und was kostet es?“ Ihr Chef ist zufrieden mit ihr.'),
            R('Was empfiehlt Marko als ersten Schritt?', ['Sich bei einer kostenlosen Beratungsstelle informieren.', 'Sofort einen Antrag bei der Handwerkskammer stellen.', 'Die Zeugnisse selbst übersetzen.'], 0, '„Zuerst habe ich mich bei einer kostenlosen Beratungsstelle informiert – das kann ich nur empfehlen“.'),
            R('Wie hat Markos Arbeitgeber geholfen?', ['Er hat die Zeugnisse übersetzen lassen.', 'Er hat alle Kosten übernommen.', 'Er hat die Hälfte der Kosten bezahlt.'], 2, '„Mein Arbeitgeber hat mir die Hälfte der Kosten erstattet“ – also nicht alle Kosten.'),
            R('Was stimmt?', ['Markos Abschluss wurde sofort vollständig anerkannt.', 'Marko musste einen zusätzlichen Lehrgang besuchen, bevor er die volle Anerkennung bekam.', 'Marko verdient heute genauso viel wie vorher.'], 1, 'Der Abschluss wurde „zuerst nur teilweise anerkannt“; Marko musste einen Lehrgang zu Sicherheitsvorschriften besuchen. Heute verdient er rund 600 Euro mehr.')
          ]
        },
        {
          id: 'beruf-urlaubsplanung', type: 'Interne Regelung', title: 'Neue Regeln für die Urlaubsplanung',
          situation: 'Sie arbeiten in einem Großhandelsunternehmen. Im Intranet lesen Sie ein Rundschreiben der Geschäftsführung.',
          text: 'Urlaubsplanung 2027 – neues Verfahren\nLiebe Kolleginnen und Kollegen,\ndamit alle Teams auch im nächsten Jahr ausreichend besetzt sind, gilt ab sofort ein neues Verfahren für die Urlaubsplanung.\nBitte tragen Sie Ihre Urlaubswünsche für 2027 bis zum 30. November in den digitalen Urlaubskalender im Mitarbeiterportal ein. Papieranträge werden nicht mehr angenommen. Ihre Teamleitung prüft die Wünsche und gibt Ihnen bis zum 15. Dezember eine Rückmeldung.\nIn jedem Team darf höchstens ein Drittel der Beschäftigten gleichzeitig im Urlaub sein. Überschneiden sich Wünsche in den Sommerferien, haben Beschäftigte mit schulpflichtigen Kindern Vorrang. Können sich Kolleginnen und Kollegen nicht einigen, entscheidet die Teamleitung; dabei berücksichtigt sie, wer im Vorjahr verzichten musste.\nVom 1. bis zum 10. Januar findet die jährliche Inventur statt. In dieser Zeit ist im Lager und in der Buchhaltung grundsätzlich kein Urlaub möglich.\nResturlaub aus 2026 muss bis zum 31. März 2027 genommen werden, sonst verfällt er. Ausnahmen gelten nur bei längerer Krankheit oder Elternzeit.\nEinzelne Urlaubstage, zum Beispiel für einen Behördentermin, beantragen Sie wie bisher mindestens drei Arbeitstage vorher.\nBei Fragen wenden Sie sich bitte an Herrn Özdemir aus der Personalabteilung (Durchwahl 214).\nMit freundlichen Grüßen\nKatrin Albers, Geschäftsführung',
          questions: [
            R('Wie sollen die Beschäftigten ihre Urlaubswünsche einreichen?', ['Mit einem Papierantrag bei der Teamleitung.', 'Im digitalen Urlaubskalender bis zum 30. November.', 'Per E-Mail an die Personalabteilung bis zum 15. Dezember.'], 1, '„Bitte tragen Sie Ihre Urlaubswünsche … bis zum 30. November in den digitalen Urlaubskalender … ein. Papieranträge werden nicht mehr angenommen.“ Der 15. Dezember ist die Frist für die Rückmeldung.'),
            R('Was passiert, wenn sich Kolleginnen und Kollegen nicht einigen können?', ['Wer sich zuerst eingetragen hat, bekommt den Urlaub.', 'Die Geschäftsführung entscheidet.', 'Die Teamleitung entscheidet und achtet darauf, wer im Vorjahr verzichtet hat.'], 2, '„… entscheidet die Teamleitung; dabei berücksichtigt sie, wer im Vorjahr verzichten musste.“'),
            R('Wer kann vom 1. bis 10. Januar normalerweise keinen Urlaub nehmen?', ['Beschäftigte im Lager und in der Buchhaltung.', 'Alle Beschäftigten des Unternehmens.', 'Nur die Teamleitungen.'], 0, '„In dieser Zeit ist im Lager und in der Buchhaltung grundsätzlich kein Urlaub möglich.“'),
            R('Was gilt für Resturlaub aus 2026?', ['Er wird automatisch ins nächste Jahr übertragen.', 'Er muss bis Ende März 2027 genommen werden – außer zum Beispiel bei längerer Krankheit.', 'Er wird am Jahresende ausgezahlt.'], 1, '„Resturlaub aus 2026 muss bis zum 31. März 2027 genommen werden, sonst verfällt er. Ausnahmen gelten nur bei längerer Krankheit oder Elternzeit.“')
          ]
        },
        {
          id: 'beruf-auftragsaenderung', type: 'Kunden-E-Mail', title: 'Auftrag mit Änderungen',
          situation: 'Sie arbeiten im Büro eines Malerbetriebs. Ihr Chef, Herr Lindner, bittet Sie, die E-Mail einer Kundin zu lesen und die wichtigsten Punkte zu notieren.',
          text: 'Betreff: Auftrag Nr. 2026-418 – Renovierung Treppenhaus Kastanienweg 5\nSehr geehrter Herr Lindner,\nvielen Dank für Ihr Angebot vom 12. Oktober. Die Eigentümergemeinschaft hat in ihrer Versammlung beschlossen, den Auftrag an Ihren Betrieb zu vergeben.\nLeider müssen wir den geplanten Beginn verschieben. Im Keller wurde letzte Woche ein Wasserschaden entdeckt, und die Trocknung dauert nach Auskunft der Fachfirma etwa drei Wochen. Statt am 9. November könnten Ihre Mitarbeiter daher frühestens am 30. November anfangen. Bitte teilen Sie mir mit, ob dieser Termin bei Ihnen möglich ist.\nAußerdem möchten wir den Auftrag erweitern: Zusätzlich zum Treppenhaus sollen auch die Kellerflure gestrichen werden, allerdings erst nach der Trocknung. Könnten Sie uns dafür ein ergänzendes Angebot schicken? In Ihrem ersten Angebot hatten Sie bei einem größeren Auftragsvolumen einen Nachlass von fünf Prozent erwähnt. Wir gehen davon aus, dass dieser Nachlass dann für den gesamten Auftrag gilt.\nZum Ablauf: Die Bewohnerinnen und Bewohner informieren wir zwei Wochen vor Beginn per Aushang. Den Schlüssel für den Keller erhalten Sie beim Hausmeister, Herrn Brandt, der montags bis donnerstags von 8 bis 12 Uhr im Haus ist.\nFür Rückfragen erreichen Sie mich unter 0231 55 90 37.\nMit freundlichen Grüßen\nMiriam Scholz\nHausverwaltung Scholz & Partner',
          questions: [
            R('Warum schreibt Frau Scholz?', ['Sie lehnt das Angebot ab, weil es zu teuer ist.', 'Sie erteilt den Auftrag, bittet aber um einen späteren Beginn und ein zusätzliches Angebot.', 'Sie beschwert sich über Schäden nach den Malerarbeiten.'], 1, 'Die Eigentümergemeinschaft hat beschlossen, „den Auftrag an Ihren Betrieb zu vergeben“. Gleichzeitig möchte sie „den geplanten Beginn verschieben“ und bittet um ein „ergänzendes Angebot“.'),
            R('Warum können die Arbeiten nicht am 9. November beginnen?', ['Die Eigentümer haben noch nicht entschieden.', 'Der Keller muss nach einem Wasserschaden zuerst trocknen.', 'Der Hausmeister ist im November nicht im Haus.'], 1, '„Im Keller wurde letzte Woche ein Wasserschaden entdeckt, und die Trocknung dauert … etwa drei Wochen.“'),
            R('Was erwartet Frau Scholz beim Preis?', ['Dass der Nachlass von fünf Prozent für den gesamten, erweiterten Auftrag gilt.', 'Dass die Kellerflure kostenlos gestrichen werden.', 'Dass der Betrieb den Preis für das Treppenhaus neu berechnet und senkt.'], 0, '„Wir gehen davon aus, dass dieser Nachlass dann für den gesamten Auftrag gilt.“ Für die Kellerflure möchte sie ein ergänzendes Angebot – also nicht kostenlos.'),
            R('Wie kommen die Maler in den Keller?', ['Frau Scholz schickt den Schlüssel per Post.', 'Die Bewohnerinnen und Bewohner öffnen den Keller.', 'Sie holen den Schlüssel beim Hausmeister, montags bis donnerstags vormittags.'], 2, '„Den Schlüssel für den Keller erhalten Sie beim Hausmeister, Herrn Brandt, der montags bis donnerstags von 8 bis 12 Uhr im Haus ist.“')
          ]
        },
        {
          id: 'beruf-gespraechsnotiz', type: 'Gesprächsnotiz', title: 'Telefonnotiz: Lieferung verspätet',
          situation: 'Sie arbeiten in der Großküche eines Krankenhauses. Ihre Kollegin hat ein Telefonat mit einem Lieferanten notiert. Sie übernehmen heute die Bestellungen und lesen die Notiz.',
          text: 'Gesprächsnotiz – Küche St.-Anna-Klinik\nDatum: Dienstag, 3. November, 10:20 Uhr · Gesprächspartner: Herr Petrović, Frische Felder GmbH (Gemüse und Obst) · Notiert von: Sabine Krüger\nAnlass: Herr Petrović hat angerufen, weil die Lieferung für Mittwoch nicht vollständig kommen kann. Wegen eines Ernteausfalls fehlen etwa 40 Kilogramm Brokkoli. Der Rest der Bestellung (Kartoffeln, Möhren, Äpfel) kommt wie geplant am Mittwoch um 6 Uhr.\nVereinbarung: Statt Brokkoli liefert Frische Felder am Mittwoch 40 Kilogramm Blumenkohl zum gleichen Kilopreis. Herr Petrović bietet außerdem an, die Lieferkosten für diese Woche nicht zu berechnen. Ich habe zugestimmt, weil der Speiseplan für Donnerstag ohnehin noch angepasst werden kann. Der Brokkoli kann laut Herrn Petrović frühestens ab dem 12. November wieder geliefert werden.\nOffene Punkte: Frau Haas (Diätküche) muss noch prüfen, ob Blumenkohl auch für die Schonkost geeignet ist. Bitte bis heute 14 Uhr mit ihr klären und Herrn Petrović Bescheid geben, falls wir für die Schonkost doch eine andere Gemüsesorte brauchen. Seine Durchwahl: 0951 30 88 412.\nDie schriftliche Bestätigung der Änderung kommt per E-Mail. Bitte ablegen und die Rechnung später damit vergleichen.',
          questions: [
            R('Warum hat Herr Petrović angerufen?', ['Die ganze Lieferung für Mittwoch fällt aus.', 'Ein Teil der Bestellung kann wegen eines Ernteausfalls nicht geliefert werden.', 'Die Lieferung kommt erst am Donnerstag.'], 1, '„… weil die Lieferung für Mittwoch nicht vollständig kommen kann. Wegen eines Ernteausfalls fehlen etwa 40 Kilogramm Brokkoli.“ Der Rest kommt wie geplant.'),
            R('Was wurde vereinbart?', ['Frische Felder liefert Blumenkohl zum gleichen Preis und berechnet diese Woche keine Lieferkosten.', 'Der Brokkoli wird am 12. November ohne Lieferkosten nachgeliefert.', 'Die Klinik bestellt den Brokkoli bei einem anderen Lieferanten.'], 0, '„Statt Brokkoli liefert Frische Felder … Blumenkohl zum gleichen Kilopreis“ und bietet an, „die Lieferkosten für diese Woche nicht zu berechnen“. Der 12. November ist nur der früheste Termin für Brokkoli.'),
            R('Was müssen Sie heute noch tun?', ['Den Speiseplan für Donnerstag neu schreiben.', 'Bis 14 Uhr mit Frau Haas klären, ob Blumenkohl für die Schonkost passt.', 'Die Rechnung von Frische Felder bezahlen.'], 1, '„Bitte bis heute 14 Uhr mit ihr klären und Herrn Petrović Bescheid geben, falls wir … eine andere Gemüsesorte brauchen.“'),
            R('Was soll mit der E-Mail von Frische Felder passieren?', ['Sie soll an Frau Haas weitergeleitet werden.', 'Sie soll beantwortet und unterschrieben werden.', 'Sie soll abgelegt und später mit der Rechnung verglichen werden.'], 2, '„Die schriftliche Bestätigung der Änderung kommt per E-Mail. Bitte ablegen und die Rechnung später damit vergleichen.“')
          ]
        },
        {
          id: 'beruf-kundenservice-stadtwerke', type: 'Stellenanzeige', title: 'Sachbearbeitung Kundenservice bei den Stadtwerken',
          situation: 'Sie suchen eine Stelle im Büro und lesen diese Anzeige auf der Website der Stadtwerke.',
          text: 'Stadtwerke Elmshagen – Strom, Gas und Wasser für 85.000 Menschen in der Region\nZum 1. Februar suchen wir für unser Kundenzentrum eine Sachbearbeiterin / einen Sachbearbeiter Kundenservice (m/w/d) in Teilzeit (25 bis 30 Stunden pro Woche). Die Stelle ist zunächst auf zwei Jahre befristet; eine Übernahme ist ausdrücklich geplant.\nIhre Aufgaben: Sie beantworten Anfragen unserer Kundinnen und Kunden am Telefon, per E-Mail und im Chat – zum Beispiel zu Abschlägen, Zählerständen oder einem Umzug. Sie erstellen Verträge, prüfen Rechnungen und vereinbaren bei Zahlungsschwierigkeiten Ratenzahlungen.\nIhr Profil: Sie haben eine kaufmännische Ausbildung oder mehrjährige Erfahrung im Kundenservice. Sie formulieren freundlich und klar, auch wenn ein Gespräch einmal schwierig wird. Gute Deutschkenntnisse (mindestens B2) setzen wir voraus; weitere Sprachen wie Arabisch, Russisch oder Türkisch sind bei unserer vielfältigen Kundschaft ein großes Plus. Kenntnisse in der Energiewirtschaft sind nicht nötig – wir schulen Sie in den ersten sechs Wochen.\nWir bieten: Bezahlung nach Tarifvertrag, eine betriebliche Altersvorsorge, flexible Arbeitszeiten zwischen 7 und 19 Uhr und nach der Einarbeitung bis zu zwei Tage Homeoffice pro Woche.\nBewerben Sie sich bis zum 6. Dezember über unser Karriereportal. Ein Anschreiben brauchen wir nicht; bitte beantworten Sie stattdessen drei kurze Fragen im Portal. Die Vorstellungsgespräche finden in der zweiten Dezemberhälfte statt. Ihre Ansprechpartnerin: Nadine Kurz, Telefon 04123 98 77 15.',
          questions: [
            R('Was stimmt zum Arbeitsvertrag?', ['Es ist eine Teilzeitstelle, zuerst für zwei Jahre befristet, mit geplanter Übernahme.', 'Es ist eine unbefristete Vollzeitstelle.', 'Man arbeitet sechs Wochen zur Probe und wird dann übernommen.'], 0, '„… in Teilzeit (25 bis 30 Stunden pro Woche). Die Stelle ist zunächst auf zwei Jahre befristet; eine Übernahme ist ausdrücklich geplant.“ Die sechs Wochen sind die Schulung.'),
            R('Was gehört zu den Aufgaben?', ['Zählerstände bei den Kundinnen und Kunden zu Hause ablesen.', 'Neue Kolleginnen und Kollegen in der Energiewirtschaft schulen.', 'Anfragen beantworten und bei Zahlungsproblemen Ratenzahlungen vereinbaren.'], 2, 'Unter „Ihre Aufgaben“: Anfragen „am Telefon, per E-Mail und im Chat“ beantworten und „bei Zahlungsschwierigkeiten Ratenzahlungen“ vereinbaren. Zu Zählerständen beantwortet man nur Fragen.'),
            R('Herr Haddad hat zehn Jahre im Kundenservice eines Versandhändlers gearbeitet. Er spricht Deutsch auf C1-Niveau und Arabisch, kennt sich aber mit Energie nicht aus. Passt er zur Stelle?', ['Nein, weil ihm Kenntnisse in der Energiewirtschaft fehlen.', 'Ja, denn Erfahrung im Kundenservice reicht und das Fachwissen lernt er in der Schulung.', 'Nur wenn er vorher eine kaufmännische Ausbildung macht.'], 1, 'Gefordert ist eine kaufmännische Ausbildung „oder mehrjährige Erfahrung im Kundenservice“. „Kenntnisse in der Energiewirtschaft sind nicht nötig – wir schulen Sie“. Arabisch ist „ein großes Plus“.'),
            R('Was sollen Bewerberinnen und Bewerber tun?', ['Im Portal drei kurze Fragen beantworten – ein Anschreiben ist nicht nötig.', 'Ein ausführliches Anschreiben per Post schicken.', 'Am 6. Dezember zum Vorstellungsgespräch kommen.'], 0, '„Ein Anschreiben brauchen wir nicht; bitte beantworten Sie stattdessen drei kurze Fragen im Portal.“ Der 6. Dezember ist die Bewerbungsfrist, die Gespräche sind später.')
          ]
        }
      ]
    }
  ];
})();

/* ---------- Lesen A1 und A2: sehr kurze Alltagstexte für den Einstieg (#lesen/a1, #lesen/a2) ----------
   Own practice texts. All names, addresses, phone numbers and amounts are invented.
   Appended at the end on purpose: site.js reads the first two sets by position. */
(function () {
  const R = (q, options, answer, why) => ({ q, options, answer, why });
  const RF = (q, richtig, why) => R(q, ['Richtig', 'Falsch'], richtig ? 0 : 1, why);
  const DM = window.DM || (window.DM = {});
  (DM.reading || (DM.reading = [])).push(
    {
      id: 'a1', level: 'A1', exam: 'Alltag', title: 'Lesen A1 – Schilder, Nachrichten, Formulare',
      intro: 'Sehr kurze Texte aus dem Alltag: Schilder, Nachrichten, Formulare und Anzeigen. Lies zuerst die Fragen, dann den Text.',
      items: [
        {
          id: 'a1-oeffnungszeiten', type: 'Schild', title: 'Öffnungszeiten',
          situation: 'Dieses Schild hängt an der Tür einer Bäckerei.',
          text: 'Bäckerei Korn\nÖffnungszeiten\nMontag bis Freitag: 6:30–18:00 Uhr\nSamstag: 7:00–13:00 Uhr\nSonntag: geschlossen',
          questions: [
            R('Wann schließt die Bäckerei am Samstag?', ['Um 13 Uhr', 'Um 18 Uhr', 'Um 7 Uhr'], 0, 'Am Samstag ist die Bäckerei von 7:00 bis 13:00 Uhr offen.'),
            R('Es ist Dienstag, 6:00 Uhr. Ist die Bäckerei offen?', ['Ja.', 'Nein, sie öffnet um 6:30 Uhr.', 'Nein, sie öffnet um 7:00 Uhr.'], 1, 'Von Montag bis Freitag öffnet die Bäckerei um 6:30 Uhr.'),
            RF('Am Sonntag kann man hier Brot kaufen.', false, 'Am Sonntag ist die Bäckerei geschlossen.')
          ]
        },
        {
          id: 'a1-rauchen', type: 'Aushang', title: 'Bitte nicht rauchen',
          situation: 'Dieser Aushang hängt in einem Wohnheim.',
          text: 'Liebe Gäste,\nbitte hier nicht rauchen!\nIm Haus und im Hof ist Rauchen verboten.\nDer Raucherplatz ist vor dem Haus, neben dem Parkplatz.\nVielen Dank!',
          questions: [
            R('Wo darf man rauchen?', ['Im Hof', 'Im Haus', 'Vor dem Haus'], 2, 'Der Raucherplatz ist vor dem Haus, neben dem Parkplatz.'),
            RF('Im Hof darf man rauchen.', false, 'Im Haus und im Hof ist Rauchen verboten.')
          ]
        },
        {
          id: 'a1-sprechzeiten', type: 'Schild', title: 'Sprechzeiten',
          situation: 'Dieses Schild hängt an einer Arztpraxis.',
          text: 'Praxis Dr. Elena Marković\nHausärztin\nSprechzeiten\nMontag, Dienstag, Donnerstag: 8–12 Uhr und 15–18 Uhr\nMittwoch, Freitag: 8–13 Uhr\nTermine nur nach Anmeldung\nTelefon: 0123 44 55 66',
          questions: [
            R('Du möchtest am Mittwoch um 16 Uhr zur Ärztin. Geht das?', ['Ja, die Praxis ist offen.', 'Nein, die Praxis ist dann geschlossen.', 'Ja, aber nur ohne Termin.'], 1, 'Am Mittwoch ist die Praxis nur von 8 bis 13 Uhr offen.'),
            R('Was brauchst du für einen Besuch?', ['Einen Termin', 'Ein Foto', 'Nichts'], 0, 'Auf dem Schild steht: „Termine nur nach Anmeldung“. Du rufst also zuerst an.'),
            RF('Am Donnerstag ist die Praxis auch am Nachmittag offen.', true, 'Am Donnerstag: 8–12 Uhr und 15–18 Uhr.')
          ]
        },
        {
          id: 'a1-sms', type: 'Nachricht', title: 'Ich komme später',
          situation: 'Sara bekommt eine Nachricht auf ihr Handy.',
          text: 'Hallo Sara!\nIch komme heute 20 Minuten später. Mein Bus hat Verspätung. Wartest du im Café auf mich?\nBis gleich!\nNadia',
          questions: [
            R('Warum kommt Nadia später?', ['Sie arbeitet noch.', 'Sie ist krank.', 'Ihr Bus hat Verspätung.'], 2, 'Nadia schreibt: „Mein Bus hat Verspätung.“'),
            R('Wo soll Sara warten?', ['Im Café', 'Im Bus', 'Zu Hause'], 0, 'Nadia fragt: „Wartest du im Café auf mich?“')
          ]
        },
        {
          id: 'a1-formular', type: 'Formular', title: 'Anmeldung zum Deutschkurs',
          situation: 'Eine Frau hat ein Formular ausgefüllt. (Alle Daten sind erfunden.)',
          text: 'Anmeldung zum Deutschkurs\nFamilienname: Beispiel\nVorname: Maria\nGeburtsdatum: 01.01.1990\nStraße: Musterstraße 1\nPostleitzahl, Ort: 12345 Musterstadt\nTelefon: 0123 45 67 89\nMuttersprache: Spanisch',
          questions: [
            R('Wie ist der Vorname?', ['Beispiel', 'Maria', 'Muster'], 1, 'Vorname: Maria. „Beispiel“ ist der Familienname.'),
            R('Wo wohnt die Frau?', ['In Spanien', 'In der Marienstraße', 'In Musterstadt'], 2, 'Im Formular steht: „12345 Musterstadt“.'),
            R('Wann ist sie geboren?', ['1990', '1999', '2001'], 0, 'Geburtsdatum: 01.01.1990.')
          ]
        },
        {
          id: 'a1-kassenbon', type: 'Kassenbon', title: 'Im Supermarkt',
          situation: 'Du bekommst an der Kasse diesen Bon.',
          text: 'Supermarkt Frisch & Gut\n1 Brot: 2,29 €\n2 Milch: 2,38 €\n1 kg Äpfel: 2,99 €\nSumme: 7,66 €\nGegeben: 10,00 €\nZurück: 2,34 €\nVielen Dank für Ihren Einkauf!',
          questions: [
            R('Was kostet das Brot?', ['2,38 €', '2,29 €', '2,99 €'], 1, 'Auf dem Bon steht: „1 Brot: 2,29 €“.'),
            R('Wie viel kostet alles zusammen?', ['7,66 €', '10,00 €', '2,34 €'], 0, 'Die Summe ist 7,66 €.'),
            R('Wie viel Geld bekommst du zurück?', ['7,66 €', '10,00 €', '2,34 €'], 2, 'Du gibst 10,00 € und bekommst 2,34 € zurück.')
          ]
        },
        {
          id: 'a1-fahrplan', type: 'Fahrplan', title: 'Bus 12',
          situation: 'Du stehst an der Haltestelle Marktplatz und liest den Fahrplan.',
          text: 'Bus 12 – Richtung Hauptbahnhof\nHaltestelle: Marktplatz\nMontag bis Freitag\n7:05 · 7:25 · 7:45\n8:05 · 8:35\nSamstag und Sonntag: alle 60 Minuten',
          questions: [
            R('Wohin fährt der Bus 12?', ['Zum Marktplatz', 'Zum Hauptbahnhof', 'Zum Flughafen'], 1, 'Oben steht: „Richtung Hauptbahnhof“. Der Marktplatz ist deine Haltestelle.'),
            R('Es ist Montag, 7:30 Uhr. Wann kommt der nächste Bus?', ['Um 7:25 Uhr', 'Um 8:05 Uhr', 'Um 7:45 Uhr'], 2, 'Der Bus um 7:25 Uhr ist schon weg. Der nächste Bus kommt um 7:45 Uhr.'),
            RF('Am Sonntag fährt kein Bus.', false, 'Am Samstag und am Sonntag fährt der Bus alle 60 Minuten.')
          ]
        },
        {
          id: 'a1-speisekarte', type: 'Speisekarte', title: 'Imbiss Sonne',
          situation: 'Du hast Hunger und liest die Speisekarte.',
          text: 'Imbiss Sonne – Speisekarte\nLinsensuppe: 4,50 €\nFalafel im Brot: 5,00 €\nPommes: 3,00 €\nSalat: 4,00 €\nWasser, Saft: 2,00 €\nTee: 1,50 €',
          questions: [
            R('Was kostet die Linsensuppe?', ['4,50 €', '5,00 €', '4,00 €'], 0, 'Auf der Karte steht: „Linsensuppe: 4,50 €“.'),
            R('Welches Getränk kostet am wenigsten?', ['Wasser', 'Tee', 'Saft'], 1, 'Tee kostet 1,50 €. Wasser und Saft kosten 2,00 €.'),
            R('Du hast 5 Euro. Was kannst du kaufen?', ['Falafel im Brot und ein Wasser', 'Linsensuppe und einen Saft', 'Pommes und einen Tee'], 2, 'Pommes und Tee kosten zusammen 4,50 €. Die anderen Sachen kosten mehr als 5 Euro.')
          ]
        },
        {
          id: 'a1-terminzettel', type: 'Termin-Zettel', title: 'Ihr nächster Termin',
          situation: 'Herr Ali bekommt beim Zahnarzt diesen Zettel.',
          text: 'Zahnarztpraxis Dr. Nowak\nIhr nächster Termin\nName: Yusuf Ali\nDatum: Dienstag, 14. Mai\nUhrzeit: 10:15 Uhr\nBitte bringen Sie Ihre Versichertenkarte mit.\nSie können nicht kommen? Dann rufen Sie uns bitte an.',
          questions: [
            R('Wann ist der Termin?', ['Am Donnerstag um 10:15 Uhr', 'Am Dienstag um 10:15 Uhr', 'Am Dienstag um 14:00 Uhr'], 1, 'Datum: Dienstag, 14. Mai. Uhrzeit: 10:15 Uhr.'),
            R('Was bringt Herr Ali mit?', ['Die Versichertenkarte', 'Den Pass', 'Geld'], 0, 'Auf dem Zettel steht: „Bitte bringen Sie Ihre Versichertenkarte mit.“'),
            R('Herr Ali kann nicht kommen. Was macht er?', ['Er kommt am Mittwoch.', 'Er schreibt einen Brief.', 'Er ruft die Praxis an.'], 2, '„Sie können nicht kommen? Dann rufen Sie uns bitte an.“')
          ]
        },
        {
          id: 'a1-wohnungsanzeige', type: 'Anzeige', title: 'Wohnung frei',
          situation: 'Du suchst eine Wohnung und liest diese Anzeige.',
          text: '2-Zimmer-Wohnung, 50 m², 2. Stock\nKüche, Bad, Balkon\nMiete: 480 € + 120 € Nebenkosten\nFrei ab 1. Juli\nTelefon: 0123 98 76 54 (Frau Lehmann)',
          questions: [
            R('Wie viele Zimmer hat die Wohnung?', ['Zwei', 'Drei', 'Fünf'], 0, 'In der Anzeige steht: „2-Zimmer-Wohnung“.'),
            R('Wie viel kostet die Wohnung im Monat mit Nebenkosten?', ['480 €', '120 €', '600 €'], 2, '480 € Miete und 120 € Nebenkosten sind zusammen 600 €.'),
            RF('Die Wohnung hat einen Balkon.', true, 'In der Anzeige steht: „Küche, Bad, Balkon“.')
          ]
        },
        {
          id: 'a1-minijob', type: 'Stellenanzeige', title: 'Hilfe für die Küche',
          situation: 'Dieser Zettel hängt im Fenster eines Cafés.',
          text: 'Wir suchen Hilfe für die Küche!\nDas Café Blau sucht eine Aushilfe (Minijob).\nArbeitszeit: Samstag und Sonntag, 9–14 Uhr\nSie spülen und helfen in der Küche.\nKommen Sie vorbei oder rufen Sie an: 0123 11 22 33',
          questions: [
            R('Wann arbeitet man im Café Blau?', ['Von Montag bis Freitag', 'Am Samstag und am Sonntag', 'Jeden Abend'], 1, 'Arbeitszeit: Samstag und Sonntag, 9–14 Uhr.'),
            R('Was macht die Aushilfe?', ['Sie spült und hilft in der Küche.', 'Sie arbeitet an der Kasse.', 'Sie putzt die Fenster.'], 0, 'In der Anzeige steht: „Sie spülen und helfen in der Küche.“'),
            RF('Man kann nur einen Brief schreiben.', false, 'Man kann vorbeikommen oder anrufen.')
          ]
        },
        {
          id: 'a1-elternbrief', type: 'Elternbrief', title: 'Ausflug in den Zoo',
          situation: 'Die Kita gibt den Eltern diesen Zettel.',
          text: 'Liebe Eltern,\nam Freitag machen wir einen Ausflug in den Zoo. Bitte geben Sie Ihrem Kind ein Brot und eine Flasche Wasser mit. Wir sind um 15 Uhr wieder in der Kita.\nIhr Kita-Team',
          questions: [
            R('Wohin gehen die Kinder am Freitag?', ['In den Park', 'Ins Schwimmbad', 'In den Zoo'], 2, 'Die Kita schreibt: „… einen Ausflug in den Zoo“.'),
            R('Was braucht das Kind?', ['Ein Brot und Wasser', 'Geld für den Bus', 'Sportschuhe'], 0, '„Bitte geben Sie Ihrem Kind ein Brot und eine Flasche Wasser mit.“'),
            R('Wann sind die Kinder wieder in der Kita?', ['Um 13 Uhr', 'Um 15 Uhr', 'Um 17 Uhr'], 1, '„Wir sind um 15 Uhr wieder in der Kita.“')
          ]
        },
        {
          id: 'a1-paketkarte', type: 'Paketkarte', title: 'Ihr Paket ist da',
          situation: 'Diese Karte liegt in deinem Briefkasten.',
          text: 'Ihr Paket ist da!\nSie waren heute nicht zu Hause.\nIhr Paket liegt in der Postfiliale, Bahnhofstraße 8.\nAbholen: ab morgen, 10 Uhr\nBitte bringen Sie diese Karte und Ihren Ausweis mit.',
          questions: [
            R('Wo ist das Paket?', ['Beim Nachbarn', 'In der Postfiliale', 'Vor der Tür'], 1, '„Ihr Paket liegt in der Postfiliale, Bahnhofstraße 8.“'),
            R('Ab wann kannst du das Paket abholen?', ['Ab morgen, 10 Uhr', 'Heute ab 10 Uhr', 'Ab morgen, 8 Uhr'], 0, 'Auf der Karte steht: „Abholen: ab morgen, 10 Uhr“.'),
            R('Was bringst du mit?', ['Nur den Ausweis', 'Geld und die Karte', 'Die Karte und den Ausweis'], 2, '„Bitte bringen Sie diese Karte und Ihren Ausweis mit.“')
          ]
        },
        {
          id: 'a1-kontoauszug', type: 'Kontoauszug', title: 'Mein Konto im Mai',
          situation: 'Du liest einen Kontoauszug. Minus (−) heißt: Du bezahlst. Plus (+) heißt: Du bekommst Geld.',
          text: 'Kontoauszug Mai\n02.05. Miete Mai, Frau Lehmann: −600,00 €\n05.05. Supermarkt Frisch & Gut: −23,40 €\n15.05. Lohn Café Blau: +480,00 €',
          questions: [
            R('Was kostet 600 Euro?', ['Der Einkauf im Supermarkt', 'Die Miete', 'Das Café'], 1, 'Am 02.05. steht: „Miete Mai … −600,00 €“.'),
            R('Von wem kommt Geld auf das Konto?', ['Vom Café Blau', 'Von Frau Lehmann', 'Vom Supermarkt'], 0, 'Am 15.05. steht: „Lohn Café Blau: +480,00 €“. Plus heißt: Du bekommst Geld.'),
            RF('Am 5. Mai bezahlt die Person im Supermarkt.', true, 'Am 05.05. steht: „Supermarkt Frisch & Gut: −23,40 €“.')
          ]
        }
      ]
    },
    {
      id: 'a2', level: 'A2', exam: 'Alltag', title: 'Lesen A2 – Briefe, E-Mails, Pläne',
      intro: 'Kurze Briefe, E-Mails, Pläne und Anzeigen aus dem Alltag: Amt, Wohnung, Kita und Schule, Arbeit und Bank. Lies zuerst die Fragen, dann den Text.',
      items: [
        {
          id: 'a2-jobcenter', type: 'Brief', title: 'Einladung zu einem Gespräch',
          situation: 'Herr Kamara bekommt einen Brief vom Jobcenter. (Übungstext – echte Briefe sehen anders aus.)',
          text: 'Einladung zu einem Gespräch\nSehr geehrter Herr Kamara,\nich möchte mit Ihnen über Ihre berufliche Situation sprechen. Bitte kommen Sie am Mittwoch, dem 12. Juni, um 10:00 Uhr in mein Büro (Zimmer 118, 1. Stock).\nBitte bringen Sie mit: diesen Brief, Ihren Ausweis und Ihre Bewerbungen aus den letzten Wochen.\nWenn Sie krank sind oder aus einem anderen wichtigen Grund nicht kommen können, rufen Sie mich bitte vorher an: Telefon 0123 40 50 60.\nMit freundlichen Grüßen\nS. Albrecht\nJobcenter Musterstadt',
          questions: [
            R('Worüber möchte Frau Albrecht sprechen?', ['Über die Wohnung von Herrn Kamara', 'Über die berufliche Situation von Herrn Kamara', 'Über einen Deutschkurs'], 1, 'Im Brief steht: „Ich möchte mit Ihnen über Ihre berufliche Situation sprechen.“'),
            R('Was soll Herr Kamara mitbringen?', ['Den Brief, den Ausweis und seine Bewerbungen', 'Den Ausweis und den Mietvertrag', 'Nur den Brief'], 0, '„Bitte bringen Sie mit: diesen Brief, Ihren Ausweis und Ihre Bewerbungen aus den letzten Wochen.“'),
            R('Herr Kamara ist am 12. Juni krank. Was soll er tun?', ['Am nächsten Tag kommen', 'Nichts – der Termin fällt dann aus', 'Vor dem Termin anrufen'], 2, '„Wenn Sie krank sind … rufen Sie mich bitte vorher an.“')
          ]
        },
        {
          id: 'a2-vermieter', type: 'E-Mail', title: 'Der Wasserhahn tropft',
          situation: 'Frau Hoang schreibt ihrem Vermieter.',
          text: 'Betreff: Wasserhahn in der Küche tropft\nSehr geehrter Herr Bergmann,\nich wohne in der Gartenstraße 7 im dritten Stock. Seit einer Woche tropft der Wasserhahn in der Küche. Ich habe ihn fest zugedreht, aber das hilft nicht. Jetzt ist auch der Schrank unter der Spüle nass.\nKönnen Sie bitte einen Handwerker schicken? Ich bin diese Woche jeden Tag ab 15 Uhr zu Hause. Am Samstag bin ich den ganzen Tag da.\nSie erreichen mich unter 0123 77 88 99.\nVielen Dank und freundliche Grüße\nThi Hoang',
          questions: [
            R('Was ist das Problem?', ['Der Wasserhahn in der Küche tropft.', 'Die Heizung in der Küche ist kalt.', 'Der Schrank ist kaputt.'], 0, '„Seit einer Woche tropft der Wasserhahn in der Küche.“ Der Schrank ist nur nass.'),
            R('Was möchte Frau Hoang von Herrn Bergmann?', ['Er soll weniger Miete nehmen.', 'Er soll einen neuen Schrank kaufen.', 'Er soll einen Handwerker schicken.'], 2, 'Sie fragt: „Können Sie bitte einen Handwerker schicken?“'),
            R('Wann ist Frau Hoang zu Hause?', ['Jeden Tag am Vormittag', 'Jeden Tag ab 15 Uhr und am Samstag den ganzen Tag', 'Nur am Samstag ab 15 Uhr'], 1, '„Ich bin diese Woche jeden Tag ab 15 Uhr zu Hause. Am Samstag bin ich den ganzen Tag da.“')
          ]
        },
        {
          id: 'a2-hausordnung', type: 'Hausordnung', title: 'Regeln im Haus',
          situation: 'Im Hausflur hängt ein Auszug aus der Hausordnung. (Beispiel – jedes Haus hat eigene Regeln.)',
          text: 'Hausordnung (Auszug)\n1. Ruhe: Von 22 bis 6 Uhr und von 13 bis 15 Uhr bitte keine laute Musik und keine lauten Arbeiten.\n2. Müll: Bitte trennen Sie den Müll. Papier kommt in die blaue Tonne, Verpackungen kommen in die gelbe Tonne.\n3. Treppenhaus: Fahrräder und Kinderwagen dürfen nicht im Treppenhaus stehen. Für Fahrräder gibt es einen Raum im Keller.\n4. Haustür: Bitte machen Sie die Haustür immer zu.\nVielen Dank für Ihre Hilfe!\nIhre Hausverwaltung',
          questions: [
            R('Wann soll es im Haus ruhig sein?', ['Nur in der Nacht', 'Von 6 bis 13 Uhr', 'In der Nacht und von 13 bis 15 Uhr'], 2, 'Regel 1: „Von 22 bis 6 Uhr und von 13 bis 15 Uhr bitte keine laute Musik …“'),
            R('Wohin kommt Papier in diesem Haus?', ['In die blaue Tonne', 'In die gelbe Tonne', 'In den Keller'], 0, 'Regel 2: „Papier kommt in die blaue Tonne.“'),
            R('Wo können die Fahrräder stehen?', ['Im Treppenhaus', 'In einem Raum im Keller', 'Vor der Haustür'], 1, 'Regel 3: „Für Fahrräder gibt es einen Raum im Keller.“ Im Treppenhaus dürfen sie nicht stehen.')
          ]
        },
        {
          id: 'a2-elternabend', type: 'Elternbrief', title: 'Einladung zum Elternabend',
          situation: 'Ihr Kind bringt diesen Brief aus der Schule mit.',
          text: 'Liebe Eltern der Klasse 3a,\nich lade Sie herzlich zum Elternabend ein. Er findet am Donnerstag, dem 19. September, um 18:30 Uhr im Klassenraum statt.\nWir sprechen über die Klassenfahrt im Mai und über die neuen Bücher. Außerdem wählen wir zwei Elternvertreter.\nBitte geben Sie Ihrem Kind den Zettel unten bis Montag wieder mit. Schreiben Sie darauf, ob Sie kommen können. Wenn Sie eine Übersetzung brauchen, sagen Sie mir bitte Bescheid.\nMit freundlichen Grüßen\nKatrin Aydın, Klassenlehrerin',
          questions: [
            R('Wann ist der Elternabend?', ['Am Montag um 18:30 Uhr', 'Am Donnerstag um 18:30 Uhr', 'Am Donnerstag um 19:00 Uhr'], 1, '„Er findet am Donnerstag, dem 19. September, um 18:30 Uhr … statt.“'),
            R('Worüber sprechen die Eltern und die Lehrerin?', ['Über die Klassenfahrt und die neuen Bücher', 'Über die Noten der Kinder', 'Über das Essen in der Schule'], 0, '„Wir sprechen über die Klassenfahrt im Mai und über die neuen Bücher.“'),
            R('Was sollen die Eltern bis Montag tun?', ['Die Lehrerin anrufen', 'Die neuen Bücher kaufen', 'Den Zettel ausfüllen und dem Kind mitgeben'], 2, '„Bitte geben Sie Ihrem Kind den Zettel unten bis Montag wieder mit.“')
          ]
        },
        {
          id: 'a2-arbeitsplan', type: 'Arbeitsplan', title: 'Arbeitsplan für die Küche',
          situation: 'In der Küche eines Restaurants hängt der Plan für die nächste Woche.',
          text: 'Arbeitsplan Küche – Montag bis Freitag\nFrühschicht (6–14 Uhr)\nMontag bis Mittwoch: Rosa und Mehmet\nDonnerstag und Freitag: Rosa und Ivan\nSpätschicht (14–22 Uhr)\nMontag bis Mittwoch: Ivan und Chidi\nDonnerstag und Freitag: Mehmet und Chidi\nWichtig: Am Mittwoch kommt um 7 Uhr die Lieferung. Die Frühschicht räumt die Ware ein.\nWer tauschen möchte, spricht bitte bis Freitag mit Frau Keller. Bitte tauscht nicht ohne Absprache!',
          questions: [
            R('Wann arbeitet Ivan am Dienstag?', ['Von 14 bis 22 Uhr', 'Von 6 bis 14 Uhr', 'Er hat frei.'], 0, 'Spätschicht (14–22 Uhr), Montag bis Mittwoch: Ivan und Chidi.'),
            R('Wer räumt am Mittwoch die Ware ein?', ['Ivan und Chidi', 'Frau Keller', 'Rosa und Mehmet'], 2, 'Die Frühschicht räumt die Ware ein. Am Mittwoch arbeiten Rosa und Mehmet in der Frühschicht.'),
            R('Mehmet möchte eine Schicht tauschen. Was muss er tun?', ['Einfach mit Ivan tauschen', 'Mit Frau Keller sprechen', 'Am Mittwoch um 7 Uhr kommen'], 1, '„Wer tauschen möchte, spricht bitte bis Freitag mit Frau Keller.“')
          ]
        },
        {
          id: 'a2-mittagstisch', type: 'Speiseplan', title: 'Mittagstisch im Restaurant',
          situation: 'Vor einem Restaurant steht dieses Schild.',
          text: 'Restaurant Olivenbaum – Mittagstisch\nMontag bis Freitag, 11:30 bis 14:30 Uhr\nJedes Mittagsgericht kostet 8,90 €. Eine kleine Suppe oder ein Salat ist dabei.\nMontag: Gemüsepfanne mit Reis (vegan)\nDienstag: Hähnchen mit Kartoffeln\nMittwoch: Nudeln mit Tomatensoße (vegetarisch)\nDonnerstag: Fisch mit Reis und Gemüse\nFreitag: Linseneintopf mit Brot (vegan)\nGetränke kosten extra. Alle Gerichte gibt es auch zum Mitnehmen.\nHaben Sie eine Allergie? Bitte fragen Sie uns.',
          questions: [
            R('Was bekommt man für 8,90 €?', ['Ein Gericht und ein Getränk', 'Ein Gericht mit Suppe oder Salat', 'Nur eine Suppe'], 1, '„Jedes Mittagsgericht kostet 8,90 €. Eine kleine Suppe oder ein Salat ist dabei.“ Getränke kosten extra.'),
            R('An welchem Tag gibt es Fisch?', ['Am Dienstag', 'Am Freitag', 'Am Donnerstag'], 2, 'Donnerstag: Fisch mit Reis und Gemüse.'),
            R('Sie essen kein Fleisch und keinen Fisch. An welchen Tagen können Sie hier essen?', ['Am Montag, Mittwoch und Freitag', 'Am Dienstag und Donnerstag', 'Nur am Montag'], 0, 'Am Montag, Mittwoch und Freitag sind die Gerichte vegan oder vegetarisch.')
          ]
        },
        {
          id: 'a2-bankkarte', type: 'Brief', title: 'Ihre neue Bankkarte',
          situation: 'Frau Sokolova bekommt einen Brief von ihrer Bank. (Übungstext mit einer erfundenen Bank.)',
          text: 'Ihre neue Bankkarte\nSehr geehrte Frau Sokolova,\nIhre alte Bankkarte ist nur noch bis Ende März gültig. Mit diesem Brief bekommen Sie Ihre neue Karte.\nBitte unterschreiben Sie die Karte sofort auf der Rückseite. Ihre Geheimzahl (PIN) bleibt gleich. Sie bekommen also keine neue PIN.\nSie können die neue Karte ab sofort benutzen. Bitte schneiden Sie die alte Karte danach durch und werfen Sie sie weg.\nHaben Sie Fragen? Wir helfen Ihnen gern in Ihrer Filiale.\nMit freundlichen Grüßen\nIhre Stadtbank Musterstadt',
          questions: [
            R('Bis wann kann Frau Sokolova die alte Karte benutzen?', ['Bis Ende März', 'Bis Ende Mai', 'Nur noch heute'], 0, '„Ihre alte Bankkarte ist nur noch bis Ende März gültig.“'),
            R('Was passiert mit der Geheimzahl (PIN)?', ['Sie kommt mit einem zweiten Brief.', 'Frau Sokolova holt sie in der Filiale ab.', 'Sie bleibt gleich.'], 2, '„Ihre Geheimzahl (PIN) bleibt gleich. Sie bekommen also keine neue PIN.“'),
            R('Was soll sie mit der alten Karte machen?', ['Sie in die Filiale bringen', 'Sie durchschneiden und wegwerfen', 'Sie zurückschicken'], 1, '„Bitte schneiden Sie die alte Karte danach durch und werfen Sie sie weg.“')
          ]
        },
        {
          id: 'a2-kursinfo', type: 'Kursinformation', title: 'Deutschkurs A2 am Abend',
          situation: 'Sie suchen einen Deutschkurs und lesen diese Information.',
          text: 'Deutschkurs A2 am Abend\nBeginn: Montag, 2. September\nZeit: montags und mittwochs, 18:00–20:30 Uhr\nOrt: Bildungszentrum am Markt, Raum 12\nDer Kurs dauert zwölf Wochen. Am Ende gibt es einen Test.\nDas Kursbuch bekommen Sie am ersten Abend. Es kostet 20 €.\nAnmeldung: bis 26. August im Büro (Montag bis Freitag, 9–13 Uhr) oder online. Bitte bringen Sie zur Anmeldung Ihren Ausweis mit.\nSie wissen nicht, ob A2 für Sie passt? Dann machen Sie bei uns einen kostenlosen Einstufungstest.',
          questions: [
            R('Wann ist der Unterricht?', ['Jeden Abend von Montag bis Freitag', 'Am Montag und am Mittwoch am Vormittag', 'Am Montag und am Mittwoch am Abend'], 2, '„Zeit: montags und mittwochs, 18:00–20:30 Uhr“.'),
            R('Bis wann muss man sich anmelden?', ['Bis zum 26. August', 'Bis zum 2. September', 'Bis zum ersten Abend'], 0, '„Anmeldung: bis 26. August“. Am 2. September beginnt der Kurs.'),
            R('Sie wissen nicht, ob der Kurs für Sie passt. Was können Sie tun?', ['Das Kursbuch kaufen', 'Einen Einstufungstest machen', 'Zwölf Wochen warten'], 1, '„Dann machen Sie bei uns einen kostenlosen Einstufungstest.“')
          ]
        },
        {
          id: 'a2-wohnung', type: 'Anzeige', title: '3-Zimmer-Wohnung mit Garten',
          situation: 'Familie Rossi sucht eine größere Wohnung und liest diese Anzeige. (Alle Angaben sind erfunden.)',
          text: '3-Zimmer-Wohnung in ruhiger Lage\nHelle Wohnung im Erdgeschoss, 72 m², mit Küche, Bad mit Dusche und kleinem Garten. Die Wohnung ist frisch renoviert. Bis zur Bushaltestelle sind es zwei Minuten zu Fuß. Schule und Supermarkt sind in der Nähe.\nMiete: 690 € kalt, dazu 180 € Nebenkosten. Kaution: zwei Monatsmieten.\nFrei ab 1. Oktober. Haustiere sind nach Absprache möglich.\nBesichtigung am Samstag, 14. September, um 11 Uhr. Bitte melden Sie sich vorher per E-Mail an: wohnung@beispiel.example',
          questions: [
            R('Was hat die Wohnung?', ['Einen Balkon im dritten Stock', 'Einen kleinen Garten', 'Eine Garage'], 1, '„Helle Wohnung im Erdgeschoss … mit Küche, Bad mit Dusche und kleinem Garten.“'),
            R('Wie viel bezahlt man im Monat für Miete und Nebenkosten zusammen?', ['690 €', '180 €', '870 €'], 2, '690 € Kaltmiete und 180 € Nebenkosten sind zusammen 870 €.'),
            R('Familie Rossi möchte die Wohnung sehen. Was muss sie tun?', ['Sich vorher per E-Mail anmelden', 'Am 1. Oktober kommen', 'Zuerst die Kaution bezahlen'], 0, '„Besichtigung am Samstag, 14. September, um 11 Uhr. Bitte melden Sie sich vorher per E-Mail an.“')
          ]
        },
        {
          id: 'a2-chef', type: 'Nachricht', title: 'Nachricht vom Chef',
          situation: 'Der Chef schreibt eine Nachricht an das ganze Team.',
          text: 'Hallo zusammen,\nam Freitag bekommen wir eine große Lieferung. Deshalb brauche ich am Freitag zwei Personen, die schon um 6 Uhr anfangen können. Wer früher kommt, kann natürlich auch zwei Stunden früher gehen.\nBitte schreibt mir bis morgen Mittag, wer Zeit hat.\nNoch etwas: Die neue Arbeitskleidung ist da. Ihr könnt sie ab Donnerstag im Büro abholen. Bitte sagt mir vorher eure Größe.\nDanke und viele Grüße\nStefan',
          questions: [
            R('Warum sollen am Freitag zwei Personen früher anfangen?', ['Weil eine große Lieferung kommt.', 'Weil zwei Kollegen krank sind.', 'Weil das Büro früher schließt.'], 0, '„Am Freitag bekommen wir eine große Lieferung. Deshalb brauche ich … zwei Personen, die schon um 6 Uhr anfangen können.“'),
            R('Bis wann sollen die Kollegen antworten?', ['Bis Freitag um 6 Uhr', 'Bis Donnerstag', 'Bis morgen Mittag'], 2, '„Bitte schreibt mir bis morgen Mittag, wer Zeit hat.“'),
            R('Was können die Kollegen ab Donnerstag im Büro abholen?', ['Den neuen Arbeitsplan', 'Die neue Arbeitskleidung', 'Ihr Geld'], 1, '„Die neue Arbeitskleidung ist da. Ihr könnt sie ab Donnerstag im Büro abholen.“')
          ]
        }
      ]
    }
  );
})();
