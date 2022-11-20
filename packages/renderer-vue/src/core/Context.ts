// 重写函数 this 指向为 context 对象
export class Context {
  // 当前函数 this指向
  current: Window | unknown | null = window;
  datasets: Record<string, unknown> = {};

  setCurrent(current: typeof this.current) {
    this.current = current;
    return this;
  }

  setDataset(key: string, dataset: unknown) {
    this.datasets[key] = dataset;
    return this;
  }

  getContext() {
    return {
      current: this.current,
      datasets: this.datasets
    };
  }
}

export const context = new Context();
