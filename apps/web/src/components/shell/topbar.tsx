"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, Command } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

export function Topbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 opacity-60" />
            <Input className="pl-9 w-[340px]" placeholder="Search events, teams, submissions…" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
            <Command className="mr-2 h-4 w-4" /> Command
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
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
        <button className="rounded-full outline-none ring-offset-2 focus:ring-2 focus:ring-[hsl(var(--ring))]">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/80" />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className="z-50 min-w-[200px] rounded-xl border bg-[hsl(var(--card))] p-2 shadow-soft" sideOffset={8}>
        <Dropdown.Item className="rounded-lg px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]">Profile</Dropdown.Item>
        <Dropdown.Item className="rounded-lg px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]">Settings</Dropdown.Item>
        <Dropdown.Separator className="my-1 h-px bg-[hsl(var(--border))]" />
        <Dropdown.Item className="rounded-lg px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]">Sign out</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}