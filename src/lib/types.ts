export type TrustLevel =
  | "official" | "verified" | "provisional" | "reported"
  | "community" | "historical" | "unavailable" | "demo";

export interface SourceInfo {
  owner: string;
  url?: string;
  period: string;
  lastVerified: string;
  lastIngested?: string;
  method: string;
  limitations: string;
  geography: string;
}

export type ElectionState =
  | "awaiting" | "voting" | "counting" | "provisional"
  | "official" | "council_pending" | "administration_confirmed";

export interface Party { id: string; name: string; short: string; color: string; pattern: string; }

export interface Ward {
  id: string; number: number; municipalityId: string; name: string;
  aliases: string[]; center: [number, number]; // [lon, lat]
  ring: [number, number][];
  boundaryVersion: string;
  councillor: { name: string; partyId: string; since: string };
}

export interface Municipality {
  id: string; name: string; category: "A" | "B"; province: string; district?: string;
  mayor: { name: string; partyId: string };
  governing: { kind: "single" | "coalition"; partyIds: string[]; since: string };
  seats: Record<string, number>;
  wardCount: number;
}

export interface WardResult {
  wardId: string;
  votes: Record<string, number>;
  registered: number;
}
export interface ElectionDef {
  id: string; name: string; date: string; kind: "local" | "national" | "provincial";
  state: ElectionState; reportingProgressPct: Record<string, number>; // wardId -> % voting districts reported
  updatedAt: string;
}
