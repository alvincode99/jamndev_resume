import { compare } from "bcryptjs";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { z } from "zod";

import { prisma } from "@/lib/db";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const authSecret = process.env.NEXTAUTH_SECRET;

/**
 * Configuracion principal de NextAuth para sesion JWT y login por credenciales.
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  ...(authSecret ? { secret: authSecret } : {}),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsed.data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(
          parsed.data.password,
          user.passwordHash,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

/**
 * Obtiene la sesion actual del servidor usando la configuracion central de auth.
 * @returns Sesion autenticada o `null` si no existe.
 */
export function getServerAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

/**
 * Verifica que exista una sesion autenticada con rol de administrador.
 * @returns Sesion valida de admin o `null` si no cumple permisos.
 */
export async function requireAdminSession(): Promise<Session | null> {
  const session = await getServerAuthSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return session;
}
