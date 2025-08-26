import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Mock single event data
  const mockEvent = {
    id,
  title: "HackHub 3.0",
    description: "The ultimate 48-hour hackathon",
    status: "active",
    startDate: "2025-08-29T09:00:00Z",
    endDate: "2025-08-31T18:00:00Z",
    location: "TechHub Innovation Center",
    maxTeamSize: 5,
    prizes: ["$50,000 Grand Prize", "$20,000 Runner-up", "$10,000 People's Choice"],
    tracks: ["AI/ML", "Web3", "Fintech", "Healthcare"],
    _count: {
      registrations: 180,
      teams: 45,
      submissions: 23
    }
  };

  return NextResponse.json(mockEvent);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    // Mock event update
    const updatedEvent = {
      id,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Mock event deletion
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
