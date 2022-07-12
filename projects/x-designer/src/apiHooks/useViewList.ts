import { IViewSchema } from "packages/x-core/dist/types/view";
import { useEffect, useState } from "react";
import { getViewList } from "src/api";

export default function useViewData(loadCallback?: (firstData: IViewSchema) => void) {
  const [data, setData] = useState<IViewSchema[]>([]);
  const [isLoading, setLoading] = useState(false);

  const doFetch = async (...arg: Parameters<typeof getViewList>) => {
    setLoading(true);
    const res = await getViewList.apply(getViewList, arg);
    setData(res.data);
    setLoading(false);
    loadCallback?.(res.data[0]);
  };

  useEffect(() => {
    doFetch({});
  }, []);

  return {
    data,
    isLoading
  };
}
