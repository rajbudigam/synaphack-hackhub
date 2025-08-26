import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-server";

// GET /api/users/stats - Get participant statistics
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    // Get team memberships
    const teamMemberships = await prisma.teamMember.findMany({
      where: { userId: user.id },
      include: {
        team: {
          include: {
            event: true,
            submissions: true
          }
        }
      }
    });

    // Get issued certificates
    const certificates = await prisma.issuedCertificate.findMany({
      where: { userId: user.id }
    });

    // Calculate stats
    const totalTeams = teamMemberships.length;
    const activeTeams = teamMemberships.filter(
      membership => membership.team.event.status === 'ongoing' || membership.team.event.status === 'published'
    ).length;

    const submissions = teamMemberships.reduce((count, membership) => {
      return count + membership.team.submissions.length;
    }, 0);

    const certificatesCount = certificates.length;

    const stats = {
      totalTeams,
      activeTeams,
      submissions,
      certificates: certificatesCount
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error("User stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
