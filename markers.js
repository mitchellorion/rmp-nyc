// Brand styling shared by the map, the restaurant list, and popups.
// Map markers are uniform dots that change color per brand; the monogram
// chips (brand chip) live next to restaurant names in the list and popups.

const BRAND_STYLES = [
  { match: /mcdonald/i, label: "M", bg: "#da291c", fg: "#ffc72c" },
  { match: /burger king/i, label: "BK", bg: "#d62300", fg: "#ffffff" },
  { match: /popeye/i, label: "P", bg: "#f05a28", fg: "#ffffff" },
  { match: /kentucky fried chicken|\bkfc\b/i, label: "K", bg: "#e4002b", fg: "#ffffff" },
  { match: /dunkin/i, label: "D", bg: "#ff671f", fg: "#ffffff" },
  { match: /sonic/i, label: "S", bg: "#0060a8", fg: "#ffcb05" },
  { match: /checkers/i, label: "C", bg: "#e4002b", fg: "#ffffff" },
  { match: /bojangles/i, label: "B", bg: "#00539f", fg: "#ffffff" },
  { match: /ihop/i, label: "IH", bg: "#005eb8", fg: "#ffffff" },
  { match: /golden krust/i, label: "GK", bg: "#f9b233", fg: "#231f20" },
  { match: /qdoba/i, label: "Q", bg: "#c8102e", fg: "#ffffff" },
  { match: /dallas bbq/i, label: "D", bg: "#d6001c", fg: "#ffcb05" },
  { match: /jamaican flavors/i, label: "JF", bg: "#007a33", fg: "#ffcb05" },
  { match: /8 bit bites/i, label: "8", bg: "#1e1b4b", fg: "#a3e635" },
];

function getBrandStyle(restaurant) {
  for (const brand of BRAND_STYLES) {
    if (brand.match.test(restaurant.name)) {
      return brand;
    }
  }
  return null;
}

// Map marker: a uniform dot, tinted with the brand color when known.
// Kept deliberately simple - no text, logos, or transforms - so it tracks
// the map cleanly.
function createMarkerElement(restaurant) {
  const el = document.createElement("div");
  const brand = getBrandStyle(restaurant);

  el.className = "restaurant-marker";
  if (brand) {
    el.style.setProperty("--marker-bg", brand.bg);
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", `${restaurant.name} location`);
  return el;
}

// Monogram chip shown beside restaurant names in the list and popups.
function brandChipMarkup(restaurant) {
  const brand = getBrandStyle(restaurant);
  if (!brand) {
    return "";
  }
  return `<span class="brand-chip" style="--chip-bg: ${brand.bg}; --chip-fg: ${brand.fg}">${brand.label}</span>`;
}
