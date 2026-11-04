// DEMONSTRATION DATA ONLY.
// Parties, people, boundaries and numbers below are fictional / illustrative.
// Replace through the ingestion adapters in src/lib/adapters when official access exists.
import type { Party, Ward, Municipality, ElectionDef, WardResult, SourceInfo } from "@/lib/types";

export const DEMO_SOURCE: SourceInfo = {
  owner: "Mzansi Votes demonstration fixtures",
  period: "n/a (illustrative)",
  lastVerified: "2026-11-04",
  method: "Hand-written example records used to exercise the product. Not collected from any real source.",
  limitations: "Fictional parties, people and figures. Ward polygons are rough boxes, not IEC/MDB boundaries. Do not rely on this for any real decision.",
  geography: "Illustrative areas near real place names",
};

export const parties: Party[] = [
  { id: "p1", name: "Demo Civic Alliance", short: "DCA", color: "#2563EB", pattern: "solid" },
  { id: "p2", name: "Demo Unity Movement", short: "DUM", color: "#D97706", pattern: "stripes" },
  { id: "p3", name: "Demo Progress Party", short: "DPP", color: "#7C3AED", pattern: "dots" },
  { id: "p4", name: "Demo Independent Forum", short: "DIF", color: "#0D9488", pattern: "cross" },
];

const box = (lon: number, lat: number, d = 0.03): [number, number][] =>
  [[lon - d, lat - d], [lon + d, lat - d], [lon + d, lat + d], [lon - d, lat + d], [lon - d, lat - d]];
const BV = "DEMO-illustrative-box";

export const municipalities: Municipality[] = [
  { id: "m-jhb", name: "City of Johannesburg (demo)", category: "A", province: "Gauteng",
    mayor: { name: "Demo Mayor J. Example", partyId: "p1" },
    governing: { kind: "coalition", partyIds: ["p1", "p3"], since: "2021-12-01" },
    seats: { p1: 120, p2: 90, p3: 60, p4: 15 }, wardCount: 3 },
  { id: "m-cpt", name: "City of Cape Town (demo)", category: "A", province: "Western Cape",
    mayor: { name: "Demo Mayor C. Sample", partyId: "p2" },
    governing: { kind: "single", partyIds: ["p2"], since: "2021-11-15" },
    seats: { p1: 70, p2: 130, p3: 25, p4: 10 }, wardCount: 1 },
  { id: "m-eth", name: "eThekwini (demo)", category: "A", province: "KwaZulu-Natal",
    mayor: { name: "Demo Mayor E. Placeholder", partyId: "p3" },
    governing: { kind: "coalition", partyIds: ["p3", "p4"], since: "2021-11-22" },
    seats: { p1: 50, p2: 80, p3: 90, p4: 20 }, wardCount: 1 },
  { id: "m-mid", name: "Midvaal Local Municipality (demo)", category: "B", province: "Gauteng", district: "Sedibeng",
    mayor: { name: "Demo Mayor M. Test", partyId: "p1" },
    governing: { kind: "single", partyIds: ["p1"], since: "2021-11-18" },
    seats: { p1: 20, p2: 8, p3: 4, p4: 2 }, wardCount: 1 },
];

export const wards: Ward[] = [
  { id: "w-jhb-80", number: 80, municipalityId: "m-jhb", name: "Ward 80 – Sandton area", aliases: ["sandton", "sandton city", "johannesburg ward 80"],
    center: [28.057, -26.107], ring: box(28.057, -26.107), boundaryVersion: BV,
    councillor: { name: "Demo Councillor A. Mokoena", partyId: "p1", since: "2021-11-01" } },
  { id: "w-jhb-23", number: 23, municipalityId: "m-jhb", name: "Ward 23 – Soweto area", aliases: ["soweto", "orlando", "diepkloof"],
    center: [27.858, -26.267], ring: box(27.858, -26.267), boundaryVersion: BV,
    councillor: { name: "Demo Councillor B. Dlamini", partyId: "p2", since: "2021-11-01" } },
  { id: "w-jhb-91", number: 91, municipalityId: "m-jhb", name: "Ward 91 – Alexandra area", aliases: ["alexandra", "alex", "alexandra, johannesburg"],
    center: [28.098, -26.103], ring: box(28.098, -26.103, 0.012), boundaryVersion: BV,
    councillor: { name: "Demo Councillor C. Nkosi", partyId: "p3", since: "2021-11-01" } },
  { id: "w-cpt-95", number: 95, municipalityId: "m-cpt", name: "Ward 95 – Khayelitsha area", aliases: ["khayelitsha", "site b", "harare khayelitsha"],
    center: [18.67, -34.04], ring: box(18.67, -34.04), boundaryVersion: BV,
    councillor: { name: "Demo Councillor D. Jacobs", partyId: "p2", since: "2021-11-01" } },
  { id: "w-eth-70", number: 70, municipalityId: "m-eth", name: "Ward 70 – Umlazi area", aliases: ["umlazi", "umlazi township"],
    center: [30.88, -29.97], ring: box(30.88, -29.97), boundaryVersion: BV,
    councillor: { name: "Demo Councillor E. Zulu", partyId: "p3", since: "2021-11-01" } },
  { id: "w-mid-7", number: 7, municipalityId: "m-mid", name: "Ward 7 – Walkerville area", aliases: ["walkerville", "midvaal", "midvaal local municipality"],
    center: [28.0, -26.38], ring: box(28.0, -26.38), boundaryVersion: BV,
    councillor: { name: "Demo Councillor F. Botha", partyId: "p1", since: "2021-11-01" } },
];

export const election2026: ElectionDef = {
  id: "lge-2026", name: "2026 Local Government Elections (demo state)", date: "TBC", kind: "local",
  state: "awaiting", reportingProgressPct: {}, updatedAt: "2026-11-04T06:00:00+02:00",
};
// Admin-editable at runtime: see src/lib/store.ts (reads data/election-state.json if present).

export const results2021: WardResult[] = [
  { wardId: "w-jhb-80", votes: { p1: 6200, p2: 2100, p3: 1500, p4: 400 }, registered: 16000 },
  { wardId: "w-jhb-23", votes: { p1: 1800, p2: 5200, p3: 2300, p4: 300 }, registered: 21000 },
  { wardId: "w-jhb-91", votes: { p1: 1500, p2: 2900, p3: 3300, p4: 500 }, registered: 19000 },
  { wardId: "w-cpt-95", votes: { p1: 1700, p2: 6100, p3: 900, p4: 600 }, registered: 20000 },
  { wardId: "w-eth-70", votes: { p1: 900, p2: 2600, p3: 4800, p4: 1100 }, registered: 18500 },
  { wardId: "w-mid-7", votes: { p1: 4800, p2: 1700, p3: 600, p4: 300 }, registered: 12500 },
];
