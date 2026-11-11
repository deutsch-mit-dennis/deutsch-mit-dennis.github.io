// node validate.js  – checks grammatik-data.js
global.window = {};
const T = require('/home/user/deutsch-mit-dennis.github.io/grammatik-data.js');
const IDS = ['a1-praesens','a1-haben-sein','a1-plural','a1-trennbare-verben','a1-modalverben','a1-imperativ','a1-lokale-praepositionen','a1-konnektoren','a2-praeteritum-war-hatte','a2-dass-wenn','a2-komparativ','a2-reflexive-verben','a2-praepositionen-dativ-akkusativ','a2-adjektivendungen','b1-konjunktiv2','b1-passiv','b1-praeteritum','b1-genitiv','b2-indirekte-rede','b2-nominalisierung','b2-passiv-modalverb','b2-partizipialattribute'];
const LANGS = ['en','uk','ru','ar','fa','tr','es','it'];
const err = []; const E = (id, m) => err.push(id + ': ' + m);
const ids = T.map(t => t.id);
if (JSON.stringify(ids) !== JSON.stringify(IDS)) E('ids', 'mismatch: ' + ids.filter(i => !IDS.includes(i)) + ' missing: ' + IDS.filter(i => !ids.includes(i)));
const seenQ = new Map();
for (const t of T) {
  const id = t.id;
  if (t.level !== id.slice(0, 2).toUpperCase()) E(id, 'level');
  for (const k of ['title', 'kurz']) if (!t[k] || typeof t[k] !== 'string') E(id, 'missing ' + k);
  for (const l of LANGS) if (!t.kurz_i18n || !t.kurz_i18n[l] || t.kurz_i18n[l].length < 20) E(id, 'kurz_i18n.' + l);
  if (Object.keys(t.kurz_i18n || {}).length !== 8) E(id, 'kurz_i18n keys');
  if (!(t.beispiele.length >= 4 && t.beispiele.length <= 6)) E(id, 'beispiele count ' + t.beispiele.length);
  t.beispiele.forEach(b => { if (!/\*[^*]+\*/.test(b)) E(id, 'beispiel without mark: ' + b); if ((b.match(/\*/g) || []).length % 2) E(id, 'odd asterisks: ' + b); });
  if (!(t.fehler.length >= 2 && t.fehler.length <= 3)) E(id, 'fehler count');
  t.fehler.forEach(f => { if (f.length !== 3 || f.some(x => !x) || f[0] === f[1]) E(id, 'fehler entry ' + f[0]); });
  if (t.tabelle) t.tabelle.rows.forEach(r => { if (r.length !== t.tabelle.head.length) E(id, 'table row width ' + r[0]); });
  const all = JSON.stringify(t); if ((t.kurz.match(/\*/g) || []).length % 2) E(id, 'odd asterisks in kurz');
  if (!(t.items.length >= 16 && t.items.length <= 20)) E(id, 'item count ' + t.items.length);
  const types = {};
  t.items.forEach((it, i) => {
    const w = `${id}#${i}`; types[it.t] = (types[it.t] || 0) + 1;
    if (!it.why || it.why.length < 8) E(w, 'why');
    if (/\*/.test(JSON.stringify(it))) E(w, 'asterisk in item');
    if (it.t === 'mc') {
      if (!Array.isArray(it.opts) || it.opts.length !== 3) E(w, 'mc needs 3 options');
      if (new Set(it.opts.map(o => o.trim().toLowerCase())).size !== it.opts.length) E(w, 'duplicate options');
      if (!(Number.isInteger(it.a) && it.a >= 0 && it.a < it.opts.length)) E(w, 'mc answer index');
      if (!it.q) E(w, 'q');
    } else if (it.t === 'gap') {
      if (!Array.isArray(it.a) || !it.a.length || it.a.some(a => !a || !a.trim())) E(w, 'gap answers');
      if ((it.q.match(/___/g) || []).length !== 1) E(w, 'gap needs exactly one ___');
      if (new Set(it.a).size !== it.a.length) E(w, 'gap duplicate answers');
    } else if (it.t === 'order') {
      if (it.words.join(' ') !== it.sol) E(w, 'order words do not rebuild sol');
      if (it.words.length < 3) E(w, 'order too short');
      if (!/[.!?]$/.test(it.sol)) E(w, 'order sol punctuation');
      (it.alt || []).forEach(a => { // alt must be a permutation of the chips
        const perm = (arr, s) => s === '' ? arr.length === 0 : arr.some((x, k) => (s === x || s.startsWith(x + ' ')) && perm(arr.filter((_, j) => j !== k), s.slice(x.length).trim()));
        if (!perm(it.words, a)) E(w, 'alt not buildable: ' + a);
      });
    } else if (it.t === 'fix') {
      if (!it.good || !it.bad || it.good === it.bad) E(w, 'fix');
    } else E(w, 'unknown type ' + it.t);
    const key = it.q || it.sol || it.good; if (seenQ.has(key)) E(w, 'duplicate prompt with ' + seenQ.get(key)); seenQ.set(key, w);
  });
  for (const k of ['mc', 'gap', 'order', 'fix']) if (!types[k]) E(id, 'no item of type ' + k);
  console.log(id.padEnd(36), String(t.items.length).padStart(2), JSON.stringify(types));
}
console.log('topics', T.length, 'items', T.reduce((n, t) => n + t.items.length, 0));
if (err.length) { console.log('\nERRORS:\n' + err.join('\n')); process.exit(1); } else console.log('OK');
