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
  DM.save = save;
  DM.routes ||= {};

  /* ---------- Sprachausgabe (Vorlesen) ---------- */
  const synth = window.speechSynthesis;
  let voicesDE = [];
  // Natürlich klingende Stimmen zuerst (Edge „Online (Natural)“, Chrome „Google Deutsch“, Apple „Premium/Enhanced“) – roboterhafte (eSpeak u. ä.) zuletzt
  const voiceScore = v => (/natural|neural|online/i.test(v.name) ? 40 : 0) + (/premium|enhanced|erweitert/i.test(v.name) ? 30 : 0) + (/^google/i.test(v.name) ? 20 : 0)
    + (/^(anna|petra|helena|markus|yannick|katja|conrad|amala|seraphina|florian)\b/i.test(v.name) ? 10 : 0) + (/^de-DE$/i.test(v.lang) ? 5 : 0) - (/espeak|compact|pico|robot/i.test(v.name) ? 50 : 0);
  const loadVoices = () => { if (!synth) return; voicesDE = synth.getVoices().filter(v => /^de(-|_|$)/i.test(v.lang)).sort((a, b) => voiceScore(b) - voiceScore(a)); };
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }
  /* Aufgenommene Hörtexte (Neural-Stimmen, erzeugt per GitHub Action, siehe tools/tts).
     Gibt es zu einem Text eine Datei, wird sie abgespielt – sonst liest die Stimme des Geräts. */
  const normT = s => String(s ?? '').replace(/\s+/g, ' ').trim();
  const fnv = s => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(normT(s))) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return 't' + h.toString(16).padStart(8, '0'); };
  let ttsFiles = {};
  const ttsReady = fetch('audio/tts/index.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : {}).then(j => { ttsFiles = j.files || {}; }).catch(() => {});
  const ttsSrc = key => ttsFiles[key] ? `audio/tts/${key}.mp3?v=${ttsFiles[key].v || ''}` : null;
  const hasRecording = (text, key) => !!ttsSrc(key || fnv(text));
  DM.ttsSrc = ttsSrc; DM.ttsReady = ttsReady;
  let player = null;
  function playRecording(src, rate, onend) {
    try { player?.pause(); } catch {}
    player = new Audio(src);
    player.preservesPitch = true;
    player.playbackRate = rate >= 0.9 ? 1 : 0.85;
    player.onended = () => onend?.(true);
    player.onerror = () => onend?.(false);
    player.play().catch(() => onend?.(false));
    return true;
  }
  function speak(text, { rate = 0.92, onend, dialogue = false, key } = {}) {
    const src = ttsSrc(key || fnv(text));
    if (src) { try { synth?.cancel(); } catch {} return playRecording(src, rate, onend); }
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
  const stopSpeaking = () => { try { synth?.cancel(); } catch {} try { player?.pause(); } catch {} };
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
  const speakBtn = (text, label = 'Vorlesen', extra = '') => (synth || hasRecording(text)) ? `<button type="button" class="dm-btn dm-btn-quiet dm-speak" data-speak="${x(text)}" ${extra}><span aria-hidden="true">🔊</span> ${label}</button>` : '';

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
  /* Vorschaubilder liegen auf dieser Website (assets/yt, täglich synchronisiert) – kein Abruf bei YouTube nötig */
  const vthumb = v => `<img src="assets/yt/${v.id}.jpg" alt="" loading="lazy" width="640" height="360" onerror="this.parentNode.classList.add('is-empty');this.remove()"><span class="dm-vthumb-ph" aria-hidden="true"><b>${x(v.title.split(/[|:–]/)[0].trim().slice(0, 60))}</b></span><span class="dm-vplay" aria-hidden="true">▶</span>`;
  function giveYtConsent() { mem.ytConsent = true; save(); }
  function videoCard(v, { big = false } = {}) {
    const thumb = vthumb(v);
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
    $('.dm-vgrid', box).innerHTML = list.map(v => `<a class="dm-vcard dm-cat-${v.category}" href="#videos/${cat}/${v.id}"><span class="dm-vthumb">${vthumb(v)}</span><span class="dm-vmeta"><span class="dm-tag">${DM.videoCategories[v.category]}${isRussian(v.title) ? ' · auf Russisch' : ''}</span><strong>${x(v.title)}</strong></span></a>`).join('');
    $('.dm-vgrid', box).removeAttribute('aria-busy');
    return box;
  }

  /* ---------- Bausteine ---------- */
  const art3d = (n, anim = 'float') => `<img class="dm-3d dm-3d-${anim}" src="assets/3d/${n}.webp" alt="" width="192" height="192" aria-hidden="true">`;
  const HEAD_ART = { lernweg: ['kompass', 'swing'], wegweiser: ['kompass', 'swing'], lernen: ['buecher', 'float'], ueben: ['idee', 'glow'], 'ueben/sprechen': ['sprechblase', 'bounce'], 'ueben/schreiben': ['schreiben', 'swing'], schreiben: ['memo', 'swing'], hoeren: ['kopfhoerer', 'float'], lesen: ['buecher', 'float'], lieder: ['mikrofon', 'float'], spiele: ['spiel', 'bounce'], kahoot: ['spiel', 'bounce'], pruefung: ['pokal', 'glow'], training: ['pokal', 'glow'], videos: ['video', 'swing'], material: ['blatt', 'float'], lernpakete: ['paket', 'bounce'], pinnwand: ['pin', 'swing'], quellen: ['register', 'float'] };
  function decorateHead() {
    const h = location.hash.slice(1).split('/'), key = HEAD_ART[h[0] + '/' + h[1]] ? h[0] + '/' + h[1] : h[0];
    let a = HEAD_ART[key]; if (h[0] === 'lieder' && h[1] && !['A1', 'A2', 'B1', 'B2', 'C1'].includes(h[1])) a = ['noten', 'float'];
    if (h[0] === 'hoeren' && h[1]) a = ['ohr', 'float']; if (h[0] === 'lernpakete' && h[1]) a = null;
    const head = mainEl.querySelector('.dm-head'); if (!a || !head || head.querySelector('.dm-3d')) return;
    head.querySelector('.dm-head-emoji')?.remove();
    if (head.classList.contains('dm-head-row')) { const h1 = head.querySelector('h1'); if (h1) { h1.classList.add('dm-h1-3d'); h1.insertAdjacentHTML('afterbegin', art3d(a[0], a[1]).replace('dm-3d ', 'dm-3d dm-3d-inline ')); } return; }
    if (!head.classList.contains('dm-head-art')) { const w = document.createElement('div'); while (head.firstChild) w.appendChild(head.firstChild); head.appendChild(w); head.classList.add('dm-head-art'); }
    head.insertAdjacentHTML('beforeend', art3d(a[0], a[1]));
  }
  const page = (html, cls = '') => { mainEl.innerHTML = `<div class="dm-page ${cls}">${html}</div>`; decorateHead(); };
  const crumbs = items => `<nav class="dm-crumbs" aria-label="Du bist hier"><a href="#">Start</a>${items.map(([t, u], i) => u ? `<a href="${u}">${x(t)}</a>` : i === items.length - 1 ? `<span aria-current="page">${x(t)}</span>` : `<span>${x(t)}</span>`).join('')}</nav>`;
  const note = (text, sign = true) => `<aside class="dm-note"><p>${x(text)}</p>${sign ? '<span>– Dennis</span>' : ''}</aside>`;
  const pathDone = id => DM.paths[id].steps.filter(s => mem.done['weg:' + id + ':' + s[1]]).length;
  function lessonProgress(id) {
    let n = 0; for (let i = 0; i < 7; i++) if (mem.visited[`lektion/${id}/${i}`] || (i === 0 && mem.visited[`lektion/${id}`])) n++;
    return n;
  }
  const allScenes = L => [...((typeof practiceScenes !== 'undefined' && practiceScenes[L]) || []), ...(DM.extraScenes[L] || [])];

  /* ---------- Startseite ---------- */
  function pkgTeaser() {
    const P = (DM.packages || []).filter(k => k.buy);
    if (!P.length) return '';
    const prices = P.map(k => parseFloat(String(k.price).replace(',', '.'))).filter(n => !isNaN(n));
    const from = prices.length ? Math.min(...prices).toFixed(2).replace('.', ',') + ' €' : '';
    const pick = ['dtz-schreiben-20-briefe', 'lid-lernheft', 'b2-wiederholer'].map(id => P.find(k => k.id === id)).filter(Boolean);
    const BK = (DM.books || []).filter(b => b.amazon);
    return `<section class="dm-section dm-pkg-teaser" aria-labelledby="pkgt-h">
      <div class="dm-pkg-teaser-copy"><p class="dm-kicker">Alles zum Üben bleibt kostenlos</p>
        <h2 id="pkgt-h">Du willst gezielt mehr üben?</h2>
        <p>${BK.length ? 'Meine Übungsbücher gedruckt bei Amazon – und ausführliche PDF-Lernpakete' : 'Ausführliche PDF-Lernpakete'} mit Musterlösungen für DTZ, B2 Beruf, „Leben in Deutschland“ und für Lehrkräfte${from ? ` · PDF ab ${from}` : ''}.</p>
        <div class="dm-row">${BK.length ? '<a class="dm-btn" href="#lernpakete/buecher">Übungsbücher bei Amazon</a><a class="dm-btn dm-btn-quiet" href="#lernpakete">PDF-Lernpakete</a>' : '<a class="dm-btn" href="#lernpakete">Alle Lernpakete ansehen</a>'}</div></div>
      <ul class="dm-pkg-teaser-list">${BK.map(b => `<li><a href="#lernpakete/buecher"><img src="${b.img}" alt="" width="72" height="72" loading="lazy" style="object-fit:contain"><span><b>${x(b.title)}</b><small>Taschenbuch · ${x(b.price)}</small></span></a></li>`).join('')}${pick.slice(0, Math.max(1, 3 - BK.length)).map(k => `<li><a href="#lernpakete/${k.id}"><img src="${k.img}" alt="" width="72" height="72" loading="lazy"><span><b>${x(k.title)}</b><small>${x(k.level)} · ${x(k.price)}</small></span></a></li>`).join('')}</ul>
    </section>`;
  }
  /* Schnellstart: auf dem Handy direkt unter der Überschrift (Challenge, Probeprüfung, Lino, Lied des Tages) */
  function quickStart() {
    let ch = { streak: 0, doneToday: false };
    try { if (window.DMChallenge) ch = DMChallenge.status() || ch; } catch (e) { /* Startseite trotzdem zeigen */ }
    let sod = null; try { sod = songOfDay(); } catch (e) { sod = null; }
    const chSub = ch.doneToday ? `✓ Heute geschafft · ${ch.streak} 🔥` : ch.streak ? `Serie: ${ch.streak} ${ch.streak === 1 ? 'Tag' : 'Tage'} 🔥` : '10 Aufgaben · 3 Min.';
    const tiles = [
      ['#challenge', 'dm-q-ch', '🔥', 'Tages-Challenge', chSub],
      ['#simulation', 'dm-q-sp', '🎯', 'Probeprüfung', 'DTZ, LiD, telc, DTB · mit Uhr'],
      ['#spiele/lino', 'dm-q-lino', '🏃', 'Lino läuft', '14 Welten · Tageslauf & Shop'],
      [sod ? '#lieder/' + sod.id : '#lieder', 'dm-q-song', '🎵', sod ? 'Lied des Tages' : 'Lieder', sod ? sod.title : '51 Lieder A1–C1']
    ];
    return `<nav class="dm-quick" aria-label="Schnellstart">${tiles.map(([u, c, i, t, s]) => `<a class="${c}" href="${x(u)}"><span class="dm-q-ico" aria-hidden="true">${i}</span><b>${x(t)}</b><small>${x(s)}</small></a>`).join('')}</nav>`;
  }
  function home() {
    const last = mem.last && mem.last.route !== '' ? mem.last : null;
    page(`
    <section class="dm-hero">
      <figure class="dm-hero-photo"><img src="assets/dennis.webp" alt="Dennis, dein Deutschlehrer" width="626" height="1004" fetchpriority="high"></figure>
      <div class="dm-hero-copy">
        <a class="lino-hero-chip" href="#simulation"><span aria-hidden="true">⏱</span><span><b>Neu:</b> 6 Probeprüfungen mit echter Zeit – DTZ, LiD, telc und DTB</span><span class="lino-hero-go" aria-hidden="true">▶</span></a>
        <h1>Deutsch lernen mit Dennis</h1>
        ${quickStart()}
        <p class="dm-lead">Kostenlose Übungen von A1 bis B2 Beruf – für deinen Alltag, deine Prüfung und deinen Job. Ohne Anmeldung.</p>
        <p class="dm-hand">Hallo! Ich bin Dennis, dein Deutschlehrer und zugelassener Prüfer. Wähle unten deinen Weg – ich zeige dir die nächsten Schritte.</p>
        <ul class="dm-trust"><li>✓ DTZ-Prüfer</li><li>✓ telc-Prüfer B1–C1</li><li>✓ Lehrkraft mit BAMF-Zulassung bis C2</li></ul>
        <p class="dm-tour-start"><a href="#" data-tour-start><span aria-hidden="true">▶</span> Rundgang mit Dennis ansehen (30 Sek.)</a></p>
        <div class="dm-row">
          ${last ? `<a class="dm-btn" href="#${x(last.route)}">Weitermachen: ${x(last.title)}</a><a class="dm-btn dm-btn-quiet" href="#wegweiser">Welcher Weg passt zu mir?</a>` : `<a class="dm-btn" href="#wegweiser">Welcher Weg passt zu mir?</a><a class="dm-btn dm-btn-quiet" href="#lernen/A1">Mit A1 beginnen</a>`}
        </div>
      </div>
    </section>

    <section class="dm-section" aria-labelledby="wege-h">
      <div class="dm-section-head"><h2 id="wege-h">Wähle deinen Weg</h2><p>Du kannst jederzeit wechseln.</p></div>
      <div class="dm-paths">${(DM.pathHome || DM.pathOrder).map(id => pathCard(id)).join('')}</div>
      <p class="dm-center"><a class="dm-btn dm-btn-quiet" href="#lernweg">Alle ${DM.pathOrder.length} Lernwege ansehen →</a></p>
    </section>

    <section class="dm-section dm-tools" aria-labelledby="tools-h">
      <div class="dm-section-head"><h2 id="tools-h">Direkt üben</h2></div>
      <div class="dm-toolgrid">
        <a href="#simulation" data-img="pokal"><img class="dm-tool-3d" src="assets/3d/pokal.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Probeprüfungen</b><span>DTZ, Leben in Deutschland, telc B1/B2, DTB B1/B2 – mit echter Zeit, Punkten und Lösungen.</span></a>
        <a href="#ueben/sprechen/A1" data-img="sprechblase"><img class="dm-tool-3d" src="assets/3d/sprechblase.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Sprechen</b><span>Gespräche aus dem Alltag, mit Satzanfängen und Beispiel zum Anhören.</span></a>
        <a href="#ueben/schreiben/A2" data-img="schreiben"><img class="dm-tool-3d" src="assets/3d/schreiben.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Schreiben</b><span>Nachrichten, Briefe und E-Mails – mit Sofort-Korrektur, Checkliste und Mustertext.</span></a>
        <a href="#hoeren" data-img="kopfhoerer"><img class="dm-tool-3d" src="assets/3d/kopfhoerer.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Hören</b><span>Hörtraining für Alltag und Beruf mit natürlichen Stimmen: Ansagen, Mailbox, Gespräche.</span></a>
        <a href="#lesen" data-img="buecher"><img class="dm-tool-3d" src="assets/3d/buecher.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Lesen</b><span>Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – wie in der Prüfung.</span></a>
        <a href="#lid" data-img="gebaeude"><img class="dm-tool-3d" src="assets/3d/gebaeude.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Leben in Deutschland</b><span>Lernspiele und Wissen für den Orientierungskurs.</span></a>
        <a href="#lieder" data-img="mikrofon"><img class="dm-tool-3d" src="assets/3d/mikrofon.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Deutsch mit Liedern</b><span>51 eigene Lieder von A1 bis C1 – mit Text, Aufgaben und Lösungen.</span></a>
        <a href="#kahoot" data-img="spiel"><img class="dm-tool-3d" src="assets/3d/spiel.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Kahoot-Quiz</b><span>Spielerisch wiederholen – allein oder mit dem ganzen Kurs.</span></a>
        <a href="#material" data-img="blatt"><img class="dm-tool-3d" src="assets/3d/blatt.webp" alt="" width="192" height="192" loading="lazy" aria-hidden="true"><b>Materialien</b><span>Arbeitsblätter und Merkblätter als PDF – zum Ausdrucken.</span></a>

      </div>
    </section>

    ${window.DMChallenge ? `<section class="dm-section ch-home" aria-label="Tages-Challenge und Lernspiele">${DMChallenge.teaser()}<a class="sp-home" href="#spiele"><span aria-hidden="true">🎮</span><span><b>Lernspiele</b><small>18 Spiele: Jump’n’Run · Artikel · Verben · Alltag · DTB B2 · Leben in Deutschland</small></span><span class="sp-home-go">Spielen →</span></a></section>` : ''}

    <section class="dm-section lino-home" aria-labelledby="lino-h">
      <a class="lino-home-card" href="#spiele/lino">
        <svg class="lino-home-art" viewBox="0 0 320 180" aria-hidden="true" focusable="false">
          <defs><linearGradient id="lhSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset="1" stop-color="#e3f4ff"/></linearGradient></defs>
          <rect width="320" height="180" fill="url(#lhSky)"/>
          <g fill="#fff" opacity=".9"><circle cx="52" cy="34" r="11"/><circle cx="66" cy="28" r="14"/><circle cx="82" cy="35" r="10"/><circle cx="238" cy="26" r="9"/><circle cx="250" cy="21" r="12"/><circle cx="264" cy="27" r="9"/></g>
          <path d="M0 120 Q60 88 120 108 T240 100 T320 96 V180 H0Z" fill="#7cc46a"/>
          <rect x="0" y="142" width="128" height="38" fill="#8a5a32"/><rect x="0" y="142" width="128" height="8" fill="#4fb341"/>
          <rect x="128" y="146" width="56" height="34" fill="#22160e"/>
          <rect x="184" y="142" width="136" height="38" fill="#8a5a32"/><rect x="184" y="142" width="136" height="8" fill="#4fb341"/>
          <g class="lino-home-coins" fill="#ffc928" stroke="#d18f00" stroke-width="2"><circle cx="140" cy="72" r="7"/><circle cx="158" cy="62" r="7"/><circle cx="176" cy="72" r="7"/></g>
          <g transform="translate(250 92)"><rect x="-4" y="0" width="8" height="50" fill="#7d7f8c"/><rect x="26" y="0" width="8" height="50" fill="#7d7f8c"/><rect x="-10" y="-20" width="50" height="22" rx="6" fill="#2341B5"/><text x="15" y="-4" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">Tor ?</text><g stroke="#2341B5" stroke-width="2"><path d="M4 10H26M4 22H26M4 34H26M4 46H26"/></g></g>
          <g class="lino-home-hero" transform="translate(150 78) rotate(-6)">
            <path d="M-6 30 L-12 42 M4 30 L12 40" stroke="#2b2f45" stroke-width="6" stroke-linecap="round"/>
            <rect x="-17" y="6" width="11" height="17" rx="3" fill="#ffc928"/>
            <rect x="-8" y="4" width="26" height="28" rx="8" fill="#2341B5"/>
            <path d="M12 12 L24 0" stroke="#2341B5" stroke-width="6" stroke-linecap="round"/>
            <circle cx="5" cy="-6" r="10" fill="#f2c79b"/><path d="M-5 -8 A10 10 0 0 1 15 -9 L10 -12 Q4 -18 -4 -12Z" fill="#5a3a22"/><circle cx="10" cy="-6" r="1.8" fill="#172036"/>
            <path d="M-6 4 H16 V9 H-6Z M-6 4 L-22 0 L-20 8 L-6 9Z" fill="#ff7a2f"/>
          </g>
        </svg>
        <span class="lino-home-copy">
          <span class="lino-home-kicker">Neu: 📅 Tageslauf · 🛍️ Shop · 🏅 Abzeichen</span>
          <b id="lino-h">Lino läuft – das Deutsch-Abenteuer</b>
          <span class="lino-home-text">Springe, fahre Auto, Schlitten und ICE. An jedem Tor eine Deutschfrage – jetzt auch zum Hören, mit Artikeln und Satzbau. Sammle Münzen für Mütze und Krone – und jeden Tag wartet ein neuer Tageslauf.</span>
          <span class="lino-home-levels" aria-label="14 Welten: A1 bis C1, vier Fahrzeug-Welten und fünf Alltagswelten"><i>A1</i><i>A2</i><i>B1</i><i>B2</i><i>C1</i><i>🚗</i><i>🛷</i><i>🚲</i><i>🚆</i><i>🛒</i><i>🩺</i><i>🏛️</i><i>💼</i><i>🤝</i></span>
          <span class="lino-home-go">▶ Jetzt spielen</span>
        </span>
      </a>
    </section>

    ${songStage(false)}

    <section class="dm-section dm-news" aria-labelledby="news-h">
      <div class="dm-section-head"><h2 id="news-h">Neu auf der Seite</h2><p>Jede Woche kommt etwas dazu.</p></div>
      <ol class="dm-newslist" id="dm-newslist" aria-busy="true"></ol>
    </section>

    <section class="dm-section dm-home-video" id="dm-home-video" aria-labelledby="video-h">
      <div class="dm-section-head"><h2 id="video-h">Neu auf YouTube</h2><a href="#videos">Alle Videos</a></div>
      <div class="dm-vgrid dm-vgrid-feature" aria-busy="true"><p class="dm-hint">Videos werden geladen …</p></div>
    </section>

    ${window.DMWitz ? DMWitz.card() : ''}
    <section class="dm-section dm-about-teaser">
      <img src="assets/dennis.webp" alt="" width="120" height="192" loading="lazy">
      <div><h2>Wer ist Dennis?</h2><p>Seit 2017 im Deutschunterricht – DaF, Integrationskurse, DSH und TestDaF. Master in Germanistik, lizenzierter DTZ- und telc-Prüfer, vom BAMF zugelassen für Integrations- und Berufssprachkurse bis C2. Ich kenne die Prüfungen aus dem Unterricht und als Prüfer.</p><div class="dm-row"><a class="dm-btn dm-btn-quiet" href="#ueber-mich">Mehr über mich</a><a class="dm-btn dm-btn-quiet" href="#ueber-mich/nachweise">Meine Zulassungen ansehen</a><a class="dm-btn dm-btn-quiet" href="#" data-tour-start><span aria-hidden="true">▶</span> Video: Dennis stellt sich vor</a></div></div>
    </section>

    <section class="dm-section dm-share-teaser"><div><h2>Kennst du jemanden, der Deutsch lernt?</h2><p>Schick ihm oder ihr den Link – per WhatsApp, Telegram oder E-Mail. Alles ist kostenlos und ohne Anmeldung.</p></div><button type="button" class="dm-btn" data-share="site"><span aria-hidden="true">↗</span> Website teilen</button></section>

    ${pkgTeaser()}`, 'dm-home');
    (window.DMNews ? DMNews.items() : fetch('neu.json?v=' + Math.floor(Date.now() / 36e5), { cache: 'no-cache' }).then(r => r.json()).then(j => j.items || [])).then(items => {
      const ico = { lied: ['noten', 'Lied'], hoeren: ['kopfhoerer', 'Hören'], sprechen: ['sprechblase', 'Sprechen'], schreiben: ['schreiben', 'Schreiben'], uebung: ['idee', 'Übung'], neu: ['funkeln', 'Neu'], video: ['video', 'Video'], kahoot: ['spiel', 'Kahoot'] };
      const ol = $('#dm-newslist'); if (!ol) return; ol.removeAttribute('aria-busy');
      ol.innerHTML = items.slice(0, 4).map(it => { const [img, lab] = ico[it.type] || ico.neu; return `<li><a href="${x(it.link)}"><img src="assets/3d/${img}.webp" alt="" width="192" height="192" loading="lazy"><span><small>${lab} · ${fmtDate(it.date)}</small><b>${x(it.title)}</b></span></a></li>`; }).join('');
    }).catch(() => $('.dm-news')?.remove());
    loadVideos().then(list => {
      const box = $('#dm-home-video .dm-vgrid'); if (!box) return;
      box.removeAttribute('aria-busy');
      box.innerHTML = list.slice(0, 3).map((v, i) => `<a class="dm-vcard dm-cat-${v.category}${i === 0 ? ' dm-vcard-big' : ''}" href="#videos/alle/${v.id}"><span class="dm-vthumb">${vthumb(v)}</span><span class="dm-vmeta"><span class="dm-tag">${i === 0 ? 'Neuestes Video · ' : ''}${DM.videoCategories[v.category]}</span><strong>${x(v.title)}</strong>${v.published ? `<small>${fmtDate(v.published)}</small>` : ''}</span></a>`).join('');
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
      ${['start', 'alltag', 'pruefung', 'beruf'].map(gk => { const ids = DM.pathOrder.filter(id => DM.paths[id].group === gk); return ids.length ? `<section class="dm-section" aria-label="${x(DM.groups[gk].label)}"><div class="dm-section-head"><h2>${{ start: 'Neu in Deutschland', alltag: 'Deutsch im Alltag', pruefung: 'Prüfungen: DTZ, Leben in Deutschland, telc', beruf: 'Beruf: DTB B1 und B2' }[gk]}</h2><p>${{ start: 'Für den Anfang', alltag: 'Ohne Prüfungsdruck', pruefung: 'Mit Probeprüfung und echter Zeit', beruf: 'Berufssprachkurs – mit Probeprüfung' }[gk]}</p></div><div class="dm-paths">${ids.map(pathCard).join('')}</div></section>` : ''; }).join('')}
      <p class="dm-center"><a class="dm-btn" href="#simulation">Direkt zu den Prüfungssimulationen</a> <a class="dm-btn dm-btn-quiet" href="#wegweiser">Ich weiß nicht, welcher Weg passt</a></p>`);
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
      ${['bridge', 'repeat', 'dtbb2'].includes(id) ? '<p class="dm-small">B2 Beruf: Die Übungen orientieren sich am beruflichen Deutsch und am Deutsch-Test für den Beruf B2. Wenn du eine andere B2-Prüfung machst, prüfe das Format bei deinem Anbieter.</p>' : ''}
      <div id="dm-path-videos"></div>`);
      $$('[data-done]').forEach(c => c.onchange = () => { if (c.checked) mem.done[c.dataset.done] = Date.now(); else delete mem.done[c.dataset.done]; save(); render(); });
      const cat = { dtz: 'pruefung', repeat: 'pruefung', bridge: 'deutsch', start: 'deutsch', sprechen: 'deutsch', schreiben: 'pruefung', lid: 'orientierung', telcb1: 'pruefung', telcb2: 'pruefung', dtbb1: 'pruefung', dtbb2: 'pruefung' }[id];
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
      } else if (['bridge', 'repeat', 'telcb2', 'dtbb2'].includes(goal) && lvl === 'A2') {
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
      ${materialLinks('grammatik', 'Arbeitsblätter zur Grammatik')}
      <p class="dm-small">Die Lektionen vertiefen ausgewählte Themen. Sie ersetzen keinen vollständigen Sprachkurs.</p>`);
    const draw = () => {
      const q = $('#dm-q').value.trim().toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss');
      const hay = l => { const u = typeof platformUnits !== 'undefined' ? platformUnits[l.id] : null; return `${l.title} ${l.goal} ${l.rule} ${l.text} ${l.task} ${(l.words || []).join(' ')} ${u ? JSON.stringify(u) : ''} ${typeof vwords === 'function' && typeof lessonWords !== 'undefined' && lessonWords[l.id] ? vwords(l).map(w => w.word + ' ' + (w.example || '')).join(' ') : ''}`.toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss'); };
      const list = lessons.filter(l => q ? hay(l).includes(q) : l.level === sel);
      $('#dm-count').textContent = q ? `${list.length} Lektionen zu „${$('#dm-q').value}“ (alle Niveaus)` : `${list.length} Lektionen auf ${sel === 'B2' ? 'B2 Beruf' : sel}`;
      $('#dm-lessons').innerHTML = list.map(l => {
        const n = lessonProgress(l.id), i = lessons.filter(o => o.level === l.level).indexOf(l) + 1, done = (typeof platformDone !== 'undefined' && platformDone.has(l.id)) || mem.done['lektion:' + l.id];
        return `<a class="dm-lesson" href="#lektion/${l.id}">
          <span class="dm-lesson-img"><img src="assets/${imgFor(l)}-klein.webp" alt="" loading="lazy" onerror="this.parentNode.classList.add('is-empty');this.remove()"></span>
          <span class="dm-lesson-text"><span class="dm-path-meta">${l.level} · Lektion ${i}${done ? ' · ✓ bearbeitet' : n ? ` · ${n} von 7 Schritten` : ''}</span><b>${x(l.title)}</b><span>${x(l.goal)}</span></span></a>`;
      }).join('') || '<p class="dm-empty">Kein Thema gefunden. Versuche ein anderes Wort, zum Beispiel „Termin“ oder „Arbeit“.</p>';
    };
    $('#dm-q').oninput = draw; draw();
  }

  /* ---------- Üben: Übersicht ---------- */
  function practiceHub() {
    page(`${crumbs([['Üben']])}
      <div class="dm-head"><h1>Üben</h1><p class="dm-lead">Sprechen, schreiben, hören und lesen – ohne Prüfungsdruck. Wähle dein Niveau.</p></div>
      ${window.DMChallenge ? DMChallenge.teaser() : ''}
      <div class="dm-hub">
        <section class="dm-card dm-hub-card"><h2>💬 Sprechen</h2><p>Kurze Situationen aus dem Alltag und Beruf. Mit Satzanfängen, Rückfrage und Beispiel zum Anhören.</p>${levelLinks('ueben/sprechen')}</section>
        <section class="dm-card dm-hub-card"><h2>✍️ Schreiben</h2><p>Plane deinen Text, schreib ihn und vergleiche mit einem Muster. Dein Entwurf bleibt auf deinem Gerät gespeichert.</p>${levelLinks('ueben/schreiben')}<a class="dm-inline-link" href="#schreiben/bausteine">Schreib-Bausteine: Anrede, Gruß, Verbindungswörter</a></section>
        <section class="dm-card dm-hub-card"><h2>🎧 Hören</h2><p>Hörtraining für DTZ und DTB B2 mit natürlichen Stimmen – plus kurze Texte zum Einstieg.</p><div class="dm-pills"><a href="#hoeren/dtz-1"><b>DTZ</b><small>5 Übungssätze</small></a><a href="#hoeren/b2-1"><b>DTB B2</b><small>4 Übungssätze</small></a><a href="#hoeren"><b>Alle</b><small>Übersicht</small></a></div></section>
        <section class="dm-card dm-hub-card"><h2>📖 Lesen</h2><p>Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – mit Fragen und Erklärungen.</p><div class="dm-pills"><a href="#lesen/alltag"><b>Alltag</b><small>A2–B1 · DTZ</small></a><a href="#lesen/beruf"><b>Beruf</b><small>B1–B2 · DTB</small></a></div></section>
        <section class="dm-card dm-hub-card"><h2>🎮 Lernspiele</h2><p>18 Spiele, neu: das Jump’n’Run „Lino läuft“ von A1 bis C1. Dazu Grammatik, Alltag, DTB B2 Beruf und „Leben in Deutschland“.</p><a class="dm-btn dm-btn-quiet" href="#spiele">Zu den Lernspielen</a></section>
        <section class="dm-card dm-hub-card"><h2>🖼 Bild beschreiben</h2><p>Adjektivendungen und Relativsätze an Bildern üben – wie im DTZ, Teil Sprechen 2.</p><a class="dm-btn dm-btn-quiet" href="#bild">Zum Bild-Trainer</a></section>
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
          <figure class="dm-scene-img"><img src="assets/${x(s.image)}.webp" alt="" loading="lazy" onerror="this.parentNode.remove()"></figure>
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
          <p class="dm-small">Dein Text bleibt auf diesem Gerät gespeichert. Mit „Text prüfen“ bekommst du sofort Hinweise zu Rechtschreibung und Grammatik.</p>
        </section>
      </div>
      ${writing ? '' : speechCoach()}
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
    if (!writing) bindSpeechCoach();
  }


  /* ---------- Sprech-Coach: einsprechen, mitschreiben lassen, korrigieren ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechCoach = () => `<section class="dm-card dm-coach" id="dm-coach" aria-labelledby="coach-h">
      <div class="dm-coach-top"><img class="dm-coach-ico" src="assets/3d/studiomikro.webp" alt="" width="192" height="192" aria-hidden="true"><div><h2 id="coach-h">Einsprechen und korrigieren lassen</h2>
      <p>Sprich deine Antwort laut ins Mikrofon. ${SR ? 'Die Seite schreibt mit, was sie verstanden hat, und zeigt dir danach Fehler in Grammatik und Wortformen.' : 'Danach hörst du dich selbst an.'}</p></div></div>
      <div class="dm-coach-stage">
        <button type="button" class="dm-coach-rec" id="dm-coach-rec" aria-pressed="false"><span class="dm-coach-dot" aria-hidden="true"></span><span class="dm-coach-label">Aufnahme starten</span></button>
        <div class="dm-coach-meter" aria-hidden="true">${'<i></i>'.repeat(24)}</div>
        <span class="dm-coach-time" id="dm-coach-time" role="timer">00:00</span>
      </div>
      <p class="dm-coach-live" id="dm-coach-live" aria-live="polite"></p>
      <div id="dm-coach-result" hidden>
        <audio controls id="dm-coach-audio"></audio>
        <p class="dm-coach-stats" id="dm-coach-stats"></p>
        <label for="dm-coach-text"><b>${SR ? 'Das hat das Mikrofon verstanden' : 'Schreib auf, was du gesagt hast'}</b> <small>(${SR ? 'stimmt ein Wort nicht? Dann hast du es vielleicht undeutlich gesprochen – du kannst es auch korrigieren' : 'dein Browser kann nicht mitschreiben'})</small></label>
        <textarea id="dm-coach-text" data-speech="1" rows="4"></textarea>
      </div>
      <p class="dm-small dm-coach-privacy">Zuerst fragt dein Browser, ob die Seite das Mikrofon benutzen darf. Die Aufnahme bleibt auf deinem Gerät. ${SR ? 'Für das Mitschreiben nutzt dein Browser seine eigene Spracherkennung – in Chrome und Edge wird der Ton dafür an Google bzw. Microsoft übertragen. ' : ''}Die Korrektur nutzt LanguageTool und eigene Regeln für typische Lernerfehler. <a href="#datenschutz">Datenschutz</a></p>
    </section>`;
  function bindSpeechCoach() {
    const btn = $('#dm-coach-rec'); if (!btn) return;
    let rec = null, recog = null, stream = null, ctx = null, raf = 0, t0 = 0, tick = 0, chunks = [], finalText = '', on = false, url = null, waitRec = false, waitSr = false, guard = 0;
    const bars = [...document.querySelectorAll('.dm-coach-meter i')], live = $('#dm-coach-live'), timeEl = $('#dm-coach-time');
    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const stop = () => {
      if (!on) return; on = false; btn.classList.remove('is-on'); btn.setAttribute('aria-pressed', 'false'); btn.querySelector('.dm-coach-label').textContent = 'Noch einmal aufnehmen';
      cancelAnimationFrame(raf); clearInterval(tick); bars.forEach(b => b.style.transform = '');
      waitRec = !!(rec && rec.state !== 'inactive'); waitSr = !!recog;
      try { recog && recog.stop(); } catch {} try { waitRec && rec.stop(); } catch {}
      stream && stream.getTracks().forEach(t => t.stop()); ctx && ctx.close().catch(() => {});
      clearTimeout(guard); guard = setTimeout(() => { waitRec = waitSr = false; done(); }, 1500); done();
    };
    let finished = true;
    const done = () => { if (finished || waitRec || waitSr) return; finished = true; clearTimeout(guard); finish(); };
    const finish = () => {
      $('#dm-coach-audio').hidden = !url;
      const secs = Math.max(1, Math.round((Date.now() - t0) / 1000));
      const text = (finalText || live.dataset.interim || '').replace(/\s+/g, ' ').trim();
      const ta = $('#dm-coach-text'); ta.value = text ? text.charAt(0).toUpperCase() + text.slice(1) + (/[.!?]$/.test(text) ? '' : '.') : '';
      const words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;
      $('#dm-coach-result').hidden = false;
      $('#dm-coach-stats').innerHTML = `<span>⏱ ${fmt(secs)} gesprochen</span><span>💬 ${words} Wörter</span>${words ? `<span>🚀 ${Math.round(words / secs * 60)} Wörter pro Minute</span>` : ''}`;
      live.textContent = SR ? (text ? '' : 'Ich habe leider nichts verstanden. Sprich lauter und näher am Mikrofon – oder schreib unten, was du gesagt hast.') : '';
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      if (text) setTimeout(() => { const b = ta.parentNode.querySelector('.sc-btn'); if (b) b.click(); }, 150);
    };
    btn.onclick = async () => {
      if (on) { stop(); return; }
      if (!navigator.mediaDevices?.getUserMedia) { live.textContent = 'Dein Browser erlaubt hier keine Aufnahme. Versuche es mit Chrome, Edge oder Safari.'; return; }
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch { live.textContent = 'Das Mikrofon ist nicht freigegeben. Erlaube den Zugriff in der Adresszeile (Schloss-Symbol) und versuche es noch einmal.'; return; }
      on = true; finished = false; finalText = ''; live.dataset.interim = ''; chunks = []; t0 = Date.now(); rec = null; recog = null;
      btn.classList.add('is-on'); btn.setAttribute('aria-pressed', 'true'); btn.querySelector('.dm-coach-label').textContent = 'Aufnahme beenden';
      $('#dm-coach-result').hidden = true; live.textContent = SR ? 'Ich höre zu … Sprich jetzt.' : 'Aufnahme läuft … Sprich jetzt.';
      tick = setInterval(() => { timeEl.textContent = fmt(Math.round((Date.now() - t0) / 1000)); if (Date.now() - t0 > 180000) stop(); }, 250);
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)(); const an = ctx.createAnalyser(); an.fftSize = 64; ctx.createMediaStreamSource(stream).connect(an);
        const data = new Uint8Array(an.frequencyBinCount);
        const draw = () => { an.getByteFrequencyData(data); bars.forEach((b, i) => { b.style.transform = `scaleY(${0.12 + (data[i % data.length] / 255) * 0.88})`; }); raf = requestAnimationFrame(draw); }; draw();
      } catch {}
      if (window.MediaRecorder) {
        rec = new MediaRecorder(stream); rec.ondataavailable = e => e.data.size && chunks.push(e.data);
        rec.onstop = () => { if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })); $('#dm-coach-audio').src = url; waitRec = false; done(); };
        rec.start();
      }
      if (SR) {
        recog = new SR(); recog.lang = 'de-DE'; recog.continuous = true; recog.interimResults = true;
        recog.onresult = e => { let interim = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) finalText += ' ' + r[0].transcript; else interim += r[0].transcript; } live.dataset.interim = finalText + ' ' + interim; live.textContent = '„' + (finalText + ' ' + interim).trim() + ' …“'; };
        recog.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') live.textContent = 'Die Spracherkennung ist in diesem Browser gesperrt. Deine Aufnahme läuft trotzdem.'; };
        recog.onend = () => { if (on) { try { recog.start(); } catch {} } else { waitSr = false; done(); } };
        try { recog.start(); } catch {}
      }
    };
    window.addEventListener('hashchange', stop, { once: true });
  }

  /* ---------- Schreib-Bausteine ---------- */
  function toolkit() {
    page(`${crumbs([['Üben', '#ueben'], ['Schreib-Bausteine']])}
      <div class="dm-head"><h1>Schreib-Bausteine</h1><p class="dm-lead">Feste Formulierungen für Nachrichten, Briefe und E-Mails. Lerne sie als ganze Sätze.</p></div>
      <div class="dm-toolkit">${DM.toolkit.map(b => `<section class="dm-card"><p class="dm-path-meta">${b.level}</p><h2>${x(b.title)}</h2>${b.groups.map(([h, items]) => `<h3>${x(h)}</h3><ul class="dm-phrases">${items.map(i => `<li>${x(i)}</li>`).join('')}</ul>`).join('')}<p class="dm-tipline">${x(b.note)}</p></section>`).join('')}</div>
      <div class="dm-row dm-next"><a class="dm-btn" href="#ueben/schreiben/A2">Jetzt schreiben üben</a><a class="dm-btn dm-btn-quiet" href="#training/dtz-schreiben">DTZ-Brief üben</a><a class="dm-btn dm-btn-quiet" href="#training/dtb-schreiben">B2-Kundenantwort üben</a></div>`);
  }

  /* ---------- Hören ---------- */
  const listenSet = id => (DM.listening || {})[id] || (DM.listeningExam || {})[id];
  const setCard = (id, set, color) => { const done = set.items.filter((_, i) => mem.done[`hoeren:${id}:${i}`] !== undefined).length;
    return `<a class="dm-path dm-g-${color}" href="#hoeren/${id}"><span class="dm-path-icon" aria-hidden="true">🎧</span><span class="dm-path-text"><span class="dm-path-meta">${set.level} · ${set.exam}</span><b>${x(set.title)}</b><span>${set.items.length} Hörtexte: ${x([...new Set(set.items.map(i => i.type))].slice(0, 3).join(', '))} …</span>${done ? `<span class="dm-mini-progress"><i style="width:${Math.round(done / set.items.length * 100)}%"></i></span><small>${done} von ${set.items.length} bearbeitet</small>` : ''}</span></a>`; };
  function listeningHub() {
    const ex = DM.listeningExam || {};
    const group = g => Object.entries(ex).filter(([, s]) => s.group === g);
    page(`${crumbs([['Üben', '#ueben'], ['Hören']])}
      <div class="dm-head dm-head-art"><div><h1>Hören</h1><p class="dm-lead">Ansagen, Mailbox-Nachrichten, Gespräche und Radiobeiträge – mit Fragen und Lösungen. Die Texte sind mit natürlichen Stimmen aufgenommen, verschiedene Personen sprechen.</p></div><span class="dm-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
      <section class="dm-section"><div class="dm-section-head"><h2>DTZ Hören – Übungssätze</h2><p>A2–B1 · alle vier Teile wie in der Prüfung</p></div>
        <div class="dm-paths">${group('dtz').map(([id, s]) => setCard(id, s, 'sun')).join('')}</div></section>
      ${group('telcb1').length ? `<section class="dm-section"><div class="dm-section-head"><h2>telc B1 Hören – allgemein</h2><p>B1 · Radiomeldungen, Interview, Durchsagen – richtig oder falsch</p></div>
        <div class="dm-paths">${group('telcb1').map(([id, s]) => setCard(id, s, 'sky')).join('')}</div></section>` : ''}
      ${group('dtbb1').length ? `<section class="dm-section"><div class="dm-section-head"><h2>DTB B1 Hören – Beruf</h2><p>B1 Beruf · Mailbox, Durchsagen im Betrieb, Gespräche im Team</p></div>
        <div class="dm-paths">${group('dtbb1').map(([id, s]) => setCard(id, s, 'ink')).join('')}</div></section>` : ''}
      <section class="dm-section"><div class="dm-section-head"><h2>DTB B2 Hören – Beruf</h2><p>B2 · Mailbox, Besprechung, Kundengespräch, Radio</p></div>
        <div class="dm-paths">${group('b2').map(([id, s]) => setCard(id, s, 'ink')).join('')}</div></section>
      <section class="dm-section"><div class="dm-section-head"><h2>Kurze Hörtexte zum Einstieg</h2></div>
        <div class="dm-paths">${Object.entries(DM.listening).map(([id, set]) => setCard(id, set, id === 'beruf' ? 'sky' : 'mint')).join('')}</div></section>
      <p class="dm-small">Alle Hörtexte sind eigene Übungstexte im Stil der Prüfungen, keine offiziellen Prüfungsaufgaben. Die Stimmen sind künstlich erzeugt (KI).</p>`);
  }
  function listening(setId, raw) {
    const set = listenSet(setId); if (!set) return listeningHub();
    const n = Math.max(0, Math.min(set.items.length - 1, Number(raw) || 0)), item = set.items[n];
    const plays = { count: 0 };
    const rec = hasRecording(item.text, item.id);
    const canPlay = rec || !!synth;
    const transcript = item.segments ? item.segments.map(g => `<p class="dm-line dm-v-${g.voice[0]}"><b>${g.voice[0] === 'f' ? '♀' : '♂'}</b> ${x(g.text)}</p>`).join('') : `<p class="dm-model">${x(item.text)}</p>`;
    page(`${crumbs([['Üben', '#ueben'], ['Hören', '#hoeren'], [set.title]])}
      <div class="dm-head"><h1>${x(set.title)}</h1><p class="dm-lead">${x(set.intro)}</p></div>
      <nav class="dm-scenes" aria-label="Hörtext wählen">${set.items.map((it, i) => `<a href="#hoeren/${setId}/${i}" ${i === n ? 'aria-current="page"' : ''} class="${mem.done[`hoeren:${setId}:${i}`] !== undefined ? 'is-done' : ''}">${i + 1}. ${x(it.type)}</a>`).join('')}</nav>
      <div class="dm-practice">
        <section class="dm-card dm-listen">
          <p class="dm-path-meta">${item.teil ? x(item.teil) + ' · ' : ''}Hörtext ${n + 1} von ${set.items.length}</p>
          <h2>${x(item.type)}</h2>
          ${item.situation ? `<p class="dm-task">${x(item.situation)}</p>` : ''}
          ${canPlay ? `<div class="dm-player-audio">
            <button type="button" class="dm-play" id="dm-play" aria-describedby="dm-plays"><span aria-hidden="true">▶</span> Abspielen</button>
            <label class="dm-tempo">Tempo <select id="dm-rate"><option value="0.92">normal</option><option value="0.75">langsamer</option></select></label>
            <span class="dm-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          </div><p class="dm-small" id="dm-plays">Lies zuerst die Fragen. Dann hör den Text – du kannst ihn zweimal hören.</p>` : '<p class="dm-warn">Dein Browser kann keine Texte vorlesen. Du kannst den Text unten lesen.</p>'}
          <details id="dm-transcript" ${canPlay ? '' : 'open'}><summary>Text zum Mitlesen</summary><div class="dm-transcript">${transcript}</div></details>
          <p class="dm-small">${rec ? '🎙 Aufnahme mit natürlichen KI-Stimmen.' : 'Computerstimme deines Geräts. Eine natürliche Aufnahme folgt in Kürze.'}</p>
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
      const card = btn.closest('.dm-listen');
      if (btn.classList.contains('is-playing')) { stopSpeaking(); btn.classList.remove('is-playing'); card.classList.remove('is-playing'); btn.innerHTML = '<span aria-hidden="true">▶</span> Abspielen'; return; }
      plays.count++;
      btn.classList.add('is-playing'); card.classList.add('is-playing'); btn.innerHTML = '<span aria-hidden="true">■</span> Stopp';
      const isDialogue = /\s–\s/.test(item.text);
      speak(item.text, { key: item.id, rate: Number($('#dm-rate').value), dialogue: isDialogue, onend: () => {
        btn.classList.remove('is-playing'); card.classList.remove('is-playing');
        btn.innerHTML = plays.count >= 2 ? '<span aria-hidden="true">↺</span> Noch einmal hören' : '<span aria-hidden="true">▶</span> Zum zweiten Mal hören';
        $('#dm-plays').textContent = plays.count >= 2 ? 'Du hast den Text zweimal gehört. Beantworte jetzt die Fragen.' : 'Lies die Fragen noch einmal. Dann hör den Text ein zweites Mal.';
      } });
    };
    $('#dm-lq').onsubmit = e => {
      e.preventDefault(); const f = new FormData(e.target); let ok = 0, filled = 0;
      item.questions.forEach((q, i) => { const v = f.get('q' + i), el = $('#dm-f' + i), good = v !== null && Number(v) === q.answer; if (v !== null) filled++; if (good) ok++; el.className = 'dm-feedback ' + (v === null ? '' : good ? 'good' : 'bad'); el.textContent = v === null ? 'Wähle bitte eine Antwort.' : `${good ? 'Richtig.' : 'Noch nicht richtig.'} ${q.why}`; });
      $('#dm-lq-score').textContent = filled === item.questions.length ? `${ok} von ${item.questions.length} richtig.${ok < item.questions.length ? ' Lies den Text mit und hör noch einmal.' : ' 🎉'}` : 'Bitte beantworte alle Fragen.';
      if (filled === item.questions.length) { mem.done[`hoeren:${setId}:${n}`] = ok; save(); if (ok === item.questions.length) celebrate(e.target); }
    };
    $('#dm-lq-reset').onclick = () => { $('#dm-lq').reset(); $$('.dm-feedback').forEach(el => { el.textContent = ''; el.className = 'dm-feedback'; }); $('#dm-lq-score').textContent = ''; };
  }
  /* ---------- Leseverstehen ---------- */
  const readSets = () => DM.reading || [];
  function readingHub() {
    const sets = readSets();
    page(`${crumbs([['Üben', '#ueben'], ['Lesen']])}
      <div class="dm-head"><h1>Lesen</h1><p class="dm-lead">Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – wie im Alltag, im DTZ und im DTB B2. Jede Woche kommt ein neuer Text dazu.</p></div>
      <div class="dm-paths">${sets.map((st, k) => { const done = st.items.filter(it => mem.done['lesen:' + it.id] !== undefined).length;
        return `<a class="dm-path dm-g-${k ? 'ink' : 'sun'}" href="#lesen/${st.id}"><span class="dm-path-icon" aria-hidden="true">📖</span><span class="dm-path-text"><span class="dm-path-meta">${x(st.level)} · ${x(st.exam)}</span><b>${x(st.title)}</b><span>${st.items.length} Lesetexte: ${x([...new Set(st.items.map(i => i.type))].slice(0, 3).join(', '))} …</span>${done ? `<span class="dm-mini-progress"><i style="width:${Math.round(done / st.items.length * 100)}%"></i></span><small>${done} von ${st.items.length} bearbeitet</small>` : ''}</span></a>`; }).join('')}</div>
      <p class="dm-small">Alle Lesetexte sind eigene Übungstexte im Stil der Prüfungen, keine offiziellen Prüfungsaufgaben.</p>`);
  }
  function reading(setId, raw) {
    const st = readSets().find(s => s.id === setId); if (!st || !st.items.length) return readingHub();
    const n = Math.max(0, Math.min(st.items.length - 1, Number(raw) || 0)), it = st.items[n];
    page(`${crumbs([['Üben', '#ueben'], ['Lesen', '#lesen'], [st.title]])}
      <div class="dm-head"><h1>${x(st.title)}</h1><p class="dm-lead">${x(st.intro)}</p></div>
      <nav class="dm-scenes" aria-label="Lesetext wählen">${st.items.map((t, i) => `<a href="#lesen/${setId}/${i}" ${i === n ? 'aria-current="page"' : ''} class="${mem.done['lesen:' + t.id] !== undefined ? 'is-done' : ''}">${i + 1}. ${x(t.type)}</a>`).join('')}</nav>
      <div class="dm-practice">
        <section class="dm-card dm-read">
          <p class="dm-path-meta">${x(it.type)} · Text ${n + 1} von ${st.items.length}</p>
          <h2>${x(it.title)}</h2>
          ${it.situation ? `<p class="dm-task">${x(it.situation)}</p>` : ''}
          <div class="dm-read-text">${it.text.split('\n').map(p => `<p>${x(p)}</p>`).join('')}</div>
        </section>
        <section class="dm-card">
          <h2>Fragen</h2>
          <form id="dm-rq">${it.questions.map((q, i) => `<fieldset><legend>${i + 1}. ${x(q.q)}</legend>${q.options.map((o, j) => `<label class="dm-option"><input type="radio" name="q${i}" value="${j}"><span>${x(o)}</span></label>`).join('')}<p class="dm-feedback" id="dm-rf${i}"></p></fieldset>`).join('')}
            <div class="dm-row"><button class="dm-btn">Antworten prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="dm-rq-reset">Neu versuchen</button></div>
            <p id="dm-rq-score" role="status" aria-live="polite"></p></form>
        </section>
      </div>
      <div class="dm-row dm-next">${n < st.items.length - 1 ? `<a class="dm-btn" href="#lesen/${setId}/${n + 1}">Nächster Text</a>` : `<a class="dm-btn" href="#lesen">Fertig – zur Übersicht</a>`}${n ? `<a class="dm-btn dm-btn-quiet" href="#lesen/${setId}/${n - 1}">Vorheriger Text</a>` : ''}</div>`);
    $('#dm-rq').onsubmit = e => {
      e.preventDefault(); const f = new FormData(e.target); let ok = 0, filled = 0;
      it.questions.forEach((q, i) => { const v = f.get('q' + i), el = $('#dm-rf' + i), good = v !== null && Number(v) === q.answer; if (v !== null) filled++; if (good) ok++; el.className = 'dm-feedback ' + (v === null ? '' : good ? 'good' : 'bad'); el.textContent = v === null ? 'Wähle bitte eine Antwort.' : `${good ? 'Richtig.' : 'Noch nicht richtig.'} ${q.why}`; });
      $('#dm-rq-score').textContent = filled === it.questions.length ? `${ok} von ${it.questions.length} richtig.${ok < it.questions.length ? ' Lies die markierte Stelle im Text noch einmal.' : ' 🎉'}` : 'Bitte beantworte alle Fragen.';
      if (filled === it.questions.length) { mem.done['lesen:' + it.id] = ok; save(); if (ok === it.questions.length) celebrate(e.target); }
    };
    $('#dm-rq-reset').onclick = () => { $('#dm-rq').reset(); $$('.dm-feedback').forEach(el => { el.textContent = ''; el.className = 'dm-feedback'; }); $('#dm-rq-score').textContent = ''; };
  }
  /* Kleine Konfetti-Animation bei allen richtigen Antworten */
  function celebrate(el) {
    if (!window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches) return;
    const box = document.createElement('div'); box.className = 'dm-confetti'; box.setAttribute('aria-hidden', 'true');
    box.innerHTML = Array.from({ length: 28 }, (_, i) => `<i style="--x:${(Math.random() * 2 - 1) * 180}px;--y:${-80 - Math.random() * 160}px;--r:${Math.random() * 720}deg;--d:${i * 12}ms;--c:${['#2341B5', '#F4B740', '#2E9E6B', '#E4572E', '#7B61FF'][i % 5]}"></i>`).join('');
    el.style.position ||= 'relative'; el.append(box); setTimeout(() => box.remove(), 1600);
  }

  /* ---------- Deutsch mit Liedern ---------- */
  const SONG_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const sunoConsent = () => !!mem.sunoConsent;
  function songOfDay() { const all = (DM.songs || []).filter(sg => sg.suno); if (!all.length) return null; const d = new Date(); return all[(d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % all.length]; }
  function songStage(isHub) {
    const all = DM.songs || [], sod = songOfDay();
    return `<section class="dm-stage${isHub ? ' dm-stage-hub' : ''}" aria-labelledby="stage-h">
      <div class="dm-stage-lights" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="dm-stage-notes" aria-hidden="true"><span>♪</span><span>♫</span><span>♩</span><span>♬</span><span>♪</span></div>
      <div class="dm-stage-copy">
        <p class="dm-stage-kicker">${isHub ? 'Einzigartig: eigene Lieder zum Deutschlernen' : 'Neu · nur hier'}</p>
        ${isHub ? '<h1 id="stage-h">Deutsch mit Liedern</h1>' : '<h2 id="stage-h">Deutsch mit Liedern</h2>'}
        <p class="dm-stage-lead">${all.length} eigene Lieder von A1 bis C1 – über Wohnung, Arzt, Arbeit, Gefühle und Grammatik. Hör zu, sing mit und lerne die Wörter mit Aufgaben und Lösungen.</p>
        <ul class="dm-stage-chips">${SONG_LEVELS.map(k => `<li><a href="#lieder/${k}">${k}</a></li>`).join('')}</ul>
        <div class="dm-row">${sod ? `<a class="dm-btn dm-btn-sun" href="#lieder/${sod.id}">▶ Lied des Tages: „${x(sod.title)}“</a>` : ''}<a class="dm-btn dm-btn-ghost" href="#lieder/playlist">♫ Playlist</a>${isHub ? '' : '<a class="dm-btn dm-btn-ghost" href="#lieder">Alle Lieder ansehen</a>'}</div>
      </div>
      <div class="dm-stage-art" aria-hidden="true"><span class="dm-stage-disc"><i></i></span>${art3d('mikrofon', 'float')}<span class="dm-stage-eq"><i></i><i></i><i></i><i></i><i></i></span></div>
    </section>`;
  }
  const songIsNew = sg => sg.added && Date.now() - new Date(sg.added) < 21 * 864e5;
  function songCard(sg) {
    const done = mem.done['lied:' + sg.id];
    return `<a class="dm-song dm-lv-${sg.level.toLowerCase()}" href="#lieder/${sg.id}"><span class="dm-song-disc" aria-hidden="true"><i></i></span>
      <span class="dm-song-text"><span class="dm-path-meta">${sg.level}${songIsNew(sg) && !done ? ' · <em class="dm-song-new">Neu</em>' : ''}${done ? ' · ✓ geübt' : ''}</span><b>${x(sg.title)}</b><span>${x(sg.theme)}</span></span></a>`;
  }
  function songsHub(sel) {
    if (!SONG_LEVELS.includes(sel)) sel = mem.songLevel && SONG_LEVELS.includes(mem.songLevel) ? mem.songLevel : 'A1';
    mem.songLevel = sel; save();
    const list = (DM.songs || []).filter(sg => sg.level === sel).sort((a, b) => (songIsNew(b) ? 1 : 0) - (songIsNew(a) ? 1 : 0));
    page(`${crumbs([['Deutsch mit Liedern']])}
      ${songStage(true)}
      <nav class="dm-tabs" aria-label="Niveau">${SONG_LEVELS.map(k => `<a href="#lieder/${k}" ${k === sel ? 'aria-current="page"' : ''}><b>${k}</b><small>${(DM.songs || []).filter(sg => sg.level === k).length} Lieder${(DM.songs || []).some(sg => sg.level === k && songIsNew(sg)) ? ' · <em class="dm-song-new">neu</em>' : ''}</small></a>`).join('')}</nav>
      <div class="dm-songs">${list.map(songCard).join('')}</div>
      <aside class="dm-card dm-song-how"><h2>So lernst du mit einem Lied</h2><ol class="dm-list"><li>Hör das Lied einmal nur zu. Worum geht es?</li><li>Lies die wichtigen Wörter und mach die Lückenaufgabe.</li><li>Hör noch einmal und lies den Text mit.</li><li>Sing mit – das trainiert Aussprache und Satzmelodie.</li><li>Lade das PDF herunter: Liedtext, Aufgaben und Lösungen.</li></ol></aside>
      `);
  }
  function songPage(id) {
    const all = DM.songs || [], i = all.findIndex(sg => sg.id === id);
    if (i < 0) return songsHub(SONG_LEVELS.includes(id) ? id : undefined);
    const sg = all[i], prev = all[i - 1], next = all[i + 1];
    const lyr = sg.lyrics.split('\n').map(l => { const m = l.match(/^\[(.+)\]$/); return m ? `<p class="dm-lyr-tag">${x(m[1].replace('Verse', 'Strophe').replace('Pre-Chorus', 'Vor-Refrain').replace('Chorus', 'Refrain').replace('Outro', 'Schluss').replace('Intro', 'Anfang'))}</p>` : l.trim() ? `<p>${x(l)}</p>` : ''; }).join('');
    const player = !sg.suno ? `<div class="dm-song-soon"><span aria-hidden="true">🎵</span><p><b>Die Aufnahme folgt in Kürze.</b> Den Text und die Aufgaben kannst du schon jetzt bearbeiten.</p></div>`
      : sunoConsent() ? `<div class="dm-suno"><iframe src="https://suno.com/embed/${x(sg.suno)}" title="${x(sg.title)}" loading="lazy" allow="autoplay; encrypted-media"></iframe></div><p class="dm-small"><a href="https://suno.com/song/${x(sg.suno)}" target="_blank" rel="noopener noreferrer">Bei Suno öffnen ↗</a></p>`
      : `<div class="dm-consent"><p><b>Das Lied wird von Suno geladen.</b> Beim Abspielen überträgt dein Browser Daten (zum Beispiel deine IP-Adresse) an Suno. Mehr in der <a href="#datenschutz">Datenschutzerklärung</a>.</p><div class="dm-row"><button type="button" class="dm-btn" id="dm-suno-ok">▶ Lied hier abspielen</button><a class="dm-btn dm-btn-quiet" href="https://suno.com/song/${x(sg.suno)}" target="_blank" rel="noopener noreferrer">Bei Suno öffnen ↗</a></div></div>`;
    const gap = sg.gap;
    page(`${crumbs([['Deutsch mit Liedern', '#lieder/' + sg.level], [sg.title]])}
      <div class="dm-head"><p class="dm-path-meta">Niveau ${sg.level} · ${x(sg.theme)}</p><h1>${x(sg.title)}</h1><p class="dm-lead">${x(sg.intro)}</p><p class="dm-small"><b>Grammatik:</b> ${x(sg.grammar)}</p></div>
      <div class="dm-practice">
        <section class="dm-card dm-song-player">${player}
          <h2>Liedtext</h2><details><summary>Text zum Mitlesen (erst nach der Lückenaufgabe öffnen)</summary><div class="dm-lyrics">${lyr}</div></details>
          <div class="dm-row"><a class="dm-btn dm-btn-quiet" href="material/lieder/${sg.id}.pdf" download>PDF: Text, Aufgaben, Lösungen</a></div>
        </section>
        <section class="dm-card">
          <h2>Wichtige Wörter</h2><dl class="dm-vocab">${sg.vocab.map(([w, d]) => `<dt>${x(w)}</dt><dd>${x(d)}</dd>`).join('')}</dl>
          ${gap ? `<h2>Lückentext</h2><p>${x(gap.instruction)}</p><form id="dm-gap" class="dm-gap">${gap.items.map((it, k) => `<p>${k + 1}. ${x(it).replace('___', `<input type="text" data-k="${k}" aria-label="Lücke ${k + 1}" autocomplete="off" spellcheck="false" data-nocheck>`)}</p>`).join('')}
            <div class="dm-row"><button class="dm-btn">Prüfen</button><button type="button" class="dm-btn dm-btn-quiet" id="dm-gap-show">Lösungen zeigen</button></div><p id="dm-gap-res" role="status"></p></form>` : ''}
        </section>
      </div>
      <div class="dm-row dm-next">${next ? `<a class="dm-btn" href="#lieder/${next.id}">Nächstes Lied: ${x(next.title)}</a>` : ''}${prev ? `<a class="dm-btn dm-btn-quiet" href="#lieder/${prev.id}">Vorheriges Lied</a>` : ''}<a class="dm-btn dm-btn-quiet" href="#lieder/${sg.level}">Alle Lieder ${sg.level}</a></div>`);
    $('#dm-suno-ok') && ($('#dm-suno-ok').onclick = () => { mem.sunoConsent = true; save(); songPage(id); });
    const f = $('#dm-gap');
    if (f && gap) {
      const norm = v => v.trim().toLowerCase().replace(/[.,!?]/g, '');
      f.onsubmit = e => { e.preventDefault(); let ok = 0; $$('input', f).forEach(inp => { const good = norm(inp.value) === norm(gap.solutions[inp.dataset.k] || ''); inp.classList.toggle('is-good', good); inp.classList.toggle('is-bad', !good && !!inp.value.trim()); if (good) ok++; });
        $('#dm-gap-res').textContent = `${ok} von ${gap.items.length} richtig.${ok === gap.items.length ? ' Super!' : ' Hör noch einmal genau hin.'}`; if (ok === gap.items.length) { mem.done['lied:' + sg.id] = Date.now(); save(); celebrate(f); } };
      $('#dm-gap-show').onclick = () => $$('input', f).forEach(inp => { inp.value = gap.solutions[inp.dataset.k] || ''; inp.classList.add('is-shown'); });
    }
  }


  /* ---------- Lieder-Playlist: alle Lieder am Stück (zusätzlich zu den Liedseiten) ----------
     Suno gibt die Audiodateien nicht frei, deshalb spielt die Playlist die Suno-Einbettung mit autoplay
     und wechselt nach der Länge des Lieds (Sekunden, von suno.com/song/<id>). Neue Lieder ohne Länge: 200 s. */
  const SONG_SEC = {"3f963aaf-ac2a-4d88-bf10-06cdcd9fb59c":213.96,"018564e0-c83d-43a7-a116-c8b317d71c5f":182.72,"0f07ffdb-0a97-4ece-aa73-2c75dd32df2e":208.8,"0f889433-a74b-4cd6-88a1-a9da11d0de29":182.36,"1946ba08-31af-4d8e-abc5-201fd9fc48d2":186,"1aa82f83-35c2-4bcd-8f22-fb3f2b776ee0":177.2,"1aedc905-0a38-4d92-b06f-c1c020ad656f":168.44,"1c673ea8-5bca-4174-94e2-79b77a8987c1":131.1,"229490ca-7263-4a9d-a051-1ac6c514d775":204.44,"24cb7e9e-ba11-4dd1-8bf8-90b9e273f31f":164.4,"293f8eb2-e7e9-4b61-a91e-9b947a309743":207.16,"2f5f7692-f67a-4a0a-bef1-219e4e5191ef":122.4,"39346fc5-7cbb-448c-80e8-d6ba300fbf91":139.6,"39bbc327-f3fb-420d-a1f5-dc241fe946bd":194.5,"3c8c1d2b-830b-476e-a8db-80b9ab4af632":192.16,"3dd7269b-2bcd-410c-846e-a0f1da483ff5":222.84,"447c5516-e1c7-4cd5-8862-a8ca98f2b443":193.16,"4b7dd70f-7896-4953-a910-821437e1f6d7":90.6,"4f76df7f-b281-422d-b745-7e66c3b13c47":213.2,"50d78103-1bce-4995-9efb-41f17aa49674":163.16,"5a31ebb4-d8c5-4698-ade6-a374b3aa67a7":156.3,"5e0e1288-61e6-4c9d-bda3-3dfa96adfa36":201.2,"628f6d58-8504-459c-81c9-75510edc139c":151.28,"64f12bae-7c1d-4803-9b88-b715b163025d":168.4,"6c9d3ac3-84f9-4b25-988d-85ff256835f8":186.8,"7886b066-3b92-45da-a619-5dfd5efdb970":218.36,"794b6a6b-8b28-4223-b2a0-04b302fbe879":161.2,"869ec488-cc69-41dd-b5bf-41113a5687d7":212.8,"8d74b826-5bfd-440e-933b-976eec4dd73c":192.5,"8dd8c503-044e-4b08-9c83-d742288997e3":175.16,"8e461d53-a562-4696-8ed4-dcf271947b39":219.6,"935183d3-2d09-40ab-a86f-ecea73ea8f3c":177.6,"94b001e6-4ae1-41f2-a548-29fb787956cc":206.4,"967c84df-bfdc-455a-87db-c0676a2eaaa2":128.8,"99e30532-15e0-4f58-8144-fdba6c74f7a7":159.88,"9e3baa40-62d9-4b26-abd8-660b39d8ab83":201.8,"9f4bec0d-f888-4521-b306-049f3c77e96a":222.16,"a29b858c-53db-4642-8e0e-e4106da6fa98":154.64,"a7313861-3b9c-4bff-bec1-5162bce1fb3b":130.8,"ae3f2989-09b4-4168-87f5-8a90bebc2ecd":186.5,"af9c2420-6465-4fff-9afc-af5d8f413b0d":176.24,"b9010843-4f7c-451e-b9d7-34936d5a47d9":199.2,"bb891ec8-c67c-467a-ac03-f2dd19a5e58c":217.6,"bbd6bf59-6380-477f-ab90-64d6079e5d5e":212.44,"bef4dfe6-ff4b-438c-a9b5-af5ffef8d661":208.76,"c00763c1-034d-4f3f-85cc-f9518b66156b":242.56,"c05bebb0-328c-407b-b09b-a1bf387246b3":217.68,"c707abbf-7fc5-4b43-ae6f-4969d31d8fe0":212.2,"d3e270a5-1fa6-4e88-b01e-060542104ec6":157.2,"e4f74ce2-820a-4249-91ea-8de3a2a578cc":206.0,"f7bbd7d0-beeb-45d7-bea2-67a19e458265":219.6};
  const mmss = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  let plTimer = null;
  function songPlaylist(sel) {
    clearInterval(plTimer); plTimer = null;
    const filt = ['alle', ...SONG_LEVELS].includes(sel) ? sel : (mem.plLevel || 'alle');
    mem.plLevel = filt; save();
    const base = (DM.songs || []).filter(sg => sg.suno && (filt === 'alle' || sg.level === filt));
    let order = base.map((_, i) => i);
    if (mem.plShuffle) for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const list = order.map(i => base[i]);
    const total = list.reduce((a, sg) => a + (SONG_SEC[sg.suno] || 200), 0);
    let cur = -1, left = 0, endAt = 0, paused = false, loading = false, tapped = false;
    // Zurück im Tab: sofort prüfen, ob das nächste Lied dran ist
    const onVis = () => { if (!document.body.contains(now)) return document.removeEventListener('visibilitychange', onVis); if (!document.hidden && cur >= 0 && !paused && !loading && endAt && Date.now() >= endAt) play(cur + 1); };
    document.addEventListener('visibilitychange', onVis);
    page(`${crumbs([['Deutsch mit Liedern', '#lieder'], ['Playlist']])}
      <div class="dm-head"><p class="dm-path-meta">Deutsch mit Liedern · ${list.length} Lieder · ca. ${Math.round(total / 60)} Minuten</p><h1>Playlist: alle Lieder am Stück</h1>
        <p class="dm-lead">Starte einmal – danach läuft ein Lied nach dem anderen. Zum Lernen mit Text und Aufgaben öffnest du ein Lied über „Text &amp; Aufgaben“.</p></div>
      <nav class="dm-tabs" aria-label="Niveau">${['alle', ...SONG_LEVELS].map(k => `<a href="#lieder/playlist/${k}" ${k === filt ? 'aria-current="page"' : ''}><b>${k === 'alle' ? 'Alle' : k}</b><small>${(DM.songs || []).filter(sg => sg.suno && (k === 'alle' || sg.level === k)).length} Lieder</small></a>`).join('')}</nav>
      <div class="dm-pl">
        <section class="dm-card dm-pl-player" aria-labelledby="pl-now">
          <div id="dm-pl-stage">${sunoConsent() ? `<div class="dm-pl-start"><button type="button" class="dm-btn dm-btn-sun" id="dm-pl-go">▶ Playlist starten</button></div>`
            : `<div class="dm-consent"><p><b>Die Lieder werden von Suno geladen.</b> Beim Abspielen überträgt dein Browser Daten (zum Beispiel deine IP-Adresse) an Suno. Mehr in der <a href="#datenschutz">Datenschutzerklärung</a>.</p><div class="dm-row"><button type="button" class="dm-btn" id="dm-pl-go">▶ Einverstanden – Playlist starten</button></div></div>`}</div>
          <p class="dm-pl-now" id="pl-now" aria-live="polite"></p>
          <div class="dm-row dm-pl-ctrl">
            <button type="button" class="dm-btn dm-btn-quiet" id="dm-pl-prev" aria-label="Vorheriges Lied">⏮ Zurück</button>
            <button type="button" class="dm-btn dm-btn-quiet" id="dm-pl-pause" aria-pressed="false">⏸ Automatisch weiter: an</button>
            <button type="button" class="dm-btn dm-btn-quiet" id="dm-pl-next" aria-label="Nächstes Lied">Weiter ⏭</button>
            <label class="dm-pl-shuffle"><input type="checkbox" id="dm-pl-shuffle" ${mem.plShuffle ? 'checked' : ''}> Zufällige Reihenfolge</label>
          </div>
          <p class="dm-small">Hältst du ein Lied im Player an, tippe auch hier auf „Automatisch weiter“, damit die Playlist wartet. Auf manchen Handys musst du jedes Lied einmal selbst starten.</p>
        </section>
        <ol class="dm-pl-list" id="dm-pl-list">${list.map((sg, k) => `<li class="dm-lv-${sg.level.toLowerCase()}" data-k="${k}"><button type="button" class="dm-pl-item" data-k="${k}"><span class="dm-song-disc" aria-hidden="true"><i></i></span><span class="dm-pl-t"><span class="dm-pl-badge" aria-hidden="true"><i></i><i></i><i></i> Läuft gerade</span><b>${x(sg.title)}</b><small>${sg.level} · ${x(sg.theme)}</small></span><span class="dm-pl-len">${mmss(SONG_SEC[sg.suno] || 200)}</span></button><a class="dm-pl-open" href="#lieder/${sg.id}">Text &amp; Aufgaben</a></li>`).join('')}</ol>
      </div>
      <div class="dm-row dm-next"><a class="dm-btn dm-btn-quiet" href="#lieder">Zurück zu allen Liedern</a></div>`);
    const now = $('#pl-now'), btnP = $('#dm-pl-pause');
    const show = () => {
      if (cur < 0) return;
      const sg = list[cur];
      now.innerHTML = `<b>${cur + 1}/${list.length}: ${x(sg.title)}</b> <span>(${sg.level})</span>${paused ? ' · angehalten' : loading ? ' · wird geladen …' : ` · nächstes Lied in ${mmss(Math.max(0, left))}`}`;
    };
    const play = k => {
      if (!list.length) return;
      cur = (k + list.length) % list.length;
      const sg = list[cur];
      const len = (SONG_SEC[sg.suno] || 200) + 2;
      left = len; endAt = 0; loading = true; tapped = false;   // Countdown startet erst, wenn der Player geladen ist
      paused = false; btnP.textContent = '⏸ Automatisch weiter: an'; btnP.setAttribute('aria-pressed', 'false');
      $('#dm-pl-stage').innerHTML = `<div class="dm-suno"><iframe src="https://suno.com/embed/${x(sg.suno)}?autoplay=1" title="${x(sg.title)}" allow="autoplay; encrypted-media"></iframe></div>`;
      const fr = $('#dm-pl-stage iframe');
      // Uhrzeit-basiert: bleibt genau, auch wenn der Browser Timer im Hintergrund-Tab bremst
      let loadedAt = 0;
      fr.onload = () => { if (loadedAt) return; loadedAt = Date.now(); loading = false; endAt = loadedAt + len * 1000; show(); };   // nur das erste Laden zählt
      setTimeout(() => { if (fr.isConnected && loading) { loadedAt = Date.now(); loading = false; endAt = loadedAt + len * 1000; show(); } }, 15000);
      $$('#dm-pl-list li').forEach(li => { const on = +li.dataset.k === cur; li.classList.toggle('is-now', on); li.querySelector('.dm-pl-item').setAttribute('aria-current', on ? 'true' : 'false'); });
      $(`#dm-pl-list li[data-k="${cur}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      show();
      clearInterval(plTimer);
      plTimer = setInterval(() => {
        if (!document.body.contains(now)) { clearInterval(plTimer); plTimer = null; return; }
        // Tippt jemand im Player auf ▶ (z. B. auf dem Handy, wenn Autoplay blockiert ist), beginnt das Lied erst jetzt
        // Nur in den ersten 30 s: Autoplay war blockiert und jemand startet das Lied selbst. Spätere Klicks (Pause, Spulen) ändern nichts.
        if (!tapped && document.activeElement === fr) { tapped = true; if (loadedAt && Date.now() - loadedAt < 30000) endAt = Date.now() + len * 1000; }
        if (paused) { endAt += 1000; return; }
        if (loading) return;
        left = Math.ceil((endAt - Date.now()) / 1000); show();
        if (left <= 0) play(cur + 1);
      }, 1000);
    };
    $('#dm-pl-go').onclick = () => { mem.sunoConsent = true; save(); play(Math.max(0, cur)); };
    $('#dm-pl-next').onclick = () => { if (sunoConsent()) play(cur + 1); };
    $('#dm-pl-prev').onclick = () => { if (sunoConsent()) play(cur - 1); };
    btnP.onclick = () => { if (cur < 0) return; paused = !paused; btnP.textContent = paused ? '▶ Automatisch weiter: aus' : '⏸ Automatisch weiter: an'; btnP.setAttribute('aria-pressed', String(paused)); show(); };
    $$('.dm-pl-item').forEach(b => b.onclick = () => { mem.sunoConsent = true; save(); play(+b.dataset.k); });
    $('#dm-pl-shuffle').onchange = e => { mem.plShuffle = e.target.checked; save(); songPlaylist(filt); };
  }

  /* ---------- Kahoot (wird täglich mit dem Kahoot-Profil synchronisiert) ---------- */
  let kahootPromise;
  const loadKahoots = () => kahootPromise ||= fetch('kahoot-feed.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()).then(d => d.kahoots || []).catch(() => [])
    .then(feed => feed.length ? feed : (typeof kahootQuizzes !== 'undefined' ? kahootQuizzes.map(q => ({ title: q.title, url: q.url, qr: `material/kahoot/kahoot-${q.n}.png` })) : []));
  async function kahootPage() {
    page(`${crumbs([['Üben', '#ueben'], ['Kahoot-Quiz']])}
      <div class="dm-head dm-head-art"><div><h1>Kahoot-Quiz</h1><p class="dm-lead">Spiel allein oder im Kurs: Öffne ein Quiz oder scanne den QR-Code mit dem Handy. Neue Quiz von meinem Kahoot-Profil erscheinen hier automatisch.</p></div><span class="dm-head-emoji" aria-hidden="true">🎲</span></div>
      <div class="dm-kgrid" id="dm-kgrid" aria-busy="true"><p class="dm-hint">Quiz werden geladen …</p></div>
      <div class="dm-row"><a class="dm-btn dm-btn-quiet" href="https://create.kahoot.it/profiles/28070f1f-b266-41cd-a90f-0e8f04c31f07" target="_blank" rel="noopener noreferrer">Mein Kahoot-Profil ↗</a><a class="dm-btn dm-btn-quiet" href="material/kahoot/alle-kahoot-qr-codes.pdf" download>QR-Codes als PDF</a></div>
      <p class="dm-small">Für eine gemeinsame Runde startet die Lehrkraft das Spiel bei Kahoot und teilt die Spiel-PIN. Kahoot ist ein Angebot der Kahoot! ASA; beim Öffnen gelten deren Datenschutzbestimmungen.</p>`);
    const list = await loadKahoots(), box = $('#dm-kgrid'); if (!box) return;
    box.removeAttribute('aria-busy');
    const week = Date.now() - 14 * 864e5;
    box.innerHTML = list.map((k, i) => `<article class="dm-kcard dm-c${i % 5}">
      <a class="dm-kcover" href="${x(k.url)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">${k.cover ? `<img src="${x(k.cover)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<span>${x(k.title.slice(0, 1))}</span></a>
      <div class="dm-kbody">${i === 0 && k.created && Date.parse(k.created) > week ? '<span class="dm-new">Neu</span>' : ''}<h2>${x(k.title.replace(/_/g, ' '))}</h2>
      ${k.description ? `<p>${x(k.description)}</p>` : ''}${k.questions ? `<p class="dm-small">${k.questions} Fragen</p>` : ''}
      <div class="dm-row"><a class="dm-btn" href="${x(k.url)}" target="_blank" rel="noopener noreferrer">Quiz öffnen ↗</a></div></div>
      ${k.qr ? `<img class="dm-kqr" src="${x(k.qr)}" alt="QR-Code: ${x(k.title)}" width="120" height="120" loading="lazy">` : ''}
    </article>`).join('') || '<p class="dm-empty">Gerade sind keine Quiz verfügbar.</p>';
    revealCards();
  }

  /* ---------- Prüfung ---------- */
  function exam(tab) {
    const card = (url, part, title, desc) => `<a class="dm-exam" href="${url}"><span class="dm-tag">${part}</span><b>${title}</b><span>${desc}</span></a>`;
    const hs = (id, fb) => listenSet(id) ? '#hoeren/' + id : '#hoeren/' + fb;
    const simCards = (id, w, m) => card(`#simulation/${id}/schriftlich`, 'Probeprüfung', 'Schriftlich mit Uhr', w) + card(`#simulation/${id}/muendlich`, 'Probeprüfung', 'Mündlich mit Uhr', m);
    const T = {
      dtz: { label: 'DTZ', h: 'DTZ – Deutsch-Test für Zuwanderer', p: 'g.a.s.t. · A2–B1 · am Ende des Integrationskurses', path: 'dtz', color: 'sun',
        cards: () => simCards('dtz', 'Hören, Lesen, Schreiben · 100 Min.', 'Drei Sprechteile · 16 Min.') +
          card('#training/dtz-vorstellen', 'Sprechen 1', 'Sich vorstellen', 'Steckbrief und Nachfragen') +
          card('#training/dtz-bild', 'Sprechen 2', 'Bild beschreiben', 'Beschreiben und erzählen') +
          card('#bild', 'Sprechen 2 · Trainer', 'Bild-Trainer', '4 Bilder Schritt für Schritt – mit Musterbeschreibung') +
          card('#training/dtz-sprechen', 'Sprechen 3', 'Gemeinsam planen', 'Vorschlagen und einigen') +
          card('#training/dtz-schreiben', 'Schreiben', 'Einen Brief schreiben', 'Vier Leitpunkte, mit Muster') +
          card('#lesen/alltag', 'Lesen', 'Mitteilungen verstehen', `${(readSets()[0] || { items: [] }).items.length} Lesetexte mit Fragen`) +
          card('#hoeren/dtz-1', 'Hören', 'DTZ-Hörtraining', 'Übungssätze mit allen vier Teilen') },
      lid: { label: 'Leben in D.', h: 'Test „Leben in Deutschland“', p: 'Orientierungskurs und Einbürgerung · 33 Fragen in 60 Minuten', path: 'lid', color: 'mint',
        cards: () => card('#simulation/lid', 'Probeprüfung', 'Test mit Uhr', '33 Fragen · 60 Min. · mit Auswertung') +
          card('#lid', 'Lernen', 'LiD-Trainer: alle 310 Fragen', 'Block für Block lernen, Fehler wiederholen') +
          card('#orientierungskurs', 'Verstehen', 'Deutschland verstehen', 'Demokratie, Geschichte, Zusammenleben – mit Missionen') +
          card('#spiele/lid', 'Lernspiele', 'LiD-Spiele', 'Zeitstrahl, Wer macht was im Staat?') +
          card('#videos/orientierung', 'Videos', 'LiD einfach erklärt', 'Wahlen, Grundrechte, Bundestag') },
      telcb1: { label: 'telc B1', h: 'telc Deutsch B1 (Zertifikat Deutsch)', p: 'B1 allgemein · zum Beispiel für Einbürgerung, Ausbildung oder Arbeit', path: 'telcb1', color: 'sky',
        cards: () => simCards('telc-b1', 'Lesen, Sprachbausteine, Hören, Brief · 150 Min.', 'Paarprüfung · 15 Min. + 20 Min. Vorbereitung') +
          card('#vorbereitung/telc-b1', 'Vorbereitung', 'Aufbau und Strategien', 'Jeder Teil mit Fallen, Mini-Übung und Lernplan') +
          card('#lesen/alltag', 'Lesen', 'Lesen üben', 'Anzeigen, Mitteilungen, Artikel') +
          card(hs('telcb1-1', 'alltag'), 'Hören', 'Hören üben', 'Radio, Interview, Durchsagen') +
          card('#ueben/schreiben/B1/2', 'Schreiben', 'Einen Brief schreiben', 'Leitpunkte bearbeiten, mit Mustertext') +
          card('#ueben/sprechen/B1/0', 'Sprechen', 'Gemeinsam etwas planen', 'Vorschläge machen und sich einigen') },
      telcb2: { label: 'telc B2', h: 'telc Deutsch B2', p: 'B2 allgemein · zum Beispiel für Arbeit, Anerkennung oder Studium', path: 'telcb2', color: 'sky',
        cards: () => simCards('telc-b2', 'Lesen, Sprachbausteine, Hören, E-Mail · 140 Min.', 'Paarprüfung · 15 Min. + 20 Min. Vorbereitung') +
          card('#vorbereitung/telc-b2', 'Vorbereitung', 'Aufbau und Strategien', 'Jeder Teil mit Fallen, Mini-Übung und Lernplan') +
          card('#lesen/beruf', 'Lesen', 'Lesen auf B2', 'Längere Texte, Regelungen, Artikel') +
          card('#ueben/schreiben/B2/2', 'Schreiben', 'Formelle E-Mail', 'Bitte um Information oder Beschwerde') +
          card('#ueben/schreiben/B2/3', 'Schreiben', 'Meinung vertreten', 'Argumente sammeln und gewichten') +
          card('#spiele/b2', 'Lernspiele', 'Wortschatz und Grammatik B2', 'Nomen-Verb, Präpositionen, Konnektoren') },
      dtbb1: { label: 'DTB B1', h: 'DTB B1 – Deutsch-Test für den Beruf', p: 'Berufssprachkurs B1 · Deutsch im Berufsalltag', path: 'dtbb1', color: 'ink',
        cards: () => simCards('dtb-b1', 'Lesen, Hören, Schreiben · 95 Min.', 'Drei Sprechteile · 16 Min.') +
          card('#vorbereitung/dtb-b1', 'Vorbereitung', 'Aufbau und Strategien', 'Jeder Teil mit Fallen, Mini-Übung und Lernplan') +
          card('#lesen/beruf', 'Lesen', 'Lesen im Beruf', 'Regelungen, E-Mails, Anzeigen') +
          card(hs('dtbb1-1', 'beruf'), 'Hören', 'Hören im Beruf', 'Mailbox, Durchsagen, Gespräche im Team') +
          card('#lektion/arbeit/3', 'Sprechen', 'Über die eigene Arbeit sprechen', 'Dialog lesen, eigene Erfahrungen ergänzen') },
      dtbb2: { label: 'DTB B2', h: 'DTB B2 – Deutsch-Test für den Beruf', p: 'Berufssprachkurs B2 · Vorbereitung und Wiederholung', path: 'dtbb2', color: 'ink',
        cards: () => simCards('dtb-b2', 'Lesen, Hören, Schreiben · 125 Min.', 'Drei Sprechteile · 16 Min.') +
          card('#vorbereitung/dtb-b2', 'Vorbereitung', 'Aufbau und Strategien', 'Jeder Teil mit Fallen, Mini-Übung und Lernplan') +
          card('#training/dtb-thema', 'Sprechen 1', 'Über ein Thema sprechen', 'Strukturieren und Beispiele geben') +
          card('#training/dtb-kollegen', 'Sprechen 2', 'Mit Kollegen sprechen', 'Eingehen und nachfragen') +
          card('#training/dtb-sprechen', 'Sprechen 3', 'Lösungen diskutieren', 'Abwägen und vereinbaren') +
          card('#training/dtb-schreiben', 'Schreiben', 'Kundenantwort', 'Mit internen Informationen') +
          card('#lesen/beruf', 'Lesen', 'Regelungen und E-Mails', `${(readSets()[1] || { items: [] }).items.length} Lesetexte mit Fragen`) +
          card('#hoeren/b2-1', 'Hören', 'DTB-B2-Hörtraining', 'Mailbox, Besprechung, Kundengespräch, Radio') +
          card('#spiele/b2', 'Lernspiele', 'Wortschatz und Grammatik B2', 'Nomen-Verb, Präpositionen, Konnektoren') }
    };
    if (!T[tab]) tab = T[mem.examTab] ? mem.examTab : 'dtz';
    if (mem.examTab !== tab) { mem.examTab = tab; save(); }
    const t = T[tab], P = DM.paths[t.path];
    page(`${crumbs([['Prüfungstraining']])}
      <div class="dm-head"><h1>Prüfungstraining</h1><p class="dm-lead">Wähle deine Prüfung: Probeprüfung mit echter Zeit, gezieltes Training und dein Lernweg.</p></div>
      <div class="sp-filter-wrap"><nav class="sp-tabs dm-examtabs" aria-label="Prüfung wählen">${Object.entries(T).map(([k, v]) => `<a href="#pruefung/${k}"${k === tab ? ' aria-current="page"' : ''}>${x(v.label)}</a>`).join('')}</nav></div>
      <section class="dm-exam-block dm-g-${t.color}" aria-labelledby="ex-h">
        <div class="dm-exam-head"><h2 id="ex-h">${x(t.h)}</h2><p>${x(t.p)}</p>${P ? `<a href="#lernweg/${t.path}">Lernweg „${x(P.title)}“ öffnen</a>` : ''}</div>
        <div class="dm-examgrid">${t.cards()}</div>
      </section>
      <p class="dm-center"><a class="dm-btn dm-btn-quiet" href="#simulation">Alle 6 Probeprüfungen im Überblick</a></p>
      <section class="dm-card dm-official"><h2>Offizielle Informationen und Modelltests</h2><p>Prüfungsaufbau, Bewertung und offizielle Übungssätze findest du bei den Prüfungsanbietern. Die Links haben wir für dich gesammelt.</p><a class="dm-btn dm-btn-quiet" href="#quellen">Prüfungsinfos und Quellen</a></section>
      ${materialLinks('pruefung', 'Arbeitsblätter zur Prüfung')}
      <div id="dm-exam-videos"></div>`);
    const tabs = $('.dm-examtabs'), wrap = tabs && tabs.parentElement;
    if (tabs) {
      const upd = () => wrap.classList.toggle('is-end', tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 4);
      tabs.addEventListener('scroll', upd, { passive: true });
      const cur = tabs.querySelector('[aria-current]'); if (cur && cur.offsetLeft + cur.offsetWidth > tabs.clientWidth) tabs.scrollLeft = cur.offsetLeft - 16;
      upd();
    }
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
          <div class="dm-row"><a class="dm-btn dm-btn-quiet" href="${T.youtube}?sub_confirmation=1" target="_blank" rel="noopener noreferrer">Kanal abonnieren ↗</a><a class="dm-btn dm-btn-quiet" href="${T.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a class="dm-btn dm-btn-quiet" href="${T.tiktok}" target="_blank" rel="noopener noreferrer">TikTok ↗</a></div></div>
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
  const teachYears = () => { const d = new Date(), y = d.getFullYear() - 2017 - (d.getMonth() < 9 ? 1 : 0); return y; };
  function about() {
    const C = DM.credentials || [];
    page(`${crumbs([['Über mich']])}
      <section class="dm-about">
        <figure class="dm-about-photo"><img src="assets/dennis.webp" alt="Dennis, Deutschlehrer" width="626" height="1004"><figcaption class="dm-badge-stack"><span>✓ DTZ-Prüfer</span><span>✓ telc-Prüfer</span><span>✓ BAMF-zugelassen</span></figcaption></figure>
        <div class="dm-about-text">
          <h1>Hallo, ich bin Dennis.</h1>
          <p class="dm-lead">Seit Oktober 2017 bringe ich Menschen Deutsch bei – vom ersten Satz bis zur Hochschulprüfung. Und ich bin zugelassener Prüfer.</p>
          <p>In ${teachYears()} Jahren Unterricht habe ich <b>Deutsch als Fremdsprache von A1 bis B2</b> unterrichtet, <b>Integrationskurse</b> geleitet und Lernende auf die <b>DSH</b> und den <b>TestDaF</b> vorbereitet – also auf die Sprachprüfungen für das Studium in Deutschland.</p>
          <p>Ich habe einen Master in Germanistik. Ich bin <b>lizenzierter Prüfer für den DTZ</b> (Deutsch-Test für Zuwanderer), <b>telc-Prüfer für Deutsch B1–B2</b> und <b>Prüfender für den Deutsch-Test für den Beruf B2–C1</b>. Das Bundesamt für Migration und Flüchtlinge (BAMF) hat mich als <b>Lehrkraft für Integrationskurse</b> und für <b>Berufssprachkurse bis zum Niveau C2</b> zugelassen.</p>
          <p>Ich kenne die Prüfungen also von beiden Seiten: aus dem Unterricht und als Prüfer. Deshalb weiß ich genau, worauf es ankommt – und wo die größten Stolpersteine liegen.</p>
          <p>Auf dieser Seite findest du, was sich in meinem Unterricht bewährt hat: Lektionen, Übungen zum Sprechen und Schreiben, Prüfungstraining und meine Erklärvideos. Alle Übungen sind kostenlos und ohne Anmeldung.</p>
          <ul class="dm-facts">
            <li><b>seit 2017</b><span>im Unterricht</span></li>
            <li><b>DTZ</b><span>Prüferlizenz g.a.s.t.</span></li>
            <li><b>B1–B2</b><span>telc-Prüferlizenz</span></li>
            <li><b>B2–C1</b><span>DTB-Prüfendenlizenz</span></li>
            <li><b>bis C2</b><span>BAMF-Zulassung als Lehrkraft</span></li>
          </ul>
          <h2>Meine Erfahrung im Unterricht</h2>
          <ul class="dm-exp">
            <li><b>DaF A1–B2</b><span>Deutsch als Fremdsprache für Erwachsene – Grammatik, Wortschatz, Sprechen</span></li>
            <li><b>Integrationskurse</b><span>Alltag, Beruf, Behörden – und die Vorbereitung auf den DTZ</span></li>
            <li><b>DSH und TestDaF</b><span>Akademisches Deutsch: Lesen, Hören, Schreiben für das Studium</span></li>
          </ul>
          <h2>So unterrichte ich</h2>
          <ul class="dm-list">
            <li>Grammatik erkläre ich auf Deutsch – einfach und mit vielen Beispielen.</li>
            <li>Wir üben echte Situationen: beim Arzt, mit dem Vermieter, im Job.</li>
            <li>Sprechen kommt zuerst. Fehler gehören zum Lernen.</li>
          </ul>
          ${note('Du hast eine Frage oder einen Wunsch für ein neues Thema? Schreib mir!', true)}
          <div class="dm-row"><a class="dm-btn" href="mailto:${T.email}">E-Mail schreiben</a><a class="dm-btn dm-btn-quiet" href="${T.youtube}" target="_blank" rel="noopener noreferrer">YouTube-Kanal ↗</a><a class="dm-btn dm-btn-quiet" href="${T.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a class="dm-btn dm-btn-quiet" href="${T.tiktok}" target="_blank" rel="noopener noreferrer">TikTok ↗</a></div>
          <p class="dm-small">Oder schreib mir unter <a href="#pinnwand">„Deine Meinung“</a> einen Zettel.</p>
        </div>
      </section>
      <section class="dm-section dm-wall" id="nachweise" aria-labelledby="wall-h">
        <div class="dm-section-head"><h2 id="wall-h">Meine Zulassungen und Nachweise</h2><p>Klicke auf ein Dokument, um es groß zu sehen. Persönliche Daten sind geschwärzt.</p></div>
        <div class="dm-wall-grid">${C.map((c, i) => `<button type="button" class="dm-cert dm-c${i % 5}" data-cert="${i}">
          <span class="dm-cert-pin" aria-hidden="true"></span>
          <span class="dm-cert-frame"><img src="assets/nachweise/${c.id}-klein.webp" alt="${x(c.kind)}: ${x(c.title)}" loading="lazy" width="420" height="560"></span>
          <span class="dm-cert-label"><span class="dm-tag">${c.icon} ${x(c.kind)}</span><b>${x(c.title)}</b><small>${x(c.org)}</small></span></button>`).join('')}</div>
        <dialog class="dm-lightbox" id="dm-lightbox"><form method="dialog"><button class="dm-lb-close" aria-label="Schließen">×</button></form><figure><img alt="" id="dm-lb-img"><figcaption id="dm-lb-cap"></figcaption></figure><div class="dm-row"><button type="button" class="dm-btn dm-btn-quiet" id="dm-lb-prev">← Zurück</button><button type="button" class="dm-btn dm-btn-quiet" id="dm-lb-next">Weiter →</button></div></dialog>
      </section>
      ${musicCard()}
      <section class="dm-section dm-thanks"><div><h2>Spendier mir einen Kaffee ☕</h2><p>Alle Übungen auf dieser Seite bleiben kostenlos. Wenn sie dir geholfen haben, freue ich mich über einen Kaffee – ganz freiwillig, per PayPal.</p></div><a class="dm-btn dm-btn-sun" href="${T.donate}" target="_blank" rel="noopener noreferrer">☕ Kaffee spendieren</a></section>`);
    const lb = $('#dm-lightbox'); let cur = 0;
    const show = i => { cur = (i + C.length) % C.length; const c = C[cur]; $('#dm-lb-img').src = `assets/nachweise/${c.id}.webp`; $('#dm-lb-img').alt = `${c.kind}: ${c.title}`; $('#dm-lb-cap').innerHTML = `<b>${x(c.title)}</b> · ${x(c.org)}<br><span>${x(c.desc)}</span>`; };
    $$('[data-cert]').forEach(b => b.onclick = () => { show(Number(b.dataset.cert)); lb.showModal ? lb.showModal() : lb.setAttribute('open', ''); });
    $('#dm-lb-prev').onclick = () => show(cur - 1); $('#dm-lb-next').onclick = () => show(cur + 1);
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  }
  /* Empfehlung: Musikkanal zum konzentrierten Lernen */
  const MUSIC_PICKS = [
    ['9HdVzoCe3r0', 'Peaceful Winter Solitude', 'Ruhiges Orchester · 1:31 Std.'],
    ['PzKUZsS9Xp8', 'Timeless Elegance', 'Klavier und Streicher · 2 Std.'],
    ['UWai9rpPr6U', 'Entspannte Handpan-Musik', 'Handpan · 1:24 Std.']
  ];
  const musicCard = () => `<section class="dm-section dm-music" aria-labelledby="music-h">
      <div class="dm-music-art" aria-hidden="true"><span>♪</span><span>♫</span><span>♪</span><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div><p class="dm-path-meta">Tipp von Dennis</p><h2 id="music-h">Mit Musik fokussiert Deutsch lernen</h2>
      <p>Ruhige Musik ohne Gesang hilft vielen beim Konzentrieren – beim Vokabellernen, Schreiben oder Wiederholen. Diese Stücke habe ich selbst gemacht, alle sind rein instrumental:</p>
      <ul class="dm-music-list">${MUSIC_PICKS.map(([id, t, d]) => `<li><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer"><b>▶ ${x(t)}</b><small>${x(d)} · ohne Gesang</small></a></li>`).join('')}</ul>
      <ul class="dm-music-list" data-music-feed="3"></ul>
      <p class="dm-music-more"><a class="dm-btn" href="#musik">Alle Musikstücke ansehen</a></p></div></section>`;
  /* Hintergrundmusik vom zweiten Musikkanal – nur instrumentale Stücke mit deutschem Titel (music-feed.json, täglich aktualisiert) */
  let musicPromise;
  const loadMusic = () => musicPromise ||= fetch('music-feed.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()).then(d => (d.videos || []).filter(v => v.instrumental && v.de && /^[\w-]{11}$/.test(v.id))).catch(() => []);
  const fmtLen = l => { if (!l) return ''; const p = l.split(':').map(Number); const sec = p.reduce((a, n) => a * 60 + n, 0); return sec >= 3600 ? `${Math.floor(sec / 3600)}:${String(Math.floor(sec % 3600 / 60)).padStart(2, '0')} Std.` : `${Math.round(sec / 60)} Min.`; };
  const musicItem = v => `<li><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" lang="de"><b>▶ ${x(v.de)}</b><small>${v.len ? fmtLen(v.len) + ' · ' : ''}ohne Gesang</small></a></li>`;
  function fillMusic(root = document) {
    const boxes = $$('[data-music-feed]', root); if (!boxes.length) return;
    loadMusic().then(list => boxes.forEach(ul => { const n = +ul.dataset.musicFeed || list.length; ul.innerHTML = list.slice(0, n).map(musicItem).join(''); ul.hidden = !list.length; }));
  }
  function musicPage() {
    page(`${crumbs([['Musik zum Lernen']])}
      <div class="dm-head"><h1>Musik zum Lernen</h1><p class="dm-lead">Ruhige Musik ohne Gesang hilft vielen beim Konzentrieren – beim Vokabellernen, Schreiben oder Wiederholen. Alle Stücke hat Dennis selbst gemacht. Sie öffnen sich auf YouTube.</p></div>
      <section class="dm-section dm-music dm-music-page">
        <div class="dm-music-art" aria-hidden="true"><span>♪</span><span>♫</span><span>♪</span><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div><h2>Entspannt und fokussiert</h2>
        <ul class="dm-music-list">${MUSIC_PICKS.map(([id, t, d]) => `<li><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer"><b>▶ ${x(t)}</b><small>${x(d)} · ohne Gesang</small></a></li>`).join('')}</ul>
        <h2>Slawische Klänge – Gusli, Hirtenflöte und Natur</h2>
        <p>Lange Stücke als ruhiger Hintergrund. Neue Stücke ohne Gesang erscheinen hier automatisch, mit deutschem Titel.</p>
        <ul class="dm-music-list" data-music-feed="0"><li><small>Wird geladen …</small></li></ul></div>
      </section>`);
    fillMusic(mainEl);
  }
  function impressum() {
    page(`${crumbs([['Impressum']])}
      <article class="dm-legal"><h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>${T.address.map(x).join('<br>')}</p>
      <h2>Kontakt</h2>
      <p>Telefon: <a href="tel:${T.phone.replace(/\s/g, '')}">${T.phone}</a><br>E-Mail: <a href="mailto:${T.email}">${T.email}</a></p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>${T.address.map(x).join('<br>')}</p>
      <h2>Hinweis</h2>
      <p>„Deutsch mit Dennis“ ist ein unabhängiges Lernangebot. Die Website ist kostenlos; einzelne Lernpakete sind kostenpflichtig. Es ist kein Angebot der g.a.s.t., der telc gGmbH oder des Bundesamts für Migration und Flüchtlinge (BAMF). Die Website wird nicht vom BAMF unterstützt und nicht im Auftrag des BAMF oder der Bundesrepublik Deutschland betrieben. Die Übungen sind eigene Materialien und keine offiziellen Prüfungsaufgaben. Ausnahme: Die Fragen zum Test „Leben in Deutschland“ stammen aus dem Gesamtfragenkatalog des BAMF (<a href="#quellen">Quellenangabe</a>).</p>
      <h2>Verkauf der Lernpakete</h2>
      <p>Die kostenpflichtigen Lernpakete werden über die Digistore24 GmbH, St.-Godehard-Straße 32, 31139 Hildesheim, verkauft. Digistore24 ist Verkäufer und Vertragspartner; es gelten deren <a href="https://www.digistore24.com/page/terms/1/de" target="_blank" rel="noopener noreferrer">AGB</a>. Für Inhalt und Fragen zu den Paketen bin ich zuständig (Kontakt siehe oben).</p>
      <h2>Haftung für Links</h2>
      <p>Diese Website enthält Links zu externen Websites (zum Beispiel YouTube, Kahoot, Prüfungsanbieter). Für deren Inhalte sind ausschließlich die jeweiligen Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entferne ich solche Links umgehend.</p>
      <h2>Urheberrecht</h2>
      <p>Texte, Übungen, Bilder und Videos auf dieser Website sind urheberrechtlich geschützt. Die Nutzung für das eigene Lernen und im Unterricht ist ausdrücklich erwünscht. Eine Veröffentlichung oder kommerzielle Nutzung ist nur mit Zustimmung erlaubt.</p>
      <p class="dm-small">3D-Symbole: <a href="https://github.com/microsoft/fluentui-emoji" target="_blank" rel="noopener noreferrer">Fluent Emoji</a> © Microsoft Corporation, MIT-Lizenz.</p>
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
      <p>Dein Lernfortschritt, abgehakte Schritte, deine Übungstexte und welche Neuigkeiten (🔔) du schon gesehen hast, werden im Speicher deines Browsers (localStorage) gespeichert. Diese Daten werden nicht an mich oder Dritte übertragen. Du kannst sie jederzeit löschen.</p>
      <p><button type="button" class="dm-btn dm-btn-quiet" id="dm-wipe">Meinen gespeicherten Lernstand löschen</button> <span id="dm-wipe-status" role="status"></span></p>
      <h2>4. YouTube-Videos</h2>
      <p>Videos werden erst geladen, wenn du auf „Videos hier anzeigen“ klickst. Erst dann werden Daten (zum Beispiel deine IP-Adresse) an YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) übertragen. Ich nutze den erweiterten Datenschutzmodus (youtube-nocookie.com). Deine Zustimmung wird auf deinem Gerät gespeichert; du kannst sie oben mit „Lernstand löschen“ zurücknehmen. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Mehr: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p>
      <p>Die Vorschaubilder der Videos liegen auf dieser Website selbst. Beim Anzeigen der Bilder werden keine Daten an YouTube übertragen.</p>
      <h2>4b. Lieder (Suno)</h2>
      <p>Die Lieder im Bereich „Deutsch mit Liedern“ werden erst geladen, wenn du auf „Lied hier abspielen“ oder „Playlist starten“ klickst. Dann werden Daten (zum Beispiel deine IP-Adresse) an Suno, Inc. (USA) übertragen; dabei können Daten in den USA verarbeitet werden. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst sie oben mit „Lernstand löschen“ widerrufen. Mehr: <a href="https://suno.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Suno</a>.</p>
      <h2>4a. Schreib-Check (LanguageTool)</h2>
      <p>Wenn du bei einem Schreibfeld auf „Text prüfen“ klickst, wird der Text aus diesem Feld zur Rechtschreib- und Grammatikprüfung an LanguageTool übertragen (LanguageTooler GmbH, Boschstraße 23a, 22761 Hamburg, Deutschland). Dabei wird auch deine IP-Adresse übermittelt. Ohne Klick wird nichts übertragen. Für die Verarbeitung beim Anbieter gelten dessen Datenschutzbestimmungen. Rechtsgrundlage ist deine Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO). Schreib bitte keine sensiblen persönlichen Daten in die Übungsfelder. Mehr: <a href="https://languagetool.org/legal/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von LanguageTool</a>.</p>
      <h2>4c. Kauf von Lernpaketen (Digistore24)</h2>
      <p>Die Lernpakete werden über die Digistore24 GmbH, St.-Godehard-Straße 32, 31139 Hildesheim, verkauft. Digistore24 ist Verkäufer und Vertragspartner. Erst wenn du auf „Jetzt kaufen“ klickst, öffnet sich das Bestellformular von Digistore24; vorher werden keine Daten an Digistore24 übertragen. Bei der Bestellung verarbeitet Digistore24 deine Bestell- und Zahlungsdaten. Ich erhalte von Digistore24 die für die Abwicklung nötigen Angaben (zum Beispiel Name, E-Mail-Adresse und gekauftes Produkt), um dir bei Fragen helfen zu können. Rechtsgrundlage ist die Vertragsabwicklung (Art. 6 Abs. 1 lit. b DSGVO). Mehr: <a href="https://www.digistore24.com/page/privacy/1/de" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Digistore24</a>.</p>
      <h2>4d. Einsprechen und korrigieren lassen</h2>
      <p>Bei den Sprechübungen kannst du dich aufnehmen. Erst nach deinem Klick auf „Aufnahme starten“ fragt dein Browser nach dem Mikrofon. Die Aufnahme bleibt auf deinem Gerät und wird nicht an mich übertragen. Für das automatische Mitschreiben nutzt dein Browser seine eingebaute Spracherkennung: In Chrome und Edge wird der Ton dafür an Google bzw. Microsoft übertragen und dort in Text umgewandelt; dabei können Daten auch außerhalb der EU verarbeitet werden. Den erkannten Text prüft danach LanguageTool (siehe 4a). Rechtsgrundlage ist deine Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO).</p>
      <h2>4e. Deine Meinung (Zettel)</h2>
      <p>Wenn du unter „Deine Meinung“ einen Zettel abschickst, werden deine Angaben (Art des Zettels, Text, freiwillig Vorname und E-Mail-Adresse) über den Dienst FormSubmit (formsubmit.co) per E-Mail an mich weitergeleitet. Dabei wird auch deine IP-Adresse übertragen; die Verarbeitung kann außerhalb der EU stattfinden. Ohne Klick auf „Zettel abschicken“ wird nichts übertragen. Ich veröffentliche einen Zettel nur, wenn du das erlaubt hast – mit Vorname oder anonym, nie mit E-Mail-Adresse. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Wenn du möchtest, dass ich einen Zettel wieder entferne, schreib mir einfach.</p>
      <p>Nach einiger Nutzung fragt die Seite einmal kurz, ob sie dir hilft (1–5 Sterne). Ob und wann die Frage erscheint, wird nur in deinem Browser gespeichert. Erst wenn du Sterne anklickst, werden die Sternzahl, dein freiwilliger Kommentar und die aktuelle Unterseite über FormSubmit per E-Mail an mich gesendet; dabei wird auch deine IP-Adresse übertragen. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>
      ${DM.analytics && DM.analytics.cloudflareToken ? `<h2>4f. Besucherstatistik (Cloudflare Web Analytics)</h2>
      <p>Um zu sehen, wie viele Menschen die Seite nutzen und welche Bereiche gefragt sind, nutze ich Cloudflare Web Analytics (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA). Dabei werden keine Cookies gesetzt, kein Speicher deines Browsers genutzt und keine Nutzerprofile gebildet. Beim Aufruf einer Seite werden technische Daten (aufgerufene Seite, Herkunftsseite, Browser, Gerätetyp, Land, Ladezeit) an Cloudflare übertragen; dabei wird auch deine IP-Adresse verarbeitet, laut Cloudflare aber nicht gespeichert. Die Verarbeitung kann in den USA stattfinden; Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert. Ich sehe nur zusammengefasste Zahlen, keine einzelnen Personen. Rechtsgrundlage ist mein berechtigtes Interesse an einer verbesserten Website (Art. 6 Abs. 1 lit. f DSGVO). Mehr: <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Cloudflare</a>.</p>` : ''}
      <h2>5. Kontakt per E-Mail oder Telefon</h2>
      <p>Wenn du mir schreibst, verarbeite ich deine Nachricht und deine Kontaktdaten nur, um dir zu antworten.</p>
      <h2>6. Vorlesefunktion</h2>
      <p>Die meisten Hörtexte sind als Audiodateien auf dieser Website gespeichert (künstlich erzeugte Stimmen). Wo es noch keine Datei gibt, nutzt die Vorlesefunktion die Sprachausgabe deines Browsers. Je nach Browser und gewählter Stimme kann der Text dafür an den Anbieter des Browsers (zum Beispiel Google, Microsoft oder Apple) übertragen werden.</p>
      <h2>7. Schriften</h2>
      <p>Die Schriften dieser Website liegen auf dem eigenen Server. Es werden keine Schriften von Google oder anderen Anbietern geladen.</p>
      <h2>8. Externe Links</h2>
      <p>Die Titelbilder und QR-Codes der Kahoot-Quiz liegen auf dieser Website. Links zu Kahoot, PayPal, YouTube oder Prüfungsanbietern führen zu anderen Websites. Dort gelten deren Datenschutzbestimmungen.</p>
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

  /* ---------- Materialien zum Herunterladen ---------- */
  function materials(cat, lvl) {
    const C = DM.materialCats, all = DM.materials || [];
    if (!C[cat]) cat = 'alle';
    if (!LEVELS.includes(lvl)) lvl = 'alle';
    const size = kb => kb >= 1024 ? (kb / 1024).toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' MB' : kb + ' KB';
    page(`${crumbs([['Materialien']])}
      <div class="dm-head"><h1>Materialien</h1><p class="dm-lead">Arbeitsblätter, Wortlisten und ganze Unterrichtsstunden von Dennis als PDF – jede Stunde mit Regeln, Beispielen, Übungen und Lösungen. Zum Ausdrucken und Üben – kostenlos.</p></div>
      <div class="dm-filter dm-mat-filter">
        <nav class="dm-tabs dm-tabs-small" aria-label="Thema">${[['alle', 'Alle']].concat(Object.entries(C)).map(([k, t]) => `<a href="#material/${k}/${lvl}" ${k === cat ? 'aria-current="page"' : ''}><b>${t}</b><small>${k === 'alle' ? all.length : all.filter(m => m.cat === k).length}</small></a>`).join('')}</nav>
      </div>
      <div class="dm-filter">
        <nav class="dm-tabs dm-tabs-small" aria-label="Niveau">${['alle', 'A1', 'A2', 'B1'].map(k => `<a href="#material/${cat}/${k}" ${k === lvl ? 'aria-current="page"' : ''}><b>${k === 'alle' ? 'Alle Niveaus' : k}</b></a>`).join('')}</nav>
        <label class="dm-search"><span class="dm-sr">Material suchen</span><input type="search" id="dm-mq" placeholder="Suchen, z. B. Dativ, Uhrzeit, Brief …"></label>
      </div>
      <p id="dm-mcount" class="dm-small" role="status"></p>
      <div id="dm-mlist"></div>
      <section class="dm-section dm-card dm-mat-lid"><div><h2>Leben in Deutschland</h2><p>18 illustrierte Merkblätter zum Orientierungskurs – von Politik und Wahlen über Rechtsstaat und Sozialstaat bis zu Geschichte und Europa – findest du im Bereich „Deutschland verstehen“.</p></div><a class="dm-btn dm-btn-quiet" href="#orientierungskurs">Zu den Merkblättern</a></section>
      <p class="dm-small">Alle Materialien sind von Dennis für seinen Unterricht erstellt. Du darfst sie zum Lernen und im Unterricht nutzen. Bitte veröffentliche sie nicht unter deinem Namen.</p>`);
    const norm = t => t.toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '').replace(/ß/g, 'ss');
    const draw = () => {
      const q = norm($('#dm-mq').value.trim());
      const list = all.filter(m => (cat === 'alle' || m.cat === cat) && (lvl === 'alle' || m.level.includes(lvl)) && (!q || norm(`${m.title} ${m.desc} ${(m.topics || []).join(' ')} ${C[m.cat]}`).includes(q)));
      $('#dm-mcount').textContent = `${list.length} ${list.length === 1 ? 'Material' : 'Materialien'}`;
      const groups = cat === 'alle' ? Object.keys(C) : [cat];
      $('#dm-mlist').innerHTML = groups.map(g => {
        const items = list.filter(m => m.cat === g); if (!items.length) return '';
        return `<section class="dm-mat-group">${cat === 'alle' ? `<h2>${C[g]}</h2>` : ''}<ul class="dm-mat-list">${items.map(m => `<li><a class="dm-mat" href="${m.file}" download target="_blank" rel="noopener"><span class="dm-mat-icon" aria-hidden="true">PDF</span><span class="dm-mat-text"><b>${x(m.title)}</b><span>${x(m.desc)}</span>${m.topics ? `<ul class="dm-mat-topics">${m.topics.map(t => `<li>${x(t)}</li>`).join('')}</ul>` : ''}<small>${m.level} · ${m.pages} ${m.pages === 1 ? 'Seite' : 'Seiten'} · ${size(m.kb)}${m.loes ? ' · <span class="dm-mat-loes">✓ mit Lösungen</span>' : ''}</small></span><span class="dm-mat-dl">Herunterladen</span></a></li>`).join('')}</ul></section>`;
      }).join('') || '<p class="dm-empty">Nichts gefunden. Versuche ein anderes Wort oder wähle „Alle“.</p>';
    };
    $('#dm-mq').oninput = draw; draw();
  }
  function materialLinks(cat, heading) {
    const items = (DM.materials || []).filter(m => m.cat === cat).slice(0, 6);
    if (!items.length) return '';
    return `<section class="dm-section"><div class="dm-section-head"><h2>${heading}</h2><a href="#material/${cat}">Alle ansehen</a></div><ul class="dm-mat-list dm-mat-compact">${items.map(m => `<li><a class="dm-mat" href="${m.file}" download target="_blank" rel="noopener"><span class="dm-mat-icon" aria-hidden="true">PDF</span><span class="dm-mat-text"><b>${x(m.title)}</b><small>${m.level} · ${m.pages} ${m.pages === 1 ? 'Seite' : 'Seiten'}${m.loes ? ' · ✓ mit Lösungen' : ''}</small></span></a></li>`).join('')}</ul></section>`;
  }

  /* Download-Links zu Dateien, die (noch) nicht auf dem Server liegen, ausblenden */
  const fileOk = new Map();
  function hideMissingDownloads() {
    $$('main a[href^="material/"], main a[href^="./material/"]').forEach(a => {
      const href = a.getAttribute('href');
      if (!fileOk.has(href)) fileOk.set(href, fetch(href, { method: 'HEAD' }).then(r => r.ok).catch(() => true));
      fileOk.get(href).then(ok => { if (!ok) { a.hidden = true; a.setAttribute('aria-hidden', 'true'); } });
    });
  }


  /* ---------- Bücher bei Amazon ---------- */
  function booksBlock() {
    const B = (DM.books || []).filter(b => b.amazon);
    if (!B.length) return '';
    const card = b => `<article class="dm-card dm-book">
        <a class="dm-book-cover" href="${x(b.amazon)}" target="_blank" rel="noopener sponsored" tabindex="-1" aria-hidden="true"><img src="${b.img}" alt="" width="560" height="792" loading="lazy"></a>
        <div class="dm-book-body"><p class="dm-pkg-meta">Taschenbuch · ${x(b.level)} · ${x(b.target)} · ${b.pages} Seiten</p>
          <h3>${x(b.title)}</h3><p class="dm-small">${x(b.desc)}</p>
          <p class="dm-book-buy"><span class="dm-pkg-price">${x(b.price)}</span><a class="dm-btn" href="${x(b.amazon)}" target="_blank" rel="noopener sponsored">Bei Amazon kaufen</a></p></div></article>`;
    return `<section class="dm-section dm-books" id="buecher" aria-labelledby="books-h">
      <h2 id="books-h">Lieber auf Papier? Meine Übungsbücher</h2>
      <p class="dm-small">Für alle, die gern mit Stift und Papier üben: dieselbe Art von Prüfungstraining als gedrucktes Taschenbuch, mit Platz zum Schreiben und allen Lösungen. Kauf und Versand über Amazon. Alle Übungen auf dieser Website bleiben kostenlos.</p>
      <div class="dm-books-grid">${B.map(card).join('')}</div></section>`;
  }

  /* ---------- Lernpakete (Kauf später über Digistore24) ---------- */
  function packages() {
    const P = DM.packages || [];
    const card = k => `<article class="dm-card dm-pkg dm-pkg-row" id="paket-${k.id}">
      ${k.img ? `<a class="dm-pkg-thumb" href="#lernpakete/${k.id}" tabindex="-1" aria-hidden="true"><img src="${k.img}" alt="" loading="lazy" width="800" height="800"></a>` : ''}
      <div class="dm-pkg-body">
        <p class="dm-pkg-meta">${x(k.level)} · ${x(k.target)} · ${k.pages} Seiten PDF</p>
        <h2><a href="#lernpakete/${k.id}">${x(k.title)}</a></h2>
        <p class="dm-pkg-short">${x(k.contents.slice(0, 2).join(' · '))}</p>
        <div class="dm-pkg-buy">
          ${k.buy && k.price ? `<span class="dm-pkg-price">${x(k.price)}</span>` : '<span class="dm-pkg-lock">🔒 Bald erhältlich</span>'}
          <a class="dm-btn" href="#lernpakete/${k.id}">${k.buy ? 'Details und Kauf' : 'Details ansehen'}</a>
          ${k.preview ? `<a class="dm-pkg-probe" href="${x(k.preview)}" target="_blank" rel="noopener">Leseprobe (PDF)</a>` : ''}
        </div>
      </div></article>`;
    page(`${crumbs([['Lernpakete']])}
      <div class="dm-head"><h1>Lernpakete</h1><p class="dm-lead">Gedruckte Übungsbücher bei Amazon und ausführliche PDF-Pakete zum Selbstlernen – alle mit Lösungen. Alle Übungen auf dieser Website bleiben kostenlos.</p></div>
      ${booksBlock()}
      <h2 class="dm-pkg-digi-h">Lernpakete als PDF</h2>
      <nav class="dm-tabs dm-tabs-small dm-pkg-jump" aria-label="Zielgruppe"><a href="#lernpakete" data-jump="pk-lernende"><b>Für Lernende</b><small>${P.filter(k => k.group !== 'lehrende').length} Pakete</small></a><a href="#lernpakete" data-jump="pk-lehrende"><b>Für Lehrkräfte</b><small>${P.filter(k => k.group === 'lehrende').length} Pakete</small></a></nav>
      <section class="dm-pkg-sec" id="pk-lernende"><h2>Für Lernende</h2><p class="dm-small">Selbstlernmaterial für DTZ, B2 Beruf und den Test „Leben in Deutschland“ – mit Musterlösungen.</p><div class="dm-pkg-grid">${P.filter(k => k.group !== 'lehrende').map(card).join('')}</div></section>
      <section class="dm-pkg-sec" id="pk-lehrende"><h2>Für Lehrkräfte</h2><p class="dm-small">Fertige Unterrichtsstunden für Integrationskurs und DaZ – mit Lehrerblatt, Kahoot-Quiz und Kopiervorlagen.</p><div class="dm-pkg-grid">${P.filter(k => k.group === 'lehrende').map(card).join('')}</div></section>
      <section class="dm-card dm-pkg-info"><h2>So funktioniert der Kauf</h2>
        <ol><li>Du wählst ein Paket und klickst auf „Kaufen“.</li><li>Die Bezahlung läuft sicher über <b>Digistore24</b>.</li><li>Direkt nach dem Kauf bekommst du den Download-Link per E-Mail.</li></ol>
        <p class="dm-small">Selbstlernmaterial und Unterrichtsmaterial ohne individuelle Betreuung oder Korrektur. Unabhängiges Lernangebot – kein Angebot von g.a.s.t., telc oder BAMF, keine offiziellen Prüfungsaufgaben. Fragen? <a href="mailto:${T.email}">${T.email}</a></p></section>`);
    $$('[data-jump]').forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  function packagePage(id) {
    const P = DM.packages || [], k = P.find(q => q.id === id);
    if (id === 'buecher') { packages(); setTimeout(() => document.getElementById('buecher')?.scrollIntoView({ block: 'start' }), 60); return; }
    if (!k) return packages();
    const days = (DM.shop && DM.shop.refundDays) || 14, teach = k.group === 'lehrende';
    const buyBox = k.buy
      ? `<p class="dm-pkg-bigprice">${x(k.price || '')}<small>Endpreis inkl. MwSt. · einmalige Zahlung</small></p>
         <a class="dm-btn dm-btn-big" href="${x(k.buy)}" target="_blank" rel="noopener">Jetzt kaufen</a>
         <p class="dm-small">Sichere Bezahlung über Digistore24 (PayPal, Kreditkarte, SEPA-Lastschrift u. a.).</p>`
      : `<p class="dm-pkg-bigprice">${k.price ? `${x(k.price)}<small>Endpreis inkl. MwSt. · einmalige Zahlung · Kauf in Kürze möglich</small>` : 'Bald erhältlich'}</p>
         <a class="dm-btn" href="mailto:${T.email}?subject=${encodeURIComponent('Lernpaket: ' + k.title)}&body=${encodeURIComponent('Hallo Dennis,\nbitte gib mir Bescheid, wenn dieses Lernpaket erhältlich ist.\n')}">Benachrichtigen, wenn verfügbar</a>`;
    page(`${crumbs([['Lernpakete', '#lernpakete'], [k.title]])}
      <div class="dm-pkg-detail">
        <div class="dm-pkg-media">${k.img ? `<img src="${k.img}" alt="Vorschau: ${x(k.title)}" width="800" height="800">` : ''}
          ${k.preview ? `<a class="dm-btn dm-btn-quiet" href="${x(k.preview)}" target="_blank" rel="noopener">📄 Leseprobe ansehen (PDF)</a>` : ''}</div>
        <div class="dm-pkg-main">
          <p class="dm-pkg-meta">${teach ? 'Für Lehrkräfte' : 'Lernpaket'} · ${x(k.level)}${teach ? '' : ' · ' + x(k.target)}</p>
          <h1>${x(k.title)}</h1>
          <section class="dm-card dm-pkg-buybox">${buyBox}</section>
          <p class="dm-lead">${x(k.desc)}</p>
          <h2>Das ist drin</h2>
          <ul class="dm-pkg-list">${k.contents.map(c => `<li>${x(c)}</li>`).join('')}</ul>
          ${k.note ? `<p class="dm-small dm-pkg-note">${x(k.note)}</p>` : ''}
          <h2>So bekommst du das Paket</h2>
          <ul class="dm-pkg-facts">
            <li><b>Format:</b> PDF${k.pages ? ` mit ${k.pages} Seiten` : ''} (A4), zum Lesen am Bildschirm und zum Ausdrucken.</li>
            <li><b>Lieferung:</b> Sofort nach dem Kauf erscheint der Download auf der Bestätigungsseite, und du bekommst den Link per E-Mail. Es wird nichts verschickt.</li>
            <li><b>Geld zurück:</b> Du hast ${days} Tage Geld-zurück-Garantie. Schreib einfach an Digistore24 oder an mich – du bekommst den vollen Preis zurück.</li>
            <li><b>Nutzung:</b> ${teach ? 'Sie dürfen die Kopiervorlagen für Ihren eigenen Unterricht (eine Lehrkraft) beliebig oft kopieren und digital an Ihre Kursteilnehmenden weitergeben. Weiterverkauf, Veröffentlichung im Internet oder Weitergabe an andere Lehrkräfte sind nicht erlaubt.' : 'Für deinen persönlichen Gebrauch. Bitte nicht weitergeben oder im Internet veröffentlichen.'}</li>
          </ul>
          <p class="dm-small">Verkäufer und Vertragspartner ist die Digistore24 GmbH (St.-Godehard-Straße 32, 31139 Hildesheim). Es gelten deren <a href="https://www.digistore24.com/page/terms/1/de" target="_blank" rel="noopener noreferrer">AGB</a> und <a href="https://www.digistore24.com/page/privacy/1/de" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>. Inhalt und Support: Dzianis Prudnikau, siehe <a href="#impressum">Impressum</a>. ${k.id === 'lid-lernheft' ? 'Die Fragen stammen aus dem öffentlichen Fragenkatalog zum Test „Leben in Deutschland“. Unabhängiges Lernmaterial, keine Verbindung zum BAMF.' : 'Unabhängiges Lernmaterial: keine Verbindung zu g.a.s.t., telc oder BAMF, keine offiziellen Prüfungsaufgaben.'}</p>
          <p class="dm-row"><a href="#lernpakete">← Alle Lernpakete</a> <button type="button" class="dm-btn dm-btn-quiet" id="dm-share" data-url="https://deutsch-mit-dennis.de/lernpakete/${k.id}/" data-title="${x(k.title)}">🔗 Link teilen</button></p>
        </div>
      </div>`);
    document.title = k.title + ' – Deutsch mit Dennis';
    bindShare();
  }
  function bindShare() {
    const b = $('#dm-share'); if (!b) return;
    b.onclick = async () => {
      const url = b.dataset.url, title = b.dataset.title;
      try { if (navigator.share) { await navigator.share({ title, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
      try { await navigator.clipboard.writeText(url); b.textContent = '✓ Link kopiert'; } catch { prompt('Link kopieren:', url); }
    };
  }

  /* ---------- Feedback & Wünsche (ersetzt die Pinnwand) ---------- */
  /* ---------- Pinnwand: Lob, Wünsche, Kritik, Fragen ---------- */
  const PIN_TYPES = { lob: ['⭐', 'Das gefällt mir'], wunsch: ['💡', 'Mein Wunsch'], kritik: ['🛠️', 'Das kann besser werden'], frage: ['❓', 'Meine Frage'], dennis: ['📌', 'Von Dennis'] };
  let pinCache = null;
  function feedback(filter) {
    const f = PIN_TYPES[filter] ? filter : 'alle';
    page(`${crumbs([['Deine Meinung']])}
      <div class="dm-head"><h1>Deine Meinung</h1><p class="dm-lead">Was gefällt dir? Was wünschst du dir? Was nervt? Was möchtest du wissen? Schreib einen Zettel – Dennis liest jeden und hängt ihn hier an die Wand.</p></div>
      <nav class="dm-pin-filter" aria-label="Zettel filtern">${['alle', 'lob', 'wunsch', 'kritik', 'frage'].map(k => `<a href="#pinnwand${k === 'alle' ? '' : '/' + k}" ${k === f ? 'aria-current="page"' : ''}>${k === 'alle' ? '🗂️ Alle' : PIN_TYPES[k][0] + ' ' + PIN_TYPES[k][1]}</a>`).join('')}</nav>
      <div class="dm-pin-layout">
        <section class="dm-cork" aria-label="Zettel von Lernenden"><div class="dm-cork-grid" id="dm-cork" aria-busy="true"><p class="dm-hint">Zettel werden geladen …</p></div></section>
        <form class="dm-card dm-pin-form" id="dm-pin-form" novalidate>
          <h2>📌 Zettel schreiben</h2>
          <fieldset><legend>Was möchtest du anpinnen?</legend><div class="dm-pin-kinds">${['lob', 'wunsch', 'kritik', 'frage'].map((k, i) => `<label class="dm-pin-kind dm-pk-${k}"><input type="radio" name="type" value="${k}" ${i === 0 ? 'checked' : ''}><span>${PIN_TYPES[k][0]}</span>${PIN_TYPES[k][1]}</label>`).join('')}</div></fieldset>
          <label for="dm-pin-text">Dein Zettel</label>
          <textarea id="dm-pin-text" name="text" rows="5" maxlength="600" required placeholder="Zum Beispiel: Die Lieder helfen mir beim Lernen. / Ich wünsche mir mehr Übungen zu …"></textarea>
          <span class="dm-pin-count" id="dm-pin-count">0 / 600</span>
          <label for="dm-pin-name">Dein Vorname <small>(freiwillig – sonst „anonym“)</small></label>
          <input id="dm-pin-name" name="name" maxlength="40" autocomplete="given-name">
          <label for="dm-pin-mail">Deine E-Mail <small>(freiwillig – nur wenn du eine Antwort möchtest, wird nicht veröffentlicht)</small></label>
          <input id="dm-pin-mail" name="email" type="email" maxlength="80" autocomplete="email">
          <label class="dm-pin-ok"><input type="checkbox" name="ok" id="dm-pin-ok"> Mein Zettel darf hier öffentlich erscheinen (mit Vorname oder anonym). Bitte keine privaten Daten wie Adresse oder Telefonnummer.</label>
          <input type="text" name="_honey" class="dm-pin-honey" tabindex="-1" autocomplete="off" aria-hidden="true">
          <button class="dm-btn" type="submit">Zettel abschicken</button>
          <p class="dm-small" id="dm-pin-status" role="status"></p>
          <p class="dm-small">Dein Zettel geht per E-Mail an Dennis (über den Dienst FormSubmit) und erscheint erst nach Prüfung. Mehr in der <a href="#datenschutz">Datenschutzerklärung</a>.</p>
        </form>
      </div>
      <section class="dm-section dm-pin-other"><h2>Lieber direkt schreiben?</h2><div class="dm-row"><a class="dm-btn dm-btn-quiet" href="mailto:${T.email}?subject=${encodeURIComponent('Meine Meinung')}">✉️ E-Mail</a><a class="dm-btn dm-btn-quiet" href="${T.youtube}" target="_blank" rel="noopener noreferrer">▶ YouTube-Kommentar</a></div></section>`);
    const draw = notes => {
      const box = $('#dm-cork'); if (!box) return; box.removeAttribute('aria-busy');
      const list = notes.filter(n => f === 'alle' || n.type === f);
      box.innerHTML = list.length ? list.map((n, i) => `<article class="dm-note-pin dm-pin-${x(n.type)}" style="--tilt:${((i * 37) % 7) - 3}deg;--d:${i * 60}ms">
        <span class="dm-pin-head" aria-hidden="true"></span>
        <p class="dm-pin-type">${(PIN_TYPES[n.type] || PIN_TYPES.dennis)[0]} ${x((PIN_TYPES[n.type] || PIN_TYPES.dennis)[1])}</p>
        <p class="dm-pin-text">${x(n.text)}</p>
        ${n.answer ? `<p class="dm-pin-answer"><b>Dennis:</b> ${x(n.answer)}</p>` : ''}
        <p class="dm-pin-meta">– ${x(n.name || 'anonym')}${n.date ? ' · ' + fmtDate(n.date) : ''}</p></article>`).join('')
        : `<p class="dm-pin-empty">Noch keine Zettel in dieser Spalte. Schreib den ersten!</p>`;
    };
    (pinCache ? Promise.resolve(pinCache) : fetch('pinnwand.json?v=' + Date.now(), { cache: 'no-store' }).then(r => r.json()).then(j => (pinCache = j.notes || [])).catch(() => [])).then(draw);
    const form = $('#dm-pin-form'), ta = $('#dm-pin-text');
    ta.oninput = () => { $('#dm-pin-count').textContent = `${ta.value.length} / 600`; };
    form.onsubmit = async e => {
      e.preventDefault(); const st = $('#dm-pin-status'), fd = new FormData(form);
      if (fd.get('_honey')) return;
      if ((fd.get('text') || '').trim().length < 5) { st.textContent = 'Bitte schreib ein paar Worte auf deinen Zettel.'; ta.focus(); return; }
      const type = fd.get('type'), name = (fd.get('name') || '').trim() || 'anonym', ok = $('#dm-pin-ok').checked;
      const body = { _subject: `Deine Meinung: ${PIN_TYPES[type][1]} von ${name}`, _template: 'table', _captcha: 'false', Art: PIN_TYPES[type][1], Zettel: fd.get('text').trim(), Name: name, 'Darf veröffentlicht werden': ok ? 'ja' : 'nein' };
      if (fd.get('email')) body._replyto = body['E-Mail'] = fd.get('email');
      st.textContent = 'Wird gesendet …'; form.querySelector('button').disabled = true;
      try {
        const r = await fetch(`https://formsubmit.co/ajax/${T.email}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
        if (!r.ok) throw 0;
        form.reset(); $('#dm-pin-count').textContent = '0 / 600';
        st.innerHTML = '<b>Danke! Dein Zettel ist bei Dennis angekommen.</b> ' + (ok ? 'Nach kurzer Prüfung hängt er hier an der Wand.' : 'Er bleibt privat, weil du die Veröffentlichung nicht erlaubt hast.');
        celebrate(form.querySelector('button'));
      } catch {
        const mail = `mailto:${T.email}?subject=${encodeURIComponent(body._subject)}&body=${encodeURIComponent(body.Zettel + '\n\n– ' + name + (ok ? '\n(Darf öffentlich erscheinen.)' : ''))}`;
        st.innerHTML = `Das Senden hat gerade nicht geklappt. <a href="${mail}">Schick den Zettel per E-Mail</a> – er ist schon ausgefüllt.`;
      } finally { form.querySelector('button').disabled = false; }
    };
  }


  /* ---------- Prüfungsmodus: Zeit wie in der Prüfung, Wortzähler, Selbstaufnahme ---------- */
  const EXAM_TIMES = {
    'dtz-vorstellen': { min: 3, kind: 'sprechen', label: 'DTZ Sprechen Teil 1: ca. 3 Minuten pro Person' },
    'dtz-bild': { min: 3, kind: 'sprechen', label: 'DTZ Sprechen Teil 2: ca. 3 Minuten pro Person' },
    'dtz-sprechen': { min: 5, kind: 'sprechen', label: 'DTZ Sprechen Teil 3: ca. 5 Minuten zu zweit' },
    'dtz-schreiben': { min: 30, kind: 'schreiben', label: 'DTZ Schreiben: 30 Minuten für einen Brief' },
    'dtz-lesen': { min: 10, kind: 'lesen', label: 'Übungszeit für einen Lesetext: 10 Minuten' },
    'dtb-thema': { min: 4, kind: 'sprechen', label: 'DTB B2 Sprechen Teil 1: ca. 3–4 Minuten' },
    'dtb-kollegen': { min: 4, kind: 'sprechen', label: 'DTB B2 Sprechen Teil 2: ca. 4 Minuten' },
    'dtb-sprechen': { min: 4, kind: 'sprechen', label: 'DTB B2 Sprechen Teil 3: ca. 4 Minuten' },
    'dtb-schreiben': { min: 30, kind: 'schreiben', label: 'DTB B2 Schreiben: Übungszeit 30 Minuten' },
    'dtb-lesen': { min: 10, kind: 'lesen', label: 'Übungszeit für einen Lesetext: 10 Minuten' }
  };
  const CHECK_WRITE = ['Habe ich alle Leitpunkte bearbeitet?', 'Passen Anrede und Gruß (Sie oder du)?', 'Habe ich Sätze verbunden (weil, deshalb, aber, dass)?', 'Steht das Verb an Position 2 bzw. am Ende im Nebensatz?', 'Nomen groß, Satzende mit Punkt, Text noch einmal gelesen?'];
  const CHECK_SPEAK = ['Habe ich die ganze Zeit gesprochen, ohne lange Pausen?', 'Habe ich Beispiele und Gründe genannt?', 'Habe ich auf meinen Partner reagiert und nachgefragt?', 'Habe ich laut und deutlich gesprochen?'];
  let examT = { id: null, left: 0, total: 0, run: null, rec: null, chunks: [], url: null };
  const examBox = document.createElement('section');
  examBox.className = 'dm-examtimer'; examBox.setAttribute('aria-label', 'Prüfungsmodus');
  const fmtT = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  function words() { const t = $('main textarea'); return t ? (t.value.trim().match(/\S+/g) || []).length : 0; }
  function drawExamBox() {
    const c = EXAM_TIMES[examT.id]; if (!c) return;
    const running = !!examT.run, done = examT.total && examT.left <= 0;
    const pct = examT.total ? Math.round((1 - examT.left / examT.total) * 100) : 0;
    const checks = (c.kind === 'schreiben' ? CHECK_WRITE : c.kind === 'sprechen' ? CHECK_SPEAK : []);
    examBox.innerHTML = `<div class="dm-et-row"><span class="dm-et-badge">⏱ Prüfungsmodus</span><span class="dm-et-label">${x(c.label)}</span>
      <span class="dm-et-time ${examT.total && examT.left < 60 && !done ? 'is-low' : ''}" role="timer">${fmtT(examT.total ? examT.left : c.min * 60)}</span></div>
      <span class="dm-et-bar"><i style="width:${pct}%"></i></span>
      <div class="dm-et-row">
        <button type="button" class="dm-btn" data-et="go">${running ? 'Pause' : examT.total && !done ? 'Weiter' : 'Zeit starten'}</button>
        ${examT.total ? '<button type="button" class="dm-btn dm-btn-quiet" data-et="reset">Neu starten</button>' : ''}
        ${c.kind === 'schreiben' ? `<span class="dm-et-words">Wörter: <b id="dm-et-w">${words()}</b></span>` : ''}
        ${c.kind === 'sprechen' && navigator.mediaDevices?.getUserMedia && window.MediaRecorder ? `<button type="button" class="dm-btn dm-btn-quiet" data-et="rec">${examT.rec ? '■ Aufnahme stoppen' : '🎙 Mich aufnehmen'}</button>${examT.url ? `<audio controls src="${examT.url}"></audio>` : ''}` : ''}
      </div>
      ${done ? `<div class="dm-et-done" role="status"><b>Die Zeit ist um.</b> ${c.kind === 'schreiben' ? `Du hast ${words()} Wörter geschrieben.` : ''} Prüfe dich selbst:<ul>${checks.map(t => `<li><label><input type="checkbox"> ${x(t)}</label></li>`).join('')}</ul></div>` : ''}
      ${c.kind === 'sprechen' && !done ? '<p class="dm-et-hint">Tipp: Nimm dich auf und hör dir die Aufnahme an. Sie bleibt nur in deinem Browser.</p>' : ''}`;
    $$('[data-et]', examBox).forEach(b => b.onclick = () => examAction(b.dataset.et));
  }
  function examTick() {
    examT.left--; 
    const t = $('.dm-et-time', examBox), w = $('#dm-et-w', examBox), bar = $('.dm-et-bar i', examBox);
    if (examT.left <= 0) { clearInterval(examT.run); examT.run = null; examT.left = 0; drawExamBox(); try { navigator.vibrate?.(300); } catch {} return; }
    if (t) { t.textContent = fmtT(examT.left); t.classList.toggle('is-low', examT.left < 60); }
    if (w) w.textContent = words();
    if (bar) bar.style.width = Math.round((1 - examT.left / examT.total) * 100) + '%';
  }
  async function examAction(a) {
    const c = EXAM_TIMES[examT.id];
    if (a === 'go') {
      if (examT.run) { clearInterval(examT.run); examT.run = null; }
      else { if (!examT.total || examT.left <= 0) { examT.total = examT.left = c.min * 60; } examT.run = setInterval(examTick, 1000); }
    }
    if (a === 'reset') { clearInterval(examT.run); examT.run = null; examT.total = examT.left = c.min * 60; examT.run = setInterval(examTick, 1000); }
    if (a === 'rec') {
      if (examT.rec) { examT.rec.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        examT.chunks = []; const r = new MediaRecorder(stream); examT.rec = r;
        r.ondataavailable = e => examT.chunks.push(e.data);
        r.onstop = () => { stream.getTracks().forEach(t => t.stop()); if (examT.url) URL.revokeObjectURL(examT.url); examT.url = URL.createObjectURL(new Blob(examT.chunks, { type: r.mimeType })); examT.rec = null; drawExamBox(); };
        r.start(); if (!examT.run) examAction('go');
      } catch { examBox.insertAdjacentHTML('beforeend', '<p class="dm-et-hint">Das Mikrofon ist nicht erlaubt. Du kannst trotzdem mit der Uhr üben.</p>'); return; }
    }
    drawExamBox();
  }
  function placeExamBox() {
    if (!examT.id || !mainEl.firstElementChild || mainEl.contains(examBox)) return;
    const anchor = $('main .lesson-head, main .oral-heading, main .oral-tabs');
    const after = $('main .oral-tabs') || anchor;
    if (after) after.after(examBox); else mainEl.prepend(examBox);
  }
  new MutationObserver(placeExamBox).observe(mainEl, { childList: true });
  function setupExamBox(p) {
    const id = p[0] === 'training' ? p[1] : null;
    if (id !== examT.id) { clearInterval(examT.run); try { examT.rec?.stop(); } catch {} examT = { id, left: 0, total: 0, run: null, rec: null, chunks: [], url: null }; }
    if (!EXAM_TIMES[id]) { examBox.remove(); examT.id = null; return; }
    drawExamBox(); placeExamBox();
  }

  /* ---------- Nach dem Laden einer bisherigen Seite ---------- */
  function afterLegacy(p) {
    setupExamBox(p);
    if (p[0] === 'quellen') {
      const sec = $$('main section').find(s => /Deine Eingaben/.test(s.querySelector('h2')?.textContent || ''));
      const lidSec = document.createElement('section'); lidSec.className = 'panel'; lidSec.id = 'quelle-lid';
      lidSec.innerHTML = '<h2>Fragen zum Test „Leben in Deutschland“</h2><p>Die Fragen im LiD-Trainer, in den LiD-Spielen, in der Tages-Challenge und im Lernheft stammen aus dem Gesamtfragenkatalog zum Test „Leben in Deutschland“ und zum Einbürgerungstest. Herausgeber ist das Bundesamt für Migration und Flüchtlinge (BAMF): <a href="https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.pdf?__blob=publicationFile" target="_blank" rel="noopener">Gesamtfragenkatalog als PDF (bamf.de) ↗</a>. Der Katalog unterliegt nicht dem Urheberrecht und darf für Lernplattformen verwendet werden (Auskunft des BAMF-Service-Centers, Oktober 2026).</p><p><b>Wichtig:</b> „Deutsch mit Dennis“ ist ein privates, unabhängiges Lernangebot. Es wird nicht vom BAMF unterstützt und nicht im Auftrag des BAMF oder der Bundesrepublik Deutschland betrieben. Die Erklärungen, Übungen und Spiele rund um die Fragen sind eigene Materialien.</p>';
      if (!$('#quelle-lid')) (sec || $$('main section').pop())?.after(lidSec);
      if (sec) sec.innerHTML = '<h2>Deine Eingaben</h2><p>In „Üben“ (Sprechen, Schreiben, Hören) und in „Mein Lernweg“ bleiben deine Texte und dein Fortschritt im Speicher deines Browsers – nur auf diesem Gerät. Texte in den Lektionen und im Prüfungstraining bleiben nur, solange die Seite geöffnet ist. Lade wichtige Texte vorher herunter. Freie Texte und die Aussprache werden nicht automatisch bewertet.</p><p>Mehr dazu in der <a href="#datenschutz">Datenschutzerklärung</a>.</p>';
    }
    if (p[0] === 'orientierungskurs' && !p[1]) videoSection('orientierung', 'Videos: Leben in Deutschland').then(sec => sec && mainEl.append(sec));
    if (p[0] === 'lektion' && p[1] && lessons.some(l => l.id === p[1])) {
      $('#pl-complete')?.addEventListener('click', () => { mem.done['lektion:' + p[1]] = Date.now(); save(); });
    }
  }

  /* Einheitlicher Seitenkopf: ältere Seiten bekommen die gleiche Brotkrumen-Zeile wie alle anderen */
  const CRUMB_FOR = {
    witz: [['Witz des Tages']],
    quellen: [['Prüfungstraining', '#pruefung'], ['Prüfungsinfos & Quellen']],
    orientierungskurs: [['Prüfungstraining', '#pruefung'], ['Leben in Deutschland']],
    training: [['Prüfungstraining', '#pruefung'], ['Training']],
  };
  function unifyHead(p) {
    const items = CRUMB_FOR[p[0]];
    if (!items || mainEl.querySelector('.dm-crumbs')) return;
    if (p[0] === 'orientierungskurs' && p[1]) return; // Unterseiten haben eigene Navigation
    const h1 = mainEl.querySelector('h1');
    if (!h1) return;
    if (p[0] === 'quellen') {
      h1.textContent = 'Prüfungsinfos & Quellen';
      mainEl.querySelector(':scope > .eyebrow')?.remove();
    }
    const box = h1.closest('.lesson-head, .lid-heading, .wz-page') || h1;
    box.insertAdjacentHTML('beforebegin', crumbs(items));
  }
  /* ---------- Router ---------- */
  const legacyRoute = window.route;
  const NAV = { '': 'start', lernweg: 'wege', wegweiser: 'wege', lernen: 'lernen', lektion: 'lernen', wortschatz: 'lernen', wort: 'lernen', ueben: 'ueben', schreiben: 'ueben', hoeren: 'ueben', lesen: 'ueben', kahoot: 'ueben', challenge: 'spiele', spiele: 'spiele', bild: 'pruefung', pruefung: 'pruefung', training: 'pruefung', orientierungskurs: 'pruefung', lid: 'pruefung', quellen: 'pruefung', simulation: 'pruefung', vorbereitung: 'pruefung', videos: 'videos', 'ueber-mich': 'ueber', material: 'material', lernpakete: 'pakete', lieder: 'lieder' };
  const TITLES = { '': 'Deutsch lernen mit Dennis', lernweg: 'Mein Lernweg', wegweiser: 'Welcher Weg passt?', lernen: 'Lektionen', lektion: 'Lektion', wortschatz: 'Wortschatz', wort: 'Wortkarte', ueben: 'Üben', schreiben: 'Schreib-Bausteine', hoeren: 'Hören', lesen: 'Lesen', kahoot: 'Kahoot-Quiz', challenge: 'Tages-Challenge', spiele: 'Lernspiele', bild: 'Bild beschreiben', pruefung: 'Prüfungstraining', training: 'Prüfungstraining', orientierungskurs: 'Deutschland verstehen', lid: 'Leben in Deutschland – 310 Fragen', quellen: 'Prüfungsinfos & Quellen', simulation: 'Prüfungssimulationen', vorbereitung: 'Gezielte Vorbereitung', videos: 'Videos', 'ueber-mich': 'Über mich', impressum: 'Impressum', datenschutz: 'Datenschutz', pinnwand: 'Deine Meinung', material: 'Materialien', lernpakete: 'Lernpakete', lieder: 'Deutsch mit Liedern', musik: 'Musik zum Lernen' };
  const OWN = {
    '': () => home(),
    lernweg: p => p[1] ? pathPage(p[1]) : paths(),
    wegweiser: () => wegweiser(),
    lernen: p => lessonsPage(p[1]),
    ueben: p => p[1] ? practice(p[1], p[2], p[3]) : practiceHub(),
    schreiben: () => toolkit(),
    hoeren: p => p[1] ? listening(p[1], p[2]) : listeningHub(),
    lesen: p => p[1] ? reading(p[1], p[2]) : readingHub(),
    pruefung: p => exam(p[1]),
    videos: p => videos(p[1], p[2]),
    musik: () => musicPage(),
    'ueber-mich': p => { about(); fillMusic(mainEl); if (p[1] === 'nachweise') setTimeout(() => $('#nachweise')?.scrollIntoView({ behavior: 'smooth' }), 60); },
    impressum: () => impressum(),
    datenschutz: () => datenschutz(),
    pinnwand: p => feedback(p[1]),
    material: p => materials(p[1], p[2]),
    lernpakete: p => p[1] ? packagePage(p[1]) : packages(),
    kahoot: () => kahootPage(),
    lieder: p => p[1] === 'playlist' ? songPlaylist(p[2]) : p[1] && !SONG_LEVELS.includes(p[1]) ? songPage(p[1]) : songsHub(p[1])
  };
  const ALIAS = { meinung: 'pinnwand', buch: 'lernen', themen: 'lernen', cover: '', praxis: 'ueben', pruefungen: 'pruefung', start: '' };

  /* Zurück-Pfeil und Startseite auf jeder Unterseite */
  let navDepth = 0;
  window.addEventListener('hashchange', () => { navDepth++; });
  function parentOf(p) {
    const legacy = $('main a.back')?.getAttribute('href');
    if (legacy) return legacy;
    const links = $$('main .dm-crumbs a[href]').map(a => a.getAttribute('href'));
    if (links.length > 1) return links[links.length - 1];
    if (p.length > 2) return '#' + p.slice(0, -1).join('/');
    if (p.length === 2) return '#' + p[0];
    return '#';
  }
  const backBar = document.createElement('nav');
  backBar.className = 'dm-backbar'; backBar.setAttribute('aria-label', 'Zurück'); backBar.hidden = true;
  mainEl.before(backBar);
  function addBackBar(p) {
    backBar.hidden = p[0] === '';
    if (backBar.hidden) return;
    backBar.innerHTML = `<div class="dm-backbar-in"><a class="dm-back" href="${x(parentOf(p))}"><span aria-hidden="true">←</span> Zurück</a><a class="dm-home" href="#"><span aria-hidden="true">⌂</span> Startseite</a></div>`;
    backBar.querySelector('.dm-back').onclick = e => { if (navDepth > 0) { e.preventDefault(); navDepth -= 2; history.back(); } };
  }

  window.route = function () {
    let raw = decodeURIComponent(location.hash.slice(1)).replace(/^\/+/, '');
    let p = raw.split('/');
    if (p[0] in ALIAS) { p[0] = ALIAS[p[0]]; if (p[0] === '') p = ['']; if (p[0] === 'lernen' && p[1] === 'beruf') p[1] = 'B2'; }
    if (p[0] === 'lektion' && !p[1]) p = ['lernen'];
    if (p[0] === 'lernweg' && p[1] === 'everyday') p[1] = 'sprechen';
    if (p[0] === 'lernweg' && p[1] === 'writing') p[1] = 'schreiben';
    stopSpeaking();
    $$('audio').forEach(a => a.pause());
    document.body.dataset.learningLevel = '';
    const own = OWN[p[0]] || DM.routes[p[0]];
    if (own) { own(p); setupExamBox(p); }
    else { try { legacyRoute(); } catch (e) { console.error(e); home(); } afterLegacy(p); }
    hideMissingDownloads();
    unifyHead(p);
    addBackBar(p);
    const nav = NAV[p[0]] ?? '';
    $$('#main-navigation a[data-nav]').forEach(a => { const on = a.dataset.nav === nav; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const h1 = $('main h1')?.textContent.trim();
    document.title = (p[0] === '' ? 'Deutsch mit Dennis – kostenlos Deutsch lernen von A1 bis B2' : `${h1 && h1.length < 60 ? h1 : TITLES[p[0]] || 'Deutsch lernen'} – Deutsch mit Dennis`);
    $('header')?.classList.remove('menu-open');
    $('#pl-menu')?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
    revealCards();
    // Weitermachen merken: nur Lernseiten
    const routeStr = p.filter(Boolean).join('/');
    if (['lektion', 'wortschatz', 'ueben', 'hoeren', 'training', 'lernweg', 'orientierungskurs', 'lid', 'lieder', 'challenge', 'bild', 'spiele', 'vorbereitung', 'simulation'].includes(p[0]) && routeStr && p[2] !== 'run' && p[2] !== 'ergebnis') {
      mem.visited[routeStr] = Date.now();
      mem.last = { route: routeStr, title: (h1 || TITLES[p[0]] || '').replace(/\.$/, '').slice(0, 48), ts: Date.now() };
      save();
    }
  };

  /* Bilder, die nicht geladen werden können, ausblenden statt ein kaputtes Symbol zu zeigen */
  document.addEventListener('error', e => { const t = e.target; if (t && t.tagName === 'IMG' && t.closest('main')) { const f = t.closest('figure'); (f || t).hidden = true; } }, true);

  /* Menü: Schließen beim Klick außerhalb */
  document.addEventListener('click', e => { const hd = $('header'); if (hd?.classList.contains('menu-open') && !hd.contains(e.target)) { hd.classList.remove('menu-open'); $('#pl-menu')?.setAttribute('aria-expanded', 'false'); } });

  /* Sanftes Einblenden von Karten beim Scrollen (nur ohne „weniger Bewegung“) */
  const motionOK = window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window;
  const io = motionOK ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('dm-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -40px 0px' }) : null;
  function revealCards() {
    if (!io) return;
    $$('main .dm-card, main .dm-exam, main .lid-block, main .dm-mat, main .dm-pkg, main .card, main .oral-card').forEach((el, i) => {
      if (el.dataset.rv) return; el.dataset.rv = 1;
      if (el.getBoundingClientRect().top < innerHeight) return; // sichtbare Karten nicht verstecken
      el.classList.add('dm-rv'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el);
    });
  }

  /* Footer-Jahr */
  const y = $('#dm-year'); if (y) y.textContent = new Date().getFullYear();

  DM.page = page; DM.celebrate = celebrate; DM.art3d = art3d; DM.speechCoach = speechCoach; DM.bindSpeechCoach = bindSpeechCoach; DM.crumbs = crumbs; DM.note = note; DM.esc = x;
  route();
  ttsReady.then(() => { if (/^#(hoeren|ueben)/.test(location.hash)) route(); });
  DM.speak = speak; DM.loadVideos = loadVideos;
})();
