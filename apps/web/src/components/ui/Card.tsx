import { ReactNode } from "react"

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="card-body border-b border-zinc-100/80">
      <h3 className="text-base font-semibold tracking-tightest clamp-1">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-zinc-600 clamp-2">{subtitle}</p> : null}
    </div>
  )
}
export function CardContent({ children }: { children: ReactNode }) {
  return <div className="card-body">{children}</div>
}
export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card-body border-t border-zinc-100/80">{children}</div>
}
