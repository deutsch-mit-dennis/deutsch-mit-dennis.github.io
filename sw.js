/* Offline-Speicher für die App „Deutsch mit Dennis“.
   - Seite (HTML): erst aus dem Netz, ohne Netz aus dem Speicher → immer aktuell, offline trotzdem nutzbar.
   - Skripte, Styles, Daten, Bilder, Schriften: sofort aus dem Speicher, im Hintergrund aktualisiert.
   - Audio, Video und fremde Seiten (YouTube, Suno, Digistore24 …) gehen direkt ins Netz. */
const VERSION = "dm-app-1";
const SHELL = "dm-shell";
const RUN = "dm-run";

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const c = await caches.open(SHELL);
      const res = await fetch("/index.html", { cache: "no-cache" });
      const html = await res.clone().text();
      await c.put("/index.html", res);
      // alle Skripte und Styles der Startseite gleich mitspeichern
      const urls = [...html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|css)(?:\?[^"]*)?)"/g)].map((m) => "/" + m[1].replace(/^\.?\//, ""));
      urls.push("/favicon.svg", "/manifest.webmanifest", "/assets/app/icon-192.png", "/assets/fonts/atkinson-hyperlegible-latin-400-normal.woff2", "/assets/fonts/atkinson-hyperlegible-latin-700-normal.woff2");
      await Promise.allSettled([...new Set(urls)].map((u) => c.add(u)));
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      for (const k of await caches.keys()) if (![SHELL, RUN].includes(k)) await caches.delete(k);
      await self.clients.claim();
    })(),
  );
});

const STATIC = /\.(?:js|css|json|svg|png|jpe?g|webp|gif|woff2?|ico|webmanifest)$/i;

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fremde Seiten nicht anfassen
  if (req.headers.has("range") || ["audio", "video"].includes(req.destination) || /\.(mp3|mp4|m4a|ogg|wav|pdf|zip)$/i.test(url.pathname)) return;
  if (url.pathname === "/sw.js") return;

  if (req.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok && (url.pathname === "/" || url.pathname === "/index.html")) {
            const c = await caches.open(SHELL);
            c.put("/index.html", res.clone());
          }
          return res;
        } catch {
          const c = await caches.open(SHELL);
          return (await c.match("/index.html")) || new Response("<h1>Keine Internetverbindung</h1><p>Bitte später noch einmal versuchen.</p>", { headers: { "content-type": "text/html; charset=utf-8" } });
        }
      })(),
    );
    return;
  }

  if (STATIC.test(url.pathname)) {
    e.respondWith(
      (async () => {
        const shell = await caches.open(SHELL);
        const hit = (await shell.match(req)) || (await caches.match(req, { cacheName: RUN }));
        const net = fetch(req)
          .then(async (res) => {
            if (res.ok && res.type === "basic") {
              const c = await caches.open(hit && (await shell.match(req)) ? SHELL : RUN);
              // alte Versionen derselben Datei (anderes ?v=) entfernen
              for (const k of await c.keys()) {
                const u = new URL(k.url);
                if (u.pathname === url.pathname && u.search !== url.search) c.delete(k);
              }
              c.put(req, res.clone());
            }
            return res;
          })
          .catch(() => null);
        if (hit) {
          e.waitUntil(net);
          return hit;
        }
        return (await net) || new Response("", { status: 504 });
      })(),
    );
  }
});
