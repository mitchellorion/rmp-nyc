# RMP NYC Restaurant Map

This repository contains a lightweight static website for exploring restaurants participating in the New York State Restaurant Meals Program (RMP).

## Included

- Interactive map rendered with MapLibre GL JS and Amazon Location Service map tiles
- Search by restaurant or address
- Borough filtering for Brooklyn, the Bronx, Manhattan, Queens, and Staten Island
- Clickable list panel for restaurant locations
- Responsive layout for desktop and mobile

## Run locally

The site is driven by a runtime configuration file that holds your Amazon Location Service credentials.

1. Copy the example config:

   ```bash
   cp location-config.js.example location-config.js
   ```

2. Edit `location-config.js` with your AWS Location API key and region.

3. Serve the root folder with a local web server:

   ```bash
   python -m http.server 8000
   ```

4. Open http://localhost:8000.

## Deployment to GitHub Pages

The included GitHub Actions workflow (`.github/workflows/pages.yml`) builds the site on every push to `main` and deploys it to GitHub Pages. The workflow generates `location-config.js` from repository secrets.

Required repository secret:

- `LOCATION_API_KEY` — an Amazon Location Service API key with permissions for `geo-places:Geocode` and `geo-maps:GetStyleDescriptor`/`geo-maps:GetTile`.

The region is set in the workflow (`us-east-2` by default) and written into the generated config alongside the key.

## Files

- `index.html` — page structure and borough selection
- `styles.css` — layout and visual styling
- `app.js` — restaurant data, AWS Location geocoding, and map logic
- `additional-boroughs.js` — Manhattan, Queens, and Staten Island restaurant data
- `user-location.js` — browser geolocation control (device-native, displayed on the AWS map)

## Geo services

All map and geocoding requests use Amazon Location Service:

- Map style and raster/vector tiles are loaded from `maps.geo.<region>.amazonaws.com`.
- Restaurant addresses are geocoded via `places.geo.<region>.amazonaws.com/v2/geocode`.

Browser geolocation (`navigator.geolocation`) is still used to obtain the user's current position, because there is no third-party replacement for device GPS/Wi-Fi positioning. The position is shown on the Amazon map.

## GitHub Pages

Enable GitHub Pages in the repository settings and publish from the GitHub Actions workflow.
