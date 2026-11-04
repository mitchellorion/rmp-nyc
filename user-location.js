(function () {
  const locationLayer = L.layerGroup().addTo(map);
  let locationMarker = null;
  let accuracyCircle = null;

  const LocateControl = L.Control.extend({
    options: { position: "topright" },

    onAdd() {
      const container = L.DomUtil.create("div", "leaflet-bar user-location-control");
      const button = L.DomUtil.create("button", "user-location-button", container);

      button.type = "button";
      button.textContent = "My location";
      button.setAttribute("aria-label", "Show my current location on the map");
      button.title = "Show my current location";

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.on(button, "click", locateUser);

      return container;
    },
  });

  function setStatus(message) {
    document.getElementById("status-bar").textContent = message;
  }

  function locateUser(event) {
    if (event) {
      L.DomEvent.preventDefault(event);
    }

    if (!navigator.geolocation) {
      setStatus("Your browser does not support location access.");
      return;
    }

    setStatus("Requesting your location… Allow location access in your browser when prompted.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const point = [latitude, longitude];

        if (locationMarker) {
          locationLayer.removeLayer(locationMarker);
        }
        if (accuracyCircle) {
          locationLayer.removeLayer(accuracyCircle);
        }

        locationMarker = L.circleMarker(point, {
          radius: 8,
          color: "#ffffff",
          weight: 3,
          fillColor: "#0d6efd",
          fillOpacity: 1,
        }).addTo(locationLayer);
        locationMarker.bindPopup("You are here");

        accuracyCircle = L.circle(point, {
          radius: accuracy || 100,
          color: "#0d6efd",
          weight: 1,
          fillColor: "#0d6efd",
          fillOpacity: 0.12,
        }).addTo(locationLayer);

        map.flyTo(point, Math.max(map.getZoom(), 14), { duration: 1.2 });
        locationMarker.openPopup();
        setStatus("Your location is shown on the map. Location is only used in this browser session.");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("Location access was denied. You can enable it in your browser settings and try again.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setStatus("Your location is currently unavailable. Please try again.");
        } else if (error.code === error.TIMEOUT) {
          setStatus("Finding your location timed out. Please try again.");
        } else {
          setStatus("We couldn't determine your location. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  new LocateControl().addTo(map);
})();
