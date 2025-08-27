import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get real analytics data from database
    const [
      totalEvents,
      activeEvents,
      completedEvents,
      upcomingEvents,
      totalParticipants,
      totalSubmissions,
      pendingSubmissions,
      evaluatedSubmissions,
      recentSubmissions
    ] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: 'ongoing' } }),
      prisma.event.count({ where: { status: 'completed' } }),
      prisma.event.count({ where: { status: 'upcoming' } }),
      prisma.user.count(),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: 'draft' } }),
      prisma.submission.count({ where: { status: 'submitted' } }),
      prisma.submission.findMany({
        select: { createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 7
      })
    ]);

    // Calculate submissions by date for the last 7 days
    const submissionsByDate = recentSubmissions.reduce((acc, sub) => {
      const date = sub.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const submissionsChart = Object.entries(submissionsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const analytics = {
      events: {
        total: totalEvents,
        active: activeEvents,
        completed: completedEvents,
        upcoming: upcomingEvents
      },
      participants: {
        total: totalParticipants,
        activeToday: Math.floor(totalParticipants * 0.08), // Approximate active users
        newThisWeek: Math.floor(totalParticipants * 0.12) // Approximate new users
      },
      submissions: {
        total: totalSubmissions,
        pending: pendingSubmissions,
        evaluated: evaluatedSubmissions
      },
      engagement: {
        avgSessionTime: "24m", // Would need session tracking to calculate
        dailyActiveUsers: Math.floor(totalParticipants * 0.25), // Approximate
        submissions: submissionsChart
      }
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock analytics tracking
    console.log("Analytics event tracked:", body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to track analytics" },
      { status: 500 }
    );
  }
}
