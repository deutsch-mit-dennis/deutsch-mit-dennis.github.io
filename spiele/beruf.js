/* Weitere Lernspiele für die Prüfungen DTB B1 und DTB B2 Beruf (spiele.js / DMGame, spiele/kit.js / DMKit, spiele/arcade.js / DMArcade) */
(() => {
  if (!window.DMGame || !window.DMKit || !window.DMArcade) return;
  // four bins on 320 px phones: keep one-word labels in one line
  if (!document.getElementById('sp-beruf-css')) document.head.insertAdjacentHTML('beforeend', '<style id="sp-beruf-css">.sp-b1-bereiche .ar-bin{font-size:13px;overflow-wrap:normal;word-break:keep-all;padding-left:2px;padding-right:2px}</style>');

  /* 1) Telefonieren im Beruf: [Situation / Satz der anderen Person, passende Reaktion, [2 unpassende], Tipp] */
  const TEL = [
    ['Der Anrufer sagt: „Kann ich bitte Frau Schulz sprechen?“ – Frau Schulz ist in einer Besprechung.', 'Sie ist gerade in einer Besprechung. Kann ich ihr etwas ausrichten?', ['Nein, das geht nicht. Tschüss.', 'Frau Schulz hat keine Lust.'], 'Höflich erklären und eine Lösung anbieten: „Kann ich etwas ausrichten?“'],
    ['Sie haben den Namen des Anrufers nicht verstanden.', 'Entschuldigung, wie war Ihr Name noch einmal?', ['Was? Lauter!', 'Ihr Name ist egal.'], 'Freundlich nachfragen: „Wie war Ihr Name noch einmal?“'],
    ['Sie möchten eine Telefonnummer kontrollieren.', 'Ich wiederhole: null zwei null eins, vier fünf sechs. Ist das richtig?', ['Die Nummer merke ich mir schon.', 'Schicken Sie mir die Nummer per Post.'], 'Nummern immer wiederholen – so vermeidet man Fehler.'],
    ['Sie melden sich am Telefon in der Firma Weber Logistik.', 'Weber Logistik, Sie sprechen mit Ana Costa. Guten Tag!', ['Hallo, wer ist da?', 'Ja?'], 'Firma, eigener Name, Gruß – so meldet man sich im Beruf.'],
    ['Ein Kunde beschwert sich: „Die Lieferung ist schon wieder zu spät!“', 'Das tut mir leid. Ich prüfe sofort, wo Ihre Lieferung ist.', ['Das ist nicht mein Problem.', 'Dann bestellen Sie eben woanders.'], 'Erst entschuldigen, dann eine konkrete Hilfe anbieten.'],
    ['Sie müssen das Gespräch kurz unterbrechen.', 'Einen Moment bitte, ich verbinde Sie mit der Buchhaltung.', ['Warten Sie halt.', 'Rufen Sie später nochmal an, vielleicht.'], '„Einen Moment bitte“ – und sagen, was passiert.'],
    ['Die Verbindung ist sehr schlecht.', 'Entschuldigung, ich verstehe Sie sehr schlecht. Darf ich Sie gleich zurückrufen?', ['Sie nuscheln.', 'Ich lege jetzt auf.'], 'Problem nennen und eine Lösung anbieten (Rückruf).'],
    ['Sie wollen ein Telefonat freundlich beenden.', 'Vielen Dank für Ihren Anruf. Auf Wiederhören!', ['Okay, tschüss dann.', 'Auf Wiedersehen!'], 'Am Telefon sagt man „Auf Wiederhören“.'],
    ['Der Anrufer fragt nach einem Termin, den Sie nicht kennen.', 'Das weiß ich leider nicht genau. Ich frage nach und rufe Sie bis 15 Uhr zurück.', ['Keine Ahnung.', 'Das ist bestimmt am Montag.'], 'Nicht raten – nachfragen und einen Rückruf mit Zeit versprechen.'],
    ['Sie sollen eine Nachricht für den Chef aufnehmen.', 'Worum geht es genau? Ich notiere mir alles für Herrn Brandt.', ['Sagen Sie es ihm später selbst.', 'Ich habe keinen Stift.'], 'Nach dem Anliegen fragen und notieren: Wer, was, bis wann, Telefonnummer.'],
    ['Die Kollegin, die der Anrufer sucht, ist krank.', 'Frau Lange ist diese Woche leider nicht im Haus. Kann Ihnen vielleicht ein Kollege helfen?', ['Frau Lange hat Grippe und Fieber.', 'Die kommt nicht mehr.'], 'Keine privaten Details (Krankheit) nennen – nur „nicht im Haus“.'],
    ['Ein Kunde spricht sehr schnell.', 'Könnten Sie bitte etwas langsamer sprechen? Dann kann ich alles notieren.', ['Stopp! Zu schnell!', 'Sie reden zu viel.'], 'Höfliche Bitte mit „Könnten Sie bitte …?“']
  ];

  /* 2) Berufswortschatz: [Wort, Bereich] */
  const BEREICHE = ['🏬 Lager', '🩺 Pflege', '💻 Büro', '🍽️ Küche'];
  const WS = [
    ['der Gabelstapler', 0], ['die Palette', 0], ['der Lieferschein', 0], ['die Rampe', 0], ['die Inventur', 0], ['der Wareneingang', 0], ['kommissionieren', 0], ['die Sendungsverfolgung', 0],
    ['die Pflegedokumentation', 1], ['der Blutdruck', 1], ['die Übergabe', 1], ['der Rollstuhl', 1], ['die Desinfektion', 1], ['der Bewohner', 1], ['die Medikamentengabe', 1], ['die Wundversorgung', 1],
    ['die Ablage', 2], ['der Termin', 2], ['die Rechnung', 2], ['das Protokoll', 2], ['die Tabellenkalkulation', 2], ['der Briefkopf', 2], ['die Wiedervorlage', 2], ['der Posteingang', 2],
    ['die Zutatenliste', 3], ['die Bestellung der Gäste', 3], ['das Schneidebrett', 3], ['die Kühlkette', 3], ['der Tagesteller', 3], ['abschmecken', 3], ['die Allergenkennzeichnung', 3], ['das Rezept', 3]
  ];

  /* 3) E-Mail: formell oder informell? [Satz, 0 = formell (Kunde, Chef), 1 = informell (Kollegin im Team-Chat)] */
  const STIL = ['📧 formell', '💬 informell'];
  const MAIL = [
    ['Sehr geehrte Frau Krämer,', 0], ['Hallo Jana,', 1], ['Mit freundlichen Grüßen', 0], ['Viele Grüße und bis morgen!', 1], ['Ich bedanke mich für Ihre Anfrage vom 3. Mai.', 0], ['Danke dir für die schnelle Info!', 1],
    ['Für Rückfragen stehe ich Ihnen gern zur Verfügung.', 0], ['Sag Bescheid, wenn du Hilfe brauchst.', 1], ['Leider müssen wir Ihnen mitteilen, dass …', 0], ['Mist, das klappt bei mir nicht.', 1],
    ['Wir bitten um Ihr Verständnis.', 0], ['Kannst du für mich einspringen?', 1], ['Anbei erhalten Sie die gewünschten Unterlagen.', 0], ['Ich schick dir die Datei gleich.', 1],
    ['Ich würde mich über eine baldige Antwort freuen.', 0], ['Melde dich einfach!', 1], ['Bitte entschuldigen Sie die Verzögerung.', 0], ['Sorry, war gestern total im Stress.', 1]
  ];

  /* 4) B2: Nominalstil für formelle Texte: [Satz mit Nebensatz, Nominalstil, [2 falsche], Tipp] */
  const NOM = [
    ['Weil die Kosten steigen, erhöhen wir die Preise.', 'Aufgrund steigender Kosten erhöhen wir die Preise.', ['Wegen die Kosten steigen erhöhen wir die Preise.', 'Trotz steigender Kosten erhöhen wir die Preise.'], 'weil → aufgrund + Genitiv (Grund)'],
    ['Nachdem wir die Unterlagen geprüft haben, melden wir uns.', 'Nach Prüfung der Unterlagen melden wir uns.', ['Nach Prüfen der Unterlagen haben melden wir uns.', 'Vor Prüfung der Unterlagen melden wir uns.'], 'nachdem → nach + Nomen (prüfen → die Prüfung)'],
    ['Obwohl es Verspätungen gab, war der Kunde zufrieden.', 'Trotz der Verspätungen war der Kunde zufrieden.', ['Wegen der Verspätungen war der Kunde zufrieden.', 'Obwohl der Verspätungen war der Kunde zufrieden.'], 'obwohl → trotz + Genitiv (Gegensatz)'],
    ['Wenn Sie Fragen haben, rufen Sie uns an.', 'Bei Fragen rufen Sie uns an.', ['Mit Fragen haben rufen Sie uns an.', 'Für Fragen rufen Sie uns an.'], 'wenn → bei + Dativ (Bedingung)'],
    ['Während das Gebäude renoviert wird, arbeiten wir im Homeoffice.', 'Während der Renovierung des Gebäudes arbeiten wir im Homeoffice.', ['Während renoviert das Gebäude arbeiten wir im Homeoffice.', 'Nach der Renovierung des Gebäudes arbeiten wir im Homeoffice.'], 'während (Konjunktion) → während + Genitiv (renovieren → die Renovierung)'],
    ['Damit die Abläufe verbessert werden, führen wir ein neues System ein.', 'Zur Verbesserung der Abläufe führen wir ein neues System ein.', ['Für verbessern die Abläufe führen wir ein neues System ein.', 'Wegen der Verbesserung der Abläufe führen wir ein neues System ein.'], 'damit → zur/zum + Nomen (Ziel)'],
    ['Bevor der Vertrag unterschrieben wird, lesen Sie ihn genau.', 'Vor der Unterzeichnung des Vertrags lesen Sie ihn genau.', ['Vor unterschreiben den Vertrag lesen Sie ihn genau.', 'Seit der Unterzeichnung des Vertrags lesen Sie ihn genau.'], 'bevor → vor + Dativ (unterschreiben → die Unterzeichnung)'],
    ['Weil viele Mitarbeitende krank sind, schließen wir früher.', 'Wegen des hohen Krankenstands schließen wir früher.', ['Weil des hohen Krankenstands schließen wir früher.', 'Trotz des hohen Krankenstands schließen wir früher.'], 'weil → wegen + Genitiv'],
    ['Als das Projekt begann, gab es viele Probleme.', 'Zu Beginn des Projekts gab es viele Probleme.', ['Beim beginnen das Projekt gab es viele Probleme.', 'Am Ende des Projekts gab es viele Probleme.'], 'als (Zeitpunkt) → zu Beginn / bei + Nomen'],
    ['Wenn die Lieferung ankommt, prüfen wir die Ware.', 'Bei Ankunft der Lieferung prüfen wir die Ware.', ['Wenn Ankunft der Lieferung prüfen wir die Ware.', 'Ohne Ankunft der Lieferung prüfen wir die Ware.'], 'wenn (zeitlich) → bei + Nomen (ankommen → die Ankunft)'],
    ['Seitdem das neue Programm eingeführt wurde, sparen wir Zeit.', 'Seit der Einführung des neuen Programms sparen wir Zeit.', ['Seitdem der Einführung sparen wir Zeit.', 'Bis zur Einführung des neuen Programms sparen wir Zeit.'], 'seitdem → seit + Dativ (einführen → die Einführung)'],
    ['Indem wir digital abrechnen, sparen wir Papier.', 'Durch die digitale Abrechnung sparen wir Papier.', ['Mit digital abrechnen sparen wir Papier.', 'Statt der digitalen Abrechnung sparen wir Papier.'], 'indem → durch + Akkusativ (Mittel)']
  ];

  const mcItems = (rows, tag) => rows.map(([q, a, d, tip]) => ({ q, a, opts: [a, ...d], tip, tag, correct: `${q} → ${a}` }));

  DMGame.register({
    id: 'b1-telefon', cat: 'b2', title: 'Telefon-Profi Beruf', icon: '☎️', level: 'B1 Beruf',
    desc: 'Melden, nachfragen, Nachricht aufnehmen, höflich beenden: Wähle die passende Reaktion am Telefon.',
    intro: 'Im DTB B1 hörst und schreibst du Telefonnotizen, und im Beruf telefonierst du jeden Tag. Lies die Situation und wähle die Reaktion, die höflich und hilfreich ist. Nach jeder Antwort siehst du einen Tipp. 3 Leben.',
    start(api) { DMKit.mc(api, { items: api.shuffle(mcItems(TEL, 'Am Telefon')), rounds: 10, lives: 3 }); }
  });

  DMGame.register({
    id: 'b1-bereiche', cat: 'b2', title: 'Wort-Sortierer Beruf', icon: '🗂️', level: 'A2–B1 Beruf',
    desc: 'Sortierspiel: Gabelstapler, Übergabe, Wiedervorlage … – ab in den richtigen Arbeitsbereich!',
    intro: 'Berufswortschatz brauchst du in allen Teilen des DTB. Ein Wort fällt herunter – steuere es in den Korb mit dem passenden Arbeitsbereich: Lager, Pflege, Büro oder Küche. 16 Wörter, 3 Leben.',
    start(api) {
      const items = WS.map(([w, b]) => ({ q: w, a: BEREICHE[b], opts: BEREICHE, correct: `${w} → ${BEREICHE[b]}` }));
      DMArcade.sorter(api, { items: api.shuffle(items), bins: BEREICHE, rounds: 16, lives: 3, title: 'In welchem Bereich arbeitet man damit?', sub: 'Steuere die Karte in den richtigen Korb.' });
    }
  });

  DMGame.register({
    id: 'b1-stil', cat: 'b2', title: 'Formell oder locker?', icon: '✉️', level: 'B1–B2 Beruf',
    desc: 'Sortierspiel: Gehört der Satz in die E-Mail an den Kunden oder in den Team-Chat?',
    intro: 'Im DTB schreibst du eine formelle E-Mail an Kunden und eine kurze Nachricht im Team-Chat. Ein Satz fällt herunter – ist er formell (Sie, Kunde, Amt) oder informell (du, Kollegin)? Steuere ihn in den richtigen Korb. 14 Sätze, 3 Leben.',
    start(api) {
      const items = MAIL.map(([s, k]) => ({ q: s, a: STIL[k], opts: STIL, correct: `„${s}“ → ${STIL[k]}` }));
      DMArcade.sorter(api, { items: api.shuffle(items), bins: STIL, rounds: 14, lives: 3, title: 'Formell oder informell?', sub: 'E-Mail an Kunden oder Team-Chat?' });
    }
  });

  DMGame.register({
    id: 'b2-nominal', cat: 'b2', title: 'Nominalstil-Leiter', icon: '🏛️', level: 'B2 Beruf',
    desc: 'weil → aufgrund, nachdem → nach: Formuliere Sätze im Stil formeller Briefe – mit Jokern die Leiter hoch.',
    intro: 'In formellen E-Mails, Protokollen und in den Sprachbausteinen des DTB B2 begegnet dir oft der Nominalstil. Wähle den Satz, der dasselbe im Nominalstil sagt. 10 Stufen, 35 Sekunden pro Frage, drei Joker. Bei einem Fehler fällst du auf die letzte Sicherheitsstufe zurück.',
    start(api) { DMArcade.ladder(api, { items: mcItems(NOM, 'Nominalstil'), steps: 10, safe: [3, 7], seconds: 35 }); }
  });
})();
