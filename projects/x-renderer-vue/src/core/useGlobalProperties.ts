const { inject } = await System.import<typeof import("vue")>("vue");
import { TypeGlobalProperties } from "packages/x-core/src/types/index";

export default function useGlobalProperties() {
  return inject<TypeGlobalProperties>("globalProperties");
}

export { useGlobalProperties };
