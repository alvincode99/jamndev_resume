import { NextRequest } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { fail, ok } from "@/lib/http";
import { logError, logInfo } from "@/lib/logger";
import { sanitizeTags, sanitizeText } from "@/lib/sanitize";
import { projectInputSchema } from "@/lib/validators";
import { createProject, listProjects } from "@/server/repositories/project.repository";

/**
 * Lista proyectos con filtros opcionales por texto (`query`) y tag (`tag`).
 * @param request Solicitud HTTP entrante.
 * @returns Respuesta uniforme con proyectos filtrados.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query") ?? undefined;
    const tag = searchParams.get("tag") ?? undefined;

    const projects = await listProjects({
      query: query ? sanitizeText(query) : undefined,
      tag: tag ? sanitizeText(tag) : undefined,
    });

    return ok("Proyectos obtenidos", projects);
  } catch (error) {
    logError("api/projects:GET", "Error al listar proyectos", error);
    return fail("No se pudieron obtener los proyectos", 500);
  }
}

/**
 * Crea un proyecto desde el panel admin.
 * @param request Solicitud HTTP con payload JSON.
 * @returns Respuesta con proyecto creado.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession();

    if (!session) {
      return fail("No autorizado", 401);
    }

    const body: unknown = await request.json();
    const parsed = projectInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Datos invÃ¡lidos para proyecto", 400, parsed.error.flatten());
    }

    const created = await createProject({
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

    logInfo("api/projects:POST", "Proyecto creado", { id: created.id });
    return ok("Proyecto creado", created, 201);
  } catch (error) {
    logError("api/projects:POST", "Error al crear proyecto", error);
    return fail("No se pudo crear el proyecto", 500);
  }
}
