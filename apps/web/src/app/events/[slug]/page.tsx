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
import { prisma } from "@/lib/prisma";
import { BackButton } from "@/components/ui/back-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to safely parse JSON
function parseJSON(data: any, fallback: any = []) {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export default async function EventDetail({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch real event data from database
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      tracks: true,
      rounds: true,
      sponsors: true,
      teams: {
        include: {
          _count: {
            select: { members: true }
          }
        },
        take: 10
      },
      submissions: {
        include: {
          team: {
            select: { name: true }
          },
          _count: {
            select: { scores: true }
          }
        },
        take: 10,
        orderBy: { createdAt: 'desc' }
      },
      announcements: {
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      _count: {
        select: {
          registrations: true,
          teams: true,
          submissions: true
        }
      }
    }
  });
  
  if (!event) return notFound();

  const isActive = event.status === 'published' || event.status === 'active';
  const isEnded = event.status === 'completed';
  const startDate = new Date(event.startsAt);
  const endDate = new Date(event.endsAt);
  
  const schedule = parseJSON(event.schedule, []);
  const mentorsList = parseJSON(event.mentorsList, []);
  const tags = parseJSON(event.tags, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton href="/events" label="Back to Events" />
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant={isActive ? "default" : isEnded ? "secondary" : "outline"} 
                         className="text-white bg-white/20">
                    {isActive ? "Active" : isEnded ? "Completed" : "Upcoming"}
                  </Badge>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold">{event.name}</h1>
                <p className="text-xl text-blue-100 max-w-2xl">{event.description}</p>
                
                <div className="flex items-center gap-6 text-blue-100 flex-wrap">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.mode === 'offline' ? 'In-Person' : event.mode === 'online' ? 'Virtual' : 'Hybrid'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Max {event.maxTeamSize} per team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{event.prizeMoney}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                  <Bell className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 divide-x border-t">
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{event._count.registrations}</div>
              <div className="text-sm text-gray-500">Registrations</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{event._count.teams}</div>
              <div className="text-sm text-gray-500">Teams</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{event._count.submissions}</div>
              <div className="text-sm text-gray-500">Submissions</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {event.longDescription && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {event.longDescription}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tracks/Categories */}
            {event.tracks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Event Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {event.tracks.map((track) => {
                      const prizes = parseJSON(track.prizes, {});
                      return (
                        <div key={track.id} className="border rounded-lg p-4" style={{ borderColor: track.color || '#e5e7eb' }}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg" style={{ color: track.color || 'inherit' }}>
                                {track.name}
                              </h3>
                              {track.description && (
                                <p className="text-gray-600 mt-1">{track.description}</p>
                              )}
                            </div>
                            {Object.keys(prizes).length > 0 && (
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  1st: {prizes.first || 'TBA'}
                                </div>
                                {prizes.second && (
                                  <div className="text-xs text-gray-600">2nd: {prizes.second}</div>
                                )}
                                {prizes.third && (
                                  <div className="text-xs text-gray-600">3rd: {prizes.third}</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  Recent Submissions ({event._count.submissions})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.submissions.length > 0 ? (
                    event.submissions.map((submission) => {
                      const techStack = parseJSON(submission.techStack, []);
                      const features = parseJSON(submission.features, []);
                      
                      return (
                        <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">{submission.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {submission.team?.name || 'No Team'}
                                </Badge>
                                <Badge 
                                  variant={submission.status === 'submitted' ? 'default' : 'secondary'} 
                                  className="text-xs"
                                >
                                  {submission.status}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600">{submission.description}</p>
                              
                              {features.length > 0 && (
                                <div className="space-y-1">
                                  <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {features.slice(0, 3).map((feature: string, index: number) => (
                                      <li key={index}>{feature}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {techStack.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {techStack.slice(0, 5).map((tech: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {techStack.length > 5 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{techStack.length - 5} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                                <span>{submission._count.scores} evaluations</span>
                                <div className="flex gap-2">
                                  {submission.liveUrl && (
                                    <Button size="sm" variant="outline" className="text-xs" asChild>
                                      <Link href={submission.liveUrl} target="_blank">
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        Live Demo
                                      </Link>
                                    </Button>
                                  )}
                                  {submission.repoUrl && (
                                    <Button size="sm" variant="outline" className="text-xs" asChild>
                                      <Link href={submission.repoUrl} target="_blank">
                                        <Code className="w-3 h-3 mr-1" />
                                        Repository
                                      </Link>
                                    </Button>
                                  )}
                                  {submission.videoUrl && (
                                    <Button size="sm" variant="outline" className="text-xs" asChild>
                                      <Link href={submission.videoUrl} target="_blank">
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        Video
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No submissions yet. Be the first to submit your project!</p>
                    </div>
                  )}
                </div>
                
                {event.submissions.length > 0 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/submissions">
                        View All Submissions
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Teams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Teams ({event._count.teams})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {event.teams.length > 0 ? (
                    event.teams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {team.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{team.name}</h4>
                            <p className="text-sm text-gray-500">{team._count.members} members</p>
                          </div>
                        </div>
                        <Badge variant={team.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {team.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No teams formed yet. Create your team now!</p>
                    </div>
                  )}
                </div>
                
                {event.teams.length > 0 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/teams">
                        View All Teams
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/teams/create">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Team
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/submissions">
                    <Target className="w-4 h-4 mr-2" />
                    Submit Project
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Event Resources
                </Button>
              </CardContent>
            </Card>

            {/* Schedule */}
            {schedule.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.slice(0, 5).map((item: any, index: number) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-gray-600">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.announcements.length > 0 ? (
                    event.announcements.map((announcement) => (
                      <div key={announcement.id} className="space-y-2">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        <p className="text-xs text-gray-600">{announcement.content}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No announcements yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mentors */}
            {mentorsList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mentors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mentorsList.map((mentor: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={mentor.image} />
                          <AvatarFallback className="text-xs">
                            {mentor.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium">{mentor.name}</span>
                          {mentor.company && (
                            <p className="text-xs text-gray-500">{mentor.company}</p>
                          )}
                          {mentor.expertise && (
                            <p className="text-xs text-gray-500">{mentor.expertise}</p>
                          )}
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
    </div>
  );
}
