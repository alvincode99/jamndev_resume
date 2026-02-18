import { describe, expect, it } from "vitest";

import { searchContentUseCase } from "@/server/use-cases/search-content.use-case";

/**
 * Pruebas unitarias del caso de uso de búsqueda transversal.
 */
describe("searchContentUseCase", () => {
  it("debe buscar solo ejercicios cuando type=exercises", async () => {
    const result = await searchContentUseCase(
      {
        query: "node",
        type: "exercises",
      },
      {
        listExercisesFn: async () => [
          {
            id: "ex-1",
            title: "Node challenge",
            slug: "node-challenge",
            description: "desc",
            tags: ["node"],
            links: [],
            demoUrl: null,
            repoUrl: null,
            date: new Date().toISOString(),
          },
        ],
        listProjectsFn: async () => [
          {
            id: "pr-1",
            title: "Project",
            description: "desc",
            tags: ["node"],
            stack: ["next"],
            links: [],
            demoUrl: null,
            repoUrl: null,
            date: new Date().toISOString(),
          },
        ],
      },
    );

    expect(result.exercises).toHaveLength(1);
    expect(result.projects).toHaveLength(0);
    expect(result.exercises[0]?.slug).toBe("node-challenge");
  });
});
