import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: {
            teams: true,
            submissions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      description,
      longDescription,
      slug,
      mode,
      startsAt,
      endsAt,
      registrationEnds,
      maxTeamSize,
      minTeamSize,
      maxTeams,
      prizeMoney,
      rules,
      tags
    } = body;

    // Validate required fields
    if (!name || !description || !startsAt || !endsAt) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, startsAt, endsAt' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug }
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: 'An event with this name already exists' },
        { status: 409 }
      );
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        name,
        description,
        longDescription,
        slug,
        mode: mode || 'hybrid',
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
        registrationEnds: registrationEnds ? new Date(registrationEnds) : null,
        maxTeamSize: maxTeamSize || 4,
        minTeamSize: minTeamSize || 1,
        maxTeams: maxTeams || null,
        prizeMoney,
        rules,
        tags: tags || [],
        status: 'upcoming'
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
