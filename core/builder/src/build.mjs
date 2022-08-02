// /* eslint-disable @typescript-eslint/no-var-requires */
import { execa } from "execa";
import ChildProcess from "child_process";
import path from "path";



async function build(options) {
  const { version, cwd } = options;
  console.log(options);
  await execa(
    path.resolve("node_modules/rollup/dist/bin/rollup"),
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
}

build({
  cwd: "/Users/zhangxuyang/mine/javascript/awesome-lowcode/x-lowcode/projects/x-server/static/materials/863388fb5365021916fefd69b161eea2",
  version: "1654275759243"
});

