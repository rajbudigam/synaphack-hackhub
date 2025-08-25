import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "outline" | "secondary" | "destructive";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";
  const styles: Record<Variant, string> = {
    default: "border-transparent bg-primary text-primary-foreground",
    outline: "border-[hsl(var(--border))] bg-transparent",
    secondary: "border-transparent bg-muted text-[hsl(var(--fg))]/80",
    destructive: "border-transparent bg-red-500 text-white",
  };
  return <span className={cn(base, styles[variant], className)} {...props} />;
}