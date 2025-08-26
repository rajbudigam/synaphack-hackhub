import { cohortRetention } from "@/lib/analytics";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const revalidate = 120;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const data = await cohortRetention(eventId);
  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=1200" }});
}
