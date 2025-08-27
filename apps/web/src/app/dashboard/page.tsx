import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 grid-rhythm">
      <div className="lg:col-span-2 stack">
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold tracking-tightest">Your events</h2>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-2 grid-rhythm">
            {/* event cards… each uses clamp classes to avoid overflow */}
            <div className="card">
              <div className="card-body">
                <div className="text-sm text-zinc-500 clamp-1">Sep 5, 6:00pm · Lab 2</div>
                <div className="text-base font-medium tracking-tightest clamp-1">Night Shift Hack</div>
                <p className="mt-1 text-sm text-zinc-600 clamp-2">48 teams · 192 hackers</p>
                <div className="mt-3 flex gap-2">
                  <Link className="btn-secondary" href="/events/1">Manage</Link>
                  <Link className="btn-ghost" href="/submissions?event=1">Submissions</Link>
                </div>
              </div>
            </div>
            {/* repeat... */}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold tracking-tightest">Announcements</h2>
          </div>
          <div className="card-body stack">
            <article className="stack">
              <h3 className="text-base font-semibold tracking-tightest clamp-1">Check-in opens at 5:30</h3>
              <p className="text-sm text-zinc-600 clamp-2">
                Enter via the east gate. Please bring your ID and QR code…
              </p>
            </article>
            {/* repeat… */}
          </div>
        </div>
      </div>

      <aside className="stack">
        <div className="card">
          <div className="card-body stack">
            <div className="text-sm text-zinc-500">Quick actions</div>
            <Link className="btn-primary" href="/events/new">Create event</Link>
            <Link className="btn-secondary" href="/teams">Find a team</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold tracking-tightest">Schedule</h3>
            <div className="mt-3 stack">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 clamp-1">Opening ceremony</span>
                <span className="text-zinc-500">6:00 pm</span>
              </div>
              {/* repeat… */}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
