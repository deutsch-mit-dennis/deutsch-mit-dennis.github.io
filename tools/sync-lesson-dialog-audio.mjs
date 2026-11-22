// Adds every line of the lesson dialogues ("Hören & Lesen", platform-data.js → platformUnits[id].dialogue)
// to tools/tts/manifest.json. Keys: lek-<lesson>-d<n> – the same keys platform.js plays.
// Voices follow the speaker (female f2/f3, male m1/m2). Numbers are written out in "say" (display text stays).
// A changed text replaces the entry, so audio.yml records it again. Run: node tools/sync-lesson-dialog-audio.mjs
// HOLD (Dennis, 22.11.2026): these lines are to be voiced locally with VoiceStudio, not by the cloud chain.
// Do not run this before the VoiceStudio takes exist (engine "voicestudio"), otherwise audio.yml voices them with Gemini.
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(await readFile(new URL('platform-data.js', root), 'utf8') + '\n;globalThis.__units = platformUnits;', ctx);
const units = ctx.__units;
const FEMALE = /^(Samira|Verkäuferin|Noor|Mila|Anna|Passantin|Mutter|Lehrerin|Beraterin|Personalchefin|Kollegin|Olena|Aylin|Giulia|Praxis)$/;
// spoken form for lines with digits (Gemini/ElevenLabs read digits unreliably); key = exact display text
const SAY = {
  'Gern. Das kostet 2,80 Euro.': 'Gern. Das kostet zwei Euro achtzig.',
  '2,50 Euro. Möchten Sie eine Tüte?': 'Zwei Euro fünfzig. Möchten Sie eine Tüte?',
  'Dann sind es zusammen 5,30 Euro.': 'Dann sind es zusammen fünf Euro dreißig.',
  'Um 15:30 Uhr kann ich leider nicht. Geht es später?': 'Um fünfzehn Uhr dreißig kann ich leider nicht. Geht es später?',
  'Ja, um 16 Uhr ist noch ein Termin frei.': 'Ja, um sechzehn Uhr ist noch ein Termin frei.',
  'Das passt. Donnerstag um 16 Uhr. Vielen Dank.': 'Das passt. Donnerstag um sechzehn Uhr. Vielen Dank.',
  'Sie kostet 620 Euro im Monat.': 'Sie kostet sechshundertzwanzig Euro im Monat.',
  'Ich habe bis 16 Uhr gearbeitet.': 'Ich habe bis sechzehn Uhr gearbeitet.',
  'Können Sie heute um 11 Uhr kommen?': 'Können Sie heute um elf Uhr kommen?',
  'Danke. Ich komme um 11 Uhr.': 'Danke. Ich komme um elf Uhr.',
  'Entschuldigung, hält der Bus 542 heute hier?': 'Entschuldigung, hält der Bus fünfhundertzweiundvierzig heute hier?',
  'Um 13 Uhr.': 'Um dreizehn Uhr.',
  'Wir melden uns morgen bis 12 Uhr bei Ihnen.': 'Wir melden uns morgen bis zwölf Uhr bei Ihnen.',
  'Von 10 bis 14 Uhr. Außerhalb dieser Zeit stimmen wir uns im Team ab.': 'Von zehn bis vierzehn Uhr. Außerhalb dieser Zeit stimmen wir uns im Team ab.',
  'Der Lieferant bringt die 30 Namensschilder erst übermorgen. Die Veranstaltung ist morgen.': 'Der Lieferant bringt die dreißig Namensschilder erst übermorgen. Die Veranstaltung ist morgen.',
  'Falls wir passendes Papier bekommen, ist das möglich. Ich kann bis 14 Uhr welches kaufen.': 'Falls wir passendes Papier bekommen, ist das möglich. Ich kann bis vierzehn Uhr welches kaufen.',
  'Ich prüfe bis 15 Uhr die Namen und die Datei.': 'Ich prüfe bis fünfzehn Uhr die Namen und die Datei.',
  'Ja, das ist meine Schwester Irina. Sie ist 25 Jahre alt.': 'Ja, das ist meine Schwester Irina. Sie ist fünfundzwanzig Jahre alt.',
  'Er ist 61 Jahre alt. Ich vermisse meine Familie.': 'Er ist einundsechzig Jahre alt. Ich vermisse meine Familie.',
};
const file = new URL('tools/tts/manifest.json', root);
const man = JSON.parse(await readFile(file, 'utf8'));
const idx = new Map(man.entries.map((e, i) => [e.key, i]));
let added = 0, changed = 0, digits = [];
const put = (key, seg) => {
  const entry = { key, segments: [seg] };
  if (!idx.has(key)) { idx.set(key, man.entries.push(entry) - 1); added++; return; }
  const old = man.entries[idx.get(key)];
  if (JSON.stringify(old.segments) !== JSON.stringify(entry.segments)) { man.entries[idx.get(key)] = entry; changed++; }
};
for (const [id, u] of Object.entries(units)) {
  const voice = {}, used = { f: 0, m: 0 };
  (u.dialogue || []).forEach(([who, text], i) => {
    if (!voice[who]) { const g = FEMALE.test(who) ? 'f' : 'm'; voice[who] = g === 'f' ? ['f2', 'f3'][used.f++ % 2] : ['m1', 'm2'][used.m++ % 2]; }
    const say = SAY[text];
    if (!say && /\d/.test(text)) digits.push(`${id} ${i}: ${text}`);
    put(`lek-${id}-d${i}`, say ? { voice: voice[who], text, say } : { voice: voice[who], text });
  });
}
await writeFile(file, JSON.stringify(man, null, 1) + '\n');
console.log(`manifest: ${added} neu, ${changed} geändert, ${man.entries.length} gesamt`);
if (digits.length) console.log('Bitte "say" ergänzen (Zahlen ausschreiben):\n' + digits.join('\n'));
