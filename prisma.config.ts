import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Configuracion central de Prisma 7 para schema, migraciones y datasource.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/jamndev_resume",
  },
});