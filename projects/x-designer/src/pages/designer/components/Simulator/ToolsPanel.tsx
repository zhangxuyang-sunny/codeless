import React, { useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const ToolsPanel = React.forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"]>((props, ref) => {
  console.log(document.getElementById("nodes-container") || document.body);
  return (
    <Draggable
      handle=".title"
      bounds="body"
      allowAnyClick
      offsetParent={document.getElementById("nodes-container") || document.body}
    >
      <StyleToolsPanel ref={ref}>
        <div className="title">编辑弹窗</div>
      </StyleToolsPanel>
    </Draggable>
  );
});

const StyleToolsPanel = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px var(--color-border-2) solid;
  background-color: var(--color-bg-1);
  box-shadow: 0 0 100px var(--color-border-2);
  .title {
    cursor: move;
    width: 100%;
    padding: 8px 10px;
    border-bottom: 1px dashed var(--color-border-2);
  }
`;

export default ToolsPanel;
