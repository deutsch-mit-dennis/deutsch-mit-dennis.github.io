// Practice PDF "DTZ Sprechen Teil 2/3 + Schreiben" in the familiar exam layout
// (own tasks and own photos only, no original exam content).
// Run from the repo root:  node tools/pdf/dtz-uebung/build.mjs
// Output: material/dtz-uebung-sprechen-schreiben.pdf
import { createRequire } from 'module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const REPO = resolve(import.meta.dirname, '../../..');
const OUT = resolve(REPO, 'material/dtz-uebung-sprechen-schreiben.pdf');
const font = (f) => 'file://' + resolve(REPO, 'tools/pdf/fonts', f);
const img = (f) => 'file://' + resolve(REPO, 'assets/sprechen', f);

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

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join('');
let page = 0;

function frame(kind, body, v) {
  page++;
  const icon = kind === 'Schreiben'
    ? '<svg viewBox="0 0 40 40"><path d="M9 31l2-7 15-15 5 5-15 15z M24 11l5 5" fill="none" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/></svg>'
    : '<svg viewBox="0 0 40 40"><path d="M8 18c0-6 5.5-10 12-10s12 4 12 10-5.5 10-12 10c-1.4 0-2.7-.2-3.9-.5L11 31l1.6-5C9.8 24 8 21.3 8 18z" fill="none" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/></svg>';
  const time = kind === 'Schreiben' ? '30 Minuten' : 'ca. 16 Minuten';
  const left = page % 2 === 0;
  return `<section class="page ${left ? 'left' : 'right'}">
  <div class="side">Übungsmaterial im Stil des DTZ · keine Originalprüfung · created by D.Prudnikau</div>
  <div class="head"><span class="k">${kind}</span><span class="t">${time}</span><span class="ic">${icon}</span></div>
  ${body}
  <div class="foot">${left ? `<span>Seite ${page}</span><b>Übung – Variante ${v}</b>` : `<b>Variante ${v} – Übung</b><span>Seite ${page}</span>`}</div>
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

const pages = VARIANTEN.map((x, i) => [
  teil2(i + 1, 'A', x.teil2), teil2(i + 1, 'B', x.teil2), teil3(i + 1, x.teil3), schreiben(i + 1, x.schreiben),
].join('')).join('');

const html = `<!doctype html><html lang="de"><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(${font('Atk-R.ttf')})}
@font-face{font-family:A;font-weight:700;src:url(${font('Atk-B.ttf')})}
@font-face{font-family:A;font-style:italic;src:url(${font('Atk-I.ttf')})}
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
</style><body>${pages}</body></html>`;

const tmp = resolve(REPO, 'tools/pdf/dtz-uebung/.preview.html');
writeFileSync(tmp, html);
const browser = await chromium.launch();
const p = await browser.newPage();
await p.goto('file://' + tmp, { waitUntil: 'networkidle' });
await p.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('wrote', OUT, page, 'pages');
