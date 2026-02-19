"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ListTodo,
  Mail,
  Menu,
  Quote,
  SquareChartGantt,
  User,
  X,
} from "lucide-react";

import { debounce } from "@/lib/debounce";

type StratosMobileNavigationProps = {
  onOpenProfilePanel?: () => void;
};

/**
 * Navegacion movil original de Stratos.
 * @param props Callbacks opcionales para extender acciones del menu.
 * @returns Boton hamburguesa y panel lateral para navegar secciones.
 */
export default function StratosMobileNavigation({
  onOpenProfilePanel,
}: StratosMobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  const sectionIds = useMemo(
    () => ["about-me", "my-skills", "portfolio", "my-journey", "testimonials", "contact"],
    [],
  );

  const scrollToSection = (id: number) => {
    setActiveItem(id);
    setIsOpen(false);

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
      setIsOpen(false);
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
    { id: 5, title: "Proyectos", icon: <Quote size={20} strokeWidth={1.5} /> },
    { id: 6, title: "Contacto", icon: <Mail size={20} strokeWidth={1.5} /> },
  ];

  return (
    <div className="fixed left-0 top-0 z-[100] w-full xl:hidden">
      <button
        className="absolute right-4 top-4 z-[101] cursor-pointer rounded-md bg-white/10 p-2 text-white"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        className={`fixed left-0 top-0 z-[99] flex h-full w-64 transform flex-col items-center justify-center space-y-4 bg-black/90 font-bebas transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative flex h-12 w-48 cursor-pointer items-center rounded-lg border border-white/10 bg-white/5 pl-3.5 text-white transition-all duration-500 hover:bg-white/15 ${item.id === activeItem ? "bg-white/15" : ""}`}
            aria-label={item.title}
            onClick={() => handleNavItemClick(item.id)}
          >
            <div className="mr-4">{item.icon}</div>
            <span className="text-lg tracking-[1px]">{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
