/* Lädt Cloudflare Web Analytics, sobald in site-data.js ein Token eingetragen ist (DM.analytics.cloudflareToken).
   Ohne Cookies; "spa": true zählt auch die Seitenwechsel innerhalb der Seite. */
(function () {
  const t = window.DM && DM.analytics && DM.analytics.cloudflareToken;
  if (!t || /^(localhost|127\.)/.test(location.hostname)) return;
  const s = document.createElement('script');
  s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: t, spa: true }));
  document.head.appendChild(s);
})();
