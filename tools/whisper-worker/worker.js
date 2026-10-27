// Cloudflare Worker „dmd-whisper“: Aufnahme → Text mit Whisper (Workers AI).
// Binding im Dashboard: Workers AI, Variablenname AI.
// Aufruf: POST https://dmd-whisper.<konto>.workers.dev/  (Body = Audiodatei, Content-Type audio/*)
const ORIGINS = [
  /^https:\/\/(www\.)?deutsch-mit-dennis\.de$/,
  /^https:\/\/deutsch-mit-dennis\.github\.io$/,
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
];
const MAX_BYTES = 4 * 1024 * 1024; // ca. 3–4 Minuten Sprache
// Beispiele mit typischen Lernerfehlern: Whisper soll wörtlich mitschreiben und Fehler NICHT glätten.
const PROMPT =
  "Wortwörtliche Mitschrift einer Deutschlernerin. Fehler genau so schreiben, wie sie gesagt werden, z. B.: Ich habe 34 Jahre alt. Ich wohne in Essen seit zwei Jahre. Ich fahre mit Bus zu Arbeit. Gestern ich bin gegangen in die Stadt.";
const hits = new Map(); // grobe Bremse pro IP (pro Worker-Instanz)

const cors = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});
const json = (data, status, origin) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...cors(origin),
    },
  });

function b64(buf) {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000)
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const okOrigin = ORIGINS.some((r) => r.test(origin));
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: okOrigin ? 204 : 403,
        headers: okOrigin ? cors(origin) : {},
      });
    if (request.method === "GET")
      return new Response(
        "Deutsch mit Dennis – Spracherkennung. Bitte per POST eine Audiodatei senden.",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    if (request.method !== "POST")
      return new Response("Method not allowed", { status: 405 });
    if (!okOrigin) return new Response("Forbidden", { status: 403 });

    const ip = request.headers.get("CF-Connecting-IP") || "?";
    const now = Date.now(),
      list = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
    if (list.length >= 40) return json({ error: "limit" }, 429, origin);
    list.push(now);
    hits.set(ip, list);
    if (hits.size > 5000) hits.clear();

    const type = (request.headers.get("Content-Type") || "").split(";")[0];
    if (!/^(audio|video)\//.test(type))
      return json({ error: "type" }, 415, origin);
    const buf = await request.arrayBuffer();
    if (buf.byteLength < 1000) return json({ error: "empty" }, 400, origin);
    if (buf.byteLength > MAX_BYTES) return json({ error: "size" }, 413, origin);

    try {
      const r = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {
        audio: b64(buf),
        task: "transcribe",
        language: "de",
        vad_filter: true,
        initial_prompt: PROMPT,
        condition_on_previous_text: false,
      });
      const text = String(r?.text || "")
        .replace(/\s+/g, " ")
        .trim();
      const words = (r?.segments || [])
        .flatMap((s) => s.words || [])
        .map((w) => ({ w: w.word, s: w.start, e: w.end, p: w.probability }));
      return json({ text, words }, 200, origin);
    } catch (e) {
      const msg = String(e?.message || e);
      return json(
        {
          error: /neuron|quota|limit|429|capacity/i.test(msg) ? "limit" : "ai",
          detail: msg.slice(0, 200),
        },
        502,
        origin,
      );
    }
  },
};
