import { judgeBias } from "@/lib/analytics";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const revalidate = 120;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const data = await judgeBias(eventId);
  return NextResponse.json(data);
}
