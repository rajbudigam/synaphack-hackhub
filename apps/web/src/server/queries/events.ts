import { prisma } from "@/server/db";

// Explicit shape the UI expects
export type EventListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mode: string;
  createdAt: Date;
  startsAt: Date;
  endsAt: Date;
  tracks: { id: string; name: string }[]; // <- make it part of the type
  rounds: { id: string; order: number; startsAt: Date; endsAt: Date }[];
};

export type EventFull = EventListItem & {
  teams: { id: string; name: string }[];
};

export async function listEvents(): Promise<EventListItem[]> {
  const rows = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      tracks: { select: { id: true, name: true } }, // <- ensure included
      rounds: { select: { id: true, order: true, startsAt: true, endsAt: true } },
    },
  });

  // rows already match EventListItem shape due to the selects above
  return rows as unknown as EventListItem[];
}

export async function getEventBySlug(slug: string): Promise<EventFull | null> {
  const row = await prisma.event.findUnique({
    where: { slug },
    include: {
      tracks: { select: { id: true, name: true } },
      rounds: { select: { id: true, order: true, startsAt: true, endsAt: true } },
      teams:  { select: { id: true, name: true } },
    },
  });

  return (row as unknown as EventFull) ?? null;
}
