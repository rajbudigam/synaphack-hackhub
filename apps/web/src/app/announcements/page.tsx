export const dynamic = "force-dynamic";

import { prisma } from "@/server/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Megaphone, Calendar, Clock, AlertCircle, Info, CheckCircle, Plus } from "lucide-react";
import Link from "next/link";

async function getAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        author: true,
        event: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case 'high':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'medium':
      return <Info className="h-5 w-5 text-yellow-500" />;
    case 'low':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20';
    case 'medium':
      return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20';
    case 'low':
      return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20';
    default:
      return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20';
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function getTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-blue-500" />
            Announcements
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest news and updates</p>
        </div>
        <Button asChild>
          <Link href="/announcements/create">
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Link>
        </Button>
      </div>

      {/* Urgent Announcements */}
      {announcements.some(a => a.priority === 'urgent') && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📌 Urgent Announcements
          </h2>
          <div className="space-y-4">
            {announcements
              .filter(announcement => announcement.priority === 'urgent')
              .map((announcement) => (
                <Card key={announcement.id} className={`${getPriorityColor(announcement.priority)} border-l-4`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getPriorityIcon(announcement.priority)}
                        <div>
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={announcement.priority === 'high' ? 'destructive' : 
                                          announcement.priority === 'medium' ? 'default' : 'secondary'}>
                              {announcement.priority.toUpperCase()}
                            </Badge>
                            {announcement.event && (
                              <Badge variant="outline">{announcement.event.name}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(announcement.createdAt)}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(announcement.createdAt)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p>{announcement.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={announcement.author?.avatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {announcement.author?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          by {announcement.author?.name || 'Unknown'}
                        </span>
                      </div>
                      
                      {announcement.publishAt && announcement.publishAt > new Date() && (
                        <Badge variant="outline">
                          Scheduled for {formatDate(announcement.publishAt)}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      )}

      {/* All Announcements */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Announcements</h2>
        <div className="space-y-4">
          {announcements.length > 0 ? announcements
            .filter(announcement => announcement.priority !== 'urgent')
            .map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getPriorityIcon(announcement.priority)}
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={announcement.priority === 'high' ? 'destructive' : 
                                        announcement.priority === 'medium' ? 'default' : 'secondary'}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                          {announcement.event && (
                            <Badge variant="outline">{announcement.event.name}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(announcement.createdAt)}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(announcement.createdAt)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>{announcement.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={announcement.author?.avatar || undefined} />
                        <AvatarFallback className="text-xs">
                          {announcement.author?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        by {announcement.author?.name || 'Unknown'}
                      </span>
                    </div>
                    
                    {announcement.publishAt && announcement.publishAt > new Date() && (
                      <Badge variant="outline">
                        Scheduled for {formatDate(announcement.publishAt)}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )) : (
            <Card>
              <CardContent className="text-center py-12">
                <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No announcements yet</h3>
                <p className="text-muted-foreground mb-4">
                  Check back later for updates and important information.
                </p>
                <Button asChild>
                  <Link href="/announcements/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
