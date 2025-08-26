// import { getUserId } from "@/server/auth";
// import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { CalendarDays, Users, Trophy, Plus, ArrowRight, BarChart3, Shield, Crown, Sparkles } from "lucide-react";

// Minimal mock data for stats
const mockData = {
  events: [{ id: "1" }, { id: "2" }, { id: "3" }],
  teams: [{ id: "t1" }, { id: "t2" }],
  submissions: [{ id: "s1" }, { id: "s2" }, { id: "s3" }],
};

export default async function DashboardPage() {
  // const userId = await getUserId();
  // if (!userId) redirect("/login");

  const stats = {
    totalEvents: mockData.events.length,
    totalUsers: 1847,
    totalSubmissions: mockData.submissions.length,
  };

  const quickActions = [
    { title: "Events", icon: CalendarDays, href: "/events", gradient: "from-blue-500 to-cyan-500" },
    { title: "Teams", icon: Users, href: "/teams", gradient: "from-green-500 to-emerald-500" },
    { title: "Analytics", icon: BarChart3, href: "/analytics", gradient: "from-orange-500 to-red-500" },
    { title: "POAPs", icon: Crown, href: "/poaps", gradient: "from-indigo-500 to-purple-500" },
    { title: "Leaderboard", icon: Trophy, href: "/leaderboard", gradient: "from-yellow-500 to-orange-500" },
    { title: "Plagiarism", icon: Shield, href: "/plagiarism", gradient: "from-purple-500 to-pink-500" },
  ];

  return (
    <PageContainer className="space-y-24 animate-fade-in" size="xl">
      {/* Minimal Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-16 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight">HackHub</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button size="lg" className="btn-gradient group">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/events">Explore</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Stats (minimal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex items-center justify-between pb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-base text-muted-foreground">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold">{stats.totalEvents}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex items-center justify-between pb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-base text-muted-foreground">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold">{stats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-gradient border-gradient group">
          <CardHeader className="flex items-center justify-between pb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-base text-muted-foreground">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold">{stats.totalSubmissions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions (icon-only, minimal text) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {quickActions.map((action, index) => (
            <Link key={action.href} href={action.href} className="group block">
              <Card className="hover-lift card-gradient border-gradient animate-scale-in h-full" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm font-semibold group-hover:text-primary transition-colors">{action.title}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer for breathing room */}
      <div className="pb-10" />
    </PageContainer>
  );
}
