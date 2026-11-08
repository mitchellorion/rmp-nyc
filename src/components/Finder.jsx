import { ChevronDown, CircleAlert, LocateFixed, MapPinned, RotateCcw, Search, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useI18n } from "@/i18n/index.jsx";
import { BOROUGHS, BOROUGH_VAR } from "@/lib/geo.js";
import { Button, Eyebrow, focusRing } from "./ui.jsx";

const fieldClass = twMerge(
  "block min-h-12 w-full rounded-xl border-2 border-ink bg-white px-4 py-2.5 font-body text-base text-ink placeholder:text-ink/60",
  "shadow-block-sm transition-shadow focus:shadow-block",
  focusRing,
);
const labelClass = "mb-1.5 flex items-center gap-2 font-display text-base font-extrabold text-ink";

// The left-hand panel: borough drop-down, address, and name search.
export function Finder({
  borough,
  onBorough,
  counts,
  total,
  addressText,
  onAddressText,
  onSubmitAddress,
  onClearAddress,
  onLocate,
  status,
  message,
  hasPlace,
  query,
  onQuery,
  onReset,
  canReset,
}) {
  const { t, formatNumber } = useI18n();
  const busy = status === "loading";
  return (
    <section
      aria-labelledby="finder-title"
      className="relative rounded-[1.75rem] border-2 border-ink bg-white p-5 shadow-block motion-safe:animate-rise sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute -right-2 -top-5 hidden rotate-6 rounded-full border-2 border-ink bg-pop px-3 py-1 font-display text-sm font-extrabold text-on-pop shadow-block-sm motion-safe:animate-wobble sm:block"
      >
        {t("finder.sticker")}
      </span>
      <Eyebrow>{t("finder.eyebrow")}</Eyebrow>
      <h1 id="finder-title" className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl">
        <span className="bg-[linear-gradient(transparent_62%,var(--accent)_62%,var(--accent)_92%,transparent_92%)]">{t("finder.title")}</span>
      </h1>
      <p className="mt-3 text-lg leading-snug text-ink">{t("finder.intro")}</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="borough" className={labelClass}>
            <MapPinned className="size-5" aria-hidden="true" />
            {t("finder.boroughLabel")}
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-ink"
              style={{ background: borough === "All" ? "conic-gradient(var(--manhattan), var(--brooklyn), var(--queens), var(--bronx), var(--staten), var(--manhattan))" : BOROUGH_VAR[borough] }}
            />
            <select
              id="borough"
              value={borough}
              onChange={(event) => onBorough(event.target.value)}
              className={twMerge(fieldClass, "cursor-pointer appearance-none pl-11 pr-11 font-display font-bold")}
            >
              <option value="All">{t("finder.boroughAll")} ({formatNumber(total)})</option>
              {BOROUGHS.map((name) => (
                <option key={name} value={name}>
                  {name} ({formatNumber(counts[name] ?? 0)})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-ink" aria-hidden="true" />
          </div>
        </div>

        <form role="search" onSubmit={onSubmitAddress} noValidate>
          <label htmlFor="address" className={labelClass}>
            <LocateFixed className="size-5" aria-hidden="true" />
            {t("finder.addressLabel")}
          </label>
          <div className="relative">
            <input
              id="address"
              type="text"
              inputMode="text"
              autoComplete="street-address"
              value={addressText}
              onChange={(event) => onAddressText(event.target.value)}
              placeholder={t("finder.addressPlaceholder")}
              aria-describedby="address-help address-message"
              className={twMerge(fieldClass, hasPlace && "pr-12")}
            />
            {(hasPlace || addressText) && (
              <button
                type="button"
                onClick={onClearAddress}
                className={twMerge("absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-ink hover:bg-accent", focusRing)}
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">{t("finder.clearAddress")}</span>
              </button>
            )}
          </div>
          <p id="address-help" className="mt-1.5 text-sm text-ink">
            {t("finder.addressHelp")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <Button type="submit" disabled={busy || !addressText.trim()}>
              <Search className="size-4" aria-hidden="true" />
              {busy ? t("finder.locating") : t("finder.addressButton")}
            </Button>
            <Button type="button" variant="outline" onClick={onLocate} disabled={busy}>
              <LocateFixed className="size-4" aria-hidden="true" />
              {t("finder.useLocation")}
            </Button>
          </div>
          <div id="address-message" role="status" aria-live="polite">
            {message && (
              <p
                className={twMerge(
                  "mt-3 flex items-start gap-2 rounded-xl border-2 border-ink px-3 py-2 text-sm font-semibold text-ink motion-safe:animate-pop",
                  status === "error" ? "bg-[#ffd9d2]" : "bg-[#d6f7e6]",
                )}
              >
                {status === "error" && <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
                {message}
              </p>
            )}
          </div>
          <p className="mt-2 text-xs leading-snug text-ink">{t("finder.privacy")}</p>
        </form>

        <div>
          <label htmlFor="name-search" className={labelClass}>
            <Search className="size-5" aria-hidden="true" />
            {t("finder.nameLabel")}
          </label>
          <input
            id="name-search"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={t("finder.namePlaceholder")}
            className={fieldClass}
          />
        </div>

        {canReset && (
          <Button type="button" variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            {t("finder.reset")}
          </Button>
        )}
      </div>
    </section>
  );
}
