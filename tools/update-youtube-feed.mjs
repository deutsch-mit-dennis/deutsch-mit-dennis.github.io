// Aktualisiert youtube-feed.json aus dem öffentlichen RSS-Feed des Kanals „Deutsch mit Dennis“.
// Aufruf:  node tools/update-youtube-feed.mjs        (Node 18 oder neuer)
// Läuft z. B. täglich per GitHub Actions, Cron oder als geplante Aufgabe des Hosting-Anbieters.
// Bereits bekannte Videos bleiben erhalten; der RSS-Feed liefert nur die neuesten 15.
import { readFile, writeFile } from 'node:fs/promises';

const CHANNEL = 'UCMacEMD2p8zCKY2UrGiMUrA';
const FILE = new URL('../youtube-feed.json', import.meta.url);

function category(title) {
  const t = title.toLowerCase();
  if (/leben in deutschland|lid|bundestag|bundesrat|grundrecht|wahl|regiert|demokratie|orientierung/.test(t)) return 'orientierung';
  if (/dtz|prüfung|pruefung|b2|telc|dtb|экзамен|brief/.test(t)) return 'pruefung';
  return 'deutsch';
}
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`);
if (!res.ok) throw new Error(`YouTube-Feed nicht erreichbar: ${res.status}`);
const xml = await res.text();
const fresh = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
  id: (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1],
  title: decode((e.match(/<title>([^<]*)<\/title>/) || [])[1] || ''),
  published: (e.match(/<published>([^<]+)<\/published>/) || [])[1] || ''
})).filter(v => /^[A-Za-z0-9_-]{11}$/.test(v.id || '') && v.title);

let old = { videos: [] };
try { old = JSON.parse(await readFile(FILE, 'utf8')); } catch { /* erste Ausführung */ }
const byId = new Map((old.videos || []).map(v => [v.id, v]));
for (const v of fresh) byId.set(v.id, { ...v, category: byId.get(v.id)?.category || category(v.title) });
const videos = [...byId.values()].sort((a, b) => String(b.published).localeCompare(String(a.published)));
await writeFile(FILE, JSON.stringify({ channel: CHANNEL, updated: new Date().toISOString(), videos }, null, 2) + '\n');
console.log(`youtube-feed.json: ${videos.length} Videos (${fresh.length} aus dem Feed).`);
