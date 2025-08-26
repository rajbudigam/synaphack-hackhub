import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["admin", "organizer"]);

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    // Basic counts
    const [events, teams, submissions, users] = await Promise.all([
      prisma.event.findMany({ 
        select: { id: true, name: true, status: true, startsAt: true, endsAt: true }
      }),
      prisma.team.findMany({
        where: eventId ? { eventId } : {},
        select: { id: true, name: true, eventId: true }
      }),
      prisma.submission.findMany({
        where: eventId ? { eventId } : {},
        select: { id: true, title: true, status: true, eventId: true }
      }),
      prisma.user.findMany({
        select: { id: true, name: true, email: true }
      })
    ]);

    // Calculate metrics
    const analytics = {
      events: {
        total: events.length,
        active: events.filter(e => e.status === 'ongoing').length,
        completed: events.filter(e => e.status === 'completed').length
      },
      teams: {
        total: teams.length,
        byEvent: eventId ? teams.filter(t => t.eventId === eventId).length : teams.length
      },
      submissions: {
        total: submissions.length,
        completed: submissions.filter(s => s.status === 'submitted').length,
        byEvent: eventId ? submissions.filter(s => s.eventId === eventId).length : submissions.length
      },
      users: {
        total: users.length
      }
    };

    return NextResponse.json({
      success: true,
      analytics,
      events,
      teams,
      submissions,
      users: users.slice(0, 10) // Limit user data
    });

  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
