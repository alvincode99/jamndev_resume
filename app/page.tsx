import Image from "next/image";
import Link from "next/link";

import { ExerciseCard } from "@/components/features/exercises/exercise-card";
import { ProjectCard } from "@/components/features/projects/project-card";
import { SearchPanel } from "@/components/features/search/search-panel";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { TagBadge } from "@/components/ui/tag-badge";
import { getHomeContentUseCase } from "@/server/use-cases/get-home-content.use-case";

/**
 * PÃ¡gina principal del CV pÃºblico con resumen profesional y contenido destacado.
 * @returns Vista Home con perfil, skills, proyectos, ejercicios y buscador.
 */
export default async function HomePage() {
  const { cv, projects, exercises } = await getHomeContentUseCase();

  return (
    <div className="py-10">
      <Container className="space-y-12">
        <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
              Disponible para oportunidades remotas
            </p>
            <h1 className="text-5xl leading-none sm:text-6xl">
              {cv?.fullName ?? "Jamndev"}
              <span className="block text-emerald-300">{cv?.title ?? "Full Stack Engineer"}</span>
            </h1>
            <p className="max-w-2xl text-slate-300">
              {cv?.summary ??
                "// TODO: completar resumen profesional con mÃ©tricas de impacto y foco por industria."}
            </p>
            <div className="flex flex-wrap gap-2">
              {(cv?.skills ?? ["node.js", "next.js", "typescript", "postgresql"]).map(
                (skill) => (
                  <TagBadge key={skill} label={skill} />
                ),
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
              >
                Descargar CV
              </a>
              <Link
                href="/projects"
                className="rounded-md border border-slate-700 px-4 py-2 text-slate-100"
              >
                Ver proyectos
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src="/template-assets/images/person.jpg"
              alt="Retrato profesional"
              width={600}
              height={760}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle eyebrow="BÃºsqueda" title="Encuentra rÃ¡pido ejercicios y proyectos">
            <p>Filtra por texto o tags usando el endpoint serverless `/api/search`.</p>
          </SectionTitle>
          <SearchPanel defaultType="all" />
        </section>

        <section>
          <SectionTitle eyebrow="Proyectos" title="Proyectos destacados" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                imageSrc={`/template-assets/projects/project-0${index + 3}.png`}
              />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/projects" className="text-emerald-300 hover:text-emerald-200">
              Ver todos los proyectos
            </Link>
          </div>
        </section>

        <section>
          <SectionTitle eyebrow="Ejercicios" title="Laboratorio tÃ©cnico" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/exercises" className="text-emerald-300 hover:text-emerald-200">
              Ver todos los ejercicios
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
