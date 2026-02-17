/**
 * Escribe un log informativo estandarizado para trazabilidad mÃ­nima en API.
 * @param scope Nombre del mÃ³dulo o ruta que genera el log.
 * @param message Mensaje principal del evento.
 * @param meta InformaciÃ³n adicional opcional para depuraciÃ³n.
 * @returns No retorna valor.
 */
export function logInfo(scope: string, message: string, meta?: unknown): void {
  console.info(`[${scope}] ${message}`, meta ?? "");
}

/**
 * Escribe un log de error estandarizado para diagnÃ³stico de fallos.
 * @param scope Nombre del mÃ³dulo o ruta que genera el error.
 * @param message Mensaje principal del error.
 * @param error Error original o datos relacionados.
 * @returns No retorna valor.
 */
export function logError(scope: string, message: string, error?: unknown): void {
  console.error(`[${scope}] ${message}`, error ?? "");
}
