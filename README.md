# Snap Map NYC

A playful illustrated map of New York City restaurants that accept EBT through
the Restaurant Meals Program. Live at [snapmapnyc.com](https://snapmapnyc.com)
(GitHub Pages).

- 333 restaurants, pre-geocoded, one colour per borough
- Hand-drawn SVG city map — no map library, no API keys
- Filter by borough, sort by distance from an address or ZIP (OpenStreetMap
  Nominatim, one request when the visitor asks for it)
- Stateless: no accounts, no cookies, the page URL holds the search
- Optional cookieless analytics (GoatCounter), off unless configured

## Stack

Vite + React (JSX), Tailwind CSS v4. No router.

## Pages

The map is a single page. The fine print lives in plain HTML under `public/`, so it
works on GitHub Pages without a router and prints cleanly:

| Page | File |
| --- | --- |
| Terms of use | `public/terms.html` |
| Privacy notice | `public/privacy.html` |
| Sponsorship and editorial independence | `public/sponsorship.html` |
| Accessibility statement | `public/accessibility.html` |
| One-pager for partners and funders | `public/partners.html` |

They share `public/legal.css`. The footer links to all of them with relative URLs
(`terms.html`), which is why there is no leading slash. Replace
`hello@snapmapnyc.com` with an address you actually monitor before launch.

## Analytics

Analytics is cookieless and aggregate, and it does nothing until you set a site code:

```bash
cp .env.example .env      # then set VITE_GOATCOUNTER_CODE=yourcode
npm run build:prod
```

On GitHub, set the repository variable `VITE_GOATCOUNTER_CODE` instead of committing
`.env`. Visitors whose browser sends Do Not Track or Global Privacy Control are never
counted, because the script is not loaded for them. The privacy notice describes this.

## Commands

```bash
npm run dev        # development server
npm run build      # preview build (dist-preview/)
npm run build:prod # production build (dist/)
npm test           # data tests (node --test)
```

## Deployment

Push to `main`. The GitHub Actions workflow (`.github/workflows/pages.yml`)
installs dependencies, builds `dist/`, and deploys it to GitHub Pages. The
custom domain `snapmapnyc.com` is set via the `CNAME` file in `public/`; DNS
must point at the Pages host for the domain to go live.

See `AGENTS.md` for project conventions and how to add a restaurant.
