/* Live-Mitschrift beim Aufnehmen (Spracherkennung des Browsers, Deutsch).
   DMMitschrift.ok  – true, wenn der Browser mitschreiben kann
   DMMitschrift.start(onUpdate) → { stop(), text() }
   onUpdate(fertigerText, vorlaeufigerText, beendet) */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
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
        last.split(" ").length >= 3 &&
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
  window.DMMitschrift = { ok: !!SR, start, words, nice };
})();
