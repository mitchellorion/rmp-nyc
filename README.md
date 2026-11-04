# RMP NYC Restaurant Map

This repository contains a lightweight static website for exploring restaurants participating in the New York State Restaurant Meals Program (RMP).

## Included

- Interactive Leaflet map using OpenStreetMap tiles
- Search by restaurant or address
- Borough filtering for Brooklyn, the Bronx, Manhattan, Queens, and Staten Island
- Clickable list panel for restaurant locations
- Responsive layout for desktop and mobile

## Run locally

Open `index.html` directly in a browser, or serve the root folder with a local web server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Files

- `index.html` — page structure and borough selection
- `styles.css` — layout and visual styling
- `app.js` — Brooklyn and Bronx restaurant data and map logic
- `additional-boroughs.js` — Manhattan, Queens, and Staten Island restaurant data

## Notes

The map geocodes restaurant addresses in the browser using Nominatim, so loading the page sends address queries to OpenStreetMap's geocoding service.

## GitHub Pages

Enable GitHub Pages in the repository settings and publish the root folder as a static site.
