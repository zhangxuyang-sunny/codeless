import path from "path";
import ChildProcess from "child_process";

const compilerDir = path.resolve(__dirname, "../../../packages/x-compiler");
const TS_NODE = path.resolve(__dirname, "../node_modules/ts-node/dist/bin.js");
const script = path.resolve(compilerDir, "scripts/build.ts");

export function buildVueComponent(
  entry: string,
  output: string,
  libraryTarget: "umd" | "system" | "module"
) {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(
      `${TS_NODE} ${script} ${entry} ${output} ${libraryTarget}`,
      { cwd: compilerDir },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        }
        console.log(stdout);
        resolve(stdout);
      }
    );
  });
}

export function buildVueModule(entry: string) {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(
      `../node_modules/ts-node/dist/bin.js ${entry}`,
      {},
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        }
        resolve(stdout);
      }
    );
  });
}
