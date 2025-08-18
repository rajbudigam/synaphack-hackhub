import "./globals.css";
import "./tw.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { CommandMenu } from "@/components/shell/command-menu";

export const metadata = { title: "HackHub", description: "Event & Hackathon platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider>
            <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr] bg-[hsl(var(--bg))] text-[hsl(var(--fg))]">
              <aside className="hidden md:block border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <Sidebar />
              </aside>
              <main className="flex min-h-screen flex-col">
                <Topbar />
                <div className="p-4 md:p-6 lg:p-8">{children}</div>
              </main>
            </div>
            <CommandMenu />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
