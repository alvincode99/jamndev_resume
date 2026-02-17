/**
 * Limpia texto de entrada para reducir caracteres de control y espacios extra.
 * @param value Texto original.
 * @returns Texto normalizado para persistencia o bÃºsqueda.
 */
export function sanitizeText(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

/**
 * Convierte una lista de tags en formato uniforme y sin duplicados.
 * @param tags Lista de tags sin normalizar.
 * @returns Lista de tags limpia en minÃºsculas.
 */
export function sanitizeTags(tags: string[]): string[] {
  return [...new Set(tags.map((tag) => sanitizeText(tag).toLowerCase()))].filter(
    Boolean,
  );
}
