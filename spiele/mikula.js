/* Lernspiel „Mikula sucht den Weg nach Hause“ – Story-Spiel mit Stationen (A1 / A2 / B1).
   Mikula, ein Bauer aus dem Jahr 1024, braucht Zeitkristalle für seine kaputte Zeitmaschine.
   Content lives ONLY in JSON (no code changes needed for new stations):
     spiele/mikula/stations.json          – story, map (order + status: active | soon | secret), end screen, Mikula images
     spiele/mikula/stations/<id>.json     – one station: intro, tasks per level, outro, word list
   Task types: choice (A1 article/word + emoji, A2 "which sentence fits"), order (build a sentence), rate (B1: passend/unhöflich/falsch).
   Mistakes: 1st miss → Mikula reacts + hint (no solution), 2nd miss → solution + explanation, then continue.
   Every spoken line: { who, mood, text, say?, audio }. "audio" = own recording (path to mp3) → played instead of TTS.
   Progress: localStorage 'dm-mikula' { level, story, done: { <station>: { A1: { first, max }, A2: …, B1: … } } }
   – one crystal per station (any level), stars per level on the map.
   After changing JSON files: raise VER below (cache) and see README (voices).  Format and how-to: spiele/mikula/README.md */
(() => {
  if (!window.DMGame) return;
  const ID = 'mikula', KEY = 'dm-mikula', VER = '20261107d', BASE = 'spiele/mikula/';
  const LEVELS = [{ id: 'A1', label: 'A1 – Wörter' }, { id: 'A2', label: 'A2 – Sätze' }, { id: 'B1', label: 'B1 – Gespräche' }];
  const LV_RANK = { A1: 1, A2: 2, B1: 3 };
  const VERDICT = { passend: '✅ passend', 'unhöflich': '😬 zu unhöflich', falsch: '❌ falsch' };
  const PRAISE = ['Super!', 'Richtig!', 'Toll gemacht!', 'Genau!'];

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
.ch-feedback:focus{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-bubble{position:relative;display:flex;align-items:flex-start;gap:6px;padding:10px 12px;border-radius:16px;background:#fff;border:2px solid var(--dm-line);font-size:17px;line-height:1.45}
.sp-mk-bubble.is-mikula{border-color:#c5cdf0;background:var(--dm-tinte-soft)}
.sp-mk-bubble.is-erzaehler{border-style:dashed;background:#fbfbf8}
.sp-mk-bubble p{margin:0;flex:1;min-width:0;overflow-wrap:anywhere}
.sp-mk-bubble b{display:block;font-size:13px;color:var(--dm-muted);text-transform:uppercase;letter-spacing:.04em}
.sp-mk-say{flex:0 0 44px;width:44px;height:44px;margin:-6px -6px -6px 0;border:0;border-radius:50%;background:transparent;font-size:20px;cursor:pointer}
.sp-mk-say:hover,.sp-mk-say:focus-visible{background:#fff;outline:3px solid var(--dm-tinte);outline-offset:0}
.sp-mk-q{display:flex;align-items:center;gap:6px;font-size:19px;font-weight:700;margin:14px 2px 10px;overflow-wrap:anywhere;hyphens:auto}
.sp-mk-q>span{flex:1;min-width:0}
.sp-mk-q .sp-mk-say{margin:-6px 0}
.sp-mk-q:focus{outline:none}
.sp-mk-sit{display:flex;align-items:flex-start;gap:6px;margin:0 2px 10px;color:var(--dm-muted);font-size:16px}
.sp-mk-sit>span{flex:1;min-width:0}
.sp-mk-tip{display:flex;align-items:flex-start;gap:6px;margin-top:6px}
.sp-mk-tip>span{flex:1;min-width:0}
.sp-mk-emoji{font-size:64px;line-height:1;text-align:center;margin:4px 0 8px}
.sp-mk-opt{text-align:left}
.sp-mk-badge{display:block;margin-top:4px;font-size:14px;font-weight:600;color:#3b4560}
.sp-mk-check{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 6px}
.sp-mk-check button{min-height:48px}
.sp-mk-map{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-mk-st{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:104px;padding:12px 8px;border:2px solid var(--dm-line);border-radius:16px;background:#fff;font:inherit;color:var(--dm-ink);text-align:center;cursor:pointer}
.sp-mk-st:hover:not(:disabled){border-color:var(--dm-tinte)}
.sp-mk-st:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-st .sp-mk-ic{font-size:32px;line-height:1}
.sp-mk-st b{font-size:16px}
.sp-mk-st small{font-size:13px;color:var(--dm-muted)}
.sp-mk-st .sp-mk-lvs{font-size:12px;font-weight:700;letter-spacing:.02em;color:#3b4560}
.sp-mk-st.is-next{border-color:var(--dm-tinte);background:var(--dm-tinte-soft)}
.sp-mk-st.is-done{border-color:#1f9d55;background:#e8f6ec}
.sp-mk-st:disabled{cursor:default;background:#f4f5f8;color:#4a5368;opacity:1;border-style:dashed}
.sp-mk-crystals{display:flex;flex-wrap:wrap;align-items:center;gap:3px;margin:4px 0 14px;font-weight:700}
.sp-mk-crystals svg{width:22px;height:22px}
.sp-mk-crystals span{margin-left:6px}
.sp-mk-lv{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 14px}
.sp-mk-lv>span{width:100%;font-weight:700;font-size:15px}
.sp-mk-lv button{min-height:44px;padding:6px 14px;border:2px solid var(--dm-line);border-radius:12px;background:#fff;font:600 16px var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-mk-lv button[aria-pressed=true]{border-color:var(--dm-tinte);background:var(--dm-tinte-soft);color:var(--dm-tinte-dark)}
.sp-mk-lv button:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-stimg{display:block;width:100%;height:auto;aspect-ratio:3/2;max-height:260px;object-fit:cover;object-position:50% 12%;border-radius:16px;margin:0 0 12px;background:#eef1f8}
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
.sp-mk-review{margin:12px 0;padding:12px 14px;border-radius:14px;background:#fff8dc;border:2px solid #f1d27a}
.sp-mk-review h3{margin:0 0 6px;font-size:17px}
.sp-mk-review ul{margin:0;padding-left:20px}
.sp-mk-review li{margin:4px 0}
.sp-mk-end{margin:16px 0 4px;padding:14px;border-radius:16px;background:#fff8dc;border:2px solid #f1d27a}
.sp-mk-end h3{margin:0 0 8px}
.sp-mk-links{display:grid;gap:8px;margin-top:10px}
.sp-mk-links a{display:flex;flex-direction:column;justify-content:center;min-height:52px;padding:8px 14px;border-radius:12px;background:#fff;border:2px solid var(--dm-line);color:var(--dm-tinte-dark);font-weight:700;text-decoration:none}
.sp-mk-links a small{font-weight:400;color:var(--dm-muted)}
.sp-mk-links a:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-tools{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.sp-mk-tools button{min-height:44px;padding:6px 14px;border:0;border-radius:12px;background:#eef1f8;font:600 15px var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-mk-tools button:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:2px}
.sp-mk-tools .is-danger{background:#fdecea;color:#8c1d16}
.sp-mk-ai,.sp-mk-warn{margin:14px 2px 0;font-size:14px;color:var(--dm-muted)}
.sp-mk-warn{color:#8c1d16;font-weight:600}
.sp-mk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (hover:none){.sp-mikula .ch-opt kbd{display:none}}
@media (prefers-reduced-motion:no-preference){
 .sp-mk-win .sp-mk-big{animation:sp-mk-pop .6s ease-out}
 .sp-mk-face.is-staunen{animation:sp-mk-wob .5s ease-in-out}
}
@keyframes sp-mk-pop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}
@keyframes sp-mk-wob{0%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}60%{transform:rotate(5deg)}}
@media (max-width:420px){.sp-mk-face{flex-basis:58px;width:58px;height:58px}.sp-mk-emoji{font-size:50px;margin:0 0 4px}.sp-mk-bubble{font-size:16px;padding:8px 10px}.sp-mk-q{font-size:18px;margin:10px 2px 8px}.sp-mk-stimg{max-height:200px}}
@media (max-width:359px){.sp-mk-face{flex-basis:50px;width:50px;height:50px}.sp-mk-st{min-height:96px}.sp-mk-crystals svg{width:19px;height:19px}}
`;
  const CRYSTAL = (on = true) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9z" fill="${on ? '#7b5cff' : '#e3e6ee'}" stroke="${on ? '#4a2fc4' : '#c3c8d4'}" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 9h18M9 3l3 18M15 3l-3 18" stroke="${on ? '#cfc3ff' : '#d3d7e0'}" stroke-width="1"/></svg>`;

  // localStorage may be blocked (private mode) – the game still works, it just forgets progress
  const canStore = (() => { try { localStorage.setItem(KEY + '-t', '1'); localStorage.removeItem(KEY + '-t'); return true; } catch { return false; } })();
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const put = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  // old format { first, max, lv } → { <lv>: { first, max } }
  const migrate = s => { for (const [k, v] of Object.entries(s.done || {})) if (v && 'first' in v) s.done[k] = { [v.lv || 'A1']: { first: v.first, max: v.max } }; return s; };
  const cache = {};
  const load = file => (cache[file] ||= fetch(BASE + file + '?v=' + VER)
    .then(r => { if (!r.ok) throw new Error(file + ' ' + r.status); return r.json(); })
    .catch(err => { delete cache[file]; throw err; }));   // a failed request must not stay cached ("Nochmal versuchen" works)
  let player = null;
  const stopAudio = () => { try { player?.pause(); } catch {} player = null; };

  DMGame.register({
    id: ID, title: 'Mikula sucht den Weg nach Hause', icon: '🧔', level: 'A1–B1', cat: 'abenteuer',
    desc: 'Mikula aus dem Jahr 1024 braucht Zeitkristalle. Hilf ihm am Bahnhof und im Supermarkt!',
    intro: 'Mikulas Zeitmaschine ist kaputt. An jeder Station löst du Aufgaben und bekommst einen Zeitkristall. Dein Niveau (A1, A2 oder B1) wählst du auf der Karte. Fehler sind kein Problem – Mikula hilft dir.',
    autoStart: () => !!get().story,   // returning players go straight to the map
    start(api) {
      if (!document.getElementById('sp-mk-css')) document.head.insertAdjacentHTML('beforeend', `<style id="sp-mk-css">${CSS}</style>`);
      const el = api.el, e = api.esc, root = el.closest('.sp-play');
      // screen readers: announce only the feedback box, not every re-render of the whole card
      if (root) { root.removeAttribute('aria-live'); root.querySelector('.sp-sr')?.remove(); const fb = root.querySelector('.ch-feedback'); if (fb) { fb.setAttribute('role', 'status'); fb.setAttribute('tabindex', '-1'); } }
      let st = migrate(get()), cfg;
      st.level = LEVELS.some(l => l.id === st.level) ? st.level : 'A1';
      put(st);
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const into = node => node?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });

      // --- audio ---
      const spoken = l => l.say || l.text;
      let seqNow = null;
      const play = (l, onend) => {
        stopAudio(); if (!onend) seqNow = null;
        if (l.audio) { try { player = new Audio(l.audio); player.onended = () => onend?.(); player.play().catch(() => api.speak(spoken(l), onend)); return; } catch {} }
        api.speak(spoken(l), onend);
      };
      const playAll = (ls, k = 0) => { if (k < ls.length) play(ls[k], () => { if (ls === seqNow) playAll(ls, k + 1); }); };
      const playSeq = ls => { const arr = (ls || []).filter(Boolean); seqNow = arr; playAll(arr); };

      // --- rendering helpers ---
      let lines = [];
      const reg = l => { lines.push(l); return lines.length - 1; };
      const sayBtn = (l, label = 'Vorlesen') => `<button type="button" class="sp-mk-say" data-l="${reg(l)}" aria-label="${label}">🔊</button>`;
      const narr = text => ({ who: 'erzaehler', text, audio: '' });
      const img = mood => (cfg.images || {})[mood] || (cfg.images || {}).neutral || '';
      const who = l => l.who === 'mikula' ? 'Mikula' : l.who === 'erzaehler' ? '' : l.who;
      const bubble = l => `<div class="sp-mk-bubble is-${l.who === 'mikula' ? 'mikula' : l.who === 'erzaehler' ? 'erzaehler' : 'other'}"><p>${who(l) ? `<b>${e(who(l))}</b>` : ''}${e(l.text)}</p>${sayBtn(l)}</div>`;
      const face = mood => `<div class="sp-mk-face${mood === 'staunen' ? ' is-staunen' : ''}"><img src="${e(img(mood))}" alt="" width="84" height="84"></div>`;
      // one row per line: Mikula's lines get his face (mood per line), narrator/others use the full width
      const scene = (ls, mood) => `<div class="sp-mk-lines">${ls.map(l => l.who === 'mikula' ? `<div class="sp-mk-scene">${face(l.mood || mood || 'neutral')}${bubble(l)}</div>` : bubble(l)).join('')}</div>`;
      const question = text => `<p class="sp-mk-q"><span>${e(text)}</span>${sayBtn(narr(text))}</p>`;
      const bindSay = node => node.querySelectorAll('.sp-mk-say').forEach(b => { b.onclick = () => play(lines[+b.dataset.l]); });
      const moodOf = ls => (ls.find(l => l.who === 'mikula' && l.mood) || {}).mood || 'neutral';
      const isActive = s => s.status === 'active';
      const doneLv = id => Object.keys(st.done?.[id] || {}).filter(k => LV_RANK[k]);
      const crystals = () => cfg.stations.filter(s => isActive(s) && doneLv(s.id).length).length;
      const bar = () => `<div class="sp-mk-crystals" role="img" aria-label="${crystals()} von ${cfg.crystalsNeeded} Zeitkristallen">${Array.from({ length: cfg.crystalsNeeded }, (_, i) => CRYSTAL(i < crystals())).join('')}<span aria-hidden="true">${crystals()} / ${cfg.crystalsNeeded}</span></div>`;
      const focusQ = () => { const q = el.querySelector('.sp-mk-q, h2, h3'); if (q) { q.setAttribute('tabindex', '-1'); q.focus({ preventScroll: true }); } window.scrollTo({ top: 0, behavior: 'instant' }); };
      const allActiveDone = () => cfg.stations.filter(isActive).every(s => doneLv(s.id).length);
      const endBlock = () => { const E = cfg.end || {}; return `<section class="sp-mk-end" aria-labelledby="sp-mk-endh"><h3 id="sp-mk-endh">${e(E.title || 'Fortsetzung folgt …')}</h3>${scene(E.lines || [], 'freude')}<div class="sp-mk-links">${(E.links || []).map(x => `<a href="${e(x.url)}" target="_blank" rel="noopener">${e(x.label)}<small>${e(x.sub || '')}</small><span class="sp-mk-sr"> (öffnet ein neues Fenster)</span></a>`).join('')}</div></section>`; };
      const fail = msg => { el.innerHTML = `<p>${e(msg)}</p>`; api.next('Nochmal versuchen', () => this.start(api)); };

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
        api.hud({ progress: crystals() / cfg.crystalsNeeded, step: 'Karte' });
        const next = cfg.stations.find(s => isActive(s) && !doneLv(s.id).length);
        const lvs = id => LEVELS.map(l => `${l.id} ${doneLv(id).includes(l.id) ? '★' : '☆'}`).join(' · ');
        el.innerHTML = `<h2 class="sp-mk-q">Mikulas Karte</h2>${bar()}
          <div class="sp-mk-lv" role="group" aria-labelledby="sp-mk-lvh"><span id="sp-mk-lvh">Dein Niveau:</span>${LEVELS.map(l => `<button type="button" data-lv="${l.id}" aria-pressed="${st.level === l.id}">${e(l.label)}</button>`).join('')}</div>
          <div class="sp-mk-map">${cfg.stations.map(s => {
            if (isActive(s)) {
              const d = doneLv(s.id).length, here = doneLv(s.id).includes(st.level);
              return `<button type="button" class="sp-mk-st${d ? ' is-done' : s === next ? ' is-next' : ''}" data-st="${e(s.id)}"><span class="sp-mk-ic" aria-hidden="true">${s.icon || '📍'}</span><b>${e(s.title)}</b><small>${here ? `💎 ${st.level} geschafft – nochmal` : d ? `💎 · jetzt ${st.level} spielen` : s === next ? 'Los geht’s!' : 'offen'}</small>${d ? `<span class="sp-mk-lvs" aria-label="Geschafft: ${doneLv(s.id).join(', ')}">${lvs(s.id)}</span>` : ''}</button>`;
            }
            if (s.status === 'soon') return `<button type="button" class="sp-mk-st" disabled><span class="sp-mk-ic" aria-hidden="true">${s.icon || '📍'}</span><b>${e(s.title)}</b><small>🔒 bald</small></button>`;
            return `<button type="button" class="sp-mk-st" disabled aria-label="Geheime Station, bald"><span class="sp-mk-ic" aria-hidden="true">❔</span><b>???</b><small>🔒 geheim</small></button>`;
          }).join('')}</div>
          ${allActiveDone() ? endBlock() : ''}
          <div class="sp-mk-tools"><button type="button" data-act="story">📖 Geschichte nochmal</button><button type="button" class="is-danger" data-act="reset">↺ Spiel neu starten</button></div>
          ${canStore ? '' : '<p class="sp-mk-warn">Hinweis: Dein Browser speichert gerade nichts (privater Modus?). Deine Kristalle sind nach dem Schließen weg.</p>'}
          ${cfg.aiNote ? `<p class="sp-mk-ai">${e(cfg.aiNote)}</p>` : ''}`;
        bindSay(el);
        el.querySelectorAll('[data-lv]').forEach(b => { b.onclick = () => { st.level = b.dataset.lv; put(st); map(); el.querySelector(`[data-lv="${st.level}"]`)?.focus(); }; });
        el.querySelectorAll('[data-st]').forEach(b => { b.onclick = () => station(cfg.stations.find(s => s.id === b.dataset.st)); });
        el.querySelector('[data-act=story]').onclick = story;
        const rb = el.querySelector('[data-act=reset]'), rbText = rb.textContent;
        let rbTimer;
        rb.onclick = () => {
          if (rb.dataset.sure) { clearTimeout(rbTimer); st = { level: st.level }; put(st); story(); return; }
          rb.dataset.sure = 1; rb.textContent = 'Wirklich? Alle Kristalle sind dann weg. Nochmal tippen = neu starten';
          rbTimer = setTimeout(() => { delete rb.dataset.sure; rb.textContent = rbText; }, 5000);
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
          let i = -1, first = 0, tries = 0;
          const wrong = [];
          const intro = (data.intro || {})[lv] || [];
          api.hud({ progress: 0, step: data.title, score: 0 });
          el.innerHTML = `${data.img ? `<img class="sp-mk-stimg" src="${e(data.img)}" alt="${e(data.imgAlt || '')}" width="960" height="640">` : ''}<h2 class="sp-mk-q">${e(data.icon || '')} ${e(data.title)}</h2>${scene(intro, moodOf(intro))}`;
          bindSay(el); focusQ();
          playSeq(intro);
          api.next('Los geht’s', step);

          function step() {
            stopAudio(); lines = []; api.clearFeedback(); tries = 0;
            i++;
            if (i >= tasks.length) return win();
            api.hud({ progress: i / tasks.length, step: `${i + 1} / ${tasks.length}`, score: first });
            const t = tasks[i];
            ({ choice, order, rate }[t.type] || choice)(t);
            bindSay(el); focusQ();
            const l = t.type === 'rate' ? t.line : t.say;
            if (l) play(l);
          }
          const fbBox = () => el.parentElement.querySelector('.ch-feedback');
          const showFeedback = (ok, html, speak) => {
            api.feedback(ok, html);
            const f = fbBox();
            if (f) { bindSay(f); if (!ok) f.focus({ preventScroll: true }); into(f); }
            setTimeout(() => into(document.getElementById('sp-next')), reduce ? 0 : 350);
            if (speak) playSeq(speak);
          };
          // wrong answer: Mikula reacts + tip; final = second miss → solution, no "try again"
          const oops = (t, tip, final) => {
            tries++;
            const r = t.wrong || { who: 'mikula', mood: 'staunen', text: 'Hm … das war wohl nicht richtig.' };
            const tipLine = tip ? narr(tip) : null;
            showFeedback(false, `<div class="sp-mk-scene">${face(r.mood || 'staunen')}${bubble(r)}</div>${tipLine ? `<span class="sp-mk-tip"><span>💡 ${e(tip)}</span>${sayBtn(tipLine)}</span>` : ''}${final ? '' : '<span><b>Versuch es nochmal!</b></span>'}`, [r, tipLine]);
          };
          const solution = t => t.type === 'order' ? t.words.join(' ') : t.type === 'rate' ? t.options.find(o => o.verdict === 'passend').text : t.options[t.answer];
          const good = (t, note) => {
            if (tries === 0) first++;
            else wrong.push({ correct: solution(t), tip: t.explain || '' });
            api.hud({ score: first });
            const noteLine = note ? narr(note) : null;
            showFeedback(true, `✓ ${PRAISE[i % 4]}${noteLine ? `<span class="sp-mk-tip"><span>${e(note)}</span>${sayBtn(noteLine)}</span>` : ''}`);
            api.next(i + 1 < tasks.length ? 'Weiter' : 'Zum Kristall 💎', step);
          };
          // after the second miss: show the answer and move on (counts as "to remember")
          const giveUp = (t, markRight) => {
            markRight?.();
            oops(t, `Richtig ist: „${solution(t)}“. ${t.explain || ''}`.trim(), true);
            wrong.push({ correct: solution(t), tip: t.explain || '' });
            api.next('Verstanden – weiter', step);
          };

          function choice(t) {
            const opts = api.shuffle(t.options.map((o, k) => ({ o, k })));
            el.innerHTML = `${t.say ? scene([t.say], t.say.mood || 'staunen') : ''}${t.emoji ? `<div class="sp-mk-emoji" ${t.emojiAlt ? `role="img" aria-label="${e(t.emojiAlt)}"` : 'aria-hidden="true"'}>${t.emoji}</div>` : ''}${question(t.question || 'Was ist richtig?')}
              <div class="ch-opts">${opts.map((x, n) => `<button type="button" class="ch-opt sp-mk-opt" data-k="${n}"><kbd aria-hidden="true">${n + 1}</kbd><span>${e(x.o)}</span></button>`).join('')}</div>`;
            const btns = [...el.querySelectorAll('.ch-opt')];
            btns.forEach(b => {
              b.onclick = () => {
                const k = opts[+b.dataset.k].k;
                if (k === t.answer) { b.classList.add('is-right'); btns.forEach(x => { x.disabled = true; }); good(t, t.explain || ''); return; }
                b.classList.add('is-wrong'); b.disabled = true;
                if (tries >= 1) return giveUp(t, () => btns.forEach(x => { x.disabled = true; if (opts[+x.dataset.k].k === t.answer) x.classList.add('is-right'); }));
                oops(t, t.hint || (t.feedback || [])[k] || '');
              };
            });
          }

          function order(t) {
            const target = t.words.join(' '), alts = (t.alt || []).map(a => a.join(' '));
            const fresh = () => { let p = api.shuffle(t.words.map((w, k) => ({ w, k }))); if (p.length > 1 && p.map(x => x.w).join(' ') === target) p = [...p.slice(1), p[0]]; return p; };
            let pool = fresh(), built = [];
            el.innerHTML = `${t.say ? scene([t.say], t.say.mood || 'neutral') : ''}${question(t.question || 'Bau den Satz für Mikula.')}<p class="ch-label">Tippe die Wörter in der richtigen Reihenfolge an. Ein Wort oben noch einmal antippen: Es geht zurück.</p><div class="ch-built" aria-label="Dein Satz"></div><div class="ch-pool" aria-label="Wörter"></div><div class="sp-mk-check"><button type="button" class="dm-btn" data-act="check" disabled>Prüfen</button></div>`;
            const bEl = el.querySelector('.ch-built'), pEl = el.querySelector('.ch-pool'), cBtn = el.querySelector('[data-act=check]');
            const draw = () => {
              bEl.innerHTML = built.map((x, k) => `<button type="button" class="ch-chip is-placed" data-b="${k}" aria-label="${e(x.w)} – zurücklegen">${e(x.w)}</button>`).join('');
              pEl.innerHTML = pool.map((x, k) => `<button type="button" class="ch-chip" data-p="${k}">${e(x.w)}</button>`).join('');
              cBtn.disabled = pool.length > 0;
              bEl.querySelectorAll('button').forEach(b => { b.onclick = () => { pool.push(...built.splice(+b.dataset.b, 1)); draw(); pEl.querySelector('button')?.focus(); }; });
              pEl.querySelectorAll('button').forEach(b => { b.onclick = () => { built.push(...pool.splice(+b.dataset.p, 1)); draw(); (pEl.querySelector('button') || cBtn).focus(); }; });
            };
            cBtn.onclick = () => {
              const said = built.map(x => x.w).join(' ');
              if (said === target || alts.includes(said)) { bEl.querySelectorAll('button').forEach(b => { b.disabled = true; }); cBtn.hidden = true; bEl.classList.add('is-right'); good(t, t.explain || ''); return; }
              bEl.classList.add('is-wrong');
              if (tries >= 1) { bEl.querySelectorAll('button').forEach(b => { b.disabled = true; }); cBtn.hidden = true; return giveUp(t); }
              // keep the correct beginning, give the rest back
              let ok = 0; while (ok < built.length && built[ok].w === t.words[ok]) ok++;
              oops(t, t.hint || (ok ? 'Der Anfang ist schon richtig. Diese Wörter bleiben stehen.' : 'Tipp: Wo steht das Verb?'));
              api.next('Nochmal versuchen', () => { api.clearFeedback(); bEl.classList.remove('is-wrong'); pool = api.shuffle([...pool, ...built.slice(ok)]); built = built.slice(0, ok); draw(); pEl.querySelector('button')?.focus(); });
            };
            draw();
          }

          function rate(t) {
            const opts = api.shuffle(t.options.map((o, k) => ({ o, k })));
            const sit = t.situation ? narr(t.situation) : null;
            el.innerHTML = `${sit ? `<p class="sp-mk-sit"><span>📍 ${e(t.situation)}</span>${sayBtn(sit)}</p>` : ''}${t.line ? scene([t.line], 'neutral') : ''}${question(t.question || 'Was sagt Mikula am besten?')}
              <div class="ch-opts">${opts.map((x, n) => `<button type="button" class="ch-opt sp-mk-opt" data-k="${n}"><kbd aria-hidden="true">${n + 1}</kbd><span>${e(x.o.text)}<span class="sp-mk-badge" hidden></span></span></button>`).join('')}</div>`;
            const btns = [...el.querySelectorAll('.ch-opt')];
            const reveal = b => { const o = opts[+b.dataset.k].o, s = b.querySelector('.sp-mk-badge'); s.hidden = false; s.textContent = `${VERDICT[o.verdict] || o.verdict} – ${o.explain || ''}`; };
            btns.forEach(b => {
              b.onclick = () => {
                const o = opts[+b.dataset.k].o;
                if (o.verdict === 'passend') { b.classList.add('is-right'); btns.forEach(x => { x.disabled = true; reveal(x); }); good(t, 'Mikula sagt es höflich und richtig.'); return; }
                b.classList.add('is-wrong'); b.disabled = true; reveal(b);
                if (tries >= 1) return giveUp(t, () => btns.forEach(x => { x.disabled = true; reveal(x); if (opts[+x.dataset.k].o.verdict === 'passend') x.classList.add('is-right'); }));
                oops(t, o.explain);
              };
            });
          }

          function win() {
            stopAudio(); lines = []; api.clearFeedback();
            st = migrate(get()); st.level = lv;
            const had = doneLv(s.id).length, prev = st.done?.[s.id]?.[lv];
            st.done = { ...(st.done || {}), [s.id]: { ...(st.done?.[s.id] || {}), [lv]: { first: Math.max(first, prev?.first || 0), max: tasks.length } } };
            put(st);
            api.save({ score: crystals() });
            api.hud({ progress: 1, step: 'Geschafft!', score: first });
            const out = (data.outro || {})[lv] || { who: 'mikula', mood: 'freude', text: 'Juhu! Ein Zeitkristall!' };
            const words = (data.words || []).filter(w => !w.level || (LV_RANK[w.level] || 1) <= LV_RANK[lv]);
            const title = !had ? 'Du hast einen Zeitkristall!' : prev ? 'Station nochmal geschafft!' : `Neuer Stern: ${lv} geschafft!`;
            el.innerHTML = `<div class="sp-mk-win sp-done"><div class="sp-mk-big">${CRYSTAL(true)}</div><h2 class="sp-mk-q"><span>${e(title)}</span></h2><p>${first} von ${tasks.length} beim ersten Versuch richtig${first === tasks.length ? ' – perfekt! 🌟' : ''}</p></div>${bar()}${scene([out], 'freude')}
              ${wrong.length ? `<section class="sp-mk-review" aria-labelledby="sp-mk-rvh"><h3 id="sp-mk-rvh">Das merkst du dir</h3><ul>${wrong.map(w => `<li><b>${e(w.correct)}</b>${w.tip ? ` – ${e(w.tip)}` : ''}</li>`).join('')}</ul></section>` : ''}
              <h3>Neue Wörter</h3><ul class="sp-mk-words">${words.map(w => `<li><span class="sp-mk-wi" aria-hidden="true">${w.emoji || '📌'}</span><div><b>${e(w.article)} ${e(w.word)}</b><small>Plural: ${e(w.plural || '–')}${w.level ? ` · ${e(w.level)}` : ''}</small><em>${e(w.example)}</em></div>${sayBtn({ text: `${w.article} ${w.word}. ${w.example}`, audio: w.audio || '' }, `Vorlesen: ${e(w.article + ' ' + w.word)}`)}</li>`).join('')}</ul>
              ${allActiveDone() ? endBlock() : ''}`;
            bindSay(el); focusQ(); play(out);
            DM.celebrate?.(el.querySelector('.sp-mk-win'));
            api.next('Zur Karte', map);
          }
        }).catch(err => { console.error(err); fail('Die Station konnte nicht geladen werden. Prüfe deine Internetverbindung.'); });
      }

      el.innerHTML = '<p>Mikula wird geweckt …</p>';
      load('stations.json').then(c => { cfg = c; cfg.stations ||= []; cfg.crystalsNeeded ||= 10; st.story ? map() : story(); })
        .catch(err => { console.error(err); fail('Das Spiel konnte nicht geladen werden. Prüfe deine Internetverbindung.'); });
    }
  });
})();
