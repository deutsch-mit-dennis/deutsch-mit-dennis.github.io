/* Amazon-Partnerlinks (Amazon PartnerNet).
   Die Tracking-ID steht NUR hier (TAG). Solange TAG leer ist, bleiben die Links ohne Tag und alle
   Werbe-Hinweise (Sternchen, Footer-Satz, Abschnitt in der Datenschutzerklärung) sind ausgeblendet.
   Neue Amazon-Links einfach normal eintragen (z. B. in DM.books / DM.bookTips in site-data.js):
   - beim Anzeigen macht DM.amazonUrl() daraus https://www.amazon.de/dp/ASIN?tag=TAG
   - beim Klick bekommt zusätzlich JEDER Amazon-Link auf der Seite den Tag (auch später per JavaScript eingefügte). */
(() => {
  const TAG = ''; // Amazon PartnerNet tracking ID, format xxxxx-21 (empty = affiliate links off)
  const HOST = /(^|\.)amazon\.(de|com|at|co\.uk)$/;

  // Clean product URL: amazon.de/dp/ASIN?tag=TAG (drops ref=, psc= and other tracking parameters).
  // amzn.to / amzn.eu short links cannot be resolved in the browser and stay as they are.
  function amazonUrl(href) {
    try {
      const u = new URL(href, location.href);
      if (!HOST.test(u.hostname)) return href;
      const asin = (u.pathname.match(/\/(?:dp|gp\/product|exec\/obidos\/ASIN)\/([A-Z0-9]{10})/i) || [])[1];
      if (asin) return `https://www.${u.hostname.replace(/^www\./, '')}/dp/${asin.toUpperCase()}${TAG ? `?tag=${TAG}` : ''}`;
      if (TAG) u.searchParams.set('tag', TAG);
      return u.toString();
    } catch (e) { return href; }
  }

  function tagLink(a) {
    if (!HOST.test(new URL(a.href, location.href).hostname)) return;
    a.href = amazonUrl(a.href);
    a.rel = 'sponsored nofollow noopener';
    a.target = '_blank';
  }

  ['click', 'auxclick'].forEach(ev => document.addEventListener(ev, e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (a) try { tagLink(a); } catch (err) {}
  }, true));

  window.DM ||= {};
  DM.amazonTag = TAG;
  DM.amazonUrl = amazonUrl;
  DM.amazonNote = TAG ? '* Werbelink: Kaufst du über diesen Link, bekomme ich eine kleine Provision. Für dich ändert sich der Preis nicht.' : '';
  if (TAG) document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('[data-amazon-partner]').forEach(el => { el.hidden = false; }));

  // self-check (silent unless something is wrong)
  const t = amazonUrl('https://www.amazon.de/Buch-Titel/dp/B0HNTX6KSF/ref=sr_1_1?psc=1&tag=alt-21');
  if (t !== `https://www.amazon.de/dp/B0HNTX6KSF${TAG ? `?tag=${TAG}` : ''}`) console.warn('affiliate.js: amazonUrl self-check failed', t);
})();
