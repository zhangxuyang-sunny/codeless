export function isType(
  data: unknown,
  type: "Object" | "Array" | "Set" | "Map" | "Function" | "WeakMap" | "WeakSet"
) {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

export function isObject(data: unknown): boolean {
  return isType(data, "Object");
}
