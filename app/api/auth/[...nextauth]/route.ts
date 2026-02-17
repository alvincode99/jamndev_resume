import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

/**
 * Expone el endpoint GET de NextAuth para inicio de sesiÃ³n y callbacks OAuth.
 * @returns Respuesta manejada internamente por NextAuth.
 */
export { handler as GET };

/**
 * Expone el endpoint POST de NextAuth para flujos de autenticaciÃ³n.
 * @returns Respuesta manejada internamente por NextAuth.
 */
export { handler as POST };
