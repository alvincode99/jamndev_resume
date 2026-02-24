"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { useMemo, useRef } from "react";

import clientsJson from "@/data/stratos-clients.json";

type ClientItem = {
  name: string;
  website: string;
  logo: string;
  description: string;
};

const clients = clientsJson as ClientItem[];

/**
 * Renderiza la seccion "Clientes" con un carrusel horizontal y visual circular inspirado en Reeni.
 * @returns Seccion de clientes enlazados a sus sitios externos.
 * @remarks Error comun: si el logo no existe en `public/images/logos`, el slide mostrara la imagen rota.
 * @example
 * ```tsx
 * <StratosClientsSection />
 * ```
 */
export default function StratosClientsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const canShowControls = useMemo(() => clients.length > 1, []);

  const scrollTrack = (direction: "left" | "right") => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const amount = Math.max(track.clientWidth * 0.82, 320);

    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="clients" className="py-16 xl:pl-36 2xl:pl-28">
      <div className="container">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h4 className="font-bebas text-5xl text-grey-50 max-md:text-4xl">Clientes</h4>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-base leading-7 text-grey-400">
            Proyectos desarrollados para
            <span className="mx-1 font-semibold text-primary-400">clientes reales</span>
            con enfoque en entrega y calidad.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-3 md:p-4">
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-grey-400">
              <Sparkles size={16} className="text-primary-400" />
              <span className="font-mono text-xs tracking-wide">CLIENTES ACTIVOS</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack("left")}
                disabled={!canShowControls}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-grey-50 transition hover:border-primary-400/40 hover:text-primary-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Desplazar carrusel de clientes a la izquierda"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack("right")}
                disabled={!canShowControls}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-grey-50 transition hover:border-primary-400/40 hover:text-primary-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Desplazar carrusel de clientes a la derecha"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
            aria-label="Carrusel de clientes"
          >
            {clients.map((client, index) => (
              <motion.a
                key={`${client.name}-${index}`}
                href={client.website}
                target="_blank"
                rel="noreferrer noopener"
                className="group min-w-full snap-center rounded-3xl border border-white/10 bg-black/30 p-5 transition hover:border-primary-400/30 md:min-w-[780px] md:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="grid items-center gap-6 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-8">
                  <div className="relative mx-auto grid h-[270px] w-[270px] place-items-center sm:h-[310px] sm:w-[310px]">
                    <div className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(circle_at_center,rgba(124,255,178,0.08),rgba(0,0,0,0.04)_60%,rgba(0,0,0,0.2))]" />
                    <div className="absolute inset-[8%] rounded-full border border-white/10" />
                    <div className="absolute inset-[16%] rounded-full border border-primary-400/20 shadow-[0_0_35px_rgba(124,255,178,0.12)]" />
                    <div className="absolute inset-[24%] rounded-full border border-cyan-300/10" />

                    <div className="relative z-10 h-[44%] w-[44%] overflow-hidden rounded-full border border-primary-400/35 bg-white/95 shadow-[0_0_35px_rgba(124,255,178,0.12)] transition duration-300 group-hover:scale-[1.03] group-hover:border-primary-400/60">
                      <div className="absolute inset-[6%] rounded-full border border-white/70" />
                      <Image
                        src={client.logo}
                        alt={`Logo de ${client.name}`}
                        width={180}
                        height={180}
                        className="h-full w-full scale-110 object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-mono text-xs tracking-[0.2em] text-grey-400">
                        CLIENTE / SITIO
                      </p>
                      <h5 className="font-bebas text-5xl leading-[0.95] text-grey-50 max-md:text-4xl">
                        {client.name}
                      </h5>
                    </div>

                    <p className="max-w-2xl font-inter text-sm leading-7 text-grey-400 md:text-base">
                      {client.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1 font-mono text-xs text-primary-400">
                        Cliente real
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-grey-400">
                        Web / Vercel
                      </span>
                    </div>

                    <div className="pt-1">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-400/10 px-4 py-2 font-bebas text-lg tracking-[0.08em] text-primary-400 transition group-hover:border-primary-400/50 group-hover:bg-primary-400/15">
                        Ver sitio
                        <ExternalLink size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
