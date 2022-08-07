import path from "path";
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: path.resolve(__dirname, "src/index.ts"),
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json")
    })
  ],
  output: {
    file: path.resolve(__dirname, "dist/index.js")
  }
});
