import { Component } from "./component";
import { invokeExpression } from "./expression";

export async function parseProps(props: Component["props"]) {
  async function parseProp(prop: Component["props"][string]) {
    return await invokeExpression(prop);
  }
  const result: Record<string, unknown> = {};
  const queue: Promise<unknown>[] = [];
  for (const key in props) {
    const prop = props[key];
    queue.push(
      parseProp(prop).then(res => {
        result[key] = res;
      })
    );
  }
  await Promise.all(queue);
  return result;
}

export function parseStyle() {
  //
}

export function parseListeners() {
  function parseListener() {
    //
  }
}
