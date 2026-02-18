"use client";

import { type FormEvent, useState } from "react";

import { arrayToCommaSeparated, commaSeparatedToArray } from "@/lib/format";
import type { ExerciseDto } from "@/server/repositories/exercise.repository";

interface ExerciseManagerProps {
  initialExercises: ExerciseDto[];
}

interface ExerciseFormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  tags: string;
  links: string;
  demoUrl: string;
  repoUrl: string;
  date: string;
}

const emptyForm: ExerciseFormState = {
  title: "",
  slug: "",
  description: "",
  tags: "",
  links: "",
  demoUrl: "",
  repoUrl: "",
  date: new Date().toISOString().slice(0, 10),
};

/**
 * GestiÃ³n CRUD de ejercicios para el panel de administraciÃ³n.
 * @param props Datos iniciales de ejercicios.
 * @returns Interfaz para crear, editar y eliminar ejercicios.
 */
export function ExerciseManager({ initialExercises }: ExerciseManagerProps) {
  const [items, setItems] = useState<ExerciseDto[]>(initialExercises);
  const [form, setForm] = useState<ExerciseFormState>(emptyForm);
  const [status, setStatus] = useState<string>("");
  const isEditing = Boolean(form.id);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Guardando...");

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      tags: commaSeparatedToArray(form.tags),
      links: commaSeparatedToArray(form.links),
      demoUrl: form.demoUrl || undefined,
      repoUrl: form.repoUrl || undefined,
      date: new Date(form.date).toISOString(),
    };

    const response = await fetch(
      isEditing ? `/api/exercises/${form.id}` : "/api/exercises",
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const json = (await response.json()) as {
      status: "success" | "error";
      message: string;
      data?: ExerciseDto;
    };

    if (!response.ok || json.status === "error" || !json.data) {
      setStatus(json.message ?? "Error al guardar ejercicio");
      return;
    }

    const saved = json.data;

    setItems((current) => {
      if (isEditing) {
        return current.map((item) => (item.id === saved.id ? saved : item));
      }

      return [saved, ...current];
    });

    setForm(emptyForm);
    setStatus(isEditing ? "Ejercicio actualizado" : "Ejercicio creado");
  }

  async function handleDelete(id: string) {
    setStatus("Eliminando...");
    const response = await fetch(`/api/exercises/${id}`, { method: "DELETE" });

    if (!response.ok) {
      setStatus("No se pudo eliminar");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setStatus("Ejercicio eliminado");
  }

  function handleEdit(item: ExerciseDto) {
    setForm({
      id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.description,
      tags: arrayToCommaSeparated(item.tags),
      links: arrayToCommaSeparated(item.links),
      demoUrl: item.demoUrl ?? "",
      repoUrl: item.repoUrl ?? "",
      date: item.date.slice(0, 10),
    });
    setStatus(`Editando: ${item.title}`);
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={submitForm}
        className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4"
      >
        <h2 className="text-xl font-semibold text-slate-100">
          {isEditing ? "Editar ejercicio" : "Nuevo ejercicio"}
        </h2>

        <input
          required
          placeholder="TÃ­tulo"
          className="admin-input"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
        />
        <input
          required
          placeholder="Slug"
          className="admin-input"
          value={form.slug}
          onChange={(event) =>
            setForm((current) => ({ ...current, slug: event.target.value }))
          }
        />
        <textarea
          required
          placeholder="DescripciÃ³n"
          className="admin-input min-h-24"
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
        />
        <input
          required
          placeholder="Tags (coma separada)"
          className="admin-input"
          value={form.tags}
          onChange={(event) =>
            setForm((current) => ({ ...current, tags: event.target.value }))
          }
        />
        <input
          placeholder="Links (coma separada)"
          className="admin-input"
          value={form.links}
          onChange={(event) =>
            setForm((current) => ({ ...current, links: event.target.value }))
          }
        />
        <input
          placeholder="Demo URL"
          className="admin-input"
          value={form.demoUrl}
          onChange={(event) =>
            setForm((current) => ({ ...current, demoUrl: event.target.value }))
          }
        />
        <input
          placeholder="Repo URL"
          className="admin-input"
          value={form.repoUrl}
          onChange={(event) =>
            setForm((current) => ({ ...current, repoUrl: event.target.value }))
          }
        />
        <input
          required
          type="date"
          className="admin-input"
          value={form.date}
          onChange={(event) =>
            setForm((current) => ({ ...current, date: event.target.value }))
          }
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </button>
          {isEditing ? (
            <button
              type="button"
              className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200"
              onClick={() => setForm(emptyForm)}
            >
              Cancelar ediciÃ³n
            </button>
          ) : null}
        </div>

        {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.slug}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-200"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="rounded-md border border-red-700 px-3 py-1 text-xs text-red-300"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
