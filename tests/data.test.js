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
  assert.equal(new Set(restaurants.map((r) => r.id)).size, restaurants.length);
});

const SOURCES = ["USDA", "NYC HRA"];
const VERIFICATIONS = ["unverified", "verified"];
const ZIP = /^\d{5}$/;

test("restaurant records have required fields, NYC coordinates, and allowed provenance", () => {
  assert.ok(restaurants.length > 0);
  for (const r of restaurants) {
    assert.equal(typeof r.id, "number");
    assert.equal(typeof r.name, "string");
    assert.ok(r.name.trim(), `name: ${r.id}`);
    assert.equal(typeof r.address, "string");
    assert.ok(r.address.trim(), `address: ${r.name}`);
    assert.ok(BOROUGHS.includes(r.borough), `borough: ${r.name}`);
    assert.match(r.zip, ZIP, `zip: ${r.name}`);
    assert.equal(typeof r.lat, "number");
    assert.equal(typeof r.lon, "number");
    assert.ok(Number.isFinite(r.lat) && Number.isFinite(r.lon), `coordinates: ${r.name}`);
    assert.ok(r.lat > 40.48 && r.lat < 40.93 && r.lon > -74.27 && r.lon < -73.68, `inside NYC: ${r.name} ${r.address}`);
    if (r.phone != null) assert.equal(typeof r.phone, "string");
    if (r.website != null) assert.equal(typeof r.website, "string");
    if (r.source != null) assert.ok(SOURCES.includes(r.source), `source: ${r.name} ${r.source}`);
    if (r.verification != null) {
      assert.ok(r.source, `verification without source: ${r.name}`);
      assert.ok(VERIFICATIONS.includes(r.verification), `verification: ${r.name} ${r.verification}`);
    }
  }
});

test("USDA rows are unverified and earlier rows are unchanged", () => {
  assert.equal(restaurants.length, 333);
  assert.equal(restaurants[0].name, "109 Pizzeria");
  assert.equal(restaurants[234].name, "Yummy Thai");
  assert.equal(restaurants[124].name, "McDonald's");
  assert.equal(restaurants[124].address, "204-11 Hillside Avenue");
  assert.equal(restaurants[161].name, "McDonald's");
  assert.equal(restaurants[161].address, "204-11 Hillside Avenue");
  assert.equal(restaurants[124].lat, restaurants[161].lat);
  assert.equal(restaurants[124].lon, restaurants[161].lon);
  const added = restaurants.slice(235);
  assert.equal(added.length, 98);
  for (const r of restaurants.slice(0, 235)) {
    assert.equal(r.source, undefined, r.name);
    assert.equal(r.verification, undefined, r.name);
  }
  for (const r of added) {
    assert.equal(r.source, "USDA", r.name);
    assert.equal(r.verification, "unverified", r.name);
  }
});
