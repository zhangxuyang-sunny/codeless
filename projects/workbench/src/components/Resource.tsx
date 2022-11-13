import { Input, Select } from "@arco-design/web-react";
import { ProjectStatus } from "@codeless/types/src/enums";
import { useProjectList } from "src/hooks/useResourceList";
import styled from "styled-components";

import CreateButton from "./CreateButton";
import ResourceList from "./ResourceList";

const Resource: React.FC<{ type: string; name: string }> = props => {
  const {
    title, //
    setTitle,
    status,
    setStatus,
    projectList
  } = useProjectList(props.type);

  return (
    <StyleResourceManager>
      <div className="resource-header">
        <Input.Search
          className="search-input"
          placeholder={`请输入"${props.name}"名称以搜索资源`}
          value={title}
          onChange={setTitle}
        />
        <div className="right">
          <div className="selectors">
            <Select className="select" bordered={false} placeholder="选择团队空间" defaultValue="0">
              <Select.Option value="0">我的空间</Select.Option>
              <Select.Option value="1">团队1</Select.Option>
              <Select.Option value="2">团队2</Select.Option>
              <Select.Option value="3">团队3</Select.Option>
            </Select>
            <Select
              className="select"
              bordered={false}
              placeholder="请选择排序方式"
              defaultValue="0"
            >
              <Select.Option value="0">按创建时间排序</Select.Option>
              <Select.Option value="1">按修改时间排序</Select.Option>
            </Select>
            <Select
              className="select"
              bordered={false}
              placeholder="请选择状态"
              value={status}
              onChange={setStatus}
            >
              <Select.Option value="">全部状态</Select.Option>
              <Select.Option value={ProjectStatus.normal}>已启用 </Select.Option>
              {/* 废弃即软删除 */}
              <Select.Option value={ProjectStatus.unlink}>已废弃 </Select.Option>
            </Select>
          </div>
          <div>
            <CreateButton resName={props.name} />
          </div>
        </div>
      </div>
      <div className="list-container">
        <ResourceList list={projectList} />
      </div>
    </StyleResourceManager>
  );
};

const StyleResourceManager = styled.div`
  flex-grow: 1;
  background-color: var(--color-bg-1);
  box-sizing: border-box;
  .resource-header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background-color: var(--color-bg-1);
    padding: 20px 0;
    z-index: 1;
    border-bottom: 1px solid var(--color-border-2);
    .search-input {
      width: 300px;
      margin-right: 20px;
    }
    .right {
      display: flex;
      align-items: center;
      .selectors {
        display: flex;
        .select {
          margin-right: 20px;
          flex-grow: 1;
          &:hover {
            background-color: var(--color-border-1);
          }
        }
      }
    }
  }
  .list-container {
    flex-grow: 1;
    /* overflow-y: auto; */
  }
`;

export default Resource;
