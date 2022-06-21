import "../style/domDecorate.less";
export default class DomDecorate {
  selectElm: HTMLDivElement | undefined;

  hoverElm: HTMLDivElement | undefined;

  selectMaterialId: string | undefined;

  createElem() {
    const box = document.createElement("div");
    box.classList.add("simulator-operate-tool");
    return box;
  }
  setEnterLine(el: Element) {
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
    this.hoverElm?.remove();
  }

  setSelected() {
    // 删除现有选中的标记
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
