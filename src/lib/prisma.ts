/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma client to avoid multiple instances in development
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, attach Prisma client to globalThis to prevent multiple instances
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }
  prisma = (globalThis as any).prisma;
}

export { prisma };
