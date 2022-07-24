import styled from "styled-components";

import { IconStorage } from "@arco-design/web-react/icon";
import WorkSpaceMenu from "../WorkSpaceMenu";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { useMemo } from "react";

const HomeSidebar: React.FC = () => {
  const location = useLocation();

  const currentPath = useMemo(() => {
    return location.pathname.split("/").at(-1);
  }, [location]);

  const menuList = [
    {
      title: "页面",
      icon: <IconStorage />,
      path: "views"
    },
    {
      title: "项目",
      icon: <IconStorage />,
      path: "projects"
    }
  ];

  return (
    <HomeSidebarContainer>
      <ul className="menu-container">
        {menuList.map(m => {
          return (
            <li
              className={["hover-bg", currentPath === m.path ? "select-bg" : ""].join(" ")}
              key={m.path}
            >
              <Link to={m.path}>
                {m.icon}
                <span className="title">{m.title}</span>
                <div className="right"> </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <WorkSpaceMenu />
    </HomeSidebarContainer>
  );
};

const HomeSidebarContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 0 16px;
  padding-top: 40px;
  width: 240px;
  box-sizing: content-box;
  /* background-color: pink; */
  .menu-container {
    li {
      a {
        display: flex;
        align-items: center;
        border-radius: 3px;
        box-shadow: none;
        font-weight: bold;
        overflow: hidden;
        padding: 6px;
        user-select: none;
        text-decoration: none;
        color: currentColor;
        margin-bottom: 4px;
        cursor: pointer;
        .title {
          margin-left: 10px;
        }
        .right {
          margin-left: auto;
        }
      }
    }
  }
`;

export default HomeSidebar;
