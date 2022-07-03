import { Behavior, SimulatorEvents } from "../interface";

export default class MultiSelectNode implements Behavior {
  getEvents(): SimulatorEvents {
    throw new Error("Method not implemented.");
  }
}
