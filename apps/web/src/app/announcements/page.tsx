import Link from "next/link"

export default function Announcements() {
  return (
    <div className="stack">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tightest">Announcements</h1>
        <Link className="btn-primary" href="/announcements/new">New</Link>
      </header>

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
