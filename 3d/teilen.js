/* 3D view: share button (shares the normal website, because the 3D page is not indexed) */
(function () {
  "use strict";
  var URL_ = "https://deutsch-mit-dennis.de/";
  var TEXT = "Kostenlos Deutsch lernen von A1 bis B2 \u2013 mit \u00dcbungen, H\u00f6rtexten und Probepr\u00fcfungen. Schau mal:";
  var btn = document.getElementById("share3d"), ok = document.getElementById("share3d-ok");
  if (!btn) return;
  function say(t) { if (ok) { ok.textContent = t; setTimeout(function () { ok.textContent = ""; }, 4000); } }
  function copy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(URL_).then(function () { say("\u2713 Link kopiert"); }, fallback);
    }
    fallback();
  }
  function fallback() {
    var t = document.createElement("textarea");
    t.value = URL_; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(t); t.select();
    var done = false; try { done = document.execCommand("copy"); } catch (e) {}
    t.remove(); say(done ? "\u2713 Link kopiert" : URL_);
  }
  btn.addEventListener("click", function () {
    var coarse = window.matchMedia && matchMedia("(pointer:coarse)").matches;
    if (navigator.share && coarse) {
      navigator.share({ title: "Deutsch lernen mit Dennis", text: TEXT, url: URL_ }).catch(function (e) {
        if (!e || e.name !== "AbortError") copy();
      });
    } else copy();
  });
})();
