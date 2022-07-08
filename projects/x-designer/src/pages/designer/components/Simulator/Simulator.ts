/* eslint-disable no-debugger */
import Shortcuts from "./behavior/Shortcuts";
import OperationDom, { OperationDomOptions } from "./classes/OperationDom";
import { Behavior } from "./interface";
import {
  getRealEventName,
  isSimulatorEventName,
  isNodeEventName,
  isDocumentEventName
} from "./utils";

interface SimulatorOptions extends OperationDomOptions {
  modes?: Record<string, Array<new (...arg: Array<any>) => Behavior>>;
}

export class Simulator extends OperationDom {
  constructor(private config: SimulatorOptions) {
    super({
      key: config.key,
      container: config.container
    });
    this.enableKeyboard();

    this.registerBehavior();

    this.bindEvent();
  }

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
    return this.config.modes || {};
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
          if (isSimulatorEventName(k)) {
            if (isUnbinding) {
              this.container.removeEventListener(getRealEventName(k), events[k]);
            } else {
              this.container.addEventListener(getRealEventName(k), events[k]);
            }
          } else if (isNodeEventName(k)) {
            this.nodes.forEach(node => {
              if (isUnbinding) {
                node.removeEventListener(getRealEventName(k), events[k]);
              } else {
                node.addEventListener(getRealEventName(k), events[k]);
              }
            });
          } else if (isDocumentEventName(k)) {
            if (isUnbinding) {
              document.removeEventListener(getRealEventName(k), events[k]);
            } else {
              document.addEventListener(getRealEventName(k), events[k]);
            }
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

    this.behavior[this.mode].forEach(b => b.unmount?.());
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
    this.container.setAttribute("tabIndex", "-1");
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

  destroy() {
    this.unBindEvent();
  }

  getTarget(target: EventTarget | null) {
    if (target instanceof Element) {
      return target.closest(`[${this.key}]`);
    }
  }

  getNodeId(target: EventTarget | null) {
    const _t = this.getTarget(target);
    if (_t) {
      return _t.getAttribute(this.key);
    }
  }
}
