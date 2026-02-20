"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Braces,
  Code2,
  Database,
  Leaf,
  Server,
  TestTube2,
  type LucideIcon,
} from "lucide-react";

import projectsJson from "@/data/stratos-projects.json";

type ProjectRow = {
  title: string;
  description: string;
  stack: string[];
  repo: string;
};

const projects: ProjectRow[] = projectsJson as ProjectRow[];

const stackIconMap: Array<{ tokens: string[]; icon: LucideIcon }> = [
  { tokens: ["react"], icon: Atom },
  { tokens: ["next"], icon: Atom },
  { tokens: ["angular"], icon: Braces },
  { tokens: ["node"], icon: Server },
  { tokens: ["java", "spring"], icon: Leaf },
  { tokens: ["postgres", "mongo", "mysql", "oracle", "database"], icon: Database },
  { tokens: ["vitest", "test"], icon: TestTube2 },
];

function resolveStackIcon(stack: string[]): LucideIcon {
  const normalized = stack.join(" ").toLowerCase();
  const match = stackIconMap.find((entry) =>
    entry.tokens.some((token) => normalized.includes(token)),
  );
  return match?.icon ?? Code2;
}

/**
 * Renderiza la seccion "Proyectos" con filas enlazadas al repositorio y stacks en formato pills.
 * @returns Bloque de proyectos con icono por tecnologia principal del stack.
 * @remarks Error comun: si `repo` esta vacio en el JSON, la fila no podra redirigir correctamente.
 * @example
 * ```tsx
 * <StratosProjectsSkills />
 * ```
 */
export default function StratosProjectsSkills() {
  return (
    <section id="testimonials" className="py-16 xl:pl-36 2xl:pl-28">
      <div className="container">
        <motion.div
          className="mb-8 border-b border-white/10 pb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h4 className="font-bebas text-5xl text-grey-50 max-md:text-4xl">Proyectos</h4>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-base leading-7 text-grey-400">
            Aqui les muestro algunos de mis
            <span className="mx-1 font-semibold text-primary-400">proyectos personales</span>
          </p>
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, index) => {
            const StackIcon = resolveStackIcon(project.stack);

            return (
              <motion.a
                key={`${project.title}-${index}`}
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Abrir repositorio de ${project.title}`}
                className="grid cursor-pointer grid-cols-1 items-center gap-y-2 border-b border-white/10 px-4 py-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#7cffb2]/15 hover:to-transparent md:grid-cols-[56px_220px_minmax(0,1fr)] md:gap-x-2 md:gap-y-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="flex justify-center md:justify-start">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary-400/35 bg-white/5 text-primary-400">
                    <StackIcon size={24} strokeWidth={1.2} />
                  </div>
                </div>

                <div>
                  <h5 className="font-bebas text-3xl tracking-tight text-grey-50 max-md:text-[1.65rem]">
                    {project.title}
                  </h5>
                </div>

                <div>
                  <p className="font-inter text-sm leading-6 text-grey-400">{project.description}</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span
                        key={`${project.title}-${technology}`}
                        className="rounded-full border border-primary-400/30 bg-primary-400/10 px-2 py-1 font-mono text-xs text-primary-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
