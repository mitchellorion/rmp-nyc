import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import restaurants from "@/data/restaurants.json";
import { useI18n } from "@/i18n/index.jsx";
import { About } from "@/components/About.jsx";
import { Finder } from "@/components/Finder.jsx";
import { Footer } from "@/components/Footer.jsx";
import { Header } from "@/components/Header.jsx";
import { MapView } from "@/components/MapView.jsx";
import { Results } from "@/components/Results.jsx";
import { bboxOfPoints, bboxOfShapes, isInNYC, miles, project } from "@/lib/geo.js";
import { findPlace } from "@/lib/geocode.js";
import { trackEvent } from "@/lib/analytics.js";
import { readUrl, writeUrl } from "@/lib/url-state.js";
import { BOROUGH_SHAPES } from "@/data/nyc-map.js";

const PAGE = 24;
const WHOLE_CITY = bboxOfShapes();
const COUNTS = restaurants.reduce((acc, r) => ({ ...acc, [r.borough]: (acc[r.borough] ?? 0) + 1 }), {});

export default function App() {
  const { t } = useI18n();
  const initial = useRef(readUrl()).current;
  const [borough, setBorough] = useState(initial.borough);
  const [category, setCategory] = useState("rmp");
  const [query, setQuery] = useState("");
  const [addressText, setAddressText] = useState(initial.near);
  const [place, setPlace] = useState(null); // { lat, lon, label } once an address is found
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [shown, setShown] = useState(PAGE);
  const mapRef = useRef(null);
  const lookup = useRef(null);

  const runLookup = useCallback(
    async (text) => {
      lookup.current?.abort();
      const controller = new AbortController();
      lookup.current = controller;
      setStatus("loading");
      setMessage("");
      try {
        const found = await findPlace(text, controller.signal);
        if (controller.signal.aborted) return;
        if (!found) {
          setPlace(null);
          setStatus("error");
          setMessage(t("finder.errors.notFound"));
          return;
        }
        setPlace(found);
        setSelectedId(null);
        setStatus("ok");
        setMessage(t("finder.foundNear", { place: found.label }));
        // Event name only: no address or place name is ever sent.
        trackEvent("nearby-lookup");
      } catch (error) {
        if (error?.name === "AbortError") return;
        setPlace(null);
        setStatus("error");
        setMessage(t("finder.errors.unreachable"));
      }
    },
    [t],
  );

  // A link with ?near= opens straight on that address.
  useEffect(() => {
    if (initial.near) runLookup(initial.near);
    return () => lookup.current?.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    writeUrl({ borough, near: place ? addressText.trim() : "" });
  }, [borough, place, addressText]);

  const onSubmitAddress = (event) => {
    event.preventDefault();
    if (addressText.trim()) runLookup(addressText);
  };

  const onLocate = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setMessage(t("finder.errors.unsupported"));
      return;
    }
    setStatus("loading");
    setMessage("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lon } = coords;
        if (!isInNYC(lat, lon)) {
          setPlace(null);
          setStatus("error");
          setMessage(t("finder.errors.outside"));
          return;
        }
        setAddressText("");
        setPlace({ lat, lon, label: "your location" });
        setSelectedId(null);
        setStatus("ok");
        setMessage(t("finder.foundNear", { place: "your location" }));
        trackEvent("use-my-location");
      },
      () => {
        setStatus("error");
        setMessage(t("finder.errors.denied"));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  const clearAddress = () => {
    lookup.current?.abort();
    setAddressText("");
    setPlace(null);
    setStatus("idle");
    setMessage("");
  };

  const reset = () => {
    clearAddress();
    setBorough("All");
    setCategory("rmp");
    setQuery("");
    setSelectedId(null);
  };

  const chooseBorough = (name) => {
    setBorough(name);
    setSelectedId(null);
    setShown(PAGE);
  };

  const chooseCategory = (name) => {
    setCategory(name);
    setSelectedId(null);
    setShown(PAGE);
  };

  // Filter, then sort: nearest first when there is an address, otherwise A to Z.
  const { items, distances } = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = restaurants.filter(
      (r) => (borough === "All" || r.borough === borough) && (!needle || `${r.name} ${r.address} ${r.zip}`.toLowerCase().includes(needle)),
    );
    // File order is not alphabetical once later rows are appended, so sort here.
    // Id is the tie-break, which keeps the original rows in their previous order.
    if (!place) {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "en-US") || a.id - b.id);
      return { items: list, distances: null };
    }
    const map = new Map(list.map((r) => [r.id, miles(place.lat, place.lon, r.lat, r.lon)]));
    list = [...list].sort((a, b) => map.get(a.id) - map.get(b.id));
    return { items: list, distances: map };
  }, [borough, query, place]);

  useEffect(() => setShown(PAGE), [borough, query, place, category]);

  const selected = items.find((r) => r.id === selectedId) ?? null;

  const focus = useMemo(() => {
    if (selected) {
      const [x, y] = project(selected.lon, selected.lat);
      return { key: `spot-${selected.id}`, bbox: [x - 70, y - 70, x + 70, y + 70], maxScale: 5 };
    }
    if (place) {
      const points = [project(place.lon, place.lat), ...items.slice(0, 4).map((r) => project(r.lon, r.lat))];
      return { key: `place-${place.lat}-${place.lon}-${borough}-${items.length}`, bbox: bboxOfPoints(points), maxScale: 6 };
    }
    if (borough !== "All") return { key: `borough-${borough}`, bbox: BOROUGH_SHAPES[borough].bbox, maxScale: 6 };
    return { key: "all", bbox: WHOLE_CITY, maxScale: 6 };
  }, [selected, place, borough, items]);

  const showOnMap = (id) => {
    setSelectedId(id);
    // On a phone the map sits above the list, so bring it into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      mapRef.current?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  };

  const pickPin = (id) => {
    setSelectedId(id);
    if (id == null) return;
    const index = items.findIndex((r) => r.id === id);
    if (index >= shown) setShown(Math.ceil((index + 1) / PAGE) * PAGE);
  };

  const canReset = borough !== "All" || !!query || !!place || !!addressText || category !== "rmp";

  return (
    <div id="top" tabIndex={-1} className="min-h-screen bg-paper font-body text-ink outline-none">
      <Header />
      <main className="dots-bg">
        <div className="mx-auto grid max-w-[90rem] gap-6 px-4 pb-4 pt-6 sm:px-6 lg:grid-cols-[minmax(22rem,27rem)_1fr] lg:gap-8 lg:pt-8">
          <div className="lg:col-start-1 lg:row-start-1">
            <Finder
              borough={borough}
              onBorough={chooseBorough}
              category={category}
              onCategory={chooseCategory}
              counts={COUNTS}
              total={restaurants.length}
              addressText={addressText}
              onAddressText={setAddressText}
              onSubmitAddress={onSubmitAddress}
              onClearAddress={clearAddress}
              onLocate={onLocate}
              status={status}
              message={message}
              hasPlace={!!place}
              query={query}
              onQuery={setQuery}
              onReset={reset}
              canReset={canReset}
            />
          </div>

          <div
            ref={mapRef}
            className="h-[62vh] min-h-[22rem] overflow-hidden rounded-[1.75rem] border-2 border-ink bg-water shadow-block lg:sticky lg:top-24 lg:self-start lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <MapView
              items={items}
              selectedId={selected?.id ?? null}
              onSelect={pickPin}
              user={place}
              focus={focus}
              borough={borough}
              onBorough={chooseBorough}
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <Results
              items={items}
              distances={distances}
              selectedId={selected?.id ?? null}
              onShow={showOnMap}
              shown={shown}
              onMore={() => setShown((n) => n + PAGE)}
              borough={borough}
              hasPlace={!!place}
              onReset={reset}
            />
          </div>
        </div>
      </main>
      <About />
      <Footer />
    </div>
  );
}
