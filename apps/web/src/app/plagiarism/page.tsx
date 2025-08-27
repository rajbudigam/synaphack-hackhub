export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Clock, Upload, FileText, Scan, Plus } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

async function getPlagiarismReports() {
  try {
    const reports = await prisma.plagiarismReport.findMany({
      include: { 
        matches: true,
        submission: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            team: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return reports.map(report => {
      const maxSimilarity = Math.max(
        report.maxCosine * 100,
        (1 - report.minHamming / 64) * 100,
        report.maxJaccard * 100
      );
      
      const highRiskCount = report.matches.filter(m => m.risk === 'high').length;
      const mediumRiskCount = report.matches.filter(m => m.risk === 'medium').length;
      
      let status = 'clean';
      if (highRiskCount > 0) status = 'flagged';
      else if (mediumRiskCount > 0) status = 'review';
      
      return {
        id: report.submissionId,
        fileName: report.submission.title || 'Untitled Submission',
        submissionId: report.submissionId,
        teamName: report.submission.team?.name || 'Unknown Team',
        similarityScore: maxSimilarity,
        status,
        scanDate: report.createdAt,
        matchedSources: report.matches.length,
        details: report.summary
      };
    });
  } catch (error) {
    console.error("Error fetching plagiarism reports:", error);
    return [];
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'clean':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
    case 'flagged':
      return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
    case 'review':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'clean':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'flagged':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'review':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <Scan className="h-4 w-4 text-gray-600" />;
  }
}

function getSimilarityLevel(score: number) {
  if (score < 25) return { label: 'Low', color: 'text-green-600' };
  if (score < 50) return { label: 'Moderate', color: 'text-yellow-600' };
  if (score < 75) return { label: 'High', color: 'text-orange-600' };
  return { label: 'Very High', color: 'text-red-600' };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export default async function PlagiarismPage() {
  const reports = await getPlagiarismReports();

  const cleanReports = reports.filter(r => r.status === 'clean').length;
  const flaggedReports = reports.filter(r => r.status === 'flagged').length;
  const reviewReports = reports.filter(r => r.status === 'review').length;

  return (
    <PageContainer className="space-y-12" size="lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" />
            Anti-Plagiarism
          </h1>
          <p className="text-muted-foreground">Ensure code originality and academic integrity</p>
        </div>
        <Button asChild>
          <Link href="/plagiarism/scan">
            <Upload className="h-4 w-4 mr-2" />
            Scan Files
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Scan className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Files analyzed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clean</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{cleanReports}</div>
            <p className="text-xs text-muted-foreground">No issues found</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedReports}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reviewReports}</div>
            <p className="text-xs text-muted-foreground">Manual review needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Scans</h2>
        <div className="space-y-4">
          {reports.length > 0 ? reports.map((report) => {
            const similarity = getSimilarityLevel(report.similarityScore);
            return (
              <Card key={report.id} className={`border-l-4 ${getStatusColor(report.status)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <CardTitle className="text-lg">{report.fileName}</CardTitle>
                        {getStatusIcon(report.status)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Team: {report.teamName}</span>
                        <span>Scanned: {formatDate(report.scanDate)}</span>
                        <span>Sources: {report.matchedSources}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${similarity.color}`}>
                        {report.similarityScore}%
                      </div>
                      <div className={`text-sm ${similarity.color}`}>
                        {similarity.label} Similarity
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{report.details}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant={
                        report.status === 'clean' ? 'default' :
                        report.status === 'flagged' ? 'destructive' : 'secondary'
                      }>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                      
                      <Badge variant="outline">
                        {report.matchedSources} matches
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/plagiarism/reports/${report.id}`}>
                          View Details
                        </Link>
                      </Button>
                      
                      {report.status === 'flagged' && (
                        <Button size="sm" variant="destructive">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }) : (
            <Card>
              <CardContent className="text-center py-12">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No scans yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload files to start checking for plagiarism and ensure code originality.
                </p>
                <Button asChild>
                  <Link href="/plagiarism/scan">
                    <Upload className="h-4 w-4 mr-2" />
                    Start Scanning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              How Anti-Plagiarism Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="font-semibold mb-1">1. Upload Code</h4>
                <p className="text-sm text-muted-foreground">
                  Submit your code files for comprehensive plagiarism analysis.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Scan className="h-6 w-6 text-indigo-500" />
                </div>
                <h4 className="font-semibold mb-1">2. AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms compare your code against millions of sources.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="font-semibold mb-1">3. Get Results</h4>
                <p className="text-sm text-muted-foreground">
                  Receive detailed reports with similarity scores and matched sources.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Detection Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Detection Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Code Similarity Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Structural code analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Variable name variations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Comment and whitespace ignoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Cross-language detection
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Comprehensive Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  GitHub repositories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Stack Overflow solutions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Educational platforms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Previous submissions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
  </PageContainer>
  );
}
