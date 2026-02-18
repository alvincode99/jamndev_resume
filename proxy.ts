import { withAuth } from "next-auth/middleware";

/**
 * Proxy que protege rutas de administracion, exigiendo sesion con rol ADMIN.
 */
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "ADMIN",
  },
  pages: {
    signIn: "/login",
  },
});

/**
 * Configuracion del matcher para aplicar proteccion solo al panel admin.
 */
export const config = {
  matcher: ["/admin/:path*"],
};
