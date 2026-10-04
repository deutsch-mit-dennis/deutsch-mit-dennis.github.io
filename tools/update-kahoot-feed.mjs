// Synchronisiert die öffentlichen Kahoots von Dennis (Profil „dennisprudnikau“) nach kahoot-feed.json.
// Neue Kahoots erscheinen dadurch automatisch auf der Seite #kahoot – ohne Handarbeit.
// Aufruf:  node tools/update-kahoot-feed.mjs   (Node 18+, optional Paket „qrcode“ für QR-Codes)
// Kahoots, deren Titel mit „Stunde <Zahl>“ beginnt, gehören zum Lehrerpaket und werden NICHT angezeigt.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';

const USER = '28070f1f-b266-41cd-a90f-0e8f04c31f07';
const FILE = new URL('../kahoot-feed.json', import.meta.url);
const DIR = new URL('../assets/kahoot/', import.meta.url);
const HIDE = [/^\s*stunde\s+\d+/i];

let QR = null;
try { QR = (await import('qrcode')).default; } catch { console.warn('Paket „qrcode“ fehlt – QR-Codes werden übersprungen.'); }

const list = [];
for (let cursor = 0; cursor < 500; cursor += 50) {
  const r = await fetch(`https://create.kahoot.it/rest/kahoots/public/user/${USER}?limit=50&cursor=${cursor}`);
  if (!r.ok) throw new Error(`Kahoot nicht erreichbar: ${r.status}`);
  const j = await r.json();
  const page = (j.entities || []).map(e => e.card || e.kahoot || e);
  list.push(...page);
  if (page.length < 50) break;
}

let old = { kahoots: [] };
try { old = JSON.parse(await readFile(FILE, 'utf8')); } catch { /* erste Ausführung */ }
await mkdir(DIR, { recursive: true });
const exists = async u => { try { await access(u); return true; } catch { return false; } };

const kahoots = [];
for (const k of list) {
  if (!k?.uuid || !k.title || HIDE.some(re => re.test(k.title))) continue;
  const url = `https://create.kahoot.it/details/${k.uuid}`;
  const item = {
    uuid: k.uuid, title: k.title.trim(), description: (k.description || '').trim(),
    questions: k.number_of_questions || k.questionsCount || null,
    created: k.created ? new Date(k.created).toISOString() : '', url
  };
  // Titelbild lokal speichern (keine Bilder von Fremdservern beim Besuch der Website)
  const cover = new URL(`${k.uuid}.jpg`, DIR);
  const src = k.coverMedia?.url || k.cover;
  if (src && !(await exists(cover))) {
    try {
      const sep = src.includes('?') ? '&' : '?';
      const r = await fetch(/unsplash/.test(src) ? `${src}${sep}w=640&h=360&fit=crop&fm=jpg&q=75` : src);
      if (r.ok) await writeFile(cover, Buffer.from(await r.arrayBuffer()));
    } catch { /* ohne Bild */ }
  }
  if (await exists(cover)) item.cover = `assets/kahoot/${k.uuid}.jpg`;
  const qr = new URL(`${k.uuid}-qr.svg`, DIR);
  if (QR && !(await exists(qr))) await writeFile(qr, await QR.toString(url, { type: 'svg', margin: 1, color: { dark: '#172036', light: '#ffffff' } }));
  if (await exists(qr)) item.qr = `assets/kahoot/${k.uuid}-qr.svg`;
  kahoots.push(item);
}
kahoots.sort((a, b) => String(b.created).localeCompare(String(a.created)));
const before = new Set((old.kahoots || []).map(k => k.uuid));
const neu = kahoots.filter(k => !before.has(k.uuid)).map(k => k.title);
await writeFile(FILE, JSON.stringify({ user: USER, updated: new Date().toISOString(), kahoots }, null, 2) + '\n');
console.log(`kahoot-feed.json: ${kahoots.length} Kahoots${neu.length ? ` (neu: ${neu.join(', ')})` : ''}.`);
