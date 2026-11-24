/* Personal word notebook (#meine-woerter), "Heute für dich" card on the start page, search button in the header.
   API: window.DMWoerter = { has(w), star({ w, f, b }), count(), due() }
   star(entry) returns the HTML of a ☆ button; clicks are handled here for the whole page.
   State: DM.store.mw = [{ w, f, b, n, box, due, add, known }] (saved with DM.save, part of "Lernstand sichern").
   Leitner system like the mistakes notebook: 0 / 1 / 3 / 7 / 21 days. Stays on the device. */
(function () {
  'use strict';
  const DM = (window.DM = window.DM || {});
  const DAY = 864e5, IV = [0, 1, 3, 7, 21], CAP = 600;
  const x = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const clean = (s, n) => String(s ?? '').replace(/<\/?[a-z]+>/gi, '').replace(/\s+/g, ' ').trim().slice(0, n);
  // reading never creates the list (the backup restore relies on that); broken entries are dropped
  const list = () => {
    const s = DM.store || {};
    if (s.mw === undefined) return [];
    if (!Array.isArray(s.mw)) s.mw = [];
    if (s.mw.some(i => !i || typeof i.w !== 'string')) s.mw = s.mw.filter(i => i && typeof i.w === 'string');
    return s.mw;
  };
  const save = () => { try { DM.save && DM.save(); } catch { /* private mode */ } };
  const find = w => { const k = w.toLocaleLowerCase('de'); return list().find(i => i.w === w) || list().find(i => i.w.toLocaleLowerCase('de') === k && !/^(sie|ihr)$/.test(k)); };
  const due = () => list().filter(i => !i.known && (i.due || 0) <= Date.now());
  function put(e) {
    const w = clean(e.w, 80);
    if (!w || find(w) || list().length >= CAP) return false;
    DM.store.mw ||= [];
    list().unshift({ w, f: clean(e.f, 80), b: clean(e.b, 200), n: clean(e.n, 80), box: 0, due: Date.now(), add: Date.now() });
    save();
    return true;
  }
  const remove = w => { const l = list(), i = l.indexOf(find(w)); if (i >= 0) { l.splice(i, 1); save(); } };
  function star(e) {
    const w = clean(e.w, 80), on = !!find(w);
    return `<button type="button" class="lh-star" data-lh-w="${x(w)}" data-lh-f="${x(clean(e.f, 80))}" data-lh-b="${x(clean(e.b, 200))}" aria-pressed="${on}" aria-label="${x(w)}: in „Meine Wörter“ merken"><span aria-hidden="true">${on ? '★' : '☆'}</span></button>`;
  }
  document.addEventListener('click', ev => {
    const b = ev.target.closest && ev.target.closest('.lh-star');
    if (!b) return;
    ev.preventDefault(); ev.stopPropagation();
    const w = b.dataset.lhW;
    if (find(w)) remove(w);
    else if (!put({ w, f: b.dataset.lhF, b: b.dataset.lhB })) { alert(`Dein Wörterheft ist voll (${CAP} Wörter). Lösche zuerst ein Wort.`); return; }
    const on = !!find(w);
    b.setAttribute('aria-pressed', String(on));
    b.firstElementChild.textContent = on ? '★' : '☆';
  }, true);
  const merge = items => {
    items.slice().reverse().forEach(i => {
      if (!i || typeof i.w !== 'string' || !put(i)) return;
      const n = list()[0];
      n.box = Math.min(IV.length - 1, Math.max(0, i.box | 0)); n.due = Number(i.due) || Date.now(); n.known = i.known ? 1 : 0; n.add = Number(i.add) || Date.now();
    });
  };
  window.DMWoerter = { merge, has: w => !!find(clean(w, 80)), star, count: () => list().length, due: () => due().length };

  /* ---------- #meine-woerter ---------- */
  const sayBtn = t => `<button type="button" class="lh-say" data-lh-say="${x(t)}" aria-label="Vorlesen: ${x(t)}"><span aria-hidden="true">🔊</span></button>`;
  function bindSay(root) { root.querySelectorAll('[data-lh-say]').forEach(b => { b.onclick = () => { if (DM.speak) DM.speak(b.dataset.lhSay); }; }); }
  function page() {
    const l = list(), d = due().length, known = l.filter(i => i.known).length;
    DM.page(`${DM.crumbs([['Üben', '#ueben'], ['Meine Wörter']])}
      <div class="dm-head"><h1>Meine Wörter</h1><p class="dm-lead">Dein Wörterheft. Merke dir Wörter mit ☆ und wiederhole sie mit Karten.</p></div>
      ${l.length ? `<p><b>${l.length}</b> ${l.length === 1 ? 'Wort' : 'Wörter'} · <b>${known}</b> gelernt · <b>${d}</b> heute dran</p>
        <p class="dm-actions"><button type="button" class="dm-btn" id="lh-go">${d ? `Jetzt wiederholen (${Math.min(d, 10)})` : 'Trotzdem üben'}</button></p>`
      : `<div class="dm-card"><p><b>Noch keine Wörter.</b></p><p>So geht es: Öffne Karteikarten, Verben oder die Suche. Tippe auf ☆ neben einem Wort.</p>
        <p class="dm-actions"><a class="dm-btn" href="#a1-woerter">A1-Wörter</a> <a class="dm-btn dm-btn-quiet" href="#dtz-woerter">DTZ-Wörter</a> <a class="dm-btn dm-btn-quiet" href="#verben">Verben</a> <a class="dm-btn dm-btn-quiet" href="#suche">Suche</a></p></div>`}
      <form class="dm-card lh-form" id="lh-form" autocomplete="off"><h2>Eigenes Wort eintragen</h2>
        <label>Wort auf Deutsch (mit Artikel)<input id="lh-w" maxlength="80" required lang="de" placeholder="der Termin"></label>
        <label>In deiner Sprache (wenn du möchtest)<input id="lh-n" maxlength="80" dir="auto"></label>
        <label>Beispielsatz (wenn du möchtest)<input id="lh-b" maxlength="200" lang="de" placeholder="Ich habe morgen einen Termin."></label>
        <button class="dm-btn" type="submit">Speichern</button><p class="dm-small" id="lh-msg" role="status"></p></form>
      ${l.length ? `<section class="dm-section"><h2>Alle Wörter</h2><ul class="lh-list">${l.map((i, k) => `<li><div><b lang="de">${x(i.w)}</b>${i.f ? `<small lang="de">${x(i.f)}</small>` : ''}${i.n ? `<span class="lh-n" dir="auto" data-no-i18n>${x(i.n)}</span>` : ''}${i.b ? `<span lang="de">${x(i.b)}</span>` : ''}${i.known ? '<em>✓ gelernt</em>' : ''}</div>${sayBtn(i.w)}<button type="button" class="lh-del" data-k="${k}" aria-label="Löschen: ${x(i.w)}"><span aria-hidden="true">✕</span></button></li>`).join('')}</ul></section>` : ''}
      <p class="dm-small">Deine Wörter bleiben nur auf diesem Gerät.</p><p><a href="#lernstand">Lernstand sichern</a></p>`, 'lh-page');
    const m = $('main');
    bindSay(m);
    const go = $('#lh-go', m);
    if (go) go.onclick = () => { location.hash = '#meine-woerter/ueben'; };
    $('#lh-form', m).onsubmit = e => {
      e.preventDefault();
      const w = $('#lh-w').value;
      if (put({ w, n: $('#lh-n').value, b: $('#lh-b').value })) {
        page();
        setTimeout(() => { const m = $('#lh-msg'); if (m) m.textContent = '✓ Gespeichert: ' + clean(w, 80); }, 120);
        $('#lh-w').focus({ preventScroll: true });
        $('#lh-msg').scrollIntoView({ block: 'center' });
      } else $('#lh-msg').textContent = find(clean(w, 80)) ? 'Dieses Wort steht schon in deinem Heft.' : 'Das Wort konnte nicht gespeichert werden.';
    };
    m.querySelectorAll('.lh-del').forEach(b => { b.onclick = () => { const i = list()[+b.dataset.k]; if (i && confirm(`„${i.w}“ löschen?`)) { const k = +b.dataset.k; remove(i.w); page(); const d = document.querySelectorAll('.lh-del'); (d[k] || d[d.length - 1] || $('#lh-w'))?.focus(); } }; });
  }
  const CR = () => DM.crumbs([['Meine Wörter', '#meine-woerter'], ['Wiederholen']]);
  function train() {
    const d = due(), all = list();
    if (!all.length) { location.replace('#meine-woerter'); return; }
    const round = (d.length ? d : all).map(i => [Math.random(), i]).sort((a, b) => a[0] - b[0]).slice(0, 10).map(p => p[1]);
    let k = 0, good = 0;
    const step = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (k >= round.length) {
        DM.page(`${CR()}<section class="dm-card lh-card"><h1>Fertig!</h1><p class="lh-big">${good} von ${round.length} gewusst</p>${good < round.length ? '<p>Die anderen Wörter kommen bald wieder.</p>' : ''}<p class="dm-actions"><button type="button" class="dm-btn" id="lh-back">Zu meinen Wörtern</button></p></section>`, 'lh-page');
        $('#lh-back').onclick = () => { location.hash = '#meine-woerter'; };
        if (good === round.length && DM.celebrate) DM.celebrate($('.lh-card'));
        return;
      }
      const i = round[k], art = /^(der|die|das) (.+)$/.exec(i.w);
      DM.page(`${CR()}<section class="dm-card lh-card"><h1 class="dk-h">Karte ${k + 1} von ${round.length}</h1>
        <p class="lh-word">${i.n ? `<span dir="auto" data-no-i18n>${x(i.n)}</span>` : `<span lang="de">${x(art ? art[2] : i.w)}</span>`}</p><p class="lh-q">${i.n ? 'Wie heißt das auf Deutsch?' : art ? 'der, die oder das? Sag einen Satz.' : 'Was bedeutet das? Sag einen Satz.'}</p>
        <div id="lh-side" hidden><p class="lh-sol"><b lang="de">${x(i.w)}</b> ${sayBtn(i.w)}</p>${i.f ? `<p lang="de">${x(i.f)}</p>` : ''}${i.b ? `<p lang="de">${x(i.b)} ${sayBtn(i.b)}</p>` : ''}</div>
        <p class="dm-actions" id="lh-act"><button type="button" class="dm-btn" id="lh-turn">Umdrehen</button></p><p><a href="#meine-woerter">Beenden</a></p></section>`, 'lh-page');
      bindSay($('main'));
      const done = () => { k++; save(); step(); };
      $('#lh-turn').onclick = () => {
        $('#lh-side').hidden = false;
        $('#lh-act').innerHTML = '<button type="button" class="dm-btn dm-btn-quiet" id="lh-no">Noch üben</button> <button type="button" class="dm-btn" id="lh-yes">Kann ich</button>';
        $('#lh-no').onclick = () => { i.box = 0; i.known = 0; i.due = Date.now(); done(); };
        $('#lh-yes').onclick = () => {
          good++;
          if (!i.known && i.due <= Date.now()) { if (i.box >= IV.length - 1) i.known = 1; else i.box++; i.due = Date.now() + IV[i.box] * DAY; }
          done();
        };
        $('#lh-yes').focus({ preventScroll: true });
      };
      $('#lh-turn').focus({ preventScroll: true });
    };
    step();
  }
  DM.routes ||= {};
  DM.routes['meine-woerter'] = p => { if (p && p[1] === 'ueben') train(); else page(); };

  /* ---------- "Heute für dich" on the start page (only after a level was chosen) ---------- */
  DM.todayCard = lv => {
    if (!lv) return '';
    const dl = ['A1', 'A2', 'B1', 'B2'].includes(lv) ? lv : 'A1';
    let ch = {};
    try { ch = window.DMChallenge ? DMChallenge.status() || {} : {}; } catch { ch = {}; }
    const dk = (DM.store.diktat || {}).day === new Date().toDateString(), w = due().length;
    const row = (href, ico, t, s, ok) => `<li class="${ok ? 'is-done' : ''}"><a href="${href}"><span aria-hidden="true">${ok ? '✅' : ico}</span><span><b>${t}</b><small>${s}</small></span></a></li>`;
    return `<section class="lh-today" aria-labelledby="lh-th"><h2 id="lh-th">Heute für dich</h2><ul>
      ${lv === 'A0' ? row('#erste-schritte', '🖼️', 'Bildkarten', 'Wörter hören und sehen') : row('#challenge', '🔥', 'Tages-Challenge', ch.doneToday ? 'Heute geschafft' : ch.streak ? `${ch.streak} ${ch.streak === 1 ? 'Tag' : 'Tage'} in Folge` : '3 Minuten', ch.doneToday)}
      ${lv === 'A0' ? row('#laute', '🗣️', 'Laute', 'Hören und nachsprechen') : row('#diktat/' + dl, '✍️', 'Diktat', dk ? 'Heute geschafft' : '5 Sätze hören und schreiben', dk)}
      ${row('#meine-woerter', '⭐', 'Meine Wörter', w ? w + ' heute dran' : list().length ? 'Alles wiederholt' : 'Wörter merken', list().length > 0 && !w)}
    </ul><div class="lh-wod" id="lh-wod" hidden></div></section>`;
  };
  const GROUP = { A0: ['wa1', 'a1'], A1: ['wa1', 'a1'], A2: ['wdtz', 'dtz'], B1: ['wb1', 'b1'], B2: ['wb2', 'b2'] };
  DM.todayInit = async lv => {
    const box = $('#lh-wod');
    if (!box || lv === 'A0' || !GROUP[lv] || !window.DMLazy || !DMLazy.group) return;
    const [g, id] = GROUP[lv];
    await DMLazy.group(g);
    const W = id === 'b2' ? DM.b2Woerter : DM.woerter && DM.woerter[id];
    const words = W ? W.themes.flatMap(t => t.words).filter(w => w.k !== 'F') : [];
    if (!words.length || !box.isConnected) return;
    const d = new Date(), w = words[(Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY) * 37) % words.length];
    box.hidden = false;
    box.innerHTML = `<small>Wort des Tages</small><p><b lang="de">${x(clean(w.w, 80))}</b> ${sayBtn(clean(w.w, 80))} ${star(w)}</p><p class="lh-ex" lang="de">${x(clean(w.b, 200))}</p>`;
    bindSay(box);
  };

  /* ---------- search button in the header ---------- */
  function headerSearch() {
    const head = $('header.dm-header');
    if (!head || $('.lh-search', head)) return;
    const a = document.createElement('a');
    a.className = 'lh-search'; a.href = '#suche'; a.title = 'Suche';
    a.setAttribute('aria-label', 'Suche');
    a.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>';
    const sw = $('.dm-3d-switch', head);
    if (sw) sw.before(a); else head.append(a);
  }
  headerSearch();
})();
