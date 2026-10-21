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
        }
      ]
    }
  ];
})();
