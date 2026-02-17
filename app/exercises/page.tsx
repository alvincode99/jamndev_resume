import { ExerciseCard } from "@/components/features/exercises/exercise-card";
import { SearchPanel } from "@/components/features/search/search-panel";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { listExercises } from "@/server/repositories/exercise.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina pÃºblica de ejercicios con listado completo.
 * @returns Vista de ejercicios tÃ©cnicos del CV.
 */
export default async function ExercisesPage() {
  const exercises = await listExercises();

  return (
    <Container className="space-y-10 py-10">
      <SectionTitle eyebrow="PrÃ¡ctica" title="Ejercicios">
        <p>
          Soluciones cortas orientadas a aprendizaje, patrones y validaciÃ³n de ideas.
        </p>
      </SectionTitle>

      <SearchPanel defaultType="exercises" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </Container>
  );
}
