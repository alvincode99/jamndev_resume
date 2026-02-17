import { type Prisma, type Project } from "@prisma/client";

import { prisma } from "@/lib/db";

/**
 * Filtros disponibles para listar proyectos.
 */
export interface ProjectFilters {
  query?: string | undefined;
  tag?: string | undefined;
}

/**
 * DTO principal para proyectos de portafolio.
 */
export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  links: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  date: string;
}

/**
 * Payload para crear un proyecto.
 */
export type CreateProjectInput = Omit<ProjectDto, "id">;

/**
 * Payload para actualizar parcialmente un proyecto.
 */
export type UpdateProjectInput = Partial<CreateProjectInput>;

function mapProject(project: Project): ProjectDto {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    tags: project.tags,
    stack: project.stack,
    links: (project.links as string[]) ?? [],
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
    date: project.date.toISOString(),
  };
}

/**
 * Lista proyectos con filtros simples por texto y tags.
 * @param filters Criterios opcionales de búsqueda.
 * @returns Proyectos ordenados de más reciente a más antiguo.
 */
export async function listProjects(
  filters: ProjectFilters = {},
): Promise<ProjectDto[]> {
  const where: Prisma.ProjectWhereInput = {
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

  const projects = await prisma.project.findMany({
    where,
    orderBy: {
      date: "desc",
    },
  });

  return projects.map(mapProject);
}

/**
 * Obtiene un proyecto por identificador.
 * @param id Identificador interno.
 * @returns Proyecto encontrado o `null`.
 */
export async function getProjectById(id: string): Promise<ProjectDto | null> {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  return project ? mapProject(project) : null;
}

/**
 * Crea un nuevo proyecto.
 * @param payload Datos a persistir.
 * @returns Proyecto creado.
 */
export async function createProject(
  payload: CreateProjectInput,
): Promise<ProjectDto> {
  const project = await prisma.project.create({
    data: {
      ...payload,
      date: new Date(payload.date),
      links: payload.links as Prisma.InputJsonValue,
    },
  });

  return mapProject(project);
}

/**
 * Actualiza un proyecto existente.
 * @param id Identificador del proyecto.
 * @param payload Datos parciales para actualización.
 * @returns Proyecto actualizado.
 */
export async function updateProject(
  id: string,
  payload: UpdateProjectInput,
): Promise<ProjectDto> {
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.description ? { description: payload.description } : {}),
      ...(payload.tags ? { tags: payload.tags } : {}),
      ...(payload.stack ? { stack: payload.stack } : {}),
      ...(payload.links
        ? { links: payload.links as Prisma.InputJsonValue }
        : {}),
      ...(payload.demoUrl !== undefined ? { demoUrl: payload.demoUrl } : {}),
      ...(payload.repoUrl !== undefined ? { repoUrl: payload.repoUrl } : {}),
      ...(payload.date ? { date: new Date(payload.date) } : {}),
    },
  });

  return mapProject(project);
}

/**
 * Elimina un proyecto por ID.
 * @param id Identificador del proyecto.
 * @returns Proyecto eliminado.
 */
export async function deleteProject(id: string): Promise<ProjectDto> {
  const project = await prisma.project.delete({
    where: { id },
  });

  return mapProject(project);
}
