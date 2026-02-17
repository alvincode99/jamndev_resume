import { ProjectManager } from "@/components/admin/project-manager";
import { listProjects } from "@/server/repositories/project.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina de administraciÃ³n para CRUD de proyectos.
 * @returns Gestor interactivo de proyectos.
 */
export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return <ProjectManager initialProjects={projects} />;
}
