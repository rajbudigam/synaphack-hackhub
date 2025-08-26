import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { User } from "@prisma/client";

export async function requireUser(): Promise<User> {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  // Upsert user based on Clerk data
  const user = await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    create: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim() : clerkUser.username ?? "User",
      imageUrl: clerkUser.imageUrl
    },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress,
      name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim() : clerkUser.username ?? "User",
      imageUrl: clerkUser.imageUrl
    }
  });

  return user;
}

export async function requireRole(allowedRoles: string[]): Promise<User> {
  const user = await requireUser();
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error(`Access denied. Required roles: ${allowedRoles.join(", ")}`);
  }
  
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  
  if (!user.isAdmin) {
    throw new Error("Admin access required");
  }
  
  return user;
}

export async function requireUserWithRole(role: string): Promise<User> {
  return requireRole([role]);
}
