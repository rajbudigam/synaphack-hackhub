export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Users, Target } from "lucide-react";

async function getLeaderboardData() {
  try {
    // Get teams with their scores and rankings
    const teams = await prisma.team.findMany({
      include: {
        members: {
          include: {
            user: true
          }
        },
        event: {
          select: {
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
      orderBy: { createdAt: "desc" }
    });

    // Calculate team scores and rankings
    const teamsWithScores = teams.map(team => {
      const totalScore = team.submissions.reduce((acc: number, submission: any) => {
        const submissionScore = submission.scores.reduce((scoreAcc: number, score: any) => {
          return scoreAcc + (score.value || 0);
        }, 0);
        return acc + submissionScore;
      }, 0);

      return {
        ...team,
        totalScore,
        averageScore: team.submissions.length > 0 ? totalScore / team.submissions.length : 0
      };
    });

    // Sort by total score
    teamsWithScores.sort((a, b) => b.totalScore - a.totalScore);

    return teamsWithScores;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return [];
  }
}

export default async function LeaderboardPage() {
  const teams = await getLeaderboardData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Track team performance and rankings</p>
        </div>
      </div>

      {/* Top 3 Teams */}
      {teams.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Top Performers</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {teams.slice(0, 3).map((team, index) => (
              <Card key={team.id} className={`relative ${
                index === 0 ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
                index === 1 ? 'border-gray-400 bg-gray-50 dark:bg-gray-950/20' :
                'border-orange-400 bg-orange-50 dark:bg-orange-950/20'
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                      {index === 1 && <Medal className="h-6 w-6 text-gray-500" />}
                      {index === 2 && <Award className="h-6 w-6 text-orange-500" />}
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      #{index + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Team #{team.id.slice(-6)}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {team.totalScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Avg Score: {team.averageScore.toFixed(1)}</span>
                    <span>Submissions: {team.submissions?.length || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{team.members?.length || 0} members</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Full Rankings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Full Rankings</h2>
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {teams.length > 0 ? teams.map((team, index) => (
                <div key={team.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {team.members?.slice(0, 3).map((member: any) => (
                          <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                            <AvatarImage src={member.user?.avatar || undefined} />
                            <AvatarFallback className="text-xs">
                              {member.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {(team.members?.length || 0) > 3 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +{(team.members?.length || 0) - 3}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="font-semibold">{team.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Team #{team.id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-bold text-lg">{team.totalScore.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Total Score</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{team.averageScore.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{team.submissions?.length || 0}</div>
                      <div className="text-sm text-muted-foreground">Submissions</div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
                  <p className="text-muted-foreground">
                    Teams will appear here once they start participating.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
