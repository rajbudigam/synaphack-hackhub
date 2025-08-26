import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-server";

// GET /api/users/profile - Get user profile with roles and associations
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    // Get comprehensive user profile
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        // Team memberships
        teams: {
          include: {
            team: {
              include: {
                event: {
                  select: {
                    id: true,
                    name: true,
                    status: true
                  }
                }
              }
            }
          }
        },
        // Judge assignments
        judgeAssignments: {
          include: {
            event: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Determine user roles based on database relationships and role field
    const roles: string[] = [];
    
    if (userProfile.isAdmin) {
      roles.push('admin');
    }
    
    // Check user's role field for specific roles
    if (userProfile.role === 'organizer') {
      roles.push('organizer');
    }
    
    // Check if user has judge assignments
    if (userProfile.judgeAssignments && userProfile.judgeAssignments.length > 0) {
      roles.push('judge');
    }
    
    // Check if user is sponsor manager
    if (userProfile.role === 'sponsor_manager') {
      roles.push('sponsor_manager');
    }

    // Format teams data
    const teams = userProfile.teams?.map(membership => ({
      id: membership.team.id,
      name: membership.team.name,
      role: membership.role,
      event: {
        name: membership.team.event.name,
        status: membership.team.event.status
      }
    })) || [];

    // Format judge assignments - for participant dashboard, show simplified view
    const judgeAssignments = userProfile.judgeAssignments?.slice(0, 5).map(assignment => ({
      id: assignment.id,
      status: 'PENDING', // Simplified for participant view
      submission: {
        title: `Assignment for ${assignment.event.name}`,
        event: {
          name: assignment.event.name
        }
      }
    })) || [];

    // Mock sponsorships for now (would need actual sponsor management relationship)
    const sponsorships: any[] = [];

    const profile = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      isAdmin: userProfile.isAdmin,
      roles,
      teams,
      judgeAssignments,
      sponsorships
    };

    return NextResponse.json({
      success: true,
      user: profile
    });

  } catch (error) {
    console.error("User profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
