/* Lernspiel „Brief-Baukasten“ – DTZ Schreiben: Brief/E-Mail aus Bausteinen bauen (A2–B1).
   Die Musterbriefe werden vorgelesen (api.speak); der gesprochene Text steht auch in spiele/tts-brief.json. */
(() => {
  const ID = 'brief';
  const CSS = `
.sp-brief-task{padding:14px 16px;border-radius:16px;background:#f3f5fb}
.sp-brief-task h2{font-size:20px;margin:0 0 6px;line-height:1.3}
.sp-brief-task p{margin:0 0 8px;font-size:16px;line-height:1.5;color:#2c3550}
.sp-brief-task ul{margin:0;padding-left:22px}.sp-brief-task li{margin:3px 0;font-size:16px;font-weight:600}
.sp-brief-to{display:inline-block;margin-bottom:6px;font-size:13px;font-weight:700;color:#55607a;background:#fff;border-radius:99px;padding:3px 10px}
.sp-brief-q{font-size:clamp(19px,4.4vw,23px);font-weight:700;margin:18px 0 10px}
.sp-brief-reg{grid-template-columns:1fr 1fr}
.sp-brief-reg .ch-opt{flex-direction:column;justify-content:center!important;text-align:center;min-height:84px;gap:2px}
.sp-brief-reg .ch-opt b{font-size:24px}.sp-brief-reg .ch-opt small{font-weight:600;color:#55607a;font-size:14px}
.sp-brief-reg .ch-opt kbd{position:absolute;top:6px;left:8px}
.sp-brief-paper{scroll-margin-top:84px;margin-top:14px;padding:14px;border:1px solid #e1e5ef;border-radius:16px;background:#fffdf8;box-shadow:0 4px 14px rgba(23,32,54,.06);display:grid;gap:8px}
.sp-brief-slot{display:block;width:100%;min-height:52px;padding:6px 12px 8px;border:2px dashed #c5cdf0;border-radius:12px;background:#fff;text-align:left;font:16px/1.4 var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-brief-slot small{display:block;font-size:12px;font-weight:700;color:#7a849c;text-transform:uppercase;letter-spacing:.04em}
.sp-brief-slot span{display:block;color:#a0a8bb;font-style:italic}
.sp-brief-slot.is-filled{border-style:solid;border-color:var(--dm-line)}
.sp-brief-slot.is-filled span{color:var(--dm-ink);font-style:normal;font-weight:600}
.sp-brief-slot.is-active{border-color:var(--dm-tinte);background:var(--dm-tinte-soft);box-shadow:0 0 0 3px rgba(80,100,220,.12)}
.sp-brief-slot.is-right{border:2px solid #1f9d55;background:#e8f6ec;cursor:default}
.sp-brief-slot.is-wrong{border:2px solid #d6332b;background:#fdecea}
.sp-brief-slot.is-right small::after{content:' ✓';color:#1f9d55}.sp-brief-slot.is-wrong small::after{content:' ✗ – antippen zum Entfernen';color:#c62828;text-transform:none;letter-spacing:0}
.sp-brief-gap{height:4px}
.sp-brief-pick{margin-top:16px;padding-top:12px;border-top:2px solid #eef1f8;scroll-margin-top:84px;scroll-margin-bottom:16px}
.sp-brief-now{margin:0 0 8px;font-size:15px;color:#3b4560}.sp-brief-now b{color:var(--dm-tinte-dark)}
.sp-brief-pool{padding:2px}
.sp-brief-pool .ch-chip{font-size:16px;font-weight:600;line-height:1.35;text-align:left;max-width:100%;padding:10px 14px}
.sp-brief-pool:empty::before{content:'Alle Bausteine sind verteilt.';color:#7a849c;font-size:15px}
.sp-brief-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
.sp-brief-btns .dm-btn{flex:1;min-height:48px;justify-content:center;font-size:17px}
.sp-brief-btns .dm-btn:disabled{opacity:.5;cursor:not-allowed}
.sp-brief-letter{margin-top:14px;padding:20px 22px;border:1px solid #e1e5ef;border-radius:16px;background:#fffdf8;box-shadow:0 4px 14px rgba(23,32,54,.06);font-size:17px;line-height:1.6}
.sp-brief-letter p{margin:0 0 12px}.sp-brief-letter p:last-child{margin:0}
.sp-brief-tip{margin-top:14px;padding:12px 16px;border-radius:14px;background:#fff8e6;color:#4a3b12;font-size:15px;line-height:1.5}
.sp-brief-tip h3{font-size:16px;margin:0 0 4px}.sp-brief-tip ul{margin:0;padding-left:20px}.sp-brief-tip li{margin:3px 0}
.sp-brief-speak{margin-top:12px;min-height:48px}
@media (max-width:520px){.sp-brief-paper{padding:10px}.sp-brief-letter{padding:16px;font-size:16px}}`;

  /* reg: richtige Wahl in Schritt 1 (Sie/du), kind: formell | halbformell | informell.
     b: Bausteine in der richtigen Reihenfolge (Anrede, Einleitung, Leitpunkte …, Schluss, Gruß, Name).
     d: Bausteine, die nicht passen [Text, Grund]. */
  const TASKS = [
    { id: 'arzt', label: '🩺 Arzttermin absagen', kind: 'formell', reg: 'Sie', to: 'E-Mail an die Arztpraxis', voice: 'f1',
      sit: 'Sie haben am Montag um 10 Uhr einen Termin bei Ihrer Hausärztin, Frau Dr. Lange. Ihr Sohn ist krank, deshalb können Sie nicht kommen. Außerdem brauchen Sie ein neues Rezept. Schreiben Sie eine E-Mail an die Praxis.',
      lp: ['Grund für die Absage', 'Neuer Termin', 'Bitte um ein Rezept'],
      why: 'Die Praxis ist eine offizielle Stelle – du schreibst formell mit „Sie“.',
      b: ['Sehr geehrte Frau Dr. Lange,', 'leider muss ich meinen Termin am Montag um 10 Uhr absagen.',
        'Mein Sohn ist krank und ich muss bei ihm zu Hause bleiben.', 'Ich hätte gern einen neuen Termin in der nächsten Woche. Vormittags passt es mir am besten.',
        'Außerdem brauche ich ein neues Rezept für meine Blutdrucktabletten. Kann ich es nächste Woche in der Praxis abholen?',
        'Bitte geben Sie mir kurz Bescheid. Vielen Dank im Voraus!', 'Mit freundlichen Grüßen', 'Olena Kovalenko'],
      d: [['Hey, was geht?', 'Viel zu locker: An eine Arztpraxis schreibst du formell.'],
        ['Liebe Grüße und Küsschen', 'Das schreibst du nur an Familie und gute Freunde.'],
        ['Am Wochenende habe ich einen schönen Ausflug gemacht.', 'Das hat nichts mit der Aufgabe zu tun.']] },

    { id: 'heizung', label: '🔥 Beschwerde: Heizung kaputt', kind: 'formell', reg: 'Sie', to: 'E-Mail an den Vermieter', voice: 'm1',
      sit: 'In Ihrer Wohnung funktioniert die Heizung seit einer Woche nicht. Es ist Winter und sehr kalt. Schreiben Sie Ihrem Vermieter, Herrn Schmitt.',
      lp: ['Problem beschreiben', 'Was Sie schon gemacht haben', 'Wann Sie zu Hause sind'],
      why: 'Mit dem Vermieter hast du ein offizielles Verhältnis – du schreibst formell mit „Sie“.',
      b: ['Sehr geehrter Herr Schmitt,', 'ich wohne in der Lindenstraße 12 im zweiten Stock und schreibe Ihnen wegen der Heizung.',
        'Seit einer Woche funktioniert die Heizung im Wohnzimmer nicht mehr. Die Wohnung ist sehr kalt.',
        'Ich habe die Heizung schon entlüftet, aber das hat leider nicht geholfen.', 'Ich bin jeden Tag ab 15 Uhr zu Hause.',
        'Bitte schicken Sie so schnell wie möglich einen Handwerker. Vielen Dank im Voraus!', 'Mit freundlichen Grüßen', 'Ahmad Karimi'],
      d: [['Hallo Herr Schmitt, alles klar bei dir?', 'Den Vermieter sprichst du mit „Sie“ an, nicht mit „du“.'],
        ['Tschüss und bis bald!', 'Viel zu locker für einen formellen Brief.'],
        ['Ich suche auch eine neue Arbeit als Fahrer.', 'Das hat nichts mit der Heizung zu tun.']] },

    { id: 'kurs', label: '📚 Anmeldung zum Sprachkurs', kind: 'formell', reg: 'Sie', to: 'E-Mail an die Volkshochschule', voice: 'f2',
      sit: 'Sie haben im Internet eine Anzeige für einen Deutschkurs B1 an der Volkshochschule gelesen. Sie möchten sich anmelden und haben eine Frage zu den Kosten.',
      lp: ['Ihre Deutschkenntnisse', 'Wann Sie Zeit haben', 'Frage nach den Kosten'],
      why: 'Die Volkshochschule ist eine Institution, und du kennst dort niemanden – formell mit „Sie“.',
      b: ['Sehr geehrte Damen und Herren,', 'ich habe Ihre Anzeige im Internet gelesen und möchte mich für den Deutschkurs B1 anmelden.',
        'Ich habe den A2-Kurs schon abgeschlossen und möchte bald die DTZ-Prüfung machen.', 'Ich kann nur vormittags, weil ich nachmittags arbeite.',
        'Wie viel kostet der Kurs? Kann ich die Kursgebühr auch in Raten bezahlen?', 'Ich freue mich auf Ihre Antwort.', 'Mit freundlichen Grüßen', 'Maria Popescu'],
      d: [['Hallo Leute!', 'Zu locker: Wenn du keinen Namen kennst, schreibst du „Sehr geehrte Damen und Herren,“.'],
        ['Hab dich lieb!', 'Das schreibst du nur an Familie und Freunde.'],
        ['Gestern war das Wetter sehr schön.', 'Das hat nichts mit der Anmeldung zu tun.']] },

    { id: 'einladung', label: '🎂 Einladung absagen (Freundin)', kind: 'informell', reg: 'du', to: 'Nachricht an Ihre Freundin Sabine', voice: 'f3',
      sit: 'Ihre Freundin Sabine hat Sie zu ihrer Geburtstagsparty am Samstag eingeladen. Sie können leider nicht kommen. Schreiben Sie Sabine.',
      lp: ['Absage und Grund', 'Neuer Vorschlag', 'Geschenk'],
      why: 'Sabine ist deine Freundin – du schreibst informell mit „du“.',
      b: ['Liebe Sabine,', 'vielen Dank für deine Einladung zu deiner Geburtstagsparty am Samstag!',
        'Leider kann ich nicht kommen, weil meine Eltern mich an diesem Wochenende besuchen.',
        'Hast du nächste Woche Zeit? Dann können wir zusammen ins Café gehen und ein bisschen nachfeiern.',
        'Ein kleines Geschenk habe ich auch schon für dich.', 'Ich wünsche dir eine tolle Party!', 'Liebe Grüße', 'Amina'],
      d: [['Sehr geehrte Frau Sabine,', '„Sehr geehrte …“ ist formell und steht nie mit dem Vornamen. An Freunde: „Liebe Sabine,“.'],
        ['Mit freundlichen Grüßen', 'Zu formell für eine Freundin.'],
        ['Bitte überweisen Sie die Miete bis zum dritten Werktag.', 'Passt nicht zum Thema – und ist formell.']] },

    { id: 'schicht', label: '🔄 Kollegin um Schichttausch bitten', kind: 'informell', reg: 'du', to: 'Nachricht an Ihre Kollegin Jana', voice: 'm2',
      sit: 'Sie haben am Freitag einen wichtigen Termin bei der Ausländerbehörde, aber Sie haben Spätschicht. Schreiben Sie Ihrer Kollegin Jana. Sie duzen sich.',
      lp: ['Grund', 'Bitte um Tausch', 'Angebot: Was machen Sie dafür?'],
      why: 'Jana und du, ihr duzt euch – also informell mit „du“.',
      b: ['Liebe Jana,', 'ich habe eine große Bitte an dich.', 'Am Freitag habe ich einen wichtigen Termin bei der Ausländerbehörde.',
        'Könntest du am Freitag meine Spätschicht übernehmen?', 'Dafür arbeite ich gern am Montag in deiner Frühschicht.',
        'Sag mir bitte bis Mittwoch Bescheid. Danke schon mal!', 'Viele Grüße', 'Tarek'],
      d: [['Sehr geehrte Damen und Herren,', 'So schreibst du an eine Firma oder ein Amt – nicht an eine Kollegin, die du duzt.'],
        ['Hochachtungsvoll', 'Sehr altmodisch und viel zu formell.'],
        ['Mein Lieblingsessen ist Pizza.', 'Das hat nichts mit dem Schichttausch zu tun.']] },

    { id: 'kita', label: '🧸 Kita: Kind ist krank', kind: 'halbformell', reg: 'Sie', to: 'E-Mail an die Erzieherin', voice: 'f1',
      sit: 'Ihr Sohn Elias ist krank und kann nicht in die Kita gehen. Am Freitag macht die Kita einen Ausflug in den Zoo. Schreiben Sie der Erzieherin, Frau Hoffmann.',
      lp: ['Was hat Elias?', 'Wie lange bleibt er zu Hause?', 'Frage zum Ausflug'],
      why: 'Die Erzieherin kennst du gut, aber ihr sagt „Sie“ zueinander. Das ist halbformell: „Liebe Frau Hoffmann,“ … „Viele Grüße“.',
      b: ['Liebe Frau Hoffmann,', 'leider kann Elias heute nicht in die Kita kommen.', 'Er hat seit gestern Abend Fieber und Husten.',
        'Der Kinderarzt sagt, er soll bis Mittwoch zu Hause bleiben.', 'Darf Elias am Freitag trotzdem mit in den Zoo, wenn er wieder gesund ist?',
        'Vielen Dank für Ihr Verständnis.', 'Viele Grüße', 'Fatima Haddad'],
      d: [['Hallo Frau Hoffmann, wie geht’s dir?', '„Frau Hoffmann“ und „dir“ passen nicht zusammen: Die Erzieherin siezt du.'],
        ['Küsschen und bis morgen!', 'Viel zu privat für eine Nachricht an die Kita.'],
        ['Der Kühlschrank in meiner Küche ist kaputt.', 'Das hat nichts mit der Aufgabe zu tun.']] }
  ];

  const smooth = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const slotLabels = T => ['Anrede', 'Einleitung', ...T.lp.map((l, i) => `Leitpunkt ${i + 1}: ${l}`), 'Bitte / Schluss', 'Gruß', 'Name'];
  const spoken = T => T.b.join(' ');
  const RULES = {
    formell: ['Anrede: „Sehr geehrte Frau …,“ / „Sehr geehrter Herr …,“. Kennst du keinen Namen: „Sehr geehrte Damen und Herren,“.',
      'Nach der Anrede steht ein Komma. Der erste Satz beginnt deshalb klein: „leider …“, „ich …“.',
      'Gruß: „Mit freundlichen Grüßen“ – ohne Komma, darunter dein Name.',
      '„Sie“, „Ihnen“, „Ihr“ schreibst du immer groß.'],
    halbformell: ['Anrede: „Liebe Frau …,“ / „Lieber Herr …,“ – freundlich, aber mit „Sie“.',
      'Nach der Anrede steht ein Komma. Der erste Satz beginnt deshalb klein.',
      'Gruß: „Viele Grüße“ oder „Freundliche Grüße“, darunter dein Name.',
      '„Sie“, „Ihnen“, „Ihr“ schreibst du immer groß.'],
    informell: ['Anrede: „Liebe Sabine,“ / „Lieber Tarek,“ oder „Hallo Jana,“ – mit „du“.',
      'Nach der Anrede steht ein Komma. Der erste Satz beginnt deshalb klein.',
      'Gruß: „Viele Grüße“ oder „Liebe Grüße“, darunter dein Vorname.',
      '„du“, „dir“, „dein“ schreibst du klein (groß ist im Brief aber auch erlaubt).']
  };

  DMGame.register({
    id: ID, title: 'Brief-Baukasten', icon: '✉️', level: 'A2–B1',
    desc: 'DTZ Schreiben: Baue eine E-Mail aus Satzbausteinen – formell oder informell.',
    intro: 'Wie im DTZ: Du liest die Situation und die Leitpunkte. Zuerst entscheidest du: „Sie“ oder „du“? Dann setzt du die passenden Bausteine in die richtige Reihenfolge. Achtung: Manche Bausteine passen gar nicht!',
    optionsLabel: 'Brief',
    options: TASKS.map(t => ({ id: t.id, label: t.label })),
    tts: () => TASKS.map(t => ({ text: spoken(t), voice: t.voice })),
    start(api, opt) {
      if (!document.getElementById('sp-brief-css')) document.head.insertAdjacentHTML('beforeend', `<style id="sp-brief-css">${CSS}</style>`);
      const T = TASKS.find(t => t.id === opt) || TASKS[0], e = api.esc, L = slotLabels(T), S = L.length;
      const max = S + 1, wrong = [];
      let score = 0;
      const taskBox = `<div class="sp-brief-task"><span class="sp-brief-to">✉️ ${e(T.to)}</span><p>${e(T.sit)}</p><p><b>Schreiben Sie etwas zu diesen Punkten:</b></p><ul>${T.lp.map(l => `<li>${e(l)}</li>`).join('')}</ul></div>`;

      /* Schritt 1: Sie oder du? */
      function step1() {
        api.hud({ progress: 0, step: 'Schritt 1/3', score });
        api.el.innerHTML = `${taskBox}<p class="sp-brief-q">Schreibst du formell oder informell?</p>
          <div class="ch-opts sp-brief-reg"><button type="button" class="ch-opt" data-k="0" data-v="Sie"><kbd>1</kbd><b>Sie</b><small>formell</small></button><button type="button" class="ch-opt" data-k="1" data-v="du"><kbd>2</kbd><b>du</b><small>informell</small></button></div>`;
        let first = true;
        api.el.querySelectorAll('.sp-brief-reg .ch-opt').forEach(b => {
          b.onclick = () => {
            if (b.dataset.v === T.reg) {
              api.el.querySelectorAll('.sp-brief-reg .ch-opt').forEach(x => { x.disabled = true; });
              b.classList.add('is-right');
              if (first) score++;
              api.hud({ score, progress: 1 / 3 });
              api.feedback(true, `<b>Richtig – ${T.kind}!</b> <span>${e(T.why)}</span>`);
              api.next('Weiter zu den Bausteinen', step2);
            } else {
              if (first) wrong.push({ correct: `Mit „${T.reg}“ schreiben (${T.kind})`, tip: T.why });
              first = false;
              b.disabled = true; b.classList.add('is-wrong');
              api.feedback(false, `<b>Nicht ganz.</b> <span>${e(T.why)}</span>`);
            }
          };
        });
      }

      /* Schritt 2: Bausteine einsetzen */
      function step2() {
        api.clearFeedback();
        api.hud({ progress: 1 / 3, step: 'Schritt 2/3' });
        const pool = api.shuffle([...T.b.map((text, i) => ({ text, slot: i })), ...T.d.map(([text, why]) => ({ text, slot: -1, why }))]);
        const fill = Array(S).fill(null), locked = Array(S).fill(false);
        let active = 0, checked = false;
        api.el.innerHTML = `${taskBox}
          <div class="sp-brief-paper" aria-label="Dein Brief">${L.map((l, i) => `${i === 2 || i === S - 3 || i === S - 2 ? '<div class="sp-brief-gap"></div>' : ''}<button type="button" class="sp-brief-slot" data-s="${i}"><small>${e(l)}</small><span></span></button>`).join('')}</div>
          <div class="sp-brief-pick"><p class="sp-brief-now" aria-live="polite"></p><div class="ch-pool sp-brief-pool">${pool.map((p, i) => `<button type="button" class="ch-chip" data-p="${i}">${e(p.text)}</button>`).join('')}</div>
          <div class="sp-brief-btns"><button type="button" class="dm-btn ch-go" id="sp-brief-check" disabled>Prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="sp-brief-sol" hidden>Lösung zeigen</button></div></div>`;
        const slots = [...api.el.querySelectorAll('.sp-brief-slot')], chips = [...api.el.querySelectorAll('.sp-brief-pool .ch-chip')];
        const now = api.el.querySelector('.sp-brief-now'), check = api.el.querySelector('#sp-brief-check'), sol = api.el.querySelector('#sp-brief-sol');
        const firstEmpty = from => { for (let k = 0; k < S; k++) { const i = (from + k) % S; if (fill[i] == null) return i; } return -1; };
        function render() {
          if (active < 0 || fill[active] != null) active = firstEmpty(Math.max(active, 0));
          slots.forEach((s, i) => {
            const p = fill[i];
            s.classList.toggle('is-filled', p != null);
            s.classList.toggle('is-active', i === active);
            s.querySelector('span').textContent = p != null ? pool[p].text : (i === active ? 'Tippe unten auf einen Baustein.' : '…');
            s.setAttribute('aria-label', `${L[i]}: ${p != null ? pool[p].text : 'leer'}`);
          });
          chips.forEach((c, i) => { c.hidden = fill.includes(i); });
          const filled = fill.filter(x => x != null).length;
          now.innerHTML = active >= 0 ? `Nächster Platz: <b>${e(L[active])}</b> · ${filled}/${S}` : `Alle ${S} Plätze sind gefüllt. Prüfe deinen Brief!`;
          check.disabled = filled < S;
        }
        slots.forEach((s, i) => {
          s.onclick = () => {
            if (locked[i]) return;
            if (fill[i] != null) { fill[i] = null; s.classList.remove('is-wrong'); }
            active = i; render();
            if (innerWidth <= 700) api.el.querySelector('.sp-brief-pick').scrollIntoView({ block: 'nearest', behavior: smooth() });
          };
        });
        chips.forEach((c, i) => {
          c.onclick = () => {
            const at = active >= 0 ? active : firstEmpty(0);
            if (at < 0) return;
            fill[at] = i; active = firstEmpty(at + 1); render();
          };
        });
        function finishStep() {
          slots.forEach((s, i) => { s.classList.add('is-right'); s.classList.remove('is-wrong', 'is-active'); locked[i] = true; });
          api.el.querySelector('.sp-brief-pick').hidden = true;
          api.hud({ progress: 2 / 3 });
          api.next('Musterbrief ansehen', step3);
        }
        check.onclick = () => {
          let right = 0; const bad = [];
          fill.forEach((p, i) => {
            const ok = pool[p].slot === i;
            slots[i].classList.toggle('is-right', ok); slots[i].classList.toggle('is-wrong', !ok);
            if (ok) { right++; locked[i] = true; } else bad.push(i);
          });
          const used = fill.filter(p => pool[p].slot === -1).map(p => pool[p]);
          if (!checked) {
            checked = true;
            score += Math.max(0, right - used.length);
            api.hud({ score });
            bad.forEach(i => { if (pool[fill[i]].slot !== -1) wrong.push({ correct: T.b[i], tip: `gehört zu: ${L[i]}` }); });
            used.forEach(p => wrong.push({ correct: `„${p.text}“ passt nicht`, tip: p.why }));
            sol.hidden = false;
          }
          if (!bad.length) {
            api.feedback(true, `<b>Super, alles richtig!</b> <span>Dein Brief ist vollständig.</span>`);
            finishStep(); return;
          }
          active = -1;
          api.el.querySelector('.sp-brief-paper').scrollIntoView({ block: 'start', behavior: smooth() });
          api.feedback(false, `<b>${right} von ${S} Plätzen stimmen.</b>${used.length ? ` <span>${used.map(p => `„${e(p.text)}“ passt nicht: ${e(p.why)}`).join('<br>')}</span>` : ''} <span>Tippe auf die roten Plätze, um sie zu leeren, und setze andere Bausteine ein.</span>`);
          render();
          slots.forEach((s, i) => { if (bad.includes(i)) s.classList.add('is-wrong'); });
        };
        sol.onclick = () => {
          T.b.forEach((_, i) => { fill[i] = pool.findIndex(p => p.slot === i); });
          render();
          api.feedback(true, '<b>Hier ist die Lösung.</b> <span>Lies den Brief noch einmal genau.</span>');
          finishStep();
        };
        render();
      }

      /* Schritt 3: Musterbrief + Regeln */
      function step3() {
        api.clearFeedback();
        api.hud({ progress: 1, step: 'Schritt 3/3' });
        const [anrede, einl, ...rest] = T.b, gruss = rest[rest.length - 2], name = rest[rest.length - 1], lps = rest.slice(0, T.lp.length), schluss = rest[T.lp.length];
        api.el.innerHTML = `<h2 class="sp-brief-q">Dein Musterbrief</h2>
          <div class="sp-brief-letter"><p>${e(anrede)}</p><p>${e(einl)} ${lps.map(e).join(' ')}</p><p>${e(schluss)}</p><p>${e(gruss)}<br>${e(name)}</p></div>
          <button type="button" class="dm-btn dm-btn-quiet sp-brief-speak"><span aria-hidden="true">🔊</span> Vorlesen</button>
          <div class="sp-brief-tip"><h3>Merke: ${e(T.kind)}er Brief</h3><ul>${RULES[T.kind].map(r => `<li>${e(r)}</li>`).join('')}</ul></div>`;
        api.el.querySelector('.sp-brief-speak').onclick = () => api.speak(spoken(T));
        api.next('Ergebnis ansehen', () => api.finish({ score, max, wrong }));
      }

      step1();
    }
  });
})();
