import { z } from "zod";

export const createEventZ = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  maxTeamSize: z.number().int().min(1).max(10).default(4),
  isPublic: z.boolean().default(true)
});

export const createTeamZ = z.object({
  eventId: z.string().cuid(),
  name: z.string().min(2)
});

export const joinTeamZ = z.object({
  teamId: z.string().cuid(),
  inviteCode: z.string().min(6)
});

export const submissionZ = z.object({
  teamId: z.string().cuid(),
  eventId: z.string().cuid(),
  title: z.string().min(3),
  description: z.string().min(20),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional()
});

export const evaluationZ = z.object({
  submissionId: z.string().cuid(),
  score: z.number().int().min(0).max(100),
  comment: z.string().optional()
});
