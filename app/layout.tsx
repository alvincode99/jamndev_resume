import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getServerAuthSession } from "@/lib/auth";

import "./globals.css";

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

/**
 * Metadatos base SEO del proyecto jamndev_resume.
 */
export const metadata: Metadata = {
  title: "Jamndev Resume",
  description:
    "CV interactivo con proyectos, ejercicios y panel admin construido con Next.js, Prisma y NextAuth.",
  openGraph: {
    title: "Jamndev Resume",
    description:
      "CV interactivo con experiencia, proyectos y ejercicios tÃ©cnicos.",
    type: "website",
  },
};

/**
 * Layout raÃ­z del sitio, compartido por pÃ¡ginas pÃºblicas y admin.
 * @param props Hijos renderizados por el App Router.
 * @returns Estructura HTML global con navegaciÃ³n, contenido y footer.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="es">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-app text-slate-100 antialiased`}>
        <div className="bg-decor" aria-hidden>
          <div className="bg-decor-blob bg-decor-blob-1" />
          <div className="bg-decor-blob bg-decor-blob-2" />
          <div className="bg-decor-pattern" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader isAdmin={session?.user?.role === "ADMIN"} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
