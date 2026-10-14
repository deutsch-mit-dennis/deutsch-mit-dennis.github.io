/* Lernspiele für den Test „Leben in Deutschland“ (spiele.js / DMGame, spiele/kit.js / DMKit, lid-katalog.js) */
(() => {
  if (!window.DMGame || !window.DMKit) return;

  /* Zeitstrahl: [Jahr, Ereignis] */
  const EVENTS = [
    [1871, 'Gründung des Deutschen Kaiserreichs'],
    [1914, 'Beginn des Ersten Weltkriegs'],
    [1918, 'Ende des Ersten Weltkriegs'],
    [1919, 'Frauen dürfen in Deutschland zum ersten Mal wählen'],
    [1933, 'Adolf Hitler wird Reichskanzler – Beginn der NS-Diktatur'],
    [1938, 'Novemberpogrome: Synagogen in ganz Deutschland brennen'],
    [1939, 'Beginn des Zweiten Weltkriegs'],
    [1945, 'Ende des Zweiten Weltkriegs in Europa'],
    [1948, 'Währungsreform: Die D-Mark kommt in Westdeutschland'],
    [1949, 'Das Grundgesetz tritt in Kraft – Gründung der Bundesrepublik Deutschland'],
    [1953, '17. Juni: Volksaufstand in der DDR'],
    [1955, 'Erstes Anwerbeabkommen für „Gastarbeiter“ (mit Italien)'],
    [1957, 'Römische Verträge: Deutschland gründet mit fünf Ländern die EWG'],
    [1961, 'Bau der Berliner Mauer'],
    [1963, 'Élysée-Vertrag: Freundschaftsvertrag mit Frankreich'],
    [1973, 'BRD und DDR werden Mitglieder der Vereinten Nationen (UNO)'],
    [1989, 'Fall der Berliner Mauer (9. November)'],
    [1990, 'Deutsche Wiedervereinigung (3. Oktober)'],
    [2002, 'Der Euro wird in Deutschland Bargeld'],
    [2005, 'Angela Merkel wird die erste Bundeskanzlerin']
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
    id: 'lid-pruefung', cat: 'lid', title: 'LiD: Prüfung & Überleben', icon: '❤️', level: 'A2–B1',
    desc: 'Echte Fragen aus dem Katalog: Prüfungssimulation mit 33 Fragen oder Überleben mit 3 Leben.',
    intro: 'Die Fragen kommen aus dem offiziellen Fragenkatalog (300 Fragen + Fragen für NRW). Prüfung: 33 Fragen wie im echten Test – ab 17 richtigen bestanden. Überleben: Wie weit kommst du mit 3 Leben?',
    optionsLabel: 'Modus',
    options: [{ id: 'ueberleben', label: '❤️ Überleben' }, { id: 'pruefung', label: '📋 Prüfung (33 Fragen)' }],
    start(api, opt) {
      const all = (window.LID_KATALOG || []).filter(q => q && (!q.img || !q.img.length) && Array.isArray(q.a) && q.a.length === 4);
      if (!all.length) { api.el.innerHTML = '<p>Die Fragen werden noch geladen. Bitte lade die Seite neu.</p>'; return; }
      const toItem = q => ({ tag: q.id && q.id.startsWith('general') ? `Frage ${q.nr}` : `Nordrhein-Westfalen · Frage ${q.nr}`, q: q.q, a: q.a[q.s], opts: q.a, correct: `${q.q} → ${q.a[q.s]}` });
      if (opt === 'pruefung') {
        const gen = all.filter(q => String(q.id).startsWith('general')), land = all.filter(q => !String(q.id).startsWith('general'));
        const items = [...api.pick(gen, 30), ...api.pick(land, 3)].map(toItem);
        DMKit.mc(api, { items, rounds: 33, summary: r => `<div class="sp-kit-q"><div class="sp-kit-pic">${r.right >= 17 ? '🎉' : '📚'}</div><p class="sp-kit-prompt">${r.right} von ${r.total} richtig</p><p class="sp-kit-sub">${r.right >= 17 ? 'Bestanden! Im echten Test brauchst du mindestens 17 richtige Antworten von 33.' : 'Noch nicht bestanden – du brauchst mindestens 17 richtige Antworten. Übe weiter, du schaffst das!'}</p></div>` });
      } else {
        DMKit.mc(api, { items: all.map(toItem), lives: 3, endless: true });
      }
    }
  });

  DMGame.register({
    id: 'lid-zeitstrahl', cat: 'lid', title: 'Zeitstrahl Deutschland', icon: '📜', level: 'A2–B1',
    desc: 'Mauerbau, Grundgesetz, Wiedervereinigung: Wann war das – und was war früher?',
    intro: 'Wichtige Jahre der deutschen Geschichte kommen oft im Test vor. Wähle das richtige Jahr – oder tippe auf das Ereignis, das früher war. 15 Aufgaben, 3 Leben.',
    optionsLabel: 'Aufgabe',
    options: [{ id: 'jahr', label: 'Jahr wählen' }, { id: 'frueher', label: 'Was war früher?' }],
    start(api, opt) {
      let items;
      if (opt === 'frueher') {
        items = [];
        for (let n = 0; n < 40; n++) {
          const [x, y] = api.pick(EVENTS, 2);
          if (x[0] === y[0]) continue;
          const early = x[0] < y[0] ? x : y, late = early === x ? y : x;
          items.push({ q: 'Was war früher?', a: early[1], opts: [x[1], y[1]], keep: true, tip: `${early[0]}: ${early[1]} · ${late[0]}: ${late[1]}`, correct: `${early[0]} – ${early[1]}` });
        }
      } else {
        const years = EVENTS.map(e => e[0]);
        items = EVENTS.map(([y, e]) => {
          const near = [...years].filter(v => v !== y).sort((a, b) => Math.abs(a - y) - Math.abs(b - y)).slice(0, 5);
          return { q: e, sub: 'In welchem Jahr war das?', a: String(y), opts: [String(y), ...api.pick(near, 3).map(String)].sort(), keep: true, correct: `${y}: ${e}` };
        });
      }
      DMKit.mc(api, { items, rounds: 15, lives: 3, cols: opt === 'frueher' ? 1 : 2 });
    }
  });

  DMGame.register({
    id: 'lid-staat', cat: 'lid', title: 'Wer macht was im Staat?', icon: '🏛️', level: 'A2–B1',
    desc: 'Bundestag, Bundesrat, Bundespräsident – plus Bund, Land, Gemeinde und Landeshauptstädte.',
    intro: 'Wer wählt die Kanzlerin? Wer ist für Schulen zuständig? Wie heißt die Hauptstadt von Hessen? Wähle ein Thema. 15 Aufgaben, 3 Leben.',
    optionsLabel: 'Thema',
    options: [{ id: 'organ', label: 'Verfassungsorgane' }, { id: 'ebene', label: 'Bund, Land oder Gemeinde?' }, { id: 'laender', label: 'Länder & Hauptstädte' }],
    start(api, opt) {
      let items;
      if (opt === 'laender') {
        const caps = LAENDER.map(l => l[1]), lands = LAENDER.map(l => l[0]);
        items = [
          ...LAENDER.map(([l, c]) => ({ q: `Wie heißt die Landeshauptstadt von ${l}?`, a: c, opts: [c, ...DMKit.distract(api, caps, c)], correct: `${l}: ${c}` })),
          ...LAENDER.map(([l, c]) => ({ q: `${c} ist die Hauptstadt von …`, a: l, opts: [l, ...DMKit.distract(api, lands, l)], correct: `${c}: ${l}` }))
        ];
        DMKit.mc(api, { items, rounds: 15, lives: 3, cols: 2 });
        return;
      }
      const rows = STAAT.filter(r => r[2] === (opt || 'organ'));
      const answers = [...new Set(rows.map(r => r[1]))];
      items = rows.map(([q, a, g]) => g === 'ebene'
        ? { q, sub: 'Wer ist dafür zuständig?', a, opts: answers, keep: true, correct: `${q} → ${a}` }
        : { q: `Wer ${q.replace(/\.$/, '?')}`, sub: 'Wähle das Staatsorgan.', a, opts: [a, ...DMKit.distract(api, answers, a)], correct: `${a}: ${q}` });
      DMKit.mc(api, { items, rounds: 15, lives: 3 });
    }
  });
})();
