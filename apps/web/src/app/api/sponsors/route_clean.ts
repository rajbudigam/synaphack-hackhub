import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-server";

// GET /api/sponsors - List sponsors based on user role
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer", "sponsor_manager"]);
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const where = eventId ? { eventId } : {};

    const sponsors = await prisma.sponsor.findMany({
      where,
      include: {
        event: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      sponsors
    });

  } catch (error) {
    console.error("Sponsor retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve sponsors" },
      { status: 500 }
    );
  }
}

// POST /api/sponsors - Create new sponsor
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const body = await request.json();
    const { 
      eventId, 
      name, 
      tier, 
      description, 
      websiteUrl, 
      logoUrl,
      contact,
      amount
    } = body;

    if (!eventId || !name || !tier) {
      return NextResponse.json(
        { error: "eventId, name, and tier are required" },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = ["platinum", "gold", "silver", "bronze"];
    if (!validTiers.includes(tier.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid tier. Must be one of: " + validTiers.join(", ") },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Generate unique slug
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;

    // Create sponsor
    const sponsor = await prisma.sponsor.create({
      data: {
        eventId,
        name,
        slug,
        tier: tier.toLowerCase(),
        description: description || undefined,
        website: websiteUrl || undefined,
        logoUrl: logoUrl || undefined,
        contact: contact || undefined,
        amount: amount || undefined
      },
      include: {
        event: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      sponsor
    });

  } catch (error) {
    console.error("Sponsor creation error:", error);
    return NextResponse.json(
      { error: "Failed to create sponsor" },
      { status: 500 }
    );
  }
}

// PUT /api/sponsors - Update sponsor
export async function PUT(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const body = await request.json();
    const { 
      id,
      name, 
      tier, 
      description, 
      websiteUrl, 
      logoUrl,
      contact,
      amount,
      status 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Sponsor ID is required" },
        { status: 400 }
      );
    }

    // Check if sponsor exists
    const existingSponsor = await prisma.sponsor.findUnique({
      where: { id }
    });

    if (!existingSponsor) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    // Validate tier if provided
    if (tier) {
      const validTiers = ["platinum", "gold", "silver", "bronze"];
      if (!validTiers.includes(tier.toLowerCase())) {
        return NextResponse.json(
          { error: "Invalid tier. Must be one of: " + validTiers.join(", ") },
          { status: 400 }
        );
      }
    }

    // Update sponsor
    const updatedSponsor = await prisma.sponsor.update({
      where: { id },
      data: {
        name: name || existingSponsor.name,
        tier: tier ? tier.toLowerCase() : existingSponsor.tier,
        description: description !== undefined ? description : existingSponsor.description,
        website: websiteUrl !== undefined ? websiteUrl : existingSponsor.website,
        logoUrl: logoUrl !== undefined ? logoUrl : existingSponsor.logoUrl,
        contact: contact !== undefined ? contact : existingSponsor.contact,
        amount: amount !== undefined ? amount : existingSponsor.amount,
        status: status !== undefined ? status : existingSponsor.status
      },
      include: {
        event: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      sponsor: updatedSponsor
    });

  } catch (error) {
    console.error("Sponsor update error:", error);
    return NextResponse.json(
      { error: "Failed to update sponsor" },
      { status: 500 }
    );
  }
}

// DELETE /api/sponsors - Delete sponsor
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Sponsor ID is required" },
        { status: 400 }
      );
    }

    // Check if sponsor exists
    const existingSponsor = await prisma.sponsor.findUnique({
      where: { id }
    });

    if (!existingSponsor) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    // Delete sponsor
    await prisma.sponsor.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Sponsor deleted successfully"
    });

  } catch (error) {
    console.error("Sponsor deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete sponsor" },
      { status: 500 }
    );
  }
}
