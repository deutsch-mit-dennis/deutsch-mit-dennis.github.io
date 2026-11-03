/* DTB B1 – Modelltest 3. Eigene Übungsaufgaben im Stil der Prüfung (Format: tools/sim/SCHEMA.md). */
(() => {
const CALL = [
  { s: 'm', t: 'Hotel Am Stadtpark, Hauswirtschaft, Kovačević, guten Tag.' },
  { s: 'f', t: 'Guten Tag, hier ist Brandt von der Firma Textilpflege Rhein-Ruhr. Ich hätte gern Frau Hoffmann gesprochen, es geht um die Wäschelieferung.' },
  { s: 'm', t: 'Frau Hoffmann ist heute leider nicht im Haus. Kann ich ihr etwas ausrichten?' },
  { s: 'f', t: 'Ja, gern. Also, unser Lieferwagen ist kaputt. Deshalb können wir die saubere Bettwäsche nicht wie geplant am Donnerstag bringen, sondern erst am Freitag, und zwar am Vormittag, so gegen zehn Uhr.' },
  { s: 'm', t: 'Freitag statt Donnerstag, gegen zehn Uhr. Das wird knapp, am Freitag kommt eine große Reisegruppe.' },
  { s: 'f', t: 'Das verstehe ich. Wir können Ihnen aber heute noch fünfzig Sets Bettwäsche als Notlieferung mit einem Kurier schicken. Die kommen dann bis achtzehn Uhr.' },
  { s: 'm', t: 'Fünfzig Sets heute bis achtzehn Uhr, okay. Kostet der Kurier extra?' },
  { s: 'f', t: 'Nein, die Kosten übernehmen natürlich wir. Frau Hoffmann soll mir aber bitte bis morgen früh sagen, ob das reicht oder ob sie mehr braucht.' },
  { s: 'm', t: 'Gut. Unter welcher Nummer erreicht sie Sie?' },
  { s: 'f', t: 'Unter null zwei null eins, acht vier, sieben drei, fünfzehn. Ich wiederhole: null zwei null eins, acht vier, sieben drei, eins fünf. Und mein Name ist Brandt, mit d am Ende.' },
  { s: 'm', t: 'Alles klar, Frau Brandt, ich lege ihr die Nachricht auf den Schreibtisch.' },
  { s: 'f', t: 'Vielen Dank, und entschuldigen Sie die Umstände. Auf Wiederhören!' }
];
(window.SIM = window.SIM || {})['dtb-b1-3'] = {
  id: 'dtb-b1-3', title: 'DTB B1 – Deutsch-Test für den Beruf (Modelltest 3)', short: 'DTB B1 · Test 3', provider: 'telc', level: 'B1',
  intro: 'Der dritte komplette Übungstest für den DTB B1 – mit neuen Situationen aus Logistik, Hotel, Einzelhandel, Kita, IT-Support und Bau.',
  rule: 'dtb',
  skills: { lesen: { label: 'Lesen', max: 60 }, hoeren: { label: 'Hören', max: 60 }, schreiben: { label: 'Schreiben', max: 60 }, sprechen: { label: 'Sprechen', max: 60 } },
  sections: [
    { id: 'lesen', title: 'Lesen', minutes: 40, note: 'Vier Teile. Arbeite zügig – pro Teil ca. 10 Minuten.', parts: [
      { title: 'Lesen Teil 1: Stellenanzeigen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? Jede Anzeige können Sie nur einmal verwenden. Für eine Person gibt es keine passende Anzeige. Markieren Sie dann x.',
        material: [
          { h: 'a) Logistikzentrum Nord, Dortmund', t: 'Kommissionierer/innen (m/w/d) im Dreischichtbetrieb. Schichtzulage, kostenloser Werksbus ab Hauptbahnhof. Staplerschein von Vorteil, aber keine Voraussetzung.' },
          { h: 'b) Supermarkt FrischMarkt', t: 'Mitarbeiter/in für die Frischetheke (Käse, Wurst), 25 Std./Woche, Mo–Fr 7–12 Uhr. Wir schulen Sie ein. Gesundheitszeugnis bringen wir gemeinsam auf den Weg.' },
          { h: 'c) Kita Sonnenschein', t: 'Wir suchen eine pädagogische Ergänzungskraft (m/w/d) mit Deutsch ab B1. Berufsbegleitende Ausbildung zur Kinderpflegerin/zum Kinderpfleger möglich – wir bezahlen die Schule.' },
          { h: 'd) IT-Service Weber', t: 'Mitarbeiter/in im telefonischen Support. Sie helfen Kunden bei Problemen mit Computern und Druckern. Homeoffice an zwei Tagen pro Woche. Sehr gute Deutschkenntnisse (mindestens C1) erforderlich.' },
          { h: 'e) Bauunternehmen Steinmann', t: 'Bauhelfer/innen für Baustellen in der Region. Arbeitsbeginn 6:30 Uhr, Fahrt zur Baustelle ab Betriebshof mit dem Firmenbus. Körperliche Fitness wichtig.' },
          { h: 'f) Hotel Am Stadtpark', t: 'Zimmermädchen/Roomboy (m/w/d) in Teilzeit, auch nur am Wochenende möglich. Arbeitszeit 9–14 Uhr. Kein Deutschzertifikat nötig, Freundlichkeit ist uns wichtiger.' },
          { h: 'g) Fahrradladen Speiche', t: 'Zweiradmechaniker/in oder Quereinsteiger mit technischem Geschick. Vollzeit, Di–Sa. Wir bieten ein Dienstrad und eine Einarbeitung in der Werkstatt.' },
          { h: 'h) Apotheke am Markt', t: 'Pharmazeutisch-technische/r Assistent/in (PTA) mit deutscher Anerkennung. Teilzeit oder Vollzeit, jeder zweite Samstag frei.' }
        ],
        opts: ['a) Logistikzentrum Nord', 'b) Supermarkt FrischMarkt', 'c) Kita Sonnenschein', 'd) IT-Service Weber', 'e) Bauunternehmen Steinmann', 'f) Hotel Am Stadtpark', 'g) Fahrradladen Speiche', 'h) Apotheke am Markt', 'x) keine passende Anzeige'],
        items: [
          { q: '1. Oleksandr repariert in seiner Freizeit gern Fahrräder. Er hat keine Ausbildung als Mechaniker, möchte aber in diesem Bereich arbeiten.', a: 6, why: 'Fahrradladen Speiche sucht auch „Quereinsteiger mit technischem Geschick“.' },
          { q: '2. Leyla arbeitet unter der Woche in einer Bäckerei und sucht einen zweiten Job nur für Samstag und Sonntag.', a: 5, why: 'Hotel Am Stadtpark: Teilzeit „auch nur am Wochenende möglich“.' },
          { q: '3. Pedro hat kein Auto. Er möchte im Lager arbeiten und hat nichts gegen Nachtschichten.', a: 0, why: 'Logistikzentrum: Dreischichtbetrieb und kostenloser Werksbus ab Hauptbahnhof.' },
          { q: '4. Ngozi hat in Nigeria als Apothekenassistentin gearbeitet. Ihr Abschluss ist in Deutschland noch nicht anerkannt. Sie spricht gut Deutsch (B2) und sucht eine Stelle im Büro am Telefon.', a: 8, why: 'Die Apotheke verlangt die deutsche Anerkennung, der IT-Support Deutsch C1 – keine Anzeige passt → x.' },
          { q: '5. Hanna möchte gern mit Kindern arbeiten. Sie hat Deutsch B1 und möchte neben der Arbeit eine Ausbildung machen.', a: 2, why: 'Kita Sonnenschein: Deutsch ab B1, „berufsbegleitende Ausbildung … möglich“.' }
        ] },
      { title: 'Lesen Teil 2: Informationen zu Leistungen für Mitarbeitende', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie den Text und die Aufgaben 6–9. Welche Antwort (a, b oder c) passt am besten?',
        material: [{ h: 'Logistikzentrum Nord – Unsere Angebote für Mitarbeitende', t: '1. Jobticket\nAlle Mitarbeitenden können ein Deutschlandticket für 19 Euro im Monat bekommen, der Betrieb zahlt den Rest. Den Antrag stellen Sie im Personalbüro. Das Ticket gilt ab dem Monat nach dem Antrag.\n\n2. Betriebliche Altersvorsorge\nNach sechs Monaten im Betrieb können Sie einen Teil Ihres Lohns für die Rente sparen. Der Betrieb legt pro Monat 30 Euro dazu. Eine Beraterin der Versicherung ist jeden letzten Mittwoch im Monat von 12 bis 15 Uhr in der Kantine.\n\n3. Sprachkurs Deutsch für den Beruf\nDienstags und donnerstags nach der Frühschicht, 14:30–16:00 Uhr, im Schulungsraum. Der Kurs ist kostenlos. Die Hälfte der Kurszeit zählt als Arbeitszeit. Anmeldung bei Ihrer Schichtleitung.\n\n4. Fit am Arbeitsplatz\nEine Physiotherapeutin zeigt einmal im Monat Übungen für den Rücken. Die Teilnahme ist freiwillig. Wer an fünf Terminen teilgenommen hat, bekommt einen Gutschein für das Fitnessstudio „Kraftwerk“.' }],
        items: [
          { q: '6. Das Jobticket …', opts: ['a) bezahlt der Betrieb komplett.', 'b) kann man sofort nach dem Antrag benutzen.', 'c) beantragt man im Personalbüro.'], a: 2, why: '„Den Antrag stellen Sie im Personalbüro.“ Man zahlt 19 Euro, und es gilt erst ab dem nächsten Monat.' },
          { q: '7. Bei der Altersvorsorge …', opts: ['a) kann man schon in der ersten Woche mitmachen.', 'b) kommt die Beraterin jeden Mittwoch.', 'c) gibt der Betrieb jeden Monat Geld dazu.'], a: 2, why: '„Der Betrieb legt pro Monat 30 Euro dazu.“ Mitmachen erst nach sechs Monaten, Beratung nur am letzten Mittwoch im Monat.' },
          { q: '8. Der Sprachkurs …', opts: ['a) findet vor der Frühschicht statt.', 'b) wird zum Teil als Arbeitszeit gerechnet.', 'c) kostet eine kleine Gebühr.'], a: 1, why: '„Die Hälfte der Kurszeit zählt als Arbeitszeit.“ Der Kurs ist kostenlos und nach der Frühschicht.' },
          { q: '9. Einen Gutschein für das Fitnessstudio bekommt man, wenn man …', opts: ['a) fünfmal an den Rückenübungen teilnimmt.', 'b) sich bei der Physiotherapeutin anmeldet.', 'c) einmal im Monat ins Fitnessstudio geht.'], a: 0, why: '„Wer an fünf Terminen teilgenommen hat, bekommt einen Gutschein“.' }
        ] },
      { title: 'Lesen Teil 3: Arbeitsanweisungen verstehen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie den Text und die Aufgaben 10–13. Welche Antwort (a, b oder c) passt am besten?',
        material: [{ h: 'FrischMarkt – Regeln für die Frischetheke', t: '• Vor Arbeitsbeginn ziehen Sie saubere Arbeitskleidung und eine Haube an. Die Kleidung bleibt im Markt und wird von uns gewaschen. Nehmen Sie sie bitte nicht mit nach Hause.\n• Die Temperatur in der Kühltheke kontrollieren Sie dreimal am Tag: um 7, um 10 und um 12 Uhr. Tragen Sie die Werte in die Liste neben der Waage ein. Ist die Temperatur höher als 7 Grad, informieren Sie sofort die Marktleitung.\n• Käse und Wurst schneiden Sie mit verschiedenen Messern und auf verschiedenen Brettern. Rot ist für Wurst, gelb für Käse.\n• Ware mit abgelaufenem Datum kommt nicht in den Müll, sondern in die graue Kiste im Kühlraum. Die Marktleitung entscheidet, was gespendet werden kann.\n• Beim Geldwechsel an der Theke ziehen Sie die Handschuhe aus. Danach waschen Sie die Hände, bevor Sie wieder Lebensmittel anfassen.\n• Fragen Kunden nach Allergenen, zeigen Sie ihnen den Ordner „Zutaten“ unter der Kasse. Geben Sie keine Auskunft aus dem Gedächtnis.' }],
        items: [
          { q: '10. Was gilt für die Arbeitskleidung?', opts: ['a) Man wäscht sie selbst zu Hause.', 'b) Sie bleibt im Supermarkt.', 'c) Man trägt nur eine Haube.'], a: 1, why: '„Die Kleidung bleibt im Markt und wird von uns gewaschen.“' },
          { q: '11. Wenn die Kühltheke wärmer als 7 Grad ist, …', opts: ['a) muss man sofort die Marktleitung informieren.', 'b) schreibt man den Wert erst am Abend auf.', 'c) schaltet man die Theke aus.'], a: 0, why: '„Ist die Temperatur höher als 7 Grad, informieren Sie sofort die Marktleitung.“' },
          { q: '12. Ware mit abgelaufenem Datum …', opts: ['a) wirft man sofort in den Müll.', 'b) verkauft man billiger.', 'c) legt man in eine graue Kiste.'], a: 2, why: '„… kommt nicht in den Müll, sondern in die graue Kiste im Kühlraum.“' },
          { q: '13. Wenn ein Kunde nach Allergenen fragt, …', opts: ['a) antwortet man aus dem Gedächtnis.', 'b) zeigt man ihm den Ordner mit den Zutaten.', 'c) holt man die Marktleitung.'], a: 1, why: '„… zeigen Sie ihnen den Ordner „Zutaten“ … Geben Sie keine Auskunft aus dem Gedächtnis.“' }
        ] },
      { title: 'Lesen Teil 4: Aufgaben und Aufgabenverteilung', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die E-Mail und die Aussagen 14–18. Sind die Aussagen richtig oder falsch?',
        material: [{ h: 'E-Mail', t: 'Von: Sabine Krüger (Kitaleitung)\nAn: Team Kita Sonnenschein\nBetreff: Sommerfest am 27. Juni\n\nLiebes Team,\n\nunser Sommerfest beginnt am Freitag, 27. Juni, um 15 Uhr und endet um 18 Uhr. Die Kinder werden an diesem Tag schon um 13 Uhr abgeholt, damit wir alles vorbereiten können.\n\nHier die Aufgaben: Marta und Yusuf bauen ab 13 Uhr die Spielstationen im Garten auf. Die Bänke holen wir am Donnerstag beim Sportverein ab – das macht Herr Albers mit seinem Transporter, er braucht noch eine zweite Person. Wer kann helfen? Bitte meldet euch bei mir.\n\nDie Eltern bringen Kuchen mit. Kaffee und Getränke kauft Lena am Vormittag im Großmarkt, das Geld bekommt sie vorher aus der Kasse im Büro. Bitte denkt daran: Wir verkaufen nichts, alles ist kostenlos, aber es gibt eine Spendenbox für neue Spielsachen.\n\nWenn es regnet, feiern wir in der Turnhalle. Die Entscheidung treffe ich am Freitag um 10 Uhr und schreibe sie in die Eltern-App.\n\nViele Grüße\nSabine' }],
        opts: ['Richtig', 'Falsch'],
        items: [
          { q: '14. Am Tag des Sommerfests werden die Kinder früher abgeholt.', a: 0, why: '„Die Kinder werden an diesem Tag schon um 13 Uhr abgeholt“.' },
          { q: '15. Herr Albers holt die Bänke allein ab.', a: 1, why: '„er braucht noch eine zweite Person“.' },
          { q: '16. Lena bezahlt die Getränke mit ihrem eigenen Geld.', a: 1, why: '„das Geld bekommt sie vorher aus der Kasse im Büro“.' },
          { q: '17. Beim Sommerfest kostet der Kuchen ein bis zwei Euro.', a: 1, why: '„Wir verkaufen nichts, alles ist kostenlos“.' },
          { q: '18. Bei Regen findet das Fest in der Turnhalle statt.', a: 0, why: '„Wenn es regnet, feiern wir in der Turnhalle.“' }
        ] }
    ] },
    { id: 'lesen-schreiben', title: 'Lesen und Schreiben', minutes: 20, note: 'Erst die E-Mail und die Notiz genau lesen, dann die Aufgaben lösen und die Antwort schreiben.', parts: [
      { title: 'Lesen und Schreiben Teil 1: Eine Kundenanfrage verstehen', skill: 'lesen', pts: 3,
        instr: 'Sie arbeiten bei der Firma IT-Service Weber in Essen. Lesen Sie die E-Mail einer Kundin und die Notiz Ihrer Chefin. Lösen Sie die Aufgaben 19 und 20.',
        material: [
          { h: 'E-Mail von Frau Yilmaz', t: 'Von: Derya Yilmaz, Steuerbüro Yilmaz, Essen\nAn: service@it-weber.de\nBetreff: Drucker im Büro\n\nSehr geehrte Damen und Herren,\n\nseit Ihrem Besuch am Montag funktioniert unser neuer Netzwerkdrucker leider nur an zwei von vier Computern. An den beiden Laptops im Besprechungsraum kommt immer die Meldung „Drucker nicht gefunden“. Wir müssen diese Woche viele Steuererklärungen drucken.\n\nAußerdem möchte ich wissen, ob Sie uns auch beim Umzug unseres Büros im September helfen können. Wir brauchen dann neue Kabel und Internet in drei Räumen.\n\nMit freundlichen Grüßen\nDerya Yilmaz' },
          { h: 'Notiz der Chefin', t: 'Bitte heute noch Frau Yilmaz antworten!\n– entschuldigen: Laptops wurden beim Termin vergessen\n– Fernwartung anbieten: morgen, 9 Uhr (Laptops anlassen!)\n– Umzug: ja, gern – vorher Besichtigung der neuen Räume, Termin vorschlagen\n– Hotline für Notfälle: 0201 456 78 90' }
        ],
        items: [
          { q: '19. Was ist das Problem von Frau Yilmaz?', opts: ['a) Der neue Drucker druckt sehr langsam.', 'b) Zwei Laptops können nicht mit dem Drucker drucken.', 'c) Der Drucker wurde noch nicht geliefert.'], a: 1, why: '„An den beiden Laptops … kommt immer die Meldung „Drucker nicht gefunden“.“' },
          { q: '20. Was möchte Frau Yilmaz außerdem wissen?', opts: ['a) Ob die Firma beim Büroumzug hilft.', 'b) Wie viel ein neuer Drucker kostet.', 'c) Ob sie ihre Steuererklärung online machen kann.'], a: 0, why: '„… ob Sie uns auch beim Umzug unseres Büros im September helfen können.“' }
        ] },
      { kind: 'write', title: 'Lesen und Schreiben Teil 2: Eine Antwort-E-Mail schreiben', skill: 'schreiben', pts: 25,
        instr: 'Schreiben Sie eine Antwort an Frau Yilmaz. Berücksichtigen Sie alle Punkte aus der Notiz Ihrer Chefin. Schreiben Sie mindestens 70 Wörter. Achten Sie auf Anrede, Gruß und eine passende Reihenfolge.',
        options: [{ h: 'Aufgabe', situation: 'Sie arbeiten im Büro der Firma IT-Service Weber. Frau Yilmaz hat ein Problem mit dem neuen Drucker und eine Frage zum Büroumzug.', task: 'Antworten Sie Frau Yilmaz per E-Mail und setzen Sie die Anweisungen Ihrer Chefin um.',
          points: ['sich entschuldigen und den Grund nennen', 'Fernwartung anbieten (morgen, 9 Uhr, Laptops anlassen)', 'auf die Frage zum Umzug antworten (Besichtigung, Terminvorschlag)', 'Hotline für Notfälle nennen'],
          muster: 'Sehr geehrte Frau Yilmaz,\n\nvielen Dank für Ihre E-Mail. Es tut uns sehr leid, dass der Drucker noch nicht an allen Computern funktioniert. Unser Techniker hat bei seinem Besuch am Montag die beiden Laptops im Besprechungsraum leider vergessen.\n\nWir möchten das Problem so schnell wie möglich lösen. Unser Techniker kann sich morgen um 9 Uhr per Fernwartung mit Ihren Laptops verbinden. Bitte lassen Sie die beiden Laptops dafür eingeschaltet.\n\nBei Ihrem Umzug im September helfen wir Ihnen gern. Vorher möchten wir uns die neuen Räume ansehen. Passt es Ihnen am Donnerstag, dem 14. August, um 15 Uhr?\n\nWenn Sie vorher dringend Hilfe brauchen, erreichen Sie uns unter unserer Notfall-Hotline 0201 456 78 90.\n\nMit freundlichen Grüßen\nIhr Team von IT-Service Weber' }],
        minWords: 70,
        check: ['Formelle Anrede („Sehr geehrte Frau Yilmaz“) und Gruß („Mit freundlichen Grüßen“)', 'Entschuldigung mit Grund (Laptops vergessen)', 'Fernwartung mit Tag, Uhrzeit und Hinweis „Laptops anlassen“', 'Antwort zum Umzug mit konkretem Terminvorschlag', 'Hotline-Nummer genannt', 'Mindestens 70 Wörter, Sie-Form durchgehend'] }
    ] },
    { id: 'hoeren', title: 'Hören', minutes: 20, note: 'Teil 1–3 hörst du nur einmal, Teil 4 zweimal. Lies die Aufgaben immer vor dem Hören.', parts: [
      { title: 'Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'm', t: 'Hey Aylin, hast du die Paletten für Tour sieben schon fertig?' },
            { s: 'f', t: 'Fast. Mir fehlen noch zwei Kartons Waschmittel. Die stehen laut System in Gang vier, aber da ist nichts.' },
            { s: 'm', t: 'Ah, die sind heute Morgen in Gang sechs umgelagert worden. Ganz oben, du brauchst den Hubwagen mit der Leiter.' },
            { s: 'f', t: 'Ach so. Und wann muss Tour sieben fertig sein?' },
            { s: 'm', t: 'Der Fahrer kommt um halb zwölf. Also bis elf Uhr bitte alles an Rampe drei.' },
            { s: 'f', t: 'Okay, Rampe drei, elf Uhr. Mach ich.' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'f', t: 'Herr Okafor, die Gäste aus Zimmer zweihundertzwölf haben sich beschwert. Die Dusche ist kalt.' },
            { s: 'm', t: 'Schon wieder? Ich habe gestern das Ventil gewechselt.' },
            { s: 'f', t: 'Hm. Die Gäste möchten jetzt ein anderes Zimmer.' },
            { s: 'm', t: 'Das ist wohl am besten. Ist zweihundertfünfzehn frei? Das ist genauso groß.' },
            { s: 'f', t: 'Ja, das ist frei und schon sauber. Dann gebe ich den Gästen den neuen Schlüssel.' },
            { s: 'm', t: 'Gut, und ich rufe heute noch die Installationsfirma an. Allein schaffe ich das nicht.' }
          ] },
          { h: 'Gespräch 3', lines: [
            { s: 'm', t: 'Frau Nowak, haben Sie meinen Urlaubsantrag für August schon gesehen?' },
            { s: 'f', t: 'Ja, Herr Haddad. Zwei Wochen ab dem vierten August, oder? Das Problem ist: Da sind schon drei Kollegen aus Ihrem Team im Urlaub.' },
            { s: 'm', t: 'Oh. Und ab dem achtzehnten?' },
            { s: 'f', t: 'Ab dem achtzehnten geht das. Da ist nur Frau Lange weg.' },
            { s: 'm', t: 'Gut, dann ändere ich den Antrag und schicke ihn heute noch einmal.' },
            { s: 'f', t: 'Machen Sie das, ich unterschreibe ihn dann sofort.' }
          ] },
          { h: 'Gespräch 4', lines: [
            { s: 'f', t: 'Tomasz, kannst du morgen früh die Baustelle in der Kirchstraße übernehmen? Jens ist krank.' },
            { s: 'm', t: 'Morgen? Eigentlich bin ich in der Gartenstraße eingeteilt, beim Fliesenlegen.' },
            { s: 'f', t: 'Das kann Mehmet machen. In der Kirchstraße kommt um sieben der Beton, da muss jemand Erfahrenes dabei sein.' },
            { s: 'm', t: 'Okay. Fahre ich mit dem Firmenbus oder mit meinem Auto?' },
            { s: 'f', t: 'Nimm bitte den kleinen Transporter, der Schlüssel liegt im Büro. Und vergiss den Helm nicht, die Bauleitung kontrolliert morgen.' }
          ] }
        ],
        items: [
          { au: 0, q: '21. Die Waschmittelkartons stehen nicht mehr in Gang vier.', opts: ['Richtig', 'Falsch'], a: 0, why: '„die sind heute Morgen in Gang sechs umgelagert worden“.' },
          { au: 0, q: '22. Bis wann muss die Tour fertig sein?', opts: ['a) Bis halb zwölf.', 'b) Bis elf Uhr.', 'c) Bis sechs Uhr.'], a: 1, why: '„Also bis elf Uhr bitte alles an Rampe drei.“' },
          { au: 1, q: '23. Herr Okafor hat die Dusche heute repariert.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Er hat „gestern das Ventil gewechselt“.' },
          { au: 1, q: '24. Was passiert jetzt?', opts: ['a) Die Gäste bekommen Geld zurück.', 'b) Herr Okafor repariert die Dusche sofort allein.', 'c) Die Gäste bekommen ein anderes Zimmer.'], a: 2, why: 'Die Gäste bekommen Zimmer 215, und eine Installationsfirma wird angerufen.' },
          { au: 2, q: '25. Herr Haddad kann ab dem 4. August Urlaub machen.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Da sind schon drei Kollegen im Urlaub – erst „ab dem achtzehnten geht das“.' },
          { au: 2, q: '26. Was macht Herr Haddad?', opts: ['a) Er spricht mit Frau Lange.', 'b) Er nimmt nur eine Woche Urlaub.', 'c) Er schickt einen neuen Antrag.'], a: 2, why: '„dann ändere ich den Antrag und schicke ihn heute noch einmal.“' },
          { au: 3, q: '27. Tomasz arbeitet morgen auf einer anderen Baustelle als geplant.', opts: ['Richtig', 'Falsch'], a: 0, why: 'Er übernimmt die Kirchstraße statt der Gartenstraße.' },
          { au: 3, q: '28. Womit fährt Tomasz zur Baustelle?', opts: ['a) Mit dem Firmenbus.', 'b) Mit seinem eigenen Auto.', 'c) Mit dem kleinen Transporter.'], a: 2, why: '„Nimm bitte den kleinen Transporter“.' }
        ] },
      { title: 'Hören Teil 2: Meinungen', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören eine Teambesprechung in einem Supermarkt. Sie hören das Gespräch einmal. Was meinen die Personen? Ordnen Sie zu: Welche Aussage (a–d) passt zu welcher Person? Zwei Aussagen passen nicht.',
        audio: [{ h: 'Teambesprechung', lines: [
          { s: 'f', t: 'So, zum Schluss noch das Thema Selbstbedienungskassen. Die Zentrale möchte, dass wir ab Herbst vier Kassen haben, an denen die Kunden selbst scannen. Frau Ivanova, was denken Sie?' },
          { s: 'f2', t: 'Ehrlich gesagt finde ich das gut. Morgens, wenn viele Leute nur schnell ein Brötchen und einen Kaffee kaufen, gibt es immer lange Schlangen. Mit den neuen Kassen geht das viel schneller, und wir haben mehr Zeit für die Kunden an der Theke.' },
          { s: 'f', t: 'Und Sie, Herr Demir?' },
          { s: 'm', t: 'Na ja, ich weiß nicht. Viele unserer Kunden sind älter. Die kommen auch, weil sie mit uns reden wollen. Ich habe Angst, dass die sich allein gelassen fühlen. Wenn wir das machen, muss immer jemand von uns bei den Kassen stehen und helfen.' },
          { s: 'f', t: 'Das ist ein guter Punkt. Das nehme ich mit in die Planung.' }
        ] }],
        opts: ['a) Mit den neuen Kassen sind die Wartezeiten kürzer.', 'b) Die neuen Kassen sind für den Markt zu teuer.', 'c) Ältere Kunden brauchen bei den neuen Kassen Hilfe.', 'd) Die Mitarbeitenden verlieren durch die Kassen ihre Arbeit.'],
        items: [
          { au: 0, q: '29. Frau Ivanova', a: 0, why: '„Mit den neuen Kassen geht das viel schneller“ – keine langen Schlangen.' },
          { au: 0, q: '30. Herr Demir', a: 2, why: '„… muss immer jemand von uns bei den Kassen stehen und helfen.“' }
        ] },
      { title: 'Hören Teil 3: Gespräche über Produkte und Abläufe', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören zwei Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben. Welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'f', t: 'Herr Schulze, ich erkläre Ihnen kurz das neue Zeiterfassungsgerät am Eingang.' },
            { s: 'm', t: 'Gern. Muss ich da immer noch eine Karte reinstecken?' },
            { s: 'f', t: 'Nein, Sie halten einfach Ihren Mitarbeiterausweis vor das Gerät. Beim Kommen drücken Sie die grüne Taste, beim Gehen die rote.' },
            { s: 'm', t: 'Und die Pause?' },
            { s: 'f', t: 'Die Pause müssen Sie nicht mehr eintragen. Das System zieht automatisch dreißig Minuten ab, wenn Sie länger als sechs Stunden arbeiten.' },
            { s: 'm', t: 'Ah, praktisch. Danke!' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'm', t: 'Frau Sanchez, Sie haben nach dem neuen Elektroherd in der Kita-Küche gefragt?' },
            { s: 'f', t: 'Ja, der ist ganz anders als der alte. Wie mache ich ihn an?' },
            { s: 'm', t: 'Zuerst drücken Sie zwei Sekunden auf das Schloss-Symbol. Das ist die Kindersicherung. Danach können Sie die Platten einschalten.' },
            { s: 'f', t: 'Und warum blinkt da manchmal ein H?' },
            { s: 'm', t: 'Das H heißt: Die Platte ist noch heiß. Erst wenn es weg ist, darf man die Platte sauber machen.' },
            { s: 'f', t: 'Gut zu wissen, danke.' }
          ] }
        ],
        items: [
          { au: 0, q: '31. Was macht man beim Kommen?', opts: ['a) Man steckt eine Karte in das Gerät.', 'b) Man hält den Ausweis vor das Gerät und drückt Grün.', 'c) Man trägt die Zeit in eine Liste ein.'], a: 1, why: '„… halten einfach Ihren Mitarbeiterausweis vor das Gerät. Beim Kommen drücken Sie die grüne Taste“.' },
          { au: 0, q: '32. Was gilt für die Pause?', opts: ['a) Man drückt am Anfang und am Ende Rot.', 'b) Sie dauert jetzt sechs Stunden.', 'c) Man muss sie nicht mehr eintragen.'], a: 2, why: '„Die Pause müssen Sie nicht mehr eintragen.“' },
          { au: 1, q: '33. Was muss man zuerst machen?', opts: ['a) Die Platte sauber machen.', 'b) Auf das H drücken.', 'c) Die Kindersicherung ausschalten.'], a: 2, why: '„Zuerst drücken Sie zwei Sekunden auf das Schloss-Symbol. Das ist die Kindersicherung.“' },
          { au: 1, q: '34. Was bedeutet das H?', opts: ['a) Der Herd ist kaputt.', 'b) Die Platte ist noch heiß.', 'c) Der Herd ist ausgeschaltet.'], a: 1, why: '„Das H heißt: Die Platte ist noch heiß.“' }
        ] },
      { title: 'Hören Teil 4: Anliegen', skill: 'hoeren', pts: 3, plays: 2,
        instr: 'Sie hören fünf Nachrichten auf dem Anrufbeantworter bzw. der Mailbox. Sie hören jede Nachricht zweimal. Welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Nachricht 1', lines: [{ s: 'm', t: 'Hallo Frau Weiß, hier ist Bernd Kühn aus der Personalabteilung. Für Ihren Antrag auf Elternzeit fehlt noch die Geburtsurkunde Ihrer Tochter. Eine Kopie reicht. Sie können sie mir per E-Mail schicken oder in meinen Briefkasten im Erdgeschoss werfen. Danke und alles Gute für Sie und die Kleine!' }] },
          { h: 'Nachricht 2', lines: [{ s: 'f', t: 'Hallo Mustafa, hier ist Ines. Du, die Schulung zum Gabelstapler morgen fällt aus, der Trainer ist krank. Der neue Termin ist nächsten Dienstag, gleiche Uhrzeit, acht Uhr. Du musst dich nicht noch einmal anmelden. Bis dann!' }] },
          { h: 'Nachricht 3', lines: [{ s: 'm', t: 'Guten Tag, hier spricht Albrecht vom Malerbetrieb Albrecht. Wir sollen ja nächste Woche die Flure in Ihrem Hotel streichen. Damit der Geruch die Gäste nicht stört, würden wir gern nachts arbeiten, von zweiundzwanzig bis sechs Uhr. Bitte rufen Sie mich zurück, ob das für Sie in Ordnung ist.' }] },
          { h: 'Nachricht 4', lines: [{ s: 'f', t: 'Ja, hallo, hier ist die Mutter von Elif aus der Igelgruppe. Elif hat seit heute Nacht Fieber, sie bleibt heute und morgen zu Hause. Ihr Bruder Can kommt aber ganz normal, ihn bringt heute ausnahmsweise seine Oma. Danke!' }] },
          { h: 'Nachricht 5', lines: [{ s: 'm', t: 'Hallo, hier ist Kevin aus der IT. Ihr neues Passwort für das Kassensystem funktioniert ab morgen früh. Bis dahin benutzen Sie bitte noch das alte. Wichtig: Schreiben Sie das neue Passwort nicht auf einen Zettel an der Kasse!' }] }
        ],
        items: [
          { au: 0, q: '35. Was soll Frau Weiß tun?', opts: ['a) Die Elternzeit noch einmal beantragen.', 'b) Eine Kopie der Geburtsurkunde abgeben.', 'c) Persönlich in die Personalabteilung kommen.'], a: 1, why: '„… fehlt noch die Geburtsurkunde … Eine Kopie reicht.“ Per E-Mail oder in den Briefkasten.' },
          { au: 1, q: '36. Was ist mit der Staplerschulung?', opts: ['a) Sie findet an einem anderen Tag statt.', 'b) Mustafa muss sich neu anmelden.', 'c) Sie beginnt morgen später.'], a: 0, why: '„Der neue Termin ist nächsten Dienstag … Du musst dich nicht noch einmal anmelden.“' },
          { au: 2, q: '37. Was möchte Herr Albrecht?', opts: ['a) Er möchte den Auftrag absagen.', 'b) Er möchte in der Nacht arbeiten.', 'c) Er möchte mehr Geld für die Arbeit.'], a: 1, why: '„würden wir gern nachts arbeiten, von zweiundzwanzig bis sechs Uhr.“' },
          { au: 3, q: '38. Wer kommt heute in die Kita?', opts: ['a) Elif und Can.', 'b) Nur Elif.', 'c) Nur Can.'], a: 2, why: 'Elif hat Fieber und bleibt zu Hause, „Ihr Bruder Can kommt aber ganz normal“.' },
          { au: 4, q: '39. Ab wann gilt das neue Passwort?', opts: ['a) Sofort.', 'b) Ab nächster Woche.', 'c) Ab morgen früh.'], a: 2, why: '„Ihr neues Passwort … funktioniert ab morgen früh.“' }
        ] }
    ] },
    { id: 'hoeren-schreiben', title: 'Hören und Schreiben', minutes: 5, note: 'Du hörst ein Telefonat zweimal. Mach schon beim ersten Hören Stichpunkte.', parts: [
      { title: 'Hören und Schreiben Teil 1: Ein Telefonat verstehen', skill: 'hoeren', pts: 3, plays: 2,
        instr: 'Sie arbeiten in der Hauswirtschaft im Hotel Am Stadtpark. Sie hören ein Telefongespräch zweimal. Lösen Sie die Aufgabe 40. Welche Antwort (a, b oder c) passt am besten?',
        audio: [{ h: 'Telefongespräch', lines: CALL }],
        items: [{ au: 0, q: '40. Was ist das Problem?', opts: ['a) Die Wäscherei hat zu wenig Bettwäsche gewaschen.', 'b) Die Wäscherei liefert die Bettwäsche einen Tag später.', 'c) Das Hotel hat die Rechnung nicht bezahlt.'], a: 1, why: 'Der Lieferwagen ist kaputt, die Wäsche kommt „erst am Freitag“ statt am Donnerstag.' }] },
      { kind: 'write', title: 'Hören und Schreiben Teil 2: Eine Gesprächsnotiz schreiben', skill: 'schreiben', pts: 15, plays: 2,
        instr: 'Hören Sie das Telefongespräch noch einmal. Schreiben Sie für Ihre Chefin Frau Hoffmann eine Gesprächsnotiz. Notieren Sie die wichtigsten Informationen in Stichpunkten.',
        audio: [{ h: 'Telefongespräch (noch einmal)', lines: CALL }],
        options: [{ h: 'Gesprächsnotiz', situation: 'Frau Hoffmann leitet die Hauswirtschaft im Hotel Am Stadtpark. Sie ist heute nicht im Haus.', task: 'Schreiben Sie eine Gesprächsnotiz für Frau Hoffmann. Füllen Sie die Felder in Stichpunkten aus.',
          points: ['Wer? (Name, Firma, Telefon)', 'Problem', 'Angebot / Lösung', 'Was tun? (bis wann)'],
          muster: 'Gesprächsnotiz für Frau Hoffmann\n\nWer? Frau Brandt, Textilpflege Rhein-Ruhr, Tel. 0201 84 73 15\nProblem: Lieferwagen kaputt – Bettwäsche kommt erst Freitag, ca. 10 Uhr (statt Donnerstag)\nAngebot: heute 50 Sets Bettwäsche per Kurier, bis 18 Uhr, kostenlos\nWas tun? Bis morgen früh Frau Brandt anrufen: Reichen 50 Sets oder mehr nötig? (Freitag große Reisegruppe!)' }],
        minWords: 15,
        check: ['Name und Firma richtig (Brandt, Textilpflege Rhein-Ruhr)', 'Telefonnummer vollständig und richtig', 'Neuer Liefertermin (Freitag, ca. 10 Uhr)', 'Notlieferung: 50 Sets, heute bis 18 Uhr, kostenlos', 'Aufgabe mit Frist: bis morgen früh zurückrufen'] }
    ] },
    { id: 'sprachbausteine', title: 'Sprachbausteine und Schreiben', minutes: 10, parts: [
      { title: 'Sprachbausteine Teil 1: Auf Anfragen und Vorschläge reagieren', skill: 'schreiben', pts: 1,
        instr: 'Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 41–46?',
        material: [{ h: 'E-Mail an die Schichtleiterin', t: 'Liebe Frau Brandt,\n\nvielen Dank für Ihre Frage, ob ich nächsten Samstag eine Zusatzschicht übernehmen kann. {1}, ich helfe gern.\n\nAllerdings kann ich erst ab 10 Uhr kommen, {2} ich morgens meinen Sohn zum Fußballtraining bringe. Wäre das für Sie in Ordnung?\n\n{3} Sie mir bitte noch sagen, ob ich die Zusatzstunden bezahlt bekomme oder ob ich dafür einen Tag frei nehmen kann? Mir {4} ein freier Tag lieber, weil ich im Juni umziehe.\n\nIch habe {5} eine Idee: Wir könnten für solche Fälle eine Liste machen, in die sich alle eintragen, {6} spontan einspringen können.\n\nViele Grüße\nDaria Petrenko' }],
        items: [
          { q: '', opts: ['a) Das passt mir gut', 'b) Das ist mir egal', 'c) Das finde ich schade'], a: 0, why: 'Sie sagt zu: „Das passt mir gut, ich helfe gern.“' },
          { q: '', opts: ['a) trotzdem', 'b) weil', 'c) deshalb'], a: 1, why: 'Ein Grund im Nebensatz mit Verb am Ende: „weil ich … bringe“.' },
          { q: '', opts: ['a) Müssen', 'b) Sollen', 'c) Könnten'], a: 2, why: 'Höfliche Bitte: „Könnten Sie mir bitte … sagen?“' },
          { q: '', opts: ['a) wäre', 'b) hätte', 'c) würde'], a: 0, why: '„Mir wäre ein freier Tag lieber“ – Konjunktiv II von „sein“.' },
          { q: '', opts: ['a) noch', 'b) schon', 'c) erst'], a: 0, why: '„Ich habe noch eine Idee“ = zusätzlich.' },
          { q: '', opts: ['a) die', 'b) denen', 'c) deren'], a: 0, why: 'Relativsatz, Nominativ Plural: „alle, die spontan einspringen können“.' }
        ] },
      { kind: 'write', title: 'Sprachbausteine und Schreiben Teil 2: Seine Meinung im Team-Chat schreiben', skill: 'schreiben', pts: 14,
        instr: 'Lesen Sie die Nachricht Ihrer Chefin im Team-Chat. Schreiben Sie eine Antwort, in der Sie Ihre Meinung sagen und begründen. Schreiben Sie mindestens 40 Wörter.',
        material: [{ h: 'Team-Chat „Lager – Frühschicht“ – Nachricht von Schichtleiterin Daria Brandt', t: 'Hallo zusammen, die Geschäftsleitung überlegt, ob die Frühschicht künftig schon um 5 Uhr statt um 6 Uhr beginnen soll. Dafür wäre um 13 Uhr Feierabend statt um 14 Uhr. Was haltet ihr davon? Schreibt mir bis Freitag eure Meinung. Danke! Daria' }],
        options: [{ h: 'Aufgabe', situation: 'Sie arbeiten in der Frühschicht im Lager. Ihre Chefin fragt nach Ihrer Meinung zu neuen Arbeitszeiten.', task: 'Antworten Sie im Team-Chat: Sagen Sie Ihre Meinung, begründen Sie sie und machen Sie einen eigenen Vorschlag.',
          points: ['Meinung zum Vorschlag', 'Begründung (Vorteil oder Nachteil)', 'eigener Vorschlag oder Wunsch'],
          muster: 'Hallo Daria, danke für die Info! Ehrlich gesagt finde ich den frühen Beginn schwierig. Um 5 Uhr fährt bei mir noch kein Bus, ich müsste also mit dem Auto kommen. Der frühe Feierabend wäre aber schön für die Familie. Vielleicht könnten wir es freiwillig machen: Wer möchte, fängt um 5 Uhr an, die anderen weiter um 6 Uhr. Viele Grüße, Samir' }],
        minWords: 40,
        check: ['Kurze Anrede und Gruß passend zum Team-Chat (du-Form möglich)', 'Meinung klar gesagt (Ich finde …, Meiner Meinung nach …)', 'Mindestens eine Begründung (weil …, denn …)', 'Eigener Vorschlag (Vielleicht könnten wir …)', 'Mindestens 40 Wörter'] }
    ] },
    { id: 'sprechen', title: 'Sprechen', minutes: 16, note: 'Keine Vorbereitungszeit. Teil 1 sprichst du allein, Teil 2 und 3 mit deiner Partnerin oder deinem Partner.', parts: [
      { kind: 'speak', title: 'Sprechen Teil 1A: Über ein Thema sprechen', skill: 'sprechen', pts: 12, minutes: 2,
        instr: 'Sprechen Sie etwa eine Minute über das Thema. Die Stichpunkte helfen Ihnen.',
        task: 'Thema: Mein erster Arbeitstag\n\n• Wo und wann war Ihr erster Arbeitstag?\n• Wer hat Ihnen geholfen?\n• Was war schwierig, was war schön?\n• Was raten Sie neuen Kollegen für den ersten Tag?',
        prompts: ['Bitte erzählen Sie etwas über Ihren ersten Arbeitstag. Sie haben ungefähr eine Minute.'],
        redemittel: ['Ich möchte von meinem ersten Arbeitstag erzählen.', 'Am Anfang war ich sehr nervös, weil …', 'Besonders geholfen hat mir …', 'Schwierig war für mich …', 'Neuen Kollegen rate ich, …'],
        muster: 'Ich möchte von meinem ersten Arbeitstag erzählen. Vor zwei Jahren habe ich in einem Logistikzentrum in Dortmund angefangen. Am Anfang war ich sehr nervös, weil alles so groß war und ich viele Wörter nicht kannte. Besonders geholfen hat mir mein Kollege Pavel, er hat mir die Scanner und die Gänge gezeigt. Schwierig war für mich die Frühschicht um sechs Uhr. Schön war, dass alle sehr freundlich waren und wir zusammen Pause gemacht haben. Neuen Kollegen rate ich, viele Fragen zu stellen und sich die Namen aufzuschreiben.',
        check: ['Alle vier Stichpunkte angesprochen', 'Etwa eine Minute zusammenhängend gesprochen', 'Vergangenheit richtig benutzt (habe … angefangen, war …)', 'Mindestens eine Begründung mit „weil“'] },
      { kind: 'speak', title: 'Sprechen Teil 1B: Fragen beantworten', skill: 'sprechen', pts: 12, minutes: 2,
        instr: 'Die Prüferin / der Prüfer stellt Ihnen Fragen zu Ihrem Thema. Antworten Sie in ganzen Sätzen und begründen Sie Ihre Antworten.',
        task: 'Antworten Sie auf die Fragen zum Thema „Mein erster Arbeitstag“.',
        prompts: ['Sollte jede Firma neuen Mitarbeitern einen Paten oder eine Patin geben? Warum?', 'Was ist für Sie am ersten Tag wichtiger: die Kollegen kennenlernen oder die Arbeit verstehen?', 'Wie kann man sich auf einen neuen Arbeitsplatz gut vorbereiten?'],
        redemittel: ['Ja, unbedingt, denn …', 'Für mich ist … wichtiger, weil …', 'Man kann zum Beispiel …', 'Das kommt darauf an, ob …'],
        muster: '1) Ja, unbedingt, denn am Anfang hat man viele Fragen und traut sich nicht, den Chef zu fragen. Ein Pate erklärt einem alles in Ruhe.\n2) Für mich ist es wichtiger, die Kollegen kennenzulernen, weil man mit ihnen jeden Tag zusammenarbeitet. Die Arbeit lernt man dann Schritt für Schritt.\n3) Man kann zum Beispiel die Internetseite der Firma lesen, den Weg vorher einmal fahren und wichtige Wörter aus dem Beruf lernen.',
        check: ['Jede Frage direkt beantwortet', 'Jede Antwort mit Begründung oder Beispiel', 'Ganze Sätze, Verb an der richtigen Stelle'] },
      { kind: 'speak', title: 'Sprechen Teil 2: Mit Kollegen sprechen – Erfahrungen austauschen', skill: 'sprechen', pts: 16, minutes: 4,
        instr: 'Sie sind Kolleginnen / Kollegen und sprechen in der Pause über Ihre Erfahrungen. Erzählen Sie von sich, stellen Sie Fragen und reagieren Sie auf das, was Ihre Partnerin / Ihr Partner sagt.',
        task: 'Thema: Arbeit und Familie\n\n• Wie organisieren Sie Arbeit und Familie?\n• Wer hilft Ihnen (Familie, Kita, Nachbarn …)?\n• Was ist schwierig, zum Beispiel bei Schichtarbeit?\n• Was könnte der Arbeitgeber tun?',
        prompts: ['Sie sind Kollegen und sitzen in der Pause zusammen. Erzählen Sie doch mal: Wie organisieren Sie Arbeit und Familie?', 'Und jetzt fragen Sie bitte Ihre Partnerin oder Ihren Partner: Wie ist das bei ihr oder bei ihm?', 'Was könnte Ihr Arbeitgeber tun, damit es leichter wird?'],
        redemittel: ['Bei mir ist es so: …', 'Und wie machst du das?', 'Das kenne ich gut.', 'Das ist bei mir ganz anders: …', 'Ich fände es gut, wenn der Chef …'],
        muster: 'A: Sag mal, wie machst du das eigentlich mit den Kindern, wenn du Frühschicht hast?\nB: Mein Mann bringt sie zur Kita, und ich hole sie um halb drei ab. Und bei dir?\nA: Bei mir ist es schwieriger, ich bin allein mit meiner Tochter. Meine Nachbarin hilft mir manchmal am Morgen.\nB: Das kenne ich. Und wenn die Kleine krank ist?\nA: Dann muss ich zu Hause bleiben, das ist für das Team natürlich blöd.\nB: Ich fände es gut, wenn der Chef die Schichten früher planen würde. Dann kann man sich besser organisieren.\nA: Stimmt, und vielleicht könnten Eltern öfter Frühschicht machen.',
        check: ['Von eigenen Erfahrungen erzählt', 'Auch Fragen an den Partner gestellt', 'Auf den Partner reagiert (Das kenne ich, Bei mir ist das anders …)', 'Einen Vorschlag für den Arbeitgeber gemacht'] },
      { kind: 'speak', title: 'Sprechen Teil 3: Etwas gemeinsam planen', skill: 'sprechen', pts: 20, minutes: 5,
        instr: 'Ihre Abteilung bekommt nächsten Monat zwei neue Kolleginnen aus dem Ausland. Ihre Chefin hat Sie beide gebeten, die erste Woche zu planen. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich.',
        task: 'Die erste Woche für neue Kolleginnen planen\n\n• Wer zeigt ihnen den Betrieb und wann?\n• Welche Unterlagen brauchen sie (Ausweis, Kleidung, Schlüssel …)?\n• Hilfe bei der Sprache?\n• Ein Treffen mit dem Team?',
        prompts: ['Beginnen Sie bitte. Wer soll den neuen Kolleginnen am ersten Tag den Betrieb zeigen?', 'Die Kolleginnen sprechen noch nicht so gut Deutsch. Wie können Sie helfen?', 'Wie möchten Sie das Team und die neuen Kolleginnen zusammenbringen?'],
        redemittel: ['Ich schlage vor, dass …', 'Wie wäre es, wenn wir …?', 'Gute Idee, aber …', 'Da bin ich nicht sicher, weil …', 'Dann machen wir es so: …'],
        muster: 'A: Ich schlage vor, dass am ersten Tag die Schichtleiterin den Betrieb zeigt. Sie kennt alle Bereiche.\nB: Gute Idee, aber sie hat am Montag viel zu tun. Wie wäre es, wenn wir das am Montagnachmittag machen?\nA: Einverstanden. Und die Unterlagen – Ausweis, Arbeitskleidung, Spindschlüssel – sollte das Personalbüro schon vorher fertig machen.\nB: Ja, sonst stehen sie am ersten Tag ohne Ausweis da. Und wegen der Sprache: Wir könnten eine Liste mit wichtigen Wörtern aus dem Lager machen.\nA: Super, mit Bildern! Und jede Kollegin bekommt einen Paten aus dem Team.\nB: Und am Freitag frühstücken wir alle zusammen, dann lernen sie das Team kennen.\nA: Dann machen wir es so: Montag Rundgang, Unterlagen vorher, Wörterliste, Paten und Freitag Frühstück.',
        check: ['Eigene Vorschläge gemacht', 'Auf die Vorschläge des Partners reagiert und begründet', 'Höflich widersprochen (Gute Idee, aber …)', 'Zum Schluss eine gemeinsame Lösung zusammengefasst'] }
    ] }
  ]
};
})();
