/* Begrüßung mit Video und Rundgang über die Startseite.
   Video: assets/avatar/willkommen.mp4 (+ Untertitel willkommen.vtt).
   Die Schritte (STEPS) markieren passend zur Sprechzeit einen Bereich der Startseite. */
(function () {
  const VIDEO = 'assets/avatar/willkommen.mp4', SUBS = 'assets/avatar/willkommen.vtt', POSTER = 'assets/avatar/dennis-avatar.jpg';
  const SEEN = 'dm-tour-seen', LATER = 'dm-tour-later';
  // [Startsekunde, CSS-Selektor auf der Startseite, kurzer Hinweis]
  const STEPS = [
    [0, null, 'Willkommen!'],
    [9.2, '.dm-paths', 'Hier wählst du deinen Lernweg'],
    [13.5, '.dm-tools', 'Direkt üben: Sprechen, Schreiben, Hören'],
    [19.2, '.dm-paths a[href="#lernweg/dtz"], .dm-tools a[href="#lid"]', 'Prüfungstraining: DTZ, B2, Leben in Deutschland'],
    [26.1, '.dm-stage', 'Deutsch mit Liedern'],
    [30.4, null, 'Viel Erfolg!']
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
      <div class="dm-tour-intro"><img src="${POSTER}" alt="" width="64" height="80">
        <div><p><b>Hallo, ich bin Dennis!</b><br>Soll ich dir die Seite zeigen? (30 Sek.)</p>
        <div class="dm-tour-btns"><button type="button" class="dm-btn dm-tour-play">▶ Rundgang starten</button><button type="button" class="dm-tour-later">Später</button></div></div></div>
      <div class="dm-tour-player" hidden><video playsinline controls preload="none" poster="${POSTER}"><source src="${VIDEO}" type="video/mp4"><track kind="captions" srclang="de" label="Deutsch" src="${SUBS}" default></video>
        <p class="dm-tour-hint" aria-live="polite"></p></div>`;
    document.body.appendChild(b);
    requestAnimationFrame(() => b.classList.add('dm-tour-in'));
    const v = b.querySelector('video'), hint = b.querySelector('.dm-tour-hint');
    const hide = () => { v.pause(); clearMarks(); b.classList.remove('dm-tour-in'); setTimeout(() => b.remove(), 300); };
    const close = () => { set(SEEN, '1'); hide(); };
    b.querySelector('.dm-tour-x').onclick = close;
    b.querySelector('.dm-tour-later').onclick = () => { try { sessionStorage.setItem(SEEN, '1'); } catch {} set(LATER, String((+get(LATER) || 0) + 1)); hide(); };
    b.querySelector('.dm-tour-play').onclick = () => {
      if (location.hash && location.hash !== '#') location.hash = '';
      b.classList.add('dm-tour-open');
      b.querySelector('.dm-tour-intro').hidden = true;
      b.querySelector('.dm-tour-player').hidden = false;
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

  function maybeShow() {
    const onHome = !location.hash || location.hash === '#';
    let later = false; try { later = !!sessionStorage.getItem(SEEN); } catch {}
    if (!onHome || get(SEEN) || later || (+get(LATER) || 0) >= 3 || document.getElementById('dm-tour')) return;
    check().then(ok => { if (ok) setTimeout(bubble, 1800); });
  }
  document.addEventListener('click', e => { const a = e.target.closest('[data-tour-start]'); if (a) { e.preventDefault(); window.DMTour.start(); } });
  window.addEventListener('hashchange', () => setTimeout(maybeShow, 300));
  if (document.readyState === 'complete') maybeShow(); else window.addEventListener('load', maybeShow);
})();
