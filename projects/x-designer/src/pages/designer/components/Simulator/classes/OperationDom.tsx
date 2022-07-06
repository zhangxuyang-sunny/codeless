import ReactDOM from "react-dom/client";
import DrawSelectNode from "../components/DrawSelectNode";
export interface OperationDomOptions {
  /**
   * 组件绑定id的属性
   */
  key: string;

  container: HTMLElement;
}
export default class OperationDom {
  constructor(private options: OperationDomOptions) {}

  selectNodeRoot: Map<string, { rootDom: HTMLElement; root: ReactDOM.Root }> = new Map();

  /**
   * 当前渲染器中可操作的节点
   */
  get nodes() {
    return Array.from(this.container.querySelectorAll(`[${this.key}]`));
  }

  get key() {
    return this.options.key;
  }

  get container() {
    return this.options.container;
  }

  /**
   *  通过id获取当前的node
   */
  getNodeById(id: string) {
    return this.container.querySelector(`[${this.key}='${id}']`);
  }

  private createRootDom(div: HTMLElement = document.createElement("div")) {
    this.container.appendChild(div);
    return div;
  }
  setSelect(id: string) {
    const node = this.getNodeById(id);
    if (node) {
      const selected = this.selectNodeRoot.get(id);

      const rootDom = this.createRootDom(selected?.rootDom);

      const root = selected ? selected.root : ReactDOM.createRoot(rootDom);

      const { height, width, x, y } = node.getBoundingClientRect();

      root.render(<DrawSelectNode height={height} width={width} left={x} top={y} />);

      this.selectNodeRoot.set(id, { rootDom, root });
    }
  }

  cancelSelect(id: string) {
    const selected = this.selectNodeRoot.get(id);
    selected?.root.unmount();
    selected?.rootDom.remove();
    this.selectNodeRoot.delete(id);
  }

  cancelSelectAll() {
    Array.from(this.selectNodeRoot.keys()).forEach(id => {
      this.cancelSelect(id);
    });
  }
}
