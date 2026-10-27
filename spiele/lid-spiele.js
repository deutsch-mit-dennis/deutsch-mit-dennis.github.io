/* Lernspiele für den Test „Leben in Deutschland“ (spiele.js / DMGame, spiele/kit.js / DMKit, lid-katalog.js) */
(() => {
  if (!window.DMGame || !window.DMKit) return;

  /* Zeitstrahl: [Jahr, Ereignis] */
  const EVENTS = [
    [1871, 'Gründung des Deutschen Kaiserreichs', 'Gründung des Kaiserreichs'],
    [1914, 'Beginn des Ersten Weltkriegs', 'Beginn des Ersten Weltkriegs'],
    [1918, 'Ende des Ersten Weltkriegs', 'Ende des Ersten Weltkriegs'],
    [1919, 'Frauen dürfen in Deutschland zum ersten Mal wählen', 'Frauen wählen zum ersten Mal'],
    [1933, 'Adolf Hitler wird Reichskanzler – Beginn der NS-Diktatur', 'Hitler wird Reichskanzler'],
    [1938, 'Novemberpogrome: Synagogen in ganz Deutschland brennen', 'Novemberpogrome'],
    [1939, 'Beginn des Zweiten Weltkriegs', 'Beginn des Zweiten Weltkriegs'],
    [1945, 'Ende des Zweiten Weltkriegs in Europa', 'Ende des Zweiten Weltkriegs'],
    [1948, 'Währungsreform: Die D-Mark kommt in Westdeutschland', 'Die D-Mark kommt'],
    [1949, 'Das Grundgesetz tritt in Kraft – Gründung der Bundesrepublik Deutschland', 'Das Grundgesetz tritt in Kraft'],
    [1953, '17. Juni: Volksaufstand in der DDR', 'Volksaufstand in der DDR'],
    [1955, 'Erstes Anwerbeabkommen für „Gastarbeiter“ (mit Italien)', 'Erste „Gastarbeiter“ kommen'],
    [1957, 'Römische Verträge: Deutschland gründet mit fünf Ländern die EWG', 'Gründung der EWG'],
    [1961, 'Bau der Berliner Mauer', 'Bau der Berliner Mauer'],
    [1963, 'Élysée-Vertrag: Freundschaftsvertrag mit Frankreich', 'Freundschaftsvertrag mit Frankreich'],
    [1973, 'BRD und DDR werden Mitglieder der Vereinten Nationen (UNO)', 'BRD und DDR werden UNO-Mitglieder'],
    [1989, 'Fall der Berliner Mauer (9. November)', 'Fall der Berliner Mauer'],
    [1990, 'Deutsche Wiedervereinigung (3. Oktober)', 'Deutsche Wiedervereinigung'],
    [2002, 'Der Euro wird in Deutschland Bargeld', 'Der Euro wird Bargeld'],
    [2005, 'Angela Merkel wird die erste Bundeskanzlerin', 'Erste Bundeskanzlerin']
  ];

  /* Wer macht was? [Aussage, Antwort, Gruppe] */
  const STAAT = [
    ['beschließt die Bundesgesetze.', 'der Bundestag', 'organ'],
    ['wählt den Bundeskanzler oder die Bundeskanzlerin.', 'der Bundestag', 'organ'],
    ['ist das Parlament, in dem die gewählten Abgeordneten sitzen.', 'der Bundestag', 'organ'],
    ['vertritt die Interessen der Bundesländer bei der Gesetzgebung des Bundes.', 'der Bundesrat', 'organ'],
    ['muss vielen Gesetzen zustimmen, bei denen die Länder betroffen sind.', 'der Bundesrat', 'organ'],
    ['ist das Staatsoberhaupt der Bundesrepublik Deutschland.', 'der Bundespräsident / die Bundespräsidentin', 'organ'],
    ['unterschreibt die Gesetze, bevor sie in Kraft treten.', 'der Bundespräsident / die Bundespräsidentin', 'organ'],
    ['hat eine Amtszeit von fünf Jahren.', 'der Bundespräsident / die Bundespräsidentin', 'organ'],
    ['bestimmt die Richtlinien der Politik.', 'der Bundeskanzler / die Bundeskanzlerin', 'organ'],
    ['ist der Chef oder die Chefin der Bundesregierung.', 'der Bundeskanzler / die Bundeskanzlerin', 'organ'],
    ['wählt den Bundespräsidenten oder die Bundespräsidentin.', 'die Bundesversammlung', 'organ'],
    ['besteht aus den Mitgliedern des Bundestages und genauso vielen Vertretern der Länder.', 'die Bundesversammlung', 'organ'],
    ['prüft, ob Gesetze mit dem Grundgesetz übereinstimmen.', 'das Bundesverfassungsgericht', 'organ'],
    ['kann eine Partei verbieten.', 'das Bundesverfassungsgericht', 'organ'],
    ['hat seinen Sitz in Karlsruhe.', 'das Bundesverfassungsgericht', 'organ'],
    ['besteht aus dem Bundeskanzler / der Bundeskanzlerin und den Bundesministern.', 'die Bundesregierung', 'organ'],
    ['Schulpolitik und Lehrpläne', 'das Bundesland', 'ebene'],
    ['Polizei (in den meisten Aufgaben)', 'das Bundesland', 'ebene'],
    ['Universitäten und Hochschulen', 'das Bundesland', 'ebene'],
    ['Außenpolitik und Botschaften', 'der Bund', 'ebene'],
    ['Bundeswehr und Verteidigung', 'der Bund', 'ebene'],
    ['Pässe, Bundesstraßen und Autobahnen – Gesetze dafür', 'der Bund', 'ebene'],
    ['Müllabfuhr', 'die Gemeinde / die Stadt', 'ebene'],
    ['Kitas und Spielplätze vor Ort', 'die Gemeinde / die Stadt', 'ebene'],
    ['Bürgeramt: Personalausweis ausstellen und Wohnsitz anmelden', 'die Gemeinde / die Stadt', 'ebene'],
    ['Straßenbeleuchtung und Friedhöfe', 'die Gemeinde / die Stadt', 'ebene']
  ];
  const LAENDER = [
    ['Baden-Württemberg', 'Stuttgart'], ['Bayern', 'München'], ['Brandenburg', 'Potsdam'], ['Hessen', 'Wiesbaden'],
    ['Mecklenburg-Vorpommern', 'Schwerin'], ['Niedersachsen', 'Hannover'], ['Nordrhein-Westfalen', 'Düsseldorf'],
    ['Rheinland-Pfalz', 'Mainz'], ['Saarland', 'Saarbrücken'], ['Sachsen', 'Dresden'], ['Sachsen-Anhalt', 'Magdeburg'],
    ['Schleswig-Holstein', 'Kiel'], ['Thüringen', 'Erfurt']
  ];

  DMGame.register({
    id: 'lid-pruefung', cat: 'lid', title: 'LiD-Quizshow: Die Fragen-Leiter', icon: '🪜', level: 'A2–B1',
    desc: 'Echte Katalogfragen wie in einer Quizshow: Stufe für Stufe nach oben – mit Zeitlimit und drei Jokern.',
    intro: 'Klettere die Leiter hoch: 12 Stufen, 30 Sekunden pro Frage, drei Joker (50:50, +15 Sekunden, andere Frage). Ein Fehler – und du fällst auf die letzte gelbe Sicherheitsstufe zurück. Im Marathon spielst du mit 3 Leben, so weit du kommst. Die Fragen kommen aus dem offiziellen Fragenkatalog. Eine echte Prüfung mit 33 Fragen findest du unter Prüfungssimulation.',
    optionsLabel: 'Modus',
    options: [{ id: 'leiter', label: '🪜 Fragen-Leiter (12 Stufen)' }, { id: 'marathon', label: '❤️ Marathon (3 Leben)' }],
    start(api, opt) {
      const all = (window.LID_KATALOG || []).filter(q => q && (!q.img || !q.img.length) && Array.isArray(q.a) && q.a.length === 4);
      if (!all.length) { api.el.innerHTML = '<p>Die Fragen werden noch geladen. Bitte lade die Seite neu.</p>'; return; }
      const items = all.map(q => ({ tag: String(q.id).startsWith('general') ? `Frage ${q.nr}` : `Nordrhein-Westfalen · Frage ${q.nr}`, q: q.q, a: q.a[q.s], opts: q.a, correct: `${q.q} → ${q.a[q.s]}` }));
      DMArcade.ladder(api, opt === 'marathon' ? { items, endless: true, lives: 3, seconds: 25 } : { items, steps: 12, safe: [4, 8], seconds: 30 });
    }
  });

  DMGame.register({
    id: 'lid-zeitstrahl', cat: 'lid', title: 'Zeitstrahl Deutschland', icon: '📜', level: 'A2–B1',
    desc: 'Bring Mauerbau, Grundgesetz und Wiedervereinigung in die richtige Reihenfolge – gegen die Uhr.',
    intro: 'Bau deinen eigenen Zeitstrahl! Du bekommst Ereigniskarten und tippst sie von alt nach neu an. Jede Runde kommen mehr Karten dazu. Schnell sein bringt Bonuspunkte, ohne Fehler gibt es einen Extra-Bonus. 3 Leben.',
    optionsLabel: 'Schwierigkeit',
    options: [{ id: 'leicht', label: 'Leicht (3–4 Karten)' }, { id: 'schwer', label: 'Schwer (bis 7 Karten)' }],
    start(api, opt) {
      DMArcade.order(api, { events: EVENTS.map(([y, long, kurz]) => [y, kurz, long]), sizes: opt === 'schwer' ? [4, 5, 5, 6, 6, 7] : [3, 3, 4, 4, 4, 5], lives: 3 });
    }
  });

  DMGame.register({
    id: 'lid-staat', cat: 'lid', title: 'Wer macht was im Staat?', icon: '🏛️', level: 'A2–B1',
    desc: 'Maulwurf, Sortierkörbe und Fangspiel: Staatsorgane, Bund/Land/Gemeinde und Landeshauptstädte.',
    intro: 'Drei Spiele in einem: Hau den Maulwurf (Staatsorgane), Karten in den richtigen Korb sortieren (Bund, Land oder Gemeinde) und Hauptstädte mit dem Korb fangen. 3 Leben.',
    optionsLabel: 'Thema',
    options: [{ id: 'organ', label: '🔨 Staatsorgane: Hau den Maulwurf' }, { id: 'ebene', label: '🧺 Bund, Land oder Gemeinde? Sortieren' }, { id: 'laender', label: '🍎 Hauptstädte fangen' }],
    start(api, opt) {
      let items;
      if (opt === 'laender') {
        const caps = LAENDER.map(l => l[1]), lands = LAENDER.map(l => l[0]);
        items = [
          ...LAENDER.map(([l, c]) => ({ q: `Wie heißt die Landeshauptstadt von ${l}?`, a: c, opts: [c, ...DMKit.distract(api, caps, c)], correct: `${l}: ${c}` })),
          ...LAENDER.map(([l, c]) => ({ q: `${c} ist die Hauptstadt von …`, a: l, opts: [l, ...DMKit.distract(api, lands, l)], correct: `${c}: ${l}` }))
        ];
        DMArcade.catcher(api, { items, rounds: 14, lives: 3 });
        return;
      }
      const rows = STAAT.filter(r => r[2] === (opt || 'organ'));
      const answers = [...new Set(rows.map(r => r[1]))];
      items = rows.map(([q, a, g]) => g === 'ebene'
        ? { q, sub: 'Wer ist dafür zuständig?', a, opts: answers, keep: true, correct: `${q} → ${a}` }
        : { q: `Wer ${q.replace(/\.$/, '?')}`, sub: 'Wähle das Staatsorgan.', a, opts: [a, ...DMKit.distract(api, answers, a)], correct: `${a}: ${q}` });
      if (opt === 'ebene') DMArcade.sorter(api, { items: items.map(x => ({ ...x, q: x.q, sub: null })), bins: ['der Bund', 'das Bundesland', 'die Gemeinde / die Stadt'], rounds: 10, lives: 3, title: 'Wer ist zuständig?', sub: 'Steuere jede Karte in den richtigen Korb.' });
      else DMArcade.whack(api, { items, seconds: 60, lives: 3 });
    }
  });
})();
