#!/usr/bin/env python3
"""Merkblätter (Orientierungskurs): erzeugt aus material/orientierung/<slug>.webp
die Vorschau (<slug>-vorschau.webp), ein A4-PDF mit Wasserzeichen und alle-merkblaetter.pdf.
Neue Bilder: als <slug>.webp ablegen und in lid-materials.js eintragen, dann dieses Skript starten."""
import io, os, re, json
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import Color
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader, PdfWriter
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'material', 'orientierung')
MARK, SITE = 'created by D.Prudnikau', 'deutsch-mit-dennis.de'
src = open(os.path.join(R, 'lid-materials.js'), encoding='utf-8').read()
items = json.loads(re.search(r'const lidMaterials=(\[.*?\]);', src, re.S).group(1))
allw = PdfWriter()
for m in items:
    slug = m['slug']; im = Image.open(os.path.join(D, slug + '.webp')).convert('RGB')
    w, h = im.size
    pv = im.copy(); pv.thumbnail((700, 700), Image.LANCZOS); pv.save(os.path.join(D, slug + '-vorschau.webp'), quality=82)
    page = landscape(A4) if w > h else A4
    pw, ph = page; mg = 18; foot = 16
    sc = min((pw - 2 * mg) / w, (ph - 2 * mg - foot) / h); iw, ih = w * sc, h * sc
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=page)
    jb = io.BytesIO(); im.save(jb, 'JPEG', quality=88); jb.seek(0)
    x, y = (pw - iw) / 2, mg + foot + (ph - 2 * mg - foot - ih) / 2
    c.drawImage(ImageReader(jb), x, y, iw, ih)
    size = min(pw, ph) / 13
    c.saveState(); c.setFillColor(Color(0.14, 0.25, 0.71, alpha=0.07)); c.setFont('Helvetica-Bold', size)
    c.translate(pw / 2, ph / 2); c.rotate(30 if w > h else 45); c.drawCentredString(0, 0, MARK); c.restoreState()
    c.setFillColor(Color(0.30, 0.34, 0.45)); c.setFont('Helvetica', 7.5)
    c.drawRightString(pw - mg, mg, f'{MARK} · {SITE}')
    c.drawString(mg, mg, m['title'])
    c.setTitle(m['title']); c.setAuthor('Dzianis Prudnikau'); c.setSubject('Merkblatt Orientierungskurs')
    c.save(); data = buf.getvalue()
    open(os.path.join(D, slug + '.pdf'), 'wb').write(data)
    for p in PdfReader(io.BytesIO(data)).pages: allw.add_page(p)
    print('ok', slug, w, h, len(data) // 1024, 'KB')
allw.add_metadata({'/Title': 'Leben in Deutschland – alle Merkblätter', '/Author': 'Dzianis Prudnikau'})
allw.compress_identical_objects(remove_identicals=True, remove_orphans=True)
with open(os.path.join(D, 'alle-merkblaetter.pdf'), 'wb') as f: allw.write(f)
print('alle', len(items))
