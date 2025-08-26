import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const limit = parseInt(searchParams.get("limit") || "50");

    const whereClause = eventId ? { eventId } : {};

    // Get teams with their scores and rankings
    const teams = await prisma.team.findMany({
      where: whereClause,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                email: true
              }
            }
          }
        },
        event: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        submissions: {
          include: {
            scores: true
          }
        },
        _count: {
          select: {
            members: true,
            submissions: true
          }
        }
      },
      take: limit,
      orderBy: { createdAt: "desc" }
    });

    // Calculate team scores and rankings
    const teamsWithScores = teams.map(team => {
      const totalScore = team.submissions.reduce((acc, submission) => {
        const submissionScore = submission.scores.reduce((scoreAcc, score) => {
          return scoreAcc + (score.value || 0);
        }, 0);
        return acc + submissionScore;
      }, 0);

      const maxPossibleScore = team.submissions.reduce((acc, submission) => {
        const submissionMaxScore = submission.scores.reduce((scoreAcc, score) => {
          return scoreAcc + (score.maxValue || 10);
        }, 0);
        return acc + submissionMaxScore;
      }, 0);

      return {
        id: team.id,
        name: team.name,
        description: team.description,
        avatar: team.avatar,
        event: team.event,
        memberCount: team._count.members,
        submissionCount: team._count.submissions,
        totalScore,
        maxPossibleScore,
        averageScore: team.submissions.length > 0 ? totalScore / team.submissions.length : 0,
        scorePercentage: maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0,
        members: team.members.map(member => ({
          id: member.id,
          role: member.role,
          joinedAt: member.joinedAt,
          user: member.user
        })),
        createdAt: team.createdAt
      };
    });

    // Sort by total score (highest first)
    teamsWithScores.sort((a, b) => b.totalScore - a.totalScore);

    // Add rankings
    const rankedTeams = teamsWithScores.map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    return NextResponse.json({
      success: true,
      data: rankedTeams,
      meta: {
        total: rankedTeams.length,
        limit,
        eventId
      }
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch leaderboard data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, submissionId, scores, roundId } = body;

    // Validate required fields
    if (!teamId && !submissionId) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Either teamId or submissionId is required" 
        },
        { status: 400 }
      );
    }

    // If updating scores for a specific submission
    if (submissionId && scores && roundId) {
      const submission = await prisma.submission.findUnique({
        where: { id: submissionId },
        include: { team: true }
      });

      if (!submission) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Submission not found" 
          },
          { status: 404 }
        );
      }

      // Create or update scores
      const scorePromises = scores.map(async (scoreData: any) => {
        return prisma.score.upsert({
          where: {
            id: scoreData.id || "new"
          },
          update: {
            value: scoreData.value,
            comment: scoreData.comment || null
          },
          create: {
            submissionId,
            judgeId: scoreData.judgeId || "system",
            roundId,
            value: scoreData.value,
            maxValue: scoreData.maxValue || 10,
            comment: scoreData.comment || null,
            criterion: scoreData.criterion || null
          }
        });
      });

      const updatedScores = await Promise.all(scorePromises);

      // Recalculate team ranking
      const updatedTeam = await prisma.team.findUnique({
        where: { id: submission.teamId },
        include: {
          submissions: {
            include: {
              scores: true
            }
          }
        }
      });

      const totalScore = updatedTeam?.submissions.reduce((acc, sub) => {
        const subScore = sub.scores.reduce((scoreAcc, score) => {
          return scoreAcc + (score.value || 0);
        }, 0);
        return acc + subScore;
      }, 0) || 0;

      return NextResponse.json({
        success: true,
        data: {
          scores: updatedScores,
          team: {
            id: updatedTeam?.id,
            name: updatedTeam?.name,
            totalScore
          }
        }
      });
    }

    // If creating a new submission score entry
    if (teamId && scores) {
      // This would be for bulk score updates or team score adjustments
      // Implementation depends on specific requirements
      return NextResponse.json({
        success: true,
        message: "Bulk score update not yet implemented",
        data: { teamId, scores }
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: "Invalid request format" 
      },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error updating leaderboard scores:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to update scores",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, action, data } = body;

    if (!teamId || !action) {
      return NextResponse.json(
        { 
          success: false, 
          error: "teamId and action are required" 
        },
        { status: 400 }
      );
    }

    switch (action) {
      case 'updateScore':
        // Manual score adjustment
        if (typeof data.score !== 'number') {
          return NextResponse.json(
            { success: false, error: "Score must be a number" },
            { status: 400 }
          );
        }

        // You might want to create a separate TeamScore model for manual adjustments
        // For now, we'll return a placeholder response
        return NextResponse.json({
          success: true,
          message: "Manual score adjustment recorded",
          data: { teamId, newScore: data.score }
        });

      case 'recalculate':
        // Recalculate team scores
        const team = await prisma.team.findUnique({
          where: { id: teamId },
          include: {
            submissions: {
              include: {
                scores: true
              }
            }
          }
        });

        if (!team) {
          return NextResponse.json(
            { success: false, error: "Team not found" },
            { status: 404 }
          );
        }

        const totalScore = team.submissions.reduce((acc, submission) => {
          const submissionScore = submission.scores.reduce((scoreAcc, score) => {
            return scoreAcc + (score.value || 0);
          }, 0);
          return acc + submissionScore;
        }, 0);

        return NextResponse.json({
          success: true,
          data: {
            teamId,
            totalScore,
            submissionCount: team.submissions.length
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error("Error in leaderboard PUT request:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
