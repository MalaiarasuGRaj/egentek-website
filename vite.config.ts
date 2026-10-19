import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// Static single-page build: no server runtime is needed, so the output in
// dist/client can be hosted on any static host (Vercel is configured in vercel.json).
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      spa: { enabled: true },
    }),
    react(),
    tailwindcss(),
  ],
});
