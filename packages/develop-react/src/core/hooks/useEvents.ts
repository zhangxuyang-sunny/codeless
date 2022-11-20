import type { EventEmitter2, event as Event, eventNS as EventNS } from "eventemitter2";
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
      return events.flatMap(event => handleEvents(event) || []);
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
      const [event, ...surplusArgs] = args;
      const e = handleEvents(event);
      if (e) return handler(e, ...surplusArgs);
    }
    return $events;
  };
  return Object.assign<Record<string, never>, EventEmitter2, ExtendsMethods>({}, $events, {
    onSelf: (...args: Parameters<EventEmitter2["on"]>) => {
      return eventHandler($events.on.bind($events), ...args);
    },
    emitSelf: (...args: Parameters<EventEmitter2["emit"]>) => {
      return eventHandler($events.emit.bind($events), ...args);
    }
  });
}

export { useEvents };
