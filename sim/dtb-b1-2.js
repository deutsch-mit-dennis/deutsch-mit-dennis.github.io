/* DTB B1 – Modelltest 2. Eigene Übungsaufgaben im Stil der Prüfung (Format: tools/sim/SCHEMA.md). */
(() => {
const CALL = [
  { s: 'f', t: 'Autohaus Becker, Werkstatt, guten Tag, Sie sprechen mit Novak.' },
  { s: 'm', t: 'Ja, guten Tag, hier ist Lehmann, von der Firma Grünwerk Gartenbau in Hattingen. Ich hätte gern Herrn Schröder gesprochen, wegen unserer Firmenwagen.' },
  { s: 'f', t: 'Herr Schröder ist gerade in einer Besprechung. Kann ich ihm etwas ausrichten?' },
  { s: 'm', t: 'Ja, bitte. Also, bei uns müssen drei Transporter zur Inspektion, und bei einem davon geht auch die Klimaanlage nicht. Wir würden die Wagen gern am Montag, den achtzehnten, bringen, ganz früh, so um sieben Uhr.' },
  { s: 'f', t: 'Drei Transporter, Montag, achtzehnter, sieben Uhr … Und bei einem die Klimaanlage. Welcher ist das?' },
  { s: 'm', t: 'Das ist der weiße, mit dem Kennzeichen E N, G W, vier zwei eins. Ach nee, Moment, Entschuldigung: vier zwei sieben. E N, G W, vier zwei sieben.' },
  { s: 'f', t: 'Vier zwei sieben, okay. Brauchen Sie für die Zeit Ersatzfahrzeuge?' },
  { s: 'm', t: 'Ja, das wäre wichtig, mindestens zwei. Wir haben in der Woche viele Aufträge. Ein Ersatzwagen sollte eine Anhängerkupplung haben.' },
  { s: 'f', t: 'Gut, ich notiere: zwei Ersatzwagen, einer mit Anhängerkupplung. Soll Herr Schröder Sie zurückrufen?' },
  { s: 'm', t: 'Ja, bitte heute noch, wenn das geht, bis sechzehn Uhr. Meine Handynummer ist null eins sieben null, drei vier, fünf sechs, neun null. Ich wiederhole: null eins sieben null, drei vier, fünf sechs, neun null.' },
  { s: 'f', t: 'Alles klar, Herr Lehmann. Ich gebe das gleich weiter.' },
  { s: 'm', t: 'Vielen Dank. Auf Wiederhören!' }
];
(window.SIM = window.SIM || {})['dtb-b1-2'] = {
  id: 'dtb-b1-2', title: 'DTB B1 – Deutsch-Test für den Beruf (Modelltest 2)', short: 'DTB B1 · Test 2', provider: 'telc', level: 'B1',
  intro: 'Der zweite komplette Übungstest für den DTB B1 – mit neuen Situationen aus Pflege, Gastronomie, Handwerk und Büro.',
  rule: 'dtb',
  skills: { lesen: { label: 'Lesen', max: 60 }, hoeren: { label: 'Hören', max: 60 }, schreiben: { label: 'Schreiben', max: 60 }, sprechen: { label: 'Sprechen', max: 60 } },
  sections: [
    { id: 'lesen', title: 'Lesen', minutes: 40, note: 'Vier Teile. Arbeite zügig – pro Teil ca. 10 Minuten.', parts: [
      { title: 'Lesen Teil 1: Stellenanzeigen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? Jede Anzeige können Sie nur einmal verwenden. Für eine Person gibt es keine passende Anzeige. Markieren Sie dann x.',
        material: [
          { h: 'a) Restaurant Seeblick, Bochum', t: 'Wir suchen Küchenhilfe (m/w/d) in Vollzeit. Arbeitszeit: Di–Sa ab 15 Uhr, Sonntag und Montag frei. Erfahrung in der Gastronomie erwünscht. Kostenloses Personalessen.' },
          { h: 'b) Ambulanter Pflegedienst Herzenssache', t: 'Pflegehelfer/innen in Teilzeit (20 Std.) für die Frühtour, 6:30–11:00 Uhr. Führerschein Klasse B ist Pflicht, Dienstwagen wird gestellt. Pflegebasiskurs kann bei uns gemacht werden.' },
          { h: 'c) Malerbetrieb Farbenfroh', t: 'Wir bilden aus! Ausbildung Maler/in und Lackierer/in ab 1. August. Hauptschulabschluss reicht. Auch für Quereinsteiger über 25 Jahre.' },
          { h: 'd) Stadtbäckerei Möller', t: 'Verkäufer/in für unsere Filiale am Bahnhof, Minijob (538 €), nur am Wochenende, Sa und So 6–12 Uhr. Freundliches Auftreten, gute Deutschkenntnisse.' },
          { h: 'e) Kita Regenbogen', t: 'Hauswirtschaftskraft (m/w/d) für unsere Kita-Küche, 30 Std./Woche, Mo–Fr 8–14 Uhr. Sie kochen frisch für 60 Kinder. Gesundheitszeugnis erforderlich.' },
          { h: 'f) Elektro Kaya GmbH', t: 'Elektroniker/in für Energie- und Gebäudetechnik mit abgeschlossener Ausbildung. Ausländische Abschlüsse willkommen – wir helfen bei der Anerkennung.' },
          { h: 'g) Hotel Rheinterrasse', t: 'Rezeptionist/in in Vollzeit, Schichtdienst. Sehr gute Englischkenntnisse sind Voraussetzung, weitere Sprachen ein Plus. Erfahrung mit Buchungssoftware.' },
          { h: 'h) Paketdienst Flink', t: 'Fahrer/in für Paketzustellung, Vollzeit oder Teilzeit, Führerschein Klasse B. Arbeitsbeginn 7 Uhr. Sie fahren unsere E-Transporter.' }
        ],
        opts: ['a) Restaurant Seeblick', 'b) Pflegedienst Herzenssache', 'c) Malerbetrieb Farbenfroh', 'd) Stadtbäckerei Möller', 'e) Kita Regenbogen', 'f) Elektro Kaya', 'g) Hotel Rheinterrasse', 'h) Paketdienst Flink', 'x) keine passende Anzeige'],
        items: [
          { q: '1. Mariam war in Syrien Elektrikerin und hat dort ihre Ausbildung abgeschlossen. Sie möchte in ihrem Beruf arbeiten.', a: 5, why: 'Elektro Kaya sucht Elektroniker/innen mit Ausbildung, „Ausländische Abschlüsse willkommen“.' },
          { q: '2. Juan studiert unter der Woche und sucht einen Nebenjob nur für Samstag und Sonntag.', a: 3, why: 'Stadtbäckerei Möller: Minijob „nur am Wochenende“.' },
          { q: '3. Fatma hat zwei Kinder in der Schule und möchte nur vormittags arbeiten. Sie hat einen Führerschein und möchte gern mit älteren Menschen arbeiten.', a: 1, why: 'Pflegedienst: Teilzeit 6:30–11 Uhr, Führerschein nötig, Arbeit mit Pflegebedürftigen.' },
          { q: '4. Dmitri ist 31 Jahre alt, hat bisher im Lager gearbeitet und möchte jetzt eine Ausbildung im Handwerk machen.', a: 2, why: 'Malerbetrieb: Ausbildung, „auch für Quereinsteiger über 25 Jahre“.' },
          { q: '5. Amira hat in einem Hotel in Tunesien an der Rezeption gearbeitet. Sie spricht Arabisch, Französisch und Deutsch, aber kaum Englisch.', a: 8, why: 'Das Hotel verlangt „sehr gute Englischkenntnisse“ – das passt nicht. Keine andere Anzeige passt → x.' }
        ] },
      { title: 'Lesen Teil 2: Informationen zu Weiterbildungen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie den Text und die Aufgaben 6–9. Welche Antwort (a, b oder c) passt am besten?',
        material: [{ h: 'Weiterbildungsprogramm der IHK-Akademie Ostwestfalen – Frühjahr', t: '1. Hygieneschulung für die Gastronomie\nPflicht für alle, die mit Lebensmitteln arbeiten. Die Schulung dauert vier Stunden und findet jeden ersten Montag im Monat statt. Wichtig: Sie bekommen die Bescheinigung nur, wenn Sie den ganzen Kurs besuchen. Kosten: 45 Euro. Termine können Sie auch online buchen.\n\n2. Kommunikation im Pflegealltag\nFür Pflegekräfte und Pflegehelfer/innen mit Deutsch ab B1. Sie üben Gespräche mit Patienten, Angehörigen und Ärzten und lernen, wie man eine Pflegedokumentation schreibt. Sechs Samstage, 9–14 Uhr. Die Kosten übernimmt in vielen Fällen der Arbeitgeber.\n\n3. Führerschein für Gabelstapler – Auffrischung\nFür alle, die schon einen Staplerschein haben, aber lange nicht mehr gefahren sind. Ein Tag Praxis, keine Prüfung. Bringen Sie bitte Ihren alten Fahrausweis mit.\n\n4. Buchhaltung für kleine Betriebe\nOnline-Kurs mit Videos zum Selbstlernen. Sie können jederzeit beginnen und haben drei Monate Zeit. Einmal pro Woche gibt es eine Fragestunde mit einer Dozentin per Video. Am Ende erhalten Sie ein Zertifikat, wenn Sie den Abschlusstest bestehen.' }],
        items: [
          { q: '6. Die Hygieneschulung …', opts: ['a) dauert einen ganzen Tag.', 'b) gibt es einmal im Monat.', 'c) ist kostenlos.'], a: 1, why: '„jeden ersten Montag im Monat“; sie dauert vier Stunden und kostet 45 Euro.' },
          { q: '7. Im Kurs „Kommunikation im Pflegealltag“ …', opts: ['a) lernt man auch, Berichte über Patienten zu schreiben.', 'b) braucht man kein Deutsch.', 'c) bezahlt man immer selbst.'], a: 0, why: 'Man lernt, „wie man eine Pflegedokumentation schreibt“.' },
          { q: '8. Für die Stapler-Auffrischung …', opts: ['a) muss man eine Prüfung machen.', 'b) braucht man keinen Staplerschein.', 'c) muss man den alten Fahrausweis mitbringen.'], a: 2, why: '„Bringen Sie bitte Ihren alten Fahrausweis mit.“ Eine Prüfung gibt es nicht.' },
          { q: '9. Beim Buchhaltungskurs …', opts: ['a) bekommt jeder Teilnehmende ein Zertifikat.', 'b) trifft man die Dozentin jeden Tag.', 'c) kann man selbst bestimmen, wann man anfängt.'], a: 2, why: '„Sie können jederzeit beginnen“; das Zertifikat gibt es nur nach bestandenem Test.' }
        ] },
      { title: 'Lesen Teil 3: Arbeitsanweisungen verstehen', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie den Text und die Aufgaben 10–13. Welche Antwort (a, b oder c) passt am besten?',
        material: [{ h: 'Seniorenzentrum Am Rosengarten – Hinweise für neue Mitarbeitende im Wohnbereich 2', t: '• Bitte kommen Sie zehn Minuten vor Dienstbeginn. Die Übergabe zwischen Früh- und Spätdienst beginnt pünktlich um 13:30 Uhr im Dienstzimmer.\n• Schmuck, Ringe und Uhren sind bei der Arbeit am Bewohner nicht erlaubt. Ein schlichter Ehering ist die einzige Ausnahme. Ihre privaten Sachen schließen Sie bitte im Spind ein.\n• Desinfizieren Sie die Hände vor und nach jedem Kontakt mit Bewohnern. Handschuhe ersetzen die Desinfektion nicht.\n• Medikamente stellt nur die Pflegefachkraft. Als Pflegehelfer/in dürfen Sie Medikamente reichen, aber nur, wenn sie vorher gestellt und kontrolliert wurden.\n• Stürze von Bewohnern melden Sie sofort der Schichtleitung – auch wenn die Person keine Schmerzen hat. Heben Sie gestürzte Bewohner nicht allein auf.\n• Private Handys dürfen nur im Pausenraum benutzt werden. Fotos von Bewohnern sind grundsätzlich verboten.\n• Krankmeldungen bitte bis 6 Uhr telefonisch an die Wohnbereichsleitung, nicht per SMS.' }],
        items: [
          { q: '10. Was gilt für Schmuck?', opts: ['a) Man darf gar keinen Schmuck tragen, auch keinen Ehering.', 'b) Ein einfacher Ehering ist erlaubt.', 'c) Uhren sind erlaubt, Ringe nicht.'], a: 1, why: '„Ein schlichter Ehering ist die einzige Ausnahme.“' },
          { q: '11. Pflegehelfer/innen …', opts: ['a) dürfen gestellte und kontrollierte Medikamente geben.', 'b) stellen die Medikamente für den ganzen Tag.', 'c) dürfen gar nichts mit Medikamenten machen.'], a: 0, why: '„Medikamente reichen, aber nur, wenn sie vorher gestellt und kontrolliert wurden.“' },
          { q: '12. Wenn ein Bewohner stürzt, …', opts: ['a) hebt man ihn sofort auf.', 'b) meldet man es nur bei Schmerzen.', 'c) informiert man sofort die Schichtleitung.'], a: 2, why: '„Stürze … melden Sie sofort der Schichtleitung – auch wenn die Person keine Schmerzen hat.“' },
          { q: '13. Wenn man krank ist, …', opts: ['a) schreibt man eine SMS an die Kollegen.', 'b) ruft man bis 6 Uhr die Wohnbereichsleitung an.', 'c) sagt man es bei der Übergabe um 13:30 Uhr.'], a: 1, why: '„Krankmeldungen bitte bis 6 Uhr telefonisch an die Wohnbereichsleitung, nicht per SMS.“' }
        ] },
      { title: 'Lesen Teil 4: Aufgaben und Aufgabenverteilung', skill: 'lesen', pts: 3,
        instr: 'Lesen Sie die E-Mail und die Aussagen 14–18. Sind die Aussagen richtig oder falsch?',
        material: [{ h: 'E-Mail', t: 'Von: Thomas Reuter (Küchenchef)\nAn: Küchenteam Restaurant Seeblick\nBetreff: Hochzeitsfeier am Samstag\n\nHallo zusammen,\n\nam Samstag haben wir die große Hochzeitsfeier mit 120 Gästen. Das Restaurant ist an diesem Abend nur für die Hochzeit reserviert, normale Gäste kommen nicht. Hier die Planung:\n\n– Wir fangen am Samstag schon um 12 Uhr an, nicht wie sonst um 15 Uhr. Dafür habt ihr am Dienstag frei.\n– Luca und Aynur bereiten ab 12 Uhr die Vorspeisen vor. Die Desserts macht wie immer Frau Schmid, und zwar schon am Freitag.\n– Neu: Die Getränke organisiert dieses Mal nicht die Küche, sondern das Serviceteam. Ihr müsst euch also nicht um den Sekt kümmern.\n– 15 Gäste essen vegetarisch, 3 Gäste vegan. Bitte genau auf die Listen am Pass achten!\n– Die Lieferung vom Fleischer kommt am Samstag um 10 Uhr. Kemal nimmt sie an und kontrolliert die Ware.\n\nWer am Samstag nicht bis Mitternacht bleiben kann, sagt mir bitte bis Mittwoch Bescheid.\n\nDanke und viele Grüße\nThomas' }],
        opts: ['Richtig', 'Falsch'],
        items: [
          { q: '14. Am Samstagabend können auch andere Gäste im Restaurant essen.', a: 1, why: '„Das Restaurant ist an diesem Abend nur für die Hochzeit reserviert“.' },
          { q: '15. Für den frühen Beginn am Samstag bekommt das Team einen freien Tag.', a: 0, why: '„Dafür habt ihr am Dienstag frei.“' },
          { q: '16. Frau Schmid macht die Desserts am Samstag ab 12 Uhr.', a: 1, why: 'Frau Schmid macht die Desserts „schon am Freitag“.' },
          { q: '17. Die Küche muss sich nicht um die Getränke kümmern.', a: 0, why: '„Die Getränke organisiert dieses Mal … das Serviceteam.“' },
          { q: '18. Kemal kontrolliert die Lieferung vom Fleischer.', a: 0, why: '„Kemal nimmt sie an und kontrolliert die Ware.“' }
        ] }
    ] },
    { id: 'lesen-schreiben', title: 'Lesen und Schreiben', minutes: 20, note: 'Erst die E-Mail und die Notiz genau lesen, dann die Aufgaben lösen und die Antwort schreiben.', parts: [
      { title: 'Lesen und Schreiben Teil 1: Eine Kundenanfrage verstehen', skill: 'lesen', pts: 3,
        instr: 'Sie arbeiten bei der Firma Malerbetrieb Farbenfroh in Bielefeld. Lesen Sie die E-Mail eines Kunden und die Notiz Ihres Chefs. Lösen Sie die Aufgaben 19 und 20. Welche Antwort (a, b oder c) passt am besten?',
        material: [
          { h: 'E-Mail von Herrn Wagner', t: 'Von: Peter Wagner, Hausverwaltung Wagner & Partner, Bielefeld\nAn: info@farbenfroh-bielefeld.de\nBetreff: Treppenhaus Bahnhofstraße 12\n\nSehr geehrte Damen und Herren,\n\nIhre Firma hat letzte Woche das Treppenhaus in der Bahnhofstraße 12 gestrichen. Leider haben sich mehrere Mieter bei mir beschwert: Im zweiten Stock gibt es an der Wand Flecken, und auf dem Boden im Erdgeschoss sind noch Farbspritzer. Bitte kümmern Sie sich darum.\n\nAußerdem möchte ich fragen, ob Sie im Frühjahr auch die Fassade des Hauses streichen können. Bitte schicken Sie mir dafür ein Angebot.\n\nMit freundlichen Grüßen\nPeter Wagner' },
          { h: 'Notiz des Chefs', t: 'Bitte heute noch Herrn Wagner antworten!\n– entschuldigen: Farbe war vom Hersteller fehlerhaft\n– kostenlos nachbessern: Mittwoch, 8 Uhr (Herr Baumann)\n– Fassade: ja, gern – vorher Besichtigung nötig, Terminvorschlag: nächster Freitag, 14 Uhr\n– Rückfragen: Handy Chef 0171 / 22 84 61\nM. Krüger' }
        ],
        items: [
          { q: '19. Warum schreibt Herr Wagner?', opts: ['a) Die Mieter möchten eine andere Farbe im Treppenhaus.', 'b) Die Firma hat im Treppenhaus nicht sauber gearbeitet.', 'c) Das Treppenhaus wurde noch nicht gestrichen.'], a: 1, why: 'Es gibt „Flecken“ an der Wand und „Farbspritzer“ auf dem Boden.' },
          { q: '20. Was möchte Herr Wagner außerdem?', opts: ['a) Er möchte einen Termin für die Besichtigung am Freitag.', 'b) Er möchte die Rechnung für das Treppenhaus.', 'c) Er möchte ein Angebot für die Fassade.'], a: 2, why: '„Bitte schicken Sie mir dafür ein Angebot.“ (Fassade)' }
        ] },
      { kind: 'write', title: 'Lesen und Schreiben Teil 2: Eine Antwort-E-Mail schreiben', skill: 'schreiben', pts: 25,
        instr: 'Schreiben Sie eine Antwort an Herrn Wagner. Berücksichtigen Sie alle Punkte aus der Notiz Ihres Chefs. Schreiben Sie mindestens 70 Wörter. Achten Sie auf Anrede und Gruß.',
        options: [{ h: 'Aufgabe', situation: 'Sie arbeiten im Büro der Firma Malerbetrieb Farbenfroh. Herr Wagner hat sich über die Arbeit im Treppenhaus beschwert und fragt nach einem Angebot für die Fassade. Ihr Chef, Herr Krüger, hat Ihnen eine Notiz geschrieben (siehe Teil 1).', task: 'Antworten Sie Herrn Wagner per E-Mail und setzen Sie die Anweisungen Ihres Chefs um.',
          points: ['sich entschuldigen und den Grund nennen', 'eine kostenlose Nachbesserung anbieten (Mittwoch, 8 Uhr)', 'auf die Frage nach der Fassade antworten (Besichtigung nötig, Terminvorschlag)', 'Kontaktmöglichkeit für Fragen nennen'],
          muster: 'Sehr geehrter Herr Wagner,\n\nvielen Dank für Ihre E-Mail. Es tut uns sehr leid, dass die Arbeit im Treppenhaus in der Bahnhofstraße 12 nicht in Ordnung ist. Leider war die Farbe vom Hersteller fehlerhaft, deshalb sind Flecken entstanden.\n\nWir bessern die Stellen natürlich kostenlos nach. Unser Mitarbeiter, Herr Baumann, kommt am Mittwoch um 8 Uhr und entfernt auch die Farbspritzer im Erdgeschoss.\n\nGern streichen wir im Frühjahr auch die Fassade. Für ein genaues Angebot müssen wir das Haus aber vorher besichtigen. Passt Ihnen nächster Freitag um 14 Uhr?\n\nBei Fragen erreichen Sie meinen Chef, Herrn Krüger, unter 0171 / 22 84 61.\n\nMit freundlichen Grüßen\nMalerbetrieb Farbenfroh' }],
        minWords: 70,
        check: ['Formelle Anrede („Sehr geehrter Herr Wagner“) und Gruß („Mit freundlichen Grüßen“)', 'Entschuldigung mit Grund (fehlerhafte Farbe)', 'Kostenlose Nachbesserung: Mittwoch, 8 Uhr, Herr Baumann', 'Fassade: Besichtigung nötig, Terminvorschlag Freitag 14 Uhr', 'Telefonnummer bzw. Ansprechpartner genannt', 'Sie-Form durchgehend, höflicher Ton', 'Mindestens 70 Wörter, Sätze verbunden (deshalb, aber, außerdem)'] }
    ] },
    { id: 'hoeren', title: 'Hören', minutes: 20, note: 'Teil 1–3 hörst du nur einmal, Teil 4 zweimal. Lies die Aufgaben immer vor dem Hören.', parts: [
      { title: 'Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'f', t: 'Sag mal, Jannik, hast du die Bestellung für den Großmarkt schon rausgeschickt?' },
            { s: 'm', t: 'Nee, noch nicht. Ich wollte erst noch im Kühlhaus nachschauen, was wir noch haben.' },
            { s: 'f', t: 'Mach das bitte schnell, die Bestellung muss bis elf raus, sonst kommt die Lieferung erst übermorgen. Und denk an die Sahne, die war letzte Woche schon knapp.' },
            { s: 'm', t: 'Okay. Wie viel Sahne soll ich bestellen? Wieder zehn Liter?' },
            { s: 'f', t: 'Lieber fünfzehn. Am Wochenende haben wir die zwei Geburtstagsfeiern.' },
            { s: 'm', t: 'Fünfzehn Liter, alles klar. Ich schick dir die Liste, bevor ich bestelle, ja?' },
            { s: 'f', t: 'Ja, gute Idee, dann schau ich noch mal drüber.' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'm', t: 'Frau Ivanova, haben Sie kurz Zeit? Die Kundin von gestern, Frau Hellwig, hat angerufen.' },
            { s: 'f', t: 'Oh, die mit der Küche? Ist was nicht in Ordnung?' },
            { s: 'm', t: 'Doch, eigentlich ist sie sehr zufrieden. Aber die Spülmaschine ist noch nicht angeschlossen. Sie dachte, wir machen das auch.' },
            { s: 'f', t: 'Hm, das steht aber nicht im Auftrag. Dafür muss ein Elektriker kommen.' },
            { s: 'm', t: 'Ja, das weiß ich. Aber sie ist eine gute Kundin. Können wir nicht Herrn Kaya fragen? Der arbeitet doch öfter mit uns zusammen.' },
            { s: 'f', t: 'Gute Idee. Rufen Sie ihn an und fragen Sie, ob er diese Woche Zeit hat. Und sagen Sie Frau Hellwig, dass das extra kostet. Nicht, dass sie sich später über die Rechnung ärgert.' },
            { s: 'm', t: 'Mach ich. Ich ruf erst Herrn Kaya an und dann sie.' }
          ] },
          { h: 'Gespräch 3', lines: [
            { s: 'f', t: 'Herr Bauer, ich habe ein Problem mit meinem Dienstplan für Dezember.' },
            { s: 'm', t: 'Ja? Was ist denn los?' },
            { s: 'f', t: 'Ich bin am vierundzwanzigsten und am fünfundzwanzigsten eingeteilt. Aber ich habe doch schon im Sommer gesagt, dass ich an Weihnachten zu meiner Familie nach Polen fahre.' },
            { s: 'm', t: 'Oh, das tut mir leid, das habe ich wohl übersehen. Haben Sie es in die Urlaubsliste eingetragen?' },
            { s: 'f', t: 'Nein, ich hab es Ihnen nur gesagt.' },
            { s: 'm', t: 'Okay. Dann tragen Sie es bitte heute noch in die Liste ein. Ich frage Herrn Osei, ob er tauschen kann. Er wollte sowieso lieber an Silvester frei haben.' },
            { s: 'f', t: 'Dann arbeite ich gern an Silvester. Danke!' }
          ] },
          { h: 'Gespräch 4', lines: [
            { s: 'm', t: 'Hallo, Frau Schulz. Sie wollten mich sprechen?' },
            { s: 'f', t: 'Ja, Herr Nowak. Es geht um die neue Kaffeemaschine in der Teeküche. Die ist seit gestern kaputt, sie zeigt immer nur „Entkalken“ an.' },
            { s: 'm', t: 'Ah, das kenn ich. Die muss man einfach entkalken, das dauert zwanzig Minuten. Das Mittel steht im Schrank unter der Spüle.' },
            { s: 'f', t: 'Ach so, gut. Und wer macht das normalerweise?' },
            { s: 'm', t: 'Eigentlich sollte das reihum gehen, jede Woche jemand anders. Aber es macht keiner. Vielleicht hängen wir einen Plan an die Tür?' },
            { s: 'f', t: 'Gute Idee. Ich schreibe den Plan und hänge ihn heute Nachmittag auf.' }
          ] }
        ],
        items: [
          { au: 0, q: '21. Jannik hat die Bestellung schon abgeschickt.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Nee, noch nicht.“' },
          { au: 0, q: '22. Wie viel Sahne soll Jannik bestellen?', opts: ['a) 10 Liter.', 'b) 2 Liter.', 'c) 15 Liter.'], a: 2, why: '„Lieber fünfzehn.“' },
          { au: 1, q: '23. Frau Hellwig ist mit der neuen Küche unzufrieden.', opts: ['Richtig', 'Falsch'], a: 1, why: '„eigentlich ist sie sehr zufrieden“; nur die Spülmaschine ist nicht angeschlossen.' },
          { au: 1, q: '24. Was soll der Mann zuerst tun?', opts: ['a) Frau Hellwig eine Rechnung schicken.', 'b) Die Spülmaschine selbst anschließen.', 'c) Den Elektriker Herrn Kaya anrufen.'], a: 2, why: '„Ich ruf erst Herrn Kaya an und dann sie.“' },
          { au: 2, q: '25. Die Frau hat ihren Urlaub in die Liste eingetragen.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Nein, ich hab es Ihnen nur gesagt.“' },
          { au: 2, q: '26. Was ist die Lösung?', opts: ['a) Die Frau tauscht mit Herrn Osei und arbeitet an Silvester.', 'b) Die Frau fährt erst nach Weihnachten nach Polen.', 'c) Herr Bauer arbeitet selbst an Weihnachten.'], a: 0, why: 'Herr Osei soll tauschen; die Frau sagt: „Dann arbeite ich gern an Silvester.“' },
          { au: 3, q: '27. Die Kaffeemaschine ist kaputt und muss repariert werden.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Die muss man einfach entkalken“ – sie ist nicht wirklich kaputt.' },
          { au: 3, q: '28. Was macht Frau Schulz?', opts: ['a) Sie kauft ein neues Entkalkungsmittel.', 'b) Sie ruft den Kundendienst an.', 'c) Sie schreibt einen Plan für die Teeküche.'], a: 2, why: '„Ich schreibe den Plan und hänge ihn heute Nachmittag auf.“' }
        ] },
      { title: 'Hören Teil 2: Meinungen', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören eine Teambesprechung in einem Seniorenheim. Sie hören das Gespräch einmal. Was meinen die Personen? Ordnen Sie zu: Welche Aussage (a–d) passt zu welcher Person? Zwei Aussagen passen nicht.',
        audio: [{ h: 'Teambesprechung', lines: [
          { s: 'f', t: 'So, letzter Punkt: Die Leitung möchte, dass wir ab Februar die Pflegedokumentation auf Tablets schreiben. Nicht mehr auf Papier im Dienstzimmer, sondern direkt beim Bewohner im Zimmer. Was sagt ihr dazu?' },
          { s: 'm', t: 'Also, ich finde das gut. Jetzt schreiben wir am Ende der Schicht alles auf einmal auf, und dann vergisst man die Hälfte. Wenn ich es gleich im Zimmer eintrage, ist es genauer.' },
          { s: 'f', t: 'Danke, Herr Petrović. Frau Akın?' },
          { s: 'f2', t: 'Grundsätzlich ist das okay. Aber ich mache mir Sorgen, dass wir dann im Zimmer mehr aufs Tablet schauen als auf die Bewohner. Die alten Menschen wollen mit uns reden. Ich finde, wir sollten erst nach der Pflege schreiben, draußen auf dem Flur.' },
          { s: 'f', t: 'Das ist ein wichtiger Punkt. Und die Schulung machen wir übrigens im Januar, während der Arbeitszeit.' }
        ] }],
        opts: ['a) Die Dokumentation wird genauer, wenn man sie sofort schreibt.', 'b) Tablets sind zu teuer für das Seniorenheim.', 'c) Man soll die Dokumentation nicht vor den Bewohnern schreiben.', 'd) Die Schulung soll in der Freizeit stattfinden.'],
        items: [
          { au: 0, q: '29. Herr Petrović', a: 0, why: '„Wenn ich es gleich im Zimmer eintrage, ist es genauer.“' },
          { au: 0, q: '30. Frau Akın', a: 2, why: '„wir sollten erst nach der Pflege schreiben, draußen auf dem Flur.“ (b sagt niemand, d ist falsch: Schulung während der Arbeitszeit)' }
        ] },
      { title: 'Hören Teil 3: Gespräche über Produkte und Abläufe', skill: 'hoeren', pts: 3, plays: 1,
        instr: 'Sie hören zwei Gespräche. Sie hören jedes Gespräch einmal. Lösen Sie zu jedem Gespräch zwei Aufgaben. Welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'm', t: 'Frau Demir, ich zeige Ihnen noch kurz die neue Spülmaschine. Die ist anders als die alte.' },
            { s: 'f', t: 'Ja, gern. Die sieht kompliziert aus.' },
            { s: 'm', t: 'Ist sie gar nicht. Sie drücken einfach auf den grünen Knopf. Dann läuft das normale Programm, das dauert nur drei Minuten. Für Töpfe und Bleche nehmen Sie bitte den blauen Knopf, das dauert länger, ungefähr acht Minuten.' },
            { s: 'f', t: 'Grün für Geschirr, blau für Töpfe. Okay. Und das Spülmittel?' },
            { s: 'm', t: 'Das kommt automatisch aus dem Kanister unten. Wenn die rote Lampe leuchtet, ist er leer. Dann holen Sie einen neuen aus dem Keller, aber bitte mit Handschuhen, das Zeug ist sehr scharf.' },
            { s: 'f', t: 'Mit Handschuhen, verstanden.' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'f', t: 'Herr Lindner, Sie wollten wissen, wie das mit der Firmenkarte für das Tanken funktioniert?' },
            { s: 'm', t: 'Ja, genau. Ich fahre ab nächster Woche den Transporter.' },
            { s: 'f', t: 'Also, Sie können damit an allen Tankstellen von Aral und Shell tanken. Die Geheimzahl bekommen Sie in einem Brief, nicht zusammen mit der Karte. Und ganz wichtig: Sie müssen jedes Mal den Kilometerstand eingeben, wenn Sie bezahlen.' },
            { s: 'm', t: 'Okay. Und wenn ich mal privat tanke? Also für mein eigenes Auto?' },
            { s: 'f', t: 'Nein, das geht auf keinen Fall. Die Karte ist nur für den Firmenwagen. Und die Quittungen geben Sie bitte am Ende vom Monat bei mir im Büro ab.' },
            { s: 'm', t: 'Alles klar. Danke!' }
          ] }
        ],
        items: [
          { au: 0, q: '31. Welches Programm nimmt man für Töpfe?', opts: ['a) Das Programm mit dem grünen Knopf.', 'b) Das Programm mit dem roten Knopf.', 'c) Das Programm mit dem blauen Knopf.'], a: 2, why: '„Für Töpfe und Bleche nehmen Sie bitte den blauen Knopf“.' },
          { au: 0, q: '32. Was muss Frau Demir beim Spülmittel beachten?', opts: ['a) Sie muss es bei jedem Spülgang selbst einfüllen.', 'b) Sie muss beim Wechseln Handschuhe tragen.', 'c) Sie muss es im Büro bestellen.'], a: 1, why: '„Dann holen Sie einen neuen aus dem Keller, aber bitte mit Handschuhen“.' },
          { au: 1, q: '33. Die Geheimzahl für die Tankkarte …', opts: ['a) kommt mit einem eigenen Brief.', 'b) steht auf der Karte.', 'c) bekommt Herr Lindner von der Tankstelle.'], a: 0, why: '„Die Geheimzahl bekommen Sie in einem Brief, nicht zusammen mit der Karte.“' },
          { au: 1, q: '34. Was muss Herr Lindner mit den Quittungen machen?', opts: ['a) Er gibt sie jeden Tag ab.', 'b) Er schickt sie per Post.', 'c) Er bringt sie am Monatsende ins Büro.'], a: 2, why: '„die Quittungen geben Sie bitte am Ende vom Monat bei mir im Büro ab.“' }
        ] },
      { title: 'Hören Teil 4: Anliegen', skill: 'hoeren', pts: 3, plays: 2,
        instr: 'Sie hören fünf Nachrichten auf dem Anrufbeantworter bzw. der Mailbox. Sie hören jede Nachricht zweimal. Welche Antwort (a, b oder c) passt am besten?',
        audio: [
          { h: 'Nachricht 1', lines: [{ s: 'f', t: 'Guten Morgen, Herr Ahmadi, hier ist Petra Sommer, Personalabteilung. Ihre Lohnabrechnung für Oktober war leider falsch, die Nachtzuschläge fehlen. Das korrigieren wir mit der Novemberabrechnung, Sie müssen nichts tun. Sie bekommen das Geld also Ende November. Bei Fragen erreichen Sie mich unter Durchwahl zwei vier sieben. Schönen Tag noch!' }] },
          { h: 'Nachricht 2', lines: [{ s: 'm', t: 'Hallo Frau Okoye, hier ist Ralf von der Spätschicht. Du, kannst du morgen für mich die Spätschicht übernehmen? Meine Frau bekommt ihr Baby, wahrscheinlich morgen, und ich möchte dabei sein. Ich übernehme dafür gern deine Schicht am Samstag. Ruf mich bitte bis heute Abend zurück, dann sag ich dem Chef Bescheid. Danke!' }] },
          { h: 'Nachricht 3', lines: [{ s: 'f', t: 'Ja, hallo, hier ist Familie Peters aus der Lindenallee fünf. Ihr Pflegedienst kommt doch jeden Morgen zu meiner Mutter. Nächste Woche ist sie bei uns im Urlaub, von Montag bis Freitag. Sie müssen also in dieser Zeit nicht kommen. Am Samstag ist sie wieder zu Hause. Danke schön!' }] },
          { h: 'Nachricht 4', lines: [{ s: 'm', t: 'Guten Tag, hier spricht Berger von der Firma Kälte-Service. Sie haben uns wegen Ihres Kühlraums angerufen. Unser Techniker kommt morgen zwischen acht und zehn Uhr. Bitte sorgen Sie dafür, dass jemand da ist, der ihm den Raum zeigen kann. Und räumen Sie bitte die Regale vor der Rückwand frei, damit er an das Gerät kommt.' }] },
          { h: 'Nachricht 5', lines: [{ s: 'f', t: 'Hallo, hier ist Sandra vom Empfang. Ich wollte nur kurz sagen: Das Paket mit Ihren neuen Arbeitsschuhen ist angekommen. Es liegt bei mir am Empfang. Sie können es heute bis siebzehn Uhr abholen, morgen bin ich nicht da, dann ist es bei Herrn Wolf im Lager.' }] }
        ],
        items: [
          { au: 0, q: '35. Was ist mit der Lohnabrechnung von Herrn Ahmadi?', opts: ['a) Er muss eine neue Abrechnung beantragen.', 'b) Er bekommt das fehlende Geld mit dem Novemberlohn.', 'c) Er hat zu viel Geld bekommen.'], a: 1, why: '„Das korrigieren wir mit der Novemberabrechnung, Sie müssen nichts tun.“' },
          { au: 1, q: '36. Was möchte Ralf?', opts: ['a) Frau Okoye soll morgen seine Schicht übernehmen.', 'b) Frau Okoye soll am Samstag arbeiten.', 'c) Frau Okoye soll den Chef anrufen.'], a: 0, why: '„kannst du morgen für mich die Spätschicht übernehmen?“; er sagt dem Chef selbst Bescheid.' },
          { au: 2, q: '37. Was soll der Pflegedienst tun?', opts: ['a) Nächste Woche zu Familie Peters kommen.', 'b) Am Samstag nicht kommen.', 'c) Von Montag bis Freitag nicht kommen.'], a: 2, why: '„Sie müssen also in dieser Zeit nicht kommen“ (Montag bis Freitag).' },
          { au: 3, q: '38. Was soll man vor dem Termin tun?', opts: ['a) Die Regale vor der Rückwand frei machen.', 'b) Den Kühlraum ausschalten.', 'c) Den Techniker zurückrufen.'], a: 0, why: '„räumen Sie bitte die Regale vor der Rückwand frei“.' },
          { au: 4, q: '39. Wo sind die Arbeitsschuhe morgen?', opts: ['a) Am Empfang.', 'b) Bei Herrn Wolf im Lager.', 'c) Bei Sandra zu Hause.'], a: 1, why: '„morgen bin ich nicht da, dann ist es bei Herrn Wolf im Lager.“' }
        ] }
    ] },
    { id: 'hoeren-schreiben', title: 'Hören und Schreiben', minutes: 5, note: 'Du hörst ein Telefonat zweimal. Mach schon beim ersten Hören Stichpunkte.', parts: [
      { title: 'Hören und Schreiben Teil 1: Ein Telefonat verstehen', skill: 'hoeren', pts: 3, plays: 2,
        instr: 'Sie arbeiten in der Werkstatt im Autohaus Becker in Essen. Sie hören ein Telefongespräch zweimal. Lösen Sie die Aufgabe 40. Welche Antwort (a, b oder c) passt am besten?',
        audio: [{ h: 'Telefongespräch', lines: CALL }],
        items: [{ au: 0, q: '40. Was möchte Herr Lehmann?', opts: ['a) Drei Transporter zur Inspektion bringen und Ersatzwagen bekommen.', 'b) Einen neuen Transporter mit Anhängerkupplung kaufen.', 'c) Nur die Klimaanlage in allen Wagen reparieren lassen.'], a: 0, why: 'Er möchte drei Transporter zur Inspektion bringen (einer mit kaputter Klimaanlage) und braucht zwei Ersatzwagen.' }] },
      { kind: 'write', title: 'Hören und Schreiben Teil 2: Eine Gesprächsnotiz schreiben', skill: 'schreiben', pts: 15, plays: 2,
        instr: 'Hören Sie das Telefongespräch noch einmal. Schreiben Sie für Ihren Kollegen Herrn Schröder eine Gesprächsnotiz. Notieren Sie die wichtigsten Informationen in Stichpunkten.',
        audio: [{ h: 'Telefongespräch (noch einmal)', lines: CALL }],
        options: [{ h: 'Gesprächsnotiz', situation: 'Herr Schröder ist Werkstattleiter im Autohaus Becker. Er war gerade in einer Besprechung.', task: 'Schreiben Sie eine Gesprächsnotiz für Herrn Schröder. Füllen Sie die Felder in Stichpunkten aus.',
          points: ['Wer? (Name, Firma, Telefon)', 'Anliegen', 'Termin / Details', 'Was tun?'],
          muster: 'Gesprächsnotiz für Herrn Schröder\n\nWer? Herr Lehmann, Firma Grünwerk Gartenbau, Hattingen – Handy 0170 / 34 56 90\nAnliegen: 3 Transporter zur Inspektion; beim weißen Wagen (EN-GW 427) Klimaanlage kaputt\nTermin / Details: Montag, 18., um 7 Uhr; 2 Ersatzwagen nötig, einer mit Anhängerkupplung\nWas tun? Herrn Lehmann heute bis 16 Uhr zurückrufen\n\nNovak, Werkstatt' }],
        minWords: 15,
        check: ['Name und Firma richtig (Lehmann, Grünwerk Gartenbau, Hattingen)', 'Telefonnummer vollständig und richtig', 'Anliegen: 3 Transporter Inspektion, Klimaanlage beim Wagen EN-GW 427', 'Termin: Montag, 18., 7 Uhr; 2 Ersatzwagen, einer mit Anhängerkupplung', 'Aufgabe: heute bis 16 Uhr zurückrufen'] }
    ] },
    { id: 'sprachbausteine', title: 'Sprachbausteine und Schreiben', minutes: 10, parts: [
      { title: 'Sprachbausteine Teil 1: Auf Anfragen und Vorschläge reagieren', skill: 'schreiben', pts: 1,
        instr: 'Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 41–46?',
        material: [{ h: 'E-Mail an den Teamleiter', t: 'Lieber Herr Koch,\n\nvielen Dank für Ihre Einladung zum Teamausflug am 12. Juni. {1}, und ich komme sehr gern mit.\n\nSie haben gefragt, wer einen Kuchen mitbringen kann. {2} einen Apfelkuchen backen, das mache ich gern.\n\nIhren Vorschlag, mit dem Fahrrad zu fahren, finde ich schön. {3}: Ich habe kein eigenes Fahrrad. Kann man vielleicht eins leihen?\n\nWegen der Fortbildung im Juli wollte ich Sie noch etwas fragen. {4}, ob die Firma die Kosten übernimmt?\n\nAußerdem habe ich gesehen, dass ich nächste Woche am Freitag Spätschicht habe. {5} mit Frau Lang tauschen? Sie hat schon zugestimmt.\n\n{6}\n\nViele Grüße\nSvetlana Morozova' }],
        items: [
          { q: '', opts: ['a) Das ist eine tolle Idee', 'b) Das ist mir egal', 'c) Das tut mir leid'], a: 0, why: 'Zustimmung, sie kommt gern mit: „Das ist eine tolle Idee“.' },
          { q: '', opts: ['a) Ich musste', 'b) Ich kann', 'c) Ich hätte'], a: 1, why: 'Angebot in der Gegenwart/Zukunft: „Ich kann einen Apfelkuchen backen“.' },
          { q: '', opts: ['a) Aber es gibt ein kleines Problem', 'b) Deshalb komme ich nicht', 'c) Das ist sehr teuer'], a: 0, why: 'Es folgt ein Problem (kein Fahrrad), aber sie kommt trotzdem.' },
          { q: '', opts: ['a) Wissen Sie schon', 'b) Haben Sie gesagt', 'c) Ich weiß'], a: 0, why: 'Indirekte Frage: „Wissen Sie schon, ob …?“' },
          { q: '', opts: ['a) Muss ich', 'b) Darf ich', 'c) Soll ich'], a: 1, why: 'Um Erlaubnis bitten: „Darf ich mit Frau Lang tauschen?“' },
          { q: '', opts: ['a) Ich warte auf Ihre Erlaubnis sofort.', 'b) Schreiben Sie mir nie wieder.', 'c) Ich freue mich auf Ihre Antwort.'], a: 2, why: 'Höflicher Schlusssatz in einer E-Mail an den Vorgesetzten.' }
        ] },
      { kind: 'write', title: 'Sprachbausteine und Schreiben Teil 2: Seine Meinung im Team-Chat schreiben', skill: 'schreiben', pts: 14,
        instr: 'Lesen Sie die Nachricht Ihres Chefs im Team-Chat. Schreiben Sie eine Antwort, in der Sie Ihre Meinung sagen und begründen. Schreiben Sie mindestens 40 Wörter.',
        material: [{ h: 'Team-Chat „Restaurant Seeblick – Küche“ – Nachricht von Küchenchef Thomas Reuter', t: 'Hallo Team, ich überlege, ob wir ab März montags auch mittags öffnen sollen, von 11:30 bis 14:30 Uhr. Dafür würden wir dann den Dienstagabend schließen. Was meint ihr? Schreibt mir eure Meinung bis Sonntag hier rein. Danke! Thomas' }],
        options: [{ h: 'Aufgabe', situation: 'Sie arbeiten in der Küche. Ihr Chef möchte die Öffnungszeiten ändern und fragt nach Ihrer Meinung.', task: 'Antworten Sie im Team-Chat: Sagen Sie Ihre Meinung, begründen Sie sie und machen Sie einen Vorschlag.',
          points: ['Meinung zum Vorschlag', 'Begründung (Vorteil oder Nachteil)', 'eigener Vorschlag oder Wunsch'],
          muster: 'Hallo Thomas, danke, dass du uns fragst! Ich finde die Idee mit dem Mittagstisch am Montag gut, weil in der Nähe viele Büros sind und die Leute mittags essen gehen wollen. Den Dienstagabend zu schließen, finde ich aber schade, denn da kommen oft Stammgäste. Ich schlage vor, dass wir den Mittagstisch erst einmal drei Monate testen. Viele Grüße, Aynur' }],
        minWords: 40,
        check: ['Kurze Anrede und Gruß passend zum Team-Chat (du-Form möglich)', 'Meinung klar gesagt (Ich finde …, Meiner Meinung nach …)', 'Mindestens eine Begründung mit weil/denn/deshalb', 'Ein konkreter Vorschlag (Ich schlage vor, dass …)', 'Mindestens 40 Wörter, verständlich und höflich'] }
    ] },
    { id: 'sprechen', title: 'Sprechen', minutes: 16, prepMinutes: 0, note: 'Keine Vorbereitungszeit. Teil 1 sprichst du allein, Teil 2 und 3 mit deiner Partnerin oder deinem Partner.', parts: [
      { kind: 'speak', title: 'Sprechen Teil 1A: Über ein Thema sprechen', skill: 'sprechen', pts: 12, minutes: 2,
        instr: 'Sprechen Sie etwa eine Minute über das Thema. Die Stichpunkte helfen Ihnen.',
        task: 'Thema: Weiterbildung im Beruf\n\n• Haben Sie schon eine Weiterbildung gemacht? Welche?\n• Warum sind Weiterbildungen wichtig?\n• Was kann schwierig sein (Zeit, Geld, Familie …)?\n• Welche Weiterbildung möchten Sie gern machen?',
        prompts: ['Bitte erzählen Sie etwas zum Thema Weiterbildung im Beruf. Sie haben ungefähr eine Minute.'],
        redemittel: ['Ich möchte etwas über … erzählen.', 'Vor zwei Jahren habe ich einen Kurs … gemacht.', 'Weiterbildungen sind wichtig, weil …', 'Schwierig ist manchmal, dass …', 'In Zukunft möchte ich gern …', 'Zum Schluss möchte ich sagen, dass …'],
        muster: 'Ich möchte etwas über Weiterbildung im Beruf erzählen. Ich arbeite als Pflegehelferin in einem Seniorenheim. Letztes Jahr habe ich einen Kurs „Kommunikation in der Pflege“ gemacht, an sechs Samstagen. Das hat mir sehr geholfen, weil ich jetzt besser mit Angehörigen sprechen kann. Ich finde Weiterbildungen wichtig, denn in der Pflege ändert sich viel, zum Beispiel jetzt die Dokumentation auf dem Tablet. Schwierig ist es manchmal mit der Zeit, weil ich zwei Kinder habe und Schicht arbeite. Zum Glück hat mein Mann am Samstag auf die Kinder aufgepasst. In Zukunft möchte ich gern die Ausbildung zur Pflegefachfrau machen.',
        check: ['Alle vier Stichpunkte angesprochen', 'Etwa eine Minute zusammenhängend gesprochen', 'Beispiele aus dem eigenen Berufsleben', 'Sätze verbunden (weil, wenn, deshalb, außerdem)'] },
      { kind: 'speak', title: 'Sprechen Teil 1B: Fragen beantworten', skill: 'sprechen', pts: 12, minutes: 2,
        instr: 'Die Prüferin / der Prüfer stellt Ihnen Fragen zu Ihrem Thema. Antworten Sie in ganzen Sätzen und begründen Sie Ihre Antworten.',
        task: 'Antworten Sie auf die Fragen zum Thema „Weiterbildung im Beruf“.',
        prompts: ['Lernen Sie lieber in einem Kurs mit anderen oder allein am Computer? Warum?', 'Wer sollte eine Weiterbildung bezahlen – der Arbeitgeber oder die Mitarbeiter selbst?', 'Wie ist das mit Weiterbildungen in Ihrem Heimatland?', 'Was würden Sie einem Kollegen raten, der keine Zeit für eine Weiterbildung hat?'],
        redemittel: ['Ich lerne lieber …, weil …', 'Meiner Meinung nach sollte …', 'Das kommt darauf an, ob …', 'In meinem Heimatland war es so, dass …', 'Ich würde ihm raten, …'],
        muster: '1) Ich lerne lieber in einem Kurs mit anderen, weil ich dann Fragen stellen kann und motivierter bin. Allein am Computer höre ich oft zu früh auf.\n2) Meiner Meinung nach sollte der Arbeitgeber die Weiterbildung bezahlen, wenn sie für die Arbeit wichtig ist. Die Firma hat ja auch etwas davon.\n3) In meinem Heimatland, in Kenia, gibt es weniger Weiterbildungen. Oft muss man alles selbst bezahlen, deshalb machen das nicht so viele Leute.\n4) Ich würde ihm raten, mit dem Chef zu sprechen. Vielleicht kann er die Weiterbildung während der Arbeitszeit machen oder einen Online-Kurs am Abend.',
        check: ['Jede Frage direkt beantwortet', 'Jede Antwort mit Begründung oder Beispiel', 'Ganze Sätze, nicht nur ein Wort', 'Bei Unklarheit nachgefragt („Können Sie die Frage bitte wiederholen?“)'] },
      { kind: 'speak', title: 'Sprechen Teil 2: Mit Kollegen sprechen – Erfahrungen austauschen', skill: 'sprechen', pts: 16, minutes: 4,
        instr: 'Sie sind Kolleginnen / Kollegen und sprechen in der Pause über Ihre Erfahrungen. Erzählen Sie von sich, stellen Sie Fragen und reagieren Sie auf das, was Ihre Partnerin / Ihr Partner sagt.',
        task: 'Thema: Stress bei der Arbeit\n\n• Wann haben Sie bei der Arbeit Stress?\n• Was machen Sie dann?\n• Was hilft Ihnen nach der Arbeit, sich zu erholen?\n• Was könnte die Firma tun, damit es weniger Stress gibt?',
        prompts: ['Sie sind Kollegen und sitzen in der Pause zusammen. Erzählen Sie doch mal: Wann haben Sie bei der Arbeit Stress?', 'Und jetzt fragen Sie bitte Ihre Partnerin oder Ihren Partner: Wie ist das bei ihr oder bei ihm?', 'Was hilft Ihnen nach der Arbeit, um sich zu erholen?', 'Zum Schluss: Was könnte die Firma tun, damit es weniger Stress gibt?'],
        redemittel: ['Bei mir ist es so: …', 'Und wie ist das bei dir?', 'Das kenne ich! / Das ist bei mir ganz anders.', 'Wenn ich Stress habe, …', 'Nach der Arbeit … ich gern …', 'Ich fände es gut, wenn die Firma …'],
        muster: 'A: Sag mal, wann hast du eigentlich am meisten Stress?\nB: Am Freitagabend, wenn das Restaurant voll ist und alle Bestellungen gleichzeitig kommen. Und bei dir?\nA: Bei mir ist es morgens. Wenn ein Kollege krank ist, müssen wir die Arbeit zu zweit machen.\nB: Das kenne ich. Was machst du dann?\nA: Ich versuche, ruhig zu bleiben, und mache eine Liste, was am wichtigsten ist. Und nach der Arbeit gehe ich joggen. Das hilft mir sehr.\nB: Ich gehe lieber spazieren oder telefoniere mit meiner Schwester.\nA: Was könnte die Firma deiner Meinung nach tun?\nB: Ich fände es gut, wenn es mehr Aushilfen für die vollen Tage gäbe. Und die Pausen sollten wirklich Pausen sein.\nA: Da hast du recht. Vielleicht sollten wir das in der nächsten Teambesprechung sagen.',
        check: ['Von eigenen Erfahrungen erzählt', 'Auch Fragen an den Partner gestellt', 'Auf den Partner reagiert (Das kenne ich! / Bei mir ist das anders.)', 'Alle Stichpunkte angesprochen', 'Du-Form unter Kollegen passend benutzt'] },
      { kind: 'speak', title: 'Sprechen Teil 3: Etwas gemeinsam planen', skill: 'sprechen', pts: 20, minutes: 5,
        instr: 'Ihre Firma macht am 1. Mai einen Tag der offenen Tür. Ihr Chef hat Sie beide gebeten, den Stand Ihrer Abteilung zu planen. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihrer Partnerin / Ihres Partners und einigen Sie sich.',
        task: 'Tag der offenen Tür: den Stand der Abteilung planen\n\n• Was zeigen Sie den Besuchern (Vorführung, Fotos, Mitmachaktion …)?\n• Was gibt es für Kinder?\n• Essen und Getränke?\n• Wer betreut den Stand wann?\n• Was muss vorher gekauft oder vorbereitet werden?',
        prompts: ['Beginnen Sie bitte. Was möchten Sie den Besuchern an Ihrem Stand zeigen?', 'Es kommen bestimmt auch viele Familien. Was machen wir für die Kinder?', 'Und was bieten wir zum Essen und Trinken an?', 'Der Tag dauert von zehn bis sechzehn Uhr. Wie teilen wir die Zeit am Stand auf?', 'Fassen Sie bitte zum Schluss zusammen: Wer übernimmt welche Aufgabe?'],
        redemittel: ['Ich schlage vor, dass …', 'Wie wäre es, wenn wir …?', 'Was hältst du / halten Sie davon, wenn …?', 'Gute Idee! / Das finde ich gut, aber …', 'Ich bin nicht sicher, ob … Vielleicht besser …', 'Dann machen wir es so: Du übernimmst …, ich kümmere mich um …', 'Also, zusammengefasst: …'],
        muster: 'A: Was möchten wir den Besuchern zeigen? Ich dachte an Fotos von unseren Projekten.\nB: Fotos sind gut, aber vielleicht ein bisschen langweilig. Wie wäre es mit einer kleinen Vorführung? Wir könnten zeigen, wie man eine Wand richtig streicht.\nA: Gute Idee! Und für die Kinder? Es kommen bestimmt viele Familien.\nB: Die Kinder könnten selbst mit Fingerfarben auf großen Papierbögen malen. Das macht immer Spaß.\nA: Super. Und Essen und Getränke?\nB: Ich glaube, die Firma organisiert einen Grill für alle. Wir könnten an unserem Stand Wasser und Saft anbieten.\nA: Einverstanden. Wie teilen wir die Zeit auf? Ich kann von zehn bis eins.\nB: Dann übernehme ich von eins bis vier.\nA: Was müssen wir vorher kaufen?\nB: Papier, Fingerfarben und Getränke. Das kann ich am Freitag erledigen. Kannst du die Fotos ausdrucken?\nA: Ja, mache ich. Also zusammengefasst: Vorführung und Fotos, Malen für Kinder, Getränke am Stand. Ich bin von zehn bis eins da und drucke die Fotos, du kaufst ein und bist von eins bis vier am Stand.',
        check: ['Eigene Vorschläge gemacht', 'Auf die Vorschläge des Partners reagiert und begründet', 'Bei Ablehnung eine Alternative genannt', 'Aufgaben und Zeiten verteilt', 'Am Ende das Ergebnis zusammengefasst'] }
    ] }
  ]
};
})();
