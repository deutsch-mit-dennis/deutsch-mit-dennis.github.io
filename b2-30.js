/* B2 in 30 Tagen (#b2-30-tage, #b2-30-tage/telc, #b2-30-tage/dtb): one fixed day-by-day plan per B2 exam
   (telc Deutsch B2 or DTB B2) that only links existing pages, PDFs and the model exams. Loaded by lazy.js.
   Exam choice: localStorage "dmd.b2fmt" (shared with the B2 level page in erste-schritte.js; "all" = not chosen yet).
   Progress lives only on the device, separately per exam:
   DM.store.b2_30 = { telc: { start: "YYYY-MM-DD", done: { "1": timestamp } }, dtb: { ... } } (saved with DM.save).
   Styles: dtz30.css (shared .d30-* classes) + erste-schritte.css (.es-fmt switch).
   To change a plan, edit PLANS below (task = [label, "#route" or "material/…pdf", minutes]). */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});
  const AB = "material/arbeitsblaetter/";

  // [title, tasks, tip] – tasks: [label, href, minutes]
  const PLANS = {
    telc: {
      name: "telc Deutsch B2",
      tab: "telcb2",
      prep: "#vorbereitung/telc-b2",
      lead: "Dein Lernplan für telc Deutsch B2: meistens 30 bis 60 Minuten am Tag. In Woche 1 machst du eine Probeprüfung Teil für Teil, am Ende eine komplette Generalprobe mit Uhr.",
      weeks: [["Woche 1", "Die Prüfung kennenlernen und Einstiegstest Teil für Teil"], ["Woche 2", "Leseverstehen, Sprachbausteine und Grammatik"], ["Woche 3", "Hörverstehen und Schriftlicher Ausdruck"], ["Woche 4", "Mündliche Prüfung und Wortschatz"], ["Tag 29–30", "Generalprobe mit Uhr und Auswertung"]],
      days: [
        // Woche 1
        ["Die Prüfung kennenlernen", [["Aufbau und Strategien: telc Deutsch B2", "#vorbereitung/telc-b2", 20], ["Prüfungsinfos: Dauer, Punkte, Bestehen", "#pruefungsinfo/telc-b2", 10], ["Lernweg „Ich mache die telc-Prüfung B2“", "#lernweg/telcb2", 5]], "Zum Bestehen brauchst du schriftlich und mündlich jeweils mindestens 60 Prozent. Schreib dein Prüfungsdatum auf einen Zettel."],
        ["Einstiegstest: Lesen und Sprachbausteine", [["Probeprüfung 1: nur „Leseverstehen und Sprachbausteine“ starten (mit Uhr)", "#simulation/telc-b2", 90]], "Heute ist ein langer Tag: In der Prüfung hast du 90 Minuten für Lesen und Sprachbausteine. Mach den Test ohne Wörterbuch – so siehst du, wo du stehst."],
        ["Einstiegstest: Hörverstehen", [["Probeprüfung 1: nur „Hörverstehen“ starten (mit Uhr)", "#simulation/telc-b2", 20], ["Strategien für das Hörverstehen", "#vorbereitung/telc-b2", 15]], "Im telc B2 hörst du jeden Text nur einmal. Nutze die Lesezeit und markiere die wichtigsten Wörter in den Aussagen."],
        ["Einstiegstest: Schriftlicher Ausdruck", [["Probeprüfung 1: nur „Schriftlicher Ausdruck“ starten (30 Min.)", "#simulation/telc-b2", 30], ["Schreib-Bausteine: Anrede, Einleitung, Schluss", "#schreiben/bausteine", 10]], "Mindestens 150 Wörter, mit Betreff, Anrede, Einleitung und Schluss. Zähl am Ende kurz nach."],
        ["Einstiegstest: Mündliche Prüfung", [["Probeprüfung 1: nur „Mündliche Prüfung“ (20 Min. Vorbereitung + 15 Min.)", "#simulation/telc-b2", 35], ["Arbeitsblatt: Mündliche Prüfung telc B2 (PDF)", AB + "telc-b2-muendliche-pruefung.pdf", 15]], "Nimm dich mit dem Handy auf. Beim Anhören merkst du schnell, wo dir Wörter fehlen."],
        ["Einstiegstest auswerten", [["Meine Fehler wiederholen", "#fehler", 20], ["Typische Fehler und Lernplan auf der Vorbereitungsseite", "#vorbereitung/telc-b2", 15]], "Welcher Teil hatte die wenigsten Punkte? Diesen Teil übst du in den nächsten Wochen besonders oft."],
        ["Wortschatz für den Beruf", [["Lektion: Beruflich weiterkommen", "#lektion/bewerbung-b2", 25], ["Wortkarten: Beruflich weiterkommen", "#wortschatz/bewerbung-b2/0", 15]], "Eine Woche geschafft! Zehn neue Wörter am Tag reichen – aber jeden Tag."],
        // Woche 2
        ["Leseverstehen 1: Überschriften", [["Arbeitsblatt: telc B2 Leseverstehen (PDF)", AB + "telc-b2-leseverstehen.pdf", 30], ["Lesen im Beruf: Artikel", "#lesen/beruf/2", 15]], "Lies bei jedem Text zuerst den ersten und den letzten Satz. Dort steht oft das Thema."],
        ["Leseverstehen 2: Detailverstehen", [["Arbeitsblatt: Leseverstehen Teil 2 – zwei Zeitungsartikel (PDF)", AB + "telc-b2-lesen-teil-2-zwei-artikel.pdf", 35], ["Lesen im Beruf: Forumsbeitrag", "#lesen/beruf/5", 10]], "Achte auf kleine Wörter wie nicht, kaum, nur oder fast – sie ändern die Bedeutung."],
        ["Leseverstehen 3: Anzeigen", [["Lesen im Beruf: Stellenanzeige", "#lesen/beruf/4", 15], ["Lesen im Beruf: zweite Stellenanzeige", "#lesen/beruf/9", 15], ["Strategie für Leseverstehen 3", "#vorbereitung/telc-b2", 10]], "Manchmal passt keine Anzeige zu einer Situation. Wähle nur, wenn wirklich alles passt."],
        ["Grammatik: Passiv", [["Grammatik: Passiv mit Modalverb und Passiversatz", "#grammatik/b2-passiv-modalverb", 20], ["Arbeitsblatt: Passiv und Passiversatz (PDF)", AB + "passiv-und-passiversatz.pdf", 20]], "Passiv kommt in Artikeln und Mitteilungen oft vor: Es wird geplant, dass …"],
        ["Sprachbausteine 1: Grammatik im Text", [["Arbeitsblatt: telc B2 Sprachbausteine (PDF)", AB + "telc-b2-sprachbausteine.pdf", 30], ["Spiel: Konnektoren-Kette", "#spiele/b2-konnektor", 10]], "Lies den ganzen Satz bis zum Ende. Oft entscheidet das Verb am Satzende, welche Lösung passt."],
        ["Sprachbausteine 2: Wortschatz", [["Spiel: Nomen-Verb-Profi", "#spiele/b2-nvv", 10], ["Arbeitsblatt: Nomen-Verb-Verbindungen (PDF)", AB + "nomen-verb-verbindungen-beruf-und-behoerden.pdf", 20], ["Spiel: Präpositionen-Blitz", "#spiele/b2-praep", 10]], "In Sprachbausteine 2 passt jedes Wort nur einmal. Streich benutzte Wörter durch."],
        ["Grammatik: Nominalstil", [["Grammatik: Nominalisierung", "#grammatik/b2-nominalisierung", 20], ["Grammatik: Partizipialattribute", "#grammatik/b2-partizipialattribute", 15], ["Arbeitsblatt: Zweiteilige Konnektoren (PDF)", AB + "zweiteilige-konnektoren.pdf", 15]], "Wiederhole heute auch die Fehler aus Woche 2. Was du zweimal falsch machst, kommt auf deine Lernkarte."],
        // Woche 3
        ["Hörverstehen 1: Nachrichten", [["Arbeitsblatt: Hörverstehen Teil 1 – Nachrichtensendung (PDF)", AB + "telc-b2-hoeren-teil-1-nachrichten.pdf", 30], ["Hören im Beruf", "#hoeren/beruf", 15]], "Bei Nachrichten zählt das Thema jeder Meldung. Details sind hier weniger wichtig."],
        ["Hörverstehen 2 und 3", [["Arbeitsblatt: telc B2 Hörverstehen (PDF)", AB + "telc-b2-hoerverstehen.pdf", 30], ["Extra-Hörtraining B2: Übungssatz 1", "#hoeren/b2-1", 20]], "Teil 2 ist ein Interview mit zehn Aussagen. Markiere in der Lesezeit in jeder Aussage ein Schlüsselwort."],
        ["Hören und indirekte Rede", [["Extra-Hörtraining B2: Übungssatz 2", "#hoeren/b2-2", 25], ["Grammatik: Indirekte Rede", "#grammatik/b2-indirekte-rede", 20]], "In Nachrichten und Interviews hörst du oft indirekte Rede: Der Minister sagt, er habe …"],
        ["Die E-Mail: Aufbau", [["Arbeitsblatt: Schriftlicher Ausdruck – E-Mail mit Leitpunkten (PDF)", AB + "telc-b2-schriftlicher-ausdruck.pdf", 30], ["Schreib-Bausteine", "#schreiben/bausteine", 10]], "Bearbeite drei von vier Leitpunkten – oder zwei Leitpunkte und einen eigenen Aspekt."],
        ["E-Mail: Bitte um Information", [["Schreiben B2: Eine Weiterbildung beantragen", "#ueben/schreiben/B2/2", 30], ["Spiel: Formell oder locker?", "#spiele/b1-stil", 10]], "Teile die 30 Minuten ein: 5 planen, 20 schreiben, 5 kontrollieren."],
        ["E-Mail: Beschwerde", [["Schreiben B2: Auf eine Kundenbeschwerde reagieren", "#ueben/schreiben/B2/1", 30], ["Lektion: Professionell reagieren", "#lektion/beschwerde-b2", 20]], "Auch bei einer Beschwerde bleibst du höflich: Leider musste ich feststellen, dass …"],
        ["Meinung schreiben", [["Schreiben B2: Forumsbeitrag „Homeoffice für alle?“", "#ueben/schreiben/B2/3", 30], ["Arbeitsblatt: Meinung äußern und argumentieren (PDF)", AB + "meinung-und-argumentieren-b2.pdf", 15]], "Drei Wochen geschafft! Sammle fünf Redemittel für deine Meinung – du brauchst sie auch in der mündlichen Prüfung."],
        // Woche 4
        ["Mündlich 1: Über Erfahrungen sprechen", [["Arbeitsblatt: 7 Themen für Teil 1 (PDF)", AB + "telc-b2-muendlich-themen.pdf", 30], ["Sprechen B2: Eine Übergabe verbessern", "#ueben/sprechen/B2/0", 15]], "Du sprichst höchstens anderthalb Minuten. Übe mit Stoppuhr und bereite zu jedem Thema ein Beispiel aus deinem Leben vor."],
        ["Mündlich 2: Diskussion", [["Spiel: Redemittel-Radar", "#spiele/b2-redemittel", 10], ["Sprechen B2: Homeoffice für alle? – Meinung sagen", "#ueben/sprechen/B2/3", 20], ["Arbeitsblatt: Textwiedergabe für Teil 2 (PDF)", AB + "telc-b2-muendlich-themen.pdf", 15]], "Gib den Text zuerst kurz wieder – höchstens eine Minute. Dann sagst du deine Meinung und reagierst auf deinen Partner."],
        ["Mündlich 3: Gemeinsam etwas planen", [["Probeprüfung 1: „Nur einen Teil üben“ → Teil 3", "#simulation/telc-b2", 15], ["Sprechen B2: Eine Weiterbildung beantragen", "#ueben/sprechen/B2/2", 15], ["Lektion: Ein Problem. Ein Plan.", "#lektion/loesungen-b2", 20]], "Mach Vorschläge und reagiere: Gute Idee, und außerdem … / Ich sehe das etwas anders, weil …"],
        ["Wortschatz: Beschwerde und Betrieb", [["Wortkarten: Professionell reagieren", "#wortschatz/beschwerde-b2/0", 15], ["Wortkarten: Im Betrieb mitreden", "#wortschatz/forum-b2/0", 15], ["Spiel: Nominalstil-Leiter", "#spiele/b2-nominal", 10]], "Lern Wörter immer mit Artikel und Beispielsatz – dann helfen sie dir auch in den Sprachbausteinen."],
        ["Wortschatz: Diskutieren und Lösungen finden", [["Lektion: Im Betrieb mitreden", "#lektion/forum-b2", 25], ["Wortkarten: Ein Problem. Ein Plan.", "#wortschatz/loesungen-b2/0", 15]], "Sprich die neuen Wörter laut. Was du sagen kannst, fällt dir in der Prüfung leichter ein."],
        ["Mündliche Prüfung noch einmal", [["Probeprüfung 1 mündlich – mit Uhr", "#simulation/telc-b2/muendlich", 35], ["Spiel: Präpositionen-Blitz", "#spiele/b2-praep", 10]], "Vergleiche mit deiner Aufnahme aus Woche 1: Was klingt schon sicherer?"],
        ["Schwächen trainieren", [["Meine Fehler wiederholen", "#fehler", 20], ["Mini-Übungen auf der Vorbereitungsseite", "#vorbereitung/telc-b2", 20]], "Übe heute nur deinen schwächsten Teil. Morgen kommt die Generalprobe."],
        // Generalprobe
        ["Generalprobe: schriftlich", [["Probeprüfung 2 schriftlich – mit Uhr (140 Min.)", "#simulation/telc-b2-2/schriftlich", 140]], "Mach die Probe wie echt: Handy weg, Uhr an. Plane dir einen freien Vormittag dafür ein."],
        ["Generalprobe: mündlich und Auswertung", [["Probeprüfung 2 mündlich – mit Uhr", "#simulation/telc-b2-2/muendlich", 35], ["Ergebnis auswerten: Meine Fehler", "#fehler", 15], ["Ablauf am Prüfungstag noch einmal lesen", "#pruefungsinfo/telc-b2", 10]], "Ab jetzt nur noch leicht wiederholen. Lies in deiner Einladung, was du mitbringen musst. Viel Erfolg!"],
      ],
    },
    dtb: {
      name: "DTB B2",
      tab: "dtbb2",
      prep: "#vorbereitung/dtb-b2",
      lead: "Dein Lernplan für den Deutsch-Test für den Beruf B2: meistens 30 bis 60 Minuten am Tag. In Woche 1 machst du eine Probeprüfung Teil für Teil, am Ende eine komplette Generalprobe mit Uhr.",
      weeks: [["Woche 1", "Die Prüfung kennenlernen und Einstiegstest Teil für Teil"], ["Woche 2", "Lesen, Sprachbausteine und Grammatik"], ["Woche 3", "Hören und Schreiben"], ["Woche 4", "Sprechen und Wortschatz"], ["Tag 29–30", "Generalprobe mit Uhr und Auswertung"]],
      days: [
        // Woche 1
        ["Die Prüfung kennenlernen", [["Aufbau und Strategien: DTB B2", "#vorbereitung/dtb-b2", 20], ["Prüfungsinfos: Dauer, Punkte, Bestehen", "#pruefungsinfo/dtb-b2", 10], ["Lernweg „Ich mache den DTB B2“", "#lernweg/dtbb2", 5]], "Lesen, Hören, Schreiben und Sprechen zählen gleich viel – je 60 Punkte. Schreib dein Prüfungsdatum auf einen Zettel."],
        ["Einstiegstest: Lesen", [["Probeprüfung 1: nur „Lesen“ starten (45 Min.)", "#simulation/dtb-b2", 45]], "Mach den Test ohne Wörterbuch. So siehst du ehrlich, wo du stehst."],
        ["Einstiegstest: Schreiben", [["Probeprüfung 1: nur „Lesen und Schreiben“ starten (20 Min.)", "#simulation/dtb-b2", 20], ["Probeprüfung 1: nur „Sprachbausteine und Schreiben“ starten (35 Min.)", "#simulation/dtb-b2", 35]], "In der Antwort an den Kunden musst du alle Punkte der internen Anweisung umsetzen. Hake sie ab."],
        ["Einstiegstest: Hören", [["Probeprüfung 1: nur „Hören“ starten (20 Min.)", "#simulation/dtb-b2", 20], ["Probeprüfung 1: nur „Hören und Schreiben“ starten (5 Min.)", "#simulation/dtb-b2", 5], ["Strategien für das Hören", "#vorbereitung/dtb-b2", 10]], "Im DTB B2 hörst du jeden Text nur einmal. Lies die Aufgaben vorher genau."],
        ["Einstiegstest: Sprechen", [["Probeprüfung 1: nur „Sprechen“ starten (16 Min.)", "#simulation/dtb-b2", 16], ["Arbeitsblatt: DTB B2 Sprechen (PDF)", AB + "dtb-b2-sprechen.pdf", 20]], "In der mündlichen Prüfung gibt es keine Vorbereitungszeit. Übe, sofort mit einem ersten Satz anzufangen."],
        ["Einstiegstest auswerten", [["Meine Fehler wiederholen", "#fehler", 20], ["Typische Fehler und Lernplan auf der Vorbereitungsseite", "#vorbereitung/dtb-b2", 15]], "Welche Fertigkeit war am schwächsten? Eine darf zwischen 40 und 60 Prozent liegen – die anderen drei müssen über 60 Prozent sein."],
        ["Wortschatz für den Beruf", [["Lektion: Beruflich weiterkommen", "#lektion/bewerbung-b2", 25], ["Wortkarten: Beruflich weiterkommen", "#wortschatz/bewerbung-b2/0", 15]], "Eine Woche geschafft! Zehn neue Wörter am Tag reichen – aber jeden Tag."],
        // Woche 2
        ["Lesen 1: Informationen zum Arbeitsmarkt", [["Arbeitsblatt: Lesen Teil 1 – Kurzmeldungen aus der Wirtschaft (PDF)", AB + "dtb-b2-lesen-teil-1-wirtschaft.pdf", 30], ["Lesen im Beruf: Stellenanzeige", "#lesen/beruf/4", 10]], "Fünf Personen, acht Texte: Drei Texte bleiben übrig. Lies zuerst genau, was jede Person sucht."],
        ["Lesen 2 und 3: Anweisungen und Arbeitsbedingungen", [["Arbeitsblatt: Lesen Teil 2 und 3 (PDF)", AB + "dtb-b2-lesen-teil-2-und-3.pdf", 30], ["Lesen im Beruf: Interne Regelung", "#lesen/beruf/0", 10], ["Lesen im Beruf: zweite Regelung", "#lesen/beruf/6", 10]], "In Lesen 3 gibt es für eine Frage keinen passenden Text. Dann ist x die richtige Lösung."],
        ["Lesen 4: Protokoll", [["Lesen im Beruf: Protokoll", "#lesen/beruf/3", 15], ["Arbeitsblatt: DTB B2 Lesen – alle vier Teile (PDF)", AB + "dtb-b2-lesen.pdf", 30]], "Im Protokoll steht oft, wer was bis wann erledigt. Unterstreiche Namen und Termine."],
        ["Lesen und Schreiben: Kundenbeschwerde", [["Arbeitsblatt: Eine Kundenbeschwerde beantworten (PDF)", AB + "dtb-b2-kundenbeschwerde.pdf", 30], ["Training: Antwort an Kunden", "#training/dtb-schreiben", 20]], "Lies zuerst die interne Anweisung: Sie sagt dir, was du dem Kunden anbieten darfst."],
        ["Sprachbausteine", [["Arbeitsblatt: Sprachbausteine und Mitarbeiterforum (PDF)", AB + "dtb-b2-sprachbausteine-forum.pdf", 30], ["Spiel: Konnektoren-Kette", "#spiele/b2-konnektor", 10], ["Spiel: Präpositionen-Blitz", "#spiele/b2-praep", 10]], "In Sprachbausteine 1 passt jedes Wort nur einmal. Streich benutzte Wörter durch."],
        ["Grammatik: Passiv", [["Grammatik: Passiv mit Modalverb und Passiversatz", "#grammatik/b2-passiv-modalverb", 20], ["Arbeitsblatt: Passiv und Passiversatz (PDF)", AB + "passiv-und-passiversatz.pdf", 20]], "In Anweisungen und Regelungen steht oft Passiv: Die Geräte sind täglich zu prüfen."],
        ["Grammatik: Nominalstil", [["Grammatik: Nominalisierung", "#grammatik/b2-nominalisierung", 20], ["Spiel: Nominalstil-Leiter", "#spiele/b2-nominal", 10], ["Spiel: Nomen-Verb-Profi", "#spiele/b2-nvv", 10]], "Nomen-Verb-Verbindungen wie einen Antrag stellen klingen professionell – lerne sie als Paar."],
        // Woche 3
        ["Hören 1 und 3: Abläufe und Firmeninfos", [["DTB B2 Hören · Übungssatz 1", "#hoeren/b2-1", 25], ["Arbeitsblatt: DTB B2 Hören (PDF)", AB + "dtb-b2-hoeren.pdf", 20]], "Lies vor dem Hören die Aufgaben und markiere Schlüsselwörter."],
        ["Hören 2: Argumente", [["Arbeitsblatt: Hören Teil 2 – vier Gespräche, sechs Sätze (PDF)", AB + "dtb-b2-hoeren-teil-2.pdf", 25], ["DTB B2 Hören · Übungssatz 2", "#hoeren/b2-2", 25]], "Zwei Sätze bleiben übrig. Achte darauf, wer welche Meinung vertritt."],
        ["Hören und Schreiben: Telefonnotiz", [["Arbeitsblatt: Warum ruft der Kunde an? Notiz schreiben (PDF)", AB + "dtb-b2-anruf-grund-und-notiz.pdf", 25], ["Arbeitsblatt: Anruf verstehen, Telefonnotiz schreiben (PDF)", AB + "dtb-b2-telefonnotiz.pdf", 20], ["Spiel: Telefon-Profi Beruf", "#spiele/b1-telefon", 10]], "In die Notiz gehören Name, Telefonnummer, das Anliegen und was zu erledigen ist. Schreib Stichwörter, keine ganzen Sätze."],
        ["Hören 4: Anliegen am Telefon", [["DTB B2 Hören · Übungssatz 3", "#hoeren/b2-3", 25], ["Grammatik: Indirekte Rede", "#grammatik/b2-indirekte-rede", 20]], "Am Telefon wiederholt niemand. Schreib Zahlen und Namen sofort mit."],
        ["Schreiben: Antwort an den Kunden", [["Schreiben B2: Auf eine Kundenbeschwerde reagieren", "#ueben/schreiben/B2/1", 30], ["Lektion: Professionell reagieren", "#lektion/beschwerde-b2", 20]], "Höflich und konkret: Entschuldigung, Lösung, nächster Schritt."],
        ["Schreiben: Forumsbeitrag", [["Schreiben B2: Forumsbeitrag „Homeoffice für alle?“", "#ueben/schreiben/B2/3", 30], ["Arbeitsblatt: Meinung äußern und argumentieren (PDF)", AB + "meinung-und-argumentieren-b2.pdf", 15]], "Meinung, Begründung, Beispiel – und für jeden Gedanken einen eigenen Absatz."],
        ["Hören und formell schreiben", [["DTB B2 Hören · Übungssatz 4", "#hoeren/b2-4", 20], ["Schreiben B2: Eine Übergabe verbessern", "#ueben/schreiben/B2/0", 25], ["Spiel: Formell oder locker?", "#spiele/b1-stil", 10]], "Drei Wochen geschafft! Achte beim Schreiben auf Sie oder du – je nachdem, an wen du schreibst."],
        // Woche 4
        ["Sprechen 1A: Über ein Thema sprechen", [["Training: Über ein Thema sprechen", "#training/dtb-thema", 20], ["Lektion: Im Betrieb mitreden", "#lektion/forum-b2", 25]], "Gliedere deinen Beitrag: Einleitung, zwei Punkte mit Beispiel, Schluss. Nicht auswendig lernen – Prüfende unterbrechen dann mit Fragen."],
        ["Sprechen 1B und 1C: Fragen und Erläuterung", [["Arbeitsblatt: Sprechen Teil 1B/1C (PDF)", AB + "dtb-b2-sprechen-teil-1c.pdf", 25], ["Sprechen B2: Homeoffice für alle?", "#ueben/sprechen/B2/3", 15]], "Hör deinem Partner gut zu: In 1C erklärst du einen Punkt aus seinem Beitrag."],
        ["Sprechen 2: Mit Kollegen sprechen", [["Training: Mit Kollegen sprechen", "#training/dtb-kollegen", 20], ["Sprechen B2: Eine Übergabe verbessern", "#ueben/sprechen/B2/0", 15], ["Spiel: Redemittel-Radar", "#spiele/b2-redemittel", 10]], "Ein Pausengespräch ist locker: nachfragen, zustimmen, eigene Erfahrung erzählen."],
        ["Sprechen 3: Lösungswege diskutieren", [["Training: Lösungen diskutieren", "#training/dtb-sprechen", 20], ["Lektion: Ein Problem. Ein Plan.", "#lektion/loesungen-b2", 25]], "Am Ende verteilt ihr Aufgaben: Ich kümmere mich um …, könntest du bitte …?"],
        ["Wortschatz: Beschwerde, Betrieb, Lösungen", [["Wortkarten: Professionell reagieren", "#wortschatz/beschwerde-b2/0", 15], ["Wortkarten: Im Betrieb mitreden", "#wortschatz/forum-b2/0", 15], ["Wortkarten: Ein Problem. Ein Plan.", "#wortschatz/loesungen-b2/0", 15]], "Lern Wörter immer mit Artikel und Beispielsatz – dann helfen sie dir auch in den Sprachbausteinen."],
        ["Sprechen mit Uhr", [["Probeprüfung 3 mündlich – mit Uhr", "#simulation/dtb-b2-3/muendlich", 16], ["Spiel: Arbeitsabläufe ordnen", "#spiele/b2-ablauf", 10], ["Spiel: Quiz-Leiter Arbeitsrecht", "#spiele/b2-recht", 10]], "Vergleiche mit dem Einstiegstest: Was klingt schon sicherer?"],
        ["Schwächen trainieren", [["Meine Fehler wiederholen", "#fehler", 20], ["Mini-Übungen auf der Vorbereitungsseite", "#vorbereitung/dtb-b2", 20]], "Übe heute nur deine schwächste Fertigkeit. Morgen kommt die Generalprobe."],
        // Generalprobe
        ["Generalprobe: schriftlich", [["Probeprüfung 2 schriftlich – mit Uhr (125 Min.)", "#simulation/dtb-b2-2/schriftlich", 125]], "Mach die Probe wie echt: Handy weg, Uhr an. Plane dir einen freien Vormittag dafür ein."],
        ["Generalprobe: mündlich und Auswertung", [["Probeprüfung 2 mündlich – mit Uhr", "#simulation/dtb-b2-2/muendlich", 16], ["Ergebnis auswerten: Meine Fehler", "#fehler", 15], ["Ablauf am Prüfungstag noch einmal lesen", "#pruefungsinfo/dtb-b2", 10]], "Ab jetzt nur noch leicht wiederholen. Lies in deiner Einladung, was du mitbringen musst. Viel Erfolg!"],
      ],
    },
  };
  const WEEK_RANGES = [[0, 7], [7, 14], [14, 21], [21, 28], [28, 30]];
  const FMT_KEY = "dmd.b2fmt";

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const fmtGet = () => { try { return localStorage.getItem(FMT_KEY) || "all"; } catch { return "all"; } };
  const fmtSet = (v) => { try { localStorage.setItem(FMT_KEY, v); } catch {} };
  let fmt = "telc"; // plan shown right now ("telc" also while nothing is chosen)
  const st = () => {
    const all = (DM.store && (DM.store.b2_30 ||= {})) || {};
    const s = (all[fmt] ||= { start: "", done: {} });
    s.done ||= {};
    return s;
  };
  const save = () => { try { DM.save && DM.save(); } catch {} };
  const plan = () => PLANS[fmt];
  const doneCount = () => Object.keys(st().done).length;
  const nextDay = () => { for (let i = 1; i <= 30; i++) if (!st().done[i]) return i; return 0; };
  const calDay = () => {
    const s = st().start; if (!s) return 0;
    const n = Math.floor((Date.parse(today()) - Date.parse(s)) / 864e5) + 1;
    return Math.max(1, Math.min(30, n));
  };
  const mins = (d) => plan().days[d - 1][1].reduce((a, t) => a + t[2], 0);
  const isPdf = (h) => /\.pdf$/i.test(h);

  function dayCard(d, open) {
    const [title, tasks, tip] = plan().days[d - 1], done = !!st().done[d];
    return `<details class="d30-day${done ? " is-done" : ""}${open ? " is-today" : ""}" id="d30-tag-${d}"${open ? " open" : ""}>
      <summary><span class="d30-n" aria-hidden="true">${done ? "✓" : d}</span><span class="d30-t"><b>Tag ${d}: ${esc(title)}</b><small>ca. ${mins(d)} Minuten${done ? " · erledigt" : ""}</small></span></summary>
      <ul class="d30-tasks">${tasks.map(([l, h, m]) => `<li><a href="${esc(h)}"${isPdf(h) ? ' target="_blank" rel="noopener"' : ""}>${isPdf(h) ? '<span aria-hidden="true">📄 </span>' : ""}${esc(l)}</a> <span class="d30-min">${m} Min.</span></li>`).join("")}</ul>
      <p class="d30-tip"><span aria-hidden="true">💡</span> ${esc(tip)}</p>
      <label class="d30-check"><input type="checkbox" data-day="${d}"${done ? " checked" : ""}> Tag ${d} erledigt</label>
    </details>`;
  }

  function fmtSwitch(chosen) {
    const b = (v, label, sub) => `<button type="button" class="es-fmt-b" data-b230-fmt="${v}" aria-pressed="${chosen === v}"><b>${label}</b><small>${sub}</small></button>`;
    return `<section class="es-fmt d30-fmt" aria-labelledby="d30-fmt-h"><h2 id="d30-fmt-h" class="es-fmt-h">Welche Prüfung machst du?</h2>
      <div class="es-fmt-row" role="group" aria-labelledby="d30-fmt-h">${b("telc", "telc Deutsch B2", "allgemein")}${b("dtb", "DTB B2", "Deutsch-Test für den Beruf")}</div>
      ${chosen === "all" ? '<p class="es-fmt-note d30-fmt-hint"><b>Bitte wähle deine Prüfung.</b> Bis dahin siehst du den Plan für telc Deutsch B2.</p>' : ""}
      <p class="es-fmt-note"><a href="#pruefungsinfo">Unterschied telc B2 und DTB B2?</a> · Jede Prüfung hat ihren eigenen Plan und eigenen Fortschritt.</p></section>`;
  }

  function render(p) {
    const want = p && p[1];
    if (want === "telc" || want === "dtb") fmtSet(want);
    const chosen = fmtGet();
    fmt = chosen === "dtb" ? "dtb" : "telc";
    const P = plan(), s = st(), n = doneCount(), next = nextDay(), cal = calDay();
    const head = `${DM.crumbs ? DM.crumbs([["Prüfung", "#pruefung/" + P.tab], ["B2 in 30 Tagen"]]) : ""}
      <div class="dm-head"><h1>B2 in 30 Tagen</h1>
      <p class="dm-lead">${esc(P.lead)} Alle Übungen sind kostenlos auf dieser Seite.</p></div>`;
    const status = !s.start
      ? `<div class="d30-start dm-card"><p><b>So geht's (${esc(P.name)}):</b> Starte heute mit Tag 1. Mach jeden Tag die Aufgaben und hake den Tag ab. Dein Fortschritt bleibt auf diesem Gerät.</p>
         <button type="button" class="btn d30-go">▶ Heute mit Tag 1 starten</button></div>`
      : `<div class="d30-status dm-card">
          <div class="dm-progress" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${n}" aria-label="Fortschritt ${esc(P.name)}"><i style="width:${Math.round((n / 30) * 100)}%"></i></div>
          <p><b>${esc(P.name)}:</b> ${n ? `<b>${n} von 30 Tagen</b> erledigt.` : "Noch kein Tag erledigt."} ${next ? `<a href="#b2-30-tage" data-goto="${next}">Weiter mit Tag ${next} →</a>` : "<b>Alle 30 Tage geschafft – viel Erfolg in der Prüfung!</b>"}</p>
          ${next && cal > next + 1 ? `<p class="d30-late">Laut Kalender wärst du heute bei Tag ${cal}. Kein Problem – mach einfach dort weiter, wo du bist.</p>` : ""}
        </div>`;
    const weeks = P.weeks.map(([w, sub], i) => { const [a, b] = WEEK_RANGES[i]; return `<section class="d30-week"><h2>${esc(w)}<small>${esc(sub)}</small></h2>
      ${Array.from({ length: b - a }, (_, k) => dayCard(a + k + 1, s.start && a + k + 1 === next)).join("")}</section>`; }).join("");
    const foot = `<div class="d30-foot">
        <button type="button" class="btn secondary d30-print">🖨 Plan ausdrucken</button>
        <a class="btn secondary" href="${P.prep}">🧭 Aufbau und Strategien</a>
        ${s.start ? '<button type="button" class="btn secondary d30-reset">Plan neu starten</button>' : ""}
      </div>
      <p class="d30-note">Die Übungen und Probeprüfungen sind eigene Aufgaben im Stil der Prüfung – keine offiziellen Aufgaben der telc gGmbH. Plan von Dennis, telc-Prüfer.</p>`;
    DM.page(head + fmtSwitch(chosen) + status + weeks + foot, "d30-page");
    wire();
  }

  function wire() {
    const main = document.querySelector("main"); if (!main) return;
    main.querySelectorAll("[data-b230-fmt]").forEach((btn) => btn.addEventListener("click", () => {
      fmtSet(btn.dataset.b230Fmt);
      if (/^#b2-30-tage\/(telc|dtb)$/.test(location.hash)) history.replaceState(null, "", "#b2-30-tage");
      render([]);
    }));
    main.querySelector(".d30-go")?.addEventListener("click", () => { st().start = today(); save(); render([]); jump(1); });
    main.querySelector(".d30-print")?.addEventListener("click", () => { main.querySelectorAll(".d30-day").forEach((d) => (d.open = true)); window.print(); });
    main.querySelector(".d30-reset")?.addEventListener("click", () => {
      if (!confirm(`Plan für ${plan().name} wirklich neu starten? Deine Häkchen werden gelöscht.`)) return;
      DM.store.b2_30[fmt] = { start: "", done: {} }; save(); render([]);
    });
    main.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); jump(+a.dataset.goto); }));
    main.querySelectorAll("input[data-day]").forEach((cb) => cb.addEventListener("change", () => {
      const d = cb.dataset.day, s = st();
      if (cb.checked) { s.done[d] = Date.now(); if (!s.start) s.start = today(); } else delete s.done[d];
      save();
      if (cb.checked && DM.celebrate && doneCount() === 30) { try { DM.celebrate(); } catch {} }
      render([]); if (cb.checked && nextDay()) jump(nextDay());
    }));
  }
  function jump(d) {
    const el = document.getElementById("d30-tag-" + d); if (!el) return;
    el.open = true; el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  DM.routes = DM.routes || {};
  DM.routes["b2-30-tage"] = render;
  DM.b2_30 = { PLANS };
})();
