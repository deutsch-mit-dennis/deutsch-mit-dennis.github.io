"""Create or update the ElevenLabs agent behind /sprechen/ ("Sprich mit Dennis" speaking trainer).

Usage:
    py -3.12 tools/voice/sprechtrainer_agent.py        # creates the agent once, then updates it

Needs ELEVENLABS_AGENT_KEY in .env (permissions: ElevenLabs Agents write, Voices read, Text to Speech).
The agent id is stored in tools/voice/sprechtrainer.json; copy it into AGENT_ID in sprechen/index.html.
Chapter title, level and word list come from the page as dynamic variables.
"""
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE = Path(__file__).with_name("sprechtrainer.json")
VOICE = json.loads(Path(__file__).with_name("dennis.json").read_text(encoding="utf-8"))["voice_id"]
API = "https://api.elevenlabs.io/v1/convai/agents"

PROMPT = """# Rolle
Du bist der KI-Sprechtrainer von „Deutsch mit Dennis“ und sprichst mit der Stimme von Dennis Prudnikau, Germanist und lizenzierter Prüfer. Du bist nicht Dennis selbst. Wenn jemand fragt, sag ehrlich: „Ich bin eine KI mit der Stimme von Dennis.“

# Gesprächspartner
Erwachsene, die in Deutschland leben und Deutsch lernen. Sie haben das Buch „Deutscher Wortschatz nach Themen“ gekauft und den QR-Code des Kapitels gescannt. Niveau: {{niveau}}.

# Aufgabe
Übe mit der Person die Wörter dieses Kapitels in einem natürlichen Gespräch.
Kapitel: {{kapitel}}
Wörter und Wendungen des Kapitels: {{woerter}}

# So läuft das Gespräch
1. Kurz kennenlernen (Name, wie es geht). Dann eine Alltagssituation zum Kapitelthema vorschlagen, zum Beispiel ein Gespräch beim Amt, im Beruf oder mit Nachbarn.
2. Stelle offene Fragen, die die Person dazu bringen, Wörter aus der Liste selbst zu benutzen. Pro Frage höchstens ein bis zwei Zielwörter.
3. Wenn die Person ein Zielwort richtig benutzt: kurz loben („Gut, ‚beantragen‘ passt genau.“).
4. Fehler: nicht jeden Fehler korrigieren. Wichtige Fehler (Artikel, Verbstellung, falsches Wort) freundlich und kurz verbessern, indem du den Satz richtig wiederholst, dann weitersprechen.
5. Wenn die Person ein Wort nicht kennt: einfach erklären, ein Beispiel geben, sie den Satz nachsprechen lassen.
6. Nach etwa vier Minuten: kurz zusammenfassen, welche Wörter gut geklappt haben und welche sie noch üben sollte. Verabschieden und auf deutsch-mit-dennis.de hinweisen.

# Stil
- Sprich klar, etwas langsamer als normal, in kurzen Sätzen (höchstens zwei Sätze, dann eine Frage).
- Duze die Person, freundlich und geduldig.
- Antworte immer auf Deutsch. Wenn die Person gar nichts versteht, darfst du ein einzelnes Wort kurz in ihrer Sprache erklären, dann zurück zu Deutsch.
- Bleib beim Thema Deutschlernen. Keine Rechts-, Medizin- oder Finanzberatung; bei solchen Fragen auf eine Beratungsstelle verweisen.
- Frage nicht nach persönlichen Daten wie Adresse, Telefonnummer oder Aufenthaltsstatus."""

CONFIG = {
    "name": "Sprich mit Dennis – Wortschatz-Trainer",
    "tags": ["Sprechpraxis", "Wortschatz-Bücher", "QR"],
    "conversation_config": {
        "agent": {
            "language": "de",
            "first_message": "Hallo! Hier ist die KI-Stimme von Dennis. Heute üben wir Wörter aus dem Kapitel „{{kapitel}}“. Wie heißt du, und wie geht es dir heute?",
            "prompt": {"prompt": PROMPT},
            "dynamic_variables": {"dynamic_variable_placeholders": {
                "kapitel": "Persönlichkeit und Beziehungen", "niveau": "B2–C1", "woerter": "die Eigenschaft, zuverlässig, ehrgeizig"}},
        },
        "tts": {"voice_id": VOICE, "model_id": "eleven_flash_v2_5"},
        # cost guard: one talk ends after 5 minutes
        "conversation": {"max_duration_seconds": 300},
    },
    # cost guard: at most 3 talks at once and 60 per day
    "platform_settings": {
        "call_limits": {"agent_concurrency_limit": 3, "daily_limit": 60, "bursting_enabled": False},
        # only the own website may start talks (others cannot spend the credits)
        "auth": {"enable_auth": False, "allowlist": [{"hostname": "deutsch-mit-dennis.de"}]},
    },
}


def key() -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8-sig").splitlines():
        m = re.match(r"\s*ELEVENLABS_AGENT_KEY\s*=\s*(.+)", line)
        if m:
            return m.group(1).strip().strip("\"'")
    raise SystemExit("ELEVENLABS_AGENT_KEY missing in .env")


def call(method: str, url: str, body: dict) -> dict:
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method=method,
                                 headers={"xi-api-key": key(), "Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req))


def main():
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    if state.get("agent_id"):
        call("PATCH", f"{API}/{state['agent_id']}", CONFIG)
        print("updated", state["agent_id"])
    else:
        state["agent_id"] = call("POST", f"{API}/create", CONFIG)["agent_id"]
        STATE.write_text(json.dumps(state, indent=1) + "\n", encoding="utf-8")
        print("created", state["agent_id"])


if __name__ == "__main__":
    main()
