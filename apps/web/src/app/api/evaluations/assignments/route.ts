import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-server";

// GET /api/evaluations/assignments - Get judge assignments for current user
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    // Get judge assignments for this user
    const assignments = await prisma.judgeAssignment.findMany({
      where: { judgeId: user.id },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true
          }
        },
        track: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // For now, we'll create mock submission data since we don't have actual submissions linked to assignments
    // In a real implementation, you'd have a proper relationship between assignments and submissions
    const formattedAssignments = assignments.map(assignment => ({
      id: assignment.id,
      status: 'PENDING', // Would be derived from actual evaluation status
      assignedAt: assignment.createdAt.toISOString(),
      submission: {
        id: `sub_${assignment.id}`,
        title: `Project for ${assignment.event.name}${assignment.track ? ` - ${assignment.track.name}` : ''}`,
        description: `A submission requiring evaluation for the ${assignment.event.name} event.`,
        submittedAt: assignment.createdAt.toISOString(),
        team: {
          id: `team_${assignment.id}`,
          name: `Team ${Math.floor(Math.random() * 100) + 1}`,
          members: [
            {
              user: {
                name: 'John Doe',
                email: 'john@example.com'
              }
            }
          ]
        },
        event: {
          id: assignment.event.id,
          name: assignment.event.name,
          slug: assignment.event.slug
        }
      }
    }));

    return NextResponse.json({
      success: true,
      assignments: formattedAssignments
    });

  } catch (error) {
    console.error("Judge assignments fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch judge assignments" },
      { status: 500 }
    );
  }
}

// PATCH /api/evaluations/assignments/:id/start - Start evaluation
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser();
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const assignmentId = pathParts[pathParts.length - 2]; // Get assignment ID from URL

    if (!assignmentId) {
      return NextResponse.json(
        { error: "Assignment ID is required" },
        { status: 400 }
      );
    }

    // Verify the assignment belongs to this judge
    const assignment = await prisma.judgeAssignment.findFirst({
      where: {
        id: assignmentId,
        judgeId: user.id
      }
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found or access denied" },
        { status: 404 }
      );
    }

    // In a real implementation, you would update the assignment status
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: "Evaluation started successfully"
    });

  } catch (error) {
    console.error("Start evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to start evaluation" },
      { status: 500 }
    );
  }
}
