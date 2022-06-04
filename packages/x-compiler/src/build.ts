import { execa } from "execa";
// import ChildProcess from "child_process";

interface Options {
  version: string;
  cwd: string;
}

export async function build(options: Options) {
  const { version, cwd } = options;
  console.log(options);
  const a = await execa(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // require("node_modules/.bin/rollup"),
    "node_modules/rollup/dist/bin/rollup",
    // "rollup",
    [
      "-c",
      "rollup.config.vue.mjs",
      "--environment",
      [
        `VERSION:${version}` //
      ]
        .filter(Boolean)
        .join(",")
    ],
    { stdio: "inherit", cwd, shell: true }
  );
  console.log(a);
}
