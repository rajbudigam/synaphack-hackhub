import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["admin", "organizer"]);

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const [
      totalTeams,
      totalSubmissions,
      totalParticipants,
      event
    ] = await Promise.all([
      prisma.team.count({ where: { eventId } }),
      prisma.submission.count({ where: { eventId } }),
      prisma.user.count(),
      prisma.event.findUnique({
        where: { id: eventId },
        select: {
          name: true,
          status: true,
          startsAt: true,
          endsAt: true
        }
      })
    ]);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Get teams for timeline
    const teams = await prisma.team.findMany({
      where: { eventId },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    const teamsByDate: Record<string, number> = {};
    teams.forEach(team => {
      const date = team.createdAt.toISOString().split('T')[0];
      teamsByDate[date] = (teamsByDate[date] || 0) + 1;
    });

    const registrationTimeline = Object.entries(teamsByDate).map(([date, count]) => ({
      date,
      count
    }));

    // Get submissions for timeline
    const submissions = await prisma.submission.findMany({
      where: { eventId },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    const submissionsByDate: Record<string, number> = {};
    submissions.forEach(submission => {
      const date = submission.createdAt.toISOString().split('T')[0];
      submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
    });

    const submissionTimeline = Object.entries(submissionsByDate).map(([date, count]) => ({
      date,
      count
    }));

    // Get status distributions manually
    const teamStatusData = await prisma.team.findMany({
      where: { eventId },
      select: { status: true }
    });

    const teamStatusCounts: Record<string, number> = {};
    teamStatusData.forEach(team => {
      teamStatusCounts[team.status] = (teamStatusCounts[team.status] || 0) + 1;
    });

    const submissionStatusData = await prisma.submission.findMany({
      where: { eventId },
      select: { status: true }
    });

    const submissionStatusCounts: Record<string, number> = {};
    submissionStatusData.forEach(submission => {
      submissionStatusCounts[submission.status] = (submissionStatusCounts[submission.status] || 0) + 1;
    });

    return NextResponse.json({
      event: {
        name: event.name,
        status: event.status,
        startDate: event.startsAt,
        endDate: event.endsAt
      },
      metrics: {
        totalTeams,
        totalSubmissions,
        totalParticipants,
        submissionRate: totalTeams > 0 ? Math.round((totalSubmissions / totalTeams) * 100) : 0
      },
      timelines: {
        registrations: registrationTimeline,
        submissions: submissionTimeline
      },
      distributions: {
        teamStatus: Object.entries(teamStatusCounts).map(([status, count]) => ({
          status,
          count
        })),
        submissionStatus: Object.entries(submissionStatusCounts).map(([status, count]) => ({
          status,
          count
        }))
      }
    });

  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
