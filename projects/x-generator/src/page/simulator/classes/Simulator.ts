import { fromEvent, Subject, switchMap, takeUntil } from "rxjs";
import DomDecorate from "./DomDecorate";
export default class Simulator {
  container: Element | null = null;

  private plugins: Array<new (...arg: unknown[]) => void> = [];

  private tagName = "data-remote-id";

  mousedown = new Subject<Event>();

  mouseup = new Subject<Event>();

  mouseout = new Subject<Event>();

  mouseover = new Subject<Event>();

  mousemove = fromEvent(document, "mousemove");

  // 自制一个点击事件 防止点击时移动后还会触发click
  click = this.mousedown.pipe(switchMap(() => this.mouseup.pipe(takeUntil(this.mousemove))));

  domDecorate = new DomDecorate();

  constructor() {
    this.mouseover.subscribe(e => {
      console.log("over");
      if (e.target instanceof Element) {
        this.domDecorate.setEnterLine(e.target);
      }
    });

    this.mouseout.subscribe(e => {
      if (e.target instanceof Element) {
        this.domDecorate.removeEnterLine();
      }
    });
    this.click.subscribe(e => {
      if (e.target instanceof Element) {
        this.domDecorate.setSelected();
      }
    });
  }

  basePlugin() {
    this.plugins.forEach(plugin => {
      new plugin({
        event: {
          mousedown: this.mousedown,
          mouseup: this.mouseup,
          mouseleave: this.mouseout,
          mouseenter: this.mouseover
        }
      });
    });
  }

  querySelectorAll() {
    if (this.container) {
      return Array.from(this.container.querySelectorAll(`[${this.tagName}]`));
    }
  }
  /**
   * 绑定事件
   */
  bindEvent(container: Element) {
    this.container = container;
    const nodes = this.querySelectorAll();
    if (nodes) {
      console.log(nodes);
      nodes.forEach(el => {
        this.onEvent(el, "mousedown");
        this.onEvent(el, "mouseover");
        this.onEvent(el, "mouseout");
        this.onEvent(el, "mouseup");
        this.baseDashed(el as HTMLElement);
      });
    }
  }

  baseDashed(el: HTMLElement) {
    Object.assign(el.style, { outline: "1px dashed #ccc" });
  }

  update() {
    if (this.container) {
      this.bindEvent(this.container);
    }
  }

  private dispatchTransaction = (e: Event) => {
    if (e.target === e.currentTarget) {
      switch (e.type) {
        case "mousedown": {
          this.mousedown.next(e);
          break;
        }
        case "mouseover": {
          this.mouseover.next(e);
          break;
        }
        case "mouseout": {
          this.mouseout.next(e);
          break;
        }
        case "mouseup": {
          this.mouseup.next(e);
          break;
        }
      }
    }
  };

  private onEvent(el: Element, eventName: keyof GlobalEventHandlersEventMap) {
    el.addEventListener(eventName, this.dispatchTransaction);
  }

  setHover(id: string) {
    if (!this.container) return;
    if (id) {
      const el = this.container.querySelector(`[${this.tagName}=${id}]`);
      el && this.domDecorate.setEnterLine(el);
    } else {
      this.domDecorate.removeEnterLine();
    }
  }

  setSelected() {
    this.domDecorate.setSelected();
  }

  use(plugin: new (...arg: []) => void) {
    this.plugins.push(plugin);
  }
}
