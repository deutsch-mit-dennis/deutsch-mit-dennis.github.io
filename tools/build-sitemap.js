#!/usr/bin/env node
/* Builds sitemap.xml with <lastmod> for every indexable static page.
 *
 * Run in the repo folder:  node tools/build-sitemap.js
 * (tools/make-share-pages.py and tools/make-seo-pages.py call it automatically.)
 *
 * What is included: the start page and every index.html in a sub folder, except
 *   - pages with <meta name="robots" content="...noindex...">
 *   - technical folders (.git, node_modules, qa-out, tools, .github, assets, audio)
 * <lastmod> = date of the last commit that touched the page file (git log).
 * Files with uncommitted changes, or without git history, use the file's modified date.
 * The start page also depends on the files that build its content (see HOME_DEPENDS).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://deutsch-mit-dennis.de';
const SKIP_TOP = new Set(['.git', 'node_modules', 'qa-out', 'tools', '.github', 'assets', 'audio']);  // material/ holds PDFs and the readable worksheet pages (material/index.html, material/<niveau>/)
const HOME_DEPENDS = ['index.html', 'site.js', 'site-data.js', 'neu.json'];

/* ---- find pages ---- */
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (dir === ROOT && (SKIP_TOP.has(e.name) || e.name.startsWith('.'))) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.name === 'index.html') {
      out.push(path.relative(ROOT, path.join(dir, e.name)).split(path.sep).join('/'));
    }
  }
  return out;
}
const isNoindex = file => /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(fs.readFileSync(path.join(ROOT, file), 'utf8'));

/* ---- dates from git (one call), fallback: file modified date ---- */
const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const mtime = f => { try { return fmt(fs.statSync(path.join(ROOT, f)).mtime); } catch { return null; } };
const gitDate = {};
const dirty = new Set();
try {
  const log = execFileSync('git', ['-c', 'core.quotepath=false', 'log', '--format=@%cs', '--name-only', '--no-renames', '--', '.'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
  let cur = '';
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) cur = line.slice(1);
    else if (line && !(line in gitDate)) gitDate[line] = cur; // newest commit comes first
  }
  const st = execFileSync('git', ['-c', 'core.quotepath=false', 'status', '--porcelain', '-z', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8' });
  for (const rec of st.split('\0')) if (rec.length > 3) dirty.add(rec.slice(3));
} catch { /* no git: every date comes from the file system */ }
const dateOf = f => (dirty.has(f) || !gitDate[f] ? mtime(f) : gitDate[f]) || fmt(new Date());

/* ---- build ---- */
const pages = walk(ROOT, []).filter(f => !isNoindex(f)).sort();
const entries = [{ loc: SITE + '/', lastmod: HOME_DEPENDS.map(dateOf).sort().pop() }];
for (const f of pages) {
  if (f === 'index.html') continue;
  entries.push({ loc: `${SITE}/${f.slice(0, -'index.html'.length)}`, lastmod: dateOf(f) });
}
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + entries.map(e => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>\n`).join('') + '</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${entries.length} URLs (with lastmod)`);
