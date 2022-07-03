import { Behavior, SimulatorEventName } from "../interface";

export default class HoverNode implements Behavior {
  getEvents(): SimulatorEventName {
    return {
      "node:mousemove": this.mouseenter
    };
  }

  mouseenter = (event: MouseEvent) => {
    console.log("mousemove 事件");
  };
}
