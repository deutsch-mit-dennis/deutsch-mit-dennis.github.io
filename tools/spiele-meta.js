// Prints the metadata of all learning games (spiele/*.js, DMGame.register) as JSON – used by tools/make-share-pages.py
// for the static pages /spiele/<id>/. Runs the game files with stubbed browser objects; start() is never called.
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = path.join(__dirname, '..');
const games = [];
const stub = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : stub), apply: () => stub, construct: () => stub, set: () => true });
const win = { DMGame: { register: g => games.push(g), list: () => games }, DMKit: stub, DMArcade: stub, DM: {}, addEventListener() {}, matchMedia: () => ({ matches: false, addEventListener() {} }) };
const ctx = { window: win, document: stub, DMGame: win.DMGame, DMKit: stub, DMArcade: stub, navigator: {}, localStorage: { getItem: () => null, setItem() {} }, console: { log() {}, warn() {}, error() {} },
  Math, JSON, Object, Array, String, Number, Set, Map, Date, RegExp, Promise, setTimeout() {}, clearTimeout() {}, requestAnimationFrame() {}, performance: { now: () => 0 } };
ctx.globalThis = ctx; ctx.self = win; win.window = win;
vm.createContext(ctx);
// same order as lazy.js (helpers first)
const order = [...fs.readFileSync(path.join(R, 'lazy.js'), 'utf8').matchAll(/"(spiele\/[\w-]+\.js)\?v=/g)].map(m => m[1]);
for (const f of order) {
  try { vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f }); } catch (e) { process.stderr.write(`${f}: ${e.message}\n`); }
}
const pick = g => ({ id: g.id, title: g.title, icon: g.icon, level: g.level || '', cat: g.cat || 'basis', desc: g.desc || '', intro: g.intro || '', options: (g.options || []).map(o => o.label) });
process.stdout.write(JSON.stringify(games.map(pick)));
