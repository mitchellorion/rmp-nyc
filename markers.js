// Brand-styled map markers.
// Chains get a marker in their brand colors with a monogram (or inline SVG
// logo); everything else keeps the neutral RMP accent dot. This file is
// shared by the live map and any preview/test pages.

const BRAND_STYLES = [
  {
    match: /mcdonald/i,
    label: "M",
    bg: "#da291c",
    fg: "#ffc72c",
    // Golden arches drawn as two rounded arches.
    svg: '<svg viewBox="0 0 20 14" aria-hidden="true"><path d="M2.5 12.5C2.5 6.5 4 1.5 6.8 1.5 8.3 1.5 9.3 7.5 10 9.5 10.7 7.5 11.7 1.5 13.2 1.5 16 1.5 17.5 6.5 17.5 12.5" fill="none" stroke="#ffc72c" stroke-width="3" stroke-linecap="round"/></svg>',
  },
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

function createMarkerElement(restaurant) {
  const el = document.createElement("div");
  const brand = getBrandStyle(restaurant);

  if (brand) {
    el.className = "restaurant-marker restaurant-marker--branded";
    el.style.setProperty("--marker-bg", brand.bg);
    el.style.setProperty("--marker-fg", brand.fg);
    if (brand.svg) {
      el.innerHTML = brand.svg;
    } else {
      el.textContent = brand.label;
    }
  } else {
    el.className = "restaurant-marker";
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", `${restaurant.name} location`);
  return el;
}
