/**
 * Crea una funcion con debounce para ejecutar el callback despues de una pausa.
 * @param func Funcion a ejecutar con retraso controlado.
 * @param wait Milisegundos de espera desde la ultima llamada.
 * @returns Funcion envuelta con comportamiento debounce.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Crea una funcion con throttle para limitar llamadas por intervalo.
 * @param func Funcion a limitar.
 * @param wait Ventana de tiempo en milisegundos.
 * @returns Funcion envuelta con comportamiento throttle.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCallTime >= wait) {
      lastCallTime = now;
      func(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        func(...args);
        timeoutId = null;
      }, wait - (now - lastCallTime));
    }
  };
}
