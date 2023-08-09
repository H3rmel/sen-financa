/* eslint-disable no-undef */
import { defineConfig } from "vite";
import path from "path";

//* Plugins
import react from "@vitejs/plugin-react";
import postcss from "postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    postcss()
  ],
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
