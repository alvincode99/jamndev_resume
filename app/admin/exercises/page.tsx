import { ExerciseManager } from "@/components/admin/exercise-manager";
import { listExercises } from "@/server/repositories/exercise.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina de administraciÃ³n para CRUD de ejercicios.
 * @returns Gestor interactivo de ejercicios.
 */
export default async function AdminExercisesPage() {
  const exercises = await listExercises();

  return <ExerciseManager initialExercises={exercises} />;
}
