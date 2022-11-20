import type {
  EventEmitter2,
  event as Event,
  eventNS as EventNS
} from "eventemitter2";
import { ExtendsMethods, useGlobalProperties } from "./useGlobalProperties";

type Events = Event | EventNS;

/**
 * 事件中心 hook
 * 代理了 emitter 部分方法，自动注入当前组件的 key -> `${key}:${event}`
 */
export default function useEvents(): EventEmitter2 & ExtendsMethods {
  const globalProperties = useGlobalProperties();
  if (!globalProperties) {
    throw new Error("[useEvents] globalProperties has not be provide.");
  }
  const { $events, $utils } = globalProperties;
  const key = $utils.getComponentId();
  const handleEvents = (events: Events): Events | null => {
    if (Array.isArray(events)) {
      return events.flatMap((event) => handleEvents(event) || []);
    }
    switch (typeof events) {
      case "string": {
        return `${key}:${events}`;
      }
      case "symbol": {
        return events;
      }
      default: {
        return null;
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventHandler = <T extends (events: Events, ...args: any[]) => any>(
    handler: T,
    ...args: Parameters<T>
  ) => {
    if (!key) {
      console.warn("[useEvents]: Component id is empty.", $utils.getInstance());
    } else {
      const [event, ...surplus] = args;
      const e = handleEvents(event);
      if (e) return handler(e, ...surplus);
    }
    return $events;
  };
  return Object.assign<Record<string, never>, EventEmitter2, ExtendsMethods>(
    {},
    $events,
    {
      // 监听发给自身的事件，而无需获取自身 id
      // 例如其他组件发送：component_id:loading，当前组件只需要监听 loading 事件即可
      onSelf: (...args: Parameters<EventEmitter2["on"]>) => {
        return eventHandler($events.on.bind($events), ...args);
      },
      // onSelf 的补充，让组件自身可以调用自身事件，以便于复用自身事件的监听而无需重构代码
      // 例如自身监听了一个 loading 事件，执行逻辑在当前监听的回调函数中，使用 emitSelf 即可无需抽离逻辑代码
      emitSelf: (...args: Parameters<EventEmitter2["emit"]>) => {
        return eventHandler($events.emit.bind($events), ...args);
      }
    }
  );
}

export { useEvents };
