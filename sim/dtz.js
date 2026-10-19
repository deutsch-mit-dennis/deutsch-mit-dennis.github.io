// DTZ – Deutsch-Test für Zuwanderer (A2–B1), Prüfungssimulation.
// Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Aufgaben.
(window.SIM = window.SIM || {})["dtz"] = {
  id: "dtz",
  title: "DTZ – Deutsch-Test für Zuwanderer",
  short: "DTZ",
  provider: "g.a.s.t.",
  level: "A2–B1",
  intro:
    "Die Abschlussprüfung des Integrationskurses: Der DTZ zeigt, ob Sie Deutsch auf Niveau A2 oder B1 können. Hier üben Sie die ganze Prüfung mit Zeitvorgabe – Hören, Lesen, Schreiben und Sprechen.",
  rule: "dtz",
  skills: {
    hl: { label: "Hören und Lesen", max: 45 },
    s: { label: "Schreiben", max: 20 },
    m: { label: "Sprechen", max: 100 },
  },
  sections: [
    // ───────────────────────────── HÖREN ─────────────────────────────
    {
      id: "hoeren",
      title: "Hören",
      minutes: 25,
      note: "Vier Teile, 20 Aufgaben. Lesen Sie vor jedem Hörtext zuerst die Aufgabe.",
      parts: [
        {
          title: "Hören Teil 1: Ansagen am Telefon und Durchsagen",
          skill: "hl",
          pts: 1,
          instr:
            "Sie hören vier Ansagen. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text zweimal.",
          audio: [
            {
              h: "Text 1",
              lines: [
                {
                  s: "f",
                  t: "Ja, guten Tag, Herr Nowak, hier ist die Zahnarztpraxis Doktor Albers, Kessler am Apparat. Äh, es geht um Ihren Termin am Dienstag um neun Uhr. Den müssen wir leider absagen, Frau Doktor Albers ist an dem Tag auf einer Fortbildung. Wir können Ihnen aber einen neuen Termin geben, und zwar am Donnerstag um halb drei, also um vierzehn Uhr dreißig. Mittwoch geht leider nicht, da ist bei uns nachmittags zu. Wenn Ihnen der Donnerstag nicht passt, rufen Sie uns bitte kurz zurück. Die Nummer ist null zwei null eins, siebenundvierzig, achtunddreißig, neunzehn. Ich wiederhole: null zwei null eins, siebenundvierzig, achtunddreißig, neunzehn. Vielen Dank, und auf Wiederhören!",
                },
              ],
            },
            {
              h: "Text 2",
              lines: [
                {
                  s: "n",
                  t: "Sehr geehrte Fahrgäste am Gleis fünf, bitte beachten Sie: Der Regional-Express eins nach Aachen, planmäßige Abfahrt zehn Uhr zwölf, fährt heute nicht von Gleis fünf, sondern von Gleis sieben. Ich wiederhole: Der Regional-Express eins nach Aachen, Abfahrt zehn Uhr zwölf, fährt heute von Gleis sieben. Der Zug hat zurzeit etwa fünf Minuten Verspätung. Wir bitten um Entschuldigung.",
                },
              ],
            },
            {
              h: "Text 3",
              lines: [
                {
                  s: "f",
                  t: "Ja, hallo, Frau Okafor, hier ist Sabine Brandt von der Kita Regenbogen. Äh, es geht um Ihre Tochter Amara. Der geht's heute nicht so gut, sie hat Bauchschmerzen und ein bisschen Fieber, achtunddreißig Komma zwei. Sie liegt jetzt bei uns in der Ruheecke. Könnten Sie Amara bitte möglichst bald abholen? Wir sind zwar bis sechzehn Uhr da, aber früher wäre natürlich besser für sie. Medikamente dürfen wir ihr leider nicht geben, das wissen Sie ja. Wenn Sie's nicht schaffen, kann vielleicht auch Ihr Mann kommen. Rufen Sie uns kurz an, ja? Null zwei drei null zwei, einundachtzig, sechsundvierzig, fünfzig. Also noch mal: null zwei drei null zwei, einundachtzig, sechsundvierzig, fünfzig. Danke, tschüss!",
                },
              ],
            },
            {
              h: "Text 4",
              lines: [
                {
                  s: "n",
                  t: "Liebe Kundinnen und Kunden, herzlich willkommen bei FrischMarkt! Heute haben wir ein ganz besonderes Angebot für Sie: Alle Säfte und alle Sorten Mineralwasser bekommen Sie bis Ladenschluss zwanzig Prozent günstiger. Ich wiederhole: alle Säfte und alle Sorten Mineralwasser heute zwanzig Prozent günstiger. Unser frisches Obst und Gemüse finden Sie wie immer gleich am Eingang. Und noch ein Hinweis: An Kasse drei können Sie heute nur mit Karte bezahlen. Vielen Dank für Ihren Einkauf!",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              au: 0,
              q: "Wann ist der neue Termin von Herrn Nowak?",
              opts: [
                "Am Dienstag um 9 Uhr.",
                "Am Mittwoch am Nachmittag.",
                "Am Donnerstag um 14:30 Uhr.",
              ],
              a: 2,
              why: "„einen neuen Termin … am Donnerstag um halb drei, also um vierzehn Uhr dreißig“ – Dienstag fällt aus, mittwochs nachmittags ist zu.",
            },
            {
              au: 1,
              q: "Was sollen die Fahrgäste tun?",
              opts: [
                "Zehn Minuten auf den nächsten Zug warten.",
                "Zu einem anderen Gleis gehen.",
                "Mit dem Bus nach Aachen fahren.",
              ],
              a: 1,
              why: "„… fährt heute nicht von Gleis fünf, sondern von Gleis sieben.“",
            },
            {
              au: 2,
              q: "Was soll Frau Okafor machen?",
              opts: [
                "Ihre Tochter früh von der Kita abholen.",
                "Medikamente in die Kita bringen.",
                "Ihren Mann bei der Arbeit anrufen.",
              ],
              a: 0,
              why: "„Könnten Sie Amara bitte möglichst bald abholen?“ – Medikamente darf die Kita nicht geben.",
            },
            {
              au: 3,
              q: "Was ist heute billiger?",
              opts: ["Obst und Gemüse.", "Getränke.", "Alle Waren an Kasse 3."],
              a: 1,
              why: "„Alle Säfte und alle Sorten Mineralwasser … zwanzig Prozent günstiger.“",
            },
          ],
        },
        {
          title: "Hören Teil 2: Informationen im Radio",
          skill: "hl",
          pts: 1,
          instr:
            "Sie hören fünf kurze Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung a, b oder c. Sie hören jeden Text einmal.",
          audio: [
            {
              h: "Text 1",
              lines: [
                {
                  s: "n",
                  t: "Und jetzt zum Verkehr. Auf der A vierzig von Dortmund Richtung Duisburg haben wir zwischen Essen-Huttrop und Essen-Zentrum sechs Kilometer Stau nach einem Unfall, der rechte Fahrstreifen ist gesperrt. Und dann noch die A dreiundvierzig Richtung Münster: Da gibt es wegen einer Baustelle bei Witten nur eine Fahrspur, rechnen Sie da mit etwa zehn Minuten mehr. Fahren Sie vorsichtig!",
                },
              ],
            },
            {
              h: "Text 2",
              lines: [
                {
                  s: "n",
                  t: "Und nun das Wetter für morgen, Mittwoch. Am Vormittag regnet es noch im ganzen Land, bei Temperaturen um zwölf Grad. Ab Mittag wird es dann freundlicher, und am Nachmittag scheint oft die Sonne, bei bis zu achtzehn Grad. Also, nachmittags ruhig mal raus! Am Donnerstag kommt dann kräftiger Wind, und es wird wieder deutlich kühler.",
                },
              ],
            },
            {
              h: "Text 3",
              lines: [
                {
                  s: "n",
                  t: "Und hier noch unser Tipp fürs Wochenende: In Hattingen ist wieder Altstadtfest! Am Samstag gibt es ab achtzehn Uhr Live-Musik auf dem Marktplatz, und am Sonntag ist dann von elf bis siebzehn Uhr ein großer Flohmarkt rund um die Kirche. Für die Kinder gibt es an beiden Tagen ein Karussell und Kinderschminken. Und das Beste: Der Eintritt ist frei.",
                },
              ],
            },
            {
              h: "Text 4",
              lines: [
                {
                  s: "n",
                  t: "Gute Nachrichten für alle Schwimmerinnen und Schwimmer in Bochum: Das Hallenbad am Stadtpark öffnet nach der Renovierung wieder, und zwar ab dem dritten November. Und es gibt etwas Neues: Das Bad hat jetzt auch sonntags geöffnet, von acht bis vierzehn Uhr. Die Öffnungszeiten unter der Woche bleiben gleich, und auch die Preise ändern sich nicht: Erwachsene zahlen vier Euro fünfzig, Kinder zwei Euro.",
                },
              ],
            },
            {
              h: "Text 5",
              lines: [
                {
                  s: "n",
                  t: "Und eine Information für alle Fahrgäste der Straßenbahnlinie hundertsieben: Wegen Bauarbeiten fährt die Linie am kommenden Wochenende nicht zwischen Hauptbahnhof und Karlsplatz. Bitte nutzen Sie die Ersatzbusse. Die fahren alle zehn Minuten ab der Haltestelle vor dem Hauptbahnhof. Ab Montag, fünf Uhr früh, fährt die hundertsieben dann wieder ganz normal.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              au: 0,
              q: "Warum gibt es auf der A40 Stau?",
              opts: [
                "Wegen eines Unfalls.",
                "Wegen einer Baustelle.",
                "Wegen schlechten Wetters.",
              ],
              a: 0,
              why: "„sechs Kilometer Stau nach einem Unfall“ – die Baustelle ist auf der A dreiundvierzig (A43).",
            },
            {
              au: 1,
              q: "Wie wird das Wetter morgen Nachmittag?",
              opts: [
                "Es regnet und ist kühl.",
                "Es ist sehr windig.",
                "Es ist sonnig und mild.",
              ],
              a: 2,
              why: "„am Nachmittag scheint oft die Sonne, bei bis zu achtzehn Grad“ – Regen nur am Vormittag, Wind erst am Donnerstag.",
            },
            {
              au: 2,
              q: "Was gibt es nur am Sonntag?",
              opts: [
                "Ein Konzert.",
                "Einen Flohmarkt.",
                "Ein Programm für Kinder.",
              ],
              a: 1,
              why: "„am Sonntag ist … ein großer Flohmarkt“ – Musik ist am Samstag, das Kinderprogramm an beiden Tagen.",
            },
            {
              au: 3,
              q: "Was ist neu im Hallenbad?",
              opts: [
                "Der Eintritt ist billiger.",
                "Es ist jeden Abend länger geöffnet.",
                "Man kann auch am Sonntag schwimmen.",
              ],
              a: 2,
              why: "„Das Bad hat jetzt auch sonntags geöffnet“ – Preise und Öffnungszeiten unter der Woche bleiben gleich.",
            },
            {
              au: 4,
              q: "Was sollen die Fahrgäste der Linie 107 am Wochenende tun?",
              opts: [
                "Einen Bus nehmen.",
                "Bis Montag warten.",
                "Eine andere Straßenbahn nehmen.",
              ],
              a: 0,
              why: "„Bitte nutzen Sie die Ersatzbusse.“",
            },
          ],
        },
        {
          title: "Hören Teil 3: Gespräche im Alltag",
          skill: "hl",
          pts: 1,
          instr:
            "Sie hören vier Gespräche. Sie hören jedes Gespräch einmal. Zu jedem Gespräch lösen Sie zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?",
          audio: [
            {
              h: "Gespräch 1",
              lines: [
                {
                  s: "f",
                  t: "Praxis Doktor Hoffmann, guten Morgen. Was kann ich für Sie tun?",
                },
                {
                  s: "m",
                  t: "Ja, guten Morgen. Yilmaz, Ahmet Yilmaz. Ich bräuchte ein neues Rezept für meine Tabletten, äh, für den Blutdruck.",
                },
                {
                  s: "f",
                  t: "Ah ja, Herr Yilmaz. Moment … Waren Sie in diesem Quartal schon bei uns?",
                },
                { s: "m", t: "Äh, nein. Im Oktober noch nicht, nee." },
                {
                  s: "f",
                  t: "Gut, dann brauch ich bitte einmal Ihre Versichertenkarte. Haben Sie die dabei?",
                },
                {
                  s: "m",
                  t: "Oh … die liegt zu Hause. Ich hab nur meinen Ausweis dabei.",
                },
                {
                  s: "f",
                  t: "Hm, der Ausweis reicht leider nicht. Ohne Karte kann ich das Rezept nicht ausstellen. Kommen Sie doch heute Nachmittag einfach mit der Karte wieder, wir haben bis achtzehn Uhr offen. Dann liegt das Rezept schon fertig hier.",
                },
                {
                  s: "m",
                  t: "Ach so, gut. Dann komm ich so gegen vier. Muss ich dann noch mal zum Doktor rein?",
                },
                {
                  s: "f",
                  t: "Nein, nein, Sie holen das Rezept einfach hier vorne am Empfang ab.",
                },
                { s: "m", t: "Prima. Danke schön, bis später!" },
              ],
            },
            {
              h: "Gespräch 2",
              lines: [
                { s: "m", t: "Guten Tag, was kann ich für Sie tun?" },
                {
                  s: "f",
                  t: "Guten Tag. Also, ich bin letzte Woche umgezogen, hier in Gelsenkirchen, und ich möchte meine neue Adresse anmelden.",
                },
                { s: "m", t: "Mhm. Haben Sie einen Termin?" },
                {
                  s: "f",
                  t: "Äh, nein. Ich dachte, ich kann einfach so kommen.",
                },
                {
                  s: "m",
                  t: "Ohne Termin geht das leider nur am Donnerstagvormittag, da haben wir eine offene Sprechstunde. Sonst brauchen Sie einen Termin. Den können Sie online machen oder telefonisch.",
                },
                { s: "f", t: "Ach so. Und was muss ich mitbringen?" },
                {
                  s: "m",
                  t: "Ihren Pass oder Personalausweis und die Wohnungsgeberbestätigung. Die kriegen Sie von Ihrem Vermieter.",
                },
                {
                  s: "f",
                  t: "Den Ausweis hab ich hier. Aber die Bestätigung vom Vermieter … hm, die hab ich noch nicht.",
                },
                {
                  s: "m",
                  t: "Tja, dann fragen Sie bitte zuerst Ihren Vermieter. Ohne die Bestätigung können wir Sie nicht anmelden. Und denken Sie dran: Sie haben zwei Wochen Zeit nach dem Umzug.",
                },
                {
                  s: "f",
                  t: "Okay, danke. Dann ruf ich heute noch meinen Vermieter an.",
                },
              ],
            },
            {
              h: "Gespräch 3",
              lines: [
                { s: "m", t: "Hallo Olga, hast du mal kurz Zeit?" },
                { s: "f", t: "Klar, Dariusz, was gibt's?" },
                {
                  s: "m",
                  t: "Also, ich hab nächste Woche Frühschicht. Aber am Mittwoch hat mein Sohn morgens einen Termin im Krankenhaus, da muss ich mit. Könntest du am Mittwoch mit mir tauschen? Du hast doch Spätschicht, oder?",
                },
                {
                  s: "f",
                  t: "Ja, Mittwoch hab ich Spätschicht. Hm, Mittwochmorgen … eigentlich wollte ich da zum Amt. Na ja, das kann ich auch am Freitag machen. Okay, ich tausch mit dir.",
                },
                {
                  s: "m",
                  t: "Echt? Super, danke! Muss ich das dem Chef sagen?",
                },
                {
                  s: "f",
                  t: "Nee, nicht dem Chef. Sag's Frau Lorenz, die macht den Schichtplan. Und am besten schriftlich, per E-Mail, sonst vergisst sie das.",
                },
                { s: "m", t: "Mach ich gleich heute. Danke dir, Olga!" },
              ],
            },
            {
              h: "Gespräch 4",
              lines: [
                { s: "f", t: "Ach, Herr Petrović, gut, dass ich Sie treffe!" },
                { s: "m", t: "Hallo Frau Wagner! Was gibt's denn?" },
                {
                  s: "f",
                  t: "Also, ich fahre morgen für eine Woche zu meiner Schwester nach Kiel. Und ich erwarte noch ein Paket. Könnten Sie das vielleicht für mich annehmen?",
                },
                {
                  s: "m",
                  t: "Ja, natürlich, kein Problem. Ich bin morgen den ganzen Tag zu Hause. Soll ich vielleicht auch Ihre Blumen gießen?",
                },
                {
                  s: "f",
                  t: "Ach nein, das macht schon meine Tochter, die kommt am Wochenende vorbei. Aber den Briefkasten, äh, könnten Sie den vielleicht leeren? Der ist sonst so schnell voll mit Werbung.",
                },
                {
                  s: "m",
                  t: "Klar, mach ich. Dann brauch ich aber den Briefkastenschlüssel.",
                },
                {
                  s: "f",
                  t: "Den bring ich Ihnen heute Abend vorbei. Vielen Dank, Herr Petrović, wirklich!",
                },
                { s: "m", t: "Gern. Und gute Reise!" },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              au: 0,
              q: "Herr Yilmaz braucht Tabletten gegen hohen Blutdruck.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Ich bräuchte ein neues Rezept für meine Tabletten, äh, für den Blutdruck.“",
            },
            {
              au: 0,
              q: "Was muss Herr Yilmaz am Nachmittag mitbringen?",
              opts: [
                "Seinen Ausweis.",
                "Seine Versichertenkarte.",
                "Das alte Rezept.",
              ],
              a: 1,
              why: "„Kommen Sie doch heute Nachmittag einfach mit der Karte wieder“ – der Ausweis reicht nicht.",
            },
            {
              au: 1,
              q: "Die Frau kann ihre neue Adresse heute anmelden.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "Sie hat keinen Termin und keine Wohnungsgeberbestätigung: „Ohne die Bestätigung können wir Sie nicht anmelden.“",
            },
            {
              au: 1,
              q: "Was muss die Frau zuerst machen?",
              opts: [
                "Online einen Termin buchen.",
                "Am Donnerstag ins Bürgerbüro kommen.",
                "Ihren Vermieter um eine Bestätigung bitten.",
              ],
              a: 2,
              why: "„Tja, dann fragen Sie bitte zuerst Ihren Vermieter.“",
            },
            {
              au: 2,
              q: "Olga geht am Mittwochmorgen zum Amt.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Na ja, das kann ich auch am Freitag machen. Okay, ich tausch mit dir.“",
            },
            {
              au: 2,
              q: "Was soll Dariusz tun?",
              opts: [
                "Frau Lorenz eine E-Mail schreiben.",
                "Mit seinem Chef sprechen.",
                "Am Freitag zum Amt gehen.",
              ],
              a: 0,
              why: "„Sag's Frau Lorenz … am besten schriftlich, per E-Mail.“",
            },
            {
              au: 3,
              q: "Frau Wagner ist eine Woche nicht zu Hause.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Also, ich fahre morgen für eine Woche zu meiner Schwester nach Kiel.“",
            },
            {
              au: 3,
              q: "Was soll Herr Petrović für Frau Wagner tun?",
              opts: [
                "Ihre Blumen gießen.",
                "Ihre Tochter vom Bahnhof abholen.",
                "Ein Paket annehmen und den Briefkasten leeren.",
              ],
              a: 2,
              why: "Er nimmt das Paket an und leert den Briefkasten – die Blumen gießt die Tochter.",
            },
          ],
        },
        {
          title: "Hören Teil 4: Meinungen im Radio",
          skill: "hl",
          pts: 1,
          instr:
            "Sie hören drei Personen in einer Radiosendung zum Thema „Sollen Kinder in der Grundschule schon ein eigenes Handy haben?“. Welche Aussage passt zu welcher Person? Wählen Sie für jede Person eine Aussage a–f. Drei Aussagen passen nicht. Lesen Sie zuerst die Aussagen a–f. Dazu haben Sie eine Minute Zeit. Sie hören jeden Text einmal.",
          audio: [
            {
              h: "Person 1: Frau Jansen",
              lines: [
                {
                  s: "n",
                  t: "Willkommen bei „Hallo Revier“! Heute fragen wir: Sollen Kinder in der Grundschule schon ein eigenes Handy haben? Frau Jansen, Sie haben eine Tochter …",
                },
                {
                  s: "f",
                  t: "Ja, also, meine Tochter ist neun und hat seit einem halben Jahr ein Handy. Aber kein Smartphone, sondern so ein ganz einfaches Gerät, nur zum Telefonieren und für SMS. Internet, Spiele, Videos – das braucht ein Kind in dem Alter doch noch nicht. Wenn der Bus mal nicht kommt, kann sie mich anrufen, und das reicht völlig. Viele Eltern denken, das Kind ist sonst traurig, weil die anderen alle ein Smartphone haben. Aber meine Tochter kommt gut damit klar.",
                },
              ],
            },
            {
              h: "Person 2: Herr Brandt",
              lines: [
                {
                  s: "n",
                  t: "Herr Brandt, Sie sind Lehrer an einer Grundschule. Wie sehen Sie das?",
                },
                {
                  s: "m",
                  t: "Ehrlich gesagt sehe ich das nicht so negativ. Verbieten bringt nichts, die Kinder sehen Handys ja sowieso überall. Ich finde, Kinder müssen früh lernen, wie man mit dem Handy und dem Internet richtig umgeht: Was darf ich posten? Was ist gefährlich? Das machen wir auch im Unterricht. Natürlich bleiben die Handys während der Stunde in der Tasche, das ist klar. Aber grundsätzlich gilt: Mit Medien umgehen lernt man nur, wenn man sie auch benutzt.",
                },
              ],
            },
            {
              h: "Person 3: Herr Schäfer",
              lines: [
                {
                  s: "n",
                  t: "Und zum Schluss Herr Schäfer, Vater von zwei Söhnen.",
                },
                {
                  s: "m2",
                  t: "Bei uns gibt es eine klare Regel: Ein eigenes Handy gibt es erst, wenn die Kinder allein mit Bus und Bahn zur Schule fahren. Bei meinem älteren Sohn war das mit elf, als er aufs Gymnasium gekommen ist. Vorher hat er es einfach nicht gebraucht. Die Grundschule ist bei uns gleich um die Ecke, und nachmittags war er sowieso mit Freunden draußen auf dem Spielplatz. Klar, er hat sich manchmal beschwert. Aber jetzt hat er eins, und so passt das für uns.",
                },
              ],
            },
          ],
          plays: 1,
          opts: [
            "a) Mit einem Handy wissen Eltern immer, wo ihr Kind gerade ist.",
            "b) Ein eigenes Handy brauchen Kinder erst, wenn sie allein zur Schule fahren.",
            "c) Für ein Kind reicht ein einfaches Handy ohne Internet.",
            "d) In der Schule sollten Handys komplett verboten sein.",
            "e) Kinder sollen früh lernen, wie man richtig mit Handy und Internet umgeht.",
            "f) Kinder brauchen gar kein Handy, sie sollen lieber draußen spielen.",
          ],
          items: [
            {
              au: 0,
              q: "Frau Jansen",
              a: 2,
              why: "„kein Smartphone, sondern so ein ganz einfaches Gerät … Internet, Spiele, Videos – das braucht ein Kind in dem Alter doch noch nicht.“",
            },
            {
              au: 1,
              q: "Herr Brandt",
              a: 4,
              why: "„Kinder müssen früh lernen, wie man mit dem Handy und dem Internet richtig umgeht“ – ein Verbot (d) lehnt er ab.",
            },
            {
              au: 2,
              q: "Herr Schäfer",
              a: 1,
              why: "„Ein eigenes Handy gibt es erst, wenn die Kinder allein mit Bus und Bahn zur Schule fahren.“ – Sein Sohn hat jetzt ein Handy, also passt f nicht.",
            },
          ],
        },
      ],
    },
    // ───────────────────────────── LESEN ─────────────────────────────
    {
      id: "lesen",
      title: "Lesen",
      minutes: 45,
      note: "Fünf Teile, 25 Aufgaben. Sie müssen nicht jedes Wort verstehen – suchen Sie die wichtigen Informationen.",
      parts: [
        {
          title: "Lesen Teil 1: Wegweiser",
          skill: "hl",
          pts: 1,
          instr:
            "Lesen Sie die Situationen und den Wegweiser des Kaufhauses. In welches Stockwerk gehen Sie? Wählen Sie die richtige Lösung a, b oder c.",
          material: [
            {
              h: "Kaufhaus Lindner – Wegweiser",
              t: "4. Stock: Elektrogeräte · Haushaltsgeräte (Wasserkocher, Kaffeemaschinen, Staubsauger) · Handys und Computer · Fernseher · Fotoservice · Kundenservice und Reklamationen · Restaurant „Dachgarten“\n\n3. Stock: Kindermode · Babyausstattung · Spielwaren · Schreibwaren und Schulbedarf · Bücher\n\n2. Stock: Herrenmode · Herrenschuhe · Sportbekleidung und Sportschuhe · Fahrräder und Sportgeräte\n\n1. Stock: Damenmode · Damenschuhe · Damenwäsche · Taschen\n\nErdgeschoss: Parfümerie und Kosmetik · Schmuck und Uhren · Zeitschriften · Information · Geschenkverpackung\n\nUntergeschoss: Lebensmittel · Getränke · Haushaltswaren (Geschirr, Töpfe, Bettwäsche) · Schlüsseldienst · Schuhreparatur · Toiletten",
            },
          ],
          items: [
            {
              q: "Ihr Sohn kommt in die 2. Klasse. Sie brauchen Hefte, Stifte und einen Füller.",
              opts: ["Erdgeschoss", "3. Stock", "anderes Stockwerk"],
              a: 1,
              why: "„Schreibwaren und Schulbedarf“ gibt es im 3. Stock.",
            },
            {
              q: "Sie haben letzte Woche hier einen Wasserkocher gekauft. Er ist schon kaputt und Sie möchten ihn reklamieren.",
              opts: ["Untergeschoss", "Erdgeschoss", "anderes Stockwerk"],
              a: 2,
              why: "„Kundenservice und Reklamationen“ ist im 4. Stock – nicht bei den Haushaltswaren im Untergeschoss.",
            },
            {
              q: "Sie brauchen einen zweiten Schlüssel für Ihre Wohnung.",
              opts: ["Untergeschoss", "4. Stock", "anderes Stockwerk"],
              a: 0,
              why: "Der „Schlüsseldienst“ ist im Untergeschoss.",
            },
            {
              q: "Ihr Mann möchte mit dem Joggen anfangen und braucht passende Schuhe.",
              opts: ["1. Stock", "2. Stock", "anderes Stockwerk"],
              a: 1,
              why: "„Sportbekleidung und Sportschuhe“ sind im 2. Stock; im 1. Stock gibt es nur Damenschuhe.",
            },
            {
              q: "Sie möchten Ihrer Freundin ein Parfüm zum Geburtstag schenken.",
              opts: ["1. Stock", "3. Stock", "anderes Stockwerk"],
              a: 2,
              why: "„Parfümerie und Kosmetik“ ist im Erdgeschoss.",
            },
          ],
        },
        {
          title: "Lesen Teil 2: Anzeigen",
          skill: "hl",
          pts: 1,
          instr:
            "Lesen Sie die Situationen und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal wählen. Für eine Situation gibt es keine passende Anzeige. Wählen Sie dann x.",
          material: [
            {
              h: "a",
              t: "Verkaufe gut erhaltenes Damenfahrrad, 28 Zoll, 3 Gänge, mit Korb. 120 €, nur Abholung.\nTel. 0176 / 23 45 81 90",
            },
            {
              h: "b",
              t: "Sprachschule Lingua Plus\nDeutschkurse A1 bis B1 – Montag bis Freitag, 8:30 bis 12:30 Uhr.\nKostenlose Kinderbetreuung während des Unterrichts!\nAnmeldung: Bahnhofstraße 12, Hagen",
            },
            {
              h: "c",
              t: "Helle 3-Zimmer-Wohnung in Witten-Annen, 78 m², Balkon, 2. OG.\nKaltmiete 690 €, Nebenkosten 220 €. Frei ab 1. Dezember. Keine Haustiere.\nTel. 02302 / 59 81 70",
            },
            {
              h: "d",
              t: "Beratungsstelle „Brücke“ e. V.\nSie haben einen Brief vom Amt bekommen und verstehen ihn nicht? Sie müssen einen Antrag ausfüllen? Wir helfen Ihnen – kostenlos und in mehreren Sprachen.\nOffene Sprechstunde: Mo und Mi 14–17 Uhr, Kirchplatz 4",
            },
            {
              h: "e",
              t: "Bildungszentrum West\nDeutsch für den Beruf (B1) – dienstags und donnerstags von 18:00 bis 21:00 Uhr.\nKursbeginn: 5. November. Jetzt anmelden!",
            },
            {
              h: "f",
              t: "Fahrradwerkstatt „Speiche“\nPlatten, Bremsen, Licht, Schaltung – wir reparieren Räder aller Marken, oft noch am selben Tag. Ohne Termin!\nDi–Sa 10–18 Uhr, Lindenstraße 22",
            },
            {
              h: "g",
              t: "Nachmieter gesucht! 3 Zimmer, Küche, Bad, 71 m², Erdgeschoss mit kleinem Garten, 5 Minuten zur Grundschule.\nWarmmiete 780 € (alles inklusive). Ab sofort frei.\nTel. 0157 / 88 12 40 33",
            },
            {
              h: "h",
              t: "Babysitter-Kurs für Jugendliche ab 14 Jahren\nErste Hilfe am Kind, Spiele, Ernährung – 4 Termine, jeweils samstags. Am Ende bekommen alle ein Zertifikat.\nAnmeldung im Familienzentrum Sonnenhof",
            },
          ],
          opts: [
            "a) Damenfahrrad",
            "b) Sprachschule Lingua Plus",
            "c) 3-Zimmer-Wohnung Witten-Annen",
            "d) Beratungsstelle „Brücke“",
            "e) Bildungszentrum West",
            "f) Fahrradwerkstatt „Speiche“",
            "g) Nachmieter gesucht",
            "h) Babysitter-Kurs",
            "x) keine passende Anzeige",
          ],
          items: [
            {
              q: "Sie haben einen Brief von einer Behörde bekommen und brauchen Hilfe beim Ausfüllen eines Antrags.",
              a: 3,
              why: "d: „Sie müssen einen Antrag ausfüllen? Wir helfen Ihnen“.",
            },
            {
              q: "Sie arbeiten tagsüber und möchten am Abend Ihr Deutsch verbessern.",
              a: 4,
              why: "e: Kurs von 18 bis 21 Uhr – b ist nur vormittags.",
            },
            {
              q: "Sie gehen am Freitagabend auf eine Hochzeit und suchen jemanden, der auf Ihre Kinder aufpasst.",
              a: 8,
              why: "Keine Anzeige bietet einen Babysitter an: h ist nur ein Kurs für Jugendliche, b betreut Kinder nur während des Unterrichts am Vormittag.",
            },
            {
              q: "Sie suchen mit Ihrer Familie eine Wohnung mit drei Zimmern und können höchstens 800 € warm bezahlen.",
              a: 6,
              why: "g: 3 Zimmer, „Warmmiete 780 €“ – c kostet warm 910 €.",
            },
            {
              q: "Die Bremsen an Ihrem Fahrrad funktionieren nicht mehr richtig.",
              a: 5,
              why: "f: „Platten, Bremsen … wir reparieren Räder aller Marken“ – a verkauft nur ein Fahrrad.",
            },
          ],
        },
        {
          title: "Lesen Teil 3: Pressetexte und Mitteilungen",
          skill: "hl",
          pts: 1,
          instr:
            "Lesen Sie die drei Texte. Zu jedem Text gibt es zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung passt: a, b oder c?",
          material: [
            {
              h: "Text 1: Neue Kita-Plätze in Herne",
              t: "Die Stadt Herne eröffnet im Januar zwei neue Kindertagesstätten in den Stadtteilen Sodingen und Wanne. Insgesamt entstehen 140 neue Plätze für Kinder zwischen einem und sechs Jahren. Eltern, die einen Platz suchen, müssen ihr Kind über das Online-Portal „Kita-Navigator“ anmelden. Wer keinen Computer hat oder Hilfe braucht, kann sich an das Familienbüro im Rathaus wenden. Dort helfen Mitarbeiterinnen und Mitarbeiter bei der Anmeldung, auch ohne Termin. Die Plätze werden ab dem 15. November vergeben. Geschwisterkinder bekommen zuerst einen Platz.",
            },
            {
              h: "Text 2: Mitteilung der Hausverwaltung",
              t: "Hausverwaltung Kramer & Söhne GmbH\nAn alle Mieterinnen und Mieter der Goethestraße 18\n\nWartung der Heizungsanlage\n\nSehr geehrte Mieterinnen und Mieter,\nam Dienstag, 10. November, wird die Heizungsanlage in Ihrem Haus gewartet. Zwischen 8:00 und 14:00 Uhr gibt es deshalb kein warmes Wasser, und die Heizung ist ausgeschaltet. Kaltes Wasser steht wie immer zur Verfügung. Die Techniker müssen nicht in Ihre Wohnung. Bitte stellen Sie aber ab Montagabend keine Fahrräder oder Kinderwagen vor die Kellertür, damit die Techniker freien Zugang zum Heizungsraum haben.\n\nVielen Dank für Ihr Verständnis\nIhre Hausverwaltung",
            },
            {
              h: "Text 3: Jobmesse in Bochum",
              t: "Am Samstag, 21. November, findet im Kongresszentrum Bochum die Jobmesse „Arbeit im Revier“ statt. Über 80 Firmen aus der Region stellen sich vor, vor allem aus der Pflege, dem Handwerk und der Logistik. Besucherinnen und Besucher können direkt mit den Firmen sprechen. Es lohnt sich, Bewerbungsunterlagen mitzubringen. Wer seinen Lebenslauf noch verbessern möchte, kann ihn am Stand der Agentur für Arbeit kostenlos prüfen lassen. Die Messe ist von 10 bis 16 Uhr geöffnet, der Eintritt ist frei. Eine Anmeldung ist nicht nötig.",
            },
          ],
          items: [
            {
              q: "Text 1: Die neuen Kitas öffnen im November.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "Die Kitas öffnen „im Januar“; ab dem 15. November werden nur die Plätze vergeben.",
            },
            {
              q: "Text 1: Was können Eltern ohne Computer tun?",
              opts: [
                "Sich im Familienbüro helfen lassen.",
                "Direkt in der neuen Kita anrufen.",
                "Online einen Termin im Rathaus buchen.",
              ],
              a: 0,
              why: "„Wer keinen Computer hat …, kann sich an das Familienbüro im Rathaus wenden.“",
            },
            {
              q: "Text 2: Am Dienstagvormittag gibt es im Haus kein warmes Wasser.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Zwischen 8:00 und 14:00 Uhr gibt es deshalb kein warmes Wasser“.",
            },
            {
              q: "Text 2: Was sollen die Mieter tun?",
              opts: [
                "Den Technikern die Wohnungstür öffnen.",
                "Den Platz vor der Kellertür frei lassen.",
                "Am Montag die Heizung ausschalten.",
              ],
              a: 1,
              why: "„Bitte stellen Sie … keine Fahrräder oder Kinderwagen vor die Kellertür“ – in die Wohnungen müssen die Techniker nicht.",
            },
            {
              q: "Text 3: Man muss sich für die Jobmesse vorher anmelden.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Eine Anmeldung ist nicht nötig.“",
            },
            {
              q: "Text 3: Was kann man am Stand der Agentur für Arbeit machen?",
              opts: [
                "Einen Arbeitsvertrag unterschreiben.",
                "Sich für einen Deutschkurs anmelden.",
                "Seinen Lebenslauf prüfen lassen.",
              ],
              a: 2,
              why: "„kann ihn am Stand der Agentur für Arbeit kostenlos prüfen lassen“.",
            },
          ],
        },
        {
          title: "Lesen Teil 4: Informationsbroschüre",
          skill: "hl",
          pts: 1,
          instr:
            "Lesen Sie den Text aus einer Broschüre. Sind die Aussagen richtig oder falsch?",
          material: [
            {
              h: "Stadtbibliothek Iserlohn – So bekommen Sie Ihren Bibliotheksausweis",
              t: "Wer kann einen Ausweis bekommen?\nJede Person, die in Iserlohn oder in der Umgebung wohnt, kann einen Bibliotheksausweis bekommen. Bringen Sie bitte Ihren Personalausweis oder Ihren Reisepass mit einer Meldebescheinigung mit. Kinder und Jugendliche unter 16 Jahren brauchen außerdem die Unterschrift eines Elternteils.\n\nWas kostet der Ausweis?\nFür Kinder und Jugendliche bis 18 Jahre ist der Ausweis kostenlos. Erwachsene zahlen 15 Euro im Jahr. Wer Bürgergeld oder Wohngeld bekommt, zahlt nur 5 Euro. Bitte zeigen Sie dafür Ihren aktuellen Bescheid.\n\nWas kann ich ausleihen?\nBücher, Zeitschriften, DVDs und Spiele können Sie vier Wochen ausleihen. Neue DVDs und Zeitschriften gibt es nur für eine Woche. Mit dem Ausweis können Sie außerdem E-Books und Hörbücher über unsere Online-Bibliothek kostenlos herunterladen.\n\nUnd wenn ich mehr Zeit brauche?\nSie können die Leihfrist zweimal verlängern – online, am Telefon oder an der Theke. Das geht aber nur, wenn niemand anderes das Medium reserviert hat. Wenn Sie ein Medium zu spät zurückbringen, kostet das 50 Cent pro Tag und Medium.",
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              q: "Eine Jugendliche mit 17 Jahren muss für den Ausweis nichts bezahlen.",
              a: 0,
              why: "„Für Kinder und Jugendliche bis 18 Jahre ist der Ausweis kostenlos.“",
            },
            {
              q: "Für E-Books muss man in der Online-Bibliothek extra bezahlen.",
              a: 1,
              why: "E-Books und Hörbücher kann man mit dem Ausweis „kostenlos herunterladen“.",
            },
            {
              q: "Wenn eine andere Person ein Buch reserviert hat, kann man es nicht verlängern.",
              a: 0,
              why: "„Das geht aber nur, wenn niemand anderes das Medium reserviert hat.“",
            },
          ],
        },
        {
          title: "Lesen Teil 5: Brief mit Lücken",
          skill: "hl",
          pts: 1,
          instr:
            "Lesen Sie den Brief. Welches Wort passt in die Lücke? Wählen Sie die richtige Lösung a, b oder c.",
          material: [
            {
              h: "Kündigung",
              t: "Nadia Haddad\nRosenweg 9\n44137 Dortmund\n\nFitnessstudio Fit & Fun\nKönigstraße 40\n45127 Essen\n\nKündigung meiner Mitgliedschaft\n\nSehr geehrte Damen und Herren,\n\nhiermit kündige ich meinen Vertrag mit der Mitgliedsnummer 40 77 12 {1} 31. Dezember. Im Oktober bin ich nach Dortmund umgezogen. {2} kann ich nicht mehr regelmäßig zu Ihnen ins Studio kommen.\n\nIch habe noch eine Frage: In meinem Vertrag steht, dass die Kündigungsfrist einen Monat beträgt. Können Sie mir bitte bestätigen, {3} meine Kündigung rechtzeitig ist?\n\nAußerdem habe ich im Sommer zwei Monate nicht trainiert, {4} ich am Knie operiert wurde. Ich habe Ihnen damals ein ärztliches Attest geschickt. Ist es möglich, dass ich für diese Zeit Geld {5} bekomme?\n\nBitte schicken Sie mir eine schriftliche Bestätigung meiner Kündigung. Für Ihre Antwort danke ich Ihnen {6} Voraus.\n\nMit freundlichen Grüßen\nNadia Haddad",
            },
          ],
          items: [
            {
              q: "",
              opts: ["am", "zum", "bis"],
              a: 1,
              why: "Man kündigt „zum 31. Dezember“ (= mit Ende an diesem Tag).",
            },
            {
              q: "",
              opts: ["Deshalb", "Trotzdem", "Weil"],
              a: 0,
              why: "Folge des Umzugs: „Deshalb kann ich …“ (Verb auf Position 2, also kein „weil“).",
            },
            {
              q: "",
              opts: ["damit", "wenn", "dass"],
              a: 2,
              why: "„bestätigen, dass …“ – nach „bestätigen“ folgt ein dass-Satz.",
            },
            {
              q: "",
              opts: ["deshalb", "obwohl", "weil"],
              a: 2,
              why: "Grund mit Verb am Ende: „…, weil ich am Knie operiert wurde.“",
            },
            {
              q: "",
              opts: ["vorbei", "zurück", "weiter"],
              a: 1,
              why: "„Geld zurückbekommen“ = das bezahlte Geld wieder erhalten.",
            },
            {
              q: "",
              opts: ["im", "am", "vom"],
              a: 0,
              why: "Feste Wendung: „Ich danke Ihnen im Voraus.“",
            },
          ],
        },
      ],
    },
    // ───────────────────────────── SCHREIBEN ─────────────────────────────
    {
      id: "schreiben",
      title: "Schreiben",
      minutes: 30,
      parts: [
        {
          kind: "write",
          title: "Schreiben: E-Mail oder Brief",
          skill: "s",
          pts: 20,
          instr:
            "Wählen Sie Aufgabe A oder Aufgabe B. Schreiben Sie zu allen vier Punkten etwas. Achten Sie auf den Betreff, die Anrede und den Gruß. Schreiben Sie ungefähr 80 bis 120 Wörter.",
          options: [
            {
              h: "Aufgabe A: E-Mail an die Kursleiterin",
              situation:
                "Sie besuchen am Weiterbildungszentrum Hagen den Kurs „Computer für Anfänger“. Ihre Kursleiterin ist Frau Demir. Nächste Woche können Sie nicht zum Kurs kommen.",
              task: "Schreiben Sie eine E-Mail an Frau Demir.",
              points: [
                "Grund für Ihr Schreiben",
                "Warum Sie nicht kommen können",
                "Bitte um Unterlagen und Hausaufgaben",
                "Frage nach dem nächsten Test",
              ],
              muster:
                "Betreff: Abwesenheit nächste Woche\n\nLiebe Frau Demir,\n\nich möchte Ihnen mitteilen, dass ich nächste Woche leider nicht zum Computerkurs kommen kann. Das tut mir sehr leid, denn der Kurs macht mir viel Spaß.\n\nMein Vater ist krank, deshalb fliege ich am Montag für eine Woche zu meiner Familie nach Polen. Am 16. November bin ich wieder in Hagen.\n\nKönnten Sie mir bitte die Unterlagen und die Hausaufgaben per E-Mail schicken? Dann kann ich zu Hause üben und verpasse nicht so viel.\n\nAußerdem habe ich noch eine Frage: Wann schreiben wir den nächsten Test? Ich möchte mich gut darauf vorbereiten.\n\nVielen Dank für Ihr Verständnis.\n\nViele Grüße\nMagdalena Nowak",
            },
            {
              h: "Aufgabe B: Brief an den Vermieter",
              situation:
                "In Ihrer Wohnung funktioniert die Heizung im Kinderzimmer seit einer Woche nicht mehr. Ihr Vermieter ist Herr Becker.",
              task: "Schreiben Sie einen Brief an Herrn Becker.",
              points: [
                "Grund für Ihr Schreiben",
                "Was Sie schon gemacht haben",
                "Bitte um schnelle Reparatur",
                "Wann ein Handwerker kommen kann",
              ],
              muster:
                "Ali Rahimi\nBergstraße 7\n58332 Schwelm\n\nHerrn Klaus Becker\nAm Hang 3\n58332 Schwelm\n\nSchwelm, 12. November 2026\n\nBetreff: Defekte Heizung in meiner Wohnung\n\nSehr geehrter Herr Becker,\n\nich schreibe Ihnen, weil die Heizung im Kinderzimmer seit einer Woche nicht mehr funktioniert. Der Heizkörper bleibt kalt, obwohl er ganz aufgedreht ist. Nachts sind es im Zimmer nur noch 15 Grad, und meine Tochter ist schon erkältet.\n\nIch habe Sie letzten Montag zweimal angerufen, aber Sie waren leider nicht erreichbar. Deshalb habe ich Ihnen eine Nachricht auf den Anrufbeantworter gesprochen.\n\nBitte schicken Sie so schnell wie möglich einen Handwerker. Ich bin von Montag bis Freitag ab 15 Uhr zu Hause. Am Vormittag kann meine Nachbarin, Frau Lang, die Tür öffnen.\n\nIch freue mich auf Ihre baldige Antwort.\n\nMit freundlichen Grüßen\nAli Rahimi",
            },
          ],
          minWords: 80,
          check: [
            "Zu allen vier Leitpunkten etwas geschrieben",
            "Betreff passend formuliert",
            "Passende Anrede und passender Gruß (Liebe Frau … / Sehr geehrter Herr … – Viele Grüße / Mit freundlichen Grüßen)",
            "Konsequent die Sie-Form benutzt (Sie, Ihnen, Ihr – großgeschrieben), nicht zu „du“ gewechselt",
            "Sätze mit Verbindungswörtern verbunden (weil, deshalb, aber, außerdem, dann)",
            "Verb an der richtigen Stelle (Hauptsatz: Position 2, Nebensatz mit weil/dass: am Ende)",
            "Text in Absätze gegliedert, mindestens 80 Wörter",
          ],
        },
      ],
    },
    // ───────────────────────────── SPRECHEN ─────────────────────────────
    {
      id: "sprechen",
      title: "Sprechen",
      minutes: 16,
      note: "In der echten Prüfung sprechen Sie zu zweit mit zwei Prüfenden. Hier wird die Paarprüfung simuliert: Lesen Sie die Fragen und Impulse und antworten Sie laut.",
      parts: [
        {
          kind: "speak",
          title: "Teil 1: Über sich sprechen",
          skill: "m",
          pts: 30,
          minutes: 4,
          instr:
            "Stellen Sie sich bitte vor. Sprechen Sie zu den Stichpunkten. Danach stellt Ihnen die Prüferin noch einige Fragen.",
          task: "Sprechen Sie über sich:\n– Name\n– Herkunft\n– Wohnort\n– Familie\n– Arbeit/Beruf\n– Sprachen",
          prompts: [
            "Können Sie bitte Ihren Nachnamen buchstabieren?",
            "Wie lange wohnen Sie schon in Ihrer Stadt?",
            "Was gefällt Ihnen an Ihrem Wohnort? Was gefällt Ihnen nicht so gut?",
            "Welche Sprache sprechen Sie zu Hause mit Ihrer Familie?",
            "Was möchten Sie in Zukunft beruflich machen?",
          ],
          redemittel: [
            "Ich heiße … / Mein Name ist …",
            "Ich komme aus … Dort habe ich in … gewohnt.",
            "Ich wohne seit … Jahren in …",
            "Ich bin verheiratet / ledig und habe … Kinder.",
            "Von Beruf bin ich … / Im Moment arbeite ich als …",
            "Ich spreche …, ein bisschen … und natürlich Deutsch.",
          ],
          muster:
            "Guten Tag, ich heiße Leyla Karimi. Ich komme aus dem Iran, aus der Stadt Shiraz. Seit drei Jahren lebe ich in Deutschland, zuerst habe ich ein Jahr in Dortmund gewohnt, jetzt wohne ich in Hagen. Ich bin verheiratet und habe zwei Kinder. Mein Sohn ist acht und geht in die dritte Klasse, meine Tochter ist vier und geht in den Kindergarten. Im Iran war ich Grundschullehrerin. Hier arbeite ich im Moment als Aushilfe in einer Bäckerei, am Vormittag, wenn die Kinder in der Schule und im Kindergarten sind. Ich spreche Persisch, ein bisschen Englisch und natürlich Deutsch.\n\nAntworten auf die Nachfragen (Beispiele):\n– Karimi: K – A – R – I – M – I.\n– Ich wohne seit zwei Jahren in Hagen.\n– Mir gefällt, dass es in Hagen viel Natur und viele Parks gibt. Nicht so gut finde ich, dass die Busse abends so selten fahren.\n– Zu Hause sprechen wir Persisch, aber die Kinder sprechen miteinander oft Deutsch.\n– In Zukunft möchte ich gern als Erzieherin in einer Kita arbeiten. Dafür mache ich zuerst den B1-Kurs und dann eine Ausbildung.",
          check: [
            "Zu allen Stichpunkten etwas gesagt",
            "In ganzen Sätzen gesprochen, nicht nur einzelne Wörter",
            "Den Namen deutlich buchstabiert",
            "Auf die Nachfragen passend und mit Beispielen geantwortet",
            "Zeitangaben richtig benutzt (seit drei Jahren, vor zwei Jahren)",
          ],
        },
        {
          kind: "speak",
          title: "Teil 2: Über Erfahrungen sprechen (Bild)",
          skill: "m",
          pts: 35,
          minutes: 6,
          instr:
            "Sie sehen ein Foto. Beschreiben Sie zuerst das Bild (2A). Erzählen Sie dann von Ihren eigenen Erfahrungen zum Thema (2B). Danach stellt Ihnen die Prüferin noch einige Fragen.",
          task: "Foto: Eine Familie sitzt im Wartezimmer einer Kinderarztpraxis. Die Mutter hält ein kleines Kind von etwa zwei Jahren auf dem Schoß. Das Kind hat rote Wangen und ist in eine Decke gewickelt. Der Vater füllt auf einem Klemmbrett einen Fragebogen aus. Neben den Eltern sitzt ein Junge von etwa sechs Jahren auf dem Boden in einer Spielecke und baut mit Bauklötzen. An der Wand hängen bunte Kinderzeichnungen und ein Plakat zum Thema Impfen. Im Hintergrund sieht man die Anmeldung: Eine Arzthelferin sitzt am Computer und telefoniert. Auch andere Eltern mit Kindern warten im Raum.\n\n2A: Was sehen Sie auf dem Bild? Was machen die Personen?\n2B: Welche Erfahrungen haben Sie mit Arztbesuchen in Deutschland (für Ihre Kinder oder für sich selbst)? Wie ist das in Ihrem Heimatland?",
          prompts: [
            "Wie haben Sie Ihren Arzt oder Ihre Ärztin gefunden?",
            "Mussten Sie schon einmal lange auf einen Termin warten? Was haben Sie gemacht?",
            "Was ist beim Arzt in Deutschland anders als in Ihrem Heimatland?",
            "Was machen Sie, wenn Ihr Kind am Wochenende krank wird?",
          ],
          redemittel: [
            "Auf dem Bild sehe ich … / Das Foto zeigt …",
            "Im Vordergrund / Im Hintergrund / Links / Rechts …",
            "Ich glaube, … / Vielleicht … / Es sieht so aus, als ob …",
            "Das erinnert mich an … / Ich habe auch schon erlebt, dass …",
            "In meinem Heimatland ist das anders: Dort …",
            "Ich finde es gut / nicht so gut, dass …",
          ],
          muster:
            "Auf dem Bild sehe ich ein Wartezimmer in einer Kinderarztpraxis. Im Vordergrund sitzt eine Familie. Die Mutter hält ein kleines Kind auf dem Schoß. Das Kind hat rote Wangen und eine Decke – ich glaube, es hat Fieber. Der Vater füllt einen Fragebogen aus. Vielleicht ist die Familie zum ersten Mal in dieser Praxis. Neben den Eltern spielt ein Junge mit Bauklötzen. Er sieht nicht krank aus, vielleicht ist er nur mitgekommen. Im Hintergrund sitzt eine Arzthelferin an der Anmeldung und telefoniert, und an der Wand hängen Kinderbilder und ein Plakat über das Impfen. Die Eltern sehen ein bisschen müde und besorgt aus.\n\nDas Bild erinnert mich an meine eigene Erfahrung. Letzten Winter hatte meine Tochter hohes Fieber. Ich habe morgens um acht Uhr in der Praxis angerufen, aber es war immer besetzt. Dann bin ich einfach mit ihr hingegangen. Wir mussten fast zwei Stunden warten, aber die Ärztin war sehr freundlich und hat alles gut erklärt. In meinem Heimatland, in der Türkei, geht man oft direkt ins Krankenhaus, auch mit kleinen Problemen. In Deutschland geht man zuerst zum Hausarzt oder zum Kinderarzt. Das finde ich eigentlich gut, aber man wartet oft lange auf einen Termin.\n\nAntworten auf die Nachfragen (Beispiele):\n– Unseren Kinderarzt hat mir eine Nachbarin empfohlen. Man kann aber auch im Internet suchen.\n– Für einen Termin beim Hautarzt habe ich drei Monate gewartet. Ich habe dann jede Woche gefragt, ob ein Termin frei geworden ist.\n– In Deutschland braucht man fast immer einen Termin, und man zeigt zuerst die Versichertenkarte.\n– Am Wochenende rufe ich die 116 117 an, das ist der ärztliche Bereitschaftsdienst. Im Notfall rufe ich die 112.",
          check: [
            "Das Bild beschrieben: Ort, Personen, was sie machen",
            "Vermutungen geäußert (Ich glaube … / Vielleicht …)",
            "Von einer eigenen Erfahrung erzählt (im Perfekt)",
            "Mit dem Heimatland verglichen",
            "Auf die Nachfragen ausführlich geantwortet",
          ],
        },
        {
          kind: "speak",
          title: "Teil 3: Gemeinsam etwas planen",
          skill: "m",
          pts: 35,
          minutes: 6,
          instr:
            "Sie planen zusammen mit Ihrem Partner / Ihrer Partnerin etwas. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich am Ende. Hier sagt die Partnerin ihre Vorschläge nacheinander – reagieren Sie jedes Mal darauf.",
          task: "Ihr Deutschkurs ist bald zu Ende. Ihre Kursleiterin, Frau Krüger, geht danach in Rente. Sie möchten zusammen mit Ihrem Partner / Ihrer Partnerin eine kleine Abschiedsfeier für sie organisieren.\n\nPlanen Sie gemeinsam:\n– Wann? (Tag, Uhrzeit)\n– Wo? (Kursraum, Restaurant, Park …)\n– Essen und Getränke?\n– Wer macht was? (einkaufen, Raum schmücken, die anderen informieren …)\n– Geschenk?",
          prompts: [
            "Ich schlage vor, wir feiern am letzten Kurstag, also am Freitag, direkt nach dem Unterricht. Was meinst du?",
            "Wir könnten doch in ein Restaurant gehen. Das ist schöner als der Kursraum, oder?",
            "Und das Essen? Jeder bringt etwas aus seinem Heimatland mit – wie findest du das?",
            "Ich kann leider nicht einkaufen, ich habe kein Auto. Kannst du die Getränke kaufen?",
            "Wer sagt den anderen aus dem Kurs Bescheid?",
            "Als Geschenk könnten wir ihr einfach Blumen kaufen. Oder hast du eine bessere Idee?",
          ],
          redemittel: [
            "Vorschläge machen: Ich schlage vor, … / Wir könnten doch … / Wie wäre es mit …? / Was hältst du von …?",
            "Zustimmen: Gute Idee! / Das finde ich super. / Einverstanden. / Ja, so machen wir das.",
            "Ablehnen: Ich weiß nicht, … / Das finde ich nicht so gut, weil … / Das ist leider zu teuer. / Lieber …",
            "Etwas anderes vorschlagen: Ich habe eine andere Idee: … / Vielleicht ist es besser, wenn …",
            "Sich einigen: Also, dann machen wir es so: … / Gut, dann fasse ich zusammen: …",
          ],
          muster:
            "A: Also, Frau Krüger geht in Rente, und wir wollen eine kleine Feier für sie machen. Wann wollen wir feiern?\nB: Ich schlage vor, wir feiern am letzten Kurstag, also am Freitag, direkt nach dem Unterricht. Was meinst du?\nA: Gute Idee, dann haben alle Zeit. Der Unterricht ist um zwölf zu Ende. Dann können wir zusammen zu Mittag essen.\nB: Wir könnten doch in ein Restaurant gehen. Das ist schöner als der Kursraum, oder?\nA: Hm, ich weiß nicht. Ein Restaurant ist für zwanzig Personen ziemlich teuer, und nicht alle haben viel Geld. Wie wäre es mit dem Kursraum? Den können wir schön schmücken.\nB: Stimmt, das ist billiger. Okay, einverstanden.\nA: Und was machen wir mit dem Essen?\nB: Jeder bringt etwas aus seinem Heimatland mit – wie findest du das?\nA: Das finde ich super! Dann gibt es viele verschiedene Sachen, und Frau Krüger kann alles probieren. Getränke müssen wir aber kaufen.\nB: Ich kann leider nicht einkaufen, ich habe kein Auto. Kannst du die Getränke kaufen?\nA: Ja, kein Problem. Ich kaufe Saft, Wasser und Kaffee. Kannst du dann den Raum schmücken?\nB: Ja, gern. Ich bringe Luftballons und eine Tischdecke mit. Wer sagt den anderen aus dem Kurs Bescheid?\nA: Das mache ich. Ich schreibe heute Abend eine Nachricht in unsere Kursgruppe.\nB: Prima. Und das Geschenk? Wir könnten ihr einfach Blumen kaufen. Oder hast du eine bessere Idee?\nA: Blumen sind schön, aber vielleicht etwas Persönlicheres? Wir könnten ein Fotobuch mit Bildern vom Kurs machen, und jeder schreibt einen kurzen Gruß hinein.\nB: Oh, das ist eine tolle Idee! Und ein paar Blumen kaufen wir trotzdem dazu.\nA: Gut. Dann sammeln wir von jedem fünf Euro ein. Also: Freitag um zwölf im Kursraum, jeder bringt etwas zu essen mit, ich kaufe die Getränke und schreibe die Nachricht, und du schmückst den Raum.\nB: Und das Fotobuch machen wir zusammen. Super, dann ist alles geplant!",
          check: [
            "Zu allen Punkten der Aufgabenkarte gesprochen",
            "Eigene Vorschläge gemacht",
            "Auf die Vorschläge der Partnerin reagiert (zugestimmt oder begründet abgelehnt)",
            "Bei Ablehnung eine Alternative vorgeschlagen",
            "Am Ende gemeinsam eine Lösung gefunden und zusammengefasst",
          ],
        },
      ],
    },
  ],
};
