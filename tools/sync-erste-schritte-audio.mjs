// Adds every word card and sentence of "Erste Schritte" (erste-schritte-data.js) to tools/tts/manifest.json.
// Keys: es-<topic>-<n> (cards) and es-<topic>-s<n> (sentences) – the same keys erste-schritte.js plays.
// A changed text replaces the entry, so audio.yml records it again. Run: node tools/sync-erste-schritte-audio.mjs
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(await readFile(new URL('erste-schritte-data.js', root), 'utf8'), ctx);
const ES = ctx.window.DM.ersteSchritte;
const file = new URL('tools/tts/manifest.json', root);
const man = JSON.parse(await readFile(file, 'utf8'));
const idx = new Map(man.entries.map((e, i) => [e.key, i]));
let added = 0, changed = 0;
const put = (key, voice, text) => {
  const entry = { key, segments: [{ voice, text }] };
  if (!idx.has(key)) { idx.set(key, man.entries.push(entry) - 1); added++; return; }
  const old = man.entries[idx.get(key)];
  if (JSON.stringify(old.segments) !== JSON.stringify(entry.segments)) { man.entries[idx.get(key)] = entry; changed++; }
};
for (const t of ES.topics) {
  t.items.forEach((it, i) => put(`es-${t.id}-${i}`, 'f1', (it.say || (it.art ? `${it.art} ${it.w}` : it.w)).replace(' · ', ', ')));
  // dialogues: two voices take turns
  t.sentences.forEach(([s, say], i) => put(`es-${t.id}-s${i}`, i % 2 ? 'm1' : 'f2', say || s));
}
await writeFile(file, JSON.stringify(man, null, 1) + '\n');
console.log(`manifest: ${added} neu, ${changed} geändert, ${man.entries.length} gesamt`);
