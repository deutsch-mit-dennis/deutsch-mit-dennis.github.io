/* Deutsch mit Dennis – zentrale Navigation und neue Seiten.
   Wird als letztes Skript geladen. Eigene Seiten werden hier gezeichnet,
   alle übrigen Bereiche (Lektionen, Wortschatz, Prüfungstraining, Leben in Deutschland,
   Kahoot, Pinnwand) laufen weiter über die bisherigen Skripte. */
(() => {
  const T = DM.teacher;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const x = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mainEl = document.querySelector('main');
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const LEVEL_NAMES = { A1: 'Erste Schritte', A2: 'Alltag meistern', B1: 'Sicher ausdrücken', B2: 'Deutsch im Beruf' };

  /* ---------- Speicher auf dem Gerät (nur lokal, nie übertragen) ---------- */
  const KEY = 'dmd.v1';
  let mem = {};
  try { mem = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { mem = {}; }
  mem.visited ||= {}; mem.done ||= {}; mem.drafts ||= {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch { /* privater Modus: nur für diese Sitzung */ } };
  DM.store = mem;

  /* ---------- Sprachausgabe (Vorlesen) ---------- */
  const synth = window.speechSynthesis;
  let voicesDE = [];
  const loadVoices = () => { if (!synth) return; voicesDE = synth.getVoices().filter(v => /^de(-|_|$)/i.test(v.lang)); };
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }
  function speak(text, { rate = 0.92, onend, dialogue = false } = {}) {
    if (!synth) { onend?.(false); return false; }
    synth.cancel();
    const parts = dialogue ? String(text).split(/\s+–\s+/) : [String(text)];
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part);
      u.lang = 'de-DE'; u.rate = rate;
      const v = voicesDE.length ? voicesDE[dialogue ? i % Math.min(voicesDE.length, 2) : 0] : null;
      if (v) u.voice = v;
      if (dialogue && voicesDE.length < 2) u.pitch = i % 2 ? 0.8 : 1.15;
      if (i === parts.length - 1) u.onend = () => onend?.(true);
      synth.speak(u);
    });
    return true;
  }
  const stopSpeaking = () => { try { synth?.cancel(); } catch {} };
  function bindSpeakButtons(root = mainEl) {
    $$('[data-speak]', root).forEach(b => {
      b.onclick = () => {
        const text = b.dataset.speak, label = b.textContent;
        if (b.classList.contains('is-playing')) { stopSpeaking(); b.classList.remove('is-playing'); b.textContent = label; return; }
        $$('.is-playing', root).forEach(o => o.classList.remove('is-playing'));
        const ok = speak(text, { rate: Number(b.dataset.rate || 0.92), dialogue: b.hasAttribute('data-dialogue'), onend: () => b.classList.remove('is-playing') });
        if (ok) b.classList.add('is-playing');
        else b.insertAdjacentHTML('afterend', '<p class="dm-hint">Dein Browser kann keinen Text vorlesen. Lies den Text bitte selbst laut.</p>');
      };
    });
  }
  const speakBtn = (text, label = 'Vorlesen', extra = '') => synth ? `<button type="button" class="dm-btn dm-btn-quiet dm-speak" data-speak="${x(text)}" ${extra}><span aria-hidden="true">🔊</span> ${label}</button>` : '';

  /* ---------- Videos von YouTube ---------- */
  const ID_RE = /^[A-Za-z0-9_-]{11}$/;
  const uploadsList = 'UU' + T.channelId.slice(2);
  function guessCategory(title) {
    const t = title.toLowerCase();
    if (/leben in deutschland|lid|bundestag|bundesrat|grundrecht|wahl|regiert|demokratie|orientierung/.test(t)) return 'orientierung';
    if (/dtz|prüfung|pruefung|b2|telc|dtb|экзамен|brief/.test(t)) return 'pruefung';
    return 'deutsch';
  }
  let videoPromise;
  function loadVideos() {
    if (videoPromise) return videoPromise;
    videoPromise = fetch('youtube-feed.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => Array.isArray(d.videos) ? d.videos : [])
      .catch(() => [])
      .then(feed => {
        const all = new Map();
        [...DM.videoSnapshot, ...feed].forEach(v => {
          if (!v || !ID_RE.test(v.id) || !v.title) return;
          all.set(v.id, { id: v.id, title: String(v.title), published: v.published || '', category: DM.videoCategories[v.category] ? v.category : guessCategory(String(v.title)) });
        });
        return [...all.values()].sort((a, b) => String(b.published).localeCompare(String(a.published)));
      });
    return videoPromise;
  }
  const isRussian = t => /[А-Яа-яЁё]/.test(t);
  const fmtDate = s => { const d = new Date(s); return isNaN(d) ? '' : d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }); };
  const ytConsent = () => !!mem.ytConsent;
  function giveYtConsent() { mem.ytConsent = true; save(); }
  function videoCard(v, { big = false } = {}) {
    const thumb = ytConsent() ? `<img src="https://i.ytimg.com/vi/${v.id}/${big ? 'hqdefault' : 'mqdefault'}.jpg" alt="" loading="lazy" width="320" height="180">` : `<span class="dm-vthumb-ph" aria-hidden="true">▶</span>`;
    return `<button type="button" class="dm-vcard dm-cat-${v.category}" data-play="${v.id}" data-title="${x(v.title)}">
      <span class="dm-vthumb">${thumb}</span>
      <span class="dm-vmeta"><span class="dm-tag">${DM.videoCategories[v.category]}${isRussian(v.title) ? ' · Erklärung auf Russisch' : ''}</span>
      <strong>${x(v.title)}</strong>${v.published ? `<small>${fmtDate(v.published)}</small>` : ''}</span></button>`;
  }
  function playerHTML(src, title) {
    if (!ytConsent()) {
      return `<div class="dm-consent"><p><b>Videos werden von YouTube geladen.</b> Wenn du sie hier ansiehst, überträgt dein Browser Daten an YouTube (Google). Mehr dazu in der <a href="#datenschutz">Datenschutzerklärung</a>.</p>
      <div class="dm-row"><button type="button" class="dm-btn" data-consent>Videos hier anzeigen</button><a class="dm-btn dm-btn-quiet" href="${T.youtube}" target="_blank" rel="noopener noreferrer">Auf YouTube öffnen ↗</a></div></div>`;
    }
    return `<div class="dm-player"><iframe src="${src}" title="${x(title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  }
  const embedFor = id => id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1` : `https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsList}&rel=0`;
  function bindVideoArea(root, rerender) {
    $$('[data-consent]', root).forEach(b => b.onclick = () => { giveYtConsent(); rerender(); });
    $$('[data-play]', root).forEach(b => b.onclick = () => {
      const box = $('#dm-player-box');
      if (!box) { window.open('https://www.youtube.com/watch?v=' + b.dataset.play, '_blank', 'noopener'); return; }
      if (!ytConsent()) { box.scrollIntoView({ behavior: 'smooth', block: 'center' }); box.querySelector('[data-consent]')?.focus(); box.dataset.pending = b.dataset.play; return; }
      box.innerHTML = playerHTML(embedFor(b.dataset.play), b.dataset.title) + `<p class="dm-player-caption">${x(b.dataset.title)} · <a href="https://www.youtube.com/watch?v=${b.dataset.play}" target="_blank" rel="noopener noreferrer">auf YouTube öffnen ↗</a></p>`;
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  async function videoSection(cat, heading) {
    const box = document.createElement('section');
    box.className = 'dm-section dm-related-videos';
    box.innerHTML = `<div class="dm-section-head"><h2>${heading}</h2><a href="#videos/${cat}">Alle ansehen</a></div><div class="dm-vgrid" aria-busy="true"></div>`;
    const list = (await loadVideos()).filter(v => v.category === cat).slice(0, 3);
    if (!list.length) { box.remove(); return null; }
    $('.dm-vgrid', box).innerHTML = list.map(v => `<a class="dm-vcard dm-cat-${v.category}" href="#videos/${cat}/${v.id}"><span class="dm-vthumb">${ytConsent() ? `<img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy" width="320" height="180">` : '<span class="dm-vthumb-ph" aria-hidden="true">▶</span>'}</span><span class="dm-vmeta"><span class="dm-tag">${DM.videoCategories[v.category]}${isRussian(v.title) ? ' · auf Russisch' : ''}</span><strong>${x(v.title)}</strong></span></a>`).join('');
    $('.dm-vgrid', box).removeAttribute('aria-busy');
    return box;
  }

  /* ---------- Bausteine ---------- */
  const page = (html, cls = '') => { mainEl.innerHTML = `<div class="dm-page ${cls}">${html}</div>`; };
  const crumbs = items => `<nav class="dm-crumbs" aria-label="Du bist hier"><a href="#">Start</a>${items.map(([t, u], i) => u ? `<a href="${u}">${x(t)}</a>` : i === items.length - 1 ? `<span aria-current="page">${x(t)}</span>` : `<span>${x(t)}</span>`).join('')}</nav>`;
  const note = (text, sign = true) => `<aside class="dm-note"><p>${x(text)}</p>${sign ? '<span>– Dennis</span>' : ''}</aside>`;
  const pathDone = id => DM.paths[id].steps.filter(s => mem.done['weg:' + id + ':' + s[1]]).length;
  function lessonProgress(id) {
    let n = 0; for (let i = 0; i < 7; i++) if (mem.visited[`lektion/${id}/${i}`] || (i === 0 && mem.visited[`lektion/${id}`])) n++;
    return n;
  }
  const allScenes = L => [...((typeof practiceScenes !== 'undefined' && practiceScenes[L]) || []), ...(DM.extraScenes[L] || [])];

  /* ---------- Startseite ---------- */
  function home() {
    const last = mem.last && mem.last.route !== '' ? mem.last : null;
    page(`
    <section class="dm-hero">
      <figure class="dm-hero-photo"><img src="assets/dennis.webp" alt="Dennis, dein Deutschlehrer" width="626" height="1004" fetchpriority="high"></figure>
      <div class="dm-hero-copy">
        <h1>Deutsch lernen mit Dennis</h1>
        <p class="dm-lead">Kostenlose Übungen von A1 bis B2 Beruf – für deinen Alltag, deine Prüfung und deinen Job. Ohne Anmeldung.</p>
        <p class="dm-hand">Hallo! Ich bin Dennis, dein Deutschlehrer. Wähle unten deinen Weg – ich zeige dir die nächsten Schritte.</p>
        <div class="dm-row">
          ${last ? `<a class="dm-btn" href="#${x(last.route)}">Weitermachen: ${x(last.title)}</a><a class="dm-btn dm-btn-quiet" href="#wegweiser">Welcher Weg passt zu mir?</a>` : `<a class="dm-btn" href="#wegweiser">Welcher Weg passt zu mir?</a><a class="dm-btn dm-btn-quiet" href="#lernen/A1">Mit A1 beginnen</a>`}
        </div>
      </div>
    </section>

    <section class="dm-section" aria-labelledby="wege-h">
      <div class="dm-section-head"><h2 id="wege-h">Wähle deinen Weg</h2><p>Du kannst jederzeit wechseln.</p></div>
      <div class="dm-paths">${DM.pathOrder.map(id => pathCard(id)).join('')}</div>
    </section>

    <section class="dm-section dm-tools" aria-labelledby="tools-h">
      <div class="dm-section-head"><h2 id="tools-h">Direkt üben</h2></div>
      <div class="dm-toolgrid">
        <a href="#ueben/sprechen/A1"><b>Sprechen</b><span>Gespräche aus dem Alltag, mit Satzanfängen und Beispiel zum Anhören.</span></a>
        <a href="#ueben/schreiben/A2"><b>Schreiben</b><span>Nachrichten, Briefe und E-Mails – mit Checkliste und Mustertext.</span></a>
        <a href="#hoeren"><b>Hören</b><span>Ansagen, Mailbox und Gespräche verstehen.</span></a>
        <a href="#lernen"><b>Lektionen</b><span>17 Themen von A1 bis B2 mit Wortschatz, Grammatik und Übungen.</span></a>
        <a href="#orientierungskurs"><b>Leben in Deutschland</b><span>Lernspiele und Wissen für den Orientierungskurs.</span></a>
        <a href="#kahoot"><b>Kahoot-Quiz</b><span>Gemeinsam spielen und Redemittel festigen.</span></a>
      </div>
    </section>

    <section class="dm-section dm-home-video" id="dm-home-video" aria-labelledby="video-h">
      <div class="dm-section-head"><h2 id="video-h">Neu auf YouTube</h2><a href="#videos">Alle Videos</a></div>
      <div class="dm-vgrid dm-vgrid-feature" aria-busy="true"><p class="dm-hint">Videos werden geladen …</p></div>
    </section>

    <section class="dm-section dm-about-teaser">
      <img src="assets/dennis.webp" alt="" width="120" height="192" loading="lazy">
      <div><h2>Wer ist Dennis?</h2><p>Ich habe einen Master in Germanistik und habe mich selbst auf Sprachprüfungen und den Test „Leben in Deutschland“ vorbereitet. Deshalb weiß ich, wo es schwierig wird.</p><a class="dm-btn dm-btn-quiet" href="#ueber-mich">Mehr über mich</a></div>
    </section>

    <section class="dm-section dm-thanks">
      <div><h2>Hat dir das Lernen geholfen?</h2><p>Alle Übungen, Videos und Merkblätter sind kostenlos. Wenn du Danke sagen möchtest, kannst du meine Arbeit mit einem freiwilligen Beitrag unterstützen.</p></div>
      <a class="dm-btn dm-btn-sun" href="${T.donate}" target="_blank" rel="noopener noreferrer">♡ Danke sagen</a>
    </section>`, 'dm-home');
    loadVideos().then(list => {
      const box = $('#dm-home-video .dm-vgrid'); if (!box) return;
      box.removeAttribute('aria-busy');
      box.innerHTML = list.slice(0, 3).map((v, i) => `<a class="dm-vcard dm-cat-${v.category}${i === 0 ? ' dm-vcard-big' : ''}" href="#videos/alle/${v.id}"><span class="dm-vthumb">${ytConsent() ? `<img src="https://i.ytimg.com/vi/${v.id}/${i ? 'mqdefault' : 'hqdefault'}.jpg" alt="" loading="lazy">` : '<span class="dm-vthumb-ph" aria-hidden="true">▶</span>'}</span><span class="dm-vmeta"><span class="dm-tag">${i === 0 ? 'Neuestes Video · ' : ''}${DM.videoCategories[v.category]}</span><strong>${x(v.title)}</strong>${v.published ? `<small>${fmtDate(v.published)}</small>` : ''}</span></a>`).join('');
    });
  }
  function pathCard(id) {
    const p = DM.paths[id], g = DM.groups[p.group], done = pathDone(id);
    return `<a class="dm-path dm-g-${g.color}" href="#lernweg/${id}">
      <span class="dm-path-icon" aria-hidden="true">${p.icon}</span>
      <span class="dm-path-text"><span class="dm-path-meta">${g.label} · ${p.level}</span><b>${x(p.title)}</b><span>${x(p.who)}</span>
      ${done ? `<span class="dm-mini-progress"><i style="width:${Math.round(done / p.steps.length * 100)}%"></i></span><small>${done} von ${p.steps.length} Schritten erledigt</small>` : ''}</span>
    </a>`;
  }

  /* ---------- Lernwege ---------- */
  function paths() {
    page(`${crumbs([['Mein Lernweg']])}
      <div class="dm-head"><h1>Mein Lernweg</h1><p class="dm-lead">Jeder Weg ist eine Reihenfolge von Übungen. Hake ab, was du geschafft hast – dein Fortschritt bleibt auf deinem Gerät gespeichert.</p></div>
      <div class="dm-paths">${DM.pathOrder.map(pathCard).join('')}</div>
      <p class="dm-center"><a class="dm-btn dm-btn-quiet" href="#wegweiser">Ich weiß nicht, welcher Weg passt</a></p>`);
  }
  async function pathPage(id) {
    const p = DM.paths[id]; if (!p) return paths();
    const g = DM.groups[p.group];
    const render = () => {
      const done = pathDone(id), next = p.steps.find(s => !mem.done['weg:' + id + ':' + s[1]]);
      page(`${crumbs([['Mein Lernweg', '#lernweg'], [p.title]])}
      <div class="dm-head dm-path-head dm-g-${g.color}">
        <span class="dm-path-icon" aria-hidden="true">${p.icon}</span>
        <div><p class="dm-path-meta">${g.label} · ${p.level}</p><h1>${x(p.title)}</h1><p class="dm-lead">${x(p.intro)}</p></div>
      </div>
      <div class="dm-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${p.steps.length}" aria-valuenow="${done}" aria-label="Fortschritt"><i style="width:${Math.round(done / p.steps.length * 100)}%"></i></div>
      <p class="dm-progress-text">${done ? `${done} von ${p.steps.length} Schritten erledigt.` : 'Noch nichts erledigt – fang einfach mit Schritt 1 an.'} ${next ? `<a href="${next[1]}">Nächster Schritt: ${x(next[0])}</a>` : '<b>Super, alles geschafft!</b>'}</p>
      <div class="dm-split">
        <ol class="dm-steps">${p.steps.map(([title, url, desc, kind], i) => {
          const k = 'weg:' + id + ':' + url, isDone = !!mem.done[k];
          return `<li class="${isDone ? 'is-done' : ''}"><span class="dm-step-no" aria-hidden="true">${isDone ? '✓' : i + 1}</span>
            <a href="${url}" class="dm-step-link"><span class="dm-tag">${kind}</span><b>${x(title)}</b><span>${x(desc)}</span></a>
            <label class="dm-check"><input type="checkbox" data-done="${x(k)}" ${isDone ? 'checked' : ''}> <span>erledigt</span></label></li>`;
        }).join('')}</ol>
        <aside class="dm-aside">
          ${note(p.tip)}
          <section class="dm-card"><h2>Deine Lernrunde</h2><ul class="dm-plan">${p.plan.map(t => `<li>${x(t)}</li>`).join('')}</ul></section>
          <section class="dm-card"><h2>Anderer Weg?</h2><p>Du kannst jederzeit wechseln.</p><a href="#lernweg">Alle Wege ansehen</a> · <a href="#wegweiser">Wegweiser</a></section>
        </aside>
      </div>
      ${['bridge', 'repeat'].includes(id) ? '<p class="dm-small">B2 Beruf: Die Übungen orientieren sich am beruflichen Deutsch und am Deutsch-Test für den Beruf B2. Wenn du eine andere B2-Prüfung machst, prüfe das Format bei deinem Anbieter.</p>' : ''}
      <div id="dm-path-videos"></div>`);
      $$('[data-done]').forEach(c => c.onchange = () => { if (c.checked) mem.done[c.dataset.done] = Date.now(); else delete mem.done[c.dataset.done]; save(); render(); });
      const cat = { dtz: 'pruefung', repeat: 'pruefung', bridge: 'deutsch', start: 'deutsch', sprechen: 'deutsch', schreiben: 'pruefung' }[id];
      videoSection(cat, 'Passende Videos').then(sec => sec && $('#dm-path-videos')?.replaceWith(sec));
    };
    render();
  }

  /* ---------- Wegweiser ---------- */
  function wegweiser() {
    const w = DM.wegweiser;
    page(`${crumbs([['Welcher Weg passt?']])}
      <div class="dm-head"><h1>Welcher Weg passt zu mir?</h1><p class="dm-lead">Zwei kurze Fragen. Danach bekommst du einen Vorschlag. Das ist kein Test – nur eine Orientierung.</p></div>
      <form id="dm-ww" class="dm-card dm-form">
        <fieldset><legend>1. ${x(w.level.q)}</legend>${w.level.options.map(([v, t]) => `<label class="dm-option"><input type="radio" name="lvl" value="${v}" required><span><span class="dm-lvl">${v === 'A0' ? 'Start' : v}</span>${x(t)}</span></label>`).join('')}</fieldset>
        <fieldset><legend>2. ${x(w.goal.q)}</legend>${w.goal.options.map(([v, t]) => `<label class="dm-option"><input type="radio" name="goal" value="${v}" required><span>${x(t)}</span></label>`).join('')}</fieldset>
        <button class="dm-btn">Vorschlag zeigen</button>
        <div id="dm-ww-result" role="status" aria-live="polite"></div>
      </form>`);
    $('#dm-ww').onsubmit = e => {
      e.preventDefault();
      const f = new FormData(e.target), lvl = f.get('lvl'), goal = f.get('goal');
      if (!lvl || !goal) return;
      let pathId = goal, extra = '';
      if (lvl === 'A0' || lvl === 'A1') {
        pathId = 'start';
        extra = goal === 'start' ? '' : `Dein Ziel („${x(DM.paths[goal]?.title || '')}“) bleibt wichtig. Mit A1 legst du dafür das Fundament.`;
      } else if ((goal === 'bridge' || goal === 'repeat') && lvl === 'A2') {
        extra = 'Für B2 brauchst du zuerst B1. Übe parallel die B1-Lektionen.';
      }
      const lessonLevel = lvl === 'A0' ? 'A1' : lvl;
      const p = DM.paths[pathId];
      $('#dm-ww-result').innerHTML = `<div class="dm-result"><h2>Mein Vorschlag für dich</h2>
        <a class="dm-path dm-g-${DM.groups[p.group].color}" href="#lernweg/${pathId}"><span class="dm-path-icon" aria-hidden="true">${p.icon}</span><span class="dm-path-text"><span class="dm-path-meta">${p.level}</span><b>${x(p.title)}</b><span>${x(p.who)}</span></span></a>
        ${extra ? `<p>${extra}</p>` : ''}
        <p>Passende Lektionen: <a href="#lernen/${lessonLevel}">Niveau ${lessonLevel}</a>.</p></div>`;
      mem.suggested = pathId; save();
      $('#dm-ww-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  }

  /* ---------- Lektionen ---------- */
  function lessonsPage(sel) {
    if (!LEVELS.includes(sel)) sel = mem.level && LEVELS.includes(mem.level) ? mem.level : 'A1';
    mem.level = sel; save();
    const imgFor = l => typeof platformImage === 'function' ? platformImage(l) : 'alltag';
    page(`${crumbs([['Lektionen']])}
      <div class="dm-head"><h1>Lektionen</h1><p class="dm-lead">Jede Lektion hat sieben kurze Schritte: Einstieg, Wortschatz, Grammatik, Dialog, Übungen, Anwenden, Mitnehmen.</p></div>
      <div class="dm-filter">
        <nav class="dm-tabs" aria-label="Niveau">${LEVELS.map(k => `<a href="#lernen/${k}" ${k === sel ? 'aria-current="page"' : ''}><b>${k === 'B2' ? 'B2 Beruf' : k}</b><small>${LEVEL_NAMES[k]}</small></a>`).join('')}</nav>
        <label class="dm-search"><span class="dm-sr">Thema suchen</span><input type="search" id="dm-q" placeholder="Thema suchen, z. B. Arzt, Wohnung, Beschwerde …"></label>
      </div>
      <p id="dm-count" class="dm-small" role="status"></p>
      <div class="dm-lessons" id="dm-lessons"></div>
      <p class="dm-small">Die Lektionen vertiefen ausgewählte Themen. Sie ersetzen keinen vollständigen Sprachkurs.</p>`);
    const draw = () => {
      const q = $('#dm-q').value.trim().toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss');
      const hay = l => { const u = typeof platformUnits !== 'undefined' ? platformUnits[l.id] : null; return `${l.title} ${l.goal} ${l.rule} ${l.text} ${l.task} ${(l.words || []).join(' ')} ${u ? JSON.stringify(u) : ''} ${typeof vwords === 'function' && typeof lessonWords !== 'undefined' && lessonWords[l.id] ? vwords(l).map(w => w.word + ' ' + (w.example || '')).join(' ') : ''}`.toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss'); };
      const list = lessons.filter(l => q ? hay(l).includes(q) : l.level === sel);
      $('#dm-count').textContent = q ? `${list.length} Lektionen zu „${$('#dm-q').value}“ (alle Niveaus)` : `${list.length} Lektionen auf ${sel === 'B2' ? 'B2 Beruf' : sel}`;
      $('#dm-lessons').innerHTML = list.map(l => {
        const n = lessonProgress(l.id), i = lessons.filter(o => o.level === l.level).indexOf(l) + 1, done = (typeof platformDone !== 'undefined' && platformDone.has(l.id)) || mem.done['lektion:' + l.id];
        return `<a class="dm-lesson" href="#lektion/${l.id}">
          <span class="dm-lesson-img"><img src="assets/${imgFor(l)}.png" alt="" loading="lazy" onerror="this.parentNode.classList.add('is-empty');this.remove()"></span>
          <span class="dm-lesson-text"><span class="dm-path-meta">${l.level} · Lektion ${i}${done ? ' · ✓ bearbeitet' : n ? ` · ${n} von 7 Schritten` : ''}</span><b>${x(l.title)}</b><span>${x(l.goal)}</span></span></a>`;
      }).join('') || '<p class="dm-empty">Kein Thema gefunden. Versuche ein anderes Wort, zum Beispiel „Termin“ oder „Arbeit“.</p>';
    };
    $('#dm-q').oninput = draw; draw();
  }

  /* ---------- Üben: Übersicht ---------- */
  function practiceHub() {
    page(`${crumbs([['Üben']])}
      <div class="dm-head"><h1>Üben</h1><p class="dm-lead">Sprechen, schreiben und hören – ohne Prüfungsdruck. Wähle dein Niveau.</p></div>
      <div class="dm-hub">
        <section class="dm-card dm-hub-card"><h2>💬 Sprechen</h2><p>Kurze Situationen aus dem Alltag und Beruf. Mit Satzanfängen, Rückfrage und Beispiel zum Anhören.</p>${levelLinks('ueben/sprechen')}</section>
        <section class="dm-card dm-hub-card"><h2>✍️ Schreiben</h2><p>Plane deinen Text, schreib ihn und vergleiche mit einem Muster. Dein Entwurf bleibt auf deinem Gerät gespeichert.</p>${levelLinks('ueben/schreiben')}<a class="dm-inline-link" href="#schreiben/bausteine">Schreib-Bausteine: Anrede, Gruß, Verbindungswörter</a></section>
        <section class="dm-card dm-hub-card"><h2>🎧 Hören</h2><p>Ansagen, Nachrichten und Gespräche. Die Stimme deines Geräts liest die Texte vor.</p><div class="dm-pills"><a href="#hoeren/alltag"><b>Alltag</b><small>A2–B1 · DTZ</small></a><a href="#hoeren/beruf"><b>Beruf</b><small>B1–B2</small></a></div></section>
        <section class="dm-card dm-hub-card"><h2>🎲 Gemeinsam spielen</h2><p>Kahoot-Quiz für den Kurs oder zu Hause. Wörter und Redemittel festigen.</p><a class="dm-btn dm-btn-quiet" href="#kahoot">Zu den Kahoot-Quiz</a></section>
      </div>`);
  }
  const levelLinks = base => `<div class="dm-pills">${LEVELS.map(k => `<a href="#${base}/${k}"><b>${k}</b><small>${{ A1: 'Erste Sätze', A2: 'Alltag', B1: 'Begründen', B2: 'Beruf' }[k]}</small></a>`).join('')}</div>`;

  /* ---------- Sprechen & Schreiben ---------- */
  function practice(mode, sel, raw) {
    if (!['sprechen', 'schreiben'].includes(mode)) mode = 'sprechen';
    if (!LEVELS.includes(sel)) sel = 'A1';
    const scenes = allScenes(sel);
    if (!scenes.length) return practiceHub();
    const n = Math.max(0, Math.min(scenes.length - 1, Number(raw) || 0)), s = scenes[n], writing = mode === 'schreiben';
    const key = `${mode}/${sel}/${n}`;
    const goals = { A1: '2–3 kurze Sätze.', A2: 'Eine kurze Nachricht mit 4–6 Sätzen.', B1: 'Ein zusammenhängender Text mit etwa 6–9 Sätzen.', B2: 'Ein klar gegliederter Text: Anliegen, Begründung, Lösung, Abschluss.' };
    const checks = writing ? s.checks : (sel === 'A1' ? ['Ich sage einen passenden Satz.', 'Ich antworte auf eine Frage.'] : ['Ich gehe auf die Situation ein.', 'Ich spreche möglichst frei.', 'Ich reagiere auf mein Gegenüber.', 'Ich stelle selbst eine Frage.']);
    page(`${crumbs([['Üben', '#ueben'], [writing ? 'Schreiben' : 'Sprechen'], [`${sel}: ${s.title}`]])}
      <div class="dm-head dm-head-row"><div><h1>${writing ? 'Schreiben' : 'Sprechen'} · ${sel}</h1><p class="dm-lead">${writing ? 'Planen, schreiben, vergleichen, verbessern.' : 'Erst mit Hilfen, dann frei. Allein oder zu zweit.'}</p></div>
        <div class="dm-switch" role="group" aria-label="Übungsart"><a href="#ueben/sprechen/${sel}/${n}" ${!writing ? 'aria-current="page"' : ''}>💬 Sprechen</a><a href="#ueben/schreiben/${sel}/${n}" ${writing ? 'aria-current="page"' : ''}>✍️ Schreiben</a></div></div>
      <nav class="dm-tabs dm-tabs-small" aria-label="Niveau">${LEVELS.map(k => `<a href="#ueben/${mode}/${k}" ${k === sel ? 'aria-current="page"' : ''}><b>${k}</b></a>`).join('')}</nav>
      <nav class="dm-scenes" aria-label="Situation wählen">${scenes.map((sc, i) => `<a href="#ueben/${mode}/${sel}/${i}" ${i === n ? 'aria-current="page"' : ''}>${x(sc.title)}</a>`).join('')}</nav>
      <div class="dm-practice">
        <section class="dm-card">
          <p class="dm-path-meta">Situation ${n + 1} von ${scenes.length}</p>
          <h2>${x(s.title)}</h2>
          <figure class="dm-scene-img"><img src="assets/${x(s.image)}.png" alt="" loading="lazy" onerror="this.parentNode.remove()"></figure>
          <p class="dm-task">${x(s.task)}</p>
          <h3>${writing ? '1. Plane deinen Text' : '1. Sprich laut'}</h3>
          <ul class="dm-list">${s.prompts.map(t => `<li>${x(t)}</li>`).join('')}</ul>
          <details ${sel === 'A1' ? 'open' : ''}><summary>Satzanfänge helfen</summary><ul class="dm-starters">${s.starters.map(t => `<li>${x(t)}</li>`).join('')}</ul></details>
          ${writing ? '' : `<h3>2. Antworte auf eine Rückfrage</h3><details><summary>Die andere Person sagt …</summary><p class="dm-model">${x(s.reply)}</p>${speakBtn(s.reply, 'Rückfrage anhören')}<p>${sel === 'A1' ? 'Antworte mit einem Satz.' : 'Reagiere darauf. Stelle danach selbst eine Frage.'}</p></details><p class="dm-small">${sel === 'A1' ? 'Übt zu zweit. Tauscht die Rollen.' : 'Allein: Sprich beide Rollen. Zu zweit: Tauscht die Rollen und verändert ein Detail.'}</p>`}
        </section>
        <section class="dm-card">
          <h2>${writing ? '2. Schreib deinen Entwurf' : 'Deine Stichwörter'}</h2>
          <p>${writing ? goals[sel] : 'Notiere Wörter. Sprich danach möglichst frei.'}</p>
          <label class="dm-sr" for="dm-draft">${writing ? 'Mein Text' : 'Meine Notizen'}</label>
          <textarea id="dm-draft" rows="${sel === 'A1' ? 5 : 10}" placeholder="${writing ? 'Schreib hier deinen Text …' : 'Stichwörter …'}">${x(mem.drafts[key] || '')}</textarea>
          <p class="dm-small" id="dm-words" aria-live="polite"></p>
          <div class="dm-row"><button type="button" class="dm-btn dm-btn-quiet" id="dm-dl">Text herunterladen</button>${writing ? speakBtn('', 'Meinen Text vorlesen', 'id="dm-read-own"') : ''}<button type="button" class="dm-btn dm-btn-quiet" id="dm-clear">Leeren</button></div>
          <h3>${writing ? '3. Vergleiche und verbessere' : '3. Hör dir ein Beispiel an'}</h3>
          <details><summary>Eine mögliche Lösung</summary><p class="dm-model">${x(s.model)}</p>${speakBtn(s.model.replace(/\n/g, ' '), 'Beispiel anhören')}<p class="dm-small">Andere passende Sätze sind auch richtig.</p></details>
          <fieldset class="dm-checks"><legend>${writing ? 'Prüfe deinen Text' : 'Prüfe deine Antwort'}</legend>${checks.map(t => `<label class="dm-check"><input type="checkbox"> <span>${x(t)}</span></label>`).join('')}</fieldset>
          <p>${writing ? 'Verbessere mindestens eine Stelle. Lies den Text danach laut.' : 'Zweite Runde: Schließ das Beispiel. Sprich noch einmal und ändere eine Information.'}</p>
          <p class="dm-small">Dein Text bleibt nur auf diesem Gerät gespeichert. Er wird nicht automatisch bewertet.</p>
        </section>
      </div>
      <div class="dm-row dm-next">
        <a class="dm-btn" href="#ueben/${mode}/${sel}/${(n + 1) % scenes.length}">Nächste Situation</a>
        <a class="dm-btn dm-btn-quiet" href="#ueben/${writing ? 'sprechen' : 'schreiben'}/${sel}/${n}">${writing ? 'Diese Situation sprechen' : 'Diese Situation schreiben'}</a>
        ${s.lesson ? `<a href="#lektion/${s.lesson}">Passende Lektion</a>` : ''}${writing ? ' · <a href="#schreiben/bausteine">Schreib-Bausteine</a>' : ''}
      </div>`);
    const box = $('#dm-draft'), words = $('#dm-words');
    const count = () => { const n = (box.value.match(/[\p{L}\p{N}]+/gu) || []).length; words.textContent = n ? `${n} Wörter · automatisch gespeichert` : ''; const r = $('#dm-read-own'); if (r) r.dataset.speak = box.value; };
    let t; box.oninput = () => { clearTimeout(t); t = setTimeout(() => { if (box.value.trim()) mem.drafts[key] = box.value; else delete mem.drafts[key]; save(); count(); }, 300); };
    count();
    $('#dm-dl').onclick = () => { const blob = new Blob([`${s.title}\n\n${box.value}`], { type: 'text/plain;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mein-deutsch-text.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };
    $('#dm-clear').onclick = () => { if (!box.value || confirm('Text wirklich löschen?')) { box.value = ''; delete mem.drafts[key]; save(); count(); box.focus(); } };
    bindSpeakButtons();
  }

  /* ---------- Schreib-Bausteine ---------- */
  function toolkit() {
    page(`${crumbs([['Üben', '#ueben'], ['Schreib-Bausteine']])}
      <div class="dm-head"><h1>Schreib-Bausteine</h1><p class="dm-lead">Feste Formulierungen für Nachrichten, Briefe und E-Mails. Lerne sie als ganze Sätze.</p></div>
      <div class="dm-toolkit">${DM.toolkit.map(b => `<section class="dm-card"><p class="dm-path-meta">${b.level}</p><h2>${x(b.title)}</h2>${b.groups.map(([h, items]) => `<h3>${x(h)}</h3><ul class="dm-phrases">${items.map(i => `<li>${x(i)}</li>`).join('')}</ul>`).join('')}<p class="dm-tipline">${x(b.note)}</p></section>`).join('')}</div>
      <div class="dm-row dm-next"><a class="dm-btn" href="#ueben/schreiben/A2">Jetzt schreiben üben</a><a class="dm-btn dm-btn-quiet" href="#training/dtz-schreiben">DTZ-Brief üben</a><a class="dm-btn dm-btn-quiet" href="#training/dtb-schreiben">B2-Kundenantwort üben</a></div>`);
  }

  /* ---------- Hören ---------- */
  function listeningHub() {
    page(`${crumbs([['Üben', '#ueben'], ['Hören']])}
      <div class="dm-head"><h1>Hören</h1><p class="dm-lead">Kurze Hörtexte mit Fragen. Die Texte liest die Stimme deines Geräts vor – sie klingt etwas künstlich, aber du übst genau hinzuhören.</p></div>
      <div class="dm-paths">${Object.entries(DM.listening).map(([id, set]) => `<a class="dm-path dm-g-${id === 'beruf' ? 'ink' : 'sun'}" href="#hoeren/${id}"><span class="dm-path-icon" aria-hidden="true">🎧</span><span class="dm-path-text"><span class="dm-path-meta">${set.level} · ${set.exam}</span><b>${set.title}</b><span>${set.items.length} Hörtexte: ${[...new Set(set.items.map(i => i.type))].slice(0, 3).join(', ')} …</span></span></a>`).join('')}</div>
      ${synth ? '' : '<p class="dm-warn">Dein Browser kann keine Texte vorlesen. Öffne die Seite bitte in einem aktuellen Chrome, Edge, Safari oder Firefox.</p>'}`);
  }
  function listening(setId, raw) {
    const set = DM.listening[setId]; if (!set) return listeningHub();
    const n = Math.max(0, Math.min(set.items.length - 1, Number(raw) || 0)), item = set.items[n];
    const plays = { count: 0 };
    page(`${crumbs([['Üben', '#ueben'], ['Hören', '#hoeren'], [set.title]])}
      <div class="dm-head"><h1>${set.title}</h1><p class="dm-lead">${x(set.intro)}</p></div>
      <nav class="dm-scenes" aria-label="Hörtext wählen">${set.items.map((it, i) => `<a href="#hoeren/${setId}/${i}" ${i === n ? 'aria-current="page"' : ''}>${i + 1}. ${x(it.type)}</a>`).join('')}</nav>
      <div class="dm-practice">
        <section class="dm-card dm-listen">
          <p class="dm-path-meta">Hörtext ${n + 1} von ${set.items.length}</p>
          <h2>${x(item.type)}</h2>
          ${synth ? `<div class="dm-player-audio">
            <button type="button" class="dm-play" id="dm-play" aria-describedby="dm-plays"><span aria-hidden="true">▶</span> Abspielen</button>
            <label class="dm-rate">Tempo <select id="dm-rate"><option value="0.92">normal</option><option value="0.75">langsamer</option></select></label>
          </div><p class="dm-small" id="dm-plays">Du kannst den Text zweimal hören.</p>` : '<p class="dm-warn">Dein Browser kann keine Texte vorlesen. Du kannst den Text unten lesen.</p>'}
          <details id="dm-transcript" ${synth ? '' : 'open'}><summary>Text zum Mitlesen</summary><p class="dm-model">${x(item.text)}</p></details>
          <p class="dm-small">Computerstimme deines Geräts. Je nach Gerät klingt sie unterschiedlich.</p>
        </section>
        <section class="dm-card">
          <h2>Fragen</h2>
          <form id="dm-lq">${item.questions.map((q, i) => `<fieldset><legend>${i + 1}. ${x(q.q)}</legend>${q.options.map((o, j) => `<label class="dm-option"><input type="radio" name="q${i}" value="${j}"><span>${x(o)}</span></label>`).join('')}<p class="dm-feedback" id="dm-f${i}"></p></fieldset>`).join('')}
            <div class="dm-row"><button class="dm-btn">Antworten prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="dm-lq-reset">Neu versuchen</button></div>
            <p id="dm-lq-score" role="status" aria-live="polite"></p></form>
        </section>
      </div>
      <div class="dm-row dm-next">${n < set.items.length - 1 ? `<a class="dm-btn" href="#hoeren/${setId}/${n + 1}">Nächster Hörtext</a>` : `<a class="dm-btn" href="#hoeren">Fertig – zur Übersicht</a>`}${n ? `<a class="dm-btn dm-btn-quiet" href="#hoeren/${setId}/${n - 1}">Vorheriger Hörtext</a>` : ''}</div>`);
    const btn = $('#dm-play');
    if (btn) btn.onclick = () => {
      if (btn.classList.contains('is-playing')) { stopSpeaking(); btn.classList.remove('is-playing'); btn.innerHTML = '<span aria-hidden="true">▶</span> Abspielen'; return; }
      plays.count++;
      btn.classList.add('is-playing'); btn.innerHTML = '<span aria-hidden="true">■</span> Stopp';
      const isDialogue = /\s–\s/.test(item.text);
      speak(item.text, { rate: Number($('#dm-rate').value), dialogue: isDialogue, onend: () => {
        btn.classList.remove('is-playing');
        btn.innerHTML = plays.count >= 2 ? '<span aria-hidden="true">↺</span> Noch einmal hören' : '<span aria-hidden="true">▶</span> Zum zweiten Mal hören';
        $('#dm-plays').textContent = plays.count >= 2 ? 'Du hast den Text zweimal gehört. Beantworte jetzt die Fragen.' : 'Lies die Fragen noch einmal. Dann hör den Text ein zweites Mal.';
      } });
    };
    $('#dm-lq').onsubmit = e => {
      e.preventDefault(); const f = new FormData(e.target); let ok = 0, filled = 0;
      item.questions.forEach((q, i) => { const v = f.get('q' + i), el = $('#dm-f' + i), good = v !== null && Number(v) === q.answer; if (v !== null) filled++; if (good) ok++; el.className = 'dm-feedback ' + (v === null ? '' : good ? 'good' : 'bad'); el.textContent = v === null ? 'Wähle bitte eine Antwort.' : `${good ? 'Richtig.' : 'Noch nicht richtig.'} ${q.why}`; });
      $('#dm-lq-score').textContent = filled === item.questions.length ? `${ok} von ${item.questions.length} richtig.${ok < item.questions.length ? ' Lies den Text mit und hör noch einmal.' : ''}` : 'Bitte beantworte alle Fragen.';
      if (filled === item.questions.length) { mem.done[`hoeren:${setId}:${n}`] = ok; save(); }
    };
    $('#dm-lq-reset').onclick = () => { $('#dm-lq').reset(); $$('.dm-feedback').forEach(el => { el.textContent = ''; el.className = 'dm-feedback'; }); $('#dm-lq-score').textContent = ''; };
  }

  /* ---------- Prüfung ---------- */
  function exam() {
    const card = (url, part, title, desc) => `<a class="dm-exam" href="${url}"><span class="dm-tag">${part}</span><b>${title}</b><span>${desc}</span></a>`;
    page(`${crumbs([['Prüfungstraining']])}
      <div class="dm-head"><h1>Prüfungstraining</h1><p class="dm-lead">Eigene Übungsaufgaben im Stil der Prüfungen – mit Mustertexten und Checklisten. Keine offiziellen Prüfungsaufgaben.</p></div>
      <section class="dm-exam-block dm-g-sun" aria-labelledby="dtz-h">
        <div class="dm-exam-head"><h2 id="dtz-h">DTZ – Deutsch-Test für Zuwanderer</h2><p>A2–B1 · am Ende des Integrationskurses</p><a href="#lernweg/dtz">Lernweg DTZ öffnen</a></div>
        <div class="dm-examgrid">
          ${card('#training/dtz-vorstellen', 'Sprechen 1', 'Sich vorstellen', 'Steckbrief und Nachfragen')}
          ${card('#training/dtz-bild', 'Sprechen 2', 'Bild beschreiben', 'Beschreiben und erzählen')}
          ${card('#training/dtz-sprechen', 'Sprechen 3', 'Gemeinsam planen', 'Vorschlagen und einigen')}
          ${card('#training/dtz-schreiben', 'Schreiben', 'Einen Brief schreiben', 'Vier Leitpunkte, mit Muster')}
          ${card('#training/dtz-lesen', 'Lesen', 'Mitteilungen verstehen', 'Informationen finden')}
          ${card('#hoeren/alltag', 'Hören', 'Ansagen und Nachrichten', '8 Hörtexte mit Fragen')}
        </div>
      </section>
      <section class="dm-exam-block dm-g-ink" aria-labelledby="dtb-h">
        <div class="dm-exam-head"><h2 id="dtb-h">B2 Beruf – Deutsch-Test für den Beruf</h2><p>Berufssprachkurs B2 · Vorbereitung und Wiederholung</p><a href="#lernweg/repeat">Lernweg B2 wiederholen</a></div>
        <div class="dm-examgrid">
          ${card('#training/dtb-thema', 'Sprechen 1', 'Über ein Thema sprechen', 'Strukturieren und Beispiele geben')}
          ${card('#training/dtb-kollegen', 'Sprechen 2', 'Mit Kollegen sprechen', 'Eingehen und nachfragen')}
          ${card('#training/dtb-sprechen', 'Sprechen 3', 'Lösungen diskutieren', 'Abwägen und vereinbaren')}
          ${card('#training/dtb-schreiben', 'Schreiben', 'Kundenantwort', 'Mit internen Informationen')}
          ${card('#training/dtb-lesen', 'Lesen', 'Betriebliche Regelung', 'Fristen und Einschränkungen')}
          ${card('#hoeren/beruf', 'Hören', 'Hören im Beruf', '5 Hörtexte mit Fragen')}
        </div>
      </section>
      <section class="dm-exam-block dm-g-mint" aria-labelledby="lid-h">
        <div class="dm-exam-head"><h2 id="lid-h">Leben in Deutschland</h2><p>Orientierungskurs · Test „Leben in Deutschland“</p></div>
        <div class="dm-examgrid">
          ${card('#orientierungskurs', 'Lernspiele', 'Deutschland verstehen', 'Demokratie, Geschichte, Zusammenleben')}
          ${card('#videos/orientierung', 'Videos', 'LiD einfach erklärt', 'Wahlen, Grundrechte, Bundestag')}
        </div>
      </section>
      <section class="dm-card dm-official"><h2>Offizielle Informationen und Modelltests</h2><p>Prüfungsaufbau, Bewertung und offizielle Übungssätze findest du bei den Prüfungsanbietern. Die Links haben wir für dich gesammelt.</p><a class="dm-btn dm-btn-quiet" href="#quellen">Prüfungsinfos und Quellen</a></section>
      <div id="dm-exam-videos"></div>`);
    videoSection('pruefung', 'Videos zur Prüfung').then(sec => sec && $('#dm-exam-videos')?.replaceWith(sec));
  }

  /* ---------- Videos ---------- */
  async function videos(cat = 'alle', id) {
    if (!DM.videoCategories[cat]) cat = 'alle';
    const render = async () => {
      const list = await loadVideos();
      const shown = cat === 'alle' ? list : list.filter(v => v.category === cat);
      const current = id && list.find(v => v.id === id);
      page(`${crumbs([['Videos']])}
        <div class="dm-head dm-head-row"><div><h1>Videos</h1><p class="dm-lead">Erklärvideos von Dennis auf YouTube. Neue Videos erscheinen hier automatisch.</p></div>
          <a class="dm-btn dm-btn-quiet" href="${T.youtube}?sub_confirmation=1" target="_blank" rel="noopener noreferrer">Kanal abonnieren ↗</a></div>
        <section class="dm-video-stage">
          <div id="dm-player-box">${current ? playerHTML(embedFor(current.id), current.title) + `<p class="dm-player-caption">${x(current.title)}</p>` : playerHTML(embedFor(null), 'Neueste Videos von Deutsch mit Dennis') + (ytConsent() ? '<p class="dm-player-caption">Die neuesten Videos des Kanals – über das Listensymbol oben rechts im Player wählst du weitere aus.</p>' : '')}</div>
        </section>
        <nav class="dm-tabs dm-tabs-small" aria-label="Videothema">${Object.entries(DM.videoCategories).map(([k, t]) => `<a href="#videos/${k}" ${k === cat ? 'aria-current="page"' : ''}><b>${t}</b><small>${k === 'alle' ? list.length : list.filter(v => v.category === k).length}</small></a>`).join('')}</nav>
        <div class="dm-vgrid">${shown.map(v => videoCard(v)).join('') || '<p class="dm-empty">Zu diesem Thema gibt es noch keine Videos.</p>'}</div>
        <p class="dm-small">Einige ältere Videos erklären Deutsch auf Russisch. Das ist am Titel markiert.</p>`);
      bindVideoArea(mainEl, () => { const pending = $('#dm-player-box')?.dataset.pending; videos(cat, pending || id); });
    };
    render();
  }

  /* ---------- Über mich, Impressum, Datenschutz ---------- */
  function about() {
    page(`${crumbs([['Über mich']])}
      <section class="dm-about">
        <figure class="dm-about-photo"><img src="assets/dennis.webp" alt="Dennis, Deutschlehrer" width="626" height="1004"></figure>
        <div class="dm-about-text">
          <h1>Hallo, ich bin Dennis.</h1>
          <p class="dm-lead">Ich unterrichte Deutsch – vom ersten Satz bis zum Berufssprachkurs B2.</p>
          <p>Ich habe einen Master in Germanistik. Auf Sprachprüfungen und den Test „Leben in Deutschland“ habe ich mich selbst vorbereitet. Deshalb weiß ich genau, wo die größten Stolpersteine liegen – und wie man sie überwindet.</p>
          <p>Auf dieser Seite findest du alles, was ich für meine Kurse entwickle: Lektionen, Übungen zum Sprechen und Schreiben, Prüfungstraining und meine Erklärvideos. Alles kostenlos und ohne Anmeldung.</p>
          <h2>So arbeite ich</h2>
          <ul class="dm-list">
            <li>Grammatik erkläre ich auf Deutsch – einfach und mit vielen Beispielen.</li>
            <li>Wir üben echte Situationen: beim Arzt, mit dem Vermieter, im Job.</li>
            <li>Sprechen kommt zuerst. Fehler gehören zum Lernen.</li>
          </ul>
          ${note('Du hast eine Frage oder einen Wunsch für ein neues Thema? Schreib mir!', true)}
          <div class="dm-row"><a class="dm-btn" href="mailto:${T.email}">E-Mail schreiben</a><a class="dm-btn dm-btn-quiet" href="${T.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a><a class="dm-btn dm-btn-quiet" href="${T.youtube}" target="_blank" rel="noopener noreferrer">YouTube-Kanal ↗</a></div>
          <p class="dm-small">Oder nutze die Seite <a href="#pinnwand">Feedback und Wünsche</a>.</p>
        </div>
      </section>
      <section class="dm-section dm-thanks"><div><h2>Danke sagen</h2><p>Die Lernangebote bleiben kostenlos. Wenn du meine Arbeit unterstützen möchtest, freue ich mich über einen freiwilligen Beitrag.</p></div><a class="dm-btn dm-btn-sun" href="${T.donate}" target="_blank" rel="noopener noreferrer">♡ Danke sagen</a></section>`);
  }
  function impressum() {
    page(`${crumbs([['Impressum']])}
      <article class="dm-legal"><h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>${T.address.map(x).join('<br>')}</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:${T.email}">${T.email}</a></p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>${T.address.map(x).join('<br>')}</p>
      <h2>Hinweis</h2>
      <p>„Deutsch mit Dennis“ ist ein unabhängiges, kostenloses Lernangebot. Es ist kein Angebot der g.a.s.t., der telc gGmbH oder des Bundesamts für Migration und Flüchtlinge (BAMF). Die Übungen sind eigene Materialien und keine offiziellen Prüfungsaufgaben.</p>
      <h2>Haftung für Links</h2>
      <p>Diese Website enthält Links zu externen Websites (zum Beispiel YouTube, Kahoot, Prüfungsanbieter). Für deren Inhalte sind ausschließlich die jeweiligen Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entferne ich solche Links umgehend.</p>
      <h2>Urheberrecht</h2>
      <p>Texte, Übungen, Bilder und Videos auf dieser Website sind urheberrechtlich geschützt. Die Nutzung für das eigene Lernen und im Unterricht ist ausdrücklich erwünscht. Eine Veröffentlichung oder kommerzielle Nutzung ist nur mit Zustimmung erlaubt.</p>
      </article>`);
  }
  function datenschutz() {
    page(`${crumbs([['Datenschutz']])}
      <article class="dm-legal"><h1>Datenschutzerklärung</h1>
      <p class="dm-lead">Kurz gesagt: Du brauchst kein Konto. Ich lege keine Profile über dich an. Dein Lernstand bleibt auf deinem Gerät.</p>
      <h2>1. Verantwortlicher</h2>
      <p>${T.address.map(x).join('<br>')}<br>E-Mail: <a href="mailto:${T.email}">${T.email}</a></p>
      <h2>2. Hosting und Server-Protokolle</h2>
      <p>Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige Daten (zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp), um die Seite auszuliefern und die Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
      <p>Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Dabei können Daten auch in den USA verarbeitet werden. Mehr: <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von GitHub</a>.</p>
      <h2>3. Lernstand auf deinem Gerät</h2>
      <p>Dein Lernfortschritt, abgehakte Schritte und deine Übungstexte werden im Speicher deines Browsers (localStorage) gespeichert. Diese Daten werden nicht an mich oder Dritte übertragen. Du kannst sie jederzeit löschen.</p>
      <p><button type="button" class="dm-btn dm-btn-quiet" id="dm-wipe">Meinen gespeicherten Lernstand löschen</button> <span id="dm-wipe-status" role="status"></span></p>
      <h2>4. YouTube-Videos</h2>
      <p>Videos werden erst geladen, wenn du auf „Videos hier anzeigen“ klickst. Erst dann werden Daten (zum Beispiel deine IP-Adresse) an YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) übertragen. Ich nutze den erweiterten Datenschutzmodus (youtube-nocookie.com). Deine Zustimmung wird auf deinem Gerät gespeichert; du kannst sie oben mit „Lernstand löschen“ zurücknehmen. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Mehr: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p>
      <h2>5. Kontakt per E-Mail oder WhatsApp</h2>
      <p>Wenn du mir schreibst, verarbeite ich deine Nachricht und deine Kontaktdaten nur, um dir zu antworten. Für WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp (Meta).</p>
      <h2>6. Vorlesefunktion</h2>
      <p>Die Vorlesefunktion nutzt die Sprachausgabe deines Browsers. Je nach Browser und gewählter Stimme kann der Text dafür an den Anbieter des Browsers (zum Beispiel Google, Microsoft oder Apple) übertragen werden.</p>
      <h2>7. Schriften</h2>
      <p>Die Schriften dieser Website liegen auf dem eigenen Server. Es werden keine Schriften von Google oder anderen Anbietern geladen.</p>
      <h2>8. Externe Links</h2>
      <p>Links zu Kahoot, DonationAlerts, WhatsApp, YouTube oder Prüfungsanbietern führen zu anderen Websites. Dort gelten deren Datenschutzbestimmungen.</p>
      <h2>9. Deine Rechte</h2>
      <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine Einwilligung kannst du jederzeit widerrufen. Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.</p>
      <p class="dm-small">Stand: Oktober 2026</p>
      </article>`);
    $('#dm-wipe').onclick = () => { try { localStorage.removeItem(KEY); } catch {} mem = { visited: {}, done: {}, drafts: {} }; DM.store = mem; $('#dm-wipe-status').textContent = 'Erledigt. Dein Lernstand wurde gelöscht.'; };
  }

  /* ---------- Hilfe-Texte an die neue Navigation anpassen (Deutsch, Englisch) ---------- */
  try {
    const de = siteHelpText.de.answers, en = siteHelpText.en.answers;
    siteHelpText.de.titles[1] = 'Navigation'; siteHelpText.de.titles[5] = 'Audio & Vorlesen'; siteHelpText.en.titles[1] = 'Navigation'; siteHelpText.en.titles[5] = 'Audio & read aloud';
    de[0] = 'Du lernst ohne Anmeldung. Unter „Mein Lernweg“ findest du Wege für Anfänger, für mehr Sprechen, für besseres Schreiben, für den DTZ und für B2 Beruf. Der „Wegweiser“ hilft dir beim Auswählen.';
    de[1] = 'Oben findest du das Menü: Start, Mein Lernweg, Lektionen, Üben, Prüfungstraining, Videos und Über mich. Auf dem Handy öffnest du es mit „Menü“. Jede Lektion hat sieben Lernschritte mit „Weiter“ und „Zurück“.';
    de[5] = 'Starte ein Hörbeispiel mit der Wiedergabetaste. Unter „Üben“ und „Hören“ liest die Stimme deines Geräts Texte vor. Wenn nichts zu hören ist, prüfe die Lautstärke deines Geräts.';
    de[8] = 'Unter „Videos“ siehst du alle Videos von Dennis. Neue Videos erscheinen automatisch. Wenn der Player nicht funktioniert, öffne das Video direkt auf YouTube.';
    en[0] = 'No account is needed. “Mein Lernweg” offers paths for beginners, for speaking more, for better writing, for the DTZ and for B2 at work. The “Wegweiser” helps you choose.';
    en[1] = 'Use the menu at the top: Start, Mein Lernweg, Lektionen, Üben, Prüfungstraining, Videos and Über mich. On phones, open it with “Menü”. Each lesson has seven steps with “Weiter” and “Zurück”.';
    en[5] = 'Press play to start an audio example. In “Üben” → “Hören” your device voice reads texts aloud. If you hear nothing, check your device volume.';
    en[8] = 'All of Dennis’ videos are under “Videos”. New videos appear automatically. If the player does not work, open the video directly on YouTube.';
  } catch { /* Hilfe nicht geladen */ }

  /* ---------- Feedback & Wünsche (ersetzt die Pinnwand) ---------- */
  function feedback() {
    page(`${crumbs([['Feedback und Wünsche']])}
      <div class="dm-head"><h1>Feedback und Wünsche</h1><p class="dm-lead">Was gefällt dir? Was fehlt dir? Welches Thema soll Dennis als Nächstes erklären?</p></div>
      <div class="dm-hub">
        <section class="dm-card dm-hub-card"><h2>✉️ E-Mail</h2><p>Schreib Dennis eine kurze Nachricht. Gern auch mit einem Thema für ein neues Video.</p><p><b>${T.email}</b></p><a class="dm-btn" href="mailto:${T.email}?subject=${encodeURIComponent('Feedback zur Website')}">E-Mail schreiben</a></section>
        <section class="dm-card dm-hub-card"><h2>💬 WhatsApp</h2><p>Lieber per Handy? Dann schreib über WhatsApp.</p><a class="dm-btn dm-btn-quiet" href="${T.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp öffnen</a></section>
        <section class="dm-card dm-hub-card"><h2>▶ YouTube</h2><p>Unter jedem Video kannst du einen Kommentar schreiben und dir ein Thema wünschen.</p><a class="dm-btn dm-btn-quiet" href="${T.youtube}" target="_blank" rel="noopener noreferrer">Zum Kanal ↗</a></section>
      </div>
      ${note('Danke für jede Rückmeldung! So wird die Seite für alle besser.')}`);
  }

  /* ---------- Nach dem Laden einer bisherigen Seite ---------- */
  function afterLegacy(p) {
    if (p[0] === 'quellen') {
      const sec = $$('main section').find(s => /Deine Eingaben/.test(s.querySelector('h2')?.textContent || ''));
      if (sec) sec.innerHTML = '<h2>Deine Eingaben</h2><p>In „Üben“ (Sprechen, Schreiben, Hören) und in „Mein Lernweg“ bleiben deine Texte und dein Fortschritt im Speicher deines Browsers – nur auf diesem Gerät. Texte in den Lektionen und im Prüfungstraining bleiben nur, solange die Seite geöffnet ist. Lade wichtige Texte vorher herunter. Freie Texte und die Aussprache werden nicht automatisch bewertet.</p><p>Mehr dazu in der <a href="#datenschutz">Datenschutzerklärung</a>.</p>';
    }
    if (p[0] === 'orientierungskurs' && !p[1]) videoSection('orientierung', 'Videos: Leben in Deutschland').then(sec => sec && mainEl.append(sec));
    if (p[0] === 'lektion' && p[1] && lessons.some(l => l.id === p[1])) {
      $('#pl-complete')?.addEventListener('click', () => { mem.done['lektion:' + p[1]] = Date.now(); save(); });
    }
  }

  /* ---------- Router ---------- */
  const legacyRoute = window.route;
  const NAV = { '': 'start', lernweg: 'wege', wegweiser: 'wege', lernen: 'lernen', lektion: 'lernen', wortschatz: 'lernen', wort: 'lernen', ueben: 'ueben', schreiben: 'ueben', hoeren: 'ueben', kahoot: 'ueben', pruefung: 'pruefung', training: 'pruefung', orientierungskurs: 'pruefung', quellen: 'pruefung', videos: 'videos', 'ueber-mich': 'ueber' };
  const TITLES = { '': 'Deutsch lernen mit Dennis', lernweg: 'Mein Lernweg', wegweiser: 'Welcher Weg passt?', lernen: 'Lektionen', lektion: 'Lektion', wortschatz: 'Wortschatz', wort: 'Wortkarte', ueben: 'Üben', schreiben: 'Schreib-Bausteine', hoeren: 'Hören', kahoot: 'Kahoot-Quiz', pruefung: 'Prüfungstraining', training: 'Prüfungstraining', orientierungskurs: 'Leben in Deutschland', quellen: 'Prüfungsinfos & Quellen', videos: 'Videos', 'ueber-mich': 'Über mich', impressum: 'Impressum', datenschutz: 'Datenschutz', pinnwand: 'Feedback und Wünsche' };
  const OWN = {
    '': () => home(),
    lernweg: p => p[1] ? pathPage(p[1]) : paths(),
    wegweiser: () => wegweiser(),
    lernen: p => lessonsPage(p[1]),
    ueben: p => p[1] ? practice(p[1], p[2], p[3]) : practiceHub(),
    schreiben: () => toolkit(),
    hoeren: p => p[1] ? listening(p[1], p[2]) : listeningHub(),
    pruefung: () => exam(),
    videos: p => videos(p[1], p[2]),
    'ueber-mich': () => about(),
    impressum: () => impressum(),
    datenschutz: () => datenschutz(),
    pinnwand: () => feedback()
  };
  const ALIAS = { buch: 'lernen', themen: 'lernen', cover: '', praxis: 'ueben', pruefungen: 'pruefung', start: '' };

  window.route = function () {
    let raw = decodeURIComponent(location.hash.slice(1)).replace(/^\/+/, '');
    let p = raw.split('/');
    if (p[0] in ALIAS) { p[0] = ALIAS[p[0]]; if (p[0] === '') p = ['']; if (p[0] === 'lernen' && p[1] === 'beruf') p[1] = 'B2'; }
    if (p[0] === 'lernweg' && p[1] === 'everyday') p[1] = 'sprechen';
    if (p[0] === 'lernweg' && p[1] === 'writing') p[1] = 'schreiben';
    stopSpeaking();
    $$('audio').forEach(a => a.pause());
    document.body.dataset.learningLevel = '';
    const own = OWN[p[0]];
    if (own) own(p);
    else { try { legacyRoute(); } catch (e) { console.error(e); home(); } afterLegacy(p); }
    const nav = NAV[p[0]] ?? '';
    $$('#main-navigation a[data-nav]').forEach(a => { const on = a.dataset.nav === nav; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const h1 = $('main h1')?.textContent.trim();
    document.title = (p[0] === '' ? 'Deutsch mit Dennis – kostenlos Deutsch lernen von A1 bis B2' : `${h1 && h1.length < 60 ? h1 : TITLES[p[0]] || 'Deutsch lernen'} – Deutsch mit Dennis`);
    $('header')?.classList.remove('menu-open');
    $('#pl-menu')?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Weitermachen merken: nur Lernseiten
    const routeStr = p.filter(Boolean).join('/');
    if (['lektion', 'wortschatz', 'ueben', 'hoeren', 'training', 'lernweg', 'orientierungskurs'].includes(p[0]) && routeStr) {
      mem.visited[routeStr] = Date.now();
      mem.last = { route: routeStr, title: (h1 || TITLES[p[0]] || '').replace(/\.$/, '').slice(0, 48), ts: Date.now() };
      save();
    }
  };

  /* Menü: Schließen beim Klick außerhalb */
  document.addEventListener('click', e => { const hd = $('header'); if (hd?.classList.contains('menu-open') && !hd.contains(e.target)) { hd.classList.remove('menu-open'); $('#pl-menu')?.setAttribute('aria-expanded', 'false'); } });

  /* Footer-Jahr */
  const y = $('#dm-year'); if (y) y.textContent = new Date().getFullYear();

  route();
  DM.speak = speak; DM.loadVideos = loadVideos;
})();
