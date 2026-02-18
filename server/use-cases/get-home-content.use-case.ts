import { getCvProfile } from "@/server/repositories/cv.repository";
import { listExercises } from "@/server/repositories/exercise.repository";
import { listProjects } from "@/server/repositories/project.repository";

/**
 * Obtiene los datos necesarios para renderizar la portada del CV.
 * @returns Perfil de CV y listados resumidos de proyectos/ejercicios.
 */
export async function getHomeContentUseCase() {
  const [cv, projects, exercises] = await Promise.all([
    getCvProfile(),
    listProjects(),
    listExercises(),
  ]);

  return {
    cv,
    projects: projects.slice(0, 3),
    exercises: exercises.slice(0, 5),
  };
}
