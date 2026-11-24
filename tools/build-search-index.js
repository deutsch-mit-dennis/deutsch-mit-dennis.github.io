// Builds such-index.json for the site search (#suche): all readable pages (title + description), worksheets (PDF), words and verbs.
// Runs at the end of tools/build-sitemap.js (so also in the workflow "Seiten aktualisieren"). Run alone: node tools/build-search-index.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const un = s => String(s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const cut = (s, n) => s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + ' …';

const c = { console: { log() {} } };
c.window = c; c.DM = {}; vm.createContext(c);
for (const f of ['site-data.js', 'b2-woerter-data.js', 'b1-woerter-data.js', 'dtz-woerter-data.js', 'a1-woerter-data.js', 'verben-data.js']) vm.runInContext(read(f), c, { filename: f });
const DM = c.DM;

// readable pages that have a richer twin inside the app: link straight to the app route
const APP = [[/^grammatik\/([\w-]+)$/, '#grammatik/$1'], [/^lektion\/([\w-]+)$/, '#lektion/$1'], [/^spiele\/([\w-]+)$/, '#spiele/$1'], [/^simulation\/([\w-]+)$/, '#simulation/$1'], [/^lieder\/([a-z]\d-\d\d-[\w-]+)$/, '#lieder/$1'], [/^hoeren\/([\w-]+)$/, '#hoeren/$1'], [/^lesen\/([\w-]+)$/, '#lesen/$1'], [/^pruefungsinfo\/([\w-]+)$/, '#pruefungsinfo/$1'], [/^vorbereitung\/([\w-]+)$/, '#vorbereitung/$1'], [/^lernpakete\/([\w-]+)$/, '#lernpakete/$1'],
  [/^kurs\/(\w\d)$/, (_, l) => '#kurs/' + l.toUpperCase()], [/^niveau\/(\w\d)$/, (_, l) => '#niveau/' + l.toUpperCase()], [/^material\/(\w\d)$/, (_, l) => '#material/alle/' + l.toUpperCase()],
  [/^(kurs|grammatik|spiele|simulation|lieder|hoeren|lesen|pruefungsinfo|vorbereitung|lernpakete|material|ueben|lid|pruefung|bild|challenge|laute|kahoot|videos|witz|mikula|ueber-mich|diktat|verben|[ab]\d-woerter|dtz-woerter|[ab]\d-30-tage|dtz-30-tage|sprachbausteine|telc-b2-sprechen)$/, '#$1'],
  [/^einstufungstest$/, '#einstufung'], [/^lektionen$/, '#lernen'], [/^fehlerheft$/, '#fehler']];
const url = p => { for (const [re, to] of APP) if (re.test(p)) return p.replace(re, to); return '/' + p + '/'; };
const KIND = { niveau: 'kurs', 'dtz-schreiben': 'brief', pruefungsinfo: 'pruefung', vorbereitung: 'pruefung', lernpakete: 'pruefung', diktat: 'ueben', verben: 'ueben', laute: 'ueben', bild: 'ueben', fehlerheft: 'ueben', einstufungstest: 'kurs', lektionen: 'lektion' };
const kind = p => { const k = p.split('/')[0]; return /woerter$/.test(k) ? 'wort' : /30-tage$/.test(k) ? 'pruefung' : KIND[k] || k; };

const pages = [], seen = new Set();
for (const loc of read('sitemap.xml').match(/<loc>[^<]+/g)) {
  const p = decodeURIComponent(loc.slice(5).replace(/^https?:\/\/[^/]+\//, '')).replace(/\/$/, '');
  if (!p || /\.pdf$/i.test(p) || /^(impressum|datenschutz)$/.test(p) || !fs.existsSync(path.join(ROOT, p, 'index.html'))) continue;
  const h = read(p + '/index.html').slice(0, 12000);
  const t = un((h.match(/<title>([^<]*)/) || [])[1]).replace(/\s+[–|·-]\s+Deutsch mit Dennis$/, ''), d = un((h.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const u = url(p);
  if (!t || seen.has(u)) continue;
  seen.add(u);
  pages.push([t, cut(d, 120), u, kind(p)]);
}
for (const m of DM.materials || []) if (fs.existsSync(path.join(ROOT, m.file))) pages.push([m.title, cut(`${m.level} · ${m.desc}${m.topics ? ' ' + m.topics.join(', ') : ''}`, 150), m.file, 'material']);
for (const e of [['Diktat üben A1–B2', 'Satz hören und schreiben, mit sofortiger Kontrolle.', '#diktat', 'ueben'], ['Unregelmäßige Verben: Liste und Quiz', 'Präsens, Präteritum, Perfekt und Beispielsatz.', '#verben', 'ueben'], ['Einstufungstest', 'In 5 Minuten dein Niveau finden.', '#einstufung', 'kurs'], ['Mein Kurs A0–B2', 'Schritt für Schritt Deutsch lernen.', '#kurs', 'kurs']]) if (!seen.has(e[2])) pages.push(e);
for (const [, id, level, title] of read('grammatik-data.js').matchAll(/\n\s+id: "([\w-]+)",\s+level: "(\w\d)",\s+title: "([^"]+)"/g)) if (!seen.has('#grammatik/' + id)) pages.push([title, `Grammatik ${level}: Regel und Übungen`, '#grammatik/' + id, 'grammatik']);
pages.push(['Meine Wörter – dein Wörterheft', 'Wörter merken und mit Karten wiederholen.', '#meine-woerter', 'ueben'], ['Lernstand sichern', 'Deinen Fortschritt speichern und auf ein anderes Gerät mitnehmen.', '#lernstand', 'seite'], ['Schreib-Bausteine', 'Anrede, Gruß, Redemittel für Nachrichten, Briefe und E-Mails.', '#schreiben', 'ueben']);
const words = [], ws = new Set();
const add = (w, f, b) => { w = w.replace(/<\/?[a-z]+>/g, ''); if (!ws.has(w)) { ws.add(w); words.push([w, String(f || '').replace(/<\/?[a-z]+>/g, ''), b]); } };
for (const W of [DM.woerter.a1, DM.woerter.dtz, DM.woerter.b1, DM.b2Woerter]) for (const t of W.themes) for (const w of t.words) add(w.w, w.f, w.b);
for (const v of DM.verben) { const i = words.findIndex(w => w[0] === v.inf); if (i >= 0) { words.splice(i, 1); ws.delete(v.inf); } add(v.inf, `${v.pr} – ${v.prt} – ${v.perf}`, v.ex); }
const out = JSON.stringify({ p: pages, w: words });
fs.writeFileSync(path.join(ROOT, 'such-index.json'), out);
console.log(`such-index.json: ${pages.length} pages, ${words.length} words, ${Math.round(Buffer.byteLength(out) / 1024)} KB`);
