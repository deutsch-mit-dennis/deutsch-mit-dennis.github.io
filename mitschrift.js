/* Live-Mitschrift beim Aufnehmen (Spracherkennung des Browsers, Deutsch).
   DMMitschrift.ok  – true, wenn der Browser mitschreiben kann
   DMMitschrift.start(onUpdate) → { stop(), text() }
   onUpdate(fertigerText, vorlaeufigerText, beendet) */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const ANDROID = /Android/i.test(navigator.userAgent);
  function start(onUpdate) {
    if (!SR) return null;
    let segs = [],
      on = true,
      fails = 0,
      rec,
      pending = "";
    const join = () => segs.join(" ").replace(/\s+/g, " ").trim();
    const add = (t) => {
      t = t.trim();
      if (!t) return;
      const last = segs[segs.length - 1];
      // Android liefert manchmal den ganzen Satz noch einmal, nur länger → ersetzen statt doppeln
      if (
        last &&
        (ANDROID || last.split(" ").length >= 3) &&
        (t.toLowerCase().startsWith(last.toLowerCase()) ||
          last.toLowerCase() === t.toLowerCase())
      )
        segs[segs.length - 1] = t;
      else segs.push(t);
    };
    const run = () => {
      rec = new SR();
      rec.lang = "de-DE";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        fails = 0;
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) add(r[0].transcript);
          else interim += r[0].transcript;
        }
        pending = interim.trim();
        onUpdate(join(), pending, false);
      };
      rec.onerror = (e) => {
        if (
          e.error === "not-allowed" ||
          e.error === "service-not-allowed" ||
          e.error === "language-not-supported"
        ) {
          on = false;
          onUpdate(join(), "", true, e.error);
        }
      };
      // Chrome beendet die Erkennung nach Pausen von selbst → neu starten, solange aufgenommen wird
      rec.onend = () => {
        // nicht abgeschlossene Wörter beim Ende behalten
        if (pending) {
          add(pending);
          pending = "";
        }
        if (on && fails++ < 20) {
          try {
            run();
          } catch {
            on = false;
            onUpdate(join(), "", true);
          }
        } else onUpdate(join(), "", true);
      };
      rec.start();
    };
    try {
      run();
    } catch {
      return null;
    }
    return {
      stop() {
        on = false;
        try {
          rec.stop();
        } catch {}
      },
      text: join,
    };
  }
  const words = (t) => (String(t || "").match(/[\p{L}\p{N}]+/gu) || []).length;
  const nice = (t) => {
    t = String(t || "").trim();
    return t
      ? t.charAt(0).toUpperCase() + t.slice(1) + (/[.!?]$/.test(t) ? "" : ".")
      : "";
  };
  // Genauere Erkennung nach der Aufnahme: Whisper (Cloudflare Workers AI, Worker „dmd-whisper“, Code in tools/whisper-worker)
  const API = "https://dmd-whisper.dennis-prudnikau.workers.dev/";
  // Whisper erfindet bei Stille manchmal Abspann-Sätze („Untertitel im Auftrag des ZDF“) → verwerfen
  const FAKE = /untertitel|im auftrag des|zdf|amara\.org|vielen dank f(ü|ue)rs? zuschauen|copyright/i;
  async function whisper(blob) {
    if (!blob || blob.size < 1000) return "";
    if (blob.size > 4 * 1024 * 1024) throw new Error("size");
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 30000);
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": (blob.type || "audio/webm").split(";")[0] }, body: blob, signal: ctl.signal });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "http");
      const t = String(j.text || "").trim();
      return FAKE.test(t) && words(t) < 12 ? "" : t;
    } finally { clearTimeout(to); }
  }
  window.DMMitschrift = { ok: !!SR, start, words, nice, whisper, canWhisper: !!window.fetch };
})();
