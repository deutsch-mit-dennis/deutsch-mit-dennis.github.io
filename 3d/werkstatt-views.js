// Full-page "inside" views for each desk object (test build). Every link points to the real site, nothing is changed there.
import { openHeft } from './heft-buch.js?v=20261108a';

const SITE = 'https://deutsch-mit-dennis.de/';
const L = (h) => SITE + h;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

// ---------- Laptop: browser with level navigation ----------
const LAPTOP_TABS = [
  { id: 'start', label: 'Start', url: '', h: 'Willkommen!', p: 'Wähle links dein Niveau – oder lass dir deinen Lernweg zeigen.', links: [['Mein Lernweg', '#lernweg'], ['Welcher Weg passt zu mir?', '#wegweiser'], ['Alle Lektionen', '#lernen'], ['Neuigkeiten', '#']] },
  { id: 'a1', label: 'A1', url: '#lernen', h: 'A1 · Anfänger', p: 'Erste Wörter und Sätze: sich vorstellen, Zahlen, einkaufen.', links: [['Lektionen', '#lernen'], ['Lernspiele', '#spiele'], ['Hören', '#hoeren']] },
  { id: 'a2', label: 'A2', url: '#lernen', h: 'A2 · Grundlagen', p: 'Alltag meistern: Termine, Wohnung, Arzt, über Vergangenes sprechen.', links: [['Lektionen', '#lernen'], ['Lesen im Alltag', '#lesen/alltag'], ['Wo oder wohin?', '#spiele/wowohin']] },
  { id: 'b1', label: 'B1', url: '#lernen', h: 'B1 · Mittelstufe', p: 'Meinung sagen, Briefe schreiben – und die B1-Prüfung vorbereiten.', links: [['Lektionen', '#lernen'], ['Probeprüfung DTZ', '#simulation/dtz'], ['Probeprüfung telc B1', '#simulation/telc-b1'], ['Schreiben üben', '#ueben/schreiben']] },
  { id: 'b2', label: 'B2 Beruf', url: '#lernen', h: 'B2 · Beruf', p: 'Deutsch für den Job: E-Mails, Besprechungen, Arbeitsabläufe.', links: [['Lektionen', '#lernen'], ['Lesen im Beruf', '#lesen/beruf'], ['Hören B2', '#hoeren/b2-1'], ['B2-Lernspiele', '#spiele/b2'], ['Probeprüfung DTB B2', '#simulation/dtb-b2']] },
  { id: 'videos', label: 'Videos', url: '#videos/alle', h: 'Erklärvideos', p: 'Grammatik und Prüfungstipps als Video.', links: [['Alle Videos', '#videos/alle']], ext: ['YouTube-Kanal', 'https://www.youtube.com/@deutsch-mit-Dennis'] },
];
function laptopView() {
  const v = el(`<div class="v-laptop"><div class="lt-bezel"><div class="lt-screen">
    <div class="lt-chrome"><i></i><i></i><i></i><span class="lt-url">deutsch-mit-dennis.de/</span></div>
    <div class="lt-app"><nav class="lt-side" aria-label="Niveaus">${LAPTOP_TABS.map(t => `<button type="button" data-t="${t.id}">${esc(t.label)}</button>`).join('')}</nav><section class="lt-main" aria-live="polite"></section></div>
  </div></div><div class="lt-base"></div></div>`);
  const main = v.querySelector('.lt-main'), url = v.querySelector('.lt-url');
  const show = id => {
    const t = LAPTOP_TABS.find(x => x.id === id);
    v.querySelectorAll('.lt-side button').forEach(b => b.setAttribute('aria-current', String(b.dataset.t === id)));
    url.textContent = 'deutsch-mit-dennis.de/' + t.url;
    main.innerHTML = `<h2>${esc(t.h)}</h2><p>${esc(t.p)}</p><div class="lt-cards">${t.links.map(([n, h]) => `<a href="${L(h)}">${esc(n)}<span>→</span></a>`).join('')}${t.ext ? `<a href="${t.ext[1]}" target="_blank" rel="noopener">${esc(t.ext[0])}<span>↗</span></a>` : ''}</div>`;
    main.classList.remove('in'); void main.offsetWidth; main.classList.add('in');
  };
  v.querySelector('.lt-side').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.t); });
  show('start'); return { node: v };
}

// ---------- Headphones: music player ----------
const TRACKS = [
  ['Hören – alle Übungen', 'Dialoge aus dem Alltag mit Aufgaben', '#hoeren'],
  ['DTZ-Hörtraining', 'Hören im Stil des Deutsch-Tests für Zuwanderer', '#hoeren/dtz-1'],
  ['B2-Hörtraining', 'Gespräche aus dem Berufsleben', '#hoeren/b2-1'],
  ['Lieder-Playlist', 'Deutsch mit Liedern bis C1', '#lieder/playlist'],
];
function playerView() {
  const v = el(`<div class="v-player"><div class="pl-now"><div class="pl-cover"><img src="../assets/3d/kopfhoerer.webp" alt=""></div>
    <div class="pl-eq" aria-hidden="true">${'<i></i>'.repeat(14)}</div><h2 class="pl-title"></h2><p class="pl-sub"></p>
    <div class="pl-ctrl"><button type="button" class="pl-prev" aria-label="Vorheriger">⏮</button><a class="pl-play" aria-label="Öffnen">▶</a><button type="button" class="pl-next" aria-label="Nächster">⏭</button></div></div>
    <ol class="pl-list">${TRACKS.map((t, i) => `<li><button type="button" data-i="${i}"><b>${esc(t[0])}</b><span>${esc(t[1])}</span></button></li>`).join('')}</ol></div>`);
  let cur = 0;
  const show = i => { cur = (i + TRACKS.length) % TRACKS.length; const t = TRACKS[cur];
    v.querySelector('.pl-title').textContent = t[0]; v.querySelector('.pl-sub').textContent = t[1]; v.querySelector('.pl-play').href = L(t[2]);
    v.querySelectorAll('.pl-list button').forEach((b, j) => b.setAttribute('aria-current', String(j === cur))); };
  v.querySelector('.pl-list').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  v.querySelector('.pl-prev').onclick = () => show(cur - 1); v.querySelector('.pl-next').onclick = () => show(cur + 1);
  show(0); return { node: v };
}

// ---------- Books: shelf ----------
const BOOKS = [
  ['Lesen', 'Alle Lesetexte mit Aufgaben', '#lesen', '#2341B5'],
  ['Lesen im Alltag', 'Texte aus dem Alltag', '#lesen/alltag', '#1D7A45'],
  ['Lesen im Beruf', 'Texte aus der Arbeitswelt', '#lesen/beruf', '#E8A800'],
  ['Leben in Deutschland', 'Fragen zum Lesen und Üben', '#lid', '#C2362B'],
  ['Lernpakete', 'Pakete zum Herunterladen', '#lernpakete', '#7A4FD8'],
  ['Mikula lernt Deutsch', 'Die Geschichte von Mikula', '#mikula', '#2B9A78'],
];
function shelfView() {
  const v = el(`<div class="v-shelf"><div class="sh-board">${BOOKS.map((b, i) => `<button type="button" class="sh-book" data-i="${i}" style="--c:${b[3]};--h:${78 + (i % 3) * 8}%"><span>${esc(b[0])}</span></button>`).join('')}<div class="sh-plant" aria-hidden="true"></div></div>
    <div class="sh-open" aria-live="polite"><p class="sh-hint">Zieh ein Buch aus dem Regal ↑</p></div></div>`);
  v.querySelector('.sh-board').addEventListener('click', e => { const b = e.target.closest('.sh-book'); if (!b) return; const k = BOOKS[+b.dataset.i];
    v.querySelectorAll('.sh-book').forEach(x => x.classList.toggle('out', x === b));
    v.querySelector('.sh-open').innerHTML = `<div class="sh-card" style="--c:${k[3]}"><h2>${esc(k[0])}</h2><p>${esc(k[1])}</p><a class="btn" href="${L(k[2])}">Aufschlagen →</a></div>`; });
  return { node: v };
}

// ---------- Microphone: studio ----------
const TAKES = [
  ['Sprechen üben', 'Antwort einsprechen – die Mitschrift zeigt, was verstanden wurde.', '#ueben/sprechen'],
  ['Bild beschreiben (DTZ)', 'Ein Bild beschreiben wie in der Prüfung.', '#bild'],
  ['Prüfungstraining', 'Sprechen-Teile der Prüfungen trainieren.', '#pruefung'],
];
function studioView() {
  const v = el(`<div class="v-studio"><div class="st-wave" aria-hidden="true">${'<i></i>'.repeat(32)}</div>
    <button type="button" class="st-rec" aria-pressed="false"><span>REC</span></button><p class="st-say">Tippe auf REC und sag: „Ich heiße …"</p>
    <div class="st-takes">${TAKES.map((t, i) => `<a href="${L(t[2])}" class="st-take"><b>Take ${i + 1}: ${esc(t[0])}</b><span>${esc(t[1])}</span></a>`).join('')}</div></div>`);
  const rec = v.querySelector('.st-rec');
  rec.onclick = () => { const on = rec.getAttribute('aria-pressed') !== 'true'; rec.setAttribute('aria-pressed', String(on)); v.classList.toggle('live', on);
    v.querySelector('.st-say').textContent = on ? 'Super! Übe jetzt richtig – wähle einen Take ↓' : 'Tippe auf REC und sag: „Ich heiße …"'; };
  return { node: v };
}

// ---------- Gamepad: arcade menu ----------
const GAMES = [
  ['DER, DIE, DAS – WISCH!', '#spiele/artikel'], ['VERB-RENNEN', '#spiele/verben'], ['WORT-MEMORY', '#spiele/memory'], ['WO ODER WOHIN?', '#spiele/wowohin'],
  ['ZAHLEN-OHR', '#spiele/zahlen'], ['LINO – JUMP’N’RUN', '#spiele/lino'], ['MIKULA SUCHT DEN WEG', '#spiele/mikula'], ['B2-SPIELE', '#spiele/b2'], ['TAGES-CHALLENGE', '#challenge'], ['KAHOOT-QUIZ', '#kahoot'], ['ALLE SPIELE', '#spiele'],
];
function arcadeView() {
  const v = el(`<div class="v-arcade"><div class="ar-crt"><p class="ar-blink">PRESS START</p><h2>LERNSPIELE</h2><ul class="ar-menu" role="listbox">${GAMES.map((g, i) => `<li role="option" data-i="${i}">${esc(g[0])}</li>`).join('')}</ul><p class="ar-help">▲▼ WÄHLEN · A STARTEN</p></div>
    <div class="ar-pad"><div class="ar-dpad"><button type="button" data-k="up" aria-label="hoch">▲</button><button type="button" data-k="down" aria-label="runter">▼</button></div><button type="button" class="ar-a" data-k="a">A</button></div></div>`);
  let cur = 0; const items = [...v.querySelectorAll('.ar-menu li')];
  const show = i => { cur = (i + GAMES.length) % GAMES.length; items.forEach((li, j) => li.setAttribute('aria-selected', String(j === cur))); items[cur].scrollIntoView({ block: 'nearest' }); };
  const go = () => { const h = GAMES[cur][1]; if (window.dmOpenRoute) window.dmOpenRoute(h.slice(1)); else location.href = L(h); };
  v.querySelector('.ar-menu').addEventListener('click', e => { const li = e.target.closest('li'); if (!li) return; if (+li.dataset.i === cur) go(); else show(+li.dataset.i); });
  v.querySelector('.ar-pad').addEventListener('click', e => { const k = e.target.closest('button')?.dataset.k; if (k === 'up') show(cur - 1); if (k === 'down') show(cur + 1); if (k === 'a') go(); });
  const key = e => { if (e.key === 'ArrowUp') { e.preventDefault(); show(cur - 1); } if (e.key === 'ArrowDown') { e.preventDefault(); show(cur + 1); } if (e.key === 'Enter') go(); };
  addEventListener('keydown', key); show(0);
  return { node: v, dispose: () => removeEventListener('keydown', key) };
}

// ---------- Exam sheet ----------
const EXAMS = [
  ['DTZ', 'Deutsch-Test für Zuwanderer (A2–B1)', '#simulation/dtz'], ['telc B1', 'Probeprüfung telc Deutsch B1', '#simulation/telc-b1'],
  ['telc B2', 'Probeprüfung telc Deutsch B2', '#simulation/telc-b2'], ['DTB B1', 'Deutsch-Test für den Beruf B1', '#simulation/dtb-b1'],
  ['DTB B2', 'Deutsch-Test für den Beruf B2', '#simulation/dtb-b2'], ['Leben in Deutschland', 'Test mit 33 Fragen', '#simulation/lid'],
  ['Prüfungstraining', 'Alle Prüfungsteile einzeln üben', '#pruefung'], ['Prüfungsinfos & Quellen', 'Ablauf und offizielle Infos', '#quellen'],
];
function examView() {
  const v = el(`<div class="v-exam"><div class="ex-clip" aria-hidden="true"></div><div class="ex-sheet"><p class="ex-name">Name: <span>du</span></p><h2>Probeprüfung – kreuze an:</h2>
    <ul class="ex-list">${EXAMS.map((x, i) => `<li><button type="button" data-i="${i}"><i class="ex-box"></i><b>${esc(x[0])}</b><span>${esc(x[1])}</span></button></li>`).join('')}</ul>
    <div class="ex-go" aria-live="polite"></div><p class="ex-foot">Im Stil der Prüfung · kein Angebot von telc, g.a.s.t. oder BAMF · <a href="${L('#vorbereitung')}">Vorbereitung telc &amp; DTB</a></p></div></div>`);
  v.querySelector('.ex-list').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const x = EXAMS[+b.dataset.i];
    v.querySelectorAll('.ex-list button').forEach(o => o.classList.toggle('on', o === b));
    v.querySelector('.ex-go').innerHTML = `<a class="btn" href="${L(x[2])}">${esc(x[0])} starten →</a><span class="ex-stamp">Viel Erfolg!</span>`; });
  return { node: v };
}

// ---------- Globe: Leben in Deutschland ----------
function globeView() {
  const v = el(`<div class="v-globe"><div class="gl-ball" aria-hidden="true"><div class="gl-map"></div><span class="gl-pin"></span></div>
    <div class="gl-panel"><p class="kicker">Leben in Deutschland</p><h2>Wohin geht die Reise?</h2>
    <div class="gl-routes"><a href="${L('#lid')}"><b>Fragen üben</b><span>Alle Fragen nach Themen</span></a><a href="${L('#simulation/lid')}"><b>Test simulieren</b><span>33 Fragen wie im echten Test</span></a><a href="${L('#spiele/lid')}"><b>LiD-Lernspiele</b><span>Spielerisch wiederholen</span></a><a href="${L('#orientierungskurs')}"><b>Orientierungskurs</b><span>Deutschland verstehen</span></a></div>
    <p class="gl-note">Unabhängiges Lernangebot – nicht vom BAMF.</p></div></div>`);
  return { node: v };
}

// ---------- Radio: songs ----------
const STATIONS = [['Deutsch mit Liedern', '#lieder', 88.5], ['Lieder-Playlist', '#lieder/playlist', 94.2], ['Musik zum Lernen', '#musik', 98.0], ['Erklärvideos', '#videos/alle', 101.7], ['YouTube-Kanal', 'https://www.youtube.com/@deutsch-mit-Dennis', 106.3]];
function radioView() {
  const v = el(`<div class="v-radio"><div class="rd-body"><div class="rd-speaker" aria-hidden="true"></div><div class="rd-panel">
    <div class="rd-scale"><span>88</span><span>94</span><span>100</span><span>106</span><i class="rd-needle"></i></div>
    <p class="rd-name" aria-live="polite"></p><label class="rd-tune">Sender suchen<input type="range" min="0" max="${STATIONS.length - 1}" step="1" value="0"></label>
    <a class="btn rd-on" href="#">Einschalten ♪</a></div></div><div class="rd-notes" aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></div></div>`);
  const range = v.querySelector('input'), show = i => { const s = STATIONS[i]; v.querySelector('.rd-name').textContent = `${s[2].toFixed(1)} MHz · ${s[0]}`;
    v.querySelector('.rd-needle').style.left = `${8 + (s[2] - 88) / 18.5 * 84}%`; const a = v.querySelector('.rd-on'); a.href = s[1].startsWith('http') ? s[1] : L(s[1]); a.target = s[1].startsWith('http') ? '_blank' : ''; };
  range.oninput = () => show(+range.value); show(0); return { node: v };
}

// ---------- Notebook: the 3D Heft from idea 1 ----------
const SPREADS = [
  { t: 'Schlag das Heft auf', links: [] },
  { t: 'Seite 1 · Lektionen', links: [['Lektionen', '#lernen'], ['Mein Lernweg', '#lernweg'], ['Über mich', '#ueber-mich']] },
  { t: 'Seite 2–3 · Hören, Lesen, Sprechen, Schreiben', links: [['Hören', '#hoeren'], ['Lesen', '#lesen'], ['Sprechen', '#ueben/sprechen'], ['Schreiben', '#ueben/schreiben']] },
  { t: 'Seite 4–5 · Spiele & Lieder', links: [['Lernspiele', '#spiele'], ['Lieder', '#lieder']] },
  { t: 'Seite 6–7 · Prüfung & LiD', links: [['Probeprüfungen', '#simulation'], ['Leben in Deutschland', '#lid'], ['Materialien', '#material'], ['Lernpakete', '#lernpakete']] },
];
function heftView(ctx = {}) {
  const v = el(`<div class="v-heft"><div class="hf-host"></div><div class="hf-bar"><button type="button" class="hf-prev" aria-label="Zurückblättern">←</button>
    <div class="hf-mid"><b class="hf-t" aria-live="polite"></b><div class="hf-links"></div></div><button type="button" class="hf-next" aria-label="Weiterblättern">→</button></div></div>`);
  let ctl = null, x0 = null;
  const paint = n => { const s = SPREADS[n]; v.querySelector('.hf-t').textContent = s.t;
    v.querySelector('.hf-links').innerHTML = s.links.map(([a, h]) => `<a href="${L(h)}">${esc(a)}</a>`).join('');
    v.querySelector('.hf-prev').disabled = n === 0; v.querySelector('.hf-next').disabled = n === SPREADS.length - 1; };
  const step = d => ctl && ctl.goTo(ctl.stage + d);
  v.querySelector('.hf-prev').onclick = () => step(-1); v.querySelector('.hf-next').onclick = () => step(1);
  const host = v.querySelector('.hf-host');
  host.addEventListener('pointerdown', e => { x0 = e.clientX; });
  host.addEventListener('pointerup', e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); else step(1); });
  const key = e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
  addEventListener('keydown', key); paint(0);
  return {
    node: v,
    async onOpen() { ctl = await openHeft(host, { maxStage: SPREADS.length - 1, onStage: paint, renderer: ctx.renderer }); setTimeout(() => ctl && ctl.stage === 0 && ctl.goTo(1), 700); },
    tick() { ctl && ctl.tick(); },
    dispose() { removeEventListener('keydown', key); ctl && ctl.dispose(); ctl = null; },
  };
}

// ---------- Mug: break ----------
function mugView() {
  const v = el(`<div class="v-mug"><div class="mg-cup" aria-hidden="true"><i class="mg-steam"></i><i class="mg-steam"></i><i class="mg-steam"></i><span>Pause</span></div>
    <div class="mg-cards"><a href="${L('#witz')}"><b>Witz des Tages</b><span>Lachen und Deutsch lernen</span></a><a href="${L('#challenge')}"><b>Tages-Challenge</b><span>10 Aufgaben, jeden Tag neu</span></a><a href="${L('#pinnwand')}"><b>Deine Meinung</b><span>Schreib Dennis, was du dir wünschst</span></a></div></div>`);
  return { node: v };
}

// ---------- Book stand: own books (Amazon) + PDF learning packages (Digistore24) ----------
const AMAZON_TAG = 'deutschmitden-21';
const amazon = u => u + (u.includes('?') ? '&' : '?') + 'tag=' + AMAZON_TAG;
function shopView() {
  const DM = window.DM || {}, books = (DM.books || []).filter(b => b.amazon), packs = DM.packages || [];
  const img = p => '../' + String(p || '').split('?')[0];
  const v = el(`<div class="v-shop">
    <section><h2>Meine Übungsbücher</h2><div class="sp-books">${books.map(b => `<article class="sp-book">
      <div class="sp-cover"><img src="${img(b.img)}" alt="Cover: ${esc(b.title)}" loading="lazy"></div>
      <h3>${esc(b.title)}</h3><p>${esc(b.level || '')}${b.pages ? ` · ${b.pages} Seiten` : ''}${b.price ? ` · <b>${esc(b.price)}</b>` : ''}</p>
      <div class="sp-btns"><a class="btn" href="${amazon(b.amazon)}" target="_blank" rel="sponsored noopener">Bei Amazon ↗</a><a class="sp-more" href="${L('#lernpakete/buecher')}">Mehr erfahren</a></div></article>`).join('')}</div>
      <p class="sp-note">Werbelink: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.</p></section>
    <section><h2>PDF-Lernpakete</h2><div class="sp-packs">${packs.map(p => `<a class="sp-pack" href="${L('#lernpakete')}"><img src="${img(p.img)}" alt="" loading="lazy">
      <span><b>${esc(p.title || '')}</b><small>${esc(p.level || '')}${p.pages ? ` · ${p.pages} Seiten` : ''}${p.price ? ` · ${esc(p.price)}` : ''}</small></span></a>`).join('')}</div></section></div>`);
  return { node: v };
}

export const VIEWS = { shop: shopView, tasse: mugView, laptop: laptopView, kopfhoerer: playerView, buecher: shelfView, mikrofon: studioView, gamepad: arcadeView, pruefung: examView, globus: globeView, radio: radioView, heft: heftView };
