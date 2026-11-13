// Adds the B2 speaking tasks (model answers + replies, DM.extraScenes.B2 titled "telc B2 ·"/"DTB B2 ·")
// and the B2 flashcards (b2-woerter-data.js, front + back exactly as b2-woerter.js speaks them)
// to tools/tts/manifest.json. Keys = fnv(text), the same keys DM.speak plays. Run: node tools/sync-b2-audio.mjs
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const norm = s => String(s ?? '').replace(/\s+/g, ' ').trim();
const fnv = s => { let h = 0x811c9dc5; for (const b of Buffer.from(norm(s), 'utf8')) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return 't' + h.toString(16).padStart(8, '0'); };
const ctx = { window: {} }; ctx.window.DM = {}; ctx.DM = ctx.window.DM; vm.createContext(ctx);
for (const f of ['site-data.js', 'b2-woerter-data.js']) { try { vm.runInContext(await readFile(new URL(f, root), 'utf8'), ctx); } catch (e) { if (f !== 'site-data.js') throw e; } }
const DM = ctx.window.DM;
const plain = (s, hideVerb) => String(s).replace(/<v>.*?<\/v>/g, hideVerb ? '…' : m => m).replace(/<\/?[nv]>/g, '');
const items = []; // [text, voice, prio]
for (const s of (DM.extraScenes?.B2 || []).filter(s => /^(telc|DTB) B2 ·/.test(s.title))) {
  items.push([s.model.replace(/\n/g, ' '), 'f2', 0]);
  if (s.reply) items.push([s.reply, 'm1', 1]);
}
for (const t of DM.b2Woerter.themes) for (const w of t.words) {
  items.push([`${plain(w.w)}. ${w.b}`, 'f1', 2]);
  items.push([plain(w.k === 'F' ? w.w : w.q || w.w, true).replace(/…/g, ''), 'f1', 3]);
}
const file = new URL('tools/tts/manifest.json', root);
const man = JSON.parse(await readFile(file, 'utf8'));
const have = new Set(man.entries.map(e => e.key));
let ord = Math.max(0, ...man.entries.map(e => e.ord || 0)), n = 0;
for (const [text, voice, prio] of items) {
  const key = fnv(text); if (!norm(text) || have.has(key)) continue;
  man.entries.push({ key, prio, ord: ++ord, segments: [{ voice, text: norm(text) }] }); have.add(key); n++;
}
await writeFile(file, JSON.stringify(man, null, 1) + '\n');
console.log(`${n} neue Einträge, ${man.entries.length} gesamt`);
