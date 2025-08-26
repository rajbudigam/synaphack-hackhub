import { NextResponse } from "next/server";

export async function GET() {
  // Mock evaluations data
  const mockEvaluations = [
    {
      id: "eval_1",
      submissionId: "1",
      judgeName: "Dr. Sarah Chen",
      judgeId: "judge1",
      scores: {
        innovation: 85,
        technical: 90,
        presentation: 80,
        impact: 88
      },
      totalScore: 86.25,
      feedback: "Excellent technical implementation with strong innovation. Great potential for real-world impact.",
      evaluatedAt: "2025-08-31T16:00:00Z"
    },
    {
      id: "eval_2", 
      submissionId: "2",
      judgeName: "Michael Johnson",
      judgeId: "judge2",
      scores: {
        innovation: 78,
        technical: 85,
        presentation: 82,
        impact: 80
      },
      totalScore: 81.25,
      feedback: "Solid technical foundation with good user experience. Could benefit from more innovative features.",
      evaluatedAt: "2025-08-31T16:30:00Z"
    }
  ];

  return NextResponse.json(mockEvaluations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock evaluation creation
    const { scores } = body;
    const totalScore = Object.values(scores).reduce((sum: number, score: any) => sum + score, 0) / Object.keys(scores).length;
    
    const newEvaluation = {
      id: `eval_${Date.now()}`,
      ...body,
      totalScore,
      evaluatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(newEvaluation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create evaluation" },
      { status: 500 }
    );
  }
}
