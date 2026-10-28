/* Lesewurm mit Brille: kriecht ab und zu über den unteren Bildschirmrand.
   Klick öffnet „Dennis' Bücherregal“ mit allen Büchern aus DM.books, die einen Amazon-Link haben.
   Nicht in laufenden Prüfungen/Spielen; × blendet ihn für heute aus (localStorage, falls verfügbar). */
(() => {
  const OFF = 'dm-lesewurm-off';
  const FIRST = 25e3, EVERY = [70e3, 110e3];   // erster Auftritt nach 25 s, dann alle 70–110 s
  const SPEED = 55;                             // Pixel pro Sekunde
  const today = () => new Date().toISOString().slice(0, 10);
  const off = () => { try { return localStorage.getItem(OFF) === today(); } catch { return false; } };
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const books = () => (window.DM?.books || []).filter(b => b.amazon);
  // laufende Prüfung (#simulation/<id>/run), laufendes Spiel (.sp-play), Begrüßung (#dm-tour) oder offenes Fenster → nicht stören
  const busy = () => /^#simulation\/[^/]+\/run/.test(location.hash) || document.querySelector('.sp-play, #dm-tour, dialog[open], [aria-modal="true"]');

  const SVG = `<svg viewBox="0 0 132 66" aria-hidden="true">
    <g fill="#7CC243" stroke="#3F7D20" stroke-width="2">
      <circle class="lw-seg" cx="14" cy="50" r="10"/><circle class="lw-seg" cx="31" cy="48" r="12"/>
      <circle class="lw-seg" cx="50" cy="47" r="13"/><circle class="lw-seg" cx="70" cy="47" r="13"/>
    </g>
    <g class="lw-head">
      <rect x="104" y="36" width="22" height="18" rx="2" fill="#2341B5" stroke="#182E86" stroke-width="2" transform="rotate(-12 115 45)"/>
      <path d="M115 38v17" stroke="#fff" stroke-width="1.5" transform="rotate(-12 115 45)"/>
      <circle cx="94" cy="34" r="19" fill="#8DD155" stroke="#3F7D20" stroke-width="2"/>
      <path d="M86 15q-4-9-10-10M100 15q3-9 9-11" stroke="#3F7D20" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="76" cy="5" r="3" fill="#E8A800"/><circle cx="109" cy="4" r="3" fill="#E8A800"/>
      <circle cx="87" cy="31" r="8" fill="#fff" stroke="#172036" stroke-width="2.5"/><circle cx="104" cy="31" r="8" fill="#fff" stroke="#172036" stroke-width="2.5"/>
      <path d="M95 31h1M79 30l-6-2" stroke="#172036" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="89" cy="32" r="2.6" fill="#172036"/><circle cx="106" cy="32" r="2.6" fill="#172036"/>
      <path d="M88 43q7 5 13 0" stroke="#172036" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="83" cy="40" r="2.5" fill="#F29A9A" opacity=".8"/>
    </g>
  </svg>`;

  let el, anim, timer;
  function build() {
    el = document.createElement('div');
    el.className = 'lw';
    el.innerHTML = `<button type="button" class="lw-btn" aria-label="Lesewurm: Dennis' Bücherregal öffnen">${SVG}</button><button type="button" class="lw-x" aria-label="Lesewurm für heute ausblenden"><span>×</span></button><span class="lw-tip">Meine Bücher 📚</span>`;
    el.querySelector('.lw-btn').onclick = shelf;
    el.querySelector('.lw-x').onclick = () => { try { localStorage.setItem(OFF, today()); } catch {} hide(); clearTimeout(timer); };
    el.hidden = true;
    document.body.append(el);
  }
  function hide() { anim?.cancel(); anim = null; if (el) el.hidden = true; }
  function later(ms) { clearTimeout(timer); timer = setTimeout(show, ms); }
  function show() {
    later(EVERY[0] + Math.random() * (EVERY[1] - EVERY[0]));
    if (off() || busy() || !books().length || document.hidden) return;
    el || build();
    el.hidden = false;
    el.classList.toggle('lw-still', still.matches);
    const w = el.offsetWidth, vw = document.documentElement.clientWidth;
    if (still.matches) { // ohne Bewegung: kurz in der Ecke sitzen
      el.style.transform = 'translateX(12px)';
      anim = el.animate([{ opacity: 0 }, { opacity: 1, offset: .1 }, { opacity: 1, offset: .9 }, { opacity: 0 }], { duration: 12e3 });
    } else {
      anim = el.animate([{ transform: `translateX(${-w}px)` }, { transform: `translateX(${vw}px)` }], { duration: (vw + w) / SPEED * 1e3, easing: 'linear' });
    }
    anim.onfinish = hide;
  }
  // Pause beim Zeigen/Fokussieren, damit man ihn auch auf dem Handy treffen kann
  document.addEventListener('pointerover', e => { if (anim && el?.contains(e.target)) anim.pause(); });
  document.addEventListener('pointerout', e => { if (anim && el?.contains(e.target) && !el.contains(e.relatedTarget)) anim.play(); });
  document.addEventListener('focusin', e => { if (anim && el?.contains(e.target)) anim.pause(); });
  window.addEventListener('hashchange', () => { if (busy()) hide(); });

  function shelf() {
    hide();
    const B = books();
    const d = document.createElement('dialog');
    d.className = 'lw-dlg';
    d.setAttribute('aria-labelledby', 'lw-title');
    d.innerHTML = `<div class="lw-head-row"><h2 id="lw-title">📚 Dennis' Bücherregal</h2><button type="button" class="lw-close" aria-label="Schließen">×</button></div>
      <p class="lw-lead">Meine Übungsbücher als Taschenbuch bei Amazon. Tippe auf ein Buch.</p>
      <div class="lw-shelf">${B.map(b => `<a class="lw-book" href="${esc(b.amazon)}" target="_blank" rel="noopener sponsored"><img src="${esc(b.img)}" alt="" width="560" height="792" loading="lazy"><span>${esc(b.title.replace(/ – Das Übungsbuch$/, '').replace('Deutscher Wortschatz nach Themen', 'Wortschatz'))}</span></a>`).join('')}</div>
      <div class="lw-foot"><a class="dm-btn dm-btn-quiet" href="#lernpakete/buecher">Alle Bücher mit Beschreibung</a><small>Weitere Bücher folgen.</small></div>`;
    document.body.append(d);
    const close = () => d.close();
    d.querySelector('.lw-close').onclick = close;
    d.querySelector('.lw-foot a').onclick = close;
    d.addEventListener('click', e => { if (e.target === d) close(); });   // Klick auf den Hintergrund
    d.addEventListener('close', () => d.remove());
    d.showModal();
  }

  later(FIRST);
  // nur für Tests und die Konsole: DM.lesewurm.show() lässt ihn sofort kriechen
  (window.DM ||= {}).lesewurm = { show, shelf };
})();
