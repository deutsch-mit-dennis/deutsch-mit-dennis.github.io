// KDP paperback wrap cover (back + spine + front) for "DTZ Schreiben A2–B1 – Das Übungsbuch".
// Run from the repo root:  node tools/pdf/kdp/dtz-schreiben-cover.mjs [pages] [out.pdf] [white|cream]
// Trim A4 (210 x 297 mm), 3.175 mm bleed; spine per page: white 0.0572 mm, cream 0.0635 mm.
// Below 79 pages KDP allows no spine text, so the spine stays plain.
// The barcode area (bottom right of the back cover) is left empty: KDP prints the ISBN barcode there.
import { createRequire } from 'module';
import { resolve } from 'path';
import { writeFileSync, unlinkSync, mkdirSync } from 'fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const REPO = resolve(import.meta.dirname, '../../..');
const PAGES = Number(process.argv[2] || 78);
const OUT = resolve(process.argv[3] || resolve(REPO, 'qa-out/kdp-dtz-schreiben-cover.pdf'));
mkdirSync(resolve(OUT, '..'), { recursive: true });
const BLEED = 3.175, TW = 210, TH = 297;
const PAPER = process.argv[4] === 'cream' ? 0.0635 : 0.0572;
const SPINE = +(PAGES * PAPER).toFixed(2);
const W = +(2 * BLEED + 2 * TW + SPINE).toFixed(2), H = +(2 * BLEED + TH).toFixed(2);
const f = (p) => 'file://' + resolve(REPO, p);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(${f('tools/pdf/fonts/Atk-R.ttf')})}
@font-face{font-family:A;font-weight:700;src:url(${f('tools/pdf/fonts/Atk-B.ttf')})}
@page{size:${W}mm ${H}mm;margin:0}
*{box-sizing:border-box}
html,body{margin:0;width:${W}mm;height:${H}mm}
body{background:#2340b5;font-family:A,sans-serif;color:#fff;position:relative;overflow:hidden;
  -webkit-print-color-adjust:exact;print-color-adjust:exact}
.panel{position:absolute;top:${BLEED}mm;width:${TW}mm;height:${TH}mm}
.back{left:${BLEED}mm}.front{left:${BLEED + TW + SPINE}mm}
/* back cover */
.back .in{position:absolute;left:24mm;right:22mm;top:24mm}
.back h2{font-size:22pt;line-height:1.18;margin:0 0 7mm}
.back p{font-size:11.5pt;line-height:1.5;margin:0 0 6mm}
.back ul{list-style:none;padding:0;margin:0 0 7mm}
.back li{font-size:11.5pt;line-height:1.35;margin:0 0 3.2mm;padding-left:9mm;position:relative}
.back li:before{content:"";position:absolute;left:0;top:.9mm;width:4.2mm;height:4.2mm;border-radius:.8mm;background:#f6d64a}
.author{display:flex;gap:8mm;align-items:center;border-top:.5mm solid rgba(255,255,255,.55);padding-top:8mm;margin-top:2mm}
.author img{width:42mm;height:42mm;border-radius:50%;object-fit:cover;object-position:50% 18%;
  border:1.6mm solid #f6d64a;flex:none;background:#eef2fb}
.author p{margin:0;font-size:11pt}
.author .nm{font-size:15pt;font-weight:700;margin-bottom:2mm}
.site{position:absolute;left:24mm;bottom:22mm}
.site b{display:block;font-size:15pt}.site span{font-size:10.5pt;opacity:.9}
/* front cover */
.front .k{position:absolute;left:15mm;top:14mm;font-weight:700;font-size:9pt;letter-spacing:1.4pt;opacity:.85}
.front h1{position:absolute;left:14mm;top:20mm;margin:0;font-size:50pt;line-height:1.08;font-weight:700}
.front .sub{position:absolute;left:15mm;top:68mm;font-size:24pt;font-weight:700;color:#f6d64a}
.front .lead{position:absolute;left:15mm;top:84mm;font-size:13.5pt;line-height:1.45;width:130mm}
.front svg{position:absolute;left:70mm;top:111mm;width:132mm}
.chips{position:absolute;left:15mm;top:251mm;display:flex;gap:3mm}
.chips span{background:#fff;color:#14215e;font-weight:700;font-size:10.5pt;border-radius:5mm;padding:2mm 5mm}
.front .au{position:absolute;left:15mm;top:267mm}
.front .au b{display:block;font-size:15pt}.front .au span{font-size:9.5pt;opacity:.85}
</style></head><body>
<div class="panel back"><div class="in">
  <h2>Den Brief in der DTZ-Prüfung<br>sicher schreiben – Schritt für Schritt.</h2>
  <p>Im Deutsch-Test für Zuwanderer schreibst du einen Brief oder eine E-Mail. Mit diesem Übungsbuch trainierst du genau das: 30 neue Aufgaben im Stil der Prüfung, mit Platz zum Schreiben direkt im Buch und einem Musterbrief zu jeder Aufgabe.</p>
  <ul>
    <li>30 Prüfungsaufgaben: Vermieter, Arbeit, Kita und Schule, Arzt, Ämter, Freunde</li>
    <li>30 Musterbriefe – die vier Punkte sind im Text markiert</li>
    <li>Brief-Baukasten: Redemittel für formelle und informelle Briefe</li>
    <li>Die 10 häufigsten Fehler und eine Checkliste zur Selbstkontrolle</li>
    <li>30-Tage-Lernplan zum Abhaken</li>
  </ul>
  <p>Für Lernende auf Niveau A2–B1 im Integrationskurs, zur Prüfungsvorbereitung und zum Selbstlernen.</p>
  <div class="author">
    <img src="${f('assets/avatar/dennis-avatar.jpg')}" alt="">
    <div><p class="nm">Dennis Prudnikau</p>
    <p>ist lizenzierter DTZ-Prüfer und unterrichtet seit vielen Jahren in Integrations- und Berufssprachkursen.</p></div>
  </div>
</div>
<div class="site"><b>deutsch-mit-dennis.de</b><span>Kostenlose Übungen, Hörtexte und Videos</span></div>
</div>
<div class="panel front">
  <div class="k">DEUTSCH-TEST FÜR ZUWANDERER</div>
  <h1>DTZ Schreiben<br>A2–B1</h1>
  <div class="sub">Das Übungsbuch</div>
  <div class="lead">30 Prüfungsaufgaben mit Musterbriefen, Redemitteln und Schreiblinien</div>
  <svg viewBox="0 0 340 250"><g transform="rotate(-6 170 125)">
    <rect x="10" y="40" width="310" height="190" rx="10" fill="#fff" stroke="#14215e" stroke-width="9"/>
    <path d="M18 230 L135 140 M312 230 L205 140" stroke="#aab3c7" stroke-width="5" fill="none"/>
    <path d="M14 46 L165 160 L316 46" stroke="#14215e" stroke-width="9" fill="none" stroke-linejoin="round"/>
    <rect x="240" y="55" width="58" height="62" rx="6" fill="#f6d64a" stroke="#14215e" stroke-width="6"/>
    <text x="269" y="97" text-anchor="middle" font-family="A" font-weight="700" font-size="24" fill="#14215e">B1</text>
  </g></svg>
  <div class="chips"><span>30 Aufgaben</span><span>30 Musterbriefe</span><span>mit Lernplan</span></div>
  <div class="au"><b>Dennis Prudnikau</b><span>lizenzierter DTZ-Prüfer</span></div>
</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage();
// load from a file:// URL so the local fonts and the photo are allowed to load
const TMP = OUT.replace(/\.pdf$/, '.html');
writeFileSync(TMP, html);
await p.goto('file://' + TMP, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: OUT, width: W + 'mm', height: H + 'mm', printBackground: true, preferCSSPageSize: true });
await p.setViewportSize({ width: Math.round(W * 4), height: Math.round(H * 4) });
await p.screenshot({ path: OUT.replace(/\.pdf$/, '.png'), fullPage: true });
await b.close();
unlinkSync(TMP);
console.log(`${OUT}  ${W} x ${H} mm, spine ${SPINE} mm (${PAGES} pages)`);
