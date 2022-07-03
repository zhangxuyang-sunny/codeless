import ReactDOM from "react-dom/client";
import { Simulator } from "../Simulator";
import { Behavior, SimulatorEvents } from "../interface";
import DrawSelectNode from "../components/DrawSelectNode";

export default class SelectNode implements Behavior {
  constructor(private ctx: Simulator) {
    this.ctx.container.appendChild(this.drawNodeRoot);
  }
  /**
   *  模拟的node根节点
   */
  drawNodeRoot = document.createElement("div");

  reactDomRoot: ReactDOM.Root | null = null;

  /**
   * 选中节点的node
   */
  realNode: HTMLElement | null = null;

  getEvents(): SimulatorEvents {
    return {
      "node:click": this.handleClick
    };
  }

  drawSelectNode() {
    this.reactDomRoot && this.reactDomRoot.unmount();
    if (this.realNode) {
      const { height, width, x, y } = this.realNode.getBoundingClientRect();
      this.reactDomRoot = ReactDOM.createRoot(this.drawNodeRoot);
      this.reactDomRoot.render(<DrawSelectNode height={height} width={width} left={x} top={y} />);
    }
  }
  handleClick = (event: Event) => {
    event.stopPropagation();
    if (event.target instanceof Element) {
      this.realNode = event.target.closest(this.ctx.key);
      this.drawSelectNode();
    }
  };
}
