// "Das lebendige Heft" – scroll-driven 3D exercise book for Deutsch mit Dennis (test build).
import * as THREE from 'three';

const C = { tinte: '#2341B5', tinteDark: '#182E86', paper: '#FBFBF8', ink: '#172036', marker: '#FFE45C', rot: '#C2362B', gruen: '#1D7A45', muted: '#566078' };
const W = 2.4, H = 3.2;               // book page size (world units)
const STAGES = 5;                      // sections 0..5
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Opens the 3D notebook inside `host` (full-size element). Returns a controller {goTo, dispose}.
// With opts.renderer the notebook reuses an existing WebGL renderer (no second GPU context) and the caller calls tick() every frame.
export async function openHeft(host, { onStage, maxStage = 4, renderer: shared = null } = {}) {
let canvas = null, renderer = shared;
if (!shared) {
  canvas = document.createElement('canvas'); canvas.className = 'heft-canvas'; host.appendChild(canvas);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
}
const maxAniso = Math.min(4, renderer.capabilities.getMaxAnisotropy());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.5, 80);
scene.add(new THREE.HemisphereLight(0xffffff, 0xC9D2F0, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(-3, 5, 7); scene.add(sun);
const rim = new THREE.DirectionalLight(0x9fb2ff, 1.2); rim.position.set(5, -2, -4); scene.add(rim);

// ---------- helpers ----------
const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
const tex = c => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// Page canvas: squared paper, margin line, shadow near the spine.
function page(side) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 1366;
  const g = c.getContext('2d');
  g.fillStyle = C.paper; g.fillRect(0, 0, 1024, 1366);
  g.strokeStyle = 'rgba(35,65,181,.12)'; g.lineWidth = 2;
  for (let x = 20; x < 1024; x += 42) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 1366); g.stroke(); }
  for (let y = 20; y < 1366; y += 42) { g.beginPath(); g.moveTo(0, y); g.lineTo(1024, y); g.stroke(); }
  const mx = side === 'R' ? 1024 - 104 : 104;
  g.strokeStyle = 'rgba(194,54,43,.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(mx, 0); g.lineTo(mx, 1366); g.stroke();
  const sx = side === 'R' ? 0 : 1024, gr = g.createLinearGradient(sx, 0, side === 'R' ? 90 : 934, 0);
  gr.addColorStop(0, 'rgba(23,32,54,.18)'); gr.addColorStop(1, 'rgba(23,32,54,0)');
  g.fillStyle = gr; g.fillRect(side === 'R' ? 0 : 934, 0, 90, 1366);
  const x0 = side === 'R' ? 90 : 150;
  return { c, g, x0 };
}
const hand = (g, t, x, y, s, col = C.tinte, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); g.font = `600 ${s}px Lehrerschrift`; g.fillStyle = col; g.fillText(t, 0, 0); g.restore(); };
const sans = (g, t, x, y, s, col = C.ink, w = 700) => { g.font = `${w} ${s}px 'Atkinson Hyperlegible'`; g.fillStyle = col; g.fillText(t, x, y); };
function marker(g, t, x, y, s) {
  g.font = `700 ${s}px 'Atkinson Hyperlegible'`; const w = g.measureText(t).width;
  g.save(); g.fillStyle = C.marker; g.globalAlpha = .9; g.beginPath();
  g.moveTo(x - 10, y - s * .38); g.lineTo(x + w + 12, y - s * .46); g.lineTo(x + w + 8, y + s * .14); g.lineTo(x - 12, y + s * .2); g.fill(); g.restore();
  sans(g, t, x, y, s);
}
function check(g, x, y, s = 60, col = C.rot) {
  g.save(); g.strokeStyle = col; g.lineWidth = 10; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + s * .35, y + s * .4); g.lineTo(x + s, y - s * .55); g.stroke(); g.restore();
}
function icon(g, img, x, y, s, rot = 0) { if (!img) return; g.save(); g.translate(x + s / 2, y + s / 2); g.rotate(rot); g.drawImage(img, -s / 2, -s / 2, s, s); g.restore(); }
function bullets(g, items, x, y, s = 46, gap = 84) { items.forEach((t, i) => { hand(g, '–', x, y + i * gap, s + 6, C.rot); sans(g, t, x + 44, y + i * gap, s, C.ink, 400); }); }

// ---------- build the book ----------
async function build() {
  await Promise.all([
    document.fonts.load("600 40px Lehrerschrift"), document.fonts.load("700 40px 'Atkinson Hyperlegible'"), document.fonts.load("400 40px 'Atkinson Hyperlegible'")
  ]).catch(() => {});
  const names = ['kopfhoerer', 'buecher', 'mikrofon', 'spiel', 'pokal', 'schreiben', 'globus', 'stern', 'idee', 'sprechblase', 'noten'];
  const I = Object.fromEntries(await Promise.all(names.map(async n => [n, await loadImg(`../assets/3d/${n}.webp`)])));
  const dennis = await loadImg('../assets/dennis.webp');

  // Cover (front)
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 1366; let g = cv.getContext('2d');
  const cg = g.createLinearGradient(0, 0, 1024, 1366); cg.addColorStop(0, '#2C4FD0'); cg.addColorStop(1, C.tinteDark);
  g.fillStyle = cg; g.fillRect(0, 0, 1024, 1366);
  for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * .05})`; g.fillRect(Math.random() * 1024, Math.random() * 1366, 2, 2); }
  g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(0, 0, 60, 1366);
  g.fillStyle = '#fff'; g.beginPath(); g.roundRect(170, 300, 720, 470, 26); g.fill();
  g.strokeStyle = 'rgba(35,65,181,.35)'; g.lineWidth = 4; g.strokeRect(200, 330, 660, 410);
  sans(g, 'DEUTSCH', 250, 440, 108, C.tinte);
  hand(g, 'mit Dennis', 300, 560, 112, C.rot, -0.05);
  g.strokeStyle = C.line || '#DADFEA'; g.lineWidth = 3; g.beginPath(); g.moveTo(250, 680); g.lineTo(810, 680); g.stroke();
  sans(g, 'Name:', 250, 670, 38, C.muted, 400); hand(g, 'du!', 380, 668, 64, C.tinte, -0.04);
  sans(g, 'A1 · A2 · B1 · B2 · C1', 250, 900, 54, '#fff');
  icon(g, I.stern, 760, 1040, 170, .2);
  const coverTex = tex(cv);

  // Inside cover (left at stage 1)
  let p = page('L'); g = p.g;
  hand(g, 'Hallo!', p.x0, 200, 150, C.tinte, -0.04);
  if (dennis) { g.save(); g.beginPath(); g.arc(700, 420, 170, 0, Math.PI * 2); g.clip(); g.drawImage(dennis, 530, 250, 340, 340 * dennis.height / dennis.width); g.restore();
    g.strokeStyle = C.marker; g.lineWidth = 14; g.beginPath(); g.arc(700, 420, 176, 0, Math.PI * 2); g.stroke(); }
  sans(g, 'Ich bin Dennis.', p.x0, 360, 58);
  bullets(g, ['DaZ-Lehrer', 'Prüfer: DTZ, telc', 'Kostenlos lernen'], p.x0, 700, 48);
  hand(g, 'Viel Spaß beim Lernen!', p.x0, 1180, 80, C.rot, -0.03);
  const insideCover = tex(p.c);

  // Page 1 front (right, stage 1): Lektionen
  p = page('R'); g = p.g;
  hand(g, 'Seite 1', p.x0, 130, 64, C.rot);
  marker(g, 'Lektionen', p.x0, 270, 110);
  ['A1', 'A2', 'B1', 'B2'].forEach((l, i) => {
    const x = p.x0 + 20 + i * 180, h = 120 + i * 90, y = 900 - h;
    g.fillStyle = [C.gruen, '#2B9A78', '#2C86CF', C.tinte][i]; g.beginPath(); g.roundRect(x, y, 140, h, 16); g.fill();
    sans(g, l, x + 30, y + 70, 60, '#fff');
  });
  hand(g, 'Schritt für Schritt nach oben!', p.x0, 1040, 72, C.tinte, -0.03);
  icon(g, I.buecher, 700, 1120, 190, -.1);
  const p1f = tex(p.c);

  // Page 1 back (left, stage 2): Hören & Lesen
  p = page('L'); g = p.g;
  hand(g, 'Seite 2', p.x0, 130, 64, C.rot);
  marker(g, 'Hören', p.x0, 270, 110);
  icon(g, I.kopfhoerer, 640, 150, 220, .1);
  bullets(g, ['Dialoge aus dem Alltag', 'echte Stimmen', 'mit Fragen & Lösung'], p.x0, 450);
  marker(g, 'Lesen', p.x0, 820, 110);
  icon(g, I.buecher, 640, 720, 210, -.1);
  bullets(g, ['Texte nach Niveau', 'mit Aufgaben'], p.x0, 980);
  const p1b = tex(p.c);

  // Page 2 front (right, stage 2): Sprechen & Schreiben
  p = page('R'); g = p.g;
  hand(g, 'Seite 3', p.x0, 130, 64, C.rot);
  marker(g, 'Sprechen', p.x0, 270, 100);
  icon(g, I.mikrofon, 700, 140, 210, .12);
  hand(g, '„Ich heiße …"', p.x0, 420, 80, C.tinte);
  marker(g, 'Schreiben', p.x0, 650, 100);
  icon(g, I.schreiben, 700, 540, 200, -.1);
  sans(g, 'Ich habe gestern', p.x0, 820, 50, C.ink, 400);
  sans(g, 'ein Brief', p.x0, 900, 50, C.ink, 400);
  g.strokeStyle = C.rot; g.lineWidth = 6; g.beginPath(); g.moveTo(p.x0 + 10, 885); g.lineTo(p.x0 + 50, 885); g.stroke();
  hand(g, 'einen', p.x0 - 5, 860, 52, C.rot, -0.08);
  sans(g, 'geschrieben.', p.x0 + 220, 900, 50, C.ink, 400);
  check(g, p.x0 + 560, 900, 70);
  hand(g, 'Schreib-Check hilft dir!', p.x0, 1120, 72, C.rot, -0.03);
  const p2f = tex(p.c);

  // Page 2 back (left, stage 3): Spiele
  p = page('L'); g = p.g;
  hand(g, 'Seite 4', p.x0, 130, 64, C.rot);
  marker(g, 'Spiele', p.x0, 270, 110);
  icon(g, I.spiel, 600, 120, 260, .12);
  [['der', C.tinte], ['die', C.rot], ['das', C.gruen]].forEach(([w, col], i) => {
    const x = p.x0 + i * 250, y = 520;
    g.fillStyle = col; g.beginPath(); g.roundRect(x, y, 210, 120, 22); g.fill();
    sans(g, w, x + 50, y + 82, 64, '#fff');
  });
  sans(g, '? Tisch', p.x0, 780, 66);
  hand(g, 'der Tisch', p.x0 + 320, 780, 80, C.gruen, -0.04); check(g, p.x0 + 640, 770, 60, C.gruen);
  bullets(g, ['Artikel & Verben', 'Zahlen & Uhrzeit', 'Jump’n’Run mit Lino'], p.x0, 960);
  const p2b = tex(p.c);

  // Page 3 front (right, stage 3): Lieder
  p = page('R'); g = p.g;
  hand(g, 'Seite 5', p.x0, 130, 64, C.rot);
  marker(g, 'Lieder', p.x0, 270, 110);
  icon(g, I.noten, 640, 110, 240, -.1);
  g.strokeStyle = C.ink; g.lineWidth = 3;
  for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(p.x0, 470 + i * 26); g.lineTo(940, 470 + i * 26); g.stroke(); }
  [[0, 3], [1, 1], [2, 2], [3, 0], [4, 2], [5, 4]].forEach(([k, n]) => {
    const x = p.x0 + 60 + k * 120, y = 470 + n * 26; g.fillStyle = C.tinte;
    g.beginPath(); g.ellipse(x, y, 20, 15, -.4, 0, 7); g.fill(); g.fillRect(x + 16, y - 100, 5, 100);
  });
  hand(g, 'Singen, verstehen, behalten.', p.x0, 760, 72, C.tinte, -0.03);
  bullets(g, ['Liedtext zum Mitlesen', 'zum Mitsingen', 'bis C1'], p.x0, 900);
  const p3f = tex(p.c);

  // Page 3 back (left, stage 4): Prüfung
  p = page('L'); g = p.g;
  hand(g, 'Seite 6', p.x0, 130, 64, C.rot);
  marker(g, 'Prüfung', p.x0, 270, 110);
  icon(g, I.pokal, 620, 110, 240, .1);
  ['DTZ', 'telc B1 / B2', 'DTB B1 / B2'].forEach((t, i) => {
    const y = 470 + i * 140; g.strokeStyle = C.tinte; g.lineWidth = 5; g.strokeRect(p.x0, y - 60, 70, 70);
    check(g, p.x0 + 8, y - 22, 64); sans(g, t, p.x0 + 110, y, 60);
  });
  hand(g, 'bestanden!', p.x0 + 250, 1020, 130, C.rot, -0.12);
  g.strokeStyle = C.rot; g.lineWidth = 6; g.beginPath(); g.ellipse(p.x0 + 520, 980, 330, 110, -0.12, 0, 7); g.stroke();
  const p3b = tex(p.c);

  // Back cover inside (right, stage 4): Leben in Deutschland
  p = page('R'); g = p.g;
  hand(g, 'Seite 7', p.x0, 130, 64, C.rot);
  marker(g, 'Leben in', p.x0, 270, 100);
  marker(g, 'Deutschland', p.x0, 390, 100);
  icon(g, I.globus, 640, 470, 240, .1);
  bullets(g, ['Fragen üben', 'Test mit 33 Fragen'], p.x0, 560);
  hand(g, 'Los geht’s!', p.x0, 1080, 150, C.tinte, -0.06);
  check(g, p.x0 + 600, 1060, 110);
  const backInside = tex(p.c);

  // ---------- meshes ----------
  const book = new THREE.Group(); scene.add(book);
  const blue = new THREE.MeshStandardMaterial({ color: C.tinteDark, roughness: .6 });
  const paperEdge = new THREE.MeshStandardMaterial({ color: '#F3F1EA', roughness: .95 });
  const coverMat = (map) => new THREE.MeshStandardMaterial({ map, roughness: .55 });
  const paperMat = (map, side = THREE.FrontSide) => new THREE.MeshStandardMaterial({ map, roughness: .92, side });

  function boxAtSpine(w, h, d, mats) { const geo = new THREE.BoxGeometry(w, h, d); geo.translate(w / 2, 0, 0); return new THREE.Mesh(geo, mats); }

  // back cover + page block (static)
  const back = boxAtSpine(W + .06, H + .08, .03, [blue, blue, blue, blue, coverMat(backInside), blue]);
  back.position.z = -0.03; book.add(back);
  const block = boxAtSpine(W - .02, H - .02, .036, [paperEdge, paperEdge, paperEdge, paperEdge, paperMat(backInside), paperEdge]);
  block.position.z = -0.0; book.add(block);
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, H + .08, 16), blue); spine.position.z = -0.005; book.add(spine);

  // flippable leaves: cover + 3 pages
  const leaves = [];
  function addLeaf(front, backMap, isCover, zR, zL) {
    const pivot = new THREE.Group(); book.add(pivot);
    let geo = null, mesh;
    if (isCover) {
      mesh = boxAtSpine(W + .06, H + .08, .03, [blue, blue, blue, blue, coverMat(front), coverMat(backMap)]);
      pivot.add(mesh);
    } else {
      geo = new THREE.PlaneGeometry(W - .03, H - .04, 28, 1); geo.translate((W - .03) / 2, 0, 0);
      const bm = backMap.clone(); bm.wrapS = THREE.RepeatWrapping; bm.repeat.x = -1; bm.offset.x = 1; bm.needsUpdate = true;
      pivot.add(new THREE.Mesh(geo, paperMat(front, THREE.FrontSide)));
      pivot.add(new THREE.Mesh(geo, paperMat(bm, THREE.BackSide)));
      geo.userData.base = Float32Array.from(geo.attributes.position.array);
    }
    leaves.push({ pivot, geo, zR, zL, t: 0 });
  }
  addLeaf(coverTex, insideCover, true, 0.05, -0.05);
  addLeaf(p1f, p1b, false, 0.030, 0.012);
  addLeaf(p2f, p2b, false, 0.026, 0.016);
  addLeaf(p3f, p3b, false, 0.022, 0.020);

  // ---------- floating letters + icons ----------
  const floaters = new THREE.Group(); scene.add(floaters);
  function letterTex(t, col) {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    g.font = `700 ${t.length > 1 ? 104 : 170}px 'Atkinson Hyperlegible'`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 16; g.strokeStyle = '#fff'; g.lineJoin = 'round'; g.shadowColor = 'rgba(23,32,54,.25)'; g.shadowBlur = 18; g.shadowOffsetY = 8;
    g.strokeText(t, 128, 136); g.shadowColor = 'transparent'; g.fillStyle = col; g.fillText(t, 128, 136);
    return tex(c);
  }
  const small = innerWidth < 700;
  const items = [
    ['Ä', C.tinte], ['Ö', C.rot], ['Ü', C.gruen], ['ß', C.tinte], ['der', C.tinte], ['die', C.rot], ['das', C.gruen], ['?', '#E8A800'], ['!', C.rot], ['A1', C.gruen], ['B2', C.tinte],
    ...['kopfhoerer', 'mikrofon', 'spiel', 'pokal', 'globus', 'idee', 'sprechblase', 'noten', 'stern'].map(n => [n, null])
  ].filter((_, i) => !small || i % 3 !== 2);
  items.forEach(([t, col], i) => {
    let map;
    if (col) map = letterTex(t, col); else { map = new THREE.Texture(I[t]); map.colorSpace = THREE.SRGBColorSpace; map.needsUpdate = true; }
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false }));
    const a = (i / items.length) * Math.PI * 2 + Math.random() * .4, r = 3.6 + Math.random() * 2.6;
    s.position.set(Math.cos(a) * r, Math.sin(a) * r * .75, -1.4 - Math.random() * 3); // always behind the book
    const sc = col ? .75 + Math.random() * .45 : .9 + Math.random() * .4; s.scale.set(sc, sc, 1);
    s.userData = { base: s.position.clone(), ph: Math.random() * 6.28, sp: .4 + Math.random() * .5 };
    floaters.add(s);
  });

  return { book, leaves, floaters };
}

// ---------- layout + animation ----------
let stageTarget = 0, stage = 0, px = 0, py = 0, tpx = 0, tpy = 0, dist = 9, alive = true;
const onMove = e => { tpx = e.clientX / innerWidth - .5; tpy = e.clientY / innerHeight - .5; };
addEventListener('pointermove', onMove, { passive: true });
function resize() {
  // shared renderer draws the full window; centre the book inside the host's rectangle
  const r = host.getBoundingClientRect(), w = shared ? innerWidth : (r.width || innerWidth), h = shared ? innerHeight : (r.height || innerHeight);
  if (!shared) renderer.setSize(w, h, false);
  camera.aspect = w / h; const phone = w <= 900 || h > w;
  const hostH = shared ? (r.height || h) : h, cy = shared ? r.top + hostH / 2 : h / 2;
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), openW = 2 * W + .6, bookH = H + .6;
  dist = Math.max(openW / ((phone ? .97 : .8) * 2 * tan * camera.aspect), bookH / ((phone ? .62 : .82) * (hostH / h) * 2 * tan));
  camera.setViewOffset(w, h, 0, h / 2 - cy, w, h); camera.updateProjectionMatrix();
}
const ro = new ResizeObserver(resize); ro.observe(host); addEventListener('resize', resize);
function bend(leaf, t) {
  if (!leaf.geo) return;
  const pos = leaf.geo.attributes.position, base = leaf.geo.userData.base, k = Math.sin(t * Math.PI) * .55, w = W - .03;
  for (let i = 0; i < pos.count; i++) { const x = base[i * 3]; pos.array[i * 3 + 2] = -k * (x / w) ** 2; }
  pos.needsUpdate = true; leaf.geo.computeVertexNormals();
}
const { book, leaves, floaters } = await build();
if (!alive) return null;
resize();
const clock = new THREE.Clock();
const tick = () => {
  const time = clock.getElapsedTime();
  stage += (stageTarget - stage) * (reduced ? 1 : .09);
  px += (tpx - px) * .05; py += (tpy - py) * .05;
  leaves.forEach((L, i) => { const t = smooth(i + .1, i + .9, stage); bend(L, t); L.t = t; L.pivot.rotation.y = -t * Math.PI; L.pivot.position.z = THREE.MathUtils.lerp(L.zR, L.zL, t) + Math.sin(t * Math.PI) * .02; });
  const open = leaves[0].t;
  book.position.x = -W / 2 * (1 - open);
  book.position.y = reduced ? 0 : Math.sin(time * .8) * .05;
  book.rotation.y = THREE.MathUtils.lerp(-.4, 0, open) + (reduced ? 0 : Math.sin(time * .5) * .04 * (1 - open));
  book.rotation.x = -.14; book.rotation.z = THREE.MathUtils.lerp(.06, 0, open);
  camera.position.set(px * .6, -py * .4 + .1, dist); camera.lookAt(0, 0, 0);
  floaters.rotation.z = stage * .3 + (reduced ? 0 : time * .03);
  if (!reduced) floaters.children.forEach(s => { const u = s.userData; s.position.y = u.base.y + Math.sin(time * u.sp + u.ph) * .18; });
  renderer.render(scene, camera);
};
if (!shared) renderer.setAnimationLoop(tick);
return {
  tick,
  goTo(n) { stageTarget = clamp(Math.round(n), 0, maxStage); onStage && onStage(stageTarget); return stageTarget; },
  get stage() { return stageTarget; },
  dispose() {
    alive = false; ro.disconnect(); removeEventListener('pointermove', onMove); removeEventListener('resize', resize);
    // free GPU memory of the notebook scene
    scene.traverse(o => { o.geometry && o.geometry.dispose(); [].concat(o.material || []).forEach(m => { m.map && m.map.dispose(); m.dispose(); }); });
    if (!shared) { renderer.setAnimationLoop(null); renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); }
  },
};
}
