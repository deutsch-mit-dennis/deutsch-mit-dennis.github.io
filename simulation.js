/* Prüfungssimulationen (#simulation) und gezielte Vorbereitung (#vorbereitung).
   Inhalte: sim/<id>.js (Format: tools/sim/SCHEMA.md), werden erst bei Bedarf geladen.
   LiD-Simulation: Fragen aus window.LID_KATALOG (BAMF-Gesamtfragenkatalog).
   Fortschritt und Antworten bleiben nur im Browser (DM.store.sim). */
(() => {
  const V = '20261019a';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const e = s => DM.esc(s);
  const para = s => String(s ?? '').split(/\n+/).map(t => t.trim()).filter(Boolean).map(t => `<p>${e(t)}</p>`).join('');
  const mmss = s => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const words = t => (String(t || '').trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu) || []).length;
  const store = () => { const m = DM.store; m.sim ||= {}; return m.sim; };
  const save = () => DM.save();
  const main = () => $('main');

  /* ---------- Übersicht der Prüfungen ---------- */
  const META = {
    dtz: { short: 'DTZ', title: 'DTZ – Deutsch-Test für Zuwanderer', who: 'g.a.s.t. · A2–B1 · Integrationskurs', g: 'sun', total: 'ca. 2 Std.', secs: [['Hören', 25], ['Lesen', 45], ['Schreiben', 30], ['Sprechen', 16]] },
    lid: { short: 'LiD', title: 'Test „Leben in Deutschland“', who: 'Orientierungskurs · Einbürgerung', g: 'mint', total: '60 Min.', secs: [['33 Fragen', 60]] },
    'telc-b1': { short: 'telc B1', title: 'telc Deutsch B1 (Zertifikat Deutsch)', who: 'telc · B1 allgemein', g: 'sky', total: 'ca. 3 Std.', secs: [['Lesen + Sprachbausteine', 90], ['Hören', 30], ['Schreiben', 30], ['Sprechen', 15, 20]] },
    'dtb-b1': { short: 'DTB B1', title: 'DTB B1 – Deutsch-Test für den Beruf', who: 'telc · B1 Beruf', g: 'ink', total: 'ca. 2 Std.', secs: [['Lesen', 40], ['Lesen + Schreiben', 20], ['Hören', 20], ['Hören + Schreiben', 5], ['Sprachbausteine + Schreiben', 10], ['Sprechen', 16]] },
    'telc-b2': { short: 'telc B2', title: 'telc Deutsch B2', who: 'telc · B2 allgemein', g: 'sky', total: 'ca. 3 Std.', secs: [['Lesen + Sprachbausteine', 90], ['Hören', 20], ['Schreiben', 30], ['Sprechen', 15, 20]] },
    'dtb-b2': { short: 'DTB B2', title: 'DTB B2 – Deutsch-Test für den Beruf', who: 'telc · B2 Beruf', g: 'ink', total: 'ca. 2,5 Std.', secs: [['Lesen', 45], ['Lesen + Schreiben', 20], ['Hören', 20], ['Hören + Schreiben', 5], ['Sprachbausteine + Schreiben', 35], ['Sprechen', 16]] }
  };
  const ORDER = ['dtz', 'lid', 'telc-b1', 'dtb-b1', 'telc-b2', 'dtb-b2'];
  const PREP = ['telc-b1', 'telc-b2', 'dtb-b1', 'dtb-b2'];

  /* ---------- Daten laden ---------- */
  const loading = {};
  function load(id) {
    window.SIM ||= {};
    if (id === 'lid') return Promise.resolve(lidBase());
    if (SIM[id]) return Promise.resolve(SIM[id]);
    return loading[id] ||= new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = `sim/${id}.js?v=${V}`;
      s.onload = () => SIM[id] ? res(SIM[id]) : rej(new Error('leer'));
      s.onerror = () => { delete loading[id]; rej(new Error('Laden fehlgeschlagen')); };
      document.head.append(s);
    });
  }
  /* Nummern, Schlüssel und Skill-Summen einmal vorbereiten */
  function prepare(ex) {
    if (ex._ready) return ex;
    let n = 0;
    ex.sections.forEach((s, si) => s.parts.forEach((p, pi) => {
      p._key = `${si}.${pi}`; p._si = si;
      (p.items || []).forEach(it => { it._n = ++n; });
    }));
    ex._count = n; ex._ready = true;
    return ex;
  }

  /* ---------- LiD aus dem BAMF-Katalog ---------- */
  const LID_IMG = 'assets/lid-fragen/';
  function lidBase() {
    return {
      id: 'lid', title: 'Test „Leben in Deutschland“', short: 'LiD', provider: 'BAMF-Fragenkatalog', level: 'Orientierungskurs', rule: 'lid',
      intro: '33 Fragen aus dem offiziellen Gesamtfragenkatalog: 30 allgemeine Fragen und 3 Fragen zum Bundesland. Pro Frage ist genau eine Antwort richtig.',
      skills: { lid: { label: 'Richtige Antworten', max: 33 } },
      sections: [{ id: 'test', title: 'Test „Leben in Deutschland“', minutes: 60, parts: [{ title: '33 Fragen', skill: 'lid', pts: 1, instr: 'Kreuzen Sie bei jeder Frage die richtige Antwort an. Nur eine Antwort ist richtig.', items: [] }] }]
    };
  }
  function lidPick() {
    const K = window.LID_KATALOG || [];
    const gen = K.filter(q => typeof q.nr === 'number'), land = K.filter(q => typeof q.nr !== 'number');
    const shuf = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    return [...shuf(gen).slice(0, 30), ...shuf(land).slice(0, 3)].map(q => q.id);
  }
  function lidExam(st) {
    const K = window.LID_KATALOG || [];
    const by = Object.fromEntries(K.map(q => [q.id, q]));
    const ex = lidBase();
    ex.sections[0].parts[0].items = (st?.lidQs || []).map(id => by[id]).filter(Boolean).map(q => {
      const pic = q.img.length === 4 && /^Bild \d$/.test(q.a[0]);
      const nr = typeof q.nr === 'number' ? `Frage ${q.nr} aus dem Katalog` : q.nr.replace('NRW', 'Frage NRW');
      return { q: q.q, opts: q.a, a: q.s, why: `${nr}. Richtig: ${pic ? q.a[q.s] : q.a[q.s]}`, img: pic ? [] : q.img, optImg: pic ? q.img : null, nr };
    });
    return prepare(ex);
  }

  /* ---------- Stimmen (Gerät) bzw. Aufnahmen (MP3, falls vorhanden) ---------- */
  const synth = window.speechSynthesis;
  const FEM = /anna|petra|helena|katja|amala|seraphina|marlene|vicki|hedda|katharina|elke|female|frau|google deutsch$/i;
  const MAL = /markus|yannick|conrad|florian|stefan|killian|ralf|jonas|bernd|hans|male|mann/i;
  function pickVoices() {
    const vs = synth ? synth.getVoices().filter(v => /^de(-|_|$)/i.test(v.lang)) : [];
    const good = v => (/natural|neural|online/i.test(v.name) ? 3 : 0) + (/premium|enhanced/i.test(v.name) ? 2 : 0) + (/^google/i.test(v.name) ? 1 : 0);
    vs.sort((a, b) => good(b) - good(a));
    const f = vs.filter(v => FEM.test(v.name) && !MAL.test(v.name)), m = vs.filter(v => MAL.test(v.name));
    const any = vs[0] || null;
    return {
      n: { v: f[0] || any, p: 1 }, f: { v: f[0] || any, p: f[0] ? 1 : 1.15 }, f2: { v: f[1] || f[0] || any, p: f[1] ? 1 : 1.25 },
      m: { v: m[0] || any, p: m[0] ? 1 : 0.8 }, m2: { v: m[1] || m[0] || any, p: m[1] ? 1 : 0.9 }
    };
  }
  const normT = s => String(s ?? '').replace(/\s+/g, ' ').trim();
  const fnv = s => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(normT(s))) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return 't' + h.toString(16).padStart(8, '0'); };
  let playing = null;
  function stopAudio() {
    if (playing) { playing.cancelled = true; try { playing.audio?.pause(); } catch {} }
    playing = null;
    try { synth?.cancel(); } catch {}
  }
  function playLines(lines, done) {
    stopAudio();
    const job = { cancelled: false };
    playing = job;
    const finish = () => { if (playing === job) playing = null; done?.(!job.cancelled); };
    const src = DM.ttsSrc?.(fnv(lines.map(l => l.t).join(' ')));
    if (src) {
      job.audio = new Audio(src);
      job.audio.onended = finish; job.audio.onerror = () => { job.audio = null; viaSynth(); };
      job.audio.play().catch(() => { job.audio = null; viaSynth(); });
      return;
    }
    viaSynth();
    function viaSynth() {
      if (!synth) { finish(); return; }
      const V = pickVoices();
      const chunks = [];
      lines.forEach(l => String(l.t).split(/(?<=[.!?…])\s+/).reduce((acc, s) => { if (acc.length && (acc[acc.length - 1] + ' ' + s).length < 180) acc[acc.length - 1] += ' ' + s; else acc.push(s); return acc; }, []).forEach((t, i) => chunks.push({ s: l.s, t, pause: i === 0 })));
      let i = 0;
      const next = () => {
        if (job.cancelled) return;
        if (i >= chunks.length) { finish(); return; }
        const c = chunks[i++], cfg = V[c.s] || V.n;
        const u = new SpeechSynthesisUtterance(c.t);
        u.lang = 'de-DE'; u.rate = 0.95; u.pitch = cfg.p; if (cfg.v) u.voice = cfg.v;
        let moved = false;
        const go = ms => { if (moved) return; moved = true; clearTimeout(guard); setTimeout(next, ms); };
        const guard = setTimeout(() => go(0), 4000 + c.t.length * 110); // falls das Gerät kein Ende meldet
        u.onend = () => go(c.pause && i < chunks.length && chunks[i].pause ? 350 : 60);
        u.onerror = () => go(60);
        synth.speak(u);
      };
      try { synth.cancel(); } catch {}
      setTimeout(next, 120);
    }
  }
  /* Hinweis, solange zu Hörtexten noch keine Aufnahmen (MP3) vorhanden sind */
  const hasMp3 = a => !!DM.ttsSrc?.(fnv(a.lines.map(l => l.t).join(' ')));
  function voiceNote(s) {
    const clips = s.parts.flatMap(p => p.audio || []);
    if (!clips.length || clips.every(hasMp3)) return '';
    return '<p class="dm-small sim-voice">🔈 Einige Hörtexte liest noch die Stimme deines Geräts vor – die Aufnahmen mit natürlichen Stimmen folgen. Am natürlichsten klingt es in Chrome oder Edge.</p>';
  }
  const SPK = { n: 'Sprecher/in', f: 'Frau', f2: 'Frau 2', m: 'Mann', m2: 'Mann 2' };
  const transcript = a => `<div class="sim-trans">${a.lines.map(l => `<p><b>${SPK[l.s] || ''}:</b> ${e(l.t)}</p>`).join('')}</div>`;

  /* ---------- Bausteine: Material, Hörtexte, Aufgaben ---------- */
  function materialHTML(p, { local = false } = {}) {
    if (!p.material?.length) return '';
    const gapNo = k => { const it = p.items?.[k - 1]; return it ? (local ? k : it._n) : k; };
    const body = m => para(m.t).replace(/\{(\d+)\}/g, (_, k) => `<b class="sim-gap">(${gapNo(+k)})</b> ____`);
    const gaps = p.material.some(m => /\{\d+\}/.test(m.t));
    const box = gaps || p.material.length > 3 ? ' sim-mat-scroll' : '';
    return `<div class="sim-mat${box}${p.material.length > 3 ? ' sim-mat-grid' : ''}">${p.material.map(m => `<article class="sim-text">${m.h ? `<h4>${e(m.h)}</h4>` : ''}${body(m)}</article>`).join('')}</div>`;
  }
  const optsOf = (p, it) => it.opts || p.opts || [];
  function itemHTML(p, it, st, mode) {
    const opts = optsOf(p, it), n = mode === 'mini' ? it._mini : it._n;
    const chosen = st.ans[n];
    const review = mode === 'review' || (mode === 'mini' && chosen != null);
    const ok = chosen === it.a;
    const shared = !it.opts && p.opts && p.opts.length > 4;
    let ctl;
    if (shared && !review) {
      ctl = `<select class="sim-sel" data-n="${n}" aria-label="Antwort zu Aufgabe ${n}"><option value="">– wählen –</option>${opts.map((o, i) => `<option value="${i}" ${chosen === i ? 'selected' : ''}>${e(o)}</option>`).join('')}</select>`;
    } else if (shared && review) {
      ctl = `<p class="sim-rv">${chosen == null ? '<span class="sim-bad">keine Antwort</span>' : `Deine Antwort: <span class="${ok ? 'sim-good' : 'sim-bad'}">${e(opts[chosen])}</span>`}${ok ? '' : ` · Richtig: <span class="sim-good">${e(opts[it.a])}</span>`}</p>`;
    } else {
      ctl = `<div class="sim-opts${it.optImg ? ' sim-opts-pic' : ''}${opts.length === 2 ? ' sim-opts-2' : ''}" role="group">${opts.map((o, i) => {
        let c = 'sim-opt';
        if (review) { if (i === it.a) c += ' is-right'; else if (i === chosen) c += ' is-wrong'; }
        else if (i === chosen) c += ' is-on';
        const label = it.optImg ? `<img src="${LID_IMG}${e(it.optImg[i])}" alt="${e(o)}" loading="lazy"><span>${e(o)}</span>` : `<span>${e(o)}</span>`;
        return `<button type="button" class="${c}" data-n="${n}" data-i="${i}" ${review ? 'disabled' : ''} aria-pressed="${i === chosen}">${opts.length > 2 && !/^[a-z]\)/i.test(o) ? `<b>${'abcdefghijklmno'[i]}</b>` : ''}${label}</button>`;
      }).join('')}</div>`;
    }
    const img = it.img?.length ? `<figure class="sim-qimg">${it.img.map(f => `<img src="${LID_IMG}${e(f)}" alt="Abbildung zur Frage" loading="lazy">`).join('')}</figure>` : '';
    const why = review && it.why ? `<p class="sim-why">${ok && mode !== 'review' ? '✓ ' : ''}${e(it.why)}</p>` : '';
    const mark = review ? (ok ? '<span class="sim-mark is-ok" aria-label="richtig">✓</span>' : '<span class="sim-mark is-no" aria-label="falsch">✗</span>') : '';
    return `<div class="sim-item${review ? (ok ? ' rv-ok' : ' rv-no') : ''}" data-item="${n}"><p class="sim-q"><span class="sim-n">${mode === 'mini' ? it._lbl : n}</span>${mark}<span>${e(it.q || (/\{\d+\}/.test((p.material || []).map(m => m.t).join('')) ? `Lücke ${mode === 'mini' ? it._lbl : n}` : ''))}</span></p>${img}${ctl}${why}</div>`;
  }
  function clipHTML(p, a, ai, st, mode) {
    const key = `${p._key || 'm'}.${ai}`;
    const used = st.plays[key] || 0, max = mode === 'run' ? (p.plays || 1) : 99;
    const left = max - used;
    const label = mode === 'run' ? (left > 0 ? `${left === 1 ? 'noch 1×' : `noch ${left}×`} hören` : 'schon gehört') : '';
    return `<div class="sim-clip" data-clip="${key}" data-max="${max}"><button type="button" class="sim-play" ${left <= 0 ? 'disabled' : ''}><span aria-hidden="true">▶</span> ${e(a.h || 'Hörtext')}</button>${label ? `<small>${label}</small>` : ''}</div>`;
  }
  function partHTML(p, st, mode) {
    const items = p.items || [];
    const clipItems = new Set();
    let audio = '';
    if (p.audio?.length && p.kind !== 'write') {
      audio = `<div class="sim-audio">${p.audio.map((a, ai) => {
        const its = items.filter(it => it.au === ai); its.forEach(it => clipItems.add(it));
        return `<div class="sim-clipbox">${clipHTML(p, a, ai, st, mode)}${mode === 'review' ? `<details class="sim-det"><summary>Transkript</summary>${transcript(a)}</details>` : ''}${its.map(it => itemHTML(p, it, st, mode)).join('')}</div>`;
      }).join('')}</div>`;
    }
    const rest = items.filter(it => !clipItems.has(it));
    const shared = p.opts && p.opts.length > 4 && !items.some(it => it.opts);
    const interleave = shared && !p.audio?.length && p.material && p.material.length === rest.length && !p.material.some(m => /\{\d+\}/.test(m.t));
    const listAll = `<div class="sim-optlist"><b>Auswahl</b>${(p.opts || []).map(o => `<span>${e(o)}</span>`).join('')}</div>`;
    const optList = shared && mode !== 'review' && (interleave || p.audio?.length || !p.material?.some(m => /^[a-z]$/i.test(m.h || ''))) ? listAll : '';
    let body;
    if (interleave && mode !== 'review') {
      body = rest.map((it, i) => `<article class="sim-text">${p.material[i].h ? `<h4>${e(p.material[i].h)}</h4>` : ''}${para(p.material[i].t)}</article>${itemHTML(p, it, st, mode)}`).join('');
    } else {
      const mat = mode === 'review' && p.material?.length ? `<details class="sim-det"><summary>Text anzeigen</summary>${materialHTML(p)}</details>` : materialHTML(p, { local: mode === 'mini' });
      body = mat + rest.map(it => itemHTML(p, it, st, mode)).join('');
    }
    return optList + audio + body;
  }

  /* ---------- Übersicht #simulation ---------- */
  function hub() {
    const S = store();
    const card = id => {
      const m = META[id], st = S[id], last = (S[id + '_hist'] || []).slice(-1)[0];
      const status = st && !st.done ? `<span class="sim-badge">⏸ angefangen</span>` : last ? `<span class="sim-badge ${last.pass ? 'ok' : ''}">Letztes Ergebnis: ${last.pct} %</span>` : '';
      return `<a class="sim-card dm-g-${m.g}" href="#simulation/${id}"><span class="dm-tag">${e(m.who)}</span><b>${e(m.title)}</b><span class="sim-dur">⏱ ${e(m.total)}</span><span class="sim-secs">${m.secs.map(([t, min, prep]) => `<i>${e(t)} · ${min} Min.${prep ? ` (+${prep} Vorb.)` : ''}</i>`).join('')}</span>${status}</a>`;
    };
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Prüfungssimulationen']])}
      <div class="dm-head"><h1>Prüfungssimulationen</h1><p class="dm-lead">Sechs komplette Prüfungen zum Üben – mit der echten Zeit für jeden Prüfungsteil. Am Ende siehst du deine Punkte, ob du bestanden hättest und alle Lösungen mit Erklärung.</p></div>
      <div class="sim-grid">${ORDER.map(card).join('')}</div>
      <section class="dm-card sim-how"><h2>So läuft eine Simulation</h2>
        <ul class="sim-list">
          <li><b>⏱ Echte Zeit:</b> Jeder Prüfungsteil hat seine eigene Uhr. Ist die Zeit um, wird der Teil automatisch abgegeben.</li>
          <li><b>🔒 Wie in der Prüfung:</b> Nach der Abgabe kannst du nicht mehr zurück. Hörtexte hörst du nur so oft wie in der Prüfung.</li>
          <li><b>✍️ Schreiben:</b> mit Wortzähler. Danach vergleichst du mit dem Mustertext und bewertest dich mit einer Checkliste.</li>
          <li><b>🗣 Sprechen:</b> Die Prüferin bzw. die Partnerin wird vorgelesen. Du kannst dich aufnehmen und danach anhören.</li>
          <li><b>💾 Pause:</b> Dein Stand bleibt in diesem Browser gespeichert. Verlässt du die Seite, hält die Uhr an.</li>
        </ul>
        <p class="dm-small">Eigene Übungsaufgaben im Stil der Prüfungen – keine offiziellen Prüfungsaufgaben. Unabhängiges Angebot, nicht von g.a.s.t., telc oder BAMF. Kopfhörer und ein ruhiger Ort helfen.</p></section>
      <section class="dm-card"><h2>Erst gezielt vorbereiten?</h2><p>Für telc B1, telc B2, DTB B1 und DTB B2 gibt es Strategien für jeden Prüfungsteil, typische Fallen, Redemittel und einen 4-Wochen-Lernplan.</p><a class="dm-btn dm-btn-quiet" href="#vorbereitung">Zur gezielten Vorbereitung</a></section>`, 'sim-page');
  }

  /* ---------- Startseite einer Simulation ---------- */
  async function intro(id) {
    let ex;
    try { ex = prepare(await load(id)); } catch { return failPage(); }
    const st = store()[id];
    const m = META[id];
    const rows = ex.sections.map((s, si) => {
      const parts = s.parts.map(p => p.kind === 'write' ? `${p.title} (Schreiben)` : p.kind === 'speak' ? p.title : `${p.title}${id === 'lid' ? '' : ` · ${(p.items || []).length} Aufg.`}`);
      return `<li class="sim-step"><span class="sim-stepno">${si + 1}</span><div><b>${e(s.title)}</b> <span class="sim-min">⏱ ${s.minutes} Min.${s.prepMinutes ? ` + ${s.prepMinutes} Min. Vorbereitung` : ''}</span><ul>${parts.map(t => `<li>${e(t)}</li>`).join('')}</ul>${ex.id === 'lid' || ex.sections.length < 2 ? '' : `<button type="button" class="dm-btn dm-btn-quiet sim-single" data-single="${si}">Nur diesen Teil üben</button>`}</div></li>`;
    }).join('');
    const running = st && !st.done;
    const curSec = running ? ex.sections[st.secs[st.k]] : null;
    const hist = store()[id + '_hist'] || [];
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Simulationen', '#simulation'], [m.short]])}
      <div class="dm-head"><span class="dm-tag">${e(m.who)}</span><h1>Simulation: ${e(ex.title)}</h1><p class="dm-lead">${e(ex.intro)}</p></div>
      ${running ? `<aside class="dm-card sim-resume"><b>Du bist mitten in der Simulation.</b> <span>${e(curSec.title)} – noch ${mmss(st.left)} Min.${st.phase === 'break' ? ' (Pause vor dem nächsten Teil)' : ''}</span><div class="dm-row"><a class="dm-btn" href="#simulation/${id}/run">▶ Fortsetzen</a><button type="button" class="dm-btn dm-btn-quiet" id="sim-new">Neu beginnen</button></div></aside>` : ''}
      <h2 class="sim-h2">Ablauf der Prüfung</h2><ol class="sim-steps">${rows}</ol>
      ${ruleBox(ex)}
      ${id === 'lid' ? `<p class="dm-small">Für die drei Bundesland-Fragen nimmt die Simulation die Fragen für Nordrhein-Westfalen.</p>` : ''}
      <div class="dm-row sim-start">${running ? '' : `<button type="button" class="dm-btn" id="sim-go">▶ Simulation starten (${e(m.total)})</button>`}${PREP.includes(id) ? `<a class="dm-btn dm-btn-quiet" href="#vorbereitung/${id}">Gezielte Vorbereitung</a>` : ''}</div>
      ${hist.length ? `<section class="dm-card"><h2>Deine Ergebnisse</h2><ul class="sim-hist">${hist.slice(-5).reverse().map(h => `<li><span>${new Date(h.date).toLocaleDateString('de-DE')}</span><b>${h.pct} %</b><span>${h.pass ? '✓ bestanden' : h.single ? 'einzelner Teil' : '✗ noch nicht bestanden'}</span></li>`).join('')}</ul></section>` : ''}
      <p class="dm-small">Eigene Übungsaufgaben im Stil der Prüfung – keine offiziellen Aufgaben.</p>
      ${id === 'lid' ? window.LID_QUELLE_HTML || '' : ''}`, 'sim-page');
    $('#sim-go')?.addEventListener('click', () => begin(id, ex, 'full'));
    $('#sim-new')?.addEventListener('click', ev => { const b = ev.currentTarget; if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Wirklich? Dein Stand wird gelöscht.'; return; } delete store()[id]; save(); intro(id); });
    $$('[data-single]').forEach(b => b.addEventListener('click', () => begin(id, ex, 'single', +b.dataset.single)));
  }
  function ruleBox(ex) {
    const R = {
      dtz: 'Bewertet werden Hören und Lesen zusammen (45 Punkte), Schreiben (20) und Sprechen (100). Für B1: ab 33 Punkten in Hören/Lesen, ab 15 im Schreiben, ab 75 im Sprechen. Für das Zertifikat B1 brauchst du B1 im Sprechen und B1 in Hören/Lesen oder Schreiben (für A2 entsprechend).',
      telc: 'Insgesamt 300 Punkte. Bestanden hast du mit mindestens 60 % in der schriftlichen Prüfung (135 von 225 Punkten) und mindestens 60 % in der mündlichen Prüfung (45 von 75 Punkten).',
      dtb: 'Insgesamt 240 Punkte, je 60 für Lesen, Hören, Schreiben und Sprechen. Bestanden: mindestens 144 Punkte (60 %), dabei in drei Fertigkeiten mindestens 60 % und in der schwächsten mindestens 40 %.',
      lid: '33 Fragen, 60 Minuten. Mit mindestens 15 richtigen Antworten ist der Test bestanden (Orientierungskurs). Für die Einbürgerung brauchst du mindestens 17 richtige Antworten.'
    };
    return `<aside class="dm-card sim-rule"><b>So wird bewertet</b><p>${e(R[ex.rule])}</p></aside>`;
  }
  function failPage() {
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Simulationen', '#simulation'], ['Fehler']])}<div class="dm-head"><h1>Die Simulation lädt nicht.</h1><p class="dm-lead">Bitte prüfe deine Internetverbindung und lade die Seite neu.</p></div><a class="dm-btn" href="#simulation">Zur Übersicht</a>`);
  }

  /* ---------- Ablauf ---------- */
  function begin(id, ex, mode, si) {
    stopAll();
    const st = { v: 1, mode, secs: mode === 'full' ? ex.sections.map((_, i) => i) : [si], k: 0, left: 0, phase: '', ans: {}, write: {}, rate: {}, plays: {}, prompt: {}, notes: {}, started: Date.now(), done: false };
    if (id === 'lid') { st.lidQs = lidPick(); }
    startSection(ex, st);
    store()[id] = st; save();
    location.hash = `#simulation/${id}/run`;
  }
  function startSection(ex, st) {
    const s = ex.sections[st.secs[st.k]];
    if (s.prepMinutes) { st.phase = 'prep'; st.left = s.prepMinutes * 60; }
    else { st.phase = 'work'; st.left = s.minutes * 60; }
  }
  let timer = null, lastTick = 0, cur = null;
  function stopAll() { clearInterval(timer); timer = null; stopAudio(); stopRec(); cur = null; }
  window.addEventListener('hashchange', () => {
    if (cur && !/^#simulation\/[^/]+\/run/.test(location.hash)) { save(); stopAll(); }
    stopAudio();
    if (!/^#\/?(simulation|vorbereitung)(\/|$)/.test(location.hash)) { const m = main(); if (m) { m.onclick = null; m.onchange = null; m.oninput = null; } miniCtx = null; }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && cur) save(); });

  async function run(id) {
    let ex;
    try { ex = await load(id); } catch { return failPage(); }
    const st = store()[id];
    if (!st || st.done) { location.replace(`#simulation/${id}`); return; }
    if (id === 'lid') ex = lidExam(st); else prepare(ex);
    stopAll();
    cur = { id, ex, st };
    draw();
  }
  function draw() {
    const { id, ex, st } = cur;
    const s = ex.sections[st.secs[st.k]];
    const total = st.secs.length;
    if (st.phase === 'break') return drawBreak();
    const isPrep = st.phase === 'prep';
    const parts = s.parts;
    const chips = parts.map((p, pi) => `<a href="#" data-goto="sim-p${pi}" class="sim-chip">${e(shortTitle(p.title))}<small data-count="${pi}"></small></a>`).join('');
    DM.page(`<div class="sim-bar" role="region" aria-label="Prüfungsuhr">
        <div class="sim-bar-t"><small>${e(META[id].short)} · ${total > 1 ? `Teil ${st.k + 1} von ${total}` : 'einzelner Teil'}</small><b>${isPrep ? 'Vorbereitung: ' : ''}${e(s.title)}</b></div>
        <div class="sim-clock" id="sim-clock" aria-live="off">${mmss(st.left)}</div>
        <button type="button" class="dm-btn sim-submit" id="sim-submit">${isPrep ? 'Vorbereitung beenden' : 'Abgeben'}</button>
      </div>
      ${parts.length > 1 && !isPrep ? `<nav class="sim-chips" aria-label="Teile">${chips}</nav>` : ''}
      ${s.note && !isPrep ? `<p class="sim-note">${e(s.note)}</p>` : ''}${isPrep ? '' : voiceNote(s)}
      ${isPrep ? `<aside class="dm-card sim-rule"><b>Vorbereitungszeit (${s.prepMinutes} Min.)</b><p>Lies alle Aufgaben und mach dir Notizen. In der Prüfung darfst du die Notizen benutzen – aber keine ganzen Sätze vorlesen. Danach beginnt das Gespräch.</p></aside>` : ''}
      <div class="sim-parts" data-nocheck>${parts.map((p, pi) => `<section class="sim-part" id="sim-p${pi}" data-key="${p._key}"><h2>${e(p.title)}${p.kind === 'speak' ? ` <small>ca. ${p.minutes} Min.</small>` : ''}</h2><p class="sim-instr">${e(instrOf(p))}</p>${p.kind === 'write' ? writeHTML(p, st) : p.kind === 'speak' ? speakHTML(p, st, isPrep) : partHTML(p, st, 'run')}</section>`).join('')}</div>
      <div class="sim-end"><button type="button" class="dm-btn" id="sim-submit2">${isPrep ? 'Vorbereitung beenden – Gespräch beginnen' : `${e(s.title)} abgeben`}</button><p class="dm-small" id="sim-open"></p></div>`, 'sim-page sim-run');
    bindRun();
    counts();
    stickTop();
    tickStart();
  }
  /* „Lücken 1–10“ in der Anweisung an die echte Nummerierung anpassen (z. B. 21–30) */
  function instrOf(p) {
    const its = p.items || [];
    if (!its.length || its[0]._n === 1) return p.instr;
    const a = its[0]._n, b = its[its.length - 1]._n;
    return String(p.instr).replace(/\b1\s*[–-]\s*(\d+)\b/g, (m, n) => +n === its.length ? `${a}–${b}` : m);
  }
  function stickTop() {
    const h = document.querySelector('header.dm-header');
    const top = h && getComputedStyle(h).position === 'sticky' ? Math.round(h.getBoundingClientRect().height) : 0;
    main()?.style.setProperty('--sim-top', top + 'px');
  }
  const shortTitle = t => String(t).replace(/^(Leseverstehen|Hörverstehen|Sprachbausteine)\s+/i, (m, a) => ({ leseverstehen: 'Lesen ', hörverstehen: 'Hören ', sprachbausteine: 'SB ' }[a.toLowerCase()])).replace(/:.*$/, '').slice(0, 24);
  function drawBreak() {
    const { id, ex, st } = cur;
    const prev = ex.sections[st.secs[st.k - 1]], next = ex.sections[st.secs[st.k]];
    DM.page(`<div class="sim-break dm-card"><p class="sim-big">✓</p><h1>${e(prev.title)} abgegeben</h1>
      <p class="dm-lead">Als Nächstes: <b>${e(next.title)}</b> – ${next.minutes} Minuten${next.prepMinutes ? ` (vorher ${next.prepMinutes} Minuten Vorbereitung)` : ''}.</p>
      ${next.parts.some(p => p.audio) ? `<p>🎧 Setz am besten Kopfhörer auf. Jeden Hörtext darfst du nur so oft hören wie in der Prüfung.</p>${voiceNote(next)}` : ''}
      ${next.parts.some(p => p.kind === 'speak') ? '<p>🗣 Die Prüferin bzw. Partnerin wird vorgelesen. Sprich laut – am besten nimmst du dich auf.</p>' : ''}
      <p class="dm-small">Die Uhr startet erst, wenn du weitermachst. Kurze Pause? Trink etwas Wasser.</p>
      <button type="button" class="dm-btn" id="sim-next">Weiter: ${e(next.title)}</button></div>`, 'sim-page');
    $('#sim-next').onclick = () => { startSection(ex, st); save(); draw(); };
  }
  function tickStart() {
    clearInterval(timer); lastTick = Date.now(); let n = 0;
    timer = setInterval(() => {
      if (!cur) return;
      const now = Date.now(), d = Math.floor((now - lastTick) / 1000);
      if (d < 1) return;
      lastTick += d * 1000;
      cur.st.left = Math.max(0, cur.st.left - d);
      paintClock();
      if (++n % 5 === 0) save();
      if (cur.st.left <= 0) timeUp();
    }, 250);
    paintClock();
  }
  function paintClock() {
    const c = $('#sim-clock'); if (!c || !cur) return;
    const l = cur.st.left;
    c.textContent = mmss(l);
    c.classList.toggle('is-warn', l <= 300 && l > 60);
    c.classList.toggle('is-alarm', l <= 60);
    if (l === 300 || l === 60) toast(l === 300 ? 'Noch 5 Minuten.' : 'Noch 1 Minute.');
  }
  function timeUp() {
    const { st } = cur;
    clearInterval(timer);
    if (st.phase === 'prep') { toast('Die Vorbereitungszeit ist vorbei. Jetzt beginnt das Gespräch.'); endPrep(); return; }
    toast('Die Zeit ist um. Dieser Teil wurde abgegeben.');
    finishSection();
  }
  function endPrep() {
    const { ex, st } = cur; const s = ex.sections[st.secs[st.k]];
    st.phase = 'work'; st.left = s.minutes * 60; save(); draw();
  }
  function finishSection() {
    const { id, ex, st } = cur;
    stopAudio(); stopRec();
    st.k++;
    if (st.k >= st.secs.length) {
      st.done = true; st.finished = Date.now();
      const r = score(ex, st);
      const hist = store()[id + '_hist'] ||= [];
      hist.push({ date: Date.now(), pct: r.pct, pass: r.verdict?.pass || false, single: st.mode === 'single' });
      if (hist.length > 20) hist.splice(0, hist.length - 20);
      save(); clearInterval(timer); cur = null;
      location.hash = `#simulation/${id}/ergebnis`;
      return;
    }
    st.phase = 'break'; save(); clearInterval(timer); draw();
  }
  function counts() {
    if (!cur) return;
    const { ex, st } = cur; const s = ex.sections[st.secs[st.k]];
    let open = 0;
    s.parts.forEach((p, pi) => {
      const its = p.items || []; const done = its.filter(it => st.ans[it._n] != null).length; open += its.length - done;
      const el = $(`[data-count="${pi}"]`);
      if (el) el.textContent = its.length ? ` ${done}/${its.length}` : p.kind === 'write' ? ` ${words(st.write[p._key]?.text)} W.` : '';
    });
    const o = $('#sim-open'); if (o) o.textContent = open ? `Noch ${open} Aufgabe${open === 1 ? '' : 'n'} ohne Antwort.` : st.phase === 'prep' ? '' : 'Alle Aufgaben beantwortet.';
  }
  function bindRun() {
    const m = main();
    const submit = btn => {
      const { st } = cur;
      if (st.phase === 'prep') { endPrep(); return; }
      const open = $$('.sim-item', m).filter(el => cur.st.ans[el.dataset.item] == null).length;
      if (!btn.dataset.sure) {
        const btns = $$('#sim-submit,#sim-submit2'), old = btns.map(b => b.textContent);
        btns.forEach(b => { b.dataset.sure = 1; b.textContent = open ? `Wirklich abgeben? ${open} offen` : 'Wirklich abgeben?'; b.classList.add('dm-btn-sun'); });
        setTimeout(() => btns.forEach((b, i) => { if (!b.isConnected) return; delete b.dataset.sure; b.textContent = old[i]; b.classList.remove('dm-btn-sun'); }), 5000);
        return;
      }
      finishSection();
    };
    $('#sim-submit').onclick = ev => submit(ev.currentTarget);
    $('#sim-submit2').onclick = ev => submit(ev.currentTarget);
    m.onclick = ev => {
      const t = ev.target;
      const go = t.closest('[data-goto]');
      if (go) { ev.preventDefault(); $('#' + go.dataset.goto)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      const opt = t.closest('.sim-opt');
      if (opt && !opt.disabled) { choose(+opt.dataset.n, +opt.dataset.i, opt); return; }
      const play = t.closest('.sim-play');
      if (play && !play.disabled) { playClip(play); return; }
      const ask = t.closest('.sim-ask');
      if (ask) { askNext(ask); return; }
      const rec = t.closest('.sim-recbtn');
      if (rec) { toggleRec(rec); return; }
    };
    m.onchange = ev => {
      const t = ev.target;
      if (t.matches('.sim-sel')) { choose(+t.dataset.n, t.value === '' ? null : +t.value); }
      if (t.matches('[data-wopt]')) { const key = t.dataset.wopt; (cur.st.write[key] ||= {}).opt = +t.value; save(); $$(`[data-wtask="${key}"]`).forEach(el => { el.hidden = +el.dataset.i !== +t.value; }); }
    };
    m.oninput = ev => {
      const t = ev.target;
      if (t.matches('[data-w]')) { const key = t.dataset.w; (cur.st.write[key] ||= {}).text = t.value; const wc = $(`[data-wc="${key}"]`); if (wc) wc.textContent = words(t.value); throttleSave(); counts(); }
      if (t.matches('[data-notes]')) { cur.st.notes[t.dataset.notes] = t.value; throttleSave(); }
    };
  }
  let sv = null; const throttleSave = () => { clearTimeout(sv); sv = setTimeout(save, 800); };
  function choose(n, i, btn) {
    const { st } = cur;
    if (i == null) delete st.ans[n]; else st.ans[n] = i;
    if (btn) $$(`.sim-opt[data-n="${n}"]`).forEach(b => { const on = +b.dataset.i === i; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    throttleSave(); counts();
  }
  function findClip(ex, key) { const [si, pi, ai] = key.split('.').map(Number); return ex.sections[si]?.parts[pi]?.audio?.[ai]; }
  function playClip(btn) {
    const box = btn.closest('.sim-clip'), key = box.dataset.clip, max = +box.dataset.max;
    if (btn.classList.contains('is-playing')) { stopAudio(); btn.classList.remove('is-playing'); btn.firstElementChild.textContent = '▶'; return; }
    const ctx = cur || miniCtx; if (!ctx) return;
    const a = ctx.clip ? ctx.clip(key) : findClip(ctx.ex, key); if (!a) return;
    const st = ctx.st;
    st.plays[key] = (st.plays[key] || 0) + 1; if (cur) save();
    const left = max - st.plays[key];
    $$('.sim-play.is-playing').forEach(b => { b.classList.remove('is-playing'); b.firstElementChild.textContent = '▶'; });
    btn.classList.add('is-playing'); btn.firstElementChild.textContent = '■';
    const small = box.querySelector('small');
    playLines(a.lines, () => {
      btn.classList.remove('is-playing'); btn.firstElementChild.textContent = '▶';
      if (max < 99) { btn.disabled = left <= 0; if (small) small.textContent = left > 0 ? `noch ${left}× hören` : 'schon gehört'; }
    });
    if (small && max < 99) small.textContent = 'läuft …';
  }

  /* ---------- Schreiben ---------- */
  function writeHTML(p, st) {
    const w = st.write[p._key] || {};
    const sel = w.opt ?? 0;
    const audio = p.audio?.length ? `<div class="sim-audio">${p.audio.map((a, ai) => `<div class="sim-clipbox">${clipHTML(p, a, ai, st, 'run')}</div>`).join('')}</div>` : '';
    const choose = p.options.length > 1 ? `<fieldset class="sim-wchoose"><legend>Wähle eine Aufgabe</legend>${p.options.map((o, i) => `<label><input type="radio" name="w-${p._key}" value="${i}" data-wopt="${p._key}" ${i === sel ? 'checked' : ''}> ${e(o.h || `Aufgabe ${'AB'[i]}`)}</label>`).join('')}</fieldset>` : '';
    const tasks = p.options.map((o, i) => `<div class="sim-wtask dm-card" data-wtask="${p._key}" data-i="${i}" ${i === sel ? '' : 'hidden'}>${o.h && p.options.length > 1 ? `<h3>${e(o.h)}</h3>` : ''}${o.situation ? `<div class="sim-situation">${para(o.situation)}</div>` : ''}${para(o.task)}${o.points?.length ? `<ul class="sim-points">${o.points.map(x => `<li>${e(x)}</li>`).join('')}</ul>` : ''}</div>`).join('');
    return `${materialHTML(p)}${audio}${choose}${tasks}
      <label class="sim-wlabel" for="w-${p._key}">Dein Text</label>
      <textarea id="w-${p._key}" class="sim-textarea" data-w="${p._key}" rows="12" spellcheck="false" autocomplete="off" autocapitalize="sentences">${e(w.text || '')}</textarea>
      <p class="sim-wc">Wörter: <b data-wc="${p._key}">${words(w.text)}</b>${p.minWords ? ` · mindestens ${p.minWords}` : ''}</p>`;
  }

  /* ---------- Sprechen ---------- */
  const recs = {};
  let recorder = null, recKey = null, recChunks = [];
  function stopRec() { try { recorder?.state === 'recording' && recorder.stop(); } catch {} }
  async function toggleRec(btn) {
    const key = btn.dataset.rec;
    if (recorder && recorder.state === 'recording') { const same = recKey === key; stopRec(); if (same) return; }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Aufnehmen geht in diesem Browser leider nicht.'); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch { toast('Kein Zugriff auf das Mikrofon.'); return; }
    recChunks = []; recKey = key;
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = ev => ev.data.size && recChunks.push(ev.data);
    recorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const url = URL.createObjectURL(new Blob(recChunks, { type: recorder.mimeType || 'audio/webm' }));
      recs[(cur?.id || '') + key] = url;
      const box = $(`[data-recbox="${key}"]`);
      if (box) box.innerHTML = `<audio controls src="${url}"></audio>`;
      $$(`.sim-recbtn[data-rec="${key}"]`).forEach(b => { b.textContent = '🎙 Neu aufnehmen'; b.classList.remove('is-rec'); });
    };
    recorder.start();
    btn.textContent = '■ Aufnahme stoppen'; btn.classList.add('is-rec');
  }
  function speakHTML(p, st, isPrep) {
    const key = p._key, n = st.prompt[key] || 0, total = (p.prompts || []).length;
    const canRec = !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
    const url = recs[(cur?.id || '') + key];
    return `<div class="sim-taskcard">${para(p.task)}</div>${materialHTML(p)}
      ${isPrep ? `<label class="sim-wlabel" for="n-${key}">Deine Notizen (Stichpunkte)</label><textarea id="n-${key}" class="sim-textarea sim-notes" data-notes="${key}" rows="4">${e(st.notes[key] || '')}</textarea>`
        : `${st.notes[key] ? `<details class="sim-det"><summary>Deine Notizen</summary><p class="sim-pre">${e(st.notes[key])}</p></details>` : ''}
        ${total ? `<div class="sim-prompts"><button type="button" class="dm-btn dm-btn-quiet sim-ask" data-key="${key}" ${n >= total ? 'disabled' : ''}>${n === 0 ? '▶ Gespräch beginnen' : n >= total ? 'Alle Fragen gestellt' : `▶ Nächste Äußerung (${n + 1}/${total})`}</button><p class="sim-said" data-said="${key}">${n ? `<b>Gesprächspartner/in:</b> ${e(p.prompts[n - 1])}` : 'Die Prüferin oder deine Partnerin spricht. Antworte laut.'}</p></div>` : ''}
        <div class="sim-recrow">${canRec ? `<button type="button" class="dm-btn dm-btn-quiet sim-recbtn" data-rec="${key}">${url ? '🎙 Neu aufnehmen' : '🎙 Mich aufnehmen'}</button>` : '<span class="dm-small">Aufnehmen ist in diesem Browser nicht möglich.</span>'}<span data-recbox="${key}">${url ? `<audio controls src="${url}"></audio>` : ''}</span></div>`}
      ${p.redemittel?.length ? `<details class="sim-det"><summary>Hilfe: Redemittel</summary><ul class="sim-chiplist">${p.redemittel.map(r => `<li>${e(r)}</li>`).join('')}</ul></details>` : ''}`;
  }
  function askNext(btn) {
    const key = btn.dataset.key;
    const [si, pi] = key.split('.').map(Number);
    const p = cur.ex.sections[si].parts[pi];
    const st = cur.st; const n = st.prompt[key] || 0;
    if (n >= p.prompts.length) return;
    const text = p.prompts[n];
    st.prompt[key] = n + 1; save();
    const said = $(`[data-said="${key}"]`); if (said) said.innerHTML = `<b>Gesprächspartner/in:</b> ${e(text)}`;
    const left = p.prompts.length - n - 1;
    btn.textContent = left ? `▶ Nächste Äußerung (${n + 2}/${p.prompts.length})` : 'Alle Fragen gestellt';
    btn.disabled = !left;
    playLines([{ s: 'f', t: text }]);
  }

  /* ---------- Auswertung ---------- */
  function partScore(p, st) {
    if (p.kind === 'write' || p.kind === 'speak') {
      const r = st.rate[p._key];
      if (!r) return { got: 0, max: p.pts, rated: false };
      const ok = r.filter(Boolean).length;
      let got = p.pts * ok / p.check.length;
      if (p.kind === 'write' && p.minWords && words(st.write[p._key]?.text) < p.minWords * 0.5) got = Math.min(got, p.pts * 0.25);
      return { got, max: p.pts, rated: true };
    }
    const its = p.items || [];
    const ok = its.filter(it => st.ans[it._n] === it.a).length;
    return { got: ok * p.pts, max: its.length * p.pts, rated: true, ok, n: its.length };
  }
  function score(ex, st) {
    const sk = {}, raw = {};
    let unrated = 0;
    st.secs.forEach(si => ex.sections[si].parts.forEach(p => {
      const r = partScore(p, st);
      if (!r.rated) unrated++;
      raw[p.skill] ||= { got: 0, max: 0 };
      raw[p.skill].got += r.got; raw[p.skill].max += r.max;
    }));
    for (const [k, v] of Object.entries(ex.skills)) {
      if (!raw[k]) continue;
      const full = st.mode === 'full';
      const max = full ? v.max : raw[k].max;
      const got = full && raw[k].max ? raw[k].got / raw[k].max * v.max : raw[k].got;
      sk[k] = { label: v.label, got: Math.round(got * 2) / 2, max };
    }
    const sum = Object.values(sk).reduce((a, b) => a + b.got, 0), mx = Object.values(sk).reduce((a, b) => a + b.max, 0);
    const pct = mx ? Math.round(sum / mx * 100) : 0;
    const verdict = st.mode === 'full' ? judge(ex.rule, sk) : null;
    return { sk, pct, verdict, unrated, sum, mx };
  }
  function judge(rule, sk) {
    const g = k => sk[k]?.got || 0;
    if (rule === 'lid') {
      const n = g('lid');
      return { pass: n >= 15, head: n >= 17 ? 'Bestanden – auch für die Einbürgerung' : n >= 15 ? 'Bestanden (Orientierungskurs)' : 'Noch nicht bestanden', lines: [`${n} von 33 richtig. Bestanden ab 15 richtigen Antworten, für die Einbürgerung ab 17.`] };
    }
    if (rule === 'telc') {
      const w = g('lesen') + g('sb') + g('hoeren') + g('schreiben'), m = g('muendlich');
      const pass = w >= 135 && m >= 45;
      return { pass, head: pass ? 'Bestanden' : 'Noch nicht bestanden', lines: [`Schriftliche Prüfung: ${fmt(w)} von 225 Punkten (nötig: 135) ${w >= 135 ? '✓' : '✗'}`, `Mündliche Prüfung: ${fmt(m)} von 75 Punkten (nötig: 45) ${m >= 45 ? '✓' : '✗'}`] };
    }
    if (rule === 'dtb') {
      const ks = ['lesen', 'hoeren', 'schreiben', 'sprechen'], vals = ks.map(g), tot = vals.reduce((a, b) => a + b, 0);
      const strong = vals.filter(v => v >= 36).length, weakest = Math.min(...vals);
      const pass = tot >= 144 && strong >= 3 && weakest >= 24;
      return { pass, head: pass ? 'Bestanden' : 'Noch nicht bestanden', lines: [`Gesamt: ${fmt(tot)} von 240 Punkten (nötig: 144) ${tot >= 144 ? '✓' : '✗'}`, `Fertigkeiten mit mindestens 60 %: ${strong} von 4 (nötig: 3) ${strong >= 3 ? '✓' : '✗'}`, `Schwächste Fertigkeit: ${fmt(weakest)} von 60 (nötig: 24) ${weakest >= 24 ? '✓' : '✗'}`] };
    }
    if (rule === 'dtz') {
      const lv = (v, b1, a2) => v >= b1 ? 'B1' : v >= a2 ? 'A2' : 'unter A2';
      const hl = lv(g('hl'), 33, 20), s = lv(g('s'), 15, 7), m = lv(g('m'), 75, 35);
      const rank = { B1: 2, A2: 1, 'unter A2': 0 };
      const best = Math.max(rank[hl], rank[s]);
      const total = Math.min(rank[m], best);
      const res = ['unter A2', 'A2', 'B1'][total];
      return { pass: total >= 1, head: total === 2 ? 'Ergebnis: B1' : total === 1 ? 'Ergebnis: A2' : 'Noch kein Zertifikat', lines: [`Hören und Lesen: ${fmt(g('hl'))} von 45 → ${hl}`, `Schreiben: ${fmt(g('s'))} von 20 → ${s}`, `Sprechen: ${fmt(g('m'))} von 100 → ${m}`, `Gesamtergebnis: ${res} (Sprechen zählt immer, dazu das bessere Ergebnis aus Hören/Lesen oder Schreiben).`] };
    }
    return null;
  }
  const fmt = n => String(Math.round(n * 2) / 2).replace('.', ',');

  async function result(id) {
    let ex;
    try { ex = await load(id); } catch { return failPage(); }
    const st = store()[id];
    if (!st) { location.replace(`#simulation/${id}`); return; }
    if (!st.done) { location.replace(`#simulation/${id}/run`); return; }
    if (id === 'lid') ex = lidExam(st); else prepare(ex);
    stopAll();
    const ctx = { id, ex, st };
    const paint = () => {
      const r = score(ex, st);
      const bars = Object.entries(r.sk).map(([k, v]) => { const pc = v.max ? Math.round(v.got / v.max * 100) : 0; return `<li><span>${e(v.label)}</span><span class="sim-barbg"><i style="width:${pc}%" class="${pc >= 60 ? 'ok' : pc >= 40 ? 'mid' : 'low'}"></i></span><b>${fmt(v.got)} / ${v.max}</b></li>`; }).join('');
      $('#sim-sum').innerHTML = `${r.verdict ? `<div class="sim-verdict ${r.verdict.pass ? 'ok' : 'no'}"><b>${e(r.verdict.head)}</b>${r.verdict.lines.map(l => `<span>${e(l)}</span>`).join('')}</div>` : `<div class="sim-verdict"><b>${r.pct} % richtig</b><span>Einzelner Prüfungsteil – für ein Gesamtergebnis mach die ganze Simulation.</span></div>`}
        <ul class="sim-bars">${bars}</ul>
        ${r.unrated ? `<p class="sim-hint">✍️ Noch ${r.unrated} Schreib- bzw. Sprechaufgabe${r.unrated === 1 ? '' : 'n'} ohne Bewertung (zählt bis dahin mit 0 Punkten). Bewerte dich unten mit der Checkliste.</p>` : '<p class="dm-small">Schreiben und Sprechen hast du selbst bewertet – das ist eine Schätzung. Sei ehrlich streng, dann ist das Ergebnis realistisch.</p>'}`;
      const hist = store()[id + '_hist']; if (hist?.length) { hist[hist.length - 1].pct = r.pct; hist[hist.length - 1].pass = r.verdict?.pass || false; }
    };
    const sections = st.secs.map(si => {
      const s = ex.sections[si];
      return `<details class="sim-rsec" open><summary><h2>${e(s.title)}</h2></summary>${s.parts.map(p => {
        const ps = partScore(p, st);
        const head = `<h3>${e(p.title)} ${ps.n != null ? `<small>${ps.ok} von ${ps.n} richtig</small>` : ''}</h3>${p.kind ? '' : `<p class="sim-instr">${e(instrOf(p))}</p>`}`;
        if (p.kind === 'write') return `<section class="sim-part">${head}${reviewWrite(p, st)}</section>`;
        if (p.kind === 'speak') return `<section class="sim-part">${head}${reviewSpeak(p, st, id)}</section>`;
        return `<section class="sim-part">${head}${partHTML(p, st, 'review')}</section>`;
      }).join('')}</details>`;
    }).join('');
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Simulationen', '#simulation'], [META[id].short, `#simulation/${id}`], ['Ergebnis']])}
      <div class="dm-head"><h1>Dein Ergebnis: ${e(META[id].short)}</h1><p class="dm-lead">${st.mode === 'full' ? 'Simulation vollständig.' : 'Einzelner Prüfungsteil.'} Unten findest du alle Lösungen mit Erklärung.</p></div>
      <section class="dm-card sim-sum" id="sim-sum" aria-live="polite"></section>
      <div class="dm-row sim-tools"><label class="sim-toggle"><input type="checkbox" id="sim-only"> Nur Fehler zeigen</label><button type="button" class="dm-btn dm-btn-quiet" id="sim-again">Neue Simulation</button><a class="dm-btn dm-btn-quiet" href="#simulation">Alle Simulationen</a>${PREP.includes(id) ? `<a class="dm-btn dm-btn-quiet" href="#vorbereitung/${id}">Gezielt üben</a>` : ''}</div>
      <div class="sim-review">${sections}</div>
      ${id === 'lid' ? window.LID_QUELLE_HTML || '' : '<p class="dm-small">Eigene Übungsaufgaben im Stil der Prüfung – keine offiziellen Aufgaben. Die Bewertung ist eine Schätzung.</p>'}`, 'sim-page');
    paint();
    $('#sim-only').onchange = ev => main().classList.toggle('sim-only-wrong', ev.target.checked);
    $('#sim-again').onclick = () => begin(id, ex, st.mode, st.secs[0]);
    main().onclick = ev => {
      const play = ev.target.closest('.sim-play');
      if (play) { miniCtx = { st: { plays: {} }, clip: key => findClip(ex, key) }; playClip(play); }
    };
    main().onchange = ev => {
      const t = ev.target;
      if (t.matches('[data-rate]')) {
        const [key, i] = t.dataset.rate.split('|');
        const p = findPart(ex, key);
        const arr = st.rate[key] ||= p.check.map(() => false);
        arr[+i] = t.checked; save(); paint();
      }
    };
    $$('.sim-play', main()).forEach(b => b.disabled = false);
  }
  const findPart = (ex, key) => { const [si, pi] = key.split('.').map(Number); return ex.sections[si].parts[pi]; };
  function checklist(p, st) {
    const r = st.rate[p._key] || [];
    return `<fieldset class="sim-check"><legend>Bewerte dich ehrlich (${p.pts} Punkte möglich)</legend>${p.check.map((c, i) => `<label><input type="checkbox" data-rate="${p._key}|${i}" ${r[i] ? 'checked' : ''}> ${e(c)}</label>`).join('')}</fieldset>`;
  }
  function reviewWrite(p, st) {
    const w = st.write[p._key] || {}, o = p.options[w.opt ?? 0], n = words(w.text);
    return `${p.options.length > 1 ? `<p class="dm-small">Gewählt: ${e(o.h || '')}</p>` : ''}
      ${p.audio?.length ? `<details class="sim-det"><summary>Transkript</summary>${p.audio.map(transcript).join('')}</details>` : ''}
      <div class="sim-yours"><b>Dein Text (${n} Wörter${p.minWords && n < p.minWords ? ` – zu kurz, mindestens ${p.minWords}` : ''})</b><p class="sim-pre">${w.text ? e(w.text) : '<i>Kein Text geschrieben.</i>'}</p></div>
      <details class="sim-det" open><summary>Mustertext</summary><div class="sim-muster">${para(o.muster)}</div></details>
      ${checklist(p, st)}`;
  }
  function reviewSpeak(p, st, id) {
    const url = recs[id + p._key];
    return `${url ? `<div class="sim-yours"><b>Deine Aufnahme</b><audio controls src="${url}"></audio></div>` : '<p class="dm-small">Keine Aufnahme (Aufnahmen bleiben nur, solange die Seite offen ist).</p>'}
      <details class="sim-det" open><summary>Musterlösung</summary><div class="sim-muster">${para(p.muster)}</div></details>
      ${p.redemittel?.length ? `<details class="sim-det"><summary>Redemittel</summary><ul class="sim-chiplist">${p.redemittel.map(r => `<li>${e(r)}</li>`).join('')}</ul></details>` : ''}
      ${checklist(p, st)}`;
  }

  /* ---------- Gezielte Vorbereitung #vorbereitung ---------- */
  let miniCtx = null;
  function prepHub() {
    const card = (href, tag, title, text, g) => `<a class="sim-card dm-g-${g}" href="${href}"><span class="dm-tag">${e(tag)}</span><b>${e(title)}</b><span>${e(text)}</span></a>`;
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Gezielte Vorbereitung']])}
      <div class="dm-head"><h1>Gezielte Vorbereitung</h1><p class="dm-lead">Für jede Prüfung: Aufbau und Zeiten, eine Strategie für jeden Prüfungsteil, typische Fallen, Mini-Übungen, Redemittel und ein Lernplan für 4 Wochen. Von einem lizenzierten Prüfer.</p></div>
      <h2 class="sim-h2">Allgemeine Prüfungen (telc)</h2>
      <div class="sim-grid">${card('#vorbereitung/telc-b1', 'B1 · Alltag', 'telc Deutsch B1', 'Zertifikat Deutsch: Lesen, Sprachbausteine, Hören, Brief, Sprechen', 'sky')}${card('#vorbereitung/telc-b2', 'B2 · Alltag', 'telc Deutsch B2', 'Lesen, Sprachbausteine, Hören, formelle E-Mail, Diskussion', 'sky')}</div>
      <h2 class="sim-h2">Deutsch-Test für den Beruf (DTB)</h2>
      <div class="sim-grid">${card('#vorbereitung/dtb-b1', 'B1 · Beruf', 'DTB B1', 'Berufssprachkurs B1: Kunden-E-Mail, Notiz, Gespräche im Team', 'ink')}${card('#vorbereitung/dtb-b2', 'B2 · Beruf', 'DTB B2', 'Beschwerde beantworten, Telefonnotiz, Forumsbeitrag, Lösungen finden', 'ink')}</div>
      <h2 class="sim-h2">Integrationskurs</h2>
      <div class="sim-grid">${card('#lernweg/dtz', 'A2–B1', 'DTZ', 'Lernweg mit allen Prüfungsteilen', 'sun')}${card('#lid', 'Orientierungskurs', 'Leben in Deutschland', 'Alle 310 Fragen mit Fehlertraining', 'mint')}</div>
      <section class="dm-card"><h2>Bereit für den Ernstfall?</h2><p>Teste dich unter echten Bedingungen – mit Zeitvorgabe und Auswertung.</p><a class="dm-btn" href="#simulation">Zu den Prüfungssimulationen</a></section>`, 'sim-page');
  }
  async function prepPage(id) {
    if (!PREP.includes(id)) { prepHub(); return; }
    let ex;
    try { ex = prepare(await load(id)); } catch { return failPage(); }
    const P = ex.prep, m = META[id];
    const st = { ans: {}, plays: {} };
    miniCtx = { st, clip: key => { const [pi, ai] = key.split('.').map(Number); return P.parts[pi]?.mini?.audio?.[ai]; } };
    const plan = (store().plan ||= {})[id] ||= {};
    const aufbau = ex.sections.map(s => `<tr><th scope="row">${e(s.title)}</th><td>${s.minutes} Min.${s.prepMinutes ? ` + ${s.prepMinutes} Vorb.` : ''}</td><td>${s.parts.map(p => e(p.kind === 'write' ? `${p.title}: Text schreiben${p.minWords ? ` (ab ${p.minWords} Wörtern)` : ''}` : p.kind === 'speak' ? `${p.title} (ca. ${p.minutes} Min.)` : `${p.title}: ${(p.items || []).length} Aufgaben`)).join('<br>')}</td></tr>`).join('');
    let mini = 0;
    const parts = P.parts.map((q, qi) => {
      let miniHTML = '';
      if (q.mini?.items?.length) {
        const mp = { ...q.mini, _key: `${qi}` };
        mp.items = q.mini.items.map((it, i) => ({ ...it, _mini: `m${++mini}`, _lbl: i + 1 }));
        miniHTML = `<div class="sim-mini"><h4>Mini-Übung</h4><p class="sim-instr">${e(mp.instr)}</p><div data-mini="${qi}">${partHTML(mp, st, 'mini')}</div></div>`;
        q._mp = mp;
      }
      return `<details class="sim-prep dm-card" id="teil-${qi}"><summary><span class="dm-tag">${e(q.skill || '')}</span><b>${e(q.name)}</b>${q.time ? `<small>${e(q.time)}</small>` : ''}</summary>
        <p>${e(q.what)}</p>
        <div class="sim-cols"><div><h4>So gehst du vor</h4><ol>${q.steps.map(s => `<li>${e(s)}</li>`).join('')}</ol></div><div><h4>Achtung, Falle!</h4><ul class="sim-traps">${q.traps.map(s => `<li>${e(s)}</li>`).join('')}</ul></div></div>
        ${DM.note(q.tip)}${miniHTML}</details>`;
    }).join('');
    const weeks = P.plan.map((w, wi) => `<div class="sim-week dm-card"><h3>${e(w.w)}</h3>${w.tasks.map((t, ti) => `<label><input type="checkbox" data-plan="${wi}.${ti}" ${plan[`${wi}.${ti}`] ? 'checked' : ''}> ${e(t)}</label>`).join('')}</div>`).join('');
    DM.page(`${DM.crumbs([['Prüfungstraining', '#pruefung'], ['Vorbereitung', '#vorbereitung'], [m.short]])}
      <div class="dm-head"><span class="dm-tag">${e(m.who)}</span><h1>Gezielte Vorbereitung: ${e(ex.title)}</h1><p class="dm-lead">${e(P.lead)}</p></div>
      <dl class="sim-facts">${P.facts.map(([k, v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('')}</dl>
      <nav class="sim-anchors" aria-label="Auf dieser Seite"><a href="#" data-goto="v-aufbau">Aufbau</a><a href="#" data-goto="v-teile">Prüfungsteile</a><a href="#" data-goto="v-redemittel">Redemittel</a><a href="#" data-goto="v-fehler">Typische Fehler</a><a href="#" data-goto="v-plan">Lernplan</a><a href="#simulation/${id}">⏱ Simulation</a></nav>
      <section id="v-aufbau"><h2 class="sim-h2">Aufbau der Prüfung</h2><div class="sim-table-wrap"><table class="sim-table"><thead><tr><th>Teil</th><th>Zeit</th><th>Aufgaben</th></tr></thead><tbody>${aufbau}</tbody></table></div></section>
      <section id="v-teile"><h2 class="sim-h2">Jeder Prüfungsteil – Strategie, Fallen, Übung</h2><p class="dm-small">Tippe auf einen Teil, um ihn zu öffnen.</p>${parts}</section>
      <section id="v-redemittel"><h2 class="sim-h2">Redemittel</h2><div class="sim-redegrid">${P.redemittel.map(g => `<div class="dm-card"><h3>${e(g.h)}</h3><ul>${g.list.map(r => `<li>${e(r)}</li>`).join('')}</ul></div>`).join('')}</div></section>
      <section id="v-fehler"><h2 class="sim-h2">Typische Fehler – und wie es richtig ist</h2><div class="sim-errs">${P.fehler.map(([f, r, w]) => `<div class="dm-card"><p class="sim-bad">✗ ${e(f)}</p><p class="sim-good">✓ ${e(r)}</p><p class="dm-small">${e(w)}</p></div>`).join('')}</div></section>
      <section id="v-plan"><h2 class="sim-h2">Dein Lernplan: 4 Wochen</h2><p class="dm-small">Hake ab, was du geschafft hast – das bleibt auf diesem Gerät gespeichert.</p><div class="sim-weeks">${weeks}</div></section>
      <section class="dm-card sim-cta"><h2>Teste dich unter echten Bedingungen</h2><p>Komplette Simulation mit Zeit für jeden Teil – oder nur einen Teil üben.</p><div class="dm-row"><a class="dm-btn" href="#simulation/${id}">⏱ Simulation ${e(m.short)}</a>${moreLinks(id)}</div></section>
      <p class="dm-small">Eigene Übungsaufgaben und Tipps – kein offizielles Material von telc. Offizielle Modelltests findest du unter <a href="#quellen">Prüfungsinfos & Quellen</a>.</p>`, 'sim-page');
    const m2 = main();
    m2.onclick = ev => {
      const t = ev.target;
      const go = t.closest('[data-goto]');
      if (go) { ev.preventDefault(); const el = $('#' + go.dataset.goto); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      const opt = t.closest('.sim-opt');
      if (opt && !opt.disabled) { const box = opt.closest('[data-mini]'); const q = P.parts[+box.dataset.mini]; st.ans[opt.dataset.n] = +opt.dataset.i; box.innerHTML = partHTML(q._mp, st, 'mini'); return; }
      const play = t.closest('.sim-play');
      if (play) playClip(play);
    };
    m2.onchange = ev => {
      const t = ev.target;
      if (t.matches('.sim-sel')) { const box = t.closest('[data-mini]'); const q = P.parts[+box.dataset.mini]; if (t.value === '') return; st.ans[t.dataset.n] = +t.value; box.innerHTML = partHTML(q._mp, st, 'mini'); }
      if (t.matches('[data-plan]')) { plan[t.dataset.plan] = t.checked; if (!t.checked) delete plan[t.dataset.plan]; save(); }
    };
    $$('details.sim-prep').forEach(d => d.addEventListener('toggle', () => { if (!d.open) stopAudio(); }));
  }
  function moreLinks(id) {
    const L = {
      'dtb-b2': [['#training/dtb-schreiben', 'Kundenantwort üben'], ['#hoeren/beruf', 'Hören im Beruf'], ['#lesen/beruf', 'Lesen im Beruf'], ['#spiele/b2', 'B2-Lernspiele']],
      'dtb-b1': [['#hoeren/beruf', 'Hören im Beruf'], ['#lesen/beruf', 'Lesen im Beruf'], ['#ueben', 'Sprechen & Schreiben']],
      'telc-b1': [['#ueben', 'Sprechen & Schreiben'], ['#lesen', 'Leseverstehen'], ['#hoeren', 'Hörtraining']],
      'telc-b2': [['#ueben', 'Sprechen & Schreiben'], ['#lesen', 'Leseverstehen'], ['#spiele/b2', 'B2-Lernspiele']]
    };
    return (L[id] || []).map(([h, t]) => `<a class="dm-btn dm-btn-quiet" href="${h}">${e(t)}</a>`).join('');
  }

  /* ---------- Hinweis-Toast ---------- */
  function toast(msg) {
    let t = $('#sim-toast');
    if (!t) { t = document.createElement('div'); t.id = 'sim-toast'; t.className = 'sim-toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 3500);
  }

  /* ---------- Routen ---------- */
  DM.routes ||= {};
  DM.routes.simulation = p => {
    const id = p[1];
    if (!id || !META[id]) { stopAll(); return hub(); }
    if (p[2] === 'run') return run(id);
    if (p[2] === 'ergebnis') return result(id);
    stopAll(); return intro(id);
  };
  DM.routes.vorbereitung = p => { stopAll(); return p[1] ? prepPage(p[1]) : prepHub(); };
  DM.sim = { META, ORDER, load, prepare, score, fnv };
})();
