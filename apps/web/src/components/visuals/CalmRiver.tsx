// components/visuals/CalmRiver.tsx
import React from "react";

export default function CalmRiver({
  className = "",
  height = 220,
  opacity = 0.45,
}: { className?: string; height?: number; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-0 ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="riverGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
          </linearGradient>
          <filter id="blur10" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Back water sheet */}
        <g opacity={opacity}>
          <rect x="0" y="120" width="1200" height="380" fill="url(#riverGrad)" filter="url(#blur10)" />
        </g>

        {/* Slow wave bands (pure CSS animation on group translateX) */}
        <g className="river-band river-band-1" opacity={opacity}>
          <path d="M0,220 C150,200 250,240 400,220 C550,200 700,240 850,220 C1000,200 1120,235 1200,220 L1200,400 L0,400 Z"
            fill="url(#riverGrad)" />
        </g>
        <g className="river-band river-band-2" opacity={opacity * 0.8}>
          <path d="M0,240 C130,220 260,255 420,240 C580,225 720,255 880,240 C1040,225 1140,260 1200,245 L1200,400 L0,400 Z"
            fill="url(#riverGrad)" />
        </g>
        <g className="river-band river-band-3" opacity={opacity * 0.6}>
          <path d="M0,258 C160,246 300,270 460,258 C620,246 760,270 920,258 C1080,246 1150,276 1200,266 L1200,400 L0,400 Z"
            fill="url(#riverGrad)" />
        </g>
      </svg>
    </div>
  );
}
