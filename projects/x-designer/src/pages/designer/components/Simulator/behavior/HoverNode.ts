import { Behavior, SimulatorEvents } from "../interface";

export default class HoverNode implements Behavior {
  getEvents(): SimulatorEvents {
    return {
      "node:mouseover": this.mouseover
    };
  }

  mouseenter = (event: MouseEvent) => {
    console.log(1);
  };

  mouseover(event: MouseEvent) {
    event.stopPropagation();
    console.log("over1");
  }
}
