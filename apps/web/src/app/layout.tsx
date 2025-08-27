import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./Providers";
import BackgroundFX from "@/components/visuals/BackgroundFX";

export const metadata: Metadata = {
  title: "HackHub - Run extraordinary hackathons",
  description: "Manage events, teams, submissions, and announcements with zero friction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased relative">
          <BackgroundFX />
          <div className="relative z-10">
            <Providers>
              {children}
            </Providers>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
