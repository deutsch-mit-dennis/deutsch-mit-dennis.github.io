/* Begrüßung mit Video und Rundgang über die Startseite.
   Video: assets/avatar/willkommen.mp4 (+ Untertitel willkommen.vtt).
   Die Schritte (STEPS) markieren passend zur Sprechzeit einen Bereich der Startseite. */
(function () {
  const VIDEO = 'assets/avatar/willkommen.mp4', SUBS = 'assets/avatar/willkommen.vtt', POSTER = 'assets/avatar/dennis-avatar.jpg';
  const SEEN = 'dm-tour-seen';
  // [Startsekunde, CSS-Selektor auf der Startseite, kurzer Hinweis]
  const STEPS = [
    [0, '.dm-hero', 'Willkommen!'],
    [7, '.dm-paths', 'Hier wählst du deinen Lernweg'],
    [13, '.dm-tools', 'Direkt üben: Sprechen, Schreiben, Hören'],
    [19, '#main-navigation a[data-nav="pruefung"], .dm-tools a[href="#lid"]', 'Prüfungstraining: DTZ, B2, Leben in Deutschland'],
    [24, '.dm-stage', 'Deutsch mit Liedern'],
    [29, '.dm-hero', 'Viel Erfolg!']
  ];
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  let videoOk = null;
  const check = () => videoOk !== null ? Promise.resolve(videoOk)
    : fetch(VIDEO, { method: 'HEAD', cache: 'no-cache' }).then(r => (videoOk = r.ok)).catch(() => (videoOk = false));

  function clearMarks() { document.querySelectorAll('.dm-tour-mark').forEach(e => e.classList.remove('dm-tour-mark')); }
  function mark(sel) {
    clearMarks();
    const el = [...document.querySelectorAll(sel)].find(e => e.offsetParent !== null);
    if (!el) return;
    el.classList.add('dm-tour-mark');
    el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  }

  function bubble() {
    if (document.getElementById('dm-tour')) return;
    const b = document.createElement('aside');
    b.id = 'dm-tour'; b.className = 'dm-tour'; b.setAttribute('aria-label', 'Begrüßung von Dennis');
    b.innerHTML = `<button type="button" class="dm-tour-x" aria-label="Schließen">×</button>
      <div class="dm-tour-intro"><img src="${POSTER}" alt="" width="64" height="80">
        <div><p><b>Hallo, ich bin Dennis!</b><br>Soll ich dir die Seite zeigen? (30 Sek.)</p>
        <div class="dm-tour-btns"><button type="button" class="dm-btn dm-tour-play">▶ Rundgang starten</button><button type="button" class="dm-tour-later">Später</button></div></div></div>
      <div class="dm-tour-player" hidden><video playsinline controls preload="none" poster="${POSTER}"><source src="${VIDEO}" type="video/mp4"><track kind="captions" srclang="de" label="Deutsch" src="${SUBS}" default></video>
        <p class="dm-tour-hint" aria-live="polite"></p></div>`;
    document.body.appendChild(b);
    requestAnimationFrame(() => b.classList.add('dm-tour-in'));
    const v = b.querySelector('video'), hint = b.querySelector('.dm-tour-hint');
    const close = () => { set(SEEN, '1'); v.pause(); clearMarks(); b.classList.remove('dm-tour-in'); setTimeout(() => b.remove(), 300); };
    b.querySelector('.dm-tour-x').onclick = close;
    b.querySelector('.dm-tour-later').onclick = close;
    b.querySelector('.dm-tour-play').onclick = () => {
      set(SEEN, '1');
      if (location.hash && location.hash !== '#') location.hash = '';
      b.classList.add('dm-tour-open');
      b.querySelector('.dm-tour-intro').hidden = true;
      b.querySelector('.dm-tour-player').hidden = false;
      v.play().catch(() => {});
    };
    let last = -1;
    v.ontimeupdate = () => {
      let i = 0; STEPS.forEach((s, k) => { if (v.currentTime >= s[0]) i = k; });
      if (i !== last) { last = i; hint.textContent = STEPS[i][2]; mark(STEPS[i][1]); }
    };
    v.onended = () => { clearMarks(); hint.textContent = 'Viel Spaß beim Lernen!'; setTimeout(close, 2500); };
  }

  window.DMTour = { start: () => check().then(ok => { if (!ok) return; location.hash = ''; setTimeout(() => { bubble(); document.querySelector('.dm-tour-play')?.click(); }, 400); }) };

  function maybeShow() {
    const onHome = !location.hash || location.hash === '#';
    if (!onHome || get(SEEN)) return;
    check().then(ok => { if (ok) setTimeout(bubble, 1800); });
  }
  document.addEventListener('click', e => { const a = e.target.closest('[data-tour-start]'); if (a) { e.preventDefault(); window.DMTour.start(); } });
  if (document.readyState === 'complete') maybeShow(); else window.addEventListener('load', maybeShow);
})();
