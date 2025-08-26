// components/admin/PlagiarismButton.tsx
"use client";
import { useState } from "react";

export function PlagiarismButton({ submissionId }: { submissionId: string }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <button
      className="px-3 py-1 rounded bg-black text-white disabled:opacity-50"
      disabled={loading}
      onClick={async () => {
        try {
          setLoading(true);
          const r = await fetch("/api/plagiarism/check", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ submissionId })
          });
          const j = await r.json();
          if (!r.ok) throw new Error(j.error || "failed");
          setMsg("Report generated");
        } catch (e:any) {
          setMsg(e.message);
        } finally { setLoading(false); }
      }}
    >
      {loading ? "Analyzing..." : "Analyze Plagiarism"}
    </button>
  );
}
