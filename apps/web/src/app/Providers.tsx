"use client";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState<"comfy" | "compact">(
    (typeof window !== "undefined" && (localStorage.getItem("density") as any)) || "comfy"
  );

  useEffect(() => {
    document.documentElement.dataset.density = density;
    localStorage.setItem("density", density);
  }, [density]);

  return (
    <>
      <div className="fixed right-3 top-3 z-50">
        <button
          onClick={() => setDensity(density === "comfy" ? "compact" : "comfy")}
          className="rounded-xl bg-zinc-900 px-3 py-1 text-xs text-white shadow"
          aria-label="Toggle density"
        >
          {density === "comfy" ? "Compact" : "Comfy"}
        </button>
      </div>
      {children}
    </>
  );
}
