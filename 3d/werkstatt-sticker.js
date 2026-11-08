// Progress stickers on the desk: every object you have practised with gets a round sticker with the count.
// - counts come from the website's own memory (heft-buch.js progress(), localStorage dmd.v1)
// - the sticker is part of the object, so clicking it opens the object like the object itself
// - new progress since the last visit pops in with a bounce and a little burst (remembered in dmd.3d.stickers)
import * as THREE from 'three';

const MAP = { laptop: 'lernen', kopfhoerer: 'hoeren', buecher: 'lesen', mikrofon: 'sprechen', heft: 'schreiben', gamepad: 'spiele', radio: 'lieder', pruefung: 'pruefung', globus: 'lid' };
const SEEN_KEY = 'dmd.3d.stickers';
const TOP = { radio: .95 }; // objects with a thin antenna etc.: sticker sits on the body, not on the tip
const topOf = o => (TOP[o.key] ?? o.height) + .38;
const COLORS = ['#FFE45C', '#C2362B', '#2C86CF', '#1D7A45', '#7A4FD8', '#E8A800'];

function stickerTex(n) {
  const S = 160, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  g.shadowColor = 'rgba(23,32,54,.35)'; g.shadowBlur = 10; g.shadowOffsetY = 4;
  g.fillStyle = '#fff'; g.beginPath(); g.arc(S / 2, S / 2 - 4, 66, 0, Math.PI * 2); g.fill(); // white sticker edge
  g.shadowColor = 'transparent';
  g.fillStyle = '#1D7A45'; g.beginPath(); g.arc(S / 2, S / 2 - 4, 56, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#fff'; g.lineWidth = 9; g.lineCap = g.lineJoin = 'round'; // check mark
  g.beginPath(); g.moveTo(56, 52); g.lineTo(72, 66); g.lineTo(102, 36); g.stroke();
  g.fillStyle = '#fff'; g.font = `700 ${n > 99 ? 38 : 50}px 'Atkinson Hyperlegible', sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(n > 999 ? '999+' : String(n), S / 2, 104);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const dotTex = (() => { let t; return () => t || (t = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.beginPath(); g.arc(16, 16, 14, 0, Math.PI * 2); g.fill(); const x = new THREE.CanvasTexture(c); return x; })()); })();

export function addStickers({ objs, progress, reduced, onCounts, onPop }) {
  const by = k => objs.find(o => o.key === k);
  const items = new Map(); // key -> { sprite, n, pop, burst }
  let seen = {}; try { seen = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}') || {}; } catch {}
  let clock = 0;

  function place(key, n, isNew, startAt) {
    const o = by(key); if (!o) return;
    let it = items.get(key);
    if (!it) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false }));
      sprite.renderOrder = 8; sprite.userData.key = key; sprite.position.set(.15, topOf(o), .15);
      o.obj.add(sprite); it = { sprite, n: 0, pop: null, burst: [] }; items.set(key, it);
    }
    if (it.n !== n) { const old = it.sprite.material.map; it.sprite.material.map = stickerTex(n); it.sprite.material.needsUpdate = true; old && old.dispose(); it.n = n; }
    if (isNew && !reduced) {
      it.pop = startAt; it.popped = false;
      it.burst.forEach(b => b.parent && b.parent.remove(b));
      it.burst = COLORS.map((col, i) => { const b = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex(), color: col, transparent: true, depthWrite: false, depthTest: false, opacity: 0 })); b.renderOrder = 9; b.userData.key = key; b.userData.a = i / COLORS.length * Math.PI * 2 + Math.random() * .4; o.obj.add(b); return b; });
    }
  }

  function refresh(delay = 0) {
    const P = progress(), counts = {};
    let changed = false;
    Object.entries(MAP).forEach(([key, area]) => {
      const n = P[area] || 0; counts[key] = n; if (!n) return;
      const isNew = n > (seen[key] || 0);
      place(key, n, isNew, clock + delay + (isNew ? Object.keys(counts).length * .12 : 0));
      if (isNew) { seen[key] = n; changed = true; }
    });
    if (changed) try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch {}
    onCounts && onCounts(counts);
    return counts;
  }

  return {
    refresh,
    count: key => (items.get(key) || {}).n || 0,
    tick(time) {
      clock = time;
      items.forEach((it, key) => {
        const s = it.sprite, base = innerWidth < 600 ? .85 : .62;
        let k = 1;
        if (it.pop != null) {
          const t = (time - it.pop) / .9;
          if (t >= 0 && !it.popped) { it.popped = true; onPop && onPop(); }
          if (t < 0) k = 0; else if (t >= 1) { k = 1; it.pop = null; }
          else k = t < .5 ? (t / .5) * 1.35 : 1.35 - .35 * Math.sin((t - .5) / .5 * Math.PI / 2); // grow, overshoot, settle
          it.burst.forEach(b => {
            const bt = Math.max(0, Math.min(1, (time - (it.pop ?? time) ) / .9)), r = bt * .9;
            b.position.set(s.position.x + Math.cos(b.userData.a) * r, s.position.y + Math.sin(b.userData.a) * r * .7 + bt * .2, s.position.z);
            b.scale.setScalar(.1 * (1 - bt) + .02); b.material.opacity = t > 0 ? 1 - bt : 0;
          });
          if (it.pop == null) { it.burst.forEach(b => b.parent && b.parent.remove(b)); it.burst = []; }
        }
        s.scale.setScalar(base * k);
        if (!reduced) { s.material.rotation = Math.sin(time * 1.3 + key.length) * .08; s.position.y = topOf(by(key)) + Math.sin(time * 1.8 + key.length) * .035; }
      });
    },
  };
}
