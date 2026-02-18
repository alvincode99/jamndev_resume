"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  X,
} from "lucide-react";

type StratosProfilePanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Muestra un panel lateral derecho inspirado en Reeni con informacion de perfil.
 * @param props Estado de visibilidad y callback de cierre del panel.
 * @returns Offcanvas derecho con overlay, imagen, texto y datos de contacto.
 * @remarks Errores comunes: no pasar `onClose` impide cerrar con boton, overlay o tecla Escape.
 * @example
 * ```tsx
 * <StratosProfilePanel isOpen={isProfilePanelOpen} onClose={() => setIsProfilePanelOpen(false)} />
 * ```
 */
export default function StratosProfilePanel({
  isOpen,
  onClose,
}: StratosProfilePanelProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[120] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Cerrar panel lateral"
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[410px] flex-col border-l border-white/10 bg-[#121416] shadow-[-20px_0_50px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-panel-title"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-black/25 px-6 py-4">
          <Image src="/images/logo.png" alt="Logo principal" width={84} height={31} />

          <button
            type="button"
            aria-label="Cerrar panel"
            onClick={onClose}
            className="rounded-full border border-white/20 p-2 text-white transition-colors duration-200 hover:border-[#7CFFB2] hover:text-[#7CFFB2]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-7">
          <Image
            src="/images/formal.png"
            alt="Retrato formal"
            width={340}
            height={196}
            className="mx-auto h-auto w-[48%] rounded-sm border border-white/10 object-cover"
          />

          <h3
            id="profile-panel-title"
            className="mt-7 font-bebas text-[2rem] leading-tight tracking-[-0.02em] text-[#F2F2F2]"
          >
            Desarrollador Full-Stack creando soluciones confiables.
          </h3>

          <p className="mt-4 font-inter text-[0.95rem] leading-7 text-[#9AA4B2]">
            Diseño y desarrollo productos de extremo a extremo: backend con Java/Spring Boot,
            C#/.NET, Node.js/NestJS y Python/Flask, y frontends modernos con React y Next.js
            (además de Angular cuando el proyecto lo requiere). Tengo experiencia construyendo e
            integrando soluciones para banca, seguros, telecomunicaciones y salud, cuidando
            requisitos críticos como seguridad, rendimiento, trazabilidad y disponibilidad. Trabajo
            con bases de datos SQL y NoSQL (PostgreSQL, Oracle, MySQL, MongoDB), autenticación, y
            consumo/integración de servicios REST y SOAP. Despliego en GCP/AWS usando Docker y
            Kubernetes, con prácticas de pruebas, observabilidad y CI/CD. Mi enfoque es entregar
            software que funcione en producción: mantenible, probado y listo para escalar.
          </p>

          <div className="mt-7 space-y-4">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#7CFFB2]">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="font-mono text-sm tracking-wide text-[#7CFFB2]">Whatsapp</p>
                <a
                  href="https://wa.me/525614085581"
                  target="_blank"
                  rel="noreferrer"
                  className="font-inter text-sm text-[#F2F2F2] transition-colors duration-200 hover:text-[#7CFFB2]"
                >
                  +525614085581
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#7CFFB2]">
                <Mail size={18} />
              </span>
              <div>
                <p className="font-mono text-sm tracking-wide text-[#7CFFB2]">MAil</p>
                <a
                  href="mailto:jamndev@outlook.com"
                  className="font-inter text-sm text-[#F2F2F2] transition-colors duration-200 hover:text-[#7CFFB2]"
                >
                  jamndev@outlook.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-mono text-sm tracking-wide text-[#9AA4B2]">buscame</p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                className="rounded-md border border-white/15 p-2 text-[#F2F2F2] transition-colors duration-200 hover:border-[#7CFFB2] hover:text-[#7CFFB2]"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="rounded-md border border-white/15 p-2 text-[#F2F2F2] transition-colors duration-200 hover:border-[#7CFFB2] hover:text-[#7CFFB2]"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="rounded-md border border-white/15 p-2 text-[#F2F2F2] transition-colors duration-200 hover:border-[#7CFFB2] hover:text-[#7CFFB2]"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="rounded-md border border-white/15 p-2 text-[#F2F2F2] transition-colors duration-200 hover:border-[#7CFFB2] hover:text-[#7CFFB2]"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
