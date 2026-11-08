// "Leben" on the desk: small ambient animations that make the objects feel real and invite a click.
// - mug steam, radio notes + pulsing speaker, blinking mic "on air" light, laptop sleep LED, trophy glint
// - night: dust floating in the lamp light
// - idle teaser: when nobody moves the mouse, one object after another shows what it does (+ its label)
// - poke(key): squash-and-hop when an object is clicked
// Everything is skipped with prefers-reduced-motion (only the static LEDs stay).
import * as THREE from 'three';

const TEASE_ORDER = ['laptop', 'kopfhoerer', 'heft', 'gamepad', 'radio', 'globus', 'pruefung', 'mikrofon', 'buecher', 'shop', 'tasse'];
const TEASE_LEN = 1.6, TEASE_GAP = 3.2, IDLE_BEFORE_TEASE = 5000;

function spriteTex(size, draw) {
  const c = document.createElement('canvas'); c.width = c.height = size; draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const smooth = t => t * t * (3 - 2 * t);

export function addLife({ scene, objs, reduced }) {
  const by = k => objs.find(o => o.key === k);
  scene.updateMatrixWorld(true);
  const v = new THREE.Vector3();
  const localIn = (holder, obj) => { obj.getWorldPosition(v); return holder.worldToLocal(v.clone()); };
  const parts = []; // per-frame updaters

  // ---------- textures ----------
  const puff = spriteTex(64, (g, s) => { const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.5, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, s, s); });
  const note = (glyph, col, edge = '#fff') => spriteTex(96, (g, s) => { g.font = `700 ${s * .8}px "Segoe UI Symbol","Noto Music","DejaVu Sans",serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 8; g.strokeStyle = edge; g.strokeText(glyph, s / 2, s / 2); g.fillStyle = col; g.fillText(glyph, s / 2, s / 2); });
  const star = spriteTex(64, (g, s) => {
    const c = s / 2; g.fillStyle = '#fff'; g.beginPath();
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? s * .09 : s * .48; g.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r); }
    g.closePath(); g.shadowColor = '#FFE45C'; g.shadowBlur = 10; g.fill();
  });
  const sprite = (map, opts = {}) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false, opacity: 0, ...opts })); s.renderOrder = 5; return s; };

  // ---------- static LEDs (also with reduced motion) ----------
  const ledM = (col) => new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, roughness: .3 });
  const lap = by('laptop');
  const lapLed = lap && new THREE.Mesh(new THREE.SphereGeometry(.028, 10, 8), ledM('#7CF5B0'));
  if (lapLed) { lapLed.position.set(.85, .06, .76); lap.obj.add(lapLed); }
  const mic = by('mikrofon'), micHead = mic && mic.obj.getObjectByName('micHead');
  const micLed = micHead && new THREE.Mesh(new THREE.SphereGeometry(.04, 12, 8), ledM('#FF3B30'));
  if (micLed) { micLed.position.set(.155, -.12, .155); micHead.add(micLed); }

  // ---------- squash/hop state per object ----------
  const anim = new Map(); // key -> { t0, kind }
  const hop = (o, t) => { // t 0..1: two small bounces + squash on landing
    const h = Math.abs(Math.sin(t * Math.PI * 2)) * (1 - t) * .32;
    const sq = Math.sin(t * Math.PI * 4) * (1 - t) * .09;
    o.hop = h; o.obj.scale.set(1 - sq * .5, 1 + sq, 1 - sq * .5);
  };
  const rest = o => { o.hop = 0; o.obj.scale.set(1, 1, 1); };
  const open = { laptop: 0, heft: 0 }; // extra lid/cover opening, read by werkstatt.js

  if (!reduced) {
    // mug steam
    const mug = by('tasse');
    if (mug) {
      const steam = [0, 1, 2, 3].map(i => { const s = sprite(puff, { color: '#D3DBEA' }); mug.holder.add(s); return s; });
      parts.push(time => steam.forEach((s, i) => {
        const p = ((time / 2.8) + i / steam.length) % 1;
        s.position.set(Math.sin(p * 5 + i * 2) * .07, .52 + p * 1.0, Math.cos(p * 4 + i) * .05);
        s.scale.setScalar(.2 + p * .5); s.material.opacity = Math.sin(p * Math.PI) * .85;
      }));
    }
    // radio: notes float out of the speaker, cone pulses with the beat
    const radio = by('radio'), cone = radio && radio.obj.getObjectByName('cone');
    if (radio && cone) {
      const from = localIn(radio.holder, cone), cols = ['#2341B5', '#C2362B', '#1D7A45'], nightCols = ['#9DB4FF', '#FF8A7E', '#6FE3A0'];
      const glyph = i => i === 1 ? '♫' : '♪';
      const dayTex = cols.map((c, i) => note(glyph(i), c)), nightTex = nightCols.map((c, i) => note(glyph(i), c, '#172036'));
      const notes = [0, 1, 2].map(i => { const s = sprite(dayTex[i]); radio.holder.add(s); return s; });
      parts.push((time, st) => {
        const fast = st.hovered === 'radio' || st.tease === 'radio' ? 1.8 : 1;
        notes.forEach((s, i) => {
          const want = st.night ? nightTex[i] : dayTex[i]; if (s.material.map !== want) { s.material.map = want; s.material.needsUpdate = true; }
          const p = ((time * fast / 3.3) + i / notes.length) % 1;
          s.position.set(from.x + p * .7 + Math.sin(p * 9 + i) * .1, from.y + .55 + p * 1.3, from.z + .1 + p * .3);
          s.scale.setScalar(.4 + p * .12); s.material.opacity = Math.min(1, p * 5) * (1 - smooth(Math.max(0, p - .55) / .45)); s.material.rotation = Math.sin(time * 3 + i) * .3;
        });
        const beat = Math.pow(Math.max(0, Math.sin(time * Math.PI * 2 * fast)), 6);
        cone.scale.set(1 + beat * .25, 1, 1 + beat * .25);
      });
    }
    // mic: "on air" light blinks softly
    if (micLed) parts.push(time => { micLed.material.emissiveIntensity = .4 + (Math.sin(time * 3.2) * .5 + .5) * 2.2; });
    // laptop: slow "sleep" breathing
    if (lapLed) parts.push(time => { lapLed.material.emissiveIntensity = .2 + (Math.sin(time * 1.6) * .5 + .5) * 1.6; });
    // trophy: a glint every few seconds
    const exam = by('pruefung'), trophy = exam && exam.obj.getObjectByName('trophy');
    if (exam && trophy) {
      const at = localIn(exam.holder, trophy); const glint = sprite(star); exam.holder.add(glint);
      parts.push((time, st) => {
        const per = st.tease === 'pruefung' ? .8 : 3.6, p = (time % per) / per, k = p < .25 ? Math.sin(p / .25 * Math.PI) : 0;
        glint.position.set(at.x + .12, at.y + .82, at.z + .05); glint.scale.setScalar(.05 + k * .4); glint.material.opacity = k; glint.material.rotation = time * 2;
      });
    }
    // headphones: sound rings while teased or hovered
    const hp = by('kopfhoerer');
    if (hp) {
      const ringM = () => new THREE.MeshBasicMaterial({ color: '#FFE45C', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
      const rings = [0, 1].map(() => { const r = new THREE.Mesh(new THREE.TorusGeometry(.32, .018, 6, 40), ringM()); r.rotation.y = Math.PI / 2; hp.obj.add(r); return r; });
      let level = 0;
      parts.push((time, st) => {
        level += ((st.hovered === 'kopfhoerer' || st.tease === 'kopfhoerer' ? 1 : 0) - level) * .1;
        rings.forEach((r, i) => { const p = (time * 1.2 + i * .5) % 1; r.position.set((i ? 1 : -1) * (.75 + p * .25), .3, 0); r.scale.setScalar(.6 + p * .9); r.material.opacity = (1 - p) * .9 * level; r.visible = level > .02; });
      });
    }
    // gamepad: buttons light up one after another (on hover / tease, and briefly every 7 s)
    const pad = by('gamepad'), btns = pad && pad.obj.userData.buttons;
    if (btns) {
      btns.forEach(b => { b.material.emissive = b.material.color.clone(); });
      parts.push((time, st) => {
        const on = st.hovered === 'gamepad' || st.tease === 'gamepad', ph = on ? (time * 3) % btns.length : ((time % 7) < 1.2 ? (time % 7) / .3 : -9);
        btns.forEach((b, i) => { const d = Math.abs(ph - i); b.material.emissiveIntensity = d < 1 ? (1 - d) * 1.4 : 0; });
      });
    }
    // globe spins faster when it is pointed at
    const globe = by('globus'), sphere = globe && globe.obj.getObjectByName('spin');
    if (sphere) parts.push((time, st, dt) => { if (st.hovered === 'globus' || st.tease === 'globus') sphere.rotateY(dt * 3); });
    // pen "writes" on the notebook
    const heft = by('heft'), pen = heft && heft.obj.getObjectByName('pen');
    if (pen) { const r0 = pen.rotation.clone(), p0 = pen.position.clone(); parts.push((time, st) => {
      const w = st.tease === 'heft' || st.hovered === 'heft' ? 1 : 0;
      pen.rotation.y = r0.y + Math.sin(time * 14) * .06 * w; pen.position.x = p0.x + Math.sin(time * 7) * .05 * w; pen.position.y = p0.y + Math.abs(Math.sin(time * 14)) * .03 * w;
    }); }

    // night: dust in the lamp light
    const lamp = by('lampe'), bulb = lamp && lamp.obj.getObjectByName('bulb'), spot = lamp && lamp.obj.userData.lamp && lamp.obj.userData.lamp.spot;
    if (lamp && bulb && spot) {
      // dust only inside the light cone: from the bulb along the beam down to the desk
      const top = localIn(lamp.holder, bulb), tgt = localIn(lamp.holder, spot.target);
      const end = top.clone().lerp(tgt, top.y / Math.max(.01, top.y - tgt.y)); end.y = .05;
      const axis = end.clone().sub(top), len = axis.length(); axis.normalize();
      const u = new THREE.Vector3(0, 1, 0).cross(axis).normalize(), w = axis.clone().cross(u).normalize();
      const N = 34, pos = new Float32Array(N * 3), seed = [];
      for (let i = 0; i < N; i++) seed.push([Math.random(), Math.random() * Math.PI * 2, Math.sqrt(Math.random()), Math.random()]);
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: '#FFE2A8', size: 2, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      dust.renderOrder = 6; lamp.holder.add(dust);
      const P = new THREE.Vector3();
      parts.push((time, st) => {
        dust.material.opacity += ((st.night ? .9 : 0) - dust.material.opacity) * .05; dust.visible = dust.material.opacity > .01;
        if (!dust.visible) return;
        seed.forEach(([s0, a, r, sp], i) => {
          const s = .12 + ((s0 + time * .025 * (.4 + sp)) % 1) * .8, rr = r * s * len * .38, aa = a + time * .2 * (sp - .5);
          P.copy(top).addScaledVector(axis, s * len).addScaledVector(u, Math.cos(aa) * rr).addScaledVector(w, Math.sin(aa) * rr);
          pos[i * 3] = P.x; pos[i * 3 + 1] = Math.max(.05, P.y); pos[i * 3 + 2] = P.z;
        });
        geo.attributes.position.needsUpdate = true;
      });
    }
  }

  // ---------- idle teaser ----------
  let teaseKey = null, teaseT0 = 0, nextTease = 0, teaseIdx = 0, lastTime = 0;
  const teaseKeys = TEASE_ORDER.filter(k => by(k));

  return {
    open,
    get teasing() { return teaseKey; },
    poke(key) { if (reduced) return; const o = by(key); if (o) anim.set(key, { t0: lastTime, len: .7 }); },
    stopTease() { if (teaseKey) { const o = by(teaseKey); if (o) rest(o); anim.delete(teaseKey); } teaseKey = null; open.laptop = open.heft = 0; },
    tick(time, st) { // st: { hovered, focusKey, busy, idleMs, night }
      const dt = Math.min(.1, time - lastTime); lastTime = time;
      if (!reduced) {
        // teaser scheduling: only on a quiet desk
        const quiet = !st.busy && !st.hovered && !st.focusKey && st.idleMs > IDLE_BEFORE_TEASE;
        if (!quiet && teaseKey) this.stopTease();
        if (quiet && !teaseKey && time > nextTease && teaseKeys.length) {
          teaseKey = teaseKeys[teaseIdx++ % teaseKeys.length]; teaseT0 = time; anim.set(teaseKey, { t0: time, len: 1.1 });
        }
        if (teaseKey) {
          const p = (time - teaseT0) / TEASE_LEN, bump = Math.sin(Math.min(1, p) * Math.PI);
          open.laptop = teaseKey === 'laptop' ? bump * .4 : 0; open.heft = teaseKey === 'heft' ? bump * .3 : 0;
          if (p >= 1) { this.stopTease(); nextTease = time + TEASE_GAP; }
        } else if (!quiet) nextTease = Math.max(nextTease, time + 1.5);
        // hop / squash animations
        anim.forEach((a, key) => {
          const o = by(key), t = (time - a.t0) / a.len;
          if (t >= 1) { rest(o); anim.delete(key); } else hop(o, Math.max(0, t));
        });
      }
      const s = { ...st, tease: teaseKey };
      parts.forEach(f => f(time, s, dt));
    },
  };
}
