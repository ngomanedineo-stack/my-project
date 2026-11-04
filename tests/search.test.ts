import test from "node:test";
import assert from "node:assert/strict";
import { searchLocation, locateByPoint, lev } from "../src/lib/search";

test("exact place name resolves to one ward", () => {
  const r = searchLocation("Soweto");
  assert.equal(r.kind, "match"); assert.equal(r.hits[0].ward.id, "w-jhb-23");
});
test("spelling correction is approximate and needs confirmation", () => {
  const r = searchLocation("Khayelitsa");
  assert.equal(r.kind, "ambiguous"); assert.equal(r.hits[0].ward.id, "w-cpt-95");
});
test("ward number search", () => {
  assert.equal(searchLocation("Johannesburg Ward 80").hits[0].ward.id, "w-jhb-80");
});
test("broad municipality search lists several wards", () => {
  assert.ok(searchLocation("City of Johannesburg").hits.length >= 3);
});
test("street address is never guessed", () => {
  assert.equal(searchLocation("12 Main Street").kind, "address_unverified");
});
test("coordinates use point in polygon", () => {
  assert.equal(locateByPoint([28.057, -26.107]).hits[0].ward.id, "w-jhb-80");
  assert.equal(locateByPoint([20, -30]).kind, "none");
});
test("levenshtein", () => assert.equal(lev("abc", "abd"), 1));
