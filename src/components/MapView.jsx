import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minus, Navigation, Plus, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { BOROUGH_SHAPES } from "@/data/nyc-map.js";
import { useI18n } from "@/i18n/index.jsx";
import { BOROUGHS, BOROUGH_VAR, foodEmoji, project } from "@/lib/geo.js";
import { directionsUrl } from "./Results.jsx";
import { focusRing } from "./ui.jsx";

const MIN_SCALE = 0.35;
const MAX_SCALE = 10;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Where to look so that a box of map units fills the screen.
function fitView(bbox, size, maxScale = MAX_SCALE) {
  const [x0, y0, x1, y1] = bbox;
  const padX = Math.min(56, size.w * 0.12);
  const padY = Math.min(56, size.h * 0.12);
  const scale = clamp(Math.min((size.w - padX * 2) / Math.max(x1 - x0, 1), (size.h - padY * 2) / Math.max(y1 - y0, 1)), MIN_SCALE, maxScale);
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, scale };
}

const Pin = memo(function Pin({ r, x, y, visual, selected, tabbable, onSelect }) {
  const emoji = visual >= 24 ? foodEmoji(r.name) : null;
  return (
    <button
      type="button"
      onClick={() => onSelect(r.id)}
      tabIndex={tabbable ? 0 : -1}
      aria-label={`${r.name}, ${r.address}`}
      aria-pressed={selected}
      className={twMerge("group absolute left-0 top-0 grid min-h-6 min-w-6 place-items-center rounded-full", focusRing, selected ? "z-20" : "z-10 hover:z-20")}
      style={{ transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`, width: Math.max(24, visual), height: Math.max(24, visual) }}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          "grid place-items-center rounded-full border-2 border-ink leading-none shadow-[2px_2px_0_0_var(--ink)] transition-transform duration-150 group-hover:scale-125 motion-reduce:transition-none",
          selected ? "bg-accent motion-safe:animate-bob" : "bg-white",
        )}
        style={{
          width: selected ? Math.max(visual + 8, 30) : visual,
          height: selected ? Math.max(visual + 8, 30) : visual,
          fontSize: Math.max(visual, 30) * (selected ? 0.55 : 0.52),
        }}
      >
        {selected ? emoji ?? foodEmoji(r.name) : emoji}
      </span>
    </button>
  );
});

// An illustrated map of the five boroughs. `focus` says which area to show ({ bbox, key, maxScale }).
export function MapView({ items, selectedId, onSelect, user, focus, borough, onBorough }) {
  const { t, formatNumber } = useI18n();
  const wrapRef = useRef(null);
  const raf = useRef(0);
  const viewRef = useRef(null);
  const drag = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [view, setViewState] = useState(null);

  const setView = useCallback((next) => {
    viewRef.current = next;
    setViewState(next);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animateTo = useCallback(
    (target) => {
      cancelAnimationFrame(raf.current);
      const from = viewRef.current;
      if (!from || reducedMotion()) {
        setView(target);
        return;
      }
      const start = performance.now();
      const duration = 700;
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const e = 1 - (1 - p) ** 3;
        setView({
          cx: from.cx + (target.cx - from.cx) * e,
          cy: from.cy + (target.cy - from.cy) * e,
          scale: from.scale * (target.scale / from.scale) ** e,
        });
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [setView],
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    if (!size.w || !size.h) return;
    animateTo(fitView(focus.bbox, size, focus.maxScale));
    // Re-aim when the area to show changes, or when the map changes size.
  }, [focus.key, size.w, size.h]); // eslint-disable-line react-hooks/exhaustive-deps

  const zoomBy = (factor) => {
    const v = viewRef.current;
    if (v) animateTo({ ...v, scale: clamp(v.scale * factor, MIN_SCALE, MAX_SCALE) });
  };
  const panBy = (dx, dy) => {
    const v = viewRef.current;
    if (v) setView({ ...v, cx: v.cx - dx / v.scale, cy: v.cy - dy / v.scale });
  };

  const onPointerDown = (event) => {
    if (event.button !== 0 || event.target.closest("button, a")) return;
    cancelAnimationFrame(raf.current);
    drag.current = { x: event.clientX, y: event.clientY, moved: 0, captured: false };
  };
  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    d.x = event.clientX;
    d.y = event.clientY;
    d.moved += Math.abs(dx) + Math.abs(dy);
    if (d.moved < 5 && !d.captured) return;
    if (!d.captured) {
      d.captured = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    panBy(dx, dy);
  };
  const endDrag = () => {
    drag.current = null;
  };
  const onKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    const moves = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] };
    if (moves[event.key]) {
      event.preventDefault();
      panBy(...moves[event.key]);
    } else if (event.key === "+" || event.key === "=") zoomBy(1.5);
    else if (event.key === "-") zoomBy(1 / 1.5);
  };

  const toScreen = useCallback(
    (x, y) => (view ? [(x - view.cx) * view.scale + size.w / 2, (y - view.cy) * view.scale + size.h / 2] : [0, 0]),
    [view, size.w, size.h],
  );

  const placed = useMemo(() => items.map((r) => ({ r, p: project(r.lon, r.lat) })), [items]);
  const ready = view && size.w > 0;
  const visual = ready ? clamp(13 + (view.scale - 0.8) * 3.4, 13, 36) : 13;
  const selected = placed.find(({ r }) => r.id === selectedId);
  const tabbable = items.length <= 25;
  const groupTransform = ready ? `translate(${size.w / 2 - view.cx * view.scale} ${size.h / 2 - view.cy * view.scale}) scale(${view.scale})` : undefined;

  const visiblePins = ready
    ? placed
        .map((item) => ({ ...item, s: toScreen(item.p[0], item.p[1]) }))
        .filter(({ s }) => s[0] > -30 && s[0] < size.w + 30 && s[1] > -30 && s[1] < size.h + 30)
    : [];

  const labelAt = (name) => toScreen(...BOROUGH_SHAPES[name].label);
  const waterLabels = [
    ["map.water.atlantic", project(-73.9, 40.52)],
    ["map.water.sound", project(-73.78, 40.865)],
    ["map.water.harbor", project(-74.05, 40.64)],
  ];

  let popup = null;
  if (ready && selected) {
    const [sx, sy] = toScreen(selected.p[0], selected.p[1]);
    const left = clamp(sx, 140, Math.max(140, size.w - 140));
    const below = sy < 190;
    popup = (
      <div
        className="absolute z-30 w-64 max-w-[calc(100%-1rem)] motion-safe:animate-pop"
        style={{ left, top: sy, transform: `translate(-50%, ${below ? "28px" : "calc(-100% - 28px)"})` }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="relative rounded-2xl border-2 border-ink bg-white p-3.5 pr-11 shadow-block-sm">
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={twMerge("absolute right-1 top-1 grid size-10 place-items-center rounded-lg text-ink hover:bg-accent", focusRing)}
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">{t("map.close")}</span>
          </button>
          <p className="font-display text-base font-extrabold leading-tight text-ink">{selected.r.name}</p>
          <p className="mt-0.5 text-sm leading-snug text-ink">
            {selected.r.address}, {selected.r.borough}
          </p>
          <a
            href={directionsUrl(selected.r)}
            target="_blank"
            rel="noreferrer noopener"
            className={twMerge("mt-2.5 inline-flex min-h-9 items-center gap-1.5 rounded-lg border-2 border-ink bg-accent px-2.5 font-display text-sm font-bold text-on-accent", focusRing)}
          >
            <Navigation className="size-4" aria-hidden="true" />
            {t("map.openDirections")}
          </a>
        </div>
        <span
          aria-hidden="true"
          className={twMerge("absolute left-1/2 size-4 -translate-x-1/2 rotate-45 border-ink bg-white", below ? "-top-2 border-l-2 border-t-2" : "-bottom-2 border-b-2 border-r-2")}
          style={{ left: `calc(50% + ${clamp(sx - left, -100, 100)}px)` }}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label={t("map.label")}
      aria-describedby="map-hint"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className={twMerge("waves-bg relative h-full w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing motion-safe:animate-drift", "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-pop")}
    >
      <p id="map-hint" className="sr-only">
        {t("map.hint")}
      </p>
      {ready && (
        <>
          <svg width={size.w} height={size.h} className="absolute inset-0" aria-hidden="true">
            <defs>
              <pattern id="blocks" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="var(--ink)" strokeWidth="0.35" />
              </pattern>
            </defs>
            <g transform={groupTransform}>
              {BOROUGHS.map((name) => {
                const dim = borough !== "All" && borough !== name;
                const shape = BOROUGH_SHAPES[name];
                return (
                  <g
                    key={name}
                    className="cursor-pointer"
                    onClick={() => onBorough(borough === name ? "All" : name)}
                  >
                    <path d={shape.d} fill={BOROUGH_VAR[name]} fillOpacity={dim ? 0.4 : 1} stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                    <path d={shape.d} fill="url(#blocks)" opacity={clamp(0.5 / view.scale + 0.08, 0.08, 0.35)} pointerEvents="none" />
                  </g>
                );
              })}
            </g>
          </svg>

          {waterLabels.map(([key, point]) => {
            const [x, y] = toScreen(...point);
            return (
              <span
                key={key}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 font-display text-xs font-bold italic tracking-widest text-ink/80 uppercase"
                style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
              >
                {t(key)}
              </span>
            );
          })}

          {BOROUGHS.map((name) => {
            const [x, y] = labelAt(name);
            const dim = borough !== "All" && borough !== name;
            return (
              <span
                key={name}
                aria-hidden="true"
                className={twMerge("pointer-events-none absolute left-0 top-0 rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 font-display text-xs font-extrabold text-ink shadow-[2px_2px_0_0_var(--ink)] sm:text-sm", dim && "opacity-60")}
                style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
              >
                {name}
              </span>
            );
          })}

          {visiblePins.map(({ r, s }) => (
            <Pin key={r.id} r={r} x={s[0]} y={s[1]} visual={visual} selected={r.id === selectedId} tabbable={tabbable} onSelect={onSelect} />
          ))}

          {user &&
            (() => {
              const [ux, uy] = toScreen(...project(user.lon, user.lat));
              return (
                <div
                  className="pointer-events-none absolute left-0 top-0 z-20"
                  style={{ transform: `translate(${ux}px, ${uy}px) translate(-50%, -50%)` }}
                >
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 -ml-4 -mt-4 size-8 rounded-full bg-pop motion-safe:animate-ring" />
                  <span className="relative grid size-6 place-items-center rounded-full border-2 border-ink bg-pop shadow-[2px_2px_0_0_var(--ink)]">
                    <span className="size-2 rounded-full bg-white" />
                  </span>
                  <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-ink bg-white px-2 py-0.5 font-display text-xs font-extrabold text-ink">
                    {t("map.you")}
                  </span>
                </div>
              );
            })()}

          {popup}
        </>
      )}

      <div className="absolute right-3 top-3 z-30 flex flex-col gap-2" onPointerDown={(event) => event.stopPropagation()}>
        {[
          [Plus, "map.zoomIn", () => zoomBy(1.6)],
          [Minus, "map.zoomOut", () => zoomBy(1 / 1.6)],
          [Maximize2, "map.fit", () => animateTo(fitView(focus.bbox, size, focus.maxScale))],
        ].map(([Icon, key, action]) => (
          <button
            key={key}
            type="button"
            onClick={action}
            className={twMerge(
              "grid size-11 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-block-sm transition-transform hover:bg-accent active:translate-x-[3px] active:translate-y-[3px] active:shadow-none motion-reduce:transition-none",
              focusRing,
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            <span className="sr-only">{t(key)}</span>
          </button>
        ))}
      </div>

      <p
        className="pointer-events-none absolute bottom-3 left-3 z-30 -rotate-3 rounded-full border-2 border-ink bg-pop px-3.5 py-1.5 font-display text-sm font-extrabold text-on-pop shadow-block-sm"
        aria-hidden="true"
      >
        {t("map.sticker", { count: formatNumber(items.length) })}
      </p>
    </div>
  );
}
