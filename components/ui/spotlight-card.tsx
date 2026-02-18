"use client";

import { type PropsWithChildren, useRef, useState } from "react";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

/**
 * Tarjeta interactiva con efecto spotlight tomada y adaptada desde `stratos-template`.
 * @param props Props visuales y contenido interno.
 * @returns Tarjeta con gradiente radial que sigue el cursor.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(52, 211, 153, 0.25)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-6 transition-all hover:border-slate-600 ${className ?? ""}`}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setOpacity(0.9)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
