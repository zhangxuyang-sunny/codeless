import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import NodeSelector from "./NodeSelector";

const NODE_ID_ATTR = "data-component-id";

const Simulator: React.FC<{
  // 注意：需要保证是加载完成后的 iframeElement，否则内部监听会失效
  iframeElement: HTMLIFrameElement;
}> = props => {
  const { iframeElement } = props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const iframeWindow = iframeElement.contentWindow! as Window & typeof globalThis;
  const simulatorRef = useRef<HTMLDivElement>(null);
  const [nodeList, setNodeList] = useState<NodeList>();

  // 给模拟器父级节点设置 relative 以正确计算布局
  useEffect(() => {
    if (simulatorRef.current?.parentElement) {
      Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(
        simulatorRef.current.parentElement.style,
        { position: "relative" }
      );
    }
  }, [simulatorRef]);

  // 监听 iframe 下所有节点变化
  useEffect(() => {
    if (!iframeElement.contentDocument) return;
    const observer = new MutationObserver(() => {
      setNodeList(iframeElement.contentDocument?.querySelectorAll(`[${NODE_ID_ATTR}]`));
    });
    observer.observe(iframeElement.contentDocument, {
      attributes: true,
      childList: true,
      subtree: true
    });
    return () => {
      observer.disconnect();
    };
  }, [iframeElement, iframeWindow, simulatorRef]);

  return (
    <StyleSimulator ref={simulatorRef}>
      {/* 节点操作区容器 */}
      <div className="nodes-container" id="nodes-container">
        {Array.from(nodeList?.values() || []).map((node, key) => {
          return node instanceof iframeWindow.Element ? (
            <NodeSelector element={node} key={`${node.getAttribute(NODE_ID_ATTR)}-${key}`} />
          ) : null;
        })}
      </div>
      <div className="popup-container"></div>
    </StyleSimulator>
  );
};

const StyleSimulator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--color-border-3);
  /* pointer-events: none; */
  .nodes-container,
  .popup-container {
    width: 100%;
    height: 100%;
  }
`;

export default Simulator;
