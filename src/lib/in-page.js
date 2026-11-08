// In-page links. The built page sets a base address for the site, so href="#book" resolves to
// "/#book" and not to this page. On a page address with a query (?a=..., ?lang=...,
// ?utm_source=...) a plain click would load the site root and lose the answers. Keep href="#id"
// in the markup, and handle the click with this instead. It scrolls to the target, moves focus to
// it when it can take focus (tabIndex={-1}), and puts the hash in the address without a reload or
// a new history entry.

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const isInPage = (href) => typeof href === "string" && href.startsWith("#");

export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" });
  if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`);
}

// onClick={jumpTo} on any <a href="#id">. A modified click (new tab, new window) keeps the default.
export function jumpTo(event) {
  const href = event.currentTarget.getAttribute("href");
  if (!isInPage(href) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
  event.preventDefault();
  scrollToId(decodeURIComponent(href.slice(1)));
}
