import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// Static single-page build: no server runtime is needed, so the output in
// dist/client can be hosted on any static host (Vercel is configured in vercel.json).
export default defineConfig(({ mode }) => {
  // Set VITE_SITE_URL (for example https://www.example.com) in the build environment.
  // It makes the social image links and the sitemap absolute.
  const siteUrl = loadEnv(mode, ".", "VITE_")["VITE_SITE_URL"];

  return {
    server: {
      port: 3000,
    },
    plugins: [
      tsConfigPaths(),
      tanstackStart({
        spa: {
          enabled: true,
          prerender: { outputPath: "index.html", crawlLinks: true, autoSubfolderIndex: true },
        },
        sitemap: siteUrl ? { enabled: true, host: siteUrl } : { enabled: false },
      }),
      react(),
      tailwindcss(),
    ],
  };
});
