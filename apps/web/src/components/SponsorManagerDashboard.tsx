"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award,
  ExternalLink,
  Plus,
  Edit,
  Eye,
  Mail,
  Phone
} from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  tier: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE" | "STARTUP";
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactName?: string;
  contactPhone?: string;
  benefits: string[];
  isActive: boolean;
  createdAt: string;
  event: {
    id: string;
    name: string;
    slug: string;
  };
}

interface SponsorStats {
  totalSponsors: number;
  activeSponsors: number;
  tierDistribution: Record<string, number>;
  totalBenefits: number;
}

export default function SponsorManagerDashboard() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [stats, setStats] = useState<SponsorStats | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    tier: "BRONZE" as const,
    description: "",
    websiteUrl: "",
    logoUrl: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    benefits: [] as string[]
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchSponsors(selectedEvent);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data.events || []);
      
      if (data.events && data.events.length > 0) {
        setSelectedEvent(data.events[0].id);
      }
    } catch (err) {
      setError('Failed to load events');
      console.error('Events fetch error:', err);
    }
  };

  const fetchSponsors = async (eventId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/sponsors?eventId=${eventId}`);
      if (!response.ok) throw new Error('Failed to fetch sponsors');
      
      const data = await response.json();
      const sponsorList = data.sponsors || [];
      setSponsors(sponsorList);
      
      // Calculate stats
      const totalSponsors = sponsorList.length;
      const activeSponsors = sponsorList.filter((s: Sponsor) => s.isActive).length;
      const tierDistribution = sponsorList.reduce((acc: Record<string, number>, sponsor: Sponsor) => {
        acc[sponsor.tier] = (acc[sponsor.tier] || 0) + 1;
        return acc;
      }, {});
      const totalBenefits = sponsorList.reduce((sum: number, sponsor: Sponsor) => sum + sponsor.benefits.length, 0);
      
      setStats({
        totalSponsors,
        activeSponsors,
        tierDistribution,
        totalBenefits
      });
      
      setError(null);
    } catch (err) {
      setError('Failed to load sponsors');
      console.error('Sponsors fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'bg-gray-800 text-white';
      case 'GOLD': return 'bg-yellow-500 text-black';
      case 'SILVER': return 'bg-gray-400 text-black';
      case 'BRONZE': return 'bg-orange-600 text-white';
      case 'STARTUP': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return '💎';
      case 'GOLD': return '🥇';
      case 'SILVER': return '🥈';
      case 'BRONZE': return '🥉';
      case 'STARTUP': return '🚀';
      default: return '🏢';
    }
  };

  const createSponsor = async () => {
    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newSponsor,
          eventId: selectedEvent
        })
      });

      if (!response.ok) throw new Error('Failed to create sponsor');
      
      // Reset form and refresh data
      setNewSponsor({
        name: "",
        tier: "BRONZE",
        description: "",
        websiteUrl: "",
        logoUrl: "",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        benefits: []
      });
      setShowCreateForm(false);
      fetchSponsors(selectedEvent);
    } catch (err) {
      console.error('Create sponsor error:', err);
      setError('Failed to create sponsor');
    }
  };

  if (error && !sponsors.length) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sponsor Management</h1>
          <p className="text-muted-foreground">
            Manage sponsor relationships and showcase partnerships
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Event Selector */}
          {events.length > 0 && (
            <div className="flex items-center space-x-2">
              <label htmlFor="event-select" className="text-sm font-medium">
                Event:
              </label>
              <select
                id="event-select"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Sponsor
          </Button>
        </div>
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
              <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSponsors}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeSponsors} active partnerships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Tiers</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats.tierDistribution.PLATINUM || 0) + (stats.tierDistribution.GOLD || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Platinum & Gold sponsors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Benefits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBenefits}</div>
              <p className="text-xs text-muted-foreground">
                across all sponsors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalSponsors > 0 
                  ? Math.round((stats.activeSponsors / stats.totalSponsors) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                active participation
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Create Sponsor Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Sponsor</CardTitle>
            <CardDescription>
              Register a new sponsor for this event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Sponsor Name *</label>
                <Input
                  value={newSponsor.name}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Tier *</label>
                <select
                  value={newSponsor.tier}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, tier: e.target.value as any }))}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PLATINUM">Platinum</option>
                  <option value="GOLD">Gold</option>
                  <option value="SILVER">Silver</option>
                  <option value="BRONZE">Bronze</option>
                  <option value="STARTUP">Startup</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Contact Name</label>
                <Input
                  value={newSponsor.contactName}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Contact Person"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Contact Email</label>
                <Input
                  type="email"
                  value={newSponsor.contactEmail}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="contact@company.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  value={newSponsor.websiteUrl}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="https://company.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Logo URL</label>
                <Input
                  value={newSponsor.logoUrl}
                  onChange={(e) => setNewSponsor(prev => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="https://company.com/logo.png"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={newSponsor.description}
                onChange={(e) => setNewSponsor(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the sponsor..."
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={createSponsor}
                disabled={!newSponsor.name || !newSponsor.tier}
              >
                Create Sponsor
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sponsors List */}
      <Card>
        <CardHeader>
          <CardTitle>Sponsor Directory</CardTitle>
          <CardDescription>
            Manage existing sponsors and their details
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
          ) : sponsors.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sponsors yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add your first sponsor to get started with partnership management.
              </p>
              <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Sponsor
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sponsors.map((sponsor) => (
                <div 
                  key={sponsor.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Logo */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        {sponsor.logoUrl ? (
                          <img 
                            src={sponsor.logoUrl} 
                            alt={sponsor.name}
                            className="w-14 h-14 object-contain rounded"
                          />
                        ) : (
                          <Building2 className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-lg">{sponsor.name}</h3>
                          <Badge className={`text-xs ${getTierColor(sponsor.tier)}`}>
                            {getTierIcon(sponsor.tier)} {sponsor.tier}
                          </Badge>
                          {!sponsor.isActive && (
                            <Badge variant="secondary" className="text-xs">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        
                        {sponsor.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {sponsor.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {sponsor.contactName && (
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{sponsor.contactName}</span>
                            </span>
                          )}
                          {sponsor.contactEmail && (
                            <span className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{sponsor.contactEmail}</span>
                            </span>
                          )}
                          {sponsor.contactPhone && (
                            <span className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{sponsor.contactPhone}</span>
                            </span>
                          )}
                        </div>
                        
                        {sponsor.benefits.length > 0 && (
                          <div className="mt-2">
                            <span className="text-sm font-medium">Benefits: </span>
                            <span className="text-sm text-muted-foreground">
                              {sponsor.benefits.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {sponsor.websiteUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(sponsor.websiteUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Website
                        </Button>
                      )}
                      
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Distribution */}
      {stats && sponsors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sponsorship Tiers</CardTitle>
            <CardDescription>
              Distribution of sponsors across different partnership levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.tierDistribution).map(([tier, count]) => (
                <div key={tier} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getTierColor(tier)}`}>
                      {getTierIcon(tier)} {tier}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getTierColor(tier).split(' ')[0]}`}
                        style={{ 
                          width: `${(count / stats.totalSponsors) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
