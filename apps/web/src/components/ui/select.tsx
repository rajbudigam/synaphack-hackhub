import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps {
  children: React.ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {}
})

const Select: React.FC<SelectProps> = ({ children, defaultValue, value, onValueChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  
  const actualValue = value !== undefined ? value : internalValue
  
  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{
      value: actualValue,
      onValueChange: handleValueChange,
      isOpen,
      setIsOpen
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(SelectContext)
    
    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <svg className="h-4 w-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m6 9 6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
  const { isOpen } = React.useContext(SelectContext)
  
  if (!isOpen) return null
  
  return (
    <div
      className={cn(
        "absolute top-full z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  )
}

const SelectItem: React.FC<SelectItemProps> = ({ value, children, className }) => {
  const { onValueChange } = React.useContext(SelectContext)
  
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </div>
  )
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder, className }) => {
  const { value } = React.useContext(SelectContext)
  
  return (
    <span className={cn("text-sm", className)}>
      {value || placeholder}
    </span>
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
