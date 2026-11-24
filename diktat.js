/* Dictation trainer: #diktat, #diktat/<A1|A2|B1|B2>. Sentences: diktat-data.js (all with finished recordings).
   Two modes: gaps (two or three missing words) and the whole sentence. Wrong sentences go to the mistakes notebook. */
(function () {
  'use strict';
  const x = DM.esc, $ = (s, r = document) => r.querySelector(s), N = 5;
  const LV = { A1: 'Kurze Sätze', A2: 'Alltag', B1: 'Längere Sätze', B2: 'Beruf und komplexe Sätze' };
  const obj = v => v && typeof v === 'object' && !Array.isArray(v);
  // reading never creates the entry (the backup restore relies on that)
  const st = write => { let s = obj(DM.store.diktat) ? DM.store.diktat : {}; if (write) DM.store.diktat = s; if (!obj(s.ok)) s.ok = {}; return s; };
  const shuffle = a => a.map(i => [Math.random(), i]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  // punctuation never counts, hyphens inside a word do
  const toks = s => String(s).normalize('NFC').replace(/[.,!?;:„“"”‚‘()…]/g, ' ').replace(/\s[–-]\s/g, ' ').trim().split(/\s+/).filter(Boolean);
  const low = s => s.toLocaleLowerCase('de');
  /* word alignment (edit distance; a wrong word is one substitution) */
  function diff(target, typed) {
    const a = toks(target), b = toks(typed), m = a.length, n = b.length, same = (i, j) => low(a[i]) === low(b[j]);
    const D = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m; i >= 0; i--) for (let j = n; j >= 0; j--) {
      if (i === m) D[i][j] = n - j;
      else if (j === n) D[i][j] = m - i;
      else D[i][j] = Math.min(D[i + 1][j + 1] + (same(i, j) ? 0 : 1), D[i + 1][j] + 1, D[i][j + 1] + 1);
    }
    const out = [];
    let i = 0, j = 0;
    while (i < m || j < n) {
      if (i < m && j < n && same(i, j) && D[i][j] === D[i + 1][j + 1]) { out.push({ w: a[i], ok: a[i] === b[j], cs: a[i] !== b[j], bad: a[i] !== b[j] ? b[j] : '' }); i++; j++; }
      else if (i < m && j < n && D[i][j] === D[i + 1][j + 1] + 1) { out.push({ w: a[i], bad: b[j] }); i++; j++; }
      else if (i < m && D[i][j] === D[i + 1][j] + 1) { out.push({ w: a[i], miss: true }); i++; }
      else { out.push({ extra: b[j] }); j++; }
    }
    return out;
  }
  DM.diktatDiff = diff; // for tests

  const crumbs = lv => DM.crumbs([['Üben', '#ueben'], ['Diktat', '#diktat'], [lv]]);
  function hub() {
    DM.page(`${DM.crumbs([['Üben', '#ueben'], ['Diktat']])}
      <div class="dm-head"><h1>Diktat</h1><p class="dm-lead">Hör den Satz. Schreib, was du hörst. Du siehst sofort, welches Wort falsch ist.</p></div>
      <div class="lh-levels">${Object.keys(LV).map(l => { const all = DM.diktat[l], ok = all.filter(([, k]) => st().ok[k]).length; return `<a class="dm-card" href="#diktat/${l}"><b>${l}</b><span>${LV[l]}</span><small>${ok} von ${all.length} Sätzen richtig</small></a>`; }).join('')}</div>
      <p class="dm-small">Die Sätze sind mit KI-Stimmen aufgenommen. Satzzeichen zählen nicht, große und kleine Buchstaben schon.</p>`, 'lh-page');
  }
  function setup(lv) {
    const mode = st().mode || (lv === 'A1' ? 'gap' : 'full');
    DM.page(`${crumbs(lv)}
      <div class="dm-head"><h1>Diktat ${lv}</h1><p class="dm-lead">${N} Sätze. Du kannst jeden Satz so oft hören, wie du willst. <span>Schreib Zahlen als Wörter.</span></p></div>
      <fieldset class="dm-card lh-mode"><legend>Wie möchtest du üben?</legend>
        <label><input type="radio" name="lh-m" value="gap"${mode === 'gap' ? ' checked' : ''}> <span><b>Lücken</b> – leicht: nur ein paar Wörter schreiben</span></label>
        <label><input type="radio" name="lh-m" value="full"${mode === 'full' ? ' checked' : ''}> <span><b>Ganzer Satz</b> – schwer: alles schreiben</span></label></fieldset>
      <p class="dm-actions"><button type="button" class="dm-btn" id="dk-go">Diktat starten</button> <a class="dm-btn dm-btn-quiet" href="#diktat">Anderes Niveau</a></p>`, 'lh-page');
    $('#dk-go').onclick = () => { st(true).mode = $('input[name=lh-m]:checked').value; DM.save(); run(lv, st().mode); };
  }
  function run(lv, mode, only) {
    const all = DM.diktat[lv], fresh = shuffle(all.filter(([, k]) => !st().ok[k])), old = shuffle(all.filter(([, k]) => st().ok[k]));
    const round = only || fresh.concat(old).slice(0, N), wrong = [];
    let n = 0, right = 0;
    const step = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (n >= round.length) return end();
      const [text, key] = round[n], words = text.split(' ');
      let gaps = [];
      if (mode === 'gap') {
        const cand = words.map((w, i) => i).filter(i => toks(words[i]).length === 1 && toks(words[i])[0].length > 2);
        gaps = shuffle(cand.length ? cand : [0]).slice(0, words.length > 8 ? 3 : 2).sort((a, b) => a - b);
      }
      const attr = 'lang="de" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false"';
      const field = mode === 'gap'
        ? `<p class="dk-line" lang="de">${words.map((w, i) => gaps.includes(i) ? `<span class="dk-w"><input class="dk-gap" data-i="${i}" aria-label="Lücke ${gaps.indexOf(i) + 1}" size="${Math.max(4, toks(w)[0].length + 1)}" ${attr}>${x(w.replace(toks(w)[0], ''))}</span>` : `<span>${x(w)}</span>`).join(' ')}</p>`
        : `<label class="dk-l">Dein Satz<textarea id="dk-t" data-no-check rows="3" ${attr}></textarea></label>`;
      DM.page(`${crumbs(lv)}
        <section class="dm-card dk-card"><h1 class="dk-h">Satz ${n + 1} von ${round.length}</h1><div class="dk-bar" aria-hidden="true"><i style="width:${n / round.length * 100}%"></i></div>
        <p class="dm-actions"><button type="button" class="dm-btn" id="dk-play">▶ Anhören</button> <button type="button" class="dm-btn dm-btn-quiet" id="dk-slow">Langsam</button></p>
        <form id="dk-f">${field}<p class="dk-keys" role="group" aria-label="Sonderzeichen">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(c => `<button type="button" data-c="${c}">${c}</button>`).join('')}</p>
        <p class="dm-actions"><button type="submit" class="dm-btn" id="dk-check">Prüfen</button></p></form>
        <div id="dk-res" role="status" aria-live="polite"></div></section>`, 'lh-page');
      const play = rate => DM.speak(text, { key, rate });
      $('#dk-play').onclick = () => play(1);
      $('#dk-slow').onclick = () => play(0.8);
      const fields = [...document.querySelectorAll('.dk-gap,#dk-t')];
      let last = fields[0];
      fields.forEach(el => { el.onfocus = () => { last = el; }; });
      document.querySelectorAll('.dk-keys button').forEach(b => {
        b.onmousedown = e => e.preventDefault();
        b.onclick = () => {
          const s = last.selectionStart ?? last.value.length;
          last.value = last.value.slice(0, s) + b.dataset.c + last.value.slice(last.selectionEnd ?? s);
          last.focus(); last.setSelectionRange(s + 1, s + 1);
        };
      });
      const ta = $('#dk-t');
      if (ta) ta.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!e.repeat) $('#dk-f').requestSubmit(); } };
      (DM.ttsReady || Promise.resolve()).then(() => { if ($('#dk-play')) play(1); });
      let checked = false;
      $('#dk-f').onsubmit = e => {
        e.preventDefault();
        if (checked) return;
        if (fields.every(f => !f.value.trim())) { $('#dk-res').innerHTML = '<p class="dm-warn">Schreib zuerst etwas.</p>'; return; }
        checked = true;
        // an empty gap must stay visible as a missing word in its place
        const typed = mode === 'gap' ? words.map((w, i) => { const g = $(`.dk-gap[data-i="${i}"]`); return g ? g.value.trim() || '___' : w; }).join(' ') : ta.value;
        const d = diff(text, typed), ok = d.every(t => t.ok);
        if (ok) { right++; st(true).ok[key] = 1; }
        else {
          wrong.push(round[n]);
          if (window.DMFehler) DMFehler.add({ q: 'Diktat: Hör zu und schreib den Satz.', a: text, src: 'Diktat ' + lv, level: lv, listen: text, lkey: key });
        }
        DM.save();
        fields.concat(...document.querySelectorAll('.dk-keys button')).forEach(el => { el.disabled = true; });
        $('#dk-check').hidden = true;
        $('#dk-res').innerHTML = `<p class="${ok ? 'dk-ok' : 'dk-no'}"><b>${ok ? '✓ Richtig!' : 'Noch nicht ganz richtig.'}</b></p>
          ${ok ? '' : `<p class="dk-diff" lang="de">${d.map(t => t.extra ? `<del>${x(t.extra)}</del>` : t.ok ? x(t.w) : `${t.bad && t.bad !== '___' ? `<del>${x(t.bad)}</del> ` : ''}<mark>${x(t.w)}</mark>`).join(' ')}</p>${d.some(t => t.cs) ? '<p class="dm-small">Achte auf große und kleine Buchstaben.</p>' : ''}`}
          <p class="dk-sol" lang="de">${x(text)}</p><p class="dm-actions"><button type="button" class="dm-btn" id="dk-next">Weiter</button></p>`;
        $('#dk-next').onkeydown = e => { if (e.repeat) e.preventDefault(); };
        $('#dk-next').onclick = () => { n++; step(); const h = $('main h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } };
        $('#dk-next').focus({ preventScroll: true });
        $('#dk-next').scrollIntoView({ block: 'nearest' });
      };
    };
    const end = () => {
      if (DM.stopSpeaking) DM.stopSpeaking();
      st(true).day = new Date().toDateString();
      DM.save();
      DM.page(`${crumbs(lv)}<section class="dm-card lh-card"><h1>${right === round.length ? 'Super!' : 'Gut geübt!'}</h1><p class="lh-big">${right} von ${round.length} richtig</p>
        ${wrong.length ? '<p>Die falschen Sätze findest du in „<a href="#fehler">Meine Fehler</a>“.</p>' : ''}
        <p class="dm-actions">${wrong.length ? '<button type="button" class="dm-btn" id="dk-again">Falsche Sätze noch einmal</button> ' : ''}<button type="button" class="dm-btn${wrong.length ? ' dm-btn-quiet' : ''}" id="dk-new">Neue Sätze</button> <a class="dm-btn dm-btn-quiet" href="#diktat">Anderes Niveau</a></p></section>`, 'lh-page');
      if (right === round.length && DM.celebrate) DM.celebrate($('.lh-card'));
      $('#dk-new').onclick = () => run(lv, mode);
      const ag = $('#dk-again');
      if (ag) ag.onclick = () => run(lv, mode, wrong);
    };
    step();
  }
  DM.routes.diktat = p => { const lv = String(p[1] || '').toUpperCase(); if (DM.diktat[lv]) setup(lv); else hub(); };
})();
