import { createElement } from "react";
import defineApplication from "../core/defineApplication";
import baseExample from "../example/base-example";

// 预览器
const App = defineApplication();
const Previewer: React.FC = () => {
  return createElement(App, { schema: baseExample });
};

export default Previewer;
