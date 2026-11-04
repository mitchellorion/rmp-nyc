const restaurants = [
  { name: "8 Bit Bites - 113 Bistro", address: "113 Court Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11201", phone: "347-384-2336", website: "https://8bitbitesbk.com" },
  { name: "8 Bit Bites - 881 Bistro", address: "881 Lexington Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11221", phone: "917-444-1958", website: "https://8bitbitesbk.com" },
  { name: "8 Bit Bites - Brain Food Deli & Salad Bar", address: "967 Bedford Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11205", phone: "718-928-7699", website: "https://8bitbitesbk.com" },
  { name: "Atomic Wings", address: "66 Willoughby Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11201" },
  { name: "Bamboo Seafood", address: "5108 7th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" },
  { name: "Bojangles", address: "5910 Church Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11203" },
  { name: "Brain Food Deli & Smart Kitchen", address: "111 Court Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11201", phone: "347-559-0538", website: "https://www.brainfoodbk.com" },
  { name: "BunNan - Caton", address: "2123 Caton Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226" },
  { name: "BunNan - Flatbush", address: "1248 Flatbush Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226", website: "https://www.bunnan.co/" },
  { name: "Burger King", address: "3301 Ft. Hamilton Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11218", phone: "718-438-9153", website: "https://bk.com" },
  { name: "Burger King", address: "417-21 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11201", phone: "718-330-0854", website: "https://burgerking.com" },
  { name: "Burger King", address: "971 Flatbush Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226", phone: "718-284-3397", website: "https://burgerking.com" },
  { name: "Burger King", address: "1297 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11216", phone: "347-533-9880", website: "https://burgerking.com" },
  { name: "Burger King", address: "1661 Linden Boulevard", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212", phone: "347-789-4200", website: "https://burgerking.com" },
  { name: "Burger King", address: "524 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11216", phone: "347-689-3405", website: "https://burgerking.com" },
  { name: "Burger King/Popeyes", address: "8516 5th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11209", phone: "718-630-5535", website: "https://burgerking.com" },
  { name: "Burger King/Popeyes", address: "2343 Utica Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11234", phone: "718-338-6821", website: "https://burgerking.com" },
  { name: "Carnation Restaurant", address: "2310 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214", phone: "718-210-1780" },
  { name: "Carro Café", address: "3472 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11208" },
  { name: "Chaska Chai", address: "3680 Nostrand Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11229" },
  { name: "Checkers", address: "1801 Church Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226" },
  { name: "Crème of the Island Restaurant & Juice Bar", address: "436 Rockaway Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212" },
  { name: "Cuihua Kitchen", address: "2004 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214", phone: "347-312-4098", website: "https://www.cuihuakitchen.com/" },
  { name: "Dagu Rice Noodle", address: "8515 18th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214" },
  { name: "Dallas BBQ", address: "180 Livingston Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11201" },
  { name: "Dexin Yuan Zai Bing Restaurant", address: "712 60th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" },
  { name: "Dunkin Donuts", address: "1052 Flushing Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11237" },
  { name: "Fatima's Grill", address: "964 Coney Island Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11230", phone: "929-238-3198", website: "https://www.fatimas-grill.com/" },
  { name: "FIX-U-PLATE", address: "1139 Clarkson Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212", phone: "718-975-4544", website: "https://fix-u-plate.res-menu.com/" },
  { name: "FIX-U-PLATE", address: "1412 Rockaway Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11236", phone: "718-975-4544", website: "https://fix-u-plate.res-menu.com/" },
  { name: "Golden Krust", address: "1364 Pennsylvania Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11239" },
  { name: "Gyro King Express", address: "1017 Foster Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11230", phone: "718-484-0606" },
  { name: "Halal Gyro King", address: "984 Coney Island Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11230", phone: "718-421-6600" },
  { name: "Halal Munchies", address: "474 Myrtle Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11205", phone: "718-636-6112" },
  { name: "Happy Cuisine", address: "6712 Bay Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11204" },
  { name: "Hey Rich Roasted", address: "6005 Fort Hamilton Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11219" },
  { name: "Hua Yi Jia Restaurant", address: "5616 7th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" },
  { name: "IHOP", address: "1019 Surf Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11224", phone: "718-676-7220", website: "https://restaurants.ihop.com/en-us/ny/brooklyn/breakfast-1019-surf-ave-2132" },
  { name: "iRestaurant", address: "5922 8th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220", phone: "718-439-3155", website: "https://www.irestaurantny.com" },
  { name: "Jam It Bistro", address: "367 Columbia Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11231", phone: "347-599-0941", website: "https://www.jamitbistrony.com" },
  { name: "Jamaican Flavors", address: "1397 Rockaway Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11236", website: "https://www.jamaicanflavors.com/" },
  { name: "Jamaican Flavors", address: "295 Utica Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11213", website: "https://www.jamaicanflavors.com/" },
  { name: "Jamaican Flavors", address: "358 Koscuiszko Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11221", website: "https://www.jamaicanflavors.com/" },
  { name: "Jamaican Flavors", address: "483 Nostrand Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11216", website: "https://www.jamaicanflavors.com/" },
  { name: "Jamaican Flavors", address: "4917 Church Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11203", website: "https://www.jamaicanflavors.com/" },
  { name: "Jamaican Flavors", address: "194 Rockaway Ave", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11233", website: "https://www.jamaicanflavors.com/" },
  { name: "Kairibbean Island Mix", address: "393 New Lots Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11207" },
  { name: "Kitchen 86", address: "2306 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214", phone: "718-710-6222", website: "https://www.roastguy.com/" },
  { name: "Lebron Restaurant", address: "1567 Pitkin Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212", phone: "718-342-9070" },
  { name: "Loma No. 5", address: "454 Rockaway Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212", phone: "347-442-5775" },
  { name: "McDonald's", address: "943 Flatbush Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226" },
  { name: "McDonald's", address: "700 Broadway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11206" },
  { name: "McDonald's", address: "741 Grand Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11211" },
  { name: "McDonald's", address: "267 Broadway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11211" },
  { name: "McDonald's", address: "652 Meeker Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11222" },
  { name: "McDonald's", address: "1275 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11236" },
  { name: "McDonald's", address: "180 Parkside Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11226" },
  { name: "McDonald's", address: "204-11 Hillside Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11423" },
  { name: "McDonald's", address: "2413 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214" },
  { name: "McDonald's", address: "289 9th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11215" },
  { name: "McDonald's", address: "357 Hamilton Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11231" },
  { name: "McDonald's", address: "2240 Flatbush Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11234" },
  { name: "McDonald's", address: "430 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11209" },
  { name: "McDonald's", address: "8520 20th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214" },
  { name: "McDonald's", address: "7124 3rd Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11209" },
  { name: "McDonald's", address: "3540 Nostrand Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11224" },
  { name: "McDonald's", address: "6620 Bay Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11204" },
  { name: "McDonald's", address: "428 Knickerbocker Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11237" },
  { name: "McDonald's", address: "1380 Broadway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11221" },
  { name: "Memphis Seoul", address: "569 Lincoln Place", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11238", phone: "347-349-2562", website: "https://getmemphisseoul.com" },
  { name: "Mi Sabor Restaurant", address: "609 Sutter Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11207" },
  { name: "MoMo's Mediterranean Grill", address: "25 101 Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11208" },
  { name: "More Than Fries", address: "1077 Rutland Road", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11212", website: "https://morethanfries.com/" },
  { name: "New Yee Li", address: "6619 Fort Hamilton Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11219", phone: "718-833-8373" },
  { name: "NG's Kitchen", address: "6012 8th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" },
  { name: "Nicky's Jamaican Cuisine", address: "766 East 80th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11236", phone: "718-444-8100" },
  { name: "Ocean Eats", address: "865 4th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11232", phone: "718-808-8817", website: "https://oceaneatsbk.com" },
  { name: "Peppas Jerk Chicken", address: "791 Prospect Place", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11216", phone: "718-450-3976", website: "https://peppasonline.com" },
  { name: "Popeye's", address: "1465 Myrtle Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11237", phone: "718-381-9681", website: "https://popeyes.com" },
  { name: "Popeye's", address: "709 Brighton Beach Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11235", phone: "718-975-2995", website: "https://popeyes.com" },
  { name: "Popeye's", address: "5100 Kings Plaza", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11234" },
  { name: "Popeye's", address: "3764 Nostrand Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11235" },
  { name: "Popeye's", address: "1153 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11216" },
  { name: "Popeye's", address: "3342 Fulton Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11208" },
  { name: "Popeye's", address: "1159 Utica Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11203" },
  { name: "Popeye's", address: "1375 Rockaway Parkway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11236" },
  { name: "Popeye's", address: "1052 Flushing Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11237" },
  { name: "Popeye's", address: "2779 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11223", phone: "718-996-2828" },
  { name: "Popeye's", address: "918 Manhattan Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11222" },
  { name: "Popeyes", address: "624 Conduit Boulevard", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11208", phone: "718-348-9517", website: "https://burgerking.com" },
  { name: "Rosa's Steakhouse", address: "567 Wilson Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11207", phone: "347-405-6745" },
  { name: "Roseli Chinese Restaurant", address: "2322 86th Street", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11214", phone: "929-387-8200" },
  { name: "Season Restaurant", address: "1321 Avenue U", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11229" },
  { name: "Sheep by Baraksha", address: "1223 Avenue U", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11229", website: "https://www.sheepbybarashka.com/" },
  { name: "Sonic Drive In", address: "805 Pennsylvania Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11207" },
  { name: "Sonic Drive In", address: "730 Broadway", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11206" },
  { name: "Tonel To Go", address: "1407 Flatbush Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11210", phone: "347-240-1166" },
  { name: "Umi Premium Sushi & Seafood Buffet", address: "3839 Nostrand Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11235" },
  { name: "Uncle NG's Recipe", address: "5603 8th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" }
];

const map = L.map("map").setView([40.6782, -73.9442], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const searchInput = document.getElementById("restaurant-search");
const countEl = document.getElementById("restaurant-count");
const listEl = document.getElementById("restaurant-list");
const resetButton = document.getElementById("reset-button");
const statusBar = document.getElementById("status-bar");
const boroughSelect = document.getElementById("borough-select");

const activeRestaurants = [];

function formatAddress(restaurant) {
  return `${restaurant.address}, ${restaurant.city || "Brooklyn, NY"}`;
}

function popupContent(restaurant) {
  const websiteMarkup = restaurant.website
    ? `<a class="popup-link" href="${restaurant.website}" target="_blank" rel="noreferrer">Website</a>`
    : "";

  return `
    <div>
      <span class="popup-name">${restaurant.name}</span>
      <span class="popup-meta">${restaurant.address}</span>
      <span class="popup-meta">${restaurant.city || "Brooklyn, NY"}</span>
      ${restaurant.phone ? `<span class="popup-meta">${restaurant.phone}</span>` : ""}
      ${websiteMarkup}
    </div>
  `;
}

function addMarker(restaurant, coordinates) {
  const restaurantWithPoint = { ...restaurant, point: coordinates };
  activeRestaurants.push(restaurantWithPoint);

  const marker = L.marker([coordinates.lat, coordinates.lon]).addTo(markerLayer);
  marker.bindPopup(popupContent(restaurant));
  marker.bindTooltip(restaurant.name, { direction: "top", opacity: 0.9 });
  marker.restaurant = restaurantWithPoint;

  return restaurantWithPoint;
}

async function geocodeRestaurant(restaurant) {
  const query = encodeURIComponent(formatAddress(restaurant));
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${query}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed for ${restaurant.name}`);
    }

    const data = await response.json();

    if (!data || !data.length) {
      return null;
    }

    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getFilteredRestaurants() {
  const borough = boroughSelect.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  return activeRestaurants.filter((restaurant) => {
    const matchesBorough = restaurant.borough === borough || borough === "All";
    const text = `${restaurant.name} ${restaurant.address} ${restaurant.city}`.toLowerCase();
    const matchesSearch = !searchValue || text.includes(searchValue);
    return matchesBorough && matchesSearch;
  });
}

function renderRestaurantList(items) {
  listEl.innerHTML = "";

  if (!items.length) {
    listEl.innerHTML = '<p class="empty-state">No Brooklyn restaurants match your search.</p>';
    countEl.textContent = "0 restaurants";
    return;
  }

  countEl.textContent = `${items.length} restaurants`;

  items.forEach((restaurant) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "restaurant-item";
    item.innerHTML = `
      <strong>${restaurant.name}</strong>
      <span>${restaurant.address}</span>
      <small>${restaurant.city || "Brooklyn, NY"}</small>
    `;

    item.addEventListener("click", () => {
      if (restaurant.point) {
        map.flyTo([restaurant.point.lat, restaurant.point.lon], 15, { duration: 1.3 });
      }

      const marker = markerLayer
        .getLayers()
        .find((layer) => layer.restaurant && layer.restaurant.name === restaurant.name && layer.restaurant.address === restaurant.address);

      if (marker) {
        marker.openPopup();
      }
    });

    listEl.appendChild(item);
  });
}

function refreshList() {
  const filtered = getFilteredRestaurants();
  renderRestaurantList(filtered);
}

searchInput.addEventListener("input", refreshList);
boroughSelect.addEventListener("change", refreshList);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  refreshList();
  map.setView([40.6782, -73.9442], 11);
});

async function initializeMap() {
  statusBar.textContent = "Geocoding addresses for Brooklyn restaurants…";

  for (const restaurant of restaurants) {
    const coordinates = await geocodeRestaurant(restaurant);
    if (coordinates) {
      addMarker(restaurant, coordinates);
    }
  }

  if (!activeRestaurants.length) {
    statusBar.textContent = "No locations could be mapped. Please check the list and try again.";
    return;
  }

  statusBar.textContent = `Loaded ${activeRestaurants.length} Brooklyn restaurant locations.`;
  refreshList();
}

initializeMap();
