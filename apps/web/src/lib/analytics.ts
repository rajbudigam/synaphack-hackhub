import { prisma } from "@/lib/prisma";

export type KPI = {
  totalEvents: number;
  totalTeams: number;
  totalParticipants: number;
  totalSubmissions: number;
  avgTeamSize: number | null;
  submissionRate: number; // submissions / participants
};

// one-shot KPIs
export async function fetchKPIs(): Promise<KPI> {
  const [events, teams, participants, submissions, teamSizes] = await Promise.all([
    prisma.event.count(),
    prisma.team.count(),
    prisma.user.count(), // adjust to your participant table if different
    prisma.submission.count(),
    prisma.$queryRaw<{ size: number }[]>`
      SELECT COUNT(*) AS size 
      FROM "TeamMember" 
      GROUP BY "teamId"
    `
  ]);
  
  const avgTeamSize = teamSizes.length > 0 
    ? teamSizes.reduce((sum, t) => sum + t.size, 0) / teamSizes.length 
    : null;
    
  return {
    totalEvents: events,
    totalTeams: teams,
    totalParticipants: participants,
    totalSubmissions: submissions,
    avgTeamSize,
    submissionRate: participants ? submissions / participants : 0
  };
}

// retention (week 0..5) by event - simplified for SQLite
export async function cohortRetention(eventId: string) {
  // For SQLite, we'll use a simpler approach without DATE_TRUNC
  return prisma.$queryRaw<
    { week: number, active: number }[]
  >`
    SELECT 
      0 as week,
      COUNT(DISTINCT "userId") as active
    FROM "AuditLog" 
    WHERE "entityId" = ${eventId}
  `;
}

// judge bias: z-score of each judge's mean score vs global - simplified for SQLite
export async function judgeBias(eventId: string) {
  // Simplified version that works with SQLite
  const scores = await prisma.$queryRaw<
    { judgeId: string, avgScore: number }[]
  >`
    SELECT 
      s."judgeId", 
      AVG(CAST(s."value" AS REAL)) as avgScore
    FROM "Score" s
    INNER JOIN "Submission" sub ON s."submissionId" = sub.id
    WHERE sub."eventId" = ${eventId} 
    GROUP BY s."judgeId"
    ORDER BY avgScore DESC
  `;
  
  // Calculate z-scores in JavaScript since SQLite doesn't have STDDEV_POP
  if (scores.length === 0) return [];
  
  const allScores = scores.map(s => s.avgScore);
  const globalMean = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  const variance = allScores.reduce((sum, score) => sum + Math.pow(score - globalMean, 2), 0) / allScores.length;
  const stdDev = Math.sqrt(variance);
  
  return scores.map(s => ({
    judgeId: s.judgeId,
    mean: s.avgScore,
    z: stdDev > 0 ? (s.avgScore - globalMean) / stdDev : 0
  }));
}
