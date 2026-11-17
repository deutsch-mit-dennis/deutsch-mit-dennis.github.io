/* B1 in 30 Tagen (#b1-30-tage, #b1-30-tage/telc, #b1-30-tage/dtb): one fixed day-by-day plan per B1 exam
   (telc Deutsch B1 or DTB B1) that only links existing pages, PDFs and the model exams. Loaded by lazy.js.
   Same engine as b2-30.js. Exam choice: localStorage "dmd.b1fmt" ("all" = not chosen yet; also read by the B1 level page).
   Progress lives only on the device, separately per exam:
   DM.store.b1_30 = { telc: { start: "YYYY-MM-DD", done: { "1": timestamp } }, dtb: { ... } } (saved with DM.save).
   Styles: dtz30.css (shared .d30-* classes) + erste-schritte.css (.es-fmt switch).
   The DTZ (also A2–B1) has its own plan: #dtz-30-tage (dtz30.js).
   To change a plan, edit PLANS below (task = [label, "#route" or "material/…pdf", minutes]). */
(function () {
  "use strict";
  const DM = (window.DM = window.DM || {});
  const AB = "material/arbeitsblaetter/";

  // [title, tasks, tip] – tasks: [label, href, minutes]
  const PLANS = {
    telc: {
      name: "telc Deutsch B1",
      tab: "telcb1",
      prep: "#vorbereitung/telc-b1",
      lead: "Dein Lernplan für telc Deutsch B1: meistens 30 bis 60 Minuten am Tag. In Woche 1 machst du eine Probeprüfung Teil für Teil, am Ende eine komplette Generalprobe mit Uhr.",
      weeks: [["Woche 1", "Die Prüfung kennenlernen und Einstiegstest Teil für Teil"], ["Woche 2", "Leseverstehen, Sprachbausteine und Grammatik"], ["Woche 3", "Hörverstehen und Schriftlicher Ausdruck"], ["Woche 4", "Mündliche Prüfung und Wortschatz"], ["Tag 29–30", "Generalprobe mit Uhr und Auswertung"]],
      days: [
        // Woche 1
        ["Die Prüfung kennenlernen", [["Aufbau und Strategien: telc Deutsch B1", "#vorbereitung/telc-b1", 20], ["Prüfungsinfos: Dauer, Punkte, Bestehen", "#pruefungsinfo/telc-b1", 10], ["Lernweg „Ich mache die telc-Prüfung B1“", "#lernweg/telcb1", 5]], "Zum Bestehen brauchst du schriftlich und mündlich jeweils mindestens 60 Prozent. Schreib dein Prüfungsdatum auf einen Zettel."],
        ["Einstiegstest: Lesen und Sprachbausteine", [["Probeprüfung 1: nur „Leseverstehen und Sprachbausteine“ starten (mit Uhr)", "#simulation/telc-b1", 90]], "Heute ist ein langer Tag: In der Prüfung hast du 90 Minuten für Lesen und Sprachbausteine. Mach den Test ohne Wörterbuch – so siehst du, wo du stehst."],
        ["Einstiegstest: Hörverstehen", [["Probeprüfung 1: nur „Hörverstehen“ starten (mit Uhr)", "#simulation/telc-b1", 30], ["Strategien für das Hörverstehen", "#vorbereitung/telc-b1", 10]], "Lies vor jedem Hörtext die Aussagen und markiere ein Schlüsselwort pro Aussage."],
        ["Einstiegstest: Schriftlicher Ausdruck", [["Probeprüfung 1: nur „Schriftlicher Ausdruck“ starten (30 Min.)", "#simulation/telc-b1", 30], ["Schreib-Bausteine: Anrede, Einleitung, Schluss", "#schreiben/bausteine", 10]], "Bearbeite alle vier Leitpunkte – zu jedem Punkt mindestens zwei Sätze."],
        ["Einstiegstest: Mündliche Prüfung", [["Probeprüfung 1: nur „Mündliche Prüfung“ (20 Min. Vorbereitung + 15 Min.)", "#simulation/telc-b1/muendlich", 35], ["Arbeitsblatt: Mündliche Prüfung telc B1 (PDF)", AB + "telc-b1-muendliche-pruefung.pdf", 15]], "Nimm dich mit dem Handy auf. Beim Anhören merkst du schnell, wo dir Wörter fehlen."],
        ["Einstiegstest auswerten", [["Meine Fehler wiederholen", "#fehler", 20], ["Typische Fehler auf der Vorbereitungsseite", "#vorbereitung/telc-b1", 15]], "Welcher Teil hatte die wenigsten Punkte? Diesen Teil übst du in den nächsten Wochen besonders oft."],
        ["Wortschatz: Prüfungsthemen", [["B1-Wörter: Arbeit und Beruf", "#b1-woerter/1", 15], ["B1-Wörter: Wohnen und Nachbarschaft", "#b1-woerter/2", 15], ["Wortliste B1 zum Ausdrucken (PDF)", AB + "b1-wortliste-pruefungsthemen.pdf", 5]], "Eine Woche geschafft! Zehn neue Wörter am Tag reichen – aber jeden Tag."],
        // Woche 2
        ["Leseverstehen 1: Überschriften", [["Arbeitsblatt: telc B1 Leseverstehen (PDF)", AB + "telc-b1-leseverstehen.pdf", 30], ["Lesen im Alltag", "#lesen/alltag", 15]], "Lies bei jedem Text zuerst den ersten und den letzten Satz. Dort steht oft das Thema."],
        ["Leseverstehen 2: Detailverstehen", [["Lesen im Alltag: ein längerer Text", "#lesen/alltag", 20], ["Arbeitsblatt: Leseverstehen Teil 2 noch einmal ohne Hilfe (PDF)", AB + "telc-b1-leseverstehen.pdf", 20]], "Achte auf kleine Wörter wie nicht, kaum, nur oder fast – sie ändern die Bedeutung."],
        ["Leseverstehen 3: Anzeigen", [["Lesen im Beruf: Anzeigen und Regelungen", "#lesen/beruf", 20], ["Strategie für Leseverstehen 3", "#vorbereitung/telc-b1", 10]], "Manchmal passt keine Anzeige zu einer Situation. Wähle nur, wenn wirklich alles passt."],
        ["Grammatik: Nebensätze", [["Grammatik: dass und wenn", "#grammatik/a2-dass-wenn", 15], ["Arbeitsblatt: Nebensätze mit weil, dass, wenn, obwohl (PDF)", AB + "nebensaetze-mit-weil-dass-wenn-obwohl.pdf", 20]], "Im Nebensatz steht das Verb am Ende: …, weil ich morgen arbeiten muss."],
        ["Sprachbausteine 1: Grammatik im Brief", [["Arbeitsblatt: telc B1 Sprachbausteine (PDF)", AB + "telc-b1-sprachbausteine.pdf", 30], ["Grammatik: Präpositionen mit Dativ und Akkusativ", "#grammatik/a2-praepositionen-dativ-akkusativ", 15]], "Lies den ganzen Satz bis zum Ende. Oft entscheidet das Verb am Satzende, welche Lösung passt."],
        ["Sprachbausteine 2: Wortschatz", [["B1-Wörter: Einkaufen und Reklamation", "#b1-woerter/6", 15], ["Spiel: Formell oder locker?", "#spiele/b1-stil", 10], ["Grammatik: Adjektivendungen", "#grammatik/a2-adjektivendungen", 15]], "In Sprachbausteine Teil 2 passt jedes Wort nur einmal. Streich benutzte Wörter durch."],
        ["Grammatik: Passiv und Konjunktiv II", [["Grammatik: Das Passiv", "#grammatik/b1-passiv", 15], ["Grammatik: Konjunktiv II – hätte, wäre, würde", "#grammatik/b1-konjunktiv2", 15], ["Meine Fehler wiederholen", "#fehler", 10]], "Wiederhole heute auch die Fehler aus Woche 2. Was du zweimal falsch machst, kommt auf deine Lernkarte."],
        // Woche 3
        ["Hörverstehen 1: Globalverstehen", [["Arbeitsblatt: telc B1 Hörverstehen (PDF)", AB + "telc-b1-hoerverstehen.pdf", 30], ["telc B1 Hören: Übungssatz 1", "#hoeren/telcb1-1", 15]], "In Teil 1 geht es um das Thema. Du musst nicht jedes Wort verstehen."],
        ["Hörverstehen 2 und 3", [["telc B1 Hören: Übungssatz 2", "#hoeren/telcb1-2", 25], ["Hören im Alltag", "#hoeren/alltag", 15]], "Markiere in der Lesezeit in jeder Aussage ein Schlüsselwort. Beim zweiten Hören kontrollierst du."],
        ["Hören und Präteritum", [["Grammatik: Präteritum", "#grammatik/b1-praeteritum", 15], ["Hören im Beruf", "#hoeren/beruf", 20]], "In Radiomeldungen hörst du oft das Präteritum: Die Polizei teilte mit, dass …"],
        ["Der Brief: Aufbau", [["Arbeitsblatt: telc B1 Schriftlicher Ausdruck (PDF)", AB + "telc-b1-schriftlicher-ausdruck.pdf", 30], ["Schreib-Bausteine", "#schreiben/bausteine", 10]], "Vier Leitpunkte, ein Absatz pro Leitpunkt. Vergiss Anrede, Gruß und Unterschrift nicht."],
        ["Brief: sich beschweren", [["Schreiben B1: Zu laut im Haus", "#ueben/schreiben/B1/2", 25], ["Lektion: Das möchte ich reklamieren", "#lektion/reklamation", 20]], "Auch bei einer Beschwerde bleibst du höflich: Leider muss ich Ihnen mitteilen, dass …"],
        ["Brief: um Informationen bitten", [["Schreiben B1: E-Mail an die Volkshochschule", "#ueben/schreiben/B1/5", 25], ["Spiel: Formell oder locker?", "#spiele/b1-stil", 10]], "Teile die 30 Minuten ein: 5 planen, 20 schreiben, 5 kontrollieren."],
        ["Meinung schreiben und sagen", [["Lektion: Ich sehe das so", "#lektion/meinung", 25], ["B1-Wörter: Medien und Kommunikation", "#b1-woerter/7", 15]], "Drei Wochen geschafft! Sammle fünf Redemittel für deine Meinung – du brauchst sie schriftlich und mündlich."],
        // Woche 4
        ["Mündlich 1: Einander kennenlernen", [["Arbeitsblatt: Mündliche Prüfung telc B1 – Teil 1 (PDF)", AB + "telc-b1-muendliche-pruefung.pdf", 20], ["Sprechen üben B1", "#ueben/sprechen/B1", 15]], "Stell auch selbst Fragen. Im Teil 1 ist es ein Gespräch, kein Vortrag."],
        ["Mündlich 2: Über ein Thema sprechen", [["Lektion: Ich sehe das so", "#lektion/meinung", 20], ["B1-Wörter: Umwelt und Gesellschaft", "#b1-woerter/8", 15]], "Erzähl kurz, was du gelesen hast, dann sag deine Meinung mit Beispiel aus deinem Leben."],
        ["Mündlich 3: Gemeinsam etwas planen", [["Lektion: Zusammen geht mehr", "#lektion/planen", 25], ["Sprechen B1: Ein gemeinsames Essen planen", "#ueben/sprechen/B1/0", 15]], "Mach Vorschläge, reagiere auf deinen Partner und einigt euch am Ende."],
        ["Wortschatz: Gesundheit, Lernen, Reisen", [["B1-Wörter: Gesundheit", "#b1-woerter/3", 15], ["B1-Wörter: Ausbildung und Lernen", "#b1-woerter/4", 15], ["B1-Wörter: Reisen und Verkehr", "#b1-woerter/5", 15]], "Lern Wörter immer mit Artikel und Beispielsatz – dann helfen sie dir auch in den Sprachbausteinen."],
        ["Planen mit Partner", [["Training: Gemeinsam etwas planen", "#training/dtz-sprechen", 15], ["Arbeitsblatt: Mündliche Prüfung telc B1 – Teil 3 (PDF)", AB + "telc-b1-muendliche-pruefung.pdf", 20]], "Übe mit einer Freundin oder einem Freund. Ihr dürft auch widersprechen – aber findet am Ende eine Lösung."],
        ["Mündlich mit Uhr", [["Probeprüfung 2 mündlich – mit Uhr", "#simulation/telc-b1-2/muendlich", 35]], "Vergleiche mit dem Einstiegstest: Was klingt schon sicherer?"],
        ["Schwächen trainieren", [["Meine Fehler wiederholen", "#fehler", 20], ["Mini-Übungen auf der Vorbereitungsseite", "#vorbereitung/telc-b1", 20]], "Übe heute nur deine schwächste Fertigkeit. Morgen kommt die Generalprobe."],
        // Generalprobe
        ["Generalprobe: schriftlich", [["Probeprüfung 2 schriftlich – mit Uhr", "#simulation/telc-b1-2/schriftlich", 150]], "Mach die Probe wie echt: Handy weg, Uhr an. Plane dir einen freien Vormittag dafür ein."],
        ["Auswertung und Prüfungstag", [["Ergebnis auswerten: Meine Fehler", "#fehler", 20], ["Ablauf am Prüfungstag noch einmal lesen", "#pruefungsinfo/telc-b1", 10], ["Wortliste B1: die Karteikarten zum Ausschneiden (PDF)", AB + "b1-wortliste-pruefungsthemen.pdf", 10]], "Ab jetzt nur noch leicht wiederholen. Lies in deiner Einladung, was du mitbringen musst. Viel Erfolg!"],
      ],
    },
    dtb: {
      name: "DTB B1",
      tab: "dtbb1",
      prep: "#vorbereitung/dtb-b1",
      lead: "Dein Lernplan für den Deutsch-Test für den Beruf B1: meistens 30 bis 60 Minuten am Tag. In Woche 1 machst du eine Probeprüfung Teil für Teil, am Ende eine komplette Generalprobe mit Uhr.",
      weeks: [["Woche 1", "Die Prüfung kennenlernen und Einstiegstest"], ["Woche 2", "Lesen und Lesen und Schreiben"], ["Woche 3", "Hören, Telefonnotiz, Sprachbausteine und Kurznachricht"], ["Woche 4", "Sprechen und Wortschatz"], ["Tag 29–30", "Generalprobe mit Uhr und Auswertung"]],
      days: [
        // Woche 1
        ["Die Prüfung kennenlernen", [["Aufbau und Strategien: DTB B1", "#vorbereitung/dtb-b1", 20], ["Prüfungsinfos: Dauer, Punkte, Bestehen", "#pruefungsinfo/dtb-b1", 10], ["Lernweg „Ich mache den DTB B1“", "#lernweg/dtbb1", 5]], "Im DTB hörst du fast alle Texte nur einmal – nur die Telefonnachricht für die Notiz hörst du zweimal."],
        ["Einstiegstest: schriftlich", [["Probeprüfung 1 schriftlich – mit Uhr", "#simulation/dtb-b1/schriftlich", 95]], "Mach den Test ohne Wörterbuch – so siehst du, wo du stehst."],
        ["Einstiegstest: Sprechen", [["Probeprüfung 1 mündlich – mit Uhr", "#simulation/dtb-b1/muendlich", 16], ["Arbeitsblatt: Sprachbausteine und Sprechen DTB B1 (PDF)", AB + "dtb-b1-sprachbausteine-und-sprechen.pdf", 20]], "Nimm dich mit dem Handy auf. Beim Anhören merkst du schnell, wo dir Wörter fehlen."],
        ["Einstiegstest auswerten", [["Meine Fehler wiederholen", "#fehler", 20], ["Typische Fehler auf der Vorbereitungsseite", "#vorbereitung/dtb-b1", 15]], "Welcher Teil hatte die wenigsten Punkte? Diesen Teil übst du besonders oft."],
        ["Über die eigene Arbeit sprechen", [["Lektion: Eine Stelle finden", "#lektion/arbeit", 25], ["B1-Wörter: Arbeit und Beruf", "#b1-woerter/1", 15]], "Bereite drei Sätze über deine Arbeit vor: Was machst du? Was gefällt dir? Was ist schwierig?"],
        ["Telefonieren im Beruf", [["Spiel: Telefon-Profi Beruf", "#spiele/b1-telefon", 15], ["Spiel: Formell oder locker?", "#spiele/b1-stil", 10], ["Grammatik: Das Passiv", "#grammatik/b1-passiv", 15]], "Am Telefon: Name, Firma, Grund des Anrufs – und am Ende alles kurz wiederholen."],
        ["Wortschatz: Betrieb und Bereiche", [["Spiel: Bereiche im Betrieb", "#spiele/b1-bereiche", 10], ["Wortliste B1 zum Ausdrucken (PDF)", AB + "b1-wortliste-pruefungsthemen.pdf", 10], ["B1-Wörter: Einkaufen und Reklamation", "#b1-woerter/6", 15]], "Eine Woche geschafft! Zehn neue Wörter am Tag reichen – aber jeden Tag."],
        // Woche 2
        ["Lesen Teil 1 und 2", [["Arbeitsblatt: DTB B1 Lesen (PDF)", AB + "dtb-b1-lesen.pdf", 30], ["Lesen im Beruf", "#lesen/beruf", 15]], "Lies zuerst die Aufgabe, dann den Text. Suche nur die Stelle, die du brauchst."],
        ["Lesen Teil 3 und 4", [["Arbeitsblatt: DTB B1 Lesen – Teil 3 und 4 ohne Hilfe (PDF)", AB + "dtb-b1-lesen.pdf", 25], ["Lesen im Beruf: Regelungen", "#lesen/beruf/3", 15]], "Bei Regeln und Anleitungen zählt jedes Wort: muss, darf, soll, nicht."],
        ["Training: Lesen im DTB", [["Training: DTB Lesen", "#training/dtb-lesen", 20], ["Lesen im Beruf: E-Mail", "#lesen/beruf/2", 15]], "Unterstreiche Daten, Namen und Fristen. Danach wird oft gefragt."],
        ["Kunden-E-Mail verstehen", [["Arbeitsblatt: Lesen und Schreiben – Kunden-E-Mail (PDF)", AB + "dtb-b1-lesen-und-schreiben-kunden-email.pdf", 30], ["Grammatik: Konjunktiv II – höflich bitten", "#grammatik/b1-konjunktiv2", 10]], "Lies die Kunden-E-Mail zweimal: einmal für das Thema, einmal für die Details."],
        ["Antwort-E-Mail schreiben", [["Training: DTB Schreiben", "#training/dtb-schreiben", 25], ["Schreib-Bausteine", "#schreiben/bausteine", 10]], "Beantworte jeden Punkt der Aufgabe. Höflich und klar: Gern informiere ich Sie über …"],
        ["Schreiben: Reklamation", [["Lektion: Das möchte ich reklamieren", "#lektion/reklamation", 25], ["Schreiben B1: Zu laut im Haus", "#ueben/schreiben/B1/2", 20]], "Bei einer Beschwerde zeigst du Verständnis und bietest eine Lösung an."],
        ["Wiederholen: Lesen und Schreiben", [["Meine Fehler wiederholen", "#fehler", 20], ["Grammatik: Nebensätze mit dass und wenn", "#grammatik/a2-dass-wenn", 15]], "Zwei Wochen geschafft! Lies deine E-Mail laut vor – Fehler hört man oft besser."],
        // Woche 3
        ["Hören Teil 1 und 2", [["Arbeitsblatt: DTB B1 Hören und Telefonnotiz (PDF)", AB + "dtb-b1-hoeren-und-telefonnotiz.pdf", 30], ["DTB B1 Hören: Übungssatz 1", "#hoeren/dtbb1-1", 15]], "Du hörst jeden Text nur einmal. Lies vorher die Aufgabe ganz genau."],
        ["Hören Teil 3 und 4", [["DTB B1 Hören: Übungssatz 2", "#hoeren/dtbb1-2", 25], ["Hören im Beruf", "#hoeren/beruf", 15]], "In Gesprächen im Team: Wer sagt was? Achte auf Namen."],
        ["Hören und Schreiben: Telefonnotiz", [["Arbeitsblatt: Telefonnotiz noch einmal ohne Hilfe (PDF)", AB + "dtb-b1-hoeren-und-telefonnotiz.pdf", 20], ["Spiel: Telefon-Profi Beruf", "#spiele/b1-telefon", 10]], "In die Notiz gehören nur die wichtigen Informationen: wer, was, wann, Telefonnummer."],
        ["Sprachbausteine und Kurznachricht", [["Arbeitsblatt: Sprachbausteine und Sprechen DTB B1 (PDF)", AB + "dtb-b1-sprachbausteine-und-sprechen.pdf", 25], ["Grammatik: Präpositionen mit Dativ und Akkusativ", "#grammatik/a2-praepositionen-dativ-akkusativ", 15]], "Eine Kurznachricht ist kurz – aber alle Punkte aus der Aufgabe müssen drin sein."],
        ["Hören mit Uhr", [["Probeprüfung 2 schriftlich: nur „Hören“ und „Hören und Schreiben“", "#simulation/dtb-b1-2", 25], ["Meine Fehler wiederholen", "#fehler", 10]], "Mach die Teile ohne Pause hintereinander – wie in der Prüfung."],
        ["Wortschatz: Kommunikation", [["B1-Wörter: Medien und Kommunikation", "#b1-woerter/7", 15], ["B1-Wörter: Gesundheit", "#b1-woerter/3", 15]], "Arbeitssicherheit und Krankmeldung kommen im DTB oft vor."],
        ["Grammatik: Genitiv und Präteritum", [["Grammatik: Der Genitiv", "#grammatik/b1-genitiv", 15], ["Grammatik: Präteritum", "#grammatik/b1-praeteritum", 15]], "Drei Wochen geschafft! In Regeln und Mitteilungen liest du oft Genitiv: wegen des Termins."],
        // Woche 4
        ["Sprechen 1A und 1B: Über ein Thema sprechen", [["Arbeitsblatt: Sprechen DTB B1 – Teil 1 (PDF)", AB + "dtb-b1-sprachbausteine-und-sprechen.pdf", 20], ["Sprechen B1: Bei der Berufsberatung", "#ueben/sprechen/B1/4", 15]], "Erzähl von deiner Erfahrung mit Beispiel. Danach stellen die Prüfenden Fragen."],
        ["Sprechen 2: Mit Kollegen sprechen", [["Arbeitsblatt: Sprechen DTB B1 – Teil 2 (PDF)", AB + "dtb-b1-sprachbausteine-und-sprechen.pdf", 20], ["Sprechen B1: Eine Lieferung reklamieren", "#ueben/sprechen/B1/1", 15]], "Ein Gespräch unter Kollegen ist locker: nachfragen, zustimmen, eigene Erfahrung erzählen."],
        ["Sprechen 3: Gemeinsam etwas planen", [["Training: Gemeinsam etwas planen", "#training/dtz-sprechen", 20], ["Lektion: Zusammen geht mehr", "#lektion/planen", 25]], "Am Ende verteilt ihr Aufgaben: Ich kümmere mich um …, könntest du bitte …?"],
        ["Sprechen: Planen im Betrieb", [["Arbeitsblatt: Sprechen DTB B1 – Teil 3 (PDF)", AB + "dtb-b1-sprachbausteine-und-sprechen.pdf", 20], ["Sprechen B1: Ein gemeinsames Essen planen", "#ueben/sprechen/B1/0", 15]], "Mach Vorschläge mit Begründung: Ich schlage vor, dass …, weil …"],
        ["Wortschatz: Wohnen, Lernen, Reisen", [["B1-Wörter: Ausbildung und Lernen", "#b1-woerter/4", 15], ["B1-Wörter: Reisen und Verkehr", "#b1-woerter/5", 15]], "Lern Wörter mit Artikel und Beispielsatz – dann helfen sie dir auch in den Sprachbausteinen."],
        ["Sprechen mit Uhr", [["Probeprüfung 3 mündlich – mit Uhr", "#simulation/dtb-b1-3/muendlich", 16]], "Vergleiche mit dem Einstiegstest: Was klingt schon sicherer?"],
        ["Schwächen trainieren", [["Meine Fehler wiederholen", "#fehler", 20], ["Mini-Übungen auf der Vorbereitungsseite", "#vorbereitung/dtb-b1", 20]], "Übe heute nur deine schwächste Fertigkeit. Morgen kommt die Generalprobe."],
        // Generalprobe
        ["Generalprobe: schriftlich", [["Probeprüfung 3 schriftlich – mit Uhr", "#simulation/dtb-b1-3/schriftlich", 95]], "Mach die Probe wie echt: Handy weg, Uhr an."],
        ["Generalprobe: mündlich und Auswertung", [["Probeprüfung 2 mündlich – mit Uhr", "#simulation/dtb-b1-2/muendlich", 16], ["Ergebnis auswerten: Meine Fehler", "#fehler", 15], ["Ablauf am Prüfungstag noch einmal lesen", "#pruefungsinfo/dtb-b1", 10]], "Ab jetzt nur noch leicht wiederholen. Lies in deiner Einladung, was du mitbringen musst. Viel Erfolg!"],
      ],
    },
  };
  const WEEK_RANGES = [[0, 7], [7, 14], [14, 21], [21, 28], [28, 30]];
  const FMT_KEY = "dmd.b1fmt";

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const fmtGet = () => { try { return localStorage.getItem(FMT_KEY) || "all"; } catch { return "all"; } };
  const fmtSet = (v) => { try { localStorage.setItem(FMT_KEY, v); } catch {} };
  let fmt = "telc"; // plan shown right now ("telc" also while nothing is chosen)
  const st = () => {
    const all = (DM.store && (DM.store.b1_30 ||= {})) || {};
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
    const b = (v, label, sub) => `<button type="button" class="es-fmt-b" data-b130-fmt="${v}" aria-pressed="${chosen === v}"><b>${label}</b><small>${sub}</small></button>`;
    return `<section class="es-fmt d30-fmt" aria-labelledby="d30-fmt-h"><h2 id="d30-fmt-h" class="es-fmt-h">Welche Prüfung machst du?</h2>
      <div class="es-fmt-row" role="group" aria-labelledby="d30-fmt-h">${b("telc", "telc Deutsch B1", "allgemein")}${b("dtb", "DTB B1", "Deutsch-Test für den Beruf")}</div>
      ${chosen === "all" ? '<p class="es-fmt-note d30-fmt-hint"><b>Bitte wähle deine Prüfung.</b> Bis dahin siehst du den Plan für telc Deutsch B1. Für den DTZ gibt es einen eigenen Plan: <a href="#dtz-30-tage">DTZ in 30 Tagen</a>.</p>' : ""}
      <p class="es-fmt-note"><a href="#pruefungsinfo">Unterschied telc B1 und DTB B1?</a> · Jede Prüfung hat ihren eigenen Plan und eigenen Fortschritt.</p></section>`;
  }

  function render(p) {
    const want = p && p[1];
    if (want === "telc" || want === "dtb") fmtSet(want);
    const chosen = fmtGet();
    fmt = chosen === "dtb" ? "dtb" : "telc";
    const P = plan(), s = st(), n = doneCount(), next = nextDay(), cal = calDay();
    const head = `${DM.crumbs ? DM.crumbs([["Prüfung", "#pruefung/" + P.tab], ["B1 in 30 Tagen"]]) : ""}
      <div class="dm-head"><h1>B1 in 30 Tagen</h1>
      <p class="dm-lead">${esc(P.lead)} Alle Übungen sind kostenlos auf dieser Seite.</p></div>`;
    const status = !s.start
      ? `<div class="d30-start dm-card"><p><b>So geht's (${esc(P.name)}):</b> Starte heute mit Tag 1. Mach jeden Tag die Aufgaben und hake den Tag ab. Dein Fortschritt bleibt auf diesem Gerät.</p>
         <button type="button" class="btn d30-go">▶ Heute mit Tag 1 starten</button></div>`
      : `<div class="d30-status dm-card">
          <div class="dm-progress" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${n}" aria-label="Fortschritt ${esc(P.name)}"><i style="width:${Math.round((n / 30) * 100)}%"></i></div>
          <p><b>${esc(P.name)}:</b> ${n ? `<b>${n} von 30 Tagen</b> erledigt.` : "Noch kein Tag erledigt."} ${next ? `<a href="#b1-30-tage" data-goto="${next}">Weiter mit Tag ${next} →</a>` : "<b>Alle 30 Tage geschafft – viel Erfolg in der Prüfung!</b>"}</p>
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
    main.querySelectorAll("[data-b130-fmt]").forEach((btn) => btn.addEventListener("click", () => {
      fmtSet(btn.dataset.b130Fmt);
      if (/^#b1-30-tage\/(telc|dtb)$/.test(location.hash)) history.replaceState(null, "", "#b1-30-tage");
      render([]);
    }));
    main.querySelector(".d30-go")?.addEventListener("click", () => { st().start = today(); save(); render([]); jump(1); });
    main.querySelector(".d30-print")?.addEventListener("click", () => { main.querySelectorAll(".d30-day").forEach((d) => (d.open = true)); window.print(); });
    main.querySelector(".d30-reset")?.addEventListener("click", () => {
      if (!confirm(`Plan für ${plan().name} wirklich neu starten? Deine Häkchen werden gelöscht.`)) return;
      DM.store.b1_30[fmt] = { start: "", done: {} }; save(); render([]);
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
  DM.routes["b1-30-tage"] = render;
  DM.b1_30 = { PLANS };
})();
