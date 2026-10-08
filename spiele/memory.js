/* Lernspiel „Wort-Memory“ – Bild + Wort mit Artikel (spiele.js / DMGame) */
(() => {
  if (!window.DMGame) return;

  if (!document.getElementById('sp-memory-css')) {
    const st = document.createElement('style');
    st.id = 'sp-memory-css';
    st.textContent = `
.sp-memory-info{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px;color:#5b6680;font-weight:700;font-size:15px}
.sp-memory-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(5px,1.6vw,10px);max-width:520px;margin:0 auto}
.sp-memory-card{position:relative;aspect-ratio:1/1;min-height:44px;padding:0;border:0;background:none;cursor:pointer;perspective:600px;border-radius:14px;-webkit-tap-highlight-color:transparent}
.sp-memory-card:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:3px}
.sp-memory-in{position:absolute;inset:0;transition:transform .38s ease;transform-style:preserve-3d}
.sp-memory-card.is-open .sp-memory-in{transform:rotateY(180deg)}
.sp-memory-f{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:14px;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;padding:3px}
.sp-memory-back{background:linear-gradient(135deg,#ff8a2a,#e5482b);color:#fff;font:800 clamp(20px,6vw,30px) var(--dm-font);box-shadow:0 3px 8px rgba(23,32,54,.15)}
.sp-memory-back::after{content:"";position:absolute;inset:5px;border:2px dashed rgba(255,255,255,.45);border-radius:10px}
.sp-memory-front{transform:rotateY(180deg);background:#fff;border:2px solid var(--dm-line);color:var(--dm-ink)}
.sp-memory-pic{font-size:clamp(30px,10vw,46px);line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.sp-memory-art{font:800 clamp(12px,3.4vw,18px)/1.1 var(--dm-font)}
.sp-memory-w{font:700 clamp(12px,3.6vw,20px)/1.12 var(--dm-font);text-align:center;hyphens:manual;overflow-wrap:anywhere;max-width:100%}
.sp-memory-w.is-long{font-size:clamp(10.5px,3vw,16px)}
.sp-memory-card.is-match .sp-memory-front{border-color:#1f9d55;background:#e8f6ec}
.sp-memory-card.is-miss .sp-memory-front{border-color:#d6332b;background:#fdecea}
.sp-memory-card.is-match{cursor:default}
.g-der{color:#c62828}.g-die{color:#1565c0}.g-das{color:#7b1fa2}
.sp-memory-legend{display:flex;justify-content:center;gap:14px;margin:12px 0 0;font-weight:700;font-size:14px}
@media (prefers-reduced-motion:reduce){.sp-memory-in{transition:none}}
`;
    document.head.appendChild(st);
  }

  // [Bild, Artikel, Wort] – weiche Trennstellen (­) für lange Wörter
  const S = '­';
  const THEMES = {
    essen: [['🍎', 'der', 'Apfel'], ['🍌', 'die', 'Banane'], ['🍅', 'die', 'Tomate'], ['🥔', 'die', `Kar${S}tof${S}fel`], ['🍞', 'das', 'Brot'],
      ['🧀', 'der', 'Käse'], ['🥚', 'das', 'Ei'], ['🥛', 'die', 'Milch'], ['☕', 'der', 'Kaffee'], ['🍵', 'der', 'Tee'], ['🍋', 'die', 'Zitrone'],
      ['🥕', 'die', 'Karotte'], ['🐟', 'der', 'Fisch'], ['🍕', 'die', 'Pizza'], ['🍰', 'der', 'Kuchen'], ['🥒', 'die', 'Gurke'], ['🍓', 'die', `Erd${S}bee${S}re`],
      ['🍚', 'der', 'Reis'], ['🍦', 'das', 'Eis'], ['🧅', 'die', 'Zwiebel'], ['🧈', 'die', 'Butter'], ['🍲', 'die', 'Suppe']],
    kleidung: [['👖', 'die', 'Hose'], ['👕', 'das', 'T-Shirt'], ['👗', 'das', 'Kleid'], ['🧥', 'die', 'Jacke'], ['👞', 'der', 'Schuh'], ['🧦', 'die', 'Socke'],
      ['🎩', 'der', 'Hut'], ['🧢', 'die', 'Kappe'], ['🧣', 'der', 'Schal'], ['🧤', 'der', `Hand${S}schuh`], ['👓', 'die', 'Brille'], ['👔', 'das', 'Hemd'],
      ['👢', 'der', 'Stiefel'], ['👜', 'die', 'Tasche'], ['🎒', 'der', `Ruck${S}sack`], ['🩱', 'der', `Bade${S}anzug`], ['👙', 'der', 'Bikini'], ['💍', 'der', 'Ring'],
      ['👟', 'der', `Turn${S}schuh`], ['☂️', 'der', `Regen${S}schirm`]],
    wohnung: [['🛏️', 'das', 'Bett'], ['🛋️', 'das', 'Sofa'], ['🪑', 'der', 'Stuhl'], ['🚪', 'die', 'Tür'], ['🪟', 'das', 'Fenster'], ['🚿', 'die', 'Dusche'],
      ['🛁', 'die', `Bade${S}wanne`], ['🚽', 'die', 'Toilette'], ['🪞', 'der', 'Spiegel'], ['🔑', 'der', `Schlüs${S}sel`], ['⏰', 'der', 'Wecker'],
      ['📺', 'der', `Fern${S}seher`], ['🖼️', 'das', 'Bild'], ['🕯️', 'die', 'Kerze'], ['🧹', 'der', 'Besen'], ['🪣', 'der', 'Eimer'], ['🧼', 'die', 'Seife'],
      ['🪴', 'die', 'Pflanze'], ['🧺', 'der', 'Korb'], ['📫', 'der', `Brief${S}kasten`], ['🏠', 'das', 'Haus']],
    koerper: [['👁️', 'das', 'Auge'], ['👂', 'das', 'Ohr'], ['👃', 'die', 'Nase'], ['👄', 'der', 'Mund'], ['🦷', 'der', 'Zahn'], ['✋', 'die', 'Hand'],
      ['🦶', 'der', 'Fuß'], ['🦵', 'das', 'Bein'], ['💪', 'der', 'Arm'], ['🫀', 'das', 'Herz'], ['👅', 'die', 'Zunge'], ['🧠', 'das', 'Gehirn'],
      ['🦴', 'der', 'Knochen'], ['💊', 'die', 'Tablette'], ['🩹', 'das', 'Pflaster'], ['🌡️', 'das', `Ther${S}mo${S}meter`], ['💉', 'die', 'Spritze'],
      ['🚑', 'der', `Kran${S}ken${S}wagen`], ['🏥', 'das', `Kran${S}ken${S}haus`], ['🦽', 'der', `Roll${S}stuhl`]],
    arbeit: [['👨‍🍳', 'der', 'Koch'], ['👩‍⚕️', 'die', 'Ärztin'], ['👨‍🏫', 'der', 'Lehrer'], ['👮‍♀️', 'die', `Poli${S}zistin`], ['👷‍♂️', 'der', `Bau${S}arbei${S}ter`],
      ['👩‍🚒', 'die', `Feuer${S}wehr${S}frau`], ['👨‍🔧', 'der', `Mecha${S}niker`], ['👩‍🌾', 'die', 'Bäuerin'], ['👨‍✈️', 'der', 'Pilot'],
      ['👩‍💻', 'die', `Program${S}mie${S}rerin`], ['👩‍🎤', 'die', 'Sängerin'], ['🔨', 'der', 'Hammer'], ['🏢', 'das', 'Büro'], ['🏭', 'die', 'Fabrik'],
      ['💶', 'das', 'Geld'], ['🚚', 'der', `Last${S}wagen`], ['📅', 'der', `Kalen${S}der`], ['💻', 'der', 'Laptop']]
  };
  const PAIRS = 8;
  const clean = w => w.replace(/­/g, '');
  const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  DMGame.register({
    id: 'memory', title: 'Wort-Memory', icon: '🃏', level: 'A1–A2',
    desc: 'Finde die Paare: Bild und Wort mit Artikel – in den Farben der, die, das.',
    intro: 'Decke immer zwei Karten auf und finde Bild und Wort, die zusammenpassen. Merk dir den Artikel: der (rot), die (blau), das (lila). Je weniger Züge und je schneller, desto mehr Punkte.',
    optionsLabel: 'Thema',
    options: [{ id: 'essen', label: 'Essen & Trinken' }, { id: 'kleidung', label: 'Kleidung' }, { id: 'wohnung', label: 'Wohnung' },
      { id: 'koerper', label: 'Körper & Gesundheit' }, { id: 'arbeit', label: 'Arbeit & Berufe' }],
    start(api, opt) {
      const words = api.pick(THEMES[opt] || THEMES.essen, PAIRS);
      const cards = api.shuffle(words.flatMap((w, id) => [{ id, kind: 'pic', w }, { id, kind: 'word', w }]));
      let open = [], moves = 0, found = 0, secs = 0, lock = false, done = false;

      api.el.innerHTML = `<p class="sp-memory-info"><span>Finde ${PAIRS} Paare: Bild + Wort</span><span>Paare: <b class="sp-memory-found">0</b> / ${PAIRS}</span></p>
        <div class="sp-memory-grid" role="group" aria-label="Memory-Karten">${cards.map((c, n) => {
          const [pic, art, word] = c.w;
          const front = c.kind === 'pic'
            ? `<span class="sp-memory-pic" aria-hidden="true">${pic}</span>`
            : `<span class="sp-memory-art g-${art}">${art}</span><span class="sp-memory-w g-${art}${clean(word).length > 9 ? ' is-long' : ''}">${api.esc(word)}</span>`;
          return `<button type="button" class="sp-memory-card" data-n="${n}" aria-label="Karte ${n + 1}, verdeckt"><span class="sp-memory-in"><span class="sp-memory-f sp-memory-back" aria-hidden="true">?</span><span class="sp-memory-f sp-memory-front">${front}</span></span></button>`;
        }).join('')}</div>
        <p class="sp-memory-legend" aria-hidden="true"><span class="g-der">der</span><span class="g-die">die</span><span class="g-das">das</span></p>`;
      const btns = [...api.el.querySelectorAll('.sp-memory-card')];
      const label = c => c.kind === 'pic' ? `Bild: ${clean(c.w[2])}` : `Wort: ${c.w[1]} ${clean(c.w[2])}`;
      api.hud({ step: 'Züge: 0', progress: 0, score: 0, time: mmss(0) });

      const timer = api.timer(3600, rest => { secs = 3600 - rest; if (!done) api.hud({ time: mmss(secs) }); }, () => end());

      function end() {
        if (done) return;
        done = true; timer.stop();
        const extra = Math.max(0, moves - PAIRS);
        const score = Math.max(0, Math.round(100 - extra * 3 - secs / 5));
        api.feedback(true, `<b>Alle ${PAIRS} Paare gefunden!</b><span>${moves} Züge · ${mmss(secs)} Minuten</span>`);
        api.next('Ergebnis', () => api.finish({ score, max: 100 }));
      }

      btns.forEach(b => b.onclick = () => {
        const n = +b.dataset.n, c = cards[n];
        if (lock || done || b.classList.contains('is-open')) return;
        b.classList.add('is-open'); b.setAttribute('aria-label', label(c));
        open.push(n);
        if (open.length < 2) return;
        moves++;
        api.hud({ step: `Züge: ${moves}` });
        const [a, z] = open.map(i => cards[i]), pair = open.map(i => btns[i]);
        open = [];
        if (a.id === z.id) {
          pair.forEach(x => { x.classList.add('is-match'); x.setAttribute('aria-label', label(a.kind === 'word' ? a : z) + ' – Paar gefunden'); });
          found++;
          api.el.querySelector('.sp-memory-found').textContent = found;
          api.hud({ progress: found / PAIRS, score: found });
          api.speak(`${a.w[1]} ${clean(a.w[2])}`);
          if (found === PAIRS) setTimeout(end, 500);
        } else {
          lock = true;
          pair.forEach(x => x.classList.add('is-miss'));
          setTimeout(() => {
            pair.forEach(x => { x.classList.remove('is-open', 'is-miss'); x.setAttribute('aria-label', `Karte ${+x.dataset.n + 1}, verdeckt`); });
            lock = false;
          }, 950);
        }
      });
    }
  });
})();
