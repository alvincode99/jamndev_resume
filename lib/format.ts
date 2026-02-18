/**
 * Formatea una fecha ISO en formato local corto en espaÃ±ol.
 * @param iso Fecha en formato ISO.
 * @returns Fecha legible para UI.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(iso));
}

/**
 * Convierte una cadena separada por comas en un arreglo de valores.
 * @param value Cadena a dividir.
 * @returns Lista limpia de elementos no vacÃ­os.
 */
export function commaSeparatedToArray(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Convierte un arreglo de textos en formato separado por comas para formularios.
 * @param value Lista de valores.
 * @returns Cadena lista para input de texto.
 */
export function arrayToCommaSeparated(value: string[]): string {
  return value.join(", ");
}
