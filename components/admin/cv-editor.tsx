"use client";

import { type FormEvent, useMemo, useState } from "react";

import { arrayToCommaSeparated, commaSeparatedToArray } from "@/lib/format";
import type { CvProfileDto } from "@/server/repositories/cv.repository";

interface CvEditorProps {
  profile: CvProfileDto | null;
}

interface CvFormState {
  fullName: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  skills: string;
  experiencesJson: string;
}

/**
 * Editor de secciones principales del CV para el panel admin.
 * @param props Perfil actual cargado desde base de datos.
 * @returns Formulario de actualizaciÃ³n de informaciÃ³n general.
 */
export function CvEditor({ profile }: CvEditorProps) {
  const initialState = useMemo<CvFormState>(() => {
    return {
      fullName: profile?.fullName ?? "",
      title: profile?.title ?? "",
      summary: profile?.summary ?? "",
      location: profile?.location ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
      website: profile?.website ?? "",
      linkedin: profile?.linkedin ?? "",
      github: profile?.github ?? "",
      skills: arrayToCommaSeparated(profile?.skills ?? []),
      experiencesJson: JSON.stringify(profile?.experiences ?? [], null, 2),
    };
  }, [profile]);

  const [form, setForm] = useState<CvFormState>(initialState);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Guardando...");

    let experiences: unknown;

    try {
      experiences = JSON.parse(form.experiencesJson);
    } catch {
      setStatus("El JSON de experiencias no es vÃ¡lido");
      return;
    }

    const response = await fetch("/api/cv", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        title: form.title,
        summary: form.summary,
        location: form.location,
        email: form.email,
        phone: form.phone,
        website: form.website || undefined,
        linkedin: form.linkedin || undefined,
        github: form.github || undefined,
        skills: commaSeparatedToArray(form.skills),
        experiences,
      }),
    });

    const json = (await response.json()) as {
      status: "success" | "error";
      message: string;
    };

    setStatus(json.message);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4"
    >
      <h2 className="text-xl font-semibold text-slate-100">InformaciÃ³n principal del CV</h2>

      <input className="admin-input" required placeholder="Nombre completo" value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
      <input className="admin-input" required placeholder="TÃ­tulo profesional" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
      <textarea className="admin-input min-h-24" required placeholder="Resumen" value={form.summary} onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} />
      <input className="admin-input" required placeholder="UbicaciÃ³n" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
      <input className="admin-input" required placeholder="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
      <input className="admin-input" required placeholder="TelÃ©fono" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
      <input className="admin-input" placeholder="Website" value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
      <input className="admin-input" placeholder="LinkedIn" value={form.linkedin} onChange={(event) => setForm((current) => ({ ...current, linkedin: event.target.value }))} />
      <input className="admin-input" placeholder="GitHub" value={form.github} onChange={(event) => setForm((current) => ({ ...current, github: event.target.value }))} />
      <input className="admin-input" required placeholder="Skills (coma separada)" value={form.skills} onChange={(event) => setForm((current) => ({ ...current, skills: event.target.value }))} />
      <textarea className="admin-input min-h-48 font-mono text-xs" required placeholder="Experiencias en JSON" value={form.experiencesJson} onChange={(event) => setForm((current) => ({ ...current, experiencesJson: event.target.value }))} />

      <button type="submit" className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
        Guardar CV
      </button>

      {status ? <p className="text-sm text-slate-300">{status}</p> : null}
    </form>
  );
}
