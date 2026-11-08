# Snap Map NYC

A playful illustrated map of New York City restaurants that accept EBT through
the Restaurant Meals Program. Live at [snapmapnyc.com](https://snapmapnyc.com)
(GitHub Pages).

- 235 restaurants, pre-geocoded, one colour per borough
- Hand-drawn SVG city map — no map library, no API keys
- Filter by borough, sort by distance from an address or ZIP (OpenStreetMap
  Nominatim, one request when the visitor asks for it)
- Stateless: nothing stored, the page URL holds the search

## Stack

Vite + React (JSX), Tailwind CSS v4. No router.

## Commands

```bash
npm run dev        # development server
npm run build      # preview build (dist-preview/)
npm run build:prod # production build (dist/)
node --test        # data tests
```

## Deployment

Push to `main`. The GitHub Actions workflow (`.github/workflows/pages.yml`)
installs dependencies, builds `dist/`, and deploys it to GitHub Pages. The
custom domain `snapmapnyc.com` is set via the `CNAME` file in `public/`; DNS
must point at the Pages host for the domain to go live.

See `AGENTS.md` for project conventions and how to add a restaurant.
