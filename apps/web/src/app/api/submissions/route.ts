import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        team: {
          include: {
            members: {
              include: {
                user: { select: { name: true, email: true } }
              }
            }
          }
        },
        event: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const formattedSubmissions = submissions.map(sub => ({
      id: sub.id,
      title: sub.title || 'Untitled Submission',
      description: sub.description || '',
      repoUrl: sub.repoUrl || '',
      liveUrl: sub.liveUrl || '',
      status: sub.status,
      teamId: sub.teamId,
      eventId: sub.eventId,
      submittedAt: sub.submittedAt?.toISOString() || sub.createdAt.toISOString(),
      team: {
        name: sub.team?.name || 'Unknown Team',
        members: sub.team?.members.map(m => ({ 
          name: m.user.name || 'Unknown' 
        })) || []
      },
      event: {
        name: sub.event?.name || 'Unknown Event'
      }
    }));

    return NextResponse.json(formattedSubmissions);
  } catch (error) {
    console.error("Submissions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock submission creation
    const newSubmission = {
      id: Date.now().toString(),
      ...body,
      status: "draft",
      submittedAt: new Date().toISOString()
    };
    
    return NextResponse.json(newSubmission);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
