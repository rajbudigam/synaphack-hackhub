"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import OrganizerDashboard from "./OrganizerDashboard";
import JudgeDashboard from "./JudgeDashboard";
import SponsorManagerDashboard from "./SponsorManagerDashboard";
import { 
  Users, 
  Trophy, 
  Building2, 
  Shield,
  Calendar,
  TrendingUp
} from "lucide-react";

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
  teams: Array<{
    id: string;
    name: string;
    role: string;
    event: {
      name: string;
      status: string;
    };
  }>;
  judgeAssignments: Array<{
    id: string;
    status: string;
    submission: {
      title: string;
      event: {
        name: string;
      };
    };
  }>;
  sponsorships: Array<{
    id: string;
    tier: string;
    event: {
      name: string;
    };
  }>;
}

interface ParticipantStats {
  totalTeams: number;
  activeTeams: number;
  submissions: number;
  certificates: number;
}

export default function RoleBasedDashboard() {
  const { user, isLoaded } = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [participantStats, setParticipantStats] = useState<ParticipantStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserProfile();
    }
  }, [isLoaded, user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      
      const data = await response.json();
      setUserProfile(data.user);
      
      // Fetch participant stats if user is a regular participant
      if (!data.user.isAdmin && data.user.roles.length === 0) {
        const statsResponse = await fetch('/api/users/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setParticipantStats(statsData.stats);
        }
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Determine primary role for dashboard display
  const getPrimaryRole = () => {
    if (!userProfile) return 'participant';
    if (userProfile.isAdmin) return 'admin';
    if (userProfile.roles.includes('organizer')) return 'organizer';
    if (userProfile.roles.includes('judge')) return 'judge';
    if (userProfile.roles.includes('sponsor_manager')) return 'sponsor_manager';
    return 'participant';
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'organizer': return 'Event Organizer';
      case 'judge': return 'Judge';
      case 'sponsor_manager': return 'Sponsor Manager';
      default: return 'Participant';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500 text-white';
      case 'organizer': return 'bg-blue-500 text-white';
      case 'judge': return 'bg-green-500 text-white';
      case 'sponsor_manager': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const primaryRole = getPrimaryRole();

  // Render role-specific dashboard
  if (primaryRole === 'admin' || primaryRole === 'organizer') {
    return <OrganizerDashboard />;
  }

  if (primaryRole === 'judge') {
    return <JudgeDashboard />;
  }

  if (primaryRole === 'sponsor_manager') {
    return <SponsorManagerDashboard />;
  }

  // Default participant dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {userProfile?.name || user?.firstName || 'Participant'}!
          </h1>
          <p className="text-muted-foreground">
            Your hackathon journey and achievements
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={getRoleBadgeColor(primaryRole)}>
            {getRoleDisplayName(primaryRole)}
          </Badge>
          {userProfile?.roles.map((role) => (
            <Badge key={role} variant="outline" className="text-xs">
              {getRoleDisplayName(role)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Participant Stats */}
      {participantStats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams Joined</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{participantStats.totalTeams}</div>
              <p className="text-xs text-muted-foreground">
                {participantStats.activeTeams} currently active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{participantStats.submissions}</div>
              <p className="text-xs text-muted-foreground">
                projects submitted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{participantStats.certificates}</div>
              <p className="text-xs text-muted-foreground">
                achievements earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {participantStats.totalTeams > 0 ? 'Veteran' : 'Newcomer'}
              </div>
              <p className="text-xs text-muted-foreground">
                hackathon status
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Teams */}
      {userProfile?.teams && userProfile.teams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Teams</CardTitle>
            <CardDescription>
              Teams you're currently part of
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProfile.teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {team.event.name} • Role: {team.role}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={team.event.status === 'ACTIVE' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {team.event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Judge Assignments (if user is also a judge) */}
      {userProfile?.judgeAssignments && userProfile.judgeAssignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Judge Assignments</CardTitle>
            <CardDescription>
              Submissions assigned for your evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfile.judgeAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{assignment.submission.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {assignment.submission.event.name}
                    </p>
                  </div>
                  <Badge 
                    variant={assignment.status === 'COMPLETED' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {assignment.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sponsorships (if user manages sponsors) */}
      {userProfile?.sponsorships && userProfile.sponsorships.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Managed Sponsorships</CardTitle>
            <CardDescription>
              Sponsor partnerships you manage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfile.sponsorships.map((sponsorship) => (
                <div key={sponsorship.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{sponsorship.event.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Sponsor tier management
                    </p>
                  </div>
                  <Badge className="text-xs">
                    {sponsorship.tier}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started (for new users) */}
      {(!userProfile?.teams || userProfile.teams.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              New to hackathons? Here's how to get involved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Browse Events</p>
                  <p className="text-xs text-muted-foreground">
                    Check out upcoming hackathons and find one that interests you
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Join a Team</p>
                  <p className="text-xs text-muted-foreground">
                    Connect with other participants or create your own team
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Build & Submit</p>
                  <p className="text-xs text-muted-foreground">
                    Work on your project and submit it before the deadline
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Earn Recognition</p>
                  <p className="text-xs text-muted-foreground">
                    Get feedback from judges and earn certificates for your achievements
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
