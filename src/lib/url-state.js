import { BOROUGHS } from "@/lib/geo.js";

// The page address holds the search, so a link reopens the same view: ?borough=Brooklyn&near=11201
export function readUrl() {
  const params = new URLSearchParams(window.location.search);
  const borough = params.get("borough");
  return {
    borough: BOROUGHS.includes(borough) ? borough : "All",
    near: (params.get("near") ?? "").slice(0, 120),
  };
}

export function writeUrl({ borough, near }) {
  const params = new URLSearchParams(window.location.search);
  if (borough && borough !== "All") params.set("borough", borough);
  else params.delete("borough");
  if (near) params.set("near", near);
  else params.delete("near");
  const query = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
}
