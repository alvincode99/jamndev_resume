import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("Debe ser una URL vÃ¡lida")
  .optional()
  .or(z.literal(""))
  .transform((value) => value || undefined);

/** Esquema de validaciÃ³n para ejercicios. */
export const exerciseInputSchema = z.object({
  title: z.string().trim().min(3),
  slug: z.string().trim().min(3),
  description: z.string().trim().min(10),
  tags: z.array(z.string().trim().min(1)).max(10),
  links: z.array(z.string().trim().url()).max(10).optional().default([]),
  demoUrl: optionalUrl,
  repoUrl: optionalUrl,
  date: z.string().datetime(),
});

/** Esquema de validaciÃ³n para proyectos. */
export const projectInputSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  tags: z.array(z.string().trim().min(1)).max(10),
  stack: z.array(z.string().trim().min(1)).max(10),
  links: z.array(z.string().trim().url()).max(10).optional().default([]),
  demoUrl: optionalUrl,
  repoUrl: optionalUrl,
  date: z.string().datetime(),
});

/** Esquema de validaciÃ³n para el perfil principal del CV. */
export const cvInputSchema = z.object({
  fullName: z.string().trim().min(3),
  title: z.string().trim().min(3),
  summary: z.string().trim().min(20),
  location: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  website: optionalUrl,
  linkedin: optionalUrl,
  github: optionalUrl,
  skills: z.array(z.string().trim().min(1)).max(30),
  experiences: z.array(
    z.object({
      company: z.string().trim().min(2),
      role: z.string().trim().min(2),
      period: z.string().trim().min(3),
      highlights: z.array(z.string().trim().min(3)).max(10),
    }),
  ),
});

/** Esquema de validaciÃ³n para filtros de bÃºsqueda. */
export const searchQuerySchema = z.object({
  query: z.string().trim().optional(),
  tag: z.string().trim().optional(),
  type: z.enum(["all", "exercises", "projects"]).default("all"),
});

/** Esquema de credenciales para login en UI. */
export const loginInputSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});
