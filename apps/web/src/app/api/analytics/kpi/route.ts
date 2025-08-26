import { fetchKPIs } from "@/lib/analytics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 60; // 60s ISR cache for this route (Next data cache)

export async function GET() {
  const data = await fetchKPIs();
  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=600" }});
}
