import { readFileSync } from 'node:fs';
const dir = process.argv[2]; const idx = JSON.parse(readFileSync(dir + '/stations.json', 'utf8')); let err = 0;
const bad = (f, m) => { err++; console.log('✗', f, m); };
const line = (f, l, w) => { if (!l || typeof l.text !== 'string' || !l.text) bad(f, w + ': line without text'); else if (/\d/.test(l.text) && !l.say) bad(f, w + ': digits without say: ' + l.text); if (l && !('audio' in l)) bad(f, w + ': no audio field'); };
import { readdirSync } from 'node:fs';
const only = process.argv.slice(3);
for (const f of readdirSync(dir + '/stations').filter(n => n.endsWith('.json') && (!only.length || only.includes(n)))) {
  const d = JSON.parse(readFileSync(dir + '/stations/' + f, 'utf8'));
  for (const lv of ['A1', 'A2', 'B1']) {
    (d.intro?.[lv] || bad(f, lv + ' no intro') || []).forEach((l, i) => line(f, l, `${lv} intro ${i}`));
    line(f, d.outro?.[lv], lv + ' outro');
    const ts = d.tasks?.[lv] || []; if (ts.length < 5) bad(f, lv + ' tasks ' + ts.length);
    ts.forEach((t, i) => {
      const w = `${lv} task ${i + 1} ${t.type}`;
      if (t.type === 'choice') { if (t.options?.length !== 3 || !(t.answer >= 0 && t.answer < 3)) bad(f, w + ' options/answer'); if (t.say) line(f, t.say, w + ' say'); line(f, t.wrong, w + ' wrong'); }
      else if (t.type === 'order') { if (!Array.isArray(t.words) || t.words.length < 3 || t.words.length > 8) bad(f, w + ' words'); if (t.say) line(f, t.say, w + ' say'); line(f, t.wrong, w + ' wrong'); }
      else if (t.type === 'rate') { const v = (t.options || []).map(o => o.verdict).sort().join(); if (v !== 'falsch,passend,unhöflich') bad(f, w + ' verdicts ' + v); line(f, t.line, w + ' line'); line(f, t.wrong, w + ' wrong'); }
      else bad(f, w + ' unknown type');
    });
  }
  (d.words || []).forEach((x, i) => { if (!x.word || !['der', 'die', 'das'].includes(x.article) || !x.plural || !x.example) bad(f, 'word ' + i); });
  console.log(f, 'tasks', ['A1', 'A2', 'B1'].map(l => d.tasks[l].length).join('/'), 'words', d.words.length);
}
console.log(err ? err + ' problems' : 'schema ok'); process.exit(err ? 1 : 0);
