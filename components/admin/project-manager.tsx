"use client";

import { type FormEvent, useState } from "react";

import { arrayToCommaSeparated, commaSeparatedToArray } from "@/lib/format";
import type { ProjectDto } from "@/server/repositories/project.repository";

interface ProjectManagerProps {
  initialProjects: ProjectDto[];
}

interface ProjectFormState {
  id?: string;
  title: string;
  description: string;
  tags: string;
  stack: string;
  links: string;
  demoUrl: string;
  repoUrl: string;
  date: string;
}

const emptyForm: ProjectFormState = {
  title: "",
  description: "",
  tags: "",
  stack: "",
  links: "",
  demoUrl: "",
  repoUrl: "",
  date: new Date().toISOString().slice(0, 10),
};

/**
 * GestiÃ³n CRUD de proyectos desde el panel admin.
 * @param props Datos iniciales de proyectos.
 * @returns Formulario y listado editable de proyectos.
 */
export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [items, setItems] = useState<ProjectDto[]>(initialProjects);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [status, setStatus] = useState("");
  const isEditing = Boolean(form.id);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Guardando...");

    const payload = {
      title: form.title,
      description: form.description,
      tags: commaSeparatedToArray(form.tags),
      stack: commaSeparatedToArray(form.stack),
      links: commaSeparatedToArray(form.links),
      demoUrl: form.demoUrl || undefined,
      repoUrl: form.repoUrl || undefined,
      date: new Date(form.date).toISOString(),
    };

    const response = await fetch(
      isEditing ? `/api/projects/${form.id}` : "/api/projects",
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const json = (await response.json()) as {
      status: "success" | "error";
      message: string;
      data?: ProjectDto;
    };

    if (!response.ok || json.status === "error" || !json.data) {
      setStatus(json.message ?? "Error al guardar proyecto");
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
    setStatus(isEditing ? "Proyecto actualizado" : "Proyecto creado");
  }

  async function handleDelete(id: string) {
    setStatus("Eliminando...");
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });

    if (!response.ok) {
      setStatus("No se pudo eliminar");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setStatus("Proyecto eliminado");
  }

  function handleEdit(item: ProjectDto) {
    setForm({
      id: item.id,
      title: item.title,
      description: item.description,
      tags: arrayToCommaSeparated(item.tags),
      stack: arrayToCommaSeparated(item.stack),
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
          {isEditing ? "Editar proyecto" : "Nuevo proyecto"}
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
          required
          placeholder="Stack (coma separada)"
          className="admin-input"
          value={form.stack}
          onChange={(event) =>
            setForm((current) => ({ ...current, stack: event.target.value }))
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
                <p className="text-sm text-slate-400">{item.description}</p>
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
