import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, requireRole } from "@/lib/auth-server";

// GET /api/certificates - List certificates based on user role
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    let certificates;

    if (user.isAdmin) {
      // Admin sees all certificates
      const where = eventId ? { eventId } : {};
      certificates = await prisma.issuedCertificate.findMany({
        where,
        include: {
          event: {
            select: {
              name: true,
              slug: true
            }
          },
          template: {
            select: {
              name: true,
              type: true,
              title: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { issuedAt: 'desc' }
      });
    } else {
      // Regular users see only their certificates
      const where: any = { userId: user.id };
      if (eventId) where.eventId = eventId;
      
      certificates = await prisma.issuedCertificate.findMany({
        where,
        include: {
          event: {
            select: {
              name: true,
              slug: true
            }
          },
          template: {
            select: {
              name: true,
              type: true,
              title: true
            }
          }
        },
        orderBy: { issuedAt: 'desc' }
      });
    }

    return NextResponse.json({
      success: true,
      certificates
    });

  } catch (error) {
    console.error("Certificate retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve certificates" },
      { status: 500 }
    );
  }
}

// POST /api/certificates - Issue new certificate
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const body = await request.json();
    const { eventId, templateId, userId, achievement } = body;

    if (!eventId || !templateId || !userId) {
      return NextResponse.json(
        { error: "eventId, templateId, and userId are required" },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.issuedCertificate.findFirst({
      where: {
        eventId,
        templateId,
        userId
      }
    });

    if (existingCertificate) {
      return NextResponse.json(
        { error: "Certificate already issued for this user and template" },
        { status: 409 }
      );
    }

    // Get template and user info
    const [template, recipient] = await Promise.all([
      prisma.certificateTemplate.findUnique({
        where: { id: templateId },
        include: { event: true }
      }),
      prisma.user.findUnique({
        where: { id: userId }
      })
    ]);

    if (!template || !recipient) {
      return NextResponse.json(
        { error: "Template or user not found" },
        { status: 404 }
      );
    }

    // Generate unique serial number
    const serial = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create certificate
    const certificate = await prisma.issuedCertificate.create({
      data: {
        serial,
        eventId,
        templateId,
        userId,
        recipientName: recipient.name || recipient.email || "Unknown",
        achievement: achievement || undefined
      },
      include: {
        event: {
          select: {
            name: true,
            slug: true
          }
        },
        template: {
          select: {
            name: true,
            type: true,
            title: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      certificate
    });

  } catch (error) {
    console.error("Certificate issuance error:", error);
    return NextResponse.json(
      { error: "Failed to issue certificate" },
      { status: 500 }
    );
  }
}
