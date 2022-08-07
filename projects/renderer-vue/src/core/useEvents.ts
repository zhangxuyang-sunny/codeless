import type { EventType, Handler } from "mitt";
import { useGlobalProperties } from "./useGlobalProperties";

/**
 * 事件中心 hook
 * doc: https://www.npmjs.com/package/mitt
 * 代理了 on 和 emit 方法，自动注入当前组件的 key -> `${key}:${event}`
 * 也保留了 Symbol 和 *
 */
export default function useEvents() {
  const globalProperties = useGlobalProperties();
  if (!globalProperties) {
    throw new Error("[useEvents] globalProperties has not be provide ");
  }
  const key = globalProperties.$utils.getKey();
  const warn = () => {
    console.warn("[useEvents]: key 为空", globalProperties.$utils.getInstance());
  };
  return {
    ...globalProperties.$events,
    // 代理 on 方法，拼接 eventName
    // eg: spinning -> Spin_0:spinning
    on: (event: EventType, handler: Handler<unknown>) => {
      if (!key) {
        warn();
        return;
      }
      if (typeof event === "symbol") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        globalProperties.$events.on(event, handler);
      } else {
        globalProperties.$events.on(`${key}:${event}`, handler);
      }
    },
    emit: (event: EventType, ...args: unknown[]) => {
      if (!key) {
        warn();
        return;
      }
      if (typeof event === "symbol") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        globalProperties.$events.emit(event, args);
      } else {
        globalProperties.$events.emit(`${key}:${event}`, args);
      }
    }
  };
}
