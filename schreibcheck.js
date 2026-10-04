/* Schreib-Check: sofortiges Feedback für alle Schreibfelder der Website.
   Rechtschreibung, Grammatik und Zeichensetzung prüft LanguageTool (LanguageTooler GmbH, Hamburg) –
   erst wenn man auf „Text prüfen“ klickt. Dazu kommen einfache Prüfungen für Briefe (Anrede, Gruß, Länge). */
(() => {
  const API = 'https://api.languagetool.org/v2/check';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CAT = { TYPOS: 'Rechtschreibung', GRAMMAR: 'Grammatik', PUNCTUATION: 'Zeichensetzung', CASING: 'Groß- und Kleinschreibung', CONFUSED_WORDS: 'Verwechslung', STYLE: 'Stil', TYPOGRAPHY: 'Typografie', REDUNDANCY: 'Wiederholung', COMPOUNDING: 'Zusammenschreibung', MISC: 'Sonstiges', SEMANTICS: 'Logik', COLLOQUIALISMS: 'Umgangssprache' };
  const COLOR = { TYPOS: 'sp', CASING: 'sp', COMPOUNDING: 'sp', GRAMMAR: 'gr', CONFUSED_WORDS: 'gr', PUNCTUATION: 'pu', TYPOGRAPHY: 'pu' };
  let lastCall = 0;

  function letterContext(ta) {
    const scope = (ta.closest('section, .dm-card, .pl-panel, .exam-card, main') || document).textContent.toLowerCase();
    const page = (document.querySelector('main h1')?.textContent || '').toLowerCase();
    return /brief|e-mail|email|nachricht|schreiben|antwort an|kundenantwort/.test(page + ' ' + scope.slice(0, 2500));
  }
  function extraChecks(text, ta) {
    const out = [], words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;
    const lines = text.trim().split(/\n+/).map(s => s.trim()).filter(Boolean);
    if (letterContext(ta) && words >= 25) {
      if (!/^(liebe|lieber|liebes|hallo|hi|sehr geehrte|sehr geehrter|guten tag|moin|servus)\b/i.test(lines[0] || '')) out.push(['Anrede fehlt', 'Beginne mit einer Anrede, z. B. „Sehr geehrte Frau Müller,“ oder „Liebe Anna,“.']);
      else if (!/,\s*$/.test(lines[0]) && !/,/.test((lines[0] || '').slice(0, 60))) out.push(['Komma nach der Anrede', 'Nach der Anrede steht ein Komma. Danach schreibst du klein weiter (außer Nomen).']);
      if (!/(grüße|grüßen|gruß|grüssen|grüsse|bis bald|bis dann|hochachtungsvoll|liebe grüße)/i.test(lines.slice(-3).join(' '))) out.push(['Gruß fehlt', 'Beende den Brief mit einem Gruß, z. B. „Mit freundlichen Grüßen“ oder „Viele Grüße“ – und deinem Namen.']);
      if (/^(sehr geehrte)/i.test(lines[0] || '') && /\b(du|dich|dir|dein)\b/i.test(text)) out.push(['du oder Sie?', 'Formeller Brief: Benutze „Sie“, „Ihnen“, „Ihr“ – nicht „du“.']);
    }
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.split(/\s+/).length > 3);
    const long = sentences.filter(s => s.split(/\s+/).length > 28).length;
    if (long) out.push(['Sehr lange Sätze', `${long} Satz/Sätze mit mehr als 28 Wörtern. Teile lange Sätze – das ist leichter zu lesen.`]);
    const starts = sentences.map(s => s.split(/\s+/)[0].toLowerCase());
    const ich = starts.filter(w => w === 'ich').length;
    if (sentences.length >= 5 && ich / sentences.length > 0.6) out.push(['Abwechslung', 'Viele Sätze beginnen mit „Ich“. Beginne auch mal mit einer Zeit oder einem Verbindungswort: „Leider …“, „Deshalb …“, „Am Montag …“.']);
    return { out, words };
  }

  function marked(text, matches) {
    let html = '', pos = 0;
    matches.forEach((m, i) => {
      if (m.offset < pos) return;
      html += esc(text.slice(pos, m.offset));
      html += `<mark class="sc-${COLOR[m.rule?.category?.id] || 'st'}" data-i="${i}" tabindex="0" title="${esc(m.shortMessage || m.message)}">${esc(text.slice(m.offset, m.offset + m.length)) || '␣'}</mark>`;
      pos = m.offset + m.length;
    });
    return (html + esc(text.slice(pos))).replace(/\n/g, '<br>');
  }

  async function check(ta, panel, btn) {
    const text = ta.value;
    if (text.trim().length < 3) { panel.hidden = false; panel.innerHTML = '<p>Schreib zuerst einen Text. Dann kannst du ihn prüfen lassen.</p>'; return; }
    if (text.length > 15000) { panel.hidden = false; panel.innerHTML = '<p>Der Text ist sehr lang. Prüfe ihn bitte in kleineren Teilen.</p>'; return; }
    const wait = 3200 - (Date.now() - lastCall);
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    lastCall = Date.now();
    btn.disabled = true; btn.classList.add('is-busy'); panel.hidden = false; panel.innerHTML = '<p class="sc-loading"><span></span> Dein Text wird geprüft …</p>';
    let data;
    try {
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ text, language: 'de-DE', level: 'default' }) });
      if (r.status === 429) throw new Error('limit');
      if (!r.ok) throw new Error('http');
      data = await r.json();
    } catch (e) {
      panel.innerHTML = `<p>${e.message === 'limit' ? 'Gerade wurden zu viele Texte geprüft. Warte bitte eine Minute und versuche es noch einmal.' : 'Die Prüfung ist gerade nicht erreichbar. Bitte versuche es später noch einmal.'}</p>`;
      btn.disabled = false; btn.classList.remove('is-busy'); return;
    }
    btn.disabled = false; btn.classList.remove('is-busy');
    const matches = (data.matches || []).sort((a, b) => a.offset - b.offset);
    const { out, words } = extraChecks(text, ta);
    const counts = {};
    matches.forEach(m => { const c = CAT[m.rule?.category?.id] || 'Sonstiges'; counts[c] = (counts[c] || 0) + 1; });
    const score = matches.length === 0 && !out.length ? 'sc-good' : matches.length <= 3 ? 'sc-mid' : 'sc-bad';
    panel.innerHTML = `
      <div class="sc-head ${score}"><b>${matches.length === 0 ? '✓ Keine Fehler gefunden' : `${matches.length} ${matches.length === 1 ? 'Stelle' : 'Stellen'} zum Verbessern`}</b><span>${words} Wörter${Object.keys(counts).length ? ' · ' + Object.entries(counts).map(([k, v]) => `${v}× ${k}`).join(' · ') : ''}</span></div>
      ${matches.length ? `<p class="sc-legend"><span class="sc-sp">Rechtschreibung</span><span class="sc-gr">Grammatik</span><span class="sc-pu">Zeichen</span><span class="sc-st">Stil</span></p><div class="sc-text" lang="de">${marked(text, matches)}</div>` : ''}
      ${matches.length ? `<ol class="sc-list">${matches.map((m, i) => `<li data-i="${i}" class="sc-${COLOR[m.rule?.category?.id] || 'st'}"><span class="sc-cat">${esc(CAT[m.rule?.category?.id] || 'Hinweis')}</span> <q>${esc(text.slice(m.offset, m.offset + m.length))}</q> – ${esc(m.message)}${m.replacements?.length ? `<span class="sc-fix">${m.replacements.slice(0, 3).map(r => `<button type="button" data-i="${i}" data-r="${esc(r.value)}">${esc(r.value) || '(löschen)'}</button>`).join('')}</span>` : ''}</li>`).join('')}</ol>` : ''}
      ${out.length ? `<ul class="sc-extra">${out.map(([t, d]) => `<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join('')}</ul>` : ''}
      ${matches.length === 0 && !out.length ? '<p>Sehr gut! Lies deinen Text trotzdem noch einmal laut: Passt alles zur Aufgabe?</p>' : '<p class="sc-hint">Tipp: Klicke auf einen Vorschlag, um ihn zu übernehmen. Versuche aber zuerst selbst, den Fehler zu finden – so lernst du am meisten.</p>'}
      <p class="sc-privacy">Automatische Prüfung mit LanguageTool. Sie findet nicht alle Fehler und bewertet nicht den Inhalt.</p>`;
    panel.querySelectorAll('.sc-fix button').forEach(b => b.onclick = () => {
      const m = matches[Number(b.dataset.i)];
      if (ta.value !== text) { check(ta, panel, btn); return; }
      ta.value = text.slice(0, m.offset) + b.dataset.r + text.slice(m.offset + m.length);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      check(ta, panel, btn);
    });
    panel.querySelectorAll('mark[data-i]').forEach(mk => mk.onclick = mk.onkeydown = e => {
      if (e.type === 'keydown' && e.key !== 'Enter') return;
      const li = panel.querySelector(`.sc-list li[data-i="${mk.dataset.i}"]`);
      li?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); li?.classList.add('is-hl'); setTimeout(() => li?.classList.remove('is-hl'), 1200);
    });
  }

  function enhance(ta) {
    if (ta.dataset.sc || ta.readOnly || ta.disabled || ta.closest('[data-nocheck], #site-helper') || location.hash.startsWith('#pinnwand')) return;
    ta.dataset.sc = '1';
    ta.spellcheck = true; ta.lang = 'de';
    const bar = document.createElement('div'); bar.className = 'sc-bar';
    bar.innerHTML = '<button type="button" class="sc-btn"><span aria-hidden="true">✓</span> Text prüfen</button><span class="sc-note">Sofort-Feedback zu Rechtschreibung, Grammatik und Zeichensetzung. Beim Klick wird dein Text an LanguageTool gesendet (<a href="#datenschutz">Datenschutz</a>).</span>';
    const panel = document.createElement('div'); panel.className = 'sc-panel'; panel.hidden = true; panel.setAttribute('aria-live', 'polite');
    ta.after(bar, panel);
    bar.querySelector('button').onclick = e => check(ta, panel, e.currentTarget);
  }
  const scan = () => document.querySelectorAll('main textarea').forEach(enhance);
  new MutationObserver(scan).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => setTimeout(scan, 50));
  scan();
})();
