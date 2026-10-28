/* DTZ – Modelltest 2. Eigene Übungsaufgaben im Stil der Prüfung (Format: tools/sim/SCHEMA.md). */
(window.SIM = window.SIM || {})['dtz-2'] = {
  id: 'dtz-2', title: 'DTZ – Deutsch-Test für Zuwanderer (Modelltest 2)', short: 'DTZ · Test 2', provider: 'g.a.s.t.', level: 'A2–B1',
  intro: 'Der zweite komplette Übungstest für den DTZ – mit neuen Themen in allen Teilen. Ideal, wenn du Modelltest 1 schon gemacht hast.',
  rule: 'dtz',
  skills: { hl: { label: 'Hören und Lesen', max: 45 }, s: { label: 'Schreiben', max: 20 }, m: { label: 'Sprechen', max: 100 } },
  sections: [
    { id: 'hoeren', title: 'Hören', minutes: 25, note: 'Vier Teile, 20 Aufgaben. Lies vor jedem Hörtext zuerst die Aufgabe.', parts: [
      { title: 'Hören Teil 1: Ansagen am Telefon und Durchsagen', skill: 'hl', pts: 1,
        instr: 'Sie hören vier Ansagen. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text zweimal.',
        audio: [
          { h: 'Text 1', lines: [{ s: 'm', t: 'Guten Tag, Frau Petrović, hier ist Autohaus Brandt, Werkstatt, Müller mein Name. Es geht um Ihr Auto. Also, die Bremsen sind fertig, aber wir mussten noch ein Ersatzteil bestellen, für das Licht hinten. Das kommt leider erst morgen. Deshalb ist Ihr Wagen nicht am Donnerstag fertig, sondern erst am Freitag. Sie können ihn am Freitag ab zehn Uhr abholen. Wir haben bis achtzehn Uhr geöffnet. Samstags ist die Werkstatt geschlossen. Bei Fragen erreichen Sie mich unter null zwei drei vier, fünfundfünfzig, zwölf, null acht. Auf Wiederhören!' }] },
          { h: 'Text 2', lines: [{ s: 'f', t: 'Hallo, Herr Osei, hier ist Frau Lange von der Kita Sonnenblume. Ich rufe wegen unseres Herbstfestes am Samstag an. Sie haben sich ja für das Buffet eingetragen und wollten einen Kuchen mitbringen. Wir haben aber schon sehr viele Kuchen, ungefähr fünfzehn Stück. Was uns noch fehlt, sind Getränke. Könnten Sie vielleicht stattdessen zwei Flaschen Apfelsaft mitbringen? Das wäre super. Die Becher und Teller haben wir schon. Falls das nicht geht, sagen Sie mir bitte morgen früh beim Bringen kurz Bescheid. Danke und bis dann!' }] },
          { h: 'Text 3', lines: [{ s: 'f', t: 'Guten Tag, hier spricht Frau Schulte vom Jobcenter Bochum, Team Arbeitsvermittlung. Diese Nachricht ist für Herrn Aziz. Herr Aziz, Sie haben am Mittwoch um zehn Uhr einen Termin bei mir. Bitte bringen Sie zu dem Termin Ihren Lebenslauf und Ihre Zeugnisse mit, wir wollen zusammen Bewerbungen schreiben. Ihren Personalausweis brauchen Sie dieses Mal nicht, den haben wir schon kopiert. Und denken Sie bitte daran: Sie müssen in den zweiten Stock, Zimmer zwei null sieben, nicht mehr ins Erdgeschoss. Vielen Dank.' }] },
          { h: 'Text 4', lines: [{ s: 'f2', t: 'Hi Marco, ich bin’s, Svetlana. Du, wir wollten uns doch heute um fünf im Café Lindgren treffen. Das hat aber heute leider zu, da ist eine private Feier. Lass uns doch einfach direkt am Bahnhof treffen, vor der Buchhandlung, und dann gehen wir zusammen ins Kino. Der Film fängt um halb sechs an, das passt also gut. Wenn du später kommst, schreib mir einfach. Bis dann!' }] }
        ], plays: 2,
        items: [
          { au: 0, q: 'Wann kann Frau Petrović ihr Auto abholen?', opts: ['Am Donnerstag.', 'Am Samstag.', 'Am Freitag ab 10 Uhr.'], a: 2, why: '„Sie können ihn am Freitag ab zehn Uhr abholen.“ – Donnerstag klappt nicht, samstags ist zu.' },
          { au: 1, q: 'Was soll Herr Osei zum Fest mitbringen?', opts: ['Einen Kuchen.', 'Becher und Teller.', 'Apfelsaft.'], a: 2, why: '„Könnten Sie vielleicht stattdessen zwei Flaschen Apfelsaft mitbringen?“ – Kuchen gibt es schon genug.' },
          { au: 2, q: 'Was soll Herr Aziz zum Termin mitbringen?', opts: ['Lebenslauf und Zeugnisse.', 'Seinen Personalausweis.', 'Eine Kopie vom Mietvertrag.'], a: 0, why: '„Bitte bringen Sie … Ihren Lebenslauf und Ihre Zeugnisse mit“; den Ausweis braucht er nicht.' },
          { au: 3, q: 'Wo treffen sich Svetlana und Marco?', opts: ['Im Café Lindgren.', 'Vor dem Kino.', 'Vor der Buchhandlung am Bahnhof.'], a: 2, why: '„Lass uns doch einfach direkt am Bahnhof treffen, vor der Buchhandlung“.' }
        ] },
      { title: 'Hören Teil 2: Informationen im Radio', skill: 'hl', pts: 1,
        instr: 'Sie hören fünf kurze Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text einmal.',
        audio: [
          { h: 'Text 1', lines: [{ s: 'n', t: 'Und nun das Wetter für morgen, Dienstag. Am Vormittag ist es im ganzen Land noch trocken, teilweise sogar sonnig. Ab dem Mittag kommen von Westen dichte Wolken und dann gibt es kräftigen Regen, im Bergland auch Gewitter. Die Temperaturen: zwölf bis fünfzehn Grad. Am Mittwoch wird es dann wieder freundlicher.' }] },
          { h: 'Text 2', lines: [{ s: 'n', t: 'Achtung, Pendler in Köln: Wegen Bauarbeiten fährt die S-Bahn-Linie S zwölf am kommenden Wochenende nicht zwischen Köln-Deutz und Troisdorf. Zwischen diesen Bahnhöfen fahren Ersatzbusse. Bitte planen Sie etwa zwanzig Minuten mehr ein. Ab Montag früh fährt die S-Bahn wieder normal.' }] },
          { h: 'Text 3', lines: [{ s: 'n', t: 'Und hier noch ein Tipp für Familien: Am Sonntag ist im Stadtpark Gelsenkirchen wieder Kinderflohmarkt. Von zehn bis fünfzehn Uhr können Kinder dort Spielsachen, Bücher und Kleidung verkaufen oder tauschen. Ein Stand ist kostenlos, Sie müssen ihn aber vorher bis Freitag beim Bürgerbüro anmelden. Für Essen und Getränke sorgt der Förderverein der Grundschule.' }] },
          { h: 'Text 4', lines: [{ s: 'n', t: 'Eine Information der Stadtwerke Hamm: Das Hallenbad Süd bleibt ab heute für drei Wochen geschlossen. Grund ist ein Schaden an der Heizung. Die Schwimmkurse für Kinder finden in dieser Zeit im Hallenbad Nord statt, zur gleichen Uhrzeit. Saunabesucher können ihre Zehnerkarte auch im Hallenbad Nord benutzen.' }] },
          { h: 'Text 5', lines: [{ s: 'n', t: 'Und jetzt unser Gewinnspiel! Heute verlosen wir zwei Karten für das Konzert von „Die Lokalhelden“ am Samstag in der Westfalenhalle. Rufen Sie jetzt an unter null acht null null, fünfzig, fünfzig, zehn. Der Anruf ist kostenlos. Der zehnte Anrufer gewinnt. Viel Glück!' }] }
        ], plays: 1,
        items: [
          { au: 0, q: 'Wie ist das Wetter morgen am Nachmittag?', opts: ['Sonnig und trocken.', 'Es regnet stark.', 'Es schneit im Bergland.'], a: 1, why: '„Ab dem Mittag … gibt es kräftigen Regen“.' },
          { au: 1, q: 'Was ist am Wochenende bei der S12?', opts: ['Sie fährt alle zwanzig Minuten.', 'Sie fährt erst ab Montag wieder.', 'Zwischen Deutz und Troisdorf fahren Busse.'], a: 2, why: '„Zwischen diesen Bahnhöfen fahren Ersatzbusse.“ Ab Montag fährt sie normal – am Wochenende fährt sie dort nicht.' },
          { au: 2, q: 'Was muss man für einen Stand auf dem Kinderflohmarkt tun?', opts: ['Ihn bis Freitag anmelden.', 'Zehn Euro bezahlen.', 'Kuchen für den Förderverein backen.'], a: 0, why: '„Ein Stand ist kostenlos, Sie müssen ihn aber vorher bis Freitag beim Bürgerbüro anmelden.“' },
          { au: 3, q: 'Wo finden die Schwimmkurse für Kinder statt?', opts: ['Sie fallen drei Wochen aus.', 'Im Hallenbad Süd, aber später.', 'Im Hallenbad Nord.'], a: 2, why: '„Die Schwimmkurse … finden in dieser Zeit im Hallenbad Nord statt, zur gleichen Uhrzeit.“' },
          { au: 4, q: 'Wer gewinnt die Konzertkarten?', opts: ['Die erste Person, die anruft.', 'Die zehnte Person, die anruft.', 'Wer eine Postkarte schickt.'], a: 1, why: '„Der zehnte Anrufer gewinnt.“' }
        ] },
      { title: 'Hören Teil 3: Gespräche im Alltag', skill: 'hl', pts: 1,
        instr: 'Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Zu jedem Gespräch lösen Sie zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'm', t: 'Entschuldigung, können Sie mir helfen? Ich suche eine Winterjacke für meinen Sohn.' },
            { s: 'f', t: 'Ja, gern. Wie alt ist Ihr Sohn denn?' },
            { s: 'm', t: 'Er ist zehn. Er trägt Größe hundertvierzig, glaube ich, aber er wächst so schnell …' },
            { s: 'f', t: 'Dann nehmen Sie lieber gleich hundertsechsundvierzig. Hier, diese blaue Jacke ist sehr warm und wasserdicht. Die kostet neunundfünfzig Euro.' },
            { s: 'm', t: 'Hm, das ist ein bisschen viel. Haben Sie auch etwas Günstigeres?' },
            { s: 'f', t: 'Ja, die grüne da drüben ist im Angebot, statt fünfundvierzig nur noch neunundzwanzig Euro. Die ist auch warm, aber nicht ganz so wasserdicht.' },
            { s: 'm', t: 'Ach, die ist doch gut. Kann ich die umtauschen, wenn sie nicht passt? Mein Sohn ist ja nicht dabei.' },
            { s: 'f', t: 'Natürlich, innerhalb von vierzehn Tagen mit Kassenbon. Nur Sachen im Angebot können Sie nicht zurückgeben, aber umtauschen geht.' },
            { s: 'm', t: 'Okay, dann nehme ich die grüne.' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'f', t: 'Hallo Herr Kaya, gut, dass ich Sie treffe! Ich wohne über Ihnen, Frau Berger.' },
            { s: 'm', t: 'Ach, hallo Frau Berger. Ist etwas passiert?' },
            { s: 'f', t: 'Ja, in meinem Bad tropft es von der Decke, das Wasser kommt vom Dach, glaube ich. Ich habe schon die Hausverwaltung angerufen, aber da geht keiner ran.' },
            { s: 'm', t: 'Oh je. Haben Sie es schon beim Hausmeister versucht? Herr Wolf wohnt doch im Haus nebenan.' },
            { s: 'f', t: 'Nein, ich habe seine Nummer nicht.' },
            { s: 'm', t: 'Die steht unten im Flur an der Tafel, neben den Briefkästen. Oder warten Sie, ich habe sie im Handy. Ich rufe ihn gleich für Sie an.' },
            { s: 'f', t: 'Das wäre wirklich nett, danke!' }
          ] },
          { h: 'Gespräch 3', lines: [
            { s: 'f', t: 'Guten Tag. Ich möchte meine Tochter für den Schwimmkurs anmelden.' },
            { s: 'm', t: 'Gern. Wie alt ist Ihre Tochter?' },
            { s: 'f', t: 'Sie ist sechs Jahre alt und kann noch gar nicht schwimmen.' },
            { s: 'm', t: 'Dann passt der Anfängerkurs. Der ist immer dienstags um sechzehn Uhr, zehnmal. Der Kurs am Donnerstag ist leider schon voll.' },
            { s: 'f', t: 'Dienstag ist gut. Was kostet das?' },
            { s: 'm', t: 'Achtzig Euro für alle zehn Termine, der Eintritt ist schon dabei. Wenn Sie den Familienpass der Stadt haben, zahlen Sie nur die Hälfte.' },
            { s: 'f', t: 'Den habe ich, hier.' },
            { s: 'm', t: 'Wunderbar. Dann brauche ich nur noch dieses Formular hier, bitte unterschreiben.' }
          ] },
          { h: 'Gespräch 4', lines: [
            { s: 'm', t: 'Du, Aylin, hast du am Samstag Zeit? Wir ziehen doch um und brauchen noch Hilfe.' },
            { s: 'f', t: 'Samstag? Hm, vormittags muss ich arbeiten, bis eins. Aber am Nachmittag kann ich kommen.' },
            { s: 'm', t: 'Super! Die Möbel tragen wir schon am Vormittag, mein Bruder hilft mir. Am Nachmittag wollen wir die Küche einräumen und die Lampen aufhängen.' },
            { s: 'f', t: 'Das kann ich gut. Soll ich etwas mitbringen?' },
            { s: 'm', t: 'Nein, nein, Essen gibt’s bei uns, wir bestellen Pizza. Bring einfach gute Laune mit.' },
            { s: 'f', t: 'Alles klar. Dann bin ich so um zwei da.' }
          ] }
        ], plays: 1,
        items: [
          { au: 0, q: 'Der Mann kauft die Jacke für sich selbst.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Er sucht „eine Winterjacke für meinen Sohn“.' },
          { au: 0, q: 'Was gilt für die grüne Jacke?', opts: ['Man kann sie nicht zurückgeben, aber umtauschen.', 'Sie kostet 59 Euro.', 'Sie ist die wärmste Jacke im Geschäft.'], a: 0, why: '„Sachen im Angebot können Sie nicht zurückgeben, aber umtauschen geht.“' },
          { au: 1, q: 'Frau Berger hat die Hausverwaltung schon erreicht.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Ich habe schon die Hausverwaltung angerufen, aber da geht keiner ran.“' },
          { au: 1, q: 'Was macht Herr Kaya?', opts: ['Er repariert das Dach.', 'Er gibt Frau Berger die Nummer der Hausverwaltung.', 'Er ruft den Hausmeister an.'], a: 2, why: '„Ich rufe ihn gleich für Sie an.“' },
          { au: 2, q: 'Die Tochter kann schon ein bisschen schwimmen.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Sie „kann noch gar nicht schwimmen“.' },
          { au: 2, q: 'Wie viel bezahlt die Mutter?', opts: ['80 Euro.', '40 Euro.', 'Nur den Eintritt.'], a: 1, why: 'Mit Familienpass „zahlen Sie nur die Hälfte“ von 80 Euro, also 40 Euro.' },
          { au: 3, q: 'Aylin hilft am Samstagvormittag beim Möbeltragen.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Vormittags arbeitet sie; sie kommt erst „so um zwei“.' },
          { au: 3, q: 'Was soll Aylin mitbringen?', opts: ['Pizza.', 'Lampen.', 'Nichts.'], a: 2, why: '„Nein, nein, Essen gibt’s bei uns … Bring einfach gute Laune mit.“' }
        ] },
      { title: 'Hören Teil 4: Meinungen im Radio', skill: 'hl', pts: 1,
        instr: 'Sie hören drei Personen in einer Radiosendung zum Thema „Sollen Supermärkte auch am Sonntag öffnen?“. Welche Aussage passt zu welcher Person? Wählen Sie für jede Person eine Aussage a–f. Drei Aussagen passen nicht. Lesen Sie zuerst die Aussagen a–f. Dazu haben Sie eine Minute Zeit. Sie hören jeden Text einmal.',
        audio: [
          { h: 'Person 1: Herr Lukić', lines: [
            { s: 'n', t: 'Guten Abend und willkommen bei „Stadtgespräch“. Heute fragen wir: Sollen Supermärkte auch am Sonntag öffnen? Unser erster Anrufer ist Herr Lukić.' },
            { s: 'm', t: 'Ja, hallo. Also, ich arbeite im Schichtdienst, im Krankenhaus. Unter der Woche schaffe ich es oft nicht vor acht Uhr abends in den Supermarkt, und dann ist der Kühlschrank leer. Für Leute wie mich wäre es eine große Hilfe, wenn man auch sonntags einkaufen könnte. Andere Länder machen das ja auch, und da funktioniert es.' }
          ] },
          { h: 'Person 2: Frau Nguyen', lines: [
            { s: 'n', t: 'Danke, Herr Lukić. Jetzt ist Frau Nguyen am Telefon.' },
            { s: 'f', t: 'Guten Abend. Ich arbeite selbst als Kassiererin. Und ich sage ganz klar: Nein! Der Sonntag ist der einzige Tag, an dem meine ganze Familie zusammen ist. Wenn die Geschäfte aufmachen, müssen wir Verkäuferinnen arbeiten, und dann sehe ich meine Kinder noch weniger. Man kann doch am Samstag einkaufen, das reicht.' }
          ] },
          { h: 'Person 3: Herr Brandt', lines: [
            { s: 'n', t: 'Und unser letzter Anrufer heute: Herr Brandt.' },
            { s: 'm2', t: 'Ja, guten Abend. Ich finde, man muss da einen Kompromiss finden. Jeden Sonntag – das ist mir zu viel. Aber vielleicht vier Sonntage im Jahr, zum Beispiel vor Weihnachten, das finde ich in Ordnung. Dann gibt es auch Feste in der Innenstadt, die Leute kommen gern. Wichtig ist nur, dass die Mitarbeiter dafür mehr Geld bekommen.' }
          ] }
        ], plays: 1,
        opts: ['a) Wer viel arbeitet, braucht auch am Sonntag die Möglichkeit zum Einkaufen.', 'b) Am Sonntag sollte man besser im Internet einkaufen.', 'c) Verkäuferinnen brauchen den Sonntag für ihre Familie.', 'd) Kleine Geschäfte verlieren durch Sonntagsöffnung ihre Kunden.', 'e) An einigen Sonntagen im Jahr kann man die Geschäfte öffnen.', 'f) Am Sonntag sollte nur die Bäckerei geöffnet sein.'],
        items: [
          { au: 0, q: 'Herr Lukić', a: 0, why: 'Er arbeitet im Schichtdienst und schafft es unter der Woche nicht – sonntags einkaufen „wäre … eine große Hilfe“.' },
          { au: 1, q: 'Frau Nguyen', a: 2, why: '„Der Sonntag ist der einzige Tag, an dem meine ganze Familie zusammen ist.“' },
          { au: 2, q: 'Herr Brandt', a: 4, why: '„vielleicht vier Sonntage im Jahr … das finde ich in Ordnung“.' }
        ] }
    ] },
    { id: 'lesen', title: 'Lesen', minutes: 45, note: 'Fünf Teile, 25 Aufgaben. Du musst nicht jedes Wort verstehen – such die wichtigen Informationen.', parts: [
      { title: 'Lesen Teil 1: Wegweiser', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die Situationen und den Wegweiser des Ärztehauses. In welches Stockwerk gehen Sie? Wählen Sie die richtige Lösung a, b oder c.',
        material: [{ h: 'Ärztehaus am Markt – Wegweiser', t: '4. Stock: Dr. med. Yıldız – Frauenärztin · Hebammenpraxis „Kleine Füße“ · Physiotherapie Krone (Krankengymnastik, Massage)\n\n3. Stock: Dr. med. Hartmann – Kinder- und Jugendarzt · Logopädie (Sprachtherapie für Kinder und Erwachsene)\n\n2. Stock: Dr. med. Schmitz – Augenarzt · Dr. med. Neumann – Hals-Nasen-Ohren-Arzt · Hörgeräte Klang\n\n1. Stock: Gemeinschaftspraxis Dr. Becker und Dr. Aydın – Allgemeinmedizin (Hausärzte) · Labor · Impfungen\n\nErdgeschoss: Apotheke am Markt · Sanitätshaus (Gehhilfen, Rollstühle, Bandagen) · Optiker Weitblick · Anmeldung Labor\n\nUntergeschoss: Zahnarztpraxis Dr. Klein · Parkhaus · Fahrradkeller' }],
        items: [
          { q: 'Sie brauchen eine neue Brille. Ihre alte ist kaputt, die Gläser sind aber noch richtig.', opts: ['Erdgeschoss', '2. Stock', 'anderes Stockwerk'], a: 0, why: 'Eine neue Brille macht der „Optiker Weitblick“ im Erdgeschoss; zum Augenarzt muss man nicht, die Gläser stimmen ja.' },
          { q: 'Ihr Sohn ist vier und spricht noch sehr wenig. Der Kinderarzt hat Ihnen eine Sprachtherapie verschrieben.', opts: ['1. Stock', '3. Stock', 'anderes Stockwerk'], a: 1, why: '„Logopädie (Sprachtherapie für Kinder und Erwachsene)“ ist im 3. Stock.' },
          { q: 'Sie haben seit zwei Wochen Rückenschmerzen und Ihr Arzt hat Ihnen Massagen verschrieben.', opts: ['1. Stock', 'Untergeschoss', 'anderes Stockwerk'], a: 2, why: 'Massagen gibt es bei der „Physiotherapie Krone“ im 4. Stock – also ein anderes Stockwerk.' },
          { q: 'Ihre Mutter kann nach einer Operation nicht gut laufen. Sie brauchen für sie einen Rollator.', opts: ['Erdgeschoss', '4. Stock', 'anderes Stockwerk'], a: 0, why: 'Gehhilfen gibt es im „Sanitätshaus“ im Erdgeschoss.' },
          { q: 'Sie möchten sich gegen Grippe impfen lassen.', opts: ['1. Stock', '2. Stock', 'anderes Stockwerk'], a: 0, why: '„Impfungen“ stehen beim 1. Stock (Hausärzte).' }
        ] },
      { title: 'Lesen Teil 2: Anzeigen', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die Situationen und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal wählen. Für eine Situation gibt es keine passende Anzeige. Wählen Sie dann x.',
        material: [
          { h: 'a', t: 'Nachhilfe Mathe und Deutsch für Grundschüler – Studentin (Lehramt) kommt zu Ihnen nach Hause. 15 € pro Stunde.\nTel. 0157 / 88 21 04 63' },
          { h: 'b', t: 'Repair-Café im Bürgerzentrum Nord: Jeden 1. Samstag im Monat reparieren wir zusammen mit Ihnen kaputte Lampen, Toaster, Radios und Kleidung. Kostenlos – wir freuen uns über eine Spende!' },
          { h: 'c', t: 'Umzüge & Transporte Kowalski – kleine und große Umzüge, auch am Wochenende. Kostenloses Angebot nach Besichtigung. Tel. 0231 / 45 67 89' },
          { h: 'd', t: 'Mieterverein Dortmund e. V. – Ärger mit dem Vermieter? Nebenkostenabrechnung zu hoch? Wir beraten unsere Mitglieder. Mitgliedschaft ab 7 € im Monat.' },
          { h: 'e', t: 'Verschenke Kinderbett (Holz, 70 × 140 cm) mit Matratze. Nur Abholung, Dortmund-Hörde. Bitte melden unter 0176 / 12 98 33 47' },
          { h: 'f', t: 'Frauenschwimmen im Südbad: jeden Sonntag 8–10 Uhr, nur für Frauen und Mädchen, mit Schwimmlehrerin. Auch für Anfängerinnen! Eintritt 3,50 €.' },
          { h: 'g', t: 'Elterncafé in der Grundschule am Park: Eltern treffen sich, trinken Kaffee und lernen Deutsch. Mittwochs 8:15–9:45 Uhr, Kinderbetreuung für kleine Geschwister.' },
          { h: 'h', t: 'Fahrschule Tempo – Führerschein Klasse B, Theorieunterricht auch auf Arabisch, Türkisch und Russisch. Abendkurse und Ferienkurse.' }
        ],
        opts: ['a) Nachhilfe', 'b) Repair-Café', 'c) Umzüge Kowalski', 'd) Mieterverein', 'e) Kinderbett', 'f) Frauenschwimmen', 'g) Elterncafé', 'h) Fahrschule Tempo', 'x) keine passende Anzeige'],
        items: [
          { q: 'Ihr Wasserkocher funktioniert nicht mehr. Sie möchten ihn nicht wegwerfen, aber eine Reparatur im Geschäft ist zu teuer.', a: 1, why: 'b: Im Repair-Café repariert man kaputte Geräte kostenlos.' },
          { q: 'Sie haben die Rechnung für Heizung und Wasser bekommen und glauben, dass sie falsch ist.', a: 3, why: 'd: „Nebenkostenabrechnung zu hoch? Wir beraten …“' },
          { q: 'Ihre Tochter geht in die 3. Klasse und hat Probleme beim Rechnen.', a: 0, why: 'a: Nachhilfe Mathe für Grundschüler.' },
          { q: 'Sie möchten Ihr altes Sofa verkaufen.', a: 8, why: 'Keine Anzeige sucht ein Sofa oder bietet einen Verkauf an – also x.' },
          { q: 'Ihre Frau möchte schwimmen lernen, aber nicht zusammen mit Männern.', a: 5, why: 'f: Frauenschwimmen „nur für Frauen und Mädchen … auch für Anfängerinnen“.' }
        ] },
      { title: 'Lesen Teil 3: Pressetexte und Mitteilungen', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die drei Texte. Zu jedem Text gibt es zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?',
        material: [
          { h: 'Text 1: Neuer Bürgerbus in Lüdinghausen', t: 'Seit dem 1. Oktober fährt in Lüdinghausen ein Bürgerbus. Er verbindet die Dörfer rund um die Stadt mit dem Bahnhof und dem Krankenhaus. Der Bus fährt montags bis freitags von 7 bis 19 Uhr jede Stunde, am Samstag nur vormittags. Die Fahrerinnen und Fahrer sind Ehrenamtliche, sie bekommen kein Geld für ihre Arbeit. Eine Fahrt kostet 1,50 Euro, Kinder unter sechs Jahren fahren kostenlos. Der Verein sucht noch weitere Fahrer. Interessierte brauchen einen Führerschein der Klasse B und sollten mindestens 21 Jahre alt sein.' },
          { h: 'Text 2: Information der Hausverwaltung', t: 'Liebe Mieterinnen und Mieter, am Donnerstag, 14. November, wird in unserem Haus die Heizung kontrolliert. Ein Techniker muss dafür in alle Wohnungen. Er kommt zwischen 8 und 12 Uhr. Wenn Sie an diesem Tag nicht zu Hause sein können, geben Sie bitte Ihren Schlüssel bis Mittwoch bei Ihrem Nachbarn oder bei Hausmeister Kühn (Erdgeschoss links) ab. An diesem Vormittag gibt es kein warmes Wasser. Ab 13 Uhr funktioniert alles wieder. Vielen Dank für Ihr Verständnis! Ihre Hausverwaltung Ruhrwohnen' },
          { h: 'Text 3: Kurse für Senioren am Computer', t: 'Die Volkshochschule Witten bietet ab Januar wieder Computerkurse für Menschen ab 60 an. In kleinen Gruppen mit höchstens acht Personen lernen die Teilnehmenden, wie man E-Mails schreibt, Videos mit der Familie macht und im Internet sicher einkauft. Die Kurse finden vormittags statt und dauern sechs Wochen. Wer keinen eigenen Laptop hat, kann einen von der VHS leihen. Die Kursgebühr beträgt 48 Euro. Anmeldung ab sofort online oder persönlich in der VHS.' }
        ],
        items: [
          { q: 'Text 1: Der Bürgerbus fährt auch am Sonntag.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Er fährt montags bis freitags und am Samstag vormittags – vom Sonntag steht nichts im Text.' },
          { q: 'Text 1: Wer Bürgerbus-Fahrer werden will, …', opts: ['bekommt 1,50 Euro pro Fahrt.', 'braucht einen Busführerschein.', 'muss mindestens 21 Jahre alt sein.'], a: 2, why: '„… sollten mindestens 21 Jahre alt sein“; ein Führerschein Klasse B reicht, Geld gibt es nicht.' },
          { q: 'Text 2: Die Mieter müssen am 14. November den ganzen Tag zu Hause bleiben.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Der Techniker kommt nur zwischen 8 und 12 Uhr; wer nicht da ist, gibt den Schlüssel ab.' },
          { q: 'Text 2: Was ist am 14. November am Vormittag?', opts: ['Es gibt kein warmes Wasser.', 'Der Hausmeister ist nicht im Haus.', 'Die Heizung wird ausgetauscht.'], a: 0, why: '„An diesem Vormittag gibt es kein warmes Wasser.“' },
          { q: 'Text 3: In den Kursen sind maximal acht Personen.', opts: ['Richtig', 'Falsch'], a: 0, why: '„In kleinen Gruppen mit höchstens acht Personen“.' },
          { q: 'Text 3: Wer keinen Laptop hat, …', opts: ['kann nicht teilnehmen.', 'zahlt weniger.', 'kann einen leihen.'], a: 2, why: '„Wer keinen eigenen Laptop hat, kann einen von der VHS leihen.“' }
        ] },
      { title: 'Lesen Teil 4: Informationsbroschüre', skill: 'hl', pts: 1,
        instr: 'Lesen Sie den Text aus einer Broschüre. Sind die Aussagen richtig oder falsch?',
        material: [{ h: 'Abfall richtig trennen – Informationen der Stadt Recklinghausen', t: 'Welche Tonne ist wofür?\nIn die gelbe Tonne gehören Verpackungen aus Plastik und Metall, zum Beispiel Joghurtbecher, Konservendosen und Folien. Papier und Pappe kommen in die blaue Tonne. Essensreste, Obst- und Gemüseschalen und Kaffeefilter gehören in die braune Biotonne. Alles andere kommt in die graue Restmülltonne.\n\nWas ist mit Glas?\nGlasflaschen und Gläser bringen Sie bitte zu den Glascontainern. Trennen Sie dabei nach Farben: weiß, grün und braun. Bitte werfen Sie kein Glas zwischen 20 und 7 Uhr und nicht am Sonntag ein – das ist zu laut für die Nachbarn.\n\nUnd große Sachen?\nAlte Möbel, Matratzen oder Teppiche holen wir als Sperrmüll ab. Zweimal im Jahr ist das kostenlos. Melden Sie den Termin bitte mindestens zwei Wochen vorher online oder telefonisch an. Elektrogeräte wie Fernseher oder Kühlschränke dürfen nicht in den Sperrmüll. Diese bringen Sie bitte zum Wertstoffhof.' }],
        opts: ['Richtig', 'Falsch'],
        items: [
          { q: 'Kaffeefilter kommen in die Biotonne.', a: 0, why: '„Essensreste, Obst- und Gemüseschalen und Kaffeefilter gehören in die braune Biotonne.“' },
          { q: 'Am Sonntagvormittag darf man Glas in den Container werfen.', a: 1, why: '„Bitte werfen Sie kein Glas … nicht am Sonntag ein“.' },
          { q: 'Einen alten Kühlschrank holt die Stadt mit dem Sperrmüll ab.', a: 1, why: '„Elektrogeräte wie … Kühlschränke dürfen nicht in den Sperrmüll.“' }
        ] },
      { title: 'Lesen Teil 5: Brief mit Lücken', skill: 'hl', pts: 1,
        instr: 'Lesen Sie den Brief. Welches Wort passt in die Lücke? Wählen Sie die richtige Lösung a, b oder c.',
        material: [{ h: 'Beschwerde an den Vermieter', t: 'Tariq Rahimi\nLindenstraße 22\n45879 Gelsenkirchen\n\nWohnbau Emscher GmbH\nBahnhofstraße 5\n45879 Gelsenkirchen\n\nDefekte Heizung in meiner Wohnung\n\nSehr geehrte Damen und Herren,\n\nseit dem 3. November funktioniert die Heizung in meinem Wohnzimmer nicht mehr. Ich habe Ihnen {1} schon am 4. November eine E-Mail geschrieben, aber leider keine Antwort bekommen.\n\nIn der Wohnung ist es jetzt sehr kalt, nur 15 Grad. Das ist besonders schlimm, {2} meine kleine Tochter erst sechs Monate alt ist. Sie hat jetzt Husten.\n\nIch bitte Sie deshalb, die Heizung so schnell {3} möglich reparieren zu lassen. Der Techniker kann gern auch am Vormittag kommen, {4} ich bin bis Ende Dezember in Elternzeit und fast immer zu Hause.\n\nFalls die Reparatur länger dauert, {5} ich ein elektrisches Heizgerät von Ihnen. Ich möchte Sie außerdem fragen, ob ich für diesen Monat weniger Miete zahlen muss.\n\nIch freue mich {6} Ihre schnelle Antwort.\n\nMit freundlichen Grüßen\nTariq Rahimi' }],
        items: [
          { q: '', opts: ['darüber', 'davon', 'dafür'], a: 0, why: 'Man schreibt jemandem „über etwas“ → „darüber“.' },
          { q: '', opts: ['weil', 'deshalb', 'trotzdem'], a: 0, why: 'Ein Grund mit Verb am Ende: „weil meine Tochter … alt ist“.' },
          { q: '', opts: ['so', 'wie', 'als'], a: 1, why: 'Feste Wendung: „so schnell wie möglich“.' },
          { q: '', opts: ['denn', 'obwohl', 'dass'], a: 0, why: '„denn“ + Hauptsatz (Verb an Position 2): „denn ich bin … in Elternzeit“.' },
          { q: '', opts: ['brauche', 'braucht', 'gebraucht'], a: 0, why: 'Subjekt „ich“ → „ich brauche“.' },
          { q: '', opts: ['über', 'auf', 'für'], a: 1, why: 'Sich „auf“ etwas freuen = es kommt in der Zukunft.' }
        ] }
    ] },
    { id: 'schreiben', title: 'Schreiben', minutes: 30, parts: [
      { kind: 'write', title: 'Schreiben: E-Mail oder Brief', skill: 's', pts: 20,
        instr: 'Wählen Sie Aufgabe A oder Aufgabe B. Schreiben Sie zu allen vier Punkten etwas. Achten Sie auf den Betreff, die Anrede und den Gruß. Schreiben Sie ungefähr 80 bis 120 Wörter.',
        options: [
          { h: 'Aufgabe A: Brief an die Hausverwaltung', situation: 'In Ihrem Haus ist seit einer Woche der Aufzug kaputt. Sie wohnen im 5. Stock und haben ein kleines Kind mit Kinderwagen. Ihre Hausverwaltung ist die Firma „Wohnen Plus“.', task: 'Schreiben Sie einen Brief an die Hausverwaltung.',
            points: ['Grund für Ihr Schreiben', 'Welche Probleme Sie haben', 'Bitte um schnelle Reparatur', 'Frage, wann der Aufzug wieder funktioniert'],
            muster: 'Betreff: Defekter Aufzug in der Gartenstraße 14\n\nSehr geehrte Damen und Herren,\n\nich wohne in der Gartenstraße 14 im 5. Stock. Ich schreibe Ihnen, weil unser Aufzug seit einer Woche kaputt ist.\n\nDas ist für mich ein großes Problem. Ich habe eine Tochter, sie ist ein Jahr alt. Jeden Tag muss ich sie und den Kinderwagen fünf Stockwerke hochtragen. Auch die Einkäufe sind sehr schwer. Unsere ältere Nachbarin kann gar nicht mehr aus dem Haus gehen.\n\nBitte lassen Sie den Aufzug so schnell wie möglich reparieren.\n\nKönnen Sie mir bitte mitteilen, wann der Aufzug wieder funktioniert?\n\nVielen Dank im Voraus.\n\nMit freundlichen Grüßen\nAmina Hassan' },
          { h: 'Aufgabe B: E-Mail an eine Freundin', situation: 'Ihre Freundin Julia hat Sie zu ihrem 30. Geburtstag am Samstag eingeladen. Sie können aber nicht kommen.', task: 'Schreiben Sie eine E-Mail an Julia.',
            points: ['Dank für die Einladung', 'Warum Sie nicht kommen können', 'Vorschlag für ein anderes Treffen', 'Frage nach einem Geschenkwunsch'],
            muster: 'Betreff: Dein Geburtstag\n\nLiebe Julia,\n\nvielen Dank für deine Einladung zu deinem 30. Geburtstag! Ich habe mich sehr gefreut.\n\nLeider kann ich am Samstag nicht kommen. Meine Schwester heiratet an diesem Tag in Hamburg und ich bin schon ab Freitag dort. Das tut mir wirklich leid.\n\nWollen wir uns vielleicht nächste Woche treffen? Ich lade dich zum Essen ein, zum Beispiel am Mittwochabend in unserem Lieblingsrestaurant. Was meinst du?\n\nUnd sag mal: Was wünschst du dir zum Geburtstag? Ich möchte dir gern etwas schenken, das dir wirklich gefällt.\n\nIch wünsche dir eine tolle Party!\n\nLiebe Grüße\nDeine Fatima' }
        ],
        minWords: 80,
        check: ['Zu allen vier Leitpunkten etwas geschrieben', 'Betreff passend formuliert', 'Passende Anrede und passender Gruß (Sehr geehrte Damen und Herren … Mit freundlichen Grüßen / Liebe … Liebe Grüße)', 'Sie-Form bzw. du-Form durchgehend gleich', 'Sätze mit weil, dass, wenn richtig gebaut (Verb am Ende)', 'Höfliche Bitte mit „Könnten Sie …?“ oder „Bitte …“', 'Ungefähr 80–120 Wörter'] }
    ] },
    { id: 'sprechen', title: 'Sprechen', minutes: 16, note: 'In der echten Prüfung sprichst du zu zweit mit zwei Prüfenden. Hier wird die Paarprüfung simuliert: Lies die Fragen und Impulse und antworte laut.', parts: [
      { kind: 'speak', title: 'Teil 1: Über sich sprechen', skill: 'm', pts: 30, minutes: 4,
        instr: 'Stellen Sie sich bitte vor. Sprechen Sie zu den Stichpunkten. Danach stellt Ihnen die Prüferin noch einige Fragen.',
        task: 'Sprechen Sie über sich:\n– Name\n– Herkunft\n– Wohnort\n– Familie\n– Arbeit/Beruf\n– Sprachen',
        prompts: ['Woher kommen Sie genau? Können Sie den Namen der Stadt buchstabieren?', 'Wie sind Sie nach Deutschland gekommen und seit wann sind Sie hier?', 'Was machen Sie gern in Ihrer Freizeit?', 'Wie haben Sie Deutsch gelernt – nur im Kurs oder auch anders?', 'Und was möchten Sie in fünf Jahren machen?'],
        redemittel: ['Ich heiße … / Mein Vorname ist …, mein Nachname …', 'Ich komme aus …, das liegt im Norden / Süden von …', 'Seit … lebe ich in …', 'Ich habe … Geschwister / … Kinder.', 'In meinem Heimatland habe ich als … gearbeitet. Jetzt …', 'In meiner Freizeit … gern …', 'In fünf Jahren möchte ich …'],
        muster: 'Guten Tag, mein Name ist Daniel Tesfaye. Ich komme aus Eritrea, aus der Hauptstadt Asmara. Vor vier Jahren bin ich nach Deutschland gekommen. Zuerst habe ich in Bielefeld gewohnt, seit zwei Jahren wohne ich in Gütersloh. Ich bin verheiratet, meine Frau heißt Selam, und wir haben einen Sohn, er ist drei Jahre alt. In Eritrea war ich Elektriker. Hier mache ich gerade ein Praktikum in einer Elektrofirma. Ich spreche Tigrinya, Arabisch, ein bisschen Englisch und Deutsch.\n\nAntworten auf die Nachfragen (Beispiele):\n– Asmara: A – S – M – A – R – A.\n– Ich bin mit meinem Bruder über Italien gekommen. Seit 2022 bin ich hier.\n– In meiner Freizeit spiele ich Fußball im Verein und koche gern für Freunde.\n– Ich habe den Integrationskurs gemacht, aber ich lerne auch viel bei der Arbeit und im Fußballverein.\n– In fünf Jahren möchte ich als Elektriker fest angestellt sein und vielleicht den Meister machen.',
        check: ['Zu allen Stichpunkten etwas gesagt', 'In ganzen Sätzen gesprochen', 'Auf alle Nachfragen passend geantwortet', 'Zeitangaben benutzt (seit, vor, zuerst, jetzt)', 'Perfekt für die Vergangenheit benutzt (ich bin gekommen, ich habe gearbeitet)'] },
      { kind: 'speak', title: 'Teil 2: Über Erfahrungen sprechen (Bild)', skill: 'm', pts: 35, minutes: 6,
        instr: 'Sie sehen ein Foto. Beschreiben Sie zuerst das Bild (2A). Erzählen Sie dann von Ihren eigenen Erfahrungen zum Thema (2B). Danach stellt Ihnen die Prüferin noch einige Fragen.',
        task: 'Foto: Ein Wochenmarkt auf einem Platz in der Stadt. Im Vordergrund steht ein Gemüsestand mit Kisten voller Tomaten, Paprika, Kartoffeln und Äpfeln. Eine ältere Verkäuferin mit Schürze gibt einer jungen Frau eine Tüte. Die junge Frau hat einen Stoffbeutel und ein Kleinkind in einer Babytrage vor dem Bauch. Neben ihr probiert ein Mann ein Stück Käse am nächsten Stand. Im Hintergrund sieht man einen Blumenstand, viele Menschen und eine Kirche. Es ist sonnig, die Leute tragen leichte Jacken.\n\n2A: Was sehen Sie auf dem Bild? Was machen die Personen?\n2B: Wo und wie kaufen Sie Lebensmittel ein? Wie ist das in Ihrem Heimatland?',
        prompts: ['Sie haben gesagt, Sie kaufen im Supermarkt ein. Warum nicht auf dem Markt?', 'Achten Sie beim Einkaufen auf den Preis oder mehr auf die Qualität?', 'Gibt es Lebensmittel aus Ihrem Heimatland, die Sie in Deutschland vermissen?', 'Kaufen Sie manchmal auch im Internet ein? Warum oder warum nicht?'],
        redemittel: ['Auf dem Foto sieht man … / Das Bild zeigt …', 'Im Vordergrund … / Im Hintergrund … / In der Mitte …', 'Die Frau kauft gerade … / Der Mann probiert …', 'Ich glaube, das ist … / Es sieht aus wie …', 'Ich kaufe meistens … ein, weil …', 'In meinem Heimatland ist das anders: Dort …', 'Was ich hier vermisse, ist …'],
        muster: '2A: Auf dem Foto sieht man einen Wochenmarkt in einer Stadt. Im Vordergrund ist ein Gemüsestand mit Tomaten, Paprika, Kartoffeln und Äpfeln. Eine ältere Verkäuferin gibt einer jungen Frau eine Tüte. Die junge Frau trägt ein kleines Kind vor dem Bauch. Ich glaube, sie kauft Gemüse für die Familie. Neben ihr probiert ein Mann Käse. Im Hintergrund sieht man Blumen, viele Leute und eine Kirche. Das Wetter ist schön, ich denke, es ist Frühling.\n\n2B: Ich kaufe meistens im Supermarkt ein, weil er in der Nähe ist und lange geöffnet hat. Samstags gehe ich aber manchmal mit meinen Kindern auf den Markt. Das Gemüse ist dort frischer, aber auch ein bisschen teurer. In meinem Heimatland, in Syrien, kaufen fast alle Leute auf dem Markt ein. Man kann mit den Verkäufern sprechen und manchmal auch den Preis verhandeln. Das geht in Deutschland nicht. Was ich hier vermisse, sind frische Feigen und unser Fladenbrot – aber zum Glück gibt es in meiner Stadt einen arabischen Laden.',
        check: ['Bild beschrieben: Personen, Ort, Handlungen', 'Wörter für die Position benutzt (vorne, hinten, links, rechts)', 'Eigene Erfahrungen erzählt (2B)', 'Mit dem Heimatland verglichen', 'Auf die Nachfragen ausführlich geantwortet', 'Gründe genannt (weil, denn)'] },
      { kind: 'speak', title: 'Teil 3: Gemeinsam etwas planen', skill: 'm', pts: 35, minutes: 6,
        instr: 'Sie planen zusammen mit Ihrem Partner / Ihrer Partnerin etwas. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich am Ende. Hier sagt die Partnerin ihre Vorschläge nacheinander – reagieren Sie jedes Mal darauf.',
        task: 'In Ihrem Wohnhaus gibt es einen kleinen Hof, der sehr schmutzig und ungepflegt ist. Sie möchten zusammen mit Ihrem Nachbarn / Ihrer Nachbarin einen Aufräumtag für alle Hausbewohner organisieren.\n\nPlanen Sie gemeinsam:\n– Wann? (Tag, Uhrzeit)\n– Wer wird informiert und wie?\n– Was wird gemacht? (Müll sammeln, Pflanzen, Bänke …)\n– Was braucht man? (Werkzeug, Säcke …)\n– Essen und Getränke danach?',
        prompts: ['Also, ich finde, wir machen das am Samstag, am Vormittag um neun. Was meinst du?', 'Und wie sagen wir den anderen Bescheid? Ich könnte einen Zettel im Flur aufhängen.', 'Ich hätte gern ein paar Blumen im Hof. Sollen wir zusammen Pflanzen kaufen?', 'Wer kauft die Müllsäcke und Handschuhe? Ich habe am Freitag leider keine Zeit.', 'Und nach der Arbeit? Wir könnten zusammen grillen. Was hältst du davon?', 'Gut, dann fragen wir noch den Vermieter, ob er die Pflanzen bezahlt. Machst du das oder soll ich?'],
        redemittel: ['Vorschläge machen: Wie wäre es, wenn wir …? / Ich schlage vor, … / Lass uns doch …', 'Zustimmen: Gute Idee! / Das machen wir so. / Da bin ich deiner Meinung.', 'Ablehnen: Das ist keine so gute Idee, weil … / Ich weiß nicht, vielleicht lieber …', 'Alternative: Und was hältst du von …? / Wir könnten auch …', 'Aufgaben verteilen: Ich kümmere mich um … / Kannst du …?', 'Ergebnis: Also, wir machen es so: …'],
        muster: 'A: Also, ich finde, wir machen das am Samstag, am Vormittag um neun. Was meinst du?\nB: Samstag ist gut, aber neun Uhr ist ein bisschen früh. Viele Leute schlafen am Samstag länger. Wie wäre es mit zehn Uhr?\nA: Okay, einverstanden. Und wie sagen wir den anderen Bescheid? Ich könnte einen Zettel im Flur aufhängen.\nB: Gute Idee. Und ich schreibe zusätzlich eine Nachricht in unsere Haus-WhatsApp-Gruppe, dann wissen es alle.\nA: Ich hätte gern ein paar Blumen im Hof. Sollen wir zusammen Pflanzen kaufen?\nB: Ja, gern. Aber zuerst müssen wir den Müll sammeln und das Unkraut wegmachen. Die Pflanzen können wir danach kaufen.\nA: Wer kauft die Müllsäcke und Handschuhe? Ich habe am Freitag leider keine Zeit.\nB: Das mache ich. Ich gehe am Freitag sowieso in den Baumarkt.\nA: Und nach der Arbeit? Wir könnten zusammen grillen. Was hältst du von der Idee?\nB: Super Idee! Jeder bringt etwas mit, dann ist es nicht so teuer.\nA: Gut, dann fragen wir noch den Vermieter, ob er die Pflanzen bezahlt. Machst du das oder soll ich?\nB: Mach du das bitte, du kennst ihn besser. Also: Samstag um zehn, ich kaufe Säcke und Handschuhe, du fragst den Vermieter und danach grillen wir alle zusammen.',
        check: ['Eigene Vorschläge gemacht', 'Auf jeden Vorschlag reagiert (zustimmen oder ablehnen mit Grund)', 'Alternativen vorgeschlagen', 'Aufgaben verteilt', 'Am Ende eine Einigung zusammengefasst', 'Du-Form passend zum Gespräch mit dem Partner benutzt'] }
    ] }
  ]
};
