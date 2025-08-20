export const dynamic = "force-dynamic";

import { listEvents, type EventListItem } from "@/server/queries/events";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EventsPage() {
  const events: EventListItem[] = await listEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {events.length === 0 && (
          <div className="text-sm opacity-70">No events yet.</div>
        )}

        {events.map((e) => (
          <Link
            key={e.id}
            href={`/events/${e.slug}`}
            className="block rounded-xl border border-[hsl(var(--border))] px-4 py-3 hover:bg-[hsl(var(--muted))]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{e.name}</span>
              <span className="text-sm opacity-70">
                {new Intl.DateTimeFormat(undefined, {
                  month: "short",
                  day: "2-digit",
                }).format(new Date(e.startsAt))}
              </span>
            </div>

            {e.tracks.length > 0 && (
              <p className="text-sm opacity-70 mt-1">
                Tracks: {e.tracks.map((t) => t.name).join(" • ")}
              </p>
            )}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
