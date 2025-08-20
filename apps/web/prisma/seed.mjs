// apps/web/prisma/seed.mjs
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const days = (n) => new Date(Date.now() + n * 86_400_000);

// --- helpers (idempotent) ---
async function ensureEvent({ slug, name, description, mode, startsAt, endsAt }) {
  const existing = await prisma.event.findUnique({ where: { slug } });
  if (existing) {
    return prisma.event.update({
      where: { slug },
      data: { name, description, mode, startsAt, endsAt },
    });
  }
  return prisma.event.create({
    data: { slug, name, description, mode, startsAt, endsAt },
  });
}

async function replaceTracks(eventId, trackNames) {
  await prisma.track.deleteMany({ where: { eventId } });
  if (trackNames.length) {
    await prisma.track.createMany({
      data: trackNames.map((name) => ({ name, eventId })),
    });
  }
}

async function ensureRound(eventId, order, startsAt, endsAt) {
  const existing = await prisma.round.findFirst({ where: { eventId, order } });
  if (existing) {
    return prisma.round.update({
      where: { id: existing.id },
      data: { startsAt, endsAt },
    });
  }
  return prisma.round.create({ data: { eventId, order, startsAt, endsAt } });
}

async function ensureTeam(eventId, name, ownerUserId) {
  let team = await prisma.team.findFirst({ where: { eventId, name } });
  if (!team) {
    team = await prisma.team.create({ data: { name, eventId } });
  }
  const existingOwner = await prisma.teamMember.findFirst({
    where: { teamId: team.id, userId: ownerUserId, role: "owner" },
  });
  if (!existingOwner) {
    await prisma.teamMember.create({
      data: { teamId: team.id, userId: ownerUserId, role: "owner" },
    });
  }
  return team;
}

async function ensureSubmission({ title, status, eventId, teamId, roundId }) {
  let sub = await prisma.submission.findFirst({
    where: { eventId, teamId, title },
  });
  if (!sub) {
    sub = await prisma.submission.create({
      data: { title, status, eventId, teamId, roundId },
    });
  }
  return sub;
}

// --- main seed ---
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@hackhub.dev" },
    update: { name: "Alice Organizer" },
    create: { email: "alice@hackhub.dev", name: "Alice Organizer" },
  });

  // SynapHack 3.0
  const e1 = await ensureEvent({
    slug: "synaphack-3",
    name: "SynapHack 3.0",
    description: "Flagship campus + community hackathon.",
    mode: "hybrid",
    startsAt: days(25),
    endsAt: days(27),
  });
  await replaceTracks(e1.id, ["AI", "FinTech", "Open Innovation"]);
  const e1r1 = await ensureRound(e1.id, 1, days(25), days(26));

  // AI Builders Week
  const e2 = await ensureEvent({
    slug: "ai-builders-week",
    name: "AI Builders Week",
    description: "A week-long build sprint for AI products.",
    mode: "online",
    startsAt: days(45),
    endsAt: days(52),
  });
  await replaceTracks(e2.id, ["Agentic Apps", "Infra"]);
  await ensureRound(e2.id, 1, days(45), days(52));

  // Campus Hack NIT
  const e3 = await ensureEvent({
    slug: "campus-hack-nit",
    name: "Campus Hack NIT",
    description: "Onsite student hackathon.",
    mode: "offline",
    startsAt: days(90),
    endsAt: days(92),
  });
  await replaceTracks(e3.id, ["Health", "Sustainability"]);
  await ensureRound(e3.id, 1, days(90), days(92));

  // Team + submission on SynapHack
  const team = await ensureTeam(e1.id, "Team Quantum", alice.id);
  await ensureSubmission({
    title: "Quantum Notes",
    status: "submitted",
    eventId: e1.id,
    teamId: team.id,
    roundId: e1r1?.id ?? null,
  });

  console.log("✅ Seeded:", {
    events: [e1.slug, e2.slug, e3.slug],
    team: team.name,
  });
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}