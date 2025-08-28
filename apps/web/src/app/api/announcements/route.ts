import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        event: { select: { name: true } },
        author: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const formattedAnnouncements = announcements.map(ann => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      type: ann.type || 'general',
      priority: ann.priority || 'medium',
      eventId: ann.eventId,
      createdAt: ann.createdAt.toISOString(),
      author: {
        name: ann.author?.name || 'Event Organizer',
        avatar: ""
      }
    }));

    return NextResponse.json(formattedAnnouncements);
  } catch (error) {
    console.error("Announcements fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newAnnouncement = await prisma.announcement.create({
      data: {
        title: body.title,
        content: body.content,
        type: body.type || 'general',
        priority: body.priority || 'medium',
        eventId: body.eventId,
        authorId: body.authorId || 'admin'
      },
      include: {
        author: { select: { name: true } }
      }
    });
    
    return NextResponse.json({
      id: newAnnouncement.id,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      type: newAnnouncement.type,
      priority: newAnnouncement.priority,
      eventId: newAnnouncement.eventId,
      createdAt: newAnnouncement.createdAt.toISOString(),
      author: {
        name: newAnnouncement.author?.name || 'Event Organizer',
        avatar: ""
      }
    });
  } catch (error) {
    console.error("Announcement creation error:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}
