"use client";

import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { ExerciseDto } from "@/server/repositories/exercise.repository";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagBadge } from "@/components/ui/tag-badge";

interface ExerciseCardProps {
  exercise: ExerciseDto;
}

/**
 * Tarjeta reutilizable para mostrar un ejercicio en listados pÃºblicos.
 * @param props Datos de ejercicio a renderizar.
 * @returns Tarjeta con enlaces y metadatos principales.
 */
export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {formatDate(exercise.date)}
          </p>
          <h3 className="text-xl font-semibold text-slate-100">{exercise.title}</h3>
          <p className="text-sm text-slate-300">{exercise.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {exercise.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 text-sm">
          <Link href={`/exercises/${exercise.slug}`} className="text-emerald-300 hover:text-emerald-200">
            Ver detalle
          </Link>
          {exercise.demoUrl ? (
            <a href={exercise.demoUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-slate-100">
              Demo
            </a>
          ) : null}
          {exercise.repoUrl ? (
            <a href={exercise.repoUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-slate-100">
              Repo
            </a>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}
