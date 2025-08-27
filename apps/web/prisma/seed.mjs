// Pitch-ready seed data for HackHub Platform
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const days = (n) => new Date(Date.now() + n * 86_400_000);
const past = (n) => new Date(Date.now() - n * 86_400_000);

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

  // Create SynapHack 2025 - The main event (happening soon)
  const e1 = await ensureEvent({
    slug: "synaphack-2025",
    name: "SynapHack 2025",
    description: "The premier global hackathon connecting innovators worldwide",
    longDescription: `SynapHack 2025 brings together the brightest minds to solve tomorrow's challenges today. 
    
This year's focus areas include AI Innovation, Sustainable Technology, HealthTech Solutions, and Web3 Applications. 

🏆 Prize Pool: $75,000
🌍 Global Participation: Online & Regional Hubs
⏰ Duration: 48 Hours of Pure Innovation
🎯 Tracks: 4 Specialized Categories

Join 2,000+ participants from 50+ countries in building solutions that matter. Expert mentors from leading tech companies will guide teams throughout the event.`,
    mode: "hybrid",
    startsAt: days(5),
    endsAt: days(7),
    registrationEnds: days(2),
    maxTeamSize: 4,
    minTeamSize: 1,
    maxTeams: 500,
    prizeMoney: "$75,000 total prize pool",
    rules: [
      "Teams must have 1-4 members",
      "Original code written during event period",
      "Open source libraries and APIs allowed",
      "Final demo required for all submissions",
      "Code repository must be public"
    ],
    schedule: [
      { time: "2025-09-02 10:00", title: "Opening Keynote", description: "Welcome & challenge introduction" },
      { time: "2025-09-02 11:00", title: "Team Formation", description: "Find your teammates" },
      { time: "2025-09-02 12:00", title: "Hacking Begins", description: "Start building!" },
      { time: "2025-09-02 18:00", title: "Mentor Sessions", description: "1-on-1 guidance available" },
      { time: "2025-09-03 12:00", title: "Midpoint Check-in", description: "Progress updates" },
      { time: "2025-09-03 20:00", title: "Submission Deadline", description: "Final uploads due" },
      { time: "2025-09-04 10:00", title: "Demo Day", description: "Team presentations" },
      { time: "2025-09-04 16:00", title: "Awards Ceremony", description: "Winners announced" }
    ],
    sponsors: [
      { name: "Microsoft", logo: "/sponsors/microsoft.png", tier: "Platinum", url: "https://microsoft.com" },
      { name: "Google Cloud", logo: "/sponsors/google.png", tier: "Gold", url: "https://cloud.google.com" },
      { name: "GitHub", logo: "/sponsors/github.png", tier: "Silver", url: "https://github.com" }
    ],
    mentorsList: [
      { name: "Sarah Chen", company: "Meta", expertise: "Product Strategy", image: "/mentors/sarah.jpg" },
      { name: "Alex Kumar", company: "OpenAI", expertise: "AI/ML Engineering", image: "/mentors/alex.jpg" },
      { name: "Maya Patel", company: "Stripe", expertise: "FinTech", image: "/mentors/maya.jpg" }
    ],
    tags: ["AI", "Sustainability", "HealthTech", "Web3", "Innovation"],
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    logoImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
    status: "published",
    featured: true
  });

  await replaceTracks(e1.id, [
    {
      name: "AI Innovation",
      description: "Build next-generation AI applications and tools",
      color: "#6366F1",
      prizes: { first: "$25,000", second: "$15,000", third: "$8,000" }
    },
    {
      name: "Sustainable Technology", 
      description: "Create solutions for environmental challenges",
      color: "#10B981",
      prizes: { first: "$20,000", second: "$12,000", third: "$6,000" }
    },
    {
      name: "HealthTech Solutions",
      description: "Innovate in healthcare and medical technology",
      color: "#EF4444",
      prizes: { first: "$18,000", second: "$10,000", third: "$5,000" }
    },
    {
      name: "Web3 Applications",
      description: "Build decentralized applications and blockchain solutions",
      color: "#8B5CF6",
      prizes: { first: "$15,000", second: "$8,000", third: "$4,000" }
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

  // Create comprehensive submissions with realistic data
  const tracks = await prisma.track.findMany({ where: { eventId: e1.id } });
  const aiTrack = tracks.find(t => t.name === "AI Innovation");
  const sustainableTrack = tracks.find(t => t.name === "Sustainable Technology");
  const healthTrack = tracks.find(t => t.name === "HealthTech Solutions");

  await ensureSubmission({
    title: "EcoTracker AI",
    description: "AI-powered carbon footprint tracking app that helps individuals and businesses reduce their environmental impact through personalized recommendations and gamified sustainability challenges.",
    status: "submitted",
    eventId: e1.id,
    teamId: quantumTeam.id,
    roundId: e1r1?.id,
    trackId: sustainableTrack?.id,
    repoUrl: "https://github.com/quantum-team/ecotracker-ai",
    liveUrl: "https://ecotracker-ai.vercel.app",
    videoUrl: "https://youtu.be/demo-ecotracker",
    presentationUrl: "https://pitch.com/quantum-team/ecotracker",
    techStack: ["Next.js", "OpenAI GPT-4", "Prisma", "PostgreSQL", "Chart.js", "TailwindCSS"],
    features: [
      "Real-time carbon footprint calculation",
      "AI-powered sustainability recommendations",
      "Social challenges and leaderboards",
      "Corporate dashboard for businesses",
      "Integration with smart home devices"
    ],
    challenges: "Accurately calculating carbon footprints from user data and creating engaging gamification that motivates long-term behavior change.",
    accomplishments: "Built a complete platform with AI recommendations that achieved 40% user engagement in beta testing.",
    learnings: "Learned about environmental data APIs, behavior psychology in app design, and building scalable real-time analytics.",
    nextSteps: "Partner with environmental organizations, add IoT device integrations, and launch corporate sustainability packages."
  });

  await ensureSubmission({
    title: "MediConnect",
    description: "Telemedicine platform connecting rural patients with specialist doctors through AI-assisted diagnosis and remote monitoring capabilities.",
    status: "submitted",
    eventId: e1.id,
    teamId: aiPioneers.id,
    roundId: e1r1?.id,
    trackId: healthTrack?.id,
    repoUrl: "https://github.com/ai-pioneers/mediconnect",
    liveUrl: "https://mediconnect-demo.netlify.app",
    videoUrl: "https://youtu.be/mediconnect-demo",
    presentationUrl: "https://slides.com/ai-pioneers/mediconnect",
    techStack: ["React", "Node.js", "WebRTC", "TensorFlow.js", "Firebase", "Stripe"],
    features: [
      "HD video consultations with screen sharing",
      "AI-powered symptom analysis and triage",
      "Secure patient data management",
      "Prescription and lab order system",
      "Multi-language support for global access"
    ],
    challenges: "Ensuring HIPAA compliance while maintaining seamless user experience and implementing reliable AI diagnosis in a web environment.",
    accomplishments: "Successfully demo'd with real doctors, achieved sub-200ms latency for video calls, and implemented secure end-to-end encryption.",
    learnings: "Deep dive into healthcare regulations, WebRTC optimization, and building trust in AI-assisted medical tools.",
    nextSteps: "Pursue FDA approval for AI components, partner with rural healthcare networks, and expand to mental health services."
  });

  // Add plagiarism reports for realistic demo
  const submission1 = await prisma.submission.findFirst({ where: { title: "EcoTracker AI" } });
  if (submission1) {
    await prisma.plagiarismReport.create({
      data: {
        submissionId: submission1.id,
        overallScore: 15,
        status: "clean",
        checkedAt: new Date(),
        details: JSON.stringify({
          codeSimularity: 12,
          textSimilarity: 8,
          structureSimilarity: 15,
          summary: "Low similarity detected. Project appears to be original work."
        })
      }
    });
  }

  const submission2 = await prisma.submission.findFirst({ where: { title: "MediConnect" } });
  if (submission2) {
    await prisma.plagiarismReport.create({
      data: {
        submissionId: submission2.id,
        overallScore: 25,
        status: "moderate",
        checkedAt: new Date(),
        details: JSON.stringify({
          codeSimularity: 20,
          textSimilarity: 30,
          structureSimilarity: 25,
          summary: "Moderate similarity in documentation. Code appears original."
        })
      }
    });

    await prisma.plagiarismMatch.create({
      data: {
        reportId: (await prisma.plagiarismReport.findFirst({ where: { submissionId: submission2.id } }))?.id,
        sourceType: "github",
        sourceUrl: "https://github.com/example/telemedicine-base",
        similarity: 25,
        matchedContent: "Similar README structure and API documentation patterns"
      }
    });
  }

  // Create announcements
  await createAnnouncement(
    e1.id,
    alice.id,
    "🚀 SynapHack 2025 Registration Closing Soon!",
    "Only 2 days left to register for SynapHack 2025! Don't miss your chance to join 2,000+ innovators from around the globe. Register now to secure your spot and receive exclusive pre-event resources.",
    "urgent",
    "high"
  );

  await createAnnouncement(
    e1.id,
    alice.id,
    "🏆 Prize Pool Increased to $75,000!",
    "We're excited to announce that our sponsors have increased the total prize pool to $75,000! This includes cash prizes, mentorship opportunities, and startup incubator spots.",
    "update",
    "high"
  );

  await createAnnouncement(
    e1.id,
    alice.id,
    "💡 Pre-Event Workshop Schedule Live",
    "Check out our pre-event workshops covering AI fundamentals, sustainable tech trends, and pitch presentation masterclasses. All workshops are free for registered participants.",
    "general",
    "normal"
  );

  // Create analytics data
  await prisma.eventAnalytics.createMany({
    data: [
      { eventId: e1.id, date: days(-7), registrations: 234, teams: 58, submissions: 0, pageViews: 3420, uniqueVisitors: 2180 },
      { eventId: e1.id, date: days(-6), registrations: 456, teams: 112, submissions: 0, pageViews: 4850, uniqueVisitors: 3100 },
      { eventId: e1.id, date: days(-5), registrations: 678, teams: 169, submissions: 0, pageViews: 6200, uniqueVisitors: 4250 },
      { eventId: e1.id, date: days(-4), registrations: 891, teams: 223, submissions: 0, pageViews: 7800, uniqueVisitors: 5400 },
      { eventId: e1.id, date: days(-3), registrations: 1023, teams: 256, submissions: 0, pageViews: 9100, uniqueVisitors: 6300 },
      { eventId: e1.id, date: days(-2), registrations: 1234, teams: 308, submissions: 0, pageViews: 11500, uniqueVisitors: 7800 },
      { eventId: e1.id, date: days(-1), registrations: 1456, teams: 364, submissions: 0, pageViews: 13200, uniqueVisitors: 8900 }
    ]
  });

  // Create POAPs for demo
  await prisma.pOAP.createMany({
    data: [
      {
        eventId: e1.id,
        name: "SynapHack 2025 Participant",
        description: "Proof of participation in SynapHack 2025 global hackathon",
        imageUrl: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&h=400&fit=crop",
        isActive: true,
        mintLimit: 2000,
        mintedCount: 1456
      },
      {
        eventId: e1.id,
        name: "SynapHack 2025 Winner",
        description: "Champion of SynapHack 2025 - Top innovator recognition",
        imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=400&fit=crop",
        isActive: true,
        mintLimit: 50,
        mintedCount: 0
      },
      {
        eventId: e2.id,
        name: "AI Builders Week Graduate",
        description: "Completed the intensive AI Builders Week program",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
        isActive: true,
        mintLimit: 500,
        mintedCount: 124
      }
    ]
  });

  console.log("✅ Pitch-ready database seeded successfully!");
  console.log({
    events: [e1.slug, e2.slug, e3.slug],
    users: [alice.name, bob.name, carol.name, participant1.name, participant2.name, participant3.name],
    teams: [quantumTeam.name, aiPioneers.name, sustainableInnovators.name],
    submissions: 2,
    plagiarismReports: 2,
    announcements: 3,
    message: "HackHub platform ready for pitch with realistic demo data!"
  });
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}