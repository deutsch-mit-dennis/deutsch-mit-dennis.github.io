/* Gemeinsamer Baukasten für Auswahl-Spiele (spiele.js / DMGame).
   DMKit.mc(api, {
     items: [{ q, gap?, tag?, sub?, say?, opts:[…], a, tip?, correct?, keep? }],
       q    – Aufgabe (Text; mit gap:true wird ___ zur Lücke), html:true erlaubt fertiges HTML
       opts – 2–4 Antworten (Text), a = richtige Antwort (Text)
     rounds: 15,          // Anzahl Fragen (ohne seconds)
     lives: 3|null,       // Leben – bei 0 ist Schluss
     seconds: 60|null,    // Zeitspiel: so viele Fragen wie möglich, Combo ab 3 richtigen
     cols: 1|2,           // Antworten in einer oder zwei Spalten
     autoSay: false,      // Hörmodus: Text vorlesen, Aufgabe erst nach der Antwort zeigen
     endless: false,      // mit lives: weiter, bis alle Leben weg sind
     summary(r)           // optional: html für die letzte Rückmeldung { right, total }
   }) */
(() => {
  if (!window.DMGame) return;
  if (!document.getElementById('sp-kit-css')) {
    const st = document.createElement('style');
    st.id = 'sp-kit-css';
    st.textContent = `
.sp-kit-q{text-align:center;margin:2px 0 16px}
.sp-kit-tag{display:inline-block;max-width:100%;background:var(--dm-tinte-soft);color:var(--dm-tinte-dark);font-weight:800;font-size:14px;border-radius:99px;padding:3px 12px;margin:0 0 10px;overflow-wrap:anywhere}
.sp-kit-pic{font-size:clamp(40px,12vw,56px);line-height:1.1;margin:0 0 6px;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.sp-kit-prompt{font:700 clamp(20px,5.2vw,27px)/1.42 var(--dm-font);color:var(--dm-ink);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.sp-kit-prompt.is-long{font-size:clamp(17px,4.4vw,21px);line-height:1.45}
.sp-kit-prompt.is-big{font-size:clamp(46px,13vw,68px);line-height:1.1;color:var(--dm-tinte);letter-spacing:.02em}
.sp-kit-prompt.is-hidden{color:#8a93a8;font-size:18px;font-weight:600}
.sp-kit-sub{margin:8px 0 0;color:#5b6680;font-weight:700;font-size:16px}
.sp-kit-gap{display:inline-block;min-width:3.2em;border-bottom:3px solid #c5cdf0;color:transparent;line-height:1.1}
.sp-kit-gap.is-filled{color:var(--dm-tinte);border-color:var(--dm-tinte)}
.sp-kit-gap.is-bad{color:#c62828;border-color:#c62828}
.sp-kit-say{display:inline-flex;align-items:center;gap:8px;min-height:48px;margin:6px 0 10px;padding:8px 18px;border:2px solid var(--dm-tinte);border-radius:99px;background:#fff;color:var(--dm-tinte-dark);font:800 17px var(--dm-font);cursor:pointer}
.sp-kit-say:active{transform:scale(.97)}
.sp-kit-opts .ch-opt{font-size:18px;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto;min-width:0}
.sp-kit-opts .ch-opt span{min-width:0}
.sp-kit-c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.sp-kit-c2 .ch-opt{justify-content:center!important;text-align:center;font-weight:700}
.sp-kit-c2 .ch-opt kbd{position:absolute;top:6px;left:8px}
.sp-kit-combo{min-height:26px;text-align:center;font-weight:800;color:#c2410c;font-size:16px;margin:10px 0 0}
.sp-kit-combo b{display:inline-block;background:#fff1d0;border-radius:99px;padding:2px 12px}
.sp-play .ch-feedback span{display:block;margin-top:4px}
@media (hover:none){.sp-kit-opts .ch-opt:hover:not(:disabled){border-color:var(--dm-line)}}
@media (max-width:420px){.sp-kit-opts .ch-opt{font-size:16.5px;padding:10px 12px;min-height:54px}.sp-kit-c2 .ch-opt{padding:10px 8px}}
`;
    document.head.appendChild(st);
  }

  const gapHtml = (txt, esc, fill, cls) => esc(txt).replace(/_{3,}/, `<span class="sp-kit-gap${cls ? ' ' + cls : ''}">${fill ? esc(fill) : '&nbsp;'}</span>`);

  function mc(api, cfg) {
    const items = cfg.items.filter(x => x && Array.isArray(x.opts) && x.opts.includes(x.a));
    const seconds = cfg.seconds || null, lives0 = cfg.lives ?? null, cols = cfg.cols || 1;
    let deck = api.shuffle(items);
    if (!seconds && !cfg.endless) deck = deck.slice(0, Math.min(cfg.rounds || 15, deck.length));
    const total = seconds || cfg.endless ? 0 : deck.length;
    let i = 0, score = 0, right = 0, streak = 0, life = lives0, over = false, busy = false, timer = null, cur = null;
    const wrong = [], alive = () => !over && api.el.isConnected;

    api.hud({ progress: 0, score: 0, step: total ? `1 / ${total}` : 'Frage 1', ...(life != null ? { lives: life, maxLives: lives0 } : {}) });
    if (seconds) timer = api.timer(seconds, r => { if (!over) { api.hud({ time: r, progress: (seconds - r) / seconds }); } }, () => end());

    function promptHtml(it, state) {
      if (it.html) return it.q;
      if (it.gap) return gapHtml(it.q, api.esc, state ? it.a : '', state === 'ok' ? 'is-filled' : state === 'bad' ? 'is-bad' : '');
      return api.esc(it.q);
    }

    function show() {
      if (!alive()) return;
      if (i >= deck.length) {
        if (seconds || cfg.endless) deck = deck.concat(api.shuffle(items));
        else return end();
      }
      cur = deck[i]; busy = false; api.clearFeedback();
      const it = cur, opts = it.keep ? it.opts : api.shuffle(it.opts);
      const hidden = cfg.autoSay && it.say;
      const len = (it.html ? it.q.replace(/<[^>]+>/g, '') : it.q).length;
      api.el.innerHTML = `<div class="sp-kit-q">
          ${it.tag ? `<p class="sp-kit-tag">${api.esc(it.tag)}</p>` : ''}
          ${it.pic ? `<div class="sp-kit-pic" aria-hidden="true">${it.pic}</div>` : ''}
          ${it.say ? `<div><button type="button" class="sp-kit-say">🔊 ${hidden ? 'Nochmal hören' : 'Anhören'}</button></div>` : ''}
          <div class="sp-kit-prompt${len > 95 ? ' is-long' : ''}${cfg.big ? ' is-big' : ''}${hidden ? ' is-hidden' : ''}">${hidden ? 'Hör gut zu …' : promptHtml(it)}</div>
          ${it.sub ? `<p class="sp-kit-sub">${api.esc(it.sub)}</p>` : ''}
        </div>
        <div class="ch-opts sp-kit-opts${cols === 2 ? ' sp-kit-c2' : ''}" role="group" aria-label="Antworten">${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}" data-v="${api.esc(o)}"><kbd>${k + 1}</kbd><span>${api.esc(o)}</span></button>`).join('')}</div>
        ${seconds ? `<p class="sp-kit-combo" aria-live="polite">${streak >= 3 ? `<b>🔥 Combo ×2</b>` : ''}</p>` : ''}`;
      const sayBtn = api.el.querySelector('.sp-kit-say');
      if (sayBtn) sayBtn.onclick = () => api.speak(it.say);
      if (hidden) setTimeout(() => { if (alive() && cur === it) api.speak(it.say); }, 250);
      const btns = [...api.el.querySelectorAll('.ch-opt')];
      btns.forEach((b, k) => b.onclick = () => answer(b, opts[k], btns));
      api.hud({ step: total ? `${i + 1} / ${total}` : `Frage ${i + 1}` });
    }

    function answer(btn, val, btns) {
      if (busy || !alive()) return;
      busy = true;
      const it = cur, ok = val === it.a;
      btns.forEach(b => { b.disabled = true; if (b.dataset.v === it.a) b.classList.add('is-right'); });
      if (!ok) btn.classList.add('is-wrong');
      const pr = api.el.querySelector('.sp-kit-prompt');
      if (pr) { pr.classList.remove('is-hidden'); pr.innerHTML = promptHtml(it, ok ? 'ok' : 'bad'); }
      if (ok) { right++; streak++; score += seconds && streak >= 3 ? 2 : 1; }
      else { streak = 0; wrong.push({ correct: it.correct || it.a, tip: it.tip || '' }); if (life != null) life--; }
      i++;
      api.hud({ score, ...(total ? { progress: i / total } : {}), ...(life != null ? { lives: life, maxLives: lives0 } : {}) });
      const tip = it.tip ? `<span>${api.esc(it.tip)}</span>` : '';
      api.feedback(ok, ok ? `<b>Richtig!${seconds && streak >= 3 ? ' 🔥 Combo – doppelte Punkte' : ''}</b>${seconds ? '' : tip}`
        : `<b>Leider falsch.</b><span>Richtig: <b>${api.esc(it.correct || it.a)}</b></span>${tip}`);
      if (life === 0) { api.next('Ergebnis ansehen', end); return; }
      if (seconds) { setTimeout(() => { if (alive()) show(); }, ok ? 650 : 1700); return; }
      if (!cfg.endless && i >= deck.length) { api.next('Ergebnis ansehen', end); }
      else api.next('Weiter', show);
      const nb = document.getElementById('sp-next');
      if (nb && nb.getBoundingClientRect().bottom > innerHeight) nb.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }

    function end() {
      if (over) return;
      over = true; timer?.stop();
      const r = { score, right, total: total || i, wrong };
      if (cfg.summary) {
        const html = cfg.summary(r);
        if (html) { api.clearFeedback(); api.el.innerHTML = html; api.next('Ergebnis ansehen', () => api.finish({ score, max: total, wrong })); return; }
      }
      api.finish({ score, max: total, wrong });
    }

    show();
  }

  // drei Ablenker aus einer Liste ziehen (ohne die richtige Antwort und ohne Doppelte)
  function distract(api, pool, answer, n = 3) {
    return api.shuffle([...new Set(pool.filter(x => x !== answer))]).slice(0, n);
  }

  window.DMKit = { mc, distract };
})();
