import { reactive, toRef, computed } from 'vue';

export { default as useEvents } from './useEvents';
export { default as useGlobalProperties } from './useGlobalProperties';
export { default as loadRemoteComponent } from './loadRemoteComponent';
export { default as createElement } from './createElement';
export { default as useFetch } from './useFetch';

// 创建资料库
export const createDataset: typeof reactive = (target) => {
  return reactive(target);
};

// 连接到 store 的响应数据
export const connect: typeof toRef = (target, key) => {
  return toRef(target, key);
};

// 连接到 store 的响应表达式
export const connectExp: <T>(arg: T) => ReturnType<typeof computed> = (
  data
) => {
  return computed(() => data);
};

// alias of connect above
export const bind = connect;

const methods: Record<string, Function> = {};
export const defineMethod = (data: { name: string; value: Function }) => {
  methods[data.name] = data.value;
  return methods;
};

export function useMethods() {
  return methods;
}
