import styled from "styled-components";
import { Button, Drawer } from "@arco-design/web-react";
import { IconEdit } from "@arco-design/web-react/icon";
import { useToggle } from "ahooks";
import RouterSettings from "./RouterSettings";

// UI表现为路由设置按钮，内置抽屉编辑组件
const RouterSetter: React.FC = () => {
  const [drawerToggle, { setLeft, setRight }] = useToggle(false);
  return (
    <StyleRouterSetter>
      <Button
        className="button"
        size="small"
        type="text"
        shape="circle"
        icon={<IconEdit />}
        onClick={setRight}
      />
      <Drawer
        title="页面路由"
        width="auto"
        visible={drawerToggle}
        onCancel={setLeft}
        onOk={setLeft}
      >
        <RouterSettings defaultMode="hash" />
      </Drawer>
    </StyleRouterSetter>
  );
};

const StyleRouterSetter = styled.div`
  .button {
    color: var(--color-text-1);
    margin: 0 10px;
  }
`;

export default RouterSetter;
