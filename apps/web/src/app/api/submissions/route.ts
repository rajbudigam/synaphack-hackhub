import { NextResponse } from "next/server";

export async function GET() {
  // Mock submissions data
  const mockSubmissions = [
    {
      id: "1",
      title: "Smart City Dashboard",
      description: "Real-time analytics for urban management",
      repoUrl: "https://github.com/team1/smart-city",
      liveUrl: "https://smart-city-demo.vercel.app",
      status: "submitted",
      teamId: "1",
      eventId: "1",
      submittedAt: "2025-08-30T14:30:00Z",
      team: {
        name: "Code Crusaders",
        members: [{ name: "John Doe" }, { name: "Jane Smith" }]
      }
    },
    {
      id: "2",
      title: "AI Writing Assistant", 
      description: "Intelligent writing companion with ML",
      repoUrl: "https://github.com/team2/ai-writer",
      liveUrl: "https://ai-writer.vercel.app",
      status: "draft",
      teamId: "2",
      eventId: "1",
      team: {
        name: "AI Innovators",
        members: [{ name: "Alice Johnson" }, { name: "Bob Wilson" }]
      }
    }
  ];

  return NextResponse.json(mockSubmissions);
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
