import { Radio } from "@arco-design/web-react";
import styled from "styled-components";
import Installed from "./Installed";
import Collection from "./Collection";
import Own from "./Own";
import { useState } from "react";
const RadioGroup = Radio.Group;
export default function Module() {
  const [selectComp, setSelectComp] = useState<"installed" | "own" | "collection">("installed");

  const ContentMap = {
    installed: () => <Installed />,
    own: () => <Own />,
    collection: () => <Collection />
  };
  return (
    <ModuleContainer>
      <header>
        <div className="title">组件库</div>
        {/* <Search /> */}
      </header>
      <div className="content">
        <RadioGroup
          type="button"
          value={selectComp}
          onChange={v => {
            setSelectComp(v);
          }}
        >
          <Radio value="installed">已安装</Radio>
          <Radio value="own">我的</Radio>
          <Radio value="collection">收藏</Radio>
        </RadioGroup>
        {ContentMap[selectComp]()}
      </div>
      <div className="footer">
        <span>安装更多组件</span>
      </div>
    </ModuleContainer>
  );
}

const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
  }
  .content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .footer {
    margin-top: auto;
    border-top: 1px solid #eee;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 5px;
    .i-icon {
      font-size: 18px;
    }
    span {
      cursor: pointer;
    }
  }
`;
