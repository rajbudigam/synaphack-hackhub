import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy,
  Play,
  ExternalLink,
  Tv
} from "lucide-react";

export default function LivePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Tv className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold">Live Events</h1>
          <Badge className="text-red-600 bg-red-50 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
            LIVE
          </Badge>
        </div>
        <p className="text-gray-600">
          Watch live hackathon events, presentations, and announcements
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Featured Live Stream */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Main Stream - Opening Ceremony
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">Live Stream Player</p>
                <p className="text-sm opacity-75">Click to start watching</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="text-red-600 bg-red-50">Live</Badge>
                <span className="text-sm text-gray-600">1,234 viewers</span>
              </div>
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Streams */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Team Presentations</h3>
                  <Badge variant="outline">In 2 hours</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Watch teams present their innovative solutions
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>2:00 PM - 4:00 PM</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Judging & Results</h3>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Live judging session and winner announcement
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Aug 26, 10:00 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Live Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Active Participants</span>
                </div>
                <span className="font-bold">847</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Submissions Today</span>
                </div>
                <span className="font-bold">23</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-red-500" />
                  <span>Live Viewers</span>
                </div>
                <span className="font-bold">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}