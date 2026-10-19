// Sammelt die Sätze, die Lernspiele zur Laufzeit vorlesen, und schreibt sie nach spiele/tts-<spiel>.json.
// Danach: python3 tools/sync-spiele-audio.py  → der Workflow „Hörtexte vertonen“ erzeugt die MP3s (natürliche Stimme).
// Aufruf: node tools/collect-spiele-tts.mjs   (nach Änderungen an ORTE, Memory-Themen, Wo/wohin-Aufgaben oder Lino-Fragen in lino.js / lino-extra.js)
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const R = new URL('../', import.meta.url);

// Spiel-Datei in einer Sandbox ausführen und die benötigten Konstanten/Funktionen herausreichen
async function load(file, names, pre = []) {
  let src = await readFile(new URL(file, R), 'utf8');
  const end = src.lastIndexOf('})');
  src = src.slice(0, end) + `;globalThis.__out = { ${names.map(n => `${n}: typeof ${n} !== 'undefined' ? ${n} : undefined`).join(', ')} };\n` + src.slice(end);
  src = src.replace(/if \(!window\.DMGame\) return;/, '');
  const stub = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : stub, apply: () => stub, construct: () => stub, set: () => true });
  const ctx = { window: { DMGame: stub, DMKit: stub, DM: {} }, document: stub, DMGame: stub, DMKit: stub, console, Math, JSON, Object, Array, String, Number, Set, Map, setTimeout() {}, requestAnimationFrame() {}, localStorage: { getItem: () => null, setItem() {} } };
  ctx.globalThis = ctx; ctx.self = ctx.window;
  vm.createContext(ctx);
  for (const f of pre) vm.runInContext(await readFile(new URL(f, R), 'utf8'), ctx, { filename: f });
  vm.runInContext(src, ctx, { filename: file });
  return ctx.__out;
}
const uniq = a => [...new Set(a.map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean))];
// Zwei Sprecher bei „Frage? – Antwort.“ (z. B. Kunde und Verkäuferin), sonst eine Stimme
const item = (text, voice) => {
  const parts = text.split(' – ');
  if (parts.length < 2) return { text, voice };
  const other = voice.startsWith('m') ? 'f1' : 'm1';
  return { text, voice, segments: parts.map((t, i) => ({ voice: i % 2 ? other : voice, text: t })) };
};
const write = async (name, texts, voice = 'f1', dialog = false) => {
  await writeFile(new URL(`spiele/tts-${name}.json`, R), JSON.stringify(texts.map(text => dialog ? item(text, voice) : { text, voice }), null, 1) + '\n');
  console.log(`spiele/tts-${name}.json: ${texts.length} Sätze`);
};

// „Wo bin ich?“ (Hörmodus): die Sätze aus ORTE
const alltag = await load('spiele/alltag.js', ['ORTE']);
await write('orte', uniq(alltag.ORTE.map(([, q]) => q)), 'm1', true);

// Wort-Memory: „<Artikel> <Wort>“ ohne weiches Trennzeichen
const mem = await load('spiele/memory.js', ['THEMES', 'clean']);
const words = [];
for (const th of Object.values(mem.THEMES)) {
  const list = Array.isArray(th) ? th : th.words || th.w || Object.values(th).find(Array.isArray) || [];
  for (const w of list) if (Array.isArray(w) && w.length > 2) words.push(`${w[1]} ${mem.clean(w[2])}`);
}
await write('memory', uniq(words), 'f2');

// Wo oder wohin?: Aufgabe „<Imperativ> <Objekt im Akkusativ> <Ziel>.“
const ww = await load('spiele/wowohin.js', ['TASKS', 'VERB', 'OBJ', 'phrase', 'objNP']);
await write('wowohin', uniq(ww.TASKS.map(task => { const [vk, ok] = task; return `${ww.VERB[vk].imp} ${ww.objNP(ww.OBJ[ok], 'Akk')} ${ww.phrase(task, 'Akk')}.`; })), 'f1');

// Lino läuft: Satz mit der richtigen Lösung (Lücken, Artikel, Satzbau) und die Hörsätze – inkl. spiele/lino-extra.js
const lino = await load('spiele/lino.js', ['WORLDS', 'itFull'], ['spiele/lino-extra.js']);
await write('lino', uniq(lino.WORLDS.flatMap(w => [...w.all.map(lino.itFull), ...w.hear.map(h => h.say)])), 'm2');
