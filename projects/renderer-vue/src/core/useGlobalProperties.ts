import { TypeGlobalProperties } from "../types";
const { inject } = await System.import<typeof import("vue")>("vue");

export default function useGlobalProperties() {
  return inject<TypeGlobalProperties>("globalProperties");
}

export { useGlobalProperties };
