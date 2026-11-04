import { NextRequest, NextResponse } from "next/server";
import { searchLocation } from "@/lib/search";
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, 200);
  return NextResponse.json(searchLocation(q), { headers: { "Cache-Control": "public, max-age=60" } });
}
