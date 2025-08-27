"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Users, Trophy, Loader2 } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";
import { ShellLayout } from "@/components/shell/shell-layout";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    mode: "hybrid",
    startsAt: "",
    endsAt: "",
    registrationEnds: "",
    maxTeamSize: 4,
    minTeamSize: 1,
    maxTeams: 100,
    prizeMoney: "",
    rules: "",
    tags: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          maxTeamSize: parseInt(formData.maxTeamSize.toString()),
          minTeamSize: parseInt(formData.minTeamSize.toString()),
          maxTeams: parseInt(formData.maxTeams.toString())
        })
      });

      if (response.ok) {
        const event = await response.json();
        router.push(`/events/${event.slug}`);
      } else {
        const error = await response.json();
        alert(`Error creating event: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
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
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Create New Event
            </h1>
            <p className="text-muted-foreground">
              Set up an exciting hackathon or competition
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., AI Innovation Hackathon 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mode">Event Mode *</Label>
                  <Select value={formData.mode} onValueChange={(value) => handleInputChange('mode', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">In-Person</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your event (1-2 sentences)"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  placeholder="Detailed description, rules, themes, and what participants can expect..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="e.g., AI, Web3, Mobile, Healthcare"
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startsAt">Start Date & Time *</Label>
                  <Input
                    id="startsAt"
                    type="datetime-local"
                    value={formData.startsAt}
                    onChange={(e) => handleInputChange('startsAt', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endsAt">End Date & Time *</Label>
                  <Input
                    id="endsAt"
                    type="datetime-local"
                    value={formData.endsAt}
                    onChange={(e) => handleInputChange('endsAt', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationEnds">Registration Deadline</Label>
                  <Input
                    id="registrationEnds"
                    type="datetime-local"
                    value={formData.registrationEnds}
                    onChange={(e) => handleInputChange('registrationEnds', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minTeamSize">Min Team Size</Label>
                  <Input
                    id="minTeamSize"
                    type="number"
                    min={1}
                    max={10}
                    value={formData.minTeamSize}
                    onChange={(e) => handleInputChange('minTeamSize', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTeamSize">Max Team Size</Label>
                  <Input
                    id="maxTeamSize"
                    type="number"
                    min={1}
                    max={10}
                    value={formData.maxTeamSize}
                    onChange={(e) => handleInputChange('maxTeamSize', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTeams">Max Teams (Optional)</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    min={1}
                    value={formData.maxTeams}
                    onChange={(e) => handleInputChange('maxTeams', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prizes & Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Prizes & Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prizeMoney">Prize Pool</Label>
                <Input
                  id="prizeMoney"
                  value={formData.prizeMoney}
                  onChange={(e) => handleInputChange('prizeMoney', e.target.value)}
                  placeholder="e.g., $10,000 in total prizes"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules">Rules & Guidelines</Label>
                <Textarea
                  id="rules"
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                  placeholder="Event rules, judging criteria, submission requirements..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/events">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="min-w-32">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </PageContainer>
    </ShellLayout>
  );
}
