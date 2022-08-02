/**
 * 随机字符串，最多11位
 * @param len
 * @returns
 */
export function getRandomStr(len: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][number] = 11): string {
  return Math.random()
    .toString(36)
    .slice(2, len + 2);
}
