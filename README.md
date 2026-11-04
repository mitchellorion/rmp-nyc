1| # RMP NYC Brooklyn Map
2| 
3| This repository contains a lightweight static website for exploring Brooklyn restaurants participating in the New York State Restaurant Meals Program (RMP).
4| 
5| ## What is included
6| 
7| - Interactive map using Leaflet and OpenStreetMap tiles
8| - Search by restaurant or address
9| - Borough filtering (Brooklyn and Bronx)
10| - Clickable list panel for restaurant locations
11| - Responsive layout suitable for desktop and mobile devices
12| 
13| ## Run locally
14| 
15| Because this is a static site, you can open `index.html` directly in a browser or serve it from a local web server:
16| 
17| ```bash
18| python -m http.server 8000
19| ```
19| 
20| Then open http://localhost:8000 in your browser.
21| 
22| ## Files
23| 
24| - `index.html` — page structure
25| - `styles.css` — layout and visual styling
26| - `app.js` — restaurant data and map logic
27| 
28| ## Notes
29| 
29| The map uses Nominatim to geocode the restaurant addresses in the browser, so the page will request location data from OpenStreetMap when it loads.
30| 
31| This version includes both Brooklyn and Bronx participating locations for the Restaurant Meals Program.
32| 
33| ## GitHub Pages
34| 
35| Once enabled in GitHub repository settings, the site can be published through GitHub Pages by publishing the root folder as a static site.
36| 
