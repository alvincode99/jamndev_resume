import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/http";
import { logError } from "@/lib/logger";
import { sanitizeText } from "@/lib/sanitize";
import { searchQuerySchema } from "@/lib/validators";
import { searchContentUseCase } from "@/server/use-cases/search-content.use-case";

/**
 * Ejecuta bÃºsqueda transversal de proyectos y ejercicios.
 * @param request Solicitud con query params `query`, `tag` y `type`.
 * @returns Resultado agrupado por tipo de contenido.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const parsed = searchQuerySchema.safeParse({
      query: searchParams.get("query") ?? undefined,
      tag: searchParams.get("tag") ?? undefined,
      type: searchParams.get("type") ?? "all",
    });

    if (!parsed.success) {
      return fail("Filtros de bÃºsqueda invÃ¡lidos", 400, parsed.error.flatten());
    }

    const result = await searchContentUseCase({
      query: parsed.data.query ? sanitizeText(parsed.data.query) : undefined,
      tag: parsed.data.tag ? sanitizeText(parsed.data.tag) : undefined,
      type: parsed.data.type,
    });

    return ok("BÃºsqueda completada", result);
  } catch (error) {
    logError("api/search:GET", "Error en bÃºsqueda", error);
    return fail("No se pudo completar la bÃºsqueda", 500);
  }
}
