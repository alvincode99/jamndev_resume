import { type Exercise, type Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

/**
 * Filtros disponibles para listar ejercicios.
 */
export interface ExerciseFilters {
  query?: string | undefined;
  tag?: string | undefined;
}

/**
 * DTO de lectura/escritura para ejercicios.
 */
export interface ExerciseDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  links: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  date: string;
}

/**
 * Payload para crear un ejercicio.
 */
export type CreateExerciseInput = Omit<ExerciseDto, "id">;

/**
 * Payload para actualizar parcialmente un ejercicio.
 */
export type UpdateExerciseInput = Partial<CreateExerciseInput>;

function mapExercise(exercise: Exercise): ExerciseDto {
  return {
    id: exercise.id,
    title: exercise.title,
    slug: exercise.slug,
    description: exercise.description,
    tags: exercise.tags,
    links: (exercise.links as string[]) ?? [],
    demoUrl: exercise.demoUrl,
    repoUrl: exercise.repoUrl,
    date: exercise.date.toISOString(),
  };
}

/**
 * Lista ejercicios aplicando filtros simples por texto y tag.
 * @param filters Criterios de filtrado opcionales.
 * @returns Lista de ejercicios ordenada por fecha descendente.
 */
export async function listExercises(
  filters: ExerciseFilters = {},
): Promise<ExerciseDto[]> {
  const where: Prisma.ExerciseWhereInput = {
    ...(filters.query
      ? {
          OR: [
            { title: { contains: filters.query, mode: "insensitive" } },
            { description: { contains: filters.query, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(filters.tag
      ? {
          tags: {
            has: filters.tag.toLowerCase(),
          },
        }
      : {}),
  };

  const exercises = await prisma.exercise.findMany({
    where,
    orderBy: {
      date: "desc",
    },
  });

  return exercises.map(mapExercise);
}

/**
 * Obtiene el detalle de un ejercicio por slug público.
 * @param slug Slug único del ejercicio.
 * @returns Ejercicio encontrado o `null`.
 */
export async function getExerciseBySlug(slug: string): Promise<ExerciseDto | null> {
  const exercise = await prisma.exercise.findUnique({
    where: { slug },
  });

  return exercise ? mapExercise(exercise) : null;
}

/**
 * Obtiene un ejercicio por su identificador interno.
 * @param id Identificador del ejercicio.
 * @returns Ejercicio encontrado o `null`.
 */
export async function getExerciseById(id: string): Promise<ExerciseDto | null> {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  return exercise ? mapExercise(exercise) : null;
}

/**
 * Crea un nuevo ejercicio en la base de datos.
 * @param payload Datos del nuevo ejercicio.
 * @returns Ejercicio creado.
 */
export async function createExercise(
  payload: CreateExerciseInput,
): Promise<ExerciseDto> {
  const exercise = await prisma.exercise.create({
    data: {
      ...payload,
      date: new Date(payload.date),
      links: payload.links as Prisma.InputJsonValue,
    },
  });

  return mapExercise(exercise);
}

/**
 * Actualiza un ejercicio existente por su identificador.
 * @param id Identificador del ejercicio.
 * @param payload Datos parciales a actualizar.
 * @returns Ejercicio actualizado.
 * @throws Error si el registro no existe.
 */
export async function updateExercise(
  id: string,
  payload: UpdateExerciseInput,
): Promise<ExerciseDto> {
  const exercise = await prisma.exercise.update({
    where: { id },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.description ? { description: payload.description } : {}),
      ...(payload.tags ? { tags: payload.tags } : {}),
      ...(payload.links
        ? { links: payload.links as Prisma.InputJsonValue }
        : {}),
      ...(payload.demoUrl !== undefined ? { demoUrl: payload.demoUrl } : {}),
      ...(payload.repoUrl !== undefined ? { repoUrl: payload.repoUrl } : {}),
      ...(payload.date ? { date: new Date(payload.date) } : {}),
    },
  });

  return mapExercise(exercise);
}

/**
 * Elimina un ejercicio por identificador.
 * @param id Identificador del ejercicio.
 * @returns Ejercicio eliminado.
 */
export async function deleteExercise(id: string): Promise<ExerciseDto> {
  const exercise = await prisma.exercise.delete({
    where: { id },
  });

  return mapExercise(exercise);
}
