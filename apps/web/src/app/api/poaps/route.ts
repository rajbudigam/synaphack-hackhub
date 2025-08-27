import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const poaps = await prisma.pOAP.findMany({
      include: {
        event: { select: { name: true } },
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const formattedPOAPs = poaps.map(poap => ({
      id: poap.id,
      eventId: poap.eventId,
      eventName: poap.event?.name || 'Unknown Event',
      recipientId: poap.userId,
      recipientName: poap.user?.name || 'Unknown User',
      recipientEmail: poap.user?.email || 'No email',
      tokenId: poap.tokenId || 'Pending',
      contractAddress: poap.contractAddress,
      title: poap.title,
      description: poap.description || `Proof of participation in ${poap.event?.name}`,
      imageUrl: poap.imageUrl || '/api/poaps/default-image.png',
      claimed: poap.claimed,
      claimedAt: poap.claimedAt,
      mintedAt: poap.createdAt.toISOString()
    }));

    return NextResponse.json(formattedPOAPs);
  } catch (error) {
    console.error("POAPs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch POAPs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, userId, title, description } = body;
    
    if (!eventId || !userId || !title) {
      return NextResponse.json(
        { error: "eventId, userId, and title are required" },
        { status: 400 }
      );
    }

    // Check if user already has a POAP for this event
    const existingPOAP = await prisma.pOAP.findFirst({
      where: { eventId, userId }
    });

    if (existingPOAP) {
      return NextResponse.json(
        { error: "User already has a POAP for this event" },
        { status: 409 }
      );
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { name: true }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Create POAP record (without actual blockchain minting for now)
    const newPOAP = await prisma.pOAP.create({
      data: {
        eventId,
        userId,
        title,
        description: description || `Proof of participation in ${event.name}`,
        tokenId: `poap_${Date.now()}`, // Temporary ID until real minting
        contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415", // Example POAP contract
        imageUrl: `/api/poaps/images/${eventId}.png`,
        claimed: false
      },
      include: {
        event: { select: { name: true } },
        user: { select: { name: true } }
      }
    });

    // TODO: Integrate with real blockchain minting using getPOAP() function
    // const { contract } = getPOAP();
    // const tx = await contract.mintTo(walletAddress, tokenURI);
    // Update POAP with real tokenId and transactionHash
    
    return NextResponse.json({
      id: newPOAP.id,
      eventId: newPOAP.eventId,
      eventName: newPOAP.event?.name,
      recipientId: newPOAP.userId,
      recipientName: newPOAP.user?.name,
      tokenId: newPOAP.tokenId,
      contractAddress: newPOAP.contractAddress,
      title: newPOAP.title,
      description: newPOAP.description,
      imageUrl: newPOAP.imageUrl,
      claimed: newPOAP.claimed,
      mintedAt: newPOAP.createdAt.toISOString()
    });
  } catch (error) {
    console.error("POAP minting error:", error);
    return NextResponse.json(
      { error: "Failed to mint POAP" },
      { status: 500 }
    );
  }
}
