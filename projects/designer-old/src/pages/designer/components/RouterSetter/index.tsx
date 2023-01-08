import React from "react";
import styled from "styled-components";
import { Button, Drawer } from "@arco-design/web-react";
import { IconEdit } from "@arco-design/web-react/icon";
import { useToggle } from "ahooks";
import { useProject } from "src/stores/projectState";
import RouterSettings from "./RouterSettings";

// UI表现为路由设置按钮，内置抽屉编辑组件
const RouterSetter: React.FC = () => {
  const [drawerToggle, { setLeft, setRight }] = useToggle(false);
  const {
    project, //
    setRouterMode,
    createPage,
    deletePage
  } = useProject();
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
        width="700px"
        placement="left"
        visible={drawerToggle}
        onCancel={setLeft}
        onOk={setLeft}
      >
        <RouterSettings
          defaultMode="hash"
          // views={routerSchema.views}
          onUpdateMode={mode => {
            setRouterMode(mode);
          }}
          onAddRoute={() => {
            createPage();
          }}
          onDeleteRoute={index => {
            deletePage(index);
          }}
        />
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
