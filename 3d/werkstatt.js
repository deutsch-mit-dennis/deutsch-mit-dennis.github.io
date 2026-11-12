// Idea 6 'Heft + Schreibtisch': click an object -> camera flies in, object opens, full-page themed view (test build).
import * as THREE from 'three';
import { VIEWS, prewarmHeft } from './werkstatt-views.js?v=20261111s';
import { addLife } from './werkstatt-leben.js?v=20261108m';
import { progress } from './heft-buch.js?v=20261111s';
import { addStickers } from './werkstatt-sticker.js?v=20261108m';
import { sound, soundButton } from './werkstatt-ton.js?v=20261110b';

const SITE = 'https://deutsch-mit-dennis.de/';
const C = { tinte: '#2341B5', tinteDark: '#182E86', paper: '#FBFBF8', ink: '#172036', marker: '#FFE45C', rot: '#C2362B', gruen: '#1D7A45', sun: '#E8A800', sky: '#2C86CF', mint: '#2B9A78' };
const AREAS = {
  laptop:    { title: 'Lektionen', text: 'Dein Kurs von A0 bis B2 Beruf: immer der nächste Schritt – Lektionen, Grammatik und Übungen.', href: '#kurs', icon: 'stern', btn: 'Kurs öffnen' },
  kopfhoerer:{ title: 'Hören', text: 'Dialoge aus dem Alltag mit natürlichen Stimmen – mit Aufgaben.', href: '#hoeren', icon: 'kopfhoerer', btn: 'Hören üben' },
  buecher:   { title: 'Lesen', text: 'Lesetexte mit Aufgaben – passend zu deinem Niveau.', href: '#lesen', icon: 'buecher', btn: 'Lesen üben' },
  mikrofon:  { title: 'Sprechen', text: 'Sprich deine Antwort ein – die Sprech-Mitschrift zeigt, was verstanden wurde.', href: '#ueben', icon: 'mikrofon', btn: 'Sprechen üben' },
  heft:      { title: 'Mein Heft', text: 'Briefe und E-Mails schreiben – der Schreib-Check hilft dir.', href: '#ueben', icon: 'schreiben', btn: 'Schreiben üben' },
  gamepad:   { title: 'Lernspiele', text: 'Artikel, Verben, Zahlen – spielerisch üben, auch mit Lino im Jump’n’Run.', href: '#spiele', icon: 'spiel', btn: 'Spielen' },
  pruefung:  { title: 'Prüfung', text: 'Probeprüfungen im Stil von DTZ, telc B1/B2 und DTB B1/B2.', href: '#simulation', icon: 'pokal', btn: 'Probeprüfung starten' },
  globus:    { title: 'Leben in Deutschland', text: 'Fragen üben und den Test mit 33 Fragen ausprobieren.', href: '#lid', icon: 'globus', btn: 'LiD üben' },
  shop:      { title: 'Bücher & Lernpakete', text: 'Meine Übungsbücher und PDF-Lernpakete.', href: '#lernpakete', icon: 'buecher', btn: 'Ansehen' },
  zettel:    { title: 'Tages-Challenge', text: '10 Aufgaben, jeden Tag neu – hol dir deine Serie.', href: '#challenge', icon: 'stern', btn: 'Challenge starten' },
  lampe:     { title: 'Licht an / aus', noChip: true },
  tasse:     { title: 'Pause', text: 'Witz des Tages, Tages-Challenge und deine Meinung.', href: '#witz', icon: 'idee', btn: 'Pause machen' },
  radio:     { title: 'Lieder', text: 'Deutsch mit Liedern bis C1 – mit Liedtext zum Mitlesen.', href: '#lieder', icon: 'noten', btn: 'Lieder hören' },
};
// interface texts in the learner's language (same choice as on the start page: localStorage dmd.lang). The learning content inside the objects stays German.
const HI = () => (window.DM && window.DM.hi18n) || null;
const T = (k, fb) => { const H = HI(); return (H && H.t(k)) || fb; };
const areaTitle = key => T('ch_' + key, AREAS[key] ? AREAS[key].title : key);
const CHIP_ICON = { laptop: '💻', kopfhoerer: '🎧', buecher: '📚', mikrofon: '🎤', heft: '📓', gamepad: '🎮', pruefung: '📝', globus: '🌍', shop: '🛍️', tasse: '☕', zettel: '🔥', radio: '🎵' };
// which desk objects fit which level, in a sensible order (my suggestion, not binding)
const LEVEL_DESK = { A0: ['laptop', 'kopfhoerer', 'mikrofon', 'gamepad', 'radio'], A1: ['laptop', 'kopfhoerer', 'mikrofon', 'heft', 'gamepad', 'radio'], A2: ['laptop', 'kopfhoerer', 'buecher', 'mikrofon', 'heft', 'gamepad'], B1: ['pruefung', 'kopfhoerer', 'buecher', 'mikrofon', 'heft', 'globus'], B2: ['pruefung', 'buecher', 'kopfhoerer', 'mikrofon', 'heft'] };
let recKeys = [], recSet = new Set(); // objects recommended for the chosen level
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover:hover)').matches;
const $ = id => document.getElementById(id);
const safeRoute = r => { r = String(r || '').replace(/^#/, ''); return /^[\w\-\/.~=&]+$/.test(r) ? r : ''; };
let deskReady = false, pendingRoute = null; // deep link waits until the desk is built

// ---------- browser history: back button + shareable address (/3d/#route) ----------
// Every level gets its own entry: desk -> object window ('view') -> page ('content'); pages inside the
// iframe add their own entries automatically. Closing with our own buttons steps the history back too.
let popping = 0, restoring = false;
const d3Href = r => location.pathname + location.search + (r ? '#' + r : '');
function d3Push(level, route) {
  try {
    if (restoring) { // re-opening from browser forward: the entry already exists
      if (level === 'content') { restoring = false; history.replaceState({ d3: level, route }, '', d3Href(route)); }
      return;
    }
    history.pushState({ d3: level, route }, '', d3Href(route));
  } catch {}
}
function d3Url(r) { try { history.replaceState(history.state, '', d3Href(r)); } catch {} }
function d3Unwind(n) {
  if (popping || !(history.state && history.state.d3) || n < 1) return;
  popping++; setTimeout(() => { popping = 0; }, 800);
  history.go(-n);
}
addEventListener('popstate', e => {
  if (popping) { popping--; return; } // caused by d3Unwind: the window is already closed
  const s = e.state || {};
  popping++; // closing from here must not step back a second time
  try {
    if (!s.d3) { if (view) closeView(); }
    else if (s.d3 === 'view') { if (content) hideContent(); }
    else if (s.d3 === 'content' && s.route && !(content && content.route === s.route)) {
      restoring = !(content && view && view.key === objectForRoute(s.route));
      openRoute(s.route);
    }
  } finally { popping--; }
});

// ---------- renderer / scene ----------
const canvas = $('desk');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
catch (e) { $('loader').textContent = 'Dein Gerät kann die 3D-Ansicht leider nicht anzeigen. Du kommst gleich zur klassischen Seite …'; canvas.remove(); setTimeout(() => location.replace('../index.html' + location.hash), 1800); throw e; }
const SMALL = Math.min(innerWidth, innerHeight) < 700;
renderer.setPixelRatio(Math.min(devicePixelRatio, SMALL ? 1.5 : 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const aniso = renderer.capabilities.getMaxAnisotropy();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 100);
camera.position.set(10, 9.5, 10); camera.lookAt(0, 0, 0);

const hemi = new THREE.HemisphereLight(0xffffff, 0xBFC8E8, 1.5); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.4);
sun.position.set(-4, 10, 6); sun.castShadow = true; sun.shadow.mapSize.set(SMALL ? 1024 : 2048, SMALL ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 }); sun.shadow.bias = -0.0005; sun.shadow.radius = 4;
scene.add(sun);

// ---------- helpers ----------
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .55, ...o });
function mesh(geo, mat, x = 0, y = 0, z = 0) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; }
function rbox(w, h, d, r = .06) { // rounded box via extrude
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 2, curveSegments: 6 });
  g.rotateX(Math.PI / 2); g.translate(0, h, 0); return g; // bottom at y=0
}
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso; return t;
}
const font = (g, s, w = 700, fam = "'Atkinson Hyperlegible'") => { g.font = `${w} ${s}px ${fam}`; };
const loadImg = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });

// ---------- objects ----------
function makeLaptop() {
  const g = new THREE.Group(), body = std('#C9CFDD', { metalness: .3, roughness: .4 });
  g.add(mesh(rbox(2.2, .08, 1.5), body));
  const kb = mesh(new THREE.PlaneGeometry(1.9, .7), std('#2A3042')); kb.rotation.x = -Math.PI / 2; kb.position.set(0, .105, -.1); g.add(kb);
  const pad = mesh(new THREE.PlaneGeometry(.6, .32), std('#B4BBCB')); pad.rotation.x = -Math.PI / 2; pad.position.set(0, .104, .45); g.add(pad);
  const hinge = new THREE.Group(); hinge.position.set(0, .09, -.72); hinge.rotation.x = 1.5; g.add(hinge); g.userData.hinge = hinge;
  hinge.add(mesh(new THREE.BoxGeometry(2.2, 1.45, .06), body, 0, .72, 0));
  const scr = canvasTex(1024, 660, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#2C4FD0'); gr.addColorStop(1, C.tinteDark); c.fillStyle = gr; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(0, 0, w, 56);
    font(c, 30, 700); c.fillStyle = '#fff'; c.fillText('deutsch-mit-dennis.de', 32, 38);
    font(c, 96); c.fillText('Mein Kurs', 60, 190);
    [['A0', C.sun], ['A1', C.gruen], ['A2', C.mint], ['B1', C.sky], ['B2', C.marker]].forEach(([l, col], i) => {
      const x = 56 + i * 186, hh = 100 + i * 66, y = 600 - hh; c.fillStyle = col; c.beginPath(); c.roundRect(x, y, 158, hh, 18); c.fill();
      font(c, 60); c.fillStyle = i === 4 ? C.ink : '#fff'; c.fillText(l, x + 36, y + 72);
    });
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.04, 1.3), new THREE.MeshBasicMaterial({ map: scr, toneMapped: false }));
  screen.position.set(0, .72, .031); hinge.add(screen);
  return g;
}
function makeHeadphones() {
  const g = new THREE.Group(), band = std('#2A3042', { roughness: .4 }), cup = std(C.rot, { roughness: .35 }), pad = std('#3A4158', { roughness: .9 });
  const arc = mesh(new THREE.TorusGeometry(.62, .07, 14, 40, Math.PI), band); arc.position.y = .42; g.add(arc);
  [-1, 1].forEach(s => {
    const c = mesh(new THREE.CylinderGeometry(.27, .27, .22, 28), cup); c.rotation.z = Math.PI / 2; c.position.set(s * .62, .3, 0); g.add(c);
    const p = mesh(new THREE.CylinderGeometry(.23, .23, .08, 24), pad); p.rotation.z = Math.PI / 2; p.position.set(s * .5, .3, 0); g.add(p);
  });
  g.rotation.x = -.15; return g;
}
function makeBooks() {
  const g = new THREE.Group(), edge = std('#F3F0E6', { roughness: .95 });
  [[C.tinte, 1.5, 1.05, .24, 'A1'], [C.gruen, 1.4, 1.0, .2, 'B1'], [C.sun, 1.3, .92, .26, 'Lesen']].reduce((y, [col, w, d, h, label], i) => {
    const b = new THREE.Group(); b.position.y = y; b.rotation.y = [.08, -.12, .2][i]; g.add(b);
    b.add(mesh(new THREE.BoxGeometry(w, h, d), std(col, { roughness: .6 }), 0, h / 2, 0));
    b.add(mesh(new THREE.BoxGeometry(w - .06, h - .05, d + .005), edge, .03, h / 2, 0));
    const spine = canvasTex(512, 96, (c, W, H) => { c.fillStyle = col; c.fillRect(0, 0, W, H); font(c, 54); c.fillStyle = i === 2 ? C.ink : '#fff'; c.fillText(label, 30, 66); });
    const sp = new THREE.Mesh(new THREE.PlaneGeometry(w, h * .9), new THREE.MeshStandardMaterial({ map: spine, roughness: .6 })); sp.position.set(0, h / 2, d / 2 + .004); b.add(sp);
    return y + h;
  }, 0);
  return g;
}
function makeMic() {
  const g = new THREE.Group(), metal = std('#3A4158', { metalness: .6, roughness: .35 }), grille = std('#8C93A8', { metalness: .7, roughness: .3 });
  g.add(mesh(new THREE.CylinderGeometry(.42, .48, .1, 32), metal, 0, .05, 0));
  g.add(mesh(new THREE.CylinderGeometry(.05, .05, 1.2, 12), metal, 0, .7, 0));
  const head = new THREE.Group(); head.position.y = 1.35; head.rotation.x = .35; head.name = 'micHead'; g.add(head);
  head.add(mesh(new THREE.CylinderGeometry(.2, .2, .45, 24), grille, 0, 0, 0));
  head.add(mesh(new THREE.SphereGeometry(.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), grille, 0, .225, 0));
  head.add(mesh(new THREE.CylinderGeometry(.215, .215, .08, 24), std(C.tinte), 0, -.12, 0));
  return g;
}
function makeHeft() {
  const g = new THREE.Group();
  const cover = canvasTex(512, 680, (c, w, h) => {
    c.fillStyle = C.tinte; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.beginPath(); c.roundRect(70, 150, 372, 230, 16); c.fill();
    font(c, 58); c.fillStyle = C.tinte; c.fillText('DEUTSCH', 110, 240); font(c, 66, 600, 'Lehrerschrift'); c.fillStyle = C.rot; c.fillText('mit Dennis', 130, 330);
  });
  const karo = canvasTex(512, 680, (c, w, h) => { c.fillStyle = '#FBFBF8'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(35,65,181,.18)'; c.lineWidth = 2;
    for (let x = 0; x < w; x += 24) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } for (let y = 0; y < h; y += 24) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    font(c, 70, 600, 'Lehrerschrift'); c.fillStyle = C.tinte; c.fillText('Hallo!', 70, 150); });
  const paperM = std('#F3F0E6', { roughness: .9 }), karoM = new THREE.MeshStandardMaterial({ map: karo, roughness: .9 }), blueM = std(C.tinte);
  g.add(mesh(new THREE.BoxGeometry(1.16, .05, 1.56), [paperM, paperM, karoM, paperM, paperM, paperM], 0, .025, 0));
  const pivot = new THREE.Group(); pivot.position.set(-.6, .06, 0); g.add(pivot);
  const cg = new THREE.BoxGeometry(1.2, .02, 1.6); cg.translate(.6, 0, 0);
  pivot.add(mesh(cg, [blueM, blueM, new THREE.MeshStandardMaterial({ map: cover, roughness: .6 }), karoM, blueM, blueM]));
  g.userData.cover = pivot;
  // pen
  const pen = new THREE.Group(); pen.name = 'pen'; pen.position.set(.95, .05, .1); pen.rotation.set(0, .9, Math.PI / 2); g.add(pen);
  pen.add(mesh(new THREE.CylinderGeometry(.045, .045, 1.1, 14), std(C.tinteDark, { metalness: .3 })));
  pen.add(mesh(new THREE.ConeGeometry(.045, .16, 14), std('#C9CFDD', { metalness: .8, roughness: .2 }), 0, -.63, 0)).rotation.x = Math.PI;
  pen.add(mesh(new THREE.BoxGeometry(.02, .35, .03), std('#C9CFDD', { metalness: .8 }), .05, .35, 0));
  return g;
}
function makeGamepad() {
  const g = new THREE.Group(), shell = std('#5B45C9', { roughness: .4 }), dark = std('#2A3042');
  g.add(mesh(rbox(1.3, .2, .62, .2), shell, 0, .06, 0));
  [-1, 1].forEach(s => { const grip = mesh(new THREE.SphereGeometry(.3, 24, 16), shell, s * .55, .16, .2); grip.scale.set(1, .55, 1.15); g.add(grip); });
  g.add(mesh(new THREE.BoxGeometry(.32, .06, .1), dark, -.38, .3, -.02)); g.add(mesh(new THREE.BoxGeometry(.1, .06, .32), dark, -.38, .3, -.02));
  g.userData.buttons = [[C.rot, .5, -.02], [C.gruen, .38, .1], [C.sun, .38, -.14], [C.sky, .26, -.02]].map(([col, x, z]) => {
    const b = mesh(new THREE.CylinderGeometry(.055, .055, .08, 16), std(col, { roughness: .3 }), x, .3, z); g.add(b); return b; });
  [-1, 1].forEach(s => g.add(mesh(new THREE.CylinderGeometry(.09, .1, .08, 18), dark, s * .14, .3, .16)));
  return g;
}
function makeExam() {
  const g = new THREE.Group();
  const sheet = canvasTex(600, 820, (c, w, h) => {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); font(c, 52); c.fillStyle = C.ink; c.fillText('Probeprüfung', 50, 90);
    font(c, 30, 400); c.fillStyle = '#566078'; c.fillText('DTZ · telc · DTB', 50, 140);
    for (let i = 0; i < 5; i++) {
      const y = 220 + i * 100; c.strokeStyle = C.tinte; c.lineWidth = 5; c.strokeRect(50, y - 34, 44, 44);
      c.strokeStyle = C.rot; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(56, y - 12); c.lineTo(70, y + 4); c.lineTo(96, y - 34); c.stroke();
      c.fillStyle = '#DADFEA'; c.fillRect(120, y - 18, 380 - i * 30, 16);
    }
    c.save(); c.translate(380, 720); c.rotate(-.18); c.strokeStyle = C.rot; c.lineWidth = 8; c.strokeRect(-170, -60, 340, 110);
    font(c, 62, 600, 'Lehrerschrift'); c.fillStyle = C.rot; c.textAlign = 'center'; c.fillText('bestanden!', 0, 18); c.restore();
  });
  const paper = mesh(new THREE.BoxGeometry(1.3, .02, 1.78), [0, 1, 2, 3, 4, 5].map(i => i === 2 ? new THREE.MeshStandardMaterial({ map: sheet, roughness: .9 }) : std('#F6F6F2')), 0, .01, 0);
  g.add(paper);
  const under = mesh(new THREE.BoxGeometry(1.3, .02, 1.78), std('#EFEDE6'), .08, .0, -.06); under.rotation.y = .12; g.add(under);
  // trophy
  const gold = std('#E8B400', { metalness: .8, roughness: .25 });
  const t = new THREE.Group(); t.position.set(.95, 0, -.6); t.name = 'trophy'; g.add(t);
  t.add(mesh(new THREE.BoxGeometry(.4, .14, .4), std('#2A3042'), 0, .07, 0));
  t.add(mesh(new THREE.CylinderGeometry(.05, .08, .3, 12), gold, 0, .29, 0));
  t.add(mesh(new THREE.CylinderGeometry(.26, .1, .38, 24, 1, true), gold, 0, .62, 0));
  [-1, 1].forEach(s => { const h = mesh(new THREE.TorusGeometry(.1, .025, 8, 20), gold, s * .27, .66, 0); h.rotation.y = Math.PI / 2; t.add(h); });
  return g;
}
function makeGlobe() {
  const g = new THREE.Group(), wood = std('#8A5A33', { roughness: .7 }), brass = std('#C9A227', { metalness: .8, roughness: .3 });
  g.add(mesh(new THREE.CylinderGeometry(.35, .42, .1, 28), wood, 0, .05, 0));
  g.add(mesh(new THREE.CylinderGeometry(.05, .05, .5, 10), wood, 0, .3, 0));
  const ring = mesh(new THREE.TorusGeometry(.62, .025, 8, 48, Math.PI * 1.2), brass, 0, 1.05, 0); ring.rotation.set(0, 0, -.4 - Math.PI * .1); g.add(ring);
  const map = canvasTex(1024, 512, (c, w, h) => {
    c.fillStyle = '#4C79D8'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2;
    for (let x = 0; x < w; x += 64) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
    for (let y = 0; y < h; y += 64) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    // stylised Germany marker: flag stripes in a rounded patch
    [['#111', 0], ['#DD0000', 1], ['#FFCE00', 2]].forEach(([col, i]) => { c.fillStyle = col; c.fillRect(530, 120 + i * 26, 70, 26); });
    font(c, 40); c.fillStyle = '#fff'; c.fillText('Deutschland', 470, 240);
  });
  const sphere = mesh(new THREE.SphereGeometry(.55, 48, 32), new THREE.MeshStandardMaterial({ map, roughness: .5 }), 0, 1.05, 0);
  sphere.rotation.z = -.4; sphere.name = 'spin'; g.add(sphere);
  return g;
}
function makeRadio() {
  const g = new THREE.Group(), body = std(C.mint, { roughness: .45 }), dark = std('#2A3042'), cream = std('#F3F0E6');
  g.add(mesh(rbox(1.3, .78, .5, .12), body));
  const sp = mesh(new THREE.CylinderGeometry(.26, .26, .04, 32), dark, -.28, .4, .27); sp.rotation.x = Math.PI / 2; g.add(sp);
  const cone = mesh(new THREE.CylinderGeometry(.1, .1, .05, 24), std('#5A6178'), -.28, .4, .29); cone.rotation.x = Math.PI / 2; cone.name = 'cone'; g.add(cone);
  g.add(mesh(new THREE.BoxGeometry(.42, .16, .04), cream, .3, .5, .27));
  [.18, .42].forEach(x => { const k = mesh(new THREE.CylinderGeometry(.07, .07, .08, 20), cream, x, .22, .29); k.rotation.x = Math.PI / 2; g.add(k); });
  const ant = mesh(new THREE.CylinderGeometry(.015, .015, .9, 8), std('#C9CFDD', { metalness: .8 }), .45, 1.15, -.1); ant.rotation.z = -.5; g.add(ant);
  return g;
}
function makeBookStand() { // Dennis' own books (covers from the website data) + a learning package box
  const g = new THREE.Group(), wood = std('#8A5A33', { roughness: .7 });
  g.add(mesh(new THREE.BoxGeometry(2.0, .08, .55), wood, 0, .04, 0));
  g.add(mesh(new THREE.BoxGeometry(2.0, .14, .06), wood, 0, .15, .22));
  const books = ((window.DM && DM.books) || []).filter(b => b.amazon).slice(0, 3);
  const loader = new THREE.TextureLoader(), edge = std('#F3F0E6', { roughness: .9 });
  books.forEach((b, i) => {
    const tex = loader.load('../' + b.img.split('?')[0]); tex.colorSpace = THREE.SRGBColorSpace;
    const front = new THREE.MeshStandardMaterial({ map: tex, roughness: .55 }), dark = std('#2341B5');
    const book = mesh(new THREE.BoxGeometry(.56, .8, .07), [edge, dark, edge, edge, front, dark], (i - 1) * .64, .5, .05);
    book.rotation.x = -.2; g.add(book);
  });
  const box = mesh(rbox(.5, .32, .5, .06), std('#7A4FD8', { roughness: .4 }), 1.25, 0, .05); g.add(box); // PDF learning package
  g.add(mesh(new THREE.BoxGeometry(.52, .05, .1), std('#FFE45C'), 1.25, .34, .05));
  g.add(mesh(new THREE.BoxGeometry(.1, .05, .52), std('#FFE45C'), 1.25, .34, .05));
  return g;
}
function makeLamp() { // desk lamp: off by day, on at night (click toggles)
  const g = new THREE.Group(), metal = std('#2A3042', { metalness: .5, roughness: .4 }), shadeM = std(C.tinte, { roughness: .45, side: THREE.DoubleSide });
  g.add(mesh(new THREE.CylinderGeometry(.3, .34, .07, 28), metal, 0, .035, 0));
  const a1 = mesh(new THREE.CylinderGeometry(.035, .035, 1.0, 10), metal, .12, .52, 0); a1.rotation.z = -.25; g.add(a1);
  g.add(mesh(new THREE.SphereGeometry(.06, 12, 8), metal, .25, 1.0, 0));
  const a2 = mesh(new THREE.CylinderGeometry(.03, .03, .75, 10), metal, .55, 1.12, 0); a2.rotation.z = -1.25; g.add(a2);
  const head = new THREE.Group(); head.position.set(.88, 1.2, 0); head.rotation.z = -.55; g.add(head);
  const shade = mesh(new THREE.ConeGeometry(.26, .34, 28, 1, true), shadeM, 0, -.12, 0); head.add(shade);
  const bulbM = new THREE.MeshStandardMaterial({ color: '#FFF3C4', emissive: '#FFD27A', emissiveIntensity: 0, roughness: .3 });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(.09, 16, 12), bulbM); bulb.position.y = -.22; bulb.name = 'bulb'; head.add(bulb);
  const spot = new THREE.SpotLight(0xFFD9A0, 0, 9, .85, .7, 1.2); spot.position.set(0, -.2, 0); head.add(spot);
  const target = new THREE.Object3D(); target.position.set(.9, -3, 0); head.add(target); spot.target = target;
  g.userData.lamp = { bulbM, spot };
  return g;
}
// sticky note with today's challenge: series of days in a row (same memory as the website: localStorage dm-challenge)
function noteState() {
  let s = {}; try { s = JSON.parse(localStorage.getItem('dm-challenge') || '{}') || {}; } catch {}
  const f = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const now = new Date(), y = new Date(now); y.setDate(now.getDate() - 1);
  const alive = s.last === f(now) || s.last === f(y);
  return { streak: alive ? s.streak || 0 : 0, done: s.last === f(now) };
}
let noteTex = null;
function drawNote(c, w, h) {
  const st = noteState();
  c.fillStyle = '#FFE45C'; c.fillRect(0, 0, w, h);
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,255,255,.2)'); g.addColorStop(1, 'rgba(0,0,0,.07)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(0,0,0,.07)'; c.fillRect(0, 0, w, 36);
  const title = T('ch_zettel', 'Tages-Challenge'); let fs = 56; font(c, fs); while (c.measureText(title).width > w - 64 && fs > 30) { fs -= 2; font(c, fs); }
  c.fillStyle = C.ink; c.fillText(title, 32, 112);
  font(c, 124, 600, 'Lehrerschrift'); c.fillStyle = C.rot; c.fillText(st.streak ? `${st.streak} ${st.streak === 1 ? 'Tag' : 'Tage'}` : 'Heute!', 32, 272);
  font(c, 44); c.fillStyle = st.done ? C.gruen : C.tinte; c.fillText(st.done ? '✓ geschafft' : '10 Aufgaben · 3 Min.', 32, 380);
  font(c, 46, 600, 'Lehrerschrift'); c.fillStyle = C.tinte; c.fillText(st.done ? 'Bis morgen!' : 'Los geht’s →', 32, 462);
}
function makeNote() {
  const g = new THREE.Group();
  noteTex = canvasTex(512, 512, drawNote);
  const paper = new THREE.MeshStandardMaterial({ map: noteTex, roughness: .8 }), side = std('#EFCF3A', { roughness: .8 });
  const m = mesh(new THREE.BoxGeometry(.95, .012, .95), [side, side, paper, side, side, side], 0, .007, 0); m.rotation.x = -.015; g.add(m);
  return g;
}
function refreshNote() { if (!noteTex) return; drawNote(noteTex.image.getContext('2d'), noteTex.image.width, noteTex.image.height); noteTex.needsUpdate = true; }
addEventListener('focus', refreshNote);

function makeMug() { // decoration
  const g = new THREE.Group(), m = std('#fff', { roughness: .3 });
  g.add(mesh(new THREE.CylinderGeometry(.24, .22, .5, 28), m, 0, .25, 0));
  g.add(mesh(new THREE.CylinderGeometry(.21, .21, .02, 28), std('#5A3A22', { roughness: .2 }), 0, .47, 0));
  const h = mesh(new THREE.TorusGeometry(.13, .04, 10, 20), m, .26, .27, 0); g.add(h);
  const logo = canvasTex(256, 128, (c) => { c.fillStyle = '#fff'; c.fillRect(0, 0, 256, 128); font(c, 46, 600, 'Lehrerschrift'); c.fillStyle = C.tinte; c.fillText('Kaffee', 60, 80); });
  const l = new THREE.Mesh(new THREE.CylinderGeometry(.242, .222, .2, 28, 1, true, -.6, 1.2), new THREE.MeshStandardMaterial({ map: logo, transparent: true }));
  l.position.y = .26; l.rotation.y = Math.PI / 4; g.add(l);
  return g;
}

// ---------- desk + layout (built after fonts are loaded, so canvas text uses the right fonts) ----------
const objs = [];
const ringMat = new THREE.MeshBasicMaterial({ color: C.marker, transparent: true, opacity: .8, depthWrite: false });
function buildDesk() {
const deskGroup = new THREE.Group(); scene.add(deskGroup);
const wood = canvasTex(1024, 640, (c, w, h) => {
  c.fillStyle = '#C89463'; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) { c.strokeStyle = `rgba(110,62,28,${.05 + Math.random() * .12})`; c.lineWidth = 1 + Math.random() * 3; c.beginPath();
    const y = Math.random() * h; c.moveTo(0, y); c.bezierCurveTo(w * .3, y + Math.random() * 20 - 10, w * .6, y + Math.random() * 20 - 10, w, y + Math.random() * 16 - 8); c.stroke(); }
});
const top = mesh(new THREE.BoxGeometry(10, .35, 6), [std('#A8784E'), std('#A8784E'), new THREE.MeshStandardMaterial({ map: wood, roughness: .65 }), std('#A8784E'), std('#B9855A'), std('#A8784E')], 0, -.175, 0);
top.castShadow = false; deskGroup.add(top);
const mat = mesh(new THREE.BoxGeometry(4.2, .02, 2.6), std('#2A3042', { roughness: .95 }), .7, .01, .9); deskGroup.add(mat); // desk pad
[[-4.6, -2.6], [4.6, -2.6], [-4.6, 2.6], [4.6, 2.6]].forEach(([x, z]) => deskGroup.add(mesh(new THREE.BoxGeometry(.3, 2.4, .3), std('#8A5F3B'), x, -1.55, z)));

const LAYOUT = [
  ['laptop', makeLaptop, -.6, -1.4, .55, 1.5],
  ['globus', makeGlobe, -3.7, -1.7, .4, .8],
  ['buecher', makeBooks, 3.3, -1.8, -.2, 1.0],
  ['radio', makeRadio, 1.95, -1.9, .5, .9],
  ['pruefung', makeExam, -2.9, 1.2, .35, 1.2],
  ['heft', makeHeft, -.4, 1.3, .25, 1.0],
  ['gamepad', makeGamepad, 1.35, 1.0, .6, .85],
  ['kopfhoerer', makeHeadphones, 3.5, .7, .9, .85],
  ['mikrofon', makeMic, 3.8, 2.1, 0, .6],
  ['tasse', makeMug, -4.1, .1, 0, .55],
  ['zettel', makeNote, -1.9, 2.3, Math.PI / 4 - .12, .62],
  ['lampe', makeLamp, .8, -2.45, 1.2, .45],
  ['shop', makeBookStand, -3.9, 2.35, .62, 1.25],
];
LAYOUT.forEach(([key, make, x, z, ry, r], i) => {
  const holder = new THREE.Group(); holder.position.set(x, 0, z); deskGroup.add(holder);
  const obj = make(); obj.rotation.y += ry; holder.add(obj);
  let ring = null;
  if (key) { ring = new THREE.Mesh(new THREE.CircleGeometry(r, 48), ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = .025; ring.scale.setScalar(.001); holder.add(ring); }
  const box = new THREE.Box3().setFromObject(obj);
  objs.push({ key, holder, obj, ring, delay: .15 + i * .09, lift: 0, height: box.max.y });
  obj.traverse(m => { m.userData.key = key; });
});
}

// ---------- UI ----------
const chips = $('chips');
Object.entries(AREAS).forEach(([key, a]) => {
  if (a.noChip) return;
  const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `<span class="chip-i" aria-hidden="true">${CHIP_ICON[key] || ''}</span><span class="chip-l"></span>`; b.querySelector('.chip-l').textContent = areaTitle(key); b.dataset.key = key; b.style.setProperty('--i', chips.children.length);
  b.addEventListener('click', () => openObject(key)); chips.appendChild(b);
  const on = () => { if (!focusKey && !touring) { hovered = key; chipHover = key; } }, off = () => { if (chipHover === key) { chipHover = null; if (hovered === key) hovered = null; } };
  b.addEventListener('pointerenter', on); b.addEventListener('focus', on); b.addEventListener('pointerleave', off); b.addEventListener('blur', off);
});
let chipHover = null, life = null, hotChip = null, stickers = null;
let hovered = null, focusKey = null, focusObj = null, view = null, focusF = 0, zoomGoal = 1;
const fp = new THREE.Vector3(), center = new THREE.Vector3(), camOff = new THREE.Vector3(10, 9.5, 10);
const mouse = { x: 0, y: 0 }, par = { x: 0, y: 0 };
addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; }, { passive: true });
document.addEventListener('pointerleave', () => { mouse.x = mouse.y = 0; });
let lastFocus = null;
const setInert = on => document.querySelectorAll('.info, .top').forEach(e => { e.inert = on; });
function openObject(key, route) {
  if (mini && key !== 'lampe') { if (mini.key === key && !route) { restoreMini(); return; } discardMini(); }
  lastFocus = document.activeElement;
  if (key === 'lampe') { sound.play('click'); setNight(!night, true); return; }
  if (focusKey || view) return;
  if (life) { life.stopTease(); life.poke(key); }
  sound.play('open');
  focusKey = key; focusObj = objs.find(o => o.key === key); hovered = null; canvas.style.cursor = '';
  const size = new THREE.Box3().setFromObject(focusObj.obj).getSize(new THREE.Vector3()), r = Math.max(size.x, size.y, size.z, .8);
  zoomGoal = Math.min(7, (camera.top - camera.bottom) / (r * 2.6));
  document.body.classList.add('focused');
  setTimeout(() => {
    if (focusKey !== key || view) return;
    try { showView(key, route); }
    catch (err) { console.error(err); focusKey = null; focusObj = null; zoomGoal = 1; document.body.classList.remove('focused'); }
  }, reduced ? 0 : 850);
}
function showView(key, route) {
  const inst = VIEWS[key]({ renderer }), a = AREAS[key];
  const wrap = document.createElement('div'); wrap.className = `view view-${key}`; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', areaTitle(key));
  wrap.innerHTML = `<div class="view-bar"><button type="button" class="view-back">← Schreibtisch</button><span class="view-title">${areaTitle(key)}</span><button type="button" class="view-min" aria-label="${T('d3_min', 'Fenster verkleinern')}" title="${T('d3_min', 'Fenster verkleinern')}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button></div><div class="view-body"></div>`;
  wrap.querySelector('.view-body').append(inst.node);
  wrap.style.transformOrigin = '50% 55%';
  document.body.append(wrap); view = { wrap, inst, key }; setInert(true);
  d3Push('view', '');
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('in')));
  wrap.querySelector('.view-min').addEventListener('click', minimizeView);
  wrap.querySelector('.view-back').addEventListener('click', () => closeView()); wrap.querySelector('.view-back').focus({ preventScroll: true });
  inst.onOpen && inst.onOpen();
  if (route) setTimeout(() => showContent(route), reduced ? 0 : 500);
}
/* Minimize: the window disappears, the desk is free again, a small field top right brings the window back exactly as it was (page, scroll position, audio keep running) */
let mini = null;
function minimizeView() {
  if (!view) return;
  const { wrap, inst, key } = view, c = content;
  const title = (c && c.el.querySelector('.cf-title') && c.el.querySelector('.cf-title').textContent.trim()) || areaTitle(key);
  wrap.classList.add('is-min');
  mini = { wrap, inst, key, content: c, title };
  view = null; content = null; focusKey = null; focusObj = null; zoomGoal = 1;
  document.body.classList.remove('focused'); setInert(false); sound.play('close');
  const pill = document.createElement('div'); pill.className = 'mini-pill'; pill.id = 'mini-pill';
  pill.innerHTML = '<button type="button" class="mini-open"><span class="mini-i" aria-hidden="true">▢</span><span class="mini-t"></span></button><button type="button" class="mini-x" aria-label="×">×</button>';
  pill.querySelector('.mini-t').textContent = title;
  pill.querySelector('.mini-open').setAttribute('aria-label', T('d3_restore', 'Fenster wieder öffnen') + ': ' + title);
  pill.querySelector('.mini-open').addEventListener('click', restoreMini);
  pill.querySelector('.mini-x').addEventListener('click', discardMini);
  document.body.append(pill);
  try { stickers && stickers.refresh(.5); } catch {}
  pill.querySelector('.mini-open').focus({ preventScroll: true });
}
function restoreMini() {
  if (!mini || view || focusKey) return;
  const m = mini; mini = null; const pill = document.getElementById('mini-pill'); if (pill) pill.remove();
  lastFocus = document.activeElement;
  view = { wrap: m.wrap, inst: m.inst, key: m.key }; content = m.content;
  focusKey = m.key; focusObj = objs.find(o => o.key === m.key); hovered = null;
  const size = new THREE.Box3().setFromObject(focusObj.obj).getSize(new THREE.Vector3()), r = Math.max(size.x, size.y, size.z, .8);
  zoomGoal = Math.min(7, (camera.top - camera.bottom) / (r * 2.6));
  document.body.classList.add('focused'); setInert(true); sound.play('open');
  m.wrap.classList.remove('is-min');
  const f = m.wrap.querySelector('.cf-min, .view-min, .view-back'); if (f) f.focus({ preventScroll: true });
}
function discardMini() { // really close a minimized window (X on the field, or another object is opened)
  if (!mini) return; const m = mini; mini = null;
  const pill = document.getElementById('mini-pill'); if (pill) pill.remove();
  try { m.inst.dispose && m.inst.dispose(); } catch {}
  m.wrap.remove();
}
function closeView(then) {
  if (!view) return;
  d3Unwind(1 + (content ? 1 + content.depth : 0)); // closed with our own button: drop its history entries too
  content = null; const { wrap, inst } = view; view = null;
  wrap.classList.remove('in'); wrap.classList.add('out'); inst.dispose && inst.dispose();
  setTimeout(() => wrap.remove(), 380); sound.play('close');
  focusKey = null; document.body.classList.remove('focused'); setInert(false);
  setTimeout(() => { try { stickers && stickers.refresh(.5); } catch {} refreshNote(); }, 300); // practised inside? the new sticker pops on the desk, the note shows the new series
  try { if (!then && lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true }); } catch {}
  if (then) setTimeout(then, reduced ? 0 : 1100);
}
addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (content) hideContent(); else closeView(); });
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(e) {
  const r = canvas.getBoundingClientRect(); ndc.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
  camera.updateMatrixWorld(); ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(objs.filter(o => o.key).map(o => o.obj), true)[0];
  return hit ? hit.object.userData.key : null;
}
canvas.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || focusKey) return; hovered = pick(e); canvas.style.cursor = hovered ? 'pointer' : ''; });
canvas.addEventListener('pointerleave', () => { hovered = null; });
canvas.addEventListener('click', e => { if (touring) stopTour(); if (focusKey) return; const k = pick(e); if (k) openObject(k); });

soundButton($('snd'));

// progress count on the chips (same numbers as the stickers on the desk)
function chipCounts(counts) {
  chips.querySelectorAll('button').forEach(b => {
    const n = counts[b.dataset.key] || 0; let s = b.querySelector('.chip-n');
    if (!n) { s && s.remove(); return; }
    if (!s) { s = document.createElement('span'); s.className = 'chip-n'; b.append(s); }
    if (s.textContent !== String(n)) { s.textContent = n; s.setAttribute('aria-label', `${n}× geübt`); }
  });
}

// ---------- layout / resize ----------
const CAM_R = Math.hypot(10, 10), AZ_PHONE = 72 * Math.PI / 180;
let phone = false, base = { w: 1, h: 1, offX: 0, offY: 0 };
function resize() {
  const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false);
  phone = w <= 900 || h > w;
  const info = document.querySelector('.info').getBoundingClientRect();
  // narrow portrait phones: turn the view so the long desk side runs more top-to-bottom -> objects appear bigger
  const turn = w < 600 && h > w, az = turn ? AZ_PHONE : Math.PI / 4;
  camOff.set(CAM_R * Math.sin(az), 9.5, CAM_R * Math.cos(az));
  const aspect = w / h, needW = turn ? (10 * Math.cos(az) + 6 * Math.sin(az)) * 1.01 : (phone ? 13.4 : 12.5), needH = phone ? 9 : 8.5;
  let fitW, fitH, offX = 0, offY = 0;
  if (phone) { fitW = .98; fitH = Math.max(.3, (info.top - 60) / h); offY = (h - (info.top + 50)) / 2; }
  else { const free = (w - info.right - 30) / w; fitW = Math.max(.4, free); fitH = .9; offX = -(info.right + 10) / 2; }
  const fs = Math.max(needW / (aspect * fitW), needH / fitH);
  camera.left = -fs * aspect / 2; camera.right = fs * aspect / 2; camera.top = fs / 2; camera.bottom = -fs / 2;
  base = { w, h, offX, offY }; camera.setViewOffset(w, h, offX, offY, w, h); camera.updateProjectionMatrix();
}
addEventListener('resize', resize);

// minimise / restore the info panel (state remembered in dmd.3d.infoMini)
const infoEl = $('info'), miniBtn = $('info-mini');
function setMini(on, keep = true) {
  infoEl.classList.toggle('mini', on);
  const label = on ? 'Fenster öffnen' : 'Fenster verkleinern';
  miniBtn.setAttribute('aria-expanded', String(!on)); miniBtn.setAttribute('aria-label', label); miniBtn.title = label;
  if (keep) try { localStorage.setItem('dmd.3d.infoMini', on ? '1' : '0'); } catch {}
  resize();
}
miniBtn.addEventListener('click', e => { e.stopPropagation(); setMini(!infoEl.classList.contains('mini')); });
infoEl.querySelector('h1').addEventListener('click', () => { if (infoEl.classList.contains('mini')) setMini(false); });
try { if (localStorage.getItem('dmd.3d.infoMini') === '1') setMini(true, false); } catch {}

// ---------- animation ----------
const tag = $('tag'), v = new THREE.Vector3(), clock = new THREE.Clock();
const outBounce = t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375; return n * (t -= 2.625 / d) * t + .984375; };
let started = 0;
let laptopOpen = 0, heftOpen = 0, lastActive = performance.now(), skip = 0;
['pointermove', 'pointerdown', 'keydown', 'wheel', 'resize', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastActive = performance.now(); }, { passive: true }));
let lastFrameMs = performance.now();
function frame() {
  const nowMs = performance.now();
  if (touring && nowMs - lastFrameMs < 28) return; // tour: ~35 fps is enough and leaves the GPU to the video (no stutter)
  if (!touring && !view && !focusKey && focusF < .001 && nowMs - lastActive > 10000 && (skip++ % 2)) return; // idle: ~30 fps
  // all motion is time-based (not per frame), so a slow phone shows the same thing at the same moment as a fast one
  const dt = Math.min(.1, (nowMs - lastFrameMs) / 1000 || .016); lastFrameMs = nowMs;
  const K = r => 1 - Math.pow(1 - r, dt * 60);
  const time = clock.getElapsedTime(), t0 = time - started;
  if (view && focusF > .995) { if (view.inst.tick) view.inst.tick(); return; } // full-page view covers the desk (the notebook draws itself here)
  focusF += ((focusKey ? 1 : 0) - focusF) * (reduced ? 1 : K(.07));
  if (!focusKey && focusF < .002) { focusF = 0; focusObj = null; }
  if (focusObj) { focusObj.holder.getWorldPosition(fp); fp.y = focusObj.height * .45; }
  center.copy(fp).multiplyScalar(focusF);
  // gentle parallax: the desk turns a little with the mouse (not while zoomed in)
  const pf = (1 - focusF) * (reduced || !canHover ? 0 : 1);
  par.x += (mouse.x * pf - par.x) * K(.05); par.y += (mouse.y * pf - par.y) * K(.05);
  camera.position.copy(center).add(camOff); camera.position.x += par.x * .9; camera.position.z -= par.x * .9; camera.position.y += par.y * .8; camera.lookAt(center);
  camera.zoom = 1 + (zoomGoal - 1) * focusF;
  camera.setViewOffset(base.w, base.h, base.offX * (1 - focusF), base.offY * (1 - focusF), base.w, base.h); camera.updateProjectionMatrix();
  laptopOpen += ((focusKey === 'laptop' ? 1 : 0) - laptopOpen) * K(.08); heftOpen += ((focusKey === 'heft' ? 1 : 0) - heftOpen) * K(.08);
  const lap = objs.find(o => o.key === 'laptop'), hf = objs.find(o => o.key === 'heft');
  if (stickers) stickers.tick(time);
  if (life) life.tick(time, { hovered, focusKey, busy: touring || !!view, idleMs: performance.now() - lastActive, night });
  if (lap) lap.obj.userData.hinge.rotation.x = 1.5 + (-.22 - 1.5) * Math.max(laptopOpen, life ? life.open.laptop : 0);
  if (hf) hf.obj.userData.cover.rotation.z = 3.05 * Math.max(heftOpen, life ? life.open.heft : 0);
  objs.forEach(o => {
    const drop = reduced ? 1 : outBounce(Math.min(1, Math.max(0, (t0 - o.delay) / .8)));
    const active = o.key && (o.key === hovered || o.key === focusKey);
    o.lift += ((active ? .32 : 0) - o.lift) * K(.15);
    o.holder.position.y = (1 - drop) * 7 + o.lift + (o.hop || 0);
    o.obj.rotation.z = active && !reduced ? Math.sin(time * 3) * .03 : o.obj.rotation.z * Math.pow(.9, dt * 60);
    if (o.ring) { const s = o.ring.scale.x + ((active ? 1 : recSet.has(o.key) ? .55 : .001) - o.ring.scale.x) * K(.18); o.ring.scale.setScalar(s); o.ring.position.y = .025 - o.lift; }
    if (!reduced) o.obj.getObjectByName('spin')?.rotateY(.006 * dt * 60);
  });
  const show = touring ? focusKey : (focusKey ? null : hovered || (life && life.teasing));
  const hot = focusKey ? null : hovered; // desk -> chip: the matching button lights up
  if (hot !== hotChip) { hotChip = hot; chips.querySelectorAll('button').forEach(b => b.classList.toggle('hot', b.dataset.key === hot)); }
  if (show) {
    const o = objs.find(x => x.key === show); v.set(o.holder.position.x, o.height + o.lift + .35, o.holder.position.z).project(camera);
    tag.style.left = ((v.x + 1) / 2 * innerWidth) + 'px'; tag.style.top = ((1 - v.y) / 2 * innerHeight) + 'px';
    const n = stickers ? stickers.count(show) : 0, label = areaTitle(show) + (n ? ` · ${n}×` : '');
    if (tag.textContent !== label) { tag.textContent = label; tag.classList.remove('pop'); void tag.offsetWidth; tag.classList.add('pop'); } tag.hidden = false;
  } else tag.hidden = true;
  renderer.render(scene, camera);
}

(async () => {
  await Promise.all([document.fonts.load("700 40px 'Atkinson Hyperlegible'"), document.fonts.load('600 40px Lehrerschrift')]).catch(() => {});
  buildDesk();
  setNight(night);
  resize(); started = clock.getElapsedTime();
  try { life = addLife({ scene, objs, reduced }); } catch (err) { console.error(err); } // decoration only: never block the desk
  try { stickers = addStickers({ objs, progress, reduced, onCounts: chipCounts, onPop: () => sound.play('pop') }); stickers.refresh(1.6); } catch (err) { console.error(err); }
  $('loader').classList.add('off');
  renderer.setAnimationLoop(frame);
  deskReady = true; if (pendingRoute) setTimeout(() => openRoute(pendingRoute), 300);
})();


// ---------- real website content inside the objects (copy in ./site, original untouched) ----------
const ROUTES = [ // first match wins: route prefix -> desk object
  ['ueben/schreiben', 'heft'], ['ueben/sprechen', 'mikrofon'], ['bild', 'mikrofon'], ['ueben', 'mikrofon'],
  ['lernweg', 'laptop'], ['lernen', 'laptop'], ['videos', 'laptop'], ['wegweiser', 'laptop'], ['impressum', 'laptop'], ['datenschutz', 'laptop'],
  ['kahoot', 'gamepad'], ['challenge', 'zettel'], ['mikula', 'buecher'], ['lernpakete', 'shop'], ['musik', 'radio'],
  ['orientierungskurs', 'globus'], ['quellen', 'pruefung'], ['material', 'heft'], ['ueber-mich', 'heft'], ['witz', 'tasse'], ['pinnwand', 'tasse'],
  ['hoeren', 'kopfhoerer'], ['lesen', 'buecher'], ['spiele', 'gamepad'],
  ['simulation', 'pruefung'], ['pruefung', 'pruefung'], ['vorbereitung', 'pruefung'],
  ['lid', 'globus'], ['lieder', 'radio'],
];
const objectForRoute = r => (ROUTES.find(([p]) => r === p || r.startsWith(p + '/')) || [, 'laptop'])[1];
let content = null; // { el, frame, key }
const HIDE_CSS = '.dm-backbar,.dm-header,.skip,#dm-tour,.dm-tour,.dm-news-toast,.dm-3d-switch{display:none!important}body{padding-top:0!important}.dm-tour-dim::before{display:none!important}main{padding-top:12px!important}';

function openRoute(route, opts = {}) {
  route = safeRoute(route); if (!route || !deskReady) return; const key = objectForRoute(route);
  if (view && (view.key === key || opts.stay)) { showContent(route, !!opts.stay); return; }
  if (view) { closeView(() => openObject(key, route)); return; }
  openObject(key, route);
}
window.dmOpenRoute = openRoute;

function showContent(route, stay = false) {
  if (!view) return;
  const key = view.key;
  if (content && content.key === key) { content.stay = content.stay || stay; turnTo(route); return; }
  const el = document.createElement('div'); el.className = `cf cf-${key}`;
  el.innerHTML = `<div class="cf-card"><div class="cf-bar"><button type="button" class="cf-back">\u2190 ${areaTitle(key)}</button><span class="cf-title">Lädt …</span><button type="button" class="cf-min" aria-label="${T('d3_min', 'Fenster verkleinern')}" title="${T('d3_min', 'Fenster verkleinern')}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button></div>
    <div class="cf-page"><iframe class="cf-frame" title="Inhalt" src="../index.html#${route}"></iframe></div></div>`;
  view.wrap.append(el);
  const frame = el.querySelector('iframe');
  content = { el, frame, key, route, stay, depth: 0, back: false, stack: [route] };
  d3Push('content', route);
  el.querySelector('.cf-back').addEventListener('click', cfBack);
  el.querySelector('.cf-min').addEventListener('click', minimizeView);
  frame.addEventListener('load', () => wireFrame(frame));
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
}
function wireFrame(frame) {
  let w; try { w = frame.contentWindow; } catch { return; }
  w.addEventListener('keydown', e => { if (e.key === 'Escape') hideContent(); });
  const doc = w.document, st = doc.createElement('style'); st.textContent = HIDE_CSS; doc.head.append(st);
  try { w.sessionStorage.setItem('dm-tour-seen', '1'); } catch {}
  const title = () => { if (content) content.el.querySelector('.cf-title').textContent = (doc.title || '').replace(/ – Deutsch mit Dennis$/, ''); };
  title(); try { new w.MutationObserver(title).observe(doc.querySelector('title') || doc.head, { childList: true, characterData: true, subtree: true }); } catch {}
  w.addEventListener('hashchange', () => {
    const r = w.location.hash.slice(1); if (!content) return;
    const k = objectForRoute(r);
    if (k !== content.key && !content.stay) { openRoute(r); return; } // another object: fly over on the desk (not in notebook mode)
    // stack of visited routes: works for our own back button and for the browser's back/forward (both move the iframe's history)
    const st = content.stack; content.route = r;
    if (st.length > 1 && st[st.length - 2] === r) st.pop(); else if (st[st.length - 1] !== r) st.push(r);
    content.depth = st.length - 1; content.back = false; d3Url(r); updBack(); pageTurn(); setTimeout(title, 300);
  });
}
function pageTurn() { // new page swings in like a turned sheet
  if (!content || reduced) return; const c = content.el.querySelector('.cf-page');
  c.classList.remove('turn'); void c.offsetWidth; c.classList.add('turn');
}
function turnTo(route) {
  if (!content) return; const w = content.frame.contentWindow;
  if (w && w.location) { if (w.location.hash.slice(1) === route) return; w.location.hash = route; } // hashchange -> pageTurn
}
function hideContent() {
  if (!content) return; d3Unwind(1 + content.depth); const { el } = content; content = null;
  el.classList.remove('in'); el.classList.add('out'); setTimeout(() => el.remove(), reduced ? 0 : 450);
}
// links in the object views that point to the real site open inside the 3D desk instead
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="https://deutsch-mit-dennis.de/#"]'); if (!a || !a.closest('.view')) return;
  e.preventDefault(); openRoute(a.getAttribute('href').split('#')[1], { stay: !!a.closest('.hf-links') });
}, true);

// ---------- guided tour: German = website welcome video (lip-synced), other languages = Dennis' ElevenLabs clone ----------
const SITE_BASE = '../'; // where the real website lives (build: '../')
const TOURS = {
  de: { label: 'Deutsch', media: SITE_BASE + 'assets/avatar/willkommen.mp4', timings: 'tour/de-welcome.timings.json', video: true },
  uk: { label: 'Українська', media: 'tour/lang/uk.mp3', timings: 'tour/lang/uk.timings.json' },
  ru: { label: 'Русский', media: 'tour/lang/ru.mp3', timings: 'tour/lang/ru.timings.json' },
  tr: { label: 'Türkçe', media: 'tour/lang/tr.mp3', timings: 'tour/lang/tr.timings.json' },
  ar: { label: 'العربية', media: 'tour/lang/ar.mp3', timings: 'tour/lang/ar.timings.json', rtl: true },
};
const TOUR_SPLIT = { kopfhoerer: 'buecher', globus: 'radio' }; // second object mentioned in the same sentence
let touring = false, tourLang = 'de';
try { const l = localStorage.getItem('dmd.3d.tourLang'); if (TOURS[l]) tourLang = l; else { const b = (navigator.languages || [navigator.language]).map(x => String(x).slice(0, 2)).find(x => TOURS[x]); if (b) tourLang = b; } } catch {}
function previewObject(key) { // camera flies in, object opens a little, no full-page view
  if (!key) { focusKey = null; return; }
  focusKey = key; focusObj = objs.find(o => o.key === key);
  const size = new THREE.Box3().setFromObject(focusObj.obj).getSize(new THREE.Vector3()), r = Math.max(size.x, size.y, size.z, .8);
  zoomGoal = Math.max(2.2, Math.min(4.5, (camera.top - camera.bottom) / (r * 3)));
}
const stepKeys = s => s.includes('>') ? s.split('>') : (TOUR_SPLIT[s] ? [s, TOUR_SPLIT[s]] : [s]);
const timingsCache = {}; // loaded early, so play() can start inside the tap (iPhone blocks play() after a network wait)
const loadTimings = l => timingsCache[l] ? Promise.resolve(timingsCache[l]) : fetch(TOURS[l].timings, { cache: 'no-store' }).then(r => r.json()).then(j => (timingsCache[l] = j));
loadTimings(tourLang).catch(() => {});
const TOUR_LEAD = .7; // the camera starts flying this many seconds before the word is spoken, so the object is there when it is named
const lastWhere = (arr, fn) => { let r = -1; for (let i = 0; i < arr.length; i++) if (fn(arr[i])) r = i; return r; };
let tourRun = 0; // only the newest tour run may drive subtitles and camera (switching the language mid-tour must not leave the old loop running)
async function startTour() {
  const run = ++tourRun;
  discardMini();
  if (view) closeView();
  const T = TOURS[tourLang];
  const box = document.getElementById('tourbox'), media = document.getElementById('tour-media'), sub = document.getElementById('tour-sub'), sub2 = document.getElementById('tour-sub2');
  const pauseBtn = document.getElementById('tour-pause'); if (pauseBtn) pauseBtn.textContent = 'Pause';
  media.preload = 'auto'; if (!media.getAttribute('poster')) media.setAttribute('poster', SITE_BASE + 'assets/avatar/dennis-avatar.jpg');
  if (media.getAttribute('src') !== T.media) { media.src = T.media; media.load(); }
  media.currentTime = 0;
  const playing = media.play(); // inside the tap, before any await
  let timings = timingsCache[tourLang]; if (!timings) { try { timings = await loadTimings(tourLang); } catch { return; } }
  if (run !== tourRun) return;
  box.classList.toggle('is-video', !!T.video); sub.dir = T.rtl ? 'rtl' : 'auto'; sub.lang = tourLang;
  sub.textContent = timings.steps[0].text; sub2.textContent = tourLang === 'de' ? '' : timings.steps[0].de || ''; // subtitles always on
  touring = true; document.body.classList.add('touring'); box.hidden = false;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25)); resize(); // lighter picture while the video plays
  try { localStorage.setItem('dmd.3d.tourDone', '1'); } catch {}
  document.getElementById('tour-start')?.classList.add('used');
  let lastCam = '', lastSub = -1;
  const tick = () => {
    if (!touring || run !== tourRun) return;
    const t = media.currentTime, tc = t + TOUR_LEAD, st = timings.steps;
    const si = lastWhere(st, s => t >= s.start - .05), ci = lastWhere(st, s => tc >= (s.cam ?? s.start) - .05);
    if (si >= 0 && si !== lastSub) { sub.textContent = st[si].text; sub2.textContent = tourLang === 'de' ? '' : (st[si].de || ''); lastSub = si; }
    if (ci >= 0) {
      const s = st[ci], keys = stepKeys(s.step);
      const part = s.cuts ? Math.min(keys.length - 1, s.cuts.filter(c => tc >= c).length) : Math.min(keys.length - 1, Math.max(0, Math.floor((tc - (s.cam ?? s.start)) / Math.max(.1, s.end - (s.cam ?? s.start)) * keys.length)));
      const k = keys[part], id = ci + ':' + k;
      if (id !== lastCam) { previewObject(k === 'desk' ? null : k); lastCam = id; }
    }
    requestAnimationFrame(tick);
  };
  const bubble = box.querySelector('.tour-bubble');
  media.onplay = () => bubble.classList.add('talking'); media.onpause = () => bubble.classList.remove('talking');
  media.onwaiting = () => bubble.classList.add('is-loading'); media.onplaying = () => bubble.classList.remove('is-loading');
  Promise.resolve(playing).catch(() => { if (pauseBtn) pauseBtn.textContent = 'Weiter'; }); // blocked by the browser: the button starts it
  requestAnimationFrame(tick);
  media.onended = stopTour;
}
function stopTour() {
  tourRun++; touring = false; const media = document.getElementById('tour-media'); media.pause();
  renderer.setPixelRatio(Math.min(devicePixelRatio, SMALL ? 1.5 : 2)); resize();
  document.getElementById('tourbox').hidden = true; document.body.classList.remove('touring'); previewObject(null);
}
// language buttons for the tour
(() => {
  const row = document.getElementById('tour-langs'); if (!row) return;
  row.innerHTML = Object.entries(TOURS).map(([k, t]) => `<button type="button" data-l="${k}" lang="${k}" aria-pressed="${k === tourLang}">${t.label}</button>`).join('');
  row.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; tourLang = b.dataset.l; try { localStorage.setItem('dmd.3d.tourLang', tourLang); } catch {}
    row.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); startTour(); });
  try { if (localStorage.getItem('dmd.3d.tourDone')) document.getElementById('tour-start')?.classList.add('used'); } catch {}
})();
document.getElementById('tour-start')?.addEventListener('click', startTour);
document.getElementById('tour-stop')?.addEventListener('click', stopTour);
document.getElementById('tour-pause')?.addEventListener('click', e => {
  const m = document.getElementById('tour-media'); if (m.paused) { m.play(); e.currentTarget.textContent = 'Pause'; } else { m.pause(); e.currentTarget.textContent = 'Weiter'; }
});

// legal + about links on the desk (always reachable, open inside the 3D desk)
document.querySelectorAll('[data-route]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openRoute(a.dataset.route); }));

// ---------- switch between 3D and the classic site, keeping the current page ----------
const classic = document.getElementById('to-classic');
function currentRoute() { try { return content ? content.frame.contentWindow.location.hash.slice(1) : ''; } catch { return ''; } }
if (classic) classic.addEventListener('click', e => { e.preventDefault(); location.href = '../index.html' + (currentRoute() ? '#' + currentRoute() : ''); });
// deep link: werkstatt.html#lernen opens that page inside the matching object
if (location.hash.length > 1) { try { pendingRoute = safeRoute(decodeURIComponent(location.hash.slice(1))); } catch { pendingRoute = null; } d3Url(''); /* the desk is the first entry; opening adds the route again */ if (deskReady && pendingRoute) openRoute(pendingRoute); }

// ---------- "Weitermachen": last learning page from the website's own memory (localStorage dmd.v1, same origin) ----------
function lastPage() { try { const m = JSON.parse(localStorage.getItem('dmd.v1') || '{}'); return m.last && m.last.route ? m.last : null; } catch { return null; } }
function renderResume() {
  const box = document.getElementById('resume'); if (!box) return;
  const l = lastPage(), first = recKeys[0], k = box.querySelector('.r-k'), lv = readLevel();
  // same logic as the start page: with a chosen level the one big button is the next step of the course
  if (lv) { box.hidden = false; k.textContent = T('next_step', 'Dein nächster Schritt'); box.querySelector('b').textContent = 'Kurs ' + lv; box.onclick = () => openRoute('kurs/' + lv); }
  else if (l) { box.hidden = false; k.textContent = T('go_cont', 'Weitermachen'); box.querySelector('b').textContent = l.title || l.route; box.onclick = () => openRoute(l.route); }
  else if (first) { box.hidden = false; k.textContent = T('go_start', 'Jetzt starten'); box.querySelector('b').textContent = areaTitle(first); box.onclick = () => openObject(first); }
  else box.hidden = true;
}
renderResume();
addEventListener('focus', renderResume);
// refresh the note whenever the user comes back to the desk
document.addEventListener('click', e => { if (e.target.closest('.view-back')) setTimeout(renderResume, 600); });

// ---------- level (shared with the start page: dmd.v1 -> level) + language (dmd.lang) ----------
function readLevel() { try { const m = JSON.parse(localStorage.getItem('dmd.v1') || '{}'); return LEVEL_DESK[m.level] ? m.level : ''; } catch { return ''; } }
function writeLevel(lv) { try { const m = JSON.parse(localStorage.getItem('dmd.v1') || '{}'); m.level = lv; localStorage.setItem('dmd.v1', JSON.stringify(m)); } catch {} }
function applyLevel(lv) {
  recKeys = (LEVEL_DESK[lv] || []).filter(k => AREAS[k]); recSet = new Set(recKeys);
  chips.classList.toggle('has-level', !!recKeys.length);
  chips.querySelectorAll('button').forEach((b, n) => { const i = recKeys.indexOf(b.dataset.key); if (i >= 0) { b.dataset.rec = i + 1; b.style.order = i; } else { delete b.dataset.rec; b.style.order = recKeys.length ? 100 + n : ''; } }); // recommended chips first, in order
  document.querySelectorAll('#lvl3d [data-lv]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lv === lv)));
  renderResume();
}
document.querySelectorAll('#lvl3d [data-lv]').forEach(b => b.addEventListener('click', () => { const lv = b.getAttribute('aria-pressed') === 'true' ? '' : b.dataset.lv; writeLevel(lv); applyLevel(lv); }));
function relabel() {
  chips.querySelectorAll('button').forEach(b => { const l = b.querySelector('.chip-l'); if (l) l.textContent = areaTitle(b.dataset.key); });
  renderResume(); refreshNote();
}
(() => {
  const H = HI(), sel = document.getElementById('lang3d');
  if (H && sel) {
    sel.innerHTML = H.langs.map(([c, n]) => `<option value="${c}" lang="${c}">${n}</option>`).join('');
    sel.value = H.get();
    sel.addEventListener('change', () => { H.set(sel.value); relabel(); });
    H.apply(document);
  }
  applyLevel(readLevel());
  addEventListener('focus', () => applyLevel(readLevel())); // level may have been changed on the start page in another tab
})();

// ---------- one-time invitation to the tour ----------
(() => {
  const KEY = 'dmd.3d.tourHint'; let seen = false; try { seen = !!localStorage.getItem(KEY); } catch {}
  const hint = document.getElementById('tour-hint'); if (!hint) return; if (seen) { hint.remove(); return; }
  const done = () => { hint.hidden = true; try { localStorage.setItem(KEY, '1'); } catch {} };
  hint.hidden = false; hint.classList.add('th-wait'); // takes its place right away, invisible: no layout jump when it fades in
  setTimeout(() => { if (!touring && !view) hint.classList.remove('th-wait'); }, 2500);
  hint.querySelector('.th-x').addEventListener('click', done);
  document.getElementById('tour-start')?.addEventListener('click', done);
})();

// ---------- (2) one back button: page by page inside the frame, then close ----------
function updBack() { if (!content) return; const b = content.el.querySelector('.cf-back'); b.textContent = content.depth > 0 ? '\u2190 Zurück' : '\u2190 ' + areaTitle(content.key); }
function cfBack() {
  if (content && content.depth > 0) { content.back = true; try { content.frame.contentWindow.history.back(); return; } catch {} }
  hideContent();
}

// ---------- (12) day / night: desk lamp ----------
let night = false;
function setNight(on, byUser = false) {
  night = on; const lamp = objs.find(o => o.key === 'lampe'); const L = lamp && lamp.obj.userData.lamp;
  hemi.intensity = on ? .55 : 1.5; hemi.color.set(on ? 0x8FA0D8 : 0xffffff);
  sun.intensity = on ? .45 : 2.4; sun.color.set(on ? 0x9DB0FF : 0xffffff);
  if (L) { L.spot.intensity = on ? 45 : 0; L.bulbM.emissiveIntensity = on ? 2.2 : 0; }
  document.body.classList.toggle('night', on);
  if (byUser) try { sessionStorage.setItem('dmd.3d.night', on ? '1' : '0'); } catch {}
}
{ const h = new Date().getHours(); let n = h < 7 || h >= 19; try { const s = sessionStorage.getItem('dmd.3d.night'); if (s) n = s === '1'; } catch {} night = n; }

// ---------- (4) keyboard: arrows choose an object, Enter opens; screen reader announcement ----------
{
  const live = document.createElement('p'); live.className = 'sr-only'; live.setAttribute('aria-live', 'polite'); document.body.append(live);
  const keys = Object.keys(AREAS).filter(k => !AREAS[k].noChip);
  addEventListener('keydown', e => {
    const tg = e.target instanceof Element ? e.target : document.body;
    if (view || touring || tg.closest('input, textarea, select, iframe')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); const i = keys.indexOf(hovered); hovered = keys[(i + (e.key === 'ArrowRight' ? 1 : keys.length - 1)) % keys.length];
      live.textContent = areaTitle(hovered) + ' – Enter';
    } else if ((e.key === 'Enter' || e.key === ' ') && hovered && (tg === document.body || tg === document.documentElement)) { e.preventDefault(); openObject(hovered); }
  });
}
// the 3D view was seen -> the website can stop highlighting the "NEU" badge
try { localStorage.setItem('dmd.3d.seen', '1'); } catch {}

// prepare the notebook in an idle moment (desk stays smooth, first opening is instant)
setTimeout(() => { const go = () => { if (!view && !touring) prewarmHeft(renderer); }; ('requestIdleCallback' in window) ? requestIdleCallback(go, { timeout: 4000 }) : go(); }, 3500);
