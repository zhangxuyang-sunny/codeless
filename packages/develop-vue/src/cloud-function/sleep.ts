/**
 * 睡眠延迟函数
 * @param time 延迟时间
 * @returns Promise<void>
 */
export default function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
