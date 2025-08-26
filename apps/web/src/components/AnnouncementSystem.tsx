"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Megaphone, 
  Bell, 
  AlertTriangle, 
  Info, 
  Clock, 
  Send,
  Pin,
  Filter,
  Search,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { AnnouncementWithRelations, User } from '@/types/database';

interface AnnouncementSystemProps {
  announcements: AnnouncementWithRelations[];
  currentUser: User;
  eventId: string;
  isOrganizer: boolean;
}

interface NewAnnouncementData {
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'update' | 'reminder';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  channels: string[];
  scheduled: boolean;
  publishAt?: Date;
}

export default function AnnouncementSystem({ 
  announcements, 
  currentUser, 
  eventId, 
  isOrganizer 
}: AnnouncementSystemProps) {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newAnnouncement, setNewAnnouncement] = useState<NewAnnouncementData>({
    title: '',
    content: '',
    type: 'general',
    priority: 'normal',
    channels: ['in-app'],
    scheduled: false
  });

  useEffect(() => {
    let filtered = announcements;
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(announcement => announcement.type === filterType);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredAnnouncements(filtered);
  }, [announcements, filterType, searchQuery]);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Implementation would call createAnnouncement API
      console.log('Creating announcement:', newAnnouncement);
      alert('Announcement created successfully!');
      setShowCreateForm(false);
      setNewAnnouncement({
        title: '',
        content: '',
        type: 'general',
        priority: 'normal',
        channels: ['in-app'],
        scheduled: false
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  const toggleChannel = (channel: string) => {
    const channels = newAnnouncement.channels.includes(channel)
      ? newAnnouncement.channels.filter(c => c !== channel)
      : [...newAnnouncement.channels, channel];
    
    setNewAnnouncement({ ...newAnnouncement, channels });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high': return <Bell className="w-4 h-4 text-orange-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'high': return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'update': return <Bell className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Announcements & Updates
            </CardTitle>
            
            {isOrganizer && (
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <Input
                          value={newAnnouncement.title}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                          placeholder="Important Update: Schedule Change"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Type</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={newAnnouncement.type}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value as any})}
                        >
                          <option value="general">General</option>
                          <option value="urgent">Urgent</option>
                          <option value="update">Update</option>
                          <option value="reminder">Reminder</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Content *</label>
                      <textarea 
                        className="w-full p-3 border rounded-md h-32"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                        placeholder="Write your announcement content here..."
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Priority</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={newAnnouncement.priority}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Delivery Channels</label>
                        <div className="flex gap-2">
                          {[
                            { id: 'in-app', label: 'In-App', icon: MessageSquare },
                            { id: 'email', label: 'Email', icon: Mail },
                            { id: 'push', label: 'Push', icon: Smartphone }
                          ].map(({ id, label, icon: Icon }) => (
                            <Button
                              key={id}
                              type="button"
                              size="sm"
                              variant={newAnnouncement.channels.includes(id) ? 'default' : 'outline'}
                              onClick={() => toggleChannel(id)}
                            >
                              <Icon className="w-3 h-3 mr-1" />
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newAnnouncement.scheduled}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduled: e.target.checked})}
                        />
                        Schedule for later
                      </label>
                      
                      {newAnnouncement.scheduled && (
                        <Input
                          type="datetime-local"
                          value={newAnnouncement.publishAt ? new Date(newAnnouncement.publishAt).toISOString().slice(0, 16) : ''}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, publishAt: new Date(e.target.value)})}
                        />
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Publishing...' : newAnnouncement.scheduled ? 'Schedule' : 'Publish Now'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter by type */}
            <select 
              className="p-2 border rounded-md"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
              <option value="update">Updates</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Megaphone className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Announcements</h3>
              <p className="text-gray-600">
                {searchQuery || filterType !== 'all' 
                  ? 'No announcements match your search criteria.' 
                  : 'No announcements have been posted yet.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`${getPriorityColor(announcement.priority)} border-l-4`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(announcement.priority)}
                      {getTypeIcon(announcement.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {announcement.type}
                        </Badge>
                        {announcement.priority === 'urgent' && (
                          <Badge variant="destructive" className="text-xs">
                            URGENT
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{announcement.content}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(announcement.createdAt).toLocaleDateString()} at {new Date(announcement.createdAt).toLocaleTimeString()}
                        </span>
                        
                        {announcement.event && (
                          <span>• {announcement.event.name}</span>
                        )}
                        
                        {announcement.channels && (
                          <span>• Sent via {JSON.parse(announcement.channels).join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {announcement.priority === 'urgent' && (
                    <Pin className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Notification Preferences (for participants) */}
      {!isOrganizer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive announcements via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Get instant notifications on your device</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Urgent Only</h4>
                  <p className="text-sm text-gray-600">Only receive urgent announcements</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
