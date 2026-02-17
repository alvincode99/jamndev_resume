import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * ConfiguraciÃ³n de Vitest para pruebas unitarias de UI y backend.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
