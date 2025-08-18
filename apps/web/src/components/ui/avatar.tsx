import * as React from "react";
import { cn } from "@/lib/cn";

export function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative inline-flex items-center justify-center rounded-full bg-muted", className)} {...props} />;
}
export function AvatarImage({ src, alt = "", className }: { src?: string; alt?: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full rounded-full object-cover", className)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
export function AvatarFallback({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-sm font-medium text-[hsl(var(--fg))] opacity-80", className)}>
      {children}
    </span>
  );
}