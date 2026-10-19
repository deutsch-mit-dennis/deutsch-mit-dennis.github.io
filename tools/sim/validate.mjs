// Prüft eine Simulationsdatei: node tools/sim/validate.mjs sim/<id>.js [--quiet]
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2];
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync(file, 'utf8'), ctx, { filename: file });
const all = ctx.window.SIM || {};
const ids = Object.keys(all);
const errs = [], warns = [];
if (ids.length !== 1) errs.push(`Genau eine Prüfung erwartet, gefunden: ${ids.join(', ')}`);
const S = all[ids[0]] || {};
const E = m => errs.push(m), W = m => warns.push(m);
const RULE_SKILLS = { dtz: ['hl', 's', 'm'], telc: ['lesen', 'sb', 'hoeren', 'schreiben', 'muendlich'], dtb: ['lesen', 'hoeren', 'schreiben', 'sprechen'] };
['id', 'title', 'short', 'provider', 'level', 'intro', 'rule'].forEach(k => typeof S[k] === 'string' && S[k] || E(`Kopf: ${k} fehlt`));
if (!RULE_SKILLS[S.rule]) E(`rule unbekannt: ${S.rule}`);
const skills = S.skills || {};
(RULE_SKILLS[S.rule] || []).forEach(k => skills[k]?.max > 0 || E(`skills.${k} fehlt`));
const sum = {}; let n = 0; const dist = {};
const text = v => typeof v === 'string' && v.trim().length > 0;
function checkPart(p, where, mini = false) {
  if (!text(p.title) && !mini) E(`${where}: title fehlt`);
  if (!text(p.instr)) E(`${where}: instr fehlt`);
  if (!mini && !skills[p.skill]) E(`${where}: skill "${p.skill}" nicht in skills`);
  (p.material || []).forEach((m, i) => text(m.t) || E(`${where}: material[${i}].t leer`));
  (p.audio || []).forEach((a, i) => {
    if (!Array.isArray(a.lines) || !a.lines.length) E(`${where}: audio[${i}] ohne lines`);
    (a.lines || []).forEach((l, j) => { if (!['n', 'f', 'm', 'f2', 'm2'].includes(l.s)) E(`${where}: audio[${i}].lines[${j}].s = ${l.s}`); text(l.t) || E(`${where}: audio[${i}].lines[${j}] leer`); });
  });
  if (p.audio && ![1, 2].includes(p.plays)) E(`${where}: plays muss 1 oder 2 sein`);
  if (p.kind === 'write') {
    if (!Array.isArray(p.options) || !p.options.length) E(`${where}: options fehlt`);
    (p.options || []).forEach((o, i) => { ['task', 'muster'].forEach(k => text(o[k]) || E(`${where}: options[${i}].${k} fehlt`)); });
    if (!(p.minWords >= 0)) E(`${where}: minWords fehlt`);
    if (!Array.isArray(p.check) || p.check.length < 4) E(`${where}: check (mind. 4) fehlt`);
    if (!(p.pts > 0)) E(`${where}: pts fehlt`);
    if (!mini) sum[p.skill] = (sum[p.skill] || 0) + p.pts;
    return;
  }
  if (p.kind === 'speak') {
    ['task', 'muster'].forEach(k => text(p[k]) || E(`${where}: ${k} fehlt`));
    if (!(p.minutes > 0)) E(`${where}: minutes fehlt`);
    if (!Array.isArray(p.check) || p.check.length < 3) E(`${where}: check fehlt`);
    if (!(p.pts > 0)) E(`${where}: pts fehlt`);
    if (!mini) sum[p.skill] = (sum[p.skill] || 0) + p.pts;
    return;
  }
  if (p.kind) E(`${where}: kind unbekannt ${p.kind}`);
  if (!Array.isArray(p.items) || !p.items.length) E(`${where}: items fehlt`);
  if (!mini && !(p.pts > 0)) E(`${where}: pts fehlt`);
  const gaps = (p.material || []).map(m => m.t).join(' ').match(/\{(\d+)\}/g) || [];
  gaps.forEach(g => { const k = +g.slice(1, -1); if (k < 1 || k > p.items.length) E(`${where}: Lücke ${g} ohne Item`); });
  (p.items || []).forEach((it, i) => {
    const opts = it.opts || p.opts;
    if (!Array.isArray(opts) || opts.length < 2) E(`${where} Item ${i + 1}: keine opts`);
    else if (!(Number.isInteger(it.a) && it.a >= 0 && it.a < opts.length)) E(`${where} Item ${i + 1}: a=${it.a} ungültig`);
    if (!text(it.q) && !gaps.length) W(`${where} Item ${i + 1}: q leer`);
    if (!text(it.why)) E(`${where} Item ${i + 1}: why fehlt`);
    if (it.au != null && !(p.audio && p.audio[it.au])) E(`${where} Item ${i + 1}: au=${it.au} ohne Hörtext`);
    if (!mini) { n++; dist[it.a] = (dist[it.a] || 0) + 1; }
  });
  if (!mini) sum[p.skill] = (sum[p.skill] || 0) + p.pts * (p.items || []).length;
}
(S.sections || []).forEach((s, si) => {
  const w = `Abschnitt ${si + 1} (${s.title})`;
  if (!text(s.id) || !text(s.title)) E(`${w}: id/title fehlt`);
  if (!(s.minutes > 0)) E(`${w}: minutes fehlt`);
  (s.parts || []).forEach((p, pi) => checkPart(p, `${w} › Teil ${pi + 1} (${p.title})`));
  if (!(s.parts || []).length) E(`${w}: keine parts`);
});
if (!(S.sections || []).length) E('sections fehlt');
for (const [k, v] of Object.entries(skills)) {
  const got = Math.round((sum[k] || 0) * 100) / 100;
  if (Math.abs(got - v.max) > 0.01) W(`Punkte ${k}: Summe ${got}, max ${v.max} (die Seite skaliert auf max)`);
}
const needPrep = ['telc-b1', 'telc-b2', 'dtb-b1', 'dtb-b2'].includes(S.id);
if (needPrep) {
  const P = S.prep || {};
  text(P.lead) || E('prep.lead fehlt');
  (P.facts || []).length >= 3 || E('prep.facts zu kurz');
  (P.parts || []).length >= 4 || E('prep.parts zu kurz');
  (P.parts || []).forEach((q, i) => {
    const w = `prep.parts[${i}] (${q.name})`;
    ['name', 'what', 'tip'].forEach(k => text(q[k]) || E(`${w}: ${k} fehlt`));
    (q.steps || []).length >= 3 || E(`${w}: steps < 3`);
    (q.traps || []).length >= 2 || E(`${w}: traps < 2`);
    if (q.mini) checkPart(q.mini, `${w}.mini`, true);
  });
  (P.redemittel || []).length >= 3 || E('prep.redemittel zu kurz');
  (P.fehler || []).length >= 6 || E('prep.fehler zu kurz');
  (P.fehler || []).forEach((f, i) => f.length === 3 || E(`prep.fehler[${i}] braucht 3 Einträge`));
  (P.plan || []).length === 4 || E('prep.plan braucht 4 Wochen');
}
const out = [`${S.id}: ${n} Aufgaben mit fester Lösung, Lösungsverteilung ${JSON.stringify(dist)}`, ...Object.entries(sum).map(([k, v]) => `  ${k}: ${v} Punkte`)];
if (!process.argv.includes('--quiet')) console.log(out.join('\n'));
warns.forEach(w => console.log('WARNUNG: ' + w));
errs.forEach(e => console.log('FEHLER: ' + e));
console.log(errs.length ? `${errs.length} Fehler` : 'OK');
process.exit(errs.length ? 1 : 0);
