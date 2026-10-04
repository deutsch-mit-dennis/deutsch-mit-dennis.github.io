/* Hörtraining DTZ und DTB B2 – eigene Übungstexte (keine offiziellen Prüfungsaufgaben).
   Die Tonaufnahmen erzeugt .github/workflows/audio.yml (audio/tts/<id>.mp3). */
(window.DM || (window.DM = {})).listeningExam = {
"dtz-1": {
"title": "DTZ Hören · Übungssatz 1",
"level": "A2–B1",
"exam": "DTZ",
"intro": "Ein kompletter Durchgang mit allen vier Teilen: Ansagen, Durchsagen, ein Alltagsgespräch und Meinungen. Hör jeden Text einmal (Teil 1 und 3 darfst du zweimal hören) und entscheide dich schnell.",
"group": "dtz",
"items": [
{
"id": "dtz-1-01",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Eine Arztpraxis hat auf den Anrufbeantworter gesprochen.",
"segments": [
{
"voice": "f2",
"text": "Guten Tag, Frau Kowalski, hier ist die Praxis Dr. Yilmaz in Bochum. Leider ist Frau Dr. Yilmaz am Donnerstag krank. Ihr Termin am Donnerstag um 9:30 Uhr fällt deshalb aus. Wir können Ihnen Freitag um 11 Uhr anbieten oder Montag um 8:15 Uhr. Bitte rufen Sie uns kurz zurück. Danke und auf Wiederhören."
}
],
"text": "Guten Tag, Frau Kowalski, hier ist die Praxis Dr. Yilmaz in Bochum. Leider ist Frau Dr. Yilmaz am Donnerstag krank. Ihr Termin am Donnerstag um 9:30 Uhr fällt deshalb aus. Wir können Ihnen Freitag um 11 Uhr anbieten oder Montag um 8:15 Uhr. Bitte rufen Sie uns kurz zurück. Danke und auf Wiederhören.",
"questions": [
{
"q": "Was soll Frau Kowalski tun?",
"options": [
"Am Donnerstag in die Praxis kommen.",
"Die Praxis zurückrufen.",
"Am Freitag um 11 Uhr kommen."
],
"answer": 1,
"why": "Die Praxis bietet zwei neue Termine an und sagt: „Bitte rufen Sie uns kurz zurück.“ Freitag ist nur ein Angebot, noch kein fester Termin."
}
]
},
{
"id": "dtz-1-02",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Die Hausverwaltung ruft an.",
"segments": [
{
"voice": "m2",
"text": "Hallo Herr Demir, Peters hier von der Hausverwaltung Ruhrblick. Sie hatten wegen der Heizung angerufen. Der Monteur kommt morgen, also am Mittwoch, zwischen 13 und 15 Uhr. Wenn Sie da nicht zu Hause sind, geben Sie den Schlüssel bitte bei Frau Lange im Erdgeschoss ab. Ach so, der Monteur muss auch ins Badezimmer. Danke!"
}
],
"text": "Hallo Herr Demir, Peters hier von der Hausverwaltung Ruhrblick. Sie hatten wegen der Heizung angerufen. Der Monteur kommt morgen, also am Mittwoch, zwischen 13 und 15 Uhr. Wenn Sie da nicht zu Hause sind, geben Sie den Schlüssel bitte bei Frau Lange im Erdgeschoss ab. Ach so, der Monteur muss auch ins Badezimmer. Danke!",
"questions": [
{
"q": "Was soll Herr Demir machen, wenn er nicht zu Hause ist?",
"options": [
"Den Monteur anrufen.",
"Einen neuen Termin vereinbaren.",
"Den Schlüssel bei Frau Lange abgeben."
],
"answer": 2,
"why": "Herr Peters sagt: „Geben Sie den Schlüssel bitte bei Frau Lange im Erdgeschoss ab.“"
}
]
},
{
"id": "dtz-1-03",
"teil": "Teil 2",
"type": "Durchsage am Bahnhof",
"situation": "Du bist am Hauptbahnhof Gelsenkirchen.",
"segments": [
{
"voice": "f1",
"text": "Information zum RE 2 nach Münster, planmäßige Abfahrt 14:12 Uhr: Dieser Zug fährt heute ausnahmsweise von Gleis 5, nicht von Gleis 3. Die Abfahrt verzögert sich um etwa zehn Minuten. Reisende nach Haltern am See steigen bitte in die vorderen Wagen ein. Wir bitten um Entschuldigung."
}
],
"text": "Information zum RE 2 nach Münster, planmäßige Abfahrt 14:12 Uhr: Dieser Zug fährt heute ausnahmsweise von Gleis 5, nicht von Gleis 3. Die Abfahrt verzögert sich um etwa zehn Minuten. Reisende nach Haltern am See steigen bitte in die vorderen Wagen ein. Wir bitten um Entschuldigung.",
"questions": [
{
"q": "Von welchem Gleis fährt der Zug nach Münster heute ab?",
"options": [
"Gleis 2",
"Gleis 3",
"Gleis 5"
],
"answer": 2,
"why": "„Dieser Zug fährt heute ausnahmsweise von Gleis 5, nicht von Gleis 3.“ Die 2 ist die Zugnummer (RE 2)."
}
]
},
{
"id": "dtz-1-04",
"teil": "Teil 3",
"type": "Gespräch",
"situation": "Eine Mutter ruft in einer Kita in Herne an.",
"segments": [
{
"voice": "f3",
"text": "Kita Sonnenblume, Brinkmann, guten Morgen."
},
{
"voice": "f2",
"text": "Ja, guten Morgen, mein Name ist Petrova. Ich möchte meine Tochter für die Kita anmelden. Sie ist jetzt zwei Jahre alt."
},
{
"voice": "f3",
"text": "Ah, schön. Haben Sie Ihre Tochter schon im Kita-Navigator der Stadt angemeldet?"
},
{
"voice": "f2",
"text": "Äh, nein. Was ist das?"
},
{
"voice": "f3",
"text": "Das ist eine Internetseite. Da melden Sie Ihr Kind an und wählen drei Kitas aus. Sie können aber auch am Dienstag zu unserem Infonachmittag kommen, von 15 bis 17 Uhr. Dann helfe ich Ihnen dabei."
},
{
"voice": "f2",
"text": "Dienstag passt gut. Muss ich etwas mitbringen?"
},
{
"voice": "f3",
"text": "Ja, bitte die Geburtsurkunde und den Impfpass von Ihrer Tochter."
},
{
"voice": "f2",
"text": "Gut, mache ich. Vielen Dank!"
}
],
"text": "Kita Sonnenblume, Brinkmann, guten Morgen. – Ja, guten Morgen, mein Name ist Petrova. Ich möchte meine Tochter für die Kita anmelden. Sie ist jetzt zwei Jahre alt. – Ah, schön. Haben Sie Ihre Tochter schon im Kita-Navigator der Stadt angemeldet? – Äh, nein. Was ist das? – Das ist eine Internetseite. Da melden Sie Ihr Kind an und wählen drei Kitas aus. Sie können aber auch am Dienstag zu unserem Infonachmittag kommen, von 15 bis 17 Uhr. Dann helfe ich Ihnen dabei. – Dienstag passt gut. Muss ich etwas mitbringen? – Ja, bitte die Geburtsurkunde und den Impfpass von Ihrer Tochter. – Gut, mache ich. Vielen Dank!",
"questions": [
{
"q": "Frau Petrova hat ihre Tochter schon online angemeldet.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie kennt den Kita-Navigator noch nicht („Äh, nein. Was ist das?“)."
},
{
"q": "Was soll Frau Petrova am Dienstag mitbringen?",
"options": [
"Die Geburtsurkunde und den Impfpass.",
"Den Ausweis und ein Foto.",
"Die Meldebescheinigung."
],
"answer": 0,
"why": "Frau Brinkmann sagt: „Bitte die Geburtsurkunde und den Impfpass von Ihrer Tochter.“"
}
]
},
{
"id": "dtz-1-05",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Sollen Supermärkte auch am Sonntag öffnen? Du hörst Aylin.",
"segments": [
{
"voice": "f2",
"text": "Also, ich finde, der Sonntag soll ein freier Tag bleiben. Ich arbeite selbst im Supermarkt, an der Kasse. Unter der Woche habe ich oft lange Schichten. Der Sonntag ist der einzige Tag, an dem meine ganze Familie zusammen frühstücken kann. Das möchte ich nicht verlieren."
}
],
"text": "Also, ich finde, der Sonntag soll ein freier Tag bleiben. Ich arbeite selbst im Supermarkt, an der Kasse. Unter der Woche habe ich oft lange Schichten. Der Sonntag ist der einzige Tag, an dem meine ganze Familie zusammen frühstücken kann. Das möchte ich nicht verlieren.",
"questions": [
{
"q": "Welche Aussage passt zu Aylin?",
"options": [
"Sie braucht den Sonntag für ihre Familie.",
"Sie hat unter der Woche keine Zeit zum Einkaufen.",
"Kleine Geschäfte am Sonntag reichen ihr."
],
"answer": 0,
"why": "Aylin sagt, der Sonntag ist der einzige Tag, an dem ihre Familie zusammen frühstücken kann."
}
]
},
{
"id": "dtz-1-06",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Sollen Supermärkte auch am Sonntag öffnen? Du hörst Markus.",
"segments": [
{
"voice": "m2",
"text": "Ich bin dafür. Ich arbeite im Schichtdienst bei einer Spedition in Duisburg, manchmal auch samstags. Wann soll ich denn einkaufen? Unter der Woche schaffe ich es oft nicht vor acht Uhr abends. Ein paar Stunden am Sonntag wären für Leute wie mich wirklich praktisch."
}
],
"text": "Ich bin dafür. Ich arbeite im Schichtdienst bei einer Spedition in Duisburg, manchmal auch samstags. Wann soll ich denn einkaufen? Unter der Woche schaffe ich es oft nicht vor acht Uhr abends. Ein paar Stunden am Sonntag wären für Leute wie mich wirklich praktisch.",
"questions": [
{
"q": "Welche Aussage passt zu Markus?",
"options": [
"Er möchte am Sonntag lieber frei haben.",
"Für ihn wäre Einkaufen am Sonntag praktisch.",
"Er kauft immer am Kiosk ein."
],
"answer": 1,
"why": "Markus arbeitet im Schichtdienst und sagt: „Ein paar Stunden am Sonntag wären … wirklich praktisch.“"
}
]
},
{
"id": "dtz-1-07",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Sollen Supermärkte auch am Sonntag öffnen? Du hörst Irina.",
"segments": [
{
"voice": "f3",
"text": "Hm, schwierige Frage. Ich glaube, es muss nicht jeder Laden am Sonntag offen sein. Bäckereien und kleine Kioske, die gibt es ja schon, und das reicht eigentlich. Wer am Sonntag Milch braucht, findet immer etwas. Große Supermärkte müssen nicht öffnen."
}
],
"text": "Hm, schwierige Frage. Ich glaube, es muss nicht jeder Laden am Sonntag offen sein. Bäckereien und kleine Kioske, die gibt es ja schon, und das reicht eigentlich. Wer am Sonntag Milch braucht, findet immer etwas. Große Supermärkte müssen nicht öffnen.",
"questions": [
{
"q": "Welche Aussage passt zu Irina?",
"options": [
"Sie möchte, dass alle Supermärkte am Sonntag öffnen.",
"Sie arbeitet selbst sonntags.",
"Bäckereien und Kioske am Sonntag sind für sie genug."
],
"answer": 2,
"why": "Irina sagt über Bäckereien und Kioske: „… das reicht eigentlich.“"
}
]
}
]
},
"dtz-2": {
"title": "DTZ Hören · Übungssatz 2",
"level": "A2–B1",
"exam": "DTZ",
"intro": "Diesmal mit Verkehrsfunk und einer Durchsage im Supermarkt. Achte besonders auf Zahlen: Oft kommen mehrere Zahlen vor, aber nur eine ist die richtige Antwort.",
"group": "dtz",
"items": [
{
"id": "dtz-2-01",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Die Volkshochschule hat eine Nachricht hinterlassen.",
"segments": [
{
"voice": "m1",
"text": "Guten Tag, hier ist die Volkshochschule Essen, Anmeldung. Das ist eine Nachricht für die Teilnehmenden im Kurs „Deutsch am Computer“. Der Kurs am Montag, dem 12. Oktober, fällt leider aus, weil die Kursleiterin krank ist. Wir holen die Stunde am Montag, dem 19. Oktober, nach. Gleiche Uhrzeit, aber in Raum 204 statt in Raum 110. Vielen Dank."
}
],
"text": "Guten Tag, hier ist die Volkshochschule Essen, Anmeldung. Das ist eine Nachricht für die Teilnehmenden im Kurs „Deutsch am Computer“. Der Kurs am Montag, dem 12. Oktober, fällt leider aus, weil die Kursleiterin krank ist. Wir holen die Stunde am Montag, dem 19. Oktober, nach. Gleiche Uhrzeit, aber in Raum 204 statt in Raum 110. Vielen Dank.",
"questions": [
{
"q": "Wann und wo findet die nächste Kursstunde statt?",
"options": [
"Am 12. Oktober in Raum 110.",
"Am 19. Oktober in Raum 110.",
"Am 19. Oktober in Raum 204."
],
"answer": 2,
"why": "Die Stunde wird am 19. Oktober nachgeholt, „in Raum 204 statt in Raum 110“."
}
]
},
{
"id": "dtz-2-02",
"teil": "Teil 2",
"type": "Verkehrsfunk",
"situation": "Du hörst Radio im Auto.",
"segments": [
{
"voice": "m3",
"text": "Und jetzt die Verkehrslage für das Ruhrgebiet: Auf der A 40 in Richtung Dortmund gibt es zwischen Essen-Frillendorf und Gelsenkirchen fünf Kilometer Stau nach einem Unfall. Planen Sie 30 Minuten mehr ein oder fahren Sie besser über die A 42. Auf der A 43 bei Bochum ist die Baustelle seit heute Morgen beendet. Dort läuft der Verkehr wieder normal."
}
],
"text": "Und jetzt die Verkehrslage für das Ruhrgebiet: Auf der A 40 in Richtung Dortmund gibt es zwischen Essen-Frillendorf und Gelsenkirchen fünf Kilometer Stau nach einem Unfall. Planen Sie 30 Minuten mehr ein oder fahren Sie besser über die A 42. Auf der A 43 bei Bochum ist die Baustelle seit heute Morgen beendet. Dort läuft der Verkehr wieder normal.",
"questions": [
{
"q": "Was empfiehlt der Sprecher Autofahrern in Richtung Dortmund?",
"options": [
"Über die A 42 fahren.",
"Über die A 43 fahren.",
"Bei Gelsenkirchen warten."
],
"answer": 0,
"why": "„… fahren Sie besser über die A 42.“ Die A 43 wird nur erwähnt, weil die Baustelle dort fertig ist."
}
]
},
{
"id": "dtz-2-03",
"teil": "Teil 2",
"type": "Durchsage im Supermarkt",
"situation": "Du kaufst im Supermarkt ein.",
"segments": [
{
"voice": "f1",
"text": "Liebe Kundinnen und Kunden, nur noch heute bis 18 Uhr: Alle Obst- und Gemüsesorten aus unserer Region sind 20 Prozent günstiger. Und bitte beachten Sie: Kasse 3 ist heute nur für Kartenzahlung geöffnet. Wenn Sie bar bezahlen möchten, gehen Sie bitte zu Kasse 1 oder 2. Vielen Dank für Ihren Einkauf."
}
],
"text": "Liebe Kundinnen und Kunden, nur noch heute bis 18 Uhr: Alle Obst- und Gemüsesorten aus unserer Region sind 20 Prozent günstiger. Und bitte beachten Sie: Kasse 3 ist heute nur für Kartenzahlung geöffnet. Wenn Sie bar bezahlen möchten, gehen Sie bitte zu Kasse 1 oder 2. Vielen Dank für Ihren Einkauf.",
"questions": [
{
"q": "Was gilt heute an Kasse 3?",
"options": [
"Man kann dort nur bar bezahlen.",
"Man kann dort nur mit Karte bezahlen.",
"Dort gibt es 20 Prozent Rabatt."
],
"answer": 1,
"why": "„Kasse 3 ist heute nur für Kartenzahlung geöffnet.“ Bar bezahlt man an Kasse 1 oder 2."
}
]
},
{
"id": "dtz-2-04",
"teil": "Teil 3",
"type": "Gespräch",
"situation": "Herr Haddad ist im Bürgeramt in Dortmund.",
"segments": [
{
"voice": "f3",
"text": "Guten Tag, was kann ich für Sie tun?"
},
{
"voice": "m3",
"text": "Guten Tag. Ich bin letzte Woche umgezogen, von Bochum nach Dortmund, und ich möchte mich ummelden."
},
{
"voice": "f3",
"text": "Gut. Haben Sie einen Termin?"
},
{
"voice": "m3",
"text": "Ja, um 10:20 Uhr. Ich bin ein bisschen zu früh, oder?"
},
{
"voice": "f3",
"text": "Kein Problem. Ich brauche Ihren Ausweis und die Wohnungsgeberbestätigung von Ihrem Vermieter."
},
{
"voice": "m3",
"text": "Die Bestätigung … Moment … ja, hier. Und den Ausweis habe ich auch."
},
{
"voice": "f3",
"text": "Danke. Wohnen Sie allein in der Wohnung?"
},
{
"voice": "m3",
"text": "Nein, mit meiner Frau. Sie kommt aber nächste Woche selbst, sie arbeitet heute."
},
{
"voice": "f3",
"text": "Das geht. Sie braucht dann aber einen eigenen Termin. Den kann sie online buchen."
},
{
"voice": "m3",
"text": "Okay, ich sage es ihr. Danke schön."
}
],
"text": "Guten Tag, was kann ich für Sie tun? – Guten Tag. Ich bin letzte Woche umgezogen, von Bochum nach Dortmund, und ich möchte mich ummelden. – Gut. Haben Sie einen Termin? – Ja, um 10:20 Uhr. Ich bin ein bisschen zu früh, oder? – Kein Problem. Ich brauche Ihren Ausweis und die Wohnungsgeberbestätigung von Ihrem Vermieter. – Die Bestätigung … Moment … ja, hier. Und den Ausweis habe ich auch. – Danke. Wohnen Sie allein in der Wohnung? – Nein, mit meiner Frau. Sie kommt aber nächste Woche selbst, sie arbeitet heute. – Das geht. Sie braucht dann aber einen eigenen Termin. Den kann sie online buchen. – Okay, ich sage es ihr. Danke schön.",
"questions": [
{
"q": "Herr Haddad meldet heute auch seine Frau um.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Seine Frau arbeitet heute und kommt nächste Woche selbst."
},
{
"q": "Was muss die Frau von Herrn Haddad machen?",
"options": [
"Die Wohnungsgeberbestätigung schicken.",
"Einen Termin online buchen.",
"Heute um 10:20 Uhr kommen."
],
"answer": 1,
"why": "Die Mitarbeiterin sagt: „Sie braucht dann aber einen eigenen Termin. Den kann sie online buchen.“"
}
]
},
{
"id": "dtz-2-05",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Ab wann sollen Kinder ein eigenes Handy haben? Du hörst Tomasz.",
"segments": [
{
"voice": "m2",
"text": "Mein Sohn hat mit neun Jahren sein erstes Handy bekommen. Er fährt allein mit dem Bus zur Schule, und ich wollte ihn erreichen können. Aber wir haben klare Regeln: Beim Essen und nach acht Uhr abends bleibt das Handy in der Küche. Das klappt eigentlich ganz gut."
}
],
"text": "Mein Sohn hat mit neun Jahren sein erstes Handy bekommen. Er fährt allein mit dem Bus zur Schule, und ich wollte ihn erreichen können. Aber wir haben klare Regeln: Beim Essen und nach acht Uhr abends bleibt das Handy in der Küche. Das klappt eigentlich ganz gut.",
"questions": [
{
"q": "Welche Aussage passt zu Tomasz?",
"options": [
"Er hat mit seinem Sohn feste Handyregeln vereinbart.",
"Er findet, Kinder sollen bis zwölf warten.",
"Er sagt, Eltern müssen ein Vorbild sein."
],
"answer": 0,
"why": "Tomasz erzählt von klaren Regeln: beim Essen und nach acht Uhr bleibt das Handy in der Küche."
}
]
},
{
"id": "dtz-2-06",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Ab wann sollen Kinder ein eigenes Handy haben? Du hörst Sabine.",
"segments": [
{
"voice": "f2",
"text": "Ich arbeite als Lehrerin an einer Grundschule in Oberhausen und sehe jeden Tag, wie müde manche Kinder sind, weil sie nachts spielen. Ich finde, ein Smartphone braucht man frühestens mit zwölf. Vorher reicht ein einfaches Telefon ohne Internet völlig aus."
}
],
"text": "Ich arbeite als Lehrerin an einer Grundschule in Oberhausen und sehe jeden Tag, wie müde manche Kinder sind, weil sie nachts spielen. Ich finde, ein Smartphone braucht man frühestens mit zwölf. Vorher reicht ein einfaches Telefon ohne Internet völlig aus.",
"questions": [
{
"q": "Welche Aussage passt zu Sabine?",
"options": [
"Sie möchte Handys in der Schule verbieten.",
"Ihr eigenes Kind spielt nachts am Handy.",
"Vor zwölf reicht für sie ein Handy ohne Internet."
],
"answer": 2,
"why": "Sabine sagt: „… ein Smartphone braucht man frühestens mit zwölf. Vorher reicht ein einfaches Telefon ohne Internet.“"
}
]
},
{
"id": "dtz-2-07",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Ab wann sollen Kinder ein eigenes Handy haben? Du hörst Hamid.",
"segments": [
{
"voice": "m3",
"text": "Ehrlich gesagt kann man das nicht verbieten. Alle Freunde haben eins, und dann ist das eigene Kind allein. Viel wichtiger finde ich, dass die Eltern selbst ein gutes Beispiel sind. Wenn ich die ganze Zeit aufs Handy schaue, warum soll mein Kind das nicht tun?"
}
],
"text": "Ehrlich gesagt kann man das nicht verbieten. Alle Freunde haben eins, und dann ist das eigene Kind allein. Viel wichtiger finde ich, dass die Eltern selbst ein gutes Beispiel sind. Wenn ich die ganze Zeit aufs Handy schaue, warum soll mein Kind das nicht tun?",
"questions": [
{
"q": "Welche Aussage passt zu Hamid?",
"options": [
"Er hat seinem Kind das Handy verboten.",
"Für ihn ist das Verhalten der Eltern am wichtigsten.",
"Er bringt sein Kind mit dem Bus zur Schule."
],
"answer": 1,
"why": "Hamid sagt: „Viel wichtiger finde ich, dass die Eltern selbst ein gutes Beispiel sind.“"
}
]
}
]
},
"dtz-3": {
"title": "DTZ Hören · Übungssatz 3",
"level": "A2–B1",
"exam": "DTZ",
"intro": "Werkstatt, Verabredung, Stadtfest und Jobsuche: Hier geht es um typische Situationen aus dem Alltag. Lies die Frage immer zuerst, dann weißt du, worauf du achten musst.",
"group": "dtz",
"items": [
{
"id": "dtz-3-01",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Eine Autowerkstatt ruft an.",
"segments": [
{
"voice": "m1",
"text": "Ja, guten Tag, Frau Schneider, hier ist die Autowerkstatt Krüger aus Herne. Ihr Wagen ist fertig. Wir mussten nur die Bremsen vorne wechseln, nicht hinten. Deshalb wird es billiger: 280 Euro statt 450. Sie können das Auto heute bis 18 Uhr abholen. Morgen ist Samstag, da haben wir geschlossen. Tschüss!"
}
],
"text": "Ja, guten Tag, Frau Schneider, hier ist die Autowerkstatt Krüger aus Herne. Ihr Wagen ist fertig. Wir mussten nur die Bremsen vorne wechseln, nicht hinten. Deshalb wird es billiger: 280 Euro statt 450. Sie können das Auto heute bis 18 Uhr abholen. Morgen ist Samstag, da haben wir geschlossen. Tschüss!",
"questions": [
{
"q": "Wie viel muss Frau Schneider bezahlen?",
"options": [
"180 Euro",
"280 Euro",
"450 Euro"
],
"answer": 1,
"why": "„280 Euro statt 450.“ 450 Euro war der alte, höhere Preis."
}
]
},
{
"id": "dtz-3-02",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Eine Freundin spricht auf die Mailbox.",
"segments": [
{
"voice": "f3",
"text": "Hi Nadia, ich bin's, Julia. Du, das mit morgen Nachmittag klappt bei mir leider nicht, ich muss länger arbeiten. Können wir uns stattdessen am Sonntag treffen? Nicht im Café am Markt, das hat sonntags zu, sondern lieber im Westpark, am Eingang bei der Jahrhunderthalle. So um drei? Schreib mir einfach kurz. Bis dann!"
}
],
"text": "Hi Nadia, ich bin's, Julia. Du, das mit morgen Nachmittag klappt bei mir leider nicht, ich muss länger arbeiten. Können wir uns stattdessen am Sonntag treffen? Nicht im Café am Markt, das hat sonntags zu, sondern lieber im Westpark, am Eingang bei der Jahrhunderthalle. So um drei? Schreib mir einfach kurz. Bis dann!",
"questions": [
{
"q": "Wo möchte Julia Nadia treffen?",
"options": [
"Im Café am Markt.",
"Am Eingang vom Westpark.",
"Bei Julia zu Hause."
],
"answer": 1,
"why": "Das Café hat sonntags zu. Julia schlägt vor: „im Westpark, am Eingang bei der Jahrhunderthalle“."
}
]
},
{
"id": "dtz-3-03",
"teil": "Teil 2",
"type": "Radio",
"situation": "Du hörst Radio. Es gibt einen Tipp für das Wochenende.",
"segments": [
{
"voice": "f1",
"text": "Und hier noch ein Tipp für das Wochenende: Am Samstag und Sonntag feiert Herne das Stadtfest in der Innenstadt, mit Musik, Essen aus vielen Ländern und einem Flohmarkt. Wichtig für alle, die mit dem Auto kommen: Die Bahnhofstraße ist das ganze Wochenende gesperrt. Nehmen Sie lieber die U-Bahn. Die U 35 fährt bis Mitternacht alle zehn Minuten."
}
],
"text": "Und hier noch ein Tipp für das Wochenende: Am Samstag und Sonntag feiert Herne das Stadtfest in der Innenstadt, mit Musik, Essen aus vielen Ländern und einem Flohmarkt. Wichtig für alle, die mit dem Auto kommen: Die Bahnhofstraße ist das ganze Wochenende gesperrt. Nehmen Sie lieber die U-Bahn. Die U 35 fährt bis Mitternacht alle zehn Minuten.",
"questions": [
{
"q": "Was sollen die Besucher machen?",
"options": [
"Auf der Bahnhofstraße parken.",
"Am Samstag früh kommen.",
"Mit der U-Bahn fahren."
],
"answer": 2,
"why": "Die Bahnhofstraße ist gesperrt, deshalb: „Nehmen Sie lieber die U-Bahn.“"
}
]
},
{
"id": "dtz-3-04",
"teil": "Teil 3",
"type": "Gespräch",
"situation": "Frau Rahimi spricht mit ihrem Berater im Jobcenter in Gelsenkirchen.",
"segments": [
{
"voice": "m2",
"text": "So, Frau Rahimi, Sie suchen also eine Stelle im Einzelhandel?"
},
{
"voice": "f2",
"text": "Ja, genau. Ich habe in meinem Land sechs Jahre in einem Bekleidungsgeschäft gearbeitet."
},
{
"voice": "m2",
"text": "Sehr gut. Haben Sie Ihren Lebenslauf schon auf Deutsch?"
},
{
"voice": "f2",
"text": "Ja, aber ich bin nicht sicher, ob er gut ist. Und ein Anschreiben habe ich noch nicht."
},
{
"voice": "m2",
"text": "Kein Problem. Wir haben einen Bewerbungskurs, jeden Mittwoch von neun bis zwölf, hier im Haus. Da schreiben Sie das Anschreiben zusammen mit einer Trainerin."
},
{
"voice": "f2",
"text": "Mittwochs? Hm, mittwochs vormittags habe ich selbst Deutschkurs."
},
{
"voice": "m2",
"text": "Dann gibt es noch den Kurs am Donnerstag, aber erst ab dem 5. November."
},
{
"voice": "f2",
"text": "Das ist besser. Bitte melden Sie mich dafür an."
}
],
"text": "So, Frau Rahimi, Sie suchen also eine Stelle im Einzelhandel? – Ja, genau. Ich habe in meinem Land sechs Jahre in einem Bekleidungsgeschäft gearbeitet. – Sehr gut. Haben Sie Ihren Lebenslauf schon auf Deutsch? – Ja, aber ich bin nicht sicher, ob er gut ist. Und ein Anschreiben habe ich noch nicht. – Kein Problem. Wir haben einen Bewerbungskurs, jeden Mittwoch von neun bis zwölf, hier im Haus. Da schreiben Sie das Anschreiben zusammen mit einer Trainerin. – Mittwochs? Hm, mittwochs vormittags habe ich selbst Deutschkurs. – Dann gibt es noch den Kurs am Donnerstag, aber erst ab dem 5. November. – Das ist besser. Bitte melden Sie mich dafür an.",
"questions": [
{
"q": "Frau Rahimi hat schon ein Anschreiben.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie sagt: „Ein Anschreiben habe ich noch nicht.“"
},
{
"q": "Wann besucht Frau Rahimi den Bewerbungskurs?",
"options": [
"Mittwochs von 9 bis 12 Uhr.",
"Ab dem 5. Dezember.",
"Donnerstags ab dem 5. November."
],
"answer": 2,
"why": "Mittwochs hat sie Deutschkurs. Sie nimmt den Kurs am Donnerstag ab dem 5. November."
}
]
},
{
"id": "dtz-3-05",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Fahrrad statt Auto in der Stadt? Du hörst Olga.",
"segments": [
{
"voice": "f2",
"text": "Ich fahre seit zwei Jahren jeden Tag mit dem Rad zur Arbeit, ungefähr sechs Kilometer. Am Anfang war das anstrengend, aber jetzt fühle ich mich viel fitter. Und ich spare viel Geld für Benzin und Parkplatz. Nur im Winter, wenn es glatt ist, nehme ich den Bus."
}
],
"text": "Ich fahre seit zwei Jahren jeden Tag mit dem Rad zur Arbeit, ungefähr sechs Kilometer. Am Anfang war das anstrengend, aber jetzt fühle ich mich viel fitter. Und ich spare viel Geld für Benzin und Parkplatz. Nur im Winter, wenn es glatt ist, nehme ich den Bus.",
"questions": [
{
"q": "Welche Aussage passt zu Olga?",
"options": [
"Sie fährt das ganze Jahr nur mit dem Rad.",
"Durch das Radfahren spart sie Geld.",
"Sie teilt ihr Fahrrad mit Nachbarn."
],
"answer": 1,
"why": "Olga sagt: „Ich spare viel Geld für Benzin und Parkplatz.“ Im Winter nimmt sie den Bus, also nicht das ganze Jahr Rad."
}
]
},
{
"id": "dtz-3-06",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Fahrrad statt Auto in der Stadt? Du hörst Dieter.",
"segments": [
{
"voice": "m1",
"text": "Na ja, ich bin 67 und habe Probleme mit dem Knie. Für mich ist das Fahrrad keine Lösung. Außerdem sind die Radwege hier in Duisburg oft schlecht, manchmal hört der Weg einfach auf. Solange die Stadt das nicht verbessert, fahre ich weiter mit dem Auto."
}
],
"text": "Na ja, ich bin 67 und habe Probleme mit dem Knie. Für mich ist das Fahrrad keine Lösung. Außerdem sind die Radwege hier in Duisburg oft schlecht, manchmal hört der Weg einfach auf. Solange die Stadt das nicht verbessert, fahre ich weiter mit dem Auto.",
"questions": [
{
"q": "Welche Aussage passt zu Dieter?",
"options": [
"Er möchte, dass die Radwege besser werden.",
"Er fährt gern Fahrrad.",
"Er nimmt im Winter den Bus."
],
"answer": 0,
"why": "Dieter kritisiert die schlechten Radwege: „Solange die Stadt das nicht verbessert …“"
}
]
},
{
"id": "dtz-3-07",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Fahrrad statt Auto in der Stadt? Du hörst Fatma.",
"segments": [
{
"voice": "f3",
"text": "Ich finde die Idee gut, aber mit drei Kindern ist das nicht so einfach. Wir haben uns jetzt ein Lastenrad gekauft, zusammen mit zwei anderen Familien aus unserem Haus. Für den Einkauf und den Weg zur Kita ist das super. Für längere Fahrten haben wir noch das Auto."
}
],
"text": "Ich finde die Idee gut, aber mit drei Kindern ist das nicht so einfach. Wir haben uns jetzt ein Lastenrad gekauft, zusammen mit zwei anderen Familien aus unserem Haus. Für den Einkauf und den Weg zur Kita ist das super. Für längere Fahrten haben wir noch das Auto.",
"questions": [
{
"q": "Welche Aussage passt zu Fatma?",
"options": [
"Ihre Familie hat kein Auto mehr.",
"Sie findet Radfahren mit Kindern zu gefährlich.",
"Sie teilt ein Lastenrad mit anderen Familien."
],
"answer": 2,
"why": "Fatma hat das Lastenrad „zusammen mit zwei anderen Familien“ gekauft. Ein Auto hat sie noch."
}
]
}
]
},
"dtz-4": {
"title": "DTZ Hören · Übungssatz 4",
"level": "A2–B1",
"exam": "DTZ",
"intro": "Stadtwerke, Schwimmbad, Streik und Wohnungssuche: Der letzte Übungssatz ist etwas schneller gesprochen. Wenn du ein Wort nicht verstehst, hör einfach weiter.",
"group": "dtz",
"items": [
{
"id": "dtz-4-01",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Die Stadtwerke rufen an.",
"segments": [
{
"voice": "f1",
"text": "Guten Tag, hier spricht Frau Wagner von den Stadtwerken Bochum. Wir möchten am Dienstag, dem 3. November, Ihren Stromzähler ablesen. Unser Mitarbeiter kommt zwischen 8 und 12 Uhr. Wenn Sie nicht da sind, können Sie den Zählerstand auch selbst auf unserer Internetseite eingeben, bis spätestens zum 10. November. Vielen Dank."
}
],
"text": "Guten Tag, hier spricht Frau Wagner von den Stadtwerken Bochum. Wir möchten am Dienstag, dem 3. November, Ihren Stromzähler ablesen. Unser Mitarbeiter kommt zwischen 8 und 12 Uhr. Wenn Sie nicht da sind, können Sie den Zählerstand auch selbst auf unserer Internetseite eingeben, bis spätestens zum 10. November. Vielen Dank.",
"questions": [
{
"q": "Was kann man machen, wenn man am Dienstag nicht zu Hause ist?",
"options": [
"Die Stadtwerke bis zum 3. November anrufen.",
"Den Schlüssel beim Nachbarn abgeben.",
"Den Zählerstand im Internet eingeben."
],
"answer": 2,
"why": "„… können Sie den Zählerstand auch selbst auf unserer Internetseite eingeben“, bis zum 10. November."
}
]
},
{
"id": "dtz-4-02",
"teil": "Teil 2",
"type": "Durchsage im Schwimmbad",
"situation": "Du bist im Hallenbad.",
"segments": [
{
"voice": "f1",
"text": "Achtung, eine wichtige Information für unsere Badegäste: Wegen einer Veranstaltung schließt das Hallenbad heute schon um 17 Uhr. Bitte verlassen Sie das Schwimmbecken spätestens um 16:30 Uhr. Die Sauna bleibt wie gewohnt bis 21 Uhr geöffnet. Morgen gelten wieder die normalen Öffnungszeiten. Vielen Dank für Ihr Verständnis."
}
],
"text": "Achtung, eine wichtige Information für unsere Badegäste: Wegen einer Veranstaltung schließt das Hallenbad heute schon um 17 Uhr. Bitte verlassen Sie das Schwimmbecken spätestens um 16:30 Uhr. Die Sauna bleibt wie gewohnt bis 21 Uhr geöffnet. Morgen gelten wieder die normalen Öffnungszeiten. Vielen Dank für Ihr Verständnis.",
"questions": [
{
"q": "Bis wann darf man heute schwimmen?",
"options": [
"Bis 16:30 Uhr.",
"Bis 17 Uhr.",
"Bis 21 Uhr."
],
"answer": 0,
"why": "„Bitte verlassen Sie das Schwimmbecken spätestens um 16:30 Uhr.“ Um 17 Uhr schließt das ganze Bad, bis 21 Uhr ist nur die Sauna offen."
}
]
},
{
"id": "dtz-4-03",
"teil": "Teil 2",
"type": "Radionachrichten",
"situation": "Du hörst die Nachrichten im Radio.",
"segments": [
{
"voice": "m3",
"text": "Und nun zu den Nachrichten aus der Region: Morgen streiken die Beschäftigten der städtischen Verkehrsbetriebe. In Bochum und Gelsenkirchen fahren deshalb ab drei Uhr morgens keine Busse und Straßenbahnen. Die S-Bahnen und Regionalzüge sind nicht betroffen, sie fahren normal. Am Donnerstag soll der Verkehr wieder nach Plan laufen."
}
],
"text": "Und nun zu den Nachrichten aus der Region: Morgen streiken die Beschäftigten der städtischen Verkehrsbetriebe. In Bochum und Gelsenkirchen fahren deshalb ab drei Uhr morgens keine Busse und Straßenbahnen. Die S-Bahnen und Regionalzüge sind nicht betroffen, sie fahren normal. Am Donnerstag soll der Verkehr wieder nach Plan laufen.",
"questions": [
{
"q": "Was fährt morgen in Bochum normal?",
"options": [
"Die Straßenbahnen.",
"Die S-Bahnen.",
"Die Busse."
],
"answer": 1,
"why": "„Die S-Bahnen und Regionalzüge sind nicht betroffen, sie fahren normal.“ Busse und Straßenbahnen fahren nicht."
}
]
},
{
"id": "dtz-4-04",
"teil": "Teil 3",
"type": "Gespräch",
"situation": "Frau Okafor besichtigt eine Wohnung in Duisburg.",
"segments": [
{
"voice": "m1",
"text": "So, das ist das Wohnzimmer. Schön hell, oder?"
},
{
"voice": "f2",
"text": "Ja, sehr schön. Und der Balkon geht nach Süden?"
},
{
"voice": "m1",
"text": "Genau, den ganzen Nachmittag Sonne."
},
{
"voice": "f2",
"text": "Wie hoch ist denn die Miete genau? In der Anzeige stand 620 Euro."
},
{
"voice": "m1",
"text": "Das ist die Kaltmiete. Dazu kommen noch 180 Euro Nebenkosten, also insgesamt 800."
},
{
"voice": "f2",
"text": "Hm, okay. Und die Heizung, ist die da schon drin?"
},
{
"voice": "m1",
"text": "Ja, die Heizkosten sind in den Nebenkosten. Nur den Strom zahlen Sie extra."
},
{
"voice": "f2",
"text": "Gut. Ab wann ist die Wohnung frei?"
},
{
"voice": "m1",
"text": "Ab dem ersten Dezember. Wenn Sie Interesse haben, schicken Sie mir bitte bis Freitag eine Kopie von Ihren letzten drei Gehaltsabrechnungen."
},
{
"voice": "f2",
"text": "Mache ich, gerne."
}
],
"text": "So, das ist das Wohnzimmer. Schön hell, oder? – Ja, sehr schön. Und der Balkon geht nach Süden? – Genau, den ganzen Nachmittag Sonne. – Wie hoch ist denn die Miete genau? In der Anzeige stand 620 Euro. – Das ist die Kaltmiete. Dazu kommen noch 180 Euro Nebenkosten, also insgesamt 800. – Hm, okay. Und die Heizung, ist die da schon drin? – Ja, die Heizkosten sind in den Nebenkosten. Nur den Strom zahlen Sie extra. – Gut. Ab wann ist die Wohnung frei? – Ab dem ersten Dezember. Wenn Sie Interesse haben, schicken Sie mir bitte bis Freitag eine Kopie von Ihren letzten drei Gehaltsabrechnungen. – Mache ich, gerne.",
"questions": [
{
"q": "Die Heizkosten sind in den Nebenkosten enthalten.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Der Vermieter sagt: „Ja, die Heizkosten sind in den Nebenkosten.“"
},
{
"q": "Wie viel kostet die Wohnung im Monat (ohne Strom)?",
"options": [
"620 Euro",
"800 Euro",
"180 Euro"
],
"answer": 1,
"why": "620 Euro Kaltmiete plus 180 Euro Nebenkosten: „also insgesamt 800“."
}
]
},
{
"id": "dtz-4-05",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Wie lernt man am besten Deutsch? Du hörst Ana.",
"segments": [
{
"voice": "f3",
"text": "Ich habe zuerst nur mit Apps gelernt, aber nach einem halben Jahr konnte ich immer noch nicht richtig sprechen. Jetzt besuche ich einen Integrationskurs in Hagen. Die Gruppe ist super, wir sprechen jeden Tag, und die Lehrerin korrigiert uns. Ohne Kurs geht es für mich nicht."
}
],
"text": "Ich habe zuerst nur mit Apps gelernt, aber nach einem halben Jahr konnte ich immer noch nicht richtig sprechen. Jetzt besuche ich einen Integrationskurs in Hagen. Die Gruppe ist super, wir sprechen jeden Tag, und die Lehrerin korrigiert uns. Ohne Kurs geht es für mich nicht.",
"questions": [
{
"q": "Welche Aussage passt zu Ana?",
"options": [
"Sie lernt am liebsten mit Apps.",
"Ein Kurs ist für sie besonders wichtig.",
"Sie lernt Deutsch vor allem bei der Arbeit."
],
"answer": 1,
"why": "Ana sagt: „Ohne Kurs geht es für mich nicht.“ Mit Apps hat sie nur am Anfang gelernt."
}
]
},
{
"id": "dtz-4-06",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Wie lernt man am besten Deutsch? Du hörst Viktor.",
"segments": [
{
"voice": "m2",
"text": "Ich arbeite als Elektriker auf Baustellen, und da lerne ich am meisten. Meine Kollegen sprechen nur Deutsch, manchmal auch Ruhrdeutsch. Am Anfang habe ich wenig verstanden, aber man gewöhnt sich daran. Und wenn ich etwas nicht weiß, frage ich einfach nach. Für mich ist der Alltag die beste Schule."
}
],
"text": "Ich arbeite als Elektriker auf Baustellen, und da lerne ich am meisten. Meine Kollegen sprechen nur Deutsch, manchmal auch Ruhrdeutsch. Am Anfang habe ich wenig verstanden, aber man gewöhnt sich daran. Und wenn ich etwas nicht weiß, frage ich einfach nach. Für mich ist der Alltag die beste Schule.",
"questions": [
{
"q": "Welche Aussage passt zu Viktor?",
"options": [
"Er lernt Deutsch vor allem durch die Arbeit.",
"Er besucht einen Abendkurs.",
"Er versteht seine Kollegen bis heute nicht."
],
"answer": 0,
"why": "Viktor sagt: „Ich arbeite … auf Baustellen, und da lerne ich am meisten.“"
}
]
},
{
"id": "dtz-4-07",
"teil": "Teil 4",
"type": "Meinung",
"situation": "Thema im Radio: Wie lernt man am besten Deutsch? Du hörst Leyla.",
"segments": [
{
"voice": "f2",
"text": "Ich habe zwei kleine Kinder und kann nicht jeden Tag in einen Kurs gehen. Deshalb lerne ich abends online, mit Videos und einer Lerngruppe im Internet. Einmal pro Woche treffe ich außerdem eine Tandempartnerin im Café. Das hilft mir beim Sprechen sehr."
}
],
"text": "Ich habe zwei kleine Kinder und kann nicht jeden Tag in einen Kurs gehen. Deshalb lerne ich abends online, mit Videos und einer Lerngruppe im Internet. Einmal pro Woche treffe ich außerdem eine Tandempartnerin im Café. Das hilft mir beim Sprechen sehr.",
"questions": [
{
"q": "Welche Aussage passt zu Leyla?",
"options": [
"Sie geht jeden Tag in einen Kurs.",
"Sie hat keine Zeit zum Lernen.",
"Sie lernt online und trifft eine Tandempartnerin."
],
"answer": 2,
"why": "Leyla lernt abends online und trifft „einmal pro Woche … eine Tandempartnerin im Café“."
}
]
}
]
},
"b2-1": {
"title": "DTB B2 Hören · Übungssatz 1",
"level": "B2",
"exam": "DTB",
"intro": "Berufsalltag in Logistik, Verwaltung und Handwerk: Mailbox-Nachrichten, eine Teambesprechung, Gespräche mit Kunden und Kollegen und ein Radiobeitrag. Achte auf Änderungen, Bedingungen und darauf, wer welche Aufgabe übernimmt.",
"group": "b2",
"items": [
{
"id": "b2-1-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Ein Lieferant hat Frau Becker eine Nachricht hinterlassen.",
"segments": [
{
"voice": "m2",
"text": "Guten Tag, Frau Becker, hier ist Stefan Brandt von Brandt Verpackungen in Hamm. Es geht um Ihre Bestellung 4711, also die Kartons und das Füllmaterial. Leider hat unser Zulieferer Probleme mit dem Papier. Deshalb können wir nicht wie vereinbart am Montag liefern, sondern frühestens am Donnerstag. Wenn das für Sie zu spät ist, könnten wir eine Teillieferung schicken, etwa die Hälfte der Kartons schon am Dienstag. Rufen Sie mich bitte bis morgen Mittag zurück, unter 02381 88420. Vielen Dank."
}
],
"text": "Guten Tag, Frau Becker, hier ist Stefan Brandt von Brandt Verpackungen in Hamm. Es geht um Ihre Bestellung 4711, also die Kartons und das Füllmaterial. Leider hat unser Zulieferer Probleme mit dem Papier. Deshalb können wir nicht wie vereinbart am Montag liefern, sondern frühestens am Donnerstag. Wenn das für Sie zu spät ist, könnten wir eine Teillieferung schicken, etwa die Hälfte der Kartons schon am Dienstag. Rufen Sie mich bitte bis morgen Mittag zurück, unter 02381 88420. Vielen Dank.",
"questions": [
{
"q": "Die komplette Bestellung kommt wie geplant am Montag.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Die Lieferung kommt „nicht wie vereinbart am Montag …, sondern frühestens am Donnerstag“."
},
{
"q": "Was bietet Herr Brandt an?",
"options": [
"Einen Preisnachlass wegen der Verspätung.",
"Einen Teil der Ware früher zu liefern.",
"Die Ware selbst vorbeizubringen."
],
"answer": 1,
"why": "Er bietet eine Teillieferung an: „etwa die Hälfte der Kartons schon am Dienstag“."
}
]
},
{
"id": "b2-1-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Die Personalabteilung ruft Herrn Nowicki an.",
"segments": [
{
"voice": "f1",
"text": "Hallo Herr Nowicki, hier ist Claudia Lehmann aus der Personalabteilung. Ich rufe wegen Ihrer Fortbildung zum Thema Arbeitssicherheit an. Die Kostenübernahme ist genehmigt, aber mir fehlt noch Ihre unterschriebene Anmeldung. Könnten Sie die bitte bis Freitag einscannen und mir per Mail schicken? Das Original brauche ich nicht. Und noch etwas: Die Fortbildung findet nicht in Essen statt, wie ursprünglich geplant, sondern in Mülheim an der Ruhr. Die genaue Adresse schicke ich Ihnen noch. Danke und bis bald."
}
],
"text": "Hallo Herr Nowicki, hier ist Claudia Lehmann aus der Personalabteilung. Ich rufe wegen Ihrer Fortbildung zum Thema Arbeitssicherheit an. Die Kostenübernahme ist genehmigt, aber mir fehlt noch Ihre unterschriebene Anmeldung. Könnten Sie die bitte bis Freitag einscannen und mir per Mail schicken? Das Original brauche ich nicht. Und noch etwas: Die Fortbildung findet nicht in Essen statt, wie ursprünglich geplant, sondern in Mülheim an der Ruhr. Die genaue Adresse schicke ich Ihnen noch. Danke und bis bald.",
"questions": [
{
"q": "Herr Nowicki muss die Anmeldung im Original abgeben.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Frau Lehmann sagt: „Das Original brauche ich nicht.“ Ein Scan per Mail reicht."
},
{
"q": "Was hat sich an der Fortbildung geändert?",
"options": [
"Der Termin.",
"Die Kosten.",
"Der Ort."
],
"answer": 2,
"why": "Sie findet „nicht in Essen statt …, sondern in Mülheim an der Ruhr“."
}
]
},
{
"id": "b2-1-03",
"teil": "Teil 2",
"type": "Teambesprechung",
"situation": "Besprechung in einem Logistikunternehmen in Duisburg. Es sprechen Teamleiterin Frau Arslan, Herr Weber und Herr Kuhn.",
"segments": [
{
"voice": "f2",
"text": "Gut, dann fangen wir an. Wichtigster Punkt heute: die Wochen vor Weihnachten. Wie jedes Jahr haben wir im Dezember fast doppelt so viele Sendungen wie sonst, und gleichzeitig liegen schon sieben Urlaubsanträge für diese Zeit vor."
},
{
"voice": "m2",
"text": "Sieben? Das schaffen wir nie. Wir sind ja jetzt schon knapp besetzt, seit Jonas in Elternzeit ist."
},
{
"voice": "f2",
"text": "Eben. Deshalb mein Vorschlag: Zwischen dem ersten und dem zwanzigsten Dezember genehmigen wir pro Schicht höchstens einen Urlaub. Wer zuerst beantragt hat, bekommt ihn."
},
{
"voice": "m3",
"text": "Hm, „wer zuerst kommt“ finde ich nicht ganz fair. Kollegen mit Schulkindern können ja nur in den Ferien weg. Und die Weihnachtsferien beginnen erst am dreiundzwanzigsten."
},
{
"voice": "f2",
"text": "Das stimmt, aber die Zeit ab dem dreiundzwanzigsten betrifft meine Regel gar nicht. Da wird es ja wieder ruhiger."
},
{
"voice": "m2",
"text": "Und was ist mit Aushilfen? Letztes Jahr hatten wir doch drei Studenten von der Zeitarbeitsfirma."
},
{
"voice": "f2",
"text": "Ja, das hat gut geklappt. Ich habe schon nachgefragt: Wir können wieder bis zu vier Leute bekommen, aber nur, wenn wir bis Ende Oktober bestellen. Herr Kuhn, könnten Sie bis Freitag ausrechnen, wie viele wir wirklich brauchen?"
},
{
"voice": "m3",
"text": "Mach ich. Ich schaue mir die Zahlen vom letzten Jahr an."
},
{
"voice": "m2",
"text": "Und Überstunden? Die Leute haben vom Sommer noch einige auf dem Konto."
},
{
"voice": "f2",
"text": "Neue Überstunden möchte ich möglichst vermeiden. Die Kollegen sollen ihre alten Stunden im Januar abbauen können. Gut, dann schreibe ich die Urlaubsregel ins Protokoll und schicke sie morgen an alle."
}
],
"text": "Gut, dann fangen wir an. Wichtigster Punkt heute: die Wochen vor Weihnachten. Wie jedes Jahr haben wir im Dezember fast doppelt so viele Sendungen wie sonst, und gleichzeitig liegen schon sieben Urlaubsanträge für diese Zeit vor. – Sieben? Das schaffen wir nie. Wir sind ja jetzt schon knapp besetzt, seit Jonas in Elternzeit ist. – Eben. Deshalb mein Vorschlag: Zwischen dem ersten und dem zwanzigsten Dezember genehmigen wir pro Schicht höchstens einen Urlaub. Wer zuerst beantragt hat, bekommt ihn. – Hm, „wer zuerst kommt“ finde ich nicht ganz fair. Kollegen mit Schulkindern können ja nur in den Ferien weg. Und die Weihnachtsferien beginnen erst am dreiundzwanzigsten. – Das stimmt, aber die Zeit ab dem dreiundzwanzigsten betrifft meine Regel gar nicht. Da wird es ja wieder ruhiger. – Und was ist mit Aushilfen? Letztes Jahr hatten wir doch drei Studenten von der Zeitarbeitsfirma. – Ja, das hat gut geklappt. Ich habe schon nachgefragt: Wir können wieder bis zu vier Leute bekommen, aber nur, wenn wir bis Ende Oktober bestellen. Herr Kuhn, könnten Sie bis Freitag ausrechnen, wie viele wir wirklich brauchen? – Mach ich. Ich schaue mir die Zahlen vom letzten Jahr an. – Und Überstunden? Die Leute haben vom Sommer noch einige auf dem Konto. – Neue Überstunden möchte ich möglichst vermeiden. Die Kollegen sollen ihre alten Stunden im Januar abbauen können. Gut, dann schreibe ich die Urlaubsregel ins Protokoll und schicke sie morgen an alle.",
"questions": [
{
"q": "Welche Regel schlägt Frau Arslan vor?",
"options": [
"Im Dezember bekommt niemand Urlaub.",
"Eltern mit Schulkindern bekommen zuerst Urlaub.",
"Bis zum 20. Dezember darf pro Schicht nur eine Person Urlaub nehmen."
],
"answer": 2,
"why": "„Zwischen dem ersten und dem zwanzigsten Dezember genehmigen wir pro Schicht höchstens einen Urlaub.“"
},
{
"q": "Was soll Herr Kuhn bis Freitag machen?",
"options": [
"Ausrechnen, wie viele Aushilfen nötig sind.",
"Bei der Zeitarbeitsfirma bestellen.",
"Das Protokoll schreiben."
],
"answer": 0,
"why": "Frau Arslan bittet ihn, „auszurechnen, wie viele wir wirklich brauchen“. Das Protokoll schreibt sie selbst."
},
{
"q": "Wie steht Frau Arslan zu Überstunden?",
"options": [
"Sie sollen im Dezember bezahlt werden.",
"Sie will neue Überstunden möglichst vermeiden.",
"Alle sollen ihre Überstunden im Dezember abbauen."
],
"answer": 1,
"why": "„Neue Überstunden möchte ich möglichst vermeiden.“ Alte Stunden sollen im Januar abgebaut werden."
}
]
},
{
"id": "b2-1-04",
"teil": "Teil 3",
"type": "Gespräch mit einem Kunden",
"situation": "Ein Kunde ruft bei einem Küchenstudio in Bottrop an.",
"segments": [
{
"voice": "f3",
"text": "Küchenstudio Reinhardt, Sie sprechen mit Melanie Vogt, guten Tag."
},
{
"voice": "m1",
"text": "Ja, Lindner hier, guten Tag. Sie haben uns vor zwei Wochen eine Küche geliefert und eingebaut. Grundsätzlich sind wir zufrieden, aber eine Schranktür hängt schief, und an der Spülmaschine ist die Blende beschädigt. Da ist ein deutlicher Kratzer."
},
{
"voice": "f3",
"text": "Oh, das tut mir leid. Haben Sie den Kratzer schon bei der Montage bemerkt?"
},
{
"voice": "m1",
"text": "Nein, leider erst am Abend, als die Monteure weg waren. Ich habe aber gleich Fotos gemacht."
},
{
"voice": "f3",
"text": "Sehr gut. Schicken Sie mir die Fotos bitte per Mail, dann bestelle ich eine neue Blende beim Hersteller. Das dauert erfahrungsgemäß etwa drei Wochen. Die Schranktür kann unser Monteur aber auch früher einstellen, das sind nur ein paar Minuten."
},
{
"voice": "m1",
"text": "Muss ich dafür etwas bezahlen?"
},
{
"voice": "f3",
"text": "Nein, beides läuft über die Gewährleistung. Am besten kommt der Monteur einmal und erledigt alles zusammen, wenn die Blende da ist. Oder möchten Sie lieber zwei Termine?"
},
{
"voice": "m1",
"text": "Ein Termin reicht. Die Tür stört uns nicht so sehr."
},
{
"voice": "f3",
"text": "Gut, dann melde ich mich, sobald das Teil da ist."
}
],
"text": "Küchenstudio Reinhardt, Sie sprechen mit Melanie Vogt, guten Tag. – Ja, Lindner hier, guten Tag. Sie haben uns vor zwei Wochen eine Küche geliefert und eingebaut. Grundsätzlich sind wir zufrieden, aber eine Schranktür hängt schief, und an der Spülmaschine ist die Blende beschädigt. Da ist ein deutlicher Kratzer. – Oh, das tut mir leid. Haben Sie den Kratzer schon bei der Montage bemerkt? – Nein, leider erst am Abend, als die Monteure weg waren. Ich habe aber gleich Fotos gemacht. – Sehr gut. Schicken Sie mir die Fotos bitte per Mail, dann bestelle ich eine neue Blende beim Hersteller. Das dauert erfahrungsgemäß etwa drei Wochen. Die Schranktür kann unser Monteur aber auch früher einstellen, das sind nur ein paar Minuten. – Muss ich dafür etwas bezahlen? – Nein, beides läuft über die Gewährleistung. Am besten kommt der Monteur einmal und erledigt alles zusammen, wenn die Blende da ist. Oder möchten Sie lieber zwei Termine? – Ein Termin reicht. Die Tür stört uns nicht so sehr. – Gut, dann melde ich mich, sobald das Teil da ist.",
"questions": [
{
"q": "Herr Lindner muss die Reparatur selbst bezahlen.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "„Nein, beides läuft über die Gewährleistung.“"
},
{
"q": "Worauf einigen sich die beiden?",
"options": [
"Der Monteur kommt sofort wegen der Schranktür.",
"Herr Lindner holt die neue Blende selbst ab.",
"Der Monteur erledigt alles bei einem Termin."
],
"answer": 2,
"why": "Herr Lindner sagt: „Ein Termin reicht.“ Der Monteur kommt, wenn die Blende da ist."
}
]
},
{
"id": "b2-1-05",
"teil": "Teil 3",
"type": "Gespräch unter Kollegen",
"situation": "Ein neuer Mitarbeiter einer Hausverwaltung in Essen fragt seine Kollegin um Rat.",
"segments": [
{
"voice": "m3",
"text": "Jana, hast du kurz Zeit? Ich komme mit dem neuen Ticketsystem noch nicht so richtig klar."
},
{
"voice": "f2",
"text": "Klar. Wo hakt's denn?"
},
{
"voice": "m3",
"text": "Wenn ein Mieter einen Schaden meldet, lege ich ein Ticket an, okay. Aber ich weiß nie, welche Priorität ich auswählen soll."
},
{
"voice": "f2",
"text": "Ah, das ist eigentlich einfach. „Hoch“ nur, wenn Gefahr besteht oder die Wohnung nicht nutzbar ist, also Wasserschaden, Heizungsausfall im Winter, so was. Ein tropfender Wasserhahn ist „normal“."
},
{
"voice": "m3",
"text": "Und wer bekommt das Ticket dann?"
},
{
"voice": "f2",
"text": "Bei „hoch“ geht automatisch eine SMS an den Hausmeister. Bei „normal“ landet es in einer Liste, und Herr Sommer verteilt die Aufträge jeden Morgen um neun."
},
{
"voice": "m3",
"text": "Ah, deshalb hat sich der Hausmeister gestern beschwert. Ich habe eine kaputte Briefkastenklappe auf „hoch“ gesetzt."
},
{
"voice": "f2",
"text": "Ja, das passiert am Anfang jedem. Es gibt übrigens eine Kurzanleitung im Intranet, unter „Schulungen“. Schau da mal rein."
}
],
"text": "Jana, hast du kurz Zeit? Ich komme mit dem neuen Ticketsystem noch nicht so richtig klar. – Klar. Wo hakt's denn? – Wenn ein Mieter einen Schaden meldet, lege ich ein Ticket an, okay. Aber ich weiß nie, welche Priorität ich auswählen soll. – Ah, das ist eigentlich einfach. „Hoch“ nur, wenn Gefahr besteht oder die Wohnung nicht nutzbar ist, also Wasserschaden, Heizungsausfall im Winter, so was. Ein tropfender Wasserhahn ist „normal“. – Und wer bekommt das Ticket dann? – Bei „hoch“ geht automatisch eine SMS an den Hausmeister. Bei „normal“ landet es in einer Liste, und Herr Sommer verteilt die Aufträge jeden Morgen um neun. – Ah, deshalb hat sich der Hausmeister gestern beschwert. Ich habe eine kaputte Briefkastenklappe auf „hoch“ gesetzt. – Ja, das passiert am Anfang jedem. Es gibt übrigens eine Kurzanleitung im Intranet, unter „Schulungen“. Schau da mal rein.",
"questions": [
{
"q": "Bei der Priorität „hoch“ wird der Hausmeister automatisch informiert.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Bei ‚hoch‘ geht automatisch eine SMS an den Hausmeister.“"
},
{
"q": "Welchen Fehler hat der neue Kollege gemacht?",
"options": [
"Er hat einen kleinen Schaden als dringend markiert.",
"Er hat einen Wasserschaden vergessen.",
"Er hat Herrn Sommer keine Liste geschickt."
],
"answer": 0,
"why": "Er hat eine kaputte Briefkastenklappe auf „hoch“ gesetzt. Das ist kein Notfall."
}
]
},
{
"id": "b2-1-06",
"teil": "Teil 4",
"type": "Radiobeitrag",
"situation": "Ein Radiobeitrag über die Vier-Tage-Woche.",
"segments": [
{
"voice": "f1",
"text": "Vier Tage arbeiten, drei Tage frei, und das bei vollem Gehalt? Was nach einem Traum klingt, testet ein Dortmunder IT-Dienstleister mit rund 60 Beschäftigten seit einem Jahr. Die Arbeitszeit wurde von 40 auf 36 Stunden pro Woche reduziert. Geschäftsführer Thomas Rüdiger zieht eine erste Bilanz."
},
{
"voice": "m2",
"text": "Ehrlich gesagt war ich am Anfang skeptisch. Aber die Zahl der Krankheitstage ist deutlich gesunken, und wir bekommen viel mehr Bewerbungen. Gerade im Wettbewerb um Fachkräfte ist das ein echter Vorteil. Die Produktivität ist ungefähr gleich geblieben. Wir arbeiten einfach konzentrierter, zum Beispiel mit kürzeren Meetings."
},
{
"voice": "f1",
"text": "Doch nicht alles läuft reibungslos. Weil die Kunden auch freitags Ansprechpartner brauchen, arbeitet ein Teil des Teams montags bis donnerstags, der andere Teil dienstags bis freitags. Das macht die Planung aufwendiger. Projektleiterin Sandra Kaya sieht das Modell gemischt."
},
{
"voice": "f3",
"text": "Privat ist es super, ich habe endlich Zeit für meine Familie und für Sport. Aber an den vier Tagen ist der Druck schon höher. Man muss die gleiche Arbeit in weniger Zeit schaffen, und Pausen kommen manchmal zu kurz."
},
{
"voice": "f1",
"text": "Arbeitsforscher betonen, dass sich das Modell nicht für jede Branche eignet. In der Pflege oder im Einzelhandel etwa ist es schwer umzusetzen. Das Dortmunder Unternehmen will die Vier-Tage-Woche trotzdem ein weiteres Jahr fortsetzen und im Frühjahr alle Beschäftigten befragen."
}
],
"text": "Vier Tage arbeiten, drei Tage frei, und das bei vollem Gehalt? Was nach einem Traum klingt, testet ein Dortmunder IT-Dienstleister mit rund 60 Beschäftigten seit einem Jahr. Die Arbeitszeit wurde von 40 auf 36 Stunden pro Woche reduziert. Geschäftsführer Thomas Rüdiger zieht eine erste Bilanz. – Ehrlich gesagt war ich am Anfang skeptisch. Aber die Zahl der Krankheitstage ist deutlich gesunken, und wir bekommen viel mehr Bewerbungen. Gerade im Wettbewerb um Fachkräfte ist das ein echter Vorteil. Die Produktivität ist ungefähr gleich geblieben. Wir arbeiten einfach konzentrierter, zum Beispiel mit kürzeren Meetings. – Doch nicht alles läuft reibungslos. Weil die Kunden auch freitags Ansprechpartner brauchen, arbeitet ein Teil des Teams montags bis donnerstags, der andere Teil dienstags bis freitags. Das macht die Planung aufwendiger. Projektleiterin Sandra Kaya sieht das Modell gemischt. – Privat ist es super, ich habe endlich Zeit für meine Familie und für Sport. Aber an den vier Tagen ist der Druck schon höher. Man muss die gleiche Arbeit in weniger Zeit schaffen, und Pausen kommen manchmal zu kurz. – Arbeitsforscher betonen, dass sich das Modell nicht für jede Branche eignet. In der Pflege oder im Einzelhandel etwa ist es schwer umzusetzen. Das Dortmunder Unternehmen will die Vier-Tage-Woche trotzdem ein weiteres Jahr fortsetzen und im Frühjahr alle Beschäftigten befragen.",
"questions": [
{
"q": "Was hat sich laut Geschäftsführer verbessert?",
"options": [
"Die Produktivität ist stark gestiegen.",
"Es gibt weniger Krankheitstage und mehr Bewerbungen.",
"Die Kunden sind freitags besser erreichbar."
],
"answer": 1,
"why": "Herr Rüdiger nennt weniger Krankheitstage und mehr Bewerbungen. Die Produktivität ist „ungefähr gleich geblieben“."
},
{
"q": "Was sieht Frau Kaya kritisch?",
"options": [
"An den Arbeitstagen ist der Druck höher.",
"Sie hat weniger Zeit für ihre Familie.",
"Ihr Gehalt ist gesunken."
],
"answer": 0,
"why": "„Aber an den vier Tagen ist der Druck schon höher.“"
},
{
"q": "Wie geht es in dem Unternehmen weiter?",
"options": [
"Das Modell wird sofort beendet.",
"Das Modell wird auf die Pflege übertragen.",
"Es wird ein weiteres Jahr getestet, dann werden alle befragt."
],
"answer": 2,
"why": "Die Firma will die Vier-Tage-Woche „ein weiteres Jahr fortsetzen und im Frühjahr alle Beschäftigten befragen“."
}
]
}
]
},
"b2-2": {
"title": "DTB B2 Hören · Übungssatz 2",
"level": "B2",
"exam": "DTB",
"intro": "IT-Support, Montage, Hotel, Spedition, Pflege und Handwerk: Hier musst du oft rechnen und Alternativen vergleichen. Notiere dir beim Hören Zahlen und Bedingungen.",
"group": "b2",
"items": [
{
"id": "b2-2-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Der IT-Support ruft Frau Szymańska zurück.",
"segments": [
{
"voice": "m3",
"text": "Hallo Frau Szymańska, hier ist Kevin Hartmann vom IT-Support. Sie hatten heute Morgen ein Ticket geschrieben, weil Sie sich nicht im Kundenportal anmelden können. Das liegt an der Umstellung auf die Zwei-Faktor-Anmeldung vom letzten Wochenende. Sie müssen auf Ihrem Diensthandy einmalig die Authenticator-App einrichten. Ich kann Ihnen das gern am Telefon erklären, das dauert etwa zehn Minuten. Ich bin heute noch bis 16 Uhr erreichbar, Durchwahl 235. Ansonsten melde ich mich morgen früh noch mal bei Ihnen."
}
],
"text": "Hallo Frau Szymańska, hier ist Kevin Hartmann vom IT-Support. Sie hatten heute Morgen ein Ticket geschrieben, weil Sie sich nicht im Kundenportal anmelden können. Das liegt an der Umstellung auf die Zwei-Faktor-Anmeldung vom letzten Wochenende. Sie müssen auf Ihrem Diensthandy einmalig die Authenticator-App einrichten. Ich kann Ihnen das gern am Telefon erklären, das dauert etwa zehn Minuten. Ich bin heute noch bis 16 Uhr erreichbar, Durchwahl 235. Ansonsten melde ich mich morgen früh noch mal bei Ihnen.",
"questions": [
{
"q": "Frau Szymańska hat ihr Passwort vergessen.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Das Problem ist die neue Zwei-Faktor-Anmeldung, nicht das Passwort."
},
{
"q": "Was schlägt Herr Hartmann vor?",
"options": [
"Ein neues Diensthandy zu bestellen.",
"Eine Schulung am Wochenende zu besuchen.",
"Die App gemeinsam am Telefon einzurichten."
],
"answer": 2,
"why": "„Ich kann Ihnen das gern am Telefon erklären, das dauert etwa zehn Minuten.“"
}
]
},
{
"id": "b2-2-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Eine Kundin ruft bei einem Handwerksbetrieb an.",
"segments": [
{
"voice": "f2",
"text": "Guten Tag, hier ist Birgit Laufenberg aus Witten. Sie wollten am Mittwoch um acht Uhr bei uns die neue Markise montieren. Leider hat sich bei uns etwas geändert: Mein Mann hat am Mittwoch einen Termin im Krankenhaus, nichts Schlimmes, aber wir sind den ganzen Tag nicht zu Hause. Ginge es vielleicht am Donnerstag oder Freitag? Am liebsten nachmittags, vormittags arbeite ich. Und die Einfahrt wird gerade neu gepflastert, parken Sie dann bitte lieber auf der Straße. Meine Nummer haben Sie ja. Danke!"
}
],
"text": "Guten Tag, hier ist Birgit Laufenberg aus Witten. Sie wollten am Mittwoch um acht Uhr bei uns die neue Markise montieren. Leider hat sich bei uns etwas geändert: Mein Mann hat am Mittwoch einen Termin im Krankenhaus, nichts Schlimmes, aber wir sind den ganzen Tag nicht zu Hause. Ginge es vielleicht am Donnerstag oder Freitag? Am liebsten nachmittags, vormittags arbeite ich. Und die Einfahrt wird gerade neu gepflastert, parken Sie dann bitte lieber auf der Straße. Meine Nummer haben Sie ja. Danke!",
"questions": [
{
"q": "Frau Laufenberg möchte den Auftrag absagen.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie möchte den Termin nur verschieben, nicht absagen."
},
{
"q": "Wann passt es Frau Laufenberg am besten?",
"options": [
"Donnerstag oder Freitag am Nachmittag.",
"Mittwoch um 8 Uhr.",
"Donnerstag oder Freitag am Vormittag."
],
"answer": 0,
"why": "„Ginge es … am Donnerstag oder Freitag? Am liebsten nachmittags, vormittags arbeite ich.“"
}
]
},
{
"id": "b2-2-03",
"teil": "Teil 2",
"type": "Arbeitsbesprechung",
"situation": "Besprechung in einem Hotel in Essen. Es sprechen Hoteldirektorin Frau Brenner, Küchenchef Herr Petrović und Frau Klein von der Rezeption.",
"segments": [
{
"voice": "f1",
"text": "Also, in drei Wochen ist die große Fachmesse, und wir sind von Montag bis Donnerstag komplett ausgebucht. Ich möchte heute klären, wie wir das mit Frühstück und Rezeption organisieren. Herr Petrović, fangen Sie an?"
},
{
"voice": "m2",
"text": "Ja. Das Problem ist ganz klar das Frühstück. Die Messegäste wollen alle zwischen halb sieben und halb acht essen, und unser Frühstücksraum hat nur 80 Plätze. Bei 140 Gästen gibt das Chaos."
},
{
"voice": "f3",
"text": "Könnten wir nicht schon um sechs öffnen statt um halb sieben?"
},
{
"voice": "m2",
"text": "Ginge schon, dann brauche ich aber eine zusätzliche Kraft in der Küche, ab fünf Uhr."
},
{
"voice": "f1",
"text": "Das ist in Ordnung. Außerdem würde ich den Konferenzraum im Erdgeschoss an diesen Tagen als zweiten Frühstücksraum nutzen. Der ist ja morgens nicht gebucht, oder, Frau Klein?"
},
{
"voice": "f3",
"text": "Am Montag und Dienstag ist er frei. Am Mittwoch hat eine Firma ihn ab acht Uhr reserviert."
},
{
"voice": "f1",
"text": "Bis acht reicht uns völlig. Dann zur Rezeption: Was brauchen Sie?"
},
{
"voice": "f3",
"text": "Vor allem beim Check-out am Donnerstag wird es eng. Ich würde vorschlagen, dass die Gäste die Rechnung schon am Vorabend per Mail bekommen und den Schlüssel morgens nur noch in eine Box werfen."
},
{
"voice": "f1",
"text": "Gute Idee. Können Sie das bis nächsten Montag mit der IT klären?"
},
{
"voice": "f3",
"text": "Mache ich."
},
{
"voice": "f1",
"text": "Prima. Dann fasse ich zusammen: Frühstück ab sechs, ein zweiter Raum im Erdgeschoss und Express-Check-out per Mail."
}
],
"text": "Also, in drei Wochen ist die große Fachmesse, und wir sind von Montag bis Donnerstag komplett ausgebucht. Ich möchte heute klären, wie wir das mit Frühstück und Rezeption organisieren. Herr Petrović, fangen Sie an? – Ja. Das Problem ist ganz klar das Frühstück. Die Messegäste wollen alle zwischen halb sieben und halb acht essen, und unser Frühstücksraum hat nur 80 Plätze. Bei 140 Gästen gibt das Chaos. – Könnten wir nicht schon um sechs öffnen statt um halb sieben? – Ginge schon, dann brauche ich aber eine zusätzliche Kraft in der Küche, ab fünf Uhr. – Das ist in Ordnung. Außerdem würde ich den Konferenzraum im Erdgeschoss an diesen Tagen als zweiten Frühstücksraum nutzen. Der ist ja morgens nicht gebucht, oder, Frau Klein? – Am Montag und Dienstag ist er frei. Am Mittwoch hat eine Firma ihn ab acht Uhr reserviert. – Bis acht reicht uns völlig. Dann zur Rezeption: Was brauchen Sie? – Vor allem beim Check-out am Donnerstag wird es eng. Ich würde vorschlagen, dass die Gäste die Rechnung schon am Vorabend per Mail bekommen und den Schlüssel morgens nur noch in eine Box werfen. – Gute Idee. Können Sie das bis nächsten Montag mit der IT klären? – Mache ich. – Prima. Dann fasse ich zusammen: Frühstück ab sechs, ein zweiter Raum im Erdgeschoss und Express-Check-out per Mail.",
"questions": [
{
"q": "Was ist das Hauptproblem beim Frühstück?",
"options": [
"Die Küche hat zu wenig Lebensmittel.",
"Zu viele Gäste wollen zur gleichen Zeit frühstücken.",
"Der Frühstücksraum ist am Mittwoch reserviert."
],
"answer": 1,
"why": "Alle Messegäste wollen zwischen halb sieben und halb acht essen, aber es gibt nur 80 Plätze für 140 Gäste."
},
{
"q": "Was gilt für den Konferenzraum am Mittwoch?",
"options": [
"Er kann bis acht Uhr fürs Frühstück genutzt werden.",
"Er ist den ganzen Tag frei.",
"Er wird für den Check-out gebraucht."
],
"answer": 0,
"why": "Eine Firma hat ihn ab acht Uhr reserviert. Frau Brenner: „Bis acht reicht uns völlig.“"
},
{
"q": "Was soll Frau Klein bis nächsten Montag machen?",
"options": [
"Eine zusätzliche Küchenkraft suchen.",
"Den Konferenzraum reservieren.",
"Mit der IT den Express-Check-out klären."
],
"answer": 2,
"why": "Frau Brenner fragt: „Können Sie das bis nächsten Montag mit der IT klären?“ Gemeint ist der Check-out per Mail."
}
]
},
{
"id": "b2-2-04",
"teil": "Teil 3",
"type": "Gespräch mit einem Kunden",
"situation": "Eine Kundin telefoniert mit einer Spedition in Dortmund.",
"segments": [
{
"voice": "f2",
"text": "Hagedorn, Firma Holzwerk Sauerland, guten Tag. Ich hatte Ihnen letzte Woche eine Anfrage geschickt, für den Transport von zwölf Paletten nach Rotterdam."
},
{
"voice": "m1",
"text": "Ja, Frau Hagedorn, guten Tag. Ich habe das Angebot gerade fertig gemacht. Für die zwölf Paletten komme ich auf 1.350 Euro netto, inklusive Maut."
},
{
"voice": "f2",
"text": "Hm, das ist mehr als erwartet. Unser bisheriger Spediteur lag bei etwa 1.200."
},
{
"voice": "m1",
"text": "Verstehe. Der Preis gilt allerdings für eine Expresslieferung innerhalb von 24 Stunden. Wenn Sie zwei Tage Zeit haben, kann ich die Ware mit einer anderen Ladung kombinieren. Dann wären wir bei 1.180."
},
{
"voice": "f2",
"text": "Zwei Tage sind kein Problem. Ist die Ware dann auch versichert?"
},
{
"voice": "m1",
"text": "Die Grundversicherung ist dabei. Bei Möbeln empfehle ich aber eine Zusatzversicherung, die kostet 45 Euro."
},
{
"voice": "f2",
"text": "Gut, dann nehmen wir die Variante mit zwei Tagen, mit Zusatzversicherung. Schicken Sie mir das Angebot bitte schriftlich?"
},
{
"voice": "m1",
"text": "Mache ich sofort."
}
],
"text": "Hagedorn, Firma Holzwerk Sauerland, guten Tag. Ich hatte Ihnen letzte Woche eine Anfrage geschickt, für den Transport von zwölf Paletten nach Rotterdam. – Ja, Frau Hagedorn, guten Tag. Ich habe das Angebot gerade fertig gemacht. Für die zwölf Paletten komme ich auf 1.350 Euro netto, inklusive Maut. – Hm, das ist mehr als erwartet. Unser bisheriger Spediteur lag bei etwa 1.200. – Verstehe. Der Preis gilt allerdings für eine Expresslieferung innerhalb von 24 Stunden. Wenn Sie zwei Tage Zeit haben, kann ich die Ware mit einer anderen Ladung kombinieren. Dann wären wir bei 1.180. – Zwei Tage sind kein Problem. Ist die Ware dann auch versichert? – Die Grundversicherung ist dabei. Bei Möbeln empfehle ich aber eine Zusatzversicherung, die kostet 45 Euro. – Gut, dann nehmen wir die Variante mit zwei Tagen, mit Zusatzversicherung. Schicken Sie mir das Angebot bitte schriftlich? – Mache ich sofort.",
"questions": [
{
"q": "Das erste Angebot ist teurer als der Preis des bisherigen Spediteurs.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "1.350 Euro sind mehr als die etwa 1.200 Euro des bisherigen Spediteurs."
},
{
"q": "Wie viel bezahlt Frau Hagedorn insgesamt (netto)?",
"options": [
"1.180 Euro",
"1.225 Euro",
"1.350 Euro"
],
"answer": 1,
"why": "Sie nimmt die Variante mit zwei Tagen (1.180 Euro) plus Zusatzversicherung (45 Euro) = 1.225 Euro."
}
]
},
{
"id": "b2-2-05",
"teil": "Teil 3",
"type": "Gespräch unter Kollegen",
"situation": "Schichtübergabe in einem Seniorenheim in Gelsenkirchen.",
"segments": [
{
"voice": "f3",
"text": "So, kurze Übergabe, dann bin ich weg. Zimmer 12, Herr Brosowski: Er hat heute fast nichts gegessen, nur ein bisschen Suppe. Bitte achte darauf, dass er genug trinkt, und schreib es in die Dokumentation."
},
{
"voice": "m3",
"text": "Okay. Hat er Fieber?"
},
{
"voice": "f3",
"text": "Nein, die Temperatur ist normal, ich habe um elf gemessen. Die Ärztin kommt aber morgen früh sowieso zur Visite, dann soll sie ihn sich anschauen."
},
{
"voice": "m3",
"text": "Gut. Sonst noch was?"
},
{
"voice": "f3",
"text": "Ja, Frau Engel aus Zimmer 7 bekommt heute um 16 Uhr Besuch von ihrer Tochter. Die wollen zusammen in den Garten. Hilf ihr bitte mit dem Rollstuhl, falls die Tochter allein nicht klarkommt."
},
{
"voice": "m3",
"text": "Mach ich. Und der neue Bewohner, kommt der heute?"
},
{
"voice": "f3",
"text": "Nein, der Einzug ist auf Montag verschoben worden. Das Zimmer ist aber schon fertig."
},
{
"voice": "m3",
"text": "Alles klar, danke dir. Schönen Feierabend!"
}
],
"text": "So, kurze Übergabe, dann bin ich weg. Zimmer 12, Herr Brosowski: Er hat heute fast nichts gegessen, nur ein bisschen Suppe. Bitte achte darauf, dass er genug trinkt, und schreib es in die Dokumentation. – Okay. Hat er Fieber? – Nein, die Temperatur ist normal, ich habe um elf gemessen. Die Ärztin kommt aber morgen früh sowieso zur Visite, dann soll sie ihn sich anschauen. – Gut. Sonst noch was? – Ja, Frau Engel aus Zimmer 7 bekommt heute um 16 Uhr Besuch von ihrer Tochter. Die wollen zusammen in den Garten. Hilf ihr bitte mit dem Rollstuhl, falls die Tochter allein nicht klarkommt. – Mach ich. Und der neue Bewohner, kommt der heute? – Nein, der Einzug ist auf Montag verschoben worden. Das Zimmer ist aber schon fertig. – Alles klar, danke dir. Schönen Feierabend!",
"questions": [
{
"q": "Herr Brosowski hat Fieber.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "„Nein, die Temperatur ist normal.“"
},
{
"q": "Was soll der Kollege bei Frau Engel tun?",
"options": [
"Ihr beim Essen helfen.",
"Die Ärztin anrufen.",
"Bei Bedarf mit dem Rollstuhl helfen."
],
"answer": 2,
"why": "„Hilf ihr bitte mit dem Rollstuhl, falls die Tochter allein nicht klarkommt.“"
}
]
},
{
"id": "b2-2-06",
"teil": "Teil 4",
"type": "Radiobeitrag",
"situation": "Ein Radiobeitrag über Quereinsteiger im Handwerk.",
"segments": [
{
"voice": "m1",
"text": "Im Handwerk fehlen Fachkräfte, allein im Ruhrgebiet sind es nach Schätzungen mehrere tausend. Viele Betriebe müssen Aufträge ablehnen oder Kunden monatelang warten lassen. Einige gehen deshalb neue Wege. Zum Beispiel ein Malerbetrieb in Recklinghausen: Dort sind inzwischen drei von zwölf Mitarbeitenden Quereinsteiger. Inhaberin Kerstin Wolff:"
},
{
"voice": "f2",
"text": "Wir schauen nicht mehr nur auf Zeugnisse. Wenn jemand motiviert ist und handwerklich geschickt, dann bilden wir ihn aus, auch mit Mitte vierzig. Das Wichtigste ist, dass die Person ins Team passt. Das Fachliche kann man lernen."
},
{
"voice": "m1",
"text": "Damit das klappt, arbeitet der Betrieb mit einem Bildungsträger zusammen. Einmal pro Woche gibt es direkt im Betrieb Deutschunterricht mit Fachwortschatz. Einen Teil der Kosten übernimmt die Agentur für Arbeit. Einer der Teilnehmer ist Rami Saleh. Er war früher Lehrer und arbeitet seit zwei Jahren als Maler."
},
{
"voice": "m3",
"text": "Am Anfang war es schwer, vor allem die Sprache auf der Baustelle. Die Kollegen reden schnell, und die Fachwörter kennt man aus keinem Kurs. Aber durch den Unterricht im Betrieb lerne ich genau die Wörter, die ich brauche. Nächstes Jahr mache ich meine Gesellenprüfung."
},
{
"voice": "m1",
"text": "Einfach ist dieser Weg nicht: Die Ausbildung dauert, und erfahrene Kollegen müssen viel Zeit in die Einarbeitung investieren. Trotzdem raten Experten anderen Betrieben, offen für Quereinsteiger zu sein. Denn, so Kerstin Wolff: Wer heute ausbildet, sichert sich die Fachkräfte von morgen."
}
],
"text": "Im Handwerk fehlen Fachkräfte, allein im Ruhrgebiet sind es nach Schätzungen mehrere tausend. Viele Betriebe müssen Aufträge ablehnen oder Kunden monatelang warten lassen. Einige gehen deshalb neue Wege. Zum Beispiel ein Malerbetrieb in Recklinghausen: Dort sind inzwischen drei von zwölf Mitarbeitenden Quereinsteiger. Inhaberin Kerstin Wolff: – Wir schauen nicht mehr nur auf Zeugnisse. Wenn jemand motiviert ist und handwerklich geschickt, dann bilden wir ihn aus, auch mit Mitte vierzig. Das Wichtigste ist, dass die Person ins Team passt. Das Fachliche kann man lernen. – Damit das klappt, arbeitet der Betrieb mit einem Bildungsträger zusammen. Einmal pro Woche gibt es direkt im Betrieb Deutschunterricht mit Fachwortschatz. Einen Teil der Kosten übernimmt die Agentur für Arbeit. Einer der Teilnehmer ist Rami Saleh. Er war früher Lehrer und arbeitet seit zwei Jahren als Maler. – Am Anfang war es schwer, vor allem die Sprache auf der Baustelle. Die Kollegen reden schnell, und die Fachwörter kennt man aus keinem Kurs. Aber durch den Unterricht im Betrieb lerne ich genau die Wörter, die ich brauche. Nächstes Jahr mache ich meine Gesellenprüfung. – Einfach ist dieser Weg nicht: Die Ausbildung dauert, und erfahrene Kollegen müssen viel Zeit in die Einarbeitung investieren. Trotzdem raten Experten anderen Betrieben, offen für Quereinsteiger zu sein. Denn, so Kerstin Wolff: Wer heute ausbildet, sichert sich die Fachkräfte von morgen.",
"questions": [
{
"q": "Was ist für Frau Wolff bei neuen Mitarbeitenden am wichtigsten?",
"options": [
"Gute Schulzeugnisse.",
"Dass sie ins Team passen.",
"Dass sie jünger als vierzig sind."
],
"answer": 1,
"why": "„Das Wichtigste ist, dass die Person ins Team passt.“ Zeugnisse sind ihr nicht mehr so wichtig."
},
{
"q": "Wie ist der Deutschunterricht organisiert?",
"options": [
"Einmal pro Woche direkt im Betrieb.",
"Abends an der Volkshochschule.",
"Online am Wochenende."
],
"answer": 0,
"why": "„Einmal pro Woche gibt es direkt im Betrieb Deutschunterricht mit Fachwortschatz.“"
},
{
"q": "Welchen Nachteil nennt der Beitrag?",
"options": [
"Quereinsteiger verdienen weniger.",
"Die Agentur für Arbeit zahlt nichts.",
"Die Einarbeitung kostet die erfahrenen Kollegen viel Zeit."
],
"answer": 2,
"why": "„… erfahrene Kollegen müssen viel Zeit in die Einarbeitung investieren.“ Die Agentur zahlt einen Teil der Kosten."
}
]
}
]
},
"b2-3": {
"title": "DTB B2 Hören · Übungssatz 3",
"level": "B2",
"exam": "DTB",
"intro": "Arbeitsschutz, Vertretung, Büroumzug, Preisverhandlung, Feedbackgespräch und ein Vortrag über KI im Büro. Achte darauf, was nur vorgeschlagen und was wirklich entschieden wird.",
"group": "b2",
"items": [
{
"id": "b2-3-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Die Fachkraft für Arbeitssicherheit ruft Frau Jankowski an.",
"segments": [
{
"voice": "m1",
"text": "Guten Morgen, Frau Jankowski, hier ist Markus Feldmann, Fachkraft für Arbeitssicherheit. Ich wollte Sie daran erinnern, dass Ihre jährliche Sicherheitsunterweisung noch fehlt. Der nächste Termin ist am Dienstag, dem 17. November, um 14 Uhr in Halle 3, im Besprechungsraum oben. Die Unterweisung dauert ungefähr eine Stunde und gilt natürlich als Arbeitszeit. Falls Sie da Schicht haben, gibt es noch einen Online-Termin am 24. Bitte geben Sie mir kurz Bescheid, welchen Termin Sie nehmen. Danke!"
}
],
"text": "Guten Morgen, Frau Jankowski, hier ist Markus Feldmann, Fachkraft für Arbeitssicherheit. Ich wollte Sie daran erinnern, dass Ihre jährliche Sicherheitsunterweisung noch fehlt. Der nächste Termin ist am Dienstag, dem 17. November, um 14 Uhr in Halle 3, im Besprechungsraum oben. Die Unterweisung dauert ungefähr eine Stunde und gilt natürlich als Arbeitszeit. Falls Sie da Schicht haben, gibt es noch einen Online-Termin am 24. Bitte geben Sie mir kurz Bescheid, welchen Termin Sie nehmen. Danke!",
"questions": [
{
"q": "Die Unterweisung zählt als Arbeitszeit.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„… und gilt natürlich als Arbeitszeit.“"
},
{
"q": "Was soll Frau Jankowski tun?",
"options": [
"Am 24. November nach Halle 3 kommen.",
"Sich für einen Termin entscheiden und Bescheid geben.",
"Ein Formular online ausfüllen."
],
"answer": 1,
"why": "„Bitte geben Sie mir kurz Bescheid, welchen Termin Sie nehmen.“ Der 24. ist ein Online-Termin, nicht in Halle 3."
}
]
},
{
"id": "b2-3-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Eine Kollegin spricht Daniel auf die Mailbox.",
"segments": [
{
"voice": "f3",
"text": "Hi Daniel, hier ist Melanie. Ich liege leider mit Grippe im Bett und bin wahrscheinlich die ganze Woche krankgeschrieben. Kannst du bitte morgen die Präsentation beim Kunden in Bielefeld übernehmen? Die Folien liegen im Projektordner, Version vom Freitag. Nicht die alte vom Mittwoch, da sind die Preise noch falsch. Der Termin ist um zehn, Ansprechpartner ist Herr Gerdes. Ich habe ihm schon geschrieben, dass du kommst. Wenn du Fragen hast, schreib mir lieber eine Nachricht, ich kann gerade kaum sprechen."
}
],
"text": "Hi Daniel, hier ist Melanie. Ich liege leider mit Grippe im Bett und bin wahrscheinlich die ganze Woche krankgeschrieben. Kannst du bitte morgen die Präsentation beim Kunden in Bielefeld übernehmen? Die Folien liegen im Projektordner, Version vom Freitag. Nicht die alte vom Mittwoch, da sind die Preise noch falsch. Der Termin ist um zehn, Ansprechpartner ist Herr Gerdes. Ich habe ihm schon geschrieben, dass du kommst. Wenn du Fragen hast, schreib mir lieber eine Nachricht, ich kann gerade kaum sprechen.",
"questions": [
{
"q": "Melanie hat den Kunden schon informiert.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Ich habe ihm schon geschrieben, dass du kommst.“"
},
{
"q": "Welche Folien soll Daniel benutzen?",
"options": [
"Die Version vom Mittwoch.",
"Die Version, die Herr Gerdes hat.",
"Die Version vom Freitag."
],
"answer": 2,
"why": "„Version vom Freitag. Nicht die alte vom Mittwoch, da sind die Preise noch falsch.“"
}
]
},
{
"id": "b2-3-03",
"teil": "Teil 2",
"type": "Teambesprechung",
"situation": "Besprechung in einem Dortmunder Unternehmen. Es sprechen Abteilungsleiterin Frau Schröder, Herr Becker und Frau Öztürk.",
"segments": [
{
"voice": "f1",
"text": "Kommen wir zum Umzug. Wie ihr wisst, ziehen wir im Februar in das neue Gebäude am Phoenix-See. Dort wird es keine festen Arbeitsplätze mehr geben, sondern Desk-Sharing. Auf 30 Mitarbeitende kommen 22 Schreibtische."
},
{
"voice": "m2",
"text": "Und das reicht? Wenn alle am selben Tag kommen, stehen wir im Flur."
},
{
"voice": "f1",
"text": "Deshalb machen wir einen Plan. Jedes Team bekommt feste Präsenztage. Unser Team wäre dienstags und donnerstags vor Ort, an den anderen Tagen im Homeoffice."
},
{
"voice": "f2",
"text": "Dienstag ist schlecht. Da haben wir doch jede Woche den Jour fixe mit dem Vertrieb, und die Kollegen vom Vertrieb sind nur montags im Haus."
},
{
"voice": "f1",
"text": "Guter Punkt. Dann tauschen wir: Montag und Donnerstag. Ich kläre das mit den anderen Teamleitungen."
},
{
"voice": "m2",
"text": "Was passiert eigentlich mit unseren Unterlagen? Ich habe noch drei Schränke voller Akten."
},
{
"voice": "f1",
"text": "Alles, was älter als zehn Jahre ist, wird vernichtet, natürlich datenschutzgerecht. Der Rest wird möglichst digitalisiert. Im neuen Gebäude bekommt jeder nur noch ein Schließfach."
},
{
"voice": "m2",
"text": "Na, dann habe ich ja im Januar einiges zu tun."
},
{
"voice": "f2",
"text": "Und wie buchen wir die Schreibtische?"
},
{
"voice": "f1",
"text": "Über eine App. Man kann bis zu zwei Wochen im Voraus buchen. Eine Schulung dazu gibt es Mitte Januar. Frau Öztürk, könnten Sie für unser Team die Ansprechpartnerin sein, falls es mit der App Probleme gibt?"
},
{
"voice": "f2",
"text": "Ja, gerne."
},
{
"voice": "f1",
"text": "Danke. Dann nehmen wir das so ins Protokoll."
}
],
"text": "Kommen wir zum Umzug. Wie ihr wisst, ziehen wir im Februar in das neue Gebäude am Phoenix-See. Dort wird es keine festen Arbeitsplätze mehr geben, sondern Desk-Sharing. Auf 30 Mitarbeitende kommen 22 Schreibtische. – Und das reicht? Wenn alle am selben Tag kommen, stehen wir im Flur. – Deshalb machen wir einen Plan. Jedes Team bekommt feste Präsenztage. Unser Team wäre dienstags und donnerstags vor Ort, an den anderen Tagen im Homeoffice. – Dienstag ist schlecht. Da haben wir doch jede Woche den Jour fixe mit dem Vertrieb, und die Kollegen vom Vertrieb sind nur montags im Haus. – Guter Punkt. Dann tauschen wir: Montag und Donnerstag. Ich kläre das mit den anderen Teamleitungen. – Was passiert eigentlich mit unseren Unterlagen? Ich habe noch drei Schränke voller Akten. – Alles, was älter als zehn Jahre ist, wird vernichtet, natürlich datenschutzgerecht. Der Rest wird möglichst digitalisiert. Im neuen Gebäude bekommt jeder nur noch ein Schließfach. – Na, dann habe ich ja im Januar einiges zu tun. – Und wie buchen wir die Schreibtische? – Über eine App. Man kann bis zu zwei Wochen im Voraus buchen. Eine Schulung dazu gibt es Mitte Januar. Frau Öztürk, könnten Sie für unser Team die Ansprechpartnerin sein, falls es mit der App Probleme gibt? – Ja, gerne. – Danke. Dann nehmen wir das so ins Protokoll.",
"questions": [
{
"q": "Warum passt der Dienstag als Präsenztag nicht?",
"options": [
"Am Dienstag sind die Kollegen vom Vertrieb nicht im Haus.",
"Am Dienstag findet die App-Schulung statt.",
"Am Dienstag ist das neue Gebäude geschlossen."
],
"answer": 0,
"why": "Der Jour fixe mit dem Vertrieb ist wichtig, und der Vertrieb ist „nur montags im Haus“."
},
{
"q": "Was passiert mit den alten Akten?",
"options": [
"Alle Akten kommen ins neue Gebäude.",
"Akten, die älter als zehn Jahre sind, werden vernichtet.",
"Jeder nimmt seine Akten mit nach Hause."
],
"answer": 1,
"why": "„Alles, was älter als zehn Jahre ist, wird vernichtet.“ Der Rest wird digitalisiert."
},
{
"q": "Welche Aufgabe übernimmt Frau Öztürk?",
"options": [
"Sie organisiert den Umzug.",
"Sie leitet die Schulung im Januar.",
"Sie hilft dem Team bei Problemen mit der Buchungs-App."
],
"answer": 2,
"why": "Sie wird Ansprechpartnerin, „falls es mit der App Probleme gibt“."
}
]
},
{
"id": "b2-3-04",
"teil": "Teil 3",
"type": "Gespräch mit einem Geschäftspartner",
"situation": "Eine Vertriebsmitarbeiterin einer Mühle spricht mit dem Einkäufer einer Bäckerei-Kette in Bochum.",
"segments": [
{
"voice": "f3",
"text": "Herr Kaminski, schön, dass Sie Zeit haben. Ich muss leider gleich mit einer weniger guten Nachricht anfangen: Ab Januar müssen wir unsere Mehlpreise um acht Prozent erhöhen."
},
{
"voice": "m2",
"text": "Acht Prozent? Frau Roth, das ist deutlich zu viel. Wir haben doch erst im Frühjahr eine Erhöhung akzeptiert."
},
{
"voice": "f3",
"text": "Ich weiß. Aber die Energiekosten und vor allem die Transportkosten sind weiter gestiegen. Wir geben wirklich nur einen Teil davon weiter."
},
{
"voice": "m2",
"text": "Das verstehe ich. Trotzdem, bei zwölf Filialen ist das ein großer Betrag. Gibt es da gar keinen Spielraum?"
},
{
"voice": "f3",
"text": "Eine Möglichkeit gäbe es: Wenn Sie einen Vertrag über zwölf Monate abschließen statt wie bisher über sechs, kann ich Ihnen eine Erhöhung von nur fünf Prozent anbieten. Dafür bräuchten wir aber feste Mindestmengen."
},
{
"voice": "m2",
"text": "Hm. Das müsste ich mit unserer Geschäftsführung besprechen. Bis wann brauchen Sie eine Antwort?"
},
{
"voice": "f3",
"text": "Bis Ende November, dann kann ich den Preis noch garantieren."
},
{
"voice": "m2",
"text": "In Ordnung. Schicken Sie mir die Konditionen bitte schriftlich, dann melde ich mich nächste Woche."
}
],
"text": "Herr Kaminski, schön, dass Sie Zeit haben. Ich muss leider gleich mit einer weniger guten Nachricht anfangen: Ab Januar müssen wir unsere Mehlpreise um acht Prozent erhöhen. – Acht Prozent? Frau Roth, das ist deutlich zu viel. Wir haben doch erst im Frühjahr eine Erhöhung akzeptiert. – Ich weiß. Aber die Energiekosten und vor allem die Transportkosten sind weiter gestiegen. Wir geben wirklich nur einen Teil davon weiter. – Das verstehe ich. Trotzdem, bei zwölf Filialen ist das ein großer Betrag. Gibt es da gar keinen Spielraum? – Eine Möglichkeit gäbe es: Wenn Sie einen Vertrag über zwölf Monate abschließen statt wie bisher über sechs, kann ich Ihnen eine Erhöhung von nur fünf Prozent anbieten. Dafür bräuchten wir aber feste Mindestmengen. – Hm. Das müsste ich mit unserer Geschäftsführung besprechen. Bis wann brauchen Sie eine Antwort? – Bis Ende November, dann kann ich den Preis noch garantieren. – In Ordnung. Schicken Sie mir die Konditionen bitte schriftlich, dann melde ich mich nächste Woche.",
"questions": [
{
"q": "Herr Kaminski nimmt das Angebot sofort an.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Er muss erst mit der Geschäftsführung sprechen und meldet sich nächste Woche."
},
{
"q": "Unter welcher Bedingung steigt der Preis nur um fünf Prozent?",
"options": [
"Wenn die Bäckerei das Mehl selbst abholt.",
"Bei einem Vertrag über zwölf Monate mit festen Mindestmengen.",
"Wenn Herr Kaminski bis morgen unterschreibt."
],
"answer": 1,
"why": "„Wenn Sie einen Vertrag über zwölf Monate abschließen … Dafür bräuchten wir aber feste Mindestmengen.“"
}
]
},
{
"id": "b2-3-05",
"teil": "Teil 3",
"type": "Gespräch mit dem Vorgesetzten",
"situation": "Feedbackgespräch am Ende der Probezeit.",
"segments": [
{
"voice": "m1",
"text": "Frau Popescu, Ihre Probezeit endet ja Ende des Monats. Deshalb wollte ich kurz mit Ihnen zurückblicken. Wie geht es Ihnen im Team?"
},
{
"voice": "f2",
"text": "Eigentlich sehr gut. Die Kolleginnen haben mir viel geholfen. Am Anfang war das Abrechnungsprogramm schwierig, aber inzwischen komme ich gut zurecht."
},
{
"voice": "m1",
"text": "Das sehe ich auch so. Ihre Abrechnungen sind sehr sorgfältig, und die Kunden loben Ihre freundliche Art am Telefon. Ein Punkt, an dem wir noch arbeiten sollten: Manchmal übernehmen Sie zu viele Aufgaben gleichzeitig und sagen nicht Bescheid, wenn es zu viel wird."
},
{
"voice": "f2",
"text": "Ja, das stimmt. Ich wollte am Anfang niemanden enttäuschen."
},
{
"voice": "m1",
"text": "Das verstehe ich. Aber es ist völlig in Ordnung, Nein zu sagen oder Prioritäten mit mir abzusprechen. Was wünschen Sie sich für die nächsten Monate?"
},
{
"voice": "f2",
"text": "Ich würde gern eine Fortbildung zum Thema Mahnwesen machen. Da fühle ich mich noch unsicher."
},
{
"voice": "m1",
"text": "Gute Idee. Schauen Sie doch mal ins Programm der IHK, und schicken Sie mir einen Vorschlag. Und um es offiziell zu sagen: Wir übernehmen Sie sehr gerne."
}
],
"text": "Frau Popescu, Ihre Probezeit endet ja Ende des Monats. Deshalb wollte ich kurz mit Ihnen zurückblicken. Wie geht es Ihnen im Team? – Eigentlich sehr gut. Die Kolleginnen haben mir viel geholfen. Am Anfang war das Abrechnungsprogramm schwierig, aber inzwischen komme ich gut zurecht. – Das sehe ich auch so. Ihre Abrechnungen sind sehr sorgfältig, und die Kunden loben Ihre freundliche Art am Telefon. Ein Punkt, an dem wir noch arbeiten sollten: Manchmal übernehmen Sie zu viele Aufgaben gleichzeitig und sagen nicht Bescheid, wenn es zu viel wird. – Ja, das stimmt. Ich wollte am Anfang niemanden enttäuschen. – Das verstehe ich. Aber es ist völlig in Ordnung, Nein zu sagen oder Prioritäten mit mir abzusprechen. Was wünschen Sie sich für die nächsten Monate? – Ich würde gern eine Fortbildung zum Thema Mahnwesen machen. Da fühle ich mich noch unsicher. – Gute Idee. Schauen Sie doch mal ins Programm der IHK, und schicken Sie mir einen Vorschlag. Und um es offiziell zu sagen: Wir übernehmen Sie sehr gerne.",
"questions": [
{
"q": "Herr Albers kritisiert Fehler in den Abrechnungen von Frau Popescu.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Er lobt die Abrechnungen als „sehr sorgfältig“. Kritik gibt es nur, weil sie zu viele Aufgaben auf einmal übernimmt."
},
{
"q": "Was soll Frau Popescu als Nächstes tun?",
"options": [
"Weniger mit Kunden telefonieren.",
"Ein neues Abrechnungsprogramm testen.",
"Einen Vorschlag für eine Fortbildung schicken."
],
"answer": 2,
"why": "„Schauen Sie doch mal ins Programm der IHK, und schicken Sie mir einen Vorschlag.“"
}
]
},
{
"id": "b2-3-06",
"teil": "Teil 4",
"type": "Vortrag",
"situation": "Ein Vortrag bei einer Veranstaltungsreihe für Unternehmen in Duisburg.",
"segments": [
{
"voice": "f1",
"text": "Herzlich willkommen zu unserer Reihe „Arbeit im Wandel“. Heute spricht Dr. Jens Albrecht über künstliche Intelligenz im Büroalltag."
},
{
"voice": "m2",
"text": "Vielen Dank. Ich möchte mit einer kleinen Umfrage beginnen, die wir hier in der Region bei Betrieben gemacht haben. Ungefähr jede dritte Firma nutzt schon KI-Werkzeuge, meistens, um Texte zu schreiben, E-Mails zusammenzufassen oder Besprechungen zu protokollieren. Die Vorteile liegen auf der Hand: Routinearbeiten gehen schneller, und es bleibt mehr Zeit für Kundengespräche. Ein Handwerksbetrieb aus Moers hat mir erzählt, dass er für Angebote heute nur noch halb so lange braucht wie früher. Aber ich sehe drei Risiken. Erstens: KI-Programme machen Fehler, und zwar oft sehr überzeugend. Jedes Ergebnis muss also von einem Menschen geprüft werden. Zweitens der Datenschutz: Kundendaten oder Personalakten haben in öffentlichen KI-Programmen nichts zu suchen. Und drittens haben viele Beschäftigte Angst um ihren Arbeitsplatz. Diese Angst muss man ernst nehmen. Meine Erfahrung ist allerdings, dass sich Aufgaben eher verändern, als dass sie verschwinden. Was bedeutet das nun für Sie als Unternehmen? Mein wichtigster Rat: Beginnen Sie mit klaren Regeln. Legen Sie schriftlich fest, welche Programme erlaubt sind und welche Daten man eingeben darf. Und bieten Sie Schulungen an, nicht nur für junge Leute, sondern für alle. Gerade erfahrene Mitarbeitende können sehr gut beurteilen, ob ein Ergebnis fachlich stimmt."
}
],
"text": "Herzlich willkommen zu unserer Reihe „Arbeit im Wandel“. Heute spricht Dr. Jens Albrecht über künstliche Intelligenz im Büroalltag. – Vielen Dank. Ich möchte mit einer kleinen Umfrage beginnen, die wir hier in der Region bei Betrieben gemacht haben. Ungefähr jede dritte Firma nutzt schon KI-Werkzeuge, meistens, um Texte zu schreiben, E-Mails zusammenzufassen oder Besprechungen zu protokollieren. Die Vorteile liegen auf der Hand: Routinearbeiten gehen schneller, und es bleibt mehr Zeit für Kundengespräche. Ein Handwerksbetrieb aus Moers hat mir erzählt, dass er für Angebote heute nur noch halb so lange braucht wie früher. Aber ich sehe drei Risiken. Erstens: KI-Programme machen Fehler, und zwar oft sehr überzeugend. Jedes Ergebnis muss also von einem Menschen geprüft werden. Zweitens der Datenschutz: Kundendaten oder Personalakten haben in öffentlichen KI-Programmen nichts zu suchen. Und drittens haben viele Beschäftigte Angst um ihren Arbeitsplatz. Diese Angst muss man ernst nehmen. Meine Erfahrung ist allerdings, dass sich Aufgaben eher verändern, als dass sie verschwinden. Was bedeutet das nun für Sie als Unternehmen? Mein wichtigster Rat: Beginnen Sie mit klaren Regeln. Legen Sie schriftlich fest, welche Programme erlaubt sind und welche Daten man eingeben darf. Und bieten Sie Schulungen an, nicht nur für junge Leute, sondern für alle. Gerade erfahrene Mitarbeitende können sehr gut beurteilen, ob ein Ergebnis fachlich stimmt.",
"questions": [
{
"q": "Wofür nutzen die Firmen KI laut Umfrage meistens?",
"options": [
"Für Texte, Zusammenfassungen und Protokolle.",
"Für die Buchhaltung.",
"Für Bewerbungsgespräche."
],
"answer": 0,
"why": "„… um Texte zu schreiben, E-Mails zusammenzufassen oder Besprechungen zu protokollieren.“"
},
{
"q": "Welches Risiko nennt Dr. Albrecht?",
"options": [
"KI-Programme sind zu teuer.",
"KI-Programme arbeiten zu langsam.",
"KI-Ergebnisse können falsch sein."
],
"answer": 2,
"why": "„KI-Programme machen Fehler, und zwar oft sehr überzeugend.“"
},
{
"q": "Was rät er den Unternehmen als Erstes?",
"options": [
"Nur junge Mitarbeitende zu schulen.",
"Klare Regeln für den Einsatz festzulegen.",
"Ganz auf KI zu verzichten."
],
"answer": 1,
"why": "„Mein wichtigster Rat: Beginnen Sie mit klaren Regeln.“ Schulungen sollen alle bekommen, nicht nur Junge."
}
]
}
]
}
};
