// Aktualisiert music-feed.json: Hintergrundmusik vom zweiten Musikkanal (@PrudnikauMusic).
// Angezeigt werden auf der Website NUR rein instrumentale Stücke (ohne Gesang), mit deutschem Titel.
// Aufruf:  node tools/update-music-feed.mjs        (Node 18 oder neuer; läuft täglich per GitHub Actions)
// 1. RSS-Feed (neueste 15 Videos mit Datum und Beschreibung) + Kanalseite /videos (ältere Videos, Länge).
// 2. Neue Videos einordnen: instrumental ja/nein – aus Titel und Beschreibung (Beschreibung notfalls von der Videoseite).
// 3. Deutsche Titel für neue instrumentale Stücke mit Gemini (Secret GEMINI_API_KEY). Ohne Schlüssel bleibt das
//    Stück unsichtbar, bis ein Titel da ist – man kann „de“ auch von Hand in music-feed.json eintragen.
// Einmal getroffene Einordnungen und Übersetzungen bleiben erhalten (von Hand korrigierbar).
import { readFile, writeFile } from 'node:fs/promises';

const CHANNEL = 'UC6eX1E1aAXsaJ3aqAHdv8jg';
const HANDLE = '@PrudnikauMusic';
const FILE = new URL('../music-feed.json', import.meta.url);
const ID_RE = /^[A-Za-z0-9_-]{11}$/;
const UA = { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', 'accept-language': 'ru-RU,ru;q=0.9,de;q=0.8' };

// Hinweise auf reine Instrumentalmusik – und auf Gesang (dann nicht anzeigen)
const INS = /без слов|инструментал|instrumental|ambient|эмбиент|no vocals|without (words|vocals)|ohne (gesang|worte)/i;
const VOC_TITLE = /вокал|хор|песн|баллад|гимн|песнопени|интерпретац|vocal|choir|song|lied|пушкин|лермонтов|есенин|блок:|тютчев/i;
const VOC_DESC = /вокал|хоров|мужской хор|женский хор|мужской голос|женский голос|поёт|поет|vocal|choir|gesang/i;
const instrumental = (title, desc = '') => INS.test(title + ' ' + desc) && !VOC_TITLE.test(title) && !VOC_DESC.test(desc);

const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

let old = { videos: [] };
try { old = JSON.parse(await readFile(FILE, 'utf8')); } catch { /* erste Ausführung */ }
const byId = new Map((old.videos || []).map(v => [v.id, v]));
const desc = new Map();

// 1a. RSS
let rss = 0;
try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL}`);
  if (!res.ok) throw new Error(res.status);
  const xml = await res.text();
  for (const [, e] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = decode((e.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
    if (!ID_RE.test(id || '') || !title) continue;
    desc.set(id, decode((e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || ''));
    byId.set(id, { ...byId.get(id), id, title, published: (e.match(/<published>([^<]+)<\/published>/) || [])[1] || byId.get(id)?.published || '' });
    rss++;
  }
} catch (e) { console.warn('RSS-Feed nicht erreichbar:', e.message); }

// 1b. Kanalseite (ältere Videos und Länge)
let scraped = 0;
try {
  const html = await (await fetch(`https://www.youtube.com/${HANDLE}/videos`, { headers: UA })).text();
  const m = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (m) {
    const walk = (o, cb) => { if (!o || typeof o !== 'object') return; cb(o); for (const k in o) walk(o[k], cb); };
    walk(JSON.parse(m[1]), o => {
      let id, title, len;
      if (o.videoRenderer) { id = o.videoRenderer.videoId; title = o.videoRenderer.title?.runs?.map(r => r.text).join('') || o.videoRenderer.title?.simpleText; len = o.videoRenderer.lengthText?.simpleText; }
      else if (o.lockupViewModel && o.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
        id = o.lockupViewModel.contentId; title = o.lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content;
        walk(o.lockupViewModel.contentImage, x => { if (!len && typeof x.text === 'string' && /^\d{1,2}(:\d{2}){1,2}$/.test(x.text)) len = x.text; });
      }
      if (!ID_RE.test(id || '') || !title) return;
      const prev = byId.get(id);
      if (!prev) scraped++;
      byId.set(id, { published: '', ...prev, id, title, ...(len ? { len } : {}) });
    });
  }
} catch (e) { console.warn('Kanalseite nicht lesbar:', e.message); }

// 2. Neue Videos einordnen
let classified = 0;
for (const v of byId.values()) {
  if (typeof v.instrumental === 'boolean') continue;
  let d = desc.get(v.id) || '';
  if (!d) {
    try {
      const html = await (await fetch(`https://www.youtube.com/watch?v=${v.id}`, { headers: UA })).text();
      const m = html.match(/"shortDescription":"((?:[^"\\]|\\.)*)"/);
      if (m) d = JSON.parse(`"${m[1]}"`);
    } catch { /* nur Titel */ }
  }
  v.instrumental = instrumental(v.title, d);
  classified++;
}

// 3. Deutsche Titel (neu übersetzen, wenn der Originaltitel auf YouTube geändert wurde)
for (const v of byId.values()) if (v.de && v.deFrom && v.deFrom !== v.title) { delete v.de; delete v.deFrom; }
const todo = [...byId.values()].filter(v => v.instrumental && !v.de);
if (todo.length && process.env.GEMINI_API_KEY) {
  const key = process.env.GEMINI_API_KEY;
  const items = Object.fromEntries(todo.map(v => [v.id, v.title]));
  const prompt = `Übersetze diese YouTube-Titel von Instrumentalmusik ins Deutsche, für eine Website für Deutschlernende.
Regeln: natürlich und gut verständlich, sachlich (keine Großbuchstaben-Schreierei, keine Ausrufe-Übertreibungen), Gliederung mit „|“ beibehalten,
„432 Гц“ → „432 Hz“, „без слов“ → „ohne Worte“, Instrumente: гусли → Gusli, свирель → Hirtenflöte, жалейка → Schalmei, рожок → Horn, варган → Maultrommel, бубен → Rahmentrommel.
Antworte NUR mit JSON: dasselbe Objekt mit denselben Schlüsseln, Werte = deutscher Titel.
${JSON.stringify(items, null, 0)}`;
  let models = [];
  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers: { 'x-goog-api-key': key } });
    models = ((await r.json()).models || []).map(m => m.name.split('/').pop())
      .filter(n => /flash/.test(n) && !/(tts|image|audio|live|thinking|exp|preview|lite|8b)/.test(n))
      .sort((a, b) => parseFloat(b.match(/\d+(\.\d+)?/)?.[0] || 0) - parseFloat(a.match(/\d+(\.\d+)?/)?.[0] || 0));
  } catch { /* Standardmodell */ }
  for (const model of [...models.slice(0, 3), 'gemini-flash-latest']) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.2 } })
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const out = JSON.parse((await r.json()).candidates[0].content.parts[0].text);
      let n = 0;
      for (const v of todo) if (typeof out[v.id] === 'string' && out[v.id].trim()) { v.de = out[v.id].trim(); v.deFrom = v.title; n++; }
      console.log(`Übersetzt mit ${model}: ${n} Titel`);
      break;
    } catch (e) { console.warn(`Übersetzung mit ${model} fehlgeschlagen:`, e.message); }
  }
} else if (todo.length) console.warn(`${todo.length} instrumentale Stücke ohne deutschen Titel (kein GEMINI_API_KEY).`);

const videos = [...byId.values()];
const pos = new Map(videos.map((v, i) => [v.id, i]));
videos.sort((a, b) => (a.published && b.published) ? b.published.localeCompare(a.published) : pos.get(a.id) - pos.get(b.id));
await writeFile(FILE, JSON.stringify({ channel: CHANNEL, handle: HANDLE, updated: new Date().toISOString(), videos }, null, 2) + '\n');
console.log(`music-feed.json: ${videos.length} Videos (${rss} RSS, ${scraped} neu von der Kanalseite, ${classified} neu eingeordnet), ${videos.filter(v => v.instrumental && v.de).length} instrumental mit deutschem Titel.`);
