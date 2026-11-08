import { BOROUGH_SHAPES } from "@/data/nyc-map.js";

// The map is drawn in flat "map units". project() turns a longitude and latitude into them.
const LAT0 = 40.92;
const LON0 = -74.27;
const K = 2000;
const COS = Math.cos((40.7 * Math.PI) / 180);

export const project = (lon, lat) => [(lon - LON0) * COS * K, (LAT0 - lat) * K];

// Boroughs in the order of the drop-down.
export const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
export const BOROUGH_VAR = {
  Manhattan: "var(--manhattan)",
  Brooklyn: "var(--brooklyn)",
  Queens: "var(--queens)",
  Bronx: "var(--bronx)",
  "Staten Island": "var(--staten)",
};

export const NYC_BOUNDS = { west: -74.27, east: -73.68, south: 40.48, north: 40.93 };
export const isInNYC = (lat, lon) =>
  lat >= NYC_BOUNDS.south && lat <= NYC_BOUNDS.north && lon >= NYC_BOUNDS.west && lon <= NYC_BOUNDS.east;

export const bboxOfShapes = (names = BOROUGHS) => {
  const boxes = names.map((n) => BOROUGH_SHAPES[n].bbox);
  return [
    Math.min(...boxes.map((b) => b[0])),
    Math.min(...boxes.map((b) => b[1])),
    Math.max(...boxes.map((b) => b[2])),
    Math.max(...boxes.map((b) => b[3])),
  ];
};

export const bboxOfPoints = (points) => [
  Math.min(...points.map((p) => p[0])),
  Math.min(...points.map((p) => p[1])),
  Math.max(...points.map((p) => p[0])),
  Math.max(...points.map((p) => p[1])),
];

// Distance in miles between two points (haversine).
export function miles(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(a));
}

// A playful emoji for each place, guessed from its name.
const FOODS = [
  [/pizz/i, "🍕"],
  [/taco|tamale|mexican|qdoba|sabor|latino|mofongo|lechon/i, "🌮"],
  [/burger|mcdonald|sonic|checkers/i, "🍔"],
  [/chicken|popeye|wing|kentucky|bojangles|jerk|roasted|fried|bbq/i, "🍗"],
  [/crab|seafood|fish|ocean|sea and sky|shrimp/i, "🦀"],
  [/donut|dunkin|bakery|crepe|toast|cafe|café|coffee|tea|chai/i, "🍩"],
  [/noodle|dumpling|dim sum|chinese|wok|yuan|zai bing|duck|chow|kitchen|uncle ng|ng's|hua|cuihua|lins|happy cuisine|green garden|roseli|wong|dagu/i, "🥡"],
  [/gyro|halal|shawarma|mediterranean|kebab|qila/i, "🥙"],
  [/jamaican|caribbean|caribe|island|golden krust|kairibbean|sapoara|nicky|876/i, "🌴"],
  [/sushi|umi|thai|bao|bun/i, "🍣"],
  [/ihop|diner|breakfast|bites|deli/i, "🥞"],
  [/steak|grill|smart kitchen/i, "🥩"],
  [/salad|vegan|fruit|juice/i, "🥗"],
];
export function foodEmoji(name) {
  for (const [re, emoji] of FOODS) if (re.test(name)) return emoji;
  return "🍽️";
}
