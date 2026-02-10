import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split vendor chunks
            if (id.includes("three") || id.includes("@react-three")) {
              return "three";
            }
            if (id.includes("@mui")) {
              return "mui";
            }
            if (id.includes("react") && !id.includes("react-router")) {
              return "react-vendor";
            }
            if (id.includes("@tanstack")) {
              return "tanstack";
            }
            if (id.includes("framer-motion")) {
              return "framer";
            }
            // Default vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
});
