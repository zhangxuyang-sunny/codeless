import ReactDOM from "react-dom/client";
import DrawSelectNode from "../components/DrawSelectNode";
export interface OperationDomOptions {
  /**
   * 组件绑定id的属性
   */
  key: string;

  /**
   * 用来挂载元素
   */
  container: HTMLElement;

  /**
   * 用来获取dom
   */
  popoverContainer: HTMLElement;
}
export default class OperationDom {
  /**
   * 鼠标悬浮上来的类名
   */
  enterClass = "simulator-enter";

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

  get popoverContainer() {
    return this.options.popoverContainer;
  }

  /**
   *  通过id获取当前的node
   */
  getNodeById(id: string) {
    return this.container.querySelector(`[${this.key}='${id}']`);
  }

  private createRootDom(div: HTMLElement = document.createElement("div")) {
    this.popoverContainer.appendChild(div);
    return div;
  }
  setSelect(id: string) {
    const node = this.getNodeById(id);
    if (node) {
      const selected = this.selectNodeRoot.get(id);

      const rootDom = this.createRootDom(selected?.rootDom);

      const root = selected ? selected.root : ReactDOM.createRoot(rootDom);

      root.render(<DrawSelectNode node={node} />);

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

  setEnter(id: string) {
    const node = this.getNodeById(id);
    if (node) {
      node.classList.add(this.enterClass);
    }
  }

  cancelEnter(id: string) {
    const node = this.getNodeById(id);
    if (node) {
      node.classList.remove(this.enterClass);
    }
  }

  isSelect(id: string | undefined | null) {
    return id ? !!this.selectNodeRoot.get(id) : undefined;
  }
}
