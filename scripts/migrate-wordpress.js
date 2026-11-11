#!/usr/bin/env node
/**
 * Pulls Horizon's own photos and blog posts off the old WordPress site into this repo,
 * keeping the exact same URLs, so nothing breaks when horizonyc.com DNS moves to Railway.
 *
 *   npm run migrate            (or run the "Migrate WordPress content" GitHub Action)
 *
 * Writes:  public/wp-content/uploads/**   (images, same paths as WordPress)
 *          content/posts/<slug>.json     (blog posts rendered by views/post.ejs)
 *          content/migration-report.json
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const site = require('../data/site');
const { posts } = require('../data/posts');

const ORIGIN = (process.env.IMAGE_ORIGIN || 'https://horizonyc.com').replace(/\/$/, '');
const ROOT = path.join(__dirname, '..');
const UPLOADS = path.join(ROOT, 'public');
const POSTS = path.join(ROOT, 'content', 'posts');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/json,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};
const report = { images: { ok: [], failed: [] }, posts: { ok: [], failed: [] } };
fs.mkdirSync(POSTS, { recursive: true });

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return true;
  const r = await fetch(url, { headers: HEADERS, redirect: 'follow' });
  const type = r.headers.get('content-type') || '';
  if (!r.ok || !/^image\//.test(type)) throw new Error(`${r.status} ${type}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  return true;
}
async function grabImage(p) {
  // p = "/wp-content/uploads/…"
  try { await download(ORIGIN + p, path.join(UPLOADS, p)); report.images.ok.push(p); return p; }
  catch (e) { report.images.failed.push(`${p} (${e.message})`); return null; }
}

async function fetchPost(meta) {
  // 1) WordPress REST API
  try {
    const r = await fetch(`${ORIGIN}/wp-json/wp/v2/posts?slug=${meta.slug}&_embed=1`, { headers: HEADERS });
    if (r.ok && (r.headers.get('content-type') || '').includes('json')) {
      const [wp] = await r.json();
      if (wp) return {
        title: cheerio.load(wp.title.rendered).text(), date: wp.date, modified: wp.modified,
        html: wp.content.rendered, description: cheerio.load(wp.excerpt.rendered).text().trim().slice(0, 160),
        image: wp._embedded && wp._embedded['wp:featuredmedia'] && wp._embedded['wp:featuredmedia'][0] && wp._embedded['wp:featuredmedia'][0].source_url
      };
    }
  } catch (e) { /* fall through */ }
  // 2) Scrape the article page
  const r = await fetch(ORIGIN + meta.url, { headers: HEADERS });
  const html = await r.text();
  if (!r.ok || /One moment, please|verifying/i.test(html.slice(0, 3000))) throw new Error('blocked or ' + r.status);
  const $ = cheerio.load(html);
  const body = $('.elementor-widget-theme-post-content .elementor-widget-container').first().html()
    || $('.entry-content').first().html() || $('article').first().html();
  if (!body) throw new Error('content not found');
  return {
    title: $('h1').first().text().trim() || meta.title,
    date: $('meta[property="article:published_time"]').attr('content'),
    modified: $('meta[property="article:modified_time"]').attr('content'),
    description: $('meta[name="description"]').attr('content') || meta.excerpt,
    image: $('meta[property="og:image"]').attr('content'),
    html: body
  };
}

async function localizeImages(post, slug) {
  const $ = cheerio.load(post.html, null, false);
  $('script,style,form,iframe[src*="leadconnector"]').remove();
  $('[style]').removeAttr('style');
  let i = 0;
  for (const el of $('img').toArray()) {
    const $el = $(el);
    let src = $el.attr('data-src') || $el.attr('data-lazy-src') || $el.attr('src') || '';
    if (src.startsWith('data:')) continue;
    $el.removeAttr('srcset').removeAttr('sizes').removeAttr('data-src').removeAttr('data-lazy-src').attr('loading', 'lazy');
    try {
      const u = new URL(src, ORIGIN);
      if (u.pathname.startsWith('/wp-content/uploads/')) {
        if (await grabImage(u.pathname)) $el.attr('src', u.pathname);
      } else {
        // externally hosted (e.g. googleusercontent) — copy locally so it never expires
        const p = `/wp-content/uploads/blog/${slug}-${++i}.jpg`;
        await download(u.href, path.join(UPLOADS, p)); report.images.ok.push(p); $el.attr('src', p);
      }
    } catch (e) { report.images.failed.push(`${src} (${e.message})`); }
  }
  // keep internal links relative
  $('a[href^="' + ORIGIN + '"]').each((_, a) => $(a).attr('href', $(a).attr('href').replace(ORIGIN, '')));
  post.html = $.html();
  if (post.image) {
    try { const u = new URL(post.image, ORIGIN); if (u.pathname.startsWith('/wp-content/uploads/') && await grabImage(u.pathname)) post.image = u.pathname; } catch {}
  }
  return post;
}

(async () => {
  console.log('Images from', ORIGIN);
  for (const p of Object.values(site.img)) await grabImage(p);
  for (const meta of posts) {
    const out = path.join(POSTS, meta.slug + '.json');
    if (fs.existsSync(out) && !process.argv.includes('--force')) { report.posts.ok.push(meta.slug + ' (exists)'); continue; }
    try {
      const post = await localizeImages(await fetchPost(meta), meta.slug);
      fs.writeFileSync(out, JSON.stringify(post, null, 2));
      report.posts.ok.push(meta.slug);
      console.log('✓', meta.slug);
    } catch (e) { report.posts.failed.push(`${meta.slug} (${e.message})`); console.log('✗', meta.slug, e.message); }
  }
  fs.writeFileSync(path.join(ROOT, 'content', 'migration-report.json'), JSON.stringify(report, null, 2));
  console.log(`\nImages: ${report.images.ok.length} ok, ${report.images.failed.length} failed`);
  console.log(`Posts:  ${report.posts.ok.length} ok, ${report.posts.failed.length} failed`);
  if (report.images.failed.length) console.log('Failed images:\n  ' + report.images.failed.join('\n  '));
})();
