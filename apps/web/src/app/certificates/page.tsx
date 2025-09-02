export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, Users, CheckCircle, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { BackButton } from "@/components/ui/back-button";

async function getCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
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

    return certificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
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

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <PageContainer className="space-y-16" size="lg">
      <div className="flex items-center gap-4 mb-8">
        <BackButton />
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-8 w-8 text-yellow-500" />
            Certificates
          </h1>
          <p className="text-muted-foreground">Manage and download achievement certificates</p>
        </div>
        <Button asChild>
          <Link href="/certificates/create">
            <Plus className="h-4 w-4 mr-2" />
            Generate Certificate
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter(cert => {
                const now = new Date();
                const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return cert.createdAt >= thisMonth;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Recently issued</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter(cert => cert.issued).length}
            </div>
            <p className="text-xs text-muted-foreground">Blockchain verified</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter(cert => !cert.issued).length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Certificates</h2>
        <div className="space-y-4">
          {certificates.length > 0 ? certificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{certificate.type?.toString().replace(/_/g, " ") || "Certificate"}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-transparent bg-blue-500 text-white">
                        {certificate.issued ? "Issued" : "Pending"}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-gray-200 dark:border-gray-700">{certificate.type}</span>
                      {certificate.event && (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-gray-200 dark:border-gray-700">{certificate.event.name}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Issued on {formatDate(certificate.createdAt)}
                    </div>
          {"verificationCode" in certificate && (certificate as any).verificationCode && (
                      <div className="text-xs text-green-600 mt-1">
            Verification: {String((certificate as any).verificationCode).slice(0, 12)}...
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
        {"description" in certificate && (certificate as any).description && (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>{(certificate as any).description}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Issued to {certificate.user?.name || "Unknown"}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
          {(("pdfUrl" in certificate && (certificate as any).pdfUrl) || ("certificateUrl" in certificate && (certificate as any).certificateUrl)) && (
                      <Button size="sm" variant="outline" asChild>
            <a href={(certificate as any).pdfUrl ?? (certificate as any).certificateUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                    <Button size="sm" asChild>
                      <Link href={`/certificates/${certificate.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
                <p className="text-muted-foreground mb-4">
                  Certificates will appear here once you complete events or achieve milestones.
                </p>
                <Button asChild>
                  <Link href="/events">
                    <Calendar className="h-4 w-4 mr-2" />
                    Browse Events
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
  </PageContainer>
  );
}
