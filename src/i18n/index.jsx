// This site is in American English. All visible copy is in ./messages.js. Edit the copy there.
//
// useI18n() gives a component the copy and the number, date and time formats for this
// language: t("hero.title") for one string, messages.section for a list, and formatPrice,
// formatNumber, formatDate and formatTime.
import messages from "./messages.js";

export const LOCALE = "en-US";
export const CURRENCY = "USD";

// t("hero.title") or t("hero.greeting", { name }). An unknown key returns the key itself,
// so a gap is visible on the page and not silent.
export function t(key, vars) {
  const value = key.split(".").reduce((node, part) => node?.[part], messages);
  if (typeof value !== "string") return value ?? key;
  return vars ? value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match)) : value;
}

const api = {
  locale: LOCALE,
  t,
  messages,
  formatPrice: (amount, options) =>
    new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY, ...options }).format(amount),
  formatNumber: (n, options) => new Intl.NumberFormat(LOCALE, options).format(n),
  formatDate: (date, options = { dateStyle: "long" }) => new Intl.DateTimeFormat(LOCALE, options).format(date),
  formatTime: (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return new Intl.DateTimeFormat(LOCALE, { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, h, m));
  },
};

export function useI18n() {
  return api;
}

// main.jsx wraps the app in this. It adds nothing, and it can stay.
export function I18nProvider({ children }) {
  return children;
}
