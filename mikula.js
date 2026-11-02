/* Mikula lernt Deutsch – KI-Figur aus dem Jahr 1024 macht typische Fehler, die Lösung wird aufgedeckt.
   Daten: mikula-feed.json (wird vom Reels-Projekt mit mikula-lernt-deutsch/publish_web.py gefüllt).
   Eine Folge erscheint erst ab "date" (Uhrzeit in Deutschland) – so kann sie vor dem Posten eingetragen werden.
   Startseite: Karte mit der neuesten Folge · Seite #mikula: alle Folgen. */
(() => {
  const IG = "https://www.instagram.com/deutsch_mit_dennis/reels/",
    TT = "https://www.tiktok.com/@deutsch_mit_dennis",
    MIK_IG = "https://www.instagram.com/mikula.timetraveler/",
    MIK_TT = "https://www.tiktok.com/@mikula.timetraveler";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // "2026-11-07T18:00" im Vergleich mit der aktuellen Uhrzeit in Berlin (egal, wo der Besucher ist)
  const nowBerlin = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date()).replace(" ", "T");
  let feed;
  const load = () =>
    (feed ||= fetch("mikula-feed.json?v=" + Math.floor(Date.now() / 36e5), { cache: "no-cache" })
      .then((r) => r.json())
      .then((j) => (j.items || []).filter((x) => x.date <= nowBerlin()).sort((a, b) => b.n - a.n))
      .catch(() => []));

  function episode(x, big) {
    return `<article class="mk-ep${big ? " is-big" : ""}">
      <img class="mk-cover" src="${esc(x.cover)}" alt="Mikula lernt Deutsch, Folge ${x.n}: ${esc(x.wrong)}" width="540" height="960" loading="lazy">
      <div class="mk-body">
        <p class="mk-num">Folge ${x.n}</p>
        <p class="mk-wrong"><span aria-hidden="true">❌</span> ${esc(x.wrong)}</p>
        <p class="mk-q">Was ist falsch?</p>
        <details class="mk-sol"><summary>Lösung zeigen</summary>
          <p class="mk-right"><span aria-hidden="true">✅</span> ${esc(x.right)}</p>
          <p class="mk-rule">${esc(x.rule)}</p>
          ${x.explain ? `<p class="mk-explain">${esc(x.explain)}</p>` : ""}
        </details>
        <div class="mk-links">
          <a class="mk-btn" href="${esc(x.ig || IG)}" target="_blank" rel="noopener">▶ Instagram</a>
          <a class="mk-btn" href="${esc(x.tt || TT)}" target="_blank" rel="noopener">▶ TikTok</a>
        </div>
      </div>
    </article>`;
  }

  const follow = `<p class="mk-follow">🌍 Mikulas Zeitreise um die Welt: <a href="${MIK_IG}" target="_blank" rel="noopener">Instagram</a> · <a href="${MIK_TT}" target="_blank" rel="noopener">TikTok</a> <span>(@mikula.timetraveler)</span></p>`;

  // Startseite: Platzhalter sofort, Inhalt nach dem Laden; ohne veröffentlichte Folge bleibt der Bereich leer
  function card() {
    load().then((items) => {
      const box = document.getElementById("mk-home");
      if (!box) return;
      if (!items.length) return box.remove();
      box.innerHTML = `<div class="mk-card">
        <div class="mk-head"><span class="mk-ico" aria-hidden="true">🧔</span><h2 id="mk-h">Mikula lernt Deutsch</h2><a class="mk-more" href="#mikula">Alle Folgen →</a></div>
        <p class="mk-intro">Mikula kommt aus dem Jahr 1024 und macht typische Fehler. Erkennst du den Fehler?</p>
        ${episode(items[0])}
        ${follow}
      </div>`;
    });
    return `<section class="dm-section mk-home" id="mk-home" aria-labelledby="mk-h"></section>`;
  }

  function page() {
    const main = document.getElementById("main");
    main.innerHTML = `<section class="dm-section mk-page">
      <p class="step-label">Typische Fehler · mit Lösung</p>
      <h1>Mikula lernt Deutsch</h1>
      <p class="mk-intro">Mikula ist ein Bauer aus dem Jahr 1024. Seine Zeitmaschine ist kaputt, jetzt lernt er Deutsch. Dabei macht er die Fehler, die viele Lernende machen. Lies den Satz, finde den Fehler und klick dann auf „Lösung zeigen“. Neue Folgen kommen mittwochs und samstags.</p>
      ${follow}
      <div class="mk-list" aria-busy="true"><p class="dm-hint">Folgen werden geladen …</p></div>
      <p class="mk-note">Mikula ist eine KI-Figur. Bild und Stimme von Mikula sind KI-generiert, die Erklärungen spricht Dennis.</p>
    </section>`;
    load().then((items) => {
      const list = main.querySelector(".mk-list");
      if (!list) return;
      list.removeAttribute("aria-busy");
      list.innerHTML = items.length ? items.map((x) => episode(x, true)).join("") : `<p class="dm-hint">Die erste Folge kommt bald.</p>`;
    });
  }

  if (!document.getElementById("mk-css")) {
    const st = document.createElement("style");
    st.id = "mk-css";
    st.textContent = `
.mk-card{background:linear-gradient(135deg,#eef7ee,#dff0e0);border:2px solid #9fd3a6;border-radius:20px;padding:16px 18px 14px;box-shadow:0 6px 18px rgba(34,120,60,.10)}
.mk-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 6px}
.mk-head h2{margin:0;font-size:20px;color:#172036}
.mk-ico{font-size:30px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}
.mk-more{margin-left:auto;font-weight:800;color:#2341B5;text-decoration:none;white-space:nowrap}
.mk-more:hover{text-decoration:underline}
.mk-intro{margin:0 0 12px;color:#3b4258;max-width:62ch}
.mk-ep{display:flex;gap:14px;align-items:flex-start;background:#fff;border-radius:16px;padding:12px}
.mk-cover{width:110px;height:auto;aspect-ratio:9/16;object-fit:cover;border-radius:12px;flex:none}
.mk-ep.is-big .mk-cover{width:140px}
.mk-body{min-width:0;flex:1}
.mk-num{margin:0 0 4px;font-weight:800;color:#5b6680;font-size:14px}
.mk-wrong{margin:0 0 4px;font-size:19px;font-weight:800;color:#172036;text-decoration:line-through;text-decoration-color:#e5484d;text-decoration-thickness:3px}
.mk-q{margin:0 0 6px;color:#3b4258}
.mk-sol{margin:0 0 10px}
.mk-sol summary{cursor:pointer;font-weight:800;color:#22a05a;min-height:44px;display:inline-flex;align-items:center}
.mk-right{margin:4px 0;font-size:19px;font-weight:800;color:#1c8a4c}
.mk-rule{margin:0 0 4px;font-weight:800;color:#7a5600}
.mk-explain{margin:0;color:#3b4258;line-height:1.5}
.mk-links{display:flex;flex-wrap:wrap;gap:8px}
.mk-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:8px 16px;border-radius:99px;border:2px solid #2341B5;background:#fff;color:#2341B5;font:800 15px var(--dm-font);text-decoration:none}
.mk-btn:hover{background:#2341B5;color:#fff}
.mk-btn:focus-visible{outline:3px solid #2341B5;outline-offset:2px}
.mk-follow{margin:12px 0 0;font-weight:700;color:#172036}
.mk-follow a{color:#2341B5}
.mk-follow span{font-weight:500;color:#5b6680}
.mk-list{display:grid;gap:14px;margin-top:16px}
.mk-page .mk-ep{border:2px solid #d6e9d8}
.mk-note{color:#5b6680;font-size:15px;margin:16px 0 0}
@media (max-width:480px){.mk-card{padding:14px}.mk-ep{gap:10px;padding:10px}.mk-cover,.mk-ep.is-big .mk-cover{width:88px}.mk-wrong,.mk-right{font-size:17px}.mk-links>*{flex:1 1 auto}}
`;
    document.head.appendChild(st);
  }

  window.DMMikula = { card, load };
  window.DM ||= {};
  DM.routes ||= {};
  DM.routes.mikula = () => page();
})();
