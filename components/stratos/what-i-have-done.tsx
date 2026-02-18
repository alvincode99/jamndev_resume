"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Boxes,
  BriefcaseBusiness,
  Eye,
  Layers,
  Monitor,
  MousePointerClick,
  PanelsTopLeft,
  Ruler,
  Search,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

type RoleId = "frontend" | "digital-designer";

type RoleOption = {
  id: RoleId;
  label: string;
};

type FeatureItem = {
  text: string;
  icon: LucideIcon;
};

type SkillLogo = {
  src: string;
  alt: string;
};

const skillLogos = {
  javascript: "/images/skill-logos/javascript.svg",
  typescript: "/images/skill-logos/typescript.svg",
  react: "/images/skill-logos/react.svg",
  vue: "/images/skill-logos/vue.svg",
  angular: "/images/skill-logos/angular.svg",
  java: "/images/skill-logos/java.svg",
  spring: "/images/skill-logos/spring.svg",
  dotnet: "/images/skill-logos/dotnet.svg",
  nestjs: "/images/skill-logos/nestjs.svg",
  flask: "/images/skill-logos/flask.svg",
  postgresql: "/images/skill-logos/postgresql.svg",
  mongodb: "/images/skill-logos/mongodb.svg",
  docker: "/images/skill-logos/docker.svg",
  kubernetes: "/images/skill-logos/kubernetes.svg",
} as const;

const roles: RoleOption[] = [
  { id: "frontend", label: "Frontend Developer" },
  { id: "digital-designer", label: "Backend Developer" },
];

const frontendSkills: SkillLogo[] = [
  { src: skillLogos.javascript, alt: "Logo de JavaScript" },
  { src: skillLogos.typescript, alt: "Logo de TypeScript" },
  { src: skillLogos.react, alt: "Logo de React" },
  { src: skillLogos.vue, alt: "Logo de Vue" },
  { src: skillLogos.angular, alt: "Logo de Angular" },
];

const digitalDesignerSkills: SkillLogo[] = [
  { src: skillLogos.java, alt: "Logo de Java" },
  { src: skillLogos.spring, alt: "Logo de Spring Boot" },
  { src: skillLogos.dotnet, alt: "Logo de .NET" },
  { src: skillLogos.nestjs, alt: "Logo de NestJS" },
  { src: skillLogos.flask, alt: "Logo de Flask" },
];

const frontendFeatures: FeatureItem[] = [
  { text: "Crear interfaces escalables", icon: PanelsTopLeft },
  { text: "Optimizar rendimiento (Core Web Vitals)", icon: Zap },
  { text: "Arquitectura por componentes", icon: Boxes },
  { text: "Consumo de APIs y autenticación", icon: Ruler },
  { text: "Experiencia consistente (UI/UX + responsive)", icon: ShieldCheck },
];

const digitalDesignerFeatures: FeatureItem[] = [
  { text: "APIs y microservicios escalables", icon: Monitor },
  { text: "Integración y seguridad (Auth/OAuth/JWT)", icon: MousePointerClick },
  { text: "Datos: SQL/NoSQL (PostgreSQL, Oracle, MongoDB)", icon: Layers },
  { text: "Cloud & DevOps (GCP/AWS, Docker, Kubernetes)", icon: Search },
  { text: "Calidad: pruebas, observabilidad y CI/CD", icon: Eye },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function SegmentedControl({
  options,
  activeId,
  onSelect,
}: {
  options: RoleOption[];
  activeId: RoleId;
  onSelect: (selectedId: RoleId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-0 rounded-lg border border-grey-700 bg-grey-800-opacity-50 p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={activeId === option.id}
          onClick={() => onSelect(option.id)}
          className={`max-md:text-sm cursor-pointer rounded-md px-2 py-1.5 text-base font-bebas transition-all duration-200 ${activeId === option.id ? "bg-primary-400 text-white" : "text-grey-400 hover:text-white"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function GlassIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="mx-auto grid grid-cols-2 gap-[5em] overflow-visible pb-[2em] md:grid-cols-3">
      <span className="group relative h-[4.5em] w-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent]">
        <span
          className="absolute left-0 top-0 block h-full w-full origin-[100%_100%] rotate-[15deg] rounded-[1.25em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
          style={{
            background: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
            boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
          }}
        />

        <span
          className="absolute left-0 top-0 flex h-full w-full origin-[80%_50%] transform rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] backdrop-blur-[0.75em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:translateZ(2em)] [-webkit-backdrop-filter:blur(0.75em)]"
          style={{
            boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
          }}
        >
          <span className="m-auto flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        </span>
      </span>
    </div>
  );
}

/**
 * Renderiza la seccion "What I have done" usando el bloque visual original de "What I do" de Stratos.
 * @returns Seccion interactiva con habilidades, alternancia de roles y listado visual de capacidades.
 * @remarks Error comun: si faltan los SVG en `public/images/skill-logos` o `public/images/smart-*.svg`, las imagenes no cargaran.
 * @example
 * ```tsx
 * <StratosWhatIHaveDone />
 * ```
 */
export default function StratosWhatIHaveDone() {
  const [selectedRole, setSelectedRole] = useState<RoleId>("frontend");

  const isFrontend = selectedRole === "frontend";

  const activeSkills = useMemo(
    () => (isFrontend ? frontendSkills : digitalDesignerSkills),
    [isFrontend],
  );

  const leftImageClassnames = isFrontend ? "opacity-90" : "opacity-20";
  const rightImageClassnames = isFrontend ? "opacity-20" : "opacity-90";

  return (
    <section id="portfolio" className="relative py-16 xl:pl-36 2xl:pl-28">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h6
            className="mb-1 inline-block font-bebas text-lg tracking-[1px] text-grey-400"
            variants={skillVariants}
          >
            Siempre aprendiendo y mejorando el producto
          </motion.h6>
          <motion.p
            className="mx-auto w-3xl font-inter leading-7 text-grey-50 max-lg:w-full"
            variants={skillVariants}
          >
            Mi enfoque es{" "}
            <span className="font-bold text-primary-400">adaptarme rápido</span>,{" "}
            <span className="font-bold text-primary-400">entender el negocio</span> y entregar{" "}
            <span className="font-bold text-primary-400">software estable, seguro</span> y{" "}
            <span className="font-bold text-primary-400">mantenible en producción</span>.
          </motion.p>
        </motion.div>

        <div className="relative rounded-xl bg-[linear-gradient(120deg,#52525b,#52525b,#407cff,#22c55e,#7cffb2)] p-[1px]">
          <div className="grid min-h-[600px] grid-cols-3 gap-8 rounded-xl bg-[#1a1a1c] p-10 text-[#fafafa] max-lg:grid-cols-1 max-lg:p-6">
            <div className="flex h-full flex-col justify-end">
              <div className="absolute top-[-18px] flex items-center rounded-full border border-white-opacity-20 bg-background px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <p className="ml-3 text-xs">Abierto a oportunidades.</p>
              </div>

              <div>
                <GlassIcon icon={<BriefcaseBusiness size={48} strokeWidth={1} />} />
                <h4 className="mb-2 font-inter text-xl font-semibold text-grey-50">
                  {isFrontend
                    ? "Construyo interfaces modernas y rápidas"
                    : "Hago que los sistemas funcionen"}
                </h4>
                <p className="text-grey-400">
                  {isFrontend
                    ? "Diseño y desarrollo experiencias web con React y Next.js (App Router), cuidando UX, accesibilidad y Core Web Vitals. Me gusta crear productos con estética tech y performance real, listos para producción."
                    : "Construyo APIs y microservicios con Java/Spring Boot, C#/.NET, Node/NestJS y Python/Flask. Trabajo con bases SQL/NoSQL, integración REST/SOAP, seguridad y despliegue en nube con Docker y Kubernetes."}
                </p>

                <div className="mt-6">
                  <SegmentedControl
                    options={roles}
                    activeId={selectedRole}
                    onSelect={setSelectedRole}
                  />
                </div>

                <motion.div
                  key={selectedRole}
                  className="mt-4 flex flex-wrap items-center justify-center gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {activeSkills.map((skill) => (
                    <motion.div key={skill.src} variants={skillVariants}>
                      <Image src={skill.src} alt={skill.alt} width={28} height={28} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="relative col-span-2 flex items-center justify-center max-md:justify-start">
              <div
                className={`flex items-center justify-center transition-transform duration-500 ease-in-out ${isFrontend ? "translate-x-4 max-md:translate-x-0" : "-translate-x-4 max-md:translate-x-0"}`}
              >
                <div className="flex">
                  {isFrontend ? (
                    <div>
                      <ul>
                        {frontendFeatures.map((feature, index) => (
                          <li
                            key={feature.text}
                            className={`relative mb-6 flex items-center text-lg max-md:flex-row-reverse ${index === 1 ? "right-12 max-md:right-0" : ""} ${index === 2 ? "right-24 max-md:right-0" : ""} ${index === 3 ? "right-12 max-md:right-0" : ""}`}
                          >
                            <span className="mr-5 w-[200px] text-right max-md:ml-5 max-md:mr-0 max-md:text-left">
                              {feature.text}
                            </span>
                            <div className="background-primary relative flex h-16 w-16 items-center justify-center rounded-lg border border-grey-300 text-grey-50">
                              <feature.icon size={48} strokeWidth={0.5} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <Image
                    src="/images/smart-left-brain.svg"
                    alt="Lado izquierdo del cerebro"
                    width={150}
                    height={100}
                    className={`${leftImageClassnames} hidden max-xl:w-[115px] md:block`}
                  />
                </div>

                <div className="flex">
                  <Image
                    src="/images/smart-right-brain.svg"
                    alt="Lado derecho del cerebro"
                    width={150}
                    height={100}
                    className={`${rightImageClassnames} hidden max-xl:w-[115px] md:block`}
                  />

                  {!isFrontend ? (
                    <div>
                      <ul>
                        {digitalDesignerFeatures.map((feature, index) => (
                          <li
                            key={feature.text}
                            className={`relative mb-6 flex items-center text-lg ${index === 1 ? "left-12 max-md:left-0" : ""} ${index === 2 ? "left-24 max-md:left-0" : ""} ${index === 3 ? "left-12 max-md:left-0" : ""}`}
                          >
                            <div className="background-primary relative flex h-16 w-16 items-center justify-center rounded-lg border border-grey-300 text-grey-50">
                              <feature.icon size={48} strokeWidth={0.5} />
                            </div>
                            <span className="ml-5 w-[200px] text-left">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
