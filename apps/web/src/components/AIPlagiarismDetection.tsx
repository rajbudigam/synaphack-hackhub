import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  Loader2,
  Eye,
  Download,
  Shield,
  Search
} from 'lucide-react';
import { Submission } from '@/types/database';

interface PlagiarismResult {
  submissionId: string;
  similarityScore: number;
  matches: Array<{
    source: string;
    similarity: number;
    excerpt: string;
  }>;
  aiGenerated: boolean;
  aiConfidence: number;
  status: 'clean' | 'suspicious' | 'flagged';
}

interface AIPlagiarismDetectionProps {
  submissions: Submission[];
  onAnalysisComplete?: (results: PlagiarismResult[]) => void;
}

export default function AIPlagiarismDetection({ submissions, onAnalysisComplete }: AIPlagiarismDetectionProps) {
  const [analysisResults, setAnalysisResults] = useState<PlagiarismResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Mock AI plagiarism detection function (in real implementation, this would call an AI service)
  const performPlagiarismCheck = async (submission: Submission): Promise<PlagiarismResult> => {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results
    const similarityScore = Math.random() * 100;
    const aiConfidence = Math.random() * 100;
    
    const mockMatches = [
      {
        source: 'GitHub Repository: awesome-project/main.py',
        similarity: Math.random() * 50,
        excerpt: 'function calculateScore(data) { return data.reduce((sum, item) => sum + item.value, 0); }'
      },
      {
        source: 'Stack Overflow Answer #12345',
        similarity: Math.random() * 30,
        excerpt: 'const handleSubmit = async (formData) => { try { await api.post("/submit", formData); } catch (error) { console.error(error); } }'
      },
      {
        source: 'Academic Paper: "Machine Learning in Web Development"',
        similarity: Math.random() * 20,
        excerpt: 'The implementation follows a standard three-tier architecture pattern...'
      }
    ].filter(() => Math.random() > 0.5); // Random number of matches

    let status: 'clean' | 'suspicious' | 'flagged';
    if (similarityScore > 70 || aiConfidence > 80) {
      status = 'flagged';
    } else if (similarityScore > 40 || aiConfidence > 60) {
      status = 'suspicious';
    } else {
      status = 'clean';
    }

    return {
      submissionId: submission.id,
      similarityScore,
      matches: mockMatches,
      aiGenerated: aiConfidence > 70,
      aiConfidence,
      status
    };
  };

  const analyzeAllSubmissions = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const results: PlagiarismResult[] = [];

    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
      const result = await performPlagiarismCheck(submission);
      results.push(result);
      setAnalysisProgress(((i + 1) / submissions.length) * 100);
    }

    setAnalysisResults(results);
    setIsAnalyzing(false);
    onAnalysisComplete?.(results);
  };

  const analyzeSubmission = async (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    setIsAnalyzing(true);
    const result = await performPlagiarismCheck(submission);
    setAnalysisResults(prev => [...prev.filter(r => r.submissionId !== submissionId), result]);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'text-green-600 bg-green-50';
      case 'suspicious': return 'text-yellow-600 bg-yellow-50';
      case 'flagged': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="w-4 h-4" />;
      case 'suspicious': return <AlertTriangle className="w-4 h-4" />;
      case 'flagged': return <Shield className="w-4 h-4" />;
      default: return <FileCheck className="w-4 h-4" />;
    }
  };

  const cleanSubmissions = analysisResults.filter(r => r.status === 'clean').length;
  const suspiciousSubmissions = analysisResults.filter(r => r.status === 'suspicious').length;
  const flaggedSubmissions = analysisResults.filter(r => r.status === 'flagged').length;
  const totalAnalyzed = analysisResults.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">AI Plagiarism Detection</h1>
        </div>
        <p className="text-gray-600">
          Advanced AI-powered plagiarism and originality detection for submissions
        </p>
      </div>

      {/* Analysis Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Submissions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{submissions.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Clean</span>
            </div>
            <p className="text-2xl font-bold mt-2">{cleanSubmissions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Suspicious</span>
            </div>
            <p className="text-2xl font-bold mt-2">{suspiciousSubmissions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Flagged</span>
            </div>
            <p className="text-2xl font-bold mt-2">{flaggedSubmissions}</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analysis Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Batch Analysis</h3>
              <p className="text-sm text-gray-600">Analyze all submissions for plagiarism and AI generation</p>
            </div>
            <Button 
              onClick={analyzeAllSubmissions} 
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Analyze All
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          {totalAnalyzed === 0 ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No analysis results yet. Run the AI analysis to see results.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => {
                const result = analysisResults.find(r => r.submissionId === submission.id);
                return (
                  <div key={submission.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium">{submission.title}</h3>
                        <p className="text-sm text-gray-600">Team: {submission.teamId}</p>
                      </div>
                      {result ? (
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(result.status)}>
                            {getStatusIcon(result.status)}
                            <span className="ml-1">{result.status.toUpperCase()}</span>
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedSubmission(
                              selectedSubmission === submission.id ? null : submission.id
                            )}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => analyzeSubmission(submission.id)}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          ) : (
                            <Search className="w-3 h-3 mr-1" />
                          )}
                          Analyze
                        </Button>
                      )}
                    </div>

                    {result && selectedSubmission === submission.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                        {/* Similarity Analysis */}
                        <div>
                          <h4 className="font-medium mb-2">Similarity Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="text-sm text-gray-600">Overall Similarity</span>
                              <div className="flex items-center gap-2">
                                <Progress value={result.similarityScore} className="flex-1 h-2" />
                                <span className="text-sm font-medium">{Math.round(result.similarityScore)}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">AI Generation Confidence</span>
                              <div className="flex items-center gap-2">
                                <Progress value={result.aiConfidence} className="flex-1 h-2" />
                                <span className="text-sm font-medium">{Math.round(result.aiConfidence)}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {result.aiGenerated && (
                            <Alert className="mb-3">
                              <AlertTriangle className="w-4 h-4" />
                              <AlertDescription>
                                This submission shows high likelihood of AI generation ({Math.round(result.aiConfidence)}% confidence)
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>

                        {/* Similarity Matches */}
                        {result.matches.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Similar Content Found</h4>
                            <div className="space-y-2">
                              {result.matches.map((match, index) => (
                                <div key={index} className="border rounded p-3 bg-white">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{match.source}</span>
                                    <Badge variant="outline">{Math.round(match.similarity)}% match</Badge>
                                  </div>
                                  <p className="text-xs text-gray-600 font-mono bg-gray-100 p-2 rounded">
                                    {match.excerpt}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Export Report
                          </Button>
                          {result.status === 'flagged' && (
                            <Button size="sm" variant="destructive">
                              Flag for Review
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
