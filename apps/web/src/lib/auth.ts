import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function requireUser() {
  const u = await currentUser();
  if (!u) throw new Response("Unauthorized", { status: 401 });

  // upsert a local user row mapped to Clerk
  const user = await prisma.user.upsert({
    where: { clerkId: u.id },
    create: {
      clerkId: u.id,
      email: u.emailAddresses[0]?.emailAddress,
      name: u.firstName ? `${u.firstName} ${u.lastName ?? ""}`.trim() : u.username ?? "User",
      imageUrl: u.imageUrl
    },
    update: {
      email: u.emailAddresses[0]?.emailAddress,
      name: u.firstName ? `${u.firstName} ${u.lastName ?? ""}`.trim() : u.username ?? "User",
      imageUrl: u.imageUrl
    }
  });

  return user;
}
