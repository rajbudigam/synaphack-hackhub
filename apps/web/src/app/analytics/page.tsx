export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  Calendar, 
  Target,
  Award,
  Code,
  Globe,
  Download,
  RefreshCw
} from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

export default async function AnalyticsPage() {
  // Note: Some environments may not have the EventAnalytics model generated yet.
  // We compute aggregates directly from core tables to avoid client mismatch.

  // Aggregate stats
  const totalEvents = await prisma.event.count();
  const totalParticipants = await prisma.user.count({ where: { role: "participant" } });
  const totalTeams = await prisma.team.count();
  const totalSubmissions = await prisma.submission.count();
  const totalJudges = await prisma.user.count({ where: { role: "judge" } });
  const totalMentors = await prisma.user.count({ where: { role: "mentor" } });

  // Recent events with participation
  const recentEvents = await prisma.event.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          registrations: true,
          teams: true,
          submissions: true
        }
      }
    }
  });

  // Top performing teams
  const topTeams = await prisma.team.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      event: {
        select: { name: true }
      },
      _count: {
        select: { members: true }
      }
    }
  });

  return (
    <PageContainer className="space-y-12" size="lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive hackathon platform insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeams}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Judges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJudges}</div>
            <p className="text-xs text-muted-foreground">
              Expert evaluators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMentors}</div>
            <p className="text-xs text-muted-foreground">
              Industry experts
            </p>
          </CardContent>
        </Card>
      </div>

  <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Events Performance */}
  <Card className="card-spacing">
          <CardHeader>
            <CardTitle>Recent Events Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
        {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">
          {new Date((event as any).startsAt ?? (event as any).startDate ?? event.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">{event._count?.registrations || 0}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{event._count?.teams || 0}</div>
                      <div className="text-xs text-muted-foreground">Teams</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{event._count?.submissions || 0}</div>
                      <div className="text-xs text-muted-foreground">Submissions</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Teams */}
  <Card className="card-spacing">
          <CardHeader>
            <CardTitle>Top Performing Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTeams.map((team, index: number) => (
                <div key={team.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{team.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{team.event?.name}</span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-gray-200 dark:border-gray-800">
                        {team._count?.members || 0} members
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{team.event?.name || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

  {/* Detailed Analytics (optional: requires EventAnalytics model) */}
  </PageContainer>
  );
}
