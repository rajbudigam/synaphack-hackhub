// import { getUserId } from "@/server/auth";
// import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  CalendarDays, 
  Users, 
  Trophy, 
  Megaphone, 
  Plus, 
  ArrowRight, 
  Zap, 
  Target,
  BarChart3,
  Shield,
  Crown,
  Sparkles,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Award
} from "lucide-react";

// Mock data for demo purposes
const mockData = {
  events: [
    {
      id: "1",
      title: "SynapHack 3.0 Global",
      status: "active",
      startDate: "2025-01-15",
      _count: { teams: 124, submissions: 67, registrations: 456 }
    },
    {
      id: "2",
      title: "AI Innovation Challenge",
      status: "upcoming",
      startDate: "2025-02-10",
      _count: { teams: 89, submissions: 34, registrations: 312 }
    },
    {
      id: "3",
      title: "Web3 Builder Summit",
      status: "planning",
      startDate: "2025-03-05",
      _count: { teams: 0, submissions: 0, registrations: 78 }
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
      submittedAt: "2025-01-14",
      team: { name: "Code Crusaders" },
      event: { name: "SynapHack 3.0" }
    }
  ],
  announcements: [
    {
      id: "1",
      title: "🎉 SynapHack 3.0 Now Live!",
      content: "The biggest hackathon of the year has officially started. Over 450 participants from 50+ countries!",
      createdAt: "2025-01-15",
      type: "success"
    },
    {
      id: "2",
      title: "📊 New Analytics Dashboard",
      content: "Check out our enhanced analytics with real-time insights and performance metrics.",
      createdAt: "2025-01-14",
      type: "info"
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
    totalUsers: 1847,
    growthRate: 24.5
  };

  const quickActions = [
    {
      title: "Event Management",
      description: "Create and manage hackathon events with comprehensive tools",
      icon: CalendarDays,
      href: "/events",
      gradient: "from-blue-500 to-cyan-500",
      badge: "Core"
    },
    {
      title: "Team Collaboration",
      description: "Organize teams, track members, and manage collaborations",
      icon: Users,
      href: "/teams",
      gradient: "from-green-500 to-emerald-500",
      badge: null
    },
    {
      title: "AI Plagiarism Detection",
      description: "Advanced content analysis to ensure originality and fair competition",
      icon: Shield,
      href: "/plagiarism",
      gradient: "from-purple-500 to-pink-500",
      badge: "AI"
    },
    {
      title: "Analytics Dashboard",
      description: "Deep insights with predictive analytics and performance metrics",
      icon: BarChart3,
      href: "/analytics",
      gradient: "from-orange-500 to-red-500",
      badge: "Pro"
    },
    {
      title: "Web3 POAPs",
      description: "Blockchain-based achievements with NFT certificates and rewards",
      icon: Crown,
      href: "/poaps",
      gradient: "from-indigo-500 to-purple-500",
      badge: "Web3"
    },
    {
      title: "Live Leaderboard",
      description: "Real-time rankings and live event monitoring dashboard",
      icon: Trophy,
      href: "/leaderboard",
      gradient: "from-yellow-500 to-orange-500",
      badge: "Live"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5 p-8 border border-gray-200/50 dark:border-gray-800/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-primary">Welcome Back!</h1>
                <p className="text-lg text-muted-foreground">
                  Here's what's happening with your hackathons today.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                All Systems Online
              </span>
            </div>
            <Button size="lg" className="btn-gradient group">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-primary">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-success">{stats.activeEvents}</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
              <CheckCircle className="w-3 h-3" />
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Participants</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-primary">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +{stats.growthRate}% this quarter
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Submissions</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient-primary">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              3 pending review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            6 Available
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={action.href} href={action.href} className="group block">
              <Card className="hover-lift card-gradient border-gradient animate-scale-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    {action.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-1 font-medium ${
                          action.badge === 'AI' && 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                        } ${
                          action.badge === 'Web3' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        } ${
                          action.badge === 'Pro' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                        } ${
                          action.badge === 'Live' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        } ${
                          action.badge === 'Core' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        }`}
                      >
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {action.description}
                  </CardDescription>
                  <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card className="hover-lift card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                Recent Events
              </div>
              <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                <Link href="/events">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event, index) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={event.status === 'active' ? 'default' : 'secondary'}
                    className={`${
                      event.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}
                  >
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card className="hover-lift card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" />
              Latest Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{announcement.title}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        announcement.type === 'success' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      } ${
                        announcement.type === 'info' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}
                    >
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(announcement.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
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
