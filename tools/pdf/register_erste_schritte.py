# Adds/updates the "Erste Schritte" worksheets (material/arbeitsblaetter/es-*.pdf) in DM.materials (site-data.js).
# Run after build_erste_schritte.py: python3 tools/pdf/register_erste_schritte.py
import json, os, re, subprocess
from pypdf import PdfReader

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = (
    "const fs=require('fs');global.window={};eval(fs.readFileSync('erste-schritte-data.js','utf8'));"
    "console.log(JSON.stringify(window.DM.ersteSchritte.topics))"
)
topics = json.loads(
    subprocess.check_output(["node", "-e", js], cwd=REPO, encoding="utf-8")
)
path = os.path.join(REPO, "site-data.js")
src = open(path, encoding="utf-8").read()
m = re.search(r"^DM\.materials = (\[.*\]);$", src, re.M)
mats = [
    x
    for x in json.loads(m.group(1))
    if not x["file"].startswith("material/arbeitsblaetter/es-")
]
new = []
for t in topics:
    f = f"material/arbeitsblaetter/es-{t['id']}.pdf"
    p = os.path.join(REPO, f)
    if not os.path.exists(p):
        continue
    a0 = t["level"] == "A0"
    new.append(
        {
            "file": f,
            "title": f"{'Erste Schritte' if a0 else 'Bildwörter'}: {t['title']}",
            "level": "A1",
            "cat": "wortschatz",
            "desc": ("Für ganz neue Lernende (A0). " if a0 else "")
            + "Bildwörterbuch mit Artikel und Plural, Übungen und Lösungen – Ton und Übungen online unter „Erste Schritte“.",
            "pages": len(PdfReader(p).pages),
            "kb": os.path.getsize(p) // 1024,
            "loes": True,
        }
    )
out = (
    src[: m.start(1)]
    + json.dumps(new + mats, ensure_ascii=False, separators=(",", ":"))
    + src[m.end(1) :]
)
open(path, "w", encoding="utf-8").write(out)
print(
    f"{len(new)} Arbeitsblätter eingetragen, {len(new) + len(mats)} Materialien gesamt"
)
