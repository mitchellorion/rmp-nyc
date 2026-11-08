import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const restaurants = JSON.parse(readFileSync(new URL("../src/data/restaurants.json", import.meta.url), "utf8"));
const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

test("every restaurant has a name, an address, a borough and a spot on the map", () => {
  assert.ok(restaurants.length > 0);
  for (const r of restaurants) {
    assert.ok(r.name && r.address, `name and address: ${JSON.stringify(r)}`);
    assert.ok(BOROUGHS.includes(r.borough), `borough: ${r.name}`);
    assert.ok(r.lat > 40.48 && r.lat < 40.93 && r.lon > -74.27 && r.lon < -73.68, `inside NYC: ${r.name} ${r.address}`);
  }
});

test("ids are unique and match the list position", () => {
  restaurants.forEach((r, i) => assert.equal(r.id, i));
});
