// Aktualisiert youtube-feed.json und lädt die Vorschaubilder (Thumbnails) aller Videos des Kanals „Deutsch mit Dennis“.
// Aufruf:  node tools/update-youtube-feed.mjs        (Node 18 oder neuer)
// Läuft täglich per GitHub Actions (.github/workflows/youtube-feed.yml).
// 1. RSS-Feed: die neuesten 15 Videos mit Datum.
// 2. Kanalseite /videos: weitere (ältere) Videos – ohne API-Schlüssel, Fehler werden ignoriert.
// 3. Thumbnails werden nach assets/yt/<id>.jpg kopiert. So lädt die Website keine Bilder von Google
//    und braucht dafür keine Einwilligung.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';

const CHANNEL = 'UCMacEMD2p8zCKY2UrGiMUrA';
const HANDLE = '@deutsch-mit-Dennis';
const FILE = new URL('../youtube-feed.json', import.meta.url);
const THUMBS = new URL('../assets/yt/', import.meta.url);
const ID_RE = /^[A-Za-z0-9_-]{11}$/;
const UA = { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', 'accept-language': 'de-DE,de;q=0.9' };

function category(title) {
  const t = title.toLowerCase();
  if (/leben in deutschland|lid|bundestag|bundesrat|grundrecht|wahl|regiert|demokratie|orientierung/.test(t)) return 'orientierung';
  if (/dtz|prüfung|pruefung|b2|telc|dtb|экзамен|brief/.test(t)) return 'pruefung';
  return 'deutsch';
}
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

let old = { videos: [] };
try { old = JSON.parse(await readFile(FILE, 'utf8')); } catch { /* erste Ausführung */ }
const byId = new Map((old.videos || []).map(v => [v.id, v]));

// 1. RSS
let fresh = [];
try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`);
  if (!res.ok) throw new Error(res.status);
  const xml = await res.text();
  fresh = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1],
    title: decode((e.match(/<title>([^<]*)<\/title>/) || [])[1] || ''),
    published: (e.match(/<published>([^<]+)<\/published>/) || [])[1] || ''
  })).filter(v => ID_RE.test(v.id || '') && v.title);
} catch (e) { console.warn('RSS-Feed nicht erreichbar:', e.message); }
for (const v of fresh) byId.set(v.id, { ...byId.get(v.id), ...v, category: byId.get(v.id)?.category || category(v.title) });

// 2. Kanalseite (ältere Videos, die nicht mehr im RSS-Feed stehen)
let scraped = 0;
try {
  const html = await (await fetch(`https://www.youtube.com/${HANDLE}/videos`, { headers: UA })).text();
  const m = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (m) {
    const data = JSON.parse(m[1]);
    const walk = (o, cb) => { if (!o || typeof o !== 'object') return; cb(o); for (const k in o) walk(o[k], cb); };
    walk(data, o => {
      let id, title;
      if (o.videoRenderer) { id = o.videoRenderer.videoId; title = o.videoRenderer.title?.runs?.map(r => r.text).join('') || o.videoRenderer.title?.simpleText; }
      else if (o.lockupViewModel && o.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') { id = o.lockupViewModel.contentId; title = o.lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content; }
      if (ID_RE.test(id || '') && title && !byId.has(id)) { byId.set(id, { id, title, published: '', category: category(title) }); scraped++; }
    });
  }
} catch (e) { console.warn('Kanalseite nicht lesbar:', e.message); }

const videos = [...byId.values()].sort((a, b) => String(b.published).localeCompare(String(a.published)));

// 3. Thumbnails
await mkdir(THUMBS, { recursive: true });
let loaded = 0; const fresh_files = [];
for (const v of videos) {
  const target = new URL(`${v.id}.jpg`, THUMBS);
  try { await access(target); continue; } catch { /* fehlt noch */ }
  for (const size of ['maxresdefault', 'sddefault', 'hqdefault']) {
    try {
      const r = await fetch(`https://i.ytimg.com/vi/${v.id}/${size}.jpg`);
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 4000) continue; // Platzhalterbild von YouTube
      await writeFile(target, buf); loaded++; fresh_files.push(target.pathname); break;
    } catch { /* nächste Größe */ }
  }
}
// Bilder verkleinern (falls ImageMagick vorhanden ist), damit die Seite schnell bleibt
try {
  const { execSync } = await import('node:child_process');
  if (fresh_files.length) execSync(`mogrify -resize '640x360^' -gravity center -extent 640x360 -strip -quality 78 ${fresh_files.map(f => `'${f}'`).join(' ')}`, { stdio: 'ignore' });
} catch { /* ohne ImageMagick bleiben die Originale */ }

for (const v of videos) {
  try { await access(new URL(`${v.id}.jpg`, THUMBS)); v.thumb = `assets/yt/${v.id}.jpg`; } catch { delete v.thumb; }
}
await writeFile(FILE, JSON.stringify({ channel: CHANNEL, updated: new Date().toISOString(), videos }, null, 2) + '\n');
console.log(`youtube-feed.json: ${videos.length} Videos (${fresh.length} aus dem RSS-Feed, ${scraped} zusätzlich von der Kanalseite), ${loaded} neue Thumbnails.`);
