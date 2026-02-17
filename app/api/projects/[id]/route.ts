import { NextRequest } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { logError, logInfo } from "@/lib/logger";
import { sanitizeTags, sanitizeText } from "@/lib/sanitize";
import { projectInputSchema } from "@/lib/validators";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/server/repositories/project.repository";

/**
 * Obtiene el detalle de un proyecto por ID.
 * @param _request Solicitud HTTP no utilizada.
 * @param context Contexto con el parÃ¡metro de ruta.
 * @returns Respuesta con proyecto o error 404.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const project = await getProjectById(id);

    if (!project) {
      return fail("Proyecto no encontrado", 404);
    }

    return ok("Proyecto obtenido", project);
  } catch (error) {
    logError("api/projects/[id]:GET", "Error al obtener proyecto", error);
    return fail("No se pudo obtener el proyecto", 500);
  }
}

/**
 * Actualiza un proyecto existente por ID.
 * @param request Solicitud HTTP con payload JSON.
 * @param context Contexto con el parÃ¡metro `id`.
 * @returns Proyecto actualizado.
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
    const parsed = projectInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos invÃ¡lidos para proyecto", 400, parsed.error.flatten());
    }

    const updated = await updateProject(id, {
      ...parsed.data,
      title: sanitizeText(parsed.data.title),
      description: sanitizeText(parsed.data.description),
      tags: sanitizeTags(parsed.data.tags),
      stack: sanitizeTags(parsed.data.stack),
      links: parsed.data.links ?? [],
      demoUrl: parsed.data.demoUrl ?? null,
      repoUrl: parsed.data.repoUrl ?? null,
      date: parsed.data.date,
    });

    logInfo("api/projects/[id]:PUT", "Proyecto actualizado", { id });
    return ok("Proyecto actualizado", updated);
  } catch (error) {
    logError("api/projects/[id]:PUT", "Error al actualizar proyecto", error);
    return fail("No se pudo actualizar el proyecto", 500);
  }
}

/**
 * Elimina un proyecto por ID.
 * @param _request Solicitud HTTP no utilizada.
 * @param context Contexto con parÃ¡metro dinÃ¡mico `id`.
 * @returns Proyecto eliminado.
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
    const deleted = await deleteProject(id);

    logInfo("api/projects/[id]:DELETE", "Proyecto eliminado", { id });
    return ok("Proyecto eliminado", deleted);
  } catch (error) {
    logError("api/projects/[id]:DELETE", "Error al eliminar proyecto", error);
    return fail("No se pudo eliminar el proyecto", 500);
  }
}
