import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          include: {
            user: true
          }
        },
        event: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            members: true,
            submissions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
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
      eventId,
      avatar,
      repositoryUrl,
      videoUrl,
      presentationUrl,
      websiteUrl
    } = body;

    // Validate required fields
    if (!name || !description || !eventId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, eventId' },
        { status: 400 }
      );
    }

    // Create the team
    const team = await prisma.team.create({
      data: {
        name,
        description,
        eventId,
        avatar: avatar || null,
        repositoryUrl: repositoryUrl || null,
        videoUrl: videoUrl || null,
        presentationUrl: presentationUrl || null,
        websiteUrl: websiteUrl || null,
        status: 'active'
      },
      include: {
        members: {
          include: {
            user: true
          }
        },
        event: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            members: true,
            submissions: true
          }
        }
      }
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}
