import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock message sending
    const sentMessage = {
      id: `msg_${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
      status: "sent",
      delivered: true
    };
    
    // Simulate real-time delivery
    setTimeout(() => {
      // In a real app, this would trigger WebSocket/Pusher events
      console.log("Message delivered to channel:", sentMessage.channelId);
    }, 100);
    
    return NextResponse.json(sentMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
