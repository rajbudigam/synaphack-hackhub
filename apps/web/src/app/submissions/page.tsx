import { prisma } from "@/server/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SubmissionWithRelations, TeamWithMembers, TeamMember, User } from "@/types/database";
import { 
  Code,
  Trophy,
  Eye,
  ThumbsUp,
  Calendar,
  Users,
  ExternalLink,
  Github,
  Play,
  Award,
  Filter,
  Search,
  Download
} from "lucide-react";
import Link from "next/link";

async function getSubmissions(): Promise<SubmissionQueryResult[]> {
  const submissions = await prisma.submission.findMany({
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
      event: true,
      round: true,
      scores: {
        include: {
          judge: true
        }
      },
      _count: {
        select: {
          scores: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return submissions;
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  const featuredSubmissions = submissions.filter((s) => s.status === "featured");
  const recentSubmissions = submissions.slice(0, 8);
  const topSubmissions = submissions
    .sort((a, b) => (b._count?.scores || 0) - (a._count?.scores || 0))
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Submissions</h1>
          <p className="text-muted-foreground">
            Explore innovative projects from talented developers and teams
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button asChild>
            <Link href="/submissions/create">
              <Code className="w-4 h-4 mr-2" />
              Submit Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{submissions.length}</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{featuredSubmissions.length}</p>
                <p className="text-sm text-muted-foreground">Featured Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {submissions.reduce((acc: number, sub) => acc + (sub.team?.members?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {submissions.filter((s) => s.scores && s.scores.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Evaluated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Submissions */}
      {featuredSubmissions.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredSubmissions.map((submission) => (
              <FeaturedSubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        </section>
      )}

      {/* Top Submissions */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🏆 Top Rated Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      </section>

      {/* Recent Submissions */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📅 Recent Submissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      </section>

      {/* No Submissions */}
      {submissions.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Code className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to submit your innovative project!
            </p>
            <Button asChild>
              <Link href="/submissions/create">Submit Your Project</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Type for the database query result
type SubmissionQueryResult = {
  id: string;
  title: string;
  description: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  videoUrl: string | null;
  presentationUrl: string | null;
  techStack: string | null;
  features: string | null;
  challenges: string | null;
  accomplishments: string | null;
  learnings: string | null;
  nextSteps: string | null;
  status: string;
  submittedAt: Date | null;
  createdAt: Date;
  eventId: string;
  teamId: string;
  roundId: string | null;
  trackId: string | null;
  team: {
    id: string;
    name: string;
    description: string | null;
    avatar: string | null;
    members: {
      id: string;
      role: string;
      joinedAt: Date;
      userId: string;
      teamId: string;
      user: User;
    }[];
  };
  event: {
    id: string;
    name: string;
    slug: string;
    status: string;
  };
  round: {
    id: string;
    name: string;
    description: string | null;
  } | null;
  scores: {
    id: string;
    value: number;
    judge: User;
  }[];
  _count: {
    scores: number;
  };
};

function FeaturedSubmissionCard({ submission }: { submission: SubmissionQueryResult }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="line-clamp-2">{submission.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                Featured
              </Badge>
              <Badge variant="outline" className="text-xs">
                {submission.event?.name}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Team Info */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {submission.team?.members?.slice(0, 3).map((member: TeamMember) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-xs">
                  {(member as TeamMember & { user: User }).user?.name?.slice(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            ))}
            {submission.team?.members?.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium">+{submission.team.members.length - 3}</span>
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{submission.team?.name}</p>
            <p className="text-xs text-muted-foreground">
              {submission.team?.members?.length || 0} members
            </p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{submission._count?.scores || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/submissions/${submission.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Project
            </Link>
          </Button>
          
          {submission.repoUrl && (
            <Button variant="outline" size="icon" asChild>
              <Link href={submission.repoUrl} target="_blank">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          )}
          
          {submission.videoUrl && (
            <Button variant="outline" size="icon" asChild>
              <Link href={submission.videoUrl} target="_blank">
                <Play className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SubmissionCard({ submission }: { submission: SubmissionQueryResult }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{submission.title}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {submission.event?.name}
          </Badge>
          <Badge 
            variant={submission.status === "submitted" ? "default" : "secondary"} 
            className="text-xs"
          >
            {submission.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Team */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{submission.team?.name}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{submission._count?.scores || 0}</span>
          </div>
          <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/submissions/${submission.id}`}>View</Link>
          </Button>
          
          {submission.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={submission.repoUrl} target="_blank">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
