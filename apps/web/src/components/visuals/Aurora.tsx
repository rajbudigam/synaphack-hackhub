// components/visuals/Aurora.tsx
import React from "react";

export default function Aurora({
  className = "",
  intensity = 1,
}: { className?: string; intensity?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
    >
      {/* layered gradients for depth */}
      <div className="absolute inset-0 aurora-layer aurora-one" style={{ opacity: 0.35 * intensity }} />
      <div className="absolute inset-0 aurora-layer aurora-two" style={{ opacity: 0.28 * intensity }} />
      <div className="absolute inset-0 aurora-layer aurora-three" style={{ opacity: 0.22 * intensity }} />
    </div>
  );
}
