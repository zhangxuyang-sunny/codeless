import React, { useRef } from "react";
import { Popover } from "@arco-design/web-react";
import { TypeMaterialSchema } from "packages/x-types/material";
import styled from "styled-components";

export interface IMaterialItem {
  data: TypeMaterialSchema;
}
const MaterialItem: React.FC<IMaterialItem> = ({ data }) => {
  const materialItemEle = useRef<HTMLDivElement>(null);
  return (
    <MaterialItemContainer>
      <Popover
        className="material-preview-popover"
        getPopupContainer={() => {
          return materialItemEle.current?.parentElement?.parentElement || document.body;
        }}
        arrow-class="material-arrow-popover"
        triggerProps={{
          showArrow: false
        }}
        position="right"
        trigger="hover"
        content={<img style={{ width: "300px" }} src={data.meta.image} alt="" />}
      >
        <div className="material-item" ref={materialItemEle}>
          <img className="material-image" draggable={false} src={data.meta.image} alt="" />
          <div className="title">{data.meta.title}</div>
        </div>
      </Popover>
    </MaterialItemContainer>
  );
};

const MaterialItemContainer = styled.div`
  .material-item {
    display: flex;
    flex-direction: column;
    grid-row-gap: 10px;
    height: 100px;
    box-sizing: border-box;
    flex-shrink: 0;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    cursor: grab;
    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
    .material-image {
      width: 62px;
      height: 52px;
      // height: 32px;
      object-fit: contain;
    }

    .material-preview-content {
      pointer-events: none;
      .preview-image {
        width: 200px;
      }
    }
  }
  & ~ div > .material-preview-popover {
    pointer-events: none;
    left: unset !important;
    top: unset !important;
    margin-left: 320px;
    .material-arrow-popover {
      display: none;
    }
  }
`;

export default MaterialItem;
