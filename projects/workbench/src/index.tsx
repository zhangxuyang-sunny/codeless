import "@arco-design/web-react/dist/css/arco.css";

import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { createGlobalStyle } from "styled-components";

import reportWebVitals from "./reportWebVitals";
import RootRouter from "./router";

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const StyleGlobal = createGlobalStyle`
  body,
  html {
    margin: 0;
    user-select: none;
  }
  #root {
    width: 100%;
    height: 100%;
  }
  *{
    /* .arco-btn-primary:not(.arco-btn-disabled){
      color: var(--color-bg-1);
    }
    .arco-btn-primary:not(.arco-btn-disabled):not(.arco-btn-loading):hover {
      color: var(--color-bg-1);
    } */
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background-color: var(--color-border-4);
    }

    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background-color: var(--color-border-2);
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <DebugObserver />
    <StyleGlobal />
    <RootRouter />
  </RecoilRoot>
);
