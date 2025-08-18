"use client";
import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] ${open ? "block" : "hidden"}`}
      onClick={() => setOpen(false)}
    >
      <div className="mx-auto mt-24 max-w-xl rounded-2xl border bg-[hsl(var(--card))] p-2 shadow-soft" onClick={(e) => e.stopPropagation()}>
        <Command label="Global search">
          <Command.Input placeholder="Jump to: events, teams, submissions…" />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
              {[
                { k: "Dashboard", href: "/dashboard" },
                { k: "Events", href: "/events" },
                { k: "Submissions", href: "/submissions" },
                { k: "Leaderboard", href: "/leaderboard" },
              ].map((item) => (
                <Command.Item
                  key={item.href}
                  onSelect={() => { router.push(item.href); setOpen(false); }}
                >
                  {item.k}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}