/* Course plan (#kurs, #kurs/<level>) – one numbered sequence of steps per level.
   Step: { t: title, href: '#route', kind, min: minutes }.
   kind: Wörter | Lektion | Grammatik | Hören | Lesen | Sprechen | Schreiben | Spiel | Test | Aussprache | Wiederholen
   Rules: only link to routes that really exist (lesson, topic, set, game and simulation ids must match the data files).
   Every unit ends with a short review step (#fehler = mistakes notebook). Apart from #fehler, a href appears only once per level.
   Progress is stored per level in DM.store.kurs.done ("A1:#lektion/ankommen": timestamp) – changing a href resets that step. */
(function () {
  const S = (t, href, kind, min) => ({ t, href, kind, min });
  const REVIEW = () =>
    S("Wiederholen: deine Fehler ansehen", "#fehler", "Wiederholen", 5);
  const U = (title, steps) => ({ title, steps: steps.concat([REVIEW()]) });

  (window.DM || (window.DM = {})).kurs = {
    A0: {
      title: "Der Anfang",
      goal: "Du lernst die ersten Wörter, das Alphabet und die Zahlen. Am Ende sagst du: Wer bin ich?",
      units: [
        U("Hallo und Tschüss", [
          S(
            "Hallo! Begrüßen und verabschieden",
            "#erste-schritte/hallo",
            "Wörter",
            10,
          ),
          S("Das Alphabet", "#erste-schritte/alphabet", "Wörter", 10),
          S("Buchstaben und Laute sprechen", "#laute", "Aussprache", 10),
          S("Ich über mich", "#erste-schritte/ich", "Wörter", 10),
        ]),
        U("Zahlen, Farben, Tage", [
          S("Zahlen von 0 bis 100", "#erste-schritte/zahlen", "Wörter", 15),
          S("Farben", "#erste-schritte/farben", "Wörter", 10),
          S("Tage und Tageszeiten", "#erste-schritte/zeit", "Wörter", 10),
        ]),
        U("Im Deutschkurs", [
          S(
            "Im Deutschkurs: Dinge im Kursraum",
            "#erste-schritte/kurs",
            "Wörter",
            10,
          ),
          S(
            "Wichtige Sätze im Kurs",
            "#erste-schritte/kurssaetze",
            "Wörter",
            10,
          ),
          S("Meine Familie", "#erste-schritte/familie", "Wörter", 10),
        ]),
        U("Essen und der erste Dialog", [
          S("Essen und Trinken", "#erste-schritte/essen", "Wörter", 10),
          S("Wort-Memory: Bild und Wort", "#spiele/memory", "Spiel", 10),
          S(
            "Deine erste Lektion: Hallo, das bin ich.",
            "#lektion/ankommen",
            "Lektion",
            20,
          ),
          S("Wörter zur Lektion 1", "#wortschatz/ankommen/0", "Wörter", 10),
          S(
            "Sprechen: Ich stelle mich vor",
            "#ueben/sprechen/A1/0",
            "Sprechen",
            10,
          ),
        ]),
      ],
    },

    A1: {
      title: "Erste Sätze",
      goal: "Du sprichst über dich, kaufst ein, machst Termine und verstehst kurze Texte.",
      units: [
        U("Ich stelle mich vor", [
          S(
            "Lektion 1: Hallo, das bin ich.",
            "#lektion/ankommen",
            "Lektion",
            20,
          ),
          S("Verben im Präsens", "#grammatik/a1-praesens", "Grammatik", 10),
          S("haben und sein", "#grammatik/a1-haben-sein", "Grammatik", 10),
          S(
            "Sprechen: Hallo, das bin ich",
            "#ueben/sprechen/A1/0",
            "Sprechen",
            10,
          ),
        ]),
        U("Einkaufen", [
          S(
            "Lektion 2: Einmal Brot, bitte.",
            "#lektion/einkaufen",
            "Lektion",
            20,
          ),
          S("Der Plural", "#grammatik/a1-plural", "Grammatik", 10),
          S(
            "Zahlen-Ohr: Preise und Uhrzeiten hören",
            "#spiele/zahlen",
            "Spiel",
            10,
          ),
          S("Kleidung", "#erste-schritte/kleidung", "Wörter", 10),
        ]),
        U("Zeit und Termine", [
          S("Die Uhrzeit", "#erste-schritte/uhrzeit", "Wörter", 10),
          S(
            "Lektion 3: Zeit für einen Termin.",
            "#lektion/termine",
            "Lektion",
            20,
          ),
          S(
            "Trennbare Verben",
            "#grammatik/a1-trennbare-verben",
            "Grammatik",
            10,
          ),
          S("Wetter und Jahreszeiten", "#erste-schritte/wetter", "Wörter", 10),
          S("Hören A1: kurze Texte", "#hoeren/a1", "Hören", 15),
        ]),
        U("Wohnen und Stadt", [
          S("Möbel und Wohnung", "#erste-schritte/moebel", "Wörter", 10),
          S("Lektion 4: Hier wohne ich.", "#lektion/wohnen", "Lektion", 20),
          S(
            "Wo? in, an, auf, neben …",
            "#grammatik/a1-lokale-praepositionen",
            "Grammatik",
            10,
          ),
          S("In der Stadt", "#erste-schritte/stadt", "Wörter", 10),
          S(
            "Unterwegs: Verkehrsmittel",
            "#erste-schritte/verkehr",
            "Wörter",
            10,
          ),
          S(
            "Sprechen: Eine Fahrkarte kaufen",
            "#ueben/sprechen/A1/4",
            "Sprechen",
            10,
          ),
        ]),
        U("Familie und Gesundheit", [
          S(
            "Lektion 5: Das ist meine Familie.",
            "#lektion/familie",
            "Lektion",
            20,
          ),
          S("Sprechen: Meine Familie", "#ueben/sprechen/A1/3", "Sprechen", 10),
          S("Der Körper", "#erste-schritte/koerper", "Wörter", 10),
          S(
            "Modalverben: können, müssen, möchten",
            "#grammatik/a1-modalverben",
            "Grammatik",
            10,
          ),
          S(
            "Schreiben: Ich bin krank",
            "#ueben/schreiben/A1/2",
            "Schreiben",
            15,
          ),
        ]),
        U("Freizeit und Beruf", [
          S(
            "Lektion 6: Was machst du gern?",
            "#lektion/freizeit",
            "Lektion",
            20,
          ),
          S("Berufe", "#erste-schritte/berufe", "Wörter", 10),
          S(
            "Der Imperativ: Komm! Kommen Sie!",
            "#grammatik/a1-imperativ",
            "Grammatik",
            10,
          ),
          S(
            "Sätze verbinden: und, aber, oder, denn",
            "#grammatik/a1-konnektoren",
            "Grammatik",
            10,
          ),
          S("Lesen A1: kurze Texte", "#lesen/a1", "Lesen", 15),
        ]),
      ],
    },

    A2: {
      title: "Alltag meistern",
      goal: "Du erzählst von gestern, sprichst beim Arzt und auf dem Amt und schreibst kurze Nachrichten.",
      units: [
        U("Gestern und heute", [
          S("Lektion 1: Was war gestern?", "#lektion/alltag", "Lektion", 20),
          S(
            "Präteritum: war und hatte",
            "#grammatik/a2-praeteritum-war-hatte",
            "Grammatik",
            10,
          ),
          S("Verb-Rennen: Perfekt üben", "#spiele/verben", "Spiel", 10),
          S(
            "Sprechen: Ein Treffen im Park",
            "#ueben/sprechen/A2/1",
            "Sprechen",
            10,
          ),
        ]),
        U("Gesundheit und Termine", [
          S("Lektion 2: Gute Besserung!", "#lektion/gesundheit", "Lektion", 20),
          S(
            "Nebensätze mit dass und wenn",
            "#grammatik/a2-dass-wenn",
            "Grammatik",
            10,
          ),
          S(
            "Sprechen: Einen Termin verschieben",
            "#ueben/sprechen/A2/0",
            "Sprechen",
            10,
          ),
          S(
            "Dialog-Simulator: Telefonieren im Alltag",
            "#spiele/dialog",
            "Spiel",
            10,
          ),
          S("Hören im Alltag", "#hoeren/alltag", "Hören", 15),
        ]),
        U("Unterwegs in der Stadt", [
          S(
            "Lektion 3: Unterwegs in der Stadt.",
            "#lektion/unterwegs",
            "Lektion",
            20,
          ),
          S(
            "Präpositionen mit Dativ und Akkusativ",
            "#grammatik/a2-praepositionen-dativ-akkusativ",
            "Grammatik",
            10,
          ),
          S(
            "Wo oder wohin? Das Zimmer aufräumen",
            "#spiele/wowohin",
            "Spiel",
            10,
          ),
          S(
            "Vergleichen: größer, am größten",
            "#grammatik/a2-komparativ",
            "Grammatik",
            10,
          ),
          S("Lesen im Alltag", "#lesen/alltag", "Lesen", 15),
        ]),
        U("Schule, Kita und Nachrichten", [
          S(
            "Lektion 4: Eine Nachricht an die Schule.",
            "#lektion/schule",
            "Lektion",
            20,
          ),
          S(
            "Reflexive Verben: sich freuen, sich anmelden",
            "#grammatik/a2-reflexive-verben",
            "Grammatik",
            10,
          ),
          S(
            "Schreib-Bausteine: Anrede und Gruß",
            "#schreiben/bausteine",
            "Schreiben",
            10,
          ),
          S(
            "Schreiben: Nachricht an die Kita",
            "#ueben/schreiben/A2/4",
            "Schreiben",
            15,
          ),
          S(
            "Schreiben: Die Heizung ist kaputt",
            "#ueben/schreiben/A2/2",
            "Schreiben",
            15,
          ),
        ]),
        U("Amt und Feste", [
          S("Lektion 5: Auf dem Amt.", "#lektion/amt", "Lektion", 20),
          S(
            "Formular-Profi: Formulare verstehen",
            "#spiele/alltag-formular",
            "Spiel",
            10,
          ),
          S(
            "Lektion 6: Herzlichen Glückwunsch!",
            "#lektion/feste",
            "Lektion",
            20,
          ),
          S(
            "Adjektivendungen",
            "#grammatik/a2-adjektivendungen",
            "Grammatik",
            10,
          ),
          S(
            "Schreiben: Eine Einladung absagen",
            "#ueben/schreiben/A2/3",
            "Schreiben",
            15,
          ),
        ]),
        U("Fit für die Prüfung DTZ", [
          S("Sprechen: Ein Bild beschreiben", "#bild", "Sprechen", 15),
          S("DTZ Hören: Übungssatz 1", "#hoeren/dtz-1", "Hören", 20),
          S(
            "DTZ Schreiben: Einen Brief schreiben",
            "#training/dtz-schreiben",
            "Schreiben",
            30,
          ),
          S("Probeprüfung DTZ", "#simulation/dtz", "Test", 120),
        ]),
      ],
    },

    B1: {
      title: "Sicher ausdrücken",
      goal: "Du sagst deine Meinung, reklamierst, planst mit anderen und bereitest dich auf die Prüfung vor.",
      units: [
        U("Reklamieren und sich beschweren", [
          S(
            "Lektion 1: Das möchte ich reklamieren.",
            "#lektion/reklamation",
            "Lektion",
            25,
          ),
          S(
            "Konjunktiv II: hätte, wäre, würde",
            "#grammatik/b1-konjunktiv2",
            "Grammatik",
            15,
          ),
          S(
            "Sprechen: Eine Lieferung reklamieren",
            "#ueben/sprechen/B1/1",
            "Sprechen",
            10,
          ),
          S(
            "Schreiben: Zu laut im Haus",
            "#ueben/schreiben/B1/2",
            "Schreiben",
            20,
          ),
        ]),
        U("Meinung sagen", [
          S("Lektion 2: Ich sehe das so.", "#lektion/meinung", "Lektion", 25),
          S("Präteritum", "#grammatik/b1-praeteritum", "Grammatik", 15),
          S(
            "Lektion: Was tragen die Menschen?",
            "#lektion/kleidung",
            "Lektion",
            25,
          ),
          S("telc B1 Hören: Übungssatz 1", "#hoeren/telcb1-1", "Hören", 20),
        ]),
        U("Arbeit finden", [
          S("Lektion 3: Eine Stelle finden.", "#lektion/arbeit", "Lektion", 25),
          S("Das Passiv", "#grammatik/b1-passiv", "Grammatik", 15),
          S(
            "Sprechen: Bei der Berufsberatung",
            "#ueben/sprechen/B1/4",
            "Sprechen",
            10,
          ),
          S("Telefon-Profi Beruf", "#spiele/b1-telefon", "Spiel", 10),
          S("DTB B1 Hören: Übungssatz 1", "#hoeren/dtbb1-1", "Hören", 20),
        ]),
        U("Gemeinsam planen", [
          S("Lektion 4: Zusammen geht mehr.", "#lektion/planen", "Lektion", 25),
          S(
            "Sprechen: Ein gemeinsames Essen planen",
            "#ueben/sprechen/B1/0",
            "Sprechen",
            10,
          ),
          S("Der Genitiv", "#grammatik/b1-genitiv", "Grammatik", 15),
          S(
            "Schreiben: E-Mail an die Volkshochschule",
            "#ueben/schreiben/B1/5",
            "Schreiben",
            20,
          ),
          S("Lesen im Alltag", "#lesen/alltag", "Lesen", 20),
        ]),
        U("Prüfungstraining", [
          S(
            "DTZ Sprechen: Gemeinsam etwas planen",
            "#training/dtz-sprechen",
            "Sprechen",
            15,
          ),
          S(
            "DTZ Lesen: Eine Mitteilung verstehen",
            "#training/dtz-lesen",
            "Lesen",
            15,
          ),
          S("DTZ Hören: Übungssatz 2", "#hoeren/dtz-2", "Hören", 20),
          S(
            "telc B1: Vorbereitung auf alle Teile",
            "#vorbereitung/telc-b1",
            "Test",
            30,
          ),
        ]),
        U("Probeprüfung: Wähle deine Prüfung", [
          S("Probeprüfung DTZ", "#simulation/dtz", "Test", 120),
          S("Probeprüfung telc B1", "#simulation/telc-b1", "Test", 180),
          S("Probeprüfung DTB B1 (Beruf)", "#simulation/dtb-b1", "Test", 120),
        ]),
      ],
    },

    B2: {
      title: "Deutsch im Beruf",
      goal: "Du schreibst formelle E-Mails, diskutierst im Team und löst Probleme im Beruf.",
      units: [
        U("Beruflich weiterkommen", [
          S(
            "Lektion 1: Beruflich weiterkommen.",
            "#lektion/bewerbung-b2",
            "Lektion",
            30,
          ),
          S(
            "Nominalisierung",
            "#grammatik/b2-nominalisierung",
            "Grammatik",
            15,
          ),
          S("Nominalstil-Leiter", "#spiele/b2-nominal", "Spiel", 10),
          S(
            "Schreiben: Eine Weiterbildung beantragen",
            "#ueben/schreiben/B2/2",
            "Schreiben",
            25,
          ),
        ]),
        U("Professionell reagieren", [
          S(
            "Lektion 2: Professionell reagieren.",
            "#lektion/beschwerde-b2",
            "Lektion",
            30,
          ),
          S(
            "Passiv mit Modalverb",
            "#grammatik/b2-passiv-modalverb",
            "Grammatik",
            15,
          ),
          S(
            "Sprechen: Auf eine Kundenbeschwerde reagieren",
            "#ueben/sprechen/B2/1",
            "Sprechen",
            15,
          ),
          S("Formell oder locker?", "#spiele/b1-stil", "Spiel", 10),
          S("DTB B2 Hören: Übungssatz 1", "#hoeren/b2-1", "Hören", 20),
        ]),
        U("Im Betrieb mitreden", [
          S(
            "Lektion 3: Im Betrieb mitreden.",
            "#lektion/forum-b2",
            "Lektion",
            30,
          ),
          S("Indirekte Rede", "#grammatik/b2-indirekte-rede", "Grammatik", 15),
          S(
            "Schreiben: Forumsbeitrag – Homeoffice für alle?",
            "#ueben/schreiben/B2/3",
            "Schreiben",
            25,
          ),
          S("Redemittel-Radar", "#spiele/b2-redemittel", "Spiel", 10),
          S("Lesen im Beruf", "#lesen/beruf", "Lesen", 20),
        ]),
        U("Probleme lösen", [
          S(
            "Lektion 4: Ein Problem. Ein Plan.",
            "#lektion/loesungen-b2",
            "Lektion",
            30,
          ),
          S(
            "Partizipialattribute",
            "#grammatik/b2-partizipialattribute",
            "Grammatik",
            15,
          ),
          S(
            "Sprechen: Eine Übergabe verbessern",
            "#ueben/sprechen/B2/0",
            "Sprechen",
            15,
          ),
          S("Konnektoren-Kette", "#spiele/b2-konnektor", "Spiel", 10),
          S("Hören im Beruf", "#hoeren/beruf", "Hören", 20),
        ]),
        U("Probeprüfung: Wähle deine Prüfung", [
          S(
            "telc B2: Vorbereitung auf alle Teile",
            "#vorbereitung/telc-b2",
            "Test",
            30,
          ),
          S(
            "DTB B2: Vorbereitung auf alle Teile",
            "#vorbereitung/dtb-b2",
            "Test",
            30,
          ),
          S("Probeprüfung telc B2", "#simulation/telc-b2", "Test", 180),
          S("Probeprüfung DTB B2 (Beruf)", "#simulation/dtb-b2", "Test", 150),
        ]),
      ],
    },
  };
})();
