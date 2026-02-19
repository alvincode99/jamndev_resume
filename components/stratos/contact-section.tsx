"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  Clock,
  Eye,
  Flame,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPinHouse,
  ThumbsUp,
  Trophy,
  Twitter,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type SocialLink = {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
};

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  unlocked: boolean;
};

type Activity = {
  action: string;
  item: string;
  time: string;
  type: "code" | "project" | "design" | "achievement";
};

type Skill = {
  name: string;
  level: number;
  projects: number;
};

type Tab = {
  key: "profile" | "activity" | "achievements";
  label: string;
  icon: LucideIcon;
};

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: "#", ariaLabel: "GitHub" },
  { icon: Twitter, href: "#", ariaLabel: "Twitter" },
  { icon: Linkedin, href: "#", ariaLabel: "LinkedIn" },
  { icon: Mail, href: "mailto:jamndev@outlook.com", ariaLabel: "Email" },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Code Master",
    description: "1000+ commits this year",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    progress: 85,
    unlocked: true,
  },
  {
    id: 2,
    title: "Team Player",
    description: "Led 5 successful projects",
    icon: Users,
    color: "from-blue-400 to-purple-500",
    progress: 100,
    unlocked: true,
  },
  {
    id: 3,
    title: "Speed Demon",
    description: "Deploy 50 features in a month",
    icon: Flame,
    color: "from-orange-400 to-red-500",
    progress: 65,
    unlocked: false,
  },
];

const RECENT_ACTIVITY: Activity[] = [
  { action: "Published", item: "React Component Library", time: "2 hours ago", type: "code" },
  { action: "Completed", item: "E-commerce Dashboard", time: "1 day ago", type: "project" },
  { action: "Shared", item: "Design System Guidelines", time: "3 days ago", type: "design" },
  { action: "Won", item: "Hackathon First Place", time: "1 week ago", type: "achievement" },
];

const SKILLS: Skill[] = [
  { name: "React", level: 95, projects: 25 },
  { name: "TypeScript", level: 90, projects: 20 },
  { name: "Node.js", level: 80, projects: 18 },
  { name: "Java", level: 85, projects: 22 },
  { name: "Spring Boot", level: 78, projects: 16 },
];

const TABS: Tab[] = [
  { key: "profile", label: "Profile", icon: Eye },
  { key: "activity", label: "Activity", icon: Clock },
  { key: "achievements", label: "Awards", icon: Trophy },
];

const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const getActivityIcon = (type: Activity["type"]) => {
  const iconMap: Record<Activity["type"], LucideIcon> = {
    code: Globe,
    project: ThumbsUp,
    design: Eye,
    achievement: Trophy,
  };
  return iconMap[type];
};

const getActivityBgColor = (type: Activity["type"]): string => {
  const colorMap: Record<Activity["type"], string> = {
    code: "bg-green-500/20",
    project: "bg-blue-500/20",
    design: "bg-purple-500/20",
    achievement: "bg-yellow-500/20",
  };
  return colorMap[type];
};

const getActivityIconColor = (type: Activity["type"]): string => {
  const colorMap: Record<Activity["type"], string> = {
    code: "text-green-400",
    project: "text-blue-400",
    design: "text-purple-400",
    achievement: "text-yellow-400",
  };
  return colorMap[type];
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
                <div className="flex items-center gap-2">
                  <span className="text-xs text-grey-400">{skill.projects} projects</span>
                  <span className="text-xs text-grey-400">{skill.level}%</span>
                </div>
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
      <h4 className="mb-3 flex items-center gap-2 font-bebas text-white">Recent Activity</h4>
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
          const IconComponent = getActivityIcon(activity.type);
          return (
            <motion.div
              key={`${activity.type}-${index}`}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-all duration-300 hover:bg-white/10"
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
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityBgColor(activity.type)}`}>
                <IconComponent size={14} className={getActivityIconColor(activity.type)} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">
                  <span className="text-purple-300">{activity.action}</span> {activity.item}
                </div>
                <div className="text-xs text-grey-400">{activity.time}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="animate-fadeIn space-y-3">
      <h4 className="mb-3 flex items-center gap-2 font-bebas text-white">Achievements</h4>
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
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 ${achievement.unlocked ? "border-white/10 bg-white/5 hover:scale-105 hover:bg-white/10" : "border-slate-600/30 bg-grey-800/30 opacity-60"}`}
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
            <div className="mb-2 flex items-center gap-3">
              <div
                className={`rounded-lg bg-gradient-to-br p-2 ${achievement.color} ${achievement.unlocked ? "" : "grayscale"}`}
              >
                <achievement.icon size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{achievement.title}</div>
                <div className="text-xs text-grey-400">{achievement.description}</div>
              </div>
              {achievement.unlocked ? <Check size={16} className="text-green-400" /> : null}
            </div>
            {!achievement.unlocked ? (
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-grey-400">Progress</span>
                  <span className="text-xs text-grey-400">{achievement.progress}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className={`h-full bg-gradient-to-r transition-all duration-1000 ${achievement.color}`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            ) : null}
          </motion.div>
        ))}
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
          {socialLinks.map((link) => (
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
                className="text-grey-400 transition-colors duration-200 hover:text-white"
                aria-label={link.ariaLabel}
              >
                <link.icon size={20} strokeWidth={1} />
              </a>
            </motion.li>
          ))}
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
  const memoizedAchievements = useMemo(() => ACHIEVEMENTS, []);

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
        return <AchievementsSection achievements={memoizedAchievements} />;
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
            Estoy disponible para colaborar en proyectos de producto, plataforma y desarrollo full stack.
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
