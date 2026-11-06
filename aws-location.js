(function () {
  const config = window.LOCATION_CONFIG;
  if (!config || !config.apiKey) {
    return;
  }

  const originalFetch = window.fetch.bind(window);
  const awsGeocodeUrl = `https://places.geo.${encodeURIComponent(config.region)}.amazonaws.com/v2/geocode`;

  window.fetch = function (input, init) {
    let requestUrl;
    try {
      requestUrl = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
    } catch {
      return originalFetch(input, init);
    }

    if (requestUrl.hostname !== "nominatim.openstreetmap.org" || requestUrl.pathname !== "/search") {
      return originalFetch(input, init);
    }

    const query = requestUrl.searchParams.get("q");
    if (!query) {
      return originalFetch(input, init);
    }

    return originalFetch(awsGeocodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-amz-api-key": config.apiKey,
      },
      body: JSON.stringify({ QueryText: query, MaxResults: 1 }),
    }).then(async (response) => {
      if (!response.ok) {
        return response;
      }

      const payload = await response.json();
      const results = (payload.Results || []).flatMap((result) => {
        const place = result.Place;
        const point = place && place.Geometry && place.Geometry.Point;
        if (!point || point.length < 2) {
          return [];
        }

        return [{
          lat: String(point[1]),
          lon: String(point[0]),
          display_name: place.Label || "",
        }];
      });

      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
  };
})();
