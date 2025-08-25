import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Trophy, 
  Target, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Crown,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import { User, Event, TeamWithMembers, Submission } from '@/types/database';

interface DashboardProps {
  currentUser: User;
  events: Event[];
  teams: TeamWithMembers[];
  submissions: Submission[];
  analytics?: any;
}

export default function RoleBasedDashboard({ currentUser, events, teams, submissions, analytics }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const userRole = currentUser.role; // participant, organizer, judge, mentor

  // Organize data based on user role
  const userEvents = events.filter(event => {
    switch (userRole) {
      case 'organizer':
        return true; // Organizers can see all events they have access to
      case 'judge':
        return true; // Judges can see events they're judging
      case 'mentor':
        return true; // Mentors can see events they're mentoring
      default:
        return true; // Participants see published events
    }
  });

  const userTeams = teams.filter(team => 
    team.members?.some((member: any) => member.userId === currentUser.id)
  );

  const userSubmissions = submissions.filter(submission =>
    userTeams.some(team => team.id === submission.teamId)
  );

  // Dashboard content for different roles
  const renderParticipantDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Events Joined</span>
            </div>
            <p className="text-2xl font-bold mt-2">{userTeams.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Teams</span>
            </div>
            <p className="text-2xl font-bold mt-2">{userTeams.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Submissions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{userSubmissions.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Wins</span>
            </div>
            <p className="text-2xl font-bold mt-2">0</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Events */}
      <Card>
        <CardHeader>
          <CardTitle>Your Active Events</CardTitle>
        </CardHeader>
        <CardContent>
          {userEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No active events. Join an event to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{event.name}</h3>
                    <Badge variant={event.status === 'ongoing' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{new Date(event.startsAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{event.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your Teams</CardTitle>
        </CardHeader>
        <CardContent>
          {userTeams.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">You're not part of any team yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userTeams.map((team) => (
                <div key={team.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{team.name}</h3>
                    <Badge variant="outline">{team.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{team.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderOrganizerDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Events</span>
            </div>
            <p className="text-2xl font-bold mt-2">{events.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Total Teams</span>
            </div>
            <p className="text-2xl font-bold mt-2">{teams.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Submissions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{submissions.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Completion Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {Math.round((submissions.length / Math.max(teams.length, 1)) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Event Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Event Management
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage Events
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{event.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Teams:</span>
                    <span className="font-medium ml-1">
                      {teams.filter(t => t.eventId === event.id).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Submissions:</span>
                    <span className="font-medium ml-1">
                      {submissions.filter(s => s.eventId === event.id).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium ml-1">{event.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto text-blue-500 mb-3" />
            <h3 className="font-medium mb-2">Create Event</h3>
            <p className="text-sm text-gray-600 mb-4">Start a new hackathon event</p>
            <Button size="sm" className="w-full">Create</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto text-green-500 mb-3" />
            <h3 className="font-medium mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">Track event performance</p>
            <Button size="sm" variant="outline" className="w-full">Analyze</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Download className="w-8 h-8 mx-auto text-purple-500 mb-3" />
            <h3 className="font-medium mb-2">Export Data</h3>
            <p className="text-sm text-gray-600 mb-4">Download reports and data</p>
            <Button size="sm" variant="outline" className="w-full">Export</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderJudgeDashboard = () => (
    <div className="space-y-6">
      {/* Judging Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">To Review</span>
            </div>
            <p className="text-2xl font-bold mt-2">{submissions.filter(s => s.status === 'submitted').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Reviewed</span>
            </div>
            <p className="text-2xl font-bold mt-2">{submissions.filter(s => s.status === 'reviewed').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-2xl font-bold mt-2">{submissions.filter(s => s.status === 'under_review').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="mt-2">
              <Progress 
                value={(submissions.filter(s => s.status === 'reviewed').length / Math.max(submissions.length, 1)) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions to Review */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions to Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.filter(s => s.status === 'submitted').map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{submission.title}</h3>
                  <Badge variant="outline">Submitted</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{submission.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Team: {submission.teamId}
                  </span>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMentorDashboard = () => (
    <div className="space-y-6">
      {/* Mentoring Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Teams Mentoring</span>
            </div>
            <p className="text-2xl font-bold mt-2">{teams.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Events</span>
            </div>
            <p className="text-2xl font-bold mt-2">{events.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">85%</p>
          </CardContent>
        </Card>
      </div>

      {/* Teams to Mentor */}
      <Card>
        <CardHeader>
          <CardTitle>Your Mentee Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{team.name}</h3>
                  <Badge variant="outline">{team.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Last contact: 2 days ago
                  </span>
                  <Button size="sm" variant="outline">Message Team</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h1 className="text-2xl font-bold">
            {userRole === 'organizer' && 'Organizer Dashboard'}
            {userRole === 'judge' && 'Judge Dashboard'}
            {userRole === 'mentor' && 'Mentor Dashboard'}
            {userRole === 'participant' && 'Participant Dashboard'}
          </h1>
        </div>
        <p className="text-gray-600">
          Welcome back, {currentUser.name}! Here's your personalized overview.
        </p>
      </div>

      {/* Role-specific content */}
      {userRole === 'participant' && renderParticipantDashboard()}
      {userRole === 'organizer' && renderOrganizerDashboard()}
      {userRole === 'judge' && renderJudgeDashboard()}
      {userRole === 'mentor' && renderMentorDashboard()}
    </div>
  );
}
