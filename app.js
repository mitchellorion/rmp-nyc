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
  { name: "IHOP", address: "1019 Surf Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11224", phone: "718-676-7220", website: "https://restaurants.ihop.com/en-us/ny/brooklyn/breakfast-10[..." },
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
  { name: "Uncle NG's Recipe", address: "5603 8th Avenue", borough: "Brooklyn", city: "Brooklyn, NY", zip: "11220" },
  { name: "A Daughter and Two Sons", address: "1807 Archer Street", borough: "Bronx", city: "Bronx, NY", zip: "10460" },
  { name: "Amazing Chicken & Gyro", address: "3496 Jerome Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10467" },
  { name: "Bailey Seafood & Kuchifrito", address: "146 West 231st Street", borough: "Bronx", city: "Bronx, NY", zip: "10463", phone: "347-964-6296", website: "https://www.baileykuchifrito.com/" },
  { name: "Bites On Valentine", address: "239 East 203rd Street", borough: "Bronx", city: "Bronx, NY", zip: "10458", phone: "718-618-0311", website: "https://bitesonvalentine.com/" },
  { name: "Bobo's Crab Shack", address: "2450 Grand Concourse", borough: "Bronx", city: "Bronx, NY", zip: "10458", website: "https://www.boboscrabshack.com/menu" },
  { name: "Bobo's Wing and Seafood", address: "25 East Bedford Park Boulevard", borough: "Bronx", city: "Bronx, NY", zip: "10468", website: "https://www.boboscrabshack.com/menu" },
  { name: "Burger King", address: "3440 Jerome Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10467", phone: "347-275-1292", website: "https://burgerking.com" },
  { name: "Burger King/Popeyes", address: "60 Metropolitan Oval", borough: "Bronx", city: "Bronx, NY", zip: "10462", phone: "718-969-7025", website: "https://burgerking.com" },
  { name: "Caribe Restaurant", address: "1762 Crosby Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10461", phone: "718-822-5704" },
  { name: "Caridad Retaurant Express", address: "18 East Gun Hill Road", borough: "Bronx", city: "Bronx, NY", zip: "10467", phone: "718-324-5300" },
  { name: "Caridad Seafood Restaurant", address: "410 East Tremont Street", borough: "Bronx", city: "Bronx, NY", zip: "10457" },
  { name: "Churrasco Del Valle Restaurant", address: "255 East Burnside Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10457", phone: "917-473-6880" },
  { name: "Dallas BBQ", address: "2160 Bartow Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10475" },
  { name: "Dunkin Donuts", address: "4 East Fordham Road", borough: "Bronx", city: "Bronx, NY", zip: "10468" },
  { name: "Dunkin Donuts", address: "2370 Grand Concourse Road", borough: "Bronx", city: "Bronx, NY", zip: "10458" },
  { name: "Dunkin Donuts", address: "4722 Third Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10458" },
  { name: "El Valle Restaurant", address: "3535 Jerome Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10467", phone: "347-947-9344" },
  { name: "Flamez Cuisine", address: "3728 Bronxwood Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10469" },
  { name: "Jen's French Toast", address: "607 E 169th Street", borough: "Bronx", city: "Bronx, NY", zip: "10456", phone: "718-617-1212", website: "https://www.jensfrenchtoast.com/" },
  { name: "Leche Y Miel Restaurant", address: "5761 Broadway", borough: "Bronx", city: "Bronx, NY", zip: "10463", phone: "718-708-5787", website: "https://www.lecheymielrestaurant.com/" },
  { name: "Lechonera Don Pancholo", address: "2037 Jerome Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10453", phone: "718-583-2979" },
  { name: "Lins Home Chinese", address: "2461 University Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10468", phone: "718-364-2504" },
  { name: "Los Amigos Restaurant", address: "674 East 180th Street", borough: "Bronx", city: "Bronx, NY", zip: "10457", phone: "718-220-3551", website: "https://losamigosny.com/" },
  { name: "Love & Soul Food", address: "4 East Gun Hill Road", borough: "Bronx", city: "Bronx, NY", zip: "10467", phone: "347-202-4900" },
  { name: "Luna Café", address: "726 Courtlandt Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10451", phone: "855-983-8770", website: "https://lunacafeny.com" },
  { name: "Numero Uno Sabor Latino Restaurant", address: "4120 White Plains Road", borough: "Bronx", city: "Bronx, NY", zip: "10466", website: "https://www.1saborlatino.com/" },
  { name: "Pa' Comer", address: "104 E. 165th Street", borough: "Bronx", city: "Bronx, NY", zip: "10452", phone: "718-293-3800" },
  { name: "Pizza Italia", address: "842 East 180th Street", borough: "Bronx", city: "Bronx, NY", zip: "10460" },
  { name: "Popeye's", address: "815 Hutchinson Parkway", borough: "Bronx", city: "Bronx, NY", zip: "10465" },
  { name: "Popeye's", address: "631 E Tremont Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10457" },
  { name: "Popeyes", address: "2751 Boston Road", borough: "Bronx", city: "Bronx, NY", zip: "10469", phone: "718-994-2606", website: "https://popeyes.com" },
  { name: "Popeyes", address: "1905 Story Avenue", borough: "Bronx", city: "Bronx, NY", zip: "10473", phone: "718-239-0999", website: "https://popeyes.com" },
  { name: "Popeyes", address: "1600 Bruckner Boulevard", borough: "Bronx", city: "Bronx, NY", zip: "10473", phone: "718-708-4109", website: "https://popeyes.com" },
  { name: "Popeyes", address: "2176-A White Plains Road", borough: "Bronx", city: "Bronx, NY", zip: "10462", phone: "347-851-3001", website: "https://popeyes.com" },
  { name: "Qdoba Mexican Eats", address: "1 West Fordham Road", borough: "Bronx", city: "Bronx, NY", zip: "10468" },
  { name: "Rocbody Fitness Café", address: "2960 Middletown Road", borough: "Bronx", city: "Bronx, NY", zip: "10461", phone: "718-822-2500", website: "https://www.rocbodyfitnesscafe.com" },
  { name: "Sante Yallah Keur Aisha Restaurant", address: "1460 Boston Road", borough: "Bronx", city: "Bronx, NY", zip: "10460", phone: "718-450-8606" }
];

const NYC_CENTER = [-73.9442, 40.6782];
const statusBar = document.getElementById("status-bar");

const config = window.LOCATION_CONFIG;
if (!config || !config.apiKey || !config.region) {
  const message =
    "LOCATION_CONFIG is missing. For local development copy location-config.js.example to location-config.js. " +
    "For GitHub Pages deployments, set the LOCATION_API_KEY repository secret.";
  statusBar.textContent = message;
  throw new Error(message);
}

statusBar.textContent = "Loading map style…";

const map = new maplibregl.Map({
  container: "map",
  style: `https://maps.geo.${encodeURIComponent(
    config.region
  )}.amazonaws.com/v2/styles/Standard/descriptor?key=${encodeURIComponent(
    config.apiKey
  )}&color-scheme=Dark`,
  center: NYC_CENTER,
  zoom: 11,
});

map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

const searchInput = document.getElementById("restaurant-search");
const countEl = document.getElementById("restaurant-count");
const listEl = document.getElementById("restaurant-list");
const resetButton = document.getElementById("reset-button");
const boroughSelect = document.getElementById("borough-select");

const activeRestaurants = [];
let restaurantMarkers = [];

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

async function geocodeRestaurant(restaurant) {
  const query = formatAddress(restaurant);
  const url = `https://places.geo.${encodeURIComponent(
    config.region
  )}.amazonaws.com/v2/geocode?key=${encodeURIComponent(config.apiKey)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        QueryText: query,
        MaxResults: 1,
        BiasPosition: NYC_CENTER,
      }),
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed for ${restaurant.name}: ${response.status}`);
    }

    const data = await response.json();
    const item = data && data.ResultItems && data.ResultItems[0];

    if (!item || !Array.isArray(item.Position) || item.Position.length < 2) {
      return null;
    }

    const [lon, lat] = item.Position;
    return {
      lat: Number(lat),
      lon: Number(lon),
      display_name: (item.Address && item.Address.Label) || item.Title || "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

function createMarkerElement() {
  const el = document.createElement("div");
  el.className = "restaurant-marker";
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Restaurant location");
  return el;
}

function addMarker(restaurant, coordinates) {
  const restaurantWithPoint = { ...restaurant, point: coordinates };
  activeRestaurants.push(restaurantWithPoint);

  const marker = new maplibregl.Marker({ element: createMarkerElement() })
    .setLngLat([coordinates.lon, coordinates.lat])
    .setPopup(new maplibregl.Popup({ offset: 20 }).setHTML(popupContent(restaurant)))
    .addTo(map);

  marker.restaurant = restaurantWithPoint;

  return marker;
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
    listEl.innerHTML = '<p class="empty-state">No restaurants match your search.</p>';
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
        map.flyTo({
          center: [restaurant.point.lon, restaurant.point.lat],
          zoom: 15,
          duration: 1300,
        });
      }

      const marker = restaurantMarkers.find(
        (layer) =>
          layer.restaurant &&
          layer.restaurant.name === restaurant.name &&
          layer.restaurant.address === restaurant.address
      );

      if (marker) {
        marker.togglePopup();
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
  boroughSelect.value = "All";
  refreshList();
  map.flyTo({
    center: NYC_CENTER,
    zoom: 11,
    duration: 1300,
  });
});

async function geocodeWithConcurrency(items, concurrency) {
  const queue = items.map((item, index) => ({ index, item }));
  let completed = 0;

  async function worker() {
    while (queue.length) {
      const { item } = queue.shift();
      const coordinates = await geocodeRestaurant(item);
      completed += 1;

      if (coordinates) {
        addMarker(item, coordinates);
      }

      statusBar.textContent = `Geocoding addresses for restaurant locations (${completed}/${items.length})…`;
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
}

async function initializeMap() {
  statusBar.textContent = "Geocoding addresses for restaurant locations…";

  restaurantMarkers = [];

  await new Promise((resolve) => {
    if (map.isStyleLoaded()) {
      resolve();
      return;
    }
    map.once("load", resolve);
  });

  await geocodeWithConcurrency(restaurants, 5);

  if (!activeRestaurants.length) {
    statusBar.textContent = "No locations could be mapped. Please check the list and try again.";
    return;
  }

  statusBar.textContent = `Loaded ${activeRestaurants.length} restaurant locations.`;
  refreshList();
}

initializeMap();
