import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeMetrics, classify } from "@/lib/plagiarism";

export const runtime = "nodejs"; // Prisma needs Node (not Edge) per docs
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { submissionId } = await req.json();
  if (!submissionId) return NextResponse.json({ error: "submissionId required" }, { status: 400 });

  // Load the target + peers in same event (adjust field names to your schema)
  const sub = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!sub) return NextResponse.json({ error: "submission not found" }, { status: 404 });

  const peers = await prisma.submission.findMany({
    where: { eventId: sub.eventId, NOT: { id: sub.id } },
    select: { id: true, content: true, code: true }
  });

  const targetText = [sub.content ?? "", sub.code ?? ""].join("\n");
  let maxCos = 0, minHam = 64, maxJac = 0;
  const rows = [];

  for (const p of peers) {
    const other = [p.content ?? "", p.code ?? ""].join("\n");
    const m = computeMetrics(targetText, other);
    maxCos = Math.max(maxCos, m.cosine);
    minHam = Math.min(minHam, m.hamming);
    maxJac = Math.max(maxJac, m.jaccard);
    rows.push({
      otherSubmissionId: p.id,
      cosine: m.cosine,
      hamming: m.hamming,
      jaccard: m.jaccard,
      overlapPercent: m.overlapPercent,
      snippetA: m.snippetA.slice(0, 280),
      snippetB: m.snippetB.slice(0, 280),
      risk: classify(m)
    });
  }

  const summary = rows.length
    ? `Top cosine ${(maxCos*100).toFixed(1)}%, min hamming ${minHam}, top jaccard ${(maxJac*100).toFixed(1)}%`
    : "no peers to compare";

  // upsert report
  const report = await prisma.plagiarismReport.upsert({
    where: { submissionId: sub.id },
    update: { summary, maxCosine: maxCos, minHamming: minHam, maxJaccard: maxJac },
    create: {
      submissionId: sub.id,
      summary, maxCosine: maxCos, minHamming: minHam, maxJaccard: maxJac
    }
  });

  // replace matches
  await prisma.plagiarismMatch.deleteMany({ where: { reportId: report.id } });
  await prisma.$transaction(
    rows.sort((a,b)=> (b.cosine + b.jaccard) - (a.cosine + a.jaccard))
        .slice(0, 25) // keep top 25
        .map(r => prisma.plagiarismMatch.create({ data: { ...r, reportId: report.id }}))
  );

  return NextResponse.json({ ok: true, reportId: report.id });
}
