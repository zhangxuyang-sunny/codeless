/**
 * if else 函数
 * @param test if 判断表达式，可以是调用方法
 * @param consequent if 语句块
 * @param alternate else 语句块
 */
export default async function (
  test: unknown,
  consequent: unknown[],
  alternate: unknown[]
) {
  if (typeof test === "function" ? await test() : test) {
    for (const item of Array.isArray(consequent) ? consequent : [consequent]) {
      if (typeof item === "function") {
        await item();
      }
    }
  } else {
    for (const item of Array.isArray(alternate) ? alternate : [alternate]) {
      if (typeof item === "function") {
        await item();
      }
    }
  }
}
