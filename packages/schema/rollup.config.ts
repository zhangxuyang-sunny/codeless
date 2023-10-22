import typescript from "@rollup/plugin-typescript";
import path from "path";
import { defineConfig } from "rollup";

export default defineConfig({
  input: path.resolve(__dirname, "src/index.ts"),
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      rootDir: "src"
    })
  ],
  output: [
    {
      file: path.resolve(__dirname, "dist/index.cjs"),
      format: "cjs"
    },
    {
      file: path.resolve(__dirname, "dist/index.mjs"),
      format: "esm"
    }
  ]
});
