import "./globals.css";
import "./tw.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { CommandMenu } from "@/components/shell/command-menu";
import { FlowBackground } from "@/components/FlowBackground";

export const metadata = { 
  title: "SynapHack - Next-Gen Hackathon Platform", 
  description: "AI-powered hackathon platform with Web3 integration, real-time collaboration, and advanced analytics" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClerkProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-background">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-screen">
                {/* Enhanced Sidebar */}
                <aside className="hidden md:block border-r border-gray-200/50 dark:border-gray-800/50 bg-card/30 backdrop-blur-xl shadow-xl">
                  <Sidebar />
                </aside>
                
                {/* Main Content Area */}
                <main className="flex min-h-screen flex-col overflow-hidden">
                  {/* Enhanced Topbar */}
                  <Topbar />

                  {/* Dynamic flowing background */}
                  <FlowBackground>{children}</FlowBackground>
                </main>
              </div>
              <CommandMenu />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
