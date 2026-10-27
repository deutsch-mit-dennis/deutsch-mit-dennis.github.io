/* Echte Spielmechaniken für Lernspiele (spiele.js / DMGame). Alle Spiele nutzen dieselben Aufgaben wie DMKit.mc:
   items: [{ q, sub?, tag?, pic?, say?, a, opts:[…], tip?, correct? }]

   DMArcade.catcher(api, cfg) – Fangen: Antworten fallen in Bahnen, bewege den Korb und fang die richtige; falsche ausweichen.
   DMArcade.sorter(api, cfg)  – Sortieren: Die Aufgabe fällt als Karte herunter, steuere sie in den richtigen Korb.
   DMArcade.whack(api, cfg)   – Hau den Maulwurf: Antworten tauchen in Löchern auf, tippe schnell die richtige.
   DMArcade.ladder(api, cfg)  – Quiz-Leiter: Stufe für Stufe nach oben, Zeitlimit, Joker (50:50, +15 s, Frage tauschen).
   DMArcade.order(api, cfg)   – Zeitstrahl: Ereigniskarten in die richtige Reihenfolge tippen.
   cfg: { items, rounds, lives, seconds, ... } – siehe einzelne Funktionen. */
(() => {
  if (!window.DMGame) return;
  const css = `
.ar-prompt{text-align:center;margin:0 0 10px;min-height:56px;display:flex;flex-direction:column;justify-content:center;gap:4px}
.ar-prompt .ar-tag{align-self:center;background:var(--dm-tinte-soft,#e8ecff);color:var(--dm-tinte-dark,#1e2a78);font-weight:800;font-size:13px;border-radius:99px;padding:2px 10px}
.ar-prompt .ar-q{font:800 clamp(17px,4.6vw,22px)/1.35 var(--dm-font);color:var(--dm-ink);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.ar-prompt .ar-q.is-long{font-size:clamp(15px,4vw,18px)}
.ar-prompt .ar-sub{font-size:14px;color:#5b6680;font-weight:700}
.ar-prompt .ar-pic{font-size:34px;line-height:1}
.ar-prompt .ar-gap{display:inline-block;min-width:2.6em;border-bottom:3px solid #c5cdf0}
.ar-say{align-self:center;min-height:44px;padding:6px 16px;border:2px solid var(--dm-tinte,#3446d4);border-radius:99px;background:#fff;color:var(--dm-tinte-dark,#1e2a78);font:800 15px var(--dm-font);cursor:pointer}
.ar-field{position:relative;height:clamp(330px,56vh,500px);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,#eaf3ff 0%,#f6f9ff 55%,#fff7e6 100%);border:2px solid var(--dm-line,#dde2ee);touch-action:manipulation;user-select:none;-webkit-user-select:none}
.ar-lane{position:absolute;top:0;bottom:0;border-right:1px dashed rgba(52,70,212,.13)}
.ar-lane:last-of-type{border-right:0}
.ar-fall{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px 6px;border-radius:14px;background:#fff;border:2px solid #c9d2f2;box-shadow:0 6px 14px rgba(27,42,74,.12);font:800 15px/1.2 var(--dm-font);color:var(--dm-ink);will-change:transform;overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto}
.ar-fall.is-big{font-size:16px;padding:10px 8px}
.ar-fall.is-hit{background:#dff7e8;border-color:#2ba471}
.ar-fall.is-bad{background:#ffe2e2;border-color:#e5484d}
.ar-basket{position:absolute;bottom:8px;height:58px;border-radius:14px 14px 22px 22px;background:linear-gradient(180deg,#ffb54a,#f08c00);box-shadow:inset 0 -6px 0 rgba(0,0,0,.12),0 6px 12px rgba(240,140,0,.3);transition:left .14s ease-out;display:flex;align-items:center;justify-content:center;font-size:26px}
.ar-bins{position:absolute;left:0;right:0;bottom:0;display:flex;gap:6px;padding:6px}
.ar-bin{flex:1;min-width:0;min-height:72px;border:0;border-radius:16px 16px 12px 12px;color:#fff;font:800 14px/1.2 var(--dm-font);padding:8px 6px;cursor:pointer;overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto;box-shadow:inset 0 -6px 0 rgba(0,0,0,.15)}
.ar-bin.is-on{outline:4px solid #ffd43b;outline-offset:-4px;transform:translateY(-3px)}
.ar-bin.is-ok{background:#2ba471!important}.ar-bin.is-no{background:#e5484d!important}
.ar-pop{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);font:900 28px var(--dm-font);color:#2ba471;pointer-events:none;animation:arPop .8s ease-out forwards;white-space:nowrap}
.ar-pop.is-bad{color:#e5484d}
@keyframes arPop{0%{opacity:0;transform:translate(-50%,-30%) scale(.6)}20%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}100%{opacity:0;transform:translate(-50%,-120%) scale(1)}}
.ar-shake{animation:arShake .35s}
@keyframes arShake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.ar-help{text-align:center;font-size:13px;color:#5b6680;margin:8px 0 0}
.ar-combo{position:absolute;right:10px;top:8px;background:#fff1d0;color:#c2410c;font:800 14px var(--dm-font);border-radius:99px;padding:3px 10px;z-index:3}
/* Maulwurf */
.ar-holes{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:6px;padding:10px}
.ar-hole{position:relative;overflow:hidden;border-radius:18px;background:radial-gradient(ellipse at 50% 92%,#5b3a1e 0 34%,transparent 35%),linear-gradient(180deg,#d8f0c6,#b6e09a)}
.ar-mole{position:absolute;left:6%;right:6%;bottom:6%;min-height:62%;display:flex;align-items:center;justify-content:center;text-align:center;padding:6px 4px;border:0;border-radius:16px 16px 10px 10px;background:#fff;box-shadow:0 4px 0 #c9b28f,0 8px 14px rgba(0,0,0,.15);font:800 14px/1.15 var(--dm-font);color:var(--dm-ink);cursor:pointer;transform:translateY(115%);transition:transform .16s ease-out;overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto}
.ar-mole.is-up{transform:translateY(0)}
.ar-mole.is-ok{background:#2ba471;color:#fff}.ar-mole.is-no{background:#e5484d;color:#fff}
@media (min-width:600px){.ar-mole{font-size:16px}.ar-fall{font-size:16px}}
/* Leiter */
.ar-ladder{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:0 0 10px}
.ar-step{min-width:26px;height:26px;border-radius:8px;background:#eef1f8;color:#8a93a8;font:800 12px/26px var(--dm-font);text-align:center}
.ar-step.is-safe{box-shadow:inset 0 0 0 2px #f0b400}
.ar-step.is-done{background:#2ba471;color:#fff}.ar-step.is-cur{background:var(--dm-tinte,#3446d4);color:#fff;transform:scale(1.12)}
.ar-jokers{display:flex;gap:8px;justify-content:center;margin:12px 0 0;flex-wrap:wrap}
.ar-joker{min-height:44px;padding:6px 14px;border-radius:99px;border:2px solid #f0b400;background:#fff8e1;font:800 15px var(--dm-font);color:#7a5b00;cursor:pointer}
.ar-joker:disabled{opacity:.35;cursor:default;text-decoration:line-through}
.ar-clock{height:8px;border-radius:99px;background:#eef1f8;overflow:hidden;margin:0 0 12px}.ar-clock i{display:block;height:100%;background:var(--dm-tinte,#3446d4);transition:width 1s linear}
.ar-clock.is-low i{background:#e5484d}
.ar-qopts{display:grid;gap:8px}
.ar-qopts .ch-opt.is-gone{visibility:hidden}
/* Zeitstrahl */
.ar-line{position:relative;display:flex;flex-direction:column;gap:6px;min-height:60px;padding:8px 8px 8px 26px;margin:0 0 12px;border-radius:16px;background:#f4f6fb}
.ar-line:before{content:"";position:absolute;left:12px;top:10px;bottom:10px;width:3px;border-radius:3px;background:var(--dm-tinte,#3446d4)}
.ar-line .ar-placed{position:relative;background:#fff;border-radius:12px;padding:8px 10px;font-weight:700;font-size:15px;animation:arIn .3s ease-out}
.ar-line .ar-placed b{color:var(--dm-tinte,#3446d4);margin-right:6px}
.ar-line .ar-placed:before{content:"";position:absolute;left:-19px;top:50%;width:11px;height:11px;margin-top:-6px;border-radius:50%;background:#fff;border:3px solid var(--dm-tinte,#3446d4)}
.ar-line-empty{color:#8a93a8;font-size:14px;font-weight:700;padding:8px 0}
@keyframes arIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.ar-cards{display:grid;gap:8px}
.ar-card{min-height:54px;padding:10px 12px;border:2px solid var(--dm-line,#dde2ee);border-radius:14px;background:#fff;font:700 16px/1.3 var(--dm-font);color:var(--dm-ink);text-align:left;cursor:pointer}
.ar-card:active{transform:scale(.98)}
@media (prefers-reduced-motion:reduce){.ar-basket,.ar-mole{transition:none}.ar-pop,.ar-shake,.ar-line .ar-placed{animation:none}}
`;
  if (!document.getElementById("ar-css")) {
    const st = document.createElement("style");
    st.id = "ar-css";
    st.textContent = css;
    document.head.appendChild(st);
  }

  const COLORS = ["#3446d4", "#d6336c", "#2b8a3e", "#e8590c"];
  const prep = (items, n) =>
    items
      .filter((x) => x && Array.isArray(x.opts) && x.opts.includes(x.a))
      .map((x) => ({
        ...x,
        opts: [x.a, ...x.opts.filter((o) => o !== x.a).slice(0, n - 1)],
      }));

  function promptHTML(api, it, hidden) {
    const q = it.html
      ? it.q
      : api.esc(it.q).replace(/_{3,}/, '<span class="ar-gap">&nbsp;</span>');
    const len = String(it.q).length;
    return `${it.tag ? `<span class="ar-tag">${api.esc(it.tag)}</span>` : ""}${it.pic ? `<span class="ar-pic" aria-hidden="true">${it.pic}</span>` : ""}
      ${it.say ? `<button type="button" class="ar-say">🔊 ${hidden ? "Nochmal hören" : "Anhören"}</button>` : ""}
      <span class="ar-q${len > 70 ? " is-long" : ""}">${hidden ? "Hör gut zu …" : q}</span>${it.sub ? `<span class="ar-sub">${api.esc(it.sub)}</span>` : ""}`;
  }
  function bindSay(api, box, it, auto) {
    const b = box.querySelector(".ar-say");
    if (b) b.onclick = () => api.speak(it.say);
    if (auto && it.say)
      setTimeout(() => {
        if (box.isConnected) api.speak(it.say);
      }, 250);
  }
  function pop(field, txt, bad) {
    const p = document.createElement("div");
    p.className = "ar-pop" + (bad ? " is-bad" : "");
    p.textContent = txt;
    field.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }
  function shake(el) {
    el.classList.remove("ar-shake");
    void el.offsetWidth;
    el.classList.add("ar-shake");
  }

  /* Gemeinsame Spielrunde: Leben, Punkte, Fehlerliste, Ende */
  function session(api, cfg, total) {
    const S = {
      score: 0,
      right: 0,
      n: 0,
      lives: cfg.lives ?? 3,
      maxLives: cfg.lives ?? 3,
      streak: 0,
      wrong: [],
      over: false,
      total,
    };
    S.alive = () => !S.over && api.el.isConnected;
    S.hud = () =>
      api.hud({
        score: S.score,
        lives: S.lives,
        maxLives: S.maxLives,
        ...(total
          ? {
              progress: Math.min(1, S.n / total),
              step: `${Math.min(S.n + 1, total)} / ${total}`,
            }
          : {}),
      });
    S.ok = (pts = 10) => {
      S.right++;
      S.streak++;
      S.score += pts * (S.streak >= 3 ? 2 : 1);
    };
    S.bad = (it) => {
      S.streak = 0;
      S.lives--;
      if (it)
        S.wrong.push({
          correct: it.correct || `${it.q} → ${it.a}`,
          tip: it.tip || "",
        });
      api.vibrate();
    };
    S.end = () => {
      if (S.over) return;
      S.over = true;
      cfg.onEnd?.();
      api.finish({ score: S.score, max: 0, wrong: S.wrong });
    };
    return S;
  }

  /* ---------- 1) Fangen ---------- */
  function catcher(api, cfg) {
    const lanes = Math.min(3, cfg.lanes || 3);
    let deck = api.shuffle(prep(cfg.items, lanes));
    const total = Math.min(cfg.rounds || 12, deck.length);
    deck = deck.slice(0, total);
    const S = session(api, cfg, total);
    S.hud();
    api.el.innerHTML = `<div class="ar-prompt" aria-live="polite"></div>
      <div class="ar-field" role="application" aria-label="Spielfeld: Tippe auf eine Bahn, um den Korb zu bewegen">${Array.from({ length: lanes }, (_, i) => `<div class="ar-lane" style="left:${(i * 100) / lanes}%;width:${100 / lanes}%"></div>`).join("")}<div class="ar-basket" aria-hidden="true">🧺</div></div>
      <p class="ar-help">Tippe auf eine Bahn (oder ← →), um den Korb zu bewegen. Fang die richtige Antwort – weich den falschen aus!</p>`;
    const field = api.el.querySelector(".ar-field"),
      basket = field.querySelector(".ar-basket"),
      box = api.el.querySelector(".ar-prompt");
    let lane = 1,
      cards = [],
      it = null,
      raf = 0,
      last = 0,
      speed = cfg.speed || 0.16; // Spielfeldhöhen pro Sekunde
    const setLane = (l) => {
      lane = Math.max(0, Math.min(lanes - 1, l));
      const w = field.clientWidth / lanes;
      basket.style.width = w - 16 + "px";
      basket.style.left = lane * w + 8 + "px";
    };
    setLane(1);
    field.addEventListener("pointerdown", (e) => {
      const r = field.getBoundingClientRect();
      setLane(Math.floor((e.clientX - r.left) / (r.width / lanes)));
    });
    const key = (e) => {
      if (!S.alive()) return document.removeEventListener("keydown", key);
      if (e.key === "ArrowLeft") {
        setLane(lane - 1);
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        setLane(lane + 1);
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", key);
    addEventListener("resize", () => S.alive() && setLane(lane));

    function round() {
      if (!S.alive()) return;
      if (S.n >= total || S.lives <= 0) return S.end();
      it = deck[S.n]; if (window.DM_TEST) window.DM_TEST.a = it.a;
      S.hud();
      box.innerHTML = promptHTML(api, it, cfg.autoSay && it.say);
      bindSay(api, box, it, cfg.autoSay);
      const order = api.shuffle([...Array(lanes).keys()]),
        opts = api.shuffle(it.opts);
      const w = field.clientWidth / lanes,
        delays = api.shuffle([0, 0.55, 1.1].slice(0, opts.length));
      cards = opts.map((o, k) => {
        const el = document.createElement("div");
        el.className = "ar-fall";
        el.textContent = o;
        el.style.width = w - 12 + "px";
        el.style.left = order[k] * w + 6 + "px";
        field.appendChild(el);
        return {
          el,
          o,
          lane: order[k],
          y: -el.offsetHeight - 10 - delays[k] * speed * field.clientHeight,
          done: false,
          h: el.offsetHeight,
        };
      });
      last = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
    function finishRound(ok, card) {
      cancelAnimationFrame(raf);
      if (ok) {
        S.ok();
        pop(field, S.streak >= 3 ? "+20 🔥" : "+10");
      } else {
        S.bad(it);
        pop(field, "−1 ❤️", true);
        shake(field);
      }
      S.n++;
      S.hud();
      const msg = ok
        ? `<b>Gefangen!</b>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`
        : `<b>${card && card.o !== it.a ? "Falsch gefangen." : "Verpasst!"}</b><span>Richtig: <b>${api.esc(it.a)}</b></span>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`;
      api.feedback(ok, msg);
      speed = Math.min(0.42, speed * 1.07);
      setTimeout(
        () => {
          if (!S.alive()) return;
          cards.forEach((c) => c.el.remove());
          api.clearFeedback();
          round();
        },
        ok ? 900 : 2200,
      );
    }
    function tick(now) {
      if (!S.alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const H = field.clientHeight,
        catchY = H - 66;
      for (const c of cards) {
        if (c.done) continue;
        c.y += speed * H * dt;
        c.el.style.transform = `translateY(${c.y}px)`;
        if (c.y + c.h >= catchY) {
          if (c.lane === lane) {
            c.done = true;
            if (c.o === it.a) {
              c.el.classList.add("is-hit");
              return finishRound(true, c);
            }
            c.el.classList.add("is-bad");
            return finishRound(false, c);
          }
          if (c.y > H) {
            c.done = true;
            if (c.o === it.a) return finishRound(false, null);
          }
        }
      }
      if (cards.every((c) => c.done)) return finishRound(false, null);
      raf = requestAnimationFrame(tick);
    }
    cfg.onEnd = () => cancelAnimationFrame(raf);
    round();
  }

  /* ---------- 2) Sortieren ---------- */
  function sorter(api, cfg) {
    const nb = cfg.bins ? cfg.bins.length : 3;
    let deck = api.shuffle(prep(cfg.items, nb));
    const total = Math.min(cfg.rounds || 15, deck.length);
    deck = deck.slice(0, total);
    const S = session(api, cfg, total);
    S.hud();
    api.el.innerHTML = `<div class="ar-prompt">${cfg.title ? `<span class="ar-q">${api.esc(cfg.title)}</span>` : ""}${cfg.sub ? `<span class="ar-sub">${api.esc(cfg.sub)}</span>` : ""}</div>
      <div class="ar-field" role="application"><div class="ar-bins"></div></div>
      <p class="ar-help">Tippe auf einen Korb – die Karte fliegt dorthin. Zweimal tippen = schneller fallen lassen (mehr Punkte).</p>`;
    const field = api.el.querySelector(".ar-field"),
      binsEl = field.querySelector(".ar-bins");
    let it = null,
      card = null,
      y = 0,
      target = -1,
      raf = 0,
      last = 0,
      speed = cfg.speed || 0.075,
      fast = false,
      bins = [];
    function round() {
      if (!S.alive()) return;
      if (S.n >= total || S.lives <= 0) return S.end();
      it = deck[S.n]; if (window.DM_TEST) window.DM_TEST.a = it.a;
      S.hud();
      target = -1;
      fast = false;
      bins = cfg.bins || api.shuffle(it.opts);
      binsEl.innerHTML = bins
        .map(
          (b, k) =>
            `<button type="button" class="ar-bin" data-k="${k}" style="background:${COLORS[k % 4]}"><kbd hidden>${k + 1}</kbd>${api.esc(b)}</button>`,
        )
        .join("");
      binsEl
        .querySelectorAll(".ar-bin")
        .forEach((b) => (b.onclick = () => choose(+b.dataset.k)));
      card = document.createElement("div");
      card.className = "ar-fall is-big";
      card.innerHTML = `${it.pic ? `<span style="font-size:24px;margin-right:6px">${it.pic}</span>` : ""}${api.esc(it.q)}`;
      const W = field.clientWidth;
      card.style.width = Math.min(W - 24, 330) + "px";
      card.style.left = (W - Math.min(W - 24, 330)) / 2 + "px";
      field.appendChild(card);
      y = -card.offsetHeight;
      if (it.say) api.speak(it.say);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
    function choose(k) {
      if (!card || !S.alive()) return;
      if (k === target) {
        fast = true;
        return;
      }
      target = k;
      binsEl
        .querySelectorAll(".ar-bin")
        .forEach((b, j) => b.classList.toggle("is-on", j === k));
      const W = field.clientWidth,
        bw = W / bins.length,
        cw = card.offsetWidth;
      card.style.transition = "left .18s ease-out";
      card.style.left =
        Math.max(4, Math.min(W - cw - 4, k * bw + bw / 2 - cw / 2)) + "px";
    }
    const key = (e) => {
      if (!S.alive()) return document.removeEventListener("keydown", key);
      if (/^[1-4]$/.test(e.key) && +e.key <= bins.length) {
        choose(+e.key - 1);
        e.preventDefault();
      }
      if (e.key === "ArrowDown") fast = true;
    };
    document.addEventListener("keydown", key);
    function tick(now) {
      if (!S.alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const H = field.clientHeight,
        floor = H - binsEl.offsetHeight - 4;
      y += (fast ? 1.2 : speed) * H * dt;
      card.style.transform = `translateY(${y}px)`;
      if (y + card.offsetHeight >= floor) return land(floor - y);
      raf = requestAnimationFrame(tick);
    }
    function land(left) {
      const ok = target >= 0 && bins[target] === it.a,
        kAns = bins.indexOf(it.a);
      const btns = binsEl.querySelectorAll(".ar-bin");
      if (btns[kAns]) btns[kAns].classList.add("is-ok");
      if (!ok && target >= 0) btns[target].classList.add("is-no");
      if (ok) {
        S.ok(fast ? 15 : 10);
        card.classList.add("is-hit");
        pop(field, fast ? "+15 ⚡" : "+10");
      } else {
        S.bad(it);
        card.classList.add("is-bad");
        pop(field, target < 0 ? "Zu spät!" : "−1 ❤️", true);
        shake(field);
      }
      S.n++;
      S.hud();
      api.feedback(
        ok,
        ok
          ? `<b>Richtig!</b>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`
          : `<b>${target < 0 ? "Zu spät – kein Korb gewählt." : "Falscher Korb."}</b><span>Richtig: <b>${api.esc(it.a)}</b></span>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`,
      );
      speed = Math.min(0.2, speed * 1.06);
      const c = card;
      card = null;
      setTimeout(
        () => {
          c.remove();
          if (!S.alive()) return;
          api.clearFeedback();
          round();
        },
        ok ? 900 : 2300,
      );
    }
    cfg.onEnd = () => cancelAnimationFrame(raf);
    round();
  }

  /* ---------- 3) Hau den Maulwurf ---------- */
  function whack(api, cfg) {
    let deck = api.shuffle(prep(cfg.items, 4)),
      idx = 0;
    const seconds = cfg.seconds || 60;
    const S = session(api, cfg, 0);
    api.hud({ score: 0, lives: S.lives, maxLives: S.maxLives, step: "Los!" });
    api.el.innerHTML = `<div class="ar-prompt" aria-live="polite"></div>
      <div class="ar-field"><div class="ar-holes">${Array.from({ length: 9 }, (_, i) => `<div class="ar-hole"><button type="button" class="ar-mole" data-h="${i}" tabindex="-1"></button></div>`).join("")}</div></div>
      <p class="ar-help">Tippe schnell auf die richtige Antwort, wenn sie auftaucht! Falsch tippen kostet ein Leben.</p>`;
    const field = api.el.querySelector(".ar-field"),
      box = api.el.querySelector(".ar-prompt");
    const moles = [...field.querySelectorAll(".ar-mole")],
      up = new Map(); // hole -> {text, until}
    let it = null,
      spawnT = 0,
      stay = cfg.stay || 1.9,
      gap = 0.62,
      raf = 0,
      last = 0,
      since = 0,
      sinceRight = 0,
      timer = null;
    timer = api.timer(
      seconds,
      (r) => {
        if (S.alive()) api.hud({ time: r, progress: (seconds - r) / seconds });
      },
      () => S.end(),
    );
    function next() {
      if (idx >= deck.length) {
        deck = deck.concat(api.shuffle(deck));
      }
      it = deck[idx++]; if (window.DM_TEST) window.DM_TEST.a = it.a;
      since = 0;
      sinceRight = 0;
      moles.forEach((m, h) => hide(h));
      box.innerHTML = promptHTML(api, it, false);
      bindSay(api, box, it, false);
      api.hud({ step: `Treffer: ${S.right}` });
    }
    function show(h, text) {
      const m = moles[h];
      m.textContent = text;
      m.className = "ar-mole is-up";
      m.tabIndex = 0;
      up.set(h, { text, until: stay });
    }
    function hide(h) {
      const m = moles[h];
      m.classList.remove("is-up");
      m.tabIndex = -1;
      up.delete(h);
    }
    function spawn() {
      const free = [...Array(9).keys()].filter((h) => !up.has(h));
      if (!free.length) return;
      const correctUp = [...up.values()].some((v) => v.text === it.a);
      const wantRight = !correctUp && (sinceRight >= 2 || Math.random() < 0.38);
      const wrongs = it.opts.filter(
        (o) => o !== it.a && ![...up.values()].some((v) => v.text === o),
      );
      const text =
        wantRight || !wrongs.length
          ? correctUp
            ? null
            : it.a
          : wrongs[Math.floor(Math.random() * wrongs.length)];
      if (!text) return;
      sinceRight = text === it.a ? 0 : sinceRight + 1;
      show(free[Math.floor(Math.random() * free.length)], text);
    }
    moles.forEach((m, h) =>
      m.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (!S.alive() || !up.has(h)) return;
        const v = up.get(h);
        if (v.text === it.a) {
          m.className = "ar-mole is-up is-ok";
          const quick = v.until > stay * 0.5;
          S.ok(quick ? 15 : 10);
          pop(field, quick ? "+15 ⚡" : "+10");
          api.clearFeedback();
          up.delete(h);
          setTimeout(() => {
            if (S.alive()) {
              hide(h);
              next();
            }
          }, 260);
          stay = Math.max(1.05, stay * 0.96);
          gap = Math.max(0.38, gap * 0.97);
        } else {
          m.className = "ar-mole is-up is-no";
          S.bad(it);
          pop(field, "−1 ❤️", true);
          shake(field);
          api.feedback(
            false,
            `<b>„${api.esc(v.text)}“ passt nicht.</b><span>Richtig: <b>${api.esc(it.a)}</b></span>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`,
          );
          up.delete(h);
          setTimeout(() => S.alive() && hide(h), 350);
          if (S.lives <= 0) return setTimeout(() => S.end(), 600);
          next();
        }
        api.hud({
          score: S.score,
          lives: S.lives,
          maxLives: S.maxLives,
          step: `Treffer: ${S.right}`,
        });
      }),
    );
    function tick(now) {
      if (!S.alive()) {
        timer?.stop();
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      spawnT -= dt;
      since += dt;
      for (const [h, v] of up) {
        v.until -= dt;
        if (v.until <= 0) hide(h);
      }
      if (spawnT <= 0) {
        spawn();
        spawnT = gap;
      }
      raf = requestAnimationFrame(tick);
    }
    cfg.onEnd = () => {
      cancelAnimationFrame(raf);
      timer?.stop();
    };
    next();
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  /* ---------- 4) Quiz-Leiter ---------- */
  function ladder(api, cfg) {
    const steps = cfg.steps || 12,
      safe = cfg.safe || [4, 8],
      endless = !!cfg.endless,
      sec = cfg.seconds || 30;
    let pool = api.shuffle(prep(cfg.items, 4)),
      p = 0;
    const S = session(
      api,
      { ...cfg, lives: endless ? cfg.lives || 3 : 1 },
      endless ? 0 : steps,
    );
    const jok = { half: true, time: true, swap: true };
    let it = null,
      timer = null,
      left = sec,
      busy = false,
      level = 0;
    const draw = () => {
      if (!S.alive()) return;
      it = pool[p++ % pool.length]; if (window.DM_TEST) window.DM_TEST.a = it.a;
      busy = false;
      left = sec;
      api.clearFeedback();
      const opts = api.shuffle(it.opts);
      api.el.innerHTML = `${endless ? "" : `<div class="ar-ladder" aria-label="Stufe ${level + 1} von ${steps}">${Array.from({ length: steps }, (_, i) => `<span class="ar-step${i < level ? " is-done" : ""}${i === level ? " is-cur" : ""}${safe.includes(i + 1) ? " is-safe" : ""}">${i + 1}</span>`).join("")}</div>`}
        <div class="ar-clock"><i style="width:100%"></i></div>
        <div class="ar-prompt">${promptHTML(api, it, false)}</div>
        <div class="ch-opts ar-qopts">${opts.map((o, k) => `<button type="button" class="ch-opt" data-k="${k}" data-v="${api.esc(o)}"><kbd>${k + 1}</kbd><span>${api.esc(o)}</span></button>`).join("")}</div>
        <div class="ar-jokers"><button type="button" class="ar-joker" data-j="half" ${jok.half ? "" : "disabled"}>50 : 50</button><button type="button" class="ar-joker" data-j="time" ${jok.time ? "" : "disabled"}>⏱ +15 s</button><button type="button" class="ar-joker" data-j="swap" ${jok.swap ? "" : "disabled"}>🔄 Andere Frage</button></div>
        ${endless ? "" : `<p class="ar-help">Gelbe Stufen sind sicher: Wenn du später einen Fehler machst, behältst du sie.</p>`}`;
      bindSay(api, api.el.querySelector(".ar-prompt"), it, false);
      const btns = [...api.el.querySelectorAll(".ch-opt")];
      btns.forEach((b) => (b.onclick = () => answer(b, btns)));
      api.el
        .querySelectorAll(".ar-joker")
        .forEach((b) => (b.onclick = () => joker(b.dataset.j, btns)));
      api.hud({
        score: S.score,
        ...(endless
          ? { lives: S.lives, maxLives: S.maxLives, step: `Frage ${S.n + 1}` }
          : { step: `Stufe ${level + 1} / ${steps}`, progress: level / steps }),
      });
      timer?.stop();
      const clock = api.el.querySelector(".ar-clock");
      timer = api.timer(
        sec,
        (r) => {
          left = r;
          const i = clock?.querySelector("i");
          if (i) i.style.width = Math.max(0, (r / sec) * 100) + "%";
          clock?.classList.toggle("is-low", r <= 7);
          api.hud({ time: r });
        },
        () => {
          if (!busy) answer(null, btns);
        },
      );
    };
    function joker(j, btns) {
      if (!jok[j] || busy) return;
      jok[j] = false;
      if (j === "half") {
        const wrong = btns.filter((b) => b.dataset.v !== it.a);
        api
          .shuffle(wrong)
          .slice(0, 2)
          .forEach((b) => {
            b.classList.add("is-gone");
            b.disabled = true;
          });
      }
      if (j === "time") {
        const t = left + 15;
        timer?.stop();
        const clock = api.el.querySelector(".ar-clock");
        timer = api.timer(
          t,
          (r) => {
            left = r;
            const i = clock?.querySelector("i");
            if (i) i.style.width = Math.min(100, (r / sec) * 100) + "%";
            clock?.classList.toggle("is-low", r <= 7);
            api.hud({ time: r });
          },
          () => {
            if (!busy) answer(null, btns);
          },
        );
      }
      if (j === "swap") {
        timer?.stop();
        return draw();
      }
      api.el.querySelector(`[data-j="${j}"]`).disabled = true;
    }
    function answer(btn, btns) {
      if (busy || !S.alive()) return;
      busy = true;
      timer?.stop();
      const ok = btn && btn.dataset.v === it.a;
      btns.forEach((b) => {
        b.disabled = true;
        if (b.dataset.v === it.a) b.classList.add("is-right");
      });
      if (btn && !ok) btn.classList.add("is-wrong");
      api.el.querySelectorAll(".ar-joker").forEach((b) => (b.disabled = true));
      S.n++;
      if (ok) {
        level++;
        S.right++;
        S.score = endless
          ? S.score + 10 + Math.max(0, left)
          : level * 10 + (safe.includes(level) ? 5 : 0);
        api.feedback(
          true,
          `<b>Richtig!${!endless && safe.includes(level) ? " 🛟 Sichere Stufe erreicht." : ""}</b>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`,
        );
        if (!endless && level >= steps) {
          api.hud({ progress: 1, score: S.score });
          return api.next("Ganz oben! Ergebnis ansehen", () => S.end());
        }
        return api.next("Nächste Stufe", draw);
      }
      S.bad(it);
      api.feedback(
        false,
        `<b>${btn ? "Leider falsch." : "Die Zeit ist um!"}</b><span>Richtig: <b>${api.esc(it.a)}</b></span>${it.tip ? `<span>${api.esc(it.tip)}</span>` : ""}`,
      );
      if (endless) {
        api.hud({ lives: S.lives, maxLives: S.maxLives, score: S.score });
        return S.lives > 0
          ? api.next("Weiter", draw)
          : api.next("Ergebnis ansehen", () => S.end());
      }
      const keep = [...safe].reverse().find((s) => s <= level) || 0;
      S.score = keep * 10 + (keep ? 5 : 0);
      api.next(
        keep ? `Zurück auf Stufe ${keep} – Ergebnis` : "Ergebnis ansehen",
        () => S.end(),
      );
    }
    cfg.onEnd = () => timer?.stop();
    draw();
  }

  /* ---------- 5) Zeitstrahl ---------- */
  function order(api, cfg) {
    const events = cfg.events; // [[jahr, kurz, lang]]
    const sizes = cfg.sizes || [3, 3, 4, 4, 5, 5, 6, 6];
    const S = session(api, cfg, sizes.length);
    S.hud();
    let r = 0;
    function round() {
      if (!S.alive()) return;
      if (r >= sizes.length || S.lives <= 0) return S.end();
      // Ereignisse mit verschiedenen Jahren
      const set = [];
      for (const e of api.shuffle(events)) {
        if (!set.some((x) => x[0] === e[0])) set.push(e);
        if (set.length === sizes[r]) break;
      }
      const sorted = [...set].sort((a, b) => a[0] - b[0]);
      let pos = 0,
        mistakes = 0;
      const t0 = Date.now();
      api.clearFeedback();
      S.hud();
      api.el.innerHTML = `<div class="ar-prompt"><span class="ar-q">Was war zuerst?</span><span class="ar-sub">Tippe die Ereignisse von alt nach neu an. Runde ${r + 1}: ${set.length} Karten</span></div>
        <div class="ar-line" aria-live="polite"><span class="ar-line-empty">Hier entsteht dein Zeitstrahl …</span></div>
        <div class="ar-cards">${api
          .shuffle(set)
          .map(
            (e) =>
              `<button type="button" class="ar-card" data-y="${e[0]}">${api.esc(e[1])}</button>`,
          )
          .join("")}</div>`;
      const line = api.el.querySelector(".ar-line");
      api.el.querySelectorAll(".ar-card").forEach(
        (b) =>
          (b.onclick = () => {
            if (!S.alive()) return;
            const y = +b.dataset.y;
            if (y === sorted[pos][0]) {
              line.querySelector(".ar-line-empty")?.remove();
              const e = sorted[pos];
              line.insertAdjacentHTML(
                "beforeend",
                `<div class="ar-placed"><b>${e[0]}</b>${api.esc(e[1])}</div>`,
              );
              b.remove();
              pos++;
              if (pos === sorted.length) {
                const secs = (Date.now() - t0) / 1000,
                  bonus = Math.max(0, Math.round(20 - secs));
                S.score += sorted.length * 10 + bonus + (mistakes ? 0 : 10);
                if (!mistakes) S.right++;
                r++;
                S.n = r;
                S.hud();
                api.feedback(
                  true,
                  `<b>${mistakes ? "Geschafft!" : "Perfekt! +10 Bonus"}</b><span>Zeitbonus: +${bonus}</span>`,
                );
                api.next(
                  r < sizes.length ? "Nächste Runde" : "Ergebnis ansehen",
                  round,
                );
              }
            } else {
              mistakes++;
              S.bad(null);
              shake(b);
              api.hud({ lives: S.lives, maxLives: S.maxLives });
              const e = set.find((x) => x[0] === y);
              S.wrong.push({ correct: `${e[0]}: ${e[2] || e[1]}`, tip: "" });
              api.feedback(
                false,
                `<b>Noch nicht!</b><span>„${api.esc(e[1])}“ war erst ${e[0]}. Es gibt ein früheres Ereignis.</span>`,
              );
              if (S.lives <= 0) {
                api.el
                  .querySelectorAll(".ar-card")
                  .forEach((c) => (c.disabled = true));
                api.next("Ergebnis ansehen", () => S.end());
              }
            }
          }),
      );
    }
    round();
  }

  window.DMArcade = { catcher, sorter, whack, ladder, order };
})();
