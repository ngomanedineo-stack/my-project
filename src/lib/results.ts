import { parties, results2021, wards, municipalities } from "@/data/demo";
export const partyById = (id: string) => parties.find((p) => p.id === id)!;
export const wardById = (id: string) => wards.find((w) => w.id === id);
export const munById = (id: string) => municipalities.find((m) => m.id === id)!;

export function summarise(votes: Record<string, number>, registered: number) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const rows = Object.entries(votes).map(([partyId, v]) => ({ partyId, votes: v, pct: total ? (v / total) * 100 : 0 }))
    .sort((a, b) => b.votes - a.votes);
  return { total, rows, turnoutPct: registered ? (total / registered) * 100 : 0 };
}
export const historicalWard = (wardId: string) => results2021.find((r) => r.wardId === wardId);
/** Seat share of the council; a plurality of seats is NOT a governing majority. */
export function councilMajority(seats: Record<string, number>) {
  const total = Object.values(seats).reduce((a, b) => a + b, 0);
  return { total, needed: Math.floor(total / 2) + 1 };
}
