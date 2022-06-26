import { v4 as uuidV4 } from "uuid";
export function GenerateId() {
  return function (
    target: { isIdExists(id: string): Promise<boolean> },
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = async function () {
      let id = uuidV4();
      while (!(await target.isIdExists(id))) {
        id = uuidV4();
      }
      return method.call(this, id);
    };
  };
}
