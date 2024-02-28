import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://lucsmachado.github.io",
  integrations: [react(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: true,
    },
  },
});
