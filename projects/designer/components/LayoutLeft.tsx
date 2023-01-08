import { useState } from "react";
import { useProject } from "src/stores/projectState";
import styled from "styled-components";

import RouterSettings from "./RouterSettings";

const StyleLayoutLeft = styled.div`
  display: flex;
  flex-shrink: 0;
  /* width: 450px; */
  height: 100%;
  border-right: 1px solid var(--color-border-1);
  overflow: hidden;
  .bar {
    width: 60px;
    border-right: 1px solid var(--color-border-1);
    flex-shrink: 0;
    .button {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--color-text-3);
      cursor: pointer;
      &:hover {
        background-color: var(--color-border-1);
      }
      &[data-select="true"] {
        background-color: var(--color-border-1);
        color: var(--color-text-1);
      }
    }
  }
  .panel {
    width: 400px;
    height: 100%;
    padding: 20px;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: auto;
  }
`;

const buttons = [
  { title: "页面" },
  { title: "模块" },
  { title: "数据" },
  { title: "逻辑" },
  { title: "云函数" },
  { title: "监听器" }
];
const LayoutLeft: React.FC = () => {
  const [selectIdx, setSelectIdx] = useState(0);
  const {
    project, //
    setRouterMode,
    createPage,
    deletePage
  } = useProject();
  return (
    <StyleLayoutLeft>
      <div className="bar">
        {buttons.map((button, index) => (
          <div
            className="button"
            data-select={selectIdx === index}
            key={index}
            onClick={() => {
              setSelectIdx(index);
            }}
          >
            {button.title}
          </div>
        ))}
      </div>
      <div className="panel">
        {selectIdx === 0 && (
          <RouterSettings
            readonly={false}
            defaultMode="hash"
            mode={project.schema.router.mode}
            pages={project.schema.pages}
            onAddRoute={createPage}
            onDeleteRoute={index => {
              deletePage(index);
            }}
            onUpdateMode={mode => {
              setRouterMode(mode);
            }}
          />
        )}
      </div>
    </StyleLayoutLeft>
  );
};

export default LayoutLeft;
