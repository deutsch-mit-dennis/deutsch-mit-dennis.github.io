// Optional desk sounds, generated in the browser (Web Audio) - no audio files, no licences.
// Off by default; the "Ton" button in the header switches it on (remembered in localStorage dmd.3d.sound).
const KEY = 'dmd.3d.sound';
let ctx = null, on = false;
try { on = localStorage.getItem(KEY) === '1'; } catch {}

// iPhone/iPad: Web Audio is muted by the silent switch unless the page asks for "playback" (Safari 16.4+)
function iosSession() { try { if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch {} }
function ac() {
  if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; iosSession(); ctx = new A(); }
  if (ctx.state !== 'running') ctx.resume().catch(() => {});
  return ctx;
}
// Safari only starts audio inside a tap: unlock once on the first touch/click while the sound is on
function unlock() {
  if (!on) return;
  const c = ac(); if (!c) return;
  try { const b = c.createBuffer(1, 1, 22050), src = c.createBufferSource(); src.buffer = b; src.connect(c.destination); src.start(0); } catch {}
  if (c.state === 'running') ['touchend', 'pointerdown', 'click', 'keydown'].forEach(t => removeEventListener(t, unlock, true));
}
['touchend', 'pointerdown', 'click', 'keydown'].forEach(t => addEventListener(t, unlock, true));
function env(g, t, a, peak, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
function tone(c, freq, t, dur, type = 'sine', vol = .12) {
  const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(freq, t);
  env(g, t, .008, vol, dur); o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05);
}
function whoosh(c, t, from, to, dur, vol = .09) {
  const n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = b;
  f.type = 'bandpass'; f.Q.value = 1.4; f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(to, t + dur);
  env(g, t, dur * .35, vol, dur * .6); s.connect(f).connect(g).connect(c.destination); s.start(t); s.stop(t + dur);
}
const SOUNDS = {
  open: c => { const t = c.currentTime; whoosh(c, t, 500, 2400, .32); tone(c, 660, t + .18, .12, 'triangle', .05); },
  close: c => whoosh(c, c.currentTime, 2000, 450, .28, .07),
  click: c => { const t = c.currentTime; tone(c, 1800, t, .03, 'square', .04); tone(c, 900, t + .05, .04, 'square', .03); },
  pop: c => { const t = c.currentTime; tone(c, 880, t, .14); tone(c, 1320, t + .1, .22); tone(c, 1760, t + .2, .3, 'sine', .06); },
};

export const sound = {
  get on() { return on; },
  set(v) { on = !!v; try { localStorage.setItem(KEY, on ? '1' : '0'); } catch {} if (on) { unlock(); const c = ac(); if (c) (c.state === 'running' ? Promise.resolve() : c.resume()).then(() => SOUNDS.click(c)).catch(() => {}); } },
  play(name) {
    if (!on || !SOUNDS[name]) return;
    if (!ctx && navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    try {
      const c = ac(); if (!c) return;
      if (c.state === 'running') SOUNDS[name](c);
      else c.resume().then(() => { if (c.state === 'running') SOUNDS[name](c); }).catch(() => {});
    } catch {}
  },
};

// header button
export function soundButton(btn) {
  if (!btn) return;
  const show = () => { btn.setAttribute('aria-pressed', String(on)); btn.title = on ? 'Ton ausschalten' : 'Ton einschalten'; btn.querySelector('.snd-t').textContent = on ? 'Ton an' : 'Ton aus'; };
  btn.addEventListener('click', () => { sound.set(!on); show(); });
  show();
}
