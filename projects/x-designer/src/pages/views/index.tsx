import styled from "styled-components";
import React, { useEffect } from "react";
import { IconBgColors } from "@arco-design/web-react/icon";
import { IComponentData } from "packages/x-core/dist/types/manager";
import useCreateView from "src/hooks/useCreateView";
import useComponentList from "src/stores/componentListState";

const ComponentItem: React.FC<{ item: IComponentData }> = props => {
  const { item } = props;
  return (
    <div className="component-item">
      <div className="component-content">{item.title}</div>
    </div>
  );
};

const Components: React.FC = () => {
  const { list: ComponentList, doFetch } = useComponentList();

  const { openCreateViewModel, contextHolder } = useCreateView();

  useEffect(() => {
    doFetch();
  }, []);

  const CreateComponentRender = (
    <div
      className="component-item create-button"
      onClick={() => {
        openCreateViewModel().then(() => {
          doFetch();
        });
      }}
    >
      创建页面
    </div>
  );

  return (
    <ViewContainer>
      {contextHolder}
      <div className="title">
        <IconBgColors />
        您的页面
      </div>
      <div className="components-container">
        {ComponentList.map(item => (
          <ComponentItem item={item} key={item.id} />
        ))}
        {CreateComponentRender}
      </div>
    </ViewContainer>
  );
};

const ViewContainer = styled.div`
  .title {
    font-size: 16px;
    color: #172b4d;
    .arco-icon {
      margin-right: 10px;
    }
  }
  .components-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    .component-item {
      position: relative;
      width: 23.5%;
      height: 80px;
      background-color: #091e420a;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      overflow: hidden;
      user-select: none;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #091e4214;
        display: none;
        transition: all 0.3s ease-in;
      }
      &:hover {
        &::before {
          display: block;
        }
      }
    }
    .component-content {
      position: absolute;
      margin: 10px;
      z-index: 2;
      color: #333;
    }
    .create-button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #172b4d;
      font-weight: 400;
    }
  }
`;
export default Components;
