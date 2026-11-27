# Liederheft: all single song PDFs (material/lieder/<id>.pdf) merged into one file, in the order of lieder-data.js.
# Output: material/lieder/liederheft.pdf (linked from the start page). Run again after new songs:
#   py -X utf8 tools/pdf/build_liederheft.py
import os, re
from pypdf import PdfWriter, PdfReader

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIR = os.path.join(REPO, 'material', 'lieder')
songs = re.findall(r'"id":\s*"([^"]+)",\s*"level":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', open(os.path.join(REPO, 'lieder-data.js'), encoding='utf8').read())
w, n = PdfWriter(), 0
for i, lv, title in songs:
    p = os.path.join(DIR, i + '.pdf')
    if not os.path.exists(p):
        print('missing', p); continue
    start = len(w.pages)
    w.append(PdfReader(p))
    w.add_outline_item(f'{lv} · {title}', start)
    n += 1
w.add_metadata({'/Title': 'Deutsch mit Liedern – Liederheft A1–C1 (Deutsch mit Dennis)', '/Author': 'Dzianis Prudnikau'})
w.compress_identical_objects()
out = os.path.join(DIR, 'liederheft.pdf')
with open(out, 'wb') as f:
    w.write(f)
print(f'{n} songs, {len(w.pages)} pages -> {out} ({os.path.getsize(out) / 1e6:.1f} MB)')
