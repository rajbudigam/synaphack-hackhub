import { cn } from "@/lib/utils";

interface FlowBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export function FlowBackground({ children, className, intensity = "subtle" }: FlowBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/10",
        className
      )}
    >
      {/* Animated organic background */}
      <div className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensity === "subtle" && "opacity-40",
        intensity === "medium" && "opacity-60",
        intensity === "strong" && "opacity-90"
      )}>
        <div className="animate-river absolute inset-[-25%]" />
      </div>
      {/* Foreground content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
