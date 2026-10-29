/* DTZ – Modelltest 3. Eigene Übungsaufgaben im Stil der Prüfung (Format: tools/sim/SCHEMA.md). */
(window.SIM = window.SIM || {})['dtz-3'] = {
  id: 'dtz-3', title: 'DTZ – Deutsch-Test für Zuwanderer (Modelltest 3)', short: 'DTZ · Test 3', provider: 'g.a.s.t.', level: 'A2–B1',
  intro: 'Der dritte komplette Übungstest für den DTZ – wieder mit neuen Themen in allen Teilen. Perfekt als letzte Generalprobe vor der Prüfung.',
  rule: 'dtz',
  skills: { hl: { label: 'Hören und Lesen', max: 45 }, s: { label: 'Schreiben', max: 20 }, m: { label: 'Sprechen', max: 100 } },
  sections: [
    { id: 'hoeren', title: 'Hören', minutes: 25, note: 'Vier Teile, 20 Aufgaben. Lies vor jedem Hörtext zuerst die Aufgabe.', parts: [
      { title: 'Hören Teil 1: Ansagen am Telefon und Durchsagen', skill: 'hl', pts: 1,
        instr: 'Sie hören vier Ansagen. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text zweimal.',
        audio: [
          { h: 'Text 1', lines: [{ s: 'f', t: 'Guten Tag, hier ist das Bürgeramt Duisburg-Mitte, Frau Krämer. Die Nachricht ist für Herrn Popescu. Herr Popescu, Ihr neuer Personalausweis ist fertig. Sie können ihn ab Montag bei uns abholen, ähm, aber nur mit Termin. Den Termin machen Sie bitte online oder Sie rufen uns an. Bringen Sie bitte Ihren alten Ausweis mit, der wird dann ungültig gemacht. Ein Foto brauchen Sie nicht mehr, das haben wir ja schon. Danke und einen schönen Tag noch.' }] },
          { h: 'Text 2', lines: [{ s: 'm', t: 'Ja, hallo Frau Ibrahim, hier ist die Praxis Doktor Wendt. Ihre Blutwerte sind jetzt da. Also, keine Sorge, es ist alles in Ordnung, nur Ihr Eisenwert ist ein bisschen niedrig. Der Doktor möchte das gern kurz mit Ihnen besprechen. Sie müssen aber nicht extra kommen, er ruft Sie morgen zwischen zwölf und eins an. Wenn das nicht passt, melden Sie sich bitte kurz bei uns. Tschüss!' }] },
          { h: 'Text 3', lines: [{ s: 'f2', t: 'Hallo, liebe Teilnehmerinnen und Teilnehmer, hier ist Anja von der Sprachschule Wort und Welt. Nur eine kurze Info: Unser Kurs morgen findet statt, aber nicht in Raum zwölf, sondern unten im Erdgeschoss, in Raum drei. Oben wird nämlich gestrichen. Die Uhrzeit bleibt gleich, neun Uhr. Und bitte denkt an eure Hausaufgaben, wir sprechen morgen darüber. Bis morgen!' }] },
          { h: 'Text 4', lines: [{ s: 'f', t: 'Hallo Ali, hier ist Monika von nebenan, aus dem zweiten Stock. Du, ich hab heute ein Paket für dich angenommen. Der Paketbote hat bei dir geklingelt, aber du warst nicht da. Ich bin heute Abend leider nicht zu Hause, ich hab Spätschicht. Ich stell dir das Paket einfach vor deine Wohnungstür, okay? Ist nicht so groß. Wenn du das nicht willst, schreib mir schnell eine Nachricht. Ciao!' }] }
        ], plays: 2,
        items: [
          { au: 0, q: 'Was muss Herr Popescu tun?', opts: ['Ein neues Foto mitbringen.', 'Einen Termin machen.', 'Am Montag ohne Termin kommen.'], a: 1, why: '„nur mit Termin. Den Termin machen Sie bitte online oder Sie rufen uns an.“ Ein Foto braucht er nicht.' },
          { au: 1, q: 'Was passiert morgen?', opts: ['Frau Ibrahim muss in die Praxis kommen.', 'Frau Ibrahim bekommt neue Tabletten.', 'Der Arzt ruft Frau Ibrahim an.'], a: 2, why: '„er ruft Sie morgen zwischen zwölf und eins an.“ Sie muss nicht extra kommen.' },
          { au: 2, q: 'Wo ist der Kurs morgen?', opts: ['In Raum 3.', 'In Raum 12.', 'Er fällt aus.'], a: 0, why: '„nicht in Raum zwölf, sondern unten im Erdgeschoss, in Raum drei.“' },
          { au: 3, q: 'Wo bekommt Ali sein Paket?', opts: ['Bei Monika im zweiten Stock.', 'Vor seiner Wohnungstür.', 'Bei der Post.'], a: 1, why: '„Ich stell dir das Paket einfach vor deine Wohnungstür“ – Monika ist abends nicht zu Hause.' }
        ] },
      { title: 'Hören Teil 2: Informationen im Radio', skill: 'hl', pts: 1,
        instr: 'Sie hören fünf kurze Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text einmal.',
        audio: [
          { h: 'Text 1', lines: [{ s: 'n', t: 'Achtung, Autofahrer: Heute Nacht wird es im ganzen Sauerland frostig, bis minus fünf Grad. Morgen früh sind viele Straßen glatt, besonders auf Brücken. Fahren Sie bitte langsam oder nehmen Sie, wenn möglich, Bus und Bahn. Am Nachmittag wird es dann wärmer, und das Eis taut.' }] },
          { h: 'Text 2', lines: [{ s: 'n', t: 'Eine Information der Abfallwirtschaft Bochum: Wegen des Feiertags am Freitag wird der Müll in dieser Woche einen Tag später abgeholt. Wenn Ihre Tonne normalerweise am Freitag geleert wird, stellen Sie sie bitte am Samstag raus. Die Biotonne wird wie immer am Mittwoch geleert.' }] },
          { h: 'Text 3', lines: [{ s: 'n', t: 'Und jetzt ein Tipp für alle, die gern lesen: Die Stadtbibliothek Herne lädt am Donnerstagabend zu einer Lesung ein. Die Autorin Yasemin Kaya liest aus ihrem neuen Roman über eine Familie, die aus Izmir ins Ruhrgebiet kommt. Beginn ist um neunzehn Uhr, der Eintritt ist frei. Wegen der begrenzten Plätze bitte vorher in der Bibliothek anmelden.' }] },
          { h: 'Text 4', lines: [{ s: 'n', t: 'Gute Nachricht für Familien in Essen: Ab nächsten Montag fahren die Buslinien hundertvierzig und hundertfünfundvierzig auch am Abend alle fünfzehn Minuten, bis dreiundzwanzig Uhr. Bisher fuhren die Busse abends nur alle dreißig Minuten. Am Wochenende bleibt der Fahrplan wie bisher.' }] },
          { h: 'Text 5', lines: [{ s: 'n', t: 'Und hier noch eine Meldung aus Ihrer Region: Am Samstag gibt es im Gesundheitsamt Gelsenkirchen eine Impfaktion gegen Grippe. Von zehn bis vierzehn Uhr kann sich jeder ab sechzig Jahren ohne Termin impfen lassen. Bringen Sie bitte Ihre Versichertenkarte und, wenn Sie haben, Ihren Impfpass mit.' }] }
        ], plays: 1,
        items: [
          { au: 0, q: 'Was sollen Autofahrer morgen früh machen?', opts: ['Vorsichtig fahren oder Bus und Bahn nehmen.', 'Erst am Nachmittag losfahren.', 'Die Brücken nicht benutzen.'], a: 0, why: '„Fahren Sie bitte langsam oder nehmen Sie, wenn möglich, Bus und Bahn.“' },
          { au: 1, q: 'Wann wird der Müll abgeholt, der normalerweise am Freitag abgeholt wird?', opts: ['Am Donnerstag.', 'Am Mittwoch.', 'Am Samstag.'], a: 2, why: '„stellen Sie sie bitte am Samstag raus“ – einen Tag später wegen des Feiertags.' },
          { au: 2, q: 'Was muss man für die Lesung tun?', opts: ['Eine Karte kaufen.', 'Sich vorher anmelden.', 'Ein Buch mitbringen.'], a: 1, why: '„Wegen der begrenzten Plätze bitte vorher in der Bibliothek anmelden.“ Der Eintritt ist frei.' },
          { au: 3, q: 'Was ändert sich ab Montag?', opts: ['Die Busse fahren abends öfter.', 'Die Busse fahren am Wochenende länger.', 'Die Busse fahren nur noch bis 23 Uhr.'], a: 0, why: 'Abends fahren sie jetzt „alle fünfzehn Minuten“ statt alle dreißig Minuten.' },
          { au: 4, q: 'Wer kann sich am Samstag impfen lassen?', opts: ['Alle Kinder und Jugendlichen.', 'Nur Personen mit Termin.', 'Personen ab 60 Jahren.'], a: 2, why: '„jeder ab sechzig Jahren ohne Termin“.' }
        ] },
      { title: 'Hören Teil 3: Gespräche im Alltag', skill: 'hl', pts: 1,
        instr: 'Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Zu jedem Gespräch lösen Sie zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?',
        audio: [
          { h: 'Gespräch 1', lines: [
            { s: 'm', t: 'Guten Tag. Ich möchte gern ein Konto eröffnen. Geht das bei Ihnen?' },
            { s: 'f', t: 'Ja, natürlich. Haben Sie einen Termin?' },
            { s: 'm', t: 'Äh, nein. Ich dachte, das geht einfach so.' },
            { s: 'f', t: 'Hm, heute ist es leider schwierig, meine Kollegin ist krank. Aber Sie können das Konto auch online eröffnen, das geht ganz schnell. Oder Sie kommen morgen um zehn, da hab ich noch einen Termin frei.' },
            { s: 'm', t: 'Online … ich weiß nicht, mein Deutsch ist noch nicht so gut für so was. Ich komme lieber morgen.' },
            { s: 'f', t: 'Gut, dann morgen um zehn. Bringen Sie bitte Ihren Pass und Ihre Meldebescheinigung mit. Und wenn Sie schon einen Arbeitsvertrag haben, auch den.' },
            { s: 'm', t: 'Pass, Meldebescheinigung, Arbeitsvertrag. Alles klar, danke!' }
          ] },
          { h: 'Gespräch 2', lines: [
            { s: 'f', t: 'Guten Abend, Frau Nowak. Schön, dass Sie zum Elternsprechtag gekommen sind. Setzen Sie sich doch.' },
            { s: 'f2', t: 'Danke. Wie geht es denn Mateusz in der Schule? Er erzählt zu Hause nicht so viel.' },
            { s: 'f', t: 'Also, ich bin wirklich zufrieden. In Mathe ist er einer der Besten in der Klasse. Nur beim Lesen braucht er noch etwas Hilfe. Er liest sehr langsam.' },
            { s: 'f2', t: 'Ja, das merke ich auch. Was kann ich denn zu Hause machen?' },
            { s: 'f', t: 'Lesen Sie jeden Abend zehn Minuten zusammen mit ihm. Gern auch Comics, das macht ihm bestimmt Spaß. Und mittwochs gibt es bei uns eine Lese-AG nach dem Unterricht. Da kann er kostenlos mitmachen.' },
            { s: 'f2', t: 'Oh, das ist gut. Ich melde ihn an.' }
          ] },
          { h: 'Gespräch 3', lines: [
            { s: 'm', t: 'Entschuldigung, können Sie mir kurz helfen? Ich verstehe den Automaten nicht.' },
            { s: 'm2', t: 'Klar. Wo wollen Sie denn hin?' },
            { s: 'm', t: 'Nach Bochum, Hauptbahnhof. Und zurück, heute Abend.' },
            { s: 'm2', t: 'Dann nehmen Sie am besten das Tagesticket. Das ist billiger als zwei Einzelfahrkarten. Hier, drücken Sie auf „Tickets“, dann „Tagesticket“, Preisstufe B.' },
            { s: 'm', t: 'Ah, okay. Und kann ich mit Karte bezahlen? Ich hab kein Kleingeld.' },
            { s: 'm2', t: 'Ja, mit Karte geht, nur Scheine nimmt der hier nicht. Und denken Sie dran: Das Ticket gilt bis morgen früh um drei Uhr.' },
            { s: 'm', t: 'Super, vielen Dank!' }
          ] },
          { h: 'Gespräch 4', lines: [
            { s: 'f', t: 'Du, Daniel, kannst du am Samstag meine Frühschicht übernehmen? Meine Schwester heiratet.' },
            { s: 'm', t: 'Samstag früh … hm. Eigentlich wollte ich mit meinen Kindern ins Schwimmbad. Aber okay, das können wir auch am Sonntag machen.' },
            { s: 'f', t: 'Danke, du bist ein Schatz! Ich übernehme dafür deine Spätschicht am Dienstag, ja?' },
            { s: 'm', t: 'Das wäre super. Aber wir müssen das noch dem Chef sagen.' },
            { s: 'f', t: 'Ja, ich schreib Herrn Schulz gleich eine E-Mail und setz dich in Kopie.' }
          ] }
        ], plays: 1,
        items: [
          { au: 0, q: 'Der Mann hat einen Termin bei der Bank.', opts: ['Richtig', 'Falsch'], a: 1, why: '„Haben Sie einen Termin?“ – „Äh, nein.“' },
          { au: 0, q: 'Was macht der Mann?', opts: ['Er eröffnet das Konto online.', 'Er kommt morgen wieder.', 'Er spricht heute mit der Kollegin.'], a: 1, why: '„Ich komme lieber morgen.“ – Termin morgen um zehn.' },
          { au: 1, q: 'Mateusz ist in Mathe sehr gut.', opts: ['Richtig', 'Falsch'], a: 0, why: '„In Mathe ist er einer der Besten in der Klasse.“' },
          { au: 1, q: 'Was rät die Lehrerin?', opts: ['Mateusz soll eine Nachhilfe bezahlen.', 'Mateusz soll weniger Comics lesen.', 'Die Mutter soll jeden Abend mit ihm lesen.'], a: 2, why: '„Lesen Sie jeden Abend zehn Minuten zusammen mit ihm.“' },
          { au: 2, q: 'Am Automaten kann man mit Karte bezahlen.', opts: ['Richtig', 'Falsch'], a: 0, why: '„Ja, mit Karte geht, nur Scheine nimmt der hier nicht.“' },
          { au: 2, q: 'Welche Fahrkarte kauft der Mann?', opts: ['Zwei Einzelfahrkarten.', 'Eine Monatskarte.', 'Ein Tagesticket.'], a: 2, why: '„Dann nehmen Sie am besten das Tagesticket. Das ist billiger als zwei Einzelfahrkarten.“' },
          { au: 3, q: 'Daniel geht am Samstag mit seinen Kindern schwimmen.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Er arbeitet am Samstag; ins Schwimmbad gehen sie „am Sonntag“.' },
          { au: 3, q: 'Wer informiert den Chef?', opts: ['Die Frau.', 'Daniel.', 'Beide zusammen am Dienstag.'], a: 0, why: '„Ja, ich schreib Herrn Schulz gleich eine E-Mail“.' }
        ] },
      { title: 'Hören Teil 4: Meinungen im Radio', skill: 'hl', pts: 1,
        instr: 'Sie hören drei Personen in einer Radiosendung zum Thema „Wohnen: lieber in der Stadt oder auf dem Land?“. Welche Aussage passt zu welcher Person? Wählen Sie für jede Person eine Aussage a–f. Drei Aussagen passen nicht. Lesen Sie zuerst die Aussagen a–f. Dazu haben Sie eine Minute Zeit. Sie hören jeden Text einmal.',
        audio: [
          { h: 'Person 1: Frau Okafor', lines: [
            { s: 'n', t: 'Guten Abend bei „Hallo Nachbarn“! Heute fragen wir: Wohnen Sie lieber in der Stadt oder auf dem Land? Bei mir ist Frau Okafor.' },
            { s: 'f', t: 'Hallo. Also, wir sind vor zwei Jahren aus Köln aufs Land gezogen, in ein kleines Dorf in der Eifel. Und ehrlich gesagt: Die Kinder sind so glücklich! Die spielen den ganzen Tag draußen, im Garten, im Wald. In Köln hatten wir nur einen kleinen Balkon. Ja, man braucht ein Auto, das stimmt. Aber für die Kinder ist das Land einfach besser.' }
          ] },
          { h: 'Person 2: Herr Dimitrov', lines: [
            { s: 'n', t: 'Danke! Und jetzt Herr Dimitrov.' },
            { s: 'm', t: 'Guten Abend. Ich wohne mitten in Frankfurt, und ich will nicht weg. Ich habe kein Auto und brauche auch keins. Zur Arbeit fahre ich mit der U-Bahn, zehn Minuten. Ärzte, Geschäfte, alles ist um die Ecke. Auf dem Land müsste ich für jeden Einkauf ins Auto steigen. Das wäre für mich nichts.' }
          ] },
          { h: 'Person 3: Frau Brenner', lines: [
            { s: 'n', t: 'Und unsere letzte Anruferin: Frau Brenner.' },
            { s: 'f2', t: 'Ja, hallo. Für mich ist das vor allem eine Frage des Geldes. Wir wollten eigentlich in München bleiben, aber die Mieten dort … unmöglich. Für eine Dreizimmerwohnung zahlt man da fast zweitausend Euro. Jetzt wohnen wir in einer Kleinstadt, vierzig Kilometer weg, und zahlen die Hälfte. Mein Mann pendelt jeden Tag, das ist anstrengend, aber anders geht es nicht.' }
          ] }
        ], plays: 1,
        opts: ['a) Auf dem Land ist das Leben für Kinder schöner.', 'b) Auf dem Land findet man schneller Freunde.', 'c) In der Stadt braucht man kein eigenes Auto.', 'd) In der Stadt gibt es mehr Arbeitsplätze.', 'e) Die hohen Mieten in der Stadt zwingen viele Familien zum Umzug.', 'f) Auf dem Land ist die Luft zu schlecht.'],
        items: [
          { au: 0, q: 'Frau Okafor', a: 0, why: '„Die Kinder sind so glücklich! … für die Kinder ist das Land einfach besser.“' },
          { au: 1, q: 'Herr Dimitrov', a: 2, why: '„Ich habe kein Auto und brauche auch keins.“' },
          { au: 2, q: 'Frau Brenner', a: 4, why: 'Wegen der Mieten in München sind sie in eine Kleinstadt gezogen: „anders geht es nicht.“' }
        ] }
    ] },
    { id: 'lesen', title: 'Lesen', minutes: 45, note: 'Fünf Teile, 25 Aufgaben. Du musst nicht jedes Wort verstehen – such die wichtigen Informationen.', parts: [
      { title: 'Lesen Teil 1: Wegweiser', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die Situationen und den Wegweiser im Rathaus. In welches Stockwerk gehen Sie? Wählen Sie die richtige Lösung a, b oder c.',
        material: [{ h: 'Rathaus Oberhausen – Wegweiser', t: '4. Stock: Standesamt (Heirat, Geburtsurkunden) · Jugendamt · Elterngeld · Kita-Anmeldung\n\n3. Stock: Ausländerbehörde (Aufenthaltstitel, Verlängerung) · Einbürgerung · Integrationsbüro\n\n2. Stock: Sozialamt · Wohngeld · Wohnberechtigungsschein (WBS) · Schuldnerberatung\n\n1. Stock: Bürgeramt (Ausweis, Reisepass, Anmeldung und Ummeldung) · Führerscheinstelle · Fundbüro\n\nErdgeschoss: Information · Kasse · Bürgercafé · Toiletten\n\nUntergeschoss: Archiv · Fahrradständer · Tiefgarage' }],
        items: [
          { q: 'Sie sind in eine neue Wohnung in Oberhausen gezogen und müssen Ihre neue Adresse melden.', opts: ['1. Stock', '3. Stock', 'anderes Stockwerk'], a: 0, why: '„Anmeldung und Ummeldung“ im Bürgeramt, 1. Stock.' },
          { q: 'Ihr Aufenthaltstitel läuft in zwei Monaten ab.', opts: ['2. Stock', '3. Stock', 'anderes Stockwerk'], a: 1, why: '„Ausländerbehörde (Aufenthaltstitel, Verlängerung)“ im 3. Stock.' },
          { q: 'Sie haben wenig Geld und möchten Hilfe bei der Miete beantragen.', opts: ['1. Stock', '4. Stock', 'anderes Stockwerk'], a: 2, why: '„Wohngeld“ gibt es im 2. Stock – also ein anderes Stockwerk.' },
          { q: 'Ihr Baby ist im Krankenhaus in Oberhausen geboren. Sie brauchen eine Geburtsurkunde.', opts: ['Erdgeschoss', '4. Stock', 'anderes Stockwerk'], a: 1, why: '„Standesamt (Heirat, Geburtsurkunden)“ im 4. Stock.' },
          { q: 'Sie haben gestern im Rathaus Ihren Schlüssel verloren.', opts: ['Erdgeschoss', '2. Stock', 'anderes Stockwerk'], a: 2, why: 'Das „Fundbüro“ ist im 1. Stock – also ein anderes Stockwerk.' }
        ] },
      { title: 'Lesen Teil 2: Anzeigen', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die Situationen und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal wählen. Für eine Situation gibt es keine passende Anzeige. Wählen Sie dann x.',
        material: [
          { h: 'a', t: 'Hausaufgabenhilfe im Jugendzentrum: Mo–Do 14–16 Uhr, für Kinder der Klassen 1–6. Kostenlos, ohne Anmeldung. Ehrenamtliche helfen bei allen Fächern.' },
          { h: 'b', t: 'Verkaufe Waschmaschine, 2 Jahre alt, sehr guter Zustand, 150 €. Lieferung und Anschluss gegen 20 € möglich. Tel. 0170 / 44 55 21 98' },
          { h: 'c', t: 'Mieterberatung der Caritas: Kostenlose Hilfe bei Problemen mit Vermietern, Kündigung oder Nebenkosten. Dienstags 10–13 Uhr, auch auf Arabisch und Türkisch.' },
          { h: 'd', t: 'Nähkurs für Anfängerinnen im Frauenzentrum: 6 Abende, donnerstags 18–20 Uhr. Nähmaschinen sind vorhanden. Kinderbetreuung möglich. 30 €.' },
          { h: 'e', t: 'Gebrauchte Kinderfahrräder ab 25 €! Werkstatt „Rad & Tat“, alle Räder geprüft und repariert. Sa 10–14 Uhr, Hafenstraße 8.' },
          { h: 'f', t: 'Gesprächskreis „Deutsch im Café“: Jeden Freitag 16–18 Uhr in der Stadtbücherei. Ohne Kurs, ohne Prüfung – einfach Deutsch sprechen. Kaffee und Tee gratis.' },
          { h: 'g', t: 'Umzugskartons zu verschenken! 20 Stück, gut erhalten. Bitte selbst abholen, Gartenstraße 3, Klingel Petrović.' },
          { h: 'h', t: 'Erste-Hilfe-Kurs am Kind: Was tun bei Fieber, Unfällen oder Verschlucken? Samstag 9–15 Uhr, DRK-Zentrum. Für Eltern und Großeltern, 35 €.' }
        ],
        opts: ['a) Hausaufgabenhilfe', 'b) Waschmaschine', 'c) Mieterberatung', 'd) Nähkurs', 'e) Kinderfahrräder', 'f) Deutsch im Café', 'g) Umzugskartons', 'h) Erste Hilfe am Kind', 'x) keine passende Anzeige'],
        items: [
          { q: 'Sie haben Ihren Deutschkurs beendet und möchten weiter Deutsch sprechen – ohne Unterricht.', a: 5, why: 'f: „Ohne Kurs, ohne Prüfung – einfach Deutsch sprechen.“' },
          { q: 'Ihr Vermieter will die Miete stark erhöhen. Sie wissen nicht, ob das erlaubt ist.', a: 2, why: 'c: Mieterberatung bei Problemen mit Vermietern.' },
          { q: 'Ihr Sohn (8) hat Geburtstag und wünscht sich ein Fahrrad. Sie haben nicht viel Geld.', a: 4, why: 'e: gebrauchte Kinderfahrräder ab 25 €.' },
          { q: 'Sie suchen einen gebrauchten Kühlschrank.', a: 8, why: 'Es gibt nur eine Waschmaschine, keinen Kühlschrank – also x.' },
          { q: 'Ihre Tochter (10) braucht nach der Schule Hilfe in Mathe.', a: 0, why: 'a: Hausaufgabenhilfe für Klassen 1–6, „bei allen Fächern“.' }
        ] },
      { title: 'Lesen Teil 3: Pressetexte und Mitteilungen', skill: 'hl', pts: 1,
        instr: 'Lesen Sie die drei Texte. Zu jedem Text gibt es zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?',
        material: [
          { h: 'Text 1: Neuer Spielplatz im Stadtteil Hassel', t: 'Nach drei Monaten Bauzeit ist der neue Spielplatz an der Polsumer Straße fertig. Er hat eine große Kletterburg, zwei Schaukeln, einen Sandkasten und einen Bereich für Kleinkinder unter drei Jahren. Neu ist auch ein Wasserspielplatz, der aber erst im Mai in Betrieb geht. Die Kinder aus dem Stadtteil durften bei der Planung mitmachen: In der Grundschule haben sie Bilder von ihrem Traumspielplatz gemalt. Der Spielplatz ist täglich von 8 bis 20 Uhr geöffnet. Hunde sind nicht erlaubt.' },
          { h: 'Text 2: Mitteilung der Kita Pusteblume', t: 'Liebe Eltern, am Freitag, 22. November, ist unsere Kita wegen einer Fortbildung des Teams geschlossen. Wenn Sie an diesem Tag keine Betreuung für Ihr Kind finden, gibt es eine Notgruppe in der Kita Regenbogen, Lindenweg 4. Bitte melden Sie Ihr Kind dafür bis zum 15. November im Büro an. Die Notgruppe ist von 7:30 bis 14 Uhr geöffnet. Bitte geben Sie Ihrem Kind ein Frühstück und ein Mittagessen mit. Vielen Dank! Ihr Team der Kita Pusteblume' },
          { h: 'Text 3: Kostenlose Energieberatung', t: 'Die Verbraucherzentrale Dortmund bietet ab sofort eine kostenlose Energieberatung für Mieterinnen und Mieter an. Eine Beraterin kommt zu Ihnen nach Hause und zeigt Ihnen, wie Sie Strom und Heizkosten sparen können, zum Beispiel beim Kochen, Waschen oder Lüften. Außerdem prüft sie Ihre letzte Stromrechnung. Die Beratung dauert etwa eine Stunde. Termine gibt es telefonisch unter 0231 / 72 09 15 – von Montag bis Freitag zwischen 9 und 15 Uhr.' }
        ],
        items: [
          { q: 'Text 1: Der Wasserspielplatz ist schon geöffnet.', opts: ['Richtig', 'Falsch'], a: 1, why: 'Er „geht aber erst im Mai in Betrieb“.' },
          { q: 'Text 1: Bei der Planung des Spielplatzes …', opts: ['haben die Eltern Geld gesammelt.', 'haben Kinder Bilder gemalt.', 'durften Hunde mitkommen.'], a: 1, why: '„In der Grundschule haben sie Bilder von ihrem Traumspielplatz gemalt.“' },
          { q: 'Text 2: Am 22. November gibt es in der Kita Pusteblume keine Betreuung.', opts: ['Richtig', 'Falsch'], a: 0, why: 'Die Kita ist „wegen einer Fortbildung des Teams geschlossen“; die Notgruppe ist in einer anderen Kita.' },
          { q: 'Text 2: Für die Notgruppe müssen die Eltern …', opts: ['ihr Kind bis zum 15. November anmelden.', 'das Mittagessen bezahlen.', 'ihr Kind um 16 Uhr abholen.'], a: 0, why: '„Bitte melden Sie Ihr Kind dafür bis zum 15. November im Büro an.“' },
          { q: 'Text 3: Für die Energieberatung muss man nichts bezahlen.', opts: ['Richtig', 'Falsch'], a: 0, why: '„eine kostenlose Energieberatung“.' },
          { q: 'Text 3: Die Beraterin …', opts: ['repariert die Heizung.', 'kommt in die Wohnung.', 'schickt eine neue Stromrechnung.'], a: 1, why: '„Eine Beraterin kommt zu Ihnen nach Hause“.' }
        ] },
      { title: 'Lesen Teil 4: Informationsbroschüre', skill: 'hl', pts: 1,
        instr: 'Lesen Sie den Text aus einer Broschüre. Sind die Aussagen richtig oder falsch?',
        material: [{ h: 'Kindergeld – das Wichtigste in Kürze (Familienkasse)', t: 'Wer bekommt Kindergeld?\nEltern bekommen Kindergeld für jedes Kind bis zum 18. Geburtstag. Macht das Kind eine Ausbildung oder studiert es, gibt es das Kindergeld bis zum 25. Geburtstag. Ausländische Eltern brauchen in der Regel einen Aufenthaltstitel, der ihnen das Arbeiten in Deutschland erlaubt.\n\nWie beantrage ich Kindergeld?\nDen Antrag stellen Sie bei der Familienkasse – online oder auf Papier. Sie brauchen die Steuer-Identifikationsnummer von sich und von Ihrem Kind. Diese Nummer schickt das Bundeszentralamt für Steuern nach der Geburt automatisch per Post.\n\nWie lange kann ich warten?\nKindergeld wird höchstens sechs Monate rückwirkend gezahlt. Stellen Sie den Antrag deshalb möglichst bald nach der Geburt oder dem Umzug nach Deutschland.\n\nWas muss ich melden?\nÄnderungen, zum Beispiel eine neue Adresse, eine neue Bankverbindung oder das Ende der Ausbildung Ihres Kindes, müssen Sie der Familienkasse sofort mitteilen.' }],
        opts: ['Richtig', 'Falsch'],
        items: [
          { q: 'Für ein Kind, das mit 20 Jahren studiert, kann man noch Kindergeld bekommen.', a: 0, why: '„Macht das Kind eine Ausbildung oder studiert es, gibt es das Kindergeld bis zum 25. Geburtstag.“' },
          { q: 'Den Antrag kann man nur online stellen.', a: 1, why: '„online oder auf Papier“.' },
          { q: 'Wenn man ein Jahr zu spät beantragt, bekommt man das Kindergeld für das ganze Jahr.', a: 1, why: '„höchstens sechs Monate rückwirkend“.' }
        ] },
      { title: 'Lesen Teil 5: Brief mit Lücken', skill: 'hl', pts: 1,
        instr: 'Lesen Sie den Brief. Welches Wort passt in die Lücke? Wählen Sie die richtige Lösung a, b oder c.',
        material: [{ h: 'Entschuldigung für die Schule', t: 'Elena Kovač\nAm Stadtgarten 17\n44787 Bochum\n\nGrundschule Wiemelhausen\nFrau Hoffmann (Klasse 2b)\n\nFehlen meines Sohnes Luka\n\nSehr geehrte Frau Hoffmann,\n\nmein Sohn Luka konnte vom 4. bis {1} 6. November nicht in die Schule kommen. Er hatte hohes Fieber und musste im Bett bleiben. Die Ärztin hat gesagt, {2} er bis Donnerstag zu Hause bleiben soll.\n\nAb Freitag geht es ihm wieder gut und er kommt wieder in die Schule. Leider hat er in diesen Tagen viel verpasst. {3} Sie mir bitte sagen, welche Hausaufgaben er nachholen muss?\n\nAußerdem möchte ich Ihnen mitteilen, dass Luka nächste Woche nicht am Schwimmunterricht teilnehmen kann, {4} er noch etwas schwach ist. Die Ärztin hat ihm Sport für eine Woche verboten. Eine Bescheinigung {5} ich diesem Brief bei.\n\nVielen Dank für Ihr Verständnis und viele {6}\nElena Kovač' }],
        items: [
          { q: '', opts: ['am', 'zum', 'im'], a: 1, why: 'Zeitraum: „vom 4. bis zum 6. November“.' },
          { q: '', opts: ['ob', 'dass', 'weil'], a: 1, why: 'Inhalt einer Aussage: „Die Ärztin hat gesagt, dass …“.' },
          { q: '', opts: ['Müssen', 'Sollen', 'Könnten'], a: 2, why: 'Höfliche Bitte: „Könnten Sie mir bitte sagen …?“' },
          { q: '', opts: ['weil', 'deshalb', 'aber'], a: 0, why: 'Grund mit Verb am Ende: „weil er noch etwas schwach ist“.' },
          { q: '', opts: ['stelle', 'gebe', 'lege'], a: 2, why: 'Feste Wendung: „etwas einem Brief beilegen“ → „Eine Bescheinigung lege ich … bei.“' },
          { q: '', opts: ['Gruß', 'Grüße', 'Grüßen'], a: 1, why: 'Briefschluss: „viele Grüße“.' }
        ] }
    ] },
    { id: 'schreiben', title: 'Schreiben', minutes: 30, parts: [
      { kind: 'write', title: 'Schreiben: E-Mail oder Brief', skill: 's', pts: 20,
        instr: 'Wählen Sie Aufgabe A oder Aufgabe B. Schreiben Sie zu allen vier Punkten etwas. Achten Sie auf den Betreff, die Anrede und den Gruß. Schreiben Sie ungefähr 80 bis 120 Wörter.',
        options: [
          { h: 'Aufgabe A: E-Mail an den Arbeitgeber', situation: 'Sie arbeiten in einem Supermarkt. Ihr Chef ist Herr Wagner. Heute Morgen ist Ihr Kind krank geworden und Sie können nicht zur Arbeit kommen.', task: 'Schreiben Sie eine E-Mail an Herrn Wagner.',
            points: ['Grund für Ihr Schreiben', 'Wie lange Sie fehlen', 'Wer Ihre Aufgaben übernehmen kann', 'Frage nach der Krankmeldung für das Kind'],
            muster: 'Betreff: Krankmeldung – Kind krank\n\nSehr geehrter Herr Wagner,\n\nleider kann ich heute nicht zur Arbeit kommen. Mein Sohn ist heute Nacht krank geworden. Er hat hohes Fieber und kann nicht in den Kindergarten gehen.\n\nIch gehe heute Vormittag mit ihm zum Kinderarzt. Wahrscheinlich bleibe ich bis Freitag zu Hause. Ich sage Ihnen morgen genau Bescheid.\n\nMeine Kollegin Frau Yılmaz kennt meine Aufgaben an der Kasse. Ich habe sie schon gefragt, sie kann meine Schicht morgen übernehmen.\n\nBrauchen Sie eine Bescheinigung vom Arzt? Ich weiß nicht genau, wie das bei einem kranken Kind funktioniert.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\nAnna Kowalska' },
          { h: 'Aufgabe B: Brief an die Hausverwaltung', situation: 'Seit drei Wochen gibt es in Ihrem Haus jede Nacht Lärm aus der Wohnung über Ihnen. Sie haben schon mit den Nachbarn gesprochen, aber nichts hat sich geändert.', task: 'Schreiben Sie einen Brief an die Hausverwaltung.',
            points: ['Grund für Ihr Schreiben', 'Was genau das Problem ist', 'Was Sie schon gemacht haben', 'Bitte um Hilfe'],
            muster: 'Betreff: Lärm in der Nacht – Lindenstraße 8\n\nSehr geehrte Damen und Herren,\n\nich wohne in der Lindenstraße 8 im ersten Stock. Ich schreibe Ihnen, weil ich seit drei Wochen nachts nicht schlafen kann.\n\nIn der Wohnung über mir ist fast jede Nacht laute Musik, oft bis zwei oder drei Uhr. Ich muss um fünf Uhr aufstehen, weil ich Frühschicht habe. Auch meine Kinder wachen nachts auf.\n\nIch habe schon zweimal mit den Nachbarn gesprochen. Sie waren freundlich, aber der Lärm ist nicht weniger geworden.\n\nKönnten Sie bitte mit den Nachbarn sprechen und sie an die Hausordnung erinnern? Vielen Dank für Ihre Hilfe.\n\nMit freundlichen Grüßen\nMohammed Al-Hassan' }
        ],
        minWords: 80,
        check: ['Zu allen vier Leitpunkten etwas geschrieben', 'Betreff passend formuliert', 'Passende Anrede und passender Gruß (Sehr geehrter Herr … / Sehr geehrte Damen und Herren … – Mit freundlichen Grüßen)', 'Sie-Form durchgehend benutzt', 'Sätze mit weil, dass, wenn richtig gebaut (Verb am Ende)', 'Höfliche Bitte mit „Könnten Sie …?“ oder „Bitte …“', 'Ungefähr 80–120 Wörter'] }
    ] },
    { id: 'sprechen', title: 'Sprechen', minutes: 16, note: 'In der echten Prüfung sprichst du zu zweit mit zwei Prüfenden. Hier wird die Paarprüfung simuliert: Lies die Fragen und Impulse und antworte laut.', parts: [
      { kind: 'speak', title: 'Teil 1: Über sich sprechen', skill: 'm', pts: 30, minutes: 4,
        instr: 'Stellen Sie sich bitte vor. Sprechen Sie zu den Stichpunkten. Danach stellt Ihnen die Prüferin noch einige Fragen.',
        task: 'Sprechen Sie über sich:\n– Name\n– Herkunft\n– Wohnort\n– Familie\n– Arbeit/Beruf\n– Sprachen',
        prompts: ['Wie schreibt man Ihren Vornamen? Können Sie ihn bitte buchstabieren?', 'Und wie wohnen Sie? In einer Wohnung oder in einem Haus?', 'Was haben Sie in Ihrem Heimatland gemacht, bevor Sie nach Deutschland gekommen sind?', 'Was war am Anfang in Deutschland besonders schwierig für Sie?', 'Und was machen Sie am Wochenende am liebsten?'],
        redemittel: ['Ich heiße … – Das schreibt man: …', 'Ich wohne mit … in einer …-Zimmer-Wohnung.', 'In meinem Heimatland habe ich als … gearbeitet.', 'Am Anfang war es schwierig, weil …', 'Am Wochenende … ich gern …', 'Ich spreche … und lerne seit … Deutsch.'],
        muster: 'Guten Tag, mein Name ist Svitlana Melnyk. Ich komme aus der Ukraine, aus Lwiw. Seit zwei Jahren wohne ich in Essen. Ich bin verheiratet, mein Mann heißt Andrij, und wir haben eine Tochter, sie ist zwölf. Zu Hause sprechen wir Ukrainisch, ich spreche auch Polnisch, ein bisschen Englisch und Deutsch. In der Ukraine war ich Krankenschwester. Hier arbeite ich im Moment als Pflegehelferin in einem Seniorenheim, und ich möchte meine Anerkennung machen.\n\nAntworten auf die Nachfragen (Beispiele):\n– Svitlana: S – V – I – T – L – A – N – A.\n– Wir wohnen in einer Dreizimmerwohnung im dritten Stock, mit einem kleinen Balkon.\n– Bevor ich nach Deutschland gekommen bin, habe ich zehn Jahre in einem Krankenhaus gearbeitet.\n– Am Anfang war die Sprache sehr schwierig, und die vielen Briefe von den Ämtern.\n– Am Wochenende gehen wir gern im Park spazieren oder treffen Freunde.',
        check: ['Zu allen Stichpunkten etwas gesagt', 'In ganzen Sätzen gesprochen', 'Auf alle Nachfragen passend geantwortet', 'Zeitangaben benutzt (seit, vor, bevor, am Anfang)', 'Perfekt für die Vergangenheit benutzt (ich habe gearbeitet, ich bin gekommen)'] },
      { kind: 'speak', title: 'Teil 2: Über Erfahrungen sprechen (Bild)', skill: 'm', pts: 35, minutes: 6,
        instr: 'Sie sehen ein Foto. Beschreiben Sie zuerst das Bild (2A). Erzählen Sie dann von Ihren eigenen Erfahrungen zum Thema (2B). Danach stellt Ihnen die Prüferin noch einige Fragen.',
        img: { src: 'assets/sim/dtz-3-haltestelle.webp', alt: 'Foto: Eine Straßenbahnhaltestelle in einer deutschen Stadt am Morgen. Im Vordergrund steht ein Fahrkartenautomat. Ein älterer Mann mit Hut und Gehstock kauft gerade eine Fahrkarte, eine junge Person mit grüner Jacke und Rucksack zeigt ihm etwas auf dem Bildschirm. Daneben wartet ein Vater mit einem Mädchen von etwa acht Jahren mit Schulranzen. Ein Mann in oranger Arbeitskleidung schaut auf sein Handy. Auf der rechten Seite fährt gerade eine gelbe Straßenbahn ein. Im Hintergrund sieht man Radfahrer auf einem Radweg und Häuser. Es ist bewölkt, die Leute tragen Jacken.' },
        task: '2A: Was sehen Sie auf dem Bild? Was machen die Personen?\n2B: Wie kommen Sie zur Arbeit, zum Kurs oder zum Einkaufen? Wie ist das in Ihrem Heimatland?',
        prompts: ['Sie fahren mit dem Bus. Wie lange brauchen Sie denn bis zum Kurs?', 'Was finden Sie gut an Bus und Bahn in Deutschland – und was nicht so gut?', 'Haben Sie einen Führerschein? Möchten Sie in Deutschland Auto fahren?', 'Und wie fahren die Kinder in Ihrem Heimatland zur Schule?'],
        redemittel: ['Auf dem Bild sieht man … / Das Foto zeigt …', 'Im Vordergrund / Im Hintergrund / Rechts / Links …', 'Der Mann kauft gerade … / Die Frau hilft …', 'Ich glaube, … / Vielleicht …', 'Ich fahre meistens mit … , weil …', 'Bei uns in … ist das anders: …'],
        muster: '2A: Auf dem Bild sieht man eine Straßenbahnhaltestelle in einer Stadt. Im Vordergrund steht ein Fahrkartenautomat. Ein älterer Mann mit Hut kauft eine Fahrkarte, aber ich glaube, er hat ein Problem. Eine junge Person mit Rucksack hilft ihm und zeigt ihm etwas auf dem Bildschirm. Daneben wartet ein Vater mit seiner Tochter, sie hat einen Schulranzen. Vielleicht bringt er sie zur Schule. Ein Mann schaut auf sein Handy. Rechts kommt gerade die Straßenbahn. Im Hintergrund fahren Leute Fahrrad. Ich denke, es ist morgens, und die Leute fahren zur Arbeit oder zur Schule.\n\n2B: Ich fahre jeden Tag mit dem Bus zum Deutschkurs. Ich brauche ungefähr zwanzig Minuten. Ich habe ein Deutschlandticket, das ist praktisch, weil ich damit in ganz Deutschland fahren kann. Manchmal kommt der Bus aber zu spät, das ist ärgerlich. In meinem Heimatland, in Syrien, fahren viele Leute mit kleinen Minibussen. Es gibt keinen Fahrplan, man wartet einfach an der Straße. Am Anfang war der Fahrkartenautomat in Deutschland für mich auch schwierig – genau wie für den Mann auf dem Bild.',
        check: ['Bild beschrieben: Personen, Ort, Handlungen', 'Wörter für die Position benutzt (vorne, hinten, links, rechts)', 'Vermutungen formuliert (Ich glaube … / Vielleicht …)', 'Eigene Erfahrungen erzählt (2B)', 'Mit dem Heimatland verglichen', 'Auf die Nachfragen ausführlich geantwortet'] },
      { kind: 'speak', title: 'Teil 3: Gemeinsam etwas planen', skill: 'm', pts: 35, minutes: 6,
        instr: 'Sie planen zusammen mit Ihrem Partner / Ihrer Partnerin etwas. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich am Ende. Hier sagt die Partnerin ihre Vorschläge nacheinander – reagieren Sie jedes Mal darauf.',
        task: 'Ihr Deutschkurs möchte am Ende des Kurses einen Ausflug machen. Sie sollen zusammen mit Ihrem Partner / Ihrer Partnerin den Ausflug planen.\n\nPlanen Sie gemeinsam:\n– Wohin? (See, Zoo, Museum, Stadt …)\n– Wann? (Tag, Uhrzeit)\n– Wie fahren Sie dorthin?\n– Essen und Trinken?\n– Wer macht was?',
        prompts: ['Also, ich hätte Lust auf den Zoo. Da können auch die Kinder mitkommen. Was meinst du?', 'Hm, okay. Und wann? Ich würde sagen, an einem Samstag, dann haben alle frei.', 'Wie fahren wir hin? Ich finde, mit dem Zug ist es am einfachsten.', 'Und das Essen? Im Restaurant ist es ziemlich teuer, oder?', 'Wer kümmert sich um die Fahrkarten? Ich kenne mich da nicht so gut aus.', 'Super. Und wer sagt der Kursleiterin Bescheid?'],
        redemittel: ['Vorschläge machen: Wie wäre es mit …? / Wir könnten doch … / Ich schlage vor, …', 'Zustimmen: Gute Idee! / Einverstanden. / Das finde ich gut.', 'Ablehnen: Ich weiß nicht, … / Das ist vielleicht zu teuer, weil …', 'Alternative: Lieber … / Was hältst du von …?', 'Aufgaben verteilen: Ich mache … / Kannst du …?', 'Ergebnis: Also, wir machen es so: …'],
        muster: 'A: Also, ich hätte Lust auf den Zoo. Da können auch die Kinder mitkommen. Was meinst du?\nB: Der Zoo ist schön, aber der Eintritt ist ziemlich teuer. Wie wäre es mit dem Baldeneysee? Dort kann man spazieren gehen, picknicken und es kostet nichts.\nA: Hm, okay, das ist eine gute Idee. Und wann? Ich würde sagen, an einem Samstag, dann haben alle frei.\nB: Einverstanden. Samstag in zwei Wochen, um zehn Uhr?\nA: Gut. Wie fahren wir hin? Ich finde, mit dem Zug ist es am einfachsten.\nB: Mit der S-Bahn sind es nur zwanzig Minuten. Und viele haben schon ein Deutschlandticket.\nA: Und das Essen? Im Restaurant ist es ziemlich teuer, oder?\nB: Ja, lass uns lieber ein Picknick machen. Jeder bringt etwas mit, zum Beispiel ein Gericht aus seinem Land.\nA: Schön! Wer kümmert sich um die Fahrkarten? Ich kenne mich da nicht so gut aus.\nB: Das mache ich. Ich frage, wer ein Ticket braucht, und kaufe ein Gruppenticket.\nA: Super. Und wer sagt der Kursleiterin Bescheid?\nB: Kannst du das machen? Du sitzt ja immer vorne. Also: Samstag in zwei Wochen um zehn, mit der S-Bahn zum Baldeneysee, Picknick, ich kümmere mich um die Fahrkarten und du sprichst mit der Kursleiterin.',
        check: ['Eigene Vorschläge gemacht', 'Auf jeden Vorschlag reagiert (zustimmen oder ablehnen mit Grund)', 'Alternativen vorgeschlagen', 'Aufgaben verteilt', 'Am Ende eine Einigung zusammengefasst', 'Du-Form passend zum Gespräch mit dem Partner benutzt'] }
    ] }
  ]
};
