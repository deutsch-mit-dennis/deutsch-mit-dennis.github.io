/* App-Funktionen: Offline-Speicher anmelden und „Als App installieren“ (Android: Installationsfenster, iPhone: Anleitung). */
(() => {
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    addEventListener("load", () => navigator.serviceWorker?.register("/sw.js").catch(() => {}));
  }
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (standalone) document.documentElement.classList.add("dm-app");
  let deferred = null;
  addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e;
    show();
  });
  addEventListener("appinstalled", () => {
    deferred = null;
    document.documentElement.classList.remove("dm-can-install");
  });
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  function show() {
    if (standalone) return;
    document.documentElement.classList.toggle("dm-can-install", !!(deferred || ios));
  }
  function iosHelp() {
    const d = document.createElement("dialog");
    d.className = "dm-install-help";
    d.innerHTML = `<h2>Als App auf dem iPhone</h2>
      <ol><li>Tippe unten in Safari auf <b>Teilen</b> <span aria-hidden="true">⬆️</span>.</li>
      <li>Wähle <b>„Zum Home-Bildschirm“</b>.</li>
      <li>Tippe auf <b>„Hinzufügen“</b>.</li></ol>
      <p>Dann findest du „Deutsch lernen“ als App auf deinem Startbildschirm.</p>
      <button type="button" class="dm-btn">OK</button>`;
    document.body.append(d);
    d.querySelector("button").onclick = () => d.close();
    d.addEventListener("close", () => d.remove());
    d.showModal();
  }
  document.addEventListener("click", async (e) => {
    const b = e.target.closest(".dm-install");
    if (!b) return;
    e.preventDefault();
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice.catch(() => {});
      deferred = null;
      show();
    } else if (ios) iosHelp();
  });
  show();
  window.DMApp = { standalone, show };
})();
