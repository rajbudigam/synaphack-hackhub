import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock chat authentication
    const authData = {
      success: true,
      userId: body.userId || "user_123",
      token: `chat_token_${Date.now()}`,
      channels: ["general", "team_1", "announcements"],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    return NextResponse.json(authData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate chat" },
      { status: 500 }
    );
  }
}
