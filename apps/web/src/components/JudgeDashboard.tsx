"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Star, 
  Users,
  Calendar,
  Award,
  Eye
} from "lucide-react";

interface JudgeAssignment {
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignedAt: string;
  completedAt?: string;
  submission: {
    id: string;
    title: string;
    description?: string;
    submittedAt: string;
    team: {
      id: string;
      name: string;
      members: Array<{
        user: {
          name?: string;
          email: string;
        };
      }>;
    };
    event: {
      id: string;
      name: string;
      slug: string;
    };
  };
  scores?: Record<string, number>;
  feedback?: string;
}

interface JudgeStats {
  totalAssignments: number;
  completedAssignments: number;
  pendingAssignments: number;
  averageScore: number;
  timeSpent: number;
}

export default function JudgeDashboard() {
  const [assignments, setAssignments] = useState<JudgeAssignment[]>([]);
  const [stats, setStats] = useState<JudgeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<JudgeAssignment | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/evaluations/assignments');
      if (!response.ok) throw new Error('Failed to fetch assignments');
      
      const data = await response.json();
      setAssignments(data.assignments || []);
      
      // Calculate stats
      const total = data.assignments?.length || 0;
      const completed = data.assignments?.filter((a: JudgeAssignment) => a.status === 'COMPLETED').length || 0;
      const pending = data.assignments?.filter((a: JudgeAssignment) => a.status === 'PENDING').length || 0;
      
      const scores = data.assignments
        ?.filter((a: JudgeAssignment) => a.scores)
        .flatMap((a: JudgeAssignment) => Object.values(a.scores || {}));
      
      const averageScore = scores?.length > 0 
        ? scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length 
        : 0;

      setStats({
        totalAssignments: total,
        completedAssignments: completed,
        pendingAssignments: pending,
        averageScore: Math.round(averageScore * 100) / 100,
        timeSpent: 0 // TODO: Calculate from assignment data
      });
      
      setError(null);
    } catch (err) {
      setError('Failed to load judge assignments');
      console.error('Assignments fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500';
      case 'IN_PROGRESS': return 'bg-yellow-500';
      case 'PENDING': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Completed';
      case 'IN_PROGRESS': return 'In Progress';
      case 'PENDING': return 'Pending';
      default: return status;
    }
  };

  const getPriorityLevel = (assignment: JudgeAssignment) => {
    const assignedDate = new Date(assignment.assignedAt);
    const daysSinceAssigned = Math.floor((Date.now() - assignedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceAssigned > 3) return { level: 'high', text: 'High Priority' };
    if (daysSinceAssigned > 1) return { level: 'medium', text: 'Medium Priority' };
    return { level: 'low', text: 'Normal Priority' };
  };

  const startEvaluation = async (assignmentId: string) => {
    try {
      const response = await fetch(`/api/evaluations/assignments/${assignmentId}/start`, {
        method: 'PATCH'
      });
      
      if (!response.ok) throw new Error('Failed to start evaluation');
      
      // Refresh assignments
      fetchAssignments();
    } catch (err) {
      console.error('Start evaluation error:', err);
    }
  };

  if (error) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Judge Dashboard</h1>
        <p className="text-muted-foreground">
          Review submissions and provide feedback to participants
        </p>
      </div>

      {/* Stats Overview */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stats ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssignments}</div>
              <p className="text-xs text-muted-foreground">
                submissions to review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedAssignments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalAssignments > 0 
                  ? Math.round((stats.completedAssignments / stats.totalAssignments) * 100)
                  : 0}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground">
                awaiting evaluation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}</div>
              <p className="text-xs text-muted-foreground">
                out of 10 points
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Progress Overview */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Progress</CardTitle>
            <CardDescription>
              Track your judging progress and remaining assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{stats.completedAssignments}/{stats.totalAssignments}</span>
                </div>
                <Progress 
                  value={stats.totalAssignments > 0 
                    ? (stats.completedAssignments / stats.totalAssignments) * 100 
                    : 0} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Submissions</CardTitle>
          <CardDescription>
            Review and evaluate the submissions assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              ))}
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any submissions assigned for evaluation yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const priority = getPriorityLevel(assignment);
                return (
                  <div 
                    key={assignment.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-lg">
                            {assignment.submission.title}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs text-white ${getStatusColor(assignment.status)}`}
                          >
                            {getStatusText(assignment.status)}
                          </Badge>
                          {priority.level === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              {priority.text}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{assignment.submission.team.name}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Submitted {new Date(assignment.submission.submittedAt).toLocaleDateString()}
                              </span>
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Event:</span> {assignment.submission.event.name}
                          </div>
                          {assignment.submission.description && (
                            <div>
                              <span className="font-medium">Description:</span> {assignment.submission.description}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        {assignment.status === 'PENDING' && (
                          <Button
                            size="sm"
                            onClick={() => startEvaluation(assignment.id)}
                          >
                            Start Review
                          </Button>
                        )}
                        
                        {assignment.status === 'IN_PROGRESS' && (
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            Continue Review
                          </Button>
                        )}
                        
                        {assignment.status === 'COMPLETED' && (
                          <div className="flex flex-col space-y-1">
                            <Button
                              size="sm"
                              variant="outline"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Results
                            </Button>
                            {assignment.completedAt && (
                              <span className="text-xs text-muted-foreground">
                                Completed {new Date(assignment.completedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {assignments.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignments
                  .filter(a => a.status === 'COMPLETED')
                  .slice(0, 3)
                  .map((assignment) => (
                    <div key={assignment.id} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {assignment.submission.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Evaluated {assignment.completedAt && new Date(assignment.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignments
                  .filter(a => a.status !== 'COMPLETED')
                  .slice(0, 3)
                  .map((assignment) => {
                    const priority = getPriorityLevel(assignment);
                    return (
                      <div key={assignment.id} className="flex items-center space-x-3">
                        <Clock className={`h-4 w-4 ${
                          priority.level === 'high' ? 'text-red-500' : 
                          priority.level === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {assignment.submission.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Assigned {new Date(assignment.assignedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge 
                          variant={priority.level === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {priority.text}
                        </Badge>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
