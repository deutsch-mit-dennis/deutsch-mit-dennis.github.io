/* Exam fact pages (#pruefungsinfo, #pruefungsinfo/<id>). Lazy-loaded for route "pruefungsinfo".
   RULE: only facts that were checked against an official or clearly reliable source.
   Every block carries its sources; STAND is the day the sources were checked.
   Where nothing could be verified the page says "Bitte beim Prüfungszentrum fragen" – never guess.
   To update: check the source again, change the text, then set STAND. */
(() => {
  const STAND = "11.11.2026";
  const S = {
    gastFaq: [
      "g.a.s.t. – DTZ: Fragen und Antworten",
      "https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz/faq",
    ],
    gastBlick: [
      "g.a.s.t. – Der DTZ auf einen Blick",
      "https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz/der-dtz-auf-einen-blick",
    ],
    gastDtz: [
      "g.a.s.t. – Deutsch-Test für Zuwanderer",
      "https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz",
    ],
    gastUeb: [
      "g.a.s.t. – DTZ Übungssatz 2 (PDF)",
      "https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/PDF/gast_DTZ_UEbungssatz_2.pdf",
    ],
    bamfAbschluss: [
      "BAMF – Abschlussprüfung im Integrationskurs",
      "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html",
    ],
    bamfEinb: [
      "BAMF – Einbürgerung",
      "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html",
    ],
    bamfNachweis: [
      "BAMF – Sprachnachweise und Zertifikate",
      "https://www.bamf.de/DE/Themen/Integration/AkteureEhrenamtlicheInteressierte/SprachnachweiseZertifikate/sprachnachweise_zertifikate-node.html",
    ],
    bamfLidInfo: [
      "BAMF – Informationsblatt zum Test „Leben in Deutschland“ (PDF)",
      "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/informationsblatt-test-leben-in-deutschland.pdf?__blob=publicationFile&v=6",
    ],
    bamfKatalog: [
      "BAMF – Gesamtfragenkatalog",
      "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html",
    ],
    asyl: [
      "asyl.net – Neue Anforderungen beim Deutsch-Test für Zuwanderer",
      "https://www.asyl.net/view/neue-anforderungen-beim-deutsch-test-fuer-zuwanderer",
    ],
    telcB1: [
      "telc – Zertifikat Deutsch / telc Deutsch B1",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/certificate-german-telc-german-b1/",
    ],
    telcB1Ueb: [
      "telc – Übungstest 1 Zertifikat Deutsch B1 (PDF)",
      "https://shop.telc.net/media/catalog/product/file/telc_deutsch_b1_zd_uebungstest_1.pdf",
    ],
    uebDtbB1: [
      "telc – Übungstest 1, Deutsch-Test für den Beruf B1 (2022)",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/german-for-business/german-for-business-b1/",
    ],
    uebDtbB2: [
      "telc – Übungstest 1, Deutsch-Test für den Beruf B2 (2022)",
      "https://shop.telc.net/media/catalog/product/file/1/0/1011431_20220708_5015-b00-010102_web.pdf",
    ],
    uebTelcB2: [
      "telc – Übungstest 1, telc Deutsch B2 (2019)",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/telc-german-b2/",
    ],
    uebDtz: [
      "g.a.s.t. – DTZ Übungssatz 1 (Erwachsene), Ausgabe November 2026",
      "https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz/faq",
    ],
    telcB2: [
      "telc – telc Deutsch B2",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/telc-german-b2/",
    ],
    telcB2Hb: [
      "telc – Handbuch Deutsch B2 (PDF)",
      "https://www.telc.net/fileadmin/user_upload/pdfs/Handbuch_und_Tipps_fuer_Pruefungsvorbereitung/Deutsch_B2_Handbuch.pdf",
    ],
    telcReg: [
      "telc – Prüfungsregularien, gültig ab 15.04.2025 (PDF)",
      "https://www.telc.net/fileadmin/user_upload/pdfs/AGB_Pruefungsordnung/9994-P00-150010.pdf",
    ],
    telcDtbB1: [
      "telc – Deutsch-Test für den Beruf B1",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/german-for-business/german-for-business-b1/",
    ],
    telcDtbB2: [
      "telc – Deutsch-Test für den Beruf B2",
      "https://www.telc.net/en/language-examinations/certificate-exams/german/german-for-business/german-for-business-b2/",
    ],
    telcDtbHb: [
      "telc – Prüfungshandbuch Deutsch-Tests für den Beruf (PDF)",
      "https://shop.telc.net/media/catalog/product/file//5/0/5083-b01-010101_web.pdf",
    ],
    bamfDtbB1: [
      "BAMF – Übungstest 1 Deutsch-Test für den Beruf B1 (PDF)",
      "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Berufsbezsprachf-ESF-BAMF/BSK-Konzepte/b1-modelltest-bsk.pdf?__blob=publicationFile&v=9",
    ],
    bamfDtbB2: [
      "BAMF – Übungstest 1 Deutsch-Test für den Beruf B2 (PDF)",
      "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Berufsbezsprachf-ESF-BAMF/BSK-Konzepte/b2-modelltest-bsk.pdf?__blob=publicationFile&v=10",
    ],
    bamfDtbDurch: [
      "BAMF – Durchführungshinweise zu den Deutsch-Tests für den Beruf, gültig ab Juni 2024 (PDF)",
      "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Berufsbezsprachf-ESF-BAMF/BSK-DTB-Zulassungsverfahren/durchfuehrungshinweise-dtb.pdf?__blob=publicationFile&v=3",
    ],
  };
  const ASK = "Bitte beim Prüfungszentrum fragen.";
  const LEGAL =
    "Keine Rechtsberatung. Ob dein Zertifikat reicht, entscheidet immer die Behörde.";

  /* parts: [name, time, what, points] · blocks: { h, list: [...], src: [keys], legal? } */
  const X = {
    dtz: {
      short: "DTZ",
      title: "DTZ – Deutsch-Test für Zuwanderer",
      tag: "A2–B1 · Integrationskurs",
      g: "sun",
      sim: "dtz",
      lead: "Der DTZ ist die Sprachprüfung am Ende des Integrationskurses. Er zeigt, ob du Deutsch auf dem Niveau A2 oder B1 kannst.",
      parts: [
        [
          "Hören",
          "ca. 25 Min.",
          "4 Teile · 20 Aufgaben · Du hörst alle Texte einmal.",
          "zusammen mit Lesen: 45 Punkte",
        ],
        ["Lesen", "45 Min.", "5 Teile · 25 Aufgaben", "zusammen mit Hören: 45 Punkte"],
        [
          "Schreiben",
          "30 Min.",
          "1 Text. Du wählst Aufgabe A oder B.",
          "20 Punkte",
        ],
        [
          "Sprechen",
          "ca. 16 Min.",
          "Zu zweit, 2 Prüfende, keine Vorbereitungszeit: Teil 1 Über sich sprechen (ca. 4 Min.), Teil 2 Über Erfahrungen sprechen mit Bild (ca. 6 Min.), Teil 3 Gemeinsam etwas planen (ca. 6 Min.). In Teil 1 und 2 stellen die Prüfenden Nachfragen.",
          "100 Punkte",
        ],
      ],
      partsSrc: ["uebDtz", "gastFaq", "gastBlick", "gastUeb"],
      blocks: [
        {
          h: "Was ist der DTZ? Wer braucht ihn?",
          list: [
            "Der DTZ ist der Abschlusstest für Deutsch im Integrationskurs.",
            "Die Prüfung macht seit Januar 2023 g.a.s.t. Du machst sie bei einer Prüfstelle. Das sind Kursträger, die das BAMF zugelassen hat.",
            "Für das „Zertifikat Integrationskurs“ brauchst du zwei Dinge: im DTZ das Gesamtergebnis B1 und den bestandenen Test „Leben in Deutschland“.",
          ],
          src: ["gastDtz", "bamfAbschluss"],
        },
        {
          h: "Ergebnis: A2 oder B1",
          list: [
            "Es gibt drei Ergebnisse: Hören und Lesen zusammen, Schreiben, Sprechen.",
            "B1 in Hören/Lesen: 33–45 Punkte. A2: 20–32 Punkte.",
            "B1 im Schreiben: 15–20 Punkte. A2: 7–14 Punkte.",
            "B1 im Sprechen: 75–100 Punkte. A2: 35–74,5 Punkte.",
            "Gesamtergebnis B1: Du brauchst B1 im Sprechen und B1 in einem schriftlichen Teil (Hören/Lesen oder Schreiben). Im anderen Teil brauchst du mindestens A2.",
            "Unter A2 bekommst du kein Zertifikat. Du bekommst nur einen Ergebnisbogen.",
          ],
          src: ["gastFaq"],
        },
        {
          h: "Neu seit 1. November 2026",
          list: [
            "Früher reichte für B1: Sprechen B1 und ein schriftlicher Teil B1. Der dritte Teil war egal.",
            "Jetzt muss auch der dritte Teil mindestens A2 sein. Ein leeres Blatt beim Schreiben reicht also nicht mehr.",
            "Die Änderung steht in der Integrationskurstestverordnung (§ 10 Abs. 1 IntTestV). Sie wurde am 20. Oktober 2026 im Bundesgesetzblatt veröffentlicht.",
          ],
          src: ["asyl", "gastFaq"],
          note: "Datum und Paragraf stammen aus einer Fachmeldung von asyl.net. Die Regel selbst steht auch bei g.a.s.t.",
        },
        {
          h: "Anmeldung und Termine",
          list: [
            "Im Integrationskurs meldet dich dein Kursträger an.",
            "Prüfungen gibt es alle zwei Wochen, an einem Freitag und an einem Samstag.",
            "Anmeldung: bis 21 Tage vor dem Termin.",
          ],
          src: ["gastDtz", "gastFaq"],
        },
        {
          h: "Kosten und Wiederholung",
          list: [
            "Im Integrationskurs ist der Abschlusstest kostenlos.",
            "Auf eigene Kosten kannst du den DTZ beliebig oft wiederholen.",
            "Preis für Selbstzahler: verschieden. " + ASK,
          ],
          src: ["bamfAbschluss"],
        },
        {
          h: "Am Prüfungstag",
          list: [
            "Bring deinen Ausweis mit. Er liegt bei der Prüfung auf dem Tisch.",
            "Wie lange das Ergebnis dauert: " + ASK,
          ],
          src: ["gastUeb"],
        },
        {
          h: "Wofür brauchst du das Zertifikat?",
          list: [
            "Für die Niederlassungserlaubnis und für die Einbürgerung braucht man in der Regel Deutsch B1.",
            "Das „Zertifikat Integrationskurs“ kannst du dafür als Nachweis benutzen.",
            "Mit dem DTZ kannst du auch A2 nachweisen.",
          ],
          src: ["bamfNachweis", "bamfAbschluss"],
          legal: true,
        },
      ],
    },
    lid: {
      short: "LiD",
      title: "Test „Leben in Deutschland“",
      tag: "Orientierungskurs · Einbürgerung",
      g: "mint",
      sim: "lid",
      lead: "Der Test fragt nach Politik, Geschichte und Gesellschaft in Deutschland. Die gleichen Fragen gibt es im Einbürgerungstest.",
      parts: [
        [
          "33 Fragen",
          "60 Min.",
          "Zu jeder Frage gibt es 4 Antworten. Eine ist richtig. 30 Fragen sind für ganz Deutschland, 3 Fragen sind zu deinem Bundesland.",
          "33 Punkte",
        ],
      ],
      partsSrc: ["bamfEinb", "bamfLidInfo"],
      blocks: [
        {
          h: "Was ist der Test? Wer braucht ihn?",
          list: [
            "Der Test „Leben in Deutschland“ ist der Abschlusstest im Orientierungskurs.",
            "Für die Einbürgerung macht man den Einbürgerungstest. Er ist gleich aufgebaut.",
            "Alle Fragen sind öffentlich: 300 Fragen für ganz Deutschland und 10 Fragen für jedes Bundesland.",
          ],
          src: ["bamfAbschluss", "bamfEinb", "bamfKatalog"],
        },
        {
          h: "Bestanden?",
          list: [
            "Orientierungskurs: bestanden mit mindestens 15 richtigen Antworten.",
            "Einbürgerungstest: bestanden mit mindestens 17 richtigen Antworten.",
            "Danach bekommst du vom BAMF eine Bescheinigung mit deinem Ergebnis.",
          ],
          src: ["bamfAbschluss", "bamfEinb"],
        },
        {
          h: "Anmeldung und Kosten",
          list: [
            "Im Integrationskurs meldet dich dein Kursträger an. Dort ist der Abschlusstest kostenlos.",
            "Einbürgerungstest: Du meldest dich bei einer Prüfstelle des BAMF an. Deine Einbürgerungsbehörde nennt dir Prüfstellen in deiner Nähe.",
            "Der Einbürgerungstest kostet 25 Euro.",
            "Wiederholung und Wartezeit: " + ASK,
          ],
          src: ["bamfEinb", "bamfAbschluss"],
        },
        {
          h: "Am Prüfungstag",
          list: [
            "Bring einen gültigen Ausweis mit Foto mit. Er liegt gut sichtbar auf deinem Tisch.",
            "Wie lange das Ergebnis dauert: " + ASK,
          ],
          src: ["bamfLidInfo", "bamfEinb"],
        },
        {
          h: "Wofür brauchst du das Ergebnis?",
          list: [
            "Für das „Zertifikat Integrationskurs“ brauchst du diesen Test und im DTZ das Ergebnis B1.",
            "Bei der Einbürgerung zeigt der Einbürgerungstest in der Regel, dass du die Rechts- und Gesellschaftsordnung kennst.",
          ],
          src: ["bamfAbschluss", "bamfEinb"],
          legal: true,
        },
      ],
    },
    "telc-b1": {
      short: "telc B1",
      title: "telc Deutsch B1 (Zertifikat Deutsch)",
      tag: "telc · B1 allgemein",
      g: "sky",
      sim: "telc-b1",
      lead: "Eine allgemeine Deutschprüfung auf dem Niveau B1. Du kannst sie ohne Kurs machen.",
      parts: [
        [
          "Leseverstehen und Sprachbausteine",
          "90 Min.",
          "Lesen: 3 Teile. Sprachbausteine: 2 Teile.",
          "Lesen 75 · Sprachbausteine 30",
        ],
        [
          "Hörverstehen",
          "ca. 30 Min.",
          "3 Teile: 5 + 10 + 5 Aufgaben (richtig oder falsch). Teil 1 hörst du einmal, Teil 2 und 3 zweimal.",
          "75 Punkte",
        ],
        [
          "Schriftlicher Ausdruck",
          "30 Min.",
          "1 E-Mail (persönlich oder halbformell) mit 4 Leitpunkten",
          "45 Punkte",
        ],
        [
          "Mündliche Prüfung",
          "ca. 15 Min.",
          "3 Teile zu zweit: Einander kennenlernen (ca. 3 Min.), Über ein Thema sprechen (ca. 6 Min.), Gemeinsam etwas planen (ca. 6 Min.) · vorher 20 Min. Vorbereitung",
          "75 Punkte",
        ],
      ],
      partsSrc: ["telcB1", "telcB1Ueb"],
      blocks: [
        {
          h: "Bestanden?",
          list: [
            "Insgesamt gibt es 300 Punkte.",
            "Du brauchst 60 % in der schriftlichen Prüfung (135 von 225 Punkten) und 60 % in der mündlichen Prüfung (45 von 75 Punkten).",
          ],
          src: ["telcB1Ueb"],
        },
        {
          h: "So wird der Brief bewertet",
          list: [
            "Drei Kriterien: Berücksichtigung der Leitpunkte, kommunikative Gestaltung, formale Richtigkeit.",
          ],
          src: ["telcB1Ueb"],
        },
        {
          h: "Anmeldung und Kosten",
          list: [
            "Du meldest dich bei einem telc Prüfungszentrum an.",
            "Preis und Termine: verschieden. " + ASK,
          ],
          src: ["telcB1"],
        },
        {
          h: "Ergebnis und Wiederholung",
          list: [
            "Du kannst die ganze Prüfung beliebig oft wiederholen.",
            "Nur ein Teil nicht bestanden (schriftlich oder mündlich)? Diesen Teil kannst du bis zum Ende des nächsten Kalenderjahres allein wiederholen.",
            "Auf dem Zertifikat steht kein Ablaufdatum.",
            "Wie lange das Ergebnis dauert: " + ASK,
          ],
          src: ["telcReg", "telcB1Ueb"],
        },
        {
          h: "Am Prüfungstag",
          list: ["Bring deinen Ausweis mit. Was du noch brauchst: " + ASK],
          src: ["telcReg"],
        },
        {
          h: "Wofür brauchst du das Zertifikat?",
          list: [
            "Für die Niederlassungserlaubnis und für die Einbürgerung braucht man in der Regel Deutsch B1.",
            "Welche Zertifikate die Behörde annimmt: Bitte frag vorher bei deiner Behörde.",
          ],
          src: ["bamfNachweis", "telcReg"],
          legal: true,
        },
      ],
    },
    "telc-b2": {
      short: "telc B2",
      title: "telc Deutsch B2",
      tag: "telc · B2 allgemein",
      g: "sky",
      sim: "telc-b2",
      lead: "Eine allgemeine Deutschprüfung auf dem Niveau B2. Du kannst sie ohne Kurs machen.",
      parts: [
        [
          "Leseverstehen und Sprachbausteine",
          "90 Min.",
          "Lesen: 3 Teile (5 + 5 + 10 Aufgaben). Sprachbausteine: 2 Teile (10 + 10 Aufgaben).",
          "Lesen 75 · Sprachbausteine 30",
        ],
        [
          "Hörverstehen",
          "ca. 20 Min.",
          "3 Teile: 5 + 10 + 5 Aufgaben (richtig oder falsch). Du hörst alle Texte nur einmal.",
          "75 Punkte",
        ],
        [
          "Schriftlicher Ausdruck",
          "30 Min.",
          "1 halbformelle E-Mail. Du wählst Aufgabe A oder B (zum Beispiel Bitte um Informationen oder Beschwerde).",
          "45 Punkte",
        ],
        [
          "Mündliche Prüfung",
          "ca. 15 Min.",
          "3 Teile, je ca. 5 Min.: Über Erfahrungen sprechen, Diskussion, Gemeinsam etwas planen · zu zweit (zu dritt ca. 25 Min.) · vorher 20 Min. Vorbereitung",
          "75 Punkte",
        ],
      ],
      partsSrc: ["telcB2", "telcB2Hb", "uebTelcB2"],
      blocks: [
        {
          h: "Bestanden?",
          list: [
            "Insgesamt gibt es 300 Punkte.",
            "Du brauchst 60 % in der schriftlichen Prüfung (135 von 225 Punkten) und 60 % in der mündlichen Prüfung (45 von 75 Punkten).",
          ],
          src: ["telcB2Hb"],
        },
        {
          h: "So wird das Sprechen bewertet",
          list: [
            "Vier Kriterien: Ausdrucksfähigkeit, Aufgabenbewältigung, formale Richtigkeit, Aussprache und Intonation.",
          ],
          src: ["telcB2Hb"],
        },
        {
          h: "Anmeldung und Kosten",
          list: [
            "Du meldest dich bei einem telc Prüfungszentrum an.",
            "Preis und Termine: verschieden. " + ASK,
          ],
          src: ["telcB2"],
        },
        {
          h: "Ergebnis und Wiederholung",
          list: [
            "Du kannst die ganze Prüfung beliebig oft wiederholen.",
            "Nur ein Teil nicht bestanden (schriftlich oder mündlich)? Diesen Teil kannst du allein wiederholen. Die Frist: " +
              ASK,
            "Auf dem Zertifikat steht kein Ablaufdatum.",
            "Wie lange das Ergebnis dauert: " + ASK,
          ],
          src: ["telcReg"],
        },
        {
          h: "Am Prüfungstag",
          list: ["Bring deinen Ausweis mit. Was du noch brauchst: " + ASK],
          src: ["telcReg"],
        },
        {
          h: "Wofür brauchst du das Zertifikat?",
          list: [
            "Viele Stellen verlangen B2, zum Beispiel für eine Ausbildung, einen Beruf oder die Anerkennung eines Abschlusses.",
            "Ob dein Zertifikat reicht, entscheidet die Stelle, die es verlangt. Bitte frag dort vorher.",
          ],
          src: ["telcReg"],
          legal: true,
        },
      ],
    },
    "dtb-b1": {
      short: "DTB B1",
      title: "DTB B1 – Deutsch-Test für den Beruf",
      tag: "telc · BAMF · B1 Beruf",
      g: "ink",
      sim: "dtb-b1",
      lead: "Der DTB B1 ist die Prüfung am Ende eines Berufssprachkurses B1. Es geht um Deutsch am Arbeitsplatz.",
      parts: [
        ["Lesen", "40 Min.", "4 Teile · 18 Aufgaben", "60 Punkte"],
        [
          "Lesen und Schreiben",
          "20 Min.",
          "2 Aufgaben zu einer Kunden-E-Mail, dann eine Antwort-E-Mail schreiben",
          "",
        ],
        [
          "Hören",
          "20 Min.",
          "4 Teile · 19 Aufgaben · Du hörst alle Texte nur einmal.",
          "60 Punkte",
        ],
        [
          "Hören und Schreiben",
          "5 Min.",
          "Eine Mitteilung am Telefon: 1 Aufgabe, dann eine Notiz schreiben. Du hörst die Mitteilung zweimal.",
          "",
        ],
        [
          "Sprachbausteine und Schreiben",
          "10 Min.",
          "6 Aufgaben, dann eine Kurznachricht schreiben",
          "Schreiben insgesamt: 60 Punkte",
        ],
        [
          "Sprechen",
          "ca. 16 Min.",
          "Zu zweit, keine Vorbereitungszeit: Teil 1A Über ein Thema sprechen und 1B Anschlussfragen (je ca. 2 Min. pro Person), Teil 2 Mit Kolleginnen und Kollegen sprechen (ca. 3 Min.), Teil 3 Gemeinsam etwas planen (ca. 5 Min.)",
          "60 Punkte",
        ],
      ],
      partsSrc: ["uebDtbB1", "telcDtbB1", "bamfDtbB1"],
      blocks: [
        {
          h: "Was ist der DTB? Wer macht ihn?",
          list: [
            "Der Deutsch-Test für den Beruf gehört zu den Berufssprachkursen des BAMF.",
            "Dein Kursträger meldet dich an und informiert dich über den Ablauf.",
            "Ohne Berufssprachkurs kannst du die Prüfung nicht als Selbstzahler machen.",
          ],
          src: ["bamfDtbDurch"],
        },
        {
          h: "Punkte und Bestehen",
          list: [
            "Du kannst 240 Punkte erreichen: je 60 für Lesen, Hören, Schreiben und Sprechen.",
            "Bestanden hast du mit mindestens 144 Punkten (60 Prozent).",
            "Dazu brauchst du in mindestens drei der vier Teile mehr als 36 Punkte. Ein schwächerer Teil ist möglich, wenn er zwischen 40 und 60 Prozent liegt.",
          ],
          src: ["uebDtbB1"],
        },
        {
          h: "Kosten und Wiederholung",
          list: [
            "Die Prüfung gehört zum Berufssprachkurs. Kosten: Bitte frag deinen Kursträger.",
            "Du kannst den Test nur ganz wiederholen, nicht einzelne Teile.",
            "Wie oft und wann du wiederholen kannst: Bitte frag deinen Kursträger.",
          ],
          src: ["bamfDtbDurch"],
        },
        {
          h: "Am Prüfungstag",
          list: [
            "Bring auf jeden Fall deinen Ausweis mit. Was du noch brauchst: Bitte frag deinen Kursträger.",
            "Wie lange das Ergebnis dauert: Bitte frag deinen Kursträger.",
          ],
          src: ["bamfDtbDurch"],
        },
        {
          h: "Wofür brauchst du das Zertifikat?",
          list: [
            "Das Zertifikat zeigt Arbeitgebern und Behörden dein Deutsch für den Beruf.",
            "Ob es für dein Ziel reicht, entscheidet die Stelle, die es verlangt.",
          ],
          src: ["telcDtbB1"],
          legal: true,
        },
      ],
    },
    "dtb-b2": {
      short: "DTB B2",
      title: "DTB B2 – Deutsch-Test für den Beruf",
      tag: "telc · BAMF · B2 Beruf",
      g: "ink",
      sim: "dtb-b2",
      lead: "Der DTB B2 ist die Prüfung am Ende eines Berufssprachkurses B2. Es geht um Deutsch am Arbeitsplatz.",
      parts: [
        ["Lesen", "45 Min.", "4 Teile · 18 Aufgaben", "60 Punkte"],
        [
          "Lesen und Schreiben",
          "20 Min.",
          "2 Aufgaben zu einer Beschwerde, dann eine Antwort schreiben",
          "",
        ],
        [
          "Hören",
          "20 Min.",
          "4 Teile · 19 Aufgaben · Du hörst alle Texte nur einmal.",
          "60 Punkte",
        ],
        [
          "Hören und Schreiben",
          "5 Min.",
          "Eine Mitteilung am Telefon: 1 Aufgabe, dann die Informationen notieren. Du hörst die Mitteilung einmal.",
          "",
        ],
        [
          "Sprachbausteine und Schreiben",
          "35 Min.",
          "12 Aufgaben, dann einen Forumsbeitrag schreiben (du wählst eines von zwei Themen)",
          "Schreiben insgesamt: 60 Punkte",
        ],
        [
          "Sprechen",
          "ca. 16 Min.",
          "Zu zweit, keine Vorbereitungszeit: Teil 1A Über ein Thema sprechen, 1B Prüferfragen, 1C Erläuterung eines Aspekts (zusammen ca. 4–5 Min. pro Person), Teil 2 Mit Kolleginnen und Kollegen sprechen (ca. 3 Min.), Teil 3 Lösungswege diskutieren (ca. 4–5 Min.)",
          "60 Punkte",
        ],
      ],
      partsSrc: ["uebDtbB2", "telcDtbB2", "bamfDtbB2"],
      blocks: [
        {
          h: "Was ist der DTB? Wer macht ihn?",
          list: [
            "Der Deutsch-Test für den Beruf gehört zu den Berufssprachkursen des BAMF.",
            "Dein Kursträger meldet dich an und informiert dich über den Ablauf.",
            "Ohne Berufssprachkurs kannst du die Prüfung nicht als Selbstzahler machen.",
            "Die schriftliche Prüfung dauert 125 Minuten. Du kannst nicht nur einen Teil machen.",
          ],
          src: ["bamfDtbDurch", "telcDtbB2"],
        },
        {
          h: "Punkte und Bestehen",
          list: [
            "Insgesamt gibt es 240 Punkte: je 60 für Lesen, Hören, Schreiben und Sprechen.",
            "Bestanden: mindestens 144 Punkte (60 %).",
            "Dazu kommt: In mindestens drei Fertigkeiten brauchst du 36 von 60 Punkten. Eine schwächere Fertigkeit ist erlaubt, wenn sie mindestens 24 Punkte hat.",
            "Mit 120 bis 143 Punkten steht im Ergebnis „B2 knapp nicht erfüllt“.",
          ],
          src: ["bamfDtbB2", "telcDtbHb", "bamfDtbDurch"],
        },
        {
          h: "So wird das Schreiben bewertet",
          list: [
            "Zwei Bereiche: inhaltliche Angemessenheit (Aufgabe erfüllt?) und sprachliche Angemessenheit (kommunikative Gestaltung, formale Richtigkeit, Spektrum sprachlicher Mittel). Die sprachlichen Kriterien gelten für beide Texte zusammen.",
          ],
          src: ["bamfDtbB2", "uebDtbB2"],
        },
        {
          h: "Kosten und Wiederholung",
          list: [
            "Die Prüfung gehört zum Berufssprachkurs. Kosten: Bitte frag deinen Kursträger.",
            "Du kannst den Test nur ganz wiederholen, nicht einzelne Teile.",
            "Nicht bestanden? Es gibt einen Kurs zur Prüfungsvorbereitung für Wiederholende. Bitte frag deinen Kursträger.",
          ],
          src: ["bamfDtbDurch"],
        },
        {
          h: "Am Prüfungstag",
          list: [
            "Bring auf jeden Fall deinen Ausweis mit. Was du noch brauchst: Bitte frag deinen Kursträger.",
            "Wie lange das Ergebnis dauert: Bitte frag deinen Kursträger.",
          ],
          src: ["bamfDtbDurch"],
        },
        {
          h: "Wofür brauchst du das Zertifikat?",
          list: [
            "Viele Stellen verlangen B2, zum Beispiel für eine Ausbildung, einen Beruf oder die Anerkennung eines Abschlusses.",
            "Ob dein Zertifikat reicht, entscheidet die Stelle, die es verlangt. Bitte frag dort vorher.",
          ],
          src: ["telcDtbB2"],
          legal: true,
        },
      ],
    },
  };
  const ORDER = ["dtz", "lid", "telc-b1", "telc-b2", "dtb-b1", "dtb-b2"];

  const e = (s) => DM.esc(s);
  const srcLine = (keys) =>
    `<p class="pf-src">Quelle: ${keys.map((k) => `<a href="${S[k][1]}" target="_blank" rel="noopener">${e(S[k][0])}</a>`).join(" · ")} · Stand: ${STAND}</p>`;

  function hub() {
    DM.page(
      `${DM.crumbs([["Prüfungstraining", "#pruefung"], ["Prüfungsinfos"]])}
      <div class="dm-head"><h1>Prüfungsinfos</h1><p class="dm-lead">Dauer, Punkte, Anmeldung und Kosten für sechs Prüfungen. Jede Angabe hat eine Quelle und ein Datum.</p></div>
      <div class="pf-grid">${ORDER.map((id) => {
        const x = X[id];
        return `<a class="pf-card dm-g-${x.g}" href="#pruefungsinfo/${id}"><span class="dm-tag">${e(x.tag)}</span><b>${e(x.title)}</b><span>${e(x.lead)}</span></a>`;
      }).join("")}</div>
      <section class="dm-card pf-how"><h2>So liest du diese Seiten</h2>
        <ul><li>Unter jedem Abschnitt steht die Quelle. Dort kannst du selbst nachlesen.</li>
        <li>Regeln können sich ändern. Schau auf das Datum „Stand“.</li>
        <li>Steht dort „Bitte beim Prüfungszentrum fragen“? Dann ist die Antwort überall anders – oder ich konnte sie nicht sicher prüfen.</li></ul>
        <p class="dm-small">Unabhängiges Angebot, nicht von g.a.s.t., telc oder BAMF. ${LEGAL}</p></section>
      <div class="dm-row"><a class="dm-btn" href="#simulation">Zu den Prüfungssimulationen</a><a class="dm-btn dm-btn-quiet" href="#vorbereitung">Gezielte Vorbereitung</a></div>`,
      "pf-page",
    );
  }

  function page(id) {
    const x = X[id];
    const parts = `<ul class="pf-parts">${x.parts.map(([n, t, w, p]) => `<li><b>${e(n)}</b><span class="pf-time">⏱ ${e(t)}</span>${w ? `<span>${e(w)}</span>` : ""}${p ? `<span class="pf-pts">${e(p)}</span>` : ""}</li>`).join("")}</ul>`;
    const blocks = x.blocks
      .map(
        (b) =>
          `<section class="dm-card pf-block"><h2>${e(b.h)}</h2><ul>${b.list.map((t) => `<li>${e(t)}</li>`).join("")}</ul>${b.note ? `<p class="dm-small">${e(b.note)}</p>` : ""}${b.legal ? `<p class="dm-small pf-legal">${LEGAL}</p>` : ""}${srcLine(b.src)}</section>`,
      )
      .join("");
    DM.page(
      `${DM.crumbs([["Prüfungstraining", "#pruefung"], ["Prüfungsinfos", "#pruefungsinfo"], [x.short]])}
      <div class="dm-head"><span class="dm-tag">${e(x.tag)}</span><h1>${e(x.title)}</h1><p class="dm-lead">${e(x.lead)}</p></div>
      <nav class="dm-tabs dm-tabs-small pf-tabs" aria-label="Prüfung wählen">${ORDER.map((k) => `<a href="#pruefungsinfo/${k}"${k === id ? ' aria-current="page"' : ""}><b>${e(X[k].short)}</b></a>`).join("")}</nav>
      <section class="dm-card pf-block"><h2>Die Teile der Prüfung</h2>${parts}${srcLine(x.partsSrc)}</section>
      ${blocks}
      <section class="dm-card pf-cta"><h2>Jetzt üben</h2><p>Teste dich mit der echten Zeit. Am Ende siehst du deine Punkte.</p>
        <div class="dm-row"><a class="dm-btn" href="#simulation/${x.sim}">⏱ Simulation ${e(x.short)}</a>${id === "dtz" ? '<a class="dm-btn dm-btn-quiet" href="#lernweg/dtz">Lernweg DTZ</a>' : id === "lid" ? '<a class="dm-btn dm-btn-quiet" href="#lid">Alle Fragen üben</a>' : `<a class="dm-btn dm-btn-quiet" href="#vorbereitung/${x.sim}">Gezielte Vorbereitung</a>`}</div></section>
      <p class="dm-small">Alle Angaben ohne Gewähr. Unabhängiges Angebot, nicht von g.a.s.t., telc oder BAMF. ${LEGAL}</p>`,
      "pf-page",
    );
  }

  DM.routes ||= {};
  DM.routes.pruefungsinfo = (p) => (X[p[1]] ? page(p[1]) : hub());
  window.DMFakten = { STAND, ids: ORDER, data: X, sources: S }; // data + sources: read by tools/make-learn-pages.py
})();
