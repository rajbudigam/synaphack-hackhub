import { prisma } from "@/server/db";
import type { Event, Track, Round, Team } from "@prisma/client";

export type EventListItem = Event & {
  tracks: Track[];
  rounds: Round[];
};

export type EventFull = Event & {
  tracks: Track[];
  rounds: Round[];
  teams: Team[];
};

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
