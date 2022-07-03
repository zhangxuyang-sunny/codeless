import { Behavior, SimulatorEventName } from "../interface";
import { Simulator } from "../Simulator";

export default class Shortcuts implements Behavior {
  constructor(private ctx: Simulator) {}
  getEvents(): SimulatorEventName {
    return {
      "simulator:keydown": this.keydown,
      "simulator:keyup": this.keyup
    };
  }

  handleShift(isUp?: boolean) {
    this.ctx.setMode(isUp ? "default" : "hover");
  }

  keydown = () => {
    this.handleShift();
  };

  keyup = () => {
    this.handleShift(true);
  };
}
