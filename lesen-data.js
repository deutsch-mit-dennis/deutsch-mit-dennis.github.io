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
        }
      ]
    }
  ];
})();
