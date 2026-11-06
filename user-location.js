(function () {
  if (typeof maplibregl === "undefined" || typeof map === "undefined") {
    return;
  }

  let userMarker = null;
  let userAccuracyCircle = null;

  const statusBar = document.getElementById("status-bar");

  function setStatus(message) {
    if (statusBar) {
      statusBar.textContent = message;
    }
  }

  function clearUserLocation() {
    if (userMarker) {
      userMarker.remove();
      userMarker = null;
    }
    if (userAccuracyCircle) {
      userAccuracyCircle.remove();
      userAccuracyCircle = null;
    }
  }

  function onSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const point = [longitude, latitude];

    clearUserLocation();

    userMarker = new maplibregl.Marker({ color: "#0d6efd" })
      .setLngLat(point)
      .setPopup(new maplibregl.Popup({ offset: 25 }).setText("You are here"))
      .addTo(map);
    userMarker.togglePopup();

    userAccuracyCircle = new maplibregl.CircleLayer ? null : null; // placeholder; accuracy ring not critical

    map.flyTo({
      center: point,
      zoom: Math.max(map.getZoom(), 15),
      duration: 1200,
    });

    setStatus("Your location is shown on the map. Location is only used in this browser session.");
  }

  function onError(error) {
    if (error.code === error.PERMISSION_DENIED) {
      setStatus("Location access was denied. You can enable it in your browser settings and try again.");
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      setStatus("Your location is currently unavailable. Please try again.");
    } else if (error.code === error.TIMEOUT) {
      setStatus("Finding your location timed out. Please try again.");
    } else {
      setStatus("We couldn't determine your location. Please try again.");
    }
  }

  function locateUser(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (!navigator.geolocation) {
      setStatus("Your browser does not support location access.");
      return;
    }

    setStatus("Requesting your location… Allow location access in your browser when prompted.");

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  }

  const LocateControl = function () {};
  LocateControl.prototype.onAdd = function () {
    const container = document.createElement("div");
    container.className = "maplibregl-ctrl maplibregl-ctrl-group user-location-control";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "user-location-button";
    button.textContent = "My location";
    button.setAttribute("aria-label", "Show my current location on the map");
    button.title = "Show my current location";
    button.addEventListener("click", locateUser);

    container.appendChild(button);
    return container;
  };
  LocateControl.prototype.onRemove = function () {};

  map.addControl(new LocateControl(), "top-right");
})();
