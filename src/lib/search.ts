import { wards, municipalities } from "@/data/demo";
import type { Ward } from "./types";

export interface SearchHit {
  ward: Ward; municipalityName: string; province: string;
  confidence: "exact" | "approximate"; reason: string;
}
export interface SearchResult {
  query: string;
  kind: "match" | "ambiguous" | "none" | "address_unverified";
  hits: SearchHit[];
  note?: string;
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9, .\-]/g, " ").replace(/\s+/g, " ").trim();

export function lev(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

export function pointInRing(pt: [number, number], ring: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function hit(w: Ward, confidence: SearchHit["confidence"], reason: string): SearchHit {
  const m = municipalities.find((x) => x.id === w.municipalityId)!;
  return { ward: w, municipalityName: m.name, province: m.province, confidence, reason };
}

export function parseCoords(q: string): [number, number] | null {
  const m = q.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = parseFloat(m[1]), lon = parseFloat(m[2]);
  return lat >= -35 && lat <= -22 && lon >= 16 && lon <= 33 ? [lon, lat] : null;
}

export function locateByPoint(pt: [number, number]): SearchResult {
  const found = wards.filter((w) => pointInRing(pt, w.ring));
  if (!found.length) return { query: pt.join(","), kind: "none", hits: [],
    note: "No ward in the current dataset contains this point. Coverage is limited while official boundary data is not yet connected." };
  return { query: pt.join(","), kind: found.length === 1 ? "match" : "ambiguous",
    hits: found.map((w) => hit(w, "exact", "Point lies inside this ward polygon (demo boundary).")) };
}

export function searchLocation(q: string): SearchResult {
  const query = norm(q);
  if (!query) return { query: q, kind: "none", hits: [] };

  const pt = parseCoords(query);
  if (pt) return locateByPoint(pt);

  const num = query.match(/ward\s*(\d{1,3})/);
  const hits = new Map<string, SearchHit>();

  for (const w of wards) {
    const m = municipalities.find((x) => x.id === w.municipalityId)!;
    const names = [...w.aliases, norm(w.name), norm(m.name), norm(m.name.replace(/\(demo\)/, ""))];
    if (num && Number(num[1]) === w.number) {
      const rest = query.replace(/ward\s*\d+/, "").trim();
      if (!rest || names.some((n) => n.includes(rest) || rest.includes(n.split(" ")[0])))
        hits.set(w.id, hit(w, "exact", "Ward number matched."));
      continue;
    }
    for (const n of names) {
      if (n === query || query.includes(n) || (query.length >= 4 && n.includes(query))) {
        hits.set(w.id, hit(w, n === query ? "exact" : "approximate", `Matched place name “${n}”.`)); break;
      }
      // spelling correction on each alias (<=2 edits for names >=5 chars)
      const head = query.split(",")[0];
      if (head.length >= 5 && lev(head, n) <= 2) { hits.set(w.id, hit(w, "approximate", `Did you mean “${n}”?`)); break; }
    }
  }
  const list = [...hits.values()];
  // A leading street number suggests a street address, which this dataset cannot resolve.
  if (/^\d+\s+[a-z]/.test(query) && !list.length)
    return { query: q, kind: "address_unverified", hits: [],
      note: "Street-address geocoding is not connected yet. Pick your area on the map or search a suburb or township." };
  if (!list.length) return { query: q, kind: "none", hits: [] };
  const allExact = list.length === 1 && list[0].confidence === "exact";
  return { query: q, kind: allExact ? "match" : "ambiguous", hits: list,
    note: allExact ? undefined : "Please confirm which ward is yours — we don't guess." };
}

export function suggest(q: string, limit = 6): string[] {
  const n = norm(q);
  if (n.length < 2) return [];
  const pool = new Set<string>();
  for (const w of wards) { w.aliases.forEach((a) => pool.add(a)); pool.add(w.name); }
  municipalities.forEach((m) => pool.add(m.name));
  return [...pool].filter((p) => norm(p).includes(n) || lev(n, norm(p).slice(0, n.length)) <= 1).slice(0, limit);
}
