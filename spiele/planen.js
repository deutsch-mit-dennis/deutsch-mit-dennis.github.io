/* Lernspiel „DTZ-Planungsduell“ – Sprechen Teil 3 „Gemeinsam etwas planen“ (A2–B1).
   Pro Situation 5 Züge: Die Partnerin/der Partner sagt etwas, du wählst die beste von 3 Antworten.
   Alle Sätze der Partner stehen in SAY (für die Vertonung, z. B. über tools/collect-spiele-tts.mjs);
   vorgelesen wird nur auf Knopfdruck (🔊), nie automatisch. */
(() => {
  if (!window.DMGame) return;
  const ID = "planen";

  /* Redemittel-Arten: Name in der Rückmeldung + typische Sätze für die Sammlung am Ende */
  const TYPES = {
    vorschlagen: {
      label: "Vorschlagen",
      rm: [
        "Ich schlage vor, dass wir …",
        "Wir könnten …",
        "Wie wäre es mit …?",
      ],
    },
    zustimmen: {
      label: "Zustimmen",
      rm: [
        "Gute Idee, denn …",
        "Da hast du recht.",
        "Das finde ich super, dann …",
      ],
    },
    ablehnen: {
      label: "Ablehnen mit Alternative",
      rm: [
        "… passt mir leider nicht, weil … Geht es auch …?",
        "Das ist leider zu teuer. Wie wäre es, wenn …?",
      ],
    },
    nachfragen: {
      label: "Nachfragen",
      rm: ["Weißt du, ob …?", "Wie viel kostet …?", "Was meinst du?"],
    },
    verteilen: {
      label: "Aufgaben verteilen und sich einigen",
      rm: [
        "Ich kümmere mich um …",
        "Kannst du … übernehmen?",
        "Also: Du … und ich … Einverstanden?",
      ],
    },
  };
  /* Arten falscher Antworten */
  const KIND = {
    k: "Zu kurz oder unhöflich.",
    o: "Das passt nicht zum Thema.",
    g: "Grammatikfehler.",
    i: "Du gehst nicht auf deinen Partner ein.",
  };

  /* Situationen. turns: [Art, Satz des Partners, gute Antwort, Tipp, [Art, schwache Antwort, Erklärung], [Art, schwache Antwort, Erklärung]]
     Der 5. Zug ist immer: Wer macht was? Die 5 Planungspunkte gehören der Reihe nach zu den 5 Zügen. */
  const SC = [
    {
      id: "abschied",
      icon: "👋",
      title: "Abschiedsfeier für Olena",
      who: "Mohammed",
      voice: "m1",
      color: "#1d4ed8",
      task: "Olena aus eurem Deutschkurs zieht nach Hamburg. Du planst mit Mohammed eine kleine Abschiedsfeier.",
      points: [
        "Termin",
        "Ort",
        "Essen und Getränke",
        "Geschenk",
        "Wer macht was?",
      ],
      turns: [
        [
          "vorschlagen",
          "Olena zieht ja Ende des Monats nach Hamburg. Wollen wir für sie eine kleine Abschiedsfeier im Kurs machen?",
          "Ja, das ist eine schöne Idee! Ich schlage vor, wir feiern am letzten Kurstag, also am Freitag.",
          "Erst zustimmen, dann einen konkreten Vorschlag machen: „Ich schlage vor, …“",
          [
            "k",
            "Ja, okay.",
            "Zu kurz. Im DTZ sollst du aktiv mitplanen und eigene Ideen bringen.",
          ],
          [
            "g",
            "Ja, schöne Idee! Ich schlage vor, wir feiern an der letzte Kurstag.",
            "„an“ + Dativ: „am letzten Kurstag“.",
          ],
        ],
        [
          "ablehnen",
          "Freitag ist gut. Sollen wir in ein Café gehen? Das Café am Markt ist sehr gemütlich.",
          "Das Café ist schön, aber für zwölf Personen ist es zu klein. Wie wäre es, wenn wir im Kursraum feiern?",
          "Höflich ablehnen, einen Grund nennen und gleich eine Alternative vorschlagen: „Wie wäre es, wenn …?“",
          [
            "k",
            "Nein, das Café ist blöd.",
            "Unhöflich und ohne Alternative. Nenne einen Grund und schlag etwas anderes vor.",
          ],
          [
            "i",
            "Wir könnten auch nächste Woche feiern.",
            "Der Termin ist schon klar. Mohammed fragt jetzt nach dem Ort.",
          ],
        ],
        [
          "nachfragen",
          "Gute Idee, der Kursraum kostet nichts. Aber was machen wir mit dem Essen?",
          "Vielleicht bringt jeder etwas mit? Weißt du, ob Olena etwas nicht essen darf?",
          "Einen Vorschlag machen und nachfragen: „Weißt du, ob …?“",
          [
            "o",
            "In Hamburg regnet es sehr oft.",
            "Es geht jetzt um das Essen für die Feier.",
          ],
          [
            "g",
            "Vielleicht jeder bringt etwas mit. Weißt du, ob Olena darf etwas nicht essen?",
            "Nach „vielleicht“ kommt das Verb: „Vielleicht bringt jeder …“. Nach „ob“ steht das Verb am Ende: „ob Olena etwas nicht essen darf“.",
          ],
        ],
        [
          "zustimmen",
          "Sie isst kein Fleisch. Also bringen wir Salate, Kuchen und Getränke mit. Und als Geschenk? Ich dachte an ein Fotobuch vom Kurs.",
          "Ein Fotobuch finde ich super, dann hat sie eine schöne Erinnerung an uns. Wir können auch alle etwas hineinschreiben.",
          "Zustimmen mit Begründung („…, dann …“) und eine eigene Idee ergänzen.",
          [
            "k",
            "Egal.",
            "Zu kurz und desinteressiert. Sag, was du von der Idee hältst, und begründe es.",
          ],
          [
            "g",
            "Ein Fotobuch finde ich super, weil sie hat dann eine Erinnerung.",
            "Nach „weil“ steht das Verb am Ende: „weil sie dann eine Erinnerung hat“.",
          ],
        ],
        [
          "verteilen",
          "Toll! Dann lass uns noch die Aufgaben verteilen. Wer macht was?",
          "Ich kümmere mich um das Fotobuch und sammle die Fotos. Kannst du die anderen wegen des Essens fragen?",
          "Aufgaben verteilen: „Ich kümmere mich um …“ und „Kannst du …?“",
          [
            "k",
            "Mach du alles, ich habe keine Zeit.",
            "Unfair und unhöflich. Teilt die Aufgaben auf – übernimm auch selbst etwas.",
          ],
          [
            "g",
            "Ich kümmere mich um der Fotobuch. Kannst du die anderen fragen?",
            "„sich kümmern um“ + Akkusativ: „um das Fotobuch“.",
          ],
        ],
      ],
    },

    {
      id: "ausflug",
      icon: "🦒",
      title: "Ausflug mit dem Deutschkurs",
      who: "Ayşe",
      voice: "f2",
      color: "#9333ea",
      task: "Euer Kurs darf einen Ausflug machen. Du planst ihn zusammen mit Ayşe.",
      points: ["Ziel", "Tag", "Fahrt", "Essen", "Wer macht was?"],
      turns: [
        [
          "vorschlagen",
          "Unsere Kursleiterin hat gesagt, wir dürfen einen Ausflug machen. Wohin könnten wir fahren?",
          "Wir könnten in den Zoo fahren. Da gibt es viel zu sehen, und es ist nicht so teuer.",
          "Ein Vorschlag mit „Wir könnten …“ und einem Grund.",
          [
            "o",
            "Ich fahre jeden Tag mit dem Bus zur Arbeit.",
            "Ayşe fragt nach einem Ziel für den Ausflug.",
          ],
          [
            "g",
            "Wir könnten in den Zoo fahren. Da es gibt viel zu sehen.",
            "„Da“ (= dort) steht auf Position 1, dann kommt das Verb: „Da gibt es viel zu sehen.“",
          ],
        ],
        [
          "ablehnen",
          "Der Zoo ist gut! Wollen wir am Samstag fahren?",
          "Am Samstag arbeite ich leider. Geht es vielleicht auch am Sonntag?",
          "Ablehnen mit Grund und Alternative: „… leider … Geht es vielleicht auch …?“",
          [
            "k",
            "Nein.",
            "Zu kurz. Sag, warum es nicht geht, und schlag einen anderen Tag vor.",
          ],
          [
            "g",
            "Am Samstag ich arbeite leider. Geht es vielleicht am Sonntag?",
            "Das Verb steht auf Position 2: „Am Samstag arbeite ich leider.“",
          ],
        ],
        [
          "nachfragen",
          "Sonntag geht auch. Ich würde mit dem Zug fahren. Was denkst du?",
          "Mit dem Zug ist gut. Weißt du, wie viel die Fahrkarten kosten? Vielleicht gibt es ein Gruppenticket.",
          "Zustimmen und nachfragen: „Weißt du, wie viel …?“",
          [
            "o",
            "Ich mag Züge, mein Bruder ist Lokführer.",
            "Das ist privat und hilft der Planung nicht. Bleib beim Thema Fahrt.",
          ],
          [
            "i",
            "Lass uns lieber über das Essen sprechen.",
            "Du übergehst Ayşes Vorschlag. Reagiere zuerst auf den Zug.",
          ],
        ],
        [
          "zustimmen",
          "Mit dem Deutschlandticket fahren viele kostenlos. Und das Essen? Im Zoo ist alles sehr teuer.",
          "Da hast du recht. Dann machen wir ein Picknick, und jeder bringt etwas mit.",
          "Zustimmen („Da hast du recht.“) und gleich eine Lösung vorschlagen.",
          [
            "k",
            "Ist mir egal, ich esse nichts.",
            "Desinteressiert. Mach einen Vorschlag für das Essen.",
          ],
          [
            "g",
            "Da hast du recht. Dann wir machen ein Picknick.",
            "Nach „dann“ kommt sofort das Verb: „Dann machen wir ein Picknick.“",
          ],
        ],
        [
          "verteilen",
          "Super. Wer kümmert sich um was?",
          "Ich suche die Zugverbindung heraus und schreibe allen die Uhrzeit. Machst du eine Liste fürs Picknick?",
          "Aufgaben verteilen: „Ich … – machst du …?“ So weiß jeder, was er tun muss.",
          [
            "k",
            "Weiß nicht. Mal sehen.",
            "Zu ungenau. Am Ende müsst ihr klar sagen, wer was macht.",
          ],
          [
            "g",
            "Ich heraussuche die Zugverbindung. Du machst eine Liste?",
            "„heraussuchen“ ist trennbar: „Ich suche die Zugverbindung heraus.“",
          ],
        ],
      ],
    },

    {
      id: "umzug",
      icon: "📦",
      title: "Den Nachbarn beim Umzug helfen",
      who: "Lukas",
      voice: "m2",
      color: "#b45309",
      task: "Familie Kowalski aus dem dritten Stock zieht um. Du und Lukas wollen helfen.",
      points: [
        "Tag",
        "Uhrzeit",
        "Transporter",
        "Essen für die Helfer",
        "Wer macht was?",
      ],
      turns: [
        [
          "nachfragen",
          "Die Kowalskis ziehen nächste Woche um und brauchen Hilfe. Hast du Lust, mit mir zu helfen?",
          "Ja, klar, ich helfe gern. An welchem Tag ziehen sie denn um?",
          "Zustimmen und gleich nachfragen: „An welchem Tag …?“",
          [
            "k",
            "Umzüge sind anstrengend. Nee.",
            "Unhöflich. Im DTZ sollst du mitplanen, nicht einfach ablehnen.",
          ],
          [
            "g",
            "Ja, klar, ich helfe gern. An welchem Tag sie ziehen um?",
            "In der W-Frage steht das Verb auf Position 2: „An welchem Tag ziehen sie um?“",
          ],
        ],
        [
          "ablehnen",
          "Am Samstag. Ich dachte, wir fangen um sechs Uhr morgens an.",
          "Um sechs ist es sehr früh, da schlafen die Nachbarn noch. Wie wäre es mit acht Uhr?",
          "Ablehnen mit Grund und Alternative: „Wie wäre es mit …?“",
          [
            "k",
            "Spinnst du? Viel zu früh!",
            "Zu unhöflich. Nenne einen Grund und mach einen Gegenvorschlag.",
          ],
          [
            "i",
            "Ja, und am Sonntag können wir auch noch helfen.",
            "Lukas spricht über die Uhrzeit. Sag, ob sechs Uhr passt.",
          ],
        ],
        [
          "vorschlagen",
          "Acht Uhr ist besser, stimmt. Brauchen wir einen Transporter? Die Kowalskis haben kein Auto.",
          "Ja, ich glaube schon. Wir könnten einen Transporter bei der Autovermietung am Bahnhof mieten.",
          "Vorschlagen: „Wir könnten …“ – mit einer konkreten Idee.",
          [
            "o",
            "Mein Auto ist rot.",
            "Es geht darum, wie die Möbel transportiert werden.",
          ],
          [
            "g",
            "Ja. Wir könnten einen Transporter mieten bei die Autovermietung.",
            "„bei“ + Dativ: „bei der Autovermietung“. Der Infinitiv „mieten“ steht am Ende.",
          ],
        ],
        [
          "zustimmen",
          "Gute Idee. Ich habe einen Führerschein für Transporter. Sollen wir auch Essen für die Helfer organisieren?",
          "Ja, unbedingt! Nach dem Tragen haben alle Hunger. Ich kann Brötchen und Getränke kaufen.",
          "Zustimmen mit Grund („Nach dem Tragen haben alle Hunger.“) und etwas anbieten.",
          ["k", "Essen? Nö.", "Zu kurz. Sag deine Meinung und begründe sie."],
          [
            "g",
            "Ja, unbedingt! Ich kann Brötchen und Getränken kaufen.",
            "Plural von „das Getränk“ im Akkusativ: „die Getränke“ (ohne -n).",
          ],
        ],
        [
          "verteilen",
          "Prima. Fassen wir zusammen: Wer macht was?",
          "Du mietest den Transporter und fährst. Ich kaufe Brötchen und frage noch zwei Nachbarn, ob sie helfen.",
          "Zusammenfassen und verteilen: „Du … – ich …“",
          [
            "k",
            "Das machen wir dann spontan.",
            "Zu ungenau. Am Ende muss klar sein, wer welche Aufgabe übernimmt.",
          ],
          [
            "g",
            "Du mietest den Transporter. Ich kaufe Brötchen und frage zwei Nachbarn, ob helfen sie.",
            "Nach „ob“ steht das Verb am Ende: „ob sie helfen“.",
          ],
        ],
      ],
    },

    {
      id: "geburtstag",
      icon: "🎂",
      title: "Kindergeburtstag für Minh",
      who: "Tran",
      voice: "f3",
      color: "#db2777",
      task: "Trans Sohn Minh wird sieben. Du hilfst Tran, die Geburtstagsfeier zu planen.",
      points: [
        "Ort",
        "Plan B bei Regen",
        "Programm",
        "Essen",
        "Wer macht was?",
      ],
      turns: [
        [
          "vorschlagen",
          "Minh wird nächsten Monat sieben. Er möchte mit zehn Freunden feiern, aber unsere Wohnung ist so klein. Wo könnten wir feiern?",
          "Bei schönem Wetter könnten wir im Park feiern. Da haben die Kinder viel Platz zum Spielen.",
          "Vorschlagen mit Grund: „Wir könnten … Da haben …“",
          [
            "o",
            "Meine Wohnung hat drei Zimmer und einen Balkon.",
            "Tran braucht einen Vorschlag für den Ort der Feier.",
          ],
          [
            "g",
            "Bei schönem Wetter wir könnten im Park feiern.",
            "Das Verb steht auf Position 2: „Bei schönem Wetter könnten wir …“",
          ],
        ],
        [
          "vorschlagen",
          "Der Park ist schön, aber was machen wir, wenn es regnet?",
          "Gute Frage. Wir könnten den Raum im Familienzentrum mieten. Der ist nicht teuer und ganz in der Nähe.",
          "Auf das Problem eingehen und einen Plan B vorschlagen.",
          [
            "k",
            "Dann eben nicht.",
            "Zu kurz und negativ. Sucht gemeinsam eine Lösung.",
          ],
          [
            "i",
            "Im Park gibt es einen schönen Spielplatz.",
            "Du reagierst nicht auf Trans Frage: Was machen wir bei Regen?",
          ],
        ],
        [
          "vorschlagen",
          "Das Familienzentrum ist frei, ich habe gerade nachgesehen. Was machen wir mit den Kindern? Zwei Stunden sind lang.",
          "Wir könnten Spiele machen, zum Beispiel Topfschlagen und eine Schatzsuche. Das macht Kindern immer Spaß.",
          "Konkrete Ideen nennen: „zum Beispiel …“ – und kurz begründen.",
          [
            "o",
            "Zwei Stunden fahre ich jeden Tag zur Arbeit.",
            "Es geht um das Programm für die Kinder.",
          ],
          [
            "g",
            "Wir könnten Spiele machen, zum Beispiel eine Schatzsuche. Das macht die Kinder immer Spaß.",
            "„Spaß machen“ + Dativ: „Das macht den Kindern Spaß.“",
          ],
        ],
        [
          "ablehnen",
          "Die Schatzsuche finde ich toll! Ich backe einen Kuchen. Sollen wir auch Pizza bestellen?",
          "Pizza ist ziemlich teuer für so viele Kinder. Wie wäre es mit belegten Brötchen und Obst?",
          "Ablehnen mit Grund und Alternative: „… ist ziemlich teuer. Wie wäre es mit …?“",
          [
            "k",
            "Pizza? Ungesund. Nein.",
            "Zu kurz und unfreundlich. Nenne eine Alternative.",
          ],
          [
            "g",
            "Pizza ist teuer. Wie wäre es mit belegte Brötchen und Obst?",
            "„mit“ + Dativ Plural: „mit belegten Brötchen“.",
          ],
        ],
        [
          "verteilen",
          "Einverstanden. Dann lass uns jetzt die Aufgaben verteilen.",
          "Gut. Ich bereite die Schatzsuche vor und mache die Brötchen. Schreibst du die Einladungen an die Eltern?",
          "Eine Aufgabe übernehmen und eine Aufgabe abgeben: „Ich … Schreibst du …?“",
          [
            "k",
            "Das ist dein Kind, also ist das deine Aufgabe.",
            "Unhöflich. Ihr plant zusammen – biete selbst etwas an.",
          ],
          [
            "g",
            "Ich vorbereite die Schatzsuche. Schreibst du die Einladungen?",
            "„vorbereiten“ ist trennbar: „Ich bereite die Schatzsuche vor.“",
          ],
        ],
      ],
    },

    {
      id: "grillfest",
      icon: "🔥",
      title: "Grillfest im Hof",
      who: "Jonas",
      voice: "m1",
      color: "#c2410c",
      task: "Dein Nachbar Jonas möchte ein Grillfest für alle im Haus. Ihr plant es zusammen.",
      points: [
        "Lust und Ziel",
        "Termin und Erlaubnis",
        "Essen",
        "Musik",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Hallo! Ich möchte im Sommer ein Grillfest für alle Nachbarn im Hof machen. Hilfst du mir bei der Planung?",
          "Sehr gern, dann lernen sich alle Nachbarn besser kennen. Wann wollen wir feiern?",
          "Zustimmen mit Begründung und eine Frage stellen – so geht das Gespräch weiter.",
          [
            "k",
            "Hm, vielleicht.",
            "Zu unklar. Sag deutlich Ja und bring dich ein.",
          ],
          [
            "g",
            "Sehr gern! Dann lernen sich alle Nachbarn kennen. Wann wir wollen feiern?",
            "In der W-Frage steht das Verb auf Position 2: „Wann wollen wir feiern?“",
          ],
        ],
        [
          "zustimmen",
          "Wie wäre es mit Samstag in drei Wochen? Da sind noch keine Sommerferien.",
          "Das passt gut. Wir sollten aber vorher den Hausmeister fragen, ob wir im Hof grillen dürfen.",
          "Zustimmen und einen wichtigen Punkt ergänzen: „Wir sollten aber …“",
          [
            "o",
            "In den Ferien fliege ich nach Portugal.",
            "Der Termin liegt vor den Ferien. Sag, ob der Samstag passt.",
          ],
          [
            "g",
            "Das passt gut. Wir sollten den Hausmeister fragen, ob wir dürfen im Hof grillen.",
            "Nach „ob“ steht das Verb am Ende: „ob wir im Hof grillen dürfen“.",
          ],
        ],
        [
          "vorschlagen",
          "Der Hausmeister hat Ja gesagt. Soll jeder sein eigenes Fleisch mitbringen?",
          "Ja, das ist am einfachsten. Wir sollten aber auch an die Vegetarier denken und einen Grill nur für Gemüse nehmen.",
          "Den Vorschlag annehmen und ergänzen: „Wir sollten auch an … denken.“",
          [
            "k",
            "Ich esse kein Fleisch. Tschüss.",
            "Unhöflich. Erkläre dein Problem und schlag eine Lösung vor.",
          ],
          [
            "i",
            "Wir könnten auch im Park grillen.",
            "Der Hof ist schon geklärt. Jonas fragt jetzt nach dem Essen.",
          ],
        ],
        [
          "ablehnen",
          "Gute Idee mit dem Gemüsegrill. Ich würde gern Musik machen, mit großen Lautsprechern.",
          "Musik ist schön, aber nicht zu laut, sonst ärgern sich die älteren Nachbarn. Vielleicht nur leise Musik bis zehn Uhr?",
          "Teilweise ablehnen, begründen und einen Kompromiss anbieten: „…, aber … Vielleicht …?“",
          [
            "k",
            "Musik nervt.",
            "Zu kurz und negativ. Begründe und mach einen Kompromissvorschlag.",
          ],
          [
            "g",
            "Musik ist schön, aber nicht zu laut, sonst die Nachbarn ärgern sich.",
            "Nach „sonst“ kommt sofort das Verb: „sonst ärgern sich die Nachbarn“.",
          ],
        ],
        [
          "verteilen",
          "Okay, leise Musik bis zehn. Wer macht jetzt was?",
          "Ich schreibe einen Zettel für alle Nachbarn und hänge ihn im Treppenhaus auf. Du kümmerst dich um die Grills und die Musik, okay?",
          "Aufgaben klar verteilen und zum Schluss nachfragen: „…, okay?“",
          [
            "k",
            "Ich komme einfach zum Essen.",
            "Du übernimmst keine Aufgabe. Biete etwas an.",
          ],
          [
            "g",
            "Ich schreibe einen Zettel und aufhänge ihn im Treppenhaus.",
            "„aufhängen“ ist trennbar: „Ich hänge ihn im Treppenhaus auf.“",
          ],
        ],
      ],
    },

    {
      id: "krankenhaus",
      icon: "🏥",
      title: "Kollegin im Krankenhaus besuchen",
      who: "Kofi",
      voice: "m2",
      color: "#0f766e",
      task: "Eure Kollegin Sabine liegt nach einer Knie-Operation im Krankenhaus. Du und Kofi wollt sie besuchen.",
      points: [
        "Besuch ja oder nein",
        "Tag und Uhrzeit",
        "Anfahrt",
        "Mitbringsel",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Sabine liegt seit Montag im Krankenhaus. Wollen wir sie zusammen besuchen?",
          "Ja, sie freut sich bestimmt über Besuch. Weißt du, wann die Besuchszeiten sind?",
          "Zustimmen mit Grund und gleich etwas Wichtiges klären.",
          [
            "k",
            "Krankenhaus mag ich nicht.",
            "Zu kurz und hilft nicht weiter. Sag Ja oder schlag etwas anderes vor.",
          ],
          [
            "g",
            "Ja, sie freut sich bestimmt über ein Besuch.",
            "„sich freuen über“ + Akkusativ: „über einen Besuch“ (oder einfach „über Besuch“).",
          ],
        ],
        [
          "ablehnen",
          "Die Besuchszeit ist nachmittags von zwei bis sieben. Ich kann am Mittwoch gleich um zwei.",
          "Um zwei arbeite ich noch. Können wir uns um halb fünf treffen? Dann haben wir genug Zeit.",
          "Ablehnen mit Grund und eine andere Uhrzeit vorschlagen.",
          [
            "k",
            "Mittwoch? Nein.",
            "Zu kurz. Nenne einen Grund und eine andere Uhrzeit.",
          ],
          [
            "i",
            "Ich war letztes Jahr auch im Krankenhaus.",
            "Du gehst nicht auf Kofis Vorschlag ein: Passt dir Mittwoch um zwei?",
          ],
        ],
        [
          "vorschlagen",
          "Halb fünf ist okay. Fahren wir zusammen? Ich habe aber kein Auto.",
          "Kein Problem, wir können mit der Straßenbahn fahren. Die Linie drei hält direkt vor dem Krankenhaus.",
          "Auf das Problem reagieren („Kein Problem, …“) und eine Lösung vorschlagen.",
          [
            "o",
            "Autos sind in Deutschland sehr teuer.",
            "Das hilft nicht weiter. Schlag vor, wie ihr hinkommt.",
          ],
          [
            "g",
            "Kein Problem, wir können mit die Straßenbahn fahren.",
            "„mit“ + Dativ: „mit der Straßenbahn“.",
          ],
        ],
        [
          "ablehnen",
          "Gut. Was bringen wir mit? Blumen vielleicht?",
          "Hm, in manchen Krankenhäusern sind Blumen nicht erlaubt. Wie wäre es mit einer Zeitschrift und etwas Obst?",
          "Vorsichtig ablehnen mit Grund und eine Alternative nennen.",
          ["k", "Blumen sind langweilig.", "Unhöflich und ohne Alternative."],
          [
            "g",
            "In manchen Krankenhäusern Blumen sind nicht erlaubt. Wie wäre es mit Obst?",
            "Das Verb steht auf Position 2: „In manchen Krankenhäusern sind Blumen nicht erlaubt.“",
          ],
        ],
        [
          "verteilen",
          "Stimmt, Obst und eine Zeitschrift sind besser. Wie machen wir das jetzt genau?",
          "Ich kaufe das Obst, und du besorgst die Zeitschrift. Wir treffen uns um halb fünf an der Haltestelle.",
          "Aufgaben verteilen und einen Treffpunkt mit Uhrzeit vereinbaren.",
          [
            "k",
            "Schreib mir einfach.",
            "Zu ungenau. Verteilt die Aufgaben und vereinbart einen Treffpunkt.",
          ],
          [
            "g",
            "Ich kaufe das Obst, und du besorgst die Zeitschrift. Wir treffen uns um halb fünf an die Haltestelle.",
            "Wo? → Dativ: „an der Haltestelle“.",
          ],
        ],
      ],
    },

    {
      id: "kitafest",
      icon: "🎈",
      title: "Sommerfest in der Kita",
      who: "Fatma",
      voice: "f2",
      color: "#16a34a",
      task: "Du und Fatma seid im Elternbeirat und organisiert das Sommerfest der Kita.",
      points: ["Programm", "Essen", "Allergien", "Geld", "Wer macht was?"],
      turns: [
        [
          "vorschlagen",
          "Wir zwei sind dieses Jahr für das Sommerfest der Kita zuständig. Was sollen wir den Kindern anbieten?",
          "Ich schlage vor, dass wir Kinderschminken und Sackhüpfen machen. Das ist einfach und kostet fast nichts.",
          "Vorschlagen mit „Ich schlage vor, dass …“ – das Verb steht am Ende.",
          [
            "o",
            "Meine Tochter ist in der Gruppe Schmetterlinge.",
            "Fatma fragt nach Ideen für das Fest.",
          ],
          [
            "g",
            "Ich schlage vor, dass wir machen Kinderschminken und Sackhüpfen.",
            "Nach „dass“ steht das Verb am Ende: „dass wir Kinderschminken und Sackhüpfen machen“.",
          ],
        ],
        [
          "ablehnen",
          "Kinderschminken ist toll. Und das Essen? Sollen wir einen Partyservice bestellen?",
          "Ein Partyservice ist teuer, und viele Eltern kochen gern. Wir könnten ein internationales Buffet machen.",
          "Ablehnen mit Grund und eine Alternative mit „Wir könnten …“ vorschlagen.",
          ["k", "Nee, zu teuer.", "Zu kurz. Nenne eine Alternative."],
          [
            "i",
            "Kinderschminken kann ich auch selbst machen.",
            "Fatma fragt jetzt nach dem Essen. Reagiere darauf.",
          ],
        ],
        [
          "nachfragen",
          "Ein internationales Buffet finde ich wunderbar! Aber manche Kinder haben Allergien.",
          "Das stimmt. Vielleicht schreibt jede Familie auf einen Zettel, was im Essen ist. Weißt du, welche Allergien es gibt?",
          "Auf das Problem eingehen, eine Lösung anbieten und nachfragen: „Weißt du, welche …?“",
          [
            "o",
            "Ich habe zum Glück keine Allergie.",
            "Es geht nicht um dich, sondern um die Kinder beim Fest.",
          ],
          [
            "g",
            "Das stimmt. Vielleicht jede Familie schreibt auf einen Zettel, was im Essen ist.",
            "Nach „vielleicht“ am Satzanfang kommt das Verb: „Vielleicht schreibt jede Familie …“",
          ],
        ],
        [
          "vorschlagen",
          "Die Erzieherinnen haben eine Liste. Brauchen wir auch Geld für das Fest?",
          "Ein bisschen schon, für Farben und kleine Preise. Wir könnten Kuchen für einen Euro verkaufen.",
          "Kurz antworten und einen konkreten Vorschlag machen.",
          [
            "k",
            "Geld habe ich nicht.",
            "Zu kurz und hilft nicht weiter. Schlag vor, wie ihr Geld bekommt.",
          ],
          [
            "g",
            "Ein bisschen schon. Wir könnten Kuchen verkaufen für ein Euro.",
            "„für“ + Akkusativ: „für einen Euro“. Der Infinitiv „verkaufen“ steht am Ende.",
          ],
        ],
        [
          "verteilen",
          "Gute Idee! Also, wer übernimmt welche Aufgabe?",
          "Ich organisiere das Kinderschminken und kaufe die Farben. Fragst du die Erzieherinnen nach der Liste und schreibst den Eltern?",
          "Aufgaben verteilen: „Ich organisiere … Fragst du …?“",
          [
            "k",
            "Ich habe leider nie Zeit.",
            "Ohne Aufgabe geht es nicht. Biete wenigstens eine kleine Aufgabe an.",
          ],
          [
            "g",
            "Ich organisiere das Kinderschminken. Du fragst die Erzieherinnen nach die Liste?",
            "„fragen nach“ + Dativ: „nach der Liste“.",
          ],
        ],
      ],
    },

    {
      id: "radtour",
      icon: "🚲",
      title: "Fahrradtour am Sonntag",
      who: "Olena",
      voice: "f1",
      color: "#0369a1",
      task: "Du und Olena wollt am Sonntag mit Freunden eine Fahrradtour machen.",
      points: [
        "Strecke",
        "Treffpunkt und Uhrzeit",
        "Fahrrad für Tran",
        "Mittagessen",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Das Wetter soll am Sonntag super werden. Wollen wir mit ein paar Leuten eine Fahrradtour machen?",
          "Oh ja, tolle Idee! Wir könnten am Fluss entlang zum See fahren. Die Strecke ist flach und schön.",
          "Begeistert zustimmen und gleich eine eigene Idee bringen.",
          [
            "k",
            "Fahrrad? Ach nee.",
            "Zu kurz. Sag deine Meinung und bring eine Idee ein.",
          ],
          [
            "g",
            "Oh ja! Wir könnten am Fluss entlang zum See fahren. Die Strecke ist flach und schöne.",
            "Nach „ist“ steht das Adjektiv ohne Endung: „flach und schön“.",
          ],
        ],
        [
          "ablehnen",
          "Zum See ist gut. Treffen wir uns um sieben Uhr, dann ist es noch nicht so heiß?",
          "Sieben ist mir ein bisschen zu früh, es ist ja Sonntag. Geht es auch um neun?",
          "Ablehnen mit Grund und Gegenvorschlag: „… ist mir zu früh. Geht es auch um …?“",
          [
            "k",
            "Sieben? Vergiss es.",
            "Unhöflich. Nenne einen Grund und eine andere Uhrzeit.",
          ],
          [
            "i",
            "Am See kann man auch schwimmen.",
            "Olena fragt nach der Uhrzeit. Reagiere darauf.",
          ],
        ],
        [
          "vorschlagen",
          "Na gut, um neun am Rathaus. Aber Tran hat gar kein Fahrrad.",
          "Kein Problem, er kann ein Leihrad nehmen. Am Bahnhof gibt es Leihräder, die sind ziemlich günstig.",
          "Auf das Problem reagieren und eine Lösung vorschlagen.",
          [
            "o",
            "Mein Fahrrad ist aus Holland.",
            "Das hilft Tran nicht. Schlag eine Lösung vor.",
          ],
          [
            "g",
            "Kein Problem, er kann ein Fahrrad leihen von der Bahnhof.",
            "„der Bahnhof“ ist maskulin: „vom Bahnhof“ – besser: „Er kann am Bahnhof ein Fahrrad leihen.“",
          ],
        ],
        [
          "ablehnen",
          "Super. Sollen wir am See in ein Restaurant gehen?",
          "Am Sonntag ist es dort sehr voll. Wie wäre es mit einem Picknick? Das ist billiger, und wir können länger bleiben.",
          "Ablehnen mit Grund und eine Alternative mit Vorteilen nennen.",
          ["k", "Restaurant ist doof.", "Unhöflich und ohne Alternative."],
          [
            "g",
            "Am Sonntag ist es dort sehr voll. Wie wäre es mit ein Picknick?",
            "„mit“ + Dativ: „mit einem Picknick“.",
          ],
        ],
        [
          "verteilen",
          "Picknick klingt gut. Wer bringt was mit?",
          "Ich bringe eine Decke und Getränke mit. Kannst du Brötchen und Obst mitbringen und den anderen Bescheid sagen?",
          "Genau sagen, wer was mitbringt: „Ich bringe … mit. Kannst du …?“",
          [
            "k",
            "Jeder bringt irgendwas.",
            "Zu ungenau. Vereinbart konkret, wer was mitbringt.",
          ],
          [
            "g",
            "Ich mitbringe eine Decke und Getränke.",
            "„mitbringen“ ist trennbar: „Ich bringe eine Decke mit.“",
          ],
        ],
      ],
    },

    {
      id: "lerngruppe",
      icon: "📚",
      title: "Zusammen für den DTZ lernen",
      who: "Svetlana",
      voice: "f3",
      color: "#7c3aed",
      task: "In vier Wochen ist eure Prüfung. Du und Svetlana wollt zusammen lernen.",
      points: [
        "Lerngruppe ja oder nein",
        "Wochentage",
        "Ort",
        "Was zuerst üben?",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "In vier Wochen ist schon die Prüfung. Wollen wir zusammen lernen?",
          "Ja, sehr gern! Zusammen macht es mehr Spaß. Wie oft wollen wir uns treffen?",
          "Zustimmen, kurz begründen und eine Frage stellen.",
          [
            "k",
            "Ich lerne lieber allein.",
            "Damit endet das Gespräch. Im DTZ sollt ihr gemeinsam planen.",
          ],
          [
            "g",
            "Ja, sehr gern! Zusammen es macht mehr Spaß.",
            "Das Verb steht auf Position 2: „Zusammen macht es mehr Spaß.“",
          ],
        ],
        [
          "ablehnen",
          "Ich denke, zweimal pro Woche ist gut. Vielleicht montags und donnerstags nach dem Kurs?",
          "Montags passt gut, aber donnerstags muss ich meine Kinder abholen. Können wir statt Donnerstag den Mittwoch nehmen?",
          "Teilweise zustimmen, den Rest mit Grund ablehnen und eine Alternative nennen.",
          [
            "k",
            "Donnerstag nicht.",
            "Zu kurz. Nenne einen Grund und einen anderen Tag.",
          ],
          [
            "g",
            "Montags passt gut, aber donnerstags ich muss meine Kinder abholen.",
            "Nach „aber“ bleibt die normale Wortstellung: „aber donnerstags muss ich …“",
          ],
        ],
        [
          "vorschlagen",
          "Mittwoch geht auch. Wo sollen wir lernen? Bei mir zu Hause ist es oft laut.",
          "Dann lass uns in die Stadtbibliothek gehen. Dort ist es ruhig, und es gibt sogar Gruppenräume.",
          "Vorschlagen mit „Lass uns …“ und einem Grund.",
          [
            "o",
            "Meine Nachbarn sind auch sehr laut.",
            "Das hilft nicht. Schlag einen ruhigen Ort vor.",
          ],
          [
            "i",
            "Bei dir zu Hause ist es doch super.",
            "Svetlana hat gesagt, dass es dort laut ist. Hör genau zu.",
          ],
        ],
        [
          "vorschlagen",
          "Die Bibliothek ist eine gute Idee. Was sollen wir zuerst üben?",
          "Ich finde, wir sollten mit dem Sprechen anfangen, denn das können wir allein nicht gut üben. Was meinst du?",
          "Meinung mit Grund („denn …“) sagen und den Partner fragen: „Was meinst du?“",
          [
            "k",
            "Egal, alles.",
            "Zu ungenau. Sag, womit ihr anfangen sollt, und warum.",
          ],
          [
            "g",
            "Ich finde, wir sollten mit dem Sprechen anfangen, denn das wir können allein nicht gut üben.",
            "Nach „denn“ bleibt die normale Wortstellung: „denn das können wir …“",
          ],
        ],
        [
          "verteilen",
          "Genau, Sprechen ist am wichtigsten. Wer bereitet bis Mittwoch was vor?",
          "Ich drucke die Modelltests aus. Und du suchst ein paar Redemittel für Teil drei heraus, okay?",
          "Aufgaben bis zu einem Termin verteilen: „Ich … Und du …, okay?“",
          [
            "k",
            "Mal schauen.",
            "Zu ungenau. Vereinbart, wer was bis Mittwoch macht.",
          ],
          [
            "g",
            "Ich drucke die Modelltests aus. Und du heraussuchst ein paar Redemittel.",
            "„heraussuchen“ ist trennbar: „Du suchst ein paar Redemittel heraus.“",
          ],
        ],
      ],
    },

    {
      id: "flohmarkt",
      icon: "🧸",
      title: "Stand auf dem Flohmarkt",
      who: "Mehmet",
      voice: "m2",
      color: "#a16207",
      task: "Du und Mehmet wollt alte Sachen auf dem Flohmarkt verkaufen.",
      points: [
        "Was verkaufen?",
        "Standgebühr",
        "Preise",
        "Transport",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Ich habe so viele alte Sachen im Keller. Wollen wir zusammen einen Stand auf dem Flohmarkt machen?",
          "Gern, ich habe auch viele Kinderkleider, die zu klein sind. Weißt du, wann der nächste Flohmarkt ist?",
          "Zustimmen, etwas Eigenes beitragen und nachfragen.",
          [
            "k",
            "Ich kaufe lieber neue Sachen.",
            "Das passt nicht zur Frage. Sag, ob du mitmachst.",
          ],
          [
            "g",
            "Gern, ich habe auch viele Kinderkleider, die sind zu klein.",
            "Im Relativsatz steht das Verb am Ende: „…, die zu klein sind“.",
          ],
        ],
        [
          "nachfragen",
          "Am Samstag ist Flohmarkt auf dem Schulhof. Ein Stand kostet zwanzig Euro.",
          "Zwanzig Euro ist okay, wenn wir es teilen. Muss man den Stand vorher anmelden?",
          "Auf die Information reagieren und etwas Wichtiges nachfragen.",
          [
            "o",
            "Zwanzig Euro habe ich letzte Woche für Benzin bezahlt.",
            "Das hilft der Planung nicht. Reagiere auf den Preis für den Stand.",
          ],
          [
            "i",
            "Wir können die Sachen auch im Internet verkaufen.",
            "Ihr habt euch schon für den Flohmarkt entschieden. Reagiere auf Mehmets Information.",
          ],
        ],
        [
          "vorschlagen",
          "Ja, bis Donnerstag. Wie viel sollen wir für die Sachen nehmen?",
          "Ich würde die Preise niedrig machen, zum Beispiel ein bis fünf Euro. Dann verkaufen wir mehr.",
          "Vorschlagen mit „Ich würde …“ und begründen: „Dann …“",
          [
            "k",
            "Keine Ahnung.",
            "Zu kurz. Mach einen Vorschlag, auch wenn du nicht sicher bist.",
          ],
          [
            "g",
            "Ich würde die Preise niedrig machen. Dann wir verkaufen mehr.",
            "Nach „dann“ kommt sofort das Verb: „Dann verkaufen wir mehr.“",
          ],
        ],
        [
          "nachfragen",
          "Okay. Ich habe auch Möbel, aber nur ein kleines Auto.",
          "Wie groß sind die Möbel denn? Wenn es zu viel ist, frage ich meinen Schwager. Er hat einen großen Kombi.",
          "Nachfragen („Wie groß …?“) und eine Hilfe anbieten.",
          [
            "o",
            "Kleine Autos sind gut für die Umwelt.",
            "Das hilft nicht. Wie bringt ihr die Möbel zum Flohmarkt?",
          ],
          [
            "g",
            "Wie groß sind die Möbel? Ich frage mein Schwager, er hat einen Kombi.",
            "„fragen“ + Akkusativ: „meinen Schwager“.",
          ],
        ],
        [
          "verteilen",
          "Ein Regal und zwei Stühle. Dann lass uns festlegen, wer was macht.",
          "Gut. Ich melde den Stand bis Donnerstag an und frage meinen Schwager. Du machst die Preisschilder, ja?",
          "Aufgaben mit Termin übernehmen und abgeben: „Ich … bis Donnerstag. Du …, ja?“",
          [
            "k",
            "Es war deine Idee, also machst du alles.",
            "Unfair und unhöflich. Teilt die Aufgaben auf.",
          ],
          [
            "g",
            "Ich anmelde den Stand bis Donnerstag. Du machst die Preisschilder?",
            "„anmelden“ ist trennbar: „Ich melde den Stand an.“",
          ],
        ],
      ],
    },

    {
      id: "hochzeit",
      icon: "💍",
      title: "Hochzeitsgeschenk für Paulo",
      who: "Elena",
      voice: "f1",
      color: "#be185d",
      task: "Euer Kollege Paulo heiratet. Du und Elena organisiert ein Geschenk vom ganzen Team.",
      points: [
        "Gemeinsames Geschenk?",
        "Was schenken?",
        "Geld sammeln",
        "Karte",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Paulo heiratet im Mai. Sollen wir im Team zusammen ein Geschenk kaufen?",
          "Ja, unbedingt! Wenn alle zehn Euro geben, können wir etwas Schönes kaufen.",
          "Zustimmen und gleich zeigen, wie es klappen kann: „Wenn …, können wir …“",
          [
            "k",
            "Ich kenne ihn kaum.",
            "Zu kurz und negativ. Im DTZ sollt ihr gemeinsam planen.",
          ],
          [
            "g",
            "Ja, unbedingt! Wenn alle geben zehn Euro, können wir etwas Schönes kaufen.",
            "Im Nebensatz mit „wenn“ steht das Verb am Ende: „Wenn alle zehn Euro geben, …“",
          ],
        ],
        [
          "ablehnen",
          "Was könnten wir ihm schenken? Vielleicht Gläser oder Geschirr?",
          "Ich weiß nicht, vielleicht haben sie das schon. Wie wäre es mit einem Gutschein für ein schönes Restaurant?",
          "Vorsichtig ablehnen („Ich weiß nicht, …“) und eine Alternative nennen.",
          ["k", "Gläser? Langweilig.", "Unhöflich und ohne Alternative."],
          [
            "g",
            "Ich weiß nicht, vielleicht sie haben das schon.",
            "Nach „vielleicht“ kommt das Verb: „vielleicht haben sie das schon“.",
          ],
        ],
        [
          "vorschlagen",
          "Ein Restaurantgutschein ist schön. Wie sammeln wir das Geld?",
          "Wir könnten einen Umschlag in der Teeküche aufhängen. Dann kann jeder bis Ende April etwas hineinlegen.",
          "Einen praktischen Vorschlag mit „Wir könnten …“ machen.",
          [
            "o",
            "Geld ist nicht alles im Leben.",
            "Elena fragt, wie ihr das Geld einsammelt.",
          ],
          [
            "g",
            "Wir könnten einen Umschlag in der Teeküche aufhängen. Dann jeder kann etwas hineinlegen.",
            "Nach „dann“ kommt sofort das Verb: „Dann kann jeder …“",
          ],
        ],
        [
          "zustimmen",
          "Gut. Und eine Karte? Ich würde gern eine Karte kaufen, auf der alle unterschreiben.",
          "Ja, eine Karte gehört dazu. Ich finde, jeder sollte auch einen kurzen Glückwunsch schreiben, das ist persönlicher.",
          "Zustimmen und die Idee mit einer Begründung erweitern.",
          [
            "k",
            "Wie du willst.",
            "Desinteressiert. Sag deine Meinung zur Karte.",
          ],
          [
            "i",
            "Lass uns lieber Blumen kaufen.",
            "Elena fragt nach der Karte. Gehe zuerst darauf ein.",
          ],
        ],
        [
          "verteilen",
          "Prima. Dann verteilen wir die Aufgaben: Wer macht was?",
          "Ich kaufe die Karte und hänge den Umschlag auf. Kannst du den Gutschein kaufen und ihn Paulo geben?",
          "Klar sagen, was du machst, und höflich um Hilfe bitten: „Kannst du …?“",
          [
            "k",
            "Machen wir später.",
            "Zu ungenau. Am Ende müsst ihr die Aufgaben verteilen.",
          ],
          [
            "g",
            "Ich kaufe die Karte. Kannst du den Gutschein kaufen und geben ihn Paulo?",
            "Nach „kannst du“ stehen beide Infinitive am Ende: „… kaufen und ihn Paulo geben“.",
          ],
        ],
      ],
    },

    {
      id: "buffet",
      icon: "🍲",
      title: "Internationales Buffet im Kurs",
      who: "Amira",
      voice: "f2",
      color: "#ea580c",
      task: "Jeder im Kurs bringt ein Gericht aus seinem Land mit. Du planst das Buffet mit Amira.",
      points: ["Termin", "Gerichte", "Geschirr", "Getränke", "Wer macht was?"],
      turns: [
        [
          "vorschlagen",
          "Unser Kurs möchte ein internationales Buffet machen. Jeder bringt ein Gericht aus seinem Land mit. Wann wollen wir das machen?",
          "Wie wäre es mit der letzten Stunde vor den Ferien? Dann haben wir auch etwas zu feiern.",
          "Vorschlagen mit „Wie wäre es mit …?“ und einem Grund.",
          [
            "o",
            "In meinem Land isst man viel Reis.",
            "Amira fragt nach dem Termin.",
          ],
          [
            "g",
            "Wie wäre es mit die letzte Stunde vor den Ferien?",
            "„mit“ + Dativ: „mit der letzten Stunde“.",
          ],
        ],
        [
          "vorschlagen",
          "Gut, die letzte Stunde. Aber was ist, wenn alle nur Süßes mitbringen?",
          "Das kann passieren. Wir könnten eine Liste machen: Jeder schreibt auf, was er mitbringt – Salat, Hauptgericht oder Nachtisch.",
          "Das Problem ernst nehmen und eine Lösung vorschlagen.",
          ["k", "Dann essen wir eben nur Kuchen.", "Zu kurz, keine Lösung."],
          [
            "i",
            "Die letzte Stunde ist am Freitag.",
            "Der Termin ist schon klar. Amira fragt, was ihr gegen zu viel Süßes macht.",
          ],
        ],
        [
          "ablehnen",
          "Eine Liste ist super. Ich würde Plastikteller kaufen, das ist am einfachsten.",
          "Plastik ist nicht gut für die Umwelt. In der Schulküche gibt es doch normales Geschirr. Können wir das nicht nehmen?",
          "Ablehnen mit Grund und eine Alternative als Frage vorschlagen.",
          [
            "k",
            "Plastik? Nein danke.",
            "Zu kurz. Nenne einen Grund und eine Alternative.",
          ],
          [
            "g",
            "Plastik ist nicht gut für die Umwelt. In der Schulküche es gibt normales Geschirr.",
            "Das Verb steht auf Position 2: „In der Schulküche gibt es …“",
          ],
        ],
        [
          "vorschlagen",
          "Stimmt, ich frage die Hausmeisterin wegen der Küche. Und die Getränke?",
          "Ich schlage vor, dass wir Wasser und Saft zusammen kaufen und die Kosten teilen. Dann muss nicht jeder schwere Flaschen tragen.",
          "Vorschlagen mit „Ich schlage vor, dass …“ und den Vorteil nennen.",
          [
            "o",
            "Ich trinke am liebsten schwarzen Tee.",
            "Es geht um die Getränke für alle, nicht um deinen Geschmack.",
          ],
          [
            "g",
            "Ich schlage vor, dass wir Wasser und Saft zusammen kaufen und teilen die Kosten.",
            "Im dass-Satz stehen beide Verben am Ende: „dass wir … kaufen und die Kosten teilen“.",
          ],
        ],
        [
          "verteilen",
          "Gut. Also, was machst du und was mache ich?",
          "Ich schreibe die Liste und hänge sie im Kursraum auf. Du fragst die Hausmeisterin und kaufst die Getränke. Einverstanden?",
          "Zusammenfassen, wer was macht, und mit „Einverstanden?“ die Einigung sichern.",
          [
            "k",
            "Weiß ich noch nicht.",
            "Zu ungenau. Am Ende müsst ihr die Aufgaben verteilen.",
          ],
          [
            "g",
            "Ich schreibe die Liste. Du sprichst mit der Hausmeisterin und kaufst den Getränke.",
            "„das Getränk“ – Plural: „die Getränke“.",
          ],
        ],
      ],
    },

    {
      id: "besuch",
      icon: "🧳",
      title: "Wochenende mit Besuch",
      who: "Daniel",
      voice: "m1",
      color: "#4338ca",
      task: "Eure Freundin Lucía kommt am Wochenende zu Besuch. Du und Daniel plant das Programm.",
      points: [
        "Programm am Samstag",
        "Abend",
        "Restaurant",
        "Übernachtung",
        "Wer macht was?",
      ],
      turns: [
        [
          "vorschlagen",
          "Lucía kommt am Wochenende zu Besuch. Was wollen wir ihr am Samstag zeigen?",
          "Wir könnten zuerst die Altstadt besichtigen und dann auf den Aussichtsturm gehen. Von dort sieht man die ganze Stadt.",
          "Einen Plan vorschlagen: „zuerst …, dann …“ – mit Grund.",
          [
            "o",
            "Lucía spricht sehr gut Englisch.",
            "Daniel fragt nach dem Programm am Samstag.",
          ],
          [
            "g",
            "Wir könnten zuerst die Altstadt besichtigen und dann gehen auf den Aussichtsturm.",
            "Nach „könnten“ steht auch der zweite Infinitiv am Ende: „und dann auf den Aussichtsturm gehen“.",
          ],
        ],
        [
          "ablehnen",
          "Der Turm ist super. Und am Abend? Ich würde gern in einen Club gehen.",
          "Lucía tanzt nicht so gern, glaube ich. Wie wäre es mit einem Abendessen am Fluss? Da kann man gut reden.",
          "Vorsichtig ablehnen mit Grund („…, glaube ich.“) und eine Alternative nennen.",
          [
            "k",
            "Clubs sind was für Kinder.",
            "Unhöflich. Begründe freundlich und schlag etwas anderes vor.",
          ],
          [
            "i",
            "Am Samstag ist auch Markt in der Altstadt.",
            "Daniel fragt nach dem Abend. Reagiere auf seinen Vorschlag.",
          ],
        ],
        [
          "nachfragen",
          "Okay, Abendessen am Fluss. Soll ich einen Tisch reservieren? Und wann?",
          "Ja, bitte, um sieben wäre gut. Weißt du, ob das Restaurant auch vegetarisches Essen hat? Lucía isst kein Fleisch.",
          "Die Frage beantworten und etwas Wichtiges nachfragen: „Weißt du, ob …?“",
          ["k", "Ja. Irgendwann.", "Zu ungenau. Nenne eine Uhrzeit."],
          [
            "g",
            "Ja, bitte, um sieben. Weißt du, ob hat das Restaurant vegetarisches Essen?",
            "Nach „ob“ steht das Verb am Ende: „ob das Restaurant vegetarisches Essen hat“.",
          ],
        ],
        [
          "vorschlagen",
          "Ja, sie haben viele vegetarische Gerichte. Wo schläft Lucía eigentlich?",
          "Sie kann bei mir auf dem Sofa schlafen, das ist bequem. Dann muss sie kein Hotel bezahlen.",
          "Eine Lösung anbieten und den Vorteil nennen: „Dann …“",
          [
            "o",
            "Ich schlafe immer sehr schlecht.",
            "Es geht darum, wo Lucía übernachtet.",
          ],
          [
            "g",
            "Sie kann bei mir auf dem Sofa schlafen. Dann sie muss kein Hotel bezahlen.",
            "Nach „dann“ kommt sofort das Verb: „Dann muss sie …“",
          ],
        ],
        [
          "verteilen",
          "Sehr nett von dir. Dann lass uns noch klären, wer was übernimmt.",
          "Ich hole Lucía am Freitag vom Bahnhof ab und mache das Sofa fertig. Du reservierst den Tisch für Samstag um sieben, okay?",
          "Aufgaben verteilen und die Einigung mit „okay?“ bestätigen lassen.",
          [
            "k",
            "Lucía kann das doch selbst planen.",
            "Du übernimmst keine Aufgabe. Ihr sollt gemeinsam planen.",
          ],
          [
            "g",
            "Ich abhole Lucía am Freitag vom Bahnhof. Du reservierst den Tisch, okay?",
            "„abholen“ ist trennbar: „Ich hole Lucía vom Bahnhof ab.“",
          ],
        ],
      ],
    },

    {
      id: "senioren",
      icon: "🎲",
      title: "Spielenachmittag im Seniorenheim",
      who: "Grace",
      voice: "f1",
      color: "#0d9488",
      task: "Das Seniorenheim in eurer Straße sucht Freiwillige. Du und Grace plant einen Spielenachmittag.",
      points: [
        "Mitmachen?",
        "Spiele",
        "Kaffee und Kuchen",
        "Musik",
        "Wer macht was?",
      ],
      turns: [
        [
          "zustimmen",
          "Das Seniorenheim in unserer Straße sucht Freiwillige. Wollen wir dort einen Spielenachmittag machen?",
          "Ja, das finde ich schön. Viele alte Menschen sind oft allein und freuen sich über Besuch.",
          "Zustimmen mit Begründung: „Das finde ich schön. Viele …“",
          [
            "k",
            "Was bekommen wir dafür?",
            "Unpassend: Es ist eine freiwillige Hilfe. Sag, ob du mitmachst und warum.",
          ],
          [
            "g",
            "Ja, das finde ich schön. Viele alte Menschen sind oft allein und freuen über Besuch.",
            "„sich freuen über“ – das „sich“ fehlt: „… und freuen sich über Besuch“.",
          ],
        ],
        [
          "vorschlagen",
          "Die Leiterin sagt, Mittwochnachmittag passt am besten. Welche Spiele könnten wir mitbringen?",
          "Wir könnten Bingo und Memory spielen. Die Spiele sind einfach, und man kann sie in einer großen Gruppe spielen.",
          "Konkrete Ideen nennen und begründen.",
          [
            "o",
            "Ich spiele am Wochenende gern Fußball.",
            "Es geht um Spiele für die Senioren.",
          ],
          [
            "g",
            "Wir könnten Bingo und Memory spielen. Man kann sie spielen in einer großen Gruppe.",
            "Der Infinitiv steht am Ende: „Man kann sie in einer großen Gruppe spielen.“",
          ],
        ],
        [
          "nachfragen",
          "Bingo ist super! Sollen wir auch Kuchen backen?",
          "Gern. Aber wir sollten vorher fragen, ob jemand Diabetes hat. Weißt du, wen wir da fragen können?",
          "Zustimmen, an ein Problem denken und nachfragen: „Weißt du, wen …?“",
          [
            "k",
            "Backen kann ich nicht. Nein.",
            "Zu kurz und negativ. Du kannst auch etwas anderes anbieten.",
          ],
          [
            "i",
            "Bingo spielen wir dann zweimal.",
            "Grace fragt nach dem Kuchen. Reagiere darauf.",
          ],
        ],
        [
          "zustimmen",
          "Ich frage die Pflegekräfte. Ich spiele übrigens Gitarre. Wir könnten am Ende zusammen singen.",
          "Das ist eine wunderbare Idee! Ältere Menschen kennen oft viele alte Lieder. Ich drucke die Texte groß aus.",
          "Begeistert zustimmen, begründen und etwas Passendes anbieten.",
          [
            "k",
            "Singen? Peinlich.",
            "Unhöflich. Sag freundlich deine Meinung.",
          ],
          [
            "g",
            "Das ist eine wunderbare Idee! Ich drucke die Texte in große Buchstaben aus.",
            "Wie? → Dativ: „in großen Buchstaben“.",
          ],
        ],
        [
          "verteilen",
          "Toll. Lass uns die Aufgaben verteilen, dann kann ich der Leiterin Bescheid sagen.",
          "Ich bringe Bingo und Memory mit und drucke die Liedtexte. Du backst den Kuchen und bringst die Gitarre mit. Passt das?",
          "Zusammenfassen, wer was macht, und fragen: „Passt das?“",
          [
            "k",
            "Sag ihr einfach irgendwas.",
            "Zu ungenau. Verteilt die Aufgaben konkret.",
          ],
          [
            "g",
            "Ich bringe Bingo und Memory mit. Du backst den Kuchen und mitbringst die Gitarre.",
            "„mitbringen“ ist trennbar: „… und bringst die Gitarre mit“.",
          ],
        ],
      ],
    },
  ];

  /* Alle Sätze der Partner – genau so, wie sie im Spiel stehen (für die Vertonung) */
  const SAY = SC.flatMap((s) => s.turns.map((t) => t[1]));

  const CSS = `
.sp-planen-card{border:2px solid var(--dm-line);border-radius:18px;padding:12px 14px;background:#fbfcff}
.sp-planen-card h2{display:flex;align-items:center;gap:8px;margin:0 0 4px;font-size:clamp(18px,5vw,22px);line-height:1.25}
.sp-planen-card h2 span{font-size:24px;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.sp-planen-task{margin:0 0 8px;color:#3b4560;font-size:16px;line-height:1.45}
.sp-planen-pts{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}
.sp-planen-pts li{display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:4px 10px;border-radius:99px;background:#eef1f8;color:#3b4560;font-size:14px;font-weight:700;line-height:1.3;overflow-wrap:anywhere}
.sp-planen-pts li::before{content:'○';color:#8a93a8}
.sp-planen-pts li.is-now{background:var(--dm-tinte-soft);color:var(--dm-tinte-dark)}
.sp-planen-pts li.is-now::before{content:'▸';color:var(--dm-tinte)}
.sp-planen-pts li.is-done{background:#e8f6ec;color:#166534}
.sp-planen-pts li.is-done::before{content:'✓';color:#1f9d55}
.sp-planen-chat{display:flex;flex-direction:column;gap:10px;margin:12px 0 6px;max-height:clamp(180px,36vh,380px);overflow-y:auto;overscroll-behavior:contain;padding:10px 8px;border:1px solid var(--dm-line);border-radius:18px;background:linear-gradient(#fbfcff,#f4f6fb)}
.sp-planen-msg{display:flex;gap:8px;align-items:flex-start;max-width:94%}
.sp-planen-msg.is-me{align-self:flex-end;flex-direction:row-reverse}
.sp-planen-av{display:grid;place-items:center;flex:0 0 34px;width:34px;height:34px;border-radius:50%;color:#fff;font-weight:800;font-size:13px;margin-top:2px}
.sp-planen-b{display:flex;align-items:flex-start;gap:2px;min-width:0;padding:8px 4px 8px 12px;border-radius:18px 18px 18px 6px;background:#fff;border:1px solid #e1e5ef}
.sp-planen-b p{margin:0;padding-top:3px;font-size:17px;line-height:1.45;overflow-wrap:break-word;min-width:0}
.sp-planen-b p small{display:block;color:#55607a;font-size:13px;font-weight:700}
.is-me .sp-planen-b{border-radius:18px 18px 6px 18px;background:var(--dm-tinte-soft);border-color:transparent;padding:8px 12px}
.is-me.is-bad .sp-planen-b{background:#fdecea;border:1px dashed #e7a29d}
.is-me.is-bad .sp-planen-b p{text-decoration:line-through;text-decoration-color:rgba(198,40,40,.5)}
.sp-planen-say{flex:0 0 44px;width:44px;height:44px;margin:-6px -2px -6px 0;border:0;border-radius:50%;background:transparent;font-size:18px;cursor:pointer}
.sp-planen-say:hover,.sp-planen-say:focus-visible{background:#eef1f8}
.sp-planen-opts .ch-opt{font-size:17px;min-height:56px;min-width:0}
.sp-planen-opts .ch-opt span{min-width:0;overflow-wrap:break-word}
.sp-planen-opts .ch-opt kbd{flex:0 0 auto}
.sp-planen-type{display:inline-block;margin-right:6px;padding:1px 10px;border-radius:99px;background:#fff;border:1px solid currentColor;font-size:14px;font-weight:800}
.sp-planen-sum h2{margin:0 0 4px;font-size:22px}
.sp-planen-sum>p{margin:0 0 10px;color:#55607a;font-size:15px}
.sp-planen-sum section{margin:0 0 12px;padding:12px 14px;border-radius:16px;background:#f8f9fc}
.sp-planen-sum h3{margin:0 0 6px;font-size:17px}
.sp-planen-sum ul{margin:0;padding-left:20px}.sp-planen-sum li{margin:6px 0;line-height:1.4;overflow-wrap:break-word}
.sp-planen-sum .sp-planen-rm{margin:0 0 6px;color:#3b4560;font-size:14px}
.sp-planen-sum li.is-miss::marker{color:#c62828}
@media (hover:none){.sp-planen-opts .ch-opt:hover:not(:disabled){border-color:var(--dm-line)}}
@media (max-width:420px){.sp-planen-card{padding:10px 12px}.sp-planen-task{font-size:15px}.sp-planen-b p,.sp-planen-opts .ch-opt{font-size:16px}.sp-planen-opts .ch-opt{padding:10px 12px}.sp-planen-msg{max-width:98%}}`;

  const SEEN = "dm-planen-seen";
  const getSeen = () => {
    try {
      return JSON.parse(localStorage.getItem(SEEN) || "[]");
    } catch {
      return [];
    }
  };
  const putSeen = (a) => {
    try {
      localStorage.setItem(SEEN, JSON.stringify(a.slice(-SC.length + 1)));
    } catch {}
  };
  const ini = (n) => n.slice(0, 2).toUpperCase();

  DMGame.register({
    id: ID,
    cat: "dtz",
    title: "DTZ-Planungsduell",
    icon: "🤝",
    level: "A2–B1",
    desc: "Sprechen Teil 3: Gemeinsam etwas planen – vorschlagen, reagieren, sich einigen.",
    intro:
      "Wie im DTZ, Sprechen Teil 3: Du planst mit einer Partnerin oder einem Partner etwas – eine Feier, einen Ausflug, einen Besuch. Die andere Person sagt etwas, du wählst die beste Antwort: Sie geht auf den Partner ein und bringt eine eigene Idee oder einen Grund. Pro Situation 5 Züge, am Ende verteilt ihr die Aufgaben. Danach bekommst du deine Redemittel-Sammlung.",
    optionsLabel: "Wie viele Situationen?",
    options: [
      { id: "3", label: "3 Situationen (ca. 5 Minuten)" },
      { id: "1", label: "1 Situation – schnell" },
      { id: "6", label: "6 Situationen – Training" },
    ],
    tts: () =>
      SC.flatMap((s) => s.turns.map((t) => ({ text: t[1], voice: s.voice }))),
    start(api, opt) {
      if (!document.getElementById("sp-planen-css"))
        document.head.insertAdjacentHTML(
          "beforeend",
          `<style id="sp-planen-css">${CSS}</style>`,
        );
      const e = api.esc,
        n = Math.max(1, Math.min(SC.length, +opt || 3));
      // prefer situations the learner has not played recently
      const seen = getSeen(),
        fresh = api.shuffle(SC.filter((s) => !seen.includes(s.id))),
        old = api.shuffle(SC.filter((s) => seen.includes(s.id)));
      const deck = [...fresh, ...old].slice(0, n);
      putSeen([
        ...seen.filter((id) => !deck.some((s) => s.id === id)),
        ...deck.map((s) => s.id),
      ]);
      const max = n * 5,
        wrong = [],
        log = [];
      let si = 0,
        t = 0,
        score = 0,
        done = 0,
        sc = null,
        chat = null,
        bottom = null;
      const alive = () => chat && chat.isConnected;

      function situation() {
        sc = deck[si];
        t = 0;
        api.clearFeedback();
        api.el.innerHTML = `
          <div class="sp-planen-card">
            <h2><span aria-hidden="true">${sc.icon}</span>${e(sc.title)}</h2>
            <p class="sp-planen-task">${e(sc.task)}${n > 1 ? ` <small>(Situation ${si + 1} von ${n})</small>` : ""}</p>
            <ul class="sp-planen-pts" aria-label="Planungspunkte">${sc.points.map((p) => `<li>${e(p)}</li>`).join("")}</ul>
          </div>
          <div class="sp-planen-chat" role="log" aria-label="Gespräch mit ${e(sc.who)}"></div>
          <p class="ch-label">Deine Antwort:</p>
          <div class="sp-planen-bottom"></div>`;
        chat = api.el.querySelector(".sp-planen-chat");
        bottom = api.el.querySelector(".sp-planen-bottom");
        chat.addEventListener("click", (ev) => {
          const b = ev.target.closest(".sp-planen-say");
          if (b) api.speak(b.dataset.line);
        });
        turn();
      }
      const add = (html) => {
        chat.insertAdjacentHTML("beforeend", html);
        chat.scrollTop = chat.scrollHeight;
      };
      const points = () =>
        api.el.querySelectorAll(".sp-planen-pts li").forEach((li, k) => {
          li.className = k < t ? "is-done" : k === t ? "is-now" : "";
        });

      function turn() {
        const T = sc.turns[t];
        points();
        api.hud({ progress: done / max, step: `${done + 1} / ${max}`, score });
        add(
          `<div class="sp-planen-msg"><span class="sp-planen-av" style="background:${sc.color}" aria-hidden="true">${e(ini(sc.who))}</span><div class="sp-planen-b"><p><small>${e(sc.who)}</small>${e(T[1])}</p><button type="button" class="sp-planen-say" data-line="${e(T[1])}" aria-label="Satz von ${e(sc.who)} anhören">🔊</button></div></div>`,
        );
        const opts = api.shuffle([
          { ok: true, text: T[2] },
          ...T.slice(4).map(([k, text, why]) => ({ k, text, why })),
        ]);
        bottom.innerHTML = `<div class="ch-opts sp-planen-opts" role="group" aria-label="Antworten">${opts.map((o, i) => `<button type="button" class="ch-opt" data-k="${i}"><kbd>${i + 1}</kbd><span>${e(o.text)}</span></button>`).join("")}</div>`;
        const btns = [...bottom.querySelectorAll(".ch-opt")];
        btns.forEach((b, i) => {
          b.onclick = () => choose(T, opts[i], b, btns, opts);
        });
      }

      function choose(T, o, btn, btns, opts) {
        if (!alive() || btns.some((b) => b.disabled)) return;
        btns.forEach((b, i) => {
          b.disabled = true;
          if (opts[i].ok) b.classList.add("is-right");
        });
        const type = TYPES[T[0]],
          tag = `<span class="sp-planen-type">${e(type.label)}</span>`;
        if (o.ok) {
          score++;
          add(
            `<div class="sp-planen-msg is-me is-ok"><div class="sp-planen-b"><p><span class="dm-sr">Du: </span>${e(T[2])}</p></div></div>`,
          );
          api.feedback(true, `<b>Richtig!</b> <span>${tag}${e(T[3])}</span>`);
        } else {
          btn.classList.add("is-wrong");
          add(
            `<div class="sp-planen-msg is-me is-bad"><div class="sp-planen-b"><p><span class="dm-sr">Du (passt nicht): </span>${e(o.text)}</p></div></div>`,
          );
          add(
            `<div class="sp-planen-msg is-me is-ok"><div class="sp-planen-b"><p><small>Besser:</small>${e(T[2])}</p></div></div>`,
          );
          api.feedback(
            false,
            `<b>${e(KIND[o.k])}</b> <span>${e(o.why)}</span><span>Besser: <b>${e(T[2])}</b></span><span>${tag}${e(T[3])}</span>`,
          );
          wrong.push({ correct: T[2], tip: `${type.label}: ${T[3]}` });
        }
        log.push({ type: T[0], text: T[2], ok: o.ok });
        done++;
        t++;
        api.hud({ score, progress: done / max });
        if (t >= sc.turns.length) points();
        const last = t >= sc.turns.length && si + 1 >= n;
        if (last) api.next("Redemittel-Sammlung ansehen", summary);
        else if (t >= sc.turns.length)
          api.next("Nächste Situation", () => {
            si++;
            situation();
          });
        else
          api.next("Weiter", () => {
            if (alive()) {
              api.clearFeedback();
              turn();
            }
          });
        const nb = document.getElementById("sp-next");
        if (nb && nb.getBoundingClientRect().bottom > innerHeight)
          nb.scrollIntoView({ block: "end", behavior: "smooth" });
      }

      function summary() {
        api.clearFeedback();
        api.hud({ progress: 1, step: `${max} / ${max}`, score });
        const groups = Object.keys(TYPES)
          .map((k) => ({ k, items: log.filter((x) => x.type === k) }))
          .filter((g) => g.items.length);
        api.el.innerHTML = `<div class="sp-planen-sum">
          <h2>📒 Deine Redemittel-Sammlung</h2>
          <p>${score} von ${max} Antworten waren beim ersten Versuch richtig. Diese guten Sätze kannst du in der Prüfung benutzen – lies sie laut und übe sie mit einer Partnerin oder einem Partner.${log.some((x) => !x.ok) ? " Rot markiert: Diese Sätze solltest du noch üben." : ""}</p>
          ${groups.map((g) => `<section><h3>${e(TYPES[g.k].label)}</h3><p class="sp-planen-rm">Typisch: ${TYPES[g.k].rm.map(e).join(" · ")}</p><ul>${g.items.map((x) => `<li${x.ok ? "" : ' class="is-miss"'}>${e(x.text)}</li>`).join("")}</ul></section>`).join("")}
        </div>`;
        window.scrollTo({ top: 0, behavior: "smooth" });
        api.next("Ergebnis ansehen", () => api.finish({ score, max, wrong }));
      }

      situation();
    },
  });
})();
