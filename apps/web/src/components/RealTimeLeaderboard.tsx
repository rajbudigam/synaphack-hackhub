import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp,
  Users,
  Target,
  Clock,
  Award,
  Zap,
  RefreshCw,
  Filter,
  Calendar
} from 'lucide-react';
import { Event, TeamWithMembers, Submission, User } from '@/types/database';

interface LeaderboardEntry {
  id: string;
  teamId: string;
  teamName: string;
  eventId: string;
  eventName: string;
  members: {
    id: string;
    name: string;
    avatar?: string | null;
  }[];
  currentScore: number;
  maxScore: number;
  rank: number;
  previousRank?: number;
  totalSubmissions: number;
  completedChallenges: number;
  lastActivity: Date;
  streak: number;
  badges: string[];
  trend: 'up' | 'down' | 'stable';
}

interface GlobalStats {
  totalTeams: number;
  activeTeams: number;
  totalSubmissions: number;
  averageScore: number;
  topPerformers: number;
  competitionIntensity: number;
}

interface RealTimeLeaderboardProps {
  events: Event[];
  teams: TeamWithMembers[];
  submissions: Submission[];
  users: User[];
  updateInterval?: number;
}

export default function RealTimeLeaderboard({ 
  events, 
  teams, 
  submissions, 
  users,
  updateInterval = 30000 // 30 seconds
}: RealTimeLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [timeToUpdate, setTimeToUpdate] = useState(updateInterval / 1000);

  // Generate mock leaderboard data
  const generateLeaderboardData = (): LeaderboardEntry[] => {
    const activeEvents = selectedEvent === 'all' ? events : events.filter(e => e.id === selectedEvent);
    const relevantTeams = teams.filter(team => 
      selectedEvent === 'all' || team.eventId === selectedEvent
    );

    const leaderboardData: LeaderboardEntry[] = relevantTeams.map((team, index) => {
      const teamSubmissions = submissions.filter(s => s.teamId === team.id);
      const teamMembers = team.members?.map((member: any) => {
        const user = users.find(u => u.id === member.userId);
        return {
          id: member.userId,
          name: user?.name || 'Unknown',
          avatar: user?.avatar
        };
      }) || [];

      const currentScore = teamSubmissions.reduce((sum, sub) => {
        // Mock score calculation since scores are in separate table
        return sum + Math.floor(Math.random() * 100);
      }, 0);
      const maxScore = teamSubmissions.length * 100; // Assuming max 100 per submission
      const completedChallenges = teamSubmissions.filter(s => s.status === 'submitted').length;
      
      // Mock additional data
      const streak = Math.floor(Math.random() * 10) + 1;
      const badges = ['Early Bird', 'Code Quality', 'Innovation'].filter(() => Math.random() > 0.6);
      const trend = Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down';

      return {
        id: `${team.id}_${Date.now()}`,
        teamId: team.id,
        teamName: team.name,
        eventId: team.eventId,
        eventName: events.find(e => e.id === team.eventId)?.name || 'Unknown Event',
        members: teamMembers,
        currentScore,
        maxScore: Math.max(maxScore, currentScore), // Ensure maxScore is at least currentScore
        rank: 0, // Will be set after sorting
        totalSubmissions: teamSubmissions.length,
        completedChallenges,
        lastActivity: new Date(Date.now() - Math.random() * 3600000), // Random last activity within 1 hour
        streak,
        badges,
        trend: trend as 'up' | 'down' | 'stable'
      };
    });

    // Sort by score and assign ranks
    const sortedData = leaderboardData
      .sort((a, b) => b.currentScore - a.currentScore)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        previousRank: entry.rank || index + 1 + (Math.random() > 0.5 ? 1 : -1)
      }));

    return sortedData;
  };

  // Calculate global statistics
  const calculateGlobalStats = (leaderboard: LeaderboardEntry[]): GlobalStats => {
    const totalTeams = leaderboard.length;
    const activeTeams = leaderboard.filter(entry => 
      Date.now() - entry.lastActivity.getTime() < 3600000 // Active within 1 hour
    ).length;
    
    const totalSubmissions = leaderboard.reduce((sum, entry) => sum + entry.totalSubmissions, 0);
    const averageScore = totalTeams > 0 
      ? leaderboard.reduce((sum, entry) => sum + entry.currentScore, 0) / totalTeams 
      : 0;
    
    const topPerformers = leaderboard.filter(entry => entry.rank <= 10).length;
    const competitionIntensity = totalTeams > 0 
      ? (leaderboard.filter(entry => entry.trend === 'up').length / totalTeams) * 100
      : 0;

    return {
      totalTeams,
      activeTeams,
      totalSubmissions,
      averageScore: Math.round(averageScore),
      topPerformers,
      competitionIntensity: Math.round(competitionIntensity)
    };
  };

  // Update leaderboard data
  const updateLeaderboard = () => {
    const newData = generateLeaderboardData();
    setLeaderboard(newData);
    setGlobalStats(calculateGlobalStats(newData));
    setLastUpdate(new Date());
    setTimeToUpdate(updateInterval / 1000);
  };

  // Auto-update effect
  useEffect(() => {
    updateLeaderboard();
  }, [selectedEvent, teams, submissions]);

  // Timer effect for live updates
  useEffect(() => {
    if (!isLive) return;

    const timer = setInterval(() => {
      setTimeToUpdate(prev => {
        if (prev <= 1) {
          updateLeaderboard();
          return updateInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive, updateInterval]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-orange-500" />;
      default: return <Trophy className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTrendIcon = (trend: string, rank: number, previousRank?: number) => {
    if (!previousRank) return null;
    
    if (rank < previousRank) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (rank > previousRank) {
      return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    }
    return <div className="w-4 h-4 rounded-full bg-gray-300" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (rank === 2) return 'text-gray-600 bg-gray-50 border-gray-200';
    if (rank === 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (rank <= 10) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl font-bold">Real-Time Leaderboard</h1>
              {isLive && (
                <Badge className="text-green-600 bg-green-50 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-gray-600">
              Live rankings and team performance tracking
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={selectedEvent} 
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-3 py-2 rounded-lg text-sm border ${
                isLive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-600'
              }`}
            >
              {isLive ? 'Live' : 'Paused'}
            </button>
            
            <button
              onClick={updateLeaderboard}
              className="p-2 border rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLive && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
              <span className="text-blue-600">
                Next update in: {timeToUpdate}s
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Global Statistics */}
      {globalStats && (
        <div className="grid gap-4 md:grid-cols-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Teams</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.totalTeams}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Active</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.activeTeams}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Submissions</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.totalSubmissions}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Avg Score</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.averageScore}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Top 10</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.topPerformers}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Intensity</span>
              </div>
              <p className="text-xl font-bold mt-1">{globalStats.competitionIntensity}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Current Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {leaderboard.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No teams found for the selected event</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <Badge className={getRankColor(entry.rank)}>
                        {getRankIcon(entry.rank)}
                        <span className="ml-1">#{entry.rank}</span>
                      </Badge>
                      {getTrendIcon(entry.trend, entry.rank, entry.previousRank)}
                    </div>

                    {/* Team Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{entry.teamName}</h3>
                        {entry.badges.map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{entry.eventName}</span>
                        <span>•</span>
                        <span>{entry.members.length} members</span>
                        <span>•</span>
                        <span>{entry.completedChallenges} submissions</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {entry.streak} streak
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right min-w-[120px]">
                      <div className="text-lg font-bold">{entry.currentScore}</div>
                      <div className="text-xs text-gray-500">
                        {entry.maxScore > 0 && (
                          <Progress 
                            value={(entry.currentScore / entry.maxScore) * 100} 
                            className="h-1 w-16 ml-auto"
                          />
                        )}
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="text-right min-w-[100px] text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round((Date.now() - entry.lastActivity.getTime()) / 60000)}m ago
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
