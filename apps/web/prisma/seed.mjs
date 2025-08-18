import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const days = (n) => new Date(Date.now() + n * 86400000);

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@hackhub.dev" },
    update: {},
    create: { email: "alice@hackhub.dev", name: "Alice Organizer" },
  });

  const [synap, aiw, campus] = await prisma.$transaction([
    prisma.event.create({
      data: {
        slug: "synaphack-3",
        name: "SynapHack 3.0",
        description: "Flagship campus + community hackathon.",
        mode: "hybrid",
        startsAt: days(25),
        endsAt: days(27),
        tracks: { create: [{ name: "AI" }, { name: "FinTech" }, { name: "Open Innovation" }] },
        rounds: { create: [{ order: 1, startsAt: days(25), endsAt: days(26) }] },
      },
    }),
    prisma.event.create({
      data: {
        slug: "ai-builders-week",
        name: "AI Builders Week",
        description: "A week-long build sprint for AI products.",
        mode: "online",
        startsAt: days(45),
        endsAt: days(52),
        tracks: { create: [{ name: "Agentic Apps" }, { name: "Infra" }] },
        rounds: { create: [{ order: 1, startsAt: days(45), endsAt: days(52) }] },
      },
    }),
    prisma.event.create({
      data: {
        slug: "campus-hack-nit",
        name: "Campus Hack NIT",
        description: "Onsite student hackathon.",
        mode: "offline",
        startsAt: days(90),
        endsAt: days(92),
        tracks: { create: [{ name: "Health" }, { name: "Sustainability" }] },
        rounds: { create: [{ order: 1, startsAt: days(90), endsAt: days(92) }] },
      },
    }),
  ]);

  const team = await prisma.team.create({
    data: {
      name: "Team Quantum",
      eventId: synap.id,
      members: { create: [{ userId: alice.id, role: "owner" }] },
    },
  });

  await prisma.submission.create({
    data: {
      title: "Quantum Notes",
      status: "submitted",
      eventId: synap.id,
      teamId: team.id,
      roundId: (await prisma.round.findFirst({ where: { eventId: synap.id, order: 1 } }))?.id,
    },
  });

  console.log("Seeded:", { events: [synap.slug, aiw.slug, campus.slug], team: team.name });
}

await main().finally(() => prisma.$disconnect());