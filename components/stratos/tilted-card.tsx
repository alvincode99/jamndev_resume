"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type TiltedCardProps = {
  captionText?: string;
  containerHeight?: CSSProperties["height"];
  containerWidth?: CSSProperties["width"];
  imageHeight?: CSSProperties["height"];
  imageWidth?: CSSProperties["width"];
  rotateAmplitude?: number;
  imageSrc?: string;
  altText?: string;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  period?: string;
  degree?: string;
  field?: string;
};

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

/**
 * Tarjeta con efecto 3D inclinable usada en la seccion de experiencia.
 * @param props Configuracion visual y contenido de la tarjeta.
 * @returns Tarjeta interactiva con inclinacion segun posicion del mouse.
 * @remarks Error comun: no enviar `imageSrc` deja la tarjeta sin logo principal.
 * @example
 * ```tsx
 * <StratosTiltedCard imageSrc="/images/logos/edu-01.png" captionText="Universidad" />
 * ```
 */
export default function StratosTiltedCard({
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  imageSrc = "",
  altText = "",
  period = "",
  degree = "",
  field = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  const handleMouse = (event: MouseEvent<HTMLElement>) => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  };

  const handleMouseEnter = () => {
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  };

  return (
    <figure
      ref={ref}
      className="relative mx-auto flex h-full w-full flex-col items-center justify-center [perspective:800px]"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning ? (
        <div className="absolute top-4 block text-center text-sm sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      ) : null}

      <motion.div
        className="custom-spotlight-card group relative flex items-center justify-center overflow-hidden rounded-xl border border-grey-700 bg-grey-800-opacity-50 p-4 text-grey-400 transition-all hover:text-white lg:p-8 [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
        }}
      >
        {displayOverlayContent && overlayContent ? (
          <motion.div className="absolute left-0 top-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        ) : null}

        <div className="mt-6 flex flex-col items-center text-center">
          <Image
            src={imageSrc}
            alt={altText}
            width={150}
            height={150}
            className="mx-auto mt-4 h-[120px] w-[150px] flex-shrink-0 object-contain object-center grayscale transition-[filter] will-change-[filter] group-hover:grayscale-0"
          />
          <div className="flex flex-col items-center">
            <span className="mb-2">
              {field} - {degree}
            </span>
            <span>{period}</span>
          </div>
        </div>
      </motion.div>

      {showTooltip ? (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 z-[3] hidden rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      ) : null}
    </figure>
  );
}
