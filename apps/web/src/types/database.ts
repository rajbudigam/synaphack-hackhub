// Core domain types matching Prisma schema exactly
export interface Event {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  longDescription: string | null;
  mode: string;
  startsAt: Date;
  endsAt: Date;
  registrationEnds: Date | null;
  maxTeamSize: number;
  minTeamSize: number;
  maxTeams: number | null;
  prizeMoney: string | null;
  rules: string | null;
  schedule: string | null;
  sponsors: string | null;
  mentorsList: string | null;
  tags: string | null;
  coverImage: string | null;
  logoImage: string | null;
  status: string;
  featured: boolean;
  createdAt: Date;
}

export interface Track {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  prizes: string | null;
  eventId: string;
}

export interface Round {
  id: string;
  name: string;
  description: string | null;
  order: number;
  startsAt: Date;
  endsAt: Date;
  maxScore: number;
  eventId: string;
}

export interface Team {
  id: string;
  name: string;
  description: string | null;
  avatar: string | null;
  repositoryUrl: string | null;
  videoUrl: string | null;
  presentationUrl: string | null;
  websiteUrl: string | null;
  status: string;
  createdAt: Date;
  eventId: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
  skills: string | null;
  role: string;
  createdAt: Date;
}

export interface TeamMember {
  id: string;
  role: string;
  joinedAt: Date;
  userId: string;
  teamId: string;
}

export interface Submission {
  id: string;
  title: string;
  description: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  videoUrl: string | null;
  presentationUrl: string | null;
  techStack: string | null;
  features: string | null;
  challenges: string | null;
  accomplishments: string | null;
  learnings: string | null;
  nextSteps: string | null;
  status: string;
  submittedAt: Date | null;
  createdAt: Date;
  eventId: string;
  teamId: string;
  roundId: string | null;
  trackId: string | null;
}

export interface Score {
  id: string;
  value: number;
  maxValue: number;
  comment: string | null;
  criterion: string | null;
  createdAt: Date;
  submissionId: string;
  judgeId: string;
  roundId: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  channels: string | null;
  scheduled: boolean;
  publishAt: Date | null;
  published: boolean;
  createdAt: Date;
  eventId: string;
  authorId: string;
}

export interface EventAnalytics {
  id: string;
  date: Date;
  registrations: number;
  teams: number;
  submissions: number;
  pageViews: number;
  uniqueVisitors: number;
  eventId: string;
}

export interface Analytics {
  id: string;
  metric: string;
  value: number;
  dimension: string | null;
  timestamp: Date;
  metadata: string | null;
}

// Types with related data that match database queries
export interface EventWithRelations extends Event {
  tracks: Track[];
  rounds: Round[];
  teams: Team[];
  registrations: TeamMember[];
  submissions: Submission[];
  announcements: Announcement[];
  _count: {
    registrations: number;
    teams: number;
    submissions: number;
  };
}

export interface TeamWithMembers extends Team {
  members: (TeamMember & {
    user: User;
  })[];
  submissions: Submission[];
  _count: {
    members: number;
    submissions: number;
  };
}

export interface SubmissionWithRelations extends Submission {
  team: TeamWithMembers;
  track?: Track | null;
  round?: Round | null;
  event?: Event;
  scores?: Score[];
  _count?: {
    scores: number;
  };
}

export interface AnnouncementWithRelations extends Announcement {
  event: {
    name: string;
    slug: string;
  };
}

export interface EventAnalyticsWithEvent extends EventAnalytics {
  event: {
    name: string;
    slug: string;
  };
}
