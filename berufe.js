/* Professions A1 (#berufe, readable page /berufe/): 30 professions with der/die, plural, workplace, activity,
   example sentence (verb on position 2), translations, device voice (recordings later by key), dialogue trainer.
   Data: berufe-data.js (DM.berufe). Game: spiele/berufe-a1.js. Approved concept: qa-out/berufe-2026-11-26/. */
(function () {
  'use strict';
  const x = DM.esc, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const VIDEO = 'paHxGVmNdzU', KAHOOT = 'https://create.kahoot.it/details/8800c1bb-1925-499a-bd91-510dc1b6f131';
  const LANG_NAMES = { en: 'English', uk: 'Українська', ru: 'Русский', ar: 'العربية', fa: 'فارسی / دری', tr: 'Türkçe', es: 'Español', it: 'Italiano', fr: 'Français', ro: 'Română' };
  const RTL = { ar: 1, fa: 1 };
  const GROUPS = [['alle', 'Alle'], ['alltag', 'Alltag & Arbeit'], ['traum', 'Traumberufe']];
  // search: case, umlauts (ä = ae …), ß = ss and accents do not matter
  const norm = t => String(t || '').toLocaleLowerCase('de').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/\p{M}/gu, '');
  const noun = s => s.replace(/^(der|die|das) /, '');
  const wordSay = b => `${b.m}. ${b.f}.`;
  const sentence = b => b.satz.join(' ');
  const isImg = s => /^[\w-]+\/[\w-]+$/.test(s);

  let lang = '';
  try { const v = localStorage.getItem('dmd.eslang'); if (v && LANG_NAMES[v]) lang = v; } catch {}
  let group = 'alle';

  const css = `
.bf-page .bf-lead{margin:.2em 0 0}
.bf-sec{margin:22px 0}
.bf-sec>h2{font-size:22px;margin:0 0 10px}
.bf-video{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.bf-video-box{margin-top:12px}
.bf-rm{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.bf-rm li{display:flex;gap:10px;align-items:flex-start}
.bf-rm li>span{flex:1;min-width:0;padding-top:9px;overflow-wrap:anywhere}
.bf-rm s{color:var(--dm-rot)}
.bf-rm em{font-style:normal;font-weight:700;color:var(--dm-rot)}
.bf-merk{margin:12px 0 0;padding:10px 14px;border-left:4px solid var(--dm-marker);background:var(--dm-paper);border-radius:8px}
.bf-say{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:44px;min-height:44px;padding:0 12px;border:2px solid var(--dm-line);border-radius:12px;background:var(--dm-surface);color:var(--dm-tinte);font:700 16px/1.2 var(--dm-font);cursor:pointer}
.bf-say:hover{border-color:var(--dm-tinte)}
.bf-say.is-playing{background:var(--dm-tinte);border-color:var(--dm-tinte);color:#fff}
.bf-tools{display:grid;gap:10px;margin:8px 0 4px;max-width:640px}
.bf-tools input[type=search],.bf-tools select{width:100%;box-sizing:border-box;min-height:48px;padding:10px 14px;border:2px solid var(--dm-line);border-radius:12px;background:var(--dm-surface);color:var(--dm-ink);font:17px/1.3 var(--dm-font)}
.bf-tools label>b{display:block;font-size:15px;margin:0 0 4px}
.bf-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.bf-chips{display:flex;flex-wrap:wrap;gap:8px}
.bf-chips button{min-height:44px;padding:0 16px;border:2px solid var(--dm-line);border-radius:999px;background:var(--dm-surface);color:var(--dm-tinte);font:700 16px/1.2 var(--dm-font);cursor:pointer}
.bf-chips button[aria-pressed=true]{background:var(--dm-tinte);border-color:var(--dm-tinte);color:#fff}
.bf-count{margin:6px 0 0;color:var(--dm-muted);font-size:16px}
.bf-legend{font-size:16px;color:var(--dm-muted);margin:6px 0 0}
.bf-grid{list-style:none;margin:0;padding:0;display:grid;gap:14px;grid-template-columns:1fr}
@media (min-width:600px){.bf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:960px){.bf-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.bf-card{display:flex;flex-direction:column;gap:8px;padding:16px;scroll-margin-top:90px}
.bf-card:focus{outline:none}
.bf-card:focus-visible{outline:3px solid var(--dm-tinte);outline-offset:3px}
.bf-card.is-flash{border-color:var(--dm-tinte);box-shadow:0 0 0 4px var(--dm-tinte-soft)}
.bf-top{display:flex;gap:12px;align-items:center}
.bf-pic{flex:0 0 auto;width:88px;height:88px;border-radius:12px;background:var(--dm-tinte-soft);display:flex;align-items:center;justify-content:center;overflow:hidden}
.bf-pic img{width:100%;height:100%;object-fit:cover;display:block}
.bf-emo{font-size:48px;line-height:1}
.bf-card h3{margin:0;font-size:18px;line-height:1.35;min-width:0;overflow-wrap:anywhere;flex:1}
.bf-art{display:inline-block;padding:0 6px;border-radius:6px;font-size:15px;font-weight:700;color:#fff;margin-right:3px}
.bf-der{background:#2463c7}.bf-die{background:#c2362b}
.bf-pl,.bf-neu,.bf-info{margin:0;font-size:15.5px;overflow-wrap:anywhere}
.bf-pl b{font-weight:700}
.bf-neu,.bf-info{color:var(--dm-muted)}
.bf-meta{margin:0;padding:0;list-style:none;display:grid;gap:2px;font-size:16px}
.bf-satz{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 0;padding:0;list-style:none}
.bf-satz li{padding:4px 10px;border:1px solid var(--dm-line);border-radius:8px;background:var(--dm-paper);font-size:16px;min-width:0;overflow-wrap:anywhere}
.bf-satz li.bf-verb{background:var(--dm-marker);border-color:var(--dm-sun);font-weight:700;color:#172036}
.bf-tr{margin:0;font-size:16px;color:var(--dm-ink);overflow-wrap:anywhere}
.bf-tr span{display:inline-block}
.bf-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:4px}
.bf-acts .lh-star{min-width:44px;min-height:44px}
.bf-empty{padding:16px;border:1px dashed var(--dm-line);border-radius:var(--dm-r)}
.bf-dialogs{display:grid;gap:14px;grid-template-columns:1fr}
@media (min-width:760px){.bf-dialogs{grid-template-columns:repeat(2,minmax(0,1fr))}}
.bf-dlg h3{margin:0 0 8px;font-size:18px}
.bf-dlg ol{list-style:none;margin:0 0 10px;padding:0;display:grid;gap:8px}
.bf-dlg li{display:flex;gap:10px;align-items:flex-start}
.bf-dlg li>span{flex:1;min-width:0;padding-top:9px;overflow-wrap:anywhere}
.bf-dlg li b{display:inline-block;min-width:1.6em;color:var(--dm-tinte)}
.bf-practice{display:grid;gap:10px;grid-template-columns:1fr}
@media (min-width:600px){.bf-practice{grid-template-columns:repeat(2,minmax(0,1fr))}}
.bf-practice .dm-btn{width:100%;box-sizing:border-box;text-align:center;white-space:normal}
.bf-printfoot{display:none}
@media (prefers-reduced-motion:reduce){.bf-card{scroll-behavior:auto;transition:none}}
@media print{
  body:has(.bf-page) header,body:has(.bf-page) footer,body:has(.bf-page) .dm-backbar,body:has(.bf-page) .dm-bell,body:has(.bf-page) .dm-tour{display:none!important}
  .bf-page .dm-crumbs,.bf-noprint,.bf-acts,.bf-tools,.bf-count{display:none!important}
  .bf-page .bf-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .bf-card,.bf-page .dm-rv{opacity:1!important;transform:none!important}
  .bf-card{break-inside:avoid;padding:8px;box-shadow:none;border:1px solid #999}
  .bf-pic{width:56px;height:56px}.bf-emo{font-size:32px}
  .bf-card h3{font-size:14px}.bf-pl,.bf-neu,.bf-info,.bf-meta,.bf-satz li,.bf-tr{font-size:12px}
  .bf-art{color:#000!important;background:none!important;border:1px solid #000;padding:0 3px}
  .bf-printfoot{display:block;margin-top:12px;font-size:12px;text-align:center}
}`;
  const addCss = () => { if (!document.getElementById('bf-css')) { const s = document.createElement('style'); s.id = 'bf-css'; s.textContent = css; document.head.appendChild(s); } };

  const sayBtn = (text, key, label, aria) => `<button type="button" class="bf-say" data-say="${x(text)}" data-key="${x(key)}" aria-label="${x(aria)}"><span aria-hidden="true">🔊</span>${label ? ' ' + x(label) : ''}</button>`;
  const art = s => s.replace(/^(der|die) (.+)$/, (_, a, n) => `<span class="bf-art bf-${a}">${a}</span> ${x(n)}`);
  const pic = b => isImg(b.bild)
    ? `<span class="bf-pic"><img src="assets/${x(b.bild)}.webp" width="256" height="256" loading="lazy" alt=""></span>`
    : `<span class="bf-pic"><span class="bf-emo" aria-hidden="true">${x(b.bild)}</span></span>`;
  const trLine = b => {
    if (!lang || !b.tr[lang]) return '';
    return `<p class="bf-tr"><span lang="${lang}"${RTL[lang] ? ' dir="rtl"' : ''}>${x(b.tr[lang])}</span></p>`;
  };
  const star = b => window.DMWoerter ? DMWoerter.star({ w: `${b.m} · ${b.f}`, f: `${b.pm} · ${b.pf}`, b: sentence(b) }) : '';
  const card = b => `<li><article class="dm-card bf-card" id="bf-${b.id}" tabindex="-1" aria-labelledby="bf-h-${b.id}">
    <div class="bf-top">${pic(b)}<h3 id="bf-h-${b.id}" lang="de">${art(b.m)} · ${art(b.f)}</h3></div>
    <p class="bf-pl" lang="de">Plural: <b>${x(b.pm)}</b> · <b>${x(b.pf)}</b></p>
    ${b.neutral ? `<p class="bf-neu" lang="de">Für alle: ${x(b.neutral)}</p>` : ''}
    <ul class="bf-meta" lang="de"><li><span aria-hidden="true">📍</span> ${x(b.ort)}</li><li><span aria-hidden="true">✋</span> ${x(b.taetigkeit)}</li></ul>
    <ol class="bf-satz" lang="de" aria-label="Beispielsatz: ${x(sentence(b))}"><li>${x(b.satz[0])}</li><li class="bf-verb">${x(b.satz[1])}</li><li>${x(b.satz[2])}</li></ol>
    ${b.hinweis ? `<p class="bf-info" lang="de"><span aria-hidden="true">ℹ️</span> ${x(b.hinweis)}</p>` : ''}
    ${trLine(b)}
    <div class="bf-acts">${sayBtn(wordSay(b), `bf-${b.id}-w`, 'Wort', `${noun(b.m)} anhören`)}${sayBtn(sentence(b), `bf-${b.id}-s`, 'Satz', `Satz anhören: ${sentence(b)}`)}${star(b)}</div>
  </article></li>`;

  const matches = (b, q) => !q || norm([b.m, b.f, b.pm, b.pf, b.ort, b.taetigkeit, b.neutral || '', lang ? b.tr[lang] : ''].join(' | ')).includes(q);
  const visible = () => { const q = norm(($('#bf-q') || {}).value || '').trim(); return DM.berufe.list.filter(b => (group === 'alle' || b.gruppe === group) && matches(b, q)); };

  function drawCards() {
    const list = visible(), all = DM.berufe.list.length;
    const part = (g, h) => { const l = list.filter(b => b.gruppe === g); return l.length ? `<section class="bf-sec" aria-labelledby="bf-g-${g}"><h2 id="bf-g-${g}">${h}</h2><ul class="bf-grid">${l.map(card).join('')}</ul></section>` : ''; };
    $('#bf-cards').innerHTML = list.length
      ? part('alltag', 'Alltag & Arbeit') + part('traum', 'Traumberufe')
      : '<p class="bf-empty">Kein Beruf gefunden. Tipp: Probier „Arzt“ oder „Kita“.</p>';
    $('#bf-n').textContent = `${list.length} von ${all} Berufen`;
  }

  // one handler for all 🔊 buttons on the page: second click stops
  function bindSay(root) {
    root.addEventListener('click', e => {
      const b = e.target.closest('.bf-say');
      if (!b) return;
      if (b.classList.contains('is-playing')) { DM.stopSpeaking(); b.classList.remove('is-playing'); return; }
      $$('.bf-say.is-playing', root).forEach(o => o.classList.remove('is-playing'));
      const ok = DM.speak(b.dataset.say, { key: b.dataset.key, onend: () => b.classList.remove('is-playing') });
      if (ok) b.classList.add('is-playing');
      else if (!b.nextElementSibling || !b.nextElementSibling.classList.contains('dm-hint')) b.insertAdjacentHTML('afterend', '<p class="dm-hint">Dein Browser kann keinen Text vorlesen. Lies den Text bitte selbst laut.</p>');
    });
  }

  function showVideo() {
    const box = $('#bf-video-box');
    const embed = () => {
      box.innerHTML = `<div class="dm-player"><iframe src="https://www.youtube-nocookie.com/embed/${VIDEO}?rel=0&autoplay=1" title="Berufe A1 – Video von Deutsch mit Dennis" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    };
    if (DM.store && DM.store.ytConsent) { embed(); return; }
    box.innerHTML = `<div class="dm-consent"><p><b>Das Video wird von YouTube geladen.</b> Wenn du es hier ansiehst, überträgt dein Browser Daten an YouTube (Google). Mehr dazu in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
      <div class="dm-row"><button type="button" class="dm-btn" id="bf-consent">Video hier anzeigen</button><a class="dm-btn dm-btn-quiet" href="https://www.youtube.com/watch?v=${VIDEO}" target="_blank" rel="noopener noreferrer">Auf YouTube öffnen ↗</a></div></div>`;
    $('#bf-consent').onclick = () => { try { DM.store.ytConsent = true; DM.save && DM.save(); } catch {} embed(); };
    $('#bf-consent').focus();
  }

  function randomJob() {
    let list = visible();
    if (!list.length) { $('#bf-q').value = ''; group = 'alle'; syncChips(); drawCards(); list = visible(); }
    const b = list[Math.floor(Math.random() * list.length)], el = document.getElementById('bf-' + b.id);
    if (!el) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    $$('.bf-card.is-flash').forEach(c => c.classList.remove('is-flash'));
    el.classList.add('is-flash'); setTimeout(() => el.classList.remove('is-flash'), 2200);
    el.focus({ preventScroll: true });
    DM.speak(wordSay(b), { key: `bf-${b.id}-w`, onend: ok => { if (ok && document.activeElement === el) DM.speak(sentence(b), { key: `bf-${b.id}-s` }); } });
  }
  const syncChips = () => $$('#bf-grp button').forEach(o => o.setAttribute('aria-pressed', String(o.dataset.g === group)));

  const dialog = (id, title, lines) => `<article class="dm-card bf-dlg" aria-labelledby="bf-d-${id}"><h3 id="bf-d-${id}">${x(title)}</h3>
    <ol lang="de">${lines.map(([who, t], i) => `<li>${sayBtn(t, `bf-${id}-${i + 1}`, '', `Anhören: ${t}`)}<span><b>${who}:</b> ${x(t)}</span></li>`).join('')}</ol>
    <div class="bf-row bf-noprint"><button type="button" class="dm-btn dm-btn-quiet" data-dlg="${id}"><span aria-hidden="true">▶</span> Ganzen Dialog anhören</button><button type="button" class="dm-btn dm-btn-quiet" data-stop><span aria-hidden="true">■</span> Stopp</button></div></article>`;

  // game options: remember the chosen exercise so the game's start page has it selected
  const OPTS = [['bild', '🖼 Wer ist das?'], ['taetigkeit', '✋ Was macht …?'], ['ort', '📍 Wo arbeitet …?'], ['ichbin', '💬 Ich bin …']];
  const setOpt = o => { try { const all = JSON.parse(localStorage.getItem('dm-spiele') || '{}'); all['berufe-a1'] = { ...(all['berufe-a1'] || {}), opt: o }; localStorage.setItem('dm-spiele', JSON.stringify(all)); } catch {} };

  function render() {
    addCss();
    const B = DM.berufe;
    DM.page(`${DM.crumbs([['A1', '#niveau/A1'], ['Berufe']])}
      <div class="dm-head"><p class="dm-kicker">A1 · Wortschatz</p><h1>Berufe – A1</h1><p class="dm-lead bf-lead">30 Berufe mit der/die, Plural, Arbeitsort und Beispielsatz.</p></div>
      <section class="bf-sec bf-noprint" aria-labelledby="bf-v-h"><h2 id="bf-v-h">Erst schauen, dann üben</h2>
        <div class="bf-video"><button type="button" class="dm-btn" id="bf-play"><span aria-hidden="true">▶</span> Video ansehen: Berufe A1</button><a href="https://www.youtube.com/watch?v=${VIDEO}" target="_blank" rel="noopener noreferrer">auf YouTube ↗</a></div>
        <div class="bf-video-box" id="bf-video-box"></div></section>
      <section class="dm-card bf-sec bf-noprint" aria-labelledby="bf-rm-h"><h2 id="bf-rm-h">Wichtige Sätze</h2>
        <ul class="bf-rm" lang="de">${B.redemittel.map((r, i) => `<li>${sayBtn(r.say, `bf-rm-${i + 1}`, '', `Anhören: ${r.say}`)}<span>${x(r.t)}${r.note ? ` → <em>${x(r.note)}</em> (nicht: <s>${x(r.wrong)}</s>)` : ''}</span></li>`).join('')}</ul>
        <p class="bf-merk" lang="de"><b>Merksatz:</b> Frauen: meistens mit <b>-in</b>, oft mit Umlaut: der Arzt → die <b>Ä</b>rztin, der Koch → die K<b>ö</b>chin.</p></section>
      <section class="bf-sec" aria-labelledby="bf-l-h"><h2 id="bf-l-h">Alle Berufe</h2>
        <div class="bf-tools">
          <label for="bf-q"><b>Beruf suchen</b></label><input type="search" id="bf-q" placeholder="z. B. Ärztin, Kita, kochen" autocomplete="off">
          <div class="bf-chips" id="bf-grp" role="group" aria-label="Gruppe">${GROUPS.map(([g, t]) => `<button type="button" data-g="${g}" aria-pressed="${g === group}">${t}</button>`).join('')}</div>
          <label for="bf-lang"><b>Übersetzung</b></label><select id="bf-lang"><option value="">Keine Übersetzung</option>${B.langs.map(l => `<option value="${l}"${l === lang ? ' selected' : ''} lang="${l}">${LANG_NAMES[l]}</option>`).join('')}</select>
          <div class="bf-row"><button type="button" class="dm-btn dm-btn-quiet" id="bf-rand"><span aria-hidden="true">🎲</span> Zufallsberuf</button></div>
        </div>
        <p class="bf-count" id="bf-n" aria-live="polite"></p>
        <p class="bf-legend">Das <b>Verb</b> steht im Satz immer auf <b>Platz 2</b> (gelb). Farbe: <span class="bf-art bf-der">der</span> = männlich, <span class="bf-art bf-die">die</span> = weiblich.</p>
        <div id="bf-cards"></div></section>
      <section class="bf-sec bf-noprint" aria-labelledby="bf-dl-h"><h2 id="bf-dl-h">Dialog-Trainer</h2>
        <div class="bf-dialogs">${dialog('sie', 'Förmlich (Sie) – zum Beispiel beim Amt oder bei der Arbeit', B.dialogSie)}${dialog('du', 'Locker (du) – mit Freunden', B.dialogDu)}</div>
        <p><b>Jetzt du:</b> Sprich den Dialog zu zweit. Tauscht die Rollen. Setzt euren Beruf ein.</p></section>
      <section class="bf-sec bf-noprint" aria-labelledby="bf-p-h"><h2 id="bf-p-h">Jetzt üben</h2>
        <div class="bf-practice">${OPTS.map(([o, t]) => `<a class="dm-btn" href="#spiele/berufe-a1" data-opt="${o}">Quiz: ${x(t)}</a>`).join('')}
          <a class="dm-btn dm-btn-quiet" href="#spiele/satzbau">🧱 Satz-Baumeister: Verb auf Platz 2</a>
          <a class="dm-btn dm-btn-quiet" href="${KAHOOT}" target="_blank" rel="noopener">🟣 Kahoot: Berufe &amp; Traumberuf ↗</a>
          <a class="dm-btn dm-btn-quiet" href="material/arbeitsblaetter/es-berufe.pdf" target="_blank" rel="noopener">📄 Arbeitsblatt Berufe (PDF)</a>
          <a class="dm-btn dm-btn-quiet" href="#erste-schritte/berufe">← Thema Berufe (Erste Schritte)</a></div>
        <div class="bf-row" style="margin-top:12px"><button type="button" class="dm-btn dm-btn-quiet" id="bf-print"><span aria-hidden="true">🖨</span> Drucken</button><button type="button" class="dm-btn dm-btn-quiet" data-share><span aria-hidden="true">🔗</span> Teilen</button></div></section>
      <p class="bf-printfoot">created by D.Prudnikau · deutsch-mit-dennis.de/berufe/</p>`, 'bf-page');
    const root = $('.bf-page');
    bindSay(root);
    drawCards();
    $('#bf-q').oninput = drawCards;
    $$('#bf-grp button').forEach(b => { b.onclick = () => { group = b.dataset.g; syncChips(); drawCards(); }; });
    $('#bf-lang').onchange = e => { lang = e.target.value; drawCards(); };
    $('#bf-rand').onclick = randomJob;
    $('#bf-play').onclick = showVideo;
    $('#bf-print').onclick = () => window.print();
    $$('[data-dlg]', root).forEach(b => { b.onclick = () => { const l = b.dataset.dlg === 'sie' ? B.dialogSie : B.dialogDu; const id = b.dataset.dlg; const next = i => { if (i >= l.length) return; DM.speak(l[i][1], { key: `bf-${id}-${i + 1}`, onend: ok => { if (ok) setTimeout(() => next(i + 1), 350); } }); }; next(0); }; });
    $$('[data-stop]', root).forEach(b => { b.onclick = () => { DM.stopSpeaking(); $$('.bf-say.is-playing', root).forEach(o => o.classList.remove('is-playing')); }; });
    $$('[data-opt]', root).forEach(a => { a.addEventListener('click', () => setOpt(a.dataset.opt)); });
  }
  DM.routes = DM.routes || {};
  DM.routes.berufe = () => render();
})();
