(function () {
  if (typeof maplibregl === "undefined" || typeof map === "undefined") {
    return;
  }

  const geolocate = new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    },
    fitBoundsOptions: { maxZoom: 16, duration: 1200 },
    trackUserLocation: false,
    showAccuracyCircle: true,
    showUserLocation: true,
  });

  window.map.addControl(geolocate, "top-right");
})();
