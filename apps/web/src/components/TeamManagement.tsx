import { useState, useEffect } from 'react';
import { joinTeam, leaveTeam, createTeam } from '@/server/queries/hackathon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Crown, Mail, Github, Linkedin, ExternalLink, Star } from 'lucide-react';
import { TeamWithMembers, User } from '@/types/database';

interface TeamManagementProps {
  eventId: string;
  currentUser: User;
  teams: TeamWithMembers[];
  isRegistrationOpen: boolean;
}

export default function TeamManagement({ eventId, currentUser, teams, isRegistrationOpen }: TeamManagementProps) {
  const [userTeam, setUserTeam] = useState<TeamWithMembers | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    description: '',
    lookingFor: '',
    skills: [] as string[],
    githubRepo: '',
    website: ''
  });

  useEffect(() => {
    // Find user's current team
    const currentTeam = teams.find(team => 
      team.members.some(member => member.userId === currentUser.id)
    );
    setUserTeam(currentTeam || null);
  }, [teams, currentUser.id]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createTeam({
        name: newTeamData.name,
        description: newTeamData.description,
        eventId,
        leaderId: currentUser.id
      });
      
      setShowCreateForm(false);
      alert('Team created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    setLoading(true);
    
    try {
      await joinTeam(teamId, currentUser.id);
      alert('Join request sent successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Failed to join team');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!userTeam) return;
    
    setLoading(true);
    
    try {
      await leaveTeam(userTeam.id, currentUser.id);
      alert('Left team successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error leaving team:', error);
      alert('Failed to leave team');
    } finally {
      setLoading(false);
    }
  };

  const availableTeams = teams.filter(team => 
    team.members.length < 4 && // Assuming max team size is 4
    !team.members.some(member => member.userId === currentUser.id) &&
    team.status === 'active'
  );

  if (!isRegistrationOpen) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Registration Closed</h3>
          <p className="text-gray-600">Team registration for this event has ended.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User's Current Team */}
      {userTeam ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Your Team: {userTeam.name}
              </span>
              <Badge variant={userTeam.status === 'active' ? 'default' : 'secondary'}>
                {userTeam.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">{userTeam.description}</p>
              
              {/* Team Members */}
              <div>
                <h4 className="font-medium mb-3">Team Members ({userTeam.members.length}/4)</h4>
                <div className="grid gap-3">
                  {userTeam.members.map((member) => {
                    const isOwner = member.role === 'owner';
                    return (
                      <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={member.user.avatar || undefined} />
                          <AvatarFallback>
                            {member.user.name?.slice(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.user.name}</span>
                            {isOwner && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{member.role}</span>
                            {member.user.skills && (
                              <Badge variant="outline" className="text-xs">
                                {JSON.parse(member.user.skills)[0]}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {member.user.github && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={`https://github.com/${member.user.github}`} target="_blank">
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {member.user.linkedin && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={member.user.linkedin} target="_blank">
                                <Linkedin className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowJoinRequests(true)}>
                  Manage Requests
                </Button>
                <Button variant="destructive" onClick={handleLeaveTeam} disabled={loading}>
                  Leave Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* No Team - Show Options */
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <Users className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <h3 className="text-lg font-medium mb-2">You're not on a team yet</h3>
                <p className="text-gray-600">Create a new team or join an existing one to participate.</p>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Team</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateTeam} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Team Name *</label>
                        <Input
                          value={newTeamData.name}
                          onChange={(e) => setNewTeamData({...newTeamData, name: e.target.value})}
                          placeholder="Team Phoenix"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea 
                          className="w-full p-3 border rounded-md h-24"
                          value={newTeamData.description}
                          onChange={(e) => setNewTeamData({...newTeamData, description: e.target.value})}
                          placeholder="We're building innovative AI solutions..."
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Creating...' : 'Create Team'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Teams to Join */}
      {!userTeam && availableTeams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {availableTeams.map((team) => (
                <div key={team.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <p className="text-sm text-gray-600">{team.description}</p>
                    </div>
                    <Badge variant="outline">
                      {team.members.length}/4 members
                    </Badge>
                  </div>
                  
                  {/* Current Members Preview */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {team.members.map((member) => (
                        <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                          <AvatarImage src={member.user.avatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {member.user.name?.slice(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    
                    <Button size="sm" onClick={() => handleJoinTeam(team.id)} disabled={loading}>
                      Request to Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Teams Overview */}
      <Card>
        <CardHeader>
          <CardTitle>All Teams ({teams.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map((team) => (
              <div key={team.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{team.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{team.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {team.members.length}/4
                    </Badge>
                    {team._count?.submissions && team._count.submissions > 0 && (
                      <Badge variant="default" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Submitted
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Team Members */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="border-2 border-background h-6 w-6">
                        <AvatarImage src={member.user.avatar || undefined} />
                        <AvatarFallback className="text-xs">
                          {member.user.name?.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {team.members.length > 3 && (
                    <span className="text-xs text-gray-500">+{team.members.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
