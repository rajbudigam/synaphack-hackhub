import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2",
        "text-sm outline-none ring-offset-2 placeholder:text-[hsl(var(--fg))]/50",
        "focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";