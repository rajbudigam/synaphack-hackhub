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
interface MockEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  location: string;
  maxTeamSize: number;
  prizes: string[];
  submissions: Array<{
    id: string;
    title: string;
    description: string;
    liveUrl: string;
    repoUrl: string;
    team: { name: string };
    _count: { scores: number };
  }>;
  teams: Array<{
    id: string;
    name: string;
    status: string;
    _count: { members: number };
  }>;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    type: string;
    createdAt: Date;
  }>;
  mentors: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  _count: {
    registrations: number;
    teams: number;
    submissions: number;
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock data
const mockEvents: Record<string, MockEvent> = {
  "synaphack-30": {
    id: "1",
    title: "SynapHack 3.0",
    description: "The ultimate 48-hour hackathon focused on AI, Web3, and emerging technologies.",
    status: "active",
    startDate: "2025-08-29T09:00:00Z",
    endDate: "2025-08-31T18:00:00Z",
    location: "TechHub Innovation Center, San Francisco",
    maxTeamSize: 5,
    prizes: ["$50,000 Grand Prize", "$20,000 Runner-up", "$10,000 People's Choice"],
    submissions: [
      {
        id: "1",
        title: "AI Code Assistant",
        description: "Revolutionary AI-powered coding companion",
        liveUrl: "https://demo.example.com",
        repoUrl: "https://github.com/team/ai-assistant",
        team: { name: "Code Crusaders" },
        _count: { scores: 25 }
      },
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

export default async function EventDetail({ params }: PageProps) {
  const { slug } = await params;
  
  // Get mock event data
  const event = mockEvents[slug];
  
  if (!event) return notFound();

  const isActive = event.status === 'active';
  const isEnded = event.status === 'completed';
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
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
                
                <h1 className="text-4xl font-bold">{event.title}</h1>
                <p className="text-xl text-blue-100 max-w-2xl">{event.description}</p>
                
                <div className="flex items-center gap-6 text-blue-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Max {event.maxTeamSize} per team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>48 hours</span>
                  </div>
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
              <div className="text-sm text-gray-500">Participants</div>
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
            {/* Prizes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Prizes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {event.prizes.map((prize, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{prize}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  Recent Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{submission.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {submission.team.name}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{submission.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{submission._count.scores} votes</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs" asChild>
                                <Link href={submission.liveUrl} target="_blank">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Demo
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs" asChild>
                                <Link href={submission.repoUrl} target="_blank">
                                  <Code className="w-3 h-3 mr-1" />
                                  Code
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {event.teams.map((team) => (
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
                  ))}
                </div>
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
                  <Link href="/teams">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Team
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
                  Resources
                </Button>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.announcements.map((announcement) => (
                    <div key={announcement.id} className="space-y-2">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      <p className="text-xs text-gray-600">{announcement.content}</p>
                      <p className="text-xs text-gray-400">
                        {announcement.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mentors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.mentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback className="text-xs">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{mentor.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
