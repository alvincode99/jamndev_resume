import { NextRequest } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { logError, logInfo } from "@/lib/logger";
import { sanitizeTags, sanitizeText } from "@/lib/sanitize";
import { exerciseInputSchema } from "@/lib/validators";
import {
  deleteExercise,
  getExerciseById,
  updateExercise,
} from "@/server/repositories/exercise.repository";

/**
 * Obtiene el detalle de un ejercicio por ID interno.
 * @param _request Solicitud HTTP no utilizada.
 * @param context Contexto con parÃ¡metros dinÃ¡micos de ruta.
 * @returns Respuesta con el ejercicio solicitado o error 404.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const exercise = await getExerciseById(id);

    if (!exercise) {
      return fail("Ejercicio no encontrado", 404);
    }

    return ok("Ejercicio obtenido", exercise);
  } catch (error) {
    logError("api/exercises/[id]:GET", "Error al obtener ejercicio", error);
    return fail("No se pudo obtener el ejercicio", 500);
  }
}

/**
 * Actualiza un ejercicio existente por ID.
 * @param request Solicitud con JSON del ejercicio.
 * @param context Contexto con parÃ¡metro dinÃ¡mico `id`.
 * @returns Respuesta con la entidad actualizada.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return fail("No autorizado", 401);
    }

    const { id } = await context.params;
    const body: unknown = await request.json();
    const parsed = exerciseInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos invÃ¡lidos para ejercicio", 400, parsed.error.flatten());
    }

    const updated = await updateExercise(id, {
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

    logInfo("api/exercises/[id]:PUT", "Ejercicio actualizado", { id });
    return ok("Ejercicio actualizado", updated);
  } catch (error) {
    logError("api/exercises/[id]:PUT", "Error al actualizar ejercicio", error);
    return fail("No se pudo actualizar el ejercicio", 500);
  }
}

/**
 * Elimina un ejercicio por identificador.
 * @param _request Solicitud HTTP no utilizada.
 * @param context Contexto con parÃ¡metro dinÃ¡mico `id`.
 * @returns Respuesta con la entidad eliminada.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return fail("No autorizado", 401);
    }

    const { id } = await context.params;
    const deleted = await deleteExercise(id);

    logInfo("api/exercises/[id]:DELETE", "Ejercicio eliminado", { id });
    return ok("Ejercicio eliminado", deleted);
  } catch (error) {
    logError("api/exercises/[id]:DELETE", "Error al eliminar ejercicio", error);
    return fail("No se pudo eliminar el ejercicio", 500);
  }
}
