#!/usr/bin/env python3
"""Erzeugt Vorschaubilder (1200x630) und kleine Teilen-Seiten mit eigenen Meta-Tags.
Aufruf im Repo-Ordner: python3 tools/make-share-pages.py
Jede Seite /<pfad>/index.html leitet sofort zur App-Route /#<pfad> weiter."""
import json, os, subprocess, html
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(R, 'tools', 'fonts')
SITE = 'https://deutsch-mit-dennis.de'
B = lambda s: ImageFont.truetype(os.path.join(F, 'Atk-B.ttf'), s)
Rg = lambda s: ImageFont.truetype(os.path.join(F, 'Atk-R.ttf'), s)
C = lambda s: ImageFont.truetype(os.path.join(F, 'Cav.ttf'), s)
INK, BLUE, SUN, PAPER = (23, 32, 54), (35, 65, 181), (255, 228, 92), (251, 251, 248)

def wrap(d, t, f, w):
    out, line = [], ''
    for wd in t.split():
        tt = (line + ' ' + wd).strip()
        if d.textlength(tt, font=f) <= w: line = tt
        else: out.append(line); line = wd
    return out + [line]

def card(title, sub, out, pic=None, kicker='Deutsch mit Dennis'):
    im = Image.new('RGB', (1200, 630), PAPER); d = ImageDraw.Draw(im)
    for x in range(0, 1200, 30): d.line([(x, 0), (x, 630)], fill=(232, 236, 247))
    for y in range(0, 630, 30): d.line([(0, y), (1200, y)], fill=(232, 236, 247))
    d.rectangle([0, 0, 1200, 14], fill=BLUE)
    if pic is None:
        ph = Image.open(os.path.join(R, 'assets', 'dennis.webp')).convert('RGBA')
        h = 600; ph = ph.resize((int(ph.width * h / ph.height), h), Image.LANCZOS)
        d.ellipse([820, 300, 1180, 520], fill=SUN)
        im.paste(ph, (1200 - ph.width - 30, 630 - h), ph)
        textw = 1200 - ph.width - 110
    else:
        cv = Image.open(pic).convert('RGB').resize((470, 470), Image.LANCZOS)
        d.rounded_rectangle([680, 66, 1170, 556], 22, fill=(214, 221, 240))
        im.paste(cv, (690, 76)); textw = 580
    y = 70
    d.text((64, y), kicker.upper(), font=B(26), fill=(29, 122, 69)); y += 52
    ft = B(64 if len(title) < 40 else 54)
    for ln in wrap(d, title, ft, textw):
        d.text((64, y), ln, font=ft, fill=INK); y += int(ft.size * 1.12)
    y += 16
    for ln in wrap(d, sub, Rg(30), textw)[:4]:
        d.text((64, y), ln, font=Rg(30), fill=(70, 80, 105)); y += 42
    d.text((64, 548), 'Deutsch', font=B(40), fill=INK)
    d.text((64 + d.textlength('Deutsch ', font=B(40)), 540), 'mit Dennis', font=C(46), fill=BLUE)
    d.text((64, 596), 'deutsch-mit-dennis.de', font=Rg(22), fill=(86, 96, 120))
    os.makedirs(os.path.dirname(out), exist_ok=True); im.save(out, quality=86, optimize=True)

PAGE = '''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Deutsch mit Dennis"><meta property="og:locale" content="de_DE">
<meta property="og:title" content="{ogt}"><meta property="og:description" content="{desc}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{img}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg">
<script>location.replace("/#{route}");</script>
<style>body{{font:18px/1.6 system-ui,sans-serif;max-width:640px;margin:60px auto;padding:0 20px;color:#172036}}a{{color:#2341B5}}</style>
</head><body><h1>{ogt}</h1><p>{desc}</p><p><a href="/#{route}">Weiter zu „{ogt}“</a></p></body></html>
'''

def stub(route, title, desc, img):
    url = f'{SITE}/{route}/'
    e = html.escape
    path = os.path.join(R, route, 'index.html'); os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(PAGE.format(title=e(title + ' – Deutsch mit Dennis'), ogt=e(title), desc=e(desc), url=url, img=f'{SITE}/{img}', route=route))
    return url

js = subprocess.run(['node', '-e', "global.window={};require('./site-data.js');console.log(JSON.stringify(window.DM.packages))"], cwd=R, capture_output=True, text=True)
P = json.loads(js.stdout)
O = 'assets/og'
card('Deutsch lernen mit Dennis', 'Kostenlose Übungen von A1 bis B2 Beruf: Sprechen, Schreiben, Hören, DTZ- und B2-Training, Lieder. Ohne Anmeldung.', os.path.join(R, O, 'start.jpg'), kicker='DTZ-Prüfer · telc-Prüfer · BAMF-zugelassen')
SECTIONS = [
    ('lernpakete', 'Lernpakete als PDF', 'Ausführliche PDF-Pakete mit Musterlösungen für DTZ, B2 Beruf, „Leben in Deutschland“ und für Lehrkräfte.'),
    ('lieder', 'Deutsch mit Liedern', '25 eigene Lieder von A1 bis C1 – mit Text, Aufgaben und Lösungen. Hör zu, sing mit und lerne.'),
    ('pruefung', 'Prüfungstraining DTZ und B2', 'Schreiben, Sprechen, Hören und Lesen wie in der Prüfung – von einem lizenzierten Prüfer.'),
    ('ueben', 'Deutsch üben', 'Sprechen und Schreiben mit Sofort-Korrektur, Satzanfängen und Mustertexten. Kostenlos.'),
    ('hoeren', 'Hörtraining DTZ und B2', 'Ansagen, Mailbox-Nachrichten und Gespräche mit Aufgaben wie in der Prüfung.'),
    ('lesen', 'Leseverstehen DTZ und B2', 'Mitteilungen, Anzeigen, E-Mails und Artikel verstehen – mit Fragen und Erklärungen. Jede Woche ein neuer Text.'),
    ('lid', 'Leben in Deutschland: alle 310 Fragen', 'Kostenloser Trainer für den Test „Leben in Deutschland“ – mit Lernmodus und Prüfungssimulation.'),
    ('ueber-mich', 'Über Dennis', 'Deutschlehrer seit 2017, lizenzierter DTZ- und telc-Prüfer, vom BAMF zugelassen bis C2.'),
]
urls = [SITE + '/']
for route, t, dsc in SECTIONS:
    card(t, dsc, os.path.join(R, O, route + '.jpg')); urls.append(stub(route, t, dsc, f'{O}/{route}.jpg'))
for k in P:
    sub = f"{k['level']} · {k['target']} · {k['pages']} Seiten PDF" + (f" · {k['price']}" if k.get('price') else '')
    card(k['title'], sub, os.path.join(R, O, 'paket-' + k['id'] + '.jpg'), pic=os.path.join(R, k['img']), kicker='Lernpaket' if k['group'] != 'lehrende' else 'Für Lehrkräfte')
    urls.append(stub('lernpakete/' + k['id'], k['title'], k['desc'], f"{O}/paket-{k['id']}.jpg"))
open(os.path.join(R, 'sitemap.xml'), 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls) + '</urlset>\n')
open(os.path.join(R, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
print(len(urls), 'Seiten')
