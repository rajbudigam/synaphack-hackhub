import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "ghost" | "outline";
type Size = "default" | "icon" | "sm";

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors";
  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]",
    ghost: "hover:bg-[hsl(var(--muted))]",
  };
  const sizes: Record<Size, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3",
    icon: "h-9 w-9 p-0",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}