import restaurants from "@/data/restaurants.json";
import { NYC_BOUNDS, isInNYC } from "@/lib/geo.js";

// Turns what a visitor typed into a point on the map. A ZIP code that has restaurants is
// answered from the list itself. Anything else is looked up once with OpenStreetMap's free
// address search, restricted to New York City. Nothing is stored.
// Returns { lat, lon, label } or null (no match). Throws if the lookup can't be reached.

const ZIP_ONLY = /^\s*(\d{5})\s*$/;

function zipCentre(zip) {
  const same = restaurants.filter((r) => r.zip === zip);
  if (!same.length) return null;
  const lat = same.reduce((s, r) => s + r.lat, 0) / same.length;
  const lon = same.reduce((s, r) => s + r.lon, 0) / same.length;
  return { lat, lon, label: `ZIP ${zip}` };
}

export async function findPlace(text, signal) {
  const query = text.trim();
  if (!query) return null;
  const zip = query.match(ZIP_ONLY)?.[1];
  if (zip) {
    const local = zipCentre(zip);
    if (local) return local;
  }
  const withCity = /new york|nyc|brooklyn|bronx|queens|manhattan|staten|ny\b/i.test(query) ? query : `${query}, New York City`;
  const { west, east, south, north } = NYC_BOUNDS;
  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us" +
    `&viewbox=${west},${north},${east},${south}&bounded=1&q=${encodeURIComponent(withCity)}`;
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("lookup failed");
  const [hit] = await response.json();
  if (!hit) return null;
  const lat = Number(hit.lat);
  const lon = Number(hit.lon);
  if (!isInNYC(lat, lon)) return null;
  return { lat, lon, label: query };
}
