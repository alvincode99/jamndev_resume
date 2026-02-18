"use client";

import { useEffect, useMemo, useState } from "react";

interface RoleTyperProps {
  roles: string[];
  className?: string;
}

/**
 * Renderiza texto dinamico con efecto de tipeo letra por letra.
 * @param props Lista de roles y clase opcional para estilos.
 * @returns Texto rotativo con cursor y animacion de escritura/borrado.
 */
export default function RoleTyper({ roles, className }: RoleTyperProps) {
  const safeRoles = useMemo(
    () => (roles.length ? roles : ["Full - Stack DEV."]),
    [roles],
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = safeRoles[roleIndex] ?? safeRoles[0];

    if (!currentRole) {
      return;
    }

    const typingSpeed = isDeleting ? 92 : 165;
    const holdOnFullText = 1400;
    const holdOnEmpty = 320;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (visibleText === currentRole) {
            setIsDeleting(true);
            return;
          }

          setVisibleText(currentRole.slice(0, visibleText.length + 1));
          return;
        }

        if (visibleText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % safeRoles.length);
          return;
        }

        setVisibleText(currentRole.slice(0, visibleText.length - 1));
      },
      !isDeleting && visibleText === currentRole
        ? holdOnFullText
        : isDeleting && visibleText.length === 0
          ? holdOnEmpty
          : typingSpeed,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDeleting, roleIndex, safeRoles, visibleText]);

  return (
    <span
      className={`inline-flex min-h-[1.1em] items-center whitespace-nowrap ${className ?? ""}`}
    >
      <span>{visibleText}</span>
      <span className="ml-1 animate-pulse" aria-hidden>
        |
      </span>
    </span>
  );
}
