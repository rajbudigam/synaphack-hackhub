import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wallet, 
  Coins, 
  Award, 
  ExternalLink, 
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Star,
  Trophy,
  Shield,
  Clock,
  Users,
  Link
} from 'lucide-react';
import { User, Event, TeamWithMembers, Submission } from '@/types/database';

interface POAPMetadata {
  id: string;
  eventId: string;
  eventName: string;
  description: string;
  imageUrl: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  recipient: string;
  mintedAt: Date;
  transactionHash?: string;
  tokenId?: string;
}

interface NFTBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  recipientId: string;
  eventId: string;
  issuedAt: Date;
  contractAddress?: string;
  tokenId?: string;
  openseaUrl?: string;
}

interface Web3Integration {
  isConnected: boolean;
  walletAddress?: string;
  network: string;
  balance: string;
}

interface Web3POAPNFTProps {
  events: Event[];
  users: User[];
  teams: TeamWithMembers[];
  submissions: Submission[];
  currentUser?: User;
}

export default function Web3POAPNFT({ events, users, teams, submissions, currentUser }: Web3POAPNFTProps) {
  const [web3, setWeb3] = useState<Web3Integration>({
    isConnected: false,
    network: 'polygon',
    balance: '0'
  });
  
  const [poaps, setPOAPs] = useState<POAPMetadata[]>([]);
  const [nftBadges, setNFTBadges] = useState<NFTBadge[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [mintingProgress, setMintingProgress] = useState(0);

  // Mock Web3 connection
  const connectWallet = async () => {
    setIsMinting(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setWeb3({
      isConnected: true,
      walletAddress: '0x742d35Cc6634C0532925a3b8D6Ed74482f71fA07',
      network: 'polygon',
      balance: '1.234'
    });
    setIsMinting(false);
  };

  const disconnectWallet = () => {
    setWeb3({
      isConnected: false,
      network: 'polygon',
      balance: '0'
    });
  };

  // Generate mock POAP metadata
  const generatePOAP = async (event: Event, recipient: User): Promise<POAPMetadata> => {
    const poap: POAPMetadata = {
      id: `poap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventId: event.id,
      eventName: event.name,
      description: `Proof of attendance for ${event.name} hackathon`,
      imageUrl: `/api/placeholder/300/300?text=${encodeURIComponent(event.name)}`,
      attributes: [
        { trait_type: 'Event', value: event.name },
        { trait_type: 'Date', value: new Date(event.startsAt).toLocaleDateString() },
        { trait_type: 'Type', value: 'Hackathon' },
        { trait_type: 'Role', value: recipient.role || 'participant' },
        { trait_type: 'Network', value: 'Polygon' }
      ],
      recipient: recipient.id,
      mintedAt: new Date(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      tokenId: Math.floor(Math.random() * 10000).toString()
    };
    
    return poap;
  };

  // Generate mock NFT badge
  const generateNFTBadge = async (
    recipient: User, 
    event: Event, 
    type: 'winner' | 'participant' | 'mentor' | 'judge'
  ): Promise<NFTBadge> => {
    const rarityMap = {
      winner: 'legendary' as const,
      judge: 'epic' as const,
      mentor: 'rare' as const,
      participant: 'common' as const
    };

    const badge: NFTBadge = {
      id: `nft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${event.name} ${type.charAt(0).toUpperCase() + type.slice(1)} Badge`,
      description: `Exclusive NFT badge for ${type}s of ${event.name}`,
      imageUrl: `/api/placeholder/400/400?text=${encodeURIComponent(type)}_Badge`,
      criteria: `Awarded for ${type === 'winner' ? 'winning' : 'participating in'} ${event.name}`,
      rarity: rarityMap[type],
      recipientId: recipient.id,
      eventId: event.id,
      issuedAt: new Date(),
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: Math.floor(Math.random() * 10000).toString(),
      openseaUrl: `https://opensea.io/assets/polygon/0x1234567890123456789012345678901234567890/${Math.floor(Math.random() * 10000)}`
    };
    
    return badge;
  };

  // Mint POAPs for event participants
  const mintEventPOAPs = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    setIsMinting(true);
    setMintingProgress(0);

    // Get all participants from teams in this event
    const eventTeams = teams.filter(t => t.eventId === eventId);
    const participantIds = new Set<string>();
    
    eventTeams.forEach(team => {
      team.members?.forEach((member: any) => {
        participantIds.add(member.userId);
      });
    });

    const participants = users.filter(u => participantIds.has(u.id));
    const newPOAPs: POAPMetadata[] = [];

    for (let i = 0; i < participants.length; i++) {
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const poap = await generatePOAP(event, participants[i]);
      newPOAPs.push(poap);
      
      setMintingProgress(((i + 1) / participants.length) * 100);
    }

    setPOAPs(prev => [...prev, ...newPOAPs]);
    setIsMinting(false);
  };

  // Mint NFT badges for winners and participants
  const mintEventBadges = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    setIsMinting(true);
    setMintingProgress(0);

    const eventSubmissions = submissions.filter(s => s.eventId === eventId);
    const eventTeams = teams.filter(t => t.eventId === eventId);
    const newBadges: NFTBadge[] = [];

    // Get winners (top 3 submissions) - using random scoring for now
    const winnerSubmissions = eventSubmissions
      .sort((a, b) => (Math.random() - 0.5)) // Random for demo
      .slice(0, 3);

    let processed = 0;
    const totalToProcess = eventSubmissions.length + 5; // rough estimate

    // Mint winner badges
    for (const submission of winnerSubmissions) {
      const team = eventTeams.find(t => t.id === submission.teamId);
      if (team?.members) {
        for (const member of team.members as any[]) {
          const user = users.find(u => u.id === member.userId);
          if (user) {
            await new Promise(resolve => setTimeout(resolve, 800));
            const badge = await generateNFTBadge(user, event, 'winner');
            newBadges.push(badge);
            processed++;
            setMintingProgress((processed / totalToProcess) * 100);
          }
        }
      }
    }

    // Mint participant badges for others
    const winnerUserIds = new Set(
      winnerSubmissions.flatMap(s => {
        const team = eventTeams.find(t => t.id === s.teamId);
        return team?.members?.map((m: any) => m.userId) || [];
      })
    );

    const participantIds = new Set<string>();
    eventTeams.forEach(team => {
      team.members?.forEach((member: any) => {
        if (!winnerUserIds.has(member.userId)) {
          participantIds.add(member.userId);
        }
      });
    });

    const participants = users.filter(u => participantIds.has(u.id));
    
    for (const participant of participants) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const badge = await generateNFTBadge(participant, event, 'participant');
      newBadges.push(badge);
      processed++;
      setMintingProgress((processed / totalToProcess) * 100);
    }

    setNFTBadges(prev => [...prev, ...newBadges]);
    setIsMinting(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'epic': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'rare': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'common': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Trophy className="w-4 h-4" />;
      case 'epic': return <Star className="w-4 h-4" />;
      case 'rare': return <Award className="w-4 h-4" />;
      case 'common': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const userPOAPs = currentUser ? poaps.filter(p => p.recipient === currentUser.id) : [];
  const userBadges = currentUser ? nftBadges.filter(b => b.recipientId === currentUser.id) : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Web3 POAP & NFT Badges</h1>
        </div>
        <p className="text-gray-600">
          Mint and collect blockchain-verified proof of attendance and achievement badges
        </p>
      </div>

      {/* Web3 Connection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Web3 Wallet Connection</CardTitle>
        </CardHeader>
        <CardContent>
          {!web3.isConnected ? (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Connect Your Wallet</h3>
                <p className="text-sm text-gray-600">Connect your Web3 wallet to mint POAPs and NFT badges</p>
              </div>
              <Button onClick={connectWallet} disabled={isMinting}>
                {isMinting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Wallet Connected
                  </h3>
                  <p className="text-sm text-gray-600 font-mono">{web3.walletAddress}</p>
                </div>
                <Button variant="outline" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium ml-1 capitalize">{web3.network}</span>
                </div>
                <div>
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium ml-1">{web3.balance} MATIC</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Minting Controls */}
      {web3.isConnected && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mint Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Event</label>
                  <select 
                    value={selectedEvent} 
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Choose an event...</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => mintEventPOAPs(selectedEvent)}
                    disabled={!selectedEvent || isMinting}
                    className="flex-1"
                  >
                    <Coins className="w-4 h-4 mr-2" />
                    Mint POAPs
                  </Button>
                  
                  <Button 
                    onClick={() => mintEventBadges(selectedEvent)}
                    disabled={!selectedEvent || isMinting}
                    className="flex-1"
                    variant="outline"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Mint NFT Badges
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{poaps.length}</div>
                    <p className="text-sm text-gray-600">POAPs Minted</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{nftBadges.length}</div>
                    <p className="text-sm text-gray-600">NFT Badges</p>
                  </div>
                </div>
                
                {isMinting && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Minting Progress</span>
                      <span>{Math.round(mintingProgress)}%</span>
                    </div>
                    <Progress value={mintingProgress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Collections */}
      {currentUser && web3.isConnected && (
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* User POAPs */}
          <Card>
            <CardHeader>
              <CardTitle>Your POAPs ({userPOAPs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {userPOAPs.length === 0 ? (
                <div className="text-center py-8">
                  <Coins className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No POAPs collected yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userPOAPs.map((poap) => (
                    <div key={poap.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Coins className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{poap.eventName}</h3>
                          <p className="text-sm text-gray-600">{poap.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">Token #{poap.tokenId}</Badge>
                            <span className="text-xs text-gray-500">
                              {poap.mintedAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User NFT Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Your NFT Badges ({userBadges.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {userBadges.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No NFT badges earned yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBadges.map((badge) => (
                    <div key={badge.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          {getRarityIcon(badge.rarity)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getRarityColor(badge.rarity)}>
                              {getRarityIcon(badge.rarity)}
                              <span className="ml-1 capitalize">{badge.rarity}</span>
                            </Badge>
                            <Badge variant="outline">#{badge.tokenId}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            OpenSea
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Collection Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Global Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* All POAPs */}
            <div>
              <h3 className="font-medium mb-4">Recent POAPs</h3>
              <div className="space-y-2">
                {poaps.slice(0, 5).map((poap) => (
                  <div key={poap.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="text-sm font-medium">{poap.eventName}</span>
                      <p className="text-xs text-gray-500">Token #{poap.tokenId}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {poap.mintedAt.toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* All NFT Badges */}
            <div>
              <h3 className="font-medium mb-4">Recent NFT Badges</h3>
              <div className="space-y-2">
                {nftBadges.slice(0, 5).map((badge) => (
                  <div key={badge.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="text-sm font-medium">{badge.name}</span>
                      <p className="text-xs text-gray-500">#{badge.tokenId}</p>
                    </div>
                    <Badge className={getRarityColor(badge.rarity)} variant="outline">
                      {getRarityIcon(badge.rarity)}
                      <span className="ml-1 capitalize text-xs">{badge.rarity}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
