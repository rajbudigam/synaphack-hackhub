import { NextResponse } from "next/server";

export async function GET() {
  // Mock events data
  const mockEvents = [
    {
      id: "1",
      title: "SynapHack 3.0",
      description: "The ultimate 48-hour hackathon",
      status: "active",
      startDate: "2025-08-29T09:00:00Z",
      endDate: "2025-08-31T18:00:00Z",
      location: "TechHub Innovation Center",
      maxTeamSize: 5,
      _count: {
        registrations: 180,
        teams: 45,
        submissions: 23
      }
    },
    {
      id: "2", 
      title: "AI Innovation Challenge",
      description: "Build the future with AI",
      status: "upcoming",
      startDate: "2025-09-15T09:00:00Z",
      endDate: "2025-09-17T18:00:00Z",
      location: "Virtual",
      maxTeamSize: 4,
      _count: {
        registrations: 156,
        teams: 32,
        submissions: 0
      }
    }
  ];

  return NextResponse.json(mockEvents);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock event creation
    const newEvent = {
      id: Date.now().toString(),
      ...body,
      status: "upcoming",
      _count: {
        registrations: 0,
        teams: 0,
        submissions: 0
      }
    };
    
    return NextResponse.json(newEvent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
