import { PrismaClient } from "@prisma/client";

declare global {
  var __globalPrisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as { 
  __globalPrisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.__globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__globalPrisma = prisma;
}
