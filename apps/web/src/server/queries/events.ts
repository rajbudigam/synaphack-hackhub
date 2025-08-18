import { prisma } from "@/src/server/db";

export async function listEvents() {
  return prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { tracks: true, rounds: true },
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { tracks: true, rounds: true, teams: true },
  });
}
