/* LiD-Trainer: alle 300 allgemeinen Fragen + 10 Fragen NRW aus dem BAMF-Gesamtfragenkatalog.
   Lernen in Blöcken, Fehler wiederholen, Fragenliste und Testsimulation (33 Fragen, 60 Minuten).
   Fortschritt bleibt nur im Browser (DM.store.lid). */
(() => {
  const K = window.LID_KATALOG || [];
  const GEN = K.filter(q => typeof q.nr === 'number');
  const NRW = K.filter(q => typeof q.nr !== 'number');
  const BLOCK = 30;
  const BLOCKS = Math.ceil(GEN.length / BLOCK); // 10 Blöcke + NRW
  const IMG = 'assets/lid-fragen/';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const e = s => DM.esc(s);
  const mem = () => { const m = DM.store; m.lid ||= {}; return m.lid; };
  const stat = id => mem()[id] || (mem()[id] = { r: 0, f: 0, last: null });
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nrLabel = q => typeof q.nr === 'number' ? `Frage ${q.nr}` : q.nr.replace('NRW', 'NRW-Frage');
  const blockOf = n => n === 'nrw' ? NRW : GEN.slice((n - 1) * BLOCK, n * BLOCK);
  const blockName = n => n === 'nrw' ? 'NRW (10 Fragen)' : `Fragen ${(n - 1) * BLOCK + 1}–${Math.min(n * BLOCK, GEN.length)}`;
  const isPicAnswer = q => q.img.length === 4 && /^Bild \d$/.test(q.a[0]);
  const known = q => { const s = mem()[q.id]; return s && s.last === true; };
  const wrongList = () => K.filter(q => mem()[q.id]?.last === false);
  const head = (title, lead) => `${DM.crumbs([['Prüfungstraining', '#pruefung'], ['LiD-Trainer', title ? '#lid' : null], ...(title ? [[title]] : [])])}
    <div class="dm-head"><h1>${title || 'LiD-Trainer: alle 310 Fragen'}</h1>${lead ? `<p class="dm-lead">${lead}</p>` : ''}</div>`;
  const foot = () => `<p class="dm-small lid-src">Fragen und Antworten: offizieller Gesamtfragenkatalog des BAMF (300 allgemeine Fragen + 10 Fragen Nordrhein-Westfalen), Stand ${e(window.LID_KATALOG_STAND || '')}. Aufbereitet nach dem Datensatz <a href="https://github.com/YehorAltshuler/bamf-lid-dataset" target="_blank" rel="noopener">bamf-lid-dataset</a>. Kein Angebot des BAMF. Den Katalog als PDF findest du beim <a href="https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.pdf?__blob=publicationFile" target="_blank" rel="noopener">BAMF ↗</a>.</p>`;

  function questionHTML(q, { chosen = null, reveal = false, name = 'a' } = {}) {
    const pic = isPicAnswer(q);
    const top = !pic && q.img.length ? `<figure class="lid-q-img">${q.img.map(f => `<img src="${IMG}${f}" alt="Abbildung zur Frage" loading="lazy">`).join('')}</figure>` : '';
    const opts = q.a.map((t, i) => {
      let cls = 'lid-opt';
      if (reveal && i === q.s) cls += ' is-right';
      else if (reveal && i === chosen) cls += ' is-wrong';
      else if (!reveal && i === chosen) cls += ' is-chosen';
      const body = pic ? `<img src="${IMG}${q.img[i]}" alt="Bild ${i + 1}" loading="lazy"><span>Bild ${i + 1}</span>` : `<span>${e(t)}</span>`;
      return `<button type="button" class="${cls}${pic ? ' lid-opt-pic' : ''}" data-i="${i}" ${reveal ? 'disabled' : ''}><b>${'ABCD'[i]}</b>${body}</button>`;
    }).join('');
    return `<div class="lid-q"><p class="lid-q-nr">${nrLabel(q)}</p><h2 class="lid-q-text">${e(q.q)}</h2>${top}<div class="lid-opts${pic ? ' lid-opts-pic' : ''}" role="group" aria-label="Antworten">${opts}</div></div>`;
  }
  const speakText = q => `${q.q}. ${isPicAnswer(q) ? '' : q.a.map((t, i) => `${'ABCD'[i]}: ${t}`).join('. ')}`;

  /* ---------- Übersicht ---------- */
  function hub() {
    const all = K.length, ok = K.filter(known).length, wrong = wrongList().length;
    const blockCard = n => {
      const qs = blockOf(n), done = qs.filter(known).length;
      return `<a class="lid-block" href="#lid/lernen/${n}"><b>${blockName(n)}</b><span class="lid-bar"><i style="width:${Math.round(done / qs.length * 100)}%"></i></span><small>${done} von ${qs.length} sicher</small></a>`;
    };
    DM.page(`${head('', 'Alle 300 allgemeinen Fragen und die 10 Fragen für NRW aus dem offiziellen Katalog. Lerne in Blöcken, wiederhole deine Fehler und mach den Test unter echten Bedingungen.')}
      <section class="lid-stats dm-card">
        <div><b>${ok}</b><span>von ${all} Fragen sicher</span></div>
        <div><b>${wrong}</b><span>Fragen zum Wiederholen</span></div>
        <div><b>${mem()._best ?? '–'}</b><span>beste Testpunktzahl (von 33)</span></div>
        <span class="lid-bar lid-bar-big"><i style="width:${Math.round(ok / all * 100)}%"></i></span>
      </section>
      <div class="lid-actions">
        <a class="dm-btn" href="#lid/test">⏱ Test simulieren (33 Fragen, 60 Min.)</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/fehler" ${wrong ? '' : 'aria-disabled="true"'}>Fehler wiederholen (${wrong})</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/zufall">10 zufällige Fragen</a>
        <a class="dm-btn dm-btn-quiet" href="#lid/liste/1">Fragen mit Lösungen lesen</a>
      </div>
      <h2 class="lid-h2">Lernen in Blöcken</h2>
      <div class="lid-blocks">${Array.from({ length: BLOCKS }, (_, i) => blockCard(i + 1)).join('')}${blockCard('nrw')}</div>
      <details class="dm-card lid-info"><summary>So funktioniert der Test „Leben in Deutschland“</summary>
        <p>Der Test hat <b>33 Fragen</b>: 30 aus den 300 allgemeinen Fragen und 3 zu deinem Bundesland. Pro Frage ist genau eine von vier Antworten richtig. Du hast <b>60 Minuten</b> Zeit.</p>
        <p>Mit <b>mindestens 15 richtigen Antworten</b> hast du den Test bestanden (Orientierungskurs). Für die <b>Einbürgerung</b> brauchst du <b>mindestens 17</b>.</p>
        <p>Tipp von Dennis: Lerne jeden Tag einen Block. Mach am Ende des Blocks „Fehler wiederholen“, bis die Liste leer ist. Wenn du im Test dreimal hintereinander über 28 Punkte hast, bist du gut vorbereitet.</p></details>
      <p class="dm-small"><button type="button" class="dm-linkbtn" id="lid-reset">Fortschritt zurücksetzen</button> – dein Fortschritt bleibt nur auf diesem Gerät.</p>
      ${foot()}`, 'lid-page');
    $('#lid-reset').onclick = () => { if (confirmReset()) { DM.store.lid = {}; DM.save(); hub(); } };
  }
  function confirmReset() {
    const b = $('#lid-reset');
    if (b.dataset.sure) return true;
    b.dataset.sure = '1'; b.textContent = 'Wirklich alles löschen? Nochmal klicken.'; return false;
  }

  /* ---------- Lernmodus: eine Frage nach der anderen ---------- */
  let session = null;
  function learn(list, title, back) {
    session = { list, pos: 0, right: 0, title, back, key: location.hash };
    drawLearn();
  }
  function drawLearn() {
    const s = session, q = s.list[s.pos];
    if (!q) return learnEnd();
    DM.page(`${head(s.title, '')}
      <div class="lid-progress"><span>${s.pos + 1} / ${s.list.length}</span><span class="lid-bar"><i style="width:${Math.round(s.pos / s.list.length * 100)}%"></i></span><span>✓ ${s.right}</span></div>
      <section class="dm-card lid-card">${questionHTML(q)}
        <div class="lid-under"><button type="button" class="dm-btn dm-btn-quiet dm-speak-lid">🔊 Vorlesen</button><p class="lid-feedback" role="status" aria-live="polite"></p><button type="button" class="dm-btn lid-next" hidden>Weiter →</button></div>
      </section>
      <p><a href="${s.back}">← Zurück zur Übersicht</a></p>${foot()}`, 'lid-page');
    $('.dm-speak-lid').onclick = () => DM.speak?.(speakText(q));
    $$('.lid-opt').forEach(b => b.onclick = () => {
      const i = +b.dataset.i, ok = i === q.s, st = stat(q.id);
      ok ? st.r++ : st.f++; st.last = ok; DM.save();
      if (ok) s.right++;
      $('.lid-card .lid-q').outerHTML = questionHTML(q, { chosen: i, reveal: true });
      $('.lid-feedback').innerHTML = ok ? '<b class="ok">Richtig!</b>' : `<b class="no">Leider falsch.</b> Richtig ist <b>${'ABCD'[q.s]}</b>${isPicAnswer(q) ? '' : ': ' + e(q.a[q.s].replace(/\.$/, ''))}. Die Frage kommt in „Fehler wiederholen“.`;
      const n = $('.lid-next'); n.hidden = false; n.focus();
      n.onclick = () => { s.pos++; drawLearn(); window.scrollTo({ top: 0 }); };
    });
  }
  function learnEnd() {
    const s = session, wrong = s.list.length - s.right;
    DM.page(`${head(s.title, '')}
      <section class="dm-card lid-result ${wrong ? '' : 'is-pass'}"><p class="lid-big">${s.right} / ${s.list.length}</p><h2>${wrong ? 'Gut gemacht – jetzt die Fehler wiederholen.' : 'Super – alles richtig!'}</h2>
      <div class="lid-actions">${wrong ? '<a class="dm-btn" href="#lid/fehler">Fehler wiederholen</a>' : ''}<button type="button" class="dm-btn dm-btn-quiet" id="lid-again">Noch einmal (gemischt)</button><a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div></section>${foot()}`, 'lid-page');
    $('#lid-again').onclick = () => learn(shuffle(s.list), s.title, s.back);
  }

  /* ---------- Liste mit Lösungen ---------- */
  function list(n) {
    n = n === 'nrw' ? 'nrw' : Math.min(Math.max(+n || 1, 1), BLOCKS);
    const tabs = [...Array.from({ length: BLOCKS }, (_, i) => i + 1), 'nrw'].map(k => `<a href="#lid/liste/${k}" ${String(k) === String(n) ? 'aria-current="page"' : ''}><b>${k === 'nrw' ? 'NRW' : `${(k - 1) * BLOCK + 1}–${k * BLOCK}`}</b></a>`).join('');
    DM.page(`${head('Fragen mit Lösungen', 'Lies die Fragen und die richtige Antwort. Danach übst du den Block ohne Lösungen.')}
      <nav class="dm-tabs dm-tabs-small lid-tabs" aria-label="Block">${tabs}</nav>
      <ol class="lid-list">${blockOf(n).map(q => `<li class="dm-card"><p class="lid-q-nr">${nrLabel(q)} ${known(q) ? '<span class="lid-ok">✓ sicher</span>' : mem()[q.id]?.last === false ? '<span class="lid-no">↻ wiederholen</span>' : ''}</p><p class="lid-q-text">${e(q.q)}</p>${q.img.length && !isPicAnswer(q) ? `<figure class="lid-q-img">${q.img.map(f => `<img src="${IMG}${f}" alt="Abbildung" loading="lazy">`).join('')}</figure>` : ''}
        ${isPicAnswer(q) ? `<div class="lid-opts-pic lid-mini">${q.img.map((f, i) => `<figure class="${i === q.s ? 'is-right' : ''}"><img src="${IMG}${f}" alt="Bild ${i + 1}" loading="lazy"><figcaption>Bild ${i + 1}${i === q.s ? ' ✓' : ''}</figcaption></figure>`).join('')}</div>` : `<ul class="lid-ans">${q.a.map((t, i) => `<li class="${i === q.s ? 'is-right' : ''}">${i === q.s ? '✓ ' : ''}${e(t)}</li>`).join('')}</ul>`}</li>`).join('')}</ol>
      <div class="lid-actions"><a class="dm-btn" href="#lid/lernen/${n}">Diesen Block üben</a><a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div>${foot()}`, 'lid-page');
  }

  /* ---------- Testsimulation ---------- */
  let test = null, timer = null;
  function startTest() {
    test = { qs: [...shuffle(GEN).slice(0, 30), ...shuffle(NRW).slice(0, 3)], ans: Array(33).fill(null), pos: 0, end: Date.now() + 60 * 60 * 1000, done: false };
    drawTest();
  }
  const fmt = ms => { const t = Math.max(0, Math.round(ms / 1000)); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };
  function tick() {
    const el = $('#lid-clock'); if (!el || !test || test.done) { clearInterval(timer); return; }
    const left = test.end - Date.now(); el.textContent = fmt(left); el.classList.toggle('is-low', left < 5 * 60000);
    if (left <= 0) finishTest(true);
  }
  function drawTest() {
    if (!test || test.done) return startIntro();
    const q = test.qs[test.pos], answered = test.ans.filter(a => a !== null).length;
    DM.page(`${head('Testsimulation', '')}
      <div class="lid-testbar dm-card"><span>Frage <b>${test.pos + 1}</b> von 33</span><span>${answered} beantwortet</span><span class="lid-clock" aria-label="Restzeit">⏱ <b id="lid-clock">${fmt(test.end - Date.now())}</b></span></div>
      <nav class="lid-grid" aria-label="Fragen">${test.qs.map((_, i) => `<button type="button" data-go="${i}" class="${i === test.pos ? 'is-cur' : ''} ${test.ans[i] !== null ? 'is-done' : ''}">${i + 1}</button>`).join('')}</nav>
      <section class="dm-card lid-card">${questionHTML(q, { chosen: test.ans[test.pos] })}</section>
      <div class="lid-actions"><button type="button" class="dm-btn dm-btn-quiet" id="lid-prev" ${test.pos ? '' : 'disabled'}>← Zurück</button><button type="button" class="dm-btn dm-btn-quiet" id="lid-nxt" ${test.pos < 32 ? '' : 'disabled'}>Weiter →</button><button type="button" class="dm-btn" id="lid-fin">Test abgeben</button></div>
      <p class="dm-small">Wie in der Prüfung: Du bekommst die Lösungen erst am Ende. Du kannst jede Antwort bis zur Abgabe ändern.</p>`, 'lid-page');
    $$('.lid-opt').forEach(b => b.onclick = () => { test.ans[test.pos] = +b.dataset.i; if (test.pos < 32) test.pos++; drawTest(); });
    $$('[data-go]').forEach(b => b.onclick = () => { test.pos = +b.dataset.go; drawTest(); });
    $('#lid-prev').onclick = () => { test.pos--; drawTest(); };
    $('#lid-nxt').onclick = () => { test.pos++; drawTest(); };
    $('#lid-fin').onclick = () => {
      const open = test.ans.filter(a => a === null).length, b = $('#lid-fin');
      if (open && !b.dataset.sure) { b.dataset.sure = 1; b.textContent = `${open} Fragen offen – trotzdem abgeben?`; return; }
      finishTest(false);
    };
    clearInterval(timer); timer = setInterval(tick, 1000);
  }
  function finishTest(timeout) {
    clearInterval(timer); test.done = true;
    const score = test.qs.filter((q, i) => test.ans[i] === q.s).length;
    test.qs.forEach((q, i) => { const st = stat(q.id), ok = test.ans[i] === q.s; ok ? st.r++ : st.f++; st.last = ok; });
    const m = mem(); m._best = Math.max(m._best || 0, score); (m._tests ||= []).push({ d: Date.now(), s: score }); m._tests = m._tests.slice(-20); DM.save();
    const pass = score >= 15, citizen = score >= 17;
    const wrong = test.qs.map((q, i) => [q, test.ans[i]]).filter(([q, a]) => a !== q.s);
    DM.page(`${head('Dein Testergebnis', timeout ? 'Die Zeit ist abgelaufen. Der Test wurde automatisch abgegeben.' : '')}
      <section class="dm-card lid-result ${pass ? 'is-pass' : 'is-fail'}"><p class="lid-big">${score} / 33</p>
        <h2>${citizen ? 'Bestanden – auch für die Einbürgerung (ab 17 Punkten).' : pass ? 'Bestanden (ab 15 Punkten). Für die Einbürgerung brauchst du 17.' : 'Noch nicht bestanden. Du brauchst mindestens 15 richtige Antworten.'}</h2>
        <div class="lid-actions"><button type="button" class="dm-btn" id="lid-new">Neuer Test</button>${wrong.length ? '<a class="dm-btn dm-btn-quiet" href="#lid/fehler">Fehler wiederholen</a>' : ''}<a class="dm-btn dm-btn-quiet" href="#lid">Zur Übersicht</a></div></section>
      ${wrong.length ? `<h2 class="lid-h2">Diese Fragen waren falsch oder offen</h2><div class="lid-review">${wrong.map(([q, a]) => `<section class="dm-card">${questionHTML(q, { chosen: a, reveal: true })}</section>`).join('')}</div>` : ''}${foot()}`, 'lid-page');
    $('#lid-new').onclick = startTest;
  }
  function startIntro() {
    DM.page(`${head('Testsimulation', 'Wie in der echten Prüfung: 33 Fragen (30 allgemeine + 3 zu NRW), 60 Minuten, ab 15 richtigen Antworten bestanden.')}
      <section class="dm-card lid-intro"><ul><li>Die Fragen werden zufällig aus dem offiziellen Katalog gezogen.</li><li>Die Uhr läuft ab dem Start. Nach 60 Minuten wird automatisch abgegeben.</li><li>Lösungen und Erklärung siehst du erst am Ende.</li><li>Für die Einbürgerung brauchst du mindestens 17 richtige Antworten.</li></ul>
      <button type="button" class="dm-btn" id="lid-start">Test starten</button></section>${foot()}`, 'lid-page');
    $('#lid-start').onclick = startTest;
  }

  DM.routes ||= {};
  DM.routes.lid = p => {
    if (p[1] !== 'test') clearInterval(timer);
    if (!p[1]) return hub();
    if (p[1] === 'lernen') { const n = p[2] === 'nrw' ? 'nrw' : Math.min(Math.max(+p[2] || 1, 1), BLOCKS); return learn(blockOf(n), `Lernen: ${blockName(n)}`, '#lid'); }
    if (p[1] === 'fehler') { const w = wrongList(); return w.length ? learn(shuffle(w), 'Fehler wiederholen', '#lid') : hub(); }
    if (p[1] === 'zufall') return learn(shuffle(K).slice(0, 10), '10 zufällige Fragen', '#lid');
    if (p[1] === 'liste') return list(p[2]);
    if (p[1] === 'test') return test && !test.done ? drawTest() : startIntro();
    hub();
  };
})();
