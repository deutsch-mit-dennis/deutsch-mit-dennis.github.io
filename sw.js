/* Die App-Funktion wurde entfernt. Dieser Service Worker löscht den Offline-Speicher
   auf Geräten, die ihn schon geladen hatten, und meldet sich danach selbst ab. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      for (const k of await caches.keys()) await caches.delete(k);
      await self.registration.unregister();
      for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
    })(),
  );
});
