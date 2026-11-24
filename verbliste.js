/* Verb table and trainer: #verben (list), #verben/ueben (10 tasks). Data: verben-data.js */
(function () {
  'use strict';
  const x = DM.esc, $ = (s, r = document) => r.querySelector(s);
  const norm = t => String(t).toLocaleLowerCase('de').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss');
  const plain = t => String(t).toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss'); // 'fahrt' finds 'fährt'
  const shuffle = a => a.map(i => [Math.random(), i]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  const bare = s => s.replace(/ \(.*?\)/g, '');
  const say = t => `<button type="button" class="lh-say" data-s="${x(t)}" aria-label="Vorlesen: ${x(t)}"><span aria-hidden="true">🔊</span></button>`;
  const bind = r => r.querySelectorAll('[data-s]').forEach(b => { b.onclick = () => DM.speak(b.dataset.s); });
  const star = v => window.DMWoerter ? DMWoerter.star({ w: v.inf, f: `${v.pr} – ${v.prt} – ${v.perf}`, b: v.ex }) : '';
  const ORDER = ['A1', 'A2', 'B1', 'B2'];
  function table() {
    DM.page(`${DM.crumbs([['Üben', '#ueben'], ['Verben']])}
      <div class="dm-head"><h1>Unregelmäßige Verben</h1><p class="dm-lead">${DM.verben.length} wichtige Verben mit Präsens, Präteritum, Perfekt und Beispielsatz.</p></div>
      <p class="dm-actions"><a class="dm-btn" href="#verben/ueben">Verben üben</a> <a class="dm-btn dm-btn-quiet" href="#grammatik/a1-perfekt">Regel: Perfekt</a> <a class="dm-btn dm-btn-quiet" href="#grammatik/b1-praeteritum">Regel: Präteritum</a></p>
      <div class="lh-bar"><label><span class="dm-sr">Verb suchen</span><input type="search" id="vb-q" placeholder="Verb suchen, z. B. ging" lang="de"></label>
      <div class="lh-chips" role="group" aria-label="Niveau">${['Alle'].concat(ORDER).map(l => `<button type="button" data-l="${l}" aria-pressed="${l === 'Alle'}">${l}</button>`).join('')}</div></div>
      <p class="dm-small" id="vb-n" role="status"></p><ul class="vb-list" id="vb-l"></ul>`, 'lh-page');
    let lv = 'Alle';
    const draw = () => {
      const q = norm($('#vb-q').value.trim()), q2 = plain($('#vb-q').value.trim());
      const l = DM.verben.filter(v => (lv === 'Alle' || v.level === lv) && (!q || norm([v.inf, v.pr, v.prt, v.perf].join(' ')).includes(q) || plain([v.inf, v.pr, v.prt, v.perf].join(' ')).includes(q2)));
      $('#vb-n').textContent = `${l.length} ${l.length === 1 ? 'Verb' : 'Verben'}`;
      $('#vb-l').innerHTML = l.map(v => `<li><div class="vb-h"><b lang="de">${x(v.inf)}</b><span class="dm-tag">${v.level}</span>${say(bare(v.inf))}${star(v)}</div>
        <dl lang="de"><div><dt>er/sie</dt><dd>${x(v.pr)}</dd></div><div><dt>Präteritum</dt><dd>${x(v.prt)}</dd></div><div><dt>Perfekt</dt><dd>${x(v.perf)}</dd></div></dl><p lang="de">${x(v.ex)}</p></li>`).join('') || '<li>Nichts gefunden.</li>';
      bind($('#vb-l'));
    };
    $('#vb-q').oninput = draw;
    document.querySelectorAll('.lh-chips button').forEach(b => { b.onclick = () => { lv = b.dataset.l; document.querySelectorAll('.lh-chips button').forEach(o => o.setAttribute('aria-pressed', String(o === b))); draw(); }; });
    draw();
  }
  // verbs that (also) form the Perfekt with the other auxiliary in some regions or meanings: never offer it as "wrong"
  const BOTH = /^(schwimmen|frieren|hängen|liegen|sitzen|stehen|springen|fliegen|fahren|laufen|brechen|reißen|ziehen|treiben|schlagen|abfahren|umziehen|einziehen|anfangen|beginnen|heißen|treffen|steigen|sinken)$/;
  const crumbs = () => DM.crumbs([['Üben', '#ueben'], ['Verben', '#verben'], ['Verben üben']]);
  const RARE = /^(dürfen|können|müssen|sollen|wollen|mögen|heißen)$/; // Perfekt hardly used: not asked
  function quiz() {
    const lv = ORDER.includes(DM.store.level) ? DM.store.level : 'A1', max = ORDER.indexOf(lv);
    const own = shuffle(DM.verben.filter(v => v.level === lv && !RARE.test(v.inf))), low = shuffle(DM.verben.filter(v => ORDER.indexOf(v.level) < max && !RARE.test(v.inf)));
    const round = shuffle(own.slice(0, low.length ? 7 : 10).concat(low.slice(0, 3)));
    let k = 0, good = 0;
    const step = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (k >= round.length) {
        DM.page(`${crumbs()}<section class="dm-card lh-card"><h1>Fertig!</h1><p class="lh-big">${good} von ${round.length} richtig</p><p class="dm-actions"><button type="button" class="dm-btn" id="vb-again">Noch einmal</button> <a class="dm-btn dm-btn-quiet" href="#verben">Zur Liste</a></p></section>`, 'lh-page');
        $('#vb-again').onclick = quiz;
        if (good === round.length && DM.celebrate) DM.celebrate($('.lh-card'));
        return;
      }
      const v = round[k], f = k % 3 === 2 && max > 0 ? 'prt' : 'perf', label = f === 'prt' ? 'Präteritum (er/sie)' : 'Perfekt (er/sie)', sol = bare(v[f]);
      const opts = new Set([sol]);
      if (f === 'perf' && !BOTH.test(v.inf)) opts.add(sol.replace(/^(hat|ist)/, a => a === 'hat' ? 'ist' : 'hat'));
      shuffle(DM.verben).some(o => { if (o !== v && bare(o.perf) !== bare(v.perf)) opts.add(bare(o[f])); return opts.size >= 4; });
      const choices = shuffle([...opts]);
      DM.page(`${crumbs()}<section class="dm-card lh-card"><h1 class="dk-h">Verben üben</h1><p class="dm-small">Aufgabe ${k + 1} von ${round.length}</p><p class="lh-q">${label}</p><p class="lh-word" lang="de">${x(v.inf)}</p>
        <div class="vb-opts" lang="de">${choices.map(o => `<button type="button" class="ch-opt" data-o="${x(o)}">${x(o)}</button>`).join('')}</div><div id="vb-r" role="status"></div></section>`, 'lh-page');
      const btns = [...document.querySelectorAll('.vb-opts button')];
      btns.forEach(b => {
        b.onclick = () => {
          const ok = b.dataset.o === sol;
          if (ok) good++;
          btns.forEach(o => { o.disabled = true; if (o.dataset.o === sol) o.classList.add('is-right'); else if (o === b) o.classList.add('is-wrong'); });
          if (!ok && window.DMFehler) DMFehler.add({ q: `${v.inf} – ${label}`, a: sol, src: 'Unregelmäßige Verben', level: v.level, opts: choices, hint: v.ex });
          $('#vb-r').innerHTML = `<p class="${ok ? 'dk-ok' : 'dk-no'}"><b>${ok ? '✓ Richtig!' : 'Richtig ist: ' + x(sol)}</b></p><p lang="de">${x(v.pr)} – ${x(v.prt)} – ${x(v.perf)}</p><p lang="de">${x(v.ex)}</p><p class="dm-actions"><button type="button" class="dm-btn" id="vb-next">Weiter</button></p>`;
          $('#vb-next').onclick = () => { k++; step(); const h = $('main h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } };
          $('#vb-next').focus({ preventScroll: true });
          $('#vb-next').scrollIntoView({ block: 'nearest' });
        };
      });
    };
    step();
  }
  DM.routes.verben = p => { if (p[1] === 'ueben') quiz(); else table(); };
})();
