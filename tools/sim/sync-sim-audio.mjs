// Trägt alle Hörtexte und Gesprächsimpulse der Prüfungssimulationen (sim/*.js) in tools/tts/manifest.json ein.
// Danach erzeugt der Workflow „Hörtexte vertonen“ die MP3s; simulation.js spielt sie automatisch ab.
// Aufruf: node tools/sim/sync-sim-audio.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
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
// prio 0 = Prüfungs-Hörtexte werden vor den kurzen Spielsätzen vertont
// ord = Reihenfolge der Vertonung: eine Prüfung nach der anderen, jeweils in Prüfungsreihenfolge
const EXAM_ORDER = ['dtz', 'dtb-b1', 'telc-b1', 'dtb-b2', 'telc-b2'];
let ord = 0;
const add = (key, segments, fx) => {
  ord++;
  const old = man.entries.find(e => e.key === key);
  if (old) { if (old.prio !== 0 || old.ord !== ord) { old.prio = 0; old.ord = ord; n++; } return; }
  man.entries.push({ key, prio: 0, ord, segments, ...(fx ? { fx } : {}) }); have.add(key); n++;
};
const walkPart = p => {
  for (const a of p.audio || []) {
    // aufeinanderfolgende Zeilen derselben Stimme zusammenfassen
    const segs = [];
    for (const l of a.lines) { const v = VOICE[l.s] || 'f1'; if (segs.length && segs[segs.length - 1].voice === v) segs[segs.length - 1].text += ' ' + l.t; else segs.push({ voice: v, text: l.t }); }
    add(fnv(a.lines.map(l => l.t).join(' ')), segs, PHONE.test(a.h || '') && a.lines.length <= 2 ? 'telefon' : null);
  }
  for (const t of p.prompts || []) add(fnv(t), [{ voice: 'f2', text: t }]);
};
const exams = Object.values(ctx.window.SIM || {}).sort((a, b) => (EXAM_ORDER.indexOf(a.id) + 99) % 99 - (EXAM_ORDER.indexOf(b.id) + 99) % 99);
for (const ex of exams) {
  ex.sections.forEach(s => s.parts.forEach(walkPart));
  (ex.prep?.parts || []).forEach(q => q.mini && walkPart(q.mini));
}
writeFileSync(mp, JSON.stringify(man, null, 1) + '\n');
console.log(n, 'neue Einträge,', man.entries.length, 'gesamt');
