import path from "path";
import { rollup, InputOptions, OutputOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
// import typescript2 from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"];

const inputOptions: InputOptions = {
  input: "",
  // input: "src/index.ts",
  external: ["vue", "vue-router", "pinia", "fsevents"],
  treeshake: "smallest",
  plugins: [
    json(),
    vue({ preprocessStyles: true }),
    nodeResolve({
      extensions,
      preferBuiltins: true
      // modulesOnly: true
    }),
    commonjs(),
    // typescript2(),
    babel({
      presets: [
        require("@babel/preset-typescript"),
        require("@vue/babel-preset-jsx")
      ],
      plugins: [require("@vue/babel-plugin-jsx")],
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions
    })
    // terser()
  ],
  onwarn: function (warning) {
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }
    console.error(warning.message);
  }
};

const outputOptions: OutputOptions[] = [
  {
    dir: "lib",
    entryFileNames: "index.system.js",
    format: "systemjs",
    sourcemap: true
  },
  {
    dir: "lib",
    entryFileNames: "index.esm.js",
    format: "es",
    sourcemap: true
  }
];

export async function bootstrap(entry: string) {
  console.time("take times");
  const builder = await rollup({
    ...inputOptions,
    input: entry
  });
  const queue = outputOptions.map((output) => {
    const dir = path.dirname(entry);
    return builder.write({ ...output, dir });
  });
  await Promise.all(queue);
  console.timeEnd("take times");
}
