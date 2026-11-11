// Second check (consistency, level, language): 2026-11-11.
/* Graded sample answers ("Bewertete Musterantworten") for all free-writing tasks.
   Lazy-loaded for routes "simulation" and "ueben" (see lazy.js).

   STATUS: DRAFTS, second check done. Every task carries review: false (= second check done on
   2026-11-11; review: true would mean "not re-checked yet") – the owner (licensed examiner) must read
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
    T[key] = { ex, target, lp, s, review: false };
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
      "Kriterien bei telc B1: Aufgabenbewältigung (vier Leitpunkte), kommunikative Gestaltung, formale Richtigkeit.",
    "telc-b2":
      "Kriterien bei telc B2: Aufgabenbewältigung, kommunikative Gestaltung, formale Richtigkeit.",
    "dtb-b1":
      "Kriterien im DTB: kommunikative Aufgabenbewältigung (Inhalt), kommunikative Gestaltung, formale Richtigkeit, Spektrum sprachlicher Mittel.",
    "dtb-b2":
      "Kriterien im DTB: kommunikative Aufgabenbewältigung (Inhalt), kommunikative Gestaltung, formale Richtigkeit, Spektrum sprachlicher Mittel.",
    ueben: "Ich schaue auf Inhalt und Sprache, bei Briefen und E-Mails auch auf den Aufbau (Anrede, Gruß, Reihenfolge).",
  };

  /* ================= DTZ ================= */
  const DTZ = ["unter A2", "A2", "B1"];

  add(
    "dtz-2/2.0/0",
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
          "Aufgabenbewältigung: Alle vier Punkte sind da. Die Bitte und die Frage sind aber nur je ein kurzer Satz.",
          "Kommunikative Gestaltung: Anrede und Gruß passen. Die Sätze sind nur mit „weil“ und „und“ verbunden. Der Betreff fehlt.",
          "Korrektheit: Nach „weil“ steht das Verb nicht am Ende. „seit eine Woche“ braucht Dativ. Im Gruß fehlt ein „n“ („Grüßen“).",
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
    "dtz-2/2.0/1",
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
          "Aufgabenbewältigung: Zu allen Punkten steht ein Wort oder ein kurzer Satz. Das ist ein Anfang, aber noch viel zu kurz.",
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
    "dtz-3/2.0/0",
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
          ["mein Kind krank.", "Mein Kind ist heute Morgen krank geworden."],
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
    "dtz-3/2.0/1",
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
    "dtz/2.0/0",
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
      ["Frage nach dem nächsten Test", "test|prüfung|klausur"],
    ],
    [
      [
        DTZ[0],
        `Hallo Frau Demir,\nich komme nicht nächste Woche. Ich habe Termin. Bitte Hausaufgabe geben. Wann Test?\nDanke\nYusuf`,
        [
          "Aufgabenbewältigung: Alle vier Punkte haben je ein paar Wörter. Das ist sehr knapp, aber vorhanden.",
          "Kommunikative Gestaltung: wie eine SMS. Es fehlen ganze Sätze und ein Gruß.",
          "Korrektheit: In der Frage fehlt das Verb („Wann Test?“). In der Bitte fehlt „Sie“ („Bitte Hausaufgabe geben“).",
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
    "dtz/2.0/1",
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
        "zu hause|uhr|vormittag|nachmittag|montag|dienstag|mittwoch|donnerstag|freitag|termin",
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
            "die Heizung ist kaputt in Kinderzimmer.",
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
            "seit eine Woche die Heizung im Kinderzimmer funktioniert nicht.",
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

/* ================= telc Deutsch B1 ================= */
const PASS = ["nicht bestanden", "knapp bestanden", "gut"];

add(
  "telc-b1/2.0/0",
  "telc-b1",
  100,
  [
    [
      "Dank und Glückwunsch",
      "dank|glückwunsch|gratulier|freue mich|freut mich",
    ],
    [
      "Grund, warum Sie nicht kommen können",
      "leider|weil|kann nicht|arbeiten|urlaub|termin|reise|prüfung",
    ],
    [
      "Vorschlag für ein Treffen zu einem anderen Termin",
      "treffen|besuch|wochenende|juli|august|später|danach|vielleicht|könnten wir",
    ],
    ["Frage nach einem Geschenkwunsch", "geschenk|wünsch|wunsch|schenken"],
  ],
  [
    [
      PASS[0],
      `Hallo Clara,\n\ndanke für E-Mail. Du heiratest, das ist super! Ich kann nicht kommen zu Hochzeit. Ich habe Arbeit am 13 Juni. Schade.\nWas möchtest du Geschenk?\n\nTschüss\nDaria`,
      [
        "Leitpunkte: Drei Punkte sind sehr kurz da. Der Vorschlag für ein anderes Treffen fehlt ganz.",
        "Kommunikative Gestaltung: Der Text ist viel zu kurz (etwa 30 Wörter). Die Sätze stehen ohne Verbindung nebeneinander.",
        "Formale Richtigkeit: Artikel und Präpositionen fehlen oft. Die Wortstellung stimmt mehrmals nicht.",
      ],
      [
        [
          "Ich kann nicht kommen zu Hochzeit. Ich habe Arbeit am 13 Juni.",
          "Leider kann ich nicht zu eurer Hochzeit kommen, weil ich am 13. Juni arbeiten muss.",
        ],
        [
          "(fehlt)",
          "Vielleicht können wir uns im Juli treffen? Dann besuche ich euch in Lübeck.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Clara,\n\nvielen Dank für deine E-Mail. Ich habe mich sehr gefreut und ich gratuliere dir und Tobias zur Hochzeit!\nLeider ich kann am 13. Juni nicht kommen. An diesem Tag meine Schwester hat ihre Abschlussprüfung und ich habe versprochen, dass ich komme zu ihr. Das tut mir sehr leid.\nAber ich möchte euch gern sehen. Vielleicht ich kann euch im Juli besuchen? Dann ihr könnt mir die Fotos zeigen.\nIch habe noch eine Frage: Was wünscht ihr euch für Geschenk? Ich möchte etwas kaufen, was ihr braucht.\n\nViele Grüße\nDaria`,
      [
        "Leitpunkte: Alle vier Punkte sind bearbeitet, jeder mit ein bis zwei Sätzen.",
        "Kommunikative Gestaltung: Anrede, Gruß und Reihenfolge passen. Der Ton ist herzlich. Es gibt ein paar Verbindungen (und, aber, dass).",
        "Formale Richtigkeit: Viele Fehler bei der Verbposition („Leider ich kann“, „Dann ihr könnt“). Man versteht aber alles sofort.",
      ],
      [
        [
          "Leider ich kann am 13. Juni nicht kommen.",
          "Leider kann ich am 13. Juni nicht kommen.",
        ],
        ["…, dass ich komme zu ihr.", "…, dass ich zu ihr komme."],
      ],
    ],
    [
      PASS[2],
      `Liebe Clara,\n\nvielen Dank für deine E-Mail – was für eine schöne Nachricht! Ich gratuliere dir und Tobias ganz herzlich und freue mich sehr für euch.\nLeider kann ich am 13. Juni nicht nach Lübeck kommen. Genau an diesem Wochenende hat meine Schwester ihre Abschlussfeier in München, und ich habe ihr schon vor Monaten versprochen, dass ich dabei bin. Es tut mir wirklich leid, denn ich wäre sehr gern gekommen.\nIch würde euch aber gern bald besuchen. Wie wäre es mit einem Wochenende im Juli? Dann könnt ihr mir die Fotos zeigen und alles erzählen.\nNoch eine Frage: Habt ihr einen Geschenkwunsch? Oder gibt es vielleicht eine Liste?\n\nIch wünsche euch eine wunderschöne Feier!\n\nLiebe Grüße\nDaria`,
      [
        "Leitpunkte: Alle vier Punkte sind ausführlich und persönlich bearbeitet.",
        "Kommunikative Gestaltung: sehr guter Aufbau, natürliche Übergänge, passender Ton für eine Freundin.",
        "Formale Richtigkeit: sicher und ohne Fehler. Nebensätze und Konjunktiv II („wäre … gekommen“, „würde“) stimmen.",
      ],
      [],
    ],
  ],
);

add(
  "telc-b1/2.0/1",
  "telc-b1",
  100,
  [
    [
      "Grund für Ihr Schreiben",
      "anzeige|gelesen|interessiere|interesse|schreibe",
    ],
    [
      "Öffnungszeiten und Kurszeiten",
      "geöffnet|öffnungszeit|uhr|kurs|yoga|rückentraining|abends|wochenende|wann",
    ],
    [
      "Preise und Ermäßigungen",
      "preis|kostet|kosten|monat|ermäßigung|rabatt|student|günstig",
    ],
    [
      "Termin für ein Probetraining",
      "probetraining|termin|ausprobieren|vorbeikommen|testen",
    ],
  ],
  [
    [
      PASS[0],
      `Hallo,\n\nich habe Ihre Anzeige gelesen. Ich will Sport machen. Wann ist offen? Was kostet? Ich will Probetraining machen am Montag.\n\nDanke\nMarek Nowak`,
      [
        "Leitpunkte: Alle Punkte sind nur mit einer kurzen Frage angetippt. Kurszeiten und Ermäßigungen fehlen.",
        "Kommunikative Gestaltung: viel zu kurz, Anrede und Gruß passen nicht zu einem formellen Brief. „Ich will“ klingt unhöflich.",
        "Formale Richtigkeit: Fragen ohne Subjekt („Was kostet?“).",
      ],
      [
        [
          "Wann ist offen? Was kostet?",
          "Wann haben Sie geöffnet, und wie viel kostet die Mitgliedschaft im Monat?",
        ],
        [
          "Ich will Probetraining machen am Montag.",
          "Ich möchte gern am Montag ein Probetraining machen.",
        ],
      ],
    ],
    [
      PASS[1],
      `Sehr geehrte Damen und Herren,\n\nich habe in der Zeitung Ihre Anzeige gelesen und ich interessiere mich für Ihr Fitnessstudio. Ich bin neu in Gelsenkirchen und ich möchte wieder Sport machen.\nIch habe paar Fragen. Wann ist das Studio geöffnet? Ich arbeite bis 18 Uhr, deshalb ich kann nur am Abend kommen. Gibt es Yoga am Abend?\nWie viel kostet es pro Monat? Gibt es eine Ermäßigung für Studenten?\nIch möchte auch ein Probetraining machen. Kann ich nächste Woche kommen?\n\nIch freue mich auf Ihre Antwort.\n\nMit freundlichen Grüße\nMarek Nowak`,
      [
        "Leitpunkte: Alle vier Punkte sind bearbeitet.",
        "Kommunikative Gestaltung: richtige Anrede, Einleitung und Schlusssatz. Viele einzelne Fragen hintereinander – das wirkt wie eine Liste.",
        "Formale Richtigkeit: Fehler bei „deshalb“ + Verb, „paar Fragen“, „Grüße“. Der Text bleibt gut verständlich.",
      ],
      [
        [
          "…, deshalb ich kann nur am Abend kommen.",
          "…, deshalb kann ich nur am Abend kommen.",
        ],
        [
          "Wie viel kostet es pro Monat?",
          "Könnten Sie mir bitte schreiben, wie viel die Mitgliedschaft pro Monat kostet?",
        ],
      ],
    ],
    [
      PASS[2],
      `Sehr geehrte Damen und Herren,\n\nin der Zeitung habe ich Ihre Anzeige gelesen. Da ich vor Kurzem nach Gelsenkirchen gezogen bin und wieder regelmäßig Sport machen möchte, interessiere ich mich sehr für Ihr Studio.\nZuerst würde ich gern wissen, wann Sie geöffnet haben. Ich arbeite meistens bis 18 Uhr und könnte deshalb nur abends oder am Wochenende trainieren. Finden die Yoga- und Rückenkurse auch nach 18 Uhr statt?\nAußerdem möchte ich fragen, wie viel die Mitgliedschaft kostet und ob es eine Ermäßigung für Auszubildende gibt.\nGern würde ich das Studio bei einem Probetraining kennenlernen. Wäre das am kommenden Samstag möglich?\n\nÜber eine baldige Antwort würde ich mich freuen.\n\nMit freundlichen Grüßen\nMarek Nowak`,
      [
        "Leitpunkte: Alle Punkte sind genau und mit eigenen Details bearbeitet.",
        "Kommunikative Gestaltung: klare Gliederung (zuerst, außerdem), höflicher Ton, indirekte Fragen.",
        "Formale Richtigkeit: sicher, auch bei „da“-Satz und indirekten Fragen mit „ob“ und „wann“.",
      ],
      [],
    ],
  ],
);

add(
  "telc-b1-2/2.0/0",
  "telc-b1",
  100,
  [
    [
      "Glückwunsch zur neuen Stelle",
      "glückwunsch|gratulier|freue mich|freut mich|toll|super",
    ],
    [
      "ob und wie Sie beim Umzug helfen können",
      "helfen|hilfe|umzug|auto|tragen|kartons|packen|zeit",
    ],
    [
      "Interesse an einem Möbelstück",
      "möbel|sofa|tisch|schrank|regal|bett|kaufen|preis|kostet",
    ],
    [
      "Vorschlag für einen Besuch in Salzburg",
      "besuch|salzburg|sommer|urlaub|kommen|wochenende",
    ],
  ],
  [
    [
      PASS[0],
      `Hallo Paul,\n\ndu hast Arbeit gefunden, gut. Ich habe Zeit, ich helfe dir. Ich brauche Tisch. Hast du Tisch? Ich komme Salzburg.\n\nTschüss\nIvan`,
      [
        "Leitpunkte: Zu jedem Punkt gibt es nur ein paar Wörter. Wie er hilft und wann er nach Salzburg kommt, bleibt offen.",
        "Kommunikative Gestaltung: viel zu kurz, keine Einleitung, keine Verbindungen. Der Glückwunsch klingt kühl.",
        "Formale Richtigkeit: Artikel fehlen fast immer, Präposition fehlt („komme Salzburg“).",
      ],
      [
        [
          "du hast Arbeit gefunden, gut.",
          "Herzlichen Glückwunsch zu deiner neuen Stelle!",
        ],
        [
          "Ich komme Salzburg.",
          "Ich möchte dich im Sommer gern in Salzburg besuchen.",
        ],
      ],
    ],
    [
      PASS[1],
      `Hallo Paul,\n\ndanke für deine E-Mail. Herzlichen Glückwunsch für die neue Stelle! Das ist eine tolle Nachricht.\nNatürlich ich helfe dir beim Umzug. Am letzten Maiwochenende habe ich Zeit. Ich kann mit mein Auto kommen und wir können die Kartons zusammen tragen.\nDu verkaufst deine Möbel. Ich suche ein Sofa, weil mein Sofa ist sehr alt. Wie viel kostet dein Sofa?\nIch will dich auch in Salzburg besuchen. Vielleicht im August, wenn ich habe Urlaub.\n\nViele Grüße\nIvan`,
      [
        "Leitpunkte: Alle vier Punkte sind bearbeitet, mit konkreten Angaben.",
        "Kommunikative Gestaltung: passende Anrede, Einleitung und Gruß. Der Text hat eine klare Reihenfolge.",
        "Formale Richtigkeit: Das Verb steht mehrmals falsch („Natürlich ich helfe“, „weil mein Sofa ist“, „wenn ich habe“). Der Dativ nach „mit“ fehlt („mit mein Auto“).",
      ],
      [
        [
          "Ich suche ein Sofa, weil mein Sofa ist sehr alt.",
          "Ich suche ein Sofa, weil mein Sofa sehr alt ist.",
        ],
        [
          "Vielleicht im August, wenn ich habe Urlaub.",
          "Vielleicht im August, wenn ich Urlaub habe.",
        ],
      ],
    ],
    [
      PASS[2],
      `Hallo Paul,\n\nvielen Dank für deine E-Mail. Herzlichen Glückwunsch zur neuen Stelle – Koch in einem Hotel in Salzburg, das klingt wirklich toll! Ich freue mich sehr für dich.\nNatürlich helfe ich dir beim Umzug. Am letzten Maiwochenende habe ich Zeit, und ich kann den Transporter von meinem Bruder mitbringen. Dann müssen wir nicht so oft fahren.\nDu schreibst, dass du deine Möbel verkaufen möchtest. Ich hätte Interesse an deinem Bücherregal, weil ich in meiner neuen Wohnung noch keins habe. Was möchtest du dafür haben?\nUnd wenn du dich in Salzburg eingelebt hast, würde ich dich gern besuchen. Wie wäre es im August? Dann zeigst du mir die Stadt.\n\nBis bald und viele Grüße\nIvan`,
      [
        "Leitpunkte: Alle vier Punkte sind ausführlich bearbeitet und gut verbunden.",
        "Kommunikative Gestaltung: natürlicher, freundlicher Ton. Bezug auf Pauls E-Mail („Du schreibst, dass …“).",
        "Formale Richtigkeit: sicher in Haupt- und Nebensätzen, Konjunktiv II passt.",
      ],
      [],
    ],
  ],
);

add(
  "telc-b1-2/2.0/1",
  "telc-b1",
  100,
  [
    [
      "Grund für Ihr Schreiben",
      "anzeige|angemeldet|unzufrieden|nicht zufrieden|beschwer|schreibe",
    ],
    [
      "was nicht so war wie in der Anzeige",
      "geräte|kaputt|alt|betreuung|trainer|kostenlos|bezahl|rechnung|niemand",
    ],
    [
      "was Sie vom Studio erwarten",
      "erwarte|geld zurück|zurück|entschuldigung|reparier|möchte ich",
    ],
    ["Frage nach der Kündigung", "kündig|vertrag|beenden|frist"],
  ],
  [
    [
      PASS[0],
      `Hallo,\n\nich bin in Ihre Studio. Das Studio ist schlecht. Geräte sind kaputt und kein Trainer. Ich will mein Geld. Ich will kündigen.\n\nLena Petrova`,
      [
        "Leitpunkte: Zwei Punkte sind kurz genannt. Die Erwartung ist unklar, die Frage zur Kündigung ist keine Frage.",
        "Kommunikative Gestaltung: sehr kurz und unhöflich („Ich will mein Geld“). Kein Bezug zur Anzeige, kein Gruß.",
        "Formale Richtigkeit: Endungen und Artikel fehlen („in Ihre Studio“, „kein Trainer“ ohne Verb).",
      ],
      [
        [
          "Geräte sind kaputt und kein Trainer.",
          "Viele Geräte sind kaputt, und es gibt keinen Trainer.",
        ],
        ["Ich will kündigen.", "Wie kann ich meinen Vertrag kündigen?"],
      ],
    ],
    [
      PASS[1],
      `Sehr geehrte Damen und Herren,\n\nich habe Ihre Anzeige gelesen und ich habe mich im März angemeldet. Aber ich bin nicht zufrieden.\nIn der Anzeige steht, dass die Geräte sind modern. Aber zwei Laufbänder sind kaputt seit drei Wochen. Auch es gibt keine persönliche Betreuung, weil nur ein Trainer ist da. Und ich habe für den ersten Monat bezahlt, das war nicht kostenlos.\nIch möchte mein Geld für den ersten Monat zurück. Bitte reparieren Sie die Geräte.\nWie kann ich kündigen? Gibt es eine Frist?\n\nMit freundlichen Grüßen\nLena Petrova`,
      [
        "Leitpunkte: Alle vier Punkte sind klar bearbeitet, mit guten Beispielen.",
        "Kommunikative Gestaltung: sachlich und höflich, mit Bezug zur Anzeige. Ein Schlusssatz fehlt.",
        "Formale Richtigkeit: Verbposition nach „dass“, „weil“ und „Auch“ ist falsch. Der Inhalt bleibt klar.",
      ],
      [
        [
          "In der Anzeige steht, dass die Geräte sind modern.",
          "In der Anzeige steht, dass die Geräte modern sind.",
        ],
        [
          "Auch es gibt keine persönliche Betreuung, weil nur ein Trainer ist da.",
          "Außerdem gibt es keine persönliche Betreuung, weil nur ein Trainer da ist.",
        ],
      ],
    ],
    [
      PASS[2],
      `Sehr geehrte Damen und Herren,\n\nwegen Ihrer Anzeige „Fit in den Frühling“ habe ich mich im März in Ihrem Studio angemeldet. Leider bin ich sehr enttäuscht und möchte mich deshalb beschweren.\nIn der Anzeige versprechen Sie moderne Geräte und persönliche Betreuung. In Wirklichkeit sind zwei Laufbänder seit Wochen defekt, und für alle Mitglieder ist nur ein Trainer da, der kaum Zeit hat. Außerdem musste ich den ersten Monat bezahlen, obwohl er kostenlos sein sollte.\nIch erwarte, dass Sie mir den Beitrag für den ersten Monat zurückzahlen und die Geräte reparieren lassen.\nFalls sich nichts ändert, möchte ich den Vertrag beenden. Können Sie mir bitte mitteilen, wie und bis wann ich kündigen kann?\n\nIch bitte um eine schnelle Antwort.\n\nMit freundlichen Grüßen\nLena Petrova`,
      [
        "Leitpunkte: Alle Punkte sind vollständig und überzeugend bearbeitet.",
        "Kommunikative Gestaltung: klarer Aufbau, bestimmter und trotzdem höflicher Ton, guter Schluss.",
        "Formale Richtigkeit: sicher, auch bei „obwohl“, „falls“ und Relativsatz.",
      ],
      [],
    ],
  ],
);

/* ================= telc Deutsch B2 ================= */
add(
  "telc-b2/2.0/0",
  "telc-b2",
  150,
  [
    [
      "Termine und Ort der Präsenztage",
      "präsenz|termin|an welchen tagen|an welchem ort|stattfinden|wann|düsseldorf|wochenende|samstag",
    ],
    [
      "Voraussetzungen für die Teilnahme",
      "voraussetzung|vorkenntnis|erfahrung|abschluss|teilnehmen|teilnahme",
    ],
    [
      "Kosten und Fördermöglichkeiten",
      "kosten|kostet|gebühr|preis|förder|bildungsgutschein|raten|finanz",
    ],
    [
      "Anerkennung des Zertifikats",
      "anerkannt|anerkennung|anerkennen|ihk|akzeptier",
    ],
  ],
  [
    [
      PASS[0],
      `Guten Tag,\n\nich habe Ihre Anzeige gelesen. Ich interessiere mich für den Kurs Projektmanagement. Ich arbeite in einer Firma und mein Chef sagt, ich soll Projekte machen.\nWann sind die Präsenztage und wo? Ich arbeite von Montag bis Freitag. Was kostet der Kurs? Ist er teuer? Ich habe nicht viel Geld.\nBekomme ich ein Zertifikat?\nBitte schreiben Sie mir.\n\nMit freundlichen Grüßen\nAndrei Popescu`,
      [
        "Inhalt: Termine und Kosten werden gefragt, aber nur mit kurzen Fragen. „Bekomme ich ein Zertifikat?“ passt nicht zum Punkt „Anerkennung“ – dass es ein Zertifikat gibt, steht schon in der Anzeige. Es wird kaum erklärt, warum die Informationen wichtig sind.",
        "Kommunikative Gestaltung: etwa 65 Wörter – weniger als die Hälfte. Kein Betreff, einfache Sätze wie auf A2/B1, kein formeller Stil.",
        "Formale Richtigkeit: wenige Fehler, aber nur weil die Sätze sehr einfach sind. Nebensätze, Konjunktiv II und Passiv fehlen.",
      ],
      [
        [
          "Was kostet der Kurs? Ist er teuer?",
          "Könnten Sie mir bitte mitteilen, wie hoch die Lehrgangsgebühr ist und ob eine Ratenzahlung möglich ist?",
        ],
        [
          "Bekomme ich ein Zertifikat?",
          "Außerdem würde mich interessieren, ob das Zertifikat von Arbeitgebern anerkannt wird.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Lehrgang „Projektmanagement kompakt“\n\nSehr geehrte Damen und Herren,\n\nich habe Ihre Anzeige in einer Fachzeitschrift gelesen und interessiere mich für den Lehrgang. Ich arbeite seit drei Jahren in einem Logistikunternehmen und soll bald mehr Verantwortung für Projekte übernehmen. Deshalb ich möchte mich weiterbilden.\nZuerst möchte ich wissen, wann und wo die Präsenztage stattfinden. Ich arbeite in Schichten, deshalb ist das für mich wichtig zu planen.\nAußerdem habe ich eine Frage zu den Kosten. Wie viel kostet der Lehrgang und gibt es eine Förderung? Vielleicht mein Arbeitgeber kann einen Teil bezahlen.\nIch möchte auch wissen, ob das Zertifikat ist anerkannt bei anderen Firmen.\n\nIch freue mich auf Ihre Antwort.\n\nMit freundlichen Grüßen\nAndrei Popescu`,
      [
        "Inhalt: Drei Leitpunkte sind bearbeitet und kurz begründet. Das reicht für die Aufgabe.",
        "Kommunikative Gestaltung: Betreff, Einleitung, Gliederung und Schluss sind da. Der Wortschatz bleibt einfach („möchte … wissen“ zweimal). Mit etwa 115 Wörtern ist der Text zu kurz (Ziel: mindestens 150).",
        "Formale Richtigkeit: mehrere Fehler bei der Verbposition („Deshalb ich möchte“, „ob das Zertifikat ist anerkannt“). Sie stören das Lesen etwas.",
      ],
      [
        [
          "Ich möchte auch wissen, ob das Zertifikat ist anerkannt bei anderen Firmen.",
          "Darüber hinaus würde mich interessieren, ob das Zertifikat auch von anderen Unternehmen anerkannt wird.",
        ],
        [
          "Vielleicht mein Arbeitgeber kann einen Teil bezahlen.",
          "Möglicherweise würde mein Arbeitgeber einen Teil der Kosten übernehmen.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Anfrage zum Zertifikatslehrgang „Projektmanagement kompakt“\n\nSehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige in der Fachzeitschrift gelesen. Da ich in meinem Unternehmen demnächst die Leitung kleinerer Projekte übernehmen soll, suche ich eine berufsbegleitende Weiterbildung. Ihr Lehrgang scheint dafür sehr geeignet zu sein. Vor einer Anmeldung hätte ich jedoch noch einige Fragen.\n\nZunächst würde ich gern erfahren, an welchen Tagen und an welchem Ort die Präsenztage stattfinden. Da ich im Schichtdienst arbeite, müsste ich diese Termine frühzeitig mit meinem Vorgesetzten abstimmen.\n\nDarüber hinaus interessiert mich, wie hoch die Lehrgangsgebühr ist und ob es Fördermöglichkeiten gibt, zum Beispiel einen Bildungsgutschein. Wäre außerdem eine Zahlung in Raten möglich?\n\nSchließlich wüsste ich gern, ob das Zertifikat auch außerhalb Ihrer Akademie anerkannt wird, etwa von der IHK oder von anderen Arbeitgebern in der Region.\n\nFür Ihre Mühe bedanke ich mich im Voraus und freue mich auf Ihre Antwort.\n\nMit freundlichen Grüßen\nAndrei Popescu`,
      [
        "Inhalt: Drei Leitpunkte sind ausführlich bearbeitet und jeweils begründet. Die Einleitung nennt den Anlass.",
        "Kommunikative Gestaltung: klare Absätze, abwechslungsreiche Übergänge (zunächst, darüber hinaus, schließlich), durchgehend formeller Stil.",
        "Formale Richtigkeit: sehr sicher – indirekte Fragen, Konjunktiv II, Passiv. Kleine Fehler würden hier nicht mehr stören.",
      ],
      [],
    ],
  ],
);

add(
  "telc-b2/2.0/1",
  "telc-b2",
  150,
  [
    [
      "Was Sie gebucht hatten",
      "gebucht|busreise|prag|549|drei-sterne|katalog|stadtzentrum",
    ],
    [
      "Was nicht in Ordnung war",
      "hotel|schmutzig|weit|außerhalb|stadtführung|bootsfahrt|ausgefallen|nicht stattgefunden|laut",
    ],
    [
      "Welche Folgen das für Sie hatte",
      "deshalb musst|zusätzlich|taxi|selbst bezahl|verloren|enttäuscht|erholung|folge",
    ],
    [
      "Was Sie vom Reiseveranstalter erwarten",
      "erwarte|erstattung|zurück|entschädigung|preisminderung|prozent|anwalt|verbraucherzentrale",
    ],
  ],
  [
    [
      PASS[0],
      `Sehr geehrte Damen und Herren,\n\nich war mit Ihre Firma in Prag. Die Reise war sehr schlecht! Das Hotel war nicht im Zentrum und es war schmutzig. Wir haben keine Bootsfahrt gemacht. Der Bus war auch alt.\nIch bin sehr böse. Ich habe 549 Euro bezahlt und das ist viel Geld für mich. Ich will mein Geld zurück. Wenn nicht, ich gehe zu Anwalt.\n\nMit freundlichen Grüßen\nNadia Rahimi`,
      [
        "Inhalt: Die Probleme werden genannt, aber nicht erklärt. Welche Folgen es gab, fehlt. Die Forderung ist unklar (alles Geld?).",
        "Kommunikative Gestaltung: etwa 70 Wörter statt 150. Der Ton ist emotional („sehr böse“, Ausrufezeichen) statt sachlich. Betreff und Gliederung fehlen.",
        "Formale Richtigkeit: Fehler bei Endungen („mit Ihre Firma“) und im Bedingungssatz („Wenn nicht, ich gehe“).",
      ],
      [
        [
          "Ich bin sehr böse. … Ich will mein Geld zurück.",
          "Ich bin von dieser Reise sehr enttäuscht und erwarte, dass Sie mir einen Teil des Reisepreises erstatten.",
        ],
        [
          "Wenn nicht, ich gehe zu Anwalt.",
          "Sollte ich keine Antwort erhalten, werde ich mich an die Verbraucherzentrale wenden.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Beschwerde über die Busreise nach Prag\n\nSehr geehrte Damen und Herren,\n\nich habe bei Ihnen eine fünftägige Busreise nach Prag gebucht und 549 Euro bezahlt. Leider war die Reise nicht so, wie im Katalog beschrieben ist.\nIm Katalog steht, dass das Hotel im Stadtzentrum liegt. Aber das Hotel war 40 Minuten vom Zentrum und wir mussten jeden Tag mit der Straßenbahn fahren. Außerdem die Bootsfahrt auf der Moldau hat nicht stattgefunden, weil der Reiseleiter hat gesagt, es gibt keine Plätze mehr.\nDas war für uns sehr ärgerlich. Wir haben viel Zeit verloren und wir mussten die Fahrkarten selbst bezahlen.\nIch erwarte von Ihnen, dass Sie mir einen Teil von dem Geld zurückgeben. Ich warte auf Ihre Antwort bis Ende des Monats.\n\nMit freundlichen Grüßen\nNadia Rahimi`,
      [
        "Inhalt: Alle vier Leitpunkte sind bearbeitet und mit Beispielen erklärt.",
        "Kommunikative Gestaltung: Betreff, Einleitung und klare Reihenfolge. Der Ton ist sachlich. Die Verbindungen bleiben einfach (aber, außerdem, weil), und der Text ist mit etwa 125 Wörtern zu kurz (Ziel: mindestens 150).",
        "Formale Richtigkeit: Fehler bei der Verbposition nach „außerdem“ und „weil“. Für B2 sind das zu viele Grundfehler – deshalb nur knapp.",
      ],
      [
        [
          "Außerdem die Bootsfahrt auf der Moldau hat nicht stattgefunden, weil der Reiseleiter hat gesagt, es gibt keine Plätze mehr.",
          "Außerdem hat die Bootsfahrt auf der Moldau nicht stattgefunden, weil es laut dem Reiseleiter keine Plätze mehr gab.",
        ],
        [
          "…, dass Sie mir einen Teil von dem Geld zurückgeben.",
          "…, dass Sie mir mindestens 30 Prozent des Reisepreises erstatten.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Beschwerde über die Busreise nach Prag vom 12. bis 16. Mai\n\nSehr geehrte Damen und Herren,\n\nim Mai habe ich an Ihrer fünftägigen Busreise nach Prag teilgenommen, die ich für 549 Euro gebucht hatte. Laut Katalog sollten ein Drei-Sterne-Hotel im Stadtzentrum sowie eine Stadtführung und eine Bootsfahrt auf der Moldau im Preis enthalten sein. Leider entsprach die Reise in mehreren Punkten nicht dieser Beschreibung.\n\nDas Hotel lag nicht im Zentrum, sondern in einem Vorort, sodass wir täglich etwa 40 Minuten mit der Straßenbahn fahren mussten. Die Bootsfahrt wurde ohne Erklärung gestrichen, und die Stadtführung dauerte statt drei Stunden nur eine.\n\nDadurch haben wir nicht nur viel Zeit verloren, sondern mussten auch Fahrkarten und eine eigene Bootsfahrt bezahlen, was uns zusätzlich rund 60 Euro gekostet hat.\n\nIch erwarte daher, dass Sie mir 30 Prozent des Reisepreises sowie die zusätzlichen Kosten erstatten. Sollte ich bis zum 15. Juni keine Antwort erhalten, werde ich mich an die Verbraucherzentrale wenden.\n\nMit freundlichen Grüßen\nNadia Rahimi`,
      [
        "Inhalt: Alle vier Punkte sind genau, mit Zahlen und einer klaren Forderung mit Frist bearbeitet.",
        "Kommunikative Gestaltung: sachlich und bestimmt, logisch gegliedert, mit anspruchsvollen Verbindungen (sodass, nicht nur … sondern auch, dadurch).",
        "Formale Richtigkeit: sehr sicher – Plusquamperfekt, Passiv, Relativsatz, „Sollte ich …“.",
      ],
      [],
    ],
  ],
);

add(
  "telc-b2-2/2.0/0",
  "telc-b2",
  150,
  [
    [
      "Lage und Zustand des Hotels",
      "hotel|zentrum|stadtrand|schmutzig|zimmer|laut|bad|dusche",
    ],
    [
      "Probleme mit dem Programm bzw. der Reiseleitung",
      "reiseleiter|stadtführung|führung|schönbrunn|eintritt|deutsch|programm|ausgefallen",
    ],
    [
      "was Sie vom Reisebüro erwarten",
      "erwarte|erstattung|zurück|entschädigung|prozent|preisminderung",
    ],
    [
      "was passiert, wenn das Reisebüro nicht reagiert",
      "anwalt|verbraucherzentrale|bewertung|rechtliche schritte|sollte ich|falls|frist",
    ],
  ],
  [
    [
      PASS[0],
      `Hallo,\n\nich habe die Reise nach Wien gebucht für 790 Euro. Das war nicht gut. Das Hotel war weit weg vom Zentrum und mein Zimmer war nicht sauber. Der Reiseleiter hat nicht gut Deutsch gesprochen. Schloss Schönbrunn mussten wir bezahlen, das war nicht richtig.\nBitte geben Sie mir Geld zurück.\n\nGrüße\nOleksandr Kovalenko`,
      [
        "Inhalt: Zwei Punkte sind genannt, die Forderung ist sehr allgemein. Was passiert, wenn keine Antwort kommt, fehlt.",
        "Kommunikative Gestaltung: „Hallo“ und „Grüße“ passen nicht zu einer formellen Beschwerde. Etwa 55 Wörter, keine Absätze, einfache Hauptsätze.",
        "Formale Richtigkeit: wenige Fehler, aber das Niveau der Sätze ist B1, nicht B2.",
      ],
      [
        [
          "Das war nicht gut.",
          "Leider entsprach die Reise in mehreren Punkten nicht Ihrer Beschreibung.",
        ],
        [
          "Bitte geben Sie mir Geld zurück.",
          "Ich erwarte daher eine Erstattung von mindestens einem Drittel des Reisepreises.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Beschwerde Reise nach Wien\n\nSehr geehrte Damen und Herren,\n\nich habe bei Ihnen im Internet die Busreise „Wien entdecken“ gebucht. Ich bin mit der Reise sehr unzufrieden, weil viele Sachen waren anders als in der Beschreibung.\nErstens das Hotel war nicht im Zentrum. Wir haben am Stadtrand gewohnt und die Zimmer waren alt und nicht sauber. Zweitens gab es nicht jeden Tag eine Stadtführung, sondern nur zwei Mal. Der Reiseleiter konnte nur wenig Deutsch, deshalb wir haben fast nichts verstanden. Den Eintritt für Schloss Schönbrunn mussten wir selbst bezahlen.\nIch finde, das ist nicht in Ordnung. Ich möchte 300 Euro zurückbekommen.\nWenn Sie mir nicht antworten, ich werde eine schlechte Bewertung im Internet schreiben.\n\nMit freundlichen Grüßen\nOleksandr Kovalenko`,
      [
        "Inhalt: Alle vier Punkte sind bearbeitet, mit konkreten Beispielen und einer genauen Forderung.",
        "Kommunikative Gestaltung: Betreff, Gliederung mit „erstens/zweitens“, sachlicher Ton. Mit etwa 120 Wörtern zu kurz (Ziel: mindestens 150), Wortschatz eher einfach („viele Sachen“, „nicht in Ordnung“).",
        "Formale Richtigkeit: wiederholt falsche Verbposition („weil viele Sachen waren“, „deshalb wir haben“, „Wenn …, ich werde“).",
      ],
      [
        [
          "…, weil viele Sachen waren anders als in der Beschreibung.",
          "…, weil vieles nicht der Beschreibung entsprach.",
        ],
        [
          "Wenn Sie mir nicht antworten, ich werde eine schlechte Bewertung im Internet schreiben.",
          "Sollte ich bis Ende des Monats keine Antwort erhalten, werde ich mich an die Verbraucherzentrale wenden.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Beschwerde über die Busreise „Wien entdecken“\n\nSehr geehrte Damen und Herren,\n\nvor zwei Wochen habe ich an Ihrer Busreise nach Wien teilgenommen, die ich über Ihre Internetseite für 790 Euro gebucht hatte. Zu meinem Bedauern muss ich Ihnen mitteilen, dass die Reise in wesentlichen Punkten von Ihrer Beschreibung abwich.\n\nStatt in einem Mittelklassehotel im Zentrum wurden wir in einem Haus am Stadtrand untergebracht. Mein Zimmer war nicht gereinigt, und die Dusche funktionierte erst am dritten Tag.\n\nAuch das Programm war enttäuschend: Die angekündigte tägliche Stadtführung fand nur zweimal statt, und der Reiseleiter sprach so wenig Deutsch, dass wir seinen Erklärungen kaum folgen konnten. Den Eintritt für Schloss Schönbrunn, der im Preis enthalten sein sollte, mussten wir selbst bezahlen.\n\nIch erwarte deshalb, dass Sie mir ein Drittel des Reisepreises sowie die Eintrittskosten erstatten. Sollte ich innerhalb von 14 Tagen nichts von Ihnen hören, sehe ich mich gezwungen, rechtliche Schritte zu prüfen.\n\nMit freundlichen Grüßen\nOleksandr Kovalenko`,
      [
        "Inhalt: Alle vier Punkte sind ausführlich bearbeitet. Die Forderung und die Frist sind eindeutig.",
        "Kommunikative Gestaltung: formeller, sachlicher Stil mit klaren Absätzen und guten Übergängen.",
        "Formale Richtigkeit: sicher in Passiv, Relativsätzen und Konsekutivsatz („so …, dass“).",
      ],
      [],
    ],
  ],
);

add(
  "telc-b2-2/2.0/1",
  "telc-b2",
  150,
  [
    [
      "Grund für Ihr Interesse",
      "interess|familie|kinder|eltern|großeltern|gemeinschaft|nachbarschaft|umzug",
    ],
    [
      "Fragen zu Größe, Miete und Nebenkosten",
      "größe|quadratmeter|zimmer|miete|nebenkosten|kaution|kostet",
    ],
    [
      "Fragen zum Zusammenleben (Pflichten, gemeinsame Aktivitäten)",
      "pflicht|aufgabe|garten|gemeinschaftsraum|aktivität|zusammenleben|regel|treffen",
    ],
    [
      "Bitte um einen Besichtigungstermin",
      "besichtig|termin|anschauen|ansehen|vorbeikommen",
    ],
  ],
  [
    [
      PASS[0],
      `Guten Tag,\n\nich habe Ihre Anzeige gelesen. Ich suche eine Wohnung für meine Familie. Wir sind vier Personen. Wie groß sind die Wohnungen? Wie viel ist die Miete? Ich habe zwei Kinder, sie spielen gern im Garten.\nKann ich die Wohnung sehen?\n\nViele Grüße\nHalima Yusuf`,
      [
        "Inhalt: Drei Punkte sind kurz angesprochen. Warum gerade ein Mehrgenerationenhaus interessant ist, wird nicht erklärt.",
        "Kommunikative Gestaltung: etwa 50 Wörter – ein Drittel der Länge. Kein Betreff, kein formeller Schluss, nur einfache Hauptsätze.",
        "Formale Richtigkeit: korrekt, aber auf einfachem Niveau. Es fehlen Nebensätze und höfliche Formen.",
      ],
      [
        [
          "Wie groß sind die Wohnungen? Wie viel ist die Miete?",
          "Könnten Sie mir mitteilen, wie groß die Vier-Zimmer-Wohnungen sind und wie hoch die Miete einschließlich Nebenkosten ist?",
        ],
        [
          "Kann ich die Wohnung sehen?",
          "Wäre es möglich, in den nächsten Wochen einen Besichtigungstermin zu vereinbaren?",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Ihre Anzeige Mehrgenerationenhaus\n\nSehr geehrte Damen und Herren,\n\nich habe in der Zeitung Ihre Anzeige gelesen und ich interessiere mich für eine Wohnung in Ihrem Haus. Ich wohne mit meinem Mann und zwei Kindern in einer kleinen Wohnung. Unsere Eltern leben im Ausland, deshalb unsere Kinder haben hier keine Großeltern. Ich finde die Idee schön, dass junge und alte Menschen wohnen zusammen.\nIch habe einige Fragen. Wie groß ist eine Wohnung mit vier Zimmern und wie hoch ist die Miete? Sind die Nebenkosten dabei?\nIch möchte auch wissen, ob die Bewohner müssen bestimmte Aufgaben machen, zum Beispiel im Garten.\nKönnen wir die Wohnung besichtigen? Wir haben am Wochenende Zeit.\n\nMit freundlichen Grüßen\nHalima Yusuf`,
      [
        "Inhalt: Alle vier Punkte sind bearbeitet, der Grund ist persönlich und überzeugend.",
        "Kommunikative Gestaltung: Betreff, Einleitung und sinnvolle Reihenfolge. Der Stil ist höflich, aber einfach. Ein Schlusssatz fehlt, und der Text ist mit etwa 115 Wörtern zu kurz (Ziel: mindestens 150).",
        "Formale Richtigkeit: Verb im Nebensatz steht mehrmals falsch („dass … wohnen zusammen“, „ob die Bewohner müssen“).",
      ],
      [
        [
          "…, dass junge und alte Menschen wohnen zusammen.",
          "…, dass junge und alte Menschen unter einem Dach zusammenleben.",
        ],
        [
          "…, ob die Bewohner müssen bestimmte Aufgaben machen, …",
          "…, ob die Bewohnerinnen und Bewohner bestimmte Aufgaben übernehmen müssen, …",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Anfrage zu einer Wohnung im Mehrgenerationenhaus Hannover-List\n\nSehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Anzeige „Wohnen im Alter – gemeinsam statt einsam“ gelesen. Mein Mann und ich suchen für uns und unsere beiden Kinder eine größere Wohnung. Da unsere eigenen Eltern im Ausland leben, gefällt uns der Gedanke sehr, dass verschiedene Generationen unter einem Dach wohnen und sich gegenseitig unterstützen.\n\nBevor wir uns bewerben, hätten wir einige Fragen. Wie groß sind die Vier-Zimmer-Wohnungen, und mit welcher Miete einschließlich Nebenkosten müssten wir rechnen?\n\nAußerdem würde uns interessieren, wie das Zusammenleben organisiert ist. Gibt es Aufgaben, die alle übernehmen, etwa die Pflege des Gartens? Und werden regelmäßig gemeinsame Aktivitäten angeboten?\n\nSehr gern würden wir uns das Haus persönlich ansehen. Wäre ein Besichtigungstermin an einem Samstag möglich? Unter der Woche sind wir beide berufstätig und könnten erst nach 18 Uhr kommen.\n\nVielen Dank im Voraus für Ihre Antwort.\n\nMit freundlichen Grüßen\nHalima Yusuf`,
      [
        "Inhalt: Alle vier Punkte sind ausführlich bearbeitet, der Grund ist gut erklärt.",
        "Kommunikative Gestaltung: freundlich-formeller Stil, klare Absätze, gute Übergänge (bevor, außerdem).",
        "Formale Richtigkeit: sicher – Konjunktiv II, Passiv, Relativsatz, indirekte Fragen.",
      ],
      [],
    ],
  ],
);

['telc-b2/2.0/0', 'telc-b2/2.0/1', 'telc-b2-2/2.0/0', 'telc-b2-2/2.0/1'].forEach(k => { T[k].need = 3; });

  /* ================= DTB B1 ================= */
const LP_CHAT = [
  [
    "Meinung zum Vorschlag",
    "finde|meinung|idee|dafür|dagegen|gut|schlecht|einverstanden",
  ],
  [
    "Begründung (Vorteil oder Nachteil)",
    "weil|denn|deshalb|vorteil|nachteil|problem",
  ],
  [
    "eigener Vorschlag oder Wunsch",
    "vorschlag|schlage|vielleicht|könnten wir|wünsche|testen|probieren",
  ],
];

add(
  "dtb-b1/1.1/0",
  "dtb-b1",
  70,
  [
    [
      "sich entschuldigen und den Grund nennen",
      "entschuldig|leid|krank|vertretung",
    ],
    [
      "kostenlose Zusatzreinigung anbieten (Donnerstag, 18 Uhr)",
      "kostenlos|zusatzreinigung|donnerstag|18",
    ],
    [
      "auf die Frage nach dem Samstag antworten",
      "samstag|dezember|januar|angebot|personal",
    ],
    [
      "Kontaktmöglichkeit für Fragen nennen",
      "fragen|anrufen|telefon|0201|erreichen|weber",
    ],
  ],
  [
    [
      PASS[0],
      `Hallo Frau Berger,\n\nentschuldigung für Montag. Frau Nowak war krank. Wir kommen Donnerstag 18 Uhr. Samstag geht nicht.\n\nTschüss`,
      [
        "Inhaltliche Angemessenheit: Entschuldigung und neuer Termin sind da. Es fehlt: Die Reinigung ist kostenlos, ab Januar geht der Samstag, das Angebot kommt, die Telefonnummer.",
        "Sprachliche Angemessenheit: „Hallo“ und „Tschüss“ passen nicht zu einer Kundin. Es sind nur Stichworte, etwa 20 Wörter statt 70.",
      ],
      [
        [
          "Wir kommen Donnerstag 18 Uhr.",
          "Wir bieten Ihnen eine kostenlose Zusatzreinigung am Donnerstag um 18 Uhr an.",
        ],
        [
          "Samstag geht nicht.",
          "Im Dezember können wir samstags leider nicht reinigen, aber ab Januar ist es möglich.",
        ],
      ],
    ],
    [
      PASS[1],
      `Sehr geehrte Frau Dr. Berger,\n\nvielen Dank für Ihre E-Mail. Wir entschuldigen uns für die Reinigung am Montag. Frau Nowak war krank und die Vertretung war neu.\nWir möchten kostenlos noch einmal reinigen am Donnerstag um 18 Uhr.\nSie fragen wegen Samstag. Im Dezember wir haben leider kein Personal, aber ab Januar es ist möglich. Wir schicken ein Angebot nächste Woche.\nWenn Sie Fragen haben, Sie können Frau Weber anrufen: 0201 / 38 72 05.\n\nMit freundlichen Grüßen\nElena Popova`,
      [
        "Inhaltliche Angemessenheit: Alle Punkte aus der Notiz sind richtig und vollständig umgesetzt. Das ist das Wichtigste.",
        "Sprachliche Angemessenheit: höflich, Sie-Form stimmt. Das Verb steht mehrmals falsch („Im Dezember wir haben“, „Wenn …, Sie können“).",
      ],
      [
        [
          "Im Dezember wir haben leider kein Personal, aber ab Januar es ist möglich.",
          "Im Dezember haben wir leider kein Personal, aber ab Januar ist es möglich.",
        ],
        [
          "Wenn Sie Fragen haben, Sie können Frau Weber anrufen: …",
          "Wenn Sie Fragen haben, können Sie Frau Weber gern anrufen: …",
        ],
      ],
    ],
    [
      PASS[2],
      `Sehr geehrte Frau Dr. Berger,\n\nvielen Dank für Ihre Nachricht. Wir möchten uns für die schlechte Reinigung am Montag entschuldigen. Unsere Mitarbeiterin Frau Nowak war krank, und die Vertretung kannte Ihre Praxis noch nicht.\nAls Entschuldigung bieten wir Ihnen eine kostenlose Zusatzreinigung an, und zwar am Donnerstag um 18 Uhr.\nZu Ihrer Frage: Im Dezember können wir samstags leider nicht kommen, weil uns Personal fehlt. Ab Januar ist die Reinigung am Samstag aber möglich. Ein Angebot schicken wir Ihnen nächste Woche.\nBei Fragen erreichen Sie Frau Weber unter 0201 / 38 72 05.\n\nMit freundlichen Grüßen\nElena Popova\nGlanzwerk Gebäudeservice`,
      [
        "Inhaltliche Angemessenheit: Alle Punkte sind vollständig und in guter Reihenfolge. Die Kundin weiß genau, was passiert.",
        "Sprachliche Angemessenheit: professioneller, freundlicher Ton. Sätze sind verbunden (und zwar, weil, aber). Sicher für B1.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b1/3.1/0",
  "dtb-b1",
  15,
  [
    ["Wer? (Name, Firma, Telefon)", "kaminski|technoplast|02302"],
    ["Anliegen", "schulung|seminarraum|raum|zimmer|mittagessen"],
    [
      "Termin / Details",
      "26|27|november|14|beamer|einzelzimmer|vegetarisch|nacht",
    ],
    ["Was tun?", "angebot|freitag|e-mail|mail|anrufen|schicken"],
  ],
  [
    [
      PASS[0],
      `Frau Kaminski hat angerufen. Sie will Raum und Zimmer für Schulung im November. Bitte zurückrufen.`,
      [
        "Inhaltliche Angemessenheit: Der Name stimmt. Es fehlen Firma, Telefonnummer, Datum, Zahl der Personen. „Zurückrufen“ ist falsch: Sie möchte ein Angebot per E-Mail.",
        "Sprachliche Angemessenheit: verständlich. Bei einer Notiz zählen aber die richtigen Details.",
      ],
      [
        ["im November", "26.–27. November, 14 Personen"],
        [
          "Bitte zurückrufen.",
          "Bitte bis Freitag Angebot per E-Mail schicken.",
        ],
      ],
    ],
    [
      PASS[1],
      `Wer: Frau Kaminski, Technoplast\nAnliegen: Schulung, Seminarraum mit Beamer, 14 Personen\nTermin: 26. und 27. November, Zimmer 2 Nächte\nWas tun: Angebot schicken bis Freitag`,
      [
        "Inhaltliche Angemessenheit: Das meiste stimmt. Fehler: Es ist nur 1 Nacht (sie korrigiert sich im Gespräch). Telefonnummer, Einzelzimmer und Mittagessen fehlen.",
        "Sprachliche Angemessenheit: klare Stichpunkte, gut zu lesen.",
      ],
      [
        ["Zimmer 2 Nächte", "14 Einzelzimmer, nur 1 Nacht (26. auf 27.11.)"],
        [
          "Angebot schicken bis Freitag",
          "Angebot per E-Mail bis Freitag; Rückfragen: 02302 78 41 15",
        ],
      ],
    ],
    [
      PASS[2],
      `Wer: Frau Kaminski, Firma Technoplast (Witten), Tel. 02302 78 41 15\nAnliegen: Schulung – Seminarraum für 14 Personen mit Beamer, Mittagessen an beiden Tagen (auch vegetarisch)\nTermin: 26.–27. November, 14 Einzelzimmer für 1 Nacht (26. auf 27.)\nWas tun: bis Freitag Angebot per E-Mail schicken (Adresse bekannt)`,
      [
        "Inhaltliche Angemessenheit: Alle wichtigen Informationen sind richtig, auch die Korrektur (nur eine Nacht) und die Nummer.",
        "Sprachliche Angemessenheit: kurze, eindeutige Stichpunkte. Der Kollege kann sofort arbeiten.",
      ],
      [],
    ],
  ],
);
add("dtb-b1/4.1/0", "dtb-b1", 40, LP_CHAT, [
  [
    PASS[0],
    `Hallo. Ich finde nicht gut. Ich will mit alle arbeiten.`,
    [
      "Inhaltliche Angemessenheit: Eine Meinung ist da, der Grund ist nur angedeutet („mit alle arbeiten“). Ein eigener Vorschlag fehlt.",
      "Sprachliche Angemessenheit: 10 Wörter statt 40. Dem ersten Satz fehlt das Objekt („das“).",
    ],
    [
      [
        "Ich finde nicht gut.",
        "Ich finde die Idee nicht so gut, weil ich gern mit allen zusammenarbeite.",
      ],
      ["(fehlt)", "Vielleicht können wir die Teams jeden Monat wechseln?"],
    ],
  ],
  [
    PASS[1],
    `Hallo Petra,\nich finde die Idee gut. Wenn ich immer im Versand arbeite, ich kenne die Arbeit besser und ich bin schneller. Aber es ist ein Problem, wenn mein Partner ist krank. Ich schlage vor, wir machen einen Test für ein Monat.\nGrüße, Tomasz`,
    [
      "Inhaltliche Angemessenheit: Meinung, Vorteil, Nachteil und Vorschlag – alles da.",
      "Sprachliche Angemessenheit: passender Ton für den Chat. Fehler bei der Verbposition („Wenn …, ich kenne“, „wenn mein Partner ist krank“).",
    ],
    [
      [
        "Wenn ich immer im Versand arbeite, ich kenne die Arbeit besser …",
        "Wenn ich immer im Versand arbeite, kenne ich die Arbeit besser …",
      ],
      ["…, wenn mein Partner ist krank.", "…, wenn mein Partner krank ist."],
    ],
  ],
  [
    PASS[2],
    `Hallo Petra,\nich finde deine Idee grundsätzlich gut. In festen Teams kennt man seinen Bereich besser, und deshalb passieren weniger Fehler. Ein Nachteil ist aber, dass es schwierig wird, wenn jemand krank ist oder Urlaub hat. Ich schlage vor, dass wir die festen Teams zuerst zwei Monate testen und dann noch einmal darüber sprechen.\nViele Grüße\nTomasz`,
    [
      "Inhaltliche Angemessenheit: klare Meinung, Vorteil und Nachteil, konkreter Vorschlag.",
      "Sprachliche Angemessenheit: gut verbunden (deshalb, aber, dass, wenn), freundlich und sachlich.",
    ],
    [],
  ],
]);

add(
  "dtb-b1-2/1.1/0",
  "dtb-b1",
  70,
  [
    [
      "sich entschuldigen und den Grund nennen",
      "entschuldig|leid|farbe|hersteller|fehlerhaft",
    ],
    [
      "kostenlose Nachbesserung anbieten (Mittwoch, 8 Uhr)",
      "kostenlos|nachbesser|mittwoch|8 uhr|baumann",
    ],
    [
      "auf die Frage nach der Fassade antworten",
      "fassade|besichtigung|freitag|14|termin|angebot",
    ],
    [
      "Kontaktmöglichkeit für Fragen nennen",
      "fragen|anrufen|handy|0171|erreichen|krüger",
    ],
  ],
  [
    [
      PASS[0],
      `Guten Tag Herr Wagner,\n\ndie Farbe war schlecht, Entschuldigung. Herr Baumann kommt Mittwoch. Fassade können wir machen.\n\nGrüße`,
      [
        "Inhaltliche Angemessenheit: Drei Punkte sind nur angedeutet. Es fehlen: Uhrzeit, „kostenlos“, die Besichtigung mit Terminvorschlag, die Telefonnummer.",
        "Sprachliche Angemessenheit: zu kurz und zu knapp für einen Kunden. Anrede und Gruß sind nicht formell.",
      ],
      [
        [
          "Herr Baumann kommt Mittwoch.",
          "Herr Baumann kommt am Mittwoch um 8 Uhr und bessert alles kostenlos nach.",
        ],
        [
          "Fassade können wir machen.",
          "Die Fassade streichen wir gern. Vorher müssen wir das Haus besichtigen.",
        ],
      ],
    ],
    [
      PASS[1],
      `Sehr geehrter Herr Wagner,\n\nwir entschuldigen uns für die Flecken im Treppenhaus. Die Farbe von dem Hersteller war fehlerhaft.\nHerr Baumann kommt am Mittwoch um 8 Uhr und macht alles kostenlos neu.\nDie Fassade können wir gern streichen. Aber zuerst wir müssen das Haus sehen. Passt Ihnen nächste Freitag um 14 Uhr?\nBei Fragen Sie können Herrn Krüger anrufen, 0171 / 22 84 61.\n\nMit freundlichen Grüßen\nDmitri Sokolov`,
      [
        "Inhaltliche Angemessenheit: Alle vier Punkte der Notiz sind richtig umgesetzt.",
        "Sprachliche Angemessenheit: formell und höflich. Fehler: Verbposition („zuerst wir müssen“, „Bei Fragen Sie können“), Endung („nächste Freitag“).",
      ],
      [
        [
          "Aber zuerst wir müssen das Haus sehen.",
          "Vorher müssen wir das Haus aber besichtigen.",
        ],
        [
          "Passt Ihnen nächste Freitag um 14 Uhr?",
          "Passt es Ihnen am nächsten Freitag um 14 Uhr?",
        ],
      ],
    ],
    [
      PASS[2],
      `Sehr geehrter Herr Wagner,\n\nvielen Dank für Ihre Nachricht. Für die Flecken und die Farbspritzer im Treppenhaus möchten wir uns entschuldigen. Leider war die Farbe vom Hersteller fehlerhaft.\nUnser Mitarbeiter Herr Baumann kommt am Mittwoch um 8 Uhr und bessert alles kostenlos nach.\nGern streichen wir im Frühjahr auch die Fassade. Für ein Angebot müssen wir das Haus vorher besichtigen. Deshalb schlage ich einen Termin am nächsten Freitag um 14 Uhr vor.\nWenn Sie Fragen haben, erreichen Sie Herrn Krüger unter 0171 / 22 84 61.\n\nMit freundlichen Grüßen\nDmitri Sokolov\nMalerbetrieb Farbenfroh`,
      [
        "Inhaltliche Angemessenheit: vollständig, genau und in sinnvoller Reihenfolge.",
        "Sprachliche Angemessenheit: professioneller Ton, sichere Sätze mit „deshalb“ und „wenn“.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b1-2/3.1/0",
  "dtb-b1",
  15,
  [
    ["Wer? (Name, Firma, Telefon)", "lehmann|grünwerk|0170"],
    ["Anliegen", "transporter|inspektion|klimaanlage"],
    ["Termin / Details", "montag|18|7 uhr|427|ersatz|anhängerkupplung"],
    ["Was tun?", "zurückrufen|rückruf|16 uhr|heute"],
  ],
  [
    [
      PASS[0],
      `Herr Lehmann hat angerufen wegen Autos. Er kommt Montag. Bitte anrufen.`,
      [
        "Inhaltliche Angemessenheit: Name und Tag stimmen. Es fehlen Firma, Nummer, Uhrzeit, Zahl der Wagen, Klimaanlage, Ersatzwagen und die Frist.",
        "Sprachliche Angemessenheit: verständlich, aber Herr Schröder muss noch einmal nachfragen.",
      ],
      [
        [
          "wegen Autos",
          "3 Transporter zur Inspektion, bei einem ist die Klimaanlage defekt",
        ],
        ["Bitte anrufen.", "Bitte heute bis 16 Uhr zurückrufen: 0170 34 56 90"],
      ],
    ],
    [
      PASS[1],
      `Wer: Herr Lehmann, Grünwerk Gartenbau, 0170 34 56 90\nAnliegen: 3 Transporter Inspektion, Klimaanlage kaputt (EN-GW 421)\nTermin: Montag 18., 7 Uhr\nWas tun: zurückrufen`,
      [
        "Inhaltliche Angemessenheit: gut, aber das Kennzeichen ist falsch (er korrigiert auf 427). Ersatzwagen und Frist „bis 16 Uhr“ fehlen.",
        "Sprachliche Angemessenheit: klare Stichpunkte.",
      ],
      [
        ["EN-GW 421", "EN-GW 427 (weißer Transporter)"],
        [
          "zurückrufen",
          "heute bis 16 Uhr zurückrufen; 2 Ersatzwagen nötig, einer mit Anhängerkupplung",
        ],
      ],
    ],
    [
      PASS[2],
      `Wer: Herr Lehmann, Grünwerk Gartenbau (Hattingen), Handy 0170 34 56 90\nAnliegen: 3 Transporter zur Inspektion; beim weißen (EN-GW 427) ist die Klimaanlage defekt\nTermin: Montag, 18., 7 Uhr; braucht 2 Ersatzwagen, einer mit Anhängerkupplung\nWas tun: heute bis 16 Uhr zurückrufen`,
      [
        "Inhaltliche Angemessenheit: Alle Angaben stimmen, auch das korrigierte Kennzeichen.",
        "Sprachliche Angemessenheit: knapp und eindeutig – genau richtig für eine Notiz.",
      ],
      [],
    ],
  ],
);
add("dtb-b1-2/4.1/0", "dtb-b1", 40, LP_CHAT, [
  [
    PASS[0],
    `Ok Chef. Montag ich kann arbeiten. Dienstag frei ist gut.`,
    [
      "Inhaltliche Angemessenheit: Man sieht Zustimmung. Eine Begründung und ein eigener Vorschlag fehlen.",
      "Sprachliche Angemessenheit: sehr kurz (10 Wörter). Verbposition falsch („Montag ich kann“).",
    ],
    [
      [
        "Montag ich kann arbeiten.",
        "Ich finde die Idee gut, weil ich montags mittags Zeit habe.",
      ],
      ["(fehlt)", "Vielleicht können wir es zuerst einen Monat testen?"],
    ],
  ],
  [
    PASS[1],
    `Hallo Thomas,\nich finde die Idee nicht schlecht. Am Montag Mittag viele Leute aus den Büros suchen ein Restaurant, das ist gut für uns. Aber am Dienstagabend wir haben oft Stammgäste, das ist schade. Ich schlage vor, wir probieren es im März und dann wir sehen.\nGruß, Nour`,
    [
      "Inhaltliche Angemessenheit: Meinung, Grund dafür, Grund dagegen und Vorschlag sind da.",
      "Sprachliche Angemessenheit: natürlicher Chat-Ton. Mehrere Fehler bei der Verbposition („viele Leute … suchen“, „dann wir sehen“).",
    ],
    [
      [
        "Am Montag Mittag viele Leute aus den Büros suchen ein Restaurant, …",
        "Am Montagmittag suchen viele Leute aus den Büros ein Restaurant, …",
      ],
      [
        "… und dann wir sehen.",
        "… und danach sprechen wir noch einmal darüber.",
      ],
    ],
  ],
  [
    PASS[2],
    `Hallo Thomas,\nich finde den Vorschlag gut, denn montags mittags suchen viele Leute aus den Büros in der Nähe ein Restaurant. Allerdings kommen am Dienstagabend oft unsere Stammgäste, und die möchte ich nicht verlieren. Mein Vorschlag: Wir testen die neuen Zeiten im März und informieren die Stammgäste vorher mit einem Aushang.\nViele Grüße\nNour`,
    [
      "Inhaltliche Angemessenheit: klare Meinung mit Begründung, ein Einwand und ein konkreter Vorschlag.",
      "Sprachliche Angemessenheit: gut verbunden (denn, allerdings), passender Ton.",
    ],
    [],
  ],
]);

add(
  "dtb-b1-3/1.1/0",
  "dtb-b1",
  70,
  [
    [
      "sich entschuldigen und den Grund nennen",
      "entschuldig|leid|laptop|vergessen",
    ],
    [
      "Fernwartung anbieten (morgen, 9 Uhr, Laptops anlassen)",
      "fernwartung|morgen|9 uhr|anlassen|eingeschaltet",
    ],
    [
      "auf die Frage zum Umzug antworten",
      "umzug|besichtig|räume|termin|september",
    ],
    ["Hotline für Notfälle nennen", "hotline|notfall|0201|456"],
  ],
  [
    [
      PASS[0],
      `Hallo Frau Yilmaz,\n\nwir haben Laptops vergessen. Morgen 9 Uhr wir machen das. Umzug ist ok.\n\nViele Grüße`,
      [
        "Inhaltliche Angemessenheit: Der Grund ist genannt. Es fehlen: eine Entschuldigung, „Fernwartung“ und „Laptops anlassen“, der Besichtigungstermin, die Hotline.",
        "Sprachliche Angemessenheit: zu kurz, zu locker für eine Kundin.",
      ],
      [
        [
          "Morgen 9 Uhr wir machen das.",
          "Morgen um 9 Uhr richten wir den Drucker per Fernwartung ein. Bitte lassen Sie die Laptops an.",
        ],
        [
          "Umzug ist ok.",
          "Beim Umzug helfen wir Ihnen gern. Vorher möchten wir die neuen Räume besichtigen.",
        ],
      ],
    ],
    [
      PASS[1],
      `Sehr geehrte Frau Yilmaz,\n\nes tut uns leid, dass der Drucker nicht an alle Computer funktioniert. Wir haben die zwei Laptops beim Termin vergessen.\nWir können das morgen um 9 Uhr mit Fernwartung machen. Bitte die Laptops anlassen.\nBeim Umzug wir helfen Ihnen gern. Wir müssen vorher die neuen Räume sehen. Haben Sie Zeit nächste Dienstag um 10 Uhr?\nFür Notfälle es gibt unsere Hotline: 0201 456 78 90.\n\nMit freundlichen Grüßen\nKarim Mansour`,
      [
        "Inhaltliche Angemessenheit: Alle Punkte sind richtig und vollständig, mit eigenem Terminvorschlag.",
        "Sprachliche Angemessenheit: höflich und klar. Fehler bei Verbposition und Endungen („Beim Umzug wir helfen“, „nächste Dienstag“).",
      ],
      [
        [
          "Beim Umzug wir helfen Ihnen gern.",
          "Beim Umzug helfen wir Ihnen gern.",
        ],
        [
          "Bitte die Laptops anlassen.",
          "Bitte lassen Sie die Laptops dafür eingeschaltet.",
        ],
      ],
    ],
    [
      PASS[2],
      `Sehr geehrte Frau Yilmaz,\n\nvielen Dank für Ihre Nachricht. Bitte entschuldigen Sie das Problem mit dem Drucker. Bei unserem Termin am Montag haben wir die beiden Laptops leider vergessen.\nWir können den Drucker morgen um 9 Uhr per Fernwartung einrichten. Wichtig ist nur, dass die Laptops dann eingeschaltet sind.\nBei Ihrem Umzug im September helfen wir Ihnen gern. Vorher möchten wir die neuen Räume besichtigen. Würde Ihnen der nächste Dienstag um 10 Uhr passen?\nFalls es vorher dringend ist, erreichen Sie unsere Hotline unter 0201 456 78 90.\n\nMit freundlichen Grüßen\nKarim Mansour\nIT-Service Weber`,
      [
        "Inhaltliche Angemessenheit: vollständig und kundenfreundlich, mit klarem Terminvorschlag.",
        "Sprachliche Angemessenheit: sicher, höflich („Würde Ihnen … passen?“), gut gegliedert.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b1-3/3.1/0",
  "dtb-b1",
  15,
  [
    ["Wer? (Name, Firma, Telefon)", "brandt|textilpflege|0201"],
    ["Problem", "lieferwagen|kaputt|bettwäsche|freitag|donnerstag|wäsche"],
    ["Angebot / Lösung", "50|sets|kurier|18 uhr|notlieferung|kostenlos"],
    ["Was tun? (bis wann)", "morgen|bescheid|anrufen|zurückrufen|reicht"],
  ],
  [
    [
      PASS[0],
      `Firma Wäsche hat angerufen. Wäsche kommt später. Bitte anrufen.`,
      [
        "Inhaltliche Angemessenheit: Das Problem ist ungefähr klar. Es fehlen Name, Nummer, der neue Termin, die Notlieferung und die Frist.",
        "Sprachliche Angemessenheit: „Firma Wäsche“ ist kein Name – Frau Hoffmann weiß nicht, wen sie anrufen soll.",
      ],
      [
        [
          "Wäsche kommt später.",
          "Bettwäsche kommt erst Freitag, ca. 10 Uhr (statt Donnerstag)",
        ],
        [
          "Bitte anrufen.",
          "Bitte bis morgen früh Frau Brandt anrufen: 0201 84 73 15",
        ],
      ],
    ],
    [
      PASS[1],
      `Wer: Frau Brand, Textilpflege Rhein-Ruhr\nProblem: Lieferwagen kaputt, Wäsche kommt Freitag 10 Uhr\nLösung: heute 50 Sets mit Kurier\nWas tun: anrufen, ob 50 genug ist`,
      [
        "Inhaltliche Angemessenheit: Die wichtigsten Punkte stimmen. Es fehlen die Telefonnummer, „bis 18 Uhr“, „kostenlos“ und die Frist (bis morgen früh). Der Name ist falsch geschrieben (Brandt mit dt).",
        "Sprachliche Angemessenheit: gut lesbar.",
      ],
      [
        [
          "heute 50 Sets mit Kurier",
          "heute bis 18 Uhr 50 Sets per Kurier, Kosten übernimmt die Firma",
        ],
        [
          "anrufen, ob 50 genug ist",
          "bis morgen früh anrufen (0201 84 73 15), ob 50 Sets reichen",
        ],
      ],
    ],
    [
      PASS[2],
      `Wer: Frau Brandt, Textilpflege Rhein-Ruhr, Tel. 0201 84 73 15\nProblem: Lieferwagen defekt – Bettwäsche kommt erst Freitag gegen 10 Uhr (statt Donnerstag)\nAngebot: heute bis 18 Uhr Notlieferung per Kurier, 50 Sets, ohne Extrakosten\nWas tun: bis morgen früh Bescheid geben, ob 50 Sets reichen (Freitag kommt die Reisegruppe!)`,
      [
        "Inhaltliche Angemessenheit: vollständig und richtig, sogar mit dem Hinweis auf die Reisegruppe.",
        "Sprachliche Angemessenheit: kurz, klar, ohne Rückfrage verständlich.",
      ],
      [],
    ],
  ],
);
add("dtb-b1-3/4.1/0", "dtb-b1", 40, LP_CHAT, [
  [
    PASS[0],
    `Nein, 5 Uhr ist zu früh!! Kein Bus.`,
    [
      "Inhaltliche Angemessenheit: Meinung und ein Grund sind erkennbar. Ein Vorschlag fehlt.",
      "Sprachliche Angemessenheit: zu kurz, ohne Anrede. Die Ausrufezeichen klingen unhöflich.",
    ],
    [
      ["Kein Bus.", "Um diese Zeit fährt bei mir noch kein Bus."],
      ["(fehlt)", "Vielleicht können wir um 5:30 Uhr anfangen?"],
    ],
  ],
  [
    PASS[1],
    `Hallo Daria,\nich finde 5 Uhr nicht gut. Ich komme mit dem Bus und der erste Bus fährt um 5:10 Uhr, deshalb ich kann nicht pünktlich sein. Früher Feierabend ist aber schön. Kann man vielleicht wählen, wer möchte um 5 Uhr anfangen?\nLG Piotr`,
    [
      "Inhaltliche Angemessenheit: Meinung, Begründung, ein Vorteil und ein Vorschlag sind da.",
      "Sprachliche Angemessenheit: verständlich und freundlich. Fehler: „deshalb ich kann“, Verb im Nebensatz („wer möchte … anfangen“).",
    ],
    [
      [
        "…, deshalb ich kann nicht pünktlich sein.",
        "…, deshalb kann ich nicht pünktlich sein.",
      ],
      [
        "Kann man vielleicht wählen, wer möchte um 5 Uhr anfangen?",
        "Vielleicht kann jeder selbst wählen, ob er um 5 oder um 6 Uhr anfängt?",
      ],
    ],
  ],
  [
    PASS[2],
    `Hallo Daria,\nfür mich wäre der Beginn um 5 Uhr schwierig, weil mein erster Bus erst um 5:10 Uhr fährt. Den früheren Feierabend finde ich aber gut, vor allem im Sommer. Ich schlage deshalb vor, dass wir um 5:30 Uhr anfangen oder dass jeder zwischen zwei Startzeiten wählen kann.\nViele Grüße\nPiotr`,
    [
      "Inhaltliche Angemessenheit: klare Meinung, guter Grund, fairer Vorschlag.",
      "Sprachliche Angemessenheit: sachlich und höflich („wäre … schwierig“), gut verbunden.",
    ],
    [],
  ],
]);

/* ================= DTB B2 ================= */
const LP_NOTE = (a, b, c, d, e2) => [
  ["Anrufer/in und Firma oder Einrichtung", a],
  ["Rückrufnummer", b],
  ["Anliegen", c],
  ["Details", d],
  ["Was zu tun ist (mit Frist)", e2],
];
const LP_FORUM = (m, pro) => [
  [
    "Ihre Meinung",
    "meiner meinung|meiner ansicht|ich finde|finde ich|ich halte|halte ich|ich bin dafür|ich bin dagegen|ich bin der meinung|gemischten gefühlen|überzeugt|begrüße|" +
      m,
  ],
  [
    "Vorteile und Nachteile / Gründe dafür und dagegen",
    "vorteil|nachteil|einerseits|andererseits|zwar|allerdings|dafür spricht|dagegen spricht|" +
      pro,
  ],
  [
    "Beispiele aus dem Arbeitsalltag",
    "beispiel|bei uns|abteilung|in meinem team|erfahrung|erlebt|früher|letztes jahr|letzten jahr|neulich|bekannter|meine frau|mein mann",
  ],
  [
    "ein eigener Vorschlag",
    "vorschlag|schlage|man könnte|wir könnten|sollte|wie wäre es",
  ],
];

add(
  "dtb-b2/1.1/0",
  "dtb-b2",
  100,
  [
    [
      "Dank und Entschuldigung für beide Probleme",
      "dank|entschuldig|bedauer|leid",
    ],
    [
      "Erklärung der Verspätung (Panne, fehlender Anruf)",
      "panne|lieferwagen|ersatzwagen|angerufen|anruf|a 40|a40",
    ],
    [
      "Erklärung zu den vegetarischen Portionen und neue Kontrolle",
      "vegetarisch|küche|übertragen|kontroll",
    ],
    ["Angebot: 25 % Nachlass, neue Rechnung", "25 %|25%|25 prozent|nachlass|rabatt|rechnung"],
    [
      "kostenloses Dessertbuffet bei der Weihnachtsfeier",
      "dessert|weihnachtsfeier|kostenlos",
    ],
    [
      "persönlicher Anruf von Frau Engel mit Durchwahl",
      "engel|persönlich|durchwahl|0251",
    ],
  ],
  [
    [
      PASS[0],
      `Sehr geehrte Frau Hoffmann,\n\nentschuldigung für das Problem. Unser Auto war kaputt, deshalb der Fahrer ist spät gekommen. Er hat Ärger bekommen. Die Küche hat einen Fehler gemacht mit vegetarisch.\nSie bekommen 25 % Rabatt.\n\nMit freundlichen Grüßen\nTafelwerk Catering`,
      [
        "Inhaltliche Angemessenheit: Nur etwa die Hälfte der sechs Punkte ist da. Es fehlen die neue Rechnung, das Dessertbuffet und der Anruf von Frau Engel. Schwerer Fehler: Über Konsequenzen für den Fahrer sollte nichts geschrieben werden.",
        "Sprachliche Angemessenheit: etwa 40 Wörter statt 100. Einfache Sätze, „Ärger bekommen“ ist zu umgangssprachlich für eine Kundin.",
      ],
      [
        [
          "Er hat Ärger bekommen.",
          "Dass unser Fahrer Sie nicht angerufen hat, bedauern wir sehr.",
        ],
        [
          "Sie bekommen 25 % Rabatt.",
          "Wir gewähren Ihnen einen Nachlass von 25 %. Die neue Rechnung erhalten Sie nächste Woche; die alte bezahlen Sie bitte nicht.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Ihre Beschwerde – Catering am 9. Oktober\n\nSehr geehrte Frau Hoffmann,\n\nvielen Dank für Ihre E-Mail. Wir entschuldigen uns für die Verspätung und für die vegetarischen Portionen.\nUnser Lieferwagen hatte eine Panne auf der A 40 und wir mussten auf den Ersatzwagen warten. Es war nicht in Ordnung, dass der Fahrer hat Sie nicht angerufen.\nBei den vegetarischen Portionen war ein Fehler in unserer Küche. Jetzt die Küchenleitung kontrolliert jede Bestellung.\nWir geben Ihnen 25 % Nachlass. Die neue Rechnung kommt nächste Woche, bitte bezahlen Sie die alte nicht. Bei Ihrer Weihnachtsfeier das Dessertbuffet ist kostenlos.\nFrau Engel kann Sie auch anrufen: 0251/48 39 27-12.\n\nMit freundlichen Grüßen\ni. A. Sofia Marin`,
      [
        "Inhaltliche Angemessenheit: Alle Anweisungen sind umgesetzt, nichts Falsches steht im Text. Der letzte Punkt ist ungenau: Die Kundin kann sich einen Anruf wünschen.",
        "Sprachliche Angemessenheit: sachlich und höflich, aber mit B1-Fehlern bei der Verbposition („dass der Fahrer hat“, „Jetzt die Küchenleitung kontrolliert“). Der Wortschatz ist einfach („Wir geben Ihnen“).",
      ],
      [
        [
          "Es war nicht in Ordnung, dass der Fahrer hat Sie nicht angerufen.",
          "Dass unser Fahrer Sie nicht vorher informiert hat, hätte nicht passieren dürfen.",
        ],
        [
          "Frau Engel kann Sie auch anrufen: …",
          "Wenn Sie es wünschen, ruft Frau Engel Sie gern persönlich an. Ihre Durchwahl ist 0251/48 39 27-12.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Ihre Rückmeldung zum Catering am 9. Oktober (Auftrag 2026-1187)\n\nSehr geehrte Frau Hoffmann,\n\nim Namen von Frau Engel danke ich Ihnen für Ihre offene Rückmeldung. Für die verspätete Lieferung und die fehlenden vegetarischen Portionen möchten wir uns in aller Form entschuldigen.\n\nUnser Lieferwagen hatte auf der A 40 eine Panne, sodass erst ein Ersatzwagen aus dem Betrieb kommen musste. Dass Sie darüber nicht telefonisch informiert wurden, war nicht in Ordnung. Bei den vegetarischen Gerichten wurde Ihre Bestellung in unserer Küche leider falsch übertragen. Ab sofort prüft die Küchenleitung jede Bestellung vor der Auslieferung noch einmal.\n\nAls Wiedergutmachung erhalten Sie einen Nachlass von 25 %. Die korrigierte Rechnung senden wir Ihnen nächste Woche zu; die bisherige Rechnung bezahlen Sie bitte nicht. Außerdem ist das Dessertbuffet bei Ihrer Weihnachtsfeier für Sie kostenlos.\n\nFrau Engel ruft Sie gern persönlich an, wenn Sie das möchten. Sie erreichen sie unter 0251/48 39 27-12.\n\nMit freundlichen Grüßen\ni. A. Sofia Marin\nTafelwerk Catering, Kundenservice`,
      [
        "Inhaltliche Angemessenheit: Alle sechs Punkte sind vollständig und richtig. Der Hinweis zum Fahrer wird beachtet.",
        "Sprachliche Angemessenheit: professionell und verbindlich, sichere Passiv- und Nebensätze, treffender Wortschatz (Wiedergutmachung, Nachlass).",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2/3.1/0",
  "dtb-b2",
  20,
  LP_NOTE(
    "lindner|hausverwaltung",
    "0172",
    "heizung|warmwasser|warmes wasser|ausgefallen",
    "breite straße|17|okafor|hausmeister|0176|13 uhr|schlüssel",
    "techniker|16 uhr|vier uhr|zurückrufen|rückruf|heizlüfter|bescheid",
  ),
  [
    [
      PASS[0],
      `Herr Lindner hat angerufen. Heizung kaputt in Witten. Techniker soll kommen. Bitte zurückrufen.`,
      [
        "Inhaltliche Angemessenheit: Das Anliegen stimmt. Es fehlen Adresse, beide Telefonnummern, der Hausmeister mit Schlüssel, die Uhrzeit und der Plan B. So kann niemand einen Techniker schicken.",
        "Sprachliche Angemessenheit: verständlich, aber viel zu ungenau.",
      ],
      [
        [
          "Heizung kaputt in Witten.",
          "Heizung und Warmwasser ausgefallen, Breite Straße 17, Witten-Annen (6 Parteien) – dringend",
        ],
        ["Bitte zurückrufen.", "Rückruf an Herrn Lindner: 0172 98 01 336"],
      ],
    ],
    [
      PASS[1],
      `Anrufer: Herr Lindner, Hausverwaltung Lindner und Partner, 0172 98 01 336\nAnliegen: Heizung ausgefallen seit heute früh, Breite Straße 17, Witten\nDetails: Schlüssel hat Hausmeister, ab 13 Uhr da\nZu tun: Techniker heute schicken, Herrn Lindner zurückrufen`,
      [
        "Inhaltliche Angemessenheit: Die Hauptpunkte stimmen. Es fehlen: Name und Nummer des Hausmeisters, „bis 16 Uhr“, das Warmwasser und der Plan B (sofort Bescheid geben, wenn es nicht klappt).",
        "Sprachliche Angemessenheit: klare Gliederung, gut lesbar.",
      ],
      [
        [
          "Schlüssel hat Hausmeister, ab 13 Uhr da",
          "Schlüssel für den Heizungskeller: Hausmeister Herr Okafor, ab 13 Uhr im Haus, Tel. 0176 23 45 81 90",
        ],
        [
          "Techniker heute schicken",
          "Techniker heute bis 16 Uhr schicken; wenn nicht möglich, sofort Bescheid geben (er besorgt dann Heizlüfter)",
        ],
      ],
    ],
    [
      PASS[2],
      `Anrufer: Herr Lindner, Hausverwaltung Lindner und Partner (Witten), Handy 0172 98 01 336\nAnliegen: Heizung und Warmwasser seit heute früh komplett ausgefallen – dringend (6 Parteien, u. a. Dame über 90)\nDetails: Breite Straße 17, Witten-Annen; Anlage ist bei uns in Wartung. Schlüssel Heizungskeller: Hausmeister Herr Okafor, ab 13 Uhr im Haus, Tel. 0176 23 45 81 90\nZu tun: Techniker heute bis 16 Uhr schicken und Herrn Lindner zurückrufen, wann jemand kommt. Falls heute nicht möglich: sofort Bescheid geben (er besorgt Heizlüfter).`,
      [
        "Inhaltliche Angemessenheit: vollständig, alle Zahlen stimmen, Plan B ist notiert.",
        "Sprachliche Angemessenheit: ohne Rückfrage verständlich, sinnvoll geordnet.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2/4.2/0",
  "dtb-b2",
  150,
  LP_FORUM("vier-tage", "freier tag|lange tage|zehn stunden|müde|erholung"),
  [
    [
      PASS[0],
      `Hallo,\nich finde die Vier-Tage-Woche gut. Man hat drei Tage frei, das ist schön für die Familie. Aber zehn Stunden arbeiten ist lang. Ich bin dann müde. Mein Freund arbeitet so und er findet es gut. Ich denke, wir sollen das probieren.\nViele Grüße\nAhmed`,
      [
        "Inhaltliche Angemessenheit: Meinung, ein Vorteil und ein Nachteil sind genannt. Das Beispiel bleibt ohne Inhalt, ein eigener Vorschlag für den Test fehlt.",
        "Sprachliche Angemessenheit: etwa 45 Wörter statt 150. Kurze Hauptsätze, kaum Verbindungen – das ist B1, nicht B2.",
      ],
      [
        [
          "Aber zehn Stunden arbeiten ist lang. Ich bin dann müde.",
          "Allerdings sind zehn Stunden am Stück anstrengend, sodass die Konzentration am Nachmittag deutlich nachlässt.",
        ],
        [
          "Ich denke, wir sollen das probieren.",
          "Ich würde vorschlagen, das Modell zunächst in einer Abteilung zu testen und nach drei Monaten auszuwerten.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nich möchte meine Meinung zur Vier-Tage-Woche schreiben. Ich finde die Idee interessant, aber ich habe auch Zweifel.\nEin Vorteil ist, dass man einen Tag mehr frei hat. Man kann Termine beim Arzt oder beim Amt machen und muss keinen Urlaub nehmen. Auch man spart einmal pro Woche den Weg zur Arbeit.\nEin Nachteil ist, dass die Tage sehr lang sind. In meiner Abteilung wir haben schon jetzt viel Stress am Nachmittag. Wenn wir zehn Stunden arbeiten, wir machen bestimmt mehr Fehler. Für Eltern ist es auch schwierig, weil die Kita um 16:30 Uhr schließt.\nMein Vorschlag ist, dass jeder kann selbst entscheiden, ob er vier oder fünf Tage arbeitet.\n\nViele Grüße\nAhmed Saleh, Versand`,
      [
        "Inhaltliche Angemessenheit: Meinung, Vor- und Nachteile, ein Beispiel aus der Abteilung und ein Vorschlag – alle Punkte sind da.",
        "Sprachliche Angemessenheit: gut gegliedert, passender Ton fürs Forum. Zu kurz (etwa 120 statt mindestens 150 Wörter) und mit wiederholten Fehlern bei der Verbposition („Auch man spart“, „Wenn …, wir machen“, „dass jeder kann“).",
      ],
      [
        [
          "Wenn wir zehn Stunden arbeiten, wir machen bestimmt mehr Fehler.",
          "Wenn wir zehn Stunden arbeiten, passieren bestimmt mehr Fehler.",
        ],
        [
          "Mein Vorschlag ist, dass jeder kann selbst entscheiden, …",
          "Ich schlage vor, dass alle selbst entscheiden können, …",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\ndie Idee, die Vier-Tage-Woche ein Jahr lang zu testen, finde ich grundsätzlich gut. Trotzdem sollten wir die Nachteile nicht unterschätzen.\n\nFür das Modell spricht vor allem der zusätzliche freie Tag. Wer Arzttermine oder Behördengänge erledigen muss, braucht dafür keinen Urlaub mehr. Außerdem entfällt einmal pro Woche der Arbeitsweg, was Zeit und Geld spart.\n\nAndererseits sind Arbeitstage von zehn Stunden anstrengend. In unserer Abteilung merken wir schon heute, dass am späten Nachmittag mehr Fehler passieren. Für Kolleginnen und Kollegen mit kleinen Kindern kommt hinzu, dass viele Kitas nur bis 16:30 Uhr geöffnet haben.\n\nEin Bekannter von mir arbeitet seit einem Jahr so. Er ist zufrieden, sagt aber auch, dass er abends zu nichts mehr kommt.\n\nIch würde deshalb vorschlagen, den Test freiwillig zu machen und nach drei Monaten eine kurze Umfrage durchzuführen. So sehen wir schnell, für welche Bereiche das Modell wirklich passt.\n\nViele Grüße\nAhmed Saleh, Versand`,
      [
        "Inhaltliche Angemessenheit: klare Position, abgewogene Argumente, zwei Beispiele und ein konkreter, realistischer Vorschlag.",
        "Sprachliche Angemessenheit: gut strukturiert mit Absätzen und Konnektoren (trotzdem, andererseits, kommt hinzu). Sicherer, abwechslungsreicher Wortschatz.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2/4.2/1",
  "dtb-b2",
  150,
  LP_FORUM(
    "erreichbar",
    "notfall|feierabend|erholung|abschalten|wochenende|stress",
  ),
  [
    [
      PASS[0],
      `Hallo,\nich finde, nach Feierabend ich will meine Ruhe. Ich habe Familie. Wenn der Chef anruft am Abend, ist das Stress. Aber manchmal ist es wichtig. Dann ist es ok. Wir brauchen Regeln.\nGruß\nIrina`,
      [
        "Inhaltliche Angemessenheit: Eine Meinung und ein Grund sind da. Beispiele fehlen, „Wir brauchen Regeln“ ist kein Vorschlag – welche Regeln?",
        "Sprachliche Angemessenheit: etwa 35 Wörter statt 150. Sehr einfache Sätze, Wortstellungsfehler („ich finde, … ich will“).",
      ],
      [
        [
          "Wir brauchen Regeln.",
          "Ich schlage vor, dass man nach 18 Uhr nur in echten Notfällen angerufen wird.",
        ],
        [
          "Wenn der Chef anruft am Abend, ist das Stress.",
          "Wenn abends noch Anrufe kommen, kann man sich kaum erholen.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nmeiner Meinung nach sollen wir nach Feierabend nicht immer erreichbar sein. Jeder braucht Zeit für Familie und Erholung.\nSeit ich ein Diensthandy habe, ich bekomme oft am Abend Nachrichten. Letzte Woche hat mich ein Kunde am Samstag angerufen wegen einer Rechnung. Das war nicht dringend, aber ich habe trotzdem eine Stunde gearbeitet.\nNatürlich es gibt Notfälle. Wenn zum Beispiel eine Maschine steht, muss jemand erreichbar sein. Das verstehe ich.\nIch schlage vor, dass es gibt einen Bereitschaftsdienst. Eine Person ist am Wochenende erreichbar und die anderen haben frei. Diese Person bekommt dafür einen freien Tag.\n\nViele Grüße\nIrina Volkova, Buchhaltung`,
      [
        "Inhaltliche Angemessenheit: Meinung, Gegenargument, ein gutes Beispiel und ein konkreter Vorschlag sind vorhanden.",
        "Sprachliche Angemessenheit: klarer Aufbau und passender Ton. Zu kurz (etwa 105 statt mindestens 150 Wörter); mehrere Verbfehler („Seit …, ich bekomme“, „Natürlich es gibt“, „dass es gibt“).",
      ],
      [
        [
          "Seit ich ein Diensthandy habe, ich bekomme oft am Abend Nachrichten.",
          "Seit ich ein Diensthandy habe, bekomme ich abends häufig noch Nachrichten.",
        ],
        [
          "Ich schlage vor, dass es gibt einen Bereitschaftsdienst.",
          "Ich schlage vor, einen Bereitschaftsdienst einzurichten.",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\ngut, dass die Geschäftsleitung dieses Thema anspricht. Meiner Ansicht nach brauchen wir klare Regeln, denn im Moment weiß niemand genau, was erwartet wird.\n\nSeit ich ein Diensthandy habe, erreichen mich regelmäßig Nachrichten nach 19 Uhr. Neulich rief mich ein Kunde sogar am Samstag an, obwohl es nur um eine Rechnung ging, die bis Montag Zeit gehabt hätte. Wer ständig erreichbar ist, kann nicht richtig abschalten, und das wirkt sich auf Dauer auf die Gesundheit aus.\n\nZwar gibt es Situationen, in denen schnelle Hilfe nötig ist, zum Beispiel wenn eine Anlage ausfällt. Dafür muss aber nicht die ganze Belegschaft bereitstehen.\n\nIch schlage daher einen Bereitschaftsdienst vor: Pro Abteilung ist am Abend und am Wochenende jeweils eine Person erreichbar, die dafür einen Zeitausgleich bekommt. Alle anderen dürfen ihr Diensthandy ausschalten und müssen auch keine E-Mails mehr lesen. So wäre für alle klar, wer wann zuständig ist.\n\nWas haltet ihr davon?\n\nViele Grüße\nIrina Volkova, Buchhaltung`,
      [
        "Inhaltliche Angemessenheit: klare Position, überzeugendes Beispiel, Gegenargument aufgenommen und entkräftet, genauer Vorschlag.",
        "Sprachliche Angemessenheit: flüssig, mit „zwar … aber“, „obwohl“, Relativsätzen und Konjunktiv II. Der Ton passt zum Forum.",
      ],
      [],
    ],
  ],
);

add(
  "dtb-b2-2/1.1/0",
  "dtb-b2",
  100,
  [
    [
      "Dank und Entschuldigung für beide Probleme",
      "dank|entschuldig|bedauer|leid",
    ],
    [
      "Erklärung der Verspätung (Unfall, Stau, fehlende Information)",
      "unfall|stau|a40|a 40|informiert|information",
    ],
    [
      "Erklärung der falschen Farbe (Fehler im Lager)",
      "lager|etikett|vertauscht|farbe|hellgrau|anthrazit",
    ],
    [
      "Angebot: Austausch am Samstag, 8 Uhr – Bitte um Bestätigung",
      "austausch|samstag|8 uhr|bestätig",
    ],
    ["15 % Rabatt auf den Gesamtpreis", "15 %|15%|15 prozent|rabatt|nachlass"],
    [
      "Kontaktmöglichkeit bei Rückfragen",
      "rückfragen|hoffmeister|0231|erreichen",
    ],
  ],
  [
    [
      PASS[0],
      `Sehr geehrter Herr Brückner,\n\nes tut uns leid. Es war Stau, deshalb die Monteure waren spät. Die Stühle haben falsche Farbe, das war ein Fehler von Lager. Wir bringen neue Stühle am Samstag.\n\nMit freundlichen Grüßen\nMöbelhaus Wohnwelt`,
      [
        "Inhaltliche Angemessenheit: Drei Punkte sind kurz genannt. Es fehlen: Uhrzeit und Bitte um Bestätigung, 15 % Rabatt, Ansprechpartner. Der Titel „Dr.“ fehlt in der Anrede.",
        "Sprachliche Angemessenheit: etwa 40 Wörter statt 100, einfache Sätze mit Fehlern („deshalb die Monteure waren“, „von Lager“).",
      ],
      [
        [
          "Wir bringen neue Stühle am Samstag.",
          "Wir tauschen die Stühle am Samstag um 8 Uhr aus. Bitte bestätigen Sie uns kurz, ob Ihnen dieser Termin passt.",
        ],
        [
          "(fehlt)",
          "Als Entschuldigung erhalten Sie 15 % Rabatt auf den Gesamtpreis.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Ihre Beschwerde – Auftrag 2026-3341\n\nSehr geehrter Herr Dr. Brückner,\n\nvielen Dank für Ihre Nachricht. Wir entschuldigen uns für die Verspätung und für die falsche Farbe.\nAm 14. Oktober war ein Unfall auf der A40 und unsere Monteure sind im Stau gestanden. Leider niemand hat Sie informiert, das darf nicht passieren.\nDie falsche Farbe war ein Fehler in unserem Lager. Die Etiketten waren vertauscht.\nWir möchten die Stühle austauschen am Samstag um 8 Uhr, wenn die Praxis geschlossen ist. Können Sie den Termin bestätigen?\nSie bekommen auch 15 % Rabatt auf den Gesamtpreis.\nBei Fragen Sie erreichen Herrn Hoffmeister unter 0231 / 55 90 12.\n\nMit freundlichen Grüßen\ni. A. Jana Horvat`,
      [
        "Inhaltliche Angemessenheit: Alle sechs Punkte sind richtig umgesetzt, auch die Bitte um Bestätigung.",
        "Sprachliche Angemessenheit: sachlich und höflich. Grundfehler bei der Verbposition („Leider niemand hat“, „Bei Fragen Sie erreichen“) und einfacher Wortschatz („Sie bekommen“).",
      ],
      [
        [
          "Leider niemand hat Sie informiert, das darf nicht passieren.",
          "Dass Sie darüber nicht informiert wurden, hätte nicht passieren dürfen.",
        ],
        [
          "Bei Fragen Sie erreichen Herrn Hoffmeister unter …",
          "Für Rückfragen steht Ihnen Herr Hoffmeister unter … gern zur Verfügung.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Ihre Beschwerde zum Auftrag 2026-3341\n\nSehr geehrter Herr Dr. Brückner,\n\nim Namen von Herrn Hoffmeister danke ich Ihnen für Ihre Nachricht. Für die verspätete Lieferung und die falsch gelieferten Stühle bitten wir Sie aufrichtig um Entschuldigung.\n\nWegen eines Unfalls auf der A40 standen unsere Monteure am 14. Oktober lange im Stau. Dass Ihre Praxis darüber nicht informiert wurde, bedauern wir besonders. Die falsche Farbe geht auf einen Fehler in unserem Lager zurück, wo Etiketten vertauscht wurden.\n\nSelbstverständlich tauschen wir die Stühle gegen die bestellten in Anthrazit aus. Wir schlagen dafür Samstag, 8 Uhr, vor, da Ihre Praxis dann geschlossen ist. Bitte bestätigen Sie uns diesen Termin kurz.\n\nAls Entschuldigung gewähren wir Ihnen 15 % Rabatt auf den Gesamtpreis.\n\nFür Rückfragen erreichen Sie Herrn Hoffmeister direkt unter 0231 / 55 90 12.\n\nMit freundlichen Grüßen\ni. A. Jana Horvat\nMöbelhaus Wohnwelt, Kundenservice`,
      [
        "Inhaltliche Angemessenheit: vollständig, genau und lösungsorientiert.",
        "Sprachliche Angemessenheit: professioneller Stil, Passiv und Nebensätze sicher, passende Wendungen (bitten um Entschuldigung, gewähren).",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-2/3.1/0",
  "dtb-b2",
  20,
  LP_NOTE(
    "reinhardt|kita sonnenschein",
    "71 00|7100|71-00",
    "verschieb|malerarbeiten|herbstferien|notbetreuung",
    "23|dezember|januar|weihnachtsferien|lösungsmittel|pohl|hausmeister|schlüssel|71 03",
    "freitag|zurückrufen|rückruf|andere firma",
  ),
  [
    [
      PASS[0],
      `Frau Reinhardt von Kita hat angerufen. Sie will Termin ändern, Weihnachten. Bitte zurückrufen.`,
      [
        "Inhaltliche Angemessenheit: Die Grundidee stimmt. Es fehlen: genaue Daten, Rückrufnummer, Farbe ohne Lösungsmittel, Schlüssel beim Hausmeister, die Frist bis Freitag.",
        "Sprachliche Angemessenheit: verständlich, aber ohne Rückfrage nicht nutzbar.",
      ],
      [
        [
          "Sie will Termin ändern, Weihnachten.",
          "Malerarbeiten verschieben: statt Herbstferien (ab 20.10.) in den Weihnachtsferien, 23.12.–03.01.",
        ],
        [
          "Bitte zurückrufen.",
          "Rückruf bis Freitag unter 0209 44 71 00 – sonst sucht sie eine andere Firma",
        ],
      ],
    ],
    [
      PASS[1],
      `Anruferin: Frau Reinhardt, Kita Sonnenschein, Tel. 0209 44 71 03\nAnliegen: Malerarbeiten nicht in Herbstferien möglich (Notbetreuung), neuer Termin 23.12.–03.01.\nDetails: Farbe ohne Lösungsmittel\nZu tun: zurückrufen bis Freitag`,
      [
        "Inhaltliche Angemessenheit: fast alles stimmt. Aber: Die notierte Nummer gehört dem Hausmeister, nicht Frau Reinhardt (ihre endet auf 00). Der Schlüssel beim Hausmeister Herrn Pohl fehlt.",
        "Sprachliche Angemessenheit: klar und gut gegliedert.",
      ],
      [
        ["Tel. 0209 44 71 03", "Rückruf Frau Reinhardt: 0209 44 71 00"],
        [
          "(fehlt)",
          "Schlüssel: beim Hausmeister Herrn Pohl, Tel. 0209 44 71 03",
        ],
      ],
    ],
    [
      PASS[2],
      `Anruferin: Claudia Reinhardt, Kita Sonnenschein (Gelsenkirchen-Buer), Rückruf: 0209 44 71 00\nAnliegen: Malerarbeiten in den Gruppenräumen verschieben – in den Herbstferien (ab 20.10.) nicht möglich, dort ist Notbetreuung\nDetails: Wunschtermin Weihnachtsferien, 23.12.–03.01. (Kita geschlossen); unbedingt lösungsmittelfreie Farbe; Schlüssel beim Hausmeister Herrn Pohl, Tel. 0209 44 71 03\nZu tun: bis Freitag zurückrufen, ob der Termin klappt – sonst beauftragt sie eine andere Firma`,
      [
        "Inhaltliche Angemessenheit: vollständig, beide Telefonnummern richtig zugeordnet.",
        "Sprachliche Angemessenheit: eindeutig und ohne Rückfrage verständlich.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-2/4.2/0",
  "dtb-b2",
  150,
  LP_FORUM(
    "großraumbüro",
    "laut|lärm|konzentr|austausch|kommunikation|ruhezone",
  ),
  [
    [
      PASS[0],
      `Hallo zusammen,\nich mag das Großraumbüro nicht. Es ist zu laut. Alle telefonieren und man kann nicht arbeiten. Ich will meinen Platz behalten. In meiner alten Firma war es auch so und es war schlecht.\nGrüße, Kemal`,
      [
        "Inhaltliche Angemessenheit: Meinung und ein Nachteil sind da. Vorteile, ein erklärtes Beispiel und ein Vorschlag fehlen.",
        "Sprachliche Angemessenheit: etwa 40 Wörter, einfache Hauptsätze, wenig Wortschatz („schlecht“, „nicht mögen“).",
      ],
      [
        [
          "Es ist zu laut. Alle telefonieren und man kann nicht arbeiten.",
          "Wenn mehrere Personen gleichzeitig telefonieren, kann man sich kaum auf die eigene Arbeit konzentrieren.",
        ],
        [
          "Ich will meinen Platz behalten.",
          "Ich würde vorschlagen, dass jede Abteilung zumindest einen festen Bereich bekommt.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nich habe über den Plan gelesen und ich bin nicht ganz dafür.\nNatürlich hat ein Großraumbüro Vorteile. Man kann schneller mit den Kollegen sprechen und die Firma spart Platz und Geld.\nAber ich sehe auch Nachteile. In meiner alten Firma wir haben in einem Großraumbüro gearbeitet. Es war immer laut und ich konnte mich schlecht konzentrieren, besonders wenn ich habe mit Kunden telefoniert. Auch ohne festen Arbeitsplatz man muss jeden Morgen einen Platz suchen, das kostet Zeit.\nIch schlage vor, dass es genug Ruhezonen gibt und dass jede Abteilung hat einen eigenen Bereich.\n\nViele Grüße\nKemal Aydın, Einkauf`,
      [
        "Inhaltliche Angemessenheit: Meinung, Vorteile, Nachteile, eigenes Beispiel und Vorschlag sind vorhanden.",
        "Sprachliche Angemessenheit: sinnvoller Aufbau. Zu kurz (etwa 100 statt mindestens 150 Wörter) und mit typischen Verbfehlern („In meiner alten Firma wir haben“, „wenn ich habe … telefoniert“, „dass jede Abteilung hat“).",
      ],
      [
        [
          "…, besonders wenn ich habe mit Kunden telefoniert.",
          "…, besonders wenn ich mit Kunden telefoniert habe.",
        ],
        [
          "… dass jede Abteilung hat einen eigenen Bereich.",
          "… dass jede Abteilung einen eigenen Bereich bekommt.",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\nden Plan für das neue Gebäude sehe ich mit gemischten Gefühlen. Ein offenes Büro kann funktionieren – aber nur, wenn es gut geplant ist.\n\nEinerseits wird der Austausch einfacher: Kurze Fragen lassen sich sofort klären, und man bekommt mehr von den anderen Teams mit. Andererseits habe ich in meiner früheren Firma erlebt, wie anstrengend der Lärm sein kann. Dort saßen wir mit dreißig Personen in einem Raum, und sobald mehrere telefonierten, war konzentriertes Arbeiten kaum möglich.\n\nSchwierig finde ich auch, dass es keine festen Plätze geben soll. Wer jeden Morgen einen Schreibtisch suchen und einrichten muss, verliert Zeit, und Unterlagen kann man nirgends liegen lassen.\n\nIch würde deshalb vorschlagen, dass jede Abteilung einen festen Bereich bekommt und dass es genügend kleine Räume für Telefonate gibt. Vielleicht könnten wir vor dem Umzug auch ein Büro besichtigen, das schon so arbeitet, und die Kolleginnen und Kollegen dort nach ihren Erfahrungen fragen.\n\nViele Grüße\nKemal Aydın, Einkauf`,
      [
        "Inhaltliche Angemessenheit: abgewogene Meinung, anschauliches Beispiel, zwei konkrete Vorschläge.",
        "Sprachliche Angemessenheit: klare Absätze, „einerseits – andererseits“, Relativsätze, sicherer Wortschatz.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-2/4.2/1",
  "dtb-b2",
  150,
  LP_FORUM("vegetarisch", "gesund|klima|fleisch|auswahl|freiheit|entscheiden"),
  [
    [
      PASS[0],
      `Hallo,\nzwei Tage ohne Fleisch ist für mich kein Problem. Gemüse ist gesund. Aber manche Kollegen wollen Fleisch essen, sie arbeiten schwer. Die Kantine soll gutes Essen machen.\nGrüße, Dana`,
      [
        "Inhaltliche Angemessenheit: Meinung und je ein Grund dafür und dagegen sind da. Ein Beispiel und ein konkreter Vorschlag fehlen.",
        "Sprachliche Angemessenheit: etwa 30 Wörter statt 150, sehr einfache Sätze.",
      ],
      [
        [
          "Die Kantine soll gutes Essen machen.",
          "Wichtig wäre, dass die vegetarischen Gerichte abwechslungsreich und sättigend sind.",
        ],
        [
          "Aber manche Kollegen wollen Fleisch essen, sie arbeiten schwer.",
          "Allerdings wünschen sich gerade die Kollegen aus der Produktion mittags eine kräftige Mahlzeit.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nich finde den Vorschlag von der Kantine gut. Zwei vegetarische Tage sind gesund und gut für das Klima.\nIch esse selbst gern Fleisch, aber nicht jeden Tag. Bei uns in der Kantine das vegetarische Essen ist oft langweilig, zum Beispiel nur Nudeln mit Tomatensoße. Deshalb viele Kollegen nehmen immer das Fleischgericht.\nEin Grund dagegen ist, dass jeder Mensch soll selbst entscheiden, was er isst. Manche Kollegen werden vielleicht dann draußen essen.\nMein Vorschlag: Die Kantine macht an diesen Tagen zwei oder drei verschiedene vegetarische Gerichte. Und wir können nach einem Monat abstimmen.\n\nViele Grüße\nDana Kowalski, Personalabteilung`,
      [
        "Inhaltliche Angemessenheit: alle vier Punkte bearbeitet, mit einem treffenden Beispiel aus der eigenen Kantine.",
        "Sprachliche Angemessenheit: verständlich und freundlich, aber zu kurz (etwa 100 statt mindestens 150 Wörter). Verbposition mehrmals falsch („in der Kantine das … Essen ist“, „Deshalb viele Kollegen nehmen“, „dass jeder Mensch soll“).",
      ],
      [
        [
          "Deshalb viele Kollegen nehmen immer das Fleischgericht.",
          "Deshalb greifen viele Kolleginnen und Kollegen immer zum Fleischgericht.",
        ],
        [
          "…, dass jeder Mensch soll selbst entscheiden, was er isst.",
          "…, dass jeder selbst entscheiden sollte, was er isst.",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\nden Vorschlag, an zwei Tagen pro Woche nur vegetarisch zu kochen, halte ich für sinnvoll – unter einer Bedingung: Das Angebot muss besser werden.\n\nFür die Idee spricht, dass weniger Fleisch nachweislich gesünder ist und die Kantine damit einen kleinen Beitrag zum Klimaschutz leistet. Außerdem würde niemandem etwas weggenommen, denn an drei Tagen gäbe es weiterhin Fleisch.\n\nDagegen lässt sich einwenden, dass Erwachsene selbst entscheiden möchten, was sie essen. Das verstehe ich gut, denn Verbote kommen selten gut an. Bisher besteht das vegetarische Gericht bei uns allerdings meist aus Nudeln mit Tomatensoße. Kein Wunder also, dass viele lieber zum Schnitzel greifen.\n\nIch schlage deshalb vor, dass die Kantine an den vegetarischen Tagen mindestens zwei verschiedene, wirklich sättigende Gerichte anbietet. Außerdem wäre es gut, wenn wir vorher Wünsche nennen könnten. Nach zwei Monaten könnten wir dann im Forum abstimmen, ob die Regelung bleiben soll.\n\nViele Grüße\nDana Kowalski, Personalabteilung`,
      [
        "Inhaltliche Angemessenheit: klare Position mit Bedingung, Gründe dafür und dagegen, konkretes Beispiel, praktikabler Vorschlag.",
        "Sprachliche Angemessenheit: flüssig und gut verknüpft, Konjunktiv II und Infinitivsätze sicher, lebendiger Stil.",
      ],
      [],
    ],
  ],
);

add(
  "dtb-b2-3/1.1/0",
  "dtb-b2",
  100,
  [
    [
      "Dank für die Rückmeldung und Entschuldigung",
      "dank|entschuldig|bedauer|leid",
    ],
    [
      "Erklärung zum Beamer und neue Lösung",
      "beamer|defekt|techniker|krank|bereitschaft",
    ],
    ["Erklärung zu den Zimmern", "zimmer|personal|reinigung|engpass"],
    ["Korrektur der Rechnung", "rechnung|abendessen|storn"],
    [
      "10 % Rabatt und kostenloser Tagungsraum im Frühjahr",
      "10 %|10%|10 prozent|rabatt|tagungsraum|kostenlos|frühjahr",
    ],
    ["Ansprechpartner für die Frühjahrstagung", "brenner|bankett|0221"],
  ],
  [
    [
      PASS[0],
      `Sehr geehrte Frau Seidel,\n\nentschuldigung für die Probleme. Der Beamer war kaputt und der Techniker war krank. Die Zimmer waren spät fertig, wir hatten wenig Personal. Das Abendessen müssen Sie nicht bezahlen.\n\nMit freundlichen Grüßen\nHotel Rheinblick`,
      [
        "Inhaltliche Angemessenheit: Vier Punkte sind kurz genannt. Es fehlen: die neue Lösung (Bereitschaftsdienst), die neue Rechnung, Rabatt und kostenloser Tagungsraum, der Ansprechpartner. Gerade das Angebot ist wichtig, damit die Kundin wiederkommt.",
        "Sprachliche Angemessenheit: etwa 40 Wörter statt 100, einfache Sätze ohne Verbindlichkeit.",
      ],
      [
        [
          "Das Abendessen müssen Sie nicht bezahlen.",
          "Das Abendessen am 30. Oktober wird storniert. Eine korrigierte Rechnung erhalten Sie noch diese Woche.",
        ],
        [
          "(fehlt)",
          "Als Entschuldigung gewähren wir Ihnen 10 % Rabatt auf die gesamte Tagung.",
        ],
      ],
    ],
    [
      PASS[1],
      `Betreff: Ihre Tagung vom 28.–30. Oktober\n\nSehr geehrte Frau Seidel,\n\nvielen Dank für Ihre Rückmeldung. Wir entschuldigen uns für alle Probleme.\nDer Beamer war defekt und unser Techniker war an diesem Tag krank. Jetzt wir haben einen zweiten Techniker im Bereitschaftsdienst.\nDie Zimmer waren spät fertig, weil wir hatten zu wenig Personal in der Reinigung.\nDas Abendessen am 30.10. war ein Fehler. Wir stornieren es und Sie bekommen diese Woche eine neue Rechnung.\nAußerdem Sie bekommen 10 % Rabatt und bei der Tagung im Frühjahr ist der Tagungsraum kostenlos. Ihr Ansprechpartner ist Herr Brenner, Tel. 0221 77 88 45.\n\nMit freundlichen Grüßen\nMariam Tahiri, Rezeption`,
      [
        "Inhaltliche Angemessenheit: Alle Punkte aus der Nachricht sind richtig umgesetzt.",
        "Sprachliche Angemessenheit: klar und höflich, aber sprachlich eher B1: Verbposition („Jetzt wir haben“, „weil wir hatten“, „Außerdem Sie bekommen“), wenig Varianz („Sie bekommen“ zweimal).",
      ],
      [
        [
          "Die Zimmer waren spät fertig, weil wir hatten zu wenig Personal in der Reinigung.",
          "Die Zimmer waren wegen eines Personalengpasses in der Reinigung leider nicht rechtzeitig fertig.",
        ],
        [
          "Außerdem Sie bekommen 10 % Rabatt …",
          "Außerdem erhalten Sie 10 % Rabatt auf die gesamte Tagung.",
        ],
      ],
    ],
    [
      PASS[2],
      `Betreff: Ihre Rückmeldung zur Tagung vom 28. bis 30. Oktober\n\nSehr geehrte Frau Seidel,\n\nim Namen der Hotelleitung danke ich Ihnen für Ihre Rückmeldung, die wir sehr ernst nehmen. Für die Unannehmlichkeiten während Ihrer Tagung bitten wir Sie um Entschuldigung.\n\nDer Beamer war am ersten Tag defekt, und unser Haustechniker war ausgerechnet an diesem Tag erkrankt. Damit so etwas nicht wieder vorkommt, haben wir inzwischen einen zweiten Techniker im Bereitschaftsdienst. Dass vier Zimmer erst um 18 Uhr bezugsfertig waren, lag an einem Personalengpass in der Reinigung und hätte nicht passieren dürfen.\n\nDas Abendessen am 30. Oktober wurde Ihnen irrtümlich berechnet. Wir stornieren den Betrag; die korrigierte Rechnung geht Ihnen noch diese Woche zu.\n\nAls Entschuldigung erhalten Sie 10 % Rabatt auf die gesamte Tagung. Zudem stellen wir Ihnen bei Ihrer Frühjahrstagung den Tagungsraum kostenlos zur Verfügung. Ihr Ansprechpartner dafür ist Herr Brenner (Bankett), Tel. 0221 77 88 45.\n\nMit freundlichen Grüßen\nMariam Tahiri\nHotel Rheinblick, Rezeption`,
      [
        "Inhaltliche Angemessenheit: alle Punkte vollständig, ohne Ausreden, mit klarem Angebot für die Zukunft.",
        "Sprachliche Angemessenheit: professionell, sicher in Passiv, „damit“-Satz und Konjunktiv II, treffender Wortschatz (bezugsfertig, irrtümlich).",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-3/3.1/0",
  "dtb-b2",
  20,
  LP_NOTE(
    "vogel|lindenhof|seniorenzentrum",
    "02361",
    "wartung|pflegebetten|verschieb|heimaufsicht",
    "donnerstag|13|26|fernbedienung|station 2|station zwei",
    "freitag|bestätig",
  ),
  [
    [
      PASS[0],
      `Frau Vogel vom Seniorenzentrum hat angerufen. Dienstag geht nicht. Sie will Donnerstag. Bitte anrufen.`,
      [
        "Inhaltliche Angemessenheit: Das Anliegen ist erkennbar. Es fehlen: worum es geht (Wartung der Pflegebetten), Uhrzeit, die neue Zahl der Betten, die defekten Fernbedienungen, Nummer und Frist.",
        "Sprachliche Angemessenheit: verständlich, aber zu ungenau für die Planung.",
      ],
      [
        [
          "Dienstag geht nicht. Sie will Donnerstag.",
          "Wartung der Pflegebetten vom Di., 11., auf Do., 13., ab 13 Uhr verschieben (Di. kommt die Heimaufsicht)",
        ],
        [
          "Bitte anrufen.",
          "Neuen Termin bis Freitag bestätigen: 02361 50 78 12",
        ],
      ],
    ],
    [
      PASS[1],
      `Anruferin: Frau Vogel, Seniorenzentrum Lindenhof, 02361 50 78 12\nAnliegen: Wartung Pflegebetten verschieben, Dienstag kommt Heimaufsicht\nDetails: neuer Termin Donnerstag 13., 13 Uhr; 24 Betten\nZu tun: Termin bestätigen`,
      [
        "Inhaltliche Angemessenheit: Name, Nummer und neuer Termin stimmen. Fehler: Es sind jetzt 26 Betten, nicht 24. Die drei Fernbedienungen auf Station 2 und die Frist (bis Freitag) fehlen.",
        "Sprachliche Angemessenheit: übersichtlich.",
      ],
      [
        ["24 Betten", "26 Betten (2 neue seit Oktober, bitte mitprüfen)"],
        [
          "Termin bestätigen",
          "Termin bis Freitag bestätigen; Techniker soll 3 Betten auf Station 2 ansehen (Fernbedienung)",
        ],
      ],
    ],
    [
      PASS[2],
      `Anruferin: Katrin Vogel, Pflegedienstleitung, Seniorenzentrum Lindenhof (Recklinghausen), Tel. 02361 50 78 12\nAnliegen: Wartung der Pflegebetten verschieben – Dienstag, 11., nicht möglich (Heimaufsicht im Haus)\nDetails: Wunsch: Donnerstag, 13., ab 13 Uhr. Jetzt 26 statt 24 Betten (2 neue mitprüfen). Bei 3 Betten auf Station 2 funktioniert die Fernbedienung manchmal nicht – bitte ansehen\nZu tun: neuen Termin bis Freitag bestätigen (sie muss die Dienstpläne anpassen)`,
      [
        "Inhaltliche Angemessenheit: vollständig und richtig, mit Grund und Frist.",
        "Sprachliche Angemessenheit: knapp, genau, sofort verwendbar.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-3/4.2/0",
  "dtb-b2",
  150,
  LP_FORUM(
    "desk-sharing|desksharing|schreibtisch",
    "platz|app|buchen|team|persönlich|unterlagen|sparen",
  ),
  [
    [
      PASS[0],
      `Hallo,\nDesk-Sharing finde ich nicht gut. Ich möchte meinen Schreibtisch haben mit meinen Sachen. Jeden Tag ein anderer Platz ist stressig. Die App funktioniert vielleicht nicht. Aber die Firma spart Geld.\nGrüße, Luca`,
      [
        "Inhaltliche Angemessenheit: Meinung, zwei Nachteile und ein Vorteil sind genannt. Es gibt kein Beispiel und keinen Vorschlag.",
        "Sprachliche Angemessenheit: etwa 35 Wörter statt 150, einfache Reihung von Hauptsätzen.",
      ],
      [
        [
          "Jeden Tag ein anderer Platz ist stressig.",
          "Wenn man jeden Morgen einen neuen Platz suchen muss, beginnt der Tag mit unnötigem Stress.",
        ],
        [
          "Aber die Firma spart Geld.",
          "Ich verstehe natürlich, dass die Firma Bürofläche sparen möchte, da viele im Homeoffice arbeiten.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nich möchte etwas zum Desk-Sharing sagen. Ich verstehe die Idee, aber ich bin skeptisch.\nEin Vorteil ist, dass die Firma weniger Platz braucht, weil viele Kollegen sind im Homeoffice. Man lernt auch andere Kollegen kennen, wenn man neben ihnen sitzt.\nEin Nachteil ist, dass man hat keinen persönlichen Platz mehr. Ich brauche zwei Bildschirme und meine Unterlagen. Wenn ich jeden Tag alles aufbauen muss, ich verliere viel Zeit. In der Firma von meiner Frau gibt es Desk-Sharing und oft sitzt ihr Team nicht zusammen.\nIch schlage vor, dass jedes Team hat eine feste Zone. In der Zone kann man dann den Platz buchen.\n\nViele Grüße\nLuca Moretti, Controlling`,
      [
        "Inhaltliche Angemessenheit: Meinung, Vor- und Nachteile, zwei Beispiele und ein sinnvoller Vorschlag – alles vorhanden.",
        "Sprachliche Angemessenheit: gute Gliederung, aber zu kurz (etwa 110 statt mindestens 150 Wörter). Wiederholter Fehler: Verb im Nebensatz („weil viele Kollegen sind“, „dass man hat“, „dass jedes Team hat“).",
      ],
      [
        [
          "…, weil viele Kollegen sind im Homeoffice.",
          "…, weil viele Kolleginnen und Kollegen im Homeoffice arbeiten.",
        ],
        [
          "Wenn ich jeden Tag alles aufbauen muss, ich verliere viel Zeit.",
          "Wenn ich jeden Tag alles neu aufbauen muss, verliere ich viel Zeit.",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\ndass die Geschäftsleitung über Desk-Sharing nachdenkt, kann ich nachvollziehen: An manchen Tagen ist bei uns die Hälfte der Schreibtische leer. Trotzdem bin ich von dem Plan noch nicht überzeugt.\n\nSicher ließe sich Bürofläche sparen, und man käme häufiger mit Kolleginnen und Kollegen aus anderen Teams ins Gespräch. Dem stehen aber praktische Probleme gegenüber. Ich arbeite zum Beispiel mit zwei Bildschirmen und vielen Papierunterlagen. Müsste ich das jeden Morgen neu aufbauen, ginge mir täglich eine Viertelstunde verloren.\n\nHinzu kommt, was meine Frau aus ihrer Firma berichtet: Dort sitzt ihr Team seit der Einführung oft über zwei Etagen verteilt, sodass kurze Absprachen schwieriger geworden sind.\n\nMein Vorschlag wäre daher ein Mittelweg. Jedes Team bekommt eine feste Zone, in der man seinen Platz per App bucht, und für persönliche Unterlagen gibt es abschließbare Schränke. Vor der Einführung sollten wir das einen Monat lang in einer Abteilung ausprobieren.\n\nViele Grüße\nLuca Moretti, Controlling`,
      [
        "Inhaltliche Angemessenheit: differenzierte Meinung, eigene und fremde Erfahrung als Beispiel, durchdachter Vorschlag.",
        "Sprachliche Angemessenheit: sehr gut verknüpft (trotzdem, hinzu kommt, sodass), sicherer Konjunktiv II, präziser Wortschatz.",
      ],
      [],
    ],
  ],
);
add(
  "dtb-b2-3/4.2/1",
  "dtb-b2",
  150,
  LP_FORUM(
    "weiterbildung|online-kurs|freizeit",
    "kostenlos|arbeitszeit|familie|karriere|fair|nutzen",
  ),
  [
    [
      PASS[0],
      `Hallo,\ndie Kurse sind kostenlos, das ist gut. Aber in der Freizeit ich habe keine Zeit. Ich habe zwei Kinder. Die Firma soll die Kurse in der Arbeitszeit machen. Das ist fair.\nGrüße, Amina`,
      [
        "Inhaltliche Angemessenheit: Meinung, ein Vorteil, ein Nachteil und eine Forderung sind erkennbar. Kein Beispiel aus dem Arbeitsalltag, die Forderung wird nicht begründet.",
        "Sprachliche Angemessenheit: etwa 35 Wörter, einfache Sätze, Verbfehler („in der Freizeit ich habe“).",
      ],
      [
        [
          "Aber in der Freizeit ich habe keine Zeit.",
          "Allerdings bleibt mir nach der Arbeit kaum Zeit, weil ich mich um meine Kinder kümmere.",
        ],
        [
          "Die Firma soll die Kurse in der Arbeitszeit machen.",
          "Ich fände es fair, wenn zumindest ein Teil der Kurszeit als Arbeitszeit zählen würde.",
        ],
      ],
    ],
    [
      PASS[1],
      `Liebe Kolleginnen und Kollegen,\n\nich finde es gut, dass die Firma kostenlose Online-Kurse anbietet. Aber ich finde es nicht ganz fair, dass wir sie nur in der Freizeit machen sollen.\nDie Kurse sind gut für uns, weil wir können etwas Neues lernen und vielleicht eine bessere Stelle bekommen. Aber die Firma hat auch einen Vorteil, wenn die Mitarbeiter mehr können.\nIch arbeite Vollzeit und ich habe zwei Kinder. Am Abend ich bin müde und ich kann mich nicht mehr konzentrieren. Letztes Jahr ich habe einen Excel-Kurs am Abend gemacht und nach drei Wochen aufgehört.\nMein Vorschlag ist: Die Hälfte von der Zeit ist Arbeitszeit und die Hälfte ist Freizeit.\n\nViele Grüße\nAmina Diallo, Kundenservice`,
      [
        "Inhaltliche Angemessenheit: klare Meinung, Gründe für beide Seiten, gutes persönliches Beispiel, konkreter Vorschlag.",
        "Sprachliche Angemessenheit: verständlich und gut aufgebaut, aber zu kurz (etwa 115 statt mindestens 150 Wörter). Verbposition häufig falsch („weil wir können“, „Am Abend ich bin“, „Letztes Jahr ich habe“); „aber“ wiederholt sich.",
      ],
      [
        [
          "Am Abend ich bin müde und ich kann mich nicht mehr konzentrieren.",
          "Abends bin ich müde und kann mich kaum noch konzentrieren.",
        ],
        [
          "Die Hälfte von der Zeit ist Arbeitszeit und die Hälfte ist Freizeit.",
          "Die Hälfte der Kurszeit sollte als Arbeitszeit angerechnet werden.",
        ],
      ],
    ],
    [
      PASS[2],
      `Liebe Kolleginnen und Kollegen,\n\ngrundsätzlich begrüße ich es sehr, dass unsere Firma ab dem nächsten Jahr kostenlose Online-Kurse anbietet. Dass sie ausschließlich in der Freizeit stattfinden sollen, halte ich jedoch nicht für fair.\n\nNatürlich profitieren wir selbst von einer Weiterbildung, etwa wenn wir uns intern auf eine andere Stelle bewerben möchten. Genauso profitiert aber das Unternehmen, wenn wir neue Programme sicher beherrschen. Deshalb sollten beide Seiten etwas beitragen.\n\nAus eigener Erfahrung weiß ich, wie schwer Lernen am Abend ist. Im letzten Jahr habe ich neben Vollzeitjob und Familie einen Excel-Kurs begonnen und nach drei Wochen abgebrochen, weil mir schlicht die Kraft fehlte. Ich fürchte, dass es vielen ähnlich gehen würde und die Kurse am Ende kaum genutzt werden.\n\nMein Vorschlag: Die Hälfte der Kurszeit wird als Arbeitszeit angerechnet, die andere Hälfte bringen wir selbst ein. Für Kurse, die die Firma ausdrücklich verlangt, sollte die gesamte Zeit zählen.\n\nViele Grüße\nAmina Diallo, Kundenservice`,
      [
        "Inhaltliche Angemessenheit: klare, begründete Position, überzeugendes Beispiel, fairer und genauer Vorschlag.",
        "Sprachliche Angemessenheit: sicher und abwechslungsreich (jedoch, genauso, deshalb), Passiv und Konjunktiv II korrekt.",
      ],
      [],
    ],
  ],
);

/* ================= Writing practice (#ueben/schreiben/<Level>/<n>) ================= */
const U = ["noch zu wenig", "fast geschafft", "gut"];
const u = (lv, n, target, lp, s) =>
  add(
    `ueben/${lv}/${n}`,
    "ueben",
    target,
    lp,
    s.map((x, i) => [U[i], ...x]),
  );

u(
  "A1",
  0,
  12,
  [
    ["Wie heißt du?", "heiße|name|ich bin"],
    ["Wo wohnst du?", "wohne|lebe"],
    ["Welche Sprache sprichst du?", "spreche|sprache|deutsch"],
  ],
  [
    [
      `ich Mila. Essen wohnen. sprechen ukrainisch.`,
      [
        "Inhalt: Alle drei Informationen sind da.",
        "Sprache: Im ersten Satz fehlt das Verb, die anderen Verben sind nicht konjugiert. „ich“ fehlt zweimal. Satzanfänge und Sprachen schreibt man groß.",
      ],
      [
        ["ich Mila.", "Ich heiße Mila."],
        ["Essen wohnen.", "Ich wohne in Essen."],
      ],
    ],
    [
      `Hallo! Ich heiße Mila. Ich wohne Essen. Ich spreche ukrainisch und bisschen Deutsch.`,
      [
        "Inhalt: vollständig, mit Begrüßung.",
        "Sprache: Verben sind richtig. Es fehlt „in“ vor der Stadt und „ein“ vor „bisschen“.",
      ],
      [
        ["Ich wohne Essen.", "Ich wohne in Essen."],
        [
          "Ich spreche ukrainisch und bisschen Deutsch.",
          "Ich spreche Ukrainisch und ein bisschen Deutsch.",
        ],
      ],
    ],
    [
      `Hallo! Ich heiße Mila. Ich komme aus der Ukraine und wohne jetzt in Essen. Ich spreche Ukrainisch und ein bisschen Deutsch.`,
      [
        "Inhalt: alles da, sogar mit Herkunft.",
        "Sprache: richtige Verben, richtige Präpositionen. Zwei Sätze sind mit „und“ verbunden.",
      ],
      [],
    ],
  ],
);
u(
  "A1",
  1,
  12,
  [
    ["Was möchtest du?", "möchte|brot|bitte"],
    ["Wie viel kostet es?", "kostet|preis|wie viel"],
    ["Wie sagst du Danke?", "danke|dank"],
  ],
  [
    [
      `Brot. Was kosten? Danke.`,
      [
        "Inhalt: Man versteht, was die Person will.",
        "Sprache: keine ganzen Sätze, kein „bitte“. Das Verb passt nicht („kosten“).",
      ],
      [
        ["Brot.", "Ich möchte ein Brot, bitte."],
        ["Was kosten?", "Was kostet das?"],
      ],
    ],
    [
      `Guten Tag! Ich möchte Brot bitte. Was kostet Brot? Danke.`,
      [
        "Inhalt: Wunsch, Frage und Dank sind da.",
        "Sprache: höflich mit „Guten Tag“ und „bitte“. Der Artikel fehlt zweimal.",
      ],
      [
        ["Ich möchte Brot bitte.", "Ich möchte ein Brot, bitte."],
        ["Was kostet Brot?", "Was kostet das Brot?"],
      ],
    ],
    [
      `Guten Tag! Ich möchte ein Brot, bitte. Was kostet das? Vielen Dank. Auf Wiedersehen!`,
      [
        "Inhalt: vollständig, mit Gruß am Anfang und am Ende.",
        "Sprache: richtig und höflich.",
      ],
      [],
    ],
  ],
);
u(
  "A1",
  2,
  15,
  [
    ["An wen schreibst du?", "frau|herr|hallo|liebe"],
    ["Was ist los?", "krank|fieber|kann nicht|komme nicht"],
    [
      "Wann kommst du wieder?",
      "montag|dienstag|mittwoch|donnerstag|freitag|morgen|wieder",
    ],
  ],
  [
    [
      `ich krank. nicht kommen.`,
      [
        "Inhalt: Der Grund ist klar. Anrede, Name und „Wann komme ich wieder?“ fehlen.",
        "Sprache: Verben fehlen oder sind nicht konjugiert.",
      ],
      [
        ["ich krank.", "Ich bin krank."],
        ["nicht kommen.", "Ich kann heute nicht kommen."],
      ],
    ],
    [
      `Hallo Frau Weber,\nich bin krank. Ich komme heute nicht. Ich komme Montag.\nAli`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: einfache, richtige Sätze. „am“ fehlt vor dem Tag, ein Gruß fehlt.",
      ],
      [
        ["Ich komme Montag.", "Ich komme am Montag wieder."],
        ["Ali", "Viele Grüße\nAli"],
      ],
    ],
    [
      `Hallo Frau Weber,\nich bin leider krank. Ich kann heute nicht zum Kurs kommen. Am Montag komme ich wieder.\nViele Grüße\nAli`,
      [
        "Inhalt: vollständig, mit Anrede und Gruß.",
        "Sprache: „kann … kommen“ und „Am Montag komme ich“ sind richtig gebaut.",
      ],
      [],
    ],
  ],
);
u(
  "A1",
  3,
  15,
  [
    [
      "Hast du Kinder oder Geschwister?",
      "kinder|kind|sohn|tochter|bruder|schwester|geschwister",
    ],
    ["Wie heißen sie?", "heißt|heißen|name"],
    ["Wo wohnen sie?", "wohnt|wohnen|lebt|leben"],
  ],
  [
    [
      `Ich habe zwei Kind. Lea und Tim. Eltern Ukraine.`,
      [
        "Inhalt: Man versteht die Familie.",
        "Sprache: Plural fehlt („zwei Kinder“), dem zweiten und dritten Satz fehlt das Verb.",
      ],
      [
        ["Ich habe zwei Kind.", "Ich habe zwei Kinder."],
        ["Eltern Ukraine.", "Meine Eltern wohnen in der Ukraine."],
      ],
    ],
    [
      `Ich habe zwei Kinder. Mein Tochter heißt Lea und mein Sohn heißt Tim. Meine Eltern wohnen in Ukraine.`,
      [
        "Inhalt: alle Fragen beantwortet.",
        "Sprache: gute Sätze mit „und“. „meine Tochter“ (feminin) und „in der Ukraine“ sind noch falsch.",
      ],
      [
        ["Mein Tochter heißt Lea …", "Meine Tochter heißt Lea …"],
        ["… wohnen in Ukraine.", "… wohnen in der Ukraine."],
      ],
    ],
    [
      `Ich habe zwei Kinder. Meine Tochter heißt Lea und mein Sohn heißt Tim. Wir wohnen in Essen. Meine Eltern wohnen in der Ukraine.`,
      [
        "Inhalt: vollständig und klar.",
        "Sprache: „mein/meine“ und die Verben stimmen.",
      ],
      [],
    ],
  ],
);
u(
  "A1",
  4,
  15,
  [
    ["Wohin möchtest du fahren?", "bahnhof|fahren|möchte"],
    ["Was kostet die Fahrkarte?", "kostet|preis|fahrkarte|ticket"],
    ["Wo musst du aussteigen?", "aussteigen|haltestelle|ausstieg"],
  ],
  [
    [
      `Bahnhof. Ticket bitte. Wo aussteigen?`,
      [
        "Inhalt: Der Busfahrer versteht das Ziel. Die Frage nach dem Preis fehlt.",
        "Sprache: nur Wörter, keine Sätze.",
      ],
      [
        ["Bahnhof.", "Ich möchte zum Bahnhof fahren."],
        ["Wo aussteigen?", "Wo muss ich aussteigen?"],
      ],
    ],
    [
      `Guten Tag! Ich möchte zu Bahnhof. Eine Fahrkarte bitte. Was kostet? Wo ich muss aussteigen?`,
      [
        "Inhalt: alle drei Punkte sind da.",
        "Sprache: höflich. Richtig heißt es „zum Bahnhof“ und „Was kostet das?“. In der letzten Frage steht das Verb noch falsch.",
      ],
      [
        ["Ich möchte zu Bahnhof.", "Ich möchte zum Bahnhof."],
        ["Wo ich muss aussteigen?", "Wo muss ich aussteigen?"],
      ],
    ],
    [
      `Guten Tag! Ich möchte zum Bahnhof fahren. Eine Fahrkarte, bitte. Was kostet das? Und wo muss ich aussteigen?`,
      [
        "Inhalt: vollständig.",
        "Sprache: Fragen sind richtig gebaut, „zum“ stimmt.",
      ],
      [],
    ],
  ],
);
u(
  "A1",
  5,
  20,
  [
    ["Was kommt morgen?", "paket"],
    [
      "Warum bist du nicht zu Hause?",
      "arbeite|arbeit|nicht zu hause|termin|kurs",
    ],
    ["Wann holst du das Paket ab?", "hole|abholen|abend|uhr"],
  ],
  [
    [
      `Paket kommt morgen. Ich nicht da. Bitte nehmen.`,
      [
        "Inhalt: Die Bitte ist verständlich. Wann das Paket abgeholt wird, fehlt.",
        "Sprache: keine Anrede, kein Gruß. Verb und „Sie“ fehlen in der Bitte.",
      ],
      [
        ["Ich nicht da.", "Ich bin morgen nicht zu Hause."],
        ["Bitte nehmen.", "Können Sie das Paket bitte annehmen?"],
      ],
    ],
    [
      `Liebe Frau Schulz,\nmorgen kommt ein Paket. Ich bin nicht zu Hause, ich arbeite. Können Sie Paket nehmen? Ich hole am Abend.\nDanke\nAmira`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: Anrede und höfliche Frage sind gut. Artikel („das Paket“) und „es“ fehlen.",
      ],
      [
        ["Können Sie Paket nehmen?", "Können Sie das Paket bitte annehmen?"],
        ["Ich hole am Abend.", "Ich hole es am Abend ab."],
      ],
    ],
    [
      `Liebe Frau Schulz,\nmorgen kommt ein Paket für mich. Ich bin leider nicht zu Hause, weil ich arbeite. Können Sie das Paket bitte annehmen? Ich hole es am Abend ab.\nVielen Dank und viele Grüße\nAmira`,
      [
        "Inhalt: vollständig, freundlich.",
        "Sprache: trennbares Verb („hole … ab“) und sogar ein „weil“-Satz sind richtig.",
      ],
      [],
    ],
  ],
);

u(
  "A2",
  0,
  35,
  [
    ["Welchen Termin hast du?", "termin|morgen|uhr"],
    ["Warum kannst du nicht kommen?", "weil|leider|krank|arbeiten|kann nicht"],
    [
      "Wann hast du Zeit?",
      "zeit|donnerstag|freitag|montag|vormittag|nachmittag|neuen termin",
    ],
  ],
  [
    [
      `Hallo, ich habe Termin morgen. Ich komme nicht. Ich will neue Termin.`,
      [
        "Inhalt: Termin und Absage sind da. Der Grund und ein Vorschlag fehlen.",
        "Sprache: „Ich will“ klingt unhöflich. Artikel und Endung fehlen („einen neuen Termin“).",
      ],
      [
        [
          "Ich komme nicht.",
          "Leider kann ich nicht kommen, weil mein Kind krank ist.",
        ],
        [
          "Ich will neue Termin.",
          "Kann ich bitte einen neuen Termin bekommen?",
        ],
      ],
    ],
    [
      `Guten Tag,\nich habe morgen um 10 Uhr einen Termin. Leider ich kann nicht kommen, weil mein Kind ist krank. Kann ich am Donnerstag kommen?\nViele Grüße\nMila Petrova`,
      [
        "Inhalt: Termin, Grund und Vorschlag sind da.",
        "Sprache: höflich. Das Verb steht nach „Leider“ und im „weil“-Satz falsch.",
      ],
      [
        [
          "Leider ich kann nicht kommen, weil mein Kind ist krank.",
          "Leider kann ich nicht kommen, weil mein Kind krank ist.",
        ],
        [
          "Kann ich am Donnerstag kommen?",
          "Kann ich am Donnerstag kommen? Am Vormittag habe ich Zeit.",
        ],
      ],
    ],
    [
      `Guten Tag,\nich habe morgen um 10 Uhr einen Termin bei Ihnen. Leider kann ich nicht kommen, weil mein Kind krank ist. Könnte ich einen neuen Termin bekommen? Am Donnerstag und Freitag habe ich am Vormittag Zeit.\nVielen Dank und freundliche Grüße\nMila Petrova`,
      [
        "Inhalt: vollständig, mit zwei möglichen Tagen.",
        "Sprache: „weil“-Satz richtig, höfliche Frage mit „Könnte ich“.",
      ],
      [],
    ],
  ],
);
u(
  "A2",
  1,
  35,
  [
    ["Wann möchtest du dich treffen?", "samstag|sonntag|uhr|wann|wochenende"],
    ["Wo trefft ihr euch?", "park|eingang|treffen|treffpunkt"],
    [
      "Was bringt ihr mit?",
      "bringe|mitbringen|getränke|obst|essen|kuchen|decke",
    ],
  ],
  [
    [
      `Hallo Omar, kommst du Park? Samstag. Ich bringe Trinken.`,
      [
        "Inhalt: Tag und Ort sind genannt. Uhrzeit und Treffpunkt fehlen.",
        "Sprache: sehr kurz. „in den Park“ und „Getränke“ wären richtig.",
      ],
      [
        [
          "kommst du Park? Samstag.",
          "Hast du am Samstag Zeit? Wir können in den Park gehen.",
        ],
        ["Ich bringe Trinken.", "Ich bringe Getränke mit."],
      ],
    ],
    [
      `Hallo Omar,\nhast du Zeit am Samstag? Wir können uns treffen im Park um 15 Uhr. Ich bringe Getränke. Kannst du Obst bringen?\nViele Grüße\nMila`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: freundlich und klar. „mitbringen“ ist trennbar, der genaue Treffpunkt fehlt noch.",
      ],
      [
        [
          "Wir können uns treffen im Park um 15 Uhr.",
          "Wir können uns um 15 Uhr am Eingang vom Park treffen.",
        ],
        ["Ich bringe Getränke.", "Ich bringe Getränke mit."],
      ],
    ],
    [
      `Hallo Omar,\nhast du am Samstag Zeit? Wir können uns um 15 Uhr am Eingang vom Stadtpark treffen. Ich bringe Getränke mit. Kannst du vielleicht Obst mitbringen? Schreib mir bitte, ob du kommen kannst.\nViele Grüße\nMila`,
      [
        "Inhalt: vollständig, mit Bitte um Antwort.",
        "Sprache: trennbare Verben richtig, Satz mit „ob“ richtig.",
      ],
      [],
    ],
  ],
);
u(
  "A2",
  2,
  40,
  [
    ["Was ist kaputt?", "heizung|kaputt|funktioniert nicht|kalt"],
    ["Seit wann?", "seit|montag|tagen|woche"],
    [
      "Wann kann jemand kommen?",
      "zu hause|uhr|donnerstag|freitag|handwerker|vormittag|nachmittag",
    ],
  ],
  [
    [
      `Hallo, Heizung ist kaputt. Es ist kalt. Bitte kommen Sie.`,
      [
        "Inhalt: Das Problem ist klar. „Seit wann?“ und „Wann bin ich zu Hause?“ fehlen.",
        "Aufbau: Für den Vermieter passt „Sehr geehrter Herr …“ und ein Gruß mit Namen.",
      ],
      [
        [
          "Heizung ist kaputt.",
          "Seit Montag funktioniert die Heizung in meiner Wohnung nicht.",
        ],
        ["Bitte kommen Sie.", "Bitte schicken Sie einen Handwerker."],
      ],
    ],
    [
      `Sehr geehrter Herr Schmitz,\ndie Heizung in meine Wohnung ist kaputt seit Montag. Es ist sehr kalt. Bitte schicken Sie einen Handwerker. Ich bin zu Hause am Donnerstag.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: formelle Anrede und Gruß stimmen. „in meiner Wohnung“ (Dativ) und die Uhrzeit fehlen.",
      ],
      [
        [
          "die Heizung in meine Wohnung ist kaputt seit Montag.",
          "Seit Montag ist die Heizung in meiner Wohnung kaputt.",
        ],
        [
          "Ich bin zu Hause am Donnerstag.",
          "Am Donnerstag bin ich ab 14 Uhr zu Hause.",
        ],
      ],
    ],
    [
      `Sehr geehrter Herr Schmitz,\nseit Montag funktioniert die Heizung in meiner Wohnung nicht. Es ist sehr kalt, besonders im Kinderzimmer. Bitte schicken Sie schnell einen Handwerker. Am Donnerstag und Freitag bin ich ab 14 Uhr zu Hause.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: vollständig und genau.",
        "Sprache: Verb auf Position 2 nach „seit Montag“ und „Am Donnerstag“ – richtig.",
      ],
      [],
    ],
  ],
);
u(
  "A2",
  3,
  40,
  [
    ["Wofür bedankst du dich?", "dank|einladung"],
    ["Warum kannst du nicht kommen?", "weil|leider|kann nicht|besuch|arbeiten"],
    [
      "Was schlägst du stattdessen vor?",
      "nächste woche|kaffee|treffen|wollen wir|vielleicht",
    ],
  ],
  [
    [
      `Hallo Sara, danke. Ich komme nicht Samstag. Meine Schwester kommt.`,
      [
        "Inhalt: Dank und Absage sind da. Ein Vorschlag fehlt.",
        "Sprache: Ohne „leider“ klingt die Absage hart. Vor „Samstag“ fehlt „am“.",
      ],
      [
        [
          "Ich komme nicht Samstag.",
          "Leider kann ich am Samstag nicht kommen.",
        ],
        ["(fehlt)", "Wollen wir nächste Woche einen Kaffee trinken?"],
      ],
    ],
    [
      `Liebe Sara,\ndanke für die Einladung. Leider ich kann nicht kommen, weil meine Schwester besucht uns. Wir können nächste Woche Kaffee trinken?\nViele Grüße\nOmar`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: freundlich. Verbposition nach „Leider“, im „weil“-Satz und in der Frage ist noch falsch.",
      ],
      [
        [
          "Leider ich kann nicht kommen, weil meine Schwester besucht uns.",
          "Leider kann ich nicht kommen, weil meine Schwester uns besucht.",
        ],
        [
          "Wir können nächste Woche Kaffee trinken?",
          "Wollen wir nächste Woche zusammen einen Kaffee trinken?",
        ],
      ],
    ],
    [
      `Liebe Sara,\nvielen Dank für die Einladung! Leider kann ich am Samstag nicht kommen, weil meine Schwester uns besucht. Wollen wir nächste Woche zusammen einen Kaffee trinken? Ich wünsche dir eine schöne Feier!\nViele Grüße\nOmar`,
      [
        "Inhalt: vollständig, mit gutem Wunsch am Ende.",
        "Sprache: „weil“-Satz und Frage sind richtig.",
      ],
      [],
    ],
  ],
);
u(
  "A2",
  4,
  40,
  [
    [
      "Wer bist du, und wie heißt dein Kind?",
      "mutter|vater|ich bin|hier ist|sohn|tochter",
    ],
    [
      "Warum kannst du heute nicht kommen?",
      "arbeiten|arbeit|länger|kann nicht",
    ],
    ["Wer holt das Kind ab, und wann?", "schwester|holt|abholen|uhr"],
    ["Was muss die Person mitbringen?", "bringen|ausweis|brauch"],
  ],
  [
    [
      `Hallo, ich bin Mutter von Yusuf. Ich komme nicht heute. Meine Schwester kommt.`,
      [
        "Inhalt: Wer spricht und wer kommt, ist klar. Grund, Uhrzeit und die Frage fehlen.",
        "Sprache: „die Mutter“, „heute nicht“ – kleine Wörter fehlen oder stehen falsch.",
      ],
      [
        [
          "Ich komme nicht heute.",
          "Ich kann Yusuf heute nicht abholen, weil ich länger arbeiten muss.",
        ],
        [
          "Meine Schwester kommt.",
          "Meine Schwester Leila holt ihn um 16 Uhr ab.",
        ],
      ],
    ],
    [
      `Guten Tag, hier ist Samira Haddad, die Mutter von Yusuf. Ich muss heute lange arbeiten und ich kann Yusuf nicht abholen. Meine Schwester holt ihn um 16 Uhr. Muss sie etwas bringen?`,
      [
        "Inhalt: Alle vier Punkte sind da.",
        "Sprache: gut verständlich. „abholen“ und „mitbringen“ sind trennbar – die Vorsilbe fehlt am Satzende.",
      ],
      [
        [
          "Meine Schwester holt ihn um 16 Uhr.",
          "Meine Schwester holt ihn um 16 Uhr ab.",
        ],
        [
          "Muss sie etwas bringen?",
          "Muss sie etwas mitbringen, zum Beispiel einen Ausweis?",
        ],
      ],
    ],
    [
      `Guten Tag, hier ist Samira Haddad, die Mutter von Yusuf aus der Bärengruppe. Ich muss heute leider bis 17 Uhr arbeiten und kann Yusuf nicht abholen. Meine Schwester Leila holt ihn gegen 16 Uhr ab. Muss sie etwas mitbringen?`,
      [
        "Inhalt: vollständig, mit Gruppe und Namen der Schwester.",
        "Sprache: Modalverben und trennbare Verben sind richtig.",
      ],
      [],
    ],
  ],
);
u(
  "A2",
  5,
  45,
  [
    ["Warum schreibst du?", "bitte|frage|tauschen|schicht"],
    [
      "Warum kannst du am Samstag nicht arbeiten?",
      "geburtstag|tochter|feiern|familie",
    ],
    [
      "Was bietest du Marek an?",
      "übernehme|dafür|spätschicht|deine schicht|kann ich",
    ],
    [
      "Bis wann brauchst du eine Antwort?",
      "bis |mittwoch|donnerstag|bescheid|antwort",
    ],
  ],
  [
    [
      `Hallo Marek, kannst du Samstag arbeiten für mich? Meine Tochter hat Geburtstag. Danke.`,
      [
        "Inhalt: Bitte und Grund sind da. Was bekommt Marek dafür? Bis wann soll er antworten? Das fehlt.",
        "Sprache: verständlich, aber sehr kurz.",
      ],
      [
        [
          "kannst du Samstag arbeiten für mich?",
          "Kannst du am Samstag meine Frühschicht übernehmen?",
        ],
        ["(fehlt)", "Dafür übernehme ich gern deine Spätschicht am Dienstag."],
      ],
    ],
    [
      `Hallo Marek,\nich habe eine Bitte. Am Samstag ich habe Frühschicht, aber meine Tochter hat Geburtstag. Kannst du mit mir tauschen? Ich kann deine Schicht am Dienstag machen. Bitte antworte bis Mittwoch.\nDanke!\nOlena`,
      [
        "Inhalt: Alle vier Punkte sind da.",
        "Sprache: klar und freundlich. Nach „Am Samstag“ kommt zuerst das Verb.",
      ],
      [
        [
          "Am Samstag ich habe Frühschicht, …",
          "Am Samstag habe ich Frühschicht, …",
        ],
        [
          "Bitte antworte bis Mittwoch.",
          "Kannst du mir bitte bis Mittwoch Bescheid sagen?",
        ],
      ],
    ],
    [
      `Hallo Marek,\nich habe eine Bitte: Am Samstag habe ich Frühschicht, aber an dem Tag hat meine Tochter Geburtstag und wir feiern mit der Familie. Kannst du vielleicht mit mir tauschen? Dafür übernehme ich gern deine Spätschicht am Dienstag. Kannst du mir bis Mittwoch Bescheid sagen?\nDanke dir und viele Grüße\nOlena`,
      [
        "Inhalt: vollständig, mit fairem Angebot.",
        "Sprache: Verb auf Position 2, gute Verbindungen (aber, dafür).",
      ],
      [],
    ],
  ],
);

u("B1", 0, 55,
  [
    [
      "Wo und wann findet das Essen statt?",
      "freitag|samstag|uhr|kursraum|park|restaurant|nach dem unterricht",
    ],
    [
      "Wer bringt was mit?",
      "bringe|mitbringen|salat|kuchen|getränke|schreiben, was",
    ],
    [
      "Was macht ihr, wenn der Raum nicht frei ist?",
      "falls|wenn der raum|sonst|park|alternative|nicht frei",
    ],
  ],
  [
    [
      `Hallo, wir essen zusammen am Freitag. Im Kursraum. Ich bringe Salat. Was bringt ihr?`,
      [
        "Inhalt: Ort, Tag und eine Aufgabe sind da. Plan B fehlt, die Uhrzeit auch.",
        "Sprache: Das ist A2: kurze Hauptsätze ohne Begründung. Für B1 fehlen „weil“, „dass“, „falls“.",
      ],
      [
        [
          "wir essen zusammen am Freitag. Im Kursraum.",
          "Ich schlage vor, dass wir am Freitag nach dem Unterricht im Kursraum essen.",
        ],
        [
          "(fehlt)",
          "Falls der Raum nicht frei ist, können wir uns im Park treffen.",
        ],
      ],
    ],
    [
      `Hallo zusammen,\nich schlage vor, wir essen am Freitag nach dem Unterricht zusammen. Wir können im Kursraum essen, weil dort gibt es viele Tische. Ich bringe einen Salat mit. Bitte schreibt, was ihr mitbringt. Wenn der Raum ist nicht frei, wir gehen in den Park.\nViele Grüße\nMila`,
      [
        "Inhalt: Alle drei Punkte sind da, mit Begründung.",
        "Sprache: gute B1-Ideen (weil, wenn), aber das Verb steht im Nebensatz falsch und nach dem Nebensatz auch.",
      ],
      [
        [
          "…, weil dort gibt es viele Tische.",
          "…, weil es dort viele Tische gibt.",
        ],
        [
          "Wenn der Raum ist nicht frei, wir gehen in den Park.",
          "Wenn der Raum nicht frei ist, gehen wir in den Park.",
        ],
      ],
    ],
    [
      `Hallo zusammen,\nich schlage vor, dass wir am Freitag nach dem Unterricht gemeinsam essen. Wir könnten den Kursraum nutzen, weil es dort genug Tische gibt. Ich bringe einen Salat mit. Könnt ihr bitte bis Mittwoch schreiben, was ihr mitbringen möchtet? Falls der Raum nicht frei ist, treffen wir uns im Park. Was haltet ihr davon?\nViele Grüße\nMila`,
      [
        "Inhalt: vollständig, mit Frist und Frage an die Gruppe.",
        "Sprache: Nebensätze mit dass, weil, was, falls sind richtig. „könnten“ klingt höflich.",
      ],
      [],
    ],
  ],
);
u("B1", 1, 55,
  [
    ["Was und wann hast du bestellt?", "bestellt|bestellung|jacke|bestellnummer|nummer"],
    ["Was ist das Problem?", "kaputt|beschädigt|reißverschluss|loch|defekt"],
    [
      "Welche Lösung möchtest du?",
      "neue jacke|geld zurück|umtausch|ersatz|zurücksenden|schicken sie",
    ],
  ],
  [
    [
      `Hallo, ich habe eine Jacke bestellt. Sie ist kaputt. Ich will eine neue Jacke oder Geld.`,
      [
        "Inhalt: Problem und Wunsch sind da. Wann bestellt? Was genau ist kaputt? Das fehlt.",
        "Aufbau: Für eine Firma passt „Sehr geehrte Damen und Herren“ und ein höflicher Ton („Ich möchte Sie bitten“).",
      ],
      [
        ["Sie ist kaputt.", "Leider ist der Reißverschluss kaputt."],
        [
          "Ich will eine neue Jacke oder Geld.",
          "Ich möchte Sie bitten, mir eine neue Jacke zu schicken.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nam 2. Mai ich habe bei Ihnen eine blaue Jacke bestellt. Die Jacke ist gestern gekommen, aber der Reißverschluss ist kaputt. Deshalb ich kann die Jacke nicht benutzen. Bitte schicken Sie mir eine neue Jacke. Wie kann ich die alte Jacke zurückschicken?\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Alle drei Punkte sind genau beantwortet.",
        "Sprache: sachlich und höflich. Nach „am 2. Mai“ und „deshalb“ muss das Verb kommen.",
      ],
      [
        [
          "am 2. Mai ich habe bei Ihnen eine blaue Jacke bestellt.",
          "Am 2. Mai habe ich bei Ihnen eine blaue Jacke bestellt.",
        ],
        [
          "Deshalb ich kann die Jacke nicht benutzen.",
          "Deshalb kann ich die Jacke nicht benutzen.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nam 2. Mai habe ich bei Ihnen eine blaue Jacke bestellt (Bestellnummer 1234). Gestern ist sie angekommen, aber leider ist der Reißverschluss kaputt. Deshalb kann ich die Jacke nicht benutzen. Ich möchte Sie bitten, mir eine neue Jacke zu schicken. Können Sie mir bitte mitteilen, wie ich die beschädigte Jacke zurücksenden kann?\nVielen Dank für Ihre Antwort.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: vollständig, mit Bestellnummer.",
        "Sprache: Infinitiv mit „zu“ und indirekte Frage („wie ich … kann“) sind richtig.",
      ],
      [],
    ],
  ],
);
u("B1", 2, 55,
  [
    [
      "Was ist das Problem und seit wann?",
      "laut|lärm|musik|seit|wochen|nachts",
    ],
    [
      "Was hast du schon versucht?",
      "gesprochen|gebeten|versucht|schon|bereits",
    ],
    [
      "Was soll die Hausverwaltung tun?",
      "bitte ich sie|hausordnung|brief|sprechen|erinnern|helfen",
    ],
  ],
  [
    [
      `Guten Tag, meine Nachbarn sind sehr laut in der Nacht. Ich kann nicht schlafen. Bitte machen Sie etwas.`,
      [
        "Inhalt: Das Problem ist klar. Seit wann? Was wurde schon versucht? Das fehlt.",
        "Sprache: A2-Sätze ohne Verbindung. „Bitte machen Sie etwas“ ist ungenau.",
      ],
      [
        [
          "meine Nachbarn sind sehr laut in der Nacht.",
          "Seit drei Wochen sind meine Nachbarn nachts sehr laut.",
        ],
        [
          "Bitte machen Sie etwas.",
          "Ich bitte Sie, die Mieter an die Hausordnung zu erinnern.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich schreibe Ihnen, weil meine Nachbarn sind seit drei Wochen sehr laut. Sie hören Musik bis 2 Uhr. Ich habe mit ihnen gesprochen, aber es hat nicht geholfen. Ich muss früh aufstehen, deshalb ich schlafe zu wenig. Bitte sprechen Sie mit den Nachbarn.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Alle drei Punkte sind da.",
        "Sprache: guter Aufbau. Verbposition nach „weil“ und „deshalb“ ist falsch.",
      ],
      [
        [
          "…, weil meine Nachbarn sind seit drei Wochen sehr laut.",
          "…, weil meine Nachbarn seit drei Wochen sehr laut sind.",
        ],
        [
          "…, deshalb ich schlafe zu wenig.",
          "…, deshalb schlafe ich zu wenig.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich wende mich an Sie, weil es in unserem Haus seit etwa drei Wochen nachts sehr laut ist. Die Mieter über mir hören bis 2 Uhr laute Musik. Ich habe bereits mit ihnen gesprochen, aber leider hat sich nichts geändert. Da ich früh aufstehen muss, schlafe ich zu wenig. Deshalb bitte ich Sie, die Mieter an die Hausordnung zu erinnern.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: vollständig und sachlich.",
        "Sprache: „weil“, „da“, Infinitiv mit „zu“ – sicher auf B1.",
      ],
      [],
    ],
  ],
);
u("B1", 3, 55,
  [
    [
      "Warum schreibst du?",
      "gelesen|interessiere|computerkurs|kurs|informationen",
    ],
    [
      "Was möchtest du genau wissen?",
      "termin|tagen|wann|kostet|kosten|voraussetzung|laptop|vorkenntnis",
    ],
    ["Wie kann man dich erreichen?", "erreichen|e-mail|telefon|nummer"],
  ],
  [
    [
      `Hallo, ich möchte den Computerkurs machen. Wann ist der Kurs? Was kostet er? Danke.`,
      [
        "Inhalt: zwei Fragen sind da. Voraussetzungen und Kontakt fehlen.",
        "Sprache: direkte, kurze Fragen. Für B1 fehlen höfliche, indirekte Fragen.",
      ],
      [
        [
          "Wann ist der Kurs? Was kostet er?",
          "Könnten Sie mir bitte mitteilen, wann der Kurs stattfindet und wie viel er kostet?",
        ],
        ["(fehlt)", "Sie erreichen mich am besten per E-Mail."],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich habe auf Ihrer Internetseite gelesen, dass Sie haben einen Computerkurs für Anfänger. Ich interessiere mich für den Kurs. An welchen Tagen ist der Kurs und wie viel kostet er? Ich möchte auch wissen, ob ich brauche einen Laptop. Sie können mir eine E-Mail schreiben.\nMit freundlichen Grüßen\nYusuf Demir`,
      [
        "Inhalt: Alle drei Punkte sind bearbeitet.",
        "Sprache: gute Struktur. In den Nebensätzen mit „dass“ und „ob“ steht das Verb nicht am Ende.",
      ],
      [
        [
          "…, dass Sie haben einen Computerkurs für Anfänger.",
          "…, dass Sie einen Computerkurs für Anfänger anbieten.",
        ],
        [
          "…, ob ich brauche einen Laptop.",
          "…, ob ich einen eigenen Laptop brauche.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich habe auf Ihrer Internetseite gelesen, dass Sie im Herbst einen Computerkurs für Anfänger anbieten. Ich hätte gern mehr Informationen dazu. Könnten Sie mir bitte mitteilen, an welchen Tagen der Kurs stattfindet und wie viel er kostet? Außerdem möchte ich wissen, ob ich einen eigenen Laptop brauche. Sie erreichen mich am besten per E-Mail.\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nYusuf Demir`,
      [
        "Inhalt: vollständig.",
        "Sprache: indirekte Fragen und „hätte gern“ sind richtig und höflich.",
      ],
      [],
    ],
  ],
);
u("B1", 4, 55,
  [
    [
      "Was hast du in deinem Heimatland gelernt oder gearbeitet?",
      "gearbeitet|gelernt|ausbildung|jahre|elektriker|elektroniker",
    ],
    [
      "Warum möchtest du zuerst ein Praktikum machen?",
      "praktikum|weil|normen|fachwörter|erfahrung|kennenlernen",
    ],
    ["Wann und wie lange hast du Zeit?", "monat|wochen|januar|ab dem|zeit"],
    [
      "Welche Hilfe brauchst du?",
      "helfen|hilfe|bewerbung|firmen|anerkenn|kontakte",
    ],
  ],
  [
    [
      `Guten Tag. Ich bin Elektriker. Ich suche Praktikum. Können Sie helfen?`,
      [
        "Inhalt: Beruf und Wunsch sind da. Erfahrung, Grund und Zeit fehlen.",
        "Sprache: A2-Niveau, sehr kurz. Artikel fehlt („ein Praktikum“).",
      ],
      [
        [
          "Ich bin Elektriker.",
          "In Afghanistan habe ich sechs Jahre als Elektriker gearbeitet.",
        ],
        [
          "Ich suche Praktikum.",
          "Ich möchte zuerst ein Praktikum machen, weil ich die deutschen Fachwörter noch nicht gut kenne.",
        ],
      ],
    ],
    [
      `Guten Tag, ich heiße Ahmad Karimi. Ich habe in Afghanistan sechs Jahre als Elektriker gearbeitet. Ich möchte ein Praktikum machen, weil ich kenne die deutschen Normen nicht gut. Ab Januar ich habe Zeit für drei Monate. Können Sie mir helfen mit der Bewerbung?`,
      [
        "Inhalt: Alle vier Punkte sind da.",
        "Sprache: klar. Verb im „weil“-Satz und nach „Ab Januar“ steht falsch.",
      ],
      [
        [
          "…, weil ich kenne die deutschen Normen nicht gut.",
          "…, weil ich die deutschen Normen noch nicht gut kenne.",
        ],
        [
          "Ab Januar ich habe Zeit für drei Monate.",
          "Ab Januar habe ich drei Monate Zeit.",
        ],
      ],
    ],
    [
      `Guten Tag, ich heiße Ahmad Karimi. In Afghanistan habe ich sechs Jahre als Elektriker gearbeitet, vor allem in Wohnhäusern. Ich möchte zuerst ein Praktikum machen, weil ich die deutschen Normen und die Fachwörter noch nicht gut kenne. Mein Deutschkurs endet im Dezember, deshalb habe ich ab Januar Zeit, am liebsten für drei Monate. Könnten Sie mir helfen, passende Firmen zu finden? Und wissen Sie, ob ich meinen Abschluss anerkennen lassen kann?`,
      [
        "Inhalt: vollständig, mit zwei guten Fragen.",
        "Sprache: sichere Nebensätze, „Könnten Sie“ ist höflich.",
      ],
      [],
    ],
  ],
);
u("B1", 5, 55,
  [
    ["Welchen Kurs besuchst du jetzt?", "abendkurs|b1|besuche|kurs bei"],
    [
      "Warum kannst du nicht mehr kommen?",
      "spätschicht|arbeite|abends|kann nicht",
    ],
    ["Was möchtest du stattdessen?", "vormittag|wechseln|wechsel"],
    ["Was fragst du noch?", "prüfung|kosten|bescheinigung|dtz|frage"],
  ],
  [
    [
      `Hallo, ich bin im B1 Kurs am Abend. Ich habe neue Arbeit. Ich will Kurs am Vormittag.`,
      [
        "Inhalt: Kurs und Wunsch sind da. Der Grund ist ungenau, eine weitere Frage fehlt.",
        "Sprache: A2-Sätze, „Ich will“ ist für eine Bitte zu direkt.",
      ],
      [
        [
          "Ich habe neue Arbeit.",
          "Ab nächstem Monat arbeite ich in der Spätschicht und kann abends nicht mehr kommen.",
        ],
        [
          "Ich will Kurs am Vormittag.",
          "Deshalb möchte ich in einen Vormittagskurs wechseln.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich besuche den B1-Abendkurs bei Frau Becker. Ab 1. Dezember ich arbeite in der Spätschicht, deshalb ich kann am Abend nicht kommen. Ich möchte in einen Vormittagskurs wechseln. Ist das möglich? Ich möchte auch fragen, ob ich kann die Prüfung trotzdem machen.\nMit freundlichen Grüßen\nTetiana Moroz`,
      [
        "Inhalt: Alle vier Punkte sind da.",
        "Sprache: höflich und klar. Dreimal steht das Verb falsch (nach Zeitangabe, nach „deshalb“, im „ob“-Satz).",
      ],
      [
        [
          "Ab 1. Dezember ich arbeite in der Spätschicht, deshalb ich kann am Abend nicht kommen.",
          "Ab dem 1. Dezember arbeite ich in der Spätschicht, deshalb kann ich abends nicht mehr kommen.",
        ],
        [
          "…, ob ich kann die Prüfung trotzdem machen.",
          "…, ob ich die Prüfung trotzdem machen kann.",
        ],
      ],
    ],
    [
      `Sehr geehrte Damen und Herren,\nich besuche zurzeit den B1-Abendkurs bei Frau Becker (montags und mittwochs). Ab dem 1. Dezember arbeite ich leider in der Spätschicht und kann deshalb abends nicht mehr kommen. Ich möchte Sie bitten, mich in einen Vormittagskurs auf dem gleichen Niveau wechseln zu lassen. Außerdem möchte ich wissen, ob ich am Ende trotzdem die DTZ-Prüfung machen kann und ob der Wechsel etwas kostet.\nÜber eine kurze Antwort freue ich mich.\nMit freundlichen Grüßen\nTetiana Moroz`,
      [
        "Inhalt: vollständig, mit zwei Zusatzfragen.",
        "Sprache: sichere Wortstellung, zwei „ob“-Sätze, höflicher Schluss.",
      ],
      [],
    ],
  ],
);

u("B2", 0, 85,
  [
    [
      "Welche Folgen hat das Problem?",
      "verloren|doppelt|fehler|folge|dadurch|rückfragen",
    ],
    [
      "Welche Lösung schlägst du vor und warum?",
      "checkliste|vorschlagen|schlage vor|übergabe|protokoll",
    ],
    [
      "Wie gehst du mit dem Einwand um?",
      "zwar|allerdings|zeit|einwand|trotzdem|testen",
    ],
  ],
  [
    [
      `Hallo Team, bei der Übergabe fehlen oft Informationen. Das ist ein Problem. Ich denke, wir brauchen eine Liste. Dann vergessen wir nichts. Es dauert nicht lange. Was denkt ihr?`,
      [
        "Inhalt: Problem und Idee sind da. Die Folgen werden nicht beschrieben, der Einwand „kostet Zeit“ wird nur behauptet, nicht beantwortet.",
        "Sprache: korrekte, aber sehr einfache Sätze (B1). Es fehlen Begründungen und Verbindungen wie „dadurch“, „zwar … aber“.",
      ],
      [
        [
          "Das ist ein Problem.",
          "Dadurch müssen Aufgaben doppelt erledigt werden, und es kommt zu unnötigen Rückfragen.",
        ],
        [
          "Es dauert nicht lange.",
          "Zwar brauchen wir am Anfang etwas Zeit, später vermeiden wir aber viele Rückfragen.",
        ],
      ],
    ],
    [
      `Liebe Kolleginnen und Kollegen,\nmir ist aufgefallen, dass bei dem Schichtwechsel oft Informationen fehlen. Deshalb wir müssen manche Aufgaben zweimal machen. Ich schlage vor, dass wir eine Checkliste benutzen. Auf der Liste stehen offene Aufgaben und besondere Vorkommnisse. Vielleicht einige denken, dass es zu viel Zeit kostet. Aber ich glaube, wir sparen später Zeit, weil wir müssen nicht mehr nachfragen. Wir können es zwei Wochen testen.\nViele Grüße\nMila`,
      [
        "Inhalt: Alle drei Punkte sind bearbeitet, der Einwand wird aufgenommen.",
        "Sprache: gute Ideen, aber Grundfehler bei der Verbposition („Deshalb wir müssen“, „weil wir müssen“). Für B2 fehlt noch etwas Varianz.",
      ],
      [
        [
          "Deshalb wir müssen manche Aufgaben zweimal machen.",
          "Dadurch müssen manche Aufgaben doppelt erledigt werden.",
        ],
        [
          "Vielleicht einige denken, dass es zu viel Zeit kostet.",
          "Man könnte einwenden, dass eine Checkliste zu viel Zeit kostet.",
        ],
      ],
    ],
    [
      `Liebe Kolleginnen und Kollegen,\nmir ist aufgefallen, dass bei unseren Schichtwechseln wichtige Informationen manchmal verloren gehen. Dadurch müssen Aufgaben doppelt erledigt werden. Ich würde deshalb vorschlagen, eine kurze gemeinsame Checkliste zu nutzen, auf der offene Aufgaben und besondere Vorkommnisse stehen. Zwar brauchen wir zunächst etwas Zeit, um die Liste zu erstellen, allerdings könnten wir später viele Rückfragen vermeiden. Damit die Übergabe nicht zu lange dauert, sollten wir uns auf drei Punkte beschränken. Wie wäre es, wenn wir die Checkliste zwei Wochen lang testen und danach unsere Erfahrungen besprechen?\nViele Grüße\nMila`,
      [
        "Inhalt: Folgen, Lösung und Antwort auf den Einwand sind klar und konkret.",
        "Sprache: „zwar … allerdings“, „damit“, Passiv, Konjunktiv II – sicher auf B2.",
      ],
      [],
    ],
  ],
);
u("B2", 1, 85,
  [
    ["Wofür entschuldigst du dich?", "entschuldig|bedauer|leid"],
    [
      "Was kannst du verbindlich anbieten?",
      "anbieten|versenden|nachschicken|montag|versandkosten|alternativ",
    ],
    [
      "Welche Entscheidung brauchst du vom Kunden?",
      "teilen sie uns|mitteilen|welche lösung|lieber|entscheid|rückmeldung",
    ],
  ],
  [
    [
      `Sehr geehrter Herr Weber,\nentschuldigung, Ihre Bestellung ist noch nicht da. Ein Artikel fehlt. Er kommt am Montag. Wir schicken dann alles.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Entschuldigung und Information sind da. Es gibt aber kein Angebot zur Auswahl und keine Frage an den Kunden.",
        "Sprache: zu kurz und zu einfach für B2; die Entschuldigung wirkt nicht verbindlich.",
      ],
      [
        [
          "entschuldigung, Ihre Bestellung ist noch nicht da.",
          "Bitte entschuldigen Sie, dass Ihre Bestellung noch nicht vollständig geliefert wurde.",
        ],
        [
          "Wir schicken dann alles.",
          "Wir können Ihnen anbieten, die vorhandenen Artikel sofort zu versenden und den fehlenden am Montag nachzuliefern.",
        ],
      ],
    ],
    [
      `Sehr geehrter Herr Weber,\nvielen Dank für Ihre Nachricht. Wir entschuldigen uns, dass Ihre Bestellung ist noch nicht komplett. Ein Artikel ist erst ab Montag im Lager. Wir können die anderen Artikel morgen schicken und den letzten Artikel am Montag, ohne Versandkosten. Oder wir schicken alles zusammen am Montag. Bitte schreiben Sie uns, was Sie möchten.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Alle drei Punkte sind da, mit zwei Möglichkeiten.",
        "Sprache: höflich und klar, aber eher B1: einfache Verben („schicken“ zweimal), ein Fehler im „dass“-Satz.",
      ],
      [
        [
          "…, dass Ihre Bestellung ist noch nicht komplett.",
          "…, dass Ihre Bestellung noch nicht vollständig geliefert wurde.",
        ],
        [
          "Bitte schreiben Sie uns, was Sie möchten.",
          "Bitte teilen Sie uns mit, welche Lösung Ihnen lieber ist.",
        ],
      ],
    ],
    [
      `Sehr geehrter Herr Weber,\nvielen Dank für Ihre Nachricht. Bitte entschuldigen Sie, dass Ihre Bestellung noch nicht vollständig geliefert wurde und Sie bisher keine Information dazu erhalten haben. Nach Rücksprache mit unserem Lager ist ein Artikel erst ab Montag verfügbar. Wir können Ihnen anbieten, die vorhandenen Artikel bereits morgen zu versenden; den fehlenden Artikel würden wir am Montag ohne zusätzliche Versandkosten nachschicken. Alternativ versenden wir die gesamte Bestellung am Montag. Bitte teilen Sie uns mit, welche Lösung Ihnen lieber ist.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: konkrete Entschuldigung, zwei verbindliche Angebote, klare Frage.",
        "Sprache: professionell, mit Passiv, Infinitivsatz und passenden Wendungen (nach Rücksprache, alternativ).",
      ],
      [],
    ],
  ],
);
u("B2", 2, 85,
  [
    [
      "Welche Weiterbildung, wann und wo?",
      "weiterbildung|schulung|seminar|november|findet|ihk|kostet",
    ],
    [
      "Welchen Nutzen hat sie für das Team?",
      "team|nutzen|hilfreich|weitergeben|profitier|kollegen",
    ],
    [
      "Wer übernimmt deine Aufgaben?",
      "vertret|übernimmt|übernehmen|abgesprochen|aufgaben",
    ],
  ],
  [
    [
      `Sehr geehrte Frau Krüger,\nich möchte eine Weiterbildung machen. Sie ist im November und dauert zwei Tage. Das Thema ist Telefonieren mit Kunden. Darf ich teilnehmen?\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Thema und Zeitraum sind genannt. Der Nutzen für das Team und die Vertretung fehlen – genau das will die Vorgesetzte wissen.",
        "Sprache: korrekt, aber einfach und kurz.",
      ],
      [
        [
          "Darf ich teilnehmen?",
          "Ich möchte Sie bitten, mir die Teilnahme zu genehmigen.",
        ],
        [
          "(fehlt)",
          "Meine Aufgaben würde in dieser Zeit Herr Aydın übernehmen.",
        ],
      ],
    ],
    [
      `Sehr geehrte Frau Krüger,\nich möchte an der Weiterbildung „Professionell telefonieren mit Kunden“ teilnehmen. Sie ist am 14. und 15. November bei der IHK in Hagen. Ich denke, die Weiterbildung ist gut für unser Team, weil wir bekommen immer mehr Anrufe. Danach ich kann den Kollegen zeigen, was ich gelernt habe. Herr Aydın macht in dieser Zeit meine Aufgaben, ich habe ihn schon gefragt.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: Alle drei Punkte sind da und begründet.",
        "Sprache: klar, aber mit B1-Fehlern („weil wir bekommen“, „Danach ich kann“) und einfachem Wortschatz („macht … meine Aufgaben“).",
      ],
      [
        [
          "…, weil wir bekommen immer mehr Anrufe.",
          "…, da wir zunehmend Anfragen per Telefon bekommen.",
        ],
        [
          "Herr Aydın macht in dieser Zeit meine Aufgaben, …",
          "Meine Aufgaben würde in dieser Zeit Herr Aydın übernehmen.",
        ],
      ],
    ],
    [
      `Sehr geehrte Frau Krüger,\nich möchte Sie bitten, mir die Teilnahme an der Weiterbildung „Professionell telefonieren mit Kunden“ am 14. und 15. November zu genehmigen. Die Schulung findet bei der IHK in Hagen statt und kostet 280 Euro.\nSie wäre für unser Team hilfreich, da wir zunehmend Anfragen per Telefon bekommen und ich die Inhalte anschließend an die Kolleginnen und Kollegen weitergeben könnte. Meine Aufgaben würde in dieser Zeit Herr Aydın übernehmen; das habe ich bereits mit ihm abgesprochen.\nFür Rückfragen stehe ich Ihnen gern zur Verfügung.\nMit freundlichen Grüßen\nMila Petrova`,
      [
        "Inhalt: vollständig, mit überzeugendem Nutzen.",
        "Sprache: formell und sicher, Konjunktiv II und Infinitiv mit „zu“ passen.",
      ],
      [],
    ],
  ],
);
u("B2", 3, 85,
  [
    [
      "Was ist deine Position?",
      "meiner ansicht|meiner meinung|ich finde|ich halte|ich bin dafür|ich bin dagegen",
    ],
    [
      "Welche zwei Argumente hast du?",
      "argument|fahrtweg|konzentr|zeit|weil|denn|außerdem|zum beispiel",
    ],
    [
      "Welches Gegenargument nimmst du auf?",
      "zwar|allerdings|einwenden|andererseits|dagegen|zusammenarbeit",
    ],
  ],
  [
    [
      `Hallo, ich finde Homeoffice gut. Man muss nicht fahren und man hat mehr Zeit. Zu Hause ist es ruhig. Aber nicht alle können Homeoffice machen. Das ist unfair.`,
      [
        "Inhalt: Meinung und zwei Gründe sind da. Ein Beispiel und eine Antwort auf das Gegenargument fehlen.",
        "Sprache: einfache Hauptsätze, B1. Für B2 fehlen Verbindungen und genauere Wörter.",
      ],
      [
        [
          "Man muss nicht fahren und man hat mehr Zeit.",
          "Ein wichtiges Argument ist, dass viele von uns lange Fahrtwege haben und so viel Zeit sparen würden.",
        ],
        [
          "Aber nicht alle können Homeoffice machen. Das ist unfair.",
          "Allerdings ist Homeoffice in der Produktion kaum möglich, sodass eine einheitliche Regel ungerecht wäre.",
        ],
      ],
    ],
    [
      `Liebe Kolleginnen und Kollegen,\nmeiner Meinung nach ist Homeoffice eine gute Idee. Erstens viele Kollegen haben einen langen Weg zur Arbeit und sie können Zeit sparen. Zweitens kann man sich zu Hause besser konzentrieren. In der Buchhaltung hat es gut funktioniert. Manche sagen, dass die Zusammenarbeit wird schlechter. Aber wir können feste Teamtage machen. In der Produktion ist Homeoffice nicht möglich, deshalb jede Abteilung soll selbst entscheiden.\nViele Grüße\nMila`,
      [
        "Inhalt: Position, zwei Argumente, ein Beispiel und ein Gegenargument – alles da.",
        "Sprache: gute Gliederung mit „erstens/zweitens“. Verbposition mehrmals falsch („Erstens viele Kollegen haben“, „dass … wird schlechter“, „deshalb jede Abteilung soll“).",
      ],
      [
        [
          "Manche sagen, dass die Zusammenarbeit wird schlechter.",
          "Man könnte zwar einwenden, dass die Zusammenarbeit leidet.",
        ],
        [
          "…, deshalb jede Abteilung soll selbst entscheiden.",
          "…, deshalb sollte jede Abteilung selbst eine passende Regelung entwickeln.",
        ],
      ],
    ],
    [
      `Liebe Kolleginnen und Kollegen,\nmeiner Ansicht nach ist Homeoffice eine gute Möglichkeit – allerdings nicht für alle Abteilungen in gleichem Umfang. Dafür spricht, dass viele von uns lange Fahrtwege haben. Wer zu Hause arbeitet, spart Zeit und kann sich oft besser konzentrieren. In unserer Buchhaltung hat das in der Testphase gut funktioniert.\nMan könnte zwar einwenden, dass die Zusammenarbeit leidet, allerdings lässt sich das mit festen Teamtagen lösen. In der Produktion oder im Lager ist Homeoffice dagegen kaum möglich. Deshalb schlage ich vor, dass jede Abteilung selbst eine passende Regelung entwickelt.\nViele Grüße\nMila`,
      [
        "Inhalt: klare, differenzierte Position mit Beispiel und entkräftetem Gegenargument.",
        "Sprache: „zwar … allerdings“, Relativsatz mit „wer“, „lässt sich … lösen“ – sicher auf B2.",
      ],
      [],
    ],
  ],
);


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
            target: t.target, need: t.need || t.lp.length,
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
