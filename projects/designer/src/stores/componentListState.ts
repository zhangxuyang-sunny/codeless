import { useDebugValue } from "react";
import { atom, useRecoilState } from "recoil";
import { getComponentList } from "src/api";
import { ComponentData } from "@economizer/types";

const componentList = atom<ComponentData[]>({
  key: "component-list",
  default: []
});

export default function useComponentList() {
  const [list, setList] = useRecoilState(componentList);

  useDebugValue(list);

  const doFetch = async () => {
    const res = await getComponentList({});
    if (res.code === 0) {
      setList(res.data);
    }
  };

  return {
    list,
    doFetch
  };
}
