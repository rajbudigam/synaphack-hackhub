"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  Users, 
  FileText, 
  Settings,
  Bot,
  Sparkles,
  BarChart3,
  Zap,
  Crown,
  Shield,
  ChevronRight,
  ChevronDown,
  Radio,
  Award,
  Code,
  BookOpen,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const coreFeatures = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/dashboard",
    description: "Main overview"
  },
  { 
    icon: Calendar, 
    label: "Events", 
    href: "/events",
    description: "Manage hackathons"
  },
  { 
    icon: Trophy, 
    label: "Leaderboard", 
    href: "/leaderboard",
    description: "Rankings & scores",
    badge: "Live"
  },
  { 
    icon: Users, 
    label: "Teams", 
    href: "/teams",
    description: "Team collaboration"
  },
  { 
    icon: Code, 
    label: "Submissions", 
    href: "/submissions",
    description: "Project submissions"
  },
];

const advancedFeatures = [
  { 
    icon: Shield, 
    label: "AI Plagiarism", 
    href: "/plagiarism",
    description: "Smart content analysis",
    badge: "AI",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    icon: Award, 
    label: "POAPs", 
    href: "/poaps",
    description: "Web3 achievements",
    badge: "Web3",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    href: "/analytics",
    description: "Deep insights",
    badge: "Pro"
  },
  { 
    icon: Crown, 
    label: "Certificates", 
    href: "/certificates",
    description: "Digital credentials",
    gradient: "from-yellow-500 to-orange-500"
  },
  { 
    icon: BookOpen, 
    label: "Mentorship", 
    href: "/mentors",
    description: "Expert guidance"
  },
  { 
    icon: Radio, 
    label: "Live Updates", 
    href: "/live",
    description: "Real-time events",
    badge: "Beta",
    gradient: "from-red-500 to-pink-500"
  },
];

const adminFeatures = [
  { 
    icon: Bell, 
    label: "Announcements", 
    href: "/announcements",
    description: "System notifications"
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
    description: "System configuration"
  },
];

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  description?: string;
  badge?: string;
  gradient?: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, label, href, description, badge, gradient, isActive }: SidebarItemProps) {
  return (
    <Link href={href} className="group block">
      <div className={cn(
        "relative flex items-center gap-3 rounded-xl p-3 transition-all duration-300",
        "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10",
        "hover:shadow-lg hover:shadow-primary/10",
        "border border-transparent hover:border-primary/20",
        isActive && "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 shadow-lg shadow-primary/10"
      )}>
        {/* Icon with gradient background for special features */}
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
          gradient 
            ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
            : "bg-muted group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {label}
            </span>
            {badge && (
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-2 py-0.5 font-medium",
                  badge === "Live" && "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
                  badge === "AI" && "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
                  badge === "Web3" && "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
                  badge === "Pro" && "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
                  badge === "Beta" && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                )}
              >
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
        
        {/* Hover indicator */}
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-r-full" />
        )}
      </div>
    </Link>
  );
}

interface SidebarSectionProps {
  title: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    description?: string;
    badge?: string;
    gradient?: string;
  }>;
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

function SidebarSection({ title, features, defaultExpanded = true, icon: SectionIcon }: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-2 h-auto font-medium text-sm hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          {SectionIcon && <SectionIcon className="w-4 h-4" />}
          <span>{title}</span>
        </div>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </Button>
      
      {isExpanded && (
        <div className="space-y-1 animate-slide-up">
          {features.map((feature) => (
            <SidebarItem
              key={feature.href}
              icon={feature.icon}
              label={feature.label}
              href={feature.href}
              description={feature.description}
              badge={feature.badge}
              gradient={feature.gradient}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="h-full bg-card/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gradient-primary">HackHub</h1>
            <p className="text-xs text-muted-foreground">Next-Gen Platform</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        <SidebarSection 
          title="Core Features" 
          features={coreFeatures}
          icon={LayoutDashboard}
        />
        
        <SidebarSection 
          title="Advanced Features" 
          features={advancedFeatures}
          icon={Sparkles}
        />
        
        <SidebarSection 
          title="Administration" 
          features={adminFeatures}
          defaultExpanded={false}
          icon={Shield}
        />
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-gray-200/50 dark:border-gray-800/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">System Status</p>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}