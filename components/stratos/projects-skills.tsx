"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CalendarDays, PenTool, type LucideIcon } from "lucide-react";

type SkillCard = {
  id: number;
  title: string;
  done: string;
  description: string;
  icon: LucideIcon;
};

const skillCards: SkillCard[] = [
  {
    id: 1,
    title: "Ui/Visual Design",
    done: "21 Done",
    description:
      "My work is driven by the belief that thoughtful design and strategic planning can empower brands strategic planning can empower brands",
    icon: Building2,
  },
  {
    id: 2,
    title: "Ui/Visual Design",
    done: "21 Done",
    description:
      "In this portfolio, you'll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Motion Design",
    done: "20 Done",
    description:
      "Each project here showcases my commitment to excellence and adaptability, tailored to meet each client's unique needs",
    icon: PenTool,
  },
];

/**
 * Renderiza la seccion "Proyectos" usando como base visual el bloque "My Skill" de Reeni.
 * @returns Seccion con dos columnas de habilidades y barras de progreso animadas.
 * @remarks Error comun: si el id de la seccion cambia, el menu lateral "Proyectos" deja de hacer scroll correcto.
 * @example
 * ```tsx
 * <StratosProjectsSkills />
 * ```
 */
export default function StratosProjectsSkills() {
  const [activeCardId, setActiveCardId] = useState(2);

  return (
    <section id="testimonials" className="py-16 xl:pl-36 2xl:pl-28">
      <div className="container">
        <motion.div
          className="mb-10 border-b border-white/10 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="inline-block font-bebas text-2xl tracking-[1px] text-[#ff006e]">
            MY SKILL
          </span>
          <h4 className="mt-2 max-w-5xl font-bebas text-6xl text-grey-50 max-md:text-5xl">
            Elevated Designs Personalized
            <br />
            the best Experiences
          </h4>
        </motion.div>

        <div className="space-y-0">
          {skillCards.map((card, index) => {
            const isActive = activeCardId === card.id;
            const Icon = card.icon;

            return (
              <motion.article
                key={card.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveCardId(card.id)}
                onFocus={() => setActiveCardId(card.id)}
                onClick={() => setActiveCardId(card.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveCardId(card.id);
                  }
                }}
                className={`cursor-pointer grid grid-cols-12 items-center gap-6 border-b border-white/10 px-4 py-10 transition-colors duration-300 max-md:gap-4 max-md:py-8 ${
                  isActive ? "bg-[#ff006e] text-white" : "bg-transparent text-grey-50"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="col-span-12 flex justify-center md:col-span-2 md:justify-start">
                  <div
                    className={`grid h-20 w-20 place-items-center rounded-full border ${
                      isActive ? "border-white/40" : "border-white/20"
                    }`}
                  >
                    <Icon size={42} strokeWidth={1.2} />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-3">
                  <h5 className="font-bebas text-5xl tracking-tight max-md:text-4xl">{card.title}</h5>
                  <p
                    className={`mt-1 font-inter text-2xl max-md:text-xl ${
                      isActive ? "text-white/95" : "text-grey-400"
                    }`}
                  >
                    {card.done}
                  </p>
                </div>

                <p
                  className={`col-span-12 font-inter text-xl leading-8 md:col-span-5 ${
                    isActive ? "text-white/95" : "text-grey-400"
                  }`}
                >
                  {card.description}
                </p>

                <div className="col-span-12 flex justify-start md:col-span-2 md:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 font-bebas text-2xl uppercase tracking-[2px]"
                  >
                    Read More
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
