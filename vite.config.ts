import { defineConfig } from "vite";

// On GitHub Pages a project site is served from /<repo>/, so we let the
// CI workflow inject BASE_PATH. Locally and on root-style hosts it stays "/".
const base = process.env["BASE_PATH"] ?? "/";

export default defineConfig({
  base,
  root: ".",
  server: {
    port: 3737,
    strictPort: true,
    open: "/",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
