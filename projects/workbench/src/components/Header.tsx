import { Menu } from "@arco-design/web-react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <StyleHeader>
      <div className="logo">
        <img src="/logic3.png" alt="" />
      </div>
      <div className="menu-container">
        <Menu mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key="0">工作台</Menu.Item>
          <Menu.Item key="2">资源中心</Menu.Item>
          <Menu.Item key="3">模块中心</Menu.Item>
          <Menu.Item key="4">模板中心</Menu.Item>
        </Menu>
      </div>
    </StyleHeader>
  );
};

const StyleHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border-1);
  .logo {
    display: flex;
    justify-content: flex-end;
    width: 100px;
    background-color: var(--color-bg-1);
    font-size: 20px;
    font-weight: bold;
    padding: 14px 0 14px 0;
    color: var(--color-text-2);
    img {
    }
  }
  .menu-container {
    flex-grow: 1;
  }
`;

export default Header;
