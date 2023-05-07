import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  platform: "node",
  outDir: "lib",
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  shims: true,
});
