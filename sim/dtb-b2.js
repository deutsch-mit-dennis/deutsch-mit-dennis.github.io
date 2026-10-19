// DTB B2 – Deutsch-Test für den Beruf (telc im Auftrag des BAMF)
// Eigene Übungsaufgaben im Stil der Prüfung, keine offiziellen Aufgaben.
// Alle Firmen, Personen, Adressen und Telefonnummern sind frei erfunden.
(window.SIM = window.SIM || {})["dtb-b2"] = {
  id: "dtb-b2",
  title: "DTB B2 – Deutsch-Test für den Beruf",
  short: "DTB B2",
  provider: "telc",
  level: "B2",
  intro:
    "Die Abschlussprüfung der Berufssprachkurse B2. Alle Aufgaben spielen im Berufsalltag – in Logistik, Pflege, Büro, Handwerk und Gastronomie.",
  rule: "dtb",
  skills: {
    lesen: { label: "Lesen", max: 60 },
    hoeren: { label: "Hören", max: 60 },
    schreiben: { label: "Schreiben", max: 60 },
    sprechen: { label: "Sprechen", max: 60 },
  },
  sections: [
    // ───────────────────────────── LESEN ─────────────────────────────
    {
      id: "lesen",
      title: "Lesen",
      minutes: 45,
      note: "Vier Teile. Sie markieren Ihre Lösungen direkt. Teilen Sie sich die Zeit ein: ca. 10–12 Minuten pro Teil.",
      parts: [
        {
          title: "Lesen Teil 1: Informationen zum Arbeitsmarkt",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Person? Jede Anzeige können Sie nur einmal verwenden. Drei Anzeigen bleiben übrig.",
          material: [
            {
              h: "a) Seniorenresidenz Haus Ahorn, Dortmund-Hörde",
              t: "Pflegefachkraft (m/w/d) in Voll- oder Teilzeit\nSie arbeiten im Drei-Schicht-System (Früh-, Spät- und Nachtdienst) in einem herzlichen Team mit 60 Bewohnerinnen und Bewohnern. Wir bieten: Bezahlung nach Tarif, Zuschuss zur Kinderbetreuung, Jobrad, betriebliche Altersvorsorge.\nVoraussetzung: abgeschlossene Ausbildung als Pflegefachkraft. Bewerbung bitte über unser Online-Portal.",
            },
            {
              h: "b) Betriebsrestaurant der Ruhrland Versicherung AG, Essen",
              t: "Koch/Köchin (m/w/d) in Vollzeit\nWir kochen täglich frisch für rund 600 Mitarbeitende. Arbeitszeit: Montag bis Freitag von 6:00 bis 14:30 Uhr. Kein Abenddienst, keine Wochenenden – und zwischen Weihnachten und Neujahr Betriebsferien.\nVoraussetzung: abgeschlossene Ausbildung als Koch/Köchin, Erfahrung in der Gemeinschaftsverpflegung von Vorteil.",
            },
            {
              h: "c) Tagesklinik für Psychiatrie am St.-Anna-Hospital, Dortmund",
              t: "Pflegefachkraft (m/w/d), 30 bis 38,5 Stunden pro Woche\nUnsere Patientinnen und Patienten sind nur tagsüber bei uns. Ihre Arbeitszeit liegt deshalb montags bis freitags zwischen 7:00 und 16:00 Uhr – keine Nacht-, Wochenend- oder Feiertagsdienste.\nVoraussetzung: abgeschlossene, in Deutschland anerkannte Ausbildung in der Pflege.",
            },
            {
              h: "d) Bildungszentrum Pflege Ruhr, Bochum",
              t: "Anpassungsqualifizierung für Pflegekräfte mit ausländischem Berufsabschluss\nIhr Abschluss ist noch nicht oder nur teilweise anerkannt? In 6 bis 9 Monaten bereiten wir Sie gezielt auf die Kenntnisprüfung vor. Theorie montags bis donnerstags, Praxis in unseren Partnerkliniken. Förderung über Bildungsgutschein möglich.",
            },
            {
              h: "e) Steuerberatungskanzlei Hellwig & Partner, Bochum",
              t: "Bürokraft / Sachbearbeitung (m/w/d) in Teilzeit, 20–25 Stunden pro Woche\nIhre Aufgaben: Terminplanung, Korrespondenz mit Mandanten, digitale Ablage. Nach der Einarbeitung können Sie zwei Tage pro Woche mobil von zu Hause arbeiten. Ideal für den Wiedereinstieg nach der Familienzeit – in unsere Software arbeiten wir Sie in Ruhe ein.",
            },
            {
              h: "f) Logistik-Akademie Hamm",
              t: "IHK-Abschluss für Berufserfahrene: Fachkraft für Lagerlogistik\nSie arbeiten schon lange im Lager, haben aber keinen Berufsabschluss? Mit mindestens 4,5 Jahren Berufserfahrung können Sie zur Externenprüfung zugelassen werden. Unser Vorbereitungskurs läuft berufsbegleitend: dienstags und donnerstags von 18 bis 21 Uhr sowie jeden zweiten Samstag.",
            },
            {
              h: "g) Solar-Kompetenzzentrum Gelsenkirchen",
              t: "Lehrgang „Fachkraft Photovoltaik“ für Elektrikerinnen und Elektriker\n8 Wochen Vollzeit (Mo–Fr, 8–16 Uhr) mit viel Praxis auf unserem Montagedach. Der Lehrgang ist AZAV-zertifiziert: Die Kosten können mit einem Bildungsgutschein der Agentur für Arbeit oder des Jobcenters übernommen werden. Nächster Start: 3. November.",
            },
            {
              h: "h) Bildungswerk Westfalen, Dortmund",
              t: "Umschulung zur Fachkraft für Lagerlogistik (IHK)\nIn 24 Monaten zum anerkannten Berufsabschluss. Unterricht und Betriebspraktikum in Vollzeit, Montag bis Freitag. Für Arbeitsuchende mit Bildungsgutschein. Infoabend jeden ersten Mittwoch im Monat.",
            },
          ],
          opts: [
            "a) Seniorenresidenz Haus Ahorn",
            "b) Betriebsrestaurant Ruhrland Versicherung",
            "c) Tagesklinik St.-Anna-Hospital",
            "d) Bildungszentrum Pflege Ruhr",
            "e) Kanzlei Hellwig & Partner",
            "f) Logistik-Akademie Hamm",
            "g) Solar-Kompetenzzentrum",
            "h) Bildungswerk Westfalen",
          ],
          items: [
            {
              q: "Olga P. ist ausgebildete Krankenschwester; ihr Abschluss aus der Ukraine ist in Deutschland bereits anerkannt. Sie hat eine dreijährige Tochter und sucht eine Stelle ohne Nacht- und Wochenenddienste.",
              a: 2,
              why: "Die Tagesklinik (c) verlangt eine anerkannte Ausbildung und hat „keine Nacht-, Wochenend- oder Feiertagsdienste“. Haus Ahorn (a) hat Nachtdienst, d) ist für noch nicht anerkannte Abschlüsse.",
            },
            {
              q: "Kemal A. arbeitet seit sechs Jahren als Lagerhelfer in Vollzeit. Er möchte einen Berufsabschluss als Fachkraft für Lagerlogistik machen, ohne seine Stelle aufzugeben.",
              a: 5,
              why: "f) bietet die Externenprüfung für Berufserfahrene „berufsbegleitend“ abends und samstags. Die Umschulung h) ist Vollzeit und für Arbeitsuchende.",
            },
            {
              q: "Mariana C. ist Kauffrau für Büromanagement und war drei Jahre in Elternzeit. Sie möchte wieder einsteigen, aber höchstens 25 Stunden pro Woche arbeiten und teilweise von zu Hause aus.",
              a: 4,
              why: "Die Kanzlei (e) bietet 20–25 Stunden, „zwei Tage pro Woche mobil“ und nennt ausdrücklich den Wiedereinstieg nach der Familienzeit.",
            },
            {
              q: "Tomasz N. ist Elektroniker und zurzeit arbeitslos. Er möchte sich auf Photovoltaik spezialisieren und kann sofort eine Vollzeit-Weiterbildung beginnen; die Kosten soll die Agentur für Arbeit übernehmen.",
              a: 6,
              why: "g) ist ein Vollzeit-Lehrgang Photovoltaik für Elektriker, förderfähig mit Bildungsgutschein der Agentur für Arbeit.",
            },
            {
              q: "Ahmad R. ist Koch. Nach vielen Jahren mit Spätdiensten sucht er eine Stelle mit festen Arbeitszeiten tagsüber und freien Wochenenden.",
              a: 1,
              why: "Das Betriebsrestaurant (b) arbeitet Mo–Fr von 6:00 bis 14:30 Uhr, „kein Abenddienst, keine Wochenenden“.",
            },
          ],
        },
        {
          title: "Lesen Teil 2: Anweisungen verstehen",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie die Hausmitteilung und die Aufgaben 1–4. Sind die Aussagen 1 und 2 richtig oder falsch? Welche Lösung (a, b oder c) ist bei den Aufgaben 3 und 4 richtig?",
          material: [
            {
              h: "Hausmitteilung Nr. 14/2026 – Spedition Kröger & Sohn GmbH, Standort Hamm",
              t: "Neue Regeln zum Arbeitsschutz im Lager – gültig ab 1. November\n\nLiebe Kolleginnen und Kollegen,\nnach zwei Unfällen mit Gabelstaplern im letzten Quartal hat die Geschäftsführung gemeinsam mit dem Betriebsrat und unserer Fachkraft für Arbeitssicherheit die Regeln für das Lager überarbeitet. Bitte lesen Sie diese Mitteilung sorgfältig und bestätigen Sie bis zum 31. Oktober mit Ihrer Unterschrift auf der Liste bei Ihrer Schichtleitung, dass Sie sie zur Kenntnis genommen haben.\n\n1. Flurförderzeuge\nGabelstapler und Hubwagen mit Fahrersitz dürfen nur Beschäftigte fahren, die einen gültigen Fahrausweis („Staplerschein“) besitzen und zusätzlich vom Betrieb einen schriftlichen Fahrauftrag erhalten haben. Wer bereits einen Staplerschein, aber noch keinen Fahrauftrag hat, meldet sich bitte bei Herrn Demir (Lagerleitung). Vor der Erteilung des Fahrauftrags erfolgt eine kurze Einweisung auf dem jeweiligen Fahrzeugtyp. Elektrische Mitgänger-Hubwagen dürfen weiterhin nach einer Unterweisung durch die Schichtleitung genutzt werden.\n\n2. Persönliche Schutzausrüstung\nIn allen Lagerhallen sind Sicherheitsschuhe und Warnweste Pflicht – auch auf kurzen Wegen, z. B. wenn Sie von der Kantine durch Halle 3 ins Büro gehen. Die Firma stellt jedes Jahr ein Paar Sicherheitsschuhe kostenlos zur Verfügung. Wer ein zweites Paar möchte oder ein Modell wählt, das teurer ist als in unserem Rahmenvertrag vorgesehen, zahlt die Differenz selbst. Gutscheine erhalten Sie im Personalbüro.\n\n3. Unfälle und Beinahe-Unfälle\nJeder Unfall – auch ohne Verletzung – muss sofort der Schichtleitung gemeldet und im Verbandbuch eingetragen werden. Neu ist: Auch Situationen, in denen beinahe etwas passiert wäre, melden Sie bitte über das Formular „Beinahe-Unfall“ im Intranet. Diese Meldungen sind auch anonym möglich und haben für Sie keinerlei Folgen. Sie helfen uns, Gefahren früh zu erkennen.\n\n4. Besucher und Fremdfirmen\nBesucherinnen und Besucher dürfen die Hallen nur in Begleitung betreten; sie erhalten am Empfang eine Besucherweste. Beschäftigte von Fremdfirmen (z. B. Reinigung, Wartung) müssen vor ihrem ersten Einsatz an einer Sicherheitsunterweisung teilnehmen, die unser Empfang organisiert.\n\nVielen Dank für Ihre Mithilfe!\nJana Kröger, Geschäftsführung",
            },
          ],
          items: [
            {
              q: "Wer einen Staplerschein besitzt, darf ab November jeden Gabelstapler im Betrieb fahren.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "Zusätzlich zum Staplerschein braucht man einen „schriftlichen Fahrauftrag“ und eine Einweisung auf dem Fahrzeugtyp.",
            },
            {
              q: "Auch Situationen, in denen fast ein Unfall passiert wäre, sollen gemeldet werden.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Auch Situationen, in denen beinahe etwas passiert wäre, melden Sie bitte über das Formular „Beinahe-Unfall“.“",
            },
            {
              q: "Was gilt für Sicherheitsschuhe?",
              opts: [
                "Die Firma bezahlt jedes Jahr beliebig viele Paare.",
                "Ein Paar pro Jahr ist kostenlos, Extras zahlt man selbst.",
                "Man muss sie nur bei längeren Arbeiten in der Halle tragen.",
              ],
              a: 1,
              why: "„Die Firma stellt jedes Jahr ein Paar … kostenlos zur Verfügung“; für ein zweites Paar oder ein teureres Modell zahlt man die Differenz selbst. Pflicht gilt „auch auf kurzen Wegen“.",
            },
            {
              q: "Was müssen Beschäftigte von Fremdfirmen tun?",
              opts: [
                "Sie holen sich vor jedem Einsatz eine Besucherweste im Personalbüro.",
                "Sie dürfen die Halle nur zusammen mit Herrn Demir betreten.",
                "Sie nehmen vor dem ersten Einsatz an einer Sicherheitsunterweisung teil.",
              ],
              a: 2,
              why: "„Beschäftigte von Fremdfirmen … müssen vor ihrem ersten Einsatz an einer Sicherheitsunterweisung teilnehmen.“ Westen gibt es am Empfang, nicht im Personalbüro.",
            },
          ],
        },
        {
          title: "Lesen Teil 3: Arbeitsbedingungen",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie die Fragen 1–4 aus einem Ratgeberforum für Beschäftigte und die Texte a–e. Welcher Text beantwortet welche Frage? Jeden Text können Sie nur einmal verwenden. Zu einer Frage gibt es keinen passenden Text. Wählen Sie dann x. Zwei Texte bleiben übrig.",
          material: [
            {
              h: "a) Krank – was nun?",
              t: "Wer krank ist, muss den Arbeitgeber sofort informieren, am besten noch vor Arbeitsbeginn – per Telefon oder so, wie es im Betrieb üblich ist. Eine ärztliche Arbeitsunfähigkeitsbescheinigung ist meist ab dem vierten Kalendertag nötig; der Arbeitgeber darf das Attest aber auch schon ab dem ersten Tag verlangen. Seit 2023 ruft der Betrieb die Daten elektronisch bei der Krankenkasse ab. Die Pflicht, sich selbst krankzumelden, bleibt trotzdem bestehen.",
            },
            {
              h: "b) Lernen mit Lohn",
              t: "In fast allen Bundesländern haben Beschäftigte einen gesetzlichen Anspruch auf Bildungsurlaub – meist fünf Arbeitstage pro Jahr bei voller Bezahlung. Voraussetzung ist, dass die Veranstaltung offiziell als Bildungsurlaub anerkannt ist und Sie den Antrag rechtzeitig stellen, in vielen Ländern spätestens sechs Wochen vorher. Ob ein Kurs anerkannt ist, erfahren Sie beim Kursanbieter.",
            },
            {
              h: "c) Das Zeugnis zum Abschied",
              t: "Am Ende eines Arbeitsverhältnisses haben Sie Anspruch auf ein schriftliches Arbeitszeugnis. Ein qualifiziertes Zeugnis beschreibt nicht nur Ihre Aufgaben, sondern auch Leistung und Verhalten. Achten Sie darauf, dass auch besuchte Weiterbildungen erwähnt werden. Wechselt Ihre Vorgesetzte oder Ihr Vorgesetzter, können Sie ein Zwischenzeugnis verlangen.",
            },
            {
              h: "d) Teilzeit und Urlaub",
              t: "Der Urlaubsanspruch richtet sich nach der Zahl der Arbeitstage pro Woche, nicht nach den Stunden. Wer wie die Vollzeitkräfte an fünf Tagen arbeitet, bekommt genauso viele Urlaubstage – auch wenn die einzelnen Arbeitstage kürzer sind. Nur wer an weniger Tagen arbeitet, hat entsprechend weniger Urlaubstage: Bei drei Arbeitstagen sind es drei Fünftel des Vollzeit-Urlaubs.",
            },
            {
              h: "e) Länger bleiben?",
              t: "Überstunden müssen Sie grundsätzlich nur leisten, wenn Ihr Arbeitsvertrag, ein Tarifvertrag oder eine Betriebsvereinbarung das vorsieht. Eine Ausnahme sind echte Notfälle, zum Beispiel ein Wasserschaden oder ein Brand. Ob Überstunden bezahlt oder mit Freizeit ausgeglichen werden, steht ebenfalls meist im Vertrag. Notieren Sie Ihre Überstunden in jedem Fall schriftlich.",
            },
          ],
          opts: [
            "a) Krank – was nun?",
            "b) Lernen mit Lohn",
            "c) Das Zeugnis zum Abschied",
            "d) Teilzeit und Urlaub",
            "e) Länger bleiben?",
            "x) kein passender Text",
          ],
          items: [
            {
              q: "Svetlana, Verkäuferin: „Ich arbeite 20 Stunden pro Woche, verteilt auf fünf Vormittage. Die Kolleginnen in Vollzeit haben 28 Urlaubstage, ich soll nur 14 bekommen. Ist das korrekt?“",
              a: 3,
              why: "Text d: Wer „an fünf Tagen arbeitet, bekommt genauso viele Urlaubstage – auch wenn die einzelnen Arbeitstage kürzer sind“.",
            },
            {
              q: "Jörg, Montagehelfer: „Mein Chef sagt fast jeden Tag kurz vor Feierabend, dass ich noch zwei Stunden bleiben muss. In meinem Vertrag steht dazu nichts. Muss ich das machen?“",
              a: 4,
              why: "Text e: Überstunden nur, wenn Vertrag, Tarifvertrag oder Betriebsvereinbarung es vorsehen – außer in echten Notfällen.",
            },
            {
              q: "Amira, Zahnmedizinische Fachangestellte: „Ich war eine Woche im Urlaub und davon vier Tage mit Fieber im Bett – mit Attest vom Arzt. Bekomme ich diese Urlaubstage zurück?“",
              a: 5,
              why: "Kein Text behandelt Krankheit während des Urlaubs. Text a erwähnt zwar Attest und Krankmeldung, beantwortet die Frage nach den Urlaubstagen aber nicht → x.",
            },
            {
              q: "Bogdan, Lagerarbeiter: „Ich möchte an der Volkshochschule einen einwöchigen Computerkurs machen, der tagsüber stattfindet. Muss mich mein Arbeitgeber dafür bezahlt freistellen?“",
              a: 1,
              why: "Text b: Anspruch auf Bildungsurlaub, „meist fünf Arbeitstage pro Jahr bei voller Bezahlung“, wenn der Kurs anerkannt ist. Text c erwähnt Weiterbildungen nur im Zeugnis.",
            },
          ],
        },
        {
          title: "Lesen Teil 4: Aufgaben und Aufgabenverteilung",
          skill: "lesen",
          pts: 3,
          instr:
            "Lesen Sie das Protokoll einer Teambesprechung und die Aufgaben 1–5. Welche Lösung (a, b oder c) ist richtig?",
          material: [
            {
              h: "Protokoll der Teambesprechung – Haustechnik Brandt GmbH, Bochum",
              t: "Datum: 13.10.2026, 7:30–8:45 Uhr\nAnwesend: Herr Brandt (Geschäftsführer), Frau Lindemann (Büro/Disposition), Herr Kaya (Obermonteur), Herr Wiese (Monteur), Frau Petrović (Auszubildende, 2. Lehrjahr)\nEntschuldigt: Herr Jansen (Urlaub)\nProtokoll: Frau Lindemann\n\nTOP 1: Digitale Auftragsmappe\nAb 1. Dezember werden alle Aufträge über die App „ServiceMappe“ auf den Tablets verwaltet; die Auftragszettel aus Papier entfallen. Herr Kaya hat die App vier Wochen getestet und ist insgesamt zufrieden. Er kritisiert aber, dass Fotos von der Baustelle bisher nur über WLAN hochgeladen werden können. Herr Brandt klärt bis Ende Oktober mit dem Anbieter, ob das Hochladen auch über mobile Daten möglich ist.\nSchulung: 18.11., 14–17 Uhr in der Werkstatt. Frau Lindemann verschickt die Einladung. Herr Jansen erhält nach seinem Urlaub eine Einzelschulung durch Herrn Kaya.\n\nTOP 2: Notdienst im Winter\nVom 1.12. bis 28.2. gibt es wieder einen Wochenend-Notdienst. Bisher haben sich nur Herr Wiese und Herr Kaya in die Liste eingetragen. Beschluss: Jeder Monteur übernimmt mindestens zwei Wochenenden. Frau Lindemann erstellt bis 31.10. den Plan. Tauschwünsche klären die Kollegen direkt untereinander und informieren danach Frau Lindemann. Der Notdienstzuschlag steigt auf 150 € pro Wochenende.\n\nTOP 3: Ausbildung\nFrau Petrović bereitet sich auf ihre Zwischenprüfung im März vor. Sie wünscht sich mehr Praxis bei der Installation von Wärmepumpen. Herr Kaya nimmt sie ab November zu allen Wärmepumpen-Baustellen mit. Für die Theorie bietet Herr Wiese ihr einmal pro Woche eine Stunde Prüfungsvorbereitung an (freitags, 13–14 Uhr, Werkstatt).\n\nTOP 4: Verschiedenes\nDer Transporter BO-HB 214 muss am 22.10. zum TÜV. Herr Wiese bringt ihn morgens hin und fährt an diesem Tag bei Herrn Kaya mit. Weihnachtsfeier am 12.12.: Frau Petrović und Frau Lindemann sammeln Ideen; Vorschläge bitte bis 15.11.\n\nNächste Besprechung: 10.11., 7:30 Uhr",
            },
          ],
          items: [
            {
              q: "Was soll bis Ende Oktober geklärt werden?",
              opts: [
                "ob man Fotos auch über mobile Daten hochladen kann",
                "wann die Schulung zur App stattfindet",
                "ob die App schon ab 1. Dezember eingesetzt wird",
              ],
              a: 0,
              why: "TOP 1: Herr Brandt klärt „bis Ende Oktober …, ob das Hochladen auch über mobile Daten möglich ist“. Termin und Start sind schon beschlossen.",
            },
            {
              q: "Wie lernt Herr Jansen die neue App kennen?",
              opts: [
                "Er nimmt am 18. November an der Schulung teil.",
                "Frau Lindemann erklärt sie ihm nach dem Urlaub.",
                "Herr Kaya schult ihn einzeln nach seinem Urlaub.",
              ],
              a: 2,
              why: "„Herr Jansen erhält nach seinem Urlaub eine Einzelschulung durch Herrn Kaya.“",
            },
            {
              q: "Was wurde zum Notdienst beschlossen?",
              opts: [
                "Alle Monteure übernehmen mindestens zwei Wochenenden.",
                "Nur Herr Wiese und Herr Kaya machen Notdienst.",
                "Frau Lindemann muss jeden Tausch vorher genehmigen.",
              ],
              a: 0,
              why: "„Beschluss: Jeder Monteur übernimmt mindestens zwei Wochenenden.“ Tausch klären die Kollegen selbst und informieren danach.",
            },
            {
              q: "Wer unterstützt Frau Petrović bei der Theorie?",
              opts: ["Herr Kaya", "Herr Brandt", "Herr Wiese"],
              a: 2,
              why: "„Für die Theorie bietet Herr Wiese ihr einmal pro Woche eine Stunde Prüfungsvorbereitung an.“ Herr Kaya ist für die Praxis zuständig.",
            },
            {
              q: "Was passiert am 22. Oktober?",
              opts: [
                "Herr Kaya bringt den Transporter zum TÜV.",
                "Herr Wiese fährt bei Herrn Kaya mit.",
                "Die Ideen für die Weihnachtsfeier werden vorgestellt.",
              ],
              a: 1,
              why: "TOP 4: Herr Wiese bringt den Transporter zum TÜV „und fährt an diesem Tag bei Herrn Kaya mit“.",
            },
          ],
        },
      ],
    },

    // ───────────────────────── LESEN UND SCHREIBEN ─────────────────────────
    {
      id: "lesen-schreiben",
      title: "Lesen und Schreiben",
      minutes: 20,
      note: "Erst die beiden Texte lesen und die Aufgaben 1–2 lösen, dann die Antwort-E-Mail schreiben. Planen Sie ca. 5 Minuten zum Lesen und 15 Minuten zum Schreiben ein.",
      parts: [
        {
          title: "Lesen und Schreiben Teil 1: Kundenbeschwerde verstehen",
          skill: "lesen",
          pts: 3,
          instr:
            "Sie arbeiten im Kundenservice der Firma Tafelwerk Catering in Münster. Lesen Sie die E-Mail einer Kundin und die Nachricht Ihrer Chefin. Welche Lösung (a, b oder c) ist richtig?",
          material: [
            {
              h: "E-Mail der Kundin",
              t: "Von: Martina Hoffmann, Ruhrtal Energie GmbH\nAn: Tafelwerk Catering, Kundenservice\nBetreff: Catering für unsere Jubiläumsfeier am 9. Oktober – Beschwerde\n\nSehr geehrte Damen und Herren,\n\nam 9. Oktober haben Sie das Buffet für unser 25-jähriges Firmenjubiläum mit 80 Gästen geliefert (Auftragsnummer 2026-1187). Leider war ich mit Ihrer Leistung sehr unzufrieden.\n\nVereinbart war die Lieferung um 11:30 Uhr, damit nach der Rede unseres Geschäftsführers um 12 Uhr gegessen werden kann. Ihr Fahrer kam jedoch erst um 12:40 Uhr – ohne vorher anzurufen. Unsere Gäste mussten fast eine Stunde warten, einige mussten sogar zu Terminen zurück, ohne etwas gegessen zu haben. Außerdem hatten wir ausdrücklich 20 vegetarische Portionen bestellt. Geliefert wurden nur ein kleiner Salat und eine Gemüsesuppe, die nach kurzer Zeit leer war. Das Essen selbst war geschmacklich in Ordnung, das möchte ich ausdrücklich sagen.\n\nFür eine Feier dieser Art ist das äußerst ärgerlich. Ich erwarte eine Erklärung und einen Vorschlag, wie Sie diesen Fehler wiedergutmachen. Die Rechnung werde ich erst bezahlen, wenn ich von Ihnen gehört habe.\n\nMit freundlichen Grüßen\nMartina Hoffmann\nAssistenz der Geschäftsführung",
            },
            {
              h: "Interne Nachricht Ihrer Chefin",
              t: "Von: Sabine Engel (Inhaberin)\nAn: Kundenservice\n\nHallo,\nbitte antworten Sie Frau Hoffmann heute noch in meinem Namen. Ruhrtal Energie ist ein wichtiger Kunde – wir machen im Dezember auch ihre Weihnachtsfeier!\n– Bitte für beide Probleme entschuldigen.\n– Verspätung erklären: Unser Lieferwagen hatte auf der A 40 eine Panne, der Ersatzwagen musste erst aus dem Betrieb kommen. Dass der Fahrer nicht angerufen hat, war nicht in Ordnung – wir haben mit ihm gesprochen. (Bitte nichts über Konsequenzen für den Fahrer schreiben!)\n– Vegetarische Portionen: Fehler bei uns in der Küche, die Bestellung wurde falsch übertragen. Ab sofort kontrolliert die Küchenleitung jede Bestellung vor der Auslieferung noch einmal.\n– Angebot: 25 % Nachlass auf die Rechnung. Neue Rechnung kommt nächste Woche, die alte bitte NICHT bezahlen.\n– Bei der Weihnachtsfeier bekommen sie das Dessertbuffet kostenlos.\n– Zum Schluss: Ich rufe sie gern persönlich an, wenn sie möchte – meine Durchwahl: 0251/48 39 27-12.\nDanke!\nS. Engel",
            },
          ],
          items: [
            {
              q: "Worüber beschwert sich Frau Hoffmann?",
              opts: [
                "über die späte Lieferung und fehlende vegetarische Gerichte",
                "über die Qualität des Essens und die hohe Rechnung",
                "über das unfreundliche Verhalten des Fahrers",
              ],
              a: 0,
              why: "Sie kritisiert die Lieferung um 12:40 statt 11:30 Uhr und dass statt 20 vegetarischer Portionen nur Salat und Suppe kamen; das Essen war „geschmacklich in Ordnung“.",
            },
            {
              q: "Was soll die Mitarbeiterin laut Frau Engel tun?",
              opts: [
                "Frau Hoffmann bitten, die alte Rechnung sofort zu bezahlen",
                "mitteilen, dass der Fahrer Konsequenzen tragen muss",
                "einen Nachlass und ein kostenloses Dessertbuffet anbieten",
              ],
              a: 2,
              why: "„Angebot: 25 % Nachlass“ und „das Dessertbuffet kostenlos“. Die alte Rechnung soll sie NICHT bezahlen, über den Fahrer soll nichts geschrieben werden.",
            },
          ],
        },
        {
          kind: "write",
          title: "Lesen und Schreiben Teil 2: Antwort an die Kundin",
          skill: "schreiben",
          pts: 15,
          instr:
            "Schreiben Sie im Auftrag von Frau Engel eine Antwort-E-Mail an Frau Hoffmann. Setzen Sie alle Anweisungen Ihrer Chefin um. Schreiben Sie mindestens 100 Wörter. Achten Sie auf Anrede, Gruß und einen höflichen, professionellen Ton.",
          options: [
            {
              h: "Antwort an Frau Hoffmann",
              situation:
                "Sie arbeiten im Kundenservice von Tafelwerk Catering. Frau Hoffmann (Ruhrtal Energie GmbH) hat sich über das Buffet zum Firmenjubiläum beschwert. Ihre Chefin, Frau Engel, hat Ihnen Anweisungen gegeben.",
              task: "Beantworten Sie die Beschwerde von Frau Hoffmann im Namen von Frau Engel. Gehen Sie auf alle Punkte der internen Nachricht ein.",
              points: [
                "Dank für die Rückmeldung und Entschuldigung für beide Probleme",
                "Erklärung der Verspätung (Panne, fehlender Anruf)",
                "Erklärung zu den vegetarischen Portionen und neue Kontrolle",
                "Angebot: 25 % Nachlass, neue Rechnung, alte nicht bezahlen",
                "kostenloses Dessertbuffet bei der Weihnachtsfeier",
                "Angebot eines persönlichen Anrufs von Frau Engel mit Durchwahl",
              ],
              muster:
                "Betreff: Ihre Beschwerde zum Jubiläumsbuffet am 9. Oktober (Auftrag 2026-1187)\n\nSehr geehrte Frau Hoffmann,\n\nvielen Dank für Ihre offene Rückmeldung. Im Namen von Frau Engel möchte ich mich bei Ihnen und Ihren Gästen ausdrücklich für die verspätete Lieferung und die fehlenden vegetarischen Portionen entschuldigen.\n\nUnser Lieferwagen hatte auf der A 40 leider eine Panne, und der Ersatzwagen musste erst aus unserem Betrieb kommen. Dass unser Fahrer Sie nicht angerufen hat, hätte nicht passieren dürfen; wir haben bereits mit ihm darüber gesprochen. Die vegetarischen Gerichte fehlten, weil Ihre Bestellung in unserer Küche falsch übertragen wurde. Ab sofort prüft unsere Küchenleitung jede Bestellung vor der Auslieferung noch einmal.\n\nAls Entschuldigung erhalten Sie 25 % Nachlass auf die Rechnung. Die neue Rechnung senden wir Ihnen nächste Woche zu – die bisherige bezahlen Sie bitte nicht. Außerdem ist das Dessertbuffet bei Ihrer Weihnachtsfeier für Sie kostenlos.\n\nFrau Engel ruft Sie auch gern persönlich an. Sie erreichen sie direkt unter 0251/48 39 27-12.\n\nMit freundlichen Grüßen\ni. A. [Ihr Name]\nTafelwerk Catering, Münster",
            },
          ],
          minWords: 100,
          check: [
            "Betreff, formelle Anrede („Sehr geehrte Frau Hoffmann“) und passender Gruß (mit „i. A.“)",
            "Dank und Entschuldigung für BEIDE Probleme",
            "Verspätung erklärt (Panne, Ersatzwagen) und fehlenden Anruf bedauert – ohne Konsequenzen für den Fahrer",
            "Fehler in der Küche erklärt und neue Kontrolle genannt",
            "Nachlass 25 %, neue Rechnung, alte nicht bezahlen",
            "kostenloses Dessertbuffet bei der Weihnachtsfeier",
            "Angebot des persönlichen Anrufs mit Durchwahl",
            "durchgehend Sie-Form, verbundene Sätze statt Stichpunkte",
          ],
        },
      ],
    },

    // ───────────────────────────── HÖREN ─────────────────────────────
    {
      id: "hoeren",
      title: "Hören",
      minutes: 20,
      note: "Lesen Sie vor jedem Hörtext die Aufgaben. Die Teile 1–3 hören Sie nur einmal, Teil 4 zweimal.",
      parts: [
        {
          title: "Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge",
          skill: "hoeren",
          pts: 3,
          instr:
            "Sie hören drei kurze Gespräche unter Kolleginnen und Kollegen. Zu jedem Gespräch gibt es eine Aussage (richtig oder falsch) und eine Aufgabe (a, b oder c). Sie hören jedes Gespräch einmal.",
          audio: [
            {
              h: "Gespräch 1 – im Lager",
              lines: [
                {
                  s: "m",
                  t: "Du, Aylin, hast du mal ’ne Sekunde? Mein Scanner spinnt schon wieder. Da steht nur: Verbindung fehlgeschlagen.",
                },
                {
                  s: "f",
                  t: "Ach nee, nicht schon wieder. Hast du ihn mal neu gestartet?",
                },
                {
                  s: "m",
                  t: "Ja, zweimal sogar. Nichts. Und die Sendung für Hagedorn muss um zwei raus. Das sind noch fünfzehn Paletten.",
                },
                {
                  s: "f",
                  t: "Hm. Also, die IT hat doch drüben in Halle zwei ein paar Ersatzgeräte. Aber jetzt ist Mittagspause, da ist keiner. Die sind erst um halb eins wieder da.",
                },
                { s: "m", t: "Halb eins? Mann, das wird knapp." },
                {
                  s: "f",
                  t: "Weißt du was? Nimm so lange meinen. Ich mach bis halb eins eh Inventur in Regal C, das geht auch mit der Liste. Da brauch ich keinen Scanner.",
                },
                {
                  s: "m",
                  t: "Echt jetzt? Das wär super. Dann hol ich mir um halb eins ein Ersatzgerät und bring dir deinen zurück.",
                },
                {
                  s: "f",
                  t: "Genau. Ach, und schreib bitte ’ne Störungsmeldung ins Ticketsystem, ja? Sonst passiert wieder nichts. Das ist jetzt schon das dritte Mal diesen Monat.",
                },
                {
                  s: "m",
                  t: "Mach ich. Sobald die Hagedorn-Sachen draußen sind.",
                },
              ],
            },
            {
              h: "Gespräch 2 – im Büro",
              lines: [
                {
                  s: "f",
                  t: "Ah, Herr Schulte, gut, dass ich Sie treffe. Sagen Sie mal, haben Sie für morgen um zehn den großen Besprechungsraum gebucht?",
                },
                {
                  s: "m",
                  t: "Ja, für den Workshop mit den neuen Azubis. Wieso?",
                },
                {
                  s: "f",
                  t: "Weil der Vertrieb ihn auch gebucht hat. Der steht im Kalender zweimal drin. Irgendwie hat das System das nicht gemerkt.",
                },
                {
                  s: "m",
                  t: "Na super. Und jetzt? Die Azubis haben die Einladung ja schon. Wie viele sind denn beim Vertrieb?",
                },
                {
                  s: "f",
                  t: "Die sind zu zwölft, mit Kunden aus Österreich. Und bei Ihnen?",
                },
                { s: "m", t: "Wir sind acht. Also, mit mir neun." },
                {
                  s: "f",
                  t: "Mhm. Also, mein Vorschlag wäre: Sie gehen in den Schulungsraum im dritten Stock. Da passen fünfzehn Leute rein, und ein Beamer ist auch da.",
                },
                {
                  s: "m",
                  t: "Der Schulungsraum? Moment mal, ist der nicht dienstags immer für den Englischkurs reserviert?",
                },
                {
                  s: "f",
                  t: "Normalerweise schon. Aber der Kurs fällt diese Woche aus, die Trainerin ist krank. Hab ich schon nachgeschaut.",
                },
                {
                  s: "m",
                  t: "Ach so. Okay, dann machen wir das so. Ich schick den Azubis gleich ’ne Mail mit dem neuen Raum.",
                },
                {
                  s: "f",
                  t: "Gut. Und ich sag der IT Bescheid wegen der doppelten Buchung. Das darf ja eigentlich nicht passieren.",
                },
              ],
            },
            {
              h: "Gespräch 3 – in der Restaurantküche",
              lines: [
                {
                  s: "m",
                  t: "Nadja, guck mal. Der Fischlieferant war grad da. Statt zwölf Kilo Lachs haben die nur sechs gebracht.",
                },
                {
                  s: "f",
                  t: "Was? Wir haben heute Mittag Lachs auf der Tageskarte! Und abends kommt die Gesellschaft mit dreißig Leuten.",
                },
                {
                  s: "m",
                  t: "Ja, eben. Ich hab schon angerufen. Die können den Rest erst morgen früh bringen.",
                },
                {
                  s: "f",
                  t: "Okay. Okay … lass uns kurz überlegen. Die Gesellschaft heute Abend hat das Menü fest bestellt, mit Lachs. Da können wir nichts ändern.",
                },
                {
                  s: "m",
                  t: "Das heißt, die sechs Kilo nehmen wir für heute Abend?",
                },
                {
                  s: "f",
                  t: "Genau. Und mittags ändern wir das Tagesgericht. Wir haben doch noch Hähnchenbrust, oder?",
                },
                {
                  s: "m",
                  t: "Ja, genug. Also … Hähnchen mit Kräutersoße statt Lachs?",
                },
                {
                  s: "f",
                  t: "Ja, machen wir. Schreib’s bitte gleich draußen an die Tafel und sag dem Service Bescheid. Und ich ruf den Lieferanten noch mal an. Wir wollen ’ne Gutschrift für die fehlende Ware.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              au: 0,
              q: "Der Mann hat seinen Scanner noch nicht neu gestartet.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Hast du ihn mal neu gestartet?“ – „Ja, zweimal sogar.“",
            },
            {
              au: 0,
              q: "Was schlägt die Frau vor?",
              opts: [
                "Er soll die Paletten mit einer Liste erfassen.",
                "Er soll sofort ein Ersatzgerät in Halle 2 holen.",
                "Er soll ihren Scanner benutzen, bis die IT wieder da ist.",
              ],
              a: 2,
              why: "„Nimm so lange meinen.“ Die Liste benutzt SIE für die Inventur; in Halle 2 ist bis halb eins niemand.",
            },
            {
              au: 1,
              q: "Der Vertrieb trifft sich morgen mit Kunden.",
              opts: ["Richtig", "Falsch"],
              a: 0,
              why: "„Die sind zu zwölft, mit Kunden aus Österreich.“",
            },
            {
              au: 1,
              q: "Warum ist der Schulungsraum morgen frei?",
              opts: [
                "Weil die IT ihn für den Workshop reserviert hat.",
                "Weil der Vertrieb lieber im großen Raum bleibt.",
                "Weil die Trainerin des Englischkurses krank ist.",
              ],
              a: 2,
              why: "„Der Kurs fällt diese Woche aus, die Trainerin ist krank.“",
            },
            {
              au: 2,
              q: "Der Lieferant bringt den restlichen Lachs noch heute.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Die können den Rest erst morgen früh bringen.“",
            },
            {
              au: 2,
              q: "Was beschließen die beiden?",
              opts: [
                "Mittags gibt es Hähnchen statt Lachs.",
                "Die Gesellschaft bekommt ein anderes Menü.",
                "Der Lachs wird für das Mittagessen verwendet.",
              ],
              a: 0,
              why: "„Mittags ändern wir das Tagesgericht“ – Hähnchen mit Kräutersoße; der Lachs bleibt für die Gesellschaft am Abend.",
            },
          ],
        },
        {
          title: "Hören Teil 2: Argumente",
          skill: "hoeren",
          pts: 3,
          instr:
            "Sie hören einen Ausschnitt aus einer Betriebsversammlung der Firma Westfalia Verpackungen. Es geht um ein Pilotprojekt „Vier-Tage-Woche“. Wer sagt was? Ordnen Sie die Aussagen 1–4 den Personen zu. Sie hören die Diskussion einmal.",
          audio: [
            {
              h: "Betriebsversammlung – Pilotprojekt Vier-Tage-Woche",
              lines: [
                {
                  s: "m2",
                  t: "So, liebe Kolleginnen und Kollegen, dann kommen wir zu Punkt drei, dem Pilotprojekt Vier-Tage-Woche. Kurz zur Idee: vier Tage mit je neuneinhalb Stunden statt fünf kürzerer Tage. Also weiterhin achtunddreißig Stunden pro Woche, beim gleichen Gehalt. Frau Kranz, Sie hatten sich für den Betriebsrat zuerst gemeldet. Bitte.",
                },
                {
                  s: "f",
                  t: "Ja, danke. Also, grundsätzlich finden wir vom Betriebsrat die Idee gut. Viele Kolleginnen und Kollegen haben uns gesagt, dass sie sich einfach einen Tag mehr Erholung wünschen. Aber, und das ist uns ganz wichtig, das Ganze muss freiwillig sein. Wer bei fünf Tagen bleiben will, muss das können. Ohne Nachteile. Und, na ja, neuneinhalb Stunden an der Maschine, das ist anstrengend, das wissen wir alle. Wir fordern deshalb eine zusätzliche Pause von fünfzehn Minuten.",
                },
                {
                  s: "m2",
                  t: "Danke, Frau Kranz. Herr Ölmez, Sie leiten die Produktion. Wie sehen Sie das?",
                },
                {
                  s: "m",
                  t: "Tja … ich will hier nicht der Spielverderber sein, ehrlich nicht. Aber ich muss an die Abläufe denken. Unsere Maschinen laufen von Montag bis Freitag, und die Kunden wollen ihre Ware auch freitags. Wenn jetzt alle am Freitag frei haben wollen, und das wollen natürlich alle, dann steht bei uns freitags die Halle leer. Also, wenn wir das machen, dann nur so, dass der freie Tag wechselt. Die eine Gruppe hat montags frei, die andere freitags, und alle paar Wochen wird getauscht. Und zur Freiwilligkeit, Frau Kranz: Das klingt gut, keine Frage. Aber dann muss ich zwei Modelle parallel planen. Das ist ein enormer Aufwand.",
                },
                {
                  s: "m2",
                  t: "Verstehe. Frau Weber, Sie arbeiten im Versand. Was sagen Sie dazu?",
                },
                {
                  s: "f2",
                  t: "Ja, also … ich seh das ein bisschen gemischt. Für Kollegen, die jeden Tag eine Stunde mit dem Auto herfahren, ist das natürlich super. Die sparen sich einen ganzen Tag Fahrerei, und die Spritkosten auch. Aber ich hab zwei kleine Kinder, und die Kita macht um halb fünf zu. Wenn ich da neuneinhalb Stunden arbeite, plus Pause, dann schaff ich das einfach nicht. Ich wär eher für mehr Gleitzeit, dass man morgens flexibler anfangen kann. Und, äh, ehrlich gesagt, Frau Kranz, nehmen Sie’s mir nicht übel: Eine Viertelstunde mehr Pause macht den Tag ja noch länger.",
                },
                { s: "f", t: "Nee, da haben Sie recht. Das müssen wir mitdenken." },
                {
                  s: "m2",
                  t: "Gut. Dann sammeln wir jetzt erst mal weitere Meinungen aus dem Saal. Ja, bitte, da hinten …",
                },
              ],
            },
          ],
          plays: 1,
          opts: [
            "a) Frau Kranz (Betriebsrat)",
            "b) Herr Ölmez (Produktionsleitung)",
            "c) Frau Weber (Versand)",
          ],
          items: [
            {
              q: "Für Beschäftigte mit einem weiten Arbeitsweg wäre das Modell ein großer Vorteil.",
              a: 2,
              why: "Frau Weber: „Für Kollegen, die jeden Tag eine Stunde mit dem Auto herfahren, ist das natürlich super.“",
            },
            {
              q: "Wenn jeder selbst entscheiden darf, ob er mitmacht, wird die Planung sehr aufwendig.",
              a: 1,
              why: "Herr Ölmez: „Zur Freiwilligkeit … dann muss ich zwei Modelle parallel planen. Das ist ein enormer Aufwand.“",
            },
            {
              q: "Bei so langen Arbeitstagen braucht man mehr Erholung während der Arbeitszeit.",
              a: 0,
              why: "Frau Kranz fordert „eine zusätzliche Pause von fünfzehn Minuten“. Frau Weber kritisiert diese Pause gerade.",
            },
            {
              q: "Ein flexibler Arbeitsbeginn wäre besser als vier lange Tage.",
              a: 2,
              why: "Frau Weber: „Ich wär eher für mehr Gleitzeit, dass man morgens flexibler anfangen kann.“",
            },
          ],
        },
        {
          title: "Hören Teil 3: Unternehmensinformationen",
          skill: "hoeren",
          pts: 3,
          instr:
            "Sie hören eine Präsentation am ersten Arbeitstag neuer Mitarbeiterinnen und Mitarbeiter. Welche Lösung (a, b oder c) ist richtig? Sie hören die Präsentation einmal.",
          audio: [
            {
              h: "Begrüßung bei Rhein-Ruhr Frischelogistik",
              lines: [
                {
                  s: "f",
                  t: "So, guten Morgen zusammen, und herzlich willkommen bei Rhein-Ruhr Frischelogistik! Mein Name ist Katrin Seidel, ich leite die Personalabteilung. Und ich freu mich wirklich, dass Sie heute alle hier sind. Zwölf neue Kolleginnen und Kollegen auf einmal, das ist ein Rekord für uns!",
                },
                {
                  s: "f",
                  t: "Ich möchte Ihnen in den nächsten Minuten kurz zeigen, wer wir eigentlich sind. Angefangen hat alles neunzehnhundertachtundneunzig. Unser Gründer, Reinhold Mertens, hat damals mit drei Kühl-Lkw Obst und Gemüse vom Großmarkt zu kleinen Lebensmittelgeschäften gefahren. Ein klassischer Familienbetrieb also. Seine Frau hat die Buchhaltung gemacht, und zwar am Küchentisch! Heute sind wir vierhundertzwanzig Beschäftigte, wir haben hundertdreißig Fahrzeuge und beliefern vor allem Supermärkte in ganz Nordrhein-Westfalen mit gekühlter Ware. Standorte haben wir drei: hier in Duisburg die Zentrale, dann Krefeld und Unna. In Unna haben wir zweitausendfünfundzwanzig eine neue Kühlhalle gebaut. Das ist eine der modernsten in der ganzen Region.",
                },
                {
                  s: "f",
                  t: "Und was haben wir vor? Ein großes Thema ist bei uns der Klimaschutz. Ab dem kommenden Frühjahr setzen wir in den Innenstädten von Duisburg und Düsseldorf zwölf Elektro-Lkw ein. Für die langen Strecken bleiben wir aber erst mal beim Diesel. Da ist die Technik, ehrlich gesagt, noch nicht so weit.",
                },
                {
                  s: "f",
                  t: "Jetzt zu dem, was Sie wahrscheinlich am meisten interessiert: Was bieten wir Ihnen? Wir zahlen nach Tarif, es gibt Urlaubsgeld und Weihnachtsgeld. Wer mit Bus und Bahn kommt, bekommt einen Zuschuss von dreißig Euro im Monat zum Deutschlandticket. Fahrrad-Leasing geht auch. Ich werde oft nach Firmenwagen gefragt. Die gibt’s bei uns aber nur für den Außendienst. Und eine eigene Kinderbetreuung … ja, das wünschen sich viele. Da sind wir mit der Stadt im Gespräch, aber versprechen kann ich Ihnen da noch nichts.",
                },
                {
                  s: "f",
                  t: "Und wie geht’s für Sie jetzt weiter? Jede und jeder von Ihnen bekommt für die ersten drei Monate einen Paten oder eine Patin. Also eine erfahrene Kollegin oder einen erfahrenen Kollegen aus Ihrer Abteilung, die Ihnen bei allen Fragen hilft. Sie lernen die Abläufe direkt am Arbeitsplatz kennen, nicht im Kursraum. Einen Pflichtkurs gibt es nur zum Thema Hygiene und Kühlkette, und der dauert einen Tag. So, und gleich machen wir eine kleine Führung durch die Halle. Kommen Sie bitte mit.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              q: "Was erfährt man über die Geschichte der Firma?",
              opts: [
                "Sie wurde von einer großen Supermarktkette gegründet.",
                "Sie begann als kleiner Familienbetrieb mit drei Lkw.",
                "Sie hatte von Anfang an drei Standorte.",
              ],
              a: 1,
              why: "„Angefangen hat alles neunzehnhundertachtundneunzig … mit drei Kühl-Lkw … Ein klassischer Familienbetrieb also.“",
            },
            {
              q: "Was plant die Firma für das kommende Jahr?",
              opts: [
                "Sie baut eine neue Kühlhalle in Unna.",
                "Sie fährt künftig nur noch mit Elektro-Lkw.",
                "Sie setzt in Innenstädten Elektro-Lkw ein.",
              ],
              a: 2,
              why: "„Ab dem kommenden Frühjahr setzen wir in den Innenstädten … zwölf Elektro-Lkw ein.“ Die Halle in Unna wurde schon 2025 gebaut; lange Strecken bleiben beim Diesel.",
            },
            {
              q: "Welche Leistung bietet die Firma allen Beschäftigten an?",
              opts: [
                "einen Zuschuss zum Deutschlandticket",
                "einen Firmenwagen",
                "eine betriebliche Kinderbetreuung",
              ],
              a: 0,
              why: "„Zuschuss von dreißig Euro im Monat zum Deutschlandticket.“ Firmenwagen nur für den Außendienst, Kinderbetreuung noch nicht sicher.",
            },
            {
              q: "Wie werden die neuen Mitarbeitenden eingearbeitet?",
              opts: [
                "Sie arbeiten die ersten Wochen an allen drei Standorten.",
                "Sie besuchen in den ersten drei Monaten einen Kurs.",
                "Eine erfahrene Kollegin oder ein Kollege begleitet sie.",
              ],
              a: 2,
              why: "„Jede und jeder … bekommt für die ersten drei Monate einen Paten oder eine Patin.“ Der Pflichtkurs dauert nur einen Tag.",
            },
          ],
        },
        {
          title: "Hören Teil 4: Anliegen am Telefon",
          skill: "hoeren",
          pts: 3,
          instr:
            "Sie hören fünf Nachrichten auf dem Anrufbeantworter. Welche Lösung (a, b oder c) ist richtig? Sie hören jede Nachricht zweimal.",
          audio: [
            {
              h: "Nachricht 1",
              lines: [
                {
                  s: "f",
                  t: "Ja, guten Tag, hier ist Bettina Kraus von der Linden-Apotheke. Ich ruf an wegen der Wochenlieferung für das Seniorenzentrum Am Stadtpark, und zwar für Ihren Bewohner Herrn Klaus Wendt, Zimmer zweihundertvierzehn, also zwei, eins, vier. Ähm, das Blutdruckmittel, das der Hausarzt verordnet hat, ist im Moment beim Hersteller nicht lieferbar. Wahrscheinlich die nächsten sechs Wochen nicht. Es gibt aber ein gleichwertiges Präparat von einer anderen Firma. Dafür brauchen wir allerdings ein neues Rezept, das alte können wir nicht einfach ändern. Könnten Sie bitte mit Doktor Hartmann Kontakt aufnehmen? Die restlichen Medikamente liefern wir ganz normal am Montag. Gut, vielen Dank, auf Wiederhören.",
                },
              ],
            },
            {
              h: "Nachricht 2",
              lines: [
                {
                  s: "m",
                  t: "Ja, hallo, ist da die Schreinerei Vogt? Ach so, der Anrufbeantworter. Also, hier ist Markus Albers. Äh, Sie wollten bei uns ja am Dienstag, dem siebenundzwanzigsten, die Küche montieren. Also, ich wär am Dienstag zwar zu Hause, das ist nicht das Problem. Aber der Installateur hat sich gemeldet: Er schafft die Wasseranschlüsse erst bis Mittwoch. Und ohne die können Sie die Spüle ja nicht anschließen. Die Küche selbst ist komplett da, die steht bei uns in der Garage. Ginge es vielleicht am Donnerstag oder Freitag? Rufen Sie mich doch bitte zurück, unter null zwei drei vier, fünfundfünfzig, einundsiebzig, null acht. Ich wiederhole: null zwei drei vier, fünf fünf, sieben eins, null acht. Danke, tschüss.",
                },
              ],
            },
            {
              h: "Nachricht 3",
              lines: [
                {
                  s: "f",
                  t: "Hallo, Herr Popescu, hier ist Lisa Hartwig von Personalservice Ruhr. Ich hab gute Nachrichten für Sie! Ab Montag haben Sie einen neuen Einsatz, und zwar bei der Firma Metallbau Krüger in Hagen. Erst mal für drei Monate. Arbeitsbeginn ist um sechs Uhr. Am ersten Tag seien Sie aber bitte schon um Viertel vor sechs am Tor zwei, da holt Sie der Schichtleiter ab, Herr Baumann. Den Einsatzvertrag haben Sie ja letzte Woche schon bei uns unterschrieben, und Ihr Foto für den Werksausweis haben wir auch schon. Denken Sie nur bitte an Ihre Sicherheitsschuhe! Arbeitskleidung bekommen Sie dort, Schuhe aber nicht. Wenn Sie noch Fragen haben, erreichen Sie mich unter null zwei drei drei eins, neunzig, vierundvierzig, zwölf. Also noch mal: null zwei drei drei eins, neun null, vier vier, eins zwei. Viel Erfolg, tschüss!",
                },
              ],
            },
            {
              h: "Nachricht 4",
              lines: [
                {
                  s: "m",
                  t: "Ja, guten Tag, Jens Kowalczyk hier, von der Firma Optima Software in Dortmund. Wir haben bei Ihnen im Hotel für den sechsten November den Tagungsraum Phoenix gebucht, und dazu ein Mittagessen für fünfundzwanzig Personen. Da gibt’s jetzt zwei Änderungen. Erstens haben sich mehr Leute angemeldet, wir sind jetzt zweiunddreißig. Und zweitens verschiebt sich unser Programm am Vormittag ein bisschen. Könnten wir das Mittagessen statt um zwölf erst um halb eins haben? Beim Menü bleibt alles wie besprochen, äh, nur bei den vegetarischen Essen, da sind es jetzt sechs statt vier. Rufen Sie mich bitte kurz zurück, ob der Raum für zweiunddreißig Personen groß genug ist. Meine Nummer ist null zwei drei eins, dreiundsiebzig, zweiundachtzig, fünfzig. Danke schön, auf Wiederhören.",
                },
              ],
            },
            {
              h: "Nachricht 5",
              lines: [
                {
                  s: "f",
                  t: "Guten Tag, hier spricht Monika Strauß aus der Buchhaltung von Papierhaus Lenz in Bielefeld. Ich ruf an wegen unserer Rechnung Nummer vierundvierzig einundsiebzig, vom zweiten Oktober. Sie haben den Betrag, also die tausendzweihundertachtundsechzig Euro, zweimal an uns überwiesen. Einmal am neunten und dann noch mal am vierzehnten Oktober. Das ist aber überhaupt kein Problem! Wir können Ihnen das Geld zurücküberweisen, oder wir verrechnen es mit Ihrer nächsten Bestellung. Bitte schreiben Sie mir kurz eine E-Mail, was Ihnen lieber ist. Die Adresse steht unten auf der Rechnung. Vielen Dank, und noch einen schönen Tag!",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              au: 0,
              q: "Was soll das Seniorenzentrum tun?",
              opts: [
                "sich beim Arzt um ein neues Rezept kümmern",
                "das Medikament direkt beim Hersteller bestellen",
                "die Lieferung am Montag abbestellen",
              ],
              a: 0,
              why: "„Dafür brauchen wir … ein neues Rezept … Könnten Sie bitte mit Doktor Hartmann Kontakt aufnehmen?“",
            },
            {
              au: 1,
              q: "Warum ruft Herr Albers an?",
              opts: [
                "Er ist am Dienstag nicht zu Hause.",
                "Die Wasseranschlüsse sind noch nicht fertig.",
                "Ein Teil der Küche wurde nicht geliefert.",
              ],
              a: 1,
              why: "„Der Installateur … schafft die Wasseranschlüsse erst bis Mittwoch.“ Er wäre zu Hause, und die Küche ist komplett da.",
            },
            {
              au: 2,
              q: "Was muss Herr Popescu mitbringen?",
              opts: [
                "seinen Einsatzvertrag",
                "ein Foto für den Werksausweis",
                "Sicherheitsschuhe",
              ],
              a: 2,
              why: "„Denken Sie nur bitte an Ihre Sicherheitsschuhe.“ Vertrag und Foto hat die Firma schon.",
            },
            {
              au: 3,
              q: "Was ändert sich bei der Buchung?",
              opts: [
                "Die Tagung findet an einem anderen Tag statt.",
                "Es kommen mehr Personen, und das Essen beginnt später.",
                "Alle Teilnehmenden möchten vegetarisch essen.",
              ],
              a: 1,
              why: "„Wir sind jetzt zweiunddreißig“ und Mittagessen „erst um halb eins“. Nur sechs Personen essen vegetarisch.",
            },
            {
              au: 4,
              q: "Was soll die Firma tun?",
              opts: [
                "per E-Mail mitteilen, was mit dem Geld passieren soll",
                "die zweite Überweisung bei der Bank zurückholen",
                "die nächste Bestellung erst später bezahlen",
              ],
              a: 0,
              why: "„Bitte schreiben Sie mir kurz eine E-Mail, was Ihnen lieber ist“ – Rücküberweisung oder Verrechnung.",
            },
          ],
        },
      ],
    },

    // ───────────────────────── HÖREN UND SCHREIBEN ─────────────────────────
    {
      id: "hoeren-schreiben",
      title: "Hören und Schreiben",
      minutes: 5,
      note: "Sie hören einen Anruf zweimal. Lösen Sie Aufgabe 1 und schreiben Sie dann eine Telefonnotiz für Ihre Kollegin. Machen Sie sich schon beim Hören Notizen.",
      parts: [
        {
          title: "Hören und Schreiben Teil 1: Anruf eines Kunden",
          skill: "hoeren",
          pts: 3,
          instr:
            "Sie arbeiten bei der Haustechnik Brandt GmbH in Bochum. Sie hören eine Nachricht auf der Mailbox. Welche Lösung (a, b oder c) ist richtig? Sie hören die Nachricht zweimal.",
          audio: [
            {
              h: "Mailbox – Haustechnik Brandt",
              lines: [
                {
                  s: "m",
                  t: "Ja, guten Tag, hier ist Frank Lindner von der Hausverwaltung Lindner und Partner in Witten. Ich hätte gern Frau Lindemann gesprochen, aber da geht keiner ran, deshalb sprech ich’s Ihnen jetzt auf. Es geht um das Mehrfamilienhaus in der Breite Straße siebzehn, also Breite Straße eins, sieben, in Witten-Annen. Da ist seit heute früh die Heizung komplett ausgefallen. Und warmes Wasser gibt’s auch nicht. Da wohnen sechs Parteien, unter anderem eine ältere Dame über neunzig, die friert jetzt natürlich. Ähm, die Anlage ist bei Ihnen in der Wartung, die letzte Wartung war im Mai, glaub ich. Wir bräuchten also dringend heute noch einen Techniker, am besten bis vier Uhr. Den Schlüssel für den Heizungskeller hat der Hausmeister, Herr Okafor. Der ist ab dreizehn Uhr im Haus. Seine Nummer ist null eins sieben sechs, dreiundzwanzig, fünfundvierzig, einundachtzig, neunzig. Also: null eins sieben sechs, zwei drei, vier fünf, acht eins, neun null. Und rufen Sie mich bitte zurück, wenn Sie wissen, wann jemand kommt. Am besten auf dem Handy: null eins sieben zwei, achtundneunzig, null eins, drei drei sechs. Ich wiederhole: null eins sieben zwei, neun acht, null eins, drei drei sechs. Ach so, und falls es heute wirklich nicht mehr geht, sagen Sie mir bitte gleich Bescheid. Dann besorg ich für die Mieter Heizlüfter. Ja, danke, tschüss!",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              au: 0,
              q: "Was möchte Herr Lindner?",
              opts: [
                "einen Termin für die nächste regelmäßige Wartung",
                "dass heute noch ein Techniker zur Heizung kommt",
                "dass die Firma Heizlüfter für die Mieter liefert",
              ],
              a: 1,
              why: "„Wir bräuchten also dringend heute noch einen Techniker, am besten bis vier Uhr.“ Heizlüfter besorgt er selbst, falls es heute nicht geht.",
            },
          ],
        },
        {
          kind: "write",
          title: "Hören und Schreiben Teil 2: Telefonnotiz",
          skill: "schreiben",
          pts: 10,
          instr:
            "Schreiben Sie für Ihre Kollegin Frau Lindemann (Disposition) eine Telefonnotiz zu diesem Anruf. Notieren Sie alle wichtigen Informationen. Stichpunkte sind erlaubt, die Notiz muss aber für Frau Lindemann ohne Rückfrage verständlich sein. Sie können die Nachricht hier noch einmal hören.",
          audio: [
            {
              h: "Mailbox – Haustechnik Brandt (Wiederholung)",
              lines: [
                {
                  s: "m",
                  t: "Ja, guten Tag, hier ist Frank Lindner von der Hausverwaltung Lindner und Partner in Witten. Ich hätte gern Frau Lindemann gesprochen, aber da geht keiner ran, deshalb sprech ich’s Ihnen jetzt auf. Es geht um das Mehrfamilienhaus in der Breite Straße siebzehn, also Breite Straße eins, sieben, in Witten-Annen. Da ist seit heute früh die Heizung komplett ausgefallen. Und warmes Wasser gibt’s auch nicht. Da wohnen sechs Parteien, unter anderem eine ältere Dame über neunzig, die friert jetzt natürlich. Ähm, die Anlage ist bei Ihnen in der Wartung, die letzte Wartung war im Mai, glaub ich. Wir bräuchten also dringend heute noch einen Techniker, am besten bis vier Uhr. Den Schlüssel für den Heizungskeller hat der Hausmeister, Herr Okafor. Der ist ab dreizehn Uhr im Haus. Seine Nummer ist null eins sieben sechs, dreiundzwanzig, fünfundvierzig, einundachtzig, neunzig. Also: null eins sieben sechs, zwei drei, vier fünf, acht eins, neun null. Und rufen Sie mich bitte zurück, wenn Sie wissen, wann jemand kommt. Am besten auf dem Handy: null eins sieben zwei, achtundneunzig, null eins, drei drei sechs. Ich wiederhole: null eins sieben zwei, neun acht, null eins, drei drei sechs. Ach so, und falls es heute wirklich nicht mehr geht, sagen Sie mir bitte gleich Bescheid. Dann besorg ich für die Mieter Heizlüfter. Ja, danke, tschüss!",
                },
              ],
            },
          ],
          plays: 2,
          options: [
            {
              h: "Telefonnotiz für Frau Lindemann",
              situation:
                "Herr Lindner von einer Hausverwaltung hat auf die Mailbox gesprochen. Frau Lindemann ist für die Einsatzplanung zuständig und war nicht erreichbar.",
              task: "Schreiben Sie eine Telefonnotiz mit diesen Angaben: Anrufer, Firma/Kontakt, Anliegen, Details (Adresse, Situation, Schlüssel), was zu tun ist.",
              points: [
                "Anrufer und Firma",
                "Rückrufnummer",
                "Anliegen (was ist passiert?)",
                "Details: Adresse, Hausmeister mit Telefonnummer, Zeitpunkt",
                "Was Frau Lindemann tun soll (inkl. Plan B)",
              ],
              muster:
                "TELEFONNOTIZ\nFür: Frau Lindemann (Disposition)\nVon: [Ihr Name], heute, 10:15 Uhr\n\nAnrufer: Herr Frank Lindner, Hausverwaltung Lindner & Partner, Witten\nRückruf: Handy 0172 / 98 01 336\n\nAnliegen: Im Mehrfamilienhaus Breite Straße 17, Witten-Annen, sind seit heute früh Heizung und Warmwasser komplett ausgefallen. 6 Parteien, u. a. eine Mieterin über 90 Jahre. Anlage ist bei uns in der Wartung (letzte Wartung: Mai).\n\nDetails: Schlüssel für den Heizungskeller hat Hausmeister Herr Okafor, ab 13 Uhr im Haus, Tel. 0176 / 23 45 81 90.\n\nBitte erledigen:\n1. Heute noch einen Techniker schicken, möglichst bis 16 Uhr.\n2. Herrn Lindner zurückrufen und Uhrzeit mitteilen.\n3. Falls heute nicht möglich: ihm sofort Bescheid geben – er besorgt dann Heizlüfter für die Mieter.\n\nDringend!",
            },
          ],
          minWords: 20,
          check: [
            "Name und Firma des Anrufers sowie Rückrufnummer korrekt notiert",
            "Anliegen klar: Heizung und Warmwasser ausgefallen, dringend",
            "Adresse und Kontakt des Hausmeisters (Name, Uhrzeit, Nummer) vollständig",
            "Aufgaben für Frau Lindemann eindeutig: Techniker heute bis 16 Uhr, Rückruf",
            "Plan B erwähnt (sofort Bescheid geben → Heizlüfter)",
            "Notiz ist ohne den Anruf verständlich (keine unklaren Abkürzungen)",
          ],
        },
      ],
    },

    // ───────────────────── SPRACHBAUSTEINE UND SCHREIBEN ─────────────────────
    {
      id: "sprachbausteine",
      title: "Sprachbausteine und Schreiben",
      minutes: 35,
      note: "Lösen Sie die Sprachbausteine zügig (ca. 10 Minuten) und nutzen Sie die restliche Zeit für den Forumsbeitrag.",
      parts: [
        {
          title: "Sprachbausteine Teil 1",
          skill: "schreiben",
          pts: 0.5,
          instr:
            "Lesen Sie die Mitarbeiterinformation. Welches Wort (a–j) passt in die Lücken 1–6? Jedes Wort können Sie nur einmal verwenden. Vier Wörter bleiben übrig.",
          material: [
            {
              h: "Mitarbeiterinformation – Medizintechnik Sauerland GmbH, Iserlohn",
              t: "Liebe Mitarbeiterinnen und Mitarbeiter,\n\n{1} der Umbauarbeiten im Erdgeschoss bleibt unsere Kantine vom 2. bis 13. November geschlossen. In dieser Zeit erhalten Sie in der Cafeteria im 2. Stock belegte Brötchen, Salate {2} eine warme Suppe.\n\nBitte bestellen Sie Ihr Mittagessen bis 10 Uhr über das Intranet, {3} unser Küchenteam genug Essen vorbereiten kann. {4} Sie eine Lebensmittelunverträglichkeit haben, geben Sie dies bitte bei der Bestellung an.\n\nIhre Essensmarken bleiben gültig; Sie können sie noch {5} Ende Dezember einlösen.\n\nAb dem 16. November begrüßen wir Sie gern in der neuen Kantine. Bei Fragen {6} der Bestellung wenden Sie sich bitte an Frau Yılmaz aus dem Personalbüro (Durchwahl -214).\n\nIhre Geschäftsführung",
            },
          ],
          opts: [
            "a) aufgrund",
            "b) damit",
            "c) obwohl",
            "d) sowie",
            "e) deshalb",
            "f) bis",
            "g) sobald",
            "h) falls",
            "i) bezüglich",
            "j) trotzdem",
          ],
          items: [
            {
              q: "",
              a: 0,
              why: "„Aufgrund der Umbauarbeiten“ – Präposition mit Genitiv, die einen Grund angibt.",
            },
            {
              q: "",
              a: 3,
              why: "„Brötchen, Salate sowie eine warme Suppe“ – „sowie“ = und (Aufzählung).",
            },
            {
              q: "",
              a: 1,
              why: "„…, damit unser Küchenteam genug Essen vorbereiten kann“ – Zweck (Verb am Ende).",
            },
            {
              q: "",
              a: 7,
              why: "„Falls Sie eine Unverträglichkeit haben, …“ – Bedingung. „Obwohl“ (Gegensatz) passt inhaltlich nicht.",
            },
            {
              q: "",
              a: 5,
              why: "„noch bis Ende Dezember einlösen“ – Zeitgrenze.",
            },
            {
              q: "",
              a: 8,
              why: "„Bei Fragen bezüglich der Bestellung“ – „bezüglich“ = zum Thema (mit Genitiv).",
            },
          ],
        },
        {
          title: "Sprachbausteine Teil 2",
          skill: "schreiben",
          pts: 0.5,
          instr:
            "Lesen Sie die E-Mail. Welche Lösung (a, b oder c) passt in die Lücken 1–6?",
          material: [
            {
              h: "E-Mail an eine Geschäftspartnerin",
              t: "Betreff: Produktvorstellung am 4. November\n\nSehr geehrte Frau Albers,\n\nvielen Dank für Ihre E-Mail {1} 12. Oktober. Gern {2} ich Ihnen den Termin für die Vorstellung unserer neuen Pflegebetten am 4. November um 10 Uhr.\n\nLeider ist unser Besprechungsraum an diesem Tag bereits {3}. Wir würden Sie daher gern in Ihrer Einrichtung in Kassel besuchen, {4} das für Sie in Ordnung ist. Für die Präsentation {5} wir einen Beamer und eine Steckdose in der Nähe.\n\nFür Rückfragen stehe ich Ihnen jederzeit gern {6} Verfügung.\n\nMit freundlichen Grüßen\nTobias Reinhardt\nVertrieb, Medizintechnik Sauerland GmbH",
            },
          ],
          items: [
            {
              q: "",
              opts: ["am", "vom", "seit"],
              a: 1,
              why: "„Ihre E-Mail vom 12. Oktober“ – Datum eines Schreibens mit „vom“.",
            },
            {
              q: "",
              opts: ["bestätige", "bescheinige", "bestimme"],
              a: 0,
              why: "„einen Termin bestätigen“ ist die feste Verbindung.",
            },
            {
              q: "",
              opts: ["verlegt", "vergeben", "verbucht"],
              a: 1,
              why: "„Der Raum ist bereits vergeben“ = schon reserviert.",
            },
            {
              q: "",
              opts: ["sodass", "obwohl", "sofern"],
              a: 2,
              why: "„sofern“ = falls, wenn (höfliche Bedingung). „sodass“ (Folge) und „obwohl“ (Gegensatz) passen inhaltlich nicht.",
            },
            {
              q: "",
              opts: ["benötigen", "bedürfen", "verfügen"],
              a: 0,
              why: "„etwas benötigen“ (+ Akk.). „bedürfen“ braucht den Genitiv, „verfügen“ die Präposition „über“.",
            },
            {
              q: "",
              opts: ["in", "zu", "zur"],
              a: 2,
              why: "Feste Wendung: „jemandem zur Verfügung stehen“.",
            },
          ],
        },
        {
          kind: "write",
          title: "Schreiben: Beitrag im Mitarbeiterforum",
          skill: "schreiben",
          pts: 29,
          instr:
            "Im Intranet Ihrer Firma gibt es ein Mitarbeiterforum. Wählen Sie eines der beiden Themen und schreiben Sie einen Beitrag. Äußern Sie Ihre Meinung, begründen Sie sie und nennen Sie Beispiele aus Ihrer Erfahrung. Schreiben Sie mindestens 150 Wörter.",
          options: [
            {
              h: "Thema A: Vier-Tage-Woche",
              situation:
                "Die Geschäftsleitung überlegt, als Test für ein Jahr die Vier-Tage-Woche einzuführen: gleiche Wochenstunden, aber verteilt auf vier längere Arbeitstage. Im Mitarbeiterforum wird darüber diskutiert.",
              task: "Schreiben Sie einen Forumsbeitrag: Was halten Sie von der Vier-Tage-Woche mit längeren Arbeitstagen?",
              points: [
                "Ihre Meinung zur Vier-Tage-Woche",
                "Vorteile und Nachteile",
                "Beispiele aus Ihrem Arbeitsalltag oder Ihrem Umfeld",
                "ein Vorschlag, wie man den Test gestalten könnte",
              ],
              muster:
                "Liebe Kolleginnen und Kollegen,\n\ndie Idee, die Vier-Tage-Woche ein Jahr lang zu testen, finde ich grundsätzlich gut – allerdings nur unter bestimmten Bedingungen.\n\nDer größte Vorteil liegt für mich auf der Hand: Ein zusätzlicher freier Tag bedeutet mehr Zeit für Familie, Erholung und Termine, für die man sonst Urlaub nehmen müsste. Wer wie ich jeden Tag 40 Minuten pendelt, spart außerdem Fahrzeit und Benzin. Ich bin überzeugt, dass ausgeruhte Mitarbeitende motivierter sind und seltener krank werden.\n\nAndererseits darf man die Nachteile nicht unterschätzen. Neuneinhalb Stunden am Tag sind gerade in der Produktion sehr anstrengend, und gegen Ende der Schicht steigt das Unfallrisiko. Eine Kollegin von mir hat zwei kleine Kinder; da die Kita um 16:30 Uhr schließt, könnte sie bei längeren Tagen gar nicht mitmachen.\n\nDeshalb schlage ich vor, dass die Teilnahme freiwillig ist und dass Eltern andere Lösungen wie Gleitzeit bekommen. Außerdem sollte der freie Tag in den Teams wechseln, damit wir auch freitags für unsere Kunden erreichbar sind. Nach sechs Monaten könnten wir alle befragen und dann gemeinsam entscheiden, ob wir weitermachen.\n\nViele Grüße\n[Ihr Name], Versand",
            },
            {
              h: "Thema B: Erreichbarkeit nach Feierabend",
              situation:
                "Seit einigen Monaten haben viele Beschäftigte ein Diensthandy. Die Geschäftsleitung fragt im Mitarbeiterforum, ob es Regeln für die Erreichbarkeit nach Feierabend und am Wochenende geben soll.",
              task: "Schreiben Sie einen Forumsbeitrag: Sollen Beschäftigte nach Feierabend für die Firma erreichbar sein?",
              points: [
                "Ihre Meinung zur Erreichbarkeit nach Feierabend",
                "Gründe dafür und dagegen",
                "Beispiele aus Ihrem Arbeitsalltag",
                "ein Vorschlag für klare Regeln",
              ],
              muster:
                "Hallo zusammen,\n\nich finde es richtig, dass wir über dieses Thema sprechen, denn das Diensthandy hat unseren Arbeitsalltag stark verändert. Meiner Meinung nach sollten wir nach Feierabend grundsätzlich nicht erreichbar sein müssen – mit wenigen, klar geregelten Ausnahmen.\n\nNatürlich verstehe ich, dass es manchmal schnell gehen muss. Wenn zum Beispiel ein Lkw mit Kühlware am Abend nicht entladen werden kann, ist ein kurzer Anruf sinnvoll. Solche Notfälle sind aber selten. In meinem Team bekommen wir dagegen fast jeden Abend E-Mails, die problemlos bis zum nächsten Morgen warten könnten. Viele lesen sie trotzdem, weil sie Angst haben, etwas zu verpassen. Das führt dazu, dass man innerlich nie richtig abschaltet. Eine Kollegin hat mir erzählt, dass sie deshalb schlecht schläft.\n\nIch schlage daher vor, dass wir eine feste Regel einführen: Nach 18 Uhr und am Wochenende werden keine E-Mails erwartet. Für echte Notfälle sollte es eine Rufbereitschaft geben, die im Voraus geplant und zusätzlich bezahlt wird. So weiß jede und jeder, wann sie oder er zuständig ist – und wann nicht.\n\nViele Grüße\n[Ihr Name], Disposition",
            },
          ],
          minWords: 150,
          check: [
            "Einleitung mit klarer eigener Meinung",
            "mindestens zwei Gründe, gut begründet (weil, da, denn, deshalb …)",
            "konkrete Beispiele aus Arbeitsalltag oder Umfeld",
            "Gegenargumente berücksichtigt (einerseits – andererseits, zwar – aber)",
            "konkreter Vorschlag am Ende",
            "passender Ton für ein Mitarbeiterforum (Anrede an Kolleginnen und Kollegen, Gruß)",
            "Absätze und Konnektoren, abwechslungsreicher Wortschatz",
            "mindestens 150 Wörter",
          ],
        },
      ],
    },

    // ───────────────────────────── SPRECHEN ─────────────────────────────
    {
      id: "sprechen",
      title: "Sprechen",
      minutes: 16,
      prepMinutes: 0,
      note: "Paarprüfung ohne Vorbereitungszeit. Teil 1A und 1B sprechen Sie allein mit den Prüfenden, Teil 2 und 3 mit Ihrer Partnerin oder Ihrem Partner. Sprechen Sie laut – nutzen Sie die Muster nach Ihrem Versuch zum Vergleich.",
      parts: [
        {
          kind: "speak",
          title: "Teil 1A: Über ein Thema sprechen",
          skill: "sprechen",
          pts: 12,
          minutes: 2,
          instr:
            "Wählen Sie eines der beiden Themen und sprechen Sie ca. 2 Minuten darüber. Die Prüfenden unterbrechen Sie nicht.",
          task: "Thema A: Weiterbildung im Beruf\nThema B: Homeoffice\n\nSprechen Sie über:\n– Ihre eigenen Erfahrungen\n– die Situation in Ihrem Beruf / Ihrer Branche (oder in Ihrem Herkunftsland)\n– Vor- und Nachteile\n– Ihre Meinung",
          redemittel: [
            "Ich habe mich für das Thema … entschieden, weil …",
            "In meinem Beruf als … habe ich die Erfahrung gemacht, dass …",
            "In meiner Branche ist es üblich, dass …",
            "Ein großer Vorteil ist …, ein Nachteil dagegen …",
            "Zusammenfassend würde ich sagen, dass …",
          ],
          muster:
            "Ich habe mich für das Thema „Weiterbildung im Beruf“ entschieden, weil es für mich gerade sehr aktuell ist.\n\nIch arbeite seit vier Jahren als Lagerhelfer bei einer Spedition. Letztes Jahr habe ich den Staplerschein gemacht – die Firma hat den Kurs bezahlt, und er fand in der Arbeitszeit statt. Seitdem darf ich andere Aufgaben übernehmen und verdiene auch etwas mehr. Jetzt überlege ich, den Abschluss als Fachkraft für Lagerlogistik nachzuholen.\n\nIn der Logistik verändert sich gerade sehr viel: Fast alles läuft über Scanner und Software. Wer da nicht mitlernt, wird schnell abgehängt. In meinem Herkunftsland war Weiterbildung eher etwas für Akademiker; in Deutschland habe ich gemerkt, dass es auch für Arbeiter viele Möglichkeiten gibt, zum Beispiel über die Agentur für Arbeit.\n\nDie Vorteile liegen auf der Hand: bessere Chancen, mehr Sicherheit und oft mehr Geld. Ein Nachteil ist, dass viele Kurse abends oder am Wochenende stattfinden. Mit Familie und Schichtarbeit ist das ziemlich anstrengend.\n\nMeiner Meinung nach sollten Betriebe Weiterbildungen stärker unterstützen – zum Beispiel mit Freistellung oder flexiblen Schichten. Davon profitieren am Ende beide Seiten.",
          check: [
            "Thema klar eingeleitet",
            "eigene Erfahrungen konkret geschildert",
            "Situation in Branche/Herkunftsland beschrieben",
            "Vor- und Nachteile genannt",
            "eigene Meinung mit Begründung und kurzer Schluss",
            "ca. 2 Minuten frei gesprochen, Konnektoren verwendet",
          ],
        },
        {
          kind: "speak",
          title: "Teil 1B: Fragen beantworten",
          skill: "sprechen",
          pts: 12,
          minutes: 2,
          instr:
            "Die Prüfenden stellen Ihnen Fragen zu Ihrem Thema. Antworten Sie ausführlich (2–4 Sätze) und begründen Sie Ihre Antworten. (Hier: Fragen zum Thema „Weiterbildung im Beruf“; zum Thema Homeoffice wären die Fragen ähnlich.)",
          task: "Beantworten Sie die Nachfragen der Prüfenden zu Ihrem Thema.",
          prompts: [
            "Sie haben gesagt, Weiterbildung ist mit Familie und Schichtarbeit anstrengend. Wer sollte Ihrer Meinung nach die Kosten tragen, der Betrieb oder die Beschäftigten?",
            "Sollten Weiterbildungen in der Arbeitszeit oder in der Freizeit stattfinden?",
            "Und was würden Sie tun, wenn Ihr Arbeitgeber eine Weiterbildung ablehnt?",
            "Eine letzte Frage noch: Glauben Sie, dass Online-Kurse eine gute Alternative sind?",
          ],
          redemittel: [
            "Das ist eine gute Frage. Ich denke, …",
            "Das hängt davon ab, ob …",
            "Wenn das passieren würde, würde ich zuerst …",
            "Einerseits …, andererseits …",
          ],
          muster:
            "1) Ich finde, das hängt vom Kurs ab. Wenn die Weiterbildung direkt für die Arbeit im Betrieb nötig ist, wie der Staplerschein, sollte die Firma zahlen. Wenn jemand dagegen einen Kurs für einen ganz anderen Beruf macht, ist es fair, dass er sich beteiligt.\n\n2) Am liebsten in der Arbeitszeit, weil man sonst nach einer Frühschicht einfach zu müde zum Lernen ist. Ein Kompromiss wäre: halb Arbeitszeit, halb Freizeit.\n\n3) Zuerst würde ich nach den Gründen fragen, vielleicht ist es nur ein Zeitproblem. Dann würde ich mit dem Betriebsrat sprechen oder mich informieren, ob ich Bildungsurlaub nehmen kann.\n\n4) Teilweise ja. Für Theorie, zum Beispiel Software, sind Online-Kurse praktisch, weil man sich die Zeit selbst einteilen kann. Aber für praktische Dinge, etwa Staplerfahren, braucht man Präsenzunterricht.",
          check: [
            "auf jede Frage direkt eingegangen",
            "Antworten begründet (weil, deshalb, wenn …)",
            "Beispiele genannt",
            "Konjunktiv II für Hypothesen genutzt (würde, könnte)",
            "flüssig, ohne lange Pausen",
          ],
        },
        {
          kind: "speak",
          title: "Teil 2: Gespräch mit Kollegen",
          skill: "sprechen",
          pts: 16,
          minutes: 3,
          instr:
            "Sie sprechen mit einer Kollegin / einem Kollegen in der Pause. Sie arbeiten beide in einem Seniorenzentrum. Reagieren Sie auf die Fragen, erzählen Sie von Ihren Erfahrungen und geben Sie Tipps. Fragen Sie auch nach.",
          task: "Ihr Kollege wechselt nächsten Monat von der festen Frühschicht in den Wechseldienst (Früh-, Spät- und Nachtdienst). Sie arbeiten schon seit Jahren im Wechseldienst. Er fragt Sie nach Ihren Erfahrungen.\n\n– Erzählen Sie von Ihren Erfahrungen.\n– Geben Sie Tipps (Schlaf, Familie, Freizeit).\n– Fragen Sie nach seiner Situation.\n– Bieten Sie Hilfe an.",
          prompts: [
            "Du, sag mal, ich muss ab nächstem Monat in den Wechseldienst. Du machst das doch schon lange. Wie ist das so?",
            "Und die Nachtdienste? Davor hab ich ehrlich gesagt am meisten Angst. Wie schaffst du das, tagsüber zu schlafen?",
            "Hm. Meine Frau arbeitet auch Vollzeit, und wir haben zwei Kinder. Wie kriegst du das mit der Familie hin?",
            "Meinst du, ich kann mit der Pflegedienstleitung mal über meinen Dienstplan reden?",
          ],
          redemittel: [
            "Also, am Anfang war das für mich auch …",
            "Was mir sehr geholfen hat, ist …",
            "An deiner Stelle würde ich …",
            "Wie ist das denn bei euch zu Hause?",
            "Wenn du willst, kann ich …",
          ],
          muster:
            "A (Kollege): Du, ich muss ab nächstem Monat in den Wechseldienst. Du machst das doch schon lange – wie ist das so?\nB (Sie): Ehrlich gesagt war es am Anfang auch für mich schwierig. Aber inzwischen finde ich es gar nicht schlecht. Ich habe öfter mal unter der Woche frei und kann Termine erledigen, wenn die Ämter offen sind.\nA: Und die Nachtdienste? Davor habe ich am meisten Angst. Wie schaffst du es, tagsüber zu schlafen?\nB: Das ist wirklich der wichtigste Punkt. Ich habe mir Verdunklungsrollos gekauft und schalte das Handy aus. Und nach dem Nachtdienst esse ich nur etwas Leichtes und gehe direkt ins Bett. Hast du ein ruhiges Schlafzimmer?\nA: Na ja, es geht zur Straße raus. Meine Frau arbeitet auch Vollzeit, und wir haben zwei Kinder. Wie bekommst du das mit der Familie hin?\nB: Bei uns hängt der Dienstplan groß in der Küche, so weiß jeder Bescheid. Wir planen die Woche immer am Sonntag zusammen. Wie alt sind eure Kinder denn?\nA: Fünf und acht.\nB: Dann würde ich an deiner Stelle mit der Pflegedienstleitung sprechen. Vielleicht kannst du feste Tage für Nachtdienste bekommen, zum Beispiel immer am Wochenende, wenn deine Frau zu Hause ist.\nA: Meinst du, das klappt?\nB: Fragen kostet nichts. Bei mir hat es geklappt. Wenn du willst, komme ich mit, oder wir tauschen am Anfang mal einen Dienst. Und bei deinem ersten Nachtdienst bin ich sowieso auch eingeteilt – dann zeige ich dir alles.\nA: Super, danke dir!",
          check: [
            "Erfahrungen anschaulich erzählt",
            "konkrete Tipps gegeben",
            "Rückfragen gestellt (Interesse gezeigt)",
            "Hilfe angeboten",
            "informelles „du“ durchgehend und passend",
            "auf die Äußerungen des Kollegen eingegangen",
          ],
        },
        {
          kind: "speak",
          title: "Teil 3: Lösungen finden",
          skill: "sprechen",
          pts: 20,
          minutes: 5,
          instr:
            "Sie arbeiten mit Ihrer Partnerin / Ihrem Partner im selben Team. Es gibt ein Problem. Sammeln Sie Vorschläge, diskutieren Sie Vor- und Nachteile und einigen Sie sich auf eine Lösung.",
          task: "Situation: Sie arbeiten in einem Seniorenzentrum. Für Weihnachten und Silvester fehlt Personal: Drei Kolleginnen sind länger krank, und sehr viele haben Urlaub beantragt. Die Wohnbereichsleitung bittet Sie beide, bis Freitag einen Vorschlag zu machen.\n\nMögliche Ideen:\n– Zeitarbeitskräfte oder Springer\n– Bonus / höhere Zuschläge für Feiertagsdienste\n– Rotation: Wer letztes Jahr frei hatte, arbeitet dieses Jahr\n– Teilzeitkräfte fragen, ob sie freiwillig mehr arbeiten\n– kürzere Dienste an den Feiertagen\n– eigene Ideen",
          prompts: [
            "Also, ich hab mir das mal angeschaut. Uns fehlen an beiden Feiertagen jeweils drei Leute im Frühdienst. Was meinst du, was sollen wir vorschlagen?",
            "Hm, Zeitarbeit find ich schwierig. Die kennen die Bewohner nicht. Und gerade an Weihnachten sind viele traurig und brauchen vertraute Gesichter.",
            "Eine Rotation klingt fair, ja. Aber was ist mit Kolleginnen mit kleinen Kindern? Die wollen an Heiligabend natürlich zu Hause sein.",
            "Und wie überzeugen wir die Teilzeitkräfte? Nur mit einem freundlichen Bitte wird das nicht klappen.",
            "Okay, dann fassen wir mal zusammen. Was schlagen wir der Wohnbereichsleitung vor?",
          ],
          redemittel: [
            "Ich schlage vor, dass …",
            "Was hältst du davon, wenn …?",
            "Das ist ein guter Punkt, aber …",
            "Da hast du recht. Wie wäre es dann mit …?",
            "Ich sehe das etwas anders, weil …",
            "Könnten wir uns darauf einigen, dass …?",
            "Gut, dann machen wir es so: Erstens …, zweitens …",
          ],
          muster:
            "A: Also, ich habe mir das angeschaut – es fehlen uns an beiden Feiertagen jeweils drei Leute im Frühdienst. Was meinst du, was sollen wir vorschlagen?\nB: Hm, schwierig. Ich würde als Erstes an Zeitarbeitskräfte denken. Dann wäre das Problem schnell gelöst.\nA: Zeitarbeit finde ich schwierig. Die kennen die Bewohner nicht, und gerade an Weihnachten sind viele traurig und brauchen vertraute Gesichter.\nB: Da hast du recht. Vielleicht nur eine Zeitarbeitskraft für einfachere Aufgaben, und sonst unser eigenes Team? Was hältst du von einer Rotation? Wer letztes Jahr frei hatte, arbeitet dieses Jahr.\nA: Eine Rotation klingt fair, aber was ist mit Kolleginnen mit kleinen Kindern? Die wollen an Heiligabend natürlich zu Hause sein.\nB: Das verstehe ich. Man könnte es so machen: Eltern bekommen Heiligabend frei, arbeiten dafür aber an Silvester. Dann ist es trotzdem gerecht.\nA: Gute Idee. Und wie überzeugen wir die Teilzeitkräfte? Nur mit „bitte“ wird das nicht klappen.\nB: Ich schlage vor, dass wir einen Bonus anbieten, zum Beispiel 100 Euro extra pro Feiertagsdienst, zusätzlich zu den normalen Zuschlägen. Und die Stunden können sie im Januar abbauen.\nA: Das fände ich auch motivierend. Ob die Leitung das Geld genehmigt, wissen wir natürlich nicht.\nB: Stimmt, das müssen wir fragen. Aber eine Zeitarbeitskraft kostet ja auch viel.\nA: Okay, fassen wir zusammen: Was schlagen wir der Wohnbereichsleitung vor?\nB: Erstens: Rotation, aber Eltern haben Heiligabend frei und arbeiten an Silvester. Zweitens: Teilzeitkräfte freiwillig mit Bonus und Freizeitausgleich im Januar. Und drittens: nur wenn dann noch jemand fehlt, eine Zeitarbeitskraft.\nA: Einverstanden. Ich schreibe das morgen zusammen und schicke es dir, bevor wir es abgeben.",
          check: [
            "eigene Vorschläge eingebracht",
            "Vor- und Nachteile abgewogen",
            "auf Argumente der Partnerin / des Partners reagiert",
            "Kompromisse gesucht",
            "am Ende klare gemeinsame Lösung zusammengefasst",
            "Redemittel für Zustimmung, Widerspruch und Vorschläge verwendet",
            "höflich und kooperativ",
          ],
        },
      ],
    },
  ],

  // ───────────────────────────── VORBEREITUNG ─────────────────────────────
  prep: {
    lead: "Der DTB B2 ist die Abschlussprüfung der Berufssprachkurse auf B2-Niveau. Alle Texte und Gespräche kommen aus dem Arbeitsleben: E-Mails, Protokolle, Telefonate, Besprechungen. Wer den Aufbau kennt und die typischen Fallen vermeidet, holt deutlich mehr Punkte.",
    facts: [
      [
        "Dauer",
        "ca. 125 Minuten schriftlich + ca. 16 Minuten mündlich (Paarprüfung, keine Vorbereitungszeit)",
      ],
      ["Punkte", "240 Punkte, je 60 für Lesen, Hören, Schreiben und Sprechen"],
      [
        "Bestehen (B2)",
        "mind. 144 Punkte gesamt; in mind. drei Fertigkeiten mind. 60 % (36 Punkte), in der schwächsten Fertigkeit mind. 40 % (24 Punkte)",
      ],
      ["Anbieter", "telc gGmbH im Auftrag des BAMF"],
      [
        "Wer braucht sie?",
        "Teilnehmende am Berufssprachkurs B2 (Abschluss), Nachweis für Anerkennungsverfahren (z. B. Pflege), Bewerbung und Arbeit",
      ],
    ],
    parts: [
      {
        name: "Lesen Teil 1: Informationen zum Arbeitsmarkt",
        skill: "Lesen",
        time: "ca. 12 Min.",
        what: "Sie lesen fünf kurze Situationen von Personen, die eine Stelle oder Weiterbildung suchen, und ordnen ihnen Anzeigen zu. Drei Anzeigen bleiben übrig.",
        steps: [
          "Unterstreichen Sie bei jeder Person 2–3 harte Bedingungen (z. B. keine Nachtdienste, berufsbegleitend, Teilzeit).",
          "Prüfen Sie jede Anzeige gegen ALLE Bedingungen – eine passende reicht nicht.",
          "Beginnen Sie mit der Person, die am eindeutigsten ist.",
          "Streichen Sie verwendete Anzeigen durch.",
        ],
        traps: [
          "Anzeige passt zum Beruf, aber nicht zur Arbeitszeit (z. B. Pflegeheim mit Nachtdienst).",
          "Vollzeit-Umschulung für jemanden, der seine Stelle behalten will.",
          "Anpassungsqualifizierung, obwohl der Abschluss schon anerkannt ist.",
        ],
        tip: "Die Anzeigen mit den meisten gleichen Wörtern wie die Situation sind oft die Falle. Achten Sie auf Bedingungen, nicht auf Stichwörter.",
        mini: {
          instr: "Welche Anzeige passt? Eine Anzeige bleibt übrig.",
          material: [
            {
              h: "a) Café Mohnblume, Hagen",
              t: "Aushilfe im Service gesucht, samstags und sonntags 9–15 Uhr, auf Minijob-Basis. Erfahrung nicht nötig.",
            },
            {
              h: "b) Restaurant Zum Anker, Hagen",
              t: "Servicekraft in Vollzeit, Dienstag bis Samstag 16–24 Uhr. Erfahrung in der Gastronomie erforderlich.",
            },
            {
              h: "c) Fahrschule Lenz – Staplerschein",
              t: "Gabelstapler-Führerschein in zwei Tagen (Theorie + Praxis), Kurse jeden Monat. Auch am Wochenende.",
            },
          ],
          opts: [
            "a) Café Mohnblume",
            "b) Restaurant Zum Anker",
            "c) Fahrschule Lenz",
          ],
          items: [
            {
              q: "Lena studiert und sucht einen Nebenjob nur am Wochenende, am liebsten in einem Café.",
              a: 0,
              why: "a) Minijob samstags und sonntags; b) ist Vollzeit unter der Woche.",
            },
            {
              q: "Yusuf arbeitet im Lager und möchte schnell lernen, wie man einen Gabelstapler fährt.",
              a: 2,
              why: "c) Staplerschein in zwei Tagen.",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 2: Anweisungen verstehen",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Sie lesen einen Regeltext aus dem Betrieb, z. B. eine Hausmitteilung zum Arbeitsschutz oder zur Hygiene. Dazu gibt es Richtig/Falsch-Aussagen und Aufgaben mit a, b, c.",
        steps: [
          "Lesen Sie zuerst die Aufgaben und markieren Sie das Thema jeder Aufgabe.",
          "Suchen Sie den passenden Absatz – die Reihenfolge entspricht meist dem Text.",
          "Achten Sie auf Wörter wie „nur“, „auch“, „zusätzlich“, „neu“, „weiterhin“.",
          "Bei Richtig/Falsch: Ein einziges falsches Detail macht die Aussage falsch.",
        ],
        traps: [
          "„jeder/alle/immer“ in der Aussage, aber Einschränkungen im Text.",
          "Vertauschte Zuständigkeiten (Empfang statt Personalbüro).",
          "Alte und neue Regel werden verwechselt.",
        ],
        tip: "Regeltexte haben oft Ausnahmen in einem Nebensatz. Lesen Sie den ganzen Satz bis zum Punkt.",
        mini: {
          instr: "Lesen Sie die Regel. Richtig oder falsch?",
          material: [
            {
              h: "Hygieneregel Küche",
              t: "Schmuck und Uhren sind in der Küche nicht erlaubt. Ausgenommen sind schlichte Eheringe, wenn Sie bei der Arbeit Einmalhandschuhe tragen. Haare müssen vollständig unter der Haube sein.",
            },
          ],
          opts: ["Richtig", "Falsch"],
          items: [
            {
              q: "In der Küche darf man keinerlei Ringe tragen.",
              a: 1,
              why: "Schlichte Eheringe sind mit Handschuhen erlaubt.",
            },
            {
              q: "Die Haare müssen ganz bedeckt sein.",
              a: 0,
              why: "„Haare müssen vollständig unter der Haube sein.“",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 3: Arbeitsbedingungen",
        skill: "Lesen",
        time: "ca. 10 Min.",
        what: "Beschäftigte stellen Fragen in einem Forum oder Ratgeber (z. B. Urlaub, Überstunden, Krankheit). Sie ordnen kurze Antworttexte zu. Zu einer Frage passt kein Text (x).",
        steps: [
          "Formulieren Sie für jede Frage in einem Satz: Was genau will die Person wissen?",
          "Lesen Sie die Texte und notieren Sie das Kernthema am Rand.",
          "Prüfen Sie: Beantwortet der Text genau DIESE Frage?",
          "Rechnen Sie fest damit, dass eine Frage ohne Text bleibt.",
        ],
        traps: [
          "Ein Text nennt dasselbe Stichwort (z. B. „Attest“), beantwortet aber eine andere Frage.",
          "Zwei Texte zum ähnlichen Thema – nur einer passt genau.",
          "Man vergisst die Option x und erzwingt eine Zuordnung.",
        ],
        tip: "Wenn Sie bei einer Frage zwischen zwei Texten schwanken, fragen Sie sich: Könnte die Person nach dem Lesen ihr Problem lösen?",
        mini: {
          instr: "Welcher Text passt? Wenn keiner passt: x.",
          material: [
            {
              h: "a) Probezeit",
              t: "In der Probezeit (meist bis 6 Monate) kann mit einer Frist von zwei Wochen gekündigt werden – von beiden Seiten.",
            },
            {
              h: "b) Pausen",
              t: "Wer mehr als sechs Stunden arbeitet, hat Anspruch auf mindestens 30 Minuten Pause; bei mehr als neun Stunden sind es 45 Minuten.",
            },
          ],
          opts: ["a) Probezeit", "b) Pausen", "x) kein passender Text"],
          items: [
            {
              q: "„Ich arbeite acht Stunden am Stück in der Küche. Wie lang muss meine Pause sein?“",
              a: 1,
              why: "Text b: bei mehr als sechs Stunden 30 Minuten.",
            },
            {
              q: "„Muss ich meinem Arbeitgeber sagen, dass ich schwanger bin?“",
              a: 2,
              why: "Kein Text behandelt Schwangerschaft → x.",
            },
          ],
        },
      },
      {
        name: "Lesen Teil 4: Aufgaben und Aufgabenverteilung",
        skill: "Lesen",
        time: "ca. 12 Min.",
        what: "Sie lesen ein Besprechungsprotokoll und beantworten fünf Fragen: Wer macht was, bis wann, was wurde beschlossen?",
        steps: [
          "Lesen Sie zuerst die Teilnehmerliste und merken Sie sich die Rollen.",
          "Markieren Sie bei jedem TOP: Beschluss – Wer? – Bis wann?",
          "Lesen Sie die Fragen und suchen Sie den passenden TOP.",
          "Achten Sie auf „entschuldigt“, „klärt“, „bereits“, „ab“.",
        ],
        traps: [
          "Personen werden vertauscht (wer testet – wer klärt – wer schult).",
          "Etwas ist schon beschlossen, die Option tut so, als wäre es offen.",
          "Daten und Uhrzeiten aus verschiedenen TOPs werden gemischt.",
        ],
        tip: "Schreiben Sie sich beim Lesen Kürzel an den Rand (K = Kaya, W = Wiese). Das spart viel Zeit beim Zuordnen.",
        mini: {
          instr: "Lesen Sie den Protokollauszug. Welche Lösung ist richtig?",
          material: [
            {
              h: "Protokoll Wohnbereich 2",
              t: "TOP 1: Ab 1.11. neue Dokumentationssoftware. Frau Ilić schult das Team am 25.10.; Herr Brenner organisiert die Tablets. TOP 2: Sommerfest: Frau Ilić sammelt Ideen bis 30.10.",
            },
          ],
          items: [
            {
              q: "Wer kümmert sich um die Tablets?",
              opts: ["Frau Ilić", "Herr Brenner", "das ganze Team"],
              a: 1,
              why: "„Herr Brenner organisiert die Tablets.“",
            },
            {
              q: "Was passiert am 25.10.?",
              opts: [
                "Die Software wird eingeführt.",
                "Die Ideen für das Sommerfest werden gesammelt.",
                "Das Team wird geschult.",
              ],
              a: 2,
              why: "„Frau Ilić schult das Team am 25.10.“",
            },
          ],
        },
      },
      {
        name: "Lesen und Schreiben Teil 1: Beschwerde und Anweisung lesen",
        skill: "Lesen",
        time: "ca. 5 Min.",
        what: "Sie lesen eine Kundenbeschwerde und eine interne Anweisung Ihrer Vorgesetzten und beantworten zwei Fragen. Diese Texte sind gleichzeitig die Grundlage für Ihre Antwort-E-Mail.",
        steps: [
          "Markieren Sie in der Beschwerde ALLE Kritikpunkte.",
          "Nummerieren Sie in der Anweisung jeden Auftrag (1, 2, 3 …).",
          "Markieren Sie besonders, was Sie NICHT schreiben sollen.",
          "Beantworten Sie dann die zwei Fragen – Sie haben die Informationen schon gefunden.",
        ],
        traps: [
          "Lob im Text („das Essen war in Ordnung“) wird als Kritik verstanden.",
          "„Bitte NICHT …“ in der Anweisung wird überlesen.",
        ],
        tip: "Die Zeit hier ist knapp. Wer beim Lesen schon nummeriert, hat beim Schreiben eine fertige Checkliste.",
        mini: {
          instr: "Lesen Sie die Texte. Welche Lösung ist richtig?",
          material: [
            {
              h: "Kunde",
              t: "Ihr Monteur kam statt um 8 Uhr erst um 11 Uhr. Die Reparatur selbst war gut. Ich erwarte, dass Sie die Anfahrt nicht berechnen.",
            },
            {
              h: "Chef",
              t: "Bitte entschuldigen, Anfahrt streichen. Grund: Vorheriger Auftrag dauerte länger. Keine weiteren Rabatte anbieten!",
            },
          ],
          items: [
            {
              q: "Was kritisiert der Kunde?",
              opts: [
                "die Qualität der Reparatur",
                "die Verspätung des Monteurs",
                "den Preis der Ersatzteile",
              ],
              a: 1,
              why: "„kam statt um 8 Uhr erst um 11 Uhr“; die Reparatur war gut.",
            },
            {
              q: "Was soll die Antwort enthalten?",
              opts: [
                "Die Anfahrt wird nicht berechnet.",
                "Der Kunde bekommt 10 % Rabatt.",
                "Der Monteur kommt noch einmal.",
              ],
              a: 0,
              why: "„Anfahrt streichen. … Keine weiteren Rabatte“.",
            },
          ],
        },
      },
      {
        name: "Lesen und Schreiben Teil 2: Antwort an den Kunden",
        skill: "Schreiben",
        time: "ca. 15 Min.",
        what: "Sie schreiben im Auftrag Ihrer Vorgesetzten eine Antwort an den Kunden (mind. ca. 100 Wörter). Bewertet wird vor allem, ob alle Anweisungen umgesetzt sind und ob der Ton professionell ist.",
        steps: [
          "Betreff mit Bezug (Datum, Auftragsnummer).",
          "Anrede, Dank für die Rückmeldung, Entschuldigung.",
          "Jeden Punkt der Anweisung in einem eigenen Satz/Absatz abarbeiten – in der Reihenfolge Ihrer Nummerierung.",
          "Angebot klar formulieren, Schluss mit Kontaktangebot, Gruß mit „i. A.“.",
          "Am Ende: Checkliste abhaken – fehlt ein Auftrag?",
        ],
        traps: [
          "Interne Informationen wörtlich an den Kunden weitergeben („Meine Chefin sagt …“).",
          "Einen Auftrag vergessen (z. B. alte Rechnung nicht bezahlen).",
          "Zu umgangssprachlich („sorry“, „kein Ding“).",
        ],
        tip: "Prüfende zählen die umgesetzten Aufträge. Lieber kurze, klare Sätze zu jedem Punkt als ein langer schöner Text, in dem einer fehlt.",
      },
      {
        name: "Hören Teil 1: Arbeitsabläufe, Probleme, Vorschläge",
        skill: "Hören",
        time: "ca. 6 Min.",
        what: "Drei kurze Gespräche unter Kolleginnen und Kollegen, je eine Richtig/Falsch-Aussage und eine Frage mit a, b, c. Sie hören nur einmal.",
        steps: [
          "Lesen Sie vor jedem Gespräch beide Aufgaben und markieren Sie Schlüsselwörter.",
          "Achten Sie auf Vorschläge: „Weißt du was?“, „Mein Vorschlag wäre …“, „Nimm doch …“.",
          "Entscheiden Sie sofort nach dem Gespräch – es gibt keine Wiederholung.",
        ],
        traps: [
          "Ein Vorschlag wird gemacht und dann verworfen.",
          "Die Lösung betrifft die andere Person (wer macht was?).",
          "Zeitangaben werden später korrigiert.",
        ],
        tip: "Die Antwort steht fast nie im ersten Satz. Warten Sie auf das Ende – dort wird meist entschieden.",
        mini: {
          instr: "Hören Sie das Gespräch einmal. Lösen Sie die Aufgaben.",
          audio: [
            {
              h: "Im Pflegeteam",
              lines: [
                {
                  s: "f",
                  t: "Du, Ali, kannst du am Samstag meinen Frühdienst übernehmen? Meine Schwester heiratet.",
                },
                {
                  s: "m",
                  t: "Oh, Glückwunsch! Aber Samstag früh geht leider nicht, da hab ich schon was vor. Sonntag könnt ich.",
                },
                {
                  s: "f",
                  t: "Hm, Sonntag bringt mir nichts. Na gut, dann frag ich mal Petra.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              au: 0,
              q: "Ali übernimmt den Dienst am Samstag.",
              opts: ["Richtig", "Falsch"],
              a: 1,
              why: "„Samstag früh geht leider nicht.“",
            },
            {
              au: 0,
              q: "Was macht die Frau jetzt?",
              opts: [
                "Sie arbeitet am Sonntag.",
                "Sie fragt eine andere Kollegin.",
                "Sie sagt die Hochzeit ab.",
              ],
              a: 1,
              why: "„Na gut, dann frag ich mal Petra.“",
            },
          ],
        },
      },
      {
        name: "Hören Teil 2: Argumente",
        skill: "Hören",
        time: "ca. 5 Min.",
        what: "Sie hören eine Diskussion mit mehreren Personen (z. B. Betriebsversammlung) und ordnen Aussagen den Sprechenden zu. Einmal hören.",
        steps: [
          "Merken Sie sich vor dem Hören Namen und Rollen der Sprechenden.",
          "Lesen Sie die Aussagen und überlegen Sie: Wer würde das wohl sagen?",
          "Notieren Sie beim Hören zu jeder Person 1–2 Stichwörter.",
          "Achten Sie auf Widerspruch: „Ehrlich gesagt, …“, „Das klingt gut, aber …“.",
        ],
        traps: [
          "Eine Person erwähnt ein Argument, um es zu kritisieren.",
          "Ähnliche Themen bei zwei Personen (z. B. Pause, Erholung).",
          "Die Aussage ist umformuliert, nicht wörtlich.",
        ],
        tip: "Es geht um die Meinung, nicht um das Thema. Fragen Sie sich: Ist die Person dafür oder dagegen?",
        mini: {
          instr: "Hören Sie die Diskussion einmal. Wer sagt das?",
          audio: [
            {
              h: "Teambesprechung",
              lines: [
                {
                  s: "f",
                  t: "Also, ich fänd’s gut, wenn wir die Teambesprechung auf Montag legen. Dann starten alle informiert in die Woche.",
                },
                {
                  s: "m",
                  t: "Hm, Montag? Montag ist bei uns im Lager immer Chaos, da kommen die meisten Lieferungen. Mittwoch wär ruhiger.",
                },
              ],
            },
          ],
          plays: 1,
          opts: ["a) die Frau", "b) der Mann"],
          items: [
            {
              q: "Zu Wochenbeginn ist zu viel zu tun.",
              a: 1,
              why: "Mann: „Montag ist … immer Chaos.“",
            },
            {
              q: "Am Anfang der Woche sollten alle Bescheid wissen.",
              a: 0,
              why: "Frau: „Dann starten alle informiert in die Woche.“",
            },
          ],
        },
      },
      {
        name: "Hören Teil 3: Unternehmensinformationen",
        skill: "Hören",
        time: "ca. 5 Min.",
        what: "Sie hören eine Präsentation oder einen Vortrag über ein Unternehmen (Geschichte, Pläne, Leistungen) und lösen vier Aufgaben mit a, b, c. Einmal hören.",
        steps: [
          "Lesen Sie alle vier Aufgaben vorher – sie folgen der Reihenfolge des Vortrags.",
          "Achten Sie auf Zeitformen: Was war, was ist, was wird?",
          "Achten Sie auf Einschränkungen: „nur“, „noch nicht“, „erst einmal“.",
        ],
        traps: [
          "Vergangenes wird als Plan angeboten (die Halle wurde schon gebaut).",
          "Etwas wird erwähnt, aber nur für eine Gruppe (Firmenwagen nur Außendienst).",
          "„Wir sind im Gespräch“ ≠ „Es gibt …“.",
        ],
        tip: "Bei Präsentationen kommen oft Zahlen. Notieren Sie sie kurz – Distraktoren spielen gern mit Zahlen.",
        mini: {
          instr: "Hören Sie den Ausschnitt einmal. Welche Lösung ist richtig?",
          audio: [
            {
              h: "Vorstellung Bäckerei Hollmann",
              lines: [
                {
                  s: "m",
                  t: "Ja, also, wir haben heute vierzehn Filialen. Und eine fünfzehnte, in Herne, die eröffnen wir im März. Ach, und wer bei uns anfängt, bekommt ab dem ersten Tag einen Rabatt von zwanzig Prozent auf alle Produkte.",
                },
              ],
            },
          ],
          plays: 1,
          items: [
            {
              au: 0,
              q: "Wie viele Filialen hat die Bäckerei jetzt?",
              opts: ["14", "15", "20"],
              a: 0,
              why: "„Wir haben heute vierzehn Filialen.“ Die fünfzehnte kommt erst im März.",
            },
            {
              au: 0,
              q: "Was bekommen neue Mitarbeitende?",
              opts: [
                "einen Gutschein für Herne",
                "eine Prämie nach drei Monaten",
                "Rabatt auf die Produkte",
              ],
              a: 2,
              why: "„Rabatt von zwanzig Prozent auf alle Produkte.“",
            },
          ],
        },
      },
      {
        name: "Hören Teil 4: Anliegen am Telefon",
        skill: "Hören",
        time: "ca. 6 Min.",
        what: "Sie hören fünf Nachrichten auf dem Anrufbeantworter und beantworten je eine Frage. Sie hören jede Nachricht zweimal.",
        steps: [
          "Lesen Sie die Frage genau: Warum ruft jemand an? Was soll man tun? Was ändert sich?",
          "Beim ersten Hören die Richtung erkennen, beim zweiten Hören das Detail prüfen.",
          "Achten Sie auf Korrekturen: „äh, nein“, „das ist nicht das Problem“, „haben wir schon“.",
        ],
        traps: [
          "Der Anrufer nennt etwas, das KEIN Problem ist („Ich wäre zwar zu Hause …“).",
          "Dinge, die schon erledigt sind, stehen als Option da.",
          "Zahlen werden korrigiert.",
        ],
        tip: "Die Bitte steht oft am Ende: „Könnten Sie bitte …?“, „Denken Sie bitte an …“.",
        mini: {
          instr:
            "Hören Sie die Nachrichten zweimal. Welche Lösung ist richtig?",
          audio: [
            {
              h: "Nachricht 1",
              lines: [
                {
                  s: "m",
                  t: "Ja, hallo, hier ist Thomas Kurz. Äh, der Termin für die Wartung am Freitag, der passt mir leider nicht mehr. Könnten wir das auf Montag verschieben? Rufen Sie mich einfach kurz zurück. Danke!",
                },
              ],
            },
            {
              h: "Nachricht 2",
              lines: [
                {
                  s: "f",
                  t: "Hallo, hier ist Selin Engin aus der Buchhaltung. Ihre Reisekostenabrechnung ist angekommen, danke. Es fehlt aber noch die Hotelrechnung. Bringen Sie die bitte bis Mittwoch vorbei, ja? Danke, tschüss.",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              au: 0,
              q: "Was möchte Herr Kurz?",
              opts: [
                "einen neuen Termin",
                "eine zusätzliche Wartung",
                "den Auftrag stornieren",
              ],
              a: 0,
              why: "„Könnten wir das auf Montag verschieben?“",
            },
            {
              au: 1,
              q: "Was fehlt Frau Engin?",
              opts: [
                "die Reisekostenabrechnung",
                "die Fahrkarten",
                "die Hotelrechnung",
              ],
              a: 2,
              why: "„Es fehlt aber noch die Hotelrechnung.“",
            },
          ],
        },
      },
      {
        name: "Hören und Schreiben: Anruf und Telefonnotiz",
        skill: "Hören / Schreiben",
        time: "ca. 5 Min.",
        what: "Sie hören einen Anruf (zweimal), beantworten eine Frage und schreiben eine Telefonnotiz für eine Kollegin. Die Notiz muss alle wichtigen Informationen enthalten.",
        steps: [
          "Legen Sie vor dem Hören ein Raster an: Anrufer – Firma – Rückruf – Anliegen – Details – zu tun.",
          "Beim ersten Hören Namen, Anliegen und Zahlen notieren.",
          "Beim zweiten Hören Telefonnummern und Adressen prüfen.",
          "Notiz so schreiben, dass die Kollegin sofort handeln kann.",
        ],
        traps: [
          "Telefonnummern falsch notiert (Ziffern vertauscht).",
          "Plan B vergessen („falls es heute nicht geht …“).",
          "Zu kurz: „Herr L. hat angerufen, Heizung kaputt“ – Adresse, Termin, Rückruf fehlen.",
        ],
        tip: "Stichpunkte sind erlaubt, aber vollständig. Prüfen Sie: Könnte Ihre Kollegin damit ohne Rückfrage arbeiten?",
        mini: {
          instr: "Hören Sie den Anruf zweimal. Welche Lösung ist richtig?",
          audio: [
            {
              h: "Anruf",
              lines: [
                {
                  s: "f",
                  t: "Ja, guten Tag, Weber hier, vom Getränkehandel Krause. Es geht um die Lieferung für Ihr Restaurant. Die kommt leider nicht heute, sondern erst morgen um neun Uhr. Bitte rufen Sie mich zurück, falls dann niemand da ist. Unter null zwei null eins, vierundvierzig, achtzehn, zwanzig. Ich wiederhole: null zwei null eins, vier vier, eins acht, zwei null. Danke, tschüss.",
                },
              ],
            },
          ],
          plays: 2,
          items: [
            {
              au: 0,
              q: "Wann kommt die Lieferung?",
              opts: ["heute um 9 Uhr", "morgen um 9 Uhr", "morgen Nachmittag"],
              a: 1,
              why: "„nicht heute, sondern erst morgen um neun Uhr“.",
            },
            {
              au: 0,
              q: "Wann soll man zurückrufen?",
              opts: [
                "wenn morgen um 9 Uhr niemand da ist",
                "in jedem Fall",
                "nur wenn man mehr bestellen möchte",
              ],
              a: 0,
              why: "„Bitte rufen Sie mich zurück, falls dann niemand da ist.“",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 1",
        skill: "Schreiben",
        time: "ca. 5 Min.",
        what: "Ein Text aus dem Betrieb mit sechs Lücken und zehn Wörtern zur Auswahl. Vier Wörter bleiben übrig. Geprüft werden vor allem Konnektoren und Präpositionen.",
        steps: [
          "Lesen Sie den Satz um die Lücke ganz: Wo steht das Verb? (Ende → Nebensatz-Konnektor)",
          "Prüfen Sie die Bedeutung: Grund, Zweck, Bedingung, Gegensatz, Zeit?",
          "Prüfen Sie den Kasus: Folgt ein Genitiv (aufgrund, bezüglich)?",
          "Streichen Sie verwendete Wörter.",
        ],
        traps: [
          "„deshalb/trotzdem“ (Verb direkt danach) statt „weil/obwohl“ (Verb am Ende).",
          "Grammatisch passt ein Wort, inhaltlich nicht (obwohl statt falls).",
        ],
        tip: "Ordnen Sie die zehn Wörter vorher in drei Gruppen: Verb am Ende / Verb auf Position 2 / Präposition.",
        mini: {
          instr: "Welches Wort passt? Drei Wörter bleiben übrig.",
          material: [
            {
              h: "Info",
              t: "{1} des Streiks fahren morgen keine Busse. Bitte planen Sie mehr Zeit ein, {2} Sie pünktlich sind.",
            },
          ],
          opts: ["a) obwohl", "b) wegen", "c) damit", "d) deshalb", "e) sowie"],
          items: [
            {
              q: "",
              a: 1,
              why: "„Wegen des Streiks“ – Präposition mit Genitiv.",
            },
            {
              q: "",
              a: 2,
              why: "„…, damit Sie pünktlich sind“ – Zweck, Verb am Ende.",
            },
          ],
        },
      },
      {
        name: "Sprachbausteine Teil 2",
        skill: "Schreiben",
        time: "ca. 5 Min.",
        what: "Eine E-Mail mit sechs Lücken, je drei Möglichkeiten. Geprüft werden feste Wendungen, Präpositionen und der passende Ton im Geschäftsbrief.",
        steps: [
          "Lernen Sie typische Briefformeln als Block („zur Verfügung stehen“, „Ihre E-Mail vom …“).",
          "Prüfen Sie Präposition und Kasus nach dem Verb.",
          "Wenn zwei Optionen möglich scheinen: Welche ist höflich-neutral?",
        ],
        traps: [
          "Ähnlich klingende Verben (bestätigen / bescheinigen / bestimmen).",
          "Ähnliche Konnektoren (sofern / sodass / sobald).",
        ],
        tip: "Lesen Sie die fertigen Sätze leise vor. Feste Wendungen „klingen“ richtig, wenn man sie oft gelesen hat.",
        mini: {
          instr: "Welche Lösung passt?",
          material: [
            {
              h: "E-Mail",
              t: "Wir freuen uns {1} Ihre Bewerbung. Bitte senden Sie uns {2} Ihre Zeugnisse.",
            },
          ],
          items: [
            {
              q: "",
              opts: ["über", "für", "auf"],
              a: 0,
              why: "„sich über etwas freuen“ (etwas ist schon da). „auf“ = Zukünftiges.",
            },
            {
              q: "",
              opts: ["noch", "doch noch mal", "eben mal"],
              a: 0,
              why: "„Bitte senden Sie uns noch …“ – neutral; die anderen sind umgangssprachlich.",
            },
          ],
        },
      },
      {
        name: "Schreiben: Forumsbeitrag",
        skill: "Schreiben",
        time: "ca. 25 Min.",
        what: "Sie schreiben einen Beitrag im Mitarbeiterforum zu einem von zwei Themen (mind. 150 Wörter). Sie äußern Ihre Meinung, begründen sie, nennen Beispiele und machen einen Vorschlag.",
        steps: [
          "2 Minuten planen: Meinung – 2 Gründe – 1 Gegenargument – Beispiel – Vorschlag.",
          "Einleitung mit klarer Position.",
          "Hauptteil in zwei Absätzen: Pro und Contra mit Beispielen.",
          "Schluss mit konkretem Vorschlag und Gruß.",
          "3 Minuten Korrektur: Verbposition, Endungen, Konnektoren.",
        ],
        traps: [
          "Nur Meinung ohne Begründung und Beispiele.",
          "Gegenargumente fehlen – das wirkt einseitig.",
          "Briefform statt Forum („Sehr geehrte Damen und Herren“).",
        ],
        tip: "B2 zeigt sich an Verbindungen: zwar … aber, einerseits … andererseits, je … desto, dadurch, dass … Bauen Sie bewusst drei davon ein.",
      },
      {
        name: "Sprechen Teil 1A und 1B: Über ein Thema sprechen und Fragen beantworten",
        skill: "Sprechen",
        time: "ca. 4 Min.",
        what: "Sie wählen eines von zwei Themen und sprechen ca. 2 Minuten frei. Danach stellen die Prüfenden Ihnen Fragen dazu.",
        steps: [
          "Gliedern Sie im Kopf: Einleitung – Erfahrung – Situation – Vor-/Nachteile – Meinung.",
          "Erzählen Sie konkrete Erlebnisse aus Ihrem Beruf.",
          "Bei den Fragen: erst direkt antworten, dann begründen, dann Beispiel.",
          "Wenn Sie etwas nicht verstehen: höflich nachfragen.",
        ],
        traps: [
          "Auswendig gelernter Text, der nicht zum Thema passt.",
          "Nur Ja/Nein auf Nachfragen.",
          "Zu kurz – nach 40 Sekunden ist man fertig.",
        ],
        tip: "Bereiten Sie zu typischen Themen (Weiterbildung, Homeoffice, Teamarbeit, Digitalisierung, Work-Life-Balance) je ein echtes Beispiel aus Ihrem Leben vor.",
      },
      {
        name: "Sprechen Teil 2: Gespräch mit Kollegen",
        skill: "Sprechen",
        time: "ca. 3 Min.",
        what: "Ein informelles Gespräch mit einer Kollegin / einem Kollegen: Erfahrungen austauschen, Tipps geben, nachfragen.",
        steps: [
          "Reagieren Sie natürlich: „Ach, echt?“, „Das kenne ich.“",
          "Erzählen Sie von eigenen Erfahrungen.",
          "Geben Sie mindestens zwei konkrete Tipps.",
          "Stellen Sie Rückfragen und bieten Sie Hilfe an.",
        ],
        traps: [
          "Monolog statt Gespräch.",
          "„Sie“ statt „du“ unter Kollegen (oder umgekehrt plötzlich wechseln).",
          "Nur Tipps, keine Nachfragen.",
        ],
        tip: "Ein gutes Gespräch ist ein Ping-Pong: Antwort + Frage zurück. Das zeigt Interaktion – dafür gibt es Punkte.",
      },
      {
        name: "Sprechen Teil 3: Lösungen finden",
        skill: "Sprechen",
        time: "ca. 5 Min.",
        what: "Sie diskutieren mit Ihrer Partnerin / Ihrem Partner ein Problem am Arbeitsplatz, wägen Vorschläge ab und einigen sich auf eine Lösung.",
        steps: [
          "Problem kurz zusammenfassen.",
          "Eigene Vorschläge machen und begründen.",
          "Auf Vorschläge der Partnerin / des Partners reagieren (zustimmen, einschränken, widersprechen).",
          "Kompromiss suchen.",
          "Ergebnis gemeinsam zusammenfassen.",
        ],
        traps: [
          "Sofort einverstanden mit allem – keine Diskussion.",
          "Keine Einigung am Ende.",
          "Den Partner nicht zu Wort kommen lassen.",
        ],
        tip: "Planen Sie die letzte Minute für die Einigung ein: „Gut, dann schlagen wir vor: erstens …, zweitens …“",
      },
    ],
    redemittel: [
      {
        h: "Antwort auf eine Kundenbeschwerde",
        list: [
          "Vielen Dank für Ihre E-Mail vom … und Ihre offene Rückmeldung.",
          "Wir bedauern sehr, dass … / Bitte entschuldigen Sie …",
          "Der Grund dafür war, dass … / Leider ist es zu … gekommen.",
          "Damit so etwas nicht wieder vorkommt, werden wir ab sofort …",
          "Als Entschuldigung bieten wir Ihnen … an. / Sie erhalten …",
          "Für Rückfragen stehe ich Ihnen gern zur Verfügung.",
          "Mit freundlichen Grüßen, i. A. …",
        ],
      },
      {
        h: "Forumsbeitrag schreiben",
        list: [
          "Ich möchte mich gern zum Thema … äußern.",
          "Meiner Meinung nach … / Ich bin davon überzeugt, dass …",
          "Ein wichtiger Grund dafür ist, dass …",
          "Zwar …, aber … / Einerseits …, andererseits …",
          "Ein Beispiel aus meinem Arbeitsalltag: …",
          "Ich schlage deshalb vor, dass … / Wie wäre es, wenn …?",
          "Ich bin gespannt auf eure Meinungen!",
        ],
      },
      {
        h: "Telefonnotiz",
        list: [
          "Anrufer/in: … (Firma …), Rückruf unter …",
          "Anliegen: … / Grund des Anrufs: …",
          "Details: Adresse …, Ansprechpartner vor Ort …",
          "Bitte erledigen: 1. … 2. …",
          "Bitte bis … zurückrufen. / Dringend!",
          "Falls … nicht möglich: …",
        ],
      },
      {
        h: "Sprechen Teil 3: Lösungen finden",
        list: [
          "Ich schlage vor, dass wir …",
          "Was hältst du davon, wenn …?",
          "Das ist eine gute Idee, aber wir müssen auch bedenken, dass …",
          "Da bin ich anderer Meinung, weil …",
          "Wie wäre es mit einem Kompromiss: …",
          "Könnten wir uns darauf einigen, dass …?",
          "Gut, dann fassen wir zusammen: …",
        ],
      },
      {
        h: "Sprechen Teil 1 und 2: Erfahrungen und Tipps",
        list: [
          "Ich habe mich für das Thema … entschieden, weil …",
          "In meinem Beruf habe ich die Erfahrung gemacht, dass …",
          "Am Anfang war das für mich …, inzwischen …",
          "An deiner Stelle würde ich …",
          "Was mir sehr geholfen hat, war …",
          "Wie ist das denn bei dir?",
        ],
      },
    ],
    fehler: [
      [
        "Ich will mich beschweren, weil das Essen war spät.",
        "Ich möchte mich beschweren, weil das Essen zu spät geliefert wurde.",
        "Nach „weil“ steht das Verb am Ende; „möchte“ ist höflicher als „will“.",
      ],
      [
        "Hallo Frau Hoffmann, sorry für das Problem!",
        "Sehr geehrte Frau Hoffmann, bitte entschuldigen Sie das Versehen.",
        "Kundenkorrespondenz: formelle Anrede, kein „sorry“.",
      ],
      [
        "Kannst du uns bitte die Unterlagen schicken?",
        "Könnten Sie uns bitte die Unterlagen schicken?",
        "Kunden und Vorgesetzte siezen; Konjunktiv II wirkt höflich.",
      ],
      [
        "Meine Chefin sagt, ich soll Ihnen 25 % geben.",
        "Als Entschuldigung erhalten Sie 25 % Nachlass auf die Rechnung.",
        "Interne Anweisungen nicht wörtlich weitergeben – Sie schreiben im Namen der Firma.",
      ],
      [
        "Wir geben Rabatt. Wir schicken neue Rechnung. Wir hoffen, Sie sind zufrieden.",
        "Sie erhalten 25 % Nachlass; die neue Rechnung senden wir Ihnen nächste Woche zu.",
        "B2 heißt: Sätze verbinden, Artikel nicht weglassen, Wiederholungen vermeiden.",
      ],
      [
        "Wegen dem Stau kam der Fahrer später.",
        "Wegen des Staus kam der Fahrer später.",
        "In formellen Texten „wegen“ mit Genitiv.",
      ],
      [
        "Homeoffice ist gut und schlecht.",
        "Homeoffice hat aus meiner Sicht sowohl Vorteile als auch Nachteile.",
        "Zweiteilige Konnektoren und genauer Wortschatz zeigen B2-Niveau.",
      ],
      [
        "Ich bin einverstanden mit dir.",
        "Ich bin mit dir einverstanden. / Da stimme ich dir zu.",
        "„mit + Dativ“ steht vor „einverstanden“.",
      ],
      [
        "Herr L. hat angerufen. Heizung kaputt.",
        "Herr Lindner (Hausverwaltung): Heizung Breite Str. 17 ausgefallen – heute Techniker schicken, Rückruf 0172/…",
        "Telefonnotiz: Stichpunkte ja, aber mit Namen, Adresse, Nummer und Auftrag.",
      ],
      [
        "Ich denke, dass Vier-Tage-Woche ist besser.",
        "Ich denke, dass die Vier-Tage-Woche besser ist.",
        "Nach „dass“ Verb ans Ende; Artikel nicht vergessen.",
      ],
    ],
    plan: [
      {
        w: "Woche 1",
        tasks: [
          "Prüfungsaufbau kennenlernen: diese Simulation einmal ohne Zeitdruck durchsehen",
          "Lesen Teil 1 und 2: zwei Übungen, Bedingungen unterstreichen",
          "Redemittel „Kundenbeschwerde“ lernen und eine Antwort schreiben",
          "Sprechen Teil 1A: zu zwei Themen je 2 Minuten sprechen und aufnehmen",
          "Konnektoren-Liste anlegen (weil, obwohl, damit, falls, sowie …)",
        ],
      },
      {
        w: "Woche 2",
        tasks: [
          "Lesen Teil 3 und 4: Protokolle lesen, Kürzel am Rand üben",
          "Hören Teil 1 und 2: jeden Tag einen Podcast oder ein Gespräch, Meinungen notieren",
          "Telefonnotiz: drei Anrufbeantworter-Nachrichten (z. B. von Kolleginnen gesprochen) mitschreiben",
          "Sprachbausteine: 20 feste Wendungen aus Geschäftsbriefen lernen",
          "Sprechen Teil 2 mit Lernpartner: zwei Gespräche unter Kollegen spielen",
        ],
      },
      {
        w: "Woche 3",
        tasks: [
          "Forumsbeitrag: zwei Texte zu je einem Thema schreiben und korrigieren lassen",
          "Hören Teil 3 und 4: Präsentationen und Telefonnachrichten, Zahlen mitschreiben",
          "Sprechen Teil 3: drei Probleme diskutieren und sich jedes Mal einigen",
          "Fehlerliste durchgehen: eigene typische Fehler notieren",
          "Lesen und Schreiben komplett in 20 Minuten üben",
        ],
      },
      {
        w: "Woche 4",
        tasks: [
          "Komplette Simulation mit Zeit (schriftlicher Teil an einem Vormittag)",
          "Ergebnisse auswerten: schwächste Fertigkeit gezielt üben (mind. 24 Punkte nötig!)",
          "Sprechen: ganze mündliche Prüfung mit Partner/in durchspielen",
          "Checklisten für Kundenantwort und Telefonnotiz auswendig können",
          "Am Tag vor der Prüfung: nur wiederholen, ausreichend schlafen, Ausweis bereitlegen",
        ],
      },
    ],
  },
};
