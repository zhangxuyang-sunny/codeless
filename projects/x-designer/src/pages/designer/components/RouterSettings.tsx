/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */
import { Button, Divider, Form, Input, Radio } from "@arco-design/web-react";
import styled from "styled-components";
import HelpIcon from "src/components/HelpIcon";
import { PageConfig, RouterValue } from "packages/x-nodes/dist";
import { useEffect, useRef, useState } from "react";

const urls = Object.freeze({
  "hash": "https://router.vuejs.org/zh/api/#createwebhashhistory",
  "history": "https://router.vuejs.org/zh/api/#createwebhistory",
  "memory": "https://router.vuejs.org/zh/api/#creatememoryhistory",
  "vue-router": "https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html"
});

type RouterMode = RouterValue["mode"];

// 路由配置器
const RouterSettings: React.FC<{
  defaultMode?: RouterMode;
  readonly?: boolean; // 只读模式
  mode?: RouterMode; // 受控
  pages: PageConfig[];
  onUpdateMode?: (mode: RouterMode) => void;
  onAddRoute?: () => void;
  onDeleteRoute?: (id: string) => void;
}> = props => {
  const pageListRef = useRef<HTMLDivElement>(null);
  // 删除二次确认标识
  const [confirmFlags, setConfirmFlags] = useState<boolean[]>([]);

  // routes 改变，二次确认标识重置
  useEffect(() => {
    setConfirmFlags(new Array(props.pages.length).fill(false));
  }, [props.pages]);

  const addRoute = () => {
    props.onAddRoute?.();
    setTimeout(() => {
      pageListRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const delRoute = (id: string, index: number) => {
    if (confirmFlags[index]) {
      props.onDeleteRoute?.(id);
    } else {
      setConfirmFlags(confirmFlags.map((_, i) => i === index));
    }
  };

  return (
    <StyleRouterSettings>
      <Form layout="vertical">
        <Form.Item
          field="mode"
          label={
            <div className="title">
              <h3>路由模式</h3>
              <HelpIcon
                iconStyle={{ marginLeft: "4px" }}
                tooltipProps={{
                  position: "right",
                  content: (
                    <StyleTooltipContent>
                      <span className="p-link" onClick={() => window.open(urls.hash, "_blank")}>
                        hash 模式
                      </span>
                      <Divider type="vertical" />
                      <span className="p-link" onClick={() => window.open(urls.history, "_blank")}>
                        history 模式
                      </span>
                      <Divider type="vertical" />
                      <span className="p-link" onClick={() => window.open(urls.memory, "_blank")}>
                        memory 模式
                      </span>
                    </StyleTooltipContent>
                  )
                }}
              />
            </div>
          }
        >
          <Radio.Group
            type="button"
            size="small"
            defaultValue={props.defaultMode}
            value={props.mode}
            onChange={(value: RouterMode) => {
              props.onUpdateMode && props.onUpdateMode(value);
            }}
          >
            <Radio value="hash">hash</Radio>
            <Radio value="history">history</Radio>
            <Radio value="memory">memory</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={
            <div className="title">
              <h3>路由列表</h3>
              <HelpIcon
                iconStyle={{ marginLeft: "4px" }}
                tooltipProps={{
                  position: "right",
                  content: (
                    <StyleTooltipContent>
                      一个页面对应一个路由；一个页面也可对应多个路由，使用相同的页面 ID 即可。
                      <br />
                      <span
                        className="p-link"
                        onClick={() => window.open(urls["vue-router"], "_blank")}
                      >
                        页面路径参考 vue-router（点击查看）
                      </span>
                    </StyleTooltipContent>
                  )
                }}
              />
            </div>
          }
        >
          <div ref={pageListRef} className="page-list">
            {props.pages.map((page, index) => (
              <div className="page-item" key={page.id}>
                <Form.Item field={`pages.${index}.id`}>
                  <div className="form-item">
                    <p className="title">页面ID</p>
                    <Input value={page.id} placeholder="未填写页面ID" size="small" />
                  </div>
                </Form.Item>
                <span className="label"></span>
                <Form.Item field={`pages.${index}.title`}>
                  <div className="form-item">
                    <p className="title">页面名称</p>
                    <Input value={page.title} placeholder="未填写页面名称" size="small" />
                  </div>
                </Form.Item>
                <span className="label"></span>
                <Form.Item field={`pages.${index}.path`}>
                  <div className="form-item">
                    <p className="title">页面路径</p>
                    <Input value={page.path} placeholder="未填写页面路径" size="small" />
                  </div>
                </Form.Item>
                <span className="label"></span>
                <Button
                  size="mini"
                  type="text"
                  status="danger"
                  disabled={props.pages.length <= 1}
                  onClick={() => {
                    delRoute(page.id, index);
                  }}
                >
                  {confirmFlags[index] ? "确认" : "删除"}
                </Button>
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
      <Button className="add-button" size="small" onClick={addRoute}>
        添加
      </Button>
    </StyleRouterSettings>
  );
};

const StyleRouterSettings = styled.div`
  min-width: 600px;
  .title {
    display: flex;
    align-items: center;
  }

  .page-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    .page-item {
      display: flex;
      align-items: center;
      border-bottom: 1px dashed var(--color-border-1);
      margin-bottom: 10px;
      padding-bottom: 10px;
      .title {
        margin: 4px 0;
        color: var(--color-text-3);
        font-size: 12px;
      }
      .form-item {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .label {
        flex-shrink: 0;
        margin: 0 10px;
        width: 1px;
        height: 50px;
        background-color: var(--color-border-2);
      }
    }
  }

  .add-button {
    position: sticky;
    left: 100%;
    bottom: 0;
  }
`;

const StyleTooltipContent = styled.div`
  .p-link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default RouterSettings;
