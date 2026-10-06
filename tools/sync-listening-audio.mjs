// Ergänzt tools/tts/manifest.json um alle Hörtexte aus hoeren-data.js (DM.listeningExam).
// Bestehende Einträge bleiben unverändert. Zahlen/Uhrzeiten bitte im Segment-Feld "say" ausschreiben (z. B. "neun Uhr dreißig").
// Danach erzeugt der Workflow "audio.yml" beim Push automatisch die MP3-Dateien.
// Aufruf: node tools/sync-listening-audio.mjs
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(await readFile(new URL('hoeren-data.js', root), 'utf8'), ctx);
const exam = ctx.window.DM.listeningExam || {};
const file = new URL('tools/tts/manifest.json', root);
const man = JSON.parse(await readFile(file, 'utf8'));
const have = new Map(man.entries.map((e, i) => [e.key, i]));
let added = 0;
for (const set of Object.values(exam)) for (const it of set.items) {
  const segs = (it.segments && it.segments.length ? it.segments : [{ voice: 'f1', text: it.text }]).map(s => s.say ? { voice: s.voice, text: s.text, say: s.say } : { voice: s.voice, text: s.text });
  const entry = { key: it.id, segments: segs };
  if (!have.has(it.id)) { man.entries.push(entry); added++; }
}
await writeFile(file, JSON.stringify(man, null, 1) + '\n');
console.log(`manifest: ${added} neue Hörtexte, ${man.entries.length} gesamt`);
