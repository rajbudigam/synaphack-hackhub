import { NextResponse } from "next/server";

export async function GET() {
  // Mock chat messages
  const mockMessages = [
    {
      id: "msg_1",
      channelId: "general",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "",
      content: "Hey everyone! Excited to be part of SynapHack 3.0!",
      timestamp: "2025-08-29T10:00:00Z",
      type: "text"
    },
    {
      id: "msg_2",
      channelId: "general", 
      userId: "user2",
      userName: "Jane Smith",
      userAvatar: "",
      content: "Looking for a frontend developer to join our team!",
      timestamp: "2025-08-29T10:15:00Z",
      type: "text"
    },
    {
      id: "msg_3",
      channelId: "team_1",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "",
      content: "Great progress on the dashboard component!",
      timestamp: "2025-08-29T11:30:00Z",
      type: "text"
    }
  ];

  return NextResponse.json(mockMessages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock message creation
    const newMessage = {
      id: `msg_${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
      type: "text"
    };
    
    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
