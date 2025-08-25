// Enhanced seed.mjs for comprehensive SynapHack 3.0 data
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const days = (n) => new Date(Date.now() + n * 86_400_000);

// --- Enhanced helper functions ---
async function ensureUser({ email, name, role = "participant", skills = [], ...userData }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return prisma.user.update({
      where: { email },
      data: { name, role, skills: JSON.stringify(skills), ...userData },
    });
  }
  return prisma.user.create({
    data: { email, name, role, skills: JSON.stringify(skills), ...userData },
  });
}

async function ensureEvent({ 
  slug, 
  name, 
  description, 
  longDescription,
  mode, 
  startsAt, 
  endsAt,
  registrationEnds,
  maxTeamSize = 4,
  minTeamSize = 1,
  maxTeams,
  prizeMoney,
  rules = [],
  schedule = [],
  sponsors = [],
  mentorsList = [],
  tags = [],
  coverImage,
  logoImage,
  status = "published",
  featured = false
}) {
  const existing = await prisma.event.findUnique({ where: { slug } });
  const eventData = {
    name, 
    description, 
    longDescription,
    mode, 
    startsAt, 
    endsAt,
    registrationEnds,
    maxTeamSize,
    minTeamSize,
    maxTeams,
    prizeMoney,
    rules: JSON.stringify(rules),
    schedule: JSON.stringify(schedule),
    sponsors: JSON.stringify(sponsors),
    mentorsList: JSON.stringify(mentorsList),
    tags: JSON.stringify(tags),
    coverImage,
    logoImage,
    status,
    featured
  };
  
  if (existing) {
    return prisma.event.update({
      where: { slug },
      data: eventData,
    });
  }
  return prisma.event.create({
    data: { slug, ...eventData },
  });
}

async function replaceTracks(eventId, trackData) {
  await prisma.track.deleteMany({ where: { eventId } });
  if (trackData.length) {
    await prisma.track.createMany({
      data: trackData.map((track) => ({ 
        eventId,
        name: track.name,
        description: track.description || null,
        color: track.color || null,
        prizes: track.prizes ? JSON.stringify(track.prizes) : null
      })),
    });
  }
}

async function ensureRound(eventId, name, order, startsAt, endsAt, description, maxScore = 100) {
  const existing = await prisma.round.findFirst({ where: { eventId, order } });
  if (existing) {
    return prisma.round.update({
      where: { id: existing.id },
      data: { name, startsAt, endsAt, description, maxScore },
    });
  }
  return prisma.round.create({ 
    data: { eventId, name, order, startsAt, endsAt, description, maxScore } 
  });
}

async function ensureTeam(eventId, name, description, ownerUserId) {
  let team = await prisma.team.findFirst({ where: { eventId, name } });
  if (!team) {
    team = await prisma.team.create({ data: { name, description, eventId } });
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

async function ensureSubmission({ 
  title, 
  description,
  status, 
  eventId, 
  teamId, 
  roundId,
  trackId,
  repoUrl,
  liveUrl,
  videoUrl,
  presentationUrl,
  techStack = [],
  features = [],
  challenges,
  accomplishments,
  learnings,
  nextSteps
}) {
  let sub = await prisma.submission.findFirst({
    where: { eventId, teamId, title },
  });
  if (!sub) {
    sub = await prisma.submission.create({
      data: { 
        title, 
        description,
        status, 
        eventId, 
        teamId, 
        roundId,
        trackId,
        repoUrl,
        liveUrl,
        videoUrl,
        presentationUrl,
        techStack: JSON.stringify(techStack),
        features: JSON.stringify(features),
        challenges,
        accomplishments,
        learnings,
        nextSteps,
        submittedAt: status === "submitted" ? new Date() : null
      },
    });
  }
  return sub;
}

async function createAnnouncement(eventId, authorId, title, content, type = "general", priority = "normal") {
  return prisma.announcement.create({
    data: {
      eventId,
      authorId,
      title,
      content,
      type,
      priority,
      channels: JSON.stringify(["in-app", "email"]),
      published: true
    }
  });
}

// --- Main seed function ---
async function main() {
  console.log("🌱 Starting comprehensive seed...");

  // Create users with different roles
  const alice = await ensureUser({
    email: "alice@hackhub.dev",
    name: "Alice Thompson",
    role: "organizer",
    bio: "Lead organizer passionate about innovation and technology",
    github: "alice-thompson",
    linkedin: "alice-thompson-organizer",
    skills: ["Event Management", "Community Building", "Strategy"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=150&h=150&fit=crop&crop=face"
  });

  const bob = await ensureUser({
    email: "bob@hackhub.dev", 
    name: "Dr. Bob Wilson",
    role: "judge",
    bio: "Senior Tech Lead and Innovation Expert",
    github: "dr-bob-wilson",
    linkedin: "bob-wilson-tech",
    skills: ["AI/ML", "System Architecture", "Technical Leadership"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const carol = await ensureUser({
    email: "carol@hackhub.dev",
    name: "Carol Martinez",
    role: "mentor", 
    bio: "Startup founder and product strategist",
    github: "carol-martinez",
    linkedin: "carol-martinez-founder",
    skills: ["Product Strategy", "Startup Mentoring", "UX Design"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  });

  const participant1 = await ensureUser({
    email: "alex@student.dev",
    name: "Alex Chen",
    role: "participant",
    bio: "Computer Science student passionate about AI",
    github: "alex-chen-cs",
    skills: ["Python", "React", "Machine Learning"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  });

  const participant2 = await ensureUser({
    email: "maria@student.dev",
    name: "Maria Rodriguez", 
    role: "participant",
    bio: "Full-stack developer and UI/UX enthusiast",
    github: "maria-rodriguez-dev",
    skills: ["JavaScript", "Node.js", "UI/UX Design"],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  });

  const participant3 = await ensureUser({
    email: "david@student.dev",
    name: "David Kim",
    role: "participant",
    bio: "Mobile app developer and blockchain enthusiast",
    github: "david-kim-mobile",
    skills: ["React Native", "Blockchain", "Mobile Development"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  });

  // Create SynapHack 3.0 - The main event
  const e1 = await ensureEvent({
    slug: "synaphack-3",
    name: "SynapHack 3.0",
    description: "The ultimate innovation challenge for the next generation of tech leaders",
    longDescription: `Join us for SynapHack 3.0, where creativity meets technology in the most exciting hackathon of the year! 
    
Build groundbreaking solutions that address real-world challenges across AI, FinTech, Healthcare, and Sustainability. With over $50,000 in prizes and mentorship from industry leaders, this is your chance to make an impact.

What makes SynapHack special:
• 48-hour intensive hackathon with multiple tracks
• Expert mentors from top tech companies  
• Real-time judging and feedback
• Networking with industry professionals
• Guaranteed interviews for top performers`,
    mode: "hybrid",
    startsAt: days(25),
    endsAt: days(27),
    registrationEnds: days(20),
    maxTeamSize: 4,
    minTeamSize: 1,
    maxTeams: 100,
    prizeMoney: "$50,000 total prize pool",
    rules: [
      "Teams can have 1-4 members",
      "All code must be written during the event",
      "Use of external APIs and libraries is allowed",
      "Teams must present their solution to judges",
      "Final submission includes code, demo, and presentation"
    ],
    schedule: [
      { time: "2024-09-12 09:00", title: "Opening Ceremony", description: "Welcome and introduction" },
      { time: "2024-09-12 10:00", title: "Hacking Begins", description: "Start building your solutions" },
      { time: "2024-09-12 12:00", title: "Lunch & Networking", description: "Connect with mentors and teams" },
      { time: "2024-09-12 18:00", title: "Dinner Break", description: "Fuel up for the night ahead" },
      { time: "2024-09-13 08:00", title: "Breakfast", description: "Start day 2 strong" },
      { time: "2024-09-13 12:00", title: "Lunch", description: "Midday refuel" },
      { time: "2024-09-13 16:00", title: "Submission Deadline", description: "Final submissions due" },
      { time: "2024-09-13 17:00", title: "Presentations", description: "Team presentations to judges" },
      { time: "2024-09-13 20:00", title: "Awards Ceremony", description: "Winners announced" }
    ],
    sponsors: [
      { name: "TechCorp", logo: "/sponsors/techcorp.png", tier: "Platinum", url: "https://techcorp.com" },
      { name: "InnovateLabs", logo: "/sponsors/innovate.png", tier: "Gold", url: "https://innovatelabs.com" },
      { name: "StartupHub", logo: "/sponsors/startup.png", tier: "Silver", url: "https://startuphub.com" }
    ],
    mentorsList: [
      { name: "Sarah Johnson", company: "Google", expertise: "AI/ML", image: "/mentors/sarah.jpg" },
      { name: "Mike Chen", company: "Microsoft", expertise: "Cloud Architecture", image: "/mentors/mike.jpg" },
      { name: "Lisa Park", company: "Meta", expertise: "Product Strategy", image: "/mentors/lisa.jpg" }
    ],
    tags: ["AI", "FinTech", "Innovation", "Startup", "Technology"],
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop",
    logoImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    status: "published",
    featured: true
  });

  await replaceTracks(e1.id, [
    {
      name: "AI & Machine Learning",
      description: "Build intelligent solutions using AI, ML, and data science",
      color: "#FF6B6B",
      prizes: { first: "$15,000", second: "$8,000", third: "$3,000" }
    },
    {
      name: "FinTech Innovation", 
      description: "Revolutionize financial services with cutting-edge technology",
      color: "#4ECDC4",
      prizes: { first: "$12,000", second: "$6,000", third: "$2,000" }
    },
    {
      name: "Open Innovation",
      description: "Create solutions that don't fit traditional categories",
      color: "#45B7D1",
      prizes: { first: "$8,000", second: "$4,000", third: "$2,000" }
    }
  ]);

  const e1r1 = await ensureRound(e1.id, "Initial Judging", 1, days(26), days(27), "First round of evaluation focusing on innovation and technical implementation");
  const e1r2 = await ensureRound(e1.id, "Final Presentations", 2, days(27), days(27), "Final presentations to expert panel", 100);

  // Create AI Builders Week
  const e2 = await ensureEvent({
    slug: "ai-builders-week",
    name: "AI Builders Week",
    description: "A week-long intensive program for AI enthusiasts and builders",
    longDescription: "Join the most comprehensive AI building experience of the year. Learn, build, and ship AI products in just one week.",
    mode: "online",
    startsAt: days(45),
    endsAt: days(52),
    registrationEnds: days(40),
    maxTeamSize: 3,
    prizeMoney: "$25,000 total prizes",
    tags: ["AI", "Machine Learning", "Product Building"],
    featured: false,
    status: "published"
  });

  await replaceTracks(e2.id, [
    {
      name: "Agentic Applications",
      description: "Build AI agents that can take actions autonomously",
      color: "#9B59B6",
      prizes: { first: "$10,000", second: "$5,000" }
    },
    {
      name: "AI Infrastructure",
      description: "Create tools and platforms that power AI applications",
      color: "#E74C3C",
      prizes: { first: "$8,000", second: "$2,000" }
    }
  ]);

  await ensureRound(e2.id, "Weekly Showcase", 1, days(52), days(52), "Present your AI project to the community");

  // Create Campus Hack NIT
  const e3 = await ensureEvent({
    slug: "campus-hack-nit",
    name: "Campus Hack NIT",
    description: "The premier on-campus hackathon for NIT students",
    longDescription: "An exclusive hackathon for NIT students focusing on practical solutions for campus and society.",
    mode: "offline",
    startsAt: days(90),
    endsAt: days(92),
    registrationEnds: days(85),
    maxTeamSize: 4,
    maxTeams: 50,
    prizeMoney: "$15,000 prize pool",
    tags: ["Campus", "Students", "Innovation", "Social Impact"],
    status: "published"
  });

  await replaceTracks(e3.id, [
    {
      name: "Healthcare Solutions",
      description: "Innovative healthcare technologies and solutions",
      color: "#2ECC71",
      prizes: { first: "$8,000", second: "$4,000", third: "$1,000" }
    },
    {
      name: "Sustainability",
      description: "Environmental and sustainability-focused projects",
      color: "#F39C12",
      prizes: { first: "$6,000", second: "$3,000", third: "$1,000" }
    }
  ]);

  await ensureRound(e3.id, "Final Judging", 1, days(92), days(92), "Final evaluation and winner selection");

  // Create teams with diverse members
  const quantumTeam = await ensureTeam(e1.id, "Team Quantum", "Quantum computing enthusiasts building the future", participant1.id);
  await prisma.teamMember.create({
    data: { teamId: quantumTeam.id, userId: participant2.id, role: "member" }
  });

  const aiPioneers = await ensureTeam(e1.id, "AI Pioneers", "Breaking boundaries in artificial intelligence", participant3.id);

  const sustainableInnovators = await ensureTeam(e3.id, "Sustainable Innovators", "Building a greener tomorrow", participant1.id);

  // Create comprehensive submissions
  const tracks = await prisma.track.findMany({ where: { eventId: e1.id } });
  const aiTrack = tracks.find(t => t.name === "AI & Machine Learning");

  await ensureSubmission({
    title: "QuantumMind AI Assistant",
    description: "An AI-powered assistant that helps students learn quantum computing concepts through interactive simulations and personalized learning paths.",
    status: "submitted",
    eventId: e1.id,
    teamId: quantumTeam.id,
    roundId: e1r1?.id,
    trackId: aiTrack?.id,
    repoUrl: "https://github.com/quantum-team/quantummind-ai",
    liveUrl: "https://quantummind-ai.vercel.app",
    videoUrl: "https://youtube.com/watch?v=demo123",
    presentationUrl: "https://slides.com/quantum-team/quantummind",
    techStack: ["Next.js", "OpenAI API", "Three.js", "Prisma", "TailwindCSS"],
    features: [
      "Interactive quantum circuit builder",
      "AI-powered concept explanations",
      "Personalized learning paths",
      "3D quantum state visualizations",
      "Progress tracking and analytics"
    ],
    challenges: "Implementing accurate quantum simulations in the browser and creating intuitive visualizations for complex quantum concepts.",
    accomplishments: "Successfully created an educational platform that makes quantum computing accessible to beginners while providing advanced features for experts.",
    learnings: "Learned about quantum computing principles, 3D rendering in browsers, and designing educational user experiences.",
    nextSteps: "Add more quantum algorithms, implement collaborative features, and integrate with educational institutions."
  });

  // Create announcements
  await createAnnouncement(
    e1.id,
    alice.id,
    "🚀 SynapHack 3.0 Registration Now Open!",
    "We're excited to announce that registration for SynapHack 3.0 is now open! Join us for 48 hours of innovation, learning, and building. Early bird registration includes exclusive swag and mentor sessions.",
    "urgent",
    "high"
  );

  await createAnnouncement(
    e1.id,
    alice.id,
    "🔥 Mentors Announced!",
    "Meet our incredible lineup of mentors from Google, Microsoft, Meta, and top startups. They'll be available throughout the event to guide your teams and provide expert feedback.",
    "update",
    "normal"
  );

  await createAnnouncement(
    e1.id,
    alice.id,
    "💡 Workshop Schedule Released",
    "Check out our pre-event workshop schedule covering AI fundamentals, pitch presentation skills, and technical deep-dives. Register for workshops in your dashboard.",
    "general",
    "normal"
  );

  // Create analytics data
  await prisma.eventAnalytics.createMany({
    data: [
      { eventId: e1.id, date: days(-5), registrations: 45, teams: 12, submissions: 0, pageViews: 1250, uniqueVisitors: 890 },
      { eventId: e1.id, date: days(-4), registrations: 67, teams: 18, submissions: 0, pageViews: 1580, uniqueVisitors: 1120 },
      { eventId: e1.id, date: days(-3), registrations: 89, teams: 24, submissions: 0, pageViews: 2100, uniqueVisitors: 1450 },
      { eventId: e1.id, date: days(-2), registrations: 112, teams: 31, submissions: 0, pageViews: 2780, uniqueVisitors: 1890 },
      { eventId: e1.id, date: days(-1), registrations: 134, teams: 38, submissions: 0, pageViews: 3200, uniqueVisitors: 2250 }
    ]
  });

  console.log("✅ Comprehensive seed completed!");
  console.log({
    events: [e1.slug, e2.slug, e3.slug],
    users: [alice.name, bob.name, carol.name, participant1.name, participant2.name, participant3.name],
    teams: [quantumTeam.name, aiPioneers.name, sustainableInnovators.name],
    message: "Database seeded with comprehensive hackathon platform data!"
  });
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}