import { Behavior, SimulatorEventName } from "../interface";

export default class MultiSelectNode implements Behavior {
  getEvents(): SimulatorEventName {
    throw new Error("Method not implemented.");
  }
}
