export class Subject<T, NextFunc extends (value: T) => void> {
  /**
   * 事件收集队列
   */
  private nextFunc: Array<NextFunc> = [];

  /**
   * 订阅方法
   */
  subscribe(next?: NextFunc) {
    if (next instanceof Function && /^function/.test(next.toString())) {
      this.nextFunc.push(next);
    }
  }

  /**
   * @发射方法
   */
  next(value: T) {
    this.nextFunc.forEach(next => next(value));
  }

  /**
   *
   * @param next 注销订阅的方法
   */
  unsubscribe(next: NextFunc) {
    const index = this.nextFunc.findIndex(n => next === n);

    if (index >= 0) {
      this.nextFunc.splice(index, 1);
    }
  }
}
