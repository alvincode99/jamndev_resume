import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { TagBadge } from "@/components/ui/tag-badge";
import { formatDate } from "@/lib/format";
import { getExerciseBySlug } from "@/server/repositories/exercise.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina de detalle para un ejercicio individual.
 * @param props ParÃ¡metros dinÃ¡micos de ruta.
 * @returns Detalle del ejercicio solicitado.
 */
export default async function ExerciseDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const exercise = await getExerciseBySlug(slug);

  if (!exercise) {
    notFound();
  }

  return (
    <Container className="space-y-8 py-10">
      <Link href="/exercises" className="text-sm text-emerald-300 hover:text-emerald-200">
        ? Volver a ejercicios
      </Link>

      <article className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {formatDate(exercise.date)}
        </p>
        <h1 className="text-5xl text-slate-100">{exercise.title}</h1>
        <p className="text-slate-300">{exercise.description}</p>

        <div className="flex flex-wrap gap-2">
          {exercise.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          {exercise.demoUrl ? (
            <a
              href={exercise.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
            >
              Abrir demo
            </a>
          ) : null}
          {exercise.repoUrl ? (
            <a
              href={exercise.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-700 px-4 py-2 text-slate-100"
            >
              Ver repositorio
            </a>
          ) : null}
        </div>

        {exercise.links.length ? (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-xl text-slate-100">Referencias</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {exercise.links.map((link) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-emerald-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </Container>
  );
}
