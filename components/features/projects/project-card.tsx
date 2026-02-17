import Image from "next/image";

import { formatDate } from "@/lib/format";
import type { ProjectDto } from "@/server/repositories/project.repository";

import { TagBadge } from "@/components/ui/tag-badge";

interface ProjectCardProps {
  project: ProjectDto;
  imageSrc?: string;
}

/**
 * Tarjeta de proyecto para el portafolio pÃºblico.
 * @param props Datos y assets opcionales del proyecto.
 * @returns Componente visual de proyecto con tags y enlaces.
 */
export function ProjectCard({ project, imageSrc }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={project.title}
          width={1200}
          height={600}
          className="h-48 w-full object-cover"
        />
      ) : null}
      <div className="space-y-4 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{formatDate(project.date)}</p>
        <h3 className="text-2xl font-semibold text-slate-100">{project.title}</h3>
        <p className="text-sm text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagBadge key={`${project.id}-${tag}`} label={tag} />
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-emerald-200">
              Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-slate-100">
              Repo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
