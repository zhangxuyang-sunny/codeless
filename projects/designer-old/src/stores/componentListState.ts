import { useDebugValue } from "react";
import { atom, useRecoilState } from "recoil";
// import { getComponentList } from "src/api";
import { type Component } from "@codeless/schema";

const componentList = atom<Component[]>({
  key: "component-list",
  default: []
});

export default function useComponentList() {
  const [list, setList] = useRecoilState(componentList);

  useDebugValue(list);

  const doFetch = async () => {
    // const res = await getComponentList({});
    // if (res.code === 0) {
    //   setList(res.data);
    // }
  };

  return {
    list,
    doFetch
  };
}
