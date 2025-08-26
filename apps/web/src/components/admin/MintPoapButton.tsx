// components/admin/MintPoapButton.tsx
"use client";
import { useState } from "react";

export function MintPoapButton({ eventId, address, tokenURI }: { eventId: string; address: string; tokenURI: string; }) {
  const [status, setStatus] = useState<string>("Mint POAP");
  return (
    <button
      className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
      onClick={async () => {
        setStatus("Minting...");
        const r = await fetch("/api/poap/mint", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ eventId, address, tokenURI })
        });
        const j = await r.json();
        setStatus(r.ok ? `Minted ✅ ${j.txHash.slice(0,10)}…` : `Failed: ${j.error}`);
      }}
      disabled={status.startsWith("Minting")}
    >
      {status}
    </button>
  );
}
