/**
 * Pie de pÃ¡gina global con crÃ©ditos y enlace al PDF del CV.
 * @returns Footer reutilizable para pÃ¡ginas pÃºblicas.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>jamndev_resume Â· Next.js + Prisma + NextAuth</p>
        <a href="/cv.pdf" className="text-emerald-300 hover:text-emerald-200" target="_blank" rel="noreferrer">
          Descargar CV
        </a>
      </div>
    </footer>
  );
}
