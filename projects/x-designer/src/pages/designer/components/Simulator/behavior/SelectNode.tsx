import { Behavior, SimulatorEvents } from "../interface";
import { Simulator } from "../Simulator";

export default class SelectNode implements Behavior {
  constructor(private ctx: Simulator) {}
  /**
   *  模拟的node根节点
   */

  /**
   * 选中节点的node
   */
  realNode: HTMLElement | null = null;

  getEvents(): SimulatorEvents {
    return {
      "node:click": this.handleClick,
      "document:click": this.simulatorClick,
      "node:contextmenu": this.contextmenu
    };
  }
  contextmenu = (event: Event) => {
    console.log(323);
    event.stopPropagation();
    event.preventDefault();
    if (event.target instanceof Element) {
      const target = event.target.closest(`[${this.ctx.key}]`);
      const id = target?.getAttribute(this.ctx.key);
      id && this.ctx.cancelSelect(id);
    }
  };
  handleClick = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target instanceof Element) {
      this.ctx.cancelSelectAll();
      const target = event.target.closest(`[${this.ctx.key}]`);
      const id = target?.getAttribute(this.ctx.key);
      id && this.ctx.setSelect(id);
    }
  };
  simulatorClick = () => {
    this.unmount();
  };
  unmount() {
    this.ctx.cancelSelectAll();
  }
}
