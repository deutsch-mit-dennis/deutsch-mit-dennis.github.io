/* Loads page-specific scripts only when a page needs them (the start page stays light).
   GROUPS: script files in their original order. NEED: route (first part of #hash) -> groups.
   The router in site.js waits for DMLazy.load(route) before it builds such a page.
   New game in spiele/? Add it to GROUPS.spiele (not to index.html).
   Moved here from index.html (2026-11-22, start page lighter): simulation.js, lid-trainer.js, witz.js, mikula.js,
   mikula-buch.js, dtz30.js, lieder-data.js – bump their ?v= numbers HERE, not in index.html. */
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
    "spiele/b2.js?v=20261122a",
    "spiele/beruf.js?v=20261103b",
    "spiele/alltag.js?v=20261027a",
    "spiele/nid.js?v=20261118b",
    "spiele/mikula.js?v=20261107e",
    "spiele/endungen.js?v=20261118a",
    "spiele/satzbau.js?v=20261118a",
    "berufe-data.js?v=20261126b",
    "spiele/berufe-a1.js?v=20261126c",
    "spiele/uhrzeit.js?v=20261118a",
    "spiele/planen.js?v=20261118a",
    "spiele/tagesmix.js?v=20261122a",
    "spiele/lid-spiele.js?v=20261107e",
    "spiele/lino-extra.js?v=20261122a",
    "spiele/lino.js?v=20261107e"
  ],
  "hoeren": [
    "hoeren-data.js?v=20261122a"
  ],
  "lesen": [
    "lesen-data.js?v=20261111m"
  ],
  "erste": [
    "erste-schritte-data.js?v=20261126a",
    "erste-schritte.js?v=20261126a"
  ],
  "bild": [
    "bild-data.js?v=20261008e",
    "bild.js?v=20261113q"
  ],
  "grammatik": [
    "grammatik-data.js?v=20261124c",
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
    "pruefung-fakten.js?v=20261125b"
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
    "b2-woerter.js?v=20261124c"
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
  ],
  "sim": [
    "simulation.js?v=20261125a"
  ],
  "lidt": [
    "lid-trainer.js?v=20261118c"
  ],
  "witz": [
    "witz.js?v=20261122s"
  ],
  "mikula": [
    "mikula.js?v=20261107a"
  ],
  "mikulab": [
    "mikula-buch.js?v=20261107d"
  ],
  "d30": [
    "dtz30.js?v=20261112a"
  ],
  "lieder": [
    "lieder-data.js?v=20261112a"
  ],
  "diktat": [
    "diktat-data.js?v=20261124c",
    "diktat.js?v=20261124c"
  ],
  "verben": [
    "verben-data.js?v=20261124c",
    "verbliste.js?v=20261124c"
  ],
  "suche": [
    "suche.js?v=20261124c"
  ],
  "berufe": [
    "berufe-data.js?v=20261126b",
    "berufe.js?v=20261126a"
  ]
};
  const NEED = { spiele: ['spiele'], hoeren: ['hoeren'], lesen: ['lesen'], pruefung: ['hoeren', 'lesen'], training: ['hoeren', 'lesen'], bild: ['bild'], 'erste-schritte': ['erste'], niveau: ['erste', 'hoeren', 'lesen'], grammatik: ['grammatik'], laute: ['laute'], lid: ['lidx', 'lidt'], simulation: ['lidx', 'muster', 'lidt', 'sim'], vorbereitung: ['lidx', 'muster', 'lidt', 'sim'], ueben: ['muster'], pruefungsinfo: ['fakten'], 'b2-30-tage': ['b230'], 'b1-30-tage': ['b130'], 'b2-woerter': ['wb2', 'wcore'], 'b1-woerter': ['wb1', 'wcore'], 'dtz-woerter': ['wdtz', 'wcore'], 'a1-woerter': ['wa1', 'wcore'], sprachbausteine: ['b2t'], 'telc-b2-sprechen': ['b2t'], witz: ['witz'], mikula: ['mikula'], 'mikula-buch': ['mikulab'], 'dtz-30-tage': ['d30'], lieder: ['lieder'], diktat: ['diktat'], verben: ['verben'], suche: ['suche'], berufe: ['berufe'] };
  const done = {}, busy = {}, loaded = {};
  const one = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = () => res(); s.onerror = () => { s.remove(); rej(new Error('not loaded: ' + src)); }; document.head.appendChild(s); });
  const group = g => busy[g] || (busy[g] = GROUPS[g].reduce((p, src) => p.then(() => loaded[src] || one(src).then(() => { loaded[src] = true; })), Promise.resolve()).then(() => { done[g] = true; }, e => { delete busy[g]; throw e; }));
  return {
    ready: route => (NEED[route] || []).every(g => done[g]),
    load: route => Promise.all((NEED[route] || []).map(group)),
    group,
  };
})();
