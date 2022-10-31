import { ComponentType, LazyExoticComponent } from "react";
import { Component as ComponentSchema } from "packages/schema";
import { context } from "../core/Context";

const rReact = await System.import<typeof import("react")>("react");

const BASE_URL = "//localhost:7891";

const RemoteComponent: React.FC<{ schema: ComponentSchema }> = props => {
  console.log(123);
  // 获取远程组件
  const Component = rReact.useMemo(() => {
    return rReact.lazy<ComponentType<unknown>>(async () => {
      const c = await System.import(BASE_URL + props.schema.src);
      return c.default;
    });
  }, [props.schema.src]);
  // 解析 props
  const cProps = rReact.useMemo(() => {
    //
  }, [props.schema.props]);
  // 解析 slots
  const cSlots = rReact.useMemo(() => {
    //
  }, [props.schema.slots]);
  // 解析 events
  const cEvents = rReact.useMemo(() => {
    //
  }, [props.schema.events]);
  // 解析 style
  const cStyle = rReact.useMemo(() => {
    //
  }, [props.schema.style]);
  return (
    <rReact.Suspense>
      <Component />
    </rReact.Suspense>
  );
};

export default RemoteComponent;
