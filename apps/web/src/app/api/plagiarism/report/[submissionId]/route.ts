import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  const { submissionId } = await params;
  const report = await prisma.plagiarismReport.findUnique({
    where: { submissionId },
    include: { matches: { orderBy: [{ risk: 'desc' }, { cosine: 'desc' }] } }
  });
  if (!report) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(report);
}
