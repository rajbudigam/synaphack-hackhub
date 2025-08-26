"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, defaultChecked, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false)
    
    const actualChecked = checked !== undefined ? checked : isChecked
    
    const handleToggle = () => {
      if (disabled) return
      const newChecked = !actualChecked
      setIsChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={actualChecked}
        ref={ref}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          actualChecked ? "bg-primary" : "bg-input",
          className
        )}
        onClick={handleToggle}
        disabled={disabled}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            actualChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
