import { useDebugValue } from "react";
import { atom, useRecoilState } from "recoil";
import { getComponentList } from "src/api";
import { IComponentData } from "packages/x-core/dist/types/manager";

const componentList = atom<IComponentData[]>({
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
