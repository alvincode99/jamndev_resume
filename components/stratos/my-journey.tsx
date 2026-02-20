"use client";

import Image from "next/image";
import { Trophy, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  educationJourneyData,
  type ProfessionalJourney,
  professionalJourneyData,
} from "@/components/stratos/journey-data";
import StratosTiltedCard from "@/components/stratos/tilted-card";

const INLINE_CARD_LIMIT = 3;
const MINI_CARD_WIDTH_CLASS = "w-full max-w-[290px]";

/**
 * Seccion "Mi experiencia" basada en el bloque "My Journey" de Stratos.
 * @returns Vista con tarjetas academicas y linea de tiempo profesional interactiva.
 * @remarks Error comun: si faltan logos en `public/images/logos`, las tarjetas se renderizan sin imagen.
 * @example
 * ```tsx
 * <StratosMyJourney />
 * ```
 */
export default function StratosMyJourney() {
  return (
    <section id="my-journey" className="py-16 xl:pl-36 2xl:pl-28">
      <div className="container">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="background-primary relative flex h-16 w-16 items-center justify-center rounded-lg border border-grey-300 text-grey-50"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            <Trophy size={48} strokeWidth={0.5} />
          </motion.div>
          <motion.h4
            className="mt-10 mb-4 font-bebas text-5xl text-grey-400"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            Mi experiencia
          </motion.h4>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {educationJourneyData.map((item) => (
            <motion.div
              key={item.captionText}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              <StratosTiltedCard
                imageSrc={item.imageSrc}
                altText={item.altText}
                captionText={item.captionText}
                containerHeight="300px"
                containerWidth="300px"
                rotateAmplitude={12}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <p className="m-6 rounded-2xl bg-[#0006] px-[1em] py-[.5rem] text-sm font-semibold capitalize tracking-[-.5px] text-white">
                    {item.overlayContentText}
                  </p>
                }
                period={item.period}
                degree={item.degree}
                field={item.field}
              />
            </motion.div>
          ))}
        </motion.div>

        <JourneyTimeline />
      </div>
    </section>
  );
}

function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const extraCardsContainerRef = useRef<HTMLDivElement | null>(null);
  const miniCardsColumnRef = useRef<HTMLDivElement | null>(null);
  const [miniCardsHeight, setMiniCardsHeight] = useState<number>(0);

  const currentItem = professionalJourneyData[activeIndex] ?? professionalJourneyData[0];
  const primaryCards = professionalJourneyData.slice(0, INLINE_CARD_LIMIT);
  const extraCards = professionalJourneyData.slice(INLINE_CARD_LIMIT);

  useEffect(() => {
    const column = miniCardsColumnRef.current;

    if (!column || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateHeight = () => {
      setMiniCardsHeight(column.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(column);

    return () => {
      observer.disconnect();
    };
  }, [primaryCards.length]);

  if (!currentItem) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden px-4 pb-4 pt-20"
      style={
        {
          "--journey-mini-cards-height": miniCardsHeight ? `${miniCardsHeight}px` : "auto",
        } as React.CSSProperties
      }
    >
      <div className="relative z-10 space-y-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-12">
          <div className="order-2 space-y-4 xl:order-1 xl:col-span-1 xl:space-y-6">
            <motion.div
              ref={miniCardsColumnRef}
              className="grid grid-cols-1 gap-4 xl:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {primaryCards.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`mx-auto ${MINI_CARD_WIDTH_CLASS} transition-all duration-500 ${index === activeIndex ? "scale-105" : "hover:scale-[1.02]"}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    },
                  }}
                >
                  <JourneyMiniCard
                    item={item}
                    isActive={index === activeIndex}
                    onSelect={() => setActiveIndex(index)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="order-1 xl:order-2 xl:col-span-2">
            <div className="no-scrollbar rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl lg:p-8 xl:h-[var(--journey-mini-cards-height)] xl:overflow-y-auto">
              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="background-primary relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-primary-400/35 bg-white/10 p-1 text-grey-50 lg:h-20 lg:w-20">
                  <div className="h-full w-full overflow-hidden rounded-xl border border-white/35 bg-white shadow-inner">
                    <Image
                      src={currentItem.logo}
                      alt={currentItem.company}
                      width={100}
                      height={100}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-xl font-bold text-white lg:text-2xl">{currentItem.title}</h4>
                  <p className={`text-base font-semibold lg:text-lg ${currentItem.textColor}`}>
                    {currentItem.company}
                  </p>
                  <p className="text-sm text-gray-400">{currentItem.date}</p>
                </div>
              </div>

              <p className="mb-6 text-base leading-relaxed text-gray-300 lg:text-lg">
                {currentItem.description}
              </p>

              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                  <Trophy size={20} strokeWidth={1} /> Key Achievements
                </h4>
                <ul className="space-y-2">
                  {currentItem.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3 text-sm text-gray-300 lg:text-base">
                      <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${currentItem.bgColor}`} />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                  <Terminal size={20} strokeWidth={1} /> Technologies Used
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {currentItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 lg:px-3 lg:py-1.5 ${currentItem.bgColor} ${currentItem.textColor} ${currentItem.borderColor}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {extraCards.length > 0 ? (
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl lg:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-bebas text-3xl text-grey-50 lg:text-4xl">Mas experiencias</h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-grey-400 transition hover:bg-white/10 hover:text-white"
                  onClick={() => extraCardsContainerRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                  aria-label="Desplazar experiencias a la izquierda"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-grey-400 transition hover:bg-white/10 hover:text-white"
                  onClick={() => extraCardsContainerRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                  aria-label="Desplazar experiencias a la derecha"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={extraCardsContainerRef}
              className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
            >
              {extraCards.map((item, index) => {
                const mappedIndex = index + INLINE_CARD_LIMIT;

                return (
                  <motion.div
                    key={item.id}
                    className={`${MINI_CARD_WIDTH_CLASS} flex-shrink-0`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <JourneyMiniCard
                      item={item}
                      isActive={activeIndex === mappedIndex}
                      onSelect={() => setActiveIndex(mappedIndex)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function JourneyMiniCard({
  item,
  isActive,
  onSelect,
}: {
  item: ProfessionalJourney;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`min-h-[180px] w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-500 lg:p-6 ${isActive ? `${item.bgColor} ${item.borderColor} shadow-2xl` : "border-white/10 bg-white/5 hover:bg-white/10"}`}
    >
      <div className="flex items-start gap-3 lg:gap-4">
        <div className="background-primary relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-400/35 bg-white/10 p-1 text-grey-50 lg:h-14 lg:w-14">
          <div className="h-full w-full overflow-hidden rounded-xl border border-white/35 bg-white shadow-inner">
            <Image
              src={item.logo}
              alt={item.company}
              width={100}
              height={100}
              className="h-full w-full object-contain p-1"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span
              className={`w-fit rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wide lg:px-3 ${isActive ? `${item.textColor} ${item.bgColor}` : "text-gray-400"}`}
            >
              {item.category}
            </span>
            <span className="text-sm text-gray-400">{item.year}</span>
          </div>
          <h4
            className={`mb-1 text-base font-bold transition-colors duration-300 lg:text-lg ${isActive ? "text-white" : "text-gray-300"}`}
          >
            {item.title}
          </h4>
          <p className={`text-sm transition-colors duration-300 ${isActive ? item.textColor : "text-grey-400"}`}>
            {item.company} - {item.location}
          </p>
        </div>
      </div>
    </button>
  );
}
