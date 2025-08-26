export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, ExternalLink, Calendar, Users, CheckCircle, Clock, Plus, Coins } from "lucide-react";
import Link from "next/link";

async function getPOAPs() {
  try {
    const poaps = await prisma.pOAP.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        event: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return poaps;
  } catch (error) {
    console.error("Error fetching POAPs:", error);
    return [];
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export default async function POAPsPage() {
  const poaps = await getPOAPs();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-purple-500" />
            POAPs
          </h1>
          <p className="text-muted-foreground">Proof of Attendance Protocol - Collect digital memorabilia</p>
        </div>
        <Button asChild>
          <Link href="/poaps/mint">
            <Plus className="h-4 w-4 mr-2" />
            Mint POAP
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total POAPs</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poaps.length}</div>
            <p className="text-xs text-muted-foreground">In your collection</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {poaps.filter(poap => {
                const now = new Date();
                const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return poap.createdAt >= thisMonth;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Recently minted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {poaps.filter(poap => poap.tokenId).length}
            </div>
            <p className="text-xs text-muted-foreground">On blockchain</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {poaps.filter(poap => !poap.tokenId).length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting mint</p>
          </CardContent>
        </Card>
      </div>

      {/* POAP Collection */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your POAP Collection</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {poaps.length > 0 ? poaps.map((poap) => (
            <Card key={poap.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
                  {poap.imageUrl ? (
                    <img 
                      src={poap.imageUrl} 
                      alt={poap.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Target className="h-16 w-16 text-white" />
                    </div>
                  )}
                  
                  {poap.tokenId && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Minted
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-lg line-clamp-1">{poap.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {poap.event && (
                      <Badge variant="outline">{poap.event.name}</Badge>
                    )}
                    {poap.tokenId && (
                      <Badge variant="secondary">
                        <Coins className="h-3 w-3 mr-1" />
                        #{poap.tokenId}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {poap.description || "A unique digital collectible commemorating your participation."}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(poap.createdAt)}</span>
                  </div>
                  
                  {poap.contractAddress && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-muted-foreground">Contract:</span>
                      <code className="bg-muted px-1 rounded">
                        {poap.contractAddress.slice(0, 6)}...{poap.contractAddress.slice(-4)}
                      </code>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/poaps/${poap.id}`}>
                      View Details
                    </Link>
                  </Button>
                  
                  {poap.tokenId && poap.contractAddress && (
                    <Button size="sm" variant="outline" asChild>
                      <a 
                        href={`https://etherscan.io/token/${poap.contractAddress}?a=${poap.tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No POAPs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Participate in events to start collecting unique digital memorabilia.
                  </p>
                  <Button asChild>
                    <Link href="/events">
                      <Calendar className="h-4 w-4 mr-2" />
                      Browse Events
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* What are POAPs? */}
      <section>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              What are POAPs?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              POAPs (Proof of Attendance Protocol) are special NFT badges that commemorate your participation in events. 
              Each POAP is unique and serves as a digital memory of your hackathon journey.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="font-semibold text-sm">Proof of Participation</h4>
                <p className="text-xs text-muted-foreground">Verify your attendance at events</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Coins className="h-6 w-6 text-pink-500" />
                </div>
                <h4 className="font-semibold text-sm">Collectible NFTs</h4>
                <p className="text-xs text-muted-foreground">Unique digital collectibles</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-red-500" />
                </div>
                <h4 className="font-semibold text-sm">Community Building</h4>
                <p className="text-xs text-muted-foreground">Connect with fellow hackers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
