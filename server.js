require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const site = require('./data/site');
const { categories, products, services } = require('./data/products');
const { neighborhoods, bySlug: areaBySlug, advice } = require('./data/neighborhoods');
const blog = require('./data/posts');

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_ORIGIN = (process.env.IMAGE_ORIGIN || 'https://horizonyc.com').replace(/\/$/, '');
const productBySlug = Object.fromEntries(products.map(p => [p.slug, p]));
const serviceByKey = Object.fromEntries(services.map(s => [s.key, s]));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(compression());
app.use(express.urlencoded({ extended: false, limit: '50kb' }));
app.use(express.json({ limit: '50kb' }));

// ---------- static ----------
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d', index: false, redirect: false }));

// Images keep their original WordPress paths. Until `npm run migrate` has copied them into
// public/wp-content/uploads, fall back to the live WordPress server (never to ourselves).
app.get('/wp-content/uploads/*', (req, res) => {
  const originHost = IMAGE_ORIGIN.replace(/^https?:\/\//, '');
  if (originHost === req.get('host')) return res.status(404).end();
  res.redirect(302, IMAGE_ORIGIN + req.path);
});

// ---------- indexing: only the real domain gets indexed ----------
const canonicalHost = site.url.replace(/^https?:\/\//, '');
function isProduction(req) {
  if (process.env.ALLOW_INDEXING === 'true') return true;
  return (req.get('host') || '').replace(/^www\./, '') === canonicalHost.replace(/^www\./, '');
}

// ---------- shared locals ----------
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.categories = categories;
  res.locals.services = services;
  res.locals.neighborhoods = neighborhoods;
  res.locals.path = req.path;
  res.locals.canonical = site.url + req.path;
  res.locals.noindex = !isProduction(req);
  res.locals.ga4 = process.env.GA4_ID || '';
  res.locals.gtm = process.env.GTM_ID || '';
  res.locals.calendarEmbed = process.env.GHL_CALENDAR_EMBED_URL || '';
  res.locals.schema = [];
  res.locals.commonFaqs = require('./data/products').commonFaqs;
  res.locals.breadcrumbs = null;
  next();
});

// ---------- WordPress-style trailing slashes ----------
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path === '/' || req.path.endsWith('/') || path.extname(req.path)) return next();
  const q = req.url.slice(req.path.length);
  res.redirect(301, req.path + '/' + q);
});

// ---------- legacy redirects (old URLs that should not 404) ----------
const redirects = {
  '/our-portfolio/': '/portfolio/',
  '/bookappoitment/': '/bookappointment/',
  '/roller-shades-privacy-light-filtering-textured/': '/roller-shades/',
  '/contact/': '/contact-us/',
  '/about/': '/about-us/',
  '/blog/': '/blogs/',
  '/faq/': '/faqs/',
  '/privacy-policy/': '/privacy-policy-2/',
  // routes used by the ChatGPT prototype, in case anything got shared
  '/services/': '/shadesblinds/',
  '/services/motorized-shades/': '/motorization/',
  '/services/custom-drapery/': '/drapery/',
  '/services/roman-shades/': '/roman-shades/',
  '/services/hunter-douglas/': '/hunter-douglas/',
  ...blog.legacyDated
};
app.use((req, res, next) => (redirects[req.path] ? res.redirect(301, redirects[req.path]) : next()));

// ---------- helpers ----------
const crumbs = list => [{ name: 'Home', url: '/' }, ...list];
function faqSchema(faqs) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}
function serviceSchema(name, desc, areaName) {
  return {
    '@context': 'https://schema.org', '@type': 'Service', serviceType: name, description: desc,
    provider: { '@type': 'HomeAndConstructionBusiness', name: site.name, telephone: site.phoneTel, url: site.url },
    areaServed: areaName ? { '@type': 'Place', name: areaName + ', New York, NY' } : [{ '@type': 'City', name: 'Manhattan' }, { '@type': 'City', name: 'Brooklyn' }]
  };
}
const render = (res, view, data) => res.render(view, data);

// ---------- pages ----------
app.get('/', (req, res) => render(res, 'home', {
  title: 'Horizon Window Treatments in NYC | Custom Shades, Blinds & Drapes',
  description: 'NYC custom window treatment specialists since 1999. Shades, motorized blinds and drapery for Manhattan & Brooklyn, with free in-home consultation and free installation.',
  posts: blog.posts.slice(0, 3)
}));

// Category pages (/shadesblinds/, /drapery/, /motorization/, /hunter-douglas/)
Object.values(categories).forEach(cat => {
  app.get(cat.url, (req, res) => {
    const faqs = require('./data/products').commonFaqs;
    res.locals.schema = [serviceSchema(cat.title, cat.metaDesc), faqSchema(faqs)];
    res.locals.breadcrumbs = crumbs([{ name: cat.nav, url: cat.url }]);
    render(res, 'category', { title: cat.metaTitle, description: cat.metaDesc, cat, faqs });
  });
});

// Product pages (/roller-shades/, /motorized-drapes/, …)
app.get('/:slug/', (req, res, next) => {
  const p = productBySlug[req.params.slug];
  if (!p) return next();
  const cat = categories[p.cat];
  res.locals.schema = [serviceSchema(p.title, p.metaDesc), faqSchema(p.faqs)];
  res.locals.breadcrumbs = crumbs([{ name: cat.nav, url: cat.url }, { name: p.title, url: p.url }]);
  const related = cat.items.filter(x => x.slug !== p.slug);
  const svc = serviceByKey[p.serviceKey] || null;
  render(res, 'product', { title: p.metaTitle, description: p.metaDesc, p, cat, related, svc });
});

// Areas served
app.get('/locations/', (req, res) => {
  res.locals.breadcrumbs = crumbs([{ name: 'Areas We Serve', url: '/locations/' }]);
  render(res, 'locations', {
    title: 'Areas We Serve | Window Treatments Manhattan & Brooklyn | Horizon',
    description: 'Horizon Window Treatments serves every Manhattan neighborhood and brownstone Brooklyn from our Chelsea showroom. Free in-home consultations and installation.'
  });
});

app.get('/locations/:area/', (req, res, next) => {
  const a = areaBySlug[req.params.area];
  if (!a) return next();
  const faqs = [
    { q: `Do you offer free consultations in ${a.name}?`, a: `Yes. A Horizon designer will come to your ${a.name} home or office with samples, take precise measurements and give you a quote. Installation is included.` },
    { q: `How far is your showroom from ${a.name}?`, a: `Our showroom is at ${site.address.street} in Chelsea. Many ${a.borough} clients visit to see fabrics in person before or after their in-home consultation.` },
    { q: 'Do you work with co-op and condo boards?', a: 'Yes. We regularly coordinate with building management on insurance certificates, elevator bookings and work-hour rules.' }
  ];
  res.locals.schema = [serviceSchema('Custom window treatments', `Custom shades, blinds, drapery and motorization in ${a.name}`, a.name), faqSchema(faqs)];
  res.locals.breadcrumbs = crumbs([{ name: 'Areas We Serve', url: '/locations/' }, { name: a.name, url: a.url }]);
  render(res, 'location', {
    title: `Window Treatments ${a.name}, ${a.borough === 'Manhattan' ? 'NYC' : 'Brooklyn'} | Shades, Blinds & Drapes | Horizon`,
    description: `Custom shades, blinds, drapery and motorized window treatments in ${a.name}. Free in-home consultation, free installation. Serving ${a.borough} since 1999.`,
    a, faqs, nearby: a.nearby.map(s => areaBySlug[s]).filter(Boolean)
  });
});

app.get('/locations/:area/:service/', (req, res, next) => {
  const a = areaBySlug[req.params.area];
  const s = serviceByKey[req.params.service];
  if (!a || !s) return next();
  const tip = advice[s.key][a.type];
  const faqs = [
    { q: `How much do ${s.name.toLowerCase()} cost in ${a.name}?`, a: `Every window is custom, so pricing depends on size, fabric, quantity and options like motorization. Your quote is free, it includes installation, and NYC sales tax is added separately.` },
    { q: `How long does installation take in ${a.name}?`, a: 'Most products are fabricated in about two weeks (two to three for motorized projects). Most apartments are installed in a single visit.' },
    { q: `Can I see ${s.name.toLowerCase()} before I order?`, a: `Yes — your designer brings samples to your ${a.name} home, and you are welcome at our Chelsea showroom at ${site.address.street}.` }
  ];
  res.locals.schema = [serviceSchema(s.name, `${s.name} in ${a.name}: ${s.angle}.`, a.name), faqSchema(faqs)];
  res.locals.breadcrumbs = crumbs([{ name: 'Areas We Serve', url: '/locations/' }, { name: a.name, url: a.url }, { name: s.name, url: `${a.url}${s.key}/` }]);
  const otherServices = services.filter(x => x.key !== s.key);
  const products_ = products.filter(p => p.serviceKey === s.key || (s.key === 'custom-drapery' && p.cat === 'drapery'));
  render(res, 'location-service', {
    title: `${s.name} ${a.name} | Custom ${s.name} & Free Installation | Horizon`,
    description: `Custom ${s.name.toLowerCase()} in ${a.name}, ${a.borough}: ${s.angle}. Free in-home consultation, free installation, serving NYC since 1999.`,
    a, s, tip, faqs, otherServices, relatedProducts: products_, nearby: a.nearby.map(x => areaBySlug[x]).filter(Boolean)
  });
});

const simple = (url, view, title, description, extra = {}) =>
  app.get(url, (req, res) => {
    res.locals.breadcrumbs = crumbs([{ name: extra.crumb || title.split('|')[0].trim(), url }]);
    if (extra.faqs) res.locals.schema = [faqSchema(extra.faqs)];
    render(res, view, { title, description, ...extra });
  });

const faqPage = require('./data/faqs');
simple('/commercial/', 'commercial', 'Commercial Window Treatments NYC | Offices, Hospitality, Property Managers | Horizon',
  'Commercial window shades and blinds for NYC offices, hospitality and multifamily buildings. Multi-unit measuring, coordinated installs, motorization. Request an assessment.', { crumb: 'Commercial' });
simple('/pricing/', 'pricing', 'Window Treatment Pricing NYC | Transparent Quotes | Horizon',
  'Transparent pricing on custom shades, blinds and drapery in NYC. Every quote includes professional installation. Get your free quote.', { crumb: 'Pricing' });
simple('/portfolio/', 'portfolio', 'Our Portfolio | Window Treatments in NYC Homes | Horizon',
  'See custom shades, blinds, drapery and motorized window treatments by Horizon Window Treatments across New York City.', { crumb: 'Our Portfolio' });
simple('/faqs/', 'faqs', "FAQ's | Horizon Window Treatments NYC",
  'Answers about free consultations, installation, payment, warranties and timelines for custom window treatments in NYC.', { crumb: "FAQ's", faqs: faqPage });
simple('/about-us/', 'about', 'About Us | Horizon Window Treatments NYC Since 1999',
  'Horizon Window Treatments has served New York City since 1999 from our Chelsea showroom, carrying Hunter Douglas, Somfy, Lutron, Carole Fabrics and Graber.', { crumb: 'About Us' });
simple('/contact-us/', 'contact', 'Contact Us | Horizon Window Treatments | Chelsea Showroom NYC',
  'Visit our showroom at 133 West 24th Street, call (212) 759-4111, or send us a message. Free in-home consultations across Manhattan and Brooklyn.', { crumb: 'Contact Us' });
simple('/bookappointment/', 'book', 'Schedule a Free Consultation | Horizon Window Treatments NYC',
  'Book your free in-home window treatment consultation. A Horizon designer brings samples, measures your windows and gives you a quote.', { crumb: 'Schedule Consultation' });
simple('/privacy-policy-2/', 'privacy', 'Privacy Policy | Horizon Window Treatments', 'Privacy policy for horizonyc.com.', { crumb: 'Privacy Policy' });
simple('/thank-you/', 'thanks', 'Thank You | Horizon Window Treatments', 'Thanks for reaching out to Horizon Window Treatments.', { crumb: 'Thank You' });

// Blog
app.get('/blogs/', (req, res) => {
  res.locals.breadcrumbs = crumbs([{ name: 'Blogs', url: '/blogs/' }]);
  render(res, 'blogs', { title: 'Window Treatment Blog | Ideas & Guides | Horizon NYC', description: 'Window treatment ideas, buying guides and care tips from the Horizon Window Treatments team in New York City.', posts: blog.posts });
});
app.get('/:slug/', (req, res, next) => {
  const meta = blog.bySlug[req.params.slug];
  if (!meta) return next();
  const full = blog.load(meta.slug);
  // Not migrated yet: on the preview domain send readers to the live article rather than an empty page.
  if (!full && !isProduction(req)) return res.redirect(302, IMAGE_ORIGIN + meta.url);
  if (!full) return next();
  res.locals.breadcrumbs = crumbs([{ name: 'Blogs', url: '/blogs/' }, { name: meta.title, url: meta.url }]);
  res.locals.schema = [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: full.title || meta.title, datePublished: full.date, dateModified: full.modified || full.date, author: { '@type': 'Organization', name: site.name }, mainEntityOfPage: site.url + meta.url }];
  render(res, 'post', { title: (full.seoTitle || full.title || meta.title) + ' | Horizon', description: full.description || meta.excerpt, meta, post: full, more: blog.posts.filter(p => p.slug !== meta.slug).slice(0, 3) });
});

// ---------- lead capture → GoHighLevel ----------
const hits = new Map();
app.post('/api/lead', async (req, res) => {
  const b = req.body || {};
  const wantsJson = (req.get('accept') || '').includes('application/json');
  const done = (ok, msg, code = 200) => wantsJson ? res.status(code).json({ ok, message: msg }) : res.redirect(303, ok ? '/thank-you/' : (b.page || '/contact-us/') + '?error=1');

  if (b.company_website) return done(true, 'ok'); // honeypot
  const ip = req.ip; const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return done(false, 'Too many submissions. Please call us at ' + site.phone + '.', 429);
  hits.set(ip, [...recent, now]);

  const clean = (v, n = 300) => String(v || '').trim().slice(0, n);
  const lead = {
    first_name: clean(b.name, 120).split(' ')[0],
    last_name: clean(b.name, 120).split(' ').slice(1).join(' '),
    full_name: clean(b.name, 120),
    phone: clean(b.phone, 40),
    email: clean(b.email, 200),
    neighborhood: clean(b.neighborhood, 120),
    zip: clean(b.zip, 10),
    interest: clean(b.interest, 120),
    project_type: clean(b.project_type, 60),
    timeline: clean(b.timeline, 60),
    message: clean(b.message, 3000),
    form_name: clean(b.form_name, 80) || 'Website consultation',
    page: clean(b.page, 300),
    landing_page: clean(b.landing_page, 300),
    referrer: clean(b.referrer, 300),
    utm_source: clean(b.utm_source, 120), utm_medium: clean(b.utm_medium, 120), utm_campaign: clean(b.utm_campaign, 200),
    utm_term: clean(b.utm_term, 200), utm_content: clean(b.utm_content, 200), gclid: clean(b.gclid, 200),
    submitted_at: new Date().toISOString(),
    source: 'horizonyc.com'
  };
  if (!lead.full_name || (!lead.phone && !lead.email)) return done(false, 'Please include your name and a phone number or email.', 400);
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return done(false, 'Please check your email address.', 400);

  const hook = process.env.GHL_WEBHOOK_URL;
  if (!hook) { console.warn('[lead] GHL_WEBHOOK_URL not set — lead logged only:', JSON.stringify(lead)); return done(true, 'ok'); }
  try {
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    if (!r.ok) throw new Error('GHL responded ' + r.status);
    return done(true, 'ok');
  } catch (e) {
    console.error('[lead] delivery failed', e.message, JSON.stringify(lead));
    return done(false, 'Something went wrong. Please call us at ' + site.phone + '.', 502);
  }
});

// ---------- SEO files ----------
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  if (!isProduction(req)) return res.send('User-agent: *\nDisallow: /\n');
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you/\n\nSitemap: ${site.url}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = ['/', '/commercial/', '/pricing/', '/portfolio/', '/faqs/', '/about-us/', '/contact-us/', '/bookappointment/', '/blogs/', '/locations/'];
  Object.values(categories).forEach(c => urls.push(c.url));
  products.forEach(p => urls.push(p.url));
  neighborhoods.forEach(a => { urls.push(a.url); services.forEach(s => urls.push(`${a.url}${s.key}/`)); });
  blog.posts.forEach(p => { if (blog.load(p.slug)) urls.push(p.url); });
  const today = new Date().toISOString().slice(0, 10);
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>`);
});

app.get('/healthz', (req, res) => res.send('ok'));

// ---------- 404 ----------
app.use((req, res) => { res.status(404); render(res, '404', { title: 'Page Not Found | Horizon Window Treatments', description: '' }); });
app.use((err, req, res, next) => { console.error(err); res.status(500).send('Server error'); });

app.listen(PORT, () => console.log(`Horizon site on :${PORT}`));
