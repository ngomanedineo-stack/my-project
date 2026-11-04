import { NextResponse } from "next/server";
import { getElection } from "@/lib/store";
export const dynamic = "force-dynamic";
export async function GET() {
  const e = getElection();
  return NextResponse.json({ ...e, results: e.state === "awaiting" ? [] : [], note: "No official 2026 results are connected. See /data-sources." });
}
