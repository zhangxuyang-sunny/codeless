import { atom, useRecoilState } from "recoil";
import { IViewSchema } from "packages/x-core/dist/types/view";
import { useDebugValue } from "react";

export const viewState = atom<IViewSchema | null>({
  key: "view",
  default: null
});

export const useViewState = () => {
  const [data, setViewData] = useRecoilState(viewState);

  useDebugValue(data);

  return {
    viewState: data,
    setViewData
  };
};
