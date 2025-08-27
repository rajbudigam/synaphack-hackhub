"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Scan, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { useRouter } from "next/navigation";

export default function PlagiarismScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [result, setResult] = useState<{ success: boolean; reportId?: string; error?: string } | null>(null);
  const router = useRouter();

  const handleScan = async () => {
    if (!submissionId.trim()) {
      setResult({ success: false, error: "Please enter a submission ID" });
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/plagiarism/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId: submissionId.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scan submission');
      }

      setResult({ success: true, reportId: data.reportId });
      
      // Redirect to report after a short delay
      setTimeout(() => {
        router.push(`/plagiarism/reports/${submissionId}`);
      }, 2000);

    } catch (error) {
      console.error('Scan error:', error);
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scan submission' 
      });
    } finally {
      setIsScanning(false);
    }
  };

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
              <Scan className="h-6 w-6 text-blue-500" />
              Scan for Plagiarism
            </h1>
          </div>
          <p className="text-muted-foreground">
            Check submissions for code similarity and potential plagiarism
          </p>
        </div>
      </div>

      {/* Scan Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Submission Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="submissionId">Submission ID</Label>
            <Input
              id="submissionId"
              value={submissionId}
              onChange={(e) => setSubmissionId(e.target.value)}
              placeholder="Enter submission ID to scan"
              disabled={isScanning}
            />
            <p className="text-sm text-muted-foreground">
              Enter the ID of the submission you want to check for plagiarism
            </p>
          </div>

          <Button 
            onClick={handleScan} 
            disabled={isScanning || !submissionId.trim()}
            className="w-full"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Scan className="h-4 w-4 mr-2" />
                Start Plagiarism Scan
              </>
            )}
          </Button>

          {/* Results */}
          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400'
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400'
            }`}>
              <div className="flex items-start gap-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {result.success ? 'Scan Completed Successfully!' : 'Scan Failed'}
                  </p>
                  <p className="text-sm mt-1">
                    {result.success 
                      ? 'Redirecting to detailed report...'
                      : result.error
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>How Plagiarism Detection Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-500" />
                1. Submission Analysis
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                We analyze the submission's code and content, normalizing it by removing comments and standardizing formatting.
              </p>

              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Scan className="h-4 w-4 text-indigo-500" />
                2. Multi-Algorithm Detection
              </h4>
              <p className="text-sm text-muted-foreground">
                Four different algorithms run simultaneously:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• <strong>Cosine Similarity:</strong> TF-IDF semantic analysis</li>
                <li>• <strong>SimHash:</strong> Structural similarity detection</li>
                <li>• <strong>Jaccard Index:</strong> K-gram pattern matching</li>
                <li>• <strong>Overlap Analysis:</strong> Direct text comparison</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                3. Risk Classification
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Results are classified into risk levels:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">High Risk</p>
                  <p className="text-xs text-red-600 dark:text-red-500">2+ algorithms show strong similarity</p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Medium Risk</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">Moderate similarity detected</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">Low Risk</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Minimal or no similarity found</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detection Algorithms Explained</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Cosine Similarity (TF-IDF)</h4>
                <p className="text-sm text-muted-foreground">
                  Converts code into numerical vectors based on term frequency and inverse document frequency. 
                  High scores (≥85%) indicate semantic similarity.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">SimHash + Hamming Distance</h4>
                <p className="text-sm text-muted-foreground">
                  Creates 64-bit fingerprints of code structure. Low Hamming distances (≤6 bits) 
                  indicate similar code organization even with variable renaming.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Jaccard Index (K-grams)</h4>
                <p className="text-sm text-muted-foreground">
                  Compares overlapping 5-character sequences. High scores (≥60%) indicate 
                  shared code patterns and similar implementation approaches.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Overlap Percentage</h4>
                <p className="text-sm text-muted-foreground">
                  Direct matching of 20-character code segments after normalization. 
                  High percentages (≥20%) indicate copied code blocks.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
