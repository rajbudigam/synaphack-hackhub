// components/visuals/BackgroundFX.tsx
import React from "react";
import Aurora from "./Aurora";
import CalmRiver from "./CalmRiver";
import NoiseGrain from "./NoiseGrain";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Subtle global glow */}
      <Aurora intensity={1.5} />

      {/* Ultra-light film grain */}
      <NoiseGrain opacity={0.06} />

      {/* River at bottom on all pages */}
      <CalmRiver height={240} opacity={0.6} />
    </div>
  );
}
