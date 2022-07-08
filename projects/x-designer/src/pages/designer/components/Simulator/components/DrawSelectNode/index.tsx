import { useEffect, useRef, useState } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/perspective.css";
import { debounce } from "lodash";
Tippy.defaultProps = {
  arrow: false,
  delay: 100,
  theme: "light",
  animation: "perspective"
} as TippyProps;

function Tooltip() {
  return <span>配置</span>;
}
const DrawSelectNode: React.FC<{ node: Element }> = props => {
  const container = useRef<HTMLDivElement>(null);

  const [rect, setRect] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0
  });

  const setRectDebounceFunc = debounce<ResizeObserverCallback>(entry => {
    const { target } = entry[0];

    const { width, height, left, top } = target.getBoundingClientRect();

    setRect({
      width,
      height,
      left,
      top
    });
  }, 100);

  const nodeObs = new ResizeObserver(setRectDebounceFunc);

  nodeObs.observe(props.node);

  useEffect(() => {
    return () => {
      nodeObs.disconnect();
    };
  }, []);
  return (
    <Tippy content={<Tooltip />} placement="top-start">
      <SelectNodeContainer style={rect} />
    </Tippy>
  );
};

const SelectNodeContainer = styled.div`
  position: absolute;
  outline: 1px solid #415fff;
  top: ${props => props.style?.top + "px"};
  left: ${props => props.style?.left + "px"};
  width: ${props => props.style?.width + "px"};
  height: ${props => props.style?.height + "px"};
  pointer-events: none;
`;

export default DrawSelectNode;
