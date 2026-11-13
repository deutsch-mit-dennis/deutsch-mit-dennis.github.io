/* DTB B2 – Modelltest 3. Eigene Übungsaufgaben im Stil der Prüfung (Format: tools/sim/SCHEMA.md). */
(() => {
const MAILBOX = [
  { s: 'f', t: 'Guten Tag, hier spricht Katrin Vogel, Pflegedienstleitung im Seniorenzentrum Lindenhof in Recklinghausen. Ich rufe wegen der Wartung unserer Pflegebetten an, die Sie für nächsten Dienstag, den elften, geplant haben. Leider passt der Termin bei uns gar nicht: Am Dienstag kommt die Heimaufsicht zur Prüfung, da brauchen wir alle Zimmer. Könnten wir die Wartung auf Donnerstag, den dreizehnten, verschieben? Am besten ab dreizehn Uhr, wenn die Bewohner Mittagsruhe hatten und viele im Gemeinschaftsraum sind. Außerdem sind es nicht mehr vierundzwanzig Betten, sondern sechsundzwanzig, wir haben im Oktober zwei neue bekommen – die bitte gleich mit prüfen. Bei drei Betten auf Station zwei funktioniert die Fernbedienung manchmal nicht, das sollte sich der Techniker auf jeden Fall ansehen. Bitte bestätigen Sie mir den neuen Termin bis Freitag, damit ich die Dienstpläne anpassen kann. Sie erreichen mich direkt unter null zwei drei sechs eins, fünf null, sieben acht, zwölf. Also: null zwei drei sechs eins, fünf null, sieben acht, eins zwei. Vielen Dank und auf Wiederhören.' }
];
(window.SIM = window.SIM || {})['dtb-b2-3'] = {
  id: 'dtb-b2-3', title: 'DTB B2 – Deutsch-Test für den Beruf (Modelltest 3)', short: 'DTB B2 · Test 3', provider: 'telc', level: 'B2',
  intro: 'Der dritte komplette Übungstest für den DTB B2 – mit neuen Aufgaben aus Pflege, Spedition, Bank, Energieversorgung, Hotellerie und Verwaltung.',
  rule: 'dtb',
  skills: { lesen: { label: 'Lesen', max: 60 }, hoeren: { label: 'Hören', max: 60 }, schreiben: { label: 'Schreiben', max: 60 }, sprechen: { label: 'Sprechen', max: 60 } },
  sections: [
    { id: 'lesen', title: 'Lesen', minutes: 45, note: 'Vier Teile. Du markierst deine Lösungen direkt. Teil dir die Zeit ein: ca. 10–12 Minuten pro Teil.', parts: [
      { title: 'Lesen Teil 1: Informationen zum Arbeitsmarkt', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? Jede Anzeige können Sie nur einmal verwenden. Drei Anzeigen bleiben übrig.',
        material: [
          { h: 'a) Volkshochschule Essen – Fachkurs Buchhaltung', t: 'Abendkurs (Di und Do, 18–21 Uhr) für Beschäftigte, die sich im Rechnungswesen weiterbilden möchten. Abschluss mit IHK-Zertifikat. Förderung über den Bildungsscheck NRW möglich.' },
          { h: 'b) Spedition Kaltenbach', t: 'Disponent/in (m/w/d) für den internationalen Verkehr. Sie planen Touren nach Polen und Tschechien. Polnisch- oder Tschechischkenntnisse sind ein großer Vorteil. Erfahrung in der Logistik erforderlich.' },
          { h: 'c) Welcome Center Ruhr', t: 'Sie sind neu in der Region und suchen Arbeit in Ihrem akademischen Beruf? Wir bieten kostenlose Beratung zu Anerkennung, Bewerbung und Netzwerken – auch auf Englisch und Arabisch.' },
          { h: 'd) Stadtwerke Gelsenkirchen', t: 'Kundenberater/in im Servicecenter (Teilzeit 30 Std.). Sie beraten zu Strom- und Gastarifen. Kaufmännische Ausbildung oder Erfahrung im Kundenservice. Gleitzeit zwischen 7 und 19 Uhr.' },
          { h: 'e) Klinikum Westfalen – Pflegeschule', t: 'Anpassungslehrgang für Pflegekräfte mit ausländischem Abschluss. Ziel: volle Anerkennung als Pflegefachfrau/-mann. Dauer: 6–12 Monate, bezahlt, mit Praxiseinsätzen auf unseren Stationen.' },
          { h: 'f) Sparkasse Mittelrhein', t: 'Ausbildung zur Bankkauffrau/zum Bankkaufmann ab August. Abitur oder Fachhochschulreife erwünscht. Auch für Bewerber/innen bis 30, die schon eine andere Ausbildung haben.' },
          { h: 'g) Hotelgruppe Rheinblick', t: 'Revenue-Manager/in für unsere vier Häuser. Sie analysieren Preise und Buchungen. Studium im Bereich Tourismus oder BWL, sehr gute Excel-Kenntnisse. Remote-Arbeit an drei Tagen möglich.' },
          { h: 'h) Jobcenter – Programm „Selbstständig starten“', t: 'Sie möchten sich selbstständig machen? Gründungsberatung, Hilfe beim Businessplan und bis zu sechs Monate finanzielle Unterstützung für Arbeitsuchende.' }
        ],
        opts: ['a) VHS – Buchhaltung', 'b) Spedition Kaltenbach', 'c) Welcome Center Ruhr', 'd) Stadtwerke Gelsenkirchen', 'e) Klinikum Westfalen', 'f) Sparkasse Mittelrhein', 'g) Hotelgruppe Rheinblick', 'h) Jobcenter – Gründung'],
        items: [
          { q: '1. Joanna kommt aus Polen und hat zehn Jahre in einer Spedition gearbeitet. Sie sucht eine Stelle, in der sie ihre Sprachkenntnisse nutzen kann.', a: 1, why: 'Die Spedition plant Touren nach Polen, Polnischkenntnisse sind „ein großer Vorteil“.' },
          { q: '2. Rami ist Krankenpfleger aus Jordanien. Sein Abschluss ist nur teilweise anerkannt. Er möchte in Deutschland als Pflegefachmann arbeiten.', a: 4, why: 'Anpassungslehrgang „für Pflegekräfte mit ausländischem Abschluss“, Ziel volle Anerkennung.' },
          { q: '3. Svetlana arbeitet tagsüber als Bürokauffrau. Sie möchte sich abends im Bereich Finanzen weiterbilden.', a: 0, why: 'VHS-Abendkurs Buchhaltung für Beschäftigte im Rechnungswesen.' },
          { q: '4. Ahmed hat in Ägypten Architektur studiert und weiß nicht, wie er hier eine passende Stelle finden kann.', a: 2, why: 'Welcome Center: Beratung für akademische Berufe, Anerkennung und Bewerbung, auch auf Arabisch.' },
          { q: '5. Lucía ist arbeitslos und möchte ein eigenes kleines Café eröffnen.', a: 7, why: 'Jobcenter-Programm für Arbeitsuchende, die sich selbstständig machen wollen.' }
        ] },
      { title: 'Lesen Teil 2: Anweisungen verstehen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die Hausmitteilung und die Aufgaben 1–4. Sind die Aussagen 1 und 2 richtig oder falsch? Welche Lösung (a, b oder c) ist bei den Aufgaben 3 und 4 richtig?',
        material: [{ h: 'Hausmitteilung 14/2026 – Spedition Kaltenbach, Standort Bochum', t: 'Neue Regelung für Dienstreisen und Spesen – gültig ab 1. Dezember\n\nLiebe Kolleginnen und Kollegen,\n\nab Dezember rechnen wir Dienstreisen nur noch digital über die App „TravelDesk“ ab. Papierformulare nimmt die Buchhaltung ab diesem Datum nicht mehr an. Wer noch keinen Zugang hat, meldet sich bitte bis zum 25. November bei der IT.\n\nBelege fotografieren Sie direkt mit der App. Die Originale müssen Sie trotzdem sechs Monate aufbewahren, weil das Finanzamt sie verlangen kann. Danach dürfen Sie sie vernichten.\n\nDienstreisen mit dem eigenen Auto sind nur noch erlaubt, wenn kein Firmenwagen frei ist und die Reise mit der Bahn länger als zwei Stunden dauern würde. Bitte lassen Sie sich die Fahrt vorher von Ihrer Abteilungsleitung genehmigen. Wir erstatten 30 Cent pro Kilometer.\n\nHotels buchen Sie ab sofort nicht mehr selbst, sondern über das Sekretariat. So können wir die Rahmenverträge mit unseren Partnerhotels nutzen. Ausnahme: Wenn eine Reise kurzfristig verlängert wird, dürfen Sie selbst buchen – bis maximal 110 Euro pro Nacht.\n\nDie Abrechnung muss spätestens vier Wochen nach der Reise vollständig in der App sein. Später eingereichte Abrechnungen können wir leider nicht mehr berücksichtigen.\n\nIhre Personalabteilung' }],
        items: [
          { q: '1. Nach dem Fotografieren mit der App kann man die Originalbelege wegwerfen.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Die Originale müssen Sie trotzdem sechs Monate aufbewahren“.' },
          { q: '2. Für Fahrten mit dem eigenen Auto braucht man vorher eine Genehmigung.', opts: ['Richtig', 'Falsch'], a: 0, why: '„Bitte lassen Sie sich die Fahrt vorher von Ihrer Abteilungsleitung genehmigen.“' },
          { q: '3. Hotels …', opts: ['a) bucht man immer selbst, aber nur Partnerhotels.', 'b) bucht normalerweise das Sekretariat.', 'c) bezahlt die Firma bis 110 Euro, egal wer bucht.'], a: 1, why: '„Hotels buchen Sie ab sofort nicht mehr selbst, sondern über das Sekretariat.“ Selbst buchen nur bei kurzfristiger Verlängerung.' },
          { q: '4. Was passiert, wenn man die Abrechnung nach sechs Wochen einreicht?', opts: ['a) Man bekommt das Geld nicht mehr erstattet.', 'b) Man muss ein Papierformular nehmen.', 'c) Die Abteilungsleitung muss zustimmen.'], a: 0, why: '„Später eingereichte Abrechnungen können wir leider nicht mehr berücksichtigen.“' }
        ] },
      { title: 'Lesen Teil 3: Arbeitsbedingungen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die Fragen 1–4 aus einem Ratgeberforum für Beschäftigte und die Texte a–e. Welcher Text beantwortet welche Frage? Jeden Text können Sie nur einmal verwenden. Zu einer Frage gibt es keinen passenden Text. Wählen Sie dann x. Zwei Texte bleiben übrig.',
        material: [
          { h: 'a) Urlaub in der Probezeit', t: 'Auch in der Probezeit entsteht Urlaubsanspruch – pro voll gearbeitetem Monat ein Zwölftel des Jahresurlaubs. Den vollen Anspruch hat man nach sechs Monaten. Der Arbeitgeber darf Urlaub in der Probezeit nicht grundsätzlich verbieten, muss ihn aber nicht zu jedem Wunschtermin genehmigen.' },
          { h: 'b) Überstunden', t: 'Überstunden müssen nur geleistet werden, wenn das im Arbeits- oder Tarifvertrag steht oder es einen echten Notfall gibt. Ob sie bezahlt oder mit Freizeit ausgeglichen werden, regelt ebenfalls der Vertrag. Notieren Sie Ihre Überstunden am besten selbst mit Datum und Uhrzeit.' },
          { h: 'c) Krank im Urlaub', t: 'Wer im Urlaub krank wird, verliert diese Urlaubstage nicht – vorausgesetzt, man lässt sich von einer Ärztin oder einem Arzt krankschreiben und informiert den Arbeitgeber sofort. Die Tage werden dann nachgewährt. Ein Recht darauf, den Urlaub einfach zu verlängern, gibt es aber nicht.' },
          { h: 'd) Homeoffice', t: 'Einen gesetzlichen Anspruch auf Homeoffice gibt es in Deutschland nicht. Viele Firmen haben aber Betriebsvereinbarungen. Fragen Sie den Betriebsrat, welche Regeln bei Ihnen gelten, und vereinbaren Sie Homeoffice-Tage am besten schriftlich.' },
          { h: 'e) Weiterbildung', t: 'In den meisten Bundesländern haben Beschäftigte Anspruch auf Bildungsurlaub, in der Regel fünf Tage pro Jahr. Der Antrag muss meist sechs Wochen vorher gestellt werden, und der Kurs muss offiziell anerkannt sein.' }
        ],
        opts: ['a) Urlaub in der Probezeit', 'b) Überstunden', 'c) Krank im Urlaub', 'd) Homeoffice', 'e) Weiterbildung', 'x) kein passender Text'],
        items: [
          { q: '1. „Ich habe im Juli angefangen und möchte im Oktober eine Woche wegfahren. Mein Chef sagt, in der Probezeit gibt es überhaupt keinen Urlaub. Stimmt das?“', a: 0, why: 'Text a: Urlaub in der Probezeit darf nicht grundsätzlich verboten werden.' },
          { q: '2. „Ich hatte im Urlaub eine Grippe und lag fünf Tage im Bett. Sind diese Tage jetzt einfach weg?“', a: 2, why: 'Text c: Mit Krankschreibung verliert man die Urlaubstage nicht.' },
          { q: '3. „Mein Arbeitgeber möchte, dass ich nach der Elternzeit nur noch nachts arbeite. Darf er das?“', a: 5, why: 'Kein Text behandelt Elternzeit oder Nachtarbeit → x.' },
          { q: '4. „Ich möchte einen einwöchigen Sprachkurs machen. Muss ich dafür meinen normalen Urlaub nehmen?“', a: 4, why: 'Text e: Anspruch auf Bildungsurlaub, in der Regel fünf Tage pro Jahr.' }
        ] },
      { title: 'Lesen Teil 4: Aufgaben und Aufgabenverteilung', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie das Protokoll einer Teambesprechung und die Aufgaben 1–5. Welche Lösung (a, b oder c) ist richtig?',
        material: [{ h: 'Protokoll der Teambesprechung – Stadtwerke Gelsenkirchen, Servicecenter', t: 'Datum: 04.11.2026, 9:00–9:45 Uhr\nAnwesend: Frau Kowalski (Teamleitung), Herr Aydın, Frau Berger, Herr Lindner, Frau Osei\nProtokoll: Herr Lindner\n\nTOP 1: Neue Strompreise ab Januar\nAb 1. Januar steigen die Preise um 4 %. Die Kunden bekommen bis 30. November einen Brief. Frau Kowalski rechnet mit vielen Anrufen und bittet darum, im Dezember keinen Urlaub zu nehmen. Bereits genehmigter Urlaub bleibt bestehen. Herr Aydın erstellt bis Freitag eine Liste mit häufigen Fragen und Antworten für alle.\n\nTOP 2: Chatfunktion auf der Website\nSeit Oktober gibt es einen Chat. Die Anfragen beantwortet zuerst ein Chatbot. Wenn er nicht weiterweiß, übernimmt ein Mensch. Frau Berger betreut den Chat vormittags, Frau Osei nachmittags. Bei Beschwerden über Rechnungen soll der Chat die Kunden an die Telefon-Hotline weiterleiten, weil man dort die Kundendaten besser prüfen kann.\n\nTOP 3: Fortbildung „Schwierige Gespräche“\nDie Fortbildung findet am 20. November statt. Teilnehmen können vier Personen. Frau Osei und Herr Lindner haben sich schon angemeldet. Wer noch Interesse hat, meldet sich bis Montag bei Frau Kowalski. Die Fortbildung zählt als Arbeitszeit.\n\nTOP 4: Verschiedenes\nDie Kaffeemaschine in der Küche wird nächste Woche ersetzt. Bis dahin steht im Konferenzraum ein Wasserkocher.' }],
        items: [
          { q: '1. Was gilt für den Urlaub im Dezember?', opts: ['Niemand darf im Dezember Urlaub nehmen.', 'Schon genehmigter Urlaub kann genommen werden.', 'Nur Herr Aydın muss im Dezember arbeiten.'], a: 1, why: '„Bereits genehmigter Urlaub bleibt bestehen.“ Neuer Urlaub soll vermieden werden.' },
          { q: '2. Wer beantwortet Anfragen im Chat zuerst?', opts: ['Frau Berger.', 'Frau Osei.', 'Ein Chatbot.'], a: 2, why: '„Die Anfragen beantwortet zuerst ein Chatbot.“' },
          { q: '3. Was passiert bei Beschwerden über Rechnungen im Chat?', opts: ['Die Kunden werden an die Telefon-Hotline weitergeleitet.', 'Der Chatbot prüft die Kundendaten.', 'Frau Kowalski schreibt den Kunden einen Brief.'], a: 0, why: '„… soll der Chat die Kunden an die Telefon-Hotline weiterleiten“.' },
          { q: '4. Für die Fortbildung …', opts: ['muss man sich bis Freitag anmelden.', 'gibt es noch zwei freie Plätze.', 'muss man einen Urlaubstag nehmen.'], a: 1, why: 'Vier Plätze, zwei schon belegt (Frau Osei, Herr Lindner); sie zählt als Arbeitszeit, Anmeldung bis Montag.' },
          { q: '5. Wer erstellt die Liste mit Fragen und Antworten zu den neuen Preisen?', opts: ['Herr Lindner.', 'Frau Kowalski.', 'Herr Aydın.'], a: 2, why: '„Herr Aydın erstellt bis Freitag eine Liste mit häufigen Fragen und Antworten“.' }
        ] }
    ] },
    { id: 'lesen-schreiben', title: 'Lesen und Schreiben', minutes: 20, note: 'Erst die beiden Texte lesen und die Aufgaben 1–2 lösen, dann die Antwort-E-Mail schreiben. Plane ca. 5 Minuten zum Lesen und 15 Minuten zum Schreiben ein.', parts: [
      { title: 'Lesen und Schreiben Teil 1: Kundenbeschwerde verstehen', skill: 'lesen', pts: 3,
        instr: 'Sie arbeiten an der Rezeption im Hotel Rheinblick in Köln. Lesen Sie die E-Mail einer Kundin und die Nachricht Ihrer Chefin. Welche Lösung (a, b oder c) ist richtig?',
        material: [
          { h: 'E-Mail der Kundin', t: 'Von: Martina Seidel, Seidel Consulting GmbH, Frankfurt\nAn: Hotel Rheinblick, Reservierung\nBetreff: Tagung vom 28.–30. Oktober\n\nSehr geehrte Damen und Herren,\n\nwir waren mit 18 Personen zu einer Tagung in Ihrem Haus. Leider war ich mit mehreren Punkten sehr unzufrieden. Im Tagungsraum hat der Beamer am ersten Tag zwei Stunden lang nicht funktioniert, und niemand von der Technik war erreichbar. Außerdem wurden vier Zimmer erst um 18 Uhr fertig, obwohl wir den Check-in für 15 Uhr vereinbart hatten. Meine Kolleginnen und Kollegen mussten mit ihrem Gepäck in der Lobby warten.\n\nIn der Rechnung finde ich zudem für alle Teilnehmenden ein Abendessen am 30. Oktober, obwohl wir an diesem Tag schon mittags abgereist sind.\n\nIch erwarte eine Erklärung und eine Korrektur der Rechnung. Für unsere nächste Tagung im Frühjahr suchen wir sonst ein anderes Hotel.\n\nMit freundlichen Grüßen\nMartina Seidel' },
          { h: 'Nachricht der Chefin', t: 'Bitte antworten Sie Frau Seidel heute noch im Namen der Hotelleitung:\n– für alles entschuldigen, Rückmeldung ernst nehmen\n– Beamer: Gerät war defekt, Techniker an dem Tag krank – inzwischen haben wir einen zweiten Techniker im Bereitschaftsdienst\n– Zimmer: Personalengpass in der Reinigung – das hätte nicht passieren dürfen\n– Abendessen 30.10.: Fehler, wird storniert, neue Rechnung kommt diese Woche\n– als Entschuldigung: 10 % Rabatt auf die gesamte Tagung + kostenloser Tagungsraum bei der Frühjahrstagung\n– Ansprechpartner für die Frühjahrstagung: Herr Brenner, Bankett, Tel. 0221 77 88 45' }
        ],
        items: [
          { q: 'Worüber beschwert sich Frau Seidel unter anderem?', opts: ['a) über das schlechte Essen und den lauten Tagungsraum', 'b) über die Technik im Tagungsraum und zu spät fertige Zimmer', 'c) über unfreundliches Personal an der Rezeption'], a: 1, why: 'Der Beamer ging zwei Stunden nicht, und vier Zimmer waren erst um 18 Uhr fertig.' },
          { q: 'Was bietet das Hotel an?', opts: ['a) einen kostenlosen Tagungsraum bei der nächsten Tagung und Rabatt', 'b) eine kostenlose Übernachtung für alle Teilnehmenden', 'c) ein kostenloses Abendessen bei der nächsten Tagung'], a: 0, why: '„10 % Rabatt auf die gesamte Tagung + kostenloser Tagungsraum bei der Frühjahrstagung“.' }
        ] },
      { kind: 'write', title: 'Lesen und Schreiben Teil 2: Antwort an die Kundin', skill: 'schreiben', pts: 16,
        instr: 'Schreiben Sie im Namen der Hotelleitung eine Antwort-E-Mail an Frau Seidel. Setzen Sie alle Anweisungen Ihrer Chefin um. Richtwert: ca. 100 Wörter (der offizielle Modelltest gibt keine Wortzahl vor). Achten Sie auf Anrede, Gruß und einen höflichen, professionellen Ton.',
        options: [{ h: 'Antwort an Frau Seidel', situation: 'Sie arbeiten an der Rezeption im Hotel Rheinblick. Frau Seidel hat sich nach einer Tagung beschwert. Ihre Chefin bittet Sie, im Namen der Hotelleitung zu antworten.', task: 'Schreiben Sie eine Antwort-E-Mail an Frau Seidel und setzen Sie alle Punkte aus der Nachricht Ihrer Chefin um.',
          points: ['Dank für die Rückmeldung und Entschuldigung', 'Erklärung zum Beamer (defekt, Techniker krank) und neue Lösung (Bereitschaftsdienst)', 'Erklärung zu den Zimmern (Personalengpass)', 'Korrektur der Rechnung (Abendessen storniert, neue Rechnung diese Woche)', 'Entschuldigungsangebot: 10 % Rabatt und kostenloser Tagungsraum im Frühjahr', 'Ansprechpartner für die Frühjahrstagung'],
          muster: 'Sehr geehrte Frau Seidel,\n\nvielen Dank für Ihre offene Rückmeldung zu Ihrer Tagung vom 28. bis 30. Oktober. Wir nehmen Ihre Kritik sehr ernst und möchten uns im Namen der Hotelleitung aufrichtig entschuldigen.\n\nDer Beamer im Tagungsraum war leider defekt, und unser Techniker war an diesem Tag krank. Damit so etwas nicht wieder passiert, haben wir inzwischen einen zweiten Techniker im Bereitschaftsdienst. Dass vier Zimmer erst um 18 Uhr fertig waren, lag an einem Personalengpass in der Reinigung. Das hätte trotzdem nicht passieren dürfen.\n\nDas Abendessen am 30. Oktober wurde Ihnen irrtümlich berechnet. Wir haben die Position storniert; Sie erhalten diese Woche eine korrigierte Rechnung.\n\nAls Entschuldigung gewähren wir Ihnen 10 % Rabatt auf die gesamte Tagung. Für Ihre Frühjahrstagung stellen wir Ihnen außerdem den Tagungsraum kostenlos zur Verfügung. Ihr Ansprechpartner ist Herr Brenner aus unserer Bankettabteilung, Tel. 0221 77 88 45.\n\nWir würden uns sehr freuen, Sie im Frühjahr wieder bei uns begrüßen zu dürfen.\n\nMit freundlichen Grüßen\nim Namen der Hotelleitung\nIhr Team vom Hotel Rheinblick' }],
        minWords: 100,
        check: ['Formelle Anrede und passender Gruß', 'Dank und Entschuldigung am Anfang', 'Beide Probleme erklärt (Beamer, Zimmer) mit Grund', 'Neue Lösung für die Technik genannt (Bereitschaftsdienst)', 'Rechnungskorrektur klar beschrieben', 'Rabatt und kostenloser Tagungsraum angeboten', 'Ansprechpartner mit Telefonnummer', 'Höflicher, professioneller Ton (keine Ausreden, kein Umgangston)'] }
    ] },
    { id: 'hoeren', title: 'Hören', minutes: 20, note: 'Lies vor jedem Hörtext die Aufgaben. Du hörst alle Teile nur einmal.', parts: [
      { title: 'Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören drei kurze Gespräche unter Kolleginnen und Kollegen. Zu jedem Gespräch gibt es eine Aussage (richtig oder falsch) und eine Aufgabe (a, b oder c). Sie hören jedes Gespräch einmal.',
        audio: [
          { h: 'Gespräch 1 – in der Bankfiliale', lines: [
            { s: 'f', t: 'Herr Petersen, der Geldautomat im Foyer zeigt schon wieder „Außer Betrieb“.' },
            { s: 'm', t: 'Ach nee. Hat jemand den Service angerufen?' },
            { s: 'f', t: 'Ja, ich habe vor einer Stunde ein Ticket aufgemacht. Die kommen aber erst morgen Vormittag.' },
            { s: 'm', t: 'Das ist schlecht, heute ist Monatsanfang, da wollen alle Geld abheben. Hängen Sie bitte einen Zettel an den Automaten, dass der Automat im Supermarkt gegenüber funktioniert.' },
            { s: 'f', t: 'Mach ich. Und an der Kasse?' },
            { s: 'm', t: 'An der Kasse können wir heute ausnahmsweise auch kleinere Beträge auszahlen, ohne Gebühr. Sagen Sie das bitte auch den Kollegen.' }
          ] },
          { h: 'Gespräch 2 – in der Spedition', lines: [
            { s: 'm', t: 'Kemal, der LKW nach Breslau hat Verspätung. Der Fahrer steht seit zwei Stunden an der Grenze.' },
            { s: 'm2', t: 'Mist. Der Kunde braucht die Ware doch morgen um acht für die Produktion.' },
            { s: 'm', t: 'Genau. Was meinst du, sollen wir einen zweiten Fahrer schicken?' },
            { s: 'm2', t: 'Das bringt nichts, der wäre auch nicht schneller. Ich rufe lieber den Kunden an und frage, ob halb elf auch geht.' },
            { s: 'm', t: 'Gut. Und wenn nicht?' },
            { s: 'm2', t: 'Dann muss die Chefin entscheiden, ob wir die Strafe aus dem Vertrag bezahlen. Aber ich glaube, die sind flexibel, das ist ein Stammkunde.' }
          ] },
          { h: 'Gespräch 3 – im Bürgeramt', lines: [
            { s: 'f', t: 'Frau Kaya, ab Montag sollen wir ja auch samstags öffnen. Haben Sie den Plan schon gesehen?' },
            { s: 'f2', t: 'Ja, jede von uns arbeitet einen Samstag im Monat, von neun bis dreizehn Uhr.' },
            { s: 'f', t: 'Und bekommen wir dafür einen Tag frei?' },
            { s: 'f2', t: 'Nicht einen ganzen Tag, aber die vier Stunden werden doppelt gerechnet. Die kann man dann als freien Nachmittag nehmen.' },
            { s: 'f', t: 'Okay. Ich würde gern im ersten Monat tauschen, mein Sohn hat am ersten Samstag Konfirmation.' },
            { s: 'f2', t: 'Dann sprechen Sie am besten direkt mit Herrn Brandl, der macht den Plan.' }
          ] }
        ],
        items: [
          { au: 0, q: 'Der Service repariert den Geldautomaten noch heute.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Die kommen aber erst morgen Vormittag.“' },
          { au: 0, q: 'Was gilt heute an der Kasse?', opts: ['a) Man kann dort keine kleinen Beträge abheben.', 'b) Man kann dort ohne Gebühr auch kleine Beträge bekommen.', 'c) Die Kasse ist wegen des Monatsanfangs geschlossen.'], a: 1, why: '„… können wir heute ausnahmsweise auch kleinere Beträge auszahlen, ohne Gebühr.“' },
          { au: 1, q: 'Die Kollegen schicken einen zweiten Fahrer.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Das bringt nichts, der wäre auch nicht schneller.“' },
          { au: 1, q: 'Was will Kemal zuerst tun?', opts: ['a) Die Vertragsstrafe bezahlen.', 'b) Mit der Chefin sprechen.', 'c) Den Kunden nach einer späteren Lieferzeit fragen.'], a: 2, why: '„Ich rufe lieber den Kunden an und frage, ob halb elf auch geht.“' },
          { au: 2, q: 'Für die Samstagsarbeit bekommt man einen ganzen freien Tag.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Nicht einen ganzen Tag, aber die vier Stunden werden doppelt gerechnet.“' },
          { au: 2, q: 'Was soll die Kollegin tun, wenn sie tauschen möchte?', opts: ['a) Einen Antrag bei Frau Kaya stellen.', 'b) Einen freien Nachmittag nehmen.', 'c) Mit Herrn Brandl sprechen.'], a: 2, why: '„Dann sprechen Sie am besten direkt mit Herrn Brandl, der macht den Plan.“' }
        ] },
      { title: 'Hören Teil 2: Argumente', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören vier kurze Gespräche. Welcher Satz (a–f) passt zu welchem Gespräch? Zwei Sätze passen nicht. Sie haben jetzt eine Minute Zeit, die Sätze a–f zu lesen. Sie hören jedes Gespräch einmal.',
        audio: [
          { h: 'Gespräch 1 – im Supermarkt', lines: [
            { s: 'm', t: 'Frau Petrova, soll ich die Joghurts hier wegwerfen? Die laufen morgen ab.' },
            { s: 'f', t: 'Moment, nicht wegwerfen. Die sind doch noch völlig in Ordnung.' },
            { s: 'm', t: 'Ja, aber die kauft doch keiner mehr, wenn morgen das Datum drauf ist.' },
            { s: 'f', t: 'Doch, wenn sie billiger sind. Kleb einen roten Aufkleber drauf, minus fünfzig Prozent, und stell sie vorne an die Kasse. Du wirst sehen, um sechs ist alles weg. Wir verdienen zwar weniger daran, aber immer noch mehr, als wenn alles in der Tonne landet. Und es ist einfach schade um die Lebensmittel.' },
            { s: 'm', t: 'Okay, mach ich. Gilt das auch für das Brot von gestern?' },
            { s: 'f', t: 'Für das Brot auch, ja.' }
          ] },
          { h: 'Gespräch 2 – im Elektrobetrieb', lines: [
            { s: 'm2', t: 'Chef, ich hab hier die Anmeldung für den Kurs zu Solaranlagen. Sechs Wochen, jeden Samstag. Ich weiß, der ist nicht billig.' },
            { s: 'm', t: 'Eintausendneunhundert Euro, ja, das hab ich gesehen. Das ist schon eine Menge Geld.' },
            { s: 'm2', t: 'Schon. Aber überlegen Sie mal: Letzten Monat haben wir drei Anfragen für Solaranlagen abgesagt, weil keiner von uns das machen darf. Mit dem Zertifikat können wir diese Aufträge annehmen. Nach zwei, drei Anlagen hat sich der Kurs bezahlt gemacht.' },
            { s: 'm', t: 'Hm. Und wenn Sie danach zur Konkurrenz gehen?' },
            { s: 'm2', t: 'Ich hab nicht vor, zu gehen. Mir gefällt’s hier. Und ehrlich gesagt: Wer in seine Leute investiert, der behält sie auch eher.' },
            { s: 'm', t: 'Na gut. Ich unterschreib das.' }
          ] },
          { h: 'Gespräch 3 – im Kundenservice', lines: [
            { s: 'f2', t: 'Herr Lange, haben Sie gesehen? Die Geschäftsleitung überlegt, dass wir auf alle E-Mails erst mal eine automatische Antwort schicken. „Vielen Dank, wir melden uns.“' },
            { s: 'm', t: 'Ja, hab ich gehört. Spart ja Zeit.' },
            { s: 'f2', t: 'Ich weiß nicht. Ich hab mir die Beschwerden vom letzten Monat angeschaut. Die Leute ärgern sich am meisten, wenn sie das Gefühl haben, mit einer Maschine zu reden. Zwei, drei persönliche Sätze mit Namen – „Ich kümmere mich darum und melde mich bis morgen“ – das dauert keine Minute, und die Kunden sind schon viel ruhiger.' },
            { s: 'm', t: 'Aber bei zweihundert Mails am Tag?' },
            { s: 'f2', t: 'Dann sind es zweihundert Minuten. Und dafür bekommen wir viel weniger Nachfragen, wo denn die Antwort bleibt.' }
          ] },
          { h: 'Gespräch 4 – auf der Krankenhausstation', lines: [
            { s: 'f', t: 'Sag mal, Lea, warum machst du die Übergabe eigentlich immer im Zimmer und nicht im Stationszimmer wie alle anderen?' },
            { s: 'f2', t: 'Weil der Patient dann dabei ist. Der hört, was wir besprechen, und kann gleich sagen: „Nein, die Schmerzen sind eher schlimmer geworden“ oder „Ich hab heute noch nichts getrunken“. Das wissen wir sonst oft gar nicht.' },
            { s: 'f', t: 'Und was ist mit dem Datenschutz? Im Zimmer liegen doch oft zwei Leute.' },
            { s: 'f2', t: 'Klar, heikle Sachen bespreche ich draußen. Aber das meiste ist ja nicht geheim. Und die Patienten fühlen sich ernst genommen. Die wissen dann auch, wer in der nächsten Schicht für sie zuständig ist.' },
            { s: 'f', t: 'Hm, das probier ich morgen früh mal aus.' }
          ] }
        ],
        opts: ['a) Eine Weiterbildung lohnt sich für den Betrieb, auch wenn sie zuerst viel kostet.', 'b) Wer Überstunden macht, sollte dafür freie Tage bekommen.', 'c) Die Übergabe zwischen zwei Schichten sollte direkt beim Patienten stattfinden.', 'd) Lebensmittel kurz vor dem Ablaufdatum sollte man günstiger verkaufen, statt sie wegzuwerfen.', 'e) Eine kurze persönliche Antwort ist besser als eine automatische Nachricht.', 'f) Manche Aufgaben sollte man an externe Firmen abgeben.'],
        items: [
          { au: 0, q: 'Gespräch 1: Welcher Satz passt?', a: 3, why: 'Frau Petrova: „Kleb einen roten Aufkleber drauf, minus fünfzig Prozent … immer noch mehr, als wenn alles in der Tonne landet.“' },
          { au: 1, q: 'Gespräch 2: Welcher Satz passt?', a: 0, why: 'Der Mitarbeiter: Mit dem Zertifikat kann der Betrieb Aufträge annehmen – „Nach zwei, drei Anlagen hat sich der Kurs bezahlt gemacht.“' },
          { au: 2, q: 'Gespräch 3: Welcher Satz passt?', a: 4, why: 'Die Kollegin: „Zwei, drei persönliche Sätze mit Namen … das dauert keine Minute“ – statt automatischer Antwort.' },
          { au: 3, q: 'Gespräch 4: Welcher Satz passt?', a: 2, why: 'Lea macht die Übergabe „im Zimmer“, weil „der Patient dann dabei ist“.' }
        ] },
      { title: 'Hören Teil 3: Unternehmensinformationen', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören eine Präsentation am ersten Arbeitstag neuer Mitarbeiterinnen und Mitarbeiter. Welche Lösung (a, b oder c) ist richtig? Sie hören die Präsentation einmal.',
        audio: [{ h: 'Begrüßung im Klinikum Westfalen', lines: [
          { s: 'f', t: 'Guten Morgen und herzlich willkommen im Klinikum Westfalen! Mein Name ist Dr. Annette Schumann, ich bin die Pflegedirektorin. Unser Haus wurde vor über hundert Jahren als kleines Krankenhaus der Stadt gegründet. Heute haben wir fünfhundert Betten, vierzehn Fachabteilungen und über zweitausend Beschäftigte aus mehr als vierzig Ländern.' },
          { s: 'f', t: 'In Ihrer ersten Woche lernen Sie das Haus kennen. Heute bekommen Sie Ihren Mitarbeiterausweis – damit öffnen Sie die Türen und bezahlen in der Kantine. Bitte tragen Sie ihn immer sichtbar. Die Arbeitskleidung holen Sie bitte heute noch in der Wäscherei im Untergeschoss ab, sie hat nur bis vierzehn Uhr geöffnet.' },
          { s: 'f', t: 'Ganz wichtig: Am Mittwoch findet die Hygieneschulung statt. Ohne diese Schulung dürfen Sie nicht auf den Stationen arbeiten, auch nicht zum Zuschauen. Die Schulung dauert drei Stunden und beginnt um acht Uhr im Hörsaal.' },
          { s: 'f', t: 'Jede neue Kollegin und jeder neue Kollege bekommt für die ersten drei Monate eine Mentorin oder einen Mentor. Mit ihnen planen Sie auch Ihre Fortbildungen. Unser Haus bezahlt jedem Beschäftigten pro Jahr bis zu fünf Fortbildungstage.' },
          { s: 'f', t: 'Und zum Schluss noch etwas Schönes: Jeden ersten Freitag im Monat gibt es um sechzehn Uhr ein Treffen für neue Mitarbeitende in der Cafeteria. Da können Sie Fragen stellen und Kolleginnen und Kollegen aus anderen Abteilungen kennenlernen.' }
        ] }],
        items: [
          { q: '1. Wofür braucht man den Mitarbeiterausweis?', opts: ['a) Nur für die Zeiterfassung.', 'b) Für Türen und zum Bezahlen in der Kantine.', 'c) Um Arbeitskleidung zu kaufen.'], a: 1, why: '„… damit öffnen Sie die Türen und bezahlen in der Kantine.“' },
          { q: '2. Was gilt für die Hygieneschulung?', opts: ['a) Ohne sie darf man nicht auf den Stationen arbeiten.', 'b) Man kann sie in den ersten drei Monaten machen.', 'c) Sie ist nur für die Ärztinnen und Ärzte.'], a: 0, why: '„Ohne diese Schulung dürfen Sie nicht auf den Stationen arbeiten“.' },
          { q: '3. Was machen die neuen Mitarbeitenden mit ihrer Mentorin oder ihrem Mentor?', opts: ['a) Sie machen zusammen die Hygieneschulung.', 'b) Sie holen die Arbeitskleidung ab.', 'c) Sie planen ihre Fortbildungen.'], a: 2, why: '„Mit ihnen planen Sie auch Ihre Fortbildungen.“' },
          { q: '4. Was findet jeden ersten Freitag im Monat statt?', opts: ['a) Eine Fortbildung im Hörsaal.', 'b) Die Ausgabe der Arbeitskleidung.', 'c) Ein Treffen für neue Mitarbeitende.'], a: 2, why: '„… ein Treffen für neue Mitarbeitende in der Cafeteria.“' }
        ] },
      { title: 'Hören Teil 4: Anliegen am Telefon', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören fünf Nachrichten auf dem Anrufbeantworter. Welche Lösung (a, b oder c) ist richtig? Sie hören jede Nachricht einmal.',
        audio: [
          { h: 'Nachricht 1', lines: [{ s: 'm', t: 'Guten Tag, hier spricht Wolfgang Richter von der Firma Richter Haustechnik. Sie haben bei uns eine Wärmepumpe bestellt. Der Liefertermin im November verschiebt sich leider um drei Wochen, weil ein Bauteil beim Hersteller fehlt. Wenn Sie möchten, können wir Ihnen in der Zwischenzeit kostenlos ein mobiles Heizgerät bringen. Rufen Sie mich bitte zurück, ob Sie das brauchen.' }] },
          { h: 'Nachricht 2', lines: [{ s: 'f', t: 'Hallo, hier ist Nicole Brandt aus der Personalabteilung. Ihr Antrag auf Teilzeit ab Februar ist genehmigt. Für den neuen Vertrag brauche ich aber noch Ihre Wunschverteilung der Stunden auf die Wochentage. Schicken Sie mir die bitte bis Ende nächster Woche per E-Mail, dann kann ich den Vertrag vorbereiten.' }] },
          { h: 'Nachricht 3', lines: [{ s: 'm', t: 'Ja, guten Morgen, Krämer hier, Hausverwaltung Krämer. In Ihrem Bürogebäude wird am Samstag von acht bis sechzehn Uhr der Strom abgeschaltet, wegen Arbeiten am Hauptverteiler. Bitte fahren Sie Ihre Server vorher herunter. Die Aufzüge funktionieren in dieser Zeit auch nicht.' }] },
          { h: 'Nachricht 4', lines: [{ s: 'f', t: 'Guten Tag, Simone Hartmann vom Kundenservice der Lufthansa. Ihr Flug nach Lissabon am Montag fällt leider aus. Wir haben Sie automatisch auf den Flug am Dienstag um sieben Uhr fünfzehn umgebucht. Wenn Sie lieber mit der Bahn fahren oder den Flug stornieren möchten, können Sie das kostenlos in der App machen.' }] },
          { h: 'Nachricht 5', lines: [{ s: 'm', t: 'Hallo, hier ist Jonas vom Betriebsrat. Die Betriebsversammlung ist nicht wie geplant am Donnerstag, sondern schon am Mittwoch um vierzehn Uhr, in der Kantine. Bitte gib das auch an dein Team weiter, die Einladung per Mail kommt erst morgen.' }] }
        ],
        items: [
          { au: 0, q: '1. Was bietet die Firma Richter an?', opts: ['a) Einen Rabatt auf die Wärmepumpe.', 'b) Ein mobiles Heizgerät für die Wartezeit.', 'c) Eine schnellere Lieferung gegen Aufpreis.'], a: 1, why: '„… können wir Ihnen in der Zwischenzeit kostenlos ein mobiles Heizgerät bringen.“' },
          { au: 1, q: '2. Was soll der Mitarbeiter bis Ende nächster Woche schicken?', opts: ['a) Einen neuen Antrag auf Teilzeit.', 'b) Den unterschriebenen Vertrag.', 'c) Die gewünschte Verteilung der Arbeitsstunden.'], a: 2, why: '„… brauche ich aber noch Ihre Wunschverteilung der Stunden auf die Wochentage.“' },
          { au: 2, q: '3. Was soll man vor Samstag tun?', opts: ['a) Die Server herunterfahren.', 'b) Den Aufzug reparieren lassen.', 'c) Die Hausverwaltung anrufen.'], a: 0, why: '„Bitte fahren Sie Ihre Server vorher herunter.“' },
          { au: 3, q: '4. Was ist mit dem Flug nach Lissabon?', opts: ['a) Er startet am Montag später.', 'b) Der Kunde wurde auf einen Flug am Dienstag umgebucht.', 'c) Der Kunde muss den Flug selbst neu buchen.'], a: 1, why: '„Wir haben Sie automatisch auf den Flug am Dienstag … umgebucht.“' },
          { au: 4, q: '5. Wann ist die Betriebsversammlung?', opts: ['a) Am Donnerstag um 14 Uhr.', 'b) Morgen per E-Mail.', 'c) Am Mittwoch um 14 Uhr.'], a: 2, why: '„… nicht wie geplant am Donnerstag, sondern schon am Mittwoch um vierzehn Uhr“.' }
        ] }
    ] },
    { id: 'hoeren-schreiben', title: 'Hören und Schreiben', minutes: 5, note: 'Du hörst einen Anruf einmal. Löse Aufgabe 1 und schreib dann eine Telefonnotiz für deinen Kollegen. Mach dir schon beim Hören Notizen.', parts: [
      { title: 'Hören und Schreiben Teil 1: Anruf einer Kundin', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie arbeiten bei der Firma MediTech Service in Bochum. Sie hören eine Nachricht auf der Mailbox. Welche Lösung (a, b oder c) ist richtig? Sie hören die Nachricht einmal.',
        audio: [{ h: 'Mailbox – MediTech Service', lines: MAILBOX }],
        items: [{ au: 0, q: 'Was möchte Frau Vogel?', opts: ['a) die Wartung absagen, weil die Betten neu sind', 'b) den Wartungstermin verschieben und mehr Betten prüfen lassen', 'c) neue Fernbedienungen für alle Betten bestellen'], a: 1, why: 'Sie möchte Donnerstag statt Dienstag und 26 statt 24 Betten prüfen lassen.' }] },
      { kind: 'write', title: 'Hören und Schreiben Teil 2: Telefonnotiz', skill: 'schreiben', pts: 6, plays: 1,
        instr: 'Schreiben Sie für Ihren Kollegen Herrn Albers eine Telefonnotiz zu diesem Anruf. Notieren Sie alle wichtigen Informationen. Stichpunkte sind erlaubt, die Notiz muss aber für Herrn Albers ohne Rückfrage verständlich sein. In der Prüfung hören Sie die Nachricht nur einmal (für beide Aufgaben) – hier können Sie sie zur Übung noch einmal abspielen.',
        audio: [{ h: 'Mailbox – MediTech Service (Wiederholung)', lines: MAILBOX }],
        options: [{ h: 'Telefonnotiz', situation: 'Herr Albers plant bei MediTech Service die Wartungstermine der Techniker.', task: 'Schreiben Sie eine Telefonnotiz für Herrn Albers mit allen wichtigen Informationen.',
          points: ['Anruferin und Einrichtung', 'Rückrufnummer', 'Anliegen (was soll sich ändern?)', 'Details: neuer Termin, Anzahl Betten, Problem mit Fernbedienungen', 'Was Herr Albers tun soll (inkl. Frist)'],
          muster: 'Telefonnotiz für Herrn Albers – Mailbox\n\nAnruferin: Katrin Vogel, Pflegedienstleitung, Seniorenzentrum Lindenhof, Recklinghausen\nRückruf: 02361 50 78 12\nAnliegen: Bettenwartung Di, 11. passt nicht (Heimaufsicht kommt) → bitte verschieben auf Do, 13., ab 13 Uhr\nDetails: jetzt 26 statt 24 Betten (2 neue seit Oktober); Station 2: bei 3 Betten Fernbedienung manchmal defekt → Techniker soll prüfen\nTo do: neuen Termin bis Freitag bestätigen (Frau Vogel muss Dienstpläne anpassen)' }],
        minWords: 20,
        check: ['Name, Funktion und Einrichtung der Anruferin', 'Rückrufnummer vollständig und richtig', 'Grund für die Verschiebung und neuer Termin mit Uhrzeit', 'Neue Anzahl der Betten (26)', 'Problem mit den Fernbedienungen auf Station 2', 'Aufgabe mit Frist (bis Freitag bestätigen)'] }
    ] },
    { id: 'sprachbausteine', title: 'Sprachbausteine und Schreiben', minutes: 35, note: 'Löse die Sprachbausteine zügig (ca. 10 Minuten) und nutze die restliche Zeit für den Forumsbeitrag.', parts: [
      { title: 'Sprachbausteine Teil 1', skill: 'schreiben', pts: 0.5,
        instr: 'Lesen Sie die Mitarbeiterinformation. Welches Wort (a–j) passt in die Lücken 1–6? Jedes Wort können Sie nur einmal verwenden. Vier Wörter bleiben übrig.',
        opts: ['a) aufgrund', 'b) damit', 'c) falls', 'd) jedoch', 'e) nachdem', 'f) ohne', 'g) seit', 'h) trotz', 'i) zwar', 'j) zwischen'],
        material: [{ h: 'Mitarbeiterinformation – Sparkasse Mittelrhein', t: 'Liebe Kolleginnen und Kollegen,\n\n{1} der positiven Erfahrungen in der Filiale Koblenz führen wir das mobile Arbeiten ab Januar in allen Filialen ein. Mitarbeitende im Backoffice können künftig bis zu zwei Tage pro Woche von zu Hause arbeiten, {2} die Arbeit im Team darunter leidet.\n\nBitte stimmen Sie Ihre Homeoffice-Tage mit Ihrer Teamleitung ab, {3} an jedem Tag genug Kolleginnen und Kollegen vor Ort sind. Die Kundenberatung ist von der Regelung {4} ausgenommen, da hier der persönliche Kontakt im Vordergrund steht.\n\n{5} Sie im Homeoffice technische Probleme haben, wenden Sie sich bitte an die IT-Hotline. Einen dienstlichen Laptop erhalten alle, {6} sie die Schulung „Sicher arbeiten von zu Hause“ abgeschlossen haben.\n\nIhr Personalmanagement' }],
        items: [
          { q: '', a: 0, why: '„Aufgrund der positiven Erfahrungen“ – Grund, Präposition mit Genitiv.' },
          { q: '', a: 5, why: '„ohne dass die Arbeit im Team darunter leidet“ – hier passt nur „ohne“ (ohne dass).' },
          { q: '', a: 1, why: 'Ziel/Zweck mit Verb am Ende: „damit an jedem Tag genug Kolleginnen und Kollegen vor Ort sind“.' },
          { q: '', a: 3, why: '„… ist von der Regelung jedoch ausgenommen“ – Gegensatz zur vorherigen Aussage.' },
          { q: '', a: 2, why: 'Bedingung: „Falls Sie im Homeoffice technische Probleme haben, …“.' },
          { q: '', a: 4, why: 'Zeitliche Reihenfolge: erst die Schulung, dann der Laptop – „nachdem sie … abgeschlossen haben“.' }
        ] },
      { title: 'Sprachbausteine Teil 2', skill: 'schreiben', pts: 0.5,
        instr: 'Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 1–6?',
        material: [{ h: 'E-Mail an einen Kunden', t: 'Betreff: Ihre Anfrage zur Lagerfläche\n\nSehr geehrter Herr Okonkwo,\n\nvielen Dank für Ihr Interesse {1} unseren Lagerflächen in Duisburg. Gern beantworte ich Ihre Fragen.\n\nDie Halle 3 steht Ihnen ab dem 1. März zur Verfügung. Sie ist 1.200 Quadratmeter groß und {2} über eine eigene Laderampe. Die Miete richtet sich {3} der Dauer des Vertrags: Bei einer Laufzeit von mindestens zwei Jahren erhalten Sie einen Rabatt von fünf Prozent.\n\nGern zeige ich Ihnen die Halle persönlich. {4} Ihnen ein Termin in der nächsten Woche? Bitte geben Sie mir Bescheid, an welchem Tag Sie Zeit {5}.\n\nFür weitere Fragen stehe ich Ihnen jederzeit {6} Verfügung.\n\nMit freundlichen Grüßen\nAndrea Kaltenbach' }],
        items: [
          { q: '', opts: ['a) an', 'b) für', 'c) über'], a: 0, why: '„Interesse an + Dativ“: Interesse an unseren Lagerflächen.' },
          { q: '', opts: ['a) hat', 'b) verfügt', 'c) besteht'], a: 1, why: 'Feste Verbindung: „über etwas verfügen“.' },
          { q: '', opts: ['a) auf', 'b) mit', 'c) nach'], a: 2, why: '„sich richten nach“: Die Miete richtet sich nach der Dauer.' },
          { q: '', opts: ['a) Passt', 'b) Gefällt', 'c) Steht'], a: 0, why: '„Passt Ihnen ein Termin …?“ = Ist der Termin möglich?' },
          { q: '', opts: ['a) hätten', 'b) haben', 'c) hatten'], a: 0, why: 'Höfliche indirekte Bitte, Konjunktiv II: „an welchem Tag Sie Zeit hätten“.' },
          { q: '', opts: ['a) in', 'b) zur', 'c) bei'], a: 1, why: 'Feste Wendung: „zur Verfügung stehen“.' }
        ] },
      { kind: 'write', title: 'Schreiben: Beitrag im Mitarbeiterforum', skill: 'schreiben', pts: 32,
        instr: 'Im Intranet Ihrer Firma gibt es ein Mitarbeiterforum. Wählen Sie eines der beiden Themen und schreiben Sie einen Beitrag. Äußern Sie Ihre Meinung, begründen Sie sie und nennen Sie Beispiele aus Ihrer Erfahrung. Richtwert: ca. 150 Wörter (der offizielle Modelltest gibt keine Wortzahl vor).',
        options: [
          { h: 'Thema A: Feste Schreibtische abschaffen?', situation: 'Weil viele Mitarbeitende teilweise im Homeoffice arbeiten, möchte die Geschäftsleitung feste Arbeitsplätze abschaffen. Jeden Morgen bucht man über eine App einen freien Schreibtisch („Desk-Sharing“). Im Forum wird diskutiert.', task: 'Schreiben Sie einen Beitrag zum Thema Desk-Sharing.',
            points: ['Ihre Meinung zum Desk-Sharing', 'Vorteile und Nachteile', 'Beispiele aus Ihrem Arbeitsalltag oder Ihrem Umfeld', 'ein Vorschlag, wie man die Einführung verbessern könnte'],
            muster: 'Liebe Kolleginnen und Kollegen,\n\nich habe die Diskussion zum Desk-Sharing mit großem Interesse verfolgt und möchte gern meine Sicht ergänzen.\n\nGrundsätzlich verstehe ich die Idee: Da viele von uns zwei oder drei Tage im Homeoffice arbeiten, stehen viele Schreibtische leer. Mit Desk-Sharing könnte die Firma Fläche und Energie sparen. Außerdem würde man öfter neben Kolleginnen und Kollegen aus anderen Teams sitzen, was den Austausch fördern kann.\n\nAllerdings sehe ich auch deutliche Nachteile. In meiner früheren Firma gab es Desk-Sharing, und morgens wurde viel Zeit mit der Suche nach einem Platz verschwendet. Wer früh kam, hatte die besten Plätze am Fenster, wer später kam – oft Eltern –, saß am Gang. Zudem fehlt vielen ein Platz für persönliche Dinge und Unterlagen.\n\nMein Vorschlag wäre daher, Desk-Sharing zunächst in einer Abteilung zu testen und feste Zonen für Teams einzurichten. Jede und jeder sollte außerdem einen eigenen Schrank bekommen. Nach drei Monaten könnten wir gemeinsam auswerten, ob das Modell funktioniert.\n\nViele Grüße\nAylin Demir, Buchhaltung' },
          { h: 'Thema B: Weiterbildung in der Freizeit?', situation: 'Die Firma bietet ab nächstem Jahr viele neue Online-Kurse an. Die Kurse sind kostenlos, sollen aber in der Freizeit gemacht werden. Im Forum wird diskutiert, ob das fair ist.', task: 'Schreiben Sie einen Beitrag zum Thema Weiterbildung in der Freizeit.',
            points: ['Ihre Meinung zu Weiterbildung in der Freizeit', 'Gründe dafür und dagegen', 'Beispiele aus Ihrem Arbeitsalltag', 'ein Vorschlag, wie man das Angebot gestalten könnte'],
            muster: 'Hallo zusammen,\n\nich finde es grundsätzlich sehr gut, dass unsere Firma so viele neue Online-Kurse anbietet. Weiterbildung ist wichtig, gerade weil sich unsere Arbeit durch die Digitalisierung schnell verändert.\n\nDass die Kurse kostenlos sind, ist ein klarer Vorteil. Viele Kurse würden sonst mehrere Hundert Euro kosten. Außerdem kann man online lernen, wann man möchte – zum Beispiel abends, wenn die Kinder schlafen.\n\nTrotzdem halte ich es nicht für fair, dass die Kurse komplett in der Freizeit stattfinden sollen. Am Ende profitiert ja auch die Firma davon, wenn wir besser qualifiziert sind. Ich selbst habe letztes Jahr einen Excel-Kurs am Wochenende gemacht und war danach ziemlich erschöpft. Kolleginnen mit Familie oder Pflegeaufgaben haben dafür oft gar keine Zeit.\n\nMein Vorschlag: Die Hälfte der Kurszeit sollte als Arbeitszeit zählen. Kurse, die für unsere tägliche Arbeit Pflicht sind, sollten wir ganz in der Arbeitszeit machen dürfen.\n\nViele Grüße\nMarek Nowak, Vertrieb' }
        ],
        minWords: 150,
        check: ['Passende Anrede und Gruß für das Forum (mit Namen und Abteilung)', 'Eigene Meinung klar formuliert', 'Vorteile und Nachteile bzw. Gründe dafür und dagegen', 'Mindestens ein konkretes Beispiel aus der Erfahrung', 'Eigener Vorschlag', 'Klare Gliederung mit Absätzen und Konnektoren (allerdings, zudem, daher …)', 'Mindestens 150 Wörter'] }
    ] },
    { id: 'sprechen', title: 'Sprechen', minutes: 16, note: 'Paarprüfung ohne Vorbereitungszeit. In Teil 1A und 1B sprichst du allein mit den Prüfenden, in Teil 1C erklärst du einen Aspekt aus dem Beitrag deiner Partnerin oder deines Partners, Teil 2 und 3 sprecht ihr zusammen. Sprich laut – nutze die Muster nach deinem Versuch zum Vergleich.', parts: [
      { kind: 'speak', title: 'Teil 1A: Über ein Thema sprechen', skill: 'sprechen', pts: 10, minutes: 2,
        instr: 'Wählen Sie eines der beiden Themen und sprechen Sie ca. 2 Minuten darüber. Die Prüfenden unterbrechen Sie nicht.',
        task: 'Thema A: Künstliche Intelligenz im Beruf\n• Wo begegnet Ihnen KI bei der Arbeit oder im Alltag?\n• Welche Chancen sehen Sie?\n• Welche Risiken gibt es?\n• Wie sollten sich Beschäftigte vorbereiten?\n\nThema B: Fachkräftemangel\n• In welchen Berufen fehlen Fachkräfte?\n• Was sind die Gründe?\n• Was können Firmen tun?\n• Wie ist die Situation in Ihrem Herkunftsland?',
        prompts: ['Bitte wählen Sie ein Thema und sprechen Sie etwa zwei Minuten darüber.'],
        redemittel: ['Ich habe mich für das Thema … entschieden, weil …', 'In meinem Arbeitsalltag begegnet mir … vor allem bei …', 'Eine große Chance sehe ich darin, dass …', 'Andererseits darf man nicht vergessen, dass …', 'Meiner Ansicht nach sollten Beschäftigte …', 'In meinem Herkunftsland ist die Situation insofern anders, als …', 'Zusammenfassend lässt sich sagen, dass …'],
        muster: 'Ich habe mich für das Thema Künstliche Intelligenz im Beruf entschieden, weil es mich bei der Arbeit jeden Tag betrifft. Ich arbeite im Kundenservice einer Versicherung, und dort beantwortet seit einigen Monaten ein Chatbot einfache Fragen. Eine große Chance sehe ich darin, dass Routineaufgaben schneller erledigt werden und wir mehr Zeit für schwierige Fälle haben. Auch beim Schreiben von E-Mails kann KI helfen, zum Beispiel bei der Formulierung. Andererseits darf man nicht vergessen, dass KI auch Fehler macht und manchmal Dinge erfindet. Außerdem haben viele Kolleginnen und Kollegen Angst, dass ihre Arbeitsplätze wegfallen. Meiner Ansicht nach sollten Beschäftigte deshalb regelmäßig geschult werden, damit sie die Werkzeuge sinnvoll nutzen und die Ergebnisse kritisch prüfen können. Zusammenfassend lässt sich sagen, dass KI eine gute Unterstützung ist, aber den Menschen nicht ersetzen sollte.',
        check: ['Thema klar eingeleitet und begründet', 'Alle vier Leitpunkte angesprochen', 'Eigene Beispiele aus dem Beruf genannt', 'Chancen und Risiken abgewogen', 'Strukturiert mit Konnektoren (andererseits, außerdem, deshalb)', 'Zusammenfassung am Ende'] },
      { kind: 'speak', title: 'Teil 1B und 1C: Prüferfragen und Erläuterung eines Aspekts', skill: 'sprechen', pts: 14, minutes: 2,
        instr: 'Die Prüfenden stellen Ihnen Fragen zu Ihrem Thema. Antworten Sie ausführlich (2–4 Sätze) und begründen Sie Ihre Antworten. (Hier: Fragen zum Thema „Künstliche Intelligenz im Beruf“; zum Thema Fachkräftemangel wären die Fragen ähnlich.)',
        task: 'Beantworten Sie die Nachfragen der Prüfenden zu Ihrem Thema.',
        prompts: ['Wer sollte die Verantwortung tragen, wenn eine KI einen Fehler macht?', 'Würden Sie lieber mit einem Menschen oder mit einem Chatbot über ein Problem mit Ihrer Rechnung sprechen? Warum?', 'Sollten Schulen den Umgang mit KI unterrichten?', 'Welche Berufe werden sich durch KI am stärksten verändern?'],
        redemittel: ['Das ist eine schwierige Frage, aber ich denke, …', 'Ich würde eindeutig … vorziehen, da …', 'Auf jeden Fall, denn …', 'Ich gehe davon aus, dass …', 'Ein Beispiel dafür ist …'],
        muster: '1) Das ist eine schwierige Frage, aber ich denke, am Ende trägt immer die Firma die Verantwortung, die die KI einsetzt. Deshalb muss ein Mensch die wichtigen Entscheidungen prüfen.\n2) Ich würde eindeutig einen Menschen vorziehen, da Probleme mit Rechnungen oft kompliziert sind. Ein Chatbot versteht meine Situation häufig nicht.\n3) Auf jeden Fall, denn Kinder benutzen KI sowieso. Sie sollten lernen, Ergebnisse zu prüfen und Quellen zu vergleichen.\n4) Ich gehe davon aus, dass sich vor allem Büroberufe verändern, zum Beispiel in der Buchhaltung oder im Kundenservice. Handwerksberufe werden dagegen wohl noch lange gebraucht.',
        check: ['Jede Frage direkt beantwortet', 'Jede Antwort begründet', 'Ausführlich (2–4 Sätze) und mit Beispielen', 'Abwechslungsreiche Redemittel statt immer „Ich denke“'] },
      { kind: 'speak', title: 'Teil 2: Mit Kolleginnen und Kollegen sprechen', skill: 'sprechen', pts: 16, minutes: 3,
        instr: 'Sie sprechen mit einer Kollegin / einem Kollegen in der Pause. Sie arbeiten beide in einem Krankenhaus. Reagieren Sie auf die Fragen, erzählen Sie von Ihren Erfahrungen und geben Sie Tipps. Fragen Sie auch nach.',
        task: 'Ihre Kollegin oder Ihr Kollege soll nächste Woche zum ersten Mal ein Gespräch mit Angehörigen eines Patienten führen, die sehr unzufrieden sind. Sie haben damit schon Erfahrung.\n\n• Wie bereitet man sich auf das Gespräch vor?\n• Wie reagiert man, wenn die Angehörigen laut werden?\n• Was darf man versprechen, was nicht?\n• Wen kann man um Hilfe bitten?',
        prompts: ['Du, ich habe nächste Woche ein Gespräch mit Angehörigen, die sich beschweren wollen. Hast du so etwas schon mal gemacht?', 'Wie bereitest du dich auf so ein Gespräch vor?', 'Und was machst du, wenn die Angehörigen laut werden?', 'Was darf ich ihnen versprechen?', 'Und wenn ich gar nicht weiterweiß?'],
        redemittel: ['Ja, das kenne ich gut. Beim ersten Mal …', 'Ich würde dir raten, …', 'Was mir immer hilft, ist …', 'Auf keinen Fall solltest du …', 'Wie ist das denn bei euch auf der Station?', 'Mach dir keine Sorgen, …'],
        muster: 'A: Du, ich habe nächste Woche ein Gespräch mit Angehörigen, die sich beschweren wollen. Hast du so etwas schon mal gemacht?\nB: Ja, das kenne ich gut. Beim ersten Mal war ich auch sehr nervös. Ich würde dir raten, vorher die Patientenakte genau zu lesen und dir Notizen zu machen.\nA: Und wenn sie laut werden?\nB: Was mir immer hilft, ist ruhig zu bleiben und erst einmal zuzuhören. Oft wollen die Angehörigen nur, dass jemand ihre Sorgen ernst nimmt. Auf keinen Fall solltest du dich verteidigen oder Kollegen beschuldigen.\nA: Was darf ich ihnen denn versprechen?\nB: Nur das, was du sicher halten kannst – zum Beispiel, dass du mit dem Arzt sprichst. Medizinische Fragen beantwortet aber immer der Arzt.\nA: Und wenn ich gar nicht weiterweiß?\nB: Dann sag ehrlich, dass du das klären musst, und hol die Stationsleitung dazu. Wie ist das denn bei euch, gibt es da einen festen Ansprechpartner?\nA: Ja, Frau Weber. Gut, dann spreche ich vorher mit ihr. Danke dir!',
        check: ['Auf alle Fragen eingegangen', 'Von eigenen Erfahrungen erzählt', 'Konkrete Tipps gegeben', 'Selbst nachgefragt', 'Kollegialer, passender Ton (du-Form)'] },
      { kind: 'speak', title: 'Teil 3: Lösungswege diskutieren', skill: 'sprechen', pts: 20, minutes: 5,
        instr: 'Sie arbeiten mit Ihrer Partnerin / Ihrem Partner im selben Team. Es gibt ein Problem. Sammeln Sie Vorschläge, diskutieren Sie Vor- und Nachteile und einigen Sie sich auf eine Lösung.',
        task: 'Situation: Sie arbeiten in einer Spedition in der Disposition. In letzter Zeit kündigen viele Fahrerinnen und Fahrer, und es ist schwer, neue zu finden. Die Geschäftsleitung bittet Ihr Team um Vorschläge.\n\nMögliche Ideen: höhere Löhne · planbare Touren und mehr Zeit zu Hause · moderne Fahrzeuge · Ausbildung im eigenen Betrieb · Prämie für Empfehlungen · ?',
        prompts: ['Beginnen Sie bitte. Was könnte die Firma Ihrer Meinung nach tun?', 'Was halten Sie von höheren Löhnen?', 'Wäre eine eigene Ausbildung eine Lösung?', 'Welche Nachteile sehen Sie bei diesem Vorschlag?', 'Worauf können Sie sich einigen?'],
        redemittel: ['Ich würde vorschlagen, dass wir …', 'Das wäre eine Möglichkeit, allerdings …', 'Ein Vorteil wäre, dass …', 'Ich bin mir nicht sicher, ob das realistisch ist, weil …', 'Da stimme ich Ihnen zu.', 'Wie wäre es mit einem Kompromiss: …', 'Dann halten wir fest: …'],
        muster: 'A: Ich würde vorschlagen, dass wir zuerst die Touren besser planen. Viele Fahrer kündigen, weil sie zu selten zu Hause sind.\nB: Das wäre eine Möglichkeit, allerdings haben wir viele Kunden im Ausland. Da sind lange Touren kaum zu vermeiden.\nA: Stimmt. Aber wir könnten feste Touren für Fahrerinnen und Fahrer mit Familie anbieten, zum Beispiel nur regionale Strecken.\nB: Gute Idee. Und was halten Sie von höheren Löhnen?\nA: Ein Vorteil wäre, dass wir attraktiver als die Konkurrenz sind. Ich bin mir aber nicht sicher, ob die Geschäftsleitung das bezahlen kann.\nB: Dann vielleicht eine Prämie, wenn jemand einen neuen Fahrer empfiehlt? Das kostet weniger.\nA: Da stimme ich Ihnen zu. Langfristig sollten wir aber auch selbst ausbilden, zum Beispiel Menschen aus Integrationskursen.\nB: Das dauert zwar, aber dann bleiben die Leute oft länger im Betrieb.\nA: Wie wäre es mit einem Kompromiss: kurzfristig Empfehlungsprämie und planbare regionale Touren, langfristig eine eigene Ausbildung?\nB: Einverstanden. Dann halten wir fest: Prämie, feste Touren für Familien und ab nächstem Jahr zwei Ausbildungsplätze.',
        check: ['Eigene Vorschläge gemacht', 'Vor- und Nachteile abgewogen', 'Auf die Partnerin / den Partner eingegangen', 'Höflich widersprochen', 'Gemeinsame Lösung zusammengefasst'] }
    ] }
  ]
};
})();
