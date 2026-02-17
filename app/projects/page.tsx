import { ProjectCard } from "@/components/features/projects/project-card";
import { SearchPanel } from "@/components/features/search/search-panel";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { listProjects } from "@/server/repositories/project.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina pÃºblica de proyectos con listado completo y bÃºsqueda asistida.
 * @returns Vista de proyectos del portafolio.
 */
export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <Container className="space-y-10 py-10">
      <SectionTitle eyebrow="Portafolio" title="Proyectos">
        <p>
          Implementaciones recientes en Node.js, Next.js y arquitectura full stack.
        </p>
      </SectionTitle>

      <SearchPanel defaultType="projects" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            imageSrc={`/template-assets/projects/project-0${(index % 3) + 3}.png`}
          />
        ))}
      </div>
    </Container>
  );
}
