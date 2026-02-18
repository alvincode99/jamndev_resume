import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebas = Space_Grotesk({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const caveat = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/**
 * Metadatos base del proyecto.
 */
export const metadata: Metadata = {
  title: "Jamndev Resume",
  description: "Base visual de Stratos aplicada en jamndev_resume.",
};

/**
 * Layout raiz del App Router con las fuentes de Stratos.
 * @param props Hijos renderizados por las rutas de la aplicacion.
 * @returns Estructura HTML global con estilos tipograficos base.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${bebas.variable} ${caveat.variable} overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
