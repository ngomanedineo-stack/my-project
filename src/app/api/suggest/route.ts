import { NextRequest, NextResponse } from "next/server";
import { suggest } from "@/lib/search";
export async function GET(req: NextRequest) {
  return NextResponse.json({ suggestions: suggest((req.nextUrl.searchParams.get("q") ?? "").slice(0, 100)) });
}
