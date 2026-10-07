/* Benachrichtigung über neue Inhalte.
   Quellen: neu.json (Material, Übungen …), youtube-feed.json (Videos), kahoot-feed.json (Quizze).
   Was der Browser schon kennt, steht in localStorage 'dm-seen' (Liste von Schlüsseln).
   Beim ersten Besuch gilt alles als bekannt – Benachrichtigungen gibt es ab dem zweiten Besuch.
   🔔 im Kopf zeigt die Zahl neuer Einträge; beim Öffnen gelten sie als gesehen.
   Zusätzlich einmal pro Sitzung ein kleiner Hinweis oben rechts. */
(function () {
  const SEEN = 'dm-seen', TOAST = 'dm-news-toast', MAXAGE = 60 * 864e5, YT = 'https://www.youtube.com/@deutsch-mit-Dennis?sub_confirmation=1';
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const day = s => { const d = new Date(s); return isNaN(d) ? '' : d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' }); };
  const LABEL = { video: '▶ Video', kahoot: '🎯 Kahoot', lied: '♪ Lied', hoeren: '🎧 Hören', sprechen: '🗣 Sprechen', schreiben: '✍ Schreiben', uebung: '✏ Übung', neu: '✨ Neu' };
  const j = u => fetch(u + '?v=' + Math.floor(Date.now() / 36e5), { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).catch(() => null);

  let cache = null;
  function load() {
    if (cache) return cache;
    cache = Promise.all([j('neu.json'), j('youtube-feed.json'), j('kahoot-feed.json')]).then(([n, y, k]) => {
      const out = [];
      (n && n.items || []).forEach(i => out.push({ date: i.date, type: i.type || 'neu', title: i.title, link: i.link || '#' }));
      (y && y.videos || []).forEach(v => v.published && out.push({ date: v.published, type: 'video', title: 'Neues Video: ' + v.title, link: '#videos/alle/' + v.id }));
      (k && k.kahoots || []).forEach(q => q.created && out.push({ date: q.created, type: 'kahoot', title: 'Neues Kahoot-Quiz: ' + q.title, link: '#kahoot' }));
      out.forEach(i => { i.key = i.type + '|' + i.link + '|' + i.title; i.t = +new Date(i.date) || 0; });
      return out.sort((a, b) => b.t - a.t);
    });
    return cache;
  }
  const seenSet = () => { try { return new Set(JSON.parse(get(SEEN) || 'null') || []); } catch { return new Set(); } };
  const markSeen = items => set(SEEN, JSON.stringify(items.slice(0, 300).map(i => i.key)));
  const fresh = items => { const s = seenSet(); return items.filter(i => !s.has(i.key) && Date.now() - i.t < MAXAGE); };

  /* ---------- Glocke im Kopf ---------- */
  const bell = document.createElement('button');
  bell.type = 'button'; bell.className = 'dm-bell'; bell.setAttribute('aria-haspopup', 'dialog'); bell.setAttribute('aria-expanded', 'false');
  bell.innerHTML = '<span aria-hidden="true">🔔</span><b class="dm-bell-n" hidden></b>';
  const head = document.querySelector('header.dm-header');
  if (head) head.querySelector('.logo')?.after(bell);
  function badge(n) {
    const b = bell.querySelector('.dm-bell-n');
    b.hidden = !n; b.textContent = n > 9 ? '9+' : n;
    bell.setAttribute('aria-label', n ? `Neuigkeiten: ${n} neu` : 'Neuigkeiten');
    bell.title = n ? `${n} neue Inhalte` : 'Neuigkeiten';
  }
  badge(0);

  let panel = null;
  function closePanel() { if (!panel) return; panel.remove(); panel = null; bell.setAttribute('aria-expanded', 'false'); }
  async function openPanel() {
    if (panel) return closePanel();
    hideToast();
    const items = await load(), nw = new Set(fresh(items).map(i => i.key));
    panel = document.createElement('div');
    panel.className = 'dm-news-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Neuigkeiten');
    const list = items.slice(0, Math.max(8, nw.size));
    panel.innerHTML = `<div class="dm-news-head"><b>Neu auf der Seite</b><button type="button" class="dm-news-x" aria-label="Schließen">×</button></div>
      <ul>${list.map(i => `<li${nw.has(i.key) ? ' class="is-new"' : ''}><a href="${esc(i.link)}"><small>${LABEL[i.type] || LABEL.neu} · ${day(i.date)}${nw.has(i.key) ? ' · <em>neu</em>' : ''}</small><span>${esc(i.title)}</span></a></li>`).join('') || '<li><span>Noch nichts Neues.</span></li>'}</ul>
      <div class="dm-news-foot"><p>Nichts verpassen:</p>
        <a href="${YT}" target="_blank" rel="noopener noreferrer">▶ YouTube abonnieren</a>
        <a href="feed.xml" target="_blank" rel="noopener">RSS-Feed</a></div>`;
    document.body.appendChild(panel);
    bell.setAttribute('aria-expanded', 'true');
    panel.querySelector('.dm-news-x').onclick = closePanel;
    panel.addEventListener('click', e => { if (e.target.closest('ul a')) closePanel(); });
    panel.querySelector('.dm-news-x').focus();
    markSeen(items); badge(0);
  }
  bell.addEventListener('click', e => { e.stopPropagation(); openPanel(); });
  document.addEventListener('click', e => { if (panel && !panel.contains(e.target)) closePanel(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel) { closePanel(); bell.focus(); } });

  /* ---------- Hinweis einmal pro Sitzung ---------- */
  let toast = null;
  function hideToast() { if (!toast) return; const t = toast; toast = null; t.classList.remove('dm-in'); setTimeout(() => t.remove(), 300); }
  function showToast(nw) {
    try { if (sessionStorage.getItem(TOAST)) return; sessionStorage.setItem(TOAST, '1'); } catch {}
    if (document.getElementById('dm-tour')) return;
    toast = document.createElement('aside');
    toast.className = 'dm-news-toast'; toast.setAttribute('role', 'status');
    const top = nw.slice(0, 2), more = nw.length - top.length;
    toast.innerHTML = `<button type="button" class="dm-news-x" aria-label="Schließen">×</button>
      <p class="dm-news-t">🔔 Neu seit deinem letzten Besuch</p>
      <ul>${top.map(i => `<li><a href="${esc(i.link)}">${esc(i.title)}</a></li>`).join('')}</ul>
      ${more > 0 ? `<button type="button" class="dm-news-all">+ ${more} weitere ansehen</button>` : ''}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast && toast.classList.add('dm-in'));
    toast.querySelector('.dm-news-x').onclick = hideToast;
    toast.querySelector('.dm-news-all')?.addEventListener('click', e => { e.stopPropagation(); openPanel(); });
    toast.querySelectorAll('ul a').forEach(a => a.addEventListener('click', () => hideToast()));
    setTimeout(hideToast, 14000);
  }

  function start() {
    load().then(items => {
      if (get(SEEN) === null) { markSeen(items); return; } // erster Besuch: nichts melden
      const nw = fresh(items);
      badge(nw.length);
      if (nw.length) setTimeout(() => showToast(nw), 2500);
    });
  }
  window.DMNews = { items: load };
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
