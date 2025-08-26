export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, MessageCircle, Calendar, Users, Star, Clock, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

async function getMentors() {
  try {
    // For now, we'll return mock data since mentors might not be in the current schema
    // In a real implementation, this would fetch from a mentors table
    const mockMentors = [
      {
        id: "1",
        name: "Sarah Chen",
        title: "Senior Full-Stack Developer",
        company: "Google",
        avatar: null,
        bio: "10+ years in web development, specializing in React, Node.js, and cloud architecture.",
        skills: ["React", "Node.js", "AWS", "GraphQL", "TypeScript"],
        rating: 4.9,
        sessionsCompleted: 156,
        availability: "Available",
        linkedIn: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
        price: "$50/hour",
        languages: ["English", "Mandarin"]
      },
      {
        id: "2",
        name: "Alex Rodriguez",
        title: "DevOps Engineer",
        company: "Microsoft",
        avatar: null,
        bio: "Expert in CI/CD, containerization, and cloud infrastructure. Love helping teams scale their applications.",
        skills: ["Docker", "Kubernetes", "Azure", "Terraform", "Python"],
        rating: 4.8,
        sessionsCompleted: 89,
        availability: "Busy",
        linkedIn: "https://linkedin.com/in/alexrodriguez",
        github: "https://github.com/alexrodriguez", 
        price: "$60/hour",
        languages: ["English", "Spanish"]
      },
      {
        id: "3",
        name: "Priya Patel",
        title: "AI/ML Engineer",
        company: "OpenAI",
        avatar: null,
        bio: "Passionate about machine learning and AI applications. Experienced with TensorFlow, PyTorch, and MLOps.",
        skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Data Science"],
        rating: 4.95,
        sessionsCompleted: 234,
        availability: "Available",
        linkedIn: "https://linkedin.com/in/priyapatel",
        github: "https://github.com/priyapatel",
        price: "$75/hour",
        languages: ["English", "Hindi", "Gujarati"]
      }
    ];

    return mockMentors;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
}

async function getMentorshipSessions() {
  try {
    // Mock mentorship sessions data
    const mockSessions = [
      {
        id: "1",
        mentorName: "Sarah Chen",
        topic: "React Performance Optimization",
        scheduledAt: new Date("2025-08-28T14:00:00Z"),
        duration: 60,
        status: "upcoming"
      },
      {
        id: "2", 
        mentorName: "Alex Rodriguez",
        topic: "Docker Containerization",
        scheduledAt: new Date("2025-08-25T10:00:00Z"),
        duration: 45,
        status: "completed"
      }
    ];

    return mockSessions;
  } catch (error) {
    console.error("Error fetching mentorship sessions:", error);
    return [];
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export default async function MentorsPage() {
  const mentors = await getMentors();
  const sessions = await getMentorshipSessions();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-500" />
            Mentorship
          </h1>
          <p className="text-muted-foreground">Connect with experienced developers and learn from the best</p>
        </div>
        <Button asChild>
          <Link href="/mentors/become">
            <Plus className="h-4 w-4 mr-2" />
            Become a Mentor
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentors.filter(m => m.availability === "Available").length}</div>
            <p className="text-xs text-muted-foreground">Ready to help</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">Total booked</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessions.filter(s => s.status === "upcoming").length}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground">From mentors</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      {sessions.filter(s => s.status === "upcoming").length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            {sessions
              .filter(s => s.status === "upcoming")
              .map((session) => (
                <Card key={session.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{session.topic}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {session.mentorName} • {session.duration} minutes
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatDate(session.scheduledAt)}</div>
                        <Button size="sm" className="mt-2">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      )}

      {/* Available Mentors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Mentors</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar || undefined} />
                    <AvatarFallback className="text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {mentor.title} at {mentor.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                        {mentor.availability}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({mentor.sessionsCompleted} sessions)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">{mentor.price}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{mentor.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Languages</h4>
                  <div className="flex gap-1">
                    {mentor.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  
                  <div className="flex gap-1">
                    <Button size="icon" variant="outline" asChild>
                      <a href={mentor.linkedIn} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                      <a href={mentor.github} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              How Mentorship Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="font-semibold mb-1">1. Choose a Mentor</h4>
                <p className="text-sm text-muted-foreground">
                  Browse our curated list of experienced developers and find the perfect match for your needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-indigo-500" />
                </div>
                <h4 className="font-semibold mb-1">2. Book a Session</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule a 1-on-1 session at a time that works for both you and your mentor.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="font-semibold mb-1">3. Learn & Grow</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized guidance, code reviews, and career advice from industry experts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
