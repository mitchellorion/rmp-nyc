// Cookieless, aggregate analytics through GoatCounter.
//
// GoatCounter sets no cookies, stores no identifier for a person, and is free for
// non-commercial sites. Nothing here runs unless VITE_GOATCOUNTER_CODE is set at build
// time, and nothing runs for a visitor whose browser asks not to be tracked. See
// /privacy.html, which describes exactly this behaviour.
//
// Set the site code (for example "snapmapnyc") in .env, or as a repository variable in
// GitHub Actions, then rebuild.

const SITE_CODE = (import.meta.env.VITE_GOATCOUNTER_CODE ?? "").trim();
const SCRIPT_SRC = "https://gc.zgo.at/count.js";

let started = false;

export const analyticsEnabled = SITE_CODE.length > 0;

// Do Not Track and Global Privacy Control are honoured by not loading the script at all.
function optedOut() {
  const dnt = navigator.doNotTrack ?? window.doNotTrack ?? navigator.msDoNotTrack;
  return dnt === "1" || dnt === "yes" || navigator.globalPrivacyControl === true;
}

export function initAnalytics() {
  if (!analyticsEnabled || started || typeof document === "undefined") return;
  if (optedOut()) return;
  started = true;
  // GoatCounter reads this global before the script loads.
  window.goatcounter = { ...(window.goatcounter ?? {}), allow_local: false };
  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.setAttribute("data-goatcounter", `https://${SITE_CODE}.goatcounter.com/count`);
  document.head.appendChild(script);
}

// Counts an action that is not a page load, e.g. "directions" or "nearby-lookup".
// Only the event name is sent: never an address, a place, or a restaurant.
export function trackEvent(name) {
  if (!started) return;
  window.goatcounter?.count?.({ path: name, title: name, event: true });
}
