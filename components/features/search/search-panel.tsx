"use client";

import { useEffect, useState } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";

interface SearchPanelProps {
  defaultType?: "all" | "exercises" | "projects";
}

interface SearchResultItem {
  id: string;
  title: string;
  slug?: string;
  tags: string[];
}

interface SearchApiResponse {
  status: "success";
  message: string;
  data: {
    exercises: SearchResultItem[];
    projects: SearchResultItem[];
  };
}

/**
 * UI de bÃºsqueda bÃ¡sica por texto y tags para proyectos/ejercicios.
 * @param props ConfiguraciÃ³n opcional del tipo inicial de bÃºsqueda.
 * @returns Panel interactivo de bÃºsqueda con resultados rÃ¡pidos.
 */
export function SearchPanel({ defaultType = "all" }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState<"all" | "exercises" | "projects">(defaultType);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchApiResponse["data"]>({
    exercises: [],
    projects: [],
  });

  const debouncedQuery = useDebouncedValue(query, 350);
  const debouncedTag = useDebouncedValue(tag, 350);

  useEffect(() => {
    const controller = new AbortController();

    async function runSearch() {
      setLoading(true);

      const params = new URLSearchParams({ type });

      if (debouncedQuery) {
        params.set("query", debouncedQuery);
      }

      if (debouncedTag) {
        params.set("tag", debouncedTag);
      }

      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const json = (await response.json()) as SearchApiResponse;
      setResults(json.data);
      setLoading(false);
    }

    runSearch().catch(() => {
      setLoading(false);
    });

    return () => controller.abort();
  }, [debouncedQuery, debouncedTag, type]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          aria-label="Buscar por texto"
          placeholder="Buscar por texto"
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <input
          aria-label="Filtrar por tag"
          placeholder="Filtrar por tag"
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
        <select
          aria-label="Tipo de bÃºsqueda"
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
          value={type}
          onChange={(event) =>
            setType(event.target.value as "all" | "exercises" | "projects")
          }
        >
          <option value="all">Todo</option>
          <option value="exercises">Ejercicios</option>
          <option value="projects">Proyectos</option>
        </select>
      </div>

      <div className="mt-4 text-sm text-slate-300">
        {loading ? "Buscando..." : null}
        {!loading ? (
          <p>
            Resultados: {results.exercises.length} ejercicios, {results.projects.length} proyectos.
          </p>
        ) : null}
      </div>
    </section>
  );
}
