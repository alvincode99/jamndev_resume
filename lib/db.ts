import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/jamndev_resume";

const adapter = new PrismaPg({ connectionString });

/**
 * Instancia singleton de Prisma Client para evitar mÃºltiples conexiones en desarrollo.
 */
export const prisma = global.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
