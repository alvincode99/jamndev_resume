import { NextRequest } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { logError, logInfo } from "@/lib/logger";
import { sanitizeTags, sanitizeText } from "@/lib/sanitize";
import { exerciseInputSchema } from "@/lib/validators";
import { createExercise, listExercises } from "@/server/repositories/exercise.repository";

/**
 * Lista ejercicios con filtros opcionales por texto (`query`) y tag (`tag`).
 * @param request Solicitud HTTP entrante.
 * @returns Respuesta uniforme con la colecciÃ³n filtrada.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query") ?? undefined;
    const tag = searchParams.get("tag") ?? undefined;

    const exercises = await listExercises({
      query: query ? sanitizeText(query) : undefined,
      tag: tag ? sanitizeText(tag) : undefined,
    });

    return ok("Ejercicios obtenidos", exercises);
  } catch (error) {
    logError("api/exercises:GET", "Error al listar ejercicios", error);
    return fail("No se pudieron obtener los ejercicios", 500);
  }
}

/**
 * Crea un nuevo ejercicio desde el panel admin.
 * @param request Solicitud HTTP con payload JSON validable.
 * @returns Respuesta con el ejercicio creado.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return fail("No autorizado", 401);
    }

    const body: unknown = await request.json();
    const parsed = exerciseInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos invÃ¡lidos para ejercicio", 400, parsed.error.flatten());
    }

    const created = await createExercise({
      ...parsed.data,
      title: sanitizeText(parsed.data.title),
      slug: sanitizeText(parsed.data.slug).toLowerCase(),
      description: sanitizeText(parsed.data.description),
      tags: sanitizeTags(parsed.data.tags),
      links: parsed.data.links ?? [],
      demoUrl: parsed.data.demoUrl ?? null,
      repoUrl: parsed.data.repoUrl ?? null,
      date: parsed.data.date,
    });

    logInfo("api/exercises:POST", "Ejercicio creado", { id: created.id });
    return ok("Ejercicio creado", created, 201);
  } catch (error) {
    logError("api/exercises:POST", "Error al crear ejercicio", error);
    return fail("No se pudo crear el ejercicio", 500);
  }
}
