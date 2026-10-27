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
"dtz-5": {
"title": "DTZ Hören · Übungssatz 5",
"level": "A2–B1",
"exam": "DTZ",
"intro": "Dieser Übungssatz wächst: Jeden Montag kommt ein neuer Hörtext dazu, bis alle vier Teile komplett sind. Hör genau auf Zeiten und Tage – oft wird etwas geändert.",
"group": "dtz",
"items": [
{
"id": "dtz-5-01",
"teil": "Teil 1",
"type": "Anrufbeantworter",
"situation": "Die Apotheke hat Herrn Nowak auf den Anrufbeantworter gesprochen.",
"segments": [
{
"voice": "f3",
"text": "Ja, guten Tag, Herr Nowak, hier ist Lena Schulte von der Löwen-Apotheke, in der Bahnhofstraße. Es geht um das Medikament für Ihren Sohn. Das ist heute leider doch noch nicht gekommen – der Großhändler liefert erst morgen Vormittag. Sie können es dann also ab morgen, ab 14 Uhr, bei uns abholen. Ach ja, und bringen Sie bitte das Rezept mit, das haben Sie gestern nämlich wieder mitgenommen. Und, ähm, denken Sie dran: Mittwochnachmittag haben wir zu. Gut, dann … bis morgen. Auf Wiederhören!",
"say": "Ja, guten Tag, Herr Nowak, hier ist Lena Schulte von der Löwen-Apotheke, in der Bahnhofstraße. Es geht um das Medikament für Ihren Sohn. Das ist heute leider doch noch nicht gekommen – der Großhändler liefert erst morgen Vormittag. Sie können es dann also ab morgen, ab vierzehn Uhr, bei uns abholen. Ach ja, und bringen Sie bitte das Rezept mit, das haben Sie gestern nämlich wieder mitgenommen. Und, ähm, denken Sie dran: Mittwochnachmittag haben wir zu. Gut, dann … bis morgen. Auf Wiederhören!"
}
],
"text": "Ja, guten Tag, Herr Nowak, hier ist Lena Schulte von der Löwen-Apotheke, in der Bahnhofstraße. Es geht um das Medikament für Ihren Sohn. Das ist heute leider doch noch nicht gekommen – der Großhändler liefert erst morgen Vormittag. Sie können es dann also ab morgen, ab 14 Uhr, bei uns abholen. Ach ja, und bringen Sie bitte das Rezept mit, das haben Sie gestern nämlich wieder mitgenommen. Und, ähm, denken Sie dran: Mittwochnachmittag haben wir zu. Gut, dann … bis morgen. Auf Wiederhören!",
"questions": [
{
"q": "Wann kann Herr Nowak das Medikament abholen?",
"options": [
"Heute Nachmittag.",
"Morgen ab 14 Uhr.",
"Am Mittwochnachmittag."
],
"answer": 1,
"why": "Frau Schulte sagt: „Sie können es dann also ab morgen, ab 14 Uhr, bei uns abholen.“ Heute ist das Medikament noch nicht da, und am Mittwochnachmittag ist die Apotheke geschlossen."
}
]
},
{
"id": "dtz-5-02",
"teil": "Teil 2",
"type": "Durchsage in der Straßenbahn",
"situation": "Du fährst in Essen mit der Straßenbahn.",
"segments": [
{
"voice": "m2",
"text": "Liebe Fahrgäste, eine wichtige Information für alle, die heute in Richtung Rüttenscheid fahren wollen: Wegen einer Baustelle fährt die Linie 107 heute nur bis zum Hauptbahnhof. Bitte steigen Sie dort aus und nehmen Sie den Ersatzbus. Die Busse fahren alle 10 Minuten, und zwar nicht an der Straßenbahnhaltestelle, sondern am Ausgang Freiheit, auf der Südseite. Ihre Fahrkarte gilt auch im Ersatzbus. Ab Montag, dem 26. Oktober, fährt die Linie 107 wieder auf der normalen Strecke. Wir bitten um Ihr Verständnis.",
"say": "Liebe Fahrgäste, eine wichtige Information für alle, die heute in Richtung Rüttenscheid fahren wollen: Wegen einer Baustelle fährt die Linie hundertsieben heute nur bis zum Hauptbahnhof. Bitte steigen Sie dort aus und nehmen Sie den Ersatzbus. Die Busse fahren alle zehn Minuten, und zwar nicht an der Straßenbahnhaltestelle, sondern am Ausgang Freiheit, auf der Südseite. Ihre Fahrkarte gilt auch im Ersatzbus. Ab Montag, dem sechsundzwanzigsten Oktober, fährt die Linie hundertsieben wieder auf der normalen Strecke. Wir bitten um Ihr Verständnis."
}
],
"text": "Liebe Fahrgäste, eine wichtige Information für alle, die heute in Richtung Rüttenscheid fahren wollen: Wegen einer Baustelle fährt die Linie 107 heute nur bis zum Hauptbahnhof. Bitte steigen Sie dort aus und nehmen Sie den Ersatzbus. Die Busse fahren alle 10 Minuten, und zwar nicht an der Straßenbahnhaltestelle, sondern am Ausgang Freiheit, auf der Südseite. Ihre Fahrkarte gilt auch im Ersatzbus. Ab Montag, dem 26. Oktober, fährt die Linie 107 wieder auf der normalen Strecke. Wir bitten um Ihr Verständnis.",
"questions": [
{
"q": "Was sollen Fahrgäste nach Rüttenscheid heute machen?",
"options": [
"Am Hauptbahnhof in einen Ersatzbus umsteigen.",
"An der Straßenbahnhaltestelle auf die nächste Bahn warten.",
"Am Hauptbahnhof eine neue Fahrkarte kaufen."
],
"answer": 0,
"why": "Die Linie 107 fährt nur bis zum Hauptbahnhof: „Bitte steigen Sie dort aus und nehmen Sie den Ersatzbus.“ Der Bus fährt nicht an der Straßenbahnhaltestelle ab, und die Fahrkarte gilt auch im Bus."
}
]
},
{
"id": "dtz-5-03",
"teil": "Teil 2",
"type": "Durchsage im Baumarkt",
"situation": "Du kaufst im Baumarkt ein.",
"segments": [
{
"voice": "f1",
"text": "Liebe Kundinnen und Kunden, eine Information aus unserer Gartenabteilung: Die Pflanzen im Außenbereich sind ab heute bis Samstag um 30 Prozent reduziert. Bitte beachten Sie: Die Kasse im Gartencenter ist heute schon ab 16 Uhr geschlossen. Bezahlen Sie Ihre Pflanzen dann bitte an den Hauptkassen am Eingang. Und noch ein Hinweis: Unser Transporter zum Ausleihen ist heute leider schon ausgebucht. Für morgen können Sie ihn an der Information reservieren. Vielen Dank für Ihren Einkauf!",
"say": "Liebe Kundinnen und Kunden, eine Information aus unserer Gartenabteilung: Die Pflanzen im Außenbereich sind ab heute bis Samstag um dreißig Prozent reduziert. Bitte beachten Sie: Die Kasse im Gartencenter ist heute schon ab sechzehn Uhr geschlossen. Bezahlen Sie Ihre Pflanzen dann bitte an den Hauptkassen am Eingang. Und noch ein Hinweis: Unser Transporter zum Ausleihen ist heute leider schon ausgebucht. Für morgen können Sie ihn an der Information reservieren. Vielen Dank für Ihren Einkauf!"
}
],
"text": "Liebe Kundinnen und Kunden, eine Information aus unserer Gartenabteilung: Die Pflanzen im Außenbereich sind ab heute bis Samstag um 30 Prozent reduziert. Bitte beachten Sie: Die Kasse im Gartencenter ist heute schon ab 16 Uhr geschlossen. Bezahlen Sie Ihre Pflanzen dann bitte an den Hauptkassen am Eingang. Und noch ein Hinweis: Unser Transporter zum Ausleihen ist heute leider schon ausgebucht. Für morgen können Sie ihn an der Information reservieren. Vielen Dank für Ihren Einkauf!",
"questions": [
{
"q": "Was kann man heute machen?",
"options": [
"Den Transporter für morgen reservieren.",
"Den Transporter sofort ausleihen.",
"Nach 16 Uhr im Gartencenter bezahlen."
],
"answer": 0,
"why": "Der Transporter ist heute „schon ausgebucht“, aber „für morgen können Sie ihn an der Information reservieren“. Die Kasse im Gartencenter schließt schon um 16 Uhr."
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
},
"b2-4": {
"title": "DTB B2 Hören · Übungssatz 4",
"level": "B2",
"exam": "DTB",
"intro": "Dieser Übungssatz wächst: Jeden Montag kommt ein neuer Hörtext aus dem Berufsalltag dazu. Achte darauf, was sich ändert und was von dir erwartet wird.",
"group": "b2",
"items": [
{
"id": "b2-4-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Ein Tagungshotel hat Frau Nguyen eine Nachricht hinterlassen.",
"segments": [
{
"voice": "m1",
"text": "Ja, guten Tag, Frau Nguyen, Jörg Albers hier, vom Tagungshotel Seeblick in Haltern. Ich ruf an wegen Ihrer Kundenveranstaltung am 27. November. Also, leider haben wir da ein Problem mit dem großen Saal: Da wird in der Woche die Lüftung erneuert, und die Firma wird – so wie es aussieht – nicht rechtzeitig fertig. Tut mir wirklich leid. Was wir Ihnen aber anbieten können: zwei kleinere Räume direkt nebeneinander, die kann man mit einer Schiebewand verbinden. Das wär zum gleichen Preis, und den Kaffee am Nachmittag, den übernehmen wir. Für die Planung bräuchte ich allerdings bis spätestens Freitag die genaue Teilnehmerzahl – bisher sind wir ja von 60 Personen ausgegangen. Sie erreichen mich direkt unter 02364 50 37 12. Ich wiederhole: 02364 50 37 12. Gut, vielen Dank, und bis bald!",
"say": "Ja, guten Tag, Frau Nguyen, Jörg Albers hier, vom Tagungshotel Seeblick in Haltern. Ich ruf an wegen Ihrer Kundenveranstaltung am siebenundzwanzigsten November. Also, leider haben wir da ein Problem mit dem großen Saal: Da wird in der Woche die Lüftung erneuert, und die Firma wird – so wie es aussieht – nicht rechtzeitig fertig. Tut mir wirklich leid. Was wir Ihnen aber anbieten können: zwei kleinere Räume direkt nebeneinander, die kann man mit einer Schiebewand verbinden. Das wär zum gleichen Preis, und den Kaffee am Nachmittag, den übernehmen wir. Für die Planung bräuchte ich allerdings bis spätestens Freitag die genaue Teilnehmerzahl – bisher sind wir ja von sechzig Personen ausgegangen. Sie erreichen mich direkt unter null zwei drei sechs vier … fünfzig … siebenunddreißig … zwölf. Ich wiederhole: null zwei drei sechs vier … fünfzig … siebenunddreißig … zwölf. Gut, vielen Dank, und bis bald!"
}
],
"text": "Ja, guten Tag, Frau Nguyen, Jörg Albers hier, vom Tagungshotel Seeblick in Haltern. Ich ruf an wegen Ihrer Kundenveranstaltung am 27. November. Also, leider haben wir da ein Problem mit dem großen Saal: Da wird in der Woche die Lüftung erneuert, und die Firma wird – so wie es aussieht – nicht rechtzeitig fertig. Tut mir wirklich leid. Was wir Ihnen aber anbieten können: zwei kleinere Räume direkt nebeneinander, die kann man mit einer Schiebewand verbinden. Das wär zum gleichen Preis, und den Kaffee am Nachmittag, den übernehmen wir. Für die Planung bräuchte ich allerdings bis spätestens Freitag die genaue Teilnehmerzahl – bisher sind wir ja von 60 Personen ausgegangen. Sie erreichen mich direkt unter 02364 50 37 12. Ich wiederhole: 02364 50 37 12. Gut, vielen Dank, und bis bald!",
"questions": [
{
"q": "Die Veranstaltung kann wie geplant im großen Saal stattfinden.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Im großen Saal wird die Lüftung erneuert, und die Firma wird „nicht rechtzeitig fertig“. Das Hotel bietet stattdessen zwei kleinere Räume an."
},
{
"q": "Was soll Frau Nguyen bis Freitag mitteilen?",
"options": [
"Ob die Gäste vegetarisch essen möchten.",
"Wie viele Personen genau teilnehmen.",
"Ob sie den Termin verschieben möchte."
],
"answer": 1,
"why": "Herr Albers braucht „bis spätestens Freitag die genaue Teilnehmerzahl“. Von 60 Personen war das Hotel nur ausgegangen."
}
]
},
{
"id": "b2-4-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Die Buchhaltung ruft Herrn Petrović an.",
"segments": [
{
"voice": "f2",
"text": "Ja, hallo Herr Petrović, hier ist Sabine Kröger aus der Buchhaltung. Es geht um Ihre Reisekostenabrechnung für die Messe in Hannover. Die ist bei mir angekommen, danke, aber, ähm, da fehlt leider noch was: Fürs Hotel hab ich nur die Buchungsbestätigung, nicht die eigentliche Rechnung mit der Mehrwertsteuer. Ohne die kann ich das nicht freigeben. Die Taxiquittungen sind alle da, das passt so. Sie müssen mir das Original auch nicht vorbeibringen – einfach einscannen und per Mail an mich schicken, das reicht völlig. Und noch was Wichtiges: Alles, was bis zum 5. November bei uns ist, wird mit dem Novembergehalt ausgezahlt. Was danach kommt, geht erst in den Dezember. Bei Fragen erreichen Sie mich unter der Durchwahl 418. Also, schönen Tag noch!",
"say": "Ja, hallo Herr Petrović, hier ist Sabine Kröger aus der Buchhaltung. Es geht um Ihre Reisekostenabrechnung für die Messe in Hannover. Die ist bei mir angekommen, danke, aber, ähm, da fehlt leider noch was: Fürs Hotel hab ich nur die Buchungsbestätigung, nicht die eigentliche Rechnung mit der Mehrwertsteuer. Ohne die kann ich das nicht freigeben. Die Taxiquittungen sind alle da, das passt so. Sie müssen mir das Original auch nicht vorbeibringen – einfach einscannen und per Mail an mich schicken, das reicht völlig. Und noch was Wichtiges: Alles, was bis zum fünften November bei uns ist, wird mit dem Novembergehalt ausgezahlt. Was danach kommt, geht erst in den Dezember. Bei Fragen erreichen Sie mich unter der Durchwahl vier eins acht. Also, schönen Tag noch!"
}
],
"text": "Ja, hallo Herr Petrović, hier ist Sabine Kröger aus der Buchhaltung. Es geht um Ihre Reisekostenabrechnung für die Messe in Hannover. Die ist bei mir angekommen, danke, aber, ähm, da fehlt leider noch was: Fürs Hotel hab ich nur die Buchungsbestätigung, nicht die eigentliche Rechnung mit der Mehrwertsteuer. Ohne die kann ich das nicht freigeben. Die Taxiquittungen sind alle da, das passt so. Sie müssen mir das Original auch nicht vorbeibringen – einfach einscannen und per Mail an mich schicken, das reicht völlig. Und noch was Wichtiges: Alles, was bis zum 5. November bei uns ist, wird mit dem Novembergehalt ausgezahlt. Was danach kommt, geht erst in den Dezember. Bei Fragen erreichen Sie mich unter der Durchwahl 418. Also, schönen Tag noch!",
"questions": [
{
"q": "Die Reisekostenabrechnung von Herrn Petrović ist vollständig.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Es fehlt die Hotelrechnung mit der Mehrwertsteuer: „Ohne die kann ich das nicht freigeben.“ Nur die Taxiquittungen sind vollständig."
},
{
"q": "Was soll Herr Petrović tun?",
"options": [
"Die Hotelrechnung im Original in die Buchhaltung bringen.",
"Die Hotelrechnung einscannen und per Mail schicken.",
"Die Taxiquittungen noch einmal einreichen."
],
"answer": 1,
"why": "Frau Kröger sagt: „einfach einscannen und per Mail an mich schicken, das reicht völlig.“ Das Original braucht sie nicht, und die Taxiquittungen sind schon da."
}
]
},
{
"id": "b2-4-03",
"teil": "Teil 2",
"type": "Teambesprechung",
"situation": "Besprechung bei einem ambulanten Pflegedienst in Bochum. Es sprechen Pflegedienstleiterin Frau Brandt, Herr Yıldız und Frau Lehmann.",
"segments": [
{
"voice": "f1",
"text": "Also, dann legen wir los. Hauptthema heute ist die neue Tourenplanung. Ab dem 1. Dezember planen wir die Touren nicht mehr auf Papier, sondern über die App auf euren Diensthandys.",
"say": "Also, dann legen wir los. Hauptthema heute ist die neue Tourenplanung. Ab dem ersten Dezember planen wir die Touren nicht mehr auf Papier, sondern über die App auf euren Diensthandys."
},
{
"voice": "m1",
"text": "Und was ist, wenn das Netz weg ist? In Wattenscheid am Stadtrand hab ich oft gar keinen Empfang."
},
{
"voice": "f1",
"text": "Gute Frage. Die App speichert die Tour morgens, solange ihr noch im Büro seid. Danach funktioniert sie auch ohne Netz. Die Daten werden geschickt, sobald ihr wieder Empfang habt."
},
{
"voice": "f3",
"text": "Und die Dokumentation beim Patienten? Machen wir die dann auch in der App, oder weiter in der Mappe?"
},
{
"voice": "f1",
"text": "Erst mal beides. Bis Ende Januar läuft die Mappe parallel weiter. Wenn alles stabil läuft, fällt die Papierdokumentation weg."
},
{
"voice": "m1",
"text": "Das heißt also doppelte Arbeit für zwei Monate."
},
{
"voice": "f1",
"text": "Ja, ich weiß, das ist nicht schön. Deshalb haben wir mit der Geschäftsführung vereinbart: Pro Tour gibt es in der Übergangszeit zehn Minuten mehr Zeit. Das ist schon im Plan drin."
},
{
"voice": "f3",
"text": "Okay, das hilft. Und wer zeigt uns, wie die App funktioniert?"
},
{
"voice": "f1",
"text": "Es gibt zwei Schulungen, jeweils eine Stunde: am 18. und am 25. November, immer um 14 Uhr hier im Besprechungsraum. Jeder muss an einem der beiden Termine teilnehmen. Tragt euch bitte bis Freitag in die Liste an meiner Tür ein.",
"say": "Es gibt zwei Schulungen, jeweils eine Stunde: am achtzehnten und am fünfundzwanzigsten November, immer um vierzehn Uhr hier im Besprechungsraum. Jeder muss an einem der beiden Termine teilnehmen. Tragt euch bitte bis Freitag in die Liste an meiner Tür ein."
},
{
"voice": "m1",
"text": "Und wenn man an beiden Tagen Spätdienst hat?"
},
{
"voice": "f1",
"text": "Dann sprich bitte direkt mit Frau Kowalczyk. Sie macht für solche Fälle einen Einzeltermin."
}
],
"text": "Also, dann legen wir los. Hauptthema heute ist die neue Tourenplanung. Ab dem 1. Dezember planen wir die Touren nicht mehr auf Papier, sondern über die App auf euren Diensthandys. Und was ist, wenn das Netz weg ist? In Wattenscheid am Stadtrand hab ich oft gar keinen Empfang. Gute Frage. Die App speichert die Tour morgens, solange ihr noch im Büro seid. Danach funktioniert sie auch ohne Netz. Die Daten werden geschickt, sobald ihr wieder Empfang habt. Und die Dokumentation beim Patienten? Machen wir die dann auch in der App, oder weiter in der Mappe? Erst mal beides. Bis Ende Januar läuft die Mappe parallel weiter. Wenn alles stabil läuft, fällt die Papierdokumentation weg. Das heißt also doppelte Arbeit für zwei Monate. Ja, ich weiß, das ist nicht schön. Deshalb haben wir mit der Geschäftsführung vereinbart: Pro Tour gibt es in der Übergangszeit zehn Minuten mehr Zeit. Das ist schon im Plan drin. Okay, das hilft. Und wer zeigt uns, wie die App funktioniert? Es gibt zwei Schulungen, jeweils eine Stunde: am 18. und am 25. November, immer um 14 Uhr hier im Besprechungsraum. Jeder muss an einem der beiden Termine teilnehmen. Tragt euch bitte bis Freitag in die Liste an meiner Tür ein. Und wenn man an beiden Tagen Spätdienst hat? Dann sprich bitte direkt mit Frau Kowalczyk. Sie macht für solche Fälle einen Einzeltermin.",
"questions": [
{
"q": "Was passiert, wenn unterwegs kein Netz da ist?",
"options": [
"Die Pflegekräfte müssen ins Büro zurückfahren.",
"Die App funktioniert trotzdem, die Daten werden später geschickt.",
"Die Pflegekräfte schreiben alles auf Papier und tippen es später ab."
],
"answer": 1,
"why": "Frau Brandt sagt: „Danach funktioniert sie auch ohne Netz. Die Daten werden geschickt, sobald ihr wieder Empfang habt.“"
},
{
"q": "Wie wird die doppelte Dokumentation ausgeglichen?",
"options": [
"Die Mitarbeitenden bekommen pro Tour zehn Minuten mehr Zeit.",
"Die Mitarbeitenden bekommen Überstunden bezahlt.",
"Die Mappe fällt schon im Dezember weg."
],
"answer": 0,
"why": "„Pro Tour gibt es in der Übergangszeit zehn Minuten mehr Zeit.“ Die Mappe läuft bis Ende Januar parallel weiter."
},
{
"q": "Was sollen Mitarbeitende tun, die an beiden Schulungsterminen Spätdienst haben?",
"options": [
"Sie lassen die Schulung ausfallen.",
"Sie tragen sich trotzdem in die Liste ein.",
"Sie sprechen mit Frau Kowalczyk über einen Einzeltermin."
],
"answer": 2,
"why": "„Dann sprich bitte direkt mit Frau Kowalczyk. Sie macht für solche Fälle einen Einzeltermin.“"
}
]
}
]
},
"telcb1-1": {
"title": "telc B1 Hören · Übungssatz 1",
"level": "B1",
"exam": "telc B1",
"intro": "Aufgebaut wie die telc-Prüfung Deutsch B1: Radionachrichten (Teil 1), ein Interview im Radio (Teil 2) und kurze Durchsagen und Nachrichten auf dem Anrufbeantworter (Teil 3). Entscheide bei jeder Aussage: richtig oder falsch? In der Prüfung hörst du Teil 1 nur einmal, Teil 2 und Teil 3 zweimal.",
"group": "telcb1",
"items": [
{
"id": "telcb1-1-01",
"teil": "Teil 1",
"type": "Radionachrichten",
"situation": "Du hörst die Nachrichten im Radio. Es gibt fünf Meldungen. Zu jeder Meldung gibt es eine Aussage.",
"segments": [
{
"voice": "m1",
"text": "Radio Ruhrwelle, es ist zwölf Uhr. Die Nachrichten. In Dortmund ist heute Vormittag der neue Radweg zwischen der Innenstadt und dem Phoenix-See freigegeben worden. Die Strecke ist rund vier Kilometer lang und führt zum größten Teil an der Emscher entlang. Die Stadt hat fast zwei Jahre daran gebaut. Zur Eröffnung gibt es am Samstag eine gemeinsame Radtour, Start ist um elf Uhr am Rathaus. Bochum und Gelsenkirchen: Wegen eines Warnstreiks fahren dort morgen ab drei Uhr früh keine Busse und Straßenbahnen. Die Gewerkschaft hat die Beschäftigten der Verkehrsbetriebe zu einem ganztägigen Streik aufgerufen. S-Bahnen und Regionalzüge sind nicht betroffen, sie fahren nach Fahrplan. Die Krankenkassen in Nordrhein-Westfalen raten älteren Menschen, sich jetzt gegen Grippe impfen zu lassen. Für alle ab sechzig Jahren ist die Impfung kostenlos. Termine gibt es in den Hausarztpraxen, in vielen Städten auch in Apotheken. Die Museumsnacht im Ruhrgebiet war ein großer Erfolg: Mehr als zwölftausend Menschen haben am Samstag die Museen in Essen, Bochum und Duisburg besucht. Das sind fast dreitausend mehr als im letzten Jahr. Die Veranstalter wollen die Museumsnacht deshalb im nächsten Jahr um eine Stunde verlängern. Und zum Wetter: Heute Nachmittag ziehen von Westen Regenschauer auf, am Abend sind auch Gewitter möglich. Die Temperaturen liegen bei vierzehn Grad. Morgen wird es freundlicher, mit viel Sonne und bis zu siebzehn Grad."
}
],
"text": "Radio Ruhrwelle, es ist zwölf Uhr. Die Nachrichten. In Dortmund ist heute Vormittag der neue Radweg zwischen der Innenstadt und dem Phoenix-See freigegeben worden. Die Strecke ist rund vier Kilometer lang und führt zum größten Teil an der Emscher entlang. Die Stadt hat fast zwei Jahre daran gebaut. Zur Eröffnung gibt es am Samstag eine gemeinsame Radtour, Start ist um elf Uhr am Rathaus. Bochum und Gelsenkirchen: Wegen eines Warnstreiks fahren dort morgen ab drei Uhr früh keine Busse und Straßenbahnen. Die Gewerkschaft hat die Beschäftigten der Verkehrsbetriebe zu einem ganztägigen Streik aufgerufen. S-Bahnen und Regionalzüge sind nicht betroffen, sie fahren nach Fahrplan. Die Krankenkassen in Nordrhein-Westfalen raten älteren Menschen, sich jetzt gegen Grippe impfen zu lassen. Für alle ab sechzig Jahren ist die Impfung kostenlos. Termine gibt es in den Hausarztpraxen, in vielen Städten auch in Apotheken. Die Museumsnacht im Ruhrgebiet war ein großer Erfolg: Mehr als zwölftausend Menschen haben am Samstag die Museen in Essen, Bochum und Duisburg besucht. Das sind fast dreitausend mehr als im letzten Jahr. Die Veranstalter wollen die Museumsnacht deshalb im nächsten Jahr um eine Stunde verlängern. Und zum Wetter: Heute Nachmittag ziehen von Westen Regenschauer auf, am Abend sind auch Gewitter möglich. Die Temperaturen liegen bei vierzehn Grad. Morgen wird es freundlicher, mit viel Sonne und bis zu siebzehn Grad.",
"questions": [
{
"q": "Meldung 1: Auf dem neuen Radweg in Dortmund kann man ab sofort fahren.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Der Radweg ist „heute Vormittag … freigegeben worden“. Die Radtour am Samstag ist nur die Eröffnungsfeier."
},
{
"q": "Meldung 2: Morgen fahren in Bochum auch keine Regionalzüge.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Nur Busse und Straßenbahnen streiken. Der Sprecher sagt: „S-Bahnen und Regionalzüge sind nicht betroffen.“"
},
{
"q": "Meldung 3: Menschen ab sechzig müssen für die Grippeimpfung nichts bezahlen.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Für alle ab sechzig Jahren ist die Impfung kostenlos.“"
},
{
"q": "Meldung 4: Zur Museumsnacht kamen weniger Besucher als im letzten Jahr.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Es kamen „fast dreitausend mehr als im letzten Jahr“."
},
{
"q": "Meldung 5: Morgen soll es mehr regnen als heute.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Heute kommen Regen und Gewitter. Morgen wird es „freundlicher, mit viel Sonne“."
}
]
},
{
"id": "telcb1-1-02",
"teil": "Teil 2",
"type": "Radiointerview",
"situation": "Du hörst ein Interview im Radio. Moderatorin Julia Hartmann spricht mit Kemal Aydın, der in Witten ein Repair-Café gegründet hat. Erster Teil.",
"segments": [
{
"voice": "f1",
"text": "Und hier bei mir im Studio sitzt jetzt Kemal Aydın. Hallo, Herr Aydın, schön, dass Sie da sind!"
},
{
"voice": "m2",
"text": "Hallo, ich freu mich auch."
},
{
"voice": "f1",
"text": "Sie haben in Witten ein Repair-Café gegründet. Erklären Sie unseren Hörerinnen und Hörern doch mal kurz: Was ist das eigentlich?"
},
{
"voice": "m2",
"text": "Ja, gerne. Also, ganz einfach: Die Leute bringen kaputte Sachen mit. Einen Toaster, eine Lampe, ein Fahrrad, eine Hose mit Loch … und wir versuchen, das zusammen zu reparieren. Und das ist wichtig: zusammen. Wir machen das nicht einfach für die Leute, die sitzen mit am Tisch und schauen zu. Oder sie machen selbst mit."
},
{
"voice": "f1",
"text": "Und wie sind Sie auf die Idee gekommen?"
},
{
"voice": "m2",
"text": "Ach, das war eigentlich Zufall. Ich war über dreißig Jahre Elektriker, bei den Stadtwerken. Und als ich dann in Rente gegangen bin, da, ähm … da hatte ich plötzlich so viel Zeit. Meine Frau hat gesagt: Kemal, du kannst nicht den ganzen Tag im Keller sitzen! Und dann hab ich in der Zeitung von einem Repair-Café in Köln gelesen. Und ich dachte: So was gibt's in Witten noch nicht. Das mach ich."
},
{
"voice": "f1",
"text": "Und wo treffen Sie sich?"
},
{
"voice": "m2",
"text": "Im Gemeindehaus von der evangelischen Kirche, in der Nähe vom Rathaus. Jeden ersten Samstag im Monat, von zehn bis eins. Am Anfang waren wir in einem kleinen Raum im Jugendzentrum, aber der war viel zu eng."
},
{
"voice": "f1",
"text": "Was kostet denn so eine Reparatur bei Ihnen?"
},
{
"voice": "m2",
"text": "Nichts. Also, wirklich gar nichts. Es gibt eine Spendenbox, da kann jeder was reinwerfen, wenn er möchte. Davon kaufen wir Werkzeug und Kaffee. Nur die Ersatzteile, die muss man selbst bezahlen, wenn wir welche brauchen."
}
],
"text": "Und hier bei mir im Studio sitzt jetzt Kemal Aydın. Hallo, Herr Aydın, schön, dass Sie da sind! – Hallo, ich freu mich auch. – Sie haben in Witten ein Repair-Café gegründet. Erklären Sie unseren Hörerinnen und Hörern doch mal kurz: Was ist das eigentlich? – Ja, gerne. Also, ganz einfach: Die Leute bringen kaputte Sachen mit. Einen Toaster, eine Lampe, ein Fahrrad, eine Hose mit Loch … und wir versuchen, das zusammen zu reparieren. Und das ist wichtig: zusammen. Wir machen das nicht einfach für die Leute, die sitzen mit am Tisch und schauen zu. Oder sie machen selbst mit. – Und wie sind Sie auf die Idee gekommen? – Ach, das war eigentlich Zufall. Ich war über dreißig Jahre Elektriker, bei den Stadtwerken. Und als ich dann in Rente gegangen bin, da, ähm … da hatte ich plötzlich so viel Zeit. Meine Frau hat gesagt: Kemal, du kannst nicht den ganzen Tag im Keller sitzen! Und dann hab ich in der Zeitung von einem Repair-Café in Köln gelesen. Und ich dachte: So was gibt's in Witten noch nicht. Das mach ich. – Und wo treffen Sie sich? – Im Gemeindehaus von der evangelischen Kirche, in der Nähe vom Rathaus. Jeden ersten Samstag im Monat, von zehn bis eins. Am Anfang waren wir in einem kleinen Raum im Jugendzentrum, aber der war viel zu eng. – Was kostet denn so eine Reparatur bei Ihnen? – Nichts. Also, wirklich gar nichts. Es gibt eine Spendenbox, da kann jeder was reinwerfen, wenn er möchte. Davon kaufen wir Werkzeug und Kaffee. Nur die Ersatzteile, die muss man selbst bezahlen, wenn wir welche brauchen.",
"questions": [
{
"q": "Die Besucher geben ihre Sachen ab und holen sie später repariert wieder ab.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Herr Aydın sagt: „Wir machen das nicht einfach für die Leute, die sitzen mit am Tisch.“ Man repariert zusammen."
},
{
"q": "Herr Aydın hat früher als Elektriker gearbeitet.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Ich war über dreißig Jahre Elektriker, bei den Stadtwerken.“"
},
{
"q": "Die Idee für das Repair-Café hatte seine Frau.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Seine Frau wollte nur nicht, dass er den ganzen Tag im Keller sitzt. Die Idee kam aus der Zeitung: Er hat von einem Repair-Café in Köln gelesen."
},
{
"q": "Das Repair-Café findet einmal im Monat statt.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Es ist „jeden ersten Samstag im Monat, von zehn bis eins“."
},
{
"q": "Die Besucher müssen nichts bezahlen, auch nicht für Ersatzteile.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Die Reparatur ist kostenlos, aber: „Nur die Ersatzteile, die muss man selbst bezahlen.“"
}
]
},
{
"id": "telcb1-1-03",
"teil": "Teil 2",
"type": "Radiointerview",
"situation": "Das Interview mit Kemal Aydın geht weiter. Zweiter Teil.",
"segments": [
{
"voice": "f1",
"text": "Sie machen das ja nicht allein. Wer hilft denn bei Ihnen mit?"
},
{
"voice": "m2",
"text": "Inzwischen sind wir zwölf Leute. Da ist eine Schneiderin dabei, Frau Petrenko, die kommt aus der Ukraine und kann wirklich alles nähen. Dann zwei Studenten von der Uni, die kennen sich mit Handys und Laptops aus. Davon hab ich ehrlich gesagt keine Ahnung. Und die Fahrräder, die macht Herr Schulte. Der ist schon über achtzig, aber topfit."
},
{
"voice": "f1",
"text": "Über achtzig, toll! Und klappt denn jede Reparatur?"
},
{
"voice": "m2",
"text": "Nee, leider nicht. Ich würde sagen, so zwei Drittel schaffen wir. Manchmal fehlt ein Teil, manchmal ist ein Gerät so gebaut, dass man es gar nicht aufmachen kann. Also, das ärgert mich wirklich. Das machen manche Firmen ja mit Absicht."
},
{
"voice": "f1",
"text": "Was war denn Ihre schönste Reparatur?"
},
{
"voice": "m2",
"text": "Oh, da gab's einige. Aber ich erinnere mich an eine ältere Dame, die kam mit einem Radio. Das war noch von ihrem Vater, aus den Sechzigerjahren, und es lief seit Jahren nicht mehr. Wir haben zwei Stunden gesucht, und am Ende war's nur ein loses Kabel. Und als dann die Musik lief … da hat sie geweint. Ja. Das vergisst man nicht."
},
{
"voice": "f1",
"text": "Und wenn jetzt jemand zuhört und denkt: Da möchte ich mitmachen, als Helfer?"
},
{
"voice": "m2",
"text": "Sehr gerne! Wir suchen vor allem Leute, die nähen können, weil Frau Petrenko nicht jedes Mal Zeit hat. Man muss kein Profi sein. Einfach am ersten Samstag vorbeikommen. Oder vorher eine Mail schreiben, die Adresse steht auf unserer Internetseite."
},
{
"voice": "f1",
"text": "Herr Aydın, vielen Dank für den Besuch bei uns!"
},
{
"voice": "m2",
"text": "Ich danke Ihnen."
}
],
"text": "Sie machen das ja nicht allein. Wer hilft denn bei Ihnen mit? – Inzwischen sind wir zwölf Leute. Da ist eine Schneiderin dabei, Frau Petrenko, die kommt aus der Ukraine und kann wirklich alles nähen. Dann zwei Studenten von der Uni, die kennen sich mit Handys und Laptops aus. Davon hab ich ehrlich gesagt keine Ahnung. Und die Fahrräder, die macht Herr Schulte. Der ist schon über achtzig, aber topfit. – Über achtzig, toll! Und klappt denn jede Reparatur? – Nee, leider nicht. Ich würde sagen, so zwei Drittel schaffen wir. Manchmal fehlt ein Teil, manchmal ist ein Gerät so gebaut, dass man es gar nicht aufmachen kann. Also, das ärgert mich wirklich. Das machen manche Firmen ja mit Absicht. – Was war denn Ihre schönste Reparatur? – Oh, da gab's einige. Aber ich erinnere mich an eine ältere Dame, die kam mit einem Radio. Das war noch von ihrem Vater, aus den Sechzigerjahren, und es lief seit Jahren nicht mehr. Wir haben zwei Stunden gesucht, und am Ende war's nur ein loses Kabel. Und als dann die Musik lief … da hat sie geweint. Ja. Das vergisst man nicht. – Und wenn jetzt jemand zuhört und denkt: Da möchte ich mitmachen, als Helfer? – Sehr gerne! Wir suchen vor allem Leute, die nähen können, weil Frau Petrenko nicht jedes Mal Zeit hat. Man muss kein Profi sein. Einfach am ersten Samstag vorbeikommen. Oder vorher eine Mail schreiben, die Adresse steht auf unserer Internetseite. – Herr Aydın, vielen Dank für den Besuch bei uns! – Ich danke Ihnen.",
"questions": [
{
"q": "Im Team gibt es Studenten, die sich mit Handys und Laptops auskennen.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Dann zwei Studenten von der Uni, die kennen sich mit Handys und Laptops aus.“"
},
{
"q": "Fast alle Reparaturen sind erfolgreich.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "„Nee, leider nicht.“ Sie schaffen nur ungefähr zwei Drittel."
},
{
"q": "Herr Aydın ärgert sich über Geräte, die man nicht öffnen kann.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Er sagt über diese Geräte: „Also, das ärgert mich wirklich.“"
},
{
"q": "In das alte Radio musste ein teures Ersatzteil eingebaut werden.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Das Problem war „nur ein loses Kabel“. Ein Ersatzteil war nicht nötig."
},
{
"q": "Neue Helfer müssen eine handwerkliche Ausbildung haben.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Herr Aydın sagt: „Man muss kein Profi sein.“"
}
]
},
{
"id": "telcb1-1-04",
"teil": "Teil 3",
"type": "Anrufbeantworter",
"situation": "Du hörst eine Nachricht auf deinem Anrufbeantworter.",
"segments": [
{
"voice": "f3",
"text": "Hallo, Frau Mansouri, hier ist Tanja vom Sportpark Herne. Sie haben sich ja für den Schwimmkurs für Erwachsene angemeldet, der am Dienstag anfangen sollte. Den müssen wir leider um eine Woche verschieben, weil im Hallenbad gerade die Lüftung repariert wird. Also, der erste Termin ist jetzt Dienstag, der vierzehnte, gleiche Uhrzeit, um halb acht abends. Die Kursgebühr bezahlen Sie dann einfach beim ersten Termin, bar oder mit Karte. Bis dann, tschüss!"
}
],
"text": "Hallo, Frau Mansouri, hier ist Tanja vom Sportpark Herne. Sie haben sich ja für den Schwimmkurs für Erwachsene angemeldet, der am Dienstag anfangen sollte. Den müssen wir leider um eine Woche verschieben, weil im Hallenbad gerade die Lüftung repariert wird. Also, der erste Termin ist jetzt Dienstag, der vierzehnte, gleiche Uhrzeit, um halb acht abends. Die Kursgebühr bezahlen Sie dann einfach beim ersten Termin, bar oder mit Karte. Bis dann, tschüss!",
"questions": [
{
"q": "Der Schwimmkurs beginnt eine Woche später als geplant.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Tanja sagt: „Den müssen wir leider um eine Woche verschieben.“ Die Uhrzeit bleibt gleich."
}
]
},
{
"id": "telcb1-1-05",
"teil": "Teil 3",
"type": "Durchsage am Bahnhof",
"situation": "Du stehst am Hauptbahnhof in Bochum und willst nach Dortmund fahren.",
"segments": [
{
"voice": "f1",
"text": "Achtung an Gleis vier: Die S-Bahn S eins nach Dortmund Hauptbahnhof, planmäßige Abfahrt sechzehn Uhr dreiundzwanzig, fällt heute aus. Fahrgäste nach Dortmund nehmen bitte den Regionalexpress um sechzehn Uhr einunddreißig von Gleis sechs. Der Regionalexpress hält heute zusätzlich in Bochum-Langendreer. Wir bitten um Entschuldigung."
}
],
"text": "Achtung an Gleis vier: Die S-Bahn S eins nach Dortmund Hauptbahnhof, planmäßige Abfahrt sechzehn Uhr dreiundzwanzig, fällt heute aus. Fahrgäste nach Dortmund nehmen bitte den Regionalexpress um sechzehn Uhr einunddreißig von Gleis sechs. Der Regionalexpress hält heute zusätzlich in Bochum-Langendreer. Wir bitten um Entschuldigung.",
"questions": [
{
"q": "Fahrgäste nach Dortmund sollen auf die nächste S-Bahn warten.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Die S-Bahn fällt aus. Fahrgäste sollen „den Regionalexpress um sechzehn Uhr einunddreißig von Gleis sechs“ nehmen."
}
]
},
{
"id": "telcb1-1-06",
"teil": "Teil 3",
"type": "Durchsage im Baumarkt",
"situation": "Du kaufst in einem Baumarkt in Oberhausen ein. Dein Auto steht auf dem Parkplatz hinter dem Markt.",
"segments": [
{
"voice": "m3",
"text": "Liebe Kundinnen und Kunden, nur noch heute: In unserer Gartenabteilung bekommen Sie alle Blumenzwiebeln zum halben Preis. Und eine Bitte an alle, die mit dem Auto da sind: Der Parkplatz hinter dem Markt wird heute schon um achtzehn Uhr geschlossen. Bitte fahren Sie Ihr Fahrzeug bis dahin heraus. Der Parkplatz vor dem Eingang bleibt wie immer bis zweiundzwanzig Uhr geöffnet. Vielen Dank für Ihren Einkauf."
}
],
"text": "Liebe Kundinnen und Kunden, nur noch heute: In unserer Gartenabteilung bekommen Sie alle Blumenzwiebeln zum halben Preis. Und eine Bitte an alle, die mit dem Auto da sind: Der Parkplatz hinter dem Markt wird heute schon um achtzehn Uhr geschlossen. Bitte fahren Sie Ihr Fahrzeug bis dahin heraus. Der Parkplatz vor dem Eingang bleibt wie immer bis zweiundzwanzig Uhr geöffnet. Vielen Dank für Ihren Einkauf.",
"questions": [
{
"q": "Du musst dein Auto vor achtzehn Uhr vom Parkplatz holen.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Dein Auto steht hinter dem Markt, und dieser Parkplatz „wird heute schon um achtzehn Uhr geschlossen“. Bis zweiundzwanzig Uhr ist nur der Parkplatz vor dem Eingang offen."
}
]
},
{
"id": "telcb1-1-07",
"teil": "Teil 3",
"type": "Telefonansage",
"situation": "Du rufst beim Bürgerbüro in Recklinghausen an, weil du einen neuen Personalausweis abholen möchtest.",
"segments": [
{
"voice": "m2",
"text": "Guten Tag. Sie sind verbunden mit dem Bürgerbüro der Stadt Recklinghausen. Leider rufen Sie außerhalb unserer Öffnungszeiten an. Wir sind montags bis freitags von acht bis zwölf Uhr für Sie da, donnerstags zusätzlich von vierzehn bis achtzehn Uhr. Für einen neuen Personalausweis oder Reisepass brauchen Sie einen Termin. Den buchen Sie bitte online auf unserer Internetseite. Wenn Sie ein fertiges Dokument abholen möchten, brauchen Sie keinen Termin. Vielen Dank für Ihren Anruf."
}
],
"text": "Guten Tag. Sie sind verbunden mit dem Bürgerbüro der Stadt Recklinghausen. Leider rufen Sie außerhalb unserer Öffnungszeiten an. Wir sind montags bis freitags von acht bis zwölf Uhr für Sie da, donnerstags zusätzlich von vierzehn bis achtzehn Uhr. Für einen neuen Personalausweis oder Reisepass brauchen Sie einen Termin. Den buchen Sie bitte online auf unserer Internetseite. Wenn Sie ein fertiges Dokument abholen möchten, brauchen Sie keinen Termin. Vielen Dank für Ihren Anruf.",
"questions": [
{
"q": "Du brauchst einen Termin, um deinen Ausweis abzuholen.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Einen Termin braucht man nur für den Antrag. Für die Abholung gilt: „brauchen Sie keinen Termin“."
}
]
},
{
"id": "telcb1-1-08",
"teil": "Teil 3",
"type": "Verkehrsfunk",
"situation": "Du fährst mit dem Auto auf der A vierzig von Duisburg nach Essen.",
"segments": [
{
"voice": "f2",
"text": "Und jetzt der Verkehr. Auf der A vierzig zwischen Essen-Frohnhausen und Essen-Zentrum ist nach einem Unfall die linke Spur gesperrt. Die rechte Spur ist frei, dort staut es sich aber auf sechs Kilometern. Auf der A zweiundvierzig in Richtung Dortmund ist die Ausfahrt Bottrop-Süd ab heute Abend bis Montag früh wegen Bauarbeiten gesperrt. Eine Umleitung ist ausgeschildert. Kommen Sie gut an!"
}
],
"text": "Und jetzt der Verkehr. Auf der A vierzig zwischen Essen-Frohnhausen und Essen-Zentrum ist nach einem Unfall die linke Spur gesperrt. Die rechte Spur ist frei, dort staut es sich aber auf sechs Kilometern. Auf der A zweiundvierzig in Richtung Dortmund ist die Ausfahrt Bottrop-Süd ab heute Abend bis Montag früh wegen Bauarbeiten gesperrt. Eine Umleitung ist ausgeschildert. Kommen Sie gut an!",
"questions": [
{
"q": "Die A vierzig ist bei Essen komplett gesperrt.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Nur „die linke Spur“ ist gesperrt. „Die rechte Spur ist frei“, aber es gibt Stau."
}
]
}
]
},
"telcb1-2": {
"title": "telc B1 Hören · Übungssatz 2",
"level": "B1",
"exam": "telc B1",
"intro": "Der zweite Durchgang im telc-Format: Nachrichten aus dem Ruhrgebiet, ein Gespräch mit einer Straßenbahnfahrerin und fünf kurze Ansagen. Lies vor dem Hören immer zuerst die Aussagen. Achte darauf, ob etwas geändert oder verneint wird.",
"group": "telcb1",
"items": [
{
"id": "telcb1-2-01",
"teil": "Teil 1",
"type": "Radionachrichten",
"situation": "Du hörst die Nachrichten im Radio. Es gibt fünf Meldungen. Zu jeder Meldung gibt es eine Aussage.",
"segments": [
{
"voice": "f1",
"text": "Sie hören Radio Emscherland. Die Nachrichten um siebzehn Uhr. Die Stadtbibliothek in Gelsenkirchen öffnet ab dem nächsten Monat auch sonntags, und zwar von elf bis sechzehn Uhr. Eine Beratung gibt es am Sonntag nicht, Bücher ausleihen und zurückgeben kann man aber an den Automaten. Die Stadt möchte damit vor allem Familien und Berufstätige erreichen. In Hagen bleibt die Brücke über die Volme an der Badstraße weiter gesperrt, allerdings nur für Autos und Lastwagen. Bei einer Prüfung haben Fachleute Schäden am Beton gefunden. Fußgänger und Radfahrer dürfen die Brücke weiter benutzen. Die Reparatur dauert voraussichtlich bis zum Ende des Jahres. In Nordrhein-Westfalen gibt es in diesem Jahr etwas mehr Ausbildungsplätze als im letzten Jahr. Trotzdem sind noch viele Stellen frei, besonders im Handwerk und in der Gastronomie. Die Agentur für Arbeit rät Jugendlichen ohne Ausbildungsplatz, sich auch jetzt noch zu bewerben. Viele Betriebe stellen auch nach dem ersten September noch ein. In Moers sucht ein Verein für Igelschutz dringend Helferinnen und Helfer. Wegen des warmen Herbstes sind viele junge Igel noch zu klein für den Winterschlaf. Die Freiwilligen sollen die Tiere füttern und versorgen. Wer einen kleinen Igel findet, soll ihn aber nicht einfach mitnehmen, sondern zuerst beim Verein anrufen. Das Wetter: In der Nacht wird es frostig, bis minus drei Grad. Vor allem auf dem Land kann es auf den Straßen glatt werden. Morgen bleibt es trocken und sonnig, aber kalt, mit höchstens fünf Grad."
}
],
"text": "Sie hören Radio Emscherland. Die Nachrichten um siebzehn Uhr. Die Stadtbibliothek in Gelsenkirchen öffnet ab dem nächsten Monat auch sonntags, und zwar von elf bis sechzehn Uhr. Eine Beratung gibt es am Sonntag nicht, Bücher ausleihen und zurückgeben kann man aber an den Automaten. Die Stadt möchte damit vor allem Familien und Berufstätige erreichen. In Hagen bleibt die Brücke über die Volme an der Badstraße weiter gesperrt, allerdings nur für Autos und Lastwagen. Bei einer Prüfung haben Fachleute Schäden am Beton gefunden. Fußgänger und Radfahrer dürfen die Brücke weiter benutzen. Die Reparatur dauert voraussichtlich bis zum Ende des Jahres. In Nordrhein-Westfalen gibt es in diesem Jahr etwas mehr Ausbildungsplätze als im letzten Jahr. Trotzdem sind noch viele Stellen frei, besonders im Handwerk und in der Gastronomie. Die Agentur für Arbeit rät Jugendlichen ohne Ausbildungsplatz, sich auch jetzt noch zu bewerben. Viele Betriebe stellen auch nach dem ersten September noch ein. In Moers sucht ein Verein für Igelschutz dringend Helferinnen und Helfer. Wegen des warmen Herbstes sind viele junge Igel noch zu klein für den Winterschlaf. Die Freiwilligen sollen die Tiere füttern und versorgen. Wer einen kleinen Igel findet, soll ihn aber nicht einfach mitnehmen, sondern zuerst beim Verein anrufen. Das Wetter: In der Nacht wird es frostig, bis minus drei Grad. Vor allem auf dem Land kann es auf den Straßen glatt werden. Morgen bleibt es trocken und sonnig, aber kalt, mit höchstens fünf Grad.",
"questions": [
{
"q": "Meldung 1: Die Bibliothek in Gelsenkirchen ist bald auch am Sonntag geöffnet.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Sie „öffnet ab dem nächsten Monat auch sonntags“, von elf bis sechzehn Uhr."
},
{
"q": "Meldung 2: Die Brücke in Hagen ist für alle gesperrt.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie ist „nur für Autos und Lastwagen“ gesperrt. Fußgänger und Radfahrer dürfen sie weiter benutzen."
},
{
"q": "Meldung 3: Im Handwerk sind alle Ausbildungsplätze besetzt.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Es sind „noch viele Stellen frei, besonders im Handwerk und in der Gastronomie“."
},
{
"q": "Meldung 4: Der Verein in Moers sucht Menschen, die sich um junge Igel kümmern.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Der Verein „sucht dringend Helferinnen und Helfer“, die die Tiere füttern und versorgen."
},
{
"q": "Meldung 5: In der Nacht können die Straßen glatt werden.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Vor allem auf dem Land kann es auf den Straßen glatt werden.“"
}
]
},
{
"id": "telcb1-2-02",
"teil": "Teil 2",
"type": "Radiointerview",
"situation": "In der Radioreihe „Neu im Job“ spricht Moderator Thomas Berger mit Amira Haddad. Sie fährt Straßenbahn in Essen. Erster Teil.",
"segments": [
{
"voice": "m1",
"text": "In unserer Reihe „Neu im Job“ bin ich heute mit Amira Haddad verbunden. Frau Haddad, Sie fahren seit einem halben Jahr Straßenbahn in Essen. Hallo!"
},
{
"voice": "f2",
"text": "Hallo, guten Tag!"
},
{
"voice": "m1",
"text": "Was haben Sie denn vorher gemacht?"
},
{
"voice": "f2",
"text": "Also, in Syrien war ich Grundschullehrerin, fast acht Jahre lang. Hier in Deutschland ging das nicht so einfach, weil mein Studium nur zum Teil anerkannt wurde. Ich hätte noch mal zwei Jahre studieren müssen. Und, na ja, mit zwei Kindern … das war für mich keine Option."
},
{
"voice": "m1",
"text": "Und wie sind Sie dann auf die Straßenbahn gekommen?"
},
{
"voice": "f2",
"text": "Das war tatsächlich in meinem Deutschkurs. Da kam jemand von den Verkehrsbetrieben und hat erzählt, dass sie dringend Fahrerinnen und Fahrer suchen. Und dass man während der Ausbildung schon Geld bekommt. Ich hab erst gelacht, ehrlich! Ich hatte ja nicht mal einen Führerschein. Aber den braucht man für die Straßenbahn gar nicht."
},
{
"voice": "m1",
"text": "Echt? Das wusste ich auch nicht."
},
{
"voice": "f2",
"text": "Ja, das wissen viele nicht. Für den Bus braucht man natürlich einen, aber für die Bahn nicht."
},
{
"voice": "m1",
"text": "Und wie lange hat die Ausbildung gedauert?"
},
{
"voice": "f2",
"text": "Sechs Monate, mit Theorie und Praxis. Die Theorie war schwer, so viele Fachwörter: Signale, Weichen, Technik … Ich hab abends mit meinem Sohn gelernt. Der hat mich immer abgefragt."
}
],
"text": "In unserer Reihe „Neu im Job“ bin ich heute mit Amira Haddad verbunden. Frau Haddad, Sie fahren seit einem halben Jahr Straßenbahn in Essen. Hallo! – Hallo, guten Tag! – Was haben Sie denn vorher gemacht? – Also, in Syrien war ich Grundschullehrerin, fast acht Jahre lang. Hier in Deutschland ging das nicht so einfach, weil mein Studium nur zum Teil anerkannt wurde. Ich hätte noch mal zwei Jahre studieren müssen. Und, na ja, mit zwei Kindern … das war für mich keine Option. – Und wie sind Sie dann auf die Straßenbahn gekommen? – Das war tatsächlich in meinem Deutschkurs. Da kam jemand von den Verkehrsbetrieben und hat erzählt, dass sie dringend Fahrerinnen und Fahrer suchen. Und dass man während der Ausbildung schon Geld bekommt. Ich hab erst gelacht, ehrlich! Ich hatte ja nicht mal einen Führerschein. Aber den braucht man für die Straßenbahn gar nicht. – Echt? Das wusste ich auch nicht. – Ja, das wissen viele nicht. Für den Bus braucht man natürlich einen, aber für die Bahn nicht. – Und wie lange hat die Ausbildung gedauert? – Sechs Monate, mit Theorie und Praxis. Die Theorie war schwer, so viele Fachwörter: Signale, Weichen, Technik … Ich hab abends mit meinem Sohn gelernt. Der hat mich immer abgefragt.",
"questions": [
{
"q": "Frau Haddad hat in Syrien als Lehrerin gearbeitet.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„In Syrien war ich Grundschullehrerin, fast acht Jahre lang.“"
},
{
"q": "Ihr Studium wurde in Deutschland vollständig anerkannt.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Es wurde „nur zum Teil anerkannt“. Sie hätte noch zwei Jahre studieren müssen."
},
{
"q": "Von der Arbeit bei den Verkehrsbetrieben hat sie in ihrem Deutschkurs erfahren.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Das war tatsächlich in meinem Deutschkurs. Da kam jemand von den Verkehrsbetrieben.“"
},
{
"q": "Für die Arbeit in der Straßenbahn braucht man einen Autoführerschein.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Frau Haddad sagt: „Aber den braucht man für die Straßenbahn gar nicht.“ Nur für den Bus braucht man einen."
},
{
"q": "Die Ausbildung hat ein Jahr gedauert.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Die Ausbildung dauerte „sechs Monate, mit Theorie und Praxis“."
}
]
},
{
"id": "telcb1-2-03",
"teil": "Teil 2",
"type": "Radiointerview",
"situation": "Das Gespräch mit Amira Haddad geht weiter. Zweiter Teil.",
"segments": [
{
"voice": "m1",
"text": "Und jetzt, nach einem halben Jahr: Wie ist der Alltag?"
},
{
"voice": "f2",
"text": "Gut! Wirklich. Ich fahre meistens die Linie hundertsieben, von Gelsenkirchen bis nach Bredeney. Der Schichtdienst ist manchmal anstrengend, besonders die Frühschicht. Da fange ich schon um Viertel nach vier an. Aber mein Mann arbeitet im Büro, und wir planen das gut mit den Kindern."
},
{
"voice": "m1",
"text": "Wie reagieren denn die Fahrgäste?"
},
{
"voice": "f2",
"text": "Meistens freundlich. Manchmal sagt ein älterer Herr: Oh, heute fährt ja eine Frau! Aber das ist nett gemeint, glaube ich. Schwierig ist eher der Verkehr. Autos, die auf den Schienen stehen, oder Leute, die mit dem Handy über die Straße laufen, ohne zu gucken. Da muss man immer, immer aufpassen."
},
{
"voice": "m1",
"text": "Vermissen Sie die Schule manchmal?"
},
{
"voice": "f2",
"text": "Ja, ehrlich gesagt schon. Die Kinder, das Unterrichten … Aber wissen Sie, ich hab jetzt einen sicheren Arbeitsplatz, einen unbefristeten Vertrag, und ich verdiene mein eigenes Geld. Das war mir wichtig. Und vielleicht, irgendwann später, mache ich die Anerkennung als Lehrerin doch noch. Mal sehen."
},
{
"voice": "m1",
"text": "Was raten Sie Leuten, die auch über so einen Wechsel nachdenken?"
},
{
"voice": "f2",
"text": "Einfach fragen! Die Verkehrsbetriebe machen jeden Monat einen Infoabend, da kann man auch mal im Fahrsimulator sitzen. Und keine Angst vor der Sprache. Ich hatte am Anfang B eins, und das hat gereicht. Man lernt im Job sehr viel dazu."
},
{
"voice": "m1",
"text": "Frau Haddad, vielen Dank, und weiterhin gute Fahrt!"
},
{
"voice": "f2",
"text": "Danke schön! Tschüss!"
}
],
"text": "Und jetzt, nach einem halben Jahr: Wie ist der Alltag? – Gut! Wirklich. Ich fahre meistens die Linie hundertsieben, von Gelsenkirchen bis nach Bredeney. Der Schichtdienst ist manchmal anstrengend, besonders die Frühschicht. Da fange ich schon um Viertel nach vier an. Aber mein Mann arbeitet im Büro, und wir planen das gut mit den Kindern. – Wie reagieren denn die Fahrgäste? – Meistens freundlich. Manchmal sagt ein älterer Herr: Oh, heute fährt ja eine Frau! Aber das ist nett gemeint, glaube ich. Schwierig ist eher der Verkehr. Autos, die auf den Schienen stehen, oder Leute, die mit dem Handy über die Straße laufen, ohne zu gucken. Da muss man immer, immer aufpassen. – Vermissen Sie die Schule manchmal? – Ja, ehrlich gesagt schon. Die Kinder, das Unterrichten … Aber wissen Sie, ich hab jetzt einen sicheren Arbeitsplatz, einen unbefristeten Vertrag, und ich verdiene mein eigenes Geld. Das war mir wichtig. Und vielleicht, irgendwann später, mache ich die Anerkennung als Lehrerin doch noch. Mal sehen. – Was raten Sie Leuten, die auch über so einen Wechsel nachdenken? – Einfach fragen! Die Verkehrsbetriebe machen jeden Monat einen Infoabend, da kann man auch mal im Fahrsimulator sitzen. Und keine Angst vor der Sprache. Ich hatte am Anfang B eins, und das hat gereicht. Man lernt im Job sehr viel dazu. – Frau Haddad, vielen Dank, und weiterhin gute Fahrt! – Danke schön! Tschüss!",
"questions": [
{
"q": "Bei der Frühschicht fängt Frau Haddad vor fünf Uhr an.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Sie fängt „schon um Viertel nach vier“ an, also vor fünf Uhr."
},
{
"q": "Die Fahrgäste sind oft unfreundlich zu ihr.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie sagt: „Meistens freundlich.“ Sogar der Satz des älteren Herrn ist „nett gemeint“."
},
{
"q": "Frau Haddad findet den Straßenverkehr manchmal schwierig.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Schwierig ist eher der Verkehr“, zum Beispiel Autos auf den Schienen."
},
{
"q": "Sie möchte vielleicht später doch noch als Lehrerin anerkannt werden.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„Vielleicht, irgendwann später, mache ich die Anerkennung als Lehrerin doch noch.“"
},
{
"q": "Frau Haddad meint, dass man für den Job sehr gute Deutschkenntnisse braucht.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Sie sagt: „Keine Angst vor der Sprache. Ich hatte am Anfang B eins, und das hat gereicht.“"
}
]
},
{
"id": "telcb1-2-04",
"teil": "Teil 3",
"type": "Anrufbeantworter",
"situation": "Du hörst eine Nachricht von der Autowerkstatt.",
"segments": [
{
"voice": "m3",
"text": "Ja, hallo, Herr Kowalczyk, hier ist das Autohaus Brenner in Bottrop, Werkstatt, Meier am Apparat. Ihr Wagen ist fertig. Die Bremsen waren in Ordnung, wir haben nur die Reifen gewechselt und die Inspektion gemacht. Sie können das Auto heute bis achtzehn Uhr abholen. Morgen ist ja Samstag, da haben wir nur bis zwölf Uhr auf. Den Schlüssel bekommen Sie bei uns an der Kasse. Schönen Tag noch!"
}
],
"text": "Ja, hallo, Herr Kowalczyk, hier ist das Autohaus Brenner in Bottrop, Werkstatt, Meier am Apparat. Ihr Wagen ist fertig. Die Bremsen waren in Ordnung, wir haben nur die Reifen gewechselt und die Inspektion gemacht. Sie können das Auto heute bis achtzehn Uhr abholen. Morgen ist ja Samstag, da haben wir nur bis zwölf Uhr auf. Den Schlüssel bekommen Sie bei uns an der Kasse. Schönen Tag noch!",
"questions": [
{
"q": "Herr Kowalczyk kann sein Auto am Samstag nicht abholen.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Am Samstag ist die Werkstatt „nur bis zwölf Uhr“ offen. Vormittags kann er das Auto also abholen."
}
]
},
{
"id": "telcb1-2-05",
"teil": "Teil 3",
"type": "Durchsage im Einkaufszentrum",
"situation": "Du bist in einem Einkaufszentrum in Mülheim an der Ruhr.",
"segments": [
{
"voice": "f3",
"text": "Liebe Besucherinnen und Besucher, der kleine Yusuf, fünf Jahre alt, sucht seine Mama. Yusuf trägt eine rote Jacke und eine blaue Mütze. Er wartet jetzt an der Information im Erdgeschoss, direkt neben dem Haupteingang. Die Mutter von Yusuf wird gebeten, bitte sofort zur Information im Erdgeschoss zu kommen. Vielen Dank."
}
],
"text": "Liebe Besucherinnen und Besucher, der kleine Yusuf, fünf Jahre alt, sucht seine Mama. Yusuf trägt eine rote Jacke und eine blaue Mütze. Er wartet jetzt an der Information im Erdgeschoss, direkt neben dem Haupteingang. Die Mutter von Yusuf wird gebeten, bitte sofort zur Information im Erdgeschoss zu kommen. Vielen Dank.",
"questions": [
{
"q": "Die Mutter soll zur Information im Erdgeschoss kommen.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Die Mutter „wird gebeten, bitte sofort zur Information im Erdgeschoss zu kommen“."
}
]
},
{
"id": "telcb1-2-06",
"teil": "Teil 3",
"type": "Durchsage im Zug",
"situation": "Du sitzt im Regionalexpress und möchtest nach Köln fahren.",
"segments": [
{
"voice": "f1",
"text": "Meine Damen und Herren, in wenigen Minuten erreichen wir Duisburg Hauptbahnhof. Wegen einer Störung an der Strecke endet dieser Zug heute leider in Duisburg. Reisende nach Düsseldorf und Köln steigen bitte in den Regionalexpress um, der auf dem gegenüberliegenden Gleis wartet. Ihre Fahrkarten bleiben gültig. Wir bitten um Entschuldigung."
}
],
"text": "Meine Damen und Herren, in wenigen Minuten erreichen wir Duisburg Hauptbahnhof. Wegen einer Störung an der Strecke endet dieser Zug heute leider in Duisburg. Reisende nach Düsseldorf und Köln steigen bitte in den Regionalexpress um, der auf dem gegenüberliegenden Gleis wartet. Ihre Fahrkarten bleiben gültig. Wir bitten um Entschuldigung.",
"questions": [
{
"q": "Der Zug fährt heute weiter bis Köln.",
"options": [
"richtig",
"falsch"
],
"answer": 1,
"why": "Der Zug „endet … heute leider in Duisburg“. Nach Köln musst du umsteigen."
}
]
},
{
"id": "telcb1-2-07",
"teil": "Teil 3",
"type": "Anrufbeantworter",
"situation": "Deine Freundin Bea hat dir eine Nachricht hinterlassen.",
"segments": [
{
"voice": "f2",
"text": "Hi Olena, ich bin's, Bea! Du, wegen Samstag: Das Grillen bei uns im Garten fällt leider ins Wasser … also, wörtlich, es soll ja den ganzen Tag regnen. Wir feiern stattdessen bei Marco in der Wohnung, der hat doch so ein großes Wohnzimmer. Gleiche Zeit, um sieben. Und du musst keinen Salat mehr mitbringen, den macht jetzt Marco. Bring einfach was zu trinken mit, okay? Wenn was ist, ruf mich an. Ciao!"
}
],
"text": "Hi Olena, ich bin's, Bea! Du, wegen Samstag: Das Grillen bei uns im Garten fällt leider ins Wasser … also, wörtlich, es soll ja den ganzen Tag regnen. Wir feiern stattdessen bei Marco in der Wohnung, der hat doch so ein großes Wohnzimmer. Gleiche Zeit, um sieben. Und du musst keinen Salat mehr mitbringen, den macht jetzt Marco. Bring einfach was zu trinken mit, okay? Wenn was ist, ruf mich an. Ciao!",
"questions": [
{
"q": "Die Feier findet zur gleichen Zeit statt, aber an einem anderen Ort.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "Sie feiern „bei Marco in der Wohnung“ statt im Garten, und zwar zur „gleichen Zeit, um sieben“."
}
]
},
{
"id": "telcb1-2-08",
"teil": "Teil 3",
"type": "Telefonansage",
"situation": "Du rufst bei deiner Hausarztpraxis in Unna an.",
"segments": [
{
"voice": "m1",
"text": "Guten Tag, Sie sind verbunden mit der Praxis Doktor Okonkwo. Unsere Praxis ist vom zwanzigsten bis zum einunddreißigsten Oktober wegen Urlaub geschlossen. In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, die Praxis Doktor Lindner in der Hauptstraße zwölf, hier in Unna. Nachts und am Wochenende erreichen Sie den ärztlichen Bereitschaftsdienst unter der Nummer eins eins sechs, eins eins sieben. Ab dem dritten November sind wir wieder für Sie da."
}
],
"text": "Guten Tag, Sie sind verbunden mit der Praxis Doktor Okonkwo. Unsere Praxis ist vom zwanzigsten bis zum einunddreißigsten Oktober wegen Urlaub geschlossen. In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, die Praxis Doktor Lindner in der Hauptstraße zwölf, hier in Unna. Nachts und am Wochenende erreichen Sie den ärztlichen Bereitschaftsdienst unter der Nummer eins eins sechs, eins eins sieben. Ab dem dritten November sind wir wieder für Sie da.",
"questions": [
{
"q": "In dringenden Fällen sollen die Patienten zur Praxis Doktor Lindner gehen.",
"options": [
"richtig",
"falsch"
],
"answer": 0,
"why": "„In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, die Praxis Doktor Lindner.“"
}
]
}
]
},
"dtbb1-1": {
"title": "DTB B1 Hören · Übungssatz 1",
"level": "B1 Beruf",
"exam": "DTB B1",
"intro": "Berufsalltag in Pflege, Handwerk, Hotel und Lager: Mailbox-Nachrichten von Kollegen und Kunden, Durchsagen im Betrieb, eine Übergabe an der Rezeption, ein Gespräch mit einer Kundin und eine Teambesprechung. Achte darauf, wer was tun soll und was sich geändert hat.",
"group": "dtbb1",
"items": [
{
"id": "dtbb1-1-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Du arbeitest in einem Seniorenheim in Hattingen. Deine Kollegin Svetlana hat dir, Dragan, eine Nachricht hinterlassen.",
"segments": [
{
"voice": "f2",
"text": "Hallo Dragan, hier ist Svetlana, aus der Frühschicht. Du, ich hab eine Bitte. Mein Sohn hat am Donnerstag eine kleine Operation, nichts Schlimmes, aber ich möchte ihn ins Krankenhaus begleiten. Könntest du am Donnerstag meine Frühschicht übernehmen? Ich würde dafür am Samstag deine Spätschicht machen. Mit Frau Weber von der Schichtleitung hab ich schon gesprochen, die ist einverstanden, wenn du auch ja sagst. Schreib mir einfach kurz eine Nachricht, bis heute Abend, ja? Danke dir!"
}
],
"text": "Hallo Dragan, hier ist Svetlana, aus der Frühschicht. Du, ich hab eine Bitte. Mein Sohn hat am Donnerstag eine kleine Operation, nichts Schlimmes, aber ich möchte ihn ins Krankenhaus begleiten. Könntest du am Donnerstag meine Frühschicht übernehmen? Ich würde dafür am Samstag deine Spätschicht machen. Mit Frau Weber von der Schichtleitung hab ich schon gesprochen, die ist einverstanden, wenn du auch ja sagst. Schreib mir einfach kurz eine Nachricht, bis heute Abend, ja? Danke dir!",
"questions": [
{
"q": "Was möchte Svetlana?",
"options": [
"Am Donnerstag frei haben, ohne eine Schicht zu tauschen.",
"Mit Dragan die Schicht tauschen.",
"Am Samstag frei haben."
],
"answer": 1,
"why": "Sie möchte, dass Dragan ihre Frühschicht am Donnerstag übernimmt, und macht dafür seine Spätschicht am Samstag. Das ist ein Tausch."
},
{
"q": "Was soll Dragan tun?",
"options": [
"Svetlana bis heute Abend eine Nachricht schreiben.",
"Frau Weber um Erlaubnis bitten.",
"Svetlana im Krankenhaus besuchen."
],
"answer": 0,
"why": "„Schreib mir einfach kurz eine Nachricht, bis heute Abend.“ Mit Frau Weber hat Svetlana schon gesprochen."
}
]
},
{
"id": "dtbb1-1-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Du arbeitest im Büro eines Malerbetriebs in Bochum. Ein Kunde hat auf die Mailbox gesprochen.",
"segments": [
{
"voice": "m2",
"text": "Ja, guten Tag, Krüger hier. Ich hatte bei Ihnen die Malerarbeiten für mein Büro in der Kortumstraße bestellt, für nächsten Mittwoch. Jetzt ist mir aufgefallen: Am Mittwoch ist bei uns Inventur, da geht's leider überhaupt nicht. Könnten Ihre Leute vielleicht schon am Montag kommen? Oder sonst erst am Freitag, das ginge auch. Und noch was: Die Wände sollen jetzt doch nicht weiß werden, sondern hellgrau, so wie auf dem Muster, das ich Ihrem Kollegen gezeigt habe. Rufen Sie mich bitte zurück, unter null zwei drei vier, neun sechs, fünfundzwanzig, achtzig. Danke schön."
}
],
"text": "Ja, guten Tag, Krüger hier. Ich hatte bei Ihnen die Malerarbeiten für mein Büro in der Kortumstraße bestellt, für nächsten Mittwoch. Jetzt ist mir aufgefallen: Am Mittwoch ist bei uns Inventur, da geht's leider überhaupt nicht. Könnten Ihre Leute vielleicht schon am Montag kommen? Oder sonst erst am Freitag, das ginge auch. Und noch was: Die Wände sollen jetzt doch nicht weiß werden, sondern hellgrau, so wie auf dem Muster, das ich Ihrem Kollegen gezeigt habe. Rufen Sie mich bitte zurück, unter null zwei drei vier, neun sechs, fünfundzwanzig, achtzig. Danke schön.",
"questions": [
{
"q": "Warum ruft Herr Krüger an?",
"options": [
"Er möchte den Auftrag absagen.",
"Er möchte einen anderen Termin.",
"Er beschwert sich über die Arbeit."
],
"answer": 1,
"why": "Am Mittwoch ist Inventur. Er fragt nach Montag oder Freitag. Den Auftrag will er nicht absagen."
},
{
"q": "Welche Farbe sollen die Wände bekommen?",
"options": [
"Weiß.",
"Hellgrau.",
"Das soll der Maler entscheiden."
],
"answer": 1,
"why": "„Die Wände sollen jetzt doch nicht weiß werden, sondern hellgrau.“"
}
]
},
{
"id": "dtbb1-1-03",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Herr Osei sucht eine Stelle im Lager. Eine Mitarbeiterin der Zeitarbeitsfirma ruft an.",
"segments": [
{
"voice": "f3",
"text": "Hallo, Herr Osei, Lisa Brandt hier, von Personal Plus in Dortmund. Ich hab gute Nachrichten für Sie: Die Firma Lagertechnik Sommer möchte Sie gerne kennenlernen. Das Vorstellungsgespräch wäre am Dienstag um zehn Uhr, direkt im Lager in Dortmund-Ellinghausen. Bringen Sie bitte Ihre Sicherheitsschuhe mit, denn nach dem Gespräch machen Sie gleich einen kleinen Probearbeitstag, so zwei, drei Stunden. Ihren Staplerschein müssen Sie nicht mitbringen, eine Kopie hab ich der Firma schon geschickt. Melden Sie sich bitte kurz, ob der Termin passt. Danke!"
}
],
"text": "Hallo, Herr Osei, Lisa Brandt hier, von Personal Plus in Dortmund. Ich hab gute Nachrichten für Sie: Die Firma Lagertechnik Sommer möchte Sie gerne kennenlernen. Das Vorstellungsgespräch wäre am Dienstag um zehn Uhr, direkt im Lager in Dortmund-Ellinghausen. Bringen Sie bitte Ihre Sicherheitsschuhe mit, denn nach dem Gespräch machen Sie gleich einen kleinen Probearbeitstag, so zwei, drei Stunden. Ihren Staplerschein müssen Sie nicht mitbringen, eine Kopie hab ich der Firma schon geschickt. Melden Sie sich bitte kurz, ob der Termin passt. Danke!",
"questions": [
{
"q": "Was soll Herr Osei zum Termin mitbringen?",
"options": [
"Seine Sicherheitsschuhe.",
"Seinen Staplerschein.",
"Eine Kopie seines Lebenslaufs."
],
"answer": 0,
"why": "„Bringen Sie bitte Ihre Sicherheitsschuhe mit.“ Den Staplerschein hat Frau Brandt schon geschickt."
}
]
},
{
"id": "dtbb1-1-04",
"teil": "Teil 2",
"type": "Durchsage im Betrieb",
"situation": "Du arbeitest in einer Fabrik in Gelsenkirchen in der Spätschicht. Normalerweise beginnt deine Schicht um vierzehn Uhr in Halle zwei.",
"segments": [
{
"voice": "m1",
"text": "Achtung, eine Durchsage für alle Mitarbeiterinnen und Mitarbeiter. Wegen eines technischen Problems an der Lüftung muss Halle zwei ab vierzehn Uhr leer sein. Die Spätschicht arbeitet heute deshalb in Halle drei und beginnt eine halbe Stunde später als sonst, also um halb drei. Die Schichtleiter treffen sich bitte schon um Viertel vor zwei im Besprechungsraum im ersten Stock. Vielen Dank."
}
],
"text": "Achtung, eine Durchsage für alle Mitarbeiterinnen und Mitarbeiter. Wegen eines technischen Problems an der Lüftung muss Halle zwei ab vierzehn Uhr leer sein. Die Spätschicht arbeitet heute deshalb in Halle drei und beginnt eine halbe Stunde später als sonst, also um halb drei. Die Schichtleiter treffen sich bitte schon um Viertel vor zwei im Besprechungsraum im ersten Stock. Vielen Dank.",
"questions": [
{
"q": "Wann beginnt heute die Spätschicht?",
"options": [
"Um vierzehn Uhr.",
"Um halb drei.",
"Um Viertel vor zwei."
],
"answer": 1,
"why": "Die Spätschicht beginnt „eine halbe Stunde später als sonst, also um halb drei“. Um Viertel vor zwei treffen sich nur die Schichtleiter."
}
]
},
{
"id": "dtbb1-1-05",
"teil": "Teil 2",
"type": "Durchsage im Betrieb",
"situation": "Du arbeitest in einem Möbelhaus in Recklinghausen. Vor Ladenöffnung hörst du eine Durchsage.",
"segments": [
{
"voice": "f1",
"text": "Guten Morgen, liebe Kolleginnen und Kollegen. Eine kurze Information: Am Donnerstag um zehn Uhr haben wir eine Übung mit Feueralarm. Wenn der Alarm kommt, verlassen Sie bitte sofort das Gebäude, und zwar über die Treppen, nicht mit dem Aufzug. Bitte nehmen Sie auch die Kundinnen und Kunden in Ihrem Bereich mit. Der Treffpunkt ist diesmal nicht der Hof hinter dem Lager, sondern der Parkplatz vor dem Haupteingang. Danke für Ihre Mithilfe."
}
],
"text": "Guten Morgen, liebe Kolleginnen und Kollegen. Eine kurze Information: Am Donnerstag um zehn Uhr haben wir eine Übung mit Feueralarm. Wenn der Alarm kommt, verlassen Sie bitte sofort das Gebäude, und zwar über die Treppen, nicht mit dem Aufzug. Bitte nehmen Sie auch die Kundinnen und Kunden in Ihrem Bereich mit. Der Treffpunkt ist diesmal nicht der Hof hinter dem Lager, sondern der Parkplatz vor dem Haupteingang. Danke für Ihre Mithilfe.",
"questions": [
{
"q": "Was sollen die Mitarbeitenden bei dem Alarm tun?",
"options": [
"An ihrem Arbeitsplatz warten.",
"Mit den Kunden über die Treppen nach draußen gehen.",
"Sich im Hof hinter dem Lager treffen."
],
"answer": 1,
"why": "Alle sollen das Gebäude „über die Treppen“ verlassen und die Kunden mitnehmen. Treffpunkt ist „nicht der Hof hinter dem Lager“, sondern der Parkplatz vor dem Haupteingang."
}
]
},
{
"id": "dtbb1-1-06",
"teil": "Teil 3",
"type": "Gespräch unter Kollegen",
"situation": "Schichtwechsel an der Rezeption eines Hotels in Essen. Mai Linh übergibt an ihren Kollegen Jonas.",
"segments": [
{
"voice": "f2",
"text": "Hey, Jonas, gut, dass du da bist. Wollen wir gleich die Übergabe machen?"
},
{
"voice": "m3",
"text": "Ja, klar. Moment, ich hol mir nur schnell einen Kaffee … So. Leg los."
},
{
"voice": "f2",
"text": "Also, viel ist heute nicht los. Aber: Zimmer zweihundertzwölf, Herr Gruber. Der hat sich beschwert, dass die Heizung nicht richtig warm wird. Ich hab dem Haustechniker Bescheid gesagt, der kommt aber erst morgen früh."
},
{
"voice": "m3",
"text": "Und bis dahin? Der friert doch."
},
{
"voice": "f2",
"text": "Nee, nee, ich hab ihm einen kleinen Heizlüfter aufs Zimmer gebracht. Er war ganz zufrieden. Du musst da also nichts mehr machen, außer er ruft noch mal an."
},
{
"voice": "m3",
"text": "Okay. Was noch?"
},
{
"voice": "f2",
"text": "Dann kommt heute Abend noch eine Gruppe, zwölf Personen, ein Chor aus Polen. Die wollten eigentlich um sechs da sein, aber der Busfahrer hat angerufen: Die stehen im Stau. Das wird eher neun."
},
{
"voice": "m3",
"text": "Neun? Dann ist die Küche ja schon zu."
},
{
"voice": "f2",
"text": "Genau, deswegen hab ich mit der Küche gesprochen. Die machen belegte Brötchen, die stehen ab halb neun im Frühstücksraum. Und die Schlüsselkarten liegen schon fertig hier, in dem Umschlag."
},
{
"voice": "m3",
"text": "Super, danke. Und die bezahlen dann beim Einchecken?"
},
{
"voice": "f2",
"text": "Nein, die Rechnung geht an den Verein, die bezahlen hier gar nichts. Steht alles im System."
},
{
"voice": "m3",
"text": "Perfekt. Dann schönen Feierabend!"
},
{
"voice": "f2",
"text": "Danke, dir eine ruhige Nacht!"
}
],
"text": "Hey, Jonas, gut, dass du da bist. Wollen wir gleich die Übergabe machen? – Ja, klar. Moment, ich hol mir nur schnell einen Kaffee … So. Leg los. – Also, viel ist heute nicht los. Aber: Zimmer zweihundertzwölf, Herr Gruber. Der hat sich beschwert, dass die Heizung nicht richtig warm wird. Ich hab dem Haustechniker Bescheid gesagt, der kommt aber erst morgen früh. – Und bis dahin? Der friert doch. – Nee, nee, ich hab ihm einen kleinen Heizlüfter aufs Zimmer gebracht. Er war ganz zufrieden. Du musst da also nichts mehr machen, außer er ruft noch mal an. – Okay. Was noch? – Dann kommt heute Abend noch eine Gruppe, zwölf Personen, ein Chor aus Polen. Die wollten eigentlich um sechs da sein, aber der Busfahrer hat angerufen: Die stehen im Stau. Das wird eher neun. – Neun? Dann ist die Küche ja schon zu. – Genau, deswegen hab ich mit der Küche gesprochen. Die machen belegte Brötchen, die stehen ab halb neun im Frühstücksraum. Und die Schlüsselkarten liegen schon fertig hier, in dem Umschlag. – Super, danke. Und die bezahlen dann beim Einchecken? – Nein, die Rechnung geht an den Verein, die bezahlen hier gar nichts. Steht alles im System. – Perfekt. Dann schönen Feierabend! – Danke, dir eine ruhige Nacht!",
"questions": [
{
"q": "Was hat Mai Linh wegen der Heizung in Zimmer zweihundertzwölf gemacht?",
"options": [
"Sie hat Herrn Gruber ein anderes Zimmer gegeben.",
"Sie hat ein Gerät zum Heizen ins Zimmer gebracht.",
"Sie hat die Heizung selbst repariert."
],
"answer": 1,
"why": "„Ich hab ihm einen kleinen Heizlüfter aufs Zimmer gebracht.“ Der Haustechniker kommt erst morgen."
},
{
"q": "Wann kommt die Gruppe wahrscheinlich an?",
"options": [
"Um sechs Uhr.",
"Um halb neun.",
"Gegen neun Uhr."
],
"answer": 2,
"why": "Wegen des Staus „wird das eher neun“. Um halb neun stehen nur die Brötchen bereit."
},
{
"q": "Wie bezahlt die Gruppe?",
"options": [
"Beim Einchecken an der Rezeption.",
"Der Verein bekommt die Rechnung.",
"Jonas muss die Rechnung noch schreiben."
],
"answer": 1,
"why": "„Die Rechnung geht an den Verein, die bezahlen hier gar nichts.“"
}
]
},
{
"id": "dtbb1-1-07",
"teil": "Teil 3",
"type": "Gespräch mit einer Kundin",
"situation": "Frau Kaya ruft bei einer Schreinerei in Schwelm an. Herr Lindemann nimmt das Gespräch an.",
"segments": [
{
"voice": "m2",
"text": "Schreinerei Lindemann, guten Tag."
},
{
"voice": "f3",
"text": "Ja, hallo, Kaya hier. Ich hab bei Ihnen vor drei Wochen eine Arbeitsplatte für die Küche bestellt, und die sollte eigentlich diese Woche eingebaut werden."
},
{
"voice": "m2",
"text": "Moment, Kaya … ja, hier hab ich's. Eiche, drei Meter zwanzig, richtig?"
},
{
"voice": "f3",
"text": "Genau. Und, ähm, ich hab noch nichts von Ihnen gehört. Kommt da jetzt jemand oder nicht?"
},
{
"voice": "m2",
"text": "Oh, das tut mir leid, da hätten wir uns melden müssen. Die Platte ist schon da, aber mein Kollege, der sie einbauen sollte, ist krank. Ich könnte Ihnen nächsten Dienstag anbieten, vormittags."
},
{
"voice": "f3",
"text": "Dienstag … hm, da arbeite ich bis zwei. Ginge das auch nachmittags?"
},
{
"voice": "m2",
"text": "Nachmittags ist schwierig, da sind wir auf einer anderen Baustelle. Aber warten Sie mal … Mittwoch ginge, ab ein Uhr. Passt Ihnen das?"
},
{
"voice": "f3",
"text": "Mittwoch ab eins, ja, das passt. Dauert das lange?"
},
{
"voice": "m2",
"text": "Ungefähr drei Stunden. Ach, und ganz wichtig: Die alte Platte muss dann schon raus sein. Oder sollen wir das machen?"
},
{
"voice": "f3",
"text": "Oh … das kann mein Mann, glaub ich, nicht. Können Sie das machen?"
},
{
"voice": "m2",
"text": "Kein Problem, das machen wir mit, und wir nehmen die alte Platte auch mit. Das kostet aber vierzig Euro extra, für die Entsorgung."
},
{
"voice": "f3",
"text": "Okay, das ist in Ordnung."
},
{
"voice": "m2",
"text": "Gut, dann trag ich Sie für Mittwoch, dreizehn Uhr, ein. Und noch mal Entschuldigung für die Verspätung."
}
],
"text": "Schreinerei Lindemann, guten Tag. – Ja, hallo, Kaya hier. Ich hab bei Ihnen vor drei Wochen eine Arbeitsplatte für die Küche bestellt, und die sollte eigentlich diese Woche eingebaut werden. – Moment, Kaya … ja, hier hab ich's. Eiche, drei Meter zwanzig, richtig? – Genau. Und, ähm, ich hab noch nichts von Ihnen gehört. Kommt da jetzt jemand oder nicht? – Oh, das tut mir leid, da hätten wir uns melden müssen. Die Platte ist schon da, aber mein Kollege, der sie einbauen sollte, ist krank. Ich könnte Ihnen nächsten Dienstag anbieten, vormittags. – Dienstag … hm, da arbeite ich bis zwei. Ginge das auch nachmittags? – Nachmittags ist schwierig, da sind wir auf einer anderen Baustelle. Aber warten Sie mal … Mittwoch ginge, ab ein Uhr. Passt Ihnen das? – Mittwoch ab eins, ja, das passt. Dauert das lange? – Ungefähr drei Stunden. Ach, und ganz wichtig: Die alte Platte muss dann schon raus sein. Oder sollen wir das machen? – Oh … das kann mein Mann, glaub ich, nicht. Können Sie das machen? – Kein Problem, das machen wir mit, und wir nehmen die alte Platte auch mit. Das kostet aber vierzig Euro extra, für die Entsorgung. – Okay, das ist in Ordnung. – Gut, dann trag ich Sie für Mittwoch, dreizehn Uhr, ein. Und noch mal Entschuldigung für die Verspätung.",
"questions": [
{
"q": "Warum wurde die Arbeitsplatte noch nicht eingebaut?",
"options": [
"Sie ist noch nicht geliefert worden.",
"Ein Mitarbeiter ist krank.",
"Frau Kaya war nicht zu Hause."
],
"answer": 1,
"why": "Herr Lindemann sagt: „Die Platte ist schon da, aber mein Kollege, der sie einbauen sollte, ist krank.“"
},
{
"q": "Wann kommt die Schreinerei?",
"options": [
"Am Dienstagvormittag.",
"Am Dienstagnachmittag.",
"Am Mittwochnachmittag."
],
"answer": 2,
"why": "Dienstagvormittag arbeitet Frau Kaya, nachmittags hat die Schreinerei keine Zeit. Sie einigen sich auf „Mittwoch, dreizehn Uhr“."
},
{
"q": "Was passiert mit der alten Arbeitsplatte?",
"options": [
"Frau Kayas Mann baut sie vorher ab.",
"Die Schreinerei baut sie ab und nimmt sie gegen Bezahlung mit.",
"Sie bleibt im Keller von Frau Kaya."
],
"answer": 1,
"why": "„Das machen wir mit, und wir nehmen die alte Platte auch mit. Das kostet aber vierzig Euro extra.“"
}
]
},
{
"id": "dtbb1-1-08",
"teil": "Teil 4",
"type": "Teambesprechung",
"situation": "Teambesprechung bei einem Pflegedienst in Recklinghausen. Es sprechen Teamleiterin Frau Schäfer, Herr Nowak und Frau Ahmadi.",
"segments": [
{
"voice": "f1",
"text": "So, ich glaube, wir sind vollzählig. Ich möchte heute nur zwei Punkte besprechen, wir haben ja alle nicht viel Zeit. Erstens: die neue App für die Dokumentation. Ab dem ersten Dezember schreiben wir die Berichte nicht mehr auf Papier, sondern auf dem Tablet."
},
{
"voice": "m3",
"text": "Endlich! Ich sitz jeden Abend fast eine Stunde an diesen Zetteln."
},
{
"voice": "f2",
"text": "Ja, schon, aber … also, ich bin mit Apps nicht so fit. Gibt es dafür eine Schulung?"
},
{
"voice": "f1",
"text": "Ja, genau, das wollte ich gerade sagen. Es gibt zwei Termine, am zwölften und am neunzehnten November, jeweils nachmittags hier im Büro. Jeder macht einen Termin mit. Die Liste hängt in der Küche, bitte tragen Sie sich bis Freitag ein."
},
{
"voice": "f2",
"text": "Okay, dann nehm ich gleich den ersten."
},
{
"voice": "f1",
"text": "Gut. Zweiter Punkt: die Dienstwagen. Ab nächstem Monat haben wir zwei Elektroautos statt der alten Kleinwagen. Die müssen abends an die Ladestation hier auf dem Hof."
},
{
"voice": "m3",
"text": "Und wenn meine letzte Tour in Datteln ist? Muss ich dann extra noch mal hierher fahren?"
},
{
"voice": "f1",
"text": "Das, ähm … das ist eine gute Frage. Nein. Wer abends weit weg ist, darf das Auto mit nach Hause nehmen und lädt es am nächsten Morgen hier. Aber bitte vorher mit mir absprechen."
},
{
"voice": "f2",
"text": "Und wer erklärt uns, wie das Laden funktioniert?"
},
{
"voice": "f1",
"text": "Das macht Herr Nowak, der fährt privat ja schon elektrisch. Herr Nowak, ginge das nächste Woche?"
},
{
"voice": "m3",
"text": "Klar, mach ich. Das dauert keine zehn Minuten."
},
{
"voice": "f1",
"text": "Prima. Dann sind wir durch. Danke Ihnen!"
}
],
"text": "So, ich glaube, wir sind vollzählig. Ich möchte heute nur zwei Punkte besprechen, wir haben ja alle nicht viel Zeit. Erstens: die neue App für die Dokumentation. Ab dem ersten Dezember schreiben wir die Berichte nicht mehr auf Papier, sondern auf dem Tablet. – Endlich! Ich sitz jeden Abend fast eine Stunde an diesen Zetteln. – Ja, schon, aber … also, ich bin mit Apps nicht so fit. Gibt es dafür eine Schulung? – Ja, genau, das wollte ich gerade sagen. Es gibt zwei Termine, am zwölften und am neunzehnten November, jeweils nachmittags hier im Büro. Jeder macht einen Termin mit. Die Liste hängt in der Küche, bitte tragen Sie sich bis Freitag ein. – Okay, dann nehm ich gleich den ersten. – Gut. Zweiter Punkt: die Dienstwagen. Ab nächstem Monat haben wir zwei Elektroautos statt der alten Kleinwagen. Die müssen abends an die Ladestation hier auf dem Hof. – Und wenn meine letzte Tour in Datteln ist? Muss ich dann extra noch mal hierher fahren? – Das, ähm … das ist eine gute Frage. Nein. Wer abends weit weg ist, darf das Auto mit nach Hause nehmen und lädt es am nächsten Morgen hier. Aber bitte vorher mit mir absprechen. – Und wer erklärt uns, wie das Laden funktioniert? – Das macht Herr Nowak, der fährt privat ja schon elektrisch. Herr Nowak, ginge das nächste Woche? – Klar, mach ich. Das dauert keine zehn Minuten. – Prima. Dann sind wir durch. Danke Ihnen!",
"questions": [
{
"q": "Was sollen alle bis Freitag tun?",
"options": [
"Sich für eine Schulung eintragen.",
"Die App auf ihrem Tablet installieren.",
"Ihre Berichte auf Papier abgeben."
],
"answer": 0,
"why": "„Die Liste hängt in der Küche, bitte tragen Sie sich bis Freitag ein.“"
},
{
"q": "Was gilt für die Elektroautos?",
"options": [
"Man muss sie immer abends auf dem Hof laden.",
"Nach Absprache darf man sie mit nach Hause nehmen.",
"Man darf sie nur für kurze Touren benutzen."
],
"answer": 1,
"why": "„Wer abends weit weg ist, darf das Auto mit nach Hause nehmen … Aber bitte vorher mit mir absprechen.“ Also nicht immer auf dem Hof."
},
{
"q": "Wer erklärt, wie man die Autos lädt?",
"options": [
"Frau Schäfer.",
"Herr Nowak.",
"Ein Mitarbeiter vom Autohaus."
],
"answer": 1,
"why": "Frau Schäfer sagt: „Das macht Herr Nowak, der fährt privat ja schon elektrisch.“"
}
]
}
]
},
"dtbb1-2": {
"title": "DTB B1 Hören · Übungssatz 2",
"level": "B1 Beruf",
"exam": "DTB B1",
"intro": "Diesmal im Büro, im Supermarkt, auf dem Bau, im Kundenservice und bei einer Umzugsfirma. Hör genau auf Uhrzeiten und Bedingungen: Oft wird ein Plan im Text noch geändert.",
"group": "dtbb1",
"items": [
{
"id": "dtbb1-2-01",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Du arbeitest im Büro einer Firma für Ladeneinrichtung in Bochum. Dein Kollege Andreas Brückner hat dir, Frau Yıldız, eine Nachricht hinterlassen.",
"segments": [
{
"voice": "m3",
"text": "Morgen, Frau Yıldız, hier ist Andreas Brückner. Ich … ähm, ich bin leider krank. Ich hab Fieber, war grad beim Arzt, und der hat mich bis Mittwoch krankgeschrieben. Die Krankmeldung läuft ja jetzt elektronisch, die müssen Sie also nicht von mir bekommen. Aber: Ich hab heute um elf den Termin mit dem Kunden von der Firma Hagedorn, wegen der neuen Regale. Könnten Sie den bitte absagen? Oder, noch besser, vielleicht kann Herr Mazur den übernehmen. Die Unterlagen liegen auf meinem Schreibtisch, in der blauen Mappe. Danke, und tut mir leid!"
}
],
"text": "Morgen, Frau Yıldız, hier ist Andreas Brückner. Ich … ähm, ich bin leider krank. Ich hab Fieber, war grad beim Arzt, und der hat mich bis Mittwoch krankgeschrieben. Die Krankmeldung läuft ja jetzt elektronisch, die müssen Sie also nicht von mir bekommen. Aber: Ich hab heute um elf den Termin mit dem Kunden von der Firma Hagedorn, wegen der neuen Regale. Könnten Sie den bitte absagen? Oder, noch besser, vielleicht kann Herr Mazur den übernehmen. Die Unterlagen liegen auf meinem Schreibtisch, in der blauen Mappe. Danke, und tut mir leid!",
"questions": [
{
"q": "Was soll Frau Yıldız mit dem Termin um elf Uhr machen?",
"options": [
"Ihn auf Mittwoch verschieben.",
"Ihn absagen oder an Herrn Mazur geben.",
"Selbst zu dem Kunden fahren."
],
"answer": 1,
"why": "Herr Brückner fragt: „Könnten Sie den bitte absagen? Oder … vielleicht kann Herr Mazur den übernehmen.“"
},
{
"q": "Was sagt Herr Brückner über die Krankmeldung?",
"options": [
"Er schickt sie heute per Post.",
"Sie kommt elektronisch, er muss sie nicht schicken.",
"Er bringt sie am Mittwoch mit."
],
"answer": 1,
"why": "„Die Krankmeldung läuft ja jetzt elektronisch, die müssen Sie also nicht von mir bekommen.“"
}
]
},
{
"id": "dtbb1-2-02",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Herr Ferreira hat ein Restaurant in Herne. Sein Getränkelieferant hat ihm eine Nachricht hinterlassen.",
"segments": [
{
"voice": "f2",
"text": "Guten Tag, hier ist Natalia Wróbel vom Getränkehandel Wróbel. Eine Nachricht für Herrn Ferreira vom Restaurant Porto. Es geht um Ihre Bestellung für Freitag. Das alkoholfreie Bier ist leider gerade nicht lieferbar. Wir könnten Ihnen stattdessen eine andere Marke bringen, zum gleichen Preis. Wenn Sie das nicht möchten, liefern wir am Freitag alles andere wie bestellt, und das Bier kommt dann nächste Woche Dienstag. Bitte geben Sie mir bis morgen um zwölf Bescheid. Wenn ich nichts von Ihnen höre, liefern wir die andere Marke. Danke und schönen Tag noch!"
}
],
"text": "Guten Tag, hier ist Natalia Wróbel vom Getränkehandel Wróbel. Eine Nachricht für Herrn Ferreira vom Restaurant Porto. Es geht um Ihre Bestellung für Freitag. Das alkoholfreie Bier ist leider gerade nicht lieferbar. Wir könnten Ihnen stattdessen eine andere Marke bringen, zum gleichen Preis. Wenn Sie das nicht möchten, liefern wir am Freitag alles andere wie bestellt, und das Bier kommt dann nächste Woche Dienstag. Bitte geben Sie mir bis morgen um zwölf Bescheid. Wenn ich nichts von Ihnen höre, liefern wir die andere Marke. Danke und schönen Tag noch!",
"questions": [
{
"q": "Was passiert, wenn Herr Ferreira sich nicht meldet?",
"options": [
"Er bekommt am Freitag eine andere Marke.",
"Das Bier kommt erst am Dienstag.",
"Die ganze Lieferung kommt später."
],
"answer": 0,
"why": "„Wenn ich nichts von Ihnen höre, liefern wir die andere Marke.“ Das Bier kommt nur dann am Dienstag, wenn er die andere Marke ablehnt."
}
]
},
{
"id": "dtbb1-2-03",
"teil": "Teil 1",
"type": "Mailbox",
"situation": "Rahim macht eine Ausbildung bei einem Dachdecker in Gevelsberg. Sein Ausbilder ruft an.",
"segments": [
{
"voice": "m1",
"text": "Hallo Rahim, hier ist Herr Engel, aus der Werkstatt. Wegen morgen: Wir fahren nicht wie geplant um sieben zur Baustelle nach Wuppertal, sondern erst um acht. Das Material wird später geliefert. Du musst also nicht in die Werkstatt kommen. Ich hol dich um Viertel vor acht am Bahnhof Gevelsberg West ab, mit dem Firmenwagen. Und zieh warme Sachen an, wir arbeiten den ganzen Tag draußen. Bis morgen!"
}
],
"text": "Hallo Rahim, hier ist Herr Engel, aus der Werkstatt. Wegen morgen: Wir fahren nicht wie geplant um sieben zur Baustelle nach Wuppertal, sondern erst um acht. Das Material wird später geliefert. Du musst also nicht in die Werkstatt kommen. Ich hol dich um Viertel vor acht am Bahnhof Gevelsberg West ab, mit dem Firmenwagen. Und zieh warme Sachen an, wir arbeiten den ganzen Tag draußen. Bis morgen!",
"questions": [
{
"q": "Wo trifft Rahim morgen Herrn Engel?",
"options": [
"In der Werkstatt.",
"Am Bahnhof.",
"Auf der Baustelle in Wuppertal."
],
"answer": 1,
"why": "„Du musst also nicht in die Werkstatt kommen. Ich hol dich … am Bahnhof Gevelsberg West ab.“"
},
{
"q": "Warum fahren sie später los?",
"options": [
"Herr Engel hat noch einen anderen Termin.",
"Das Material kommt später.",
"Das Wetter ist schlecht."
],
"answer": 1,
"why": "„Das Material wird später geliefert.“ Das Wetter ist kalt, aber kein Grund für die Änderung."
}
]
},
{
"id": "dtbb1-2-04",
"teil": "Teil 2",
"type": "Durchsage im Betrieb",
"situation": "Du arbeitest in einem Supermarkt in Castrop-Rauxel an der Kasse. Im Pausenraum hörst du eine Durchsage.",
"segments": [
{
"voice": "f1",
"text": "Liebe Kolleginnen und Kollegen, bitte kurz zuhören: Die Warenlieferung, die normalerweise um sechs Uhr kommt, ist morgen schon um fünf da. Wer morgen Frühdienst im Lager hat, fängt deshalb bitte eine Stunde früher an. Die Stunde wird natürlich auf Ihrem Arbeitszeitkonto gutgeschrieben. Alle anderen, auch an den Kassen, beginnen zur normalen Zeit. Danke!"
}
],
"text": "Liebe Kolleginnen und Kollegen, bitte kurz zuhören: Die Warenlieferung, die normalerweise um sechs Uhr kommt, ist morgen schon um fünf da. Wer morgen Frühdienst im Lager hat, fängt deshalb bitte eine Stunde früher an. Die Stunde wird natürlich auf Ihrem Arbeitszeitkonto gutgeschrieben. Alle anderen, auch an den Kassen, beginnen zur normalen Zeit. Danke!",
"questions": [
{
"q": "Wer muss morgen früher anfangen?",
"options": [
"Alle Mitarbeitenden.",
"Nur der Frühdienst im Lager.",
"Die Kolleginnen und Kollegen an den Kassen."
],
"answer": 1,
"why": "„Wer morgen Frühdienst im Lager hat, fängt deshalb bitte eine Stunde früher an.“ Du arbeitest an der Kasse und beginnst zur normalen Zeit."
}
]
},
{
"id": "dtbb1-2-05",
"teil": "Teil 2",
"type": "Durchsage im Betrieb",
"situation": "Du arbeitest als Fahrer und lieferst Ware an ein Logistikzentrum in Unna.",
"segments": [
{
"voice": "m2",
"text": "Achtung, eine Durchsage der Werksleitung. Ab sofort müssen alle Personen in den Lagerhallen eine Warnweste tragen. Das gilt auch für Besucher und für Fahrer von anderen Firmen. Warnwesten bekommen Sie am Empfang an Tor eins. Bitte informieren Sie auch Ihre Besucher. Vielen Dank für Ihre Mithilfe."
}
],
"text": "Achtung, eine Durchsage der Werksleitung. Ab sofort müssen alle Personen in den Lagerhallen eine Warnweste tragen. Das gilt auch für Besucher und für Fahrer von anderen Firmen. Warnwesten bekommen Sie am Empfang an Tor eins. Bitte informieren Sie auch Ihre Besucher. Vielen Dank für Ihre Mithilfe.",
"questions": [
{
"q": "Was ist neu?",
"options": [
"Alle müssen in den Hallen eine Warnweste tragen.",
"Fremde Fahrer dürfen die Hallen nicht mehr betreten.",
"Warnwesten gibt es ab sofort in der Lagerhalle."
],
"answer": 0,
"why": "„Ab sofort müssen alle Personen in den Lagerhallen eine Warnweste tragen.“ Die Westen gibt es am Empfang an Tor eins, nicht in der Halle."
}
]
},
{
"id": "dtbb1-2-06",
"teil": "Teil 3",
"type": "Gespräch unter Kollegen",
"situation": "Mittagspause in der Kantine einer Metallbaufirma in Hamm. Ioana und Murat unterhalten sich.",
"segments": [
{
"voice": "f3",
"text": "Na, Murat, auch Mittagspause? Ist hier noch frei?"
},
{
"voice": "m1",
"text": "Klar, setz dich. Und, wie war dein Urlaub?"
},
{
"voice": "f3",
"text": "Schön, aber viel zu kurz! Sag mal, ich hab gehört, du machst die Weiterbildung zum Vorarbeiter?"
},
{
"voice": "m1",
"text": "Ja, ab Januar. Jeden Freitag und Samstag, ein Jahr lang, in Dortmund bei der Handwerkskammer."
},
{
"voice": "f3",
"text": "Puh, auch samstags? Das ist ja heftig."
},
{
"voice": "m1",
"text": "Ja, schon. Aber die Firma bezahlt die Hälfte, den Rest zahl ich selbst. Und freitags krieg ich frei. Den Samstag, ja … den muss ich halt opfern."
},
{
"voice": "f3",
"text": "Und was sagt deine Frau dazu?"
},
{
"voice": "m1",
"text": "Na ja, begeistert ist sie nicht. Aber sie weiß, dass ich danach mehr verdiene. Sag mal, wär das nicht auch was für dich?"
},
{
"voice": "f3",
"text": "Ich? Nee … also, ich weiß nicht. Mein Deutsch, das Schriftliche, das ist noch nicht so gut."
},
{
"voice": "m1",
"text": "Ach, komm. Die bieten da sogar einen Vorbereitungskurs an, für Deutsch und Mathe. Abends, online. Ich schick dir den Link."
},
{
"voice": "f3",
"text": "Okay, ja, schick mal. Anschauen kostet ja nichts."
}
],
"text": "Na, Murat, auch Mittagspause? Ist hier noch frei? – Klar, setz dich. Und, wie war dein Urlaub? – Schön, aber viel zu kurz! Sag mal, ich hab gehört, du machst die Weiterbildung zum Vorarbeiter? – Ja, ab Januar. Jeden Freitag und Samstag, ein Jahr lang, in Dortmund bei der Handwerkskammer. – Puh, auch samstags? Das ist ja heftig. – Ja, schon. Aber die Firma bezahlt die Hälfte, den Rest zahl ich selbst. Und freitags krieg ich frei. Den Samstag, ja … den muss ich halt opfern. – Und was sagt deine Frau dazu? – Na ja, begeistert ist sie nicht. Aber sie weiß, dass ich danach mehr verdiene. Sag mal, wär das nicht auch was für dich? – Ich? Nee … also, ich weiß nicht. Mein Deutsch, das Schriftliche, das ist noch nicht so gut. – Ach, komm. Die bieten da sogar einen Vorbereitungskurs an, für Deutsch und Mathe. Abends, online. Ich schick dir den Link. – Okay, ja, schick mal. Anschauen kostet ja nichts.",
"questions": [
{
"q": "Wann findet Murats Weiterbildung statt?",
"options": [
"Jeden Abend online.",
"Freitags und samstags.",
"Nur samstags."
],
"answer": 1,
"why": "„Jeden Freitag und Samstag, ein Jahr lang.“ Online und abends ist nur der Vorbereitungskurs."
},
{
"q": "Wer bezahlt die Weiterbildung?",
"options": [
"Murat allein.",
"Die Firma allein.",
"Die Firma und Murat zusammen."
],
"answer": 2,
"why": "„Die Firma bezahlt die Hälfte, den Rest zahl ich selbst.“"
},
{
"q": "Was macht Ioana am Ende?",
"options": [
"Sie meldet sich sofort für die Weiterbildung an.",
"Sie möchte sich den Vorbereitungskurs ansehen.",
"Sie sagt, dass sie kein Interesse hat."
],
"answer": 1,
"why": "Sie ist unsicher, sagt aber: „Okay, ja, schick mal. Anschauen kostet ja nichts.“"
}
]
},
{
"id": "dtbb1-2-07",
"teil": "Teil 3",
"type": "Gespräch mit einem Kunden",
"situation": "Herr Papadopoulos ruft bei einer Umzugsfirma in Duisburg an. Frau Schmitz nimmt das Gespräch an.",
"segments": [
{
"voice": "f1",
"text": "Umzüge Rhein-Ruhr, Schmitz am Apparat, guten Tag."
},
{
"voice": "m2",
"text": "Guten Tag, Papadopoulos. Ich ziehe Ende November um, von Duisburg nach Moers, und ich bräuchte ein Angebot."
},
{
"voice": "f1",
"text": "Gerne. Wie groß ist denn die Wohnung?"
},
{
"voice": "m2",
"text": "Drei Zimmer, so ungefähr siebzig Quadratmeter. Im dritten Stock, und, ähm, es gibt leider keinen Aufzug."
},
{
"voice": "f1",
"text": "Okay, dritter Stock ohne Aufzug … Und die neue Wohnung?"
},
{
"voice": "m2",
"text": "Erdgeschoss, zum Glück."
},
{
"voice": "f1",
"text": "Gut. Brauchen Sie auch Hilfe beim Einpacken, oder machen Sie das selbst?"
},
{
"voice": "m2",
"text": "Nee, einpacken machen wir selbst. Aber die Küche, die müsste abgebaut und in Moers wieder aufgebaut werden."
},
{
"voice": "f1",
"text": "Das können wir machen. Am besten komme ich vorher einmal bei Ihnen vorbei und schaue mir alles an. Dann kann ich Ihnen einen genauen Preis sagen. Ginge es diese Woche Donnerstag?"
},
{
"voice": "m2",
"text": "Donnerstag bin ich bis fünf auf der Arbeit. Freitag wäre besser."
},
{
"voice": "f1",
"text": "Freitag um halb vier?"
},
{
"voice": "m2",
"text": "Ja, perfekt."
},
{
"voice": "f1",
"text": "Und die Kartons bringe ich Ihnen am Freitag gleich mit. Die ersten zwanzig sind kostenlos."
},
{
"voice": "m2",
"text": "Ah, prima, danke!"
}
],
"text": "Umzüge Rhein-Ruhr, Schmitz am Apparat, guten Tag. – Guten Tag, Papadopoulos. Ich ziehe Ende November um, von Duisburg nach Moers, und ich bräuchte ein Angebot. – Gerne. Wie groß ist denn die Wohnung? – Drei Zimmer, so ungefähr siebzig Quadratmeter. Im dritten Stock, und, ähm, es gibt leider keinen Aufzug. – Okay, dritter Stock ohne Aufzug … Und die neue Wohnung? – Erdgeschoss, zum Glück. – Gut. Brauchen Sie auch Hilfe beim Einpacken, oder machen Sie das selbst? – Nee, einpacken machen wir selbst. Aber die Küche, die müsste abgebaut und in Moers wieder aufgebaut werden. – Das können wir machen. Am besten komme ich vorher einmal bei Ihnen vorbei und schaue mir alles an. Dann kann ich Ihnen einen genauen Preis sagen. Ginge es diese Woche Donnerstag? – Donnerstag bin ich bis fünf auf der Arbeit. Freitag wäre besser. – Freitag um halb vier? – Ja, perfekt. – Und die Kartons bringe ich Ihnen am Freitag gleich mit. Die ersten zwanzig sind kostenlos. – Ah, prima, danke!",
"questions": [
{
"q": "Was soll die Firma beim Umzug machen?",
"options": [
"Alle Sachen einpacken.",
"Die Küche ab- und wieder aufbauen.",
"Einen Aufzug organisieren."
],
"answer": 1,
"why": "Einpacken macht Herr Papadopoulos selbst. Aber: „Die Küche, die müsste abgebaut und in Moers wieder aufgebaut werden.“"
},
{
"q": "Warum kommt Frau Schmitz vorher vorbei?",
"options": [
"Um Kartons zu verkaufen.",
"Um einen genauen Preis berechnen zu können.",
"Um den Vertrag zu unterschreiben."
],
"answer": 1,
"why": "„Dann kann ich Ihnen einen genauen Preis sagen.“ Die Kartons bringt sie mit, die ersten zwanzig sind kostenlos."
},
{
"q": "Wann kommt Frau Schmitz?",
"options": [
"Am Donnerstag.",
"Am Freitag um halb vier.",
"Am Freitag um fünf."
],
"answer": 1,
"why": "Donnerstag arbeitet Herr Papadopoulos bis fünf. Sie einigen sich auf „Freitag um halb vier“."
}
]
},
{
"id": "dtbb1-2-08",
"teil": "Teil 4",
"type": "Teambesprechung",
"situation": "Teambesprechung im Kundenservice eines Energieversorgers in Bochum. Es sprechen Teamleiter Markus Schuster, Grace Okafor und Piotr Lewandowski.",
"segments": [
{
"voice": "m2",
"text": "Morgen, zusammen. Ich mach's kurz. Ihr habt es sicher gemerkt: Seit die Briefe mit den neuen Preisen raus sind, haben wir fast doppelt so viele Anrufe."
},
{
"voice": "m3",
"text": "Gemerkt? Gestern hatte ich über achtzig Gespräche. Meine Mittagspause war, na ja, zehn Minuten."
},
{
"voice": "m2",
"text": "Ja, ich weiß, so geht das nicht weiter. Deshalb ändern wir zwei Sachen. Erstens: Bis Ende des Monats öffnet die Hotline schon um sieben statt um acht. Schluss ist aber wie bisher um sechs."
},
{
"voice": "f3",
"text": "Und wer macht die Stunde am Morgen? Ich bring meine Tochter um halb acht in die Kita, das schaff ich nicht."
},
{
"voice": "m2",
"text": "Keine Sorge, Grace, das ist freiwillig. Ich mach eine Liste, und wer früh kann, trägt sich ein. Piotr, du hattest doch gesagt, du fängst gern früh an?"
},
{
"voice": "m3",
"text": "Ja, das passt mir eigentlich ganz gut. Dann bin ich nachmittags früher zu Hause."
},
{
"voice": "m2",
"text": "Super. Zweitens: Viele Kunden fragen immer dasselbe. Deshalb stellen wir bis Mittwoch die häufigsten Fragen mit Antworten auf die Internetseite. Bitte schickt mir bis morgen die drei Fragen, die ihr am häufigsten hört."
},
{
"voice": "f3",
"text": "Per Mail?"
},
{
"voice": "m2",
"text": "Per Mail, oder schreibt sie einfach hier an die Tafel, ist mir egal. Hauptsache bis morgen."
},
{
"voice": "m3",
"text": "Und die Pausen? Bleibt's bei zehn Minuten?"
},
{
"voice": "m2",
"text": "Nein, auf keinen Fall. Die Mittagspause ist Pflicht, dreißig Minuten, für alle. Wenn es zu voll ist, hören die Kunden eben eine Ansage, dass sie warten müssen. Gesundheit geht vor."
}
],
"text": "Morgen, zusammen. Ich mach's kurz. Ihr habt es sicher gemerkt: Seit die Briefe mit den neuen Preisen raus sind, haben wir fast doppelt so viele Anrufe. – Gemerkt? Gestern hatte ich über achtzig Gespräche. Meine Mittagspause war, na ja, zehn Minuten. – Ja, ich weiß, so geht das nicht weiter. Deshalb ändern wir zwei Sachen. Erstens: Bis Ende des Monats öffnet die Hotline schon um sieben statt um acht. Schluss ist aber wie bisher um sechs. – Und wer macht die Stunde am Morgen? Ich bring meine Tochter um halb acht in die Kita, das schaff ich nicht. – Keine Sorge, Grace, das ist freiwillig. Ich mach eine Liste, und wer früh kann, trägt sich ein. Piotr, du hattest doch gesagt, du fängst gern früh an? – Ja, das passt mir eigentlich ganz gut. Dann bin ich nachmittags früher zu Hause. – Super. Zweitens: Viele Kunden fragen immer dasselbe. Deshalb stellen wir bis Mittwoch die häufigsten Fragen mit Antworten auf die Internetseite. Bitte schickt mir bis morgen die drei Fragen, die ihr am häufigsten hört. – Per Mail? – Per Mail, oder schreibt sie einfach hier an die Tafel, ist mir egal. Hauptsache bis morgen. – Und die Pausen? Bleibt's bei zehn Minuten? – Nein, auf keinen Fall. Die Mittagspause ist Pflicht, dreißig Minuten, für alle. Wenn es zu voll ist, hören die Kunden eben eine Ansage, dass sie warten müssen. Gesundheit geht vor.",
"questions": [
{
"q": "Was ändert sich bei der Hotline?",
"options": [
"Sie öffnet eine Stunde früher.",
"Sie schließt eine Stunde später.",
"Sie ist jetzt den ganzen Tag und die ganze Nacht erreichbar."
],
"answer": 0,
"why": "Die Hotline öffnet „schon um sieben statt um acht“. „Schluss ist aber wie bisher um sechs.“"
},
{
"q": "Was sollen alle bis morgen tun?",
"options": [
"Sich in die Liste für den Frühdienst eintragen.",
"Die häufigsten Kundenfragen schicken oder an die Tafel schreiben.",
"Die Internetseite ändern."
],
"answer": 1,
"why": "„Bitte schickt mir bis morgen die drei Fragen, die ihr am häufigsten hört.“ Der Frühdienst ist freiwillig."
},
{
"q": "Was sagt Herr Schuster zur Mittagspause?",
"options": [
"Bei viel Arbeit darf man sie kürzer machen.",
"Alle müssen dreißig Minuten Pause machen.",
"Die Pause wird auf zehn Minuten verkürzt."
],
"answer": 1,
"why": "„Die Mittagspause ist Pflicht, dreißig Minuten, für alle.“"
}
]
}
]
}
};
