// Holt jeden Morgen die Besucherzahlen von Cloudflare Web Analytics und schreibt sie nach stats/besuche.json.
// Benötigt die Repository-Secrets CF_API_TOKEN (Berechtigung „Account Analytics: Read“) und CF_ACCOUNT_ID.
// Es werden nur zusammengefasste Zahlen gespeichert – keine IP-Adressen, keine einzelnen Besuche.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const TOKEN = process.env.CF_API_TOKEN, ACC = process.env.CF_ACCOUNT_ID, HOST = 'deutsch-mit-dennis.de';
const fail = e => { console.log('::error::' + String(e && e.message || e).replace(/\n/g, ' ').slice(0, 600)); process.exit(1); }; process.on('unhandledRejection', fail); process.on('uncaughtException', fail);
if (!TOKEN || !ACC) { console.log('CF_API_TOKEN oder CF_ACCOUNT_ID fehlt – übersprungen.'); process.exit(0); }
const api = async (path, body) => {
  const r = await fetch('https://api.cloudflare.com/client/v4' + path, {
    method: body ? 'POST' : 'GET', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined });
  const j = await r.json();
  if (!r.ok || j.errors?.length) throw new Error(JSON.stringify(j.errors || j).slice(0, 400));
  return j;
};
// Site-Tag zur Domain suchen
let siteTag = process.env.CF_SITE_TAG;
if (!siteTag) {
  const list = await api(`/accounts/${ACC}/rum/site_info/list?per_page=50`);
  const s = (list.result || []).find(x => (x.ruleset?.zone_name || x.host || '').includes(HOST) || JSON.stringify(x).includes(HOST));
  if (!s) throw new Error('Keine Web-Analytics-Seite für ' + HOST + ' gefunden.');
  siteTag = s.site_tag;
}
const day = d => d.toISOString().slice(0, 10);
const now = new Date(), y0 = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
const y1 = new Date(y0.getTime() + 864e5), w0 = new Date(y1.getTime() - 7 * 864e5);
const q = (alias, dim, from, to, limit) => `${alias}: rumPageloadEventsAdaptiveGroups(filter: {AND: [{datetime_geq: "${from.toISOString()}", datetime_lt: "${to.toISOString()}"}, {siteTag: "${siteTag}"}]}, limit: ${limit}, orderBy: [count_DESC]) { count sum { visits } ${dim ? `dimensions { k: ${dim} }` : ''} }`;
const gql = `query { viewer { accounts(filter: {accountTag: "${ACC}"}) {
  ${q('gestern', '', y0, y1, 1)}
  ${q('woche', '', w0, y1, 1)}
  ${q('tage', 'date', w0, y1, 10)}
  ${q('herkunft', 'refererHost', w0, y1, 8)}
  ${q('laender', 'countryName', w0, y1, 8)}
  ${q('geraete', 'deviceType', w0, y1, 5)}
  ${q('seiten', 'requestPath', w0, y1, 8)}
} } }`;
const res = (await api('/graphql', { query: gql })).data.viewer.accounts[0];
const tot = a => ({ besuche: a?.[0]?.sum?.visits || 0, seitenaufrufe: a?.[0]?.count || 0 });
const top = a => (a || []).map(r => ({ name: r.dimensions.k || '(direkt)', besuche: r.sum.visits, aufrufe: r.count }));
const file = new URL('../stats/besuche.json', import.meta.url);
let old = {}; try { old = JSON.parse(await readFile(file, 'utf8')); } catch {}
const verlauf = { ...(old.verlauf || {}) };
for (const r of res.tage || []) verlauf[r.dimensions.k] = { besuche: r.sum.visits, seitenaufrufe: r.count };
const keep = Object.keys(verlauf).sort().slice(-120);
const out = {
  hinweis: 'Zusammengefasste Besucherzahlen (Cloudflare Web Analytics, ohne Cookies). Automatisch erzeugt.',
  stand: new Date().toISOString(), tag: day(y0),
  gestern: tot(res.gestern), letzte7Tage: tot(res.woche),
  herkunft: top(res.herkunft), laender: top(res.laender), geraete: top(res.geraete), seiten: top(res.seiten),
  verlauf: Object.fromEntries(keep.map(k => [k, verlauf[k]]))
};
await mkdir(new URL('../stats/', import.meta.url), { recursive: true });
await writeFile(file, JSON.stringify(out, null, 1) + '\n');
console.log(`gestern: ${out.gestern.besuche} Besuche, ${out.gestern.seitenaufrufe} Seitenaufrufe · 7 Tage: ${out.letzte7Tage.besuche} Besuche`);
