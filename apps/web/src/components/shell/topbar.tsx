"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Command, User, Settings, LogOut, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/50 bg-card/60 backdrop-blur-xl shadow-md relative">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="relative mx-auto flex max-w-screen-2xl items-center gap-4 px-4 py-3 md:px-6">
        {/* Search Section */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 w-[380px] bg-muted/50 border-gray-200/50 dark:border-gray-800/50 focus:border-primary/50 focus:bg-background transition-all duration-200" 
              placeholder="Search events, teams, submissions…" 
            />
          </div>
          
          {/* Quick Status */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {/* Command Menu */}
          <Button 
            variant="ghost" 
            className="hidden sm:inline-flex hover:bg-muted/50 transition-colors" 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Command className="mr-2 h-4 w-4" />
            <span className="hidden lg:inline">Quick Actions</span>
            <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Notifications"
            className="relative hover:bg-muted/50 transition-colors group"
          >
            <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </Button>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

function UserMenu() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="rounded-full outline-none ring-offset-2 focus:ring-2 focus:ring-primary transition-all duration-200 hover:scale-105">
          <Avatar className="h-9 w-9 ring-2 ring-border/50 hover:ring-primary/50 transition-all duration-200">
            <AvatarImage src="https://i.pravatar.cc/80" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
              HB
            </AvatarFallback>
          </Avatar>
        </button>
      </Dropdown.Trigger>
      
      <Dropdown.Content 
        className="z-50 min-w-[240px] rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-card/95 backdrop-blur-xl p-2 shadow-xl animate-scale-in" 
        sideOffset={8}
      >
        {/* User Info */}
        <div className="px-3 py-3 border-b border-gray-200/50 dark:border-gray-800/50 mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/80" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
                HB
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">HackBuilder Pro</div>
              <div className="text-xs text-muted-foreground truncate">hackbuilder@synaphack.com</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              Pro Member
            </Badge>
          </div>
        </div>

        {/* Menu Items */}
        <Dropdown.Item className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 transition-colors cursor-pointer">
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </Dropdown.Item>
        
        <Dropdown.Item className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 transition-colors cursor-pointer">
          <Settings className="w-4 h-4" />
          <span>Preferences</span>
        </Dropdown.Item>

        <Dropdown.Separator className="my-2 h-px bg-border/50" />
        
        <Dropdown.Item className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}