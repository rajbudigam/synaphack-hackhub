import { listEvents, EventListItem } from "@/server/queries/events";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, Plus, Clock } from "lucide-react";

export default async function EventsPage() {
  const events = await listEvents();

  const upcomingEvents = events.filter((e: EventListItem) => new Date(e.startsAt) > new Date());
  const pastEvents = events.filter((e: EventListItem) => new Date(e.endsAt) < new Date());
  const ongoingEvents = events.filter((e: EventListItem) => 
    new Date(e.startsAt) <= new Date() && new Date(e.endsAt) >= new Date()
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">
            Discover and participate in exciting hackathons and events
          </p>
        </div>
        <Button asChild>
          <Link href="/events/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">🔥 Live Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingEvents.map((event: EventListItem) => (
              <EventCard key={event.id} event={event} status="live" />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">📅 Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event: EventListItem) => (
              <EventCard key={event.id} event={event} status="upcoming" />
            ))}
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">🏆 Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event: EventListItem) => (
              <EventCard key={event.id} event={event} status="past" />
            ))}
          </div>
        </section>
      )}

      {/* No Events */}
      {events.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to create an exciting hackathon or event!
            </p>
            <Button asChild>
              <Link href="/events/create">Create Your First Event</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function EventCard({ event, status }: { event: EventListItem; status: "live" | "upcoming" | "past" }) {
  const statusConfig = {
    live: { variant: "destructive" as const, label: "Live", icon: "🔴" },
    upcoming: { variant: "default" as const, label: "Upcoming", icon: "📅" },
    past: { variant: "secondary" as const, label: "Completed", icon: "✅" },
  };

  const config = statusConfig[status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="line-clamp-2">{event.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={config.variant} className="text-xs">
                {config.icon} {config.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {event.mode}
              </Badge>
            </div>
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {event.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(event.startsAt).toLocaleDateString()} - {new Date(event.endsAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(event.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {event.tracks && event.tracks.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4" />
              <div className="flex flex-wrap gap-1">
                {event.tracks.slice(0, 2).map((track: { id: string; name: string }) => (
                  <Badge key={track.id} variant="outline" className="text-xs">
                    {track.name}
                  </Badge>
                ))}
                {event.tracks.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{event.tracks.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/events/${event.slug}`}>
              {status === "live" ? "Join Now" : status === "upcoming" ? "Learn More" : "View Results"}
            </Link>
          </Button>
          
          {status !== "past" && (
            <Button variant="outline" size="icon" asChild>
              <Link href={`/events/${event.slug}/register`}>
                <Users className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
