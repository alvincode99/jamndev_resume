import type { ExerciseDto } from "@/server/repositories/exercise.repository";
import { listExercises } from "@/server/repositories/exercise.repository";
import type { ProjectDto } from "@/server/repositories/project.repository";
import { listProjects } from "@/server/repositories/project.repository";

/**
 * Criterios de búsqueda para contenido público.
 */
export interface SearchContentInput {
  query?: string | undefined;
  tag?: string | undefined;
  type?: "all" | "exercises" | "projects";
}

/**
 * Resultado combinado de búsqueda de contenido.
 */
export interface SearchContentResult {
  exercises: ExerciseDto[];
  projects: ProjectDto[];
}

/**
 * Dependencias inyectables para pruebas unitarias del caso de uso.
 */
export interface SearchContentDependencies {
  listExercisesFn?: typeof listExercises;
  listProjectsFn?: typeof listProjects;
}

/**
 * Ejecuta la búsqueda transversal de ejercicios y proyectos.
 * @param input Filtros de texto/tag y tipo de entidad.
 * @param deps Dependencias opcionales para testing.
 * @returns Colecciones filtradas según el tipo solicitado.
 */
export async function searchContentUseCase(
  input: SearchContentInput,
  deps: SearchContentDependencies = {},
): Promise<SearchContentResult> {
  const type = input.type ?? "all";
  const listExercisesFn = deps.listExercisesFn ?? listExercises;
  const listProjectsFn = deps.listProjectsFn ?? listProjects;

  const exercisePromise =
    type === "all" || type === "exercises"
      ? listExercisesFn({ query: input.query, tag: input.tag })
      : Promise.resolve([]);

  const projectPromise =
    type === "all" || type === "projects"
      ? listProjectsFn({ query: input.query, tag: input.tag })
      : Promise.resolve([]);

  const [exercises, projects] = await Promise.all([
    exercisePromise,
    projectPromise,
  ]);

  return { exercises, projects };
}
