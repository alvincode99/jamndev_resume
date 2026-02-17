import { type PropsWithChildren } from "react";

interface SectionTitleProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
}

/**
 * Renderiza encabezados de secciÃ³n con estilo consistente del sitio.
 * @param props Propiedades visuales del encabezado.
 * @returns Bloque de tÃ­tulo y contenido descriptivo opcional.
 */
export function SectionTitle({ eyebrow, title, children }: SectionTitleProps) {
  return (
    <header className="mb-8">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        {title}
      </h2>
      {children ? <div className="mt-3 max-w-2xl text-slate-300">{children}</div> : null}
    </header>
  );
}
