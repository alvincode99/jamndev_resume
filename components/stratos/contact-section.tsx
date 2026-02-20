"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Eye,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPinHouse,
  MessageCircle,
  ThumbsUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type SocialLink = {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
};

type Activity = {
  title: string;
  description: string;
  time: string;
  status: string;
  category: "Frontend" | "Backend" | "Data";
};

type Skill = {
  name: string;
  level: number;
};

type Tab = {
  key: "profile" | "activity" | "achievements";
  label: string;
  icon: LucideIcon;
};

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: "https://github.com/alvincode99", ariaLabel: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jorge-alan-martinez-nu%C3%B1ez-02a6a918a/",
    ariaLabel: "LinkedIn",
  },
  { icon: MessageCircle, href: "https://w.app/oxpnvr", ariaLabel: "WhatsApp" },
  { icon: Mail, href: "mailto:jamndev@outlook.com", ariaLabel: "Email" },
];

const RECENT_ACTIVITY: Activity[] = [
  {
    title: "Optimizacion de Plataforma CV Personal",
    description:
      "Mejora de la plataforma JAMNDEV desarrollada con Next.js para optimizar rendimiento, SEO tecnico y visualizacion de experiencia Fullstack orientada a Cloud y Ciencia de Datos.",
    time: "Recientemente",
    status: "Publicado",
    category: "Frontend",
  },
  {
    title: "Desarrollo de Tutoriales CRUD en Spring Boot",
    description:
      "Creacion de contenido tecnico para el desarrollo de APIs RESTful utilizando Spring Boot, aplicando arquitectura hexagonal y buenas practicas de integracion.",
    time: "En Progreso",
    status: "Aprendiendo",
    category: "Backend",
  },
  {
    title: "Diplomado en Ciencia de Datos - TripleTen",
    description:
      "Formacion activa en Ciencia de Datos enfocada en analisis exploratorio, machine learning y procesamiento de datos con Python.",
    time: "En Curso",
    status: "Aprendiendo",
    category: "Data",
  },
];

const SKILLS: Skill[] = [
  { name: "Java / Spring Boot", level: 90 },
  { name: "React", level: 85 },
  { name: "Angular", level: 85 },
  { name: "Node.js / NestJS", level: 80 },
  { name: "Next.js", level: 80 },
  { name: "Docker / Kubernetes", level: 75 },
  { name: "AWS / GCP", level: 70 },
  { name: "Python (Data/ML)", level: 70 },
];

const TABS: Tab[] = [
  { key: "profile", label: "Perfil", icon: Eye },
  { key: "activity", label: "Actividad", icon: Clock },
  { key: "achievements", label: "Logros", icon: Trophy },
];

const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const getActivityIcon = (category: Activity["category"]) => {
  const iconMap: Record<Activity["category"], LucideIcon> = {
    Frontend: Eye,
    Backend: ThumbsUp,
    Data: Globe,
  };
  return iconMap[category];
};

const getActivityBgColor = (category: Activity["category"]): string => {
  const colorMap: Record<Activity["category"], string> = {
    Frontend: "bg-cyan-500/20",
    Backend: "bg-primary-400/20",
    Data: "bg-violet-500/20",
  };
  return colorMap[category];
};

const getActivityIconColor = (category: Activity["category"]): string => {
  const colorMap: Record<Activity["category"], string> = {
    Frontend: "text-cyan-300",
    Backend: "text-primary-400",
    Data: "text-violet-300",
  };
  return colorMap[category];
};

function ProfileSection({ skills }: { skills: Skill[] }) {
  return (
    <div className="animate-fadeIn space-y-4">
      <div>
        <h4 className="mb-3 flex items-center gap-2 font-bebas text-white">Top Skills</h4>
        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="mb-5 space-y-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{skill.name}</span>
                <span className="text-xs text-primary-400">{skill.level}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#da8bff] to-[#407cff] transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ActivitySection({ activities }: { activities: Activity[] }) {
  return (
    <div className="animate-fadeIn space-y-3">
      <h4 className="mb-3 flex items-center gap-2 font-bebas text-white">Actividad Reciente</h4>
      <motion.div
        className="space-y-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
        >
        {activities.map((activity, index) => {
          const IconComponent = getActivityIcon(activity.category);
          return (
            <motion.div
              key={`${activity.category}-${index}`}
              className="rounded-xl bg-white/5 p-3 transition-all duration-300 hover:bg-white/10"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityBgColor(activity.category)}`}
                >
                  <IconComponent size={14} className={getActivityIconColor(activity.category)} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{activity.title}</div>
                  <div className="mt-1 text-xs leading-5 text-grey-400">{activity.description}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-2 py-0.5 text-[10px] font-medium text-primary-400">
                      {activity.status}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-grey-400">
                      {activity.category}
                    </span>
                    <span className="text-[10px] text-grey-400">{activity.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="animate-fadeIn space-y-3">
      <h4 className="mb-3 flex items-center gap-2 font-bebas text-white">Logros</h4>
      <motion.div
        className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            },
          },
        }}
      >
        <motion.div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-400/30 bg-primary-400/10 text-primary-400"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Trophy size={24} strokeWidth={1.5} />
        </motion.div>

        <p className="font-bebas text-3xl text-white">Contenido en construccion</p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-grey-400">
          Estamos preparando esta seccion para mostrar hitos y reconocimientos relevantes.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-2 w-2 rounded-full bg-primary-400"
              animate={{
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: dot * 0.12,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ProfileCard({ currentTime, socialLinks }: { currentTime: Date; socialLinks: SocialLink[] }) {
  return (
    <div className="w-[350px] min-w-[350px] border-r border-white/10 p-8 max-lg:w-full">
      <div className="relative flex justify-between">
        <div className="flex items-center rounded-full border border-white-opacity-20 bg-background px-3 py-2 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <p className="ml-3 text-xs text-white">Online</p>
        </div>
        <div className="flex items-center text-white">
          <Clock size={20} strokeWidth={2} />
          <span className="ml-2 text-base font-bebas">{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <div className="h-36 w-36 overflow-hidden rounded-full bg-white/20 p-1 shadow-lg transition-all duration-500 hover:scale-110">
          <Image src="/images/formal.png" alt="Alan Martinez" width={200} height={200} className="rounded-full" priority />
        </div>
      </div>

      <div className="mt-6 text-center">
        <h4 className="text-3xl font-bebas text-white">Alan Martinez</h4>
        <span className="mt-1 block text-sm font-medium text-grey-400">Full Stack Developer</span>
        <div className="mt-4 flex items-center justify-center text-white">
          <MapPinHouse size={20} strokeWidth={1.5} className="mr-2" />
          <span className="font-medium">CDMX, Mexico</span>
        </div>
      </div>

      <div className="mt-4">
        <motion.ul
          className="flex items-center justify-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {socialLinks.map((link) => {
            const isMailLink = link.href.startsWith("mailto:");

            return (
              <motion.li
                key={link.ariaLabel}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
              >
                <a
                  href={link.href}
                  target={isMailLink ? undefined : "_blank"}
                  rel={isMailLink ? undefined : "noreferrer noopener"}
                  className="text-grey-400 transition-colors duration-200 hover:text-white"
                  aria-label={link.ariaLabel}
                >
                  <link.icon size={20} strokeWidth={1} />
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/cv.pdf"
          className="relative inline-block cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase text-white transition-all duration-500 hover:bg-white/8"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}

function TabNavigation({
  tabs,
  activeView,
  onTabChange,
}: {
  tabs: Tab[];
  activeView: Tab["key"];
  onTabChange: (tab: Tab["key"]) => void;
}) {
  return (
    <motion.div
      className="mb-6 flex overflow-hidden rounded-lg border border-white/10 bg-white/5 py-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`mx-1 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-base text-grey-400 transition-all duration-300 ${activeView === tab.key ? "border-white/10 bg-white/5 text-white" : "hover:bg-white/10 hover:text-white/90"}`}
          aria-label={`View ${tab.label.toLowerCase()}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          <tab.icon size={14} />
          <span className="text-sm font-semibold">{tab.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

/**
 * Seccion de contacto estilo Stratos con perfil, actividad y logros.
 * @returns Bloque de contacto interactivo para la parte final del home.
 * @remarks Error comun: quitar el id `contact` rompe el scroll del menu lateral.
 * @example
 * ```tsx
 * <StratosContactSection />
 * ```
 */
export default function StratosContactSection() {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [activeView, setActiveView] = useState<Tab["key"]>("profile");

  const memoizedSkills = useMemo(() => SKILLS, []);
  const memoizedActivities = useMemo(() => RECENT_ACTIVITY, []);

  const handleTabChange = useCallback((tab: Tab["key"]) => {
    setActiveView(tab);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileSection skills={memoizedSkills} />;
      case "activity":
        return <ActivitySection activities={memoizedActivities} />;
      case "achievements":
        return <AchievementsSection />;
      default:
        return <ProfileSection skills={memoizedSkills} />;
    }
  };

  return (
    <section id="contact" className="py-16 xl:pl-36 2xl:pl-28" aria-label="Contact and Profile Information">
      <div className="container">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.h6 className="mb-1 inline-block font-bebas text-lg tracking-[1px] text-grey-400">
            Contacto
          </motion.h6>
          <motion.p className="mx-auto w-3xl font-inter leading-7 text-grey-50 max-lg:w-full">
            Estoy disponible para colaborar en
            <span className="mx-1 font-semibold text-primary-400">proyectos de producto</span>,
            <span className="mx-1 font-semibold text-primary-400">plataforma</span> y desarrollo
            full stack.
          </motion.p>
        </motion.div>

        <div className="mx-auto w-4xl max-w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="flex max-lg:flex-col">
            <ProfileCard currentTime={currentTime} socialLinks={SOCIAL_LINKS} />
            <div className="w-full p-8 font-inter text-lg font-medium text-white">
              <TabNavigation tabs={TABS} activeView={activeView} onTabChange={handleTabChange} />
              <div className="min-h-[200px]">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
