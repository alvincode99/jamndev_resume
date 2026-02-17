import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * Dashboard principal del panel admin.
 * @returns Accesos rÃ¡pidos a mÃ³dulos de gestiÃ³n.
 */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="text-3xl text-slate-100">Resumen</h2>
      <p className="text-sm text-slate-300">
        Administra contenido pÃºblico del CV, proyectos y ejercicios desde este panel.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/admin/cv" className="rounded-md border border-slate-700 p-4 text-sm text-slate-100 hover:border-emerald-400/50">
          Editar CV
        </Link>
        <Link href="/admin/projects" className="rounded-md border border-slate-700 p-4 text-sm text-slate-100 hover:border-emerald-400/50">
          CRUD Proyectos
        </Link>
        <Link href="/admin/exercises" className="rounded-md border border-slate-700 p-4 text-sm text-slate-100 hover:border-emerald-400/50">
          CRUD Ejercicios
        </Link>
      </div>
    </div>
  );
}
