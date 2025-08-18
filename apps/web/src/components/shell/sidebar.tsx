"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Home, Trophy, Users, Megaphone, Settings, SquareStack, Layers } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Events", href: "/events", icon: SquareStack },
  { label: "Submissions", href: "/submissions", icon: Layers },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Announcements", href: "/announcements", icon: Megaphone },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="mb-2 px-2">
        <Link href="/dashboard" className="block">
          <div className="text-xl font-semibold tracking-tight">HackHub</div>
          <div className="text-sm text-muted-foreground">Organize. Build. Judge.</div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]"
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-2">
        <Badge className="rounded-full">Live</Badge>
      </div>
    </div>
  );
}