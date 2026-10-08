/* DTZ-Trainer „Bild beschreiben“: Adjektivendungen (Akkusativ nach unbestimmtem Artikel), Relativsätze,
   Sätze bauen und freie Beschreibung mit Musterlösung. Daten: bild-data.js (window.DM_BILD, erzeugt aus tools/bild/*.json).
   Route: #bild und #bild/<szene>/<teil>. Fortschritt nur im Browser (DM.store.bild). */
(() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const S = () => window.DM_BILD || [];
  const G = { der: ['der', 'g-der', 'maskulin'], die: ['die', 'g-die', 'feminin'], das: ['das', 'g-das', 'neutral'], pl: ['Plural', 'g-pl', 'Plural'] };
  const PARTS = [['endungen', '1', 'Adjektivendungen', 'einen blauen Pullover, eine graue Bluse …'], ['relativ', '2', 'Relativsätze', 'ein Mann, der …'], ['bauen', '3', 'Sätze bauen', 'Verb ans Ende'], ['beschreiben', '4', 'Bild beschreiben', 'frei sprechen und schreiben']];
  const REDEMITTEL = [['Einleitung', 'Auf dem Bild sehe ich … · Das Bild zeigt …'], ['Ort', 'Im Vordergrund / Im Hintergrund … · Links / Rechts / In der Mitte …'], ['Personen', 'Ich sehe einen Mann, der … · Die Frau trägt eine graue Bluse.'], ['Vermutung', 'Ich glaube, dass … · Vielleicht … · Es sieht so aus, als ob …'], ['Eigene Erfahrung', 'Bei mir ist das so: … · In meiner Heimat …']];
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const mem = () => { const m = (window.DM && DM.store) || {}; m.bild ||= {}; return m.bild; };
  const persist = () => { try { localStorage.setItem('dmd.v1', JSON.stringify(DM.store)); } catch {} };
  const crumbs = (...c) => DM.crumbs([['Prüfungstraining', '#pruefung'], ['Bild beschreiben', c.length ? '#bild' : null], ...c]);

  /* „Der Mann trägt [ein|eine|einen*] …“ → Teile */
  function parse(s) {
    const out = []; let last = 0;
    s.replace(/\[([^\]]+)\]/g, (m, inner, i) => {
      if (i > last) out.push({ t: s.slice(last, i) });
      const raw = inner.split('|'); out.push({ o: raw.map(x => x.replace(/\*$/, '')), a: raw.findIndex(x => x.endsWith('*')) });
      last = i + m.length; return m;
    });
    if (last < s.length) out.push({ t: s.slice(last) });
    return out;
  }
  const solved = s => s.replace(/\[([^\]]+)\]/g, (m, inner) => inner.split('|').find(x => x.endsWith('*')).replace(/\*$/, ''));

  function figure(sc, who) {
    const p = sc.personen.find(x => x.id === who);
    return `<figure class="bd-fig"><img src="${esc(sc.svg)}" alt="${esc(sc.alt)}" width="800" height="500">${p ? `<span class="bd-hl" style="left:${p.box[0]}%;top:${p.box[1]}%;width:${p.box[2]}%;height:${p.box[3]}%" aria-hidden="true"></span><figcaption>${esc(p.name)}</figcaption>` : ''}</figure>`;
  }

  /* ---------- Übersicht ---------- */
  function hub() {
    const m = mem();
    DM.page(`${crumbs()}
      <div class="dm-head"><h1>Bild beschreiben – DTZ-Trainer</h1><p class="dm-lead">In der DTZ-Prüfung beschreibst du ein Bild. Dafür brauchst du vor allem zwei Dinge: <b>Adjektivendungen</b> (einen blauen Pullover, eine graue Bluse) und <b>Relativsätze</b> (ein Mann, der Kaffee trinkt). Hier übst du beides an Bildern – Schritt für Schritt.</p></div>
      <div class="bd-legend" aria-label="Farben für das Genus"><span class="g-der">der · einen …-en</span><span class="g-die">die · eine …-e</span><span class="g-das">das · ein …-es</span><span class="g-pl">Plural · …-e</span></div>
      <div class="bd-grid">${S().map(sc => {
        const done = PARTS.filter(([k]) => m[sc.id + ':' + k]).length;
        return `<a class="bd-scene" href="#bild/${sc.id}"><img src="${esc(sc.svg)}" alt="" width="400" height="250" loading="lazy"><span><small>${esc(sc.thema)} · ${esc(sc.level)}</small><b>${esc(sc.title)}</b><span class="bd-prog">${done ? `${done} von 4 Teilen geschafft` : '4 Teile'}</span></span></a>`;
      }).join('')}</div>
      <section class="dm-card bd-rm"><h2>Redemittel für die Prüfung</h2><dl>${REDEMITTEL.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>
      <p class="dm-small">Arbeitsblätter mit Lösungen zum Ausdrucken findest du unter <a href="#material/pruefung">Materialien → Prüfung DTZ</a>.</p></section>`, 'bd-page');
  }

  /* ---------- Szene ---------- */
  function scene(sc) {
    const m = mem();
    DM.page(`${crumbs([sc.title])}
      <div class="dm-head"><h1>${esc(sc.title)}</h1><p class="dm-lead">Schau dir das Bild genau an. Dann übe in vier Schritten.</p></div>
      <div class="bd-scene-wrap">${figure(sc)}
        <ol class="bd-parts">${PARTS.map(([k, n, t, d]) => `<li><a href="#bild/${sc.id}/${k}"><span class="bd-n">${m[sc.id + ':' + k] ? '✓' : n}</span><span><b>${t}</b><small>${esc(d)}</small></span></a></li>`).join('')}</ol>
      </div>`, 'bd-page');
  }

  /* ---------- Übungsrunde (Teil 1–3) ---------- */
  function run(sc, part) {
    const items = shuffle(sc[part] || []);
    let i = 0, score = 0;
    const wrong = [];
    const title = PARTS.find(p => p[0] === part)[2];
    const render = () => {
      const it = items[i];
      DM.page(`${crumbs([sc.title, '#bild/' + sc.id], [title])}
        <div class="bd-play">
          ${figure(sc, it.who)}
          <section class="ch-card bd-card" aria-live="polite">
            <div class="ch-top"><span>${i + 1} / ${items.length}</span><div class="ch-bar"><i style="width:${i / items.length * 100}%"></i></div><span class="ch-score">⭐ ${score}</span></div>
            <p class="ch-label">${part === 'endungen' ? 'Wähle die richtige Form.' : part === 'relativ' ? 'Welches Relativpronomen passt?' : 'Bilde den Relativsatz: Tippe die Wörter in der richtigen Reihenfolge an.'}${it.g ? ` <span class="bd-g ${G[it.g][1]}">${G[it.g][0]}</span>` : ''}</p>
            ${part === 'bauen' ? buildHTML(it) : gapHTML(it)}
            <div class="ch-feedback" hidden></div>
            <div class="ch-actions"><button type="button" class="dm-btn" id="ch-check"${part === 'bauen' ? ' disabled' : ' hidden'}>Prüfen</button><button type="button" class="dm-btn" id="ch-next" hidden>${i + 1 < items.length ? 'Weiter' : 'Ergebnis'}</button></div>
          </section>
        </div>`, 'bd-page');
      part === 'bauen' ? bindBuild(it) : bindGaps(it);
      $('#ch-next').onclick = () => { i++; i < items.length ? render() : result(); };
    };
    const feedback = (ok, it, correct) => {
      if (ok) score++; else wrong.push({ correct, tip: it.tip });
      const fb = $('.ch-feedback'); fb.hidden = false; fb.className = 'ch-feedback ' + (ok ? 'is-ok' : 'is-bad');
      fb.innerHTML = `<b>${ok ? 'Richtig!' : 'Nicht ganz.'}</b>${ok ? '' : ` Richtig: <b>${esc(correct)}</b>`}${it.tip ? `<span>${esc(it.tip)}</span>` : ''}`;
      $('.ch-score').textContent = '⭐ ' + score; $('#ch-check').hidden = true;
      const n = $('#ch-next'); n.hidden = false; n.focus({ preventScroll: true });
    };
    const gapHTML = it => `<p class="bd-sent">${parse(it.s).map((p, k) => p.t != null ? esc(p.t) : `<span class="bd-gap" data-k="${k}"><span class="bd-slot">…</span><span class="bd-opts">${p.o.map((o, j) => `<button type="button" class="bd-o" data-j="${j}">${esc(o)}</button>`).join('')}</span></span>`).join('')}</p>`;
    function bindGaps(it) {
      const parts = parse(it.s), gaps = $$('.bd-gap'); let allOk = true, open = gaps.length;
      gaps.forEach(gp => gp.addEventListener('click', e => {
        const b = e.target.closest('.bd-o'); if (!b || gp.classList.contains('is-set')) return;
        const p = parts[+gp.dataset.k], j = +b.dataset.j, ok = j === p.a;
        if (!ok) allOk = false;
        gp.classList.add('is-set', ok ? 'is-right' : 'is-wrong');
        gp.querySelector('.bd-slot').textContent = p.o[p.a];
        if (it.g) gp.querySelector('.bd-slot').classList.add(G[it.g][1]);
        if (--open === 0) feedback(allOk, it, solved(it.s));
      }));
    }
    const buildHTML = it => `<div class="ch-built"><span class="ch-chip is-fixed">${esc(it.start)}</span></div><div class="ch-pool">${shuffle(it.words.map((w, k) => ({ w, k }))).map(m => `<button type="button" class="ch-chip" data-i="${m.k}">${esc(m.w)}</button>`).join('')}</div>`;
    function bindBuild(it) {
      const built = $('.ch-built'), pool = $('.ch-pool'), check = $('#ch-check');
      const upd = () => { check.disabled = !!pool.querySelector('.ch-chip:not([hidden])'); };
      pool.onclick = e => { const b = e.target.closest('.ch-chip'); if (!b) return; const c = document.createElement('button'); c.type = 'button'; c.className = 'ch-chip is-placed'; c.textContent = b.textContent; c.dataset.i = b.dataset.i; built.append(c); b.hidden = true; upd(); };
      built.onclick = e => { const c = e.target.closest('.ch-chip.is-placed'); if (!c || check.hidden) return; pool.querySelector(`[data-i="${c.dataset.i}"]`).hidden = false; c.remove(); upd(); };
      check.onclick = () => {
        const got = $$('.is-placed', built).map(c => c.textContent).join(' '), want = it.words.join(' ');
        const ok = got === want; built.classList.add(ok ? 'is-right' : 'is-wrong'); $$('.ch-chip', built).forEach(c => c.disabled = true);
        built.insertAdjacentHTML('beforeend', `<span class="ch-end">${esc(it.end || '.')}</span>`);
        feedback(ok, it, `${it.start} ${want}${it.end || '.'}`);
      };
    }
    const result = () => {
      const m = mem(); m[sc.id + ':' + part] = { score, of: items.length, ts: Date.now() }; persist();
      const idx = PARTS.findIndex(p => p[0] === part), next = PARTS[idx + 1];
      DM.page(`${crumbs([sc.title, '#bild/' + sc.id], [title])}
        <section class="ch-card ch-result bd-result"><p class="ch-kicker">${esc(sc.title)} · ${title}</p><h1>${score >= items.length - 1 ? 'Sehr gut!' : score >= items.length / 2 ? 'Gut gemacht!' : 'Weiter üben!'}</h1>
          <p class="ch-big">${score} <small>von ${items.length}</small></p>
          ${wrong.length ? `<details class="ch-review" open><summary>Merk dir diese Sätze (${wrong.length})</summary><ul>${wrong.map(w => `<li><b>${esc(w.correct)}</b>${w.tip ? ` – ${esc(w.tip)}` : ''}</li>`).join('')}</ul></details>` : ''}
          <div class="ch-actions">${next ? `<a class="dm-btn" href="#bild/${sc.id}/${next[0]}">Weiter: ${next[2]}</a>` : ''}<a class="dm-btn dm-btn-quiet" href="#bild/${sc.id}/${part}" onclick="setTimeout(()=>window.route&&route(),0)">Nochmal</a></div>
        </section>`, 'bd-page');
      if (score >= items.length - 1 && DM.celebrate) DM.celebrate($('.bd-result'));
    };
    render();
  }

  /* ---------- Teil 4: frei beschreiben ---------- */
  function describe(sc) {
    const m = mem();
    DM.page(`${crumbs([sc.title, '#bild/' + sc.id], ['Bild beschreiben'])}
      <div class="bd-play">
        ${figure(sc)}
        <section class="ch-card bd-card">
          <h1 class="bd-h">Beschreibe das Bild</h1>
          <p>Sprich zuerst laut, etwa eine Minute lang. Dann schreib 4–6 Sätze. Benutze Adjektive und mindestens zwei Relativsätze.</p>
          <details class="bd-rm-mini"><summary>Redemittel</summary><dl>${REDEMITTEL.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl></details>
          <label class="bd-lbl" for="bd-text">Deine Beschreibung</label>
          <textarea id="bd-text" rows="7" placeholder="Auf dem Bild sehe ich …">${esc(m[sc.id + ':text'] || '')}</textarea>
          <details class="bd-model"><summary>Musterbeschreibung ansehen</summary><p>${esc(sc.muster)}</p><button type="button" class="dm-btn dm-btn-quiet" id="bd-speak">🔊 Anhören</button></details>
          <h2 class="bd-h2">Fragen der Prüferin / des Prüfers</h2><ul class="bd-q">${(sc.fragen || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
          <div class="ch-actions"><button type="button" class="dm-btn" id="bd-done">Fertig – Teil 4 abhaken</button><a class="dm-btn dm-btn-quiet" href="#bild">Andere Bilder</a></div>
        </section>
      </div>`, 'bd-page');
    const ta = $('#bd-text');
    ta.addEventListener('input', () => { m[sc.id + ':text'] = ta.value.slice(0, 3000); persist(); });
    $('#bd-speak').onclick = () => DM.speak && DM.speak(sc.muster);
    $('#bd-done').onclick = e => { m[sc.id + ':beschreiben'] = { ts: Date.now() }; persist(); e.target.textContent = '✓ Geschafft'; if (DM.celebrate) DM.celebrate($('.bd-card')); };
  }

  DM.routes ||= {};
  DM.routes.bild = p => {
    const sc = S().find(s => s.id === p[1]);
    if (!sc) return hub();
    if (!p[2]) return scene(sc);
    if (p[2] === 'beschreiben') return describe(sc);
    if (['endungen', 'relativ', 'bauen'].includes(p[2])) return run(sc, p[2]);
    scene(sc);
  };
})();
