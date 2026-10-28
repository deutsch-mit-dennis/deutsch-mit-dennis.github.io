# Builds one MP3 per simulation with the complete listening part, like an exam CD:
# chime before each part, short beep + reading time before each text, text played once or twice
# (as in the exam), pause after each text. Uses the existing recordings in audio/tts/<fnv>.mp3.
# Output: material/simulation/<id>-hoeren.mp3 and <id>-hoeren.json (start times for the PDF).
# Run from the repo root:  python3 tools/sim/build_listening_mp3.py [id ...]
# Re-run after audio/tts changed for simulation texts, then run tools/pdf/build_sim_pdf.py.
import json, os, subprocess, sys, tempfile

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(REPO, "material", "simulation")
IDS = ["dtz", "telc-b1", "dtb-b1", "telc-b2", "dtb-b2"]
READ_S, BETWEEN_S, AFTER_S, PART_S = 8, 4, 6, 3
SR = 44100


def load(id):
    js = f"""global.window={{}};require('./sim/{id}.js');
const normT=s=>String(s??'').replace(/\\s+/g,' ').trim();
const fnv=s=>{{let h=0x811c9dc5;for(const b of new TextEncoder().encode(normT(s))){{h^=b;h=Math.imul(h,0x01000193)>>>0;}}return 't'+h.toString(16).padStart(8,'0');}};
const x=window.SIM['{id}'];
x.sections.forEach(s=>s.parts.forEach(p=>(p.audio||[]).forEach(a=>{{a._key=fnv(a.lines.map(l=>l.t).join(' '));}})));
process.stdout.write(JSON.stringify(x));"""
    return json.loads(subprocess.check_output(["node", "-e", js], cwd=REPO))


def run(*a):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *a], check=True)


def dur(path):
    return float(
        subprocess.check_output(
            [
                "ffprobe",
                "-v",
                "error",
                "-show_entries",
                "format=duration",
                "-of",
                "csv=p=0",
                path,
            ]
        ).strip()
    )


def wav(path, src=None, silence=None, tone=None):
    """Normalise everything to mono 44.1 kHz WAV so concat is sample-exact."""
    if silence is not None:
        run("-f", "lavfi", "-i", f"anullsrc=r={SR}:cl=mono", "-t", str(silence), path)
    elif tone is not None:
        f1, f2, d = tone  # two-note chime
        run(
            "-f",
            "lavfi",
            "-i",
            f"sine=f={f1}:d={d}:r={SR}",
            "-f",
            "lavfi",
            "-i",
            f"sine=f={f2}:d={d}:r={SR}",
            "-filter_complex",
            f"[0]afade=t=out:st=0:d={d},volume=0.35[a];[1]adelay=180,afade=t=out:st=0:d={d + 0.18},volume=0.35[b];[a][b]amix=2:duration=longest:normalize=0",
            "-ac",
            "1",
            path,
        )
    else:
        run("-i", src, "-ac", "1", "-ar", str(SR), "-af", "loudnorm=I=-18:TP=-2", path)
    return path


def build(id):
    ex = load(id)
    secs = [
        s
        for s in ex["sections"]
        if not any(p.get("kind") == "speak" for p in s["parts"])
    ]
    tmp = tempfile.mkdtemp()
    k = 0

    def piece(**kw):
        nonlocal k
        k += 1
        return wav(os.path.join(tmp, f"{k:04d}.wav"), **kw)

    chime, beep = piece(tone=(660, 880, 0.9)), piece(tone=(880, 880, 0.25))
    sil = {s: piece(silence=s) for s in {READ_S, BETWEEN_S, AFTER_S, PART_S, 1}}
    seq, marks, t = [], [], 0.0

    def add(p):
        nonlocal t
        seq.append(p)
        t += dur(p)

    missing = []
    for s in secs:
        for pi, p in enumerate(s["parts"]):
            if not p.get("audio"):
                continue
            add(chime)
            add(sil[PART_S])
            for ai, a in enumerate(p["audio"]):
                src = os.path.join(REPO, "audio", "tts", a["_key"] + ".mp3")
                if not os.path.exists(src):
                    missing.append(f"{p['title']} / {a.get('h')}")
                    continue
                clip = piece(src=src)
                marks.append(
                    {
                        "part": p["title"],
                        "clip": ai,
                        "h": a.get("h") or f"Text {ai + 1}",
                        "start": round(t),
                    }
                )
                add(beep)
                add(sil[READ_S])
                add(clip)
                if p.get("plays", 1) == 2:
                    add(sil[BETWEEN_S])
                    add(beep)
                    add(sil[1])
                    add(clip)
                add(sil[AFTER_S])
    if not marks:
        print(f"{id}: keine Hörtexte")
        return
    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as f:
        f.write("".join(f"file '{p}'\n" for p in seq))
    mp3 = os.path.join(OUT, f"{id}-hoeren.mp3")
    run(
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        lst,
        "-c:a",
        "libmp3lame",
        "-b:a",
        "64k",
        "-ac",
        "1",
        "-metadata",
        f"title={ex['short']} – Hörverstehen (Simulation)",
        "-metadata",
        "artist=Deutsch mit Dennis",
        "-metadata",
        "comment=deutsch-mit-dennis.de – eigene Übungsaufgaben",
        mp3,
    )
    json.dump(
        {"total": round(t), "marks": marks},
        open(os.path.join(OUT, f"{id}-hoeren.json"), "w"),
        ensure_ascii=False,
        indent=1,
    )
    print(
        f"{os.path.relpath(mp3, REPO)}: {int(t // 60)}:{int(t % 60):02d} min, {os.path.getsize(mp3) // 1024} KB"
        + (f" – FEHLT: {missing}" if missing else "")
    )


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for id in sys.argv[1:] or IDS:
        build(id)
