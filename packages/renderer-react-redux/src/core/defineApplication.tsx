import { useEffect, useMemo, useState } from "react";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { Application } from "packages/schema";
import { Dependencies } from "./runtime-schema";
import { parseDataset } from "./SchemaParser";
import { context, IContext } from "./Context";
import RemoteComponent from "../components/RemoteComponent";

const rReact = await System.import<Dependencies.React>("react");
const rReactDOMClient = await System.import<Dependencies.ReactDOMClient>(
  "react-dom/client"
);
const rReduxToolkit = await System.import<Dependencies.ReduxToolkit>(
  "@reduxjs/toolkit"
);

const RENDERER_ID = "__react_renderer__";

export default function defineApplication(): React.FC<{ schema: Application }> {
  return props => {
    useEffect(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("schema: ", props.schema);
      }
    }, []);

    // 生成 store 实例
    const { storeInstance, storeContext } = useMemo(() => {
      const storeContext: IContext["store"] = {};
      const storeInstance = rReduxToolkit.configureStore({
        devTools: true,
        reducer: props.schema.datasets.reduce((result, dataset) => {
          const { define } = parseDataset(dataset);
          const { reducer, actions } = rReduxToolkit.createSlice(define);
          Object.assign(storeContext, {
            [dataset.name]: {
              get state() {
                return storeInstance.getState();
              },
              set state(_) {
                console.warn("Invalid to set value for 'context.state'.");
              },
              // 代理 actions 方法
              methods: new Proxy(actions, {
                get: function (obj, prop) {
                  return (payload: unknown) => {
                    if (typeof prop === "string") {
                      const action = obj[prop];
                      storeInstance.dispatch(action(payload));
                    } else {
                      console.warn(`Prop: ${String(prop)} is not a string.`);
                    }
                  };
                }
              })
              // 重写 actions 方法
              // methods: Object.entries(actions).reduce(
              //   (result, [name, action]) => {
              //     return Object.assign(result, {
              //       [name]: (payload: unknown) => {
              //         storeInstance.dispatch(action(payload));
              //       }
              //     });
              //   },
              //   {}
              // )
            }
          });
          return Object.assign(result, {
            [dataset.name]: reducer
          });
        }, {} as ReducersMapObject<Record<string, unknown>>)
      });
      return { storeInstance, storeContext };
    }, [props.schema.datasets]);

    // // 创建平台上下文实例
    // const context = useMemo(() => new Context(), []);

    // 同步更新 context 实例数据
    useEffect(() => {
      context.setStoreContext(storeContext);
      context.setStoreInstance(storeInstance);
    }, [storeContext, storeInstance]);

    console.log({ storeInstance, storeContext, context });

    // 获取根元素
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
      setRootElement(document.getElementById(RENDERER_ID));
    }, []);

    // 渲染远程 react
    useEffect(() => {
      if (!rootElement) return;
      const app = rReactDOMClient.createRoot(rootElement);
      app.render(<RemoteComponent schema={props.schema.pages[0].component} />);
      return () => {
        app.unmount();
      };
    }, [rootElement]);

    return rReact.createElement("div", { id: RENDERER_ID });
  };
}
