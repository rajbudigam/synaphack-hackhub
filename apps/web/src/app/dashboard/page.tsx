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
      name: "SynapHack 3.0",
      slug: "synaphack-3",
      startsAt: new Date("2025-08-30"),
      _count: { teams: 45, submissions: 23, registrations: 180 }
    },
    {
      id: "2", 
      name: "AI Innovation Challenge",
      slug: "ai-challenge",
      startsAt: new Date("2025-09-15"),
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
      name: "Tech Titans",
      event: { name: "AI Innovation Challenge", slug: "ai-challenge" },
      _count: { members: 3, submissions: 1 }
    }
  ],
  announcements: [
    {
      id: "1",
      title: "Welcome to SynapHack 3.0!",
      content: "Get ready for the most exciting hackathon of the year. Registration is now open!",
      type: "general",
      createdAt: new Date("2025-08-20"),
      event: { name: "SynapHack 3.0", slug: "synaphack-3" }
    }
  ],
  stats: {
    totalEvents: 12,
    totalTeams: 234,
    totalSubmissions: 456,
    totalUsers: 1200
  }
};

export default async function DashboardPage() {
  const userId = await getUserId();
  
  // If no user, redirect to login
  if (!userId) {
    redirect("/login");
  }

  const { events, teams, announcements, stats } = mockData;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your hackathon management center</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Active hackathons</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeams}</div>
            <p className="text-xs text-muted-foreground">Registered teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Project submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Platform users</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/events">
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
                Manage Events <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/teams">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Organize teams, manage registrations, and track participation
              </p>
              <Button variant="outline" size="sm">
                View Teams <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/submissions">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Review project submissions and manage evaluation process
              </p>
              <Button variant="outline" size="sm">
                View Submissions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/analytics">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive analytics and insights for your events
              </p>
              <Button variant="outline" size="sm">
                View Analytics <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/live">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                Live Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor live events and real-time leaderboards
              </p>
              <Button variant="outline" size="sm">
                Go Live <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-orange-500" />
              AI Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered plagiarism detection and automated tools
            </p>
            <Button variant="outline" size="sm">
              Explore AI <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest hackathons and events</CardDescription>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/events">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events found. Create your first event!</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Teams: {event._count?.teams || 0}</span>
                      <span>•</span>
                      <span>Submissions: {event._count?.submissions || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={new Date(event.startsAt) > new Date() ? "default" : "secondary"}>
                      {new Date(event.startsAt) > new Date() ? "Upcoming" : "Live"}
                    </Badge>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/events/${event.slug}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Teams */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Teams</CardTitle>
              <CardDescription>Latest team registrations</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/teams">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {teams.length === 0 ? (
              <p className="text-sm text-muted-foreground">No teams found.</p>
            ) : (
              teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{team.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Event: {team.event?.name}</span>
                      <span>•</span>
                      <span>Members: {team._count?.members || 0}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/teams/${team.id}`}>View</Link>
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Announcements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Latest updates and announcements</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/announcements">View All</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No announcements yet.</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <Badge variant="secondary">{announcement.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {announcement.content}
                    </p>
                    {announcement.event?.name && (
                      <p className="text-xs text-muted-foreground">
                        Event: {announcement.event?.name}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}