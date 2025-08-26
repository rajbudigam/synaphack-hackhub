import { cn } from "@/lib/utils";
import React from "react";

type Size = "default" | "lg" | "xl";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: Size;
  padded?: boolean;
}

export function PageContainer({
  children,
  className,
  size = "default",
  padded = true,
}: PageContainerProps) {
  const maxWidth =
    size === "xl" ? "max-w-screen-2xl" : size === "lg" ? "max-w-6xl" : "max-w-7xl";
  const padding = padded ? "px-6 md:px-10 lg:px-16 py-12 lg:py-16" : "";

  return (
    <div className={cn("w-full mx-auto", maxWidth, padding, className)}>
      {children}
    </div>
  );
}
