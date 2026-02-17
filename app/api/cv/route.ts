import { NextRequest } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { logError, logInfo } from "@/lib/logger";
import { sanitizeTags, sanitizeText } from "@/lib/sanitize";
import { cvInputSchema } from "@/lib/validators";
import { getCvProfile, upsertCvProfile } from "@/server/repositories/cv.repository";

/**
 * Obtiene el perfil principal del CV para sitio pÃºblico o panel admin.
 * @returns Respuesta con el perfil actual o `null`.
 */
export async function GET() {
  try {
    const profile = await getCvProfile();
    return ok("Perfil CV obtenido", profile);
  } catch (error) {
    logError("api/cv:GET", "Error al obtener CV", error);
    return fail("No se pudo obtener el CV", 500);
  }
}

/**
 * Crea o actualiza el perfil principal del CV.
 * @param request Solicitud con payload del perfil.
 * @returns Respuesta con el perfil persistido.
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return fail("No autorizado", 401);
    }

    const body: unknown = await request.json();
    const parsed = cvInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos invÃ¡lidos para perfil CV", 400, parsed.error.flatten());
    }

    const saved = await upsertCvProfile({
      fullName: sanitizeText(parsed.data.fullName),
      title: sanitizeText(parsed.data.title),
      summary: sanitizeText(parsed.data.summary),
      location: sanitizeText(parsed.data.location),
      email: sanitizeText(parsed.data.email),
      phone: sanitizeText(parsed.data.phone),
      website: parsed.data.website ?? null,
      linkedin: parsed.data.linkedin ?? null,
      github: parsed.data.github ?? null,
      skills: sanitizeTags(parsed.data.skills),
      experiences: parsed.data.experiences.map((exp) => ({
        company: sanitizeText(exp.company),
        role: sanitizeText(exp.role),
        period: sanitizeText(exp.period),
        highlights: exp.highlights.map(sanitizeText),
      })),
    });

    logInfo("api/cv:PUT", "Perfil CV actualizado", { id: saved.id });
    return ok("Perfil CV actualizado", saved);
  } catch (error) {
    logError("api/cv:PUT", "Error al actualizar CV", error);
    return fail("No se pudo actualizar el CV", 500);
  }
}
