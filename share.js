/* Teilen: Website oder aktuelle Seite per Link weitergeben.
   Handy: natives Teilen-Menü (WhatsApp, Telegram, …). Sonst: eigenes Fenster mit Knöpfen und „Link kopieren“. */
(function () {
  "use strict";
  const BASE = "https://deutsch-mit-dennis.de/";
  const TEXT =
    "Kostenlos Deutsch lernen von A0 bis B2 – mit Übungen, Hörtexten und Probeprüfungen. Schau mal:";
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  /* Real (indexable) page for the current #route, so a shared link counts for that page and shows its own preview.
     The list of static pages comes from share-paths.js (written by tools/build-sitemap.js, loaded on demand):
     window.DMSharePaths = { app: "lid pruefung …" (copies of the app, they accept an extra #part),
                             page: { grammatik: "a1-perfekt …", "": "impressum …" } (readable pages, exact match only) }.
     Without the list (not loaded yet, offline) the link stays /#route as before. */
  let paths = null;
  function loadPaths() {
    if (paths || loadPaths.busy) return;
    loadPaths.busy = true;
    const me = document.querySelector('script[src*="share.js"]');
    const v = ((me && me.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
    const sc = document.createElement("script");
    sc.src = "/share-paths.js?v=" + v + "-" + new Date().toISOString().slice(0, 10);
    sc.async = true;
    sc.onload = () => { paths = window.DMSharePaths || null; };
    sc.onerror = () => { loadPaths.busy = false; };
    document.head.appendChild(sc);
  }
  function hasPage(p) {
    if (!paths) return false;
    if ((" " + paths.app + " ").includes(" " + p + " ")) return "app";
    const i = p.lastIndexOf("/"), dir = i < 0 ? "" : p.slice(0, i), leaf = p.slice(i + 1);
    return (" " + ((paths.page || {})[dir] || "") + " ").includes(" " + leaf + " ") ? "page" : false;
  }
  // app routes use upper-case levels (#niveau/B2, #material/alle/B2), the static pages lower case (/niveau/b2/, /material/b2/)
  const staticForm = (r) => r.replace(/^material\/alle\/(\w\d)$/i, (_, l) => "material/" + l.toLowerCase()).replace(/^(niveau|ueben\/sprechen)\/(\w\d)$/i, (_, a, l) => a + "/" + l.toLowerCase());
  function pathFor(h) {
    const t = h.replace(/\/+$/, ""), r = staticForm(t);
    if (hasPage(r)) return BASE + r + "/";
    // longest app copy that is a prefix: /lieder/#a1 opens #lieder/a1 (see tools/make-share-pages.py); the rest keeps its case
    const seg = t.split("/");
    for (let n = seg.length - 1; n > 0; n--) {
      const pre = seg.slice(0, n).join("/");
      if (hasPage(pre) === "app") return BASE + pre + "/#" + seg.slice(n).join("/");
    }
    return BASE + "#" + h;
  }

  function currentUrl(whole) {
    const h = location.hash.replace(/^#\/?/, "");
    return whole || !h ? BASE : pathFor(h);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (_) {}
      t.remove();
      return ok;
    }
  }

  function panel(url, title) {
    close();
    const u = encodeURIComponent(url),
      msg = encodeURIComponent(TEXT + " " + url);
    const wrap = document.createElement("div");
    wrap.className = "dm-share-wrap";
    wrap.innerHTML = `<div class="dm-share" role="dialog" aria-modal="true" aria-labelledby="dm-share-h">
      <button type="button" class="dm-share-x" aria-label="Schließen">×</button>
      <h2 id="dm-share-h">Seite teilen</h2>
      <p class="dm-share-sub">${esc(title)}</p>
      <div class="dm-share-row">
        <input type="text" readonly value="${esc(url)}" aria-label="Link zur Seite">
        <button type="button" class="dm-btn dm-share-copy">Link kopieren</button>
      </div>
      <div class="dm-share-grid">
        <a href="https://wa.me/?text=${msg}" target="_blank" rel="noopener" class="s-wa">WhatsApp</a>
        <a href="https://t.me/share/url?url=${u}&text=${encodeURIComponent(TEXT)}" target="_blank" rel="noopener" class="s-tg">Telegram</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" class="s-fb">Facebook</a>
        <a href="mailto:?subject=${encodeURIComponent("Deutsch lernen mit Dennis")}&body=${msg}" class="s-mail">E-Mail</a>
      </div>
      <p class="dm-share-ok" role="status" aria-live="polite"></p>
    </div>`;
    document.body.appendChild(wrap);
    const box = wrap.querySelector(".dm-share"),
      inp = wrap.querySelector("input"),
      ok = wrap.querySelector(".dm-share-ok");
    wrap.addEventListener("click", (e) => {
      if (e.target === wrap) close();
    });
    wrap.querySelector(".dm-share-x").onclick = close;
    inp.onfocus = () => inp.select();
    wrap.querySelector(".dm-share-copy").onclick = async () => {
      ok.textContent = (await copy(url))
        ? "✓ Link kopiert – jetzt einfügen und senden."
        : "Bitte den Link markieren und kopieren.";
      if (!ok.textContent.startsWith("✓")) inp.select();
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => wrap.classList.add("is-in"));
    wrap.querySelector(".dm-share-copy").focus();
    track("panel");
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  function close() {
    document.querySelectorAll(".dm-share-wrap").forEach((w) => w.remove());
    document.removeEventListener("keydown", onKey);
  }
  function track(how) {
    try {
      window.gtag &&
        gtag("event", "share", {
          method: how,
          content_type: location.hash || "start",
        });
    } catch (_) {}
  }

  async function share(opts = {}) {
    const url = currentUrl(opts.whole),
      title =
        opts.whole || !location.hash.replace(/^#\/?/, "")
          ? "Deutsch lernen mit Dennis"
          : document.title;
    const coarse = window.matchMedia && matchMedia("(pointer:coarse)").matches;
    if (navigator.share && coarse) {
      try {
        await navigator.share({ title, text: TEXT, url });
        track("native");
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    panel(url, title);
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-share]");
    if (!b) return;
    e.preventDefault();
    share({ whole: b.dataset.share === "site" });
  });

  /* Knopf oben in der Kopfzeile (neben der Glocke) – auf jeder Seite sichtbar */
  function headerButton() {
    const head = document.querySelector('header.dm-header'); if (!head || head.querySelector('.dm-hshare')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'dm-hshare'; b.setAttribute('data-share', ''); b.setAttribute('aria-label', 'Diese Seite teilen'); b.title = 'Teilen';
    b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg><span>Teilen</span>';
    const bell = head.querySelector('.dm-bell');
    if (bell) bell.before(b); else head.querySelector('.logo')?.after(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', headerButton); else headerButton();
  // fetch the page list when the browser is idle (a share click must not wait for it: navigator.share needs the click)
  setTimeout(() => (window.requestIdleCallback || setTimeout)(loadPaths), 2500);
  document.addEventListener("pointerover", (e) => { if (e.target.closest && e.target.closest("[data-share]")) loadPaths(); }, { passive: true });
  setTimeout(headerButton, 1500);

  window.DMShare = { share, close, url: currentUrl };
})();
