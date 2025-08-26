"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Trophy, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Award,
  Building2,
  UserCheck
} from "lucide-react";

interface AnalyticsData {
  teams: {
    total: number;
    registered: number;
    submitted: number;
  };
  submissions: {
    total: number;
    pending: number;
    evaluated: number;
  };
  judges: {
    total: number;
    active: number;
    assignments: number;
  };
  timeline: Array<{
    date: string;
    registrations: number;
    submissions: number;
  }>;
  distribution: {
    teamSizes: Array<{ size: number; count: number; }>;
    submissionTracks: Array<{ track: string; count: number; }>;
  };
}

interface Event {
  id: string;
  name: string;
  slug: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function OrganizerDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch analytics when event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchAnalytics(selectedEvent);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data.events || []);
      
      // Auto-select first event if available
      if (data.events && data.events.length > 0) {
        setSelectedEvent(data.events[0].id);
      }
    } catch (err) {
      setError('Failed to load events');
      console.error('Events fetch error:', err);
    }
  };

  const fetchAnalytics = async (eventId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?eventId=${eventId}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const data = await response.json();
      setAnalytics(data.analytics);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEventProgress = (event: Event) => {
    const now = new Date();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / total) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  if (error && !analytics) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage events, monitor progress, and track performance
          </p>
        </div>
        
        {/* Event Selector */}
        {events.length > 0 && (
          <div className="flex items-center space-x-2">
            <label htmlFor="event-select" className="text-sm font-medium">
              Event:
            </label>
            <select
              id="event-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Event Overview Cards */}
      {events.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedEvent === event.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedEvent(event.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium truncate">
                    {event.name}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs text-white ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={getEventProgress(event)} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    <span>{new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Analytics Dashboard */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analytics ? (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.teams.total}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.teams.registered} registered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.submissions.total}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.submissions.pending} pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Judges Active</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.judges.active}</div>
                <p className="text-xs text-muted-foreground">
                  of {analytics.judges.total} total judges
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.teams.total > 0 
                    ? Math.round((analytics.teams.submitted / analytics.teams.total) * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  teams submitted projects
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracking */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Progress</CardTitle>
                <CardDescription>
                  Track submission review and judging progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Submissions Evaluated</span>
                    <span>{analytics.submissions.evaluated}/{analytics.submissions.total}</span>
                  </div>
                  <Progress 
                    value={analytics.submissions.total > 0 
                      ? (analytics.submissions.evaluated / analytics.submissions.total) * 100 
                      : 0} 
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Judge Assignments</span>
                    <span>{analytics.judges.assignments} active</span>
                  </div>
                  <Progress 
                    value={analytics.judges.total > 0 
                      ? (analytics.judges.active / analytics.judges.total) * 100 
                      : 0} 
                    className="mt-2" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Distribution</CardTitle>
                <CardDescription>
                  Overview of team sizes and track participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.distribution.teamSizes.map((item) => (
                    <div key={item.size} className="flex items-center justify-between">
                      <span className="text-sm">{item.size} member{item.size !== 1 ? 's' : ''}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(item.count / analytics.teams.total) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common management tasks for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  Manage Certificates
                </Button>
                <Button variant="outline" className="justify-start">
                  <Building2 className="mr-2 h-4 w-4" />
                  Sponsor Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Export Analytics
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Event Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              {events.length === 0 
                ? "No events found. Create an event to get started." 
                : "Select an event to view analytics"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
