import { Avatar, Button, Select, Tag } from "@arco-design/web-react";
import { ProjectConfigData, ProjectStatus } from "packages/types/dist";
import { ProjectStatusName } from "packages/types/src/enums";
import styled from "styled-components";

const ResourceList: React.FC<{ list: ProjectConfigData[] }> = props => {
  return (
    <StyleResourceList>
      {props.list.map(item => {
        return (
          <div className="list-item" key={item.id}>
            <Avatar size={80} shape="square" className="avatar">
              {item.title.at(0)}
            </Avatar>
            <div className="content">
              <p className="title">{item.title}</p>
              <p className="description">{item.description}</p>
              <div className="meta-info">
                <div className="operations">
                  <div className="top">
                    <Tag
                      className="status-tag"
                      color={
                        {
                          normal: "green",
                          unlink: "grey",
                          delete: "red"
                        }[ProjectStatus[item.status]]
                      }
                    >
                      {ProjectStatusName[ProjectStatus[item.status]] || "未知"}
                    </Tag>
                    <Select
                      className="visible-select"
                      bordered={false}
                      placeholder="可见性"
                      defaultValue={1}
                      size="small"
                    >
                      <Select.Option value={1}>自己可见</Select.Option>
                      <Select.Option value={2}>团队可见</Select.Option>
                    </Select>
                  </div>
                  <div className="actions">
                    <Button type="text" size="small">
                      预览
                    </Button>
                    <Button type="text" size="small">
                      编辑
                    </Button>
                    <Button type="text" size="small">
                      更多
                    </Button>
                  </div>
                </div>
                <div className="base-info">
                  <div className="update-info">
                    <span>更新用户：{item.updatedUser || "--"}</span>
                    <span>更新时间：{item.updatedAt || "--"}</span>
                  </div>
                  <div className="create-info">
                    <span>创建用户：{item.createdUser || "--"}</span>
                    <span>创建时间：{item.createdAt || "--"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </StyleResourceList>
  );
};

const StyleResourceList = styled.div`
  display: flex;
  flex-direction: column;
  .list-item {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid var(--color-border-2);
    .avatar {
      flex-shrink: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 20px;
      .title {
        font-weight: bold;
        font-size: 16px;
        margin: 0 0 10px 0;
      }
      .description {
        color: var(--color-text-2);
        margin: 0 0 10px 0;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        display: -moz-box;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;

        overflow-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
      }
      .meta-info {
        display: flex;
        flex-direction: column;
        color: var(--color-text-3);
        font-size: 12px;
        .base-info {
          display: flex;
          .create-info,
          .update-info {
            width: 250px;
            display: flex;
            flex-direction: column;
            margin-right: 20px;
          }
        }
        .operations {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed var(--color-border-2);
          .top {
            display: flex;
            align-items: center;
            margin: 10px 0;
            .visible-select {
              width: 100px;
              margin-right: 10px;
              :hover {
                background-color: var(--color-border-1);
              }
            }
            .status-tag {
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
`;

export default ResourceList;
