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
      "node:contextmenu": this.contextmenu
    };
  }

  contextmenu = (event: Event) => {
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

    if (event.target instanceof Element) {
      this.ctx.cancelSelectAll();

      const target = event.target.closest(`[${this.ctx.key}]`);

      const id = target?.getAttribute(this.ctx.key);

      if (id && !this.ctx.isSelect(id)) {
        this.ctx.setSelect(id);
        this.ctx.cancelEnter(id);
      }
    }
  };

  unmount() {
    this.ctx.cancelSelectAll();
  }
}
