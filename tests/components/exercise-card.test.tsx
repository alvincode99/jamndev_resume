import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExerciseCard } from "@/components/features/exercises/exercise-card";

/**
 * Pruebas del componente visual de ejercicios.
 */
describe("ExerciseCard", () => {
  it("renderiza título, descripción y enlaces principales", () => {
    render(
      <ExerciseCard
        exercise={{
          id: "ex-1",
          title: "Prueba de componente",
          slug: "prueba-componente",
          description: "Descripción de ejemplo",
          tags: ["react"],
          links: [],
          demoUrl: "https://example.com/demo",
          repoUrl: "https://example.com/repo",
          date: "2025-01-01T00:00:00.000Z",
        }}
      />,
    );

    expect(screen.getByText("Prueba de componente")).toBeInTheDocument();
    expect(screen.getByText("Descripción de ejemplo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute(
      "href",
      "/exercises/prueba-componente",
    );
  });
});
