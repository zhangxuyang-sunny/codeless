import { Behavior, SimulatorEvents } from "../interface";
import { Simulator } from "../Simulator";

export default class HoverNode implements Behavior {
  constructor(private ctx: Simulator) {}
  getEvents(): SimulatorEvents {
    return {
      "node:mouseover": this.mouseover,
      "node:mouseout": this.mouseleave
    };
  }

  mouseover = (event: MouseEvent) => {
    event.stopPropagation();
    const id = this.ctx.getNodeId(event.target);
    id && !this.ctx.isSelect(id) && this.ctx.setEnter(id);
  };

  mouseleave = (event: MouseEvent) => {
    const id = this.ctx.getNodeId(event.target);

    id && this.ctx.cancelEnter(id);
  };
}
