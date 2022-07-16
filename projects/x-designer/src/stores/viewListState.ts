import { IViewSchema } from "packages/x-core/dist/types/view";
import { useDebugValue } from "react";
import { atom, useRecoilState } from "recoil";
import { getViewList } from "src/api";

const viewList = atom<IViewSchema[]>({
  key: "view-list",
  default: []
});

export default function useViewList() {
  const [list, setViewList] = useRecoilState(viewList);

  useDebugValue(list);

  const doFetch = async () => {
    const res = await getViewList({});
    if (res.code === 0) {
      setViewList(res.data);
    }
  };

  return {
    viewList: list,
    doFetch
  };
}
