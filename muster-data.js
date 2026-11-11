/* Graded sample answers ("Bewertete Musterantworten") for all free-writing tasks.
   Lazy-loaded for routes "simulation" and "ueben" (see lazy.js).

   STATUS: DRAFTS. Every task carries review: true – the owner (licensed examiner) must read
   and correct texts and comments before they count as final. They are own examples in the
   style of the exams, NOT official assessments.

   Assessment criteria used in the comments (checked 11.11.2026):
   - DTZ Schreiben: Aufgabenbewältigung, kommunikative Gestaltung, Korrektheit, Wortschatz
     (g.a.s.t., DTZ FAQ: https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz/faq)
   - telc Deutsch B1: Berücksichtigung der Leitpunkte, kommunikative Gestaltung, formale Richtigkeit
     (telc Übungstest 1 Zertifikat Deutsch: https://shop.telc.net/media/catalog/product/file/telc_deutsch_b1_zd_uebungstest_1.pdf)
   - telc Deutsch B2: same three areas; the label of criterion I ("Behandlung des Schreibanlasses")
     could NOT be confirmed online – owner please check against the telc B2 Handbuch.
   - DTB B1/B2: inhaltliche Angemessenheit, sprachliche Angemessenheit
     (BAMF/telc Übungstest 1 DTB B2: https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Berufsbezsprachf-ESF-BAMF/BSK-Konzepte/b2-modelltest-bsk.pdf?__blob=publicationFile&v=10)
   - Practice scenes (#ueben/schreiben): no exam – plain labels Inhalt, Aufbau, Sprache.

   Keys: simulation "<simId>/<partKey>/<optionIndex>" (e.g. "dtz/2.0/0"), practice "ueben/<Level>/<n>".
   Task: { ex, target (words), lp: [[Leitpunkt, "keyword|keyword"]], s: [[level, text, [comments], [[wrong, right] x2]]] }
   lp keywords are lower-case word stems for the coverage hint in schreibcheck.js (only a hint). */
(() => {
  const T = {};
  const add = (key, ex, target, lp, s) => {
    T[key] = { ex, target, lp, s, review: true };
  };
  const FIX = {
    dtz: "So wird daraus B1:",
    "telc-b1": "So besteht der Text:",
    "dtb-b1": "So besteht der Text:",
    "telc-b2": "So wird daraus B2:",
    "dtb-b2": "So wird daraus B2:",
    ueben: "So wird es besser:",
  };
  const CRIT = {
    dtz: "Kriterien im DTZ: Aufgabenbewältigung, kommunikative Gestaltung, Korrektheit, Wortschatz.",
    "telc-b1":
      "Kriterien bei telc B1: Leitpunkte, kommunikative Gestaltung, formale Richtigkeit.",
    "telc-b2":
      "Kriterien bei telc B2: Inhalt (Schreibanlass), kommunikative Gestaltung, formale Richtigkeit.",
    "dtb-b1":
      "Kriterien im DTB: inhaltliche Angemessenheit, sprachliche Angemessenheit.",
    "dtb-b2":
      "Kriterien im DTB: inhaltliche Angemessenheit, sprachliche Angemessenheit.",
    ueben: "Ich schaue auf drei Dinge: Inhalt, Aufbau, Sprache.",
  };

  /* ================= DTZ ================= */
  const DTZ = ["unter A2", "A2", "B1"];

  add(
    "dtz/2.0/0",
    "dtz",
    80,
    [
      [
        "Grund für Ihr Schreiben",
        "aufzug|fahrstuhl|lift|kaputt|defekt|funktioniert nicht",
      ],
      [
        "Welche Probleme Sie haben",
        "kinderwagen|kind|baby|treppe|stock|tragen|schwer",
      ],
      [
        "Bitte um schnelle Reparatur",
        "reparier|reparatur|bitte|schnell|könnten sie|techniker",
      ],
      [
        "Frage, wann der Aufzug wieder funktioniert",
        "wann|bis wann|wie lange|termin",
      ],
    ],
    [
      [
        DTZ[0],
        `Hallo,\nAufzug ist kaputt. Ich wohne 5 Stock. Ich habe Kind und Kinderwagen. Das ist nicht gut. Bitte machen Aufzug.\nDanke`,
        [
          "Aufgabenbewältigung: Grund und Problem sind da, aber sehr kurz. Die Frage „Wann?“ fehlt ganz.",
          "Kommunikative Gestaltung: kein Betreff, keine passende Anrede, kein Gruß mit Namen. Die Sätze stehen einzeln.",
          "Korrektheit: Artikel und Präpositionen fehlen („5 Stock“), das Verb ist nicht konjugiert („Bitte machen“).",
          "Wortschatz: nur sehr einfache Wörter. „reparieren“ fehlt.",
        ],
        [
          ["Ich wohne 5 Stock.", "Ich wohne im 5. Stock."],
          ["Bitte machen Aufzug.", "Bitte reparieren Sie den Aufzug schnell."],
        ],
      ],
      [
        DTZ[1],
        `Sehr geehrte Damen und Herren,\n\nich schreibe Ihnen, weil der Aufzug ist kaputt seit eine Woche. Ich wohne im 5. Stock und ich habe ein kleines Kind. Ich muss jeden Tag den Kinderwagen tragen. Das ist sehr schwer für mich.\nBitte reparieren Sie den Aufzug. Wann kommt der Techniker?\n\nMit freundlichen Grüße\nSamira Haddad`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind da. Die Bitte und die Frage sind aber nur ein kurzer Satz.",
          "Kommunikative Gestaltung: Anrede und Gruß passen. Es gibt aber fast nur „und“. Der Betreff fehlt.",
          "Korrektheit: Nach „weil“ steht das Verb nicht am Ende. „seit eine Woche“ braucht Dativ.",
          "Wortschatz: reicht für die Situation, ist aber einfach.",
        ],
        [
          [
            "…, weil der Aufzug ist kaputt seit eine Woche.",
            "…, weil der Aufzug seit einer Woche kaputt ist.",
          ],
          [
            "Wann kommt der Techniker?",
            "Können Sie mir bitte sagen, wann der Aufzug wieder funktioniert?",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Aufzug kaputt, Gartenstraße 12\n\nSehr geehrte Damen und Herren,\n\nich wohne in der Gartenstraße 12 im 5. Stock. Ich schreibe Ihnen, weil der Aufzug seit einer Woche nicht funktioniert.\nFür mich ist das ein großes Problem, denn ich habe ein kleines Kind. Jeden Tag muss ich den Kinderwagen fünf Etagen nach oben tragen. Auch meine ältere Nachbarin kann ihre Wohnung kaum verlassen.\nDeshalb bitte ich Sie, den Aufzug so schnell wie möglich reparieren zu lassen. Können Sie mir bitte mitteilen, wann er wieder funktioniert?\n\nVielen Dank für Ihre Hilfe.\n\nMit freundlichen Grüßen\nSamira Haddad`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind klar und mit Details bearbeitet.",
          "Kommunikative Gestaltung: Betreff, Anrede, Absätze und Gruß passen. Die Sätze sind verbunden: weil, denn, deshalb.",
          "Korrektheit: Nebensätze sind richtig gebaut. Kleine Fehler wären hier kein Problem.",
          "Wortschatz: passend zum Thema (Etagen, reparieren lassen, mitteilen).",
        ],
        [],
      ],
    ],
  );

  add(
    "dtz/2.0/1",
    "dtz",
    80,
    [
      ["Dank für die Einladung", "dank|einladung|eingeladen|gefreut"],
      [
        "Warum Sie nicht kommen können",
        "weil|leider|kann nicht|arbeiten|krank|termin|muss",
      ],
      [
        "Vorschlag für ein anderes Treffen",
        "treffen|nächste woche|sonntag|kaffee|essen gehen|vielleicht|wollen wir|hast du zeit",
      ],
      ["Frage nach einem Geschenkwunsch", "geschenk|wünsch|wunsch|schenken"],
    ],
    [
      [
        DTZ[0],
        `Hallo Julia\nDanke für Einladung. Ich komme nicht. Ich habe Arbeit Samstag. Wir treffen andere Tag? Was du möchtest Geschenk?\nTschüss`,
        [
          "Aufgabenbewältigung: Zu allen Punkten steht ein Wort oder ein kurzer Satz. Das ist mehr als nichts.",
          "Kommunikative Gestaltung: Man versteht die Idee. Es gibt aber keine Verbindung zwischen den Sätzen und keinen Namen am Ende.",
          "Korrektheit: Wortstellung in Fragen ist falsch. Artikel und Präpositionen fehlen fast immer.",
          "Wortschatz: sehr wenig. Für eine Absage fehlen „leider“ und „weil“.",
        ],
        [
          ["Ich habe Arbeit Samstag.", "Leider muss ich am Samstag arbeiten."],
          ["Was du möchtest Geschenk?", "Was wünschst du dir zum Geburtstag?"],
        ],
      ],
      [
        DTZ[1],
        `Liebe Julia,\n\nvielen Dank für deine Einladung. Ich habe mich gefreut. Leider ich kann nicht kommen am Samstag, weil ich muss arbeiten. Meine Kollegin ist krank.\nVielleicht wir können uns am Sonntag treffen? Wir können Kaffee trinken.\nWas möchtest du für Geschenk?\n\nLiebe Grüße\nOlena`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind bearbeitet, mit einem Grund.",
          "Kommunikative Gestaltung: Anrede und Gruß passen gut zu einer Freundin. Die Sätze sind kurz, aber in guter Reihenfolge.",
          "Korrektheit: Das Verb steht oft an der falschen Stelle („Leider ich kann“, „weil ich muss arbeiten“).",
          "Wortschatz: einfach, aber passend.",
        ],
        [
          [
            "Leider ich kann nicht kommen am Samstag, weil ich muss arbeiten.",
            "Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss.",
          ],
          [
            "Was möchtest du für Geschenk?",
            "Was wünschst du dir als Geschenk?",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Dein Geburtstag\n\nLiebe Julia,\n\nvielen Dank für deine Einladung zu deinem 30. Geburtstag! Ich habe mich sehr darüber gefreut.\nLeider kann ich am Samstag nicht kommen, weil ich an diesem Wochenende arbeiten muss. Eine Kollegin ist krank, und ich muss ihre Schicht übernehmen. Das tut mir wirklich leid.\nHast du vielleicht nächste Woche Zeit? Wir könnten am Mittwochabend zusammen essen gehen. Dann feiern wir noch einmal zu zweit.\nUnd sag mir bitte: Was wünschst du dir zum Geburtstag?\n\nIch wünsche dir eine tolle Feier!\n\nLiebe Grüße\nOlena`,
        [
          "Aufgabenbewältigung: Alle Punkte sind da und werden erklärt (Grund, genauer Vorschlag).",
          "Kommunikative Gestaltung: freundlicher Ton, klare Absätze, durchgehend „du“.",
          "Korrektheit: „weil“-Satz und Modalverben sind richtig. „könnten“ zeigt B1.",
          "Wortschatz: passend und etwas mehr als das Nötige (Schicht übernehmen, zu zweit).",
        ],
        [],
      ],
    ],
  );

  add(
    "dtz-2/2.0/0",
    "dtz",
    80,
    [
      [
        "Grund für Ihr Schreiben",
        "kind|sohn|tochter|krank|fieber|kann nicht|arbeit",
      ],
      [
        "Wie lange Sie fehlen",
        "bis|tage|morgen|mittwoch|donnerstag|freitag|montag|woche",
      ],
      [
        "Wer Ihre Aufgaben übernehmen kann",
        "kolleg|übernehm|vertret|schicht|kasse|tausch",
      ],
      [
        "Frage nach der Krankmeldung für das Kind",
        "krankmeldung|bescheinigung|attest|arzt|schicken|brauchen sie",
      ],
    ],
    [
      [
        DTZ[0],
        `Hallo Herr Wagner,\nmein Kind krank. Ich komme heute nicht Arbeit. Ich bleibe zu Hause 2 Tage. Entschuldigung.\nAli`,
        [
          "Aufgabenbewältigung: Grund und Dauer stehen da. Die Vertretung und die Frage zur Krankmeldung fehlen.",
          "Kommunikative Gestaltung: „Hallo Herr Wagner“ ist für den Chef zu locker. Gruß fehlt.",
          "Korrektheit: Verb fehlt („mein Kind krank“), Präposition fehlt („nicht Arbeit“).",
          "Wortschatz: nur Grundwörter.",
        ],
        [
          ["Mein Kind krank.", "Mein Kind ist heute Morgen krank geworden."],
          [
            "Ich komme heute nicht Arbeit.",
            "Deshalb kann ich heute nicht zur Arbeit kommen.",
          ],
        ],
      ],
      [
        DTZ[1],
        `Sehr geehrter Herr Wagner,\n\nmein Sohn ist krank, er hat Fieber. Deshalb ich kann heute und morgen nicht arbeiten. Ich muss mit ihm zum Arzt gehen.\nFrau Petrova kann meine Arbeit machen, ich habe sie gefragt.\nBrauchen Sie eine Krankmeldung von mein Kind?\n\nMit freundlichen Grüßen\nAli Karimi`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind kurz bearbeitet.",
          "Kommunikative Gestaltung: Anrede und Gruß sind richtig formell. Betreff fehlt.",
          "Korrektheit: Nach „deshalb“ kommt das Verb („Deshalb kann ich“). „von mein Kind“ braucht Dativ.",
          "Wortschatz: reicht aus, „Arbeit machen“ ist ungenau.",
        ],
        [
          [
            "Deshalb ich kann heute und morgen nicht arbeiten.",
            "Deshalb kann ich heute und morgen nicht arbeiten.",
          ],
          [
            "Brauchen Sie eine Krankmeldung von mein Kind?",
            "Brauchen Sie eine Krankmeldung für mein Kind?",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Krankmeldung – mein Kind ist krank\n\nSehr geehrter Herr Wagner,\n\nleider kann ich heute nicht zur Arbeit kommen, weil mein Sohn heute Morgen krank geworden ist. Er hat hohes Fieber, und ich muss mit ihm zum Kinderarzt gehen.\nIch werde wahrscheinlich bis Mittwoch fehlen. Am Donnerstag bin ich wieder da.\nIch habe schon mit Frau Petrova telefoniert. Sie kann meine Schicht an der Kasse übernehmen.\nIch habe noch eine Frage: Brauchen Sie eine Bescheinigung vom Arzt für mein Kind? Wenn ja, bis wann soll ich sie abgeben?\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\nAli Karimi`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind genau beantwortet, die Frage ist sogar erweitert.",
          "Kommunikative Gestaltung: klarer Aufbau, höflicher Ton, passender Schluss.",
          "Korrektheit: „weil“-Satz mit Perfekt ist richtig. Futur mit „werde“ passt.",
          "Wortschatz: Arbeitswörter sind sicher (Schicht, übernehmen, Bescheinigung).",
        ],
        [],
      ],
    ],
  );

  add(
    "dtz-2/2.0/1",
    "dtz",
    80,
    [
      ["Grund für Ihr Schreiben", "lärm|laut|nachbar|musik|schreibe"],
      [
        "Was genau das Problem ist",
        "nacht|uhr|schlafen|musik|party|jede nacht|kinder",
      ],
      [
        "Was Sie schon gemacht haben",
        "gesprochen|gesagt|gefragt|geklingelt|zettel|schon",
      ],
      [
        "Bitte um Hilfe",
        "bitte|helfen|hilfe|könnten sie|hausordnung|sprechen sie",
      ],
    ],
    [
      [
        DTZ[0],
        `Guten Tag,\nNachbar ist laut. Jede Nacht Musik. Ich kann nicht schlafen. Ich sage Nachbar aber er macht wieder. Bitte helfen.\nDanke`,
        [
          "Aufgabenbewältigung: Man versteht das Problem. Wo der Nachbar wohnt und seit wann es laut ist, steht nicht da.",
          "Kommunikative Gestaltung: Anrede zu kurz, kein Gruß, kein Name. Die Hausverwaltung weiß nicht, wer schreibt.",
          "Korrektheit: Artikel fehlen. Vergangenheit fehlt („Ich sage“ statt „Ich habe … gesprochen“).",
          "Wortschatz: sehr wenig, aber die wichtigen Wörter sind da.",
        ],
        [
          [
            "Ich sage Nachbar aber er macht wieder.",
            "Ich habe schon mit dem Nachbarn gesprochen, aber es ist immer noch laut.",
          ],
          ["Bitte helfen.", "Bitte helfen Sie mir."],
        ],
      ],
      [
        DTZ[1],
        `Sehr geehrte Damen und Herren,\n\nich habe ein Problem mit meine Nachbarn. Sie wohnen über mir. Seit drei Wochen sie machen jede Nacht Lärm. Sie hören laute Musik bis 2 Uhr. Ich kann nicht schlafen und ich muss früh aufstehen.\nIch habe mit die Nachbarn gesprochen, aber sie sind immer laut.\nBitte helfen Sie mir.\n\nMit freundlichen Grüßen\nMila Petrova`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind da. Die Bitte ist sehr allgemein.",
          "Kommunikative Gestaltung: guter Aufbau mit Anrede und Gruß. „aber“ verbindet zwei Sätze.",
          "Korrektheit: Nach „mit“ steht Dativ („mit meinen Nachbarn“). Nach „Seit drei Wochen“ kommt zuerst das Verb.",
          "Wortschatz: passt zur Situation.",
        ],
        [
          [
            "Seit drei Wochen sie machen jede Nacht Lärm.",
            "Seit drei Wochen machen sie jede Nacht Lärm.",
          ],
          [
            "Bitte helfen Sie mir.",
            "Könnten Sie bitte mit den Nachbarn sprechen?",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Lärm in der Nacht, Lindenweg 4\n\nSehr geehrte Damen und Herren,\n\nich wohne im Lindenweg 4 im zweiten Stock und schreibe Ihnen, weil es in unserem Haus ein Problem gibt.\nSeit drei Wochen ist es in der Wohnung über mir jede Nacht sehr laut. Die Nachbarn hören bis zwei Uhr Musik und laufen mit Schuhen durch die Wohnung. Meine Kinder können nicht schlafen.\nIch habe schon zweimal mit den Nachbarn gesprochen. Sie haben gesagt, dass sie leiser sein wollen, aber nichts hat sich geändert.\nDeshalb bitte ich Sie um Hilfe. Könnten Sie den Nachbarn bitte einen Brief schreiben?\n\nMit freundlichen Grüßen\nMila Petrova`,
        [
          "Aufgabenbewältigung: Alle Punkte sind genau beschrieben (wo, seit wann, was schon passiert ist).",
          "Kommunikative Gestaltung: Betreff, Absätze, höfliche Bitte mit „Könnten Sie …?“.",
          "Korrektheit: „weil“ und „dass“ mit Verb am Ende, Perfekt richtig.",
          "Wortschatz: passend, mit einer festen Wendung („nichts hat sich geändert“).",
        ],
        [],
      ],
    ],
  );

  add(
    "dtz-3/2.0/0",
    "dtz",
    80,
    [
      ["Grund für Ihr Schreiben", "kurs|nächste woche|kann nicht|kommen|fehle"],
      [
        "Warum Sie nicht kommen können",
        "weil|arbeit|termin|krank|arzt|reise|muss",
      ],
      [
        "Bitte um Unterlagen und Hausaufgaben",
        "unterlagen|hausaufgabe|material|blätter|arbeitsblätter|schicken|aufgaben",
      ],
      ["Frage nach dem nächsten Test", "test|prüfung|wann"],
    ],
    [
      [
        DTZ[0],
        `Hallo Frau Demir,\nich komme nicht nächste Woche. Ich habe Termin. Bitte Hausaufgabe geben. Wann Test?\nDanke\nYusuf`,
        [
          "Aufgabenbewältigung: Alle vier Punkte haben je ein paar Wörter. Das ist sehr knapp, aber vorhanden.",
          "Kommunikative Gestaltung: wie eine SMS. Es fehlen ganze Sätze und ein Gruß.",
          "Korrektheit: Fragen und Bitten haben kein Verb an der richtigen Stelle („Wann Test?“).",
          "Wortschatz: sehr wenig.",
        ],
        [
          [
            "Bitte Hausaufgabe geben.",
            "Können Sie mir bitte die Hausaufgaben schicken?",
          ],
          ["Wann Test?", "Wann ist der nächste Test?"],
        ],
      ],
      [
        DTZ[1],
        `Liebe Frau Demir,\n\nich kann nächste Woche nicht zum Kurs kommen. Ich muss arbeiten, weil mein Chef hat mir eine andere Schicht gegeben.\nKönnen Sie mir bitte die Unterlagen schicken? Ich will die Hausaufgaben zu Hause machen.\nIch habe eine Frage: Wann wir schreiben den Test?\n\nViele Grüße\nYusuf Demirci`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind klar bearbeitet.",
          "Kommunikative Gestaltung: freundlich und höflich, gute Reihenfolge. Betreff fehlt.",
          "Korrektheit: Im „weil“-Satz steht das Verb nicht am Ende. In der Frage steht das Verb nicht auf Position 2.",
          "Wortschatz: passt gut zum Thema Kurs.",
        ],
        [
          [
            "…, weil mein Chef hat mir eine andere Schicht gegeben.",
            "…, weil mein Chef mir eine andere Schicht gegeben hat.",
          ],
          [
            "Wann wir schreiben den Test?",
            "Wann schreiben wir den nächsten Test?",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Kurs „Computer für Anfänger“ – nächste Woche\n\nLiebe Frau Demir,\n\nleider kann ich nächste Woche nicht zum Kurs kommen. Ich habe eine neue Arbeit gefunden und muss in der ersten Woche jeden Abend bis 20 Uhr arbeiten.\nDer Kurs ist mir aber sehr wichtig. Könnten Sie mir deshalb bitte die Unterlagen per E-Mail schicken? Ich möchte auch die Hausaufgaben machen, damit ich nichts verpasse.\nAußerdem habe ich noch eine Frage: Wann schreiben wir den nächsten Test? Ich hoffe, dass ich dann wieder da bin.\n\nVielen Dank für Ihre Hilfe!\n\nViele Grüße\nYusuf Demirci`,
        [
          "Aufgabenbewältigung: Alle Punkte sind mit Grund und Detail beantwortet.",
          "Kommunikative Gestaltung: guter Aufbau, verbunden mit aber, deshalb, außerdem, damit.",
          "Korrektheit: Nebensätze mit „damit“ und „dass“ stimmen. Sie-Form durchgehend.",
          "Wortschatz: sicher, mit „verpassen“ und „per E-Mail schicken“.",
        ],
        [],
      ],
    ],
  );

  add(
    "dtz-3/2.0/1",
    "dtz",
    80,
    [
      [
        "Grund für Ihr Schreiben",
        "heizung|kalt|funktioniert nicht|kaputt|kinderzimmer",
      ],
      [
        "Was Sie schon gemacht haben",
        "schon|versucht|angerufen|hausmeister|gedreht|entlüft|geprüft|probiert",
      ],
      [
        "Bitte um schnelle Reparatur",
        "reparier|reparatur|bitte|schnell|handwerker",
      ],
      [
        "Wann ein Handwerker kommen kann",
        "zu hause|ab |uhr|vormittag|nachmittag|montag|dienstag|mittwoch|donnerstag|freitag|termin",
      ],
    ],
    [
      [
        DTZ[0],
        `Hallo Herr Becker,\ndie Heizung ist kaputt in Kinderzimmer. Es ist kalt. Mein Kind ist krank. Bitte kommen schnell.\nFatima`,
        [
          "Aufgabenbewältigung: Grund und Bitte sind da. Was die Person schon gemacht hat und wann jemand kommen kann, fehlt.",
          "Kommunikative Gestaltung: Anrede für den Vermieter zu locker, kein Gruß, nur Vorname.",
          "Korrektheit: Artikel fehlt („in Kinderzimmer“), Bitte ohne „Sie“.",
          "Wortschatz: Grundwörter, „Handwerker“ und „reparieren“ fehlen.",
        ],
        [
          [
            "Die Heizung ist kaputt in Kinderzimmer.",
            "Die Heizung im Kinderzimmer ist kaputt.",
          ],
          [
            "Bitte kommen schnell.",
            "Bitte schicken Sie schnell einen Handwerker.",
          ],
        ],
      ],
      [
        DTZ[1],
        `Sehr geehrter Herr Becker,\n\nseit eine Woche die Heizung im Kinderzimmer funktioniert nicht. Es ist sehr kalt im Zimmer. Ich habe die Heizung an und aus gemacht, aber sie ist kalt.\nBitte reparieren Sie die Heizung schnell. Ich bin zu Hause am Montag und Dienstag.\n\nMit freundlichen Grüßen\nFatima Rahimi`,
        [
          "Aufgabenbewältigung: Alle vier Punkte sind da, auch der Termin.",
          "Kommunikative Gestaltung: formelle Anrede und Gruß stimmen. Wenig Verbindungen zwischen den Sätzen.",
          "Korrektheit: Satzanfang mit Zeit: danach kommt das Verb. „seit eine Woche“ braucht Dativ.",
          "Wortschatz: „an und aus gemacht“ ist verständlich, aber einfach.",
        ],
        [
          [
            "Seit eine Woche die Heizung im Kinderzimmer funktioniert nicht.",
            "Seit einer Woche funktioniert die Heizung im Kinderzimmer nicht.",
          ],
          [
            "Ich bin zu Hause am Montag und Dienstag.",
            "Am Montag und Dienstag bin ich ab 14 Uhr zu Hause.",
          ],
        ],
      ],
      [
        DTZ[2],
        `Betreff: Heizung im Kinderzimmer defekt\n\nSehr geehrter Herr Becker,\n\nich schreibe Ihnen, weil die Heizung im Kinderzimmer seit einer Woche nicht mehr funktioniert. Das Zimmer ist sehr kalt, und meine Tochter muss im Wohnzimmer schlafen.\nIch habe schon versucht, die Heizung zu entlüften, aber das hat leider nicht geholfen. Auch der Hausmeister konnte den Fehler nicht finden.\nDeshalb bitte ich Sie, die Heizung so schnell wie möglich reparieren zu lassen. Ein Handwerker kann am Montag oder Dienstag ab 14 Uhr kommen. Dann bin ich zu Hause.\n\nVielen Dank im Voraus.\n\nMit freundlichen Grüßen\nFatima Rahimi`,
        [
          "Aufgabenbewältigung: Alle Punkte sind vollständig, mit zwei Dingen, die schon versucht wurden.",
          "Kommunikative Gestaltung: Betreff, klare Absätze, höflicher Ton.",
          "Korrektheit: Infinitiv mit „zu“ und „weil“-Satz sind richtig.",
          "Wortschatz: genau (entlüften, reparieren lassen, Fehler finden).",
        ],
        [],
      ],
    ],
  );

  /*@@MORE@@*/

  /* ================= Rendering ================= */
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const para = (s) =>
    String(s)
      .split(/\n{2,}/)
      .map((b) => `<p>${esc(b).replace(/\n/g, "<br>")}</p>`)
      .join("");
  const wc = (s) =>
    (String(s).match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu) || []).length;
  let uid = 0;
  function html(key) {
    const t = T[key];
    if (!t) return "";
    const id = `mu${++uid}`;
    const tabs = t.s
      .map(
        ([lv], i) =>
          `<button type="button" class="mu-tab" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}" data-mu="${i}">${esc(lv)}</button>`,
      )
      .join("");
    const panels = t.s
      .map(
        (
          [lv, text, com, fix],
          i,
        ) => `<div class="mu-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}" ${i ? "hidden" : ""}>
        <p class="mu-lv">Beispiel: <b>${esc(lv)}</b> <span>· ${wc(text)} Wörter</span></p>
        <div class="mu-text" lang="de">${para(text)}</div>
        <p class="mu-h">Kommentar wie von einem Prüfer</p>
        <ul class="mu-com">${com
          .map((c) => {
            const k = c.indexOf(": ");
            return `<li>${k > 0 && k < 40 ? `<b>${esc(c.slice(0, k))}:</b>${esc(c.slice(k + 1))}` : esc(c)}</li>`;
          })
          .join("")}</ul>
        ${fix && fix.length ? `<p class="mu-h">${esc(FIX[t.ex] || FIX.ueben)}</p><ul class="mu-fix">${fix.map(([a, b]) => `<li><span class="mu-bad">✗ ${esc(a)}</span><span class="mu-good">✓ ${esc(b)}</span></li>`).join("")}</ul>` : ""}
      </div>`,
      )
      .join("");
    return `<details class="mu-box sim-det" data-mukey="${esc(key)}"><summary>Bewertete Beispiele: 3 Texte mit Kommentar</summary>
      <p class="mu-note">Beispieltexte und Kommentare: eigene Beispiele im Stil der Prüfung, keine offizielle Bewertung.</p>
      <p class="dm-small">Lies zuerst den schwachen Text. Vergleiche dann mit deinem Text. ${esc(CRIT[t.ex] || CRIT.ueben)}</p>
      <div class="mu-tabs" role="tablist" aria-label="Beispieltexte">${tabs}</div>${panels}</details>`;
  }
  /* tabs: one delegated listener for all boxes */
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest?.(".mu-tab");
    if (!b) return;
    const box = b.closest(".mu-box");
    if (!box) return;
    box
      .querySelectorAll(".mu-tab")
      .forEach((x) => x.setAttribute("aria-selected", x === b));
    box.querySelectorAll(".mu-panel").forEach((p, i) => {
      p.hidden = i !== +b.dataset.mu;
    });
  });
  function mount(el, key) {
    if (!el || !T[key]) return false;
    el.insertAdjacentHTML("beforeend", html(key));
    return true;
  }
  /* Writing practice (#ueben/schreiben/<Level>/<n>): site.js has no hook yet -> add the block after the model answer.
     If site.js renders DMMuster.html() itself later, the block is already there and nothing is added twice. */
  const uebenKey = () => {
    const p = location.hash.slice(1).split("/");
    return p[0] === "ueben" && p[1] === "schreiben"
      ? `ueben/${/^(A1|A2|B1|B2)$/.test(p[2]) ? p[2] : "A1"}/${Math.max(0, Number(p[3]) || 0)}`
      : null;
  };
  function autoMount() {
    const key = uebenKey();
    if (!key || !T[key]) return;
    const ta = document.querySelector("main #dm-draft");
    if (!ta) return;
    const card = ta.closest("section") || ta.parentNode;
    const old = card.querySelector(".mu-box");
    if (old) {
      if (old.dataset.mukey === key) return;
      old.remove();
    }
    const model = [...card.querySelectorAll("details")].find(
      (d) => !d.classList.contains("mu-box"),
    );
    if (model) model.insertAdjacentHTML("afterend", html(key));
    else mount(card, key);
  }
  let amT = null;
  const amSoon = () => {
    clearTimeout(amT);
    amT = setTimeout(autoMount, 60);
  };
  new MutationObserver(amSoon).observe(
    document.querySelector("main") || document.body,
    { childList: true },
  );
  window.addEventListener("hashchange", amSoon);
  amSoon();

  window.DMMuster = {
    html,
    mount,
    has: (key) => !!T[key],
    task: (key) => {
      const t = T[key];
      return t
        ? {
            target: t.target,
            leitpunkte: t.lp.map(([label, kw]) => ({
              label,
              kw: kw.split("|"),
            })),
          }
        : null;
    },
    uebenKey,
    keys: () => Object.keys(T),
    _data: T,
  };
})();
