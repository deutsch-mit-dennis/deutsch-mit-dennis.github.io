/* Site search: #suche, #suche/<query>. Index: such-index.json (tools/build-search-index.js, rebuilt with the sitemap).
   Everything runs on the device; the query is not sent anywhere. */
(function () {
  'use strict';
  const x = DM.esc, $ = (s, r = document) => r.querySelector(s);
  const norm = t => String(t).toLocaleLowerCase('de').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/\p{M}/gu, '');
  let IX = null, busy = null;
  const load = () => IX ? Promise.resolve(IX) : (busy ||= fetch('such-index.json', { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(j => {
    IX = {
      p: j.p.map(([t, d, u, k]) => ({ t, d, u, k, nt: norm(t), nd: norm(d), pt: plain(t), pd: plain(d) })),
      w: j.w.map(([w, f, b]) => ({ w, f, b, nw: norm(w.replace(/^(der|die|das|sich) /, '')), nf: ' ' + norm(f).replace(/[^a-z]+/g, ' ') + ' ', pw: plain(w.replace(/^(der|die|das|sich) /, '')), pf: ' ' + plain(f).replace(/[^a-z]+/g, ' ') + ' ' }))
    };
    return IX;
  }).catch(e => { busy = null; throw e; }));
  const plain = t => String(t).toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss');
  const KIND = { kurs: '🧭 Kurs', lektion: '📘 Lektion', grammatik: '🧩 Grammatik', hoeren: '🎧 Hören', lesen: '📖 Lesen', ueben: '✍️ Üben', spiele: '🎮 Spiel', lieder: '🎵 Lied', simulation: '📝 Probeprüfung', pruefung: '📝 Prüfung', lid: '🇩🇪 Leben in Deutschland', material: '📄 PDF', antworten: '💬 Antwort', brief: '✉️ Musterbrief', wort: '🗂️ Wörter' };
  /* second try without dots: 'Prufung' finds 'Prüfung' */
  const search = q => { const r = find(q, norm, 'nt', 'nd', 'nw', 'nf'); return r.p.length || r.w.length ? r : find(q, plain, 'pt', 'pd', 'pw', 'pf'); };
  function find(q, nrm, T, D, W, F) {
    const parts = nrm(q).split(/\s+/).filter(Boolean), one = parts.join(' ');
    if (!parts.length) return { p: [], w: [] };
    const bare = one.replace(/^(der|die|das|sich) /, '');
    const ws = e => e[W] === bare ? 5 : e[W].startsWith(bare) ? 3 : e[F].includes(' ' + bare + ' ') ? 2 : bare.length > 3 && e[W].includes(bare) ? 1 : 0;
    const w = IX.w.map(e => [ws(e), e]).filter(p => p[0]).sort((a, b) => b[0] - a[0]).slice(0, 6).map(p => p[1]);
    const ps = e => {
      let s = 0;
      for (const t of parts) {
        const at = e[T].indexOf(t);
        if (at >= 0) s += at === 0 || !/[a-z0-9]/.test(e[T][at - 1]) ? 6 : 3;
        else if (e[D].includes(t)) s += 1;
        else return 0;
      }
      return s + (e[T].startsWith(one) ? 3 : 0) + (e.k === 'lid' && /frage/.test(e.u) ? -2 : 0);
    };
    const p = IX.p.map(e => [ps(e), e]).filter(q2 => q2[0] > 0).sort((a, b) => b[0] - a[0]).map(q2 => q2[1]);
    return { p, w };
  }
  function page(q0) {
    DM.page(`${DM.crumbs([['Suche']])}
      <div class="dm-head"><h1>Suche</h1><p class="dm-lead">Finde Lektionen, Grammatik, Übungen, Arbeitsblätter und Wörter.</p></div>
      <form class="lh-sform" id="su-f" role="search"><label class="dm-sr" for="su-q">Was suchst du?</label><input type="search" id="su-q" value="${x(q0)}" placeholder="z. B. Dativ, Arzt, Brief" autocomplete="off" lang="de" enterkeyhint="search"><button class="dm-btn" type="submit">Suchen</button></form>
      <p class="lh-chips lh-sug">${['Dativ', 'Perfekt', 'Arzt', 'Uhrzeit', 'Brief', 'DTZ', 'Wohnung', 'Einbürgerung'].map(s => `<button type="button" data-q="${s}">${s}</button>`).join('')}</p>
      <p class="dm-sr" id="su-st" role="status"></p><div id="su-r"></div>`, 'lh-page');
    const inp = $('#su-q');
    let t, more = 20;
    const draw = async () => {
      const box = $('#su-r');
      if (!box) return;
      if (inp.value.trim().length < 2) { box.innerHTML = ''; $('#su-st').textContent = ''; return; }
      try { await load(); } catch { box.innerHTML = '<p class="dm-warn">Die Suche ist gerade nicht erreichbar. Prüfe deine Internetverbindung.</p>'; return; }
      if (!inp.isConnected) return;
      const q = inp.value.trim(), r = search(q);
      box.innerHTML = (r.w.length ? `<section aria-label="Wörter"><h2 class="lh-sh">Wörter</h2><ul class="lh-list">${r.w.map(w => `<li><div><b lang="de">${x(w.w)}</b>${w.f ? `<small lang="de">${x(w.f)}</small>` : ''}<span lang="de">${x(w.b)}</span></div><button type="button" class="lh-say" data-s="${x(w.w.replace(/ \(.*/, ''))}" aria-label="Vorlesen: ${x(w.w)}"><span aria-hidden="true">🔊</span></button>${window.DMWoerter ? DMWoerter.star(w) : ''}</li>`).join('')}</ul></section>` : '')
        + (r.p.length ? `<h2 class="lh-sh">${r.p.length} ${r.p.length === 1 ? 'Seite' : 'Seiten'}</h2><ul class="su-list">${r.p.slice(0, more).map(e => `<li><a href="${x(e.u)}"${/\.pdf$/.test(e.u) ? ' target="_blank" rel="noopener"' : ''}><small>${KIND[e.k] || 'Seite'}</small><b>${x(e.t)}</b><span>${x(e.d)}</span></a></li>`).join('')}</ul>${r.p.length > more ? '<p class="dm-actions"><button type="button" class="dm-btn dm-btn-quiet" id="su-more">Mehr anzeigen</button></p>' : ''}` : '')
        || `<div class="dm-empty"><p>Nichts gefunden.</p><p>Schreib ein deutsches Wort.</p><p class="dm-actions"><a class="dm-btn dm-btn-quiet" href="#erste-schritte">Bildkarten</a> <a class="dm-btn dm-btn-quiet" href="#kurs">Mein Kurs</a></p></div>`;
      $('#su-st').textContent = r.w.length || r.p.length ? `${r.w.length} Wörter, ${r.p.length} Seiten gefunden` : 'Nichts gefunden';
      box.querySelectorAll('[data-s]').forEach(b => { b.onclick = () => DM.speak(b.dataset.s); });
      const m = $('#su-more');
      if (m) m.onclick = async () => { const first = more; more += 20; await draw(); document.querySelectorAll('.su-list a')[first]?.focus(); };
    };
    const set = () => {
      if (!inp.isConnected) return;
      more = 20;
      try { history.replaceState(history.state, '', '#suche' + (inp.value.trim() ? '/' + encodeURIComponent(inp.value.trim()) : '')); } catch { /* keep the address */ }
      draw();
    };
    inp.oninput = () => { clearTimeout(t); t = setTimeout(set, 180); };
    $('#su-f').onsubmit = e => { e.preventDefault(); clearTimeout(t); set(); inp.blur(); };
    document.querySelectorAll('.lh-sug button').forEach(b => { b.onclick = () => { inp.value = b.dataset.q; set(); }; });
    load().catch(() => {});
    if (q0) draw(); else if (matchMedia('(hover:hover)').matches) inp.focus({ preventScroll: true });
  }
  DM.routes.suche = p => page(p.slice(1).join('/'));
})();
