// Checks diktat-data.js: every sentence has a finished recording with exactly this text, no duplicates.
// Run: node tools/diktat-validate.js
const fs = require('fs'), path = require('path'), R = path.join(__dirname, '..');
global.window = global; require(path.join(R, 'diktat-data.js'));
const man = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(R, 'tools/tts/manifest.json'), 'utf8')).entries.map(e => [e.key, e]));
const files = JSON.parse(fs.readFileSync(path.join(R, 'audio/tts/index.json'), 'utf8')).files;
let bad = 0; const seen = new Set();
for (const [lv, list] of Object.entries(DM.diktat)) {
  for (const [t, k] of list) {
    const e = man[k], err = !e ? 'key not in manifest' : e.segments.map(s => s.text).join(' ') !== t ? 'text differs' : !files[k] || !fs.existsSync(path.join(R, 'audio/tts', k + '.mp3')) ? 'no recording' : seen.has(t) ? 'duplicate' : '';
    seen.add(t);
    if (err) { bad++; console.log(lv, k, err, t); }
  }
  console.log(lv, list.length);
}
process.exit(bad ? 1 : 0);
