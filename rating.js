/* Kleine Sterne-Abfrage „Hilft dir die Seite?“
   Erscheint nur nach echter Nutzung (3 erledigte Übungen oder 2. Besuch), nur auf Übersichtsseiten,
   höchstens einmal; „Später“ fragt frühestens nach 30 Tagen wieder. Ergebnis geht per FormSubmit an Dennis. */
(function () {
  const RK = 'dm-rate', VK = 'dm-visits', MEM = 'dmd.v1';
  const OK_ROUTES = ['', 'lernweg', 'lernen', 'ueben', 'pruefung', 'lieder', 'material', 'videos', 'lernpakete', 'hoeren', 'kahoot', 'orientierungskurs'];
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  const email = () => (window.DM && DM.teacher && DM.teacher.email) || 'dennis.prudnikau@gmail.com';

  // Besuche zählen (einmal pro Browser-Sitzung)
  try { if (!sessionStorage.getItem(VK)) { sessionStorage.setItem(VK, '1'); set(VK, String((+get(VK) || 0) + 1)); } } catch {}

  function state() { try { return JSON.parse(get(RK) || '{}'); } catch { return {}; } }
  function eligible() {
    const s = state();
    if (s.done) return false;
    if (s.later && Date.now() < s.later) return false;
    let done = 0; try { done = Object.keys((JSON.parse(get(MEM) || '{}').done) || {}).length; } catch {}
    return done >= 3 || (+get(VK) || 0) >= 2;
  }
  function onOverview() {
    const p = decodeURIComponent(location.hash.slice(1)).replace(/^\/+/, '').split('/');
    return OK_ROUTES.includes(p[0]) && p.length <= 1;
  }
  async function send(stars, text) {
    const body = { _subject: `Bewertung: ${stars} von 5 Sternen`, _template: 'table', _captcha: 'false', Sterne: '★'.repeat(stars) + '☆'.repeat(5 - stars), Kommentar: text || '–', Seite: location.hash || '#' };
    try { await fetch(`https://formsubmit.co/ajax/${email()}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) }); } catch {}
  }

  function show() {
    if (document.getElementById('dm-rate') || document.getElementById('dm-tour')) return;
    const c = document.createElement('aside');
    c.id = 'dm-rate'; c.className = 'dm-rate'; c.setAttribute('aria-label', 'Kurze Frage');
    c.innerHTML = `<button type="button" class="dm-rate-x" aria-label="Schließen">×</button>
      <div class="dm-rate-step" data-step="ask"><p class="dm-rate-q">Hilft dir die Seite beim Deutschlernen?</p>
        <div class="dm-rate-stars" role="radiogroup" aria-label="Bewertung von 1 bis 5 Sternen">${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${n} von 5 Sternen">★</button>`).join('')}</div>
        <button type="button" class="dm-rate-later">Später</button></div>
      <div class="dm-rate-step" data-step="good" hidden><p class="dm-rate-q">Danke! 😊</p><p>Magst du mir in einem Satz schreiben, was dir gefällt?</p>
        <textarea rows="2" maxlength="300" placeholder="Zum Beispiel: Die Lieder helfen mir sehr."></textarea>
        <div class="dm-rate-row"><button type="button" class="dm-btn dm-rate-send">Senden</button><button type="button" class="dm-rate-skip">Nein, danke</button></div></div>
      <div class="dm-rate-step" data-step="thanks" hidden><p class="dm-rate-q">Vielen Dank! 💙</p><p>Erzähl gern im Kurs von der Seite – das hilft mir am meisten.</p>
        <button type="button" class="dm-btn dm-btn-quiet dm-rate-share">🔗 Seite teilen</button></div>`;
    document.body.appendChild(c);
    requestAnimationFrame(() => c.classList.add('dm-rate-in'));
    const step = n => c.querySelectorAll('.dm-rate-step').forEach(s => s.hidden = s.dataset.step !== n);
    const close = () => { c.classList.remove('dm-rate-in'); setTimeout(() => c.remove(), 300); };
    let stars = 0;
    c.querySelector('.dm-rate-x').onclick = () => { if (!stars) set(RK, JSON.stringify({ later: Date.now() + 30 * 864e5 })); close(); };
    c.querySelector('.dm-rate-later').onclick = () => { set(RK, JSON.stringify({ later: Date.now() + 30 * 864e5 })); close(); };
    const btns = [...c.querySelectorAll('.dm-rate-stars button')];
    btns.forEach(b => {
      b.onmouseenter = () => btns.forEach(o => o.classList.toggle('on', +o.dataset.n <= +b.dataset.n));
      b.onmouseleave = () => btns.forEach(o => o.classList.remove('on'));
      b.onclick = () => {
        stars = +b.dataset.n; set(RK, JSON.stringify({ done: Date.now(), stars }));
        btns.forEach(o => { o.classList.toggle('sel', +o.dataset.n <= stars); o.setAttribute('aria-checked', String(+o.dataset.n === stars)); });
        if (stars >= 4) { step('good'); c.querySelector('textarea').focus(); }
        else {
          send(stars, '(weiter zu „Deine Meinung“)');
          close();
          location.hash = '#pinnwand';
          setTimeout(() => {
            const r = document.querySelector('input[name=type][value=kritik]'); if (r) r.click();
            const t = document.getElementById('dm-pin-text');
            if (t) { t.placeholder = 'Schade! Was kann ich besser machen?'; t.scrollIntoView({ block: 'center' }); t.focus(); }
          }, 600);
        }
      };
    });
    c.querySelector('.dm-rate-send').onclick = () => { send(stars, c.querySelector('textarea').value.trim()); step('thanks'); setTimeout(close, 9000); };
    c.querySelector('.dm-rate-skip').onclick = () => { send(stars, ''); step('thanks'); setTimeout(close, 9000); };
    c.querySelector('.dm-rate-share').onclick = async () => {
      const url = 'https://deutsch-mit-dennis.de/';
      try { if (navigator.share) { await navigator.share({ title: 'Deutsch mit Dennis', url }); return close(); } } catch (e) { if (e && e.name === 'AbortError') return; }
      try { await navigator.clipboard.writeText(url); c.querySelector('.dm-rate-share').textContent = '✓ Link kopiert'; } catch {}
    };
  }

  let timer = null;
  function check() {
    clearTimeout(timer);
    if (!onOverview() || !eligible()) return;
    timer = setTimeout(() => { if (onOverview() && eligible()) show(); }, 6000);
  }
  window.addEventListener('hashchange', check);
  if (document.readyState === 'complete') check(); else window.addEventListener('load', check);
})();
