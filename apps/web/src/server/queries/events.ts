import { prisma } from "@/server/db";
import type { Prisma } from "@prisma/client";

// Types for the shapes you're returning
export type EventListItem = Prisma.EventGetPayload<{
  include: { tracks: true; rounds: true }
}>;

export type EventFull = Prisma.EventGetPayload<{
  include: { tracks: true; rounds: true; teams: true }
}>;

export async function listEvents(): Promise<EventListItem[]> {
  return prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { tracks: true, rounds: true },
  });
}

export async function getEventBySlug(slug: string): Promise<EventFull | null> {
  return prisma.event.findUnique({
    where: { slug },
    include: { tracks: true, rounds: true, teams: true },
  });
}