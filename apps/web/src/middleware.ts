import { NextResponse, NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export default hasClerk
  ? clerkMiddleware((auth, req) => {
      const res = NextResponse.next();
      // Add security headers
      res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      res.headers.set("X-Content-Type-Options", "nosniff");
      res.headers.set("X-Frame-Options", "DENY");
      res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
      return res;
    })
  : function passthrough(req: NextRequest) {
      const res = NextResponse.next();
      // Add security headers
      res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      res.headers.set("X-Content-Type-Options", "nosniff");
      res.headers.set("X-Frame-Options", "DENY");
      res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
      return res;
    };

export const config = {
  matcher: ["/dashboard(.*)", "/events(.*)", "/submissions(.*)", "/leaderboard(.*)", "/teams(.*)"],
};
