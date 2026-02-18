import { type Prisma, type CvProfile } from "@prisma/client";

import { prisma } from "@/lib/db";

/**
 * Representa una experiencia laboral dentro del CV.
 */
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

/**
 * DTO principal para edición/lectura del perfil del CV.
 */
export interface CvProfileDto {
  id: string;
  fullName: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  skills: string[];
  experiences: ExperienceItem[];
}

function mapCvProfile(profile: CvProfile): CvProfileDto {
  return {
    id: profile.id,
    fullName: profile.fullName,
    title: profile.title,
    summary: profile.summary,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    website: profile.website,
    linkedin: profile.linkedin,
    github: profile.github,
    skills: Array.isArray(profile.skills)
      ? (profile.skills as unknown as string[])
      : [],
    experiences: Array.isArray(profile.experiences)
      ? (profile.experiences as unknown as ExperienceItem[])
      : [],
  };
}

/**
 * Obtiene el perfil de CV activo.
 * @returns Perfil principal o `null` cuando aún no existe.
 */
export async function getCvProfile(): Promise<CvProfileDto | null> {
  const profile = await prisma.cvProfile.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  return profile ? mapCvProfile(profile) : null;
}

/**
 * Crea o actualiza el perfil principal de CV.
 * @param payload Datos del perfil del CV a persistir.
 * @returns Perfil actualizado y normalizado.
 */
export async function upsertCvProfile(
  payload: Omit<CvProfileDto, "id">,
): Promise<CvProfileDto> {
  const current = await prisma.cvProfile.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  const data: Prisma.CvProfileUncheckedCreateInput = {
    fullName: payload.fullName,
    title: payload.title,
    summary: payload.summary,
    location: payload.location,
    email: payload.email,
    phone: payload.phone,
    website: payload.website ?? null,
    linkedin: payload.linkedin ?? null,
    github: payload.github ?? null,
    skills: payload.skills,
    experiences: payload.experiences as unknown as Prisma.InputJsonValue,
  };

  const profile = current
    ? await prisma.cvProfile.update({
        where: { id: current.id },
        data,
      })
    : await prisma.cvProfile.create({
        data,
      });

  return mapCvProfile(profile);
}
