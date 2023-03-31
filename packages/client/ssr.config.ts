import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import * as path from "path";
import { defineConfig } from "vite";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    format: "cjs",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "ssr.tsx"),
      name: "Client",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        dir: "ssr-dist",
      },
    },
    ssr: true,
  },
});
