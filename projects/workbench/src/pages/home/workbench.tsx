import { Menu } from "@arco-design/web-react";
import { IconApps, IconUserGroup } from "@arco-design/web-react/icon";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import style from "./workbench.module.scss";

const RESOURCE_LIST = Object.freeze([
  { name: "应用", key: "application" }, //
  { name: "组件", key: "component" },
  { name: "数据源", key: "data-source" },
  { name: "数据集", key: "dataset" }
]);

const MENU_OPTIONS = Object.freeze([
  {
    name: "我的资源",
    key: "resource",
    children: RESOURCE_LIST,
    icon: <IconApps />
  },
  {
    name: "我的团队",
    key: "team",
    children: [],
    icon: <IconUserGroup />
  }
]);

const Workbench: React.FC<{ baseurl: string }> = props => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className={style.root}>
      <Menu
        className={style.menu}
        autoOpen
        autoScrollIntoView
        defaultOpenKeys={MENU_OPTIONS.map(({ key }) => key)}
        defaultSelectedKeys={[pathname]}
        onClickMenuItem={value => {
          navigate(value, { replace: true });
        }}
      >
        {MENU_OPTIONS.map(menuItem => {
          return (
            <Menu.SubMenu
              key={menuItem.key}
              title={
                <>
                  {menuItem.icon}
                  {menuItem.name}
                </>
              }
            >
              {menuItem.children.map(resource => (
                <Menu.Item key={`/${props.baseurl}/${menuItem.key}/${resource.key}`}>
                  {resource.name}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Workbench;
