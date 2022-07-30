import styled from "styled-components";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClickAway, useToggle } from "ahooks";
import { usePopper } from "react-popper";
import ToolsPanel from "./ToolsPanel";
import { Trigger } from "@arco-design/web-react";

interface IReact {
  top: number;
  left: number;
  width: number;
  height: number;
}

const NodeSelector: React.FC<{ element: Element }> = props => {
  const [rect, setRect] = useState<IReact>({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  });

  // 监听元素变化，改变位置
  useEffect(() => {
    const range = document.createRange();
    range.selectNode(props.element);
    const { width, height, left, top } = range.cloneRange().getBoundingClientRect();
    setRect({ width, height, left, top });
  }, [props.element]);

  // resize 变化的回调
  const resizeObserverCallback = useCallback<ResizeObserverCallback>(entry => {
    const { borderBoxSize, target } = entry[0];
    const range = document.createRange();
    range.selectNode(target);
    const rect = range.cloneRange().getBoundingClientRect();
    setRect({
      width: borderBoxSize[0].inlineSize,
      height: borderBoxSize[0].blockSize,
      left: rect.left,
      top: rect.top
    });
  }, []);

  // resizeObserver 实例
  const observer = useMemo(
    () => new ResizeObserver(resizeObserverCallback),
    [resizeObserverCallback]
  );

  useEffect(() => {
    // 监听大小变化
    observer.observe(props.element);
    return () => {
      observer.disconnect();
    };
  }, [props.element, observer]);

  const [toolsVisible, { setLeft, setRight }] = useToggle();
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [],
    placement: "bottom"
  });

  // useClickAway(() => {
  //   setLeft();
  // }, [nodeContainerRef, toolsPanelRef]);

  if (rect.width * rect.height !== 0) {
    return (
      <>
        <Trigger
          popup={() => <ToolsPanel />}
          trigger="click"
          getPopupContainer={() => document.querySelector(".popup-container") || document.body}
        >
          <SelectNodeContainer
            id="node-container"
            rect={rect}
            onClick={() => {
              setRight();
            }}
          />
        </Trigger>
      </>
    );
  }
  return null;
};

const StyleRect = styled.div<{ rect: IReact }>`
  top: ${props => props.rect.top + "px"};
  left: ${props => props.rect.left + "px"};
  width: ${props => props.rect.width + "px"};
  height: ${props => props.rect.height + "px"};
`;

const SelectNodeContainer = styled(StyleRect)`
  cursor: crosshair;
  position: absolute;
  outline: 1px dashed rgb(var(--primary-6));
  &:hover {
    outline: 2px solid rgb(var(--primary-6));
  }
`;

export default NodeSelector;
