"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandMenu } from "./command-menu";

interface ShellLayoutProps {
  children: React.ReactNode;
}

export function ShellLayout({ children }: ShellLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Command Menu */}
      <CommandMenu />
      
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-80 lg:flex-col">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Topbar */}
          <Topbar />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
