"use client";

import { type FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  callbackUrl?: string;
}

/**
 * Formulario de autenticaciÃ³n por credenciales usando NextAuth.
 * @param props URL de retorno tras login exitoso.
 * @returns Formulario cliente con manejo bÃ¡sico de errores.
 */
export function LoginForm({ callbackUrl = "/admin" }: LoginFormProps) {
  const [email, setEmail] = useState("admin@jamndev.dev");
  const [password, setPassword] = useState("Admin123*");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (!response || response.error) {
      setError("Credenciales invÃ¡lidas");
      setLoading(false);
      return;
    }

    window.location.href = response.url ?? callbackUrl;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
      <h1 className="text-2xl font-semibold text-slate-100">Acceso Admin</h1>
      <input
        required
        type="email"
        className="admin-input"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        required
        type="password"
        className="admin-input"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
