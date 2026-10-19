// Trägt alle Hörtexte und Gesprächsimpulse der Prüfungssimulationen (sim/*.js) in tools/tts/manifest.json ein.
// Danach erzeugt der Workflow „Hörtexte vertonen“ die MP3s; simulation.js spielt sie automatisch ab.
// Aufruf: node tools/sim/sync-sim-audio.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const R = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const norm = s => String(s ?? '').replace(/\s+/g, ' ').trim();
const fnv = s => { let h = 0x811c9dc5; for (const b of Buffer.from(norm(s), 'utf8')) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return 't' + h.toString(16).padStart(8, '0'); };
const VOICE = { n: 'f1', f: 'f2', f2: 'f3', m: 'm1', m2: 'm2' };
const PHONE = /anrufbeantworter|mailbox|telefonansage|ansage am telefon|nachricht auf|anruf/i;

const ctx = { window: {} }; vm.createContext(ctx);
for (const f of readdirSync(path.join(R, 'sim')).filter(f => f.endsWith('.js')).sort()) vm.runInContext(readFileSync(path.join(R, 'sim', f), 'utf8'), ctx);
const mp = path.join(R, 'tools', 'tts', 'manifest.json');
const man = JSON.parse(readFileSync(mp, 'utf8'));
const have = new Set(man.entries.map(e => e.key));
let n = 0;
const add = (key, segments, fx) => { if (have.has(key)) return; man.entries.push({ key, segments, ...(fx ? { fx } : {}) }); have.add(key); n++; };
const walkPart = p => {
  for (const a of p.audio || []) {
    // aufeinanderfolgende Zeilen derselben Stimme zusammenfassen
    const segs = [];
    for (const l of a.lines) { const v = VOICE[l.s] || 'f1'; if (segs.length && segs[segs.length - 1].voice === v) segs[segs.length - 1].text += ' ' + l.t; else segs.push({ voice: v, text: l.t }); }
    add(fnv(a.lines.map(l => l.t).join(' ')), segs, PHONE.test(a.h || '') && a.lines.length <= 2 ? 'telefon' : null);
  }
  for (const t of p.prompts || []) add(fnv(t), [{ voice: 'f2', text: t }]);
};
for (const ex of Object.values(ctx.window.SIM || {})) {
  ex.sections.forEach(s => s.parts.forEach(walkPart));
  (ex.prep?.parts || []).forEach(q => q.mini && walkPart(q.mini));
}
writeFileSync(mp, JSON.stringify(man, null, 1) + '\n');
console.log(n, 'neue Einträge,', man.entries.length, 'gesamt');
