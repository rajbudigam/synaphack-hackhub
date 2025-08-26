import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
  "flex h-12 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3",
  "text-base outline-none ring-offset-2 placeholder:text-[hsl(var(--fg))]/50",
  "focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";