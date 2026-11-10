import { Globe, MapPin, Navigation, Phone } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useI18n } from "@/i18n/index.jsx";
import { BOROUGH_VAR, foodEmoji } from "@/lib/geo.js";
import { trackEvent } from "@/lib/analytics.js";
import { Button, focusRing } from "./ui.jsx";

const linkClass = twMerge(
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg border-2 border-ink bg-white px-2.5 font-display text-sm font-bold text-ink hover:bg-accent",
  focusRing,
);

export function UnverifiedBadge() {
  const { t } = useI18n();
  return (
    <span className="inline-block max-w-full rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-center font-display text-xs font-bold leading-tight text-ink">
      {t("results.unverified")}
    </span>
  );
}

export function directionsUrl(r) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${r.name}, ${r.address}, ${r.borough}, NY ${r.zip}`)}`;
}

function Card({ r, index, selected, distance, isNearest, onShow }) {
  const { t, formatNumber } = useI18n();
  const emoji = foodEmoji(r.name);
  return (
    <li
      id={`spot-${r.id}`}
      className={twMerge(
        "relative rounded-2xl border-2 border-ink p-4 shadow-block-sm transition-[transform,box-shadow,background-color] duration-150 motion-reduce:transition-none",
        selected ? "bg-accent shadow-block" : "bg-white hover:-translate-y-0.5 hover:shadow-block motion-safe:hover:-rotate-[0.4deg]",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink text-2xl"
          style={{ background: BOROUGH_VAR[r.borough] }}
        >
          {emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-extrabold leading-tight text-ink">{r.name}</h3>
          <p className="mt-0.5 text-base leading-snug text-ink">
            {r.address}, {r.borough} {r.zip}
          </p>
          <p className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border-2 border-ink px-2.5 py-0.5 font-display text-xs font-bold text-ink" style={{ background: BOROUGH_VAR[r.borough] }}>
              {r.borough}
            </span>
            {distance != null && (
              <span className="rounded-full border-2 border-ink bg-white px-2.5 py-0.5 font-display text-xs font-bold text-ink">
                {t("results.away", { miles: formatNumber(distance, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) })}
              </span>
            )}
            {isNearest && (
              <span className="rounded-full border-2 border-ink bg-pop px-2.5 py-0.5 font-display text-xs font-bold text-on-pop">{t("results.nearest")}</span>
            )}
            {r.verification === "unverified" && <UnverifiedBadge />}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={selected ? "ink" : "primary"} onClick={() => onShow(r.id)} aria-pressed={selected}>
          <MapPin className="size-4" aria-hidden="true" />
          {selected ? t("results.onMap") : t("results.showMap")}
        </Button>
        <a
          className={linkClass}
          href={directionsUrl(r)}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackEvent("directions")}
        >
          <Navigation className="size-4" aria-hidden="true" />
          {t("results.directions")}
          <span className="sr-only"> — {r.name}</span>
        </a>
        {r.phone && (
          <a
            className={linkClass}
            href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
            onClick={() => trackEvent("call")}
          >
            <Phone className="size-4" aria-hidden="true" />
            {t("results.call")}
            <span className="sr-only"> {r.name}, {r.phone}</span>
          </a>
        )}
        {r.website && (
          <a className={linkClass} href={r.website} target="_blank" rel="noreferrer noopener">
            <Globe className="size-4" aria-hidden="true" />
            {t("results.website")}
            <span className="sr-only"> — {r.name}</span>
          </a>
        )}
      </div>
    </li>
  );
}

export function Results({ items, distances, selectedId, onShow, shown, onMore, borough, hasPlace, onReset }) {
  const { t, formatNumber } = useI18n();
  const count = items.length;
  const label = t(count === 1 ? "results.count.one" : "results.count.other", { count: formatNumber(count) });
  const visible = items.slice(0, shown);
  const remaining = count - visible.length;
  return (
    <section aria-labelledby="results-title" className="min-w-0">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="results-title" className="font-display text-2xl font-extrabold text-ink">
          {t("results.title")}
        </h2>
        <p className="font-display text-base font-bold text-ink" role="status" aria-live="polite">
          {label}
          {borough !== "All" && ` ${t("results.inBorough", { borough })}`}
        </p>
      </div>
      {count === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-ink bg-white p-6 text-center">
          <p className="text-lg text-ink">{t("results.empty")}</p>
          <Button className="mt-4" onClick={onReset}>
            {t("results.emptyButton")}
          </Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {visible.map((r, i) => (
            <Card
              key={r.id}
              r={r}
              index={i}
              selected={r.id === selectedId}
              distance={distances ? distances.get(r.id) : null}
              isNearest={hasPlace && i === 0}
              onShow={onShow}
            />
          ))}
        </ul>
      )}
      {remaining > 0 && (
        <div className="mt-5 text-center">
          <Button variant="outline" onClick={onMore}>
            {t("results.more", { count: formatNumber(Math.min(24, remaining)) })}
          </Button>
        </div>
      )}
    </section>
  );
}
