import Link from "next/link"

export default function Home() {
  return (
    <div className="section-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rhythm items-center">
        <div className="stack">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tightest">
            Run extraordinary hackathons
          </h1>
          <p className="text-zinc-600 max-w-prose">
            Manage events, teams, submissions, and announcements with zero friction.
          </p>
          <div className="flex gap-3">
            <Link className="btn-primary" href="/dashboard">Go to Dashboard</Link>
            <Link className="btn-secondary" href="/events">Browse Events</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {/* hero visual or stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-zinc-100 p-4 text-sm">Live events</div>
              <div className="rounded-lg bg-zinc-100 p-4 text-sm">Teams formed</div>
              <div className="rounded-lg bg-zinc-100 p-4 text-sm">Submissions</div>
              <div className="rounded-lg bg-zinc-100 p-4 text-sm">Judges</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
