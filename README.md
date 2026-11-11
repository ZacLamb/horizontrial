# Horizon Window Treatments — Website Concept / SEO Platform

A polished Next.js 15 + React 19 website concept for Horizon Window Treatments, ready for GitHub and Railway. Includes **49 route URLs** from a data-driven service + neighborhood architecture, SEO metadata, JSON-LD local business schema, XML sitemap, responsive design, and consultation lead form with optional webhook integration.

## Start locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy on GitHub + Railway

1. Extract the ZIP. In GitHub create a new repository and upload the **contents of the folder** to the repository root (including `app/`, `components/`, `lib/`, and `package.json`).
2. In Railway select **New Project → Deploy from GitHub Repo**, then select the repository.
3. Railway will recognize Next.js automatically. Set Node.js 20+ (recommended 22). Build: `npm run build`; start: `npm run start`.
4. Generate a Railway domain in **Settings → Networking**. Your demo is live on the Railway URL.
5. To configure the public site (only after client approval and migration planning), set `NEXT_PUBLIC_SITE_URL=https://horizonyc.com` and connect the custom domain. Until then use the Railway demo domain. The preview defaults to noindex via `SITE_PREVIEW_MODE=true` (implicit default). Set `SITE_PREVIEW_MODE=false` only for approved production launch.
6. Set `LEADS_WEBHOOK_URL` to a **trusted server-side** webhook (GHL, Make, Zapier or a custom API) to activate form delivery. Optionally set `LEADS_WEBHOOK_AUTH`. Without this value the form explicitly reports **demo mode** and no lead is sent.

## Before sending live traffic

- **Photography is illustrative.** Unsplash remote photographs used as visual placeholders; they are NOT verified projects by Horizon. Replace them with rights-cleared Horizon installation and showroom photography. Images are currently loaded from remote Unsplash URLs; an internet connection is needed to display them.
- Confirm service areas, warranties, installation claims, brands and client details before publishing.
- Audit every existing WordPress URL and set appropriate 301 redirects or preserve URLs before migration. Common legacy paths are redirected in `next.config.ts`, but this is still a design prototype, **not a production-safe full migration of the existing WordPress site**. Audit all legacy URLs against Search Console before publishing.
- Do not turn on indexing for the Railway preview; canonical tags default to `horizonyc.com`, but add password protection / noindex if sharing a public preview widely.
- Form delivery requires webhook setup and spam protection / rate limiting appropriate for production. Existing booking calendars and consent flows are not imported. Add any required privacy, legal, accessibility and marketing consent disclosures.
- This demo intentionally avoids invented reviews, fabricated project case studies, false price lists or unverifiable ranking claims.
- Use Google Search Console / GA4 and map-service data to confirm which additional neighborhood/service combinations deserve indexation; don't publish hundreds of near-duplicate pages.
- Google Search Console verification, GA4, call tracking, CRM opportunity/revenue attribution and actual image migration remain follow-on integration tasks.

## Content editing

All services, neighborhoods, 20 selected geographic combinations and guides are maintained in `lib/data.ts`. Updating the arrays updates page generation, internal links and sitemap automatically.

### Routing

- `/` home
- `/services` + `/services/[slug]` service pages
- `/locations` + `/locations/[slug]` area hubs
- `/locations/[slug]/[service]` curated local service SEO pages
- `/commercial`, `/portfolio`, `/about`, `/contact`
- `/insights` + `/insights/[slug]` informational guides
- `/sitemap.xml`, `/robots.txt`

## Existing site details retained

- Horizon red-and-white brand identity
- Established 1999 positioning
- 133 West 24th Street, New York, NY 10011
- (212) 759-4111, customer@horizonyc.com
- Core services: shades, blinds, drapery, motorization, Hunter Douglas
- Complimentary in-home consultations and installation emphasis

## SEO and migration note

An existing WordPress site can have ranking URLs that don't exist in this new build. Export URLs from WordPress, the old sitemap and GSC, then add route redirects in `next.config.ts` or make the equivalent URLs directly accessible before changing the domain's DNS. Existing rank signals should be preserved wherever feasible.

## License

This is a custom presentation prototype. Verify your rights to use supplied business branding and replace all stock photography with client-owned or appropriately licensed assets before public release.
