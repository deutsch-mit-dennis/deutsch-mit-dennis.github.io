/* Tages-Challenge: jeden Tag 10 gemischte Aufgaben (gleich für alle an diesem Tag), mit Lernserie 🔥.
   Aufgaben: challenge-data.js (DM_CHALLENGE), Wortschatz (wordLibrary), LiD-Katalog (LID_KATALOG).
   Fortschritt nur im Browser: localStorage 'dm-challenge'. Route: #challenge */
(() => {
  const KEY = 'dm-challenge', LEVELS = { A: 'A1–A2', B: 'B1' };
  const BADGES = [[3, '🥉', '3 Tage'], [7, '🥈', '1 Woche'], [14, '🥇', '2 Wochen'], [30, '🏆', '1 Monat'], [100, '👑', '100 Tage']];
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const put = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return today(d); };
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- Zufall mit Startwert (gleiche Aufgaben für alle an einem Tag) ---------- */
  function rng(seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  }
  const shuffle = (a, r) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n, r) => shuffle(a, r).slice(0, n);

  /* ---------- Aufgaben zusammenstellen ---------- */
  function vocabNouns() {
    try { // wordLibrary aus vocab-data.js (globale Konstante)
      // eslint-disable-next-line no-undef
      return Object.values(wordLibrary).filter(w => w.pos === 'Nomen' && /^(der|die|das) \S/.test(w.word))
        .map(w => ({ w: w.word.replace(/^(der|die|das) /, ''), a: w.word.split(' ')[0], lvl: 'A', tip: w.example ? `Beispiel: ${w.example}` : '' }));
    } catch { return []; }
  }
  function lidItems() {
    return (window.LID_KATALOG || []).filter(q => !q.img || !q.img.length).map(q => ({ q: q.q, o: q.a, a: q.s, nr: q.nr }));
  }
  function build(lvl, seed) {
    const D = window.DM_CHALLENGE || {}, r = rng(seed + '|' + lvl);
    const L = list => (list || []).filter(x => x.lvl === lvl);
    const seen = new Set();
    const artPool = [...L(D.artikel), ...(lvl === 'A' ? vocabNouns() : [])].filter(x => !seen.has(x.w) && seen.add(x.w));
    const mc = (type, label, it) => { const order = shuffle([0, 1, 2].slice(0, it.o.length), r); return { type, label, q: it.q, o: order.map(i => it.o[i]), a: order.indexOf(it.a), tip: it.tip }; };
    const tasks = [
      ...pick(artPool, 3, r).map(it => ({ type: 'artikel', label: 'Der, die oder das?', q: it.w, o: ['der', 'die', 'das'], a: ['der', 'die', 'das'].indexOf(it.a), tip: it.tip })),
      ...pick(L(D.verb), 2, r).map(it => mc('verb', 'Welche Verbform passt?', it)),
      ...pick(L(D.kasus), 1, r).map(it => mc('kasus', 'Welches Wort passt?', it)),
      ...pick(L(D.satz), 2, r).map(it => ({ type: 'satz', label: 'Bilde den Satz', words: it.words, alt: it.alt || [], end: it.end || '.', tip: it.tip, mix: shuffle(it.words.slice(1).map((w, i) => ({ w, i })), r) })),
      ...pick(L(D.wort), 1, r).map(it => mc('wort', 'Wortschatz', it))
    ];
    const lid = pick(lidItems(), 1, r)[0];
    if (lid) { const order = shuffle([0, 1, 2, 3], r); tasks.push({ type: 'lid', label: `Leben in Deutschland · Frage ${esc(lid.nr)}`, q: lid.q, o: order.map(i => lid.o[i]), a: order.indexOf(lid.a), tip: 'Aus dem offiziellen Fragenkatalog „Leben in Deutschland“.' }); }
    // Artikel nicht alle hintereinander: leicht mischen, aber mit einem Artikel anfangen
    return [tasks[0], ...shuffle(tasks.slice(1), r)];
  }

  /* ---------- Serie ---------- */
  function streakInfo(s = get()) {
    const t = today(), y = addDays(t, -1);
    const alive = s.last === t || s.last === y;
    return { streak: alive ? s.streak || 0 : 0, best: s.best || 0, doneToday: s.last === t, total: s.total || 0 };
  }
  function finish(lvl, score) {
    const s = get(), t = today();
    if (s.last !== t) {
      s.streak = s.last === addDays(t, -1) ? (s.streak || 0) + 1 : 1;
      s.best = Math.max(s.best || 0, s.streak);
      s.total = (s.total || 0) + 1;
      s.last = t;
    }
    s.days = { ...(s.days || {}), [t]: { lvl, score } };
    const keys = Object.keys(s.days).sort(); if (keys.length > 120) keys.slice(0, keys.length - 120).forEach(k => delete s.days[k]);
    s.lvl = lvl;
    put(s);
    try { window.dispatchEvent(new Event('dm-challenge')); } catch {}
    return s;
  }
  function weekRow(s = get()) {
    const t = today(), names = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return `<ol class="ch-week" aria-label="Die letzten 7 Tage">${[6, 5, 4, 3, 2, 1, 0].map(n => {
      const d = addDays(t, -n), done = s.days && s.days[d], wd = names[new Date(d + 'T12:00:00').getDay()];
      return `<li class="${done ? 'is-done' : ''}${n === 0 ? ' is-today' : ''}"><span>${wd}</span><b aria-label="${done ? 'geschafft' : 'offen'}">${done ? '🔥' : n === 0 ? '·' : '–'}</b></li>`;
    }).join('')}</ol>`;
  }

  /* ---------- Seiten ---------- */
  const head = () => `${DM.crumbs([['Üben', '#ueben'], ['Tages-Challenge']])}`;

  function intro() {
    const s = get(), st = streakInfo(s), lvl = s.lvl || 'A';
    const res = st.doneToday && s.days?.[today()];
    DM.page(`${head()}
      <section class="ch-card ch-intro">
        <p class="ch-kicker">Jeden Tag neu · 10 Aufgaben · ca. 3 Minuten</p>
        <h1>Tages-Challenge</h1>
        <div class="ch-streak${st.streak ? ' is-on' : ''}"><span class="ch-flame" aria-hidden="true">🔥</span><div><b>${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'}</b><span>${st.streak ? 'in Folge – mach weiter!' : 'Starte heute deine Lernserie.'}</span></div>${st.best > 1 ? `<small>Rekord: ${st.best}</small>` : ''}</div>
        ${weekRow(s)}
        ${res ? `<p class="ch-done">✓ Heute geschafft: <b>${res.score} von 10</b> richtig. Morgen gibt es neue Aufgaben.</p>` : ''}
        <fieldset class="ch-level"><legend>Dein Niveau</legend>
          ${Object.entries(LEVELS).map(([k, v]) => `<label><input type="radio" name="ch-lvl" value="${k}"${k === lvl ? ' checked' : ''}><span>${v}</span></label>`).join('')}
        </fieldset>
        <div class="ch-actions">
          ${res ? `<button type="button" class="dm-btn" id="ch-start" data-practice="1">Nochmal üben (ohne Wertung)</button>` : `<button type="button" class="dm-btn ch-go" id="ch-start">Challenge starten</button>`}
        </div>
        <ul class="ch-what"><li>Artikel</li><li>Verben</li><li>Satzbau</li><li>Grammatik</li><li>Wortschatz</li><li>Leben in Deutschland</li></ul>
        ${badges(s)}
        <p class="dm-small">Alle bekommen heute dieselben Aufgaben – vergleiche dich mit deinem Kurs! Dein Fortschritt bleibt nur auf diesem Gerät.</p>
      </section>`, 'ch-page');
    $('#ch-start').onclick = e => {
      const lvl = document.querySelector('input[name=ch-lvl]:checked')?.value || 'A';
      const s2 = get(); s2.lvl = lvl; put(s2);
      play(lvl, !!e.currentTarget.dataset.practice);
    };
  }
  function badges(s) {
    const best = s.best || 0;
    return `<div class="ch-badges" aria-label="Abzeichen">${BADGES.map(([n, ic, t]) => `<span class="${best >= n ? 'is-on' : ''}" title="${t} in Folge"><i aria-hidden="true">${ic}</i>${t}</span>`).join('')}</div>`;
  }

  function play(lvl, practice) {
    const seed = practice ? 'p' + Date.now() : today();
    const tasks = build(lvl, seed);
    let i = 0, score = 0;
    const wrong = [];
    const render = () => {
      const t = tasks[i];
      DM.page(`${head()}
        <section class="ch-card ch-play" aria-live="polite">
          <div class="ch-top"><span>${i + 1} / ${tasks.length}</span><div class="ch-bar"><i style="width:${i / tasks.length * 100}%"></i></div><span class="ch-score">⭐ ${score}</span></div>
          <p class="ch-label">${esc(t.label)}</p>
          ${t.type === 'satz' ? satzHTML(t) : mcHTML(t)}
          <div class="ch-feedback" hidden></div>
          <div class="ch-actions"><button type="button" class="dm-btn" id="ch-check"${t.type === 'satz' ? ' disabled' : ' hidden'}>Prüfen</button><button type="button" class="dm-btn" id="ch-next" hidden>${i + 1 < tasks.length ? 'Weiter' : 'Ergebnis ansehen'}</button></div>
          <p class="ch-keys dm-small">Tipp am Computer: Tasten 1–4 zum Antworten, Enter für „Weiter“.</p>
        </section>`, 'ch-page');
      window.scrollTo({ top: 0, behavior: 'instant' });
      t.type === 'satz' ? bindSatz(t) : bindMC(t);
      $('#ch-next').onclick = () => { i++; i < tasks.length ? render() : result(); };
    };
    const feedback = (ok, t, correctText) => {
      if (ok) score++; else wrong.push({ t, correctText });
      const fb = $('.ch-feedback');
      fb.hidden = false; fb.className = 'ch-feedback ' + (ok ? 'is-ok' : 'is-bad');
      fb.innerHTML = `<b>${ok ? ['Richtig!', 'Super!', 'Genau!', 'Sehr gut!'][score % 4] : 'Leider falsch.'}</b>${ok ? '' : ` Richtig ist: <b>${esc(correctText)}</b>.`}${t.tip ? `<span>${esc(t.tip)}</span>` : ''}`;
      $('.ch-score').textContent = '⭐ ' + score;
      $('#ch-check').hidden = true;
      const n = $('#ch-next'); n.hidden = false; n.focus({ preventScroll: true });
      if ('vibrate' in navigator && !ok) try { navigator.vibrate(60); } catch {}
    };
    const mcHTML = t => `${t.type === 'artikel' ? `<p class="ch-q ch-noun"><span class="ch-gap">___</span> ${esc(t.q)}</p>` : `<p class="ch-q">${esc(t.q).replace('___', '<span class="ch-gap">___</span>')}</p>`}
      <div class="ch-opts${t.type === 'artikel' ? ' ch-opts-art' : ''}">${t.o.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}</div>`;
    function bindMC(t) {
      const btns = [...document.querySelectorAll('.ch-opt')];
      btns.forEach(b => b.onclick = () => {
        if (btns[0].disabled) return;
        const k = +b.dataset.k, ok = k === t.a;
        btns.forEach(x => { x.disabled = true; if (+x.dataset.k === t.a) x.classList.add('is-right'); });
        if (!ok) b.classList.add('is-wrong');
        const gap = $('.ch-gap'); if (gap) { gap.textContent = t.o[t.a]; gap.classList.add('is-filled'); }
        feedback(ok, t, t.type === 'artikel' ? `${t.o[t.a]} ${t.q}` : t.o[t.a]);
      });
    }
    const satzHTML = t => `<div class="ch-built" aria-label="Dein Satz"><span class="ch-chip is-fixed">${esc(t.words[0])}</span></div>
      <div class="ch-pool">${t.mix.map(m => `<button type="button" class="ch-chip" data-i="${m.i}">${esc(m.w)}</button>`).join('')}</div>`;
    function bindSatz(t) {
      const built = $('.ch-built'), pool = $('.ch-pool'), check = $('#ch-check');
      const upd = () => { check.disabled = pool.querySelectorAll('.ch-chip:not([hidden])').length > 0; };
      pool.addEventListener('click', e => {
        const b = e.target.closest('.ch-chip'); if (!b || b.disabled) return;
        const c = document.createElement('button'); c.type = 'button'; c.className = 'ch-chip is-placed'; c.textContent = b.textContent; c.dataset.i = b.dataset.i;
        built.append(c); b.hidden = true; upd();
      });
      built.addEventListener('click', e => {
        const c = e.target.closest('.ch-chip.is-placed'); if (!c || check.hidden) return;
        pool.querySelector(`.ch-chip[data-i="${c.dataset.i}"]`).hidden = false; c.remove(); upd();
      });
      check.onclick = () => {
        const chosen = [t.words[0], ...[...built.querySelectorAll('.is-placed')].map(c => c.textContent)];
        const norm = a => a.join(' ').replace(/\s+/g, ' ').trim();
        const ok = [t.words, ...t.alt].some(w => norm(w) === norm(chosen));
        built.classList.add(ok ? 'is-right' : 'is-wrong');
        built.querySelectorAll('.ch-chip').forEach(c => c.disabled = true);
        built.insertAdjacentHTML('beforeend', `<span class="ch-end">${esc(t.end)}</span>`);
        feedback(ok, t, norm(t.words) + t.end);
      };
    }
    const result = () => {
      const s = practice ? get() : finish(lvl, score), st = streakInfo(s);
      const newBadge = !practice && BADGES.find(([n]) => st.streak === n);
      const msg = score >= 9 ? 'Ausgezeichnet!' : score >= 7 ? 'Sehr gut gemacht!' : score >= 5 ? 'Gut – weiter so!' : 'Dranbleiben lohnt sich!';
      DM.page(`${head()}
        <section class="ch-card ch-result">
          <p class="ch-kicker">${practice ? 'Übungsrunde' : 'Tages-Challenge · ' + new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}</p>
          <h1>${msg}</h1>
          <p class="ch-big">${score} <small>von ${tasks.length}</small></p>
          ${practice ? '' : `<div class="ch-streak is-on"><span class="ch-flame" aria-hidden="true">🔥</span><div><b>${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'} in Folge</b><span>Komm morgen wieder, damit deine Serie weiterläuft.</span></div></div>${weekRow(s)}`}
          ${newBadge ? `<p class="ch-newbadge">${newBadge[1]} Neues Abzeichen: <b>${newBadge[2]} in Folge!</b></p>` : ''}
          ${wrong.length ? `<details class="ch-review"><summary>Deine Fehler ansehen (${wrong.length})</summary><ul>${wrong.map(w => `<li><b>${esc(w.correctText)}</b>${w.t.tip ? ` – ${esc(w.t.tip)}` : ''}</li>`).join('')}</ul></details>` : ''}
          <div class="ch-actions">
            <button type="button" class="dm-btn" id="ch-share">🔗 Ergebnis teilen</button>
            <a class="dm-btn dm-btn-quiet" href="#challenge">Zur Übersicht</a>
          </div>
          <p class="dm-small">Weiterlernen: <a href="#lid">LiD-Trainer</a> · <a href="#ueben">Sprechen und Schreiben</a> · <a href="#hoeren">Hören</a></p>
        </section>`, 'ch-page');
      window.scrollTo({ top: 0, behavior: 'instant' });
      const card = $('.ch-result'); if (score >= 7 && DM.celebrate) DM.celebrate(card);
      $('#ch-share').onclick = async () => {
        const text = `🔥 Tages-Challenge „Deutsch mit Dennis“: ${score}/10${practice ? '' : ` · ${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'} in Folge`}. Schaffst du mehr?`;
        const url = 'https://deutsch-mit-dennis.de/challenge/';
        try { if (navigator.share) { await navigator.share({ title: 'Tages-Challenge', text, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
        try { await navigator.clipboard.writeText(text + ' ' + url); $('#ch-share').textContent = '✓ Text kopiert'; } catch {}
      };
    };
    render();
  }

  /* Tastatur: 1–4 Antwort, Enter = Weiter/Prüfen */
  document.addEventListener('keydown', e => {
    if (!document.querySelector('.ch-play') || e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^[1-4]$/.test(e.key)) { const b = document.querySelector(`.ch-opt[data-k="${+e.key - 1}"]`); if (b && !b.disabled) { e.preventDefault(); b.click(); } }
    else if (e.key === 'Enter') {
      const n = document.getElementById('ch-next'), c = document.getElementById('ch-check');
      if (n && !n.hidden && document.activeElement !== n) { e.preventDefault(); n.click(); }
      else if (c && !c.hidden && !c.disabled && document.activeElement?.tagName !== 'BUTTON') { e.preventDefault(); c.click(); }
    }
  });

  /* Kachel für die Startseite */
  function teaser() {
    const st = streakInfo();
    return `<a class="ch-teaser${st.doneToday ? ' is-done' : ''}" href="#challenge">
      <span class="ch-flame" aria-hidden="true">🔥</span>
      <span class="ch-teaser-t"><b>Tages-Challenge</b><span>${st.doneToday ? `Heute geschafft · ${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'} in Folge` : st.streak ? `Deine Serie: ${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'} – heute noch nicht gespielt!` : '10 Aufgaben, 3 Minuten – jeden Tag neu.'}</span></span>
      <span class="ch-teaser-go">${st.doneToday ? 'Ansehen' : 'Jetzt spielen'} →</span></a>`;
  }

  window.DMChallenge = { status: streakInfo, teaser, today };
  DM.routes ||= {};
  DM.routes.challenge = () => intro();
})();
