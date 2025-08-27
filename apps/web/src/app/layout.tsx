import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "HackHub",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Top bar stays minimal; avoid tight spacing */}
        <header className="border-b border-zinc-200/70 bg-white">
          <div className="container flex items-center justify-between py-3 md:py-4">
            <div className="text-sm font-semibold tracking-tightest">HackHub</div>
            <nav className="flex items-center gap-2 md:gap-3">
              {/* keep buttons consistent */}
              <Link className="btn-ghost" href="/dashboard">Dashboard</Link>
              <Link className="btn-secondary" href="/events">Events</Link>
            </nav>
          </div>
        </header>

        {/* page content with consistent breathing room */}
        <main className="container section">
          {children}
        </main>

        <footer className="mt-16 border-t border-zinc-200/70 bg-white">
          <div className="container py-8 text-xs text-zinc-500">
            © {new Date().getFullYear()} HackHub
          </div>
        </footer>
      </body>
    </html>
  )
}
