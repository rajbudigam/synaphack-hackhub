// components/visuals/NoiseGrain.tsx
import React from "react";

export default function NoiseGrain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 grain"
      style={{ opacity }}
    />
  );
}
