// import { getUserId } from "@/server/auth";
// import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { CalendarDays, Users, Trophy, Plus, ArrowRight, BarChart3, Shield, Crown, Sparkles, Zap, Star, Compass } from "lucide-react";

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
    { title: "Events", icon: CalendarDays, href: "/events", gradient: "from-blue-500 to-cyan-500", description: "Manage hackathons" },
    { title: "Teams", icon: Users, href: "/teams", gradient: "from-green-500 to-emerald-500", description: "Team collaboration" },
    { title: "Analytics", icon: BarChart3, href: "/analytics", gradient: "from-orange-500 to-red-500", description: "Insights & data" },
    { title: "POAPs", icon: Crown, href: "/poaps", gradient: "from-indigo-500 to-purple-500", description: "Digital certificates" },
    { title: "Leaderboard", icon: Trophy, href: "/leaderboard", gradient: "from-yellow-500 to-orange-500", description: "Top performers" },
    { title: "Plagiarism", icon: Shield, href: "/plagiarism", gradient: "from-purple-500 to-pink-500", description: "Content protection" },
  ];

  return (
    <div className="min-h-screen relative">      
      <PageContainer className="space-y-32 animate-fade-in relative z-10" size="xl">
        {/* Magical Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-violet-200/60 dark:border-violet-800/60 p-20 lg:p-24 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl animate-magical-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl animate-magical-pulse">
                <Sparkles className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  HackHub∞
                </h1>
                <p className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-medium">
                  Welcome to your reality creation center
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white text-xl px-8 py-6 rounded-2xl shadow-xl hover:shadow-violet-500/50 transition-all duration-500 group">
                <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                Create Magic
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl animate-magical-glow hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Total Events
                </CardTitle>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                  <CalendarDays className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {stats.totalEvents}
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-4">
                Active hackathons running
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl animate-magical-glow hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
            <CardHeader className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Total Users
                </CardTitle>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-4">
                Visionaries in the platform
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl animate-magical-glow hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-red-500" />
            <CardHeader className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Submissions
                </CardTitle>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {stats.totalSubmissions}
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-4">
                Projects transcending reality
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Magical Quick Actions Grid */}
        <div className="space-y-16">
          <h2 className="text-5xl lg:text-6xl font-black text-center tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent">
              Reality Creation
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {quickActions.map((action, index) => (
              <Link key={action.title} href={action.href}>
                <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl hover:scale-105 animate-magical-glow cursor-pointer">
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${action.gradient}`} />
                  
                  <CardHeader className="p-10 space-y-8">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-500">
                        {action.title}
                      </CardTitle>
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${action.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <action.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                      {action.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="px-10 pb-10">
                    <div className="flex items-center text-lg font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-500">
                      Launch
                      <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
