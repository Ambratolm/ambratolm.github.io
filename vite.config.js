import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/assets/data", import.meta.url)),
      "@images": fileURLToPath(new URL("./src/assets/images", import.meta.url)),
      "@videos": fileURLToPath(new URL("./src/assets/videos", import.meta.url)),
      path: "path-browserify",
    },
  },
});
