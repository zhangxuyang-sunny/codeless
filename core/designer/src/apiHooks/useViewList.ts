// import { useEffect, useState } from "react";
// import { getComponentList } from "src/api";

// export default function useViewData(loadCallback?: (firstData: IViewSchema) => void) {
//   const [data, setData] = useState<IViewSchema[]>([]);
//   const [isLoading, setLoading] = useState(false);

//   const doFetch = async (...arg: Parameters<typeof getComponentList>) => {
//     setLoading(true);
//     const res = await getComponentList.apply(getComponentList, arg);
//     setData(res.data);
//     setLoading(false);
//     loadCallback?.(res.data[0]);
//   };

//   useEffect(() => {
//     doFetch({});
//   }, []);

//   return {
//     data,
//     isLoading
//   };
// }
