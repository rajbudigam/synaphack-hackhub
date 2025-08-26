import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-server";

// GET /api/certificates/templates - List certificate templates
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const type = searchParams.get('type');

    const where: any = {};
    if (eventId) where.eventId = eventId;
    if (type) where.type = type;

    const templates = await prisma.certificateTemplate.findMany({
      where,
      include: {
        event: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            issued: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      templates
    });

  } catch (error) {
    console.error("Certificate template retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve certificate templates" },
      { status: 500 }
    );
  }
}

// POST /api/certificates/templates - Create new certificate template
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const body = await request.json();
    const { 
      eventId, 
      name, 
      type, 
      title,
      subtitle, 
      body: bodyText,
      footer,
      signature,
      layout,
      primaryColor,
      secondaryColor,
      fontFamily
    } = body;

    if (!eventId || !name || !type || !title || !bodyText) {
      return NextResponse.json(
        { error: "eventId, name, type, title, and body are required" },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ["participation", "winner", "runner_up", "judge", "mentor", "organizer"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be one of: " + validTypes.join(", ") },
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

    // Create template
    const template = await prisma.certificateTemplate.create({
      data: {
        eventId,
        name,
        type,
        title,
        subtitle: subtitle || undefined,
        body: bodyText,
        footer: footer || undefined,
        signature: signature || undefined,
        layout: layout || "modern",
        primaryColor: primaryColor || "#2563eb",
        secondaryColor: secondaryColor || "#64748b",
        fontFamily: fontFamily || "Inter"
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
      template
    });

  } catch (error) {
    console.error("Certificate template creation error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate template" },
      { status: 500 }
    );
  }
}

// PUT /api/certificates/templates - Update certificate template
export async function PUT(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const body = await request.json();
    const { 
      id,
      name, 
      type, 
      title,
      subtitle, 
      body: bodyText,
      footer,
      signature,
      layout,
      primaryColor,
      secondaryColor,
      fontFamily,
      active 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Check if template exists
    const existingTemplate = await prisma.certificateTemplate.findUnique({
      where: { id }
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: "Certificate template not found" },
        { status: 404 }
      );
    }

    // Validate type if provided
    if (type) {
      const validTypes = ["participation", "winner", "runner_up", "judge", "mentor", "organizer"];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          { error: "Invalid type. Must be one of: " + validTypes.join(", ") },
          { status: 400 }
        );
      }
    }

    // Update template
    const updatedTemplate = await prisma.certificateTemplate.update({
      where: { id },
      data: {
        name: name || existingTemplate.name,
        type: type || existingTemplate.type,
        title: title || existingTemplate.title,
        subtitle: subtitle !== undefined ? subtitle : existingTemplate.subtitle,
        body: bodyText || existingTemplate.body,
        footer: footer !== undefined ? footer : existingTemplate.footer,
        signature: signature !== undefined ? signature : existingTemplate.signature,
        layout: layout || existingTemplate.layout,
        primaryColor: primaryColor || existingTemplate.primaryColor,
        secondaryColor: secondaryColor || existingTemplate.secondaryColor,
        fontFamily: fontFamily || existingTemplate.fontFamily,
        active: active !== undefined ? active : existingTemplate.active
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
      template: updatedTemplate
    });

  } catch (error) {
    console.error("Certificate template update error:", error);
    return NextResponse.json(
      { error: "Failed to update certificate template" },
      { status: 500 }
    );
  }
}

// DELETE /api/certificates/templates - Delete certificate template
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireRole(["admin", "organizer"]);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Check if template exists and has issued certificates
    const templateWithCertificates = await prisma.certificateTemplate.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            issued: true
          }
        }
      }
    });

    if (!templateWithCertificates) {
      return NextResponse.json(
        { error: "Certificate template not found" },
        { status: 404 }
      );
    }

    if (templateWithCertificates._count.issued > 0) {
      return NextResponse.json(
        { error: "Cannot delete template with issued certificates. Deactivate instead." },
        { status: 409 }
      );
    }

    // Delete template
    await prisma.certificateTemplate.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Certificate template deleted successfully"
    });

  } catch (error) {
    console.error("Certificate template deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete certificate template" },
      { status: 500 }
    );
  }
}
