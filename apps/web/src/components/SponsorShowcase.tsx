import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ExternalLink, 
  Star, 
  Award, 
  DollarSign,
  Users,
  Calendar,
  Trophy,
  Target,
  Handshake,
  Gift,
  Briefcase
} from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';
  logo: string;
  website: string;
  description: string;
  contribution: number;
  benefits: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  contactPerson: {
    name: string;
    email: string;
    role: string;
  };
  isActive: boolean;
  joinedAt: Date;
}

interface Prize {
  id: string;
  sponsorId: string;
  name: string;
  category: string;
  value: number;
  description: string;
  criteria: string;
  image?: string;
}

interface SponsorShowcaseProps {
  eventId?: string;
}

export default function SponsorShowcase({ eventId }: SponsorShowcaseProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>('all');

  // Mock sponsors data
  useEffect(() => {
    const mockSponsors: Sponsor[] = [
      {
        id: '1',
        name: 'TechCorp Global',
        tier: 'title',
        logo: '/api/placeholder/200/100',
        website: 'https://techcorp.com',
        description: 'Leading technology solutions provider empowering innovation worldwide.',
        contribution: 50000,
        benefits: [
          'Title sponsor recognition',
          'Main stage presentation slot',
          'Premium booth space',
          'Logo on all materials',
          'Keynote speaking opportunity'
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/techcorp',
          twitter: 'https://twitter.com/techcorp',
          instagram: 'https://instagram.com/techcorp'
        },
        contactPerson: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          role: 'Developer Relations Manager'
        },
        isActive: true,
        joinedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'InnovateX',
        tier: 'platinum',
        logo: '/api/placeholder/180/90',
        website: 'https://innovatex.io',
        description: 'Cutting-edge AI and machine learning platform for developers.',
        contribution: 25000,
        benefits: [
          'Platinum tier recognition',
          'Workshop hosting rights',
          'Mentor network access',
          'Logo placement',
          'Recruitment opportunities'
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/innovatex',
          twitter: 'https://twitter.com/innovatex'
        },
        contactPerson: {
          name: 'Mike Chen',
          email: 'mike.chen@innovatex.io',
          role: 'Community Manager'
        },
        isActive: true,
        joinedAt: new Date('2024-02-01')
      },
      {
        id: '3',
        name: 'CloudBase Solutions',
        tier: 'gold',
        logo: '/api/placeholder/160/80',
        website: 'https://cloudbase.com',
        description: 'Comprehensive cloud infrastructure and DevOps solutions.',
        contribution: 15000,
        benefits: [
          'Gold tier recognition',
          'Technical mentorship',
          'Cloud credits for participants',
          'API access for projects',
          'Swag distribution'
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/cloudbase',
          twitter: 'https://twitter.com/cloudbase',
          instagram: 'https://instagram.com/cloudbase'
        },
        contactPerson: {
          name: 'Emily Rodriguez',
          email: 'emily@cloudbase.com',
          role: 'Developer Advocate'
        },
        isActive: true,
        joinedAt: new Date('2024-02-10')
      },
      {
        id: '4',
        name: 'StartupHub',
        tier: 'silver',
        logo: '/api/placeholder/140/70',
        website: 'https://startuphub.co',
        description: 'Accelerating startup growth through technology and mentorship.',
        contribution: 8000,
        benefits: [
          'Silver tier recognition',
          'Startup showcase booth',
          'Mentorship sessions',
          'Networking events',
          'Investment opportunities'
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/company/startuphub'
        },
        contactPerson: {
          name: 'David Park',
          email: 'david@startuphub.co',
          role: 'Partnerships Director'
        },
        isActive: true,
        joinedAt: new Date('2024-02-20')
      },
      {
        id: '5',
        name: 'DevTools Inc',
        tier: 'bronze',
        logo: '/api/placeholder/120/60',
        website: 'https://devtools.com',
        description: 'Essential development tools and resources for modern developers.',
        contribution: 5000,
        benefits: [
          'Bronze tier recognition',
          'Tool sponsorship',
          'Developer swag',
          'Community access',
          'Resource sharing'
        ],
        socialMedia: {
          twitter: 'https://twitter.com/devtools'
        },
        contactPerson: {
          name: 'Lisa Wang',
          email: 'lisa@devtools.com',
          role: 'Community Lead'
        },
        isActive: true,
        joinedAt: new Date('2024-03-01')
      },
      {
        id: '6',
        name: 'Local Tech Community',
        tier: 'community',
        logo: '/api/placeholder/100/50',
        website: 'https://localtech.org',
        description: 'Supporting local technology initiatives and developer communities.',
        contribution: 2000,
        benefits: [
          'Community recognition',
          'Local event promotion',
          'Volunteer opportunities',
          'Community outreach',
          'Educational support'
        ],
        socialMedia: {
          linkedin: 'https://linkedin.com/groups/localtech'
        },
        contactPerson: {
          name: 'Alex Thompson',
          email: 'alex@localtech.org',
          role: 'Community Organizer'
        },
        isActive: true,
        joinedAt: new Date('2024-03-05')
      }
    ];

    const mockPrizes: Prize[] = [
      {
        id: '1',
        sponsorId: '1',
        name: 'Grand Prize - Innovation Award',
        category: 'Overall Winner',
        value: 10000,
        description: 'Cash prize for the most innovative solution',
        criteria: 'Overall best project judged on innovation, technical execution, and potential impact'
      },
      {
        id: '2',
        sponsorId: '2',
        name: 'Best AI Implementation',
        category: 'Technical Excellence',
        value: 5000,
        description: 'Award for best use of AI/ML technologies',
        criteria: 'Most creative and effective implementation of artificial intelligence'
      },
      {
        id: '3',
        sponsorId: '3',
        name: 'Cloud Excellence Award',
        category: 'Infrastructure',
        value: 3000,
        description: 'Best cloud-native solution',
        criteria: 'Most effective use of cloud technologies and infrastructure'
      },
      {
        id: '4',
        sponsorId: '4',
        name: 'Startup Potential Prize',
        category: 'Entrepreneurship',
        value: 2500,
        description: 'Project with highest commercial potential',
        criteria: 'Business viability and market potential assessment'
      }
    ];

    setSponsors(mockSponsors);
    setPrizes(mockPrizes);
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'title': return 'text-red-600 bg-red-50 border-red-200';
      case 'platinum': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'gold': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'silver': return 'text-gray-500 bg-gray-100 border-gray-300';
      case 'bronze': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'community': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'title': return <Trophy className="w-5 h-5" />;
      case 'platinum': return <Award className="w-5 h-5" />;
      case 'gold': return <Star className="w-5 h-5" />;
      case 'silver': return <Target className="w-5 h-5" />;
      case 'bronze': return <Gift className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const filteredSponsors = selectedTier === 'all' 
    ? sponsors 
    : sponsors.filter(s => s.tier === selectedTier);

  const totalContribution = sponsors.reduce((sum, sponsor) => sum + sponsor.contribution, 0);
  const totalPrizeValue = prizes.reduce((sum, prize) => sum + prize.value, 0);

  const tierCounts = sponsors.reduce((acc, sponsor) => {
    acc[sponsor.tier] = (acc[sponsor.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Sponsor Showcase</h1>
        </div>
        <p className="text-gray-600">
          Meet our amazing sponsors who make this hackathon possible
        </p>
      </div>

      {/* Sponsor Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Handshake className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Sponsors</span>
            </div>
            <p className="text-2xl font-bold mt-2">{sponsors.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Total Contribution</span>
            </div>
            <p className="text-2xl font-bold mt-2">${totalContribution.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Prize Pool</span>
            </div>
            <p className="text-2xl font-bold mt-2">${totalPrizeValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Prizes</span>
            </div>
            <p className="text-2xl font-bold mt-2">{prizes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tier Filter */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sponsor Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTier === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTier('all')}
            >
              All Sponsors ({sponsors.length})
            </Button>
            {['title', 'platinum', 'gold', 'silver', 'bronze', 'community'].map((tier) => (
              <Button
                key={tier}
                variant={selectedTier === tier ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTier(tier)}
                className="capitalize"
              >
                {getTierIcon(tier)}
                <span className="ml-1">{tier} ({tierCounts[tier] || 0})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sponsors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {filteredSponsors.map((sponsor) => (
          <Card key={sponsor.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getTierColor(sponsor.tier)} capitalize`}>
                  {getTierIcon(sponsor.tier)}
                  <span className="ml-1">{sponsor.tier}</span>
                </Badge>
                <span className="text-sm text-gray-500">
                  Since {sponsor.joinedAt.getFullYear()}
                </span>
              </div>
              
              {/* Logo placeholder */}
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              
              <CardTitle className="text-lg">{sponsor.name}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{sponsor.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contribution</span>
                  <span className="text-sm font-bold text-green-600">
                    ${sponsor.contribution.toLocaleString()}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm font-medium mb-2 block">Benefits</span>
                  <div className="space-y-1">
                    {sponsor.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        {benefit}
                      </div>
                    ))}
                    {sponsor.benefits.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{sponsor.benefits.length - 3} more benefits
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Visit Website
                  </Button>
                  <Button size="sm" variant="outline">
                    <Briefcase className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sponsored Prizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sponsored Prizes & Awards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {prizes.map((prize) => {
              const sponsor = sponsors.find(s => s.id === prize.sponsorId);
              return (
                <div key={prize.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{prize.name}</h3>
                    <Badge variant="outline" className="text-green-600">
                      ${prize.value.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sponsored by:</span>
                      <span className="text-sm font-medium">{sponsor?.name}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Category:</span>
                      <span className="text-sm text-gray-600 ml-1">{prize.category}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600">{prize.description}</p>
                    
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                      <strong>Criteria:</strong> {prize.criteria}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
