// Practice PDF "DTZ Sprechen Teil 2/3 + Schreiben" in the familiar exam layout
// (own tasks and own photos only, no original exam content).
// Run from the repo root:  node tools/pdf/dtz-uebung/build.mjs
// Output: material/dtz-uebung-sprechen-schreiben.pdf
// Paid package: node tools/pdf/dtz-uebung/build.mjs --paket (needs tools/pdf/pakete/dtz-sprechen-schreiben-8.json)
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const REPO = resolve(import.meta.dirname, '../../..');
const OUT = resolve(REPO, 'material/dtz-uebung-sprechen-schreiben.pdf');
const font = (f) => 'file://' + resolve(REPO, 'tools/pdf/fonts', f);
// photos are re-encoded as 1400px JPEGs (tools/pdf/dtz-uebung/.img, gitignored) to keep the PDFs small for phones
const IMG = resolve(REPO, 'tools/pdf/dtz-uebung/.img');
execFileSync('python3', ['-c', `import sys,os
from PIL import Image
src,dst=sys.argv[1:3];os.makedirs(dst,exist_ok=True)
for f in os.listdir(src):
  if f.endswith('.webp') and '-klein' not in f:
    o=os.path.join(dst,f[:-5]+'.jpg')
    if not os.path.exists(o):
      im=Image.open(os.path.join(src,f)).convert('RGB');im.thumbnail((1400,1400));im.save(o,quality=78,optimize=True)`, resolve(REPO, 'assets/sprechen'), IMG]);
const img = (f) => 'file://' + resolve(IMG, f.replace(/\.webp$/, '.jpg'));

const VARIANTEN = [
  {
    teil2: { thema: 'Einkaufen', a: 'markt.webp', b: 'kasse.webp',
      a2: ['Wo kaufen Sie am liebsten ein? Im Supermarkt, auf dem Markt oder im Internet? Warum?',
        'Was kaufen Sie jede Woche ein? Wer geht bei Ihnen einkaufen?',
        'Achten Sie beim Einkaufen auf den Preis? Erzählen Sie mal!',
        'Und wie ist das in Ihrem Heimatland? Wo kaufen die Leute dort ein?'],
      b1: ['Was sind Vorteile und Nachteile vom Wochenmarkt im Vergleich zum Supermarkt?',
        'Was ist Ihnen wichtiger: ein günstiger Preis oder gute Qualität? Warum?',
        'Kaufen Sie auch im Internet ein? Welche Erfahrungen haben Sie damit gemacht?',
        'Gibt es beim Einkaufen Unterschiede zwischen Deutschland und Ihrem Heimatland? Welche?'] },
    teil3: { sit: 'Eine Nachbarin von Ihnen zieht am Wochenende in eine neue Wohnung. Sie bittet Sie beide, ihr beim Umzug zu helfen.',
      notes: ['Wann? Wie lange?', 'Wer hilft noch mit?', 'Transport (Auto leihen, Umzugsfirma, …)?', 'Was mitbringen (Kartons, Werkzeug, …)?', 'Essen und Getränke für die Helfer?'] },
    schreiben: {
      a: { text: 'Ihr Sohn ist krank und kann ein paar Tage nicht in die Schule gehen. Sie schreiben seiner Klassenlehrerin, Frau Becker, eine E-Mail.',
        p: ['Grund für Ihr Schreiben', 'Was Ihr Sohn hat', 'Wie lange er wahrscheinlich fehlt', 'Hausaufgaben und Material'] },
      b: { text: 'Sie haben im Internet gelesen, dass ein Sportverein in Ihrer Nähe neue Mitglieder sucht. Sie schreiben dem Trainer, Herrn Lorenz, eine E-Mail.',
        p: ['Grund für Ihr Schreiben', 'Welchen Sport Sie machen möchten', 'Fragen zu Zeiten und Kosten', 'Probetraining?'] } },
  },
  {
    teil2: { thema: 'Arbeit', a: 'buero.webp', b: 'handwerk.webp',
      a2: ['Was sind Sie von Beruf? Oder was möchten Sie gerne arbeiten?',
        'Arbeiten Sie lieber allein oder im Team? Warum?',
        'Wie kommen Sie zur Arbeit oder zum Kurs? Wie lange brauchen Sie?',
        'Was haben Sie in Ihrem Heimatland gearbeitet? Erzählen Sie mal!'],
      b1: ['Was ist für Sie bei der Arbeit am wichtigsten: Geld, Kollegen oder Spaß? Warum?',
        'Welche Vorteile und Nachteile hat es, im Büro oder auf der Baustelle zu arbeiten?',
        'Wie haben Sie Ihre erste Arbeitsstelle gefunden? Erzählen Sie doch mal!',
        'Ist das Arbeitsleben in Ihrem Heimatland anders als in Deutschland? Was ist anders?'] },
    teil3: { sit: 'In Ihrem Haus wohnen viele neue Familien. Sie beide möchten ein Sommerfest für alle Nachbarn organisieren.',
      notes: ['Wann? Wo (Hof, Garten, …)?', 'Wie die Nachbarn informieren?', 'Essen und Getränke – wer bringt was?', 'Musik? Spiele für Kinder?', 'Aufräumen danach?'] },
    schreiben: {
      a: { text: 'In Ihrer Wohnung funktioniert seit drei Tagen die Heizung nicht. Sie schreiben an Ihre Hausverwaltung, Frau Krüger, einen Brief.',
        p: ['Grund für Ihr Schreiben', 'Seit wann das Problem besteht', 'Warum das dringend ist', 'Wann Sie zu Hause sind'] },
      b: { text: 'Sie haben am Samstag Geburtstag und möchten eine Freundin aus Ihrem Deutschkurs zum Essen einladen. Schreiben Sie ihr eine E-Mail.',
        p: ['Grund für Ihr Schreiben', 'Wann und wo Sie feiern', 'Was es zu essen gibt', 'Wie sie zu Ihnen kommt'] } },
  },
  {
    teil2: { thema: 'Kinder und Kita', a: 'kita.webp', b: 'elternabend.webp',
      a2: ['Haben Sie oder Bekannte Kinder? Wer passt auf die Kinder auf?',
        'Gehen die Kinder in eine Kita oder in die Schule? Wie gefällt es ihnen dort?',
        'Waren Sie schon einmal bei einem Elternabend? Erzählen Sie mal!',
        'Und wie ist das in Ihrem Heimatland? Gibt es dort auch Kitas?'],
      b1: ['Was denken Sie: Ab welchem Alter sollen Kinder in die Kita gehen? Warum?',
        'Welche Vorteile und Nachteile hat es, wenn die Großeltern auf die Kinder aufpassen?',
        'Wie ist der Kontakt zu den Erzieherinnen oder Lehrern? Was ist dabei wichtig?',
        'Welche Unterschiede gibt es bei der Kinderbetreuung zwischen Deutschland und Ihrem Heimatland?'] },
    teil3: { sit: 'Eine Kollegin von Ihnen geht nächsten Monat in Rente. Sie beide möchten eine kleine Abschiedsfeier für sie organisieren.',
      notes: ['Wann und wo feiern?', 'Wen einladen?', 'Geschenk? Wie viel Geld sammeln?', 'Wer hält eine kleine Rede?', 'Wie bleibt es eine Überraschung?'] },
    schreiben: {
      a: { text: 'Sie können nicht zum Elternabend in der Kita Ihrer Tochter kommen. Sie schreiben der Erzieherin, Frau Yilmaz, eine E-Mail.',
        p: ['Grund für Ihr Schreiben', 'Warum Sie nicht kommen können', 'Bitte um Informationen', 'Vorschlag für einen anderen Termin'] },
      b: { text: 'Sie fahren zwei Wochen in Urlaub. Ihre Nachbarin, Frau Schulz, soll Ihre Blumen gießen und den Briefkasten leeren. Schreiben Sie ihr eine Notiz.',
        p: ['Grund für Ihr Schreiben', 'Wann Sie weg sind', 'Was sie tun soll', 'Wo der Schlüssel ist'] } },
  },
];

// --paket: paid package (8 variants + Redemittel + model answers) from tools/pdf/pakete/<id>.json
// (gitignored) -> tools/pdf/pakete-out/<id>.pdf, plus public Leseprobe and product image.
const PAKET = process.argv.includes('--paket');
const PID = 'dtz-sprechen-schreiben-8';
const P = PAKET ? JSON.parse(readFileSync(resolve(REPO, `tools/pdf/pakete/${PID}.json`), 'utf8')) : null;
const SIDE = {
  free: 'Übungsmaterial im Stil des DTZ · keine Originalprüfung · created by D.Prudnikau',
  paket: 'Deutsch mit Dennis · Lernpaket DTZ Prüfungstraining · im Stil des DTZ, keine Originalprüfung',
  probe: 'Leseprobe · Lernpaket DTZ Prüfungstraining · created by D.Prudnikau',
  gift: 'Geschenk für den IK 202 · nicht weitergeben · created by D.Prudnikau',
};
let side = SIDE.free, foot = 'Übung';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join('');
let page = 0;

const ICON = {
  Schreiben: '<svg viewBox="0 0 40 40"><path d="M9 31l2-7 15-15 5 5-15 15z M24 11l5 5" fill="none" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/></svg>',
  Sprechen: '<svg viewBox="0 0 40 40"><path d="M8 18c0-6 5.5-10 12-10s12 4 12 10-5.5 10-12 10c-1.4 0-2.7-.2-3.9-.5L11 31l1.6-5C9.8 24 8 21.3 8 18z" fill="none" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/></svg>',
  Info: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="none" stroke="#222" stroke-width="2.2"/><path d="M20 18v9M20 13v1" stroke="#222" stroke-width="2.6" stroke-linecap="round"/></svg>',
};

function frame(kind, body, v, time = kind === 'Schreiben' ? '30 Minuten' : 'ca. 16 Minuten', icon = ICON[kind] || ICON.Info) {
  page++;
  const left = page % 2 === 0, label = v ? `Variante ${v}` : '';
  const fl = v ? (left ? `${foot} – ${label}` : `${label} – ${foot}`) : 'Deutsch mit Dennis';
  return `<section class="page ${left ? 'left' : 'right'}">
  <div class="side">${side}</div>
  <div class="head"><span class="k">${kind}</span><span class="t">${time}</span><span class="ic">${icon}</span></div>
  ${body}
  <div class="foot">${left ? `<span>Seite ${page}</span><b>${fl}</b>` : `<b>${fl}</b><span>Seite ${page}</span>`}</div>
</section>`;
}

function teil2(v, who, t) {
  return frame('Sprechen', `
  <h2>Teil 2</h2>
  <p class="who">Teilnehmer*in <b>${who}</b></p>
  <p class="sub">Über Erfahrungen sprechen</p>
  <img class="photo" src="${img(who === 'A' ? t.a : t.b)}">
  <div class="pruefer">
    <p class="ph">Das sagt der/die Prüfer*in:</p>
    <p class="pt">Teil 2 A</p>
    <p class="it">Sie haben in einer Zeitschrift ein Foto gefunden. Berichten Sie Ihrer Gesprächspartnerin oder Ihrem Gesprächspartner kurz:</p>
    <ul class="dash it"><li>Was sehen Sie auf dem Foto?</li><li>Was für eine Situation zeigt dieses Bild?</li></ul>
    <p class="pt">Teil 2 B</p>
    <p class="it">Erzählen Sie bitte: Welche Erfahrungen haben Sie damit?</p>
    <div class="cols">
      <div><p class="pt">Prüfungsfragen Stufe A2</p><ul class="dash it">${li(t.a2)}</ul></div>
      <div><p class="pt">Prüfungsfragen Stufe B1</p><ul class="dash it">${li(t.b1)}</ul></div>
    </div>
  </div>`, v);
}

function teil3(v, t) {
  return frame('Sprechen', `
  <h2>Teil 3</h2>
  <p class="who">Teilnehmer*in <b>A</b> und <b>B</b></p>
  <p class="sub">Gemeinsam etwas planen</p>
  <p class="lab">Situation:</p><p>${esc(t.sit)}</p>
  <p class="lab">Aufgabe:</p><p class="it">Planen Sie gemeinsam, was Sie tun wollen. Hier haben Sie einige Notizen:</p>
  <div class="notewrap"><div class="pin"></div><div class="note"><ul>${li(t.notes)}</ul></div></div>`, v);
}

function schreiben(v, s) {
  const task = (n, x) => `<h3>Aufgabe ${n}</h3><p>${esc(x.text)}</p>
    <p class="it">Schreiben Sie etwas zu folgenden Punkten:</p><ul class="dot">${li(x.p)}</ul>`;
  return frame('Schreiben', `
  <p class="it intro">Wählen Sie <b>Aufgabe A oder Aufgabe B</b>. Zeigen Sie, was Sie können. Schreiben Sie möglichst viel.
  Vergessen Sie nicht die Anrede und den Gruß. Schreiben Sie Ihren Text auf den Antwortbogen.</p>
  <p class="it">Kreuzen Sie auf dem Antwortbogen an, welche Aufgabe Sie gewählt haben.</p>
  ${task('A', s.a)}<p class="oder">oder</p>${task('B', s.b)}`, v);
}

const variante = (x, i) => [teil2(i + 1, 'A', x.teil2), teil2(i + 1, 'B', x.teil2), teil3(i + 1, x.teil3), schreiben(i + 1, x.schreiben)].join('');

/* ---------- package-only pages ---------- */
const ALL = PAKET ? [...VARIANTEN, ...P.varianten] : VARIANTEN;
const LIC = '© Dzianis Prudnikau · Deutsch mit Dennis · deutsch-mit-dennis.de<br>Dieses Lernpaket ist nur für deinen persönlichen Gebrauch bestimmt. Weitergabe, Vervielfältigung oder Veröffentlichung – auch auszugsweise – sind nicht erlaubt. Unabhängiges Lernmaterial: kein Angebot von g.a.s.t., telc oder BAMF, keine offiziellen Prüfungsaufgaben.';

function cover(chip = 'Lernpaket · A2–B1 · DTZ', lic = LIC) {
  page++;
  const themes = ALL.map((x, i) => `<li><b>Variante ${i + 1}:</b> ${esc(x.teil2.thema)}</li>`).join('');
  return `<section class="page right cover">
  <div class="cv-top"><span class="chip">${chip}</span></div>
  <h1>DTZ Prüfungstraining:<br>Sprechen Teil 2 + 3 und Schreiben</h1>
  <p class="cv-lead">${ALL.length} komplette Übungsvarianten im bekannten Prüfungsformat – mit Fotos, Prüferfragen A2 und B1, Planungsaufgaben, Schreibaufgaben, Redemitteln und Musterlösungen.</p>
  <div class="cv-box"><p class="pt">Inhalt</p><ol>
    <li>So nutzt du dieses Heft · Redemittel (S. 2–3)</li>
    <li>${ALL.length} Übungsvarianten: je Teil 2 A, Teil 2 B, Teil 3 und Schreiben (S. 4–${3 + ALL.length * 4})</li>
    <li>Musterlösungen: Bildbeschreibung, Planungsdialog, Musterbriefe (S. ${4 + ALL.length * 4}–${3 + ALL.length * 6})</li></ol>
    <ul class="cv-themes">${themes}</ul></div>
  <p class="cv-hand">Viel Erfolg in der Prüfung! – Dennis</p>
  <p class="cv-lic">${lic}</p>
</section>`;
}

const rm = (groups) => groups.map(([h, xs]) => `<div class="rm"><p class="pt">${esc(h)}</p><ul class="dash">${li(xs)}</ul></div>`).join('');
function redemittel() {
  const R = P.redemittel;
  return frame('Redemittel', `<h2>So nutzt du dieses Heft</h2>
    <ol class="tips">${li(R.tipps)}</ol>
    <h2>Sprechen Teil 2 A – Foto beschreiben</h2><div class="rmgrid">${rm(R.teil2a)}</div>
    <h2>Sprechen Teil 2 B – Über Erfahrungen sprechen</h2><div class="rmgrid">${rm(R.teil2b)}</div>`, 0, 'Sprechen und Schreiben')
  + frame('Redemittel', `<h2>Sprechen Teil 3 – Gemeinsam etwas planen</h2><div class="rmgrid">${rm(R.teil3)}</div>
    <h2>Schreiben – Brief und E-Mail</h2><div class="rmgrid">${rm(R.schreiben)}</div>
    <div class="check"><p class="pt">Checkliste Schreiben</p><ul class="box">
      <li>Anrede passt (formell / informell)?</li><li>Zu allen vier Punkten etwas geschrieben?</li>
      <li>Einleitung, Schluss und Gruß da?</li><li>Ungefähr 80 Wörter?</li><li>Verb an Position 2, im Nebensatz am Ende?</li></ul></div>`, 0, 'Sprechen und Schreiben');
}

const letter = (t) => `<div class="letter">${t.split('\n').map((l) => l ? esc(l) : '&nbsp;').join('<br>')}</div>`;
function loesung(v, L, x) {
  const dlg = L.teil3.map(([s, t]) => `<p class="dl"><b>${s}:</b> ${esc(t)}</p>`).join('');
  return frame('Lösungen', `<h2>Musterlösung Variante ${v} – Sprechen</h2>
    <p class="pt">Teil 2 – Teilnehmer*in A (${esc(x.teil2.thema)})</p><p class="ml">${esc(L.teil2.A)}</p>
    <p class="pt">Teil 2 – Teilnehmer*in B</p><p class="ml">${esc(L.teil2.B)}</p>
    <p class="pt">Teil 3 – Beispieldialog</p><div class="dlg">${dlg}</div>`, v, 'Sprechen', ICON.Sprechen)
  + frame('Lösungen', `<h2>Musterlösung Variante ${v} – Schreiben</h2>
    <p class="pt">Aufgabe A</p>${letter(L.schreiben.a)}
    <p class="pt">Aufgabe B</p>${letter(L.schreiben.b)}
    <p class="dm-small">Musterlösungen sind Beispiele. In der Prüfung zählt: alle Punkte bearbeitet, verständlich, passende Anrede und Gruß.</p>`, v, 'Schreiben', ICON.Schreiben);
}

const CSS = `
@font-face{font-family:A;src:url(${font('Atk-R.ttf')})}
@font-face{font-family:A;font-weight:700;src:url(${font('Atk-B.ttf')})}
@font-face{font-family:A;font-style:italic;src:url(${font('Atk-I.ttf')})}
@font-face{font-family:Cav;src:url(${font('Cav.ttf')})}
@page{size:A4;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:A,sans-serif;color:#222;font-size:10.5pt;line-height:1.38}
.page{position:relative;width:210mm;height:297mm;padding:14mm 20mm 24mm 24mm;page-break-after:always;overflow:hidden}
.page.left{padding:14mm 24mm 24mm 20mm}
.side{position:absolute;top:22mm;bottom:28mm;width:7mm;border:0.4mm solid #777;writing-mode:vertical-rl;
  display:flex;align-items:center;justify-content:center;font-size:8.5pt;font-style:italic;color:#555;letter-spacing:.3pt}
.left .side{right:9mm}.right .side{left:9mm;transform:rotate(180deg)}
.head{display:flex;align-items:center;background:#d6d6d6;height:9mm;margin-right:24mm;padding-left:3mm;position:relative}
.head .k{font-weight:700;font-size:12.5pt;width:55%}.head .t{font-size:11.5pt}
.head .ic{position:absolute;right:-24mm;top:-5mm;width:20mm;height:19mm;border:0.5mm solid #444;background:#fff;display:flex;align-items:center;justify-content:center}
.head .ic svg{width:13mm;height:13mm}
h2{font-size:13pt;margin:5mm 0 3mm}h3{font-size:11.5pt;margin:7mm 0 1mm}
.who{margin:0 0 2mm;font-size:10pt}.sub{font-weight:700;margin:0 0 4mm}
p{margin:0 0 1.5mm}.it{font-style:italic}
.photo{width:100%;height:92mm;object-fit:cover;display:block;margin-bottom:5mm}
.pruefer{background:linear-gradient(#dcdcdc,#cfcfcf);padding:4mm 5mm 5mm;font-size:9.8pt}
.ph{font-weight:700}.pt{font-weight:700;margin-top:2mm}
ul{margin:0;padding:0;list-style:none}
.dash li{position:relative;padding-left:5mm;margin-bottom:1mm}.dash li:before{content:"–";position:absolute;left:0}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:7mm;margin-top:2mm}
.lab{font-weight:700;margin-top:9mm}
.notewrap{position:relative;width:118mm;margin:22mm auto 0}
.note{background:#e2e2e2;padding:16mm 10mm 14mm 13mm;box-shadow:3mm 4mm 5mm rgba(0,0,0,.28);
  clip-path:polygon(0 0,100% 0,100% 88%,93% 100%,0 100%)}
.note li{font-style:italic;font-size:17pt;line-height:1.25;margin-bottom:5mm;position:relative;padding-left:9mm}
.note li:before{content:"";position:absolute;left:0;top:3.3mm;width:3.2mm;height:3.2mm;border-radius:50%;background:#222}
.pin{position:absolute;left:50%;top:-4mm;width:10mm;height:10mm;margin-left:-5mm;border-radius:50%;z-index:2;
  background:radial-gradient(circle at 35% 30%,#eee,#999 55%,#555);box-shadow:1mm 2mm 2mm rgba(0,0,0,.35)}
.pin:after{content:"";position:absolute;left:4.6mm;top:9mm;width:.8mm;height:3mm;background:#555}
.intro{margin-top:7mm}
.dot li{position:relative;padding-left:9mm;margin:1.5mm 0}.dot li:before{content:"";position:absolute;left:1mm;top:1.8mm;width:2mm;height:2mm;border-radius:50%;background:#222}
.oder{font-weight:700;margin:10mm 0 4mm}
.foot{position:absolute;left:20mm;right:20mm;bottom:12mm;height:8mm;background:#555;color:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 4mm;font-size:9.5pt}
.right .foot{left:24mm}.left .foot{right:24mm}
.foot b{font-size:10.5pt}
.cover{padding:28mm 24mm 20mm 30mm}
.chip{display:inline-block;background:#f6d64a;color:#1f2f7a;font-weight:700;padding:2mm 5mm;border-radius:5mm;font-size:11pt}
.cover h1{font-size:25pt;line-height:1.15;margin:8mm 0 5mm;color:#1f2f7a}
.cv-lead{font-size:12pt;margin-bottom:8mm}
.cv-box{background:#eef1fb;padding:5mm 7mm;border-left:2mm solid #2a44b8}
.cv-box ol{margin:1mm 0 3mm;padding-left:6mm}.cv-themes{columns:2;font-size:10pt}
.cv-hand{font-family:Cav,cursive;font-size:20pt;color:#2a44b8;margin:10mm 0}
.cv-lic{position:absolute;left:30mm;right:24mm;bottom:20mm;font-size:8.5pt;color:#555}
.tips{padding-left:6mm;margin:0 0 3mm}.tips li{margin-bottom:1.5mm}
.rmgrid{display:grid;grid-template-columns:1fr 1fr;gap:2mm 7mm;background:#ececec;padding:2mm 5mm 4mm}
.rm .pt{margin-top:2mm}
.check{margin-top:6mm;border:0.4mm solid #999;padding:3mm 5mm}
.box li{position:relative;padding-left:7mm;margin:1.2mm 0}.box li:before{content:"☐";position:absolute;left:0}
.ml{background:#f1f1f1;padding:3mm 4mm;margin-bottom:3mm}
.dlg{background:#f1f1f1;padding:3mm 4mm}.dl{margin-bottom:1.4mm}
.letter{border:0.4mm solid #bbb;padding:4mm 5mm;margin-bottom:4mm;font-size:10pt;line-height:1.42}
.dm-small{font-size:9pt;color:#555;font-style:italic}
`;

async function render(browser, body, out) {
  const tmp = resolve(REPO, 'tools/pdf/dtz-uebung/.preview.html');
  writeFileSync(tmp, `<!doctype html><html lang="de"><meta charset="utf-8"><style>${CSS}</style><body>${body}</body></html>`);
  const p = await browser.newPage();
  await p.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  return p;
}

const browser = await chromium.launch();
if (!PAKET) {
  await render(browser, VARIANTEN.map(variante).join(''), OUT);
  console.log('wrote', OUT, page, 'pages');
} else {
  mkdirSync(resolve(REPO, 'tools/pdf/pakete-out'), { recursive: true });
  side = SIDE.paket; foot = 'Lernpaket';
  const full = cover() + redemittel() + ALL.map(variante).join('') + ALL.map((x, i) => loesung(i + 1, P.loesungen[i], x)).join('');
  const total = page;
  const outP = resolve(REPO, `tools/pdf/pakete-out/${PID}.pdf`);
  const pg = await render(browser, full, outP);
  // product image: first page of the package on the site's blue card
  await pg.setViewportSize({ width: 794, height: 1123 });
  const shot = resolve(REPO, 'tools/pdf/dtz-uebung/.cover.png');
  await pg.screenshot({ path: shot, clip: { x: 0, y: 0, width: 794, height: 1123 } });
  console.log('wrote', outP, total, 'pages');

  // Leseprobe: cover, Redemittel, one variant (5), its model answers
  page = 0; side = SIDE.probe;
  const v = 4, x = ALL[v];
  const probe = cover() + redemittel() + variante(x, v) + loesung(v + 1, P.loesungen[v], x);
  const outL = resolve(REPO, `material/leseproben/${PID}.pdf`);
  await render(browser, probe, outL);
  console.log('wrote', outL, page, 'pages');

  // gift for Dennis' own course (unlisted page geschenk/dtz-kurs/): full content, watermarked
  page = 0; side = SIDE.gift; foot = 'Geschenk';
  const gift = cover('🎁 Geschenk für den IK 202 · A2–B1', '© Dzianis Prudnikau · Deutsch mit Dennis · deutsch-mit-dennis.de<br>Ein Geschenk für die Teilnehmerinnen und Teilnehmer des IK 202 – nur für deine eigene Prüfungsvorbereitung, bitte nicht weitergeben. Unabhängiges Lernmaterial im Stil des DTZ: kein Angebot von g.a.s.t., telc oder BAMF, keine offiziellen Prüfungsaufgaben.')
    + redemittel() + ALL.map(variante).join('') + ALL.map((x, i) => loesung(i + 1, P.loesungen[i], x)).join('');
  mkdirSync(resolve(REPO, 'geschenk/dtz-kurs'), { recursive: true });
  await render(browser, gift, resolve(REPO, 'geschenk/dtz-kurs/dtz-pruefungstraining-geschenk.pdf'));
  console.log('wrote gift pdf', page, 'pages');

  const card = await browser.newPage({ viewport: { width: 800, height: 800 } });
  const cardHtml = resolve(REPO, 'tools/pdf/dtz-uebung/.card.html');
  writeFileSync(cardHtml, `<style>@font-face{font-family:A;font-weight:700;src:url(${font('Atk-B.ttf')})}@font-face{font-family:A;src:url(${font('Atk-R.ttf')})}@font-face{font-family:Cav;src:url(${font('Cav.ttf')})}
  body{margin:0;width:800px;height:800px;background:#2a44b8;font-family:A;color:#fff;position:relative;overflow:hidden}
  .c1{position:absolute;right:-140px;top:-160px;width:480px;height:480px;border-radius:50%;background:#3552cc}
  .c2{position:absolute;left:-160px;bottom:-200px;width:420px;height:420px;border-radius:50%;background:#3552cc}
  .chip{position:absolute;left:48px;top:58px;background:#f6d64a;color:#1f2f7a;font-weight:700;font-size:22px;padding:10px 20px;border-radius:24px}
  h1{position:absolute;left:48px;top:118px;margin:0;font-size:38px;line-height:1.15;width:700px}
  .sub{position:absolute;left:48px;top:240px;font-size:22px;opacity:.9}
  .doc{position:absolute;width:330px;box-shadow:0 12px 30px rgba(0,0,0,.35)}
  .d1{left:395px;top:300px;transform:rotate(-3deg)} .d2{left:250px;top:330px;transform:rotate(4deg);width:300px}
  .brand{position:absolute;left:48px;bottom:56px;font-family:Cav;font-size:40px}.url{position:absolute;left:48px;bottom:26px;font-size:18px;opacity:.9}</style>
  <div class="c1"></div><div class="c2"></div><span class="chip">LERNPAKET · A2–B1</span>
  <h1>DTZ Prüfungstraining:<br>Sprechen Teil 2 + 3 und Schreiben</h1>
  <p class="sub">${total} Seiten PDF · ${ALL.length} Varianten · mit Musterlösungen</p>
  <img class="doc d2" src="${img(ALL[3].teil2.a)}" style="height:220px;object-fit:cover;border:10px solid #fff">
  <img class="doc d1" src="file://${shot}">
  <div class="brand">Deutsch mit Dennis</div><div class="url">deutsch-mit-dennis.de</div>`);
  await card.goto('file://' + cardHtml, { waitUntil: 'networkidle' });
  await card.screenshot({ path: resolve(REPO, `assets/pakete/${PID}.jpg`), type: 'jpeg', quality: 88 });
  console.log('wrote product image, pages total', total);
}
await browser.close();
