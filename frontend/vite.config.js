import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import jsconfigPaths from "vite-jsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.js",
    coverage: {
      reporter: ['text', 'html'], // you can add 'lcov', 'json-summary' etc.
      all: true,
      include: ['tests/**/*.{ts,tsx,js,jsx}'], // or wherever your code lives
    }
  }
})