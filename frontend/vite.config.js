import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  resolve: {
    alias: {
      // maps "@/..." -> <projectRoot>/src/...
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.js",
    coverage: {
      reporter: ["text", "html"],
      all: true,
      include: ["tests/**/*.{ts,tsx,js,jsx}"],
    },
    // make sure Vitest can resolve the same alias
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
