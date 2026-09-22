import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/algorithms-visualizer-react/",
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: "client/dist"
  }
});