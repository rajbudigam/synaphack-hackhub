import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Trophy, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Award,
  PieChart,
  Activity,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Event, Team, Submission, User } from '@/types/database';

interface AnalyticsData {
  eventMetrics: {
    totalEvents: number;
    activeEvents: number;
    completedEvents: number;
    totalParticipants: number;
    averageTeamSize: number;
    submissionRate: number;
  };
  participationTrends: {
    date: string;
    registrations: number;
    submissions: number;
    activeUsers: number;
  }[];
  teamAnalytics: {
    totalTeams: number;
    averageSize: number;
    completionRate: number;
    topPerformingTeams: string[];
  };
  submissionAnalytics: {
    totalSubmissions: number;
    completedSubmissions: number;
    averageScore: number;
    topTechnologies: { name: string; count: number }[];
  };
  userEngagement: {
    dailyActiveUsers: number;
    retentionRate: number;
    engagementScore: number;
    topContributors: User[];
  };
  geographicData: {
    country: string;
    participants: number;
  }[];
}

interface AnalyticsDashboardProps {
  events: Event[];
  teams: Team[];
  submissions: Submission[];
  users: User[];
}

export default function AnalyticsDashboard({ events, teams, submissions, users }: AnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock analytics data
  useEffect(() => {
    const generateAnalyticsData = (): AnalyticsData => {
      // Event metrics
      const activeEvents = events.filter(e => e.status === 'ongoing').length;
      const completedEvents = events.filter(e => e.status === 'completed').length;
      const totalParticipants = users.filter(u => u.role === 'participant').length;
      
      // Team analytics - teams don't have members directly in this context
      const teamSizes = [3, 4, 2, 5, 3, 4, 2]; // Mock team sizes
      const averageTeamSize = teamSizes.reduce((sum, size) => sum + size, 0) / Math.max(teamSizes.length, 1);
      
      // Submission analytics
      const completedSubmissions = submissions.filter(s => s.status === 'submitted').length;
      const submissionRate = (completedSubmissions / Math.max(teams.length, 1)) * 100;
      
      // Mock participation trends (last 30 days)
      const participationTrends = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          registrations: Math.floor(Math.random() * 50) + 10,
          submissions: Math.floor(Math.random() * 20) + 5,
          activeUsers: Math.floor(Math.random() * 100) + 50
        };
      });
      
      // Mock technology usage
      const technologies = ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'];
      const topTechnologies = technologies.map(tech => ({
        name: tech,
        count: Math.floor(Math.random() * 30) + 5
      })).sort((a, b) => b.count - a.count).slice(0, 8);
      
      // Mock geographic data
      const countries = ['United States', 'India', 'Germany', 'United Kingdom', 'Canada', 'Australia', 'France', 'Brazil', 'Japan', 'Netherlands'];
      const geographicData = countries.map(country => ({
        country,
        participants: Math.floor(Math.random() * 100) + 10
      })).sort((a, b) => b.participants - a.participants);

      return {
        eventMetrics: {
          totalEvents: events.length,
          activeEvents,
          completedEvents,
          totalParticipants,
          averageTeamSize: Math.round(averageTeamSize * 10) / 10,
          submissionRate: Math.round(submissionRate)
        },
        participationTrends,
        teamAnalytics: {
          totalTeams: teams.length,
          averageSize: Math.round(averageTeamSize * 10) / 10,
          completionRate: Math.round(submissionRate),
          topPerformingTeams: teams.slice(0, 5).map(t => t.name)
        },
        submissionAnalytics: {
          totalSubmissions: submissions.length,
          completedSubmissions,
          averageScore: Math.round((Math.random() * 40 + 60) * 10) / 10,
          topTechnologies
        },
        userEngagement: {
          dailyActiveUsers: Math.floor(Math.random() * 200) + 100,
          retentionRate: Math.round((Math.random() * 30 + 70) * 10) / 10,
          engagementScore: Math.round((Math.random() * 20 + 80) * 10) / 10,
          topContributors: users.slice(0, 5)
        },
        geographicData
      };
    };

    setIsLoading(true);
    setTimeout(() => {
      setAnalyticsData(generateAnalyticsData());
      setIsLoading(false);
    }, 1000);
  }, [events, teams, submissions, users, selectedTimeRange]);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAnalyticsData(prev => prev ? { ...prev } : null);
      setIsLoading(false);
    }, 500);
  };

  if (!analyticsData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4 animate-pulse" />
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            </div>
            <p className="text-gray-600">
              Comprehensive insights into hackathon performance and engagement
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Events</span>
            </div>
            <p className="text-2xl font-bold mt-2">{analyticsData.eventMetrics.totalEvents}</p>
            <p className="text-xs text-gray-500 mt-1">
              {analyticsData.eventMetrics.activeEvents} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Total Participants</span>
            </div>
            <p className="text-2xl font-bold mt-2">{analyticsData.eventMetrics.totalParticipants}</p>
            <p className="text-xs text-gray-500 mt-1">
              Avg team size: {analyticsData.eventMetrics.averageTeamSize}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Submission Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">{analyticsData.eventMetrics.submissionRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {analyticsData.submissionAnalytics.completedSubmissions} submissions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Engagement Score</span>
            </div>
            <p className="text-2xl font-bold mt-2">{analyticsData.userEngagement.engagementScore}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {analyticsData.userEngagement.dailyActiveUsers} daily active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Participation Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Participation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Participation chart visualization</p>
                <p className="text-xs text-gray-500">
                  Peak: {Math.max(...analyticsData.participationTrends.map(d => d.registrations))} registrations/day
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.submissionAnalytics.topTechnologies.map((tech, index) => (
                <div key={tech.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 max-w-32">
                    <Progress value={(tech.count / Math.max(...analyticsData.submissionAnalytics.topTechnologies.map(t => t.count))) * 100} className="h-2" />
                    <span className="text-xs text-gray-500 min-w-8">{tech.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Teams</span>
                <span className="font-medium">{analyticsData.teamAnalytics.totalTeams}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Size</span>
                <span className="font-medium">{analyticsData.teamAnalytics.averageSize}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="font-medium">{analyticsData.teamAnalytics.completionRate}%</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Top Performing Teams</h4>
                <div className="space-y-1">
                  {analyticsData.teamAnalytics.topPerformingTeams.map((team, index) => (
                    <div key={team} className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span className="text-gray-600">{team}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-2">
                  <div className="w-24 h-24 rounded-full border-8 border-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{analyticsData.userEngagement.retentionRate}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Retention Rate</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Daily Active</span>
                  <span className="font-medium">{analyticsData.userEngagement.dailyActiveUsers}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="font-medium">{analyticsData.userEngagement.engagementScore}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analyticsData.geographicData.slice(0, 8).map((location, index) => (
                <div key={location.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm">{location.country}</span>
                  </div>
                  <span className="text-sm font-medium">{location.participants}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analyticsData.submissionAnalytics.totalSubmissions}
              </div>
              <p className="text-sm text-gray-600">Total Submissions</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {analyticsData.submissionAnalytics.completedSubmissions}
              </div>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {analyticsData.submissionAnalytics.averageScore}
              </div>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((analyticsData.submissionAnalytics.completedSubmissions / Math.max(analyticsData.submissionAnalytics.totalSubmissions, 1)) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
