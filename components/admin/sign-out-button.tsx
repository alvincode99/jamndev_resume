"use client";

import { signOut } from "next-auth/react";

/**
 * BotÃ³n para cerrar sesiÃ³n en el panel admin.
 * @returns AcciÃ³n de cierre de sesiÃ³n con redirecciÃ³n a `/login`.
 */
export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-emerald-400/50"
    >
      Cerrar sesiÃ³n
    </button>
  );
}
