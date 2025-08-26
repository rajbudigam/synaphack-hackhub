import { NextResponse } from "next/server";

export async function GET() {
  // Mock POAP data
  const mockPOAPs = [
    {
      id: "poap_1",
      eventId: "1",
  eventName: "HackHub 3.0",
      recipientId: "user1",
      recipientAddress: "0x1234...5678",
      tokenId: "12345",
      imageUrl: "https://poap.example.com/image/12345.png",
      metadata: {
  name: "HackHub 3.0 Participant",
  description: "Proof of participation in HackHub 3.0",
        attributes: [
          { trait_type: "Event", value: "HackHub 3.0" },
          { trait_type: "Role", value: "Participant" },
          { trait_type: "Year", value: "2025" }
        ]
      },
      mintedAt: "2025-08-31T20:00:00Z",
      transactionHash: "0xabcd...efgh"
    }
  ];

  return NextResponse.json(mockPOAPs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock POAP minting
    const newPOAP = {
      id: `poap_${Date.now()}`,
      ...body,
      tokenId: Date.now().toString(),
      imageUrl: `https://poap.example.com/image/${Date.now()}.png`,
      mintedAt: new Date().toISOString(),
      transactionHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
    };
    
    return NextResponse.json(newPOAP);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to mint POAP" },
      { status: 500 }
    );
  }
}
