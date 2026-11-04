import { NextResponse } from "next/server";
import { wardById, munById, historicalWard, summarise } from "@/lib/results";
import { getElection } from "@/lib/store";
import { DEMO_SOURCE } from "@/data/demo";
export async function GET(_: Request, { params }: { params: { wardId: string } }) {
  const ward = wardById(params.wardId);
  if (!ward) return NextResponse.json({ error: "Ward not found" }, { status: 404 });
  const h = historicalWard(ward.id);
  return NextResponse.json({ ward, municipality: munById(ward.municipalityId), election: getElection(),
    history2021: h ? summarise(h.votes, h.registered) : null, trust: "demo", source: DEMO_SOURCE });
}
