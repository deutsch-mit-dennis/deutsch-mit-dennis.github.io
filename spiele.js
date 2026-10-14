/* Lernspiele – gemeinsame Grundlage (Route #spiele und #spiele/<id>).
   Jedes Spiel liegt in spiele/<id>.js und meldet sich so an:

   DMGame.register({
     id: 'zahlen', title: 'Zahlen-Ohr', icon: '🔢', level: 'A1–B1',
     desc: 'Ein Satz zur Karte',            // für die Übersicht
     intro: 'Ein, zwei Sätze Spielregel',   // Startbildschirm
     options: [{ id: 'A', label: 'A1–A2' }, { id: 'B', label: 'B1' }],   // optional: Auswahl vor dem Start (z. B. Niveau/Thema)
     cat: 'basis' | 'alltag' | 'b2' | 'lid',  // Bereich auf der Übersicht (Standard: basis)
     start(api, option) { … }              // baut das Spiel in api.el
   });

   api:
     api.el                       – Container für das Spiel (leer)
     api.hud({ progress: 0..1, score, lives, time })   – Kopfzeile aktualisieren (nur angegebene Felder)
     api.feedback(ok, html)       – grüne/rote Rückmeldebox unter dem Spiel (html = sichere, bereits escapte Zeichenkette)
     api.clearFeedback()
     api.next(label, fn)          – zeigt den „Weiter“-Knopf (Enter löst ihn aus); fn wird beim Klick aufgerufen
     api.finish({ score, max, wrong: [{ correct, tip }] })   – Ergebnisseite, speichert Highscore
     api.speak(text, onend)       – liest vor (natürliche Aufnahme, falls vorhanden, sonst Gerätestimme)
     api.esc(str), api.shuffle(arr), api.pick(arr, n)
     api.timer(seconds, onTick(rest), onEnd) → { stop() }   – Countdown
     api.vibrate()                – kurzes Vibrieren bei Fehlern (Handy)
   Gestaltung: Klassen aus extras.css nutzen (ch-opt, ch-chip, ch-pool, ch-built, ch-feedback …), eigene Klassen mit Präfix sp-<id>-.
   Fortschritt/Highscore: localStorage 'dm-spiele' { <id>: { best, plays, last } }. */
(() => {
  const KEY = 'dm-spiele', games = [];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const put = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  const $ = (s, r = document) => r.querySelector(s);
  let activeTimer = null, keyHandler = null;
  const stopAll = () => { if (activeTimer) activeTimer.stop(); activeTimer = null; try { window.speechSynthesis?.cancel(); } catch {} };

  const crumbs = g => DM.crumbs([['Üben', '#ueben'], ['Lernspiele', '#spiele'], [g.title]]);

  const CATS = [
    { id: 'basis', icon: '🧩', t: 'Wörter und Grammatik', d: 'Zahlen, Artikel, Verben, Memory und Briefe – für A1 bis B1.' },
    { id: 'alltag', icon: '🛒', t: 'Alltag: Reisen, Einkaufen, Ämter', d: 'Wortschatz für Bahnhof, Supermarkt, Arzt, Wohnung und Behörden – ganz ohne Prüfungsdruck.' },
    { id: 'b2', icon: '💼', t: 'Prüfung DTB B2 Beruf', d: 'Redemittel, Nomen-Verb-Verbindungen, Präpositionen und Konnektoren für den Beruf.' },
    { id: 'lid', icon: '🇩🇪', t: 'Test „Leben in Deutschland“', d: 'Prüfungsfragen, Geschichte und Staat – spielerisch wiederholen.' }
  ];
  const catOf = g => g.cat || 'basis';
  const card = (g, s) => `<a class="sp-card" href="#spiele/${g.id}"><span class="sp-ic" aria-hidden="true">${g.icon}</span><span class="sp-t"><b>${esc(g.title)}</b><span>${esc(g.desc)}</span><small>${esc(g.level || '')}${s[g.id]?.best != null ? ` · Rekord: ${s[g.id].best}` : ''}</small></span></a>`;
  const BILD = '<a class="sp-card" href="#bild"><span class="sp-ic" aria-hidden="true">🖼</span><span class="sp-t"><b>Bild beschreiben</b><span>Endungen und Relativsätze an Bildern – wie im DTZ.</span><small>A2–B1</small></span></a>';

  function hub(only) {
    stopAll();
    const s = get(), c = CATS.find(x => x.id === only);
    const section = k => {
      const list = games.filter(g => catOf(g) === k.id);
      if (!list.length) return '';
      return `<section class="sp-cat" id="sp-cat-${k.id}" aria-labelledby="sp-h-${k.id}">
        <h2 id="sp-h-${k.id}"><span aria-hidden="true">${k.icon}</span> ${esc(k.t)}</h2><p class="sp-cat-d">${esc(k.d)}</p>
        <div class="sp-grid">${list.map(g => card(g, s)).join('')}${k.id === 'basis' ? BILD : ''}</div></section>`;
    };
    DM.page(`${DM.crumbs([['Üben', '#ueben'], ['Lernspiele', c ? '#spiele' : null], ...(c ? [[c.t]] : [])])}
      <div class="dm-head"><h1>${c ? esc(c.t) : 'Lernspiele'}</h1><p class="dm-lead">${c ? esc(c.d) : 'Kurz, schnell und mit sofortiger Rückmeldung – auf dem Handy und am Computer. Ohne Anmeldung.'}</p></div>
      ${!c && window.DMChallenge ? DMChallenge.teaser() : ''}
      <nav class="sp-tabs" aria-label="Bereiche"><a href="#spiele"${!c ? ' aria-current="page"' : ''}>Alle</a>${CATS.map(k => `<a href="#spiele/${k.id}"${c === k ? ' aria-current="page"' : ''}><span aria-hidden="true">${k.icon}</span> ${esc(k.t.split(':')[0].replace('Test „Leben in Deutschland“', 'Leben in Deutschland'))}</a>`).join('')}</nav>
      ${(c ? [c] : CATS).map(section).join('')}`, 'sp-page');
  }

  function intro(g) {
    stopAll();
    const s = get()[g.id] || {};
    DM.page(`${crumbs(g)}
      <section class="ch-card sp-intro"><span class="sp-ic sp-ic-big" aria-hidden="true">${g.icon}</span><h1>${esc(g.title)}</h1><p class="sp-lead">${esc(g.intro || g.desc)}</p>
        ${s.best != null ? `<p class="sp-best">🏆 Dein Rekord: <b>${s.best}</b> · ${s.plays || 0}× gespielt</p>` : ''}
        ${g.options ? `<fieldset class="ch-level"><legend>${esc(g.optionsLabel || 'Wähle')}</legend>${g.options.map((o, i) => `<label><input type="radio" name="sp-opt" value="${esc(o.id)}"${(s.opt ? s.opt === o.id : i === 0) ? ' checked' : ''}><span>${esc(o.label)}</span></label>`).join('')}</fieldset>` : ''}
        <div class="ch-actions"><button type="button" class="dm-btn ch-go" id="sp-start">Spiel starten</button></div>
        <p class="dm-small"><a href="#spiele/${catOf(g)}">← Weitere Spiele: ${esc((CATS.find(k => k.id === catOf(g)) || CATS[0]).t)}</a></p>
      </section>`, 'sp-page');
    $('#sp-start').onclick = () => {
      const opt = document.querySelector('input[name=sp-opt]:checked')?.value;
      const all = get(); all[g.id] = { ...(all[g.id] || {}), opt }; put(all);
      play(g, opt);
    };
  }

  function play(g, opt) {
    stopAll();
    DM.page(`${crumbs(g)}
      <section class="ch-card sp-play sp-${g.id}" aria-live="polite">
        <div class="ch-top sp-hud"><span class="sp-prog-n"></span><div class="ch-bar"><i style="width:0%"></i></div><span class="sp-time" hidden></span><span class="sp-lives" hidden></span><span class="ch-score">⭐ 0</span></div>
        <div class="sp-area"></div>
        <div class="ch-feedback" hidden></div>
        <div class="ch-actions"><button type="button" class="dm-btn" id="sp-next" hidden>Weiter</button></div>
      </section>`, 'sp-page');
    window.scrollTo({ top: 0, behavior: 'instant' });
    const root = $('.sp-play'), area = $('.sp-area', root);
    const api = {
      el: area, esc, shuffle, pick: (a, n) => shuffle(a).slice(0, n),
      hud(o) {
        if (o.progress != null) { $('.ch-bar i', root).style.width = Math.round(o.progress * 100) + '%'; }
        if (o.step != null) $('.sp-prog-n', root).textContent = o.step;
        if (o.score != null) $('.ch-score', root).textContent = '⭐ ' + o.score;
        if (o.lives != null) { const l = $('.sp-lives', root); l.hidden = false; l.textContent = '❤️'.repeat(Math.max(0, o.lives)) + '🤍'.repeat(Math.max(0, (o.maxLives || 3) - o.lives)); l.setAttribute('aria-label', o.lives + ' Leben'); }
        if (o.time != null) { const t = $('.sp-time', root); t.hidden = false; t.textContent = '⏱ ' + o.time; t.classList.toggle('is-low', o.time <= 5); }
      },
      feedback(ok, html) { const f = $('.ch-feedback', root); f.hidden = false; f.className = 'ch-feedback ' + (ok ? 'is-ok' : 'is-bad'); f.innerHTML = html; if (!ok) api.vibrate(); },
      clearFeedback() { const f = $('.ch-feedback', root); f.hidden = true; f.innerHTML = ''; $('#sp-next').hidden = true; },
      next(label, fn) { const b = $('#sp-next'); b.textContent = label || 'Weiter'; b.hidden = false; b.onclick = () => { b.hidden = true; fn(); }; b.focus({ preventScroll: true }); },
      speak(text, onend) { if (DM.speak) return DM.speak(text, { onend }); onend?.(false); return false; },
      timer(sec, onTick, onEnd) {
        let rest = sec; onTick?.(rest);
        const id = setInterval(() => { rest--; onTick?.(rest); if (rest <= 0) { clearInterval(id); activeTimer = null; onEnd?.(); } }, 1000);
        const t = { stop() { clearInterval(id); } }; activeTimer = t; return t;
      },
      vibrate() { try { navigator.vibrate?.(60); } catch {} },
      finish(r) { stopAll(); result(g, opt, r); }
    };
    try { g.start(api, opt); } catch (e) { console.error(e); area.innerHTML = '<p>Das Spiel konnte nicht starten. Bitte lade die Seite neu.</p>'; }
  }

  function result(g, opt, { score = 0, max = 0, wrong = [] } = {}) {
    const all = get(), s = all[g.id] || {}, isBest = s.best == null || score > s.best;
    all[g.id] = { ...s, best: Math.max(score, s.best ?? 0), plays: (s.plays || 0) + 1, last: Date.now(), opt }; put(all);
    const pct = max ? score / max : 0;
    DM.page(`${crumbs(g)}
      <section class="ch-card ch-result sp-result"><p class="ch-kicker">${esc(g.title)}</p>
        <h1>${isBest && score > 0 ? 'Neuer Rekord! 🏆' : pct >= 0.9 ? 'Ausgezeichnet!' : pct >= 0.6 ? 'Gut gemacht!' : 'Weiter üben – du schaffst das!'}</h1>
        <p class="ch-big">${score}${max ? ` <small>von ${max}</small>` : ' <small>Punkte</small>'}</p>
        ${!isBest ? `<p class="sp-best">Dein Rekord: <b>${s.best}</b></p>` : ''}
        ${wrong.length ? `<details class="ch-review" open><summary>Das solltest du dir merken (${wrong.length})</summary><ul>${wrong.slice(0, 15).map(w => `<li><b>${esc(w.correct)}</b>${w.tip ? ` – ${esc(w.tip)}` : ''}</li>`).join('')}</ul></details>` : ''}
        <div class="ch-actions"><button type="button" class="dm-btn ch-go" id="sp-again">Nochmal spielen</button><a class="dm-btn dm-btn-quiet" href="#spiele/${catOf(g)}">Andere Spiele</a></div>
      </section>`, 'sp-page');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if ((isBest && score > 0) || pct >= 0.9) DM.celebrate?.($('.sp-result'));
    $('#sp-again').onclick = () => play(g, opt);
  }

  // Tastatur: Enter = Weiter, 1–4 = Antwortknopf (.ch-opt[data-k])
  document.addEventListener('keydown', e => {
    if (!document.querySelector('.sp-play') || e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = document.activeElement?.tagName;
    if (e.key === 'Enter') { const n = document.getElementById('sp-next'); if (n && !n.hidden && document.activeElement !== n && tag !== 'TEXTAREA') { e.preventDefault(); n.click(); } }
    else if (/^[1-4]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA') { const b = document.querySelector(`.sp-play .ch-opt[data-k="${+e.key - 1}"]`); if (b && !b.disabled) { e.preventDefault(); b.click(); } }
  });
  window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#spiele/')) stopAll(); });

  window.DMGame = { register: g => { const i = games.findIndex(x => x.id === g.id); i >= 0 ? games.splice(i, 1, g) : games.push(g); }, list: () => games };
  DM.routes ||= {};
  DM.routes.spiele = p => { const g = games.find(x => x.id === p[1]); g ? intro(g) : hub(CATS.some(k => k.id === p[1]) ? p[1] : null); };
})();
