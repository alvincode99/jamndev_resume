import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ExerciseDto } from "@/server/repositories/exercise.repository";

const { listExercisesMock } = vi.hoisted(() => ({
  listExercisesMock: vi.fn(),
}));

vi.mock("@/server/repositories/exercise.repository", () => ({
  listExercises: listExercisesMock,
  createExercise: vi.fn(),
}));

import { GET } from "@/app/api/exercises/route";

/**
 * Pruebas unitarias del route handler GET /api/exercises.
 */
describe("GET /api/exercises", () => {
  beforeEach(() => {
    listExercisesMock.mockReset();
  });

  it("debe retornar la lista filtrada de ejercicios", async () => {
    const exercises: ExerciseDto[] = [
      {
        id: "ex-1",
        title: "Node",
        slug: "node",
        description: "desc",
        tags: ["node"],
        links: [],
        demoUrl: null,
        repoUrl: null,
        date: "2025-01-01T00:00:00.000Z",
      },
    ];

    listExercisesMock.mockResolvedValue(exercises);

    const request = new NextRequest(
      "http://localhost:3000/api/exercises?query=node",
    );

    const response = await GET(request);
    const json = (await response.json()) as {
      status: string;
      message: string;
      data: ExerciseDto[];
    };

    expect(response.status).toBe(200);
    expect(json.status).toBe("success");
    expect(json.data).toHaveLength(1);
    expect(listExercisesMock).toHaveBeenCalledWith({
      query: "node",
      tag: undefined,
    });
  });
});
