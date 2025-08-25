import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type Variant = "default" | "ghost" | "outline" | "destructive";
type Size = "default" | "icon" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]",
    ghost: "hover:bg-[hsl(var(--muted))]",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  
  const sizes: Record<Size, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3",
    icon: "h-9 w-9 p-0",
  };

  const Comp = asChild ? Slot : "button";
  
  return (
    <Comp 
      className={cn(base, variants[variant], sizes[size], className)} 
      {...props} 
    />
  );
}