import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: teamId } = await params;
    const { userId } = body;
    
    // Mock team join
    const result = {
      success: true,
      teamId,
      userId,
      joinedAt: new Date().toISOString(),
      message: "Successfully joined team"
    };
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to join team" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: teamId } = await params;
    const { userId } = body;
    
    // Mock team leave
    const result = {
      success: true,
      teamId,
      userId,
      leftAt: new Date().toISOString(),
      message: "Successfully left team"
    };
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to leave team" },
      { status: 500 }
    );
  }
}
