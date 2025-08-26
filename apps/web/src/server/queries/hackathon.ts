import { prisma } from '../db';
import { Event, Team, Submission, Registration } from '@prisma/client';

// Event management functions
export async function createEvent(data: {
  name: string;
  description?: string;
  longDescription?: string;
  mode: 'online' | 'offline' | 'hybrid';
  startsAt: Date;
  endsAt: Date;
  registrationEnds?: Date;
  maxTeamSize?: number;
  minTeamSize?: number;
  maxTeams?: number;
  prizeMoney?: string;
  rules?: string;
  schedule?: string;
  sponsors?: string[];
  mentorsList?: string[];
  tags?: string[];
  coverImage?: string;
  logoImage?: string;
  organizerId: string;
}) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  const { sponsors, ...eventData } = data;
  
  return await prisma.event.create({
    data: {
      ...eventData,
      slug,
      mentorsList: data.mentorsList ? JSON.stringify(data.mentorsList) : null,
      tags: data.tags ? JSON.stringify(data.tags) : null,
      status: 'draft',
      featured: false,
      // Don't include sponsors here - they should be created separately as Sponsor records
    },
  });
}

export async function updateEvent(id: string, data: Partial<Event>) {
  return await prisma.event.update({
    where: { id },
    data,
  });
}

export async function publishEvent(id: string) {
  return await prisma.event.update({
    where: { id },
    data: { status: 'published' },
  });
}

export async function getEventBySlug(slug: string) {
  return await prisma.event.findUnique({
    where: { slug },
    include: {
      tracks: true,
      rounds: {
        orderBy: { order: 'asc' },
      },
      teams: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
          submissions: true,
          _count: {
            select: {
              members: true,
              submissions: true,
            },
          },
        },
      },
      submissions: {
        include: {
          team: {
            include: {
              members: {
                include: {
                  user: true,
                },
              },
            },
          },
          track: true,
          round: true,
          scores: true,
          _count: {
            select: {
              scores: true,
            },
          },
        },
      },
      announcements: {
        orderBy: { createdAt: 'desc' },
        include: {
          event: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      organizers: true,
      judges: true,
      mentors: true,
      _count: {
        select: {
          registrations: true,
          teams: true,
          submissions: true,
        },
      },
    },
  });
}

export async function getAllEvents() {
  return await prisma.event.findMany({
    where: { status: 'published' },
    include: {
      tracks: true,
      rounds: {
        orderBy: { order: 'asc' },
      },
      _count: {
        select: {
          registrations: true,
          teams: true,
          submissions: true,
        },
      },
    },
    orderBy: { startsAt: 'desc' },
  });
}

// Team management functions
export async function createTeam(data: {
  name: string;
  description?: string;
  eventId: string;
  leaderId: string;
}) {
  return await prisma.$transaction(async (tx) => {
    // Create team
    const team = await tx.team.create({
      data: {
        name: data.name,
        description: data.description,
        eventId: data.eventId,
        status: 'active',
      },
    });

    // Add leader as team member
    await tx.teamMember.create({
      data: {
        teamId: team.id,
        userId: data.leaderId,
        role: 'owner',
      },
    });

    return team;
  });
}

export async function joinTeam(teamId: string, userId: string) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      event: true,
      members: true,
    },
  });

  if (!team) {
    throw new Error('Team not found');
  }

  if (team.members.length >= team.event.maxTeamSize) {
    throw new Error('Team is full');
  }

  return await prisma.teamMember.create({
    data: {
      teamId,
      userId,
      role: 'member',
    },
  });
}

export async function leaveTeam(teamId: string, userId: string) {
  return await prisma.teamMember.delete({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });
}

export async function getTeamsByEvent(eventId: string) {
  return await prisma.team.findMany({
    where: { eventId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      submissions: true,
      _count: {
        select: {
          members: true,
          submissions: true,
        },
      },
    },
  });
}

// Submission management functions
export async function createSubmission(data: {
  title: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  presentationUrl?: string;
  techStack?: string[];
  features?: string[];
  challenges?: string;
  accomplishments?: string;
  learnings?: string;
  nextSteps?: string;
  eventId: string;
  teamId: string;
  roundId?: string;
  trackId?: string;
}) {
  return await prisma.submission.create({
    data: {
      ...data,
      techStack: data.techStack ? JSON.stringify(data.techStack) : null,
      features: data.features ? JSON.stringify(data.features) : null,
      status: 'draft',
    },
  });
}

export async function submitSubmission(id: string) {
  return await prisma.submission.update({
    where: { id },
    data: {
      status: 'submitted',
      submittedAt: new Date(),
    },
  });
}

export async function getSubmissionsByEvent(eventId: string) {
  return await prisma.submission.findMany({
    where: { eventId },
    include: {
      team: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
      track: true,
      round: true,
      event: true,
      scores: true,
      _count: {
        select: {
          scores: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Registration functions
export async function registerForEvent(eventId: string, userId: string) {
  return await prisma.registration.create({
    data: {
      eventId,
      userId,
      status: 'pending',
    },
  });
}

export async function approveRegistration(id: string) {
  return await prisma.registration.update({
    where: { id },
    data: { status: 'approved' },
  });
}

export async function getEventRegistrations(eventId: string) {
  return await prisma.registration.findMany({
    where: { eventId },
    include: {
      user: true,
      team: true,
    },
  });
}

// Analytics functions
export async function getEventAnalytics(eventId: string) {
  return await prisma.eventAnalytics.findMany({
    where: { eventId },
    include: {
      event: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { date: 'desc' },
  });
}

export async function updateEventAnalytics(eventId: string, data: {
  registrations?: number;
  teams?: number;
  submissions?: number;
  pageViews?: number;
  uniqueVisitors?: number;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await prisma.eventAnalytics.upsert({
    where: {
      eventId_date: {
        eventId,
        date: today,
      },
    },
    update: data,
    create: {
      eventId,
      date: today,
      registrations: data.registrations || 0,
      teams: data.teams || 0,
      submissions: data.submissions || 0,
      pageViews: data.pageViews || 0,
      uniqueVisitors: data.uniqueVisitors || 0,
    },
  });
}
