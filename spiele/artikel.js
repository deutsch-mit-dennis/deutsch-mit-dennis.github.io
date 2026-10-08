/* Lernspiel „Der, die, das – Wisch!“ – Artikel per Wischgeste (spiele.js / DMGame) */
(() => {
  if (!window.DMGame) return;

  if (!document.getElementById('sp-artikel-css')) {
    const st = document.createElement('style');
    st.id = 'sp-artikel-css';
    st.textContent = `
.sp-artikel-stage{position:relative;display:grid;place-items:center;height:clamp(250px,40vh,320px);margin:0 0 6px;overflow:hidden;border-radius:18px;background:linear-gradient(90deg,#fdecec 0,#f6f7fb 30%,#f6f7fb 70%,#f4ecfa 100%)}
.sp-artikel-stage::before{content:"";position:absolute;left:30%;right:30%;top:0;height:30%;background:linear-gradient(#e7f0fc,transparent);pointer-events:none}
.sp-artikel-h{position:absolute;font:800 20px var(--dm-font);opacity:.6;transition:opacity .15s,transform .15s;pointer-events:none}
.sp-artikel-h.is-l{left:10px;top:50%;transform:translateY(-50%)}
.sp-artikel-h.is-u{top:8px;left:50%;transform:translateX(-50%)}
.sp-artikel-h.is-r{right:10px;top:50%;transform:translateY(-50%)}
.sp-artikel-h.is-hot{opacity:1;font-size:24px}
.sp-artikel-card{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:min(230px,58%);height:clamp(150px,26vh,200px);padding:12px;background:#fff;border:3px solid var(--dm-line);border-radius:22px;box-shadow:0 12px 28px rgba(23,32,54,.14);cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;will-change:transform}
.sp-artikel-card:active{cursor:grabbing}
.sp-artikel-card.is-anim{transition:transform .32s ease-in,opacity .32s ease-in}
.sp-artikel-card.is-back{transition:transform .2s ease-out}
.sp-artikel-card.is-in{animation:spArIn .22s ease-out}
@keyframes spArIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
.sp-artikel-card.g-der-b{border-color:#c62828}.sp-artikel-card.g-die-b{border-color:#1565c0}.sp-artikel-card.g-das-b{border-color:#7b1fa2}
.sp-artikel-pic{font-size:46px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.sp-artikel-w{font:800 clamp(24px,7vw,32px)/1.15 var(--dm-font);text-align:center;overflow-wrap:anywhere;hyphens:auto}
.sp-artikel-w.is-long{font-size:clamp(19px,5.4vw,26px)}
.sp-artikel-a{min-height:1.3em;font:800 20px var(--dm-font)}
.sp-artikel-combo{min-height:28px;text-align:center;font-weight:800;color:#c2410c;font-size:17px}
.sp-artikel-combo b{display:inline-block;background:#fff1d0;border-radius:99px;padding:2px 12px;animation:spArPulse .4s ease-out}
@keyframes spArPulse{from{transform:scale(1.3)}to{transform:none}}
.sp-artikel-btns .ch-opt{font-weight:800}
.sp-artikel-btns .ch-opt[data-a=der]{color:#c62828}.sp-artikel-btns .ch-opt[data-a=die]{color:#1565c0}.sp-artikel-btns .ch-opt[data-a=das]{color:#7b1fa2}
.sp-artikel-btns .ch-opt small{font-size:15px;opacity:.75}
.g-der{color:#c62828}.g-die{color:#1565c0}.g-das{color:#7b1fa2}
@media (max-height:700px){.sp-artikel-stage{height:220px}.sp-artikel-card{height:140px}.sp-artikel-pic{font-size:38px}}
@media (prefers-reduced-motion:reduce){.sp-artikel-card.is-anim{transition:opacity .2s}.sp-artikel-card.is-in,.sp-artikel-combo b{animation:none}.sp-artikel-h{transition:none}}
`;
    document.head.appendChild(st);
  }

  const PIC = {
    Zeitung: '📰', Rechnung: '🧾', Mädchen: '👧', Sommer: '☀️', Frühling: '🌷', Morgen: '🌅', Abend: '🌆', Nacht: '🌙', Stuhl: '🪑', Bett: '🛏️',
    Fenster: '🪟', Tür: '🚪', Bad: '🛁', Haus: '🏠', Krankenhaus: '🏥', Auto: '🚗', Bus: '🚌', Zug: '🚆', Fahrrad: '🚲', Ticket: '🎫', Stadt: '🏙️',
    Bahnhof: '🚉', Supermarkt: '🛒', Tasche: '👜', Schlüssel: '🔑', Arzt: '👨‍⚕️', Ärztin: '👩‍⚕️', Lehrerin: '👩‍🏫', Lehrer: '👨‍🏫', Kind: '🧒',
    Familie: '👨‍👩‍👧', Brot: '🍞', Milch: '🥛', Wasser: '💧', Kaffee: '☕', Tee: '🍵', Apfel: '🍎', Banane: '🍌', Kartoffel: '🥔', Ei: '🥚', Käse: '🧀',
    Fleisch: '🥩', Reis: '🍚', Salz: '🧂', Geld: '💶', Handy: '📱', Telefon: '☎️', Computer: '💻', Schule: '🏫', Buch: '📕', Heft: '📓', Stift: '✏️',
    Uhr: '⌚', Hose: '👖', Jacke: '🧥', Schuh: '👞', Hemd: '👔', Kleid: '👗', Hand: '✋', Auge: '👁️', Bein: '🦵', Fieber: '🤒', Tablette: '💊',
    Hund: '🐕', Katze: '🐈', Blume: '🌸', Regen: '🌧️', Polizei: '🚓', Bäckerei: '🥖', Geschenk: '🎁', Gemüse: '🥦', Frühstück: '🥐',
    Universität: '🎓', Urlaub: '🏖️', Dokument: '📄', Formular: '📝', Unterschrift: '✍️', Gespräch: '💬', Erkältung: '🤧'
  };
  const FALLBACK = [
    ['Zeitung', 'die', 'A', 'Nomen auf -ung sind feminin.'], ['Wohnung', 'die', 'A', 'Nomen auf -ung sind feminin.'], ['Mädchen', 'das', 'A', 'Nomen auf -chen sind neutral.'],
    ['Brötchen', 'das', 'A', 'Nomen auf -chen sind neutral.'], ['Montag', 'der', 'A', 'Wochentage sind maskulin.'], ['Sommer', 'der', 'A', 'Jahreszeiten sind maskulin.'],
    ['Januar', 'der', 'A', 'Monate sind maskulin.'], ['Abend', 'der', 'A', 'Tageszeiten sind maskulin (Ausnahme: die Nacht).'], ['Nacht', 'die', 'A', 'Merkwort: die Nacht.'],
    ['Tisch', 'der', 'A', 'Merkwort: der Tisch.'], ['Stuhl', 'der', 'A', 'Merkwort: der Stuhl.'], ['Bett', 'das', 'A', 'Merkwort: das Bett.'], ['Tür', 'die', 'A', 'Merkwort: die Tür.'],
    ['Lampe', 'die', 'A', 'Viele Nomen auf -e sind feminin.'], ['Tasche', 'die', 'A', 'Viele Nomen auf -e sind feminin.'], ['Banane', 'die', 'A', 'Viele Nomen auf -e sind feminin.'],
    ['Katze', 'die', 'A', 'Viele Nomen auf -e sind feminin.'], ['Auto', 'das', 'A', 'Merkwort: das Auto.'], ['Bus', 'der', 'A', 'Merkwort: der Bus.'], ['Zug', 'der', 'A', 'Merkwort: der Zug.'],
    ['Brot', 'das', 'A', 'Merkwort: das Brot.'], ['Apfel', 'der', 'A', 'Merkwort: der Apfel.'], ['Milch', 'die', 'A', 'Merkwort: die Milch.'], ['Kaffee', 'der', 'A', 'Merkwort: der Kaffee.'],
    ['Wasser', 'das', 'A', 'Merkwort: das Wasser.'], ['Handy', 'das', 'A', 'Merkwort: das Handy.'], ['Schlüssel', 'der', 'A', 'Merkwort: der Schlüssel.'], ['Buch', 'das', 'A', 'Merkwort: das Buch.'],
    ['Kind', 'das', 'A', 'Merkwort: das Kind.'], ['Hund', 'der', 'A', 'Merkwort: der Hund.'],
    ['Bewerbung', 'die', 'B', 'Nomen auf -ung sind feminin.'], ['Freiheit', 'die', 'B', 'Nomen auf -heit sind feminin.'], ['Möglichkeit', 'die', 'B', 'Nomen auf -keit sind feminin.'],
    ['Freundschaft', 'die', 'B', 'Nomen auf -schaft sind feminin.'], ['Information', 'die', 'B', 'Nomen auf -ion sind feminin.'], ['Universität', 'die', 'B', 'Nomen auf -tät sind feminin.'],
    ['Praktikum', 'das', 'B', 'Nomen auf -um sind meist neutral.'], ['Dokument', 'das', 'B', 'Nomen auf -ment sind meist neutral.'], ['Ergebnis', 'das', 'B', 'Nomen auf -nis sind meist neutral.'],
    ['Optimismus', 'der', 'B', 'Nomen auf -ismus sind maskulin.'], ['Lehrling', 'der', 'B', 'Nomen auf -ling sind maskulin.']
  ].map(([w, a, lvl, tip]) => ({ w, a, lvl, tip }));
  const DIR = { der: 'l', die: 'u', das: 'r' };
  const FLY = { l: 'translate(-140%, 0) rotate(-24deg)', u: 'translate(0, -140%) rotate(0deg)', r: 'translate(140%, 0) rotate(24deg)' };

  DMGame.register({
    id: 'artikel', title: 'Der, die, das – Wisch!', icon: '👆', level: 'A1–B1',
    desc: '60 Sekunden: Wisch die Karte zum richtigen Artikel. Mit Combo-Punkten!',
    intro: 'Wisch nach links für der, nach oben für die, nach rechts für das. Am Computer: Pfeiltasten ← ↑ → oder die Knöpfe. Du hast 60 Sekunden. Drei richtige Antworten hintereinander geben doppelte Punkte.',
    optionsLabel: 'Niveau',
    options: [{ id: 'A', label: 'A1–A2' }, { id: 'B', label: 'B1' }, { id: 'all', label: 'Alle' }],
    start(api, opt) {
      const src = (window.DM_CHALLENGE && Array.isArray(window.DM_CHALLENGE.artikel) && window.DM_CHALLENGE.artikel.length) ? window.DM_CHALLENGE.artikel : FALLBACK;
      let pool = src.filter(x => x && x.w && /^(der|die|das)$/.test(x.a) && (opt === 'all' || !opt || x.lvl === opt));
      if (pool.length < 10) pool = src.filter(x => x && x.w && /^(der|die|das)$/.test(x.a));
      let deck = api.shuffle(pool), idx = 0, cur = null, score = 0, streak = 0, shown = 0, busy = false, over = false;
      const wrong = [], reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      api.el.innerHTML = `
        <div class="sp-artikel-stage">
          <span class="sp-artikel-h is-l g-der" aria-hidden="true">← der</span>
          <span class="sp-artikel-h is-u g-die" aria-hidden="true">↑ die</span>
          <span class="sp-artikel-h is-r g-das" aria-hidden="true">das →</span>
          <div class="sp-artikel-card" role="img"></div>
        </div>
        <div class="sp-artikel-combo" aria-live="polite"></div>
        <div class="ch-opts ch-opts-art sp-artikel-btns">${['der', 'die', 'das'].map((a, k) => `<button type="button" class="ch-opt" data-k="${k}" data-a="${a}"><kbd>${['←', '↑', '→'][k]}</kbd>${a}</button>`).join('')}</div>
        <p class="ch-keys dm-small">Tastatur: ← der · ↑ die · → das (oder 1 · 2 · 3)</p>`;
      const stage = api.el.querySelector('.sp-artikel-stage'), comboEl = api.el.querySelector('.sp-artikel-combo');
      let card = api.el.querySelector('.sp-artikel-card');
      const hints = { l: stage.querySelector('.is-l'), u: stage.querySelector('.is-u'), r: stage.querySelector('.is-r') };
      const hot = d => Object.entries(hints).forEach(([k, el]) => el.classList.toggle('is-hot', k === d));

      function deal() {
        if (over) return;
        if (idx >= deck.length) { deck = api.shuffle(pool); idx = 0; }
        cur = deck[idx++]; shown++;
        const fresh = card.cloneNode(false);
        card.replaceWith(fresh); card = fresh;
        card.className = 'sp-artikel-card' + (reduce ? '' : ' is-in');
        card.style.transform = ''; card.style.opacity = '';
        const pic = PIC[cur.w];
        card.innerHTML = `${pic ? `<span class="sp-artikel-pic" aria-hidden="true">${pic}</span>` : ''}<span class="sp-artikel-a" aria-hidden="true">?</span><span class="sp-artikel-w${cur.w.length > 11 ? ' is-long' : ''}" lang="de">${api.esc(cur.w)}</span>`;
        card.setAttribute('aria-label', `Welcher Artikel? ${cur.w}`);
        bindSwipe(card);
        api.hud({ step: `Karte ${shown}` });
        busy = false;
      }

      function answer(a) {
        if (busy || over || !cur) return;
        busy = true;
        const ok = a === cur.a, d = DIR[cur.a];
        if (ok) { streak++; score += streak >= 3 ? 2 : 1; } else { streak = 0; if (!wrong.some(x => x.w === cur.w)) wrong.push({ w: cur.w, correct: `${cur.a} ${cur.w}`, tip: cur.tip || '' }); }
        api.hud({ score });
        comboEl.innerHTML = streak >= 3 ? `<b>🔥 Combo x2 · ${streak} richtig in Folge</b>` : streak > 0 ? `${streak} richtig in Folge` : '';
        api.el.querySelectorAll('.sp-artikel-btns .ch-opt').forEach(b => { b.classList.remove('is-right', 'is-wrong'); if (b.dataset.a === cur.a) b.classList.add('is-right'); else if (b.dataset.a === a) b.classList.add('is-wrong'); });
        const art = card.querySelector('.sp-artikel-a');
        art.textContent = cur.a; art.className = `sp-artikel-a g-${cur.a}`;
        card.classList.add(`g-${cur.a}-b`);
        if (!ok) { card.classList.add('is-back'); card.style.transform = ''; }
        api.feedback(ok, ok ? `<b>✓ ${api.esc(cur.a + ' ' + cur.w)}</b>` : `<b>Richtig: ${api.esc(cur.a + ' ' + cur.w)}</b>${cur.tip ? `<span>💡 ${api.esc(cur.tip)}</span>` : ''}`);
        hot(d);
        const wait = ok ? 260 : 900;
        setTimeout(() => {
          if (over) return;
          card.classList.remove('is-back'); card.classList.add('is-anim');
          card.style.transform = reduce ? '' : FLY[d]; card.style.opacity = '0';
          setTimeout(() => { hot(null); api.el.querySelectorAll('.sp-artikel-btns .ch-opt').forEach(b => b.classList.remove('is-right', 'is-wrong')); deal(); }, reduce ? 200 : 320);
        }, wait);
      }

      function bindSwipe(el) {
        let sx = 0, sy = 0, dx = 0, dy = 0, id = null;
        const dirOf = () => Math.abs(dx) > Math.abs(dy) ? (Math.abs(dx) > 60 ? (dx < 0 ? 'l' : 'r') : null) : (dy < -60 ? 'u' : null);
        el.addEventListener('pointerdown', e => {
          if (busy || over || (e.pointerType === 'mouse' && e.button !== 0)) return;
          id = e.pointerId; sx = e.clientX; sy = e.clientY; dx = dy = 0;
          try { el.setPointerCapture(id); } catch {}
          el.classList.remove('is-back', 'is-in');
        });
        el.addEventListener('pointermove', e => {
          if (e.pointerId !== id) return;
          dx = e.clientX - sx; dy = Math.min(e.clientY - sy, 40);
          el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 14}deg)`;
          hot(dirOf());
        });
        const up = e => {
          if (e.pointerId !== id) return;
          id = null;
          const d = dirOf();
          if (d && !busy) { answer({ l: 'der', u: 'die', r: 'das' }[d]); return; }
          hot(null); el.classList.add('is-back'); el.style.transform = '';
        };
        el.addEventListener('pointerup', up);
        el.addEventListener('pointercancel', up);
      }

      api.el.querySelectorAll('.sp-artikel-btns .ch-opt').forEach(b => b.onclick = () => answer(b.dataset.a));
      const onKey = e => {
        if (!document.body.contains(stage)) { document.removeEventListener('keydown', onKey); return; }
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        const a = { ArrowLeft: 'der', ArrowUp: 'die', ArrowRight: 'das' }[e.key];
        if (a) { e.preventDefault(); answer(a); }
      };
      document.addEventListener('keydown', onKey);

      api.timer(60, rest => api.hud({ time: rest, progress: (60 - rest) / 60 }), () => {
        over = true;
        document.removeEventListener('keydown', onKey);
        api.finish({ score, max: 0, wrong: wrong.map(({ correct, tip }) => ({ correct, tip })) });
      });
      deal();
    }
  });
})();
