"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Orb from "@/components/stratos/orb-effect";
import RoleTyper from "@/components/stratos/role-typer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const fadeInUpSlow = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      duration: 0.9,
      ease: "easeOut" as const,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * Renderiza el hero principal tomado del template Stratos.
 * @returns Encabezado de pantalla completa con orb animado, nombre y foto.
 */
export default function StratosHeader() {
  return (
    <header id="about-me" className="flex h-screen flex-col items-center justify-center">
      <div className="absolute h-[800px] w-full">
        <Orb hoverIntensity={0.5} rotateOnHover hue={145} forceHoverState={false} />
      </div>
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="font-mono absolute left-[-21rem] top-[-9.5rem] rotate-[-14deg] text-[18px] text-[#9AA4B2] max-xl:hidden"
          variants={fadeInUp}
        >
          Haciendo que las cosas funcionen:
          <span className="font-mono block tracking-normal text-[#7CFFB2]">
            build → ship → repeat.
          </span>
        </motion.p>
        <h1 className="text-center font-bebas text-[7.4rem] leading-[0.92] text-[#F2F2F2] [letter-spacing:-0.02em] max-sm:text-[4.2rem] max-md:text-[6.2rem] max-lg:text-[6.8rem]">
          <div className="flex items-start justify-center">
            <motion.span variants={fadeInUp}>Alan</motion.span>
            <motion.div variants={fadeInRight}>
              <Image
                src="/images/geek.png"
                alt="Portrait of Alan Martínez"
                width={90}
                height={90}
                className="ml-4 mt-3 rounded-full border-2 border-[#2A2F3A] shadow-[0_0_20px_rgba(42,47,58,0.55)] max-sm:mt-2 max-sm:h-14 max-sm:w-14 max-md:mt-4 max-md:h-[72px] max-md:w-[72px] max-lg:mt-3"
              />
            </motion.div>
          </div>
          <motion.span className="block" variants={fadeInUpSlow}>
            Martínez
          </motion.span>
          <motion.span
            className="block pt-3 font-bebas text-[2.2rem] leading-none text-[#7CFFB2] [letter-spacing:0] max-sm:text-[1.25rem] max-md:text-[1.6rem] max-lg:text-[2rem]"
            variants={fadeInUpSlow}
          >
            <RoleTyper
              roles={[
                "Backend - DEV.",
                "Frontend - DEV.",
                "Full Stack - DEV.",
              ]}
              className="text-[#7CFFB2]"
            />
          </motion.span>
        </h1>
      </motion.div>
    </header>
  );
}
