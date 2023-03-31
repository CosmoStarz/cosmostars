import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import * as path from "path";
import { defineConfig } from "vite";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    global: {},
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
