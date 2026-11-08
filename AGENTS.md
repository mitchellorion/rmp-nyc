# Project Setup

Factual state of this project, for the assistant's reference: structure, installed packages, active
patterns. The current state only, never a history. Keep it under 24 KB.

**Snap Map NYC** (snapmapnyc.com): a playful illustrated map of 235 New York City restaurants that
take EBT through the Restaurant Meals Program. The left panel has
a borough drop-down, an address / ZIP box with a "Use my location" button, and a name search. The
right side is the map. Below the filters is the list of spots, nearest first when an address is set,
otherwise A to Z. Keep the bold style: thick ink outlines, hard offset shadows, taxi-yellow accent,
one colour per borough, bouncing pins, wobbling stickers.

## Stack

A **Vite + React** single-page app (JSX), styled with **Tailwind CSS v4** (utilities; tokens in
`tailwind.config.cjs`, CSS variables in `src/index.css`). No router: one page with the anchors
`#top` and `#about`, plus plain HTML pages in `public/` for the legal text and the partner
one-pager, linked from the footer with relative `terms.html`-style URLs. Every `<a href="#id">` takes `onClick={jumpTo}` from `src/lib/in-page.js`
(the `<base href>` would otherwise turn the click into a load of `/#id` and lose `?borough=`).
Icons come from `lucide-react`. There is no map library: the map is drawn by hand (see below).
`package.json` is empty; do not `npm install` anything. React, react-dom, vite, lucide-react,
`@radix-ui/react-slot`, `tailwind-merge` and Tailwind come from the platform.

The app is **stateless**: no accounts, no storage, no cookies, no forms that save anything. Optional
cookieless analytics (GoatCounter) is off unless `VITE_GOATCOUNTER_CODE` is set, and is skipped for
Do Not Track and Global Privacy Control; only event names are sent, never an address. The page
address holds the search: `?borough=Brooklyn&near=11201`. The only outside call is the address
lookup, which a visitor starts by pressing "Find spots near me": one request to OpenStreetMap's
free address search (Nominatim), limited to NYC, nothing stored. A ZIP code that has restaurants is
answered from the list without any call. The footer and the Finder say so. The site cannot send
email; there is no contact or sign-up form. If asked for one, explain that email isn't available
and offer a link to a service the owner already uses.

StrictMode is on in dev. Effects clean up after themselves; renders are pure.

## Structure

```text
index.html                   # title, description, page background, the one web-font link
tailwind.config.cjs          # colour tokens, fonts, shadows, animations (bob, wobble, ring, drift, pop, rise)
public/favicon.svg           # yellow map pin
public/legal.css             # shared style for the static pages
public/terms.html            # terms of use
public/privacy.html          # privacy notice (Nominatim, GitHub Pages, GoatCounter)
public/sponsorship.html      # sponsorship + editorial independence policy
public/accessibility.html    # accessibility statement (WCAG 2.2 AA target)
public/partners.html         # printable one-pager for partners and funders
tests/data.test.js           # node --test: every restaurant has a borough and sits inside NYC
src/
  main.jsx                   # StrictMode > I18nProvider > ErrorBoundary > App
  App.jsx                    # all state (borough, address, place, query, selection), filtering, sorting, map focus
  index.css                  # palette variables, dot and wave backgrounds
  data/
    restaurants.json         # id, name, address, borough, zip, lat, lon, optional phone, website
    nyc-map.js               # BOROUGH_SHAPES: simplified outline path "d", label point, bbox per borough
  lib/
    geo.js                   # project(lon, lat) to map units, BOROUGHS, miles(), foodEmoji(name), bbox helpers
    geocode.js               # findPlace(text): ZIP from the list, else Nominatim
    url-state.js             # readUrl / writeUrl for ?borough= and ?near=
    analytics.js             # initAnalytics / trackEvent, cookieless and opt-out aware
    in-page.js               # jumpTo for in-page links
  components/
    Header.jsx  Finder.jsx  Results.jsx  MapView.jsx  About.jsx  Footer.jsx  ui.jsx  ErrorBoundary.jsx
  i18n/index.jsx, messages.js  # every visible string
```

## How the map works

`MapView.jsx` draws the boroughs as SVG paths from `nyc-map.js` inside one `<g>` whose transform
comes from a view `{ cx, cy, scale }` (map units, px per unit). Pins, borough labels, water labels,
the "You are here" marker and the popup are HTML elements positioned from the same view, so pins are
real `<button>`s. `App.jsx` passes `focus = { key, bbox, maxScale }`; when `focus.key` changes the map
animates there (instantly under reduced motion). Focus order: selected spot, then address plus its 4
nearest spots, then the chosen borough, then the whole city. Drag pans (pointer capture starts after
5 px so clicks still work), the +, -, fit buttons zoom, arrow keys and +/- work when the map has
focus, clicking a borough picks it (click again for all). Pin size and emoji grow with zoom. Pins
are tab stops only when 25 or fewer are showing; the list is the keyboard route otherwise.

## Data

`restaurants.json` was geocoded once (US Census batch geocoder, three addresses by hand) and the
borough of each point was set from NYC borough outlines, so it can differ from the old list for a
few addresses. To add a restaurant: append an object with `name`, `address`, `borough`, `zip`, `lat`,
`lon` (and `phone`, `website` if known), keep the list sorted by name and re-number `id` to the
position (the test checks this), then run `node --test`. Find coordinates for a new address with
OpenStreetMap search or the Census geocoder. `foodEmoji()` in `geo.js` picks each spot's emoji from
keywords in its name; extend its list for new kinds of places.

## Language

American English (`en-US`). All copy is in `src/i18n/messages.js`; components read it with
`const { t, messages } = useI18n()` (`t("finder.title")`). `useI18n()` also gives `formatNumber`,
`formatPrice`, `formatDate`, `formatTime`. A new string goes into `messages.js` first. When the user
writes in another language, keep the site copy in American English unless they ask to change it; the
site is set up for one language, so offer to rewrite `messages.js` in the new one.

## Design rules

- Colours: `paper`, `ink`, `accent` (taxi yellow), `on-accent`, `pop` (tomato: focus rings, dots,
  stickers), `on-pop`, `water`, and `manhattan`, `brooklyn`, `queens`, `bronx`, `staten`. Defaults are
  in `src/index.css`; Tailwind names come from `tailwind.config.cjs`. Text is always `ink` (or `paper`
  on the dark footer); keep strong contrast.
- Type: Gabarito (`font-display`) for headings, buttons and labels; Atkinson Hyperlegible
  (`font-body`) for text. The single `vite-ignore` link in `index.html` (Google Fonts) and
  `fontFamily` in the config must name the same families. Never add another font source.
- Look: `border-2 border-ink`, `rounded-xl` to `rounded-[1.75rem]`, `shadow-block` and
  `shadow-block-sm`, buttons press in on click. Every animation is `motion-safe`.
- Layout: one column on phones (filters, map, list), at `lg` the filters and list sit on the left
  and the map is sticky on the right. Tap targets are at least 24 px (buttons mostly 44 px).
- Accessibility: real labels on every field, status messages in `role="status"` regions, emoji and
  decorative shapes `aria-hidden`, visible focus rings.

## Commands

```bash
npm run dev        # development server
npm run build      # preview output
npm run build:prod # production output
node --test        # data tests
```

## Routing & asset paths

The built page is served from more than one base path, so never hardcode root-absolute URLs for
in-app links or assets (`/static/<file>` is the one allowed exception). Vite is configured with
`base: "./"` so relative asset URLs work everywhere. This site has no router and no images of its
own. If a router is added, set its basename from `document.baseURI`.
