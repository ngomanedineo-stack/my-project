import type { SourceInfo } from "../types";

/** Every external dataset is wrapped by an adapter. Adapters never fabricate: if access is not configured they report "not_connected". */
export interface DataAdapter<T> {
  id: string;
  source: Omit<SourceInfo, "lastVerified" | "lastIngested">;
  status(): "not_connected" | "connected" | "error";
  fetch(): Promise<{ data: T; source: SourceInfo }>;
}

export class NotConnectedAdapter<T> implements DataAdapter<T> {
  constructor(public id: string, public source: DataAdapter<T>["source"]) {}
  status() { return "not_connected" as const; }
  async fetch(): Promise<never> { throw new Error(`Adapter ${this.id} has no credentials/access configured`); }
}

export const adapters = [
  new NotConnectedAdapter("iec-results", { owner: "Electoral Commission of South Africa", url: "https://www.elections.org.za", period: "per election", method: "Official results feed (access TBC)", limitations: "Access not yet established", geography: "National → voting district" }),
  new NotConnectedAdapter("mdb-wards", { owner: "Municipal Demarcation Board / IEC", url: "https://www.demarcation.org.za", period: "per boundary version", method: "Ward polygons into PostGIS", limitations: "Access not yet established", geography: "National" }),
  new NotConnectedAdapter("treasury-municipal-money", { owner: "National Treasury", url: "https://municipalmoney.gov.za", period: "annual/quarterly", method: "Public API", limitations: "Access not yet established", geography: "Municipality" }),
];
