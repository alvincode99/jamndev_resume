import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/admin/sign-out-button";
import { Container } from "@/components/ui/container";
import { getServerAuthSession } from "@/lib/auth";

/**
 * Layout protegido del panel administrativo.
 * @param props Hijos de rutas internas de `/admin`.
 * @returns Estructura con navegaciÃ³n lateral del panel.
 */
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <Container className="py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h1 className="text-2xl text-slate-100">Panel Admin</h1>
          <nav className="grid gap-2 text-sm text-slate-300">
            <Link href="/admin" className="hover:text-emerald-300">
              Dashboard
            </Link>
            <Link href="/admin/cv" className="hover:text-emerald-300">
              CV
            </Link>
            <Link href="/admin/projects" className="hover:text-emerald-300">
              Proyectos
            </Link>
            <Link href="/admin/exercises" className="hover:text-emerald-300">
              Ejercicios
            </Link>
          </nav>
          <SignOutButton />
        </aside>

        <section className="space-y-4">{children}</section>
      </div>
    </Container>
  );
}
