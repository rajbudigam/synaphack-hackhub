"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  filename?: string;
  label?: string;
}

export function ExportButton({ data, filename = "submissions", label = "Export CSV" }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // Convert data to CSV
    const headers = [
      "Title",
      "Description", 
      "Team",
      "Event",
      "Status",
      "Tech Stack",
      "Repository URL",
      "Live URL",
      "Submitted At"
    ];

    const csvContent = [
      headers.join(","),
      ...data.map(submission => [
        `"${submission.title || ""}"`,
        `"${submission.description?.replace(/"/g, '""') || ""}"`,
        `"${submission.team?.name || ""}"`,
        `"${submission.event?.name || ""}"`,
        `"${submission.status || ""}"`,
        `"${Array.isArray(submission.techStack) ? submission.techStack.join("; ") : ""}"`,
        `"${submission.repoUrl || ""}"`,
        `"${submission.liveUrl || ""}"`,
        `"${submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : ""}"`
      ].join(","))
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
