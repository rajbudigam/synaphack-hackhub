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
  const [events, teams, participants, submissions, avgSize] = await Promise.all([
    prisma.event.count(),
    prisma.team.count(),
    prisma.user.count(), // adjust to your participant table if different
    prisma.submission.count(),
    prisma.$queryRaw<{ avg: number }[]>`SELECT AVG(size)::float AS avg FROM (SELECT COUNT(*) AS size FROM "TeamMember" GROUP BY "teamId") s`
  ]);
  return {
    totalEvents: events,
    totalTeams: teams,
    totalParticipants: participants,
    totalSubmissions: submissions,
    avgTeamSize: avgSize[0]?.avg ?? null,
    submissionRate: participants ? submissions / participants : 0
  };
}

// retention (week 0..5) by event
export async function cohortRetention(eventId: string) {
  return prisma.$queryRaw<
    { week: number, active: number }[]
  >`
    WITH acts AS (
      SELECT "userId", DATE_TRUNC('week', "createdAt") AS wk
      FROM "AuditLog" WHERE "entityId" = ${eventId}
    ),
    base AS (
      SELECT MIN(wk) AS start FROM acts
    )
    SELECT EXTRACT(WEEK FROM wk - (SELECT start FROM base))::int AS week,
           COUNT(DISTINCT "userId") AS active
    FROM acts
    GROUP BY 1
    ORDER BY 1;
  `;
}

// judge bias: z-score of each judge's mean score vs global
export async function judgeBias(eventId: string) {
  return prisma.$queryRaw<
    { judgeId: string, mean: number, z: number }[]
  >`
    WITH s AS (
      SELECT "judgeId", AVG("value")::float AS mean
      FROM "Score" s
      INNER JOIN "Submission" sub ON s."submissionId" = sub.id
      WHERE sub."eventId" = ${eventId} GROUP BY "judgeId"
    ), g AS (
      SELECT AVG("value")::float AS gmean, STDDEV_POP("value")::float AS gstd
      FROM "Score" s
      INNER JOIN "Submission" sub ON s."submissionId" = sub.id
      WHERE sub."eventId" = ${eventId}
    )
    SELECT s."judgeId", s.mean, (s.mean - g.gmean)/NULLIF(g.gstd,0) AS z
    FROM s CROSS JOIN g
    ORDER BY ABS(z) DESC;
  `;
}
