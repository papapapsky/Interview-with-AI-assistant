// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vitest/config";

const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
};

export default defineConfig(config);
