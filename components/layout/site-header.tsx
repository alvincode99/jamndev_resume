import Link from "next/link";

interface SiteHeaderProps {
  isAdmin: boolean;
}

/**
 * Encabezado principal con navegaciÃ³n pÃºblica y acceso al Ã¡rea admin.
 * @param props Estado de permisos para mostrar enlaces contextuales.
 * @returns Barra superior reutilizable para todo el sitio.
 */
export function SiteHeader({ isAdmin }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold uppercase tracking-[0.3em] text-emerald-300">
          JAMNDEV
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-300">
          <Link href="/projects" className="hover:text-emerald-300">
            Proyectos
          </Link>
          <Link href="/exercises" className="hover:text-emerald-300">
            Ejercicios
          </Link>
          <a href="/cv.pdf" className="hover:text-emerald-300" target="_blank" rel="noreferrer">
            Descargar CV
          </a>
          {isAdmin ? (
            <Link href="/admin" className="rounded-md border border-emerald-400/40 px-3 py-1 text-emerald-200 hover:bg-emerald-500/10">
              Admin
            </Link>
          ) : (
            <Link href="/login" className="rounded-md border border-slate-700 px-3 py-1 hover:border-emerald-400/50 hover:text-emerald-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
