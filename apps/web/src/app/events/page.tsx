import Link from "next/link";
import { listEvents } from "@/server/queries/events";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function EventsPage() {
  const events = await listEvents();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>All events</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {events.map(e => (
            <Link key={e.id} href={`/events/${e.slug}`}
              className="block rounded-xl border border-[hsl(var(--border))] px-4 py-3 hover:bg-[hsl(var(--muted))]">
              <div className="flex items-center justify-between">
                <div className="font-medium">{e.name}</div>
                <div className="text-sm opacity-70">
                  {new Intl.DateTimeFormat(undefined,{month:"short",day:"2-digit"}).format(e.startsAt)}
                </div>
              </div>
              {e.tracks.length>0 && (
                <div className="mt-1 text-sm opacity-70">Tracks: {e.tracks.map(t=>t.name).join(" • ")}</div>
              )}
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Upcoming</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {events.slice(0,4).map(e => (
            <Link key={e.id} href={`/events/${e.slug}`} className="block rounded-lg border px-3 py-2 hover:bg-[hsl(var(--muted))]">
              <div className="text-sm font-medium">{e.name}</div>
              <div className="text-xs opacity-70">
                {new Intl.DateTimeFormat(undefined,{dateStyle:"medium"}).format(e.startsAt)}
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
