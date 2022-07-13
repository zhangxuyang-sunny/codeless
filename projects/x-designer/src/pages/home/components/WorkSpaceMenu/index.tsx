import { Modal } from "@arco-design/web-react";
import {
  IconDown,
  IconPlus,
  IconSave,
  IconSettings,
  IconUp,
  IconUser
} from "@arco-design/web-react/icon";
import { useToggle } from "ahooks";
import React from "react";
import styled from "styled-components";

/**
 * 新增工作区的渲染
 */
const AddWorkSpaceRender: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <IconPlus className="hover-bg" onClick={() => setVisible(true)} />
      <Modal
        title="新增工作区"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </Modal>
    </>
  );
};

/**
 * 每一个工作区
 */
const WorkSpaceItemRender: React.FC = () => {
  const [visible, { toggle }] = useToggle();
  const funcList = [
    {
      title: "页面",
      path: "views",
      icon: <IconSave />
    },
    {
      title: "项目",
      path: "projects",
      icon: <IconSave />
    },
    {
      title: "成员列表",
      path: "members",
      icon: <IconUser />
    },
    {
      title: "设置",
      path: "settings",
      icon: <IconSettings />
    }
  ];
  return (
    <div className="work-space-item" onClick={toggle}>
      <header className="hover-bg">
        <div className="pic">名</div>
        <div className="title">名称</div>
        <div className="icon">{visible ? <IconUp /> : <IconDown />}</div>
      </header>
      <FoldingPanel
        visible={visible}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {funcList.map(f => {
          return (
            <li className="hover-bg">
              {f.icon}
              <span className="title">{f.title}</span>
            </li>
          );
        })}
      </FoldingPanel>
    </div>
  );
};

const WorkSpaceMenu: React.FC = () => {
  return (
    <WorkSpaceMenuContainer>
      <div className="title">
        <span>工作区</span>
        <AddWorkSpaceRender />
      </div>
      <WorkSpaceItemRender />
      <WorkSpaceItemRender />
      <WorkSpaceItemRender />
      <WorkSpaceItemRender />
    </WorkSpaceMenuContainer>
  );
};

const WorkSpaceMenuContainer = styled.div`
  margin-top: 10px;

  & > .title {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .arco-icon-plus {
    padding: 5px;
    box-sizing: content-box;
    border-radius: 3px;
  }
  .work-space-item {
    header {
      display: flex;
      height: 40px;
      border-radius: 3px;
      align-items: center;
      font-weight: bold;
      padding: 6px;
      margin-bottom: 4px;
      user-select: none;
      .pic {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        border-radius: 2px;
        height: 21px;
        width: 21px;
        margin: 6px;
        flex: 0 0 auto;
        color: #fff;
        background: linear-gradient(#cc4223, #cb7d25);
      }
      .icon {
        color: rgb(66, 82, 110);
        margin-left: auto;
      }
    }
  }
`;

const FoldingPanel = styled.ul<{ visible: boolean }>`
  height: ${props => (props.visible ? "143px" : 0)};
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  li {
    padding-left: 28px;
    display: flex;
    align-items: center;
    height: 32px;
    color: rgba(9, 30, 66, 0.66);
    margin-bottom: 4px;
    .arco-icon {
      margin-right: 10px;
    }
  }
`;
export default WorkSpaceMenu;
