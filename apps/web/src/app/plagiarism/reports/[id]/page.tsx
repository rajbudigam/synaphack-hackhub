export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, ArrowLeft, FileText, Eye, BarChart3 } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPlagiarismReport(submissionId: string) {
  try {
    const report = await prisma.plagiarismReport.findUnique({
      where: { submissionId },
      include: { 
        matches: { 
          orderBy: [{ risk: 'desc' }, { cosine: 'desc' }]
        },
        submission: {
          select: {
            id: true,
            title: true,
            team: { select: { name: true } }
          }
        }
      }
    });

    if (!report) return null;

    // Get other submission details for matches
    const otherSubmissionIds = report.matches.map(m => m.otherSubmissionId);
    const otherSubmissions = await prisma.submission.findMany({
      where: { id: { in: otherSubmissionIds } },
      select: {
        id: true,
        title: true,
        team: { select: { name: true } }
      }
    });

    // Create a map for quick lookup
    const submissionMap = new Map(otherSubmissions.map(s => [s.id, s]));

    // Add submission details to matches
    const matchesWithSubmissions = report.matches.map(match => ({
      ...match,
      otherSubmission: submissionMap.get(match.otherSubmissionId)
    }));

    return {
      ...report,
      matches: matchesWithSubmissions
    };
  } catch (error) {
    console.error("Error fetching plagiarism report:", error);
    return null;
  }
}

function getRiskColor(risk: string) {
  switch (risk) {
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800';
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800';
  }
}

function getRiskIcon(risk: string) {
  switch (risk) {
    case 'low':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'medium':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <Shield className="h-4 w-4 text-gray-600" />;
  }
}

function formatPercentage(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export default async function PlagiarismReportPage({ params }: PageProps) {
  const { id } = await params;
  const report = await getPlagiarismReport(id);

  if (!report) {
    notFound();
  }

  const highRiskMatches = report.matches.filter((m: any) => m.risk === 'high');
  const mediumRiskMatches = report.matches.filter((m: any) => m.risk === 'medium');
  const lowRiskMatches = report.matches.filter((m: any) => m.risk === 'low');

  const maxRisk = highRiskMatches.length > 0 ? 'high' : 
                  mediumRiskMatches.length > 0 ? 'medium' : 'low';

  return (
    <PageContainer className="space-y-8" size="lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/plagiarism">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              Plagiarism Report
            </h1>
          </div>
          <p className="text-muted-foreground">
            Submission: {report.submission.title} by {report.submission.team?.name || 'Unknown Team'}
          </p>
        </div>
        <Badge variant={maxRisk === 'high' ? 'destructive' : maxRisk === 'medium' ? 'secondary' : 'default'}>
          {maxRisk.charAt(0).toUpperCase() + maxRisk.slice(1)} Risk
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Cosine Similarity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(report.maxCosine)}</div>
            <p className="text-xs text-muted-foreground">TF-IDF based</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Min Hamming Distance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.minHamming}</div>
            <p className="text-xs text-muted-foreground">SimHash bits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Jaccard Index</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(report.maxJaccard)}</div>
            <p className="text-xs text-muted-foreground">K-gram similarity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.matches.length}</div>
            <p className="text-xs text-muted-foreground">Submissions compared</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm bg-muted p-3 rounded-lg">{report.summary}</p>
        </CardContent>
      </Card>

      {/* Risk Breakdown */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              High Risk ({highRiskMatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Strong similarity signals detected. Requires immediate attention.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              Medium Risk ({mediumRiskMatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Moderate similarity detected. Manual review recommended.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Low Risk ({lowRiskMatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Minimal similarity. Likely common patterns or libraries.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Matches */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Detailed Matches</h2>
        <div className="space-y-4">
          {report.matches.length > 0 ? report.matches.map((match: any, index) => (
            <Card key={match.id} className={`border-l-4 ${getRiskColor(match.risk)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <CardTitle className="text-lg">
                        vs {match.otherSubmission?.team?.name || 'Unknown Team'}
                      </CardTitle>
                      {getRiskIcon(match.risk)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cosine:</span>
                        <span className="font-medium ml-2">{formatPercentage(match.cosine)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hamming:</span>
                        <span className="font-medium ml-2">{match.hamming}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Jaccard:</span>
                        <span className="font-medium ml-2">{formatPercentage(match.jaccard)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overlap:</span>
                        <span className="font-medium ml-2">{match.overlapPercent.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant={
                    match.risk === 'high' ? 'destructive' :
                    match.risk === 'medium' ? 'secondary' : 'default'
                  }>
                    {match.risk.charAt(0).toUpperCase() + match.risk.slice(1)} Risk
                  </Badge>
                </div>
              </CardHeader>
              
              {(match.snippetA || match.snippetB) && (
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Similar Code Snippet:</h4>
                    <div className="bg-muted p-3 rounded-lg">
                      <code className="text-sm break-all">
                        {match.snippetA || match.snippetB}
                      </code>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Comparison
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )) : (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
                <p className="text-muted-foreground">
                  This submission appears to be original with no significant similarities detected.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Algorithm Explanation */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Detection Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Cosine Similarity</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Measures semantic similarity using TF-IDF vectors. Higher scores indicate more similar content.
              </p>
              
              <h4 className="font-semibold mb-2">Hamming Distance</h4>
              <p className="text-sm text-muted-foreground">
                Uses SimHash to detect structural similarity. Lower distances indicate more similar code structure.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Jaccard Index</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Compares k-gram sets to find shared subsequences. Higher scores indicate more overlapping patterns.
              </p>
              
              <h4 className="font-semibold mb-2">Overlap Percentage</h4>
              <p className="text-sm text-muted-foreground">
                Direct text matching after normalization. Shows percentage of identical code segments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
