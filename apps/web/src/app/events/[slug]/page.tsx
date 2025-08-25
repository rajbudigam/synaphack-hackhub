import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  DollarSign, 
  ExternalLink,
  Download,
  Share,
  Bell,
  UserPlus,
  Code,
  Target
} from "lucide-react";
import Link from "next/link";

// Mock types
interface MockAnnouncement {
  id: string;
  title: string;
export default async function EventDetail({ params }: PageProps) {
  const { slug } = await params;
  
  // Get mock event data
  const event = mockEvents[slug];
  
  if (!event) return notFound();
      {
        id: "2",
        title: "Smart City Dashboard",
        description: "Real-time city analytics platform",
        liveUrl: "https://city.example.com",
        repoUrl: "https://github.com/team/city",
        team: { name: "Tech Titans" },
        _count: { scores: 18 }
      }
    ],
    teams: [
      { id: "1", name: "Code Crusaders", status: "active", _count: { members: 4 } },
      { id: "2", name: "Tech Titans", status: "active", _count: { members: 3 } },
      { id: "3", name: "Innovation Squad", status: "active", _count: { members: 5 } }
    ],
    announcements: [
      {
        id: "1",
        title: "Welcome to SynapHack 3.0!",
        content: "Event starts in 2 hours. Make sure you've checked in!",
        type: "general",
        createdAt: new Date("2025-08-29")
      }
    ],
    mentors: [
      { id: "1", name: "Dr. Sarah Chen", avatar: "" },
      { id: "2", name: "Michael Johnson", avatar: "" }
    ],
    _count: {
      registrations: 180,
      teams: 45,
      submissions: 23
    }
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetail({ params }: PageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      tracks: true,
      rounds: true,
      teams: {
        include: {
          members: {
            include: {
              user: true
            }
          },
          submissions: true,
          _count: {
            select: { 
              members: true,
              submissions: true 
            }
          }
        },
        take: 10
      },
      submissions: {
        include: {
          team: {
            include: {
              members: {
                include: {
                  user: true
                }
              }
            }
          },
          track: true,
          round: true,
          scores: true,
          _count: {
            select: { scores: true }
          }
        },
        orderBy: { createdAt: "desc" },
        take: 10
      },
      announcements: {
        include: {
          author: true
        },
        orderBy: { createdAt: "desc" },
        take: 5
      },
      registrations: {
        include: {
          user: true,
          team: true
        },
        take: 10
      },
      organizers: true,
      judges: true,
      mentors: true,
      analytics: true,
      _count: {
        select: {
          teams: true,
          submissions: true,
          registrations: true,
          announcements: true
        }
      }
    }
  });

  if (!event) return notFound();

  const isOngoing = new Date(event.startsAt) <= new Date() && new Date(event.endsAt) >= new Date();
  const isUpcoming = new Date(event.startsAt) > new Date();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{event.name}</h1>
              <Badge variant={isOngoing ? "default" : isUpcoming ? "outline" : "secondary"}>
                {isOngoing ? "Live" : isUpcoming ? "Upcoming" : "Ended"}
              </Badge>
            </div>
            {event.description && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {event.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              {isOngoing ? "Join Now" : "Register"}
            </Button>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">
                {new Date(event.startsAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">Start Date</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">
                {Math.ceil((new Date(event.endsAt).getTime() - new Date(event.startsAt).getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">{event.mode}</div>
              <div className="text-sm text-muted-foreground">Mode</div>
            </div>
          </div>
          {event.prizeMoney && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{event.prizeMoney}</div>
                <div className="text-sm text-muted-foreground">Prize Pool</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>{event.description || "Join us for an exciting hackathon experience!"}</p>
                
                {event.rules && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Rules & Guidelines</h4>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {event.rules}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Guidelines PDF
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline/Schedule */}
          {event.schedule && (
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {event.schedule}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sponsors */}
          {event.sponsors && (
            <Card>
              <CardHeader>
                <CardTitle>Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {(event.sponsors ? JSON.parse(event.sponsors) : []).map((sponsor: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {sponsor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submissions */}
          {event.submissions.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Submissions</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/events/${slug}/submissions`}>View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {event.submissions.map((submission: MockSubmission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{submission.title}</h4>
                        <Badge variant="outline">
                          {submission._count?.scores || 0} votes
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {submission.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{submission.team?.name}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={submission.liveUrl || "#"}>Demo</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={submission.repoUrl || "#"}>
                              <Code className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Participants</span>
                </div>
                <span className="font-medium">{event._count.registrations}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span>Teams</span>
                </div>
                <span className="font-medium">{event._count.teams}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>Submissions</span>
                </div>
                <span className="font-medium">{event._count.submissions}</span>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          {event.teams.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leaderboard</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/events/${slug}/leaderboard`}>View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.teams.map((team: MockTeam, index: number) => (
                    <div key={team.id} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {team._count?.members || 0} members
                        </div>
                      </div>
                      <Badge variant="outline">{team.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Announcements */}
          {event.announcements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {event.announcements.map((announcement: MockAnnouncement) => (
                  <div key={announcement.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{announcement.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{announcement.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Mentors */}
          {event.mentors && event.mentors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.mentors.map((mentor: MockUser, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={mentor.avatar || undefined} />
                        <AvatarFallback>{mentor.name?.split(' ').map((n: string) => n[0]).join('') || 'M'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{mentor.name || 'Unknown Mentor'}</div>
                        <div className="text-sm text-muted-foreground">Mentor</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
