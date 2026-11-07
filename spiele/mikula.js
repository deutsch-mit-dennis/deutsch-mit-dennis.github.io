/* Lernspiel „Mikula sucht den Weg nach Hause“ – Story-Spiel mit Stationen (A1 / A2 / B1).
   Mikula, ein Bauer aus dem Jahr 1024, braucht Zeitkristalle für seine kaputte Zeitmaschine.
   Content lives ONLY in JSON (no code changes needed for new stations):
     spiele/mikula/stations.json          – story, map (order + status: active | soon | secret), end screen, Mikula images
     spiele/mikula/stations/<id>.json     – one station: intro, tasks per level, outro, word list
   Task types: choice (A1 article/word + emoji, A2 "which sentence fits"), order (build a sentence), rate (B1: passend/unhöflich/falsch).
   Every spoken line: { who, mood, text, say?, audio }. "audio" = own recording (path to mp3) → played instead of TTS.
   Progress: localStorage 'dm-mikula' { level, story, done: { <station>: { first, max } } } – crystals = number of done stations.
   Format and how-to: spiele/mikula/README.md */
(() => {
  if (!window.DMGame) return;
  const ID = 'mikula', KEY = 'dm-mikula', VER = '20261107b', BASE = 'spiele/mikula/';
  const LEVELS = [{ id: 'A1', label: 'A1 – Wörter', d: 'Wörter mit Artikel' }, { id: 'A2', label: 'A2 – Sätze', d: 'Sätze bauen' }, { id: 'B1', label: 'B1 – Gespräche', d: 'Höflich antworten' }];
  const VERDICT = { passend: '✅ passend', 'unhöflich': '😬 zu unhöflich', falsch: '❌ falsch' };

  const CSS = `
.sp-mikula .sp-area{min-height:280px}
.sp-mk-scene{display:flex;align-items:flex-end;gap:10px}
.sp-mk-scene .sp-mk-bubble{flex:1;min-width:0}
.sp-mk-face{flex:0 0 72px;width:72px;height:72px;border-radius:50%;background:#f3f5fb;overflow:hidden}
.sp-mk-face img{display:block;width:100%;height:100%;object-fit:cover}
.sp-mk-lines{display:grid;gap:10px;margin:0 0 12px;min-width:0}
.ch-feedback .sp-mk-scene{margin:0 0 6px}
.ch-feedback .sp-mk-bubble{color:var(--dm-ink)}
.ch-feedback .sp-mk-bubble b{color:var(--dm-muted)}
.sp-mk-bubble{position:relative;display:flex;align-items:flex-start;gap:6px;padding:10px 12px;border-radius:16px;background:#fff;border:2px solid var(--dm-line);font-size:17px;line-height:1.45}
.sp-mk-bubble.is-mikula{border-color:#c5cdf0;background:var(--dm-tinte-soft)}
.sp-mk-bubble.is-erzaehler{border-style:dashed;background:#fbfbf8}
.sp-mk-bubble p{margin:0;flex:1;min-width:0;overflow-wrap:anywhere}
.sp-mk-bubble b{display:block;font-size:13px;color:var(--dm-muted);text-transform:uppercase;letter-spacing:.04em}
.sp-mk-say{flex:0 0 44px;width:44px;height:44px;margin:-6px -6px -6px 0;border:0;border-radius:50%;background:transparent;font-size:20px;cursor:pointer}
.sp-mk-say:hover,.sp-mk-say:focus-visible{background:#fff;outline:3px solid var(--dm-tinte);outline-offset:0}
.sp-mk-q{font-size:19px;font-weight:700;margin:14px 2px 10px;overflow-wrap:anywhere;hyphens:auto}
.sp-mk-q:focus{outline:none}
.sp-mk-sit{margin:0 2px 10px;color:var(--dm-muted);font-size:16px}
.sp-mk-emoji{font-size:64px;line-height:1;text-align:center;margin:4px 0 8px}
.sp-mk-opt{text-align:left}
.sp-mk-badge{display:block;margin-top:4px;font-size:14px;font-weight:600;color:#3b4560}
.sp-mk-map{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-mk-st{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:104px;padding:12px 8px;border:2px solid var(--dm-line);border-radius:16px;background:#fff;font:inherit;color:var(--dm-ink);text-align:center;cursor:pointer}
.sp-mk-st:hover:not(:disabled){border-color:var(--dm-tinte)}
.sp-mk-st:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-st .sp-mk-ic{font-size:32px;line-height:1}
.sp-mk-st b{font-size:16px}
.sp-mk-st small{font-size:13px;color:var(--dm-muted)}
.sp-mk-st.is-next{border-color:var(--dm-tinte);background:var(--dm-tinte-soft)}
.sp-mk-st.is-done{border-color:#1f9d55;background:#e8f6ec}
.sp-mk-st:disabled{cursor:default;background:#f4f5f8;color:#4a5368;opacity:1;border-style:dashed}
.sp-mk-crystals{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:4px 0 14px;font-weight:700}
.sp-mk-crystals svg{width:24px;height:24px}
.sp-mk-crystals span{margin-left:6px}
.sp-mk-lv{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 14px}
.sp-mk-lv>span{width:100%;font-weight:700;font-size:15px}
.sp-mk-lv button{min-height:44px;padding:6px 14px;border:2px solid var(--dm-line);border-radius:12px;background:#fff;font:600 16px var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-mk-lv button[aria-pressed=true]{border-color:var(--dm-tinte);background:var(--dm-tinte-soft);color:var(--dm-tinte-dark)}
.sp-mk-lv button:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-stimg{display:block;width:100%;height:auto;aspect-ratio:3/2;max-height:260px;object-fit:cover;object-position:center 30%;border-radius:16px;margin:0 0 12px;background:#eef1f8}
.sp-mk-win{text-align:center}
.sp-mk-win .sp-mk-big{width:96px;height:96px;margin:4px auto 6px}
.sp-mk-words{display:grid;gap:8px;margin:12px 0;text-align:left;padding:0;list-style:none}
.sp-mk-words li{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:2px solid var(--dm-line);border-radius:14px;background:#fff}
.sp-mk-words .sp-mk-wi{font-size:28px;line-height:1.1}
.sp-mk-words div{flex:1;min-width:0;overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto}
.sp-mk-words li>*{min-width:0}
.sp-mk-words b{font-size:17px}
.sp-mk-words small{display:block;color:var(--dm-muted);font-size:14px}
.sp-mk-words em{display:block;font-style:normal;font-size:15px;margin-top:2px}
.sp-mk-end{margin:16px 0 4px;padding:14px;border-radius:16px;background:#fff8dc;border:2px solid #f1d27a}
.sp-mk-end h3{margin:0 0 8px}
.sp-mk-links{display:grid;gap:8px;margin-top:10px}
.sp-mk-links a{display:flex;flex-direction:column;justify-content:center;min-height:52px;padding:8px 14px;border-radius:12px;background:#fff;border:2px solid var(--dm-line);color:var(--dm-tinte-dark);font-weight:700;text-decoration:none}
.sp-mk-links a small{font-weight:400;color:var(--dm-muted)}
.sp-mk-links a:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.sp-mk-tools button{min-height:44px;padding:6px 14px;border:0;border-radius:12px;background:#eef1f8;font:600 15px var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-mk-tools button:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-ai{margin:14px 2px 0;font-size:14px;color:var(--dm-muted)}
.sp-mk-tools .is-danger{background:#fdecea;color:#8c1d16}
@media (prefers-reduced-motion:no-preference){
 .sp-mk-win .sp-mk-big{animation:sp-mk-pop .6s ease-out}
 .sp-mk-face.is-staunen{animation:sp-mk-wob .5s ease-in-out}
}
@keyframes sp-mk-pop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}
@keyframes sp-mk-wob{0%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}60%{transform:rotate(5deg)}}
@media (max-width:359px){.sp-mk-face{flex-basis:56px;width:56px;height:56px}.sp-mk-emoji{font-size:54px}.sp-mk-st{min-height:96px}}
`;
  const CRYSTAL = (on = true) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9z" fill="${on ? '#7b5cff' : '#e3e6ee'}" stroke="${on ? '#4a2fc4' : '#c3c8d4'}" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 9h18M9 3l3 18M15 3l-3 18" stroke="${on ? '#cfc3ff' : '#d3d7e0'}" stroke-width="1"/></svg>`;

  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const put = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  const cache = {};
  const load = file => (cache[file] ||= fetch(BASE + file + '?v=' + VER).then(r => { if (!r.ok) throw new Error(file + ' ' + r.status); return r.json(); }));
  let player = null;
  const stopAudio = () => { try { player?.pause(); } catch {} player = null; };

  DMGame.register({
    id: ID, title: 'Mikula sucht den Weg nach Hause', icon: '🧔', level: 'A1–B1', cat: 'abenteuer',
    desc: 'Mikula aus dem Jahr 1024 braucht Zeitkristalle. Hilf ihm am Bahnhof und im Supermarkt!',
    intro: 'Mikulas Zeitmaschine ist kaputt. An jeder Station löst du Aufgaben und bekommst einen Zeitkristall. Fehler sind kein Problem – du kannst es nochmal versuchen.',
    optionsLabel: 'Dein Niveau', options: LEVELS.map(l => ({ id: l.id, label: l.label })), againLabel: 'Zur Karte',
    start(api, opt) {
      if (!document.getElementById('sp-mk-css')) document.head.insertAdjacentHTML('beforeend', `<style id="sp-mk-css">${CSS}</style>`);
      const el = api.el, e = api.esc;
      let st = get(), cfg;
      if (opt) st.level = opt;
      st.level = LEVELS.some(l => l.id === st.level) ? st.level : 'A1';
      put(st);

      // --- helpers ---
      const img = mood => (cfg.images || {})[mood] || (cfg.images || {}).neutral || '';
      const spoken = l => l.say || l.text;
      const play = (l, onend) => {
        stopAudio(); if (!onend) seqNow = null;
        if (l.audio) { try { player = new Audio(l.audio); player.onended = () => onend?.(); player.play().catch(() => api.speak(spoken(l), onend)); return; } catch {} }
        api.speak(spoken(l), onend);
      };
      const playAll = (ls, k = 0) => { if (k < ls.length) play(ls[k], () => { if (ls === seqNow) playAll(ls, k + 1); }); };
      let seqNow = null;
      const playSeq = ls => { seqNow = ls; playAll(ls); };
      const who = l => l.who === 'mikula' ? 'Mikula' : l.who === 'erzaehler' ? '' : l.who;
      const bubble = (l, i) => `<div class="sp-mk-bubble is-${l.who === 'mikula' ? 'mikula' : l.who === 'erzaehler' ? 'erzaehler' : 'other'}"><p>${who(l) ? `<b>${e(who(l))}</b>` : ''}${e(l.text)}</p><button type="button" class="sp-mk-say" data-l="${i}" aria-label="Vorlesen: ${e(l.text)}">🔊</button></div>`;
      // scene = Mikula's face + speech bubbles; returns HTML and binds 🔊 after insertion via bindSay
      let lines = [];
      const face = mood => `<div class="sp-mk-face${mood === 'staunen' ? ' is-staunen' : ''}"><img src="${e(img(mood))}" alt="Mikula${mood === 'staunen' ? ' staunt' : mood === 'freude' ? ' freut sich' : ''}" width="84" height="84"></div>`;
      // one row per line: Mikula's lines get his face (mood per line), narrator/others use the full width
      const scene = (ls, mood) => { const base = lines.length; lines.push(...ls); return `<div class="sp-mk-lines">${ls.map((l, k) => l.who === 'mikula' ? `<div class="sp-mk-scene">${face(l.mood || mood || 'neutral')}${bubble(l, base + k)}</div>` : bubble(l, base + k)).join('')}</div>`; };
      const bindSay = root => root.querySelectorAll('.sp-mk-say').forEach(b => { b.onclick = () => play(lines[+b.dataset.l]); });
      const moodOf = ls => (ls.find(l => l.who === 'mikula' && l.mood) || {}).mood || 'neutral';
      const crystals = () => Object.keys(st.done || {}).filter(k => cfg.stations.some(s => s.id === k && s.status === 'active')).length;
      const bar = () => `<div class="sp-mk-crystals" aria-label="${crystals()} von ${cfg.crystalsNeeded} Zeitkristallen">${Array.from({ length: cfg.crystalsNeeded }, (_, i) => CRYSTAL(i < crystals())).join('')}<span aria-hidden="true">${crystals()} / ${cfg.crystalsNeeded}</span></div>`;
      const focusQ = () => { const q = el.querySelector('.sp-mk-q, h2, h3'); if (q) { q.setAttribute('tabindex', '-1'); q.focus({ preventScroll: true }); } window.scrollTo({ top: 0, behavior: 'instant' }); };
      const allActiveDone = () => cfg.stations.filter(s => s.status === 'active').every(s => st.done?.[s.id]);
      const endBlock = () => { const E = cfg.end || {}; return `<section class="sp-mk-end" aria-labelledby="sp-mk-endh"><h3 id="sp-mk-endh">${e(E.title || 'Fortsetzung folgt …')}</h3>${scene(E.lines || [], 'freude')}<div class="sp-mk-links">${(E.links || []).map(x => `<a href="${e(x.url)}" target="_blank" rel="noopener">${e(x.label)}<small>${e(x.sub || '')}</small></a>`).join('')}</div></section>`; };

      const fail = msg => { el.innerHTML = `<p>${e(msg)}</p>`; api.next('Nochmal versuchen', () => this.start(api, opt)); };

      // --- story (first visit or on request) ---
      function story() {
        lines = []; api.clearFeedback(); api.hud({ progress: 0, step: 'Geschichte' });
        el.innerHTML = `<h2 class="sp-mk-q">So beginnt die Geschichte</h2>${scene(cfg.story || [], 'staunen')}`;
        bindSay(el); focusQ();
        playSeq(cfg.story || []);
        api.next('Zur Karte', () => { st.story = 1; put(st); map(); });
      }

      // --- map ---
      function map() {
        stopAudio(); lines = []; api.clearFeedback();
        const total = cfg.stations.filter(s => s.status === 'active').length;
        api.hud({ progress: total ? crystals() / cfg.crystalsNeeded : 0, step: 'Karte' });
        const next = cfg.stations.find(s => s.status === 'active' && !st.done?.[s.id]);
        el.innerHTML = `<h2 class="sp-mk-q">Mikulas Karte</h2>${bar()}
          <div class="sp-mk-lv" role="group" aria-labelledby="sp-mk-lvh"><span id="sp-mk-lvh">Dein Niveau:</span>${LEVELS.map(l => `<button type="button" data-lv="${l.id}" aria-pressed="${st.level === l.id}">${e(l.label)}</button>`).join('')}</div>
          <div class="sp-mk-map">${cfg.stations.map(s => {
            if (s.status === 'active') { const d = st.done?.[s.id]; return `<button type="button" class="sp-mk-st${d ? ' is-done' : s === next ? ' is-next' : ''}" data-st="${e(s.id)}"><span class="sp-mk-ic" aria-hidden="true">${s.icon || '📍'}</span><b>${e(s.title)}</b><small>${d ? '💎 geschafft – nochmal spielen' : s === next ? 'Los geht’s!' : 'offen'}</small></button>`; }
            if (s.status === 'soon') return `<button type="button" class="sp-mk-st" disabled><span class="sp-mk-ic" aria-hidden="true">${s.icon || '📍'}</span><b>${e(s.title)}</b><small>🔒 bald</small></button>`;
            return `<button type="button" class="sp-mk-st" disabled aria-label="Geheime Station, bald"><span class="sp-mk-ic" aria-hidden="true">❔</span><b>???</b><small>🔒 geheim</small></button>`;
          }).join('')}</div>
          ${allActiveDone() ? endBlock() : ''}
          <div class="sp-mk-tools"><button type="button" data-act="story">📖 Geschichte nochmal</button><button type="button" class="is-danger" data-act="reset">↺ Spiel neu starten</button></div>
          ${cfg.aiNote ? `<p class="sp-mk-ai">${e(cfg.aiNote)}</p>` : ''}`;
        bindSay(el);
        el.querySelectorAll('[data-lv]').forEach(b => { b.onclick = () => { st.level = b.dataset.lv; put(st); map(); el.querySelector(`[data-lv="${st.level}"]`)?.focus(); }; });
        el.querySelectorAll('[data-st]').forEach(b => { b.onclick = () => station(cfg.stations.find(s => s.id === b.dataset.st)); });
        el.querySelector('[data-act=story]').onclick = story;
        const rb = el.querySelector('[data-act=reset]');
        rb.onclick = () => {
          if (rb.dataset.sure) { st = { level: st.level }; put(st); story(); return; }
          rb.dataset.sure = 1; rb.textContent = 'Wirklich? Alle Kristalle sind dann weg. Nochmal tippen = neu starten';
        };
        focusQ();
      }

      // --- one station ---
      function station(s) {
        lines = []; api.clearFeedback();
        el.innerHTML = '<p>Station wird geladen …</p>';
        load('stations/' + s.file).then(data => {
          const lv = st.level, tasks = (data.tasks || {})[lv] || [];
          if (!tasks.length) return fail('Für dieses Niveau gibt es hier noch keine Aufgaben.');
          let i = -1, first = 0;
          const wrong = [];
          // intro
          const intro = (data.intro || {})[lv] || [];
          api.hud({ progress: 0, step: data.title, score: 0 });
          el.innerHTML = `${data.img ? `<img class="sp-mk-stimg" src="${e(data.img)}" alt="${e(data.imgAlt || '')}" width="960" height="640">` : ''}<h2 class="sp-mk-q">${e(data.icon || '')} ${e(data.title)}</h2>${scene(intro, moodOf(intro))}`;
          bindSay(el); focusQ();
          playSeq(intro);
          api.next('Los geht’s', step);

          function step() {
            stopAudio(); lines = []; api.clearFeedback();
            i++;
            if (i >= tasks.length) return win();
            api.hud({ progress: i / tasks.length, step: `${i + 1} / ${tasks.length}`, score: first });
            const t = tasks[i];
            ({ choice, order, rate }[t.type] || choice)(t);
            bindSay(el); focusQ();
            const l = t.type === 'rate' ? t.line : t.say;
            if (l) play(l);
          }
          // wrong answer: Mikula reacts, short explanation, try again
          let tries = 0;
          const oops = (t, extra) => {
            tries++; api.vibrate();
            const r = t.wrong || { who: 'mikula', mood: 'staunen', text: 'Hm … das war wohl nicht richtig.' };
            lines.push(r);
            const f = el.parentElement.querySelector('.ch-feedback');
            api.feedback(false, `<div class="sp-mk-scene">${face(r.mood || 'staunen')}${bubble(r, lines.length - 1)}</div>${extra || t.explain ? `<span>💡 ${e(extra || t.explain)}</span>` : ''}<span><b>Versuch es nochmal!</b></span>`);
            if (f) bindSay(f);
            play(r);
          };
          const good = (t, html) => {
            if (tries === 0) first++;
            else wrong.push({ correct: t.type === 'order' ? t.words.join(' ') : t.type === 'rate' ? t.options.find(o => o.verdict === 'passend').text : t.options[t.answer], tip: t.explain || '' });
            tries = 0;
            api.hud({ score: first });
            api.feedback(true, `✓ ${['Super!', 'Richtig!', 'Toll gemacht!', 'Genau!'][i % 4]}${html ? `<span>${html}</span>` : ''}`);
            api.next(i + 1 < tasks.length ? 'Weiter' : 'Zum Kristall 💎', step);
          };

          function choice(t) {
            const opts = t.options.map((o, k) => ({ o, k }));
            el.innerHTML = `${t.say ? scene([t.say], t.say.mood || 'staunen') : ''}${t.emoji ? `<div class="sp-mk-emoji" aria-hidden="true">${t.emoji}</div>` : ''}<p class="sp-mk-q">${e(t.question || 'Was ist richtig?')}</p>
              <div class="ch-opts">${opts.map((x, n) => `<button type="button" class="ch-opt sp-mk-opt" data-k="${n}"><kbd aria-hidden="true">${n + 1}</kbd><span>${e(x.o)}</span></button>`).join('')}</div>`;
            el.querySelectorAll('.ch-opt').forEach(b => {
              b.onclick = () => {
                const k = opts[+b.dataset.k].k;
                if (k === t.answer) { b.classList.add('is-right'); el.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; }); good(t, e(t.explain || '')); }
                else { b.classList.add('is-wrong'); b.disabled = true; oops(t, (t.feedback || [])[k]); }
              };
            });
          }

          function order(t) {
            const target = t.words.join(' '), alts = (t.alt || []).map(a => a.join(' '));
            let pool = api.shuffle(t.words.map((w, k) => ({ w, k })));
            if (pool.length > 1 && pool.map(x => x.w).join(' ') === target) pool = [...pool.slice(1), pool[0]];
            let built = [];
            el.innerHTML = `${t.say ? scene([t.say], t.say.mood || 'neutral') : ''}<p class="sp-mk-q">${e(t.question || 'Bau den Satz für Mikula.')}</p><p class="ch-label">Tippe die Wörter in der richtigen Reihenfolge an. Tippe ein Wort oben noch einmal an, dann geht es zurück.</p><div class="ch-built" aria-live="polite" aria-label="Dein Satz"></div><div class="ch-pool" aria-label="Wörter"></div>`;
            const bEl = el.querySelector('.ch-built'), pEl = el.querySelector('.ch-pool');
            const draw = () => {
              bEl.innerHTML = built.map((x, k) => `<button type="button" class="ch-chip is-placed" data-b="${k}" aria-label="${e(x.w)} – zurücklegen">${e(x.w)}</button>`).join('');
              pEl.innerHTML = pool.map((x, k) => `<button type="button" class="ch-chip" data-p="${k}">${e(x.w)}</button>`).join('');
              bEl.querySelectorAll('button').forEach(b => { b.onclick = () => { pool.push(...built.splice(+b.dataset.b, 1)); draw(); pEl.querySelector('button')?.focus(); }; });
              pEl.querySelectorAll('button').forEach(b => { b.onclick = () => { built.push(...pool.splice(+b.dataset.p, 1)); draw(); if (!pool.length) check(); else pEl.querySelector('button')?.focus(); }; });
            };
            const check = () => {
              const said = built.map(x => x.w).join(' ');
              bEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
              if (said === target || alts.includes(said)) { bEl.classList.add('is-right'); good(t, e(t.explain || '')); return; }
              bEl.classList.add('is-wrong');
              if (tries >= 1) { // second miss: show the solution, no frustration
                oops(t, `Richtig ist: „${target}“. ${t.explain || ''}`);
                api.next('Verstanden – weiter', () => { wrong.push({ correct: target, tip: t.explain || '' }); tries = 0; step(); });
                return;
              }
              oops(t);
              api.next('Nochmal versuchen', () => { api.clearFeedback(); bEl.classList.remove('is-wrong'); pool = api.shuffle(t.words.map((w, k) => ({ w, k }))); built = []; draw(); pEl.querySelector('button')?.focus(); });
            };
            draw();
          }

          function rate(t) {
            const opts = api.shuffle(t.options.map((o, k) => ({ o, k })));
            el.innerHTML = `${t.situation ? `<p class="sp-mk-sit">📍 ${e(t.situation)}</p>` : ''}${t.line ? scene([t.line], 'neutral') : ''}<p class="sp-mk-q">${e(t.question || 'Was sagt Mikula am besten?')}</p>
              <div class="ch-opts">${opts.map((x, n) => `<button type="button" class="ch-opt sp-mk-opt" data-k="${n}"><kbd aria-hidden="true">${n + 1}</kbd><span>${e(x.o.text)}<span class="sp-mk-badge" hidden></span></span></button>`).join('')}</div>`;
            const reveal = b => { const o = opts[+b.dataset.k].o, s = b.querySelector('.sp-mk-badge'); s.hidden = false; s.textContent = `${VERDICT[o.verdict] || o.verdict} – ${o.explain || ''}`; };
            el.querySelectorAll('.ch-opt').forEach(b => {
              b.onclick = () => {
                const o = opts[+b.dataset.k].o;
                if (o.verdict === 'passend') {
                  b.classList.add('is-right');
                  el.querySelectorAll('.ch-opt').forEach(x => { x.disabled = true; reveal(x); });
                  good(t, 'Mikula sagt es höflich und richtig.');
                } else { b.classList.add('is-wrong'); b.disabled = true; reveal(b); oops(t, o.explain); }
              };
            });
          }

          function win() {
            stopAudio(); lines = []; api.clearFeedback();
            st = get(); const prev = st.done?.[s.id];
            st.done = { ...(st.done || {}), [s.id]: { first: Math.max(first, prev?.first || 0), max: tasks.length, lv } }; put(st);
            api.hud({ progress: 1, step: 'Geschafft!', score: first });
            const out = (data.outro || {})[lv] || { who: 'mikula', mood: 'freude', text: 'Juhu! Ein Zeitkristall!' };
            const words = data.words || [];
            el.innerHTML = `<div class="sp-mk-win"><div class="sp-mk-big">${CRYSTAL(true)}</div><h2 class="sp-mk-q">${prev ? 'Station nochmal geschafft!' : 'Du hast einen Zeitkristall!'}</h2></div>${bar()}${scene([out], 'freude')}
              <h3>Neue Wörter</h3><ul class="sp-mk-words">${words.map(w => { lines.push({ text: `${w.article} ${w.word}. ${w.example}`, audio: w.audio || '' }); return `<li><span class="sp-mk-wi" aria-hidden="true">${w.emoji || '📌'}</span><div><b>${e(w.article)} ${e(w.word)}</b><small>Plural: ${e(w.plural || '–')}${w.level ? ` · ${e(w.level)}` : ''}</small><em>${e(w.example)}</em></div><button type="button" class="sp-mk-say" data-l="${lines.length - 1}" aria-label="Vorlesen: ${e(w.article + ' ' + w.word)}">🔊</button></li>`; }).join('')}</ul>
              ${allActiveDone() ? endBlock() : ''}`;
            bindSay(el); focusQ(); play(out);
            DM.celebrate?.(el.querySelector('.sp-mk-win'));
            api.next('Weiter', () => api.finish({ score: first, max: tasks.length, wrong }));
          }
        }).catch(err => { console.error(err); fail('Die Station konnte nicht geladen werden. Prüfe deine Internetverbindung.'); });
      }

      el.innerHTML = '<p>Mikula wird geweckt …</p>';
      load('stations.json').then(c => { cfg = c; cfg.stations ||= []; cfg.crystalsNeeded ||= 10; st.story ? map() : story(); })
        .catch(err => { console.error(err); fail('Das Spiel konnte nicht geladen werden. Prüfe deine Internetverbindung.'); });
    }
  });
})();
