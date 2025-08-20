export const dynamic = "force-dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DashboardPage() {
  const upcoming = [
    { name: "SynapHack 3.0", date: "Sep 12", status: "Registration Open" },
    { name: "AI Builders Week", date: "Oct 01", status: "Draft" },
    { name: "Campus Hack NIT", date: "Nov 15", status: "Published" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Your events</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[160px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.map((e) => (
                <TableRow key={e.name} className="hover:bg-[hsl(var(--muted))]">
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{e.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle>Live leaderboard</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Team Quantum</span><Badge>142</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Null Pointers</span><Badge>137</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Byte Me</span><Badge>128</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border p-3 text-sm">
              Judging starts at 4:00 PM. Upload videos before 3:30 PM.
            </div>
            <div className="rounded-xl border p-3 text-sm">
              Mentor AMA at 2:00 PM in Hall B.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}