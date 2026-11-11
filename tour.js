/* Begrüßung mit Video und Rundgang über die Startseite.
   Video: assets/avatar/willkommen.mp4 (+ Untertitel willkommen.vtt).
   Die Schritte (STEPS) markieren passend zur Sprechzeit einen Bereich der Startseite. */
(function () {
  const VIDEO = 'assets/avatar/willkommen.mp4', SUBS = 'assets/avatar/willkommen.vtt', POSTER = 'assets/avatar/dennis-avatar.jpg';
  const SEEN = 'dm-tour-seen', LATER = 'dm-tour-later';
  // [Startsekunde, CSS-Selektor auf der Startseite, kurzer Hinweis]
  const STEPS = [
    [0, null, 'Willkommen!'],
    [11.3, '#dm-level', 'Tippe auf dein Niveau – dann kommt dein nächster Schritt'],
    [18.3, '.dm-tools', 'Direkt üben: Sprechen, Schreiben, Hören'],
    [25.2, '.dm-paths a[href="#lernweg/dtz"], .dm-tools a[href="#lid"]', 'Prüfungstraining: DTZ, B2, Leben in Deutschland'],
    [33.4, '.dm-stage', 'Deutsch mit Liedern'],
    [39.2, null, 'Viel Erfolg!']
  ];
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  let videoOk = null;
  const check = () => videoOk !== null ? Promise.resolve(videoOk)
    : fetch(VIDEO, { method: 'HEAD', cache: 'no-cache' }).then(r => (videoOk = r.ok)).catch(() => (videoOk = false));

  function clearMarks() { document.querySelectorAll('.dm-tour-mark').forEach(e => e.classList.remove('dm-tour-mark')); document.body.classList.remove('dm-tour-dim'); }
  function mark(sel) {
    clearMarks();
    if (!sel) return;
    const el = [...document.querySelectorAll(sel)].find(e => e.offsetParent !== null);
    if (!el) return;
    el.classList.add('dm-tour-mark');
    document.body.classList.add('dm-tour-dim');
    const r = el.getBoundingClientRect(), head = 80, avail = innerHeight - head;
    const top = innerWidth < 720 ? r.top + scrollY - head - 12 : r.top + scrollY - head - Math.max(16, (avail - Math.min(r.height, avail)) / 2);
    window.scrollTo({ top: Math.max(0, top), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function bubble() {
    if (document.getElementById('dm-tour')) return;
    const b = document.createElement('aside');
    b.id = 'dm-tour'; b.className = 'dm-tour'; b.setAttribute('aria-label', 'Begrüßung von Dennis');
    b.innerHTML = `<button type="button" class="dm-tour-x" aria-label="Schließen">×</button>
      <div class="dm-tour-intro"><img src="assets/avatar/dennis-avatar-klein.jpg" alt="" width="64" height="80" loading="lazy" decoding="async">
        <div><p><b>Hallo, ich bin Dennis!</b><br>Soll ich dir die Seite zeigen? (40 Sek.)<br><small class="dm-tour-ai">Video mit KI erstellt (Avatar und Stimme nach meinem Vorbild)</small></p>
        <div class="dm-tour-btns"><button type="button" class="dm-btn dm-tour-play">▶ Rundgang starten</button><button type="button" class="dm-tour-later">Später</button></div></div></div>
      <div class="dm-tour-player" hidden><video playsinline controls preload="none"><source src="${VIDEO}" type="video/mp4"><track kind="captions" srclang="de" label="Deutsch" src="${SUBS}" default></video>
        <p class="dm-small dm-tour-ai">🤖 KI-Video: Avatar und Stimme nach Dennis’ Vorbild</p><p class="dm-tour-hint" aria-live="polite"></p></div>`;
    window.DMNews?.hideToast?.();
    document.body.appendChild(b);
    requestAnimationFrame(() => b.classList.add('dm-tour-in'));
    const v = b.querySelector('video'), hint = b.querySelector('.dm-tour-hint');
    const hide = () => { window.DMTourPending = false; v.pause(); clearMarks(); b.classList.remove('dm-tour-in'); setTimeout(() => b.remove(), 300); };
    const close = () => { set(SEEN, '1'); hide(); };
    b.querySelector('.dm-tour-x').onclick = close;
    b.querySelector('.dm-tour-later').onclick = () => { try { sessionStorage.setItem(SEEN, '1'); } catch {} set(LATER, String((+get(LATER) || 0) + 1)); hide(); };
    b.querySelector('.dm-tour-play').onclick = () => {
      if (location.hash && location.hash !== '#') location.hash = '';
      b.classList.add('dm-tour-open');
      b.querySelector('.dm-tour-intro').hidden = true;
      b.querySelector('.dm-tour-player').hidden = false;
      if (!v.poster) v.poster = POSTER; // set only now: a hidden video would load the poster on every visit
      v.play().catch(() => {});
    };
    let last = -1;
    v.ontimeupdate = () => {
      let i = 0; STEPS.forEach((s, k) => { if (v.currentTime >= s[0]) i = k; });
      if (i !== last) { last = i; hint.textContent = STEPS[i][2]; mark(STEPS[i][1]); if (!STEPS[i][1] && i > 0) window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };
    v.onended = () => { set(SEEN, '1'); clearMarks(); hint.textContent = 'Viel Spaß beim Lernen!'; setTimeout(close, 2500); };
  }

  window.DMTour = { start: () => check().then(ok => { if (!ok) return; location.hash = ''; setTimeout(() => { bubble(); document.querySelector('.dm-tour-play')?.click(); }, 400); }) };

  /* Do not cover the start page at once: show the greeting after the first real scroll (3 s+) or after 25 s */
  function whenEngaged(cb) {
    let done = false;
    const t0 = Date.now();
    const go = () => { if (done) return; done = true; removeEventListener('scroll', onScroll); clearTimeout(timer); cb(); };
    const onScroll = () => { if (scrollY > 400 && Date.now() - t0 > 3000) go(); };
    const timer = setTimeout(go, 25000);
    addEventListener('scroll', onScroll, { passive: true });
  }
  function maybeShow() {
    const onHome = !location.hash || location.hash === '#';
    let later = false; try { later = !!sessionStorage.getItem(SEEN); } catch {}
    // not on the very first visit: let new learners find their level first
    if ((+get('dm-visits') || 0) < 2) return;
    if (!onHome || get(SEEN) || later || (+get(LATER) || 0) >= 3 || document.getElementById('dm-tour')) return;
    window.DMTourPending = true; // Neuigkeiten-Hinweis wartet, damit nie zwei Fenster gleichzeitig offen sind
    check().then(ok => { if (!ok) { window.DMTourPending = false; return; } whenEngaged(() => { if (!location.hash || location.hash === '#') bubble(); else window.DMTourPending = false; }); });
  }
  // the tour points at sections inside the folded "Mehr entdecken" block: open it first
  const openMore = () => { const m = document.getElementById('dm-more'); if (m) m.open = true; };
  document.addEventListener('click', e => { if (e.target.closest('.dm-tour-play')) openMore(); const a = e.target.closest('[data-tour-start]'); if (a) { e.preventDefault(); openMore(); window.DMTour.start(); } }, true);
  window.addEventListener('hashchange', () => {
    // Begrüßung (noch nicht gestartet) ausblenden, sobald man die Startseite verlässt – z. B. beim Spielen
    const t = document.getElementById('dm-tour'), onHome = !location.hash || location.hash === '#';
    if (t && !onHome && t.querySelector('.dm-tour-player')?.hidden) { t.classList.remove('dm-tour-in'); setTimeout(() => t.remove(), 300); }
    setTimeout(maybeShow, 300);
  });
  if (document.readyState === 'complete') maybeShow(); else window.addEventListener('load', maybeShow);
})();
