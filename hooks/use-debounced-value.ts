"use client";

import { useEffect, useState } from "react";

/**
 * Retarda la propagaciÃ³n de un valor para reducir llamadas frecuentes (debounce).
 * @param value Valor fuente.
 * @param delay Milisegundos de espera.
 * @returns Valor actualizado despuÃ©s del tiempo configurado.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
