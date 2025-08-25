"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Trophy, 
  Users, 
  Megaphone, 
  Settings, 
  SquareStack, 
  Layers,
  BarChart3,
  Award,
  Calendar,
  Code,
  Target,
  Bell,
  BookOpen,
  Shield,
  Zap
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Submissions", href: "/submissions", icon: Code },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Announcements", href: "/announcements", icon: Bell },
];

const features = [
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "POAPs", href: "/poaps", icon: Target },
  { label: "Mentorship", href: "/mentors", icon: BookOpen },
  { label: "Anti-Plagiarism", href: "/plagiarism", icon: Shield },
  { label: "Live Updates", href: "/live", icon: Zap },
];

export function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="mb-4 px-2">
        <Link href="/dashboard" className="block">
          <div className="text-xl font-semibold tracking-tight">HackHub</div>
          <div className="text-sm text-muted-foreground">Complete Hackathon Platform</div>
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col gap-1">
        <div className="mb-2">
          <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Core Features
          </div>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mb-2">
          <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Advanced Features
          </div>
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <Link
            href="/settings"
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
      
      <div className="mt-4 px-2 space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="rounded-full bg-green-500 hover:bg-green-600">Live</Badge>
          <Badge variant="outline" className="rounded-full">v2.0</Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          SynapHack 3.0 Ready
        </div>
      </div>
    </div>
  );
}