import { type PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

/**
 * Contenedor responsivo reutilizable para mantener consistencia de layout.
 * @param props Propiedades del contenedor.
 * @returns Componente `div` con ancho mÃ¡ximo y padding horizontal.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
