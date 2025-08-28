import { fetchKPIs } from "@/lib/analytics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // Prevent build-time execution

export async function GET() {
  try {
    const data = await fetchKPIs();
    return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=600" }});
  } catch (error) {
    console.error("KPI fetch error:", error);
    // Return mock data during build or if database is unavailable
    return NextResponse.json({
      totalEvents: 0,
      totalParticipants: 0,
      totalSubmissions: 0,
      avgTeamSize: 0
    });
  }
}
