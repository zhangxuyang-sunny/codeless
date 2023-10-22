export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

export function randomString() {
  return Math.random().toString(36).slice(-6);
}
