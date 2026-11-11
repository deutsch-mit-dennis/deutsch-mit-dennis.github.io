/* Loads page-specific scripts only when a page needs them (the start page stays light).
   GROUPS: script files in their original order. NEED: route (first part of #hash) -> groups.
   The router in site.js waits for DMLazy.load(route) before it builds such a page.
   New game in spiele/? Add it to GROUPS.spiele (not to index.html). */
window.DMLazy = (() => {
  const GROUPS = {
  "spiele": [
    "spiele/zahlen.js?v=20261008e",
    "spiele/wowohin.js?v=20261028a",
    "spiele/dialog.js?v=20261008e",
    "spiele/brief.js?v=20261008e",
    "spiele/verben.js?v=20261008e",
    "spiele/artikel.js?v=20261111m",
    "spiele/memory.js?v=20261111m",
    "spiele/kit.js?v=20261014d",
    "spiele/arcade.js?v=20261028f",
    "spiele/b2.js?v=20261027b",
    "spiele/beruf.js?v=20261103b",
    "spiele/alltag.js?v=20261027a",
    "spiele/nid.js?v=20261101a",
    "spiele/mikula.js?v=20261107e",
    "spiele/lid-spiele.js?v=20261107e",
    "spiele/lino-extra.js?v=20261019c",
    "spiele/lino.js?v=20261107e"
  ],
  "hoeren": [
    "hoeren-data.js?v=20261111n"
  ],
  "lesen": [
    "lesen-data.js?v=20261111m"
  ],
  "erste": [
    "erste-schritte-data.js?v=20261111n",
    "erste-schritte.js?v=20261111m"
  ],
  "bild": [
    "bild-data.js?v=20261008e",
    "bild.js?v=20261008e"
  ],
  "grammatik": [
    "grammatik-data.js?v=20261111n",
    "grammatik.js?v=20261111m"
  ],
  "laute": [
    "laute.js?v=20261111n"
  ],
  "lidx": [
    "lid-laender.js?v=20261111m",
    "lid-warum.js?v=20261111m"
  ],
  "muster": [
    "muster-data.js?v=20261111p"
  ],
  "fakten": [
    "pruefung-fakten.js?v=20261111p"
  ]
};
  const NEED = { spiele: ['spiele'], hoeren: ['hoeren'], lesen: ['lesen'], pruefung: ['hoeren', 'lesen'], training: ['hoeren', 'lesen'], bild: ['bild'], 'erste-schritte': ['erste'], niveau: ['erste', 'hoeren', 'lesen'], grammatik: ['grammatik'], laute: ['laute'], lid: ['lidx'], simulation: ['lidx', 'muster'], ueben: ['muster'], pruefungsinfo: ['fakten'] };
  const done = {}, busy = {};
  const one = src => new Promise(res => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = s.onerror = () => res(); document.head.appendChild(s); });
  const group = g => busy[g] || (busy[g] = GROUPS[g].reduce((p, src) => p.then(() => one(src)), Promise.resolve()).then(() => { done[g] = true; }));
  return {
    ready: route => (NEED[route] || []).every(g => done[g]),
    load: route => Promise.all((NEED[route] || []).map(group)),
  };
})();
