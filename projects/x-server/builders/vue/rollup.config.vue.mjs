import nodeResolve from "@rollup/plugin-node-resolve";
// import typescript2 from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"];

const version = process.env.VERSION;
const dir = `versions/${version}`;

/**
 * @type { import("rollup").RollupOptions }
 */
const config = {
  input: `${dir}/index.source.vue`,
  output: [
    {
      dir,
      entryFileNames: "index.system.js",
      format: "systemjs",
      sourcemap: true
    },
    {
      dir,
      entryFileNames: "index.esm.js",
      format: "es",
      sourcemap: true
    }
  ],
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
      presets: ["@babel/preset-typescript", "@vue/babel-preset-jsx"],
      plugins: ["@vue/babel-plugin-jsx"],
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions
    })
    // terser()
  ],
  onwarn: function (msg, warn) {
    // if (msg.code === "THIS_IS_UNDEFINED") {
    //   return;
    // }
    if (!/Circular/.test(msg)) {
      warn(msg);
    }
  }
};
export default config;
