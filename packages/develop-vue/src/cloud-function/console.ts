import type { Console } from "console";

/**
 * 控制台打印 log
 * @param args
 */
export default function (
  type: Exclude<keyof Console, "Console">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) {
  if (type in console) {
    console[type].call(console, ...args);
  }
}
