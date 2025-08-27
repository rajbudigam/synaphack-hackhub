"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Code, Loader2 } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";
import { ShellLayout } from "@/components/shell/shell-layout";
import Link from "next/link";

export default function CreateTeamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventId: "",
    skills: "",
    lookingFor: "",
    maxMembers: 4
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
          lookingFor: formData.lookingFor.split(',').map(skill => skill.trim()).filter(Boolean)
        })
      });

      if (response.ok) {
        const team = await response.json();
        router.push(`/teams/${team.id}`);
      } else {
        const error = await response.json();
        alert(`Error creating team: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ShellLayout>
      <PageContainer className="space-y-8" size="lg">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/teams">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              Create New Team
            </h1>
            <p className="text-muted-foreground">
              Start building your dream hackathon team
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., CodeCrafters, InnovateNow, TechTitans"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Team Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your team's mission, goals, and what makes you unique..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventId">Target Event (Optional)</Label>
                  <Select value={formData.eventId} onValueChange={(value) => handleInputChange('eventId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">AI Innovation Hackathon</SelectItem>
                      <SelectItem value="2">Web3 Builder Challenge</SelectItem>
                      <SelectItem value="3">Mobile App Contest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Max Team Size</Label>
                  <Select 
                    value={formData.maxMembers.toString()} 
                    onValueChange={(value) => handleInputChange('maxMembers', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 members</SelectItem>
                      <SelectItem value="3">3 members</SelectItem>
                      <SelectItem value="4">4 members</SelectItem>
                      <SelectItem value="5">5 members</SelectItem>
                      <SelectItem value="6">6 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills">Current Team Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="e.g., React, Python, UI/UX Design, Machine Learning, DevOps"
                />
                <p className="text-sm text-muted-foreground">
                  List the skills and technologies your team already has
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lookingFor">Looking For (comma-separated)</Label>
                <Input
                  id="lookingFor"
                  value={formData.lookingFor}
                  onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                  placeholder="e.g., Backend Developer, Data Scientist, Mobile Developer, Designer"
                />
                <p className="text-sm text-muted-foreground">
                  What skills or roles are you looking to add to your team?
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/teams">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="min-w-32">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </Button>
          </div>
        </form>
      </PageContainer>
    </ShellLayout>
  );
}
