import React from "react";
import ReactDOM from "react-dom/client";
import NodeSelector from "./NodeSelector";
/**
 * 模拟器类
 * @deprecated
 */

export class Simulator {
  constructor(
    private readonly window: Window & typeof globalThis,
    private readonly iframeElement: HTMLIFrameElement
  ) {
    // 设置父元素样式
    if (iframeElement.parentElement) {
      iframeElement.parentElement.style.margin = "10px";
      iframeElement.parentElement.style.position = "relative";
    }
    // 创建编辑工具
    this.tippyContainer.id = "tippy-container";
    Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(this.tippyContainer.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%"
    });
    // 把编辑工具 dom 放在 iframe 的旁边
    this.iframeElement.insertAdjacentElement("afterend", this.tippyContainer);

    // 观察 iframe 根节点
    this.rootMutationObserver.observe(this.window.document, {
      // attributes: true,
      childList: true,
      subtree: true
    });
  }

  /**
   * 弹窗容器
   */
  private tippyContainer: HTMLDivElement = document.createElement("div");

  /**
   * 使用 iframe 的 Element 进行判断，node instanceof Element 会返回 false
   */
  private isElement(node: Node): node is Element {
    return node instanceof this.window.Element;
  }

  /**
   * 观察根节点，监听所有节点
   */
  private rootMutationObserver = new MutationObserver(mutations => {
    console.log(123);
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (this.isElement(node) && node.getAttribute(this.nodeIdFlag)) {
          // Tippy(node, {
          //   content: "1231231",
          //   interactive: true,
          //   followCursor: true,
          //   appendTo: "parent"
          // });
          const root = document.createElement("div");
          this.tippyContainer.appendChild(root);
          ReactDOM.createRoot(root).render(React.createElement(NodeSelector, { element: node }));
        }
      });
      console.log({ mutation });
    });
  });

  /**
   * 观察单个节点
   */
  private nodeMutationObserver = new MutationObserver(mutations => {
    //
  });

  /**
   * 标记组件 dom 节点
   */
  private nodeFlag: `data-${string}` = "data-remote";

  /**
   * 标记节点 id 属性
   */
  private nodeIdFlag: `data-${string}` = "data-component-id";

  /**
   * 修改 node 节点标识
   */
  setNodeFlag(flag: typeof this.nodeFlag) {
    this.nodeFlag = flag;
    return this;
  }

  /**
   * 修改 node id 节点标识
   */
  setNodeIdFlag(flag: typeof this.nodeIdFlag) {
    this.nodeIdFlag = flag;
    return this;
  }

  /**
   * 初始化 node 节点
   */
  initRoot() {}

  filterTargetNodes(nodes: NodeListOf<Element>) {
    return Array.from(nodes).filter(node => node.getAttribute(this.nodeFlag));
  }

  initAllNodes(nodes: NodeList) {
    nodes.forEach(node => {});
  }
}
