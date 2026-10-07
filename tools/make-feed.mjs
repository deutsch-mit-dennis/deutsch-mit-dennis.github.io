// Erzeugt feed.xml (RSS 2.0) aus neu.json, youtube-feed.json und kahoot-feed.json.
// Läuft im Workflow „Videos und Kahoots synchronisieren“ und kann lokal mit `node tools/make-feed.mjs` gestartet werden.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url), SITE = 'https://deutsch-mit-dennis.de/';
const read = async f => { try { return JSON.parse(await readFile(new URL(f, root), 'utf8')); } catch { return {}; } };
const [n, y, k] = await Promise.all([read('neu.json'), read('youtube-feed.json'), read('kahoot-feed.json')]);
const items = [];
for (const i of n.items || []) items.push({ date: i.date, title: i.title, link: SITE + (i.link || '#') });
for (const v of y.videos || []) if (v.published) items.push({ date: v.published, title: 'Neues Video: ' + v.title, link: SITE + '#videos/alle/' + v.id, guid: 'yt:' + v.id });
for (const q of k.kahoots || []) if (q.created) items.push({ date: q.created, title: 'Neues Kahoot-Quiz: ' + q.title, link: SITE + '#kahoot', guid: 'kahoot:' + q.uuid });
items.sort((a, b) => new Date(b.date) - new Date(a.date));
const x = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const top = items.slice(0, 40);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Deutsch mit Dennis – Neu auf der Seite</title>
<link>${SITE}</link>
<atom:link href="${SITE}feed.xml" rel="self" type="application/rss+xml"/>
<description>Neue Übungen, Arbeitsblätter, Videos und Quizze zum Deutschlernen (A1 bis B2 Beruf).</description>
<language>de-de</language>
${top.length ? `<lastBuildDate>${new Date(top[0].date).toUTCString()}</lastBuildDate>` : ''}
${top.map(i => `<item><title>${x(i.title)}</title><link>${x(i.link)}</link><guid isPermaLink="false">${x(i.guid || i.date + ' ' + i.title)}</guid><pubDate>${new Date(i.date).toUTCString()}</pubDate></item>`).join('\n')}
</channel>
</rss>
`;
await writeFile(new URL('feed.xml', root), xml);
console.log(`feed.xml: ${top.length} Einträge`);
