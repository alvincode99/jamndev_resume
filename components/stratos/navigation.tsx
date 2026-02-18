"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ListTodo,
  Mail,
  Quote,
  SquareChartGantt,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

import { debounce } from "@/lib/debounce";

type StratosNavigationProps = {
  onOpenProfilePanel?: () => void;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

/**
 * Navegacion lateral original de Stratos para secciones del home.
 * @param props Callbacks opcionales para extender acciones del menu.
 * @returns Menu fijo con iconos y scroll suave entre anclas.
 */
export default function StratosNavigation({ onOpenProfilePanel }: StratosNavigationProps) {
  const [activeItem, setActiveItem] = useState(1);

  const sectionIds = useMemo(
    () => ["about-me", "my-skills", "portfolio", "my-journey", "testimonials", "contact"],
    [],
  );

  const scrollToSection = (id: number) => {
    setActiveItem(id);
    const sectionId = sectionIds[id - 1];
    const section = sectionId ? document.getElementById(sectionId) : null;

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleNavItemClick = (id: number) => {
    if (id === 2) {
      setActiveItem(2);
      onOpenProfilePanel?.();
      return;
    }

    scrollToSection(id);
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;

    sectionIds.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
        setActiveItem(index + 1);
      }
    });
  }, [sectionIds]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 16);

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  const navItems = [
    { id: 1, title: "Quien soy?", icon: <User size={20} strokeWidth={1.5} /> },
    {
      id: 2,
      title: "Que hago yo?",
      icon: <BriefcaseBusiness size={20} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Lo que Hago",
      icon: <ListTodo size={20} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: "Mi experiencia",
      icon: <SquareChartGantt size={20} strokeWidth={1.5} />,
    },
    { id: 5, title: "Testimonials", icon: <Quote size={20} strokeWidth={1.5} /> },
    { id: 6, title: "Contact", icon: <Mail size={20} strokeWidth={1.5} /> },
  ];

  return (
    <motion.nav
      className="fixed z-[99] ml-12 flex h-screen w-32 flex-col justify-center space-y-2 font-bebas max-xl:hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          className={`group relative mb-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all duration-500 hover:bg-white/15 ${item.id === activeItem ? "bg-white/15" : ""}`}
          aria-label={item.title}
          onClick={() => handleNavItemClick(item.id)}
          variants={itemVariants}
        >
          <div>{item.icon}</div>

          <span
            className={`absolute left-14 whitespace-nowrap text-base tracking-[1px] text-grey-50 transition-all duration-300 ease-in-out ${item.id === activeItem ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
          >
            {item.title}
          </span>
        </motion.button>
      ))}
    </motion.nav>
  );
}
