// Core data types for the hackathon platform

export interface Event {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mode: string;
  createdAt: Date;
  startsAt: Date;
  endsAt: Date;
  startDate?: string; // For backward compatibility
  endDate?: string; // For backward compatibility
  status?: string;
  registrationDeadline?: Date;
  maxTeamSize?: number;
  maxTeams?: number;
  tracks: Track[];
  rounds: Round[];
  teams?: Team[];
  submissions?: Submission[];
  registrations?: Registration[];
}

export interface Track {
  id: string;
  name: string;
  eventId?: string;
}

export interface Round {
  id: string;
  order: number;
  startsAt: Date;
  endsAt: Date;
  eventId?: string;
}

export interface Team {
  id: string;
  name: string;
  eventId: string;
  members?: TeamMember[];
  submissions?: Submission[];
  registrations?: Registration[];
}

export interface TeamMember {
  id: string;
  role: string;
  userId: string;
  teamId: string;
  user?: User;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface Submission {
  id: string;
  title: string;
  repoUrl: string | null;
  videoUrl: string | null;
  status: string;
  eventId: string;
  teamId: string;
  roundId: string | null;
  createdAt: Date;
  team?: Team;
  event?: Event;
  round?: Round;
  scores?: Score[];
}

export interface Score {
  id: string;
  value: number;
  comment: string | null;
  submissionId: string;
  judgeId: string;
  roundId: string | null;
  createdAt: Date;
}

export interface Registration {
  id: string;
  status: string;
  eventId: string;
  userId: string | null;
  teamId: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  eventId: string | null;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  type: string;
  recipientName: string;
  recipientEmail: string;
  eventId: string;
  teamId: string | null;
  issueDate: Date;
  certificateUrl: string | null;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  tier: string;
  eventId: string | null;
}

// Analytics types
export interface EventStats {
  totalParticipants: number;
  totalTeams: number;
  totalSubmissions: number;
  activeEvents: number;
  upcomingEvents: number;
}

// Dashboard data types
export interface DashboardData {
  events: Event[];
  teams: Team[];
  announcements: Announcement[];
  stats: EventStats;
}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface EventFormData {
  name: string;
  description: string;
  mode: 'online' | 'offline' | 'hybrid';
  startsAt: Date;
  endsAt: Date;
  registrationDeadline: Date;
  maxTeamSize: number;
  maxTeams: number;
  tracks: string[];
}

export interface TeamFormData {
  name: string;
  eventId: string;
}

export interface SubmissionFormData {
  title: string;
  repoUrl: string;
  videoUrl?: string;
  teamId: string;
  eventId: string;
  roundId?: string;
}
