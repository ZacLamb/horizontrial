#!/usr/bin/env node
// Crawls every URL in the sitemap on a running server and reports non-200s and broken internal links.
const base = process.argv[2] || 'http://localhost:3000';
(async () => {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  const pages = [...xml.matchAll(/<loc>[^<]*?(\/[^<]*)<\/loc>/g)].map(m => new URL(m[1], 'http://x').pathname);
  const seen = new Set(), bad = [];
  for (const p of pages) {
    const r = await fetch(base + p, { redirect: 'manual' });
    if (r.status !== 200) { bad.push(`${r.status} ${p}`); continue; }
    const html = await r.text();
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) seen.add(m[1]);
  }
  for (const l of seen) {
    if (l.startsWith('/wp-content/') || /\.(css|js|svg|png|jpg|webp)$/.test(l)) continue;
    const r = await fetch(base + l, { redirect: 'manual' });
    if (r.status >= 400) bad.push(`${r.status} link ${l}`);
  }
  console.log(`${pages.length} sitemap pages, ${seen.size} internal links checked`);
  console.log(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'All good ✓');
  process.exit(bad.length ? 1 : 0);
})();
