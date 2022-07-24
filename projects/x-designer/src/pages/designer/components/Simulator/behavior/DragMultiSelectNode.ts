import { Behavior, SimulatorEvents } from "../interface";
import { Simulator } from "../Simulator";

export default class MultiSelectNode implements Behavior {
  constructor(private ctx: Simulator) {}

  coordinatesNode = document.createElement("div");

  startCoordinates = {
    x: 0,
    y: 0
  };

  isUp = true;

  getEvents(): SimulatorEvents {
    return {
      "document:mousedown": this.mousedown,
      "document:mousemove": this.mousemove,
      "document:mouseup": this.mouseup
    };
  }

  moveCoordinatesNode(x: number, y: number) {
    // 元素的宽高
    const width = x - this.startCoordinates.x;
    const height = y - this.startCoordinates.y;

    // 反向溢出坐标
    const overflowX = x - this.startCoordinates.x;
    const overflowY = y - this.startCoordinates.y;

    // 样式计算
    Object.assign(this.coordinatesNode.style, {
      position: "fixed",
      top: (overflowY < 0 ? this.startCoordinates.y + overflowY : this.startCoordinates.y) + "px",
      left: (overflowX < 0 ? this.startCoordinates.x + overflowX : this.startCoordinates.x) + "px",
      height: Math.abs(height) + "px",
      width: Math.abs(width) + "px",
      background: "rgba(0,0,0, 0.2)"
    });

    this.calcNodeInCoordinatesNode();
  }

  calcNodeInCoordinatesNode() {
    const rect1 = this.getRect(this.coordinatesNode.getBoundingClientRect());
    this.ctx.nodes.forEach(item => {
      const rect2 = this.getRect(item.getBoundingClientRect());
      const id = item.getAttribute(this.ctx.key);
      if (this.isRectangleOverlap(rect1, rect2)) {
        id && this.ctx.setSelect(id);
      } else {
        id && this.ctx.cancelSelect(id);
      }
    });
  }

  /**
   * 获取圆中心点坐标以及2/1的宽高
   */
  getRect(domRect: DOMRect) {
    const { x, y, height, width } = domRect;

    return [x + width / 2, y + height / 2, width / 2, height / 2];
  }

  /**
   * 通过getRect返回的数据进行计算矩形是否重叠
   */
  isRectangleOverlap(rec1: number[], rec2: number[]) {
    return (
      Math.abs(rec1[0] - rec2[0]) < rec1[2] + rec2[2] &&
      Math.abs(rec1[1] - rec2[1]) < rec1[3] + rec2[3]
    );
  }

  mousedown = (events: MouseEvent) => {
    this.isUp = false;
    const { x, y } = events;

    Object.assign(this.startCoordinates, { x, y });

    this.ctx.document.body.appendChild(this.coordinatesNode);
  };

  mousemove = (event: MouseEvent) => {
    if (this.isUp) return;
    const { x, y } = event;
    this.moveCoordinatesNode(x, y);
  };
  mouseup = () => {
    this.isUp = true;
    this.coordinatesNode.style.left = "-10000px";
    this.coordinatesNode.remove();
  };

  unmount() {
    this.mouseup();
  }
}
