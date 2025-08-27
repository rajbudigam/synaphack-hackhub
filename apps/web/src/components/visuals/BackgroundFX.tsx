// components/visuals/BackgroundFX.tsx
import React from "react";
import Aurora from "./Aurora";
import CalmRiver from "./CalmRiver";
import NoiseGrain from "./NoiseGrain";

export default function BackgroundFX() {
  return (
    <>
      {/* Subtle global glow */}
      <Aurora />

      {/* Ultra-light film grain */}
      <NoiseGrain opacity={0.035} />

      {/* River at bottom on all pages */}
      <CalmRiver height={220} opacity={0.35} />
    </>
  );
}
