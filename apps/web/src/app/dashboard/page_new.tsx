import { getUserId } from "@/server/auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CalendarDays, Users, Trophy, Megaphone, Plus, ArrowRight, Zap, Target } from "lucide-react";

// Mock data for demo purposes
const mockData = {
  events: [
    {
      id: "1",
      title: "SynapHack 3.0",
      status: "active",
      startDate: "2025-08-29",
      _count: { teams: 45, submissions: 23, registrations: 180 }
    },
    {
      id: "2",
      title: "AI Innovation Challenge",
      status: "upcoming",
      startDate: "2025-09-15",
      _count: { teams: 32, submissions: 18, registrations: 156 }
    }
  ],
  teams: [
    {
      id: "1",
      name: "Code Crusaders",
      event: { name: "SynapHack 3.0", slug: "synaphack-3" },
      _count: { members: 4, submissions: 2 }
    },
    {
      id: "2",
      name: "AI Innovators",
      event: { name: "AI Innovation Challenge", slug: "ai-challenge" },
      _count: { members: 3, submissions: 1 }
    }
  ],
  submissions: [
    {
      id: "1",
      title: "Smart City Dashboard",
      status: "submitted",
      submittedAt: "2025-08-30",
      team: { name: "Code Crusaders" },
      event: { name: "SynapHack 3.0" }
    }
  ],
  announcements: [
    {
      id: "1",
      title: "Welcome to SynapHack 3.0!",
      content: "Event starts in 2 hours. Make sure you're ready!",
      createdAt: "2025-08-29"
    }
  ]
};

export default async function DashboardPage() {
  // For demo purposes, we'll comment out auth temporarily
  // const userId = await getUserId();
  // if (!userId) redirect("/login");

  const { events, teams, submissions, announcements } = mockData;

  // Calculate stats
  const stats = {
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'active').length,
    totalTeams: teams.length,
    totalSubmissions: submissions.length,
    totalUsers: 1250 // Mock data
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your hackathons.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/events/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">All time events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeEvents}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeams}</div>
            <p className="text-xs text-muted-foreground">Registered teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Project submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Platform users</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/events" className="block">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                Event Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and manage hackathon events with comprehensive tools
              </p>
              <Button variant="outline" size="sm">
                Manage Events
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/teams" className="block">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Organize teams, track members, and manage collaborations
              </p>
              <Button variant="outline" size="sm">
                View Teams
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/submissions" className="block">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Review and evaluate project submissions and judge entries
              </p>
              <Button variant="outline" size="sm">
                View Submissions
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics" className="block">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced analytics and insights for your hackathon events
              </p>
              <Button variant="outline" size="sm">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/live" className="block">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Live Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time leaderboards and live event monitoring
              </p>
              <Button variant="outline" size="sm">
                Go Live
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-gray-400" />
              More Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover additional tools and integrations
            </p>
            <Button variant="outline" size="sm" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Events
              <Button variant="ghost" size="sm" asChild>
                <Link href="/events">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="space-y-2">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
