export abstract class AbstractSchemaBuilder<T> {
  constructor(protected schema: T) {}
  set(key: keyof T, value: T[keyof T]) {
    this.schema[key] = value;
    return this;
  }
  get(key: keyof T) {
    return this.schema[key];
  }
  end() {
    return this.schema;
  }
}
