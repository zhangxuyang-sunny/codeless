import path from "path";
import { rollup, InputOptions, OutputOptions } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
// import typescript2 from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const inputOptions: InputOptions = {
  input: "",
  // input: "src/index.ts",
  external: ["vue", "vue-router", "pinia", "fsevents"],
  treeshake: "smallest",
  plugins: [
    json(),
    vue({ preprocessStyles: true }),
    nodeResolve({
      extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
      preferBuiltins: true
      // modulesOnly: true
    }),
    commonjs(),
    // typescript2(),
    babel({
      presets: [require("@babel/preset-typescript"), require("@vue/babel-preset-jsx")],
      plugins: [require("@vue/babel-plugin-jsx")],
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
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
    format: "systemjs"
  },
  {
    dir: "lib",
    entryFileNames: "index.esm.js",
    format: "es"
  }
];

export async function bootstrap(root: string) {
  console.time("take times");
  const builder = await rollup({
    ...inputOptions,
    input: path.resolve(root, "014507f416c7c3e9aed915a91cd44266.vue")
  });
  const queue = outputOptions.map((output) => {
    const dir = path.resolve(root, "lib");
    return builder.write({ ...output, dir });
  });
  await Promise.all(queue);
  console.timeEnd("take times");
}
