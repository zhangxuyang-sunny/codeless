import "../style/domDecorate.less";

import { debounce } from "lodash";
export default class DomDecorate {
  private selectObserverInstance = new ResizeObserver(resizeObserverEntry => {
    this.resizeObserverCallback(resizeObserverEntry);
  });

  hoverDom: HTMLElement | null = null;

  selectDom: HTMLElement | null = null;

  selectElm: HTMLDivElement | null = null;

  hoverElm: HTMLDivElement | null = null;

  selectMaterialId: string | null = null;

  private resizeObserverCallback = debounce((resizeObserverEntry: ResizeObserverEntry[]) => {
    const { target } = resizeObserverEntry[0];
    const { height, width, x, y } = target.getBoundingClientRect();
    console.log(target);
    if (this.selectElm) {
      Object.assign(this.selectElm.style, {
        height: height + "px",
        width: width + "px",
        top: y + "px",
        left: x + "px"
      });
    }
    console.log(this.selectElm);
  }, 100);

  private updateHoverDomToSelect() {
    this.selectDom && this.selectObserverInstance.unobserve(this.selectDom);
    this.selectDom = this.hoverDom;
    this.selectDom && this.selectObserverInstance.observe(this.selectDom);
  }
  createElem() {
    const box = document.createElement("div");
    box.classList.add("simulator-operate-tool");
    return box;
  }
  setEnterLine(el: Element) {
    console.log(el, 111);
    this.hoverDom = <HTMLElement>el;
    const { height, width, x, y } = el.getBoundingClientRect();
    const box = this.createElem();
    box.classList.add("hover");
    Object.assign(box.style, {
      height: height + 2 + "px",
      width: width + 2 + "px",
      top: y - 2 + "px",
      left: x - 2 + "px"
    });
    this.hoverElm = box;
    this.appendElem(this.hoverElm);
  }

  removeEnterLine() {
    this.hoverDom = null;
    this.hoverElm?.remove();
  }

  setSelected() {
    this.updateHoverDomToSelect();

    this.selectElm?.remove();
    // 通过hover的标记clone一份node
    this.selectElm = <HTMLDivElement>this.hoverElm?.cloneNode(true);
    this.selectElm.classList.remove("hover");
    this.selectElm.classList.add("selected");
    this.removeEnterLine();
    this.appendElem(this.selectElm);
  }

  appendElem(elem: Element) {
    document.body.appendChild(elem);
  }
}
