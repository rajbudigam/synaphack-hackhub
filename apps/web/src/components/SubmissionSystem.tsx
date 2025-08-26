import { useState, useEffect } from 'react';
import { createSubmission, submitSubmission } from '@/server/queries/hackathon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Github, 
  ExternalLink, 
  Video, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Star,
  Trophy,
  Code,
  Presentation
} from 'lucide-react';
import { SubmissionWithRelations, TeamWithMembers } from '@/types/database';

interface SubmissionFormData {
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  videoUrl: string;
  presentationUrl: string;
  techStack: string[];
  features: string[];
  challenges: string;
  accomplishments: string;
  learnings: string;
  nextSteps: string;
  trackId?: string;
}

interface SubmissionSystemProps {
  eventId: string;
  userTeam: TeamWithMembers | null;
  existingSubmission: SubmissionWithRelations | null;
  isSubmissionOpen: boolean;
  tracks: any[];
}

export default function SubmissionSystem({ 
  eventId, 
  userTeam, 
  existingSubmission, 
  isSubmissionOpen,
  tracks 
}: SubmissionSystemProps) {
  const [formData, setFormData] = useState<SubmissionFormData>({
    title: '',
    description: '',
    repoUrl: '',
    liveUrl: '',
    videoUrl: '',
    presentationUrl: '',
    techStack: [],
    features: [],
    challenges: '',
    accomplishments: '',
    learnings: '',
    nextSteps: '',
    trackId: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (existingSubmission) {
      setFormData({
        title: existingSubmission.title,
        description: existingSubmission.description || '',
        repoUrl: existingSubmission.repoUrl || '',
        liveUrl: existingSubmission.liveUrl || '',
        videoUrl: existingSubmission.videoUrl || '',
        presentationUrl: existingSubmission.presentationUrl || '',
        techStack: existingSubmission.techStack ? JSON.parse(existingSubmission.techStack) : [],
        features: existingSubmission.features ? JSON.parse(existingSubmission.features) : [],
        challenges: existingSubmission.challenges || '',
        accomplishments: existingSubmission.accomplishments || '',
        learnings: existingSubmission.learnings || '',
        nextSteps: existingSubmission.nextSteps || '',
        trackId: existingSubmission.trackId || ''
      });
    }
  }, [existingSubmission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTeam) return;
    
    setLoading(true);
    
    try {
      const submissionData = {
        ...formData,
        eventId,
        teamId: userTeam.id
      };
      
      if (existingSubmission) {
        // Update existing submission
        await submitSubmission(existingSubmission.id);
      } else {
        // Create new submission
        await createSubmission(submissionData);
      }
      
      alert('Submission saved successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Failed to save submission');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!existingSubmission) return;
    
    setLoading(true);
    
    try {
      await submitSubmission(existingSubmission.id);
      alert('Submission finalized successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error finalizing submission:', error);
      alert('Failed to finalize submission');
    } finally {
      setLoading(false);
    }
  };

  const addTechStack = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter(t => t !== tech)
    });
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    });
  };

  const getCompletionPercentage = () => {
    const required = ['title', 'description', 'repoUrl'];
    const optional = ['liveUrl', 'videoUrl', 'presentationUrl', 'challenges', 'accomplishments'];
    
    const requiredCompleted = required.filter(field => formData[field as keyof SubmissionFormData]).length;
    const optionalCompleted = optional.filter(field => formData[field as keyof SubmissionFormData]).length;
    
    return Math.round(((requiredCompleted / required.length) * 70) + ((optionalCompleted / optional.length) * 30));
  };

  if (!userTeam) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Join a Team First</h3>
          <p className="text-gray-600">You need to be part of a team to submit a project.</p>
        </CardContent>
      </Card>
    );
  }

  if (!isSubmissionOpen) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Submissions Closed</h3>
          <p className="text-gray-600">The submission period for this event has ended.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Submission Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Project Submission
            </span>
            {existingSubmission && (
              <Badge variant={existingSubmission.status === 'submitted' ? 'default' : 'secondary'}>
                {existingSubmission.status === 'submitted' ? 'Submitted' : 'Draft'}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion</span>
                <span className="text-sm text-gray-600">{getCompletionPercentage()}%</span>
              </div>
              <Progress value={getCompletionPercentage()} className="h-2" />
            </div>
            
            {existingSubmission?.status === 'submitted' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Submission Complete</p>
                  <p className="text-xs text-green-600">
                    Submitted on {existingSubmission.submittedAt ? 
                      new Date(existingSubmission.submittedAt).toLocaleDateString() : 'Unknown'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <Card>
        <CardContent className="p-6">
          <Tabs 
            value={`step-${currentStep}`} 
            onValueChange={(value: string) => setCurrentStep(parseInt(value.split('-')[1]))}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step-1">Basic Info</TabsTrigger>
              <TabsTrigger value="step-2">Links & Media</TabsTrigger>
              <TabsTrigger value="step-3">Technical Details</TabsTrigger>
              <TabsTrigger value="step-4">Reflection</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit as React.FormEventHandler<HTMLFormElement>} className="mt-6">
              <TabsContent value="step-1" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})}
                    placeholder="Revolutionary AI Health Assistant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <textarea 
                    className="w-full p-3 border rounded-md h-32"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your project, its purpose, and how it solves the problem..."
                    required
                  />
                </div>

                {tracks.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Track</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={formData.trackId}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, trackId: e.target.value})}
                    >
                      <option value="">Select a track</option>
                      {tracks.map((track: { id: string; name: string }) => (
                        <option key={track.id} value={track.id}>{track.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="step-2" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Github className="w-4 h-4 inline mr-1" />
                      Repository URL *
                    </label>
                    <Input
                      value={formData.repoUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, repoUrl: e.target.value})}
                      placeholder="https://github.com/username/project"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <ExternalLink className="w-4 h-4 inline mr-1" />
                      Live Demo URL
                    </label>
                    <Input
                      value={formData.liveUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, liveUrl: e.target.value})}
                      placeholder="https://your-project.vercel.app"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Video className="w-4 h-4 inline mr-1" />
                      Demo Video URL
                    </label>
                    <Input
                      value={formData.videoUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, videoUrl: e.target.value})}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Presentation className="w-4 h-4 inline mr-1" />
                      Presentation URL
                    </label>
                    <Input
                      value={formData.presentationUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, presentationUrl: e.target.value})}
                      placeholder="https://docs.google.com/presentation/..."
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tech Stack</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={techInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechInput(e.target.value)}
                      placeholder="React, Node.js, Python..."
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    />
                    <Button type="button" onClick={addTechStack}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.techStack.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTech(tech)}>
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Key Features</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={featureInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeatureInput(e.target.value)}
                      placeholder="Real-time collaboration, AI-powered insights..."
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature: string) => (
                      <Badge key={feature} variant="outline" className="cursor-pointer" onClick={() => removeFeature(feature)}>
                        {feature} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-4" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Challenges Faced</label>
                  <textarea 
                    className="w-full p-3 border rounded-md h-24"
                    value={formData.challenges}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, challenges: e.target.value})}
                    placeholder="What obstacles did you encounter and how did you overcome them?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Accomplishments</label>
                  <textarea 
                    className="w-full p-3 border rounded-md h-24"
                    value={formData.accomplishments}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, accomplishments: e.target.value})}
                    placeholder="What are you most proud of about this project?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">What You Learned</label>
                    <textarea 
                      className="w-full p-3 border rounded-md h-20"
                      value={formData.learnings}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, learnings: e.target.value})}
                      placeholder="Key learnings and insights..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Next Steps</label>
                    <textarea 
                      className="w-full p-3 border rounded-md h-20"
                      value={formData.nextSteps}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, nextSteps: e.target.value})}
                      placeholder="Future plans for this project..."
                    />
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button type="submit" variant="outline" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Draft'}
                  </Button>
                  
                  {currentStep === 4 && (
                    <Button 
                      type="button" 
                      onClick={handleFinalSubmit as React.MouseEventHandler<HTMLButtonElement>}
                      disabled={loading || !existingSubmission || getCompletionPercentage() < 70}
                    >
                      {loading ? 'Submitting...' : 'Final Submit'}
                    </Button>
                  )}
                  
                  {currentStep < 4 && (
                    <Button 
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
