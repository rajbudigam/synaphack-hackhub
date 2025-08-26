import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Mock single team data
  const mockTeam = {
    id,
    name: "Code Crusaders",
    description: "Building the future with code",
    status: "active",
    eventId: "1",
    leaderId: "user1",
    members: [
      { id: "user1", name: "John Doe", email: "john@example.com", role: "participant" },
      { id: "user2", name: "Jane Smith", email: "jane@example.com", role: "participant" }
    ],
    _count: { members: 2, submissions: 1 }
  };

  return NextResponse.json(mockTeam);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    // Mock team update
    const updatedTeam = {
      id,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedTeam);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}
