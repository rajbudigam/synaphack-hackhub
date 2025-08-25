import { useState } from 'react';
import { createEvent } from '@/server/queries/hackathon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Trophy, Settings } from 'lucide-react';

interface EventFormData {
  name: string;
  description: string;
  longDescription: string;
  mode: 'online' | 'offline' | 'hybrid';
  startsAt: string;
  endsAt: string;
  registrationEnds: string;
  maxTeamSize: number;
  minTeamSize: number;
  maxTeams: number;
  prizeMoney: string;
  rules: string;
  schedule: string;
  sponsors: string[];
  mentorsList: string[];
  tags: string[];
  coverImage: string;
  logoImage: string;
}

export default function CreateEventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    longDescription: '',
    mode: 'online',
    startsAt: '',
    endsAt: '',
    registrationEnds: '',
    maxTeamSize: 4,
    minTeamSize: 1,
    maxTeams: 100,
    prizeMoney: '',
    rules: '',
    schedule: '',
    sponsors: [],
    mentorsList: [],
    tags: [],
    coverImage: '',
    logoImage: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const eventData = {
        ...formData,
        startsAt: new Date(formData.startsAt),
        endsAt: new Date(formData.endsAt),
        registrationEnds: formData.registrationEnds ? new Date(formData.registrationEnds) : undefined,
        organizerId: 'current-user-id', // Get from auth context
      };
      
      await createEvent(eventData);
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Event Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="SynapHack 3.0 Global Championship"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Short Description *</label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="48-hour global hackathon for innovative solutions"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Long Description</label>
          <textarea 
            className="w-full p-3 border rounded-md h-32"
            value={formData.longDescription}
            onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
            placeholder="Detailed event description, objectives, and goals..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mode *</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={formData.mode}
              onChange={(e) => setFormData({...formData, mode: e.target.value as 'online' | 'offline' | 'hybrid'})}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Prize Money</label>
            <Input
              value={formData.prizeMoney}
              onChange={(e) => setFormData({...formData, prizeMoney: e.target.value})}
              placeholder="$50,000 total"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date & Time *</label>
            <Input
              type="datetime-local"
              value={formData.startsAt}
              onChange={(e) => setFormData({...formData, startsAt: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">End Date & Time *</label>
            <Input
              type="datetime-local"
              value={formData.endsAt}
              onChange={(e) => setFormData({...formData, endsAt: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Registration Deadline</label>
          <Input
            type="datetime-local"
            value={formData.registrationEnds}
            onChange={(e) => setFormData({...formData, registrationEnds: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min Team Size *</label>
            <Input
              type="number"
              min="1"
              value={formData.minTeamSize}
              onChange={(e) => setFormData({...formData, minTeamSize: parseInt(e.target.value)})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Max Team Size *</label>
            <Input
              type="number"
              min="1"
              value={formData.maxTeamSize}
              onChange={(e) => setFormData({...formData, maxTeamSize: parseInt(e.target.value)})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Max Teams</label>
            <Input
              type="number"
              min="1"
              value={formData.maxTeams}
              onChange={(e) => setFormData({...formData, maxTeams: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rules & Guidelines</label>
          <textarea 
            className="w-full p-3 border rounded-md h-32"
            value={formData.rules}
            onChange={(e) => setFormData({...formData, rules: e.target.value})}
            placeholder="Event rules, code of conduct, submission guidelines..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Schedule</label>
          <textarea 
            className="w-full p-3 border rounded-md h-32"
            value={formData.schedule}
            onChange={(e) => setFormData({...formData, schedule: e.target.value})}
            placeholder="Day 1: Registration & Team Formation&#10;Day 2: Development Phase&#10;Day 3: Presentations & Judging"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image URL</label>
            <Input
              value={formData.coverImage}
              onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Logo Image URL</label>
            <Input
              value={formData.logoImage}
              onChange={(e) => setFormData({...formData, logoImage: e.target.value})}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Create New Hackathon Event
          </CardTitle>
          
          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex-1 h-2 rounded ${
                step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`} />
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Basic Info</span>
            <span>Date & Teams</span>
            <span>Rules & Media</span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Event'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{formData.name || 'Event Name'}</h3>
              <p className="text-gray-600">{formData.description || 'Event description will appear here'}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {formData.mode}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {formData.minTeamSize}-{formData.maxTeamSize} per team
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                {formData.prizeMoney || 'TBD'}
              </Badge>
              {formData.startsAt && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(formData.startsAt).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
