"use client";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <SignIn appearance={{ elements: { card: "shadow-soft rounded-2xl" } }} />
    </div>
  );
}
