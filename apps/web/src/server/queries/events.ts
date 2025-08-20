import { prisma } from "@/server/db";

// Inferred types from the actual Prisma calls — no direct model type imports needed
export type EventListItem =
  Awaited<ReturnType<typeof prisma.event.findMany>>[number];

export type EventFull =
  NonNullable<Awaited<ReturnType<typeof prisma.event.findUnique>>>;

export async function listEvents(): Promise<EventListItem[]> {
  return prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { tracks: true, rounds: true },
  });
}

export async function getEventBySlug(
  slug: string
): Promise<EventFull | null> {
  return prisma.event.findUnique({
    where: { slug },
    include: { tracks: true, rounds: true, teams: true },
  });
}
