interface TagBadgeProps {
  label: string;
}

/**
 * Renderiza una etiqueta visual simple para skills o tags de contenido.
 * @param props Propiedades de la etiqueta.
 * @returns `span` estilizado en formato badge.
 */
export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-200">
      {label}
    </span>
  );
}
