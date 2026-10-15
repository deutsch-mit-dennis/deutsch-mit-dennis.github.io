/* App-Funktion entfernt: alte Service Worker und Offline-Speicher auf diesem Gerät abmelden bzw. löschen. */
(() => {
  try {
    navigator.serviceWorker?.getRegistrations?.().then((rs) => rs.forEach((r) => r.unregister()));
    window.caches?.keys?.().then((ks) => ks.filter((k) => k.startsWith("dm-")).forEach((k) => caches.delete(k)));
  } catch {}
})();
