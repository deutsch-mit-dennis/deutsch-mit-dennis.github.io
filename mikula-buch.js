/* Hörseite zum Buch „Mikula sucht den Weg nach Hause – Band 1“ (#mikula-buch, QR-Codes im Buch).
   Address printed in the book: https://deutsch-mit-dennis.de/mikula-buch/#<station>  → static redirect page mikula-buch/index.html
   → #mikula-buch/<station>. NEVER change the address or the station ids (they are printed).
   Data: spiele/mikula/buch.json (exported from the book sources with tools/export_mikula_audio.py in the KDP project).
   Audio: one recording per paragraph / word line via DM.speak (natural voice if recorded, else device voice). */
(() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let data;
  const load = () => (data ||= fetch('spiele/mikula/buch.json?v=20261107a').then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).catch(e => { data = null; throw e; }));
  let queue = null;
  const stop = () => { queue = null; try { speechSynthesis.cancel(); } catch {} DM.speak && DM.speak('', {}); document.querySelectorAll('.mb-play.is-on').forEach(b => { b.classList.remove('is-on'); b.textContent = b.dataset.label; }); };
  function playList(btn, texts) {
    const wasOn = btn.classList.contains('is-on');
    stop();
    if (wasOn) return;
    const q = queue = { i: 0 };
    btn.classList.add('is-on'); btn.textContent = '⏹ Stopp';
    const next = () => {
      if (queue !== q) return;
      if (q.i >= texts.length) { btn.classList.remove('is-on'); btn.textContent = btn.dataset.label; queue = null; return; }
      DM.speak(texts[q.i++], { onend: next });
    };
    next();
  }

  const CSS = `
.mb-page{max-width:760px}
.mb-toc{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 20px}
.mb-toc a{display:inline-flex;align-items:center;min-height:44px;padding:6px 14px;border-radius:12px;background:#E8ECFA;color:#182E86;font-weight:700;text-decoration:none}
.mb-st{border:2px solid #DADFEA;border-radius:18px;padding:16px;margin:0 0 18px;scroll-margin-top:90px}
.mb-st:target,.mb-st.is-target{border-color:#2341B5}
.mb-st h2{margin:0 0 10px;font-size:22px}
.mb-lv{border-top:1px solid #DADFEA;padding-top:10px;margin-top:10px}
.mb-lv h3{display:flex;align-items:center;gap:10px;margin:0 0 6px;font-size:17px}
.mb-lv p{margin:0 0 8px;line-height:1.55}
.mb-play{min-height:44px;padding:6px 16px;border:0;border-radius:12px;background:#2341B5;color:#fff;font:700 16px var(--dm-font,system-ui);cursor:pointer}
.mb-play.is-on{background:#C2362B}
.mb-play:focus-visible{outline:3px solid #182E86;outline-offset:2px}
.mb-words{display:grid;gap:6px;margin:8px 0 0;padding:0;list-style:none}
.mb-words li{display:flex;gap:8px;align-items:center;padding:8px 10px;border-radius:12px;background:#f6f7fb}
.mb-words li span{flex:1}
.mb-one{flex:0 0 44px;width:44px;height:44px;border:0;border-radius:50%;background:#fff;font-size:18px;cursor:pointer}
.mb-note{color:#566078;font-size:15px}
`;
  function page(p) {
    if (!document.getElementById('mb-css')) document.head.insertAdjacentHTML('beforeend', `<style id="mb-css">${CSS}</style>`);
    const main = document.getElementById('main');
    main.innerHTML = '<section class="dm-section mb-page"><p>Hörtexte werden geladen …</p></section>';
    load().then(d => {
      main.innerHTML = `<section class="dm-section mb-page">
        <p class="step-label">Hörtexte zum Buch</p>
        <h1>${esc(d.title)}</h1>
        <p>Hier hörst du die Geschichten (A1, A2, B1) und die Wörter aus dem Buch. Lies im Buch mit und sprich nach. Kostenlos und ohne Anmeldung.</p>
        <nav class="mb-toc" aria-label="Stationen">${d.stations.map(s => `<a href="#mikula-buch/${esc(s.id)}">${s.no}. ${esc(s.title)}</a>`).join('')}</nav>
        ${d.stations.map(s => `<article class="mb-st" id="mb-${esc(s.id)}" aria-labelledby="mb-h-${esc(s.id)}">
          <h2 id="mb-h-${esc(s.id)}">Station ${s.no}: ${esc(s.title)}</h2>
          ${['A1', 'A2', 'B1'].map(lv => `<div class="mb-lv"><h3>Geschichte ${lv} <button type="button" class="mb-play" data-st="${esc(s.id)}" data-lv="${lv}" data-label="▶ Anhören">▶ Anhören</button></h3>${s.story[lv].map(t => `<p>${esc(t)}</p>`).join('')}</div>`).join('')}
          <div class="mb-lv"><h3>Wörter <button type="button" class="mb-play" data-st="${esc(s.id)}" data-lv="words" data-label="▶ Alle anhören">▶ Alle anhören</button></h3>
            <ul class="mb-words">${s.words.map((w, k) => `<li><span>${esc(w)}</span><button type="button" class="mb-one" data-st="${esc(s.id)}" data-k="${k}" aria-label="Vorlesen">🔊</button></li>`).join('')}</ul></div>
        </article>`).join('')}
        <p class="mb-note">Mikula ist eine KI-Figur. Bilder und Stimmen sind KI-generiert. Das Lernspiel zum Buch: <a href="#spiele/mikula">Mikula sucht den Weg nach Hause</a>.</p>
      </section>`;
      const st = id => d.stations.find(s => s.id === id);
      main.querySelectorAll('.mb-play').forEach(b => { b.onclick = () => { const s = st(b.dataset.st); playList(b, b.dataset.lv === 'words' ? s.words : s.story[b.dataset.lv]); }; });
      main.querySelectorAll('.mb-one').forEach(b => { b.onclick = () => { stop(); DM.speak(st(b.dataset.st).words[+b.dataset.k]); }; });
      const target = p && p[1] && document.getElementById('mb-' + p[1]);
      document.title = 'Hörtexte zum Buch „Mikula sucht den Weg nach Hause“ – Deutsch mit Dennis';
      // the router scrolls to the top after rendering – jump to the station (from the QR code) afterwards
      if (target) { target.classList.add('is-target'); const jump = () => window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }); setTimeout(() => { jump(); target.querySelector('.mb-play')?.focus({ preventScroll: true }); setTimeout(jump, 300); }, 400); }
    }).catch(() => { main.innerHTML = '<section class="dm-section mb-page"><p>Die Hörtexte konnten nicht geladen werden. Bitte lade die Seite neu.</p></section>'; });
  }
  window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#mikula-buch')) stop(); });
  window.DM ||= {};
  DM.routes ||= {};
  DM.routes['mikula-buch'] = p => page(p);
})();
