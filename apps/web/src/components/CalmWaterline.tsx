"use client";
import { useEffect, useMemo, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

export default function CalmWaterline({ src = "/rive/calm-water.riv" }: { src?: string }) {
  const [assetOk, setAssetOk] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => setReduced(mq.matches);
      handler();
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((r) => !cancelled && setAssetOk(r.ok))
      .catch(() => !cancelled && setAssetOk(false));
    return () => {
      cancelled = true;
    };
  }, [src]);

  const showRive = useMemo(() => assetOk && !reduced, [assetOk, reduced]);

  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: [],
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-50 to-white">
      {showRive ? (
        <div className="absolute inset-0 opacity-60 rive-anim">
          <RiveComponent />
        </div>
      ) : (
        // Graceful CSS fallback: soft gradients + pulse shimmer
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/70 to-white" />
          <div className="absolute -inset-x-10 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_60%)] blur-2xl" />
          <div className="absolute inset-0 animate-pulse opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.12),transparent_45%)]" />
        </div>
      )}
      <div className="relative px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Welcome back 👋</h1>
        <p className="mt-2 max-w-xl text-zinc-600">Your events, teams, and submissions at a glance.</p>
      </div>
    </div>
  );
}
