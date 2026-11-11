# horizonyc.com — Horizon Window Treatments

Node/Express + EJS site for GitHub → Railway auto-deploy. Same stack as our other client builds.
Design matches the current horizonyc.com (Montserrat/Poppins, Playfair hero, Horizon red bars, black pill buttons, charcoal footer), cleaned up and built for local SEO and lead capture.

## What's in it (225 indexable pages)

| Section | URLs | Notes |
|---|---|---|
| Home | `/` | Same section order as the live site + who-we-help, areas, blog |
| Categories | `/shadesblinds/` `/drapery/` `/motorization/` `/hunter-douglas/` | **Exact existing URLs** |
| Products (15) | `/roller-shades/` `/roman-shades/` `/solar-shades/` `/wood-blinds/` `/metal-blinds/` `/ripple-fold-drapery/` `/pinch-pleat/` `/grommet/` `/motorized-solar-roller-shades/` `/motorized-drapes/` `/motorized-roman-shades/` `/motorized-skylights/` `/duette-honeycomb-shades/` `/silhouette-shades/` `/luminette-privacy-sheers/` | **Exact existing URLs**, so rankings carry over with no redirects |
| Areas | `/locations/` + 28 neighborhood hubs | Manhattan + Brooklyn |
| Area × service | `/locations/<area>/<service>/` (168) | 6 services × 28 areas, advice changes by building type (pre-war / brownstone / loft / tower / mixed) |
| Pages | `/commercial/` `/pricing/` `/portfolio/` `/faqs/` `/about-us/` `/contact-us/` `/bookappointment/` `/privacy-policy-2/` `/blogs/` | Existing URLs kept |
| Blog (20) | `/<post-slug>/` | Existing URLs kept; content pulled in by the migration (below) |

Old URLs that 301: `/our-portfolio/`, `/bookappoitment/`, `/roller-shades-privacy-light-filtering-textured/`, the dated `/2023/01/30/...` posts, and the ChatGPT prototype's `/services/...` routes. No trailing slash → 301 to the slash version (same as WordPress).

All business content lives in `data/` — edit there and every page, the sitemap and the schema update.

## Deploy

1. New GitHub repo → upload the contents of this folder (not the folder itself).
2. Railway → New Project → Deploy from GitHub repo. `railway.json` sets start command + `/healthz` health check.
3. Railway → Variables (see `.env.example`):
   - `GHL_WEBHOOK_URL` — Horizon sub-account → Automation → new workflow → trigger **Inbound Webhook** → copy URL. Every form posts: name, phone, email, interest, project_type, neighborhood, timeline, message, form_name, page, landing_page, referrer, utm_*, gclid.
   - `GHL_CALENDAR_EMBED_URL` (optional) — puts the GHL booking calendar on `/bookappointment/`.
   - `GA4_ID` / `GTM_ID` (optional). Forms push `generate_lead`, phone taps push `click_to_call` to the dataLayer.
4. Generate a Railway domain and review. **The Railway domain is automatically `noindex` + robots `Disallow`** — only requests on `horizonyc.com` are indexable. Nothing to flip at launch.

## Before pointing horizonyc.com DNS at Railway

1. **Run the migration** — GitHub → Actions → **Migrate WordPress content** → Run workflow. It copies Horizon's photos and all 20 blog posts off WordPress into the repo at the same paths and commits them (Railway redeploys). Check `content/migration-report.json` for anything that failed.
   - Until then, images and blog posts are served from the live WordPress site, so the preview looks right today.
   - WordPress has a bot challenge on its API. If the Action reports posts as "blocked", run `npm run migrate` from any machine with a normal connection, or whitelist the GitHub runner in the host's firewall for a few minutes.
2. Export the full URL list from WordPress / Search Console and compare against the table above. Add any stragglers to the `redirects` map in `server.js`.
3. Set `SITE_URL=https://horizonyc.com`, point DNS, submit `/sitemap.xml` in Search Console.

## Commands

```
npm install
npm run dev        # http://localhost:3000
npm run check      # crawls the sitemap on a running server and reports any non-200 / broken internal link
npm run migrate    # pull images + blog posts from WordPress
```
