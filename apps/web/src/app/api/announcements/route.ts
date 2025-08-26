import { NextResponse } from "next/server";

export async function GET() {
  // Mock announcements data
  const mockAnnouncements = [
    {
      id: "1",
      title: "Welcome to SynapHack 3.0!",
      content: "Get ready for 48 hours of intense coding and innovation. Check-in starts at 9 AM.",
      type: "general",
      priority: "high",
      eventId: "1",
      createdAt: "2025-08-29T08:00:00Z",
      author: {
        name: "Event Organizer",
        avatar: ""
      }
    },
    {
      id: "2",
      title: "Submission Deadline Reminder",
      content: "Final submissions are due by 6 PM tomorrow. Make sure to test your projects!",
      type: "deadline",
      priority: "urgent",
      eventId: "1", 
      createdAt: "2025-08-30T12:00:00Z",
      author: {
        name: "Event Organizer",
        avatar: ""
      }
    },
    {
      id: "3",
      title: "Mentor Office Hours",
      content: "Mentors are available in the lounge for questions and guidance until 10 PM.",
      type: "info",
      priority: "medium",
      eventId: "1",
      createdAt: "2025-08-29T16:00:00Z",
      author: {
        name: "Mentor Coordinator",
        avatar: ""
      }
    }
  ];

  return NextResponse.json(mockAnnouncements);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock announcement creation
    const newAnnouncement = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      author: {
        name: "Event Organizer",
        avatar: ""
      }
    };
    
    return NextResponse.json(newAnnouncement);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}
