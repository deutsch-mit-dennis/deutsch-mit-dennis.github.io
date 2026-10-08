/* Lernspiel „Wo oder wohin?“ – Wechselpräpositionen im Zimmer (spiele.js / DMGame) */
(() => {
  if (!window.DMGame) return;

  /* ---------- CSS (einmalig) ---------- */
  if (!document.getElementById('sp-wowohin-css')) {
    const st = document.createElement('style');
    st.id = 'sp-wowohin-css';
    st.textContent = `
.sp-wowohin-task{display:flex;align-items:flex-start;gap:10px;margin:0 0 6px}
.sp-wowohin-task .ch-q{flex:1;margin:0}
.sp-wowohin-say{flex:0 0 auto;min-width:44px;min-height:44px;border:2px solid var(--dm-line);border-radius:12px;background:#fff;font-size:20px;cursor:pointer}
.sp-wowohin-say:hover{border-color:var(--dm-tinte)}
.sp-wowohin-hint{margin:4px 0 8px;color:#5b6680;font-size:15px;font-weight:700}
.sp-wowohin-room{margin:0 -10px;border-radius:16px;overflow:hidden;border:1px solid var(--dm-line);background:#f6eedf}
.sp-wowohin-room svg{display:block;width:100%;height:auto;max-height:58vh;margin:0 auto;-webkit-user-select:none;user-select:none;touch-action:manipulation}
.sp-wowohin-emo{font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.sp-wowohin-lbl{font:700 12px var(--dm-font,Arial),sans-serif;fill:#2b3350;paint-order:stroke;stroke:#fff;stroke-width:3px;stroke-linejoin:round;pointer-events:none}
.sp-wowohin-t{cursor:pointer;outline:none}
.sp-wowohin-hit{fill:transparent;stroke:transparent;stroke-width:2.5;rx:8}
.sp-wowohin-armed .sp-wowohin-t .sp-wowohin-hit{stroke:rgba(35,65,181,.35);stroke-dasharray:5 4}
.sp-wowohin-armed .sp-wowohin-wall .sp-wowohin-hit{stroke:transparent}
.sp-wowohin-t:hover .sp-wowohin-hit,.sp-wowohin-t:focus-visible .sp-wowohin-hit{stroke:#ff8a2a;stroke-dasharray:none;fill:rgba(255,138,42,.08)}
.sp-wowohin-wall:hover .sp-wowohin-hit{fill:transparent}
.sp-wowohin-wall:focus-visible .sp-wowohin-hit{stroke:#ff8a2a}
.sp-wowohin-t.is-wrong .sp-wowohin-hit{stroke:#d6332b;stroke-dasharray:none;fill:rgba(214,51,43,.12)}
.sp-wowohin-t.is-right .sp-wowohin-hit{stroke:#1f9d55;stroke-dasharray:none;fill:rgba(31,157,85,.10)}
.sp-wowohin-placed{animation:spWwPop .45s ease-out;filter:drop-shadow(0 0 2px #fff) drop-shadow(0 2px 2px rgba(0,0,0,.35))}
@keyframes spWwPop{0%{opacity:0;transform:translateY(-14px)}100%{opacity:1;transform:none}}
.sp-wowohin-tray{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 4px}
.sp-wowohin-obj{display:inline-flex;align-items:center;gap:6px;min-height:48px;padding:6px 12px 6px 8px;border:2px solid var(--dm-line);border-radius:14px;background:#fff;font:600 16px var(--dm-font);color:var(--dm-ink);cursor:pointer}
.sp-wowohin-obj:hover{border-color:var(--dm-tinte)}
.sp-wowohin-obj[aria-pressed=true]{border-color:var(--dm-tinte);background:var(--dm-tinte-soft);box-shadow:0 0 0 3px rgba(35,65,181,.18)}
.sp-wowohin-obj .sp-wowohin-ic{display:inline-grid;place-items:center;width:30px;height:30px;font-size:24px;line-height:1}
.sp-wowohin-obj svg{width:28px;height:28px}
.sp-wowohin-msg{min-height:1.4em;margin:6px 0 0;font-weight:700;font-size:15px;color:#8c1d16}
.sp-wowohin-msg.is-ok{color:#155c2f}
.sp-wowohin-done{margin:10px 0 0;font-weight:700;color:#155c2f}
.sp-wowohin-step{margin-top:10px}
.sp-wowohin-step .ch-q{margin-bottom:10px}
.sp-wowohin-step .ch-gap{min-width:5.5em}
.sp-wowohin-step .ch-gap.is-filled{border-bottom-width:3px;min-width:0;padding:0 2px}
.sp-wowohin-step .ch-gap.is-r{color:#155c2f;border-color:#1f9d55}
.sp-wowohin-step .ch-gap.is-w{color:#8c1d16;border-color:#d6332b;text-decoration:line-through}
.sp-wowohin-fix{display:block;margin:-4px 0 8px;color:#155c2f;font-weight:700}
.sp-wowohin-opts{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.sp-wowohin-opts .ch-opt{min-height:52px;font-size:17px}
@media (max-width:520px){.sp-wowohin-opts{grid-template-columns:1fr}.sp-wowohin-obj{font-size:15px;padding:6px 10px 6px 6px}}
@media (min-width:900px){.sp-wowohin-room{margin:0}}
@media (prefers-reduced-motion:reduce){.sp-wowohin-placed{animation:none}}
`;
    document.head.appendChild(st);
  }

  /* ---------- Daten ---------- */
  const ART = { Akk: { der: 'den', die: 'die', das: 'das' }, Dat: { der: 'dem', die: 'der', das: 'dem' } };
  const CONTR = { 'in das': 'ins', 'in dem': 'im', 'an das': 'ans', 'an dem': 'am' };
  const VERB = {
    S: { imp: 'Stell', ich: 'stelle', er: 'steht', pair: 'stellen (Wohin?) – stehen (Wo?)' },
    L: { imp: 'Leg', ich: 'lege', er: 'liegt', pair: 'legen (Wohin?) – liegen (Wo?)' },
    H: { imp: 'Häng', ich: 'hänge', er: 'hängt', pair: 'hängen: gleiches Verb für Wohin? und Wo?' },
    Z: { imp: 'Setz', ich: 'setze', er: 'sitzt', pair: 'setzen (Wohin?) – sitzen (Wo?)' },
    K: { imp: 'Steck', ich: 'stecke', er: 'steckt', pair: 'stecken: gleiches Verb für Wohin? und Wo?' }
  };
  const LAMP = '<g><path d="M-9-12h18l5 12h-28z" fill="#ffd54f" stroke="#b8860b" stroke-width="1.5"/><rect x="-1.5" y="0" width="3" height="9" fill="#6d4c41"/><rect x="-8" y="9" width="16" height="3.5" rx="1.5" fill="#6d4c41"/></g>';
  const OBJ = {
    Vase: { g: 'die', e: '🏺' }, Tasse: { g: 'die', e: '☕' }, Flasche: { g: 'die', e: '🍾' }, Lampe: { g: 'die', svg: LAMP },
    Pflanze: { g: 'die', e: '🪴' }, Tasche: { g: 'die', e: '👜' }, Teller: { g: 'der', e: '🍽️' }, Buch: { g: 'das', e: '📕' },
    Schlüssel: { g: 'der', e: '🔑' }, Handy: { g: 'das', e: '📱' }, Brille: { g: 'die', e: '👓' }, Jacke: { g: 'die', e: '🧥' },
    Ball: { g: 'der', e: '⚽' }, Zeitung: { g: 'die', e: '📰' }, Brief: { g: 'der', e: '✉️' }, Hut: { g: 'der', e: '🎩' },
    Uhr: { g: 'die', e: '🕰️' }, Spiegel: { g: 'der', e: '🪞' }, Kalender: { g: 'der', e: '📅' }, Katze: { g: 'die', e: '🐈' },
    Teddy: { g: 'der', e: '🧸' }, Stecker: { g: 'der', e: '🔌' }
  };
  // Ziele im Zimmer: n = Nomen, g = Genus, hit = Klickfläche [x,y,w,h] (viewBox 440×300), l = Beschriftung [x,y]
  const TG = {
    Wand: { n: 'Wand', g: 'die', hit: [0, 0, 440, 232], l: [228, 18] },
    Tuer: { n: 'Tür', g: 'die', hit: [4, 78, 58, 156], l: [33, 210] },
    Schrank: { n: 'Schrank', g: 'der', hit: [66, 66, 66, 168], l: [99, 205] },
    Regal: { n: 'Regal', g: 'das', hit: [138, 88, 56, 146], l: [166, 166] },
    Sofa: { n: 'Sofa', g: 'das', hit: [196, 172, 102, 60], l: [247, 216] },
    Bild: { n: 'Bild', g: 'das', hit: [214, 94, 66, 58], l: [247, 160] },
    Tisch: { n: 'Tisch', g: 'der', hit: [310, 182, 70, 52], l: [345, 222] },
    Fenster: { n: 'Fenster', g: 'das', hit: [304, 26, 82, 84], l: [345, 22] },
    Kuehl: { n: 'Kühlschrank', g: 'der', hit: [380, 92, 58, 142], l: [402, 200] },
    Steckdose: { n: 'Steckdose', g: 'die', hit: [280, 128, 50, 50], l: [306, 176] },
    Bett: { n: 'Bett', g: 'das', hit: [8, 234, 154, 62], l: [96, 286] },
    Teppich: { n: 'Teppich', g: 'der', hit: [184, 252, 162, 40], l: [300, 284] }
  };
  // Ort des Gegenstands nach dem Bewegen: [x, y, Ebene] (b = hinter dem Ziel, i = „in“ mit Innenraum)
  const POS = {
    'Regal.auf': [166, 75], 'Regal.in': [166, 122, 'i'], 'Tisch.auf': [345, 172], 'Tisch.unter': [345, 218], 'Tisch.über': [345, 142],
    'Kuehl.in': [409, 178, 'i'], 'Kuehl.an': [409, 168], 'Kuehl.auf': [409, 79], 'Kuehl.vor': [409, 252],
    'Sofa.auf': [238, 191], 'Sofa.unter': [247, 228, 'b'], 'Sofa.neben': [303, 214], 'Sofa.hinter': [266, 168, 'b'],
    'Regal+Sofa': [197, 214], 'Sofa+Tisch': [304, 214], 'Bild+Fenster': [293, 104],
    'Bild.neben': [198, 120], 'Bild.hinter': [264, 104, 'b'], 'Fenster.an': [345, 90], 'Fenster.neben': [409, 60],
    'Tuer.an': [33, 112], 'Tuer.in': [48, 158], 'Tuer.vor': [33, 254], 'Tuer.über': [33, 62],
    'Schrank.auf': [99, 54], 'Schrank.in': [99, 140, 'i'], 'Schrank.an': [112, 130],
    'Bett.auf': [80, 239], 'Bett.unter': [86, 283, 'b'], 'Bett.neben': [174, 274], 'Teppich.auf': [262, 265],
    'Wand.an': [205, 50], 'Steckdose.in': [306, 157]
  };
  // [Verb, Gegenstand, Präposition, Ziel, Ziel 2 (nur „zwischen“)]
  const TASKS = [
    ['S', 'Vase', 'auf', 'Regal'], ['S', 'Vase', 'auf', 'Tisch'], ['S', 'Vase', 'in', 'Regal'], ['S', 'Vase', 'auf', 'Kuehl'],
    ['S', 'Tasse', 'auf', 'Tisch'], ['S', 'Flasche', 'in', 'Kuehl'], ['S', 'Flasche', 'unter', 'Tisch'],
    ['S', 'Lampe', 'neben', 'Sofa'], ['S', 'Lampe', 'auf', 'Regal'], ['S', 'Lampe', 'hinter', 'Sofa'], ['S', 'Lampe', 'zwischen', 'Regal', 'Sofa'],
    ['S', 'Pflanze', 'an', 'Fenster'], ['S', 'Pflanze', 'zwischen', 'Sofa', 'Tisch'], ['S', 'Pflanze', 'neben', 'Bett'],
    ['S', 'Tasche', 'vor', 'Tuer'], ['S', 'Tasche', 'unter', 'Tisch'], ['S', 'Teller', 'in', 'Regal'],
    ['L', 'Buch', 'auf', 'Tisch'], ['L', 'Buch', 'in', 'Regal'], ['L', 'Buch', 'unter', 'Bett'], ['L', 'Schlüssel', 'auf', 'Schrank'],
    ['L', 'Schlüssel', 'auf', 'Tisch'], ['L', 'Handy', 'auf', 'Sofa'], ['L', 'Handy', 'auf', 'Bett'], ['L', 'Brille', 'auf', 'Regal'],
    ['L', 'Jacke', 'auf', 'Bett'], ['L', 'Jacke', 'auf', 'Sofa'], ['L', 'Ball', 'unter', 'Sofa'], ['L', 'Ball', 'auf', 'Teppich'],
    ['L', 'Zeitung', 'neben', 'Bett'], ['L', 'Zeitung', 'auf', 'Teppich'], ['L', 'Brief', 'auf', 'Tisch'], ['L', 'Hut', 'auf', 'Schrank'],
    ['H', 'Jacke', 'an', 'Tuer'], ['H', 'Jacke', 'in', 'Schrank'], ['H', 'Jacke', 'an', 'Schrank'], ['H', 'Uhr', 'an', 'Wand'],
    ['H', 'Uhr', 'über', 'Tuer'], ['H', 'Uhr', 'zwischen', 'Bild', 'Fenster'], ['H', 'Spiegel', 'neben', 'Fenster'], ['H', 'Spiegel', 'an', 'Wand'],
    ['H', 'Kalender', 'an', 'Kuehl'], ['H', 'Kalender', 'neben', 'Bild'], ['H', 'Lampe', 'über', 'Tisch'], ['H', 'Hut', 'an', 'Tuer'], ['H', 'Tasche', 'an', 'Tuer'],
    ['Z', 'Katze', 'auf', 'Sofa'], ['Z', 'Katze', 'auf', 'Teppich'], ['Z', 'Katze', 'auf', 'Bett'], ['Z', 'Katze', 'vor', 'Kuehl'],
    ['Z', 'Katze', 'in', 'Regal'], ['Z', 'Katze', 'unter', 'Tisch'], ['Z', 'Teddy', 'auf', 'Bett'], ['Z', 'Teddy', 'auf', 'Sofa'], ['Z', 'Teddy', 'in', 'Regal'],
    ['K', 'Schlüssel', 'in', 'Tuer'], ['K', 'Stecker', 'in', 'Steckdose'], ['K', 'Brief', 'hinter', 'Bild']
  ];
  // Ablenker mit anderer Präposition – nur solche, die im Bild klar anders aussehen
  const OTHER = { auf: ['unter'], in: ['auf'], an: ['auf'], unter: ['auf'], über: ['unter'], vor: ['hinter'], hinter: ['vor'], neben: ['auf'] };

  /* ---------- Grammatik ---------- */
  const raw = (p, c, t) => `${p} ${ART[c][TG[t].g]}`;
  const np = (p, c, t) => { const r = raw(p, c, t); return `${CONTR[r] || r} ${TG[t].n}`; };
  const phrase = (task, c) => task[2] === 'zwischen'
    ? `zwischen ${ART[c][TG[task[3]].g]} ${TG[task[3]].n} und ${ART[c][TG[task[4]].g]} ${TG[task[4]].n}` : np(task[2], c, task[3]);
  const objNP = (o, c) => `${c === 'Nom' ? o.g : ART.Akk[o.g]} ${o.name}`;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  function options(task, c, shuffle) {
    const other = c === 'Akk' ? 'Dat' : 'Akk', [, , p, t, t2] = task;
    const right = phrase(task, c), set = new Map([[right, 'ok']]);
    const add = (s, kind) => { if (s && !set.has(s) && set.size < 4) set.set(s, kind); };
    if (p === 'zwischen') {
      const A = TG[t], B = TG[t2];
      [[c, other], [other, c], [other, other]].forEach(([x, y]) => add(`zwischen ${ART[x][A.g]} ${A.n} und ${ART[y][B.g]} ${B.n}`, 'case'));
    } else {
      const r = raw(p, c, t);
      if (CONTR[r]) add(`${r} ${TG[t].n}`, 'long');
      add(np(p, other, t), 'case');
      add(np(shuffle(OTHER[p])[0], c, t), 'prep');
      const pool = Object.values(ART[c]).concat(Object.values(ART[other])).filter(a => a !== ART[c][TG[t].g]);
      shuffle(pool).forEach(a => { const rr = `${p} ${a}`; add(`${CONTR[rr] || rr} ${TG[t].n}`, 'case'); });
    }
    return { right, opts: shuffle([...set.entries()]) };
  }

  /* ---------- Zimmer (SVG) ---------- */
  const lbl = (k) => { const T = TG[k]; return `<text class="sp-wowohin-lbl" x="${T.l[0]}" y="${T.l[1]}" text-anchor="middle">${T.n}</text>`; };
  const hit = (k) => { const h = TG[k].hit; return `<rect class="sp-wowohin-hit" x="${h[0]}" y="${h[1]}" width="${h[2]}" height="${h[3]}" rx="8"/>`; };
  const ART_SVG = {
    Tuer: `<rect x="8" y="82" width="50" height="150" fill="#b07a4a" stroke="#7a4e2a" stroke-width="2"/><rect x="15" y="92" width="36" height="52" rx="3" fill="none" stroke="#8a5a33" stroke-width="2"/><rect x="15" y="156" width="36" height="66" rx="3" fill="none" stroke="#8a5a33" stroke-width="2"/><circle cx="50" cy="158" r="3.5" fill="#e8c25a" stroke="#9c7a1c"/>`,
    Schrank: `<rect x="70" y="70" width="58" height="156" rx="3" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/><line x1="99" y1="74" x2="99" y2="222" stroke="#5d4037" stroke-width="2"/><rect x="94" y="135" width="2.5" height="16" rx="1" fill="#f0d79a"/><rect x="101.5" y="135" width="2.5" height="16" rx="1" fill="#f0d79a"/><rect x="74" y="226" width="6" height="6" fill="#5d4037"/><rect x="118" y="226" width="6" height="6" fill="#5d4037"/>`,
    Regal: `<g fill="#a1887f" stroke="#6d4c41" stroke-width="1.5"><rect x="142" y="92" width="5" height="140"/><rect x="185" y="92" width="5" height="140"/><rect x="142" y="90" width="48" height="5"/><rect x="142" y="136" width="48" height="5"/><rect x="142" y="182" width="48" height="5"/><rect x="142" y="226" width="48" height="5"/></g><g stroke="#33333355" stroke-width=".8"><rect x="150" y="196" width="7" height="30" fill="#e57373"/><rect x="158" y="192" width="6" height="34" fill="#64b5f6"/><rect x="165" y="198" width="8" height="28" fill="#81c784"/><rect x="174" y="200" width="6" height="26" fill="#ffb74d" transform="rotate(10 177 226)"/></g>`,
    Sofa: `<rect x="206" y="176" width="82" height="28" rx="8" fill="#5c7cba"/><rect x="206" y="198" width="82" height="20" rx="4" fill="#6f8fcc"/><rect x="198" y="190" width="14" height="30" rx="6" fill="#4f6ea8"/><rect x="282" y="190" width="14" height="30" rx="6" fill="#4f6ea8"/><rect x="208" y="220" width="5" height="11" fill="#3e4f73"/><rect x="281" y="220" width="5" height="11" fill="#3e4f73"/>`,
    Bild: `<rect x="226" y="104" width="42" height="34" fill="#fff8e1" stroke="#6d4c41" stroke-width="4"/><path d="M229 134l12-14 8 9 6-6 10 11z" fill="#66bb6a"/><circle cx="257" cy="113" r="4" fill="#ffca28"/>`,
    Steckdose: `<rect x="299" y="149" width="14" height="14" rx="3" fill="#fff" stroke="#9aa3b8" stroke-width="1.5"/><circle cx="303.5" cy="156" r="1.4" fill="#555"/><circle cx="308.5" cy="156" r="1.4" fill="#555"/>`,
    Tisch: `<rect x="314" y="188" width="62" height="7" rx="2" fill="#a1683a"/><rect x="319" y="195" width="5" height="37" fill="#8a552c"/><rect x="366" y="195" width="5" height="37" fill="#8a552c"/>`,
    Fenster: `<rect x="312" y="30" width="66" height="70" fill="#cfe8fb" stroke="#fff" stroke-width="5"/><line x1="345" y1="30" x2="345" y2="100" stroke="#fff" stroke-width="4"/><line x1="312" y1="65" x2="378" y2="65" stroke="#fff" stroke-width="4"/><rect x="306" y="100" width="78" height="6" rx="2" fill="#e0e0e0"/>`,
    Kuehl: `<rect x="384" y="96" width="50" height="136" rx="6" fill="#eef3f6" stroke="#9fb3bf" stroke-width="2"/><line x1="384" y1="138" x2="434" y2="138" stroke="#9fb3bf" stroke-width="2"/><rect x="389" y="114" width="3" height="16" rx="1.5" fill="#9fb3bf"/><rect x="389" y="146" width="3" height="26" rx="1.5" fill="#9fb3bf"/>`,
    Bett: `<rect x="14" y="236" width="12" height="56" rx="3" fill="#8d6e63"/><rect x="146" y="250" width="10" height="42" rx="3" fill="#8d6e63"/><rect x="24" y="268" width="124" height="10" fill="#a1887f"/><rect x="24" y="252" width="124" height="18" rx="4" fill="#fafafa" stroke="#cfd4de"/><rect x="62" y="250" width="86" height="22" rx="4" fill="#e57373"/><rect x="28" y="244" width="30" height="11" rx="5" fill="#fff" stroke="#cfd4de"/>`,
    Teppich: `<rect x="190" y="258" width="150" height="26" rx="6" fill="#c5a3dd"/><rect x="198" y="263" width="134" height="16" rx="4" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/>`
  };
  const ORDER = ['Tuer', 'Schrank', 'Regal', 'Bild', 'Fenster', 'Sofa', 'Tisch', 'Kuehl', 'Steckdose', 'Teppich', 'Bett'];
  const roomSVG = () => `<svg viewBox="0 0 440 300" role="group" aria-label="Zimmer – tippe auf ein Ziel">
    <rect x="0" y="0" width="440" height="232" fill="#f4ead8"/><rect x="0" y="232" width="440" height="68" fill="#d9b98f"/>
    <g stroke="#c9a77a" stroke-width="1"><line x1="0" y1="252" x2="440" y2="252"/><line x1="0" y1="274" x2="440" y2="274"/></g>
    <rect x="0" y="228" width="440" height="6" fill="#e6d6bc"/>
    <g class="sp-wowohin-t sp-wowohin-wall" data-t="Wand" tabindex="0" role="button" aria-label="Wand">${hit('Wand')}${lbl('Wand')}</g>
    ${ORDER.map(k => `<g class="sp-wowohin-t" data-t="${k}" tabindex="0" role="button" aria-label="${TG[k].n}">${ART_SVG[k]}${hit(k)}${lbl(k)}</g>`).join('')}
  </svg>`;
  const glyph = (o, x, y, size = 32) => o.svg
    ? `<g transform="translate(${x} ${y}) scale(${size / 26})">${o.svg}</g>`
    : `<text class="sp-wowohin-emo" x="${x}" y="${y}" font-size="${size}" text-anchor="middle" dominant-baseline="central">${o.e}</text>`;
  const icon = o => o.svg ? `<svg viewBox="-15 -15 30 30" aria-hidden="true">${o.svg}</svg>` : `<span aria-hidden="true">${o.e}</span>`;

  Object.keys(OBJ).forEach(k => { OBJ[k].name = k; });

  DMGame.register({
    id: 'wowohin', title: 'Wo oder wohin?', icon: '📦', level: 'A2–B1',
    desc: 'Räum das Zimmer auf – und übe Wechselpräpositionen mit Akkusativ und Dativ.',
    intro: 'Lies die Aufgabe und bewege den Gegenstand: erst auf den Gegenstand tippen, dann auf das Ziel im Zimmer. Danach ergänzt du zwei Sätze: Wohin? (Akkusativ) und Wo? (Dativ). 10 Runden.',
    start(api) {
      const N = 10, rounds = api.pick(TASKS, N), wrong = [];
      let i = 0, score = 0;
      const $ = s => api.el.querySelector(s);

      function round() {
        api.clearFeedback();
        api.hud({ step: `${i + 1}/${N}`, progress: i / N, score });
        const task = rounds[i], [vk, ok, p, t, t2] = task, V = VERB[vk], O = OBJ[ok];
        const akk = phrase(task, 'Akk'), dat = phrase(task, 'Dat');
        const order = `${V.imp} ${objNP(O, 'Akk')} ${akk}.`;
        const tray = api.shuffle([ok, ...api.pick(Object.keys(OBJ).filter(k => k !== ok), 5)]);
        let sel = null, moveOk = true, perfect = true, busy = false;

        api.el.innerHTML = `
          <div class="sp-wowohin-task"><p class="ch-q">${api.esc(order)}</p><button type="button" class="sp-wowohin-say" aria-label="Aufgabe vorlesen">🔊</button></div>
          <p class="sp-wowohin-hint">Tippe zuerst auf den Gegenstand, dann auf das Ziel im Zimmer.</p>
          <div class="sp-wowohin-room">${roomSVG()}</div>
          <div class="sp-wowohin-tray" role="group" aria-label="Gegenstände">${tray.map(k => `<button type="button" class="sp-wowohin-obj" data-o="${k}" aria-pressed="false"><span class="sp-wowohin-ic">${icon(OBJ[k])}</span>${api.esc(OBJ[k].g + ' ' + k)}</button>`).join('')}</div>
          <p class="sp-wowohin-msg" role="status"></p>
          <div class="sp-wowohin-sent"></div>`;
        const svg = $('svg'), msg = $('.sp-wowohin-msg');
        $('.sp-wowohin-say').onclick = () => api.speak(order);
        const say = (txt, good) => { msg.textContent = txt; msg.classList.toggle('is-ok', !!good); };

        api.el.querySelectorAll('.sp-wowohin-obj').forEach(b => b.onclick = () => {
          if (busy) return;
          sel = b.dataset.o;
          api.el.querySelectorAll('.sp-wowohin-obj').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          svg.classList.add('sp-wowohin-armed');
          say(`${cap(OBJ[sel].g)} ${sel} – und jetzt: wohin?`, true);
        });

        const pickTarget = g => {
          if (busy) return;
          const k = g.dataset.t;
          if (!sel) { say('Tippe zuerst auf einen Gegenstand unten.'); return; }
          const okObj = sel === ok, okT = k === t || (p === 'zwischen' && k === t2);
          if (!okObj || !okT) {
            moveOk = false; perfect = false; api.vibrate();
            g.classList.add('is-wrong'); setTimeout(() => g.classList.remove('is-wrong'), 700);
            say(!okObj ? `Das ist ${OBJ[sel].g} ${sel}. Lies die Aufgabe noch einmal.` : `Das ist ${k === 'Wand' ? 'die Wand' : TG[k].g + ' ' + TG[k].n}. Lies die Aufgabe noch einmal.`);
            return;
          }
          busy = true;
          place(task);
          svg.classList.remove('sp-wowohin-armed');
          api.el.querySelectorAll('.sp-wowohin-t').forEach(x => { x.removeAttribute('tabindex'); x.style.cursor = 'default'; });
          $('.sp-wowohin-tray').remove();
          $('.sp-wowohin-hint').remove();
          $('.sp-wowohin-task').outerHTML = `<p class="sp-wowohin-done">✓ ${api.esc(ok)} → ${api.esc(p === 'zwischen' ? TG[t].n + ' / ' + TG[t2].n : TG[t].n)}${moveOk ? '' : ' (nicht im ersten Versuch)'}</p>`;
          say('');
          sentence('Wohin?', `Ich ${V.ich} ${objNP(O, 'Akk')}`, 'Akk', () =>
            sentence('Wo?', `Jetzt ${V.er} ${objNP(O, 'Nom')}`, 'Dat', end));
        };
        api.el.querySelectorAll('.sp-wowohin-t').forEach(g => {
          g.addEventListener('click', () => pickTarget(g));
          g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); pickTarget(g); } });
        });

        function place([, o, pp, tt, tt2]) {
          const key = pp === 'zwischen' ? `${tt}+${tt2}` : `${tt}.${pp}`, [x, y, layer] = POS[key] || [220, 120];
          const NS = 'http://www.w3.org/2000/svg', g = document.createElementNS(NS, 'g');
          g.setAttribute('class', 'sp-wowohin-placed');
          g.innerHTML = (layer === 'i' ? `<rect x="${x - 21}" y="${y - 20}" width="42" height="40" rx="6" fill="#fffbe9" stroke="#00000022"/>` : '') + glyph(OBJ[o], x, y);
          g.setAttribute('aria-label', `${OBJ[o].g} ${o}`);
          const tg = svg.querySelector(`[data-t="${tt}"]`);
          if (layer === 'b') svg.insertBefore(g, tg); else svg.appendChild(g);
          tg.classList.add('is-right');
        }

        function sentence(q, pre, c, done) {
          const box = document.createElement('div');
          box.className = 'sp-wowohin-step';
          const { right, opts } = options(task, c, api.shuffle);
          box.innerHTML = `<p class="ch-label">${q}</p><p class="ch-q">${api.esc(pre)} <span class="ch-gap">____</span>.</p>
            <div class="ch-opts sp-wowohin-opts">${opts.map(([s], j) => `<button type="button" class="ch-opt" data-k="${j}" data-s="${api.esc(s)}"><kbd>${j + 1}</kbd>${api.esc(s)}</button>`).join('')}</div>`;
          $('.sp-wowohin-sent').appendChild(box);
          const first = box.querySelector('.ch-opt');
          first.focus({ preventScroll: true });
          box.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          box.querySelectorAll('.ch-opt').forEach(b => b.onclick = () => {
            const s = b.dataset.s, kind = new Map(opts).get(s), good = s === right || kind === 'long';
            if (!good) { perfect = false; api.vibrate(); }
            const gap = box.querySelector('.ch-gap');
            gap.textContent = s; gap.classList.add('is-filled', good ? 'is-r' : 'is-w');
            if (kind === 'long') { const tip = document.createElement('span'); tip.className = 'sp-wowohin-fix'; tip.textContent = `Richtig! Meist sagt man kürzer: ${pre} ${right}. (${CONTR[raw(p, c, t)]} = ${raw(p, c, t)})`; box.appendChild(tip); }
            box.querySelector('.ch-opts').remove();
            if (!good) {
              const fix = document.createElement('span');
              fix.className = 'sp-wowohin-fix';
              fix.textContent = kind === 'long' ? `Fast! Man sagt hier: ${pre} ${right}. (${CONTR[raw(p, c, t)]} = ${raw(p, c, t)})` : `Richtig: ${pre} ${right}.`;
              box.appendChild(fix);
            }
            done();
          });
        }

        function end() {
          if (perfect) score++;
          api.hud({ score, progress: (i + 1) / N });
          const contr = [raw(p, 'Akk', t), raw(p, 'Dat', t)].filter(r => p !== 'zwischen' && CONTR[r]).map(r => `${r} → ${CONTR[r]}`);
          const tip = `Wohin? → Akkusativ: ${akk}. Wo? → Dativ: ${dat}.`;
          const full = `Ich ${V.ich} ${objNP(O, 'Akk')} ${akk}. – Jetzt ${V.er} ${objNP(O, 'Nom')} ${dat}.`;
          if (!perfect) wrong.push({ correct: full, tip });
          api.feedback(perfect, `<b>${perfect ? 'Super, alles richtig!' : 'Nicht ganz – merk dir:'}</b>
            <span>💡 ${api.esc(tip)}${contr.length ? ' Kurzform: ' + api.esc(contr.join(', ')) + '.' : ''}</span>
            <span>${api.esc(V.pair)}</span>`);
          i++;
          api.next(i < N ? 'Nächste Runde' : 'Ergebnis', () => i < N ? round() : api.finish({ score, max: N, wrong }));
        }
      }
      round();
    }
  });
})();
