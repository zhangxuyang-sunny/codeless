// TODO: 返回值如何推导 value？ T extends Record<PropertyKey, infer R> ? [string | symbol, R] : never
// const a = toEntires({ [Symbol(0)]: "a", a: 1 });
type Obj<V> = { [x: PropertyKey]: V };
export default function toEntires<V, T extends Obj<V> = Obj<V>>(obj: T) {
  const entires = Reflect.ownKeys(obj).map<[string | symbol, V]>(key => [key, obj[key]]);
  return entires;
}
