export const dynamic = "force-dynamic";

import { prisma } from "@/server/db";
import { TeamWithMembers, TeamMember, User } from "@/types/database";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Trophy, Plus, UserPlus, Settings, Eye } from "lucide-react";

// Type for the teams query result
type TeamQueryResult = {
  id: string;
  name: string;
  description: string | null;
  avatar: string | null;
  repositoryUrl: string | null;
  videoUrl: string | null;
  presentationUrl: string | null;
  websiteUrl: string | null;
  status: string;
  createdAt: Date;
  eventId: string;
  members: {
    id: string;
    role: string;
    joinedAt: Date;
    userId: string;
    teamId: string;
    user: User;
  }[];
  event: {
    name: string;
    slug: string;
  };
  _count: {
    members: number;
    submissions: number;
  };
};

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    include: {
      members: {
        include: {
          user: true
        }
      },
      event: {
        select: {
          name: true,
          slug: true
        }
      },
      _count: {
        select: {
          members: true,
          submissions: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const myTeams = teams.slice(0, 3); // In real app, filter by current user
  const allTeams = teams;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and join new ones</p>
        </div>
        <Button asChild>
          <Link href="/teams/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Link>
        </Button>
      </div>

      {/* My Teams */}
      {myTeams.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Teams</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myTeams.map((team: TeamQueryResult) => (
              <TeamCard key={team.id} team={team} isOwned />
            ))}
          </div>
        </section>
      )}

      {/* All Teams */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Teams</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allTeams.map((team: TeamQueryResult) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      {teams.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first team or join an existing one.
            </p>
            <Button asChild>
              <Link href="/teams/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TeamCard({ team, isOwned }: { team: TeamQueryResult; isOwned?: boolean }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
              {team.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Event
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {isOwned && (
              <Badge variant="default">Owner</Badge>
            )}
            <Badge variant="outline" className="font-mono">
              0 pts
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Team Members */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Members</span>
            <span className="text-sm text-muted-foreground">
              {team._count?.members || 0}/6
            </span>
          </div>
          <div className="flex -space-x-2">
            {team.members.slice(0, 4).map((member: TeamMember & { user: User }) => (
              <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                <AvatarImage src={member.user?.avatar || undefined} />
                <AvatarFallback className="text-xs">
                  {member.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
            ))}
            {team._count.members > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                +{team._count.members - 4}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {false && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Skills</span>
            <div className="flex flex-wrap gap-1">
              {[].slice(0, 3).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {[].length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{[].length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>{team._count.submissions} submissions</span>
          </div>
          <span className="text-muted-foreground">
            {"Active"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/teams/${team.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>
          {isOwned ? (
            <Button variant="outline" size="icon" asChild>
              <Link href={`/teams/${team.id}/settings`}>
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          ) : team.status === 'active' && (
            <Button variant="outline" size="icon" asChild>
              <Link href={`/teams/${team.id}/join`}>
                <UserPlus className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
