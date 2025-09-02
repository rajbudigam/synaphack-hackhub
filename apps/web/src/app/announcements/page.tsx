import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"

export default function Announcements() {
  return (
    <div className="stack">
      <div className="flex items-center gap-4 mb-8">
        <BackButton />
        <header className="flex items-center justify-between flex-1">
          <h1 className="text-2xl font-semibold tracking-tightest">Announcements</h1>
          <Link className="btn-primary" href="/announcements/new">New</Link>
        </header>
      </div>

      <div className="card">
        <div className="card-body prose prose-zinc max-w-none">
          {/* render markdown here; prose handles spacing & headings elegantly */}
          <h2>Welcome to HackHub</h2>
          <p>We’re excited to kick off…</p>
        </div>
      </div>
    </div>
  )
}
