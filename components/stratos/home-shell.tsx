"use client";

import { useCallback, useState } from "react";

import StratosContactSection from "@/components/stratos/contact-section";
import StratosHeader from "@/components/stratos/header";
import StratosMobileNavigation from "@/components/stratos/mobile-navigation";
import StratosMyJourney from "@/components/stratos/my-journey";
import StratosNavigation from "@/components/stratos/navigation";
import StratosProfilePanel from "@/components/stratos/profile-panel";
import StratosProjectsSkills from "@/components/stratos/projects-skills";
import StratosWhatIHaveDone from "@/components/stratos/what-i-have-done";

/**
 * Orquesta el home de Stratos y el panel lateral de perfil.
 * @returns Estructura completa del inicio con navegacion, hero y offcanvas derecho.
 * @remarks Error comun: no envolver la navegacion con este shell evita que el icono de usuario abra el panel.
 * @example
 * ```tsx
 * <StratosHomeShell />
 * ```
 */
export default function StratosHomeShell() {
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  const openProfilePanel = useCallback(() => {
    setIsProfilePanelOpen(true);
  }, []);

  const closeProfilePanel = useCallback(() => {
    setIsProfilePanelOpen(false);
  }, []);

  return (
    <div className="main-container relative m-0 overflow-hidden p-0">
      <StratosNavigation onOpenProfilePanel={openProfilePanel} />
      <StratosMobileNavigation onOpenProfilePanel={openProfilePanel} />
      <StratosProfilePanel isOpen={isProfilePanelOpen} onClose={closeProfilePanel} />
      <StratosHeader />

      <section id="my-skills" className="h-0" />
      <StratosWhatIHaveDone />
      <StratosMyJourney />
      <StratosProjectsSkills />
      <StratosContactSection />
    </div>
  );
}
