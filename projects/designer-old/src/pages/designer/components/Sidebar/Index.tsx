import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { Tooltip } from "@arco-design/web-react";
import Api from "../Api/Index";
import History from "../History/Index";
// import Module from "../Module/Index";
import Outline from "../Outline/Index";
import DataSet from "../DataSet";
import Json from "../Json";
export default function Sidebar() {
  type TypePlugin = {
    Content: React.FC;
    desc: string;
    icon: string;
  };

  const plugins: TypePlugin[] = [
    {
      desc: "大纲",
      icon: "MinimapList",
      Content: Outline
    },
    // {
    //   desc: "组件",
    //   icon: "Components",
    //   Content: Module
    // },
    {
      desc: "接口",
      icon: "Api",
      Content: Api
    },
    {
      desc: "dataset",
      icon: "dataset",
      Content: DataSet
    },
    {
      desc: "历史版本",
      icon: "History",
      Content: History
    },
    {
      desc: "全局Schema",
      icon: "schema",
      Content: Json
    }
  ];

  const [selectIndex, setSelectIndex] = useState(5);

  /**
   * @todo 寻找包警告的错误
   */
  const selectPlugin = useMemo(() => plugins[selectIndex], [selectIndex]);

  return (
    <>
      <SidebarContainer>
        {plugins.map((plugin, index) => (
          <Tooltip key={plugin.icon} content={plugin.desc} position="right">
            <div
              className="parts-item"
              data-active={selectIndex === index}
              onClick={() => setSelectIndex(index)}
            >
              {plugin.icon}
            </div>
          </Tooltip>
        ))}
      </SidebarContainer>
      <SidebarContent>
        <selectPlugin.Content />
      </SidebarContent>
    </>
  );
}

const SidebarContainer = styled.div`
  width: 48px;
  height: 100%;
  background-color: var(--color-bg-2);
  border-right: 1px solid var(--color-neutral-3);
  padding: 10px 0;
  border-radius: 4px;
`;

const SidebarContent = styled.div`
  background-color: var(--color-bg-2);
  width: 320px;
  border-radius: 4px;
`;
