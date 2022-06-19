/* eslint-disable security/detect-non-literal-fs-filename */
import { Divider, Form, Radio } from "@arco-design/web-react";
import styled from "styled-components";
import HelpIcon from "src/components/HelpIcon";

const urls = Object.freeze({
  "hash": "https://router.vuejs.org/zh/api/#createwebhashhistory",
  "history": "https://router.vuejs.org/zh/api/#createwebhistory",
  "memory": "https://router.vuejs.org/zh/api/#creatememoryhistory",
  "vue-router": "https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html"
});

type RouterMode = "hash" | "history" | "memory";

// 路由配置器
const RouterSettings: React.FC<{
  defaultMode?: RouterMode;
  mode?: RouterMode; // 受控
  onAdd?: () => void;
  onDelete?: (id: string) => void;
  onUpdateRouterMode?: (mode: RouterMode) => void;
}> = props => {
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
                    <>
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
                    </>
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
              props.onUpdateRouterMode && props.onUpdateRouterMode(value);
            }}
          >
            <Radio value="hash">hash</Radio>
            <Radio value="history">history</Radio>
            <Radio value="memory">memory</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="title">
          <h3>路由列表</h3>
          <HelpIcon
            iconStyle={{ marginLeft: "4px" }}
            tooltipProps={{
              position: "right",
              content: (
                <>
                  一个页面对应一个路由；一个页面也可对应多个路由，使用相同的页面 ID 即可。
                  <br />
                  <span
                    className="p-link"
                    onClick={() => window.open(urls["vue-router"], "_blank")}
                  >
                    页面路径参考 vue-router（点击查看）
                  </span>
                </>
              )
            }}
          />
        </div>
      </Form>
    </StyleRouterSettings>
  );
};

const StyleRouterSettings = styled.div`
  min-width: 600px;
  .title {
    display: flex;
    align-items: center;
  }
`;

export default RouterSettings;
