import { NextResponse } from "next/server";

export async function GET() {
  // Mock analytics data for now
  const mockAnalytics = {
    events: {
      total: 12,
      active: 3,
      completed: 8,
      upcoming: 1
    },
    participants: {
      total: 1250,
      activeToday: 85,
      newThisWeek: 156
    },
    submissions: {
      total: 89,
      pending: 12,
      evaluated: 77
    },
    engagement: {
      avgSessionTime: "24m",
      dailyActiveUsers: 320,
      submissions: [
        { date: "2025-08-25", count: 12 },
        { date: "2025-08-24", count: 8 },
        { date: "2025-08-23", count: 15 }
      ]
    }
  };

  return NextResponse.json(mockAnalytics);
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
