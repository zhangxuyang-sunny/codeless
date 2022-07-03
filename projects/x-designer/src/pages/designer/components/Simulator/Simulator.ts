/* eslint-disable no-debugger */
import Shortcuts from "./behavior/Shortcuts";
import { Behavior } from "./interface";
import { getRealEventName, isGlobalEventName, isNodeEventName } from "./utils";

interface SimulatorOptions {
  /**
   * 组件绑定id的属性
   */
  key: string;

  container: HTMLElement;

  modes?: Record<string, Array<new (...arg: Array<any>) => Behavior>>;
}

export class Simulator {
  constructor(private options: SimulatorOptions) {
    this.enableKeyboard();

    this.registerBehavior();

    this.bindEvent();
  }
  /**
   * node 选中的ID
   */
  selectId = "";

  /**
   * 交互事件的机制。它与交互模式 Mode 搭配使用
   */
  private behavior: Record<string, Array<Behavior>> = {};

  /**
   * 当前的model
   */

  private mode = "default";

  /**
   * 模型配置
   */
  get modes() {
    return this.options.modes || {};
  }
  /**
   * 选中node的节点
   */
  get selectNode() {
    return Array.from(this.nodes).find(n => n.getAttribute(this.options.key) === this.selectId);
  }

  /**
   * 当前渲染器中可操作的节点
   */
  get nodes(): NodeListOf<Element> {
    return document.querySelectorAll(this.options.key);
  }

  /**
   * 处理事件的注册与卸载
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  private dealWithEvent(isUnbinding?: boolean) {
    const behaviorInstance = this.behavior[this.mode];
    if (behaviorInstance) {
      behaviorInstance.forEach(instance => {
        const events = instance.getEvents();
        for (const k in events) {
          if (isGlobalEventName(k)) {
            if (isUnbinding) {
              this.options.container.removeEventListener(getRealEventName(k), events[k]);
            } else {
              this.options.container.addEventListener(getRealEventName(k), events[k]);
            }
          } else if (isNodeEventName(k)) {
            this.nodes.forEach(node => {
              if (isUnbinding) {
                node.removeEventListener(getRealEventName(k), events[k]);
              } else {
                node.addEventListener(getRealEventName(k), events[k]);
              }
            });
          }
        }
      });
    }
  }

  private bindEvent() {
    this.dealWithEvent();
  }

  private unBindEvent() {
    this.dealWithEvent(true);
  }

  private registerBehavior() {
    Object.entries(this.modes || {}).forEach(([behaviorName, behaviors]) => {
      this.behavior[behaviorName] = behaviors
        .map(Behavior => new Behavior(this))
        .concat(new Shortcuts(this));
    });
  }

  enableKeyboard() {
    /**
     * 启用键盘事件
     */
    this.options.container.setAttribute("tabIndex", "-1");
  }

  /**
   * 设置模型
   */
  setMode(mode: string) {
    this.unBindEvent();
    this.mode = mode;
    this.bindEvent();
  }

  /**
   * 获取模型
   */
  getMode() {
    return this.mode;
  }
}
