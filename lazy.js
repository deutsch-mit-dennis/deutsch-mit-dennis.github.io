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
    "erste-schritte.js?v=20261117y"
  ],
  "bild": [
    "bild-data.js?v=20261008e",
    "bild.js?v=20261113q"
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
    "muster-data.js?v=20261111s"
  ],
  "fakten": [
    "pruefung-fakten.js?v=20261117z"
  ],
  "b230": [
    "b2-30.js?v=20261113g2"
  ],
  "b2t": [
    "sprachbausteine-data.js?v=20261117y",
    "telc-b2-sprechen-data.js?v=20261117y",
    "b2-training.js?v=20261117z"
  ],
  "b130": [
    "b1-30.js?v=20261117w"
  ],
  "wcore": [
    "b2-woerter.js?v=20261117w"
  ],
  "wb2": [
    "b2-woerter-data.js?v=20261117w"
  ],
  "wb1": [
    "b1-woerter-data.js?v=20261117w"
  ],
  "wdtz": [
    "dtz-woerter-data.js?v=20261117w"
  ],
  "wa1": [
    "a1-woerter-data.js?v=20261117w"
  ]
};
  const NEED = { spiele: ['spiele'], hoeren: ['hoeren'], lesen: ['lesen'], pruefung: ['hoeren', 'lesen'], training: ['hoeren', 'lesen'], bild: ['bild'], 'erste-schritte': ['erste'], niveau: ['erste', 'hoeren', 'lesen'], grammatik: ['grammatik'], laute: ['laute'], lid: ['lidx'], simulation: ['lidx', 'muster'], ueben: ['muster'], pruefungsinfo: ['fakten'], 'b2-30-tage': ['b230'], 'b1-30-tage': ['b130'], 'b2-woerter': ['wb2', 'wcore'], 'b1-woerter': ['wb1', 'wcore'], 'dtz-woerter': ['wdtz', 'wcore'], 'a1-woerter': ['wa1', 'wcore'], sprachbausteine: ['b2t'], 'telc-b2-sprechen': ['b2t'] };
  const done = {}, busy = {};
  const one = src => new Promise(res => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = s.onerror = () => res(); document.head.appendChild(s); });
  const group = g => busy[g] || (busy[g] = GROUPS[g].reduce((p, src) => p.then(() => one(src)), Promise.resolve()).then(() => { done[g] = true; }));
  return {
    ready: route => (NEED[route] || []).every(g => done[g]),
    load: route => Promise.all((NEED[route] || []).map(group)),
  };
})();
