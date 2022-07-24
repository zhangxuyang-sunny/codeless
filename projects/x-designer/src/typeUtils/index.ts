// 提取promise中的resolve
export type ExtractPromiseResolve<T> = T extends Promise<infer R> ? R : never;
