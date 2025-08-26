import { NextResponse } from "next/server";

export async function GET() {
  // Mock teams data
  const mockTeams = [
    {
      id: "1",
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
    },
    {
      id: "2",
      name: "AI Innovators", 
      description: "Innovating with artificial intelligence",
      status: "active",
      eventId: "1",
      leaderId: "user3",
      members: [
        { id: "user3", name: "Alice Johnson", email: "alice@example.com", role: "participant" },
        { id: "user4", name: "Bob Wilson", email: "bob@example.com", role: "participant" }
      ],
      _count: { members: 2, submissions: 0 }
    }
  ];

  return NextResponse.json(mockTeams);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock team creation
    const newTeam = {
      id: Date.now().toString(),
      ...body,
      status: "active",
      members: [],
      _count: { members: 0, submissions: 0 }
    };
    
    return NextResponse.json(newTeam);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
