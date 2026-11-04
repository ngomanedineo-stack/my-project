import fs from "node:fs";
import path from "node:path";
import { election2026 } from "@/data/demo";
import type { ElectionDef, ElectionState } from "./types";

const FILE = path.join(process.cwd(), "data", "election-state.json");
export const STATES: ElectionState[] = ["awaiting","voting","counting","provisional","official","council_pending","administration_confirmed"];

/** Election state is read at request time so it can change without a frontend rebuild. */
export function getElection(): ElectionDef {
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<ElectionDef>;
    const state = STATES.includes(raw.state as ElectionState) ? (raw.state as ElectionState) : election2026.state;
    return { ...election2026, ...raw, state };
  } catch { return election2026; }
}
