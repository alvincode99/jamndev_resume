import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL es obligatoria"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL debe ser una URL vÃ¡lida"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET es obligatoria"),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
});

/**
 * Obtiene y valida las variables de entorno requeridas para el proyecto.
 * @returns Variables de entorno tipadas y validadas.
 * @throws Error si falta una variable requerida o su formato es invÃ¡lido.
 * @example
 * const env = getEnv();
 * console.log(env.NEXTAUTH_URL);
 */
export function getEnv() {
  return envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  });
}
