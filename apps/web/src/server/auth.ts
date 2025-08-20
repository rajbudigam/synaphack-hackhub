import { auth } from "@clerk/nextjs/server";
// If you'd rather redirect unauthenticated users:
// import { redirect } from "next/navigation";

export async function requireUser() {
  const { userId } = await auth(); // <- await!
  if (!userId) {
    // redirect("/login"); // optional UX
    throw new Error("Unauthorized");
  }
  return userId;
}

// Optional convenience helpers:
export async function getUserId() {
  const { userId } = await auth();
  return userId ?? null;
}