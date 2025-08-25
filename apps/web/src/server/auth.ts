import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireUser() {
  const { userId } = await auth(); // <- await!
  if (!userId) {
    redirect("/login"); // Redirect to login instead of throwing error
  }
  return userId;
}

// Optional convenience helpers:
export async function getUserId() {
  const { userId } = await auth();
  return userId ?? null;
}