# RMP NYC Brooklyn Map

This repository contains a lightweight static website for exploring Brooklyn restaurants participating in the New York State Restaurant Meals Program (RMP).

## What is included

- Interactive map using Leaflet and OpenStreetMap tiles
- Search by restaurant or address
- Borough filtering (currently Brooklyn)
- Clickable list panel for restaurant locations
- Responsive layout suitable for desktop and mobile devices

## Run locally

Because this is a static site, you can open `index.html` directly in a browser or serve it from a local web server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Files

- `index.html` — page structure
- `styles.css` — layout and visual styling
- `app.js` — restaurant data and map logic

## Notes

The map uses Nominatim to geocode the restaurant addresses in the browser, so the page will request location data from OpenStreetMap when it loads.

If you want to expand this to Manhattan, Queens, the Bronx, or Staten Island, we can add the other boroughs in the same structure.

## GitHub Pages

Once enabled in GitHub repository settings, the site can be published through GitHub Pages by publishing the root folder as a static site.
