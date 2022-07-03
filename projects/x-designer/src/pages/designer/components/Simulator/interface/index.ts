export type SimulatorEventName = {
  [P in
    | `node:${keyof GlobalEventHandlersEventMap}`
    | `simulator:${keyof GlobalEventHandlersEventMap}`]?: (...arg: any[]) => void;
};
/**
 * simulator
 */
export interface Behavior {
  getEvents(): SimulatorEventName;
}
