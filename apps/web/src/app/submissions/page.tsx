import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { BackButton } from "@/components/ui/back-button";
import { ExportButton } from "@/components/ui/export-button";
import { RefreshButton } from "@/components/ui/refresh-button";

// Helper function to safely parse techStack JSON
function parseTechStack(techStack: any): string[] {
  if (Array.isArray(techStack)) return techStack;
  if (typeof techStack === 'string') {
    try {
      const parsed = JSON.parse(techStack);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}
import { PageContainer } from "@/components/PageContainer";

async function getSubmissions(): Promise<any[]> {
  const submissions = await prisma.submission.findMany({
    include: {
      event: true,
      team: {
        include: {
          members: {
            include: {
              user: true
            }
          }
        }
      },
  // round relation omitted to avoid client mismatch
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

  const featuredSubmissions = submissions.filter((s: any) => s.status === "featured");
  const recentSubmissions = submissions.slice(0, 8);
  const topSubmissions = submissions
    .sort((a: any, b: any) => (b._count?.scores || 0) - (a._count?.scores || 0))
    .slice(0, 6);

  return (
    <PageContainer className="space-y-16" size="lg">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton href="/" label="Back to Dashboard" />
      </div>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">
            Discover innovative projects from our hackathon participants
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <RefreshButton />
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Featured Submissions */}
      {featuredSubmissions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured Submissions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSubmissions.map((submission: any) => (
              <SubmissionCard key={submission.id} submission={submission} featured />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated */}
  <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Top Rated</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topSubmissions.map((submission: any) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      </section>

      {/* Recent Submissions */}
  <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Recent Submissions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {recentSubmissions.map((submission: any) => (
            <SubmissionCard key={submission.id} submission={submission} compact />
          ))}
        </div>
      </section>

      {/* All Submissions Table */}
  <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All Submissions</h2>
          <ExportButton data={submissions} filename="submissions" />
        </div>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Team</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Event</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Scores</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submitted</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {submissions.map((submission: any) => (
                  <tr key={submission.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="font-medium">{submission.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {submission.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          {parseTechStack(submission.techStack).map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="font-medium">{submission.team.name}</p>
                        <div className="flex -space-x-2">
                          {submission.team.members?.slice(0, 3).map((member: any) => (
                            <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member.user?.name?.charAt(0) || "?"}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {submission.team.members?.length > 3 && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                              +{submission.team.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="font-medium">{submission.event.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {submission.event.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <SubmissionStatusBadge status={submission.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {submission._count?.scores || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="text-sm">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {submission.demoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={submission.demoUrl} target="_blank">
                              <Play className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {submission.repoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={submission.repoUrl} target="_blank">
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
  </PageContainer>
  );
}

function SubmissionCard({ 
  submission, 
  featured = false, 
  compact = false 
}: { 
  submission: any; 
  featured?: boolean; 
  compact?: boolean; 
}) {
  return (
    <Card className={`group cursor-pointer transition-all hover:shadow-md ${
      featured ? "border-primary/50 bg-primary/5" : ""
    }`}>
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className={`${compact ? "text-base" : "text-lg"} line-clamp-1`}>
              {submission.title}
              {featured && (
                <Trophy className="ml-2 inline h-4 w-4 text-primary" />
              )}
            </CardTitle>
            <p className={`text-muted-foreground ${compact ? "text-xs" : "text-sm"} line-clamp-2`}>
              {submission.description}
            </p>
          </div>
          <SubmissionStatusBadge status={submission.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact && (
          <div className="flex flex-wrap gap-1">
            {parseTechStack(submission.techStack).slice(0, 3).map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {parseTechStack(submission.techStack).length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{parseTechStack(submission.techStack).length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {submission.team.members?.slice(0, 3).map((member: any) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {member.user?.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm font-medium">{submission.team.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">{submission._count?.scores || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{submission.team.members?.length || 0} members</span>
          </div>
        </div>

        {!compact && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            {submission.demoUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={submission.demoUrl} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {submission.repoUrl && (
              <Button variant="outline" size="sm" asChild>
                <Link href={submission.repoUrl} target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SubmissionStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    draft: { label: "Draft", variant: "secondary" as const },
    submitted: { label: "Submitted", variant: "default" as const },
    under_review: { label: "Under Review", variant: "default" as const },
    approved: { label: "Approved", variant: "default" as const },
    featured: { label: "Featured", variant: "default" as const },
    disqualified: { label: "Disqualified", variant: "destructive" as const },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}
